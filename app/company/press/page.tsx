import type { Metadata } from 'next'
import { ContentPageShell } from '@/components/content/content-page-shell'

export const metadata: Metadata = { title: 'Press', alternates: { canonical: '/company/press' } }

/** Basın. */
export default function PressPage() {
  return (
    <ContentPageShell eyebrowEn="Company" eyebrowTr="Kurumsal" titleEn="Press" titleTr="Basın">
      <p>
        Media kit and interview requests: press@vitaself.com. Brand assets are available on request.
      </p>
      <p>Medya kiti ve röportaj talepleri: press@vitaself.com. Marka varlıkları talep üzerine.</p>
    </ContentPageShell>
  )
}
