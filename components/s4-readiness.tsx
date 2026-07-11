"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Gauge, TrendingUp, AlertTriangle, Zap, Code2, Database, Network, ArrowLeft, ShieldCheck, Layers, Boxes } from "lucide-react";
import { computeReadiness, overallReadiness, type ModuleReadiness, type RTbl } from "@/lib/s4-readiness";

const BAND_HE: Record<string, { he: string; c: string }> = {
  "ECC Only": { he: "ECC בלבד", c: "#dc2626" }, "Hybrid": { he: "היברידי", c: "#f97316" },
  "S/4 Ready": { he: "מוכן ל-S/4", c: "#16a34a" }, "Cloud Ready": { he: "מוכן לענן", c: "#0d9488" },
};
const RISK_HE = { high: "סיכון גבוה", medium: "בינוני", low: "נמוך" } as const;
const RISK_C = { high: "#dc2626", medium: "#d97706", low: "#16a34a" } as const;

function Ring({ pct, color, size = 64 }: { pct: number; color: string; size?: number }) {
  const r = (size - 8) / 2, c = 2 * Math.PI * r;
  return <span className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
    <svg width={size} height={size} className="-rotate-90"><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={6} /><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} style={{ transition: "stroke-dashoffset .6s" }} /></svg>
    <span className="absolute text-sm font-extrabold tabular-nums" style={{ color }}>{pct}</span>
  </span>;
}

export function S4Readiness() {
  const [tables, setTables] = useState<RTbl[] | null>(null);
  const [sel, setSel] = useState<string | null>(null);
  useEffect(() => { fetch("/sap-infrastructure/dataset.json").then((r) => r.json()).then((d) => setTables(d.tables || [])).catch(() => setTables([])); }, []);

  const mods = useMemo(() => (tables ? computeReadiness(tables) : []), [tables]);
  const overall = overallReadiness(mods);
  const withT = mods.filter((m) => m.tables > 0);
  const risky = [...withT].sort((a, b) => (b.risk === "high" ? 1 : 0) - (a.risk === "high" ? 1 : 0) || b.deprecatedPct - a.deprecatedPct || a.score - b.score).slice(0, 5);
  const easiest = [...withT].sort((a, b) => b.score - a.score).slice(0, 5);
  const codeImpact = [...withT].sort((a, b) => b.customCodeImpact - a.customCodeImpact).slice(0, 5);
  const dataImpact = [...withT].sort((a, b) => b.dataModelImpact - a.dataModelImpact).slice(0, 5);
  const o = sel ? mods.find((m) => m.mod === sel) : null;
  const bandCounts = mods.reduce((a, m) => ((a[m.band] = (a[m.band] || 0) + 1), a), {} as Record<string, number>);

  if (!tables) return <div className="flex h-[60vh] items-center justify-center text-ink-3" dir="rtl">מחשב מוכנות S/4…</div>;

  const Mini = ({ title, icon, rows, metric }: { title: string; icon: React.ReactNode; rows: ModuleReadiness[]; metric: (m: ModuleReadiness) => string }) => (
    <div className="rounded-3xl border border-hairline bg-surface p-5 shadow-sm">
      <h3 className="mb-3 flex items-center gap-2 text-base font-extrabold text-ink-1">{icon}{title}</h3>
      <div className="space-y-1.5">{rows.map((m, i) => (
        <button key={m.mod} onClick={() => setSel(m.mod)} className="flex w-full items-center gap-2.5 rounded-xl bg-surface-2/60 px-3 py-2 text-right transition hover:bg-surface-2">
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-slate-900 text-[10px] font-bold text-white">{i + 1}</span>
          <span className="flex-1 text-[13px] font-extrabold text-ink-1">{m.he} <span className="font-mono text-[11px] text-ink-3">{m.mod}</span></span>
          <span className="text-[12px] font-extrabold tabular-nums" style={{ color: m.color }}>{metric(m)}</span>
        </button>
      ))}</div>
    </div>
  );

  return (
    <div className="mx-auto" dir="rtl">
      {/* hero */}
      <header className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-l from-slate-900 via-slate-800 to-[#0f766e] p-6 text-white shadow-xl sm:p-8">
        <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/60"><Gauge className="size-4" />S/4HANA Readiness Intelligence</div>
            <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">מרכז מוכנות S/4HANA</h1>
            <p className="mt-1.5 max-w-2xl text-sm text-white/85">ציוני מוכנות מחושבים ממטא-דאטה אמיתי — כיסוי Fiori/CDS, השפעת S/4, טבלאות שבוטלו, אובייקטי הגירה ו-landscape. ללא אחוזים קשיחים.</p>
            <div className="mt-3 flex flex-wrap gap-2 text-[12px] font-bold">{Object.entries(BAND_HE).map(([k, v]) => <span key={k} className="inline-flex items-center gap-1.5 rounded-full bg-surface/10 px-2.5 py-0.5"><span className="size-2 rounded-full" style={{ background: v.c }} />{v.he} · {bandCounts[k] || 0}</span>)}</div>
          </div>
          <div className="text-center"><Ring pct={overall} color="#fff" size={104} /><div className="mt-1 text-[11px] font-bold uppercase tracking-wide text-white/60">מוכנות כוללת</div></div>
        </div>
      </header>

      {/* module score grid */}
      <h2 className="mb-3 mt-6 flex items-center gap-2 text-xl font-extrabold text-ink-1"><Layers className="size-5 text-emerald-600" />מוכנות לפי מודול</h2>
      <div className="grid-adaptive xl:grid-cols-4">
        {mods.map((m) => { const band = BAND_HE[m.band]; return (
          <button key={m.mod} onClick={() => setSel(m.mod)} className={`group rounded-3xl border bg-surface p-4 text-right shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${sel === m.mod ? "border-emerald-300 ring-1 ring-emerald-200" : "border-hairline"}`}>
            <div className="flex items-start justify-between gap-2">
              <div><div className="font-mono text-lg font-extrabold text-ink-1">{m.mod}</div><div className="text-[12px] font-bold text-ink-3">{m.he}</div></div>
              <Ring pct={m.score} color={m.color} size={52} />
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-extrabold text-white" style={{ background: band.c }}>{band.he}</div>
            <div className="mt-2 grid grid-cols-3 gap-1 text-center text-[10px] font-bold text-ink-3">
              <div><div className="text-[13px] tabular-nums text-ink-2">{m.fioriPct}%</div>Fiori</div>
              <div><div className="text-[13px] tabular-nums text-ink-2">{m.cdsPct}%</div>CDS</div>
              <div><div className="text-[13px] tabular-nums text-ink-2">{m.tables}</div>טבלאות</div>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-hairline pt-2 text-[10px] font-bold">
              <span className="rounded px-1.5 py-0.5 text-white" style={{ background: RISK_C[m.risk] }}>{RISK_HE[m.risk]}</span>
              <span className="text-ink-3">מורכבות {m.complexity} · {m.effort}</span>
            </div>
          </button>
        ); })}
      </div>

      {/* executive dashboard */}
      <h2 className="mb-3 mt-7 flex items-center gap-2 text-xl font-extrabold text-ink-1"><TrendingUp className="size-5 text-emerald-600" />לוח הנהלה</h2>
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        <Mini title="5 המודולים המסוכנים" icon={<AlertTriangle className="size-4 text-rose-500" />} rows={risky} metric={(m) => RISK_HE[m.risk]} />
        <Mini title="5 ההגירות הקלות" icon={<Zap className="size-4 text-emerald-500" />} rows={easiest} metric={(m) => `${m.score}`} />
        <Mini title="השפעת קוד מותאם" icon={<Code2 className="size-4 text-violet-500" />} rows={codeImpact} metric={(m) => `${m.customCodeImpact} טבלאות`} />
        <Mini title="השפעת מודל נתונים" icon={<Database className="size-4 text-blue-500" />} rows={dataImpact} metric={(m) => `${m.dataModelImpact}`} />
      </div>

      {/* selected module — dependency map + detail */}
      {o && (
        <div className="mt-6 overflow-hidden rounded-3xl border border-hairline bg-surface shadow-sm" style={{ animation: "fadeUp .2s ease both" }}>
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 text-white" style={{ background: `linear-gradient(135deg,${o.color},${o.color}cc)` }}>
            <div><div className="font-mono text-2xl font-extrabold">{o.mod}</div><div className="text-sm font-bold opacity-90">{o.he} · {BAND_HE[o.band].he}</div></div>
            <div className="flex items-center gap-4 text-center">
              {[["מוכנות", `${o.score}`], ["Fiori", `${o.fioriPct}%`], ["CDS", `${o.cdsPct}%`], ["S/4 signal", `${o.s4Pct}%`], ["בוטלו", `${o.deprecatedPct}%`]].map(([l, v]) => <div key={l}><div className="text-xl font-extrabold tabular-nums">{v}</div><div className="text-[10px] font-bold uppercase opacity-70">{l}</div></div>)}
            </div>
          </div>
          <div className="grid gap-4 p-6 lg:grid-cols-2">
            {/* dependency / target architecture map */}
            <div>
              <h3 className="mb-2 flex items-center gap-1.5 text-sm font-extrabold text-ink-1"><Network className="size-4" />ארכיטקטורת יעד · {o.mod} → S/4</h3>
              <div className="flex flex-wrap items-center gap-1.5">
                {[`${o.mod} (ECC)`, "CDS Views", "Embedded Analytics", o.fioriPct > 0 ? "Fiori Apps" : null, o.band === "Cloud Ready" ? "Cloud (SF/SAC)" : "S/4HANA Core", "HANA"].filter(Boolean).map((s, i, arr) => (
                  <span key={s as string} className="flex items-center gap-1.5">
                    <span className="rounded-xl border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[12px] font-bold text-emerald-800">{s}</span>
                    {i < arr.length - 1 && <ArrowLeft className="size-3.5 text-emerald-300" />}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-[12px] text-ink-3">דוגמה: {o.mod} → CDS → Fiori → {o.band === "Cloud Ready" ? "Datasphere/SAC" : "Embedded Analytics + MATDOC/ACDOCA"}.</p>
            </div>
            {/* factors + deep links */}
            <div>
              <h3 className="mb-2 flex items-center gap-1.5 text-sm font-extrabold text-ink-1"><ShieldCheck className="size-4" />גורמי מוכנות</h3>
              <div className="space-y-1.5 text-[13px]">
                {[["כיסוי Fiori", o.fioriPct], ["כיסוי CDS", o.cdsPct], ["איתות S/4 (impact)", o.s4Pct]].map(([l, v]) => (
                  <div key={l as string} className="flex items-center gap-2"><span className="w-28 shrink-0 font-bold text-ink-2">{l}</span><div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2"><span className="block h-full rounded-full" style={{ width: `${v}%`, background: o.color }} /></div><span className="w-9 text-left text-[12px] font-extrabold tabular-nums text-ink-3">{v}%</span></div>
                ))}
                <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-[12px] font-bold text-ink-3"><span>אובייקטי הגירה: {o.migrationObjs}</span><span>Simplification: {o.simplification}</span><span>השפעת קוד: {o.customCodeImpact}</span></div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5 border-t border-hairline pt-3">
                <Link href="/s4hana/" className="rounded-lg bg-surface-2 px-2.5 py-1 text-[11px] font-bold text-ink-2 transition hover:bg-hairline">מרכז S/4</Link>
                <Link href="/migration-cockpit/" className="rounded-lg bg-surface-2 px-2.5 py-1 text-[11px] font-bold text-ink-2 transition hover:bg-hairline">Migration Cockpit</Link>
                <Link href="/ecc-s4/" className="rounded-lg bg-surface-2 px-2.5 py-1 text-[11px] font-bold text-ink-2 transition hover:bg-hairline">ECC ↔ S/4</Link>
                <Link href="/sap-infrastructure/" className="rounded-lg bg-surface-2 px-2.5 py-1 text-[11px] font-bold text-ink-2 transition hover:bg-hairline">מודל נתונים</Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <p className="py-6 text-center text-[11px] text-ink-3">הציונים מחושבים בזמן ריצה ממטא-דאטה (Fiori/CDS/S4_IMPACT/catalog/migration/landscape) — לא אחוזים קשיחים. <Boxes className="inline size-3" /></p>
    </div>
  );
}
