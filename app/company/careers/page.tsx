import type { Metadata } from 'next'
import { ContentPageShell } from '@/components/content/content-page-shell'

export const metadata: Metadata = { title: 'Careers', alternates: { canonical: '/company/careers' } }

/** Kariyer. */
export default function CareersPage() {
  return (
    <ContentPageShell eyebrowEn="Company" eyebrowTr="Kurumsal" titleEn="Careers" titleTr="Kariyer">
      <p>
        We hire slowly: formulation, quality, and clinical communications. Open roles: careers@vitaself.com.
      </p>
      <p>
        Formülasyon, kalite ve klinik iletişimde yavaş ve seçici işe alım yaparız. Açık roller:
        careers@vitaself.com.
      </p>
    </ContentPageShell>
  )
}
