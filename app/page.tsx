import { Benefits } from '@/components/sections/benefits'
import { Certificates } from '@/components/sections/certificates'
import { Comparison } from '@/components/sections/comparison'
import { Faq } from '@/components/sections/faq'
import { Hero } from '@/components/sections/hero'
import { Ingredients } from '@/components/sections/ingredients'
import { Lifestyle } from '@/components/sections/lifestyle'
import { Newsletter } from '@/components/sections/newsletter'
import { Science } from '@/components/sections/science'
import { HomeJsonLd } from '@/components/seo/json-ld'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

/** Ana sayfa — landing. */
export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <SiteHeader />
      <main>
        <Hero />
        <Benefits />
        <Ingredients />
        <Science />
        <Lifestyle />
        <Comparison />
        <Certificates />
        <Faq />
        <Newsletter />
      </main>
      <SiteFooter />
    </>
  )
}
