'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  bgVideoSrc?: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  textColorClass?: string;
  children?: ReactNode;
  onExpansionChange?: (expanded: boolean) => void;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  bgVideoSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  textColorClass = 'text-white',
  children,
  onExpansionChange,
}: ScrollExpandMediaProps) => {
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef<number>(0);
  const expandedRef = useRef(false);
  const touchStartYRef = useRef(0);

  const mediaBoxRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLHeadingElement>(null);
  const word2Ref = useRef<HTMLHeadingElement>(null);
  const dateLabelRef = useRef<HTMLParagraphElement>(null);
  const scrollCueRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const cardVideoRef = useRef<HTMLVideoElement>(null);

  const isMobileRef = useRef(false);

  useEffect(() => {
    const check = () => {
      const m = window.innerWidth < 768;
      setIsMobile(m);
      isMobileRef.current = m;
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const tick = () => {
      const prev = currentRef.current;
      currentRef.current = lerp(currentRef.current, targetRef.current, 0.04);

      if (Math.abs(currentRef.current - prev) > 0.0002) {
        const p = currentRef.current;
        const mobile = isMobileRef.current;

        const w = 300 + p * (mobile ? 650 : 1250);
        const h = 400 + p * (mobile ? 200 : 400);
        const tx = p * (mobile ? 180 : 150);

        if (mediaBoxRef.current) {
          mediaBoxRef.current.style.width = `${w}px`;
          mediaBoxRef.current.style.height = `${h}px`;
        }
        if (bgRef.current) {
          bgRef.current.style.opacity = String(1 - p);
        }
        if (word1Ref.current) {
          word1Ref.current.style.transform = `translateX(-${tx}vw)`;
        }
        if (word2Ref.current) {
          word2Ref.current.style.transform = `translateX(${tx}vw)`;
        }
        if (dateLabelRef.current) {
          dateLabelRef.current.style.transform = `translateX(-${tx}vw)`;
        }
        if (scrollCueRef.current) {
          scrollCueRef.current.style.transform = `translateX(${tx}vw)`;
        }
        if (overlayRef.current) {
          overlayRef.current.style.opacity = String(0.5 - p * 0.3);
        }
        if (scrollIndicatorRef.current) {
          scrollIndicatorRef.current.style.opacity = String(Math.max(0, 1 - p * 10));
        }

        // Play card video as it expands, pause when collapsed
        if (cardVideoRef.current) {
          if (p >= 0.5 && cardVideoRef.current.paused) {
            cardVideoRef.current.play().catch(() => {});
          } else if (p < 0.3 && !cardVideoRef.current.paused) {
            cardVideoRef.current.pause();
            cardVideoRef.current.currentTime = 0;
          }
        }

        const wasExpanded = expandedRef.current;
        if (p >= 0.98 && !wasExpanded) {
          expandedRef.current = true;
          setMediaFullyExpanded(true);
          setShowContent(true);
          onExpansionChange?.(true);
        } else if (p < 0.75 && wasExpanded) {
          expandedRef.current = false;
          setMediaFullyExpanded(false);
          setShowContent(false);
          onExpansionChange?.(false);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onExpansionChange]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (expandedRef.current && e.deltaY < 0 && window.scrollY <= 5) {
        targetRef.current = 0;
        e.preventDefault();
        return;
      }
      if (!expandedRef.current) {
        e.preventDefault();
        targetRef.current = Math.min(
          Math.max(targetRef.current + e.deltaY * 0.001, 0),
          1
        );
      }
    };

    const onScroll = () => {
      if (!expandedRef.current) window.scrollTo(0, 0);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const deltaY = touchStartYRef.current - e.touches[0].clientY;

      if (expandedRef.current && deltaY < -20 && window.scrollY <= 5) {
        targetRef.current = 0;
        e.preventDefault();
        return;
      }
      if (!expandedRef.current) {
        e.preventDefault();
        const factor = deltaY < 0 ? 0.008 : 0.005;
        targetRef.current = Math.min(
          Math.max(targetRef.current + deltaY * factor, 0),
          1
        );
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div className="overflow-x-hidden">
      <style href="scroll-indicator" precedence="default">{`
        @keyframes scroll-wheel {
          0%   { transform: translateY(0);   opacity: 1; }
          60%  { transform: translateY(8px); opacity: 0; }
          61%  { transform: translateY(0);   opacity: 0; }
          100% { transform: translateY(0);   opacity: 1; }
        }
        .scroll-wheel-dot {
          animation: scroll-wheel 1.6s ease-in-out infinite;
        }
      `}</style>
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

          {/* Background — video or image, fades as card expands */}
          <div ref={bgRef} className="absolute inset-0 z-0 h-full">
            {bgVideoSrc ? (
              <>
                <video
                  src={bgVideoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                  disablePictureInPicture
                  disableRemotePlayback
                />
                <div className="absolute inset-0 bg-black/30" />
              </>
            ) : (
              <>
                <Image
                  src={bgImageSrc}
                  alt="Background"
                  width={1920}
                  height={1080}
                  className="w-screen h-screen object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-black/30" />
              </>
            )}
          </div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

              {/* Expanding media box */}
              <div
                ref={mediaBoxRef}
                className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden"
                style={{
                  width: '300px',
                  height: '400px',
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 0px 50px rgba(0,0,0,0.3)',
                }}
              >
                {mediaType === 'video' ? (
                  <div className="relative w-full h-full pointer-events-none">
                    <video
                      ref={cardVideoRef}
                      src={mediaSrc}
                      poster={posterSrc}
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover"
                      disablePictureInPicture
                      disableRemotePlayback
                    />
                    <div
                      ref={overlayRef}
                      className="absolute inset-0 bg-black/50 rounded-xl"
                      style={{ opacity: 0.5 }}
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={mediaSrc}
                      alt={title || 'Media'}
                      width={1280}
                      height={720}
                      className="w-full h-full object-cover"
                    />
                    <div
                      ref={overlayRef}
                      className="absolute inset-0 bg-black/50 rounded-xl"
                      style={{ opacity: 0.5 }}
                    />
                  </div>
                )}

                {/* Date + scroll cue below video box */}
                <div className="flex flex-col items-center text-center mt-4">
                  {date && (
                    <p
                      ref={dateLabelRef}
                      className={`text-2xl ${textColorClass}`}
                      style={{ transform: 'translateX(0vw)' }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      ref={scrollCueRef}
                      className={`${textColorClass} font-medium text-center`}
                      style={{ transform: 'translateX(0vw)' }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              {/* Title words — slide apart as video expands */}
              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 flex-col ${
                  textBlend ? 'mix-blend-difference' : ''
                }`}
              >
                <h2
                  ref={word1Ref}
                  className={`text-4xl md:text-5xl lg:text-6xl font-bold ${textColorClass}`}
                  style={{ transform: 'translateX(0vw)' }}
                >
                  {firstWord}
                </h2>
                <h2
                  ref={word2Ref}
                  className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center ${textColorClass}`}
                  style={{ transform: 'translateX(0vw)' }}
                >
                  {restOfTitle}
                </h2>
              </div>

              {/* Scroll indicator */}
              <div
                ref={scrollIndicatorRef}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none select-none"
              >
                <span className="font-ui text-[10px] uppercase tracking-[0.3em] text-[#ead8b5]/70">Scroll</span>
                <svg width="22" height="34" viewBox="0 0 22 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="20" height="32" rx="10" stroke="rgba(234,216,181,0.45)" strokeWidth="1.5"/>
                  <rect
                    x="9.5"
                    y="6"
                    width="3"
                    height="6"
                    rx="1.5"
                    fill="rgba(234,216,181,0.85)"
                    className="scroll-wheel-dot"
                  />
                </svg>
              </div>
            </div>

            {/* Content revealed after full expansion */}
            <motion.section
              className="flex flex-col w-full px-8 py-10 md:px-16 lg:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
