import type { Metadata } from "next";
import AnalyticsEvents from "@/components/AnalyticsEvents";
import MarketingAttribution from "@/components/MarketingAttribution";
import Script from "next/script";
import { siteConfig } from "@/lib/site";
import "./globals.css";
import "./styles/shared-refinements.css";
import "./hero-cta.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://softnestcare.ca"),
  title: {
    default: "Upholstery & Carpet Cleaning Across the GTA | SoftNest",
    template: "%s",
  },
  description:
    "Professional upholstery, sofa, carpet and area rug cleaning across the Greater Toronto Area and Hamilton.",
  applicationName: siteConfig.name,
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    siteName: siteConfig.name,
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/images/softnest-hero-room.webp",
        width: 1200,
        height: 630,
        alt: "SoftNest Fabric Care — Professional Upholstery Cleaning Across the GTA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/softnest-hero-room.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-creamLight text-woodCharcoal font-sans antialiased m-0 flex flex-col min-h-screen">
        <MarketingAttribution />
        <AnalyticsEvents />
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18294967541"
          strategy="afterInteractive"
        />
        <Script id="softnest-google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18294967541');
          `}
        </Script>
      </body>
    </html>
  );
}
