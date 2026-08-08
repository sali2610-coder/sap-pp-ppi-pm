"use client";

/**
 * Conversation persistence.
 *
 * Scope and thread live in localStorage so leaving the page and coming back does
 * not throw the work away. Deliberately conservative about what is stored: the
 * question, the answer text, its citations and its scope. No API keys, no
 * provider names, no model identifiers, no telemetry, nothing the user did not
 * type or read.
 *
 * Bounded on purpose. Twenty threads at ~40KB each stays well inside the 5MB
 * localStorage budget, and the oldest is dropped rather than letting the store
 * grow until a write silently fails.
 */
import type { Answer, Scope } from "./types";

/**
 * Storage is namespaced PER SURFACE.
 *
 * It was not, and that was the bug: one set of keys served both Ask the Library
 * and AI Chat, so opening one restored the other's conversation, and a reload
 * on either page brought back whichever thread was written last. Two products
 * were sharing one memory.
 *
 * `AiMode` is threaded through every call rather than read from a module-level
 * "current mode", because a global would be wrong exactly when it matters — the
 * moment a component from one surface renders while the other is mounting.
 */
export type StoreMode = "library" | "consult";

const NS: Record<StoreMode, string> = {
  library: "neo:ai:lib",
  consult: "neo:ai:con",
};

const keyThreads = (m: StoreMode) => `${NS[m]}:threads`;
const keyScope = (m: StoreMode) => `${NS[m]}:scope`;
const keyActive = (m: StoreMode) => `${NS[m]}:active`;
const MAX_THREADS = 20;
const MAX_TURNS = 40;

export interface Turn { q: string; a: Answer | null }

export interface Thread {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  favorite?: boolean;
  turns: Turn[];
}

const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch { return fallback; }
};

const write = (key: string, value: unknown) => {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch { /* quota or private mode — persistence is a convenience, never a requirement */ }
};

/** A thread is named after its first question, trimmed at a word boundary. */
export function titleFrom(question: string): string {
  const q = question.trim().replace(/\s+/g, " ");
  if (q.length <= 42) return q;
  const cut = q.slice(0, 42);
  const lastSpace = cut.lastIndexOf(" ");
  return `${lastSpace > 20 ? cut.slice(0, lastSpace) : cut}…`;
}

export const loadThreads = (m: StoreMode): Thread[] =>
  read<Thread[]>(keyThreads(m), []).sort((a, b) => b.updatedAt - a.updatedAt);

export function saveThread(m: StoreMode, thread: Thread) {
  const all = read<Thread[]>(keyThreads(m), []).filter((t) => t.id !== thread.id);
  all.unshift({ ...thread, turns: thread.turns.slice(-MAX_TURNS) });
  // Favourites survive the cap; everything else is trimmed oldest-first.
  const keep = [...all.filter((t) => t.favorite), ...all.filter((t) => !t.favorite)].slice(0, MAX_THREADS);
  write(keyThreads(m), keep);
}

export function deleteThread(m: StoreMode, id: string) {
  write(keyThreads(m), read<Thread[]>(keyThreads(m), []).filter((t) => t.id !== id));
  if (read<string>(keyActive(m), "") === id) write(keyActive(m), "");
}

export function renameThread(m: StoreMode, id: string, title: string) {
  const all = read<Thread[]>(keyThreads(m), []);
  const t = all.find((x) => x.id === id);
  if (!t) return;
  t.title = title.trim().slice(0, 80) || t.title;
  t.updatedAt = Date.now();
  write(keyThreads(m), all);
}

export function toggleFavorite(m: StoreMode, id: string) {
  const all = read<Thread[]>(keyThreads(m), []);
  const t = all.find((x) => x.id === id);
  if (!t) return;
  t.favorite = !t.favorite;
  write(keyThreads(m), all);
}

/** Scope is remembered; the thread it belonged to is not implied by it. */
export const loadScope = (m: StoreMode): Scope => read<Scope>(keyScope(m), {});
export const saveScope = (m: StoreMode, s: Scope) => write(keyScope(m), s);

export const loadActiveId = (m: StoreMode): string => read<string>(keyActive(m), "");
export const saveActiveId = (m: StoreMode, id: string) => write(keyActive(m), id);

/* ------------------------------------------------------------------ feedback */

const KEY_FEEDBACK = "neo:ai:feedback";
export type Verdict = "up" | "down";

/**
 * Stored per answer id, locally only. Nothing is transmitted — there is no
 * endpoint for it, and inventing one silently would be worse than being honest
 * that this is currently a personal signal.
 */
export const loadFeedback = (): Record<string, Verdict> => read(KEY_FEEDBACK, {});

export function setFeedback(answerId: string, v: Verdict | null) {
  const all = loadFeedback();
  if (v) all[answerId] = v; else delete all[answerId];
  write(KEY_FEEDBACK, all);
}
