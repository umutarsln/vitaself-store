/**
 * Shopify-shaped product catalog.
 *
 * Field names intentionally mirror the Storefront API so this module can later be
 * replaced by a `getProduct(handle)` call without touching any UI component.
 */

export type Money = { usd: number; try: number }

/** Dil bazlı kısa metin (de/ru opsiyonel, yoksa EN). */
export type LocaleCopy = { en: string; tr: string; de?: string; ru?: string }

export type ProductVariant = {
  id: string
  title: string
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
export function copy(text: LocaleCopy, lang: 'en' | 'tr' | 'de' | 'ru'): string {
  if (lang === 'tr') return text.tr
  if (lang === 'de') return text.de ?? text.en
  if (lang === 'ru') return text.ru ?? text.en
  return text.en
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
  title: { en: 'Daily Foundation', tr: 'Günlük Temel', de: 'Daily Foundation', ru: 'Ежедневная основа' },
  subtitle: {
    en: '32 actives. One serving. Full transparency.',
    tr: '32 aktif. Tek servis. Tam şeffaflık.',
    de: '32 Wirkstoffe. Eine Portion. Volle Transparenz.',
    ru: '32 активных компонента. Одна порция. Полная прозрачность.',
  },
  description: {
    en: 'Vitamins, minerals, and adaptogens at doses that reflect published research — not the minimum required to print an ingredient on a label.',
    tr: 'Vitaminler, mineraller ve adaptojenler; etiketde görünmek için gereken en düşük miktarda değil, yayımlanmış araştırmalardaki dozlarda.',
    de: 'Vitamine, Mineralstoffe und Adaptogene in Dosierungen, die publizierte Studien widerspiegeln — nicht das Minimum, um einen Inhaltsstoff auf dem Etikett zu nennen.',
    ru: 'Витамины, минералы и адаптогены в дозировках, основанных на опубликованных исследованиях — а не в минимальных количествах для указания на этикетке.',
  },
  badge: { en: 'Best seller', tr: 'Çok satan', de: 'Bestseller', ru: 'Хит продаж' },
  category: { en: 'Daily essentials', tr: 'Günlük temel', de: 'Tägliche Essentials', ru: 'Ежедневные основы' },
  highlights: [
    {
      en: 'Clinical doses printed in mg',
      tr: 'Klinik dozlar mg olarak yazılı',
      de: 'Klinische Dosierungen in mg angegeben',
      ru: 'Клинические дозы указаны в мг',
    },
    {
      en: 'Methylated B-vitamins',
      tr: 'Metillenmiş B vitaminleri',
      de: 'Methylierte B-Vitamine',
      ru: 'Метилированные витамины группы B',
    },
    {
      en: 'Third-party tested every batch',
      tr: 'Her parti bağımsız test',
      de: 'Jede Charge unabhängig geprüft',
      ru: 'Каждая партия проходит независимую проверку',
    },
    {
      en: 'No proprietary blends',
      tr: 'Gizli karışım yok',
      de: 'Keine proprietären Mischungen',
      ru: 'Без проприетарных смесей',
    },
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
      id: 'gid://shopify/ProductVariant/12',
      title: 'Default',
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
        de: 'Beenden Sie den Tag mit erholsamer Regeneration — ohne Melatonin.',
        ru: 'Завершите день восстановлением без мелатонина.',
      },
    },
    {
      handle: 'algal-omega',
      reason: {
        en: 'Add algal DHA/EPA for cognition and vision.',
        tr: 'Biliş ve görme için algal DHA/EPA ekleyin.',
        de: 'Ergänzen Sie mit algenbasiertem DHA/EPA für Kognition und Sehkraft.',
        ru: 'Добавьте водорослевые DHA/EPA для когнитивных функций и зрения.',
      },
    },
  ],
  relatedHandles: ['sleep-depth', 'algal-omega', 'essentials-trio'],
}

export const sleepDepth: Product = {
  id: 'gid://shopify/Product/2',
  handle: 'sleep-depth',
  vendor: 'Vitaself',
  title: { en: 'Sleep Depth', tr: 'Uyku Derinliği', de: 'Sleep Depth', ru: 'Глубина сна' },
  subtitle: {
    en: 'Magnesium, L-theanine, and apigenin — without melatonin fog.',
    tr: 'Magnezyum, L-teanin ve apigenin — melatonin sisi olmadan.',
    de: 'Magnesium, L-Theanin und Apigenin — ohne Melatonin-Nebel.',
    ru: 'Магний, L-теанин и апigenin — без «тумана» от мелатонина.',
  },
  description: {
    en: 'A night formula built for restorative sleep architecture. Non-habit forming actives at research-backed doses, taken sixty minutes before lights out.',
    tr: 'Onarıcı uyku mimarisi için tasarlanmış gece formülü. Araştırma dozlarında, bağımlılık yapmayan aktifler; ışıklar kapanmadan altmış dakika önce.',
    de: 'Eine Nachtformel für erholsame Schlafarchitektur. Nicht gewohnheitsbildende Wirkstoffe in forschungsbasierten Dosierungen, sechzig Minuten vor dem Licht aus.',
    ru: 'Ночная формула для восстановительной архитектуры сна. Не вызывающие привыкания активные компоненты в дозах, подтверждённых исследованиями; принимать за 60 минут до сна.',
  },
  badge: { en: 'New', tr: 'Yeni', de: 'Neu', ru: 'Новинка' },
  category: { en: 'Recovery', tr: 'Toparlanma', de: 'Regeneration', ru: 'Восстановление' },
  highlights: [
    {
      en: '200 mg magnesium bisglycinate',
      tr: '200 mg magnezyum bisglisinat',
      de: '200 mg Magnesiumbisglycinat',
      ru: '200 мг бисглицината магния',
    },
    {
      en: '200 mg L-theanine',
      tr: '200 mg L-teanin',
      de: '200 mg L-Theanin',
      ru: '200 мг L-теанина',
    },
    {
      en: 'No melatonin, no next-day fog',
      tr: 'Melatonin yok, ertesi gün sisi yok',
      de: 'Kein Melatonin, kein Nebel am nächsten Tag',
      ru: 'Без мелатонина, без «тумана» на следующий день',
    },
    {
      en: 'Taken 60 minutes before bed',
      tr: 'Yatmadan 60 dakika önce',
      de: '60 Minuten vor dem Schlafengehen',
      ru: 'За 60 минут до сна',
    },
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
      id: 'gid://shopify/ProductVariant/22',
      title: 'Default',
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
        de: 'Verankern Sie den Morgen mit der vollständigen Tagesformel.',
        ru: 'Начните утро с полной дневной формулы.',
      },
    },
    {
      handle: 'algal-omega',
      reason: {
        en: 'Support cellular recovery with clean omega-3.',
        tr: 'Hücresel toparlanmayı temiz omega-3 ile destekleyin.',
        de: 'Unterstützen Sie die zelluläre Regeneration mit reinem Omega-3.',
        ru: 'Поддержите клеточное восстановление чистым омега-3.',
      },
    },
  ],
  relatedHandles: ['daily-foundation', 'algal-omega', 'essentials-trio'],
}

export const algalOmega: Product = {
  id: 'gid://shopify/Product/3',
  handle: 'algal-omega',
  vendor: 'Vitaself',
  title: { en: 'Algal Omega', tr: 'Algal Omega', de: 'Algal Omega', ru: 'Algal Omega' },
  subtitle: {
    en: 'Plant-based DHA & EPA. No fish. No aftertaste.',
    tr: 'Bitkisel DHA ve EPA. Balık yok. Tat yok.',
    de: 'Pflanzliches DHA & EPA. Kein Fisch. Kein Nachgeschmack.',
    ru: 'Растительные DHA и EPA. Без рыбы. Без послевкусия.',
  },
  description: {
    en: 'Algal-sourced omega-3 for cognition, vision, and cellular inflammation — without the marine supply chain. Third-party tested for oxidation and heavy metals.',
    tr: 'Biliş, görme ve hücresel inflamasyon için alg kaynaklı omega-3 — deniz ürünleri tedarik zinciri olmadan. Oksidasyon ve ağır metal için bağımsız test.',
    de: 'Algenbasiertes Omega-3 für Kognition, Sehkraft und zelluläre Entzündung — ohne die marine Lieferkette. Unabhängig auf Oxidation und Schwermetalle geprüft.',
    ru: 'Омега-3 из водорослей для когнитивных функций, зрения и клеточного воспаления — без морской цепочки поставок. Независимая проверка на окисление и тяжёлые металлы.',
  },
  category: {
    en: 'Cognitive support',
    tr: 'Bilişsel destek',
    de: 'Kognitive Unterstützung',
    ru: 'Когнитивная поддержка',
  },
  highlights: [
    {
      en: '500 mg DHA + 250 mg EPA',
      tr: '500 mg DHA + 250 mg EPA',
      de: '500 mg DHA + 250 mg EPA',
      ru: '500 мг DHA + 250 мг EPA',
    },
    {
      en: 'Algal, not fish oil',
      tr: 'Alg kaynaklı, balık yağı değil',
      de: 'Aus Algen, nicht Fischöl',
      ru: 'Из водорослей, не рыбий жир',
    },
    {
      en: 'Oxidation-tested every batch',
      tr: 'Her parti oksidasyon testi',
      de: 'Oxidationsprüfung jeder Charge',
      ru: 'Проверка на окисление каждой партии',
    },
    {
      en: 'Softgel, no aftertaste',
      tr: 'Yumuşak kapsül, sonradan tat yok',
      de: 'Weichkapsel, kein Nachgeschmack',
      ru: 'Мягкая капсула, без послевкусия',
    },
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
      id: 'gid://shopify/ProductVariant/32',
      title: 'Default',
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
        de: 'Schließen Sie Mikronährstofflücken, die Omega-3 allein nicht deckt.',
        ru: 'Закройте пробелы в микроэлементах, которые омега-3 не покрывает.',
      },
    },
    {
      handle: 'sleep-depth',
      reason: {
        en: 'Protect overnight recovery alongside daytime focus.',
        tr: 'Gündüz odakla birlikte gece toparlanmasını koruyun.',
        de: 'Schützen Sie die nächtliche Regeneration neben der Tageskonzentration.',
        ru: 'Защитите ночное восстановление вместе с дневной концентрацией.',
      },
    },
  ],
  relatedHandles: ['daily-foundation', 'sleep-depth', 'essentials-trio'],
}

export const essentialsTrio: Product = {
  id: 'gid://shopify/Product/4',
  handle: 'essentials-trio',
  vendor: 'Vitaself',
  title: { en: 'Essentials Trio', tr: 'Temel Üçlü', de: 'Essentials Trio', ru: 'Базовый трио' },
  subtitle: {
    en: 'Daily Foundation + Sleep Depth + Algal Omega. One protocol.',
    tr: 'Günlük Temel + Uyku Derinliği + Algal Omega. Tek protokol.',
    de: 'Daily Foundation + Sleep Depth + Algal Omega. Ein Protokoll.',
    ru: 'Daily Foundation + Sleep Depth + Algal Omega. Один протокол.',
  },
  description: {
    en: 'The complete morning-to-night stack at a curated bundle price. Designed for people who want clinical coverage without juggling three separate orders.',
    tr: 'Sabahdan geceye tam protokol, özel set fiyatıyla. Klinik kapsamı üç ayrı sipariş yönetmeden isteyenler için.',
    de: 'Der komplette Stack von morgens bis nachts zum kuratierten Bundle-Preis. Für alle, die klinische Abdeckung wollen, ohne drei separate Bestellungen zu verwalten.',
    ru: 'Полный протокол от утра до вечера по специальной цене набора. Для тех, кто хочет клиническое покрытие без управления тремя отдельными заказами.',
  },
  badge: { en: 'Best value', tr: 'En avantajlı', de: 'Bestes Preis-Leistungs-Verhältnis', ru: 'Лучшее предложение' },
  category: { en: 'Bundles', tr: 'Setler', de: 'Bundles', ru: 'Наборы' },
  highlights: [
    {
      en: 'All three core formulas',
      tr: 'Üç temel formül bir arada',
      de: 'Alle drei Kernformeln',
      ru: 'Все три основные формулы',
    },
    {
      en: '15% under separate pricing',
      tr: 'Ayrı alıma göre %15 avantaj',
      de: '15 % günstiger als Einzelkauf',
      ru: 'На 15 % выгоднее отдельной покупки',
    },
    {
      en: 'One coordinated protocol',
      tr: 'Tek koordineli protokol',
      de: 'Ein koordiniertes Protokoll',
      ru: 'Единый скоординированный протокол',
    },
    {
      en: 'Ships in one delivery',
      tr: 'Tek seferde teslim',
      de: 'Versand in einer Lieferung',
      ru: 'Доставка одним отправлением',
    },
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
      id: 'gid://shopify/ProductVariant/42',
      title: 'Default',
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
        de: 'Lieber eine einzelne Hauptformel? Starten Sie mit Daily Foundation allein.',
        ru: 'Предпочитаете одну основную формулу? Начните с Daily Foundation.',
      },
    },
  ],
  relatedHandles: ['daily-foundation', 'sleep-depth', 'algal-omega'],
}

export const magnesium: Product = {
  id: 'gid://shopify/Product/5',
  handle: 'magnesium',
  vendor: 'Vitaself',
  title: { en: 'Magnesium', tr: 'Magnezyum', de: 'Magnesium', ru: 'Магний' },
  subtitle: {
    en: '300 mg magnesium bisglycinate. High absorption, no bloating.',
    tr: '300 mg magnezyum bisglisinat. Yüksek emilim, şişkinlik yapmaz.',
    de: '300 mg Magnesiumbisglycinat. Hohe Bioverfügbarkeit, ohne Blähungen.',
    ru: '300 мг бисглицината магния. Высокая усвояемость, без вздутия.',
  },
  description: {
    en: 'A fully chelated magnesium bisglycinate formula dosed at levels shown to support muscle relaxation, nerve function, and sleep quality — without the digestive upset common to cheaper magnesium oxide.',
    tr: 'Kas gevşemesi, sinir fonksiyonu ve uyku kalitesini desteklediği gösterilen dozlarda, tam şelatlı magnezyum bisglisinat formülü — daha ucuz magnezyum oksitte sık görülen sindirim rahatsızlığı olmadan.',
    de: 'Eine vollständig chelatierte Magnesiumbisglycinat-Formel in Dosierungen, die Muskelentspannung, Nervenfunktion und Schlafqualität unterstützen — ohne die Verdauungsbeschwerden, die bei günstigerem Magnesiumoxid häufig auftreten.',
    ru: 'Полностью хелатированная формула бисглицината магния в дозировках, поддерживающих расслабление мышц, работу нервной системы и качество сна — без расстройства пищеварения, характерного для более дешёвого оксида магния.',
  },
  badge: { en: 'New', tr: 'Yeni', de: 'Neu', ru: 'Новинка' },
  category: { en: 'Minerals', tr: 'Mineraller', de: 'Mineralstoffe', ru: 'Минералы' },
  highlights: [
    {
      en: '300 mg elemental magnesium bisglycinate',
      tr: '300 mg elemental magnezyum bisglisinat',
      de: '300 mg elementares Magnesiumbisglycinat',
      ru: '300 мг элементарного магния в форме бисглицината',
    },
    {
      en: 'Chelated for maximum absorption',
      tr: 'Maksimum emilim için şelatlı',
      de: 'Chelatiert für maximale Aufnahme',
      ru: 'Хелатная форма для максимального усвоения',
    },
    {
      en: 'Gentle on digestion, no laxative effect',
      tr: 'Mideye nazik, laksatif etkisi yok',
      de: 'Magenschonend, keine abführende Wirkung',
      ru: 'Мягкое действие на пищеварение, без слабительного эффекта',
    },
    {
      en: 'Supports muscle, nerve, and sleep quality',
      tr: 'Kas, sinir ve uyku kalitesini destekler',
      de: 'Unterstützt Muskeln, Nerven und Schlafqualität',
      ru: 'Поддерживает мышцы, нервную систему и качество сна',
    },
  ],
  activesCount: 1,
  featuredImage: {
    url: '/images/packshot-magnesium.png',
    altText: 'Vitaself Magnesium bottle with a sage-green cap on an ivory background',
  },
  images: [
    { url: '/images/packshot-magnesium.png', altText: 'Vitaself Magnesium bottle' },
    { url: '/images/capsules-macro.png', altText: 'Magnesium capsules photographed in macro' },
    { url: '/images/ingredient-macro.png', altText: 'Raw magnesium ingredients in glass dishes' },
  ],
  rating: { value: 4.8, count: 612 },
  servingsPerContainer: 30,
  variants: [
    {
      id: 'gid://shopify/ProductVariant/52',
      title: 'Default',
      price: { usd: 29, try: 790 },
      compareAtPrice: null,
      availableForSale: true,
    },
  ],
  stackWith: ['sleep-depth', 'daily-foundation'],
  crossSells: [
    {
      handle: 'sleep-depth',
      reason: {
        en: 'Pair with L-theanine and apigenin for deeper sleep.',
        tr: 'Daha derin uyku için L-teanin ve apigenin ile eşleyin.',
        de: 'Kombinieren Sie mit L-Theanin und Apigenin für tieferen Schlaf.',
        ru: 'Сочетайте с L-теанином и апигенином для более глубокого сна.',
      },
    },
    {
      handle: 'daily-foundation',
      reason: {
        en: 'Cover the rest of your micronutrient baseline.',
        tr: 'Mikro besin ihtiyacınızın kalanını tamamlayın.',
        de: 'Decken Sie den Rest Ihrer Mikronährstoffgrundlage ab.',
        ru: 'Закройте остальные потребности в микроэлементах.',
      },
    },
  ],
  relatedHandles: ['sleep-depth', 'daily-foundation', 'glucosamine-complex'],
}

export const omega3: Product = {
  id: 'gid://shopify/Product/6',
  handle: 'omega-3',
  vendor: 'Vitaself',
  title: { en: 'Omega-3', tr: 'Omega-3 Balık Yağı', de: 'Omega-3 Fischöl', ru: 'Омега-3 рыбий жир' },
  subtitle: {
    en: '1,000 mg triple-strength fish oil. EPA-forward, molecularly distilled.',
    tr: '1.000 mg üçlü güç balık yağı. EPA ağırlıklı, moleküler distilasyon.',
    de: '1.000 mg dreifach konzentriertes Fischöl. EPA-betont, molekular destilliert.',
    ru: '1000 мг рыбьего жира тройной концентрации. С акцентом на EPA, молекулярная дистилляция.',
  },
  description: {
    en: 'Marine-sourced omega-3 concentrated for EPA — the fatty acid most linked to cardiovascular and joint comfort. Molecularly distilled and third-party tested for oxidation, PCBs, and heavy metals, batch by batch.',
    tr: 'Kalp-damar ve eklem konforuyla en çok ilişkilendirilen yağ asidi EPA açısından yoğunlaştırılmış, deniz kaynaklı omega-3. Moleküler distilasyonla saflaştırılır, her parti oksidasyon, PCB ve ağır metal için bağımsız test edilir.',
    de: 'Marines Omega-3, konzentriert auf EPA — die Fettsäure, die am stärksten mit kardiovaskulärer und Gelenkgesundheit in Verbindung gebracht wird. Molekular destilliert und Charge für Charge unabhängig auf Oxidation, PCB und Schwermetalle geprüft.',
    ru: 'Омега-3 морского происхождения, концентрированный по EPA — жирной кислоте, наиболее связанной со здоровьем сердечно-сосудистой системы и суставов. Молекулярная дистилляция, независимая проверка каждой партии на окисление, ПХБ и тяжёлые металлы.',
  },
  badge: { en: 'New', tr: 'Yeni', de: 'Neu', ru: 'Новинка' },
  category: { en: 'Heart & joints', tr: 'Kalp ve eklem', de: 'Herz & Gelenke', ru: 'Сердце и суставы' },
  highlights: [
    {
      en: '650 mg EPA + 250 mg DHA per serving',
      tr: 'Serviste 650 mg EPA + 250 mg DHA',
      de: '650 mg EPA + 250 mg DHA pro Portion',
      ru: '650 мг EPA + 250 мг DHA на порцию',
    },
    {
      en: 'Molecularly distilled, low oxidation (TOTOX)',
      tr: 'Moleküler distile, düşük oksidasyon (TOTOX)',
      de: 'Molekular destilliert, niedriger Oxidationswert (TOTOX)',
      ru: 'Молекулярная дистилляция, низкий уровень окисления (TOTOX)',
    },
    {
      en: 'No fishy aftertaste, enteric softgel',
      tr: 'Balık tadı yok, enterik yumuşak kapsül',
      de: 'Kein Fischgeschmack, magensaftresistente Weichkapsel',
      ru: 'Без рыбного привкуса, кишечнорастворимая капсула',
    },
    {
      en: 'Tested for heavy metals every batch',
      tr: 'Her parti ağır metal testli',
      de: 'Jede Charge auf Schwermetalle geprüft',
      ru: 'Каждая партия проверяется на тяжёлые металлы',
    },
  ],
  activesCount: 2,
  featuredImage: {
    url: '/images/packshot-omega3.png',
    altText: 'Vitaself Omega-3 bottle with an amber-gold cap on an ivory background',
  },
  images: [
    { url: '/images/packshot-omega3.png', altText: 'Vitaself Omega-3 bottle' },
    { url: '/images/capsules-macro.png', altText: 'Omega-3 softgels photographed in macro' },
    { url: '/images/ingredient-macro.png', altText: 'Raw omega-3 ingredients in glass dishes' },
  ],
  rating: { value: 4.7, count: 489 },
  servingsPerContainer: 30,
  variants: [
    {
      id: 'gid://shopify/ProductVariant/62',
      title: 'Default',
      price: { usd: 34, try: 940 },
      compareAtPrice: null,
      availableForSale: true,
    },
  ],
  stackWith: ['daily-foundation', 'glucosamine-complex'],
  crossSells: [
    {
      handle: 'daily-foundation',
      reason: {
        en: 'Cover micronutrient gaps the omega alone cannot.',
        tr: 'Omega’nın tek başına kapatmadığı mikro besin boşluklarını doldurun.',
        de: 'Schließen Sie Mikronährstofflücken, die Omega-3 allein nicht deckt.',
        ru: 'Закройте пробелы в микроэлементах, которые омега-3 не покрывает.',
      },
    },
    {
      handle: 'glucosamine-complex',
      reason: {
        en: 'Combine with glucosamine for full joint-comfort coverage.',
        tr: 'Tam eklem konforu için glikozamin ile birleştirin.',
        de: 'Kombinieren Sie mit Glucosamin für vollständigen Gelenkkomfort.',
        ru: 'Сочетайте с глюкозамином для полной поддержки суставов.',
      },
    },
  ],
  relatedHandles: ['algal-omega', 'daily-foundation', 'glucosamine-complex'],
}

export const multivitaminMen: Product = {
  id: 'gid://shopify/Product/7',
  handle: 'multivitamin-men',
  vendor: 'Vitaself',
  title: {
    en: 'Multivitamin for Men',
    tr: 'Erkekler için Multivitamin',
    de: 'Multivitamin für Männer',
    ru: 'Мультивитамины для мужчин',
  },
  subtitle: {
    en: 'Iron-free daily formula for energy, immunity, and prostate support.',
    tr: 'Enerji, bağışıklık ve prostat desteği için demirsiz günlük formül.',
    de: 'Eisenfreie Tagesformel für Energie, Immunität und Prostata-Unterstützung.',
    ru: 'Ежедневная формула без железа для энергии, иммунитета и поддержки простаты.',
  },
  description: {
    en: "Built specifically for men's physiology: zinc and selenium at doses linked to prostate and reproductive health, B-vitamins for energy metabolism, and vitamin D3 + K2 for bone and cardiovascular support — with no added iron most men don't need.",
    tr: 'Erkek fizyolojisine özel tasarlandı: prostat ve üreme sağlığıyla ilişkilendirilen dozlarda çinko ve selenyum, enerji metabolizması için B vitaminleri, kemik ve kalp-damar desteği için D3 + K2 vitamini — çoğu erkeğin gerek duymadığı ilave demir yok.',
    de: 'Speziell für die männliche Physiologie entwickelt: Zink und Selen in Dosierungen, die mit Prostata- und Reproduktionsgesundheit in Verbindung gebracht werden, B-Vitamine für den Energiestoffwechsel und Vitamin D3 + K2 für Knochen- und Herz-Kreislauf-Unterstützung — ohne zusätzliches Eisen, das die meisten Männer nicht benötigen.',
    ru: 'Разработан специально для мужской физиологии: цинк и селен в дозах, связанных со здоровьем простаты и репродуктивной системы, витамины группы B для энергетического обмена, витамины D3 + K2 для костей и сердечно-сосудистой поддержки — без добавленного железа, которое большинству мужчин не требуется.',
  },
  badge: { en: 'New', tr: 'Yeni', de: 'Neu', ru: 'Новинка' },
  category: { en: "Men's health", tr: 'Erkek sağlığı', de: 'Männergesundheit', ru: 'Мужское здоровье' },
  highlights: [
    {
      en: '15 mg zinc + 200 mcg selenium for prostate support',
      tr: 'Prostat desteği için 15 mg çinko + 200 mcg selenyum',
      de: '15 mg Zink + 200 µg Selen zur Prostata-Unterstützung',
      ru: '15 мг цинка + 200 мкг селена для поддержки простаты',
    },
    {
      en: 'Iron-free formula',
      tr: 'Demirsiz formül',
      de: 'Eisenfreie Formel',
      ru: 'Формула без железа',
    },
    {
      en: '2000 IU D3 + 90 mcg K2 for bone & heart',
      tr: 'Kemik ve kalp için 2000 IU D3 + 90 mcg K2',
      de: '2000 IE D3 + 90 µg K2 für Knochen & Herz',
      ru: '2000 МЕ D3 + 90 мкг K2 для костей и сердца',
    },
    {
      en: 'Methylated B-complex for energy',
      tr: 'Enerji için metillenmiş B kompleks',
      de: 'Methylierter B-Komplex für Energie',
      ru: 'Метилированный B-комплекс для энергии',
    },
  ],
  activesCount: 18,
  featuredImage: {
    url: '/images/packshot-multivitamin-men.png',
    altText: 'Vitaself Multivitamin for Men bottle with a slate-blue cap on an ivory background',
  },
  images: [
    { url: '/images/packshot-multivitamin-men.png', altText: 'Vitaself Multivitamin for Men bottle' },
    { url: '/images/capsules-macro.png', altText: "Men's multivitamin tablets photographed in macro" },
    { url: '/images/ingredient-macro.png', altText: 'Raw multivitamin ingredients in glass dishes' },
  ],
  rating: { value: 4.8, count: 734 },
  servingsPerContainer: 30,
  variants: [
    {
      id: 'gid://shopify/ProductVariant/72',
      title: 'Default',
      price: { usd: 39, try: 1080 },
      compareAtPrice: null,
      availableForSale: true,
    },
  ],
  stackWith: ['algal-omega', 'magnesium'],
  crossSells: [
    {
      handle: 'algal-omega',
      reason: {
        en: 'Add omega-3 for cognition and cardiovascular support.',
        tr: 'Biliş ve kalp-damar desteği için omega-3 ekleyin.',
        de: 'Ergänzen Sie mit Omega-3 für Kognition und Herz-Kreislauf-Unterstützung.',
        ru: 'Добавьте омега-3 для когнитивной и сердечно-сосудистой поддержки.',
      },
    },
    {
      handle: 'magnesium',
      reason: {
        en: 'Support recovery and sleep after training.',
        tr: 'Antrenman sonrası toparlanma ve uykuyu destekleyin.',
        de: 'Unterstützen Sie Erholung und Schlaf nach dem Training.',
        ru: 'Поддержите восстановление и сон после тренировок.',
      },
    },
  ],
  relatedHandles: ['multivitamin-women', 'daily-foundation', 'magnesium'],
}

export const multivitaminWomen: Product = {
  id: 'gid://shopify/Product/8',
  handle: 'multivitamin-women',
  vendor: 'Vitaself',
  title: {
    en: 'Multivitamin for Women',
    tr: 'Kadınlar için Multivitamin',
    de: 'Multivitamin für Frauen',
    ru: 'Мультивитамины для женщин',
  },
  subtitle: {
    en: 'Iron, folate, and biotin at clinical doses for energy, hair, and hormonal balance.',
    tr: 'Enerji, saç ve hormonal denge için klinik dozlarda demir, folat ve biotin.',
    de: 'Eisen, Folat und Biotin in klinischen Dosierungen für Energie, Haare und hormonelles Gleichgewicht.',
    ru: 'Железо, фолат и биотин в клинических дозах для энергии, волос и гормонального баланса.',
  },
  description: {
    en: 'Formulated around the nutrients women are most commonly deficient in: bioavailable iron bisglycinate, methylfolate, biotin, and calcium — plus vitamin D3 and magnesium for cycle-related comfort.',
    tr: 'Kadınlarda en sık eksikliği görülen besinler etrafında formüle edildi: biyoyararlanımı yüksek demir bisglisinat, metilfolat, biotin ve kalsiyum — döngü konforu için D3 vitamini ve magnezyum ile.',
    de: 'Formuliert rund um die Nährstoffe, an denen es Frauen am häufigsten mangelt: bioverfügbares Eisenbisglycinat, Methylfolat, Biotin und Calcium — plus Vitamin D3 und Magnesium für zyklusbedingten Komfort.',
    ru: 'Разработан с учётом питательных веществ, дефицит которых у женщин встречается чаще всего: биодоступный бисглицинат железа, метилфолат, биотин и кальций — а также витамин D3 и магний для комфорта в течение цикла.',
  },
  badge: { en: 'New', tr: 'Yeni', de: 'Neu', ru: 'Новинка' },
  category: { en: "Women's health", tr: 'Kadın sağlığı', de: 'Frauengesundheit', ru: 'Женское здоровье' },
  highlights: [
    {
      en: '18 mg iron bisglycinate, gentle on the stomach',
      tr: 'Mideye nazik 18 mg demir bisglisinat',
      de: '18 mg Eisenbisglycinat, magenschonend',
      ru: '18 мг бисглицината железа, мягкое действие на желудок',
    },
    {
      en: '400 mcg methylfolate + 5000 mcg biotin',
      tr: '400 mcg metilfolat + 5000 mcg biotin',
      de: '400 µg Methylfolat + 5000 µg Biotin',
      ru: '400 мкг метилфолата + 5000 мкг биотина',
    },
    {
      en: 'Calcium + D3 for bone density',
      tr: 'Kemik yoğunluğu için kalsiyum + D3',
      de: 'Calcium + D3 für die Knochendichte',
      ru: 'Кальций + D3 для плотности костей',
    },
    {
      en: 'Magnesium for cycle-related comfort',
      tr: 'Döngü konforu için magnezyum',
      de: 'Magnesium für zyklusbedingten Komfort',
      ru: 'Магний для комфорта в течение цикла',
    },
  ],
  activesCount: 20,
  featuredImage: {
    url: '/images/packshot-multivitamin-women.png',
    altText: 'Vitaself Multivitamin for Women bottle with a dusty-rose cap on an ivory background',
  },
  images: [
    { url: '/images/packshot-multivitamin-women.png', altText: 'Vitaself Multivitamin for Women bottle' },
    { url: '/images/capsules-macro.png', altText: "Women's multivitamin tablets photographed in macro" },
    { url: '/images/ingredient-macro.png', altText: 'Raw multivitamin ingredients in glass dishes' },
  ],
  rating: { value: 4.9, count: 891 },
  servingsPerContainer: 30,
  variants: [
    {
      id: 'gid://shopify/ProductVariant/82',
      title: 'Default',
      price: { usd: 39, try: 1080 },
      compareAtPrice: null,
      availableForSale: true,
    },
  ],
  stackWith: ['algal-omega', 'magnesium'],
  crossSells: [
    {
      handle: 'algal-omega',
      reason: {
        en: 'Add omega-3 for cognition and skin support.',
        tr: 'Biliş ve cilt desteği için omega-3 ekleyin.',
        de: 'Ergänzen Sie mit Omega-3 für Kognition und Hautgesundheit.',
        ru: 'Добавьте омега-3 для когнитивной поддержки и здоровья кожи.',
      },
    },
    {
      handle: 'magnesium',
      reason: {
        en: 'Ease cycle-related tension and support sleep.',
        tr: 'Döngü kaynaklı gerginliği azaltın ve uykuyu destekleyin.',
        de: 'Lindern Sie zyklusbedingte Verspannungen und unterstützen Sie den Schlaf.',
        ru: 'Уменьшите напряжение в цикле и поддержите сон.',
      },
    },
  ],
  relatedHandles: ['multivitamin-men', 'daily-foundation', 'magnesium'],
}

export const glucosamineComplex: Product = {
  id: 'gid://shopify/Product/9',
  handle: 'glucosamine-complex',
  vendor: 'Vitaself',
  title: {
    en: 'Glucosamine Complex',
    tr: 'Glikozamin Kompleks',
    de: 'Glucosamin-Komplex',
    ru: 'Комплекс с глюкозамином',
  },
  subtitle: {
    en: 'Glucosamine, chondroitin, and MSM at doses used in joint-comfort trials.',
    tr: 'Eklem konforu çalışmalarında kullanılan dozlarda glikozamin, kondroitin ve MSM.',
    de: 'Glucosamin, Chondroitin und MSM in Dosierungen aus Studien zum Gelenkkomfort.',
    ru: 'Глюкозамин, хондроитин и МСМ в дозах, использованных в исследованиях комфорта суставов.',
  },
  description: {
    en: 'A joint-support complex combining glucosamine sulfate, chondroitin sulfate, and MSM at the combined dose most frequently studied for cartilage comfort and mobility — for people who train hard or simply want to move without stiffness.',
    tr: 'Kıkırdak konforu ve hareketlilik için en sık çalışılan kombine dozda glikozamin sülfat, kondroitin sülfat ve MSM içeren eklem destek kompleksi — yoğun antrenman yapanlar veya sadece sertlik hissetmeden hareket etmek isteyenler için.',
    de: 'Ein Gelenkkomplex, der Glucosaminsulfat, Chondroitinsulfat und MSM in der am häufigsten untersuchten Kombinationsdosis für Knorpelkomfort und Beweglichkeit vereint — für alle, die hart trainieren oder sich einfach ohne Steifheit bewegen möchten.',
    ru: 'Комплекс для поддержки суставов, объединяющий сульфат глюкозамина, сульфат хондроитина и МСМ в наиболее изученной комбинированной дозе для комфорта хрящевой ткани и подвижности — для тех, кто интенсивно тренируется или просто хочет двигаться без скованности.',
  },
  badge: { en: 'New', tr: 'Yeni', de: 'Neu', ru: 'Новинка' },
  category: { en: 'Joint health', tr: 'Eklem sağlığı', de: 'Gelenkgesundheit', ru: 'Здоровье суставов' },
  highlights: [
    {
      en: '1500 mg glucosamine sulfate',
      tr: '1500 mg glikozamin sülfat',
      de: '1500 mg Glucosaminsulfat',
      ru: '1500 мг сульфата глюкозамина',
    },
    {
      en: '1200 mg chondroitin sulfate',
      tr: '1200 mg kondroitin sülfat',
      de: '1200 mg Chondroitinsulfat',
      ru: '1200 мг сульфата хондроитина',
    },
    {
      en: '500 mg MSM for flexibility',
      tr: 'Esneklik için 500 mg MSM',
      de: '500 mg MSM für Flexibilität',
      ru: '500 мг МСМ для гибкости',
    },
    {
      en: 'Shellfish-free, lab-verified purity',
      tr: 'Kabuklu deniz ürünü içermez, laboratuvar onaylı saflık',
      de: 'Schalentierfrei, laborgeprüfte Reinheit',
      ru: 'Без ракообразных, лабораторно подтверждённая чистота',
    },
  ],
  activesCount: 3,
  featuredImage: {
    url: '/images/packshot-glucosamine.png',
    altText: 'Vitaself Glucosamine Complex bottle with a terracotta cap on an ivory background',
  },
  images: [
    { url: '/images/packshot-glucosamine.png', altText: 'Vitaself Glucosamine Complex bottle' },
    { url: '/images/capsules-macro.png', altText: 'Glucosamine complex tablets photographed in macro' },
    { url: '/images/ingredient-macro.png', altText: 'Raw glucosamine complex ingredients in glass dishes' },
  ],
  rating: { value: 4.7, count: 356 },
  servingsPerContainer: 30,
  variants: [
    {
      id: 'gid://shopify/ProductVariant/92',
      title: 'Default',
      price: { usd: 36, try: 990 },
      compareAtPrice: null,
      availableForSale: true,
    },
  ],
  stackWith: ['omega-3', 'daily-foundation'],
  crossSells: [
    {
      handle: 'omega-3',
      reason: {
        en: 'Combine with omega-3 for full joint-comfort coverage.',
        tr: 'Tam eklem konforu için omega-3 ile birleştirin.',
        de: 'Kombinieren Sie mit Omega-3 für vollständigen Gelenkkomfort.',
        ru: 'Сочетайте с омега-3 для полной поддержки суставов.',
      },
    },
    {
      handle: 'daily-foundation',
      reason: {
        en: 'Cover the rest of your micronutrient baseline.',
        tr: 'Mikro besin ihtiyacınızın kalanını tamamlayın.',
        de: 'Decken Sie den Rest Ihrer Mikronährstoffgrundlage ab.',
        ru: 'Закройте остальные потребности в микроэлементах.',
      },
    },
  ],
  relatedHandles: ['omega-3', 'daily-foundation', 'magnesium'],
}

/** Katalogdaki tüm ürünler (vitrin sırası). */
export const products: Product[] = [
  dailyFoundation,
  sleepDepth,
  algalOmega,
  magnesium,
  omega3,
  multivitaminMen,
  multivitaminWomen,
  glucosamineComplex,
  essentialsTrio,
]

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

/** Ürünün varsayılan (tek) varyantını döndürür. */
export function defaultVariant(product: Product): ProductVariant {
  return product.variants[0]
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
