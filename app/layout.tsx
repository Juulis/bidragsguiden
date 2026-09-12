import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://bidragsguiden-chi.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BidragsGuiden – Hitta bidrag och stöd i Sverige",
    template: "%s | BidragsGuiden",
  },
  description:
    "Samlad guide till offentliga bidrag, stöd och ersättningar i Sverige. Barnbidrag, bostadsbidrag, CSN, ROT/RUT och mer – med tydlig info och enkla uträkningar.",
  keywords: [
    "bidrag",
    "barnbidrag",
    "bostadsbidrag",
    "flerbarnstillägg",
    "CSN",
    "ROT avdrag",
    "RUT avdrag",
    "försörjningsstöd",
    "stöd Sverige",
    "Försäkringskassan",
  ],
  authors: [{ name: "BidragsGuiden" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: siteUrl,
    siteName: "BidragsGuiden",
    title: "BidragsGuiden – Hitta bidrag och stöd i Sverige",
    description:
      "Tydlig info om barnbidrag, bostadsbidrag, CSN, ROT/RUT och andra stöd – direkt på sidan med enkla beräkningar.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BidragsGuiden – Hitta bidrag och stöd i Sverige",
    description:
      "Samlad guide till offentliga bidrag och stöd i Sverige med tydlig info och uträkningar.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className="antialiased bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}