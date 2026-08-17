'use client'

import { Check, Repeat, ShieldCheck, Truck } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { CrossSellOptions } from '@/components/pdp/cross-sell-options'
import { CrossSellPrompt } from '@/components/pdp/cross-sell-prompt'
import { ShippingDeadline } from '@/components/pdp/shipping-deadline'
import { Eyebrow, Reveal } from '@/components/reveal'
import { useCart } from '@/lib/cart'
import { useLanguage } from '@/lib/i18n'
import {
  FREE_SHIPPING_THRESHOLD,
  copy,
  defaultVariant,
  getProduct,
  lineTotal,
  perDayPrice,
  quantitySavingsAmount,
  type Product,
} from '@/lib/products'

const trustIcons = [Truck, ShieldCheck, Repeat]
const quantityOptions = [1, 2, 3] as const

/** Highlight satırına atanan emoji seti (sırayla döngü yapar). */
const HIGHLIGHT_EMOJIS = ['✅', '⚡', '🔬', '🌿', '💊', '🧬']

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

  const payable = lineTotal(variant.price, quantity)
  const savings = quantitySavingsAmount(variant.price, quantity)
  const hasSavings = d.currency === 'try' ? savings.try > 0 : savings.usd > 0

  const daily = perDayPrice(variant.price, product.servingsPerContainer)

  const shippingGap = useMemo(() => {
    const threshold = FREE_SHIPPING_THRESHOLD
    const remainingUsd = Math.max(0, threshold.usd - payable.usd)
    const remainingTry = Math.max(0, threshold.try - payable.try)
    return { usd: remainingUsd, try: remainingTry }
  }, [payable])

  const shippingUnlocked = d.currency === 'try' ? shippingGap.try <= 0 : shippingGap.usd <= 0
  const shippingProgress = d.currency === 'try'
    ? Math.min(1, payable.try / FREE_SHIPPING_THRESHOLD.try)
    : Math.min(1, payable.usd / FREE_SHIPPING_THRESHOLD.usd)

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
        <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed line-clamp-2">
          {copy(product.subtitle, lang)}
        </p>
      </Reveal>

      <Reveal delay={0.08} className="mt-10">
        <p className="text-eyebrow text-muted-foreground">{d.pdp.quantity.title}</p>
        <div role="radiogroup" aria-label={d.pdp.quantity.title} className="mt-4 grid grid-cols-3 gap-3">
          {quantityOptions.map((option) => {
            const isActive = quantity === option
            const label =
              option === 1 ? d.pdp.quantity.one : option === 2 ? d.pdp.quantity.two : d.pdp.quantity.three
            const optionSavings = quantitySavingsAmount(variant.price, option)
            const optionHasSavings = d.currency === 'try' ? optionSavings.try > 0 : optionSavings.usd > 0
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
                {optionHasSavings && (
                  <span className="text-positive-foreground mt-1 block text-[10px] tracking-wide uppercase">
                    {price(optionSavings)} {d.pdp.saved}
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
              {hasSavings && (
                <span className="text-positive-foreground mr-2">
                  {price(savings)} {d.pdp.saved}
                </span>
              )}
              {price(daily)} {d.pdp.perDose} · {d.pdp.supply}
            </p>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className={`text-background shadow-soft hover:shadow-float inline-flex h-13 min-w-40 items-center justify-center rounded-full px-9 text-sm tracking-wide transition-colors duration-200 ${
              added ? 'bg-positive' : 'bg-foreground'
            }`}
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

        {/* Ücretsiz kargo ilerleme barı */}
        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className={shippingUnlocked ? 'text-positive-foreground font-medium' : 'text-muted-foreground'}>
              {shippingUnlocked
                ? d.pdp.shippingBar.unlocked
                : `${price(shippingGap)} ${d.pdp.shippingBar.remaining}`}
            </span>
            {shippingUnlocked && (
              <span className="text-positive-foreground text-[10px] tracking-wide uppercase">✓ Ücretsiz kargo</span>
            )}
          </div>
          <div className="bg-border/60 h-1.5 w-full overflow-hidden rounded-full">
            <div
              className={`h-full rounded-full transition-[width] duration-200 ${shippingUnlocked ? 'bg-positive-foreground' : 'bg-foreground/40'}`}
              style={{ width: `${shippingProgress * 100}%` }}
            />
          </div>
        </div>

        {/* Kargo deadline */}
        <div className="mt-4">
          <ShippingDeadline />
        </div>

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
        <ul className="mt-4 flex flex-col gap-2.5">
          {product.highlights.map((item, index) => (
            <li
              key={copy(item, lang)}
              className="flex items-start gap-3 text-sm leading-snug"
            >
              <span className="shrink-0 text-base leading-none" aria-hidden>
                {HIGHLIGHT_EMOJIS[index % HIGHLIGHT_EMOJIS.length]}
              </span>
              <span className="text-foreground/85">{copy(item, lang)}</span>
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
