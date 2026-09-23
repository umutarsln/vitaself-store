import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { langToCountryCode } from './country-codes'

describe('langToCountryCode', () => {
  it('maps storefront languages to Shopify country codes', () => {
    assert.equal(langToCountryCode('tr'), 'TR')
    assert.equal(langToCountryCode('en'), 'TR')
    assert.equal(langToCountryCode('de'), 'DE')
    assert.equal(langToCountryCode('ru'), 'RU')
  })
})
