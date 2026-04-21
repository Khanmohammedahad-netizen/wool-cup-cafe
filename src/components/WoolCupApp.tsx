'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════
   BEAN SVG HELPER
   ═══════════════════════════════════════════ */
function BeanSVG({ fill, stroke }: { fill: string; stroke: string }) {
  return (
    <svg viewBox="0 0 40 56">
      <ellipse cx="20" cy="28" rx="16" ry="24" fill={fill} />
      <path d="M20 6C16 18 24 38 20 50" stroke={stroke} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */
export default function WoolCupApp() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [preloaderHidden, setPreloaderHidden] = useState(false);
  const [activeDot, setActiveDot] = useState('hero');

  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const lenisRef = useRef<Lenis | null>(null);

  /* ─── PRELOADER ─── */
  useEffect(() => {
    const timer = setTimeout(() => setPreloaderHidden(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  /* ─── LENIS SMOOTH SCROLL ─── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  /* ─── CUSTOM CURSOR ─── */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = e.clientX - 4 + 'px';
        cursorDotRef.current.style.top = e.clientY - 4 + 'px';
      }
    };

    const animateCursor = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = ringPos.current.x - 20 + 'px';
        cursorRingRef.current.style.top = ringPos.current.y - 20 + 'px';
      }
      requestAnimationFrame(animateCursor);
    };

    document.addEventListener('mousemove', handleMouseMove);
    const raf = requestAnimationFrame(animateCursor);

    // Hover effects
    const interactives = document.querySelectorAll('a, button, .sig-card, .insta-item');
    const enterHandler = () => {
      if (cursorRingRef.current) {
        cursorRingRef.current.style.width = '60px';
        cursorRingRef.current.style.height = '60px';
        cursorRingRef.current.style.borderColor = 'rgba(201,168,76,0.6)';
      }
      if (cursorDotRef.current) cursorDotRef.current.style.transform = 'scale(1.5)';
    };
    const leaveHandler = () => {
      if (cursorRingRef.current) {
        cursorRingRef.current.style.width = '40px';
        cursorRingRef.current.style.height = '40px';
        cursorRingRef.current.style.borderColor = 'rgba(201,168,76,0.4)';
      }
      if (cursorDotRef.current) cursorDotRef.current.style.transform = 'scale(1)';
    };
    interactives.forEach(el => {
      el.addEventListener('mouseenter', enterHandler);
      el.addEventListener('mouseleave', leaveHandler);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, [preloaderHidden]);

  /* ─── NAV SCROLL ─── */
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle('scrolled', window.scrollY > 80);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ─── GSAP SCROLL ANIMATIONS ─── */
  useEffect(() => {
    if (!preloaderHidden) return;

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from('.hero-tag', { opacity: 0, y: 20, duration: 0.8, delay: 0.3 });
      gsap.from('.hero-title', { opacity: 0, y: 40, duration: 1, delay: 0.5 });
      gsap.from('.hero-desc', { opacity: 0, y: 20, duration: 0.8, delay: 0.8 });
      gsap.from('.hero-cta', { opacity: 0, y: 20, duration: 0.8, delay: 1.0 });
      gsap.from('.scroll-ind', { opacity: 0, y: 20, duration: 0.8, delay: 1.2 });
      gsap.from('.sound-toggle', { opacity: 0, y: 20, duration: 0.8, delay: 1.1 });

      // Hero parallax
      gsap.to('.hero-video', {
        yPercent: 15,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Section reveals
      const revealSections = ['.story', '.signatures', '.stats', '.experience', '.instagram'];
      revealSections.forEach(section => {
        gsap.utils.toArray(`${section} .reveal-item`).forEach((el: any, i: number) => {
          gsap.from(el, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });
        });
      });

      // Stats counter
      gsap.utils.toArray('.stat-item').forEach((el: any) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          onEnter: () => {
            const numEl = el.querySelector('.stat-number');
            if (numEl && !numEl.dataset.counted) {
              numEl.dataset.counted = 'true';
              animateCounter(numEl, parseInt(numEl.dataset.target || '0'));
            }
          },
        });
      });

      // Page dots tracking
      const sections = ['hero', 'story', 'signatures', 'experience', 'instagram'];
      sections.forEach(id => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveDot(id),
          onEnterBack: () => setActiveDot(id),
        });
      });

      // Cup 3D mouse interaction
      const cupScene = document.querySelector('.cup-scene');
      const cup3d = document.querySelector('.cup-3d') as HTMLElement;
      if (cupScene && cup3d) {
        cupScene.addEventListener('mousemove', (e: any) => {
          const rect = cupScene.getBoundingClientRect();
          const cx = (e.clientX - rect.left) / rect.width - 0.5;
          const cy = (e.clientY - rect.top) / rect.height - 0.5;
          cup3d.style.animation = 'none';
          cup3d.style.transform = `rotateY(${cx * 30}deg) rotateX(${-cy * 15}deg)`;
        });
        cupScene.addEventListener('mouseleave', () => {
          cup3d.style.animation = '';
          cup3d.style.transform = '';
        });
      }
    });

    return () => ctx.revert();
  }, [preloaderHidden]);

  /* ─── COUNTER ANIMATION ─── */
  const animateCounter = (el: HTMLElement, target: number) => {
    const duration = 2000;
    const start = performance.now();
    const isStar = el.closest('.stat-item')?.querySelector('.stat-label')?.textContent?.includes('Star');

    const update = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = Math.floor(eased * target);
      if (isStar) {
        el.textContent = (current / 10).toFixed(1);
      } else if (target >= 1000) {
        el.textContent = current.toLocaleString() + (p >= 1 ? '+' : '');
      } else {
        el.textContent = current + (p >= 1 && target > 2 ? '+' : '');
      }
      if (p < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  /* ═══ FLOATING BEANS DATA ═══ */
  const beanColors = ['#5a3e1a', '#6b4a20', '#4d3215', '#7a5a2e', '#3d2810'];
  const floatingBeans = Array.from({ length: 14 }, (_, i) => {
    const size = 14 + Math.random() * 22;
    const left = Math.random() * 100;
    const dur = 12 + Math.random() * 18;
    const del = Math.random() * 12;
    const rot = Math.random() * 720 - 360;
    const maxOp = 0.12 + Math.random() * 0.2;
    const c = beanColors[Math.floor(Math.random() * beanColors.length)];
    const c2 = adjustColor(c, -30);
    return { size, left, dur, del, rot, maxOp, c, c2, key: i };
  });

  function adjustColor(hex: string, amt: number) {
    const num = parseInt(hex.slice(1), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amt));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0xFF) + amt));
    const b = Math.min(255, Math.max(0, (num & 0xFF) + amt));
    return '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  /* ═══ SIGNATURES DATA ═══ */
  const signatures = [
    { name: 'Velvet Mocha', desc: 'Rich. Creamy. Indulgent.', img: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=600&q=80' },
    { name: 'Pistachio Latte', desc: 'Nutty. Smooth. Delicious.', img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80' },
    { name: 'Mango Cloud', desc: 'Fruity. Refreshing. Bliss.', img: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=600&q=80' },
    { name: 'Caramel Macchiato', desc: 'Sweet. Bold. Classic.', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80' },
    { name: 'Matcha Royale', desc: 'Earthy. Vibrant. Zen.', img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&q=80' },
    { name: 'Berry Bliss Frappe', desc: 'Tangy. Fresh. Irresistible.', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80' },
  ];

  const instaImages = [
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&q=80',
  ];

  return (
    <>
      {/* GRAIN */}
      <div className="grain" />

      {/* PRELOADER */}
      <div className={`preloader ${preloaderHidden ? 'hidden' : ''}`}>
        <div className="preloader-logo">WOOL CUP</div>
        <div className="preloader-bar" />
      </div>

      {/* CURSOR */}
      <div className="cursor-dot" ref={cursorDotRef} />
      <div className="cursor-ring" ref={cursorRingRef} />

      {/* FLOATING BEANS */}
      <div className="beans-container">
        {floatingBeans.map(b => (
          <div
            key={b.key}
            className="coffee-bean"
            style={{
              '--size': `${b.size}px`,
              '--duration': `${b.dur}s`,
              '--delay': `${b.del}s`,
              '--rot': `${b.rot}`,
              '--max-opacity': `${b.maxOp}`,
              left: `${b.left}%`,
            } as React.CSSProperties}
          >
            <BeanSVG fill={b.c} stroke={b.c2} />
          </div>
        ))}
      </div>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button className="menu-close" onClick={() => setMenuOpen(false)}>×</button>
        <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>Home</a>
        <a href="#story" onClick={(e) => { e.preventDefault(); scrollTo('story'); }}>Our Story</a>
        <a href="#signatures" onClick={(e) => { e.preventDefault(); scrollTo('signatures'); }}>Menu</a>
        <a href="#experience" onClick={(e) => { e.preventDefault(); scrollTo('experience'); }}>Experience</a>
        <a href="#instagram" onClick={(e) => { e.preventDefault(); scrollTo('instagram'); }}>Gallery</a>
        <a href="https://www.swiggy.com/city/hyderabad/wool-cup-film-nagar-rest814608" target="_blank" rel="noopener noreferrer">Order Online</a>
      </div>

      {/* NAVIGATION */}
      <nav ref={navRef}>
        <button className="nav-btn" onClick={() => setMenuOpen(true)} aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>
        <a href="#hero" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
          <span className="nav-logo-main">WOOL CUP</span>
          <span className="nav-logo-sub">Filmnagar</span>
        </a>
        <div className="nav-right">
          <a href="https://www.swiggy.com/city/hyderabad/wool-cup-film-nagar-rest814608" target="_blank" rel="noopener noreferrer" className="nav-order">Order Online</a>
          <a href="https://www.swiggy.com/city/hyderabad/wool-cup-film-nagar-rest814608" target="_blank" rel="noopener noreferrer" className="nav-btn" aria-label="Cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </a>
        </div>
      </nav>

      {/* PAGE DOTS */}
      <div className="page-dots">
        {['hero', 'story', 'signatures', 'experience', 'instagram'].map(s => (
          <button
            key={s}
            className={`page-dot ${activeDot === s ? 'active' : ''}`}
            onClick={() => scrollTo(s)}
            aria-label={`Go to ${s}`}
          />
        ))}
      </div>

      {/* ═══ HERO ═══ */}
      <section className="hero" id="hero">
        <div className="hero-bg" />
        <div className="hero-video-wrap">
          <video
            ref={heroVideoRef}
            className="hero-video"
            src="/videos/chocolate.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
        <div className="hero-steam" />
        <div className="hero-content">
          <p className="hero-tag">Specialty Coffee</p>
          <h1 className="hero-title">Brewed for<br />moments<br />that matter.</h1>
          <p className="hero-desc">Thoughtfully sourced. Beautifully brewed.<br />Made for you.</p>
          <a href="#signatures" className="cta-link hero-cta" onClick={(e) => { e.preventDefault(); scrollTo('signatures'); }}>
            Explore{' '}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        <div className="scroll-ind">
          <span className="scroll-text">Scroll</span>
          <div className="scroll-line" />
        </div>
        <div className="sound-toggle">
          <button className="sound-btn" aria-label="Toggle sound">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 010 7.07" />
              <path d="M19.07 4.93a10 10 0 010 14.14" />
            </svg>
          </button>
          <span className="sound-label">On</span>
        </div>
      </section>

      {/* ═══ STORY ═══ */}
      <section className="story" id="story">
        <div className="story-grid">
          <div className="story-visual">
            <div className="cup-glow" />
            <div className="cup-scene">
              <div className="cup-3d">
                {/* Steam wisps */}
                <div className="cup-steam-wisp" style={{ left: 'calc(50% - 30px)', '--wd': '3s', '--wdel': '0s' } as React.CSSProperties} />
                <div className="cup-steam-wisp" style={{ left: 'calc(50%)', '--wd': '3.5s', '--wdel': '0.8s' } as React.CSSProperties} />
                <div className="cup-steam-wisp" style={{ left: 'calc(50% + 25px)', '--wd': '2.8s', '--wdel': '1.5s' } as React.CSSProperties} />
                <div className="cup-lid" />
                <div className="cup-body">
                  <div className="cup-sleeve">
                    <span className="cup-sleeve-text">WOOL<br />CUP</span>
                    <span className="cup-sleeve-sub">Specialty Coffee</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating beans around cup */}
            <div className="cup-bean" style={{ left: '10%', top: '20%', '--d': '5s', '--del': '0s', '--r': '20deg' } as React.CSSProperties}>
              <BeanSVG fill="#5a3e1a" stroke="#3a2510" />
            </div>
            <div className="cup-bean" style={{ right: '8%', top: '35%', '--d': '6s', '--del': '1.5s', '--r': '-15deg' } as React.CSSProperties}>
              <BeanSVG fill="#6b4a20" stroke="#4a3015" />
            </div>
            <div className="cup-bean" style={{ left: '25%', bottom: '10%', '--d': '7s', '--del': '0.8s', '--r': '45deg' } as React.CSSProperties}>
              <BeanSVG fill="#4d3215" stroke="#35200a" />
            </div>
            <div className="cup-bean" style={{ right: '20%', bottom: '15%', '--d': '5.5s', '--del': '2s', '--r': '-30deg' } as React.CSSProperties}>
              <BeanSVG fill="#5a3e1a" stroke="#3a2510" />
            </div>
          </div>

          <div className="story-content">
            <p className="section-tag reveal-item">Our Story</p>
            <h2 className="story-title reveal-item">More than<br />a coffee shop.<br />It&apos;s a <em>feeling</em>.</h2>
            <p className="story-text reveal-item">Wool Cup is where craftsmanship meets comfort. A space to slow down, connect and savour the little things. Nestled in the heart of Film Nagar, we bring you specialty coffee, artisanal food, and a warm urban retreat.</p>
            <a href="#" className="cta-link reveal-item">
              Discover Our Story{' '}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ SIGNATURES ═══ */}
      <section className="signatures" id="signatures">
        <div className="sig-header" style={{ maxWidth: 1400, margin: '0 auto 60px' }}>
          <div>
            <p className="section-tag reveal-item">Our Signatures</p>
            <h2 className="sig-title reveal-item">Crafted with obsession.<br />Served with love.</h2>
          </div>
          <a href="#" className="sig-view-all reveal-item">
            View All<br />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        <div className="sig-grid">
          {signatures.map((s, i) => (
            <div key={s.name} className={`sig-card reveal-item`}>
              <img className="sig-card-img" src={s.img} alt={s.name} loading="lazy" />
              <div className="sig-card-info">
                <h3 className="sig-card-name">{s.name}</h3>
                <p className="sig-card-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="stats" id="stats">
        <div className="stats-grid">
          <div className="stat-item reveal-item">
            <div className="stat-number" data-target="3464">0</div>
            <div className="stat-label">Instagram Family</div>
          </div>
          <div className="stat-item reveal-item">
            <div className="stat-number" data-target="65">0</div>
            <div className="stat-label">Menu Specials</div>
          </div>
          <div className="stat-item reveal-item">
            <div className="stat-number" data-target="2">0</div>
            <div className="stat-label">Locations</div>
          </div>
          <div className="stat-item reveal-item">
            <div className="stat-number" data-target="45">0</div>
            <div className="stat-label">Star Rating (×10)</div>
          </div>
        </div>
      </section>

      {/* ═══ EXPERIENCE ═══ */}
      <section className="experience" id="experience">
        <div className="exp-content">
          <p className="section-tag reveal-item">The Experience</p>
          <h2 className="exp-title reveal-item">Where every sip<br />tells a story.</h2>
          <div className="exp-features">
            <div className="exp-feature reveal-item">
              <span className="exp-icon">☕</span>
              <h3>Specialty Brews</h3>
              <p>Single-origin beans, precision roasted and hand-crafted by our baristas into extraordinary cups of coffee.</p>
            </div>
            <div className="exp-feature reveal-item">
              <span className="exp-icon">🍴</span>
              <h3>Artisanal Food</h3>
              <p>From avocado toasts to continental platters — fresh, flavourful dishes crafted with the same care as our coffee.</p>
            </div>
            <div className="exp-feature reveal-item">
              <span className="exp-icon">✨</span>
              <h3>Urban Retreat</h3>
              <p>A cozy, aesthetic space designed for lazy evenings, deep conversations, and the perfect Instagram moment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ INSTAGRAM ═══ */}
      <section className="instagram" id="instagram">
        <div className="insta-header">
          <p className="section-tag reveal-item">Follow Us</p>
          <h2 className="insta-title reveal-item">@woolcup</h2>
        </div>
        <div className="insta-grid">
          {instaImages.map((img, i) => (
            <div key={i} className={`insta-item reveal-item`}>
              <img src={img} alt="Wool Cup Instagram" loading="lazy" />
            </div>
          ))}
        </div>
        <a href="https://www.instagram.com/woolcup/" target="_blank" rel="noopener noreferrer" className="insta-follow reveal-item">
          Follow @woolcup
        </a>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-brand-name">WOOL CUP</div>
            <p className="footer-brand-desc">
              Specialty Coffee • Artisanal Food<br />
              Film Nagar | Financial District<br />
              Hyderabad
            </p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <a href="#story" onClick={(e) => { e.preventDefault(); scrollTo('story'); }}>Our Story</a>
            <a href="#signatures" onClick={(e) => { e.preventDefault(); scrollTo('signatures'); }}>Menu</a>
            <a href="#experience" onClick={(e) => { e.preventDefault(); scrollTo('experience'); }}>Experience</a>
            <a href="#instagram" onClick={(e) => { e.preventDefault(); scrollTo('instagram'); }}>Gallery</a>
          </div>
          <div className="footer-col">
            <h4>Visit</h4>
            <a href="https://maps.google.com/?q=Wool+Cup+Film+Nagar+Hyderabad" target="_blank" rel="noopener noreferrer">
              CC55, Road No. 1<br />Film Nagar, Hyderabad
            </a>
            <a href="#">Financial District</a>
            <a href="tel:+917292944244">+91 72929 44244</a>
            <a href="mailto:Spandana@woolcup.com">Spandana@woolcup.com</a>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <a href="https://www.instagram.com/woolcup/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.facebook.com/woolcuphyd/" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.zomato.com/hyderabad/wool-cup-urban-cafe-bistro-jubilee-hills" target="_blank" rel="noopener noreferrer">Zomato</a>
            <a href="https://www.swiggy.com/city/hyderabad/wool-cup-film-nagar-rest814608" target="_blank" rel="noopener noreferrer">Swiggy</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 Wool Cup. All rights reserved. Built by MAK Software Solutions.</span>
          <div className="footer-socials">
            <a href="https://www.instagram.com/woolcup/" target="_blank" rel="noopener noreferrer" className="footer-social">IG</a>
            <a href="https://www.facebook.com/woolcuphyd/" target="_blank" rel="noopener noreferrer" className="footer-social">FB</a>
            <a href="mailto:Spandana@woolcup.com" className="footer-social">@</a>
          </div>
        </div>
      </footer>
    </>
  );
}
