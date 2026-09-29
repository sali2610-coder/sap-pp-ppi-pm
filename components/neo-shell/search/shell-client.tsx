"use client";

/* ============================================================================
   PROJECT NEO · CONCEPT D — the application shell and the signature navigation.
   ----------------------------------------------------------------------------
   This is the CLIENT half of the shell. It used to be the whole of
   components/neo-shell/neo-shell.tsx; that file is now a thin SERVER component
   whose only job is to read the build-time command index and hand it down here
   as plain props. app/neo/layout.tsx is frozen for this change, so the server
   boundary had to move into the shell itself — and the new build-time function
   belongs under components/neo-shell/search/, which is why its client consumer
   lives here beside it.

   WHAT MOVES, AND WHY IT IS ALLOWED TO
     transform  — the travelling indicator, the rail FLIP, group expansion, the
                  shelf cross-fade, the preview layer, the command surface, the
                  mobile sheet.
     opacity    — labels across the compact transition, shelf pane swaps.
     nothing else. No width, height, top/left, filter or box-shadow is ever
     animated. `prefers-reduced-motion` is honoured in both halves: the CSS
     rules are neutralised by the media query, and flip.ts checks the same query
     before it starts a Web Animation (a media query cannot reach WAAPI).

   THE NINE STATES, MODELLED HONESTLY
     Six of them are real rail modes with real CSS: expanded (the base), compact,
     hidden, peek, search, context. `hover` and `active` are BEHAVIOURS, not
     modes — hover is the preview layer, and active is simply what happens on
     every route change. `mobile` is a different shell entirely. Modelling all
     nine as one enum would have shipped three states that do nothing.

   THE COMMAND SURFACE AND THE KEYBOARD (gate 6, blockers 2 to 6; gate 4, 4)
     On a desktop the surface is rendered inside the rail, right after the
     field that drives it, so Tab goes from the field into the surface; the page
     behind it is inert while it is open and the rail stays live. On a phone, a
     tablet and a desktop window narrower than 40rem (400% zoom) it is a
     full-screen dialog with its own field, and everything behind it is inert.
     Opening focuses the field in the same task as the key or click; closing
     returns focus to the control that opened it when that control can still
     take it, and otherwise to the search control in the bar — never to the
     rail's field, which hides when the surface closes.
   ========================================================================== */

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { flushSync } from "react-dom";
import {
  useCallback, useDeferredValue, useEffect, useLayoutEffect, useMemo, useRef, useState,
  useSyncExternalStore,
} from "react";
import { Menu, PanelRightClose, PanelRightDashed, PanelRightOpen } from "lucide-react";
import { mark } from "@/components/defer-mount";
import {
  armReturn, consumeReturn, normalisePath, parentOf, rememberOrigin, useReturnPacket,
} from "@/components/neo-shell/nav-context";
import { currentDeviceClass } from "@/lib/device";
import { Ico } from "../icon";
import {
  GROUP_MS, RAIL_MS, measure, play, playEnter, playScaleX, raf, raf2, reducedMotion,
} from "../flip";
import { modVar } from "../mod-var";
import { SiteFooter } from "../site-footer";
import { PreviewPanel } from "../preview";
import { ContextPane, PinnedPane, RecentPane, ShelfTabs } from "../shelf";
import { useFavorites } from "@/lib/prefs";
import { MobileSheet, MobileTabs } from "../mobile-nav";
import { pushRecentObject, relTime, setLayout, useLayout, useRecent } from "../store";
import { DockButtons } from "../dock/dock-buttons";
import type { NavItem, RailMode, ShelfTab, ShellData } from "../types";
import { BROWSE_CAP, KINDS, buildIndex, runQuery, suggest } from "./build";
import { CommandSurface, type EmptyAction } from "./command-surface";
import { CmdKey } from "../cmd-key";
import type { CmdItem, CmdKind, CmdRecord, CommandExtra, CommandTx } from "./types";

/* The transaction rows (1,847) come from /neo/search-tx.json, once per visit:
   inline they added ~24 KB gzip to every page (gate 6, major 9). A failed load
   is retried on the next attempt; the rest of the index works meanwhile. */
let txLoad: Promise<CommandTx> | null = null;
const loadTx = () => (txLoad ??= fetch("/neo/search-tx.json")
  .then((r) => { if (!r.ok) throw new Error(`search-tx ${r.status}`); return r.json() as Promise<CommandTx>; })
  .catch((e: unknown) => { txLoad = null; throw e; }));

const nf = new Intl.NumberFormat("he-IL");
const PREVIEW_DELAY = 260;

/* A desktop window narrower than 40rem (a phone-width window, or a desktop
   browser at 400% zoom, which is the WCAG reflow case) defaults to the peek
   rail: the expanded rail left the content 110px at 390px and 40px at 320px,
   and even the compact one left 252px at 320px, narrower than any phone
   layout. Peek gives the canvas the full width and slides the rail in on
   hover of its edge strip or when focus enters it. Only the default changes;
   a mode the user chose is kept, and the device still decides the shell
   (lib/device.ts). The command surface uses the same width to become a
   full-screen sheet: beside a 280px rail it had 12px left (gate 4, blocker 4). */
const NARROW_Q = "(max-width: 40rem)";
const subscribeNarrow = (cb: () => void) => {
  const m = window.matchMedia(NARROW_Q);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
const isNarrow = () => window.matchMedia(NARROW_Q).matches;
/* data-device is written before first paint and never changes. */
const noSubscribe = () => () => {};

/* --------------------------------------------------------------- returning

   SMART RETURN, the search half (components/neo-shell/nav-context).

   A search result is the one origin in the product that is not a PAGE: the
   reader was on some route, opened the surface over it and left from there. So
   the record points `href` at that route and carries the query as its detail,
   which is what makes the destination's control read "חזרה לתוצאות החיפוש ·
   EQUI" instead of naming a page the reader never looked at.

   Returning re-opens the surface with the same query and the same facets, so
   the answer they were reading is on screen again rather than an empty field. */

const SEARCH_SURFACE = "neo:search";

/** A type alias and not an interface: only an alias picks up the implicit index
 *  signature that lets it satisfy the module's OriginState contract. */
type SearchBack = { q: string; only: string | null; mod: string | null };

/** Prefix match, but only on a full path segment: "/neo/pm/" must not be
 *  activated by "/neo/pm-something/". */
const isActive = (path: string, href: string) => path === href || path.startsWith(href);

/** Families whose detail pages are named by an SAP identifier, so the last
 *  path segment is the record's own name (AFKO, IW31, I_Product). */
const ID_FAMILIES = ["/neo/tables/", "/neo/transactions/", "/neo/bapi/", "/neo/cds/", "/neo/idoc/", "/neo/object/"];
/** Families whose last segment is a slug, not a name: the crumb takes the
 *  record's own title from the index, or is left out (gate 5, #11). */
const SLUG_FAMILIES = ["/neo/fiori-apps/", "/neo/enhancements/"];

/** The three legal documents have no rail item and no parent below home; the
 *  phone bar names them as the footer links do (gate 5, #10). */
const LEGAL: Record<string, string> = {
  "/neo/privacy/": "מדיניות פרטיות",
  "/neo/terms/": "תנאי שימוש",
  "/neo/accessibility/": "הצהרת נגישות",
};

/** The catalogue an unknown SAP code is handed to from the empty state, with
 *  the query applied through the catalogue's own return packet (gate 6,
 *  major 14). Names as the rail writes them. */
const CATALOGUE = {
  bapi: { href: "/neo/bapi/", surface: "neo:bapi", label: "BAPI ו-FM", he: "BAPI ו-FM" },
  tables: { href: "/neo/tables/", surface: "neo:tables", label: "טבלאות SAP", he: "טבלאות SAP" },
  tx: { href: "/neo/transactions/", surface: "neo:transactions", label: "טרנזקציות", he: "הטרנזקציות" },
} as const;
type Catalogue = (typeof CATALOGUE)[keyof typeof CATALOGUE];
function catalogueFor(q: string): Catalogue | null {
  if (!/^[A-Za-z0-9_/-]{2,}$/.test(q) || !/[A-Za-z]/.test(q)) return null;
  if (/^BAPI_/i.test(q)) return CATALOGUE.bapi;
  if (/^[A-Za-z]{4,5}$/.test(q)) return CATALOGUE.tables;
  return CATALOGUE.tx;
}

/** The element that actually scrolls a result row: the results box, or the
 *  sheet itself when a short window lets the whole sheet scroll. */
function scrollerOf(row: HTMLElement, fallback: HTMLElement): HTMLElement {
  for (let n = row.parentElement; n && n !== document.body; n = n.parentElement) {
    const oy = getComputedStyle(n).overflowY;
    if ((oy === "auto" || oy === "scroll") && n.scrollHeight > n.clientHeight + 1) return n;
  }
  return fallback;
}

/** Can this element take focus back when the surface closes: still in the
 *  document, painted, not inside something inert or hidden, and not the rail's
 *  own field or anything inside the surface. */
function canTakeFocus(el: HTMLElement | null, except: HTMLElement | null): el is HTMLElement {
  return !!el && el !== except && el.isConnected && el.getClientRects().length > 0
    && !el.closest("[inert], [aria-hidden='true'], .nxc");
}

export function NeoShellClient({
  data, cmd, fontClass = "", children,
}: {
  data: ShellData;
  cmd: CommandExtra;
  /** next/font variable classes, computed on the server (components/neo-shell/neo-shell.tsx). */
  fontClass?: string;
  children: React.ReactNode;
}) {
  const path = usePathname() || "/neo/";
  const router = useRouter();
  const here = normalisePath(path);

  const items = useMemo(() => data.groups.flatMap((g) => g.items), [data.groups]);
  /* The rail item this page lives under. A family with no item of its own
     (object, centres, domains, the reader) marks its parent's item, the same
     parent the breadcrumb and the return control name (gate 5, #10). */
  const active = useMemo<NavItem | null>(() => {
    const direct = items.find((i) => isActive(path, i.href));
    if (direct) return direct;
    const parent = parentOf(here);
    return items.find((i) => normalisePath(i.href) === parent.href) || null;
  }, [items, path, here]);

  /* ------------------------------------------------------------- state
     mode and the per-group open map live in an external store rather than in
     useState, so a saved layout is restored with no hydration mismatch and no
     setState inside an effect. A group with no entry is open — that is the
     default, and it is the server snapshot too. */
  const layout = useLayout();
  const narrow = useSyncExternalStore(subscribeNarrow, isNarrow, () => false);
  const device = useSyncExternalStore(noSubscribe, currentDeviceClass, () => "desktop" as const);
  const mode: RailMode = layout.mode ?? (narrow ? "peek" : "expanded");
  const open = layout.open;
  const setMode = useCallback((m: RailMode) => setLayout({ mode: m }), []);
  /** The surface is a full-screen dialog rather than a panel beside the rail. */
  const sheet = device !== "desktop" || narrow;

  const [query, setQuery] = useState("");
  const [only, setOnly] = useState<CmdKind | null>(null);
  /** Module facet. A string rather than ModuleKey: the facets are built from the
   *  modules the matched records really declare, and the dataset is free to name
   *  one the shell's own union does not know about. */
  const [modOnly, setModOnly] = useState<string | null>(null);
  /** Rows per family while one family is listed; "הצגת עוד" adds a page. */
  const [limit, setLimit] = useState(BROWSE_CAP);
  const [cursor, setCursor] = useState(0);
  const [shelf, setShelf] = useState<ShelfTab>("recent");
  const [ctxName, setCtxName] = useState<string>(data.defaultContext);
  const [pvId, setPvId] = useState<string | null>(null);
  const [sheetNav, setSheetNav] = useState(false);

  const { names: recent, seen } = useRecent();
  // The shelf collapses to one line while nothing has been opened or pinned
  // (design audit §3: an empty shelf took a large slice of the rail).
  const favs = useFavorites();
  const [shelfOpen, setShelfOpen] = useState(false);
  const shelfEmpty = !shelfOpen && recent.length === 0 && favs.length === 0;

  /* -------------------------------------------------------------- refs */
  const appRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLSpanElement>(null);
  const edgeRef = useRef<HTMLSpanElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cmdRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const shelfRef = useRef<HTMLDivElement>(null);
  const footRef = useRef<HTMLDivElement>(null);
  const indRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const pvRef = useRef<HTMLDivElement>(null);
  const pvAnchor = useRef<HTMLElement | null>(null);
  const pvTimer = useRef<number | null>(null);
  const sqTimer = useRef<number | null>(null);
  const prevY = useRef<number | undefined>(undefined);
  /** The layout the user was in before ⌘K. Escaping search restores it instead
   *  of silently dropping a compact rail back to expanded. */
  const beforeSearch = useRef<RailMode>("expanded");
  /** The control that had focus when the surface opened, and how it closed:
   *  dismissed (Escape, the close button, a click outside, the shortcut) or by
   *  leaving for a result. Focus goes back to it only on a dismissal. */
  const opener = useRef<HTMLElement | null>(null);
  const closedBy = useRef<"dismiss" | "go">("dismiss");
  const shelfTabsRef = useRef<HTMLDivElement>(null);
  const shelfIndRef = useRef<HTMLSpanElement>(null);

  /* ------------------------------------------------------ hydration */
  useEffect(() => {
    // DeferMount is not mounted on /neo, and it is what normally emits this
    // mark — without it window.__neoTimeline() and /diag/ report the hydration
    // stage as n/a on every page in the namespace.
    mark("shell-hydrated");
  }, []);

  /* --------------------------------------------------------- search
     The field is driven by `query` and everything EXPENSIVE is driven by
     `dq`. useDeferredValue lets React paint the keystroke first and re-run the
     index scan in the following, interruptible pass — so a fast typist never
     waits on a scan that a later keystroke is about to invalidate. The rail's
     own filter reads the same deferred value, so the tree and the result list
     can never disagree about which query is on screen. */
  const dq = useDeferredValue(query);
  const q = dq.trim().toLowerCase();

  /** The whole command index, assembled once from the two build-time payloads.
   *  ~thousands of plain rows — cheap to hold, and never rebuilt per keystroke. */
  const [tx, setTx] = useState<CommandTx | null>(null);
  const [txFailed, setTxFailed] = useState(false);
  const index = useMemo(() => buildIndex(data, cmd, tx), [data, cmd, tx]);
  const result = useMemo(() => runQuery(index, dq, only, modOnly, limit), [index, dq, only, modOnly, limit]);

  /** Real per-family totals for the idle state of the surface. */
  const idle = useMemo(() => {
    const n = new Map<CmdKind, number>();
    for (const r of index) n.set(r.k, (n.get(r.k) || 0) + 1);
    return KINDS.filter((k) => n.get(k.k)).map((k) => ({ ...k, n: n.get(k.k)! }));
  }, [index]);

  /** The index's record for a page, by its path: the last breadcrumb names the
   *  record, never a URL slug (gate 5, #11). Fields and chapters point inside a
   *  page, so the page's own record is the first one seen. */
  const recordAt = useMemo(() => {
    const m = new Map<string, CmdRecord>();
    for (const r of index) if (r.href && r.k !== "field" && r.k !== "chapter") {
      const p = normalisePath(r.href);
      if (!m.has(p)) m.set(p, r);
    }
    return m;
  }, [index]);

  /* The rail filters the very list underneath the field before search ever
     escalates — the approved behaviour, kept. */
  const visible = useMemo(() => {
    if (!q) return null; // null = no filter at all
    return new Set(items.filter((i) => i.label.toLowerCase().includes(q) || i.id.includes(q)).map((i) => i.id));
  }, [items, q]);

  /* …but it only FILTERS while the query still names a destination. A real SAP
     query ("EQUI", "IW31") matches no navigation label, and filtering on it
     emptied the whole tree — which is exactly when the surrounding interface is
     supposed to be responding. Below that threshold the tree stays whole and
     answers with emphasis instead: matches brighten, the rest step back. */
  const navFilter = visible && visible.size > 0 ? visible : null;

  // The surrounding interface answers the query, not just the field: a module
  // that the results really live in brightens, everything else steps back.
  const hitMods = result.mods;

  /** The surface is doing work whenever there is a query OR a family is being
   *  browsed. Both states transform the surrounding interface; only a bare open
   *  field leaves it alone. */
  const live = !!q || result.browse;

  /** THE COLOUR OF THE ANSWER. The rail, the panel edge and the wash over the
   *  canvas all take the hue of the module the matches actually live in.
   *
   *  It is the module that OWNS the answer, not merely one that appears in it:
   *  a clear majority (60%) of the matches that declare a module at all. A query
   *  that lands evenly across PM and PP-PI has no single owner, and the surface
   *  correctly stays neutral rather than picking a side by accident. An explicit
   *  module facet is an answer in itself and wins outright. */
  const surfaceMod = useMemo(() => {
    if (mode !== "search") return undefined;
    if (modOnly) return modOnly;
    if (!live) return undefined;
    const pairs = Object.entries(result.modCounts);
    if (!pairs.length) return undefined;
    pairs.sort((a, b) => b[1] - a[1]);
    const owned = pairs.reduce((a, x) => a + x[1], 0);
    return pairs[0][1] / owned >= 0.6 ? pairs[0][0] : undefined;
  }, [mode, live, modOnly, result.modCounts]);
  const searchMod = surfaceMod;

  /* A new query, a new family or a new module facet always restarts the cursor
     at the top and the listing at its first page. Done in the setters rather
     than in an effect, so there is no second render pass between the keystroke
     and the first highlighted row. */
  const applyQuery = useCallback((v: string) => { setQuery(v); setCursor(0); setLimit(BROWSE_CAP); }, []);
  const applyOnly = useCallback((k: CmdKind | null) => { setOnly(k); setCursor(0); setLimit(BROWSE_CAP); }, []);
  const applyMod = useCallback((m: string | null) => { setModOnly(m); setCursor(0); setLimit(BROWSE_CAP); }, []);

  /* ---------------------------------------------- the travelling pill */
  const syncInd = useCallback(() => {
    const scroll = scrollRef.current;
    const ind = indRef.current;
    if (!scroll || !ind) return;
    const el = scroll.querySelector<HTMLElement>(".nx-navitem[aria-current]");
    const group = el?.closest<HTMLElement>(".nx-group");
    if (!el || !el.offsetParent || group?.dataset.open === "false") {
      ind.dataset.off = "1";
      return;
    }
    ind.dataset.off = "0";
    // Summed up to the pill's own offsetParent: in the compact rail the item's
    // offsetParent is its .nx-group, so a bare offsetTop was group-relative and
    // parked the pill beside the first group. Offsets, not rects, so a FLIP
    // transform in flight cannot skew it.
    let y = 0;
    for (let n: HTMLElement | null = el; n && n !== ind.offsetParent; n = n.offsetParent as HTMLElement | null) y += n.offsetTop;
    ind.style.setProperty("--y", `${y}px`);
    ind.style.setProperty("--h", `${el.offsetHeight}px`);
    ind.style.setProperty("--m", el.dataset.mod ? modVar(el.dataset.mod) : "var(--brand)");
    const prev = prevY.current;
    prevY.current = y;
    // Weight: the longer the trip, the more the pill stretches along the axis of
    // travel before it lands. 900px of travel saturates at +22%. The reset lands
    // 130ms into the shared 420ms spring, so squash and settle read as one
    // gesture. `prev === undefined` is first paint — no animation on mount.
    if (prev !== undefined && prev !== y && !reducedMotion()) {
      const d = prev - y;
      ind.style.setProperty("--sq", String(1 + Math.min(0.22, Math.abs(d) / 900)));
      // The trail is drawn on the side the pill came FROM, so the signal reads
      // as travel rather than as a pulse. Cleared with the squash.
      ind.dataset.dir = d > 0 ? "up" : "down";
      if (sqTimer.current) window.clearTimeout(sqTimer.current);
      sqTimer.current = window.setTimeout(() => {
        ind.style.setProperty("--sq", "1");
        ind.dataset.dir = "";
      }, 130);
    }
  }, []);

  useLayoutEffect(() => { syncInd(); }, [syncInd, path, mode, open, q, active]);
  useEffect(() => {
    const on = () => raf(syncInd);
    window.addEventListener("resize", on);
    // The groups settle after the first layout pass (a compact rail is restored
    // after hydration: their padding and hairline arrive ~40ms later) and no
    // window resize fires for that; measured, the pill was left 24px above the
    // current item. Border-box, because only padding and border change.
    const ro = new ResizeObserver(on);
    scrollRef.current?.querySelectorAll(".nx-group").forEach((g) => ro.observe(g, { box: "border-box" }));
    return () => { window.removeEventListener("resize", on); ro.disconnect(); };
  }, [syncInd]);

  /* The rail used to take the current section's hue (--railtint) for a wash,
     a bloom and tinted chips. The 2026 system keeps the rail neutral
     (app/neo/rail.css), so nothing sets or reads it any more. */

  /* -------------------------------------------------- shelf underline */
  useLayoutEffect(() => {
    const strip = shelfTabsRef.current;
    const ind = shelfIndRef.current;
    if (!strip || !ind) return;
    const on = strip.querySelector<HTMLElement>(`[data-shelftab="${shelf}"]`);
    if (!on) return;
    const sr = strip.getBoundingClientRect();
    const tr = on.getBoundingClientRect();
    // Direction-agnostic: distance from the strip's INLINE start, measured from
    // rects. offsetLeft is always physical-left and put this underline in the
    // wrong place in RTL.
    const rtl = getComputedStyle(strip).direction === "rtl";
    ind.style.setProperty("--w", `${tr.width}px`);
    ind.style.setProperty("--x", `${rtl ? sr.right - tr.right : tr.left - sr.left}px`);
  }, [shelf, mode]);

  /* ------------------------------------------------------- scroll mask */
  const onScroll = useCallback(() => {
    const s = scrollRef.current;
    if (!s) return;
    s.dataset.top = s.scrollTop > 3 ? "1" : "0";
    s.dataset.bot = s.scrollHeight - s.clientHeight - s.scrollTop > 3 ? "1" : "0";
  }, []);
  useLayoutEffect(() => { onScroll(); }, [onScroll, open, q, mode]);

  /* --------------------------------------------------- preview layer */
  const showPreview = useCallback((el: HTMLElement, immediate = false) => {
    const id = el.dataset.nav;
    // While the surface is open it covers the canvas the preview would open
    // over, and the rail is answering the query instead.
    if (!id || mode === "search") return;
    pvAnchor.current = el;
    const fire = () => setPvId(id);
    if (pvTimer.current) window.clearTimeout(pvTimer.current);
    if (immediate) fire();
    else pvTimer.current = window.setTimeout(fire, PREVIEW_DELAY);
  }, [mode]);

  const hidePreview = useCallback(() => {
    if (pvTimer.current) window.clearTimeout(pvTimer.current);
    setPvId(null);
  }, []);

  /* ------------------------------------------------------- the FLIP */
  const changeMode = useCallback((next: RailMode) => {
    const cur = mode;
    if (cur === next) return;
    if (next === "search") {
      beforeSearch.current = cur;
      const a = document.activeElement as HTMLElement | null;
      opener.current = a && a !== document.body ? a : null;
      closedBy.current = "dismiss";
    }
    const widthChange =
      (cur === "compact") !== (next === "compact") || (cur === "context") !== (next === "context");

    const commit = () => {
      setMode(next);
      if (next === "search") hidePreview();
      if (next === "context") setShelf("context");
      else if (cur === "context") setShelf("recent");
      if (next !== "search") { setQuery(""); setOnly(null); setModOnly(null); setCursor(0); setLimit(BROWSE_CAP); }
    };

    if (!widthChange) { commit(); raf(syncInd); return; }

    const movers = [mainRef.current, headRef.current, cmdRef.current, scrollRef.current, shelfRef.current, footRef.current];
    // LIVE rects, mid-flight on purpose: a transformed element reports its
    // animated visual box, so a second click starts from where the pixels
    // actually are instead of snapping back first.
    const before = measure(movers);
    const bg = bgRef.current;
    const edge = edgeRef.current;
    const bgBefore = bg?.getBoundingClientRect();
    const edgeBefore = edge?.getBoundingClientRect();

    // The grid track changes ONCE, synchronously. Width is never transitioned.
    flushSync(commit);

    // Cancel in flight so the "after" rect is the settled layout box, not an
    // animated one. WAAPI cancel is instant and needs no cleanup timer — the
    // prototype's un-cancelled setTimeout(…, 760) is what made an interrupted
    // flip snap.
    for (const el of [...movers, bg, edge]) el?.getAnimations().forEach((a) => a.cancel());

    movers.forEach((el, i) => {
      if (!el) return;
      const b = before.get(el);
      if (!b) return;
      play(el, b.left - el.getBoundingClientRect().left, "X", Math.min(i, 5) * 12, RAIL_MS);
    });
    if (bg && bgBefore) playScaleX(bg, bgBefore.width, bg.getBoundingClientRect().width);
    // The 1px hairline travels rather than being stretched.
    if (edge && edgeBefore) play(edge, edgeBefore.left - edge.getBoundingClientRect().left, "X", 0, RAIL_MS);

    raf2(syncInd);
  }, [mode, setMode, syncInd, hidePreview]);

  const closeSearch = useCallback(() => {
    changeMode(beforeSearch.current === "search" ? "expanded" : beforeSearch.current);
  }, [changeMode]);

  const searching = mode === "search";

  /* The transactions load when the browser is idle after the page, or at once
     when the search opens first; the index rebuilds when they arrive. A failed
     load is said so in the surface and tried again when the search opens. */
  useEffect(() => {
    if (tx) return;
    let live = true;
    const go = () => {
      loadTx().then((t) => { if (live) { setTx(t); setTxFailed(false); } }, () => { if (live) setTxFailed(true); });
    };
    if (searching) { go(); return () => { live = false; }; }
    if (txFailed) return;
    const idle = "requestIdleCallback" in window;
    const id = idle ? window.requestIdleCallback(go, { timeout: 3000 }) : window.setTimeout(go, 1500);
    return () => { live = false; if (idle) window.cancelIdleCallback(id); else window.clearTimeout(id); };
  }, [tx, txFailed, searching]);

  /* Opening focuses the field in the same task as the key or the click that
     opened it (gate 6, major 16): a 200ms timer used to swallow the first
     letters typed after ⌘K. preventScroll does what the timer was for. */
  useLayoutEffect(() => {
    if (!searching) return;
    const el = sheet ? mInputRef.current : inputRef.current;
    if (el && document.activeElement !== el) el.focus({ preventScroll: true });
  }, [searching, sheet]);

  /* Closing returns focus (gate 6, blocker 2; gate 4, blocker 4): to the
     control that opened the surface when it was dismissed and that control is
     still there and visible, else to the search control in the bar. A control
     inside a peek or hidden rail is passed over, because focusing it would
     slide the rail back over the page. Runs after the commit that removed
     `inert`, so the target can take focus. */
  const wasSearching = useRef(false);
  useLayoutEffect(() => {
    if (searching) { wasSearching.current = true; return; }
    if (!wasSearching.current) return;
    wasSearching.current = false;
    const railHidden = mode === "peek" || mode === "hidden";
    const ok = (el: HTMLElement | null): el is HTMLElement =>
      canTakeFocus(el, inputRef.current) && !(railHidden && !!el.closest(".nx-rail"));
    const pick = (sel: string) =>
      [...document.querySelectorAll<HTMLElement>(sel)].find((el) => ok(el)) || null;
    const back = closedBy.current === "dismiss" && ok(opener.current)
      ? opener.current
      : device === "desktop" ? pick(".nx-topbar .nx-cmdbar") || pick(".nx-railq") : pick("[data-search-tab]");
    opener.current = null;
    if (back) back.focus({ preventScroll: true });
    else (document.activeElement as HTMLElement | null)?.blur?.();
  }, [searching, mode, device]);

  /* ------------------------- group expansion that never resets scroll */
  const toggleGroup = useCallback((gid: string) => {
    const scroll = scrollRef.current;
    if (!scroll) return;
    const head = scroll.querySelector<HTMLElement>(`[data-group="${gid}"]`);
    if (!head) return;

    const movers = [...scroll.querySelectorAll<HTMLElement>(".nx-navitem, .nx-group-btn")];
    const before = new Map(movers.map((el) => [el, el.getBoundingClientRect().top]));
    const headBefore = head.getBoundingClientRect().top;
    const scrollBefore = scroll.scrollTop;
    const opening = open[gid] === false;

    flushSync(() => setLayout({ open: { ...open, [gid]: opening } }));

    // THE trick: pin the clicked heading to the exact pixel the finger left it.
    // Everything else is allowed to move; collapsing a group above the viewport
    // therefore never yanks the list. Measured BEFORE the inversion so the two
    // effects compose.
    scroll.scrollTop = scrollBefore + (head.getBoundingClientRect().top - headBefore);

    movers.forEach((el, i) => {
      if (!el.offsetParent) return; // items in the group being closed are gone
      const b = before.get(el);
      if (b === undefined) return;
      play(el, b - el.getBoundingClientRect().top, "Y", Math.min(i, 8) * 9, GROUP_MS);
    });

    if (opening) {
      const body = scroll.querySelector<HTMLElement>(`#nx-grp-${gid}`);
      body?.querySelectorAll<HTMLElement>(".nx-navitem").forEach((el, i) => playEnter(el, i * 24));
    }
    raf(syncInd);
    raf2(onScroll);
  }, [open, syncInd, onScroll]);

  useLayoutEffect(() => {
    const host = pvRef.current;
    const app = appRef.current;
    const anchor = pvAnchor.current;
    if (!host || !app || !anchor || !pvId) return;
    const panel = host.firstElementChild as HTMLElement | null;
    if (!panel) return;
    const ar = anchor.getBoundingClientRect();
    const sr = app.getBoundingClientRect();
    const w = panel.offsetWidth;
    const h = panel.offsetHeight;
    const rtl = getComputedStyle(app).direction === "rtl";
    // Measured in LOGICAL space so one formula serves RTL and LTR. There is no
    // scaled stage in the real app, so every /scale conversion is gone.
    let y = ar.top - sr.top - 8;
    y = Math.max(8, Math.min(sr.height - h - 8, y));
    const nearEdge = rtl ? sr.right - ar.left : ar.right - sr.left;
    const farEdge = rtl ? sr.right - ar.right : ar.left - sr.left;
    let lx = nearEdge + 10;
    if (lx + w > sr.width - 8) lx = farEdge - w - 10;
    lx = Math.max(8, Math.min(Math.max(8, sr.width - w - 8), lx));
    host.style.transform = `translate(${rtl ? -lx : lx}px, ${y}px)`;
  }, [pvId]);

  /* --------------------------------------------------------- objects */
  const openObject = useCallback((name: string) => {
    if (!data.objects[name]) return;
    setCtxName(name);
    setShelf("context");
    pushRecentObject(name);
  }, [data.objects]);

  // /neo pages announce the object a reader focused; the shelf answers. Keeps
  // the pages decoupled from the shell and safe for static export.
  useEffect(() => {
    const on = (e: Event) => {
      const name = (e as CustomEvent<string>).detail;
      if (typeof name === "string") openObject(name);
    };
    window.addEventListener("neo:nx:object", on as EventListener);
    return () => window.removeEventListener("neo:nx:object", on as EventListener);
  }, [openObject]);

  // A page can open the command surface the way the top bar does (the home's
  // search field), without importing the shell.
  useEffect(() => {
    const on = () => changeMode("search");
    window.addEventListener("neo:nx:search", on);
    return () => window.removeEventListener("neo:nx:search", on);
  }, [changeMode]);

  /* ----------------------------------------------- the command surface */
  const goResult = useCallback((r: CmdRecord) => {
    if (r.ctx) openObject(r.ctx);
    if (r.href) {
      // Activating a result is a router.push and not a link, so the origin is
      // recorded by hand. The query is read here, at the moment of leaving.
      rememberOrigin({
        to: r.href,
        href: path,
        label: "תוצאות החיפוש",
        detail: query.trim(),
        surface: SEARCH_SURFACE,
        state: { q: query, only, mod: modOnly },
      });
      closedBy.current = "go";
      router.push(r.href);
      closeSearch();
    }
  }, [openObject, router, closeSearch, path, query, only, modOnly]);

  /** Enter or a click on one stop of the list: a record opens, a "more" row
   *  narrows to its family or shows the family's next page. */
  const activate = useCallback((it: CmdItem | undefined) => {
    if (!it) return;
    if (it.rec) { goResult(it.rec); return; }
    if (it.next) setLimit((l) => l + BROWSE_CAP);
    else applyOnly(it.more);
  }, [goResult, applyOnly]);

  /** The one action of the empty state (gate 6, major 14 and minor 21): clear
   *  the filter that emptied it; else the SAP code one edit away; else, for a
   *  code, the catalogue it belongs to with the query; else clear the query. */
  const emptyAction = useMemo<EmptyAction | null>(() => {
    if (!searching || !q || result.total) return null;
    if (only || modOnly) return { t: "filter" };
    const near = suggest(index, q);
    if (near) return { t: "suggest", code: near.title };
    const cat = catalogueFor(dq.trim());
    if (cat) return { t: "catalogue", label: cat.he, q: dq.trim() };
    return { t: "clear" };
  }, [searching, q, dq, result.total, only, modOnly, index]);

  const runEmptyAction = useCallback(() => {
    if (!emptyAction) return;
    if (emptyAction.t === "filter") { applyOnly(null); applyMod(null); return; }
    if (emptyAction.t === "suggest") { applyQuery(emptyAction.code); return; }
    if (emptyAction.t === "clear") { applyQuery(""); return; }
    const cat = catalogueFor(emptyAction.q);
    if (!cat) return;
    // The catalogue restores a query from its own return packet, the seam it
    // already reads when the reader comes back to it (nav-context/origin).
    armReturn({ to: cat.href, href: cat.href, label: cat.label, surface: cat.surface, state: { q: emptyAction.q }, at: Date.now() });
    rememberOrigin({
      to: cat.href, href: path, label: "תוצאות החיפוש", detail: query.trim(),
      surface: SEARCH_SURFACE, state: { q: query, only, mod: modOnly },
    });
    closedBy.current = "go";
    router.push(cat.href);
    closeSearch();
  }, [emptyAction, applyOnly, applyMod, applyQuery, path, query, only, modOnly, router, closeSearch]);

  /* ------------------------------------------------- returning to the search

     Applied DURING the render the packet arrives on, then the surface is
     re-opened in an effect — changeMode measures the DOM and animates it, which
     is not something a render may do. */
  const backPacket = useReturnPacket(SEARCH_SURFACE);
  const [searchSeed, setSearchSeed] = useState(0);
  if (backPacket && backPacket.at !== searchSeed) {
    setSearchSeed(backPacket.at);
    const b = backPacket.state as SearchBack;
    setQuery(typeof b.q === "string" ? b.q : "");
    setOnly(KINDS.some((k) => k.k === b.only) ? (b.only as CmdKind) : null);
    setModOnly(typeof b.mod === "string" && b.mod ? b.mod : null);
    setCursor(0);
    setLimit(BROWSE_CAP);
  }
  // Spend the packet. A write to an external store and nothing else.
  useEffect(() => { if (backPacket) consumeReturn(SEARCH_SURFACE); }, [backPacket]);
  // Keyed on the packet's own timestamp, which changes exactly once per return.
  // `changeMode` is deliberately NOT a dependency: its identity tracks the rail
  // mode, so re-running on it would re-open a surface the reader just closed.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (searchSeed) changeMode("search"); }, [searchSeed]);

  /** Keep the active row inside the box that scrolls it. Measured with rects
   *  against that box (gate 6, blocker 3): offsetTop was relative to the row's
   *  section, so the list never scrolled and 13 of 21 rows left the view.
   *  Never scrollIntoView: that walks every scrollable ancestor and would move
   *  the page itself. */
  useLayoutEffect(() => {
    const box = listRef.current;
    if (!box || !searching) return;
    const row = document.getElementById(`nxc-o-${cursor}`);
    if (!row) return;
    const scroller = scrollerOf(row, box);
    const br = scroller.getBoundingClientRect();
    const rr = row.getBoundingClientRect();
    // Headroom for what stays pinned at the top of that box: the section's
    // sticky heading in the results box, the field in a scrolling sheet.
    const pinned = scroller === box
      ? row.closest(".nxc-sec")?.querySelector<HTMLElement>(".nxc-sec-h")
      : scroller.querySelector<HTMLElement>(".nxc-mfield");
    const headroom = (pinned?.offsetHeight ?? 0) + 6;
    const top = rr.top - br.top + scroller.scrollTop - headroom;
    const bottom = rr.bottom - br.top + scroller.scrollTop + 8;
    if (top < scroller.scrollTop) scroller.scrollTop = Math.max(0, top);
    else if (bottom > scroller.scrollTop + scroller.clientHeight) scroller.scrollTop = bottom - scroller.clientHeight;
  }, [cursor, searching, result]);

  /** One handler for both fields — the rail's and the sheet's. */
  const onFieldKey = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const n = result.items.length;
    if (e.key === "Escape") { e.preventDefault(); closeSearch(); return; }
    if (e.key === "Enter") {
      const it = result.items[cursor];
      if (it) { e.preventDefault(); activate(it); }
      return;
    }
    if (!n) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => (c + 1) % n); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setCursor((c) => (c - 1 + n) % n); }
    else if (e.key === "Home") { e.preventDefault(); setCursor(0); }
    else if (e.key === "End") { e.preventDefault(); setCursor(n - 1); }
  }, [result.items, cursor, closeSearch, activate]);

  /* -------------------------------------------------------- keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      // `code` as well as `key`: on a Hebrew layout the K key sends "ל", and
      // the shortcut must still open the surface (gate 6, minor 17).
      if (meta && (e.key.toLowerCase() === "k" || e.code === "KeyK")) {
        e.preventDefault();
        if (mode === "search") closeSearch();
        else changeMode("search");
        return;
      }
      if (meta && (e.key.toLowerCase() === "b" || e.code === "KeyB")) {
        e.preventDefault();
        changeMode(mode === "compact" ? "expanded" : "compact");
        return;
      }
      // The field already handled its own Escape.
      if (e.key === "Escape" && !e.defaultPrevented) {
        if (mode === "search") closeSearch();
        else if (mode === "context") changeMode("expanded");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [changeMode, closeSearch, mode]);

  const onRailKeyDown = (e: React.KeyboardEvent) => {
    const scroll = scrollRef.current;
    if (!scroll) return;
    const list = [...scroll.querySelectorAll<HTMLElement>(".nx-navitem")].filter((b) => b.offsetParent);
    if (!list.length) return;
    const cur = list.indexOf((document.activeElement as HTMLElement)?.closest(".nx-navitem") as HTMLElement);
    let i = cur;
    if (e.key === "ArrowDown") i = cur < 0 ? 0 : Math.min(list.length - 1, cur + 1);
    else if (e.key === "ArrowUp") i = cur < 0 ? list.length - 1 : Math.max(0, cur - 1);
    else if (e.key === "Home") i = 0;
    else if (e.key === "End") i = list.length - 1;
    else if (e.key === "Escape") { hidePreview(); return; }
    else return;
    e.preventDefault();
    list[i].focus();
    showPreview(list[i], true); // keyboard gets the layer immediately, no delay
  };

  /* ----------------------------------------------------------- render */
  const preview = pvId ? data.previews[pvId] : null;
  const lastForPreview = useMemo(() => {
    if (!preview || preview.kind !== "module") return null;
    const name = recent.find((n) => data.objects[n]?.mods.includes(preview.mod));
    return name ? { name, when: seen[name] ? relTime(seen[name]) : "" } : null;
  }, [preview, recent, data.objects, seen]);

  const ctx = data.contexts[ctxName] || null;
  const crumbGroup = active ? data.groups.find((g) => g.items.some((i) => i.id === active.id)) : null;
  // Below the item's own page the catalogue is a link and, for a record, the
  // record is the current crumb: its own title from the index, or the path
  // segment where that segment IS the identifier. A family with no rail item
  // at all takes its parent from the same table the return link reads.
  const below = active ? here !== normalisePath(active.href) : false;
  const crumbParent = active ? null : parentOf(here);
  const inFamily = (list: string[]) => list.some((f) => here.startsWith(f) && here !== f);
  const crumbRecord = inFamily(ID_FAMILIES) || inFamily(SLUG_FAMILIES)
    ? recordAt.get(here)?.title
      ?? (inFamily(ID_FAMILIES) ? decodeURIComponent(here.replace(/\/+$/, "").split("/").pop() || "") : null)
    : null;
  /* The phone bar has no breadcrumb, so it names the section the page lives
     in: the rail item or its parent, a legal document by its own name, and the
     product on the home page (gate 5, #10). */
  const mTitle = active?.label || LEGAL[here]
    || (crumbParent && crumbParent.href !== "/neo/" ? crumbParent.label : "Project NEO");

  const expanded = searching && live && result.items.length > 0;
  const activeItem = expanded ? result.items[cursor] || null : null;
  const railHidden = searching && sheet;

  const surface = searching ? (
    <CommandSurface
      sheet={sheet}
      txPending={!tx && !txFailed}
      txFailed={!tx && txFailed}
      query={query}
      onQuery={applyQuery}
      onKey={onFieldKey}
      result={result}
      only={only}
      onOnly={applyOnly}
      modOnly={modOnly}
      onModOnly={applyMod}
      surfaceMod={surfaceMod}
      active={cursor}
      onActive={setCursor}
      onItem={activate}
      onClose={closeSearch}
      contexts={data.contexts}
      extra={cmd}
      idle={idle}
      emptyAction={emptyAction}
      onEmptyAction={runEmptyAction}
      listRef={listRef}
      mobileInputRef={mInputRef}
    />
  ) : null;

  return (
    <div
      ref={appRef}
      className={fontClass ? `nx-app ${fontClass}` : "nx-app"}
      data-neo-shell=""
      data-nav={mode}
      data-searching={searching ? "1" : "0"}
      data-sheet={railHidden ? "1" : undefined}
      data-typed={q ? "1" : "0"}
      /* The surface is answering — typed, or browsing a family. The rail and the
         canvas respond to THIS, not to the field merely being open. */
      data-live={searching && live ? "1" : "0"}
      style={searching && searchMod ? ({ "--sm": modVar(searchMod) } as React.CSSProperties) : undefined}
    >
      <a href="#main" className="nx-skip" inert={railHidden || undefined}>מעבר לתוכן הראשי</a>

      {/* ------------------------------------------------------- the rail */}
      <aside
        ref={railRef}
        className="nx-rail"
        data-shell="desktop-only"
        data-knowledge-sidebar=""
        aria-label="ניווט ראשי"
        inert={railHidden || undefined}
      >
        <span className="nx-rail-bg" ref={bgRef} aria-hidden="true" />
        <span className="nx-rail-edge" ref={edgeRef} aria-hidden="true" />

        <div className="nx-rail-head" ref={headRef}>
          <Link prefetch={false} href="/neo/" className="nx-glyph" aria-label="Project NEO: מעבר למסך הבית">
            <i /><i /><i />
          </Link>
          <span className="nx-lock">
            <b>SAP by Sali</b>
            <span>Project NEO</span>
          </span>
          {/* One icon per action (gate 5, #17): this one only narrows the rail. */}
          <button
            type="button"
            className="nx-iconbtn nx-collapse"
            aria-label={mode === "compact" ? "הרחבת הניווט" : "כיווץ הניווט"}
            aria-pressed={mode === "compact"}
            onClick={() => changeMode(mode === "compact" ? "expanded" : "compact")}
          >
            {mode === "compact"
              ? <PanelRightOpen size={16} strokeWidth={1.75} aria-hidden="true" />
              : <PanelRightClose size={16} strokeWidth={1.75} aria-hidden="true" />}
          </button>
        </div>

        {/* Search grows out of the same slot the quick action lives in, and it
            filters the very list underneath it before it ever escalates. */}
        <div className="nx-rail-cmd" ref={cmdRef}>
          <button
            type="button"
            className="nx-railq"
            aria-keyshortcuts="Control+K Meta+K"
            onClick={() => changeMode("search")}
          >
            <span className="nx-railq-i"><Ico name="Search" size={15} /></span>
            <span className="nx-railq-l">חיפוש בניווט ובתיעוד</span>
            <kbd><CmdKey /></kbd>
          </button>
          <div className="nx-railsrch" aria-hidden={!searching || sheet}>
            <div className="nx-srch-f">
              <span className="nx-ico"><Ico name="Search" size={14} /></span>
              <input
                ref={inputRef}
                type="search"
                className="nx-srch-input"
                value={query}
                onChange={(e) => applyQuery(e.target.value)}
                onKeyDown={onFieldKey}
                placeholder="קוד טבלה או טרנזקציה, שם שדה, או מושג בעברית"
                aria-label="חיפוש בניווט ובתיעוד"
                role="combobox"
                aria-expanded={!sheet && expanded}
                aria-controls={!sheet && expanded ? "nxc-list" : undefined}
                aria-autocomplete="list"
                aria-activedescendant={!sheet && activeItem ? `nxc-o-${cursor}` : undefined}
                tabIndex={searching && !sheet ? 0 : -1}
              />
              <button
                type="button"
                className="nx-iconbtn nx-iconbtn--xs"
                aria-label="סגירת החיפוש"
                tabIndex={searching && !sheet ? 0 : -1}
                onClick={closeSearch}
              >
                <Ico name="X" size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* The command surface, right after the field that drives it, so Tab
            goes from the field into it (gate 6, blocker 4). */}
        {sheet ? null : surface}

        <div
          ref={scrollRef}
          className="nx-rail-scroll"
          tabIndex={0}
          onScroll={onScroll}
          onKeyDown={onRailKeyDown}
          onPointerOver={(e) => {
            const el = (e.target as HTMLElement).closest<HTMLElement>(".nx-navitem");
            if (el) showPreview(el);
          }}
          onPointerOut={(e) => {
            const from = (e.target as HTMLElement).closest(".nx-navitem");
            const to = (e.relatedTarget as HTMLElement | null)?.closest?.(".nx-navitem");
            if (from && !to) hidePreview();
          }}
        >
          <span className="nx-ind" ref={indRef} data-off="1" aria-hidden="true" />
          {data.groups.map((g) => {
            const shown = g.items.filter((i) => !navFilter || navFilter.has(i.id));
            const isOpen = open[g.id] !== false;
            // A group answers too: it is marked when any destination inside it
            // is named by the query or lives in a module the results are in.
            const gHit = g.items.some(
              (i) => (!!visible && visible.has(i.id)) || (!!i.mod && hitMods.has(i.mod)),
            );
            const gMod = g.items.find((i) => !!i.mod && hitMods.has(i.mod))?.mod;
            return (
              <section
                key={g.id}
                className="nx-group"
                data-open={isOpen}
                data-hit={searching && live && gHit ? "1" : "0"}
                data-dim={searching && live && !gHit ? "1" : "0"}
                style={gMod ? ({ "--gm": modVar(gMod) } as React.CSSProperties) : undefined}
                hidden={shown.length === 0}
              >
                <h3 className="nx-group-h">
                  <button
                    type="button"
                    className="nx-group-btn"
                    data-group={g.id}
                    aria-expanded={isOpen}
                    aria-controls={`nx-grp-${g.id}`}
                    aria-label={`${isOpen ? "כיווץ" : "הרחבת"} הקבוצה ${g.label}`}
                    onClick={() => toggleGroup(g.id)}
                  >
                    <span className="nx-chev"><Ico name="ChevronDown" size={12} /></span>
                    <span className="nx-t">{g.label}</span>
                    <span className="nx-n">{shown.length}</span>
                  </button>
                </h3>
                <div className="nx-group-body" id={`nx-grp-${g.id}`}>
                  <ul>
                    {g.items.map((it) => {
                      // A destination is "hit" when the query names it, or when
                      // the results really live in its module.
                      const hit = (!!visible && visible.has(it.id)) || (!!it.mod && hitMods.has(it.mod));
                      return (
                        <li key={it.id} className="nx-navrow" hidden={!!navFilter && !navFilter.has(it.id)}>
                          <Link
                            prefetch={false}
                            href={it.href}
                            className="nx-navitem"
                            data-nav={it.id}
                            data-mod={it.mod}
                            data-hit={hit ? "1" : "0"}
                            data-dim={searching && live && !hit ? "1" : "0"}
                            style={it.mod ? ({ "--m": modVar(it.mod) } as React.CSSProperties) : undefined}
                            aria-current={active?.id === it.id ? (below ? "true" : "page") : undefined}
                            title={mode === "compact" ? it.label : undefined}
                            onFocus={(e) => showPreview(e.currentTarget, true)}
                            onBlur={hidePreview}
                          >
                            <span className="nx-navitem-i"><Ico name={it.icon} size={16} /></span>
                            <span className="nx-navitem-l">{it.label}</span>
                            {it.count === null ? (
                              <span className="nx-navitem-n nx-navitem-n--none" title="אין מספר בנתוני הפרויקט">—</span>
                            ) : (
                              <span className="nx-navitem-n">{nf.format(it.count)}</span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </section>
            );
          })}
        </div>

        <div className="nx-shelf" ref={shelfRef} data-shelf={shelf} data-empty={shelfEmpty ? "1" : undefined}>
          {shelfEmpty ? (
            <button type="button" className="nx-shelf-empty" onClick={() => setShelfOpen(true)}>
              עדיין לא נפתחו אובייקטים
              <span className="nx-shelf-empty-a">הצגת האחרונים והמוצמדים</span>
            </button>
          ) : null}
          <ShelfTabs tab={shelf} onTab={setShelf} tabsRef={shelfTabsRef} indRef={shelfIndRef} />
          {/* All three panes stay mounted and are toggled with `hidden`, exactly
              as the prototype did: going from display:none back to displayed is
              what restarts the single cross-fade keyframe, and it keeps each
              tab's aria-controls pointing at a real element. */}
          <div className="nx-shelf-panes">
            <div className="nx-shelf-pane" id="nx-shelfpane-recent" role="tabpanel" aria-label="אחרונים" hidden={shelf !== "recent"}>
              <RecentPane names={recent} objects={data.objects} seen={seen} onOpen={openObject} />
            </div>
            <div className="nx-shelf-pane" id="nx-shelfpane-pinned" role="tabpanel" aria-label="מוצמדים" hidden={shelf !== "pinned"}>
              <PinnedPane objects={data.objects} onOpen={openObject} />
            </div>
            <div className="nx-shelf-pane" id="nx-shelfpane-context" role="tabpanel" aria-label="הקשר" hidden={shelf !== "context"}>
              <ContextPane ctx={ctx} onOpen={openObject} />
            </div>
          </div>
        </div>

        {/* The credit is the page footer's (SiteFooter), on every page and device.
            An initials avatar here read as a signed-in profile on a site with
            no accounts, so the foot keeps only the context-mode control. */}
        <div className="nx-rail-foot" ref={footRef}>
          <button
            type="button"
            className="nx-iconbtn"
            aria-label={mode === "context" ? "חזרה לעץ הניווט" : "מעבר למצב הקשר"}
            aria-pressed={mode === "context"}
            onClick={() => changeMode(mode === "context" ? "expanded" : "context")}
          >
            <Ico name="Layers" size={16} />
          </button>
        </div>
      </aside>

      {/* Peek: a 14px hit strip. Hovering springs the rail in over the canvas
          without it taking a layout column; clicking commits to expanded. On a
          phone or a tablet there is no rail to reveal, and the stylesheet does
          not draw it there (gate 4, major 9). */}
      <button
        type="button"
        className="nx-railedge"
        aria-label="הצגת הניווט"
        tabIndex={mode === "peek" ? 0 : -1}
        inert={railHidden || undefined}
        onClick={() => changeMode("expanded")}
      >
        <i aria-hidden="true" />
      </button>

      {/* -------------------------------------------------------- the main */}
      <div className="nx-main" ref={mainRef} inert={searching || undefined}>
        <header className="nx-topbar" data-shell="desktop-only">
          <button
            type="button"
            className="nx-iconbtn"
            aria-label="הצגה או הסתרה של הניווט"
            aria-expanded={!(mode === "hidden" || mode === "peek")}
            onClick={() => changeMode(mode === "hidden" || mode === "peek" ? "expanded" : "hidden")}
          >
            <Menu size={16} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <nav className="nx-crumbs" aria-label="נתיב">
            <Link prefetch={false} href="/neo/">מסך הבית</Link>
            {crumbGroup ? (
              <>
                <Ico name="ChevronLeft" size={12} />
                <span>{crumbGroup.label}</span>
              </>
            ) : null}
            {active ? (
              <>
                <Ico name="ChevronLeft" size={12} />
                {below
                  ? <Link prefetch={false} href={active.href}>{active.label}</Link>
                  : <span className="nx-cur" aria-current="page">{active.label}</span>}
              </>
            ) : crumbParent && crumbParent.href !== "/neo/" ? (
              <>
                <Ico name="ChevronLeft" size={12} />
                <Link prefetch={false} href={crumbParent.href}>{crumbParent.label}</Link>
              </>
            ) : null}
            {crumbRecord ? (
              <>
                <Ico name="ChevronLeft" size={12} />
                <bdi className="nx-cur nx-sap" aria-current="page">{crumbRecord}</bdi>
              </>
            ) : null}
          </nav>
          <button
            type="button"
            className="nx-cmdbar"
            aria-keyshortcuts="Control+K Meta+K"
            onClick={() => changeMode("search")}
          >
            <Ico name="Search" size={15} />
            <span className="nx-ph">חיפוש בניווט ובתיעוד</span>
            <kbd><CmdKey /></kbd>
          </button>
          <div className="nx-topbar-tools">
            {/* Display settings and page help (components/neo-shell/dock). */}
            <span className="nx-dock-slot"><DockButtons /></span>
            <button
              type="button"
              className="nx-iconbtn"
              aria-label="מעבר למצב הצצה: הניווט נפתח בריחוף בלבד"
              aria-pressed={mode === "peek"}
              onClick={() => changeMode(mode === "peek" ? "expanded" : "peek")}
            >
              <PanelRightDashed size={16} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        </header>

        <header className="nx-mtop" data-shell="mobile-only">
          <div className="nx-mtop-in">
            <span className="nx-glyph" aria-hidden="true"><i /><i /><i /></span>
            <b>{mTitle}</b>
          </div>
          <span className="nx-dock-slot"><DockButtons /></span>
        </header>

        <main id="main" className="nx-canvas">
          {children}
          <SiteFooter />
        </main>

        <MobileTabs
          navOpen={sheetNav}
          searchOpen={searching}
          onNav={() => setSheetNav((s) => !s)}
          onSearch={() => { setSheetNav(false); changeMode("search"); }}
        />
      </div>

      {/* On a phone, a tablet and a narrow window the surface is a full-screen
          dialog over everything, so it is not inside anything it makes inert. */}
      {sheet ? surface : null}

      {/* preview host — a single node that stays mounted and only toggles on */}
      <div className="nx-pvhost" ref={pvRef} data-on={pvId ? "1" : "0"} aria-hidden="true">
        {preview ? <PreviewPanel preview={preview} last={lastForPreview} /> : null}
      </div>

      {sheetNav ? <MobileSheet groups={data.groups} activeId={active?.id ?? null} onClose={() => setSheetNav(false)} /> : null}
    </div>
  );
}

