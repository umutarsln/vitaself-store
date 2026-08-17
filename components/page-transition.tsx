'use client'

import { usePathname } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'

type PageTransitionProps = {
  children: ReactNode
}

/** Rota değişiminde sayfayı en üste alır; sayfa geçiş animasyonu yok. */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  /** Yeni sayfada görünümü en üste alır. */
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return <>{children}</>
}
