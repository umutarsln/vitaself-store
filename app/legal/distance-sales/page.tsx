import type { Metadata } from 'next'
import { ContentPageShell } from '@/components/content/content-page-shell'
import { LegalContent, LegalSection } from '@/components/legal/legal-content'
import { FLAT_SHIPPING, FREE_SHIPPING_THRESHOLD, formatTryAmount } from '@/lib/products'
import { seller, sellerLegalLabel } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Distance sales agreement',
  alternates: { canonical: '/legal/distance-sales' },
}

/** Mesafeli satış sözleşmesi (6502 + Mesafeli Sözleşmeler Yönetmeliği). */
export default function DistanceSalesPage() {
  return (
    <ContentPageShell
      eyebrowEn="Legal"
      eyebrowTr="Yasal"
      titleEn="Distance sales agreement"
      titleTr="Mesafeli satış sözleşmesi"
    >
      <LegalContent
        tr={
          <>
            <p className="text-foreground/90">
              Son güncelleme: Eylül 2026. Bu sözleşme, 6502 sayılı Tüketicinin Korunması Hakkında
              Kanun ve Mesafeli Sözleşmeler Yönetmeliği kapsamında, vitaself.com üzerinden verilen
              siparişler için geçerlidir. Siparişi onaylayarak bu sözleşmeyi kabul etmiş
              sayılırsınız.
            </p>

            <LegalSection title="Satıcı">
              <ul className="list-disc space-y-2 pl-5">
                <li>Satıcı: {seller.legalName} (şahıs)</li>
                <li>Ticari unvan / marka: {seller.brand}</li>
                <li>Açık adres: {seller.addressLine}</li>
                <li>
                  Telefon:{' '}
                  <a href={seller.phoneHref} className="text-foreground underline-offset-4 hover:underline">
                    {seller.phoneDisplay}
                  </a>
                </li>
                <li>
                  E-posta:{' '}
                  <a
                    href={`mailto:${seller.emails.support}`}
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    {seller.emails.support}
                  </a>{' '}
                  (sipariş / iade),{' '}
                  <a
                    href={`mailto:${seller.emails.hello}`}
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    {seller.emails.hello}
                  </a>{' '}
                  (genel)
                </li>
              </ul>
            </LegalSection>

            <LegalSection title="Alıcı">
              <p>
                Alıcı, sipariş formunda bildirdiği ad, teslimat adresi, telefon ve e-posta
                bilgileriyle tanımlanan gerçek veya tüzel kişidir. Bildirilen bilgilerin doğruluğundan
                alıcı sorumludur.
              </p>
            </LegalSection>

            <LegalSection title="Sözleşmenin konusu">
              <p>
                Konu; alıcının sitede seçtiği takviye edici gıdaların, sipariş anında gösterilen
                nitelikler, miktar ve bedel üzerinden satıcı tarafından alıcıya teslimidir. Ürünün
                temel nitelikleri, fiyatı ve varsa kargo bedeli sipariş özetinde yer alır.
              </p>
            </LegalSection>

            <LegalSection title="Malın temel nitelikleri">
              <p>
                Ürünler takviye edici gıdadır; ilaç değildir, teşhis veya tedavi amacı taşımaz.
                Etken maddeler, net miktar, kullanım önerisi ve uyarılar ürün sayfasında ve ambalaj
                üzerinde belirtilir. Sitedeki içerikler bilgilendirme amaçlıdır.
              </p>
            </LegalSection>

            <LegalSection title="Bedel ve ödeme">
              <p>
                Satış bedeli, sipariş onayında gösterilen ürün tutarı ile varsa kargo ücretinden
                oluşur. {formatTryAmount(FREE_SHIPPING_THRESHOLD.try)} ve üzeri siparişlerde kargo
                ücretsizdir; altındaki siparişlerde sabit kargo ücreti{' '}
                {formatTryAmount(FLAT_SHIPPING.try)}’dir. Ödeme, bağlanan ödeme sağlayıcısının
                sayfasında tamamlanır. Kart bilgileri satıcı sunucularında saklanmaz.
              </p>
            </LegalSection>

            <LegalSection title="Teslimat">
              <p>
                Teslimat yalnızca Türkiye adreslerine yapılır. Stok ve adres bilgileri uygunsa
                sipariş iş günlerinde genellikle 24 saat içinde kargoya verilir. Teslim süresi kargo
                firmasına ve adrese göre değişir; kesin tarih taahhüt edilmez. Mücbir sebep, stok
                tükenmesi veya hatalı adres halinde satıcı siparişi iptal edebilir; ödenen tutar
                iade edilir.
              </p>
            </LegalSection>

            <LegalSection title="Cayma hakkı">
              <p>
                Alıcı, malın tesliminden itibaren 14 gün içinde herhangi bir gerekçe göstermeksizin
                ve cezai şart ödemeksizin sözleşmeden cayabilir. Cayma bildirimi{' '}
                <a
                  href={`mailto:${seller.emails.support}`}
                  className="text-foreground underline-offset-4 hover:underline"
                >
                  {seller.emails.support}
                </a>{' '}
                adresine yazılı olarak iletilir. Cayma süresi malın alıcıya veya belirlediği üçüncü
                kişiye teslim edildiği günden başlar.
              </p>
            </LegalSection>

            <LegalSection title="Cayma hakkının istisnaları">
              <p>
                Hijyen ve sağlık açısından iadesi uygun olmayan, teslimden sonra ambalajı açılmış,
                mührü bozulmuş veya kullanılmış takviye edici gıdalarda cayma hakkı kullanılamaz.
                Kanun ve yönetmelikte sayılan diğer istisnalar saklıdır.
              </p>
            </LegalSection>

            <LegalSection title="İade">
              <p>
                Cayma veya onaylı iadede ürün, orijinal dış ambalajında ve faturasıyla{' '}
                {seller.addressLine} adresine gönderilir. Açılmamış üründe cayma halinde ürün bedeli
                yasal süre içinde iade edilir; standart iade kargo bedeli alıcıya aittir (kanunun
                aksi öngördüğü haller saklı). Hasarlı veya hatalı teslimatta süreç kargo ve iade
                sayfasındaki kurallara tabidir.
              </p>
            </LegalSection>

            <LegalSection title="Uyuşmazlık">
              <p>
                Bu sözleşme Türkiye Cumhuriyeti kanunlarına tabidir. Uyuşmazlıklarda{' '}
                {seller.jurisdiction} mahkeme ve icra daireleri yetkilidir; tüketicinin
                ikametgâhındaki tüketici hakem heyetine ve tüketici mahkemesine başvuru hakkı
                saklıdır. Satıcı: {sellerLegalLabel()}.
              </p>
            </LegalSection>
          </>
        }
        en={
          <>
            <p className="text-foreground/90">
              Last updated: September 2026. This agreement applies to orders placed on vitaself.com
              under Turkish consumer law (Law No. 6502 and the Distance Contracts Regulation). By
              confirming an order you accept these terms.
            </p>

            <LegalSection title="Seller">
              <ul className="list-disc space-y-2 pl-5">
                <li>Seller: {seller.legalName} (sole proprietor)</li>
                <li>Brand: {seller.brand}</li>
                <li>Address: {seller.addressLine}</li>
                <li>
                  Phone:{' '}
                  <a href={seller.phoneHref} className="text-foreground underline-offset-4 hover:underline">
                    {seller.phoneDisplay}
                  </a>
                </li>
                <li>
                  Email:{' '}
                  <a
                    href={`mailto:${seller.emails.support}`}
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    {seller.emails.support}
                  </a>{' '}
                  (orders / returns),{' '}
                  <a
                    href={`mailto:${seller.emails.hello}`}
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    {seller.emails.hello}
                  </a>{' '}
                  (general)
                </li>
              </ul>
            </LegalSection>

            <LegalSection title="Buyer">
              <p>
                The buyer is the person identified by the name, shipping address, phone and email
                submitted on the order form. The buyer is responsible for the accuracy of those
                details.
              </p>
            </LegalSection>

            <LegalSection title="Subject">
              <p>
                The seller delivers the food supplements selected on the site at the qualities,
                quantities and prices shown at checkout. Product details, price and any shipping fee
                appear in the order summary.
              </p>
            </LegalSection>

            <LegalSection title="Goods">
              <p>
                Products are food supplements, not medicines, and are not intended to diagnose or
                treat disease. Actives, net quantity, directions and warnings are stated on the
                product page and packaging. Site content is informational only.
              </p>
            </LegalSection>

            <LegalSection title="Price and payment">
              <p>
                The price is the product total shown at confirmation plus any shipping fee. Orders
                of {formatTryAmount(FREE_SHIPPING_THRESHOLD.try)} or more ship free; below that a
                flat {formatTryAmount(FLAT_SHIPPING.try)} shipping fee applies. Payment is completed
                on the connected payment provider’s page. Card details are not stored on the
                seller’s servers.
              </p>
            </LegalSection>

            <LegalSection title="Delivery">
              <p>
                We ship to addresses in Türkiye only. When stock and address details are complete,
                orders are usually handed to the carrier within 24 hours on business days. Transit
                time depends on the carrier and destination; a fixed date is not guaranteed. The
                seller may cancel for force majeure, stock shortage or an incorrect address; any
                payment is refunded.
              </p>
            </LegalSection>

            <LegalSection title="Right of withdrawal">
              <p>
                The buyer may withdraw within 14 days of delivery without giving a reason. Notify{' '}
                <a
                  href={`mailto:${seller.emails.support}`}
                  className="text-foreground underline-offset-4 hover:underline"
                >
                  {seller.emails.support}
                </a>{' '}
                in writing. The period starts on the day the goods are received by the buyer or a
                third person they designate.
              </p>
            </LegalSection>

            <LegalSection title="Exceptions">
              <p>
                Withdrawal does not apply to food supplements that have been opened, unsealed or
                used after delivery, where return is unsuitable for hygiene or health reasons.
                Other statutory exceptions remain.
              </p>
            </LegalSection>

            <LegalSection title="Returns">
              <p>
                For withdrawal or an approved return, send the item in original outer packaging with
                the invoice to {seller.addressLine}. For unopened goods the product price is refunded
                within statutory timeframes; standard return shipping is at the buyer’s expense
                unless the law requires otherwise. Damaged or incorrect deliveries follow the
                shipping and returns page.
              </p>
            </LegalSection>

            <LegalSection title="Disputes">
              <p>
                This agreement is governed by the laws of Türkiye. Disputes fall under the courts of{' '}
                {seller.jurisdiction}, without prejudice to the consumer’s right to apply to the
                consumer arbitration committee and consumer court at their place of residence.
                Seller: {sellerLegalLabel()}.
              </p>
            </LegalSection>
          </>
        }
      />
    </ContentPageShell>
  )
}
