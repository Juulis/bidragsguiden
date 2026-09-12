"use client";

import { useMemo, useState } from "react";

/** Ungefärliga flerbarnstillägg (kan ändras – endast vägledning) */
const FLERBARN: Record<number, number> = {
  1: 0,
  2: 150,
  3: 580,
  4: 1610,
  5: 2890,
};

const GRUND = 1250;

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
                {n} {n === 1 ? "barn" : "barn"}
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
        <div className="rounded-md bg-white border border-gray-200 p-3">
          <p className="text-gray-500">Grundbelopp</p>
          <p className="font-semibold text-gray-900">
            {children * GRUND} kr
          </p>
        </div>
        <div className="rounded-md bg-white border border-gray-200 p-3">
          <p className="text-gray-500">Flerbarnstillägg</p>
          <p className="font-semibold text-gray-900">{tillagg} kr</p>
        </div>
        <div className="rounded-md bg-white border border-blue-200 p-3">
          <p className="text-gray-500">
            {shared ? "Per förälder / mån" : "Totalt / mån"}
          </p>
          <p className="font-semibold text-blue-700 text-lg">
            {shared ? perParent : total} kr
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Ungefärliga belopp för vägledning. Kontrollera alltid aktuella siffror hos
        Försäkringskassan.
      </p>
    </div>
  );
}

export function RotRutKalkyl() {
  const [typ, setTyp] = useState<"rot" | "rut">("rot");
  const [arbete, setArbete] = useState(20000);

  const max = typ === "rot" ? 50000 : 75000;
  // Ungefär 30% av arbetskostnaden blir skattereduktion (förenklad modell)
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
        <div className="rounded-md bg-white border border-gray-200 p-3">
          <p className="text-gray-500">Arbetskostnad</p>
          <p className="font-semibold text-gray-900">{arbete.toLocaleString("sv-SE")} kr</p>
        </div>
        <div className="rounded-md bg-white border border-gray-200 p-3">
          <p className="text-gray-500">Uppskattat avdrag (~30%)</p>
          <p className="font-semibold text-gray-900">{avdrag.toLocaleString("sv-SE")} kr</p>
        </div>
        <div className="rounded-md bg-white border border-blue-200 p-3">
          <p className="text-gray-500">Du betalar ca</p>
          <p className="font-semibold text-blue-700 text-lg">
            {attBetala.toLocaleString("sv-SE")} kr
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Förenklad beräkning. Faktisk procentsats och tak kan skilja sig – kontrollera hos
        Skatteverket.
      </p>
    </div>
  );
}

export function CalculatorFor({ bidragId }: { bidragId: string }) {
  if (bidragId === "barnbidrag") return <BarnbidragKalkyl />;
  if (bidragId === "rot-rut") return <RotRutKalkyl />;
  return null;
}