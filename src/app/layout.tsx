import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://softnestcare.ca"),
  title: {
    default: "SoftNest Fabric Care | Upholstery Cleaning in Mississauga",
    template: "%s",
  },
  description:
    "Professional upholstery, sofa, carpet and area rug cleaning across Mississauga and the Greater Toronto Area.",
  applicationName: "SoftNest Fabric Care",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    siteName: "SoftNest Fabric Care",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: "SoftNest Fabric Care — Professional Upholstery Cleaning Across the GTA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
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
