/**
 * Shopify-shaped product catalog.
 *
 * Field names intentionally mirror the Storefront API so this module can later be
 * replaced by a `getProduct(handle)` call without touching any UI component.
 */

export type Money = { usd: number; try: number }

/** Dil bazlı kısa metin çifti. */
export type LocaleCopy = { en: string; tr: string }

export type ProductVariant = {
  id: string
  title: string
  sellingPlan: 'subscription' | 'onetime'
  price: Money
  compareAtPrice: Money | null
  availableForSale: boolean
}

export type Product = {
  id: string
  handle: string
  vendor: string
  title: LocaleCopy
  subtitle: LocaleCopy
  description: LocaleCopy
  badge?: LocaleCopy
  category: LocaleCopy
  highlights: LocaleCopy[]
  activesCount: number
  featuredImage: { url: string; altText: string }
  images: { url: string; altText: string }[]
  rating: { value: number; count: number }
  servingsPerContainer: number
  variants: ProductVariant[]
  /** PDP “frequently bought together” / stack önerileri. */
  stackWith: string[]
  /** Tek tıkla eklenebilir cross-sell add-on’ları (neden metniyle). */
  crossSells: { handle: string; reason: LocaleCopy }[]
  relatedHandles: string[]
}

/** Verilen dil için yerelleştirilmiş metni döndürür. */
export function copy(text: LocaleCopy, lang: 'en' | 'tr'): string {
  return text[lang]
}

/** Günlük birim fiyatı hesaplar. */
export function perDayPrice(price: Money, servings: number): Money {
  return {
    usd: Math.round((price.usd / servings) * 100) / 100,
    try: Math.round((price.try / servings) * 100) / 100,
  }
}

/** Para birimini miktarla çarpar. */
export function multiplyMoney(price: Money, quantity: number): Money {
  return {
    usd: Math.round(price.usd * quantity * 100) / 100,
    try: Math.round(price.try * quantity),
  }
}

/** İki Money değerini toplar. */
export function addMoney(a: Money, b: Money): Money {
  return { usd: a.usd + b.usd, try: a.try + b.try }
}

/** Yüzde indirim uygular (görünen stack tasarrufu için). */
export function discountMoney(price: Money, percent: number): Money {
  const factor = (100 - percent) / 100
  return {
    usd: Math.round(price.usd * factor * 100) / 100,
    try: Math.round(price.try * factor),
  }
}

export const dailyFoundation: Product = {
  id: 'gid://shopify/Product/1',
  handle: 'daily-foundation',
  vendor: 'Vitaself',
  title: { en: 'Daily Foundation', tr: 'Günlük Temel' },
  subtitle: {
    en: '32 actives. One serving. Full transparency.',
    tr: '32 aktif. Tek servis. Tam şeffaflık.',
  },
  description: {
    en: 'Vitamins, minerals, and adaptogens at doses that reflect published research — not the minimum required to print an ingredient on a label.',
    tr: 'Vitaminler, mineraller ve adaptojenler; etiketde görünmek için gereken en düşük miktarda değil, yayımlanmış araştırmalardaki dozlarda.',
  },
  badge: { en: 'Best seller', tr: 'Çok satan' },
  category: { en: 'Daily essentials', tr: 'Günlük temel' },
  highlights: [
    { en: 'Clinical doses printed in mg', tr: 'Klinik dozlar mg olarak yazılı' },
    { en: 'Methylated B-vitamins', tr: 'Metillenmiş B vitaminleri' },
    { en: 'Third-party tested every batch', tr: 'Her parti bağımsız test' },
    { en: 'No proprietary blends', tr: 'Gizli karışım yok' },
  ],
  activesCount: 32,
  featuredImage: {
    url: '/images/product-packshot.png',
    altText: 'Vitaself Daily Foundation bottle on an ivory background',
  },
  images: [
    { url: '/images/product-packshot.png', altText: 'Vitaself Daily Foundation bottle' },
    { url: '/images/capsules-macro.png', altText: 'Three Vitaself capsules photographed in macro' },
    { url: '/images/ingredient-macro.png', altText: 'Raw Vitaself ingredients in glass dishes' },
    { url: '/images/hero-product.png', altText: 'Daily Foundation bottle in afternoon light' },
  ],
  rating: { value: 4.9, count: 3412 },
  servingsPerContainer: 30,
  variants: [
    {
      id: 'gid://shopify/ProductVariant/11',
      title: 'Subscription',
      sellingPlan: 'subscription',
      price: { usd: 54, try: 1490 },
      compareAtPrice: { usd: 68, try: 1860 },
      availableForSale: true,
    },
    {
      id: 'gid://shopify/ProductVariant/12',
      title: 'One-time',
      sellingPlan: 'onetime',
      price: { usd: 68, try: 1860 },
      compareAtPrice: null,
      availableForSale: true,
    },
  ],
  stackWith: ['sleep-depth', 'algal-omega'],
  crossSells: [
    {
      handle: 'sleep-depth',
      reason: {
        en: 'Close the day with non-melatonin recovery.',
        tr: 'Günü melatonin olmadan toparlanma ile kapatın.',
      },
    },
    {
      handle: 'algal-omega',
      reason: {
        en: 'Add algal DHA/EPA for cognition and vision.',
        tr: 'Biliş ve görme için algal DHA/EPA ekleyin.',
      },
    },
  ],
  relatedHandles: ['sleep-depth', 'algal-omega', 'essentials-trio'],
}

export const sleepDepth: Product = {
  id: 'gid://shopify/Product/2',
  handle: 'sleep-depth',
  vendor: 'Vitaself',
  title: { en: 'Sleep Depth', tr: 'Uyku Derinliği' },
  subtitle: {
    en: 'Magnesium, L-theanine, and apigenin — without melatonin fog.',
    tr: 'Magnezyum, L-teanin ve apigenin — melatonin sisi olmadan.',
  },
  description: {
    en: 'A night formula built for restorative sleep architecture. Non-habit forming actives at research-backed doses, taken sixty minutes before lights out.',
    tr: 'Onarıcı uyku mimarisi için tasarlanmış gece formülü. Araştırma dozlarında, bağımlılık yapmayan aktifler; ışıklar kapanmadan altmış dakika önce.',
  },
  badge: { en: 'New', tr: 'Yeni' },
  category: { en: 'Recovery', tr: 'Toparlanma' },
  highlights: [
    { en: '200 mg magnesium bisglycinate', tr: '200 mg magnezyum bisglisinat' },
    { en: '200 mg L-theanine', tr: '200 mg L-teanin' },
    { en: 'No melatonin, no next-day fog', tr: 'Melatonin yok, ertesi gün sisi yok' },
    { en: 'Taken 60 minutes before bed', tr: 'Yatmadan 60 dakika önce' },
  ],
  activesCount: 6,
  featuredImage: {
    url: '/images/lifestyle-morning.png',
    altText: 'Quiet morning light suggesting deep overnight recovery',
  },
  images: [
    { url: '/images/lifestyle-morning.png', altText: 'Soft morning light after restorative sleep' },
    { url: '/images/capsules-macro.png', altText: 'Sleep Depth capsules in macro' },
    { url: '/images/ingredient-macro.png', altText: 'Botanical sleep actives in glass dishes' },
  ],
  rating: { value: 4.8, count: 986 },
  servingsPerContainer: 30,
  variants: [
    {
      id: 'gid://shopify/ProductVariant/21',
      title: 'Subscription',
      sellingPlan: 'subscription',
      price: { usd: 42, try: 1160 },
      compareAtPrice: { usd: 52, try: 1420 },
      availableForSale: true,
    },
    {
      id: 'gid://shopify/ProductVariant/22',
      title: 'One-time',
      sellingPlan: 'onetime',
      price: { usd: 52, try: 1420 },
      compareAtPrice: null,
      availableForSale: true,
    },
  ],
  stackWith: ['daily-foundation', 'algal-omega'],
  crossSells: [
    {
      handle: 'daily-foundation',
      reason: {
        en: 'Anchor the morning with the full daily formula.',
        tr: 'Sabahı tam günlük formülle sabitleyin.',
      },
    },
    {
      handle: 'algal-omega',
      reason: {
        en: 'Support cellular recovery with clean omega-3.',
        tr: 'Hücresel toparlanmayı temiz omega-3 ile destekleyin.',
      },
    },
  ],
  relatedHandles: ['daily-foundation', 'algal-omega', 'essentials-trio'],
}

export const algalOmega: Product = {
  id: 'gid://shopify/Product/3',
  handle: 'algal-omega',
  vendor: 'Vitaself',
  title: { en: 'Algal Omega', tr: 'Algal Omega' },
  subtitle: {
    en: 'Plant-based DHA & EPA. No fish. No aftertaste.',
    tr: 'Bitkisel DHA ve EPA. Balık yok. Tat yok.',
  },
  description: {
    en: 'Algal-sourced omega-3 for cognition, vision, and cellular inflammation — without the marine supply chain. Third-party tested for oxidation and heavy metals.',
    tr: 'Biliş, görme ve hücresel inflamasyon için alg kaynaklı omega-3 — deniz ürünleri tedarik zinciri olmadan. Oksidasyon ve ağır metal için bağımsız test.',
  },
  category: { en: 'Cognitive support', tr: 'Bilişsel destek' },
  highlights: [
    { en: '500 mg DHA + 250 mg EPA', tr: '500 mg DHA + 250 mg EPA' },
    { en: 'Algal, not fish oil', tr: 'Alg kaynaklı, balık yağı değil' },
    { en: 'Oxidation-tested every batch', tr: 'Her parti oksidasyon testi' },
    { en: 'Softgel, no aftertaste', tr: 'Yumuşak kapsül, sonradan tat yok' },
  ],
  activesCount: 2,
  featuredImage: {
    url: '/images/ingredient-macro.png',
    altText: 'Algal omega raw materials in laboratory glassware',
  },
  images: [
    { url: '/images/ingredient-macro.png', altText: 'Algal omega materials in glass dishes' },
    { url: '/images/science-lab.png', altText: 'Pharmaceutical lab formulating algal omega' },
    { url: '/images/capsules-macro.png', altText: 'Algal Omega softgels in macro' },
  ],
  rating: { value: 4.9, count: 1540 },
  servingsPerContainer: 30,
  variants: [
    {
      id: 'gid://shopify/ProductVariant/31',
      title: 'Subscription',
      sellingPlan: 'subscription',
      price: { usd: 38, try: 1040 },
      compareAtPrice: { usd: 48, try: 1290 },
      availableForSale: true,
    },
    {
      id: 'gid://shopify/ProductVariant/32',
      title: 'One-time',
      sellingPlan: 'onetime',
      price: { usd: 48, try: 1290 },
      compareAtPrice: null,
      availableForSale: true,
    },
  ],
  stackWith: ['daily-foundation', 'sleep-depth'],
  crossSells: [
    {
      handle: 'daily-foundation',
      reason: {
        en: 'Cover micronutrient gaps the omega alone cannot.',
        tr: 'Omega’nın tek başına kapatmadığı mikro besin boşluklarını doldurun.',
      },
    },
    {
      handle: 'sleep-depth',
      reason: {
        en: 'Protect overnight recovery alongside daytime focus.',
        tr: 'Gündüz odakla birlikte gece toparlanmasını koruyun.',
      },
    },
  ],
  relatedHandles: ['daily-foundation', 'sleep-depth', 'essentials-trio'],
}

export const essentialsTrio: Product = {
  id: 'gid://shopify/Product/4',
  handle: 'essentials-trio',
  vendor: 'Vitaself',
  title: { en: 'Essentials Trio', tr: 'Temel Üçlü' },
  subtitle: {
    en: 'Daily Foundation + Sleep Depth + Algal Omega. One protocol.',
    tr: 'Günlük Temel + Uyku Derinliği + Algal Omega. Tek protokol.',
  },
  description: {
    en: 'The complete morning-to-night stack at a curated bundle price. Designed for people who want clinical coverage without managing three separate subscriptions.',
    tr: 'Sabahdan geceye tam protokol, özel set fiyatıyla. Klinik kapsamı üç ayrı abonelik yönetmeden isteyenler için.',
  },
  badge: { en: 'Best value', tr: 'En avantajlı' },
  category: { en: 'Bundles', tr: 'Setler' },
  highlights: [
    { en: 'All three core formulas', tr: 'Üç temel formül bir arada' },
    { en: '15% under separate pricing', tr: 'Ayrı alıma göre %15 avantaj' },
    { en: 'Single monthly delivery', tr: 'Tek aylık teslimat' },
    { en: 'Pause or swap anytime', tr: 'Dilediğiniz zaman durdurun veya değiştirin' },
  ],
  activesCount: 40,
  featuredImage: {
    url: '/images/hero-product.png',
    altText: 'Vitaself essentials collection styled as a complete protocol',
  },
  images: [
    { url: '/images/hero-product.png', altText: 'Essentials Trio hero composition' },
    { url: '/images/product-packshot.png', altText: 'Daily Foundation from the trio' },
    { url: '/images/lifestyle-morning.png', altText: 'Morning ritual with the essentials stack' },
    { url: '/images/science-lab.png', altText: 'Formulas developed in a GMP facility' },
  ],
  rating: { value: 5.0, count: 412 },
  servingsPerContainer: 30,
  variants: [
    {
      id: 'gid://shopify/ProductVariant/41',
      title: 'Subscription',
      sellingPlan: 'subscription',
      price: { usd: 114, try: 3140 },
      compareAtPrice: { usd: 134, try: 3690 },
      availableForSale: true,
    },
    {
      id: 'gid://shopify/ProductVariant/42',
      title: 'One-time',
      sellingPlan: 'onetime',
      price: { usd: 134, try: 3690 },
      compareAtPrice: { usd: 168, try: 4570 },
      availableForSale: true,
    },
  ],
  stackWith: [],
  crossSells: [
    {
      handle: 'daily-foundation',
      reason: {
        en: 'Prefer a single hero formula? Start with Daily Foundation alone.',
        tr: 'Tek bir ana formül mü? Günlük Temel ile başlayın.',
      },
    },
  ],
  relatedHandles: ['daily-foundation', 'sleep-depth', 'algal-omega'],
}

/** Katalogdaki tüm ürünler (vitrin sırası). */
export const products: Product[] = [dailyFoundation, sleepDepth, algalOmega, essentialsTrio]

/** Handle ile ürün bulur; yoksa null döner. */
export function getProduct(handle: string): Product | null {
  return products.find((product) => product.handle === handle) ?? null
}

/** Ürünün ilişkili / cross-sell listesini döner. */
export function getRelatedProducts(product: Product): Product[] {
  return product.relatedHandles
    .map((handle) => getProduct(handle))
    .filter((item): item is Product => Boolean(item))
}

/** Stack / FBT önerisi ürünlerini döner. */
export function getStackProducts(product: Product): Product[] {
  return product.stackWith
    .map((handle) => getProduct(handle))
    .filter((item): item is Product => Boolean(item))
}

export type CrossSellOffer = {
  product: Product
  reason: LocaleCopy
}

/** Cross-sell add-on listesini ürün + neden metniyle döner. */
export function getCrossSellOffers(product: Product): CrossSellOffer[] {
  return product.crossSells
    .map((entry) => {
      const offer = getProduct(entry.handle)
      if (!offer) return null
      return { product: offer, reason: entry.reason }
    })
    .filter((item): item is CrossSellOffer => Boolean(item))
}

/** Abonelik (veya ilk) varyantını seçer. */
export function defaultVariant(product: Product): ProductVariant {
  return product.variants.find((variant) => variant.sellingPlan === 'subscription') ?? product.variants[0]
}

export type ResolvedVariant = {
  product: Product
  variant: ProductVariant
}

/** Variant GID ile ürün + varyant çözümler. */
export function findVariantById(variantId: string): ResolvedVariant | null {
  for (const product of products) {
    const variant = product.variants.find((item) => item.id === variantId)
    if (variant) {
      return { product, variant }
    }
  }
  return null
}

/** Flat shipping ücreti (eşik altı). */
export const FLAT_SHIPPING: Money = { usd: 8, try: 149 }

/** Ücretsiz kargo eşiği (dil bağımsız Money). */
export const FREE_SHIPPING_THRESHOLD: Money = { usd: 60, try: 1500 }

/** Stack için varsayılan indirim yüzdesi. */
export const STACK_DISCOUNT_PERCENT = 12

/** Miktar bazlı indirim yüzdesi (PDP ve sepet ortak). */
export function quantityDiscountPercent(quantity: number): number {
  if (quantity >= 3) return 12
  if (quantity >= 2) return 8
  return 0
}

/** Satır toplamını miktar indirimiyle hesaplar. */
export function lineTotal(price: Money, quantity: number): Money {
  const raw = multiplyMoney(price, quantity)
  const percent = quantityDiscountPercent(quantity)
  return percent > 0 ? discountMoney(raw, percent) : raw
}

/** Sepet satırlarından ara toplam hesaplar (miktar indirimli). */
export function cartSubtotal(lines: { variantId: string; quantity: number }[]): Money {
  return lines.reduce(
    (sum, line) => {
      const resolved = findVariantById(line.variantId)
      if (!resolved) return sum
      return addMoney(sum, lineTotal(resolved.variant.price, line.quantity))
    },
    { usd: 0, try: 0 },
  )
}

/** Ara toplama göre kargo tutarını hesaplar. */
export function shippingForSubtotal(subtotal: Money): Money {
  if (subtotal.usd >= FREE_SHIPPING_THRESHOLD.usd || subtotal.try >= FREE_SHIPPING_THRESHOLD.try) {
    return { usd: 0, try: 0 }
  }
  return FLAT_SHIPPING
}
