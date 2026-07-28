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
        titleEn="Checkout — Vitaself"
        titleTr="Ödeme — Vitaself"
        descriptionEn="Complete your Vitaself order."
        descriptionTr="Vitaself siparişinizi tamamlayın."
      />
      <SiteHeader />
      <main>
        <CheckoutForm />
      </main>
      <SiteFooter />
    </>
  )
}
