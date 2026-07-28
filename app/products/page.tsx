import type { Metadata } from 'next'
import { DocumentLang } from '@/components/document-lang'
import { CollectionJsonLd } from '@/components/seo/json-ld'
import { ShopBundleSpotlight } from '@/components/shop/shop-bundle-spotlight'
import { ShopHero } from '@/components/shop/shop-hero'
import { ProductGrid } from '@/components/shop/product-grid'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { absoluteUrl, siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Shop clinical formulas',
  description:
    'Browse Vitaself Daily Foundation, Sleep Depth, Algal Omega, and the Essentials Trio. Clinically formulated, third-party tested.',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Shop — Vitaself clinical formulas',
    description:
      'Browse Vitaself Daily Foundation, Sleep Depth, Algal Omega, and the Essentials Trio.',
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
        titleEn="Shop clinical formulas — Vitaself"
        titleTr="Klinik formüller — Vitaself"
        descriptionEn="Browse Vitaself Daily Foundation, Sleep Depth, Algal Omega, and the Essentials Trio. Clinically formulated, third-party tested."
        descriptionTr="Vitaself Günlük Temel, Uyku Derinliği, Algal Omega ve Temel Üçlü’yü inceleyin. Klinik formül, bağımsız test."
      />
      <SiteHeader />
      <main>
        <ShopHero />
        <ProductGrid />
        <ShopBundleSpotlight />
      </main>
      <SiteFooter />
    </>
  )
}
