import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const sectorLabel: Record<string, string> = {
  groothandel:    "Groothandel / distributie",
  productie:      "Productie / maakbedrijf",
  handel:         "Handel / webshop",
  installateur:   "Installateur / aannemer",
  dienstverlener: "Dienstverlener / overig",
};

const pijnLabel: Record<string, string> = {
  orders:      "Orders & bestellingen verwerken",
  facturen:    "Facturen & administratie",
  emails:      "E-mails afhandelen",
  rapportages: "Rapportages & overzichten",
  offertes:    "Offertes schrijven",
};

const methodeLabel: Record<string, string> = {
  handmatig:  "Handmatig, altijd zelf",
  excel:      "In Excel of Word",
  software:   "Via software, maar nog veel handwerk erbij",
  uitbesteed: "Uitbesteed",
};

const urenLabel: Record<string, string> = {
  lt2:    "Minder dan 2 uur/week",
  "2to5": "2 tot 5 uur/week",
  "5to10":"5 tot 10 uur/week",
  gt10:   "Meer dan 10 uur/week",
};

const annualHours: Record<string, number> = {
  lt2: 80, "2to5": 165, "5to10": 330, gt10: 550,
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sector, pijnpunt, methode, uren, naam, email, bedrijf } = body;

    const jaarUren = uren ? annualHours[uren] ?? 0 : 0;

    const html = `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Nieuwe quizinzending – MosselAI</title>
</head>
<body style="margin:0;padding:0;background:#F5F1E8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F1E8;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(30,58,95,0.10);">

        <!-- Header -->
        <tr>
          <td style="background:#1E3A5F;padding:28px 36px;">
            <p style="margin:0;color:#C5D7F0;font-size:12px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;">MosselAI</p>
            <h1 style="margin:8px 0 0;color:#F5F1E8;font-size:22px;font-weight:500;letter-spacing:-0.02em;">Nieuwe lead via de quiz</h1>
          </td>
        </tr>

        <!-- Contact -->
        <tr>
          <td style="padding:28px 36px 0;">
            <p style="margin:0 0 4px;color:#5F5E5A;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;">Contact</p>
            <p style="margin:0;color:#1E3A5F;font-size:18px;font-weight:600;">${naam || "–"}</p>
            <p style="margin:4px 0 0;color:#4A7FC4;font-size:15px;">
              <a href="mailto:${email}" style="color:#4A7FC4;text-decoration:none;">${email || "–"}</a>
            </p>
            ${bedrijf ? `<p style="margin:4px 0 0;color:#5F5E5A;font-size:14px;">${bedrijf}</p>` : ""}
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:20px 36px 0;"><hr style="border:none;border-top:1px solid #E8E4DB;margin:0;"/></td></tr>

        <!-- Quiz answers -->
        <tr>
          <td style="padding:24px 36px 0;">
            <p style="margin:0 0 16px;color:#5F5E5A;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;">Quizantwoorden</p>

            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #F0EDE8;vertical-align:top;width:40%;">
                  <p style="margin:0;color:#5F5E5A;font-size:13px;">Type bedrijf</p>
                </td>
                <td style="padding:10px 0 10px 16px;border-bottom:1px solid #F0EDE8;vertical-align:top;">
                  <p style="margin:0;color:#1E3A5F;font-size:13px;font-weight:500;">${sectorLabel[sector] ?? sector ?? "–"}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #F0EDE8;vertical-align:top;">
                  <p style="margin:0;color:#5F5E5A;font-size:13px;">Grootste pijnpunt</p>
                </td>
                <td style="padding:10px 0 10px 16px;border-bottom:1px solid #F0EDE8;vertical-align:top;">
                  <p style="margin:0;color:#1E3A5F;font-size:13px;font-weight:500;">${pijnLabel[pijnpunt] ?? pijnpunt ?? "–"}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #F0EDE8;vertical-align:top;">
                  <p style="margin:0;color:#5F5E5A;font-size:13px;">Huidige aanpak</p>
                </td>
                <td style="padding:10px 0 10px 16px;border-bottom:1px solid #F0EDE8;vertical-align:top;">
                  <p style="margin:0;color:#1E3A5F;font-size:13px;font-weight:500;">${methodeLabel[methode] ?? methode ?? "–"}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;vertical-align:top;">
                  <p style="margin:0;color:#5F5E5A;font-size:13px;">Tijdsverlies</p>
                </td>
                <td style="padding:10px 0 10px 16px;vertical-align:top;">
                  <p style="margin:0;color:#1E3A5F;font-size:13px;font-weight:500;">${urenLabel[uren] ?? uren ?? "–"}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Highlight box -->
        <tr>
          <td style="padding:20px 36px 0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#FBF5EA;border:1px solid #E8DBC0;border-radius:10px;">
              <tr>
                <td style="padding:16px 20px;">
                  <p style="margin:0;color:#8A6A2E;font-size:14px;font-weight:500;">
                    ⚡ Deze lead verliest <strong style="color:#C89656;">${jaarUren} uur per jaar</strong> aan handmatig herhaalwerk.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:24px 36px 32px;">
            <a href="mailto:${email}?subject=Je%20MosselAI%20quiz%20resultaat&body=Hoi%20${encodeURIComponent(naam || "")}%2C"
               style="display:inline-block;background:#1E3A5F;color:#F5F1E8;border-radius:8px;padding:12px 24px;font-size:14px;font-weight:500;text-decoration:none;">
              Stuur terugmelding →
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F8F7F3;padding:16px 36px;border-top:1px solid #E8E4DB;">
            <p style="margin:0;color:#5F5E5A;font-size:12px;">MosselAI · Hoeksche Waard · mosselai.nl</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    await resend.emails.send({
      from:    "MosselAI Quiz <onboarding@resend.dev>",
      to:      ["blmosselman@gmail.com"], // tijdelijk voor test — zet terug naar info@mosselai.com na domeinverificatie
      replyTo: email,
      subject: `Nieuwe lead: ${naam || "onbekend"} — ${pijnLabel[pijnpunt] ?? pijnpunt ?? "quiz"}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("quiz-submit error:", err);
    return NextResponse.json({ ok: false, error: "Verzenden mislukt" }, { status: 500 });
  }
}
