import { Navbar } from '@/components/navbar/Navbar';
import { HeroFilm } from '@/components/hero/HeroFilm';
import { Manifesto } from '@/components/manifesto/Manifesto';
import { CupSequence } from '@/components/cup-sequence/CupSequence';
import { CraftTriptych } from '@/components/craft/CraftTriptych';
import { Ambience } from '@/components/ambience/Ambience';
import { MenuHighlight } from '@/components/menu/MenuHighlight';
import { InstagramFeed } from '@/components/instagram/InstagramFeed';
import { Visit } from '@/components/visit/Visit';
import { Footer } from '@/components/footer/Footer';

export default function Home() {
  return (
    <main className="relative flex flex-col bg-bg-primary min-h-screen noise-overlay fade-up-enter fade-up-enter-active">
      <Navbar />
      <HeroFilm />
      <Manifesto />
      <CupSequence />
      <CraftTriptych />
      <Ambience />
      <MenuHighlight />
      <InstagramFeed />
      <Visit />
      <Footer />
    </main>
  );
}
