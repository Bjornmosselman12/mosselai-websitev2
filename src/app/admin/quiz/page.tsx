import { getSupabaseAdmin } from "@/lib/supabase";
import QuizTable from "./QuizTable";

export const dynamic = "force-dynamic";

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
  const sectorCounts = rows.reduce<Record<string, number>>((acc, r) => {
    const s = String(r.sector ?? "onbekend");
    acc[s] = (acc[s] ?? 0) + 1;
    return acc;
  }, {});
  const topSector = Object.entries(sectorCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "–";

  return <QuizTable rows={rows} total={rows.length} topSector={topSector} />;
}
