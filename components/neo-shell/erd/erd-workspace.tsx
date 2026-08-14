"use client";

// Project NEO · NEO ERD — the data-model workspace.
//
// THE ENGINE IS NOT NEW. The interaction model below is the Architecture
// Studio's (components/architecture-studio.tsx, rendered at /studio/), brought
// into the NEO shell. That file is a live production surface and is NOT touched
// by this one; what is reused is its BEHAVIOUR, restated here over the NEO
// payload:
//
//   ported verbatim in maths   bounds-guarded camera (clampTr -> clampView),
//                              fit-to-view, soft focus camera (k = min(1.35,
//                              max(k, .95))), cinematic zoom-into on
//                              double-activate (k = min(2.2, max(1.7, k*1.5))),
//                              camera history so Escape rewinds the view,
//                              minimap jump, pinch-zoom, hover-preview +
//                              click-select + neighbour dimming, search that
//                              reveals-then-centres, keyboard sheet, persisted
//                              session state.
//   ported in spirit           the studio's "expand/collapse a neighbourhood"
//                              becomes focus mode: the ego layout below. The
//                              studio re-solves dagre for a subset; here the
//                              build-time layout is authoritative, so focus is a
//                              deterministic radial re-placement instead.
//   deliberately NOT ported    free wheel-zoom. The studio owns its whole page;
//                              this workspace lives inside a scrolling shell, so
//                              the wheel stays the page's unless Ctrl/Cmd is
//                              held. Zoom is also on buttons and on + - 0.
//
// SCROLLING IS NEVER TAKEN FROM THE USER
//   wheel without Ctrl/Cmd returns immediately; preventDefault is called in the
//   modifier branch only. The stage declares touch-action:none because it is a
//   bounded, declared gesture region — the page scrolls everywhere around it.
//
// PERFORMANCE
//   Pan and zoom write ONE transform on ONE <g> plus the minimap rect. React
//   never re-renders during a drag. The focus tween writes node transforms and
//   edge `d` directly for its 460ms and then commits once.
//
// MOTION (§15)
//   transform and opacity only. One easing. The layout only ever changes on an
//   explicit act (select a table, toggle focus, change depth) and the result is
//   a pure function of that act — no physics, no jitter, no re-shuffle on hover.
//
// COLOUR, per the form rule in app/globals.css (above --mod-pm)
//   MODULE  --mod-*  node ring, node surface tint, EDGE stroke, list marker.
//                    PM reads teal, PP-PI reads blue, a table or a relation both
//                    blueprints document carries both in a gradient. Never a dot.
//   OBJECT  --obj-*  the class marker bar on a node.
//   RELATION         stated strength is drawn as SHAPE, not as a second hue: a
//                    key bar on the primary-key end, a crow's foot on an N side,
//                    a dashed line when the blueprint stated no strength.
//   BRAND   --brand  focus ring and the minimap viewport. Never a data category.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Crosshair, Keyboard, Layers, Maximize2, Minus, PanelRightClose,
  PanelRightOpen, Plus, RotateCcw, Scan, Search, Target, X,
} from "lucide-react";
import type { ErdPayload, ErdPayloadEdge, ErdPayloadNode } from "./erd-data";
import { ErdInspector } from "./erd-inspector";
import {
  adjacency, bboxOf, capTransform, clampK, clampView, computeGeom, ease, egoPositions,
  lerp, mapGeom, mapPositions, neighbourLevels, pathD,
  type EdgeGeom, type GeomMap, type PosMap, type View,
} from "./graph";

type ModuleKey = "PM" | "PP-PI";
type ModFilter = "all" | "PM" | "PP-PI" | "shared";
type RelKind = "1-1" | "n-1" | "unstated";

const MOD_VAR: Record<string, string> = { PM: "var(--mod-pm)", "PP-PI": "var(--mod-pppi)" };
const REL_HE: Record<RelKind, string> = { "1-1": "1:1", "n-1": "N:1", unstated: "ללא עוצמה" };
const ALL_REL: RelKind[] = ["1-1", "n-1", "unstated"];

const SKEY = "neo:erd:v1";
const TWEEN = 460;
const PAD = 44;

const nf = new Intl.NumberFormat("he-IL");

interface Saved {
  mod?: ModFilter;
  rel?: RelKind[];
  depth?: 1 | 2;
  iso?: boolean;
  insp?: boolean;
  sel?: string | null;
}

export function ErdWorkspace({ data }: { data: ErdPayload }) {
  const router = useRouter();

  const stage = useRef<HTMLDivElement>(null);
  const world = useRef<SVGGElement>(null);
  const miniBox = useRef<SVGRectElement>(null);
  const view = useRef<View>({ x: 0, y: 0, k: 1 });
  const anim = useRef(0);
  const tween = useRef(0);
  /** Camera history — Escape rewinds to the previous view before it deselects.
   *  The studio's pushCam/popCam, same 24-deep cap. */
  const camHist = useRef<View[]>([]);
  const moving = useRef(false);

  const [zoomPct, setZoomPct] = useState(100);
  const [sel, setSel] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [mod, setMod] = useState<ModFilter>("all");
  const [rel, setRel] = useState<Set<RelKind>>(() => new Set(ALL_REL));
  const [depth, setDepth] = useState<1 | 2>(1);
  const [focus, setFocus] = useState(false);
  const [iso, setIso] = useState(true);
  const [insp, setInsp] = useState(true);
  const [keys, setKeys] = useState(false);

  /* ------------------------------------------------------------ base index */

  const byName = useMemo(() => new Map(data.nodes.map((n) => [n.n, n])), [data.nodes]);
  const sizeMap = useMemo(
    () => new Map(data.nodes.map((n) => [n.n, { w: n.w, h: n.h }])),
    [data.nodes],
  );
  const basePos = useMemo(() => mapPositions(data.nodes), [data.nodes]);
  const baseGeom = useMemo(() => mapGeom(data.edges), [data.edges]);

  /** The busiest documented table. Used as the "start here" pointer when nothing
   *  is selected — the studio's DEFAULT_FOCUS, derived from the data instead of
   *  hard-coded, so it can never name a table the dictionary does not hold. */
  const busiest = useMemo(
    () => [...data.nodes].sort((a, b) => b.d - a.d || a.n.localeCompare(b.n))[0]?.n ?? null,
    [data.nodes],
  );

  /* --------------------------------------------------------------- filters */

  const nodeOn = useCallback(
    (n: ErdPayloadNode) => {
      if (!iso && n.d === 0) return false;
      if (mod === "all") return true;
      if (mod === "shared") return n.b === 1;
      return n.m.includes(mod as ModuleKey);
    },
    [mod, iso],
  );

  const edgeOn = useCallback(
    (e: ErdPayloadEdge) => {
      if (!rel.has(e.k as RelKind)) return false;
      const p = byName.get(e.p);
      const c = byName.get(e.c);
      return !!p && !!c && nodeOn(p) && nodeOn(c);
    },
    [rel, byName, nodeOn],
  );

  const liveEdges = useMemo(() => data.edges.filter(edgeOn), [data.edges, edgeOn]);
  const adj = useMemo(() => adjacency(liveEdges), [liveEdges]);

  /* ------------------------------------------------------------- selection */

  // Hover previews, selection commits. The inspector reads whichever is live —
  // the studio's `sel || hover`, guarded against a name the graph does not hold.
  //
  // Hover is IGNORED while focus mode is on. Focus re-places the tables around
  // one of them, so letting a passing mouse retarget it would re-lay the graph
  // out on every pixel of movement — precisely the jitter §15 forbids.
  const activeName =
    sel && byName.has(sel) ? sel : !focus && hover && byName.has(hover) ? hover : null;
  const active = activeName ? byName.get(activeName) ?? null : null;
  const levels = useMemo(() => neighbourLevels(activeName, adj), [activeName, adj]);

  const activeEdges = useMemo(
    () => (activeName ? liveEdges.filter((e) => e.p === activeName || e.c === activeName) : []),
    [activeName, liveEdges],
  );

  const query = q.trim().toLowerCase();
  const hits = useMemo(() => {
    const pool = data.nodes.filter(nodeOn);
    const list = query
      ? pool.filter((n) => n.n.toLowerCase().includes(query) || n.he.toLowerCase().includes(query))
      : pool;
    return [...list].sort((a, b) => b.d - a.d || a.n.localeCompare(b.n));
  }, [data.nodes, query, nodeOn]);
  const hitSet = useMemo(() => new Set(query ? hits.map((n) => n.n) : []), [hits, query]);

  /* ------------------------------------------------- layout: map <-> focus */

  /** The target picture for the current act. Pure: same inputs, same output. */
  const target = useMemo(() => {
    // Keyed on the SELECTED table, never on the hovered one — see activeName.
    const f = focus && sel && byName.has(sel) ? sel : null;
    if (!f) return { pos: basePos, geom: baseGeom, ego: null as Set<string> | null };
    const ego = new Set<string>([f, ...levels.l1]);
    if (depth === 2) for (const n of levels.l2) ego.add(n);
    const pos = egoPositions(f, levels.l1, levels.l2, depth, basePos);
    return { pos, geom: computeGeom(pos, sizeMap, data.edges), ego };
  }, [focus, sel, byName, levels, depth, basePos, baseGeom, sizeMap, data.edges]);

  const [live, setLive] = useState<{ pos: PosMap; geom: GeomMap; ego: Set<string> | null }>(() => ({
    pos: basePos,
    geom: baseGeom,
    ego: null,
  }));

  /** The tween. Node transforms and edge `d` are written straight to the DOM for
   *  its duration, then the new picture is committed once — so React renders the
   *  old geometry, then the new one, and never anything in between. */
  useEffect(() => {
    if (target.pos === live.pos && target.geom === live.geom && target.ego === live.ego) return;
    const g = world.current;
    const calm =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!g || calm) {
      setLive(target);
      return;
    }
    const from = { pos: live.pos, geom: live.geom };
    const to = target;
    const nodeEls = [...g.querySelectorAll<SVGGElement>("g[data-node]")];
    const edgeEls = [...g.querySelectorAll<SVGPathElement>("path[data-edge]")];
    const st = stage.current;
    moving.current = true;
    setHover(null);
    st?.setAttribute("data-moving", "1");
    cancelAnimationFrame(tween.current);
    const t0 = performance.now();
    const step = (t: number) => {
      const e = ease(Math.min(1, (t - t0) / TWEEN));
      for (const el of nodeEls) {
        const n = el.dataset.node!;
        const a = from.pos.get(n);
        const b = to.pos.get(n);
        if (!a || !b) continue;
        el.setAttribute("transform", `translate(${lerp(a.x, b.x, e)} ${lerp(a.y, b.y, e)})`);
      }
      for (const el of edgeEls) {
        const id = el.dataset.edge!;
        const a = from.geom.get(id);
        const b = to.geom.get(id);
        if (!a || !b) continue;
        el.setAttribute("d", pathD(mix(a, b, e)));
      }
      if (e < 1) tween.current = requestAnimationFrame(step);
      else {
        moving.current = false;
        st?.removeAttribute("data-moving");
        setLive(to);
      }
    };
    tween.current = requestAnimationFrame(step);
    return () => {
      // An interrupted tween must never leave the stage permanently inert.
      cancelAnimationFrame(tween.current);
      moving.current = false;
      st?.removeAttribute("data-moving");
    };
  }, [target, live]);

  /** The region the camera is allowed to reason about: the whole model, or just
   *  the neighbourhood while focus mode is on. */
  const bbox = useMemo(
    () => bboxOf(live.pos, sizeMap, live.ego ?? undefined),
    [live.pos, live.ego, sizeMap],
  );
  const bboxRef = useRef(bbox);
  useEffect(() => {
    bboxRef.current = bbox;
  }, [bbox]);

  /* ------------------------------------------------------------- the camera */

  const paint = useCallback(() => {
    const { x, y, k } = view.current;
    world.current?.setAttribute("transform", `translate(${x} ${y}) scale(${k})`);
    const st = stage.current;
    const mv = miniBox.current;
    if (st && mv) {
      mv.setAttribute("x", String(-x / k));
      mv.setAttribute("y", String(-y / k));
      mv.setAttribute("width", String(st.clientWidth / k));
      mv.setAttribute("height", String(st.clientHeight / k));
    }
  }, []);

  const clamp = useCallback(
    (v: View) => {
      const st = stage.current;
      return clampView(v, bbox, st?.clientWidth || 800, st?.clientHeight || 560);
    },
    [bbox],
  );

  const glide = useCallback(
    (to: View) => {
      cancelAnimationFrame(anim.current);
      const end = clamp(to);
      const from = { ...view.current };
      const calm =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (calm) {
        view.current = end;
        paint();
        setZoomPct(Math.round(end.k * 100));
        return;
      }
      const t0 = performance.now();
      const step = (t: number) => {
        const e = ease(Math.min(1, (t - t0) / TWEEN));
        view.current = {
          x: lerp(from.x, end.x, e),
          y: lerp(from.y, end.y, e),
          k: lerp(from.k, end.k, e),
        };
        paint();
        if (e < 1) anim.current = requestAnimationFrame(step);
        else setZoomPct(Math.round(end.k * 100));
      };
      anim.current = requestAnimationFrame(step);
    },
    [clamp, paint],
  );

  const pushCam = useCallback(() => {
    camHist.current.push({ ...view.current });
    if (camHist.current.length > 24) camHist.current.shift();
  }, []);

  const fit = useCallback(() => {
    const st = stage.current;
    if (!st) return;
    const k = clampK(
      Math.min((st.clientWidth - PAD * 2) / bbox.w, (st.clientHeight - PAD * 2) / bbox.h),
    );
    glide({
      k,
      x: (st.clientWidth - bbox.w * k) / 2 - bbox.x * k,
      y: (st.clientHeight - bbox.h * k) / 2 - bbox.y * k,
    });
  }, [bbox, glide]);

  /** Soft camera — centre plus a gentle zoom toward the table. The studio's
   *  focusOn, same numbers. */
  const centre = useCallback(
    (name: string, k?: number) => {
      const st = stage.current;
      const p = live.pos.get(name);
      if (!st || !p) return;
      const kk = clampK(k ?? Math.min(1.35, Math.max(view.current.k, 0.95)));
      glide({ k: kk, x: st.clientWidth / 2 - p.x * kk, y: st.clientHeight / 2 - p.y * kk });
    },
    [live.pos, glide],
  );

  /** Cinematic zoom INTO a table. The studio's zoomInto, same numbers. */
  const zoomInto = useCallback(
    (name: string) => {
      pushCam();
      centre(name, Math.min(2.2, Math.max(1.7, view.current.k * 1.5)));
    },
    [centre, pushCam],
  );

  const zoomAt = useCallback(
    (mult: number, px?: number, py?: number) => {
      const st = stage.current;
      if (!st) return;
      cancelAnimationFrame(anim.current);
      const cx = px ?? st.clientWidth / 2;
      const cy = py ?? st.clientHeight / 2;
      const v = view.current;
      const k1 = clampK(v.k * mult);
      view.current = clamp({
        k: k1,
        x: cx - (cx - v.x) * (k1 / v.k),
        y: cy - (cy - v.y) * (k1 / v.k),
      });
      paint();
      setZoomPct(Math.round(view.current.k * 100));
    },
    [clamp, paint],
  );

  const pick = useCallback(
    (name: string) => {
      pushCam();
      setSel(name);
      setHover(null);
      window.setTimeout(() => centre(name), 30);
    },
    [centre, pushCam],
  );

  const open = useCallback((name: string) => router.push(`/neo/object/${name}/`), [router]);

  const reset = useCallback(() => {
    setSel(null);
    setHover(null);
    setQ("");
    setMod("all");
    setRel(new Set(ALL_REL));
    setDepth(1);
    setFocus(false);
    setIso(true);
    camHist.current = [];
    window.setTimeout(fit, 30);
  }, [fit]);

  /* ------------------------------------------------- restore + persist state */

  useEffect(() => {
    // Read on the next frame rather than in the effect body: localStorage is an
    // external system, the server rendered the defaults, and restoring inside
    // the body would be a synchronous cascading render on every mount.
    const id = requestAnimationFrame(() => {
      try {
        const s = JSON.parse(localStorage.getItem(SKEY) || "null") as Saved | null;
        if (!s) return;
        if (s.mod) setMod(s.mod);
        if (s.rel?.length) setRel(new Set(s.rel));
        if (s.depth) setDepth(s.depth);
        if (typeof s.iso === "boolean") setIso(s.iso);
        if (typeof s.insp === "boolean") setInsp(s.insp);
        // Focus mode is NOT restored: it is a transient reading posture, and
        // reopening the page inside a collapsed ego view hides the map.
        if (s.sel) setSel(s.sel);
      } catch {
        /* a private-mode browser is not an error */
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const saveT = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (saveT.current) clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try {
        const s: Saved = { mod, rel: [...rel], depth, iso, insp, sel };
        localStorage.setItem(SKEY, JSON.stringify(s));
      } catch {
        /* noop */
      }
    }, 450);
  }, [mod, rel, depth, iso, insp, sel]);

  /* ------------------------------------------------------- initial framing */

  useEffect(() => {
    const st = stage.current;
    if (!st) return;
    // A deep link from an object page: /neo/erd/#AUFK opens on that table.
    const want = decodeURIComponent((window.location.hash || "").slice(1)).toUpperCase();
    const start = byName.get(want);
    const k = start
      ? 1
      : clampK(Math.min((st.clientWidth - PAD * 2) / data.w, (st.clientHeight - PAD * 2) / data.h));
    view.current = start
      ? { k, x: st.clientWidth / 2 - start.x * k, y: st.clientHeight / 2 - start.y * k }
      : { k, x: (st.clientWidth - data.w * k) / 2, y: (st.clientHeight - data.h * k) / 2 };
    paint();
    setZoomPct(Math.round(k * 100));
    if (start) setSel(start.n);
    const ro = new ResizeObserver(() => {
      view.current = clampView(view.current, bboxRef.current, st.clientWidth, st.clientHeight);
      paint();
    });
    ro.observe(st);
    window.addEventListener("orientationchange", paint);
    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", paint);
    };
  }, [byName, data.w, data.h, paint]);

  /** Entering focus mode frames the neighbourhood, once, after its tween has
   *  committed. Leaving it deliberately does NOT move the camera: you land back
   *  on the full map exactly where you were reading. */
  const egoWas = useRef<Set<string> | null>(null);
  useEffect(() => {
    if (live.ego === egoWas.current) return;
    egoWas.current = live.ego;
    if (live.ego) fit();
  }, [live.ego, fit]);

  /** The sheet is a dialog: Escape closes it wherever the focus happens to be. */
  useEffect(() => {
    if (!keys) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setKeys(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [keys]);

  /* ---------------------------------------------------------------- wheel */

  useEffect(() => {
    const st = stage.current;
    if (!st) return;
    const onWheel = (e: WheelEvent) => {
      // No modifier ⇒ this is a page scroll and it is none of our business.
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const r = st.getBoundingClientRect();
      zoomAt(Math.exp(-e.deltaY * 0.0022), e.clientX - r.left, e.clientY - r.top);
    };
    st.addEventListener("wheel", onWheel, { passive: false });
    return () => st.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  /* ----------------------------------------------------- pointer: pan/pinch */

  useEffect(() => {
    const st = stage.current;
    if (!st) return;
    const pts = new Map<number, { x: number; y: number }>();
    let pinch = 0;
    let moved = 0;

    const down = (e: PointerEvent) => {
      if (moving.current) return;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pts.size === 1) moved = 0;
      if (pts.size === 2) {
        const [a, b] = [...pts.values()];
        pinch = Math.hypot(a.x - b.x, a.y - b.y);
      }
      st.setPointerCapture(e.pointerId);
      st.dataset.drag = "1";
      cancelAnimationFrame(anim.current);
    };

    const move = (e: PointerEvent) => {
      const prev = pts.get(e.pointerId);
      if (!prev) return;
      const now = { x: e.clientX, y: e.clientY };
      pts.set(e.pointerId, now);

      if (pts.size === 1) {
        const dx = now.x - prev.x;
        const dy = now.y - prev.y;
        moved += Math.abs(dx) + Math.abs(dy);
        view.current = clamp({ ...view.current, x: view.current.x + dx, y: view.current.y + dy });
        paint();
        return;
      }
      if (pts.size === 2) {
        const [a, b] = [...pts.values()];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (pinch > 0) {
          const r = st.getBoundingClientRect();
          zoomAt(d / pinch, (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top);
        }
        pinch = d;
        moved += 20;
      }
    };

    const up = (e: PointerEvent) => {
      pts.delete(e.pointerId);
      if (pts.size < 2) pinch = 0;
      if (st.hasPointerCapture(e.pointerId)) st.releasePointerCapture(e.pointerId);
      st.dataset.drag = "0";
      // A drag is not a click. Only a still pointer selects.
      if (moved >= 6) return;
      const t = e.target as Element | null;
      if (t?.closest?.("[data-open]")) return; // the open affordance owns its click
      const name = t?.closest?.("[data-node]")?.getAttribute("data-node");
      if (name) {
        pushCam();
        setSel((s) => {
          if (s !== name) return name;
          // Deselecting also leaves focus mode: a focused view with nothing
          // focused would be an empty stage.
          setFocus(false);
          return null;
        });
        window.setTimeout(() => centre(name), 30);
      } else if (e.target === st || (e.target as Element)?.tagName === "svg") {
        setSel(null);
        setFocus(false);
      }
    };

    st.addEventListener("pointerdown", down);
    st.addEventListener("pointermove", move);
    st.addEventListener("pointerup", up);
    st.addEventListener("pointercancel", up);
    return () => {
      st.removeEventListener("pointerdown", down);
      st.removeEventListener("pointermove", move);
      st.removeEventListener("pointerup", up);
      st.removeEventListener("pointercancel", up);
    };
  }, [clamp, paint, zoomAt, centre, pushCam]);

  /* ------------------------------------------------------------- keyboard */

  const onKey = (e: React.KeyboardEvent) => {
    const step = 90;
    if (e.key === "+" || e.key === "=") {
      e.preventDefault();
      zoomAt(1.22);
    } else if (e.key === "-" || e.key === "_") {
      e.preventDefault();
      zoomAt(1 / 1.22);
    } else if (e.key === "0") {
      e.preventDefault();
      fit();
    } else if (e.key === " " && sel) {
      e.preventDefault();
      centre(sel);
    } else if (e.key === "Enter" && sel) {
      e.preventDefault();
      open(sel);
    } else if (e.key === "Escape") {
      // The studio's rewind-before-deselect: Escape first returns the camera to
      // where it was, and only then gives up the selection.
      if (focus) setFocus(false);
      else if (camHist.current.length) glide(camHist.current.pop()!);
      else setSel(null);
    } else if (e.key.startsWith("Arrow")) {
      e.preventDefault();
      cancelAnimationFrame(anim.current);
      const v = { ...view.current };
      if (e.key === "ArrowUp") v.y += step;
      if (e.key === "ArrowDown") v.y -= step;
      if (e.key === "ArrowLeft") v.x += step;
      if (e.key === "ArrowRight") v.x -= step;
      view.current = clamp(v);
      paint();
    }
  };

  /* -------------------------------------------------------------- minimap */

  const miniTo = (e: React.PointerEvent<SVGSVGElement>) => {
    const st = stage.current;
    const svg = e.currentTarget;
    if (!st) return;
    const r = svg.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * data.w;
    const y = ((e.clientY - r.top) / r.height) * data.h;
    const k = view.current.k;
    cancelAnimationFrame(anim.current);
    view.current = clamp({ k, x: st.clientWidth / 2 - x * k, y: st.clientHeight / 2 - y * k });
    paint();
  };

  /* --------------------------------------------------------- level helpers */

  const nodeLvl = (n: string): string => {
    if (!activeName) return "";
    if (n === activeName) return "0";
    if (levels.l1.has(n)) return "1";
    if (depth === 2 && levels.l2.has(n)) return "2";
    return "x";
  };

  const edgeLvl = (e: ErdPayloadEdge): string => {
    if (!activeName) return "";
    if (e.p === activeName || e.c === activeName) return "1";
    if (depth === 2 && (levels.l1.has(e.p) || levels.l1.has(e.c))) {
      const far = levels.l1.has(e.p) ? e.c : e.p;
      if (levels.l2.has(far) || levels.l1.has(far)) return "2";
    }
    return "x";
  };

  const shown = (name: string) => !live.ego || live.ego.has(name);

  const topHits = query ? hits.slice(0, 8) : [];

  /* ---------------------------------------------------------------- render */

  return (
    <div
      className="ne"
      data-sel={sel ? "1" : "0"}
      data-q={query ? "1" : "0"}
      data-focus={focus && sel ? "1" : "0"}
      data-insp={insp ? "1" : "0"}
    >
      <header className="ne-bar">
        <div className="ne-bar-id">
          <h1 className="ne-h1">מודל הנתונים</h1>
          <p className="ne-sub">
            {nf.format(data.stats.tables)} טבלאות · {nf.format(data.stats.edges)} קשרים ממודלים ·{" "}
            {nf.format(data.stats.shared)} משותפות לשני המודולים
          </p>
        </div>

        <div className="ne-find-top">
          <label className="ne-search">
            <Search size={14} strokeWidth={1.9} aria-hidden="true" />
            <input
              type="search"
              value={q}
              onChange={(ev) => setQ(ev.target.value)}
              placeholder="חפש טבלה או תיאור"
              aria-label="חיפוש טבלה בתרשים"
              dir="auto"
            />
            {q ? (
              <button type="button" className="nu-ghost ne-x" onClick={() => setQ("")} aria-label="נקה חיפוש">
                <X size={13} strokeWidth={2.2} aria-hidden="true" />
              </button>
            ) : null}
          </label>
          {topHits.length ? (
            <ul className="ne-sugg">
              {topHits.map((n) => (
                <li key={n.n}>
                  <button
                    type="button"
                    className="nu-ghost ne-row"
                    style={{ "--ms": n.b === 1 ? "var(--mod-pm)" : MOD_VAR[n.m[0]] } as React.CSSProperties}
                    onClick={() => {
                      setQ("");
                      pick(n.n);
                    }}
                  >
                    <i className="ne-row-bar" aria-hidden="true" />
                    <b className="nx-sap">{n.n}</b>
                    <em>{n.he || "—"}</em>
                    <span className="nx-sap">{n.d}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="ne-view" role="group" aria-label="תצוגה">
          <div className="ne-group">
            <button type="button" className="nu-ghost" onClick={() => zoomAt(1 / 1.22)} aria-label="התרחק">
              <Minus size={16} strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="nu-ghost ne-pct nx-sap"
              onClick={() => zoomAt(1 / view.current.k)}
              aria-label={`הזום כעת ${zoomPct} אחוז. לחיצה מחזירה למאה אחוז`}
            >
              {zoomPct}%
            </button>
            <button type="button" className="nu-ghost" onClick={() => zoomAt(1.22)} aria-label="התקרב">
              <Plus size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
          <div className="ne-group">
            <button type="button" className="nu-ghost" onClick={fit} aria-label="התאם הכול למסך">
              <Maximize2 size={15} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="nu-ghost"
              onClick={() => sel && centre(sel, 1.15)}
              disabled={!sel}
              aria-label="מרכז את הטבלה הנבחרת"
            >
              <Crosshair size={15} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="nu-ghost"
              onClick={() => sel && zoomInto(sel)}
              disabled={!sel}
              aria-label="זום אל הטבלה הנבחרת"
            >
              <Scan size={15} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button type="button" className="nu-ghost" onClick={reset} aria-label="אפס תצוגה ומסננים">
              <RotateCcw size={15} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
          <div className="ne-group">
            <button
              type="button"
              className="nu-ghost"
              onClick={() => setInsp((v) => !v)}
              aria-pressed={insp}
              aria-label={insp ? "סגור את פאנל הפרטים" : "פתח את פאנל הפרטים"}
            >
              {insp ? (
                <PanelRightClose size={15} strokeWidth={1.8} aria-hidden="true" />
              ) : (
                <PanelRightOpen size={15} strokeWidth={1.8} aria-hidden="true" />
              )}
            </button>
            <button
              type="button"
              className="nu-ghost"
              onClick={() => setKeys(true)}
              aria-label="קיצורי מקלדת ומקרא"
            >
              <Keyboard size={15} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div className="ne-filters">
        <div className="ne-fgrp" role="group" aria-label="סינון לפי מודול">
          <span className="ne-flabel">מודול</span>
          {(
            [
              ["all", `הכול · ${data.stats.tables}`],
              ["PM", `PM · ${data.stats.pm}`],
              ["PP-PI", `PP-PI · ${data.stats.pppi}`],
              ["shared", `משותפות · ${data.stats.shared}`],
            ] as [ModFilter, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className="nu-filter"
              style={id === "PM" || id === "PP-PI" ? ({ "--m": MOD_VAR[id] } as React.CSSProperties) : undefined}
              aria-pressed={mod === id}
              onClick={() => setMod(id)}
            >
              {id === "PM" || id === "PP-PI" ? <i aria-hidden="true" /> : null}
              {id === "shared" ? <Layers size={12} strokeWidth={1.9} aria-hidden="true" /> : null}
              {label}
            </button>
          ))}
        </div>

        <div className="ne-fgrp" role="group" aria-label="סינון לפי סוג קשר">
          <span className="ne-flabel">קשר</span>
          {ALL_REL.map((k) => (
            <button
              key={k}
              type="button"
              className="nu-filter ne-rel"
              data-kind={k}
              aria-pressed={rel.has(k)}
              onClick={() =>
                setRel((s) => {
                  const n = new Set(s);
                  if (n.has(k)) {
                    if (n.size > 1) n.delete(k);
                  } else n.add(k);
                  return n;
                })
              }
            >
              <i aria-hidden="true" />
              {REL_HE[k]}
            </button>
          ))}
        </div>

        <div className="ne-fgrp" role="group" aria-label="עומק הדגשה">
          <span className="ne-flabel">הדגשה</span>
          <button type="button" className="nu-filter" aria-pressed={depth === 1} onClick={() => setDepth(1)}>
            קשרים ישירים
          </button>
          <button type="button" className="nu-filter" aria-pressed={depth === 2} onClick={() => setDepth(2)}>
            עד רמה שנייה
          </button>
        </div>

        <div className="ne-fgrp">
          <button
            type="button"
            className="nu-filter"
            aria-pressed={focus}
            disabled={!sel}
            onClick={() => setFocus((v) => !v)}
          >
            <Target size={12} strokeWidth={2} aria-hidden="true" />
            מצב מיקוד
          </button>
          <button type="button" className="nu-filter" aria-pressed={iso} onClick={() => setIso((v) => !v)}>
            טבלאות ללא קשר
          </button>
        </div>
      </div>

      <div className="ne-body">
        {/* --------------------------------------------------------- THE STAGE */}
        <div
          className="ne-stage"
          ref={stage}
          tabIndex={0}
          onKeyDown={onKey}
          role="application"
          aria-label="קנבס מודל הנתונים. גרירה להזזה, Ctrl וגלגלת לזום, מקשים + − 0, חצים להזזה, Enter לפתיחת הטבלה הנבחרת"
        >
          <svg className="ne-canvas" role="img" aria-label={`תרשים ER של ${data.stats.tables} טבלאות SAP`}>
            <defs>
              {/* A table, or a relation, that BOTH blueprints document is not
                  assigned to one of them — it carries both hues. */}
              <linearGradient id="ne-both" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--mod-pm)" />
                <stop offset="100%" stopColor="var(--mod-pppi)" />
              </linearGradient>
              <linearGradient id="ne-both-e" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--mod-pm)" />
                <stop offset="100%" stopColor="var(--mod-pppi)" />
              </linearGradient>
            </defs>

            <g ref={world}>
              {/* EDGES */}
              <g className="ne-edges">
                {data.edges.map((e) => {
                  const g = live.geom.get(e.i);
                  if (!g) return null;
                  const off = !edgeOn(e) || !shown(e.p) || !shown(e.c);
                  const lvl = edgeLvl(e);
                  const mods = [...new Set(e.j.map((j) => j.m))];
                  const stroke = mods.length > 1 ? "url(#ne-both-e)" : MOD_VAR[mods[0]] || "var(--ink-3)";
                  // The one statement carrying real key fields, if the
                  // dictionary wrote any. Never assembled from two rows.
                  const kf = e.j.find((j) => j.pk || j.fk);
                  const lab = e.cd || REL_HE[e.k as RelKind];
                  return (
                    <g
                      key={e.i}
                      className="ne-edge"
                      data-lvl={lvl}
                      data-off={off ? "1" : "0"}
                      data-kind={e.k}
                      style={{ "--e": stroke } as React.CSSProperties}
                    >
                      <path className="ne-edge-p" data-edge={e.i} d={pathD(g)} />
                      {/* Direction and strength as SHAPE, from the real record:
                          a key bar on the primary-key end, a crow's foot on an
                          N side, a plain tick where the blueprint stated no
                          cardinality at all. */}
                      <g className="ne-cap" transform={capTransform(g, "p")}>
                        <circle className="ne-cap-d" r={3.2} />
                        <path className="ne-cap-l" d="M7 -6 L7 6" />
                      </g>
                      <g className="ne-cap" transform={capTransform(g, "c")}>
                        {e.k === "n-1" ? (
                          <path className="ne-cap-l" d="M0 0 L10 -6 M0 0 L10 0 M0 0 L10 6" />
                        ) : e.k === "1-1" ? (
                          <path className="ne-cap-l" d="M6 -6 L6 6 M10 -6 L10 6" />
                        ) : (
                          <path className="ne-cap-l" d="M6 -5 L6 5" />
                        )}
                      </g>
                      {lvl === "1" ? (
                        <circle
                          className="ne-pulse"
                          cx={g.x1}
                          cy={g.y1}
                          r={3}
                          style={{ "--dx": `${g.x2 - g.x1}px`, "--dy": `${g.y2 - g.y1}px` } as React.CSSProperties}
                        />
                      ) : null}
                      <text className="ne-edge-t" x={g.cx} y={g.cy - 8} textAnchor="middle">
                        {kf?.pk && kf?.fk ? `${lab} · ${kf.pk} → ${kf.fk}` : lab}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* NODES */}
              <g className="ne-nodes">
                {data.nodes.map((n) => {
                  const p = live.pos.get(n.n);
                  if (!p) return null;
                  const off = !nodeOn(n) || !shown(n.n);
                  const lvl = nodeLvl(n.n);
                  const hit = query ? hitSet.has(n.n) : false;
                  const start = !activeName && n.n === busiest;
                  return (
                    <g
                      key={n.n}
                      className="ne-node"
                      data-node={n.n}
                      data-lvl={lvl}
                      data-off={off ? "1" : "0"}
                      data-hit={hit ? "1" : "0"}
                      data-start={start ? "1" : "0"}
                      data-shared={n.b === 1 ? "1" : "0"}
                      transform={`translate(${p.x} ${p.y})`}
                      onMouseEnter={() => !moving.current && setHover(n.n)}
                      onMouseLeave={() => setHover((h) => (h === n.n ? null : h))}
                      onDoubleClick={() => open(n.n)}
                      style={
                        {
                          "--m": n.b === 1 ? "url(#ne-both)" : MOD_VAR[n.m[0]],
                          "--ms": n.b === 1 ? "var(--mod-pm)" : MOD_VAR[n.m[0]],
                          "--o": n.o,
                        } as React.CSSProperties
                      }
                    >
                      <title>{`${n.n} — ${n.he}`}</title>
                      <rect className="ne-node-h" x={-n.w / 2 - 5} y={-n.h / 2 - 5} width={n.w + 10} height={n.h + 10} rx={13} />
                      <rect className="ne-node-r" x={-n.w / 2} y={-n.h / 2} width={n.w} height={n.h} rx={9} />
                      <rect className="ne-node-cls" x={-n.w / 2 + 7} y={-9} width={4} height={18} rx={2} />
                      <text className="ne-node-n" x={-n.w / 2 + 18} y={-8}>
                        {n.n}
                      </text>
                      <text className="ne-node-k" x={-n.w / 2 + 18} y={9}>
                        {n.pk.length
                          ? `PK ${n.pk[0]}${n.pk.length > 1 ? ` +${n.pk.length - 1}` : ""}`
                          : `${n.f} שדות`}
                      </text>
                      <text className="ne-node-fk" x={-n.w / 2 + 18} y={21}>
                        {n.fk.length ? `FK ${n.fk.length}` : ""}
                      </text>
                      <text className="ne-node-d" x={n.w / 2 - 10} y={-8} textAnchor="end">
                        {n.d}
                      </text>
                      {/* Open the real object page. A separate affordance so a
                          plain click can still select without navigating away. */}
                      <a
                        className="ne-node-go"
                        data-open="1"
                        href={`/neo/object/${n.n}/`}
                        aria-label={`פתח את עמוד האובייקט ${n.n}`}
                        onClick={(ev) => {
                          ev.preventDefault();
                          ev.stopPropagation();
                          open(n.n);
                        }}
                      >
                        <rect x={n.w / 2 - 26} y={2} width={20} height={18} rx={5} />
                        <path d="M0 0 L-6 -6 M0 0 L0 -5 M0 0 L-5 0" transform={`translate(${n.w / 2 - 13} ${14})`} />
                      </a>
                    </g>
                  );
                })}
              </g>
            </g>
          </svg>

          {/* MINIMAP */}
          <div className="ne-mini">
            <svg
              viewBox={`0 0 ${data.w} ${data.h}`}
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="מפה מוקטנת של המודל. לחיצה קופצת לאזור"
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                miniTo(e);
              }}
              onPointerMove={(e) => {
                if (e.buttons) miniTo(e);
              }}
            >
              {data.edges.map((e) => {
                const g = live.geom.get(e.i);
                if (!g) return null;
                return <line key={e.i} className="ne-mini-e" x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2} />;
              })}
              {data.nodes.map((n) => {
                const p = live.pos.get(n.n);
                if (!p) return null;
                return (
                  <rect
                    key={n.n}
                    className="ne-mini-n"
                    data-on={sel === n.n ? "1" : "0"}
                    data-off={nodeOn(n) && shown(n.n) ? "0" : "1"}
                    x={p.x - n.w / 2}
                    y={p.y - n.h / 2}
                    width={n.w}
                    height={n.h}
                    style={{ "--ms": n.b === 1 ? "var(--mod-pm)" : MOD_VAR[n.m[0]] } as React.CSSProperties}
                  />
                );
              })}
              <rect ref={miniBox} className="ne-mini-v" x={0} y={0} width={10} height={10} />
            </svg>
          </div>

          <p className="ne-hint">
            <kbd>Ctrl</kbd> + גלגלת לזום · גרירה להזזה · <kbd>+</kbd> <kbd>−</kbd> <kbd>0</kbd> ·
            לחיצה כפולה פותחת את האובייקט
          </p>
        </div>

        {/* ----------------------------------------------------- THE INSPECTOR */}
        {insp ? (
          <ErdInspector
            data={data}
            active={active}
            peek={!sel && !!hover}
            activeEdges={activeEdges}
            l1={levels.l1.size}
            l2={levels.l2.size}
            hits={hits}
            q={q}
            onClearQ={() => setQ("")}
            onPick={pick}
            onCentre={centre}
            selected={sel}
          />
        ) : null}
      </div>

      <p className="ne-credit">Project NEO · CBC Israel — פותח על ידי סאלי חליף · Web Coding</p>

      {keys ? (
        <div
          className="ne-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="קיצורי מקלדת ומקרא"
          onClick={() => setKeys(false)}
        >
          <div className="ne-sheet-b nu-card" onClick={(e) => e.stopPropagation()}>
            <header>
              <h2>קיצורי מקלדת ומקרא</h2>
              <button type="button" className="nu-ghost" onClick={() => setKeys(false)} aria-label="סגור">
                <X size={16} strokeWidth={2} aria-hidden="true" />
              </button>
            </header>
            <dl className="ne-sheet-k">
              {[
                ["לחיצה על טבלה", "בחירה + מיקוד המצלמה"],
                ["לחיצה כפולה", "פתיחת עמוד האובייקט"],
                ["רווח", "מרכוז הטבלה הנבחרת"],
                ["Enter", "פתיחת הטבלה הנבחרת"],
                ["Esc", "חזרה לתצוגה הקודמת · יציאה ממיקוד · ביטול בחירה"],
                ["+ / −", "זום פנימה / החוצה"],
                ["0", "התאמת הכול למסך"],
                ["חצים", "הזזת הקנבס"],
                ["Ctrl + גלגלת", "זום אל הסמן"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt>{v}</dt>
                  <dd>
                    <kbd>{k}</kbd>
                  </dd>
                </div>
              ))}
            </dl>
            <ul className="ne-legend">
              <li style={{ "--e": "var(--mod-pm)" } as React.CSSProperties}>
                <i aria-hidden="true" />
                קשר שתכנון ה־PM רשם
              </li>
              <li style={{ "--e": "var(--mod-pppi)" } as React.CSSProperties}>
                <i aria-hidden="true" />
                קשר שתכנון ה־PP-PI רשם
              </li>
              <li className="ne-lg-both">
                <i aria-hidden="true" />
                קשר ששני התכנונים רשמו
              </li>
              <li data-kind="unstated" style={{ "--e": "var(--ink-3)" } as React.CSSProperties}>
                <i aria-hidden="true" />
                קשר שנרשם בלי עוצמה — מקווקו
              </li>
              <li className="ne-legend-k">
                <span className="ne-lg-pk" aria-hidden="true" />
                נקודה מלאה ופס — צד המפתח הראשי
              </li>
              <li className="ne-legend-k">
                <span className="ne-lg-fk" aria-hidden="true" />
                כף עורב — צד ה־N · שני פסים — צד ה־1
              </li>
            </ul>
            <p className="ne-note">
              כל קשר, עוצמה וניסוח JOIN בתרשים נקראים מילה במילה מתוך מילון הטבלאות. איפה שהתכנון
              שתק, המסך אומר זאת במפורש ולא משלים ניחוש.
            </p>
            <button type="button" className="nu-btn2" onClick={() => setKeys(false)}>
              סגור
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** Interpolate two quadratic chords. Both are three points, so the tween is a
 *  straight lerp of six numbers — deterministic, and it never overshoots. */
function mix(a: EdgeGeom, b: EdgeGeom, t: number): EdgeGeom {
  return {
    x1: lerp(a.x1, b.x1, t),
    y1: lerp(a.y1, b.y1, t),
    cx: lerp(a.cx, b.cx, t),
    cy: lerp(a.cy, b.cy, t),
    x2: lerp(a.x2, b.x2, t),
    y2: lerp(a.y2, b.y2, t),
  };
}
