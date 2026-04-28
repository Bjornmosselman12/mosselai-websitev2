import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacyverklaring | MosselAI",
  description: "Privacyverklaring van MosselAI — hoe wij omgaan met jouw persoonsgegevens.",
};

const sections = [
  {
    title: "1. Wie zijn wij",
    body: `MosselAI is een eenmanszaak van Bjorn Mosselman, gevestigd in de Hoeksche Waard en ingeschreven bij de Kamer van Koophandel onder nummer 97587214. Wij zijn verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in deze privacyverklaring. Vragen? Stuur een e-mail naar info@mosselai.com.`,
  },
  {
    title: "2. Welke gegevens verzamelen wij",
    body: `Wij verzamelen persoonsgegevens op twee manieren:\n\nVia de quiz op de website: naam, e-mailadres, bedrijfsnaam (optioneel) en de antwoorden op de quizvragen (sector, tijdverspilling, werkwijze, aantal uren).\n\nVia het onderzoeksformulier: voornaam, e-mailadres, bedrijfsnaam (optioneel), telefoonnummer (optioneel) en de antwoorden op de onderzoeksvragen over AI-gebruik in jullie organisatie.\n\nVia het contactformulier: naam, e-mailadres en het bericht dat je achterlaat.\n\nWij slaan geen betaalgegevens op.`,
  },
  {
    title: "3. Waarom verzamelen wij deze gegevens",
    body: `Quiz: om jou een gepersonaliseerd overzicht te sturen van de automatiseringsmogelijkheden in jouw bedrijf. Grondslag: toestemming (je vult het formulier zelf in).\n\nOnderzoek: om het eindrapport over AI-adoptie in het Nederlandse MKB samen te stellen en — als je dat hebt aangegeven — een gratis quick-scan voor jouw bedrijf te maken. Grondslag: toestemming.\n\nContact: om jouw vraag of verzoek te beantwoorden. Grondslag: gerechtvaardigd belang.`,
  },
  {
    title: "4. Hoe lang bewaren wij je gegevens",
    body: `Gegevens uit de quiz en het onderzoek bewaren wij maximaal 2 jaar na verzameling, of totdat je verzoekt ze te verwijderen. Contactberichten bewaren wij maximaal 1 jaar. Als er een overeenkomst tot stand komt, bewaren wij de zakelijke correspondentie 7 jaar op grond van de fiscale bewaarplicht.`,
  },
  {
    title: "5. Met wie delen wij je gegevens",
    body: `Wij delen je gegevens niet met derden voor commerciële doeleinden. Voor de technische afhandeling maken wij gebruik van de volgende verwerkers:\n\n• Supabase (databaseopslag) — servers in de Europese Unie\n• Resend (e-mailverzending) — AVG-compliant\n\nMet beide partijen zijn verwerkersovereenkomsten afgesloten. Buiten deze verwerkers worden je gegevens niet gedeeld, tenzij wij daartoe wettelijk verplicht zijn.`,
  },
  {
    title: "6. Cookies",
    body: `Wij maken gebruik van één functionele cookie: een inlogcookie voor het beheerdersdashboard. Deze cookie is strikt noodzakelijk voor de werking van dat onderdeel en vereist geen toestemming. Wij plaatsen geen tracking- of advertentiecookies. Als wij in de toekomst analytics toevoegen, updaten wij deze verklaring en informeren wij je indien toestemming vereist is.`,
  },
  {
    title: "7. Jouw rechten",
    body: `Op grond van de AVG heb je de volgende rechten:\n\n• Inzage: je kunt opvragen welke gegevens wij van je hebben\n• Correctie: je kunt onjuiste gegevens laten aanpassen\n• Verwijdering: je kunt verzoeken je gegevens te wissen\n• Bezwaar: je kunt bezwaar maken tegen de verwerking op basis van gerechtvaardigd belang\n• Overdraagbaarheid: je kunt je gegevens in een gangbaar formaat opvragen\n\nStuur hiervoor een e-mail naar info@mosselai.com. Wij reageren binnen 30 dagen. Als je vindt dat wij je gegevens niet correct verwerken, heb je het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl).`,
  },
  {
    title: "8. Beveiliging",
    body: `Wij nemen passende technische en organisatorische maatregelen om je persoonsgegevens te beschermen tegen ongeoorloofde toegang, verlies of misbruik. Toegang tot de opgeslagen gegevens is beperkt tot Bjorn Mosselman en de hierboven genoemde verwerkers.`,
  },
  {
    title: "9. Wijzigingen",
    body: `Wij kunnen deze privacyverklaring aanpassen als onze dienstverlening of de wet daartoe aanleiding geeft. De meest actuele versie staat altijd op deze pagina. Bij ingrijpende wijzigingen ontvang je een bericht als je je e-mailadres bij ons hebt achtergelaten.`,
  },
];

export default function PrivacyPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#F5F1E8" }}>
      <Header />
      <main style={{ flex: 1, paddingTop: "64px" }}>
        <div className="max-w-3xl mx-auto px-6" style={{ padding: "64px 24px 96px" }}>
          <p style={{ color: "#4A7FC4", fontSize: "13px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
            MosselAI
          </p>
          <h1 style={{ color: "#1E3A5F", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "8px" }}>
            Privacyverklaring
          </h1>
          <p style={{ color: "#5F5E5A", fontSize: "14px", marginBottom: "56px" }}>
            Versie april 2026 · Van toepassing op mosselai.com
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
              Vragen over deze privacyverklaring? Stuur een e-mail naar{" "}
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
