import type { Metadata } from 'next'
import Link from 'next/link'
import { ContentPageShell } from '@/components/content/content-page-shell'

export const metadata: Metadata = {
  title: 'White paper',
  alternates: { canonical: '/science/white-paper' },
}

/** Teknik rapor / white paper. */
export default function WhitePaperPage() {
  return (
    <ContentPageShell
      eyebrowEn="Science"
      eyebrowTr="Bilim"
      titleEn="Formulation white paper"
      titleTr="Formülasyon teknik raporu"
    >
      <p>
        This paper summarises dose rationale, bioavailability choices, and the three-lab release
        protocol used for every Vitaself batch.
      </p>
      <p>
        Bu rapor doz gerekçesini, biyoyararlanım seçimlerini ve her parti için üç laboratuvar salım
        protokolünü özetler.
      </p>
      <p>
        <Link href="/docs/white-paper.html" className="text-foreground underline-offset-4 hover:underline">
          Download HTML summary / HTML özeti indir
        </Link>
      </p>
    </ContentPageShell>
  )
}
