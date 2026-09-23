import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  hmacSha256Hex,
  iyzicoNotificationUrl,
  parseIyzicoWebhookBody,
  verifyIyzicoSignature,
} from './webhook'

describe('parseIyzicoWebhookBody', () => {
  it('parses JSON payment notifications', () => {
    const payload = parseIyzicoWebhookBody(
      JSON.stringify({
        paymentConversationId: 'VS-1',
        paymentId: 28157248,
        status: 'SUCCESS',
        iyziEventType: 'API_AUTH',
      }),
      'application/json',
    )

    assert.equal(payload.status, 'SUCCESS')
    assert.equal(payload.paymentConversationId, 'VS-1')
  })

  it('parses form-urlencoded notifications', () => {
    const payload = parseIyzicoWebhookBody(
      'status=SUCCESS&token=abc&iyziEventType=CHECKOUT_FORM_AUTH',
      'application/x-www-form-urlencoded',
    )

    assert.equal(payload.token, 'abc')
    assert.equal(payload.iyziEventType, 'CHECKOUT_FORM_AUTH')
  })

  it('returns an empty object for blank bodies', () => {
    assert.deepEqual(parseIyzicoWebhookBody('  ', 'application/json'), {})
  })
})

describe('verifyIyzicoSignature', () => {
  const secret = 'merchant-secret'

  it('accepts a matching Direct-format signature', () => {
    const payload = {
      iyziEventType: 'API_AUTH',
      paymentId: '28157248',
      paymentConversationId: 'conversationId',
      status: 'SUCCESS',
    }
    const signature = hmacSha256Hex(
      secret,
      secret + 'API_AUTH' + '28157248' + 'conversationId' + 'SUCCESS',
    )

    assert.equal(verifyIyzicoSignature(payload, signature, secret), true)
  })

  it('rejects a mismatched signature when a secret is configured', () => {
    const payload = {
      iyziEventType: 'API_AUTH',
      paymentId: '1',
      paymentConversationId: 'c',
      status: 'FAILURE',
    }

    assert.equal(verifyIyzicoSignature(payload, 'deadbeef', secret), false)
  })

  it('skips verification when no secret is configured', () => {
    assert.equal(verifyIyzicoSignature({ status: 'SUCCESS' }, null, undefined), true)
  })
})

describe('iyzicoNotificationUrl', () => {
  it('points at the public webhook path', () => {
    assert.match(iyzicoNotificationUrl(), /\/api\/webhooks\/iyzico$/)
  })
})
