import type { Metadata } from 'next'
import { CakesHero } from '@/components/cakes/CakesHero'
import { CakesGallery } from '@/components/cakes/CakesGallery'
import { CakesHowItWorks } from '@/components/cakes/CakesHowItWorks'
import { Footer } from '@/components/footer/Footer'

export const metadata: Metadata = {
  title: 'Custom Cakes — Wool Cup Urban Café & Bistro',
  description: 'Handcrafted celebration cakes designed for your special moments. Order custom cakes from Wool Cup, Hyderabad.',
}

export default function CakesPage() {
  return (
    <main>
      <CakesHero />
      <CakesGallery />
      <CakesHowItWorks />
      <Footer />
    </main>
  )
}
