import { NextResponse } from 'next/server'
import { getCatalogProducts } from '@/lib/catalog'
import { isLang } from '@/lib/i18n/config'
import type { CheckoutOrder, CheckoutPayload } from '@/lib/orders'
import {
  addMoney,
  cartSubtotal,
  copy,
  lineTotal,
  shippingForSubtotal,
} from '@/lib/products'
import { createShopifyCheckout, isShopifyConfigured } from '@/lib/shopify'

/** Sipariş kimliği üretir. */
function createOrderId() {
  const stamp = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `VS-${stamp}-${rand}`
}

/** Checkout payload’ını doğrular. */
function validatePayload(body: unknown): body is CheckoutPayload {
  if (!body || typeof body !== 'object') return false
  const payload = body as CheckoutPayload
  return (
    Array.isArray(payload.lines) &&
    payload.lines.length > 0 &&
    Boolean(payload.customer?.email) &&
    Boolean(payload.customer?.firstName) &&
    Boolean(payload.customer?.lastName) &&
    Boolean(payload.shippingAddress?.line1) &&
    Boolean(payload.shippingAddress?.city) &&
    Boolean(payload.shippingAddress?.postalCode) &&
    Boolean(payload.shippingAddress?.country) &&
    (payload.paymentMethod === 'card' || payload.paymentMethod === 'transfer')
  )
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

  if (!validatePayload(body)) {
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

  const linesWithHandles = body.lines.map((line, index) => ({
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
  const shipping = shippingForSubtotal(subtotal)
  const total = addMoney(subtotal, shipping)

  if (isShopifyConfigured()) {
    try {
      const shopifyCheckout = await createShopifyCheckout({
        lines: linesWithHandles,
        customer: body.customer,
        shippingAddress: body.shippingAddress,
        notes: body.notes,
      })

      const order: CheckoutOrder = {
        id: createOrderId(),
        createdAt: new Date().toISOString(),
        status: 'pending',
        paymentMethod: body.paymentMethod,
        customer: body.customer,
        shippingAddress: body.shippingAddress,
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

  const order: CheckoutOrder = {
    id: createOrderId(),
    createdAt: new Date().toISOString(),
    status: body.paymentMethod === 'card' ? 'paid' : 'pending',
    paymentMethod: body.paymentMethod,
    customer: body.customer,
    shippingAddress: body.shippingAddress,
    lines: resolvedLines,
    subtotal,
    shipping,
    total,
    currency: lang === 'tr' ? 'TRY' : 'USD',
    notes: body.notes,
    shopifyCheckoutUrl: null,
    mode: 'mock',
  }

  return NextResponse.json({ order })
}

/** Shopify bağlantı durumunu döner. */
export async function GET() {
  return NextResponse.json({ shopify: isShopifyConfigured() })
}
