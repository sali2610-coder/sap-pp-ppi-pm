"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Search, ZoomIn, ZoomOut, Maximize2, Crosshair, ArrowLeft, ExternalLink, Target, Briefcase,
  AlertTriangle, GitBranch, X, Plus, Minus, RotateCcw, SlidersHorizontal, Sparkles, Keyboard,
  Database, Terminal, Plug, FunctionSquare, Cable, Sigma, LayoutGrid, Compass, MousePointerClick,
  BookOpen, MapPin, ArrowLeftRight, Info, Play, Pause, ChevronLeft, ChevronRight, Film,
  Factory, Activity, ShieldCheck, Settings, Truck, Layers,
} from "lucide-react";
import { buildHetero, layoutSubset, layoutZoned, FLOWS, MODES, KIND_META, S4_COLOR, ZONES, zoneOf, type SHetero, type SKind, type ZoneBand, type Zone } from "@/lib/studio-graph";
import { lookupEntity } from "@/lib/entity-lookup";
import { tableByName } from "@/lib/knowledge-graph";
import { setActiveEntity } from "@/lib/workspace";
import type { Module } from "@/lib/types";
import { pillInk } from "@/lib/pill-ink";
import { onWindowResize } from "@/lib/raf-resize";
import { forWhiteText } from "@/lib/contrast";

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
// §15 per-layer visual identity — each swimlane carries its own icon
const ZONE_ICON: Record<string, typeof Database> = {
  master: Database, planning: Target, execution: Factory, status: Activity,
  quality: ShieldCheck, config: Settings, logistics: Truck, other: Layers,
};

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
  const [demo, setDemo] = useState(false); // §23 live demo — animated node-by-node walkthrough of the business flow
  const [demoStep, setDemoStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [captions, setCaptions] = useState(false); // §23 narration — voice-ready captions (+ optional local TTS)
  const [compare, setCompare] = useState(false); // §23 ECC ↔ S/4 side-by-side for the current step
  const [tr, setTr] = useState({ x: 0, y: 0, k: 1 });
  const [sel, setSel] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [wrapSize, setWrapSize] = useState({ w: 800, h: 560 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number; moved: boolean } | null>(null);
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinch = useRef<{ dist: number; k: number; cx: number; cy: number } | null>(null);
  const restored = useRef(false);
  const camHist = useRef<{ x: number; y: number; k: number }[]>([]); // §18 camera history — ESC returns to previous view
  const accent = MOD_COLOR[module];
  const flowSet = useMemo(() => new Set((FLOWS[module] || []).map((s) => s.code)), [module]);
  // §23 the storyline — business-flow steps that actually exist as nodes
  const demoFlow = useMemo(() => (FLOWS[module] || []).filter((s) => h.nodes.has(s.code)), [module, h]);

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
    const offResize = onWindowResize(onResize);
    window.addEventListener("orientationchange", onResize);
    return () => { ro?.disconnect(); offResize(); window.removeEventListener("orientationchange", onResize); };
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

  // §23 drive the camera + selection to the current demo step
  useEffect(() => {
    if (!demo || !demoFlow.length) return;
    const code = demoFlow[Math.min(demoStep, demoFlow.length - 1)].code;
    setSel(code);
    const t = setTimeout(() => demoFocus(code), 70);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo, demoStep, demoFlow, layout.width, layout.height]);
  // §23 auto-advance while playing; stop at the last step
  useEffect(() => {
    if (!demo || !playing || !demoFlow.length) return;
    const iv = setInterval(() => setDemoStep((s) => { if (s >= demoFlow.length - 1) { setPlaying(false); return s; } return s + 1; }), 3600);
    return () => clearInterval(iv);
  }, [demo, playing, demoFlow.length]);
  // §23 narration — speak the current step's caption when captions are enabled
  useEffect(() => {
    if (!demo || !captions || !demoFlow.length) return;
    const step = demoFlow[Math.min(demoStep, demoFlow.length - 1)];
    const t = lookupEntity(step.code)?.he || h.nodes.get(step.code)?.he || `${step.label} — ${step.code}`;
    const id = setTimeout(() => speak(`${step.label}. ${t}`), 120);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo, captions, demoStep, demoFlow]);
  useEffect(() => { if (!captions) stopSpeak(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [captions]);

  const onWheel = (e: React.WheelEvent) => { const el = wrapRef.current; if (!el) return; const r = el.getBoundingClientRect(); const px = e.clientX - r.left, py = e.clientY - r.top; const nk = Math.min(2.6, Math.max(0.14, tr.k * (1 - e.deltaY * 0.0014))); const f = nk / tr.k; setTr(clampTr({ k: nk, x: px - (px - tr.x) * f, y: py - (py - tr.y) * f })); };
  const onDown = (e: React.PointerEvent) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) { // two fingers → pinch
      const el = wrapRef.current; const r = el?.getBoundingClientRect();
      const [a, b] = [...pointers.current.values()];
      pinch.current = { dist: Math.hypot(a.x - b.x, a.y - b.y) || 1, k: tr.k, cx: (a.x + b.x) / 2 - (r?.left || 0), cy: (a.y + b.y) / 2 - (r?.top || 0) };
      drag.current = null; return;
    }
    if ((e.target as Element).closest("[data-node]")) return;
    drag.current = { x: e.clientX, y: e.clientY, ox: tr.x, oy: tr.y, moved: false };
  };
  const onMove = (e: React.PointerEvent) => {
    if (pointers.current.has(e.pointerId)) pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const nk = Math.min(2.6, Math.max(0.14, pinch.current.k * (dist / pinch.current.dist)));
      const f = nk / tr.k; const { cx, cy } = pinch.current;
      setTr(clampTr({ k: nk, x: cx - (cx - tr.x) * f, y: cy - (cy - tr.y) * f })); return;
    }
    if (drag.current) { if (Math.abs(e.clientX - drag.current.x) + Math.abs(e.clientY - drag.current.y) > 3) drag.current.moved = true; setTr((p) => clampTr({ ...p, x: drag.current!.ox + (e.clientX - drag.current!.x), y: drag.current!.oy + (e.clientY - drag.current!.y) })); }
  };
  const onUp = (e?: React.PointerEvent) => {
    if (e) pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (drag.current && !drag.current.moved) setSel(null);
    drag.current = null;
  };
  const zoom = (d: number) => { const el = wrapRef.current; if (!el) return; const cw = el.clientWidth / 2, ch = el.clientHeight / 2; const nk = Math.min(2.6, Math.max(0.14, tr.k * d)); const f = nk / tr.k; setTr(clampTr({ k: nk, x: cw - (cw - tr.x) * f, y: ch - (ch - tr.y) * f })); };
  // §18 camera history — snapshot before a deliberate move so ESC can rewind
  const pushCam = () => { camHist.current.push(tr); if (camHist.current.length > 24) camHist.current.shift(); };
  const popCam = () => { const prev = camHist.current.pop(); if (!prev) return false; setTr(clampTr(prev)); return true; };
  // soft camera — center + gentle zoom-in toward the object (Figma/Miro feel)
  const focusOn = (id: string) => { const n = layout.nodes.find((x) => x.id === id); const el = wrapRef.current; if (!n || !el) return; const k = Math.min(1.35, Math.max(tr.k, 0.95)); setTr(clampTr({ k, x: el.clientWidth / 2 - n.x * k, y: el.clientHeight / 2 - n.y * k })); };
  const centerOn = (id: string) => { pushCam(); setSel(id); setTimeout(() => focusOn(id), 20); };
  // §18 double-click = cinematic zoom INTO the object / business area
  const zoomInto = (id: string) => { const n = layout.nodes.find((x) => x.id === id); const el = wrapRef.current; if (!n || !el) return; pushCam(); setSel(id); const k = Math.min(2.2, Math.max(1.7, tr.k * 1.5)); setTr(clampTr({ k, x: el.clientWidth / 2 - n.x * k, y: el.clientHeight / 2 - n.y * k })); };
  // §23 live demo — camera glides to a step node at a steady cinematic zoom
  const demoFocus = (id: string) => { const n = layout.nodes.find((x) => x.id === id); const el = wrapRef.current; if (!n || !el) return; const k = 1.55; setTr(clampTr({ k, x: el.clientWidth / 2 - n.x * k, y: el.clientHeight / 2 - n.y * k })); };
  // §23 narration — speak with a local Hebrew voice if one exists (offline, opt-in). Silent no-op otherwise.
  const stopSpeak = () => { try { window.speechSynthesis?.cancel(); } catch { /* noop */ } };
  const speak = (text: string) => {
    try {
      const sy = window.speechSynthesis; if (!sy || !text) return; sy.cancel();
      const u = new SpeechSynthesisUtterance(text.slice(0, 240));
      const v = sy.getVoices().find((vc) => /he|iw/i.test(vc.lang)); if (v) u.voice = v;
      u.lang = "he-IL"; u.rate = 0.98; sy.speak(u);
    } catch { /* speech unavailable — captions still show */ }
  };
  const enterDemo = () => { setPresent(true); setModeId("business"); setBooting(false); setDemo(true); setDemoStep(0); setPlaying(true); };
  const exitDemo = () => { stopSpeak(); setDemo(false); setPlaying(false); setPresent(false); setSel(null); };
  const goStep = (i: number) => { if (!demoFlow.length) return; const n = ((i % demoFlow.length) + demoFlow.length) % demoFlow.length; setDemoStep(n); setSel(demoFlow[n].code); };

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

  // §11 performance — the edges + nodes layers are memoized so a pure pan/zoom
  // (which only changes `tr` on the parent transform) never re-renders any node
  // or edge. They rebuild only when their real inputs change → smooth 60fps drag
  // even on the largest graph (node counts are bounded, so no virtualization).
  const edgesLayer = useMemo(() => (
    <svg width={layout.width} height={layout.height} className="absolute inset-0 overflow-visible">
      {layout.edges.map((e) => {
        const hot = active != null && (e.from === active || e.to === active);
        const pts = e.points.length >= 2 ? e.points : [];
        const d = pts.length ? pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") : "";
        if (!d) return null;
        return (
          <g key={e.id}>
            <path d={d} fill="none" stroke={hot ? accent : "#cbd5e1"} strokeWidth={hot ? 2.6 : 1.1} strokeOpacity={active && !hot ? 0.1 : hot ? 0.9 : 0.5} className="transition-all duration-300" />
            {hot && !reduce && <path d={d} fill="none" stroke="#fff" strokeWidth={1.6} strokeOpacity={0.85} className="studio-flow" />}
            {hot && !reduce && (
              <circle r={demo ? 4 : 3} fill={accent} opacity={0.95}>
                <animateMotion dur={demo ? "1.5s" : "1.9s"} repeatCount="indefinite" path={d} rotate="auto" />
                <animate attributeName="opacity" values="0;1;1;0" dur={demo ? "1.5s" : "1.9s"} repeatCount="indefinite" />
              </circle>
            )}
          </g>
        );
      })}
    </svg>
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [layout, active, reduce, accent, demo]);

  const nodesLayer = useMemo(() => layout.nodes.map((n, i) => {
    const col = nodeColor(n.kind, n.s4); const on = n.id === sel; const isHover = n.id === hover; const op = dimNode(n.id);
    const Ic = KIND_ICON[n.kind]; const deg = degAll(n.id);
    const core = n.w >= 176, leaf = n.w <= 130;
    const restShadow = core && !on && !isHover ? `0 10px 22px -14px ${col}55` : undefined;
    // ACCEPTED EXCEPTION — WCAG 2.5.8 target size, Lighthouse `target-size`.
    //
    // On a 412px phone the canvas auto-fits all 56 nodes, which lands at
    // scale 0.234, so a node whose real box is 152x44 renders about 35x10.
    // Lighthouse reports 54 findings for this and holds /studio/ at 96.
    //
    // Not fixed, deliberately. Reaching 24px would require a minimum scale of
    // 0.544 (measured: 24 / 44.1 unscaled), i.e. 2.3x the fit zoom, which shows
    // roughly a third of the architecture on first load. Seeing the whole map at
    // a glance is the point of this screen, so that trade is a UX regression,
    // not a fix. This is the "essential presentation" case: in a node-link
    // diagram the spatial layout IS the content, and shrinking to fit is what
    // makes the relationships legible.
    //
    // Every node stays reachable, and this was measured rather than assumed:
    //   - wheel / pinch zoom works        (0.234 -> 0.308 on a real mobile UA)
    //   - drag to pan works               (transform translate changes)
    //   - 56/56 nodes are keyboard-focusable and all 56 have accessible names
    //   - the first node is reached in 54 Tab presses, so the graph is operable
    //     without a pointer at any zoom
    //   - the minimap jumps the viewport   (verified on desktop; on mobile it is
    //     clickable once the studio coach card is dismissed)
    //
    // Known rough edge, not a blocker: at 412x823 the minimap renders just below
    // the fold on load, so it needs a scroll before it is usable.
    return (
      <motion.button key={n.id} data-node
        initial={reduce ? false : { scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: op }}
        transition={{ scale: { type: "spring", stiffness: 420, damping: 26, delay: reduce ? 0 : Math.min(i, 22) * 0.022 }, opacity: { duration: 0.25 } }}
        whileHover={reduce ? undefined : { scale: 1.045 }} whileTap={reduce ? undefined : { scale: 0.97 }}
        onMouseEnter={() => setHover(n.id)} onMouseLeave={() => setHover(null)} onClick={() => onNodeClick(n.id)} onDoubleClick={() => zoomInto(n.id)}
        className="group absolute flex flex-col items-start justify-center rounded-xl border-2 bg-surface/95 px-2 text-right shadow-sm backdrop-blur-sm transition-[box-shadow,border-color,left,top] duration-300 hover:z-10 hover:shadow-xl"
        style={{ left: n.x - n.w / 2, top: n.y - n.h / 2, width: n.w, height: n.h, borderColor: on || isHover ? col : col + "44", boxShadow: on ? `0 8px 26px -8px ${col}88, 0 0 0 4px ${col}1f` : isHover ? `0 10px 24px -10px ${col}66` : restShadow, background: on ? `linear-gradient(135deg,#fff, ${col}0c)` : undefined }}>
        {on && !reduce && <span className="studio-halo pointer-events-none absolute -inset-1 -z-10 rounded-2xl" style={{ background: `radial-gradient(closest-side, ${col}33, transparent)` }} />}
        {!sel && !booting && n.id === DEFAULT_FOCUS[module] && (
          <>
            {!reduce && <span className="studio-halo pointer-events-none absolute -inset-1.5 -z-10 rounded-2xl" style={{ background: `radial-gradient(closest-side, ${accent}40, transparent)` }} />}
            <span className="pointer-events-none absolute -top-5 right-0 flex items-center gap-0.5 whitespace-nowrap rounded-full px-1.5 py-0.5 text-[8.5px] font-extrabold shadow-md" style={{ background: accent, color: pillInk(accent) }}><Sparkles className="size-2.5" />התחל כאן</span>
          </>
        )}
        <span className="flex w-full items-center gap-1">
          <Ic className={`shrink-0 ${core ? "size-3.5" : "size-3"}`} style={{ color: col }} />
          <span className={`tech truncate font-mono font-extrabold text-ink-1 ${core ? "text-[13px]" : leaf ? "text-[11px]" : "text-[12px]"}`} dir="ltr">{n.label}</span>
          {hasHidden(n.id)
            ? <span className="ms-auto grid size-4 shrink-0 place-items-center rounded-full text-white shadow-sm" style={{ background: col }} title="לחץ לחשיפת שכנים"><Plus className="size-2.5" /></span>
            : deg > 0 && <span className="ms-auto shrink-0 rounded-full px-1 text-[8.5px] font-extrabold tabular-nums" style={{ background: col + "1f", color: col }} title={`${deg} קשרים`}>{deg}</span>}
        </span>
        {n.kind === "table" && n.he && <span className="w-full truncate text-[9px] text-ink-3">{n.he}</span>}
        {n.kind === "table" && n.s4 && mode.colorBy === "s4" && <span className="absolute -left-1 -top-1 size-2.5 rounded-full ring-2 ring-white" style={{ background: S4_COLOR[n.s4] }} />}
      </motion.button>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [layout, sel, hover, lifeOnly, mode, visible, h, booting, reduce, accent, module]);

  // keyboard: Space center · Esc deselect · +/- zoom (ignored while typing)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement; if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      // §23 demo takes over the keyboard: ← next · → prev (RTL) · Space play/pause · Esc exit
      if (demo) {
        if (e.key === "Escape") { exitDemo(); return; }
        if (e.key === "ArrowLeft") { e.preventDefault(); setPlaying(false); goStep(demoStep + 1); return; }
        if (e.key === "ArrowRight") { e.preventDefault(); setPlaying(false); goStep(demoStep - 1); return; }
        if (e.code === "Space") { e.preventDefault(); setPlaying((p) => !p); return; }
        return;
      }
      if (e.key === "Escape") { if (present) setPresent(false); else if (popCam()) { /* returned to previous view */ } else if (sel) setSel(null); }
      else if (e.code === "Space" && sel) { e.preventDefault(); focusOn(sel); }
      else if (e.key === "+" || e.key === "=") zoom(1.25);
      else if (e.key === "-") zoom(0.8);
    };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sel, layout, tr, present, demo, demoStep, demoFlow]);

  const dismissCoach = () => { setCoach(false); try { localStorage.setItem(COACH_KEY, "1"); } catch { /* noop */ } };
  const btn = "tap transition active:scale-95";

  // Was framer with initial opacity:0 — serialised into the static export,
  // leaving the whole studio invisible until framer-motion hydrated. Same 0.4s
  // rise, now CSS. Inner overlays keep framer: they are AnimatePresence
  // transients that are meant to be hidden until triggered.
  return (
    <div className="neo-rise mx-auto" dir="rtl" style={{ "--neo-y": "10px" } as React.CSSProperties}>
      {/* Studio opens on the canvas with only a breadcrumb, so the route shipped
          zero <h1>. sr-only gives it a document heading without altering the
          canvas-first layout. */}
      <h1 className="sr-only">סטודיו הארכיטקטורה — SAP Architecture Studio</h1>
      {!present && (<>
      {/* header */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        {/* §10 breadcrumb — Home ▸ Module ▸ Architecture ▸ Layer ▸ Object */}
        <nav aria-label="נתיב ניווט" className="flex flex-wrap items-center gap-1.5 text-xs text-ink-3">
          <Link href="/" className="hover:text-ink-2">בית</Link>
          <ArrowLeft className="size-3 shrink-0" />
          <Link href={module === "PM" ? "/pm/" : "/pp-pi/"} className="font-bold hover:text-ink-2" style={{ color: accent }}>{module}</Link>
          <ArrowLeft className="size-3 shrink-0" />
          <span className="flex items-center gap-1.5 font-bold text-ink-2"><Compass className="size-3.5" style={{ color: accent }} />ארכיטקטורה</span>
          <ArrowLeft className="size-3 shrink-0" />
          <span className="font-semibold text-ink-3">{mode.he}</span>
          {tipNode && sel && <><ArrowLeft className="size-3 shrink-0" /><span className="tech font-mono font-extrabold text-ink-1" dir="ltr">{tipNode.label}</span></>}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => { enterDemo(); dismissCoach(); }} title="Live Demo — סיור מונפש בתהליך העסקי (Esc ליציאה)" aria-label="Live Demo" className={`${btn} flex h-9 items-center gap-1.5 rounded-xl px-3 text-[12.5px] font-extrabold text-white shadow-sm`} style={{ background: "#0f172a" }}><Play className="size-3.5" />Live Demo</button>
          <button onClick={() => { setPresent(true); dismissCoach(); }} title="מצב מצגת — הגרף על מלוא המסך (Esc ליציאה)" aria-label="מצב מצגת" className={`${btn} flex h-9 items-center gap-1.5 rounded-xl px-3 text-[12.5px] font-extrabold text-white shadow-sm`} style={{ background: forWhiteText(accent) }}><Maximize2 className="size-4" />מצגת</button>
          <button onClick={() => setShowKeys((v) => !v)} title="קיצורי מקלדת" aria-label="קיצורי מקלדת" className={`${btn} grid size-9 place-items-center rounded-xl border border-hairline bg-surface text-ink-3 hover:text-brand`}><Keyboard className="size-4" /></button>
          <div className="flex items-center gap-1.5 rounded-xl bg-surface-2 p-1">
            {(["PM", "PP-PI"] as Module[]).map((m) => <button key={m} onClick={() => setModule(m)} className={`${btn} rounded-lg px-3 py-1.5 text-[13px] font-extrabold ${module === m ? "text-white shadow-sm" : "text-ink-3 hover:text-ink-2"}`} style={module === m ? { background: forWhiteText(MOD_COLOR[m]) } : undefined}>{m}</button>)}
          </div>
        </div>
      </div>

      {/* exploration modes — segmented; horizontal chip-rail on mobile, wrap on desktop */}
      <div className="chip-rail mb-2 flex flex-nowrap gap-1.5 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
        {MODES.map((m) => <button key={m.id} onClick={() => setModeId(m.id)} title={MODE_HINT[m.id]} className={`${btn} shrink-0 rounded-xl px-3 py-1.5 text-[12.5px] font-bold ${modeId === m.id ? "text-white shadow-sm" : "bg-surface-2 text-ink-3 hover:bg-hairline"}`} style={modeId === m.id ? { background: forWhiteText(accent) } : undefined}>{m.he}</button>)}
      </div>

      {/* business-flow rail — horizontal scroll on mobile */}
      <div className="chip-rail mb-2 flex flex-nowrap items-center gap-1.5 overflow-x-auto rounded-2xl border border-hairline bg-surface p-2.5 sm:flex-wrap sm:overflow-visible">
        <span className="shrink-0 px-1 text-[11px] font-extrabold text-ink-3">זרימה עסקית:</span>
        {(FLOWS[module] || []).map((s, i, arr) => { const on = sel === s.code; return <span key={s.code} className="flex shrink-0 items-center gap-1.5">
          <button onClick={() => pickSearch(s.code)} title={`מקד ב-${s.label} (${s.code})`} className={`${btn} rounded-lg px-2.5 py-1 text-[11.5px] font-bold ${on ? "text-white shadow-sm" : "bg-surface-2 text-ink-2 hover:bg-hairline"}`} style={on ? { background: forWhiteText(accent) } : undefined}>{s.label}<span className={`ms-1 font-mono text-[9px] ${on ? "" : "text-ink-3"}`} dir="ltr">{s.code}</span></button>
          {i < arr.length - 1 && <ArrowLeft className="size-3.5 shrink-0 text-ink-3" />}</span>; })}
      </div>

      {/* advanced filters — progressive disclosure (hidden until needed) */}
      <div className="mb-3">
        <button onClick={() => setShowFilters((v) => !v)} className={`${btn} flex items-center gap-1.5 rounded-xl border border-hairline bg-surface px-3 py-1.5 text-[11.5px] font-bold text-ink-3 hover:text-brand`}>
          <SlidersHorizontal className="size-3.5" />מסננים מתקדמים
          {(zoneFilter.size > 0 || kindFilter.size !== mode.kinds.length || lifeOnly) && <span className="size-1.5 rounded-full" style={{ background: forWhiteText(accent) }} />}
          <span className="text-ink-3">{showFilters ? "▲" : "▼"}</span>
        </button>
        <AnimatePresence initial={false}>
          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }} className="overflow-hidden">
              <div className="mt-2 space-y-2 rounded-2xl border border-hairline bg-surface p-3">
                {/* zones */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-extrabold text-ink-3">אזורים:</span>
                  {zonesPresent.map((z) => { const on = zoneFilter.has(z.id); return <button key={z.id} onClick={() => setZoneFilter((s) => { const n = new Set(s); if (n.has(z.id)) n.delete(z.id); else n.add(z.id); return n; })} title={`הצג רק ${z.he}`} className={`${btn} rounded-full px-2.5 py-1 text-[11px] font-bold`} style={on ? { background: z.c, color: "#fff" } : { background: z.c + "14", color: z.c }}>{z.he}</button>; })}
                  {zoneFilter.size > 0 && <button onClick={() => setZoneFilter(new Set())} className={`${btn} rounded-full bg-surface-2 px-2 py-1 text-[11px] font-bold text-ink-3 hover:bg-hairline`}>נקה</button>}
                </div>
                {/* layers + edges + lifecycle */}
                <div className="flex flex-wrap items-center gap-2 border-t border-hairline pt-2">
                  <span className="text-[11px] font-extrabold text-ink-3">שכבות:</span>
                  {mode.kinds.map((kd) => { const on = kindFilter.has(kd); const Ic = KIND_ICON[kd]; return <button key={kd} onClick={() => setKindFilter((s) => { const n = new Set(s); if (n.has(kd)) { if (kd !== "table") n.delete(kd); } else n.add(kd); return n; })} title={`הצג/הסתר ${KIND_META[kd].he}`} className={`${btn} flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold`} style={on ? { background: KIND_META[kd].c, color: "#fff" } : { background: KIND_META[kd].c + "14", color: KIND_META[kd].c }}><Ic className="size-3" />{KIND_META[kd].he}</button>; })}
                  <button onClick={() => setEdgesOn((v) => !v)} title="הצג/הסתר קווי קשר" className={`${btn} rounded-lg px-2 py-1 text-[11px] font-bold ${edgesOn ? "bg-slate-700 text-white" : "bg-surface-2 text-ink-3"}`}>קשתות</button>
                  <button onClick={() => setLifeOnly((v) => !v)} title="הדגש רק את זרימת התהליך העסקי" className={`${btn} rounded-lg px-2.5 py-1 text-[11px] font-bold ${lifeOnly ? "text-white" : "bg-surface-2 text-ink-3 hover:bg-hairline"}`} style={lifeOnly ? { background: forWhiteText(accent) } : undefined}>מחזור חיים</button>
                  {mode.behavior === "expand" && <button onClick={() => { const f = DEFAULT_FOCUS[module]; setRevealed(new Set([f, ...scopeNbrs(f)])); setSel(null); }} title="אפס לתצוגת ההתחלה" className={`${btn} flex items-center gap-1 rounded-lg bg-surface-2 px-2.5 py-1 text-[11px] font-bold text-ink-3 hover:bg-hairline`}><RotateCcw className="size-3" />אפס</button>}
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
        <div className={present ? "fixed inset-0 z-[55] bg-surface-2 p-3" : "relative"}>
          {/* presentation-mode floating control bar — exit + module + mode selector (hidden during live demo) */}
          {present && !demo && (
            <div className="absolute left-3 top-3 z-40 flex max-w-[calc(100%-1.5rem)] flex-wrap items-center gap-2">
              <button onClick={() => setPresent(false)} title="צא ממצב מצגת (Esc)" className={`${btn} flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-[12.5px] font-extrabold text-white shadow-lg`}><X className="size-4" />צא ממצגת</button>
              <div className="flex items-center gap-1 rounded-xl border border-hairline bg-surface/95 p-1 shadow-sm backdrop-blur">
                {(["PM", "PP-PI"] as Module[]).map((m) => <button key={m} onClick={() => setModule(m)} className={`${btn} rounded-lg px-2.5 py-1 text-[12px] font-extrabold ${module === m ? "text-white shadow-sm" : "text-ink-3 hover:text-ink-2"}`} style={module === m ? { background: forWhiteText(MOD_COLOR[m]) } : undefined}>{m}</button>)}
              </div>
              <div className="chip-rail flex max-w-[46vw] items-center gap-1 overflow-x-auto rounded-xl border border-hairline bg-surface/95 p-1 shadow-sm backdrop-blur">
                {MODES.map((m) => <button key={m.id} onClick={() => setModeId(m.id)} title={MODE_HINT[m.id]} className={`${btn} shrink-0 rounded-lg px-2.5 py-1 text-[11.5px] font-bold ${modeId === m.id ? "text-white shadow-sm" : "text-ink-3 hover:bg-surface-2"}`} style={modeId === m.id ? { background: forWhiteText(accent) } : undefined}>{m.he}</button>)}
              </div>
            </div>
          )}

          {/* §23 LIVE DEMO overlay — metrics · progress · step card · transport */}
          {demo && demoFlow.length > 0 && (() => {
            const step = demoFlow[Math.min(demoStep, demoFlow.length - 1)];
            const sN = h.nodes.get(step.code);
            const pct = ((demoStep + 1) / demoFlow.length) * 100;
            const zone = sN?.kind === "table" ? (ZONE_HE[zoneOf(step.code)] || "") : "";
            const s4he = sN?.s4 ? ({ kept: "נשמר ב-S/4", replaced: "הוחלף ב-S/4", removed: "הוסר ב-S/4" } as Record<string, string>)[sN.s4] : null;
            // §23 verified ECC↔S/4 delta — straight from the blueprint dataset (no fabrication)
            const trow = tableByName(step.code);
            const capText = tip?.he || sN?.he || `${step.label} — ${step.code}`;
            return (
              <>
                <div className="absolute inset-x-0 top-0 z-40 h-1 bg-hairline/80"><motion.div className="h-full" style={{ background: forWhiteText(accent) }} initial={false} animate={{ width: `${pct}%` }} transition={{ duration: reduce ? 0 : 0.45, ease: [0.2, 0.7, 0.2, 1] }} /></div>
                <div className="pointer-events-none absolute inset-x-0 top-4 z-40 flex justify-center px-3">
                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-white/10 bg-slate-900/90 px-4 py-2 text-white shadow-xl backdrop-blur">
                    <span className="flex items-center gap-1.5 text-[12px] font-extrabold"><Film className="size-4" style={{ color: accent }} />Live Demo</span>
                    <span className="h-3.5 w-px bg-surface/20" />
                    <span className="text-[12px] font-bold tabular-nums">שלב {demoStep + 1}/{demoFlow.length}</span>
                    <span className="text-[11px] text-white/55">{module}</span>
                    {zone && <span className="text-[11px] text-white/55">· {zone}</span>}
                    <span className="text-[11px] text-white/55">· {playing ? "מתנגן" : "מושהה"}</span>
                  </div>
                </div>
                {/* §23 narration — large voice-ready caption bar */}
                <AnimatePresence>
                  {captions && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="pointer-events-none absolute inset-x-0 bottom-[13.5rem] z-40 flex justify-center px-4">
                      <div className="max-w-[46rem] rounded-2xl bg-slate-900/90 px-6 py-3 text-center text-[17px] font-bold leading-snug text-white shadow-2xl backdrop-blur">{capText}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-4 z-40 flex justify-center px-3">
                  <motion.div key={step.code} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    className="w-[min(94%,42rem)] rounded-2xl border border-hairline bg-surface/95 p-4 shadow-2xl backdrop-blur">
                    <div className="flex items-center gap-2">
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg text-[12px] font-extrabold" style={{ background: accent, color: pillInk(accent) }}>{demoStep + 1}</span>
                      <span className="tech font-mono text-lg font-extrabold text-ink-1" dir="ltr">{step.code}</span>
                      <span className="rounded-md bg-surface-2 px-2 py-0.5 text-[11px] font-bold text-ink-3">{step.label}</span>
                      {s4he && <span className="rounded-md px-2 py-0.5 text-[10px] font-extrabold" style={{ background: S4_COLOR[sN!.s4!], color: pillInk(S4_COLOR[sN!.s4!]) }}>{s4he}</span>}
                    </div>
                    {(tip?.he || sN?.he) && <p className="mt-2 text-[13px] leading-relaxed text-ink-2">{tip?.he || sN?.he}</p>}
                    {tip?.purpose && <p className="mt-1.5 flex gap-1.5 text-[12.5px] leading-relaxed text-ink-3"><Target className="mt-0.5 size-3.5 shrink-0 text-blue-500" />{tip.purpose}</p>}
                    {/* §23 ECC ↔ S/4 side-by-side — verified deltas only */}
                    <AnimatePresence initial={false}>
                      {compare && trow && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                          <div className="mt-3 grid grid-cols-2 gap-2 text-[11.5px]">
                            <div className="rounded-xl border border-hairline bg-surface-2/70 p-2.5">
                              <div className="mb-1 text-[10px] font-extrabold uppercase tracking-wide text-ink-3">ECC 6</div>
                              <div className="tech font-mono font-bold text-ink-1" dir="ltr">{trow.tableName}</div>
                              {trow.tcodes && <div className="mt-1 truncate text-ink-3" dir="ltr" title={trow.tcodes}>{trow.tcodes}</div>}
                            </div>
                            <div className="rounded-xl border p-2.5" style={{ borderColor: (sN?.s4 ? S4_COLOR[sN.s4] : "#16a34a") + "44", background: (sN?.s4 ? S4_COLOR[sN.s4] : "#16a34a") + "0c" }}>
                              <div className="mb-1 text-[10px] font-extrabold uppercase tracking-wide" style={{ color: sN?.s4 ? S4_COLOR[sN.s4] : "#16a34a" }}>S/4HANA</div>
                              <div className="font-bold text-ink-1">{s4he || "נשמר"}</div>
                              {trow.s4AltTable && <div className="mt-0.5 text-ink-2" dir="ltr">→ {trow.s4AltTable}</div>}
                              {trow.s4AltTcode && <div className="text-ink-2" dir="ltr">→ {trow.s4AltTcode}</div>}
                              {trow.fioriApp && <div className="mt-0.5 truncate text-amber-700" title={trow.fioriApp}>Fiori · {trow.fioriApp}</div>}
                            </div>
                          </div>
                          {trow.s4Note && <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-3">{trow.s4Note}</p>}
                          {!trow.s4AltTable && !trow.s4AltTcode && !trow.s4Note && <p className="mt-1.5 text-[11px] text-ink-3">אין דלתא S/4 מאומתת לאובייקט זה.</p>}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-hairline pt-3">
                      <button onClick={() => { setPlaying(false); goStep(0); }} title="התחל מחדש" className={`${btn} grid size-9 place-items-center rounded-xl border border-hairline text-ink-3 hover:text-brand`}><RotateCcw className="size-4" /></button>
                      <button onClick={() => { setPlaying(false); goStep(demoStep - 1); }} title="הקודם (→)" className={`${btn} grid size-9 place-items-center rounded-xl border border-hairline text-ink-3 hover:text-brand`}><ChevronRight className="size-5" /></button>
                      <button onClick={() => setPlaying((p) => !p)} title="נגן / השהה (רווח)" className={`${btn} flex items-center gap-1.5 rounded-xl px-4 py-2 text-[13px] font-extrabold text-white shadow-sm`} style={{ background: forWhiteText(accent) }}>{playing ? <Pause className="size-4" /> : <Play className="size-4" />}{playing ? "השהה" : "נגן"}</button>
                      <button onClick={() => { setPlaying(false); goStep(demoStep + 1); }} title="הבא (←)" className={`${btn} grid size-9 place-items-center rounded-xl border border-hairline text-ink-3 hover:text-brand`}><ChevronLeft className="size-5" /></button>
                      <button onClick={() => setCompare((v) => !v)} title="השוואת ECC ↔ S/4" className={`${btn} flex items-center gap-1 rounded-xl px-2.5 py-2 text-[11.5px] font-bold ${compare ? "text-white shadow-sm" : "border border-hairline text-ink-3 hover:text-brand"}`} style={compare ? { background: forWhiteText(accent) } : undefined}><ArrowLeftRight className="size-4" />ECC↔S/4</button>
                      <button onClick={() => setCaptions((v) => !v)} title="כתוביות / קריינות" className={`${btn} flex items-center gap-1 rounded-xl px-2.5 py-2 text-[11.5px] font-bold ${captions ? "text-white shadow-sm" : "border border-hairline text-ink-3 hover:text-brand"}`} style={captions ? { background: forWhiteText(accent) } : undefined}><BookOpen className="size-4" />כתוביות</button>
                      <button onClick={exitDemo} title="צא מ-Demo (Esc)" className={`${btn} ms-auto flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-[12px] font-extrabold text-white`}><X className="size-4" />צא</button>
                    </div>
                  </motion.div>
                </div>
              </>
            );
          })()}

          {/* search — hidden in presentation mode to keep the stage clean */}
          <div className={`absolute right-3 top-3 z-30 w-64 max-w-[70%] ${present ? "hidden" : ""}`}>
            <div className="flex items-center gap-2 rounded-2xl border border-white/70 bg-surface/65 px-3 py-2 shadow-[0_10px_34px_-14px_rgba(15,23,42,0.3),inset_0_1px_0_rgba(255,255,255,0.75)] ring-1 ring-slate-900/5 backdrop-blur-xl"><Search className="size-4 shrink-0 text-ink-3" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חפש אובייקט…" className="w-full bg-transparent text-sm outline-none placeholder:text-ink-3" dir="ltr" /></div>
            <AnimatePresence>{hits.length > 0 && <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1 max-h-64 overflow-auto rounded-xl border border-hairline bg-surface p-1 shadow-2xl">{hits.map((n) => { const Ic = KIND_ICON[n.kind]; return <button key={n.id} onClick={() => pickSearch(n.id)} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-right hover:bg-surface-2"><Ic className="size-3.5 shrink-0" style={{ color: KIND_META[n.kind].c }} /><span className="tech flex-1 truncate font-mono text-sm font-bold text-ink-1" dir="ltr">{n.label}</span><span className="rounded bg-surface-2 px-1.5 text-[9px] font-bold text-ink-3">{KIND_META[n.kind].he}</span></button>; })}</motion.div>}</AnimatePresence>
          </div>

          {/* contextual hint */}
          <div className="pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2">
            <AnimatePresence mode="wait">
              <motion.div key={hintText} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                className="flex items-center gap-1.5 rounded-full border border-white/70 bg-surface/70 px-3.5 py-1.5 text-[11.5px] font-bold text-ink-2 shadow-[0_8px_24px_-12px_rgba(15,23,42,0.28),inset_0_1px_0_rgba(255,255,255,0.7)] ring-1 ring-slate-900/5 backdrop-blur-xl">
                <Sparkles className="size-3.5" style={{ color: accent }} />{hintText}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* §4 zoom controls — premium liquid-glass toolbar */}
          <div className="absolute bottom-3 right-3 z-30 flex items-center gap-0.5 rounded-2xl border border-white/70 bg-surface/65 p-1 shadow-[0_10px_34px_-14px_rgba(15,23,42,0.3),inset_0_1px_0_rgba(255,255,255,0.75)] ring-1 ring-slate-900/5 backdrop-blur-xl">
            <button onClick={() => zoom(1.25)} title="התקרב (+)" className={`${btn} grid size-8 place-items-center rounded-xl text-ink-2 hover:bg-surface hover:text-brand hover:shadow-sm`}><ZoomIn className="size-4" /></button>
            <button onClick={() => zoom(0.8)} title="התרחק (−)" className={`${btn} grid size-8 place-items-center rounded-xl text-ink-2 hover:bg-surface hover:text-brand hover:shadow-sm`}><ZoomOut className="size-4" /></button>
            <button onClick={() => zoom(1 / tr.k)} title="אחוז מקורי (100%)" className={`${btn} min-w-11 rounded-xl px-1 py-1 text-center font-mono text-[11px] font-extrabold text-ink-3 tabular-nums hover:bg-surface hover:text-brand`}>{Math.round(tr.k * 100)}%</button>
            <span className="mx-0.5 h-5 w-px bg-slate-900/10" />
            <button onClick={fit} title="התאם הכול למסך" className={`${btn} grid size-8 place-items-center rounded-xl text-ink-2 hover:bg-surface hover:text-brand hover:shadow-sm`}><Maximize2 className="size-4" /></button>
            <span className="mx-0.5 h-5 w-px bg-slate-900/10" />
            <button onClick={() => setCoach(true)} title="איך לחקור את הסטודיו — טיפים" aria-label="הצג טיפים" className={`${btn} grid size-8 place-items-center rounded-xl text-ink-2 hover:bg-surface hover:text-brand hover:shadow-sm`}><Info className="size-4" /></button>
          </div>

          {/* mini map */}
          {layout.nodes.length > 0 && (
            <div className="absolute bottom-3 left-3 z-30 overflow-hidden rounded-xl border border-hairline bg-surface/95 shadow-sm backdrop-blur" style={{ width: MM_W, height: MM_H }} onClick={miniClick} role="button" aria-label={`מפת ניווט — לחץ לקפיצה. זום ${Math.round(tr.k * 100)}%`}>
              <svg width={MM_W} height={MM_H}>
                {layout.nodes.map((n) => { const on = n.id === sel; return <rect key={n.id} x={(n.x - n.w / 2) * mmK} y={(n.y - n.h / 2) * mmK} width={Math.max(2, n.w * mmK)} height={Math.max(2, n.h * mmK)} rx={1} fill={on ? accent : nodeColor(n.kind, n.s4) + (activeNbr.has(n.id) ? "cc" : "77")} />; })}
                <motion.rect initial={false} x={vp.x} y={vp.y} width={vp.w} height={vp.h} animate={{ x: vp.x, y: vp.y, width: vp.w, height: vp.h }} transition={{ duration: reduce ? 0 : 0.18 }} fill={accent + "1a"} stroke={accent} strokeWidth={1.5} rx={2} />
              </svg>
              {/* Zoom readout. It is live status, not a label for the jump
                  action, but it sits inside the role="button" element — so
                  axe counted "23%" as the control's visible text and reported
                  label-content-name-mismatch (WCAG 2.5.3) because the
                  accessible name did not contain it. Hidden from the
                  accessibility tree here and folded into the aria-label above,
                  so screen readers still get the zoom level. */}
              <span aria-hidden="true" className="absolute bottom-1 left-1.5 font-mono text-[8px] font-bold text-ink-3">{Math.round(tr.k * 100)}%</span>
            </div>
          )}

          {/* canvas */}
          <div ref={wrapRef} className={`relative cursor-grab touch-none overflow-hidden border border-hairline bg-surface-2/70 active:cursor-grabbing ${present ? "h-full rounded-2xl" : "h-[calc(100vh-17rem)] min-h-[480px] rounded-3xl"}`}
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px,#d7deea 1px,transparent 0)", backgroundSize: "26px 26px" }}
            onWheel={onWheel} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onPointerLeave={() => { drag.current = null; pointers.current.clear(); pinch.current = null; setHover(null); }}>
            <div dir="ltr" style={{ transform: `translate(${tr.x}px,${tr.y}px) scale(${tr.k})`, transformOrigin: "0 0", width: layout.width, height: layout.height, position: "absolute", left: 0, top: 0, right: "auto", transition: drag.current ? "none" : "transform .42s cubic-bezier(0.22,0.61,0.18,1)" }}>
              {/* swimlane bands — §15 each layer has its own colour identity + icon */}
              {layout.bands.map((z) => { const Zi = ZONE_ICON[z.id] || Layers; return (
                <div key={z.id} className="absolute top-0 border-x border-dashed" style={{ left: z.x, width: z.w, height: layout.height, background: `linear-gradient(180deg, ${z.c}0f, ${z.c}05)`, borderColor: z.c + "22" }}>
                  <div className="sticky top-2 mx-2 mt-2 flex items-center justify-center gap-1.5 rounded-lg px-2 py-1 text-[12px] font-extrabold shadow-sm" style={{ background: z.c, color: pillInk(z.c) }}><Zi className="size-3.5 shrink-0 opacity-90" />{z.he}</div>
                </div>
              ); })}
              {/* edges + nodes — memoized layers (§11): pan/zoom won't re-render them */}
              {edgesOn && edgesLayer}
              {nodesLayer}
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
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="pointer-events-none absolute inset-x-0 bottom-6 flex items-center justify-center gap-2 text-[12px] font-bold text-ink-3">
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
                  <p className="text-base font-extrabold text-ink-2">המפה ריקה כרגע</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink-3">נקה מסננים, או בחר מצב חקירה אחר כדי להתחיל לחקור את נוף ה-SAP של {module}. כל טבלה, טרנזקציה או אובייקט עסקי הוא נקודת התחלה.</p>
                  <button onClick={() => { setZoneFilter(new Set()); setKindFilter(new Set(mode.kinds)); }} className={`${btn} mt-3 rounded-xl px-4 py-2 text-[12px] font-bold text-white shadow-sm`} style={{ background: forWhiteText(accent) }}>נקה מסננים</button>
                </div>
              </div>
            )}

            {/* first-visit coach */}
            <AnimatePresence>
              {coach && visible.size > 0 && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  className="absolute bottom-3 left-1/2 z-40 w-[min(92%,30rem)] -translate-x-1/2 rounded-2xl border border-hairline bg-surface/95 p-4 shadow-2xl backdrop-blur">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[13px] font-extrabold text-ink-1"><Sparkles className="size-4" style={{ color: accent }} />איך לחקור את הסטודיו</span>
                    <button onClick={dismissCoach} aria-label="סגור" className="rounded-lg p-1 text-ink-3 hover:bg-surface-2"><X className="size-4" /></button>
                  </div>
                  <ul className="space-y-1.5 text-[12.5px] text-ink-2">
                    <li className="flex items-center gap-2"><MousePointerClick className="size-3.5 shrink-0" style={{ color: accent }} />לחץ על אובייקט — המצלמה מתמקדת והשכנים מודגשים.</li>
                    <li className="flex items-center gap-2"><Search className="size-3.5 shrink-0" style={{ color: accent }} />חפש כל טבלה/טרנזקציה, או עקוב אחרי הזרימה העסקית למעלה.</li>
                    <li className="flex items-center gap-2"><Keyboard className="size-3.5 shrink-0" style={{ color: accent }} />רווח = מרכוז · Esc = ביטול · גלגל = זום.</li>
                  </ul>
                  <button onClick={dismissCoach} className={`${btn} mt-3 w-full rounded-xl py-2 text-[12px] font-bold text-white`} style={{ background: forWhiteText(accent) }}>הבנתי, בוא נחקור</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* inspector — hidden in presentation mode (the graph is the stage) */}
        {!present && (
        <aside className="rounded-3xl border border-hairline bg-surface shadow-sm lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-hidden">
          <AnimatePresence mode="wait">
            {tipNode ? (
              <motion.div key={tipNode!.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }} className="flex max-h-[calc(100vh-2rem)] flex-col">
                {/* sticky header */}
                <div className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-hairline bg-surface/95 p-4 backdrop-blur">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl text-white shadow-sm" style={{ background: nodeColor(tipNode!.kind, tipNode!.s4) }}>{(() => { const Ic = KIND_ICON[tipNode!.kind]; return <Ic className="size-5" />; })()}</span>
                    <div className="min-w-0">
                      <span className="tech block truncate font-mono text-base font-extrabold text-ink-1" dir="ltr">{tipNode!.label}</span>
                      <span className="text-[10px] font-bold text-ink-3">{KIND_META[tipNode!.kind].he}{tipNode!.kind === "table" ? ` · ${ZONE_HE[zoneOf(tipNode!.label)] || ""}` : ""}</span>
                    </div>
                  </div>
                  {sel && <button onClick={() => setSel(null)} className="rounded-lg p-1 text-ink-3 hover:bg-surface-2"><X className="size-4" /></button>}
                </div>

                <div className="min-h-0 flex-1 overflow-auto p-4">
                  {/* stats */}
                  <div className="mb-3 grid grid-cols-3 gap-2">
                    {[
                      { v: degAll(active!), l: "קשרים" },
                      { v: selNbrs.length, l: "מוצגים" },
                      { v: tipNode!.kind === "table" && tipNode!.s4 ? ({ kept: "נשמר", replaced: "הוחלף", removed: "הוסר" } as Record<string, string>)[tipNode!.s4] : "—", l: "S/4" },
                    ].map((s) => (
                      <div key={s.l} className="rounded-xl border border-hairline bg-surface-2/60 p-2 text-center">
                        <div className="text-base font-extrabold tabular-nums text-ink-1">{s.v}</div>
                        <div className="text-[9px] font-bold text-ink-3">{s.l}</div>
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
                          <div key={r.l} className="rounded-xl border border-hairline bg-surface-2/50 p-2.5">
                            <div className="mb-1 flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wide" style={{ color: r.c }}><Ic className="size-3.5" />{r.l}</div>
                            <p className="text-[12.5px] font-medium leading-relaxed text-ink-2">{r.body}</p>
                          </div>
                        ); })}
                        {(prev || next) && (
                          <div className="rounded-xl border border-hairline bg-surface-2/50 p-2.5">
                            <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wide text-ink-3"><GitBranch className="size-3.5" />לפני / אחרי בתהליך</div>
                            <div className="flex items-center gap-1.5">
                              {prev ? <button onClick={() => pickSearch(prev.code)} title={`שלב קודם: ${prev.label}`} className="tech rounded-md bg-surface px-2 py-1 text-[11px] font-bold text-ink-2 shadow-sm hover:text-brand" dir="ltr">← {prev.code}</button> : <span className="text-[11px] text-ink-3">התחלה</span>}
                              <span className="text-[10px] font-bold text-ink-3">{tipNode!.label}</span>
                              {next ? <button onClick={() => pickSearch(next.code)} title={`שלב הבא: ${next.label}`} className="tech rounded-md bg-surface px-2 py-1 text-[11px] font-bold text-ink-2 shadow-sm hover:text-brand" dir="ltr">{next.code} →</button> : <span className="text-[11px] text-ink-3">סיום</span>}
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
                      {scopeNbrs(active!).some((b) => visible.has(b)) && <button onClick={() => collapse(active!)} className={`${btn} flex items-center justify-center gap-1.5 rounded-xl border-2 border-hairline px-3 py-2 text-[12px] font-bold text-ink-3 hover:border-hairline`}><Minus className="size-4" />כווץ</button>}
                    </div>
                  )}

                  {/* related grouped by kind */}
                  {nbrByKind.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-ink-3"><GitBranch className="size-3" />מחובר ל-{selNbrs.length} אובייקטים</div>
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
                <div className="flex gap-2 border-t border-hairline p-3">
                  <button onClick={() => focusOn(active!)} className={`${btn} flex items-center justify-center gap-1.5 rounded-xl border-2 border-hairline px-3 py-2.5 text-[12px] font-bold text-ink-3 hover:border-brand/40 hover:text-brand`}><Crosshair className="size-4" />מרכז</button>
                  {tip?.href && <Link href={tip.href} className={`${btn} flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-[13px] font-extrabold text-white shadow-sm`} style={{ background: forWhiteText(accent) }}><ExternalLink className="size-4" />עמוד מלא</Link>}
                </div>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-full flex-col items-center justify-center gap-3 p-6 py-12 text-center text-ink-3">
                <div className="relative grid size-14 place-items-center">
                  <span className="studio-halo absolute inset-0 rounded-full" style={{ background: `radial-gradient(closest-side, ${accent}2e, transparent)` }} />
                  <Crosshair className="size-9 text-ink-3" />
                </div>
                <p className="text-sm font-bold text-ink-3">בחר אובייקט כדי לחקור</p>
                <p className="text-[12px] leading-relaxed">רחף לתצוגה מקדימה, לחץ למיקוד. הגרף תמיד גלוי — הפאנל כאן מתעדכן מיד עם תיאור, קשרים, טעויות נפוצות ופעולות מהירות.</p>
                <button onClick={() => centerOn(DEFAULT_FOCUS[module])} className={`${btn} mt-1 rounded-xl px-4 py-2 text-[12px] font-bold text-white shadow-sm`} style={{ background: forWhiteText(accent) }}>התחל מ-{DEFAULT_FOCUS[module]}</button>
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
            <motion.div initial={{ scale: 0.94, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, opacity: 0 }} onClick={(e) => e.stopPropagation()} dir="rtl" className="w-full max-w-sm rounded-2xl border border-hairline bg-surface p-5 shadow-2xl">
              <div className="mb-3 flex items-center gap-2 text-sm font-extrabold text-ink-1"><Keyboard className="size-4" style={{ color: accent }} />קיצורי מקלדת</div>
              <div className="space-y-1.5 text-[13px]">
                {[["לחיצה על צומת", "מיקוד + הדגשת שכנים"], ["דאבל-קליק", "זום קולנועי אל האובייקט"], ["Space", "מרכז את האובייקט הנבחר"], ["Esc", "חזרה לתצוגה הקודמת / ביטול / יציאת מצגת"], ["+ / −", "זום פנימה / החוצה"], ["גלגלת", "זום אל הסמן"], ["גרירה", "הזזת הקנבס"]].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-3 rounded-lg bg-surface-2 px-3 py-1.5"><span className="text-ink-2">{v}</span><kbd className="rounded bg-surface px-2 py-0.5 font-mono text-[11px] font-bold text-ink-2 shadow-sm">{k}</kbd></div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-3 pb-4 text-center text-[11px] text-ink-3">קשרים אמיתיים מתוך מודל הנתונים — ללא המצאה · המצב נשמר אוטומטית. <Link href={module === "PM" ? "/pm/" : "/pp-pi/"} className="font-bold text-brand">חזרה למרכז {module}</Link></p>
    </div>
  );
}
