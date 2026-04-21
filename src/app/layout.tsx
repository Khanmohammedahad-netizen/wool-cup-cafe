import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wool-cup-cafe.vercel.app"),
  title: "Wool Cup — Specialty Coffee | Film Nagar, Hyderabad",
  description: "Specialty Coffee & Artisanal Food. Brewed for moments that matter. Film Nagar & Financial District, Hyderabad.",
  keywords: "wool cup cafe, filmnagar cafe, hyderabad coffee, specialty coffee hyderabad, best cafe filmnagar",
  openGraph: {
    title: "Wool Cup — Specialty Coffee | Film Nagar, Hyderabad",
    description: "Brewed for moments that matter. Specialty coffee in the heart of Film Nagar.",
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
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
