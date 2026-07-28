'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  blur?: boolean
  className?: string
  as?: 'div' | 'section' | 'li' | 'span' | 'p' | 'h2'
}

/** Apple-style soft reveal: short travel, gentle blur, no bounce. */
export function Reveal({ children, delay = 0, y = 24, blur = true, className, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] as typeof motion.div

  if (reduce) {
    return <MotionTag className={className}>{children}</MotionTag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}

/** Section shell that keeps the editorial grid and vertical rhythm consistent. */
export function Section({
  children,
  className = '',
  id,
  label,
}: {
  children: ReactNode
  className?: string
  id?: string
  label?: string
}) {
  return (
    <section id={id} aria-label={label} className={`px-6 py-24 md:px-10 md:py-36 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`text-eyebrow text-muted-foreground ${className}`}>{children}</p>
}
