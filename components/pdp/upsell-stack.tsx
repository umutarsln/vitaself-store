'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Eyebrow, Reveal, Section } from '@/components/reveal'
import { useCart } from '@/lib/cart'
import { useLanguage } from '@/lib/i18n'
import {
  STACK_DISCOUNT_PERCENT,
  addMoney,
  copy,
  defaultVariant,
  discountMoney,
  getStackProducts,
  type Product,
} from '@/lib/products'

type UpsellStackProps = {
  product: Product
}

/** “Sıkça birlikte alınanlar” stack upsell — seçili ürünleri tek CTA ile sepete ekler. */
export function UpsellStack({ product }: UpsellStackProps) {
  const { d, lang, price } = useLanguage()
  const { add } = useCart()
  const stack = getStackProducts(product)
  const [selected, setSelected] = useState<string[]>(() => stack.map((item) => item.handle))
  const [added, setAdded] = useState(false)

  const items = useMemo(() => {
    const primary = { product, locked: true as const }
    const others = stack.map((item) => ({ product: item, locked: false as const }))
    return [primary, ...others]
  }, [product, stack])

  if (stack.length === 0) {
    return null
  }

  const selectedProducts = items
    .filter((item) => item.locked || selected.includes(item.product.handle))
    .map((item) => item.product)

  const listTotal = selectedProducts.reduce(
    (sum, item) => addMoney(sum, defaultVariant(item).price),
    { usd: 0, try: 0 },
  )
  const stackTotal = discountMoney(listTotal, STACK_DISCOUNT_PERCENT)
  const savings = { usd: listTotal.usd - stackTotal.usd, try: listTotal.try - stackTotal.try }

  /** Stack satırının seçimini aç/kapa eder. */
  function toggleHandle(handle: string) {
    setSelected((prev) =>
      prev.includes(handle) ? prev.filter((item) => item !== handle) : [...prev, handle],
    )
  }

  /** Ana ürün + seçili stack ürünlerini sepete ekler. */
  function handleAddStack() {
    for (const item of selectedProducts) {
      add(defaultVariant(item).id, 1)
    }
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2200)
  }

  return (
    <Section className="bg-ivory" label={d.pdp.upsell.title}>
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <Reveal>
          <Eyebrow>{d.pdp.upsell.eyebrow}</Eyebrow>
          <h2 className="text-display mt-5 text-[clamp(2rem,5vw,3rem)] text-balance">
            {d.pdp.upsell.title}
          </h2>
          <p className="text-muted-foreground mt-5 max-w-md text-[15px] leading-relaxed">
            {d.pdp.upsell.body}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="bg-card/70 shadow-soft border-border/60 rounded-[2rem] border p-5 md:p-7">
            <ul className="flex flex-col gap-4">
              {items.map((item, index) => {
                const isChecked = item.locked || selected.includes(item.product.handle)
                const variant = defaultVariant(item.product)
                return (
                  <li key={item.product.id}>
                    <label
                      className={`flex cursor-pointer items-center gap-4 rounded-2xl border px-4 py-3.5 transition-all duration-400 ${
                        isChecked
                          ? 'border-primary/35 bg-background shadow-soft'
                          : 'border-border/80 opacity-70'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={isChecked}
                        disabled={item.locked}
                        onChange={() => {
                          if (!item.locked) toggleHandle(item.product.handle)
                        }}
                      />
                      <span
                        className={`flex size-5 shrink-0 items-center justify-center rounded-md border ${
                          isChecked ? 'border-primary bg-primary' : 'border-border'
                        }`}
                      >
                        {isChecked && (
                          <Check className="text-primary-foreground size-3" strokeWidth={2.5} />
                        )}
                      </span>
                      <span className="bg-ivory relative size-14 shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={item.product.featuredImage.url}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm tracking-tight">
                          {copy(item.product.title, lang)}
                          {item.locked && (
                            <span className="text-muted-foreground ml-2 text-[10px] tracking-[0.12em] uppercase">
                              {d.pdp.upsell.included}
                            </span>
                          )}
                        </span>
                        <span className="text-muted-foreground mt-0.5 block truncate text-xs">
                          {copy(item.product.subtitle, lang)}
                        </span>
                      </span>
                      <span className="shrink-0 text-sm">{price(variant.price)}</span>
                    </label>
                    {index < items.length - 1 && (
                      <p className="text-muted-foreground py-1 text-center text-lg leading-none">+</p>
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="border-border/70 mt-6 flex flex-wrap items-end justify-between gap-4 border-t pt-6">
              <div>
                <p className="text-muted-foreground text-[11px] tracking-[0.12em] uppercase">
                  {d.pdp.upsell.total}
                </p>
                <p className="text-display mt-1 text-2xl">{price(stackTotal)}</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  <span className="mr-2 line-through">{price(listTotal)}</span>
                  {d.pdp.upsell.save} {price(savings)} · {STACK_DISCOUNT_PERCENT}%
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddStack}
                disabled={selectedProducts.length === 0}
                className="bg-primary text-primary-foreground shadow-soft hover:shadow-float inline-flex h-12 items-center rounded-full px-7 text-sm tracking-wide transition-all duration-500 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50"
              >
                {added ? d.pdp.added : d.pdp.upsell.addStack}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
