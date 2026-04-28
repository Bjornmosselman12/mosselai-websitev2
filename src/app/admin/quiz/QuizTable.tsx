"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, LogOut } from "lucide-react";

type Row = Record<string, unknown>;

interface Props {
  rows: Row[];
  total: number;
  topSector: string;
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

export default function QuizTable({ rows, total, topSector }: Props) {
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

      {/* Nav tabs */}
      <div style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #E8E4DB", padding: "0 24px", display: "flex", gap: "0" }}>
        <a href="/admin/onderzoek" style={{ display: "inline-block", padding: "12px 20px", fontSize: "13px", fontWeight: 500, color: "#5F5E5A", textDecoration: "none", borderBottom: "2px solid transparent" }}>
          Onderzoek 2026
        </a>
        <a href="/admin/quiz" style={{ display: "inline-block", padding: "12px 20px", fontSize: "13px", fontWeight: 500, color: "#1E3A5F", textDecoration: "none", borderBottom: "2px solid #4A7FC4" }}>
          Quiz leads
        </a>
      </div>

      {/* Stats */}
      <div style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #E8E4DB", padding: "14px 24px", display: "flex", flexWrap: "wrap", gap: "24px" }}>
        {[["Totaal leads", total], ["Meest voorkomende sector", sectorLabel[topSector] ?? topSector]].map(([label, val]) => (
          <div key={String(label)}>
            <span style={{ color: "#5F5E5A", fontSize: "12px" }}>{label}</span>
            <span style={{ color: "#1E3A5F", fontSize: "20px", fontWeight: 600, display: "block", letterSpacing: "-0.02em" }}>{val}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ padding: "24px", overflowX: "auto" }}>
        {rows.length === 0 ? (
          <p style={{ color: "#5F5E5A", textAlign: "center", padding: "48px 0" }}>Nog geen quiz-inzendingen.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ backgroundColor: "#F8F7F3", borderBottom: "2px solid #E8E4DB" }}>
                {["Datum", "Naam", "E-mail", "Bedrijf", "Sector", "Pijnpunt", "Tijdsverlies"].map((h) => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", color: "#5F5E5A", fontWeight: 600, fontSize: "11px", letterSpacing: "0.04em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const id = String(r.id);
                return (
                  <tr key={id} style={{ borderBottom: "1px solid #E8E4DB" }}>
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
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
