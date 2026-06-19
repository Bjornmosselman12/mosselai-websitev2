import ContactPopup from "@/components/ContactPopup";

const steps = [
  {
    number: "01",
    title: "We analyseren je workflow",
    desc: "We kijken hoe je proces nu loopt, waar de tijd in gaat zitten, en op welke plekken AI iets kan overnemen.",
  },
  {
    number: "02",
    title: "We vervangen alleen het handwerk",
    desc: "Geen nieuw systeem, geen leertraject voor je team. Alleen het stuk in het midden waar AI iets toevoegt.",
  },
  {
    number: "03",
    title: "Vier weken pilot zonder factuur",
    desc: "Werkt het, dan beslis je over doorgaan. Werkt het niet, dan betaal je niets.",
  },
];

export default function Momentum() {
  return (
    <section style={{ backgroundColor: "#1E3A5F", position: "relative", overflow: "hidden" }}>
      <style>{`
        .mom-wrap { max-width: 1000px; margin: 0 auto; padding: 120px 24px; position: relative; }
        .mom-kicker {
          color: #C5D7F0;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin: 0 0 18px;
        }
        .mom-headline {
          color: #F5F1E8;
          font-size: clamp(27px, 3.4vw, 42px);
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin: 0 0 18px;
          max-width: 720px;
          text-shadow: 0 0 28px rgba(245,241,232,0.18);
        }
        .mom-para {
          color: rgba(245,241,232,0.72);
          font-size: 17px;
          line-height: 1.65;
          margin: 0;
          max-width: 600px;
        }
        .mom-para strong { color: #F5F1E8; font-weight: 500; }
        .mom-divider {
          height: 1px;
          background: rgba(197,215,240,0.16);
          margin: 64px 0;
        }
        .mom-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          margin-top: 40px;
        }
        .mom-step { border-top: 1px solid rgba(197,215,240,0.22); padding-top: 20px; }
        .mom-step-num {
          color: #6FA0D7;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.04em;
          margin: 0 0 14px;
        }
        .mom-step-title {
          color: #F5F1E8;
          font-size: 17px;
          font-weight: 500;
          line-height: 1.3;
          margin: 0 0 8px;
        }
        .mom-step-desc {
          color: rgba(245,241,232,0.62);
          font-size: 14.5px;
          line-height: 1.6;
          margin: 0;
        }
        .mom-cta { margin-top: 48px; }
        @media (max-width: 767px) {
          .mom-wrap { padding: 80px 22px; }
          .mom-divider { margin: 48px 0; }
          .mom-steps { grid-template-columns: 1fr; gap: 0; margin-top: 32px; }
          .mom-step { margin-top: 28px; }
          .mom-step:first-child { margin-top: 0; }
        }
      `}</style>

      {/* Zachte gloed boven het midden */}
      <div
        style={{
          position: "absolute",
          top: "-180px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "760px",
          height: "760px",
          background: "radial-gradient(circle, rgba(74,127,196,0.20), rgba(30,58,95,0) 62%)",
          pointerEvents: "none",
        }}
      />

      <div className="mom-wrap">
        {/* Het probleem */}
        <div>
          <p className="mom-kicker">Het probleem</p>
          <h2 className="mom-headline">
            Elke week opnieuw. Dezelfde taken, dezelfde uren kwijt.
          </h2>
          <p className="mom-para">
            Orders verwerken, mails sorteren, gegevens overtypen, rapporten
            samenstellen. Het hoort erbij. Maar het levert geen klant op.
          </p>
        </div>

        <div className="mom-divider" />

        {/* De oplossing */}
        <div>
          <p className="mom-kicker">De oplossing</p>
          <h2 className="mom-headline">
            AI doet het handwerk. Jouw proces blijft.
          </h2>
          <p className="mom-para">
            We kijken naar je bestaande workflow en bouwen alleen waar AI iets
            kan vervangen. Geen nieuwe software, geen ander uitziend resultaat.
            Alleen het handwerk in het midden is weg.
          </p>
        </div>

        <div className="mom-divider" />

        {/* Hoe we dat doen */}
        <div>
          <p className="mom-kicker">Hoe we dat doen</p>
          <div className="mom-steps">
            {steps.map((s) => (
              <div key={s.number} className="mom-step">
                <p className="mom-step-num">{s.number}</p>
                <h3 className="mom-step-title">{s.title}</h3>
                <p className="mom-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mom-cta">
            <ContactPopup label="Vraag een gratis verkenning aan" variant="light" />
          </div>
        </div>
      </div>
    </section>
  );
}
