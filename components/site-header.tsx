'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, Search, User, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { CartTrigger } from '@/components/cart/cart-trigger'
import { LanguageSwitcher } from '@/components/language-switcher'
import { ShopNavLink, ShopNavMenu } from '@/components/shop/shop-nav-menu'
import { useLanguage } from '@/lib/i18n'

export function SiteHeader() {
  const { d } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 24))

  const secondaryLinks = [
    { label: d.nav.science, href: '/#science' },
    { label: d.nav.ingredients, href: '/#ingredients' },
    { label: d.nav.reviews, href: '/#reviews' },
    { label: d.nav.about, href: '/#about' },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-foreground text-background/85 flex items-center justify-center px-6 py-2.5">
        <p className="text-[11px] tracking-[0.08em] text-center">{d.announce}</p>
      </div>

      <div
        className={`transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled ? 'bg-background/80 shadow-soft backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-6 md:h-20 md:px-10">
          <Link href="/" className="flex shrink-0 items-baseline gap-2">
            <span className="text-display text-xl md:text-2xl">Vitaself</span>
            <span className="text-[9px] tracking-[0.28em] text-muted-foreground hidden uppercase sm:block">
              Pharma
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            <ShopNavMenu />
            {secondaryLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-[13px] tracking-wide transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <LanguageSwitcher className="mr-1 hidden sm:block" />

            <button
              type="button"
              className="text-foreground/70 hover:text-foreground hidden size-10 items-center justify-center rounded-full transition-colors sm:flex"
            >
              <Search className="size-[18px]" strokeWidth={1.4} />
              <span className="sr-only">{d.nav.search}</span>
            </button>
            <button
              type="button"
              className="text-foreground/70 hover:text-foreground hidden size-10 items-center justify-center rounded-full transition-colors sm:flex"
            >
              <User className="size-[18px]" strokeWidth={1.4} />
              <span className="sr-only">{d.nav.account}</span>
            </button>
            <CartTrigger />
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-expanded={open}
              className="text-foreground/70 hover:text-foreground flex size-10 items-center justify-center rounded-full transition-colors lg:hidden"
            >
              {open ? <X className="size-5" strokeWidth={1.4} /> : <Menu className="size-5" strokeWidth={1.4} />}
              <span className="sr-only">{open ? d.nav.close : d.nav.menu}</span>
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.nav
              aria-label="Mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="bg-background/95 border-border/60 overflow-hidden border-t backdrop-blur-xl lg:hidden"
            >
              <ul className="mx-auto flex max-w-6xl flex-col px-6 py-4 md:px-10">
                <ShopNavLink onNavigate={() => setOpen(false)} />
                {secondaryLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-display block py-3 text-2xl"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="mt-3 border-t border-border/60 pt-3">
                  <p className="text-eyebrow text-muted-foreground mb-2 px-1">{d.nav.language}</p>
                  <LanguageSwitcher variant="list" />
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
