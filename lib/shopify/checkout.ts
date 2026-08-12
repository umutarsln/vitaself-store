import type { CartLine } from '@/lib/cart'
import type { CheckoutAddress, CheckoutCustomer } from '@/lib/orders'
import { storefrontFetch } from '@/lib/shopify/client'
import { countryNameToCode } from '@/lib/shopify/country-codes'
import { resolveShopifyVariantId } from '@/lib/shopify/products'

type CartCreateResult = {
  cartCreate: {
    cart: { id: string; checkoutUrl: string } | null
    userErrors: Array<{ field: string[] | null; message: string }>
  }
}

export type ShopifyCheckoutInput = {
  lines: CartLine[]
  customer: CheckoutCustomer
  shippingAddress: CheckoutAddress
  notes?: string
}

export type ShopifyCheckoutResult = {
  cartId: string
  checkoutUrl: string
}

/**
 * Sepet satırlarından Shopify Cart oluşturur ve hosted checkout URL döner.
 * @see https://shopify.dev/docs/api/storefront/latest/mutations/cartCreate
 */
export async function createShopifyCheckout(
  input: ShopifyCheckoutInput,
): Promise<ShopifyCheckoutResult> {
  const merchandiseLines = []

  for (const line of input.lines) {
    const merchandiseId = await resolveShopifyVariantId(line.variantId, line.handle)
    if (!merchandiseId) {
      throw new Error(`Shopify variant not found for cart line: ${line.handle ?? line.variantId}`)
    }

    merchandiseLines.push({
      merchandiseId,
      quantity: Math.max(1, Math.floor(line.quantity)),
    })
  }

  const countryCode = countryNameToCode(input.shippingAddress.country)
  const noteAttributes = input.notes?.trim()
    ? [{ key: 'order_notes', value: input.notes.trim() }]
    : undefined

  const data = await storefrontFetch<CartCreateResult>(
    `mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }`,
    {
      input: {
        lines: merchandiseLines,
        note: input.notes?.trim() || undefined,
        attributes: noteAttributes,
        buyerIdentity: {
          email: input.customer.email,
          phone: input.customer.phone || undefined,
          countryCode: countryCode ?? undefined,
        },
      },
    },
  )

  const { cart, userErrors } = data.cartCreate

  if (userErrors.length > 0) {
    throw new Error(userErrors.map((error) => error.message).join('; '))
  }

  if (!cart?.checkoutUrl) {
    throw new Error('Shopify did not return a checkout URL')
  }

  return {
    cartId: cart.id,
    checkoutUrl: cart.checkoutUrl,
  }
}
