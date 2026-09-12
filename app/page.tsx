"use client";

import { useMemo, useState } from "react";
import { categories, type Bidrag } from "@/lib/bidrag";
import {
  emptySituation,
  getPersonalizedBidrag,
  type Situation,
} from "@/lib/personalize";

const questions: {
  key: keyof Situation;
  label: string;
}[] = [
  { key: "hasChildren", label: "Har du barn under 16 år?" },
  { key: "isStudent", label: "Studerar du?" },
  { key: "isBusiness", label: "Driver du eller planerar du företag?" },
  { key: "isSenior", label: "Är du pensionär eller snart pensionär?" },
  { key: "lowIncome", label: "Har du låg inkomst just nu?" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [situation, setSituation] = useState<Situation>(emptySituation);
  const [showForm, setShowForm] = useState(true);

  const personalized = useMemo(
    () => getPersonalizedBidrag(situation),
    [situation]
  );

  const filtered = useMemo(() => {
    return personalized.filter((b) => {
      const matchesCategory = category === "all" || b.category === category;
      const q = query.toLowerCase().trim();
      const matchesQuery =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.authority.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q)) ||
        b.details?.summary.toLowerCase().includes(q) ||
        b.details?.sections.some(
          (s) =>
            s.heading.toLowerCase().includes(q) ||
            s.content.toLowerCase().includes(q)
        );
      return matchesCategory && matchesQuery;
    });
  }, [personalized, query, category]);

  const answeredCount = Object.values(situation).filter((v) => v !== null).length;

  function setAnswer(key: keyof Situation, value: boolean) {
    setSituation((prev) => ({ ...prev, [key]: value }));
  }

  function resetSituation() {
    setSituation(emptySituation);
    setShowForm(true);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            BidragsGuiden
          </h1>
          <p className="mt-2 text-lg text-gray-600 max-w-2xl">
            Svara på några korta frågor så visar vi bidrag som passar din situation.
          </p>

          {showForm && (
            <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-semibold text-gray-900">Din situation</h2>
                {answeredCount > 0 && (
                  <button
                    type="button"
                    onClick={resetSituation}
                    className="text-sm text-gray-500 hover:text-gray-800"
                  >
                    Rensa svar
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {questions.map((q) => (
                  <div
                    key={q.key}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                  >
                    <span className="text-sm text-gray-700">{q.label}</span>
                    <div className="flex gap-2">
                      <AnswerButton
                        active={situation[q.key] === true}
                        onClick={() => setAnswer(q.key, true)}
                      >
                        Ja
                      </AnswerButton>
                      <AnswerButton
                        active={situation[q.key] === false}
                        onClick={() => setAnswer(q.key, false)}
                      >
                        Nej
                      </AnswerButton>
                    </div>
                  </div>
                ))}
              </div>

              {answeredCount > 0 && (
                <p className="text-sm text-green-700">
                  Visar bidrag anpassade efter dina svar.
                </p>
              )}
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <input
              type="search"
              placeholder="Sök bidrag, myndighet eller ämne..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 py-8">
        <p className="text-sm text-gray-500 mb-4">
          Visar {filtered.length} bidrag
          {answeredCount > 0 ? " anpassade efter din situation" : ""}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            Inga bidrag matchade. Prova att ändra svar eller sökning.
          </div>
        ) : (
          <div className="grid gap-4">
            {filtered.map((b) => (
              <BidragCard key={b.id} bidrag={b} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function AnswerButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
        active
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
      }`}
    >
      {children}
    </button>
  );
}

function BidragCard({ bidrag }: { bidrag: Bidrag }) {
  const [open, setOpen] = useState(false);
  const hasDetails = Boolean(bidrag.details);

  return (
    <article className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold text-gray-900">{bidrag.title}</h2>
          <span className="shrink-0 text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
            {categories.find((c) => c.value === bidrag.category)?.label ??
              bidrag.category}
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-600">{bidrag.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <span>{bidrag.authority}</span>
          {bidrag.amount && (
            <>
              <span>·</span>
              <span className="font-medium text-gray-700">{bidrag.amount}</span>
            </>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {hasDetails && (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              {open ? "Dölj detaljer" : "Visa detaljer"}
            </button>
          )}
          <a
            href={bidrag.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Officiell sida →
          </a>
        </div>
      </div>

      {open && bidrag.details && (
        <div className="border-t border-gray-100 bg-gray-50 px-5 py-5 space-y-5">
          <p className="text-sm text-gray-700 font-medium">
            {bidrag.details.summary}
          </p>
          {bidrag.details.sections.map((section) => (
            <div key={section.heading}>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                {section.heading}
              </h3>
              <p className="text-sm text-gray-600 whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}