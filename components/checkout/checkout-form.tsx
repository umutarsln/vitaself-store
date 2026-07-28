'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { useCart } from '@/lib/cart'
import { useLanguage } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n/types'
import { LAST_ORDER_KEY, type CheckoutOrder, type CheckoutPaymentMethod } from '@/lib/orders'
import {
  addMoney,
  copy,
  findVariantById,
  lineTotal,
  shippingForSubtotal,
} from '@/lib/products'
import { cn } from '@/lib/utils'

const DEFAULT_COUNTRY: Record<Lang, string> = {
  tr: 'Türkiye',
  en: 'United States',
  de: 'Deutschland',
  ru: 'Россия',
}

/** Checkout formu — müşteri, adres, ödeme, sipariş özeti. */
export function CheckoutForm() {
  const router = useRouter()
  const { d, lang, price } = useLanguage()
  const { lines, count, subtotal, clear, hydrated, openCart } = useCart()

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState(DEFAULT_COUNTRY[lang])
  const [paymentMethod, setPaymentMethod] = useState<CheckoutPaymentMethod>('card')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const shipping = shippingForSubtotal(subtotal)
  const total = addMoney(subtotal, shipping)

  const resolvedLines = useMemo(
    () =>
      lines
        .map((line) => {
          const resolved = findVariantById(line.variantId)
          if (!resolved) return null
          return { line, ...resolved }
        })
        .filter(Boolean),
    [lines],
  )

  /** Checkout API’ye sipariş gönderir ve başarı sayfasına yönlendirir. */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (count === 0 || submitting) return

    if (paymentMethod === 'card') {
      const digits = cardNumber.replace(/\s/g, '')
      if (digits.length < 12 || !cardExpiry.trim() || cardCvc.trim().length < 3) {
        setError(d.checkout.errors.card)
        return
      }
    }

    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lines,
          customer: { email, firstName, lastName, phone },
          shippingAddress: { line1, line2, city, state, postalCode, country },
          paymentMethod,
          lang,
          notes: notes.trim() || undefined,
        }),
      })

      const data = (await response.json()) as { order?: CheckoutOrder; error?: string }
      if (!response.ok || !data.order) {
        throw new Error(data.error || d.checkout.errors.generic)
      }

      try {
        window.sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(data.order))
      } catch {
        // sessionStorage engelli olabilir
      }

      clear()
      router.push(`/checkout/success?order=${encodeURIComponent(data.order.id)}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : d.checkout.errors.generic)
      setSubmitting(false)
    }
  }

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-32 md:px-10">
        <p className="text-muted-foreground text-sm">{d.checkout.loading}</p>
      </div>
    )
  }

  if (count === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-36 text-center md:px-10">
        <p className="text-eyebrow text-muted-foreground">{d.checkout.eyebrow}</p>
        <h1 className="text-display mt-4 text-[clamp(2.2rem,6vw,3.5rem)]">{d.checkout.emptyTitle}</h1>
        <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{d.checkout.emptyBody}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/products"
            className="bg-foreground text-background inline-flex h-12 items-center rounded-full px-7 text-sm tracking-wide"
          >
            {d.checkout.browse}
          </Link>
          <button
            type="button"
            onClick={openCart}
            className="text-foreground inline-flex h-12 items-center text-sm tracking-wide underline-offset-4 hover:underline"
          >
            {d.checkout.openCart}
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-28 md:px-10 md:py-36 lg:grid-cols-[1.15fr_0.85fr]">
      <div>
        <p className="text-eyebrow text-muted-foreground">{d.checkout.eyebrow}</p>
        <h1 className="text-display mt-4 text-[clamp(2.4rem,6vw,3.75rem)]">{d.checkout.title}</h1>
        <p className="text-muted-foreground mt-4 max-w-lg text-sm leading-relaxed">{d.checkout.body}</p>

        <fieldset className="mt-12">
          <legend className="text-eyebrow text-muted-foreground">{d.checkout.contact}</legend>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label={d.checkout.fields.email} className="sm:col-span-2">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className={inputClass}
              />
            </Field>
            <Field label={d.checkout.fields.firstName}>
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
                className={inputClass}
              />
            </Field>
            <Field label={d.checkout.fields.lastName}>
              <input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
                className={inputClass}
              />
            </Field>
            <Field label={d.checkout.fields.phone} className="sm:col-span-2">
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                className={inputClass}
              />
            </Field>
          </div>
        </fieldset>

        <fieldset className="mt-12">
          <legend className="text-eyebrow text-muted-foreground">{d.checkout.shipping}</legend>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label={d.checkout.fields.line1} className="sm:col-span-2">
              <input
                required
                value={line1}
                onChange={(e) => setLine1(e.target.value)}
                autoComplete="address-line1"
                className={inputClass}
              />
            </Field>
            <Field label={d.checkout.fields.line2} className="sm:col-span-2">
              <input
                value={line2}
                onChange={(e) => setLine2(e.target.value)}
                autoComplete="address-line2"
                className={inputClass}
              />
            </Field>
            <Field label={d.checkout.fields.city}>
              <input
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                autoComplete="address-level2"
                className={inputClass}
              />
            </Field>
            <Field label={d.checkout.fields.state}>
              <input
                value={state}
                onChange={(e) => setState(e.target.value)}
                autoComplete="address-level1"
                className={inputClass}
              />
            </Field>
            <Field label={d.checkout.fields.postalCode}>
              <input
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                autoComplete="postal-code"
                className={inputClass}
              />
            </Field>
            <Field label={d.checkout.fields.country}>
              <input
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                autoComplete="country-name"
                className={inputClass}
              />
            </Field>
          </div>
        </fieldset>

        <fieldset className="mt-12">
          <legend className="text-eyebrow text-muted-foreground">{d.checkout.payment}</legend>
          <div className="mt-5 flex flex-col gap-3">
            {(
              [
                { id: 'card', label: d.checkout.payCard, note: d.checkout.payCardNote },
                { id: 'transfer', label: d.checkout.payTransfer, note: d.checkout.payTransferNote },
              ] as const
            ).map((method) => (
              <label
                key={method.id}
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-4 transition-all ${
                  paymentMethod === method.id
                    ? 'border-primary/40 bg-card shadow-soft'
                    : 'border-border hover:border-foreground/25'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === method.id}
                  onChange={() => setPaymentMethod(method.id)}
                  className="mt-1"
                />
                <span>
                  <span className="block text-sm tracking-tight">{method.label}</span>
                  <span className="text-muted-foreground mt-1 block text-xs leading-relaxed">
                    {method.note}
                  </span>
                </span>
              </label>
            ))}
          </div>

          {paymentMethod === 'card' && (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label={d.checkout.fields.cardNumber} className="sm:col-span-2">
                <input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="4242 4242 4242 4242"
                  className={inputClass}
                />
              </Field>
              <Field label={d.checkout.fields.cardExpiry}>
                <input
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  autoComplete="cc-exp"
                  placeholder="MM/YY"
                  className={inputClass}
                />
              </Field>
              <Field label={d.checkout.fields.cardCvc}>
                <input
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value)}
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="123"
                  className={inputClass}
                />
              </Field>
            </div>
          )}
        </fieldset>

        <fieldset className="mt-12">
          <legend className="text-eyebrow text-muted-foreground">{d.checkout.notes}</legend>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className={`${inputClass} mt-5 resize-none`}
            placeholder={d.checkout.notesPlaceholder}
          />
        </fieldset>

        {error && (
          <p className="text-destructive mt-6 text-sm" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={cn(
            buttonVariants({ variant: 'default', size: 'lg' }),
            'bg-primary text-primary-foreground shadow-soft hover:shadow-float mt-8 h-13 min-w-52 rounded-full px-8 text-sm tracking-wide transition-all duration-500 hover:-translate-y-0.5',
          )}
        >
          {submitting ? d.checkout.submitting : `${d.checkout.placeOrder} · ${price(total)}`}
        </button>
        <p className="text-muted-foreground mt-4 max-w-md text-xs leading-relaxed">
          {d.checkout.demoNote}
        </p>
      </div>

      <aside className="lg:sticky lg:top-32 lg:self-start">
        <div className="bg-ivory border-border/60 rounded-[2rem] border p-6 md:p-7">
          <h2 className="text-display text-2xl">{d.checkout.summary}</h2>
          <ul className="mt-6 flex flex-col gap-4">
            {resolvedLines.map((item) => {
              if (!item) return null
              const { line, product, variant } = item
              return (
                <li key={line.variantId} className="flex gap-3">
                  <div className="bg-card relative size-16 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={product.featuredImage.url}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{copy(product.title, lang)}</p>
                    <p className="text-muted-foreground text-xs">
                      {variant.title} · ×{line.quantity}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm">
                    {price(lineTotal(variant.price, line.quantity))}
                  </p>
                </li>
              )
            })}
          </ul>

          <dl className="mt-6 space-y-2 border-t border-border/70 pt-5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">{d.cart.subtotal}</dt>
              <dd>{price(subtotal)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">{d.cart.shipping}</dt>
              <dd>
                {shipping.usd === 0 && shipping.try === 0 ? d.cart.shippingFree : price(shipping)}
              </dd>
            </div>
            <div className="flex justify-between gap-4 pt-2 text-base">
              <dt>{d.cart.total}</dt>
              <dd className="text-display text-2xl">{price(total)}</dd>
            </div>
          </dl>
        </div>
      </aside>
    </form>
  )
}

const inputClass =
  'border-border bg-background focus:border-primary/40 focus:ring-primary/20 w-full rounded-2xl border px-4 py-3 text-sm outline-none transition-colors focus:ring-2'

type FieldProps = {
  label: string
  children: ReactNode
  className?: string
}

/** Etiketli form alanı sarmalayıcısı. */
function Field({ label, children, className = '' }: FieldProps) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-muted-foreground text-xs tracking-wide">{label}</span>
      {children}
    </label>
  )
}
