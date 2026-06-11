"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  Search, ChevronLeft, Home, ZoomIn, ZoomOut, Maximize2, X, Download,
  ArrowDown, KeyRound, Link2, Boxes,
} from "lucide-react";
import { MOD_ICON, MOD_PURPOSE, MOD_FLOW, DOC_META } from "./meta";

const BASE = "/sap-infrastructure";

type Field = [string, string, string, string];
type Rel = { role: "parent" | "child"; table: string; card: string; desc: string };
type Tbl = {
  name: string; mod: string; real: boolean; he: string; en: string; tcodes: string;
  fiori: string; s4: string; s4alt: string; pk: string[]; fields: Field[]; funcs: string[];
  cds: string[]; rel: Rel[]; degree: number; zone: string;
};
type Bp = { code: string; purpose: string; objects: string[]; docs: string[]; tables: string[]; inputs: string[]; outputs: string[]; connects: string[] };
type Data = {
  meta: { counts: Record<string, number> };
  palette: Record<string, string>;
  modules: { code: string; name: string; he: string; kind: string }[];
  blueprints: Bp[];
  processes: { id: string; name: string; he: string; mods: string[]; docs: string[]; color: string }[];
  documents: { id: string; he: string; mod: string; tables: string[] }[];
  tables: Tbl[];
  shared: { name: string; he: string; mods: string[] }[];
  crossModule: { from: string; to: string; he: string }[];
};

// 13 universe tiles (12 modules + PI/PO)
const UNIVERSE = ["MM", "SD", "PP", "PP-PI", "PM", "QM", "CS", "FI", "CO", "BATCH", "CLASS", "IDOC", "PIPO"];
const MOD_NAME_HE: Record<string, string> = {
  MM: "ניהול חומרים", SD: "מכירות והפצה", PP: "תכנון ייצור", "PP-PI": "ייצור תהליכי", PM: "תחזוקת מפעל",
  QM: "ניהול איכות", CS: "שירות לקוחות", FI: "הנהלת חשבונות", CO: "בקרת עלויות",
  BATCH: "ניהול אצוות", CLASS: "מערכת סיווג", IDOC: "מסגרת IDOC/ALE", PIPO: "ממשקי PI/PO",
};

export default function Page() {
  const [data, setData] = useState<Data | null>(null);
  const [nav, setNav] = useState<{ level: string; module?: string; doc?: string; table?: string }>({ level: "universe" });
  const [q, setQ] = useState("");

  useEffect(() => { fetch(`${BASE}/dataset.json`).then((r) => r.json()).then(setData).catch(() => {}); }, []);

  const color = useCallback((m?: string | null) => (data && m && data.palette[m]) || "#64748b", [data]);
  const byName = useMemo(() => (data ? Object.fromEntries(data.tables.map((t) => [t.name, t])) : {}) as Record<string, Tbl>, [data]);
  const purposeOf = useCallback((code: string) => data?.blueprints.find((b) => b.code === code)?.purpose || MOD_PURPOSE[code] || "", [data]);

  const searchResults = useMemo(() => {
    if (!data || q.trim().length < 1) return [] as { type: string; label: string; sub: string; go: () => void }[];
    const s = q.trim().toUpperCase();
    const out: { type: string; label: string; sub: string; go: () => void }[] = [];
    UNIVERSE.forEach((m) => { if (m.includes(s) || MOD_NAME_HE[m]?.includes(q)) out.push({ type: "מודול", label: m, sub: MOD_NAME_HE[m], go: () => setNav({ level: "module", module: m }) }); });
    data.tables.forEach((t) => {
      if (t.name.includes(s) || (t.he || "").includes(q)) out.push({ type: "טבלה", label: t.name, sub: `${t.mod} · ${t.he || t.en}`, go: () => setNav({ level: "erd", module: t.mod, table: t.name }) });
      else if ((t.tcodes || "").toUpperCase().includes(s)) out.push({ type: "T-Code", label: t.tcodes, sub: t.name, go: () => setNav({ level: "technical", module: t.mod, table: t.name }) });
      else if ((t.funcs || []).some((f) => f.toUpperCase().includes(s))) out.push({ type: "BAPI", label: (t.funcs || []).find((f) => f.toUpperCase().includes(s))!, sub: t.name, go: () => setNav({ level: "technical", module: t.mod, table: t.name }) });
    });
    data.processes.forEach((p) => { if (p.name.toUpperCase().includes(s) || p.he.includes(q)) out.push({ type: "תהליך", label: p.name, sub: p.he, go: () => setNav({ level: "universe" }) }); });
    return out.slice(0, 12);
  }, [q, data]);

  if (!data) return <div className="flex h-[60vh] items-center justify-center text-slate-400" dir="rtl">טוען את ה-Explorer…</div>;

  const crumbs = [
    { label: "SAP Universe", lvl: "universe" as const, on: () => setNav({ level: "universe" }) },
    ...(nav.module ? [{ label: nav.module, lvl: "module", on: () => setNav({ level: "module", module: nav.module }) }] : []),
    ...(nav.doc ? [{ label: DOC_META[nav.doc] ? nav.doc : nav.doc, lvl: "document", on: () => setNav({ level: "document", module: nav.module, doc: nav.doc }) }] : []),
    ...(nav.level === "erd" || nav.level === "technical" ? [{ label: nav.table ? `ERD: ${nav.module}` : `ERD`, lvl: "erd", on: () => setNav({ level: "erd", module: nav.module, table: nav.table }) }] : []),
    ...(nav.level === "technical" && nav.table ? [{ label: `טכני: ${nav.table}`, lvl: "technical", on: () => {} }] : []),
  ];

  return (
    <div dir="rtl" className="space-y-4">
      {/* HERO */}
      <header className="rounded-2xl border border-slate-200 bg-gradient-to-l from-white to-slate-50 p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">SAP Architecture Explorer · תשתית SAP</h1>
            <p className="mt-1 text-sm text-slate-500">צלול מ-Universe → מודול → תהליך → מסמך → טבלה → PK/FK. ארכיטקטורה קודם.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[["מודולים", data.meta.counts.modules], ["טבלאות", data.meta.counts.tables], ["מסמכים", data.meta.counts.documents], ["תהליכים", data.meta.counts.processes]].map(([k, v]) => (
              <div key={k as string} className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-center"><div className="text-lg font-extrabold text-slate-900">{v}</div><div className="text-[10px] font-semibold uppercase text-slate-400">{k}</div></div>
            ))}
          </div>
        </div>
        {/* search */}
        <div className="relative mt-4">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
            <Search className="size-4 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש מודול · טבלה · T-Code · BAPI · תהליך…" className="w-full bg-transparent text-sm outline-none" />
            {q && <button onClick={() => setQ("")}><X className="size-4 text-slate-400" /></button>}
          </div>
          {searchResults.length > 0 && (
            <div className="absolute z-30 mt-1 max-h-80 w-full overflow-auto rounded-xl border border-slate-200 bg-white shadow-xl">
              {searchResults.map((r, i) => (
                <button key={i} onClick={() => { r.go(); setQ(""); }} className="flex w-full items-center justify-between gap-2 border-b px-3 py-2 text-right last:border-0 hover:bg-slate-50">
                  <span className="min-w-0"><span className="block truncate font-mono text-sm font-bold text-slate-800">{r.label}</span><span className="block truncate text-xs text-slate-500">{r.sub}</span></span>
                  <span className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{r.type}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* BREADCRUMB */}
      <nav className="flex flex-wrap items-center gap-1 text-sm">
        <button onClick={() => setNav({ level: "universe" })} className="flex items-center gap-1 rounded-lg px-2 py-1 font-semibold text-slate-500 hover:bg-slate-100"><Home className="size-3.5" /></button>
        {crumbs.map((c, i) => (
          <span key={i} className="flex items-center gap-1">
            <ChevronLeft className="size-3.5 text-slate-300" />
            <button onClick={c.on} className={`rounded-lg px-2 py-1 font-bold ${i === crumbs.length - 1 ? "text-[#d62027]" : "text-slate-600 hover:bg-slate-100"}`}>{c.label}</button>
          </span>
        ))}
      </nav>

      {/* LEVEL CONTENT */}
      <div className="min-h-[460px]">
        {nav.level === "universe" && <Universe data={data} color={color} purposeOf={purposeOf} onModule={(m) => setNav({ level: "module", module: m })} />}
        {nav.level === "module" && nav.module && <ModuleLevel data={data} color={color} code={nav.module} purpose={purposeOf(nav.module)}
          onDocs={() => setNav({ level: "document", module: nav.module })} onErd={() => setNav({ level: "erd", module: nav.module })}
          onDoc={(d) => setNav({ level: "document", module: nav.module, doc: d })} />}
        {nav.level === "document" && nav.module && <DocumentLevel data={data} color={color} code={nav.module} openDoc={nav.doc}
          setDoc={(d) => setNav({ level: "document", module: nav.module, doc: d })} onErd={(t) => setNav({ level: "erd", module: nav.module, table: t })} />}
        {nav.level === "erd" && nav.module && <ErdLevel data={data} color={color} code={nav.module} focal={nav.table} byName={byName}
          onTable={(t) => setNav({ level: "erd", module: nav.module, table: t })} onTech={(t) => setNav({ level: "technical", module: byName[t]?.mod || nav.module, table: t })} />}
        {nav.level === "technical" && nav.table && <TechnicalLevel data={data} color={color} t={byName[nav.table]} byName={byName}
          onTable={(t) => setNav({ level: "technical", module: byName[t]?.mod || nav.module, table: t })} onErd={() => setNav({ level: "erd", module: nav.module, table: nav.table })} />}
      </div>

      <DownloadStrip />
      <p className="text-center text-xs text-slate-400">נבנה ע״י <span className="font-semibold text-[#d62027]">Sali Halif — Web Coding</span> · NEO Cockpit · CBC Israel · 2026</p>
    </div>
  );
}

/* ===================== pan/zoom hook ===================== */
function usePanZoom() {
  const [t, setT] = useState({ x: 0, y: 0, k: 1 });
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const onWheel = (e: React.WheelEvent) => { e.preventDefault(); const f = e.deltaY < 0 ? 1.1 : 1 / 1.1; setT((p) => ({ ...p, k: Math.min(3, Math.max(0.4, p.k * f)) })); };
  const onDown = (e: React.PointerEvent) => { drag.current = { x: e.clientX, y: e.clientY, ox: t.x, oy: t.y }; (e.target as Element).setPointerCapture?.(e.pointerId); };
  const onMove = (e: React.PointerEvent) => { if (!drag.current) return; setT((p) => ({ ...p, x: drag.current!.ox + (e.clientX - drag.current!.x), y: drag.current!.oy + (e.clientY - drag.current!.y) })); };
  const onUp = () => { drag.current = null; };
  const ctrl = { zoomIn: () => setT((p) => ({ ...p, k: Math.min(3, p.k * 1.2) })), zoomOut: () => setT((p) => ({ ...p, k: Math.max(0.4, p.k / 1.2) })), reset: () => setT({ x: 0, y: 0, k: 1 }) };
  return { t, handlers: { onWheel, onPointerDown: onDown, onPointerMove: onMove, onPointerUp: onUp, onPointerLeave: onUp }, ctrl };
}
function ZoomBar({ ctrl }: { ctrl: { zoomIn: () => void; zoomOut: () => void; reset: () => void } }) {
  return (
    <div className="absolute left-3 top-3 z-10 flex gap-1 rounded-xl border border-slate-200 bg-white/90 p-1 shadow">
      <button onClick={ctrl.zoomIn} className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100"><ZoomIn className="size-4" /></button>
      <button onClick={ctrl.zoomOut} className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100"><ZoomOut className="size-4" /></button>
      <button onClick={ctrl.reset} className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100"><Maximize2 className="size-4" /></button>
    </div>
  );
}

/* ===================== L1 — UNIVERSE ===================== */
function Universe({ data, color, purposeOf, onModule }: { data: Data; color: (m?: string | null) => string; purposeOf: (c: string) => string; onModule: (m: string) => void }) {
  const [hover, setHover] = useState<string | null>(null);
  const { t, handlers, ctrl } = usePanZoom();
  const W = 1200, H = 720, cx = W / 2, cy = H / 2;
  const n = UNIVERSE.length, Rx = 460, Ry = 250;
  const pos: Record<string, { x: number; y: number }> = {};
  UNIVERSE.forEach((m, i) => { const a = (-90 + i * (360 / n)) * Math.PI / 180; pos[m] = { x: cx + Rx * Math.cos(a), y: cy + Ry * Math.sin(a) }; });
  const tableCount = (m: string) => data.tables.filter((x) => x.mod === m).length;
  const procCount = (m: string) => data.processes.filter((p) => p.mods.includes(m)).length;
  const conns = data.crossModule.filter((c) => pos[c.from] && pos[c.to]);
  const tw = 150, th = 96;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-[radial-gradient(900px_500px_at_50%_40%,#ffffff,#eef2f7)]">
      <ZoomBar ctrl={ctrl} />
      <div className="absolute right-3 top-3 z-10 rounded-lg bg-white/80 px-3 py-1 text-xs font-semibold text-slate-500">רחף על מודול לראות קשרים עסקיים · לחץ לכניסה</div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-[68vh] min-h-[520px] w-full touch-none" {...handlers}>
        <g transform={`translate(${t.x},${t.y}) scale(${t.k})`}>
          {/* connections (faint; emphasized on hover) */}
          {conns.map((c, i) => {
            const a = pos[c.from], b = pos[c.to]; const on = hover === c.from || hover === c.to;
            const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2 - 40;
            return <path key={i} d={`M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`} fill="none" stroke={on ? color(c.from) : "#cbd5e1"} strokeWidth={on ? 2.5 : 1} strokeOpacity={hover ? (on ? 0.9 : 0.12) : 0.4} markerEnd={`url(#uarr)`} />;
          })}
          <defs><marker id="uarr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" fill="#94a3b8" /></marker></defs>
          {hover && conns.filter((c) => c.from === hover || c.to === hover).map((c, i) => {
            const a = pos[c.from], b = pos[c.to]; return <text key={"l" + i} x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 44} textAnchor="middle" className="fill-slate-600" style={{ font: "600 11px var(--font,sans-serif)" }}>{c.from}→{c.to}</text>;
          })}
          {/* SAP CORE center */}
          <g>
            <circle cx={cx} cy={cy} r={108} fill="#fff8e6" stroke="#caa23a" strokeWidth={4} />
            <text x={cx} y={cy - 18} textAnchor="middle" style={{ font: "800 26px var(--font,sans-serif)" }} className="fill-[#8a6d1a]">SAP CORE</text>
            <text x={cx} y={cy + 10} textAnchor="middle" style={{ font: "600 13px var(--font,sans-serif)" }} className="fill-[#a07f1f]">ליבה משותפת</text>
            <text x={cx} y={cy + 34} textAnchor="middle" style={{ font: "700 12px monospace" }} className="fill-[#caa23a]">{data.shared.slice(0, 4).map((s) => s.name).join(" · ")}</text>
          </g>
          {/* module tiles */}
          {UNIVERSE.map((m) => {
            const p = pos[m]; const c = color(m);
            return (
              <g key={m} transform={`translate(${p.x - tw / 2},${p.y - th / 2})`} className="cursor-pointer" onMouseEnter={() => setHover(m)} onMouseLeave={() => setHover(null)} onClick={() => onModule(m)}>
                <rect width={tw} height={th} rx={14} fill="#fff" stroke={c} strokeWidth={hover === m ? 3.5 : 2} style={{ filter: "drop-shadow(0 4px 8px rgba(20,40,60,.10))" }} />
                <rect width={tw} height={7} rx={3} fill={c} />
                <text x={16} y={40} style={{ font: "700 26px sans-serif" }}>{MOD_ICON[m]}</text>
                <text x={tw - 14} y={34} textAnchor="end" style={{ font: "800 20px monospace" }} className="fill-slate-900">{m}</text>
                <text x={tw - 14} y={56} textAnchor="end" style={{ font: "600 12px sans-serif" }} className="fill-slate-500">{MOD_NAME_HE[m]}</text>
                <text x={tw - 14} y={80} textAnchor="end" style={{ font: "700 11px monospace" }} fill={c}>{tableCount(m)} טבלאות · {procCount(m)} תהליכים</text>
              </g>
            );
          })}
        </g>
      </svg>
      {hover && (
        <div className="pointer-events-none absolute bottom-3 right-3 max-w-md rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg">
          <div className="flex items-center gap-2"><span className="text-lg">{MOD_ICON[hover]}</span><span className="font-mono text-base font-extrabold" style={{ color: color(hover) }}>{hover}</span><span className="font-bold text-slate-700">{MOD_NAME_HE[hover]}</span></div>
          <p className="mt-1 text-sm text-slate-600">{purposeOf(hover)}</p>
        </div>
      )}
    </div>
  );
}

/* ===================== L2 — MODULE ARCHITECTURE ===================== */
function ModuleLevel({ data, color, code, purpose, onDocs, onErd, onDoc }: { data: Data; color: (m?: string | null) => string; code: string; purpose: string; onDocs: () => void; onErd: () => void; onDoc: (d: string) => void }) {
  const flow = MOD_FLOW[code] || [];
  const bp = data.blueprints.find((b) => b.code === code);
  const c = color(code);
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border bg-white p-5 shadow-sm" style={{ borderTopColor: c, borderTopWidth: 5 }}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3"><span className="text-3xl">{MOD_ICON[code]}</span><div><div className="flex items-center gap-2"><span className="font-mono text-2xl font-extrabold text-slate-900">{code}</span><span className="text-lg font-bold text-slate-600">{MOD_NAME_HE[code]}</span></div><p className="mt-0.5 text-sm text-slate-500">{purpose}</p></div></div>
          <div className="flex gap-2">
            <button onClick={onDocs} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:border-[#d62027]">מסמכים →</button>
            <button onClick={onErd} className="rounded-xl px-4 py-2 text-sm font-bold text-white" style={{ background: c }}>טבלאות (ERD) →</button>
          </div>
        </div>
      </div>
      <h3 className="text-base font-bold text-slate-700">זרימה עסקית במודול</h3>
      <div className="flex flex-wrap items-stretch gap-2">
        {flow.map((s, i) => (
          <div key={i} className="flex items-stretch gap-2">
            <button disabled={!s.doc} onClick={() => s.doc && onDoc(s.doc)}
              className={`flex w-40 flex-col justify-center rounded-xl border-2 bg-white p-3 text-center shadow-sm ${s.doc ? "cursor-pointer hover:shadow-md" : "cursor-default"}`} style={{ borderColor: c }}>
              <div className="text-sm font-extrabold text-slate-900">{s.he}</div>
              <div className="text-xs text-slate-500">{s.en}</div>
              {s.doc && <div className="mt-1 text-[10px] font-bold" style={{ color: c }}>מסמך ↗</div>}
            </button>
            {i < flow.length - 1 && <ArrowDown className="size-5 -rotate-90 self-center text-slate-300" />}
          </div>
        ))}
      </div>
      {bp && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[["קלט", bp.inputs], ["פלט", bp.outputs], ["אובייקטים", bp.objects], ["מחובר ל", bp.connects]].map(([t, arr]) => (
            <div key={t as string} className="rounded-xl border bg-white p-3 shadow-sm">
              <h4 className="mb-2 text-xs font-bold uppercase" style={{ color: c }}>{t as string}</h4>
              <div className="flex flex-wrap gap-1.5">{(arr as string[]).map((x) => <span key={x} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">{x}</span>)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ===================== L3 — DOCUMENT FLOW ===================== */
function DocumentLevel({ data, color, code, openDoc, setDoc, onErd }: { data: Data; color: (m?: string | null) => string; code: string; openDoc?: string; setDoc: (d: string) => void; onErd: (t: string) => void }) {
  const docs = data.documents.filter((d) => d.mod === code);
  const list = docs.length ? docs : data.documents.filter((d) => (MOD_FLOW[code] || []).some((s) => s.doc === d.id));
  const c = color(code);
  const active = openDoc && DOC_META[openDoc] ? openDoc : list[0]?.id;
  const meta = active ? DOC_META[active] : null;
  const activeDoc = data.documents.find((d) => d.id === active);
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
      <div>
        <h3 className="mb-3 text-base font-bold text-slate-700">מסמכי {code} · זרימת מסמכים</h3>
        <div className="flex flex-wrap items-stretch gap-2">
          {list.map((d, i) => (
            <div key={d.id} className="flex items-stretch gap-2">
              <button onClick={() => setDoc(d.id)} className={`w-44 rounded-xl border-2 bg-white p-3 text-center shadow-sm hover:shadow-md ${active === d.id ? "ring-2" : ""}`} style={{ borderColor: c }}>
                <div className="text-sm font-extrabold text-slate-900">{d.id}</div>
                <div className="text-xs text-slate-500">{d.he}</div>
              </button>
              {i < list.length - 1 && <ArrowDown className="size-5 -rotate-90 self-center text-slate-300" />}
            </div>
          ))}
        </div>
      </div>
      {meta && activeDoc && (
        <div className="rounded-2xl border bg-white p-5 shadow-sm" style={{ borderTopColor: c, borderTopWidth: 4 }}>
          <h3 className="text-lg font-extrabold text-slate-900">{active}</h3>
          <p className="mt-1 text-sm text-slate-600">{meta.purpose}</p>
          <Dl label="בעלים" v={meta.owner} />
          <Dl label="טרנזקציות" v={meta.tcodes} mono />
          <DlList label="קלט" arr={meta.inputs} />
          <DlList label="פלט" arr={meta.outputs} />
          <div className="mt-3 border-t pt-3">
            <h4 className="mb-2 text-xs font-bold uppercase text-slate-400">טבלאות מאחורי המסמך</h4>
            <div className="flex flex-wrap gap-1.5">
              {activeDoc.tables.map((t) => <button key={t} onClick={() => onErd(t)} className="rounded-md border px-2 py-1 font-mono text-xs font-bold hover:bg-slate-50" style={{ borderColor: c, color: c }}>{t}</button>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function Dl({ label, v, mono }: { label: string; v: string; mono?: boolean }) { return <div className="mt-2 flex justify-between gap-3 text-sm"><span className="text-slate-400">{label}</span><span className={`font-semibold text-slate-700 ${mono ? "font-mono" : ""}`}>{v}</span></div>; }
function DlList({ label, arr }: { label: string; arr: string[] }) { return <div className="mt-2"><span className="text-sm text-slate-400">{label}</span><ul className="mt-1 list-inside list-disc text-sm text-slate-700">{arr.map((x) => <li key={x}>{x}</li>)}</ul></div>; }

/* ===================== L4 — ERD ===================== */
function ErdLevel({ data, color, code, focal, byName, onTable, onTech }: { data: Data; color: (m?: string | null) => string; code: string; focal?: string; byName: Record<string, Tbl>; onTable: (t: string) => void; onTech: (t: string) => void }) {
  const { t, handlers, ctrl } = usePanZoom();
  // tables in scope: focal + its neighbors, else module top tables
  let names: string[];
  if (focal && byName[focal]) {
    const f = byName[focal]; const nb = new Set<string>([focal]);
    f.rel.forEach((r) => byName[r.table] && nb.add(r.table));
    names = Array.from(nb).slice(0, 9);
  } else {
    names = data.tables.filter((x) => x.mod === code).sort((a, b) => b.degree - a.degree).slice(0, 9).map((x) => x.name);
  }
  const cards = names.map((nm) => byName[nm]).filter(Boolean) as Tbl[];
  const cols = Math.min(3, Math.max(1, Math.ceil(Math.sqrt(cards.length))));
  const cardW = 230, rowGap = 70, colGap = 80, headH = 40, rowH = 26;
  const pos: Record<string, { x: number; y: number; h: number }> = {};
  cards.forEach((t2, i) => { const r = Math.floor(i / cols), cc = i % cols; const h = headH + Math.min(t2.fields.length, 7) * rowH + 8; pos[t2.name] = { x: 40 + cc * (cardW + colGap), y: 30 + r * (200 + rowGap), h }; });
  const inSet = new Set(names);
  const links: { a: string; b: string; card: string }[] = [];
  cards.forEach((t2) => t2.rel.forEach((r) => { if (inSet.has(r.table)) { const a = r.role === "parent" ? t2.name : r.table, b = r.role === "parent" ? r.table : t2.name; if (!links.find((l) => l.a === a && l.b === b)) links.push({ a, b, card: r.card || "" }); } }));
  const rows = Math.ceil(cards.length / cols);
  const W = 40 + cols * (cardW + colGap), H = 30 + rows * (200 + rowGap);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-700">{focal ? `ERD סביב ${focal}` : `ERD — טבלאות ${code}`} · כרטיסי טבלה + קשרי PK/FK</h3>
        <span className="text-xs text-slate-400">לחיצה על כרטיס → תצוגה טכנית (PK/FK)</span>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(#f1f5f9_1px,transparent_1px),linear-gradient(90deg,#f1f5f9_1px,transparent_1px)] bg-white" style={{ backgroundSize: "26px 26px" }}>
        <ZoomBar ctrl={ctrl} />
        <svg viewBox={`0 0 ${Math.max(W, 700)} ${Math.max(H, 460)}`} className="h-[64vh] min-h-[460px] w-full touch-none" {...handlers}>
          <defs><marker id="erdarr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" fill="#475569" /></marker></defs>
          <g transform={`translate(${t.x},${t.y}) scale(${t.k})`}>
            {/* relationship lines */}
            {links.map((l, i) => {
              const A = pos[l.a], B = pos[l.b]; if (!A || !B) return null;
              const ax = A.x + cardW / 2, ay = A.y + A.h, bx = B.x + cardW / 2, by = B.y;
              const my = (ay + by) / 2;
              return <g key={i}><path d={`M${ax},${ay} C${ax},${my} ${bx},${my} ${bx},${by}`} fill="none" stroke="#475569" strokeWidth={1.6} markerEnd="url(#erdarr)" />
                <rect x={(ax + bx) / 2 - 18} y={my - 12} width={36} height={20} rx={5} fill="#1e293b" /><text x={(ax + bx) / 2} y={my + 2} textAnchor="middle" style={{ font: "700 11px monospace" }} className="fill-white">{l.card || "1:N"}</text></g>;
            })}
            {/* table cards */}
            {cards.map((t2) => {
              const p = pos[t2.name]; const c = color(t2.mod); const isFocal = t2.name === focal;
              return (
                <g key={t2.name} transform={`translate(${p.x},${p.y})`} className="cursor-pointer" onClick={() => onTech(t2.name)}>
                  <rect width={cardW} height={p.h} rx={10} fill="#fff" stroke={isFocal ? "#d62027" : c} strokeWidth={isFocal ? 3 : 1.6} style={{ filter: "drop-shadow(0 3px 8px rgba(20,40,60,.12))" }} />
                  <rect width={cardW} height={headH} rx={10} fill={c} /><rect y={headH - 10} width={cardW} height={10} fill={c} />
                  <text x={14} y={26} style={{ font: "800 17px monospace" }} className="fill-white">{t2.name}</text>
                  <text x={cardW - 12} y={25} textAnchor="end" style={{ font: "600 11px sans-serif" }} className="fill-white/90">{t2.mod}</text>
                  {t2.fields.slice(0, 7).map((f, j) => {
                    const y = headH + 8 + j * rowH; const pk = f[3] === "PK", fk = f[3] === "FK";
                    return <g key={f[0]} transform={`translate(0,${y})`}>
                      {j > 0 && <line x1={8} x2={cardW - 8} y1={-4} y2={-4} stroke="#eef2f6" />}
                      <text x={14} y={14} style={{ font: `${pk ? 800 : 600} 13px monospace` }} className={pk ? "fill-[#b8860b]" : fk ? "fill-[#2563eb]" : "fill-slate-700"}>{f[0]}</text>
                      {pk && <text x={cardW - 12} y={14} textAnchor="end" style={{ font: "700 10px monospace" }} className="fill-[#b8860b]">🔑 PK</text>}
                      {fk && <text x={cardW - 12} y={14} textAnchor="end" style={{ font: "700 10px monospace" }} className="fill-[#2563eb]">FK</text>}
                    </g>;
                  })}
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}

/* ===================== L5 — TECHNICAL ===================== */
function TechnicalLevel({ data, color, t, byName, onTable, onErd }: { data: Data; color: (m?: string | null) => string; t: Tbl; byName: Record<string, Tbl>; onTable: (t: string) => void; onErd: () => void }) {
  if (!t) return null;
  const c = color(t.mod);
  const parents = t.rel.filter((r) => r.role === "child");
  const children = t.rel.filter((r) => r.role === "parent");
  const whereUsed = data.tables.filter((x) => x.rel.some((r) => r.table === t.name)).map((x) => x.name);
  const pk = t.fields.filter((f) => f[3] === "PK").map((f) => f[0]);
  const fk = t.fields.filter((f) => f[3] === "FK").map((f) => f[0]);
  const Box = ({ title, children: ch }: { title: string; children: React.ReactNode }) => <div className="rounded-xl border bg-white p-4 shadow-sm"><h4 className="mb-2 text-xs font-bold uppercase" style={{ color: c }}>{title}</h4>{ch}</div>;
  const Pills = ({ arr, click }: { arr: string[]; click?: (s: string) => void }) => arr.length ? <div className="flex flex-wrap gap-1.5">{arr.map((x) => click && byName[x] ? <button key={x} onClick={() => click(x)} className="rounded-md border px-2 py-1 font-mono text-xs font-bold hover:bg-slate-50" style={{ borderColor: c, color: c }}>{x}</button> : <span key={x} className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs font-bold text-slate-600">{x}</span>)}</div> : <span className="text-xs italic text-slate-400">—</span>;
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-white p-5 shadow-sm" style={{ borderTopColor: c, borderTopWidth: 5 }}>
        <div className="flex items-center gap-3"><Boxes className="size-7" style={{ color: c }} /><div><div className="flex items-center gap-2"><span className="font-mono text-2xl font-extrabold text-slate-900">{t.name}</span><span className="rounded-md px-2 py-0.5 text-xs font-bold text-white" style={{ background: c }}>{t.mod}</span><span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">{t.real ? "בחילוץ" : "מודל קנוני"}</span></div><p className="mt-1 text-sm text-slate-600">{t.he || t.en}</p></div></div>
        <button onClick={onErd} className="rounded-xl border px-4 py-2 text-sm font-bold text-slate-700 hover:border-[#d62027]">← חזרה ל-ERD</button>
      </div>
      {/* key chain */}
      {(parents.length > 0 || children.length > 0) && (
        <Box title="שרשרת מפתח · Parent → Child">
          <div className="flex flex-wrap items-center gap-2">
            {parents.map((p) => <button key={p.table} onClick={() => byName[p.table] && onTable(p.table)} className="rounded-lg border px-3 py-1.5 font-mono text-sm font-bold hover:bg-slate-50" style={{ borderColor: c }}>{p.table} <span className="text-[10px] text-slate-400">{p.card}</span></button>)}
            <span className="rounded-lg bg-[#d62027] px-3 py-1.5 font-mono text-sm font-extrabold text-white">{t.name}</span>
            {children.map((ch) => <button key={ch.table} onClick={() => byName[ch.table] && onTable(ch.table)} className="rounded-lg border px-3 py-1.5 font-mono text-sm font-bold hover:bg-slate-50" style={{ borderColor: c }}>{ch.table} <span className="text-[10px] text-slate-400">{ch.card}</span></button>)}
          </div>
        </Box>
      )}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        <Box title={`מפתח ראשי · PK`}><div className="flex items-center gap-2"><KeyRound className="size-4 text-[#b8860b]" /><Pills arr={pk} /></div></Box>
        <Box title="מפתחות זרים · FK"><div className="flex items-center gap-2"><Link2 className="size-4 text-[#2563eb]" /><Pills arr={fk} /></div></Box>
        <Box title="קרדינליות"><div className="text-sm text-slate-600">{[...parents, ...children].map((r) => <div key={r.table} className="font-mono">{r.table}: <b>{r.card || "1:N"}</b></div>)}{!parents.length && !children.length && "—"}</div></Box>
        <Box title="Where-Used (טבלאות שמפנות)"><Pills arr={whereUsed} click={onTable} /></Box>
        <Box title="טרנזקציות"><span className="text-sm font-semibold text-slate-700">{t.tcodes || "—"}</span></Box>
        <Box title="Fiori"><span className="text-sm text-slate-700">{t.fiori || "—"}</span></Box>
        <Box title="BAPIs / FM"><Pills arr={(t.funcs || []).slice(0, 6)} /></Box>
        <Box title="CDS Views (S/4)"><Pills arr={t.cds || []} /></Box>
        <Box title="ECC → S/4HANA"><p className="text-sm text-slate-600">{t.s4 || "אין שינוי מהותי."}</p>{t.s4alt && <p className="mt-1 text-xs">חלופה: <span className="font-mono font-bold text-slate-700">{t.s4alt}</span></p>}</Box>
      </div>
      <div className="flex flex-wrap gap-2">
        {t.fields.length > 0 && <Box title="כל השדות"><table className="text-right font-mono text-xs"><tbody>{t.fields.map((f) => <tr key={f[0]} className="border-b last:border-0"><td className={`py-1 pl-4 font-bold ${f[3] === "PK" ? "text-[#b8860b]" : f[3] === "FK" ? "text-[#2563eb]" : "text-slate-700"}`}>{f[0]}</td><td className="py-1 pl-4 text-slate-500">{f[2] || f[1]}</td><td className="py-1 text-slate-400">{f[3]}</td></tr>)}</tbody></table></Box>}
      </div>
    </div>
  );
}

/* ===================== download strip ===================== */
function DownloadStrip() {
  const items = [
    { href: `${BASE}/SAP-Enterprise-Architecture-A0.pdf`, label: "פוסטר PDF (A0)" },
    { href: `${BASE}/SAP-Enterprise-Architecture-A0.png`, label: "פוסטר PNG" },
    { href: `${BASE}/SAP-Enterprise-Architecture-A0.svg`, label: "פוסטר SVG" },
    { href: `${BASE}/dataset.json`, label: "נתוני מקור JSON" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3">
      <span className="flex items-center gap-1.5 px-2 text-sm font-bold text-slate-600"><Download className="size-4" /> מרכז הורדות:</span>
      {items.map((i) => <a key={i.href} href={i.href} download className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:border-[#d62027]">{i.label}</a>)}
    </div>
  );
}
