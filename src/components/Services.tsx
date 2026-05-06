"use client";

import { Zap, Search, Layers } from "lucide-react";

export default function Services() {
  return (
    <section id="diensten" style={{ backgroundColor: "#1E3A5F", padding: "96px 0" }}>
      <style>{`
        .svc-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(197,215,240,0.14);
          border-radius: 16px;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
          display: flex;
          flex-direction: column;
        }
        .svc-card:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(197,215,240,0.30);
          transform: translateY(-3px);
        }
        .svc-icon {
          border-radius: 10px;
          background: rgba(74,127,196,0.18);
          border: 1px solid rgba(74,127,196,0.30);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .svc-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          grid-template-rows: auto auto;
          gap: 16px;
        }
        .svc-ai      { grid-column: 1 / -1; grid-row: 1; padding: 44px; }
        .svc-proces  { grid-column: 1;      grid-row: 2; padding: 28px; }
        .svc-consult { grid-column: 2;      grid-row: 2; padding: 36px; }

        @media (max-width: 767px) {
          .svc-grid { grid-template-columns: 1fr; }
          .svc-ai, .svc-proces, .svc-consult {
            grid-column: 1; grid-row: auto; padding: 28px;
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div style={{ marginBottom: "56px" }}>
          <p style={{
            color: "#4A7FC4", fontSize: "13px", fontWeight: 500,
            letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px",
          }}>
            Wat ik doe
          </p>
          <h2 style={{
            color: "#F5F1E8", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 500,
            letterSpacing: "-0.025em", lineHeight: 1.15, maxWidth: "640px",
          }}>
            Drie manieren waarop ik{" "}
            <span style={{
              backgroundImage: "linear-gradient(90deg, #C5D7F0 0%, #4A7FC4 100%)",
              WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
            }}>
              jouw bedrijf versnel.
            </span>
          </h2>
        </div>

        <div className="svc-grid">

          {/* ── AI-automatisering (groot) ── */}
          <div className="svc-card svc-ai">
            <div className="svc-icon" style={{ width: 48, height: 48, marginBottom: 24 }}>
              <Zap size={22} color="#C5D7F0" />
            </div>
            <p style={{ color: "#4A7FC4", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>
              Herhaling eruit, snelheid erin
            </p>
            <h3 style={{ color: "#F5F1E8", fontSize: "clamp(24px, 2.5vw, 34px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "14px" }}>
              AI-automatisering
            </h3>
            <p style={{ color: "#C5D7F0", fontSize: "16px", lineHeight: 1.75 }}>
              Ik breng in kaart welke taken elke week terugkomen en bouw de software die dat automatisch afhandelt. Factuurverwerking, orderbevestigingen, rapportages. Werkend binnen vier weken.
            </p>
          </div>

          {/* ── Procesanalyse (medium) ── */}
          <div className="svc-card svc-proces">
            <div className="svc-icon" style={{ width: 40, height: 40, marginBottom: 18 }}>
              <Search size={17} color="#C5D7F0" />
            </div>
            <p style={{ color: "#4A7FC4", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>
              Jullie eigen IT-team, mijn richting
            </p>
            <h3 style={{ color: "#F5F1E8", fontSize: "clamp(18px, 1.6vw, 22px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "10px" }}>
              Consultancy
            </h3>
            <p style={{ color: "#C5D7F0", fontSize: "13px", lineHeight: 1.7 }}>
              Heb je al een intern development- of IT-team maar weet je niet waar te beginnen met AI? Ik analyseer jullie processen, stel de prioriteiten vast en geef het team concrete richting om zelf te bouwen.
            </p>
          </div>

          {/* ── Digitalisering (op één na groot) ── */}
          <div className="svc-card svc-consult">
            <div className="svc-icon" style={{ width: 44, height: 44, marginBottom: 20 }}>
              <Layers size={20} color="#C5D7F0" />
            </div>
            <p style={{ color: "#4A7FC4", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>
              Volledig ontzorgd
            </p>
            <h3 style={{ color: "#F5F1E8", fontSize: "clamp(20px, 2vw, 28px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "12px" }}>
              Digitalisering & implementatie
            </h3>
            <p style={{ color: "#C5D7F0", fontSize: "15px", lineHeight: 1.75 }}>
              Geen intern IT-team? Geen probleem. Ik neem het volledige traject op me: van analyse en ontwerp tot bouw, livegang en doorlopend onderhoud. Jij hoeft alleen te zeggen wat je wilt bereiken.
            </p>
          </div>

        </div>

        {/* CTA */}
        <div style={{ marginTop: "40px" }}>
          <style>{`
            .svc-cta {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              color: rgba(197,215,240,0.55);
              font-size: 15px;
              font-weight: 500;
              text-decoration: none;
              transition: color 0.2s ease, text-shadow 0.2s ease;
            }
            .svc-cta:hover {
              color: #F5F1E8;
              text-shadow: 0 0 20px rgba(197,215,240,0.6), 0 0 40px rgba(74,127,196,0.35);
            }
            .svc-cta:hover .svc-cta-arrow {
              transform: translateX(4px);
            }
            .svc-cta-arrow {
              transition: transform 0.2s ease;
            }
          `}</style>
          <a href="#contact" className="svc-cta">
            Neem contact op
            <svg className="svc-cta-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
