"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, LogIn } from "lucide-react";

const navLinks = [
  { label: "Hoe het werkt", href: "/#hoe-het-werkt" },
  { label: "Over ons", href: "/#over" },
  { label: "Contact", href: "/#contact" },
  { label: "FAQ", href: "/#faq" },
];

// {{ PLACEHOLDER: vervang door jouw telefoonnummer }}
const PHONE_NUMBER = "+31 6 12 38 25 76";
const PHONE_HREF = "tel:+31612382576";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        backgroundColor: scrolled ? "rgba(245,241,232,0.97)" : "#F5F1E8",
        borderBottom: scrolled ? "1px solid #E8E4DB" : "1px solid transparent",
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
    >
      <style>{`
        .header-nav { display: none; }
        .header-cta { display: none; }
        .header-mobile { display: flex; }
        @media (min-width: 768px) {
          .header-nav { display: flex; align-items: center; gap: 28px; }
          .header-cta { display: inline-flex; }
          .header-mobile { display: none; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center" style={{ flexShrink: 0 }} aria-label="MosselAI">
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "6px 15px",
              boxShadow: "0 2px 8px rgba(30,58,95,0.12), 0 0 0 1px rgba(30,58,95,0.05)",
            }}
          >
            <img
              src="/logo.png"
              alt="MosselAI"
              style={{ height: "44px", width: "auto", display: "block" }}
            />
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="header-nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{ color: "#5F5E5A", fontSize: "14px", fontWeight: 400 }}
              className="hover:opacity-70 transition-opacity duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA's: telefoon + klantportaal, gegroepeerd rechts */}
        <div className="header-cta" style={{ alignItems: "center", gap: "10px" }}>
          <a
            href={PHONE_HREF}
            className="hover:opacity-90 transition-opacity duration-150"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              backgroundColor: "#1E3A5F",
              color: "#F5F1E8",
              fontSize: "14px",
              fontWeight: 500,
              padding: "8px 18px",
              borderRadius: "8px",
            }}
          >
            <Phone size={14} />
            {PHONE_NUMBER}
          </a>

          <a
            href="/inloggen"
            className="hover:opacity-90 transition-opacity duration-150"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "#E6EDF7",
              color: "#1E3A5F",
              fontSize: "14px",
              fontWeight: 500,
              padding: "8px 16px",
              borderRadius: "8px",
            }}
          >
            <LogIn size={14} />
            Klantportaal
          </a>
        </div>

        {/* Mobile: phone icon + hamburger */}
        <div className="header-mobile" style={{ alignItems: "center", gap: "12px" }}>
          <a
            href={PHONE_HREF}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              backgroundColor: "#E6EDF7",
              color: "#1E3A5F",
            }}
            aria-label="Bel ons"
          >
            <Phone size={17} />
          </a>
          <button
            style={{ color: "#1E3A5F", background: "none", border: "none", cursor: "pointer", padding: "4px" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu openen"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div
          style={{ backgroundColor: "#F5F1E8", borderTop: "1px solid #E8E4DB" }}
          className="md:hidden px-6 pb-6"
        >
          <nav className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{ color: "#2C2C2E", fontSize: "16px" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/inloggen"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                backgroundColor: "#E6EDF7",
                color: "#1E3A5F",
                fontSize: "15px",
                fontWeight: 500,
                padding: "10px 18px",
                borderRadius: "8px",
                marginTop: "4px",
              }}
              onClick={() => setMenuOpen(false)}
            >
              <LogIn size={15} />
              Klantportaal
            </a>
            <a
              href="/#contact"
              style={{
                backgroundColor: "#1E3A5F",
                color: "#F5F1E8",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
                padding: "10px 18px",
                textAlign: "center",
                marginTop: "8px",
              }}
              onClick={() => setMenuOpen(false)}
            >
              Plan een gesprek
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
