/**
 * Shopify-shaped product data.
 *
 * Field names intentionally mirror the Storefront API so this module can later be
 * replaced by a `getProduct(handle)` call without touching any UI component.
 */

export type Money = { usd: number; try: number }

export type ProductVariant = {
  id: string
  title: string
  sellingPlan: 'subscription' | 'onetime'
  price: Money
  compareAtPrice: Money | null
  availableForSale: boolean
}

export type Product = {
  id: string
  handle: string
  vendor: string
  featuredImage: { url: string; altText: string }
  images: { url: string; altText: string }[]
  rating: { value: number; count: number }
  servingsPerContainer: number
  variants: ProductVariant[]
}

export const dailyFoundation: Product = {
  id: 'gid://shopify/Product/1',
  handle: 'daily-foundation',
  vendor: 'Vitaself',
  featuredImage: {
    url: '/images/product-packshot.png',
    altText: 'Vitaself Daily Foundation bottle on an ivory background',
  },
  images: [
    { url: '/images/product-packshot.png', altText: 'Vitaself Daily Foundation bottle' },
    { url: '/images/capsules-macro.png', altText: 'Three Vitaself capsules photographed in macro' },
    { url: '/images/ingredient-macro.png', altText: 'Raw Vitaself ingredients in glass dishes' },
  ],
  rating: { value: 4.9, count: 3412 },
  servingsPerContainer: 30,
  variants: [
    {
      id: 'gid://shopify/ProductVariant/11',
      title: 'Subscription',
      sellingPlan: 'subscription',
      price: { usd: 54, try: 1490 },
      compareAtPrice: { usd: 68, try: 1860 },
      availableForSale: true,
    },
    {
      id: 'gid://shopify/ProductVariant/12',
      title: 'One-time',
      sellingPlan: 'onetime',
      price: { usd: 68, try: 1860 },
      compareAtPrice: null,
      availableForSale: true,
    },
  ],
}

export function perDayPrice(price: Money, servings: number): Money {
  return {
    usd: Math.round((price.usd / servings) * 100) / 100,
    try: Math.round((price.try / servings) * 100) / 100,
  }
}
