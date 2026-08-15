'use client'

import { useEffect, useState } from 'react'
import { Section } from '@/components/reveal'
import { ProductCard } from '@/components/shop/product-card'
import { useLanguage } from '@/lib/i18n'
import { visibleProducts, type Product } from '@/lib/products'

/** Ürünler sayfası grid bölümü — mobil 2 sütun, desktop 3 sütun. */
export function ProductGrid() {
  const { d } = useLanguage()
  const [catalog, setCatalog] = useState<Product[]>(visibleProducts)

  useEffect(() => {
    fetch('/api/catalog')
      .then((response) => response.json())
      .then((data: { products?: Product[] }) => {
        if (Array.isArray(data.products) && data.products.length > 0) {
          setCatalog(data.products)
        }
      })
      .catch(() => {
        // Statik katalog fallback
      })
  }, [])

  return (
    <Section id="formulas" className="bg-ivory pt-24 md:pt-32 lg:pt-36" label={d.shop.title}>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
        {catalog.map((product, index) => (
          <li key={product.id}>
            <ProductCard product={product} index={index} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
