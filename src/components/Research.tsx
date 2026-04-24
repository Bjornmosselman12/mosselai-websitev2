"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const studies = [
  {
    logo: "/logos/research/mckinsey.svg",
    logoAlt: "McKinsey & Company",
    logoWidth: 120,
    source: "State of AI, 2024",
    statHighlight: "65% gebruikt AI al regelmatig",
    quote:
      "65% van de ondervraagde organisaties zet generatieve AI al regelmatig in, bijna het dubbele van tien maanden eerder. De adoptie versnelt sneller dan ooit.",
    visual: "bars" as const,
    bars: [
      { label: "Regelmatig AI gebruik", value: 65, color: "#4A7FC4" },
      { label: "10 maanden eerder", value: 33, color: "#C5D7F0" },
    ],
  },
  {
    logo: "/logos/research/mit-sloan.svg",
    logoAlt: "MIT Sloan Management Review",
    logoWidth: 140,
    source: "Winning With AI (met BCG), 2020",
    statHighlight: "6× meer kans op succes",
    quote:
      "Bedrijven die AI diep integreren via meerdere mens-AI leercycli hebben 6 keer meer kans om AI-succes op te schalen dan bedrijven met oppervlakkige adoptie.",
    visual: "stat" as const,
    statNumber: "6×",
    statLabel: "meer kans op succes",
  },
  {
    logo: "/logos/research/ocean-tomo.svg",
    logoAlt: "Ocean Tomo",
    logoWidth: 130,
    source: "Intangible Asset Market Value Study, 2020",
    statHighlight: "90% immateriële waarde",
    quote:
      "90% van de beurswaarde in de S&P 500 bestaat inmiddels uit immateriële activa zoals software, data en intellectueel eigendom. Tegenover slechts 17% in 1975.",
    visual: "assetbar" as const,
    years: [
      { year: "1975", tangible: 83, intangible: 17 },
      { year: "2020", tangible: 10, intangible: 90 },
    ],
  },
  {
    logo: "/logos/research/hbr.svg",
    logoAlt: "Harvard Business Review",
    logoWidth: 120,
    source: "AI Adoption Study, 2025",
    statHighlight: "69% ziet al aantoonbaar resultaat",
    quote:
      "69% van de vroeg-adopterende bedrijven ervaart al aantoonbare bedrijfswaarde uit AI. Wie nu investeert, bouwt een structurele voorsprong die voor latecomers steeds moeilijker bij te benen is.",
    visual: "growth" as const,
  },
];

function ProgressBars({ bars }: { bars: { label: string; value: number; color: string }[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {bars.map((bar) => (
        <div key={bar.label}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{ fontSize: "13px", color: "#5F5E5A", fontWeight: 500 }}>{bar.label}</span>
            <span style={{ fontSize: "13px", color: "#1E3A5F", fontWeight: 600 }}>{bar.value}%</span>
          </div>
          <div style={{ height: "10px", backgroundColor: "#E8E4DB", borderRadius: "5px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${bar.value}%`, backgroundColor: bar.color, borderRadius: "5px" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function StatDisplay({ number, label }: { number: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "10px", padding: "16px 0 4px" }}>
      <span style={{ fontSize: "clamp(48px, 5vw, 72px)", fontWeight: 600, color: "#4A7FC4", letterSpacing: "-0.03em", lineHeight: 1 }}>
        {number}
      </span>
      <span style={{ fontSize: "16px", color: "#5F5E5A", fontWeight: 500 }}>{label}</span>
    </div>
  );
}

function AssetBar({ years }: { years: { year: string; tangible: number; intangible: number }[] }) {
  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "flex-end" }}>
      {years.map((y) => (
        <div key={y.year} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ height: "96px", borderRadius: "8px", overflow: "hidden", display: "flex", flexDirection: "column", border: "1px solid #E8E4DB" }}>
            <div style={{ flex: y.intangible, backgroundColor: "#4A7FC4", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: "12px", fontWeight: 600 }}>{y.intangible}%</span>
            </div>
            <div style={{ flex: y.tangible, backgroundColor: "#E6EDF7", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {y.tangible > 15 && <span style={{ color: "#1E3A5F", fontSize: "12px", fontWeight: 600 }}>{y.tangible}%</span>}
            </div>
          </div>
          <span style={{ textAlign: "center", fontSize: "13px", color: "#5F5E5A", fontWeight: 500 }}>{y.year}</span>
        </div>
      ))}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "2px", backgroundColor: "#4A7FC4", flexShrink: 0 }} />
          <span style={{ fontSize: "12px", color: "#5F5E5A" }}>Immaterieel</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "2px", backgroundColor: "#E6EDF7", border: "1px solid #E8E4DB", flexShrink: 0 }} />
          <span style={{ fontSize: "12px", color: "#5F5E5A" }}>Materieel</span>
        </div>
      </div>
    </div>
  );
}

function GrowthIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "80px", paddingTop: "8px" }}>
      {[36, 48, 56, 68, 84].map((h, i) => (
        <div key={i} style={{ flex: 1, height: `${h}px`, borderRadius: "5px 5px 0 0", backgroundColor: i === 4 ? "#4A7FC4" : "#C5D7F0" }} />
      ))}
      <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: "6px" }}>
        <span style={{ color: "#4A7FC4", fontSize: "20px", fontWeight: 700, lineHeight: 1 }}>▲</span>
      </div>
    </div>
  );
}

const CARDS_PER_PAGE = 2;

export default function Research() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const totalPages = Math.ceil(studies.length / CARDS_PER_PAGE);

  const scrollToPage = (page: number) => {
    if (!scrollRef.current) return;
    const containerWidth = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({ left: page * containerWidth, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const page = Math.round(el.scrollLeft / el.offsetWidth);
      setActivePage(page);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .research-track { scrollbar-width: none; -ms-overflow-style: none; }
        .research-track::-webkit-scrollbar { display: none; }
        .research-card { flex: 0 0 calc(50% - 10px); scroll-snap-align: start; }
        @media (max-width: 680px) { .research-card { flex: 0 0 calc(88% - 10px); } }
        .research-nav-btn { cursor: pointer; transition: background 0.15s, opacity 0.15s; }
        .research-nav-btn:hover { background: #1E3A5F !important; }
        .research-nav-btn:disabled { opacity: 0.3; cursor: default; }
        .research-nav-btn:disabled:hover { background: #E8E4DB !important; }
      `}</style>

      <section style={{ backgroundColor: "#F8F7F3", padding: "96px 0" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>

          {/* Header row */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "48px", gap: "24px", flexWrap: "wrap" }}>
            <div>
              <p style={{ color: "#4A7FC4", fontSize: "13px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
                Onderzoek & cijfers
              </p>
              <h2 style={{ color: "#1E3A5F", fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "8px" }}>
                Wat de cijfers zeggen over AI implementatie.
              </h2>
              <p style={{ color: "#5F5E5A", fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.7, maxWidth: "520px" }}>
                Geen verkooppraatje. Onafhankelijk onderzoek van toonaangevende instituten.
              </p>
            </div>

            {/* Navigation arrows */}
            <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
              <button
                className="research-nav-btn"
                onClick={() => scrollToPage(activePage - 1)}
                disabled={activePage === 0}
                aria-label="Vorige"
                style={{ width: "44px", height: "44px", borderRadius: "50%", border: "1px solid #E8E4DB", backgroundColor: activePage === 0 ? "#E8E4DB" : "#1E3A5F", color: activePage === 0 ? "#5F5E5A" : "#ffffff", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                ←
              </button>
              <button
                className="research-nav-btn"
                onClick={() => scrollToPage(activePage + 1)}
                disabled={activePage === totalPages - 1}
                aria-label="Volgende"
                style={{ width: "44px", height: "44px", borderRadius: "50%", border: "1px solid #E8E4DB", backgroundColor: activePage === totalPages - 1 ? "#E8E4DB" : "#1E3A5F", color: activePage === totalPages - 1 ? "#5F5E5A" : "#ffffff", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                →
              </button>
            </div>
          </div>

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            className="research-track"
            style={{ display: "flex", gap: "20px", overflowX: "scroll", scrollSnapType: "x mandatory" }}
          >
            {studies.map((study) => (
              <div
                key={study.source}
                className="research-card"
                style={{ backgroundColor: "#ffffff", border: "1px solid #E8E4DB", borderRadius: "16px", padding: "36px", display: "flex", flexDirection: "column", gap: "20px" }}
              >
                {/* Logo + source */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderBottom: "1px solid #E8E4DB", paddingBottom: "18px" }}>
                  <Image src={study.logo} alt={study.logoAlt} width={study.logoWidth} height={36} style={{ objectFit: "contain", objectPosition: "left center", height: "auto" }} />
                  <p style={{ fontSize: "12px", fontWeight: 500, color: "#5F5E5A", letterSpacing: "0.04em", margin: 0 }}>
                    {study.source}
                  </p>
                </div>

                {/* Stat highlight */}
                <p style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 600, color: "#1E3A5F", letterSpacing: "-0.01em", lineHeight: 1.3, margin: 0 }}>
                  {study.statHighlight}
                </p>

                {/* Visual */}
                <div>
                  {study.visual === "bars" && <ProgressBars bars={study.bars} />}
                  {study.visual === "stat" && <StatDisplay number={study.statNumber} label={study.statLabel} />}
                  {study.visual === "assetbar" && <AssetBar years={study.years} />}
                  {study.visual === "growth" && <GrowthIndicator />}
                </div>

                {/* Quote */}
                <p style={{ color: "#2C2C2E", fontSize: "15px", lineHeight: 1.75, fontStyle: "italic", flexGrow: 1, borderTop: "1px solid #E8E4DB", paddingTop: "18px", marginTop: "auto", marginBottom: 0 }}>
                  &ldquo;{study.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "28px" }}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToPage(i)}
                aria-label={`Pagina ${i + 1}`}
                style={{ width: i === activePage ? "24px" : "8px", height: "8px", borderRadius: "4px", border: "none", backgroundColor: i === activePage ? "#1E3A5F" : "#C5D7F0", cursor: "pointer", padding: 0, transition: "all 0.2s" }}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
