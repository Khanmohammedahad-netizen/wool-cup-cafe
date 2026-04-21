'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[1001] pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-caramel via-gold to-caramel transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(200,149,108,0.5)]"
        style={{ 
          width: `${progress}%`,
        }}
      />
    </div>
  );
}
