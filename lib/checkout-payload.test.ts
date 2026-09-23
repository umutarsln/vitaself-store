import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { isValidCheckoutPayload } from './checkout-payload'

const line = { variantId: 'gid://shopify/ProductVariant/1', quantity: 1, handle: 'omega-3' }

describe('isValidCheckoutPayload', () => {
  it('accepts line-only payloads when Shopify checkout is enabled', () => {
    assert.equal(
      isValidCheckoutPayload({ lines: [line], lang: 'tr' }, true),
      true,
    )
  })

  it('rejects empty carts in both modes', () => {
    assert.equal(isValidCheckoutPayload({ lines: [], lang: 'tr' }, true), false)
    assert.equal(isValidCheckoutPayload({ lines: [], lang: 'tr' }, false), false)
  })

  it('requires contact, address and payment in mock mode', () => {
    assert.equal(isValidCheckoutPayload({ lines: [line], lang: 'tr' }, false), false)
    assert.equal(
      isValidCheckoutPayload(
        {
          lines: [line],
          lang: 'tr',
          customer: {
            email: 'a@b.com',
            firstName: 'Umut',
            lastName: 'Arslan',
            phone: '555',
          },
          shippingAddress: {
            line1: 'Sokak 1',
            city: 'Antalya',
            state: 'Kepez',
            postalCode: '07600',
            country: 'Türkiye',
          },
          paymentMethod: 'card',
        },
        false,
      ),
      true,
    )
  })
})
