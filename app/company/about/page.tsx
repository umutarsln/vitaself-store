import type { Metadata } from 'next'
import { ContentPageShell } from '@/components/content/content-page-shell'

export const metadata: Metadata = { title: 'About Vitaself', alternates: { canonical: '/company/about' } }

/** Hakkımızda. */
export default function AboutPage() {
  return (
    <ContentPageShell eyebrowEn="Company" eyebrowTr="Kurumsal" titleEn="About Vitaself" titleTr="Vitaself hakkında">
      <p>
        Vitaself is a Turkish pharmaceutical brand formulating clinically dosed daily supplements in
        a GMP facility in Istanbul. Transparent milligram doses. Third-party testing every batch.
      </p>
      <p>
        Vitaself, İstanbul’daki GMP tesisinde klinik dozlu günlük takviyeler geliştiren bir Türk ilaç
        markasıdır. Şeffaf miligram dozlar. Her parti bağımsız test.
      </p>
    </ContentPageShell>
  )
}
