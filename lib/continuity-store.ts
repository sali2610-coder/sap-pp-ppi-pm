"use client";

/**
 * Project NEO — reading continuity + preferences (100% offline, localStorage).
 * Phase 13 Foundation. Versioned so a data update never resumes into the void.
 */

export interface Continuity {
  bookId: string;
  title: string;
  module: string;
  href: string;       // reader route
  chapter?: number;   // last chapter number
  sectionId?: string; // last visible section anchor
  scrollRatio?: number; // 0..1 within the document (soft refinement only)
  updatedAt: number;
}

const KEY = "neo:continuity:v1";

export function readContinuity(): Continuity | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Continuity;
    return c && c.bookId && c.href ? c : null;
  } catch {
    return null;
  }
}

/** Clear the global "continue reading" pointer if it points at this book
 *  (used by per-book "reset reading progress"). */
export function clearContinuityFor(bookId: string) {
  if (typeof window === "undefined") return;
  try { const c = readContinuity(); if (c && c.bookId === bookId) localStorage.removeItem(KEY); } catch { /* noop */ }
}

export function writeContinuity(patch: Partial<Continuity> & { bookId: string; title: string; module: string; href: string }) {
  if (typeof window === "undefined") return;
  try {
    const prev = readContinuity();
    const merged: Continuity = { ...(prev || {}), ...patch, updatedAt: Date.now() } as Continuity;
    localStorage.setItem(KEY, JSON.stringify(merged));
  } catch {
    /* noop */
  }
}

/* ---- reading view preference: bilingual spread vs Hebrew-only ---- */
export type ReaderView = "bilingual" | "hebrew";
const VIEW_KEY = "neo:reader:view";

/** Resolve the reading view: explicit saved choice wins; otherwise device default
 *  (desktop/ultra-wide → bilingual study, tablet/mobile → Hebrew-only comfort). */
export function resolveReaderView(): ReaderView {
  if (typeof window === "undefined") return "bilingual";
  try {
    const saved = localStorage.getItem(VIEW_KEY);
    if (saved === "bilingual" || saved === "hebrew") return saved;
  } catch {
    /* noop */
  }
  return typeof window !== "undefined" && window.innerWidth >= 1024 ? "bilingual" : "hebrew";
}

export function saveReaderView(v: ReaderView) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(VIEW_KEY, v); } catch { /* noop */ }
}
