"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, LogOut, BarChart2, List } from "lucide-react";

type Row = Record<string, unknown>;

interface Props {
  rows: Row[];
  total: number;
  sectorCounts:  Record<string, number>;
  pijnCounts:    Record<string, number>;
  urenCounts:    Record<string, number>;
  topSector: string;
  topPijn:   string;
  topUren:   string;
}

const sectorLabel: Record<string, string> = {
  groothandel:    "Groothandel / distributie",
  productie:      "Productie / maakbedrijf",
  handel:         "Handel / webshop",
  installateur:   "Installateur / aannemer",
  dienstverlener: "Dienstverlener / overig",
};

const pijnLabel: Record<string, string> = {
  orders:      "Orders & bestellingen",
  facturen:    "Facturen & administratie",
  emails:      "E-mails afhandelen",
  rapportages: "Rapportages",
  offertes:    "Offertes schrijven",
};

const urenLabel: Record<string, string> = {
  lt2:    "< 2 uur/week",
  "2to5": "2–5 uur/week",
  "5to10":"5–10 uur/week",
  gt10:   "> 10 uur/week",
};

// Jaarlijkse uren per categorie (midpoint * 52)
const urenJaar: Record<string, number> = {
  lt2:    52,
  "2to5": 182,
  "5to10":390,
  gt10:   624,
};

function fmt(val: unknown): string {
  if (val === null || val === undefined) return "–";
  if (Array.isArray(val)) return val.join(", ") || "–";
  if (typeof val === "boolean") return val ? "Ja" : "Nee";
  return String(val);
}

function fmtDate(iso: unknown): string {
  if (!iso) return "–";
  const d = new Date(String(iso));
  return d.toLocaleString("nl-NL", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" });
}

// Horizontale bar chart row
function BarRow({ label, count, total, color = "#4A7FC4" }: { label: string; count: number; total: number; color?: string }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
        <span style={{ color: "#2C2C2E", fontSize: "13px" }}>{label}</span>
        <span style={{ color: "#5F5E5A", fontSize: "12px", fontWeight: 600 }}>{count} <span style={{ fontWeight: 400, color: "#9CA3AF" }}>({pct}%)</span></span>
      </div>
      <div style={{ height: "8px", backgroundColor: "#E8E4DB", borderRadius: "99px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, backgroundColor: color, borderRadius: "99px", transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}

// Stat card
function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div style={{ backgroundColor: "#ffffff", border: "1px solid #E8E4DB", borderRadius: "12px", padding: "18px 20px", flex: "1 1 180px", minWidth: 0 }}>
      <p style={{ color: "#5F5E5A", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>{label}</p>
      <p style={{ color: "#1E3A5F", fontSize: "26px", fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 0", lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ color: "#9CA3AF", fontSize: "12px", margin: "4px 0 0" }}>{sub}</p>}
    </div>
  );
}

// Distribution block
function DistBlock({ title, counts, labels, total, color }: { title: string; counts: Record<string, number>; labels: Record<string, string>; total: number; color?: string }) {
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return (
    <div style={{ backgroundColor: "#ffffff", border: "1px solid #E8E4DB", borderRadius: "12px", padding: "20px 24px" }}>
      <p style={{ color: "#1E3A5F", fontSize: "14px", fontWeight: 600, margin: "0 0 16px", letterSpacing: "-0.01em" }}>{title}</p>
      {sorted.length === 0
        ? <p style={{ color: "#9CA3AF", fontSize: "13px" }}>Geen data</p>
        : sorted.map(([key, count]) => (
          <BarRow key={key} label={labels[key] ?? key} count={count} total={total} color={color} />
        ))
      }
    </div>
  );
}

export default function QuizTable({ rows, total, sectorCounts, pijnCounts, urenCounts, topSector, topPijn, topUren }: Props) {
  const [view, setView] = useState<"overzicht" | "leads">("overzicht");
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/admin-logout", { method: "POST" });
    router.push("/admin/login");
  };

  const exportCsv = () => {
    if (!rows.length) return;
    const allKeys = Object.keys(rows[0]).filter((k) => k !== "ip_hash");
    const escape = (v: unknown) => `"${fmt(v).replace(/"/g, '""')}"`;
    const csv = [
      allKeys.join(","),
      ...rows.map((r) => allKeys.map((k) => escape(r[k])).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `quiz-responses-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Bereken gemiddeld jaarlijks tijdsverlies
  const totalJaarUren = rows.reduce((sum, r) => sum + (urenJaar[String(r.uren ?? "")] ?? 0), 0);
  const gemJaarUren   = total > 0 ? Math.round(totalJaarUren / total) : 0;

  const tabStyle = (active: boolean) => ({
    display: "inline-flex" as const,
    alignItems: "center" as const,
    gap: "6px",
    padding: "12px 20px",
    fontSize: "13px",
    fontWeight: 500,
    color: active ? "#1E3A5F" : "#5F5E5A",
    textDecoration: "none" as const,
    borderBottom: active ? "2px solid #4A7FC4" : "2px solid transparent",
    cursor: "pointer" as const,
    background: "none",
    fontFamily: "inherit",
  } as React.CSSProperties);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F5F1E8", fontFamily: "inherit" }}>

      {/* Top bar */}
      <div style={{ backgroundColor: "#1E3A5F", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <span style={{ color: "#C5D7F0", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>MosselAI Admin</span>
          <h1 style={{ color: "#F5F1E8", fontSize: "20px", fontWeight: 500, margin: "4px 0 0", letterSpacing: "-0.02em" }}>Quiz — Leads</h1>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={exportCsv} style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#2D5FA0", color: "#F5F1E8", border: "none", borderRadius: "8px", padding: "8px 16px", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
            <Download size={14} /> CSV export
          </button>
          <button onClick={handleLogout} disabled={loggingOut} style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "rgba(255,255,255,0.12)", color: "#F5F1E8", border: "none", borderRadius: "8px", padding: "8px 16px", fontSize: "13px", cursor: "pointer", fontFamily: "inherit" }}>
            <LogOut size={14} /> Uitloggen
          </button>
        </div>
      </div>

      {/* Navigatie tabs (pagina) */}
      <div style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #E8E4DB", padding: "0 24px", display: "flex" }}>
        <a href="/admin/onderzoek" style={{ display: "inline-block", padding: "12px 20px", fontSize: "13px", fontWeight: 500, color: "#5F5E5A", textDecoration: "none", borderBottom: "2px solid transparent" }}>
          Onderzoek 2026
        </a>
        <a href="/admin/quiz" style={{ display: "inline-block", padding: "12px 20px", fontSize: "13px", fontWeight: 500, color: "#1E3A5F", textDecoration: "none", borderBottom: "2px solid #4A7FC4" }}>
          Quiz leads
        </a>
      </div>

      {/* View tabs */}
      <div style={{ backgroundColor: "#F8F7F3", borderBottom: "1px solid #E8E4DB", padding: "0 24px", display: "flex" }}>
        <button onClick={() => setView("overzicht")} style={tabStyle(view === "overzicht")}>
          <BarChart2 size={13} /> Overzicht
        </button>
        <button onClick={() => setView("leads")} style={tabStyle(view === "leads")}>
          <List size={13} /> Leads ({total})
        </button>
      </div>

      {total === 0 ? (
        <p style={{ color: "#5F5E5A", textAlign: "center", padding: "64px 0" }}>Nog geen quiz-inzendingen.</p>
      ) : view === "overzicht" ? (

        /* ── OVERZICHT ─────────────────────────────────────────── */
        <div style={{ padding: "28px 24px", maxWidth: "960px" }}>

          {/* Stat cards */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "28px" }}>
            <StatCard label="Totaal leads" value={total} />
            <StatCard
              label="Gem. tijdsverlies/jaar"
              value={`${gemJaarUren} uur`}
              sub="gebaseerd op opgegeven uren/week"
            />
            <StatCard
              label="Meest voorkomend pijnpunt"
              value={pijnLabel[topPijn] ?? topPijn}
            />
            <StatCard
              label="Grootste sector"
              value={sectorLabel[topSector] ?? topSector}
            />
          </div>

          {/* Distributie blokken */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            <DistBlock
              title="Pijnpunten"
              counts={pijnCounts}
              labels={pijnLabel}
              total={total}
              color="#4A7FC4"
            />
            <DistBlock
              title="Sectoren"
              counts={sectorCounts}
              labels={sectorLabel}
              total={total}
              color="#1E3A5F"
            />
            <DistBlock
              title="Tijdsverlies per week"
              counts={urenCounts}
              labels={urenLabel}
              total={total}
              color="#2D5FA0"
            />
          </div>
        </div>

      ) : (

        /* ── LEADS TABEL ───────────────────────────────────────── */
        <div style={{ padding: "24px", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ backgroundColor: "#F8F7F3", borderBottom: "2px solid #E8E4DB" }}>
                {["Datum", "Naam", "E-mail", "Bedrijf", "Sector", "Pijnpunt", "Tijdsverlies"].map((h) => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", color: "#5F5E5A", fontWeight: 600, fontSize: "11px", letterSpacing: "0.04em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={String(r.id)} style={{ borderBottom: "1px solid #E8E4DB" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F8F7F3")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <td style={{ padding: "10px 12px", color: "#5F5E5A", whiteSpace: "nowrap" }}>{fmtDate(r.created_at)}</td>
                  <td style={{ padding: "10px 12px", color: "#2C2C2E", fontWeight: 500 }}>{fmt(r.naam)}</td>
                  <td style={{ padding: "10px 12px" }}>
                    {r.email ? <a href={`mailto:${r.email}`} style={{ color: "#4A7FC4", textDecoration: "none" }}>{String(r.email)}</a> : "–"}
                  </td>
                  <td style={{ padding: "10px 12px", color: "#2C2C2E" }}>{fmt(r.bedrijf)}</td>
                  <td style={{ padding: "10px 12px", color: "#2C2C2E" }}>{sectorLabel[String(r.sector)] ?? fmt(r.sector)}</td>
                  <td style={{ padding: "10px 12px", color: "#2C2C2E" }}>{pijnLabel[String(r.pijnpunt)] ?? fmt(r.pijnpunt)}</td>
                  <td style={{ padding: "10px 12px", color: "#2C2C2E" }}>{urenLabel[String(r.uren)] ?? fmt(r.uren)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
