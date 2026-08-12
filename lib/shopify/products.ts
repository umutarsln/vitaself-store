import type { Money, Product, ProductVariant } from '@/lib/products'
import { products as staticProducts } from '@/lib/products'
import { isShopifyConfigured } from '@/lib/shopify/config'
import { storefrontFetch } from '@/lib/shopify/client'

type ShopifyMoney = {
  amount: string
  currencyCode: string
}

type ShopifyVariantNode = {
  id: string
  title: string
  availableForSale: boolean
  price: ShopifyMoney
  compareAtPrice: ShopifyMoney | null
}

type ProductByHandleResult = {
  product: {
    id: string
    handle: string
    variants: { nodes: ShopifyVariantNode[] }
  } | null
}

type ProductsQueryResult = {
  products: {
    nodes: Array<{
      id: string
      handle: string
      variants: { nodes: ShopifyVariantNode[] }
    }>
  }
}

const VARIANT_CACHE = new Map<string, string>()
const CATALOG_CACHE = { products: null as Product[] | null, fetchedAt: 0 }
const CACHE_TTL_MS = 5 * 60 * 1000

/** Shopify MoneyV2 değerini uygulama Money tipine dönüştürür. */
function moneyFromShopify(price: ShopifyMoney, existing: Money): Money {
  const amount = parseFloat(price.amount)

  if (price.currencyCode === 'TRY') {
    return { ...existing, try: Math.round(amount) }
  }

  if (price.currencyCode === 'USD') {
    return { ...existing, usd: Math.round(amount * 100) / 100 }
  }

  return existing
}

/** Shopify varyant düğümünü uygulama ProductVariant tipine dönüştürür. */
function mapShopifyVariant(node: ShopifyVariantNode, existing: ProductVariant): ProductVariant {
  return {
    ...existing,
    id: node.id,
    title: node.title || existing.title,
    availableForSale: node.availableForSale,
    price: moneyFromShopify(node.price, existing.price),
    compareAtPrice: node.compareAtPrice
      ? moneyFromShopify(node.compareAtPrice, existing.compareAtPrice ?? existing.price)
      : existing.compareAtPrice,
  }
}

/**
 * Handle ile Shopify ürününü Storefront API’den çeker.
 * @see https://shopify.dev/docs/api/storefront/latest/queries/product
 */
export async function fetchShopifyProductByHandle(handle: string) {
  const data = await storefrontFetch<ProductByHandleResult>(
    `query productByHandle($handle: String!) {
      product(handle: $handle) {
        id
        handle
        variants(first: 20) {
          nodes {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }`,
    { handle },
  )

  return data.product
}

/**
 * Sepet/checkout için gerçek Shopify variant GID’sini çözümler.
 * Handle varsa Shopify’dan, yoksa mevcut variantId kullanılır.
 */
export async function resolveShopifyVariantId(
  variantId: string,
  handle?: string,
): Promise<string | null> {
  if (!isShopifyConfigured()) {
    return variantId
  }

  const cacheKey = handle ?? variantId
  const cached = VARIANT_CACHE.get(cacheKey)
  if (cached) return cached

  if (handle) {
    const product = await fetchShopifyProductByHandle(handle)
    const shopifyVariantId = product?.variants.nodes[0]?.id
    if (shopifyVariantId) {
      VARIANT_CACHE.set(cacheKey, shopifyVariantId)
      return shopifyVariantId
    }
  }

  if (variantId.startsWith('gid://shopify/ProductVariant/')) {
    return variantId
  }

  return null
}

/** Statik katalogdaki handle’larla eşleşen Shopify ürünlerini çeker. */
async function fetchShopifyProductsByHandles(handles: string[]) {
  if (handles.length === 0) {
    return []
  }

  const handleSet = new Set(handles)
  // Search query OR bazen eksik sonuç döndüğü için tüm listeyi çekip filtrele.
  const data = await storefrontFetch<ProductsQueryResult>(
    `query catalogProducts {
      products(first: 50) {
        nodes {
          id
          handle
          variants(first: 20) {
            nodes {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }`,
  )

  return data.products.nodes.filter((product) => handleSet.has(product.handle))
}

/**
 * Statik pazarlama katalogunu Shopify fiyat/stok/variant ID ile birleştirir.
 * Shopify yapılandırılmamışsa statik katalog döner.
 */
export async function loadMergedCatalog(): Promise<Product[]> {
  if (!isShopifyConfigured()) {
    return staticProducts
  }

  const now = Date.now()
  if (CATALOG_CACHE.products && now - CATALOG_CACHE.fetchedAt < CACHE_TTL_MS) {
    return CATALOG_CACHE.products
  }

  try {
    const handles = staticProducts.map((product) => product.handle)
    const shopifyProducts = await fetchShopifyProductsByHandles(handles)
    const shopifyByHandle = new Map(shopifyProducts.map((product) => [product.handle, product]))

    const merged = staticProducts.map((product) => {
      const remote = shopifyByHandle.get(product.handle)
      if (!remote) return product

      const remoteVariants = remote.variants.nodes
      const variants = product.variants.map((variant, index) => {
        const remoteVariant = remoteVariants[index] ?? remoteVariants[0]
        if (!remoteVariant) return variant
        return mapShopifyVariant(remoteVariant, variant)
      })

      for (const remoteVariant of remoteVariants) {
        VARIANT_CACHE.set(product.handle, remoteVariant.id)
      }

      return {
        ...product,
        id: remote.id,
        variants,
      }
    })

    CATALOG_CACHE.products = merged
    CATALOG_CACHE.fetchedAt = now
    return merged
  } catch {
    return staticProducts
  }
}

/** Handle ile birleştirilmiş katalogdan ürün döner. */
export async function getMergedProduct(handle: string): Promise<Product | null> {
  const catalog = await loadMergedCatalog()
  return catalog.find((product) => product.handle === handle) ?? null
}
