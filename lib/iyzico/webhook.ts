import { createHmac, timingSafeEqual } from 'node:crypto'
import { siteConfig } from '@/lib/site'

/** iyzico merchant panelinde yapıştırılacak bildirim URL’sini döner. */
export function iyzicoNotificationUrl(): string {
  return `${siteConfig.url.replace(/\/$/, '')}/api/webhooks/iyzico`
}

export type IyzicoWebhookPayload = {
  paymentConversationId?: string
  merchantId?: string | number
  paymentId?: string | number
  status?: string
  token?: string
  iyziReferenceCode?: string
  iyziEventType?: string
  iyziEventTime?: number | string
  iyziPaymentId?: string | number
  orderReferenceCode?: string
  customerReferenceCode?: string
  subscriptionReferenceCode?: string
}

/** HMAC-SHA256 imzasını hex olarak üretir. */
export function hmacSha256Hex(secretKey: string, message: string): string {
  return createHmac('sha256', secretKey).update(message, 'utf8').digest('hex')
}

/** İki imza dizesini zaman-sabit karşılaştırır. */
export function signaturesMatch(expectedHex: string, received: string): boolean {
  const expected = Buffer.from(expectedHex, 'utf8')
  const actual = Buffer.from(received, 'utf8')
  if (expected.length !== actual.length) return false
  return timingSafeEqual(expected, actual)
}

/** iyzico bildirim gövdesini JSON veya form-urlencoded’den nesneye çevirir. */
export function parseIyzicoWebhookBody(
  raw: string,
  contentType: string | null,
): IyzicoWebhookPayload {
  const trimmed = raw.trim()
  if (!trimmed) return {}

  const looksJson = contentType?.includes('application/json') || trimmed.startsWith('{')
  if (looksJson) {
    try {
      const parsed = JSON.parse(trimmed) as unknown
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}
      return parsed as IyzicoWebhookPayload
    } catch {
      return {}
    }
  }

  const payload: Record<string, string> = {}
  for (const [key, value] of new URLSearchParams(trimmed).entries()) {
    payload[key] = value
  }
  return payload
}

/**
 * X-IYZ-SIGNATURE-V3 değerini Direct veya HPP formülüne göre doğrular.
 * Secret tanımlı değilse panel kaydını engellememek için doğrulamayı atlar.
 */
export function verifyIyzicoSignature(
  payload: IyzicoWebhookPayload,
  signatureHeader: string | null,
  secretKey: string | undefined,
): boolean {
  if (!secretKey) return true
  if (!signatureHeader) return true

  const eventType = String(payload.iyziEventType ?? '')
  const conversationId = String(payload.paymentConversationId ?? '')
  const status = String(payload.status ?? '')
  const paymentId = String(payload.paymentId ?? payload.iyziPaymentId ?? '')
  const iyziPaymentId = String(payload.iyziPaymentId ?? payload.paymentId ?? '')
  const token = payload.token != null ? String(payload.token) : ''

  const candidates = [
    hmacSha256Hex(secretKey, secretKey + eventType + paymentId + conversationId + status),
  ]

  if (token) {
    candidates.push(
      hmacSha256Hex(
        secretKey,
        secretKey + eventType + iyziPaymentId + token + conversationId + status,
      ),
    )
  }

  return candidates.some((expected) => signaturesMatch(expected, signatureHeader))
}
