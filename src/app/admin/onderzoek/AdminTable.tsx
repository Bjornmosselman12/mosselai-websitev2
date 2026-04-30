"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Download, LogOut, Trash2 } from "lucide-react";

type Row = Record<string, unknown>;

interface Props {
  rows: Row[];
  total: number;
  padA: number;
  padB: number;
  quickscan: number;
}

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

const DETAIL_FIELDS = [
  ["fte", "FTE"], ["omzet", "Omzet"], ["systemen", "Systemen"],
  ["systeem_anders", "Systeem anders"], ["tijdvreters", "Tijdvreters"],
  ["tijdvreters_anders", "Tijdvreters anders"], ["ai_gebruik", "AI-gebruik"],
  ["blokkade", "Blokkade"], ["blokkade_anders", "Blokkade anders"],
  ["verloren_uren", "Verloren uren"], ["ai_frequentie", "AI-frequentie"],
  ["automatisering_wens", "Automatisering wens"], ["telefoon", "Telefoon"],
  ["newsletter_consent", "Newsletter"], ["user_agent", "User agent"],
];

export default function AdminTable({ rows: initialRows, total: initialTotal, padA: initialPadA, padB: initialPadB, quickscan: initialQuickscan }: Props) {
  const [rows, setRows]           = useState<Row[]>(initialRows);
  const [expanded, setExpanded]   = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [deleting, setDeleting]   = useState<string | null>(null);
  const router = useRouter();

  const total    = rows.length;
  const padA     = rows.filter((r) => r.pad === "A").length;
  const padB     = rows.filter((r) => r.pad === "B").length;
  const quickscan = rows.filter((r) => r.wil_quickscan).length;

  const handleDelete = async (id: unknown) => {
    if (!window.confirm("Weet je zeker dat je deze inzending wilt verwijderen?")) return;
    setDeleting(String(id));
    try {
      const res = await fetch("/api/admin-delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table: "onderzoek_responses", id }),
      });
      if (res.ok) {
        setRows((prev) => prev.filter((r) => r.id !== id));
        setExpanded(null);
      } else {
        alert("Verwijderen mislukt.");
      }
    } finally {
      setDeleting(null);
    }
  };

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
    a.download = `onderzoek-responses-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F5F1E8", fontFamily: "inherit" }}>
      {/* Top bar */}
      <div style={{ backgroundColor: "#1E3A5F", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <span style={{ color: "#C5D7F0", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>MosselAI Admin</span>
          <h1 style={{ color: "#F5F1E8", fontSize: "20px", fontWeight: 500, margin: "4px 0 0", letterSpacing: "-0.02em" }}>Onderzoek 2026 — Responses</h1>
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
        <a href="/admin/onderzoek" style={{ display: "inline-block", padding: "12px 20px", fontSize: "13px", fontWeight: 500, color: "#1E3A5F", textDecoration: "none", borderBottom: "2px solid #4A7FC4" }}>
          Onderzoek 2026
        </a>
        <a href="/admin/quiz" style={{ display: "inline-block", padding: "12px 20px", fontSize: "13px", fontWeight: 500, color: "#5F5E5A", textDecoration: "none", borderBottom: "2px solid transparent" }}>
          Quiz leads
        </a>
      </div>

      {/* Stats */}
      <div style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #E8E4DB", padding: "14px 24px", display: "flex", flexWrap: "wrap", gap: "24px" }}>
        {[["Totaal", total], ["Pad A (ondernemer)", padA], ["Pad B (overig)", padB], ["Quick-scan gevraagd", quickscan]].map(([label, val]) => (
          <div key={String(label)}>
            <span style={{ color: "#5F5E5A", fontSize: "12px" }}>{label}</span>
            <span style={{ color: "#1E3A5F", fontSize: "20px", fontWeight: 600, display: "block", letterSpacing: "-0.02em" }}>{val}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ padding: "24px", overflowX: "auto" }}>
        {rows.length === 0 ? (
          <p style={{ color: "#5F5E5A", textAlign: "center", padding: "48px 0" }}>Nog geen responses.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ backgroundColor: "#F8F7F3", borderBottom: "2px solid #E8E4DB" }}>
                {["Datum", "Pad", "Rol", "Sector", "Naam", "E-mail", "Bedrijf", "Quick-scan", "", ""].map((h) => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", color: "#5F5E5A", fontWeight: 600, fontSize: "11px", letterSpacing: "0.04em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const id = String(r.id);
                const isOpen = expanded === id;
                return [
                  <tr key={id} style={{ borderBottom: "1px solid #E8E4DB", backgroundColor: isOpen ? "#E6EDF7" : "transparent" }}>
                    <td style={{ padding: "10px 12px", color: "#5F5E5A", whiteSpace: "nowrap" }}>{fmtDate(r.created_at)}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <span style={{ display: "inline-block", backgroundColor: r.pad === "A" ? "#1E3A5F" : "#E6EDF7", color: r.pad === "A" ? "#F5F1E8" : "#1E3A5F", borderRadius: "4px", padding: "2px 8px", fontSize: "11px", fontWeight: 600 }}>
                        Pad {fmt(r.pad)}
                      </span>
                    </td>
                    <td style={{ padding: "10px 12px", color: "#2C2C2E" }}>{fmt(r.rol)}</td>
                    <td style={{ padding: "10px 12px", color: "#2C2C2E" }}>{fmt(r.sector)}</td>
                    <td style={{ padding: "10px 12px", color: "#2C2C2E", fontWeight: 500 }}>{fmt(r.voornaam)}</td>
                    <td style={{ padding: "10px 12px" }}>
                      {r.email ? <a href={`mailto:${r.email}`} style={{ color: "#4A7FC4", textDecoration: "none" }}>{String(r.email)}</a> : "–"}
                    </td>
                    <td style={{ padding: "10px 12px", color: "#2C2C2E" }}>{fmt(r.bedrijfsnaam)}</td>
                    <td style={{ padding: "10px 12px" }}>
                      {r.wil_quickscan ? (
                        <span style={{ display: "inline-block", backgroundColor: "#FEF3C7", color: "#92400E", border: "1px solid #F59E0B", borderRadius: "4px", padding: "2px 8px", fontSize: "11px", fontWeight: 600 }}>⚡ Ja</span>
                      ) : (
                        <span style={{ color: "#5F5E5A", fontSize: "12px" }}>Nee</span>
                      )}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <button onClick={() => setExpanded(isOpen ? null : id)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#4A7FC4", display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontFamily: "inherit", padding: 0 }}>
                        {isOpen ? <><ChevronUp size={14} /> Sluiten</> : <><ChevronDown size={14} /> Details</>}
                      </button>
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <button
                        onClick={() => handleDelete(r.id)}
                        disabled={deleting === id}
                        title="Verwijderen"
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#DC2626", opacity: deleting === id ? 0.4 : 0.5, padding: "4px", borderRadius: "4px", display: "flex", alignItems: "center" }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = deleting === id ? "0.4" : "0.5")}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>,
                  isOpen && (
                    <tr key={`${id}-detail`} style={{ backgroundColor: "#F0F5FC", borderBottom: "2px solid #C5D7F0" }}>
                      <td colSpan={9} style={{ padding: "16px 20px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "10px 24px" }}>
                          {DETAIL_FIELDS.filter(([k]) => fmt(r[k]) !== "–").map(([k, label]) => (
                            <div key={k}>
                              <span style={{ color: "#5F5E5A", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</span>
                              <p style={{ color: "#1E3A5F", fontSize: "13px", margin: "2px 0 0", lineHeight: 1.5, wordBreak: "break-word" }}>{fmt(r[k])}</p>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ),
                ];
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
