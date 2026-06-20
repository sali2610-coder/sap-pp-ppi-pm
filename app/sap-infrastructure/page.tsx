"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Search, ChevronLeft, Home, ZoomIn, ZoomOut, X, KeyRound, Link2, Expand, Shrink, Scan, Maximize2, GripVertical, ArrowLeft, Hand, ChevronDown, Database, GitBranch, Workflow, Clock, RotateCcw } from "lucide-react";
import { MOD_PURPOSE, MOD_FLOW, MOD_REPORTS, genExampleRecords, ERD_MODULES, TECH_FIELDS, FIELDS_PLUS, OBJECTS } from "./meta";
import { Highlight } from "@/components/highlight";
import { s4For, TRUST_HE, RISK_HE, RISK_COLOR } from "@/lib/s4";
import { loadGraphMemory, saveGraphMemory } from "@/lib/prefs";
import dagre from "dagre";

const BASE = "/sap-infrastructure";
type Field = [string, string, string, string];
type Rel = { role: "parent" | "child"; table: string; card: string; desc: string };
type Tbl = { name: string; mod: string; real: boolean; he: string; en: string; tcodes: string; fiori: string; s4: string; s4alt: string; pk: string[]; fields: Field[]; funcs: string[]; cds: string[]; rel: Rel[]; degree: number; zone: string };
type Bp = { code: string; purpose: string; objects: string[]; docs: string[]; tables: string[]; inputs: string[]; outputs: string[]; connects: string[] };
type Data = { meta: { counts: Record<string, number> }; palette: Record<string, string>; modules: { code: string; name: string; he: string }[]; blueprints: Bp[]; processes: { id: string; name: string; he: string; mods: string[]; docs: string[]; color: string }[]; documents: { id: string; he: string; mod: string; tables: string[] }[]; tables: Tbl[]; shared: { name: string; he: string }[]; crossModule: { from: string; to: string; he: string }[] };

const fieldsOf = (t: { name: string; fields: Field[] }) => (FIELDS_PLUS[t.name] || t.fields) as Field[];
const UNIVERSE = ["MM", "SD", "PP", "PP-PI", "PM", "QM", "CS", "FI", "CO", "BATCH", "CLASS", "IDOC", "PIPO"];
const MOD_NAME_HE: Record<string, string> = { MM: "ניהול חומרים", SD: "מכירות והפצה", PP: "תכנון ייצור", "PP-PI": "ייצור תהליכי", PM: "תחזוקת מפעל", QM: "ניהול איכות", CS: "שירות לקוחות", FI: "הנהלת חשבונות", CO: "בקרת עלויות", BATCH: "ניהול אצוות", CLASS: "מערכת סיווג", IDOC: "מסגרת IDOC/ALE", PIPO: "ממשקי PI/PO" };
const TABS = [["objects", "אובייקטים"], ["process", "תהליך"], ["erd", "מודל נתונים"], ["technical", "טכני"]] as const;
const erdMembers = (data: Data, code: string): Tbl[] => { const byName = Object.fromEntries(data.tables.map((t) => [t.name, t])); const list = (ERD_MODULES[code] || []).map((n) => byName[n]).filter(Boolean) as Tbl[]; return list.length ? list : data.tables.filter((t) => t.mod === code).sort((a, b) => b.degree - a.degree).slice(0, 16); };

const ANIM = `@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}@keyframes erdflow{to{stroke-dashoffset:-200}}.flowline{stroke-dasharray:7 6;animation:erdflow 3s linear infinite}.flowline.fast{animation-duration:1s}@keyframes pop{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}@keyframes countpulse{0%{opacity:.4}100%{opacity:1}}@keyframes drawerIn{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:translateX(0)}}@keyframes haze{0%,100%{opacity:.35}50%{opacity:.7}}@media (prefers-reduced-motion:reduce){.flowline{animation:none!important}}`;
function Count({ n, ms = 900 }: { n: number; ms?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => { let raf = 0; const t0 = performance.now(); const step = (t: number) => { const p = Math.min(1, (t - t0) / ms); setV(Math.round((1 - Math.pow(1 - p, 3)) * n)); if (p < 1) raf = requestAnimationFrame(step); }; raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf); }, [n, ms]);
  return <>{v}</>;
}

export default function Page() {
  const [data, setData] = useState<Data | null>(null);
  const [nav, setNav] = useState<{ level: "universe" | "module"; module?: string; tab?: string; focus?: string[] }>({ level: "universe" });
  const [inspect, setInspect] = useState<string | null>(null);
  const [field, setField] = useState<{ table: string; field: string } | null>(null);
  const [q, setQ] = useState("");
  useEffect(() => { fetch(`${BASE}/dataset.json`).then((r) => r.json()).then(setData).catch(() => {}); }, []);
  const color = useCallback((m?: string | null) => (data && m && data.palette[m]) || "#64748b", [data]);
  const byName = useMemo(() => (data ? Object.fromEntries(data.tables.map((t) => [t.name, t])) : {}) as Record<string, Tbl>, [data]);
  const openModule = (m: string, tab = "erd") => { setNav({ level: "module", module: m, tab }); setInspect(null); setField(null); };

  const results = useMemo(() => {
    if (!data || !q.trim()) return [] as { type: string; label: string; sub: string; go: () => void }[];
    const s = q.trim().toUpperCase(); const out: { type: string; label: string; sub: string; go: () => void }[] = [];
    UNIVERSE.forEach((m) => { if (m.includes(s) || MOD_NAME_HE[m]?.includes(q)) out.push({ type: "מודול", label: m, sub: MOD_NAME_HE[m], go: () => openModule(m) }); });
    data.tables.forEach((t) => {
      if (t.name.includes(s) || (t.he || "").includes(q)) out.push({ type: "טבלה", label: t.name, sub: `${t.mod} · ${t.he || t.en}`, go: () => { setNav({ level: "module", module: t.mod, tab: "erd", focus: [t.name] }); setTimeout(() => setInspect(t.name), 80); } });
      else if ((t.tcodes || "").toUpperCase().includes(s)) out.push({ type: "T-Code", label: t.tcodes, sub: t.name, go: () => { openModule(t.mod, "technical"); setTimeout(() => setInspect(t.name), 80); } });
      else if ((t.funcs || []).some((f) => f.toUpperCase().includes(s))) out.push({ type: "BAPI", label: (t.funcs || []).find((f) => f.toUpperCase().includes(s))!, sub: t.name, go: () => { openModule(t.mod, "technical"); setTimeout(() => setInspect(t.name), 80); } });
    });
    return out.slice(0, 12);
  }, [q, data]);

  if (!data) return <div className="flex h-[60vh] items-center justify-center text-slate-400" dir="rtl">טוען את ה-Explorer…</div>;
  const inspector = field && byName[field.table]
    ? <FieldInspector data={data} color={color} t={byName[field.table]} field={field.field} byName={byName} onClose={() => setField(null)} onGo={(n) => { setField(null); setInspect(n); }} />
    : inspect && byName[inspect]
    ? <Inspector data={data} color={color} t={byName[inspect]} byName={byName} onClose={() => setInspect(null)} onGo={setInspect} />
    : null;

  return (
    <div dir="rtl" className="relative mx-[calc(50%-50vw)] -my-8 w-screen max-w-[100vw] overflow-hidden border-y border-slate-200 bg-white text-slate-900">
      <style>{ANIM}</style>
      {/* unified slim header: brand · breadcrumb · compact search */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-slate-200 bg-gradient-to-l from-white to-slate-50 px-4 py-1.5">
        <span className="rounded-md bg-[#d62027] px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">NEO</span>
        <span className="text-sm font-extrabold text-slate-900">SAP Architecture Explorer</span>
        <nav className="flex items-center gap-1 text-[11px]">
          <button onClick={() => setNav({ level: "universe" })} className="flex items-center gap-1 rounded px-1 py-0.5 font-semibold text-slate-400 hover:bg-slate-100 hover:text-slate-700"><Home className="size-3" />Universe</button>
          {nav.module && <><ChevronLeft className="size-3 text-slate-300" /><span className="font-bold text-slate-700">{nav.module}</span></>}
          {nav.module && nav.tab && <><ChevronLeft className="size-3 text-slate-300" /><span className="font-semibold text-[#d62027]">{(TABS.find((x) => x[0] === nav.tab) || ["", nav.tab])[1]}</span></>}
        </nav>
        <div className="relative ms-auto w-full max-w-xs">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-1 shadow-sm">
            <Search className="size-3.5 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש מהיר · מודול · טבלה" className="w-full bg-transparent text-[13px] outline-none placeholder:text-slate-400" />
            {q && <button onClick={() => setQ("")}><X className="size-3.5 text-slate-400" /></button>}
          </div>
          {results.length > 0 && (
            <div className="absolute z-50 mt-1 max-h-80 w-full overflow-auto rounded-xl border border-slate-200 bg-white shadow-2xl">
              {results.map((r, i) => (<button key={i} onClick={() => { r.go(); setQ(""); }} className="flex w-full items-center justify-between gap-2 border-b border-slate-100 px-3 py-2 text-right last:border-0 hover:bg-slate-50">
                <span className="min-w-0"><span className="block truncate font-mono text-sm font-bold text-slate-800">{r.label}</span><span className="block truncate text-xs text-slate-500">{r.sub}</span></span>
                <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500">{r.type}</span></button>))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-50/40 px-4 py-2">
        {nav.level === "universe" && <Universe data={data} color={color} onModule={openModule} />}
        {nav.level === "module" && nav.module && <Workspace data={data} color={color} code={nav.module} tab={nav.tab || "erd"} focus={nav.focus} byName={byName}
          setTab={(t) => setNav({ level: "module", module: nav.module, tab: t })} openErd={(focus) => setNav({ level: "module", module: nav.module, tab: "erd", focus })}
          onTable={setInspect} onField={(table, f) => { setInspect(null); setField({ table, field: f }); }} onModule={openModule} onHome={() => setNav({ level: "universe" })} />}
      </div>
      {inspector}
    </div>
  );
}

// compact export toolbar (replaces the old permanent footer)
function ExportBar() {
  return (
    <div className="flex shrink-0 items-center gap-1">
      {[["SAP-Enterprise-Architecture-A0.pdf", "PDF"], ["SAP-Enterprise-Architecture-A0.png", "PNG"], ["SAP-Enterprise-Architecture-A0.svg", "SVG"], ["dataset.json", "JSON"]].map(([f, l]) => (
        <a key={f} href={`${BASE}/${f}`} download title={`הורד ${l}`} className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-bold text-slate-500 transition hover:border-[#d62027] hover:text-[#d62027]">{l}</a>
      ))}
    </div>
  );
}

/* ===================== UNIVERSE (light, branded, animated grid) ===================== */
function Universe({ data, color, onModule }: { data: Data; color: (m?: string | null) => string; onModule: (m: string) => void }) {
  // Card table count MUST match what the module drill-down actually shows
  // (erdMembers = ERD_MODULES membership incl. shared core tables), otherwise the
  // summary card (owned-only) disagrees with the content (e.g. PP: 3 owned vs 20 shown).
  const tc = (m: string) => erdMembers(data, m).length, pc = (m: string) => data.processes.filter((p) => p.mods.includes(m)).length;
  const [lastMod, setLastMod] = useState<string | null>(null);
  useEffect(() => { const m = loadGraphMemory(); if (m.mod && UNIVERSE.includes(m.mod)) setLastMod(m.mod); }, []);
  return (
    <div className="space-y-5">
      {lastMod && (
        <button onClick={() => onModule(lastMod)} className="flex w-full items-center justify-between gap-3 rounded-2xl border border-[#d62027]/20 bg-[#d62027]/5 px-4 py-2.5 text-right shadow-sm transition hover:border-[#d62027]/40 hover:bg-[#d62027]/10 active:scale-[.99]" style={{ animation: "fadeUp .4s ease both" }}>
          <span className="inline-flex items-center gap-2 text-sm font-bold text-[#d62027]"><Clock className="size-4" />המשך מהיכן שעצרת — {MOD_NAME_HE[lastMod] || lastMod}</span>
          <ArrowLeft className="size-4 text-[#d62027]" />
        </button>
      )}
      {/* SAP CORE hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-[#d62027] via-[#c01c22] to-[#9a1419] p-7 text-white shadow-lg" style={{ animation: "fadeUp .5s ease both" }}>
        <div className="absolute -left-16 -top-16 size-56 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-20 right-10 size-64 rounded-full bg-black/10 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/70">Enterprise Architecture</div>
            <h2 className="mt-1 text-3xl font-extrabold">SAP CORE — ליבת אובייקטים משותפים</h2>
            <p className="mt-1 max-w-xl text-sm text-white/80">כל מודולי ה-SAP נשענים על אותם אובייקטי ליבה. בחר מודול כדי לצלול: תהליך → אובייקטים → טבלאות → שדות.</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {data.shared.slice(0, 8).map((s, i) => <span key={s.name} className="rounded-lg bg-white/15 px-2.5 py-1 font-mono text-xs font-bold text-white ring-1 ring-white/20" style={{ animation: `pop .4s ease ${i * 50 + 200}ms both` }}>{s.name}</span>)}
          </div>
        </div>
        <div className="relative mt-4 flex flex-wrap gap-4 text-sm">
          {[["מודולים", data.meta.counts.modules], ["טבלאות", data.meta.counts.tables], ["מסמכים", data.meta.counts.documents], ["תהליכים", data.meta.counts.processes]].map(([k, v]) => (
            <div key={k as string} className="flex items-baseline gap-1.5"><span className="text-2xl font-extrabold tabular-nums"><Count n={v as number} /></span><span className="text-white/70">{k}</span></div>
          ))}
        </div>
      </div>

      {/* module cards grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {UNIVERSE.map((m, i) => { const c = color(m);
          return (
            <button key={m} onClick={() => onModule(m)} style={{ animation: `fadeUp .45s ease ${i * 45 + 120}ms both` }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-right shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-xl">
              <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: c }} />
              <span className="pointer-events-none absolute -left-8 -top-8 size-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20" style={{ background: c }} />
              <div className="flex items-start justify-between">
                <span className="font-mono text-2xl font-extrabold text-slate-900">{m}</span>
                <span className="grid size-10 place-items-center rounded-xl text-xs font-extrabold text-white shadow-sm" style={{ background: c }}>{m.slice(0, 3)}</span>
              </div>
              <div className="mt-1.5 text-sm font-bold text-slate-700">{MOD_NAME_HE[m]}</div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-500 tabular-nums"><Count n={tc(m)} /> טבלאות</span>
                <span className="rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-bold text-[#d62027] tabular-nums"><Count n={pc(m)} /> תהליכים</span>
              </div>
              <span className="mt-3 block text-[11px] font-bold text-slate-300 transition group-hover:text-[#d62027]">כניסה למודול →</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ===================== WORKSPACE ===================== */
function Workspace({ data, color, code, tab, focus, byName, setTab, openErd, onTable, onField, onModule, onHome }: { data: Data; color: (m?: string | null) => string; code: string; tab: string; focus?: string[]; byName: Record<string, Tbl>; setTab: (t: string) => void; openErd: (f?: string[]) => void; onTable: (t: string) => void; onField: (table: string, field: string) => void; onModule: (m: string) => void; onHome: () => void }) {
  const c = color(code); const bp = data.blueprints.find((b) => b.code === code); const purpose = bp?.purpose || MOD_PURPOSE[code] || "";
  return (
    <div className="space-y-2.5" style={{ animation: "fadeUp .35s ease both" }}>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 shadow-sm" style={{ borderInlineStartColor: c, borderInlineStartWidth: 4 }}>
        <div className="flex min-w-0 items-baseline gap-2">
          <span className="font-mono text-lg font-extrabold text-slate-900">{code}</span>
          <span className="text-sm font-bold text-slate-600">{MOD_NAME_HE[code]}</span>
          <span className="hidden truncate text-[11px] text-slate-400 lg:inline">· {purpose}</span>
        </div>
        <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
          {TABS.map(([id, label]) => <button key={id} onClick={() => setTab(id)} className={`rounded-md px-3 py-1 text-[13px] font-bold transition ${tab === id ? "bg-[#d62027] text-white shadow-sm" : "text-slate-500 hover:text-slate-900"}`}>{label}</button>)}
        </div>
      </div>
      {tab === "objects" && <ObjectsView data={data} color={color} code={code} byName={byName} onObjectErd={(tables) => openErd(tables)} onTable={onTable} />}
      {tab === "process" && <ProcessFlow color={color} code={code} />}
      {tab === "erd" && <Erd data={data} color={color} code={code} byName={byName} focus={focus} onField={onField} onHome={onHome} onModule={onModule} />}
      {tab === "technical" && <TechList data={data} color={color} code={code} onTable={onTable} />}
    </div>
  );
}

/* ===================== L2 OBJECTS ===================== */
function ObjectsView({ data, color, code, byName, onObjectErd, onTable }: { data: Data; color: (m?: string | null) => string; code: string; byName: Record<string, Tbl>; onObjectErd: (tables?: string[]) => void; onTable: (t: string) => void }) {
  const objs = OBJECTS[code] || []; const [open, setOpen] = useState<number | null>(null); const c = color(code);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between"><h3 className="text-base font-bold text-slate-800">אובייקטים עסקיים · {code}</h3><span className="text-xs text-slate-500">לחץ אובייקט → טבלאות הליבה</span></div>
      <div className="flex flex-wrap items-stretch gap-3">
        {objs.map((o, i) => (
          <div key={i} className="flex items-stretch gap-3">
            <div>
              <button onClick={() => setOpen(open === i ? null : i)} style={{ animation: `fadeUp .4s ease ${i * 55}ms both`, borderColor: c }}
                className={`group flex w-56 flex-col rounded-2xl border bg-white p-5 text-right shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${open === i ? "ring-2" : ""}`}>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-1 text-2xl font-extrabold leading-tight text-slate-900">{o.he}</span>
                <span className="font-mono text-xs text-slate-400">{o.en}</span>
                <span className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full px-2.5 py-1 text-[11px] font-bold" style={{ background: c + "1a", color: c }}>{o.tables.length} טבלאות {open === i ? "▲" : "▼"}</span>
              </button>
              {open === i && (
                <div className="mt-2 w-56 rounded-xl border border-slate-200 bg-white p-3 shadow-sm" style={{ animation: "fadeUp .3s ease both" }}>
                  <div className="mb-2 flex items-center justify-between"><span className="text-[10px] font-bold uppercase text-slate-400">טבלאות ליבה</span><button onClick={() => onObjectErd(o.tables)} className="rounded-md px-2 py-0.5 text-[11px] font-bold text-white" style={{ background: c }}>ERD →</button></div>
                  <div className="space-y-1.5">{o.tables.map((tn) => { const t = byName[tn]; return <button key={tn} onClick={() => onTable(tn)} disabled={!t} className="flex w-full items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-right hover:border-slate-300 disabled:opacity-40">
                    <span className="font-mono text-sm font-bold" style={{ color: t ? color(t.mod) : "#94a3b8" }}>{tn}</span><span className="truncate text-[10px] text-slate-400">{t?.he || ""}</span></button>; })}</div>
                </div>
              )}
            </div>
            {i < objs.length - 1 && <ArrowLeft className="size-6 shrink-0 self-center text-slate-300" />}
          </div>
        ))}
      </div>
      <button onClick={() => onObjectErd(undefined)} className="inline-flex items-center gap-2 rounded-xl bg-[#d62027] px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:brightness-110"><Maximize2 className="size-4" /> פתח מודל נתונים (ERD) של {code}</button>
    </div>
  );
}

function ProcessFlow({ color, code }: { color: (m?: string | null) => string; code: string }) {
  const c = color(code); const flow = MOD_FLOW[code] || [];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-bold text-slate-700">זרימה עסקית · {code}</h3>
      <div className="flex flex-wrap items-stretch gap-2">{flow.map((s, i) => (<div key={i} className="flex items-stretch gap-2" style={{ animation: `fadeUp .4s ease ${i * 50}ms both` }}>
        <div className="flex w-40 flex-col justify-center rounded-xl border bg-slate-50 p-3 text-center" style={{ borderColor: c }}><div className="text-base font-bold text-slate-900">{s.he}</div><div className="font-mono text-[10px] text-slate-500">{s.en}</div></div>
        {i < flow.length - 1 && <ArrowLeft className="size-5 self-center text-slate-300" />}</div>))}</div>
    </div>
  );
}

function TechList({ data, color, code, onTable }: { data: Data; color: (m?: string | null) => string; code: string; onTable: (t: string) => void }) {
  const list = erdMembers(data, code);
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-right text-sm">
        <thead className="bg-slate-50 text-[11px] uppercase text-slate-400"><tr><th className="px-3 py-2 font-semibold">טבלה</th><th className="px-3 py-2 font-semibold">תיאור</th><th className="px-3 py-2 font-semibold">PK</th><th className="px-3 py-2 font-semibold">קשרים</th><th className="px-3 py-2 font-semibold">T-Codes</th></tr></thead>
        <tbody>{list.map((t) => (<tr key={t.name} onClick={() => onTable(t.name)} className="cursor-pointer border-t border-slate-100 hover:bg-slate-50">
          <td className="px-3 py-2 font-mono font-bold" style={{ color: color(t.mod) }}>{t.name}</td><td className="px-3 py-2 text-slate-600">{t.he || t.en}</td>
          <td className="px-3 py-2 font-mono text-xs text-amber-600">{t.pk.join(", ") || "—"}</td><td className="px-3 py-2 text-slate-500">{t.degree}</td><td className="px-3 py-2 font-mono text-xs text-slate-500">{t.tcodes || "—"}</td></tr>))}</tbody>
      </table>
    </div>
  );
}

/* ===================== L4 ERD ===================== */
function cardKind(card: string) { const u = (card || "").toUpperCase(); if (u.includes("N:N") || u.includes("M:N")) return "N:N"; if (u.replace(/\s/g, "") === "1:1") return "1:1"; return "1:N"; }

function usePZ() {
  const [t, setT] = useState({ x: 0, y: 0, k: 1 });
  const d = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  return { t, setT,
    bg: { onWheel: (e: React.WheelEvent) => { const f = e.deltaY < 0 ? 1.12 : 1 / 1.12; setT((p) => ({ ...p, k: Math.min(2.6, Math.max(0.3, p.k * f)) })); },
      onPointerDown: (e: React.PointerEvent) => { if ((e.target as Element).closest("[data-card]")) return; d.current = { x: e.clientX, y: e.clientY, ox: t.x, oy: t.y }; },
      onPointerMove: (e: React.PointerEvent) => { if (d.current) setT((p) => ({ ...p, x: d.current!.ox + (e.clientX - d.current!.x), y: d.current!.oy + (e.clientY - d.current!.y) })); },
      onPointerUp: () => { d.current = null; }, onPointerLeave: () => { d.current = null; } },
    ctrl: { zoomIn: () => setT((p) => ({ ...p, k: Math.min(2.6, p.k * 1.2) })), zoomOut: () => setT((p) => ({ ...p, k: Math.max(0.3, p.k / 1.2) })) } };
}

const MODES = [["focus", "מיקוד", "Focus"], ["dep", "תלויות", "Dependency"], ["lineage", "שושלת", "Lineage"], ["impact", "השפעה", "Impact"], ["flow", "זרימה עסקית", "Business Flow"]] as const;
type Mode = typeof MODES[number][0];
const MODE_DESC: Record<Mode, { d: string; needsSel: boolean }> = {
  focus: { d: "מדגיש את הטבלה שנבחרה ואת שכנותיה הישירים (אב + צאצא), ומעמעם את השאר.", needsSel: true },
  dep: { d: "מציג את כל שרשרת התלויות של הטבלה — מעלה ומטה — לאורך המודל כולו.", needsSel: true },
  lineage: { d: "שושלת נתונים: מאיפה הנתונים מגיעים — כל המקורות במעלה הזרם.", needsSel: true },
  impact: { d: "ניתוח השפעה: מה יושפע אם תשנה את הטבלה — הכל במורד הזרם.", needsSel: true },
  flow: { d: "כיוון הזרימה בין כל הטבלאות במודל (אב → צאצא). פעיל גם ללא בחירת טבלה.", needsSel: false },
};
const orderFields = (tf: Field[]) => [...tf.filter((f) => f[3] === "PK"), ...tf.filter((f) => f[3] === "FK"), ...tf.filter((f) => f[3] !== "PK" && f[3] !== "FK")];


function Erd({ data, color, code, byName, focus, onField, onHome, onModule }: { data: Data; color: (m?: string | null) => string; code: string; byName: Record<string, Tbl>; focus?: string[]; onField: (table: string, field: string) => void; onHome: () => void; onModule: (m: string) => void }) {
  const [selMods, setSelMods] = useState<Set<string>>(() => new Set([code]));
  useEffect(() => { setSelMods(new Set([code])); }, [code]);
  const ordered = UNIVERSE.filter((m) => selMods.has(m));
  const W = 268, H = 116; // collapsed cube size

  // Auto-layout via dagre: real hierarchical ranking + crossing reduction
  // (left→right = SAP master → transaction → posting flow). Enterprise engine,
  // not manual placement.
  const { shown, pos, own, links, vbW, vbH } = useMemo(() => {
    const memberMap: Record<string, Tbl[]> = {}; ordered.forEach((m) => { memberMap[m] = erdMembers(data, m); });
    const allNames = [...new Set(ordered.flatMap((m) => memberMap[m].map((t) => t.name)))];
    const owner: Record<string, string> = {};
    allNames.forEach((n) => { const t = byName[n]; owner[n] = t && selMods.has(t.mod) ? t.mod : ordered.find((m) => memberMap[m].some((x) => x.name === n)) || ordered[0]; });
    const sh = allNames.map((n) => byName[n]).filter(Boolean) as Tbl[];
    const nameset = new Set(sh.map((t) => t.name));
    const lk: { a: string; b: string; card: string }[] = [];
    sh.forEach((t) => t.rel.forEach((r) => { if (nameset.has(r.table)) { const a = r.role === "parent" ? t.name : r.table, b = r.role === "parent" ? r.table : t.name; if (a !== b && !lk.find((l) => l.a === a && l.b === b)) lk.push({ a, b, card: r.card || "1:N" }); } }));
    const gg = new dagre.graphlib.Graph({ multigraph: false });
    gg.setGraph({ rankdir: "LR", nodesep: 44, ranksep: 130, edgesep: 24, marginx: 72, marginy: 72, ranker: "tight-tree" });
    gg.setDefaultEdgeLabel(() => ({}));
    sh.forEach((t) => gg.setNode(t.name, { width: W, height: H }));
    lk.forEach((l) => { if (gg.hasNode(l.a) && gg.hasNode(l.b)) gg.setEdge(l.a, l.b); });
    try { dagre.layout(gg); } catch { /* layout best-effort */ }
    const p: Record<string, { x: number; y: number }> = {};
    sh.forEach((t, i) => { const nd = gg.node(t.name); p[t.name] = nd ? { x: nd.x - W / 2, y: nd.y - H / 2 } : { x: 72, y: 72 + i * (H + 40) }; });
    const gr = gg.graph();
    return { shown: sh, pos: p, own: owner, links: lk, vbW: (gr.width || 1200) + 144, vbH: (gr.height || 720) + 144 };
  }, [code, [...selMods].sort().join(",")]);

  const [sel, setSel] = useState<string | null>(focus && focus[0] ? focus[0] : null);
  const [drawer, setDrawer] = useState<string | null>(focus && focus[0] ? focus[0] : null);
  const [hv, setHv] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("focus");
  const [modeInfo, setModeInfo] = useState<Mode | null>("focus");
  useEffect(() => { if (!modeInfo) return; const id = setTimeout(() => setModeInfo(null), 5500); return () => clearTimeout(id); }, [modeInfo]);
  const [s4Filter, setS4Filter] = useState<"all" | "impacted" | "verified" | "needs" | "high">("all");
  const s4ok = (name: string) => {
    if (s4Filter === "all") return true;
    const st = s4For(name, byName[name]?.s4, byName[name]?.s4alt);
    if (s4Filter === "impacted") return st.impacted;
    if (s4Filter === "high") return st.risk === "high";
    if (s4Filter === "verified") return st.trust === "verified";
    if (s4Filter === "needs") return st.needs || st.trust === "partial";
    return true;
  };
  const [tr, setTr] = useState({ x: 0, y: 0, k: 1 });
  const [fs, setFs] = useState(false);
  const [panMode, setPanMode] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pan = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  // draggable nodes: manual position overrides on top of the auto-layout
  const [dragPos, setDragPos] = useState<Record<string, { x: number; y: number }>>({});
  const nodeDrag = useRef<{ name: string; sx: number; sy: number; ox: number; oy: number; moved: boolean } | null>(null);
  useEffect(() => { setDragPos({}); }, [pos]); // reset overrides whenever auto-layout recomputes
  const P = useCallback((n: string) => dragPos[n] || pos[n], [dragPos, pos]);
  useEffect(() => { setSel(focus && focus[0] ? focus[0] : null); setDrawer(focus && focus[0] ? focus[0] : null); }, [code, focus]);
  useEffect(() => { const h = () => setFs(!!document.fullscreenElement); document.addEventListener("fullscreenchange", h); return () => document.removeEventListener("fullscreenchange", h); }, []);
  const [help, setHelp] = useState(false);
  // memory: restore last graph mode + selected node on mount; persist state
  useEffect(() => {
    const m = loadGraphMemory();
    if (m.mode && MODES.some((x) => x[0] === m.mode)) setMode(m.mode as Mode);
    if (!(focus && focus[0]) && m.sel && byName[m.sel]) setSel(m.sel);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { saveGraphMemory({ mode, mod: code }); }, [mode, code]);
  useEffect(() => { saveGraphMemory({ k: tr.k }); }, [tr.k]);
  useEffect(() => { saveGraphMemory({ sel }); }, [sel]);
  // power-user keyboard shortcuts (Phase 7): F focus · R relationships · L lineage · S S/4 · T details · / search · Esc close · ? help
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (k === "escape") { if (drawer) setDrawer(null); else if (sel) setSel(null); else if (help) setHelp(false); return; }
      if (e.key === "?" || (e.shiftKey && k === "/")) { e.preventDefault(); setHelp((v) => !v); return; }
      if (k === "/") { e.preventDefault(); window.dispatchEvent(new Event("neo:open-palette")); return; }
      if (k === "f") { setMode("focus"); setModeInfo("focus"); }
      else if (k === "r") { setMode("dep"); setModeInfo("dep"); }
      else if (k === "l") { setMode("lineage"); setModeInfo("lineage"); }
      else if (k === "s") { setS4Filter((v) => (v === "impacted" ? "all" : "impacted")); }
      else if (k === "t") { if (sel) setDrawer(sel); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawer, sel, help]);

  // graph helpers
  const neigh = useCallback((nm: string) => { const s = new Set([nm]); links.forEach((l) => { if (l.a === nm) s.add(l.b); if (l.b === nm) s.add(l.a); }); return s; }, [links]);
  const trace = useCallback((nm: string, dir: "up" | "down" | "both") => {
    const up = new Set<string>(), down = new Set<string>();
    const goUp = (n: string) => links.forEach((l) => { if (l.b === n && !up.has(l.a)) { up.add(l.a); goUp(l.a); } });
    const goDn = (n: string) => links.forEach((l) => { if (l.a === n && !down.has(l.b)) { down.add(l.b); goDn(l.b); } });
    if (dir !== "down") goUp(nm); if (dir !== "up") goDn(nm);
    return new Set([nm, ...(dir !== "down" ? up : []), ...(dir !== "up" ? down : [])]);
  }, [links]);
  const active = sel ? (mode === "dep" ? trace(sel, "both") : mode === "lineage" ? trace(sel, "up") : mode === "impact" ? trace(sel, "down") : mode === "focus" ? neigh(sel) : null) : null;
  // Precompute per-node field/S4 data once per layout — avoids recomputing
  // orderFields/fieldsOf/s4For/Set for all nodes on every hover re-render.
  const nodeData = useMemo(() => {
    const m: Record<string, { tf: Field[]; top: Field[]; pkN: number; fkN: number; st: ReturnType<typeof s4For>; impFields: Set<string> }> = {};
    for (const t of shown) {
      const tf = orderFields(fieldsOf(t));
      const st = s4For(t.name, t.s4, t.s4alt);
      m[t.name] = { tf, top: tf.slice(0, 8), pkN: tf.filter((f) => f[3] === "PK").length, fkN: tf.filter((f) => f[3] === "FK").length, st, impFields: new Set((st.impact?.fields || []).map((f) => f.field)) };
    }
    return m;
  }, [shown]);
  const linkEmph = (a: string, b: string) => {
    if (mode === "flow") return (pos[a]?.x ?? 0) <= (pos[b]?.x ?? 0);
    if (!active) return false;
    if (mode === "focus") return active.has(a) && active.has(b) && (a === sel || b === sel);
    return active.has(a) && active.has(b);
  };

  // fit-all (button) — shows the whole model
  const fit = useCallback(() => {
    const el = wrapRef.current; if (!el) return;
    const vw = el.clientWidth || 1200, vh = el.clientHeight || 720, pad = 72;
    const k = Math.max(0.2, Math.min((vw - pad) / vbW, (vh - pad) / vbH, 2.6));
    setTr({ k, x: (vw - vbW * k) / 2, y: Math.max(16, (vh - vbH * k) / 2) });
  }, [vbW, vbH]);
  // smooth pan to center a node (CSS transition on the canvas transform animates it)
  const centerOn = useCallback((name: string) => {
    const el = wrapRef.current; const p = P(name); if (!el || !p) return;
    const vw = el.clientWidth || 1200, vh = el.clientHeight || 720;
    setTr((cur) => { const k = Math.max(cur.k, 0.6); return { k, x: vw / 2 - (p.x + W / 2) * k, y: vh / 2 - (p.y + H / 2) * k }; });
  }, [P]);
  const fullscreen = () => { const el = wrapRef.current; if (!el) return; document.fullscreenElement ? document.exitFullscreen() : el.requestFullscreen?.(); };
  // auto fit-to-screen on module open / data change / resize / fullscreen — whole landscape always visible
  useEffect(() => { const id = setTimeout(fit, 90); return () => clearTimeout(id); }, [fit, fs]);
  useEffect(() => {
    const el = wrapRef.current; if (!el || typeof ResizeObserver === "undefined") return;
    let raf = 0; const ro = new ResizeObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(fit); });
    ro.observe(el); return () => { ro.disconnect(); cancelAnimationFrame(raf); };
  }, [fit]);
  // trackpad: pinch (ctrl/meta+wheel) = zoom-to-cursor · two-finger = pan. Native non-passive listener.
  useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    const onWheel = (e: WheelEvent) => {
      // zoom only on pinch/ctrl/meta (trackpad-controlled, to cursor). Plain scroll bubbles → page scroll (stable, no graph "escape").
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      const r = el.getBoundingClientRect(); const mx = e.clientX - r.left, my = e.clientY - r.top;
      setTr((p) => { const nk = Math.min(2.6, Math.max(0.2, p.k * (e.deltaY < 0 ? 1.08 : 1 / 1.08))); const ratio = nk / p.k; return { k: nk, x: mx - (mx - p.x) * ratio, y: my - (my - p.y) * ratio }; });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);
  const toggleMod = (m: string) => setSelMods((s) => { const n = new Set(s); if (n.has(m)) { if (n.size > 1) n.delete(m); } else n.add(m); return n; });
  const dt = drawer ? byName[drawer] : null;

  return (
    <div className="rounded-[1.4rem] bg-slate-100/60 p-1 ring-1 ring-black/[0.04]">
      <div ref={wrapRef} className={`relative overflow-hidden rounded-[1.1rem] border border-slate-200/80 ${fs ? "h-screen bg-slate-50" : "h-[calc(100vh-10.5rem)] min-h-[600px]"}`}
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px,#d7deea 1px,transparent 0)", backgroundSize: "30px 30px" }}>
        {/* floating: mode selector (top-center) */}
        <div className="absolute left-1/2 top-3 z-30 flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-white/60 bg-white/85 p-1 shadow-lg shadow-black/5 backdrop-blur-md">
          {MODES.map(([id, he, en]) => <button key={id} onClick={() => { setMode(id); setModeInfo(id); }} title={`${en} — ${MODE_DESC[id].d}`} className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${mode === id ? "bg-[#d62027] text-white shadow-sm" : "text-slate-500 hover:bg-slate-100"}`}>{he}</button>)}
        </div>
        {/* mode explainer popup — helps new users understand each mode */}
        {modeInfo && (() => { const m = modeInfo; const need = MODE_DESC[m].needsSel && !sel; return (
          <div className="absolute left-1/2 top-[6rem] z-40 w-[330px] max-w-[88%] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl" style={{ animation: "fadeUp .25s ease both" }}>
            <div className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 border-l border-t border-slate-200 bg-white" />
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-sm font-extrabold text-slate-900"><span className="size-2 rounded-full bg-[#d62027]" />מצב {MODES.find((x) => x[0] === m)?.[1]}</span>
              <button onClick={() => setModeInfo(null)} className="rounded p-0.5 text-slate-400 hover:bg-slate-100"><X className="size-3.5" /></button>
            </div>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-600">{MODE_DESC[m].d}</p>
            {need && <p className="mt-1.5 rounded-lg bg-amber-50 px-2 py-1 text-[11px] font-bold text-amber-800">↳ בחר טבלה בגרף כדי להפעיל מצב זה.</p>}
          </div>
        ); })()}
        {/* floating: S/4HANA impact filter (top-center, below modes) */}
        {(() => {
          const FILTERS = [
            ["all", "הכל", "כל הטבלאות במודול"],
            ["impacted", "מושפע S/4", "טבלאות שמושפעות ממיגרציית S/4HANA (Simplification)"],
            ["high", "סיכון גבוה", "טבלאות עם סיכון מיגרציה גבוה"],
            ["verified", "מאומת", "השפעת S/4 מאומתת מול Simplification List / OSS"],
            ["needs", "נדרש אימות", "טרם אומת מול SAP — דורש בדיקת Simplification List / OSS"],
          ] as const;
          const matchCount = s4Filter === "all" ? shown.length : shown.filter((t) => s4ok(t.name)).length;
          const activeDesc = FILTERS.find((f) => f[0] === s4Filter)?.[2];
          return (
            <div className="absolute left-1/2 top-[3.4rem] z-30 flex -translate-x-1/2 flex-col items-center gap-1">
              <div className="flex items-center gap-0.5 rounded-full border border-amber-200/70 bg-white/90 p-0.5 shadow-md backdrop-blur-md">
                {FILTERS.map(([id, he, desc]) => (
                  <button key={id} title={desc} onClick={() => setS4Filter(id)} className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition ${s4Filter === id ? "bg-amber-400 text-amber-950 shadow-sm" : "text-slate-500 hover:bg-amber-50"}`}>{he}</button>
                ))}
              </div>
              {s4Filter !== "all" && (
                <div className={`max-w-[22rem] rounded-lg px-2.5 py-1 text-center text-[11px] font-bold shadow-sm backdrop-blur-md ${matchCount === 0 ? "bg-slate-800/90 text-white" : "bg-amber-400/95 text-amber-950"}`}>
                  {matchCount === 0
                    ? <>אין טבלאות בקטגוריה זו במודול — {activeDesc}</>
                    : <>מציג {matchCount} מתוך {shown.length} טבלאות · {activeDesc}</>}
                </div>
              )}
            </div>
          );
        })()}
        {/* floating: title + filters (top-left) */}
        <div className="absolute left-3 top-3 z-20 flex max-w-[58%] flex-col gap-1.5">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-sm">
            <span className="grid size-7 shrink-0 place-items-center rounded-lg text-[10px] font-extrabold text-white" style={{ background: color(code) }}>{code === "PP-PI" ? "PP" : code}</span>
            <div><div className="text-sm font-extrabold leading-tight text-slate-900">{MOD_NAME_HE[code] || code}</div><div className="text-[10px] font-semibold text-slate-400">{shown.length} טבלאות · {links.length} קשרים</div></div>
          </div>
          <div className="flex flex-wrap items-center gap-1 rounded-xl border border-slate-200 bg-white/85 px-2 py-1 shadow-sm backdrop-blur-sm">
            {UNIVERSE.map((m) => { const on = selMods.has(m); const cc = color(m); return <button key={m} onClick={() => toggleMod(m)} className="rounded-md border px-1.5 py-0.5 text-[10px] font-bold transition active:scale-95" style={{ borderColor: on ? cc : "#e2e8f0", background: on ? cc : "#fff", color: on ? "#fff" : "#94a3b8" }}>{m}</button>; })}
          </div>
        </div>
        {/* keyboard help trigger (bottom-left) */}
        <button onClick={() => setHelp((v) => !v)} title="קיצורי מקלדת (?)" aria-label="קיצורי מקלדת"
          className="absolute bottom-3 left-3 z-20 grid size-9 place-items-center rounded-xl border border-slate-200 bg-white/90 text-sm font-extrabold text-slate-500 shadow-sm backdrop-blur-sm transition hover:bg-[#d62027] hover:text-white active:scale-90">?</button>
        {help && (
          <div className="absolute bottom-14 left-3 z-30 w-64 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur-md" dir="rtl">
            <div className="mb-2 flex items-center justify-between"><span className="text-xs font-extrabold text-slate-900">קיצורי מקלדת</span><button onClick={() => setHelp(false)} className="rounded p-0.5 text-slate-400 hover:bg-slate-100"><X className="size-3.5" /></button></div>
            <ul className="space-y-1.5 text-[12px] text-slate-600">
              {[["F", "מצב מיקוד"], ["R", "קשרים / תלויות"], ["L", "שושלת מלאה"], ["S", "סינון השפעת S/4"], ["T", "פרטי טבלה נבחרת"], ["/", "חיפוש מהיר"], ["Esc", "סגור / נקה בחירה"], ["?", "עזרה זו"]].map(([k, d]) => (
                <li key={k} className="flex items-center justify-between gap-2"><span>{d}</span><kbd className="rounded-md border border-slate-300 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-700">{k}</kbd></li>
              ))}
            </ul>
          </div>
        )}
        {/* legend (top-right) */}
        <div className="pointer-events-none absolute right-3 top-3 z-20 flex flex-wrap gap-1.5 text-[10px] font-bold">
          {[["🔑 PK", "#d97706"], ["FK", "#2563eb"], ["חוצה-מודול", "#7c3aed"]].map(([k, v]) => (<span key={k} className="flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 shadow-sm ring-1 ring-slate-200 backdrop-blur-sm"><i className="size-2 rounded-full" style={{ background: v }} /><span style={{ color: v }}>{k}</span></span>))}
        </div>
        {/* floating: control dock (bottom-center) */}
        <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 rounded-2xl border border-white/60 bg-white/90 p-1.5 shadow-xl shadow-black/10 backdrop-blur-md">
          <button onClick={() => setPanMode((v) => !v)} title="מצב גרירה" className={`grid size-9 place-items-center rounded-xl transition active:scale-90 ${panMode ? "bg-[#d62027] text-white" : "text-slate-600 hover:bg-slate-100"}`}><Hand className="size-4" /></button>
          <span className="mx-0.5 h-5 w-px bg-slate-200" />
          {[[<ZoomOut key="zo" className="size-4" />, () => setTr((p) => ({ ...p, k: Math.max(0.2, p.k / 1.2) })), "הקטן"], [<Scan key="f" className="size-4" />, fit, "התאם"], [<ZoomIn key="zi" className="size-4" />, () => setTr((p) => ({ ...p, k: Math.min(2.6, p.k * 1.2) })), "הגדל"], [<RotateCcw key="rl" className="size-4" />, () => { setDragPos({}); fit(); }, "אפס פריסה"], [fs ? <Shrink key="s" className="size-4" /> : <Expand key="e" className="size-4" />, fullscreen, "מסך מלא"], [<Home key="h" className="size-4" />, onHome, "בית"]].map((b, i) => <button key={i} title={b[2] as string} onClick={b[1] as () => void} className="grid size-9 place-items-center rounded-xl text-slate-600 transition hover:bg-[#d62027] hover:text-white active:scale-90">{b[0] as React.ReactNode}</button>)}
          <span className="px-2 font-mono text-xs font-bold tabular-nums text-slate-400">{Math.round(tr.k * 100)}%</span>
        </div>
        {panMode && <div className="pointer-events-none absolute bottom-[4.5rem] left-1/2 z-20 -translate-x-1/2 rounded-full bg-[#d62027] px-3 py-1 text-[11px] font-bold text-white shadow-lg">מצב גרירה פעיל — גרור להזזה</div>}
          <div className="absolute inset-0"
            onPointerDown={(e) => { if (!panMode || (e.target as Element).closest("[data-card],[data-drawer]")) return; pan.current = { x: e.clientX, y: e.clientY, ox: tr.x, oy: tr.y }; }}
            onPointerMove={(e) => { if (pan.current) setTr((p) => ({ ...p, x: pan.current!.ox + (e.clientX - pan.current!.x), y: pan.current!.oy + (e.clientY - pan.current!.y) })); }}
            onPointerUp={() => (pan.current = null)} onPointerLeave={() => (pan.current = null)}
            style={{ cursor: panMode ? (pan.current ? "grabbing" : "grab") : "default" }}>
            <div className="absolute left-0 top-0 origin-top-left" style={{ transform: `translate(${tr.x}px,${tr.y}px) scale(${tr.k})`, width: vbW, height: vbH, transition: pan.current ? "none" : "transform .5s cubic-bezier(.32,.72,0,1)" }}>
              <svg className="pointer-events-none absolute left-0 top-0" width={vbW} height={vbH} style={{ overflow: "visible" }}>
                <defs>
                  <filter id="archglow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                </defs>
                {links.map((l, i) => { const A = P(l.a), B = P(l.b), TA = byName[l.a], TB = byName[l.b]; if (!A || !B || !TA || !TB) return null;
                  const fwd = A.x <= B.x; const ax = (fwd ? A.x + W : A.x), ay = A.y + H / 2, bx = (fwd ? B.x : B.x + W), by = B.y + H / 2; const mx = (ax + bx) / 2;
                  const isCross = (own[l.a] || TA.mod) !== (own[l.b] || TB.mod); const lc = isCross ? "#7c3aed" : color(own[l.a] || TA.mod);
                  const onHv = hv ? (l.a === hv || l.b === hv) : false; const emph = linkEmph(l.a, l.b) || onHv;
                  const anyActive = active || mode === "flow"; const dim = !!anyActive && !emph;
                  const stroke = dim ? "#cbd5e1" : lc, w = emph ? 3 : (isCross ? 1.8 : 1.4);
                  const d = `M${ax},${ay} C${mx},${ay} ${mx},${by} ${bx},${by}`;
                  return <g key={i} opacity={dim ? 0.12 : 1}>
                    <path id={`lp${i}`} d={d} fill="none" stroke={stroke} strokeWidth={w} strokeOpacity={emph ? 1 : 0.66} className={`flowline${emph ? " fast" : ""}`} filter={emph ? "url(#archglow)" : undefined} />
                    <path d={`M${bx + (fwd ? -10 : 10)},${by - 6} L${bx},${by} M${bx + (fwd ? -10 : 10)},${by + 6} L${bx},${by}`} stroke={stroke} strokeWidth={w} fill="none" />
                    {emph && !dim && <circle r={4} fill={lc} filter="url(#archglow)"><animateMotion dur={`${mode === "flow" ? 2.4 : 1.8}s`} repeatCount="indefinite" rotate="auto"><mpath href={`#lp${i}`} /></animateMotion></circle>}
                    <g opacity={dim ? 0.4 : 1}><rect x={mx - 17} y={(ay + by) / 2 - 8} width={34} height={16} rx={6} fill={emph ? lc : "#94a3b8"} /><text x={mx} y={(ay + by) / 2 + 4} textAnchor="middle" style={{ font: "700 9px ui-monospace" }} fill="#fff">{cardKind(l.card)}</text></g>
                  </g>; })}
              </svg>
              {shown.map((t, gi) => { const p = P(t.name); if (!p) return null; const c = color(own[t.name] || t.mod); const isSel = sel === t.name; const nd = nodeData[t.name]; const tf = nd.tf, top = nd.top, pkN = nd.pkN, fkN = nd.fkN;
                const st = nd.st; const impFields = nd.impFields;
                const fade = !s4ok(t.name); const dim = (active && !active.has(t.name)) || fade;
                const dragging = nodeDrag.current?.name === t.name;
                const baseShadow = isSel ? `0 26px 56px -18px ${c}66, 0 0 0 2px ${c}` : "0 10px 26px -16px rgba(15,23,42,.28)";
                const glow = st.impacted ? ", 0 0 0 2px #f59e0b, 0 0 16px 1px rgba(245,158,11,.5)" : "";
                return (
                  <div key={t.name} data-card
                    onPointerDown={(e) => { if ((e.target as Element).closest("[data-nodrag]")) return; e.stopPropagation(); (e.currentTarget as Element).setPointerCapture?.(e.pointerId); const cur = P(t.name) || { x: 0, y: 0 }; nodeDrag.current = { name: t.name, sx: e.clientX, sy: e.clientY, ox: cur.x, oy: cur.y, moved: false }; }}
                    onPointerMove={(e) => { const d = nodeDrag.current; if (!d || d.name !== t.name) return; if (Math.abs(e.clientX - d.sx) + Math.abs(e.clientY - d.sy) > 4) d.moved = true; if (d.moved) { const nx = d.ox + (e.clientX - d.sx) / tr.k, ny = d.oy + (e.clientY - d.sy) / tr.k; setDragPos((m) => ({ ...m, [t.name]: { x: nx, y: ny } })); } }}
                    onPointerUp={() => { const d = nodeDrag.current; nodeDrag.current = null; if (d && !d.moved) { const willSel = sel !== t.name; setSel(willSel ? t.name : null); setDrawer(null); if (willSel) centerOn(t.name); } }}
                    onMouseEnter={() => setHv(t.name)} onMouseLeave={() => setHv(null)}
                    className="group absolute select-none overflow-hidden rounded-2xl bg-white transition-[box-shadow,opacity] duration-200 ease-[cubic-bezier(.32,.72,0,1)]"
                    style={{ left: p.x, top: p.y, width: W, opacity: fade ? 0.12 : dim ? 0.28 : 1, zIndex: dragging ? 40 : isSel ? 30 : st.impacted ? 5 : 2, cursor: dragging ? "grabbing" : "grab", border: `1.5px solid ${isSel ? c : st.impacted ? "#f59e0b" : "#e2e8f0"}`, boxShadow: baseShadow + glow, touchAction: "none", animation: Object.keys(dragPos).length ? undefined : `pop .42s cubic-bezier(.32,.72,0,1) ${Math.min(gi * 20, 480)}ms both` }}>
                    {/* collapsed: title only (table code + business name) */}
                    <div className="relative px-3.5 pb-2.5 pt-3">
                      <span className="absolute inset-x-0 top-0 h-1.5 rounded-t-2xl" style={{ background: c }} />
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate font-mono text-xl font-extrabold tracking-tight text-slate-900" dir="ltr">{t.name}</span>
                        <span className="flex shrink-0 items-center gap-1">
                          {st.impacted && <span className="rounded-md bg-amber-400 px-1.5 py-0.5 text-[8px] font-extrabold text-amber-950">S/4</span>}
                          {!st.impact && <span title="נדרש אימות SAP" className="rounded-md bg-slate-200 px-1 py-0.5 text-[8px] font-extrabold text-slate-500">?</span>}
                          <span className="rounded-md px-1.5 py-0.5 text-[9px] font-bold text-white" style={{ background: c }}>{own[t.name] || t.mod}</span>
                        </span>
                      </div>
                      <div className="truncate text-[13px] font-bold text-slate-600">{t.he || t.en}</div>
                      <div className="mt-1 flex items-center gap-2 text-[10px] font-bold text-slate-400">
                        <span>{tf.length} שדות</span><span className="text-amber-500">{pkN} PK</span><span className="text-blue-500">{fkN} FK</span>
                        {!isSel && <span className="ms-auto text-slate-300 transition group-hover:text-[#d62027]">לחץ ↡</span>}
                      </div>
                    </div>
                    {/* expanded (1st click): reveal fields */}
                    {isSel && (
                      <div data-nodrag style={{ animation: "fadeUp .28s ease both" }}>
                        {st.impacted && <div className="flex items-center gap-1.5 border-t border-amber-200 bg-amber-50 px-3 py-1.5 text-[10px] font-bold text-amber-800"><span className="size-1.5 rounded-full" style={{ background: RISK_COLOR[st.risk] }} />S/4HANA Impact · {RISK_HE[st.risk]} · {TRUST_HE[st.trust]}</div>}
                        <div className="space-y-0.5 border-t border-slate-100 px-3 py-2">
                          {top.map((f) => { const fi = impFields.has(f[0]); return <div key={f[0]} className={`flex items-center gap-2 ${fi ? "-mx-1 rounded bg-amber-100/70 px-1" : ""}`}>
                            <span className={`grid size-4 shrink-0 place-items-center rounded text-[8px] font-extrabold ${f[3] === "PK" ? "bg-amber-100 text-amber-700" : f[3] === "FK" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-400"}`}>{f[3] === "PK" ? "PK" : f[3] === "FK" ? "FK" : "·"}</span>
                            <span className={`truncate font-mono text-[12.5px] font-bold ${fi ? "text-amber-800" : f[3] === "PK" ? "text-amber-700" : f[3] === "FK" ? "text-blue-700" : "text-slate-700"}`} dir="ltr">{f[0]}</span>
                            {fi && <span title="הושפע מ-S/4HANA" className="text-[10px] text-amber-600">ⓘ</span>}
                            <span className="ms-auto truncate text-[10px] text-slate-400">{f[2] || f[1]}</span>
                          </div>; })}
                        </div>
                        <div className="flex items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/70 px-3 py-1.5 text-[10px] font-bold">
                          {t.tcodes && <span className="truncate font-mono text-slate-500" dir="ltr">{t.tcodes.split(/[,\s]+/)[0]}</span>}
                          <button onClick={(e) => { e.stopPropagation(); setDrawer(t.name); }} className="ms-auto inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-white shadow-sm transition active:scale-95" style={{ background: c }}><Maximize2 className="size-3" />פרטים מלאים</button>
                        </div>
                      </div>
                    )}
                  </div>); })}
            </div>

            {/* right enterprise drawer */}
            {dt && (() => { const t = dt; const c = color(t.mod); const tf = orderFields(fieldsOf(t)); const pk = tf.filter((f) => f[3] === "PK"), fk = tf.filter((f) => f[3] === "FK");
              const parents = [...new Set(t.rel.filter((r) => r.role === "child").map((r) => r.table))];
              const children = [...new Set(t.rel.filter((r) => r.role === "parent").map((r) => r.table))];
              const whereUsed = [...new Set(data.tables.filter((x) => x.rel.some((r) => r.table === t.name)).map((x) => x.name))];
              const bp = data.blueprints.find((b) => b.code === t.mod);
              const Sec = ({ title, icon, children: ch }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) => <div className="border-t border-slate-100 px-4 py-3"><h4 className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: c }}>{icon}{title}</h4>{ch}</div>;
              const Pills = ({ a, nav }: { a: string[]; nav?: boolean }) => a.length ? <div className="flex flex-wrap gap-1">{a.map((x) => nav && byName[x] ? <button key={x} onClick={() => { const tt = byName[x]; if (tt && tt.mod !== t.mod && !selMods.has(tt.mod)) toggleMod(tt.mod); setSel(x); setDrawer(x); }} className="rounded-md border px-1.5 py-0.5 font-mono text-[11px] font-bold transition hover:bg-slate-50" style={{ borderColor: byName[x] ? color(byName[x].mod) : c, color: byName[x] ? color(byName[x].mod) : c }}>{x}</button> : <span key={x} className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-600">{x}</span>)}</div> : <span className="text-[11px] italic text-slate-300">—</span>;
              const s4 = s4For(t.name, t.s4, t.s4alt); const imp = s4.impact;
              return (
                <div data-drawer dir="rtl" className="absolute inset-y-0 right-0 z-40 flex w-[360px] max-w-[88%] flex-col overflow-hidden border-s border-slate-200 bg-white shadow-2xl" style={{ animation: "drawerIn .35s cubic-bezier(.32,.72,0,1) both" }} onPointerDown={(e) => e.stopPropagation()}>
                  <div className="relative shrink-0 px-4 py-3.5 text-white" style={{ background: "linear-gradient(135deg,#d62027,#8f1318)" }}>
                    <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: c }} />
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0"><div className="flex items-center gap-2"><span className="font-mono text-2xl font-extrabold" dir="ltr">{t.name}</span><span className="rounded-md bg-white/20 px-1.5 py-0.5 text-[10px] font-bold">{t.mod}</span></div><p className="mt-0.5 truncate text-xs text-white/80">{t.he || t.en}</p></div>
                      <button onClick={() => { setDrawer(null); }} className="rounded-lg p-1 text-white/80 hover:bg-white/15"><X className="size-4" /></button>
                    </div>
                  </div>
                  <div className="min-h-0 flex-1 overflow-auto">
                    {/* S/4HANA Impact — top section */}
                    <div className={`px-4 py-3 ${imp && s4.impacted ? "bg-amber-50/80" : "bg-slate-50/60"}`} style={imp && s4.impacted ? { boxShadow: "inset 0 0 0 1px #fbbf24" } : undefined}>
                      <div className="mb-1.5 flex items-center justify-between">
                        <h4 className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-amber-700">S/4HANA Impact</h4>
                        <div className="flex items-center gap-1">
                          <span className="rounded-full px-2 py-0.5 text-[9px] font-extrabold text-white" style={{ background: RISK_COLOR[s4.risk] }}>{RISK_HE[s4.risk]}</span>
                          <span className={`rounded-full px-2 py-0.5 text-[9px] font-extrabold ${s4.trust === "verified" ? "bg-green-100 text-green-700" : s4.trust === "partial" ? "bg-amber-100 text-amber-700" : "bg-slate-200 text-slate-500"}`}>{TRUST_HE[s4.trust]}</span>
                        </div>
                      </div>
                      {imp ? (
                        <div className="space-y-2 text-[12px] leading-relaxed text-slate-700">
                          <p><span className="font-bold text-slate-900">מה השתנה: </span>{imp.changed}</p>
                          {imp.why && <p><span className="font-bold text-slate-900">למה זה חשוב: </span>{imp.why}</p>}
                          {imp.note && <p className="text-[10px] font-bold text-amber-700">📎 {imp.note}</p>}
                          {imp.fields?.length ? <div><p className="mb-1 text-[10px] font-bold uppercase text-slate-400">שדות מושפעים</p><div className="flex flex-wrap gap-1">{imp.fields.map((f) => <span key={f.field} className="rounded-md bg-amber-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-amber-800">{f.field}</span>)}</div></div> : null}
                          {(imp.tcodes?.length || imp.funcs?.length || imp.cds?.length) ? <div><p className="mb-1 text-[10px] font-bold uppercase text-slate-400">אובייקטים קשורים</p><div className="flex flex-wrap gap-1">{[...(imp.tcodes || []), ...(imp.funcs || []), ...(imp.cds || [])].map((x) => <span key={x} className="rounded-md bg-white px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-600 ring-1 ring-slate-200" dir="ltr">{x}</span>)}</div></div> : null}
                          {imp.qa?.length ? <div><p className="mb-1 text-[10px] font-bold uppercase text-slate-400">בדיקות QA מומלצות</p><ul className="space-y-0.5">{imp.qa.map((q, i) => <li key={i} className="flex gap-1.5 text-[11px]"><span className="text-amber-500">✓</span>{q}</li>)}</ul></div> : null}
                        </div>
                      ) : (
                        <p className="text-[12px] text-slate-500">אין נתון S/4 מאומת לטבלה זו — <span className="font-bold text-slate-600">נדרש אימות SAP</span> (Simplification List / OSS).</p>
                      )}
                    </div>
                    <Sec title="תיעוד · מטרה עסקית">
                      <p className="text-xs leading-relaxed text-slate-600">{bp?.purpose || `טבלת ${t.mod} — ${t.he || t.en}`}</p>
                    </Sec>
                    <div className="grid grid-cols-2"><Sec title="PK" icon={<KeyRound className="size-3 text-amber-500" />}><Pills a={pk.map((f) => f[0])} /></Sec><Sec title="FK" icon={<Link2 className="size-3 text-blue-500" />}><Pills a={fk.map((f) => f[0])} /></Sec></div>
                    <Sec title={`שדות · ${tf.length}`}>
                      <div className="overflow-hidden rounded-lg border border-slate-100"><table className="w-full text-right font-mono text-[11px]" dir="ltr"><tbody>{tf.slice(0, 28).map((f) => <tr key={f[0]} onClick={() => onField(t.name, f[0])} className="cursor-pointer border-b border-slate-50 last:border-0 hover:bg-slate-50"><td className={`px-2 py-1 font-bold ${f[3] === "PK" ? "text-amber-600" : f[3] === "FK" ? "text-blue-600" : "text-slate-700"}`}>{f[0]}</td><td className="px-2 py-1 text-slate-400">{f[1]}</td><td className="px-2 py-1 text-left">{f[3] !== "-" && <span className={`rounded px-1 text-[9px] font-bold ${f[3] === "PK" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>{f[3]}</span>}</td></tr>)}</tbody></table></div>
                    </Sec>
                    <Sec title="טרנזקציות (T-Codes)"><span className="font-mono text-xs text-slate-700" dir="ltr">{t.tcodes || "—"}</span></Sec>
                    <Sec title="BAPIs / Function Modules"><Pills a={(t.funcs || []).slice(0, 8)} /></Sec>
                    <Sec title="CDS Views"><Pills a={t.cds || []} /></Sec>
                    {t.fiori && <Sec title="Fiori Apps"><span className="text-xs text-slate-700">{t.fiori}</span></Sec>}
                    <Sec title="דוחות"><Pills a={MOD_REPORTS[t.mod] || []} /></Sec>
                    <Sec title="אובייקטים קשורים · אב"><Pills a={parents} nav /></Sec>
                    <Sec title="אובייקטים קשורים · צאצא"><Pills a={children} nav /></Sec>
                    <Sec title="Where-Used"><Pills a={whereUsed} nav /></Sec>
                    <div className="px-4 py-3"><button onClick={() => onModule(t.mod)} className="w-full rounded-xl py-2 text-center text-xs font-bold text-white shadow-sm transition hover:brightness-110" style={{ background: c }}>פתח מודול {t.mod} ↗</button></div>
                  </div>
                </div>); })()}
          </div>
        </div>
      </div>
  );
}

/* ===================== FIELD INSPECTOR (field-centric, floating) ===================== */
function FieldInspector({ data, color, t, field, byName, onClose, onGo }: { data: Data; color: (m?: string | null) => string; t: Tbl; field: string; byName: Record<string, Tbl>; onClose: () => void; onGo: (n: string) => void }) {
  const [p, setP] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const c = color(t.mod);
  const f = fieldsOf(t).find((x) => x[0] === field) || [field, "", "", "-"] as Field;
  const key = f[3];
  const parents = [...new Set(t.rel.filter((r) => r.role === "child").map((r) => r.table))];
  const whereUsed = [...new Set(data.tables.filter((x) => x.rel.some((r) => r.table === t.name)).map((x) => x.name))];
  const connects = key === "FK" ? parents : key === "PK" ? whereUsed : [...new Set([...parents, ...t.rel.filter((r) => r.role === "parent").map((r) => r.table)])];
  const bp = data.blueprints.find((b) => b.code === t.mod);
  const objs = (OBJECTS[t.mod] || []).filter((o) => o.tables.includes(t.name)).map((o) => o.he);
  const importance = key === "PK" ? "מפתח ראשי (Primary Key) — מזהה ייחודי של כל רשומה בטבלה. כל הקשרים והשליפות נשענים עליו." : key === "FK" ? "מפתח זר (Foreign Key) — מקשר את הרשומה לטבלה אחרת ומאפשר join ושלמות נתונים." : "שדה נתונים — נתון עסקי או טכני של הרשומה.";
  const onDown = (e: React.PointerEvent) => { drag.current = { x: e.clientX, y: e.clientY, ox: p.x, oy: p.y }; (e.target as Element).setPointerCapture?.(e.pointerId); };
  const onMove = (e: React.PointerEvent) => { if (drag.current) setP({ x: drag.current.ox + (e.clientX - drag.current.x), y: drag.current.oy + (e.clientY - drag.current.y) }); };
  const S = ({ title, children }: { title: string; children: React.ReactNode }) => <div className="border-t border-slate-100 px-3.5 py-2.5"><h4 className="mb-1.5 text-[10px] font-bold uppercase tracking-wide" style={{ color: c }}>{title}</h4>{children}</div>;
  const Pills = ({ a }: { a: string[] }) => a.length ? <div className="flex flex-wrap gap-1">{a.map((x) => byName[x] ? <button key={x} onClick={() => onGo(x)} className="rounded border px-1.5 py-0.5 font-mono text-[11px] font-bold hover:bg-slate-50" style={{ borderColor: c, color: c }}>{x}</button> : <span key={x} className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-600">{x}</span>)}</div> : <span className="text-[11px] italic text-slate-400">—</span>;
  return (
    <div className="absolute z-40 max-h-[88%] w-[340px] overflow-auto rounded-2xl border border-slate-200 bg-white/95 shadow-2xl backdrop-blur-md" style={{ insetInlineStart: 12 + p.x, top: 12 + p.y, animation: "pop .25s ease both" }} dir="rtl">
      <div className="sticky top-0 z-10 cursor-grab border-b border-slate-200 px-3.5 py-3 active:cursor-grabbing" style={{ background: `linear-gradient(135deg,${c},${c}cc)` }} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={() => (drag.current = null)}>
        <div className="flex items-start justify-between">
          <div className="min-w-0"><div className="flex items-center gap-2"><GripVertical className="size-3.5 text-white/70" /><span className="font-mono text-xl font-extrabold text-white" dir="ltr">{f[0]}</span>{key !== "-" && <span className="rounded bg-white/25 px-1.5 py-0.5 text-[10px] font-bold text-white">{key}</span>}</div>
            <p className="mt-1 text-xs text-white/90">{f[2] || f[1]}</p></div>
          <button onClick={onClose} className="rounded p-1 text-white/80 hover:bg-white/20"><X className="size-4" /></button>
        </div>
        <button onClick={() => onGo(t.name)} className="mt-2 inline-flex items-center gap-1 rounded-lg bg-white/15 px-2 py-1 text-[11px] font-bold text-white hover:bg-white/25"><span className="font-mono">{t.name}</span> · {t.he || t.en} ↗</button>
      </div>
      <S title="חשיבות"><p className="text-xs leading-relaxed text-slate-600">{importance}</p></S>
      <div className="grid grid-cols-2"><S title="שם טכני"><span className="font-mono text-sm font-bold text-slate-800" dir="ltr">{f[0]}</span></S><S title="תפקיד"><span className="text-sm font-bold" style={{ color: key === "PK" ? "#d97706" : key === "FK" ? "#2563eb" : "#475569" }}>{key === "PK" ? "מפתח ראשי" : key === "FK" ? "מפתח זר" : "שדה"}</span></S></div>
      <S title={key === "PK" ? "מופנה מטבלאות (Where-Used)" : key === "FK" ? "מחובר אל" : "טבלאות קשורות"}><Pills a={connects} /></S>
      <S title="הטבלה"><div className="flex items-center justify-between"><button onClick={() => onGo(t.name)} className="font-mono text-sm font-bold" style={{ color: c }}>{t.name}</button><span className="text-xs text-slate-500">{t.mod} · {MOD_NAME_HE[t.mod] || ""}</span></div><p className="mt-1 text-xs text-slate-600">{bp?.purpose || t.he || t.en}</p></S>
      {objs.length > 0 && <S title="אובייקטים עסקיים"><div className="flex flex-wrap gap-1">{objs.map((o) => <span key={o} className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600">{o}</span>)}</div></S>}
      <S title="פונקציות / BAPIs"><Pills a={(t.funcs || []).slice(0, 6)} /></S>
      <S title="טרנזקציות"><span className="font-mono text-xs text-slate-700">{t.tcodes || "—"}</span></S>
      {(() => { const fi = s4For(t.name, t.s4, t.s4alt).impact?.fields?.find((x) => x.field === field); return (
        <S title="S/4HANA — התנהגות השדה">{fi ? (
          <div className="space-y-1 text-xs text-slate-600">
            <p><span className="font-bold text-slate-800">ECC:</span> {fi.ecc}</p>
            <p><span className="font-bold text-slate-800">S/4HANA:</span> {fi.s4}</p>
            <p><span className="font-bold text-slate-800">מה השתנה:</span> {fi.changed}</p>
            <p className="rounded bg-amber-50 px-2 py-1 text-amber-800"><span className="font-bold">לבדוק:</span> {fi.test}</p>
          </div>
        ) : <p className="text-xs text-slate-600">{t.s4 || "אין שינוי מהותי ברמת הטבלה."} <span className="text-[10px] font-bold text-slate-400">· ברמת השדה: נדרש אימות SAP</span></p>}</S>
      ); })()}
    </div>
  );
}

/* ===================== FLOATING INSPECTOR (light) ===================== */
function Inspector({ data, color, t, byName, onClose, onGo }: { data: Data; color: (m?: string | null) => string; t: Tbl; byName: Record<string, Tbl>; onClose: () => void; onGo: (n: string) => void }) {
  const [p, setP] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const c = color(t.mod); const flds = fieldsOf(t);
  const pk = flds.filter((f) => f[3] === "PK").map((f) => f[0]), fk = flds.filter((f) => f[3] === "FK").map((f) => f[0]);
  const parents = [...new Set(t.rel.filter((r) => r.role === "child").map((r) => r.table))], children = [...new Set(t.rel.filter((r) => r.role === "parent").map((r) => r.table))];
  const whereUsed = [...new Set(data.tables.filter((x) => x.rel.some((r) => r.table === t.name)).map((x) => x.name))];
  const ex = genExampleRecords(flds, t.name); const bp = data.blueprints.find((b) => b.code === t.mod);
  const onDown = (e: React.PointerEvent) => { drag.current = { x: e.clientX, y: e.clientY, ox: p.x, oy: p.y }; (e.target as Element).setPointerCapture?.(e.pointerId); };
  const onMove = (e: React.PointerEvent) => { if (drag.current) setP({ x: drag.current.ox + (e.clientX - drag.current.x), y: drag.current.oy + (e.clientY - drag.current.y) }); };
  const S = ({ title, children }: { title: string; children: React.ReactNode }) => <div className="border-t border-slate-100 px-3.5 py-2.5"><h4 className="mb-1.5 text-[10px] font-bold uppercase tracking-wide" style={{ color: c }}>{title}</h4>{children}</div>;
  const Pills = ({ a, click }: { a: string[]; click?: boolean }) => a.length ? <div className="flex flex-wrap gap-1">{a.map((x) => click && byName[x] ? <button key={x} onClick={() => onGo(x)} className="rounded border px-1.5 py-0.5 font-mono text-[11px] font-bold hover:bg-slate-50" style={{ borderColor: c, color: c }}>{x}</button> : <span key={x} className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-600">{x}</span>)}</div> : <span className="text-[11px] italic text-slate-400">—</span>;
  return (
    <div className="absolute z-40 max-h-[88%] w-[340px] overflow-auto rounded-2xl border border-slate-200 bg-white/95 shadow-2xl backdrop-blur-md" style={{ insetInlineStart: 12 + p.x, top: 12 + p.y, animation: "pop .25s ease both" }} dir="rtl">
      <div className="sticky top-0 z-10 h-1" style={{ background: c }} />
      <div className="sticky top-1 z-10 flex cursor-grab items-start justify-between gap-2 border-b border-slate-200 px-3.5 py-2.5 active:cursor-grabbing" style={{ background: `linear-gradient(180deg, ${c}12, #fff)` }} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={() => (drag.current = null)}>
        <div className="min-w-0"><div className="flex items-center gap-2"><GripVertical className="size-3.5 text-slate-400" /><span className="font-mono text-lg font-extrabold text-slate-900" dir="ltr">{t.name}</span><span className="rounded px-1.5 py-0.5 text-[10px] font-bold text-white" style={{ background: c }}>{t.mod}</span></div><p className="mt-0.5 truncate text-xs text-slate-500">{t.he || t.en}</p></div>
        <button onClick={onClose} className="rounded p-1 text-slate-400 hover:bg-slate-100"><X className="size-4" /></button>
      </div>
      <S title="מטרה עסקית"><p className="text-xs leading-relaxed text-slate-600">{bp?.purpose || `טבלת ${t.mod} — ${t.he || t.en}`}</p></S>
      <div className="grid grid-cols-2"><S title="PK"><div className="flex items-center gap-1"><KeyRound className="size-3 text-amber-500" /><Pills a={pk} /></div></S><S title="FK"><div className="flex items-center gap-1"><Link2 className="size-3 text-blue-500" /><Pills a={fk} /></div></S></div>
      <S title={`שדות (${flds.length})`}><table className="w-full text-right font-mono text-[11px]" dir="ltr"><tbody>{flds.slice(0, 20).map((f) => <tr key={f[0]} className="border-b border-slate-50 last:border-0"><td className={`py-0.5 ${f[3] === "PK" ? "font-bold text-amber-600 underline" : f[3] === "FK" ? "text-blue-600" : "text-slate-700"}`}>{f[0]}</td><td className="py-0.5 text-slate-400">{f[1]}</td><td className="py-0.5 text-left">{f[3] !== "-" && <span className={`rounded px-1 text-[9px] font-bold ${f[3] === "PK" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>{f[3]}</span>}</td></tr>)}</tbody></table></S>
      <S title="טבלאות אב"><Pills a={parents} click /></S>
      <S title="טבלאות צאצא"><Pills a={children} click /></S>
      <S title="Where-Used"><Pills a={whereUsed} click /></S>
      <S title="טרנזקציות"><span className="font-mono text-xs text-slate-700">{t.tcodes || "—"}</span></S>
      <S title="דוחות"><Pills a={MOD_REPORTS[t.mod] || []} /></S>
      <S title="BAPIs / FM"><Pills a={(t.funcs || []).slice(0, 6)} /></S>
      <S title="CDS Views"><Pills a={t.cds || []} /></S>
      {t.fiori && <S title="Fiori"><span className="text-xs text-slate-700">{t.fiori}</span></S>}
      <S title="ECC → S/4HANA"><p className="text-xs text-slate-600">{t.s4 || "אין שינוי מהותי."}</p>{t.s4alt && <p className="mt-0.5 text-[11px] text-slate-500">חלופה: <span className="font-mono font-bold text-slate-700">{t.s4alt}</span></p>}</S>
      <S title="רשומות לדוגמה"><div className="overflow-auto rounded border border-slate-200"><table className="w-full text-left font-mono text-[10.5px]" dir="ltr"><thead className="bg-slate-50"><tr>{ex.cols.map((c2) => <th key={c2} className="px-2 py-1 font-bold text-slate-500">{c2}</th>)}</tr></thead><tbody>{ex.rows.map((r, i) => <tr key={i} className="border-t border-slate-100">{r.map((v, j) => <td key={j} className="px-2 py-1 text-slate-700">{v}</td>)}</tr>)}</tbody></table></div></S>
    </div>
  );
}
