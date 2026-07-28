'use client'

import { BadgeCheck } from 'lucide-react'
import { Eyebrow, Reveal, Section } from '@/components/reveal'
import { useLanguage } from '@/lib/i18n'

export function Certificates() {
  const { d } = useLanguage()

  return (
    <Section id="certificates" label={d.certificates.title}>
      <Reveal className="max-w-xl">
        <Eyebrow>{d.certificates.eyebrow}</Eyebrow>
        <h2 className="text-display mt-5 text-[clamp(2rem,5.5vw,3.25rem)] text-balance">
          {d.certificates.title}
        </h2>
      </Reveal>

      <Reveal delay={0.08} className="mt-14">
        <ul className="border-border/70 grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border sm:grid-cols-3">
          {d.certificates.items.map((item) => (
            <li
              key={item}
              className="bg-card outline-border/70 flex items-center gap-3 px-6 py-7 outline outline-offset-0"
            >
              <BadgeCheck className="text-primary size-[18px] shrink-0" strokeWidth={1.3} />
              <span className="text-[13px] tracking-wide">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground mt-6 max-w-md text-xs leading-relaxed">{d.certificates.note}</p>
      </Reveal>
    </Section>
  )
}
