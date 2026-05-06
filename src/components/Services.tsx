"use client";

import { Zap, Code2, Search, Layers } from "lucide-react";

const services = [
  {
    icon: Zap,
    kicker: "Herhaling eruit, snelheid erin",
    title: "AI-automatisering",
    desc: "Ik analyseer waar jullie tijd in zit en bouw de koppeling of logica die dat overneemt. Factuurverwerking, orderbevestigingen, rapportages — werkend binnen vier weken.",
  },
  {
    icon: Search,
    kicker: "Eerst begrijpen, dan bouwen",
    title: "Procesanalyse & advies",
    desc: "Samen in kaart brengen welke processen het meest lonen om te automatiseren. Voor bedrijven die weten dat er winst te halen valt maar niet weten waar te beginnen.",
  },
  {
    icon: Layers,
    kicker: "Van papier naar systeem",
    title: "Digitalisering & consultancy",
    desc: "Voor organisaties die verder willen dan één losse automatisering. Complete digitale transformatie van A tot Z — van analyse tot livegang.",
  },
  {
    icon: Code2,
    kicker: "Live in een week",
    title: "Websites",
    desc: "Professionele websites met maatwerk design. Snel gebouwd, makkelijk te beheren, en altijd in lijn met jouw uitstraling.",
  },
];

export default function Services() {
  return (
    <section id="diensten" style={{ backgroundColor: "#1E3A5F", padding: "96px 0" }}>
      <style>{`
        .svc-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(197,215,240,0.14);
          border-radius: 16px;
          padding: 32px;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .svc-card:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(197,215,240,0.30);
          transform: translateY(-3px);
        }
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (max-width: 767px) {
          .svc-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div style={{ marginBottom: "56px" }}>
          <p style={{
            color: "#4A7FC4",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}>
            Wat ik doe
          </p>
          <h2 style={{
            color: "#F5F1E8",
            fontSize: "clamp(28px, 3.5vw, 44px)",
            fontWeight: 500,
            letterSpacing: "-0.025em",
            lineHeight: 1.15,
            maxWidth: "640px",
          }}>
            Vier manieren waarop ik{" "}
            <span style={{
              backgroundImage: "linear-gradient(90deg, #C5D7F0 0%, #4A7FC4 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}>
              jouw bedrijf versnel.
            </span>
          </h2>
        </div>

        {/* Cards */}
        <div className="svc-grid">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="svc-card">
                {/* Icon */}
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(74,127,196,0.18)",
                  border: "1px solid rgba(74,127,196,0.30)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Icon size={18} color="#C5D7F0" />
                </div>

                {/* Text */}
                <div>
                  <p style={{
                    color: "#4A7FC4",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}>
                    {s.kicker}
                  </p>
                  <h3 style={{
                    color: "#F5F1E8",
                    fontSize: "clamp(18px, 1.8vw, 22px)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    marginBottom: "10px",
                  }}>
                    {s.title}
                  </h3>
                  <p style={{
                    color: "#C5D7F0",
                    fontSize: "14px",
                    lineHeight: 1.7,
                  }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
