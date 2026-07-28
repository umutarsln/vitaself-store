import type { Metadata } from 'next'
import { Suspense } from 'react'
import { CheckoutSuccess } from '@/components/checkout/checkout-success'
import { DocumentLang } from '@/components/document-lang'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export const metadata: Metadata = {
  title: 'Order confirmed',
  description: 'Your Vitaself order has been received.',
  robots: { index: false, follow: false },
}

/** Sipariş başarı sayfası. */
export default function CheckoutSuccessPage() {
  return (
    <>
      <DocumentLang
        titles={{
          en: 'Order confirmed — Vitaself',
          tr: 'Sipariş onaylandı — Vitaself',
          de: 'Bestellung bestätigt — Vitaself',
          ru: 'Заказ подтверждён — Vitaself',
        }}
        descriptions={{
          en: 'Your Vitaself order has been received.',
          tr: 'Vitaself siparişiniz alındı.',
          de: 'Ihre Vitaself-Bestellung ist eingegangen.',
          ru: 'Ваш заказ Vitaself получен.',
        }}
      />
      <SiteHeader />
      <main>
        <Suspense
          fallback={
            <div className="mx-auto max-w-2xl px-6 py-32 text-center">
              <p className="text-muted-foreground text-sm">Loading…</p>
            </div>
          }
        >
          <CheckoutSuccess />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  )
}
