import type { Metadata } from 'next'
import { ContentPageShell } from '@/components/content/content-page-shell'
import { LegalContent, LegalSection } from '@/components/legal/legal-content'

export const metadata: Metadata = {
  title: 'Cookie preferences',
  alternates: { canonical: '/legal/cookies' },
}

/** Çerez tercihleri. */
export default function CookiesPage() {
  return (
    <ContentPageShell
      eyebrowEn="Legal"
      eyebrowTr="Yasal"
      titleEn="Cookie preferences"
      titleTr="Çerez tercihleri"
    >
      <LegalContent
        tr={
          <>
            <p className="text-foreground/90">
              Son güncelleme: Ağustos 2026. Bu sayfa sitede kullanılan çerez ve benzeri
              teknolojileri açıklar.
            </p>

            <LegalSection title="Çerez nedir?">
              <p>
                Çerezler, tarayıcınıza kaydedilen küçük metin dosyalarıdır. Site dil tercihinizi
                hatırlamak ve temel işlevleri sürdürmek için sınırlı çerez kullanırız.
              </p>
            </LegalSection>

            <LegalSection title="Zorunlu ve işlevsel çerezler">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-foreground font-medium">vitaself-lang</strong> — Dil
                  tercihinizi saklar (zorunlu). Süre: 1 yıl.
                </li>
              </ul>
            </LegalSection>

            <LegalSection title="Analitik çerezler">
              <p>
                <strong className="text-foreground font-medium">Vercel Analytics</strong> — Yalnızca
                production ortamında, anonim trafik istatistikleri için kullanılır.
              </p>
            </LegalSection>

            <LegalSection title="Reklam çerezleri">
              <p>
                Sitede reklam performansını ölçmek ve ilgi alanınıza uygun kampanyalar göstermek için
                üçüncü taraf reklam çerezleri kullanılabilir. Bunlar arasında Meta (Facebook) Pixel
                ve Google Ads dönüşüm / yeniden hedefleme çerezleri yer alabilir.
              </p>
              <p>
                Bu çerezler; sayfa görüntüleme, sepete ekleme ve satın alma gibi olayları anonim veya
                pseudonim kimliklerle ilişkilendirebilir. Kişisel verilerinizi satmıyoruz; reklam
                ortakları kendi gizlilik politikalarına tabidir.
              </p>
            </LegalSection>

            <LegalSection title="Çerez dışı depolama">
              <p>
                Sepet içeriğiniz tarayıcınızın <strong className="text-foreground font-medium">localStorage</strong>{' '}
                alanında saklanır; bu bir çerez değildir. Sepeti temizlemek veya site verilerini
                silmek sepetinizi sıfırlar.
              </p>
            </LegalSection>

            <LegalSection title="Tercihlerinizi yönetme">
              <p>
                Zorunlu çerezler site dilinin doğru çalışması için gereklidir. Analitik ve reklam
                çerezlerini tarayıcı ayarlarınızdan, reklam tercihleri panellerinden (Google, Meta)
                veya ilgili tarayıcı eklentileriyle sınırlayabilirsiniz.
              </p>
              <p>
                Çerezler hakkında daha fazla bilgi için{' '}
                <a href="mailto:privacy@vitaself.com" className="text-foreground underline-offset-4 hover:underline">
                  privacy@vitaself.com
                </a>{' '}
                adresine yazabilirsiniz.
              </p>
            </LegalSection>
          </>
        }
        en={
          <>
            <p className="text-foreground/90">
              Last updated: August 2026. This page describes cookies and similar technologies used
              on our site.
            </p>

            <LegalSection title="What are cookies?">
              <p>
                Cookies are small text files stored in your browser. We use a limited set to remember
                language preference and support core functionality.
              </p>
            </LegalSection>

            <LegalSection title="Essential cookies">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-foreground font-medium">vitaself-lang</strong> — Stores
                  your language choice (essential). Duration: 1 year.
                </li>
              </ul>
            </LegalSection>

            <LegalSection title="Analytics cookies">
              <p>
                <strong className="text-foreground font-medium">Vercel Analytics</strong> — Used only
                in production for anonymous traffic statistics.
              </p>
            </LegalSection>

            <LegalSection title="Advertising cookies">
              <p>
                We use third-party advertising cookies to measure campaign performance and show
                relevant ads. These may include Meta (Facebook) Pixel and Google Ads conversion /
                remarketing cookies.
              </p>
              <p>
                They may associate events such as page views, add-to-cart, and purchases with anonymous
                or pseudonymous identifiers. We do not sell personal data; ad partners are governed
                by their own privacy policies.
              </p>
            </LegalSection>

            <LegalSection title="Storage beyond cookies">
              <p>
                Your cart is stored in the browser&apos;s{' '}
                <strong className="text-foreground font-medium">localStorage</strong>, which is not
                a cookie. Clearing site data resets your cart.
              </p>
            </LegalSection>

            <LegalSection title="Managing preferences">
              <p>
                Essential cookies are required for language to work correctly. You may limit analytics
                and advertising cookies via browser settings, ad preference centres (Google, Meta),
                or relevant browser extensions.
              </p>
              <p>
                Questions:{' '}
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
