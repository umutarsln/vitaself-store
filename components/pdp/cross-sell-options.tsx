'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useLanguage } from '@/lib/i18n'
import {
  copy,
  defaultVariant,
  discountMoney,
  getCrossSellOffers,
  type Product,
} from '@/lib/products'

type CrossSellOptionsProps = {
  product: Product
  selectedHandles: string[]
  onChange: (handles: string[]) => void
}

/** PDP satın alma paneli içi cross-sell checkbox seçenekleri. */
export function CrossSellOptions({ product, selectedHandles, onChange }: CrossSellOptionsProps) {
  const { d, lang, price } = useLanguage()
  const offers = getCrossSellOffers(product)

  if (offers.length === 0) {
    return null
  }

  /** Cross-sell satırının seçimini aç/kapa eder. */
  function toggleHandle(handle: string) {
    onChange(
      selectedHandles.includes(handle)
        ? selectedHandles.filter((item) => item !== handle)
        : [...selectedHandles, handle],
    )
  }

  return (
    <Reveal delay={0.14} className="mt-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-eyebrow text-muted-foreground">{d.pdp.crossSell.eyebrow}</p>
          <p className="mt-2 text-sm tracking-tight">{d.pdp.crossSell.title}</p>
        </div>
        {selectedHandles.length > 0 && (
          <span className="bg-positive text-positive-foreground rounded-full px-2.5 py-1 text-[10px] tracking-wide">
            {d.pdp.crossSell.pairSave}
          </span>
        )}
      </div>
      <p className="text-muted-foreground mt-2 max-w-md text-xs leading-relaxed">
        {d.pdp.crossSell.body}
      </p>

      <ul className="mt-4 flex flex-col gap-3">
        {offers.map((offer) => {
          const isActive = selectedHandles.includes(offer.product.handle)
          const variant = defaultVariant(offer.product)
          const pairPrice = discountMoney(variant.price, 5)
          return (
            <li key={offer.product.id}>
              <label
                className={`flex cursor-pointer items-center gap-3.5 rounded-2xl border px-4 py-3.5 transition-all duration-400 ${
                  isActive
                    ? 'border-primary/40 bg-card shadow-soft'
                    : 'border-border hover:border-foreground/25'
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isActive}
                  onChange={() => toggleHandle(offer.product.handle)}
                />
                <span
                  className={`flex size-5 shrink-0 items-center justify-center rounded-md border ${
                    isActive ? 'border-primary bg-primary' : 'border-border'
                  }`}
                >
                  {isActive && <Check className="text-primary-foreground size-3" strokeWidth={2.5} />}
                </span>
                <span className="bg-ivory relative size-12 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={offer.product.featuredImage.url}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm tracking-tight">
                    {copy(offer.product.title, lang)}
                  </span>
                  <span className="text-muted-foreground mt-0.5 block text-xs leading-relaxed">
                    {copy(offer.reason, lang)}
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block text-sm">{price(isActive ? pairPrice : variant.price)}</span>
                  {isActive && (
                    <span className="text-muted-foreground block text-[11px] line-through">
                      {price(variant.price)}
                    </span>
                  )}
                </span>
              </label>
            </li>
          )
        })}
      </ul>
    </Reveal>
  )
}
