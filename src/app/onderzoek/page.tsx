import Script from "next/script";
import type { Metadata } from "next";
import { BookOpen, Zap, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "AI in het Nederlandse MKB — Onderzoek 2026 | MosselAI",
  description:
    "Doe mee aan ons onderzoek naar AI-gebruik in het Nederlandse MKB. Ontvang gratis het eindrapport en — als ondernemer — een persoonlijke quick-scan van de AI-kansen in jouw bedrijf.",
};

export default function OnderzoekPage() {
  return (
    <>
      <Script src="https://tally.so/widgets/embed.js" strategy="afterInteractive" />

      <main style={{ backgroundColor: "#F5F1E8", minHeight: "100vh", paddingTop: "80px" }}>

        {/* ── Hero ── */}
        <section style={{ padding: "64px 0 48px" }}>
          <div className="max-w-6xl mx-auto px-6">

            {/* Badge */}
            <div
              className="animate-fade-in-up"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#E6EDF7",
                color: "#1E3A5F",
                borderRadius: "999px",
                padding: "5px 14px",
                fontSize: "13px",
                fontWeight: 500,
                marginBottom: "20px",
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "#4A7FC4",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              Onderzoek · MosselAI 2026
            </div>

            {/* Headline */}
            <h1
              className="animate-fade-in-up animate-delay-100"
              style={{
                color: "#1E3A5F",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 500,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                marginBottom: "18px",
                maxWidth: "680px",
              }}
            >
              AI in het Nederlandse MKB —{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #4A7FC4 0%, #1E3A5F 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Onderzoek 2026
              </span>
            </h1>

            {/* Subtekst */}
            <p
              className="animate-fade-in-up animate-delay-200"
              style={{
                color: "#5F5E5A",
                fontSize: "15px",
                lineHeight: 1.7,
                marginBottom: "24px",
                maxWidth: "580px",
              }}
            >
              Hoe ver staat het Nederlandse MKB met AI? We brengen het in kaart.
              Vul de vragenlijst in en help ons een eerlijk beeld te schetsen van
              kansen, drempels en praktijkervaringen. Alle deelnemers ontvangen
              het eindrapport zodra het gepubliceerd wordt.
            </p>

            {/* Proof-points */}
            <div
              className="animate-fade-in-up animate-delay-300"
              style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}
            >
              {["Anoniem", "5 minuten", "Gratis rapport"].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    color: "#5F5E5A",
                    fontSize: "13px",
                  }}
                >
                  <Check size={13} color="#4A7FC4" strokeWidth={3} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tally embed ── */}
        <section style={{ backgroundColor: "#F8F7F3", padding: "48px 0" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #E8E4DB",
                borderRadius: "16px",
                padding: "32px",
                overflow: "hidden",
              }}
            >
              <iframe
                data-tally-src="https://tally.so/embed/PLACEHOLDER?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                width="100%"
                height="500"
                frameBorder={0}
                marginHeight={0}
                marginWidth={0}
                title="MosselAI onderzoek 2026"
                style={{ display: "block" }}
              />
            </div>
          </div>
        </section>

        {/* ── Wat krijg je terug ── */}
        <section style={{ padding: "64px 0 80px" }}>
          <style>{`
            .onderzoek-cards {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin-top: 36px;
            }
            @media (max-width: 640px) {
              .onderzoek-cards {
                grid-template-columns: 1fr;
              }
            }
          `}</style>
          <div className="max-w-6xl mx-auto px-6">

            <h2
              className="animate-fade-in-up"
              style={{
                color: "#1E3A5F",
                fontSize: "clamp(22px, 3vw, 30px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              Wat krijg je terug?
            </h2>
            <p
              style={{
                color: "#5F5E5A",
                fontSize: "15px",
                lineHeight: 1.6,
                marginTop: "8px",
              }}
            >
              Deelnemen kost je vijf minuten — dit krijg je ervoor terug.
            </p>

            <div className="onderzoek-cards">

              {/* Card 1 – Rapport */}
              <div
                className="animate-fade-in-up animate-delay-100 card-lift"
                style={{
                  backgroundColor: "#F8F7F3",
                  border: "1px solid #E8E4DB",
                  borderRadius: "16px",
                  padding: "28px",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    backgroundColor: "#E6EDF7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                  }}
                >
                  <BookOpen size={20} color="#4A7FC4" />
                </div>
                <h3
                  style={{
                    color: "#1E3A5F",
                    fontSize: "16px",
                    fontWeight: 500,
                    marginBottom: "8px",
                  }}
                >
                  Gratis eindrapport
                </h3>
                <p style={{ color: "#5F5E5A", fontSize: "14px", lineHeight: 1.6 }}>
                  Zodra het onderzoek is afgerond ontvang je het volledige
                  rapport met alle bevindingen, cijfers en praktijkvoorbeelden
                  uit het Nederlandse MKB.
                </p>
              </div>

              {/* Card 2 – Quick-scan */}
              <div
                className="animate-fade-in-up animate-delay-200 card-lift"
                style={{
                  backgroundColor: "#ffffff",
                  border: "2px solid #4A7FC4",
                  borderRadius: "16px",
                  padding: "28px",
                  boxShadow: "0 20px 40px rgba(30,58,95,0.10)",
                }}
              >
                {/* Badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    backgroundColor: "#E6EDF7",
                    color: "#1E3A5F",
                    borderRadius: "999px",
                    padding: "3px 10px",
                    fontSize: "12px",
                    fontWeight: 500,
                    marginBottom: "14px",
                  }}
                >
                  Alleen voor ondernemers
                </div>

                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    backgroundColor: "#E6EDF7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                  }}
                >
                  <Zap size={20} color="#4A7FC4" />
                </div>
                <h3
                  style={{
                    color: "#1E3A5F",
                    fontSize: "16px",
                    fontWeight: 500,
                    marginBottom: "8px",
                  }}
                >
                  Persoonlijke quick-scan
                </h3>
                <p style={{ color: "#5F5E5A", fontSize: "14px", lineHeight: 1.6 }}>
                  Geef aan dat je ondernemer bent en ontvang een gratis analyse
                  van de concrete AI-kansen in jouw bedrijf — op maat, zonder
                  verplichtingen.
                </p>
              </div>

            </div>
          </div>
        </section>

      </main>
    </>
  );
}
