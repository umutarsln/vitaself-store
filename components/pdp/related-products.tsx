'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check, Star } from 'lucide-react'
import { useState } from 'react'
import { Eyebrow, Reveal, Section } from '@/components/reveal'
import { useCart } from '@/lib/cart'
import { useLanguage } from '@/lib/i18n'
import { copy, defaultVariant, getRelatedProducts, type Product } from '@/lib/products'

type RelatedProductsProps = {
  product: Product
}

/** PDP altı cross-sell / related ürün şeridi — incele + hızlı ekle. */
export function RelatedProducts({ product }: RelatedProductsProps) {
  const { d, lang, price } = useLanguage()
  const { add } = useCart()
  const related = getRelatedProducts(product)
  const [addedHandles, setAddedHandles] = useState<string[]>([])

  if (related.length === 0) {
    return null
  }

  /** Related ürünü hızlıca sepete ekler. */
  function handleQuickAdd(item: Product) {
    add(defaultVariant(item).id, 1, { handle: item.handle })
    setAddedHandles((prev) => (prev.includes(item.handle) ? prev : [...prev, item.handle]))
  }

  return (
    <Section label={d.pdp.related.title}>
      <Reveal className="max-w-xl">
        <Eyebrow>{d.pdp.related.eyebrow}</Eyebrow>
        <h2 className="text-display mt-5 text-[clamp(2rem,5vw,3rem)] text-balance">
          {d.pdp.related.title}
        </h2>
      </Reveal>

      <ul className="mt-14 grid items-stretch gap-10 md:grid-cols-3">
        {related.map((item, index) => {
          const variant = defaultVariant(item)
          const isAdded = addedHandles.includes(item.handle)
          return (
            <Reveal as="li" key={item.id} delay={index * 0.06} className="flex h-full flex-col">
              <Link href={`/products/${item.handle}`} className="group flex flex-1 flex-col outline-none">
                <div className="bg-card shadow-soft relative aspect-4/5 overflow-hidden rounded-[1.75rem] transition-shadow duration-500 group-hover:shadow-float">
                  <Image
                    src={item.featuredImage.url}
                    alt={item.featuredImage.altText}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="bg-background/80 absolute right-4 bottom-4 flex size-9 items-center justify-center rounded-full opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100">
                    <ArrowUpRight className="size-4" strokeWidth={1.5} />
                  </span>
                </div>
                <div className="mt-5 flex flex-1 flex-col">
                  <p className="text-eyebrow text-muted-foreground">{copy(item.category, lang)}</p>
                  <h3 className="text-display mt-2 min-h-[2rem] text-2xl leading-tight">{copy(item.title, lang)}</h3>
                  <p className="text-muted-foreground mt-2 min-h-[2.625rem] line-clamp-2 text-sm leading-relaxed">
                    {copy(item.subtitle, lang)}
                  </p>
                  <div className="text-muted-foreground mt-4 flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1">
                      <Star className="fill-gold text-gold size-3.5" strokeWidth={0} />
                      {item.rating.value.toFixed(1)}
                    </span>
                    <span>
                      {d.shop.from} {price(variant.price)}
                    </span>
                  </div>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => handleQuickAdd(item)}
                disabled={isAdded}
                className="border-border hover:border-foreground/30 mt-5 inline-flex h-11 w-full shrink-0 items-center justify-center rounded-full border text-[13px] tracking-wide transition-all duration-400 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
              >
                {isAdded ? (
                  <span className="inline-flex items-center gap-2">
                    <Check className="size-3.5" strokeWidth={2} />
                    {d.pdp.related.added}
                  </span>
                ) : (
                  d.pdp.related.add
                )}
              </button>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
