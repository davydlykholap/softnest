import { integrations } from "@/lib/integrations";
import type { Metadata } from "next";
import AnalyticsEvents from "@/components/AnalyticsEvents";
import MarketingAttribution from "@/components/MarketingAttribution";
import Script from "next/script";
import { siteConfig } from "@/lib/site";
import "./globals.css";
import "./styles/shared-refinements.css";
import "./hero-cta.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url + ""),
  title: {
    default: siteConfig.defaultTitle,
    template: "%s",
  },
  description: siteConfig.defaultDescription,
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
        url: siteConfig.heroImage,
        width: 1200,
        height: 630,
        alt: "SoftNest Fabric Care — Professional Upholstery Cleaning Across the GTA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [siteConfig.heroImage],
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
          src={`https://www.googletagmanager.com/gtag/js?id=${integrations.googleAdsId}`}
          strategy="afterInteractive"
        />
        <Script id="softnest-google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${JSON.stringify(integrations.googleAdsId).replace(/</g, '\u003c')});
          `}
        </Script>
      </body>
    </html>
  );
}
