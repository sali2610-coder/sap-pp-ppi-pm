"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Search, ChevronLeft, Home, ZoomIn, ZoomOut, Maximize2, X, Download, KeyRound, Link2, Expand, Shrink, Scan } from "lucide-react";
import { MOD_PURPOSE, MOD_FLOW, DOC_META, MOD_REPORTS, genExampleRecords, ERD_MODULES, TECH_FIELDS, FIELDS_PLUS } from "./meta";

const fieldsOf = (t: { name: string; fields: [string, string, string, string][] }) => (FIELDS_PLUS[t.name] || t.fields) as [string, string, string, string][];

const BASE = "/sap-infrastructure";

type Field = [string, string, string, string];
type Rel = { role: "parent" | "child"; table: string; card: string; desc: string };
type Tbl = { name: string; mod: string; real: boolean; he: string; en: string; tcodes: string; fiori: string; s4: string; s4alt: string; pk: string[]; fields: Field[]; funcs: string[]; cds: string[]; rel: Rel[]; degree: number; zone: string };
type Bp = { code: string; purpose: string; objects: string[]; docs: string[]; tables: string[]; inputs: string[]; outputs: string[]; connects: string[] };
type Data = { meta: { counts: Record<string, number> }; palette: Record<string, string>; modules: { code: string; name: string; he: string }[]; blueprints: Bp[]; processes: { id: string; name: string; he: string; mods: string[]; docs: string[]; color: string }[]; documents: { id: string; he: string; mod: string; tables: string[] }[]; tables: Tbl[]; shared: { name: string; he: string }[]; crossModule: { from: string; to: string; he: string }[] };

const UNIVERSE = ["MM", "SD", "PP", "PP-PI", "PM", "QM", "CS", "FI", "CO", "BATCH", "CLASS", "IDOC", "PIPO"];
const MOD_NAME_HE: Record<string, string> = { MM: "ניהול חומרים", SD: "מכירות והפצה", PP: "תכנון ייצור", "PP-PI": "ייצור תהליכי", PM: "תחזוקת מפעל", QM: "ניהול איכות", CS: "שירות לקוחות", FI: "הנהלת חשבונות", CO: "בקרת עלויות", BATCH: "ניהול אצוות", CLASS: "מערכת סיווג", IDOC: "מסגרת IDOC/ALE", PIPO: "ממשקי PI/PO" };
const TABS = [["overview", "סקירה"], ["process", "תהליך"], ["document", "מסמכים"], ["tables", "טבלאות"], ["erd", "ERD"], ["technical", "טכני"]] as const;
const erdMembers = (data: Data, code: string): Tbl[] => {
  const byName = Object.fromEntries(data.tables.map((t) => [t.name, t]));
  const list = (ERD_MODULES[code] || []).map((n) => byName[n]).filter(Boolean) as Tbl[];
  if (list.length) return list;
  return data.tables.filter((t) => t.mod === code).sort((a, b) => b.degree - a.degree).slice(0, 16);
};

export default function Page() {
  const [data, setData] = useState<Data | null>(null);
  const [nav, setNav] = useState<{ level: "universe" | "module"; module?: string; tab?: string }>({ level: "universe" });
  const [panel, setPanel] = useState<string | null>(null);
  const [q, setQ] = useState("");
  useEffect(() => { fetch(`${BASE}/dataset.json`).then((r) => r.json()).then(setData).catch(() => {}); }, []);
  const color = useCallback((m?: string | null) => (data && m && data.palette[m]) || "#475569", [data]);
  const byName = useMemo(() => (data ? Object.fromEntries(data.tables.map((t) => [t.name, t])) : {}) as Record<string, Tbl>, [data]);
  const openModule = (m: string, tab = "overview") => setNav({ level: "module", module: m, tab });

  const results = useMemo(() => {
    if (!data || !q.trim()) return [] as { type: string; label: string; sub: string; go: () => void }[];
    const s = q.trim().toUpperCase(); const out: { type: string; label: string; sub: string; go: () => void }[] = [];
    UNIVERSE.forEach((m) => { if (m.includes(s) || MOD_NAME_HE[m]?.includes(q)) out.push({ type: "מודול", label: m, sub: MOD_NAME_HE[m], go: () => openModule(m) }); });
    data.tables.forEach((t) => {
      if (t.name.includes(s) || (t.he || "").includes(q)) out.push({ type: "טבלה", label: t.name, sub: `${t.mod} · ${t.he || t.en}`, go: () => { openModule(t.mod, "erd"); setTimeout(() => setPanel(t.name), 60); } });
      else if ((t.tcodes || "").toUpperCase().includes(s)) out.push({ type: "T-Code", label: t.tcodes, sub: t.name, go: () => { openModule(t.mod, "technical"); setTimeout(() => setPanel(t.name), 60); } });
      else if ((t.funcs || []).some((f) => f.toUpperCase().includes(s))) out.push({ type: "BAPI", label: (t.funcs || []).find((f) => f.toUpperCase().includes(s))!, sub: t.name, go: () => { openModule(t.mod, "technical"); setTimeout(() => setPanel(t.name), 60); } });
    });
    return out.slice(0, 12);
  }, [q, data]);

  if (!data) return <div className="flex h-[60vh] items-center justify-center text-slate-400" dir="rtl">טוען את ה-Explorer…</div>;

  return (
    <div dir="rtl" className="space-y-3">
      {/* command bar */}
      <header className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-[#d62027] px-2 py-1 font-mono text-xs font-bold text-white">SAP·EAR</span>
            <div><div className="text-base font-bold text-slate-900">SAP Architecture Explorer</div><div className="text-[11px] text-slate-500">Enterprise Architecture Repository · ECC6 → S/4HANA</div></div>
          </div>
          <div className="relative w-full max-w-md">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5">
              <Search className="size-4 text-slate-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש מודול · טבלה · T-Code · BAPI" className="w-full bg-transparent text-sm outline-none" />
              {q && <button onClick={() => setQ("")}><X className="size-3.5 text-slate-400" /></button>}
            </div>
            {results.length > 0 && (
              <div className="absolute z-40 mt-1 max-h-80 w-full overflow-auto rounded-lg border border-slate-200 bg-white shadow-xl">
                {results.map((r, i) => (
                  <button key={i} onClick={() => { r.go(); setQ(""); }} className="flex w-full items-center justify-between gap-2 border-b px-3 py-2 text-right last:border-0 hover:bg-slate-50">
                    <span className="min-w-0"><span className="block truncate font-mono text-sm font-bold text-slate-800">{r.label}</span><span className="block truncate text-xs text-slate-500">{r.sub}</span></span>
                    <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500">{r.type}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* breadcrumb */}
        <div className="mt-2 flex items-center gap-1 text-xs">
          <button onClick={() => setNav({ level: "universe" })} className="flex items-center gap-1 rounded px-1.5 py-0.5 font-semibold text-slate-500 hover:bg-slate-100"><Home className="size-3" /> Universe</button>
          {nav.module && (<><ChevronLeft className="size-3 text-slate-300" /><span className="rounded px-1.5 py-0.5 font-bold text-[#d62027]">{nav.module} · {MOD_NAME_HE[nav.module]}</span></>)}
        </div>
      </header>

      {nav.level === "universe" && <Universe data={data} color={color} onModule={openModule} />}
      {nav.level === "module" && nav.module && <Workspace data={data} color={color} code={nav.module} tab={nav.tab || "overview"} byName={byName}
        setTab={(t) => setNav({ level: "module", module: nav.module, tab: t })} onTable={setPanel} onModule={openModule} />}

      {panel && byName[panel] && <TablePanel data={data} color={color} t={byName[panel]} byName={byName} onClose={() => setPanel(null)} onGo={setPanel} />}

      <DownloadStrip />
      <p className="text-center text-[11px] text-slate-400">נבנה ע״י Sali Halif — Web Coding · NEO Cockpit · CBC Israel · 2026</p>
    </div>
  );
}

/* ============ pan/zoom ============ */
function usePanZoom() {
  const [t, setT] = useState({ x: 0, y: 0, k: 1 });
  const d = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  return {
    t,
    bg: {
      onWheel: (e: React.WheelEvent) => { const f = e.deltaY < 0 ? 1.12 : 1 / 1.12; setT((p) => ({ ...p, k: Math.min(2.6, Math.max(0.35, p.k * f)) })); },
      onPointerDown: (e: React.PointerEvent) => { if ((e.target as Element).closest("[data-card]")) return; d.current = { x: e.clientX, y: e.clientY, ox: t.x, oy: t.y }; },
      onPointerMove: (e: React.PointerEvent) => { if (d.current) setT((p) => ({ ...p, x: d.current!.ox + (e.clientX - d.current!.x), y: d.current!.oy + (e.clientY - d.current!.y) })); },
      onPointerUp: () => { d.current = null; }, onPointerLeave: () => { d.current = null; },
    },
    setT,
    ctrl: { zoomIn: () => setT((p) => ({ ...p, k: Math.min(2.6, p.k * 1.2) })), zoomOut: () => setT((p) => ({ ...p, k: Math.max(0.35, p.k / 1.2) })), reset: () => setT({ x: 0, y: 0, k: 1 }) },
  };
}
function ZoomBar({ ctrl }: { ctrl: { zoomIn: () => void; zoomOut: () => void; reset: () => void } }) {
  return <div className="absolute left-2 top-2 z-10 flex gap-0.5 rounded-lg border border-slate-200 bg-white/95 p-0.5 shadow-sm">
    <button onClick={ctrl.zoomIn} className="rounded p-1.5 text-slate-600 hover:bg-slate-100"><ZoomIn className="size-3.5" /></button>
    <button onClick={ctrl.zoomOut} className="rounded p-1.5 text-slate-600 hover:bg-slate-100"><ZoomOut className="size-3.5" /></button>
    <button onClick={ctrl.reset} className="rounded p-1.5 text-slate-600 hover:bg-slate-100"><Maximize2 className="size-3.5" /></button>
  </div>;
}

/* ============ L1 UNIVERSE ============ */
function Universe({ data, color, onModule }: { data: Data; color: (m?: string | null) => string; onModule: (m: string) => void }) {
  const [hv, setHv] = useState<string | null>(null);
  const { t, bg, ctrl } = usePanZoom();
  const W = 1180, H = 660, cx = W / 2, cy = H / 2, n = UNIVERSE.length, Rx = 430, Ry = 232;
  const pos: Record<string, { x: number; y: number }> = {};
  UNIVERSE.forEach((m, i) => { const a = (-90 + i * (360 / n)) * Math.PI / 180; pos[m] = { x: cx + Rx * Math.cos(a), y: cy + Ry * Math.sin(a) }; });
  const tc = (m: string) => data.tables.filter((x) => x.mod === m).length;
  const pc = (m: string) => data.processes.filter((p) => p.mods.includes(m)).length;
  const conns = data.crossModule.filter((c) => pos[c.from] && pos[c.to]);
  const tw = 138, th = 78;
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
      <ZoomBar ctrl={ctrl} />
      <div className="absolute right-2 top-2 z-10 rounded-md bg-white/90 px-2.5 py-1 text-[11px] font-medium text-slate-500 ring-1 ring-slate-200">רחף על מודול → קשרים · לחץ → כניסה למודול</div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-[64vh] min-h-[480px] w-full touch-none" {...bg}>
        <defs><marker id="ua" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" fill="#94a3b8" /></marker></defs>
        <g transform={`translate(${t.x},${t.y}) scale(${t.k})`}>
          {conns.map((c, i) => { const a = pos[c.from], b = pos[c.to], on = hv === c.from || hv === c.to, mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2 - 34;
            return <path key={i} d={`M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`} fill="none" stroke={on ? color(c.from) : "#cbd5e1"} strokeWidth={on ? 2 : 0.8} strokeOpacity={hv ? (on ? 0.85 : 0.1) : 0.35} markerEnd="url(#ua)" />; })}
          {hv && conns.filter((c) => c.from === hv || c.to === hv).map((c, i) => { const a = pos[c.from], b = pos[c.to]; return <text key={i} x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 38} textAnchor="middle" style={{ font: "600 10px ui-monospace" }} className="fill-slate-500">{c.from}→{c.to}</text>; })}
          <circle cx={cx} cy={cy} r={96} fill="#fff" stroke="#cbb26b" strokeWidth={2} />
          <circle cx={cx} cy={cy} r={96} fill="url(#coreg)" /><defs><radialGradient id="coreg"><stop offset="60%" stopColor="#ffffff" stopOpacity="0" /><stop offset="100%" stopColor="#f5e8c0" stopOpacity="0.5" /></radialGradient></defs>
          <text x={cx} y={cy - 14} textAnchor="middle" style={{ font: "800 22px ui-monospace" }} className="fill-slate-800">SAP CORE</text>
          <text x={cx} y={cy + 8} textAnchor="middle" style={{ font: "600 11px sans-serif" }} className="fill-slate-500">אובייקטים משותפים</text>
          <text x={cx} y={cy + 30} textAnchor="middle" style={{ font: "600 10px ui-monospace" }} className="fill-amber-700">{data.shared.slice(0, 5).map((s) => s.name).join(" · ")}</text>
          {UNIVERSE.map((m) => { const p = pos[m], c = color(m), on = hv === m;
            return <g key={m} data-card transform={`translate(${p.x - tw / 2},${p.y - th / 2})`} className="cursor-pointer" onMouseEnter={() => setHv(m)} onMouseLeave={() => setHv(null)} onClick={() => onModule(m)}>
              <rect width={tw} height={th} rx={8} fill="#fff" stroke={on ? c : "#e2e8f0"} strokeWidth={on ? 2 : 1} style={{ filter: "drop-shadow(0 1px 3px rgba(15,23,42,.08))" }} />
              <rect width={5} height={th} rx={2.5} fill={c} />
              <text x={tw - 12} y={26} textAnchor="end" style={{ font: "800 17px ui-monospace" }} className="fill-slate-900">{m}</text>
              <text x={tw - 12} y={46} textAnchor="end" style={{ font: "500 11px sans-serif" }} className="fill-slate-500">{MOD_NAME_HE[m]}</text>
              <text x={tw - 12} y={66} textAnchor="end" style={{ font: "600 10px ui-monospace" }} fill={c}>{tc(m)} tbl · {pc(m)} proc</text>
            </g>; })}
        </g>
      </svg>
    </div>
  );
}

/* ============ MODULE WORKSPACE ============ */
function Workspace({ data, color, code, tab, byName, setTab, onTable, onModule }: { data: Data; color: (m?: string | null) => string; code: string; tab: string; byName: Record<string, Tbl>; setTab: (t: string) => void; onTable: (t: string) => void; onModule: (m: string) => void }) {
  const c = color(code); const bp = data.blueprints.find((b) => b.code === code);
  const purpose = bp?.purpose || MOD_PURPOSE[code] || "";
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm" style={{ borderInlineStartColor: c, borderInlineStartWidth: 4 }}>
        <div><div className="flex items-center gap-2"><span className="font-mono text-xl font-extrabold text-slate-900">{code}</span><span className="font-semibold text-slate-600">{MOD_NAME_HE[code]}</span></div><p className="mt-0.5 max-w-3xl text-xs text-slate-500">{purpose}</p></div>
        <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
          {TABS.map(([id, label]) => <button key={id} onClick={() => setTab(id)} className={`rounded-md px-3 py-1.5 text-sm font-bold transition ${tab === id ? "bg-white text-[#d62027] shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>{label}</button>)}
        </div>
      </div>
      {tab === "overview" && <Overview data={data} color={color} code={code} bp={bp} onTab={setTab} onModule={onModule} />}
      {tab === "process" && <ProcessFlow data={data} color={color} code={code} />}
      {tab === "document" && <DocFlow data={data} color={color} code={code} onTable={onTable} />}
      {tab === "tables" && <TablesTab data={data} color={color} code={code} onTable={onTable} />}
      {tab === "erd" && <Erd data={data} color={color} code={code} byName={byName} onTable={onTable} />}
      {tab === "technical" && <TechList data={data} color={color} code={code} onTable={onTable} />}
    </div>
  );
}

function Overview({ data, color, code, bp, onTab, onModule }: { data: Data; color: (m?: string | null) => string; code: string; bp?: Bp; onTab: (t: string) => void; onModule: (m: string) => void }) {
  const c = color(code); const tc = data.tables.filter((t) => t.mod === code).length;
  const pc = data.processes.filter((p) => p.mods.includes(code)).length; const dc = data.documents.filter((d) => d.mod === code).length;
  return (
    <div className="grid gap-3 lg:grid-cols-4">
      {[["טבלאות", tc, "erd"], ["מסמכים", dc, "document"], ["תהליכים", pc, "process"], ["BAPIs", data.tables.filter((t) => t.mod === code).reduce((a, t) => a + (t.funcs || []).length, 0), "technical"]].map(([k, v, t]) => (
        <button key={k as string} onClick={() => onTab(t as string)} className="rounded-xl border border-slate-200 bg-white p-4 text-right shadow-sm hover:border-slate-300"><div className="text-2xl font-extrabold text-slate-900">{v}</div><div className="text-xs font-semibold text-slate-500">{k}</div></button>
      ))}
      {bp && [["אובייקטים", bp.objects], ["קלט", bp.inputs], ["פלט", bp.outputs], ["מחובר ל", bp.connects]].map(([t, arr]) => (
        <div key={t as string} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2"><h4 className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: c }}>{t as string}</h4>
          <div className="flex flex-wrap gap-1.5">{(arr as string[]).map((x) => (t === "מחובר ל" ? <button key={x} onClick={() => onModule(x)} className="rounded-md px-2 py-0.5 font-mono text-xs font-bold text-white" style={{ background: color(x) }}>{x}</button> : <span key={x} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">{x}</span>))}</div>
        </div>
      ))}
    </div>
  );
}

function ProcessFlow({ data, color, code }: { data: Data; color: (m?: string | null) => string; code: string }) {
  const c = color(code); const flow = MOD_FLOW[code] || [];
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-bold text-slate-700">זרימה עסקית · {code}</h3>
      <div className="flex flex-wrap items-stretch gap-1.5">
        {flow.map((s, i) => (<div key={i} className="flex items-stretch gap-1.5">
          <div className="flex w-36 flex-col justify-center rounded-lg border bg-slate-50 p-2.5 text-center" style={{ borderColor: c }}><div className="text-sm font-bold text-slate-900">{s.he}</div><div className="font-mono text-[10px] text-slate-500">{s.en}</div></div>
          {i < flow.length - 1 && <div className="self-center font-mono text-slate-300">→</div>}
        </div>))}
      </div>
    </div>
  );
}

function DocFlow({ data, color, code, onTable }: { data: Data; color: (m?: string | null) => string; code: string; onTable: (t: string) => void }) {
  const c = color(code); const docs = data.documents.filter((d) => d.mod === code);
  const list = docs.length ? docs : data.documents.filter((d) => (MOD_FLOW[code] || []).some((s) => s.doc === d.id));
  const [open, setOpen] = useState(list[0]?.id);
  const meta = open ? DOC_META[open] : null; const doc = data.documents.find((d) => d.id === open);
  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_360px]">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-bold text-slate-700">זרימת מסמכים · {code}</h3>
        <div className="flex flex-wrap items-stretch gap-1.5">{list.map((d, i) => (<div key={d.id} className="flex items-stretch gap-1.5">
          <button onClick={() => setOpen(d.id)} className={`w-40 rounded-lg border bg-slate-50 p-2.5 text-center ${open === d.id ? "ring-2 ring-offset-1" : ""}`} style={{ borderColor: c }}><div className="text-sm font-bold text-slate-900">{d.id}</div><div className="text-[11px] text-slate-500">{d.he}</div></button>
          {i < list.length - 1 && <div className="self-center font-mono text-slate-300">→</div>}</div>))}</div>
      </div>
      {meta && doc && <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm" style={{ borderTopColor: c, borderTopWidth: 3 }}>
        <h3 className="font-bold text-slate-900">{open}</h3><p className="mt-1 text-xs text-slate-600">{meta.purpose}</p>
        <Row k="בעלים" v={meta.owner} /><Row k="טרנזקציות" v={meta.tcodes} mono />
        <ListRow k="קלט" a={meta.inputs} /><ListRow k="פלט" a={meta.outputs} />
        <div className="mt-3 border-t pt-2"><div className="mb-1.5 text-[10px] font-bold uppercase text-slate-400">טבלאות</div><div className="flex flex-wrap gap-1">{doc.tables.map((t) => <button key={t} onClick={() => onTable(t)} className="rounded border px-1.5 py-0.5 font-mono text-[11px] font-bold hover:bg-slate-50" style={{ borderColor: c, color: c }}>{t}</button>)}</div></div>
      </div>}
    </div>
  );
}
function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) { return <div className="mt-1.5 flex justify-between gap-2 text-xs"><span className="text-slate-400">{k}</span><span className={`font-semibold text-slate-700 ${mono ? "font-mono" : ""}`}>{v}</span></div>; }
function ListRow({ k, a }: { k: string; a: string[] }) { return <div className="mt-1.5 text-xs"><span className="text-slate-400">{k}: </span><span className="text-slate-700">{a.join(" · ")}</span></div>; }

/* ============ TABLE LAYER ============ */
function TablesTab({ data, color, code, onTable }: { data: Data; color: (m?: string | null) => string; code: string; onTable: (t: string) => void }) {
  const members = erdMembers(data, code);
  return (
    <div className="space-y-2">
      <div className="text-sm font-bold text-slate-700">שכבת טבלאות · {members.length} טבלאות מרכזיות</div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {members.map((t) => { const c = color(t.mod); const flds = fieldsOf(t); const pk = flds.filter((f) => f[3] === "PK").length, fk = flds.filter((f) => f[3] === "FK").length;
          return <button key={t.name} onClick={() => onTable(t.name)} data-card className="overflow-hidden rounded-lg border border-slate-200 bg-white text-right shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between px-3 py-1.5" style={{ background: c }}><span className="font-mono text-sm font-extrabold text-white" dir="ltr">{t.name}</span><span className="text-[10px] font-semibold text-white/85">{t.mod}{t.real ? "" : " ·model"}</span></div>
            <div className="px-3 py-2"><div className="truncate text-xs text-slate-600">{t.he || t.en}</div>
              <div className="mt-1.5 flex gap-1.5 font-mono text-[10px]"><span className="rounded bg-amber-50 px-1.5 py-0.5 font-bold text-amber-700">PK {pk}</span><span className="rounded bg-blue-50 px-1.5 py-0.5 font-bold text-blue-700">FK {fk}</span><span className="rounded bg-slate-100 px-1.5 py-0.5 font-bold text-slate-500">{flds.length} שדות</span><span className="rounded bg-slate-100 px-1.5 py-0.5 font-bold text-slate-500">{t.degree} קשרים</span></div>
            </div>
          </button>; })}
      </div>
    </div>
  );
}

/* ============ ERD CANVAS (premium) ============ */
function cardKind(card: string) { const u = (card || "").toUpperCase(); if (u.includes("N:N") || u.includes("M:N") || u.includes("M:M")) return "N:N"; if (u.replace(/\s/g, "") === "1:1") return "1:1"; return "1:N"; }
const KIND_COLOR: Record<string, string> = { "1:1": "#475569", "1:N": "#2563eb", "N:N": "#dc2626" };

function Erd({ data, color, code, byName, onTable }: { data: Data; color: (m?: string | null) => string; code: string; byName: Record<string, Tbl>; onTable: (t: string) => void }) {
  const shown = erdMembers(data, code);
  const names = new Set(shown.map((t) => t.name));
  const cardW = 216, headH = 36, rowH = 19, secH = 17;
  const cols = Math.min(4, Math.max(2, Math.ceil(Math.sqrt(shown.length))));
  const slotW = cardW + 96, slotH = 420;
  const init: Record<string, { x: number; y: number }> = {};
  shown.forEach((t, i) => { const r = Math.floor(i / cols), cc = i % cols; init[t.name] = { x: 36 + cc * slotW, y: 36 + r * slotH }; });
  const [posns, setPos] = useState(init);
  const [exp, setExp] = useState<Set<string>>(() => new Set(shown.slice(0, 3).map((t) => t.name)));
  const [sel, setSel] = useState<string | null>(null);
  const [hv, setHv] = useState<string | null>(null);
  const { t: zt, bg, setT } = usePanZoom();
  const wrapRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ name: string; x: number; y: number; ox: number; oy: number; moved: boolean } | null>(null);
  useEffect(() => { const ni: Record<string, { x: number; y: number }> = {}; shown.forEach((t, i) => { const r = Math.floor(i / cols), cc = i % cols; ni[t.name] = { x: 36 + cc * slotW, y: 36 + r * slotH }; }); setPos(ni); setExp(new Set(shown.slice(0, 3).map((t) => t.name))); setSel(null); /* eslint-disable-next-line */ }, [code]);

  const groups = (t: Tbl) => { const f = fieldsOf(t); const pk = f.filter((x) => x[3] === "PK"), fk = f.filter((x) => x[3] === "FK"); const tech = f.filter((x) => x[3] !== "PK" && x[3] !== "FK" && TECH_FIELDS.has(x[0])); const biz = f.filter((x) => x[3] !== "PK" && x[3] !== "FK" && !TECH_FIELDS.has(x[0])); return { pk, fk, biz: biz.slice(0, 8), tech: tech.slice(0, 3) }; };
  const cardH = (t: Tbl) => { if (!exp.has(t.name)) return 58; const g = groups(t); let h = headH + 10; [g.pk, g.fk, g.biz, g.tech].forEach((arr) => { if (arr.length) h += secH + arr.length * rowH + 4; }); return h + 6; };

  const links: { a: string; b: string; card: string }[] = [];
  shown.forEach((t) => t.rel.forEach((r) => { if (names.has(r.table)) { const a = r.role === "parent" ? t.name : r.table, b = r.role === "parent" ? r.table : t.name; if (!links.find((l) => l.a === a && l.b === b)) links.push({ a, b, card: r.card || "1:N" }); } }));
  const neighbors = (nm: string) => { const s = new Set<string>([nm]); links.forEach((l) => { if (l.a === nm) s.add(l.b); if (l.b === nm) s.add(l.a); }); return s; };
  const active = sel ? neighbors(sel) : null;

  const rows = Math.ceil(shown.length / cols);
  const vbW = Math.max(60 + cols * slotW, 800), vbH = Math.max(60 + rows * slotH, 480);
  const onCardDown = (e: React.PointerEvent, name: string) => { e.stopPropagation(); const p = posns[name]; drag.current = { name, x: e.clientX, y: e.clientY, ox: p.x, oy: p.y, moved: false }; };
  const onMove = (e: React.PointerEvent) => { if (!drag.current) { bg.onPointerMove(e); return; } const d = drag.current; if (Math.abs(e.clientX - d.x) + Math.abs(e.clientY - d.y) > 3) d.moved = true; setPos((p) => ({ ...p, [d.name]: { x: d.ox + (e.clientX - d.x) / zt.k, y: d.oy + (e.clientY - d.y) / zt.k } })); };
  const onUp = () => { drag.current = null; bg.onPointerUp(); };
  const cardClick = (name: string) => { if (drag.current?.moved) return; setSel(name); onTable(name); };

  const fit = () => { const xs = shown.map((t) => posns[t.name].x), ys = shown.map((t) => posns[t.name].y); const x0 = Math.min(...xs) - 30, y0 = Math.min(...ys) - 30; const x1 = Math.max(...shown.map((t) => posns[t.name].x + cardW)) + 30, y1 = Math.max(...shown.map((t) => posns[t.name].y + cardH(t))) + 30; const k = Math.min(vbW / (x1 - x0), vbH / (y1 - y0), 1.4); setT({ k, x: -x0 * k + (vbW - (x1 - x0) * k) / 2, y: -y0 * k }); };
  const fullscreen = () => { const el = wrapRef.current; if (!el) return; if (document.fullscreenElement) document.exitFullscreen(); else el.requestFullscreen?.(); };

  // minimap viewport (content coords visible)
  const vx = -zt.x / zt.k, vy = -zt.y / zt.k, vw = vbW / zt.k, vh = vbH / zt.k;
  const miniK = Math.min(168 / vbW, 116 / vbH);

  return (
    <div className="space-y-2">
      <style>{`@keyframes erdflow{to{stroke-dashoffset:-24}} .erd-flow{stroke-dasharray:7 5;animation:erdflow .8s linear infinite}`}</style>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-slate-700">ERD · {code} · {shown.length} טבלאות מחוברות</h3>
        <div className="flex items-center gap-1">
          <button onClick={() => setExp(new Set(shown.map((t) => t.name)))} className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-slate-600 hover:border-slate-300"><Expand className="size-3" /> הרחב הכל</button>
          <button onClick={() => setExp(new Set())} className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-slate-600 hover:border-slate-300"><Shrink className="size-3" /> כווץ</button>
          <button onClick={fit} className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-slate-600 hover:border-slate-300"><Scan className="size-3" /> התאם</button>
          <button onClick={fullscreen} className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-slate-600 hover:border-slate-300"><Maximize2 className="size-3" /> מסך מלא</button>
        </div>
      </div>
      <div ref={wrapRef} className="relative overflow-hidden rounded-xl border border-slate-200 bg-white" style={{ backgroundImage: "radial-gradient(#e7edf3 1px,transparent 1px)", backgroundSize: "22px 22px" }}>
        <div className="absolute right-2 top-2 z-10 flex gap-2 text-[10px] font-bold">
          <span className="rounded bg-white/90 px-2 py-0.5 ring-1 ring-slate-200" style={{ color: KIND_COLOR["1:1"] }}>1:1</span>
          <span className="rounded bg-white/90 px-2 py-0.5 ring-1 ring-slate-200" style={{ color: KIND_COLOR["1:N"] }}>1:N</span>
          <span className="rounded bg-white/90 px-2 py-0.5 ring-1 ring-slate-200" style={{ color: KIND_COLOR["N:N"] }}>N:N</span>
        </div>
        <svg viewBox={`0 0 ${vbW} ${vbH}`} className="h-[68vh] min-h-[500px] w-full touch-none" onWheel={bg.onWheel} onPointerDown={(e) => { bg.onPointerDown(e); if (!(e.target as Element).closest("[data-card]")) setSel(null); }} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}>
          <g transform={`translate(${zt.x},${zt.y}) scale(${zt.k})`}>
            {links.map((l, i) => { const A = posns[l.a], B = posns[l.b], TA = byName[l.a]; if (!A || !B || !TA) return null;
              const ax = A.x + cardW / 2, ay = A.y + cardH(TA), bx = B.x + cardW / 2, by = B.y, my = (ay + by) / 2;
              const kind = cardKind(l.card), kc = KIND_COLOR[kind];
              const onSel = active ? (active.has(l.a) && active.has(l.b) && (l.a === sel || l.b === sel)) : false;
              const onHv = hv ? (l.a === hv || l.b === hv) : false;
              const dim = active && !onSel; const emph = onSel || onHv;
              return <g key={i} opacity={dim ? 0.12 : 1}>
                <path d={`M${ax},${ay} C${ax},${my} ${bx},${my} ${bx},${by}`} fill="none" stroke={emph ? kc : "#94a3b8"} strokeWidth={emph ? 2.4 : 1.3} className={onSel ? "erd-flow" : ""} />
                <line x1={ax - 7} y1={ay + 4} x2={ax + 7} y2={ay + 4} stroke={emph ? kc : "#94a3b8"} strokeWidth={emph ? 2.4 : 1.3} />
                <path d={`M${bx - 6},${by - 9} L${bx},${by} M${bx + 6},${by - 9} L${bx},${by} M${bx},${by - 11} L${bx},${by}`} stroke={emph ? kc : "#94a3b8"} strokeWidth={emph ? 2.4 : 1.3} fill="none" />
                <rect x={(ax + bx) / 2 - 17} y={my - 9} width={34} height={18} rx={4} fill={emph ? kc : "#334155"} /><text x={(ax + bx) / 2} y={my + 4} textAnchor="middle" style={{ font: "700 10px ui-monospace" }} className="fill-white">{kind}</text>
              </g>; })}
            {shown.map((t) => { const p = posns[t.name]; const c = color(t.mod); const ch = cardH(t); const isExp = exp.has(t.name); const g = groups(t); const dim = active && !active.has(t.name); const isSel = sel === t.name;
              let yy = headH + 8;
              const section = (label: string, arr: [string, string, string, string][], cls: string, badge?: string) => { if (!arr.length) return null; const sy = yy; yy += secH; const rowsY = yy; yy += arr.length * rowH + 4;
                return <g key={label}><text x={cardW - 10} y={sy + 12} textAnchor="end" style={{ font: "700 9px sans-serif" }} className="fill-slate-400">{label}</text>
                  {arr.map((f, j) => { const ry = rowsY + j * rowH; return <g key={f[0]} transform={`translate(0,${ry})`}><rect x={1} width={cardW - 2} height={rowH} fill={j % 2 ? "#f8fafc" : "#fff"} />
                    <text x={10} y={14} direction="ltr" style={{ font: `${badge === "PK" ? 700 : 500} 11px ui-monospace`, textDecoration: badge === "PK" ? "underline" : "none" }} className={cls}>{f[0]}</text>
                    {badge && <text x={cardW - 9} y={14} textAnchor="end" style={{ font: "700 8px ui-monospace" }} className={cls}>{badge}</text>}
                    {!badge && f[2] && <text x={cardW - 9} y={14} textAnchor="end" style={{ font: "500 9px sans-serif" }} className="fill-slate-400">{f[2].length > 14 ? f[2].slice(0, 13) + "…" : f[2]}</text>}
                  </g>; })}</g>; };
              return <g key={t.name} data-card transform={`translate(${p.x},${p.y})`} opacity={dim ? 0.18 : 1} className="cursor-pointer"
                onPointerDown={(e) => onCardDown(e, t.name)} onClick={() => cardClick(t.name)} onMouseEnter={() => setHv(t.name)} onMouseLeave={() => setHv(null)}>
                <rect width={cardW} height={ch} rx={9} fill="#fff" stroke={isSel ? "#d62027" : c} strokeWidth={isSel ? 2.5 : 1.3} style={{ filter: isSel ? "drop-shadow(0 6px 16px rgba(214,32,39,.22))" : "drop-shadow(0 2px 6px rgba(15,23,42,.12))" }} />
                <path d={`M0,9 a9,9 0 0 1 9,-9 h${cardW - 18} a9,9 0 0 1 9,9 v${headH - 9} h-${cardW} z`} fill={c} />
                <text x={11} y={17} style={{ font: "800 13px ui-monospace" }} className="fill-white" direction="ltr">{t.name}</text>
                <text x={11} y={30} style={{ font: "500 9px sans-serif" }} className="fill-white/90">{(t.he || t.en).slice(0, 24)}</text>
                <g onPointerDown={(e) => { e.stopPropagation(); }} onClick={(e) => { e.stopPropagation(); setExp((s) => { const n = new Set(s); n.has(t.name) ? n.delete(t.name) : n.add(t.name); return n; }); }}>
                  <rect x={cardW - 26} y={8} width={18} height={18} rx={4} fill="#ffffff35" /><text x={cardW - 17} y={21} textAnchor="middle" style={{ font: "800 13px sans-serif" }} className="fill-white">{isExp ? "−" : "+"}</text>
                </g>
                {!isExp && <text x={cardW / 2} y={50} textAnchor="middle" style={{ font: "600 10px ui-monospace" }} className="fill-slate-500">{g.pk.length} PK · {g.fk.length} FK · {fieldsOf(t).length} שדות</text>}
                {isExp && <>
                  {section("PRIMARY KEY", g.pk, "fill-amber-700", "PK")}
                  {section("FOREIGN KEYS", g.fk, "fill-blue-700", "FK")}
                  {section("BUSINESS", g.biz, "fill-slate-700")}
                  {section("TECHNICAL", g.tech, "fill-slate-400")}
                </>}
              </g>; })}
          </g>
        </svg>
        {/* minimap */}
        <div className="absolute bottom-2 left-2 z-10 rounded-md border border-slate-200 bg-white/95 p-1 shadow-sm">
          <svg width={172} height={120} className="block">
            <g transform={`scale(${miniK})`}>
              {shown.map((t) => { const p = posns[t.name]; return <rect key={t.name} x={p.x} y={p.y} width={cardW} height={cardH(t)} rx={6} fill={color(t.mod)} opacity={0.5} />; })}
              <rect x={vx} y={vy} width={vw} height={vh} fill="none" stroke="#d62027" strokeWidth={6 / miniK} />
            </g>
          </svg>
        </div>
      </div>
      <p className="text-[11px] text-slate-400">גרור כרטיס · לחיצה על כרטיס → פאנל מלא · + / − הרחבה · בחירת טבלה מדגישה את הקשרים ומעמעמת את השאר · גלגלת = זום</p>
    </div>
  );
}

/* ============ TECHNICAL LIST ============ */
function TechList({ data, color, code, onTable }: { data: Data; color: (m?: string | null) => string; code: string; onTable: (t: string) => void }) {
  const list = erdMembers(data, code);
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-right text-sm">
        <thead className="bg-slate-50 text-[11px] uppercase text-slate-400"><tr><th className="px-3 py-2 font-semibold">טבלה</th><th className="px-3 py-2 font-semibold">תיאור</th><th className="px-3 py-2 font-semibold">PK</th><th className="px-3 py-2 font-semibold">קשרים</th><th className="px-3 py-2 font-semibold">T-Codes</th></tr></thead>
        <tbody>{list.map((t) => (
          <tr key={t.name} onClick={() => onTable(t.name)} className="cursor-pointer border-t border-slate-100 hover:bg-slate-50">
            <td className="px-3 py-2"><span className="font-mono font-bold" style={{ color: color(t.mod) }}>{t.name}</span></td>
            <td className="px-3 py-2 text-slate-600">{t.he || t.en}</td>
            <td className="px-3 py-2 font-mono text-xs text-amber-700">{t.pk.join(", ") || "—"}</td>
            <td className="px-3 py-2 text-slate-500">{t.degree}</td>
            <td className="px-3 py-2 font-mono text-xs text-slate-500">{t.tcodes || "—"}</td>
          </tr>))}</tbody>
      </table>
    </div>
  );
}

/* ============ TABLE SIDE PANEL ============ */
function TablePanel({ data, color, t, byName, onClose, onGo }: { data: Data; color: (m?: string | null) => string; t: Tbl; byName: Record<string, Tbl>; onClose: () => void; onGo: (n: string) => void }) {
  const c = color(t.mod);
  const flds = fieldsOf(t);
  const pk = flds.filter((f) => f[3] === "PK").map((f) => f[0]);
  const fk = flds.filter((f) => f[3] === "FK").map((f) => f[0]);
  const parents = t.rel.filter((r) => r.role === "child").map((r) => r.table);
  const children = t.rel.filter((r) => r.role === "parent").map((r) => r.table);
  const whereUsed = data.tables.filter((x) => x.rel.some((r) => r.table === t.name)).map((x) => x.name);
  const ex = genExampleRecords(flds, t.name);
  const bp = data.blueprints.find((b) => b.code === t.mod);
  const S = ({ title, children: ch }: { title: string; children: React.ReactNode }) => <section className="border-t border-slate-100 px-4 py-3"><h4 className="mb-1.5 text-[10px] font-bold uppercase tracking-wide" style={{ color: c }}>{title}</h4>{ch}</section>;
  const Pills = ({ a, click }: { a: string[]; click?: boolean }) => a.length ? <div className="flex flex-wrap gap-1">{a.map((x) => click && byName[x] ? <button key={x} onClick={() => onGo(x)} className="rounded border px-1.5 py-0.5 font-mono text-[11px] font-bold hover:bg-slate-50" style={{ borderColor: c, color: c }}>{x}</button> : <span key={x} className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-600">{x}</span>)}</div> : <span className="text-[11px] italic text-slate-400">—</span>;
  return (
    <div className="fixed inset-0 z-50 flex" dir="rtl">
      <div className="flex-1 bg-slate-900/40" onClick={onClose} />
      <div className="h-full w-full max-w-[440px] overflow-auto bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white px-4 py-3">
          <div><div className="flex items-center gap-2"><span className="font-mono text-xl font-extrabold text-slate-900" dir="ltr">{t.name}</span><span className="rounded px-1.5 py-0.5 text-[10px] font-bold text-white" style={{ background: c }}>{t.mod}</span><span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">{t.real ? "בחילוץ" : "מודל"}</span></div><p className="mt-1 text-xs text-slate-600">{t.he || t.en}</p></div>
          <button onClick={onClose} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100"><X className="size-4" /></button>
        </div>
        <S title="מטרה עסקית">{<p className="text-xs leading-relaxed text-slate-600">{bp?.purpose || `טבלת ${t.mod} — ${t.he || t.en}`}</p>}</S>
        <S title={`שדות · Fields (${flds.length})`}><table className="w-full text-right font-mono text-[11px]" dir="ltr"><tbody>{flds.slice(0, 20).map((f) => <tr key={f[0]} className="border-b border-slate-50 last:border-0"><td className={`py-0.5 ${f[3] === "PK" ? "font-bold text-amber-700 underline" : f[3] === "FK" ? "text-blue-700" : "text-slate-700"}`}>{f[0]}</td><td className="py-0.5 text-slate-400">{f[1]}</td><td className="py-0.5 text-left">{f[3] !== "-" && <span className={`rounded px-1 text-[9px] font-bold ${f[3] === "PK" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>{f[3]}</span>}</td></tr>)}</tbody></table></S>
        <div className="grid grid-cols-2"><S title="מפתח ראשי · PK"><div className="flex items-center gap-1"><KeyRound className="size-3 text-amber-600" /><Pills a={pk} /></div></S><S title="מפתחות זרים · FK"><div className="flex items-center gap-1"><Link2 className="size-3 text-blue-600" /><Pills a={fk} /></div></S></div>
        <S title="טבלאות אב"><Pills a={[...new Set(parents)]} click /></S>
        <S title="טבלאות צאצא"><Pills a={[...new Set(children)]} click /></S>
        <S title="Where-Used"><Pills a={[...new Set(whereUsed)]} click /></S>
        <S title="טרנזקציות"><span className="font-mono text-xs text-slate-700">{t.tcodes || "—"}</span></S>
        <S title="דוחות עיקריים"><Pills a={MOD_REPORTS[t.mod] || []} /></S>
        <S title="BAPIs / FM"><Pills a={(t.funcs || []).slice(0, 6)} /></S>
        <S title="CDS Views (S/4)"><Pills a={t.cds || []} /></S>
        {t.fiori && <S title="Fiori"><span className="text-xs text-slate-700">{t.fiori}</span></S>}
        <S title="ECC → S/4HANA"><p className="text-xs text-slate-600">{t.s4 || "אין שינוי מהותי."}</p>{t.s4alt && <p className="mt-0.5 text-[11px]">חלופה: <span className="font-mono font-bold text-slate-700">{t.s4alt}</span></p>}</S>
        <S title="רשומות לדוגמה · Example Records">
          <div className="overflow-auto rounded border border-slate-200"><table className="w-full text-left font-mono text-[10.5px]" dir="ltr"><thead className="bg-slate-50"><tr>{ex.cols.map((c2) => <th key={c2} className="px-2 py-1 font-bold text-slate-500">{c2}</th>)}</tr></thead><tbody>{ex.rows.map((r, i) => <tr key={i} className="border-t border-slate-100">{r.map((v, j) => <td key={j} className="px-2 py-1 text-slate-700">{v}</td>)}</tr>)}</tbody></table></div>
          <p className="mt-1 text-[10px] italic text-slate-400">נתוני הדגמה סינתטיים</p>
        </S>
      </div>
    </div>
  );
}

/* ============ downloads ============ */
function DownloadStrip() {
  const items = [["SAP-Enterprise-Architecture-A0.pdf", "פוסטר PDF"], ["SAP-Enterprise-Architecture-A0.png", "PNG"], ["SAP-Enterprise-Architecture-A0.svg", "SVG"], ["dataset.json", "JSON"]];
  return <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-2.5"><span className="flex items-center gap-1 px-1 text-xs font-bold text-slate-500"><Download className="size-3.5" /> הורדות:</span>{items.map(([f, l]) => <a key={f} href={`${BASE}/${f}`} download className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:border-[#d62027]">{l}</a>)}</div>;
}
