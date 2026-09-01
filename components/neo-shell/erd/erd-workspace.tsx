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
  ArrowRight, Boxes, ChevronDown, Crosshair, Filter, Keyboard, Layers, Link2, Map as MapIcon,
  Maximize, Maximize2, Minimize, Minus, PanelRightClose, PanelRightOpen, Plus, RotateCcw, Scan,
  Search, Share2, SlidersHorizontal, Target, Workflow, X,
} from "lucide-react";
import {
  ANALYSIS, LEVEL_HE, MODULE_ORDER, REL_HE, REL_ORDER, S4_RISK_HE, S4_TRUST_HE, ZONE_HE, modVar,
  type Analysis, type ErdCatalog, type ErdEdgeOut, type ErdTable, type Level, type ModCode,
  type RelKind,
} from "./erd-types";
import {
  SmartReturn, consumeReturn, rememberOrigin, useReturnPacket,
} from "@/components/neo-shell/nav-context";
import { ErdInspector } from "./erd-inspector";
import { ErdSheet } from "./erd-sheet";
import {
  adjacency, bboxOf, capTransform, clampK, clampView, computeGeom, ease, egoPositions,
  compact, lerp, mapPositions, neighbourLevels, pathD, reach,
  type EdgeGeom, type GEdge, type GeomMap, type PosMap, type View,
} from "./graph";

const SKEY = "neo:erd:v3";
const TWEEN = 460;
const PAD = 52;

/* ------------------------------------------------------------- the open card

   PORTED, in behaviour, from the production Architecture Explorer's node:
   collapsed it is a title, and the FIRST click reveals the key fields with the
   primary and foreign keys called out and the S/4HANA standing on the bottom
   edge (app/sap-infrastructure/page.tsx, read-only). What is NEO's is that the
   opened card is a real node on the canvas rather than a floating panel, so
   the relations stay attached to it while it is being read.

   The geometry is computed here rather than measured, because the edge routing
   needs the card's box BEFORE the browser has drawn it. */

const OPEN_W = 276;
/** Head block: module + zone, table code, Hebrew name. */
const O_HEAD = 74;
/** The "key fields" caption. */
const O_CAP = 18;
const O_ROW = 20;
/** The S/4HANA strip — present whether or not the project holds a standing,
 *  because "no verified record" is itself the answer and it is printed. */
const O_S4 = 42;
const O_PAD = 12;
const O_MAX_ROWS = 6;

/** Primary keys first, then foreign keys, then the rest — the production
 *  explorer's `orderFields`, same order, capped so the card stays a card. */
function keyFields(t: ErdTable): [string, string, string, string][] {
  const pk = t.f.filter((f) => f[3] === "PK");
  const fk = t.f.filter((f) => f[3] === "FK");
  const rest = t.f.filter((f) => f[3] !== "PK" && f[3] !== "FK");
  return [...pk, ...fk, ...rest].slice(0, O_MAX_ROWS);
}

const openHeight = (t: ErdTable) =>
  O_HEAD + O_CAP + keyFields(t).length * O_ROW + O_S4 + O_PAD;

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
  mini?: boolean;
  sel?: string | null;
  mode?: Analysis;
}

export function ErdWorkspace({ data }: { data: ErdCatalog }) {
  const router = useRouter();

  /** The workspace root. It is what goes fullscreen — toolbar, stage and panel
   *  together, because a diagram with no controls is a picture, not a tool. */
  const root = useRef<HTMLDivElement>(null);
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
  /** THE ROUND TRIP. The exact camera the reader was reading the map at when a
   *  table was opened. Closing the table glides back to these three numbers —
   *  not to a fit, not to a reset, not to a re-solved layout. Opening a SECOND
   *  table while one is already open deliberately does not overwrite it: the
   *  journey started on the map, and that is where "back" means. */
  const openCam = useRef<View | null>(null);

  const [zoomPct, setZoomPct] = useState(100);
  const [mod, setMod] = useState<ModCode | null>(null);
  /** Modules added ALONGSIDE `mod`. Kept as a separate set rather than folding
   *  `mod` into one selection so the single-module path — every picture, camera
   *  and act already verified against the production graph — is byte-for-byte
   *  what it was. Multi-module is strictly additive: empty here means nothing
   *  about the old behaviour changes. */
  const [extra, setExtra] = useState<Set<ModCode>>(() => new Set());
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
  /** The minimap is an OVERLAY on the stage: helpful, and while it is on screen
   *  it owns the pointer over its own corner. It therefore gets a switch, so a
   *  node underneath it is never unreachable. */
  const [mini, setMini] = useState(true);
  /** Which disclosure is open. One at a time — two open popovers over a canvas
   *  is two things covering the picture. */
  const [pop, setPop] = useState<"mod" | "filters" | null>(null);
  /** Mirrors document.fullscreenElement. Driven ONLY by the fullscreenchange
   *  event, never by the click, so the button can never desync from the browser
   *  when the user leaves fullscreen with Escape or with the system control. */
  const [full, setFull] = useState(false);
  /** The analysis lens the reader asked for. The lens actually IN FORCE is
   *  derived below — a module with no recorded object chain cannot answer the
   *  business-flow question, and falling back is a reading of the data, not a
   *  state change to be pushed through an effect. */
  const [modeWanted, setMode] = useState<Analysis>("focus");
  /** The lens explainer, shown for a few seconds after a lens is chosen. */
  const [modeInfo, setModeInfo] = useState<Analysis | null>(null);
  /** The OPENED table — the node that has unfolded into a readable card. Kept
   *  apart from `sel` on purpose: a selection is a highlight and survives a
   *  filter change, an open card is a reading posture with a camera attached. */
  const [open, setOpen] = useState<string | null>(null);

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
    const lens = ANALYSIS.find((a) => f.has(`mode:${a.id}`));
    if (lens) setMode(lens.id);
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

  /** The modules on screen. One unless the reader has added more. */
  const mods = useMemo(
    () => (mod ? new Set<ModCode>([mod, ...extra]) : new Set<ModCode>()),
    [mod, extra],
  );
  const multi = mods.size >= 2;

  /** THE OWNER OF A TABLE, ported from the production explorer.
   *
   *      owner[n] = selMods.has(t.mod) ? t.mod
   *               : the selected lane that includes it            (page.tsx:712)
   *
   *  This is the difference between the old graph's clean single-colour flow
   *  and the "orange noise" the new one had. AUFK, AFKO, AFPO, RESB and the
   *  rest of the order core are classified in the dictionary under PM, and
   *  they are ALSO members of the PP and PP-PI lanes. Colouring them by their
   *  own module meant a PP-PI process flow arrived carrying orange PM badges,
   *  which reads as a classification claim the scene is not making.
   *
   *  Production answers it by ATTRIBUTION, not by reclassification: while you
   *  are looking at PP-PI and PM is not on screen, a shared table is shown as
   *  part of the lane you are reading. Nothing in the dataset moves — AUFK is
   *  still a PM table, and says so the moment PM is one of the selected
   *  modules, or in the module map, or on its own page. */
  const ownerOf = useCallback(
    (t: ErdTable): ModCode => {
      if (!mods.size) return t.m as ModCode;
      if (mods.has(t.m as ModCode)) return t.m as ModCode;
      return (t.ms.find((m) => mods.has(m as ModCode)) as ModCode) ?? (mod as ModCode) ?? (t.m as ModCode);
    },
    [mods, mod],
  );


  /* ----------------------------------------------------- the current picture
     Positions are BUILD-TIME output; the browser never solves a layout. There
     are exactly four pictures: the module map, a module's curated ERD, the same
     module with every one of its tables, and the union of several modules.
     Changing picture is an explicit act, so nothing ever re-shuffles underneath
     a hover or a filter. */

  const picture = useMemo(() => {
    // SEVERAL MODULES — the union solve, filtered to the selected memberships.
    // Filtered, never re-solved: a table holds its one global position, so
    // adding a module slides its lane into an unchanged picture instead of
    // dealing the whole board again.
    if (multi) {
      // The CURATED lane of each selected module, which is the same population
      // the single-module picture opens with. Using `t.ms` here instead would
      // quietly switch the reader to the "whole module" scope the moment they
      // added a second one — PM + PP would jump from 17 + 20 to 64 tables,
      // which is a different question than the one they asked.
      const on = new Set<string>();
      for (const m of data.modules) if (mods.has(m.code)) for (const n of m.core) on.add(n);
      const names = data.union.pos.map((p) => p.n).filter((n) => on.has(n));
      // Filtered, then squeezed. The union canvas is the whole scope; keeping
      // two lanes out of it leaves them marooned at opposite ends of eleven
      // thousand pixels, which fits to 14% and shows nothing. compact() drops
      // the empty ranks and rows and keeps the ordering dagre actually solved.
      const packed = compact(
        data.union.pos.filter((p) => on.has(p.n)),
        data.nw,
        data.nh,
        170,
        34,
      );
      return {
        names,
        pos: mapPositions(packed.pos),
        w: packed.w,
        h: packed.h,
        nw: data.nw,
        nh: data.nh,
        edges: data.union.es
          .filter((i) => {
            const e = eById.get(i);
            return !!e && on.has(e.p) && on.has(e.c);
          })
          .map((i) => ({ i, p: eById.get(i)!.p, c: eById.get(i)!.c, n: 0 })),
      };
    }
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
  }, [M, showAll, data, eById, multi, mods]);

  /** The opened table, only when it is actually part of the current picture. */
  const openT = open && !isMap ? tByName.get(open) ?? null : null;
  const openBox = openT ? { w: OPEN_W, h: openHeight(openT) } : null;

  /** Box per node. The opened card is bigger than its neighbours, and the edge
   *  routing has to know that BEFORE it draws — a line that ends where the
   *  collapsed card used to be would run under the open one. */
  const sizeMap = useMemo(() => {
    const m = new Map<string, { w: number; h: number }>();
    for (const n of picture.names) m.set(n, { w: picture.nw, h: picture.nh });
    if (openBox && m.has(open!)) m.set(open!, openBox);
    return m;
  }, [picture, open, openBox?.w, openBox?.h]); // eslint-disable-line react-hooks/exhaustive-deps

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

  /* ------------------------------------------------------- analysis lenses

     Five readings of ONE relation set. Focus is the neighbourhood; Dependencies,
     Lineage and Impact are the parent→child arrow followed both ways, backwards
     and forwards; Business Flow is the module's own ordered chain of business
     objects. Nothing below adds an edge, a direction or a stage the project
     does not already record. */

  /** Position of a table in the module's business-object chain, read verbatim
   *  from the ordered OBJECTS list the project maintains. -1 = the chain does
   *  not place this table, and the UI says so rather than inventing a stage. */
  const stageOf = useMemo(() => {
    const m = new Map<string, number>();
    if (!M) return m;
    M.objects.forEach((o, i) => {
      for (const n of o.t) if (!m.has(n)) m.set(n, i);
    });
    return m;
  }, [M]);

  /** Business Flow needs at least two stages to be a flow at all. */
  const flowReady = !!M && M.objects.length > 1 && stageOf.size > 1;

  /** The lens in force. */
  const mode: Analysis = modeWanted === "flow" && !flowReady ? "focus" : modeWanted;
  const lens = useMemo(() => ANALYSIS.find((a) => a.id === mode) ?? ANALYSIS[0], [mode]);

  /** The set the current lens puts in play, or null when the lens has nothing
   *  to work from yet (no table chosen, or no chain recorded). */
  const lensSet = useMemo(() => {
    if (isMap) return null;
    if (mode === "flow") return flowReady ? new Set(stageOf.keys()) : null;
    if (!activeName) return null;
    if (mode === "focus") {
      const s = new Set<string>([activeName, ...levels.l1]);
      if (depth === 2) for (const n of levels.l2) s.add(n);
      return s;
    }
    return reach(activeName, liveEdges as GEdge[], mode === "lineage" ? "up" : mode === "impact" ? "down" : "both");
  }, [isMap, mode, flowReady, stageOf, activeName, levels, depth, liveEdges]);

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
    const gap = openBox && open === f ? Math.max(0, openBox.h - picture.nh) / 2 + 30 : 0;
    const pos = egoPositions(f, levels.l1, levels.l2, depth, picture.pos, gap);
    return { pos, geom: computeGeom(pos, sizeMap, picture.edges as GEdge[]), ego };
    // openBox is derived from `open`; listing its identity would re-solve the
    // ego layout on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMap, focus, sel, inPicture, levels, depth, picture, baseGeom, sizeMap, open]);

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
      // Guarded at the point of writing as well as at the source of the
      // easing: an SVG rect rejects a negative width, and one bad frame is a
      // console error the reader never asked for.
      mv.setAttribute("width", String(Math.max(0, st.clientWidth / k)));
      mv.setAttribute("height", String(Math.max(0, st.clientHeight / k)));
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
      // The readout is a statement of the camera the workspace is committed to,
      // and that number is already decided here. Publishing it once at the top
      // of the tween — rather than only at the bottom — is what makes a click
      // that zooms LOOK like a click that zoomed, instead of a control that
      // sits still for half a second and then jumps.
      setZoomPct(Math.round(end.k * 100));
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

  /** The zoom below which a node stops being a table and becomes a rectangle.
   *  The card sets its name at 15px, so under roughly 0.72 it renders below
   *  11px and the graph is no longer readable without zooming — which is the
   *  specific complaint. Entering a module used to land at 0.47. */
  const LEGIBLE_K = 0.72;

  const fitTo = useCallback(
    (b: { x: number; y: number; w: number; h: number }, floor = 0) => {
      const st = stage.current;
      if (!st) return;
      const raw = Math.min((st.clientWidth - PAD * 2) / b.w, (st.clientHeight - PAD * 2) / b.h);
      // A floor is applied on ENTRY, never to the explicit fit control: if the
      // reader asks to see everything, they get everything, however small.
      const k = clampK(floor ? Math.max(raw, floor) : raw);
      glide({
        k,
        x: (st.clientWidth - b.w * k) / 2 - b.x * k,
        y: (st.clientHeight - b.h * k) / 2 - b.y * k,
      });
    },
    [glide],
  );

  /** The toolbar's fit: a true fit, no floor. */
  const fit = useCallback(() => fitTo(bboxRef.current), [fitTo]);

  /** ARRIVAL. Fit the graph, but never below legibility.
   *
   *  A pure fit-to-bbox is right for a control the reader pressed and wrong for
   *  a view they were handed: with seventeen nodes it resolves to 47% and every
   *  table title lands at about 7px. So entry keeps the fit's framing and
   *  refuses to go under LEGIBLE_K; where the whole graph cannot be shown at a
   *  readable size the canvas stays pannable and the minimap carries the rest,
   *  which is how the old graph behaves. */
  const fitOnEnter = useCallback(() => fitTo(bboxRef.current, LEGIBLE_K), [fitTo]);

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

  /* ------------------------------------------------------ the open/close cycle

     FIRST CLICK  the card unfolds and the camera glides so the open card sits
                  in the middle at a zoom that makes its field list legible —
                  computed from the stage, so a 390px phone lands at a
                  different, still-readable, number than a 1440px desktop.
     SECOND CLICK the card folds and the camera glides back to the EXACT three
                  numbers it left. Not a fit, not a reset, not a reload. */

  /** A zoom at which the open card is readable and still inside the stage. */
  const openZoom = useCallback((h: number) => {
    const st = stage.current;
    if (!st) return 1;
    const kw = (st.clientWidth * 0.78) / OPEN_W;
    const kh = (st.clientHeight * 0.78) / h;
    return clampK(Math.min(1.55, Math.max(0.8, Math.min(kw, kh))));
  }, []);

  const openNode = useCallback(
    (name: string) => {
      const t = tByName.get(name);
      if (!t) return;
      // Only the FIRST open records the map camera; opening a neighbour while
      // reading keeps "back" pointing at where the journey actually started.
      if (!openCam.current) openCam.current = { ...view.current };
      pushCam();
      setSel(name);
      setOpen(name);
      setHover(null);
      // On a phone the workspace is a SCROLLING PAGE with a bounded stage, and
      // the stage can easily be below the fold when a table is opened from the
      // list or the search. Opening something the reader cannot see is not
      // opening it, so the canvas is brought into view first — and with it the
      // bar that takes them back out.
      const st = stage.current;
      if (st) {
        const r = st.getBoundingClientRect();
        if (r.top < 0 || r.bottom > (window.innerHeight || 0)) {
          st.scrollIntoView({ block: "center", behavior: "smooth" });
        }
      }
      // Deferred one frame: the card's box has to be in `live` before the
      // camera is told where its middle is.
      window.setTimeout(() => centre(name, openZoom(openHeight(t))), 40);
    },
    [tByName, pushCam, centre, openZoom],
  );

  const closeNode = useCallback(
    (keepSelection = false) => {
      setOpen(null);
      if (!keepSelection) setSel(null);
      const back = openCam.current;
      openCam.current = null;
      if (back) glide(back);
    },
    [glide],
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
  // Neither clears `openCam` by hand: the framing effect below drops it when
  // the picture changes, which is the same place the camera history is dropped
  // and the only place that knows a picture has actually been replaced.
  const openModule = useCallback((code: ModCode) => {
    setMod(code);
    setExtra(new Set());
    setGroup(null);
    setSel(null);
    setOpen(null);
    setHover(null);
    setFocus(false);
    setQ("");
  }, []);

  const toOverview = useCallback(() => {
    setMod(null);
    setExtra(new Set());
    setGroup(null);
    setSel(null);
    setOpen(null);
    setHover(null);
    setFocus(false);
    setQ("");
  }, []);

  /** Choosing a table anywhere off the canvas — a search hit, the inspector
   *  list, a JOIN chip — is the same act as clicking its node. */
  const pick = useCallback((name: string) => openNode(name), [openNode]);

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
          `mode:${mode}`,
          ...(showAll ? ["all"] : []),
          ...(strong ? ["strong"] : []),
          ...(sharedOnly ? ["shared"] : []),
          ...(iso ? ["iso"] : []),
        ],
      },
    }),
    [sel, mod, rel, depth, mode, showAll, strong, sharedOnly, iso],
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
      /* On the module map the hit-test hands over a MODULE code, not a table.
         Without this guard a double-click there fell through to setSheet with
         a name no table matches — an invisible dialog that ate the next
         Escape. A module double-click now does what a click does: enter it. */
      if (!t) {
        if (isMap && mByCode.has(name as ModCode)) openModule(name as ModCode);
        return;
      }
      if (t.pg === 1) {
        rememberOrigin(makeOrigin(name));
        router.push(`/neo/object/${name}/`);
      } else setSheet(name);
    },
    [tByName, router, makeOrigin, isMap, mByCode, openModule],
  );

  /* ------------------------------------------------------- narrowing, counted

     What the filter disclosure holds is exactly what is NOT on the bar, so the
     bar has to say how much is hidden behind it. This is the count, and the
     same list is what "נקה מסננים" puts back: a disclosure whose trigger can
     read "0" while something is quietly filtering the picture is worse than no
     disclosure at all.

     `depth` and `showAll` are deliberately absent: neither removes anything
     from the picture, they widen it. */
  const narrowings = useMemo(() => {
    const out: { id: string; he: string; off: () => void }[] = [];
    if (group) out.push({ id: "group", he: group.v, off: () => setGroup(null) });
    if (rel.size < REL_ORDER.length) {
      out.push({ id: "rel", he: `סוגי קשר · ${rel.size} מתוך ${REL_ORDER.length}`, off: () => setRel(new Set(REL_ORDER)) });
    }
    if (strong) out.push({ id: "strong", he: "קשרים עם JOIN", off: () => setStrong(false) });
    if (sharedOnly) out.push({ id: "shared", he: "טבלאות משותפות", off: () => setSharedOnly(false) });
    if (!iso) out.push({ id: "iso", he: "הסתרת טבלאות ללא קשרים", off: () => setIso(true) });
    return out;
  }, [group, rel, strong, sharedOnly, iso]);

  const clearFilters = useCallback(() => {
    setGroup(null);
    setRel(new Set(REL_ORDER));
    setStrong(false);
    setSharedOnly(false);
    setIso(true);
  }, []);

  const reset = useCallback(() => {
    setSel(null);
    setOpen(null);
    openCam.current = null;
    setHover(null);
    setQ("");
    setGroup(null);
    setShowAll(false);
    setExtra(new Set());
    setRel(new Set(REL_ORDER));
    setStrong(false);
    setSharedOnly(false);
    setIso(true);
    setDepth(1);
    setFocus(false);
    setMode("focus");
    setPop(null);
    setMini(true);
    camHist.current = [];
    window.setTimeout(fit, 40);
  }, [fit]);

  /* ------------------------------------------------------------ fullscreen

     THE REAL API, not a CSS impersonation of one. `.ne` is the element that is
     promoted, so the toolbar, the stage and the panel all come along — a
     fullscreen diagram you cannot filter is a screenshot.

     The button NEVER writes its own state. `fullscreenchange` is the single
     source of truth, so leaving with Escape, with F11, or with the system
     control can not leave the control claiming the opposite of what is on
     screen. Safari's element/document methods are still prefixed, so both are
     feature-detected rather than assumed. */

  type FsEl = HTMLElement & { webkitRequestFullscreen?: () => Promise<void> | void };
  type FsDoc = Document & {
    webkitFullscreenElement?: Element | null;
    webkitExitFullscreen?: () => Promise<void> | void;
    webkitFullscreenEnabled?: boolean;
  };

  const fsNow = useCallback(() => {
    const d = document as FsDoc;
    return document.fullscreenElement ?? d.webkitFullscreenElement ?? null;
  }, []);

  /** Whether the browser offers fullscreen at all. Resolved after mount so the
   *  server and the first client render agree, and the control is simply not
   *  drawn where the API does not exist. */
  const [fsOk, setFsOk] = useState(false);
  useEffect(() => {
    const d = document as FsDoc;
    const el = root.current as FsEl | null;
    setFsOk(!!(d.fullscreenEnabled || d.webkitFullscreenEnabled) && !!(el?.requestFullscreen || el?.webkitRequestFullscreen));
  }, []);

  useEffect(() => {
    const sync = () => setFull(!!fsNow());
    document.addEventListener("fullscreenchange", sync);
    document.addEventListener("webkitfullscreenchange", sync);
    sync();
    return () => {
      document.removeEventListener("fullscreenchange", sync);
      document.removeEventListener("webkitfullscreenchange", sync);
    };
  }, [fsNow]);

  const toggleFull = useCallback(() => {
    const d = document as FsDoc;
    const el = root.current as FsEl | null;
    if (!el) return;
    // A rejected promise here is a policy decision by the browser, not a bug,
    // and it must not reach the console as an unhandled rejection.
    const done = (p: Promise<void> | void) => {
      if (p && typeof (p as Promise<void>).catch === "function") (p as Promise<void>).catch(() => {});
    };
    if (fsNow()) done((document.exitFullscreen ?? d.webkitExitFullscreen)?.call(document));
    else done((el.requestFullscreen ?? el.webkitRequestFullscreen)?.call(el));
  }, [fsNow]);

  /** Entering or leaving fullscreen is an explicit act with a much larger or
   *  much smaller stage on the other side of it, so the picture is re-framed
   *  once — the same rule every other change of picture follows. The stage's
   *  own ResizeObserver has already re-clamped by the time this runs. */
  const fullWas = useRef(full);
  useEffect(() => {
    if (fullWas.current === full) return;
    fullWas.current = full;
    const id = window.setTimeout(fit, 120);
    return () => window.clearTimeout(id);
  }, [full, fit]);

  /** The lens explainer is a nudge, not a dialog: it says what the lens does
   *  and then gets out of the way. */
  useEffect(() => {
    if (!modeInfo) return;
    const id = window.setTimeout(() => setModeInfo(null), 6500);
    return () => window.clearTimeout(id);
  }, [modeInfo]);


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
        if (typeof s.mini === "boolean") setMini(s.mini);
        if (s.mode && ANALYSIS.some((a) => a.id === s.mode)) setMode(s.mode);
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
          mod, all: showAll, rel: [...rel], strong, shared: sharedOnly, iso, depth, insp, mini, sel, mode,
        };
        localStorage.setItem(SKEY, JSON.stringify(s));
      } catch {
        /* noop */
      }
    }, 450);
    // The pending write dies with the workspace: without this cleanup a 450ms
    // timer could fire after navigation and write against an unmounted tree.
    return () => {
      if (saveT.current) clearTimeout(saveT.current);
    };
  }, [mod, showAll, rel, strong, sharedOnly, iso, depth, insp, mini, sel, mode]);

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
  const pictureKey = `${mod ?? "*"}|${[...extra].sort().join("+")}|${showAll ? 1 : 0}`;
  useEffect(() => {
    // Keyed on the picture and nothing else — `fit` is a stable callback, so
    // this fires exactly once per picture. Deliberately NOT guarded by a ref:
    // an effect that records "already framed" before its own timeout fires
    // never frames at all when React re-invokes it, which is precisely what
    // left the map at 100% on a graph three screens wide.
    const id = window.setTimeout(() => {
      camHist.current = [];
      // A new picture invalidates the camera the open card promised to return
      // to: that view described a graph that is no longer on screen.
      openCam.current = null;
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
      fitOnEnter();
    }, 60);
    return () => window.clearTimeout(id);
  }, [pictureKey, fit, paint]);

  /** Entering focus mode frames the neighbourhood. Leaving it deliberately does
   *  NOT move the camera: you land back on the map where you were reading. */
  const egoWas = useRef<Set<string> | null>(null);
  useEffect(() => {
    if (live.ego === egoWas.current) return;
    egoWas.current = live.ego;
    if (live.ego) fitOnEnter();
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

  /** ONE gesture, two halves. A click on a closed table opens it; a click on
   *  the table that is already open closes it and puts the camera back. */
  const onNode = useCallback(
    (name: string) => {
      if (isMap) {
        openModule(name as ModCode);
        return;
      }
      if (open === name) {
        setFocus(false);
        closeNode();
        return;
      }
      openNode(name);
    },
    [isMap, openModule, open, openNode, closeNode],
  );

  // The pointer listeners below are native and are attached once, so they read
  // the current handler through a ref rather than re-binding on every render.
  const onNodeRef = useRef(onNode);
  useEffect(() => {
    onNodeRef.current = onNode;
  }, [onNode]);

  /** `openTable` records the LIVE camera when it hands a journey to the object
   *  page, which means it reads a ref. Reached through a ref of its own so the
   *  handlers created during render never appear to touch one. */
  const openTableRef = useRef(openTable);
  useEffect(() => {
    openTableRef.current = openTable;
  }, [openTable]);

  const onEmpty = useCallback(() => {
    setFocus(false);
    if (open) closeNode();
    else setSel(null);
  }, [open, closeNode]);
  const emptyRef = useRef(onEmpty);
  useEffect(() => {
    emptyRef.current = onEmpty;
  }, [onEmpty]);

  useEffect(() => {
    const st = stage.current;
    if (!st) return;
    const pts = new Map<number, { x: number; y: number }>();
    let pinch = 0;
    let moved = 0;

    /* THE CLICK BUG, AND WHY IT LOOKED LIKE A DEAD CANVAS.
       `setPointerCapture` below is what makes a drag survive the pointer
       leaving the stage — and it is also what broke every node click on this
       page. Once a pointer is captured, the spec RE-TARGETS every later event
       for that pointer at the capture element, so `pointerup` (and the `click`
       the browser synthesises from it) arrived with `target === .ne-stage`,
       never the node. `closest("[data-node]")` therefore always returned null,
       every click fell through to the empty-canvas branch, and the canvas
       answered a click on a table by CLEARING the selection.

       The hit test now happens at `pointerdown`, which is the one event capture
       cannot re-target because capture is set inside its own handler. What the
       pointer went down on is remembered, and the pointer-up simply spends it. */
    let hitNode: string | null = null;
    let hitGo = false;
    let hitEmpty = false;

    const readHit = (e: PointerEvent) => {
      const t = e.target as Element | null;
      hitNode = t?.closest?.("[data-node]")?.getAttribute("data-node") ?? null;
      hitGo = !!t?.closest?.("[data-open]");
      // Only the bare canvas deselects. An edge, a badge or a cardinality cap
      // is part of the drawing and answering it with "clear everything" is the
      // opposite of what the reader asked for.
      hitEmpty = !hitNode && (t === st || t?.tagName === "svg" || !!t?.classList?.contains("ne-world"));
    };
    const clearHit = () => {
      hitNode = null;
      hitGo = false;
      hitEmpty = false;
    };

    const down = (e: PointerEvent) => {
      if (moving.current) return;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pts.size === 1) {
        moved = 0;
        readHit(e);
      }
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
      // A second finger is still down: this is half of a pinch, not a click.
      if (pts.size) return;
      const name = hitNode;
      const go = hitGo;
      const empty = hitEmpty;
      clearHit();
      // A drag is not a click. Only a still pointer selects.
      if (moved >= 6) return;
      // The small "open the page" affordance sits inside the node and wins the
      // click: a plain click opens the card in place, this one leaves for the
      // object page.
      if (go) {
        if (name) openTableRef.current(name);
        return;
      }
      if (name) onNodeRef.current(name);
      // Empty canvas is the other obvious back action.
      else if (empty) emptyRef.current();
    };

    const cancel = (e: PointerEvent) => {
      clearHit();
      up(e);
    };

    // A double click leaves the graph for the object page. The browser
    // synthesises it from the same captured pointer, so its target is the stage
    // as well — it reads the remembered hit rather than its own target, and the
    // hit is read here too because pointerup has already spent the last one.
    let lastNode: string | null = null;
    const remember = (e: PointerEvent) => {
      if (moving.current) return;
      const t = e.target as Element | null;
      lastNode = t?.closest?.("[data-node]")?.getAttribute("data-node") ?? null;
    };
    const dbl = (e: MouseEvent) => {
      const t = e.target as Element | null;
      const name = t?.closest?.("[data-node]")?.getAttribute("data-node") ?? lastNode;
      if (name) openTableRef.current(name);
    };

    // Enter / Space on the focused affordance is the keyboard half of the same
    // act.
    const key = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const el = (e.target as Element | null)?.closest?.("[data-open]");
      if (!el) return;
      const name = el.closest("[data-node]")?.getAttribute("data-node");
      if (!name) return;
      e.preventDefault();
      openTableRef.current(name);
    };

    st.addEventListener("pointerdown", remember, true);
    st.addEventListener("pointerdown", down);
    st.addEventListener("pointermove", move);
    st.addEventListener("pointerup", up);
    st.addEventListener("pointercancel", cancel);
    st.addEventListener("dblclick", dbl);
    st.addEventListener("keydown", key);
    return () => {
      st.removeEventListener("pointerdown", remember, true);
      st.removeEventListener("pointerdown", down);
      st.removeEventListener("pointermove", move);
      st.removeEventListener("pointerup", up);
      st.removeEventListener("pointercancel", cancel);
      st.removeEventListener("dblclick", dbl);
      st.removeEventListener("keydown", key);
    };
  }, [clamp, paint, zoomAt]);

  /* ------------------------------------------------------------- keyboard */

  const onKey = (e: React.KeyboardEvent) => {
    // The node's own "open the page" affordance answers Enter and Space
    // natively. Without this guard the same key would be handled twice.
    if ((e.target as Element | null)?.closest?.("[data-open]")) return;
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
    } else if (!isMap && "fdlib".includes(e.key.toLowerCase()) && e.key.length === 1) {
      // The production explorer's lens shortcuts, one letter each.
      const id = ({ f: "focus", d: "dep", l: "lineage", i: "impact", b: "flow" } as const)[
        e.key.toLowerCase() as "f" | "d" | "l" | "i" | "b"
      ];
      if (id === "flow" && !flowReady) return;
      e.preventDefault();
      setMode(id);
      setModeInfo(id);
    } else if (e.key === "Escape") {
      // FULLSCREEN OWNS ESCAPE. The browser exits fullscreen on Escape natively
      // and it does it whatever this page thinks; answering the same key here
      // as well would fold the open card in the same keystroke that shrank the
      // window, which reads as two things breaking at once. One key, one act.
      if (fsNow()) return;
      // Close the open card FIRST — that is the move with a camera attached,
      // and it is what "back" means while a table is being read. Then rewind,
      // then deselect, then step back up the ladder.
      if (open) {
        setFocus(false);
        closeNode();
      } else if (focus) setFocus(false);
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
    /* The minimap renders with preserveAspectRatio="meet" inside a fixed 4:3
       box, so the picture is letterboxed whenever its aspect ratio differs.
       A linear clientX->picture.w mapping ignored the bars and sent the camera
       to the wrong place; map through the real scale and centring offsets. */
    const s = Math.min(r.width / picture.w, r.height / picture.h);
    const offX = (r.width - picture.w * s) / 2;
    const offY = (r.height - picture.h * s) / 2;
    const x = Math.min(Math.max((e.clientX - r.left - offX) / s, 0), picture.w);
    const y = Math.min(Math.max((e.clientY - r.top - offY) / s, 0), picture.h);
    const k = view.current.k;
    cancelAnimationFrame(anim.current);
    view.current = clamp({ k, x: st.clientWidth / 2 - x * k, y: st.clientHeight / 2 - y * k });
    paint();
  };

  /* --------------------------------------------------------- level helpers */

  /* The emphasis ladder, now answered by the LENS rather than by one hard-coded
     reading. "0" is the subject, "1" is what the lens puts one step away, "2"
     is the rest of what the lens found, "x" is everything else — dimmed, and
     never removed. */

  const nodeLvl = (n: string): string => {
    if (mode === "flow" && lensSet) {
      if (n === activeName) return "0";
      return stageOf.has(n) ? "1" : "x";
    }
    if (!activeName) return "";
    if (n === activeName) return "0";
    if (!lensSet) return "x";
    if (levels.l1.has(n)) return "1";
    if (lensSet.has(n)) return "2";
    return "x";
  };

  const edgeLvl = (e: { p: string; c: string }): string => {
    if (mode === "flow" && lensSet) {
      const a = stageOf.get(e.p);
      const b = stageOf.get(e.c);
      if (a === undefined || b === undefined) return "x";
      // A relation that runs FORWARD along the recorded object chain is the
      // flow. One that runs backwards is a real relation too, so it is kept and
      // simply not emphasised.
      return b > a ? "1" : "x";
    }
    if (!activeName || !lensSet) return "";
    if (e.p === activeName || e.c === activeName) return "1";
    if (lensSet.has(e.p) && lensSet.has(e.c)) return "2";
    return "x";
  };

  /** Which edges get a travelling pulse. Capped: forty reads as a diagram that
   *  is alive, four hundred reads as a screensaver. */
  const pulseSet = useMemo(() => {
    const out = new Set<string>();
    if (isMap) return out;
    for (const e of liveEdges) {
      if (out.size >= 40) break;
      const l = edgeLvl(e);
      if (l === "1" || (l === "2" && mode !== "focus")) out.add(e.i);
    }
    return out;
    // edgeLvl is derived from the same inputs listed here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMap, liveEdges, activeName, lensSet, levels, mode, stageOf]);

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
      ref={root}
      data-full={full ? "1" : "0"}
      data-mini={mini ? "1" : "0"}
      data-level={level}
      data-sel={sel ? "1" : "0"}
      data-q={query ? "1" : "0"}
      data-focus={focus && sel && !isMap ? "1" : "0"}
      data-insp={insp ? "1" : "0"}
      data-group={groupRing ? "1" : "0"}
      // Deliberately not `data-open`: the node's "open the page" affordance
      // owns that attribute name and the pointer handler finds it with
      // closest(), so a second one here would swallow every canvas click.
      data-opencard={openT ? "1" : "0"}
      data-mode={isMap ? "" : mode}
    >
      <header className="ne-bar">
        {/* IDENTITY IN TWO LINES, NOT FOUR. The return, the ladder, the title
            and the count used to be four stacked rows and they alone took
            130px off a 940px screen before a single table was drawn. The return
            and the ladder answer the same question ("where am I") and sit on
            one line; the title and its count answer the second one and sit on
            the next. Nothing was removed. */}
        <div className="ne-bar-id">
          <div className="ne-bar-nav">
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
          </div>
          <div className="ne-bar-t">
            <p className="ne-eye">
              מודל הנתונים
              <i aria-hidden="true" />
              <span className="nx-sap">ENTITY RELATIONSHIP</span>
            </p>
            <h1 className="ne-h1">{M ? `${M.code} · ${M.he}` : "מודל הנתונים · כל המודולים"}</h1>
            <p className="ne-sub">
              {M
                ? `${nf.format(scopeCount)} טבלאות · ${nf.format(edgeCount)} קשרים${M.purpose ? ` · ${M.purpose}` : ""}`
                : `${nf.format(data.stats.modules)} מודולים · ${nf.format(data.stats.memberships)} שיוכי טבלה · ${nf.format(data.stats.tables)} טבלאות · ${nf.format(data.stats.edges)} קשרים`}
            </p>
          </div>
        </div>

        {!isMap ? (
          <div className="ne-find-top">
            <label className="ne-search">
              <Search size={14} strokeWidth={1.9} aria-hidden="true" />
              <input
                type="search"
                value={q}
                onChange={(ev) => setQ(ev.target.value)}
                placeholder="שם טבלה · תיאור · טרנזקציה"
                aria-label="חיפוש טבלה בתרשים"
                dir="auto"
              />
              {q ? (
                <button type="button" className="nu-ghost ne-x" onClick={() => setQ("")} aria-label="ניקוי החיפוש">
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
                      <em>{n.he || n.en || "–"}</em>
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
            <button type="button" className="nu-ghost" onClick={() => zoomAt(1 / 1.22)} aria-label="הקטנת התצוגה">
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
            <button type="button" className="nu-ghost" onClick={() => zoomAt(1.22)} aria-label="הגדלת התצוגה">
              <Plus size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
          <div className="ne-group">
            <button type="button" className="nu-ghost" onClick={fit} aria-label="התאמת התרשים למסך">
              <Maximize2 size={15} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="nu-ghost"
              onClick={fitSelection}
              disabled={!sel}
              aria-label="התאמה לטבלה שנבחרה ולשכנותיה"
            >
              <Crosshair size={15} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="nu-ghost"
              onClick={() => sel && zoomInto(sel)}
              disabled={!sel}
              aria-label="הגדלה אל הטבלה שנבחרה"
            >
              <Scan size={15} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button type="button" className="nu-ghost" onClick={reset} aria-label="איפוס התצוגה והמסננים">
              <RotateCcw size={15} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
          <div className="ne-group">
            {/* FULLSCREEN. The real API on the workspace root, so the controls
                come with the picture. Its pressed state is read from the
                browser, never from this click. */}
            {fsOk ? (
              <button
                type="button"
                className="nu-ghost"
                data-fs={full ? "1" : "0"}
                onClick={toggleFull}
                aria-pressed={full}
                aria-label={full ? "יציאה ממסך מלא" : "מסך מלא"}
                title={full ? "יציאה ממסך מלא · Esc" : "מסך מלא"}
              >
                {full ? (
                  <Minimize size={15} strokeWidth={1.8} aria-hidden="true" />
                ) : (
                  <Maximize size={15} strokeWidth={1.8} aria-hidden="true" />
                )}
              </button>
            ) : null}
            <button
              type="button"
              className="nu-ghost"
              onClick={() => setMini((v) => !v)}
              aria-pressed={mini}
              aria-label={mini ? "הסתרת המפה המוקטנת" : "הצגת המפה המוקטנת"}
              title={mini ? "הסתרת המפה המוקטנת" : "הצגת המפה המוקטנת"}
            >
              <MapIcon size={15} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="nu-ghost"
              onClick={() => setInsp((v) => !v)}
              aria-pressed={insp}
              aria-label={insp ? "סגירת חלונית הפרטים" : "פתיחת חלונית הפרטים"}
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

      {/* ------------------------------------------------------- CONTROL BAR

          SEVEN GROUPS AND FIFTY-ONE CHIPS, REDUCED TO FIVE CONTROLS.

          Measured at 1500x940 inside PP-PI before this pass: the module group
          held 14 chips and hid 965px of them behind an overflow with no
          affordance; the topic group held 20 and hid 2,930px the same way; the
          two bars together took 298px off a 940px screen and left the diagram
          554px. A chip nobody can see is not a filter, it is a defect with a
          scrollbar.

          WHAT STAYS ON THE BAR is what a reader touches WHILE reading: which
          module they are in, how wide the scope is, which analysis lens is
          answering, and whether the neighbourhood is arranged around the
          selection. WHAT MOVES INTO A DISCLOSURE is what they set once and
          forget: topic or business object, relation kind, table narrowing,
          emphasis depth.

          NOTHING IS HIDDEN SILENTLY. The disclosure trigger carries the number
          of narrowings in force, and every one of them is ALSO drawn beside it
          as its own pill that switches itself off. */}
      <div className="ne-filters">
        <ErdPop
          open={pop === "mod"}
          onToggle={() => setPop((p) => (p === "mod" ? null : "mod"))}
          onClose={() => setPop(null)}
          name="מודול והיקף"
          on={!!M}
          style={M ? ({ "--m": modVar(M.code) } as React.CSSProperties) : undefined}
          label={
            <>
              <Boxes size={12} strokeWidth={1.9} aria-hidden="true" />
              {/* The trigger names the picture, not the module's full title —
                  the h1 one row above already carries that, and repeating it
                  here is what pushed the control bar onto a second line. */}
              {multi
                ? `${[...mods].join(" + ")} · ${nf.format(picture.names.length)} טבלאות`
                : M
                  ? `${M.code} · ${nf.format(scopeCount)} טבלאות`
                  : `סקירה · ${data.stats.modules} מודולים`}
            </>
          }
        >
          {/* SCOPE LIVES WITH THE MODULE, because it IS the module: "the
              curated ERD" and "everything the dictionary holds" are two
              pictures of one thing, and the trigger above already counts
              whichever one is in force. On the bar they were a third group
              that cost 265px and pushed the filter disclosure onto a second
              row. */}
          {/* SCOPE IS A SINGLE-MODULE QUESTION.
              "curated ERD or the whole module" has no answer once several
              modules are on screen, and leaving the control there left it
              showing one module's counts while a different picture was drawn —
              a button that reads as live and does nothing. It is replaced by
              the reason, and the way back. */}
          {multi ? (
            <section className="ne-pop-sc">
              <p className="ne-pop-h">היקף התרשים</p>
              <p className="ne-pop-say">
                בהשוואה בין מודולים ההיקף נקבע לפי ה-ERD המרכזי של כל מודול. בחירת היקף אחר
                אפשרית במודול יחיד בלבד.
              </p>
              <div className="ne-pop-w">
                <button type="button" className="nu-filter" onClick={() => setExtra(new Set())}>
                  חזרה ל-{mod} בלבד
                </button>
              </div>
            </section>
          ) : M ? (
            <section className="ne-pop-sc">
              <p className="ne-pop-h">היקף התרשים</p>
              <div className="ne-pop-w">
                <button type="button" className="nu-filter" aria-pressed={!showAll} onClick={() => setShowAll(false)}>
                  ERD מרכזי · {M.core.length}
                </button>
                <button
                  type="button"
                  className="nu-filter"
                  aria-pressed={showAll}
                  disabled={!M.more.length}
                  onClick={() => setShowAll(true)}
                  title={M.more.length ? "כל טבלאות המודול בתיעוד" : "אין למודול טבלאות נוספות בתיעוד"}
                >
                  כל המודול · {M.core.length + M.more.length}
                </button>
              </div>
            </section>
          ) : null}
          <p className="ne-pop-h">מודול</p>
          <ul className="ne-pop-l">
            <li>
              <button
                type="button"
                className="nu-ghost ne-row"
                aria-pressed={!M}
                style={{ "--ms": "var(--ink-3)" } as React.CSSProperties}
                onClick={() => {
                  toOverview();
                  setPop(null);
                }}
              >
                <i className="ne-row-bar" aria-hidden="true" />
                <b>סקירה</b>
                <em>מפת כל המודולים והקשרים ביניהם</em>
                <span className="nx-sap">{data.stats.modules}</span>
              </button>
            </li>
            {data.modules.map((m) => (
              <li key={m.code} style={{ "--ms": modVar(m.code) } as React.CSSProperties}>
                <button
                  type="button"
                  className="nu-ghost ne-row"
                  aria-pressed={mod === m.code}
                  title={m.purpose || undefined}
                  onClick={() => {
                    openModule(m.code);
                    setPop(null);
                  }}
                >
                  <i className="ne-row-bar" aria-hidden="true" />
                  <b className="nx-sap">{m.code}</b>
                  <em>{m.he}</em>
                  <span className="nx-sap">{m.core.length}</span>
                </button>
                {/* ADD TO THE COMPARISON. Separate from the row itself so the
                    ordinary act — open this module — keeps one unambiguous
                    target, and comparing stays a deliberate second gesture.
                    Hidden on the module already open: a module cannot be
                    compared with itself. */}
                {M && mod !== m.code ? (
                  <button
                    type="button"
                    className="nu-ghost ne-row-add"
                    aria-pressed={extra.has(m.code)}
                    aria-label={
                      extra.has(m.code)
                        ? `הסרת ${m.code} מההשוואה`
                        : `הוספת ${m.code} להשוואה עם ${mod}`
                    }
                    onClick={() =>
                      setExtra((prev) => {
                        const n = new Set(prev);
                        if (n.has(m.code)) n.delete(m.code);
                        else n.add(m.code);
                        return n;
                      })
                    }
                  >
                    {extra.has(m.code) ? "✓" : "+"}
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </ErdPop>

        {M ? (
          <>
            {/* THE ANALYSIS LENSES — the production explorer's five questions,
                in NEO's language. Each one is answered from the modelled
                relation set already on screen; none of them adds a relation.
                They stay on the bar because they are the reading itself. */}
            <div className="ne-fgrp ne-flens" role="group" aria-label="עדשת ניתוח">
              <span className="ne-flabel">
                <Workflow size={12} strokeWidth={1.9} aria-hidden="true" />
                ניתוח
              </span>
              {ANALYSIS.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  className="nu-filter"
                  aria-pressed={mode === a.id}
                  disabled={a.id === "flow" && !flowReady}
                  title={
                    a.id === "flow" && !flowReady
                      ? "לא קיים תיעוד מאומת במאגר: למודול זה אין שרשרת אובייקטים עסקיים."
                      : `${a.en} · ${a.d}`
                  }
                  onClick={() => {
                    setMode(a.id);
                    setModeInfo(modeInfo === a.id ? null : a.id);
                  }}
                >
                  {a.he}
                </button>
              ))}
              <button
                type="button"
                className="nu-filter"
                aria-pressed={focus}
                disabled={!sel}
                title="סידור השכנות סביב הטבלה שנבחרה. שאר המודל נשאר בתרשים, מעומעם."
                onClick={() => setFocus((v) => !v)}
              >
                <Target size={12} strokeWidth={2} aria-hidden="true" />
                סידור סביב הנבחרת
              </button>
            </div>

            {/* THE DISCLOSURE. Everything a reader sets once, in one place, with
                the count of what is in force printed on the way in. */}
            <ErdPop
              open={pop === "filters"}
              onToggle={() => setPop((p) => (p === "filters" ? null : "filters"))}
              onClose={() => setPop(null)}
              name="מסננים מתקדמים"
              wide
              on={narrowings.length > 0}
              label={
                <>
                  <SlidersHorizontal size={12} strokeWidth={1.9} aria-hidden="true" />
                  מסננים
                  {narrowings.length ? <b className="ne-pop-n">{narrowings.length}</b> : null}
                </>
              }
            >
              <div className="ne-pop-s">
                {M.objects.length || M.topics.length ? (
                  <section>
                    <p className="ne-pop-h">
                      <Layers size={12} strokeWidth={1.9} aria-hidden="true" />
                      נושא או אובייקט עסקי
                    </p>
                    <div className="ne-pop-w">
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
                          title={`${t.t} · ${t.ta.length} טבלאות`}
                          onClick={() => setGroup((g) => (g?.k === "topic" && g.v === t.t ? null : { k: "topic", v: t.t }))}
                        >
                          {t.t} · {t.ta.length}
                        </button>
                      ))}
                    </div>
                  </section>
                ) : null}

                <section>
                  <p className="ne-pop-h">
                    <Link2 size={12} strokeWidth={1.9} aria-hidden="true" />
                    סוג הקשר
                  </p>
                  <div className="ne-pop-w">
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
                      title="רק קשרים שבתיעוד נרשם להם ניסוח JOIN"
                    >
                      <Filter size={12} strokeWidth={1.9} aria-hidden="true" />
                      קשרים עם JOIN
                    </button>
                  </div>
                </section>

                <section>
                  <p className="ne-pop-h">טבלאות</p>
                  <div className="ne-pop-w">
                    <button
                      type="button"
                      className="nu-filter"
                      aria-pressed={sharedOnly}
                      onClick={() => setSharedOnly((v) => !v)}
                      title="טבלאות הנכללות ב-ERD של יותר ממודול אחד"
                    >
                      <Share2 size={12} strokeWidth={1.9} aria-hidden="true" />
                      משותפות
                    </button>
                    <button type="button" className="nu-filter" aria-pressed={iso} onClick={() => setIso((v) => !v)}>
                      הצגת טבלאות ללא קשרים
                    </button>
                  </div>
                </section>

                <section>
                  <p className="ne-pop-h">עומק ההדגשה</p>
                  <div className="ne-pop-w">
                    <button
                      type="button"
                      className="nu-filter"
                      aria-pressed={depth === 1}
                      disabled={mode !== "focus"}
                      onClick={() => setDepth(1)}
                    >
                      ישירים
                    </button>
                    <button
                      type="button"
                      className="nu-filter"
                      aria-pressed={depth === 2}
                      disabled={mode !== "focus"}
                      onClick={() => setDepth(2)}
                    >
                      רמה שנייה
                    </button>
                  </div>
                  {mode !== "focus" ? (
                    <p className="ne-pop-say">עומק ההדגשה חל על עדשת המיקוד בלבד. שאר העדשות קובעות את היקפן לפי הקשרים עצמם.</p>
                  ) : null}
                </section>

                <footer className="ne-pop-f">
                  <button type="button" className="nu-btn2" onClick={clearFilters} disabled={!narrowings.length}>
                    ניקוי המסננים
                  </button>
                  <button type="button" className="nu-ghost" onClick={() => setPop(null)}>
                    סגירה
                  </button>
                </footer>
              </div>
            </ErdPop>

            {/* Every narrowing behind the disclosure, said out loud and
                switchable off from here. This is the affordance that makes the
                disclosure legitimate. */}
            {narrowings.length ? (
              <div className="ne-fnow" role="group" aria-label="מסננים פעילים">
                {narrowings.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    className="nu-filter ne-fnow-x"
                    aria-pressed
                    title={`ביטול · ${n.he}`}
                    onClick={n.off}
                  >
                    {n.he}
                    <X size={12} strokeWidth={2.2} aria-hidden="true" />
                  </button>
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <p className="ne-fhint">
            בחירת מודול פותחת את מודל הנתונים שלו. כל קו במפה מציין את מספר קשרי הטבלאות בין
            שני המודולים.
          </p>
        )}

        {/* The lens explainer. A row of the control bar rather than a band of
            its own, so appearing and disappearing never re-flows the stage. */}
        {M && modeInfo ? (
          <p className="ne-lens-say" role="status">
            <i aria-hidden="true" />
            <span>{(ANALYSIS.find((a) => a.id === modeInfo) ?? lens).d}</span>
            {(ANALYSIS.find((a) => a.id === modeInfo) ?? lens).needsSel && !sel ? (
              <b>בחירת טבלה מפעילה את העדשה</b>
            ) : null}
            <button type="button" className="nu-ghost ne-x" onClick={() => setModeInfo(null)} aria-label="סגירת ההסבר">
              <X size={13} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </p>
        ) : null}
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
          {/* THE WAY BACK. While a table is open this bar is the one thing on
              the canvas that is always reachable, and it does exactly what a
              second click on the card does: folds it and glides the camera back
              to the three numbers it left. */}
          {openT ? (
            <div className="ne-openbar" role="group" aria-label="הטבלה הפתוחה">
              <span className="ne-openbar-id">
                <b className="nx-sap">{openT.n}</b>
                <em>{openT.he || openT.en || "–"}</em>
              </span>
              <span className="ne-openbar-lens">{lens.he}</span>
              <button
                type="button"
                className="nu-ghost"
                onClick={fitSelection}
                aria-label="התאמה לטבלה ולשכנותיה"
                title="התאמה לטבלה ולשכנותיה"
              >
                <Crosshair size={15} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="nu-btn2 ne-openbar-back"
                onClick={() => {
                  setFocus(false);
                  closeNode();
                }}
              >
                <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                חזרה לתצוגה הקודמת
              </button>
            </div>
          ) : null}
          <svg
            className="ne-canvas"
            role="img"
            aria-label={
              M
                ? `תרשים ER של מודול ${M.code}: ${scopeCount} טבלאות`
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
                  // THE BADGE IS VERBATIM. The dataset writes 1:1, 1:N, N:1 or
                  // N:N and that exact string is what the badge shows. Where it
                  // wrote nothing the badge is a dash on a dashed outline — a
                  // gap drawn as a gap, never rounded up to a cardinality.
                  const lab = isMap ? `${e.n}` : rec?.cd || "–";
                  const bw = Math.max(22, lab.length * 7.2 + 12);
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
                          ? `${e.p} ↔ ${e.c}: ${e.n} קשרי טבלאות`
                          : `${e.p} → ${e.c} · ${rec?.cd || REL_HE[(rec?.k ?? "unstated") as RelKind]}${rec?.ds ? ` · ${rec.ds}` : ""}`}
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
                      {/* Direction, alive. The pulse always travels parent →
                          child, which is the direction the record states. */}
                      {pulseSet.has(e.i) ? (
                        <circle
                          className="ne-pulse"
                          cx={g.x1}
                          cy={g.y1}
                          r={3}
                          style={{ "--dx": `${g.x2 - g.x1}px`, "--dy": `${g.y2 - g.y1}px` } as React.CSSProperties}
                        />
                      ) : null}
                      <g className="ne-badge" data-blank={!isMap && !rec?.cd ? "1" : "0"}>
                        <rect x={g.cx - bw / 2} y={g.cy - 17} width={bw} height={16} rx={8} />
                        <text x={g.cx} y={g.cy - 5.5} textAnchor="middle">
                          {lab}
                        </text>
                      </g>
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
                          <title>{`${m.code} · ${m.he}${m.purpose ? `. ${m.purpose}` : ""}`}</title>
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
                  : // SVG has no z-index: paint order IS stacking order. The
                    // opened card is the tallest thing on the canvas, so it is
                    // moved to the end of the list and can never be overdrawn
                    // by a neighbour that happens to sort after it.
                    [...picture.names.filter((n) => n !== open), ...picture.names.filter((n) => n === open)].map((name) => {
                      const t = tByName.get(name);
                      const p = live.pos.get(name);
                      if (!t || !p) return null;
                      const off = !nodeOn(name) || !shown(name);
                      const lvl = nodeLvl(name);
                      const hit = query ? hitSet.has(name) : false;
                      const out = !inGroup(name);
                      const dg = degOf(name);
                      const isOpen = open === name;
                      // THE OPEN CARD. Same node, unfolded. Its box was already
                      // handed to the edge router through sizeMap, so the
                      // relations stay attached while it is read.
                      const rows = isOpen ? keyFields(t) : [];
                      const oh = isOpen ? openHeight(t) : H;
                      const ow = isOpen ? OPEN_W : W;
                      const oy = -oh / 2;
                      const px = ow / 2 - 18;
                      const rowTop = oy + O_HEAD + O_CAP + 14;
                      const ruleY = oy + O_HEAD + O_CAP + rows.length * O_ROW + 4;
                      const s4 = t.s4v;
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
                          data-card={isOpen ? "open" : "shut"}
                          transform={`translate(${p.x} ${p.y})`}
                          onMouseEnter={() => !moving.current && setHover(name)}
                          onMouseLeave={() => setHover((h) => (h === name ? null : h))}
                          style={{ "--m": modVar(ownerOf(t)), "--ms": modVar(ownerOf(t)), "--o": t.o } as React.CSSProperties}
                        >
                          <title>{`${t.n}: ${t.he || t.en}. ${ZONE_HE[t.z] || t.z}. ${dg} קשרים`}</title>
                          <rect className="ne-node-h" x={-ow / 2 - 5} y={oy - 5} width={ow + 10} height={oh + 10} rx={14} />
                          <rect className="ne-node-r" x={-ow / 2} y={oy} width={ow} height={oh} rx={isOpen ? 14 : 10} />
                          {/* THE TOP ACCENT, restored from the production ERD.
                              The module used to be a 4px line on one edge, which
                              is easy to miss on a node seen at 40% zoom. The old
                              graph runs the module colour the full width of the
                              card's head, and that is what lets a reader name a
                              module before reading its label. Drawn as a path
                              because an SVG rect cannot round only two corners. */}
                          {(() => {
                            const r = isOpen ? 14 : 10;
                            const x0 = -ow / 2;
                            const x1 = ow / 2;
                            const t0 = oy;
                            const b0 = oy + 5;
                            return (
                              <path
                                className="ne-node-top"
                                d={`M${x0},${t0 + r} A${r},${r} 0 0 1 ${x0 + r},${t0} L${x1 - r},${t0} A${r},${r} 0 0 1 ${x1},${t0 + r} L${x1},${b0} L${x0},${b0} Z`}
                              />
                            );
                          })()}
                          {/* MODULE identity is a line on the inline-start edge.
                              OBJECT class is the small marker beneath it. */}
                          <rect className="ne-node-mb" x={ow / 2 - 10} y={oy + 9} width={4} height={(isOpen ? O_HEAD : oh) - 18} rx={2} />
                          <rect className="ne-node-cls" x={-ow / 2 + 10} y={oy + 12} width={4} height={14} rx={2} />
                          {/* See the note on the module card: `end` is the LEFT
                              edge for an inherited-RTL text run, so Hebrew uses
                              `start` and the direction:ltr mono runs use `end`
                              to land on the same inline-start side. */}
                          <text className="ne-node-mod nx-sap" x={-ow / 2 + 20} y={oy + 22} textAnchor="start">
                            {t.m}
                          </text>
                          <text className="ne-node-z" x={px} y={oy + 22} textAnchor="start">
                            {cut(ZONE_HE[t.z] || t.z, 14)}
                          </text>
                          <text className="ne-node-n nx-sap" x={px} y={oy + 46} textAnchor="end">
                            {t.n}
                          </text>
                          <text className="ne-node-he" x={px} y={oy + 65} textAnchor="start">
                            {cut(t.he || t.en || "–", isOpen ? 30 : 25)}
                          </text>
                          {!isOpen ? (
                            <>
                              <text className="ne-node-k nx-sap" x={W / 2 - 20} y={H / 2 - 12} textAnchor="end">
                                {t.pk.length
                                  ? `PK ${t.pk[0]}${t.pk.length > 1 ? ` +${t.pk.length - 1}` : ""}`
                                  : `${t.fn} שדות`}
                              </text>
                              <text className="ne-node-fk nx-sap" x={-W / 2 + 20} y={H / 2 - 12} textAnchor="start">
                                {t.fk.length ? `FK ${t.fk.length} · ${dg}` : `${dg}`}
                              </text>
                              {/* S/4HANA — IMPACT, not merely "has a statement".
                                  My first cut badged any table whose s4 string
                                  was non-empty, and 217 of the 220 tables carry
                                  one: most of them read "ללא שינוי (תואם)".
                                  That badged 17 PM tables as affected when the
                                  dataset explicitly calls them compatible, which
                                  is a false SAP claim on a consultant's screen.

                                  The old graph uses s4For().impacted, i.e. risk
                                  high or medium. The catalog already resolves
                                  the same thing into s4v, so the badge is that
                                  and nothing else, and it carries the risk
                                  colour rather than one flat amber. */}
                              {t.s4v && (t.s4v.r === "high" || t.s4v.r === "medium") ? (
                                <g
                                  className="ne-node-s4"
                                  data-risk={t.s4v.r}
                                  transform={`translate(${ow / 2 - 34} ${oy + 12})`}
                                >
                                  <rect width={26} height={13} rx={3} />
                                  <text x={13} y={10} textAnchor="middle">S/4</text>
                                </g>
                              ) : null}
                              {/* The affordance the old node shows on hover. */}
                              <text className="ne-node-hint" x={px} y={oh + oy - 10} textAnchor="start">
                                לחיצה ↡
                              </text>
                            </>
                          ) : (
                            <g className="ne-open">
                              <line className="ne-open-rule" x1={-ow / 2 + 12} x2={ow / 2 - 12} y1={oy + O_HEAD} y2={oy + O_HEAD} />
                              <text className="ne-open-cap" x={px} y={oy + O_HEAD + 15} textAnchor="start">
                                שדות מפתח · {rows.length} מתוך {t.fn}
                              </text>
                              <text className="ne-open-cap nx-sap" x={-ow / 2 + 18} y={oy + O_HEAD + 15} textAnchor="start">
                                {t.pk.length} PK · {t.fk.length} FK · {dg}
                              </text>
                              {rows.length ? (
                                rows.map((f, i) => {
                                  const yr = rowTop + i * O_ROW;
                                  const k = f[3] === "PK" || f[3] === "FK" ? f[3] : "";
                                  return (
                                    <g key={f[0]} className="ne-open-row" data-k={k || "-"}>
                                      <rect className="ne-open-chip" x={px - 25} y={yr - 10} width={25} height={13} rx={3.5} />
                                      <text className="ne-open-chip-t nx-sap" x={px - 12.5} y={yr} textAnchor="middle">
                                        {k || "·"}
                                      </text>
                                      <text className="ne-open-f nx-sap" x={px - 31} y={yr} textAnchor="end">
                                        {cut(f[0], 18)}
                                      </text>
                                      <text className="ne-open-t nx-sap" x={-ow / 2 + 18} y={yr} textAnchor="start">
                                        {cut(f[1] || "–", 12)}
                                      </text>
                                    </g>
                                  );
                                })
                              ) : (
                                <text className="ne-open-none" x={px} y={rowTop} textAnchor="start">
                                  לא קיים תיעוד מאומת במאגר על שדות הטבלה
                                </text>
                              )}
                              <line className="ne-open-rule" x1={-ow / 2 + 12} x2={ow / 2 - 12} y1={ruleY} y2={ruleY} />
                              {/* S/4HANA. Shown when the project holds a
                                  standing, and stated as absent when it does
                                  not — never inferred from the table name. */}
                              {s4 ? (
                                <g className="ne-open-s4" data-risk={s4.r} data-trust={s4.t}>
                                  <circle className="ne-open-s4-d" cx={px - 4} cy={ruleY + 12} r={4} />
                                  <text className="ne-open-s4-h" x={px - 14} y={ruleY + 16} textAnchor="start">
                                    S/4HANA · {S4_RISK_HE[s4.r]} · {S4_TRUST_HE[s4.t]}
                                  </text>
                                  <text className="ne-open-s4-b" x={px} y={ruleY + 32} textAnchor="start">
                                    {cut(s4.ch, 40)}
                                  </text>
                                </g>
                              ) : (
                                <text className="ne-open-none" x={px} y={ruleY + 20} textAnchor="start">
                                  S/4HANA · לא קיים תיעוד מאומת במאגר
                                </text>
                              )}
                            </g>
                          )}
                          {t.ms.length > 1 ? <circle className="ne-node-sh" cx={px} cy={oy + 36} r={3} /> : null}
                          {/* A separate affordance so a plain click can still
                              open the card in place without navigating away.
                              Where no object page was generated it opens the
                              in-page sheet. */}
                          {/* The affordance carries no handler of its own: the
                              stage's native listeners recognise it by
                              [data-open] and call the CURRENT openTable through
                              a ref, so nothing created during a render ever
                              touches one. */}
                          <g
                            className="ne-node-go"
                            data-open="1"
                            role="button"
                            tabIndex={0}
                            aria-label={t.pg ? `פתיחת עמוד האובייקט ${t.n}` : `פתיחת כרטיס הטבלה ${t.n}`}
                          >
                            <rect x={-ow / 2 + 8} y={oy + 32} width={30} height={22} rx={6} />
                            <path d="M0 0 L-6 -6 M0 0 L0 -5 M0 0 L-5 0" transform={`translate(${-ow / 2 + 26} ${oy + 46})`} />
                          </g>
                        </g>
                      );
                    })}
              </g>
            </g>
          </svg>

          {/* MINIMAP. An overlay, and therefore switchable: while it is on
              screen it owns the pointer over its own corner of the stage, and a
              table underneath it would be unreachable. */}
          {mini ? (
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
          ) : null}

          <p className="ne-hint">
            <kbd>Ctrl</kbd> + גלגלת לזום · גרירה להזזה · <kbd>+</kbd> <kbd>−</kbd> <kbd>0</kbd> ·
            {isMap
              ? " לחיצה על מודול פותחת את מודל הנתונים שלו"
              : open
                ? " לחיצה נוספת על הכרטיס מחזירה לתצוגה הקודמת"
                : " לחיצה על טבלה פותחת אותה בתרשים"}
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

      <p className="ne-credit">Project NEO · CBC Israel · פותח על ידי סאלי חליף · Web Coding</p>

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
              <button type="button" className="nu-ghost" onClick={() => setKeys(false)} aria-label="סגירה">
                <X size={16} strokeWidth={2} aria-hidden="true" />
              </button>
            </header>
            <dl className="ne-sheet-k">
              {[
                ["לחיצה", "פתיחת הטבלה בתרשים: שדות מפתח, PK/FK והכרעת S/4HANA · במפה: פתיחת המודול"],
                ["לחיצה שנייה", "סגירת הכרטיס וחזרה לתצוגה הקודמת"],
                ["לחיצה כפולה", "מעבר לעמוד האובייקט המלא"],
                ["רווח", "מרכוז הפריט הנבחר"],
                ["Enter", "פתיחת עמוד האובייקט הנבחר"],
                ["Esc", "סגירת הכרטיס · חזרה לתצוגה הקודמת · חזרה רמה אחת בתרשים"],
                ["F / D / L / I / B", "עדשות: מיקוד · תלויות · מקור הנתונים · השפעה · זרימה עסקית"],
                ["+ / −", "הגדלה / הקטנה"],
                ["0", "התאמת התרשים למסך"],
                ["חצים", "הזזת התרשים"],
                ["Ctrl + גלגלת", "הגדלה סביב הסמן · גלילה רגילה גוללת את העמוד"],
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
                קשר שנרשם בתיעוד ללא קרדינליות: קו מקווקו
              </li>
              <li className="ne-legend-k">
                <span className="ne-lg-pk" aria-hidden="true" />
                נקודה מלאה ופס: צד המפתח הראשי
              </li>
              <li className="ne-legend-k">
                <span className="ne-lg-fk" aria-hidden="true" />
                כף עורב, צד ה-N · שני פסים, צד ה-1
              </li>
              <li className="ne-legend-k">
                <span className="ne-lg-card" aria-hidden="true">
                  N:1
                </span>
                תג הקרדינליות על הקו מוצג כלשונו מהמאגר: 1:1 · 1:N · N:1 · N:N. מקף על
                מסגרת מקווקוות מציין שלא נרשמה קרדינליות.
              </li>
            </ul>
            <p className="ne-note">
              כל מודול, טבלה, קשר, קרדינליות והצהרת S/4HANA בתרשים נקראים כלשונם מהמאגר. היכן שאין
              תיעוד, הדבר מצוין במפורש.
            </p>
            <button type="button" className="nu-btn2" onClick={() => setKeys(false)}>
              סגירה
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------- a disclosure

   The control that made a 51-chip toolbar reachable. Deliberately small: a
   trigger that says what is behind it, a panel that is a real dialog to a
   screen reader, and three ways out — the trigger again, Escape, and a pointer
   anywhere else.

   WHY THE LISTENERS ARE ON THE CAPTURE PHASE. This panel floats over a canvas
   that binds its own native pointerdown, and over a stage that answers Escape
   with "close the open card". Capturing at the document means the dismissal
   happens BEFORE either of them sees the event, so closing a popover can never
   also deselect a table or fold a card the reader is still reading. */
function ErdPop({
  open, onToggle, onClose, name, label, children, wide, on, style,
}: {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  /** The accessible name of the panel, and the trigger's title. */
  name: string;
  label: React.ReactNode;
  children: React.ReactNode;
  wide?: boolean;
  /** True when the trigger should read as carrying a chosen value. */
  on?: boolean;
  style?: React.CSSProperties;
}) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) onClose();
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      onClose();
      // Focus returns to the trigger, or the reader is left standing on an
      // element that no longer exists.
      box.current?.querySelector<HTMLButtonElement>("button")?.focus();
    };
    document.addEventListener("pointerdown", away, true);
    document.addEventListener("keydown", esc, true);
    return () => {
      document.removeEventListener("pointerdown", away, true);
      document.removeEventListener("keydown", esc, true);
    };
  }, [open, onClose]);

  return (
    <div className="ne-pop" ref={box} data-open={open ? "1" : "0"}>
      <button
        type="button"
        className="nu-filter ne-pop-t"
        style={style}
        data-on={on ? "1" : "0"}
        aria-expanded={open}
        aria-haspopup="dialog"
        title={name}
        onClick={onToggle}
      >
        {label}
        <ChevronDown size={13} strokeWidth={2} aria-hidden="true" className="ne-pop-c" />
      </button>
      {open ? (
        <div className="ne-pop-p" role="dialog" aria-label={name} data-wide={wide ? "1" : "0"}>
          {children}
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
