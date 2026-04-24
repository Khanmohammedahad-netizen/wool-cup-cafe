'use client';

import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 120;
const EAGER_BATCH = 12;
const LAZY_BATCH_SIZE = 12;

/**
 * Placeholder mode: all 120 frame indices resolve to the same placeholder image.
 * When real Blender renders are ready, just drop WebP files into /sequence/{size}/
 * and set USE_PLACEHOLDER to false. Zero code changes needed.
 */
const USE_PLACEHOLDER = true;
const PLACEHOLDER_SRC = '/images/cup-placeholder.jpg';

function pickResolution(): '720' | '1080' | '1440' {
  if (typeof window === 'undefined') return '1080';
  const w = window.innerWidth;
  const dpr = window.devicePixelRatio || 1;
  if (w < 768) return '720';
  if (w < 1440) return '1080';
  return dpr > 1.5 ? '1440' : '1080';
}

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      if (img.decode) {
        img.decode().then(() => resolve(img)).catch(() => resolve(img));
      } else {
        resolve(img);
      }
    };
    img.onerror = reject;
  });
}

export function useImageSequence() {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let cancelled = false;
    const res = pickResolution();

    const urls = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      if (USE_PLACEHOLDER) return PLACEHOLDER_SRC;
      return `/sequence/${res}/${String(i).padStart(3, '0')}.webp`;
    });

    // In placeholder mode, load the single image once and replicate
    if (USE_PLACEHOLDER) {
      loadImage(PLACEHOLDER_SRC).then((img) => {
        if (cancelled) return;
        // Fill all 120 slots with the same image reference
        for (let i = 0; i < TOTAL_FRAMES; i++) {
          imagesRef.current[i] = img;
        }
        setLoaded(true);
        setProgress(1);
      }).catch(console.error);
      return () => { cancelled = true; };
    }

    // Real mode: two-phase loading
    // Phase 1: Eager load first batch
    Promise.all(urls.slice(0, EAGER_BATCH).map(loadImage))
      .then((imgs) => {
        if (cancelled) return;
        imgs.forEach((img, i) => {
          imagesRef.current[i] = img;
        });
        setLoaded(true);
        setProgress(EAGER_BATCH / TOTAL_FRAMES);
      })
      .catch(console.error);

    // Phase 2: Progressive load remaining frames
    (async () => {
      // Wait for eager batch first
      await new Promise<void>((resolve) => {
        const check = setInterval(() => {
          if (imagesRef.current[0]) {
            clearInterval(check);
            resolve();
          }
        }, 50);
      });

      for (let start = EAGER_BATCH; start < TOTAL_FRAMES; start += LAZY_BATCH_SIZE) {
        if (cancelled) return;
        const end = Math.min(start + LAZY_BATCH_SIZE, TOTAL_FRAMES);
        try {
          const batch = await Promise.all(
            urls.slice(start, end).map(loadImage)
          );
          batch.forEach((img, i) => {
            imagesRef.current[start + i] = img;
          });
          setProgress(end / TOTAL_FRAMES);
        } catch (e) {
          console.error('Frame load error:', e);
        }
      }
    })();

    return () => {
      cancelled = true;
      imagesRef.current = [];
    };
  }, []);

  return { imagesRef, loaded, progress };
}
