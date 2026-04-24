const steps = [
  {
    number: "1",
    title: "Gratis kennismaking",
    description:
      "Alles begint met een eerlijk gesprek over jouw bedrijf. Geen pitch. Wat kost jou nu wekelijks tijd, en is dat iets wat automatisch kan lopen?",
  },
  {
    number: "2",
    title: "Ik breng je proces in kaart",
    description:
      "Samen kijken we waar de herhaling zit. Welke e-mails komen elke week terug? Welke gegevens worden overgetypt die ergens anders al staan? Dat leg ik concreet vast.",
  },
  {
    number: "3",
    title: "Eén pilot, vier weken",
    description:
      "Geen grote trajecten. Ik pak één taak: de taak waar je het meeste tijd aan verliest, en bouw daar een werkende oplossing voor. Die draait zelfstandig in je bestaande tools (Gmail, Outlook, Excel, Exact). Onderhoud en updates zitten in het maandbedrag.",
  },
  {
    number: "4",
    title: "Jij test, ik pas aan",
    description:
      "Je draait ermee in de praktijk. Werkt iets niet zoals je wil? Dan pas ik aan, net zo lang tot het precies doet wat je nodig hebt.",
  },
  {
    number: "5",
    title: "Je betaalt alleen als het werkt",
    description:
      "Pas als de automatisering aantoonbaar tijd bespaart, stuur ik een factuur. Elke maand opnieuw: werkt het nog? Dan gaat het door. Werkt het niet meer? Dan stop je, zonder gedoe.",
  },
];

const PEEK = 22;

export default function HowItWorks() {
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
          grid-template-columns: 110px 1fr;
          gap: 40px;
          align-items: center;
        }

        .hiw-number {
          color: #E0DDD6;
          font-size: 100px;
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
            grid-template-columns: 64px 1fr;
            gap: 20px;
          }
          .hiw-number {
            font-size: 56px;
          }
          .hiw-title {
            font-size: 19px;
            margin-bottom: 10px;
          }
          .hiw-desc {
            font-size: 14.5px;
            line-height: 1.7;
          }
          .hiw-card + .hiw-card {
            margin-top: 55vh;
          }
        }

        @media (max-width: 480px) {
          .hiw-card-inner {
            padding: 28px 22px;
            grid-template-columns: 48px 1fr;
            gap: 14px;
          }
          .hiw-number {
            font-size: 44px;
          }
          .hiw-title {
            font-size: 17px;
          }
          .hiw-desc {
            font-size: 14px;
          }
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
          {/* Sectietitel */}
          <div style={{ marginBottom: "80px" }}>
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
              Hoe het werkt
            </p>
            <h2
              style={{
                color: "#1E3A5F",
                fontSize: "clamp(28px, 3.5vw, 40px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Van eerste gesprek tot werkende automatisering; in vijf stappen.
            </h2>
          </div>

          {/* Gestapelde kaarten */}
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
