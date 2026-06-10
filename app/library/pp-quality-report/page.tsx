"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck, AlertTriangle, Link2, ListTree, Boxes, Factory, FileWarning, GraduationCap, ArrowRight,
} from "lucide-react";
import { PP_QUALITY, PP_QUALITY_META, type ChapterQA, type QAFinding, type Severity } from "@/data/library/pp-quality";
import { useI18n } from "@/lib/i18n";

const pad = (n: number) => String(n).padStart(2, "0");
const sevColor: Record<Severity, string> = {
  high: "bg-rose-500/15 text-rose-700 border-rose-300/40",
  med: "bg-amber-500/15 text-amber-700 border-amber-300/40",
  low: "bg-slate-500/10 text-slate-600 border-slate-300/40",
};
const sevHe: Record<Severity, string> = { high: "גבוה", med: "בינוני", low: "נמוך" };

function confColor(c: number) {
  if (c >= 90) return "text-emerald-600";
  if (c >= 85) return "text-brand";
  return "text-amber-600";
}
function confRing(c: number) {
  if (c >= 90) return "stroke-emerald-500";
  if (c >= 85) return "stroke-brand";
  return "stroke-amber-500";
}

function Ring({ value }: { value: number }) {
  const r = 26, c = 2 * Math.PI * r, off = c - (value / 100) * c;
  return (
    <div className="relative grid size-16 shrink-0 place-items-center">
      <svg className="size-16 -rotate-90" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={r} className="fill-none stroke-muted" strokeWidth="6" />
        <circle cx="32" cy="32" r={r} className={`fill-none ${confRing(value)}`} strokeWidth="6" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} />
      </svg>
      <span className={`absolute text-lg font-bold ${confColor(value)}`}>{value}</span>
    </div>
  );
}

function Findings({ title, icon, items }: { title: string; icon: React.ReactNode; items: QAFinding[] }) {
  if (!items.length) return null;
  return (
    <div>
      <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{icon}{title}</p>
      <ul className="space-y-1">
        {items.map((f, i) => (
          <li key={i} className="flex items-start gap-1.5 text-[13px] leading-relaxed">
            <span className={`mt-0.5 shrink-0 rounded border px-1 py-0 text-[9px] font-bold ${sevColor[f.severity]}`}>{sevHe[f.severity]}</span>
            <span>
              {f.node && <span dir="ltr" className="tech me-1 font-semibold text-muted-foreground">{f.node}</span>}
              {f.value && <span dir="ltr" className="tech me-1 font-bold text-brand">{f.value}</span>}
              <span>{f.problem}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TextList({ title, icon, items }: { title: string; icon: React.ReactNode; items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{icon}{title}</p>
      <ul className="space-y-1">
        {items.map((x, i) => (
          <li key={i} className="flex gap-1.5 text-[13px] leading-relaxed"><span className="mt-1.5 size-1 shrink-0 rounded-full bg-muted-foreground/40" /><span>{x}</span></li>
        ))}
      </ul>
    </div>
  );
}

function ChapterCard({ c }: { c: ChapterQA }) {
  const highCount = [...c.sapObjectIssues, ...c.crossLinkIssues].filter((f) => f.severity === "high").length;
  const hierBadge = c.hierarchyMatch === "high" ? "bg-emerald-500/15 text-emerald-700" : c.hierarchyMatch === "medium" ? "bg-amber-500/15 text-amber-700" : "bg-rose-500/15 text-rose-700";
  return (
    <section dir="rtl" className="glass rounded-2xl p-5">
      <div className="flex items-start gap-4">
        <Ring value={c.confidence} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`/library/pp/chapter-${pad(c.n)}/`} className="group flex items-center gap-1.5">
              <span dir="ltr" className="tech rounded bg-brand/10 px-1.5 py-0.5 text-xs font-bold text-brand">Ch{c.n}</span>
              <h3 className="text-base font-bold group-hover:text-brand">{c.titleHe}</h3>
              <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-x-0.5 rtl:rotate-180" />
            </Link>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${hierBadge}`}>היררכיה: {c.hierarchyMatch === "high" ? "תואמת" : c.hierarchyMatch === "medium" ? "חלקית" : "חורגת"}</span>
            {highCount > 0 && <span className="rounded-full bg-rose-500/15 px-2 py-0.5 text-[10px] font-bold text-rose-700">{highCount} חמורות</span>}
          </div>
          <p className="mt-1.5 text-[13px] leading-relaxed text-slate-700">{c.summary}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Findings title="אובייקטי SAP" icon={<Boxes className="size-3.5" />} items={c.sapObjectIssues} />
        <Findings title="קישורים שבורים" icon={<Link2 className="size-3.5" />} items={c.crossLinkIssues} />
        <TextList title="היררכיה" icon={<ListTree className="size-3.5" />} items={c.hierarchyIssues} />
        <TextList title="תוכן חסר" icon={<FileWarning className="size-3.5" />} items={c.missingContent} />
        <TextList title="טרמינולוגיה" icon={<GraduationCap className="size-3.5" />} items={c.terminologyIssues} />
        <TextList title="הערות CBC" icon={<Factory className="size-3.5" />} items={c.cbcIssues} />
      </div>
    </section>
  );
}

export default function PPQualityReportPage() {
  const { lang } = useI18n();
  const avg = Math.round(PP_QUALITY.reduce((s, c) => s + c.confidence, 0) / PP_QUALITY.length);
  const atBar = PP_QUALITY.filter((c) => c.confidence >= PP_QUALITY_META.publishBar).length;
  const totalHigh = PP_QUALITY.reduce((s, c) => s + [...c.sapObjectIssues, ...c.crossLinkIssues].filter((f) => f.severity === "high").length, 0);
  const totalIssues = PP_QUALITY.reduce((s, c) => s + c.sapObjectIssues.length + c.crossLinkIssues.length + c.hierarchyIssues.length + c.terminologyIssues.length + c.cbcIssues.length + c.missingContent.length, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-5xl space-y-5 p-4">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/library/" className="text-brand hover:underline">{lang === "he" ? "ספרייה" : "Library"}</Link><span>/</span>
        <Link href="/library/pp/" className="text-brand hover:underline">PP</Link><span>/</span>
        <span>{lang === "he" ? "דוח איכות" : "Quality report"}</span>
      </nav>

      <section dir="rtl" className="glass rounded-2xl p-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
          <ShieldCheck className="size-3.5" />{lang === "he" ? "ביקורת איכות — לפני פרסום" : "Quality verification — pre-publication"}
        </span>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">{lang === "he" ? "דוח איכות — אקדמיית PP" : "PP Academy — Quality Report"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{PP_QUALITY_META.scopeHe}</p>
        <p className="mt-1 text-xs text-muted-foreground">{lang === "he" ? "נוצר" : "Generated"}: {PP_QUALITY_META.generatedHe} · {lang === "he" ? "סף-ייחוס (פרק 3)" : "benchmark"} ≈ {PP_QUALITY_META.benchmark}</p>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            [avg, lang === "he" ? "ציון ממוצע" : "Avg score", confColor(avg)],
            [`${atBar}/15`, lang === "he" ? `≥ ${PP_QUALITY_META.publishBar} (סף פרסום)` : "at publish bar", atBar >= 8 ? "text-emerald-600" : "text-amber-600"],
            [totalHigh, lang === "he" ? "פגמים חמורים" : "high-severity", "text-rose-600"],
            [totalIssues, lang === "he" ? "סה\"כ ממצאים" : "total findings", "text-slate-700"],
          ].map(([v, l, col], i) => (
            <div key={i} className="rounded-xl border border-border/50 bg-card/50 p-3">
              <p className={`text-2xl font-bold ${col}`}>{v}</p>
              <p className="text-[11px] text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* systemic issues */}
      <section dir="rtl" className="glass rounded-2xl border-amber-300/40 bg-amber-50/40 p-5">
        <h2 className="mb-2 flex items-center gap-2 text-sm font-bold text-amber-700"><AlertTriangle className="size-4" />{lang === "he" ? "פגמים שיטתיים (חוצי-פרקים)" : "Systemic issues"}</h2>
        <ul className="space-y-1.5">
          {PP_QUALITY_META.systemicHe.map((x, i) => (
            <li key={i} className="flex gap-2 text-[13px] leading-relaxed"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-amber-500" /><span>{x}</span></li>
          ))}
        </ul>
        <p className="mt-3 rounded-lg border border-amber-300/40 bg-card/60 p-2.5 text-[13px] leading-relaxed">
          <strong>{lang === "he" ? "מסקנה:" : "Verdict:"}</strong> {lang === "he"
            ? "כל הפרקים במבנה תקין ובעומק-לימוד מלא; הפערים העיקריים הם קישורי-אובייקט שבורים (דטרמיניסטי, תיקון קל) ומזהי-Fiori כ-placeholder. אלה קיימים גם בפרק-הייחוס. לאחר תיקון שני אלה — כל הפרקים מגיעים לסף הפרסום."
            : "All chapters are structurally sound and full-depth; main gaps are broken object cross-links (deterministic, easy fix) and placeholder Fiori IDs — present even in the benchmark. Fixing both lifts every chapter to the publish bar."}
        </p>
      </section>

      <div className="space-y-4">
        {PP_QUALITY.map((c) => <ChapterCard key={c.n} c={c} />)}
      </div>
    </motion.div>
  );
}
