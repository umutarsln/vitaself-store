/**
 * Yerel public/images görsellerini Shopify ürünlerine yükler.
 *
 * Kullanım:
 *   npx tsx --env-file=.env.local scripts/upload-product-images.ts
 *
 * Gerekli Admin scopes: write_products, write_files (veya read_files+write_files)
 */

import { readFileSync, statSync } from 'node:fs'
import { basename, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { products, type Product } from '../lib/products'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = join(__dirname, '..')
const PUBLIC = join(ROOT, 'public')

const domain = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, '').replace(/\/$/, '')
const clientId = process.env.SHOPIFY_CLIENT_ID || process.env.SHOPIFY_API_KEY
const clientSecret = process.env.SHOPIFY_CLIENT_SECRET || process.env.SHOPIFY_API_SECRET
const staticAdminToken = process.env.SHOPIFY_ADMIN_TOKEN
const version = process.env.SHOPIFY_API_VERSION || '2025-04'

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
  if (!response.ok) throw new Error(`Token failed (${response.status}): ${text.slice(0, 200)}`)
  const json = JSON.parse(text) as { access_token: string; expires_in?: number; scope?: string }
  cachedToken = json.access_token
  tokenExpiresAt = Date.now() + (json.expires_in || 86399) * 1000
  console.log('Admin scopes:', json.scope || '(yok)')
  return cachedToken
}

/** Admin GraphQL isteği gönderir. */
async function adminGraphql<T>(
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
  const json = (await response.json()) as { data?: T; errors?: Array<{ message: string }> }
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join('; '))
  if (!json.data) throw new Error('Empty GraphQL response')
  return json.data
}

/** Dosya uzantısından MIME tipi döner. */
function mimeFor(path: string): string {
  const ext = extname(path).toLowerCase()
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg'
  if (ext === '.webp') return 'image/webp'
  if (ext === '.gif') return 'image/gif'
  return 'image/png'
}

/** Ürünün benzersiz görsel yollarını (featured + gallery) toplar. */
function collectImagePaths(product: Product): Array<{ absPath: string; alt: string }> {
  const seen = new Set<string>()
  const items: Array<{ absPath: string; alt: string }> = []
  for (const image of [product.featuredImage, ...product.images]) {
    if (seen.has(image.url)) continue
    seen.add(image.url)
    const absPath = join(PUBLIC, image.url.replace(/^\//, ''))
    try {
      statSync(absPath)
      items.push({ absPath, alt: image.altText })
    } catch {
      console.log(`  skip missing file: ${image.url}`)
    }
  }
  return items
}

/** Handle ile Shopify ürün id’sini bulur. */
async function findProductIdByHandle(handle: string): Promise<string | null> {
  const data = await adminGraphql<{ productByHandle: { id: string; media: { nodes: unknown[] } } | null }>(
    `query ($handle: String!) {
      productByHandle(handle: $handle) {
        id
        media(first: 20) { nodes { ... on MediaImage { id } } }
      }
    }`,
    { handle },
  )
  return data.productByHandle?.id ?? null
}

type StagedTarget = {
  url: string
  resourceUrl: string
  parameters: Array<{ name: string; value: string }>
}

/** Dosya için staged upload hedefi oluşturur. */
async function createStagedUpload(absPath: string): Promise<StagedTarget> {
  const filename = basename(absPath)
  const mimeType = mimeFor(absPath)
  const fileSize = String(statSync(absPath).size)

  const data = await adminGraphql<{
    stagedUploadsCreate: {
      stagedTargets: StagedTarget[]
      userErrors: Array<{ message: string }>
    }
  }>(
    `mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
      stagedUploadsCreate(input: $input) {
        stagedTargets { url resourceUrl parameters { name value } }
        userErrors { field message }
      }
    }`,
    {
      input: [
        {
          filename,
          mimeType,
          resource: 'PRODUCT_IMAGE',
          httpMethod: 'POST',
          fileSize,
        },
      ],
    },
  )

  if (data.stagedUploadsCreate.userErrors.length) {
    throw new Error(data.stagedUploadsCreate.userErrors.map((e) => e.message).join('; '))
  }
  const target = data.stagedUploadsCreate.stagedTargets[0]
  if (!target) throw new Error('No staged target returned')
  return target
}

/** Dosyayı staged URL’e yükler. */
async function uploadToStaged(target: StagedTarget, absPath: string) {
  const form = new FormData()
  for (const param of target.parameters) {
    form.append(param.name, param.value)
  }
  const bytes = readFileSync(absPath)
  const blob = new Blob([bytes], { type: mimeFor(absPath) })
  form.append('file', blob, basename(absPath))

  const response = await fetch(target.url, { method: 'POST', body: form })
  if (!response.ok && response.status !== 201 && response.status !== 204) {
    const text = await response.text()
    throw new Error(`Upload failed (${response.status}): ${text.slice(0, 300)}`)
  }
}

/** Staged resourceUrl ile ürüne medya ekler. */
async function attachMedia(productId: string, resourceUrl: string, alt: string) {
  const data = await adminGraphql<{
    productCreateMedia: {
      media: Array<{ id?: string; status?: string }>
      mediaUserErrors: Array<{ message: string }>
    }
  }>(
    `mutation productCreateMedia($productId: ID!, $media: [CreateMediaInput!]!) {
      productCreateMedia(productId: $productId, media: $media) {
        media { ... on MediaImage { id status } }
        mediaUserErrors { field message }
      }
    }`,
    {
      productId,
      media: [
        {
          originalSource: resourceUrl,
          alt,
          mediaContentType: 'IMAGE',
        },
      ],
    },
  )

  if (data.productCreateMedia.mediaUserErrors.length) {
    throw new Error(data.productCreateMedia.mediaUserErrors.map((e) => e.message).join('; '))
  }
}

/** Ürünün mevcut medyasını siler (yeniden yükleme için). */
async function clearProductMedia(productId: string) {
  const data = await adminGraphql<{
    product: { media: { nodes: Array<{ id: string }> } } | null
  }>(
    `query ($id: ID!) {
      product(id: $id) {
        media(first: 50) { nodes { id } }
      }
    }`,
    { id: productId },
  )

  const ids = data.product?.media.nodes.map((node) => node.id) ?? []
  if (ids.length === 0) return

  const result = await adminGraphql<{
    productDeleteMedia: { mediaUserErrors: Array<{ message: string }> }
  }>(
    `mutation productDeleteMedia($productId: ID!, $mediaIds: [ID!]!) {
      productDeleteMedia(productId: $productId, mediaIds: $mediaIds) {
        mediaUserErrors { field message }
      }
    }`,
    { productId, mediaIds: ids },
  )

  if (result.productDeleteMedia.mediaUserErrors.length) {
    console.log(
      '  clear media warnings:',
      result.productDeleteMedia.mediaUserErrors.map((e) => e.message).join('; '),
    )
  }
}

async function main() {
  console.log(`Uploading images for ${products.length} products → ${domain}\n`)
  await getAdminToken()

  for (const product of products) {
    process.stdout.write(`→ ${product.handle} … `)
    try {
      const productId = await findProductIdByHandle(product.handle)
      if (!productId) {
        console.log('SKIP (not in Shopify)')
        continue
      }

      const images = collectImagePaths(product)
      if (images.length === 0) {
        console.log('SKIP (no local images)')
        continue
      }

      await clearProductMedia(productId)

      for (const image of images) {
        const staged = await createStagedUpload(image.absPath)
        await uploadToStaged(staged, image.absPath)
        await attachMedia(productId, staged.resourceUrl, image.alt)
      }

      console.log(`OK (${images.length} images)`)
    } catch (error) {
      console.log('FAIL')
      console.error(`  ${error instanceof Error ? error.message : error}`)
    }
  }

  console.log('\nDone.')
}

main().catch((error) => {
  console.error('FAILED:', error instanceof Error ? error.message : error)
  process.exit(1)
})
