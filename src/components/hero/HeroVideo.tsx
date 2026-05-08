'use client';

export function HeroVideo() {
  return (
    <div className="relative w-full aspect-[9/16] md:aspect-video overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/cup-poster.jpg"
        className="w-full h-full object-cover"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      
      {/* Subtle bottom gradient for text readability */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(28,28,28,0.7) 0%, transparent 100%)'
        }}
      />
    </div>
  );
}
