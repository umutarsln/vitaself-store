'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Reveal } from '@/components/reveal'
import type { Product } from '@/lib/products'

type ProductGalleryProps = {
  product: Product
}

/** PDP görsel galerisi — thumb seçimi ile ana görseli değiştirir. */
export function ProductGallery({ product }: ProductGalleryProps) {
  const [active, setActive] = useState(0)
  const current = product.images[active] ?? product.featuredImage

  return (
    <Reveal className="flex flex-col gap-4">
      <div className="bg-card shadow-soft relative aspect-square w-full overflow-hidden rounded-[2rem]">
        <Image
          key={current.url}
          src={current.url}
          alt={current.altText}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {product.images.map((image, index) => {
          const isActive = index === active
          return (
            <button
              key={image.url + index}
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={isActive}
              aria-label={image.altText}
              className={`bg-card relative aspect-square overflow-hidden rounded-2xl transition-all duration-400 ${
                isActive ? 'ring-primary/50 shadow-soft ring-2' : 'opacity-80 hover:opacity-100'
              }`}
            >
              <Image src={image.url} alt="" fill sizes="15vw" className="object-cover" />
            </button>
          )
        })}
      </div>
    </Reveal>
  )
}
