import type { Metadata } from 'next'
import { ContentPageShell } from '@/components/content/content-page-shell'
import { LegalContent, LegalSection } from '@/components/legal/legal-content'

export const metadata: Metadata = {
  title: 'Shipping & returns',
  alternates: { canonical: '/legal/shipping' },
}

/** Kargo ve iade. */
export default function ShippingPage() {
  return (
    <ContentPageShell
      eyebrowEn="Legal"
      eyebrowTr="Yasal"
      titleEn="Shipping & returns"
      titleTr="Kargo ve iade"
    >
      <LegalContent
        tr={
          <>
            <p className="text-foreground/90">
              Son güncelleme: Ağustos 2026. Teslimat ve iade süreçleri aşağıda özetlenmiştir.
            </p>

            <LegalSection title="Teslimat">
              <p>
                Siparişler, stok ve adres bilgileri uygun olduğunda iş günlerinde genellikle 24 saat
                içinde kargoya verilir. Resmî tatil ve yoğun dönemlerde bu süre uzayabilir. Tahmini
                teslimat süresi kargo firmasına ve adresinize göre değişir; kesin bir teslimat
                tarihi taahhüt edilmez.
              </p>
              <p>
                Teslimat yalnızca Türkiye adreslerine yapılır. Yanlış veya eksik adres nedeniyle
                iade dönen gönderilerde yeniden kargo ücreti talep edilebilir.
              </p>
            </LegalSection>

            <LegalSection title="Kargo ücretleri">
              <ul className="list-disc space-y-2 pl-5">
                <li>1.500 ₺ ve üzeri siparişlerde kargo ücretsizdir.</li>
                <li>Bu eşiğin altındaki siparişlerde sabit kargo ücreti 149 ₺ uygulanır.</li>
                <li>Uluslararası siparişler şu an kabul edilmemektedir.</li>
              </ul>
            </LegalSection>

            <LegalSection title="İade — genel kural">
              <p>
                Takviye edici gıda ürünlerinde hijyen ve güvenlik nedeniyle{' '}
                <strong className="text-foreground font-medium">
                  ambalajı açılmış, mührü bozulmuş veya kullanılmış ürünlerde iade kabul edilmez.
                </strong>{' '}
                Bu kural, ürün kutusu açıldıktan sonra yapılan iade taleplerini kapsar.
              </p>
            </LegalSection>

            <LegalSection title="Cayma hakkı (açılmamış ürünler)">
              <p>
                Mesafeli satış kapsamında, ürün henüz açılmamış ve satılabilir durumda ise teslim
                tarihinden itibaren 14 gün içinde cayma hakkınızı kullanabilirsiniz. Cayma talebinde
                ürün bedeli, yasal süreler içinde iade edilir; standart kargo bedeli size aittir.
                Cayma hakkının kullanılamayacağı istisnai haller kanunda sayılmıştır.
              </p>
            </LegalSection>

            <LegalSection title="Hasarlı veya hatalı teslimat">
              <p>
                Kargo hasarı veya yanlış ürün gönderimi durumunda, teslimattan itibaren makul bir
                süre içinde{' '}
                <a href="mailto:destek@vitaself.com" className="text-foreground underline-offset-4 hover:underline">
                  destek@vitaself.com
                </a>{' '}
                adresine fotoğraf ve sipariş numaranızla birlikte yazın. Doğrulanan hasar veya hatalı
                sevkiyatlarda değişim veya iade değerlendirilir.
              </p>
            </LegalSection>

            <LegalSection title="İade süreci">
              <p>
                Onaylanan iadelerde ürün, orijinal dış ambalajında ve faturasıyla birlikte belirtilen
                adrese gönderilmelidir. İade kargo ücreti, iade nedenine göre tarafımızca veya
                müşteri tarafından karşılanır; detay iade onay e-postasında bildirilir.
              </p>
            </LegalSection>
          </>
        }
        en={
          <>
            <p className="text-foreground/90">
              Last updated: August 2026. Delivery and return rules are summarised below.
            </p>

            <LegalSection title="Delivery">
              <p>
                Orders are usually handed to the carrier within 24 hours on business days when stock
                and address details are complete. Holidays and peak periods may extend this. Estimated
                delivery depends on the carrier and destination; a fixed delivery date is not
                guaranteed.
              </p>
              <p>
                We currently ship to addresses in Türkiye only. Reshipment fees may apply if a
                parcel returns due to an incorrect or incomplete address.
              </p>
            </LegalSection>

            <LegalSection title="Shipping fees">
              <ul className="list-disc space-y-2 pl-5">
                <li>Free shipping on orders of ₺1,500 or more.</li>
                <li>Orders below that threshold incur a flat ₺149 shipping fee.</li>
                <li>International orders are not accepted at this time.</li>
              </ul>
            </LegalSection>

            <LegalSection title="Returns — general rule">
              <p>
                For hygiene and safety reasons,{' '}
                <strong className="text-foreground font-medium">
                  we do not accept returns on opened, unsealed, or used products.
                </strong>{' '}
                This includes any item whose box or seal has been broken after delivery.
              </p>
            </LegalSection>

            <LegalSection title="Right of withdrawal (unopened items)">
              <p>
                For distance sales, you may withdraw within 14 days of delivery if the product is
                still unopened and resalable. The product price is refunded within statutory timeframes;
                standard return shipping is at your expense unless otherwise required by law. Legal
                exceptions to withdrawal apply.
              </p>
            </LegalSection>

            <LegalSection title="Damaged or incorrect delivery">
              <p>
                If your order arrives damaged or incorrect, contact{' '}
                <a href="mailto:destek@vitaself.com" className="text-foreground underline-offset-4 hover:underline">
                  destek@vitaself.com
                </a>{' '}
                within a reasonable time with photos and your order number. Verified issues are
                reviewed for replacement or refund.
              </p>
            </LegalSection>

            <LegalSection title="Return process">
              <p>
                Approved returns must be sent in original outer packaging with the invoice to the
                address provided in your return confirmation. Return shipping costs depend on the
                reason for return and will be stated in the approval email.
              </p>
            </LegalSection>
          </>
        }
      />
    </ContentPageShell>
  )
}
