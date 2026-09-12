export type Bidrag = {
  id: string;
  title: string;
  description: string;
  category: "privatperson" | "foretag" | "student" | "foralder" | "pensionar";
  authority: string;
  amount?: string;
  url: string;
  tags: string[];
};

export const bidrag: Bidrag[] = [
  {
    id: "bostadsbidrag",
    title: "Bostadsbidrag",
    description: "Ekonomiskt stöd för att hjälpa till med hyra eller boendekostnader för den som har låg inkomst.",
    category: "privatperson",
    authority: "Försäkringskassan",
    amount: "Upp till flera tusen kr/mån",
    url: "https://www.forsakringskassan.se/privatperson/bostadsbidrag",
    tags: ["boende", "hyra", "inkomst"],
  },
  {
    id: "barnbidrag",
    title: "Barnbidrag",
    description: "Månatligt bidrag för barn upp till 16 år. Utökas automatiskt med flerbarnstjillägg.",
    category: "foralder",
    authority: "Försäkringskassan",
    amount: "1 250 kr/mån per barn",
    url: "https://www.forsakringskassan.se/privatperson/barnbidrag",
    tags: ["barn", "familj"],
  },
  {
    id: "studiebidrag",
    title: "Studiebidrag (CSN)",
    description: "Bidrag och lån för studier på gymnasium, högskola eller yrkeshögskola.",
    category: "student",
    authority: "CSN",
    amount: "Varierar efter ålder och studietakt",
    url: "https://www.csn.se",
    tags: ["studier", "utbildning", "lån"],
  },
  {
    id: "etableringsstod",
    title: "Etableringsstöd",
    description: "Stöd för nyanlända som deltar i etableringsprogrammet hos Arbetsförmedlingen.",
    category: "privatperson",
    authority: "Arbetsförmedlingen / Försäkringskassan",
    url: "https://www.forsakringskassan.se",
    tags: ["nyanländ", "arbete"],
  },
  {
    id: "rot-rut",
    title: "ROT- och RUT-avdrag",
    description: "Skattereduktion för reparation, underhåll och ombyggnad (ROT) samt hushållsnära tjänster (RUT).",
    category: "privatperson",
    authority: "Skatteverket",
    amount: "Upp till 50 000–75 000 kr/år",
    url: "https://www.skatteverket.se",
    tags: ["skatt", "renovering", "hushåll"],
  },
  {
    id: "starta-foretag",
    title: "Stöd vid start av företag",
    description: "Olika stöd och rådgivning för dig som vill starta eget, inklusive möjliga bidrag och garanti.",
    category: "foretag",
    authority: "Tillväxtverket / Almi",
    url: "https://tillvaxtverket.se",
    tags: ["företag", "startup"],
  },
  {
    id: "pension",
    title: "Allmän pension & garantipension",
    description: "Information om din pension och möjlighet till garantipension om du har låg pension.",
    category: "pensionar",
    authority: "Pensionsmyndigheten",
    url: "https://www.pensionsmyndigheten.se",
    tags: ["pension", "äldre"],
  },
  {
    id: "forsorjningsstod",
    title: "Försörjningsstöd",
    description: "Ekonomiskt bistånd från kommunen när du inte kan försörja dig på annat sätt.",
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