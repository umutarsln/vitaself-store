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
        titleEn="Order confirmed — Vitaself"
        titleTr="Sipariş onaylandı — Vitaself"
        descriptionEn="Your Vitaself order has been received."
        descriptionTr="Vitaself siparişiniz alındı."
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
