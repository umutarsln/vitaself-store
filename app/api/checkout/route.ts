import { NextResponse } from 'next/server'
import type { CheckoutOrder, CheckoutPayload } from '@/lib/orders'
import {
  addMoney,
  cartSubtotal,
  copy,
  findVariantById,
  multiplyMoney,
  shippingForSubtotal,
} from '@/lib/products'

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
 * Shopify Storefront token yoksa mock sipariş üretir.
 * SHOPIFY_STORE_DOMAIN + SHOPIFY_STOREFRONT_TOKEN tanımlıysa ileride
 * checkoutCreate mutation’ına delege edilecek şekilde bırakıldı.
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

  const shopifyDomain = process.env.SHOPIFY_STORE_DOMAIN
  const storefrontToken = process.env.SHOPIFY_STOREFRONT_TOKEN
  const shopifyReady = Boolean(shopifyDomain && storefrontToken)

  // Shopify hazır olduğunda burada checkoutCreate çağrılacak.
  // Şimdilik katalog doğrulamalı mock sipariş dönüyoruz.
  if (shopifyReady) {
    // Placeholder: gerçek Storefront checkoutCreate entegrasyonu için reserved.
  }

  const resolvedLines = []
  for (const line of body.lines) {
    const resolved = findVariantById(line.variantId)
    if (!resolved || !resolved.variant.availableForSale) {
      return NextResponse.json(
        { error: `Unavailable variant: ${line.variantId}` },
        { status: 400 },
      )
    }
    const quantity = Math.max(1, Math.floor(line.quantity))
    const lang = body.lang === 'tr' ? 'tr' : 'en'
    resolvedLines.push({
      variantId: line.variantId,
      quantity,
      title: copy(resolved.product.title, lang),
      variantTitle: resolved.variant.title,
      unitPrice: resolved.variant.price,
      lineTotal: multiplyMoney(resolved.variant.price, quantity),
    })
  }

  const subtotal = cartSubtotal(body.lines)
  const shipping = shippingForSubtotal(subtotal)
  const total = addMoney(subtotal, shipping)
  const lang = body.lang === 'tr' ? 'tr' : 'en'

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
