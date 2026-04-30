import { getSupabaseAdmin } from "@/lib/supabase";
import QuizTable from "./QuizTable";

export const dynamic = "force-dynamic";

function countBy(rows: Record<string, unknown>[], key: string): Record<string, number> {
  return rows.reduce<Record<string, number>>((acc, r) => {
    const v = String(r[key] ?? "onbekend");
    acc[v] = (acc[v] ?? 0) + 1;
    return acc;
  }, {});
}

export default async function AdminQuizPage() {
  const { data: responses, error } = await getSupabaseAdmin()
    .from("quiz_responses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#F5F1E8", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#DC2626" }}>Database fout: {error.message}</p>
      </div>
    );
  }

  const rows = responses ?? [];
  const sectorCounts  = countBy(rows, "sector");
  const pijnCounts    = countBy(rows, "pijnpunt");
  const urenCounts    = countBy(rows, "uren");

  const top = (counts: Record<string, number>) =>
    Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "–";

  return (
    <QuizTable
      rows={rows}
      total={rows.length}
      sectorCounts={sectorCounts}
      pijnCounts={pijnCounts}
      urenCounts={urenCounts}
      topSector={top(sectorCounts)}
      topPijn={top(pijnCounts)}
      topUren={top(urenCounts)}
    />
  );
}
