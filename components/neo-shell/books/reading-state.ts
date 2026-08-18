"use client";

// Reading state for the Books surface — READ from what the app already keeps,
// WRITE only to NEO's own key.
//
// Two stores already exist and are the truth about where a reader has been.
// Neither is written to from here, because both belong to the canonical reader:
//
//   neo:reader:<bookId>   lib/reader-store.ts — { read: number[], bm: number[],
//                         last: number }. Chapters marked read, chapter
//                         bookmarks, and the last chapter opened.
//
//   neo:continuity:v1     lib/continuity-store.ts — ONE global pointer:
//                         { bookId, chapter, sectionId, scrollRatio, ... }. It
//                         holds a section id, but only for the most recently
//                         read book.
//
// What is missing for a shelf is a PER-BOOK section pointer: the moment you open
// a second book, the first one's section is gone from continuity forever. That
// gap — and only that gap — is what NEO fills, under its own key:
//
//   neo:books:v1          { v, last, books: { <id>: { c, s, at, bm: [...] } } }
//
// It records the location this surface handed off to, so a book you left three
// books ago still remembers its chapter and subchapter. It never replaces the
// canonical stores: when continuity still points at a book, continuity wins,
// because that value was written by the reader itself while reading and is
// therefore newer and more precise than the handoff NEO recorded on the way in.
//
// BOOKMARKS ARE TWO DIFFERENT THINGS, SO THEY ARE KEPT AS TWO.
//   `marks`      neo:reader:<id>.bm — CHAPTER bookmarks placed in the canonical
//                reader. Read here, never written, so /library keeps its own.
//   `bookmarks`  neo:books:v1 → books[<id>].bm — SUBCHAPTER bookmarks placed in
//                NEO's own reader. A chapter bookmark cannot say "this
//                subchapter", and writing a subchapter into the canonical
//                number array would corrupt a store this surface does not own.
//                So NEO keeps its own list, at its own precision, under its own
//                key, and a surface that asks "is anything bookmarked in
//                chapter 3" simply reads both.

import { useCallback, useSyncExternalStore } from "react";

/* ------------------------------------------------------------------ shapes */

/** Mirror of lib/reader-store.ts's ReaderState. Read-only here. */
interface ReaderRaw { read?: unknown; bm?: unknown; last?: unknown }
/** Mirror of lib/continuity-store.ts's Continuity. Read-only here. */
interface ContinuityRaw { bookId?: unknown; chapter?: unknown; sectionId?: unknown; scrollRatio?: unknown; updatedAt?: unknown }

/**
 * One subchapter bookmark, placed by NEO's own reader.
 *
 * `section` is null for a bookmark dropped in a chapter the book gives no
 * subchapters — a real state in this corpus, and the reason this is a record
 * rather than a bare id.
 */
export interface NeoBookmark {
  chapter: number;
  section: string | null;
  /** Epoch ms it was placed. Newest first when the list is read. */
  at: number;
}

export interface BookReading {
  /** The book has been opened at least once, by any surface. */
  opened: boolean;
  /** Chapter numbers marked read by the canonical reader. */
  read: number[];
  /** Chapter bookmarks set in the canonical reader. */
  marks: number[];
  /** Subchapter bookmarks placed in NEO's reader. Newest first. */
  bookmarks: NeoBookmark[];
  /** Last chapter, best source first. */
  chapter: number | null;
  /** Last section id, when one is known for THIS book. */
  section: string | null;
  /** Epoch ms of the newest evidence, when one carries a timestamp. */
  at: number | null;
  /** §6 — how far into the document the reader had scrolled, 0..1.
   *
   *  This is the CANONICAL READER'S OWN value: lib/continuity-store.ts writes
   *  `scrollRatio` while you read and calls it "a soft refinement only". It is
   *  read here and never written, and it exists for the most recent book alone,
   *  so it is null for every other book on the shelf rather than carried over
   *  from one book to the next. A surface may report it; nothing may resume
   *  from it, because the reader is the only thing that knows what it meant. */
  scroll: number | null;
  /** The global continuity pointer currently names this book. */
  current: boolean;
  /** Where the chapter/section came from — shown as plain words in the UI. */
  from: "reader" | "neo" | "chapter" | null;
}

export interface ReadingSnapshot {
  map: Record<string, BookReading>;
  /** The book the global continuity pointer names, if any. */
  currentBook: string | null;
  /** The last book this surface handed off to. */
  lastBook: string | null;
  /** Any evidence at all exists. Lets a surface stay silent on a first visit. */
  any: boolean;
}

const NEO_KEY = "neo:books:v1";
const CONT_KEY = "neo:continuity:v1";
const SYNC_EVENT = "neo:books:sync";

const EMPTY: ReadingSnapshot = { map: {}, currentBook: null, lastBook: null, any: false };

/* ------------------------------------------------------------------- store */

interface NeoEntry { c?: unknown; s?: unknown; at?: unknown; bm?: unknown }
interface NeoRaw { last?: unknown; books?: Record<string, NeoEntry> }

function parse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try { const v = JSON.parse(raw); return v && typeof v === "object" ? (v as T) : null; }
  catch { return null; }
}

const num = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) && v > 0 ? v : null);
const str = (v: unknown): string | null => (typeof v === "string" && v.trim() ? v.trim() : null);
const nums = (v: unknown): number[] => (Array.isArray(v) ? v.filter((x): x is number => typeof x === "number") : []);

/** Parses the stored bookmark list defensively — a store written by an older
 *  version, or by hand, must not be able to throw inside a snapshot. */
function marksOf(v: unknown): NeoBookmark[] {
  if (!Array.isArray(v)) return [];
  const out: NeoBookmark[] = [];
  for (const raw of v) {
    if (!raw || typeof raw !== "object") continue;
    const r = raw as { c?: unknown; s?: unknown; at?: unknown };
    const c = num(r.c);
    if (c === null) continue;
    out.push({ chapter: c, section: str(r.s), at: num(r.at) ?? 0 });
  }
  return out.sort((a, b) => b.at - a.at);
}

/** One bookmark's identity. Chapter + subchapter, and nothing else — placing the
 *  same subchapter twice is the same bookmark, not two. */
const bmKey = (chapter: number, section: string | null): string => `${chapter}|${section ?? ""}`;

function readNeo(): NeoRaw {
  if (typeof window === "undefined") return {};
  return parse<NeoRaw>(localStorage.getItem(NEO_KEY)) ?? {};
}

function build(ids: string[]): ReadingSnapshot {
  if (typeof window === "undefined") return EMPTY;

  const neo = readNeo();
  const neoBooks = (neo.books && typeof neo.books === "object" ? neo.books : {}) as Record<string, NeoEntry>;
  const cont = parse<ContinuityRaw>(localStorage.getItem(CONT_KEY));
  const currentBook = str(cont?.bookId);

  const map: Record<string, BookReading> = {};
  let any = false;

  for (const id of ids) {
    let reader: ReaderRaw | null = null;
    try { reader = parse<ReaderRaw>(localStorage.getItem(`neo:reader:${id}`)); } catch { reader = null; }

    const read = nums(reader?.read);
    const marks = nums(reader?.bm);
    const lastCh = num(reader?.last);
    const mine = neoBooks[id];
    const bookmarks = marksOf(mine?.bm);

    // The reader's own live pointer beats NEO's handoff note: it was written
    // while reading, the handoff was written before it.
    let chapter: number | null = null;
    let section: string | null = null;
    let from: BookReading["from"] = null;
    let at: number | null = null;
    let scroll: number | null = null;

    if (currentBook === id) {
      chapter = num(cont?.chapter);
      section = str(cont?.sectionId);
      at = num(cont?.updatedAt);
      // 0 and 1 are both real ratios, so this cannot go through `num`, which
      // rejects zero. An out-of-range value means a store from another version.
      const sr = cont?.scrollRatio;
      scroll = typeof sr === "number" && Number.isFinite(sr) && sr >= 0 && sr <= 1 ? sr : null;
      if (chapter || section) from = "reader";
    }
    if (!chapter && !section && mine) {
      chapter = num(mine.c);
      section = str(mine.s);
      at = num(mine.at);
      if (chapter || section) from = "neo";
    }
    if (!chapter && !section && lastCh) {
      chapter = lastCh;
      from = "chapter";
    }

    const opened = Boolean(
      chapter || section || read.length || marks.length || bookmarks.length || currentBook === id,
    );
    if (opened) any = true;
    map[id] = { opened, read, marks, bookmarks, chapter, section, at, scroll, current: currentBook === id, from };
  }

  return { map, currentBook, lastBook: str(neo.last), any };
}

/* --------------------------------------------------------- subscribe/cache */

const listeners = new Set<() => void>();
/* Keyed by the id set, so a page that watches one book and a page that watches
   all eleven never invalidate each other's snapshot on every render. */
const cache = new Map<string, ReadingSnapshot>();

function invalidate() {
  cache.clear();
  for (const l of listeners) l();
}

function snapshot(ids: string[], key: string): ReadingSnapshot {
  const hit = cache.get(key);
  if (hit) return hit;
  const next = build(ids);
  cache.set(key, next);
  return next;
}

function subscribe(cb: () => void): () => void {
  const first = listeners.size === 0;
  listeners.add(cb);
  if (first && typeof window !== "undefined") {
    /* THE RETURN PATH. Books → reader → back is a CLIENT-side navigation, so
       this module is never re-evaluated and its cache would otherwise still
       hold the snapshot from before the reader ran and wrote its own position.
       Clearing on the first subscriber makes every mount re-read storage;
       React re-reads getSnapshot immediately after subscribing, which is
       exactly the moment the fresh value is needed. No notification is sent
       from here — that would be a state update during commit. */
    cache.clear();
    // `storage` fires for other tabs; the rest cover the same tab coming back
    // from the reader, which is the path that actually matters here.
    window.addEventListener("storage", invalidate);
    window.addEventListener("focus", invalidate);
    window.addEventListener("pageshow", invalidate);
    window.addEventListener("popstate", invalidate);
    document.addEventListener("visibilitychange", invalidate);
    window.addEventListener(SYNC_EVENT, invalidate);
  }
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0 && typeof window !== "undefined") {
      window.removeEventListener("storage", invalidate);
      window.removeEventListener("focus", invalidate);
      window.removeEventListener("pageshow", invalidate);
      window.removeEventListener("popstate", invalidate);
      document.removeEventListener("visibilitychange", invalidate);
      window.removeEventListener(SYNC_EVENT, invalidate);
    }
  };
}

/* -------------------------------------------------------------------- hook */

/**
 * Reading evidence for a fixed set of books.
 *
 * The server snapshot is a hard empty object, so nothing about a private
 * reading history is ever in the exported HTML and hydration cannot mismatch —
 * the bookmark and the resume row appear after mount, which is also the only
 * moment they could be true.
 */
export function useReading(ids: string[]): ReadingSnapshot {
  const key = ids.join("|");
  const get = useCallback(() => snapshot(ids, key), [ids, key]);
  return useSyncExternalStore(subscribe, get, () => EMPTY);
}

/* ------------------------------------------------------------------- write */

/**
 * Records where this surface sent the reader. NEO's key only — the canonical
 * reader's stores are never touched, and it will overwrite its own continuity
 * the moment it loads anyway.
 */
export function noteHandoff(bookId: string, chapter: number | null, section: string | null): void {
  if (typeof window === "undefined") return;
  try {
    const prev = readNeo();
    const books = (prev.books && typeof prev.books === "object" ? { ...(prev.books as Record<string, NeoEntry>) } : {});
    // MERGE, not replace. The entry now carries a second, independent fact —
    // the bookmark list — and moving the reading position must not erase it.
    books[bookId] = { ...books[bookId], c: chapter ?? undefined, s: section ?? undefined, at: Date.now() };
    localStorage.setItem(NEO_KEY, JSON.stringify({ v: 1, last: bookId, books }));
  } catch {
    /* private mode, quota, disabled storage — the surface simply forgets */
  }
  invalidate();
}

/**
 * Places or removes a SUBCHAPTER bookmark for this book. NEO's key only.
 *
 * Toggling is by chapter+subchapter identity, so the same place cannot be
 * bookmarked twice, and removing is the same gesture as placing — which is what
 * lets one control carry both states.
 *
 * @returns true when the location is bookmarked after the call.
 */
export function toggleBookmark(bookId: string, chapter: number, section: string | null): boolean {
  if (typeof window === "undefined") return false;
  const key = bmKey(chapter, section);
  let on = false;
  try {
    const prev = readNeo();
    const books = (prev.books && typeof prev.books === "object" ? { ...(prev.books as Record<string, NeoEntry>) } : {});
    const entry = books[bookId] ?? {};
    const list = marksOf(entry.bm);
    const without = list.filter((m) => bmKey(m.chapter, m.section) !== key);
    const next = without.length === list.length
      ? [{ c: chapter, s: section ?? undefined, at: Date.now() }, ...without.map((m) => ({ c: m.chapter, s: m.section ?? undefined, at: m.at }))]
      : without.map((m) => ({ c: m.chapter, s: m.section ?? undefined, at: m.at }));
    on = without.length === list.length;
    books[bookId] = { ...entry, bm: next };
    localStorage.setItem(NEO_KEY, JSON.stringify({ v: 1, last: str(prev.last) ?? bookId, books }));
  } catch {
    /* private mode, quota, disabled storage — the surface simply forgets */
    return false;
  }
  invalidate();
  return on;
}

/** True when this exact location carries a NEO bookmark. */
export const isBookmarked = (list: NeoBookmark[], chapter: number, section: string | null): boolean =>
  list.some((m) => bmKey(m.chapter, m.section) === bmKey(chapter, section));

/** Chapters that hold at least one NEO bookmark. Lets a chapter row say so
 *  without the caller re-deriving the same set on every render. */
export const bookmarkedChapters = (list: NeoBookmark[]): Set<number> =>
  new Set(list.map((m) => m.chapter));

/** Marks a book as the one this surface is on, without claiming a location. */
export function noteSelection(bookId: string): void {
  if (typeof window === "undefined") return;
  try {
    const prev = readNeo();
    const books = (prev.books && typeof prev.books === "object" ? prev.books : {});
    localStorage.setItem(NEO_KEY, JSON.stringify({ v: 1, last: bookId, books }));
  } catch {
    /* noop */
  }
  invalidate();
}
