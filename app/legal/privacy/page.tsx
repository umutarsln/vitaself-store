import type { Metadata } from 'next'
import { ContentPageShell } from '@/components/content/content-page-shell'

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
      <p>
        Vitaself processes account, order, and support data only to fulfil purchases and
        regulatory obligations. We do not sell personal data.
      </p>
      <p>
        Controllers: Vitaself İlaç A.Ş., Istanbul. Contact: privacy@vitaself.com. Retention follows
        tax and pharmacovigilance requirements, then secure deletion.
      </p>
      <p>
        Vitaself; hesap, sipariş ve destek verilerini yalnızca sipariş ve yasal
        yükümlülükler için işler. Kişisel verileri satmayız. İletişim: privacy@vitaself.com.
      </p>
    </ContentPageShell>
  )
}
