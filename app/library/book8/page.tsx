"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Layers, Lightbulb, Wrench, AlertTriangle, CheckCircle2, MessageCircleQuestion, KeyRound, Workflow, Database } from "lucide-react";
import { BookReader } from "@/components/book-reader";
import book8 from "@/data/library/book8-full.json";
import { useI18n } from "@/lib/i18n";
import { playPing } from "@/lib/sound";

interface FlowStep { he: string; code?: string; note?: string }
interface QA { qHe: string; aHe: string }
interface RelatedLink { labelHe: string; href: string }
interface Section {
  id: string; titleHe: string; titleEn: string; depth: number;
  execHe: string; beginnerHe: string; consultantHe: string;
  purposeHe: string; processExampleHe: string; scenarioHe: string;
  navHe: string[]; tables: string[]; tcodes: string[]; fiori: string[];
  configHe: string[]; flow?: FlowStep[]; masterDataHe?: string[];
  mistakesHe: string[]; troubleshootHe: string[]; bestPracticeHe: string[];
  interviewHe: QA[]; takeawaysHe: string[]; relatedHe?: RelatedLink[];
}
interface Chapter { n: number; titleHe: string; titleEn: string; introHe: string; sections: Section[] }

const DATA = book8 as { book: string; titleHe: string; module: string; chapters: Chapter[] };

/* one labeled prose facet */
function Facet({ label, text, tone = "slate" }: { label: string; text?: string; tone?: "slate" | "brand" | "amber" }) {
  if (!text) return null;
  const t = { slate: "text-ink-3", brand: "text-brand", amber: "text-amber-600" }[tone];
  return (
    <div>
      <p className={`text-[10px] font-bold uppercase tracking-wide ${t}`}>{label}</p>
      <p className="mt-0.5 whitespace-pre-line text-xs leading-relaxed text-ink-2">{text}</p>
    </div>
  );
}

/* labeled bullet list */
function Bullets({ label, items, icon, tone = "slate" }: { label: string; items?: string[]; icon?: React.ReactNode; tone?: "slate" | "green" | "amber" | "rose" }) {
  if (!items?.length) return null;
  const t = { slate: "text-ink-3", green: "text-emerald-600", amber: "text-amber-600", rose: "text-rose-600" }[tone];
  return (
    <div>
      <p className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide ${t}`}>{icon}{label}</p>
      <ul className="mt-1 space-y-1">
        {items.map((it, i) => (
          <li key={i} className="flex gap-1.5 text-xs leading-relaxed text-ink-2">
            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-slate-300" />
            <span className="whitespace-pre-line">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* code identifier chips (verbatim SAP, ltr) */
function Codes({ label, items, cls }: { label: string; items: string[]; cls: string }) {
  if (!items?.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-1">
      <span className="text-[10px] font-bold text-ink-3">{label}</span>
      {items.map((c) => (
        <span key={c} dir="ltr" className={`tech rounded px-1.5 py-0.5 text-[11px] font-bold ${cls}`}>{c}</span>
      ))}
    </div>
  );
}

function SectionCard({ s }: { s: Section }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-border/40 first:border-t-0" style={{ marginInlineStart: s.depth ? `${s.depth * 0.75}rem` : undefined }}>
      <button onClick={() => { playPing(); setOpen((v) => !v); }} className="flex w-full items-center gap-2 py-3 text-start">
        <span className="tech rounded-md bg-brand/10 px-2 py-0.5 text-xs font-bold text-brand">{s.id}</span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold">{s.titleHe}</span>
          <span dir="ltr" className="block text-[11px] text-muted-foreground">{s.titleEn}</span>
        </span>
        <ChevronDown className={`size-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
            <div className="space-y-4 rounded-xl bg-surface/60 p-4">
              {/* three explanation levels */}
              <div className="grid-adaptive-sm">
                <Facet label="מנהלים (Executive)" text={s.execHe} tone="brand" />
                <Facet label="מתחילים (Beginner)" text={s.beginnerHe} />
                <Facet label="יועצים (Consultant)" text={s.consultantHe} />
              </div>
              {/* context + examples */}
              <div className="grid-adaptive-sm border-t border-border/30 pt-3">
                <Facet label="מטרה עסקית" text={s.purposeHe} />
                <Facet label="דוגמת תהליך" text={s.processExampleHe} />
                <Facet label="דוגמת הארגון" text={s.scenarioHe} tone="amber" />
              </div>
              {/* reference identifiers (verbatim EN) */}
              {(s.tcodes?.length || s.tables?.length || s.fiori?.length || s.navHe?.length) ? (
                <div className="space-y-1.5 border-t border-border/30 pt-3">
                  <Codes label="T-Codes" items={s.tcodes} cls="bg-surface-2 text-ink-2" />
                  <Codes label="Tables" items={s.tables} cls="bg-indigo-50 text-indigo-700" />
                  <Codes label="Fiori" items={s.fiori} cls="bg-pink-50 text-pink-700" />
                  {s.navHe?.length ? (
                    <ul className="mt-1 space-y-0.5">
                      {s.navHe.map((n, i) => <li key={i} dir="ltr" className="tech text-[11px] leading-relaxed text-ink-3">▸ {n}</li>)}
                    </ul>
                  ) : null}
                </div>
              ) : null}
              {/* flow */}
              {s.flow?.length ? (
                <div className="border-t border-border/30 pt-3">
                  <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-ink-3"><Workflow className="size-3" />תרשים תהליך</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    {s.flow.map((f, i) => (
                      <span key={i} className="flex items-center gap-1.5">
                        <span className="rounded-lg border border-border/60 bg-card px-2 py-1 text-xs">
                          {f.he}{f.code ? <span dir="ltr" className="tech ms-1 text-[10px] font-bold text-brand">{f.code}</span> : null}
                        </span>
                        {i < s.flow!.length - 1 && <ArrowRight className="size-3 rotate-180 text-ink-3" />}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
              {/* config + master data */}
              <div className="grid gap-3 sm:grid-cols-2 border-t border-border/30 pt-3">
                <Bullets label="פרטי קונפיגורציה" items={s.configHe} icon={<KeyRound className="size-3" />} />
                <Bullets label="השפעת נתוני-אב" items={s.masterDataHe} icon={<Database className="size-3" />} />
              </div>
              {/* mistakes / troubleshoot / best practice */}
              <div className="grid-adaptive-sm border-t border-border/30 pt-3">
                <Bullets label="טעויות נפוצות" items={s.mistakesHe} icon={<AlertTriangle className="size-3" />} tone="rose" />
                <Bullets label="פתרון תקלות" items={s.troubleshootHe} icon={<Wrench className="size-3" />} tone="amber" />
                <Bullets label="שיטות מומלצות" items={s.bestPracticeHe} icon={<CheckCircle2 className="size-3" />} tone="green" />
              </div>
              {/* interview Q&A */}
              {s.interviewHe?.length ? (
                <div className="border-t border-border/30 pt-3">
                  <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-ink-3"><MessageCircleQuestion className="size-3" />שאלות ראיון</p>
                  <div className="mt-1.5 space-y-2">
                    {s.interviewHe.map((q, i) => (
                      <details key={i} className="rounded-lg border border-border/50 bg-card px-3 py-1.5">
                        <summary className="cursor-pointer text-xs font-semibold text-ink-2">{q.qHe}</summary>
                        <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-ink-2">{q.aHe}</p>
                      </details>
                    ))}
                  </div>
                </div>
              ) : null}
              {/* takeaways */}
              <div className="rounded-lg border border-brand/20 bg-brand-soft/40 p-3">
                <Bullets label="מסקנות מפתח" items={s.takeawaysHe} icon={<Lightbulb className="size-3" />} tone="green" />
              </div>
              {/* related */}
              {s.relatedHe?.length ? (
                <div className="flex flex-wrap gap-1.5">
                  {s.relatedHe.map((r, i) => (
                    <Link key={i} href={r.href} className="rounded-md bg-surface-2 px-2 py-0.5 text-[11px] font-semibold text-ink-2 hover:bg-hairline">{r.labelHe}</Link>
                  ))}
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChapterBlock({ ch }: { ch: Chapter }) {
  const [open, setOpen] = useState(ch.n === 1);
  useEffect(() => {
    const openIfHash = () => { if (typeof window !== "undefined" && window.location.hash === `#ch-${ch.n}`) setOpen(true); };
    openIfHash();
    window.addEventListener("hashchange", openIfHash);
    return () => window.removeEventListener("hashchange", openIfHash);
  }, [ch.n]);
  return (
    <section id={`ch-${ch.n}`} data-chapter={ch.n} className="glass scroll-mt-24 overflow-hidden rounded-2xl">
      <button onClick={() => { playPing(); setOpen((v) => !v); }} className="flex w-full items-center gap-3 p-4 text-start">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-brand-foreground shadow-lg shadow-brand/30">
          <Layers className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-bold">{ch.n}. {ch.titleHe}</span>
          <span className="flex flex-wrap items-center gap-x-3 text-xs text-muted-foreground">
            <span dir="ltr">{ch.titleEn}</span>
            <span>{ch.sections.length} יחידות לימוד</span>
          </span>
        </span>
        <ChevronDown className={`size-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden px-3 pb-4">
            <div className="paper relative rounded-xl p-4 sm:p-6">
              {ch.introHe ? <p className="mb-3 whitespace-pre-line text-xs leading-relaxed text-ink-2">{ch.introHe}</p> : null}
              {ch.sections.map((s) => <SectionCard key={s.id} s={s} />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default function Book8Page() {
  const { lang } = useI18n();
  const totalSections = DATA.chapters.reduce((s, c) => s + c.sections.length, 0);
  return (
    <div className="space-y-6">
      <Link href="/library/" className="inline-flex items-center gap-1.5 text-sm text-brand hover:underline">
        <ArrowRight className="size-4 rtl:rotate-180" />
        {lang === "he" ? "חזרה לספרייה" : "Back to library"}
      </Link>

      <BookReader
        bookId="book8"
        title={DATA.titleHe}
        subtitle="PM · Business User Guide"
        chapters={DATA.chapters.map((c) => ({ n: c.n, title: c.titleHe }))}
        note={lang === "he"
          ? "ספר עברי מלא — כל יחידת-לימוד בנויה ב-18 מקטעים מנקודת-מבט של משתמש עסקי המתחזק ציוד בקו-מילוי. מזהי SAP במקור באנגלית."
          : "Fully authored Hebrew — each unit follows the academy 18-facet structure from a business-user perspective. SAP identifiers verbatim EN."}
        stats={[
          { label: lang === "he" ? "פרקים" : "chapters", value: DATA.chapters.length },
          { label: lang === "he" ? "יחידות לימוד" : "units", value: totalSections },
          { label: lang === "he" ? "עברית מלאה · 18 מקטעים" : "full Hebrew · 18 facets", value: "" },
        ]}
      >
        <div className="space-y-4">
          {DATA.chapters.map((ch) => <ChapterBlock key={ch.n} ch={ch} />)}
        </div>
      </BookReader>

      <p className="text-center text-xs text-muted-foreground">
        {lang === "he"
          ? "התוכן נכתב במקור בעברית בתבנית 18 המקטעים של NEO Academy (מקור pmu-textbook), מוצג כאן כספר #8 לצד ספרי העיון. מזהי SAP נשמרו באנגלית."
          : "Content authored in Hebrew (NEO Academy 18-facet, pmu-textbook source), surfaced here as Book #8 alongside the reference shelf."}
      </p>
    </div>
  );
}
