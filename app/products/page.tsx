import type { Metadata } from 'next'
import { DocumentLang } from '@/components/document-lang'
import { CollectionJsonLd } from '@/components/seo/json-ld'
import { ShopHero } from '@/components/shop/shop-hero'
import { ProductGrid } from '@/components/shop/product-grid'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { absoluteUrl, siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Shop clinical formulas',
  description:
    'Browse the Vitaself line: Magnesium Complex, Omega-3, Multivitamin for Men & Women, and Glucosamine Complex. Clinically formulated, third-party tested.',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Shop — Vitaself clinical formulas',
    description:
      'Browse the full Vitaself line of clinically dosed, third-party tested formulas.',
    url: absoluteUrl('/products'),
    images: [{ url: absoluteUrl('/images/hero-product.png'), alt: 'Vitaself collection' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop — Vitaself clinical formulas',
    description: siteConfig.descriptions.en,
    images: [absoluteUrl('/images/hero-product.png')],
  },
}

/** Ürünler / koleksiyon sayfası. */
export default function ProductsPage() {
  return (
    <>
      <CollectionJsonLd />
      <DocumentLang
        titles={{
          en: 'Shop clinical formulas — Vitaself',
          tr: 'Klinik formüller — Vitaself',
          de: 'Klinische Formeln — Vitaself',
          ru: 'Клинические формулы — Vitaself',
        }}
        descriptions={{
          en: 'Browse the full Vitaself line of clinically dosed, third-party tested formulas.',
          tr: 'Vitaself’in tam ürün hattını inceleyin — klinik dozlu, bağımsız test edilmiş formüller.',
          de: 'Entdecken Sie die gesamte Vitaself-Produktlinie — klinisch dosiert, unabhängig getestet.',
          ru: 'Полная линейка Vitaself — клинические дозы, независимое тестирование.',
        }}
      />
      <SiteHeader />
      <main>
        <ShopHero />
        <ProductGrid />
      </main>
      <SiteFooter />
    </>
  )
}
