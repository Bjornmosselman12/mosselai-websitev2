"use client";

import { useState, useTransition } from "react";
import { sendMagicLink } from "./actions";

export default function InloggenPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await sendMagicLink(email);
      if (result.success) {
        setSent(true);
      } else {
        setError("Er ging iets mis. Probeer het opnieuw.");
      }
    });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F5F1E8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
      }}
    >
      {/* Logo boven het kaartje */}
      <div style={{ position: "absolute", top: "28px", left: "32px" }}>
        <a href="/" aria-label="MosselAI">
          <img
            src="/logo.png"
            alt="MosselAI"
            style={{ height: "48px", width: "auto" }}
          />
        </a>
      </div>

      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #E8E4DB",
          borderRadius: "16px",
          padding: "44px 40px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {!sent ? (
          <>
            <p
              style={{
                color: "#4A7FC4",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "8px",
                marginTop: 0,
              }}
            >
              MosselAI · Klantportaal
            </p>
            <h1
              style={{
                color: "#1E3A5F",
                fontSize: "24px",
                fontWeight: 500,
                marginBottom: "10px",
                marginTop: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Inloggen
            </h1>
            <p
              style={{
                color: "#5F5E5A",
                fontSize: "14px",
                lineHeight: 1.6,
                marginBottom: "28px",
                marginTop: 0,
              }}
            >
              Vul je e-mailadres in. Je ontvangt direct een inloglink — geen wachtwoord nodig.
            </p>

            {error && (
              <div
                style={{
                  backgroundColor: "#FEF2F2",
                  border: "1px solid #FECACA",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  marginBottom: "20px",
                  color: "#DC2626",
                  fontSize: "14px",
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label
                  htmlFor="email"
                  style={{
                    display: "block",
                    color: "#2C2C2E",
                    fontSize: "14px",
                    fontWeight: 500,
                    marginBottom: "6px",
                  }}
                >
                  E-mailadres
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jouw@bedrijf.nl"
                  autoFocus
                  required
                  style={{
                    width: "100%",
                    backgroundColor: "#F8F7F3",
                    border: "1px solid #E8E4DB",
                    borderRadius: "8px",
                    padding: "12px 14px",
                    fontSize: "15px",
                    color: "#2C2C2E",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                    outline: "none",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isPending || !email}
                style={{
                  backgroundColor: "#1E3A5F",
                  color: "#F5F1E8",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: 500,
                  padding: "13px 24px",
                  border: "none",
                  cursor: isPending || !email ? "not-allowed" : "pointer",
                  fontFamily: "inherit",
                  opacity: isPending || !email ? 0.65 : 1,
                  transition: "opacity 0.15s",
                }}
              >
                {isPending ? "Even geduld…" : "Stuur inloglink →"}
              </button>
            </form>

            <p style={{ color: "#5F5E5A", fontSize: "13px", marginTop: "24px", marginBottom: 0 }}>
              Nog geen toegang?{" "}
              <a
                href="/#contact"
                style={{ color: "#4A7FC4", textDecoration: "none" }}
              >
                Neem contact op
              </a>
            </p>
          </>
        ) : (
          <>
            {/* Bevestiging na versturen */}
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#E6EDF7",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1E3A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>

            <h1
              style={{
                color: "#1E3A5F",
                fontSize: "22px",
                fontWeight: 500,
                marginBottom: "10px",
                marginTop: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Check je e-mail
            </h1>
            <p
              style={{
                color: "#5F5E5A",
                fontSize: "15px",
                lineHeight: 1.6,
                marginBottom: "24px",
                marginTop: 0,
              }}
            >
              Als <strong style={{ color: "#2C2C2E", fontWeight: 500 }}>{email}</strong> bij ons bekend is, heb je binnen een paar minuten een inloglink in je inbox.
            </p>
            <p style={{ color: "#5F5E5A", fontSize: "13px", marginTop: 0 }}>
              Geen e-mail ontvangen?{" "}
              <button
                onClick={() => setSent(false)}
                style={{
                  color: "#4A7FC4",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  fontSize: "13px",
                  fontFamily: "inherit",
                }}
              >
                Probeer opnieuw
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
