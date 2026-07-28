'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/lib/cart'
import { useLanguage } from '@/lib/i18n'

export function SiteHeader() {
  const { d, lang, setLang } = useLanguage()
  const { count } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 24))

  const links = [
    { label: d.nav.shop, href: '/products' },
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
          <a href="/" className="flex shrink-0 items-baseline gap-2">
            <span className="text-display text-xl md:text-2xl">Vitaself</span>
            <span className="text-[9px] tracking-[0.28em] text-muted-foreground hidden uppercase sm:block">
              Pharma
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {links.map((link) => (
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
            <div
              role="group"
              aria-label="Language"
              className="border-border/70 mr-1 hidden items-center rounded-full border p-0.5 sm:flex"
            >
              {(['en', 'tr'] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  className={`rounded-full px-2.5 py-1 text-[11px] tracking-[0.1em] uppercase transition-colors duration-300 ${
                    lang === code
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>

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
            <button
              type="button"
              className="text-foreground/70 hover:text-foreground relative flex size-10 items-center justify-center rounded-full transition-colors"
            >
              <ShoppingBag className="size-[18px]" strokeWidth={1.4} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-primary text-primary-foreground absolute top-1 right-1 flex size-4 items-center justify-center rounded-full text-[10px] font-medium"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
              <span className="sr-only">
                {d.nav.cart} ({count})
              </span>
            </button>
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
                {links.map((link) => (
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
                <li className="mt-3 flex gap-2 pt-3 border-t border-border/60">
                  {(['en', 'tr'] as const).map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setLang(code)}
                      aria-pressed={lang === code}
                      className={`rounded-full px-4 py-1.5 text-[11px] tracking-[0.12em] uppercase ${
                        lang === code ? 'bg-foreground text-background' : 'border-border border text-muted-foreground'
                      }`}
                    >
                      {code}
                    </button>
                  ))}
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
