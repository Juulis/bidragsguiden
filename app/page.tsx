"use client";

import { useMemo, useState } from "react";
import { bidrag, categories, type Bidrag } from "@/lib/bidrag";

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    return bidrag.filter((b) => {
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
  }, [query, category]);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            BidragsGuiden
          </h1>
          <p className="mt-2 text-lg text-gray-600 max-w-2xl">
            Hitta alla offentliga bidrag, stöd och ersättningar du har rätt till –
            med tydlig info direkt på sidan.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
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
          Visar {filtered.length} av {bidrag.length} bidrag
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            Inga bidrag matchade din sökning.
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