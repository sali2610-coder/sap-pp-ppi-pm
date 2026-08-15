"use client";

/* ============================================================================
   PROJECT NEO · SMART RETURN — the store.
   ----------------------------------------------------------------------------
   ONE sessionStorage key for the whole namespace, per the brief:

       neo:nav:ctx  →  { v: 1, stack: NeoOrigin[], ret: ReturnPacket | null }

   sessionStorage and not localStorage, deliberately. "Where I came from" is
   true for this visit and false for the next one; a stale origin restored a
   week later would send the user somewhere they have no memory of, which is
   worse than no origin at all.

   STATIC-EXPORT SAFE. Nothing here needs a server, a route handler or a query
   parameter — which matters, because `output: 'export'` means a URL with a
   query string still resolves to the same pre-rendered HTML, so state cannot
   ride on the URL without either duplicating routes or lying about them.

   SSR SAFE. Every read goes through useSyncExternalStore with an explicit
   server snapshot (`null` / `EMPTY`), so the first client render matches the
   server HTML and React re-renders from the real value immediately after. No
   setState-in-effect, no hydration mismatch, no flash of a wrong label.
   ========================================================================== */

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import type { NeoOrigin, OriginInput, OriginState, ReturnPacket } from "./types";

const KEY = "neo:nav:ctx";
/** A deep chain (module → object → table → transaction …) is real; an unbounded
 *  one is a memory leak in a tab that never closes. */
const CAP = 12;

interface Ctx { v: 1; stack: NeoOrigin[]; ret: ReturnPacket | null }
const EMPTY: Ctx = { v: 1, stack: [], ret: null };

/* --------------------------------------------------------------- paths */

/** One canonical spelling for a path, so `/neo/transactions` and
 *  `/neo/transactions/` are never treated as two different places. A trailing
 *  `*` is preserved — it is the prefix marker, not a path segment. */
export function normalisePath(p: string): string {
  if (!p) return "/";
  let s = p.split("#")[0].split("?")[0];
  if (!s.startsWith("/")) s = `/${s}`;
  if (s.endsWith("*")) return s;
  if (!s.endsWith("/")) s = `${s}/`;
  return s;
}

const matches = (to: string, path: string): boolean =>
  to.endsWith("*") ? path.startsWith(to.slice(0, -1)) : to === path;

/* ------------------------------------------------------------- the scroller

   The NEO shell scrolls its CANVAS, not the window (`.nx-canvas`, id="main", in
   app/globals.css). A surface that stored `window.scrollY` would store 0 on
   every page and restore nothing, so the one correct way to read and rewind the
   viewport lives here instead of being rediscovered per surface. */

/** The element the NEO shell actually scrolls. Null on the server. */
export function neoScroller(): HTMLElement | null {
  return typeof document === "undefined" ? null : document.getElementById("main");
}

/** Current scroll offset of the NEO canvas, or 0 when there is none. */
export function scrollOffset(): number {
  return neoScroller()?.scrollTop ?? 0;
}

/** Put the canvas back where it was, preferring a RECORD over a pixel: a list
 *  that re-rendered at a different density has moved every offset, but the row
 *  the user opened is still the row the user opened.
 *
 *  Runs on the next frame, because the restored filters have to render before
 *  the element they produce can be found. Returns a cancel function, so a
 *  caller can hand it straight back out of `useEffect`. */
export function restoreScroll(y: number, selector?: string): () => void {
  if (typeof window === "undefined") return () => {};
  const id = requestAnimationFrame(() => {
    const el = selector ? document.querySelector<HTMLElement>(selector) : null;
    if (el) el.scrollIntoView({ block: "center", behavior: "auto" });
    else neoScroller()?.scrollTo({ top: Number(y) || 0, behavior: "auto" });
  });
  return () => cancelAnimationFrame(id);
}

/* ------------------------------------------------------------- storage */

let cache: Ctx = EMPTY;
let loaded = false;
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());

function read(): Ctx {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const p = JSON.parse(raw) as Partial<Ctx>;
    if (!p || p.v !== 1 || !Array.isArray(p.stack)) return EMPTY;
    // Defensive: a hand-edited or half-written record must degrade to "no
    // origin" (which renders the fallback) rather than to a broken control.
    const stack = p.stack.filter(
      (o): o is NeoOrigin =>
        !!o && typeof o.to === "string" && typeof o.href === "string" &&
        typeof o.label === "string" && !!o.label.trim() && typeof o.at === "number",
    );
    const ret = p.ret && typeof p.ret.surface === "string" && p.ret.state ? p.ret : null;
    return { v: 1, stack, ret };
  } catch { return EMPTY; }
}

function ensure() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  cache = read();
  // Another NEO tab in the same session does not share sessionStorage, so there
  // is nothing to listen for beyond our own writes.
}

function commit(next: Ctx) {
  cache = next;
  try { sessionStorage.setItem(KEY, JSON.stringify(next)); } catch { /* storage can be off — the in-memory stack still works for this page */ }
  emit();
}

const subscribe = (cb: () => void) => { ensure(); subs.add(cb); return () => { subs.delete(cb); }; };
const snapshot = () => { ensure(); return cache; };
const serverSnapshot = () => EMPTY;

/* --------------------------------------------------------------- write */

/** Record where the user is coming FROM, at the moment they leave.
 *
 *  Call it on the click that navigates, not on mount of the destination: only
 *  the origin surface knows its own live state (query, filter, zoom, viewport),
 *  and only it knows what to call itself in Hebrew. */
export function rememberOrigin(o: OriginInput): void {
  if (typeof window === "undefined") return;
  const label = (o.label || "").trim();
  if (!label || !o.href || !o.to) return;   // never store a nameless origin
  ensure();
  const to = normalisePath(o.to);
  const href = normalisePath(o.href);
  // A page is not its own origin. Without this, a surface that links sideways
  // to a sibling of itself ("/neo/tables/EQUI/" → "/neo/tables/AUFK/") would
  // arm a return that lands on the page you are already leaving.
  if (!to.endsWith("*") && to === href) return;
  const entry: NeoOrigin = {
    ...o,
    to,
    href,
    label,
    // The control truncates with an ellipsis at any width; storing an essay
    // would still be an essay in the accessible name. A returning label that
    // needs more than this is not a label.
    detail: (o.detail || "").trim().slice(0, 120) || undefined,
    at: Date.now(),
  };
  // One origin per destination: re-entering the same page from a new place
  // replaces the old memory rather than stacking a second one behind it.
  const stack = [entry, ...cache.stack.filter((e) => e.to !== to)].slice(0, CAP);
  commit({ ...cache, stack });
}

/** Drop the origin for a path — used by the return control itself, so pressing
 *  back twice does not bounce between two pages forever. */
export function forgetOrigin(path: string): void {
  if (typeof window === "undefined") return;
  ensure();
  const p = normalisePath(path);
  commit({ ...cache, stack: cache.stack.filter((e) => !matches(e.to, p)) });
}

/** Everything this session remembered. Exposed for a reset control. */
export function clearOrigins(): void {
  if (typeof window === "undefined") return;
  ensure();
  commit({ ...EMPTY });
}

/* ---------------------------------------------------------------- read */

/** The newest origin recorded for `path`, or null. Non-hook, for event handlers. */
export function readOrigin(path: string): NeoOrigin | null {
  if (typeof window === "undefined") return null;
  ensure();
  const p = normalisePath(path);
  let best: NeoOrigin | null = null;
  for (const e of cache.stack) {
    if (!matches(e.to, p)) continue;
    // An exact `to` always beats a prefix `to*`: the surface that named this
    // one page knew more than the surface that named the whole family.
    if (!best) { best = e; continue; }
    const bestExact = !best.to.endsWith("*");
    const eExact = !e.to.endsWith("*");
    if (eExact && !bestExact) best = e;
  }
  return best;
}

/** The origin for the page currently on screen. */
export function useOrigin(): NeoOrigin | null {
  const path = usePathname();
  const ctx = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  if (!path || ctx.stack.length === 0) return null;
  const p = normalisePath(path);
  let best: NeoOrigin | null = null;
  for (const e of ctx.stack) {
    if (!matches(e.to, p)) continue;
    if (!best || (!e.to.endsWith("*") && best.to.endsWith("*"))) best = e;
  }
  return best;
}

/* ------------------------------------------------- returning with state */

/** Leave the origin surface's own state where it will find it. Called by the
 *  return control immediately before it navigates. */
export function armReturn(origin: NeoOrigin): void {
  if (typeof window === "undefined") return;
  ensure();
  const ret: ReturnPacket | null =
    origin.surface && origin.state ? { surface: origin.surface, state: origin.state, at: Date.now() } : null;
  commit({ ...cache, ret, stack: cache.stack.filter((e) => e.to !== origin.to) });
}

/** Read-and-clear the packet addressed to `surface`. One shot: a restored view
 *  must not be re-restored when the user then changes a filter by hand. */
export function takeReturnState<T extends OriginState = OriginState>(surface: string): T | null {
  if (typeof window === "undefined") return null;
  ensure();
  const r = cache.ret;
  if (!r || r.surface !== surface) return null;
  commit({ ...cache, ret: null });
  return r.state as T;
}

/** Drop the packet without reading it. Called by a surface that has already
 *  applied the state and does not want it applied a second time. */
export function consumeReturn(surface: string): void {
  if (typeof window === "undefined") return;
  ensure();
  if (!cache.ret || cache.ret.surface !== surface) return;
  commit({ ...cache, ret: null });
}

/** The packet addressed to `surface`, straight from the external store.
 *
 *  Deliberately NOT `useState` + `useEffect`. Seeding React state from storage
 *  inside an effect is a cascading render and, on a prerendered page, a
 *  hydration hazard; useSyncExternalStore is the primitive that exists for
 *  exactly this and gives an explicit server snapshot (`null`) for free. The
 *  reference is stable until the packet is consumed, so it is safe as an effect
 *  dependency. */
export function useReturnPacket(surface: string): ReturnPacket | null {
  return useSyncExternalStore(
    subscribe,
    () => { ensure(); const r = cache.ret; return r && r.surface === surface ? r : null; },
    () => null,
  );
}

/** The state a returning navigation left for this surface, or null on a normal
 *  visit. Consuming it is a write to an external store, which is what an effect
 *  is for — no setState happens here, so no render cascades from it. */
export function useReturnState<T extends OriginState = OriginState>(surface: string): T | null {
  const packet = useReturnPacket(surface);
  useEffect(() => { if (packet) consumeReturn(surface); }, [packet, surface]);
  return packet ? (packet.state as T) : null;
}

/* --------------------------------------------------------------- label */

/** Hebrew is not English: "חזרה ל" attaches to a Hebrew word with no hyphen
 *  ("חזרה לטרנזקציות") and to a Latin or numeric token with one ("חזרה ל-PM ·
 *  פקודות אחזקה"). Getting that wrong is the difference between a product and a
 *  translation.
 *
 *  CONTRACT FOR CALLERS: write `label` WITHOUT a leading definite article. In
 *  Hebrew the ל absorbs the ה — "מסך הבית" becomes "חזרה למסך הבית", never
 *  "חזרה להמסך הבית". Stripping a leading ה here would be worse than useless,
 *  because plenty of real labels begin with a ה that is part of the word
 *  ("הזמנות תחזוקה"), and no function can tell the two apart. The author of the
 *  label can. */
export function returnLabel(origin: NeoOrigin | null, fallbackLabel: string): string {
  const name = (origin ? [origin.label, origin.detail].filter(Boolean).join(" · ") : fallbackLabel).trim();
  const first = name.charAt(0);
  const hebrew = first >= "א" && first <= "ת";
  return hebrew ? `חזרה ל${name}` : `חזרה ל-${name}`;
}
