import type { Metadata } from 'next'
import { VitaselfLogo } from '@/components/brand/vitaself-logo'
import { ContentPageShell } from '@/components/content/content-page-shell'

export const metadata: Metadata = { title: 'Contact', alternates: { canonical: '/company/contact' } }

/** İletişim. */
export default function ContactPage() {
  return (
    <ContentPageShell eyebrowEn="Company" eyebrowTr="Kurumsal" titleEn="Contact" titleTr="İletişim">
      <VitaselfLogo size="lg" className="mb-2" />
      <p>Vitaself İlaç A.Ş. · Istanbul, Türkiye</p>
      <p>hello@vitaself.com · +90 (212) 000 00 00</p>
      <p>Support hours: weekdays 09:00–18:00 TRT / Destek: hafta içi 09:00–18:00.</p>
    </ContentPageShell>
  )
}
