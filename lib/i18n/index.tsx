'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  DEFAULT_LANG,
  LANG_COOKIE,
  LANG_STORAGE_KEY,
  LOCALE_BY_LANG,
  isLang,
} from './config'
import { de } from './de'
import { en } from './en'
import { ru } from './ru'
import { tr } from './tr'
import type { Dictionary, Lang } from './types'

export type { Dictionary, Lang } from './types'
export { LANGS, DEFAULT_LANG, LOCALE_BY_LANG, isLang } from './config'

const dictionaries: Record<Lang, Dictionary> = { tr, en, de, ru }

type LanguageContextValue = {
  lang: Lang
  d: Dictionary
  setLang: (lang: Lang) => void
  price: (amount: { usd: number; try: number }) => string
  hydrated: boolean
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

/** Dil tercihini localStorage + cookie'ye yazar. */
function writeStoredLang(lang: Lang) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang)
  } catch {
    // Storage dolu veya engelli — sessizce yoksay.
  }
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`
}

type LanguageProviderProps = {
  children: ReactNode
  /** SSR cookie'den gelen başlangıç dili — hydration flaşını önler. */
  initialLang?: Lang
}

/** Dil provider: SSR ile uyumlu başlangıç + persist + fiyat formatı. */
export function LanguageProvider({ children, initialLang = DEFAULT_LANG }: LanguageProviderProps) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    writeStoredLang(lang)
    setHydrated(true)
  }, [lang])

  /** Aktif dili günceller ve saklar. */
  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    writeStoredLang(next)
  }, [])

  const price = useCallback(
    (amount: { usd: number; try: number }) => {
      const dict = dictionaries[lang]
      const usesTry = dict.currency === 'try'
      return new Intl.NumberFormat(LOCALE_BY_LANG[lang], {
        style: 'currency',
        currency: usesTry ? 'TRY' : 'USD',
        maximumFractionDigits: usesTry ? 0 : 2,
      }).format(usesTry ? amount.try : amount.usd)
    },
    [lang],
  )

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      d: dictionaries[lang],
      setLang,
      price,
      hydrated,
    }),
    [lang, setLang, price, hydrated],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

/** Dil context hook'u. */
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
