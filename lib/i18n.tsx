'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

export const en = {
  locale: 'en-US',
  currency: 'usd',
  announce: 'Third-party tested · Free shipping over $60 · 60-day guarantee',
  nav: {
    shop: 'Shop',
    science: 'Science',
    ingredients: 'Ingredients',
    reviews: 'Reviews',
    about: 'About',
    cart: 'Cart',
    account: 'Account',
    search: 'Search',
    menu: 'Menu',
    close: 'Close',
  },
  hero: {
    eyebrow: 'Daily Foundation · 01',
    title: 'The daily one.',
    titleAccent: 'Nothing hidden.',
    body: 'A single clinically dosed formula that replaces the shelf. Developed in our Istanbul laboratory, tested by three independent labs.',
    cta: 'Shop Daily Foundation',
    ctaSecondary: 'See the formula',
    marks: ['Clinically dosed', 'Third-party tested', 'No fillers', 'Made in Türkiye'],
  },
  featured: {
    eyebrow: 'Featured',
    title: 'Daily Foundation',
    subtitle: '32 actives. One serving. Full transparency.',
    body: 'Vitamins, minerals, and adaptogens at doses that reflect published research — not the minimum required to print an ingredient on a label.',
    options: {
      title: 'Choose your rhythm',
      subscribe: 'Subscribe & save',
      subscribeNote: 'Delivered every 30 days. Pause or cancel anytime.',
      once: 'One-time purchase',
      onceNote: 'A single 30-day supply.',
      save: 'Save 20%',
    },
    add: 'Add to cart',
    perDay: 'per day',
    supply: '30-day supply',
    trust: ['Free shipping', '60-day guarantee', 'Ships in 24h'],
  },
  benefits: {
    eyebrow: 'Why Vitaself',
    title: 'Built the way a pharmacy would build it.',
    items: [
      {
        title: 'Clinical doses',
        body: 'Every active is included at the amount studied in peer-reviewed research, printed in milligrams on the front of the label.',
      },
      {
        title: 'Absorption first',
        body: 'Methylated folate, chelated minerals, and liposomal delivery — forms your body can actually use.',
      },
      {
        title: 'Three independent labs',
        body: 'Every batch is tested for identity, potency, and heavy metals. Results are published with the batch number.',
      },
      {
        title: 'Nothing else',
        body: 'No artificial colours, no proprietary blends, no titanium dioxide, no unnecessary excipients.',
      },
    ],
  },
  ingredients: {
    eyebrow: 'Ingredients',
    title: 'Everything inside. Nothing behind a blend.',
    body: 'Twelve of the thirty-two actives shown below. The complete panel, with sourcing origin and assay method, ships in the box.',
    items: [
      { name: 'Vitamin D3', dose: '2000 IU', note: 'Immune & bone signalling' },
      { name: 'Magnesium Bisglycinate', dose: '200 mg', note: 'Sleep quality & muscle recovery' },
      { name: 'Methylfolate', dose: '400 mcg', note: 'Bioactive B9, no conversion needed' },
      { name: 'Omega-3 DHA', dose: '500 mg', note: 'Algal, cognition & vision' },
      { name: 'Zinc Picolinate', dose: '15 mg', note: 'Immune defence & skin' },
      { name: 'Ashwagandha KSM-66', dose: '600 mg', note: 'Cortisol regulation' },
    ],
    cta: 'Download the full panel',
  },
  science: {
    eyebrow: 'The Science',
    title: 'Formulated in a pharmaceutical facility, not a warehouse.',
    body: 'Vitaself is developed inside a GMP-certified pharmaceutical plant in Istanbul. The same room, the same tolerances, and the same documentation used for prescription medicine.',
    stats: [
      { value: '32', label: 'Active compounds' },
      { value: '3', label: 'Independent labs per batch' },
      { value: '0.4%', label: 'Dose deviation tolerance' },
      { value: '148', label: 'Studies referenced' },
    ],
    cta: 'Read the white paper',
  },
  lifestyle: {
    eyebrow: 'The Protocol',
    title: 'Two capsules. Morning light. Water.',
    steps: [
      {
        step: '01',
        title: 'Morning',
        body: 'Take two capsules with your first meal. Fat-soluble vitamins absorb best alongside food.',
      },
      {
        step: '02',
        title: 'Consistency',
        body: 'Serum levels stabilise around week three. The formula is designed for daily, long-term use.',
      },
      {
        step: '03',
        title: 'Review',
        body: 'Retest your bloodwork at ninety days. We send a reminder and a panel checklist.',
      },
    ],
  },
  comparison: {
    eyebrow: 'Comparison',
    title: 'What you are actually comparing.',
    columns: { us: 'Vitaself', them: 'Typical multivitamin' },
    rows: [
      { label: 'Doses printed in mg', us: 'Always', them: 'Proprietary blend' },
      { label: 'Bioavailable forms', us: 'All 32 actives', them: 'Cheapest available' },
      { label: 'Third-party testing', us: 'Every batch, published', them: 'Occasional, private' },
      { label: 'Heavy metal screening', us: 'Four metals, per batch', them: 'Not disclosed' },
      { label: 'Artificial additives', us: 'None', them: 'Colours & coatings' },
      { label: 'Facility', us: 'GMP pharmaceutical', them: 'Contract manufacturer' },
    ],
  },
  reviews: {
    eyebrow: 'Reviews',
    title: 'Quietly, consistently recommended.',
    summary: { score: '4.9', count: '3,412 verified reviews' },
    items: [
      {
        quote:
          'The first supplement where I could match every dose to a study. My vitamin D and ferritin both moved within a quarter.',
        name: 'Elif K.',
        meta: 'Verified · 8 months',
      },
      {
        quote:
          'I stopped taking five separate bottles. The packaging alone convinced my mother it was pharmacy-grade, and her physician agreed.',
        name: 'Mert A.',
        meta: 'Verified · 1 year',
      },
      {
        quote:
          'Sleep depth changed first, around week three. The magnesium form here is the one I would have chosen myself.',
        name: 'Dr. Selin Y.',
        meta: 'Verified · 6 months',
      },
    ],
  },
  certificates: {
    eyebrow: 'Certification',
    title: 'Documented, audited, published.',
    items: ['GMP Certified', 'ISO 22000', 'Halal Certified', 'Non-GMO', 'Vegan Society', 'Informed Sport'],
    note: 'Certificates of analysis for every batch are searchable by the code printed on your bottle.',
  },
  doctor: {
    eyebrow: 'Clinical Advisory',
    quote:
      'I recommend Vitaself because I can read the label the way I read a prescription. The doses are honest and the testing is public.',
    name: 'Dr. Ayşe Demir, MD',
    role: 'Internal Medicine · Vitaself Scientific Board',
    body: 'Our formulas are reviewed by a board of nine physicians and pharmacologists before a single capsule is produced.',
  },
  faq: {
    eyebrow: 'Questions',
    title: 'Everything else.',
    items: [
      {
        q: 'Can I take Vitaself with prescription medication?',
        a: 'In most cases, yes — but always confirm with your physician or pharmacist first. Our full ingredient panel is written specifically so a clinician can review it in under a minute.',
      },
      {
        q: 'When will I notice a difference?',
        a: 'Sleep quality and energy are typically the first reported changes, around week two to three. Measurable serum changes generally appear between eight and twelve weeks.',
      },
      {
        q: 'Why capsules instead of a powder?',
        a: 'Capsules protect oxidation-sensitive actives and allow exact dosing without flavour masking agents, sweeteners, or added sugars.',
      },
      {
        q: 'How does the subscription work?',
        a: 'A 30-day supply arrives automatically, at 20% off. You can pause, reschedule, or cancel from your account at any time, with no minimum term.',
      },
      {
        q: 'What if it is not right for me?',
        a: 'Return it within 60 days, even if the bottle is empty, for a full refund of the product price.',
      },
      {
        q: 'Where is it made?',
        a: 'In our GMP-certified pharmaceutical facility in Istanbul, Türkiye. Raw material origin is listed for each active in the enclosed panel.',
      },
    ],
  },
  newsletter: {
    eyebrow: 'The Dispatch',
    title: 'One considered letter each month.',
    body: 'New research summaries, formulation notes, and early access to releases. No discount countdowns.',
    placeholder: 'Email address',
    cta: 'Subscribe',
    success: 'Thank you. Please confirm the link in your inbox.',
    note: 'Unsubscribe in one click. We never share your address.',
  },
  shop: {
    eyebrow: 'The Collection',
    title: 'Clinical formulas.',
    titleAccent: 'Nothing hidden.',
    body: 'Four considered products. Transparent doses. The same pharmaceutical discipline behind every capsule.',
    browse: 'Browse formulas',
    view: 'View formula',
    from: 'From',
    actives: 'actives',
    reviews: 'reviews',
    trust: ['Third-party tested', 'GMP pharmaceutical', '60-day guarantee'],
  },
  pdp: {
    back: 'All formulas',
    add: 'Add to cart',
    added: 'Added to cart',
    perDay: 'per day',
    supply: '30-day supply',
    options: {
      title: 'Choose your rhythm',
      subscribe: 'Subscribe & save',
      subscribeNote: 'Delivered every 30 days. Pause or cancel anytime.',
      once: 'One-time purchase',
      onceNote: 'A single 30-day supply.',
      save: 'Save 20%',
    },
    trust: ['Free shipping over $60', '60-day guarantee', 'Ships in 24h'],
    highlights: 'Why this formula',
    quantity: {
      title: 'Stock your routine',
      one: '1 bottle',
      two: '2 bottles',
      three: '3 bottles',
      saveTwo: 'Save 8%',
      saveThree: 'Save 12%',
    },
    upsell: {
      eyebrow: 'Complete the protocol',
      title: 'Frequently chosen together',
      body: 'Stack the formulas most often purchased with this one — and keep the clinical coverage coherent.',
      save: 'Stack save',
      total: 'Stack total',
      addStack: 'Add selected to cart',
      included: 'This formula',
    },
    shipping: {
      unlocked: 'Free shipping unlocked on this order',
      remaining: 'away from free shipping',
    },
    related: {
      eyebrow: 'Also in the line',
      title: 'Continue the protocol.',
    },
    social: 'verified reviews',
  },
  footer: {
    tagline: 'Clinically formulated daily essentials. Istanbul, Türkiye.',
    columns: [
      {
        title: 'Shop',
        links: [
          { label: 'Daily Foundation', href: '/products/daily-foundation' },
          { label: 'Sleep Depth', href: '/products/sleep-depth' },
          { label: 'Algal Omega', href: '/products/algal-omega' },
          { label: 'Essentials Trio', href: '/products/essentials-trio' },
          { label: 'All formulas', href: '/products' },
        ],
      },
      {
        title: 'Learn',
        links: [
          { label: 'Science', href: '/#science' },
          { label: 'Ingredient index', href: '/#ingredients' },
          { label: 'Batch results', href: '/#certificates' },
          { label: 'Reviews', href: '/#reviews' },
          { label: 'FAQ', href: '/#top' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/#about' },
          { label: 'Scientific board', href: '/#top' },
          { label: 'Careers', href: '/#top' },
          { label: 'Press', href: '/#top' },
          { label: 'Contact', href: '/#top' },
        ],
      },
    ],
    legal: ['Privacy', 'Terms', 'Shipping & returns', 'Cookie preferences'],
    rights: 'All rights reserved.',
    disclaimer:
      'Food supplements are not a substitute for a balanced diet. Consult your physician before use if you are pregnant, nursing, or taking medication.',
  },
}

export const tr: typeof en = {
  locale: 'tr-TR',
  currency: 'try',
  announce: 'Bağımsız laboratuvar onaylı · 1.500 ₺ üzeri ücretsiz kargo · 60 gün garanti',
  nav: {
    shop: 'Ürünler',
    science: 'Bilim',
    ingredients: 'İçerikler',
    reviews: 'Yorumlar',
    about: 'Hakkımızda',
    cart: 'Sepet',
    account: 'Hesabım',
    search: 'Ara',
    menu: 'Menü',
    close: 'Kapat',
  },
  hero: {
    eyebrow: 'Günlük Temel · 01',
    title: 'Günde tek adım.',
    titleAccent: 'Gizli hiçbir şey yok.',
    body: 'Rafınızdaki tüm kutuların yerini alan, klinik dozlu tek bir formül. İstanbul laboratuvarımızda geliştirildi, üç bağımsız laboratuvarda test edildi.',
    cta: 'Günlük Temel’i incele',
    ctaSecondary: 'Formülü gör',
    marks: ['Klinik doz', 'Bağımsız test', 'Dolgu maddesi yok', 'Türkiye’de üretildi'],
  },
  featured: {
    eyebrow: 'Öne çıkan',
    title: 'Günlük Temel',
    subtitle: '32 aktif. Tek servis. Tam şeffaflık.',
    body: 'Vitaminler, mineraller ve adaptojenler; etiketde görünmek için gereken en düşük miktarda değil, yayımlanmış araştırmalardaki dozlarda.',
    options: {
      title: 'Ritminizi seçin',
      subscribe: 'Abone ol ve kazan',
      subscribeNote: '30 günde bir teslim. Dilediğiniz zaman durdurun.',
      once: 'Tek seferlik alım',
      onceNote: '30 günlük tek kutu.',
      save: '%20 indirim',
    },
    add: 'Sepete ekle',
    perDay: 'günlük',
    supply: '30 günlük kullanım',
    trust: ['Ücretsiz kargo', '60 gün garanti', '24 saatte kargo'],
  },
  benefits: {
    eyebrow: 'Neden Vitaself',
    title: 'Bir eczanenin geliştireceği gibi geliştirildi.',
    items: [
      {
        title: 'Klinik dozlar',
        body: 'Her aktif madde, hakemli araştırmalarda incelenen miktarda ve etiketin ön yüzünde miligram olarak yer alır.',
      },
      {
        title: 'Önce emilim',
        body: 'Metillenmiş folat, şelatlı mineraller ve lipozomal taşıma — vücudunuzun gerçekten kullanabildiği formlar.',
      },
      {
        title: 'Üç bağımsız laboratuvar',
        body: 'Her parti kimlik, etkinlik ve ağır metal açısından test edilir. Sonuçlar parti numarasıyla yayımlanır.',
      },
      {
        title: 'Fazlası yok',
        body: 'Yapay renklendirici, gizli karışım, titanyum dioksit ve gereksiz yardımcı madde içermez.',
      },
    ],
  },
  ingredients: {
    eyebrow: 'İçerikler',
    title: 'İçindeki her şey. Karışımın arkasında hiçbir şey.',
    body: 'Otuz iki aktifin on ikisi aşağıda. Kaynak ülkesi ve analiz yöntemiyle birlikte tam panel kutunun içinde.',
    items: [
      { name: 'D3 Vitamini', dose: '2000 IU', note: 'Bağışıklık ve kemik sağlığı' },
      { name: 'Magnezyum Bisglisinat', dose: '200 mg', note: 'Uyku kalitesi ve kas onarımı' },
      { name: 'Metilfolat', dose: '400 mcg', note: 'Aktif B9, dönüşüm gerektirmez' },
      { name: 'Omega-3 DHA', dose: '500 mg', note: 'Algal kaynak, biliş ve görme' },
      { name: 'Çinko Pikolinat', dose: '15 mg', note: 'Bağışıklık ve cilt' },
      { name: 'Ashwagandha KSM-66', dose: '600 mg', note: 'Kortizol dengesi' },
    ],
    cta: 'Tam paneli indir',
  },
  science: {
    eyebrow: 'Bilim',
    title: 'Bir depoda değil, ilaç tesisinde formüle edildi.',
    body: 'Vitaself, İstanbul’daki GMP sertifikalı ilaç tesisimizde geliştirilir. Reçeteli ilaçla aynı oda, aynı toleranslar, aynı dokümantasyon.',
    stats: [
      { value: '32', label: 'Aktif bileşen' },
      { value: '3', label: 'Parti başına bağımsız laboratuvar' },
      { value: '0,4%', label: 'Doz sapma toleransı' },
      { value: '148', label: 'Referans alınan çalışma' },
    ],
    cta: 'Teknik raporu oku',
  },
  lifestyle: {
    eyebrow: 'Protokol',
    title: 'İki kapsül. Sabah ışığı. Su.',
    steps: [
      {
        step: '01',
        title: 'Sabah',
        body: 'İlk öğününüzle birlikte iki kapsül alın. Yağda çözünen vitaminler yemekle en iyi emilir.',
      },
      {
        step: '02',
        title: 'Süreklilik',
        body: 'Kan düzeyleri yaklaşık üçüncü haftada dengelenir. Formül günlük ve uzun süreli kullanım için tasarlandı.',
      },
      {
        step: '03',
        title: 'Kontrol',
        body: 'Doksanıncı günde kan değerlerinizi yeniden ölçün. Hatırlatma ve tetkik listesini biz gönderiyoruz.',
      },
    ],
  },
  comparison: {
    eyebrow: 'Karşılaştırma',
    title: 'Aslında neyi karşılaştırıyorsunuz.',
    columns: { us: 'Vitaself', them: 'Tipik multivitamin' },
    rows: [
      { label: 'Dozlar mg olarak yazılı', us: 'Her zaman', them: 'Gizli karışım' },
      { label: 'Biyoyararlanımı yüksek formlar', us: '32 aktifin tamamı', them: 'En ucuz form' },
      { label: 'Bağımsız test', us: 'Her parti, yayımlanır', them: 'Ara ara, gizli' },
      { label: 'Ağır metal taraması', us: 'Dört metal, her parti', them: 'Açıklanmıyor' },
      { label: 'Yapay katkı', us: 'Yok', them: 'Renklendirici ve kaplama' },
      { label: 'Tesis', us: 'GMP ilaç tesisi', them: 'Fason üretici' },
    ],
  },
  reviews: {
    eyebrow: 'Yorumlar',
    title: 'Sessizce, istikrarlı biçimde tavsiye ediliyor.',
    summary: { score: '4,9', count: '3.412 doğrulanmış yorum' },
    items: [
      {
        quote:
          'Her dozu bir çalışmayla eşleştirebildiğim ilk takviye. D vitamini ve ferritin değerlerim üç ayda yükseldi.',
        name: 'Elif K.',
        meta: 'Doğrulanmış · 8 ay',
      },
      {
        quote:
          'Beş ayrı kutuyu bıraktım. Ambalajı bile annemi eczane kalitesinde olduğuna ikna etti, doktoru da onayladı.',
        name: 'Mert A.',
        meta: 'Doğrulanmış · 1 yıl',
      },
      {
        quote:
          'İlk fark uyku derinliğinde oldu, üçüncü hafta civarı. Buradaki magnezyum formu kendi seçeceğim form.',
        name: 'Dr. Selin Y.',
        meta: 'Doğrulanmış · 6 ay',
      },
    ],
  },
  certificates: {
    eyebrow: 'Sertifikalar',
    title: 'Belgelenmiş, denetlenmiş, yayımlanmış.',
    items: ['GMP Sertifikalı', 'ISO 22000', 'Helal Sertifikalı', 'GDO’suz', 'Vegan Society', 'Informed Sport'],
    note: 'Her partinin analiz sertifikası, kutunuzda yazılı kodla aranabilir.',
  },
  doctor: {
    eyebrow: 'Klinik Danışma',
    quote:
      'Vitaself’i öneriyorum çünkü etiketini bir reçete gibi okuyabiliyorum. Dozlar dürüst, testler herkese açık.',
    name: 'Dr. Ayşe Demir',
    role: 'İç Hastalıkları · Vitaself Bilim Kurulu',
    body: 'Formüllerimiz tek bir kapsül üretilmeden önce dokuz hekim ve farmakologdan oluşan kurul tarafından incelenir.',
  },
  faq: {
    eyebrow: 'Sorular',
    title: 'Diğer her şey.',
    items: [
      {
        q: 'Reçeteli ilaçlarla birlikte kullanabilir miyim?',
        a: 'Çoğu durumda evet — ancak mutlaka hekiminize veya eczacınıza danışın. İçerik panelimiz, bir klinisyenin bir dakikadan kısa sürede inceleyebileceği şekilde hazırlandı.',
      },
      {
        q: 'Farkı ne zaman hissederim?',
        a: 'Genellikle ilk bildirilen değişimler uyku kalitesi ve enerjidir, ikinci-üçüncü hafta civarında. Ölçülebilir kan değişimleri sekiz ile on iki hafta arasında görülür.',
      },
      {
        q: 'Neden toz değil kapsül?',
        a: 'Kapsül, oksidasyona duyarlı aktifleri korur ve tatlandırıcı ya da aroma maskeleyici kullanmadan tam dozlama sağlar.',
      },
      {
        q: 'Abonelik nasıl çalışıyor?',
        a: '30 günlük kullanım %20 indirimle otomatik olarak gelir. Hesabınızdan dilediğiniz zaman durdurabilir, erteleyebilir veya iptal edebilirsiniz.',
      },
      {
        q: 'Bana uygun olmazsa?',
        a: 'Kutu boşalmış olsa bile 60 gün içinde iade edin, ürün bedelini eksiksiz geri ödüyoruz.',
      },
      {
        q: 'Nerede üretiliyor?',
        a: 'İstanbul’daki GMP sertifikalı ilaç tesisimizde. Her aktifin hammadde kaynağı kutudaki panelde belirtilir.',
      },
    ],
  },
  newsletter: {
    eyebrow: 'Bülten',
    title: 'Ayda bir, özenle yazılmış tek mektup.',
    body: 'Yeni araştırma özetleri, formülasyon notları ve lansmanlara erken erişim. İndirim sayacı yok.',
    placeholder: 'E-posta adresi',
    cta: 'Abone ol',
    success: 'Teşekkürler. Lütfen e-postanızdaki bağlantıyı onaylayın.',
    note: 'Tek tıkla çıkabilirsiniz. Adresinizi asla paylaşmıyoruz.',
  },
  shop: {
    eyebrow: 'Koleksiyon',
    title: 'Klinik formüller.',
    titleAccent: 'Gizli hiçbir şey yok.',
    body: 'Dört özenle seçilmiş ürün. Şeffaf dozlar. Her kapsülün arkasında aynı farmasötik disiplin.',
    browse: 'Formülleri incele',
    view: 'Formülü gör',
    from: 'Başlangıç',
    actives: 'aktif',
    reviews: 'yorum',
    trust: ['Bağımsız laboratuvar', 'GMP ilaç tesisi', '60 gün garanti'],
  },
  pdp: {
    back: 'Tüm formüller',
    add: 'Sepete ekle',
    added: 'Sepete eklendi',
    perDay: 'günlük',
    supply: '30 günlük kullanım',
    options: {
      title: 'Ritminizi seçin',
      subscribe: 'Abone ol ve kazan',
      subscribeNote: '30 günde bir teslim. Dilediğiniz zaman durdurun.',
      once: 'Tek seferlik alım',
      onceNote: '30 günlük tek kutu.',
      save: '%20 indirim',
    },
    trust: ['1.500 ₺ üzeri ücretsiz kargo', '60 gün garanti', '24 saatte kargo'],
    highlights: 'Neden bu formül',
    quantity: {
      title: 'Rutininizi stoklayın',
      one: '1 kutu',
      two: '2 kutu',
      three: '3 kutu',
      saveTwo: '%8 kazanın',
      saveThree: '%12 kazanın',
    },
    upsell: {
      eyebrow: 'Protokolü tamamla',
      title: 'Sıkça birlikte seçiliyor',
      body: 'Bu formülle en sık alınanları bir araya getirin — klinik kapsamı tutarlı tutun.',
      save: 'Set tasarrufu',
      total: 'Set toplamı',
      addStack: 'Seçilenleri sepete ekle',
      included: 'Bu formül',
    },
    shipping: {
      unlocked: 'Bu siparişte ücretsiz kargo açıldı',
      remaining: 'ücretsiz kargoya kaldı',
    },
    related: {
      eyebrow: 'Aynı çizgide',
      title: 'Protokole devam edin.',
    },
    social: 'doğrulanmış yorum',
  },
  footer: {
    tagline: 'Klinik formüllü günlük temel takviyeler. İstanbul, Türkiye.',
    columns: [
      {
        title: 'Ürünler',
        links: [
          { label: 'Günlük Temel', href: '/products/daily-foundation' },
          { label: 'Uyku Derinliği', href: '/products/sleep-depth' },
          { label: 'Algal Omega', href: '/products/algal-omega' },
          { label: 'Temel Üçlü', href: '/products/essentials-trio' },
          { label: 'Tüm formüller', href: '/products' },
        ],
      },
      {
        title: 'Öğren',
        links: [
          { label: 'Bilim', href: '/#science' },
          { label: 'İçerik dizini', href: '/#ingredients' },
          { label: 'Parti sonuçları', href: '/#certificates' },
          { label: 'Yorumlar', href: '/#reviews' },
          { label: 'SSS', href: '/#top' },
        ],
      },
      {
        title: 'Kurumsal',
        links: [
          { label: 'Hakkımızda', href: '/#about' },
          { label: 'Bilim kurulu', href: '/#top' },
          { label: 'Kariyer', href: '/#top' },
          { label: 'Basın', href: '/#top' },
          { label: 'İletişim', href: '/#top' },
        ],
      },
    ],
    legal: ['Gizlilik', 'Koşullar', 'Kargo ve iade', 'Çerez tercihleri'],
    rights: 'Tüm hakları saklıdır.',
    disclaimer:
      'Takviye edici gıdalar dengeli beslenmenin yerini tutmaz. Hamilelik, emzirme veya ilaç kullanımı durumunda hekiminize danışın.',
  },
}

export type Lang = 'en' | 'tr'
export type Dictionary = typeof en

const dictionaries: Record<Lang, Dictionary> = { en, tr }

type LanguageContextValue = {
  lang: Lang
  d: Dictionary
  setLang: (lang: Lang) => void
  toggle: () => void
  price: (amount: { usd: number; try: number }) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  const price = useCallback(
    (amount: { usd: number; try: number }) => {
      const isTr = lang === 'tr'
      return new Intl.NumberFormat(isTr ? 'tr-TR' : 'en-US', {
        style: 'currency',
        currency: isTr ? 'TRY' : 'USD',
        maximumFractionDigits: isTr ? 0 : 2,
      }).format(isTr ? amount.try : amount.usd)
    },
    [lang],
  )

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      d: dictionaries[lang],
      setLang,
      toggle: () => setLang((prev) => (prev === 'en' ? 'tr' : 'en')),
      price,
    }),
    [lang, price],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
