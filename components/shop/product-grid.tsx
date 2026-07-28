'use client'

import { Eyebrow, Reveal, Section } from '@/components/reveal'
import { ProductCard } from '@/components/shop/product-card'
import { useLanguage } from '@/lib/i18n'
import { products } from '@/lib/products'

/** Ürünler sayfası grid bölümü. */
export function ProductGrid() {
  const { d } = useLanguage()

  return (
    <Section id="formulas" className="bg-ivory pt-10 md:pt-14" label={d.shop.title}>
      <Reveal className="max-w-xl">
        <Eyebrow>{d.shop.eyebrow}</Eyebrow>
        <h2 className="text-display mt-4 text-[clamp(1.9rem,4.5vw,2.75rem)] text-balance">
          {d.shop.title} <span className="text-primary italic">{d.shop.titleAccent}</span>
        </h2>
      </Reveal>

      <ul className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {products.map((product, index) => (
          <li key={product.id}>
            <ProductCard product={product} index={index} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
