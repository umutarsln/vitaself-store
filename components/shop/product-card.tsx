'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Star } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useLanguage } from '@/lib/i18n'
import { LOCALE_BY_LANG } from '@/lib/i18n/config'
import { copy, defaultVariant, type Product } from '@/lib/products'

type ProductCardProps = {
  product: Product
  index: number
}

/** Tek ürün kartı — tıklanabilir vitrin öğesi. */
export function ProductCard({ product, index }: ProductCardProps) {
  const { d, lang, price } = useLanguage()
  const variant = defaultVariant(product)
  const title = copy(product.title, lang)

  return (
    <Reveal delay={index * 0.07} className="group flex flex-col">
      <Link href={`/products/${product.handle}`} className="flex h-full flex-col outline-none">
        <div className="bg-card shadow-soft relative aspect-4/5 overflow-hidden rounded-[1.75rem] transition-shadow duration-500 group-hover:shadow-float">
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
          {product.badge && (
            <span className="bg-background/90 text-foreground absolute top-4 left-4 rounded-full px-3 py-1 text-[10px] tracking-[0.14em] uppercase backdrop-blur-md">
              {copy(product.badge, lang)}
            </span>
          )}
          <span className="bg-background/80 text-foreground absolute right-4 bottom-4 flex size-10 items-center justify-center rounded-full opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
            <ArrowUpRight className="size-4" strokeWidth={1.5} />
            <span className="sr-only">{d.shop.view}</span>
          </span>
        </div>

        <div className="mt-6 flex flex-1 flex-col">
          <p className="text-eyebrow text-muted-foreground">{copy(product.category, lang)}</p>
          <div className="mt-3 flex items-start justify-between gap-4">
            <h2 className="text-display text-[1.85rem] leading-none tracking-tight md:text-[2.1rem]">
              {title}
            </h2>
            <p className="text-muted-foreground shrink-0 pt-1 text-sm">
              {d.shop.from} {price(variant.price)}
            </p>
          </div>
          <p className="text-muted-foreground mt-3 max-w-sm text-sm leading-relaxed">
            {copy(product.subtitle, lang)}
          </p>
          <div className="text-muted-foreground mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            <span className="flex items-center gap-1.5">
              <Star className="fill-gold text-gold size-3.5" strokeWidth={0} />
              {product.rating.value.toFixed(1)} · {product.rating.count.toLocaleString(LOCALE_BY_LANG[lang])}{' '}
              {d.shop.reviews}
            </span>
            <span>
              {product.activesCount} {d.shop.actives}
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}
