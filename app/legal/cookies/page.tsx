import type { Metadata } from 'next'
import { ContentPageShell } from '@/components/content/content-page-shell'

export const metadata: Metadata = {
  title: 'Cookie preferences',
  alternates: { canonical: '/legal/cookies' },
}

/** Çerez tercihleri. */
export default function CookiesPage() {
  return (
    <ContentPageShell
      eyebrowEn="Legal"
      eyebrowTr="Yasal"
      titleEn="Cookie preferences"
      titleTr="Çerez tercihleri"
    >
      <p>
        We use essential cookies for cart persistence and language preference. Analytics run only in
        production via Vercel Analytics. No advertising cookies are set today.
      </p>
      <p>
        Sepet ve dil tercihi için zorunlu çerezler kullanırız. Analitik yalnızca production’da
        Vercel Analytics ile çalışır. Reklam çerezi kullanılmaz.
      </p>
    </ContentPageShell>
  )
}
