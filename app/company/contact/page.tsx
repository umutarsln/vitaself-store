import type { Metadata } from 'next'
import { VitaselfLogo } from '@/components/brand/vitaself-logo'
import { ContentPageShell } from '@/components/content/content-page-shell'
import { manufacturer, seller } from '@/lib/site'

export const metadata: Metadata = { title: 'Contact', alternates: { canonical: '/company/contact' } }

/** İletişim. */
export default function ContactPage() {
  return (
    <ContentPageShell eyebrowEn="Company" eyebrowTr="Kurumsal" titleEn="Contact" titleTr="İletişim">
      <VitaselfLogo size="lg" className="mb-2" />
      <p>
        {seller.brand} · {seller.legalName}
      </p>
      <p>Satıcı adresi: {seller.addressLine}</p>
      <p>
        <a href={`mailto:${seller.emails.hello}`} className="text-foreground underline-offset-4 hover:underline">
          {seller.emails.hello}
        </a>
        {' · '}
        <a href={seller.phoneHref} className="text-foreground underline-offset-4 hover:underline">
          {seller.phoneDisplay}
        </a>
      </p>
      <p>
        Sipariş ve iade:{' '}
        <a href={`mailto:${seller.emails.support}`} className="text-foreground underline-offset-4 hover:underline">
          {seller.emails.support}
        </a>
      </p>
      <p>
        {seller.supportHoursEn} / {seller.supportHoursTr}
      </p>
      <p>
        Gıda işletmecisi (ambalaj): {manufacturer.tradeName}, {manufacturer.addressLine}. Kayıt no:{' '}
        {manufacturer.facilityRegNo}.
      </p>
    </ContentPageShell>
  )
}
