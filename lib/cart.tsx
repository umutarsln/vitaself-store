'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

/**
 * Local cart state. Deliberately thin: when Shopify is connected this becomes a
 * wrapper around the Storefront cart mutations, with the same public interface.
 */
type CartLine = { variantId: string; quantity: number }

type CartContextValue = {
  lines: CartLine[]
  count: number
  add: (variantId: string, quantity?: number) => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])

  const add = useCallback((variantId: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((line) => line.variantId === variantId)
      if (existing) {
        return prev.map((line) =>
          line.variantId === variantId ? { ...line, quantity: line.quantity + quantity } : line,
        )
      }
      return [...prev, { variantId, quantity }]
    })
  }, [])

  const value = useMemo(
    () => ({ lines, add, count: lines.reduce((total, line) => total + line.quantity, 0) }),
    [lines, add],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
