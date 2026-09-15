import type { Metadata } from 'next'
import { ContentPageShell } from '@/components/content/content-page-shell'
import { seller } from '@/lib/site'

export const metadata: Metadata = { title: 'About Vitaself', alternates: { canonical: '/company/about' } }

/** Hakkımızda. */
export default function AboutPage() {
  return (
    <ContentPageShell eyebrowEn="Company" eyebrowTr="Kurumsal" titleEn="About Vitaself" titleTr="Vitaself hakkında">
      <p>
        {seller.brand} is a Turkish pharmaceutical brand formulating clinically dosed daily supplements in
        a GMP facility in Istanbul. Transparent milligram doses. Third-party testing every batch.
      </p>
      <p>
        {seller.brand}, İstanbul’daki GMP tesisinde klinik dozlu günlük takviyeler geliştiren bir Türk
        markasıdır. Şeffaf miligram dozlar. Her parti bağımsız test.
      </p>
      <p>
        Satıcı: {seller.legalName}. Yasal adres: {seller.addressLine}.
      </p>
    </ContentPageShell>
  )
}
