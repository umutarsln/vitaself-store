'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { useCart } from '@/lib/cart'
import { useFeaturedVariant } from '@/lib/featured-variant'
import { useLanguage } from '@/lib/i18n'
import { dailyFoundation } from '@/lib/products'

/** Ana sayfa sticky satın alma çubuğu — featured’daki seçili varyantı kullanır. */
export function StickyBuyBar() {
  const { d, price } = useLanguage()
  const { add, openCart } = useCart()
  const featured = useFeaturedVariant()
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (value) => {
    const footer = document.getElementById('site-footer')
    const footerTop = footer ? footer.getBoundingClientRect().top + value : Number.POSITIVE_INFINITY
    setVisible(value > 1600 && value + window.innerHeight < footerTop + 120)
  })

  const variantId = featured?.variantId ?? dailyFoundation.variants[0].id
  const variant =
    dailyFoundation.variants.find((item) => item.id === variantId) ?? dailyFoundation.variants[0]
  const isSubscription = variant.sellingPlan === 'subscription'

  /** Seçili featured varyantı sepete ekler ve drawer’ı açar. */
  function handleAdd() {
    add(variant.id)
    openCart()
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 md:px-6 md:pb-6"
        >
          <div className="bg-card/85 shadow-float border-border/60 mx-auto flex w-full max-w-2xl items-center justify-between gap-4 rounded-full border py-3 pr-3 pl-6 backdrop-blur-xl">
            <div className="min-w-0">
              <p className="truncate text-sm tracking-tight">{d.featured.title}</p>
              <p className="text-muted-foreground text-xs">
                {price(variant.price)}
                {isSubscription ? ` · ${d.featured.options.save}` : ` · ${d.featured.options.once}`}
              </p>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="bg-primary text-primary-foreground inline-flex h-11 shrink-0 items-center rounded-full px-6 text-[13px] tracking-wide transition-transform duration-500 hover:-translate-y-0.5"
            >
              {d.featured.add}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
