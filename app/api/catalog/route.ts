import { NextResponse } from 'next/server'
import { getCatalogProducts } from '@/lib/catalog'
import { isShopifyConfigured } from '@/lib/shopify'

/** Birleştirilmiş ürün kataloğunu JSON olarak döner. */
export async function GET() {
  const products = await getCatalogProducts()

  return NextResponse.json({
    shopify: isShopifyConfigured(),
    products,
  })
}
