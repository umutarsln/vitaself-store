'use client'

import Image from 'next/image'
import { Eyebrow, Reveal, Section } from '@/components/reveal'
import { useLanguage } from '@/lib/i18n'

/** Klinik endorsement — figure + figcaption yapısı. */
export function Doctor() {
  const { d } = useLanguage()

  return (
    <Section className="bg-secondary" label={d.doctor.eyebrow}>
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
        <Reveal>
          <figure className="shadow-float relative aspect-3/4 w-full max-w-sm overflow-hidden rounded-[2rem]">
            <Image
              src="/images/doctor-portrait.png"
              alt="Dr. Ayşe Demir, member of the Vitaself scientific board"
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover"
            />
          </figure>
        </Reveal>

        <Reveal delay={0.08}>
          <figure>
            <Eyebrow className="text-secondary-foreground/70">{d.doctor.eyebrow}</Eyebrow>
            <blockquote className="text-display text-secondary-foreground mt-6 text-[clamp(1.6rem,4vw,2.5rem)] text-balance">
              {d.doctor.quote}
            </blockquote>
            <figcaption className="mt-8">
              <p className="text-secondary-foreground text-sm">{d.doctor.name}</p>
              <p className="text-secondary-foreground/70 mt-1 text-xs tracking-wide">{d.doctor.role}</p>
            </figcaption>
          </figure>
          <p className="text-secondary-foreground/80 border-secondary-foreground/15 mt-9 max-w-md border-t pt-7 text-sm leading-relaxed">
            {d.doctor.body}
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
