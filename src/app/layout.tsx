import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MosselAI | AI-automatisering voor MKB in de Hoeksche Waard",
  description:
    "MosselAI bouwt concrete AI-automatiseringen voor MKB-ondernemers in de Hoeksche Waard. Geen buzzwords, geen beloftes, alleen werk dat eerder handmatig ging en nu vanzelf loopt.",
  keywords: [
    "AI automatisering",
    "MKB",
    "Hoeksche Waard",
    "factuurverwerking",
    "orderverwerking",
    "workflow automatisering",
  ],
  openGraph: {
    title: "MosselAI | AI-automatisering voor MKB in de Hoeksche Waard",
    description:
      "Concrete AI-automatiseringen voor lokale ondernemers. Zonder gedoe, zonder jargon.",
    type: "website",
    locale: "nl_NL",
    // {{ PLACEHOLDER: voeg url, images toe zodra domein bekend is }}
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${inter.variable} h-full antialiased`}>
      <head>
        {/* {{ PLACEHOLDER: vervang door Plausible of Google Analytics script }} */}
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
