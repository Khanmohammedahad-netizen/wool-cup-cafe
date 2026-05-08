import type { Metadata } from "next";
import { Cormorant_Garamond, Libre_Baskerville, DM_Sans } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis-provider";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
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
      className={`${cormorant.variable} ${libreBaskerville.variable} ${dmSans.variable}`}
    >
      <body className="antialiased bg-bg text-text selection:bg-cream selection:text-dark">
        <LenisProvider>
          <LoadingScreen />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
