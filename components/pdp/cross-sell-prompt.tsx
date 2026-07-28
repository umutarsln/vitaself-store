'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { Check, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useCart } from '@/lib/cart'
import { useLanguage } from '@/lib/i18n'
import { useFocusTrap } from '@/lib/use-focus-trap'
import {
  copy,
  defaultVariant,
  getCrossSellOffers,
  type Product,
} from '@/lib/products'

type CrossSellPromptProps = {
  product: Product
  open: boolean
  excludeHandles: string[]
  onClose: () => void
}

/** Sepete ekleme sonrası cross-sell modal prompt’u. */
export function CrossSellPrompt({ product, open, excludeHandles, onClose }: CrossSellPromptProps) {
  const { d, lang, price } = useLanguage()
  const { add } = useCart()
  const [addedHandles, setAddedHandles] = useState<string[]>([])
  const dialogRef = useRef<HTMLDivElement>(null)
  useFocusTrap(open, dialogRef)

  const offers = getCrossSellOffers(product).filter(
    (offer) => !excludeHandles.includes(offer.product.handle),
  )

  useEffect(() => {
    if (!open) {
      setAddedHandles([])
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    /** Escape ile prompt’u kapatır. */
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (offers.length === 0) {
    return null
  }

  /** Tek bir cross-sell ürününü sepete ekler. */
  function handleAddOffer(handle: string, variantId: string) {
    add(variantId, 1)
    setAddedHandles((prev) => (prev.includes(handle) ? prev : [...prev, handle]))
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <button
            type="button"
            aria-label={d.pdp.crossSell.skip}
            className="absolute inset-0 bg-foreground/35 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cross-sell-prompt-title"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="bg-background shadow-float border-border/70 relative z-10 w-full max-w-lg overflow-hidden rounded-[1.75rem] border"
          >
            <div className="flex items-start justify-between gap-4 px-6 pt-6 md:px-7">
              <div>
                <p className="text-eyebrow text-muted-foreground">{d.pdp.crossSell.promptEyebrow}</p>
                <h2
                  id="cross-sell-prompt-title"
                  className="text-display mt-3 text-[1.85rem] leading-none"
                >
                  {d.pdp.crossSell.promptTitle}
                </h2>
                <p className="text-muted-foreground mt-3 max-w-sm text-sm leading-relaxed">
                  {d.pdp.crossSell.promptBody}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground flex size-9 shrink-0 items-center justify-center rounded-full transition-colors"
              >
                <X className="size-4" strokeWidth={1.5} />
                <span className="sr-only">{d.pdp.crossSell.skip}</span>
              </button>
            </div>

            <ul className="mt-6 flex flex-col gap-3 px-6 md:px-7">
              {offers.map((offer) => {
                const variant = defaultVariant(offer.product)
                const isAdded = addedHandles.includes(offer.product.handle)
                return (
                  <li
                    key={offer.product.id}
                    className="border-border/70 bg-card/60 flex items-center gap-3.5 rounded-2xl border px-3.5 py-3"
                  >
                    <span className="bg-ivory relative size-14 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={offer.product.featuredImage.url}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm tracking-tight">
                        {copy(offer.product.title, lang)}
                      </p>
                      <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs leading-relaxed">
                        {copy(offer.reason, lang)}
                      </p>
                      <p className="mt-1.5 text-sm">{price(variant.price)}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-stretch gap-2">
                      <button
                        type="button"
                        disabled={isAdded}
                        onClick={() => handleAddOffer(offer.product.handle, variant.id)}
                        className="bg-foreground text-background inline-flex h-9 items-center justify-center rounded-full px-4 text-[12px] tracking-wide transition-transform duration-400 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
                      >
                        {isAdded ? (
                          <span className="inline-flex items-center gap-1.5">
                            <Check className="size-3.5" strokeWidth={2} />
                            {d.pdp.crossSell.added}
                          </span>
                        ) : (
                          d.pdp.crossSell.add
                        )}
                      </button>
                      <Link
                        href={`/products/${offer.product.handle}`}
                        className="text-muted-foreground hover:text-foreground text-center text-[11px] tracking-wide transition-colors"
                        onClick={onClose}
                      >
                        {d.pdp.crossSell.view}
                      </Link>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="mt-6 border-t border-border/60 px-6 py-4 md:px-7">
              <button
                type="button"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground w-full py-2 text-sm tracking-wide transition-colors"
              >
                {d.pdp.crossSell.skip}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
