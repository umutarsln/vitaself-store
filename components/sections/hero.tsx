'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

export function Hero() {
  const { d } = useLanguage()

  return (
    <div id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(80% 60% at 70% 10%, oklch(0.97 0.02 295 / 0.9) 0%, transparent 60%), radial-gradient(50% 50% at 8% 80%, oklch(0.96 0.03 85 / 0.7) 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pt-36 pb-20 md:px-10 md:pt-44 md:pb-28 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="flex flex-col">
          <p className="text-eyebrow text-muted-foreground">{d.hero.eyebrow}</p>

          <h1 className="text-display mt-6 text-[clamp(2.9rem,9vw,5.5rem)] text-balance">
            {d.hero.title}
            <br />
            <span className="text-primary italic">{d.hero.titleAccent}</span>
          </h1>

          <p className="text-muted-foreground mt-7 max-w-md text-[15px] leading-relaxed">{d.hero.body}</p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/products"
              className="bg-primary text-primary-foreground shadow-soft hover:shadow-float inline-flex h-13 items-center rounded-full px-8 text-sm tracking-wide transition-shadow duration-300"
            >
              {d.hero.cta}
            </Link>
            <a
              href="#ingredients"
              className="group text-foreground inline-flex items-center gap-2 text-sm tracking-wide"
            >
              {d.hero.ctaSecondary}
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </a>
          </div>

          <ul className="border-border/70 mt-14 flex flex-wrap gap-x-7 gap-y-3 border-t pt-8">
            {d.hero.marks.map((mark) => (
              <li key={mark} className="text-muted-foreground text-[11px] tracking-[0.06em] uppercase">
                {mark}
              </li>
            ))}
          </ul>
        </div>

        <div className="shadow-float relative aspect-4/5 w-full overflow-hidden rounded-[2rem] lg:aspect-3/4">
          <Image
            src="/images/hero-product.png"
            alt="Vitaself Pharma ürün koleksiyonu — Magnezyum, Omega-3, Multivitamin ve Glukozamin"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </div>
  )
}
