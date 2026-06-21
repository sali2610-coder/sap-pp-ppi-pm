"use client";

// User preferences & memory — favorites + graph state. SSR-safe via
// useSyncExternalStore so server and first client render agree (empty), then
// hydrate from localStorage. No external deps.

import { useSyncExternalStore } from "react";

const FAV_KEY = "neo:obj:fav";

// ---- favorites (pinned objects) -------------------------------------------
let favCache: string[] = [];
let favLoaded = false;
const favSubs = new Set<() => void>();

function readFav(): string[] {
  try {
    const r = JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
    return Array.isArray(r) ? r.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}
function emitFav() { favSubs.forEach((f) => f()); }

function ensureFav() {
  if (favLoaded || typeof window === "undefined") return;
  favCache = readFav();
  favLoaded = true;
  window.addEventListener("storage", (e) => {
    if (e.key === FAV_KEY) { favCache = readFav(); emitFav(); }
  });
}

export function isFavorite(name: string): boolean {
  ensureFav();
  return favCache.includes(name);
}

export function toggleFavorite(name: string) {
  ensureFav();
  favCache = favCache.includes(name) ? favCache.filter((x) => x !== name) : [name, ...favCache].slice(0, 50);
  try { localStorage.setItem(FAV_KEY, JSON.stringify(favCache)); } catch { /* noop */ }
  emitFav();
}

const EMPTY_FAV: string[] = []; // stable ref for SSR snapshot (avoids infinite-loop warning)
export function useFavorites(): string[] {
  return useSyncExternalStore(
    (cb) => { ensureFav(); favSubs.add(cb); return () => favSubs.delete(cb); },
    () => { ensureFav(); return favCache; },
    () => EMPTY_FAV,
  );
}

export function useIsFavorite(name: string): boolean {
  return useFavorites().includes(name);
}

export function getRecentObjects(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const r = JSON.parse(localStorage.getItem("neo:obj:recent") || "[]");
    return Array.isArray(r) ? r : [];
  } catch {
    return [];
  }
}

// ---- graph memory (last module / mode / zoom) ------------------------------
export interface GraphMemory { mod?: string; mode?: string; k?: number; x?: number; y?: number; sel?: string | null }
const GRAPH_KEY = "neo:graph:state";

export function loadGraphMemory(): GraphMemory {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(GRAPH_KEY) || "{}") || {}; } catch { return {}; }
}
export function saveGraphMemory(patch: GraphMemory) {
  if (typeof window === "undefined") return;
  try {
    const cur = loadGraphMemory();
    localStorage.setItem(GRAPH_KEY, JSON.stringify({ ...cur, ...patch }));
  } catch { /* noop */ }
}

// ---- per-module custom node layouts (dragged positions) --------------------
type NodePos = Record<string, { x: number; y: number }>;
const LAYOUT_KEY = "neo:graph:layouts";
function readLayouts(): Record<string, NodePos> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(LAYOUT_KEY) || "{}") || {}; } catch { return {}; }
}
export function loadLayout(mod: string): NodePos {
  return readLayouts()[mod] || {};
}
export function saveLayout(mod: string, pos: NodePos) {
  if (typeof window === "undefined") return;
  try {
    const all = readLayouts();
    if (pos && Object.keys(pos).length) all[mod] = pos; else delete all[mod];
    localStorage.setItem(LAYOUT_KEY, JSON.stringify(all));
  } catch { /* noop */ }
}
