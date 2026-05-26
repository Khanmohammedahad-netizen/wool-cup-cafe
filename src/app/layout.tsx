import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis-provider";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Navbar } from "@/components/navbar/Navbar";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ui",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wool-cup-cafe.vercel.app"),
  title: "Wool Cup — Coffee, Quieted.",
  description:
    "Single-estate specialty coffee, hand-pulled espresso, and quiet mornings. Film Nagar, Hyderabad.",
  keywords:
    "wool cup, specialty coffee, hyderabad, film nagar, single-estate arabica, espresso, cafe",
  openGraph: {
    title: "Wool Cup — Coffee, Quieted.",
    description:
      "Single-estate specialty coffee, hand-pulled espresso, and quiet mornings.",
    type: "website",
    locale: "en_IN",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${cormorantGaramond.variable} ${dmSans.variable}`}
    >
      <body className="antialiased bg-bg text-text selection:bg-cream selection:text-dark">
        {/* SVG filter defs — converts black logo pixels to brand brown #6c3b11 */}
        <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
          <defs>
            <filter id="logo-brown" colorInterpolationFilters="sRGB">
              <feColorMatrix type="matrix" values="0 0 0 0 0.424  0 0 0 0 0.231  0 0 0 0 0.067  0 0 0 1 0"/>
            </filter>
          </defs>
        </svg>
        <LenisProvider>
          <LoadingScreen />
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
