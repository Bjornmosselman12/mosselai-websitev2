const navLinks = [
  { label: "Hoe het werkt", href: "#hoe-het-werkt" },
  { label: "Waarom ons", href: "#waarom" },
  { label: "FAQ", href: "#faq" },
  { label: "Over ons", href: "#over" },
  { label: "Contact", href: "#contact" },
  { label: "Onderzoek 2026", href: "/onderzoek" },
];

export default function Footer() {
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
              {/* {{ PLACEHOLDER: vervang door <Image src="/logo.png" ... /> zodra logo beschikbaar is }} */}
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
              AI-automatisering voor MKB-ondernemers in de Hoeksche Waard.
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
            © {new Date().getFullYear()} MosselAI. Alle rechten voorbehouden.
          </p>
          <p style={{ color: "#5F5E5A", fontSize: "12px" }}>
            KvK: 97587214 · info@mosselai.com · Hoeksche Waard ·{" "}
            <a href="/voorwaarden" style={{ color: "#5F5E5A", textDecoration: "underline" }}>
              Algemene voorwaarden
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
