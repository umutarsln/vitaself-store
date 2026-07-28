import type { Metadata } from 'next'
import { ContentPageShell } from '@/components/content/content-page-shell'

export const metadata: Metadata = {
  title: 'Terms of use',
  alternates: { canonical: '/legal/terms' },
}

/** Kullanım koşulları. */
export default function TermsPage() {
  return (
    <ContentPageShell eyebrowEn="Legal" eyebrowTr="Yasal" titleEn="Terms of use" titleTr="Kullanım koşulları">
      <p>
        By placing an order you confirm you are of legal age to purchase food supplements and that
        information provided at checkout is accurate. Products are not medicines and do not replace
        professional medical advice.
      </p>
      <p>
        Sipariş vererek takviye edici gıda satın alma yaşında olduğunuzu ve ödeme bilgilerinizin
        doğru olduğunu kabul edersiniz. Ürünler ilaç değildir; tıbbi tavsiyenin yerini tutmaz.
      </p>
    </ContentPageShell>
  )
}
