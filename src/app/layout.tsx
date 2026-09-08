import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import ScrollProgress from "@/components/motion/ScrollProgress";
import SmoothScrollProvider from "@/components/motion/SmoothScrollProvider";
import { getLocale } from "@/i18n/getDictionary";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const TITLE = "The Rich Reporter — Competitions";
const DESCRIPTION =
  "Exclusive luxury competitions from Rich Reporter Magazine. Premium prizes, limited entries, and a legally compliant free mail-in route.";

export const metadata: Metadata = {
  // metadataBase resolves the relative OG image below and powers canonical URLs.
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  // No `alternates.canonical` here on purpose: root metadata is inherited, so
  // a value set here would make every page claim the homepage as its
  // canonical URL. Duplicate indexing of the old *.vercel.app host is handled
  // instead by a host-scoped X-Robots-Tag in next.config.ts.
  openGraph: {
    type: "website",
    siteName: "The Rich Reporter Competitions",
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    images: [
      {
        url: "/og/share.png",
        width: 1200,
        height: 630,
        alt: "The Rich Reporter Competitions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og/share.png"],
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen antialiased">
        <ScrollProgress />
        <SmoothScrollProvider />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
