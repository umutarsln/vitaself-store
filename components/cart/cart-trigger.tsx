'use client'

import { motion, useAnimation } from 'motion/react'
import { ShoppingBag } from 'lucide-react'
import { useEffect } from 'react'
import { useCart } from '@/lib/cart'
import { useLanguage } from '@/lib/i18n'

type CartTriggerProps = {
  className?: string
}

/** Header sepet butonu — ekleme anında nabız animasyonu. */
export function CartTrigger({ className }: CartTriggerProps) {
  const { d } = useLanguage()
  const { count, pulseKey, openCart } = useCart()
  const controls = useAnimation()

  /** Sepete ekleme olduğunda ikon ve rozeti kısa süre vurgular. */
  useEffect(() => {
    if (pulseKey === 0) return
    void controls.start({
      scale: [1, 1.12, 0.96, 1],
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    })
  }, [pulseKey, controls])

  return (
    <button
      type="button"
      onClick={openCart}
      className={`text-foreground/70 hover:text-foreground relative flex size-10 items-center justify-center rounded-full transition-colors ${className ?? ''}`}
    >
      <motion.span animate={controls} className="relative flex items-center justify-center">
        <ShoppingBag className="size-[18px]" strokeWidth={1.4} />
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 520, damping: 22 }}
            className="bg-primary text-primary-foreground absolute -top-1.5 -right-2 flex min-w-4 items-center justify-center rounded-full px-1 py-0.5 text-[10px] font-medium"
          >
            {count}
          </motion.span>
        )}
        {pulseKey > 0 && (
          <motion.span
            key={pulseKey}
            initial={{ scale: 0.8, opacity: 0.55 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="bg-primary/30 pointer-events-none absolute inset-0 rounded-full"
            aria-hidden
          />
        )}
      </motion.span>
      <span className="sr-only">
        {d.nav.cart} ({count})
      </span>
    </button>
  )
}
