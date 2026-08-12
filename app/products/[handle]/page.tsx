import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DocumentLang } from '@/components/document-lang'
import { PdpBackLink } from '@/components/pdp/pdp-back-link'
import { ProductGallery } from '@/components/pdp/product-gallery'
import { ProductPurchase } from '@/components/pdp/product-purchase'
import { RelatedProducts } from '@/components/pdp/related-products'
import { ProductJsonLd } from '@/components/seo/json-ld'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getCatalogProduct, getStaticProductHandles } from '@/lib/catalog'
import { absoluteUrl } from '@/lib/site'

type ProductPageProps = {
  params: Promise<{ handle: string }>
}

/** Statik PDP route parametrelerini üretir. */
export function generateStaticParams() {
  return getStaticProductHandles().map((handle) => ({ handle }))
}

/** Ürün detay metadata’sını handle’a göre üretir. */
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params
  const product = await getCatalogProduct(handle)
  if (!product) {
    return { title: 'Product not found' }
  }

  const title = product.title.en
  const description = product.description.en
  const image = absoluteUrl(product.featuredImage.url)
  const url = absoluteUrl(`/products/${product.handle}`)

  return {
    title,
    description,
    alternates: {
      canonical: `/products/${product.handle}`,
    },
    openGraph: {
      type: 'website',
      title: `${title} — Vitaself`,
      description,
      url,
      images: [{ url: image, alt: product.featuredImage.altText }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — Vitaself`,
      description,
      images: [image],
    },
  }
}

/** Ürün detay sayfası — galeri, satın alma, related. */
export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { handle } = await params
  const product = await getCatalogProduct(handle)

  if (!product) {
    notFound()
  }

  return (
    <>
      <ProductJsonLd handle={product.handle} />
      <DocumentLang
        titles={{
          en: `${product.title.en} — Vitaself`,
          tr: `${product.title.tr} — Vitaself`,
          de: `${product.title.de ?? product.title.en} — Vitaself`,
          ru: `${product.title.ru ?? product.title.en} — Vitaself`,
        }}
        descriptions={{
          en: product.description.en,
          tr: product.description.tr,
          de: product.description.de ?? product.description.en,
          ru: product.description.ru ?? product.description.en,
        }}
      />
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
        <RelatedProducts product={product} />
      </main>
      <SiteFooter />
    </>
  )
}
