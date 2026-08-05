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

const KEY_THREADS = "neo:ai:threads";
const KEY_SCOPE = "neo:ai:scope";
const KEY_ACTIVE = "neo:ai:active";
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

export const loadThreads = (): Thread[] =>
  read<Thread[]>(KEY_THREADS, []).sort((a, b) => b.updatedAt - a.updatedAt);

export function saveThread(thread: Thread) {
  const all = read<Thread[]>(KEY_THREADS, []).filter((t) => t.id !== thread.id);
  all.unshift({ ...thread, turns: thread.turns.slice(-MAX_TURNS) });
  // Favourites survive the cap; everything else is trimmed oldest-first.
  const keep = [...all.filter((t) => t.favorite), ...all.filter((t) => !t.favorite)].slice(0, MAX_THREADS);
  write(KEY_THREADS, keep);
}

export function deleteThread(id: string) {
  write(KEY_THREADS, read<Thread[]>(KEY_THREADS, []).filter((t) => t.id !== id));
  if (read<string>(KEY_ACTIVE, "") === id) write(KEY_ACTIVE, "");
}

export function renameThread(id: string, title: string) {
  const all = read<Thread[]>(KEY_THREADS, []);
  const t = all.find((x) => x.id === id);
  if (!t) return;
  t.title = title.trim().slice(0, 80) || t.title;
  t.updatedAt = Date.now();
  write(KEY_THREADS, all);
}

export function toggleFavorite(id: string) {
  const all = read<Thread[]>(KEY_THREADS, []);
  const t = all.find((x) => x.id === id);
  if (!t) return;
  t.favorite = !t.favorite;
  write(KEY_THREADS, all);
}

/** Scope is remembered; the thread it belonged to is not implied by it. */
export const loadScope = (): Scope => read<Scope>(KEY_SCOPE, {});
export const saveScope = (s: Scope) => write(KEY_SCOPE, s);

export const loadActiveId = (): string => read<string>(KEY_ACTIVE, "");
export const saveActiveId = (id: string) => write(KEY_ACTIVE, id);

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
