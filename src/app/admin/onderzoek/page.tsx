import { getSupabaseAdmin } from "@/lib/supabase";
import AdminTable from "./AdminTable";

export const dynamic = "force-dynamic";

export default async function AdminOnderzoekPage() {
  const { data: responses, error } = await getSupabaseAdmin()
    .from("onderzoek_responses")
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
  const total = rows.length;
  const padA = rows.filter((r) => r.pad === "A").length;
  const padB = rows.filter((r) => r.pad === "B").length;
  const quickscan = rows.filter((r) => r.wil_quickscan).length;

  return <AdminTable rows={rows} total={total} padA={padA} padB={padB} quickscan={quickscan} />;
}
