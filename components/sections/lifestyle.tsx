'use client'

import Image from 'next/image'
import { Eyebrow, Reveal, Section } from '@/components/reveal'
import { useLanguage } from '@/lib/i18n'

export function Lifestyle() {
  const { d } = useLanguage()

  return (
    <Section className="bg-ivory" label={d.lifestyle.title}>
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <Reveal>
          <div className="shadow-float relative aspect-4/5 w-full overflow-hidden rounded-[2rem]">
            <Image
              src="/images/lifestyle-morning.png"
              alt="A Vitaself bottle beside a glass of water on an oak table in morning light"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>{d.lifestyle.eyebrow}</Eyebrow>
            <h2 className="text-display mt-5 text-[clamp(2rem,5.5vw,3.25rem)] text-balance">
              {d.lifestyle.title}
            </h2>
          </Reveal>

          <ol className="mt-12 flex flex-col">
            {d.lifestyle.steps.map((step, index) => (
              <Reveal
                as="li"
                key={step.step}
                delay={index * 0.08}
                className="border-border/70 flex gap-6 border-t py-7 last:border-b"
              >
                <span className="text-muted-foreground mt-1 font-mono text-[11px] tracking-widest">
                  {step.step}
                </span>
                <div>
                  <h3 className="text-[17px] tracking-tight">{step.title}</h3>
                  <p className="text-muted-foreground mt-2.5 max-w-sm text-sm leading-relaxed">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
