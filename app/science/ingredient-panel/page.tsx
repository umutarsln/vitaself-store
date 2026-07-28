import type { Metadata } from 'next'
import Link from 'next/link'
import { ContentPageShell } from '@/components/content/content-page-shell'

export const metadata: Metadata = {
  title: 'Ingredient panel',
  alternates: { canonical: '/science/ingredient-panel' },
}

/** Tam içerik paneli. */
export default function IngredientPanelPage() {
  return (
    <ContentPageShell
      eyebrowEn="Science"
      eyebrowTr="Bilim"
      titleEn="Full ingredient panel"
      titleTr="Tam içerik paneli"
    >
      <p>
        Thirty-two actives with source origin and assay method. A printed panel ships in every box;
        the digital panel mirrors the same data.
      </p>
      <p>
        Otuz iki aktif; kaynak ülke ve analiz yöntemiyle. Kutuda basılı panel gelir; dijital panel
        aynı veriyi yansıtır.
      </p>
      <p>
        <Link
          href="/docs/ingredient-panel.html"
          className="text-foreground underline-offset-4 hover:underline"
        >
          Open full panel / Tam paneli aç
        </Link>
      </p>
    </ContentPageShell>
  )
}
