import type { Metadata } from 'next'
import { CheckoutForm } from '@/components/checkout/checkout-form'
import { DocumentLang } from '@/components/document-lang'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { absoluteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your Vitaself order. Secure checkout for clinically formulated supplements.',
  alternates: { canonical: '/checkout' },
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Checkout — Vitaself',
    url: absoluteUrl('/checkout'),
  },
}

/** Checkout sayfası. */
export default function CheckoutPage() {
  return (
    <>
      <DocumentLang
        titles={{
          en: 'Checkout — Vitaself',
          tr: 'Ödeme — Vitaself',
          de: 'Kasse — Vitaself',
          ru: 'Оформление — Vitaself',
        }}
        descriptions={{
          en: 'Complete your Vitaself order.',
          tr: 'Vitaself siparişinizi tamamlayın.',
          de: 'Schließen Sie Ihre Vitaself-Bestellung ab.',
          ru: 'Завершите заказ Vitaself.',
        }}
      />
      <SiteHeader />
      <main>
        <CheckoutForm />
      </main>
      <SiteFooter />
    </>
  )
}
