"use client";

import { useEffect, useRef, useState } from "react";

type Block = {
  kicker?: string;
  stat?: string;
  title: string;
  desc?: string;
  source?: string;
  outro?: string;
};

const blocks: Block[] = [
  {
    kicker: "Net als in 1998",
    title: "De overstap\ngebeurt nu.",
    desc: "Drie cijfers die laten zien hoe snel.",
  },
  {
    kicker: "01",
    stat: "94%",
    title: "van de medewerkers",
    desc: "voert dagelijks herhalende taken uit die een computer kan overnemen.",
    source: "Zapier, State of Business Automation, 2021",
  },
  {
    kicker: "02",
    stat: "32%",
    title: "gemiddelde kostenbesparing",
    desc: "behalen bedrijven die automatisering serieus inzetten, structureel en zonder gedwongen ontslagen.",
    source: "Deloitte, Intelligent Automation Survey, 2022",
  },
  {
    kicker: "03",
    stat: "83%",
    title: "van groeiende MKB-bedrijven",
    desc: "gebruikt AI en automatisering. Bij krimpende bedrijven is dat maar 55%.",
    source: "Salesforce, SMB Trends Report, 2024",
    outro: "De ondernemer die in 1998 geen website nam, verloor klanten aan wie dat wel deed. Hetzelfde speelt zich nu af met AI.",
  },
];

export default function Momentum() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const dotsRef    = useRef<HTMLDivElement>(null);
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
    const track   = trackRef.current;
    const dots    = dotsRef.current;
    if (!section || !track) return;

    let rafId = 0;

    const update = () => {
      const rect     = section.getBoundingClientRect();
      const total    = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p        = Math.max(0, Math.min(1, scrolled / total));
      const tx       = p * (blocks.length - 1) * 100;
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
      <section style={{ backgroundColor: "#1E3A5F", padding: "96px 0" }}>
        <div className="max-w-6xl mx-auto px-6" style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
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

function BlockContent({ block }: { block: Block }) {
  return (
    <div style={{ maxWidth: "880px" }}>
      {block.kicker && (
        <p style={{
          color: "#C5D7F0",
          fontSize: "13px",
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "28px",
        }}>
          {block.kicker}
        </p>
      )}
      {block.stat && (
        <div style={{
          color: "#F5F1E8",
          fontSize: "clamp(72px, 12vw, 160px)",
          fontWeight: 500,
          letterSpacing: "-0.03em",
          lineHeight: 0.95,
          marginBottom: "12px",
          textShadow: "0 0 30px rgba(245,241,232,0.35), 0 0 60px rgba(74,127,196,0.25)",
        }}>
          {block.stat}
        </div>
      )}
      <h2 style={{
        color: "#F5F1E8",
        fontSize: block.stat ? "clamp(28px, 3.5vw, 44px)" : "clamp(40px, 6vw, 76px)",
        fontWeight: 500,
        letterSpacing: "-0.02em",
        lineHeight: 1.1,
        marginBottom: "24px",
        whiteSpace: "pre-line",
        textShadow: "0 0 24px rgba(245,241,232,0.3), 0 0 48px rgba(74,127,196,0.2)",
      }}>
        {block.title}
      </h2>
      {block.desc && (
        <p style={{
          color: "#F5F1E8",
          fontSize: "clamp(20px, 2vw, 30px)",
          lineHeight: 1.5,
          fontWeight: 400,
          maxWidth: "720px",
          letterSpacing: "-0.01em",
        }}>
          {block.desc}
        </p>
      )}
      {block.source && (
        <p style={{
          color: "#4A7FC4",
          fontSize: "13px",
          fontWeight: 400,
          marginTop: "16px",
          letterSpacing: "0.02em",
        }}>
          Bron: {block.source}
        </p>
      )}
      {block.outro && (
        <p style={{
          color: "#C5D7F0",
          fontSize: "clamp(20px, 1.8vw, 28px)",
          lineHeight: 1.4,
          fontStyle: "italic",
          marginTop: "44px",
          letterSpacing: "-0.01em",
        }}>
          {block.outro}
        </p>
      )}
    </div>
  );
}
