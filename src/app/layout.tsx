import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis-provider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmsans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  weight: ["400", "500"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
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
    <html lang="en" className={`${playfair.variable} ${dmsans.variable} ${cormorant.variable}`}>
      <body className="antialiased font-sans">
        <ScrollProgress />
        <CustomCursor />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
