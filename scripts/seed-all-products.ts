/**
 * lib/products.ts katalogundaki tüm ürünleri Shopify'a yazar.
 * Stok 100, tüm publication kanallarına publish eder.
 *
 * Kullanım:
 *   npx tsx --env-file=.env.local scripts/seed-all-products.ts
 */

import { products, type Product } from '../lib/products'

const domain = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, '').replace(/\/$/, '')
const clientId = process.env.SHOPIFY_CLIENT_ID || process.env.SHOPIFY_API_KEY
const clientSecret = process.env.SHOPIFY_CLIENT_SECRET || process.env.SHOPIFY_API_SECRET
const staticAdminToken = process.env.SHOPIFY_ADMIN_TOKEN
const version = process.env.SHOPIFY_API_VERSION || '2025-04'
const INVENTORY_QTY = 100

if (!domain) {
  console.error('SHOPIFY_STORE_DOMAIN gerekli')
  process.exit(1)
}

let cachedToken: string | null = null
let tokenExpiresAt = 0

/** Client credentials veya statik Admin token ile erişim token’ı döner. */
async function getAdminToken(): Promise<string> {
  if (staticAdminToken && !clientSecret) return staticAdminToken
  if (cachedToken && Date.now() < tokenExpiresAt - 60_000) return cachedToken

  if (!clientId || !clientSecret) {
    throw new Error('SHOPIFY_CLIENT_ID + SHOPIFY_CLIENT_SECRET gerekli')
  }

  const shop = domain!.replace('.myshopify.com', '')
  const response = await fetch(`https://${shop}.myshopify.com/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  })

  const text = await response.text()
  if (!response.ok) throw new Error(`Token request failed (${response.status}): ${text}`)

  const json = JSON.parse(text) as { access_token: string; expires_in?: number; scope?: string }
  cachedToken = json.access_token
  tokenExpiresAt = Date.now() + (json.expires_in || 86399) * 1000
  console.log('Admin token alındı. scopes:', json.scope || '(yok)')
  return cachedToken
}

/** Admin GraphQL isteği gönderir. */
async function adminGraphql<T = Record<string, unknown>>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const token = await getAdminToken()
  const response = await fetch(`https://${domain}/admin/api/${version}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  })
  const json = (await response.json()) as {
    data?: T
    errors?: Array<{ message: string }>
  }
  if (json.errors?.length) {
    throw new Error(json.errors.map((error) => error.message).join('; '))
  }
  if (!json.data) throw new Error('Empty Admin GraphQL response')
  return json.data
}

type SeededProduct = {
  id: string
  handle: string
  title: string
  variants: { nodes: Array<{ id: string; inventoryItem?: { id: string } | null }> }
}

/** Handle ile mevcut ürün id’sini bulur. */
async function findProductIdByHandle(handle: string): Promise<string | null> {
  const data = await adminGraphql<{
    productByHandle: { id: string } | null
  }>(
    `query ($handle: String!) {
      productByHandle(handle: $handle) { id }
    }`,
    { handle },
  )
  return data.productByHandle?.id ?? null
}

/** Tek ürünü productSet ile oluşturur/günceller. */
async function upsertProduct(product: Product): Promise<SeededProduct> {
  const variant = product.variants[0]
  const price = variant.price.try.toFixed(2)
  const description = product.description.en
  const existingId = await findProductIdByHandle(product.handle)

  const data = await adminGraphql<{
    productSet: {
      userErrors: Array<{ message: string }>
      product: SeededProduct | null
    }
  }>(
    `mutation productSet($input: ProductSetInput!, $synchronous: Boolean!) {
      productSet(input: $input, synchronous: $synchronous) {
        userErrors { field message code }
        product {
          id
          handle
          title
          variants(first: 1) {
            nodes {
              id
              inventoryItem { id }
            }
          }
        }
      }
    }`,
    {
      synchronous: true,
      input: {
        ...(existingId ? { id: existingId } : { handle: product.handle }),
        title: product.title.en,
        descriptionHtml: `<p>${description}</p>`,
        vendor: product.vendor,
        productType: product.category.en,
        status: 'ACTIVE',
        productOptions: [{ name: 'Title', values: [{ name: 'Default' }] }],
        variants: [
          {
            optionValues: [{ optionName: 'Title', name: 'Default' }],
            price,
            inventoryPolicy: 'CONTINUE',
          },
        ],
      },
    },
  )

  if (data.productSet.userErrors.length) {
    throw new Error(data.productSet.userErrors.map((error) => error.message).join('; '))
  }
  if (!data.productSet.product) {
    throw new Error(`productSet returned null for ${product.handle}`)
  }
  return data.productSet.product
}

/** Ürünü tüm publication kanallarına yayınlar. */
async function publishProduct(
  productId: string,
  publications: Array<{ id: string; name: string }>,
) {
  for (const publication of publications) {
    try {
      const result = await adminGraphql<{
        publishablePublish: { userErrors: Array<{ message: string }> }
      }>(
        `mutation publish($id: ID!, $input: [PublicationInput!]!) {
          publishablePublish(id: $id, input: $input) {
            userErrors { field message }
          }
        }`,
        { id: productId, input: [{ publicationId: publication.id }] },
      )
      const errs = result.publishablePublish.userErrors
      if (errs.length) {
        console.log(`  publish ${publication.name}: ${errs.map((e) => e.message).join('; ')}`)
      } else {
        console.log(`  published → ${publication.name}`)
      }
    } catch (error) {
      console.log(
        `  publish skip ${publication.name}:`,
        error instanceof Error ? error.message : error,
      )
    }
  }
}

/** Varyant stokunu belirtilen miktara ayarlar. */
async function setInventory(inventoryItemId: string, locationId: string, quantity: number) {
  await adminGraphql(
    `mutation($id: ID!, $input: InventoryItemInput!) {
      inventoryItemUpdate(id: $id, input: $input) {
        userErrors { message }
      }
    }`,
    { id: inventoryItemId, input: { tracked: true } },
  )

  const result = await adminGraphql<{
    inventorySetQuantities: { userErrors: Array<{ message: string }> }
  }>(
    `mutation($input: InventorySetQuantitiesInput!) {
      inventorySetQuantities(input: $input) {
        userErrors { message }
      }
    }`,
    {
      input: {
        name: 'available',
        reason: 'correction',
        ignoreCompareQuantity: true,
        quantities: [{ inventoryItemId, locationId, quantity }],
      },
    },
  )

  if (result.inventorySetQuantities.userErrors.length) {
    throw new Error(
      result.inventorySetQuantities.userErrors.map((error) => error.message).join('; '),
    )
  }
}

async function main() {
  console.log(`Seeding ${products.length} products → ${domain}\n`)

  const pubsData = await adminGraphql<{
    publications: { nodes: Array<{ id: string; name: string }> }
    locations: { nodes: Array<{ id: string }> }
  }>(`{
    publications(first: 20) { nodes { id name } }
    locations(first: 5) { nodes { id } }
  }`)

  const publications = pubsData.publications.nodes
  const locationId = pubsData.locations.nodes[0]?.id
  if (!locationId) throw new Error('No inventory location found')

  console.log(
    'Publications:',
    publications.map((item) => item.name).join(', ') || '(none)',
  )
  console.log('Location:', locationId, '\n')

  for (const product of products) {
    process.stdout.write(`→ ${product.handle} … `)
    try {
      const seeded = await upsertProduct(product)
      const variant = seeded.variants.nodes[0]
      const inventoryItemId = variant?.inventoryItem?.id
      if (inventoryItemId) {
        await setInventory(inventoryItemId, locationId, INVENTORY_QTY)
      }
      console.log(`OK ${seeded.id}`)
      await publishProduct(seeded.id, publications)
    } catch (error) {
      console.log('FAIL')
      console.error(`  ${error instanceof Error ? error.message : error}`)
    }
  }

  console.log('\nDone. Storefront handles:')
  for (const product of products) {
    console.log(`  - ${product.handle}`)
  }
}

main().catch((error) => {
  console.error('FAILED:', error instanceof Error ? error.message : error)
  process.exit(1)
})
