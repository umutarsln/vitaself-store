'use client'

import { useLanguage } from '@/lib/i18n'

export function SiteFooter() {
  const { d, lang, setLang } = useLanguage()

  return (
    <footer id="site-footer" className="bg-foreground text-background/70 px-6 pt-20 pb-10 md:px-10 md:pt-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="text-display text-background text-3xl">Vitaself</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">{d.footer.tagline}</p>
            <div
              role="group"
              aria-label="Language"
              className="border-background/20 mt-8 inline-flex items-center rounded-full border p-0.5"
            >
              {(['en', 'tr'] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  className={`rounded-full px-3 py-1 text-[11px] tracking-[0.12em] uppercase transition-colors duration-300 ${
                    lang === code ? 'bg-background text-foreground' : 'hover:text-background'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {d.footer.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="text-eyebrow text-background/50">{column.title}</p>
                <ul className="mt-5 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <a
                        href={link.href}
                        className="hover:text-background text-[13px] transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <p className="border-background/15 mt-16 max-w-3xl border-t pt-8 text-[11px] leading-relaxed">
          {d.footer.disclaimer}
        </p>

        <div className="mt-8 flex flex-col gap-5 text-[11px] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Vitaself İlaç A.Ş. {d.footer.rights}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {d.footer.legal.map((item) => (
              <li key={item}>
                <a href="#top" className="hover:text-background transition-colors duration-300">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
