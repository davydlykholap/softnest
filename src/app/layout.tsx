import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://softnestcare.ca"),
  title: "SoftNest Fabric Care | Upholstery Cleaning in Mississauga",
  description:
    "Professional upholstery, sofa, carpet and area rug cleaning across Mississauga and the GTA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
