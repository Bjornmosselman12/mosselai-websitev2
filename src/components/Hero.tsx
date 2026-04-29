"use client";

import Image from "next/image";
import { ArrowRight, ChevronDown, Check } from "lucide-react";

export default function Hero() {
  const handleStartQuiz = () => {
    const quizEl = document.getElementById("wat-we-doen");
    if (quizEl) {
      const y = quizEl.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
      setTimeout(() => {
        const startBtn = quizEl.querySelector("button") as HTMLButtonElement | null;
        if (startBtn) startBtn.click();
      }, 700);
    }
  };

  return (
    <section
      id="hero"
      style={{
        backgroundColor: "#F5F1E8",
        paddingTop: "80px",
        paddingBottom: "32px",
        flex: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: center;
        }
        .hero-photo { display: block; }
        @media (max-width: 767px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .hero-photo { display: none; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="hero-grid">

          {/* ── Linker kolom ── */}
          <div>
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
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#4A7FC4", display: "inline-block", flexShrink: 0 }} />
              AI-automatisering · Hoeksche Waard
            </div>

            {/* Headline */}
            <h1
              className="animate-fade-in-up animate-delay-100"
              style={{
                color: "#1E3A5F",
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 500,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                marginBottom: "18px",
              }}
            >
              Niemand ploegt meer met ossen.
              <br />
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #4A7FC4 0%, #1E3A5F 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                AI is jouw trekker.
              </span>
            </h1>

            {/* Subtext */}
            <p
              className="animate-fade-in-up animate-delay-200"
              style={{
                color: "#5F5E5A",
                fontSize: "15px",
                lineHeight: 1.7,
                marginBottom: "22px",
              }}
            >
              Orders natikken, facturen versturen, rapporten samenstellen:
              dat is vandaag ploegen met ossen. Ik bouw de automatisering
              die dat overneemt. Werkend in vier weken, zonder dure software.
            </p>

            {/* Actie-kaart */}
            <div
              className="animate-fade-in-up animate-delay-300"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #C5D7F0",
                borderRadius: "14px",
                padding: "18px 20px",
                marginBottom: "16px",
              }}
            >
              <p style={{ color: "#1E3A5F", fontSize: "14px", fontWeight: 500, marginBottom: "4px" }}>
                Ontdek wat er bij jou automatisch kan
              </p>
              <p style={{ color: "#5F5E5A", fontSize: "12px", lineHeight: 1.5, marginBottom: "14px" }}>
                5 vragen · 2 minuten · geen verplichtingen
              </p>
              <button
                onClick={handleStartQuiz}
                style={{
                  width: "100%",
                  backgroundColor: "#1E3A5F",
                  color: "#F5F1E8",
                  borderRadius: "9px",
                  fontSize: "14px",
                  fontWeight: 500,
                  padding: "11px 20px",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  fontFamily: "inherit",
                }}
                className="hover:opacity-90 transition-opacity duration-150"
              >
                Doe de check
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Proof-points + chevron */}
            <div
              className="animate-fade-in-up animate-delay-400"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
                {["Geen dure software", "Werkend in 4 weken", "Alleen betalen als 't werkt"].map((item) => (
                  <div key={item} style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "#5F5E5A", fontSize: "12px" }}>
                    <Check size={12} color="#4A7FC4" strokeWidth={3} />
                    {item}
                  </div>
                ))}
              </div>
              <a href="#hoe-het-werkt" style={{ color: "#5F5E5A", opacity: 0.35 }} className="hover:opacity-60 transition-opacity" aria-label="Scroll omlaag">
                <ChevronDown size={18} />
              </a>
            </div>

            {/* Onderzoek link */}
            <div className="animate-fade-in-up animate-delay-400" style={{ marginTop: "12px" }}>
              <a
                href="/onderzoek"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "#E6EDF7",
                  color: "#1E3A5F",
                  borderRadius: "999px",
                  padding: "7px 16px",
                  fontSize: "13px",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
                className="hover:opacity-80 transition-opacity duration-150"
              >
                Doe mee aan het onderzoek →
              </a>
            </div>
          </div>

          {/* ── Rechter kolom: vergelijkingsfoto ── */}
          <div
            className="hero-photo animate-fade-in-up animate-delay-200"
            style={{ position: "relative" }}
          >
            <div
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 24px 60px rgba(30,58,95,0.14), 0 4px 14px rgba(30,58,95,0.07)",
              }}
            >
              <Image
                src="/64810fea-e2e9-46ab-8d92-f3850fb3e370.jpg"
                alt="Van ossen naar trekker — de vergelijking met AI-automatisering"
                width={720}
                height={405}
                style={{ width: "100%", height: "auto", display: "block" }}
                priority
              />
            </div>

            {/* Caption */}
            <p
              style={{
                marginTop: "10px",
                fontSize: "11px",
                color: "#5F5E5A",
                opacity: 0.6,
                textAlign: "center",
                letterSpacing: "0.02em",
              }}
            >
              Toen de trekker opkwam, verdwenen de ossen van het land. Niet omdat het moest — maar omdat je zonder trekker niet meer kon concurreren. Datzelfde speelt zich nu af met AI.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
