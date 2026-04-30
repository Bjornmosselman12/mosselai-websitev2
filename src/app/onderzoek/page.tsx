import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OnderzoekFunnel from "@/components/OnderzoekFunnel";

export const metadata: Metadata = {
  title: "AI-adoptie onderzoek 2026 | MosselAI",
  description:
    "Hoe gebruiken Nederlandse bedrijven AI in 2026? Doe mee aan het onderzoek en ontvang het rapport. Voor ondernemers: gepersonaliseerde quick-scan binnen 48 uur.",
};

export default function OnderzoekPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#F5F1E8" }}>
      <Header />
      <main style={{ flex: 1, paddingTop: "64px" }}>
        <OnderzoekFunnel />
      </main>
      <Footer />
    </div>
  );
}
