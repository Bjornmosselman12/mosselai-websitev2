import { FileText, Receipt, Package, Mail, Boxes, BarChart3 } from "lucide-react";

const examples = [
  {
    icon: FileText,
    title: "Offertes & calculaties",
    forWho: "installateurs, aannemers, hoveniers",
    before: "2 uur",
    after: "10 min",
    description:
      "Klantgegevens en prijzen worden automatisch samengevoegd tot een nette offerte, klaar om te versturen.",
  },
  {
    icon: Receipt,
    title: "Facturatie",
    forWho: "dienstverleners, handelsbedrijven",
    before: "3 uur/week",
    after: "automatisch",
    description:
      "Facturen worden gegenereerd vanuit urenregistratie of orders, verstuurd naar de klant en verwerkt in je boekhouding.",
  },
  {
    icon: Package,
    title: "Orderverwerking",
    forWho: "groothandel, webshops, productie",
    before: "4 uur/week",
    after: "20 min",
    description:
      "Bestellingen uit e-mail of webshop komen direct in je systeem. Bevestigingen, pakbonnen en voorraadupdates regelen zich zelf.",
  },
  {
    icon: Mail,
    title: "Klant- en leveranciersmails",
    forWho: "bedrijven met een volle inbox",
    before: "5 uur/week",
    after: "onder controle",
    description:
      "Inkomende mails worden gecategoriseerd, standaard antwoorden gaan automatisch de deur uit, urgente zaken springen bovenaan.",
  },
  {
    icon: Boxes,
    title: "Voorraad- en inkoopbeheer",
    forWho: "detailhandel, horeca, productie",
    before: "wekelijks gedoe",
    after: "dagelijks bij",
    description:
      "Voorraadniveau wordt automatisch bijgehouden. Bij een bestelpunt krijg je een signaal of gaat de bestelling direct de deur uit.",
  },
  {
    icon: BarChart3,
    title: "Weekrapportages",
    forWho: "eigenaren die overzicht willen",
    before: "handwerk",
    after: "vrijdag in inbox",
    description:
      "Cijfers uit je verschillende tools worden elke week samengebracht in één helder rapport. Altijd actueel, zonder Excel-gepruts.",
  },
];

export default function Examples() {
  return (
    <section
      id="voorbeelden"
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
            Uit de praktijk
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
            Wat kunnen we concreet voor je automatiseren?
          </h2>
          <p
            style={{
              color: "#5F5E5A",
              fontSize: "clamp(15px, 1.5vw, 17px)",
              lineHeight: 1.7,
            }}
          >
            Een paar voorbeelden uit bedrijven die we ondersteunen. Herken je je eigen
            proces? Goed nieuws — en staat het er niet tussen? Vertel het ons, we kijken
            er gratis naar.
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
          {examples.map((ex) => {
            const Icon = ex.icon;
            return (
              <div
                key={ex.title}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #E8E4DB",
                  borderRadius: "14px",
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                }}
              >
                {/* Header row */}
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "10px",
                      backgroundColor: "#E6EDF7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} color="#4A7FC4" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        color: "#1E3A5F",
                        fontSize: "17px",
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      {ex.title}
                    </h3>
                    <p
                      style={{
                        color: "#5F5E5A",
                        fontSize: "12px",
                        margin: 0,
                        marginTop: "3px",
                        lineHeight: 1.3,
                      }}
                    >
                      Voor {ex.forWho}
                    </p>
                  </div>
                </div>

                {/* Before → After */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor: "#F8F7F3",
                    border: "1px solid #E8E4DB",
                    borderRadius: "10px",
                    padding: "12px 14px",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <p style={{ color: "#5F5E5A", fontSize: "10px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", margin: 0 }}>
                      Voorheen
                    </p>
                    <p style={{ color: "#5F5E5A", fontSize: "14px", fontWeight: 500, margin: 0, marginTop: "2px" }}>
                      {ex.before}
                    </p>
                  </div>
                  <span style={{ color: "#4A7FC4", fontSize: "16px", fontWeight: 700 }}>→</span>
                  <div style={{ flex: 1, textAlign: "right" }}>
                    <p style={{ color: "#4A7FC4", fontSize: "10px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", margin: 0 }}>
                      Na
                    </p>
                    <p style={{ color: "#1E3A5F", fontSize: "14px", fontWeight: 600, margin: 0, marginTop: "2px" }}>
                      {ex.after}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p
                  style={{
                    color: "#2C2C2E",
                    fontSize: "14px",
                    lineHeight: 1.65,
                    margin: 0,
                    flexGrow: 1,
                  }}
                >
                  {ex.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p
          style={{
            color: "#5F5E5A",
            fontSize: "14px",
            textAlign: "center",
            marginTop: "40px",
            fontStyle: "italic",
          }}
        >
          Zie je jouw proces er niet tussen staan?{" "}
          <a
            href="#contact"
            style={{ color: "#1E3A5F", fontWeight: 500, fontStyle: "normal" }}
            className="hover:opacity-70 transition-opacity"
          >
            Vraag het me →
          </a>
        </p>
      </div>
    </section>
  );
}
