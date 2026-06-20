"use client";

import { useLang } from "@/lib/i18n";

const navHrefs: { key: "how" | "why" | "faq" | "about" | "contact"; href: string }[] = [
  { key: "how", href: "#hoe-het-werkt" },
  { key: "why", href: "#waarom" },
  { key: "faq", href: "#faq" },
  { key: "about", href: "#over" },
  { key: "contact", href: "#contact" },
];

const T = {
  nl: {
    tagline: "AI-automatisering voor ondernemers en bedrijven in de Hoeksche Waard.",
    how: "Hoe het werkt",
    why: "Waarom ons",
    faq: "FAQ",
    about: "Over ons",
    contact: "Contact",
    rights: "Alle rechten voorbehouden.",
    terms: "Algemene voorwaarden",
    privacy: "Privacyverklaring",
  },
  en: {
    tagline: "AI automation for entrepreneurs and businesses in the Hoeksche Waard.",
    how: "How it works",
    why: "Why us",
    faq: "FAQ",
    about: "About",
    contact: "Contact",
    rights: "All rights reserved.",
    terms: "Terms & conditions",
    privacy: "Privacy policy",
  },
};

export default function Footer() {
  const { lang } = useLang();
  const t = T[lang];
  const navLinks = navHrefs.map((n) => ({ label: t[n.key], href: n.href }));

  return (
    <footer
      style={{
        backgroundColor: "#F5F1E8",
        borderTop: "1px solid #E8E4DB",
        padding: "48px 0 32px",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "32px",
            marginBottom: "40px",
          }}
        >
          {/* Logo + tagline */}
          <div>
            <a href="#" style={{ display: "inline-block", marginBottom: "10px" }}>
              <span
                style={{
                  color: "#1E3A5F",
                  fontWeight: 500,
                  fontSize: "18px",
                }}
              >
                Mossel<span style={{ color: "#4A7FC4" }}>AI</span>
              </span>
            </a>
            <p style={{ color: "#5F5E5A", fontSize: "13px", maxWidth: "240px", lineHeight: 1.6 }}>
              {t.tagline}
            </p>
          </div>

          {/* Nav */}
          <nav
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px 32px",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{ color: "#5F5E5A", fontSize: "14px" }}
                className="hover:opacity-70 transition-opacity"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid #E8E4DB",
            paddingTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <p style={{ color: "#5F5E5A", fontSize: "12px" }}>
            © {new Date().getFullYear()} MosselAI. {t.rights}
          </p>
          <p style={{ color: "#5F5E5A", fontSize: "12px" }}>
            KvK: 97587214 · info@mosselai.com · Hoeksche Waard ·{" "}
            <a href="/voorwaarden" style={{ color: "#5F5E5A", textDecoration: "underline" }}>
              {t.terms}
            </a>
            {" "}·{" "}
            <a href="/privacy" style={{ color: "#5F5E5A", textDecoration: "underline" }}>
              {t.privacy}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
