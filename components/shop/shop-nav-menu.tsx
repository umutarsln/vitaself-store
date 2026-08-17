'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { useRef, useState } from 'react'
import { useLanguage } from '@/lib/i18n'
import { copy, defaultVariant, visibleProducts } from '@/lib/products'

/** Dropdown önizlemesinde gösterilen ürün sayısı (setler hariç). */
const MENU_PREVIEW_COUNT = 6

type ShopNavMenuProps = {
  /** Mobil menü kapanırken çağrılır. */
  onNavigate?: () => void
}

/** Header ürünler menüsü — hover ile minimal dropdown, tıklayınca /products. */
export function ShopNavMenu({ onNavigate }: ShopNavMenuProps) {
  const { d, lang, price } = useLanguage()
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<number | null>(null)

  /** Hover ile menüyü açar; kapanma zamanlayıcısını iptal eder. */
  function handleOpen() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    setOpen(true)
  }

  /** Hover çıkışında menüyü kısa gecikmeyle kapatır. */
  function handleCloseSoon() {
    closeTimer.current = window.setTimeout(() => setOpen(false), 120)
  }

  /** Alt link tıklanınca menüyü kapatır. */
  function handleNavigate() {
    setOpen(false)
    onNavigate?.()
  }

  return (
    <div className="relative hidden lg:block" onMouseEnter={handleOpen} onMouseLeave={handleCloseSoon}>
      <Link
        href="/products"
        aria-haspopup="true"
        aria-expanded={open}
        className={`text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-[13px] tracking-wide transition-colors duration-300 ${
          open ? 'text-foreground' : ''
        }`}
      >
        {d.nav.shop}
        <ChevronDown
          className={`size-3 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          strokeWidth={2}
        />
      </Link>

      {open ? (
        <div
          className="absolute top-full left-0 z-50 pt-3"
          onMouseEnter={handleOpen}
          onMouseLeave={handleCloseSoon}
        >
            <div className="bg-card/95 shadow-soft border-border/60 w-[min(34rem,calc(100vw-2rem))] rounded-2xl border p-3 backdrop-blur-xl">
              <ul className="grid grid-cols-3 gap-2">
                {visibleProducts.slice(0, MENU_PREVIEW_COUNT).map((product) => {
                  const variant = defaultVariant(product)
                  return (
                    <li key={product.handle}>
                      <Link
                        href={`/products/${product.handle}`}
                        onClick={handleNavigate}
                        className="group hover:bg-muted/50 flex gap-2.5 rounded-xl p-2 transition-colors duration-200"
                      >
                        <div className="bg-ivory relative size-11 shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={product.featuredImage.url}
                            alt={product.featuredImage.altText}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 py-0.5">
                          <p className="text-muted-foreground truncate text-[10px] tracking-wide uppercase">
                            {copy(product.category, lang)}
                          </p>
                          <p className="text-display mt-0.5 truncate text-[15px] leading-none">
                            {copy(product.title, lang)}
                          </p>
                          <p className="text-muted-foreground mt-1 text-[11px]">
                            {d.shop.from} {price(variant.price)}
                          </p>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <Link
                href="/products"
                onClick={handleNavigate}
                className="text-foreground border-border/60 mt-1 flex items-center justify-center gap-1.5 rounded-xl border-t py-2.5 text-[13px] tracking-wide transition-opacity hover:opacity-70"
              >
                {d.nav.viewAllFormulas}
                <ArrowUpRight className="size-3.5" strokeWidth={1.6} />
              </Link>
            </div>
        </div>
      ) : null}
    </div>
  )
}

/** Mobil nav için düz ürünler linki. */
export function ShopNavLink({ onNavigate }: ShopNavMenuProps) {
  const { d } = useLanguage()

  return (
    <li className="lg:hidden">
      <Link
        href="/products"
        onClick={onNavigate}
        className="text-display block py-3 text-2xl"
      >
        {d.nav.shop}
      </Link>
    </li>
  )
}
