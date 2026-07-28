'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useLanguage } from '@/lib/i18n'

/** PDP üstü geri dönüş bağlantısı. */
export function PdpBackLink() {
  const { d } = useLanguage()
  const reduce = useReducedMotion()

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pt-28 md:px-10 md:pt-32">
      <motion.div
        initial={reduce ? false : { opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link
          href="/products"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm tracking-wide transition-colors duration-300"
        >
          <ArrowLeft className="size-4" strokeWidth={1.5} />
          {d.pdp.back}
        </Link>
      </motion.div>
    </div>
  )
}
