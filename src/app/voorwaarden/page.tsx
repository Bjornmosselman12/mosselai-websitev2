import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Algemene voorwaarden | MosselAI",
  description: "Algemene voorwaarden van MosselAI — AI-automatisering voor MKB.",
};

const sections = [
  {
    title: "1. Wie zijn wij",
    body: `MosselAI is een eenmanszaak gevestigd in de Hoeksche Waard, ingeschreven bij de Kamer van Koophandel onder nummer 97587214. Contactadres: info@mosselai.com.`,
  },
  {
    title: "2. Toepasselijkheid",
    body: `Deze algemene voorwaarden zijn van toepassing op alle offertes, overeenkomsten en diensten van MosselAI. Afwijkingen zijn alleen geldig als ze schriftelijk zijn overeengekomen.`,
  },
  {
    title: "3. De dienst",
    body: `MosselAI bouwt en onderhoudt AI-automatiseringen voor MKB-bedrijven. De precieze scope van elke automatisering wordt voorafgaand aan de opdracht schriftelijk vastgelegd (per e-mail of offerte). Wat in die vastlegging staat, is wat inbegrepen is. Aanvullende wensen die buiten de oorspronkelijke scope vallen, worden apart geoffreerd.`,
  },
  {
    title: "4. Aanpassingen binnen de pilotperiode",
    body: `Tijdens de pilotfase (maximaal vier weken na oplevering) worden aanpassingen gedaan totdat de automatisering doet wat schriftelijk is afgesproken. Nieuwe functionaliteiten of uitbreidingen die tijdens deze periode worden gewenst, vallen buiten de pilot en worden als apart traject opgepakt.`,
  },
  {
    title: "5. Betaling",
    body: `Facturatie start pas zodra de automatisering live staat en door de opdrachtgever als werkend is bevestigd. Daarna wordt maandelijks gefactureerd. Betaaltermijn is 14 dagen na factuurdatum. Bij niet-tijdige betaling behoudt MosselAI het recht de dienstverlening te onderbreken.`,
  },
  {
    title: "6. Opzegging",
    body: `De overeenkomst is maandelijks opzegbaar, zonder opzegtermijn. Opzeggen kan per e-mail. Na opzegging worden geen verdere facturen verzonden. Reeds gefactureerde bedragen blijven verschuldigd.`,
  },
  {
    title: "7. Aansprakelijkheid",
    body: `MosselAI is niet aansprakelijk voor indirecte schade, gevolgschade of gederfde omzet. De aansprakelijkheid van MosselAI is in alle gevallen beperkt tot het bedrag dat in de drie maanden voorafgaand aan de schadeveroorzakende gebeurtenis is gefactureerd. MosselAI staat niet in voor de beschikbaarheid of werking van externe diensten en platformen (zoals Gmail, Exact, Shopify of andere software van derden) waarop automatiseringen draaien.`,
  },
  {
    title: "8. Intellectueel eigendom",
    body: `De opdrachtgever krijgt het gebruiksrecht op de geleverde automatisering zolang de overeenkomst loopt. De onderliggende code en technische configuraties blijven eigendom van MosselAI, tenzij schriftelijk anders overeengekomen.`,
  },
  {
    title: "9. Vertrouwelijkheid en gegevens",
    body: `MosselAI behandelt bedrijfsinformatie vertrouwelijk en deelt deze niet met derden, tenzij dit noodzakelijk is voor de uitvoering van de opdracht. Voor de verwerking van persoonsgegevens verwijzen wij naar ons privacybeleid.`,
  },
  {
    title: "10. Toepasselijk recht",
    body: `Op alle overeenkomsten met MosselAI is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement Rotterdam.`,
  },
  {
    title: "11. Wijzigingen",
    body: `MosselAI kan deze voorwaarden wijzigen. Bij wijzigingen die de lopende overeenkomst raken, ontvangt de opdrachtgever hiervan bericht per e-mail, minimaal 30 dagen voor inwerkingtreding.`,
  },
];

export default function VoorwaardenPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#F5F1E8" }}>
      <Header />
      <main style={{ flex: 1, paddingTop: "64px" }}>
        <div className="max-w-3xl mx-auto px-6" style={{ padding: "64px 24px 96px" }}>
          <p style={{ color: "#4A7FC4", fontSize: "13px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
            MosselAI
          </p>
          <h1 style={{ color: "#1E3A5F", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "8px" }}>
            Algemene voorwaarden
          </h1>
          <p style={{ color: "#5F5E5A", fontSize: "14px", marginBottom: "56px" }}>
            Versie april 2026 · KvK 97587214
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {sections.map((s) => (
              <div key={s.title}>
                <h2 style={{ color: "#1E3A5F", fontSize: "17px", fontWeight: 500, marginBottom: "10px" }}>
                  {s.title}
                </h2>
                <p style={{ color: "#5F5E5A", fontSize: "15px", lineHeight: 1.75, margin: 0 }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "64px", borderTop: "1px solid #E8E4DB", paddingTop: "24px" }}>
            <p style={{ color: "#5F5E5A", fontSize: "13px", lineHeight: 1.6 }}>
              Vragen over deze voorwaarden? Stuur een e-mail naar{" "}
              <a href="mailto:info@mosselai.com" style={{ color: "#4A7FC4", textDecoration: "none" }}>
                info@mosselai.com
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
