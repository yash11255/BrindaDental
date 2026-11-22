import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBookBar from "@/components/MobileBookBar";
import ChatAssistant from "@/components/ChatAssistant";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const display = Poppins({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Dentist in Ambala Cantt | Dr. Bindra Dental Care Centre",
    template: "%s | Dr. Bindra Dental Care Centre",
  },
  description: `Dental implants, smile designing, root canal & facial aesthetics in Ambala Cantt. Rated ${site.rating}★ from ${site.reviewCount} Google reviews. Serving patients since ${site.since}.`,
  openGraph: { type: "website", siteName: site.name, locale: "en_IN" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: site.name,
  url: site.url,
  telephone: site.phone,
  foundingDate: String(site.since),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  aggregateRating: { "@type": "AggregateRating", ratingValue: site.rating, reviewCount: site.reviewCount },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: browser extensions (e.g. ColorZilla's `cz-shortcut-listen`, Grammarly)
    // inject attributes on <html>/<body> before React hydrates. This only silences attribute
    // mismatches on these two elements — children are still checked normally.
    <html lang="en" className={`${inter.variable} ${display.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
        <Header />
        <main id="main" className="pb-20 lg:pb-0">{children}</main>
        <Footer />
        <MobileBookBar />
        <ChatAssistant />
        <Reveal />
      </body>
    </html>
  );
}
