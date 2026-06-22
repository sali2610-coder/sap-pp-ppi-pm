"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Search, ChevronLeft, Home, ZoomIn, ZoomOut, X, KeyRound, Link2, Expand, Shrink, Scan, Maximize2, GripVertical, ArrowLeft, ArrowRight, Hand, ChevronDown, Database, GitBranch, Workflow, Clock, RotateCcw, Copy, Check, Gauge, BrainCircuit, Terminal, AlertTriangle, ArrowRightLeft, Network, Boxes, BookOpen, GraduationCap, Wrench, Cpu, Bug, Lightbulb, ArrowUpRight } from "lucide-react";
import { MOD_PURPOSE, MOD_FLOW, MOD_REPORTS, genExampleRecords, ERD_MODULES, TECH_FIELDS, FIELDS_PLUS, OBJECTS } from "./meta";
import { Highlight } from "@/components/highlight";
import { s4For, TRUST_HE, RISK_HE, RISK_COLOR } from "@/lib/s4";
import { knowledgeFor, IMPORTANCE_HE, IMPORTANCE_COLOR } from "@/lib/knowledge";
import { interviewFor, type Level } from "@/data/knowledge/interview";
import { INCIDENTS } from "@/data/troubleshooting";
import Link from "next/link";
import { loadGraphMemory, saveGraphMemory, loadLayout, saveLayout } from "@/lib/prefs";
import dagre from "dagre";
import { ProcessWorkspace } from "@/components/process-workspace";

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

const ANIM = `@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}@keyframes erdflow{to{stroke-dashoffset:-200}}.flowline{stroke-dasharray:7 6;animation:erdflow 3s linear infinite}.flowline.fast{animation-duration:1s}@keyframes pop{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}@keyframes countpulse{0%{opacity:.4}100%{opacity:1}}@keyframes drawerIn{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:translateX(0)}}@keyframes sheetUp{from{opacity:0;transform:translateY(100%)}to{opacity:1;transform:translateY(0)}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes haze{0%,100%{opacity:.35}50%{opacity:.7}}.drawer-anim{animation:sheetUp .34s cubic-bezier(.32,.72,0,1) both}@media (min-width:640px){.drawer-anim{animation:drawerIn .34s cubic-bezier(.32,.72,0,1) both}}@media (prefers-reduced-motion:reduce){.flowline,.drawer-anim{animation:none!important}}`;
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
  // Deep-link: /sap-infrastructure/?focus=<table>[&m=<module>] — opens the module
  // ERD focused on a table (used by Story Mode). Additive; reuses the existing
  // `focus` prop path, engine logic unchanged.
  useEffect(() => {
    if (!data) return;
    const sp = new URLSearchParams(window.location.search);
    const f = sp.get("focus");
    const m = sp.get("m") || (f ? byName[f]?.mod : undefined);
    if (f && m && byName[f]) setNav({ level: "module", module: m, tab: "erd", focus: [f] });
  }, [data, byName]);
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
      {tab === "process" && <ProcessWorkspace code={code} byName={byName} color={color} />}
      {tab === "erd" && <Erd data={data} color={color} code={code} byName={byName} focus={focus} onField={onField} onHome={onHome} onModule={onModule} />}
      {tab === "technical" && <TechCenter data={data} color={color} code={code} byName={byName} onTable={onTable} />}
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

const TECH_MASTER = new Set(["MARA", "MARC", "EQUI", "EQKT", "IFLOT", "IFLOS", "ILOA", "CRHD", "CRTX", "MCH1", "MCHA", "STKO", "STPO", "MAST", "OBJK", "MKAL", "MAPL", "BUT000"]);
const TECH_TXN = new Set(["AUFK", "AFKO", "AFPO", "AFVC", "AFIH", "AFRU", "QMEL", "QMFE", "QMMA", "QMUR", "QMSM", "QMFE", "RESB", "MSEG", "MKPF", "EBAN", "EBKN", "COBRA", "COBRB", "COSP", "COSS", "JEST", "JSTO"]);
type TechCat = "master" | "transaction" | "config" | "core" | "cross";
const TECH_CAT: Record<TechCat, { he: string; c: string }> = {
  master: { he: "אב נתונים", c: "#2563eb" }, transaction: { he: "תנועה", c: "#d97706" },
  config: { he: "קונפיגורציה", c: "#64748b" }, core: { he: "ליבה", c: "#d62027" }, cross: { he: "חוצה-מודול", c: "#7c3aed" },
};
function techCat(t: Tbl): TechCat {
  if (/^T\d/.test(t.name) || /^T\w*\d/.test(t.name) || /Customizing|הגדרת|קונפיג/.test(t.he || "")) return "config";
  if (TECH_MASTER.has(t.name)) return "master";
  if (TECH_TXN.has(t.name)) return "transaction";
  if (t.degree >= 6) return "core";
  return "cross";
}
const splitTcodes = (s: string) => [...new Set((s || "").split(/[^A-Za-z0-9_/]+/).map((x) => x.trim()).filter((x) => x.length >= 2 && /^[A-Z][A-Z0-9_/]*$/i.test(x)))];

/* ===== SAP Technical Knowledge Center ===== */
const relsOf = (t: Tbl) => ({
  parents: [...new Set(t.rel.filter((r) => r.role === "child").map((r) => r.table))],
  children: [...new Set(t.rel.filter((r) => r.role === "parent").map((r) => r.table))],
});
const KSECTIONS = [
  { id: "overview", he: "סקירה", icon: BookOpen },
  { id: "fields", he: "שדות מפתח", icon: KeyRound },
  { id: "relations", he: "קשרים", icon: Network },
  { id: "usage", he: "שימוש ב-SAP", icon: Terminal },
  { id: "trouble", he: "פתרון תקלות", icon: Wrench },
  { id: "s4", he: "ECC מול S/4", icon: ArrowRightLeft },
  { id: "interview", he: "הכנה לראיון", icon: GraduationCap },
] as const;
const LEVEL_HE: Record<Level, { he: string; c: string }> = { junior: { he: "זוטר", c: "#0891b2" }, senior: { he: "בכיר", c: "#d97706" }, architect: { he: "ארכיטקט", c: "#7c3aed" } };

/* relationship hub diagram — parents above, object in center, children below */
function MiniRel({ t, color, byName, onOpen }: { t: Tbl; color: (m?: string | null) => string; byName: Record<string, Tbl>; onOpen: (n: string) => void }) {
  const { parents, children } = relsOf(t);
  const ps = parents.slice(0, 6), cs = children.slice(0, 6);
  const W = 760, rowY = { p: 46, c: 234 }, midY = 140, H = 280;
  const xs = (n: number, i: number) => n <= 1 ? W / 2 : 70 + (i * (W - 140)) / (n - 1);
  const cardMod = (n: string) => byName[n]?.mod;
  const Node = ({ n, x, y, center }: { n: string; x: number; y: number; center?: boolean }) => {
    const known = !!byName[n]; const cc = center ? "#0f172a" : color(cardMod(n)); const w = center ? 130 : 104; const h = center ? 46 : 36;
    return (
      <g transform={`translate(${x - w / 2},${y - h / 2})`} className={known && !center ? "cursor-pointer" : ""} onClick={() => known && !center && onOpen(n)}>
        <rect width={w} height={h} rx={center ? 12 : 9} fill={center ? "#0f172a" : "#fff"} stroke={cc} strokeWidth={center ? 0 : 1.6} className="transition" style={center ? undefined : { filter: "drop-shadow(0 1px 2px rgba(15,23,42,.08))" }} />
        <text x={w / 2} y={h / 2 + (center ? 5 : 4)} textAnchor="middle" fontSize={center ? 18 : 13} fontWeight={800} fill={center ? "#fff" : "#0f172a"} fontFamily="ui-monospace,monospace">{n}</text>
      </g>
    );
  };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 300 }}>
      {ps.map((n, i) => <line key={`pl${n}`} x1={xs(ps.length, i)} y1={rowY.p + 18} x2={W / 2} y2={midY - 24} stroke="#cbd5e1" strokeWidth={1.4} className="flowline" />)}
      {cs.map((n, i) => <line key={`cl${n}`} x1={W / 2} y1={midY + 24} x2={xs(cs.length, i)} y2={rowY.c - 18} stroke="#cbd5e1" strokeWidth={1.4} className="flowline" />)}
      {ps.length > 0 && <text x={W / 2} y={16} textAnchor="middle" fontSize={11} fontWeight={700} fill="#94a3b8">טבלאות אב ↑</text>}
      {cs.length > 0 && <text x={W / 2} y={H - 4} textAnchor="middle" fontSize={11} fontWeight={700} fill="#94a3b8">↓ טבלאות צאצא</text>}
      {ps.map((n, i) => <Node key={`p${n}`} n={n} x={xs(ps.length, i)} y={rowY.p} />)}
      {cs.map((n, i) => <Node key={`c${n}`} n={n} x={xs(cs.length, i)} y={rowY.c} />)}
      <Node n={t.name} x={W / 2} y={midY} center />
    </svg>
  );
}

function KnowledgeView({ name, data, color, byName, onTable, onClose, onOpen }: { name: string; data: Data; color: (m?: string | null) => string; byName: Record<string, Tbl>; onTable: (t: string) => void; onClose: () => void; onOpen: (n: string) => void }) {
  const t = byName[name];
  const [active, setActive] = useState<string>("overview");
  const scrollRef = useRef<HTMLDivElement>(null);
  const secRef = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  const k = t ? knowledgeFor(t.name) : undefined;
  const s4 = t ? s4For(t.name, t.s4, t.s4alt) : null;
  const fields = t ? fieldsOf(t) : [];
  const pk = fields.filter((f) => f[3] === "PK");
  const fk = fields.filter((f) => f[3] === "FK");
  const tcodes = t ? splitTcodes(t.tcodes) : [];
  const incidents = t ? INCIDENTS.filter((i) => i.tables.includes(t.name)) : [];
  const iqs = t ? interviewFor(t.name) : [];
  const mistakes = [...new Set(incidents.flatMap((i) => i.rootCauses))].slice(0, 8);
  const debugSteps = [...new Set(incidents.flatMap((i) => i.debugEntry))].slice(0, 6);
  const debugTx = [...new Set(incidents.flatMap((i) => [...i.analyzeTcodes, ...i.exits]))].slice(0, 14);

  const has: Record<string, boolean> = {
    overview: true, fields: fields.length > 0, relations: !!t && (relsOf(t).parents.length + relsOf(t).children.length > 0),
    usage: tcodes.length > 0 || !!t?.funcs?.length || !!t?.cds?.length || !!t?.fiori, trouble: incidents.length > 0, s4: true, interview: iqs.length > 0,
  };
  const secs = KSECTIONS.filter((s) => has[s.id]);

  useEffect(() => {
    const root = scrollRef.current; if (!root) return;
    const io = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) setActive((e.target as HTMLElement).id); }); }, { root, rootMargin: "-20% 0px -65% 0px", threshold: 0 });
    secs.forEach((s) => { const el = secRef.current[s.id]; if (el) io.observe(el); });
    return () => io.disconnect();
  }, [name]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!t) return null;
  const c = color(t.mod); const cm = TECH_CAT[techCat(t)];
  const go = (id: string) => secRef.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  const importantFields = fields.filter((f) => f[3] === "-").slice(0, 18);

  const Card = ({ id, title, icon, accent, children: ch, sub }: { id: string; title: string; icon: React.ReactNode; accent?: string; sub?: string; children: React.ReactNode }) => (
    <section id={id} ref={(el) => { secRef.current[id] = el; }} className="scroll-mt-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-3 flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl text-white shadow-sm" style={{ background: accent || c }}>{icon}</span>
        <div><h3 className="text-lg font-extrabold text-slate-900">{title}</h3>{sub && <p className="text-xs font-medium text-slate-400">{sub}</p>}</div>
      </div>
      {ch}
    </section>
  );
  const Chips = ({ a, dir: d, mono }: { a: string[]; dir?: string; mono?: boolean }) => a.length ? <div className="flex flex-wrap gap-1.5" dir={d}>{a.map((x) => <span key={x} className={`rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[12px] font-bold text-slate-700 ${mono ? "tech font-mono" : ""}`}>{x}</span>)}</div> : <span className="text-sm italic text-slate-300">—</span>;
  const Lbl = ({ children: ch }: { children: React.ReactNode }) => <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">{ch}</div>;
  const FieldTable = ({ rows: fr }: { rows: Field[] }) => (
    <div className="overflow-hidden rounded-xl border border-slate-200"><table className="w-full text-right font-mono text-[13px]" dir="ltr"><tbody>{fr.map((f) => <tr key={f[0]} className="border-b border-slate-50 last:border-0 odd:bg-slate-50/40"><td className={`px-3 py-1.5 font-bold ${f[3] === "PK" ? "text-amber-600" : f[3] === "FK" ? "text-blue-600" : "text-slate-700"}`}>{f[0]}</td><td className="px-2 py-1.5 text-slate-400">{f[1]}</td><td className="px-2 py-1.5 text-left">{f[3] !== "-" && <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${f[3] === "PK" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>{f[3]}</span>}</td></tr>)}</tbody></table></div>
  );

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-slate-50" dir="rtl" style={{ animation: "fadeIn .2s ease both" }}>
      {/* header */}
      <header className="shrink-0 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center gap-3 px-4 py-3 lg:px-8">
          <button onClick={onClose} className="tap inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600 transition hover:border-brand/40 hover:text-brand active:scale-95"><ArrowRight className="size-4" />חזרה</button>
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl text-white shadow-sm" style={{ background: c }}><Database className="size-5" /></span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="tech font-mono text-2xl font-extrabold text-slate-900" dir="ltr">{t.name}</span>
              <span className="rounded-full px-2 py-0.5 text-[10px] font-extrabold text-white" style={{ background: cm.c }}>{cm.he}</span>
              <span className="rounded-md px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: c }}>{t.mod}</span>
              {k && <span className="rounded-md px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: IMPORTANCE_COLOR[k.importance] }}>{IMPORTANCE_HE[k.importance]}</span>}
              {s4?.impacted && <span className="rounded-md bg-amber-400 px-2 py-0.5 text-[10px] font-extrabold text-amber-950">S/4 שינוי</span>}
            </div>
            <p className="truncate text-sm font-medium text-slate-500">{t.he || t.en}</p>
          </div>
          <div className="hidden items-center gap-1.5 sm:flex">
            <button onClick={() => onTable(t.name)} className="tap inline-flex items-center gap-1.5 rounded-xl bg-brand px-3 py-2 text-sm font-bold text-white transition hover:bg-brand-dark active:scale-95"><Maximize2 className="size-4" />דף אובייקט</button>
            <Link href={`/sap-infrastructure/?focus=${encodeURIComponent(t.name)}`} title="פתח בגרף ERD" className="tap grid size-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-brand/40 hover:text-brand"><GitBranch className="size-4" /></Link>
            <Link href={`/impact/${encodeURIComponent(t.name)}/`} title="ניתוח השפעה S/4" className="tap grid size-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-brand/40 hover:text-brand"><Gauge className="size-4" /></Link>
            <button onClick={() => window.dispatchEvent(new Event("neo:open-mentor"))} title="שאל מנטור" className="tap grid size-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-brand/40 hover:text-brand"><BrainCircuit className="size-4" /></button>
          </div>
        </div>
        {/* section tabs (mobile + scroll) */}
        <div className="mx-auto flex max-w-[1500px] gap-1 overflow-x-auto px-4 pb-2 lg:hidden">
          {secs.map((s) => <button key={s.id} onClick={() => go(s.id)} className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-bold transition ${active === s.id ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500"}`}>{s.he}</button>)}
        </div>
      </header>

      {/* body */}
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="mx-auto grid max-w-[1500px] gap-6 px-4 py-6 lg:grid-cols-[212px_1fr] lg:px-8">
          {/* rail */}
          <nav className="hidden lg:block">
            <div className="sticky top-4 space-y-1">
              {secs.map((s) => { const Ic = s.icon; const on = active === s.id; return (
                <button key={s.id} onClick={() => go(s.id)} className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm font-bold transition ${on ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200" : "text-slate-500 hover:bg-white/70 hover:text-slate-900"}`}>
                  <Ic className="size-4 shrink-0" style={on ? { color: c } : undefined} />{s.he}
                </button>
              ); })}
              <div className="!mt-3 rounded-xl border border-slate-200 bg-white p-3 text-center"><div className="text-[10px] font-bold uppercase text-slate-400">דרגת חשיבות</div><div className="mt-0.5 text-sm font-extrabold" style={{ color: k ? IMPORTANCE_COLOR[k.importance] : "#64748b" }}>{k ? IMPORTANCE_HE[k.importance] : "כללי"}</div></div>
            </div>
          </nav>

          {/* content */}
          <div className="min-w-0 space-y-5">
            <Card id="overview" title="סקירה" icon={<BookOpen className="size-4" />} sub="מה האובייקט, למה הוא קיים ומתי משתמשים בו">
              <div className="grid gap-4 lg:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4"><Lbl>מה זה</Lbl><p className="text-sm leading-relaxed text-slate-700">{k?.role || `${cm.he} במודול ${t.mod} — ${t.he || t.en}.`}</p></div>
                <div className="rounded-2xl bg-slate-50 p-4"><Lbl>מטרה עסקית</Lbl><p className="text-sm leading-relaxed text-slate-700">{k?.why || data.blueprints.find((b) => b.code === t.mod)?.purpose || "נדרש אימות — מטרת הטבלה לא תועדה במאגר."}</p></div>
                <div className="rounded-2xl bg-slate-50 p-4"><Lbl>מתי משתמשים</Lbl><p className="text-sm leading-relaxed text-slate-700">{k?.whenUsed || "—"}</p>{k?.step && <span className="mt-2 inline-block rounded-md bg-white px-2 py-0.5 text-[11px] font-bold text-slate-600 ring-1 ring-slate-200">{k.step}</span>}</div>
              </div>
              {!k && <p className="mt-3 text-[11px] font-bold text-amber-600">⚠ חלק מהטקסט נגזר מהמודול — אובייקט זה טרם תויג ידנית.</p>}
            </Card>

            {has.fields && <Card id="fields" title="שדות מפתח" icon={<KeyRound className="size-4" />} sub={`${fields.length} שדות · ${pk.length} PK · ${fk.length} FK`}>
              <div className="grid gap-4 lg:grid-cols-2">
                <div><Lbl>מפתח ראשי (PK)</Lbl>{pk.length ? <FieldTable rows={pk} /> : <span className="text-sm italic text-slate-300">—</span>}</div>
                <div><Lbl>מפתח זר (FK)</Lbl>{fk.length ? <FieldTable rows={fk} /> : <span className="text-sm italic text-slate-300">—</span>}</div>
              </div>
              {importantFields.length > 0 && <div className="mt-4"><Lbl>שדות חשובים נוספים</Lbl><div className="lg:columns-2 lg:gap-4">{[importantFields].map((r, i) => <div key={i} className="break-inside-avoid"><FieldTable rows={r} /></div>)}</div></div>}
            </Card>}

            {has.relations && <Card id="relations" title="קשרים" icon={<Network className="size-4" />} sub="טבלאות אב, צאצא והדמיה גרפית — לחיצה על אובייקט פותחת אותו">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-2"><MiniRel t={t} color={color} byName={byName} onOpen={onOpen} /></div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div><Lbl>טבלאות אב</Lbl><Chips a={relsOf(t).parents} dir="ltr" mono /></div>
                <div><Lbl>טבלאות צאצא</Lbl><Chips a={relsOf(t).children} dir="ltr" mono /></div>
              </div>
            </Card>}

            {has.usage && <Card id="usage" title="שימוש ב-SAP" icon={<Terminal className="size-4" />} sub="טרנזקציות, תוכניות, BAPIs, CDS ו-Fiori" accent="#334155">
              <div className="grid gap-4 lg:grid-cols-2">
                <div><Lbl><span className="inline-flex items-center gap-1"><Terminal className="size-3" />T-Codes</span></Lbl><Chips a={tcodes} dir="ltr" mono /></div>
                <div><Lbl><span className="inline-flex items-center gap-1"><Cpu className="size-3" />BAPIs / Function Modules</span></Lbl><Chips a={t.funcs || []} dir="ltr" mono /></div>
                <div><Lbl>CDS Views</Lbl><Chips a={t.cds || []} dir="ltr" mono /></div>
                <div><Lbl>Fiori Apps</Lbl>{t.fiori ? <p className="text-sm font-medium text-slate-700">{t.fiori}</p> : <span className="text-sm italic text-slate-300">—</span>}</div>
              </div>
            </Card>}

            {has.trouble && <Card id="trouble" title="פתרון תקלות" icon={<Wrench className="size-4" />} sub={`${incidents.length} תקלות נפוצות הקשורות לאובייקט`} accent="#dc2626">
              <div className="grid gap-4 lg:grid-cols-2">
                <div><Lbl><span className="inline-flex items-center gap-1"><AlertTriangle className="size-3 text-amber-500" />תקלות נפוצות</span></Lbl>
                  <div className="space-y-1.5">{incidents.slice(0, 6).map((i) => <Link key={i.slug} href={`/troubleshooting/${i.slug}/`} className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 bg-white px-3 py-2 text-[13px] font-bold text-slate-700 transition hover:border-red-300 hover:bg-red-50"><span className="min-w-0 truncate">{i.he}</span><ArrowUpRight className="size-3.5 shrink-0 text-slate-300" /></Link>)}</div>
                </div>
                <div className="space-y-4">
                  {mistakes.length > 0 && <div><Lbl><span className="inline-flex items-center gap-1"><Lightbulb className="size-3 text-amber-500" />טעויות נפוצות</span></Lbl><ul className="space-y-1">{mistakes.map((m, i) => <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-slate-600"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-400" />{m}</li>)}</ul></div>}
                  {(debugSteps.length > 0 || debugTx.length > 0) && <div><Lbl><span className="inline-flex items-center gap-1"><Bug className="size-3 text-rose-500" />נקודות דיבוג</span></Lbl>{debugSteps.length > 0 && <ul className="mb-2 space-y-1">{debugSteps.map((d, i) => <li key={i} className="rounded-lg bg-slate-900 px-2.5 py-1.5 font-mono text-[11px] text-emerald-300" dir="ltr">{d}</li>)}</ul>}<Chips a={debugTx} dir="ltr" mono /></div>}
                </div>
              </div>
            </Card>}

            <Card id="s4" title="ECC מול S/4HANA" icon={<ArrowRightLeft className="size-4" />} sub="מה השתנה, מה נשאר ושיקולי הגירה" accent="#d97706">
              <div className="grid gap-4 lg:grid-cols-3">
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4"><div className="mb-1 flex items-center justify-between"><Lbl>מה השתנה</Lbl><span className="rounded-full px-1.5 py-0.5 text-[9px] font-bold text-white" style={{ background: RISK_COLOR[s4!.risk] }}>{RISK_HE[s4!.risk]}</span></div><p className="text-[13px] leading-relaxed text-amber-900">{k?.s4 || s4!.impact?.changed || t.s4 || "אין הערת S/4 ברמת הטבלה — נדרש אימות מול Simplification List / OSS."}</p></div>
                <div className="rounded-2xl bg-slate-50 p-4"><Lbl>מה נשאר</Lbl><p className="text-[13px] leading-relaxed text-slate-700">{s4!.impacted ? "מבנה המפתח והקשרים הלוגיים נשמרים ברוב המקרים; קוד מותאם הקורא ישירות לטבלה דורש בדיקה." : "הטבלה נשמרת ב-S/4 ללא שינוי מבני מהותי הידוע במאגר."}</p></div>
                <div className="rounded-2xl bg-slate-50 p-4"><Lbl>שיקולי הגירה</Lbl><p className="text-[13px] leading-relaxed text-slate-700">{s4!.impact?.note || (s4!.impacted ? "בדוק גישות ישירות בקוד Z, CDS חלופי ו-Compatibility Views לפני העלייה." : "אין פעולה ייעודית ידועה — אמת מול תוכנית ההגירה הספציפית.")}</p>{t.s4alt && <span className="mt-2 inline-block rounded-md bg-white px-2 py-0.5 font-mono text-[11px] font-bold text-slate-600 ring-1 ring-slate-200" dir="ltr">חלופה: {t.s4alt}</span>}</div>
              </div>
            </Card>

            {has.interview && <Card id="interview" title="הכנה לראיון" icon={<GraduationCap className="size-4" />} sub={`${iqs.length} שאלות לפי רמת בכירות · ידע SAP מתוקף`} accent="#7c3aed">
              <div className="space-y-2.5">{iqs.map((iq, i) => (
                <details key={i} className="group rounded-2xl border border-slate-200 bg-white p-0 [&_summary]:list-none">
                  <summary className="flex cursor-pointer items-start gap-2.5 p-4">
                    <span className="mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-extrabold text-white" style={{ background: LEVEL_HE[iq.level].c }}>{LEVEL_HE[iq.level].he}</span>
                    <span className="flex-1 text-[14px] font-bold text-slate-800">{iq.q}</span>
                    {iq.aHe && <ChevronDown className="size-4 shrink-0 text-slate-300 transition-transform group-open:rotate-180" />}
                  </summary>
                  {iq.aHe && <p className="border-t border-slate-100 px-4 py-3 text-[13px] leading-relaxed text-slate-600">{iq.aHe}</p>}
                </details>
              ))}</div>
            </Card>}
            <div className="h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TechCenter({ data, color, code, byName, onTable }: { data: Data; color: (m?: string | null) => string; code: string; byName: Record<string, Tbl>; onTable: (t: string) => void }) {
  const list = erdMembers(data, code);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<"all" | TechCat>("all");
  const [sel, setSel] = useState<string | null>(null);

  const rows = list.map((t) => ({ t, cat: techCat(t) }));
  const counts = rows.reduce((a, r) => ((a[r.cat] = (a[r.cat] || 0) + 1), a), {} as Record<string, number>);
  const lc = q.trim().toLowerCase();
  const shown = rows.filter((r) => (cat === "all" || r.cat === cat) && (!lc || r.t.name.toLowerCase().includes(lc) || (r.t.he || "").toLowerCase().includes(lc) || (r.t.tcodes || "").toLowerCase().includes(lc)));

  return (
    <div className="space-y-4" dir="rtl">
      {/* intro */}
      <div className="flex flex-wrap items-end justify-between gap-3 rounded-2xl border border-slate-200 bg-gradient-to-l from-slate-900 to-slate-800 px-5 py-4 text-white">
        <div><div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60"><Boxes className="size-4" />Technical Knowledge Center</div>
          <h3 className="mt-0.5 text-xl font-extrabold">מרכז ידע טכני · {MOD_NAME_HE[code] || code}</h3>
          <p className="text-xs text-white/70">לחץ על אובייקט לפתיחת תצוגת ידע מלאה — מבנה, קשרים, שימוש, תקלות, S/4 והכנה לראיון.</p></div>
        <div className="text-left"><div className="text-3xl font-extrabold tabular-nums">{rows.length}</div><div className="text-[11px] font-bold text-white/60">אובייקטים</div></div>
      </div>

      {/* search + filter */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-slate-300" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חפש טבלה, תיאור או T-Code…" className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pe-3 ps-9 text-sm font-medium outline-none focus:border-brand/40" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {([["all", "הכל"], ["master", TECH_CAT.master.he], ["transaction", TECH_CAT.transaction.he], ["config", TECH_CAT.config.he], ["core", TECH_CAT.core.he], ["cross", TECH_CAT.cross.he]] as const).map(([id, label]) => {
            const active = cat === id; const cc = id === "all" ? "#0f172a" : TECH_CAT[id as TechCat].c;
            return <button key={id} onClick={() => setCat(id)} className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition active:scale-95 ${active ? "text-white shadow-sm" : "bg-white text-slate-500 ring-1 ring-slate-200 hover:ring-brand/40"}`} style={active ? { background: cc } : undefined}>{label}{id !== "all" && counts[id] ? ` ${counts[id]}` : ""}</button>;
          })}
        </div>
      </div>

      {/* full-width knowledge grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {shown.map(({ t, cat: tc }) => {
          const c = color(t.mod); const cm = TECH_CAT[tc];
          const k = knowledgeFor(t.name); const s4 = s4For(t.name, t.s4, t.s4alt);
          const incN = INCIDENTS.filter((i) => i.tables.includes(t.name)).length;
          const iqN = interviewFor(t.name).length;
          return (
            <button key={t.name} onClick={() => setSel(t.name)} style={{ animation: "fadeUp .35s ease both" }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-3.5 text-right shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg active:scale-[.98]">
              <span className="absolute inset-x-0 top-0 h-1" style={{ background: c }} />
              <div className="flex items-start justify-between gap-2">
                <span className="tech font-mono text-lg font-extrabold text-slate-900" dir="ltr">{t.name}</span>
                <span className="size-2.5 shrink-0 rounded-full" style={{ background: cm.c }} title={cm.he} />
              </div>
              <p className="mt-0.5 line-clamp-2 min-h-[2.2em] text-[12px] font-medium leading-tight text-slate-500">{t.he || t.en}</p>
              <div className="mt-2 flex flex-wrap items-center gap-1">
                <span className="rounded-md px-1.5 py-0.5 text-[9px] font-bold text-white" style={{ background: c }}>{t.mod}</span>
                {s4.impacted && <span className="rounded-md bg-amber-400 px-1.5 py-0.5 text-[9px] font-extrabold text-amber-950">S/4</span>}
                {k && <span className="rounded-md px-1.5 py-0.5 text-[9px] font-bold text-white" style={{ background: IMPORTANCE_COLOR[k.importance] }}>{k.importance === "core" ? "ליבה" : k.importance === "supporting" ? "תומך" : "מתקדם"}</span>}
              </div>
              <div className="mt-2.5 flex items-center gap-2.5 border-t border-slate-100 pt-2 text-[10px] font-bold text-slate-400">
                {t.pk.length > 0 && <span className="flex items-center gap-0.5" title="מפתח ראשי"><KeyRound className="size-3 text-amber-500" />{t.pk.length}</span>}
                <span className="flex items-center gap-0.5" title="קשרים"><Network className="size-3" />{t.degree}</span>
                {incN > 0 && <span className="flex items-center gap-0.5 text-rose-400" title="תקלות"><AlertTriangle className="size-3" />{incN}</span>}
                {iqN > 0 && <span className="flex items-center gap-0.5 text-violet-400" title="שאלות ראיון"><GraduationCap className="size-3" />{iqN}</span>}
                <ArrowUpRight className="ms-auto size-3.5 text-slate-300 transition group-hover:text-brand" />
              </div>
            </button>
          );
        })}
      </div>
      {shown.length === 0 && <p className="py-10 text-center text-sm text-slate-400">לא נמצאו טבלאות.</p>}

      {sel && <KnowledgeView name={sel} data={data} color={color} byName={byName} onTable={onTable} onClose={() => setSel(null)} onOpen={(n) => setSel(n)} />}
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
    const lk: { a: string; b: string; card: string; desc?: string }[] = [];
    sh.forEach((t) => t.rel.forEach((r) => { if (nameset.has(r.table)) { const a = r.role === "parent" ? t.name : r.table, b = r.role === "parent" ? r.table : t.name; if (a !== b && !lk.find((l) => l.a === a && l.b === b)) lk.push({ a, b, card: r.card || "1:N", desc: r.desc }); } }));
    const gg = new dagre.graphlib.Graph({ multigraph: false });
    gg.setGraph({ rankdir: "LR", nodesep: 44, ranksep: 130, edgesep: 24, marginx: 72, marginy: 72, ranker: "tight-tree" });
    gg.setDefaultEdgeLabel(() => ({}));
    sh.forEach((t) => gg.setNode(t.name, { width: W, height: H }));
    lk.forEach((l) => { if (gg.hasNode(l.a) && gg.hasNode(l.b)) gg.setEdge(l.a, l.b); });
    try { dagre.layout(gg); } catch { /* layout best-effort */ }
    const p: Record<string, { x: number; y: number }> = {};
    sh.forEach((t, i) => { const nd = gg.node(t.name); p[t.name] = nd ? { x: nd.x - W / 2, y: nd.y - H / 2 } : { x: 72, y: 72 + i * (H + 40) }; });
    const gr = gg.graph();
    // guard against dagre returning -Infinity/NaN when there are no nodes (empty workspace)
    const gw = Number.isFinite(gr.width) && (gr.width as number) > 0 ? (gr.width as number) : 1200;
    const gh = Number.isFinite(gr.height) && (gr.height as number) > 0 ? (gr.height as number) : 720;
    return { shown: sh, pos: p, own: owner, links: lk, vbW: gw + 144, vbH: gh + 144 };
  }, [code, [...selMods].sort().join(",")]);

  const [sel, setSel] = useState<string | null>(focus && focus[0] ? focus[0] : null);
  const [drawer, setDrawer] = useState<string | null>(focus && focus[0] ? focus[0] : null);
  const [hv, setHv] = useState<string | null>(null);
  const [multi, setMulti] = useState<Set<string>>(new Set()); // shift+click selection
  useEffect(() => { setMulti(new Set()); }, [code]);
  const multiActive = multi.size >= 2;
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
  const trRef = useRef(tr); trRef.current = tr; // live tr for native touch listeners
  // draggable nodes: manual position overrides on top of the auto-layout
  const [dragPos, setDragPos] = useState<Record<string, { x: number; y: number }>>({});
  const nodeDrag = useRef<{ name: string; sx: number; sy: number; ox: number; oy: number; moved: boolean; shift: boolean } | null>(null);
  // restore saved custom layout for this module (else clear) when auto-layout changes
  useEffect(() => { setDragPos(loadLayout(code)); }, [pos, code]);
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
  // ---- Focus Mode: enter a node (save viewport + zoom in), exit (restore exactly) ----
  const prevView = useRef<{ x: number; y: number; k: number } | null>(null);
  const enterFocus = useCallback((name: string) => {
    if (!sel) prevView.current = { ...trRef.current }; // remember overview only when entering from it
    setSel(name); setDrawer(null);
    const el = wrapRef.current; const p = P(name); if (!el || !p) return;
    const vw = el.clientWidth || 1200, vh = el.clientHeight || 720;
    setTr(() => { const k = 0.95; return { k, x: vw / 2 - (p.x + W / 2) * k, y: vh / 2 - (p.y + H / 2) * k }; }); // smooth (CSS transition) zoom-in to the node
  }, [sel, P]);
  const exitFocus = useCallback(() => {
    setSel(null); setDrawer(null);
    if (prevView.current) { setTr(prevView.current); prevView.current = null; } else fit();
  }, [fit]);
  const fitSelection = useCallback(() => {
    if (!sel) return; const el = wrapRef.current; if (!el) return;
    const ps = [...neigh(sel)].map((n) => P(n)).filter(Boolean) as { x: number; y: number }[];
    if (!ps.length) return;
    const minx = Math.min(...ps.map((p) => p.x)), maxx = Math.max(...ps.map((p) => p.x + W));
    const miny = Math.min(...ps.map((p) => p.y)), maxy = Math.max(...ps.map((p) => p.y + H));
    const bw = Math.max(1, maxx - minx), bh = Math.max(1, maxy - miny);
    const vw = el.clientWidth || 1200, vh = el.clientHeight || 720, pad = 140;
    const k = Math.max(0.2, Math.min((vw - pad) / bw, (vh - pad) / bh, 1.6));
    setTr({ k, x: vw / 2 - (minx + bw / 2) * k, y: vh / 2 - (miny + bh / 2) * k });
  }, [sel, neigh, P]);
  const fullscreen = () => { const el = wrapRef.current; if (!el) return; document.fullscreenElement ? document.exitFullscreen() : el.requestFullscreen?.(); };
  // power-user keyboard shortcuts: F focus · R relationships · L lineage · S S/4 · T details · / search · Esc exit · ? help
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (k === "escape") { if (drawer) setDrawer(null); else if (multi.size) setMulti(new Set()); else if (sel) exitFocus(); else if (help) setHelp(false); return; }
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
  }, [drawer, sel, help, multi, exitFocus]);
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
    // touch: pinch-to-zoom (2 fingers) + one-finger pan (empty canvas). Native
    // non-passive so preventDefault works and gestures don't scroll the page.
    let pd = 0, pk = 1, pcx = 0, pcy = 0, pan1 = false, sx = 0, sy = 0, ox = 0, oy = 0;
    const dist = (t: TouchList) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
    const onTS = (e: TouchEvent) => {
      const r = el.getBoundingClientRect();
      if (e.touches.length === 2) { pan1 = false; pd = dist(e.touches) || 1; pk = trRef.current.k; pcx = (e.touches[0].clientX + e.touches[1].clientX) / 2 - r.left; pcy = (e.touches[0].clientY + e.touches[1].clientY) / 2 - r.top; }
      else if (e.touches.length === 1) { const t = e.touches[0]; if ((t.target as Element)?.closest?.("[data-card],[data-drawer]")) { pan1 = false; return; } pan1 = true; sx = t.clientX; sy = t.clientY; ox = trRef.current.x; oy = trRef.current.y; }
    };
    const onTM = (e: TouchEvent) => {
      if (e.touches.length === 2) { e.preventDefault(); const nk = Math.min(2.6, Math.max(0.2, pk * (dist(e.touches) / pd))); setTr((p) => { const ratio = nk / p.k; return { k: nk, x: pcx - (pcx - p.x) * ratio, y: pcy - (pcy - p.y) * ratio }; }); }
      else if (pan1 && e.touches.length === 1) { e.preventDefault(); const t = e.touches[0]; setTr((p) => ({ ...p, x: ox + (t.clientX - sx), y: oy + (t.clientY - sy) })); }
    };
    const onTE = (e: TouchEvent) => { if (e.touches.length === 0) pan1 = false; };
    el.addEventListener("touchstart", onTS, { passive: false });
    el.addEventListener("touchmove", onTM, { passive: false });
    el.addEventListener("touchend", onTE);
    return () => { el.removeEventListener("wheel", onWheel); el.removeEventListener("touchstart", onTS); el.removeEventListener("touchmove", onTM); el.removeEventListener("touchend", onTE); };
  }, []);
  // allow clearing the workspace fully (deselect the last module → empty state)
  const toggleMod = (m: string) => setSelMods((s) => { const n = new Set(s); n.has(m) ? n.delete(m) : n.add(m); return n; });
  const dt = drawer ? byName[drawer] : null;

  return (
    <div className="space-y-2">
      {/* sticky analysis toolbar — above the canvas, never overlaps tables */}
      {!fs && selMods.size > 0 && (
        <div className="sticky top-2 z-30">
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white/95 px-2.5 py-1.5 shadow-sm backdrop-blur">
            <span className="hidden items-center gap-1.5 px-1 text-[11px] font-bold uppercase tracking-wide text-slate-400 sm:inline-flex"><Network className="size-3.5" />מצב ניתוח</span>
            <div className="flex flex-wrap items-center gap-1">
              {MODES.map(([id, he, en]) => <button key={id} onClick={() => { setMode(id); setModeInfo(modeInfo === id ? null : id); }} title={`${en} — ${MODE_DESC[id].d}`} className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${mode === id ? "bg-[#d62027] text-white shadow-sm" : "text-slate-500 hover:bg-slate-100"}`}>{he}</button>)}
            </div>
            {modeInfo && (() => { const m = modeInfo; const need = MODE_DESC[m].needsSel && !sel; return (
              <div className="flex w-full items-center gap-2 rounded-xl bg-slate-50 px-3 py-1.5 ring-1 ring-slate-200 sm:ms-auto sm:w-auto sm:max-w-[48%]" style={{ animation: "fadeIn .2s ease both" }}>
                <span className="size-2 shrink-0 rounded-full bg-[#d62027]" />
                <span className="flex-1 text-[12px] leading-snug text-slate-600">{MODE_DESC[m].d}</span>
                {need && <span className="shrink-0 rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">בחר טבלה</span>}
                <button onClick={() => setModeInfo(null)} className="shrink-0 rounded p-0.5 text-slate-400 hover:bg-slate-200"><X className="size-3.5" /></button>
              </div>
            ); })()}
          </div>
        </div>
      )}
    <div className="rounded-[1.4rem] bg-slate-100/60 p-1 ring-1 ring-black/[0.04]">
      <div ref={wrapRef} className={`relative overflow-hidden rounded-[1.1rem] border border-slate-200/80 ${fs ? "h-screen bg-slate-50" : "h-[calc(100vh-13rem)] min-h-[560px]"}`}
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px,#d7deea 1px,transparent 0)", backgroundSize: "30px 30px" }}>
        {/* fullscreen-only floating mode selector (canvas is the fullscreen layer) */}
        {fs && <div className={`absolute left-1/2 z-30 flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-white/60 bg-white/85 p-1 shadow-lg shadow-black/5 backdrop-blur-md transition-all ${sel ? "top-14" : "top-3"}`}>
          {MODES.map(([id, he, en]) => <button key={id} onClick={() => { setMode(id); setModeInfo(id); }} title={`${en} — ${MODE_DESC[id].d}`} className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${mode === id ? "bg-[#d62027] text-white shadow-sm" : "text-slate-500 hover:bg-slate-100"}`}>{he}</button>)}
        </div>}
        {/* mode explainer popup (fullscreen) */}
        {fs && modeInfo && (() => { const m = modeInfo; const need = MODE_DESC[m].needsSel && !sel; return (
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
            <div className={`absolute left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1 transition-all ${fs ? (sel ? "top-[6.5rem]" : "top-[3.4rem]") : (sel ? "top-14" : "top-3")}`}>
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
        <div className={`absolute left-3 z-20 flex max-w-[58%] flex-col gap-1.5 transition-all ${sel ? "top-14" : "top-3"}`}>
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
        {/* process path (multi-select, #6) — ordered business flow of chosen tables */}
        {multiActive && (() => {
          const seq = [...multi].filter((n) => byName[n]).sort((a, b) => ((P(a)?.x ?? 0) - (P(b)?.x ?? 0)));
          return (
            <div className="absolute bottom-3 left-1/2 z-30 w-[min(680px,92%)] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white/95 px-3 py-2 shadow-xl backdrop-blur-md" dir="rtl">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-900"><Workflow className="size-3.5 text-[#d62027]" />מסלול תהליך · {seq.length} טבלאות</span>
                <button onClick={() => setMulti(new Set())} className="rounded-md px-1.5 py-0.5 text-[11px] font-bold text-slate-400 transition hover:bg-slate-100 hover:text-[#d62027]">נקה</button>
              </div>
              <div className="flex items-center gap-1 overflow-x-auto pb-1">
                {seq.map((n, i) => { const tt = byName[n]; const cc = color(own[n] || tt.mod); return (
                  <span key={n} className="flex shrink-0 items-center gap-1">
                    <button onClick={() => { setMulti(new Set()); setSel(n); setDrawer(null); centerOn(n); }} className="flex flex-col items-start rounded-lg border bg-white px-2 py-1 text-right transition hover:shadow-sm active:scale-95" style={{ borderColor: cc }}>
                      <span className="font-mono text-[12px] font-extrabold" style={{ color: cc }} dir="ltr">{n}</span>
                      <span className="max-w-[120px] truncate text-[9px] font-semibold text-slate-400">{tt.he || tt.en}</span>
                    </button>
                    {i < seq.length - 1 && <ArrowLeft className="size-3.5 shrink-0 text-slate-300" />}
                  </span>); })}
              </div>
              <p className="mt-0.5 text-[9px] text-slate-400">סדר לפי תלות במודל הנתונים (Shift+קליק להוספה/הסרה)</p>
            </div>
          );
        })()}
        {/* legend (top-right) */}
        <div className={`pointer-events-none absolute right-3 z-20 flex flex-wrap gap-1.5 text-[10px] font-bold transition-all ${sel ? "top-14" : "top-3"}`}>
          {[["🔑 PK", "#d97706"], ["FK", "#2563eb"], ["חוצה-מודול", "#7c3aed"]].map(([k, v]) => (<span key={k} className="flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 shadow-sm ring-1 ring-slate-200 backdrop-blur-sm"><i className="size-2 rounded-full" style={{ background: v }} /><span style={{ color: v }}>{k}</span></span>))}
        </div>
        {/* minimap (#2) — scaled overview + draggable viewport, click to jump */}
        {(() => {
          const el = wrapRef.current; const vw = el?.clientWidth || 1200, vh = el?.clientHeight || 720;
          const MMW = 184; const s = MMW / Math.max(vbW, 1); const MMH = Math.max(64, Math.min(168, vbH * s));
          const jump = (e: React.PointerEvent) => { const r = (e.currentTarget as HTMLElement).getBoundingClientRect(); const gx = (e.clientX - r.left) / s, gy = (e.clientY - r.top) / s; setTr((cur) => ({ k: cur.k, x: vw / 2 - gx * cur.k, y: vh / 2 - gy * cur.k })); };
          return (
            <div className={`absolute right-3 z-20 hidden cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white/95 shadow-lg backdrop-blur-md transition-all sm:block ${sel ? "top-[7rem]" : "top-12"}`} style={{ width: MMW, height: MMH }} title="מפת ניווט — לחץ לקפיצה" onPointerDown={jump}>
              <svg width={MMW} height={MMH}>
                {shown.map((t) => { const p = P(t.name); if (!p) return null; const cc = color(own[t.name] || t.mod); const on = multi.has(t.name) || sel === t.name; return <rect key={t.name} x={p.x * s} y={p.y * s} width={Math.max(3, W * s)} height={Math.max(2, H * s)} rx={1.5} fill={on ? cc : cc + "66"} />; })}
                <rect x={(-tr.x / tr.k) * s} y={(-tr.y / tr.k) * s} width={(vw / tr.k) * s} height={(vh / tr.k) * s} fill="rgba(214,32,39,.10)" stroke="#d62027" strokeWidth={1.5} rx={2} />
              </svg>
            </div>
          );
        })()}
        {/* floating: control dock (bottom-center) */}
        <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 rounded-2xl border border-white/60 bg-white/90 p-1.5 shadow-xl shadow-black/10 backdrop-blur-md">
          <button onClick={() => setPanMode((v) => !v)} title="מצב גרירה" className={`grid size-9 place-items-center rounded-xl transition active:scale-90 ${panMode ? "bg-[#d62027] text-white" : "text-slate-600 hover:bg-slate-100"}`}><Hand className="size-4" /></button>
          <span className="mx-0.5 h-5 w-px bg-slate-200" />
          {[[<ZoomOut key="zo" className="size-4" />, () => setTr((p) => ({ ...p, k: Math.max(0.2, p.k / 1.2) })), "הקטן"], [<Scan key="f" className="size-4" />, fit, "התאם"], [<ZoomIn key="zi" className="size-4" />, () => setTr((p) => ({ ...p, k: Math.min(2.6, p.k * 1.2) })), "הגדל"], [<RotateCcw key="rl" className="size-4" />, () => { setDragPos({}); saveLayout(code, {}); fit(); }, "אפס פריסה"], [fs ? <Shrink key="s" className="size-4" /> : <Expand key="e" className="size-4" />, fullscreen, "מסך מלא"], [<Home key="h" className="size-4" />, onHome, "בית"]].map((b, i) => <button key={i} title={b[2] as string} onClick={b[1] as () => void} className="grid size-9 place-items-center rounded-xl text-slate-600 transition hover:bg-[#d62027] hover:text-white active:scale-90">{b[0] as React.ReactNode}</button>)}
          <span className="px-2 font-mono text-xs font-bold tabular-nums text-slate-400">{Math.round(tr.k * 100)}%</span>
        </div>
        {panMode && <div className="pointer-events-none absolute bottom-[4.25rem] left-1/2 z-20 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-[#d62027] px-2.5 py-0.5 text-[10px] font-bold text-white shadow-md"><Hand className="size-3" />מצב גרירה</div>}
        {/* Focus Mode header — full-width sub-view bar (Figma/Miro style). Sits above
            the analysis toolbar (which shifts down while focused), never overlaps. */}
        {sel && (
          <div className="absolute inset-x-0 top-0 z-50 flex items-center justify-between gap-2 border-b border-white/15 bg-gradient-to-l from-[#d62027] to-[#8f1318] px-3 py-2 text-white shadow-lg" style={{ animation: "fadeUp .25s ease both" }} dir="rtl">
            <span className="flex min-w-0 items-center gap-2 text-sm font-bold">
              <Search className="size-4 shrink-0 opacity-90" />
              <span className="shrink-0 opacity-90">מצב מיקוד:</span>
              <span className="tech truncate rounded-md bg-white/20 px-2 py-0.5 font-mono font-extrabold ring-1 ring-white/25" dir="ltr">{sel}</span>
            </span>
            <div className="flex shrink-0 items-center gap-1">
              <button onClick={fitSelection} title="התאם לבחירה" className="grid size-8 place-items-center rounded-lg text-white/80 transition hover:bg-white/15"><Scan className="size-4" /></button>
              <button onClick={() => setTr((p) => ({ ...p, k: Math.min(2.6, p.k * 1.2) }))} title="הגדל" className="grid size-8 place-items-center rounded-lg text-white/80 transition hover:bg-white/15"><ZoomIn className="size-4" /></button>
              <button onClick={() => setTr((p) => ({ ...p, k: Math.max(0.2, p.k / 1.2) }))} title="הקטן" className="grid size-8 place-items-center rounded-lg text-white/80 transition hover:bg-white/15"><ZoomOut className="size-4" /></button>
              <button onClick={exitFocus} className="tap inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-sm font-extrabold text-[#d62027] shadow-sm transition hover:bg-white/90 active:scale-95"><ArrowRight className="size-4" />חזרה למפת הקשרים</button>
            </div>
          </div>
        )}
        {/* empty workspace — no module selected: clean canvas + centered module picker */}
        {selMods.size === 0 && (
          <div className="pointer-events-none absolute inset-0 z-30 grid place-items-center p-5" style={{ animation: "fadeIn .3s ease both" }}>
            <div className="pointer-events-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white/95 p-6 text-center shadow-xl backdrop-blur-md sm:p-8" dir="rtl">
              <div className="mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-slate-900 text-white"><GitBranch className="size-6" /></div>
              <h3 className="text-xl font-extrabold text-slate-900">בחר מודול לחקירה</h3>
              <p className="mx-auto mt-1.5 max-w-xs text-sm text-slate-500">בחר PM, PP-PI, MM, SD או מודול אחר כדי לטעון את מודל הנתונים — טבלאות, קשרים והשפעת S/4.</p>
              <div className="mt-5 grid grid-cols-3 gap-2.5">
                {["PM", "PP-PI", "MM", "SD", "FI", "CS"].map((m) => { const cc = color(m); return (
                  <button key={m} onClick={() => toggleMod(m)} className="tap flex flex-col items-center gap-1 rounded-2xl border-2 bg-white px-2 py-3.5 font-extrabold transition hover:-translate-y-0.5 hover:shadow-md active:scale-95" style={{ borderColor: cc + "44", color: cc }}>
                    <span className="grid size-7 place-items-center rounded-lg text-[11px] text-white" style={{ background: cc }}>{m === "PP-PI" ? "PP" : m}</span>
                    <span className="text-sm">{m}</span>
                  </button>); })}
              </div>
            </div>
          </div>
        )}
          <div className="absolute inset-0"
            onPointerDown={(e) => { if (e.pointerType === "touch") return; if (!panMode || (e.target as Element).closest("[data-card],[data-drawer]")) return; pan.current = { x: e.clientX, y: e.clientY, ox: tr.x, oy: tr.y }; }}
            onPointerMove={(e) => { if (e.pointerType === "touch" || !pan.current) return; setTr((p) => ({ ...p, x: pan.current!.ox + (e.clientX - pan.current!.x), y: pan.current!.oy + (e.clientY - pan.current!.y) })); }}
            onPointerUp={() => (pan.current = null)} onPointerLeave={() => (pan.current = null)}
            style={{ cursor: panMode ? (pan.current ? "grabbing" : "grab") : "default", touchAction: "none" }}>
            <div className="absolute left-0 top-0 origin-top-left" style={{ transform: `translate(${tr.x}px,${tr.y}px) scale(${tr.k})`, width: vbW, height: vbH, transition: pan.current ? "none" : "transform .5s cubic-bezier(.32,.72,0,1)" }}>
              <svg className="pointer-events-none absolute left-0 top-0" width={vbW} height={vbH} style={{ overflow: "visible" }}>
                <defs>
                  <filter id="archglow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                </defs>
                {links.map((l, i) => { const A = P(l.a), B = P(l.b), TA = byName[l.a], TB = byName[l.b]; if (!A || !B || !TA || !TB) return null;
                  const fwd = A.x <= B.x; const ax = (fwd ? A.x + W : A.x), ay = A.y + H / 2, bx = (fwd ? B.x : B.x + W), by = B.y + H / 2; const mx = (ax + bx) / 2;
                  const isCross = (own[l.a] || TA.mod) !== (own[l.b] || TB.mod); const lc = isCross ? "#7c3aed" : color(own[l.a] || TA.mod);
                  const onHv = hv ? (l.a === hv || l.b === hv) : false;
                  const emph = (multiActive ? (multi.has(l.a) && multi.has(l.b)) : linkEmph(l.a, l.b)) || onHv;
                  const anyActive = active || mode === "flow" || multiActive; const dim = !!anyActive && !emph;
                  const stroke = dim ? "#cbd5e1" : lc, w = emph ? 3 : (isCross ? 1.8 : 1.4);
                  // orthogonal (Manhattan) routing with rounded corners; vertical run
                  // sits in the inter-rank gap (midX) so it clears node columns.
                  const r = 12; const hOut = mx > ax ? 1 : -1, hIn = bx > mx ? 1 : -1, vd = by > ay ? 1 : -1;
                  const d = Math.abs(ay - by) < 2
                    ? `M${ax},${ay} L${bx},${by}`
                    : `M${ax},${ay} L${mx - r * hOut},${ay} Q${mx},${ay} ${mx},${ay + r * vd} L${mx},${by - r * vd} Q${mx},${by} ${mx + r * hIn},${by} L${bx},${by}`;
                  return <g key={i} opacity={dim ? 0.12 : 1}>
                    <title>{`${l.a} → ${l.b} · ${l.card}${l.desc ? ` — ${l.desc}` : ""}`}</title>
                    {/* invisible wide hit-area so the relationship tooltip is easy to hover */}
                    <path d={d} fill="none" stroke="transparent" strokeWidth={14} style={{ pointerEvents: "stroke" }} />
                    <path id={`lp${i}`} d={d} fill="none" stroke={stroke} strokeWidth={w} strokeOpacity={emph ? 1 : 0.66} className={`flowline${emph ? " fast" : ""}`} filter={emph ? "url(#archglow)" : undefined} />
                    <path d={`M${bx + (fwd ? -10 : 10)},${by - 6} L${bx},${by} M${bx + (fwd ? -10 : 10)},${by + 6} L${bx},${by}`} stroke={stroke} strokeWidth={w} fill="none" />
                    {emph && !dim && <circle r={4} fill={lc} filter="url(#archglow)"><animateMotion dur={`${mode === "flow" ? 2.4 : 1.8}s`} repeatCount="indefinite" rotate="auto"><mpath href={`#lp${i}`} /></animateMotion></circle>}
                    <g opacity={dim ? 0.4 : 1}><rect x={mx - 17} y={(ay + by) / 2 - 8} width={34} height={16} rx={6} fill={emph ? lc : "#94a3b8"} /><text x={mx} y={(ay + by) / 2 + 4} textAnchor="middle" style={{ font: "700 9px ui-monospace" }} fill="#fff">{cardKind(l.card)}</text></g>
                  </g>; })}
              </svg>
              {shown.map((t, gi) => { const p = P(t.name); if (!p) return null; const c = color(own[t.name] || t.mod); const isSel = sel === t.name; const nd = nodeData[t.name]; const tf = nd.tf, top = nd.top, pkN = nd.pkN, fkN = nd.fkN;
                const st = nd.st; const impFields = nd.impFields;
                const inMulti = multi.has(t.name);
                const fade = !s4ok(t.name); const dim = (multiActive ? !inMulti : (active && !active.has(t.name))) || fade;
                const dragging = nodeDrag.current?.name === t.name;
                const baseShadow = isSel ? `0 26px 56px -18px ${c}66, 0 0 0 2px ${c}` : inMulti ? `0 14px 30px -16px ${c}77, 0 0 0 2.5px ${c}` : "0 10px 26px -16px rgba(15,23,42,.28)";
                const glow = st.impacted ? ", 0 0 0 2px #f59e0b, 0 0 16px 1px rgba(245,158,11,.5)" : "";
                return (
                  <div key={t.name} data-card
                    onPointerDown={(e) => { if ((e.target as Element).closest("[data-nodrag]")) return; e.stopPropagation(); try { (e.currentTarget as Element).setPointerCapture?.(e.pointerId); } catch { /* synthetic events */ } const cur = P(t.name) || { x: 0, y: 0 }; nodeDrag.current = { name: t.name, sx: e.clientX, sy: e.clientY, ox: cur.x, oy: cur.y, moved: false, shift: e.shiftKey }; }}
                    onPointerMove={(e) => { const d = nodeDrag.current; if (!d || d.name !== t.name) return; if (Math.abs(e.clientX - d.sx) + Math.abs(e.clientY - d.sy) > 4) d.moved = true; if (d.moved) { const nx = d.ox + (e.clientX - d.sx) / tr.k, ny = d.oy + (e.clientY - d.sy) / tr.k; setDragPos((m) => ({ ...m, [t.name]: { x: nx, y: ny } })); } }}
                    onPointerUp={() => { const d = nodeDrag.current; nodeDrag.current = null; if (d && !d.moved) { if (d.shift) { setMulti((s) => { const n = new Set(s); if (n.size === 0 && sel) n.add(sel); n.has(t.name) ? n.delete(t.name) : n.add(t.name); return n; }); } else { setMulti(new Set()); if (sel !== t.name) enterFocus(t.name); else exitFocus(); } } else if (d && d.moved) { setDragPos((m) => { saveLayout(code, m); return m; }); } }}
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
              const Sec = ({ title, icon, children: ch }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) => <div className="break-inside-avoid border-t border-slate-100 px-5 py-3.5"><h4 className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: c }}>{icon}{title}</h4>{ch}</div>;
              const Pills = ({ a, nav }: { a: string[]; nav?: boolean }) => a.length ? <div className="flex flex-wrap gap-1">{a.map((x) => nav && byName[x] ? <button key={x} onClick={() => { const tt = byName[x]; if (tt && tt.mod !== t.mod && !selMods.has(tt.mod)) toggleMod(tt.mod); setSel(x); setDrawer(x); }} className="rounded-md border px-1.5 py-0.5 font-mono text-[11px] font-bold transition hover:bg-slate-50" style={{ borderColor: byName[x] ? color(byName[x].mod) : c, color: byName[x] ? color(byName[x].mod) : c }}>{x}</button> : <span key={x} className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-600">{x}</span>)}</div> : <span className="text-[11px] italic text-slate-300">—</span>;
              const s4 = s4For(t.name, t.s4, t.s4alt); const imp = s4.impact;
              return (
                <>
                  {/* dim + soft blur behind the drawer; click to close */}
                  <div className="absolute inset-0 z-30 bg-slate-900/30 backdrop-blur-[2px]" style={{ animation: "fadeIn .25s ease both" }} onPointerDown={(e) => { e.stopPropagation(); setDrawer(null); }} />
                <div data-drawer dir="rtl" className="drawer-anim absolute inset-x-0 bottom-0 top-auto z-40 flex max-h-[86%] flex-col overflow-hidden rounded-t-3xl border-t border-slate-200 bg-white shadow-2xl sm:max-h-[74%] lg:h-[48vh] lg:max-h-none" onPointerDown={(e) => e.stopPropagation()}>
                  {/* grab handle */}
                  <div className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-slate-300 lg:hidden" />
                  <div className="relative shrink-0 px-5 py-3.5 text-white" style={{ background: "linear-gradient(135deg,#d62027,#8f1318)" }}>
                    <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: c }} />
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0"><div className="flex items-center gap-2"><span className="font-mono text-3xl font-extrabold" dir="ltr">{t.name}</span><span className="rounded-md bg-white/20 px-2 py-0.5 text-[11px] font-bold">{t.mod}</span></div><p className="mt-0.5 truncate text-sm text-white/85">{t.he || t.en}</p></div>
                      <button onClick={() => { setDrawer(null); }} aria-label="סגור" className="tap grid size-9 shrink-0 place-items-center rounded-xl bg-white/15 text-white ring-1 ring-white/25 transition hover:bg-white/25 active:scale-90"><X className="size-5" /></button>
                    </div>
                    {/* promoted critical actions — always visible, no scroll */}
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      <button onClick={() => { setDrawer(null); enterFocus(t.name); }} className="tap inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1.5 text-xs font-extrabold text-[#d62027] transition hover:bg-white/90 active:scale-95"><GitBranch className="size-3.5" />ERD</button>
                      <Link href={`/object/${encodeURIComponent(t.name)}/`} className="tap inline-flex items-center gap-1 rounded-lg bg-white/15 px-2.5 py-1.5 text-xs font-bold text-white ring-1 ring-white/25 transition hover:bg-white/25"><Database className="size-3.5" />ידע</Link>
                      <button onClick={() => window.dispatchEvent(new Event("neo:open-mentor"))} className="tap inline-flex items-center gap-1 rounded-lg bg-white/15 px-2.5 py-1.5 text-xs font-bold text-white ring-1 ring-white/25 transition hover:bg-white/25"><BrainCircuit className="size-3.5" />מנטור</button>
                      <Link href="/troubleshooting/" className="tap inline-flex items-center gap-1 rounded-lg bg-white/15 px-2.5 py-1.5 text-xs font-bold text-white ring-1 ring-white/25 transition hover:bg-white/25"><AlertTriangle className="size-3.5" />תקלות</Link>
                      <Link href={`/impact/${encodeURIComponent(t.name)}/`} className="tap inline-flex items-center gap-1 rounded-lg bg-white/15 px-2.5 py-1.5 text-xs font-bold text-white ring-1 ring-white/25 transition hover:bg-white/25"><Gauge className="size-3.5" />S/4</Link>
                    </div>
                  </div>
                  <div className="min-h-0 flex-1 overflow-auto lg:columns-2 lg:gap-x-0 xl:columns-3">
                    {/* S/4HANA Impact — top section */}
                    <div className={`break-inside-avoid px-4 py-3 ${imp && s4.impacted ? "bg-amber-50/80" : "bg-slate-50/60"}`} style={imp && s4.impacted ? { boxShadow: "inset 0 0 0 1px #fbbf24" } : undefined}>
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
                    <div className="grid break-inside-avoid grid-cols-2"><Sec title="PK" icon={<KeyRound className="size-3 text-amber-500" />}><Pills a={pk.map((f) => f[0])} /></Sec><Sec title="FK" icon={<Link2 className="size-3 text-blue-500" />}><Pills a={fk.map((f) => f[0])} /></Sec></div>
                    <Sec title={`שדות · ${tf.length}`}>
                      <div className="overflow-hidden rounded-xl border border-slate-100"><table className="w-full text-right font-mono text-xs" dir="ltr"><tbody>{tf.slice(0, 28).map((f) => <tr key={f[0]} onClick={() => onField(t.name, f[0])} className="cursor-pointer border-b border-slate-50 last:border-0 transition hover:bg-slate-50"><td className={`px-2.5 py-1.5 font-bold ${f[3] === "PK" ? "text-amber-600" : f[3] === "FK" ? "text-blue-600" : "text-slate-700"}`}>{f[0]}</td><td className="px-2 py-1.5 text-slate-400">{f[1]}</td><td className="px-2 py-1.5 text-left">{f[3] !== "-" && <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${f[3] === "PK" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>{f[3]}</span>}</td></tr>)}</tbody></table></div>
                    </Sec>
                    <Sec title="טרנזקציות (T-Codes)"><span className="font-mono text-xs text-slate-700" dir="ltr">{t.tcodes || "—"}</span></Sec>
                    <Sec title="BAPIs / Function Modules"><Pills a={(t.funcs || []).slice(0, 8)} /></Sec>
                    <Sec title="CDS Views"><Pills a={t.cds || []} /></Sec>
                    {t.fiori && <Sec title="Fiori Apps"><span className="text-xs text-slate-700">{t.fiori}</span></Sec>}
                    <Sec title="דוחות"><Pills a={MOD_REPORTS[t.mod] || []} /></Sec>
                    <Sec title="אובייקטים קשורים · אב"><Pills a={parents} nav /></Sec>
                    <Sec title="אובייקטים קשורים · צאצא"><Pills a={children} nav /></Sec>
                    <Sec title="Where-Used"><Pills a={whereUsed} nav /></Sec>
                  </div>
                </div>
                </>); })()}
          </div>
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
