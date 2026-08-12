'use client'

import { Check, Repeat, ShieldCheck, Star, Truck } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { CrossSellOptions } from '@/components/pdp/cross-sell-options'
import { CrossSellPrompt } from '@/components/pdp/cross-sell-prompt'
import { Eyebrow, Reveal } from '@/components/reveal'
import { useCart } from '@/lib/cart'
import { useLanguage } from '@/lib/i18n'
import { LOCALE_BY_LANG } from '@/lib/i18n/config'
import {
  FREE_SHIPPING_THRESHOLD,
  copy,
  defaultVariant,
  getProduct,
  lineTotal,
  perDayPrice,
  quantityDiscountPercent,
  type Product,
} from '@/lib/products'

const trustIcons = [Truck, ShieldCheck, Repeat]
const quantityOptions = [1, 2, 3] as const

type ProductPurchaseProps = {
  product: Product
}

/** PDP satın alma paneli: miktar, cross-sell, kargo eşiği, sepete ekle. */
export function ProductPurchase({ product }: ProductPurchaseProps) {
  const { d, lang, price } = useLanguage()
  const { add } = useCart()
  const variant = defaultVariant(product)
  const [quantity, setQuantity] = useState<(typeof quantityOptions)[number]>(1)
  const [crossSellHandles, setCrossSellHandles] = useState<string[]>([])
  const [added, setAdded] = useState(false)
  const [promptOpen, setPromptOpen] = useState(false)

  /** Ürün değişince satın alma ve cross-sell seçimlerini sıfırlar. */
  useEffect(() => {
    setQuantity(1)
    setCrossSellHandles([])
    setAdded(false)
    setPromptOpen(false)
  }, [product.id])

  const qtyDiscount = quantityDiscountPercent(quantity)
  const payable = lineTotal(variant.price, quantity)
  const linePrice = {
    usd: variant.price.usd * quantity,
    try: variant.price.try * quantity,
  }
  const daily = perDayPrice(variant.price, product.servingsPerContainer)

  const shippingGap = useMemo(() => {
    const threshold = FREE_SHIPPING_THRESHOLD
    const current = payable
    const remainingUsd = Math.max(0, threshold.usd - current.usd)
    const remainingTry = Math.max(0, threshold.try - current.try)
    return { usd: remainingUsd, try: remainingTry }
  }, [payable])

  const shippingUnlocked = d.currency === 'try' ? shippingGap.try <= 0 : shippingGap.usd <= 0

  /** Ana ürün + seçili cross-sell'leri sepete ekler ve prompt açar. */
  function handleAdd() {
    add(variant.id, quantity, { handle: product.handle })
    for (const handle of crossSellHandles) {
      const offer = getProduct(handle)
      if (!offer) continue
      add(defaultVariant(offer).id, 1, { handle: offer.handle })
    }
    setAdded(true)
    setPromptOpen(true)
    window.setTimeout(() => setAdded(false), 2000)
  }

  /** Cross-sell prompt'unu kapatır. */
  function handleClosePrompt() {
    setPromptOpen(false)
  }

  return (
    <div className="flex flex-col">
      <Reveal>
        <Eyebrow>{copy(product.category, lang)}</Eyebrow>
        <h1 className="text-display mt-4 text-[clamp(2.4rem,6vw,3.75rem)] text-balance">
          {copy(product.title, lang)}
        </h1>
        <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed">
          {copy(product.subtitle, lang)}
        </p>
        <div className="mt-5 flex items-center gap-3">
          <div className="flex gap-0.5" aria-hidden>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="fill-gold text-gold size-3.5" strokeWidth={0} />
            ))}
          </div>
          <p className="text-muted-foreground text-[13px]">
            {product.rating.value.toFixed(1)} ·{' '}
            {product.rating.count.toLocaleString(LOCALE_BY_LANG[lang])} {d.pdp.social}
          </p>
        </div>
        <p className="text-muted-foreground mt-6 max-w-md text-[15px] leading-relaxed">
          {copy(product.description, lang)}
        </p>
      </Reveal>

      <Reveal delay={0.08} className="mt-10">
        <p className="text-eyebrow text-muted-foreground">{d.pdp.quantity.title}</p>
        <div role="radiogroup" aria-label={d.pdp.quantity.title} className="mt-4 grid grid-cols-3 gap-3">
          {quantityOptions.map((option) => {
            const isActive = quantity === option
            const saveLabel =
              option === 2 ? d.pdp.quantity.saveTwo : option === 3 ? d.pdp.quantity.saveThree : null
            const label =
              option === 1 ? d.pdp.quantity.one : option === 2 ? d.pdp.quantity.two : d.pdp.quantity.three
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => setQuantity(option)}
                className={`rounded-2xl border px-3 py-3.5 text-center transition-all duration-400 ${
                  isActive
                    ? 'border-primary/40 bg-card shadow-soft'
                    : 'border-border hover:border-foreground/25'
                }`}
              >
                <span className="block text-sm tracking-tight">{label}</span>
                {saveLabel && (
                  <span className="text-positive-foreground mt-1 block text-[10px] tracking-wide uppercase">
                    {saveLabel}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </Reveal>

      <CrossSellOptions
        product={product}
        selectedHandles={crossSellHandles}
        onChange={setCrossSellHandles}
      />

      <Reveal delay={0.16} className="mt-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-display text-3xl">{price(payable)}</p>
            <p className="text-muted-foreground mt-1 text-xs">
              {qtyDiscount > 0 && (
                <span className="mr-2 line-through">{price(linePrice)}</span>
              )}
              {price(daily)} {d.pdp.perDay} · {d.pdp.supply}
            </p>
          </div>
          <motion.button
            type="button"
            onClick={handleAdd}
            animate={
              added
                ? { scale: [1, 0.97, 1.02, 1], backgroundColor: 'var(--positive)' }
                : { scale: 1, backgroundColor: 'var(--foreground)' }
            }
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-background shadow-soft hover:shadow-float inline-flex h-13 min-w-40 items-center justify-center rounded-full px-9 text-sm tracking-wide transition-shadow duration-500 hover:-translate-y-0.5"
          >
            {added ? (
              <span className="inline-flex items-center gap-2">
                <Check className="size-4" strokeWidth={1.8} />
                {d.pdp.added}
              </span>
            ) : (
              d.pdp.add
            )}
          </motion.button>
        </div>

        <p
          className={`mt-5 text-xs tracking-wide ${
            shippingUnlocked ? 'text-positive-foreground' : 'text-muted-foreground'
          }`}
        >
          {shippingUnlocked
            ? d.pdp.shipping.unlocked
            : `${price(shippingGap)} ${d.pdp.shipping.remaining}`}
        </p>

        <ul className="border-border/70 mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t pt-6">
          {d.pdp.trust.map((item, index) => {
            const Icon = trustIcons[index] ?? ShieldCheck
            return (
              <li key={item} className="text-muted-foreground flex items-center gap-2 text-xs">
                <Icon className="size-4" strokeWidth={1.4} />
                {item}
              </li>
            )
          })}
        </ul>
      </Reveal>

      <Reveal delay={0.2} className="mt-12">
        <p className="text-eyebrow text-muted-foreground">{d.pdp.highlights}</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {product.highlights.map((item) => (
            <li
              key={copy(item, lang)}
              className="border-border/70 text-foreground/90 flex items-start gap-3 border-b pb-3 text-sm leading-relaxed"
            >
              <Check className="text-primary mt-0.5 size-4 shrink-0" strokeWidth={1.6} />
              {copy(item, lang)}
            </li>
          ))}
        </ul>
      </Reveal>

      <CrossSellPrompt
        product={product}
        open={promptOpen}
        excludeHandles={crossSellHandles}
        onClose={handleClosePrompt}
      />
    </div>
  )
}
