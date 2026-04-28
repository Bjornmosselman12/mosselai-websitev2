import type { Metadata } from "next";
import { BookOpen, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OnderzoekFunnel from "@/components/OnderzoekFunnel";

export const metadata: Metadata = {
  title: "AI-adoptie onderzoek 2026 | MosselAI",
  description:
    "Hoe gebruikt het Nederlandse MKB AI in 2026? Doe mee aan het onderzoek en ontvang het rapport. Voor ondernemers: gepersonaliseerde quick-scan binnen 48 uur.",
};

export default function OnderzoekPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#F5F1E8" }}>
      <Header />
      <main style={{ flex: 1, paddingTop: "64px" }}>
        <OnderzoekFunnel />

        {/* Wat krijg je terug */}
        <section style={{ backgroundColor: "#F8F7F3", borderTop: "1px solid #E8E4DB", padding: "64px 0 80px" }}>
          <style>{`
            .onderzoek-cards {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin-top: 32px;
            }
            @media (max-width: 640px) {
              .onderzoek-cards { grid-template-columns: 1fr; }
            }
          `}</style>
          <div className="max-w-6xl mx-auto px-6">
            <h2 style={{ color: "#1E3A5F", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 500, letterSpacing: "-0.02em" }}>
              Wat krijg je terug?
            </h2>
            <p style={{ color: "#5F5E5A", fontSize: "15px", lineHeight: 1.6, marginTop: "8px" }}>
              Dit krijg je ervoor terug.
            </p>
            <div className="onderzoek-cards">
              <div className="card-lift" style={{ backgroundColor: "#F8F7F3", border: "1px solid #E8E4DB", borderRadius: "16px", padding: "28px" }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, backgroundColor: "#E6EDF7", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <BookOpen size={20} color="#4A7FC4" />
                </div>
                <h3 style={{ color: "#1E3A5F", fontSize: "16px", fontWeight: 500, marginBottom: "8px" }}>Gratis eindrapport</h3>
                <p style={{ color: "#5F5E5A", fontSize: "14px", lineHeight: 1.6 }}>
                  Zodra het onderzoek is afgerond ontvang je het volledige rapport met bevindingen, cijfers en praktijkvoorbeelden uit het Nederlandse MKB.
                </p>
              </div>
              <div className="card-lift" style={{ backgroundColor: "#ffffff", border: "2px solid #4A7FC4", borderRadius: "16px", padding: "28px", boxShadow: "0 20px 40px rgba(30,58,95,0.10)" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 5, backgroundColor: "#E6EDF7", color: "#1E3A5F", borderRadius: "999px", padding: "3px 10px", fontSize: "12px", fontWeight: 500, marginBottom: 14 }}>
                  Alleen voor ondernemers
                </div>
                <div style={{ width: 42, height: 42, borderRadius: 10, backgroundColor: "#E6EDF7", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Zap size={20} color="#4A7FC4" />
                </div>
                <h3 style={{ color: "#1E3A5F", fontSize: "16px", fontWeight: 500, marginBottom: "8px" }}>Persoonlijke quick-scan</h3>
                <p style={{ color: "#5F5E5A", fontSize: "14px", lineHeight: 1.6 }}>
                  Geef aan dat je ondernemer bent en ontvang een gratis analyse van de AI-kansen in jouw bedrijf, op maat en zonder verplichtingen.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
