import type { MetadataRoute } from 'next'
import { visibleProducts } from '@/lib/products'
import { absoluteUrl } from '@/lib/site'

/** Site sitemap’i — checkout gibi noindex sayfalar hariç. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/products'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/legal/privacy'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: absoluteUrl('/legal/terms'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: absoluteUrl('/legal/shipping'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: absoluteUrl('/science/white-paper'), lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: absoluteUrl('/science/ingredient-panel'), lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: absoluteUrl('/science/batch-results'), lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: absoluteUrl('/company/about'), lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: absoluteUrl('/company/contact'), lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
  ]

  const productRoutes: MetadataRoute.Sitemap = visibleProducts.map((product) => ({
    url: absoluteUrl(`/products/${product.handle}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...productRoutes]
}
