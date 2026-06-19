"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Hoe weet ik of mijn bedrijf hier baat bij heeft?",
    answer:
      "Als jullie elke week dezelfde taken handmatig doen, is er ruimte om iets te automatiseren. In het eerste gesprek kijken we mee in jullie proces en zien we direct waar kansen zitten. Aan dat gesprek zijn geen kosten verbonden.",
  },
  {
    question:
      "Wat is anders dan een SaaS-pakket zoals Basecone of een vergelijkbare oplossing?",
    answer:
      "SaaS-pakketten dwingen hun eigen werkwijze op. Wij bouwen rond jullie bestaande proces. De software die je nu gebruikt blijft, de manier waarop jullie werken blijft, alleen het handwerk in het midden vervangen wij. Geen overstap, geen leertraject voor je team.",
  },
  {
    question: "Waarom niet zelf met ChatGPT aan de slag?",
    answer:
      "Met ChatGPT moet jij of je team iedere keer aan de knoppen. Een prompt bedenken, output controleren, overzetten naar je eigen software. Bij ons draait het systeem zelfstandig in je bestaande omgeving. Geen prompts, geen kopiëren en plakken, geen iemand die het hoeft aan te sturen. Het werk wordt gedaan, ook 's nachts en in het weekend.",
  },
  {
    question: "Wat betekent dit voor mijn team?",
    answer:
      "Niets ingewikkelds. Wij vervangen alleen het handwerk in het midden van een proces. De output blijft hetzelfde, de software blijft hetzelfde, het werk dat mensen interessant vinden blijft hetzelfde. Wat verdwijnt is het saaie repeterende werk dat niemand graag deed.",
  },
  {
    question: "Wat als het niet werkt?",
    answer:
      "Dan betaal je niets. Vooraf leggen we samen vast wat \"werkt\" voor jullie betekent. Werkt de pilot niet zoals afgesproken, dan stopt het zonder factuur.",
  },
  {
    question: "Wat kost het?",
    answer:
      "Afhankelijk van wat past in jullie situatie. Voor de ene klant werken we met een vast maandbedrag, voor de andere met een eenmalige bouw plus maandservice. In de verkenning kijken we welk model bij jullie aanpak past en stellen we het bedrag vooraf vast.",
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
