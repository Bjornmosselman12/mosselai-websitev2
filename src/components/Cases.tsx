import { ArrowRight, Clock } from "lucide-react";

// {{ PLACEHOLDER: vervang lege array door echte cases zodra Bussing-pilot af is }}
const cases: {
  title: string;
  company: string;
  sector: string;
  result: string;
  description: string;
}[] = [];

const placeholderCount = 3;

export default function Cases() {
  return (
    <section
      id="cases"
      style={{ backgroundColor: "#F5F1E8", padding: "96px 0" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Sectietitel */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "48px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
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
              Cases
            </p>
            <h2
              style={{
                color: "#1E3A5F",
                fontSize: "clamp(28px, 3.5vw, 36px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Wat we al hebben gebouwd.
            </h2>
          </div>
        </div>

        {/* Cases grid */}
        {cases.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {cases.map((c) => (
              <div
                key={c.title}
                style={{
                  backgroundColor: "#F8F7F3",
                  border: "1px solid #E8E4DB",
                  borderRadius: "12px",
                  padding: "28px",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    backgroundColor: "#E6EDF7",
                    color: "#1E3A5F",
                    borderRadius: "999px",
                    padding: "3px 12px",
                    fontSize: "12px",
                    fontWeight: 500,
                    marginBottom: "16px",
                  }}
                >
                  {c.sector}
                </div>
                <h3
                  style={{
                    color: "#1E3A5F",
                    fontSize: "18px",
                    fontWeight: 500,
                    marginBottom: "8px",
                  }}
                >
                  {c.title}
                </h3>
                <p
                  style={{
                    color: "#5F5E5A",
                    fontSize: "14px",
                    lineHeight: 1.7,
                    marginBottom: "20px",
                  }}
                >
                  {c.description}
                </p>
                <div
                  style={{
                    paddingTop: "16px",
                    borderTop: "1px solid #E8E4DB",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <ArrowRight size={14} color="#2D7D5A" />
                  <span
                    style={{
                      color: "#2D7D5A",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {c.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Placeholder kaarten zolang er nog geen echte cases zijn
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {Array.from({ length: placeholderCount }).map((_, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#F8F7F3",
                  border: "1px dashed #C5D7F0",
                  borderRadius: "12px",
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "#E6EDF7",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Clock size={16} color="#4A7FC4" />
                </div>
                <p
                  style={{
                    color: "#5F5E5A",
                    fontSize: "14px",
                    lineHeight: 1.7,
                  }}
                >
                  Eerste case verschijnt binnenkort.
                </p>
                <span
                  style={{
                    color: "#C5D7F0",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  {/* {{ PLACEHOLDER: vul in zodra Bussing-pilot af is }} */}
                  In voorbereiding
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
