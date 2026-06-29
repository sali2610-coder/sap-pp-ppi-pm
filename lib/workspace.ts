"use client";

import { useSyncExternalStore } from "react";

// Unified Workspace — a single global "active context" (the entity currently in
// focus) that any surface can set, and the persistent Inspector reads. Lets the
// platform behave like one IDE: select an object anywhere → it becomes active
// everywhere, no navigation. SSR-safe, event-driven.

const listeners = new Set<() => void>();
let active: string | null = null;
const emit = () => listeners.forEach((l) => l());

function subscribe(cb: () => void) { listeners.add(cb); return () => listeners.delete(cb); }

// Set the active context (updates the Inspector content live; does NOT force it
// open — surfaces can update context quietly while the panel is closed).
export function setActiveEntity(name: string | null) {
  const v = (name || "").trim() || null;
  if (v === active) return;
  active = v;
  emit();
}
// Set context AND open the Inspector (explicit "send to inspector" action).
export function inspectEntity(name: string) {
  setActiveEntity(name);
  if (typeof window !== "undefined" && name) window.dispatchEvent(new CustomEvent("neo:inspect", { detail: name }));
}
export const useActiveEntity = (): string | null => useSyncExternalStore(subscribe, () => active, () => null);

// Inspector open/closed — persisted so the workspace layout stays stable.
const OPEN_KEY = "neo:inspector:open";
const openListeners = new Set<() => void>();
const emitOpen = () => openListeners.forEach((l) => l());
function subOpen(cb: () => void) { openListeners.add(cb); window.addEventListener("storage", cb); return () => { openListeners.delete(cb); window.removeEventListener("storage", cb); }; }
let openCache: { raw: string; v: boolean } | null = null;
function snapOpen(): boolean {
  let raw = "0"; try { raw = localStorage.getItem(OPEN_KEY) || "0"; } catch { return false; }
  if (openCache && openCache.raw === raw) return openCache.v;
  openCache = { raw, v: raw === "1" }; return openCache.v;
}
export function setInspectorOpen(v: boolean) { try { localStorage.setItem(OPEN_KEY, v ? "1" : "0"); } catch { /* noop */ } openCache = { raw: v ? "1" : "0", v }; emitOpen(); }
export const useInspectorOpen = (): boolean => useSyncExternalStore(subOpen, snapOpen, () => false);

// Derive the active entity name from a route when nothing is explicitly set, so
// every entity page (/object, /tcode, /cds, /bapi, /idoc, /transactions/<code>)
// auto-populates the Inspector — the unified-workspace sync across all centers.
export function entityFromPath(path: string): string | null {
  const m = path.match(/^\/(object|tcode|cds|bapi|idoc|transactions)\/([^/]+)/);
  return m ? decodeURIComponent(m[2]) : null;
}
