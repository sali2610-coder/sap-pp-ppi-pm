"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, ZoomIn, ZoomOut, Maximize2, Crosshair, ArrowLeft, ExternalLink, Target, Briefcase, AlertTriangle, GitBranch, X, Plus, Minus, RotateCcw, Layers as LayersIcon } from "lucide-react";
import { buildHetero, layoutSubset, layoutZoned, FLOWS, MODES, KIND_META, S4_COLOR, ZONES, zoneOf, type SHetero, type SKind, type ZoneBand, type Zone } from "@/lib/studio-graph";
import { lookupEntity } from "@/lib/entity-lookup";
import { setActiveEntity } from "@/lib/workspace";
import type { Module } from "@/lib/types";

const MOD_COLOR: Record<string, string> = { PM: "#f97316", "PP-PI": "#6d28d9" };
const DEFAULT_FOCUS: Record<string, string> = { PM: "EQUI", "PP-PI": "AFKO" };
const SKEY = "neo:studio:v2";

export function ArchitectureStudio() {
  const [module, setModule] = useState<Module>("PM");
  const h: SHetero = useMemo(() => buildHetero(module), [module]);
  const [modeId, setModeId] = useState("tables");
  const mode = MODES.find((m) => m.id === modeId) || MODES[0];
  const [kindFilter, setKindFilter] = useState<Set<SKind>>(new Set(mode.kinds));
  const [zoneFilter, setZoneFilter] = useState<Set<Zone>>(new Set());
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [lifeOnly, setLifeOnly] = useState(false);
  const [edgesOn, setEdgesOn] = useState(true);
  const [tr, setTr] = useState({ x: 0, y: 0, k: 1 });
  const [sel, setSel] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [wrapSize, setWrapSize] = useState({ w: 800, h: 560 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const restored = useRef(false);
  const accent = MOD_COLOR[module];
  const flowSet = useMemo(() => new Set((FLOWS[module] || []).map((s) => s.code)), [module]);

  const inScope = (id: string) => { const n = h.nodes.get(id); return !!n && mode.kinds.includes(n.kind) && kindFilter.has(n.kind); };
  const scopeNbrs = (id: string) => [...(h.adj.get(id) || [])].filter(inScope);

  const visible = useMemo(() => {
    if (mode.behavior === "full") {
      let ids = h.tables;
      if (mode.master) ids = ids.filter((id) => h.master.has(id));
      if (zoneFilter.size > 0) ids = ids.filter((id) => zoneFilter.has(zoneOf(id)));
      return new Set(ids);
    }
    return revealed;
  }, [mode, h, revealed, zoneFilter]);

  const layout = useMemo(() => (mode.behavior === "full" ? layoutZoned(visible, h) : { ...layoutSubset(visible, h), bands: [] as ZoneBand[] }), [visible, h, mode.behavior]);

  // ── saved state: restore once, then persist (debounced) ──
  useEffect(() => {
    try { const s = JSON.parse(localStorage.getItem(SKEY) || "null"); if (s && s.module) { setModule(s.module); setModeId(s.modeId || "tables"); setZoneFilter(new Set(s.zoneFilter || [])); setKindFilter(new Set(s.kindFilter || [])); if (s.revealed) setRevealed(new Set(s.revealed)); if (s.sel) setSel(s.sel); if (s.tr) setTr(s.tr); restored.current = true; } } catch { /* noop */ }
  }, []);
  const saveT = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (saveT.current) clearTimeout(saveT.current);
    saveT.current = setTimeout(() => { try { localStorage.setItem(SKEY, JSON.stringify({ module, modeId, tr, sel, revealed: [...revealed], zoneFilter: [...zoneFilter], kindFilter: [...kindFilter] })); } catch { /* noop */ } }, 450);
  }, [module, modeId, tr, sel, revealed, zoneFilter, kindFilter]);

  // reset on mode/module change (unless this is the restore pass)
  useEffect(() => {
    if (restored.current) { restored.current = false; return; }
    setKindFilter(new Set(mode.kinds)); setSel(null); setLifeOnly(false);
    if (mode.behavior === "expand") { const f = DEFAULT_FOCUS[module]; setRevealed(new Set([f, ...scopeNbrs(f)])); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modeId, module]);

  const measure = () => { const el = wrapRef.current; if (el) setWrapSize({ w: el.clientWidth, h: el.clientHeight }); };
  const fit = () => { const el = wrapRef.current; if (!el || !layout.width) return; measure(); const k = Math.min(el.clientWidth / (layout.width + 50), el.clientHeight / (layout.height + 50), 1.5); setTr({ k, x: (el.clientWidth - layout.width * k) / 2, y: (el.clientHeight - layout.height * k) / 2 }); };
  useEffect(() => { const id = setTimeout(() => { measure(); }, 30); window.addEventListener("resize", measure); return () => { clearTimeout(id); window.removeEventListener("resize", measure); }; }, []);
  useEffect(() => { const id = setTimeout(fit, 40); return () => clearTimeout(id); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [layout.width, layout.height, module]);

  const onWheel = (e: React.WheelEvent) => { const el = wrapRef.current; if (!el) return; const r = el.getBoundingClientRect(); const px = e.clientX - r.left, py = e.clientY - r.top; const nk = Math.min(2.6, Math.max(0.14, tr.k * (1 - e.deltaY * 0.0014))); const f = nk / tr.k; setTr({ k: nk, x: px - (px - tr.x) * f, y: py - (py - tr.y) * f }); };
  const onDown = (e: React.PointerEvent) => { if ((e.target as Element).closest("[data-node]")) return; drag.current = { x: e.clientX, y: e.clientY, ox: tr.x, oy: tr.y }; setSel(null); };
  const onMove = (e: React.PointerEvent) => { if (drag.current) setTr((p) => ({ ...p, x: drag.current!.ox + (e.clientX - drag.current!.x), y: drag.current!.oy + (e.clientY - drag.current!.y) })); };
  const zoom = (d: number) => { const el = wrapRef.current; if (!el) return; const cw = el.clientWidth / 2, ch = el.clientHeight / 2; const nk = Math.min(2.6, Math.max(0.14, tr.k * d)); const f = nk / tr.k; setTr({ k: nk, x: cw - (cw - tr.x) * f, y: ch - (ch - tr.y) * f }); };
  const centerOn = (id: string) => { const n = layout.nodes.find((x) => x.id === id); const el = wrapRef.current; if (!n || !el) return; const k = Math.max(tr.k, 0.85); setTr({ k, x: el.clientWidth / 2 - n.x * k, y: el.clientHeight / 2 - n.y * k }); setSel(id); };

  // selecting a node makes it the workspace-wide active context
  useEffect(() => { if (sel) setActiveEntity(h.nodes.get(sel)?.label || sel); }, [sel, h]);

  const expand = (id: string) => setRevealed((r) => new Set([...r, ...scopeNbrs(id)]));
  const collapse = (id: string) => setRevealed((r) => { const next = new Set(r); const keep = new Set([DEFAULT_FOCUS[module]]); for (const b of scopeNbrs(id)) { if (keep.has(b)) continue; const deg = [...(h.adj.get(b) || [])].filter((x) => next.has(x) && inScope(x)).length; if (deg <= 1) next.delete(b); } return next; });
  const onNodeClick = (id: string) => { if (mode.behavior === "expand") { expand(id); setSel(id); } else setSel(sel === id ? null : id); };
  const hasHidden = (id: string) => mode.behavior === "expand" && scopeNbrs(id).some((b) => !visible.has(b));

  const active = sel || hover;
  const activeNbr = active ? new Set([...(h.adj.get(active) || [])].filter((b) => visible.has(b))) : new Set<string>();
  const dimNode = (id: string) => {
    if (lifeOnly && !flowSet.has(id) && id !== active && !activeNbr.has(id)) return 0.12;
    if (active && id !== active && !activeNbr.has(id)) return 0.16;
    return 1;
  };

  const hits = q.trim().length >= 1 ? [...h.nodes.values()].filter((n) => `${n.label} ${n.he}`.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 8) : [];
  const pickSearch = (id: string) => { if (mode.behavior === "expand" && !visible.has(id)) setRevealed((r) => new Set([...r, id, ...scopeNbrs(id)])); setQ(""); setTimeout(() => centerOn(id), 60); };

  const tip = active ? lookupEntity(h.nodes.get(active)?.label || active) : null;
  const tipNode = active ? h.nodes.get(active) : null;
  const selNbrs = active ? [...activeNbr] : [];
  const nodeColor = (kind: SKind, s4?: string) => (mode.colorBy === "s4" && s4 ? S4_COLOR[s4 as keyof typeof S4_COLOR] : KIND_META[kind].c);
  const zonesPresent = useMemo(() => ZONES.filter((z) => h.tables.some((id) => zoneOf(id) === z.id)), [h]);

  // mini-map geometry
  const MM_W = 168, MM_H = 116;
  const mmK = Math.min(MM_W / (layout.width || 1), MM_H / (layout.height || 1));
  const vp = { x: (-tr.x / tr.k) * mmK, y: (-tr.y / tr.k) * mmK, w: (wrapSize.w / tr.k) * mmK, h: (wrapSize.h / tr.k) * mmK };
  const miniClick = (e: React.MouseEvent) => { const r = (e.currentTarget as HTMLElement).getBoundingClientRect(); const gx = (e.clientX - r.left) / mmK, gy = (e.clientY - r.top) / mmK; const el = wrapRef.current; if (!el) return; setTr((p) => ({ ...p, x: el.clientWidth / 2 - gx * p.k, y: el.clientHeight / 2 - gy * p.k })); };

  return (
    <div className="mx-auto max-w-[1700px]" dir="rtl">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-400"><Link href="/" className="hover:text-slate-700">בית</Link><ArrowLeft className="size-3" /><span className="font-bold text-slate-700">SAP Architecture Studio</span></div>
        <div className="flex items-center gap-1.5 rounded-xl bg-slate-100 p-1">
          {(["PM", "PP-PI"] as Module[]).map((m) => <button key={m} onClick={() => setModule(m)} className={`rounded-lg px-3 py-1.5 text-[13px] font-extrabold transition ${module === m ? "text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`} style={module === m ? { background: MOD_COLOR[m] } : undefined}>{m}</button>)}
        </div>
      </div>

      {/* exploration modes */}
      <div className="mb-2 flex flex-wrap gap-1.5">
        {MODES.map((m) => <button key={m.id} onClick={() => setModeId(m.id)} className={`rounded-xl px-3 py-1.5 text-[12.5px] font-bold transition ${modeId === m.id ? "text-white shadow-sm" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`} style={modeId === m.id ? { background: accent } : undefined}>{m.he}</button>)}
      </div>

      {/* quick filters (zones) */}
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-extrabold text-slate-400">מסננים מהירים:</span>
        {zonesPresent.map((z) => { const on = zoneFilter.has(z.id); return <button key={z.id} onClick={() => setZoneFilter((s) => { const n = new Set(s); if (n.has(z.id)) n.delete(z.id); else n.add(z.id); return n; })} className="rounded-full px-2.5 py-1 text-[11px] font-bold transition" style={on ? { background: z.c, color: "#fff" } : { background: z.c + "14", color: z.c }}>{z.he}</button>; })}
        {zoneFilter.size > 0 && <button onClick={() => setZoneFilter(new Set())} className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-500 hover:bg-slate-200">נקה</button>}
      </div>

      {/* layers + lifecycle + reset */}
      <div className="mb-3 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2.5">
        <span className="flex items-center gap-1 text-[11px] font-extrabold text-slate-400"><LayersIcon className="size-3.5" />שכבות:</span>
        {mode.kinds.map((kd) => { const on = kindFilter.has(kd); return <button key={kd} onClick={() => setKindFilter((s) => { const n = new Set(s); if (n.has(kd)) { if (kd !== "table") n.delete(kd); } else n.add(kd); return n; })} className="flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold transition" style={on ? { background: KIND_META[kd].c, color: "#fff" } : { background: KIND_META[kd].c + "14", color: KIND_META[kd].c }}><span className="size-1.5 rounded-full" style={{ background: on ? "#fff" : KIND_META[kd].c }} />{KIND_META[kd].he}</button>; })}
        <button onClick={() => setEdgesOn((v) => !v)} className={`rounded-lg px-2 py-1 text-[11px] font-bold transition ${edgesOn ? "bg-slate-700 text-white" : "bg-slate-100 text-slate-400"}`}>קשתות</button>
        <span className="mx-1 h-4 w-px bg-slate-200" />
        <button onClick={() => setLifeOnly((v) => !v)} className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${lifeOnly ? "text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`} style={lifeOnly ? { background: accent } : undefined}>מחזור חיים</button>
        {mode.behavior === "expand" && <button onClick={() => { const f = DEFAULT_FOCUS[module]; setRevealed(new Set([f, ...scopeNbrs(f)])); setSel(null); }} className="flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500 hover:bg-slate-200"><RotateCcw className="size-3" />אפס</button>}
        {mode.colorBy === "s4" && <span className="ms-auto flex items-center gap-2 text-[10px] font-bold">{[["kept", "נשמר"], ["replaced", "הוחלף"], ["removed", "הוסר"]].map(([k, l]) => <span key={k} className="flex items-center gap-1"><span className="size-2 rounded-full" style={{ background: S4_COLOR[k as keyof typeof S4_COLOR] }} />{l}</span>)}</span>}
        <span className="ms-auto text-[11px] font-bold text-slate-400">{visible.size} מוצגים{mode.behavior === "expand" ? " · לחץ צומת להרחבה" : ""}</span>
      </div>

      {/* business-flow timeline */}
      <div className="mb-3 flex flex-wrap items-center gap-1.5 rounded-2xl border border-slate-200 bg-white p-2.5">
        <span className="px-1 text-[11px] font-extrabold text-slate-400">זרימה עסקית:</span>
        {(FLOWS[module] || []).map((s, i, arr) => { const on = sel === s.code; return <span key={s.code} className="flex items-center gap-1.5">
          <button onClick={() => pickSearch(s.code)} className={`rounded-lg px-2.5 py-1 text-[11.5px] font-bold transition ${on ? "text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`} style={on ? { background: accent } : undefined}>{s.label}<span className="ms-1 font-mono text-[9px] opacity-70" dir="ltr">{s.code}</span></button>
          {i < arr.length - 1 && <ArrowLeft className="size-3.5 shrink-0 text-slate-300" />}</span>; })}
      </div>

      {/* split view: graph left, workspace right (graph always visible) */}
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="relative">
          <div className="absolute right-3 top-3 z-30 w-64 max-w-[70%]">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/95 px-3 py-2 shadow-sm backdrop-blur"><Search className="size-4 shrink-0 text-slate-400" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חפש אובייקט…" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-300" dir="ltr" /></div>
            {hits.length > 0 && <div className="mt-1 max-h-64 overflow-auto rounded-xl border border-slate-200 bg-white p-1 shadow-2xl">{hits.map((n) => <button key={n.id} onClick={() => pickSearch(n.id)} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-right hover:bg-slate-50"><span className="size-2 rounded-full" style={{ background: KIND_META[n.kind].c }} /><span className="tech flex-1 truncate font-mono text-sm font-bold text-slate-800" dir="ltr">{n.label}</span><span className="rounded bg-slate-100 px-1.5 text-[9px] font-bold text-slate-500">{KIND_META[n.kind].he}</span></button>)}</div>}
          </div>
          <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1 rounded-xl border border-slate-200 bg-white/95 p-1 shadow-sm backdrop-blur">
            <button onClick={() => zoom(1.25)} className="grid size-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"><ZoomIn className="size-4" /></button>
            <span className="px-1 font-mono text-xs font-bold text-slate-400">{Math.round(tr.k * 100)}%</span>
            <button onClick={() => zoom(0.8)} className="grid size-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"><ZoomOut className="size-4" /></button>
            <button onClick={fit} title="התאם" className="grid size-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"><Maximize2 className="size-4" /></button>
          </div>

          {/* mini map */}
          {layout.nodes.length > 0 && (
            <div className="absolute bottom-3 left-3 z-30 overflow-hidden rounded-xl border border-slate-200 bg-white/95 shadow-sm backdrop-blur" style={{ width: MM_W, height: MM_H }} onClick={miniClick} role="button" aria-label="מפת ניווט">
              <svg width={MM_W} height={MM_H}>
                {layout.nodes.map((n) => <rect key={n.id} x={(n.x - n.w / 2) * mmK} y={(n.y - n.h / 2) * mmK} width={Math.max(2, n.w * mmK)} height={Math.max(2, n.h * mmK)} rx={1} fill={n.id === sel ? accent : nodeColor(n.kind, n.s4) + "99"} />)}
                <rect x={vp.x} y={vp.y} width={vp.w} height={vp.h} fill={accent + "18"} stroke={accent} strokeWidth={1.5} rx={2} />
              </svg>
            </div>
          )}

          <div ref={wrapRef} className="relative h-[calc(100vh-19rem)] min-h-[460px] cursor-grab touch-none overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/70 active:cursor-grabbing"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px,#d7deea 1px,transparent 0)", backgroundSize: "26px 26px" }}
            onWheel={onWheel} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={() => (drag.current = null)} onPointerLeave={() => { drag.current = null; setHover(null); }}>
            <div style={{ transform: `translate(${tr.x}px,${tr.y}px) scale(${tr.k})`, transformOrigin: "0 0", width: layout.width, height: layout.height, position: "absolute", transition: drag.current ? "none" : "transform .18s ease-out" }}>
              {layout.bands.map((z) => (
                <div key={z.id} className="absolute top-0 border-x border-dashed" style={{ left: z.x, width: z.w, height: layout.height, background: z.c + "07", borderColor: z.c + "22" }}>
                  <div className="sticky top-2 mx-2 mt-2 rounded-lg px-2 py-1 text-center text-[12px] font-extrabold text-white shadow-sm" style={{ background: z.c }}>{z.he}</div>
                </div>
              ))}
              {edgesOn && <svg width={layout.width} height={layout.height} className="absolute inset-0 overflow-visible">
                {layout.edges.map((e) => { const hot = active != null && (e.from === active || e.to === active); const pts = e.points.length >= 2 ? e.points : []; const d = pts.length ? pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") : ""; return d ? <path key={e.id} d={d} fill="none" stroke={hot ? accent : "#cbd5e1"} strokeWidth={hot ? 2.4 : 1.1} strokeOpacity={active && !hot ? 0.15 : hot ? 0.95 : 0.55} className="transition-all duration-300" /> : null; })}
              </svg>}
              {layout.nodes.map((n) => { const col = nodeColor(n.kind, n.s4); const on = n.id === sel; const isHover = n.id === hover; const op = dimNode(n.id); return (
                <button key={n.id} data-node onMouseEnter={() => setHover(n.id)} onMouseLeave={() => setHover(null)} onClick={() => onNodeClick(n.id)}
                  className="absolute flex flex-col items-start justify-center rounded-xl border-2 bg-white px-2 text-right shadow-sm transition-all duration-300 hover:z-10 hover:shadow-lg"
                  style={{ left: n.x - n.w / 2, top: n.y - n.h / 2, width: n.w, height: n.h, opacity: op, borderColor: on || isHover ? col : col + "55", boxShadow: on ? `0 0 0 5px ${col}22` : undefined }}>
                  <span className="flex w-full items-center gap-1">
                    {n.kind !== "table" && <span className="size-1.5 shrink-0 rounded-full" style={{ background: col }} />}
                    <span className="tech truncate font-mono text-[12px] font-extrabold text-slate-900" dir="ltr">{n.label}</span>
                    {hasHidden(n.id) && <span className="ms-auto grid size-3.5 shrink-0 place-items-center rounded-full text-white" style={{ background: col }}><Plus className="size-2.5" /></span>}
                  </span>
                  {n.kind === "table" && n.he && <span className="w-full truncate text-[9px] text-slate-400">{n.he}</span>}
                </button>
              ); })}
            </div>
            {visible.size === 0 && <div className="absolute inset-0 grid place-items-center text-sm text-slate-400">אין צמתים — נקה מסננים או בחר מצב אחר</div>}
          </div>
        </div>

        {/* workspace panel — updates instantly on select */}
        <aside className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-auto">
          {tip || tipNode ? (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: nodeColor(tipNode!.kind, tipNode!.s4) }}>{KIND_META[tipNode!.kind].he}</span><span className="tech font-mono text-lg font-extrabold text-slate-900" dir="ltr">{tipNode!.label}</span></div>
                {sel && <button onClick={() => setSel(null)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"><X className="size-4" /></button>}
              </div>
              {(tip?.he || tipNode?.he) && <p className="text-[13px] font-semibold leading-relaxed text-slate-700">{tip?.he || tipNode?.he}</p>}
              {tip?.purpose && <p className="flex gap-1.5 text-[12.5px] leading-relaxed text-slate-600"><Target className="mt-0.5 size-3.5 shrink-0 text-blue-500" />{tip.purpose}</p>}
              {tip?.consultantTip && <p className="flex gap-1.5 text-[12.5px] leading-relaxed text-slate-600"><Briefcase className="mt-0.5 size-3.5 shrink-0 text-violet-500" />{tip.consultantTip}</p>}
              {tip?.mistake && <p className="flex gap-1.5 text-[12.5px] leading-relaxed text-slate-600"><AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-rose-500" />{tip.mistake}</p>}
              {mode.behavior === "expand" && tipNode && (
                <div className="flex gap-2">
                  {scopeNbrs(active!).some((b) => !visible.has(b)) && <button onClick={() => expand(active!)} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border-2 px-3 py-2 text-[12px] font-bold transition" style={{ borderColor: accent, color: accent }}><Plus className="size-4" />הרחב ({scopeNbrs(active!).filter((b) => !visible.has(b)).length})</button>}
                  {scopeNbrs(active!).some((b) => visible.has(b)) && <button onClick={() => collapse(active!)} className="flex items-center justify-center gap-1.5 rounded-xl border-2 border-slate-200 px-3 py-2 text-[12px] font-bold text-slate-500 transition hover:border-slate-300"><Minus className="size-4" />כווץ</button>}
                </div>
              )}
              {selNbrs.length > 0 && <div><div className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase text-slate-400"><GitBranch className="size-3" />מחובר ל-{selNbrs.length} מוצגים</div><div className="flex flex-wrap gap-1">{selNbrs.slice(0, 18).map((id) => { const nn = h.nodes.get(id)!; return <button key={id} onClick={() => centerOn(id)} className="tech rounded-md px-1.5 py-0.5 text-[10.5px] font-bold hover:brightness-110" style={{ background: KIND_META[nn.kind].c + "18", color: KIND_META[nn.kind].c }} dir="ltr">{nn.label}</button>; })}</div></div>}
              {tip?.href && <Link href={tip.href} className="mt-1 flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-[13px] font-extrabold text-white shadow-sm transition active:scale-95" style={{ background: accent }}><ExternalLink className="size-4" />פתח עמוד מלא</Link>}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 py-10 text-center text-slate-400">
              <Crosshair className="size-8 text-slate-300" />
              <p className="text-sm font-bold text-slate-500">רחף או לחץ על אובייקט</p>
              <p className="text-[12px] leading-relaxed">בחר מצב חקירה, סנן לפי אזור, והפעל/כבה שכבות — בלי לאבד הקשר. הגרף תמיד גלוי, סביבת העבודה מימין מתעדכנת מיד.</p>
            </div>
          )}
        </aside>
      </div>
      <p className="mt-3 pb-4 text-center text-[11px] text-slate-400">קשרים אמיתיים מתוך מודל הנתונים — ללא המצאה · המצב נשמר אוטומטית. <Link href={module === "PM" ? "/pm/" : "/pp-pi/"} className="font-bold text-brand">חזרה למרכז {module}</Link></p>
    </div>
  );
}
