"use client";

import { useMemo, useState } from "react";

/** Ungefärliga flerbarnstillägg (vägledning) */
const FLERBARN: Record<number, number> = {
  1: 0,
  2: 150,
  3: 580,
  4: 1610,
  5: 2890,
};

const GRUND = 1250;

// Ungefärliga CSN-nivåer per 4 veckor (vägledning – kan ändras)
const CSN_BIDRAG_HELTID = 3292;
const CSN_LAN_HELTID = 7584;
const CSN_TILLAGGSLAN_HELTID = 4056; // ungefärlig nivå för tilläggslån
// Extra tillägg (bidragsdel) – förenklad, t.ex. vid vårdnad om barn
const CSN_EXTRA_TILLAGG_PER_BARN = 600; // vägledande per 4 veckor

export function BarnbidragKalkyl() {
  const [children, setChildren] = useState(1);
  const [shared, setShared] = useState(false);

  const { total, perParent, tillagg } = useMemo(() => {
    const n = Math.min(Math.max(children, 1), 5);
    const tillagg = FLERBARN[n] ?? FLERBARN[5];
    const full = n * GRUND + tillagg;
    if (shared) {
      return { total: full, perParent: Math.round(full / 2), tillagg };
    }
    return { total: full, perParent: full, tillagg };
  }, [children, shared]);

  return (
    <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-4 space-y-4">
      <h4 className="text-sm font-semibold text-gray-900">Räkna på ditt barnbidrag</h4>
      <div className="flex flex-col sm:flex-row gap-4">
        <label className="flex flex-col gap-1 text-sm text-gray-700">
          Antal barn
          <select
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            className="rounded-md border border-gray-300 px-3 py-2 bg-white"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} barn
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700 pt-6 sm:pt-8">
          <input
            type="checkbox"
            checked={shared}
            onChange={(e) => setShared(e.target.checked)}
            className="rounded border-gray-300"
          />
          Delat bidrag (växelvis boende)
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <ResultBox label="Grundbelopp" value={`${children * GRUND} kr`} />
        <ResultBox label="Flerbarnstillägg" value={`${tillagg} kr`} />
        <ResultBox
          label={shared ? "Per förälder / mån" : "Totalt / mån"}
          value={`${shared ? perParent : total} kr`}
          highlight
        />
      </div>
      <Disclaimer text="Ungefärliga belopp. Kontrollera alltid aktuella siffror hos Försäkringskassan." />
    </div>
  );
}

export function RotRutKalkyl() {
  const [typ, setTyp] = useState<"rot" | "rut">("rot");
  const [arbete, setArbete] = useState(20000);
  const max = typ === "rot" ? 50000 : 75000;
  const raw = Math.round(arbete * 0.3);
  const avdrag = Math.min(raw, max);
  const attBetala = arbete - avdrag;

  return (
    <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-4 space-y-4">
      <h4 className="text-sm font-semibold text-gray-900">Räkna på ROT/RUT</h4>
      <div className="flex flex-col sm:flex-row gap-4">
        <label className="flex flex-col gap-1 text-sm text-gray-700">
          Typ
          <select
            value={typ}
            onChange={(e) => setTyp(e.target.value as "rot" | "rut")}
            className="rounded-md border border-gray-300 px-3 py-2 bg-white"
          >
            <option value="rot">ROT (max 50 000 kr)</option>
            <option value="rut">RUT (max 75 000 kr)</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm text-gray-700">
          Arbetskostnad (kr)
          <input
            type="number"
            min={0}
            step={1000}
            value={arbete}
            onChange={(e) => setArbete(Number(e.target.value) || 0)}
            className="rounded-md border border-gray-300 px-3 py-2 bg-white"
          />
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <ResultBox label="Arbetskostnad" value={`${arbete.toLocaleString("sv-SE")} kr`} />
        <ResultBox label="Uppskattat avdrag (~30%)" value={`${avdrag.toLocaleString("sv-SE")} kr`} />
        <ResultBox
          label="Du betalar ca"
          value={`${attBetala.toLocaleString("sv-SE")} kr`}
          highlight
        />
      </div>
      <Disclaimer text="Förenklad beräkning. Kontrollera aktuella regler hos Skatteverket." />
    </div>
  );
}

export function CsnKalkyl() {
  const [takt, setTakt] = useState<100 | 75 | 50>(100);
  const [medLan, setMedLan] = useState(true);
  const [tillaggslan, setTillaggslan] = useState(false);
  const [barn, setBarn] = useState(0);
  const [extraTillagg, setExtraTillagg] = useState(false);

  const faktor = takt / 100;
  const bidrag = Math.round(CSN_BIDRAG_HELTID * faktor);
  const lan = medLan ? Math.round(CSN_LAN_HELTID * faktor) : 0;
  const tillaggslanBelopp =
    medLan && tillaggslan ? Math.round(CSN_TILLAGGSLAN_HELTID * faktor) : 0;
  // Extra tillägg (t.ex. vid vårdnad om barn) – förenklad vägledning
  const barnTillagg =
    extraTillagg && barn > 0
      ? Math.round(CSN_EXTRA_TILLAGG_PER_BARN * Math.min(barn, 3) * faktor)
      : 0;

  const totalBidrag = bidrag + barnTillagg;
  const totalLan = lan + tillaggslanBelopp;
  const total = totalBidrag + totalLan;

  return (
    <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-4 space-y-4">
      <h4 className="text-sm font-semibold text-gray-900">Räkna på CSN (per 4 veckor)</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1 text-sm text-gray-700">
          Studietakt
          <select
            value={takt}
            onChange={(e) => setTakt(Number(e.target.value) as 100 | 75 | 50)}
            className="rounded-md border border-gray-300 px-3 py-2 bg-white"
          >
            <option value={100}>Heltid (100%)</option>
            <option value={75}>75%</option>
            <option value={50}>Halvtid (50%)</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm text-gray-700">
          Antal barn du har vårdnad om
          <select
            value={barn}
            onChange={(e) => setBarn(Number(e.target.value))}
            className="rounded-md border border-gray-300 px-3 py-2 bg-white"
          >
            {[0, 1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n === 0 ? "Inga barn" : `${n} barn`}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-col gap-2 text-sm text-gray-700">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={medLan}
            onChange={(e) => {
              setMedLan(e.target.checked);
              if (!e.target.checked) setTillaggslan(false);
            }}
            className="rounded border-gray-300"
          />
          Inkludera studielån
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={tillaggslan}
            disabled={!medLan}
            onChange={(e) => setTillaggslan(e.target.checked)}
            className="rounded border-gray-300"
          />
          Tilläggslån (t.ex. om du är över 30 eller uppfyller andra villkor)
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={extraTillagg}
            disabled={barn === 0}
            onChange={(e) => setExtraTillagg(e.target.checked)}
            className="rounded border-gray-300"
          />
          Extra tillägg / merkostnad kopplat till barn (förenklad uppskattning)
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
        <ResultBox label="Studiebidrag" value={`${bidrag.toLocaleString("sv-SE")} kr`} />
        <ResultBox
          label="Barnrelaterat tillägg"
          value={`${barnTillagg.toLocaleString("sv-SE")} kr`}
        />
        <ResultBox label="Studielån" value={`${lan.toLocaleString("sv-SE")} kr`} />
        <ResultBox
          label="Tilläggslån"
          value={`${tillaggslanBelopp.toLocaleString("sv-SE")} kr`}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <ResultBox
          label="Totalt bidrag"
          value={`${totalBidrag.toLocaleString("sv-SE")} kr`}
        />
        <ResultBox
          label="Totalt lån"
          value={`${totalLan.toLocaleString("sv-SE")} kr`}
        />
        <ResultBox
          label="Summa / 4 veckor"
          value={`${total.toLocaleString("sv-SE")} kr`}
          highlight
        />
      </div>

      <Disclaimer text="Vägledande belopp. Tilläggslån och extra tillägg har särskilda villkor (ålder, inkomst, vårdnad m.m.). Kontrollera alltid på csn.se vad du faktiskt kan få." />
    </div>
  );
}

export function BostadsbidragKalkyl() {
  const [barn, setBarn] = useState(1);
  const [hyra, setHyra] = useState(8000);
  const [inkomst, setInkomst] = useState(18000);

  const boendeDel = Math.min(Math.max(hyra - 3000, 0), 6000) * 0.5;
  const barnBonus = barn * 400;
  const inkomstAvdrag = Math.max(0, (inkomst - 12000) * 0.2);
  const uppskattning = Math.max(0, Math.round(boendeDel + barnBonus - inkomstAvdrag));

  return (
    <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-4 space-y-4">
      <h4 className="text-sm font-semibold text-gray-900">
        Uppskatta bostadsbidrag (förenklad)
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <label className="flex flex-col gap-1 text-sm text-gray-700">
          Antal barn
          <select
            value={barn}
            onChange={(e) => setBarn(Number(e.target.value))}
            className="rounded-md border border-gray-300 px-3 py-2 bg-white"
          >
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm text-gray-700">
          Hyra / avgift (kr/mån)
          <input
            type="number"
            min={0}
            step={500}
            value={hyra}
            onChange={(e) => setHyra(Number(e.target.value) || 0)}
            className="rounded-md border border-gray-300 px-3 py-2 bg-white"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-gray-700">
          Inkomst (kr/mån)
          <input
            type="number"
            min={0}
            step={1000}
            value={inkomst}
            onChange={(e) => setInkomst(Number(e.target.value) || 0)}
            className="rounded-md border border-gray-300 px-3 py-2 bg-white"
          />
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 text-sm max-w-sm">
        <ResultBox
          label="Uppskattat bidrag / mån"
          value={`${uppskattning.toLocaleString("sv-SE")} kr`}
          highlight
        />
      </div>
      <Disclaimer text="Endast en grov illustration – den riktiga formeln hos Försäkringskassan är mer komplex." />
    </div>
  );
}

function ResultBox({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-md border p-3 ${
        highlight ? "bg-white border-blue-200" : "bg-white border-gray-200"
      }`}
    >
      <p className="text-gray-500">{label}</p>
      <p className={`font-semibold ${highlight ? "text-blue-700 text-lg" : "text-gray-900"}`}>
        {value}
      </p>
    </div>
  );
}

function Disclaimer({ text }: { text: string }) {
  return <p className="text-xs text-gray-500">{text}</p>;
}

export function CalculatorFor({ bidragId }: { bidragId: string }) {
  if (bidragId === "barnbidrag") return <BarnbidragKalkyl />;
  if (bidragId === "rot-rut") return <RotRutKalkyl />;
  if (bidragId === "studiebidrag") return <CsnKalkyl />;
  if (bidragId === "bostadsbidrag") return <BostadsbidragKalkyl />;
  return null;
}

export const CALCULATOR_IDS = new Set([
  "barnbidrag",
  "rot-rut",
  "studiebidrag",
  "bostadsbidrag",
]);