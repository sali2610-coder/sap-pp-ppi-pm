"use client";

// Project NEO · NEO ERD — the data-model workspace.
//
// WHAT CHANGED, AND WHY
//   This surface used to draw the PM and PP-PI migration blueprints and nothing
//   else — 2 modules, 105 tables — while the production Architecture Explorer
//   draws 13 modules over the canonical SAP model. That gap is the regression
//   the client reported. The DATA now comes from the same two places production
//   reads (public/sap-infrastructure/dataset.json + ERD_MODULES in
//   app/sap-infrastructure/meta.ts), assembled at build time by ./erd-catalog.
//   app/sap-infrastructure/** is imported read-only and is not modified.
//
// THE ENGINE IS NOT NEW
//   The camera, the tween, the minimap, the keyboard model and the neighbour
//   dimming are the Architecture Studio's behaviour, already restated in this
//   file's previous revision and kept here verbatim in maths:
//     bounds-guarded camera (clampView), fit-to-view, soft focus camera
//     (k = min(1.35, max(k, .95))), cinematic zoom-into (k = min(2.2, max(1.7,
//     k*1.5))), camera history so Escape rewinds the view, minimap jump,
//     pinch-zoom, hover-preview + click-select + neighbour dimming, ego focus
//     layout, persisted session state.
//   What is NEW is the LADDER: overview → module → topic/object → table. The
//   graph never dumps 13 modules' worth of nodes on one canvas.
//
// PORTED FROM app/sap-infrastructure/page.tsx (read, not edited)
//   · ERD_MODULES membership as the curated per-module table set.
//   · The module → table drill-down, and the module chip strip that switches it.
//   · The "detail lives in one surface" rule — a selected table owns one panel,
//     never two competing ones.
//   · dagre LR ranking as the layout engine (already a project dependency).
//   · Cardinality drawn on the edge, cross-module edges called out.
//
// SCROLLING IS NEVER TAKEN FROM THE USER
//   wheel without Ctrl/Cmd returns immediately; preventDefault is called in the
//   modifier branch only. Zoom is also on buttons and on + − 0.
//
// MOTION (§15)
//   transform and opacity only, one easing. The picture changes only on an
//   explicit act (open a module, select a table, toggle focus or scope) and the
//   result is a pure function of that act. No physics, no re-shuffle on hover.
//
// COLOUR, per the form rule in app/globals.css above --mod-pm
//   MODULE  --mod-*  node edge-line, node tint, ring, EDGE stroke, list marker.
//                    Never a standalone dot.
//   OBJECT  --obj-*  the class marker on a node.
//   BRAND   --brand  focus ring and the minimap viewport. Never a data category.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight, Boxes, Crosshair, Filter, Keyboard, Layers, Link2, Maximize2, Minus,
  PanelRightClose, PanelRightOpen, Plus, RotateCcw, Scan, Search, Share2, Target, X,
} from "lucide-react";
import {
  LEVEL_HE, MODULE_ORDER, REL_HE, REL_ORDER, ZONE_HE, modVar,
  type ErdCatalog, type ErdEdgeOut, type ErdTable, type Level, type ModCode, type RelKind,
} from "./erd-types";
import {
  SmartReturn, consumeReturn, rememberOrigin, useReturnPacket,
} from "@/components/neo-shell/nav-context";
import { ErdInspector } from "./erd-inspector";
import { ErdSheet } from "./erd-sheet";
import {
  adjacency, bboxOf, capTransform, clampK, clampView, computeGeom, ease, egoPositions,
  lerp, mapPositions, neighbourLevels, pathD,
  type EdgeGeom, type GEdge, type GeomMap, type PosMap, type View,
} from "./graph";

const SKEY = "neo:erd:v2";
const TWEEN = 460;
const PAD = 52;

const nf = new Intl.NumberFormat("he-IL");

/** SVG has no text-overflow. Truncation is therefore explicit and per-metric —
 *  Hebrew at 11.5px and mono at 16px do not measure the same. */
const cut = (s: string, max: number) => (s.length > max ? `${s.slice(0, max - 1)}…` : s);

export interface GroupRef {
  k: "topic" | "object";
  v: string;
}

/* --------------------------------------------------------------- returning

   SMART RETURN, both halves (components/neo-shell/nav-context).

   SENDING    opening a table — from a node, from the inspector, from the card,
              from the keyboard — records the CAMERA as well as the selection.
              A graph is not a list: "where I was" is the table in focus, the
              zoom it was read at and the point the canvas was panned to, and
              restoring only the selection would drop the reader onto the same
              table in a different picture.
   RECEIVING  on the render after a return the module, the focus and every
              filter are put back, and the framing pass that normally fits the
              new picture defers to the camera that was stored instead.

   localStorage (SKEY) still owns the reader's LAST view across sessions. The
   return packet is about ONE journey and outranks it for that one render. */

const SURFACE = "neo:erd";

/** A type alias and not an interface: only an alias picks up the implicit index
 *  signature that lets it satisfy the module's OriginState contract. */
type ErdBack = {
  /** The table in focus — the graph's own idea of "where I was". */
  focus: string | null;
  zoom: number;
  x: number;
  y: number;
  module: string | null;
  /** Every narrowing that was applied, as flat tokens. */
  filters: string[];
};

interface Saved {
  mod?: ModCode | null;
  all?: boolean;
  rel?: RelKind[];
  strong?: boolean;
  shared?: boolean;
  iso?: boolean;
  depth?: 1 | 2;
  insp?: boolean;
  sel?: string | null;
}

export function ErdWorkspace({ data }: { data: ErdCatalog }) {
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
  /** A camera a RETURN asked for. The framing pass below honours it instead of
   *  fitting the picture, once, and then forgets it. */
  const camWanted = useRef<View | null>(null);
  /** True from the first render of a returning visit. It stops the saved-view
   *  restore from overwriting the view the reader is actually coming back to. */
  const returning = useRef(false);

  const [zoomPct, setZoomPct] = useState(100);
  const [mod, setMod] = useState<ModCode | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [group, setGroup] = useState<GroupRef | null>(null);
  const [sel, setSel] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [rel, setRel] = useState<Set<RelKind>>(() => new Set(REL_ORDER));
  const [strong, setStrong] = useState(false);
  const [sharedOnly, setSharedOnly] = useState(false);
  const [iso, setIso] = useState(true);
  const [depth, setDepth] = useState<1 | 2>(1);
  const [focus, setFocus] = useState(false);
  const [insp, setInsp] = useState(true);
  const [sheet, setSheet] = useState<string | null>(null);
  const [keys, setKeys] = useState(false);

  /* ---------------------------------------------------- returning with state

     Applied DURING the render the packet arrives on — adjusting state to a
     changed external value, which is the one place React sanctions a set during
     render. An effect instead would let the saved-view restore land first and
     the reader would watch the graph rebuild itself out of the wrong picture. */
  const packet = useReturnPacket(SURFACE);
  const [seededAt, setSeededAt] = useState(0);
  const [back, setBack] = useState<ErdBack | null>(null);
  if (packet && packet.at !== seededAt) {
    setSeededAt(packet.at);
    const b = packet.state as ErdBack;
    setBack(b);
    const f = new Set(Array.isArray(b.filters) ? b.filters : []);
    const kinds = REL_ORDER.filter((k) => f.has(`rel:${k}`));
    setMod(b.module && (MODULE_ORDER as string[]).includes(b.module) ? (b.module as ModCode) : null);
    setSel(typeof b.focus === "string" ? b.focus : null);
    setShowAll(f.has("all"));
    setStrong(f.has("strong"));
    setSharedOnly(f.has("shared"));
    setIso(f.has("iso"));
    setDepth(f.has("depth:2") ? 2 : 1);
    // An empty set would hide every edge in the graph. A packet that names no
    // relation kind is a packet from a stale shape, and the full set is the
    // honest reading of it.
    setRel(new Set(kinds.length ? kinds : REL_ORDER));
  }
  // Spend the packet. A write to an external store and nothing else.
  useEffect(() => {
    if (packet) consumeReturn(SURFACE);
  }, [packet]);

  /** The two things the restore hands to code that runs LATER — the saved-view
   *  loader below, which must stand down, and the framing pass, which must fly
   *  to this camera instead of fitting the picture. Both are refs and both are
   *  written here, in an effect, and never during a render. This effect is
   *  declared above them, so on a returning mount they are already set by the
   *  time either one runs. */
  useEffect(() => {
    if (!back) return;
    returning.current = true;
    camWanted.current =
      Number.isFinite(back.zoom) && Number.isFinite(back.x) && Number.isFinite(back.y)
        ? { x: Number(back.x), y: Number(back.y), k: Number(back.zoom) }
        : null;
  }, [back]);

  /* ------------------------------------------------------------ base index */

  const tByName = useMemo(() => new Map(data.tables.map((t) => [t.n, t])), [data.tables]);
  const eById = useMemo(() => new Map(data.edges.map((e) => [e.i, e])), [data.edges]);
  const mByCode = useMemo(() => new Map(data.modules.map((m) => [m.code, m])), [data.modules]);
  const M = mod ? mByCode.get(mod) ?? null : null;

  const level: Level = !M ? "overview" : sel ? "table" : group ? "group" : "module";
  const isMap = level === "overview";

  /* ----------------------------------------------------- the current picture
     Positions are BUILD-TIME output; the browser never solves a layout. There
     are exactly three pictures: the module map, a module's curated ERD, and the
     same module with every one of its tables. Changing picture is an explicit
     act, so nothing ever re-shuffles underneath a hover or a filter. */

  const picture = useMemo(() => {
    if (!M) {
      return {
        names: MODULE_ORDER as string[],
        pos: mapPositions(data.overview.pos.map((p) => ({ n: p.code, x: p.x, y: p.y }))),
        w: data.overview.w,
        h: data.overview.h,
        nw: data.mw,
        nh: data.mh,
        edges: data.overview.links.map((l) => ({ i: `${l.a}>${l.b}`, p: l.a, c: l.b, n: l.n })),
      };
    }
    const src = showAll ? M.posAll : M.pos;
    const ids = showAll ? M.es : M.ec;
    return {
      names: src.map((p) => p.n),
      pos: mapPositions(src),
      w: showAll ? M.wAll : M.w,
      h: showAll ? M.hAll : M.h,
      nw: data.nw,
      nh: data.nh,
      edges: ids.map((i) => ({ i, p: eById.get(i)!.p, c: eById.get(i)!.c, n: 0 })),
    };
  }, [M, showAll, data, eById]);

  const sizeMap = useMemo(() => {
    const m = new Map<string, { w: number; h: number }>();
    for (const n of picture.names) m.set(n, { w: picture.nw, h: picture.nh });
    return m;
  }, [picture]);

  const inPicture = useMemo(() => new Set(picture.names), [picture.names]);

  /* --------------------------------------------------------------- filters */

  const edgeOn = useCallback(
    (e: { i: string }) => {
      if (isMap) return true;
      const rec = eById.get(e.i);
      if (!rec) return false;
      if (!rel.has(rec.k)) return false;
      // "קשרים חזקים" is not a rating — it is the measurable fact that the
      // PM/PP-PI dictionary records a verbatim JOIN for this relation.
      if (strong && !rec.j.some((s) => s.j)) return false;
      return true;
    },
    [isMap, eById, rel, strong],
  );

  const liveEdges = useMemo(() => picture.edges.filter(edgeOn), [picture.edges, edgeOn]);
  const adj = useMemo(() => adjacency(liveEdges as GEdge[]), [liveEdges]);
  const degOf = useCallback((n: string) => adj.get(n)?.size ?? 0, [adj]);

  /** A node is never hidden because it is selected — that is the one rule that
   *  makes "clicking a table can never make the graph feel broken" true rather
   *  than aspirational. Everything else FADES; nothing is removed from the DOM,
   *  so the picture keeps its shape and the camera keeps its bounds. */
  const nodeOn = useCallback(
    (n: string) => {
      if (n === sel) return true;
      if (isMap) return true;
      const t = tByName.get(n);
      if (!t) return false;
      if (sharedOnly && t.ms.length < 2) return false;
      if (!iso && degOf(n) === 0) return false;
      return true;
    },
    [sel, isMap, tByName, sharedOnly, iso, degOf],
  );

  /* --------------------------------------------------------- the group step */

  const groupTables = useMemo(() => {
    if (!M || !group) return null;
    const list =
      group.k === "object"
        ? M.objects.find((o) => o.he === group.v)?.t
        : M.topics.find((t) => t.t === group.v)?.ta;
    return list && list.length ? new Set(list.filter((n) => inPicture.has(n))) : null;
  }, [M, group, inPicture]);

  /** The group plus everything one relation away from it — a topic read on its
   *  own would cut every link it has to the rest of the module. */
  const groupRing = useMemo(() => {
    if (!groupTables) return null;
    const s = new Set(groupTables);
    for (const n of groupTables) for (const a of adj.get(n) || []) s.add(a);
    return s;
  }, [groupTables, adj]);

  /* ------------------------------------------------------------- selection */

  // Hover previews, selection commits. Hover is IGNORED while focus mode is on:
  // focus re-places the tables around one of them, so letting a passing mouse
  // retarget it would re-lay the graph out on every pixel of movement.
  const activeName =
    sel && inPicture.has(sel) ? sel : !focus && hover && inPicture.has(hover) ? hover : null;
  const active = activeName ? tByName.get(activeName) ?? null : null;
  const levels = useMemo(() => neighbourLevels(activeName, adj), [activeName, adj]);

  const activeEdges = useMemo(
    () =>
      activeName
        ? liveEdges
            .map((e) => eById.get(e.i))
            .filter((e): e is ErdEdgeOut => !!e && (e.p === activeName || e.c === activeName))
        : [],
    [activeName, liveEdges, eById],
  );

  const query = q.trim().toLowerCase();
  const hits = useMemo(() => {
    if (isMap) return [] as ErdTable[];
    const pool = picture.names
      .map((n) => tByName.get(n))
      .filter((t): t is ErdTable => !!t && nodeOn(t.n));
    const list = query
      ? pool.filter(
          (t) =>
            t.n.toLowerCase().includes(query) ||
            t.he.toLowerCase().includes(query) ||
            t.en.toLowerCase().includes(query) ||
            t.tc.some((c) => c.toLowerCase().includes(query)),
        )
      : pool;
    return [...list].sort((a, b) => degOf(b.n) - degOf(a.n) || a.n.localeCompare(b.n));
  }, [isMap, picture.names, tByName, query, nodeOn, degOf]);
  const hitSet = useMemo(() => new Set(query ? hits.map((n) => n.n) : []), [hits, query]);

  /* ------------------------------------------------- layout: map <-> focus */

  const baseGeom = useMemo(
    () => computeGeom(picture.pos, sizeMap, picture.edges as GEdge[]),
    [picture, sizeMap],
  );

  /** The target picture for the current act. Pure: same inputs, same output. */
  const target = useMemo(() => {
    const f = !isMap && focus && sel && inPicture.has(sel) ? sel : null;
    if (!f) return { pos: picture.pos, geom: baseGeom, ego: null as Set<string> | null };
    const ego = new Set<string>([f, ...levels.l1]);
    if (depth === 2) for (const n of levels.l2) ego.add(n);
    const pos = egoPositions(f, levels.l1, levels.l2, depth, picture.pos);
    return { pos, geom: computeGeom(pos, sizeMap, picture.edges as GEdge[]), ego };
  }, [isMap, focus, sel, inPicture, levels, depth, picture, baseGeom, sizeMap]);

  const [live, setLive] = useState<{ pos: PosMap; geom: GeomMap; ego: Set<string> | null }>(() => ({
    pos: picture.pos,
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
    // A change of PICTURE (module opened, scope widened) is a different set of
    // nodes, not a move: it crossfades in CSS. Only an ego re-placement inside
    // one picture is worth tweening.
    const sameUniverse = target.pos.size === live.pos.size && [...target.pos.keys()].every((k) => live.pos.has(k));
    if (!g || calm || !sameUniverse) {
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

  /** The region the camera is allowed to reason about. */
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
      return clampView(v, bboxRef.current, st?.clientWidth || 800, st?.clientHeight || 560);
    },
    [],
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

  const fitTo = useCallback(
    (b: { x: number; y: number; w: number; h: number }) => {
      const st = stage.current;
      if (!st) return;
      const k = clampK(Math.min((st.clientWidth - PAD * 2) / b.w, (st.clientHeight - PAD * 2) / b.h));
      glide({
        k,
        x: (st.clientWidth - b.w * k) / 2 - b.x * k,
        y: (st.clientHeight - b.h * k) / 2 - b.y * k,
      });
    },
    [glide],
  );

  const fit = useCallback(() => fitTo(bboxRef.current), [fitTo]);

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

  /** Frame the selection AND its direct neighbours — "fit selection", not "fit
   *  one box", because a relation you cannot see is not a relation. */
  const fitSelection = useCallback(() => {
    if (!sel) return;
    const only = new Set<string>([sel, ...(adj.get(sel) || [])]);
    fitTo(bboxOf(live.pos, sizeMap, only));
  }, [sel, adj, live.pos, sizeMap, fitTo]);

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

  /* ---------------------------------------------------------- the ladder */

  // Neither of these touches the camera history: a change of picture clears it
  // in the framing effect below, so these stay pure state setters and can be
  // handed straight to the breadcrumb without reading a ref during render.
  const openModule = useCallback((code: ModCode) => {
    setMod(code);
    setGroup(null);
    setSel(null);
    setHover(null);
    setFocus(false);
    setQ("");
  }, []);

  const toOverview = useCallback(() => {
    setMod(null);
    setGroup(null);
    setSel(null);
    setHover(null);
    setFocus(false);
    setQ("");
  }, []);

  const pick = useCallback(
    (name: string) => {
      pushCam();
      setSel(name);
      setHover(null);
      window.setTimeout(() => centre(name), 30);
    },
    [centre, pushCam],
  );

  /** The view being left, built at CALL time: the camera lives in a ref and is
   *  moved by every wheel, drag and glide, so a record assembled during render
   *  would describe a view the reader has already left. */
  const makeOrigin = useCallback(
    (name: string) => ({
      to: `/neo/object/${name}/`,
      href: "/neo/erd/",
      label: "מודל הנתונים",
      surface: SURFACE,
      state: {
        focus: sel,
        zoom: view.current.k,
        x: view.current.x,
        y: view.current.y,
        module: mod,
        filters: [
          ...[...rel].map((k) => `rel:${k}`),
          `depth:${depth}`,
          ...(showAll ? ["all"] : []),
          ...(strong ? ["strong"] : []),
          ...(sharedOnly ? ["shared"] : []),
          ...(iso ? ["iso"] : []),
        ],
      },
    }),
    [sel, mod, rel, depth, showAll, strong, sharedOnly, iso],
  );

  /** The real object route where it exists — 105 of the documented tables have a
   *  generated page — and the in-page sheet where it does not. A node never
   *  points at a URL that was not built.
   *
   *  This is a router.push and not a link, so the origin is recorded by hand: a
   *  canvas hit-test has no anchor to hang <OriginLink/> on. */
  const openTable = useCallback(
    (name: string) => {
      const t = tByName.get(name);
      if (t?.pg === 1) {
        rememberOrigin(makeOrigin(name));
        router.push(`/neo/object/${name}/`);
      } else setSheet(name);
    },
    [tByName, router, makeOrigin],
  );

  const reset = useCallback(() => {
    setSel(null);
    setHover(null);
    setQ("");
    setGroup(null);
    setShowAll(false);
    setRel(new Set(REL_ORDER));
    setStrong(false);
    setSharedOnly(false);
    setIso(true);
    setDepth(1);
    setFocus(false);
    camHist.current = [];
    window.setTimeout(fit, 40);
  }, [fit]);

  /* ------------------------------------------------- restore + persist state */

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      // A return already said where the reader was. The last SESSION's view is
      // the older answer to the same question and must not overwrite it.
      if (returning.current) return;
      try {
        const s = JSON.parse(localStorage.getItem(SKEY) || "null") as Saved | null;
        if (!s) return;
        if (s.mod && MODULE_ORDER.includes(s.mod)) setMod(s.mod);
        if (typeof s.all === "boolean") setShowAll(s.all);
        if (s.rel?.length) setRel(new Set(s.rel));
        if (typeof s.strong === "boolean") setStrong(s.strong);
        if (typeof s.shared === "boolean") setSharedOnly(s.shared);
        if (typeof s.iso === "boolean") setIso(s.iso);
        if (s.depth) setDepth(s.depth);
        if (typeof s.insp === "boolean") setInsp(s.insp);
        // Focus mode is NOT restored: it is a transient reading posture, and
        // reopening the page inside a collapsed ego view hides the map.
        if (s.sel && s.mod) setSel(s.sel);
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
        const s: Saved = {
          mod, all: showAll, rel: [...rel], strong, shared: sharedOnly, iso, depth, insp, sel,
        };
        localStorage.setItem(SKEY, JSON.stringify(s));
      } catch {
        /* noop */
      }
    }, 450);
  }, [mod, showAll, rel, strong, sharedOnly, iso, depth, insp, sel]);

  /* ------------------------------------------------------- initial framing */

  useEffect(() => {
    const st = stage.current;
    if (!st) return;
    // A deep link from an object page: /neo/erd/#AUFK opens that table's module
    // on that table. Read on the next frame rather than in the effect body:
    // location.hash is an external system, the server rendered the overview,
    // and resolving it inline would be a synchronous cascading render.
    const raf = requestAnimationFrame(() => {
      if (returning.current) return;
      const want = decodeURIComponent((window.location.hash || "").slice(1)).toUpperCase();
      const t = want ? data.tables.find((x) => x.n === want) : undefined;
      if (!t) return;
      setMod(t.ms[0] ?? t.m);
      setSel(t.n);
    });
    const ro = new ResizeObserver(() => {
      view.current = clampView(view.current, bboxRef.current, st.clientWidth, st.clientHeight);
      paint();
    });
    ro.observe(st);
    window.addEventListener("orientationchange", paint);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("orientationchange", paint);
    };
  }, [data.tables, paint]);

  /** Every change of PICTURE re-frames, once, after its commit. Filters and
   *  selection never move the camera on their own — the view you set is the
   *  view you keep. */
  const pictureKey = `${mod ?? "*"}|${showAll ? 1 : 0}`;
  useEffect(() => {
    // Keyed on the picture and nothing else — `fit` is a stable callback, so
    // this fires exactly once per picture. Deliberately NOT guarded by a ref:
    // an effect that records "already framed" before its own timeout fires
    // never frames at all when React re-invokes it, which is precisely what
    // left the map at 100% on a graph three screens wide.
    const id = window.setTimeout(() => {
      camHist.current = [];
      const want = camWanted.current;
      if (want) {
        // A RETURN wins over the fit: the reader is coming back to a zoom and a
        // pan they chose, and re-fitting the picture would throw both away.
        camWanted.current = null;
        const st = stage.current;
        view.current = clampView(want, bboxRef.current, st?.clientWidth || 800, st?.clientHeight || 560);
        paint();
        setZoomPct(Math.round(view.current.k * 100));
        return;
      }
      fit();
    }, 60);
    return () => window.clearTimeout(id);
  }, [pictureKey, fit, paint]);

  /** Entering focus mode frames the neighbourhood. Leaving it deliberately does
   *  NOT move the camera: you land back on the map where you were reading. */
  const egoWas = useRef<Set<string> | null>(null);
  useEffect(() => {
    if (live.ego === egoWas.current) return;
    egoWas.current = live.ego;
    if (live.ego) fit();
  }, [live.ego, fit]);

  /** Narrowing to a topic or an object frames that neighbourhood once. */
  useEffect(() => {
    if (!groupRing || focus) return;
    const id = window.setTimeout(() => fitTo(bboxOf(live.pos, sizeMap, groupRing)), 40);
    return () => window.clearTimeout(id);
    // live.pos / sizeMap are stable for a picture; re-framing on every geometry
    // identity change would fight the user's own panning.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupRing]);

  /** The sheets are dialogs: Escape closes them wherever the focus happens to be. */
  useEffect(() => {
    if (!keys && !sheet) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (keys) setKeys(false);
      else setSheet(null);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [keys, sheet]);

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

  const onNode = useCallback(
    (name: string) => {
      if (isMap) {
        openModule(name as ModCode);
        return;
      }
      pushCam();
      setSel((s) => {
        if (s !== name) return name;
        // Deselecting also leaves focus mode: a focused view with nothing
        // focused would be an empty stage.
        setFocus(false);
        return null;
      });
      window.setTimeout(() => centre(name), 30);
    },
    [isMap, openModule, pushCam, centre],
  );

  // The pointer listeners below are native and are attached once, so they read
  // the current handler through a ref rather than re-binding on every render.
  const onNodeRef = useRef(onNode);
  useEffect(() => {
    onNodeRef.current = onNode;
  }, [onNode]);

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
      // Guarded: a synthetic or already-released pointer id makes this throw,
      // and an exception here would abandon the gesture half-started.
      try {
        st.setPointerCapture(e.pointerId);
      } catch {
        /* the gesture still works without capture */
      }
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
      try {
        if (st.hasPointerCapture(e.pointerId)) st.releasePointerCapture(e.pointerId);
      } catch {
        /* nothing to release */
      }
      st.dataset.drag = "0";
      // A drag is not a click. Only a still pointer selects.
      if (moved >= 6) return;
      const t = e.target as Element | null;
      if (t?.closest?.("[data-open]")) return; // the open affordance owns its click
      const name = t?.closest?.("[data-node]")?.getAttribute("data-node");
      if (name) onNodeRef.current(name);
      else if (e.target === st || (e.target as Element)?.tagName === "svg") {
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
  }, [clamp, paint, zoomAt]);

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
      openTable(sel);
    } else if (e.key === "Escape") {
      // Rewind before deselect, deselect before stepping back up the ladder.
      if (focus) setFocus(false);
      else if (camHist.current.length) glide(camHist.current.pop()!);
      else if (sel) setSel(null);
      else if (group) setGroup(null);
      else if (mod) toOverview();
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
    const x = ((e.clientX - r.left) / r.width) * picture.w;
    const y = ((e.clientY - r.top) / r.height) * picture.h;
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

  const edgeLvl = (e: { p: string; c: string }): string => {
    if (!activeName) return "";
    if (e.p === activeName || e.c === activeName) return "1";
    if (depth === 2 && (levels.l1.has(e.p) || levels.l1.has(e.c))) {
      const far = levels.l1.has(e.p) ? e.c : e.p;
      if (levels.l2.has(far) || levels.l1.has(far)) return "2";
    }
    return "x";
  };

  const shown = (name: string) => !live.ego || live.ego.has(name);
  const inGroup = (name: string) => !groupRing || groupRing.has(name);

  const topHits = query ? hits.slice(0, 8) : [];
  const W = picture.nw;
  const H = picture.nh;

  const crumbs: { he: string; go?: () => void }[] = [
    { he: LEVEL_HE.overview, go: M ? toOverview : undefined },
    ...(M ? [{ he: `${M.code} · ${M.he}`, go: group || sel ? () => { setGroup(null); setSel(null); setFocus(false); } : undefined }] : []),
    ...(group ? [{ he: group.v, go: sel ? () => { setSel(null); setFocus(false); } : undefined }] : []),
    ...(sel ? [{ he: sel }] : []),
  ];

  const scopeCount = picture.names.length;
  const edgeCount = liveEdges.length;

  /* ---------------------------------------------------------------- render */

  return (
    <div
      className="ne"
      data-level={level}
      data-sel={sel ? "1" : "0"}
      data-q={query ? "1" : "0"}
      data-focus={focus && sel && !isMap ? "1" : "0"}
      data-insp={insp ? "1" : "0"}
      data-group={groupRing ? "1" : "0"}
    >
      <header className="ne-bar">
        <div className="ne-bar-id">
          {/* Where the reader came from, when the session knows: a module
              workspace, an object page, a search. With no memory it falls back
              to the NEO home, which is this page's real parent. */}
          <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />

          <nav className="ne-crumbs" aria-label="מסלול הניווט בתרשים">
            {crumbs.map((c, i) => (
              <span key={`${c.he}-${i}`}>
                {i ? <ArrowRight size={12} strokeWidth={2.2} aria-hidden="true" /> : null}
                {c.go ? (
                  <button type="button" className="nu-ghost ne-crumb" onClick={c.go}>
                    {c.he}
                  </button>
                ) : (
                  <b className={i === crumbs.length - 1 ? "ne-crumb-now" : undefined}>{c.he}</b>
                )}
              </span>
            ))}
          </nav>
          <h1 className="ne-h1">{M ? `${M.code} · ${M.he}` : "מודל הנתונים · כל המודולים"}</h1>
          <p className="ne-sub">
            {M
              ? `${nf.format(scopeCount)} טבלאות · ${nf.format(edgeCount)} קשרים${M.purpose ? ` · ${M.purpose}` : ""}`
              : `${nf.format(data.stats.modules)} מודולים · ${nf.format(data.stats.memberships)} שיוכי טבלה · ${nf.format(data.stats.tables)} טבלאות · ${nf.format(data.stats.edges)} קשרים`}
          </p>
        </div>

        {!isMap ? (
          <div className="ne-find-top">
            <label className="ne-search">
              <Search size={14} strokeWidth={1.9} aria-hidden="true" />
              <input
                type="search"
                value={q}
                onChange={(ev) => setQ(ev.target.value)}
                placeholder="חפש טבלה · תיאור · טרנזקציה"
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
                      style={{ "--ms": modVar(n.m) } as React.CSSProperties}
                      onClick={() => {
                        setQ("");
                        pick(n.n);
                      }}
                    >
                      <i className="ne-row-bar" aria-hidden="true" />
                      <b className="nx-sap">{n.n}</b>
                      <em>{n.he || n.en || "—"}</em>
                      <span className="nx-sap">{degOf(n.n)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}

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
              onClick={fitSelection}
              disabled={!sel}
              aria-label="התאם לבחירה ולשכניה"
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
            <button type="button" className="nu-ghost" onClick={() => setKeys(true)} aria-label="קיצורי מקלדת ומקרא">
              <Keyboard size={15} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------- CONTROL BAR */}
      <div className="ne-filters">
        <div className="ne-fgrp ne-fmods" role="group" aria-label="מודול">
          <span className="ne-flabel">מודול</span>
          <button type="button" className="nu-filter" aria-pressed={!M} onClick={toOverview}>
            <Boxes size={12} strokeWidth={1.9} aria-hidden="true" />
            סקירה · {data.stats.modules}
          </button>
          {data.modules.map((m) => (
            <button
              key={m.code}
              type="button"
              className="nu-filter"
              style={{ "--m": modVar(m.code) } as React.CSSProperties}
              aria-pressed={mod === m.code}
              title={`${m.he}${m.purpose ? ` — ${m.purpose}` : ""}`}
              onClick={() => (mod === m.code ? toOverview() : openModule(m.code))}
            >
              <i aria-hidden="true" />
              {m.code} · {m.core.length}
            </button>
          ))}
        </div>

        {M ? (
          <>
            <div className="ne-fgrp" role="group" aria-label="היקף">
              <span className="ne-flabel">היקף</span>
              <button type="button" className="nu-filter" aria-pressed={!showAll} onClick={() => setShowAll(false)}>
                ERD מרכזי · {M.core.length}
              </button>
              <button
                type="button"
                className="nu-filter"
                aria-pressed={showAll}
                disabled={!M.more.length}
                onClick={() => setShowAll(true)}
                title={M.more.length ? "כל טבלאות המודול במילון" : "אין למודול טבלאות נוספות במילון"}
              >
                כל המודול · {M.core.length + M.more.length}
              </button>
            </div>

            {M.objects.length || M.topics.length ? (
              <div className="ne-fgrp ne-fgroups" role="group" aria-label="נושא או אובייקט עסקי">
                <span className="ne-flabel">
                  <Layers size={12} strokeWidth={1.9} aria-hidden="true" />
                  נושא
                </span>
                <button type="button" className="nu-filter" aria-pressed={!group} onClick={() => setGroup(null)}>
                  הכול
                </button>
                {M.objects.map((o) => (
                  <button
                    key={`o-${o.he}`}
                    type="button"
                    className="nu-filter"
                    aria-pressed={group?.k === "object" && group.v === o.he}
                    title={`${o.en} · ${o.t.length} טבלאות`}
                    onClick={() =>
                      setGroup((g) => (g?.k === "object" && g.v === o.he ? null : { k: "object", v: o.he }))
                    }
                  >
                    {o.he} · {o.t.length}
                  </button>
                ))}
                {M.topics.map((t) => (
                  <button
                    key={`t-${t.t}`}
                    type="button"
                    className="nu-filter ne-ftopic"
                    aria-pressed={group?.k === "topic" && group.v === t.t}
                    onClick={() => setGroup((g) => (g?.k === "topic" && g.v === t.t ? null : { k: "topic", v: t.t }))}
                  >
                    {t.t} · {t.ta.length}
                  </button>
                ))}
              </div>
            ) : null}

            <div className="ne-fgrp" role="group" aria-label="סינון לפי סוג קשר">
              <span className="ne-flabel">
                <Link2 size={12} strokeWidth={1.9} aria-hidden="true" />
                קשר
              </span>
              {REL_ORDER.map((k) => (
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
              <button
                type="button"
                className="nu-filter"
                aria-pressed={strong}
                onClick={() => setStrong((v) => !v)}
                title="רק קשרים שמילון ה-PM/PP-PI מתעד להם ניסוח JOIN מלא"
              >
                <Filter size={12} strokeWidth={1.9} aria-hidden="true" />
                קשרים חזקים
              </button>
            </div>

            <div className="ne-fgrp" role="group" aria-label="טבלאות">
              <span className="ne-flabel">טבלאות</span>
              <button
                type="button"
                className="nu-filter"
                aria-pressed={sharedOnly}
                onClick={() => setSharedOnly((v) => !v)}
                title="טבלאות שיותר ממודול אחד מחזיק ב-ERD שלו"
              >
                <Share2 size={12} strokeWidth={1.9} aria-hidden="true" />
                משותפות
              </button>
              <button type="button" className="nu-filter" aria-pressed={iso} onClick={() => setIso((v) => !v)}>
                ללא קשר
              </button>
            </div>

            <div className="ne-fgrp" role="group" aria-label="הדגשה">
              <span className="ne-flabel">הדגשה</span>
              <button type="button" className="nu-filter" aria-pressed={depth === 1} onClick={() => setDepth(1)}>
                ישירים
              </button>
              <button type="button" className="nu-filter" aria-pressed={depth === 2} onClick={() => setDepth(2)}>
                רמה שנייה
              </button>
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
            </div>
          </>
        ) : (
          <p className="ne-fhint">
            בחר מודול כדי לפתוח את מודל הנתונים שלו. כל קו במפה הוא מספר קשרי הטבלאות שנמדדו בין
            שני המודולים — לא דירוג.
          </p>
        )}
      </div>

      <div className="ne-body">
        {/* --------------------------------------------------------- THE STAGE */}
        <div
          className="ne-stage"
          ref={stage}
          tabIndex={0}
          onKeyDown={onKey}
          role="application"
          aria-label="קנבס מודל הנתונים. גרירה להזזה, Ctrl וגלגלת לזום, מקשים + − 0, חצים להזזה, Enter לפתיחת הפריט הנבחר"
        >
          <svg
            className="ne-canvas"
            role="img"
            aria-label={
              M
                ? `תרשים ER של מודול ${M.code} — ${scopeCount} טבלאות`
                : `מפת ${data.stats.modules} מודולי SAP`
            }
          >
            <g ref={world} className="ne-world" key={pictureKey}>
              {/* EDGES */}
              <g className="ne-edges">
                {picture.edges.map((e) => {
                  const g = live.geom.get(e.i);
                  if (!g) return null;
                  const rec = eById.get(e.i);
                  const off = !edgeOn(e) || !shown(e.p) || !shown(e.c) || !nodeOn(e.p) || !nodeOn(e.c);
                  const lvl = edgeLvl(e);
                  const out = !inGroup(e.p) || !inGroup(e.c);
                  const stroke = isMap
                    ? modVar(e.p)
                    : rec?.x
                      ? "var(--ink-3)"
                      : modVar(tByName.get(e.p)?.m);
                  const lab = isMap
                    ? `${e.n} קשרים`
                    : rec?.cd || REL_HE[(rec?.k ?? "unstated") as RelKind];
                  return (
                    <g
                      key={e.i}
                      className="ne-edge"
                      data-lvl={lvl}
                      data-off={off ? "1" : "0"}
                      data-out={out ? "1" : "0"}
                      data-kind={isMap ? "map" : rec?.k}
                      data-cross={rec?.x ? "1" : "0"}
                      style={{ "--e": stroke } as React.CSSProperties}
                    >
                      <title>
                        {isMap
                          ? `${e.p} ↔ ${e.c} — ${e.n} קשרי טבלאות`
                          : `${e.p} → ${e.c} · ${rec?.cd || REL_HE[(rec?.k ?? "unstated") as RelKind]}${rec?.ds ? ` — ${rec.ds}` : ""}`}
                      </title>
                      <path className="ne-edge-p" data-edge={e.i} d={pathD(g)} />
                      {!isMap ? (
                        <>
                          {/* Direction and strength as SHAPE, from the real
                              record: a key bar on the primary-key end, a crow's
                              foot on an N side, a plain tick where the dataset
                              stated no cardinality at all. */}
                          <g className="ne-cap" transform={capTransform(g, "p")}>
                            <circle className="ne-cap-d" r={3.2} />
                            <path className="ne-cap-l" d="M7 -6 L7 6" />
                          </g>
                          <g className="ne-cap" transform={capTransform(g, "c")}>
                            {rec?.k === "n-1" || rec?.k === "n-n" ? (
                              <path className="ne-cap-l" d="M0 0 L10 -6 M0 0 L10 0 M0 0 L10 6" />
                            ) : rec?.k === "1-1" ? (
                              <path className="ne-cap-l" d="M6 -6 L6 6 M10 -6 L10 6" />
                            ) : (
                              <path className="ne-cap-l" d="M6 -5 L6 5" />
                            )}
                          </g>
                        </>
                      ) : null}
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
                        {lab}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* NODES */}
              <g className="ne-nodes">
                {isMap
                  ? data.modules.map((m) => {
                      const p = live.pos.get(m.code);
                      if (!p) return null;
                      const total = m.core.length + m.more.length;
                      return (
                        <g
                          key={m.code}
                          className="ne-node ne-mod"
                          data-node={m.code}
                          data-lvl={hover === m.code ? "0" : ""}
                          data-off="0"
                          transform={`translate(${p.x} ${p.y})`}
                          onMouseEnter={() => !moving.current && setHover(m.code)}
                          onMouseLeave={() => setHover((h) => (h === m.code ? null : h))}
                          onDoubleClick={() => openModule(m.code)}
                          style={{ "--m": modVar(m.code), "--ms": modVar(m.code), "--o": "var(--obj-master)" } as React.CSSProperties}
                        >
                          <title>{`${m.code} — ${m.he}${m.purpose ? `. ${m.purpose}` : ""}`}</title>
                          <rect className="ne-node-h" x={-W / 2 - 5} y={-H / 2 - 5} width={W + 10} height={H + 10} rx={16} />
                          <rect className="ne-node-r" x={-W / 2} y={-H / 2} width={W} height={H} rx={12} />
                          <rect className="ne-node-mb" x={W / 2 - 11} y={-H / 2 + 10} width={5} height={H - 20} rx={2.5} />
                          {/* ANCHORS ARE DIRECTION-AWARE. The page is dir="rtl",
                              so an SVG <text> that inherits it treats `end` as
                              its LEFT edge. Hebrew runs therefore use `start`
                              to sit against the card's inline-start (right)
                              edge, and the Latin/mono runs, which carry
                              direction:ltr in CSS, use `end` for the same
                              side. Getting this backwards is what pushed the
                              descriptions outside their cards. */}
                          <text className="ne-mod-c nx-sap" x={W / 2 - 22} y={-H / 2 + 32} textAnchor="end">
                            {m.code}
                          </text>
                          <text className="ne-mod-he" x={W / 2 - 22} y={-H / 2 + 58} textAnchor="start">
                            {cut(m.he, 22)}
                          </text>
                          <text className="ne-mod-en" x={W / 2 - 22} y={-H / 2 + 78} textAnchor="end">
                            {cut(m.en, 26)}
                          </text>
                          <text className="ne-mod-n nx-sap" x={-W / 2 + 18} y={H / 2 - 14} textAnchor="start">
                            {m.core.length} / {total}
                          </text>
                          <text className="ne-mod-l" x={W / 2 - 22} y={H / 2 - 14} textAnchor="start">
                            טבלאות ב-ERD
                          </text>
                        </g>
                      );
                    })
                  : picture.names.map((name) => {
                      const t = tByName.get(name);
                      const p = live.pos.get(name);
                      if (!t || !p) return null;
                      const off = !nodeOn(name) || !shown(name);
                      const lvl = nodeLvl(name);
                      const hit = query ? hitSet.has(name) : false;
                      const out = !inGroup(name);
                      const dg = degOf(name);
                      return (
                        <g
                          key={name}
                          className="ne-node"
                          data-node={name}
                          data-lvl={lvl}
                          data-off={off ? "1" : "0"}
                          data-out={out ? "1" : "0"}
                          data-hit={hit ? "1" : "0"}
                          data-shared={t.ms.length > 1 ? "1" : "0"}
                          transform={`translate(${p.x} ${p.y})`}
                          onMouseEnter={() => !moving.current && setHover(name)}
                          onMouseLeave={() => setHover((h) => (h === name ? null : h))}
                          onDoubleClick={() => openTable(name)}
                          style={{ "--m": modVar(t.m), "--ms": modVar(t.m), "--o": t.o } as React.CSSProperties}
                        >
                          <title>{`${t.n} — ${t.he || t.en}. ${ZONE_HE[t.z] || t.z}. ${dg} קשרים`}</title>
                          <rect className="ne-node-h" x={-W / 2 - 5} y={-H / 2 - 5} width={W + 10} height={H + 10} rx={14} />
                          <rect className="ne-node-r" x={-W / 2} y={-H / 2} width={W} height={H} rx={10} />
                          {/* MODULE identity is a line on the inline-start edge.
                              OBJECT class is the small marker beneath it. */}
                          <rect className="ne-node-mb" x={W / 2 - 10} y={-H / 2 + 9} width={4} height={H - 18} rx={2} />
                          <rect className="ne-node-cls" x={-W / 2 + 10} y={-H / 2 + 12} width={4} height={14} rx={2} />
                          {/* See the note on the module card: `end` is the LEFT
                              edge for an inherited-RTL text run, so Hebrew uses
                              `start` and the direction:ltr mono runs use `end`
                              to land on the same inline-start side. */}
                          <text className="ne-node-mod nx-sap" x={-W / 2 + 20} y={-H / 2 + 22} textAnchor="start">
                            {t.m}
                          </text>
                          <text className="ne-node-z" x={W / 2 - 20} y={-H / 2 + 22} textAnchor="start">
                            {cut(ZONE_HE[t.z] || t.z, 14)}
                          </text>
                          <text className="ne-node-n nx-sap" x={W / 2 - 20} y={-H / 2 + 46} textAnchor="end">
                            {t.n}
                          </text>
                          <text className="ne-node-he" x={W / 2 - 20} y={-H / 2 + 65} textAnchor="start">
                            {cut(t.he || t.en || "—", 25)}
                          </text>
                          <text className="ne-node-k nx-sap" x={W / 2 - 20} y={H / 2 - 12} textAnchor="end">
                            {t.pk.length
                              ? `PK ${t.pk[0]}${t.pk.length > 1 ? ` +${t.pk.length - 1}` : ""}`
                              : `${t.fn} שדות`}
                          </text>
                          <text className="ne-node-fk nx-sap" x={-W / 2 + 20} y={H / 2 - 12} textAnchor="start">
                            {t.fk.length ? `FK ${t.fk.length} · ${dg}` : `${dg}`}
                          </text>
                          {t.ms.length > 1 ? (
                            <circle className="ne-node-sh" cx={W / 2 - 20} cy={-H / 2 + 36} r={3} />
                          ) : null}
                          {/* A separate affordance so a plain click can still
                              select without navigating away. Where no object
                              page was generated it opens the in-page sheet. */}
                          <g
                            className="ne-node-go"
                            data-open="1"
                            role="button"
                            tabIndex={0}
                            aria-label={t.pg ? `פתח את עמוד האובייקט ${t.n}` : `פתח את כרטיס הטבלה ${t.n}`}
                            onClick={(ev) => {
                              ev.preventDefault();
                              ev.stopPropagation();
                              openTable(t.n);
                            }}
                            onKeyDown={(ev) => {
                              if (ev.key === "Enter" || ev.key === " ") {
                                ev.preventDefault();
                                openTable(t.n);
                              }
                            }}
                          >
                            <rect x={-W / 2 + 8} y={-H / 2 + 32} width={30} height={22} rx={6} />
                            <path
                              d="M0 0 L-6 -6 M0 0 L0 -5 M0 0 L-5 0"
                              transform={`translate(${-W / 2 + 26} ${-H / 2 + 46})`}
                            />
                          </g>
                        </g>
                      );
                    })}
              </g>
            </g>
          </svg>

          {/* MINIMAP */}
          <div className="ne-mini">
            <svg
              viewBox={`0 0 ${picture.w} ${picture.h}`}
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="מפה מוקטנת. לחיצה קופצת לאזור"
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                miniTo(e);
              }}
              onPointerMove={(e) => {
                if (e.buttons) miniTo(e);
              }}
            >
              {picture.edges.map((e) => {
                const g = live.geom.get(e.i);
                if (!g) return null;
                return <line key={e.i} className="ne-mini-e" x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2} />;
              })}
              {picture.names.map((n) => {
                const p = live.pos.get(n);
                if (!p) return null;
                return (
                  <rect
                    key={n}
                    className="ne-mini-n"
                    data-on={sel === n ? "1" : "0"}
                    data-off={nodeOn(n) && shown(n) ? "0" : "1"}
                    x={p.x - W / 2}
                    y={p.y - H / 2}
                    width={W}
                    height={H}
                    style={{ "--ms": modVar(isMap ? n : tByName.get(n)?.m) } as React.CSSProperties}
                  />
                );
              })}
              <rect ref={miniBox} className="ne-mini-v" x={0} y={0} width={10} height={10} />
            </svg>
          </div>

          <p className="ne-hint">
            <kbd>Ctrl</kbd> + גלגלת לזום · גרירה להזזה · <kbd>+</kbd> <kbd>−</kbd> <kbd>0</kbd> ·
            {isMap ? " לחיצה על מודול פותחת את מודל הנתונים שלו" : " לחיצה כפולה פותחת את הטבלה"}
          </p>
        </div>

        {/* ----------------------------------------------------- THE INSPECTOR */}
        {insp ? (
          <ErdInspector
            data={data}
            module={M}
            active={active}
            peek={!sel && !!hover && !isMap}
            activeEdges={activeEdges}
            l1={levels.l1.size}
            l2={levels.l2.size}
            hits={hits}
            q={q}
            degOf={degOf}
            onClearQ={() => setQ("")}
            onPick={pick}
            onCentre={centre}
            onOpen={openTable}
            origin={makeOrigin}
            onExpand={(n) => setSheet(n)}
            onModule={openModule}
            selected={sel}
          />
        ) : null}
      </div>

      <p className="ne-credit">Project NEO · CBC Israel — פותח על ידי סאלי חליף · Web Coding</p>

      {sheet && tByName.get(sheet) ? (
        <ErdSheet
          t={tByName.get(sheet)!}
          edges={data.edges.filter((e) => e.p === sheet || e.c === sheet)}
          tByName={tByName}
          origin={makeOrigin}
          onClose={() => setSheet(null)}
          onGo={(n) => {
            setSheet(null);
            const t = tByName.get(n);
            if (t) {
              if (!inPicture.has(n)) setMod(t.ms[0] ?? t.m);
              setGroup(null);
              window.setTimeout(() => pick(n), 40);
            }
          }}
        />
      ) : null}

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
                ["לחיצה", "בחירה + מיקוד המצלמה · במפה: פתיחת המודול"],
                ["לחיצה כפולה", "פתיחת הטבלה — עמוד אובייקט או כרטיס בעמוד"],
                ["רווח", "מרכוז הפריט הנבחר"],
                ["Enter", "פתיחת הפריט הנבחר"],
                ["Esc", "חזרה לתצוגה קודמת · ביטול בחירה · שלב אחורה בסולם"],
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
              {MODULE_ORDER.map((m) => (
                <li key={m} style={{ "--e": modVar(m) } as React.CSSProperties}>
                  <i aria-hidden="true" />
                  {m} · {mByCode.get(m)?.he}
                </li>
              ))}
              <li data-kind="unstated" style={{ "--e": "var(--ink-3)" } as React.CSSProperties}>
                <i aria-hidden="true" />
                קשר שהמילון רשם בלי עוצמה — מקווקו
              </li>
              <li className="ne-legend-k">
                <span className="ne-lg-pk" aria-hidden="true" />
                נקודה מלאה ופס — צד המפתח הראשי
              </li>
              <li className="ne-legend-k">
                <span className="ne-lg-fk" aria-hidden="true" />
                כף עורב — צד ה-N · שני פסים — צד ה-1
              </li>
            </ul>
            <p className="ne-note">
              כל מודול, טבלה, קשר, עוצמה והצהרת S/4 בתרשים נקראים מילה במילה מתוך מערך הנתונים של
              הארגון. איפה שהמערך שותק, המסך אומר זאת במפורש ולא משלים ניחוש.
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
