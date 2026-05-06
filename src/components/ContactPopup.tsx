"use client";

import { useState, useRef, useEffect } from "react";
import { Phone, Mail, MessageCircle, ChevronDown } from "lucide-react";

const options = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    sub: "+31 6 12 38 25 76",
    href: "https://wa.me/31612382576",
    target: "_blank",
  },
  {
    icon: Phone,
    label: "Bellen",
    sub: "+31 6 12 38 25 76",
    href: "tel:+31612382576",
    target: "_self",
  },
  {
    icon: Mail,
    label: "E-mail",
    sub: "info@mosselai.com",
    href: "mailto:info@mosselai.com",
    target: "_self",
  },
];

export default function ContactPopup() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          backgroundColor: "#1E3A5F", color: "#F5F1E8",
          borderRadius: "8px", padding: "12px 22px",
          fontSize: "14px", fontWeight: 500, border: "none",
          cursor: "pointer", fontFamily: "inherit",
          transition: "opacity 0.2s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.opacity = "0.85")}
        onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
      >
        Neem contact op
        <ChevronDown
          size={15}
          style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div style={{
          position: "absolute", bottom: "calc(100% + 8px)", left: 0,
          backgroundColor: "#ffffff", border: "1px solid #E8E4DB",
          borderRadius: "12px", boxShadow: "0 16px 40px rgba(30,58,95,0.14)",
          minWidth: "220px", overflow: "hidden", zIndex: 50,
          animation: "cpFadeIn 0.15s ease forwards",
        }}>
          <style>{`
            @keyframes cpFadeIn {
              from { opacity: 0; transform: translateY(6px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            .cp-option:hover { background-color: #F0F5FC; }
          `}</style>
          {options.map((o) => {
            const Icon = o.icon;
            return (
              <a
                key={o.label}
                href={o.href}
                target={o.target}
                rel={o.target === "_blank" ? "noopener noreferrer" : undefined}
                className="cp-option"
                onClick={() => setOpen(false)}
                style={{
                  display: "flex", alignItems: "center", gap: "14px",
                  padding: "14px 18px", textDecoration: "none",
                  borderBottom: o.label !== "E-mail" ? "1px solid #F0EDE8" : "none",
                  transition: "background-color 0.15s",
                }}
              >
                <div style={{
                  width: "36px", height: "36px", borderRadius: "8px",
                  backgroundColor: "#E6EDF7", display: "flex",
                  alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Icon size={17} color="#4A7FC4" />
                </div>
                <div>
                  <p style={{ color: "#1E3A5F", fontSize: "14px", fontWeight: 500, margin: 0, lineHeight: 1.2 }}>
                    {o.label}
                  </p>
                  <p style={{ color: "#5F5E5A", fontSize: "12px", margin: "2px 0 0" }}>
                    {o.sub}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
