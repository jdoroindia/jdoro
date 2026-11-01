import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FittingRoomProvider } from "@/lib/fitting-room";
import { CatalogProvider } from "@/lib/catalog-context";
import { getProducts } from "@/lib/catalog";
import { site } from "@/lib/site";
import "./globals.css";

/* Fraunces: a warm, soft serif for headings; reads gender-neutral and holds up at small sizes.
   Inter: built for screens, very clear for body text on phones. */
const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-text",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.signature} Clothing by ${site.founder}`,
    template: `%s — ${site.name}`,
  },
  description: site.summary,
  applicationName: site.plainName,
  openGraph: {
    type: "website",
    siteName: site.plainName,
    locale: site.locale,
    url: site.url,
    title: `${site.name} — ${site.signature}`,
    description: site.summary,
    images: ["/video/hero-poster.jpg"],
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.summary },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#faf7f3",
  colorScheme: "light",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const products = await getProducts();
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bone">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-5 focus:py-3 focus:text-xs focus:uppercase focus:tracking-[0.2em] focus:text-paper"
        >
          Skip to content
        </a>
        <CatalogProvider products={products}>
        <FittingRoomProvider>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </FittingRoomProvider>
        </CatalogProvider>
      </body>
    </html>
  );
}
