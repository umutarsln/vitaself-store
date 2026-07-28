# Vitaself Storefront — Mimari Rapor ve Checklist (Güncel)

> Güncelleme: 2026-07-28  
> Branch: `cursor/urunler-ve-pdp-41a5`  
> Durum: Landing + katalog + PDP + sepet + mock checkout + SEO/i18n + **orta/düşük kalite maddeleri**. Canlı Shopify ve auth hâlâ eksik.

---

## 1. Özet verdict

**Orta ve düşük** checklist maddeleri büyük ölçüde kapandı: locale prefix (`/tr`,`/en`), legal/şirket/bilim sayfaları, içerik asset’leri, miktar indiriminin sepete yansıması, focus trap, FAQ/doctor a11y, ESLint, birim testler, image optimization.

**Kalan yüksek/kritik:** gerçek Shopify ödeme + canlı katalog, auth/hesap, Search/Account UI, gerçek newsletter.

---

## 2. Route haritası

| Route | Durum |
|---|---|
| `/`, `/tr/*`, `/en/*` | Landing (+ locale rewrite) |
| `/products`, `/products/[handle]` | Katalog + 4 PDP |
| `/checkout`, `/checkout/success` | Mock checkout (`noindex`) |
| `POST /api/checkout` | Mock order API |
| `/legal/*` | privacy, terms, shipping, cookies |
| `/company/*` | about, scientific-board, careers, press, contact |
| `/science/*` | white-paper, ingredient-panel, batch-results |
| `/docs/*.html` | Panel / white paper / COA HTML |
| `/sitemap.xml`, `/robots.txt` | SEO |

---

## 3. Tamamlananlar (bu tur + önceki)

### Orta
- [x] Locale URL: `/tr` ve `/en` middleware rewrite + dil cookie
- [x] SSR `html lang` cookie’den
- [x] Dil persist (localStorage + cookie)
- [x] OG / Twitter / JSON-LD / sitemap / robots / canonical
- [x] Sticky bar ↔ featured varyant sync
- [x] `ignoreBuildErrors` kaldırıldı
- [x] Ingredients / Science CTA → gerçek sayfalar + HTML docs
- [x] Certificates → COA / batch links
- [x] Learn / Company / Legal footer linkleri gerçek sayfalara
- [x] Miktar indirimi `lineTotal` / `cartSubtotal` ile sepete ve API’ye yansıyor
- [x] Cart drawer + cross-sell modal focus trap
- [x] Checkout sitemap’ten çıkarıldı (`noindex` ile uyumlu)

### Düşük
- [x] ESLint flat config (`eslint-config-next`)
- [x] Birim testler (`pnpm test` — pricing)
- [x] FAQ `aria-controls` / panel id / `#faq`
- [x] Doctor `figure` + `figcaption`
- [x] `images.unoptimized` kaldırıldı
- [x] `Button` / `buttonVariants` checkout CTA’da kullanılıyor

---

## 4. Kalanlar

### Kritik
- [ ] Gerçek Shopify Storefront checkout (`checkoutCreate`)
- [ ] Canlı katalog / stok API

### Yüksek
- [ ] Auth / customer account / abonelik yönetimi
- [ ] Header Search (ölü) — bağla veya gizle
- [ ] Header Account (ölü) — bağla veya gizle
- [ ] Newsletter gerçek provider submit

### Orta / düşük (opsiyonel kalan)
- [ ] Canlı batch COA lookup API (şimdilik örnek HTML)
- [ ] E2E smoke (Playwright) — birim test var, e2e yok
- [ ] Middleware → Next 16 `proxy` migrasyonu (deprecation uyarısı)

---

## 5. Sonraki 4 öncelik

1. Shopify Storefront (katalog + hosted checkout)
2. Legal zaten var — Search/Account düzelt
3. Newsletter provider
4. Customer account / abonelik

---

## 6. Komutlar

```bash
pnpm build   # tip kontrolü açık
pnpm lint    # eslint flat
pnpm test    # pricing birim testleri
```
