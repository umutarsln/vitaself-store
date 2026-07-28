/**
 * Site-level SEO / URL yardımcıları.
 */

import type { Lang } from '@/lib/i18n/types'

export const siteConfig = {
  name: 'Vitaself',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vitaself.com',
  twitter: '@vitaself',
  defaultLang: 'tr' as const satisfies Lang,
  locales: {
    tr: 'tr_TR',
    en: 'en_US',
    de: 'de_DE',
    ru: 'ru_RU',
  } as const satisfies Record<Lang, string>,
  titles: {
    tr: 'Vitaself — Klinik formüllü günlük temel takviyeler',
    en: 'Vitaself — Clinically formulated daily essentials',
    de: 'Vitaself — Klinisch formulierte tägliche Essentials',
    ru: 'Vitaself — Клинически разработанные ежедневные добавки',
  } satisfies Record<Lang, string>,
  descriptions: {
    tr: 'Vitaself, klinik dozlu ve bağımsız laboratuvar testli günlük takviyeler üreten bir Türk ilaç markasıdır. Şeffaf dozlar. Gizli hiçbir şey yok.',
    en: 'Vitaself is a Turkish pharmaceutical brand creating clinically formulated, third-party tested daily supplements. Transparent doses. Nothing hidden.',
    de: 'Vitaself ist eine türkische Pharmamarke für klinisch formulierte, unabhängig getestete Nahrungsergänzungsmittel. Transparente Dosierungen. Nichts verborgen.',
    ru: 'Vitaself — турецкий фармацевтический бренд клинически разработанных добавок с независимым тестированием. Прозрачные дозировки. Ничего скрытого.',
  } satisfies Record<Lang, string>,
}

/** Absolute URL üretir. */
export function absoluteUrl(path = '/') {
  const base = siteConfig.url.replace(/\/$/, '')
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalized === '/' ? '' : normalized}`
}

/** Lang için site başlığını döndürür. */
export function siteTitle(lang: Lang): string {
  return siteConfig.titles[lang]
}

/** Lang için site açıklamasını döndürür. */
export function siteDescription(lang: Lang): string {
  return siteConfig.descriptions[lang]
}
