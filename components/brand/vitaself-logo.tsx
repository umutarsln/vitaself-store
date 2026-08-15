import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const sizeMap = {
  sm: { width: 140, height: 48, wordmark: 'text-xl', tag: 'text-[8px]' },
  md: { width: 168, height: 58, wordmark: 'text-2xl', tag: 'text-[9px]' },
  lg: { width: 210, height: 72, wordmark: 'text-3xl', tag: 'text-[10px]' },
} as const

type VitaselfLogoProps = {
  /** Açık zeminlerde PNG, koyu zeminlerde tipografik ters renk. */
  variant?: 'default' | 'inverse'
  size?: keyof typeof sizeMap
  asLink?: boolean
  className?: string
}

/** Seçilen Vitaself wordmark logosunu sayfa bağlamına göre render eder. */
export function VitaselfLogo({
  variant = 'default',
  size = 'md',
  asLink = false,
  className,
}: VitaselfLogoProps) {
  const dimensions = sizeMap[size]
  const isInverse = variant === 'inverse'

  const content = isInverse ? (
    <div className={cn('flex flex-col items-start leading-none', className)}>
      <span className={cn('text-display text-background', dimensions.wordmark)}>Vitaself</span>
      <span
        className={cn(
          'text-background/55 mt-1.5 uppercase tracking-[0.28em]',
          dimensions.tag,
        )}
      >
        Pharma
      </span>
    </div>
  ) : (
    <Image
      src="/brand/vitaself-logo.png"
      alt="Vitaself Pharma"
      width={dimensions.width}
      height={dimensions.height}
      className={cn('h-auto w-auto max-w-none', className)}
      priority={size === 'lg'}
    />
  )

  if (asLink) {
    return (
      <Link href="/" className="inline-flex shrink-0">
        {content}
      </Link>
    )
  }

  return content
}
