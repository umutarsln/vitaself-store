/**
 * Site-level SEO / URL yardımcıları.
 * Satıcı (e-ticaret, Kepez) ile gıda işletmecisi (ambalaj, Aksu) ayrı tutulur.
 */

import type { Lang } from '@/lib/i18n/types'

/** Mesafeli satış satıcısı ve iletişim — Kepez şirketi; unvan detayı sonra güncellenecek. */
export const seller = {
  brand: 'Vitaself',
  legalName: 'Umut Arslan',
  addressLine: 'Kepez / Antalya, Türkiye',
  city: 'Kepez',
  province: 'Antalya',
  country: 'Türkiye',
  jurisdiction: 'Kepez / Antalya',
  phoneDisplay: '+90 535 799 74 83',
  phoneHref: 'tel:+905357997483',
  emails: {
    hello: 'hello@vitaself.com',
    support: 'destek@vitaself.com',
    privacy: 'privacy@vitaself.com',
  },
  supportHoursTr: 'Hafta içi 09:00–18:00 (TRT)',
  supportHoursEn: 'Weekdays 09:00–18:00 TRT',
} as const

/**
 * Ambalajdaki gıda işletmecisi — ürün “ilaç değildir”.
 * Kaynak: kutu arkası (Kemerağzı / Aksu).
 */
export const manufacturer = {
  tradeName: 'VITALSELF',
  addressLine: 'Kemerağzı Mah. 32001 Sok. No:5A/8 Aksu / Antalya, Türkiye',
  city: 'Aksu',
  province: 'Antalya',
  country: 'Türkiye',
  facilityRegNo: 'TR-16-K-031149',
  tegApprovalNo: '015664-22.12.2022',
  originCountry: 'TÜRKİYE',
} as const

/** Telif / footer satırı: marka ve satıcı adı. */
export function sellerCopyrightLine(year: number): string {
  return `© ${year} ${seller.brand} · ${seller.legalName}`
}

/** Veri sorumlusu / sözleşme satıcısı kısa tanımı. */
export function sellerLegalLabel(): string {
  return `${seller.legalName} (${seller.brand}), ${seller.addressLine}`
}

/** Ambalajdaki gıda işletmecisi kısa tanımı. */
export function manufacturerLegalLabel(): string {
  return `${manufacturer.tradeName}, ${manufacturer.addressLine}`
}

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
    tr: 'Vitaself, klinik dozlu ve bağımsız laboratuvar testli günlük takviye edici gıdalar sunar. İlaç değildir. Şeffaf dozlar. Gizli hiçbir şey yok.',
    en: 'Vitaself offers clinically formulated, third-party tested daily food supplements. Not a medicine. Transparent doses. Nothing hidden.',
    de: 'Vitaself bietet klinisch formulierte, unabhängig getestete Nahrungsergänzungsmittel. Kein Arzneimittel. Transparente Dosierungen. Nichts verborgen.',
    ru: 'Vitaself — клинически разработанные ежедневные пищевые добавки с независимым тестированием. Не лекарство. Прозрачные дозировки. Ничего скрытого.',
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
