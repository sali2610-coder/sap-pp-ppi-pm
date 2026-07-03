"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Search, ZoomIn, ZoomOut, Maximize2, Crosshair, ArrowLeft, ExternalLink, Target, Briefcase,
  AlertTriangle, GitBranch, X, Plus, Minus, RotateCcw, SlidersHorizontal, Sparkles, Keyboard,
  Database, Terminal, Plug, FunctionSquare, Cable, Sigma, LayoutGrid, Compass, MousePointerClick,
  BookOpen, MapPin, ArrowLeftRight, Info,
} from "lucide-react";
import { buildHetero, layoutSubset, layoutZoned, FLOWS, MODES, KIND_META, S4_COLOR, ZONES, zoneOf, type SHetero, type SKind, type ZoneBand, type Zone } from "@/lib/studio-graph";
import { lookupEntity } from "@/lib/entity-lookup";
import { setActiveEntity } from "@/lib/workspace";
import type { Module } from "@/lib/types";

const MOD_COLOR: Record<string, string> = { PM: "#f97316", "PP-PI": "#6d28d9" };
const DEFAULT_FOCUS: Record<string, string> = { PM: "EQUI", "PP-PI": "AFKO" };
const SKEY = "neo:studio:v2";
const COACH_KEY = "neo:studio:coach:v2";

const KIND_ICON: Record<SKind, typeof Database> = {
  table: Database, tcode: Terminal, bapi: Plug, fm: FunctionSquare, idoc: Cable, cds: Sigma, fiori: LayoutGrid,
};
// Self-explanatory toolbar copy — every control says what it does + what happens.
const MODE_HINT: Record<string, string> = {
  tables: "כל הטבלאות של המודול, מסודרות באזורים — מפת העל",
  business: "הטבלאות לאורך התהליך העסקי מקצה לקצה",
  masterdata: "רק נתוני האב המרכזיים — הליבה שעליה הכול נשען",
  eccs4: "צביעה לפי גורל S/4HANA: נשמר · הוחלף · הוסר",
  transactions: "התחל מאובייקט מרכזי ולחץ צמתים לחשיפת הטרנזקציות",
  integration: "BAPIs ו-IDocs המחוברים — שכבת האינטגרציה",
  cds: "תצוגות CDS הבנויות מעל הטבלאות (S/4)",
  bapi: "ממשקי BAPI ו-Function Modules",
  fiori: "אפליקציות Fiori הקשורות לכל אובייקט",
};
const ZONE_HE: Record<string, string> = Object.fromEntries(ZONES.map((z) => [z.id, z.he]));

export function ArchitectureStudio() {
  const reduce = useReducedMotion();
  const [module, setModule] = useState<Module>("PM");
  const h: SHetero = useMemo(() => buildHetero(module), [module]);
  const [modeId, setModeId] = useState("tables");
  const mode = MODES.find((m) => m.id === modeId) || MODES[0];
  const [kindFilter, setKindFilter] = useState<Set<SKind>>(new Set(mode.kinds));
  const [zoneFilter, setZoneFilter] = useState<Set<Zone>>(new Set());
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [lifeOnly, setLifeOnly] = useState(false);
  const [edgesOn, setEdgesOn] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [showKeys, setShowKeys] = useState(false);
  const [coach, setCoach] = useState(false);
  const [present, setPresent] = useState(false); // §12 presentation mode — chrome off, graph fills the viewport
  const [booting, setBooting] = useState(true); // §25 wow-in-10s — skeleton until first fit settles, then fade in
  const [tr, setTr] = useState({ x: 0, y: 0, k: 1 });
  const [sel, setSel] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [wrapSize, setWrapSize] = useState({ w: 800, h: 560 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number; moved: boolean } | null>(null);
  const restored = useRef(false);
  const camHist = useRef<{ x: number; y: number; k: number }[]>([]); // §18 camera history — ESC returns to previous view
  const accent = MOD_COLOR[module];
  const flowSet = useMemo(() => new Set((FLOWS[module] || []).map((s) => s.code)), [module]);

  const inScope = (id: string) => { const n = h.nodes.get(id); return !!n && mode.kinds.includes(n.kind) && kindFilter.has(n.kind); };
  const scopeNbrs = (id: string) => [...(h.adj.get(id) || [])].filter(inScope);
  const degAll = (id: string) => (h.adj.get(id) || new Set()).size;

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
    // NOTE: camera transform (tr) is intentionally NOT restored — a transform
    // saved at a different viewport/layout placed the graph off-screen. We always
    // fit-to-view on load instead. Module/mode/filters/selection still persist.
    try { const s = JSON.parse(localStorage.getItem(SKEY) || "null"); if (s && s.module) { setModule(s.module); setModeId(s.modeId || "tables"); setZoneFilter(new Set(s.zoneFilter || [])); setKindFilter(new Set(s.kindFilter || [])); if (s.revealed) setRevealed(new Set(s.revealed)); if (s.sel) setSel(s.sel); restored.current = true; } } catch { /* noop */ }
    try { if (!localStorage.getItem(COACH_KEY)) setCoach(true); } catch { /* noop */ }
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

  const measure = () => { const el = wrapRef.current; if (el && el.clientWidth > 0) setWrapSize({ w: el.clientWidth, h: el.clientHeight }); };
  // Tight bounding box of the actual NODES (swimlane layouts have wide empty
  // band padding — clamping to that would let an empty sliver count as "in view").
  const bbox = useMemo(() => {
    const ns = layout.nodes;
    if (!ns.length) return { x: 0, y: 0, w: layout.width || 1, h: layout.height || 1 };
    let a = Infinity, b = Infinity, c = -Infinity, d = -Infinity;
    for (const n of ns) { a = Math.min(a, n.x - n.w / 2); b = Math.min(b, n.y - n.h / 2); c = Math.max(c, n.x + n.w / 2); d = Math.max(d, n.y + n.h / 2); }
    return { x: a, y: b, w: Math.max(1, c - a), h: Math.max(1, d - b) };
  }, [layout]);
  // Bounds guard: keep ≥ MARGIN px of the NODE region inside the viewport on
  // every axis — the canvas can NEVER drift to blank after any interaction.
  const clampTr = (t: { x: number; y: number; k: number }) => {
    const el = wrapRef.current;
    const W = el?.clientWidth || wrapSize.w || 800;
    const H = el?.clientHeight || wrapSize.h || 560;
    const k = Number.isFinite(t.k) && t.k > 0 ? t.k : 1;
    // node region screen span = [x + bbox.x*k, x + (bbox.x+bbox.w)*k]
    const left = bbox.x * k, right = (bbox.x + bbox.w) * k;
    const top = bbox.y * k, bot = (bbox.y + bbox.h) * k;
    const Mx = Math.min(140, (right - left) * 0.6 + 1, W * 0.5);
    const My = Math.min(140, (bot - top) * 0.6 + 1, H * 0.5);
    const x = Math.min(W - Mx - left, Math.max(Mx - right, t.x));
    const y = Math.min(H - My - top, Math.max(My - bot, t.y));
    return { k, x: Number.isFinite(x) ? x : 0, y: Number.isFinite(y) ? y : 0 };
  };
  const fit = () => { const el = wrapRef.current; if (!el || !el.clientWidth || !layout.width) return; measure(); const k = Math.min(el.clientWidth / (layout.width + 50), el.clientHeight / (layout.height + 50), 1.5); const kk = Number.isFinite(k) && k > 0 ? k : 1; setTr({ k: kk, x: (el.clientWidth - layout.width * kk) / 2, y: (el.clientHeight - layout.height * kk) / 2 }); };
  // ResizeObserver (catches container resize from inspector toggle / mobile
  // chrome / orientation, not just window) → re-measure + clamp current camera.
  useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    const onResize = () => { measure(); setTr((p) => clampTr(p)); };
    let ro: ResizeObserver | null = null;
    try { ro = new ResizeObserver(onResize); ro.observe(el); } catch { /* noop */ }
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => { ro?.disconnect(); window.removeEventListener("resize", onResize); window.removeEventListener("orientationchange", onResize); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout.width, layout.height, wrapSize.w, wrapSize.h]);
  useEffect(() => { const id = setTimeout(fit, 50); return () => clearTimeout(id); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [layout.width, layout.height, module]);
  // entering/leaving presentation mode changes the canvas size → re-measure + fit
  useEffect(() => { const id = setTimeout(() => { measure(); fit(); }, 60); return () => clearTimeout(id); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [present]);

  // §25 "wow in the first 10 seconds" — one-time boot sequence: hold a premium
  // skeleton while the first layout + fit settle (no flicker / layout shift),
  // fade the workspace in, then gently highlight the primary business flow for a
  // couple of seconds so the eye lands on the story before releasing to explore.
  const introDone = useRef(false);
  useEffect(() => {
    if (introDone.current) return; introDone.current = true;
    const t1 = setTimeout(() => { measure(); fit(); }, 140);
    const t2 = setTimeout(() => setBooting(false), 760);
    const t3 = setTimeout(() => setLifeOnly(true), 820);
    const t4 = setTimeout(() => setLifeOnly(false), 3100);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onWheel = (e: React.WheelEvent) => { const el = wrapRef.current; if (!el) return; const r = el.getBoundingClientRect(); const px = e.clientX - r.left, py = e.clientY - r.top; const nk = Math.min(2.6, Math.max(0.14, tr.k * (1 - e.deltaY * 0.0014))); const f = nk / tr.k; setTr(clampTr({ k: nk, x: px - (px - tr.x) * f, y: py - (py - tr.y) * f })); };
  const onDown = (e: React.PointerEvent) => { if ((e.target as Element).closest("[data-node]")) return; drag.current = { x: e.clientX, y: e.clientY, ox: tr.x, oy: tr.y, moved: false }; };
  const onMove = (e: React.PointerEvent) => { if (drag.current) { if (Math.abs(e.clientX - drag.current.x) + Math.abs(e.clientY - drag.current.y) > 3) drag.current.moved = true; setTr((p) => clampTr({ ...p, x: drag.current!.ox + (e.clientX - drag.current!.x), y: drag.current!.oy + (e.clientY - drag.current!.y) })); } };
  const onUp = () => { if (drag.current && !drag.current.moved) setSel(null); drag.current = null; };
  const zoom = (d: number) => { const el = wrapRef.current; if (!el) return; const cw = el.clientWidth / 2, ch = el.clientHeight / 2; const nk = Math.min(2.6, Math.max(0.14, tr.k * d)); const f = nk / tr.k; setTr(clampTr({ k: nk, x: cw - (cw - tr.x) * f, y: ch - (ch - tr.y) * f })); };
  // §18 camera history — snapshot before a deliberate move so ESC can rewind
  const pushCam = () => { camHist.current.push(tr); if (camHist.current.length > 24) camHist.current.shift(); };
  const popCam = () => { const prev = camHist.current.pop(); if (!prev) return false; setTr(clampTr(prev)); return true; };
  // soft camera — center + gentle zoom-in toward the object (Figma/Miro feel)
  const focusOn = (id: string) => { const n = layout.nodes.find((x) => x.id === id); const el = wrapRef.current; if (!n || !el) return; const k = Math.min(1.35, Math.max(tr.k, 0.95)); setTr(clampTr({ k, x: el.clientWidth / 2 - n.x * k, y: el.clientHeight / 2 - n.y * k })); };
  const centerOn = (id: string) => { pushCam(); setSel(id); setTimeout(() => focusOn(id), 20); };
  // §18 double-click = cinematic zoom INTO the object / business area
  const zoomInto = (id: string) => { const n = layout.nodes.find((x) => x.id === id); const el = wrapRef.current; if (!n || !el) return; pushCam(); setSel(id); const k = Math.min(2.2, Math.max(1.7, tr.k * 1.5)); setTr(clampTr({ k, x: el.clientWidth / 2 - n.x * k, y: el.clientHeight / 2 - n.y * k })); };

  // selecting a node makes it the workspace-wide active context
  useEffect(() => { if (sel) setActiveEntity(h.nodes.get(sel)?.label || sel); }, [sel, h]);

  const expand = (id: string) => setRevealed((r) => new Set([...r, ...scopeNbrs(id)]));
  const collapse = (id: string) => setRevealed((r) => { const next = new Set(r); const keep = new Set([DEFAULT_FOCUS[module]]); for (const b of scopeNbrs(id)) { if (keep.has(b)) continue; const deg = [...(h.adj.get(b) || [])].filter((x) => next.has(x) && inScope(x)).length; if (deg <= 1) next.delete(b); } return next; });
  const onNodeClick = (id: string) => { if (mode.behavior === "expand") { expand(id); setSel(id); setTimeout(() => focusOn(id), 60); } else { const next = sel === id ? null : id; setSel(next); if (next) setTimeout(() => focusOn(next), 20); } };
  const hasHidden = (id: string) => mode.behavior === "expand" && scopeNbrs(id).some((b) => !visible.has(b));

  // Guard against a STALE selection/hover: on module switch `h` recomputes but
  // `sel`/`hover` may still hold an id from the previous module's graph. Treat
  // `active` as valid ONLY if the node exists in the current graph — otherwise
  // the inspector would dereference an undefined node and crash the whole page.
  const activeId = sel || hover;
  const active = activeId && h.nodes.has(activeId) ? activeId : null;
  const activeNbr = active ? new Set([...(h.adj.get(active) || [])].filter((b) => visible.has(b))) : new Set<string>();
  const dimNode = (id: string) => {
    if (lifeOnly && !flowSet.has(id) && id !== active && !activeNbr.has(id)) return 0.1;
    if (active && id !== active && !activeNbr.has(id)) return 0.14;
    return 1;
  };

  const hits = q.trim().length >= 1 ? [...h.nodes.values()].filter((n) => `${n.label} ${n.he}`.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 8) : [];
  const pickSearch = (id: string) => { if (mode.behavior === "expand" && !visible.has(id)) setRevealed((r) => new Set([...r, id, ...scopeNbrs(id)])); setQ(""); setTimeout(() => centerOn(id), 60); };

  const tip = active ? lookupEntity(h.nodes.get(active)?.label || active) : null;
  const tipNode = active ? h.nodes.get(active) : null;
  const selNbrs = active ? [...activeNbr] : [];
  const nodeColor = (kind: SKind, s4?: string) => (mode.colorBy === "s4" && s4 ? S4_COLOR[s4 as keyof typeof S4_COLOR] : KIND_META[kind].c);
  const zonesPresent = useMemo(() => ZONES.filter((z) => h.tables.some((id) => zoneOf(id) === z.id)), [h]);

  // group selected neighbours by kind for the inspector
  const nbrByKind = useMemo(() => {
    const m = new Map<SKind, string[]>();
    for (const id of selNbrs) { const k = h.nodes.get(id)!.kind; if (!m.has(k)) m.set(k, []); m.get(k)!.push(id); }
    return [...m.entries()];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selNbrs.join(","), h]);

  // contextual hint shown above the canvas
  const hintText = (() => {
    if (tipNode) {
      const d = degAll(active!); const central = d >= 8;
      const parts = [`${tipNode.label} · ${KIND_META[tipNode.kind].he}`, `${d} קשרים`];
      if (tipNode.kind === "table") parts.push(ZONE_HE[zoneOf(tipNode.label)] || "");
      if (central) parts.push("אובייקט מרכזי במודול");
      return parts.filter(Boolean).join(" · ");
    }
    return mode.behavior === "expand" ? "לחץ צומת כדי לחשוף את שכניו — גלה איך SAP מחובר" : "רחף לתצוגה מקדימה · לחץ למיקוד · גלגל לזום · גרור להזזה";
  })();

  // mini-map geometry
  const MM_W = 184, MM_H = 124;
  const mmK = Math.min(MM_W / (layout.width || 1), MM_H / (layout.height || 1)) || 0.001;
  const f0 = (v: number, d = 0) => (Number.isFinite(v) ? v : d);
  const vp = { x: f0((-tr.x / tr.k) * mmK), y: f0((-tr.y / tr.k) * mmK), w: f0((wrapSize.w / tr.k) * mmK, MM_W), h: f0((wrapSize.h / tr.k) * mmK, MM_H) };
  const miniClick = (e: React.MouseEvent) => { const r = (e.currentTarget as HTMLElement).getBoundingClientRect(); const gx = (e.clientX - r.left) / mmK, gy = (e.clientY - r.top) / mmK; const el = wrapRef.current; if (!el) return; setTr((p) => clampTr({ ...p, x: el.clientWidth / 2 - gx * p.k, y: el.clientHeight / 2 - gy * p.k })); };

  // keyboard: Space center · Esc deselect · +/- zoom (ignored while typing)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement; if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.key === "Escape") { if (present) setPresent(false); else if (popCam()) { /* returned to previous view */ } else if (sel) setSel(null); }
      else if (e.code === "Space" && sel) { e.preventDefault(); focusOn(sel); }
      else if (e.key === "+" || e.key === "=") zoom(1.25);
      else if (e.key === "-") zoom(0.8);
    };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sel, layout, tr, present]);

  const dismissCoach = () => { setCoach(false); try { localStorage.setItem(COACH_KEY, "1"); } catch { /* noop */ } };
  const btn = "tap transition active:scale-95";

  return (
    <div className="mx-auto max-w-[1800px]" dir="rtl">
      {!present && (<>
      {/* header */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-400"><Link href="/" className="hover:text-slate-700">בית</Link><ArrowLeft className="size-3" /><span className="flex items-center gap-1.5 font-bold text-slate-700"><Compass className="size-4" style={{ color: accent }} />SAP Architecture Studio</span></div>
        <div className="flex items-center gap-2">
          <button onClick={() => { setPresent(true); dismissCoach(); }} title="מצב מצגת — הגרף על מלוא המסך (Esc ליציאה)" aria-label="מצב מצגת" className={`${btn} flex h-9 items-center gap-1.5 rounded-xl px-3 text-[12.5px] font-extrabold text-white shadow-sm`} style={{ background: accent }}><Maximize2 className="size-4" />מצגת</button>
          <button onClick={() => setShowKeys((v) => !v)} title="קיצורי מקלדת" aria-label="קיצורי מקלדת" className={`${btn} grid size-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-brand`}><Keyboard className="size-4" /></button>
          <div className="flex items-center gap-1.5 rounded-xl bg-slate-100 p-1">
            {(["PM", "PP-PI"] as Module[]).map((m) => <button key={m} onClick={() => setModule(m)} className={`${btn} rounded-lg px-3 py-1.5 text-[13px] font-extrabold ${module === m ? "text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`} style={module === m ? { background: MOD_COLOR[m] } : undefined}>{m}</button>)}
          </div>
        </div>
      </div>

      {/* exploration modes — segmented; horizontal chip-rail on mobile, wrap on desktop */}
      <div className="chip-rail mb-2 flex flex-nowrap gap-1.5 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
        {MODES.map((m) => <button key={m.id} onClick={() => setModeId(m.id)} title={MODE_HINT[m.id]} className={`${btn} shrink-0 rounded-xl px-3 py-1.5 text-[12.5px] font-bold ${modeId === m.id ? "text-white shadow-sm" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`} style={modeId === m.id ? { background: accent } : undefined}>{m.he}</button>)}
      </div>

      {/* business-flow rail — horizontal scroll on mobile */}
      <div className="chip-rail mb-2 flex flex-nowrap items-center gap-1.5 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2.5 sm:flex-wrap sm:overflow-visible">
        <span className="shrink-0 px-1 text-[11px] font-extrabold text-slate-400">זרימה עסקית:</span>
        {(FLOWS[module] || []).map((s, i, arr) => { const on = sel === s.code; return <span key={s.code} className="flex shrink-0 items-center gap-1.5">
          <button onClick={() => pickSearch(s.code)} title={`מקד ב-${s.label} (${s.code})`} className={`${btn} rounded-lg px-2.5 py-1 text-[11.5px] font-bold ${on ? "text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`} style={on ? { background: accent } : undefined}>{s.label}<span className="ms-1 font-mono text-[9px] opacity-70" dir="ltr">{s.code}</span></button>
          {i < arr.length - 1 && <ArrowLeft className="size-3.5 shrink-0 text-slate-300" />}</span>; })}
      </div>

      {/* advanced filters — progressive disclosure (hidden until needed) */}
      <div className="mb-3">
        <button onClick={() => setShowFilters((v) => !v)} className={`${btn} flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[11.5px] font-bold text-slate-500 hover:text-brand`}>
          <SlidersHorizontal className="size-3.5" />מסננים מתקדמים
          {(zoneFilter.size > 0 || kindFilter.size !== mode.kinds.length || lifeOnly) && <span className="size-1.5 rounded-full" style={{ background: accent }} />}
          <span className="text-slate-300">{showFilters ? "▲" : "▼"}</span>
        </button>
        <AnimatePresence initial={false}>
          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }} className="overflow-hidden">
              <div className="mt-2 space-y-2 rounded-2xl border border-slate-200 bg-white p-3">
                {/* zones */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-extrabold text-slate-400">אזורים:</span>
                  {zonesPresent.map((z) => { const on = zoneFilter.has(z.id); return <button key={z.id} onClick={() => setZoneFilter((s) => { const n = new Set(s); if (n.has(z.id)) n.delete(z.id); else n.add(z.id); return n; })} title={`הצג רק ${z.he}`} className={`${btn} rounded-full px-2.5 py-1 text-[11px] font-bold`} style={on ? { background: z.c, color: "#fff" } : { background: z.c + "14", color: z.c }}>{z.he}</button>; })}
                  {zoneFilter.size > 0 && <button onClick={() => setZoneFilter(new Set())} className={`${btn} rounded-full bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-500 hover:bg-slate-200`}>נקה</button>}
                </div>
                {/* layers + edges + lifecycle */}
                <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-2">
                  <span className="text-[11px] font-extrabold text-slate-400">שכבות:</span>
                  {mode.kinds.map((kd) => { const on = kindFilter.has(kd); const Ic = KIND_ICON[kd]; return <button key={kd} onClick={() => setKindFilter((s) => { const n = new Set(s); if (n.has(kd)) { if (kd !== "table") n.delete(kd); } else n.add(kd); return n; })} title={`הצג/הסתר ${KIND_META[kd].he}`} className={`${btn} flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold`} style={on ? { background: KIND_META[kd].c, color: "#fff" } : { background: KIND_META[kd].c + "14", color: KIND_META[kd].c }}><Ic className="size-3" />{KIND_META[kd].he}</button>; })}
                  <button onClick={() => setEdgesOn((v) => !v)} title="הצג/הסתר קווי קשר" className={`${btn} rounded-lg px-2 py-1 text-[11px] font-bold ${edgesOn ? "bg-slate-700 text-white" : "bg-slate-100 text-slate-400"}`}>קשתות</button>
                  <button onClick={() => setLifeOnly((v) => !v)} title="הדגש רק את זרימת התהליך העסקי" className={`${btn} rounded-lg px-2.5 py-1 text-[11px] font-bold ${lifeOnly ? "text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`} style={lifeOnly ? { background: accent } : undefined}>מחזור חיים</button>
                  {mode.behavior === "expand" && <button onClick={() => { const f = DEFAULT_FOCUS[module]; setRevealed(new Set([f, ...scopeNbrs(f)])); setSel(null); }} title="אפס לתצוגת ההתחלה" className={`${btn} flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500 hover:bg-slate-200`}><RotateCcw className="size-3" />אפס</button>}
                  {mode.colorBy === "s4" && <span className="ms-auto flex items-center gap-2 text-[10px] font-bold">{[["kept", "נשמר"], ["replaced", "הוחלף"], ["removed", "הוסר"]].map(([k, l]) => <span key={k} className="flex items-center gap-1"><span className="size-2 rounded-full" style={{ background: S4_COLOR[k as keyof typeof S4_COLOR] }} />{l}</span>)}</span>}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </>)}

      {/* split view: graph left, inspector right (single column in presentation mode) */}
      <div className={`grid gap-3 ${present ? "" : "lg:grid-cols-[minmax(0,1fr)_360px]"}`}>
        <div className={present ? "fixed inset-0 z-[55] bg-slate-50 p-3" : "relative"}>
          {/* presentation-mode floating control bar — exit + module + mode selector */}
          {present && (
            <div className="absolute left-3 top-3 z-40 flex max-w-[calc(100%-1.5rem)] flex-wrap items-center gap-2">
              <button onClick={() => setPresent(false)} title="צא ממצב מצגת (Esc)" className={`${btn} flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-[12.5px] font-extrabold text-white shadow-lg`}><X className="size-4" />צא ממצגת</button>
              <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white/95 p-1 shadow-sm backdrop-blur">
                {(["PM", "PP-PI"] as Module[]).map((m) => <button key={m} onClick={() => setModule(m)} className={`${btn} rounded-lg px-2.5 py-1 text-[12px] font-extrabold ${module === m ? "text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`} style={module === m ? { background: MOD_COLOR[m] } : undefined}>{m}</button>)}
              </div>
              <div className="chip-rail flex max-w-[46vw] items-center gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white/95 p-1 shadow-sm backdrop-blur">
                {MODES.map((m) => <button key={m.id} onClick={() => setModeId(m.id)} title={MODE_HINT[m.id]} className={`${btn} shrink-0 rounded-lg px-2.5 py-1 text-[11.5px] font-bold ${modeId === m.id ? "text-white shadow-sm" : "text-slate-500 hover:bg-slate-100"}`} style={modeId === m.id ? { background: accent } : undefined}>{m.he}</button>)}
              </div>
            </div>
          )}
          {/* search — hidden in presentation mode to keep the stage clean */}
          <div className={`absolute right-3 top-3 z-30 w-64 max-w-[70%] ${present ? "hidden" : ""}`}>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/95 px-3 py-2 shadow-sm backdrop-blur"><Search className="size-4 shrink-0 text-slate-400" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חפש אובייקט…" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-300" dir="ltr" /></div>
            <AnimatePresence>{hits.length > 0 && <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1 max-h-64 overflow-auto rounded-xl border border-slate-200 bg-white p-1 shadow-2xl">{hits.map((n) => { const Ic = KIND_ICON[n.kind]; return <button key={n.id} onClick={() => pickSearch(n.id)} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-right hover:bg-slate-50"><Ic className="size-3.5 shrink-0" style={{ color: KIND_META[n.kind].c }} /><span className="tech flex-1 truncate font-mono text-sm font-bold text-slate-800" dir="ltr">{n.label}</span><span className="rounded bg-slate-100 px-1.5 text-[9px] font-bold text-slate-500">{KIND_META[n.kind].he}</span></button>; })}</motion.div>}</AnimatePresence>
          </div>

          {/* contextual hint */}
          <div className="pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2">
            <AnimatePresence mode="wait">
              <motion.div key={hintText} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/85 px-3 py-1.5 text-[11.5px] font-bold text-slate-600 shadow-sm backdrop-blur">
                <Sparkles className="size-3.5" style={{ color: accent }} />{hintText}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* zoom controls */}
          <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1 rounded-xl border border-slate-200 bg-white/95 p-1 shadow-sm backdrop-blur">
            <button onClick={() => zoom(1.25)} title="התקרב (+)" className={`${btn} grid size-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-100`}><ZoomIn className="size-4" /></button>
            <span className="px-1 font-mono text-xs font-bold text-slate-400">{Math.round(tr.k * 100)}%</span>
            <button onClick={() => zoom(0.8)} title="התרחק (−)" className={`${btn} grid size-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-100`}><ZoomOut className="size-4" /></button>
            <button onClick={fit} title="התאם הכול למסך" className={`${btn} grid size-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-100`}><Maximize2 className="size-4" /></button>
          </div>

          {/* mini map */}
          {layout.nodes.length > 0 && (
            <div className="absolute bottom-3 left-3 z-30 overflow-hidden rounded-xl border border-slate-200 bg-white/95 shadow-sm backdrop-blur" style={{ width: MM_W, height: MM_H }} onClick={miniClick} role="button" aria-label="מפת ניווט — לחץ לקפיצה">
              <svg width={MM_W} height={MM_H}>
                {layout.nodes.map((n) => { const on = n.id === sel; return <rect key={n.id} x={(n.x - n.w / 2) * mmK} y={(n.y - n.h / 2) * mmK} width={Math.max(2, n.w * mmK)} height={Math.max(2, n.h * mmK)} rx={1} fill={on ? accent : nodeColor(n.kind, n.s4) + (activeNbr.has(n.id) ? "cc" : "77")} />; })}
                <motion.rect initial={false} x={vp.x} y={vp.y} width={vp.w} height={vp.h} animate={{ x: vp.x, y: vp.y, width: vp.w, height: vp.h }} transition={{ duration: reduce ? 0 : 0.18 }} fill={accent + "1a"} stroke={accent} strokeWidth={1.5} rx={2} />
              </svg>
              <span className="absolute bottom-1 left-1.5 font-mono text-[8px] font-bold text-slate-400">{Math.round(tr.k * 100)}%</span>
            </div>
          )}

          {/* canvas */}
          <div ref={wrapRef} className={`relative cursor-grab touch-none overflow-hidden border border-slate-200 bg-slate-50/70 active:cursor-grabbing ${present ? "h-full rounded-2xl" : "h-[calc(100vh-17rem)] min-h-[480px] rounded-3xl"}`}
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px,#d7deea 1px,transparent 0)", backgroundSize: "26px 26px" }}
            onWheel={onWheel} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={() => { drag.current = null; setHover(null); }}>
            <div dir="ltr" style={{ transform: `translate(${tr.x}px,${tr.y}px) scale(${tr.k})`, transformOrigin: "0 0", width: layout.width, height: layout.height, position: "absolute", left: 0, top: 0, right: "auto", transition: drag.current ? "none" : "transform .42s cubic-bezier(0.22,0.61,0.18,1)" }}>
              {/* swimlane bands */}
              {layout.bands.map((z) => (
                <div key={z.id} className="absolute top-0 border-x border-dashed" style={{ left: z.x, width: z.w, height: layout.height, background: z.c + "07", borderColor: z.c + "22" }}>
                  <div className="sticky top-2 mx-2 mt-2 rounded-lg px-2 py-1 text-center text-[12px] font-extrabold text-white shadow-sm" style={{ background: z.c }}>{z.he}</div>
                </div>
              ))}
              {/* edges */}
              {edgesOn && <svg width={layout.width} height={layout.height} className="absolute inset-0 overflow-visible">
                {layout.edges.map((e) => {
                  const hot = active != null && (e.from === active || e.to === active);
                  const pts = e.points.length >= 2 ? e.points : [];
                  const d = pts.length ? pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") : "";
                  if (!d) return null;
                  return (
                    <g key={e.id}>
                      <path d={d} fill="none" stroke={hot ? accent : "#cbd5e1"} strokeWidth={hot ? 2.6 : 1.1} strokeOpacity={active && !hot ? 0.1 : hot ? 0.9 : 0.5} className="transition-all duration-300" />
                      {hot && !reduce && <path d={d} fill="none" stroke="#fff" strokeWidth={1.6} strokeOpacity={0.85} className="studio-flow" />}
                    </g>
                  );
                })}
              </svg>}
              {/* nodes */}
              {layout.nodes.map((n, i) => {
                const col = nodeColor(n.kind, n.s4); const on = n.id === sel; const isHover = n.id === hover; const op = dimNode(n.id);
                const Ic = KIND_ICON[n.kind]; const deg = degAll(n.id);
                // §17 tier by size — drives typography + resting elevation (hierarchy, not colour)
                const core = n.w >= 176, leaf = n.w <= 130;
                const restShadow = core && !on && !isHover ? `0 10px 22px -14px ${col}55` : undefined;
                return (
                  <motion.button key={n.id} data-node
                    initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: op }}
                    transition={{ scale: { type: "spring", stiffness: 420, damping: 26, delay: reduce ? 0 : Math.min(i, 22) * 0.022 }, opacity: { duration: 0.25 } }}
                    whileHover={reduce ? undefined : { scale: 1.045 }} whileTap={reduce ? undefined : { scale: 0.97 }}
                    onMouseEnter={() => setHover(n.id)} onMouseLeave={() => setHover(null)} onClick={() => onNodeClick(n.id)} onDoubleClick={() => zoomInto(n.id)}
                    className="group absolute flex flex-col items-start justify-center rounded-xl border-2 bg-white/95 px-2 text-right shadow-sm backdrop-blur-sm transition-[box-shadow,border-color,left,top] duration-300 hover:z-10 hover:shadow-xl"
                    style={{ left: n.x - n.w / 2, top: n.y - n.h / 2, width: n.w, height: n.h, borderColor: on || isHover ? col : col + "44", boxShadow: on ? `0 8px 26px -8px ${col}88, 0 0 0 4px ${col}1f` : isHover ? `0 10px 24px -10px ${col}66` : restShadow, background: on ? `linear-gradient(135deg,#fff, ${col}0c)` : undefined }}>
                    {/* halo for the selected node */}
                    {on && !reduce && <span className="studio-halo pointer-events-none absolute -inset-1 -z-10 rounded-2xl" style={{ background: `radial-gradient(closest-side, ${col}33, transparent)` }} />}
                    <span className="flex w-full items-center gap-1">
                      <Ic className={`shrink-0 ${core ? "size-3.5" : "size-3"}`} style={{ color: col }} />
                      <span className={`tech truncate font-mono font-extrabold text-slate-900 ${core ? "text-[13px]" : leaf ? "text-[11px]" : "text-[12px]"}`} dir="ltr">{n.label}</span>
                      {hasHidden(n.id)
                        ? <span className="ms-auto grid size-4 shrink-0 place-items-center rounded-full text-white shadow-sm" style={{ background: col }} title="לחץ לחשיפת שכנים"><Plus className="size-2.5" /></span>
                        : deg > 0 && <span className="ms-auto shrink-0 rounded-full px-1 text-[8.5px] font-extrabold tabular-nums" style={{ background: col + "1f", color: col }} title={`${deg} קשרים`}>{deg}</span>}
                    </span>
                    {n.kind === "table" && n.he && <span className="w-full truncate text-[9px] text-slate-400">{n.he}</span>}
                    {n.kind === "table" && n.s4 && mode.colorBy === "s4" && <span className="absolute -left-1 -top-1 size-2.5 rounded-full ring-2 ring-white" style={{ background: S4_COLOR[n.s4] }} />}
                  </motion.button>
                );
              })}
            </div>

            {/* §25 premium boot skeleton — swimlane placeholders, shimmering,
                fades out once the first fit settles (no flicker, no layout shift) */}
            <AnimatePresence>
              {booting && (
                <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
                  className="pointer-events-none absolute inset-0 z-[15] grid grid-flow-col place-content-center gap-5 p-8"
                  style={{ background: "linear-gradient(180deg,rgba(248,250,252,.72),rgba(248,250,252,.5))" }}>
                  {Array.from({ length: 5 }).map((_, c) => (
                    <div key={c} className="flex w-[140px] flex-col gap-3">
                      <div className="skeleton h-6 w-full" />
                      {Array.from({ length: 4 - (c % 2) }).map((_, r) => <div key={r} className="skeleton h-10 w-full" style={{ opacity: 1 - r * 0.14 }} />)}
                    </div>
                  ))}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="pointer-events-none absolute inset-x-0 bottom-6 flex items-center justify-center gap-2 text-[12px] font-bold text-slate-400">
                    <Compass className="size-4 animate-pulse" style={{ color: accent }} />בונה את מפת ה-SAP…
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* educational empty state */}
            {visible.size === 0 && !booting && (
              <div className="absolute inset-0 grid place-items-center p-6">
                <div className="max-w-sm text-center">
                  <div className="relative mx-auto mb-4 grid size-16 place-items-center">
                    <span className="studio-halo absolute inset-0 rounded-full" style={{ background: `radial-gradient(closest-side, ${accent}33, transparent)` }} />
                    <Compass className="size-10" style={{ color: accent }} />
                  </div>
                  <p className="text-base font-extrabold text-slate-700">המפה ריקה כרגע</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-slate-500">נקה מסננים, או בחר מצב חקירה אחר כדי להתחיל לחקור את נוף ה-SAP של {module}. כל טבלה, טרנזקציה או אובייקט עסקי הוא נקודת התחלה.</p>
                  <button onClick={() => { setZoneFilter(new Set()); setKindFilter(new Set(mode.kinds)); }} className={`${btn} mt-3 rounded-xl px-4 py-2 text-[12px] font-bold text-white shadow-sm`} style={{ background: accent }}>נקה מסננים</button>
                </div>
              </div>
            )}

            {/* first-visit coach */}
            <AnimatePresence>
              {coach && visible.size > 0 && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  className="absolute bottom-3 left-1/2 z-40 w-[min(92%,30rem)] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[13px] font-extrabold text-slate-800"><Sparkles className="size-4" style={{ color: accent }} />איך לחקור את הסטודיו</span>
                    <button onClick={dismissCoach} aria-label="סגור" className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"><X className="size-4" /></button>
                  </div>
                  <ul className="space-y-1.5 text-[12.5px] text-slate-600">
                    <li className="flex items-center gap-2"><MousePointerClick className="size-3.5 shrink-0" style={{ color: accent }} />לחץ על אובייקט — המצלמה מתמקדת והשכנים מודגשים.</li>
                    <li className="flex items-center gap-2"><Search className="size-3.5 shrink-0" style={{ color: accent }} />חפש כל טבלה/טרנזקציה, או עקוב אחרי הזרימה העסקית למעלה.</li>
                    <li className="flex items-center gap-2"><Keyboard className="size-3.5 shrink-0" style={{ color: accent }} />רווח = מרכוז · Esc = ביטול · גלגל = זום.</li>
                  </ul>
                  <button onClick={dismissCoach} className={`${btn} mt-3 w-full rounded-xl py-2 text-[12px] font-bold text-white`} style={{ background: accent }}>הבנתי, בוא נחקור</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* inspector — hidden in presentation mode (the graph is the stage) */}
        {!present && (
        <aside className="rounded-3xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-hidden">
          <AnimatePresence mode="wait">
            {tipNode ? (
              <motion.div key={tipNode!.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }} className="flex max-h-[calc(100vh-2rem)] flex-col">
                {/* sticky header */}
                <div className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-slate-100 bg-white/95 p-4 backdrop-blur">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl text-white shadow-sm" style={{ background: nodeColor(tipNode!.kind, tipNode!.s4) }}>{(() => { const Ic = KIND_ICON[tipNode!.kind]; return <Ic className="size-5" />; })()}</span>
                    <div className="min-w-0">
                      <span className="tech block truncate font-mono text-base font-extrabold text-slate-900" dir="ltr">{tipNode!.label}</span>
                      <span className="text-[10px] font-bold text-slate-400">{KIND_META[tipNode!.kind].he}{tipNode!.kind === "table" ? ` · ${ZONE_HE[zoneOf(tipNode!.label)] || ""}` : ""}</span>
                    </div>
                  </div>
                  {sel && <button onClick={() => setSel(null)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"><X className="size-4" /></button>}
                </div>

                <div className="min-h-0 flex-1 overflow-auto p-4">
                  {/* stats */}
                  <div className="mb-3 grid grid-cols-3 gap-2">
                    {[
                      { v: degAll(active!), l: "קשרים" },
                      { v: selNbrs.length, l: "מוצגים" },
                      { v: tipNode!.kind === "table" && tipNode!.s4 ? ({ kept: "נשמר", replaced: "הוחלף", removed: "הוסר" } as Record<string, string>)[tipNode!.s4] : "—", l: "S/4" },
                    ].map((s) => (
                      <div key={s.l} className="rounded-xl border border-slate-200 bg-slate-50/60 p-2 text-center">
                        <div className="text-base font-extrabold tabular-nums text-slate-900">{s.v}</div>
                        <div className="text-[9px] font-bold text-slate-400">{s.l}</div>
                      </div>
                    ))}
                  </div>

                  {/* §16 Learning Mode — structured, in-page. Verified data only;
                      an honest gap line when nothing beyond the name is confirmed. */}
                  {(() => {
                    const flow = FLOWS[module] || [];
                    const fi = flow.findIndex((s) => s.code === tipNode!.label);
                    const prev = fi > 0 ? flow[fi - 1] : null;
                    const next = fi >= 0 && fi < flow.length - 1 ? flow[fi + 1] : null;
                    const s4he = tipNode!.kind === "table" && tipNode!.s4 ? ({ kept: "נשמר ב-S/4HANA", replaced: "הוחלף / טבלה חלופית ב-S/4", removed: "הוסר / בוטל ב-S/4" } as Record<string, string>)[tipNode!.s4] : null;
                    const what = tip?.he || tipNode!.he;
                    const rows: { icon: typeof BookOpen; c: string; l: string; body: React.ReactNode }[] = [];
                    if (what) rows.push({ icon: BookOpen, c: "#0891b2", l: "מה זה", body: what });
                    if (tip?.purpose) rows.push({ icon: Target, c: "#2563eb", l: "למה קיים", body: tip.purpose });
                    if (tip?.where) rows.push({ icon: MapPin, c: "#0d9488", l: "איפה בפרויקט", body: tip.where });
                    if (s4he) rows.push({ icon: ArrowLeftRight, c: S4_COLOR[tipNode!.s4!], l: "ECC ↔ S/4HANA", body: s4he });
                    if (tip?.consultantTip) rows.push({ icon: Briefcase, c: "#7c3aed", l: "טיפ יועץ", body: tip.consultantTip });
                    if (tip?.mistake) rows.push({ icon: AlertTriangle, c: "#e11d48", l: "טעות נפוצה", body: tip.mistake });
                    return (
                      <div className="space-y-2">
                        {rows.map((r) => { const Ic = r.icon; return (
                          <div key={r.l} className="rounded-xl border border-slate-100 bg-slate-50/50 p-2.5">
                            <div className="mb-1 flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wide" style={{ color: r.c }}><Ic className="size-3.5" />{r.l}</div>
                            <p className="text-[12.5px] font-medium leading-relaxed text-slate-700">{r.body}</p>
                          </div>
                        ); })}
                        {(prev || next) && (
                          <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-2.5">
                            <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wide text-slate-500"><GitBranch className="size-3.5" />לפני / אחרי בתהליך</div>
                            <div className="flex items-center gap-1.5">
                              {prev ? <button onClick={() => pickSearch(prev.code)} title={`שלב קודם: ${prev.label}`} className="tech rounded-md bg-white px-2 py-1 text-[11px] font-bold text-slate-600 shadow-sm hover:text-brand" dir="ltr">← {prev.code}</button> : <span className="text-[11px] text-slate-300">התחלה</span>}
                              <span className="text-[10px] font-bold text-slate-400">{tipNode!.label}</span>
                              {next ? <button onClick={() => pickSearch(next.code)} title={`שלב הבא: ${next.label}`} className="tech rounded-md bg-white px-2 py-1 text-[11px] font-bold text-slate-600 shadow-sm hover:text-brand" dir="ltr">{next.code} →</button> : <span className="text-[11px] text-slate-300">סיום</span>}
                            </div>
                          </div>
                        )}
                        {rows.length <= 1 && (
                          <p className="flex items-center gap-1.5 rounded-xl bg-amber-50 px-2.5 py-2 text-[11.5px] font-medium text-amber-700"><Info className="size-3.5 shrink-0" />מטא-דאטה מורחבת לאובייקט זה לא אומתה עדיין — הקשרים בגרף אמיתיים.</p>
                        )}
                      </div>
                    );
                  })()}

                  {/* expand/collapse */}
                  {mode.behavior === "expand" && tipNode && (
                    <div className="mt-3 flex gap-2">
                      {scopeNbrs(active!).some((b) => !visible.has(b)) && <button onClick={() => expand(active!)} className={`${btn} flex flex-1 items-center justify-center gap-1.5 rounded-xl border-2 px-3 py-2 text-[12px] font-bold`} style={{ borderColor: accent, color: accent }}><Plus className="size-4" />חשוף ({scopeNbrs(active!).filter((b) => !visible.has(b)).length})</button>}
                      {scopeNbrs(active!).some((b) => visible.has(b)) && <button onClick={() => collapse(active!)} className={`${btn} flex items-center justify-center gap-1.5 rounded-xl border-2 border-slate-200 px-3 py-2 text-[12px] font-bold text-slate-500 hover:border-slate-300`}><Minus className="size-4" />כווץ</button>}
                    </div>
                  )}

                  {/* related grouped by kind */}
                  {nbrByKind.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-slate-400"><GitBranch className="size-3" />מחובר ל-{selNbrs.length} אובייקטים</div>
                      {nbrByKind.map(([kd, ids]) => { const Ic = KIND_ICON[kd]; return (
                        <div key={kd}>
                          <div className="mb-1 flex items-center gap-1 text-[10px] font-bold" style={{ color: KIND_META[kd].c }}><Ic className="size-3" />{KIND_META[kd].he} · {ids.length}</div>
                          <div className="flex flex-wrap gap-1">{ids.slice(0, 16).map((id) => { const nn = h.nodes.get(id)!; return <button key={id} onClick={() => centerOn(id)} title="מקד באובייקט זה" className="tech rounded-md px-1.5 py-0.5 text-[10.5px] font-bold transition hover:brightness-110" style={{ background: KIND_META[nn.kind].c + "18", color: KIND_META[nn.kind].c }} dir="ltr">{nn.label}</button>; })}</div>
                        </div>
                      ); })}
                    </div>
                  )}
                </div>

                {/* quick actions */}
                <div className="flex gap-2 border-t border-slate-100 p-3">
                  <button onClick={() => focusOn(active!)} className={`${btn} flex items-center justify-center gap-1.5 rounded-xl border-2 border-slate-200 px-3 py-2.5 text-[12px] font-bold text-slate-500 hover:border-brand/40 hover:text-brand`}><Crosshair className="size-4" />מרכז</button>
                  {tip?.href && <Link href={tip.href} className={`${btn} flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-[13px] font-extrabold text-white shadow-sm`} style={{ background: accent }}><ExternalLink className="size-4" />עמוד מלא</Link>}
                </div>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-full flex-col items-center justify-center gap-3 p-6 py-12 text-center text-slate-400">
                <div className="relative grid size-14 place-items-center">
                  <span className="studio-halo absolute inset-0 rounded-full" style={{ background: `radial-gradient(closest-side, ${accent}2e, transparent)` }} />
                  <Crosshair className="size-9 text-slate-300" />
                </div>
                <p className="text-sm font-bold text-slate-500">בחר אובייקט כדי לחקור</p>
                <p className="text-[12px] leading-relaxed">רחף לתצוגה מקדימה, לחץ למיקוד. הגרף תמיד גלוי — הפאנל כאן מתעדכן מיד עם תיאור, קשרים, טעויות נפוצות ופעולות מהירות.</p>
                <button onClick={() => centerOn(DEFAULT_FOCUS[module])} className={`${btn} mt-1 rounded-xl px-4 py-2 text-[12px] font-bold text-white shadow-sm`} style={{ background: accent }}>התחל מ-{DEFAULT_FOCUS[module]}</button>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>
        )}
      </div>

      {/* keyboard sheet */}
      <AnimatePresence>
        {showKeys && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/40 backdrop-blur-sm p-4" onClick={() => setShowKeys(false)}>
            <motion.div initial={{ scale: 0.94, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, opacity: 0 }} onClick={(e) => e.stopPropagation()} dir="rtl" className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
              <div className="mb-3 flex items-center gap-2 text-sm font-extrabold text-slate-800"><Keyboard className="size-4" style={{ color: accent }} />קיצורי מקלדת</div>
              <div className="space-y-1.5 text-[13px]">
                {[["לחיצה על צומת", "מיקוד + הדגשת שכנים"], ["דאבל-קליק", "זום קולנועי אל האובייקט"], ["Space", "מרכז את האובייקט הנבחר"], ["Esc", "חזרה לתצוגה הקודמת / ביטול / יציאת מצגת"], ["+ / −", "זום פנימה / החוצה"], ["גלגלת", "זום אל הסמן"], ["גרירה", "הזזת הקנבס"]].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-1.5"><span className="text-slate-600">{v}</span><kbd className="rounded bg-white px-2 py-0.5 font-mono text-[11px] font-bold text-slate-700 shadow-sm">{k}</kbd></div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-3 pb-4 text-center text-[11px] text-slate-400">קשרים אמיתיים מתוך מודל הנתונים — ללא המצאה · המצב נשמר אוטומטית. <Link href={module === "PM" ? "/pm/" : "/pp-pi/"} className="font-bold text-brand">חזרה למרכז {module}</Link></p>
    </div>
  );
}
