import type { Lang } from './types'

export const LANG_COOKIE = 'vitaself-lang'
export const LANG_STORAGE_KEY = 'vitaself-lang'
export const DEFAULT_LANG: Lang = 'tr'

/** Desteklenen diller — varsayılan Türkçe önce. */
export const LANGS: Lang[] = ['tr', 'en', 'de', 'ru']

/** Dil kodunun geçerli olup olmadığını kontrol eder. */
export function isLang(value: string | null | undefined): value is Lang {
  return value === 'en' || value === 'tr' || value === 'de' || value === 'ru'
}

/** Cookie veya fallback ile dili çözümler. */
export function resolveLang(value: string | null | undefined): Lang {
  return isLang(value) ? value : DEFAULT_LANG
}

/** Lang → Intl locale eşlemesi. */
export const LOCALE_BY_LANG: Record<Lang, string> = {
  tr: 'tr-TR',
  en: 'en-US',
  de: 'de-DE',
  ru: 'ru-RU',
}

/** Dil seçici dropdown seçenekleri — bayrak + yerel dil adı. */
export const LANG_OPTIONS = [
  { code: 'tr' as const, flag: '🇹🇷', label: 'Türkçe' },
  { code: 'en' as const, flag: '🇺🇸', label: 'English' },
  { code: 'de' as const, flag: '🇩🇪', label: 'Deutsch' },
  { code: 'ru' as const, flag: '🇷🇺', label: 'Русский' },
]
