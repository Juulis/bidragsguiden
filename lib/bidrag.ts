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
      "Månatligt skattefritt stöd för barn upp till 16 år. Flerbarnstillägg läggs på automatiskt.",
    category: "foralder",
    authority: "Försäkringskassan",
    amount: "1 250 kr/mån per barn + flerbarnstillägg",
    url: "https://www.forsakringskassan.se/privatperson/barnbidrag",
    tags: ["barn", "familj", "flerbarnstillägg", "växelvis boende"],
    details: {
      summary:
        "Barnbidraget betalas ut automatiskt och är skattefritt. Reglerna skiljer sig vid växelvis boende och när du har flera barn.",
      sections: [
        {
          heading: "Grundbelopp",
          content:
            "1 250 kr per barn och månad. Betalas tills barnet fyller 16 år. Därefter kan studiebidrag (CSN) ta vid om barnet studerar.",
        },
        {
          heading: "Flerbarnstillägg (exempel)",
          content:
            "Läggs automatiskt på när du har två eller fler barn:\n\n• 2 barn: ca +150 kr\n• 3 barn: ca +580 kr\n• 4 barn: ca +1 610 kr\n• 5 barn: ca +2 890 kr\n\nExakta belopp kan ändras – använd alltid aktuella siffror som referens hos Försäkringskassan.",
        },
        {
          heading: "Växelvis boende (varannan vecka)",
          content:
            "Om barnet bor ungefär lika mycket hos båda:\n\n1. En förälder får hela bidraget\n2. Delat bidrag – 625 kr vardera per barn\n\nFör delning måste båda ansöka. Flerbarnstillägget kan också delas.\n\nKrav: boendet ska vara ungefär lika fördelat över tid.",
        },
        {
          heading: "Vem får pengarna?",
          content:
            "Standard: den förälder barnet är folkbokfört hos. Vid gemensam vårdnad kan ni byta mottagare eller begära delning via Mina sidor.",
        },
        {
          heading: "Så gör du",
          content:
            "• Kommer oftast automatiskt vid födelse/folkbokföring\n• Delat bidrag: ansök på Mina sidor\n• Ändra mottagare eller anmäl växelvis boende där",
        },
      ],
    },
  },
  {
    id: "bostadsbidrag",
    title: "Bostadsbidrag",
    description:
      "Stöd till boendekostnad för barnfamiljer och unga 18–28 år med låg inkomst.",
    category: "privatperson",
    authority: "Försäkringskassan",
    amount: "Beror på inkomst, hyra och familj",
    url: "https://www.forsakringskassan.se/privatperson/bostadsbidrag",
    tags: ["boende", "hyra", "inkomst"],
    details: {
      summary:
        "Bostadsbidraget räknas ut utifrån din inkomst, boendekostnad, bostadsstorlek och om du har barn.",
      sections: [
        {
          heading: "Vem kan få?",
          content:
            "• Barnfamiljer med låg/medel inkomst\n• Unga 18–28 år utan barn (med inkomst- och hyrestak)\n\nDu måste bo och vara folkbokförd i Sverige.",
        },
        {
          heading: "Så påverkas beloppet",
          content:
            "Högre hyra och fler barn → högre möjligt bidrag.\nHögre inkomst → lägre bidrag (trappas av).\n\nÄndras inkomsten under året kan bidraget räknas om i efterhand – både upp och ner. Därför är det viktigt att anmäla ändringar.",
        },
        {
          heading: "Så ansöker du",
          content:
            "Ansök via Mina sidor på Försäkringskassan. Du behöver uppgifter om hyra/avgift, bostadens storlek och inkomst.",
        },
      ],
    },
  },
  {
    id: "studiebidrag",
    title: "Studiebidrag & studielån (CSN)",
    description:
      "Bidrag och lån för gymnasium, högskola, yrkeshögskola m.m.",
    category: "student",
    authority: "CSN",
    amount: "Bidrag + valfritt lån, beror på takt och ålder",
    url: "https://www.csn.se",
    tags: ["studier", "utbildning", "lån"],
    details: {
      summary:
        "CSN består av bidrag (behovs inte betalas tillbaka) och studielån (betalas tillbaka senare). Du väljer själv om du tar lån.",
      sections: [
        {
          heading: "Vad du kan få",
          content:
            "• Studiebidrag (gratis del)\n• Studielån (valfritt)\n• Eventuella tillägg (t.ex. tilläggslån, extra tillägg vid vissa villkor)\n\nBeloppen beror på om du läser heltid/del tid och vilken utbildningsnivå.",
        },
        {
          heading: "Viktiga villkor",
          content:
            "Du måste vara antagen och bedriva studier i tillräcklig omfattning. Det finns gränser för hur många veckor du kan få stöd totalt.",
        },
        {
          heading: "Så ansöker du",
          content:
            "Ansök på csn.se när du är antagen. Utbetalning sker normalt i förskott månadsvis.",
        },
      ],
    },
  },
  {
    id: "rot-rut",
    title: "ROT- och RUT-avdrag",
    description:
      "Skattereduktion för hantverk (ROT) och hushållsnära tjänster (RUT).",
    category: "privatperson",
    authority: "Skatteverket",
    amount: "ROT max 50 000 kr/person/år · RUT max 75 000 kr/person/år",
    url: "https://www.skatteverket.se",
    tags: ["skatt", "renovering", "hushåll"],
    details: {
      summary:
        "Du får skattereduktion direkt på fakturan. Utföraren begär beloppet från Skatteverket – du betalar bara din del.",
      sections: [
        {
          heading: "ROT (reparation, ombyggnad, tillbyggnad)",
          content:
            "Gäller arbetskostnad på bostad du äger och bor i (eller fritidshus under vissa villkor). Material räknas inte.\n\nMax 50 000 kr i skattereduktion per person och år.",
        },
        {
          heading: "RUT (hushållsnära tjänster)",
          content:
            "T.ex. städning, fönsterputs, trädgårdsarbete, barnpassning, flytthjälp m.m.\n\nMax 75 000 kr per person och år (högre för äldre i vissa fall – kontrollera aktuella regler).",
        },
        {
          heading: "Så fungerar det",
          content:
            "1. Välj godkänd utförare\n2. De drar avdraget på fakturan\n3. Du betalar resterande\n4. Utföraren begär resten från Skatteverket\n\nDu måste ha betalat tillräckligt med skatt under året för att kunna utnyttja avdraget.",
        },
      ],
    },
  },
  {
    id: "forsorjningsstod",
    title: "Försörjningsstöd",
    description:
      "Ekonomiskt bistånd från kommunen när du inte kan försörja dig på annat sätt.",
    category: "privatperson",
    authority: "Kommunen",
    amount: "Riksnorm + skäliga boendekostnader",
    url: "https://www.socialstyrelsen.se",
    tags: ["bistånd", "ekonomi", "inkomst"],
    details: {
      summary:
        "Försörjningsstöd (socialbidrag) är det yttersta skyddsnätet. Kommunen prövar dig individuellt.",
      sections: [
        {
          heading: "Vad det täcker",
          content:
            "• Riksnorm för levnadskostnader (mat, kläder, hygien m.m.)\n• Skälig boendekostnad\n• Vissa andra nödvändiga utgifter\n\nRiksnormen är densamma i hela landet men boendekostnaden bedöms lokalt.",
        },
        {
          heading: "Villkor",
          content:
            "Du ska i första hand använda egna inkomster och tillgångar. Kommunen kan kräva att du söker jobb eller deltar i aktiviteter.",
        },
        {
          heading: "Så ansöker du",
          content:
            "Kontakta socialtjänsten i din kommun. Du får lämna uppgifter om ekonomi och situation. Beslut fattas individuellt.",
        },
      ],
    },
  },
  {
    id: "pension",
    title: "Allmän pension & garantipension",
    description:
      "Grundskydd och inkomstgrundad pension. Garantipension finns om du har låg pension.",
    category: "pensionar",
    authority: "Pensionsmyndigheten",
    amount: "Beror på livsinkomst och bosättningstid",
    url: "https://www.pensionsmyndigheten.se",
    tags: ["pension", "äldre"],
    details: {
      summary:
        "Den allmänna pensionen består av inkomstpension, premiepension och eventuellt garantipension.",
      sections: [
        {
          heading: "Garantipension",
          content:
            "Ett grundskydd om du har haft låg eller ingen inkomst. Kräver att du bott i Sverige en viss tid. Beloppet beror på civilstånd och hur länge du bott här.",
        },
        {
          heading: "Så får du överblick",
          content:
            "Logga in på pensionsmyndigheten.se eller minpension.se för prognos och orange kuvert-uppgifter.",
        },
      ],
    },
  },
  {
    id: "etableringsstod",
    title: "Etableringsstöd",
    description:
      "Stöd till nyanlända som deltar i etableringsprogrammet.",
    category: "privatperson",
    authority: "Arbetsförmedlingen / Försäkringskassan",
    url: "https://www.forsakringskassan.se",
    tags: ["nyanländ", "arbete"],
    details: {
      summary:
        "Etableringsstöd betalas ut under tiden du följer en etableringsplan hos Arbetsförmedlingen.",
      sections: [
        {
          heading: "Vem kan få?",
          content:
            "Nyanlända som har uppehållstillstånd och deltar i etableringsprogrammet. Det finns ålders- och tidsgränser.",
        },
        {
          heading: "Så fungerar det",
          content:
            "Arbetsförmedlingen tar fram en plan. Försäkringskassan betalar ut stödet. Nivån beror på omfattning (hel/del tid).",
        },
      ],
    },
  },
  {
    id: "starta-foretag",
    title: "Stöd vid start av företag",
    description:
      "Rådgivning, finansiering och möjliga stöd när du startar eget.",
    category: "foretag",
    authority: "Tillväxtverket / Almi",
    url: "https://tillvaxtverket.se",
    tags: ["företag", "startup"],
    details: {
      summary:
        "Det finns sällan rena ”bidrag att bara söka”, men vägledning, mikrolån och vissa regionala stöd kan finnas.",
      sections: [
        {
          heading: "Vanliga vägar",
          content:
            "• Almi – rådgivning och lån\n• Nyföretagarcentrum / Starta företag-info\n• Regionala och EU-nära stöd (varierar över tid och region)\n• Eventuellt stöd via Arbetsförmedlingen om du är arbetssökande",
        },
        {
          heading: "Tips",
          content:
            "Börja med verksamt.se för checklista och myndighetsinformation samlad på ett ställe.",
        },
      ],
    },
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