import { Building2, Boxes, Check, Minus } from "lucide-react";

type Row = { label: string; mossel: string; consult: string; diy: string };

const rows: Row[] = [
  { label: "Tijd tot werkend", mossel: "4 weken", consult: "3–6 maanden", diy: "Weken tot jaren" },
  { label: "Betaling", mossel: "Maandelijks, alleen zolang het werkt", consult: "Vaste dagtarieven, vooraf", diy: "Maandlicenties, altijd" },
  { label: "Wie spreek je?", mossel: "De oprichter, direct", consult: "Accountmanager → consultant", diy: "Helpdesk of niemand" },
  { label: "Waar zitten ze?", mossel: "Hoeksche Waard", consult: "Randstad / internationaal", diy: "Online" },
  { label: "Software", mossel: "Werkt met je bestaande tools", consult: "Enterprise-platformen", diy: "Losse abonnementen, stapelen" },
];

export default function Comparison() {
  return (
    <section
      id="waarom"
      style={{ backgroundColor: "#F5F1E8", padding: "96px 0" }}
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
            Waarom MosselAI
          </p>
          <h2
            style={{
              color: "#1E3A5F",
              fontSize: "clamp(28px, 3.5vw, 40px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            Hoe pak je dit nu aan?
            <br />
            Er zijn drie opties.
          </h2>
          <p
            style={{
              color: "#5F5E5A",
              fontSize: "clamp(15px, 1.5vw, 17px)",
              lineHeight: 1.7,
            }}
          >
            De meeste MKB&apos;ers kiezen tussen een duur traject bij een consultancybureau
            of het zelf uitzoeken met losse tools. Dat is een keuze tussen traag en risicovol.
            MosselAI is een derde optie.
          </p>
        </div>

        {/* Comparison grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            alignItems: "stretch",
          }}
        >
          {/* Consultancy card */}
          <ComparisonCard
            icon={Building2}
            label="Consultancybureau"
            subtitle="Groot, gestructureerd, duur"
            rows={rows.map((r) => ({ label: r.label, value: r.consult }))}
            muted
          />

          {/* MosselAI card — featured */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: "-14px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#1E3A5F",
                color: "#F5F1E8",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "5px 14px",
                borderRadius: "999px",
                whiteSpace: "nowrap",
                zIndex: 1,
              }}
            >
              Aanbevolen
            </div>
            <ComparisonCard
              icon={null}
              label="MosselAI"
              subtitle="Lokaal, persoonlijk, zonder risico"
              rows={rows.map((r) => ({ label: r.label, value: r.mossel }))}
              featured
            />
          </div>

          {/* DIY card */}
          <ComparisonCard
            icon={Boxes}
            label="SaaS-tools + DIY"
            subtitle="Los aanschaffen, zelf klussen"
            rows={rows.map((r) => ({ label: r.label, value: r.diy }))}
            muted
          />
        </div>

        {/* Footer note */}
        <div style={{ marginTop: "48px", textAlign: "center" }}>
          <p
            style={{
              color: "#1E3A5F",
              fontSize: "15px",
              fontWeight: 500,
              marginBottom: "6px",
            }}
          >
            Eén gesprek. Geen verkoop. Ik kijk wat er bij jou kan.
          </p>
          <p
            style={{
              color: "#5F5E5A",
              fontSize: "14px",
              fontStyle: "italic",
            }}
          >
            Past dit bij jouw bedrijf? <a href="#contact" style={{ color: "#1E3A5F", fontWeight: 500, fontStyle: "normal" }} className="hover:opacity-70 transition-opacity">Laat van je horen →</a>
          </p>
        </div>
      </div>
    </section>
  );
}

function ComparisonCard({
  icon: Icon,
  label,
  subtitle,
  rows,
  featured = false,
  muted = false,
}: {
  icon: typeof Building2 | null;
  label: string;
  subtitle: string;
  rows: { label: string; value: string }[];
  featured?: boolean;
  muted?: boolean;
}) {
  const bg = featured ? "#ffffff" : "#FBFAF5";
  const border = featured ? "2px solid #4A7FC4" : "1px solid #E8E4DB";
  const shadow = featured ? "0 24px 48px rgba(30,58,95,0.14)" : "none";
  const titleColor = featured ? "#1E3A5F" : "#2C2C2E";
  const valueColor = muted ? "#5F5E5A" : "#1E3A5F";
  const valueWeight = muted ? 400 : 500;

  return (
    <div
      className={`card-lift ${featured ? "glow-ring" : ""}`}
      style={{
        backgroundColor: bg,
        border: border,
        borderRadius: "16px",
        padding: "32px 28px",
        boxShadow: shadow,
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        height: "100%",
        position: "relative",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {Icon ? (
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                backgroundColor: muted ? "#F5F1E8" : "#E6EDF7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon size={18} color="#5F5E5A" />
            </div>
          ) : (
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                backgroundColor: "#1E3A5F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: "#F5F1E8",
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "-0.05em",
              }}
            >
              M
            </div>
          )}
          <div style={{ flex: 1 }}>
            <h3
              style={{
                color: titleColor,
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {label}
            </h3>
            <p style={{ color: "#5F5E5A", fontSize: "12px", margin: 0, marginTop: "2px" }}>
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", flexGrow: 1 }}>
        {rows.map((row, idx) => (
          <div
            key={row.label}
            className={featured ? `stagger-item stagger-${idx + 1}` : ""}
            style={{ display: "flex", flexDirection: "column", gap: "4px" }}
          >
            <span
              style={{
                color: "#5F5E5A",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {row.label}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {featured ? (
                <Check size={14} color="#4A7FC4" strokeWidth={3} style={{ flexShrink: 0 }} />
              ) : (
                <Minus size={14} color="#C5C3BC" strokeWidth={2} style={{ flexShrink: 0 }} />
              )}
              <span
                style={{
                  color: valueColor,
                  fontSize: "14px",
                  fontWeight: valueWeight,
                  lineHeight: 1.4,
                }}
              >
                {row.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
