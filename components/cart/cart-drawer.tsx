'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useCart } from '@/lib/cart'
import { useLanguage } from '@/lib/i18n'
import { useFocusTrap } from '@/lib/use-focus-trap'
import {
  FREE_SHIPPING_THRESHOLD,
  addMoney,
  copy,
  findVariantById,
  lineTotal,
  shippingForSubtotal,
} from '@/lib/products'

/** Global sepet drawer’ı — satır düzenleme, kargo eşiği, checkout CTA. */
export function CartDrawer() {
  const { d, lang, price } = useLanguage()
  const { lines, count, subtotal, isOpen, closeCart, update, remove, hydrated } = useCart()
  const panelRef = useRef<HTMLElement>(null)
  useFocusTrap(isOpen, panelRef)

  const shipping = shippingForSubtotal(subtotal)
  const total = addMoney(subtotal, shipping)
  const remaining = {
    usd: Math.max(0, FREE_SHIPPING_THRESHOLD.usd - subtotal.usd),
    try: Math.max(0, FREE_SHIPPING_THRESHOLD.try - subtotal.try),
  }
  const freeUnlocked = lang === 'tr' ? remaining.try <= 0 : remaining.usd <= 0

  useEffect(() => {
    if (!isOpen) return
    /** Escape ile drawer’ı kapatır. */
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeCart()
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, closeCart])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="button"
            aria-label={d.cart.close}
            className="absolute inset-0 bg-foreground/35 backdrop-blur-[2px]"
            onClick={closeCart}
          />

          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="bg-background border-border/60 relative flex h-full w-full max-w-md flex-col border-l shadow-float"
          >
            <div className="flex items-center justify-between gap-4 border-b border-border/60 px-5 py-5">
              <div>
                <p className="text-eyebrow text-muted-foreground">{d.cart.eyebrow}</p>
                <h2 id="cart-drawer-title" className="text-display mt-1 text-2xl">
                  {d.cart.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="text-muted-foreground hover:text-foreground flex size-10 items-center justify-center rounded-full transition-colors"
              >
                <X className="size-5" strokeWidth={1.4} />
                <span className="sr-only">{d.cart.close}</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {!hydrated ? (
                <p className="text-muted-foreground text-sm">{d.cart.loading}</p>
              ) : count === 0 ? (
                <div className="flex h-full min-h-60 flex-col items-center justify-center text-center">
                  <ShoppingBag className="text-muted-foreground/50 size-8" strokeWidth={1.2} />
                  <p className="text-display mt-5 text-2xl">{d.cart.emptyTitle}</p>
                  <p className="text-muted-foreground mt-2 max-w-xs text-sm leading-relaxed">
                    {d.cart.emptyBody}
                  </p>
                  <Link
                    href="/products"
                    onClick={closeCart}
                    className="bg-foreground text-background mt-8 inline-flex h-11 items-center rounded-full px-6 text-sm tracking-wide"
                  >
                    {d.cart.browse}
                  </Link>
                </div>
              ) : (
                <ul className="flex flex-col gap-5">
                  {lines.map((line) => {
                    const resolved = findVariantById(line.variantId)
                    if (!resolved) return null
                    const { product, variant } = resolved
                    return (
                      <li key={line.variantId} className="flex gap-4">
                        <Link
                          href={`/products/${product.handle}`}
                          onClick={closeCart}
                          className="bg-ivory relative size-20 shrink-0 overflow-hidden rounded-2xl"
                        >
                          <Image
                            src={product.featuredImage.url}
                            alt={product.featuredImage.altText}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </Link>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <Link
                                href={`/products/${product.handle}`}
                                onClick={closeCart}
                                className="block truncate text-sm tracking-tight"
                              >
                                {copy(product.title, lang)}
                              </Link>
                              <p className="text-muted-foreground mt-0.5 text-xs">
                                {variant.sellingPlan === 'subscription'
                                  ? d.cart.subscription
                                  : d.cart.onetime}
                              </p>
                            </div>
                            <p className="shrink-0 text-sm">
                              {price(lineTotal(variant.price, line.quantity))}
                            </p>
                          </div>

                          <div className="mt-3 flex items-center justify-between gap-3">
                            <div className="border-border inline-flex items-center rounded-full border">
                              <button
                                type="button"
                                aria-label={d.cart.decrease}
                                onClick={() => update(line.variantId, line.quantity - 1)}
                                className="text-muted-foreground hover:text-foreground flex size-8 items-center justify-center"
                              >
                                <Minus className="size-3.5" strokeWidth={1.6} />
                              </button>
                              <span className="min-w-6 text-center text-sm">{line.quantity}</span>
                              <button
                                type="button"
                                aria-label={d.cart.increase}
                                onClick={() => update(line.variantId, line.quantity + 1)}
                                className="text-muted-foreground hover:text-foreground flex size-8 items-center justify-center"
                              >
                                <Plus className="size-3.5" strokeWidth={1.6} />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => remove(line.variantId)}
                              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs tracking-wide transition-colors"
                            >
                              <Trash2 className="size-3.5" strokeWidth={1.5} />
                              {d.cart.remove}
                            </button>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            {hydrated && count > 0 && (
              <div className="border-border/60 border-t px-5 py-5">
                <p
                  className={`text-xs tracking-wide ${
                    freeUnlocked ? 'text-positive-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {freeUnlocked
                    ? d.cart.shippingUnlocked
                    : `${price(remaining)} ${d.cart.shippingRemaining}`}
                </p>

                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{d.cart.subtotal}</dt>
                    <dd>{price(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{d.cart.shipping}</dt>
                    <dd>{shipping.usd === 0 && shipping.try === 0 ? d.cart.shippingFree : price(shipping)}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-t border-border/60 pt-3 text-base">
                    <dt>{d.cart.total}</dt>
                    <dd className="text-display text-xl">{price(total)}</dd>
                  </div>
                </dl>

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="bg-primary text-primary-foreground shadow-soft hover:shadow-float mt-5 flex h-12 w-full items-center justify-center rounded-full text-sm tracking-wide transition-all duration-500 hover:-translate-y-0.5"
                >
                  {d.cart.checkout}
                </Link>
                <button
                  type="button"
                  onClick={closeCart}
                  className="text-muted-foreground hover:text-foreground mt-3 w-full py-2 text-sm tracking-wide transition-colors"
                >
                  {d.cart.continue}
                </button>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
