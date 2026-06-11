"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Search, ChevronLeft, Home, ZoomIn, ZoomOut, Maximize2, X, Download, KeyRound, Link2 } from "lucide-react";
import { MOD_PURPOSE, MOD_FLOW, DOC_META, MOD_REPORTS, genExampleRecords } from "./meta";

const BASE = "/sap-infrastructure";

type Field = [string, string, string, string];
type Rel = { role: "parent" | "child"; table: string; card: string; desc: string };
type Tbl = { name: string; mod: string; real: boolean; he: string; en: string; tcodes: string; fiori: string; s4: string; s4alt: string; pk: string[]; fields: Field[]; funcs: string[]; cds: string[]; rel: Rel[]; degree: number; zone: string };
type Bp = { code: string; purpose: string; objects: string[]; docs: string[]; tables: string[]; inputs: string[]; outputs: string[]; connects: string[] };
type Data = { meta: { counts: Record<string, number> }; palette: Record<string, string>; modules: { code: string; name: string; he: string }[]; blueprints: Bp[]; processes: { id: string; name: string; he: string; mods: string[]; docs: string[]; color: string }[]; documents: { id: string; he: string; mod: string; tables: string[] }[]; tables: Tbl[]; shared: { name: string; he: string }[]; crossModule: { from: string; to: string; he: string }[] };

const UNIVERSE = ["MM", "SD", "PP", "PP-PI", "PM", "QM", "CS", "FI", "CO", "BATCH", "CLASS", "IDOC", "PIPO"];
const MOD_NAME_HE: Record<string, string> = { MM: "ניהול חומרים", SD: "מכירות והפצה", PP: "תכנון ייצור", "PP-PI": "ייצור תהליכי", PM: "תחזוקת מפעל", QM: "ניהול איכות", CS: "שירות לקוחות", FI: "הנהלת חשבונות", CO: "בקרת עלויות", BATCH: "ניהול אצוות", CLASS: "מערכת סיווג", IDOC: "מסגרת IDOC/ALE", PIPO: "ממשקי PI/PO" };
const TABS = [["overview", "סקירה"], ["process", "תהליך"], ["document", "מסמכים"], ["erd", "ERD"], ["technical", "טכני"]] as const;

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

/* ============ ERD ============ */
function Erd({ data, color, code, byName, onTable }: { data: Data; color: (m?: string | null) => string; code: string; byName: Record<string, Tbl>; onTable: (t: string) => void }) {
  const all = data.tables.filter((t) => t.mod === code).sort((a, b) => b.degree - a.degree);
  const shown = all.slice(0, 16); const extra = all.length - shown.length;
  const names = new Set(shown.map((t) => t.name));
  const cardW = 188, headH = 30, rowH = 21, maxRows = 8;
  const cols = Math.min(4, Math.ceil(Math.sqrt(shown.length)));
  const colGap = 90, rowGap = 64;
  const init: Record<string, { x: number; y: number }> = {};
  shown.forEach((t, i) => { const r = Math.floor(i / cols), cc = i % cols; init[t.name] = { x: 30 + cc * (cardW + colGap), y: 28 + r * (headH + Math.min(t.fields.length, maxRows) * rowH + 16 + rowGap) }; });
  const [posns, setPos] = useState(init);
  useEffect(() => { setPos(init); /* eslint-disable-next-line */ }, [code]);
  const { t: zt, bg, ctrl } = usePanZoom();
  const drag = useRef<{ name: string; x: number; y: number; ox: number; oy: number } | null>(null);
  const cardH = (t: Tbl) => headH + Math.min(t.fields.length, maxRows) * rowH + 14;
  const links: { a: string; b: string; card: string }[] = [];
  shown.forEach((t) => t.rel.forEach((r) => { if (names.has(r.table)) { const a = r.role === "parent" ? t.name : r.table, b = r.role === "parent" ? r.table : t.name; if (!links.find((l) => l.a === a && l.b === b)) links.push({ a, b, card: r.card || "1:N" }); } }));
  const rows = Math.ceil(shown.length / cols);
  const W = 60 + cols * (cardW + colGap), H = 60 + rows * (headH + maxRows * rowH + 16 + rowGap);
  const onCardDown = (e: React.PointerEvent, name: string) => { e.stopPropagation(); const p = posns[name]; drag.current = { name, x: e.clientX, y: e.clientY, ox: p.x, oy: p.y }; };
  const onMove = (e: React.PointerEvent) => { if (!drag.current) { bg.onPointerMove(e); return; } const d = drag.current; setPos((p) => ({ ...p, [d.name]: { x: d.ox + (e.clientX - d.x) / zt.k, y: d.oy + (e.clientY - d.y) / zt.k } })); };
  const onUp = () => { drag.current = null; bg.onPointerUp(); };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between"><h3 className="text-sm font-bold text-slate-700">ERD · {code} · {shown.length} טבלאות{extra > 0 ? ` (מתוך ${all.length})` : ""}</h3><span className="text-[11px] text-slate-400">גרור כרטיס · לחץ → פאנל מלא · גלגלת = זום</span></div>
      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white" style={{ backgroundImage: "linear-gradient(#eef2f6 1px,transparent 1px),linear-gradient(90deg,#eef2f6 1px,transparent 1px)", backgroundSize: "24px 24px" }}>
        <ZoomBar ctrl={ctrl} />
        <svg viewBox={`0 0 ${Math.max(W, 760)} ${Math.max(H, 460)}`} className="h-[66vh] min-h-[480px] w-full touch-none" onWheel={bg.onWheel} onPointerDown={bg.onPointerDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}>
          <g transform={`translate(${zt.x},${zt.y}) scale(${zt.k})`}>
            {links.map((l, i) => { const A = posns[l.a], B = posns[l.b], TA = byName[l.a], TB = byName[l.b]; if (!A || !B) return null;
              const ax = A.x + cardW / 2, ay = A.y + cardH(TA), bx = B.x + cardW / 2, by = B.y, my = (ay + by) / 2;
              return <g key={i}>
                <path d={`M${ax},${ay} C${ax},${my} ${bx},${my} ${bx},${by}`} fill="none" stroke="#64748b" strokeWidth={1.4} />
                {/* one (parent) tick */}<line x1={ax - 7} y1={ay + 5} x2={ax + 7} y2={ay + 5} stroke="#64748b" strokeWidth={1.4} />
                {/* many (child) crow's foot */}<path d={`M${bx - 6},${by - 9} L${bx},${by} M${bx + 6},${by - 9} L${bx},${by} M${bx},${by - 11} L${bx},${by}`} stroke="#64748b" strokeWidth={1.4} fill="none" />
                <rect x={(ax + bx) / 2 - 16} y={my - 9} width={32} height={17} rx={4} fill="#1e293b" /><text x={(ax + bx) / 2} y={my + 3} textAnchor="middle" style={{ font: "700 10px ui-monospace" }} className="fill-white">{l.card}</text>
              </g>; })}
            {shown.map((t) => { const p = posns[t.name]; const c = color(t.mod); const ch = cardH(t);
              return <g key={t.name} data-card transform={`translate(${p.x},${p.y})`} className="cursor-pointer" onPointerDown={(e) => onCardDown(e, t.name)} onClick={() => onTable(t.name)}>
                <rect width={cardW} height={ch} rx={6} fill="#fff" stroke={c} strokeWidth={1.4} style={{ filter: "drop-shadow(0 1px 3px rgba(15,23,42,.10))" }} />
                <path d={`M0,6 a6,6 0 0 1 6,-6 h${cardW - 12} a6,6 0 0 1 6,6 v${headH - 6} h-${cardW} z`} fill={c} />
                <text x={10} y={20} style={{ font: "800 13px ui-monospace" }} className="fill-white" direction="ltr">{t.name}</text>
                <text x={cardW - 8} y={20} textAnchor="end" style={{ font: "600 9px sans-serif" }} className="fill-white/85">{t.mod}{t.real ? "" : " ·model"}</text>
                {t.fields.slice(0, maxRows).map((f, j) => { const y = headH + j * rowH; const pk = f[3] === "PK", fk = f[3] === "FK";
                  return <g key={f[0]} transform={`translate(0,${y})`}>
                    <rect x={1} y={0} width={cardW - 2} height={rowH} fill={j % 2 ? "#f8fafc" : "#fff"} />
                    <text x={10} y={15} direction="ltr" style={{ font: `${pk ? 700 : 500} 11px ui-monospace`, textDecoration: pk ? "underline" : "none" }} className={pk ? "fill-amber-700" : fk ? "fill-blue-700" : "fill-slate-700"}>{f[0]}</text>
                    {(pk || fk) && <text x={cardW - 8} y={15} textAnchor="end" style={{ font: "700 8.5px ui-monospace" }} className={pk ? "fill-amber-700" : "fill-blue-700"}>{f[3]}</text>}
                  </g>; })}
                {t.fields.length > maxRows && <text x={cardW / 2} y={ch - 4} textAnchor="middle" style={{ font: "600 9px sans-serif" }} className="fill-slate-400">+{t.fields.length - maxRows} שדות</text>}
              </g>; })}
          </g>
        </svg>
      </div>
    </div>
  );
}

/* ============ TECHNICAL LIST ============ */
function TechList({ data, color, code, onTable }: { data: Data; color: (m?: string | null) => string; code: string; onTable: (t: string) => void }) {
  const list = data.tables.filter((t) => t.mod === code).sort((a, b) => b.degree - a.degree);
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
  const pk = t.fields.filter((f) => f[3] === "PK").map((f) => f[0]);
  const fk = t.fields.filter((f) => f[3] === "FK").map((f) => f[0]);
  const parents = t.rel.filter((r) => r.role === "child").map((r) => r.table);
  const children = t.rel.filter((r) => r.role === "parent").map((r) => r.table);
  const whereUsed = data.tables.filter((x) => x.rel.some((r) => r.table === t.name)).map((x) => x.name);
  const ex = genExampleRecords(t.fields, t.name);
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
        <S title="שדות · Fields"><table className="w-full text-right font-mono text-[11px]" dir="ltr"><tbody>{t.fields.map((f) => <tr key={f[0]} className="border-b border-slate-50 last:border-0"><td className={`py-0.5 ${f[3] === "PK" ? "font-bold text-amber-700 underline" : f[3] === "FK" ? "text-blue-700" : "text-slate-700"}`}>{f[0]}</td><td className="py-0.5 text-slate-400">{f[1]}</td><td className="py-0.5 text-left">{f[3] !== "-" && <span className={`rounded px-1 text-[9px] font-bold ${f[3] === "PK" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>{f[3]}</span>}</td></tr>)}</tbody></table></S>
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
