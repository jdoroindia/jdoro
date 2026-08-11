import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { buttons } from "@/lib/microcopy";
import { site } from "@/lib/site";
import "./globals.css";

/* Matched to the logotype: a didone with hairline serifs and sharp ball
   terminals. The optical size axis is requested so headline sizes can carry
   finer hairlines than body sizes. */
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Womenswear made from deadstock fabric, ready to ship or cut to your measure`,
    template: `%s — ${site.name}`,
  },
  description: site.summary,
  applicationName: site.plainName,
  keywords: [
    "deadstock fabric clothing",
    "small batch womenswear",
    "made to measure womenswear",
    "slow fashion label India",
    "natural fibre clothing",
    "limited run tailoring",
    "zero waste fashion atelier",
  ],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  openGraph: {
    type: "website",
    siteName: site.plainName,
    locale: site.locale,
    url: site.url,
    title: `${site.name} — ${site.signature}`,
    description: site.summary,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Made-to-order womenswear`,
    description: site.summary,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#f1ede4",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bodoni.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bone">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-5 focus:py-3 focus:text-[0.6875rem] focus:uppercase focus:tracking-[0.2em] focus:text-paper"
        >
          {buttons.skipToContent}
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
