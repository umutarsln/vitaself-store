import type { MetadataRoute } from 'next'
import { products } from '@/lib/products'
import { absoluteUrl } from '@/lib/site'

/** Site sitemap’i. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/products'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/checkout'), lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ]

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/products/${product.handle}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...productRoutes]
}
