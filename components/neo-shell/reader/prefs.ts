"use client";

/* ============================================================================
   PROJECT NEO · READER — reading preferences.
   ----------------------------------------------------------------------------
   How a person likes to READ is not reading history, so it does not belong in
   neo:books:v1 and nothing here writes to a store the canonical reader owns. It
   gets its own key and touches nothing else:

     neo:read-ui:v1   { v, size, lead, measure, paper, focus, lens }

   Modelled as an EXTERNAL STORE rather than as state loaded in an effect. The
   route is statically exported, so the server render has no localStorage: the
   server snapshot is the defaults, the client snapshot is what was saved, and
   useSyncExternalStore hands the second one over after hydration without a
   mismatch and without a cascading render. It also means the toolbar and any
   future control read the same value with no prop threading.
   ========================================================================== */

import { useCallback, useSyncExternalStore } from "react";

/** Type scale steps. `md` is the default reading size. */
export type NRSize = "sm" | "md" | "lg" | "xl" | "xxl";
/** Leading. `air` is the accessibility-leaning step. */
export type NRLead = "snug" | "normal" | "air";
/** Content measure, in characters of Hebrew prose. */
export type NRMeasure = "narrow" | "normal" | "wide";

export interface NRPrefs {
  size: NRSize;
  lead: NRLead;
  measure: NRMeasure;
  /** A warm paper tint scoped to the reading sheet. Never a global theme. */
  paper: boolean;
  /** Reduced distraction: chrome recedes, the text stays. */
  focus: boolean;
  /** The reading lens. Persisted so it survives a chapter change. */
  lens: boolean;
}

export const DEFAULTS: NRPrefs = {
  size: "md",
  lead: "normal",
  measure: "normal",
  paper: false,
  focus: false,
  lens: false,
};

const KEY = "neo:read-ui:v1";

const SIZES: NRSize[] = ["sm", "md", "lg", "xl", "xxl"];
const LEADS: NRLead[] = ["snug", "normal", "air"];
const MEASURES: NRMeasure[] = ["narrow", "normal", "wide"];

export const SIZE_HE: Record<NRSize, string> = {
  sm: "קטן",
  md: "רגיל",
  lg: "גדול",
  xl: "גדול מאוד",
  xxl: "מוגדל",
};
export const LEAD_HE: Record<NRLead, string> = { snug: "צפוף", normal: "נוח", air: "מרווח" };
export const MEASURE_HE: Record<NRMeasure, string> = { narrow: "צר", normal: "נוח", wide: "רחב" };

function sane(raw: unknown): NRPrefs {
  const o = (raw && typeof raw === "object" ? raw : {}) as Partial<NRPrefs>;
  return {
    size: SIZES.includes(o.size as NRSize) ? (o.size as NRSize) : DEFAULTS.size,
    lead: LEADS.includes(o.lead as NRLead) ? (o.lead as NRLead) : DEFAULTS.lead,
    measure: MEASURES.includes(o.measure as NRMeasure) ? (o.measure as NRMeasure) : DEFAULTS.measure,
    paper: typeof o.paper === "boolean" ? o.paper : DEFAULTS.paper,
    focus: typeof o.focus === "boolean" ? o.focus : DEFAULTS.focus,
    lens: typeof o.lens === "boolean" ? o.lens : DEFAULTS.lens,
  };
}

/* ------------------------------------------------------------------ store */

let current: NRPrefs | null = null;
const listeners = new Set<() => void>();

/** Cached, so getSnapshot is referentially stable between writes — React calls
 *  it on every render and a fresh object each time would loop forever. */
function snapshot(): NRPrefs {
  if (current) return current;
  let next = DEFAULTS;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) next = sane(JSON.parse(raw));
  } catch {
    /* private mode / disabled storage — the reader keeps its defaults */
  }
  current = next;
  return current;
}

const serverSnapshot = (): NRPrefs => DEFAULTS;

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}

function commit(next: NRPrefs): void {
  current = next;
  try { localStorage.setItem(KEY, JSON.stringify({ v: 1, ...next })); } catch { /* noop */ }
  for (const l of listeners) l();
}

/* ------------------------------------------------------------------- hook */

export function useReaderPrefs(): {
  prefs: NRPrefs;
  set: <K extends keyof NRPrefs>(k: K, v: NRPrefs[K]) => void;
  step: (k: "size" | "lead" | "measure", dir: 1 | -1) => void;
  reset: () => void;
} {
  const prefs = useSyncExternalStore(subscribe, snapshot, serverSnapshot);

  const set = useCallback(<K extends keyof NRPrefs>(k: K, v: NRPrefs[K]) => {
    commit({ ...snapshot(), [k]: v });
  }, []);

  const step = useCallback((k: "size" | "lead" | "measure", dir: 1 | -1) => {
    const p = snapshot();
    const list: string[] = k === "size" ? SIZES : k === "lead" ? LEADS : MEASURES;
    const i = Math.min(list.length - 1, Math.max(0, list.indexOf(p[k]) + dir));
    commit({ ...p, [k]: list[i] } as NRPrefs);
  }, []);

  const reset = useCallback(() => commit({ ...DEFAULTS }), []);

  return { prefs, set, step, reset };
}

/** Whether a step can still move in this direction — drives `disabled`. */
export const canStep = (p: NRPrefs, k: "size" | "lead" | "measure", dir: 1 | -1): boolean => {
  const list: string[] = k === "size" ? SIZES : k === "lead" ? LEADS : MEASURES;
  const i = list.indexOf(p[k]) + dir;
  return i >= 0 && i < list.length;
};
