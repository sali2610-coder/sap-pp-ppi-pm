"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Boxes, Settings2, ListChecks, Sparkles, AlertTriangle, Lightbulb,
  Factory, Link2, BookOpen, FileText, ListTree, GraduationCap,
} from "lucide-react";
import { PP_CHAPTERS, PP_GLOSSARY, type PPChapter, type SapObjects } from "@/data/library/pp-knowledge";
import { PP_DEEP, type DeepUnit } from "@/data/library/pp-deep";
import { slugOf } from "@/lib/pp-object-index";
import PP_TOC from "@/data/library/pp-toc.json";
import { PPFlow } from "@/components/pp-flow";
import { PPTextbookLessons, hasTextbook } from "@/components/pp-textbook-view";
import { useI18n } from "@/lib/i18n";
import { ChevronDown, Briefcase } from "lucide-react";

const TOC = PP_TOC as Record<string, { id: string; title: string }[]>;
const pad = (n: number) => String(n).padStart(2, "0");

const OBJ_LABELS: { key: keyof SapObjects; he: string }[] = [
  { key: "tcodes", he: "T-Codes" }, { key: "tables", he: "Tables" }, { key: "cds", he: "CDS Views" },
  { key: "fiori", he: "Fiori Apps" }, { key: "bapis", he: "BAPIs" }, { key: "idocs", he: "IDocs" }, { key: "programs", he: "Programs" },
];
const MOD_TINT: Record<string, string> = { PM: "bg-rose-500/15 text-rose-700", "PP-PI": "bg-blue-500/15 text-blue-700", PP: "bg-brand/10 text-brand" };

function Block({ id, icon, title, items }: { id: string; icon: React.ReactNode; title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <section id={id} dir="rtl" className="glass scroll-mt-24 rounded-2xl p-5">
      <h2 className="mb-2 flex items-center gap-2 text-sm font-bold text-brand">{icon}{title}</h2>
      <ul className="space-y-1.5 text-sm">
        {items.map((x, i) => (
          <li key={i} className="flex gap-1.5"><span className="mt-1.5 size-1 shrink-0 rounded-full bg-brand/50" /><span className="leading-relaxed">{x}</span></li>
        ))}
      </ul>
    </section>
  );
}

function UnitList({ label, items }: { label: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div>
      <p className="text-[11px] font-bold text-brand">{label}</p>
      <ul className="mt-0.5 space-y-1 text-sm">
        {items.map((x, i) => (
          <li key={i} className="flex gap-1.5"><span className="mt-1.5 size-1 shrink-0 rounded-full bg-brand/40" /><span className="leading-relaxed">{x}</span></li>
        ))}
      </ul>
    </div>
  );
}

function DeepUnitCard({ u, lang }: { u: DeepUnit; lang: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card/40">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center gap-2 p-3 text-start">
        <span dir="ltr" className="tech shrink-0 rounded bg-brand/10 px-1.5 py-0.5 text-xs font-bold text-brand">{u.id}</span>
        <span className="min-w-0 flex-1 text-sm font-semibold">{u.titleHe}</span>
        <span dir="ltr" className="hidden text-[10px] text-muted-foreground sm:block">{u.titleEn}</span>
        <ChevronDown className={`size-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
            <div className="space-y-3 border-t border-border/40 p-3">
              <p className="text-sm leading-relaxed text-slate-700">{u.explanationHe}</p>
              {u.scenarioHe && (
                <div className="rounded-lg border border-border/50 bg-muted/30 p-2.5">
                  <p className="text-[11px] font-bold text-brand">{lang === "he" ? "תרחיש עסקי" : "Business scenario"}</p>
                  <p className="mt-0.5 text-sm leading-relaxed">{u.scenarioHe}</p>
                </div>
              )}
              <UnitList label={lang === "he" ? "דוגמת קונפיגורציה" : "Configuration example"} items={u.configHe} />
              <UnitList label={lang === "he" ? "דוגמת נתוני אב" : "Master-data example"} items={u.masterDataHe} />
              <UnitList label={lang === "he" ? "תרחישי פתרון תקלות" : "Troubleshooting"} items={u.troubleshootHe} />
              <UnitList label={lang === "he" ? "טיפים למימוש" : "Implementation tips"} items={u.tipsHe} />
              <UnitList label={lang === "he" ? "מלכודות פרויקט (Consultant pitfalls)" : "Consultant pitfalls"} items={u.pitfallsHe} />
              {u.cbcHe && (
                <div className="rounded-lg border border-brand/20 bg-brand-soft/50 p-2.5">
                  <p className="text-[11px] font-bold text-brand">הערת CBC</p>
                  <p className="mt-0.5 text-sm leading-relaxed">{u.cbcHe}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PPChapterDetail({ ch }: { ch: PPChapter }) {
  const { lang } = useI18n();
  const idx = PP_CHAPTERS.findIndex((c) => c.n === ch.n);
  const prev = PP_CHAPTERS[idx - 1];
  const next = PP_CHAPTERS[idx + 1];
  const allCodes = Object.values(ch.objects).flat();
  const glossary = PP_GLOSSARY.filter((g) => allCodes.some((code) => g.term.includes(code)));
  const subs = TOC[String(ch.n)] ?? [];
  const deep = PP_DEEP[String(ch.n)] ?? [];
  const textbook = hasTextbook(ch.n);

  // sticky side-nav sections (Learning-Hub style)
  const sideNav = [
    ["overview", lang === "he" ? "סקירה" : "Overview"],
    ["toc", lang === "he" ? "תוכן הפרק" : "Contents"],
    (textbook || deep.length) && ["learning", lang === "he" ? "תוכן לימודי" : "Learning content"],
    ["flow", lang === "he" ? "תרשים תהליך" : "Process flow"],
    ["objects", lang === "he" ? "אובייקטי SAP" : "SAP objects"],
    ch.configHe?.length && ["config", lang === "he" ? "קונפיגורציה" : "Configuration"],
    ch.runbookHe?.length && ["runbook", "Runbook"],
    ch.troubleshootHe?.length && ["trouble", lang === "he" ? "פתרון תקלות" : "Troubleshooting"],
    glossary.length && ["glossary", lang === "he" ? "מונחון" : "Glossary"],
  ].filter(Boolean) as [string, string][];

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      {/* breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/library/" className="text-brand hover:underline">{lang === "he" ? "ספרייה" : "Library"}</Link><span>/</span>
        <Link href="/library/pp/" className="text-brand hover:underline">PP</Link><span>/</span>
        <span>{lang === "he" ? `פרק ${ch.n}` : `Chapter ${ch.n}`}</span>
      </nav>

      <section className="glass rounded-2xl p-5 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
          <GraduationCap className="size-3.5" />Chapter {ch.n} · pp.{ch.pages[0]}–{ch.pages[1]} · {subs.length} {lang === "he" ? "תת-פרקים" : "subchapters"}
        </span>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">{ch.he}</h1>
        <p className="text-sm text-muted-foreground">{ch.en}</p>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1fr_220px]">
        <div className="space-y-5">
          <section id="overview" dir="rtl" className="glass scroll-mt-24 rounded-2xl p-5">
            <h2 className="mb-2 flex items-center gap-2 text-sm font-bold text-brand"><BookOpen className="size-4" />{lang === "he" ? "תקציר מנהלים" : "Executive summary"}</h2>
            <p className="text-sm leading-relaxed text-slate-700">{ch.summaryHe}</p>
          </section>

          {/* chapter table of contents — real subchapters (hidden for textbook chapters; the accordion below is the TOC) */}
          {!textbook && (
          <section id="toc" dir="rtl" className="glass scroll-mt-24 rounded-2xl p-5">
            <h2 className="mb-2 flex items-center gap-2 text-sm font-bold text-brand"><ListTree className="size-4" />{lang === "he" ? "תוכן הפרק (תת-פרקים)" : "Chapter contents"}</h2>
            <ol className="space-y-1 text-sm">
              {subs.map((s) => (
                <li key={s.id} className={s.id.split(".").length > 2 ? "ms-5" : ""}>
                  <span dir="ltr" className="tech me-2 text-xs font-bold text-brand">{s.id}</span>
                  <span dir="ltr">{s.title}</span>
                </li>
              ))}
              {subs.length === 0 && <li className="text-xs text-muted-foreground">—</li>}
            </ol>
          </section>
          )}

          {textbook ? (
            <PPTextbookLessons n={ch.n} />
          ) : deep.length > 0 ? (
            <section id="learning" dir="rtl" className="glass scroll-mt-24 rounded-2xl p-5">
              <h2 className="mb-1 flex items-center gap-2 text-sm font-bold text-brand"><Briefcase className="size-4" />{lang === "he" ? "תוכן לימודי מעמיק (רמת SAP Press)" : "Deep learning content"}</h2>
              <p className="mb-3 text-xs text-muted-foreground">{lang === "he" ? "הסבר · תרחיש עסקי · קונפיגורציה · נתוני אב · פתרון תקלות · טיפים · מלכודות · הערות CBC" : "Explanation · scenario · config · master data · troubleshooting · tips · pitfalls · CBC"}</p>
              <div className="space-y-2">
                {deep.map((u) => <DeepUnitCard key={u.id} u={u} lang={lang} />)}
              </div>
            </section>
          ) : null}

          <div id="flow"><PPFlow n={ch.n} /></div>

          {/* SAP objects → drill-down links */}
          <section id="objects" dir="rtl" className="glass scroll-mt-24 rounded-2xl p-5">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-brand"><Boxes className="size-4" />{lang === "he" ? "אובייקטי SAP (לחיצה לפירוט)" : "SAP objects (drill-down)"}</h2>
            <div className="space-y-2">
              {OBJ_LABELS.map(({ key, he }) => {
                const items = ch.objects[key];
                if (!items?.length) return null;
                return (
                  <div key={key} className="flex flex-wrap items-center gap-1.5">
                    <span className="w-20 shrink-0 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{he}</span>
                    {items.map((it) => (
                      <Link key={it} href={`/library/pp/object/${slugOf(it)}/`} dir="ltr" className="tech rounded bg-muted px-1.5 py-0.5 text-[11px] font-semibold transition-colors hover:bg-brand/15 hover:text-brand">{it}</Link>
                    ))}
                  </div>
                );
              })}
            </div>
          </section>

          <Block id="config" icon={<Settings2 className="size-4" />} title={lang === "he" ? "מדריך קונפיגורציה (Walkthrough)" : "Configuration walkthrough"} items={ch.configHe} />
          <Block id="runbook" icon={<ListChecks className="size-4" />} title="Runbook" items={ch.runbookHe} />
          <Block id="examples" icon={<GraduationCap className="size-4" />} title={lang === "he" ? "דוגמת מימוש" : "Implementation example"} items={ch.patternsHe} />
          <Block id="trouble" icon={<AlertTriangle className="size-4" />} title={lang === "he" ? "תרחישי פתרון תקלות" : "Troubleshooting"} items={ch.troubleshootHe} />
          <Block id="lessons" icon={<Lightbulb className="size-4" />} title={lang === "he" ? "לקחים" : "Lessons learned"} items={ch.lessonsHe} />

          {ch.cbcHe && (
            <section dir="rtl" className="glass rounded-2xl border-brand/20 bg-brand-soft/40 p-5">
              <h2 className="mb-1 flex items-center gap-2 text-sm font-bold text-brand"><Factory className="size-4" />{lang === "he" ? "הערת CBC מעשית" : "CBC practical note"}</h2>
              <p className="text-sm leading-relaxed">{ch.cbcHe}</p>
            </section>
          )}

          {glossary.length > 0 && (
            <section id="glossary" dir="rtl" className="glass scroll-mt-24 rounded-2xl p-5">
              <h2 className="mb-2 flex items-center gap-2 text-sm font-bold text-brand"><BookOpen className="size-4" />{lang === "he" ? "מונחון רלוונטי" : "Glossary"}</h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {glossary.map((g) => (
                  <div key={g.term} className="rounded-lg border border-border/60 bg-card/50 p-2.5 text-sm"><span dir="ltr" className="tech font-bold text-brand">{g.term}</span><span className="mx-1">—</span>{g.he}</div>
                ))}
              </div>
            </section>
          )}

          {ch.related?.length ? (
            <section dir="rtl" className="glass rounded-2xl p-5">
              <h2 className="mb-2 flex items-center gap-2 text-sm font-bold text-muted-foreground"><Link2 className="size-4" />{lang === "he" ? "נושאים קשורים" : "Cross-links"}</h2>
              <div className="flex flex-wrap gap-1.5">
                {ch.related.map((r, i) => (
                  <Link key={i} href={r.href} className={`rounded-lg px-2 py-1 text-[11px] font-semibold transition-opacity hover:opacity-80 ${MOD_TINT[r.module]}`}>{r.module} · {r.labelHe}</Link>
                ))}
              </div>
            </section>
          ) : null}

          <nav className="flex items-center justify-between gap-2">
            {prev ? (
              <Link href={`/library/pp/chapter-${pad(prev.n)}/`} className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-card/60 p-3 text-sm hover:border-brand">
                <ArrowRight className="size-4 rtl:rotate-180" /><span dir="rtl" className="truncate"><span className="text-[10px] text-muted-foreground">{lang === "he" ? "הקודם" : "Prev"}</span><br />{prev.n}. {prev.he}</span>
              </Link>
            ) : <span className="flex-1" />}
            {next ? (
              <Link href={`/library/pp/chapter-${pad(next.n)}/`} className="flex flex-1 items-center justify-end gap-2 rounded-xl border border-border bg-card/60 p-3 text-end text-sm hover:border-brand">
                <span dir="rtl" className="truncate"><span className="text-[10px] text-muted-foreground">{lang === "he" ? "הבא" : "Next"}</span><br />{next.n}. {next.he}</span><ArrowLeft className="size-4 rtl:rotate-180" />
              </Link>
            ) : <span className="flex-1" />}
          </nav>
        </div>

        {/* sticky side-nav (Learning Hub feel) */}
        <aside className="hidden lg:block">
          <div className="glass sticky top-24 rounded-2xl p-4">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{lang === "he" ? "בפרק זה" : "On this page"}</p>
            <nav dir="rtl" className="space-y-1 text-sm">
              {sideNav.map(([id, label]) => (
                <a key={id} href={`#${id}`} className="block rounded-lg px-2 py-1 text-muted-foreground transition-colors hover:bg-brand/10 hover:text-brand">{label}</a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
