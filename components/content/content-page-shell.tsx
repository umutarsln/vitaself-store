'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { useLanguage } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n/types'

type ContentPageShellProps = {
  eyebrowEn: string
  eyebrowTr: string
  titleEn: string
  titleTr: string
  children: ReactNode
}

/** İçerik sayfası metnini dile göre seçer (de/ru yoksa EN). */
function pickLocalized(en: string, tr: string, lang: Lang): string {
  if (lang === 'tr') return tr
  return en
}

/** Basit içerik / legal sayfa kabuğu. */
export function ContentPageShell({
  eyebrowEn,
  eyebrowTr,
  titleEn,
  titleTr,
  children,
}: ContentPageShellProps) {
  const { lang, d } = useLanguage()
  const eyebrow = pickLocalized(eyebrowEn, eyebrowTr, lang)
  const title = pickLocalized(titleEn, titleTr, lang)

  return (
    <>
      <SiteHeader />
      <main className="px-6 pt-32 pb-24 md:px-10 md:pt-40 md:pb-32">
        <article className="mx-auto w-full max-w-3xl">
          <p className="text-eyebrow text-muted-foreground">{eyebrow}</p>
          <h1 className="text-display mt-4 text-[clamp(2.2rem,6vw,3.5rem)] text-balance">{title}</h1>
          <div className="text-muted-foreground prose-content mt-10 space-y-5 text-[15px] leading-relaxed">
            {children}
          </div>
          <p className="mt-12">
            <Link href="/" className="text-foreground text-sm tracking-wide underline-offset-4 hover:underline">
              {d.common.backHome}
            </Link>
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
