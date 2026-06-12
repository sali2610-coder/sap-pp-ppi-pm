"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Search, ChevronLeft, Home, ZoomIn, ZoomOut, X, Download, KeyRound, Link2, Expand, Shrink, Scan, Maximize2, GripVertical, ArrowLeft } from "lucide-react";
import { MOD_PURPOSE, MOD_FLOW, MOD_REPORTS, genExampleRecords, ERD_MODULES, TECH_FIELDS, FIELDS_PLUS, OBJECTS } from "./meta";

const BASE = "/sap-infrastructure";
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

export default function Page() {
  const [data, setData] = useState<Data | null>(null);
  const [nav, setNav] = useState<{ level: "universe" | "module"; module?: string; tab?: string; focus?: string[] }>({ level: "universe" });
  const [inspect, setInspect] = useState<string | null>(null);
  const [q, setQ] = useState("");
  useEffect(() => { fetch(`${BASE}/dataset.json`).then((r) => r.json()).then(setData).catch(() => {}); }, []);
  const color = useCallback((m?: string | null) => (data && m && data.palette[m]) || "#64748b", [data]);
  const byName = useMemo(() => (data ? Object.fromEntries(data.tables.map((t) => [t.name, t])) : {}) as Record<string, Tbl>, [data]);
  const openModule = (m: string, tab = "objects") => { setNav({ level: "module", module: m, tab }); setInspect(null); };

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
  const inspector = inspect && byName[inspect] ? <Inspector data={data} color={color} t={byName[inspect]} byName={byName} onClose={() => setInspect(null)} onGo={setInspect} /> : null;

  return (
    <div dir="rtl" className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a1018] text-slate-100 shadow-2xl">
      {/* top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#0c1320] px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-[#d62027] px-2 py-1 font-mono text-[11px] font-bold text-white">NEO</span>
          <div><div className="text-base font-bold text-white">SAP Architecture Explorer</div><div className="text-[11px] text-slate-400">חזון המערכת · ECC6 → S/4HANA · לומדים תהליך → אובייקטים → טבלאות</div></div>
        </div>
        <div className="relative w-full max-w-md">
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#0a121e] px-3 py-1.5">
            <Search className="size-4 text-slate-500" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש מודול · טבלה · T-Code · BAPI" className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500" />
            {q && <button onClick={() => setQ("")}><X className="size-3.5 text-slate-500" /></button>}
          </div>
          {results.length > 0 && (
            <div className="absolute z-50 mt-1 max-h-80 w-full overflow-auto rounded-lg border border-white/10 bg-[#0c1524] shadow-2xl">
              {results.map((r, i) => (<button key={i} onClick={() => { r.go(); setQ(""); }} className="flex w-full items-center justify-between gap-2 border-b border-white/5 px-3 py-2 text-right last:border-0 hover:bg-white/5">
                <span className="min-w-0"><span className="block truncate font-mono text-sm font-bold text-slate-100">{r.label}</span><span className="block truncate text-xs text-slate-400">{r.sub}</span></span>
                <span className="shrink-0 rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-slate-300">{r.type}</span></button>))}
            </div>
          )}
        </div>
      </div>
      {/* breadcrumb */}
      <div className="flex items-center gap-1 border-b border-white/10 bg-[#0a1018] px-4 py-2 text-xs">
        <button onClick={() => setNav({ level: "universe" })} className="flex items-center gap-1 rounded px-1.5 py-0.5 font-semibold text-slate-400 hover:bg-white/5"><Home className="size-3" /> Universe</button>
        {nav.module && <><ChevronLeft className="size-3 text-slate-600" /><span className="rounded px-1.5 py-0.5 font-bold text-white">{nav.module} · {MOD_NAME_HE[nav.module]}</span></>}
        {nav.module && nav.tab && <><ChevronLeft className="size-3 text-slate-600" /><span className="rounded px-1.5 py-0.5 font-semibold text-[#f2c14e]">{(TABS.find((x) => x[0] === nav.tab) || ["", nav.tab])[1]}</span></>}
      </div>

      <div className="p-4">
        {nav.level === "universe" && <Universe data={data} color={color} onModule={openModule} />}
        {nav.level === "module" && nav.module && <Workspace data={data} color={color} code={nav.module} tab={nav.tab || "objects"} focus={nav.focus} byName={byName}
          setTab={(t) => setNav({ level: "module", module: nav.module, tab: t })} openErd={(focus) => setNav({ level: "module", module: nav.module, tab: "erd", focus })}
          onTable={setInspect} onModule={openModule} inspector={inspector} />}
      </div>
      {nav.tab !== "erd" && inspector}
      <div className="flex flex-wrap items-center gap-2 border-t border-white/10 bg-[#0c1320] p-2.5">
        <span className="flex items-center gap-1 px-1 text-xs font-bold text-slate-400"><Download className="size-3.5" /> הורדות:</span>
        {[["SAP-Enterprise-Architecture-A0.pdf", "PDF"], ["SAP-Enterprise-Architecture-A0.png", "PNG"], ["SAP-Enterprise-Architecture-A0.svg", "SVG"], ["dataset.json", "JSON"]].map(([f, l]) => <a key={f} href={`${BASE}/${f}`} download className="rounded-md border border-white/10 px-2.5 py-1 text-xs font-semibold text-slate-300 hover:border-[#d62027]">{l}</a>)}
        <span className="ms-auto px-1 text-[11px] text-slate-500">Sali Halif — Web Coding · NEO Cockpit · 2026</span>
      </div>
    </div>
  );
}

/* ---- pan/zoom ---- */
function usePanZoom() {
  const [t, setT] = useState({ x: 0, y: 0, k: 1 });
  const d = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  return {
    t, setT,
    bg: {
      onWheel: (e: React.WheelEvent) => { const f = e.deltaY < 0 ? 1.12 : 1 / 1.12; setT((p) => ({ ...p, k: Math.min(2.6, Math.max(0.3, p.k * f)) })); },
      onPointerDown: (e: React.PointerEvent) => { if ((e.target as Element).closest("[data-card]")) return; d.current = { x: e.clientX, y: e.clientY, ox: t.x, oy: t.y }; },
      onPointerMove: (e: React.PointerEvent) => { if (d.current) setT((p) => ({ ...p, x: d.current!.ox + (e.clientX - d.current!.x), y: d.current!.oy + (e.clientY - d.current!.y) })); },
      onPointerUp: () => { d.current = null; }, onPointerLeave: () => { d.current = null; },
    },
    ctrl: { zoomIn: () => setT((p) => ({ ...p, k: Math.min(2.6, p.k * 1.2) })), zoomOut: () => setT((p) => ({ ...p, k: Math.max(0.3, p.k / 1.2) })) },
  };
}

/* ===================== UNIVERSE ===================== */
function Universe({ data, color, onModule }: { data: Data; color: (m?: string | null) => string; onModule: (m: string) => void }) {
  const [hv, setHv] = useState<string | null>(null);
  const { t, bg, ctrl } = usePanZoom();
  const W = 1180, H = 620, cx = W / 2, cy = H / 2, n = UNIVERSE.length, Rx = 440, Ry = 220;
  const pos: Record<string, { x: number; y: number }> = {};
  UNIVERSE.forEach((m, i) => { const a = (-90 + i * (360 / n)) * Math.PI / 180; pos[m] = { x: cx + Rx * Math.cos(a), y: cy + Ry * Math.sin(a) }; });
  const tc = (m: string) => data.tables.filter((x) => x.mod === m).length, pc = (m: string) => data.processes.filter((p) => p.mods.includes(m)).length;
  const conns = data.crossModule.filter((c) => pos[c.from] && pos[c.to]); const tw = 142, th = 74;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between"><h2 className="text-lg font-bold text-white">SAP Universe</h2><div className="flex gap-1"><button onClick={ctrl.zoomIn} className="rounded-md border border-white/10 bg-white/5 p-1.5 text-slate-300 hover:bg-white/10"><ZoomIn className="size-3.5" /></button><button onClick={ctrl.zoomOut} className="rounded-md border border-white/10 bg-white/5 p-1.5 text-slate-300 hover:bg-white/10"><ZoomOut className="size-3.5" /></button></div></div>
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(700px_360px_at_50%_45%,#13203a,#0a1018)]">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-[62vh] min-h-[460px] w-full touch-none" {...bg}>
          <defs><marker id="ua" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" fill="#475569" /></marker></defs>
          <g transform={`translate(${t.x},${t.y}) scale(${t.k})`}>
            {conns.map((c, i) => { const a = pos[c.from], b = pos[c.to], on = hv === c.from || hv === c.to, mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2 - 32;
              return <path key={i} d={`M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`} fill="none" stroke={on ? color(c.from) : "#334155"} strokeWidth={on ? 2 : 0.8} strokeOpacity={hv ? (on ? 0.9 : 0.08) : 0.3} markerEnd="url(#ua)" />; })}
            {hv && conns.filter((c) => c.from === hv || c.to === hv).map((c, i) => { const a = pos[c.from], b = pos[c.to]; return <text key={i} x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 36} textAnchor="middle" style={{ font: "600 10px ui-monospace" }} className="fill-slate-400">{c.from}→{c.to}</text>; })}
            <circle cx={cx} cy={cy} r={94} fill="#1a1407" stroke="#caa23a" strokeWidth={2} />
            <text x={cx} y={cy - 12} textAnchor="middle" style={{ font: "800 22px ui-monospace" }} className="fill-[#f2c14e]">SAP CORE</text>
            <text x={cx} y={cy + 9} textAnchor="middle" style={{ font: "600 11px sans-serif" }} className="fill-amber-200/70">אובייקטים משותפים</text>
            <text x={cx} y={cy + 30} textAnchor="middle" style={{ font: "600 9px ui-monospace" }} className="fill-amber-500/60">{data.shared.slice(0, 4).map((s) => s.name).join(" · ")}</text>
            {UNIVERSE.map((m) => { const p = pos[m], c = color(m), on = hv === m;
              return <g key={m} data-card transform={`translate(${p.x - tw / 2},${p.y - th / 2})`} className="cursor-pointer" onMouseEnter={() => setHv(m)} onMouseLeave={() => setHv(null)} onClick={() => onModule(m)}>
                <rect width={tw} height={th} rx={9} fill="#0f1a2b" stroke={on ? c : "#1e2c42"} strokeWidth={on ? 2 : 1.2} style={{ filter: on ? `drop-shadow(0 0 12px ${c}66)` : "none" }} />
                <rect width={5} height={th} rx={2.5} fill={c} />
                <text x={tw - 12} y={26} textAnchor="end" style={{ font: "800 17px ui-monospace" }} className="fill-white">{m}</text>
                <text x={tw - 12} y={45} textAnchor="end" style={{ font: "500 11px sans-serif" }} className="fill-slate-400">{MOD_NAME_HE[m]}</text>
                <text x={tw - 12} y={64} textAnchor="end" style={{ font: "600 10px ui-monospace" }} fill={c}>{tc(m)} tbl · {pc(m)} proc</text>
              </g>; })}
          </g>
        </svg>
        <div className="absolute right-3 top-3 rounded-md bg-black/40 px-2.5 py-1 text-[11px] font-medium text-slate-300 ring-1 ring-white/10">רחף → קשרים · לחץ מודול → כניסה</div>
      </div>
    </div>
  );
}

/* ===================== WORKSPACE ===================== */
function Workspace({ data, color, code, tab, focus, byName, setTab, openErd, onTable, onModule, inspector }: { data: Data; color: (m?: string | null) => string; code: string; tab: string; focus?: string[]; byName: Record<string, Tbl>; setTab: (t: string) => void; openErd: (f?: string[]) => void; onTable: (t: string) => void; onModule: (m: string) => void; inspector: React.ReactNode }) {
  const c = color(code); const bp = data.blueprints.find((b) => b.code === code); const purpose = bp?.purpose || MOD_PURPOSE[code] || "";
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#0e1626] px-4 py-3" style={{ borderInlineStartColor: c, borderInlineStartWidth: 4 }}>
        <div><div className="flex items-center gap-2"><span className="font-mono text-2xl font-extrabold text-white">{code}</span><span className="font-semibold text-slate-300">{MOD_NAME_HE[code]}</span></div><p className="mt-0.5 max-w-3xl text-xs text-slate-400">{purpose}</p></div>
        <div className="flex rounded-lg border border-white/10 bg-[#0a121e] p-0.5">
          {TABS.map(([id, label]) => <button key={id} onClick={() => setTab(id)} className={`rounded-md px-3.5 py-1.5 text-sm font-bold transition ${tab === id ? "bg-[#d62027] text-white" : "text-slate-400 hover:text-white"}`}>{label}</button>)}
        </div>
      </div>
      {tab === "objects" && <ObjectsView data={data} color={color} code={code} byName={byName} onObjectErd={(tables) => openErd(tables)} onTable={onTable} />}
      {tab === "process" && <ProcessFlow color={color} code={code} />}
      {tab === "erd" && <Erd data={data} color={color} code={code} byName={byName} focus={focus} onTable={onTable} inspector={inspector} />}
      {tab === "technical" && <TechList data={data} color={color} code={code} onTable={onTable} />}
    </div>
  );
}

/* ===================== L2 OBJECTS (default, progressive disclosure) ===================== */
function ObjectsView({ data, color, code, byName, onObjectErd, onTable }: { data: Data; color: (m?: string | null) => string; code: string; byName: Record<string, Tbl>; onObjectErd: (tables: string[]) => void; onTable: (t: string) => void }) {
  const objs = OBJECTS[code] || [];
  const [open, setOpen] = useState<number | null>(null);
  const c = color(code);
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between"><h3 className="text-base font-bold text-white">אובייקטים עסקיים · {code}</h3><span className="text-xs text-slate-500">לחץ אובייקט → טבלאות הליבה · «ERD מלא» → המודל המלא</span></div>
      <div className="flex flex-wrap items-stretch gap-3">
        {objs.map((o, i) => (
          <div key={i} className="flex items-stretch gap-3">
            <div className="w-full">
              <button onClick={() => setOpen(open === i ? null : i)} className={`group flex w-56 flex-col rounded-2xl border bg-gradient-to-b from-[#101c30] to-[#0c1626] p-5 text-right transition hover:-translate-y-0.5 ${open === i ? "ring-2" : ""}`} style={{ borderColor: c }}>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-1 text-2xl font-extrabold leading-tight text-white">{o.he}</span>
                <span className="font-mono text-xs text-slate-400">{o.en}</span>
                <span className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full px-2.5 py-1 text-[11px] font-bold" style={{ background: c + "22", color: c }}>{o.tables.length} טבלאות {open === i ? "▲" : "▼"}</span>
              </button>
              {open === i && (
                <div className="mt-2 w-56 rounded-xl border border-white/10 bg-[#0a121e] p-3">
                  <div className="mb-2 flex items-center justify-between"><span className="text-[10px] font-bold uppercase text-slate-500">טבלאות ליבה</span><button onClick={() => onObjectErd(o.tables)} className="rounded-md px-2 py-0.5 text-[11px] font-bold text-white" style={{ background: c }}>ERD →</button></div>
                  <div className="space-y-1.5">{o.tables.map((tn) => { const t = byName[tn]; return <button key={tn} onClick={() => onTable(tn)} disabled={!t} className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-[#0e1626] px-2.5 py-1.5 text-right hover:border-white/30 disabled:opacity-40">
                    <span className="font-mono text-sm font-bold" style={{ color: t ? color(t.mod) : "#64748b" }}>{tn}</span><span className="truncate text-[10px] text-slate-500">{t?.he || ""}</span></button>; })}</div>
                </div>
              )}
            </div>
            {i < objs.length - 1 && <ArrowLeft className="size-6 shrink-0 self-center text-slate-600" />}
          </div>
        ))}
      </div>
      <button onClick={() => onObjectErd(undefined as unknown as string[])} className="mt-2 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#0e1626] px-4 py-2 text-sm font-bold text-white hover:border-[#d62027]"><Maximize2 className="size-4" /> פתח ERD מלא של {code}</button>
    </div>
  );
}

function ProcessFlow({ color, code }: { color: (m?: string | null) => string; code: string }) {
  const c = color(code); const flow = MOD_FLOW[code] || [];
  return (
    <div className="rounded-xl border border-white/10 bg-[#0e1626] p-5">
      <h3 className="mb-4 text-sm font-bold text-slate-200">זרימה עסקית · {code}</h3>
      <div className="flex flex-wrap items-stretch gap-2">{flow.map((s, i) => (<div key={i} className="flex items-stretch gap-2">
        <div className="flex w-40 flex-col justify-center rounded-xl border bg-[#0a121e] p-3 text-center" style={{ borderColor: c }}><div className="text-base font-bold text-white">{s.he}</div><div className="font-mono text-[10px] text-slate-500">{s.en}</div></div>
        {i < flow.length - 1 && <ArrowLeft className="size-5 self-center text-slate-600" />}</div>))}</div>
    </div>
  );
}

function TechList({ data, color, code, onTable }: { data: Data; color: (m?: string | null) => string; code: string; onTable: (t: string) => void }) {
  const list = erdMembers(data, code);
  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <table className="w-full text-right text-sm">
        <thead className="bg-[#0c1320] text-[11px] uppercase text-slate-500"><tr><th className="px-3 py-2 font-semibold">טבלה</th><th className="px-3 py-2 font-semibold">תיאור</th><th className="px-3 py-2 font-semibold">PK</th><th className="px-3 py-2 font-semibold">קשרים</th><th className="px-3 py-2 font-semibold">T-Codes</th></tr></thead>
        <tbody>{list.map((t) => (<tr key={t.name} onClick={() => onTable(t.name)} className="cursor-pointer border-t border-white/5 bg-[#0a1018] hover:bg-white/5">
          <td className="px-3 py-2 font-mono font-bold" style={{ color: color(t.mod) }}>{t.name}</td><td className="px-3 py-2 text-slate-300">{t.he || t.en}</td>
          <td className="px-3 py-2 font-mono text-xs text-amber-400">{t.pk.join(", ") || "—"}</td><td className="px-3 py-2 text-slate-400">{t.degree}</td><td className="px-3 py-2 font-mono text-xs text-slate-400">{t.tcodes || "—"}</td></tr>))}</tbody>
      </table>
    </div>
  );
}

/* ===================== L4 ERD (dark, fullscreen, floating inspector) ===================== */
function cardKind(card: string) { const u = (card || "").toUpperCase(); if (u.includes("N:N") || u.includes("M:N")) return "N:N"; if (u.replace(/\s/g, "") === "1:1") return "1:1"; return "1:N"; }
const KIND_COLOR: Record<string, string> = { "1:1": "#94a3b8", "1:N": "#38bdf8", "N:N": "#f87171" };

function Erd({ data, color, code, byName, focus, onTable, inspector }: { data: Data; color: (m?: string | null) => string; code: string; byName: Record<string, Tbl>; focus?: string[]; onTable: (t: string) => void; inspector: React.ReactNode }) {
  const base = erdMembers(data, code);
  const shown = useMemo(() => {
    if (focus && focus.length) { const set = new Set(focus); base.forEach((t) => { if (set.has(t.name)) t.rel.forEach((r) => byName[r.table] && set.add(r.table)); }); return [...set].map((n) => byName[n]).filter(Boolean) as Tbl[]; }
    return base;
  }, [code, focus]);
  const names = new Set(shown.map((t) => t.name));
  const cardW = 220, headH = 38, rowH = 19, secH = 17;
  const cols = Math.min(4, Math.max(2, Math.ceil(Math.sqrt(shown.length))));
  const slotW = cardW + 100, slotH = 360;
  const mkInit = () => { const o: Record<string, { x: number; y: number }> = {}; shown.forEach((t, i) => { const r = Math.floor(i / cols), cc = i % cols; o[t.name] = { x: 40 + cc * slotW, y: 40 + r * slotH }; }); return o; };
  const [posns, setPos] = useState(mkInit);
  const [exp, setExp] = useState<Set<string>>(() => new Set(shown.slice(0, 4).map((t) => t.name)));
  const [sel, setSel] = useState<string | null>(focus && focus[0] ? focus[0] : null);
  const [hv, setHv] = useState<string | null>(null);
  const [fs, setFs] = useState(false);
  const { t: zt, bg, setT, ctrl } = usePanZoom();
  const wrapRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ name: string; x: number; y: number; ox: number; oy: number; moved: boolean } | null>(null);
  useEffect(() => { setPos(mkInit()); setExp(new Set(shown.slice(0, 4).map((t) => t.name))); setSel(focus && focus[0] ? focus[0] : null); /* eslint-disable-next-line */ }, [code, focus]);
  useEffect(() => { const h = () => setFs(!!document.fullscreenElement); document.addEventListener("fullscreenchange", h); return () => document.removeEventListener("fullscreenchange", h); }, []);

  const groups = (t: Tbl) => { const f = fieldsOf(t); const pk = f.filter((x) => x[3] === "PK"), fk = f.filter((x) => x[3] === "FK"); const tech = f.filter((x) => x[3] !== "PK" && x[3] !== "FK" && TECH_FIELDS.has(x[0])).slice(0, 3); const biz = f.filter((x) => x[3] !== "PK" && x[3] !== "FK" && !TECH_FIELDS.has(x[0])).slice(0, 8); return { pk, fk, biz, tech }; };
  const cardH = (t: Tbl) => { if (!exp.has(t.name)) return 56; const g = groups(t); let h = headH + 8; [g.pk, g.fk, g.biz, g.tech].forEach((a) => { if (a.length) h += secH + a.length * rowH + 4; }); return h + 6; };
  const links: { a: string; b: string; card: string }[] = [];
  shown.forEach((t) => t.rel.forEach((r) => { if (names.has(r.table)) { const a = r.role === "parent" ? t.name : r.table, b = r.role === "parent" ? r.table : t.name; if (!links.find((l) => l.a === a && l.b === b)) links.push({ a, b, card: r.card || "1:N" }); } }));
  const neigh = (nm: string) => { const s = new Set([nm]); links.forEach((l) => { if (l.a === nm) s.add(l.b); if (l.b === nm) s.add(l.a); }); return s; };
  const active = sel ? neigh(sel) : null;
  const rows = Math.ceil(shown.length / cols);
  const vbW = Math.max(80 + cols * slotW, 900), vbH = Math.max(80 + rows * slotH, 520);
  const onCardDown = (e: React.PointerEvent, nm: string) => { e.stopPropagation(); const p = posns[nm]; drag.current = { name: nm, x: e.clientX, y: e.clientY, ox: p.x, oy: p.y, moved: false }; };
  const onMove = (e: React.PointerEvent) => { if (!drag.current) { bg.onPointerMove(e); return; } const d = drag.current; if (Math.abs(e.clientX - d.x) + Math.abs(e.clientY - d.y) > 3) d.moved = true; setPos((p) => ({ ...p, [d.name]: { x: d.ox + (e.clientX - d.x) / zt.k, y: d.oy + (e.clientY - d.y) / zt.k } })); };
  const onUp = () => { drag.current = null; bg.onPointerUp(); };
  const fit = () => { const xs = shown.map((t) => posns[t.name].x), x1s = shown.map((t) => posns[t.name].x + cardW); const ys = shown.map((t) => posns[t.name].y), y1s = shown.map((t) => posns[t.name].y + cardH(t)); const x0 = Math.min(...xs) - 30, y0 = Math.min(...ys) - 30, x1 = Math.max(...x1s) + 30, y1 = Math.max(...y1s) + 30; const k = Math.min(vbW / (x1 - x0), vbH / (y1 - y0), 1.4); setT({ k, x: -x0 * k + (vbW - (x1 - x0) * k) / 2, y: -y0 * k }); };
  const fullscreen = () => { const el = wrapRef.current; if (!el) return; document.fullscreenElement ? document.exitFullscreen() : el.requestFullscreen?.(); };
  const vx = -zt.x / zt.k, vy = -zt.y / zt.k, vw = vbW / zt.k, vh = vbH / zt.k, miniK = Math.min(168 / vbW, 112 / vbH);

  return (
    <div className="space-y-2">
      <style>{`@keyframes erdflow{to{stroke-dashoffset:-24}}.erd-flow{stroke-dasharray:7 5;animation:erdflow .8s linear infinite}`}</style>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-slate-200">ERD · {code} · {shown.length} טבלאות{focus && focus.length ? " (ממוקד)" : ""}</h3>
        <div className="flex items-center gap-1">
          {[[<Expand key="e" className="size-3" />, "הרחב", () => setExp(new Set(shown.map((t) => t.name)))], [<Shrink key="s" className="size-3" />, "כווץ", () => setExp(new Set())], [<Scan key="f" className="size-3" />, "התאם", fit], [<ZoomIn key="zi" className="size-3" />, "", ctrl.zoomIn], [<ZoomOut key="zo" className="size-3" />, "", ctrl.zoomOut], [<Maximize2 key="m" className="size-3" />, "מסך מלא", fullscreen]].map((b, i) => <button key={i} onClick={b[2] as () => void} className="flex items-center gap-1 rounded-md border border-white/10 bg-[#0e1626] px-2 py-1 text-xs font-bold text-slate-300 hover:border-white/30">{b[0] as React.ReactNode}{b[1] as string}</button>)}
        </div>
      </div>
      <div ref={wrapRef} className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0f17]" style={{ backgroundImage: "radial-gradient(#16223400 1px,transparent 0),radial-gradient(#1a2740 1px,transparent 1px)", backgroundSize: "22px 22px" }}>
        <div className="absolute right-2 top-2 z-10 flex gap-2 text-[10px] font-bold">{Object.entries(KIND_COLOR).map(([k, v]) => <span key={k} className="rounded bg-black/40 px-2 py-0.5 ring-1 ring-white/10" style={{ color: v }}>{k}</span>)}</div>
        <svg viewBox={`0 0 ${vbW} ${vbH}`} className={`w-full touch-none ${fs ? "h-screen" : "h-[70vh] min-h-[520px]"}`} onWheel={bg.onWheel} onPointerDown={(e) => { bg.onPointerDown(e); if (!(e.target as Element).closest("[data-card]")) setSel(null); }} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}>
          <g transform={`translate(${zt.x},${zt.y}) scale(${zt.k})`}>
            {links.map((l, i) => { const A = posns[l.a], B = posns[l.b], TA = byName[l.a]; if (!A || !B || !TA) return null;
              const ax = A.x + cardW / 2, ay = A.y + cardH(TA), bx = B.x + cardW / 2, by = B.y, my = (ay + by) / 2;
              const kind = cardKind(l.card), kc = KIND_COLOR[kind];
              const onSel = active ? (active.has(l.a) && active.has(l.b) && (l.a === sel || l.b === sel)) : false, onHv = hv ? (l.a === hv || l.b === hv) : false, dim = active && !onSel, emph = onSel || onHv;
              return <g key={i} opacity={dim ? 0.1 : 1}>
                <path d={`M${ax},${ay} C${ax},${my} ${bx},${my} ${bx},${by}`} fill="none" stroke={emph ? kc : "#3a4a63"} strokeWidth={emph ? 2.4 : 1.3} className={onSel ? "erd-flow" : ""} />
                <line x1={ax - 7} y1={ay + 4} x2={ax + 7} y2={ay + 4} stroke={emph ? kc : "#3a4a63"} strokeWidth={emph ? 2.4 : 1.3} />
                <path d={`M${bx - 6},${by - 9} L${bx},${by} M${bx + 6},${by - 9} L${bx},${by} M${bx},${by - 11} L${bx},${by}`} stroke={emph ? kc : "#3a4a63"} strokeWidth={emph ? 2.4 : 1.3} fill="none" />
                <rect x={(ax + bx) / 2 - 17} y={my - 9} width={34} height={18} rx={4} fill={emph ? kc : "#1e293b"} /><text x={(ax + bx) / 2} y={my + 4} textAnchor="middle" style={{ font: "700 10px ui-monospace" }} className={emph ? "fill-black" : "fill-slate-300"}>{kind}</text>
              </g>; })}
            {shown.map((t) => { const p = posns[t.name]; const c = color(t.mod); const ch = cardH(t); const isExp = exp.has(t.name); const g = groups(t); const dim = active && !active.has(t.name); const isSel = sel === t.name; let yy = headH + 8;
              const section = (label: string, arr: Field[], cls: string, badge?: string) => { if (!arr.length) return null; const sy = yy; yy += secH; const ry0 = yy; yy += arr.length * rowH + 4;
                return <g key={label}><text x={cardW - 10} y={sy + 12} textAnchor="end" style={{ font: "700 9px sans-serif" }} className="fill-slate-500">{label}</text>
                  {arr.map((f, j) => { const ry = ry0 + j * rowH; return <g key={f[0]} transform={`translate(0,${ry})`}><rect x={1} width={cardW - 2} height={rowH} fill={j % 2 ? "#0c1422" : "#0e1828"} />
                    <text x={10} y={14} direction="ltr" style={{ font: `${badge === "PK" ? 700 : 500} 11px ui-monospace`, textDecoration: badge === "PK" ? "underline" : "none" }} className={cls}>{f[0]}</text>
                    {badge ? <text x={cardW - 9} y={14} textAnchor="end" style={{ font: "700 8px ui-monospace" }} className={cls}>{badge}</text> : (f[2] && <text x={cardW - 9} y={14} textAnchor="end" style={{ font: "500 9px sans-serif" }} className="fill-slate-500">{f[2].length > 13 ? f[2].slice(0, 12) + "…" : f[2]}</text>)}
                  </g>; })}</g>; };
              return <g key={t.name} data-card transform={`translate(${p.x},${p.y})`} opacity={dim ? 0.18 : 1} className="cursor-pointer"
                onPointerDown={(e) => onCardDown(e, t.name)} onClick={() => { if (drag.current?.moved) return; setSel(t.name); }} onDoubleClick={() => onTable(t.name)} onMouseEnter={() => setHv(t.name)} onMouseLeave={() => setHv(null)}>
                <rect width={cardW} height={ch} rx={10} fill="#0e1828" stroke={isSel ? "#f2c14e" : c} strokeWidth={isSel ? 2.5 : 1.3} style={{ filter: isSel ? "drop-shadow(0 0 16px rgba(242,193,78,.35))" : "drop-shadow(0 4px 10px rgba(0,0,0,.5))" }} />
                <path d={`M0,10 a10,10 0 0 1 10,-10 h${cardW - 20} a10,10 0 0 1 10,10 v${headH - 10} h-${cardW} z`} fill={c} />
                <text x={11} y={18} style={{ font: "800 13px ui-monospace" }} className="fill-white" direction="ltr">{t.name}</text>
                <text x={11} y={31} style={{ font: "500 9px sans-serif" }} className="fill-white/90">{(t.he || t.en).slice(0, 26)}</text>
                <g onPointerDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); setExp((s) => { const n = new Set(s); n.has(t.name) ? n.delete(t.name) : n.add(t.name); return n; }); }}>
                  <rect x={cardW - 27} y={9} width={18} height={18} rx={4} fill="#ffffff35" /><text x={cardW - 18} y={22} textAnchor="middle" style={{ font: "800 13px sans-serif" }} className="fill-white">{isExp ? "−" : "+"}</text></g>
                {!isExp && <text x={cardW / 2} y={48} textAnchor="middle" style={{ font: "600 10px ui-monospace" }} className="fill-slate-400">{g.pk.length} PK · {g.fk.length} FK · {fieldsOf(t).length} fld</text>}
                {isExp && <>{section("PRIMARY KEY", g.pk, "fill-amber-400", "PK")}{section("FOREIGN KEYS", g.fk, "fill-sky-400", "FK")}{section("BUSINESS", g.biz, "fill-slate-200")}{section("TECHNICAL", g.tech, "fill-slate-500")}</>}
              </g>; })}
          </g>
        </svg>
        <div className="absolute bottom-2 left-2 z-10 rounded-md border border-white/10 bg-black/50 p-1">
          <svg width={172} height={116} className="block"><g transform={`scale(${miniK})`}>{shown.map((t) => { const p = posns[t.name]; return <rect key={t.name} x={p.x} y={p.y} width={cardW} height={cardH(t)} rx={6} fill={color(t.mod)} opacity={0.55} />; })}<rect x={vx} y={vy} width={vw} height={vh} fill="none" stroke="#f2c14e" strokeWidth={6 / miniK} /></g></svg>
        </div>
        {inspector}
      </div>
      <p className="text-[11px] text-slate-500">לחיצה = בחירה (מדגיש שרשרת) · דאבל-קליק = פתיחת מפרט צף · גרירה · + / − הרחבה · גלגלת = זום · מסך מלא</p>
    </div>
  );
}

/* ===================== FLOATING INSPECTOR ===================== */
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
  const S = ({ title, children }: { title: string; children: React.ReactNode }) => <div className="border-t border-white/10 px-3.5 py-2.5"><h4 className="mb-1.5 text-[10px] font-bold uppercase tracking-wide" style={{ color: c }}>{title}</h4>{children}</div>;
  const Pills = ({ a, click }: { a: string[]; click?: boolean }) => a.length ? <div className="flex flex-wrap gap-1">{a.map((x) => click && byName[x] ? <button key={x} onClick={() => onGo(x)} className="rounded border px-1.5 py-0.5 font-mono text-[11px] font-bold hover:bg-white/10" style={{ borderColor: c, color: c }}>{x}</button> : <span key={x} className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-300">{x}</span>)}</div> : <span className="text-[11px] italic text-slate-500">—</span>;
  return (
    <div className="absolute z-40 max-h-[88%] w-[340px] overflow-auto rounded-xl border border-white/15 bg-[#0c1422]/95 shadow-2xl backdrop-blur-md" style={{ insetInlineStart: 12 + p.x, top: 12 + p.y }} dir="rtl">
      <div className="sticky top-0 z-10 flex cursor-grab items-start justify-between gap-2 border-b border-white/10 bg-[#0e1626] px-3.5 py-2.5 active:cursor-grabbing" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={() => (drag.current = null)}>
        <div className="min-w-0"><div className="flex items-center gap-2"><GripVertical className="size-3.5 text-slate-500" /><span className="font-mono text-lg font-extrabold text-white" dir="ltr">{t.name}</span><span className="rounded px-1.5 py-0.5 text-[10px] font-bold text-white" style={{ background: c }}>{t.mod}</span></div><p className="mt-0.5 truncate text-xs text-slate-400">{t.he || t.en}</p></div>
        <button onClick={onClose} className="rounded p-1 text-slate-400 hover:bg-white/10"><X className="size-4" /></button>
      </div>
      <S title="מטרה עסקית"><p className="text-xs leading-relaxed text-slate-300">{bp?.purpose || `טבלת ${t.mod} — ${t.he || t.en}`}</p></S>
      <div className="grid grid-cols-2"><S title={`PK`}><div className="flex items-center gap-1"><KeyRound className="size-3 text-amber-400" /><Pills a={pk} /></div></S><S title="FK"><div className="flex items-center gap-1"><Link2 className="size-3 text-sky-400" /><Pills a={fk} /></div></S></div>
      <S title={`שדות (${flds.length})`}><table className="w-full text-right font-mono text-[11px]" dir="ltr"><tbody>{flds.slice(0, 20).map((f) => <tr key={f[0]} className="border-b border-white/5 last:border-0"><td className={`py-0.5 ${f[3] === "PK" ? "font-bold text-amber-400 underline" : f[3] === "FK" ? "text-sky-400" : "text-slate-300"}`}>{f[0]}</td><td className="py-0.5 text-slate-500">{f[1]}</td><td className="py-0.5 text-left">{f[3] !== "-" && <span className={`rounded px-1 text-[9px] font-bold ${f[3] === "PK" ? "bg-amber-400/20 text-amber-300" : "bg-sky-400/20 text-sky-300"}`}>{f[3]}</span>}</td></tr>)}</tbody></table></S>
      <S title="טבלאות אב"><Pills a={parents} click /></S>
      <S title="טבלאות צאצא"><Pills a={children} click /></S>
      <S title="Where-Used"><Pills a={whereUsed} click /></S>
      <S title="טרנזקציות"><span className="font-mono text-xs text-slate-300">{t.tcodes || "—"}</span></S>
      <S title="דוחות"><Pills a={MOD_REPORTS[t.mod] || []} /></S>
      <S title="BAPIs / FM"><Pills a={(t.funcs || []).slice(0, 6)} /></S>
      <S title="CDS Views"><Pills a={t.cds || []} /></S>
      {t.fiori && <S title="Fiori"><span className="text-xs text-slate-300">{t.fiori}</span></S>}
      <S title="ECC → S/4HANA"><p className="text-xs text-slate-300">{t.s4 || "אין שינוי מהותי."}</p>{t.s4alt && <p className="mt-0.5 text-[11px] text-slate-400">חלופה: <span className="font-mono font-bold text-slate-200">{t.s4alt}</span></p>}</S>
      <S title="רשומות לדוגמה"><div className="overflow-auto rounded border border-white/10"><table className="w-full text-left font-mono text-[10.5px]" dir="ltr"><thead className="bg-white/5"><tr>{ex.cols.map((c2) => <th key={c2} className="px-2 py-1 font-bold text-slate-400">{c2}</th>)}</tr></thead><tbody>{ex.rows.map((r, i) => <tr key={i} className="border-t border-white/5">{r.map((v, j) => <td key={j} className="px-2 py-1 text-slate-300">{v}</td>)}</tr>)}</tbody></table></div></S>
    </div>
  );
}
