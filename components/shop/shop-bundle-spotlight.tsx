'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Eyebrow, Reveal, Section } from '@/components/reveal'
import { useLanguage } from '@/lib/i18n'
import { copy, defaultVariant, essentialsTrio } from '@/lib/products'

/** Ürünler sayfasında Essentials Trio spotlight — premium bundle vurgusu. */
export function ShopBundleSpotlight() {
  const { d, lang, price } = useLanguage()
  const variant = defaultVariant(essentialsTrio)

  return (
    <Section className="pt-8 md:pt-10" label={copy(essentialsTrio.title, lang)}>
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem]">
          <div className="absolute inset-0">
            <Image
              src="/images/science-lab.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(105deg, oklch(0.22 0.02 290 / 0.88) 0%, oklch(0.22 0.02 290 / 0.55) 48%, oklch(0.22 0.02 290 / 0.25) 100%)',
              }}
            />
          </div>

          <div className="relative grid gap-10 px-8 py-14 md:px-12 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              {essentialsTrio.badge && (
                <span className="bg-background/15 text-background inline-flex rounded-full px-3 py-1 text-[10px] tracking-[0.16em] uppercase backdrop-blur-md">
                  {copy(essentialsTrio.badge, lang)}
                </span>
              )}
              <Eyebrow className="text-background/55 mt-6">{copy(essentialsTrio.category, lang)}</Eyebrow>
              <h2 className="text-display text-background mt-4 text-[clamp(2.2rem,5vw,3.5rem)] text-balance">
                {copy(essentialsTrio.title, lang)}
              </h2>
              <p className="text-background/75 mt-5 max-w-md text-[15px] leading-relaxed">
                {copy(essentialsTrio.description, lang)}
              </p>
            </div>

            <div className="flex flex-col items-start gap-6 lg:items-end lg:text-right">
              <div>
                <p className="text-display text-background text-3xl">{price(variant.price)}</p>
                {variant.compareAtPrice && (
                  <p className="text-background/55 mt-1 text-sm line-through">
                    {price(variant.compareAtPrice)}
                  </p>
                )}
              </div>
              <Link
                href={`/products/${essentialsTrio.handle}`}
                className="bg-background text-foreground shadow-soft hover:shadow-float group inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm tracking-wide transition-all duration-500 hover:-translate-y-0.5"
              >
                {d.shop.view}
                <ArrowRight
                  className="size-4 transition-transform duration-500 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
