'use client'

import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { useLanguage } from '@/lib/i18n'

type CartTriggerProps = {
  className?: string
}

/** Header sepet butonu. */
export function CartTrigger({ className }: CartTriggerProps) {
  const { d } = useLanguage()
  const { count, openCart } = useCart()

  return (
    <button
      type="button"
      onClick={openCart}
      className={`text-foreground/70 hover:text-foreground relative flex size-10 items-center justify-center rounded-full transition-colors ${className ?? ''}`}
    >
      <span className="relative flex items-center justify-center">
        <ShoppingBag className="size-[18px]" strokeWidth={1.4} />
        {count > 0 ? (
          <span className="bg-primary text-primary-foreground absolute -top-1.5 -right-2 flex min-w-4 items-center justify-center rounded-full px-1 py-0.5 text-[10px] font-medium">
            {count}
          </span>
        ) : null}
      </span>
      <span className="sr-only">
        {d.nav.cart} ({count})
      </span>
    </button>
  )
}
