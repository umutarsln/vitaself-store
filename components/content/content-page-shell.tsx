'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { useLanguage } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n/types'

const enterEase = [0.16, 1, 0.3, 1] as const

type ContentPageShellProps = {
  eyebrowEn: string
  eyebrowTr: string
  titleEn: string
  titleTr: string
  children: ReactNode
}

/** İçerik bloğu için kademeli giriş animasyonu döndürür. */
function contentEnter(delay: number, reduce: boolean) {
  if (reduce) return {}
  return {
    initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.75, delay, ease: enterEase },
  }
}

/** İçerik sayfası metnini dile göre seçer (de/ru yoksa EN). */
function pickLocalized(en: string, tr: string, lang: Lang): string {
  if (lang === 'tr') return tr
  return en
}

/** Basit içerik / legal sayfa kabuğu — kademeli giriş animasyonlu. */
export function ContentPageShell({
  eyebrowEn,
  eyebrowTr,
  titleEn,
  titleTr,
  children,
}: ContentPageShellProps) {
  const { lang, d } = useLanguage()
  const reduce = useReducedMotion()
  const eyebrow = pickLocalized(eyebrowEn, eyebrowTr, lang)
  const title = pickLocalized(titleEn, titleTr, lang)

  return (
    <>
      <SiteHeader />
      <main className="px-6 pt-32 pb-24 md:px-10 md:pt-40 md:pb-32">
        <article className="mx-auto w-full max-w-3xl">
          <motion.p {...contentEnter(0.04, !!reduce)} className="text-eyebrow text-muted-foreground">
            {eyebrow}
          </motion.p>
          <motion.h1
            {...contentEnter(0.1, !!reduce)}
            className="text-display mt-4 text-[clamp(2.2rem,6vw,3.5rem)] text-balance"
          >
            {title}
          </motion.h1>
          <motion.div
            {...contentEnter(0.18, !!reduce)}
            className="text-muted-foreground prose-content mt-10 space-y-5 text-[15px] leading-relaxed"
          >
            {children}
          </motion.div>
          <motion.p {...contentEnter(0.26, !!reduce)} className="mt-12">
            <Link href="/" className="text-foreground text-sm tracking-wide underline-offset-4 hover:underline">
              {d.common.backHome}
            </Link>
          </motion.p>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
