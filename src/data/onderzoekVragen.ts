export type Optie = { value: string; label: string };

export const vraag1Rol: Optie[] = [
  { value: "ondernemer", label: "Ondernemer / eigenaar van een MKB-bedrijf" },
  { value: "directie", label: "Directielid / manager met beslissingsbevoegdheid" },
  { value: "werknemer", label: "Werknemer (geen beslissingsbevoegdheid over AI/tools)" },
  { value: "freelancer", label: "Freelancer / ZZP'er" },
  { value: "student", label: "Student / wetenschapper / onderzoeker" },
  { value: "anders", label: "Anders" },
];

export const padARollen = ["ondernemer", "directie"];

export const sectoren: Optie[] = [
  { value: "groothandel", label: "Groothandel" },
  { value: "ecommerce", label: "E-commerce / webshop" },
  { value: "retail", label: "Retail / fysieke winkel met online verkoop" },
  { value: "productie", label: "Productie / fabrikant" },
  { value: "logistiek", label: "Distributie / logistiek" },
  { value: "dienstverlening", label: "Zakelijke dienstverlening" },
  { value: "bouw", label: "Bouw / installatie / techniek" },
  { value: "zorg", label: "Zorg / welzijn" },
  { value: "anders", label: "Anders" },
];

export const fteRanges: Optie[] = [
  { value: "1-5", label: "1–5" },
  { value: "6-15", label: "6–15" },
  { value: "16-35", label: "16–35" },
  { value: "36-75", label: "36–75" },
  { value: "76-150", label: "76–150" },
  { value: "150+", label: "150+" },
];

export const omzetRanges: Optie[] = [
  { value: "<500k", label: "Onder €500k" },
  { value: "500k-2m", label: "€500k – €2M" },
  { value: "2m-5m", label: "€2M – €5M" },
  { value: "5m-20m", label: "€5M – €20M" },
  { value: "20m+", label: "Boven €20M" },
  { value: "geen-antwoord", label: "Dat laat ik achterwege" },
];

export const systemen: Optie[] = [
  { value: "exact", label: "Exact" },
  { value: "snelstart", label: "Snelstart" },
  { value: "afas", label: "Afas" },
  { value: "dynamics", label: "Microsoft Dynamics 365" },
  { value: "odoo", label: "Odoo" },
  { value: "twinfield", label: "Twinfield" },
  { value: "shopify", label: "Shopify" },
  { value: "woocommerce", label: "WooCommerce" },
  { value: "magento", label: "Magento" },
  { value: "lightspeed", label: "Lightspeed" },
  { value: "excel", label: "Excel / spreadsheets" },
  { value: "anders", label: "Anders, namelijk…" },
  { value: "weet-niet", label: "Weet ik niet" },
];

export const tijdvreters: Optie[] = [
  { value: "orders", label: "Orderverwerking / orders overtypen" },
  { value: "facturen", label: "Inkoop- en leveranciersfacturen verwerken" },
  { value: "klantenservice", label: "Klantenservice / inbox afhandelen" },
  { value: "voorraad", label: "Voorraadbeheer en nabestellen" },
  { value: "offertes", label: "Offertes en calculaties opstellen" },
  { value: "rapportages", label: "Rapportages en cijfers samentrekken" },
  { value: "planning", label: "Plannings- en urenadministratie" },
  { value: "marketing", label: "Marketing / nieuwsbrieven / social media" },
  { value: "anders", label: "Anders, namelijk…" },
];

export const aiGebruik: Optie[] = [
  { value: "geen", label: "Helemaal niet" },
  { value: "individueel", label: "Individuele medewerkers gebruiken ChatGPT of Copilot zelf" },
  { value: "tools", label: "We hebben AI in 1–2 tools geïntegreerd" },
  { value: "gestructureerd", label: "We hebben AI-systemen die zelfstandig werk uitvoeren" },
  { value: "weet-niet", label: "Ik weet het niet zeker" },
];

export const blokkades: Optie[] = [
  { value: "veiligheid", label: "Data-veiligheid en privacy" },
  { value: "kosten", label: "Kosten en onduidelijke ROI" },
  { value: "integratie", label: "Integratie met onze bestaande systemen" },
  { value: "begin", label: "We weten niet waar te beginnen" },
  { value: "ervaring", label: "Eerder slechte ervaring of mislukt traject" },
  { value: "geen", label: "Geen blokkades, we zijn er klaar voor" },
  { value: "anders", label: "Anders, namelijk…" },
];

export const verlorenUren: Optie[] = [
  { value: "<5", label: "< 5 uur" },
  { value: "5-15", label: "5–15 uur" },
  { value: "15-30", label: "15–30 uur" },
  { value: "30-60", label: "30–60 uur" },
  { value: "60+", label: "60+ uur" },
  { value: "geen-idee", label: "Geen idee" },
];

export const situaties: Optie[] = [
  { value: "orders-overtypen", label: "Iemand bij ons zit dagelijks orders over te typen uit e-mail in onze systemen" },
  { value: "facturen-pdf", label: "Inkoopfacturen komen binnen als PDF en worden met de hand in de boekhouding gezet" },
  { value: "dubbele-invoer", label: "Nieuwe klant- of productgegevens worden in meerdere systemen apart ingevoerd" },
  { value: "voorraad-verschil", label: "Verschillen tussen voorraad in webshop en magazijn worden handmatig rechtgezet" },
  { value: "cijfers-samentrekken", label: "Voor een wekelijks overzicht haalt iemand cijfers uit 3 of meer systemen samen" },
  { value: "voorraad-te-laat", label: "Voorraadtekorten ontdekken we vaak pas als een klant erover belt" },
  { value: "geen", label: "Geen van bovenstaande — onze processen lopen zonder noemenswaardig handwerk" },
];

export const aiFrequentie: Optie[] = [
  { value: "dagelijks", label: "Dagelijks" },
  { value: "wekelijks", label: "Wekelijks" },
  { value: "maandelijks", label: "Maandelijks" },
  { value: "nooit-bijna", label: "Bijna nooit" },
  { value: "nooit", label: "Nooit" },
];
