import type { Metadata } from 'next'
import { Suspense } from 'react'
import { CheckoutSuccess } from '@/components/checkout/checkout-success'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export const metadata: Metadata = {
  title: 'Order confirmed — Vitaself',
  description: 'Your Vitaself order has been received.',
}

/** Sipariş başarı sayfası. */
export default function CheckoutSuccessPage() {
  return (
    <>
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
