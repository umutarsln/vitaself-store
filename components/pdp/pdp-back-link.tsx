'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

/** PDP üstü geri dönüş bağlantısı. */
export function PdpBackLink() {
  const { d } = useLanguage()

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pt-28 md:px-10 md:pt-32">
      <Link
        href="/products"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm tracking-wide transition-colors duration-200"
      >
        <ArrowLeft className="size-4" strokeWidth={1.5} />
        {d.pdp.back}
      </Link>
    </div>
  )
}
