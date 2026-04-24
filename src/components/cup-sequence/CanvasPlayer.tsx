'use client';

import { MotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useImageSequence } from './useImageSequence';

const TOTAL_FRAMES = 120;

interface CanvasPlayerProps {
  scrollProgress: MotionValue<number>;
}

export function CanvasPlayer({ scrollProgress }: CanvasPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const { imagesRef, loaded, progress } = useImageSequence();
  const frameIndex = useTransform(scrollProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
      draw(Math.round(frameIndex.get()));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [loaded]);

  const draw = (idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = imagesRef.current[idx] ?? imagesRef.current[0];
    if (!img) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    ctx.clearRect(0, 0, cw, ch);
    const ratio = Math.min(cw / img.naturalWidth, ch / img.naturalHeight) * 0.6;
    const w = img.naturalWidth * ratio;
    const h = img.naturalHeight * ratio;
    const x = (cw - w) / 2;
    const y = (ch - h) / 2;
    ctx.drawImage(img, x, y, w, h);
  };

  useMotionValueEvent(frameIndex, 'change', (v) => {
    const idx = Math.round(v);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => draw(idx));
  });

  return (
    <div className="absolute inset-0 bg-white" role="img" aria-label="Wool Cup coffee cup rotating animation">
      <canvas ref={canvasRef} className="w-full h-full block" style={{ background: '#FFFFFF' }} />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-px bg-rule overflow-hidden">
            <div className="h-full bg-brew transition-transform duration-300 origin-left" style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>
      )}
    </div>
  );
}
