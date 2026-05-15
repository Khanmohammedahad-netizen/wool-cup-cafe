'use client';

export function WoolcupHero() {
  return (
    <section className="relative min-h-[100dvh] flex items-end overflow-hidden">
      {/* Fullscreen video background */}
      <video
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/new/interior-wide-cloud.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        disablePictureInPicture
        disableRemotePlayback
      />

      {/* Gradient overlay — lighter at top, heavier at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/60" />

      {/* Text — anchored bottom-left */}
      <div className="relative z-10 px-6 md:px-12 pb-16 md:pb-20 max-w-3xl">
        <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-[#ead8b5]/60 mb-4">
          Specialty Coffee · Hyderabad
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-[#ead8b5] leading-[1.05]">
          Coffee,<br />Quieted.
        </h1>
        <p className="font-body text-base md:text-lg italic text-[#ead8b5]/70 mt-5 max-w-md leading-relaxed">
          Where every cup is a quiet ritual.
        </p>
        <p className="font-ui text-xs uppercase tracking-[0.2em] text-[#ead8b5]/50 mt-6">
          Film Nagar · Financial District
        </p>
      </div>
    </section>
  );
}
