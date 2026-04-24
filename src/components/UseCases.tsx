import { Package, BarChart3, Receipt, Calculator, ArrowRight } from "lucide-react";

type UseCase = {
  icon: typeof Package;
  title: string;
  description: string;
  saving: string;
  target: string;
  tag: string;
  primary?: boolean;
};

const cases: UseCase[] = [
  {
    icon: Package,
    title: "Orderverwerking",
    description: "Bestellingen automatisch in je systeem — gecheckt op voorraad en prijs.",
    saving: "2 uur → 15 min",
    target: "Groothandel, productie, handel",
    tag: "Onze hoofdfocus",
    primary: true,
  },
  {
    icon: BarChart3,
    title: "Weekrapportages",
    description: "Elke maandag automatisch een overzicht in je inbox.",
    saving: "3 uur/week → 0",
    target: "Eigenaren & managers",
    tag: "Onderzoeken we",
  },
  {
    icon: Receipt,
    title: "Facturatie",
    description: "Na elke afgeronde order wordt de factuur automatisch gemaakt en verstuurd.",
    saving: "90% minder werk",
    target: "Volgt op orderverwerking",
    tag: "Volgende stap",
  },
  {
    icon: Calculator,
    title: "Offertes & calculaties",
    description: "Concept-offerte op basis van een aanvraag. Jij checkt en verstuurt.",
    saving: "1 uur → 5 min",
    target: "Installateurs, aannemers",
    tag: "Volgende stap",
  },
];

export default function UseCases() {
  return (
    <section
      id="wat-we-doen"
      style={{ backgroundColor: "#F8F7F3", padding: "96px 0" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div style={{ marginBottom: "56px", maxWidth: "720px" }}>
          <p
            style={{
              color: "#4A7FC4",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Wat we automatiseren
          </p>
          <h2
            style={{
              color: "#1E3A5F",
              fontSize: "clamp(28px, 3.5vw, 40px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: "12px",
            }}
          >
            Begin bij orderverwerking.
          </h2>
          <p
            style={{
              color: "#5F5E5A",
              fontSize: "clamp(15px, 1.5vw, 17px)",
              lineHeight: 1.7,
            }}
          >
            Als dat draait, breiden we uit naar facturatie, offertes en rapportages.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {cases.map((uc) => {
            const Icon = uc.icon;
            const bg = uc.primary ? "#ffffff" : "#ffffff";
            const border = uc.primary ? "2px solid #4A7FC4" : "1px solid #E8E4DB";
            const shadow = uc.primary
              ? "0 20px 40px rgba(30,58,95,0.10)"
              : "none";
            const tagBg = uc.primary ? "#1E3A5F" : "#F5F1E8";
            const tagColor = uc.primary ? "#F5F1E8" : "#5F5E5A";

            return (
              <div
                key={uc.title}
                className={`card-lift ${uc.primary ? "glow-ring" : ""}`}
                style={{
                  backgroundColor: bg,
                  border: border,
                  borderRadius: "16px",
                  padding: "28px",
                  boxShadow: shadow,
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  position: "relative",
                }}
              >
                {/* Tag */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      backgroundColor: uc.primary ? "#E6EDF7" : "#F5F1E8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} color={uc.primary ? "#4A7FC4" : "#5F5E5A"} />
                  </div>
                  <span
                    style={{
                      backgroundColor: tagBg,
                      color: tagColor,
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      borderRadius: "999px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {uc.tag}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    color: "#1E3A5F",
                    fontSize: "20px",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {uc.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    color: "#2C2C2E",
                    fontSize: "14px",
                    lineHeight: 1.7,
                    margin: 0,
                    flexGrow: 1,
                  }}
                >
                  {uc.description}
                </p>

                {/* Footer: saving + target */}
                <div
                  style={{
                    borderTop: "1px solid #E8E4DB",
                    paddingTop: "14px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "13px" }}>⚡</span>
                    <span style={{ color: "#1E3A5F", fontSize: "13px", fontWeight: 600 }}>
                      {uc.saving}
                    </span>
                  </div>
                  <p style={{ color: "#5F5E5A", fontSize: "12px", margin: 0, lineHeight: 1.4 }}>
                    {uc.target}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <p
            style={{
              color: "#5F5E5A",
              fontSize: "14px",
              fontStyle: "italic",
            }}
          >
            Iets anders?{" "}
            <a
              href="#contact"
              style={{
                color: "#1E3A5F",
                fontWeight: 500,
                fontStyle: "normal",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
              className="hover:opacity-70 transition-opacity"
            >
              Vraag het me
              <ArrowRight size={14} />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
