'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleSound = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      // Fade out
      const fadeOut = setInterval(() => {
        if (audioRef.current && audioRef.current.volume > 0.05) {
          audioRef.current.volume -= 0.05;
        } else {
          clearInterval(fadeOut);
          audioRef.current?.pause();
          setIsPlaying(false);
        }
      }, 50);
    } else {
      audioRef.current.volume = 0;
      audioRef.current.play();
      setIsPlaying(true);
      // Fade in
      const fadeIn = setInterval(() => {
        if (audioRef.current && audioRef.current.volume < 0.15) {
          audioRef.current.volume += 0.01;
        } else {
          clearInterval(fadeIn);
        }
      }, 50);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[1002]">
      <button
        onClick={toggleSound}
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border overflow-hidden group",
          isPlaying 
            ? "bg-caramel/20 border-caramel shadow-[0_0_20px_rgba(200,149,108,0.2)]" 
            : "bg-glass border-glass-border hover:border-caramel/40"
        )}
      >
        {isPlaying ? (
          <Volume2 size={18} className="text-caramel animate-pulse" />
        ) : (
          <VolumeX size={18} className="text-latte group-hover:text-caramel transition-colors" />
        )}
        
        {/* Visual Bars */}
        <div className={cn(
          "absolute bottom-2 inset-x-0 h-1 flex items-end justify-center gap-[2px] transition-opacity duration-500",
          isPlaying ? "opacity-100" : "opacity-0"
        )}>
          <div className="w-[2px] h-1 bg-caramel animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-[2px] h-2 bg-caramel animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-[2px] h-1.5 bg-caramel animate-bounce" style={{ animationDelay: '0.3s' }} />
        </div>
      </button>
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Placeholder - should be replaced with actual cafe loop
        preload="none"
      />
    </div>
  );
}
