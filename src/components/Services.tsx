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
              Eerst begrijpen, dan bouwen
            </p>
            <h3 style={{ color: "#F5F1E8", fontSize: "clamp(18px, 1.6vw, 22px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "10px" }}>
              Procesanalyse & advies
            </h3>
            <p style={{ color: "#C5D7F0", fontSize: "13px", lineHeight: 1.7 }}>
              Samen in kaart brengen welke processen het meest lonen om te automatiseren. Voor bedrijven die weten dat er winst te halen valt maar niet weten waar te beginnen.
            </p>
          </div>

          {/* ── Consultancy (op één na groot) ── */}
          <div className="svc-card svc-consult">
            <div className="svc-icon" style={{ width: 44, height: 44, marginBottom: 20 }}>
              <Layers size={20} color="#C5D7F0" />
            </div>
            <p style={{ color: "#4A7FC4", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>
              Van papier naar systeem
            </p>
            <h3 style={{ color: "#F5F1E8", fontSize: "clamp(20px, 2vw, 28px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "12px" }}>
              Digitalisering & consultancy
            </h3>
            <p style={{ color: "#C5D7F0", fontSize: "15px", lineHeight: 1.75 }}>
              Voor organisaties die verder willen dan één losse automatisering. Complete digitale transformatie van A tot Z, van analyse tot livegang.
            </p>
          </div>

        </div>

        {/* CTA */}
        <div style={{ marginTop: "40px", display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
          <a
            href="#over"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#F5F1E8",
              color: "#1E3A5F",
              borderRadius: "10px",
              padding: "13px 24px",
              fontSize: "15px",
              fontWeight: 500,
              textDecoration: "none",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Neem contact op
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <p style={{ color: "#C5D7F0", fontSize: "14px", opacity: 0.7 }}>
            Ik kijk gratis mee wat er bij jou mogelijk is.
          </p>
        </div>

      </div>
    </section>
  );
}
