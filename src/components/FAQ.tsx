"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Wat kost het?",
    answer:
      "Geen opstartkosten en geen vaste projectprijs vooraf. Je betaalt maandelijks een bedrag dat past bij de tijd die de automatisering voor jou bespaart. Gemiddeld zit dat tussen de €150 en €750 per maand, afhankelijk van de complexiteit en de hoeveelheid werk die automatisch gaat lopen. Dat bedrag spreken we samen af voordat ik begin, zodat er nooit verrassingen zijn.",
  },
  {
    question: "Hoe werkt de betaling precies?",
    answer:
      "Maandelijks. Elke maand opnieuw kijk ik of de automatisering nog doet wat hij moet doen. Werkt hij, dan loopt het door. Werkt hij niet meer, of wil je om een andere reden stoppen? Dan stop je, zonder opzegtermijn of boete. Zo houd ik zelf ook de verantwoordelijkheid om het te laten blijven werken.",
  },
  {
    question: "Hoe lang duurt een project?",
    answer:
      "Een eerste pilot duurt gemiddeld 2 tot 4 weken. Ik start klein en concreet: één taak, goed gedaan. Zodra die werkt, kijken we samen of er meer te automatiseren valt.",
  },
  {
    question: "Is mijn data veilig?",
    answer:
      "Ja. Ik werk uitsluitend met gerenommeerde platforms (zoals Make, n8n en OpenAI). Jouw data verlaat nooit de tools die jij zelf al gebruikt of goedkeurt. Ik teken indien gewenst een verwerkersovereenkomst (AVG-compliant).",
  },
  {
    question: "Wat als het niet werkt?",
    answer:
      "Dan betaal je niets. Dat is geen marketingpraatje, het is letterlijk hoe ik werk. Als de automatisering geen aantoonbare tijdsbesparing oplevert, reken ik niets. Ik neem het risico.",
  },
  {
    question: "Werk je ook buiten de Hoeksche Waard?",
    answer:
      "Mijn focus ligt op de Hoeksche Waard en de omliggende regio in Zuid-Holland. Voor bedrijven buiten de regio werk ik ook samen. Neem contact op en ik kijk wat mogelijk is.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      style={{ backgroundColor: "#F5F1E8", padding: "96px 0" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "64px",
            alignItems: "start",
          }}
        >
          {/* Label */}
          <div style={{ maxWidth: "320px" }}>
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
              Veelgestelde vragen
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
              Eerlijke antwoorden op eerlijke vragen.
            </h2>
            <p style={{ color: "#5F5E5A", fontSize: "15px", lineHeight: 1.7 }}>
              Staat jouw vraag er niet bij?{" "}
              <a
                href="#contact"
                style={{ color: "#1E3A5F", textDecoration: "underline" }}
              >
                Stel hem gerust.
              </a>
            </p>
          </div>

          {/* FAQ items */}
          <style>{`
            .faq-item {
              border-bottom: 1px solid #E8E4DB;
              transition: border-color 0.2s ease;
            }
            .faq-item:hover .faq-number {
              background-color: #E6EDF7;
              color: #1E3A5F;
            }
            .faq-item:hover .faq-chevron {
              color: #1E3A5F;
            }
            .faq-trigger {
              width: 100%;
              display: flex;
              align-items: center;
              gap: 16px;
              padding: 20px 0;
              background: none;
              border: none;
              cursor: pointer;
              text-align: left;
              font-family: inherit;
            }
            .faq-number {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 28px;
              height: 28px;
              border-radius: 50%;
              background-color: #F5F1E8;
              color: #5F5E5A;
              font-size: 12px;
              font-weight: 600;
              letter-spacing: 0.02em;
              flex-shrink: 0;
              transition: background-color 0.25s ease, color 0.25s ease;
            }
            .faq-item[data-open="true"] .faq-number {
              background-color: #4A7FC4;
              color: #F5F1E8;
            }
            .faq-chevron {
              color: #4A7FC4;
              flex-shrink: 0;
              transition: transform 0.3s cubic-bezier(0.2,0.8,0.2,1), color 0.2s ease;
            }
            .faq-item[data-open="true"] .faq-chevron {
              transform: rotate(180deg);
            }
            .faq-panel {
              overflow: hidden;
              max-height: 0;
              transition: max-height 0.35s cubic-bezier(0.2,0.8,0.2,1), opacity 0.25s ease;
              opacity: 0;
            }
            .faq-item[data-open="true"] .faq-panel {
              max-height: 600px;
              opacity: 1;
            }
          `}</style>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="faq-item"
                data-open={open === i}
              >
                <button
                  className="faq-trigger"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="faq-number">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      color: "#1E3A5F",
                      fontSize: "16px",
                      fontWeight: 500,
                      flex: 1,
                    }}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown className="faq-chevron" size={18} />
                </button>

                <div className="faq-panel">
                  <p
                    style={{
                      color: "#5F5E5A",
                      fontSize: "15px",
                      lineHeight: 1.75,
                      paddingBottom: "20px",
                      paddingLeft: "44px",
                      margin: 0,
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
