"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowRight, ChevronLeft, Clock, Zap,
  Package, Factory, ShoppingCart, Wrench, Briefcase,
  PackageCheck, Receipt, Mail, BarChart3, FileText,
  Pencil, Table2, Laptop, Users,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type SectorKey  = "groothandel" | "productie" | "handel" | "installateur" | "dienstverlener";
type PijnKey    = "orders" | "facturen" | "emails" | "rapportages" | "offertes";
type MethodeKey = "handmatig" | "excel" | "software" | "uitbesteed";
type UrenKey    = "lt2" | "2to5" | "5to10" | "gt10";

interface Answers {
  sector:   SectorKey  | "";
  pijnpunt: PijnKey    | "";
  methode:  MethodeKey | "";
  uren:     UrenKey    | "";
}

interface FormData {
  naam:    string;
  email:   string;
  bedrijf: string;
}

// ─── Lookup tables ────────────────────────────────────────────────────────────

const annualHours: Record<UrenKey, number> = {
  lt2:     80,
  "2to5":  165,
  "5to10": 330,
  gt10:    550,
};

const serviceLabel: Record<PijnKey, string> = {
  orders:      "Orderverwerking",
  facturen:    "Facturatie",
  emails:      "E-mailafhandeling",
  rapportages: "Weekrapportages",
  offertes:    "Offertes & calculaties",
};

const sectorShort: Record<SectorKey, string> = {
  groothandel:    "groothandel",
  productie:      "productie",
  handel:         "webshop",
  installateur:   "installateur",
  dienstverlener: "dienstverlener",
};

// ─── Shared style constants ───────────────────────────────────────────────────

const questionStyle: React.CSSProperties = {
  color: "#1E3A5F",
  fontSize: "clamp(22px, 2.5vw, 28px)",
  fontWeight: 500,
  letterSpacing: "-0.02em",
  lineHeight: 1.25,
  margin: "0 0 28px",
};

const stepCounterStyle: React.CSSProperties = {
  color: "#4A7FC4",
  fontSize: "13px",
  fontWeight: 500,
  letterSpacing: "0.04em",
  marginBottom: "8px",
};

const cardButtonStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  border: "1px solid #E8E4DB",
  borderRadius: "14px",
  padding: "20px 18px",
  cursor: "pointer",
  fontFamily: "inherit",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  minHeight: "110px",
  width: "100%",
};

const inputStyle: React.CSSProperties = {
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
  transition: "border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  color: "#2C2C2E",
  fontSize: "14px",
  fontWeight: 500,
  marginBottom: "6px",
};

// ─── Icon cell ────────────────────────────────────────────────────────────────

function IconCell({ icon: Icon, selected }: { icon: React.ElementType; selected: boolean }) {
  return (
    <div
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "10px",
        backgroundColor: selected ? "#C5D7F0" : "#E6EDF7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "10px",
        flexShrink: 0,
        transition: "background-color 0.2s ease",
      }}
    >
      <Icon size={22} color={selected ? "#1E3A5F" : "#4A7FC4"} />
    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ current }: { current: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "28px" }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <div key={n} style={{ display: "flex", alignItems: "center", flex: n < 5 ? "1" : "none", gap: "6px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: n <= current ? "#1E3A5F" : "#E8E4DB",
              transition: "background-color 0.3s ease",
              flexShrink: 0,
            }}
          />
          {n < 5 && (
            <div
              style={{
                flex: 1,
                height: "2px",
                backgroundColor: n < current ? "#1E3A5F" : "#E8E4DB",
                borderRadius: "1px",
                transition: "background-color 0.3s ease",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function QuizFunnel() {
  const [step,        setStep]        = useState(0);
  const [answers,     setAnswers]     = useState<Answers>({ sector: "", pijnpunt: "", methode: "", uren: "" });
  const [formData,    setFormData]    = useState<FormData>({ naam: "", email: "", bedrijf: "" });
  const [showInsight, setShowInsight] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll section to top-of-viewport (below header) whenever step changes away from 0
  useEffect(() => {
    if (step === 0) return;
    const el = sectionRef.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, [step]);

  // Pre-fill e-mail from Hero form (via sessionStorage) when step 5 is reached
  useEffect(() => {
    if (step !== 5) return;
    const saved = sessionStorage.getItem("quiz_email");
    if (saved) setFormData((f) => ({ ...f, email: saved }));
  }, [step]);

  const goBack = () => {
    setStep((s) => s - 1);
    setShowInsight(false);
  };

  const BackButton = () => (
    <button
      onClick={goBack}
      className="quiz-back-btn"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        color: "#5F5E5A",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "14px",
        marginBottom: "20px",
        padding: "0",
        fontFamily: "inherit",
      }}
    >
      <ChevronLeft size={16} />
      Terug
    </button>
  );

  // ── Step 0: Entry ────────────────────────────────────────────────────────────
  const renderStep0 = () => (
    <div key="step-0" className="quiz-step" style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto" }}>
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
        Ontdek jouw potentieel
      </p>
      <h2
        style={{
          color: "#1E3A5F",
          fontSize: "clamp(28px, 3.5vw, 40px)",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          marginBottom: "16px",
        }}
      >
        Laat me kijken wat er bij jou kan.
      </h2>
      <p
        style={{
          color: "#5F5E5A",
          fontSize: "16px",
          lineHeight: 1.7,
          marginBottom: "32px",
        }}
      >
        5 korte vragen. Geen verkooppraatje. Wel een eerlijk beeld van wat er automatisch kan lopen.
      </p>

      <ProgressBar current={0} />

      <button
        onClick={() => setStep(1)}
        className="quiz-cta-btn"
        style={{
          backgroundColor: "#1E3A5F",
          color: "#F5F1E8",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: 500,
          padding: "14px 32px",
          border: "none",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "inherit",
        }}
      >
        Doe de check
        <ArrowRight size={18} />
      </button>

    </div>
  );

  // ── Step 1: Sector ───────────────────────────────────────────────────────────
  const renderStep1 = () => {
    const sectors: { key: SectorKey; icon: React.ElementType; label: string }[] = [
      { key: "groothandel",    icon: Package,      label: "Groothandel / distributie" },
      { key: "productie",      icon: Factory,      label: "Productie / maakbedrijf" },
      { key: "handel",         icon: ShoppingCart, label: "Handel / webshop" },
      { key: "installateur",   icon: Wrench,       label: "Installateur / aannemer" },
      { key: "dienstverlener", icon: Briefcase,    label: "Dienstverlener / overig" },
    ];
    return (
      <div key="step-1" className="quiz-step">
        <ProgressBar current={1} />
        <p style={stepCounterStyle}>Stap 1 van 5</p>
        <h3 style={questionStyle}>Wat voor bedrijf run jij?</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px" }}>
          {sectors.map((s) => {
            const selected = answers.sector === s.key;
            return (
              <button
                key={s.key}
                className={`quiz-card${selected ? " selected" : ""}`}
                style={cardButtonStyle}
                onClick={() => { setAnswers((a) => ({ ...a, sector: s.key })); setStep(2); }}
              >
                <IconCell icon={s.icon} selected={selected} />
                <span style={{ color: "#1E3A5F", fontSize: "14px", fontWeight: 500, lineHeight: 1.3 }}>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // ── Step 2: Pijnpunt ─────────────────────────────────────────────────────────
  const renderStep2 = () => {
    const pijnen: { key: PijnKey; icon: React.ElementType; label: string }[] = [
      { key: "orders",      icon: PackageCheck, label: "Orders & bestellingen verwerken" },
      { key: "facturen",    icon: Receipt,      label: "Facturen & administratie" },
      { key: "emails",      icon: Mail,         label: "E-mails afhandelen" },
      { key: "rapportages", icon: BarChart3,    label: "Rapportages & overzichten" },
      { key: "offertes",    icon: FileText,     label: "Offertes schrijven" },
    ];
    return (
      <div key="step-2" className="quiz-step">
        <BackButton />
        <ProgressBar current={2} />
        <p style={stepCounterStyle}>Stap 2 van 5</p>
        <h3 style={questionStyle}>Welke taak kost jouw team wekelijks de meeste tijd?</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px" }}>
          {pijnen.map((p) => {
            const selected = answers.pijnpunt === p.key;
            return (
              <button
                key={p.key}
                className={`quiz-card${selected ? " selected" : ""}`}
                style={cardButtonStyle}
                onClick={() => { setAnswers((a) => ({ ...a, pijnpunt: p.key })); setStep(3); }}
              >
                <IconCell icon={p.icon} selected={selected} />
                <span style={{ color: "#1E3A5F", fontSize: "14px", fontWeight: 500, lineHeight: 1.3 }}>{p.label}</span>
              </button>
            );
          })}
        </div>
        {answers.sector && (
          <p style={{ color: "#5F5E5A", fontSize: "13px", marginTop: "20px", fontStyle: "italic", textAlign: "center" }}>
            8 van de 10 {sectorShort[answers.sector as SectorKey]} bedrijven herkennen dit.
          </p>
        )}
      </div>
    );
  };

  // ── Step 3: Methode ──────────────────────────────────────────────────────────
  const renderStep3 = () => {
    const methodes: { key: MethodeKey; icon: React.ElementType; label: string }[] = [
      { key: "handmatig",  icon: Pencil, label: "Handmatig, altijd zelf" },
      { key: "excel",      icon: Table2, label: "In Excel of Word" },
      { key: "software",   icon: Laptop, label: "Via software, maar nog veel handwerk erbij" },
      { key: "uitbesteed", icon: Users,  label: "We besteden het uit (maar dat kost ook geld)" },
    ];
    return (
      <div key="step-3" className="quiz-step">
        <BackButton />
        <ProgressBar current={3} />
        <p style={stepCounterStyle}>Stap 3 van 5</p>
        <h3 style={questionStyle}>Hoe verwerk je dit op dit moment?</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {methodes.map((m) => {
            const selected = answers.methode === m.key;
            return (
              <button
                key={m.key}
                className={`quiz-card${selected ? " selected" : ""}`}
                style={cardButtonStyle}
                onClick={() => { setAnswers((a) => ({ ...a, methode: m.key })); setStep(4); }}
              >
                <IconCell icon={m.icon} selected={selected} />
                <span style={{ color: "#1E3A5F", fontSize: "14px", fontWeight: 500, lineHeight: 1.3 }}>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // ── Step 4: Uren + insight ───────────────────────────────────────────────────
  const renderStep4 = () => {
    const urenOpties: { key: UrenKey; label: string; sub: string }[] = [
      { key: "lt2",    label: "< 2 uur/week",  sub: "Zo nu en dan" },
      { key: "2to5",   label: "2–5 uur/week",  sub: "Elke week merkbaar" },
      { key: "5to10",  label: "5–10 uur/week", sub: "Substantieel deel" },
      { key: "gt10",   label: "> 10 uur/week", sub: "Een dagtaak per week" },
    ];
    const computedHours = answers.uren ? annualHours[answers.uren as UrenKey] : 0;

    return (
      <div key="step-4" className="quiz-step">
        <BackButton />
        <ProgressBar current={4} />
        <p style={stepCounterStyle}>Stap 4 van 5</p>
        <h3 style={questionStyle}>Hoeveel uur per week gaat hier aan verloren?</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {urenOpties.map((u) => {
            const selected = answers.uren === u.key;
            return (
              <button
                key={u.key}
                className={`quiz-card${selected ? " selected" : ""}`}
                style={{ ...cardButtonStyle, padding: "20px 16px" }}
                disabled={showInsight && !selected}
                onClick={() => { setAnswers((a) => ({ ...a, uren: u.key })); setShowInsight(true); }}
              >
                <div style={{
                  width: "44px", height: "44px", borderRadius: "10px",
                  backgroundColor: selected ? "#C5D7F0" : "#E6EDF7",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "10px", flexShrink: 0,
                  transition: "background-color 0.2s ease",
                }}>
                  <Clock size={22} color={selected ? "#1E3A5F" : "#4A7FC4"} />
                </div>
                <span style={{ color: "#1E3A5F", fontSize: "15px", fontWeight: 600, lineHeight: 1.2, display: "block" }}>
                  {u.label}
                </span>
                <span style={{ color: "#5F5E5A", fontSize: "12px", marginTop: "4px", display: "block" }}>
                  {u.sub}
                </span>
              </button>
            );
          })}
        </div>

        {showInsight && (
          <div className="quiz-insight-box" style={{
            marginTop: "24px",
            backgroundColor: "#FBF5EA",
            border: "1px solid #E8DBC0",
            borderRadius: "14px",
            padding: "22px 24px",
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#F0E8D8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Zap size={18} color="#C89656" />
              </div>
              <div>
                <p style={{ color: "#1E3A5F", fontSize: "16px", fontWeight: 500, margin: "0 0 8px", lineHeight: 1.5 }}>
                  Dat zijn op jaarbasis zo&apos;n{" "}
                  <strong style={{ color: "#C89656" }}>{computedHours} uur</strong>{" "}
                  aan herhaalwerk.
                </p>
                <p style={{ color: "#5F5E5A", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
                  Bij klanten zoals jij lopen die taken gemiddeld voor{" "}
                  <strong style={{ color: "#1E3A5F" }}>80%</strong> automatisch na de eerste 4 weken.
                </p>
              </div>
            </div>
          </div>
        )}

        {showInsight && (
          <div className="quiz-insight-cta">
            <button
              onClick={() => setStep(5)}
              className="quiz-cta-btn"
              style={{
                marginTop: "20px",
                backgroundColor: "#1E3A5F",
                color: "#F5F1E8",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: 500,
                padding: "12px 28px",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "inherit",
              }}
            >
              Volgende
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    );
  };

  // ── Step 5: Lead capture ─────────────────────────────────────────────────────
  const renderStep5 = () => {
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await fetch("/api/quiz-submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...answers, ...formData }),
        });
      } catch {
        // Stille fout: quiz gaat gewoon door ook als mail mislukt
      }
      setStep(6);
    };

    return (
      <div key="step-5" className="quiz-step" style={{ maxWidth: "480px", margin: "0 auto" }}>
        <BackButton />
        <ProgressBar current={5} />
        <p style={stepCounterStyle}>Stap 5 van 5</p>
        <h3 style={questionStyle}>Bijna klaar: waar stuur ik jouw persoonlijk overzicht naartoe?</h3>
        <p style={{ color: "#5F5E5A", fontSize: "15px", lineHeight: 1.7, marginBottom: "28px" }}>
          Ik maak op basis van jouw antwoorden een korte analyse. Geen spam, beloofd.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label htmlFor="quiz-naam" style={labelStyle}>Naam</label>
            <input id="quiz-naam" type="text" required placeholder="Jan de Vries"
              value={formData.naam} onChange={(e) => setFormData((f) => ({ ...f, naam: e.target.value }))}
              style={inputStyle} className="quiz-input" />
          </div>
          <div>
            <label htmlFor="quiz-email" style={labelStyle}>E-mailadres</label>
            <input id="quiz-email" type="email" required placeholder="jan@jouwbedrijf.nl"
              value={formData.email} onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
              style={inputStyle} className="quiz-input" />
          </div>
          <div>
            <label htmlFor="quiz-bedrijf" style={labelStyle}>
              Bedrijfsnaam{" "}
              <span style={{ color: "#5F5E5A", fontSize: "12px", fontWeight: 400 }}>(optioneel)</span>
            </label>
            <input id="quiz-bedrijf" type="text" placeholder="Jouw Bedrijf BV"
              value={formData.bedrijf} onChange={(e) => setFormData((f) => ({ ...f, bedrijf: e.target.value }))}
              style={inputStyle} className="quiz-input" />
          </div>
          <button type="submit" className="quiz-submit-btn" style={{
            backgroundColor: "#1E3A5F", color: "#F5F1E8", borderRadius: "10px",
            fontSize: "15px", fontWeight: 500, padding: "14px 24px",
            border: "none", cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", gap: "8px", fontFamily: "inherit",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}>
            Stuur mij het overzicht
            <ArrowRight size={16} />
          </button>
        </form>

        <p style={{ color: "#5F5E5A", fontSize: "12px", marginTop: "16px", textAlign: "center" }}>
          🔒 Ik deel je gegevens nooit met derden.
        </p>
      </div>
    );
  };

  // ── Step 6: Result ───────────────────────────────────────────────────────────
  const renderStep6 = () => {
    const savedHours  = answers.uren     ? annualHours[answers.uren as UrenKey]     : 165;
    const serviceName = answers.pijnpunt ? serviceLabel[answers.pijnpunt as PijnKey] : "Automatisering";

    return (
      <div key="step-6" className="quiz-step" style={{ maxWidth: "560px", margin: "0 auto" }}>
        <p style={{ color: "#4A7FC4", fontSize: "13px", fontWeight: 500, letterSpacing: "0.08em",
            textTransform: "uppercase", marginBottom: "12px", textAlign: "center" }}>
          Jouw resultaat
        </p>
        <h3 style={{ color: "#1E3A5F", fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 500,
            letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "24px", textAlign: "center" }}>
          Op basis van jouw antwoorden...
        </h3>

        <div style={{ backgroundColor: "#ffffff", border: "2px solid #4A7FC4", borderRadius: "16px",
            padding: "28px 32px", marginBottom: "24px", boxShadow: "0 20px 40px rgba(30,58,95,0.10)" }}>
          {/* Pain point */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "20px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#E6EDF7",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Zap size={20} color="#4A7FC4" />
            </div>
            <div>
              <p style={{ color: "#5F5E5A", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em",
                  textTransform: "uppercase", marginBottom: "4px" }}>Grootste tijdverspilling</p>
              <p style={{ color: "#1E3A5F", fontSize: "17px", fontWeight: 600, lineHeight: 1.3, margin: 0 }}>
                {serviceName} is jouw grootste tijdverspilling
              </p>
            </div>
          </div>

          {/* Hours — loss framing */}
          <div style={{ backgroundColor: "#FBF5EA", border: "1px solid #E8DBC0", borderRadius: "10px",
              padding: "14px 18px", marginBottom: "20px" }}>
            <p style={{ color: "#8A6A2E", fontSize: "14px", fontWeight: 500, margin: 0, lineHeight: 1.5 }}>
              ⚡ Je verliest momenteel{" "}
              <strong style={{ color: "#C89656" }}>{savedHours} uur per jaar</strong>{" "}
              aan handmatig herhaalwerk.
            </p>
          </div>

          {/* Recommended step */}
          <div style={{ borderTop: "1px solid #E8E4DB", paddingTop: "16px" }}>
            <p style={{ color: "#5F5E5A", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em",
                textTransform: "uppercase", marginBottom: "6px" }}>Aanbevolen eerste stap</p>
            <p style={{ color: "#1E3A5F", fontSize: "15px", fontWeight: 500, lineHeight: 1.5, margin: 0 }}>
              We starten met een gratis kennismakingsgesprek van 30 min, specifiek gericht op{" "}
              {serviceName.toLowerCase()}.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
          <a
            href={`https://wa.me/31612382576?text=${encodeURIComponent(`Hoi Bjorn, ik heb de quiz ingevuld op mosselai.nl. Mijn grootste tijdverspilling is ${serviceName.toLowerCase()} en ik wil graag een gratis kennismakingsgesprek inplannen.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="quiz-cta-btn"
            style={{
              backgroundColor: "#1E3A5F", color: "#F5F1E8", borderRadius: "10px",
              fontSize: "16px", fontWeight: 500, padding: "14px 32px",
              display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            Plan het gesprek
            <ArrowRight size={18} />
          </a>
          <a href="#hoe-het-werkt" style={{
            color: "#5F5E5A", fontSize: "14px", display: "inline-flex",
            alignItems: "center", gap: "6px", textDecoration: "none", opacity: 0.8,
          }}>
            Bekijk hoe het werkt
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    );
  };

  // ─── Render ──────────────────────────────────────────────────────────────────

  const renderStep = () => {
    switch (step) {
      case 0:  return renderStep0();
      case 1:  return renderStep1();
      case 2:  return renderStep2();
      case 3:  return renderStep3();
      case 4:  return renderStep4();
      case 5:  return renderStep5();
      case 6:  return renderStep6();
      default: return renderStep0();
    }
  };

  return (
    <section
      id="wat-we-doen"
      ref={sectionRef}
      style={{ backgroundColor: "#F8F7F3", padding: "96px 0" }}
    >
      <style>{`
        @keyframes quizSlideIn {
          from { opacity: 0; transform: translateX(28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes quizFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes quizRevealBtn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .quiz-step { animation: quizSlideIn 0.35s ease forwards; }
        .quiz-card {
          background-color: #ffffff;
          border: 1px solid #E8E4DB;
          border-radius: 14px;
          padding: 20px 18px;
          cursor: pointer;
          font-family: inherit;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          min-height: 110px;
          width: 100%;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.2s ease, background-color 0.2s ease;
        }
        .quiz-card:hover   { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(30,58,95,.10); border-color: #4A7FC4; }
        .quiz-card.selected{ border-color: #4A7FC4; background-color: #E6EDF7; }
        .quiz-card:disabled{ opacity: 0.45; pointer-events: none; }
        .quiz-insight-box  { animation: quizFadeUp 0.4s ease forwards; }
        .quiz-insight-cta  {
          animation: quizRevealBtn 0.3s ease forwards;
          animation-delay: 0.4s;
          animation-fill-mode: forwards;
          opacity: 0;
        }
        .quiz-input:focus {
          border-color: #4A7FC4 !important;
          box-shadow: 0 0 0 3px rgba(74,127,196,0.18) !important;
          background-color: #ffffff !important;
          outline: none;
        }
        .quiz-submit-btn { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .quiz-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 24px rgba(30,58,95,.18); }
        .quiz-cta-btn    { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .quiz-cta-btn:hover    { transform: translateY(-2px); box-shadow: 0 12px 24px rgba(30,58,95,.18); }
        .quiz-back-btn:hover   { opacity: 0.6; }
        @media (max-width: 520px) {
          .quiz-card { padding: 16px 14px; min-height: 90px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .quiz-step, .quiz-insight-box { animation: none; }
          .quiz-insight-cta { animation: none; opacity: 1; }
          .quiz-card:hover, .quiz-submit-btn:hover, .quiz-cta-btn:hover { transform: none; box-shadow: none; }
        }
      `}</style>

      <div className="max-w-2xl mx-auto px-6">
        {renderStep()}
      </div>
    </section>
  );
}
