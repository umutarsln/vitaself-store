'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/i18n'
import { LAST_ORDER_KEY, type CheckoutOrder } from '@/lib/orders'

/** Sipariş başarı ekranı — sessionStorage’dan son siparişi okur. */
export function CheckoutSuccess() {
  const { d, price } = useLanguage()
  const searchParams = useSearchParams()
  const orderParam = searchParams.get('order')
  const [order, setOrder] = useState<CheckoutOrder | null>(null)

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(LAST_ORDER_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as CheckoutOrder
      if (orderParam && parsed.id !== orderParam) return
      setOrder(parsed)
    } catch {
      setOrder(null)
    }
  }, [orderParam])

  return (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center md:px-10 md:py-40">
      <p className="text-eyebrow text-muted-foreground">{d.checkout.success.eyebrow}</p>
      <h1 className="text-display mt-5 text-[clamp(2.4rem,7vw,4rem)] text-balance">
        {d.checkout.success.title}
      </h1>
      <p className="text-muted-foreground mx-auto mt-5 max-w-md text-[15px] leading-relaxed">
        {d.checkout.success.body}
      </p>

      {order ? (
        <div className="bg-ivory border-border/60 mt-12 rounded-[2rem] border px-6 py-8 text-left md:px-8">
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">{d.checkout.success.orderId}</dt>
              <dd className="font-medium tracking-wide">{order.id}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">{d.checkout.success.status}</dt>
              <dd>
                {order.status === 'paid'
                  ? d.checkout.success.statusPaid
                  : d.checkout.success.statusPending}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">{d.checkout.success.email}</dt>
              <dd>{order.customer.email}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-border/70 pt-3">
              <dt className="text-muted-foreground">{d.cart.total}</dt>
              <dd className="text-display text-2xl">{price(order.total)}</dd>
            </div>
          </dl>
          <p className="text-muted-foreground mt-6 text-xs leading-relaxed">
            {order.mode === 'mock' ? d.checkout.success.mockNote : d.checkout.success.shopifyNote}
          </p>
        </div>
      ) : (
        <p className="text-muted-foreground mt-10 text-sm">{d.checkout.success.missing}</p>
      )}

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/products"
          className="bg-foreground text-background inline-flex h-12 items-center rounded-full px-7 text-sm tracking-wide"
        >
          {d.checkout.browse}
        </Link>
        <Link
          href="/"
          className="text-foreground inline-flex h-12 items-center text-sm tracking-wide underline-offset-4 hover:underline"
        >
          {d.checkout.success.home}
        </Link>
      </div>
    </div>
  )
}
