'use client';

export default function Marquee() {
  const text = "WOOL CUP  ✦  FILMNAGAR  ✦  SPECIALTY COFFEE  ✦  SINCE 2023  ✦  ";
  
  return (
    <div className="relative py-12 bg-bg-primary border-y border-charcoal/10 overflow-hidden group">
      <div className="flex whitespace-nowrap animate-marquee group-hover:pause">
        {Array.from({ length: 4 }).map((_, i) => (
          <span 
            key={i} 
            className="inline-block text-h1 font-display uppercase tracking-ultra text-charcoal/30 select-none px-4"
            style={{ WebkitTextStroke: '1px var(--charcoal)' }}
          >
            {text}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .group-hover\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
