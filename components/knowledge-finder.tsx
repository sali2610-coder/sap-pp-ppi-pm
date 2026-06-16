import Link from "next/link";
import { Search, Sparkles, ArrowLeft } from "lucide-react";

// D2 search-first entry for the Knowledge Center.
// IA-level only: leads with the two existing search surfaces (Copilot Q&A +
// Solution Finder) and fast journey jumps. The global command palette is D6.

type Group = { slug: string; he: string; accent: string };

export function KnowledgeFinder({ groups }: { groups: Group[] }) {
  return (
    <section
      dir="rtl"
      className="surface relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-7"
    >
      {/* ambient brand wash */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 -start-16 size-64 rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "radial-gradient(circle, #d62027, transparent 70%)" }}
      />

      <div className="relative">
        <p className="eyebrow mb-1.5 text-brand">מצא מהר · SEARCH-FIRST</p>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-[1.75rem]">
          מה תרצה לעשות?
        </h2>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">
          התחל מחיפוש — שאל שאלה חופשית או חפש לפי צורך עסקי. לחלופין בחר מסע מתוך השבעה שלמטה.
        </p>

        {/* Two primary search surfaces */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Link
            href="/solutions/"
            className="lift group flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 ps-4"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-brand shadow-sm ring-1 ring-slate-200">
              <Search className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-extrabold text-slate-900">חיפוש לפי צורך עסקי</span>
              <span className="block truncate text-xs text-slate-500">'קליטת סחורה', 'ניהול אצווה' → תהליך, טבלאות, Fiori, תקלות</span>
            </span>
            <ArrowLeft className="ms-auto size-4 shrink-0 text-slate-400 transition-transform group-hover:-translate-x-1" />
          </Link>

          <Link
            href="/copilot/"
            className="lift group flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 ps-4"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-brand shadow-sm ring-1 ring-slate-200">
              <Sparkles className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-extrabold text-slate-900">שאל את הקופיילוט</span>
              <span className="block truncate text-xs text-slate-500">שאלה חופשית — תשובה ממאגר הידע של NEO בלבד</span>
            </span>
            <ArrowLeft className="ms-auto size-4 shrink-0 text-slate-400 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>

        {/* Journey jumps */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="me-1 text-xs font-bold text-slate-400">קפיצה למסע:</span>
          {groups.map((g) => (
            <a
              key={g.slug}
              href={`#j-${g.slug}`}
              className="tap rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
            >
              <span className="me-1.5 inline-block size-2 translate-y-px rounded-full align-middle" style={{ background: g.accent }} />
              {g.he}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
