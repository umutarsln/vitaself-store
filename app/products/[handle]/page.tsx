import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PdpBackLink } from '@/components/pdp/pdp-back-link'
import { ProductGallery } from '@/components/pdp/product-gallery'
import { ProductPurchase } from '@/components/pdp/product-purchase'
import { RelatedProducts } from '@/components/pdp/related-products'
import { UpsellStack } from '@/components/pdp/upsell-stack'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getProduct, products } from '@/lib/products'

type ProductPageProps = {
  params: Promise<{ handle: string }>
}

/** Statik PDP route parametrelerini üretir. */
export function generateStaticParams() {
  return products.map((product) => ({ handle: product.handle }))
}

/** Ürün detay metadata’sını handle’a göre üretir. */
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params
  const product = getProduct(handle)
  if (!product) {
    return { title: 'Product not found — Vitaself' }
  }
  return {
    title: `${product.title.en} — Vitaself`,
    description: product.description.en,
  }
}

/** Ürün detay sayfası — galeri, satın alma, stack upsell, related. */
export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { handle } = await params
  const product = getProduct(handle)

  if (!product) {
    notFound()
  }

  return (
    <>
      <SiteHeader />
      <main>
        <PdpBackLink />
        <section
          aria-label={product.title.en}
          className="px-6 pt-8 pb-20 md:px-10 md:pt-10 md:pb-28"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-2 lg:items-start lg:gap-20">
            <ProductGallery product={product} />
            <ProductPurchase product={product} />
          </div>
        </section>
        <UpsellStack product={product} />
        <RelatedProducts product={product} />
      </main>
      <SiteFooter />
    </>
  )
}
