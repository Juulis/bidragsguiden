import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BidragsGuiden",
  description: "Samla alla offentliga bidrag, stöd och ersättningar i Sverige på ett ställe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className="antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}