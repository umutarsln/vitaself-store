import type { Metadata } from 'next'
import { ShopBundleSpotlight } from '@/components/shop/shop-bundle-spotlight'
import { ShopHero } from '@/components/shop/shop-hero'
import { ProductGrid } from '@/components/shop/product-grid'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export const metadata: Metadata = {
  title: 'Shop — Vitaself clinical formulas',
  description:
    'Browse Vitaself Daily Foundation, Sleep Depth, Algal Omega, and the Essentials Trio. Clinically formulated, third-party tested.',
}

/** Ürünler / koleksiyon sayfası. */
export default function ProductsPage() {
  return (
    <>
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
