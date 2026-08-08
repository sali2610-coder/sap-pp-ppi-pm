import { forWhiteText } from "@/lib/contrast";
import Link from "next/link";
import { ArrowRight, ArrowLeft, GitBranch, TrendingUp, Terminal, Boxes, FileCode, ArrowRightLeft, Workflow, AlertTriangle, BookOpen, Gauge } from "lucide-react";
import { impactReport } from "@/lib/impact";
import { RISK_HE, RISK_COLOR, TRUST_HE } from "@/lib/s4";
import { pillInk } from "@/lib/pill-ink";

const MOD_COLOR: Record<string, string> = { PM: "#f97316", "PP-PI": "#6d28d9", PP: "#6d28d9" };
const TIER = { high: { he: "השפעה גבוהה", c: "#dc2626" }, medium: { he: "השפעה בינונית", c: "#d97706" }, low: { he: "השפעה נמוכה", c: "#16a34a" } } as const;
const objHref = (n: string) => `/object/${encodeURIComponent(n)}/`;

function Sec({ icon, title, count, accent, children }: { icon: React.ReactNode; title: string; count?: number; accent: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-hairline bg-surface p-4 shadow-sm">
      <h3 className="mb-2 flex items-center gap-2 text-sm font-extrabold text-ink-1">{icon}{title}{count != null && <span className="rounded-full px-1.5 py-0.5 text-[10px] font-bold" style={{ background: accent, color: pillInk(accent) }}>{count}</span>}</h3>
      {children}
    </section>
  );
}
function Chips({ items, link }: { items: string[]; link?: boolean }) {
  const uniq = [...new Set(items)];
  if (!uniq.length) return <span className="text-[11px] italic text-ink-3">—</span>;
  return <div className="flex flex-wrap gap-1.5">{uniq.map((x) => link
    ? <Link key={x} href={objHref(x)} className="tech rounded-md border border-hairline bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] font-bold text-brand transition hover:border-brand/40" dir="ltr">{x}</Link>
    : <span key={x} className="tech rounded-md border border-hairline bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] font-bold text-ink-2" dir="ltr">{x}</span>)}</div>;
}

export function ImpactCenter({ name }: { name: string }) {
  const r = impactReport(name);
  if (!r) return <p className="p-8 text-center text-ink-3">אובייקט לא נמצא.</p>;
  const accent = MOD_COLOR[r.module] || "#64748b";
  const tier = TIER[r.tier];

  return (
    <div className="space-y-4" dir="rtl">
      <Link href={`/object/${encodeURIComponent(r.name)}/`} className="inline-flex items-center gap-1.5 text-sm font-bold text-ink-3 transition hover:text-brand"><ArrowRight className="size-4" />כרטיס האובייקט</Link>

      {/* header + score */}
      <header className="grid gap-4 rounded-3xl border border-hairline bg-surface p-5 shadow-sm md:grid-cols-[1fr_auto]">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-3"><Gauge className="size-4" />Impact & Dependency Analysis</div>
          <h1 className="mt-1 flex items-center gap-2 font-mono text-3xl font-extrabold text-ink-1" dir="ltr">{r.name}<span className="rounded-lg px-2 py-0.5 font-sans text-xs font-bold" style={{ background: accent, color: pillInk(accent) }}>{r.module}</span></h1>
          <p className="mt-1 max-w-xl text-sm text-ink-3">{r.descHe}</p>
          {r.process && <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-bold text-ink-2"><Workflow className="size-3.5" />{r.businessProcess || r.process}</p>}
        </div>
        <div className="flex flex-col items-center justify-center rounded-2xl p-4 text-center" style={{ background: tier.c + "0f" }}>
          <div className="text-[11px] font-bold uppercase tracking-wide" style={{ color: tier.c }}>Impact Score</div>
          <div className="text-5xl font-extrabold tabular-nums" style={{ color: tier.c }}>{r.score}</div>
          <div className="rounded-full px-2.5 py-0.5 text-[11px] font-extrabold" style={{ background: tier.c, color: pillInk(tier.c) }}>{tier.he}</div>
        </div>
      </header>

      {/* score breakdown — transparent */}
      <section className="rounded-2xl border border-hairline bg-surface p-4 shadow-sm">
        <h3 className="mb-2 text-sm font-extrabold text-ink-1">מתוך מה מורכב הציון</h3>
        <div className="space-y-2">
          {r.factors.map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              <span className="w-44 shrink-0 text-xs font-bold text-ink-2">{f.label}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2"><span className="block h-full rounded-full" style={{ width: `${f.points}%`, background: tier.c }} /></span>
              <span className="w-8 shrink-0 text-left font-mono text-xs font-bold text-ink-3">{f.points}</span>
              <span className="hidden w-40 shrink-0 text-[10px] text-ink-3 sm:block">{f.detail}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[10px] text-ink-3">ציון השפעה הוא היוריסטיקה שקופה: השפעת S/4 + רדיוס תלויות + צימוד + תקלות ידועות. אינדיקציה לתעדוף ניתוח — לא דירוג SAP רשמי.</p>
      </section>

      {/* dependency grid */}
      <div className="grid gap-3 md:grid-cols-2">
        <Sec icon={<ArrowLeft className="size-4 rotate-45 text-blue-500" />} title="תלויות מעלה (האובייקט תלוי ב)" count={r.upstream.length} accent="#2563eb"><Chips items={r.upstream} link /></Sec>
        <Sec icon={<TrendingUp className="size-4 text-rose-500" />} title="תלויות מטה (תלויים באובייקט)" count={r.downstream.length} accent="#e11d48"><Chips items={r.downstream} link /></Sec>
        <Sec icon={<Terminal className="size-4 text-ink-3" />} title="T-Codes" count={r.tcodes.length} accent="#64748b"><Chips items={r.tcodes} /></Sec>
        <Sec icon={<Boxes className="size-4 text-emerald-600" />} title="BAPIs / FM" count={r.bapis.length} accent="#059669"><Chips items={r.bapis} /></Sec>
        <Sec icon={<FileCode className="size-4 text-violet-600" />} title="CDS Views" count={r.cds.length} accent="#7c3aed"><Chips items={r.cds} /></Sec>
        <Sec icon={<ArrowRightLeft className="size-4 text-amber-600" />} title="S/4HANA — השפעה ומיגרציה" accent="#d97706">
          <div className="space-y-1.5 text-sm text-ink-2">
            <div className="flex items-center gap-2"><span className="rounded-full px-2 py-0.5 text-[10px] font-extrabold" style={{ background: RISK_COLOR[r.s4Risk], color: pillInk(RISK_COLOR[r.s4Risk]) }}>{RISK_HE[r.s4Risk]}</span><span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-bold text-ink-3">{TRUST_HE[r.s4Trust]}</span></div>
            {r.s4Replacement && <div><span className="text-[11px] font-bold text-ink-3">חלופה ב-S/4: </span><span className="tech font-mono font-bold text-amber-700" dir="ltr">{r.s4Replacement}</span></div>}
            {r.s4Changed ? <p className="leading-relaxed">{r.s4Changed}</p> : <p className="text-[12px] italic text-ink-3">אין הערת S/4 ברמת הטבלה — נדרש אימות מול Simplification List / OSS.</p>}
          </div>
        </Sec>
      </div>

      {/* related incidents */}
      <Sec icon={<AlertTriangle className="size-4 text-amber-500" />} title="תקלות ופתרון תקלות קשורים" count={r.incidents.length} accent="#d97706">
        {r.incidents.length ? (
          <div className="space-y-2">
            {r.incidents.map((i) => (
              <Link key={i.slug} href={`/troubleshooting/${i.slug}/`} className="group flex items-start gap-2 rounded-xl border border-hairline bg-surface-2/60 p-2.5 transition hover:border-amber-300 hover:bg-amber-50">
                <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-amber-500" />
                <span className="min-w-0 flex-1"><span className="block text-sm font-bold text-ink-1">{i.he}</span><span className="block truncate text-[11px] text-ink-3">{i.symptom}</span></span>
                <ArrowLeft className="size-3.5 shrink-0 text-ink-3 transition group-hover:text-amber-600" />
              </Link>
            ))}
          </div>
        ) : <span className="text-[11px] italic text-ink-3">אין תקלות מתועדות לאובייקט זה.</span>}
      </Sec>

      {/* actions */}
      <div className="flex flex-wrap gap-2">
        <Link href={`/sap-infrastructure/?focus=${encodeURIComponent(r.name)}`} className="tap inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow-sm" style={{ background: forWhiteText(accent)}}><GitBranch className="size-4" />הדגש בגרף</Link>
        <Link href={`/object/${encodeURIComponent(r.name)}/`} className="tap inline-flex items-center gap-1.5 rounded-xl border border-hairline bg-surface px-4 py-2.5 text-sm font-bold text-ink-2 transition hover:border-brand/40 hover:text-brand"><BookOpen className="size-4" />כרטיס אובייקט מלא</Link>
      </div>
    </div>
  );
}
