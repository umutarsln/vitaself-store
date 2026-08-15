import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import { cookies } from 'next/headers'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { CartToast } from '@/components/cart/cart-toast'
import { ClarityScript } from '@/components/clarity-script'
import { DocumentLang } from '@/components/document-lang'
import { PageTransition } from '@/components/page-transition'
import { CartProvider } from '@/lib/cart'
import { LanguageProvider } from '@/lib/i18n'
import { resolveLang } from '@/lib/i18n/config'
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
    default: siteConfig.titles.tr,
    template: '%s — Vitaself',
  },
  description: siteConfig.descriptions.tr,
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
      tr: '/tr',
      en: '/en',
      de: '/de',
      ru: '/ru',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locales.tr,
    alternateLocale: [siteConfig.locales.en, siteConfig.locales.de, siteConfig.locales.ru],
    url: absoluteUrl('/'),
    siteName: siteConfig.name,
    title: siteConfig.titles.tr,
    description: siteConfig.descriptions.tr,
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
    title: siteConfig.titles.tr,
    description: siteConfig.descriptions.tr,
    images: [absoluteUrl('/images/hero-product.png')],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      {
        url: '/icon-light-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        sizes: '32x32',
        type: 'image/png',
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
  const initialLang = resolveLang(cookieStore.get('vitaself-lang')?.value)

  return (
    <html
      lang={initialLang}
      className={`light bg-background ${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="font-sans antialiased">
        <LanguageProvider initialLang={initialLang}>
          <CartProvider>
            <DocumentLang />
            <PageTransition>{children}</PageTransition>
            <CartDrawer />
            <CartToast />
          </CartProvider>
        </LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <ClarityScript />
      </body>
    </html>
  )
}
