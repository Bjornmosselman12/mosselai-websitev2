import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Algemene voorwaarden | MosselAI",
  description: "Algemene voorwaarden van MosselAI — AI-automatisering voor bedrijven.",
};

const sections = [
  {
    title: "1. Wie zijn wij",
    body: `MosselAI is een eenmanszaak gevestigd in de Hoeksche Waard, ingeschreven bij de Kamer van Koophandel onder nummer 97587214. Contactadres: info@mosselai.com.`,
  },
  {
    title: "2. Toepasselijkheid",
    body: `Deze algemene voorwaarden zijn van toepassing op alle offertes, overeenkomsten en diensten van MosselAI. Afwijkingen zijn alleen geldig als ze schriftelijk zijn overeengekomen.\n\nInkoopvoorwaarden of andere algemene voorwaarden van de opdrachtgever zijn niet van toepassing, ook niet indien deze later worden ingebracht of van toepassing worden verklaard.\n\nIndien één of meerdere bepalingen in deze voorwaarden nietig of vernietigbaar blijken, blijven de overige bepalingen onverminderd van kracht.`,
  },
  {
    title: "3. De dienst",
    body: `MosselAI bouwt en onderhoudt AI-automatiseringen voor bedrijven en organisaties. De precieze scope van elke automatisering wordt voorafgaand aan de opdracht schriftelijk vastgelegd (per e-mail of offerte). Wat in die vastlegging staat, is wat inbegrepen is. Aanvullende wensen die buiten de oorspronkelijke scope vallen, worden apart geoffreerd.`,
  },
  {
    title: "4. Pilotperiode en beëindiging tijdens de pilot",
    body: `Tijdens de pilotfase (maximaal vier weken na oplevering) worden aanpassingen gedaan totdat de automatisering doet wat schriftelijk is afgesproken. Nieuwe functionaliteiten of uitbreidingen die tijdens deze periode worden gewenst, vallen buiten de pilot en worden als apart traject opgepakt.\n\nIndien de pilot niet leidt tot een werkende automatisering die door de opdrachtgever als zodanig wordt geaccepteerd, of indien de opdrachtgever besluit niet door te gaan na de pilotfase, wordt geen maandelijks abonnementsbedrag in rekening gebracht. Er is geen opstartvergoeding verschuldigd.`,
  },
  {
    title: "5. Betaling en prijsaanpassing",
    body: `Alle bedragen zijn exclusief BTW, tenzij uitdrukkelijk anders vermeld.\n\nFacturatie start pas zodra de automatisering live staat en door de opdrachtgever als werkend is bevestigd. Daarna wordt maandelijks gefactureerd. Betaaltermijn is 14 dagen na factuurdatum. Bij niet-tijdige betaling behoudt MosselAI het recht de dienstverlening te onderbreken.\n\nMosselAI behoudt zich het recht voor het maandbedrag te herzien bij uitbreiding van de dienstverlening, groei van het gebruik of de omvang van de organisatie van de opdrachtgever, of jaarlijks op basis van de CBS-consumentenprijsindex. Prijswijzigingen worden minimaal 30 dagen van tevoren schriftelijk aangekondigd. Indien de opdrachtgever niet akkoord gaat, heeft hij het recht de overeenkomst op te zeggen per de datum waarop de nieuwe prijs ingaat.`,
  },
  {
    title: "6. Opzegging",
    body: `De overeenkomst is opzegbaar met een opzegtermijn van 30 dagen, per e-mail. Na het verstrijken van de opzegtermijn worden geen verdere facturen verzonden. Reeds gefactureerde bedragen blijven verschuldigd.\n\nNa beëindiging van de overeenkomst vervalt het gebruiksrecht op de automatisering. De onderliggende code en technische configuraties blijven eigendom van MosselAI.`,
  },
  {
    title: "7. Overmacht",
    body: `MosselAI is niet aansprakelijk voor enige tekortkoming in de nakoming van de overeenkomst indien en voor zover die tekortkoming het gevolg is van overmacht.\n\nOnder overmacht wordt verstaan elke omstandigheid waarop MosselAI redelijkerwijs geen invloed heeft, waaronder uitval van externe platforms (zoals maar niet beperkt tot OpenAI, Microsoft, Google, Shopify of Exact), storingen bij internetproviders, datacenters of cloud-leveranciers, alsmede storingen in de systemen van de opdrachtgever zelf, en verder: natuurrampen, pandemieën, oorlog en overheidsmaatregelen.\n\nTijdens overmacht worden de verplichtingen van MosselAI opgeschort. Indien de overmacht langer duurt dan 60 dagen, hebben beide partijen het recht de overeenkomst schriftelijk te ontbinden, zonder verplichting tot schadevergoeding.`,
  },
  {
    title: "8. Aansprakelijkheid",
    body: `MosselAI is niet aansprakelijk voor indirecte schade, gevolgschade of gederfde omzet. De totale aansprakelijkheid van MosselAI is in alle gevallen beperkt tot het bedrag dat in de drie maanden voorafgaand aan de schadeveroorzakende gebeurtenis is gefactureerd.\n\nMosselAI staat niet in voor de beschikbaarheid of werking van externe diensten en platformen (zoals Gmail, Exact, Shopify of andere software van derden) waarop automatiseringen draaien.`,
  },
  {
    title: "9. Intellectueel eigendom",
    body: `De opdrachtgever krijgt het gebruiksrecht op de geleverde automatisering zolang de overeenkomst loopt. De onderliggende code en technische configuraties blijven eigendom van MosselAI, tenzij schriftelijk anders overeengekomen.`,
  },
  {
    title: "10. Vertrouwelijkheid, gegevens en verwerkersovereenkomst",
    body: `MosselAI behandelt bedrijfsinformatie van de opdrachtgever vertrouwelijk en deelt deze niet met derden, tenzij dit noodzakelijk is voor de uitvoering van de opdracht.\n\nVoor zover MosselAI bij de uitvoering van de overeenkomst persoonsgegevens verwerkt namens de opdrachtgever, sluiten partijen een verwerkersovereenkomst conform artikel 28 AVG. De verwerkersovereenkomst is een integraal onderdeel van de overeenkomst en wordt op verzoek van de opdrachtgever aangeleverd vóór aanvang van de werkzaamheden.\n\nVoor de verwerking van persoonsgegevens van websitebezoekers verwijzen wij naar onze privacyverklaring.`,
  },
  {
    title: "11. Toepasselijk recht",
    body: `Op alle overeenkomsten met MosselAI is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement Rotterdam.`,
  },
  {
    title: "12. Wijzigingen",
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
                <p style={{ color: "#5F5E5A", fontSize: "15px", lineHeight: 1.75, margin: 0, whiteSpace: "pre-line" }}>
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
