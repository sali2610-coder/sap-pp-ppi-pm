"use client";

// localStorage-backed migration status store. SSR-safe (guards window) so the
// static export prerenders cleanly, then hydrates with the user's saved state.

import { useCallback, useEffect, useSyncExternalStore } from "react";
import type { MigrationStatus } from "@/lib/types";

const KEY = "neo:status";

type StatusMap = Record<string, MigrationStatus>;

function read(): StatusMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as StatusMap) : {};
  } catch {
    return {};
  }
}

// --- minimal external store so every consumer re-renders on change ---
const listeners = new Set<() => void>();
let snapshot: StatusMap = {};
let hydrated = false;

function emit() {
  for (const l of listeners) l();
}

function ensureHydrated() {
  if (hydrated || typeof window === "undefined") return;
  snapshot = read();
  hydrated = true;
}

function subscribe(cb: () => void) {
  ensureHydrated();
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      snapshot = read();
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): StatusMap {
  return snapshot;
}

function getServerSnapshot(): StatusMap {
  return {};
}

function write(next: StatusMap) {
  snapshot = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* quota / private mode — keep in-memory */
    }
  }
  emit();
}

/** Read the whole status map (live). */
export function useStatusMap(): StatusMap {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Read + set the status for one object id, falling back to its seed value. */
export function useObjectStatus(id: string, seed: MigrationStatus) {
  const map = useStatusMap();
  const status = map[id] ?? seed;
  const setStatus = useCallback(
    (s: MigrationStatus) => write({ ...snapshot, [id]: s }),
    [id],
  );
  return [status, setStatus] as const;
}

/** Replace the entire map (used by JSON import). */
export function setStatusMap(next: StatusMap) {
  write(next);
}

/** Current map snapshot for export (non-reactive). */
export function exportStatusMap(): StatusMap {
  ensureHydrated();
  return { ...snapshot };
}

/** Make sure the in-memory snapshot reflects localStorage after mount. */
export function useHydrateStatus() {
  useEffect(() => {
    const fresh = read();
    snapshot = fresh;
    hydrated = true;
    emit();
  }, []);
}
