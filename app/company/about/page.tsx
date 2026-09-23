import type { Metadata } from 'next'
import { ContentPageShell } from '@/components/content/content-page-shell'
import { manufacturer, seller } from '@/lib/site'

export const metadata: Metadata = { title: 'About Vitaself', alternates: { canonical: '/company/about' } }

/** Hakkımızda. */
export default function AboutPage() {
  return (
    <ContentPageShell eyebrowEn="Company" eyebrowTr="Kurumsal" titleEn="About Vitaself" titleTr="Vitaself hakkında">
      <p>
        {seller.brand} offers clinically dosed daily food supplements. They are not medicines. Each
        batch is independently tested. The labelled food business operator is in Aksu / Antalya; the
        online seller is a company based in Kepez / Antalya.
      </p>
      <p>
        {seller.brand}, klinik dozlu günlük takviye edici gıdalar sunar; ilaç değildir. Her parti
        bağımsız test edilir. Ambalajdaki gıda işletmecisi Aksu / Antalya’dadır; online satıcı Kepez
        / Antalya’da yerleşik bir şirkettir.
      </p>
      <p>
        Satıcı: {seller.legalName}. Şirket merkezi: {seller.addressLine}. Ticari unvan, MERSİS ve
        vergi kimlik numarası satıcı tarafından ayrıca bildirilecektir.
      </p>
      <p>
        Gıda işletmecisi: {manufacturer.tradeName}, {manufacturer.addressLine}. İşletme kayıt no:{' '}
        {manufacturer.facilityRegNo}. TEG onay no: {manufacturer.tegApprovalNo}. Menşei:{' '}
        {manufacturer.originCountry}.
      </p>
    </ContentPageShell>
  )
}
