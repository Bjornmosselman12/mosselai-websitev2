import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase";

const ALLOWED_TABLES = ["quiz_responses", "onderzoek_responses"];

export async function DELETE(req: Request) {
  // Auth check
  const cookieStore = await cookies();
  if (cookieStore.get("mossel_admin")?.value !== "1") {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const { table, id } = body as { table?: string; id?: unknown };

  if (!table || !ALLOWED_TABLES.includes(table) || !id) {
    return NextResponse.json({ ok: false, error: "Ongeldige invoer" }, { status: 400 });
  }

  const { error } = await getSupabaseAdmin()
    .from(table)
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
