'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

/** Ürünler sayfası hero: marka + tek başlık + kısa destek + baskın görsel. */
export function ShopHero() {
  const { d } = useLanguage()
  const reduce = useReducedMotion()

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
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-eyebrow text-muted-foreground"
          >
            {d.shop.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-display mt-6 text-[clamp(2.8rem,8vw,5.2rem)] text-balance"
          >
            <span className="block">Vitaself</span>
            <span className="mt-1 block">
              {d.shop.title}{' '}
              <span className="text-primary italic">{d.shop.titleAccent}</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="text-muted-foreground mt-7 max-w-md text-[15px] leading-relaxed"
          >
            {d.shop.body}
          </motion.p>

          <motion.a
            href="#formulas"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="group text-foreground mt-10 inline-flex items-center gap-2 text-sm tracking-wide"
          >
            {d.shop.browse}
            <ArrowDown
              className="size-4 transition-transform duration-500 group-hover:translate-y-0.5"
              strokeWidth={1.5}
            />
          </motion.a>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5 }}
            className="border-border/70 mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t pt-7"
          >
            {d.shop.trust.map((item) => (
              <li key={item} className="text-muted-foreground text-[11px] tracking-[0.06em] uppercase">
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
          className="shadow-float relative aspect-4/5 w-full overflow-hidden rounded-[2rem]"
        >
          <Image
            src="/images/hero-product.png"
            alt="Vitaself formulas arranged in soft afternoon light"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 48vw"
            className={`object-cover ${reduce ? '' : 'scale-[1.02]'}`}
          />
        </motion.div>
      </div>
    </div>
  )
}
