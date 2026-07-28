'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Check, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/lib/i18n'
import { LANG_OPTIONS } from '@/lib/i18n/config'
import type { Lang } from '@/lib/i18n/types'

type LanguageSwitcherProps = {
  /** Dropdown (header) veya dikey liste (mobil menü). */
  variant?: 'dropdown' | 'list'
  className?: string
}

/** Aktif dil kaydını Lang koduna göre bulur. */
function findLangOption(code: Lang) {
  return LANG_OPTIONS.find((option) => option.code === code) ?? LANG_OPTIONS[0]
}

/** Bayrak + dil adı ile dil seçici — dropdown veya liste. */
export function LanguageSwitcher({ variant = 'dropdown', className }: LanguageSwitcherProps) {
  const { lang, setLang, d } = useLanguage()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const active = findLangOption(lang)

  /** Dışarı tıklanınca ve Escape ile dropdown'ı kapatır. */
  useEffect(() => {
    if (!open || variant !== 'dropdown') return

    /** Pointer ve Escape olaylarını dinler. */
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    /** Escape tuşu ile kapatır. */
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, variant])

  /** Seçilen dili günceller ve menüyü kapatır. */
  function selectLanguage(code: Lang) {
    setLang(code)
    setOpen(false)
  }

  if (variant === 'list') {
    return (
      <ul className={`flex flex-col gap-1 ${className ?? ''}`} role="list">
        {LANG_OPTIONS.map((option) => {
          const isActive = option.code === lang
          return (
            <li key={option.code}>
              <button
                type="button"
                onClick={() => selectLanguage(option.code)}
                aria-pressed={isActive}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors duration-300 ${
                  isActive ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted/60'
                }`}
              >
                <span className="text-base leading-none" aria-hidden>
                  {option.flag}
                </span>
                <span className="flex-1 tracking-wide">{option.label}</span>
                {isActive && <Check className="size-4 shrink-0" strokeWidth={2} />}
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div ref={rootRef} className={`relative ${className ?? ''}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={d.nav.language}
        onClick={() => setOpen((prev) => !prev)}
        className="border-border/70 hover:border-foreground/25 flex h-9 items-center gap-1.5 rounded-full border bg-background/60 px-2.5 text-[11px] tracking-[0.08em] uppercase backdrop-blur-sm transition-colors duration-300"
      >
        <span className="text-sm leading-none" aria-hidden>
          {active.flag}
        </span>
        <span>{active.code}</span>
        <ChevronDown
          className={`text-muted-foreground size-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          strokeWidth={2}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={d.nav.language}
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="bg-card shadow-float border-border/60 absolute top-[calc(100%+0.5rem)] right-0 z-50 min-w-[10.5rem] overflow-hidden rounded-2xl border py-1.5"
          >
            {LANG_OPTIONS.map((option) => {
              const isActive = option.code === lang
              return (
                <li key={option.code} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    onClick={() => selectLanguage(option.code)}
                    className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13px] transition-colors duration-200 ${
                      isActive
                        ? 'bg-muted/70 text-foreground'
                        : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                    }`}
                  >
                    <span className="text-base leading-none" aria-hidden>
                      {option.flag}
                    </span>
                    <span className="flex-1">{option.label}</span>
                    {isActive && <Check className="size-3.5 shrink-0" strokeWidth={2.2} />}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
