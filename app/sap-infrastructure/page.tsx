"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Search, ChevronLeft, Home, ZoomIn, ZoomOut, X, Download, KeyRound, Link2, Expand, Shrink, Scan, Maximize2, GripVertical, ArrowLeft } from "lucide-react";
import { MOD_PURPOSE, MOD_FLOW, MOD_REPORTS, genExampleRecords, ERD_MODULES, TECH_FIELDS, FIELDS_PLUS, OBJECTS } from "./meta";

const BASE = "/sap-infrastructure";
const RED = "#d62027";
type Field = [string, string, string, string];
type Rel = { role: "parent" | "child"; table: string; card: string; desc: string };
type Tbl = { name: string; mod: string; real: boolean; he: string; en: string; tcodes: string; fiori: string; s4: string; s4alt: string; pk: string[]; fields: Field[]; funcs: string[]; cds: string[]; rel: Rel[]; degree: number; zone: string };
type Bp = { code: string; purpose: string; objects: string[]; docs: string[]; tables: string[]; inputs: string[]; outputs: string[]; connects: string[] };
type Data = { meta: { counts: Record<string, number> }; palette: Record<string, string>; modules: { code: string; name: string; he: string }[]; blueprints: Bp[]; processes: { id: string; name: string; he: string; mods: string[]; docs: string[]; color: string }[]; documents: { id: string; he: string; mod: string; tables: string[] }[]; tables: Tbl[]; shared: { name: string; he: string }[]; crossModule: { from: string; to: string; he: string }[] };

const fieldsOf = (t: { name: string; fields: Field[] }) => (FIELDS_PLUS[t.name] || t.fields) as Field[];
const UNIVERSE = ["MM", "SD", "PP", "PP-PI", "PM", "QM", "CS", "FI", "CO", "BATCH", "CLASS", "IDOC", "PIPO"];
const MOD_NAME_HE: Record<string, string> = { MM: "ניהול חומרים", SD: "מכירות והפצה", PP: "תכנון ייצור", "PP-PI": "ייצור תהליכי", PM: "תחזוקת מפעל", QM: "ניהול איכות", CS: "שירות לקוחות", FI: "הנהלת חשבונות", CO: "בקרת עלויות", BATCH: "ניהול אצוות", CLASS: "מערכת סיווג", IDOC: "מסגרת IDOC/ALE", PIPO: "ממשקי PI/PO" };
const TABS = [["objects", "אובייקטים"], ["process", "תהליך"], ["erd", "ERD מלא"], ["technical", "טכני"]] as const;
const erdMembers = (data: Data, code: string): Tbl[] => { const byName = Object.fromEntries(data.tables.map((t) => [t.name, t])); const list = (ERD_MODULES[code] || []).map((n) => byName[n]).filter(Boolean) as Tbl[]; return list.length ? list : data.tables.filter((t) => t.mod === code).sort((a, b) => b.degree - a.degree).slice(0, 16); };

const ANIM = `@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}@keyframes erdflow{to{stroke-dashoffset:-200}}.flowline{stroke-dasharray:7 6;animation:erdflow 3s linear infinite}.flowline.fast{animation-duration:1s}@keyframes pop{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}@keyframes countpulse{0%{opacity:.4}100%{opacity:1}}`;
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
    <div dir="rtl" className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm">
      <style>{ANIM}</style>
      {/* top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-gradient-to-l from-white to-slate-50 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-[#d62027] px-2 py-1 font-mono text-[11px] font-bold text-white">NEO</span>
          <div><div className="text-base font-extrabold text-slate-900">SAP Architecture Explorer · תשתית SAP</div><div className="text-[11px] text-slate-500">ECC6 → S/4HANA · לומדים תהליך → אובייקטים → טבלאות</div></div>
        </div>
        <div className="relative w-full max-w-md">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
            <Search className="size-4 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש מודול · טבלה · T-Code · BAPI" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
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
      {/* breadcrumb */}
      <div className="flex items-center gap-1 border-b border-slate-200 bg-slate-50/60 px-4 py-2 text-xs">
        <button onClick={() => setNav({ level: "universe" })} className="flex items-center gap-1 rounded px-1.5 py-0.5 font-semibold text-slate-500 hover:bg-slate-100"><Home className="size-3" /> Universe</button>
        {nav.module && <><ChevronLeft className="size-3 text-slate-300" /><span className="rounded px-1.5 py-0.5 font-bold text-slate-800">{nav.module} · {MOD_NAME_HE[nav.module]}</span></>}
        {nav.module && nav.tab && <><ChevronLeft className="size-3 text-slate-300" /><span className="rounded px-1.5 py-0.5 font-semibold text-[#d62027]">{(TABS.find((x) => x[0] === nav.tab) || ["", nav.tab])[1]}</span></>}
      </div>

      <div className="bg-slate-50/40 p-4">
        {nav.level === "universe" && <Universe data={data} color={color} onModule={openModule} />}
        {nav.level === "module" && nav.module && <Workspace data={data} color={color} code={nav.module} tab={nav.tab || "erd"} focus={nav.focus} byName={byName}
          setTab={(t) => setNav({ level: "module", module: nav.module, tab: t })} openErd={(focus) => setNav({ level: "module", module: nav.module, tab: "erd", focus })}
          onTable={setInspect} onField={(table, f) => { setInspect(null); setField({ table, field: f }); }} onModule={openModule} inspector={inspector} />}
      </div>
      {nav.tab !== "erd" && inspector}
      <div className="flex flex-wrap items-center gap-2 border-t border-slate-200 bg-white p-2.5">
        <span className="flex items-center gap-1 px-1 text-xs font-bold text-slate-500"><Download className="size-3.5" /> הורדות:</span>
        {[["SAP-Enterprise-Architecture-A0.pdf", "PDF"], ["SAP-Enterprise-Architecture-A0.png", "PNG"], ["SAP-Enterprise-Architecture-A0.svg", "SVG"], ["dataset.json", "JSON"]].map(([f, l]) => <a key={f} href={`${BASE}/${f}`} download className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:border-[#d62027] hover:text-[#d62027]">{l}</a>)}
        <span className="ms-auto px-1 text-[11px] text-slate-400">Sali Halif — Web Coding · NEO Cockpit · 2026</span>
      </div>
    </div>
  );
}

/* ===================== UNIVERSE (light, branded, animated grid) ===================== */
function Universe({ data, color, onModule }: { data: Data; color: (m?: string | null) => string; onModule: (m: string) => void }) {
  const tc = (m: string) => data.tables.filter((x) => x.mod === m).length, pc = (m: string) => data.processes.filter((p) => p.mods.includes(m)).length;
  return (
    <div className="space-y-5">
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
function Workspace({ data, color, code, tab, focus, byName, setTab, openErd, onTable, onField, onModule, inspector }: { data: Data; color: (m?: string | null) => string; code: string; tab: string; focus?: string[]; byName: Record<string, Tbl>; setTab: (t: string) => void; openErd: (f?: string[]) => void; onTable: (t: string) => void; onField: (table: string, field: string) => void; onModule: (m: string) => void; inspector: React.ReactNode }) {
  const c = color(code); const bp = data.blueprints.find((b) => b.code === code); const purpose = bp?.purpose || MOD_PURPOSE[code] || "";
  return (
    <div className="space-y-4" style={{ animation: "fadeUp .35s ease both" }}>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm" style={{ borderInlineStartColor: c, borderInlineStartWidth: 5 }}>
        <div><div className="flex items-center gap-2"><span className="font-mono text-2xl font-extrabold text-slate-900">{code}</span><span className="font-semibold text-slate-600">{MOD_NAME_HE[code]}</span></div><p className="mt-0.5 max-w-3xl text-xs text-slate-500">{purpose}</p></div>
        <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-0.5">
          {TABS.map(([id, label]) => <button key={id} onClick={() => setTab(id)} className={`rounded-lg px-3.5 py-1.5 text-sm font-bold transition ${tab === id ? "bg-[#d62027] text-white shadow-sm" : "text-slate-500 hover:text-slate-900"}`}>{label}</button>)}
        </div>
      </div>
      {tab === "objects" && <ObjectsView data={data} color={color} code={code} byName={byName} onObjectErd={(tables) => openErd(tables)} onTable={onTable} />}
      {tab === "process" && <ProcessFlow color={color} code={code} />}
      {tab === "erd" && <Erd data={data} color={color} code={code} byName={byName} focus={focus} onTable={onTable} onField={onField} inspector={inspector} />}
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
      <button onClick={() => onObjectErd(undefined)} className="inline-flex items-center gap-2 rounded-xl bg-[#d62027] px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:brightness-110"><Maximize2 className="size-4" /> פתח ERD מלא של {code}</button>
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

function Erd({ data, color, code, byName, focus, onTable, onField, inspector }: { data: Data; color: (m?: string | null) => string; code: string; byName: Record<string, Tbl>; focus?: string[]; onTable: (t: string) => void; onField: (table: string, field: string) => void; inspector: React.ReactNode }) {
  const [selMods, setSelMods] = useState<Set<string>>(() => new Set([code]));
  useEffect(() => { setSelMods(new Set([code])); }, [code]);
  const ordered = UNIVERSE.filter((m) => selMods.has(m));
  const cardW = 200, headH = 36, rowH = 19, secH = 17;

  // assemble tables across selected modules, assign each unique table to one owning cluster
  const { shown, regions, init, own } = useMemo(() => {
    const memberMap: Record<string, Tbl[]> = {}; ordered.forEach((m) => { memberMap[m] = erdMembers(data, m); });
    const allNames = [...new Set(ordered.flatMap((m) => memberMap[m].map((t) => t.name)))];
    const owner: Record<string, string> = {};
    allNames.forEach((n) => { const t = byName[n]; owner[n] = t && selMods.has(t.mod) ? t.mod : ordered.find((m) => memberMap[m].some((x) => x.name === n)) || ordered[0]; });
    const sh = allNames.map((n) => byName[n]).filter(Boolean) as Tbl[];
    const pos: Record<string, { x: number; y: number }> = {}; const regs: { m: string; x: number; y: number; w: number; h: number }[] = [];
    let cx = 44;
    ordered.forEach((m) => {
      const tbls = allNames.filter((n) => owner[n] === m).map((n) => byName[n]).filter(Boolean) as Tbl[];
      const ncol = tbls.length > 8 ? 3 : 2; const w = ncol * cardW + (ncol - 1) * 26;
      tbls.forEach((t, i) => { const r = Math.floor(i / ncol), c = i % ncol; pos[t.name] = { x: cx + c * (cardW + 26), y: 104 + r * 248 }; });
      const rows = Math.max(1, Math.ceil(tbls.length / ncol));
      regs.push({ m, x: cx - 20, y: 50, w: w + 40, h: 64 + rows * 248 });
      cx += w + 96;
    });
    return { shown: sh, regions: regs, init: pos, own: owner };
  }, [code, [...selMods].sort().join(",")]);

  const [posns, setPos] = useState(init);
  const [exp, setExp] = useState<Set<string>>(() => new Set(focus && focus[0] ? [focus[0]] : []));
  const [sel, setSel] = useState<string | null>(focus && focus[0] ? focus[0] : null);
  const [hv, setHv] = useState<string | null>(null);
  const [fs, setFs] = useState(false);
  const { t: zt, bg, setT } = usePZ();
  const wrapRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ name: string; x: number; y: number; ox: number; oy: number; moved: boolean } | null>(null);
  useEffect(() => { setPos(init); /* eslint-disable-next-line */ }, [init]);
  useEffect(() => { setExp(new Set(focus && focus[0] ? [focus[0]] : [])); setSel(focus && focus[0] ? focus[0] : null); /* eslint-disable-next-line */ }, [code, focus]);
  useEffect(() => { const h = () => setFs(!!document.fullscreenElement); document.addEventListener("fullscreenchange", h); return () => document.removeEventListener("fullscreenchange", h); }, []);

  const names = new Set(shown.map((t) => t.name));
  const groups = (t: Tbl) => { const f = fieldsOf(t); const pk = f.filter((x) => x[3] === "PK"), fk = f.filter((x) => x[3] === "FK"); const tech = f.filter((x) => x[3] !== "PK" && x[3] !== "FK" && TECH_FIELDS.has(x[0])).slice(0, 3); const biz = f.filter((x) => x[3] !== "PK" && x[3] !== "FK" && !TECH_FIELDS.has(x[0])).slice(0, 8); return { pk, fk, biz, tech }; };
  const cardH = (t: Tbl) => { if (!exp.has(t.name)) return 74; const g = groups(t); let h = headH + 8; [g.pk, g.fk, g.biz, g.tech].forEach((a) => { if (a.length) h += secH + a.length * rowH + 4; }); return h + 6; };
  const links: { a: string; b: string; card: string }[] = [];
  shown.forEach((t) => t.rel.forEach((r) => { if (names.has(r.table)) { const a = r.role === "parent" ? t.name : r.table, b = r.role === "parent" ? r.table : t.name; if (!links.find((l) => l.a === a && l.b === b)) links.push({ a, b, card: r.card || "1:N" }); } }));
  const neigh = (nm: string) => { const s = new Set([nm]); links.forEach((l) => { if (l.a === nm) s.add(l.b); if (l.b === nm) s.add(l.a); }); return s; };
  const active = sel ? neigh(sel) : null;
  const allX = shown.map((t) => (posns[t.name] || init[t.name] || { x: 0 }).x);
  const vbW = Math.max((Math.max(0, ...allX) + cardW + 60), 1000), vbH = Math.max(...regions.map((r) => r.y + r.h + 40), 560);
  const onCardDown = (e: React.PointerEvent, nm: string) => { e.stopPropagation(); const p = posns[nm]; if (!p) return; drag.current = { name: nm, x: e.clientX, y: e.clientY, ox: p.x, oy: p.y, moved: false }; };
  const onMove = (e: React.PointerEvent) => { if (!drag.current) { bg.onPointerMove(e); return; } const d = drag.current; if (Math.abs(e.clientX - d.x) + Math.abs(e.clientY - d.y) > 3) d.moved = true; setPos((p) => ({ ...p, [d.name]: { x: d.ox + (e.clientX - d.x) / zt.k, y: d.oy + (e.clientY - d.y) / zt.k } })); };
  const onUp = () => { drag.current = null; bg.onPointerUp(); };
  const fit = () => { const k = Math.max(0.5, Math.min((1000) / vbW, 1.1)); setT({ k: Math.min(1.1, Math.max(0.5, 1100 / vbW)), x: 0, y: 16 }); };
  const fullscreen = () => { const el = wrapRef.current; if (!el) return; document.fullscreenElement ? document.exitFullscreen() : el.requestFullscreen?.(); };
  const centerOn = (nm: string) => { const p = posns[nm]; if (!p) return; const k = Math.max(zt.k, 0.95); setT({ k, x: vbW / 2 - (p.x + cardW / 2) * k, y: vbH / 2.4 - (p.y + 40) * k }); };
  const vx = -zt.x / zt.k, vy = -zt.y / zt.k, vw = vbW / zt.k, vh = vbH / zt.k, miniK = Math.min(168 / vbW, 112 / vbH);
  useEffect(() => { const id = setTimeout(fit, 90); return () => clearTimeout(id); /* eslint-disable-next-line */ }, [code, [...selMods].sort().join(",")]);
  const toggleMod = (m: string) => setSelMods((s) => { const n = new Set(s); if (n.has(m)) { if (n.size > 1) n.delete(m); } else n.add(m); return n; });

  return (
    <div className="space-y-2">
      {/* module composer checkboxes */}
      <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-2">
        <span className="px-1 text-xs font-bold text-slate-500">הרכב מודולים:</span>
        {UNIVERSE.map((m) => { const on = selMods.has(m); const c = color(m); return (
          <button key={m} onClick={() => toggleMod(m)} className="flex items-center gap-1.5 rounded-lg border px-2 py-1 text-xs font-bold transition" style={{ borderColor: on ? c : "#e2e8f0", background: on ? c : "#fff", color: on ? "#fff" : "#64748b" }}>
            <span className="grid size-3.5 place-items-center rounded-[4px] text-[9px]" style={{ background: on ? "#ffffff35" : "#f1f5f9", color: on ? "#fff" : "transparent" }}>✓</span>{m}
          </button>); })}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-slate-700">תרשים מודולים · {ordered.join(" + ")} · {shown.length} טבלאות</h3>
        <div className="flex items-center gap-1">
          {[[<Expand key="e" className="size-3" />, "הרחב", () => setExp(new Set(shown.map((t) => t.name)))], [<Shrink key="s" className="size-3" />, "כווץ", () => setExp(new Set())], [<Scan key="f" className="size-3" />, "התאם", fit], [<Maximize2 key="m" className="size-3" />, "מסך מלא", fullscreen]].map((b, i) => <button key={i} onClick={b[2] as () => void} className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-slate-600 hover:border-slate-300">{b[0] as React.ReactNode}{b[1] as string}</button>)}
        </div>
      </div>
      <div ref={wrapRef} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white" style={{ backgroundImage: "radial-gradient(#e2e8f0 1px,transparent 1px)", backgroundSize: "22px 22px" }}>
        <div className="absolute right-2 top-2 z-10 flex flex-wrap gap-1.5 text-[10px] font-bold">
          {[["🔑 PK", "#d97706"], ["FK", "#2563eb"], ["חוצה-מודול", "#7c3aed"]].map(([k, v]) => (<span key={k} className="flex items-center gap-1 rounded-md bg-white/95 px-2 py-0.5 ring-1 ring-slate-200"><i className="size-2 rounded-full" style={{ background: v }} /><span style={{ color: v }}>{k}</span></span>))}
        </div>
        <svg viewBox={`0 0 ${vbW} ${vbH}`} className={`w-full touch-none ${fs ? "h-screen bg-white" : "h-[72vh] min-h-[540px]"}`} onWheel={bg.onWheel} onPointerDown={(e) => { bg.onPointerDown(e); if (!(e.target as Element).closest("[data-card]")) setSel(null); }} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}>
          <g transform={`translate(${zt.x},${zt.y}) scale(${zt.k})`}>
            {/* module region backgrounds */}
            {regions.map((rg) => { const c = color(rg.m); return <g key={rg.m}>
              <rect x={rg.x} y={rg.y} width={rg.w} height={rg.h} rx={18} fill={c} fillOpacity={0.05} stroke={c} strokeOpacity={0.35} strokeDasharray="6 6" />
              <rect x={rg.x} y={rg.y} width={rg.w} height={30} rx={10} fill={c} fillOpacity={0.14} />
              <text x={rg.x + 14} y={rg.y + 20} style={{ font: "800 14px ui-monospace" }} fill={c}>{rg.m}</text>
              <text x={rg.x + rg.w - 14} y={rg.y + 20} textAnchor="end" style={{ font: "600 11px sans-serif" }} fill={c}>{MOD_NAME_HE[rg.m] || ""}</text>
            </g>; })}
            {/* links */}
            {links.map((l, i) => { const A = posns[l.a], B = posns[l.b], TA = byName[l.a], TB = byName[l.b]; if (!A || !B || !TA || !TB) return null;
              const ax = A.x + cardW / 2, ay = A.y + cardH(TA), bx = B.x + cardW / 2, by = B.y, my = (ay + by) / 2;
              const isCross = (own[l.a]||TA.mod) !== (own[l.b]||TB.mod); const lc = isCross ? "#7c3aed" : color(own[l.a]||TA.mod);
              const onSel = active ? (active.has(l.a) && active.has(l.b) && (l.a === sel || l.b === sel)) : false, onHv = hv ? (l.a === hv || l.b === hv) : false, dim = active && !onSel, emph = onSel || onHv;
              const stroke = dim ? "#cbd5e1" : lc, w = emph ? 2.6 : (isCross ? 1.8 : 1.4);
              return <g key={i} opacity={dim ? 0.16 : 1}>
                <path d={`M${ax},${ay} C${ax},${my} ${bx},${my} ${bx},${by}`} fill="none" stroke={stroke} strokeWidth={w} strokeOpacity={emph ? 1 : 0.75} className={`flowline${emph ? " fast" : ""}`} />
                <path d={`M${bx - 6},${by - 9} L${bx},${by} M${bx + 6},${by - 9} L${bx},${by} M${bx},${by - 11} L${bx},${by}`} stroke={stroke} strokeWidth={w} fill="none" />
                <rect x={(ax + bx) / 2 - 17} y={my - 9} width={34} height={18} rx={5} fill={emph ? lc : "#64748b"} opacity={dim ? 0.4 : 1} /><text x={(ax + bx) / 2} y={my + 4} textAnchor="middle" style={{ font: "700 10px ui-monospace" }} className="fill-white">{cardKind(l.card)}</text>
              </g>; })}
            {/* nodes */}
            {shown.map((t) => { const p = posns[t.name]; if (!p) return null; const c = color(own[t.name] || t.mod); const ch = cardH(t); const isExp = exp.has(t.name); const g = groups(t); const dim = active && !active.has(t.name); const isSel = sel === t.name; let yy = headH + 8;
              const section = (label: string, arr: Field[], cls: string, badge?: string) => { if (!arr.length) return null; const sy = yy; yy += secH; const ry0 = yy; yy += arr.length * rowH + 4;
                return <g key={label}><text x={cardW - 10} y={sy + 12} textAnchor="end" style={{ font: "700 9px sans-serif" }} className="fill-slate-400">{label}</text>
                  {arr.map((f, j) => { const ry = ry0 + j * rowH; return <g key={f[0]} transform={`translate(0,${ry})`} className="cursor-pointer" onPointerDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); onField(t.name, f[0]); }}>
                    <rect x={1} width={cardW - 2} height={rowH} fill={j % 2 ? "#f8fafc" : "#fff"} />
                    <text x={10} y={14} direction="ltr" style={{ font: `${badge === "PK" ? 700 : 500} 11px ui-monospace`, textDecoration: badge === "PK" ? "underline" : "none" }} className={cls}>{f[0]}</text>
                    {badge ? <text x={cardW - 9} y={14} textAnchor="end" style={{ font: "700 8px ui-monospace" }} className={cls}>{badge}</text> : (f[2] && <text x={cardW - 9} y={14} textAnchor="end" style={{ font: "500 9px sans-serif" }} className="fill-slate-400">{f[2].length > 13 ? f[2].slice(0, 12) + "…" : f[2]}</text>)}
                  </g>; })}</g>; };
              const sc = isSel ? 1.03 : 1; const sx = p.x - (cardW * (sc - 1)) / 2, sy2 = p.y - (ch * (sc - 1)) / 2; const toggle = () => setExp((s) => { const n = new Set(s); n.has(t.name) ? n.delete(t.name) : n.add(t.name); return n; });
              return <g key={t.name} data-card transform={`translate(${sx},${sy2}) scale(${sc})`} opacity={dim ? 0.2 : 1} className="cursor-pointer"
                onPointerDown={(e) => onCardDown(e, t.name)} onClick={() => { if (drag.current?.moved) return; setSel(t.name); toggle(); centerOn(t.name); }} onDoubleClick={() => onTable(t.name)} onMouseEnter={() => setHv(t.name)} onMouseLeave={() => setHv(null)}>
                <rect width={cardW} height={ch} rx={12} fill="#fff" stroke={isSel ? c : "#e2e8f0"} strokeWidth={isSel ? 2.5 : 1.2} style={{ filter: isSel ? `drop-shadow(0 10px 26px ${c}55)` : "drop-shadow(0 4px 14px rgba(15,23,42,.13))", transition: "filter .2s" }} />
                <path d={`M0,12 a12,12 0 0 1 12,-12 h${cardW - 24} a12,12 0 0 1 12,12 v${headH - 12} h-${cardW} z`} fill={c} />
                <text x={14} y={headH / 2 + 5} style={{ font: "800 15px ui-monospace" }} className="fill-white" direction="ltr">{t.name}</text>
                <text x={cardW - 34} y={headH / 2 + 4} textAnchor="end" style={{ font: "600 9px sans-serif" }} className="fill-white/80">{t.mod}</text>
                <g onPointerDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); toggle(); }}>
                  <rect x={cardW - 30} y={(headH - 20) / 2} width={20} height={20} rx={6} fill="#ffffff30" /><text x={cardW - 20} y={(headH - 20) / 2 + 14} textAnchor="middle" style={{ font: "800 14px sans-serif" }} className="fill-white">{isExp ? "−" : "+"}</text></g>
                <line x1={12} x2={cardW - 12} y1={headH + 5} y2={headH + 5} stroke="#e2e8f0" strokeWidth={1} strokeDasharray="3 3" />
                {!isExp && <><text x={16} y={headH + 26} style={{ font: "600 11px sans-serif" }} className="fill-slate-600">{(t.he || t.en).slice(0, 22)}</text>
                  <text x={cardW - 12} y={headH + 26} textAnchor="end" style={{ font: "700 10px ui-monospace" }} fill={c}>{fieldsOf(t).length} שדות</text></>}
                {isExp && <g style={{ animation: "pop .22s ease both" }}>{section("PRIMARY KEY", g.pk, "fill-amber-600", "PK")}{section("FOREIGN KEYS", g.fk, "fill-blue-600", "FK")}{section("BUSINESS", g.biz, "fill-slate-700")}{section("TECHNICAL", g.tech, "fill-slate-400")}</g>}
              </g>; })}
          </g>
        </svg>
        <div className="absolute bottom-2 left-2 z-10 rounded-md border border-slate-200 bg-white/95 p-1 shadow-sm">
          <svg width={172} height={116} className="block"><g transform={`scale(${miniK})`}>{shown.map((t) => { const p = posns[t.name]; if (!p) return null; return <rect key={t.name} x={p.x} y={p.y} width={cardW} height={cardH(t)} rx={6} fill={color(own[t.name]||t.mod)} opacity={0.55} />; })}<rect x={vx} y={vy} width={vw} height={vh} fill="none" stroke="#d62027" strokeWidth={6 / miniK} /></g></svg>
        </div>
        {inspector}
      </div>
      <p className="text-[11px] text-slate-500">סמן מודולים להרכבת תרשים משולב · לחיצה על קוביה = פתיחת שדות + הדגשת קשרים · לחיצה על שדה = מפרט · דאבל-קליק = טבלה מלאה · גרירה · גלגלת = זום</p>
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
      <S title="ECC → S/4HANA"><p className="text-xs text-slate-600">{t.s4 || "אין שינוי מהותי."}</p></S>
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
      <div className="sticky top-0 z-10 flex cursor-grab items-start justify-between gap-2 border-b border-slate-200 bg-white px-3.5 py-2.5 active:cursor-grabbing" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={() => (drag.current = null)}>
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
