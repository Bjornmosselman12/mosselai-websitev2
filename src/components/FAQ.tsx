"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/lib/i18n";

type QA = { question: string; answer: string };

const FAQS: Record<"nl" | "en", QA[]> = {
  nl: [
    {
      question: "Hoe weet ik of mijn bedrijf hier baat bij heeft?",
      answer:
        "Als jullie elke week dezelfde taken handmatig doen, is er ruimte om iets te automatiseren. In het eerste gesprek kijken we mee in jullie proces en zien we direct waar kansen zitten. Aan dat gesprek zijn geen kosten verbonden.",
    },
    {
      question: "Wat is anders dan een SaaS-pakket of een vergelijkbare oplossing?",
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
  ],
  en: [
    {
      question: "How do I know if my business will benefit?",
      answer:
        "If you do the same tasks by hand every week, there's room to automate something. In the first conversation we look into your process and immediately see where the opportunities are. That conversation is free.",
    },
    {
      question: "How is this different from a SaaS package or a similar solution?",
      answer:
        "SaaS packages impose their own way of working. We build around your existing process. The software you use now stays, the way you work stays, we only replace the manual work in the middle. No switching, no learning curve for your team.",
    },
    {
      question: "Why not just use ChatGPT myself?",
      answer:
        "With ChatGPT, you or your team have to operate it every time. Think up a prompt, check the output, move it into your own software. With us the system runs on its own inside your existing environment. No prompts, no copy and paste, no one who has to steer it. The work gets done, even at night and on weekends.",
    },
    {
      question: "What does this mean for my team?",
      answer:
        "Nothing complicated. We only replace the manual work in the middle of a process. The output stays the same, the software stays the same, the work people find interesting stays the same. What disappears is the dull, repetitive work no one liked doing.",
    },
    {
      question: "What if it doesn't work?",
      answer:
        "Then you pay nothing. Upfront we define together what \"works\" means for you. If the pilot doesn't work as agreed, it stops without an invoice.",
    },
    {
      question: "What does it cost?",
      answer:
        "It depends on what fits your situation. For one client we work with a fixed monthly fee, for another with a one-time build plus monthly service. In the assessment we look at which model fits your approach and set the amount upfront.",
    },
  ],
};

const T = {
  nl: {
    kicker: "Veelgestelde vragen",
    heading: "Eerlijke antwoorden op eerlijke vragen.",
    introPre: "Staat jouw vraag er niet bij? ",
    introLink: "Stel hem gerust.",
  },
  en: {
    kicker: "Frequently asked questions",
    heading: "Honest answers to honest questions.",
    introPre: "Don't see your question? ",
    introLink: "Just ask it.",
  },
};

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const { lang } = useLang();
  const faqs = FAQS[lang];
  const t = T[lang];

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
              {t.kicker}
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
              {t.heading}
            </h2>
            <p style={{ color: "#5F5E5A", fontSize: "15px", lineHeight: 1.7 }}>
              {t.introPre}
              <a
                href="#contact"
                style={{ color: "#1E3A5F", textDecoration: "underline" }}
              >
                {t.introLink}
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
