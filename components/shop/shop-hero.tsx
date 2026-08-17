'use client'

import Image from 'next/image'
import { ArrowDown } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

/** Ürünler sayfası hero: marka + tek başlık + kısa destek + baskın görsel. */
export function ShopHero() {
  const { d } = useLanguage()

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(70% 55% at 75% 0%, oklch(0.97 0.02 295 / 0.85) 0%, transparent 58%), radial-gradient(45% 45% at 10% 85%, oklch(0.96 0.03 85 / 0.65) 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto grid w-full max-w-6xl items-end gap-12 px-6 pt-36 pb-16 md:px-10 md:pt-44 md:pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="flex flex-col pb-2">
          <p className="text-eyebrow text-muted-foreground">{d.shop.eyebrow}</p>

          <h1 className="text-display mt-6 text-[clamp(2.8rem,8vw,5.2rem)] text-balance">
            <span className="block">Vitaself</span>
            <span className="mt-1 block">
              {d.shop.title} <span className="text-primary italic">{d.shop.titleAccent}</span>
            </span>
          </h1>

          <p className="text-muted-foreground mt-7 max-w-md text-[15px] leading-relaxed">{d.shop.body}</p>

          <a
            href="#formulas"
            className="group text-foreground mt-10 inline-flex items-center gap-2 text-sm tracking-wide"
          >
            {d.shop.browse}
            <ArrowDown
              className="size-4 transition-transform duration-300 group-hover:translate-y-0.5"
              strokeWidth={1.5}
            />
          </a>

          <ul className="border-border/70 mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t pt-7">
            {d.shop.trust.map((item) => (
              <li key={item} className="text-muted-foreground text-[11px] tracking-[0.06em] uppercase">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="shadow-float relative aspect-4/5 w-full overflow-hidden rounded-[2rem]">
          <Image
            src="/images/hero-product.png"
            alt="Vitaself formulas arranged in soft afternoon light"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}
