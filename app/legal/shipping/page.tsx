import type { Metadata } from 'next'
import { ContentPageShell } from '@/components/content/content-page-shell'

export const metadata: Metadata = {
  title: 'Shipping & returns',
  alternates: { canonical: '/legal/shipping' },
}

/** Kargo ve iade. */
export default function ShippingPage() {
  return (
    <ContentPageShell
      eyebrowEn="Legal"
      eyebrowTr="Yasal"
      titleEn="Shipping & returns"
      titleTr="Kargo ve iade"
    >
      <p>
        Orders ship within 24 hours on business days. Free shipping unlocks over $60 / ₺1.500. You
        may return within 60 days for a full product refund, even if the bottle is empty.
      </p>
      <p>
        Siparişler iş günlerinde 24 saat içinde kargoya verilir. 60 / ₺1.500 üzeri ücretsiz kargo.
        60 gün içinde, kutu boşalsa bile tam ürün iadesi yapabilirsiniz.
      </p>
    </ContentPageShell>
  )
}
