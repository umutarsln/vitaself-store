'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { dailyFoundation } from '@/lib/products'

type FeaturedVariantContextValue = {
  variantId: string
  setVariantId: (id: string) => void
}

const FeaturedVariantContext = createContext<FeaturedVariantContextValue | null>(null)

/** Ana sayfa featured ürün varyant seçimini sticky bar ile paylaşır. */
export function FeaturedVariantProvider({ children }: { children: ReactNode }) {
  const [variantId, setVariantIdState] = useState(dailyFoundation.variants[0].id)

  /** Seçili featured varyant id’sini günceller. */
  const setVariantId = useCallback((id: string) => {
    if (dailyFoundation.variants.some((variant) => variant.id === id)) {
      setVariantIdState(id)
    }
  }, [])

  const value = useMemo(
    () => ({ variantId, setVariantId }),
    [variantId, setVariantId],
  )

  return (
    <FeaturedVariantContext.Provider value={value}>{children}</FeaturedVariantContext.Provider>
  )
}

/** Featured varyant context hook’u — provider dışında null döner. */
export function useFeaturedVariant() {
  return useContext(FeaturedVariantContext)
}
