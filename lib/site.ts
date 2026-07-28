/**
 * Site-level SEO / URL yardımcıları.
 */

export const siteConfig = {
  name: 'Vitaself',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vitaself.com',
  twitter: '@vitaself',
  localeDefault: 'en_US' as const,
  localeTr: 'tr_TR' as const,
  titles: {
    en: 'Vitaself — Clinically formulated daily essentials',
    tr: 'Vitaself — Klinik formüllü günlük temel takviyeler',
  },
  descriptions: {
    en: 'Vitaself is a Turkish pharmaceutical brand creating clinically formulated, third-party tested daily supplements. Transparent doses. Nothing hidden.',
    tr: 'Vitaself, klinik dozlu ve bağımsız laboratuvar testli günlük takviyeler üreten bir Türk ilaç markasıdır. Şeffaf dozlar. Gizli hiçbir şey yok.',
  },
}

/** Absolute URL üretir. */
export function absoluteUrl(path = '/') {
  const base = siteConfig.url.replace(/\/$/, '')
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalized === '/' ? '' : normalized}`
}
