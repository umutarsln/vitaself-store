import { NextResponse } from 'next/server'
import {
  iyzicoNotificationUrl,
  parseIyzicoWebhookBody,
  verifyIyzicoSignature,
} from '@/lib/iyzico/webhook'

/**
 * iyzico bildirim URL sağlık kontrolü.
 * Merchant panel URL’yi kaydetmeden önce GET ile erişilebilirliği doğrulayabilir.
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'iyzico-merchant-notifications',
    notificationUrl: iyzicoNotificationUrl(),
  })
}

/**
 * iyzico İşyeri Bildirimleri webhook’u.
 * Panel: Ayarlar → Firma Ayarları → İşyeri Bildirimleri → Merchant Notification Url
 */
export async function POST(request: Request) {
  const raw = await request.text()
  const payload = parseIyzicoWebhookBody(raw, request.headers.get('content-type'))
  const signature =
    request.headers.get('x-iyz-signature-v3') ?? request.headers.get('X-IYZ-SIGNATURE-V3')
  const secret = process.env.IYZICO_SECRET_KEY?.trim() || undefined

  if (!verifyIyzicoSignature(payload, signature, secret)) {
    return NextResponse.json({ error: 'Invalid iyzico signature' }, { status: 401 })
  }

  return NextResponse.json({
    status: 'ok',
    received: Boolean(payload.status || payload.token || payload.iyziEventType),
  })
}
