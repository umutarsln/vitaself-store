'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Check, Repeat, ShieldCheck, Star, Truck } from 'lucide-react'
import { useState } from 'react'
import { Eyebrow, Reveal, Section } from '@/components/reveal'
import { useCart } from '@/lib/cart'
import { useLanguage } from '@/lib/i18n'
import { dailyFoundation, defaultVariant, perDayPrice } from '@/lib/products'

const trustIcons = [Truck, ShieldCheck, Repeat]

export function FeaturedProduct() {
  const { d, price } = useLanguage()
  const { add } = useCart()
  const [added, setAdded] = useState(false)

  const variant = defaultVariant(dailyFoundation)
  const daily = perDayPrice(variant.price, dailyFoundation.servingsPerContainer)

  /** Featured ürünü sepete ekler ve drawer'ı açar. */
  function handleAdd() {
    add(variant.id, 1, { openDrawer: true, handle: dailyFoundation.handle })
    setAdded(true)
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
                className={`shadow-soft hover:shadow-float inline-flex h-13 items-center justify-center rounded-full px-9 text-sm tracking-wide transition-colors duration-200 ${
                  added ? 'bg-positive text-background' : 'bg-foreground text-background'
                }`}
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
