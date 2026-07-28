'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/lib/i18n'
import { siteConfig, siteDescription, siteTitle } from '@/lib/site'
import type { Lang } from '@/lib/i18n/types'

type DocumentLangProps = {
  /** Route bazlı başlık (dile göre). */
  titles?: Partial<Record<Lang, string>> & { en: string; tr: string }
  /** Route bazlı açıklama (dile göre). */
  descriptions?: Partial<Record<Lang, string>> & { en: string; tr: string }
}

/** Verilen dil için yerelleştirilmiş metni döndürür (eksikse EN). */
function localized(
  values: Partial<Record<Lang, string>> & { en: string; tr: string },
  lang: Lang,
): string {
  if (lang === 'tr') return values.tr
  return values[lang] ?? values.en
}

/**
 * html lang + document title/description'ı seçili dile göre günceller.
 */
export function DocumentLang({ titles, descriptions }: DocumentLangProps = {}) {
  const { lang } = useLanguage()

  const titleMap = titles ?? siteConfig.titles
  const descriptionMap = descriptions ?? siteConfig.descriptions

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = localized(titleMap, lang)
    const description = localized(descriptionMap, lang)

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)

    const ogLocale = document.querySelector('meta[property="og:locale"]')
    if (ogLocale) {
      ogLocale.setAttribute('content', siteConfig.locales[lang])
    }
  }, [lang, titleMap, descriptionMap])

  return null
}

/** Route sayfaları için kısa yardımcılar. */
export { siteTitle, siteDescription }
