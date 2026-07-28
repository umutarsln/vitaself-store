'use client'

import { Beaker, FlaskConical, MinusCircle, Waves } from 'lucide-react'
import { Eyebrow, Reveal, Section } from '@/components/reveal'
import { useLanguage } from '@/lib/i18n'

const icons = [Beaker, Waves, FlaskConical, MinusCircle]

export function Benefits() {
  const { d } = useLanguage()

  return (
    <Section id="about" label={d.benefits.title}>
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>{d.benefits.eyebrow}</Eyebrow>
          <h2 className="text-display mt-5 text-[clamp(2rem,5.5vw,3.25rem)] text-balance">{d.benefits.title}</h2>
        </Reveal>
      </div>

      <ul className="mt-16 grid gap-x-14 gap-y-12 sm:grid-cols-2">
        {d.benefits.items.map((item, index) => {
          const Icon = icons[index] ?? Beaker
          return (
            <Reveal as="li" key={item.title} delay={index * 0.06} className="flex flex-col">
              <span className="border-border/80 text-primary flex size-11 items-center justify-center rounded-full border">
                <Icon className="size-[18px]" strokeWidth={1.3} />
              </span>
              <h3 className="mt-6 text-[17px] tracking-tight">{item.title}</h3>
              <p className="text-muted-foreground mt-3 max-w-sm text-sm leading-relaxed">{item.body}</p>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
