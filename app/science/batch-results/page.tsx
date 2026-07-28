import type { Metadata } from 'next'
import Link from 'next/link'
import { ContentPageShell } from '@/components/content/content-page-shell'

export const metadata: Metadata = {
  title: 'Batch results',
  alternates: { canonical: '/science/batch-results' },
}

/** Parti sonuçları / COA. */
export default function BatchResultsPage() {
  return (
    <ContentPageShell
      eyebrowEn="Science"
      eyebrowTr="Bilim"
      titleEn="Batch results & COAs"
      titleTr="Parti sonuçları ve COA"
    >
      <p>
        Search certificates of analysis by the batch code printed on your bottle. Sample COA
        documents are linked below until the live lookup API is connected.
      </p>
      <p>
        Kutunuzdaki parti koduyla analiz sertifikalarını arayın. Canlı sorgu API’si bağlanana kadar
        örnek COA’lar aşağıdadır.
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <Link href="/docs/coa-sample.html" className="text-foreground underline-offset-4 hover:underline">
            Sample COA — Daily Foundation / Örnek COA
          </Link>
        </li>
        <li>
          <Link href="/docs/coa-gmp.html" className="text-foreground underline-offset-4 hover:underline">
            GMP certificate summary / GMP özeti
          </Link>
        </li>
      </ul>
    </ContentPageShell>
  )
}
