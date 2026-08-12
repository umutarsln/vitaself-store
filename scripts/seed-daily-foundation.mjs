/**
 * Shopify Admin API ile daily-foundation ürününü oluşturur/günceller.
 *
 * Yeni Shopify akışı: kalıcı shpat_ kopyalanmaz.
 * Client ID + Secret ile client_credentials token alınır (24 saat).
 *
 * .env.local:
 *   SHOPIFY_STORE_DOMAIN=vitaself-premium-3g3oy.myshopify.com
 *   SHOPIFY_CLIENT_ID=...
 *   SHOPIFY_CLIENT_SECRET=...
 *   # veya eski kalıcı token:
 *   # SHOPIFY_ADMIN_TOKEN=shpat_...
 *
 * Kullanım: node --env-file=.env.local scripts/seed-daily-foundation.mjs
 */

const domain = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, '').replace(/\/$/, '')
const clientId = process.env.SHOPIFY_CLIENT_ID || process.env.SHOPIFY_API_KEY
const clientSecret = process.env.SHOPIFY_CLIENT_SECRET || process.env.SHOPIFY_API_SECRET
const staticAdminToken = process.env.SHOPIFY_ADMIN_TOKEN
const version = process.env.SHOPIFY_API_VERSION || '2025-04'

if (!domain) {
  console.error('SHOPIFY_STORE_DOMAIN gerekli')
  process.exit(1)
}

let cachedToken = null
let tokenExpiresAt = 0

/**
 * Client credentials veya statik Admin token ile erişim token’ı döner.
 * @see https://shopify.dev/docs/apps/build/dev-dashboard/get-api-access-tokens
 */
async function getAdminToken() {
  if (staticAdminToken && !clientSecret) {
    return staticAdminToken
  }

  if (cachedToken && Date.now() < tokenExpiresAt - 60_000) {
    return cachedToken
  }

  if (!clientId || !clientSecret) {
    throw new Error(
      'SHOPIFY_CLIENT_ID + SHOPIFY_CLIENT_SECRET gerekli (veya SHOPIFY_ADMIN_TOKEN)',
    )
  }

  const shop = domain.replace('.myshopify.com', '')
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
  if (!response.ok) {
    throw new Error(`Token request failed (${response.status}): ${text}`)
  }

  const json = JSON.parse(text)
  cachedToken = json.access_token
  tokenExpiresAt = Date.now() + (json.expires_in || 86399) * 1000
  console.log('Admin token alındı. scopes:', json.scope || '(yok)')
  return cachedToken
}

/** Admin GraphQL isteği gönderir. */
async function adminGraphql(query, variables) {
  const token = await getAdminToken()
  const response = await fetch(`https://${domain}/admin/api/${version}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  })
  const json = await response.json()
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('; '))
  }
  return json.data
}

async function main() {
  const data = await adminGraphql(
    `mutation productSet($input: ProductSetInput!, $synchronous: Boolean!) {
      productSet(input: $input, synchronous: $synchronous) {
        userErrors { field message code }
        product {
          id
          handle
          title
          status
          variants(first: 1) {
            nodes { id title price inventoryQuantity }
          }
        }
      }
    }`,
    {
      synchronous: true,
      input: {
        handle: 'daily-foundation',
        title: 'Daily Foundation',
        descriptionHtml:
          '<p>Vitamins, minerals, and adaptogens at doses that reflect published research — not the minimum required to print an ingredient on a label.</p>',
        vendor: 'Vitaself',
        productType: 'Daily essentials',
        status: 'ACTIVE',
        productOptions: [
          {
            name: 'Title',
            values: [{ name: 'Default' }],
          },
        ],
        variants: [
          {
            optionValues: [{ optionName: 'Title', name: 'Default' }],
            price: '1860.00',
          },
        ],
      },
    },
  )

  const payload = data.productSet
  if (payload.userErrors?.length) {
    console.error('userErrors:', JSON.stringify(payload.userErrors, null, 2))
    process.exit(1)
  }

  console.log('OK product:', JSON.stringify(payload.product, null, 2))

  const pubs = await adminGraphql(`{
    publications(first: 20) {
      nodes { id name }
    }
  }`).catch(() => null)

  const productId = payload.product.id
  const publications = pubs?.publications?.nodes || []
  console.log(
    'publications:',
    publications.map((p) => p.name).join(', ') || '(none / no scope)',
  )

  for (const publication of publications) {
    try {
      const pubResult = await adminGraphql(
        `mutation publish($id: ID!, $input: [PublicationInput!]!) {
          publishablePublish(id: $id, input: $input) {
            userErrors { field message }
          }
        }`,
        {
          id: productId,
          input: [{ publicationId: publication.id }],
        },
      )
      const errs = pubResult.publishablePublish?.userErrors || []
      if (errs.length) {
        console.log(`publish ${publication.name}:`, errs.map((e) => e.message).join('; '))
      } else {
        console.log(`published → ${publication.name}`)
      }
    } catch (error) {
      console.log(`publish skip ${publication.name}:`, error.message)
    }
  }

  console.log('\nDone. Storefront handle: daily-foundation')
}

main().catch((error) => {
  console.error('FAILED:', error.message)
  console.error(`
Yeni Shopify akışı (2026):
1. Dev Dashboard → vita-front → Sürümler → Kapsamlar'a yazın:
   read_products,write_products,read_inventory,write_inventory,read_publications,write_publications
2. Yayınla
3. App'i mağazaya kurun
4. .env.local'e ekleyin:
   SHOPIFY_CLIENT_ID=<İstemci Kimliği>
   SHOPIFY_CLIENT_SECRET=<Gizli anahtar>
5. Tekrar: node --env-file=.env.local scripts/seed-daily-foundation.mjs

Not: Client credentials yalnızca aynı organization'daki mağazalarda çalışır.
`)
  process.exit(1)
})
