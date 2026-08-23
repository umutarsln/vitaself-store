'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Eyebrow, Reveal, Section } from '@/components/reveal'
import { useLanguage } from '@/lib/i18n'

type IngredientItem = {
  group: string
  name: string
  dose: string
  note: string
}

/**
 * Listedeki öğenin üstünde yeni bir grup başlığı gösterilip gösterilmeyeceğini döner.
 */
function shouldShowGroup(items: IngredientItem[], index: number): boolean {
  const current = items[index]
  if (!current?.group) return false
  return current.group !== items[index - 1]?.group
}

/** Ana sayfa içerik bölümü — formül aktiflerini kısa açıklamalarla listeler. */
export function Ingredients() {
  const { d } = useLanguage()
  const items = d.ingredients.items

  return (
    <Section id="ingredients" className="bg-ivory" label={d.ingredients.title}>
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="flex flex-col">
          <Reveal>
            <Eyebrow>{d.ingredients.eyebrow}</Eyebrow>
            <h2 className="text-display mt-5 text-[clamp(2rem,5.5vw,3.25rem)] text-balance">
              {d.ingredients.title}
            </h2>
            <p className="text-muted-foreground mt-6 max-w-sm text-sm leading-relaxed">{d.ingredients.body}</p>
            <a
              href="/science/ingredient-panel"
              className="group text-foreground mt-8 inline-flex items-center gap-2 text-sm tracking-wide"
            >
              {d.ingredients.cta}
              <ArrowUpRight
                className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </a>
          </Reveal>

          <Reveal delay={0.12} className="mt-12">
            <div className="shadow-soft relative aspect-4/3 w-full overflow-hidden rounded-[1.75rem]">
              <Image
                src="/images/ingredient-macro.png"
                alt="Raw Vitaself ingredients arranged in glass dishes under natural light"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <ul className="border-border/70 border-t">
            {items.map((item, index) => {
              const showGroup = shouldShowGroup(items, index)
              return (
                <li
                  key={item.name}
                  className="border-border/70 group border-b py-6 transition-colors duration-500 md:py-7"
                >
                  {showGroup && (
                    <p className="text-eyebrow text-muted-foreground mb-4 text-[11px] tracking-[0.16em] uppercase">
                      {item.group}
                    </p>
                  )}
                  <div className="flex items-baseline justify-between gap-6">
                    <div>
                      <p className="text-[17px] tracking-tight">{item.name}</p>
                      <p className="text-muted-foreground mt-1.5 text-[13px] leading-relaxed">{item.note}</p>
                    </div>
                    <p className="text-muted-foreground font-mono text-xs tracking-tight whitespace-nowrap">
                      {item.dose}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
