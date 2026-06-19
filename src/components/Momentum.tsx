"use client";

import { useEffect, useRef, useState } from "react";
import ContactPopup from "@/components/ContactPopup";

type Block =
  | { type: "statement"; kicker: string; title: string; desc: string }
  | { type: "steps"; kicker: string; steps: { number: string; title: string; desc: string }[] };

const blocks: Block[] = [
  {
    type: "statement",
    kicker: "Het probleem",
    title: "Elke week opnieuw. Dezelfde taken, dezelfde uren kwijt.",
    desc: "Orders verwerken, mails sorteren, gegevens overtypen, rapporten samenstellen. Het hoort erbij. Maar het levert geen klant op.",
  },
  {
    type: "statement",
    kicker: "De oplossing",
    title: "AI doet het handwerk. Jouw proces blijft.",
    desc: "We kijken naar je bestaande workflow en bouwen alleen waar AI iets kan vervangen. Geen nieuwe software, geen ander uitziend resultaat. Alleen het handwerk in het midden is weg.",
  },
  {
    type: "steps",
    kicker: "Hoe we dat doen",
    steps: [
      { number: "01", title: "We analyseren je workflow", desc: "We kijken hoe je proces nu loopt, waar de tijd in gaat zitten, en op welke plekken AI iets kan overnemen." },
      { number: "02", title: "We vervangen alleen het handwerk", desc: "Geen nieuw systeem, geen leertraject voor je team. Alleen het stuk in het midden waar AI iets toevoegt." },
      { number: "03", title: "Vier weken pilot zonder factuur", desc: "Werkt het, dan beslis je over doorgaan. Werkt het niet, dan betaal je niets." },
    ],
  },
];

const SHARED_STYLE = `
  .mom-kicker {
    color: #C5D7F0;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin: 0 0 26px;
  }
  .mom-title {
    color: #F5F1E8;
    font-size: clamp(28px, 4vw, 52px);
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: 1.15;
    margin: 0 0 22px;
    max-width: 860px;
    text-shadow: 0 0 28px rgba(245,241,232,0.22), 0 0 56px rgba(74,127,196,0.18);
  }
  .mom-desc {
    color: rgba(245,241,232,0.78);
    font-size: clamp(18px, 1.8vw, 25px);
    line-height: 1.55;
    margin: 0;
    max-width: 680px;
    letter-spacing: -0.01em;
  }
  .mom-steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
    margin-top: 8px;
    max-width: 900px;
  }
  .mom-step { border-top: 1px solid rgba(197,215,240,0.22); padding-top: 20px; }
  .mom-step-num { color: #6FA0D7; font-size: 15px; font-weight: 600; letter-spacing: 0.04em; margin: 0 0 14px; }
  .mom-step-title { color: #F5F1E8; font-size: 18px; font-weight: 500; line-height: 1.3; margin: 0 0 8px; }
  .mom-step-desc { color: rgba(245,241,232,0.62); font-size: 14.5px; line-height: 1.6; margin: 0; }
  .mom-cta { margin-top: 40px; }
  @media (max-width: 767px) {
    .mom-steps { grid-template-columns: 1fr; gap: 0; }
    .mom-step { margin-top: 24px; }
    .mom-step:first-child { margin-top: 8px; }
    .mom-cta { margin-top: 32px; }
  }
`;

function BlockContent({ block }: { block: Block }) {
  if (block.type === "steps") {
    return (
      <div>
        <p className="mom-kicker">{block.kicker}</p>
        <div className="mom-steps">
          {block.steps.map((s) => (
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
    );
  }
  return (
    <div>
      <p className="mom-kicker">{block.kicker}</p>
      <h2 className="mom-title">{block.title}</h2>
      <p className="mom-desc">{block.desc}</p>
    </div>
  );
}

export default function Momentum() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    const dots = dotsRef.current;
    if (!section || !track) return;

    let rafId = 0;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      const tx = p * (blocks.length - 1) * 100;
      track.style.transform = `translate3d(-${tx}vw, 0, 0)`;

      if (dots) {
        const active = Math.round(p * (blocks.length - 1));
        Array.from(dots.children).forEach((node, i) => {
          (node as HTMLElement).dataset.active = i === active ? "true" : "false";
        });
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <section style={{ backgroundColor: "#1E3A5F", padding: "88px 0" }}>
        <style>{SHARED_STYLE}</style>
        <div className="max-w-6xl mx-auto px-6" style={{ display: "flex", flexDirection: "column", gap: "72px" }}>
          {blocks.map((b, i) => (
            <BlockContent key={i} block={b} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#1E3A5F",
        height: `${blocks.length * 100}vh`,
        position: "relative",
      }}
    >
      <style>{`
        ${SHARED_STYLE}
        .momentum-dot {
          display: block;
          width: 8px; height: 8px;
          border-radius: 50%;
          background: rgba(197,215,240,0.35);
          transition: background 0.3s ease, transform 0.3s ease;
        }
        .momentum-dot[data-active="true"] {
          background: #F5F1E8;
          transform: scale(1.3);
        }
      `}</style>

      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        {/* Zachte gloed */}
        <div
          style={{
            position: "absolute",
            top: "-160px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "760px",
            height: "760px",
            background: "radial-gradient(circle, rgba(74,127,196,0.20), rgba(30,58,95,0) 62%)",
            pointerEvents: "none",
          }}
        />
        <div
          ref={trackRef}
          style={{
            display: "flex",
            height: "100%",
            width: `${blocks.length * 100}vw`,
            willChange: "transform",
          }}
        >
          {blocks.map((b, i) => (
            <div
              key={i}
              style={{
                width: "100vw",
                height: "100%",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className="max-w-6xl mx-auto px-6 w-full">
                <BlockContent block={b} />
              </div>
            </div>
          ))}
        </div>

        <div
          ref={dotsRef}
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "12px",
          }}
        >
          {blocks.map((_, i) => (
            <span key={i} data-active={i === 0 ? "true" : "false"} className="momentum-dot" />
          ))}
        </div>
      </div>
    </section>
  );
}
