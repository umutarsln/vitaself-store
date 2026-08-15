import type { Metadata } from 'next'
import { ContentPageShell } from '@/components/content/content-page-shell'
import { LegalContent, LegalSection } from '@/components/legal/legal-content'

export const metadata: Metadata = {
  title: 'Privacy policy',
  alternates: { canonical: '/legal/privacy' },
}

/** Gizlilik politikası. */
export default function PrivacyPage() {
  return (
    <ContentPageShell
      eyebrowEn="Legal"
      eyebrowTr="Yasal"
      titleEn="Privacy policy"
      titleTr="Gizlilik politikası"
    >
      <LegalContent
        tr={
          <>
            <p className="text-foreground/90">
              Son güncelleme: Ağustos 2026. Bu metin, Vitaself web sitesi ve online mağaza
              üzerinden toplanan kişisel verilerin nasıl işlendiğini açıklar.
            </p>

            <LegalSection title="Veri sorumlusu">
              <p>
                Veri sorumlusu: Vitaself İlaç A.Ş., İstanbul, Türkiye. Gizlilik talepleri için:{' '}
                <a href="mailto:privacy@vitaself.com" className="text-foreground underline-offset-4 hover:underline">
                  privacy@vitaself.com
                </a>
              </p>
            </LegalSection>

            <LegalSection title="Topladığımız veriler">
              <p>Sipariş ve hesap işlemleri kapsamında şu verileri işleyebiliriz:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Ad, soyad ve iletişim bilgileri (e-posta, telefon)</li>
                <li>Teslimat ve fatura adresi</li>
                <li>Sipariş geçmişi, sepet içeriği ve müşteri destek yazışmaları</li>
                <li>Ödeme işlemi sırasında ödeme sağlayıcısına iletilen bilgiler (kart verileri Vitaself sunucularında saklanmaz)</li>
                <li>Site kullanımına ilişkin teknik kayıtlar (IP, tarayıcı türü, dil tercihi)</li>
              </ul>
            </LegalSection>

            <LegalSection title="Verileri hangi amaçla kullanıyoruz">
              <ul className="list-disc space-y-2 pl-5">
                <li>Siparişin alınması, hazırlanması ve teslimi</li>
                <li>Müşteri destek taleplerinin yanıtlanması</li>
                <li>Vergi, muhasebe ve ilgili mevzuat yükümlülüklerinin yerine getirilmesi</li>
                <li>Site güvenliği ve hizmet kalitesinin iyileştirilmesi</li>
                <li>Reklam performansının ölçülmesi ve kampanya optimizasyonu</li>
              </ul>
              <p>Kişisel verilerinizi pazarlama amacıyla üçüncü taraflara satmayız veya kiralamayız.</p>
            </LegalSection>

            <LegalSection title="Hukuki dayanak">
              <p>
                Kişisel verileriniz; sözleşmenin kurulması ve ifası, hukuki yükümlülüklerin yerine
                getirilmesi ve meşru menfaatlerimiz kapsamında, 6698 sayılı Kişisel Verilerin
                Korunması Kanunu (KVKK) ve ilgili mevzuata uygun olarak işlenir.
              </p>
            </LegalSection>

            <LegalSection title="Veri paylaşımı">
              <p>Veriler yalnızca hizmetin sunulması için gerekli olduğu ölçüde paylaşılır:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Ödeme ve sipariş altyapısı (Shopify)</li>
                <li>Kargo ve lojistik iş ortakları</li>
                <li>Reklam ve analitik ortakları (ör. Meta, Google)</li>
                <li>Yasal zorunluluk halinde yetkili kamu kurumları</li>
              </ul>
            </LegalSection>

            <LegalSection title="Saklama süresi">
              <p>
                Veriler, işleme amacının gerektirdiği süre boyunca ve vergi ile ticaret mevzuatında
                öngörülen saklama süreleri kadar muhafaza edilir. Süre dolduğunda veriler silinir,
                anonim hale getirilir veya erişime kapatılır.
              </p>
            </LegalSection>

            <LegalSection title="Haklarınız">
              <p>
                KVKK kapsamında; verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya
                silinmesini talep etme, işleme faaliyetine itiraz etme ve şikâyet hakkınız
                bulunmaktadır. Taleplerinizi{' '}
                <a href="mailto:privacy@vitaself.com" className="text-foreground underline-offset-4 hover:underline">
                  privacy@vitaself.com
                </a>{' '}
                adresine iletebilirsiniz.
              </p>
            </LegalSection>
          </>
        }
        en={
          <>
            <p className="text-foreground/90">
              Last updated: August 2026. This notice explains how personal data is processed when
              you use the Vitaself website and online store.
            </p>

            <LegalSection title="Data controller">
              <p>
                Controller: Vitaself İlaç A.Ş., Istanbul, Türkiye. Privacy requests:{' '}
                <a href="mailto:privacy@vitaself.com" className="text-foreground underline-offset-4 hover:underline">
                  privacy@vitaself.com
                </a>
              </p>
            </LegalSection>

            <LegalSection title="Data we collect">
              <p>For orders and account-related activity we may process:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Name and contact details (email, phone)</li>
                <li>Shipping and billing address</li>
                <li>Order history, cart contents, and support correspondence</li>
                <li>Payment data handled by our payment provider (card details are not stored on Vitaself servers)</li>
                <li>Technical logs such as IP address, browser type, and language preference</li>
              </ul>
            </LegalSection>

            <LegalSection title="How we use data">
              <ul className="list-disc space-y-2 pl-5">
                <li>Processing, fulfilling, and delivering orders</li>
                <li>Responding to customer support requests</li>
                <li>Meeting tax, accounting, and regulatory obligations</li>
                <li>Maintaining site security and service quality</li>
                <li>Measuring advertising performance and optimising campaigns</li>
              </ul>
              <p>We do not sell or rent personal data to third parties for marketing.</p>
            </LegalSection>

            <LegalSection title="Legal basis">
              <p>
                Processing is based on contract performance, legal obligations, and legitimate
                interests, in line with applicable Turkish data protection law (KVKK).
              </p>
            </LegalSection>

            <LegalSection title="Sharing">
              <p>Data is shared only where necessary to operate the service:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Payment and order infrastructure (Shopify)</li>
                <li>Shipping and logistics partners</li>
                <li>Advertising and analytics partners (e.g. Meta, Google)</li>
                <li>Public authorities when required by law</li>
              </ul>
            </LegalSection>

            <LegalSection title="Retention">
              <p>
                Data is kept for as long as needed for the purposes above and for statutory
                retention periods, then deleted, anonymised, or access-restricted.
              </p>
            </LegalSection>

            <LegalSection title="Your rights">
              <p>
                You may request access, correction, deletion, or object to processing under
                applicable law. Contact{' '}
                <a href="mailto:privacy@vitaself.com" className="text-foreground underline-offset-4 hover:underline">
                  privacy@vitaself.com
                </a>
                .
              </p>
            </LegalSection>
          </>
        }
      />
    </ContentPageShell>
  )
}
