'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'

type PageTransitionProps = {
  children: ReactNode
}

/** Rota değişiminde sayfa içeriğine yumuşak giriş/çıkış animasyonu uygular. */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const reduce = useReducedMotion()

  /** Yeni sayfada görünümü en üste alır. */
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: reduce ? 'instant' : 'auto' })
  }, [pathname, reduce])

  if (reduce) {
    return <>{children}</>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
        transition={{
          duration: 0.52,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
