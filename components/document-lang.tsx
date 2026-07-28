'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/lib/i18n'
import { siteConfig } from '@/lib/site'

type DocumentLangProps = {
  /** Route bazlı varsayılan başlık (opsiyonel). */
  titleEn?: string
  titleTr?: string
  descriptionEn?: string
  descriptionTr?: string
}

/**
 * html lang + document title/description’ı seçili dile göre günceller.
 * SSR metadata İngilizce kalır; client tercih persist edilen dili yansıtır.
 */
export function DocumentLang({
  titleEn = siteConfig.titles.en,
  titleTr = siteConfig.titles.tr,
  descriptionEn = siteConfig.descriptions.en,
  descriptionTr = siteConfig.descriptions.tr,
}: DocumentLangProps) {
  const { lang } = useLanguage()

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = lang === 'tr' ? titleTr : titleEn

    const description = lang === 'tr' ? descriptionTr : descriptionEn
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)

    const ogLocale = document.querySelector('meta[property="og:locale"]')
    if (ogLocale) {
      ogLocale.setAttribute('content', lang === 'tr' ? siteConfig.localeTr : siteConfig.localeDefault)
    }
  }, [lang, titleEn, titleTr, descriptionEn, descriptionTr])

  return null
}
