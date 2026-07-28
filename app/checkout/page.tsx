import type { Metadata } from 'next'
import { CheckoutForm } from '@/components/checkout/checkout-form'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export const metadata: Metadata = {
  title: 'Checkout — Vitaself',
  description: 'Complete your Vitaself order. Secure checkout for clinically formulated supplements.',
}

/** Checkout sayfası. */
export default function CheckoutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <CheckoutForm />
      </main>
      <SiteFooter />
    </>
  )
}
