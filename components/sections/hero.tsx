'use client'

import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { useLanguage } from '@/lib/i18n'

const particles = [
  { left: '12%', top: '30%', size: 5, delay: 0 },
  { left: '26%', top: '68%', size: 3, delay: 1.4 },
  { left: '58%', top: '22%', size: 4, delay: 0.7 },
  { left: '74%', top: '58%', size: 3, delay: 2.1 },
  { left: '88%', top: '38%', size: 5, delay: 1.1 },
]

export function Hero() {
  const { d } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '12%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.06])

  return (
    <div id="top" ref={ref} className="relative overflow-hidden">
      {/* soft sunlight wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(80% 60% at 70% 10%, oklch(0.97 0.02 295 / 0.9) 0%, transparent 60%), radial-gradient(50% 50% at 8% 80%, oklch(0.96 0.03 85 / 0.7) 0%, transparent 70%)',
        }}
      />

      {!reduce && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {particles.map((particle) => (
            <motion.span
              key={particle.left}
              className="bg-primary/25 absolute rounded-full"
              style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
              animate={{ y: [0, -22, 0], opacity: [0.15, 0.55, 0.15] }}
              transition={{
                duration: 11,
                delay: particle.delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pt-36 pb-20 md:px-10 md:pt-44 md:pb-28 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="flex flex-col">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-eyebrow text-muted-foreground"
          >
            {d.hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-display mt-6 text-[clamp(2.9rem,9vw,5.5rem)] text-balance"
          >
            {d.hero.title}
            <br />
            <span className="text-primary italic">{d.hero.titleAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="text-muted-foreground mt-7 max-w-md text-[15px] leading-relaxed"
          >
            {d.hero.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <a
              href="#product"
              className="bg-primary text-primary-foreground shadow-soft hover:shadow-float inline-flex h-13 items-center rounded-full px-8 text-sm tracking-wide transition-all duration-500 hover:-translate-y-0.5"
            >
              {d.hero.cta}
            </a>
            <a
              href="#ingredients"
              className="group text-foreground inline-flex items-center gap-2 text-sm tracking-wide"
            >
              {d.hero.ctaSecondary}
              <ArrowRight
                className="size-4 transition-transform duration-500 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="border-border/70 mt-14 flex flex-wrap gap-x-7 gap-y-3 border-t pt-8"
          >
            {d.hero.marks.map((mark) => (
              <li key={mark} className="text-muted-foreground text-[11px] tracking-[0.06em] uppercase">
                {mark}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04, filter: 'blur(14px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: imageY, scale: imageScale }}
          className="shadow-float relative aspect-4/5 w-full overflow-hidden rounded-[2rem] lg:aspect-3/4"
        >
          <Image
            src="/images/hero-product.png"
            alt="Vitaself Daily Foundation bottle on a travertine pedestal in afternoon sunlight"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </div>
  )
}
