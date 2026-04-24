'use client';

export function HeroVideo() {
  return (
    <>
      <style>{`
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        .animate-hero-poster {
          animation: kenBurns 12s ease-in-out infinite alternate;
        }
      `}</style>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/cup-poster.jpg"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover animate-hero-poster"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
    </>
  );
}
