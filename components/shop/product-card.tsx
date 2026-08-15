'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Check, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Reveal } from '@/components/reveal'
import { useCart } from '@/lib/cart'
import { useLanguage } from '@/lib/i18n'
import { copy, defaultVariant, type Product } from '@/lib/products'

type ProductCardProps = {
  product: Product
  index: number
}

/** Tek ürün kartı — sepete hızlı ekleme desteğiyle. */
export function ProductCard({ product, index }: ProductCardProps) {
  const { d, lang, price } = useLanguage()
  const { add } = useCart()
  const variant = defaultVariant(product)
  const title = copy(product.title, lang)
  const [added, setAdded] = useState(false)

  /** Sepete 1 adet ekler, 2 saniye sonra normal duruma döner. */
  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (added) return
    add(variant.id, 1, { handle: product.handle })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Reveal delay={index * 0.07} className="group flex flex-col">
      <div className="flex h-full flex-col">
        {/* Görsel */}
        <Link href={`/products/${product.handle}`} className="outline-none">
          <div className="bg-card shadow-soft relative aspect-square w-full overflow-hidden rounded-[1.5rem] transition-shadow duration-500 group-hover:shadow-float">
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />
            {product.badge && (
              <span className="bg-background/90 text-foreground absolute top-2.5 left-2.5 rounded-full px-2.5 py-0.5 text-[9px] tracking-[0.14em] uppercase backdrop-blur-md">
                {copy(product.badge, lang)}
              </span>
            )}
          </div>
        </Link>

        {/* Bilgi + sepete ekle */}
        <div className="mt-3 flex flex-1 flex-col">
          <p className="text-eyebrow text-muted-foreground text-[10px]">{copy(product.category, lang)}</p>
          <div className="mt-1.5 flex items-start justify-between gap-2">
            <Link href={`/products/${product.handle}`}>
              <h2 className="text-display text-[1.15rem] leading-tight tracking-tight hover:opacity-75 transition-opacity">
                {title}
              </h2>
            </Link>
            <p className="text-muted-foreground shrink-0 pt-0.5 text-xs">
              {price(variant.price)}
            </p>
          </div>
          <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed line-clamp-2">
            {copy(product.subtitle, lang)}
          </p>

          {/* Sepete ekle butonu */}
          <motion.button
            type="button"
            onClick={handleAdd}
            animate={added ? { backgroundColor: 'var(--positive)' } : { backgroundColor: 'var(--foreground)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-background mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs tracking-wide transition-transform active:scale-[0.98]"
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1.5"
                >
                  <Check className="size-3.5" strokeWidth={2} />
                  {d.pdp.added}
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1.5"
                >
                  <ShoppingBag className="size-3.5" strokeWidth={1.6} />
                  {d.pdp.add}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </Reveal>
  )
}
