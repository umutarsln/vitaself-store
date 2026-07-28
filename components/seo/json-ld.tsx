import { products } from '@/lib/products'
import { absoluteUrl, siteConfig } from '@/lib/site'

type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>
}

/** JSON-LD script etiketi basar. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/** Ana sayfa Organization + WebSite şeması. */
export function HomeJsonLd() {
  return (
    <JsonLd
      data={[
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteConfig.url,
          logo: absoluteUrl('/icon.svg'),
          description: siteConfig.descriptions.en,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteConfig.name,
          url: siteConfig.url,
          inLanguage: ['en', 'tr'],
        },
      ]}
    />
  )
}

/** Ürün detay Product şeması. */
export function ProductJsonLd({ handle }: { handle: string }) {
  const product = products.find((item) => item.handle === handle)
  if (!product) return null

  const variant = product.variants[0]
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title.en,
    description: product.description.en,
    image: product.images.map((image) => absoluteUrl(image.url)),
    sku: product.handle,
    brand: {
      '@type': 'Brand',
      name: product.vendor,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.value,
      reviewCount: product.rating.count,
    },
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(`/products/${product.handle}`),
      priceCurrency: 'USD',
      price: variant.price.usd,
      availability: variant.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
    },
  }

  return <JsonLd data={data} />
}

/** Koleksiyon sayfası ItemList şeması. */
export function CollectionJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Vitaself formulas',
        url: absoluteUrl('/products'),
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: products.map((product, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: absoluteUrl(`/products/${product.handle}`),
            name: product.title.en,
          })),
        },
      }}
    />
  )
}
