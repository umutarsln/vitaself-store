'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { useLanguage } from '@/lib/i18n'

type ContentPageShellProps = {
  eyebrowEn: string
  eyebrowTr: string
  titleEn: string
  titleTr: string
  children: ReactNode
}

/** Basit içerik / legal sayfa kabuğu. */
export function ContentPageShell({
  eyebrowEn,
  eyebrowTr,
  titleEn,
  titleTr,
  children,
}: ContentPageShellProps) {
  const { lang } = useLanguage()
  const eyebrow = lang === 'tr' ? eyebrowTr : eyebrowEn
  const title = lang === 'tr' ? titleTr : titleEn

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
              {lang === 'tr' ? 'Ana sayfaya dön' : 'Back home'}
            </Link>
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
