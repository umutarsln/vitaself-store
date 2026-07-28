import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import { cookies } from 'next/headers'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { DocumentLang } from '@/components/document-lang'
import { CartProvider } from '@/lib/cart'
import { LanguageProvider } from '@/lib/i18n'
import { absoluteUrl, siteConfig } from '@/lib/site'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.titles.en,
    template: '%s — Vitaself',
  },
  description: siteConfig.descriptions.en,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  keywords: [
    'Vitaself',
    'supplements',
    'Daily Foundation',
    'clinical doses',
    'third-party tested',
    'Türkiye',
  ],
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      tr: '/tr',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.localeDefault,
    alternateLocale: [siteConfig.localeTr],
    url: absoluteUrl('/'),
    siteName: siteConfig.name,
    title: siteConfig.titles.en,
    description: siteConfig.descriptions.en,
    images: [
      {
        url: absoluteUrl('/images/hero-product.png'),
        width: 1200,
        height: 1500,
        alt: 'Vitaself Daily Foundation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.titles.en,
    description: siteConfig.descriptions.en,
    images: [absoluteUrl('/images/hero-product.png')],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#faf9f7',
}

/** Root layout — cookie’den SSR html lang. */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const lang = cookieStore.get('vitaself-lang')?.value === 'tr' ? 'tr' : 'en'

  return (
    <html
      lang={lang}
      className={`light bg-background ${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="font-sans antialiased">
        <LanguageProvider>
          <CartProvider>
            <DocumentLang />
            {children}
            <CartDrawer />
          </CartProvider>
        </LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
