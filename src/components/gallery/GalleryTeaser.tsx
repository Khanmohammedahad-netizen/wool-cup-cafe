import Link from 'next/link';

export function GalleryTeaser() {
  return (
    <section className="bg-bg-secondary py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="font-ui uppercase tracking-[0.3em] text-xs text-brown/70 mb-3">
            The Space
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-brown">
            A glimpse inside.
          </h2>
        </div>

        {/* 3-photo grid: left tall, 2 stacked right */}
        <div className="grid grid-cols-2 grid-rows-2 gap-3 h-[420px] md:h-[540px]">
          <div className="row-span-2 relative overflow-hidden rounded-2xl">
            <img
              src="/images/new/interior-wide-cloud.jpg"
              alt="Wool Cup interior"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              fetchPriority="low"
            />
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src="/images/new/barista-pour.jpg"
              alt="Barista at work"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              fetchPriority="low"
            />
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src="/images/new/dessert-case.jpg"
              alt="Dessert display case"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              fetchPriority="low"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-end">
          <Link
            href="/gallery"
            className="font-ui text-sm uppercase tracking-[0.2em] text-dark/60 hover:text-dark transition-colors"
          >
            Explore the Gallery →
          </Link>
        </div>

      </div>
    </section>
  );
}
