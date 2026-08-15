import type { Metadata } from 'next'
import { ContentPageShell } from '@/components/content/content-page-shell'
import { LegalContent, LegalSection } from '@/components/legal/legal-content'

export const metadata: Metadata = {
  title: 'Terms of use',
  alternates: { canonical: '/legal/terms' },
}

/** Kullanım koşulları. */
export default function TermsPage() {
  return (
    <ContentPageShell eyebrowEn="Legal" eyebrowTr="Yasal" titleEn="Terms of use" titleTr="Kullanım koşulları">
      <LegalContent
        tr={
          <>
            <p className="text-foreground/90">
              Son güncelleme: Ağustos 2026. vitaself.com sitesini ve online mağazayı kullanarak bu
              koşulları kabul etmiş sayılırsınız.
            </p>

            <LegalSection title="Kapsam">
              <p>
                Bu koşullar Vitaself web sitesi, ürün bilgileri ve online sipariş süreci için
                geçerlidir. Ödeme işlemi Shopify altyapısı üzerinden tamamlanır; ödeme sayfasındaki
                ek şartlar da geçerli olabilir.
              </p>
            </LegalSection>

            <LegalSection title="Ürünler hakkında">
              <p>
                Vitaself ürünleri takviye edici gıdadır; ilaç değildir, teşhis veya tedavi amacı
                taşımaz. Hastalık, hamilelik, emzirme veya düzenli ilaç kullanımı durumlarında
                ürün almadan önce hekiminize danışmanız gerekir. Sitedeki içerikler bilgilendirme
                amaçlıdır; tıbbi tavsiye yerine geçmez.
              </p>
            </LegalSection>

            <LegalSection title="Sipariş ve yaş sınırı">
              <p>
                Sipariş vererek takviye edici gıda satın alma yaşında olduğunuzu, verdiğiniz
                iletişim ve teslimat bilgilerinin doğru olduğunu ve siparişi kendi adınıza
                verdiğinizi beyan edersiniz. Yanlış veya eksik adres nedeniyle oluşabilecek
                gecikmelerden Vitaself sorumlu tutulamaz.
              </p>
            </LegalSection>

            <LegalSection title="Fiyatlar ve stok">
              <p>
                Fiyatlar sitede gösterildiği şekilde geçerlidir; yazım hataları veya sistem
                güncellemeleri nedeniyle düzeltme yapılabilir. Stok tükenmesi halinde sipariş
                iptal edilebilir; bu durumda ödenen tutar iade edilir.
              </p>
            </LegalSection>

            <LegalSection title="Fikri mülkiyet">
              <p>
                Site tasarımı, metinler, görseller ve marka unsurları Vitaself’e aittir. İzinsiz
                kopyalama, çoğaltma veya ticari kullanım yasaktır.
              </p>
            </LegalSection>

            <LegalSection title="Sorumluluk">
              <p>
                Vitaself, yürürlükteki tüketici mevzuatı kapsamındaki zorunlu haklarınız saklı
                kalmak kaydıyla; site kesintileri, üçüncü taraf altyapı arızaları veya mücbir
                sebep hallerinde doğrudan veya dolaylı zararlardan, yalnızca kanunun izin verdiği
                ölçüde sorumludur.
              </p>
            </LegalSection>

            <LegalSection title="Uygulanacak hukuk">
              <p>
                Bu koşullar Türkiye Cumhuriyeti kanunlarına tabidir. Uyuşmazlıklarda İstanbul
                (Merkez) mahkeme ve icra daireleri yetkilidir; tüketici olarak ikametgâhınızdaki
                tüketici hakem heyetlerine başvuru hakkınız saklıdır.
              </p>
            </LegalSection>

            <LegalSection title="İletişim">
              <p>
                Sorularınız için:{' '}
                <a href="mailto:destek@vitaself.com" className="text-foreground underline-offset-4 hover:underline">
                  destek@vitaself.com
                </a>
              </p>
            </LegalSection>
          </>
        }
        en={
          <>
            <p className="text-foreground/90">
              Last updated: August 2026. By using vitaself.com and placing orders you accept these
              terms.
            </p>

            <LegalSection title="Scope">
              <p>
                These terms apply to the Vitaself website, product information, and online ordering.
                Checkout is completed via Shopify; additional payment terms may apply on the checkout
                page.
              </p>
            </LegalSection>

            <LegalSection title="About our products">
              <p>
                Vitaself products are food supplements, not medicines. They are not intended to
                diagnose, treat, or prevent disease. Consult a physician before use if you are
                pregnant, nursing, taking medication, or have a medical condition. Site content is
                informational only.
              </p>
            </LegalSection>

            <LegalSection title="Orders and eligibility">
              <p>
                By ordering you confirm you are legally able to purchase supplements, that your
                contact and shipping details are accurate, and that you are ordering on your own
                behalf. Delays caused by incorrect addresses are not Vitaself’s responsibility.
              </p>
            </LegalSection>

            <LegalSection title="Pricing and availability">
              <p>
                Prices are as shown on the site and may be corrected for obvious errors. If an item
                is out of stock, the order may be cancelled and any payment refunded.
              </p>
            </LegalSection>

            <LegalSection title="Intellectual property">
              <p>
                Site design, copy, images, and brand assets belong to Vitaself. Unauthorised
                copying or commercial use is prohibited.
              </p>
            </LegalSection>

            <LegalSection title="Liability">
              <p>
                Subject to mandatory consumer rights, Vitaself is liable only to the extent
                permitted by law for site outages, third-party infrastructure failures, or force
                majeure.
              </p>
            </LegalSection>

            <LegalSection title="Governing law">
              <p>
                These terms are governed by the laws of Türkiye. Disputes fall under the courts of
                Istanbul (Central), without prejudice to your rights as a consumer in your country
                of residence where applicable.
              </p>
            </LegalSection>

            <LegalSection title="Contact">
              <p>
                Questions:{' '}
                <a href="mailto:destek@vitaself.com" className="text-foreground underline-offset-4 hover:underline">
                  destek@vitaself.com
                </a>
              </p>
            </LegalSection>
          </>
        }
      />
    </ContentPageShell>
  )
}
