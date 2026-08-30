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
        Magnesium citrate, malate, and bisglycinate each do different work. Glucosamine, chondroitin,
        and MSM support cartilage and movement. The digital panel lists the same actives as the
        printed insert in every box.
      </p>
      <p>
        Magnezyum sitrat, malat ve bisglisinat ayrı iş görür. Glukozamin, kondroitin ve MSM kıkırdak
        ve hareketi destekler. Dijital panel, kutudaki basılı ekle aynı aktifleri listeler.
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
