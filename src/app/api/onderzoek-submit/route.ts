import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";

function hashIp(raw: string | null): string {
  if (!raw) return "";
  const ip = raw.split(",")[0].trim();
  return createHash("sha256").update(ip).digest("hex");
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:9px 0;border-bottom:1px solid #F0EDE8;vertical-align:top;width:38%;">
        <p style="margin:0;color:#5F5E5A;font-size:13px;">${label}</p>
      </td>
      <td style="padding:9px 0 9px 16px;border-bottom:1px solid #F0EDE8;vertical-align:top;">
        <p style="margin:0;color:#1E3A5F;font-size:13px;font-weight:500;">${value || "–"}</p>
      </td>
    </tr>`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      pad, rol, sector, fte, omzet,
      systemen, systeem_anders, tijdvreters, tijdvreters_anders,
      ai_gebruik, blokkade, blokkade_anders, verloren_uren,
      ai_frequentie, automatisering_wens,
      voornaam, email, bedrijfsnaam,
      wil_quickscan, telefoon, newsletter_consent, wil_rapport,
    } = body;

    // Basic validation
    if (!pad || !rol) {
      return NextResponse.json({ ok: false, error: "Ontbrekende verplichte velden" }, { status: 400 });
    }
    if (pad === "A" && (!voornaam || !email)) {
      return NextResponse.json({ ok: false, error: "Ontbrekende verplichte velden" }, { status: 400 });
    }

    const ip_hash = hashIp(req.headers.get("x-forwarded-for"));
    const user_agent = req.headers.get("user-agent") ?? "";

    // Save to Supabase
    const { error: dbErr } = await getSupabaseAdmin()
      .from("onderzoek_responses")
      .insert({
        pad, rol, sector, fte, omzet,
        systemen: systemen ?? [],
        systeem_anders: systeem_anders ?? "",
        tijdvreters: tijdvreters ?? [],
        tijdvreters_anders: tijdvreters_anders ?? "",
        ai_gebruik, blokkade, blokkade_anders: blokkade_anders ?? "",
        verloren_uren, ai_frequentie,
        automatisering_wens: automatisering_wens ?? "",
        voornaam: voornaam ?? "", email: email ?? "",
        bedrijfsnaam: bedrijfsnaam ?? "",
        wil_quickscan: !!wil_quickscan,
        telefoon: telefoon ?? "",
        newsletter_consent: !!newsletter_consent,
        ip_hash, user_agent,
      });

    if (dbErr) {
      console.error("Supabase insert error:", dbErr);
      return NextResponse.json({ ok: false, error: "Database fout" }, { status: 500 });
    }

    // Email notification
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const subject = `Nieuwe enquête-respons (Pad ${pad}): ${voornaam || "Anoniem"}${bedrijfsnaam ? " — " + bedrijfsnaam : ""}`;

      const quickscanAlert = (pad === "A" && wil_quickscan) ? `
        <tr>
          <td style="padding:0 36px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#FEF3C7;border:2px solid #F59E0B;border-radius:10px;">
              <tr><td style="padding:16px 20px;">
                <p style="margin:0;color:#92400E;font-size:15px;font-weight:700;">⚡ QUICK-SCAN GEVRAAGD — ACTIE BINNEN 48u</p>
                ${telefoon ? `<p style="margin:8px 0 0;color:#92400E;font-size:14px;">📱 ${telefoon}</p>` : ""}
              </td></tr>
            </table>
          </td>
        </tr>` : "";

      const html = `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#F5F1E8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F1E8;padding:40px 20px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(30,58,95,0.10);">
  <tr><td style="background:#1E3A5F;padding:28px 36px;">
    <p style="margin:0;color:#C5D7F0;font-size:12px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;">MosselAI · Onderzoek 2026</p>
    <h1 style="margin:8px 0 0;color:#F5F1E8;font-size:22px;font-weight:500;letter-spacing:-0.02em;">Nieuwe enquête-respons — Pad ${pad}</h1>
  </td></tr>
  ${quickscanAlert}
  <tr><td style="padding:28px 36px 0;">
    <p style="margin:0 0 4px;color:#5F5E5A;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;">Contact</p>
    <p style="margin:0;color:#1E3A5F;font-size:18px;font-weight:600;">${voornaam || "Anoniem"}</p>
    ${email ? `<p style="margin:4px 0 0;"><a href="mailto:${email}" style="color:#4A7FC4;font-size:15px;text-decoration:none;">${email}</a></p>` : ""}
    ${bedrijfsnaam ? `<p style="margin:4px 0 0;color:#5F5E5A;font-size:14px;">${bedrijfsnaam}</p>` : ""}
    ${telefoon ? `<p style="margin:4px 0 0;color:#5F5E5A;font-size:14px;">📱 ${telefoon}</p>` : ""}
  </td></tr>
  <tr><td style="padding:20px 36px 0;"><hr style="border:none;border-top:1px solid #E8E4DB;margin:0;"/></td></tr>
  <tr><td style="padding:24px 36px 0;">
    <p style="margin:0 0 16px;color:#5F5E5A;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;">Antwoorden</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${row("Rol", rol)}
      ${row("Sector", sector)}
      ${pad === "A" ? row("FTE", fte) : ""}
      ${pad === "A" ? row("Omzet", omzet) : ""}
      ${pad === "A" ? row("Systemen", (systemen ?? []).join(", ") + (systeem_anders ? ` (${systeem_anders})` : "")) : ""}
      ${pad === "A" ? row("Tijdvreters", (tijdvreters ?? []).join(", ") + (tijdvreters_anders ? ` (${tijdvreters_anders})` : "")) : ""}
      ${pad === "A" ? row("AI-gebruik", ai_gebruik) : ""}
      ${pad === "A" ? row("Blokkade", blokkade + (blokkade_anders ? `: ${blokkade_anders}` : "")) : ""}
      ${pad === "A" ? row("Verloren uren/wk", verloren_uren) : ""}
      ${pad === "B" ? row("AI-frequentie", ai_frequentie) : ""}
      ${automatisering_wens ? row("Automatisering wens", automatisering_wens) : ""}
      ${row("Newsletter", newsletter_consent ? "Ja" : "Nee")}
    </table>
  </td></tr>
  <tr><td style="background:#F8F7F3;padding:16px 36px;border-top:1px solid #E8E4DB;margin-top:24px;">
    <p style="margin:0;color:#5F5E5A;font-size:12px;">MosselAI · Hoeksche Waard · mosselai.nl</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;

      await resend.emails.send({
        from: "MosselAI Onderzoek <onboarding@resend.dev>",
        to: ["blmosselman@gmail.com"],
        replyTo: email || undefined,
        subject,
        html,
      });
    } catch (mailErr) {
      console.error("Resend error (non-fatal):", mailErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("onderzoek-submit error:", err);
    return NextResponse.json({ ok: false, error: "Serverfout" }, { status: 500 });
  }
}
