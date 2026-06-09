"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Boxes, Settings2, ListChecks, Sparkles, AlertTriangle, Lightbulb,
  Factory, Link2, BookOpen, FileText,
} from "lucide-react";
import { PP_CHAPTERS, PP_GLOSSARY, type PPChapter, type SapObjects } from "@/data/library/pp-knowledge";
import { useI18n } from "@/lib/i18n";

const OBJ_LABELS: { key: keyof SapObjects; he: string }[] = [
  { key: "tcodes", he: "T-Codes" },
  { key: "tables", he: "Tables" },
  { key: "cds", he: "CDS Views" },
  { key: "fiori", he: "Fiori Apps" },
  { key: "bapis", he: "BAPIs" },
  { key: "idocs", he: "IDocs" },
  { key: "programs", he: "Programs" },
];
const MOD_TINT: Record<string, string> = {
  PM: "bg-rose-500/15 text-rose-700",
  "PP-PI": "bg-blue-500/15 text-blue-700",
  PP: "bg-brand/10 text-brand",
};

function Block({ icon, title, items }: { icon: React.ReactNode; title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <section dir="rtl" className="glass rounded-2xl p-5">
      <h2 className="mb-2 flex items-center gap-2 text-sm font-bold text-brand">{icon}{title}</h2>
      <ul className="space-y-1.5 text-sm">
        {items.map((x, i) => (
          <li key={i} className="flex gap-1.5">
            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-brand/50" />
            <span className="leading-relaxed">{x}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function PPChapterDetail({ ch }: { ch: PPChapter }) {
  const { lang } = useI18n();
  const idx = PP_CHAPTERS.findIndex((c) => c.n === ch.n);
  const prev = PP_CHAPTERS[idx - 1];
  const next = PP_CHAPTERS[idx + 1];
  const allCodes = Object.values(ch.objects).flat();
  const glossary = PP_GLOSSARY.filter((g) => allCodes.some((code) => g.term.includes(code)));

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <nav className="flex items-center justify-between text-sm">
        <Link href="/library/pp/" className="inline-flex items-center gap-1.5 text-brand hover:underline">
          <ArrowRight className="size-4 rtl:rotate-180" />
          {lang === "he" ? "מודול PP" : "PP module"}
        </Link>
        <span className="text-xs text-muted-foreground">{ch.n} / {PP_CHAPTERS.length}</span>
      </nav>

      {/* header */}
      <section className="glass rounded-2xl p-5 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
          <FileText className="size-3.5" />
          Chapter {ch.n} · pp.{ch.pages[0]}–{ch.pages[1]}
        </span>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">{ch.he}</h1>
        <p className="text-sm text-muted-foreground">{ch.en}</p>
      </section>

      {/* executive summary */}
      <section dir="rtl" className="glass rounded-2xl p-5">
        <h2 className="mb-2 flex items-center gap-2 text-sm font-bold text-brand"><BookOpen className="size-4" />{lang === "he" ? "תקציר מנהלים" : "Executive summary"}</h2>
        <p className="text-sm leading-relaxed text-slate-700">{ch.summaryHe}</p>
      </section>

      {/* SAP objects */}
      <section dir="rtl" className="glass rounded-2xl p-5">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-brand"><Boxes className="size-4" />{lang === "he" ? "אובייקטי SAP (מתוך הספר)" : "SAP objects"}</h2>
        <div className="space-y-2">
          {OBJ_LABELS.map(({ key, he }) => {
            const items = ch.objects[key];
            if (!items?.length) return null;
            return (
              <div key={key} className="flex flex-wrap items-center gap-1.5">
                <span className="w-20 shrink-0 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{he}</span>
                {items.map((it) => (
                  <span key={it} dir="ltr" className="tech rounded bg-muted px-1.5 py-0.5 text-[11px] font-semibold">{it}</span>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      <Block icon={<Settings2 className="size-4" />} title={lang === "he" ? "מדריך קונפיגורציה" : "Configuration notes"} items={ch.configHe} />
      <Block icon={<ListChecks className="size-4" />} title="Runbook" items={ch.runbookHe} />
      <Block icon={<AlertTriangle className="size-4" />} title={lang === "he" ? "פתרון תקלות" : "Troubleshooting"} items={ch.troubleshootHe} />
      <Block icon={<Sparkles className="size-4" />} title={lang === "he" ? "דפוסי מימוש" : "Implementation patterns"} items={ch.patternsHe} />
      <Block icon={<Lightbulb className="size-4" />} title={lang === "he" ? "לקחים" : "Lessons learned"} items={ch.lessonsHe} />

      {ch.cbcHe && (
        <section dir="rtl" className="glass rounded-2xl border-brand/20 bg-brand-soft/40 p-5">
          <h2 className="mb-1 flex items-center gap-2 text-sm font-bold text-brand"><Factory className="size-4" />{lang === "he" ? "הערת CBC" : "CBC note"}</h2>
          <p className="text-sm leading-relaxed">{ch.cbcHe}</p>
        </section>
      )}

      {/* glossary subset */}
      {glossary.length > 0 && (
        <section dir="rtl" className="glass rounded-2xl p-5">
          <h2 className="mb-2 flex items-center gap-2 text-sm font-bold text-brand"><BookOpen className="size-4" />{lang === "he" ? "מונחון רלוונטי" : "Glossary"}</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {glossary.map((g) => (
              <div key={g.term} className="rounded-lg border border-border/60 bg-card/50 p-2.5 text-sm">
                <span dir="ltr" className="tech font-bold text-brand">{g.term}</span><span className="mx-1">—</span>{g.he}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* cross-links */}
      {ch.related?.length ? (
        <section dir="rtl" className="glass rounded-2xl p-5">
          <h2 className="mb-2 flex items-center gap-2 text-sm font-bold text-muted-foreground"><Link2 className="size-4" />{lang === "he" ? "נושאים קשורים" : "Cross-links"}</h2>
          <div className="flex flex-wrap gap-1.5">
            {ch.related.map((r, i) => (
              <Link key={i} href={r.href} className={`rounded-lg px-2 py-1 text-[11px] font-semibold transition-opacity hover:opacity-80 ${MOD_TINT[r.module]}`}>
                {r.module} · {r.labelHe}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* prev / next */}
      <nav className="flex items-center justify-between gap-2">
        {prev ? (
          <Link href={`/library/pp/chapter-${String(prev.n).padStart(2, "0")}/`} className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-card/60 p-3 text-sm hover:border-brand">
            <ArrowRight className="size-4 rtl:rotate-180" />
            <span dir="rtl" className="truncate"><span className="text-[10px] text-muted-foreground">הקודם</span><br />{prev.n}. {prev.he}</span>
          </Link>
        ) : <span className="flex-1" />}
        {next ? (
          <Link href={`/library/pp/chapter-${String(next.n).padStart(2, "0")}/`} className="flex flex-1 items-center justify-end gap-2 rounded-xl border border-border bg-card/60 p-3 text-end text-sm hover:border-brand">
            <span dir="rtl" className="truncate"><span className="text-[10px] text-muted-foreground">הבא</span><br />{next.n}. {next.he}</span>
            <ArrowLeft className="size-4 rtl:rotate-180" />
          </Link>
        ) : <span className="flex-1" />}
      </nav>
    </motion.div>
  );
}
