import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | Wool Cup Urban Café & Bistro',
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#ead8b5]/20 flex flex-col items-center justify-center px-6 text-center">

      {/* Coffee cup SVG */}
      <svg
        width="72"
        height="72"
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-8 opacity-40"
        aria-hidden="true"
      >
        <rect x="10" y="24" width="40" height="32" rx="4" stroke="#231f20" strokeWidth="2.5" fill="none" />
        <path d="M50 32 Q62 32 62 40 Q62 48 50 48" stroke="#231f20" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M18 24 Q18 14 28 10" stroke="#231f20" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M30 24 Q30 14 40 10" stroke="#231f20" strokeWidth="2" strokeLinecap="round" fill="none" />
        <line x1="10" y1="58" x2="50" y2="58" stroke="#231f20" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      <p className="font-ui text-xs uppercase tracking-[0.3em] text-[#231f20]/40 mb-4">
        404
      </p>

      <h1 className="font-display text-4xl md:text-5xl text-[#231f20] mb-4">
        Lost your way?
      </h1>

      <p className="font-body text-lg text-[#231f20]/60 mb-10 max-w-sm">
        This page doesn't exist, but a good cup of coffee always finds you.
      </p>

      <Link
        href="/"
        className="inline-block bg-[#231f20] text-white font-ui text-sm uppercase tracking-wide px-8 py-3 rounded-full hover:bg-[#231f20]/80 transition-all duration-300"
      >
        Back to Wool Cup
      </Link>
    </main>
  );
}
