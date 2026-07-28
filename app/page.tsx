import { Benefits } from '@/components/sections/benefits'
import { Certificates } from '@/components/sections/certificates'
import { Comparison } from '@/components/sections/comparison'
import { Doctor } from '@/components/sections/doctor'
import { Faq } from '@/components/sections/faq'
import { FeaturedProduct } from '@/components/sections/featured-product'
import { Hero } from '@/components/sections/hero'
import { Ingredients } from '@/components/sections/ingredients'
import { Lifestyle } from '@/components/sections/lifestyle'
import { Newsletter } from '@/components/sections/newsletter'
import { Reviews } from '@/components/sections/reviews'
import { Science } from '@/components/sections/science'
import { HomeJsonLd } from '@/components/seo/json-ld'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { StickyBuyBar } from '@/components/sticky-buy-bar'
import { FeaturedVariantProvider } from '@/lib/featured-variant'

/** Ana sayfa — landing + featured varyant paylaşımı. */
export default function HomePage() {
  return (
    <FeaturedVariantProvider>
      <HomeJsonLd />
      <SiteHeader />
      <main>
        <Hero />
        <FeaturedProduct />
        <Benefits />
        <Ingredients />
        <Science />
        <Lifestyle />
        <Comparison />
        <Reviews />
        <Certificates />
        <Doctor />
        <Faq />
        <Newsletter />
      </main>
      <SiteFooter />
      <StickyBuyBar />
    </FeaturedVariantProvider>
  )
}
