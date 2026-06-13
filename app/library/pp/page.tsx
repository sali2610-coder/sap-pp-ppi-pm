"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, ArrowLeft, BookOpen, ChevronDown, Search, Factory, Wrench, FlaskConical,
  ListChecks, Lightbulb, Wrench as Tool, AlertTriangle, Settings2, Sparkles, Boxes, Link2,
} from "lucide-react";
import { PP_CHAPTERS, PP_EXEC_HE, PP_GLOSSARY, PP_STATS, type PPChapter, type SapObjects } from "@/data/library/pp-knowledge";
import { useI18n } from "@/lib/i18n";
import { playPing } from "@/lib/sound";
import { Highlight } from "@/components/highlight";
import { EmptyState } from "@/components/ui/empty-state";

const OBJ_LABELS: { key: keyof SapObjects; he: string }[] = [
  { key: "tcodes", he: "T-Codes" },
  { key: "tables", he: "Tables" },
  { key: "cds", he: "CDS Views" },
  { key: "fiori", he: "Fiori Apps" },
  { key: "bapis", he: "BAPIs" },
  { key: "idocs", he: "IDocs" },
  { key: "programs", he: "Programs" },
];

const MOD_TINT: Record<string, string> = { PM: "bg-rose-500/15 text-rose-700", "PP-PI": "bg-blue-500/15 text-blue-700", PP: "bg-brand/10 text-brand" };

function ObjectChips({ objects, query }: { objects: SapObjects; query: string }) {
  return (
    <div className="space-y-1.5">
      {OBJ_LABELS.map(({ key, he }) => {
        const items = objects[key];
        if (!items?.length) return null;
        return (
          <div key={key} className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{he}</span>
            {items.map((it) => (
              <span key={it} dir="ltr" className="tech rounded bg-muted px-1.5 py-0.5 text-[11px] font-semibold text-foreground">
                <Highlight text={it} query={query} />
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function KnowledgeBlock({ icon, title, items }: { icon: React.ReactNode; title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="space-y-1">
      <p className="flex items-center gap-1.5 text-xs font-bold text-brand">{icon}{title}</p>
      <ul className="space-y-1 ps-1 text-sm">
        {items.map((x, i) => (
          <li key={i} className="flex gap-1.5">
            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-brand/50" />
            <span className="leading-relaxed">{x}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChapterCard({ ch, query }: { ch: PPChapter; query: string }) {
  const [open, setOpen] = useState(false);
  return (
    <section id={`ch${ch.n}`} className="glass scroll-mt-24 overflow-hidden rounded-2xl">
      <button onClick={() => { playPing(); setOpen((v) => !v); }} className="flex w-full items-center gap-3 p-4 text-start">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-sm font-bold text-brand-foreground shadow-lg shadow-brand/30">
          {ch.n}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-bold leading-tight">{ch.he}</span>
          <span className="text-[11px] text-muted-foreground">{ch.en} · pp.{ch.pages[0]}–{ch.pages[1]}</span>
        </span>
        <ChevronDown className={`size-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <div className="px-4 pb-3">
        <p dir="rtl" className="text-sm leading-relaxed text-slate-700">
          <Highlight text={ch.summaryHe} query={query} />
        </p>
        <Link
          href={`/library/pp/chapter-${String(ch.n).padStart(2, "0")}/`}
          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
        >
          עמוד פרק מלא <ArrowLeft className="size-3 rtl:rotate-180" />
        </Link>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div dir="rtl" className="space-y-4 border-t border-border/50 p-4">
              <div className="rounded-xl border border-border/50 bg-background/50 p-3">
                <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-brand"><Boxes className="size-3.5" />אובייקטי SAP (מתוך הספר)</p>
                <ObjectChips objects={ch.objects} query={query} />
              </div>
              <KnowledgeBlock icon={<Settings2 className="size-3.5" />} title="מדריך קונפיגורציה" items={ch.configHe} />
              <KnowledgeBlock icon={<ListChecks className="size-3.5" />} title="Runbook — צעדים תפעוליים" items={ch.runbookHe} />
              <KnowledgeBlock icon={<Sparkles className="size-3.5" />} title="דפוסי מימוש" items={ch.patternsHe} />
              <KnowledgeBlock icon={<AlertTriangle className="size-3.5" />} title="פתרון תקלות" items={ch.troubleshootHe} />
              <KnowledgeBlock icon={<Lightbulb className="size-3.5" />} title="לקחים" items={ch.lessonsHe} />
              {ch.cbcHe && (
                <div className="rounded-xl border border-brand/20 bg-brand-soft/50 p-3">
                  <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-brand"><Factory className="size-3.5" />הערת CBC</p>
                  <p className="text-sm leading-relaxed">{ch.cbcHe}</p>
                </div>
              )}
              {ch.related?.length ? (
                <div>
                  <p className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-muted-foreground"><Link2 className="size-3.5" />נושאים קשורים (Cross-links)</p>
                  <div className="flex flex-wrap gap-1.5">
                    {ch.related.map((r, i) => (
                      <Link key={i} href={r.href} className={`rounded-lg px-2 py-1 text-[11px] font-semibold transition-opacity hover:opacity-80 ${MOD_TINT[r.module]}`}>
                        {r.module} · {r.labelHe}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default function PPLibraryPage() {
  const { lang } = useI18n();
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const chapters = useMemo(() => {
    if (!query) return PP_CHAPTERS;
    return PP_CHAPTERS.filter((c) => {
      const hay = [c.he, c.en, c.summaryHe, ...Object.values(c.objects).flat()].join(" ").toLowerCase();
      return query.split(/\s+/).every((t) => hay.includes(t));
    });
  }, [query]);

  return (
    <div className="space-y-6">
      <Link href="/library/" className="inline-flex items-center gap-1.5 text-sm text-brand hover:underline">
        <ArrowRight className="size-4 rtl:rotate-180" />
        {lang === "he" ? "חזרה לספרייה" : "Back to library"}
      </Link>

      <section className="space-y-3 text-center animate-float-in">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
          <FlaskConical className="size-3.5" /> PP · Production Planning · Knowledge Module
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{lang === "he" ? "מודול ידע — תכנון ייצור (PP)" : "PP Knowledge Module"}</h1>
        <p dir="rtl" className="mx-auto max-w-3xl text-start text-sm leading-relaxed text-muted-foreground sm:text-center">{PP_EXEC_HE}</p>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-lg border border-border bg-card px-2.5 py-1">{PP_STATS.chapters} {lang === "he" ? "פרקים" : "chapters"}</span>
          <span className="rounded-lg border border-border bg-card px-2.5 py-1">{PP_STATS.pages} pages</span>
          <span className="rounded-lg border border-border bg-card px-2.5 py-1">{PP_STATS.tcodes} T-Codes</span>
          <span className="rounded-lg border border-border bg-card px-2.5 py-1">{PP_STATS.glossary} {lang === "he" ? "מונחים" : "glossary"}</span>
          <span className="rounded-lg border border-border bg-card px-2.5 py-1">{PP_STATS.crossLinks} cross-links</span>
        </div>
      </section>

      {/* search + chapter nav */}
      <div className="glass sticky top-[4.5rem] z-30 space-y-3 rounded-2xl p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={lang === "he" ? "חיפוש בפרקים, T-Codes, אובייקטים…" : "Search chapters, T-Codes, objects…"}
            className="w-full rounded-xl border border-input bg-card px-4 py-2.5 pe-9 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/30" dir="rtl" />
        </div>
        <nav className="flex flex-wrap gap-1.5">
          {PP_CHAPTERS.map((c) => (
            <Link key={c.n} href={`/library/pp/chapter-${String(c.n).padStart(2, "0")}/`} className="rounded-lg bg-muted/60 px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-brand/10 hover:text-brand">
              {c.n}. {c.he}
            </Link>
          ))}
        </nav>
      </div>

      <div className="space-y-4">
        {chapters.map((c) => <ChapterCard key={c.n} ch={c} query={query} />)}
        {chapters.length === 0 && <EmptyState title={lang === "he" ? "אין תוצאות" : "No results"} hint={`"${q}"`} />}
      </div>

      {/* glossary */}
      <section dir="rtl" className="glass rounded-2xl p-5">
        <h2 className="mb-3 flex items-center gap-2 font-bold text-brand"><BookOpen className="size-4" />{lang === "he" ? "גלוסר (דו-לשוני)" : "Glossary"}</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {PP_GLOSSARY.map((g) => (
            <div key={g.term} className="rounded-lg border border-border/60 bg-card/50 p-2.5 text-sm">
              <span dir="ltr" className="tech font-bold text-brand">{g.term}</span>
              <span className="mx-1">—</span>{g.he}
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap justify-center gap-2">
        <Link href="/pp-pi/" className="flex items-center gap-1.5 rounded-xl border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-sm font-semibold text-blue-700">
          <FlaskConical className="size-4" />{lang === "he" ? "מודול PP-PI (ייצור תהליכי)" : "PP-PI module"}<ArrowLeft className="size-4 rtl:rotate-180" />
        </Link>
        <Link href="/pm/" className="flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm font-semibold text-rose-700">
          <Wrench className="size-4" />{lang === "he" ? "מודול PM (אחזקה)" : "PM module"}<ArrowLeft className="size-4 rtl:rotate-180" />
        </Link>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {lang === "he"
          ? "תוכן טרנספורמטיבי בעברית (סיכומים, גלוסר, Runbooks, דפוסים) — ללא שעתוק טקסט מקור. מזהי SAP חולצו מהספר."
          : "Transformative Hebrew knowledge (summaries, glossary, runbooks, patterns) — no verbatim source text. SAP identifiers extracted from the book."}
      </p>
    </div>
  );
}
