import type { Metadata } from 'next'
import { MenuHero } from '@/components/menu/MenuHero'
import { MenuNewAdditions } from '@/components/menu/MenuNewAdditions'
import { MenuSeasonalSpecials } from '@/components/menu/MenuSeasonalSpecials'
import { MenuMustTries } from '@/components/menu/MenuMustTries'
import { MenuFullMenu } from '@/components/menu/MenuFullMenu'
import { MenuDietary } from '@/components/menu/MenuDietary'
import { Footer } from '@/components/footer/Footer'

export const metadata: Metadata = {
  title: 'Menu — Wool Cup Urban Café & Bistro',
  description: 'Specialty coffee, artisanal desserts, and handcrafted dishes at Wool Cup. View our full menu.',
}

export default function MenuPage() {
  return (
    <main>
      <MenuHero />
      <MenuNewAdditions />
      <MenuSeasonalSpecials />
      <MenuMustTries />
      <MenuFullMenu />
      <MenuDietary />
      <Footer />
    </main>
  )
}
