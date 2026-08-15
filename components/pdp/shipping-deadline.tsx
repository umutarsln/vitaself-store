'use client'

import { useEffect, useState } from 'react'
import { Package } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

/** Gün bazlı kargo kesim saatlerini tanımlar. */
const CUTOFF_HOURS: Record<number, number> = {
  0: -1,  // Pazar — kesim saati yok
  1: 13,  // Pazartesi
  2: 13,  // Salı
  3: 13,  // Çarşamba
  4: 13,  // Perşembe
  5: 13,  // Cuma
  6: 16,  // Cumartesi
}

type ShipStatus =
  | { kind: 'today'; countdown: string }
  | { kind: 'tomorrow' }
  | { kind: 'monday' }

/** Şu anki zamana göre kargo durumunu hesaplar (Türkiye saati). */
function computeStatus(now: Date): ShipStatus {
  // UTC+3 offset — sunucu/istemci ikisi de aynı davransın diye sabit offset
  const tzOffset = 3 * 60
  const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes()
  const localMinutes = (utcMinutes + tzOffset) % (24 * 60)
  const localHour = Math.floor(localMinutes / 60)
  const localMin = localMinutes % 60

  const localDay = (() => {
    const utcDay = now.getUTCDay()
    const totalMin = now.getUTCHours() * 60 + now.getUTCMinutes() + tzOffset
    return (utcDay + Math.floor(totalMin / (24 * 60))) % 7
  })()

  const cutoff = CUTOFF_HOURS[localDay] ?? -1

  if (cutoff < 0) {
    // Pazar veya tanımsız gün → Pazartesi kargo
    return { kind: 'monday' }
  }

  const cutoffMinutes = cutoff * 60
  const remainingMinutes = cutoffMinutes - localMinutes

  if (remainingMinutes > 0) {
    // Kesim saatine kadar vakit var — geri sayım göster
    const h = Math.floor(remainingMinutes / 60)
    const m = remainingMinutes % 60
    const padded = `${String(cutoff).padStart(2, '0')}:00`
    const timeLeft = h > 0 ? `${h}s ${m}dk` : `${m}dk`
    return { kind: 'today', countdown: `${padded} — ${timeLeft} kaldı` }
  }

  // Kesim saatini geçtik
  if (localDay === 6) {
    // Cumartesi kesimini geçti → Pazartesi
    return { kind: 'monday' }
  }

  // Hafta içi kesimini geçti → Yarın
  if (localDay === 5) {
    // Cuma → Pazartesi (hafta sonu yok)
    return { kind: 'monday' }
  }

  return { kind: 'tomorrow' }
}

/** PDP'de kargo kesim saati ve durumunu gösterir. */
export function ShippingDeadline() {
  const { d } = useLanguage()
  const [status, setStatus] = useState<ShipStatus>(() => computeStatus(new Date()))

  useEffect(() => {
    // Her dakika güncelle
    const interval = setInterval(() => {
      setStatus(computeStatus(new Date()))
    }, 60_000)
    return () => clearInterval(interval)
  }, [])

  const dl = d.pdp.shippingDeadline

  if (status.kind === 'today') {
    return (
      <div className="flex items-center gap-2.5 rounded-xl bg-positive/10 px-3.5 py-2.5 text-sm">
        <Package className="text-positive-foreground size-4 shrink-0" strokeWidth={1.6} />
        <div>
          <span className="text-positive-foreground font-medium">{dl.todayShips}</span>
          <span className="text-muted-foreground ml-1.5 text-xs">{status.countdown}</span>
        </div>
      </div>
    )
  }

  if (status.kind === 'monday') {
    return (
      <div className="flex items-center gap-2.5 rounded-xl bg-muted/60 px-3.5 py-2.5 text-sm">
        <Package className="text-muted-foreground size-4 shrink-0" strokeWidth={1.6} />
        <span className="text-muted-foreground">{dl.mondayShips}</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-muted/60 px-3.5 py-2.5 text-sm">
      <Package className="text-muted-foreground size-4 shrink-0" strokeWidth={1.6} />
      <span className="text-muted-foreground">{dl.tomorrowShips}</span>
    </div>
  )
}
