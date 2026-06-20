import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MosselAI | AI-automatisering voor bedrijven in de Hoeksche Waard",
  description:
    "MosselAI bouwt AI-automatiseringen voor ondernemers en bedrijven in de Hoeksche Waard. Werkend in vier weken, alleen betalen als het werkt.",
  keywords: [
    "AI automatisering",
    "automatisering",
    "Hoeksche Waard",
    "factuurverwerking",
    "orderverwerking",
    "workflow automatisering",
  ],
  metadataBase: new URL("https://mosselai.nl"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MosselAI | AI-automatisering voor bedrijven in de Hoeksche Waard",
    description:
      "MosselAI bouwt AI-automatiseringen voor ondernemers en bedrijven in de Hoeksche Waard. Werkend in vier weken, alleen betalen als het werkt.",
    type: "website",
    locale: "nl_NL",
    url: "https://mosselai.nl",
    siteName: "MosselAI",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "MosselAI",
              description:
                "AI-automatisering voor ondernemers en MKB-bedrijven in de Hoeksche Waard. Werkend in vier weken, alleen betalen als het werkt.",
              url: "https://mosselai.nl",
              email: "info@mosselai.com",
              telephone: "+31612382576",
              address: {
                "@type": "PostalAddress",
                addressRegion: "Zuid-Holland",
                addressLocality: "Hoeksche Waard",
                addressCountry: "NL",
              },
              areaServed: {
                "@type": "AdministrativeArea",
                name: "Hoeksche Waard",
              },
              founder: {
                "@type": "Person",
                name: "Bjorn Mosselman",
              },
              priceRange: "Op resultaatbasis",
              knowsLanguage: "nl",
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
        <Script
          src="https://plausible.io/js/pa-ZJoP4y_ksLsiPq3ytXxaU.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">{`
          window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)};
          window.plausible.init=window.plausible.init||function(i){window.plausible.o=i||{}};
          window.plausible.init();
        `}</Script>
      </body>
    </html>
  );
}
