import type { Metadata } from "next";
import localFont from "next/font/local";
import { Libre_Baskerville, DM_Sans } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis-provider";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Navbar } from "@/components/navbar/Navbar";

const edhanMartine = localFont({
  src: "../fonts/edhan-martine.ttf",
  variable: "--font-display",
  display: "swap",
  weight: "400",
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
      className={`${edhanMartine.variable} ${libreBaskerville.variable} ${dmSans.variable}`}
    >
      <body className="antialiased bg-bg text-text selection:bg-cream selection:text-dark">
        <LenisProvider>
          <LoadingScreen />
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
