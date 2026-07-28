'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Eyebrow, Reveal } from '@/components/reveal'
import { useLanguage } from '@/lib/i18n'

export function Science() {
  const { d } = useLanguage()

  return (
    <section id="science" aria-label={d.science.title} className="px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <div className="shadow-float relative overflow-hidden rounded-[2rem]">
            <div className="relative aspect-16/10 w-full md:aspect-21/9">
              <Image
                src="/images/science-lab.png"
                alt="Vitaself pharmaceutical laboratory interior in soft daylight"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, oklch(0.235 0.012 290 / 0.72) 0%, oklch(0.235 0.012 290 / 0.15) 55%, transparent 100%)',
                }}
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-7 md:p-12">
              <Eyebrow className="text-background/70">{d.science.eyebrow}</Eyebrow>
              <h2 className="text-display text-background mt-4 max-w-2xl text-[clamp(1.6rem,4.5vw,2.75rem)] text-balance">
                {d.science.title}
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal delay={0.06}>
            <p className="text-muted-foreground max-w-md text-[15px] leading-relaxed">{d.science.body}</p>
            <a
              href="/science/white-paper"
              className="group text-foreground mt-7 inline-flex items-center gap-2 text-sm tracking-wide"
            >
              {d.science.cta}
              <ArrowUpRight
                className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </a>
          </Reveal>

          <Reveal delay={0.12}>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
              {d.science.stats.map((stat) => (
                <div key={stat.label} className="border-border/80 border-t pt-5">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="text-display block text-[clamp(2rem,4vw,2.75rem)]">{stat.value}</span>
                    <span className="text-muted-foreground mt-2 block text-[11px] leading-snug tracking-[0.06em] uppercase">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
