'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Eyebrow, Reveal, Section } from '@/components/reveal'
import { useLanguage } from '@/lib/i18n'

export function Faq() {
  const { d } = useLanguage()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section label={d.faq.title}>
      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <Reveal>
          <Eyebrow>{d.faq.eyebrow}</Eyebrow>
          <h2 className="text-display mt-5 text-[clamp(2rem,5.5vw,3.25rem)]">{d.faq.title}</h2>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="border-border/70 border-t">
            {d.faq.items.map((item, index) => {
              const isOpen = open === index
              return (
                <li key={item.q} className="border-border/70 border-b">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="text-[15px] leading-snug tracking-tight md:text-[17px]">{item.q}</span>
                    <Plus
                      className={`text-muted-foreground mt-0.5 size-4 shrink-0 transition-transform duration-500 ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-muted-foreground max-w-xl pb-7 text-sm leading-relaxed">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
