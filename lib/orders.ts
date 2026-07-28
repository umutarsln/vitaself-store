/**
 * Checkout / sipariş tipleri.
 * Shopify Checkout API bağlandığında alan adları korunacak şekilde sade tutuldu.
 */

import type { CartLine } from '@/lib/cart'
import type { Money } from '@/lib/products'

export type CheckoutCustomer = {
  email: string
  firstName: string
  lastName: string
  phone: string
}

export type CheckoutAddress = {
  line1: string
  line2?: string
  city: string
  state: string
  postalCode: string
  country: string
}

export type CheckoutPaymentMethod = 'card' | 'transfer'

export type CheckoutPayload = {
  lines: CartLine[]
  customer: CheckoutCustomer
  shippingAddress: CheckoutAddress
  paymentMethod: CheckoutPaymentMethod
  lang: 'en' | 'tr'
  notes?: string
}

export type CheckoutOrder = {
  id: string
  createdAt: string
  status: 'paid' | 'pending'
  paymentMethod: CheckoutPaymentMethod
  customer: CheckoutCustomer
  shippingAddress: CheckoutAddress
  lines: Array<{
    variantId: string
    quantity: number
    title: string
    variantTitle: string
    unitPrice: Money
    lineTotal: Money
  }>
  subtotal: Money
  shipping: Money
  total: Money
  currency: 'USD' | 'TRY'
  notes?: string
  /** Gerçek Shopify checkout URL’si bağlandığında doldurulur. */
  shopifyCheckoutUrl: string | null
  mode: 'mock' | 'shopify'
}

export const LAST_ORDER_KEY = 'vitaself-last-order'
