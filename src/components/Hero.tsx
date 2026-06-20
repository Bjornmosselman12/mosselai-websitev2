"use client";

import { ChevronDown, Check } from "lucide-react";
import ContactPopup from "@/components/ContactPopup";
import { useLang } from "@/lib/i18n";

const T = {
  nl: {
    badge: "AI-automatisering · Hoeksche Waard",
    line1: "Elke week opnieuw hetzelfde werk.",
    line2: "Tijd dat het vanzelf gaat.",
    sub: "Je werkt voor je bedrijf, maar veel tijd gaat naar werk dat een computer ook kan doen. Wij bouwen AI-automatiseringen die dat overnemen, in jouw eigen tools, voor een vast bedrag per maand.",
    cta: "Vraag een gratis verkenning aan",
    proof: ["Werkt in jouw eigen software", "Werkend in weken", "Alleen betalen als 't werkt"],
  },
  en: {
    badge: "AI automation · Hoeksche Waard",
    line1: "The same work, week after week.",
    line2: "Time it ran by itself.",
    sub: "You work for your business, but a lot of time goes into work a computer could do too. We build AI automations that take it over, inside your own tools, for a fixed monthly fee.",
    cta: "Request a free scan",
    proof: ["Works in your own software", "Live in weeks", "Only pay when it works"],
  },
};

export default function Hero() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section
      id="hero"
      style={{
        backgroundColor: "#F5F1E8",
        paddingTop: "80px",
        paddingBottom: "32px",
        flex: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Badge */}
          <div
            className="animate-fade-in-up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "#E6EDF7",
              color: "#1E3A5F",
              borderRadius: "999px",
              padding: "5px 14px",
              fontSize: "13px",
              fontWeight: 500,
              marginBottom: "26px",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#4A7FC4", display: "inline-block", flexShrink: 0 }} />
            {t.badge}
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-in-up animate-delay-100"
            style={{
              color: "#1E3A5F",
              fontSize: "clamp(36px, 6vw, 60px)",
              fontWeight: 500,
              lineHeight: 1.14,
              letterSpacing: "-0.03em",
              marginBottom: "24px",
            }}
          >
            <span style={{ display: "block", textWrap: "balance" }}>{t.line1}</span>
            <span
              style={{
                display: "block",
                textWrap: "balance",
                lineHeight: 1.2,
                paddingBottom: "0.12em",
                backgroundImage: "linear-gradient(90deg, #4A7FC4 0%, #1E3A5F 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {t.line2}
            </span>
          </h1>

          {/* Subtext */}
          <p
            className="animate-fade-in-up animate-delay-200"
            style={{
              color: "#5F5E5A",
              fontSize: "16px",
              lineHeight: 1.7,
              marginBottom: "30px",
              maxWidth: "620px",
            }}
          >
            {t.sub}
          </p>

          {/* CTA */}
          <div className="animate-fade-in-up animate-delay-300" style={{ marginBottom: "28px" }}>
            <ContactPopup label={t.cta} />
          </div>

          {/* Proof-points */}
          <div
            className="animate-fade-in-up animate-delay-400"
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }}
          >
            {t.proof.map((item) => (
              <div key={item} style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#5F5E5A", fontSize: "13px" }}>
                <Check size={13} color="#4A7FC4" strokeWidth={3} />
                {item}
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          <a
            href="#hoe-het-werkt"
            className="animate-fade-in-up animate-delay-400 hover:opacity-60 transition-opacity"
            style={{ color: "#5F5E5A", opacity: 0.3, marginTop: "30px" }}
            aria-label="Scroll"
          >
            <ChevronDown size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
