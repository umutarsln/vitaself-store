import type { Dictionary, Lang } from '@/lib/i18n/types'
import { copy, products, type Product } from '@/lib/products'

export type SearchResultKind = 'product' | 'page' | 'section'

export type SearchResult = {
  kind: SearchResultKind
  href: string
  title: string
  subtitle?: string
  haystack: string
}

/** Arama metnini karşılaştırma için normalize eder. */
export function normalizeSearchText(text: string): string {
  return text
    .toLocaleLowerCase('tr')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

/** Ürün kaydını arama indeksine dönüştürür. */
function productToSearchResult(product: Product, lang: Lang): SearchResult {
  const title = copy(product.title, lang)
  const subtitle = copy(product.subtitle, lang)
  const description = copy(product.description, lang)
  const category = copy(product.category, lang)
  const highlights = product.highlights.map((item) => copy(item, lang)).join(' ')

  return {
    kind: 'product',
    href: `/products/${product.handle}`,
    title,
    subtitle,
    haystack: normalizeSearchText(
      [title, subtitle, description, category, highlights, product.handle.replace(/-/g, ' ')].join(' '),
    ),
  }
}

/** Footer ve nav linklerinden sayfa kayıtları üretir. */
function pagesFromDictionary(d: Dictionary): SearchResult[] {
  const entries: SearchResult[] = [
    {
      kind: 'page',
      href: '/products',
      title: d.nav.shop,
      subtitle: d.shop.title,
      haystack: normalizeSearchText(`${d.nav.shop} ${d.shop.title} ${d.shop.body} products shop`),
    },
    {
      kind: 'page',
      href: '/',
      title: d.hero.title,
      subtitle: d.hero.eyebrow,
      haystack: normalizeSearchText(`${d.hero.title} ${d.hero.titleAccent} ${d.hero.body} home ana sayfa`),
    },
  ]

  for (const column of d.footer.columns) {
    for (const link of column.links) {
      entries.push({
        kind: 'page',
        href: link.href,
        title: link.label,
        subtitle: column.title,
        haystack: normalizeSearchText(`${link.label} ${column.title} ${link.href.replace(/\//g, ' ')}`),
      })
    }
  }

  for (const link of d.footer.legal) {
    entries.push({
      kind: 'page',
      href: link.href,
      title: link.label,
      subtitle: d.search.legalGroup,
      haystack: normalizeSearchText(`${link.label} ${d.search.legalGroup} ${link.href.replace(/\//g, ' ')}`),
    })
  }

  return entries
}

/** Ana sayfa bölümlerini arama indeksine ekler. */
function sectionsFromDictionary(d: Dictionary): SearchResult[] {
  const sections = [
    { href: '/#about', title: d.benefits.title, subtitle: d.benefits.eyebrow, body: d.benefits.items.map((item) => `${item.title} ${item.body}`).join(' ') },
    { href: '/#ingredients', title: d.ingredients.title, subtitle: d.ingredients.eyebrow, body: `${d.ingredients.body} ${d.ingredients.items.map((item) => item.name).join(' ')}` },
    { href: '/#science', title: d.science.title, subtitle: d.science.eyebrow, body: d.science.body },
    { href: '/#faq', title: d.faq.title, subtitle: d.faq.eyebrow, body: d.faq.items.map((item) => `${item.q} ${item.a}`).join(' ') },
  ]

  return sections.map((section) => ({
    kind: 'section' as const,
    href: section.href,
    title: section.title,
    subtitle: section.subtitle,
    haystack: normalizeSearchText(`${section.title} ${section.subtitle} ${section.body}`),
  }))
}

/** Tekrarlayan href kayıtlarını birleştirir. */
function dedupeResults(entries: SearchResult[]): SearchResult[] {
  const seen = new Set<string>()
  return entries.filter((entry) => {
    const key = `${entry.kind}:${entry.href}:${entry.title}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/** Tam arama indeksini oluşturur. */
export function buildSearchIndex(lang: Lang, dictionary: Dictionary): SearchResult[] {
  return dedupeResults([
    ...products.map((product) => productToSearchResult(product, lang)),
    ...pagesFromDictionary(dictionary),
    ...sectionsFromDictionary(dictionary),
  ])
}

/** Sonuçları alaka düzeyine göre sıralar. */
function rankResults(query: string, results: SearchResult[]): SearchResult[] {
  const normalized = normalizeSearchText(query)

  return [...results].sort((a, b) => {
    const score = (entry: SearchResult) => {
      const title = normalizeSearchText(entry.title)
      if (title.startsWith(normalized)) return 0
      if (title.includes(normalized)) return 1
      if (entry.subtitle && normalizeSearchText(entry.subtitle).includes(normalized)) return 2
      return 3
    }

    const diff = score(a) - score(b)
    if (diff !== 0) return diff
    return a.title.localeCompare(b.title, 'tr')
  })
}

/** Sorguya göre arama sonuçlarını döner. */
export function searchSite(query: string, index: SearchResult[], limit = 12): SearchResult[] {
  const normalized = normalizeSearchText(query)
  if (!normalized) return []

  const tokens = normalized.split(/\s+/).filter(Boolean)
  const matched = index.filter((entry) => tokens.every((token) => entry.haystack.includes(token)))

  return rankResults(normalized, matched).slice(0, limit)
}
