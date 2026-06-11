"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap, BookOpen, CheckCircle2, Clock, ShieldCheck, Layers, ArrowRight,
  CircleDashed, Search, Network, Calendar, FileText, ListTree,
} from "lucide-react";
import { BOOKS, ACADEMY_TOTALS, bookStats, crossBookObjects, type BookDef } from "@/data/library/academy-index";
import { useI18n } from "@/lib/i18n";

function qColor(q?: number) {
  if (q == null) return "text-muted-foreground";
  if (q >= 90) return "text-emerald-600";
  if (q >= 85) return "text-brand";
  return "text-amber-600";
}

function BookCard({ b }: { b: BookDef }) {
  const { lang } = useI18n();
  const st = bookStats(b.id);
  return (
    <div dir="rtl" className="glass rounded-2xl p-5">
      <div className="flex items-start gap-3">
        <span className={`grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${b.tint} text-white`}><BookOpen className="size-5" /></span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span dir="ltr" className="tech rounded bg-muted px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">{b.module}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-700"><CheckCircle2 className="size-3" />{lang === "he" ? "הושלם" : "Completed"}</span>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${b.validationKind === "reviewed" ? "bg-brand/10 text-brand" : "bg-amber-500/15 text-amber-700"}`}>
              <ShieldCheck className="size-3" />{b.validationKind === "reviewed" ? (lang === "he" ? "נבדק" : "Reviewed") : (lang === "he" ? "מבני" : "Structural")}
            </span>
          </div>
          <h3 className="mt-1 text-base font-bold">{b.titleHe}</h3>
          <p dir="ltr" className="text-[11px] text-muted-foreground">{b.titleEn}</p>
        </div>
        <div className="shrink-0 text-center">
          <p className={`text-2xl font-bold ${qColor(b.score)}`}>{b.score}</p>
          <p className="text-[9px] text-muted-foreground">{lang === "he" ? "ציון" : "score"}</p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg border border-border/50 bg-card/50 p-2"><p className="text-sm font-bold text-brand">{st.chapters}</p><p className="text-[10px] text-muted-foreground">{lang === "he" ? "פרקים" : "chapters"}</p></div>
        <div className="rounded-lg border border-border/50 bg-card/50 p-2"><p className="text-sm font-bold text-brand">{st.nodes}</p><p className="text-[10px] text-muted-foreground">{lang === "he" ? "יחידות" : "nodes"}</p></div>
        <div className="rounded-lg border border-border/50 bg-card/50 p-2"><p className="text-sm font-bold text-brand">~{st.readMin}</p><p className="text-[10px] text-muted-foreground">{lang === "he" ? "דק'" : "min"}</p></div>
      </div>

      <p className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground"><Calendar className="size-3" />{lang === "he" ? "עודכן" : "updated"}: {b.lastUpdated}</p>

      <div className="mt-3 flex flex-wrap gap-2 text-[12px] font-semibold">
        <Link href={`${b.id === "pp" ? "/library/pp/" : b.base + "/"}`} className="flex items-center gap-1 rounded-lg bg-brand/10 px-2.5 py-1 text-brand hover:bg-brand/15">{lang === "he" ? "פתח" : "Open"}<ArrowRight className="size-3.5 rtl:rotate-180" /></Link>
        <Link href={b.referenceHref} className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-muted-foreground hover:text-brand"><ListTree className="size-3.5" />{lang === "he" ? "אינדקסים" : "Indexes"}</Link>
        <Link href={b.reportHref} className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-muted-foreground hover:text-brand"><FileText className="size-3.5" />{lang === "he" ? "דוח איכות" : "Quality"}</Link>
      </div>
    </div>
  );
}

export default function AcademyDashboard() {
  const { lang } = useI18n();
  const t = ACADEMY_TOTALS;
  const cross = crossBookObjects().slice(0, 40);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-5xl space-y-5 p-4">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/library/" className="text-brand hover:underline">{lang === "he" ? "ספרייה" : "Library"}</Link><span>/</span>
        <span>{lang === "he" ? "אקדמיה" : "Academy"}</span>
      </nav>

      <section dir="rtl" className="glass rounded-2xl p-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand"><GraduationCap className="size-3.5" />{lang === "he" ? "אקדמיית SAP אחודה" : "Unified SAP Learning Academy"}</span>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">{lang === "he" ? "לוח בקרה מרכזי" : "Central Dashboard"}</h1>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[
            [t.totalBooks, lang === "he" ? "ספרים" : "books", BookOpen],
            [t.completed, lang === "he" ? "הושלמו" : "completed", CheckCircle2],
            [t.plannedHe.length, lang === "he" ? "בתור" : "queued", CircleDashed],
            [t.chapters, lang === "he" ? "פרקים" : "chapters", Layers],
            [t.nodes, lang === "he" ? "יחידות לימוד" : "nodes", GraduationCap],
            [`~${Math.round(t.readMin / 60)}h`, lang === "he" ? "לימוד" : "study", Clock],
          ].map(([v, l, Icon], i) => (
            <div key={i} className="rounded-xl border border-border/50 bg-card/50 p-3">
              <p className="text-2xl font-bold text-brand">{v as any}</p>
              <p className="text-[11px] text-muted-foreground">{l as any}</p>
            </div>
          ))}
        </div>

        <Link href="/library/academy/search/" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-brand to-brand-dark px-4 py-2 text-sm font-bold text-brand-foreground transition-opacity hover:opacity-90">
          <Search className="size-4" />{lang === "he" ? "חיפוש מאוחד בכל הספרים" : "Unified search across all books"}
        </Link>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        {BOOKS.map((b) => <BookCard key={b.id} b={b} />)}
        {/* queued */}
        <div dir="rtl" className="glass rounded-2xl border-dashed p-5 opacity-80">
          <h3 className="flex items-center gap-2 text-sm font-bold text-muted-foreground"><CircleDashed className="size-4" />{lang === "he" ? "בתור (מקור קיים)" : "Queued (source ready)"}</h3>
          <ul className="mt-2 space-y-1 text-[13px] text-muted-foreground">
            {t.plannedHe.map((p, i) => <li key={i} className="flex items-center gap-1.5"><CircleDashed className="size-3" />{p}</li>)}
          </ul>
        </div>
      </div>

      {/* cross-book shared objects */}
      <section dir="rtl" className="glass rounded-2xl p-5">
        <h2 className="mb-1 flex items-center gap-2 text-sm font-bold text-brand"><Network className="size-4" />{lang === "he" ? "קישורים חוצי-ספרים — אובייקטי SAP משותפים" : "Cross-book links — shared SAP objects"}</h2>
        <p className="mb-3 text-xs text-muted-foreground">{lang === "he" ? "אובייקטים המופיעים ביותר מספר אחד — נקודות החיבור בין המודולים." : "Objects appearing in more than one book — the integration points between modules."}</p>
        <div className="flex flex-wrap gap-1.5">
          {cross.map((c) => (
            <span key={c.code + c.kind} className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-card/50 px-2 py-1 text-[11px]">
              <span dir="ltr" className="tech font-bold text-brand">{c.code}</span>
              <span className="text-muted-foreground">{c.books.join("·")}</span>
            </span>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
