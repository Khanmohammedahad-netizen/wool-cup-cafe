import type { Metadata } from 'next';
import { WoolcupHero } from '@/components/hero/WoolcupHero';
import { Manifesto } from '@/components/manifesto/Manifesto';
import { FoundersPreview } from '@/components/founders/FoundersPreview';
import { SocialProof } from '@/components/social-proof/SocialProof';
import { MenuHighlight } from '@/components/menu/MenuHighlight';
import { GalleryTeaser } from '@/components/gallery/GalleryTeaser';
import { Locations } from '@/components/locations/Locations';
import { Footer } from '@/components/footer/Footer';

export const metadata: Metadata = {
  title: 'Wool Cup Urban Café & Bistro — Hyderabad',
  description: 'A slow café for honest coffee, handcrafted food, and quiet mornings. Located in Hyderabad.',
  openGraph: {
    title: 'Wool Cup Urban Café & Bistro',
    description: 'Honest coffee. Handcrafted food. Hyderabad.',
  },
};

export default function Home() {
  return (
    <main className="relative flex flex-col bg-bg-primary min-h-screen noise-overlay fade-up-enter fade-up-enter-active">
      <WoolcupHero />
      <Manifesto />
      <FoundersPreview />
      <SocialProof />
      <MenuHighlight />
      <GalleryTeaser />
      <Locations />
      <Footer />
    </main>
  );
}
