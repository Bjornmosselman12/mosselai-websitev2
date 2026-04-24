import {
  ShoppingCart,
  Receipt,
  BarChart2,
  Database,
  Mail,
  FolderOpen,
} from "lucide-react";

const features = [
  {
    icon: ShoppingCart,
    title: "Orderverwerking",
    description:
      "Bestellingen via e-mail of PDF worden automatisch uitgelezen en klaargezet in je systeem.",
  },
  {
    icon: Receipt,
    title: "Factuurverwerking",
    description:
      "Inkoopfacturen worden gelezen, gecontroleerd en klaargezet voor betaling, zonder dat iemand er naar hoeft te kijken.",
  },
  {
    icon: BarChart2,
    title: "Rapportages",
    description:
      "Wekelijkse rapportages worden automatisch gegenereerd en verstuurd naar wie ze nodig heeft.",
  },
  {
    icon: Database,
    title: "Data-invoer",
    description:
      "Gegevens uit formulieren of e-mails worden automatisch in je systemen gezet.",
  },
  {
    icon: Mail,
    title: "E-mailafhandeling",
    description:
      "Inkomende e-mails worden automatisch gecategoriseerd en waar mogelijk direct beantwoord.",
  },
  {
    icon: FolderOpen,
    title: "Administratie",
    description:
      "Terugkerend administratief werk wordt een druk op de knop in plaats van een uur handmatig werk.",
  },
];

export default function Features() {
  return (
    <section
      id="diensten"
      style={{ backgroundColor: "#F5F1E8", padding: "96px 0" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Sectietitel */}
        <div style={{ marginBottom: "56px", maxWidth: "560px" }}>
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
              fontSize: "clamp(28px, 3.5vw, 36px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            Kleine, concrete oplossingen voor grote tijdverspillers.
          </h2>
          <p style={{ color: "#5F5E5A", fontSize: "16px", lineHeight: 1.7 }}>
            Geen platforms, geen beloftes, alleen werk dat eerder handmatig ging
            en nu vanzelf loopt.
          </p>
        </div>

        {/* Feature kaarten */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                style={{
                  backgroundColor: "#F8F7F3",
                  border: "1px solid #E8E4DB",
                  borderRadius: "12px",
                  padding: "28px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#E6EDF7",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                  }}
                >
                  <Icon size={18} color="#4A7FC4" />
                </div>
                <h3
                  style={{
                    color: "#1E3A5F",
                    fontSize: "17px",
                    fontWeight: 500,
                    marginBottom: "8px",
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: "#5F5E5A", fontSize: "14px", lineHeight: 1.7 }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
