"use client";

import { forWhiteText } from "@/lib/contrast";
import { useEffect, useState } from "react";
import Link from "next/link";
import { GitBranch, Gauge, AlertTriangle, Terminal, Boxes, FileCode, Network, Lightbulb, HelpCircle, Clock4, Briefcase, ArrowLeft, GraduationCap, ShieldCheck, ArrowRightLeft, StickyNote, Check } from "lucide-react";
import { PROCESS, STEP_MFG } from "@/data/process/process-data";
import { knowledgeFor } from "@/lib/knowledge";
import { s4For, RISK_HE, RISK_COLOR, TRUST_HE } from "@/lib/s4";
import { INCIDENTS } from "@/data/troubleshooting";
import { cdsForTable } from "@/data/cds-map";

type Tbl = { name: string; mod: string; he: string; en: string; tcodes: string; s4: string; s4alt: string; funcs: string[]; cds: string[]; rel: { role: string; table: string }[] };
const splitTc = (s: string) => [...new Set((s || "").split(/[^A-Za-z0-9_]+/).map((x) => x.trim()).filter((x) => x.length >= 2 && /^[A-Z][A-Z0-9_/]*$/i.test(x)))].slice(0, 8);

export function ProcessWorkspace({ code, byName, color }: { code: string; byName: Record<string, Tbl>; color: (m?: string | null) => string }) {
  const def = PROCESS[code] || PROCESS[code === "PP" ? "PP-PI" : "PM"] || PROCESS["PM"];
  const [i, setI] = useState(0);
  const accent = color(code);
  const s = def.steps[Math.min(i, def.steps.length - 1)];
  const t = s.object ? byName[s.object] : undefined;
  const k = s.object ? knowledgeFor(s.object) : undefined;

  const funcs = t ? (t.funcs || []).slice(0, 8) : [];
  const cds = s.object ? cdsForTable(s.object).map((v) => v.view) : (t?.cds || []);
  const parents = t ? [...new Set(t.rel.filter((r) => r.role === "child").map((r) => r.table))] : [];
  const children = t ? [...new Set(t.rel.filter((r) => r.role === "parent").map((r) => r.table))] : [];
  const incidents = s.object ? INCIDENTS.filter((inc) => inc.tables.includes(s.object!)) : [];
  // T-Codes from the table + enriched with diagnosis T-Codes from the incident KB
  const tcodes = [...new Set([...(t ? splitTc(t.tcodes) : []), ...incidents.flatMap((inc) => inc.analyzeTcodes || [])])].slice(0, 10);
  const scenarioExamples = [STEP_MFG[s.id], ...incidents.map((inc) => inc.scenario).filter(Boolean) as string[]].filter(Boolean).slice(0, 3) as string[];
  const s4 = t ? s4For(s.object!, t.s4, t.s4alt) : null;
  const objHref = (n: string) => `/object/${encodeURIComponent(n)}/`;

  const QA = ({ icon, label, text }: { icon: React.ReactNode; label: string; text: string }) => (
    <div className="flex gap-2.5 rounded-xl bg-surface-2 p-3"><span className="mt-0.5 shrink-0">{icon}</span><div><div className="text-[11px] font-extrabold uppercase tracking-wide text-ink-3">{label}</div><p className="text-sm leading-relaxed text-ink-2">{text}</p></div></div>
  );
  const ChipRow = ({ icon, label, items, link }: { icon: React.ReactNode; label: string; items: string[]; link?: boolean }) => items.length ? (
    <div><div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-ink-3">{icon}{label}</div>
      <div className="flex flex-wrap gap-1.5">{items.map((x) => link
        ? <Link key={x} href={objHref(x)} className="tech rounded-md border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[11px] font-bold text-brand transition hover:border-brand/40" dir="ltr">{x}</Link>
        : <span key={x} className="tech rounded-md border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[11px] font-bold text-ink-2" dir="ltr">{x}</span>)}</div></div>
  ) : null;

  return (
    <div dir="rtl" className="grid gap-4 lg:grid-cols-[260px_1fr]">
      {/* step rail */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="mb-2 px-1"><div className="text-[11px] font-bold uppercase tracking-wide" style={{ color: accent }}>{code === "PP-PI" ? "PP-PI" : code} · תהליך</div><div className="text-base font-extrabold text-ink-1">{def.he}</div><div className="text-xs text-ink-3">{def.sub}</div></div>
        <ol className="flex gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {def.steps.map((st, idx) => { const active = idx === i; return (
            <li key={st.id} className="shrink-0 lg:shrink">
              <button onClick={() => setI(idx)} className={`flex w-full items-center gap-2.5 rounded-xl border p-2.5 text-right transition active:scale-[.98] ${active ? "border-transparent text-white shadow-sm" : "border-hairline bg-surface text-ink-2 hover:border-brand/30"}`} style={active ? { background: accent } : undefined}>
                <span className={`grid size-7 shrink-0 place-items-center rounded-lg text-xs font-extrabold ${active ? "bg-surface/25" : "bg-surface-2 text-ink-3"}`}>{idx + 1}</span>
                <span className="min-w-0"><span className={`block text-[10px] font-bold ${active ? "text-white/75" : "text-ink-3"}`}>{st.phaseHe}</span><span className="block whitespace-nowrap text-sm font-bold lg:whitespace-normal">{st.title}</span></span>
              </button>
            </li>); })}
        </ol>
      </aside>

      {/* detail panel */}
      <section className="min-w-0 space-y-3">
        <header className="relative overflow-hidden rounded-2xl p-5 text-white shadow-md" style={{ background: "linear-gradient(135deg,#d62027,#8f1318)" }}>
          <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: accent }} />
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-surface/20 px-2.5 py-0.5 text-[11px] font-extrabold">{s.phaseHe}</span>
            <h2 className="text-2xl font-extrabold">{s.title}</h2>
            {s.object && <Link href={objHref(s.object)} className="tech rounded-md bg-surface/15 px-2 py-0.5 font-mono text-xs font-bold ring-1 ring-white/25" dir="ltr">{s.object}</Link>}
          </div>
          <p className="mt-1.5 text-sm text-white/85">{s.businessHe}</p>
        </header>

        <div className="grid gap-2.5 sm:grid-cols-2">
          <QA icon={<HelpCircle className="size-4 text-blue-500" />} label="מה זה?" text={s.whatHe} />
          <QA icon={<Lightbulb className="size-4 text-amber-500" />} label="למה צריך?" text={s.whyHe} />
          <QA icon={<Clock4 className="size-4 text-ink-3" />} label="מתי משתמשים?" text={s.whenHe} />
          <QA icon={<Briefcase className="size-4 text-emerald-600" />} label="מטרה עסקית" text={s.businessHe} />
        </div>

        {/* derived facets */}
        <div className="space-y-3 rounded-2xl border border-hairline bg-surface p-4 shadow-sm">
          <ChipRow icon={<Network className="size-3.5" />} label="אובייקטים קשורים · אב" items={parents} link />
          <ChipRow icon={<Network className="size-3.5 rotate-180" />} label="אובייקטים קשורים · צאצא" items={children} link />
          <ChipRow icon={<Boxes className="size-3.5" />} label="טבלאות / אובייקטים" items={s.object ? [s.object, ...parents, ...children].slice(0, 10) : []} link />
          <ChipRow icon={<Terminal className="size-3.5" />} label="T-Codes" items={tcodes} />
          <ChipRow icon={<FileCode className="size-3.5" />} label="BAPIs / FM" items={funcs} />
          <ChipRow icon={<FileCode className="size-3.5" />} label="CDS Views" items={cds} />
          {!s.object && <p className="text-[12px] italic text-ink-3">שלב מושגי — נתונים נגזרים ברמת התהליך, ללא טבלה בודדת.</p>}
        </div>

        {/* S/4 */}
        {s4 && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
            <div className="mb-1.5 flex items-center gap-2"><ArrowRightLeft className="size-4 text-amber-600" /><h3 className="text-sm font-extrabold text-amber-800">ECC ↔ S/4HANA</h3><span className="rounded-full px-2 py-0.5 text-[10px] font-extrabold text-white" style={{ background: forWhiteText(RISK_COLOR[s4.risk])}}>{RISK_HE[s4.risk]}</span><span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-bold text-ink-3">{TRUST_HE[s4.trust]}</span></div>
            <p className="text-[13px] leading-relaxed text-amber-900">{k?.s4 || s4.impact?.changed || t?.s4 || "אין הערת S/4 ברמת הטבלה — נדרש אימות מול Simplification List / OSS."}</p>
          </div>
        )}

        {/* הארגון examples — concrete plant-floor scenarios */}
        {scenarioExamples.length > 0 && (
          <div className="rounded-2xl border border-brand/20 bg-brand/[0.04] p-4">
            <h3 className="mb-2 flex items-center gap-1.5 text-sm font-extrabold text-brand"><Briefcase className="size-4" />דוגמאות מ-הארגון</h3>
            <ul className="space-y-2">{scenarioExamples.map((ex, idx) => <li key={idx} className="flex gap-2 text-[13px] leading-relaxed text-ink-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />{ex}</li>)}</ul>
          </div>
        )}

        {/* incidents + QA + interview */}
        {incidents.length > 0 && (
          <div className="rounded-2xl border border-hairline bg-surface p-4 shadow-sm">
            <h3 className="mb-2 flex items-center gap-1.5 text-sm font-extrabold text-ink-1"><AlertTriangle className="size-4 text-amber-500" />תקלות נפוצות · {incidents.length}</h3>
            <div className="space-y-1.5">{incidents.slice(0, 4).map((inc) => (
              <Link key={inc.slug} href={`/troubleshooting/${inc.slug}/`} className="group flex items-start gap-2 rounded-xl border border-hairline bg-surface-2/60 p-2.5 transition hover:border-amber-300 hover:bg-amber-50">
                <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-amber-500" /><span className="min-w-0 flex-1"><span className="block text-sm font-bold text-ink-1">{inc.he}</span><span className="block truncate text-[11px] text-ink-3">{inc.symptom}</span></span><ArrowLeft className="size-3.5 shrink-0 text-ink-3 group-hover:text-amber-600" />
              </Link>))}</div>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-hairline bg-surface p-4 shadow-sm">
            <h3 className="mb-2 flex items-center gap-1.5 text-sm font-extrabold text-ink-1"><ShieldCheck className="size-4 text-emerald-600" />רעיונות לבדיקת QA</h3>
            <ul className="space-y-1.5">{s.qaHe.map((q, idx) => <li key={idx} className="flex gap-1.5 text-[13px] text-ink-2"><span className="text-emerald-500">✓</span>{q}</li>)}</ul>
          </div>
          <div className="rounded-2xl border border-hairline bg-surface p-4 shadow-sm">
            <h3 className="mb-2 flex items-center gap-1.5 text-sm font-extrabold text-ink-1"><GraduationCap className="size-4 text-brand" />שאלות ראיון</h3>
            <ul className="space-y-2">{s.interview.map((q, idx) => <li key={idx} className="text-[13px] text-ink-2"><span className={`me-1.5 rounded px-1.5 py-0.5 text-[9px] font-extrabold ${q.level === "junior" ? "bg-blue-100 text-blue-700" : "bg-violet-100 text-violet-700"}`}>{q.level === "junior" ? "Junior" : "Senior"}</span>{q.q}</li>)}</ul>
          </div>
        </div>

        {/* consultant notes — persisted locally per step */}
        <ConsultantNotes stepId={s.id} accent={accent} />

        {/* action row */}
        {s.object && (
          <div className="flex flex-wrap gap-2">
            <Link href={`/sap-infrastructure/?focus=${encodeURIComponent(s.object)}`} className="tap inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white shadow-sm" style={{ background: forWhiteText(accent)}}><GitBranch className="size-4" />פתח בגרף</Link>
            <Link href={`/impact/${encodeURIComponent(s.object)}/`} className="tap inline-flex items-center gap-1.5 rounded-xl border border-hairline bg-surface px-3.5 py-2.5 text-xs font-bold text-ink-2 transition hover:border-brand/40 hover:text-brand"><Gauge className="size-4" />ניתוח השפעה</Link>
            
            {incidents[0] && <Link href={`/troubleshooting/${incidents[0].slug}/`} className="tap inline-flex items-center gap-1.5 rounded-xl border border-hairline bg-surface px-3.5 py-2.5 text-xs font-bold text-ink-2 transition hover:border-brand/40 hover:text-brand"><AlertTriangle className="size-4" />פתרון תקלות</Link>}
          </div>
        )}
      </section>
    </div>
  );
}

// Consultant notes — free-text per process step, saved locally (no backend).
function ConsultantNotes({ stepId, accent }: { stepId: string; accent: string }) {
  const [val, setVal] = useState("");
  const [saved, setSaved] = useState(false);
  const key = `neo:process:notes:${stepId}`;
  useEffect(() => { try { setVal(localStorage.getItem(key) || ""); } catch { /* noop */ } setSaved(false); }, [key]);
  useEffect(() => {
    const id = setTimeout(() => { try { localStorage.setItem(key, val); setSaved(true); } catch { /* noop */ } }, 500);
    return () => clearTimeout(id);
  }, [val, key]);
  return (
    <div className="rounded-2xl border border-hairline bg-surface p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 text-sm font-extrabold text-ink-1"><StickyNote className="size-4" style={{ color: accent }} />הערות יועץ</h3>
        {saved && val && <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600"><Check className="size-3.5" />נשמר</span>}
      </div>
      <textarea value={val} onChange={(e) => { setVal(e.target.value); setSaved(false); }} dir="rtl" rows={3}
        placeholder="רשום תובנות, gotchas, או צעדים לזכור לשלב זה… (נשמר מקומית)"
        className="w-full resize-y rounded-xl border border-hairline bg-surface-2 p-3 text-sm leading-relaxed text-ink-2 outline-none transition focus:border-brand/40 focus:bg-surface" />
    </div>
  );
}
