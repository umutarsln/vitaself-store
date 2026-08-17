'use client'

import { Check, ShoppingBag } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCart } from '@/lib/cart'
import { useLanguage } from '@/lib/i18n'
import { copy, resolveCartLine } from '@/lib/products'

/** Sepete ekleme sonrası kısa süreli toast bildirimi. */
export function CartToast() {
  const { pulseKey, lastAddedVariantId, lines, openCart } = useCart()
  const { d, lang } = useLanguage()
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState('')

  /** pulseKey değişince ürün adıyla toast gösterir. */
  useEffect(() => {
    if (pulseKey === 0) return

    const line = lines.find((item) => item.variantId === lastAddedVariantId)
    const resolved = line
      ? resolveCartLine(line)
      : lastAddedVariantId
        ? resolveCartLine({ variantId: lastAddedVariantId })
        : null
    setLabel(resolved ? copy(resolved.product.title, lang) : d.cart.addedToast)
    setVisible(true)

    const timer = window.setTimeout(() => setVisible(false), 2800)
    return () => window.clearTimeout(timer)
  }, [pulseKey, lastAddedVariantId, lines, lang, d.cart.addedToast])

  /** Toast tıklanınca sepet drawer'ını açar. */
  function handleOpenCart() {
    setVisible(false)
    openCart()
  }

  return (
    visible ? (
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4 md:bottom-auto md:top-28 md:justify-end md:px-8"
      >
        <button
          type="button"
          onClick={handleOpenCart}
          className="bg-card/95 shadow-float border-border/60 pointer-events-auto flex max-w-sm items-center gap-3 rounded-full border py-3 pr-5 pl-4 backdrop-blur-xl"
        >
            <span className="bg-positive text-positive-foreground flex size-9 shrink-0 items-center justify-center rounded-full">
              <Check className="size-4" strokeWidth={2.2} />
            </span>
            <span className="min-w-0 text-left">
              <span className="block text-sm tracking-tight">{d.cart.addedToast}</span>
              <span className="text-muted-foreground block truncate text-xs">{label}</span>
            </span>
            <span className="text-primary ml-1 inline-flex shrink-0 items-center gap-1.5 text-xs tracking-wide">
              <ShoppingBag className="size-3.5" strokeWidth={1.6} />
              {d.cart.viewCart}
            </span>
        </button>
      </div>
    ) : null
  )
}
