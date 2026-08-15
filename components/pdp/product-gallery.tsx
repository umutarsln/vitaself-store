'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Reveal } from '@/components/reveal'
import type { Product } from '@/lib/products'

type ProductGalleryProps = {
  product: Product
}

/** PDP görsel galerisi — thumb seçimi, sol/sağ oklar ile gezinme. */
export function ProductGallery({ product }: ProductGalleryProps) {
  const images = product.images.length > 0 ? product.images : [product.featuredImage]
  const [active, setActive] = useState(0)
  const current = images[active] ?? product.featuredImage

  /** Önceki görsele geçer. */
  function prev() {
    setActive((i) => (i - 1 + images.length) % images.length)
  }

  /** Sonraki görsele geçer. */
  function next() {
    setActive((i) => (i + 1) % images.length)
  }

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

        {/* Sol/sağ ok gezinme butonları */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Önceki görsel"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-background/75 shadow backdrop-blur-sm transition-all hover:bg-background/90 active:scale-95"
            >
              <ChevronLeft className="size-4" strokeWidth={1.8} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Sonraki görsel"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-background/75 shadow backdrop-blur-sm transition-all hover:bg-background/90 active:scale-95"
            >
              <ChevronRight className="size-4" strokeWidth={1.8} />
            </button>

            {/* Nokta indikatörleri */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Görsel ${index + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    index === active
                      ? 'w-4 h-1.5 bg-foreground'
                      : 'w-1.5 h-1.5 bg-foreground/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail satırı */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => {
            const isActive = index === active
            return (
              <button
                key={image.url + index}
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={isActive}
                aria-label={image.altText}
                className={`bg-card relative aspect-square overflow-hidden rounded-2xl transition-all duration-400 ${
                  isActive ? 'ring-primary/50 shadow-soft ring-2' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <Image src={image.url} alt="" fill sizes="15vw" className="object-cover" />
              </button>
            )
          })}
        </div>
      )}
    </Reveal>
  )
}
