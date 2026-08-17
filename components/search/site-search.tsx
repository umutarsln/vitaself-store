'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, FileText, Hash, Package, Search, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLanguage } from '@/lib/i18n'
import { buildSearchIndex, searchSite, type SearchResult, type SearchResultKind } from '@/lib/search'
import { getProduct } from '@/lib/products'
import { useFocusTrap } from '@/lib/use-focus-trap'

type SiteSearchProps = {
  open: boolean
  onClose: () => void
}

const kindLabels: Record<SearchResultKind, (d: ReturnType<typeof useLanguage>['d']) => string> = {
  product: (d) => d.search.products,
  page: (d) => d.search.pages,
  section: (d) => d.search.sections,
}

const kindIcons: Record<SearchResultKind, typeof Package> = {
  product: Package,
  page: FileText,
  section: Hash,
}

/** Sonuç satırını seçildiğinde aramayı kapatır. */
function SearchResultLink({
  result,
  active,
  onSelect,
}: {
  result: SearchResult
  active: boolean
  onSelect: () => void
}) {
  const { d } = useLanguage()
  const Icon = kindIcons[result.kind]
  const product = result.kind === 'product' ? getProduct(result.href.replace('/products/', '')) : null

  return (
    <Link
      href={result.href}
      onClick={onSelect}
      className={`flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors ${
        active ? 'bg-secondary text-secondary-foreground' : 'hover:bg-secondary/60'
      }`}
    >
      {product ? (
        <div className="bg-card relative size-11 shrink-0 overflow-hidden rounded-xl">
          <Image
            src={product.featuredImage.url}
            alt=""
            fill
            sizes="44px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="bg-secondary text-secondary-foreground flex size-11 shrink-0 items-center justify-center rounded-xl">
          <Icon className="size-4" strokeWidth={1.5} />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm">{result.title}</p>
        {result.subtitle ? (
          <p className="text-muted-foreground truncate text-xs">{result.subtitle}</p>
        ) : null}
      </div>
      <span className="text-muted-foreground shrink-0 text-[10px] tracking-wide uppercase">
        {kindLabels[result.kind](d)}
      </span>
      <ArrowRight className="text-muted-foreground size-3.5 shrink-0" strokeWidth={1.5} />
    </Link>
  )
}

/** Site geneli ürün ve sayfa arama paneli. */
export function SiteSearch({ open, onClose }: SiteSearchProps) {
  const { d, lang } = useLanguage()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const index = useMemo(() => buildSearchIndex(lang, d), [lang, d])
  const results = useMemo(() => searchSite(query, index), [query, index])

  useFocusTrap(open, panelRef)

  /** Panel açıldığında sorguyu sıfırlar ve input'a odaklanır. */
  useEffect(() => {
    if (!open) return
    setQuery('')
    setActiveIndex(0)
    const timer = window.setTimeout(() => inputRef.current?.focus(), 50)
    return () => window.clearTimeout(timer)
  }, [open])

  /** Aktif sonuç indeksini sonuç sayısına göre sınırlar. */
  useEffect(() => {
    setActiveIndex((current) => Math.min(current, Math.max(0, results.length - 1)))
  }, [results.length])

  /** Escape ve ok tuşları ile sonuç gezinmeyi dinler. */
  useEffect(() => {
    /** Klavye kısayollarını işler. */
    function onKeyDown(event: KeyboardEvent) {
      if (!open) return

      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setActiveIndex((current) => (results.length ? (current + 1) % results.length : 0))
        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setActiveIndex((current) =>
          results.length ? (current - 1 + results.length) % results.length : 0,
        )
        return
      }

      if (event.key === 'Enter' && results[activeIndex]) {
        event.preventDefault()
        window.location.href = results[activeIndex].href
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose, results, activeIndex])

  /** Açıkken sayfa kaydırmayı kilitler. */
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-28 sm:pt-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label={d.search.close}
            className="absolute inset-0 bg-foreground/40 backdrop-blur-[3px]"
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={d.nav.search}
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-background shadow-float relative w-full max-w-2xl overflow-hidden rounded-[1.75rem] border border-border/60"
          >
            <div className="border-border/60 flex items-center gap-3 border-b px-5 py-4">
              <Search className="text-muted-foreground size-5 shrink-0" strokeWidth={1.5} />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setActiveIndex(0)
                }}
                placeholder={d.search.placeholder}
                className="placeholder:text-muted-foreground/70 w-full bg-transparent text-base outline-none"
                autoComplete="off"
                spellCheck={false}
              />
              <button
                type="button"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground flex size-9 shrink-0 items-center justify-center rounded-full transition-colors"
              >
                <X className="size-4" strokeWidth={1.5} />
                <span className="sr-only">{d.search.close}</span>
              </button>
            </div>

            <div className="max-h-[min(24rem,calc(100vh-12rem))] overflow-y-auto p-3">
              {query.trim() && results.length === 0 ? (
                <p className="text-muted-foreground px-3 py-8 text-center text-sm">{d.search.noResults}</p>
              ) : null}

              {query.trim() && results.length > 0 ? (
                <ul className="flex flex-col gap-1">
                  {results.map((result, index) => (
                    <li key={`${result.kind}-${result.href}-${result.title}`}>
                      <SearchResultLink
                        result={result}
                        active={index === activeIndex}
                        onSelect={onClose}
                      />
                    </li>
                  ))}
                </ul>
              ) : null}

              {!query.trim() ? (
                <p className="text-muted-foreground px-3 py-8 text-center text-sm">{d.search.hint}</p>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
