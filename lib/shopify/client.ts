import { getShopifyConfig } from '@/lib/shopify/config'

type StorefrontResponse<T> = {
  data?: T
  errors?: Array<{ message: string }>
}

/**
 * Shopify Storefront GraphQL API’ye istek gönderir.
 * Sunucu tarafında kullanılmalıdır (token gizli kalır).
 */
export async function storefrontFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const { storeDomain, storefrontToken, apiVersion } = getShopifyConfig()

  if (!storeDomain || !storefrontToken) {
    throw new Error('Shopify Storefront credentials are not configured')
  }

  const response = await fetch(
    `https://${storeDomain}/api/${apiVersion}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontToken,
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    },
  )

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`)
  }

  const payload = (await response.json()) as StorefrontResponse<T>

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join('; '))
  }

  if (!payload.data) {
    throw new Error('Shopify API returned empty data')
  }

  return payload.data
}
