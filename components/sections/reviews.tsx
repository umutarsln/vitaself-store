'use client'

import { Star } from 'lucide-react'
import { Eyebrow, Reveal, Section } from '@/components/reveal'
import { useLanguage } from '@/lib/i18n'

export function Reviews() {
  const { d } = useLanguage()

  return (
    <Section id="reviews" className="bg-ivory" label={d.reviews.title}>
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal className="max-w-lg">
          <Eyebrow>{d.reviews.eyebrow}</Eyebrow>
          <h2 className="text-display mt-5 text-[clamp(2rem,5.5vw,3.25rem)] text-balance">{d.reviews.title}</h2>
        </Reveal>
        <Reveal delay={0.06} className="flex items-center gap-4">
          <p className="text-display text-5xl">{d.reviews.summary.score}</p>
          <div>
            <div className="flex gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="fill-gold text-gold size-3.5" strokeWidth={0} />
              ))}
            </div>
            <p className="text-muted-foreground mt-1.5 text-xs">{d.reviews.summary.count}</p>
          </div>
        </Reveal>
      </div>

      <ul className="mt-16 grid gap-6 md:grid-cols-3">
        {d.reviews.items.map((item, index) => (
          <Reveal
            as="li"
            key={item.name}
            delay={index * 0.08}
            className="bg-card shadow-soft flex flex-col rounded-[1.5rem] p-7"
          >
            <div className="flex gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Star key={starIndex} className="fill-gold text-gold size-3" strokeWidth={0} />
              ))}
            </div>
            <blockquote className="mt-5 flex-1 text-sm leading-relaxed">{item.quote}</blockquote>
            <footer className="border-border/70 mt-7 border-t pt-5">
              <p className="text-sm">{item.name}</p>
              <p className="text-muted-foreground mt-1 text-xs">{item.meta}</p>
            </footer>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
