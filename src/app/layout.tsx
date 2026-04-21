import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navigation from "@/components/layout/Navigation";
import Cursor from "@/components/layout/Cursor";
import GrainOverlay from "@/components/ui/GrainOverlay";
import ScrollProgress from "@/components/layout/ScrollProgress";
import AmbientSound from "@/components/layout/AmbientSound";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["200", "300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Wool Cup Café — Where Every Cup Tells a Story | Filmnagar, Hyderabad",
  description: "A cinematic coffee experience in the heart of Filmnagar. Specialty coffee, intimate ambience, and a story in every cup. Visit Wool Cup Café, Hyderabad.",
  keywords: "wool cup cafe, filmnagar cafe, hyderabad coffee, specialty coffee hyderabad, best cafe filmnagar",
  openGraph: {
    title: "Wool Cup Café — Filmnagar, Hyderabad",
    description: "Where every cup tells a story. Specialty coffee, cinematic ambience.",
    images: ["/images/og-image.jpg"],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wool Cup Café",
    description: "A cinematic coffee experience in Filmnagar, Hyderabad.",
    images: ["/images/og-image.jpg"],
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <body className="antialiased bg-bg-primary">
        <ScrollProgress />
        <AmbientSound />
        <SmoothScroll>
          <Cursor />
          <GrainOverlay />
          <Navigation />
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
