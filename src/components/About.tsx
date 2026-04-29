import { MapPin, Code2 } from "lucide-react";

const highlights = [
  { icon: MapPin, label: "Hoeksche Waard, Zuid-Holland" },
  { icon: Code2, label: "Softwareontwikkeling & AI-automatisering" },
];

export default function About() {
  return (
    <section
      id="over"
      style={{ backgroundColor: "#F5F1E8", padding: "96px 0" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "64px",
            alignItems: "center",
          }}
        >
          {/* Tekst */}
          <div>
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
              Over MosselAI
            </p>
            <h2
              style={{
                color: "#1E3A5F",
                fontSize: "clamp(28px, 3.5vw, 36px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                marginBottom: "24px",
              }}
            >
              Eindelijk iemand die het begrijpt{" "}
              <span className="gradient-text">zonder gedoe.</span>
            </h2>
            <p
              style={{
                color: "#2C2C2E",
                fontSize: "16px",
                lineHeight: 1.8,
                marginBottom: "16px",
              }}
            >
              {/* {{ PLACEHOLDER: vervang door persoonlijke tekst zodra klaar }} */}
              MosselAI is opgericht door{" "}
              <strong style={{ fontWeight: 500 }}>
                Bjorn Mosselman
              </strong>
              . Met een achtergrond in softwareontwikkeling en een passie voor
              praktische technologie, bouw ik automatiseringen die écht werken
              voor lokale ondernemers.
            </p>
            <p
              style={{
                color: "#2C2C2E",
                fontSize: "16px",
                lineHeight: 1.8,
                marginBottom: "32px",
              }}
            >
              Geen buzzwords, geen gedoe. Gewoon: wat kost jou nu wekelijks tijd, en
              hoe laten we dat vanzelf lopen?
            </p>

            {/* Highlights */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    style={{ display: "flex", alignItems: "center", gap: "12px" }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: "#E6EDF7",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={15} color="#4A7FC4" />
                    </div>
                    <span style={{ color: "#5F5E5A", fontSize: "14px" }}>
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <style>{`
              .about-cta-primary:hover { opacity: 0.85; }
              .about-cta-secondary:hover { opacity: 1 !important; }
            `}</style>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
              <a
                href="/#contact"
                className="about-cta-primary"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  backgroundColor: "#1E3A5F", color: "#F5F1E8",
                  borderRadius: "8px", padding: "12px 22px",
                  fontSize: "14px", fontWeight: 500, textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
              >
                Plan een kennismaking
              </a>
              <a
                href="tel:+31612382576"
                className="about-cta-secondary"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  color: "#1E3A5F", fontSize: "14px", fontWeight: 500,
                  textDecoration: "none", opacity: 0.6,
                  transition: "opacity 0.2s",
                }}
              >
                of bel direct: +31 6 12 38 25 76
              </a>
            </div>
          </div>

          {/* Foto oprichter */}
          <div style={{ position: "relative", display: "inline-block", maxWidth: "360px" }}>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "-14px",
                borderRadius: "18px",
                background: "linear-gradient(135deg, rgba(74,127,196,0.28) 0%, rgba(30,58,95,0.08) 60%, transparent 100%)",
                filter: "blur(24px)",
                zIndex: 0,
              }}
            />
            <img
              src="/bjorn.jpg"
              alt="Bjorn Mosselman, oprichter MosselAI"
              className="about-photo"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "360px",
                aspectRatio: "1/1",
                objectFit: "cover",
                borderRadius: "12px",
                border: "1px solid #E8E4DB",
                display: "block",
                transition: "transform 0.5s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.5s ease",
                zIndex: 1,
              }}
            />
            <style>{`
              .about-photo:hover {
                transform: scale(1.02);
                box-shadow: 0 24px 48px rgba(30, 58, 95, 0.18);
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}
