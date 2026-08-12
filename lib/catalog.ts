import type { Product, ResolvedVariant } from '@/lib/products'
import {
  filterVisibleProducts,
  isProductVisible,
  products as staticProducts,
} from '@/lib/products'
import { loadMergedCatalog } from '@/lib/shopify/products'

/** Handle ile birleştirilmiş katalogdan ürün döner. */
export async function getCatalogProduct(handle: string): Promise<Product | null> {
  if (!isProductVisible(handle)) return null
  const catalog = await loadMergedCatalog()
  return catalog.find((product) => product.handle === handle) ?? null
}

/** Birleştirilmiş katalogdaki görünür ürünleri döner. */
export async function getCatalogProducts(): Promise<Product[]> {
  return filterVisibleProducts(await loadMergedCatalog())
}

/** Birleştirilmiş katalogda variant GID ile ürün + varyant çözümler. */
export async function findCatalogVariantById(variantId: string): Promise<ResolvedVariant | null> {
  const catalog = await loadMergedCatalog()

  for (const product of catalog) {
    const variant = product.variants.find((item) => item.id === variantId)
    if (variant) {
      return { product, variant }
    }
  }

  return null
}

/** Statik katalog handle listesini döner (SSG params için, gizliler hariç). */
export function getStaticProductHandles(): string[] {
  return filterVisibleProducts(staticProducts).map((product) => product.handle)
}
