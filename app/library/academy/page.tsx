"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap, BookOpen, CheckCircle2, Clock, ShieldCheck, Layers, ArrowRight, CircleDashed,
} from "lucide-react";
import { ACADEMY_BOOKS, ACADEMY_META, type AcademyBook } from "@/data/library/academy";
import { useI18n } from "@/lib/i18n";

function qColor(q?: number) {
  if (q == null) return "text-muted-foreground";
  if (q >= 90) return "text-emerald-600";
  if (q >= 85) return "text-brand";
  return "text-amber-600";
}

function StatusBadge({ b, lang }: { b: AcademyBook; lang: string }) {
  const map = {
    live: ["bg-emerald-500/15 text-emerald-700", lang === "he" ? "פעיל" : "Live", <CheckCircle2 key="i" className="size-3" />],
    "in-progress": ["bg-amber-500/15 text-amber-700", lang === "he" ? "בתהליך" : "In progress", <Clock key="i" className="size-3" />],
    planned: ["bg-slate-500/10 text-slate-600", lang === "he" ? "מתוכנן" : "Planned", <CircleDashed key="i" className="size-3" />],
  } as const;
  const [cls, label, icon] = map[b.status];
  return <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${cls}`}>{icon}{label}</span>;
}

function BookCard({ b, lang }: { b: AcademyBook; lang: string }) {
  const pct = b.chaptersTotal ? Math.round((b.chaptersDone / b.chaptersTotal) * 100) : 0;
  const Wrapper: any = b.href ? Link : "div";
  return (
    <Wrapper {...(b.href ? { href: b.href } : {})} dir="rtl" className={`glass group block rounded-2xl p-5 transition-shadow ${b.href ? "hover:shadow-lg" : "opacity-90"}`}>
      <div className="flex items-start gap-3">
        <span className={`grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${b.tintHe} text-white`}>
          <BookOpen className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span dir="ltr" className="tech rounded bg-muted px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">{b.module}</span>
            <StatusBadge b={b} lang={lang} />
            {b.validated && <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-bold text-brand"><ShieldCheck className="size-3" />{lang === "he" ? "מאומת" : "Validated"}</span>}
          </div>
          <h3 className="mt-1 text-base font-bold group-hover:text-brand">{b.titleHe}</h3>
          <p dir="ltr" className="text-[11px] text-muted-foreground">{b.titleEn}</p>
        </div>
        {b.qualityScore != null && (
          <div className="shrink-0 text-center">
            <p className={`text-xl font-bold ${qColor(b.qualityScore)}`}>{b.qualityScore}</p>
            <p className="text-[9px] text-muted-foreground">{lang === "he" ? "ציון" : "score"}</p>
          </div>
        )}
      </div>

      {/* progress */}
      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
          <span>{lang === "he" ? "פרקים" : "Chapters"}: {b.chaptersDone}{b.chaptersTotal ? `/${b.chaptersTotal}` : ""}</span>
          {b.nodes > 0 && <span>{b.nodes} {lang === "he" ? "יחידות לימוד" : "units"}</span>}
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div className={`h-full rounded-full bg-gradient-to-r ${b.tintHe}`} style={{ width: `${pct}%` }} />
        </div>
      </div>

      {(b.href || b.reportHref) && (
        <div className="mt-3 flex items-center gap-3 text-[12px] font-semibold">
          {b.href && <span className="flex items-center gap-1 text-brand">{lang === "he" ? "פתח אקדמיה" : "Open"}<ArrowRight className="size-3.5 rtl:rotate-180" /></span>}
          {b.reportHref && <Link href={b.reportHref} className="text-muted-foreground hover:text-brand">{lang === "he" ? "דוח איכות" : "Quality report"}</Link>}
        </div>
      )}
    </Wrapper>
  );
}

export default function AcademyDashboardPage() {
  const { lang } = useI18n();
  const t = ACADEMY_META.totals();
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-5xl space-y-5 p-4">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/library/" className="text-brand hover:underline">{lang === "he" ? "ספרייה" : "Library"}</Link><span>/</span>
        <span>{lang === "he" ? "אקדמיה" : "Academy"}</span>
      </nav>

      <section dir="rtl" className="glass rounded-2xl p-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
          <GraduationCap className="size-3.5" />{lang === "he" ? "אקדמיית SAP אחודה" : "Unified SAP Learning Academy"}
        </span>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">{lang === "he" ? "לוח בקרה — התקדמות הספרים" : "Academy — Progress Dashboard"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {lang === "he" ? `תבנית אחידה (v${ACADEMY_META.templateVersion}) · 18 מקטעי-לימוד לכל צומת · עברית RTL · 100% אופליין` : `One template (v${ACADEMY_META.templateVersion}) · 18 facets/node · Hebrew RTL · 100% offline`}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            [`${t.booksLive}/${t.books}`, lang === "he" ? "ספרים פעילים" : "books live", BookOpen],
            [t.chapters, lang === "he" ? "פרקים" : "chapters", Layers],
            [t.nodes, lang === "he" ? "יחידות לימוד" : "learning units", GraduationCap],
            [ACADEMY_META.facets.length, lang === "he" ? "מקטעים לצומת" : "facets/node", CheckCircle2],
          ].map(([v, l, Icon], i) => (
            <div key={i} className="rounded-xl border border-border/50 bg-card/50 p-3">
              <p className="text-2xl font-bold text-brand">{v as any}</p>
              <p className="text-[11px] text-muted-foreground">{l as any}</p>
            </div>
          ))}
        </div>
      </section>

      {/* template facet legend */}
      <section dir="rtl" className="glass rounded-2xl p-5">
        <h2 className="mb-2 flex items-center gap-2 text-sm font-bold text-brand"><Layers className="size-4" />{lang === "he" ? "תבנית האקדמיה — 18 מקטעי-לימוד בכל צומת" : "Academy template — 18 facets per node"}</h2>
        <div className="flex flex-wrap gap-1.5">
          {ACADEMY_META.facets.map((f, i) => (
            <span key={i} className="rounded-lg bg-muted/60 px-2 py-1 text-[11px] font-medium text-muted-foreground"><span className="tech me-1 font-bold text-brand">{i + 1}</span>{f}</span>
          ))}
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        {ACADEMY_BOOKS.map((b) => <BookCard key={b.id} b={b} lang={lang} />)}
      </div>
    </motion.div>
  );
}
