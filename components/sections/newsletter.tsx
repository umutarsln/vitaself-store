'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Eyebrow, Reveal, Section } from '@/components/reveal'
import { useLanguage } from '@/lib/i18n'

export function Newsletter() {
  const { d } = useLanguage()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <Section className="bg-ivory" label={d.newsletter.title}>
      <div className="bg-card shadow-soft grid overflow-hidden rounded-[2rem] lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal className="p-8 md:p-14">
          <Eyebrow>{d.newsletter.eyebrow}</Eyebrow>
          <h2 className="text-display mt-5 text-[clamp(1.8rem,4.5vw,2.75rem)] text-balance">
            {d.newsletter.title}
          </h2>
          <p className="text-muted-foreground mt-5 max-w-md text-sm leading-relaxed">{d.newsletter.body}</p>

          <form
            onSubmit={(event) => {
              event.preventDefault()
              setSubmitted(true)
            }}
            className="mt-9 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              {d.newsletter.placeholder}
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={d.newsletter.placeholder}
              className="border-border bg-background placeholder:text-muted-foreground/70 focus:border-primary/50 h-13 flex-1 rounded-full border px-6 text-sm outline-none transition-colors duration-300"
            />
            <button
              type="submit"
              className="bg-foreground text-background shadow-soft hover:shadow-float group inline-flex h-13 items-center justify-center gap-2 rounded-full px-8 text-sm tracking-wide transition-all duration-500 hover:-translate-y-0.5"
            >
              {d.newsletter.cta}
              <ArrowRight
                className="size-4 transition-transform duration-500 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </button>
          </form>

          <p aria-live="polite" className="text-muted-foreground mt-4 text-xs">
            {submitted ? d.newsletter.success : d.newsletter.note}
          </p>
        </Reveal>

        <div className="relative min-h-64 lg:min-h-full">
          <Image
            src="/images/capsules-macro.png"
            alt="Three Vitaself capsules photographed in macro against an ivory background"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
      </div>
    </Section>
  )
}
