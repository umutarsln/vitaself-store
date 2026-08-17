'use client'

import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  blur?: boolean
  className?: string
  as?: 'div' | 'section' | 'li' | 'span' | 'p' | 'h2'
}

/** Bölüm sarmalayıcı — e-ticaret akışında animasyonsuz. */
export function Reveal({ children, className, as = 'div' }: RevealProps) {
  const Tag = as
  return <Tag className={className}>{children}</Tag>
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
