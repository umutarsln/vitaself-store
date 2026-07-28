'use client'

import { Check, Minus } from 'lucide-react'
import { Eyebrow, Reveal, Section } from '@/components/reveal'
import { useLanguage } from '@/lib/i18n'

export function Comparison() {
  const { d } = useLanguage()

  return (
    <Section label={d.comparison.title}>
      <Reveal className="max-w-xl">
        <Eyebrow>{d.comparison.eyebrow}</Eyebrow>
        <h2 className="text-display mt-5 text-[clamp(2rem,5.5vw,3.25rem)] text-balance">{d.comparison.title}</h2>
      </Reveal>

      <Reveal delay={0.08} className="mt-14">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <caption className="sr-only">{d.comparison.title}</caption>
            <thead>
              <tr className="border-border border-b">
                <th scope="col" className="text-muted-foreground w-2/5 pb-4 text-[11px] font-normal uppercase tracking-[0.14em]">
                  <span className="sr-only">Criteria</span>
                </th>
                <th scope="col" className="pb-4 text-sm font-normal">
                  {d.comparison.columns.us}
                </th>
                <th scope="col" className="text-muted-foreground pb-4 text-sm font-normal">
                  {d.comparison.columns.them}
                </th>
              </tr>
            </thead>
            <tbody>
              {d.comparison.rows.map((row) => (
                <tr key={row.label} className="border-border/70 border-b">
                  <th scope="row" className="py-5 pr-6 text-sm font-normal">
                    {row.label}
                  </th>
                  <td className="py-5 pr-6">
                    <span className="flex items-center gap-2.5 text-sm">
                      <span className="bg-positive text-positive-foreground flex size-5 shrink-0 items-center justify-center rounded-full">
                        <Check className="size-3" strokeWidth={2} />
                      </span>
                      {row.us}
                    </span>
                  </td>
                  <td className="text-muted-foreground py-5">
                    <span className="flex items-center gap-2.5 text-sm">
                      <span className="bg-muted text-muted-foreground flex size-5 shrink-0 items-center justify-center rounded-full">
                        <Minus className="size-3" strokeWidth={2} />
                      </span>
                      {row.them}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </Section>
  )
}
