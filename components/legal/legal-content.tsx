'use client'

import type { ReactNode } from 'react'
import { useLanguage } from '@/lib/i18n'

type LegalContentProps = {
  tr: ReactNode
  en: ReactNode
}

/** Yasal sayfa gövdesini aktif dile göre (TR veya EN) gösterir. */
export function LegalContent({ tr, en }: LegalContentProps) {
  const { lang } = useLanguage()
  return <>{lang === 'tr' ? tr : en}</>
}

/** Yasal metin bölüm başlığı. */
export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-foreground text-base font-medium tracking-tight">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}
