'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { cartSubtotal, type Money } from '@/lib/products'

/**
 * Local cart state. Deliberately thin: when Shopify is connected this becomes a
 * wrapper around the Storefront cart mutations, with the same public interface.
 */
export type CartLine = { variantId: string; quantity: number }

export type AddToCartOptions = {
  /** Sepet drawer'ını açar. */
  openDrawer?: boolean
}

type CartContextValue = {
  lines: CartLine[]
  count: number
  subtotal: Money
  hydrated: boolean
  isOpen: boolean
  /** Her sepete eklemede artar — header/toast animasyonu için. */
  pulseKey: number
  /** Son eklenen varyant id'si — drawer satır vurgusu için. */
  lastAddedVariantId: string | null
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  add: (variantId: string, quantity?: number, options?: AddToCartOptions) => void
  remove: (variantId: string) => void
  update: (variantId: string, quantity: number) => void
  clear: () => void
}

const STORAGE_KEY = 'vitaself-cart'
const CartContext = createContext<CartContextValue | null>(null)

/** localStorage’dan sepet satırlarını okur. */
function readStoredLines(): CartLine[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (line): line is CartLine =>
        Boolean(line) &&
        typeof line === 'object' &&
        typeof (line as CartLine).variantId === 'string' &&
        typeof (line as CartLine).quantity === 'number' &&
        (line as CartLine).quantity > 0,
    )
  } catch {
    return []
  }
}

/** Sepet satırlarını localStorage’a yazar. */
function writeStoredLines(lines: CartLine[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  } catch {
    // Storage dolu veya engelli — sessizce yoksay.
  }
}

/** Sepet provider: persist, drawer state, add/remove/update/clear. */
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [hydrated, setHydrated] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [pulseKey, setPulseKey] = useState(0)
  const [lastAddedVariantId, setLastAddedVariantId] = useState<string | null>(null)

  useEffect(() => {
    setLines(readStoredLines())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    writeStoredLines(lines)
  }, [lines, hydrated])

  /** Sepet drawer’ını açar. */
  const openCart = useCallback(() => setIsOpen(true), [])
  /** Sepet drawer’ını kapatır. */
  const closeCart = useCallback(() => setIsOpen(false), [])
  /** Sepet drawer açık/kapalı durumunu değiştirir. */
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), [])

  /** Varyantı sepete ekler (veya miktarı artırır) ve geri bildirim tetikler. */
  const add = useCallback((variantId: string, quantity = 1, options?: AddToCartOptions) => {
    const safeQty = Math.max(1, Math.floor(quantity))
    setLines((prev) => {
      const existing = prev.find((line) => line.variantId === variantId)
      if (existing) {
        return prev.map((line) =>
          line.variantId === variantId
            ? { ...line, quantity: line.quantity + safeQty }
            : line,
        )
      }
      return [...prev, { variantId, quantity: safeQty }]
    })
    setPulseKey((prev) => prev + 1)
    setLastAddedVariantId(variantId)
    if (options?.openDrawer) {
      setIsOpen(true)
    }
  }, [])

  /** Satırı sepetten kaldırır. */
  const remove = useCallback((variantId: string) => {
    setLines((prev) => prev.filter((line) => line.variantId !== variantId))
  }, [])

  /** Satır miktarını günceller; 0 ise kaldırır. */
  const update = useCallback((variantId: string, quantity: number) => {
    const nextQty = Math.floor(quantity)
    setLines((prev) => {
      if (nextQty <= 0) {
        return prev.filter((line) => line.variantId !== variantId)
      }
      return prev.map((line) =>
        line.variantId === variantId ? { ...line, quantity: nextQty } : line,
      )
    })
  }, [])

  /** Sepeti tamamen boşaltır. */
  const clear = useCallback(() => setLines([]), [])

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((total, line) => total + line.quantity, 0),
      subtotal: cartSubtotal(lines),
      hydrated,
      isOpen,
      pulseKey,
      lastAddedVariantId,
      openCart,
      closeCart,
      toggleCart,
      add,
      remove,
      update,
      clear,
    }),
    [lines, hydrated, isOpen, pulseKey, lastAddedVariantId, openCart, closeCart, toggleCart, add, remove, update, clear],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

/** Sepet context hook’u. */
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
