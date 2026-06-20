"use client";

import ContactPopup from "@/components/ContactPopup";
import { useLang } from "@/lib/i18n";

const T = {
  nl: {
    kicker: "Over MosselAI",
    headingPre: "AI hoort in je bestaande werk te passen, ",
    headingAccent: "niet andersom.",
    para1:
      "MosselAI is een Nederlands bedrijf voor AI-automatisering in het MKB. We bouwen werkende oplossingen in de software die je al gebruikt, ontworpen voor de manier waarop het MKB werkt: concreet, betaalbaar, snel zichtbaar.",
    para2:
      "Geen lange trajecten, geen platforms om aan te wennen. We komen langs, brengen je proces in kaart, en vervangen alleen het handwerk waar AI iets toevoegt.",
    closingPre: "Opgericht door ",
    closingPost:
      ". Gevestigd in de Hoeksche Waard, werkzaam in heel Nederland.",
  },
  en: {
    kicker: "About MosselAI",
    headingPre: "AI should fit into your existing work, ",
    headingAccent: "not the other way around.",
    para1:
      "MosselAI is a Dutch company for AI automation in small and medium businesses. We build working solutions inside the software you already use, designed for the way SMEs work: concrete, affordable, quick to show results.",
    para2:
      "No long projects, no platforms to get used to. We come by, map your process, and replace only the manual work where AI adds something.",
    closingPre: "Founded by ",
    closingPost:
      ". Based in the Hoeksche Waard, working throughout the Netherlands.",
  },
};

export default function About() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section
      id="over"
      style={{ backgroundColor: "#F5F1E8", padding: "96px 0" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "64px",
            alignItems: "center",
          }}
        >
          {/* Tekst */}
          <div>
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
                lineHeight: 1.25,
                marginBottom: "24px",
              }}
            >
              {t.headingPre}
              <span className="gradient-text">{t.headingAccent}</span>
            </h2>
            <p
              style={{
                color: "#2C2C2E",
                fontSize: "16px",
                lineHeight: 1.8,
                marginBottom: "16px",
              }}
            >
              {t.para1}
            </p>
            <p
              style={{
                color: "#2C2C2E",
                fontSize: "16px",
                lineHeight: 1.8,
                marginBottom: "28px",
              }}
            >
              {t.para2}
            </p>
            <p
              style={{
                color: "#5F5E5A",
                fontSize: "14px",
                lineHeight: 1.7,
                marginBottom: "32px",
              }}
            >
              {t.closingPre}
              <strong style={{ fontWeight: 500, color: "#2C2C2E" }}>
                Bjorn Mosselman
              </strong>
              {t.closingPost}
            </p>

            {/* CTA */}
            <ContactPopup />
          </div>

          {/* Foto oprichter */}
          <div style={{ position: "relative", display: "inline-block", maxWidth: "360px" }}>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "-14px",
                borderRadius: "18px",
                background: "linear-gradient(135deg, rgba(74,127,196,0.28) 0%, rgba(30,58,95,0.08) 60%, transparent 100%)",
                filter: "blur(24px)",
                zIndex: 0,
              }}
            />
            <img
              src="/bjorn.jpg"
              alt="Bjorn Mosselman, oprichter MosselAI"
              className="about-photo"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "360px",
                aspectRatio: "1/1",
                objectFit: "cover",
                borderRadius: "12px",
                border: "1px solid #E8E4DB",
                display: "block",
                transition: "transform 0.5s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.5s ease",
                zIndex: 1,
              }}
            />
            <style>{`
              .about-photo:hover {
                transform: scale(1.02);
                box-shadow: 0 24px 48px rgba(30, 58, 95, 0.18);
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}
