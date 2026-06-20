"use client";

import { useLang } from "@/lib/i18n";

type Step = { number: string; title: string; description: string };

const STEPS: Record<"nl" | "en", Step[]> = {
  nl: [
    {
      number: "01",
      title: "We brengen je proces in kaart",
      description:
        "Geen pitch. Een eerlijk gesprek over jouw bedrijf en welk werk elke week terugkomt. Samen kijken we waar handwerk zit dat AI kan overnemen.",
    },
    {
      number: "02",
      title: "We bouwen in jouw software",
      description:
        "Eén taak, vier weken. We bouwen in de tools die je al gebruikt en passen aan tot het doet wat we vooraf hebben afgesproken. Onderhoud en updates inbegrepen.",
    },
    {
      number: "03",
      title: "Je betaalt pas bij resultaat",
      description:
        "De automatisering draait eerst mee in je dagelijkse werk. Pas daarna volgt de factuur, geen kosten vooraf. Je betaalt voor een resultaat, niet voor een traject.",
    },
  ],
  en: [
    {
      number: "01",
      title: "We map your process",
      description:
        "No pitch. An honest conversation about your business and which work comes back every week. Together we look for the manual work AI can take over.",
    },
    {
      number: "02",
      title: "We build inside your software",
      description:
        "One task, four weeks. We build in the tools you already use and refine it until it does what we agreed upfront. Maintenance and updates included.",
    },
    {
      number: "03",
      title: "You only pay on results",
      description:
        "The automation first runs along in your daily work. Only then comes the invoice, no upfront costs. You pay for a result, not for a project.",
    },
  ],
};

const T = {
  nl: {
    kicker: "Hoe het werkt",
    heading: "Van eerste gesprek naar werkende automatisering.",
  },
  en: {
    kicker: "How it works",
    heading: "From first conversation to working automation.",
  },
};

const PEEK = 22;

export default function HowItWorks() {
  const { lang } = useLang();
  const steps = STEPS[lang];
  const t = T[lang];

  return (
    <>
      <style>{`
        .hiw-card {
          position: sticky;
          margin-bottom: 0;
        }
        .hiw-card + .hiw-card {
          margin-top: 70vh;
        }
        .hiw-card-inner {
          background-color: #ffffff;
          border: 1px solid #E8E4DB;
          border-radius: 24px;
          padding: 64px;
          box-shadow: 0 18px 50px rgba(30, 58, 95, 0.09);
          display: grid;
          grid-template-columns: 128px 1fr;
          gap: 36px;
          align-items: center;
        }
        .hiw-number {
          color: #E0DDD6;
          font-size: 90px;
          font-weight: 700;
          line-height: 1;
          user-select: none;
        }
        .hiw-title {
          color: #1E3A5F;
          font-size: 24px;
          font-weight: 500;
          margin-bottom: 14px;
          line-height: 1.3;
        }
        .hiw-desc {
          color: #5F5E5A;
          font-size: 16px;
          line-height: 1.75;
          margin: 0;
        }
        @media (max-width: 768px) {
          .hiw-card-inner {
            padding: 32px 28px;
            border-radius: 18px;
            grid-template-columns: 76px 1fr;
            gap: 18px;
          }
          .hiw-number { font-size: 52px; }
          .hiw-title  { font-size: 19px; margin-bottom: 10px; }
          .hiw-desc   { font-size: 14.5px; line-height: 1.7; }
          .hiw-card + .hiw-card { margin-top: 55vh; }
        }
        @media (max-width: 480px) {
          .hiw-card-inner {
            padding: 28px 22px;
            grid-template-columns: 58px 1fr;
            gap: 14px;
          }
          .hiw-number { font-size: 40px; }
          .hiw-title  { font-size: 17px; }
          .hiw-desc   { font-size: 14px; }
        }
      `}</style>

      <section
        id="hoe-het-werkt"
        style={{
          backgroundColor: "#F8F7F3",
          paddingTop: "96px",
          paddingBottom: "240px",
        }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <div style={{ marginBottom: "80px" }}>
            <p style={{
              color: "#4A7FC4",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}>
              {t.kicker}
            </p>
            <h2 style={{
              color: "#1E3A5F",
              fontSize: "clamp(28px, 3.5vw, 40px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}>
              {t.heading}
            </h2>
          </div>

          <div>
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="hiw-card"
                style={{
                  top: `calc(max(96px, 50vh - 190px) + ${i * PEEK}px)`,
                  zIndex: i + 1,
                }}
              >
                <div className="hiw-card-inner">
                  <span className="hiw-number">{step.number}</span>
                  <div>
                    <h3 className="hiw-title">{step.title}</h3>
                    <p className="hiw-desc">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
