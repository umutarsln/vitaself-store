import type { CheckoutPayload } from '@/lib/orders'

/** Checkout gövdesinde en az bir sepet satırı olup olmadığını kontrol eder. */
export function hasCheckoutLines(body: unknown): body is CheckoutPayload {
  if (!body || typeof body !== 'object') return false
  const payload = body as CheckoutPayload
  return Array.isArray(payload.lines) && payload.lines.length > 0
}

/** Mock checkout için müşteri, adres ve ödeme alanlarını doğrular. */
export function hasMockCheckoutDetails(body: unknown): body is CheckoutPayload {
  if (!hasCheckoutLines(body)) return false
  const payload = body as CheckoutPayload
  return (
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
 * Shopify hosted checkout’ta adres/ödeme bizim formda toplanmaz.
 * Mock modda eski alanlar zorunlu kalır.
 */
export function isValidCheckoutPayload(
  body: unknown,
  shopifyEnabled: boolean,
): body is CheckoutPayload {
  if (!hasCheckoutLines(body)) return false
  if (shopifyEnabled) return true
  return hasMockCheckoutDetails(body)
}
