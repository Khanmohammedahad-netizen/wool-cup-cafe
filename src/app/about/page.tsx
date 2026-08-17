import type { Metadata } from 'next'
import { AboutHero } from '@/components/about/AboutHero'
import { AboutOrigin } from '@/components/about/AboutOrigin'
import { AboutPeople } from '@/components/about/AboutPeople'
import { AboutPhilosophy } from '@/components/about/AboutPhilosophy'
import { AboutFounderQuote } from '@/components/about/AboutFounderQuote'
import { Footer } from '@/components/footer/Footer'

export const metadata: Metadata = {
  title: 'Our Story | Wool Cup Urban Café & Bistro',
  description: 'The journey behind Wool Cup. Born in Film Nagar, Hyderabad, a sanctuary of comfort, craft, and connection.',
}

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutOrigin />
      <AboutPeople />
      <AboutPhilosophy />
      <AboutFounderQuote />
      <Footer />
    </main>
  )
}
