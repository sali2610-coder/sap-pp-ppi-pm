"use client";

// Client state for the rail's shelf and its persisted layout.
//
// The recents and pins are NOT a new invention: they are the keys the product
// already writes. `neo:obj:recent` is the same list components/object-workspace
// pushes to (last 8 SAP object names) and `neo:obj:fav` is the same list
// lib/prefs owns — so a table opened on a legacy /object page shows up in the
// NEO shelf, and a pin made here shows up on the legacy pages. Nothing forks
// the user's memory into a second store.
//
// The genuinely new keys are namespaced away from the existing ones so a
// design-phase surface can never corrupt the shipping sidebar's layout:
//   neo:nx:mode  — rail mode          (legacy rail: neo:sidebar:collapsed)
//   neo:nx:open  — per-group open map (legacy rail: neo:nav:open)
//   neo:nx:seen  — when /neo opened an object
//
// Everything is exposed through useSyncExternalStore with an explicit server
// snapshot. That is what lets a stored layout be restored WITHOUT a hydration
// mismatch and without a setState-in-effect: the first client render uses the
// server snapshot, then React re-renders from the real one.

import { useSyncExternalStore } from "react";
import type { RailMode } from "./types";

const RECENT_KEY = "neo:obj:recent";
const SEEN_KEY = "neo:nx:seen";
export const MODE_KEY = "neo:nx:mode";
export const OPEN_KEY = "neo:nx:open";

/* --------------------------------------------------------- raw storage */

function readRecentRaw(): string[] {
  try {
    const r = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
    return Array.isArray(r) ? r.filter((x): x is string => typeof x === "string") : [];
  } catch { return []; }
}

function readSeenRaw(): Record<string, number> {
  try { return JSON.parse(localStorage.getItem(SEEN_KEY) || "{}") || {}; } catch { return {}; }
}

const MODES: RailMode[] = ["expanded", "compact", "hidden", "peek", "search", "context"];

function readModeRaw(): RailMode | null {
  try {
    const v = localStorage.getItem(MODE_KEY) as RailMode | null;
    // `search` and `context` are momentary, not a saved layout — restoring into
    // one would drop a returning user straight into a filtered or tree-less rail.
    return v && MODES.includes(v) && v !== "search" && v !== "context" ? v : null;
  } catch { return null; }
}

function readOpenRaw(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(OPEN_KEY) || "{}") || {}; } catch { return {}; }
}

/* ------------------------------------------------------------- recents */

export interface RecentState { names: string[]; seen: Record<string, number> }

const RECENT_SERVER: RecentState = { names: [], seen: {} };
let recentCache: RecentState = RECENT_SERVER;
let recentLoaded = false;
const recentSubs = new Set<() => void>();

function emitRecent() { recentSubs.forEach((f) => f()); }

function ensureRecent() {
  if (recentLoaded || typeof window === "undefined") return;
  recentLoaded = true;
  recentCache = { names: readRecentRaw(), seen: readSeenRaw() };
  const refresh = () => { recentCache = { names: readRecentRaw(), seen: readSeenRaw() }; emitRecent(); };
  window.addEventListener("storage", (e) => { if (e.key === RECENT_KEY || e.key === SEEN_KEY) refresh(); });
  window.addEventListener("neo:recent", refresh);
}

export function useRecent(): RecentState {
  return useSyncExternalStore(
    (cb) => { ensureRecent(); recentSubs.add(cb); return () => recentSubs.delete(cb); },
    () => { ensureRecent(); return recentCache; },
    () => RECENT_SERVER,
  );
}

/** Same key and cap (8) as components/object-workspace.tsx, so the two remain
 *  one list rather than two competing ones. */
export function pushRecentObject(name: string) {
  if (typeof window === "undefined" || !name) return;
  ensureRecent();
  const names = [name, ...recentCache.names.filter((x) => x !== name)].slice(0, 8);
  // The legacy list stores names only, so a "when" column would have nothing
  // real behind it. This side-map records the moment /neo opened an object;
  // rows without an entry render no time at all rather than a plausible one.
  const seen: Record<string, number> = { ...recentCache.seen, [name]: Date.now() };
  for (const k of Object.keys(seen)) if (!names.includes(k)) delete seen[k];
  recentCache = { names, seen };
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(names));
    localStorage.setItem(SEEN_KEY, JSON.stringify(seen));
  } catch { /* storage can be disabled — the shelf simply keeps the in-memory list */ }
  emitRecent();
}

/* ------------------------------------------------- persisted rail layout */

export interface LayoutState { mode: RailMode | null; open: Record<string, boolean> }

const LAYOUT_SERVER: LayoutState = { mode: null, open: {} };
let layoutCache: LayoutState = LAYOUT_SERVER;
let layoutLoaded = false;
const layoutSubs = new Set<() => void>();

function ensureLayout() {
  if (layoutLoaded || typeof window === "undefined") return;
  layoutLoaded = true;
  layoutCache = { mode: readModeRaw(), open: readOpenRaw() };
}

export function useLayout(): LayoutState {
  return useSyncExternalStore(
    (cb) => { ensureLayout(); layoutSubs.add(cb); return () => layoutSubs.delete(cb); },
    () => { ensureLayout(); return layoutCache; },
    () => LAYOUT_SERVER,
  );
}

/** In-memory cache is the live source of truth; localStorage holds the subset
 *  that is worth restoring. Notifies synchronously, so a caller can wrap it in
 *  flushSync and measure the committed layout on the next line — which is what
 *  the FLIP depends on. */
export function setLayout(patch: Partial<LayoutState>) {
  ensureLayout();
  layoutCache = { ...layoutCache, ...patch };
  try {
    if (patch.mode && patch.mode !== "search" && patch.mode !== "context") localStorage.setItem(MODE_KEY, patch.mode);
    if (patch.open) localStorage.setItem(OPEN_KEY, JSON.stringify(patch.open));
  } catch { /* noop */ }
  layoutSubs.forEach((f) => f());
}

/* -------------------------------------------------------------- helpers */

/** Relative time in Hebrew. Only ever called with a real stored timestamp — a
 *  row with no timestamp renders no time at all rather than a plausible one. */
export function relTime(ts: number): string {
  const s = Math.max(0, Math.round((Date.now() - ts) / 1000));
  if (s < 60) return "עכשיו";
  const m = Math.round(s / 60);
  if (m < 60) return `לפני ${m} דק׳`;
  const h = Math.round(m / 60);
  if (h < 24) return `לפני ${h} שע׳`;
  return `לפני ${Math.round(h / 24)} ימים`;
}
