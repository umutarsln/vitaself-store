import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site'

/** robots.txt üretimi. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/checkout/success'],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  }
}
