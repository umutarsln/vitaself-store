import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  cartSubtotal,
  lineTotal,
  quantityDiscountPercent,
  shippingForSubtotal,
} from '../lib/products'

describe('quantityDiscountPercent', () => {
  it('returns tiered discounts', () => {
    assert.equal(quantityDiscountPercent(1), 0)
    assert.equal(quantityDiscountPercent(2), 8)
    assert.equal(quantityDiscountPercent(3), 12)
    assert.equal(quantityDiscountPercent(5), 12)
  })
})

describe('lineTotal', () => {
  it('applies quantity discount to line totals', () => {
    const price = { usd: 100, try: 1000 }
    assert.deepEqual(lineTotal(price, 1), { usd: 100, try: 1000 })
    assert.deepEqual(lineTotal(price, 2), { usd: 184, try: 1840 })
    assert.deepEqual(lineTotal(price, 3), { usd: 264, try: 2640 })
  })
})

describe('cartSubtotal + shipping', () => {
  it('sums discounted lines and unlocks free shipping over threshold', () => {
    const subtotal = cartSubtotal([
      { variantId: 'gid://shopify/ProductVariant/11', quantity: 2 },
    ])
    // 54 * 2 = 108, 8% off => 99.36
    assert.equal(subtotal.usd, 99.36)
    assert.deepEqual(shippingForSubtotal(subtotal), { usd: 0, try: 0 })
  })

  it('charges flat shipping under threshold', () => {
    const subtotal = cartSubtotal([
      { variantId: 'gid://shopify/ProductVariant/31', quantity: 1 },
    ])
    assert.equal(subtotal.usd, 38)
    assert.deepEqual(shippingForSubtotal(subtotal), { usd: 8, try: 149 })
  })
})
