import { NextResponse } from 'next/server'
import { getCatalogProducts } from '@/lib/catalog'
import { isValidCheckoutPayload } from '@/lib/checkout-payload'
import { isLang } from '@/lib/i18n/config'
import { iyzicoNotificationUrl } from '@/lib/iyzico/webhook'
import type { CheckoutOrder, CheckoutPayload } from '@/lib/orders'
import { addMoney, copy, lineTotal, shippingForSubtotal } from '@/lib/products'
import { createShopifyCheckout, isShopifyConfigured } from '@/lib/shopify'
import { langToCountryCode } from '@/lib/shopify/country-codes'

/** Sipariş kimliği üretir. */
function createOrderId() {
  const stamp = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `VS-${stamp}-${rand}`
}

/** Shopify yokken kullanılan boş müşteri kaydı. */
function emptyCustomer(): CheckoutOrder['customer'] {
  return { email: '', firstName: '', lastName: '', phone: '' }
}

/** Shopify yokken kullanılan boş adres kaydı. */
function emptyAddress(): CheckoutOrder['shippingAddress'] {
  return { line1: '', city: '', state: '', postalCode: '', country: '' }
}

/**
 * Checkout API.
 * Shopify yapılandırılmışsa cartCreate ile hosted checkout URL döner.
 * Aksi halde katalog doğrulamalı mock sipariş üretir.
 */
export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const shopifyEnabled = isShopifyConfigured()
  if (!isValidCheckoutPayload(body, shopifyEnabled)) {
    return NextResponse.json({ error: 'Invalid checkout payload' }, { status: 400 })
  }

  const catalog = await getCatalogProducts()
  const lang = isLang(body.lang) ? body.lang : 'tr'

  const resolvedLines: CheckoutOrder['lines'] = []
  for (const line of body.lines) {
    const resolved =
      catalog
        .flatMap((product) =>
          product.variants.map((variant) => ({ product, variant })),
        )
        .find((entry) => entry.variant.id === line.variantId) ??
      (line.handle
        ? catalog
            .filter((product) => product.handle === line.handle)
            .flatMap((product) =>
              product.variants.map((variant) => ({ product, variant })),
            )[0]
        : null)

    if (!resolved || !resolved.variant.availableForSale) {
      return NextResponse.json(
        { error: `Unavailable variant: ${line.handle ?? line.variantId}` },
        { status: 400 },
      )
    }

    const quantity = Math.max(1, Math.floor(line.quantity))
    resolvedLines.push({
      variantId: line.variantId,
      quantity,
      title: copy(resolved.product.title, lang),
      variantTitle: resolved.variant.title,
      unitPrice: resolved.variant.price,
      lineTotal: lineTotal(resolved.variant.price, quantity),
    })
  }

  const linesWithHandles = body.lines.map((line) => ({
    ...line,
    handle:
      line.handle ??
      catalog.find((product) =>
        product.variants.some((variant) => variant.id === line.variantId),
      )?.handle,
  }))

  const subtotal = resolvedLines.reduce(
    (sum, line) => addMoney(sum, line.lineTotal),
    { usd: 0, try: 0 },
  )
  const shipping = shopifyEnabled ? { usd: 0, try: 0 } : shippingForSubtotal(subtotal)
  const total = addMoney(subtotal, shipping)

  if (shopifyEnabled) {
    try {
      const shopifyCheckout = await createShopifyCheckout({
        lines: linesWithHandles,
        notes: body.notes,
        countryCode: langToCountryCode(lang),
      })

      const order: CheckoutOrder = {
        id: createOrderId(),
        createdAt: new Date().toISOString(),
        status: 'pending',
        paymentMethod: body.paymentMethod ?? 'card',
        customer: body.customer ?? emptyCustomer(),
        shippingAddress: body.shippingAddress ?? emptyAddress(),
        lines: resolvedLines,
        subtotal,
        shipping,
        total,
        currency: lang === 'tr' ? 'TRY' : 'USD',
        notes: body.notes,
        shopifyCheckoutUrl: shopifyCheckout.checkoutUrl,
        mode: 'shopify',
      }

      return NextResponse.json({ order })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Shopify checkout failed'
      return NextResponse.json({ error: message }, { status: 502 })
    }
  }

  const payload = body as CheckoutPayload
  const order: CheckoutOrder = {
    id: createOrderId(),
    createdAt: new Date().toISOString(),
    status: payload.paymentMethod === 'card' ? 'paid' : 'pending',
    paymentMethod: payload.paymentMethod ?? 'card',
    customer: payload.customer ?? emptyCustomer(),
    shippingAddress: payload.shippingAddress ?? emptyAddress(),
    lines: resolvedLines,
    subtotal,
    shipping,
    total,
    currency: lang === 'tr' ? 'TRY' : 'USD',
    notes: payload.notes,
    shopifyCheckoutUrl: null,
    mode: 'mock',
  }

  return NextResponse.json({ order })
}

/** Shopify bağlantı durumunu ve iyzico bildirim URL’sini döner. */
export async function GET() {
  return NextResponse.json({
    shopify: isShopifyConfigured(),
    iyzicoNotificationUrl: iyzicoNotificationUrl(),
  })
}
