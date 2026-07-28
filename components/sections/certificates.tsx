'use client'

import Link from 'next/link'
import { BadgeCheck } from 'lucide-react'
import { Eyebrow, Reveal, Section } from '@/components/reveal'
import { useLanguage } from '@/lib/i18n'

const certificateHrefs = [
  '/docs/coa-gmp.html',
  '/science/batch-results',
  '/docs/coa-sample.html',
  '/science/batch-results',
  '/docs/coa-sample.html',
  '/science/batch-results',
]

/** Sertifika grid’i — her madde ilgili COA / batch sayfasına bağlanır. */
export function Certificates() {
  const { d, lang } = useLanguage()

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
          {d.certificates.items.map((item, index) => (
            <li key={item} className="bg-card outline-border/70 outline outline-offset-0">
              <Link
                href={certificateHrefs[index] ?? '/science/batch-results'}
                className="hover:bg-ivory/80 flex items-center gap-3 px-6 py-7 transition-colors duration-300"
              >
                <BadgeCheck className="text-primary size-[18px] shrink-0" strokeWidth={1.3} />
                <span className="text-[13px] tracking-wide">{item}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground mt-6 max-w-md text-xs leading-relaxed">
          {d.certificates.note}{' '}
          <Link href="/science/batch-results" className="text-foreground underline-offset-4 hover:underline">
            {lang === 'tr' ? 'Parti sonuçları' : 'Batch results'}
          </Link>
        </p>
      </Reveal>
    </Section>
  )
}
