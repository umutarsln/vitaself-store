'use client'

import { Check, Repeat, ShieldCheck, Star, Truck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Eyebrow, Reveal } from '@/components/reveal'
import { useCart } from '@/lib/cart'
import { useLanguage } from '@/lib/i18n'
import {
  FREE_SHIPPING_THRESHOLD,
  copy,
  discountMoney,
  multiplyMoney,
  perDayPrice,
  type Product,
} from '@/lib/products'

const trustIcons = [Truck, ShieldCheck, Repeat]
const quantityOptions = [1, 2, 3] as const
const quantityDiscount: Record<(typeof quantityOptions)[number], number> = {
  1: 0,
  2: 8,
  3: 12,
}

type ProductPurchaseProps = {
  product: Product
}

/** PDP satın alma paneli: varyant, miktar upsell, kargo eşiği, sepete ekle. */
export function ProductPurchase({ product }: ProductPurchaseProps) {
  const { d, lang, price } = useLanguage()
  const { add } = useCart()
  const [selected, setSelected] = useState(product.variants[0].id)
  const [quantity, setQuantity] = useState<(typeof quantityOptions)[number]>(1)
  const [added, setAdded] = useState(false)

  const variant = product.variants.find((item) => item.id === selected) ?? product.variants[0]
  const qtyDiscount = quantityDiscount[quantity]
  const linePrice = multiplyMoney(variant.price, quantity)
  const payable = qtyDiscount > 0 ? discountMoney(linePrice, qtyDiscount) : linePrice
  const daily = perDayPrice(variant.price, product.servingsPerContainer)

  const shippingGap = useMemo(() => {
    const threshold = FREE_SHIPPING_THRESHOLD
    const current = payable
    const remainingUsd = Math.max(0, threshold.usd - current.usd)
    const remainingTry = Math.max(0, threshold.try - current.try)
    return { usd: remainingUsd, try: remainingTry }
  }, [payable])

  const shippingUnlocked = lang === 'tr' ? shippingGap.try <= 0 : shippingGap.usd <= 0

  /** Seçili varyant ve miktarı sepete ekler. */
  function handleAdd() {
    add(variant.id, quantity)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2000)
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
            {product.rating.count.toLocaleString(lang === 'tr' ? 'tr-TR' : 'en-US')} {d.pdp.social}
          </p>
        </div>
        <p className="text-muted-foreground mt-6 max-w-md text-[15px] leading-relaxed">
          {copy(product.description, lang)}
        </p>
      </Reveal>

      <Reveal delay={0.08} className="mt-10">
        <p className="text-eyebrow text-muted-foreground">{d.pdp.options.title}</p>
        <div role="radiogroup" aria-label={d.pdp.options.title} className="mt-4 flex flex-col gap-3">
          {product.variants.map((item) => {
            const isActive = item.id === selected
            const isSubscription = item.sellingPlan === 'subscription'
            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => setSelected(item.id)}
                className={`flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-400 ${
                  isActive
                    ? 'border-primary/40 bg-card shadow-soft'
                    : 'border-border bg-transparent hover:border-foreground/25'
                }`}
              >
                <span className="flex items-start gap-3.5">
                  <span
                    className={`mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isActive ? 'border-primary bg-primary' : 'border-border'
                    }`}
                  >
                    {isActive && <Check className="text-primary-foreground size-3" strokeWidth={2.5} />}
                  </span>
                  <span>
                    <span className="flex flex-wrap items-center gap-2 text-sm">
                      {isSubscription ? d.pdp.options.subscribe : d.pdp.options.once}
                      {isSubscription && (
                        <span className="bg-positive text-positive-foreground rounded-full px-2 py-0.5 text-[10px] tracking-wide">
                          {d.pdp.options.save}
                        </span>
                      )}
                    </span>
                    <span className="text-muted-foreground mt-1 block text-xs leading-relaxed">
                      {isSubscription ? d.pdp.options.subscribeNote : d.pdp.options.onceNote}
                    </span>
                  </span>
                </span>
                <span className="text-right">
                  <span className="block text-sm">{price(item.price)}</span>
                  {item.compareAtPrice && (
                    <span className="text-muted-foreground block text-xs line-through">
                      {price(item.compareAtPrice)}
                    </span>
                  )}
                </span>
              </button>
            )
          })}
        </div>
      </Reveal>

      <Reveal delay={0.12} className="mt-8">
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
          <button
            type="button"
            onClick={handleAdd}
            className="bg-foreground text-background shadow-soft hover:shadow-float inline-flex h-13 min-w-40 items-center justify-center rounded-full px-9 text-sm tracking-wide transition-all duration-500 hover:-translate-y-0.5"
          >
            {added ? (
              <span className="inline-flex items-center gap-2">
                <Check className="size-4" strokeWidth={1.8} />
                {d.pdp.added}
              </span>
            ) : (
              d.pdp.add
            )}
          </button>
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
    </div>
  )
}
