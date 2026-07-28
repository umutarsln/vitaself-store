'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Check, Repeat, ShieldCheck, Star, Truck } from 'lucide-react'
import { useState } from 'react'
import { Eyebrow, Reveal, Section } from '@/components/reveal'
import { useCart } from '@/lib/cart'
import { useLanguage } from '@/lib/i18n'
import { dailyFoundation, perDayPrice } from '@/lib/products'

const trustIcons = [Truck, ShieldCheck, Repeat]

export function FeaturedProduct() {
  const { d, price } = useLanguage()
  const { add, openCart } = useCart()
  const [selected, setSelected] = useState(dailyFoundation.variants[0].id)
  const [added, setAdded] = useState(false)

  const variant = dailyFoundation.variants.find((item) => item.id === selected) ?? dailyFoundation.variants[0]
  const daily = perDayPrice(variant.price, dailyFoundation.servingsPerContainer)

  /** Seçili varyantı sepete ekler ve drawer’ı açar. */
  function handleAdd() {
    add(variant.id)
    setAdded(true)
    openCart()
    window.setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Section id="product" className="bg-ivory" label={d.featured.title}>
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <Reveal className="order-1">
          <div className="bg-card shadow-soft relative aspect-square w-full overflow-hidden rounded-[2rem]">
            <Image
              src={dailyFoundation.featuredImage.url}
              alt={dailyFoundation.featuredImage.altText}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {dailyFoundation.images.slice(1).map((image) => (
              <div
                key={image.url}
                className="bg-card shadow-soft relative aspect-square overflow-hidden rounded-2xl"
              >
                <Image src={image.url} alt={image.altText} fill sizes="30vw" className="object-cover" />
              </div>
            ))}
            <div className="bg-secondary text-secondary-foreground flex aspect-square flex-col justify-center rounded-2xl px-4">
              <p className="text-display text-3xl">32</p>
              <p className="mt-1 text-[11px] leading-snug tracking-wide">
                {d.featured.subtitle.split('.')[0]}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="order-2 flex flex-col">
          <Reveal>
            <Eyebrow>{d.featured.eyebrow}</Eyebrow>
            <h2 className="text-display mt-5 text-[clamp(2.2rem,6vw,3.5rem)]">
              <Link
                href={`/products/${dailyFoundation.handle}`}
                className="transition-opacity duration-300 hover:opacity-80"
              >
                {d.featured.title}
              </Link>
            </h2>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="fill-gold text-gold size-3.5" strokeWidth={0} />
                ))}
              </div>
              <p className="text-muted-foreground text-[13px]">
                {d.reviews.summary.score} · {d.reviews.summary.count}
              </p>
            </div>
            <p className="text-muted-foreground mt-6 max-w-md text-[15px] leading-relaxed">{d.featured.body}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <p className="text-eyebrow text-muted-foreground">{d.featured.options.title}</p>
            <div role="radiogroup" aria-label={d.featured.options.title} className="mt-4 flex flex-col gap-3">
              {dailyFoundation.variants.map((item) => {
                const isActive = item.id === selected
                const isSubscription = item.sellingPlan === 'subscription'
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    onClick={() => setSelected(item.id)}
                    className={`group flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-400 ${
                      isActive
                        ? 'border-primary/40 bg-card shadow-soft'
                        : 'border-border bg-transparent hover:border-foreground/25'
                    }`}
                  >
                    <span className="flex items-start gap-3.5">
                      <span
                        className={`mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                          isActive ? 'border-primary bg-primary' : 'border-border'
                        }`}
                      >
                        {isActive && <Check className="text-primary-foreground size-3" strokeWidth={2.5} />}
                      </span>
                      <span>
                        <span className="flex flex-wrap items-center gap-2 text-sm">
                          {isSubscription ? d.featured.options.subscribe : d.featured.options.once}
                          {isSubscription && (
                            <span className="bg-positive text-positive-foreground rounded-full px-2 py-0.5 text-[10px] tracking-wide">
                              {d.featured.options.save}
                            </span>
                          )}
                        </span>
                        <span className="text-muted-foreground mt-1 block text-xs leading-relaxed">
                          {isSubscription ? d.featured.options.subscribeNote : d.featured.options.onceNote}
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

          <Reveal delay={0.15} className="mt-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-display text-3xl">{price(variant.price)}</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {price(daily)} {d.featured.perDay} · {d.featured.supply}
                </p>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                className="bg-foreground text-background shadow-soft hover:shadow-float inline-flex h-13 items-center justify-center rounded-full px-9 text-sm tracking-wide transition-all duration-500 hover:-translate-y-0.5"
              >
                {added ? <Check className="size-4" strokeWidth={1.8} /> : d.featured.add}
              </button>
            </div>

            <ul className="border-border/70 mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t pt-6">
              {d.featured.trust.map((item, index) => {
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
        </div>
      </div>
    </Section>
  )
}
