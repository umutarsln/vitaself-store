import type { Metadata } from 'next'
import { ContentPageShell } from '@/components/content/content-page-shell'

export const metadata: Metadata = {
  title: 'Scientific board',
  alternates: { canonical: '/company/scientific-board' },
}

/** Bilim kurulu. */
export default function ScientificBoardPage() {
  return (
    <ContentPageShell
      eyebrowEn="Company"
      eyebrowTr="Kurumsal"
      titleEn="Scientific board"
      titleTr="Bilim kurulu"
    >
      <p>
        Nine physicians and pharmacologists review every formula before production. Chair: Dr. Ayşe
        Demir, Internal Medicine.
      </p>
      <p>
        Formüller üretilmeden önce dokuz hekim ve farmakolog tarafından incelenir. Başkan: Dr. Ayşe
        Demir, İç Hastalıkları.
      </p>
    </ContentPageShell>
  )
}
