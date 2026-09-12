export type Bidrag = {
  id: string;
  title: string;
  description: string;
  category: "privatperson" | "foretag" | "student" | "foralder" | "pensionar";
  authority: string;
  amount?: string;
  url: string;
  tags: string[];
  details?: {
    summary: string;
    sections: { heading: string; content: string }[];
  };
};

export const bidrag: Bidrag[] = [
  {
    id: "barnbidrag",
    title: "Barnbidrag",
    description:
      "Månatligt bidrag för barn upp till 16 år. Utökas automatiskt med flerbarnstillägg när du har flera barn.",
    category: "foralder",
    authority: "Försäkringskassan",
    amount: "1 250 kr/mån per barn + flerbarnstillägg",
    url: "https://www.forsakringskassan.se/privatperson/barnbidrag",
    tags: ["barn", "familj", "flerbarnstillägg", "växelvis boende"],
    details: {
      summary:
        "Barnbidraget är ett skattefritt stöd som betalas ut automatiskt. Det finns särskilda regler vid växelvis boende och flerbarnstillägg.",
      sections: [
        {
          heading: "Grundbelopp",
          content:
            "Barnbidraget är 1 250 kronor per barn och månad (2024/2025). Det betalas ut tills barnet fyller 16 år. Därefter kan studiebidrag ta vid om barnet studerar.",
        },
        {
          heading: "Flerbarnstillägg",
          content:
            "När du får barnbidrag för två eller fler barn får du automatiskt flerbarnstillägg. Det läggs ovanpå det vanliga barnbidraget.\n\nExempel (ungefärliga nivåer):\n• 2 barn: +150 kr\n• 3 barn: +580 kr\n• 4 barn: +1 610 kr\n• 5 barn: +2 890 kr\n\nBeloppen ändras ibland – kolla alltid aktuella siffror hos Försäkringskassan.",
        },
        {
          heading: "Växelvis boende (varannan vecka)",
          content:
            "Om barnet bor ungefär lika mycket hos båda föräldrarna (växelvis boende) kan ni välja hur bidraget ska delas:\n\n1. **En förälder får hela bidraget** – den andre får inget.\n2. **Delat barnbidrag** – ni får hälften var (625 kr vardera per barn).\n\nFör att få delat barnbidrag måste båda ansöka hos Försäkringskassan. Det krävs att boendet är ungefär lika fördelat över tid.\n\nFlerbarnstillägget följer samma princip – det kan också delas.",
        },
        {
          heading: "Vem får pengarna?",
          content:
            "Som standard betalas barnbidraget till den förälder som barnet är folkbokfört hos. Vid gemensam vårdnad kan ni ändra mottagare eller begära delning.\n\nOm ni inte är överens kan Försäkringskassan fatta beslut utifrån barnets faktiska boende.",
        },
        {
          heading: "Så gör du",
          content:
            "• Barnbidraget kommer oftast automatiskt när barnet föds och folkbokförs.\n• För delat bidrag: ansök via Mina sidor på Försäkringskassan.\n• Ändra mottagare eller anmäl växelvis boende där också.\n• Beslut och utbetalningar syns under Mina sidor.",
        },
      ],
    },
  },
  {
    id: "bostadsbidrag",
    title: "Bostadsbidrag",
    description:
      "Ekonomiskt stöd för att hjälpa till med hyra eller boendekostnader för den som har låg inkomst.",
    category: "privatperson",
    authority: "Försäkringskassan",
    amount: "Upp till flera tusen kr/mån",
    url: "https://www.forsakringskassan.se/privatperson/bostadsbidrag",
    tags: ["boende", "hyra", "inkomst"],
    details: {
      summary:
        "Bostadsbidrag kan ges till barnfamiljer och till ungdomar 18–28 år. Storleken beror på inkomst, boendekostnad och familjesituation.",
      sections: [
        {
          heading: "Vem kan få?",
          content:
            "Främst barnfamiljer och unga vuxna (18–28 år) med låg inkomst. Det finns tak för hur hög inkomst man får ha och hur hög hyran får vara.",
        },
        {
          heading: "Vad påverkar beloppet?",
          content:
            "Inkomst, antal barn, boendekostnad och bostadens storlek. Ändras din inkomst under året kan bidraget räknas om – både uppåt och nedåt.",
        },
      ],
    },
  },
  {
    id: "studiebidrag",
    title: "Studiebidrag (CSN)",
    description:
      "Bidrag och lån för studier på gymnasium, högskola eller yrkeshögskola.",
    category: "student",
    authority: "CSN",
    amount: "Varierar efter ålder och studietakt",
    url: "https://www.csn.se",
    tags: ["studier", "utbildning", "lån"],
  },
  {
    id: "etableringsstod",
    title: "Etableringsstöd",
    description:
      "Stöd för nyanlända som deltar i etableringsprogrammet hos Arbetsförmedlingen.",
    category: "privatperson",
    authority: "Arbetsförmedlingen / Försäkringskassan",
    url: "https://www.forsakringskassan.se",
    tags: ["nyanländ", "arbete"],
  },
  {
    id: "rot-rut",
    title: "ROT- och RUT-avdrag",
    description:
      "Skattereduktion för reparation, underhåll och ombyggnad (ROT) samt hushållsnära tjänster (RUT).",
    category: "privatperson",
    authority: "Skatteverket",
    amount: "Upp till 50 000–75 000 kr/år",
    url: "https://www.skatteverket.se",
    tags: ["skatt", "renovering", "hushåll"],
  },
  {
    id: "starta-foretag",
    title: "Stöd vid start av företag",
    description:
      "Olika stöd och rådgivning för dig som vill starta eget, inklusive möjliga bidrag och garanti.",
    category: "foretag",
    authority: "Tillväxtverket / Almi",
    url: "https://tillvaxtverket.se",
    tags: ["företag", "startup"],
  },
  {
    id: "pension",
    title: "Allmän pension & garantipension",
    description:
      "Information om din pension och möjlighet till garantipension om du har låg pension.",
    category: "pensionar",
    authority: "Pensionsmyndigheten",
    url: "https://www.pensionsmyndigheten.se",
    tags: ["pension", "äldre"],
  },
  {
    id: "forsorjningsstod",
    title: "Försörjningsstöd",
    description:
      "Ekonomiskt bistånd från kommunen när du inte kan försörja dig på annat sätt.",
    category: "privatperson",
    authority: "Kommunen",
    url: "https://www.socialstyrelsen.se",
    tags: ["bistånd", "ekonomi"],
  },
];

export const categories = [
  { value: "all", label: "Alla" },
  { value: "privatperson", label: "Privatperson" },
  { value: "foralder", label: "Förälder" },
  { value: "student", label: "Student" },
  { value: "foretag", label: "Företag" },
  { value: "pensionar", label: "Pensionär" },
] as const;