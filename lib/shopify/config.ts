/** Shopify Storefront API yapılandırmasını okur. */
export function getShopifyConfig() {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN?.trim()
  const storefrontToken = process.env.SHOPIFY_STOREFRONT_TOKEN?.trim()
  const apiVersion = process.env.SHOPIFY_API_VERSION?.trim() || '2025-04'

  return {
    storeDomain,
    storefrontToken,
    apiVersion,
  }
}

/** Storefront kimlik bilgileri tanımlı mı kontrol eder. */
export function isShopifyConfigured(): boolean {
  const { storeDomain, storefrontToken } = getShopifyConfig()
  return Boolean(storeDomain && storefrontToken)
}
