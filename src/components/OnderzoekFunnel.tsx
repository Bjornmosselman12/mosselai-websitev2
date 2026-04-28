"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight, ChevronLeft, Check } from "lucide-react";
import {
  vraag1Rol, padARollen, sectoren, fteRanges, omzetRanges,
  systemen as systemenOpties, tijdvreters as tijdvretersOpties,
  aiGebruik as aiGebruikOpties, blokkades as blokkadeOpties,
  verlorenUren as verlorenUrenOpties, aiFrequentie as aiFrequentieOpties,
  situaties as situatiesOpties,
} from "@/data/onderzoekVragen";

// ── Types ──────────────────────────────────────────────────────────────────────

type StepName =
  | "welcome" | "rol" | "sector" | "fte" | "omzet"
  | "systemen" | "tijdvreters" | "situaties" | "ai_gebruik" | "blokkade"
  | "verloren_uren" | "ai_frequentie" | "automatisering_wens"
  | "contact" | "done";

interface Answers {
  rol: string;
  pad: "A" | "B" | "";
  sector: string;
  fte: string;
  omzet: string;
  systemen: string[];
  systeem_anders: string;
  tijdvreters: string[];
  tijdvreters_anders: string;
  situaties: string[];
  ai_gebruik: string;
  blokkade: string;
  blokkade_anders: string;
  verloren_uren: string;
  ai_frequentie: string;
  automatisering_wens: string;
  // contact
  voornaam: string;
  email: string;
  bedrijfsnaam: string;
  wil_quickscan: boolean;
  telefoon: string;
  newsletter_consent: boolean;
  wil_rapport: boolean;
}

const EMPTY: Answers = {
  rol: "", pad: "", sector: "", fte: "", omzet: "",
  systemen: [], systeem_anders: "", tijdvreters: [], tijdvreters_anders: "", situaties: [],
  ai_gebruik: "", blokkade: "", blokkade_anders: "", verloren_uren: "",
  ai_frequentie: "", automatisering_wens: "",
  voornaam: "", email: "", bedrijfsnaam: "",
  wil_quickscan: true, telefoon: "", newsletter_consent: false, wil_rapport: true,
};

function getSequence(pad: "A" | "B" | "", rol: string): StepName[] {
  if (pad === "A") {
    return ["welcome","rol","sector","fte","omzet","systemen","tijdvreters","situaties","ai_gebruik","blokkade","verloren_uren","contact","done"];
  }
  if (pad === "B") {
    const base: StepName[] = ["welcome","rol","sector"];
    if (rol === "werknemer") base.push("fte");
    base.push("ai_frequentie","automatisering_wens","contact","done");
    return base;
  }
  return ["welcome","rol"];
}

// ── Shared styles ──────────────────────────────────────────────────────────────

const qStyle: React.CSSProperties = {
  color: "#1E3A5F", fontSize: "clamp(20px, 2.5vw, 26px)",
  fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.25, margin: "0 0 24px",
};
const labelStyle: React.CSSProperties = {
  display: "block", color: "#2C2C2E", fontSize: "14px", fontWeight: 500, marginBottom: "6px",
};
const inputStyle: React.CSSProperties = {
  width: "100%", backgroundColor: "#F8F7F3", border: "1px solid #E8E4DB",
  borderRadius: "8px", padding: "12px 14px", fontSize: "15px", color: "#2C2C2E",
  fontFamily: "inherit", boxSizing: "border-box", outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s, background-color 0.2s",
};

// ── Sub-components ─────────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = total > 1 ? Math.round(((current) / (total - 1)) * 100) : 0;
  return (
    <div style={{ width: "100%", height: "3px", backgroundColor: "#E8E4DB", borderRadius: "2px", marginBottom: "28px", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, backgroundColor: "#4A7FC4", borderRadius: "2px", transition: "width 0.4s ease" }} />
    </div>
  );
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "#5F5E5A", background: "none", border: "none", cursor: "pointer", fontSize: "14px", marginBottom: "20px", padding: 0, fontFamily: "inherit" }}>
      <ChevronLeft size={16} /> Terug
    </button>
  );
}

function SingleCard({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="of-card"
      style={{
        width: "100%", textAlign: "left", backgroundColor: selected ? "#E6EDF7" : "#ffffff",
        border: selected ? "2px solid #4A7FC4" : "1px solid #E8E4DB",
        borderRadius: "12px", padding: selected ? "13px 15px" : "14px 16px",
        cursor: "pointer", fontFamily: "inherit", color: "#1E3A5F",
        fontSize: "15px", fontWeight: selected ? 500 : 400, lineHeight: 1.4,
        transition: "border-color 0.2s, background-color 0.2s",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}
    >
      {label}
      {selected && <Check size={16} color="#4A7FC4" strokeWidth={2.5} style={{ flexShrink: 0, marginLeft: "8px" }} />}
    </button>
  );
}

function MultiCard({ label, selected, onClick, disabled }: { label: string; selected: boolean; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled && !selected}
      className="of-card"
      style={{
        width: "100%", textAlign: "left", backgroundColor: selected ? "#E6EDF7" : "#ffffff",
        border: selected ? "2px solid #4A7FC4" : "1px solid #E8E4DB",
        borderRadius: "12px", padding: selected ? "11px 13px" : "12px 14px",
        cursor: (disabled && !selected) ? "not-allowed" : "pointer",
        fontFamily: "inherit", color: "#1E3A5F",
        fontSize: "14px", fontWeight: selected ? 500 : 400, lineHeight: 1.35,
        transition: "border-color 0.2s, background-color 0.2s",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        opacity: (disabled && !selected) ? 0.45 : 1,
      }}
    >
      {label}
      {selected && <Check size={15} color="#4A7FC4" strokeWidth={2.5} style={{ flexShrink: 0, marginLeft: "8px" }} />}
    </button>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function OnderzoekFunnel() {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const sequence = getSequence(answers.pad, answers.rol);
  const currentStepName = sequence[stepIdx] ?? "welcome";
  const totalVisible = sequence.length;

  useEffect(() => {
    if (stepIdx === 0) return;
    const el = containerRef.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, [stepIdx]);

  const next = () => setStepIdx((i) => i + 1);
  const back = () => { setStepIdx((i) => i - 1); setSubmitError(""); };

  const set = <K extends keyof Answers>(k: K, v: Answers[K]) =>
    setAnswers((a) => ({ ...a, [k]: v }));

  const toggleMulti = (key: "systemen" | "tijdvreters", value: string, max?: number) => {
    setAnswers((a) => {
      const cur = a[key];
      if (cur.includes(value)) return { ...a, [key]: cur.filter((x) => x !== value) };
      if (max && cur.length >= max) return a;
      return { ...a, [key]: [...cur, value] };
    });
  };

  // ── Welcome ──────────────────────────────────────────────────────────────────
  const renderWelcome = () => (
    <div className="of-step" style={{ maxWidth: "580px", margin: "0 auto" }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        backgroundColor: "#E6EDF7", color: "#1E3A5F", borderRadius: "999px",
        padding: "5px 14px", fontSize: "13px", fontWeight: 500, marginBottom: "20px",
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#4A7FC4", display: "inline-block" }} />
        Onderzoek · MosselAI 2026
      </div>
      <h1 style={{ color: "#1E3A5F", fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.15, marginBottom: "20px" }}>
        AI-adoptie in het Nederlandse MKB: Onderzoek 2026
      </h1>
      <p style={{ color: "#5F5E5A", fontSize: "15px", lineHeight: 1.8, marginBottom: "12px" }}>
        Ik onderzoek hoe Nederlandse MKB-bedrijven AI in 2026 echt gebruiken. Niet de hype, maar de praktijk. Welke processen lopen al automatisch, waar zit nog handmatig werk, en wat houdt mensen tegen?
      </p>
      <p style={{ color: "#5F5E5A", fontSize: "15px", lineHeight: 1.8, marginBottom: "24px" }}>
        In ruil stuur ik je het rapport zodra het klaar is. Vul je het in als ondernemer of beslisser? Dan maak ik bovendien, als je dat wilt, een gepersonaliseerde quick-scan voor jouw bedrijf.
      </p>
      <p style={{ color: "#5F5E5A", fontSize: "14px", fontStyle: "italic", marginBottom: "32px", lineHeight: 1.6 }}>
        Bjorn Mosselman, MosselAI · Hoeksche Waard
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "32px" }}>
        {["Gratis rapport", "Geen verplichtingen"].map((t) => (
          <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "#5F5E5A", fontSize: "13px" }}>
            <Check size={13} color="#4A7FC4" strokeWidth={3} />{t}
          </span>
        ))}
      </div>
      <button onClick={next} className="of-cta-btn" style={{ backgroundColor: "#1E3A5F", color: "#F5F1E8", borderRadius: "10px", fontSize: "16px", fontWeight: 500, padding: "14px 32px", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "inherit" }}>
        Start het onderzoek <ArrowRight size={18} />
      </button>
    </div>
  );

  // ── Rol ──────────────────────────────────────────────────────────────────────
  const renderRol = () => (
    <div className="of-step">
      <BackBtn onClick={back} />
      <ProgressBar current={1} total={totalVisible} />
      <p style={{ color: "#4A7FC4", fontSize: "13px", fontWeight: 500, letterSpacing: "0.04em", marginBottom: "8px" }}>Vraag 1</p>
      <h2 style={qStyle}>Wat is jouw rol?</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {vraag1Rol.map((o) => (
          <SingleCard key={o.value} label={o.label} selected={answers.rol === o.value}
            onClick={() => {
              const pad: "A" | "B" = padARollen.includes(o.value) ? "A" : "B";
              setAnswers((a) => ({ ...a, rol: o.value, pad }));
              next();
            }}
          />
        ))}
      </div>
    </div>
  );

  // ── Sector ───────────────────────────────────────────────────────────────────
  const renderSector = () => (
    <div className="of-step">
      <BackBtn onClick={back} />
      <ProgressBar current={stepIdx} total={totalVisible} />
      <p style={{ color: "#4A7FC4", fontSize: "13px", fontWeight: 500, letterSpacing: "0.04em", marginBottom: "8px" }}>
        Vraag {stepIdx} van {totalVisible - 2}
      </p>
      <h2 style={qStyle}>In welke sector is jouw bedrijf actief?</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {sectoren.map((o) => (
          <SingleCard key={o.value} label={o.label} selected={answers.sector === o.value}
            onClick={() => { set("sector", o.value); next(); }}
          />
        ))}
      </div>
    </div>
  );

  // ── FTE ──────────────────────────────────────────────────────────────────────
  const renderFte = () => (
    <div className="of-step">
      <BackBtn onClick={back} />
      <ProgressBar current={stepIdx} total={totalVisible} />
      <p style={{ color: "#4A7FC4", fontSize: "13px", fontWeight: 500, letterSpacing: "0.04em", marginBottom: "8px" }}>
        Vraag {stepIdx} van {totalVisible - 2}
      </p>
      <h2 style={qStyle}>Hoeveel medewerkers telt jullie organisatie?</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
        {fteRanges.map((o) => (
          <SingleCard key={o.value} label={o.label} selected={answers.fte === o.value}
            onClick={() => { set("fte", o.value); next(); }}
          />
        ))}
      </div>
    </div>
  );

  // ── Omzet ─────────────────────────────────────────────────────────────────────
  const renderOmzet = () => (
    <div className="of-step">
      <BackBtn onClick={back} />
      <ProgressBar current={stepIdx} total={totalVisible} />
      <p style={{ color: "#4A7FC4", fontSize: "13px", fontWeight: 500, letterSpacing: "0.04em", marginBottom: "8px" }}>
        Vraag {stepIdx} van {totalVisible - 2}
      </p>
      <h2 style={qStyle}>Wat is de jaarlijkse omzet van jullie bedrijf?</h2>
      <p style={{ color: "#5F5E5A", fontSize: "14px", marginBottom: "16px" }}>Optioneel, helpt ons te segmenteren.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {omzetRanges.map((o) => (
          <SingleCard key={o.value} label={o.label} selected={answers.omzet === o.value}
            onClick={() => { set("omzet", o.value); next(); }}
          />
        ))}
      </div>
    </div>
  );

  // ── Systemen (multi) ───────────────────────────────────────────────────────────
  const renderSystemen = () => {
    const hasAnders = answers.systemen.includes("anders");
    return (
      <div className="of-step">
        <BackBtn onClick={back} />
        <ProgressBar current={stepIdx} total={totalVisible} />
        <p style={{ color: "#4A7FC4", fontSize: "13px", fontWeight: 500, letterSpacing: "0.04em", marginBottom: "8px" }}>
          Vraag {stepIdx} van {totalVisible - 2}
        </p>
        <h2 style={qStyle}>Welke software / systemen gebruik je? <span style={{ color: "#5F5E5A", fontSize: "15px", fontWeight: 400 }}>(meerdere mogelijk)</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
          {systemenOpties.map((o) => (
            <MultiCard key={o.value} label={o.label}
              selected={answers.systemen.includes(o.value)}
              onClick={() => toggleMulti("systemen", o.value)}
            />
          ))}
        </div>
        {hasAnders && (
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle} htmlFor="systeem-anders">Welk systeem?</label>
            <input id="systeem-anders" type="text" placeholder="Bv. SAP, Teamleader…" className="of-input"
              value={answers.systeem_anders} onChange={(e) => set("systeem_anders", e.target.value)}
              style={inputStyle} />
          </div>
        )}
        <button onClick={next} disabled={answers.systemen.length === 0}
          className="of-cta-btn"
          style={{ backgroundColor: answers.systemen.length ? "#1E3A5F" : "#C5C5C5", color: "#F5F1E8", borderRadius: "10px", fontSize: "15px", fontWeight: 500, padding: "12px 28px", border: "none", cursor: answers.systemen.length ? "pointer" : "not-allowed", display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "inherit", transition: "background-color 0.2s" }}>
          Volgende <ArrowRight size={16} />
        </button>
      </div>
    );
  };

  // ── Tijdvreters (multi, max 3) ─────────────────────────────────────────────────
  const renderTijdvreters = () => {
    const count = answers.tijdvreters.length;
    const maxed = count >= 3;
    const hasAnders = answers.tijdvreters.includes("anders");
    return (
      <div className="of-step">
        <BackBtn onClick={back} />
        <ProgressBar current={stepIdx} total={totalVisible} />
        <p style={{ color: "#4A7FC4", fontSize: "13px", fontWeight: 500, letterSpacing: "0.04em", marginBottom: "8px" }}>
          Vraag {stepIdx} van {totalVisible - 2}
        </p>
        <h2 style={qStyle}>Welke processen kosten jullie het meeste tijd? <span style={{ color: "#5F5E5A", fontSize: "15px", fontWeight: 400 }}>(max 3)</span></h2>
        <p style={{ color: maxed ? "#4A7FC4" : "#5F5E5A", fontSize: "13px", marginBottom: "16px", fontWeight: maxed ? 500 : 400 }}>
          {count} van 3 geselecteerd
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
          {tijdvretersOpties.map((o) => (
            <MultiCard key={o.value} label={o.label}
              selected={answers.tijdvreters.includes(o.value)}
              disabled={maxed}
              onClick={() => toggleMulti("tijdvreters", o.value, 3)}
            />
          ))}
        </div>
        {hasAnders && (
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle} htmlFor="tv-anders">Welk proces?</label>
            <input id="tv-anders" type="text" placeholder="Omschrijf kort…" className="of-input"
              value={answers.tijdvreters_anders} onChange={(e) => set("tijdvreters_anders", e.target.value)}
              style={inputStyle} />
          </div>
        )}
        <button onClick={next} disabled={count === 0}
          className="of-cta-btn"
          style={{ backgroundColor: count ? "#1E3A5F" : "#C5C5C5", color: "#F5F1E8", borderRadius: "10px", fontSize: "15px", fontWeight: 500, padding: "12px 28px", border: "none", cursor: count ? "pointer" : "not-allowed", display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "inherit" }}>
          Volgende <ArrowRight size={16} />
        </button>
      </div>
    );
  };

  // ── Situaties (multi, geen max) ───────────────────────────────────────────────
  const renderSituaties = () => {
    const count = answers.situaties.length;
    const heeftGeen = answers.situaties.includes("geen");
    const toggleSituatie = (value: string) => {
      setAnswers((a) => {
        if (value === "geen") {
          return { ...a, situaties: a.situaties.includes("geen") ? [] : ["geen"] };
        }
        const zonder = a.situaties.filter((x) => x !== "geen");
        if (zonder.includes(value)) return { ...a, situaties: zonder.filter((x) => x !== value) };
        return { ...a, situaties: [...zonder, value] };
      });
    };
    return (
      <div className="of-step">
        <BackBtn onClick={back} />
        <ProgressBar current={stepIdx} total={totalVisible} />
        <p style={{ color: "#4A7FC4", fontSize: "13px", fontWeight: 500, letterSpacing: "0.04em", marginBottom: "8px" }}>
          Vraag {stepIdx} van {totalVisible - 2}
        </p>
        <h2 style={qStyle}>Welke van deze situaties herken je uit je eigen bedrijf? <span style={{ color: "#5F5E5A", fontSize: "15px", fontWeight: 400 }}>(kies alles wat van toepassing is)</span></h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
          {situatiesOpties.map((o) => (
            <MultiCard key={o.value} label={o.label}
              selected={answers.situaties.includes(o.value)}
              disabled={heeftGeen && o.value !== "geen"}
              onClick={() => toggleSituatie(o.value)}
            />
          ))}
        </div>
        <button onClick={next} disabled={count === 0}
          className="of-cta-btn"
          style={{ backgroundColor: count ? "#1E3A5F" : "#C5C5C5", color: "#F5F1E8", borderRadius: "10px", fontSize: "15px", fontWeight: 500, padding: "12px 28px", border: "none", cursor: count ? "pointer" : "not-allowed", display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "inherit" }}>
          Volgende <ArrowRight size={16} />
        </button>
      </div>
    );
  };

  // ── AI gebruik ────────────────────────────────────────────────────────────────
  const renderAiGebruik = () => (
    <div className="of-step">
      <BackBtn onClick={back} />
      <ProgressBar current={stepIdx} total={totalVisible} />
      <p style={{ color: "#4A7FC4", fontSize: "13px", fontWeight: 500, letterSpacing: "0.04em", marginBottom: "8px" }}>
        Vraag {stepIdx} van {totalVisible - 2}
      </p>
      <h2 style={qStyle}>Hoe gebruikt jullie bedrijf AI op dit moment?</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {aiGebruikOpties.map((o) => (
          <SingleCard key={o.value} label={o.label} selected={answers.ai_gebruik === o.value}
            onClick={() => { set("ai_gebruik", o.value); next(); }}
          />
        ))}
      </div>
    </div>
  );

  // ── Blokkade ──────────────────────────────────────────────────────────────────
  const renderBlokkade = () => {
    const hasAnders = answers.blokkade === "anders";
    return (
      <div className="of-step">
        <BackBtn onClick={back} />
        <ProgressBar current={stepIdx} total={totalVisible} />
        <p style={{ color: "#4A7FC4", fontSize: "13px", fontWeight: 500, letterSpacing: "0.04em", marginBottom: "8px" }}>
          Vraag {stepIdx} van {totalVisible - 2}
        </p>
        <h2 style={qStyle}>Wat is de grootste drempel om met AI te starten?</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
          {blokkadeOpties.map((o) => (
            <SingleCard key={o.value} label={o.label} selected={answers.blokkade === o.value}
              onClick={() => { set("blokkade", o.value); if (o.value !== "anders") next(); }}
            />
          ))}
        </div>
        {hasAnders && (
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle} htmlFor="blokkade-anders">Toelichting</label>
            <input id="blokkade-anders" type="text" placeholder="Omschrijf kort…" className="of-input"
              value={answers.blokkade_anders} onChange={(e) => set("blokkade_anders", e.target.value)}
              style={inputStyle} />
            <button onClick={next} className="of-cta-btn" style={{ marginTop: "12px", backgroundColor: "#1E3A5F", color: "#F5F1E8", borderRadius: "10px", fontSize: "15px", fontWeight: 500, padding: "12px 28px", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "inherit" }}>
              Volgende <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    );
  };

  // ── Verloren uren ─────────────────────────────────────────────────────────────
  const renderVerlorenUren = () => (
    <div className="of-step">
      <BackBtn onClick={back} />
      <ProgressBar current={stepIdx} total={totalVisible} />
      <p style={{ color: "#4A7FC4", fontSize: "13px", fontWeight: 500, letterSpacing: "0.04em", marginBottom: "8px" }}>
        Vraag {stepIdx} van {totalVisible - 2}
      </p>
      <h2 style={qStyle}>Hoeveel uur per week gaat er in jullie bedrijf op aan herhaalmatig handmatig werk?</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
        {verlorenUrenOpties.map((o) => (
          <SingleCard key={o.value} label={o.label} selected={answers.verloren_uren === o.value}
            onClick={() => { set("verloren_uren", o.value); next(); }}
          />
        ))}
      </div>
    </div>
  );

  // ── AI Frequentie (Pad B) ──────────────────────────────────────────────────────
  const renderAiFrequentie = () => (
    <div className="of-step">
      <BackBtn onClick={back} />
      <ProgressBar current={stepIdx} total={totalVisible} />
      <p style={{ color: "#4A7FC4", fontSize: "13px", fontWeight: 500, letterSpacing: "0.04em", marginBottom: "8px" }}>
        Vraag {stepIdx} van {totalVisible - 2}
      </p>
      <h2 style={qStyle}>Hoe vaak gebruik jij zelf AI-tools (zoals ChatGPT, Copilot)?</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {aiFrequentieOpties.map((o) => (
          <SingleCard key={o.value} label={o.label} selected={answers.ai_frequentie === o.value}
            onClick={() => { set("ai_frequentie", o.value); next(); }}
          />
        ))}
      </div>
    </div>
  );

  // ── Automatisering wens (Pad B, open) ─────────────────────────────────────────
  const renderAutomatiseringWens = () => {
    const chars = answers.automatisering_wens.length;
    return (
      <div className="of-step">
        <BackBtn onClick={back} />
        <ProgressBar current={stepIdx} total={totalVisible} />
        <p style={{ color: "#4A7FC4", fontSize: "13px", fontWeight: 500, letterSpacing: "0.04em", marginBottom: "8px" }}>
          Vraag {stepIdx} van {totalVisible - 2}
        </p>
        <h2 style={qStyle}>Welke taak zou jij het liefst geautomatiseerd zien?</h2>
        <p style={{ color: "#5F5E5A", fontSize: "14px", marginBottom: "16px" }}>Optioneel, je mag dit overslaan.</p>
        <textarea
          className="of-input"
          rows={4}
          maxLength={280}
          placeholder="Bv. het verwerken van inkomende e-mails, het bijhouden van urenregistratie…"
          value={answers.automatisering_wens}
          onChange={(e) => set("automatisering_wens", e.target.value)}
          style={{ ...inputStyle, resize: "vertical", minHeight: "100px" }}
        />
        <p style={{ color: "#5F5E5A", fontSize: "12px", textAlign: "right", marginTop: "4px", marginBottom: "20px" }}>{chars}/280</p>
        <button onClick={next} className="of-cta-btn" style={{ backgroundColor: "#1E3A5F", color: "#F5F1E8", borderRadius: "10px", fontSize: "15px", fontWeight: 500, padding: "12px 28px", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "inherit" }}>
          Volgende <ArrowRight size={16} />
        </button>
      </div>
    );
  };

  // ── Contact ───────────────────────────────────────────────────────────────────
  const renderContact = () => {
    const isPadA = answers.pad === "A";

    const validate = (): string => {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const wantsContact = answers.wil_rapport || answers.wil_quickscan;
      if (wantsContact) {
        if (!answers.voornaam || answers.voornaam.trim().length < 2) return "Vul je voornaam in (minimaal 2 tekens).";
        if (!emailRe.test(answers.email)) return "Vul een geldig e-mailadres in.";
      }
      if (answers.telefoon && answers.telefoon.replace(/\D/g, "").length < 9) {
        return "Vul een geldig telefoonnummer in (minimaal 9 cijfers).";
      }
      return "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const err = validate();
      if (err) { setSubmitError(err); return; }
      setSubmitError("");
      setSubmitting(true);
      try {
        const res = await fetch("/api/onderzoek-submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(answers),
        });
        const json = await res.json();
        if (!json.ok) throw new Error(json.error || "Fout");
        next();
      } catch (err) {
        setSubmitError("Er ging iets mis. Probeer het opnieuw of stuur een e-mail naar info@mosselai.com.");
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <div className="of-step" style={{ maxWidth: "480px", margin: "0 auto" }}>
        <BackBtn onClick={back} />
        <ProgressBar current={stepIdx} total={totalVisible} />
        <h2 style={qStyle}>Wat wil je ontvangen?</h2>
        <p style={{ color: "#5F5E5A", fontSize: "14px", marginBottom: "4px" }}>Kies wat je wilt — beide is ook prima.</p>

        {submitError && (
          <div style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "8px", padding: "12px 16px", marginBottom: "4px", color: "#DC2626", fontSize: "14px" }}>
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Rapport toggle — beide paden */}
          <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer", backgroundColor: answers.wil_rapport ? "#E6EDF7" : "#F8F7F3", border: `1px solid ${answers.wil_rapport ? "#4A7FC4" : "#E8E4DB"}`, borderRadius: "10px", padding: "14px 16px" }}>
            <input type="checkbox" checked={answers.wil_rapport} onChange={(e) => set("wil_rapport", e.target.checked)}
              style={{ width: "18px", height: "18px", marginTop: "1px", flexShrink: 0, accentColor: "#1E3A5F", cursor: "pointer" }} />
            <span style={{ color: "#1E3A5F", fontSize: "14px", lineHeight: 1.5 }}>
              <strong>Het eindrapport</strong> — stuur me het benchmarkrapport zodra het klaar is
            </span>
          </label>

          {/* Quick-scan toggle — alleen Pad A */}
          {isPadA && (
            <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer", backgroundColor: answers.wil_quickscan ? "#E6EDF7" : "#F8F7F3", border: `1px solid ${answers.wil_quickscan ? "#4A7FC4" : "#E8E4DB"}`, borderRadius: "10px", padding: "14px 16px" }}>
              <input type="checkbox" checked={answers.wil_quickscan} onChange={(e) => set("wil_quickscan", e.target.checked)}
                style={{ width: "18px", height: "18px", marginTop: "1px", flexShrink: 0, accentColor: "#1E3A5F", cursor: "pointer" }} />
              <span style={{ color: "#1E3A5F", fontSize: "14px", lineHeight: 1.5 }}>
                <strong>Een gratis quick-scan</strong> — een persoonlijke analyse van de AI-kansen in mijn bedrijf
              </span>
            </label>
          )}

          {/* Contactvelden — toon als minstens één toggle aan staat */}
          {(answers.wil_rapport || answers.wil_quickscan) && (
            <>
              <div>
                <label htmlFor="of-voornaam" style={labelStyle}>Voornaam</label>
                <input id="of-voornaam" type="text" placeholder="Jan" className="of-input"
                  value={answers.voornaam} onChange={(e) => set("voornaam", e.target.value)}
                  style={inputStyle} />
              </div>
              <div>
                <label htmlFor="of-email" style={labelStyle}>E-mailadres</label>
                <input id="of-email" type="email" placeholder="jan@bedrijf.nl" className="of-input"
                  value={answers.email} onChange={(e) => set("email", e.target.value)}
                  style={inputStyle} />
              </div>
              <div>
                <label htmlFor="of-bedrijf" style={labelStyle}>
                  Bedrijfsnaam <span style={{ color: "#5F5E5A", fontWeight: 400, fontSize: "12px" }}>(optioneel)</span>
                </label>
                <input id="of-bedrijf" type="text" placeholder="Jouw Bedrijf BV" className="of-input"
                  value={answers.bedrijfsnaam} onChange={(e) => set("bedrijfsnaam", e.target.value)}
                  style={inputStyle} />
              </div>
              {isPadA && answers.wil_quickscan && (
                <div>
                  <label htmlFor="of-tel" style={labelStyle}>
                    Telefoonnummer (WhatsApp) <span style={{ color: "#5F5E5A", fontWeight: 400, fontSize: "12px" }}>(optioneel)</span>
                  </label>
                  <input id="of-tel" type="tel" placeholder="+31 6 12 34 56 78" className="of-input"
                    value={answers.telefoon} onChange={(e) => set("telefoon", e.target.value)}
                    style={inputStyle} />
                </div>
              )}
            </>
          )}

          {/* Newsletter */}
          <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}>
            <input type="checkbox" checked={answers.newsletter_consent} onChange={(e) => set("newsletter_consent", e.target.checked)}
              style={{ width: "16px", height: "16px", marginTop: "2px", flexShrink: 0, accentColor: "#1E3A5F", cursor: "pointer" }} />
            <span style={{ color: "#5F5E5A", fontSize: "13px", lineHeight: 1.5 }}>
              Ja, je mag me 1× per kwartaal mailen met praktische AI-cases voor MKB
            </span>
          </label>

          <button type="submit" disabled={submitting} className="of-cta-btn of-submit-btn"
            style={{ backgroundColor: "#1E3A5F", color: "#F5F1E8", borderRadius: "10px", fontSize: "15px", fontWeight: 500, padding: "14px 24px", border: "none", cursor: submitting ? "wait" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "inherit", opacity: submitting ? 0.7 : 1 }}>
            {submitting ? "Versturen…" : "Verstuur mijn antwoorden"} <ArrowRight size={16} />
          </button>
        </form>
        <p style={{ color: "#5F5E5A", fontSize: "12px", marginTop: "16px", textAlign: "center" }}>🔒 Je gegevens worden nooit gedeeld met derden.</p>
      </div>
    );
  };

  // ── Done ──────────────────────────────────────────────────────────────────────
  const renderDone = () => {
    const isPadA = answers.pad === "A";
    return (
      <div className="of-step" style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#E6EDF7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <Check size={28} color="#4A7FC4" strokeWidth={2.5} />
        </div>
        <h2 style={{ color: "#1E3A5F", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 500, letterSpacing: "-0.02em", marginBottom: "16px" }}>
          {isPadA ? "Top, je antwoorden staan binnen." : "Bedankt voor je deelname."}
        </h2>
        {isPadA ? (
          <>
            <p style={{ color: "#5F5E5A", fontSize: "15px", lineHeight: 1.7, marginBottom: "12px" }}>
              Het volledige benchmarkrapport stuur ik je zodra het klaar is.
            </p>
            {answers.wil_quickscan && (
              <p style={{ color: "#5F5E5A", fontSize: "15px", lineHeight: 1.7, marginBottom: "12px" }}>
                Je hebt de quick-scan aangevinkt. Ik neem contact met je op zodra ik hem klaar heb.
                {answers.telefoon && " Als je dat liever hebt, loop ik hem ook kort met je door via WhatsApp."}
              </p>
            )}
          </>
        ) : (
          <p style={{ color: "#5F5E5A", fontSize: "15px", lineHeight: 1.7, marginBottom: "12px" }}>
            Je input helpt mij een eerlijk beeld neerzetten van hoe Nederland echt met AI omgaat.
            {answers.wil_rapport && " Heb je het vinkje gezet? Dan stuur ik je het rapport zodra het klaar is."}
          </p>
        )}
        <p style={{ color: "#5F5E5A", fontSize: "14px", fontStyle: "italic", marginTop: "24px" }}>Bjorn Mosselman, MosselAI</p>
      </div>
    );
  };

  // ── Router ─────────────────────────────────────────────────────────────────────
  const renderStep = () => {
    switch (currentStepName) {
      case "welcome":             return renderWelcome();
      case "rol":                 return renderRol();
      case "sector":              return renderSector();
      case "fte":                 return renderFte();
      case "omzet":               return renderOmzet();
      case "systemen":            return renderSystemen();
      case "tijdvreters":         return renderTijdvreters();
      case "situaties":           return renderSituaties();
      case "ai_gebruik":          return renderAiGebruik();
      case "blokkade":            return renderBlokkade();
      case "verloren_uren":       return renderVerlorenUren();
      case "ai_frequentie":       return renderAiFrequentie();
      case "automatisering_wens": return renderAutomatiseringWens();
      case "contact":             return renderContact();
      case "done":                return renderDone();
      default:                    return renderWelcome();
    }
  };

  return (
    <div ref={containerRef} style={{ backgroundColor: "#F5F1E8", padding: "64px 0 80px" }}>
      <style>{`
        @keyframes ofSlideIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .of-step { animation: ofSlideIn 0.3s ease forwards; }
        .of-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(30,58,95,0.08); }
        .of-cta-btn { transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s; }
        .of-cta-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(30,58,95,0.18); }
        .of-input:focus {
          border-color: #4A7FC4 !important;
          box-shadow: 0 0 0 3px rgba(74,127,196,0.18) !important;
          background-color: #ffffff !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .of-step { animation: none; }
          .of-card:hover, .of-cta-btn:hover { transform: none; box-shadow: none; }
        }
      `}</style>
      <div className="max-w-2xl mx-auto px-6">
        {renderStep()}
      </div>
    </div>
  );
}
