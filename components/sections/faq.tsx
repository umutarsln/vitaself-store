'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Eyebrow, Reveal, Section } from '@/components/reveal'
import { useLanguage } from '@/lib/i18n'

/** SSS accordion — aria-controls / panel id ile erişilebilir. */
export function Faq() {
  const { d } = useLanguage()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section id="faq" label={d.faq.title}>
      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <Reveal>
          <Eyebrow>{d.faq.eyebrow}</Eyebrow>
          <h2 className="text-display mt-5 text-[clamp(2rem,5.5vw,3.25rem)]">{d.faq.title}</h2>
        </Reveal>

        <Reveal>
          <ul className="border-border/70 border-t">
            {d.faq.items.map((item, index) => {
              const isOpen = open === index
              const panelId = `faq-panel-${index}`
              const buttonId = `faq-button-${index}`
              return (
                <li key={item.q} className="border-border/70 border-b">
                  <button
                    type="button"
                    id={buttonId}
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="text-[15px] leading-snug tracking-tight md:text-[17px]">{item.q}</span>
                    <Plus
                      className={`text-muted-foreground mt-0.5 size-4 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                  {isOpen ? (
                    <div id={panelId} role="region" aria-labelledby={buttonId}>
                      <p className="text-muted-foreground max-w-xl pb-7 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  ) : null}
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
