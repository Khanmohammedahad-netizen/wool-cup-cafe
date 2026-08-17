import type { Metadata } from 'next';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { Footer } from '@/components/footer/Footer';

export const metadata: Metadata = {
  title: 'Gallery | Wool Cup Urban Café',
  description: 'Photos of the space, the coffee, and the quiet moments at Wool Cup, Hyderabad.',
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-bg">
      {/* Page hero — pt-28 clears the fixed navbar */}
      <div className="pt-28 pb-4 px-6 md:px-12 max-w-7xl mx-auto">
        <p className="font-ui uppercase tracking-[0.3em] text-xs text-brown/70 mb-4">
          Photos
        </p>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-brown leading-none">
          Our Gallery
        </h1>
        <p className="font-body text-base text-dark/50 mt-4 max-w-md">
          Spaces, coffee, and quiet moments from both our locations in Hyderabad.
        </p>
      </div>

      <GalleryGrid />
      <Footer />
    </main>
  );
}
