"use client";

import { useSyncExternalStore } from "react";

// Transaction favorites + recently-viewed (localStorage). SSR-safe via
// useSyncExternalStore with cached snapshots (stable references until the
// underlying string changes — avoids render loops). Separate from object
// favorites (neo:favorites).
const FAV = "neo:tx:favorites";
const RECENT = "neo:tx:recent";

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
function subscribe(cb: () => void) { listeners.add(cb); window.addEventListener("storage", cb); return () => { listeners.delete(cb); window.removeEventListener("storage", cb); }; }

// cached snapshot per key: {raw string, parsed array}
const cache: Record<string, { raw: string; val: string[] }> = {};
const EMPTY: string[] = [];
function snap(key: string): string[] {
  let raw = "[]";
  try { raw = localStorage.getItem(key) || "[]"; } catch { return EMPTY; }
  const c = cache[key];
  if (c && c.raw === raw) return c.val;
  let val: string[] = EMPTY;
  try { const p = JSON.parse(raw); if (Array.isArray(p)) val = p; } catch { /* noop */ }
  cache[key] = { raw, val };
  return val;
}

function write(key: string, v: string[]) { try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* noop */ } cache[key] = { raw: JSON.stringify(v), val: v }; emit(); }
const read = (key: string): string[] => snap(key);

export function pushRecentTx(code: string) {
  const c = (code || "").toUpperCase(); if (!c) return;
  write(RECENT, [c, ...read(RECENT).filter((x) => x !== c)].slice(0, 24));
}
export function toggleTxFavorite(code: string) {
  const c = (code || "").toUpperCase(); if (!c) return;
  const cur = read(FAV);
  write(FAV, cur.includes(c) ? cur.filter((x) => x !== c) : [c, ...cur].slice(0, 60));
}

export const useTxFavorites = (): string[] => useSyncExternalStore(subscribe, () => snap(FAV), () => EMPTY);
export const useRecentTx = (): string[] => useSyncExternalStore(subscribe, () => snap(RECENT), () => EMPTY);
export function useTxFavorite(code: string): boolean { return useTxFavorites().includes((code || "").toUpperCase()); }
