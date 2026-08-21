"use client";

/* ============================================================================
   PROJECT NEO · READER — the reading surface.
   ----------------------------------------------------------------------------
   A SECOND reader, not a replacement. /library/<id>/ is untouched and still
   serves every production link; this route is NEO's own reading experience over
   THE SAME REAL CONTENT:

     spine   data/books/<id>.json, through lib/library/registry.ts, resolved at
             build time in ./reader-data.ts.
     prose   /books/<id>/ch<n>.json, fetched by lib/library/book.ts's own
             loadChapterBodies() — the identical function the production reader
             calls, cache and abort semantics included.

   Nothing in components/book-reader.tsx, components/chapter-reader.tsx,
   components/library/** or app/library/** is imported, wrapped or altered.

   THREE THINGS THIS FILE OWNS
     1. POSITION. A scroll spy over the real subchapter elements feeds
        ./progress.ts, which converts it into book / chapter / subchapter — the
        three scales the client asked to be visible at all times.
     2. MEMORY. The last meaningful location is written through the EXISTING
        NEO reading state (components/neo-shell/books/reading-state.ts,
        noteHandoff), so the shelf, the hub and this reader agree. It is a
        SEMANTIC location — chapter and subchapter — and the surface never
        promises to restore a pixel, because the architecture cannot honestly
        support that.
     3. QUIET. Focus mode, type size, measure, leading, paper and the reading
        lens. All of it is presentation; none of it touches the corpus.
   ========================================================================== */

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  AArrowDown,
  AArrowUp,
  AlignJustify,
  Bookmark,
  BookmarkCheck,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Focus,
  Images,
  Languages,
  ListTree,
  Loader2,
  Minus,
  Plus,
  RotateCcw,
  ScanLine,
  Sun,
} from "lucide-react";
import type { SectionBody } from "@/lib/library/book";
import { loadChapterBodies } from "@/lib/library/book";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import {
  isBookmarked,
  noteHandoff,
  toggleBookmark,
  useReading,
  type NeoBookmark,
} from "@/components/neo-shell/books/reading-state";
import { FigureViewer, type ViewerFigure } from "@/components/figure-viewer";
import type { NRBook, NRChapter } from "./types";
import { computeProgress, n, pct, stepSection, stepView, type NRProgress } from "./progress";
import { ProgressRail, ProgressStrip } from "./progress-rail";
import { ReaderPanel } from "./reader-panel";
import { ReadingLens } from "./lens";
import { FigureTail, SectionBlock } from "./section-body";
import { planFigures, type PlacedFigure } from "./figures";
import { canStep, LANG_HE, LANG_NOTE, LANGS, LEAD_HE, MEASURE_HE, SIZE_HE, useReaderPrefs } from "./prefs";
import { scrollHost, useReducedMotion } from "./env";

/* --------------------------------------------------------------- scrolling */

interface Offset { id: string; index: number; top: number; bottom: number }

const isDocHost = (h: HTMLElement): boolean =>
  h === document.documentElement || h === document.body;

function hostScrollTop(h: HTMLElement): number {
  return isDocHost(h) ? window.scrollY : h.scrollTop;
}

function hostHeight(h: HTMLElement): number {
  return isDocHost(h) ? window.innerHeight : h.clientHeight;
}

function scrollHostTo(h: HTMLElement, top: number, smooth: boolean) {
  const opts: ScrollToOptions = { top: Math.max(0, top), behavior: smooth ? "smooth" : "auto" };
  if (isDocHost(h)) window.scrollTo(opts);
  else h.scrollTo(opts);
}

/* ---------------------------------------------------------------- opening */

/** One chapter's fetched content, tagged with the chapter it belongs to. Held
 *  as one object so a slow response for a chapter the reader has already left
 *  can be recognised and dropped rather than painted. */
interface Pack {
  chapter: number;
  bodies: Record<string, SectionBody>;
  figs: ViewerFigure[];
  /** The chapter shard could not be read at all — as opposed to a chapter that
   *  genuinely has no prose, which is a real state in this corpus. */
  failed: boolean;
}

const NO_BODIES: Record<string, SectionBody> = {};
const NO_FIGS: ViewerFigure[] = [];
/** One shared empty list, so a subchapter with no scan does not get a fresh
 *  array on every render and re-run the section's memoisation for nothing. */
const NO_PLACED: PlacedFigure[] = [];
/** Not "no query" — "the query is not knowable yet". See readUrl below. */
const NO_URL = () => null;

/** The address becomes readable one frame after the page mounts.
 *
 *  The App Router renders a client-side navigation BEFORE it commits the new
 *  URL, so during the reader's first render `window.location` can still be the
 *  page the reader was opened FROM. A store with no subscription would simply
 *  keep whatever it read then. This subscribes for exactly one frame, which is
 *  the moment the address is authoritative — after that nothing external ever
 *  changes it for this surface, so the store goes quiet again. */
function subscribeUrl(onChange: () => void): () => void {
  // A frame AND a task. The frame is the precise moment on a visible page; the
  // task is what still happens on a page the browser is not painting, where
  // requestAnimationFrame does not run at all. Reading the address is not a
  // paint concern, so it must not depend on one.
  const frame = requestAnimationFrame(() => onChange());
  const task = window.setTimeout(() => onChange(), 0);
  return () => { cancelAnimationFrame(frame); window.clearTimeout(task); };
}

interface Opening {
  chapter: number | null;
  section: string | null;
  /** "url" — someone linked here. "stored" — this reader has been here before. */
  source: "url" | "stored" | "none";
}

/**
 * Where to open, from the URL first and the stored location second.
 *
 * Every candidate is resolved against THIS BOOK's real chapters and
 * subchapters. A pointer that no longer matches the data — the book changed
 * under a saved position — is downgraded to the chapter, and then to nothing,
 * rather than sending a reader somewhere that does not exist.
 */
function resolveOpening(
  book: NRBook,
  url: string | null,
  stored: { chapter: number | null; section: string | null } | null,
): Opening {
  const [search, hash = ""] = (url ?? "").split("#");
  const p = new URLSearchParams(search);
  const askedSection = p.get("s") || (hash.startsWith("sec-") ? hash.slice(4) : "");
  const askedChapter = Number(p.get("c") || (hash.startsWith("ch-") ? hash.slice(3) : ""));

  if (askedSection) {
    const owner = book.chapters.find((c) => c.sections.some((s) => s.id === askedSection));
    if (owner) return { chapter: owner.n, section: askedSection, source: "url" };
  }
  if (Number.isFinite(askedChapter) && book.chapters.some((c) => c.n === askedChapter)) {
    return { chapter: askedChapter, section: null, source: "url" };
  }

  if (stored) {
    const owner = stored.section
      ? book.chapters.find((c) => c.sections.some((s) => s.id === stored.section))
      : undefined;
    if (owner) return { chapter: owner.n, section: stored.section, source: "stored" };
    if (stored.chapter && book.chapters.some((c) => c.n === stored.chapter)) {
      return { chapter: stored.chapter, section: null, source: "stored" };
    }
  }
  return { chapter: null, section: null, source: "none" };
}

/** The resume sentence, built only from rows this book genuinely has. */
function openingLine(book: NRBook, o: Opening): string | null {
  if (o.source !== "stored" || o.chapter === null) return null;
  const ch = book.chapters.find((c) => c.n === o.chapter);
  if (!ch) return null;
  const sec = o.section ? ch.sections.find((s) => s.id === o.section) : undefined;
  return [`פרק ${ch.n}`, ch.title, sec?.title].filter(Boolean).join(" · ");
}

/* -------------------------------------------------------------------- view */

export function NeoReader({ book }: { book: NRBook }) {
  const reduced = useReducedMotion();
  const { prefs, set, step, reset } = useReaderPrefs();

  const ids = useMemo(() => [book.id], [book.id]);
  const reading = useReading(ids);
  const evidence = reading.map[book.id];

  /* ------------------------------------------------------------- opening */

  /* WHERE THE READER OPENS, decided once and then left alone.
     Two external sources, both unavailable during the server render, so both
     arrive through the store protocol rather than through an effect that sets
     state: the URL is frozen the first time it is read (this surface REWRITES
     the query as you read, and the opening must not chase its own writes), and
     the stored location is latched on the first render that carries any.

     THE PATHNAME GUARD IS NOT DEFENSIVE PROGRAMMING, IT IS THE WHOLE THING.
     On a client-side navigation the App Router renders the destination BEFORE
     it commits the new URL, so on the reader's first render window.location can
     still describe the page the reader came FROM — the book hub, which has no
     query. Freezing that gave the reader an empty query, which made a
     deliberate "open subchapter 5.4" arrive as a plain visit; the stored
     location then took over and the reader, correctly for a stored location,
     offered the resume banner instead of landing. The section was never wrong;
     the reader simply never heard the URL.

     So the snapshot stays UNKNOWN (null, not "") until window.location really
     describes this reader, and everything downstream waits for it. A render
     always follows — the chapter shard arrives, the scroll spy reports — so the
     wait is one frame, not a poll. */
  const urlRef = useRef<string | null>(null);
  const readUrl = useCallback((): string | null => {
    if (urlRef.current === null) {
      if (!window.location.pathname.startsWith(`/neo/read/${book.id}`)) return null;
      urlRef.current = window.location.search + window.location.hash;
    }
    return urlRef.current;
  }, [book.id]);
  const url = useSyncExternalStore(subscribeUrl, readUrl, NO_URL);

  /* HAS THE READER DONE ANYTHING YET.
     This is what keeps the opening decision stable without latching it behind a
     ref: nothing is written to the reading store until the reader has genuinely
     moved, so `stored` cannot change under the surface that is reading it. It
     is also the more honest rule for memory — merely landing on a page is not a
     "last location". */
  const [moved, setMoved] = useState(false);
  const markMoved = useCallback(() => setMoved(true), []);

  const stored = useMemo(
    () => (reading.any ? { chapter: evidence?.chapter ?? null, section: evidence?.section ?? null } : null),
    [reading.any, evidence?.chapter, evidence?.section],
  );

  const opening = useMemo(() => resolveOpening(book, url, stored), [book, url, stored]);

  /* ------------------------------------------------------------ chapter */

  const first = book.chapters[0];
  /** Set only when the READER navigates. Until then the opening decides. */
  const [chosen, setChosen] = useState<number | null>(null);
  const chapterN = chosen ?? opening.chapter ?? (first ? first.n : 1);
  const chapter: NRChapter | null = useMemo(
    () => book.chapters.find((c) => c.n === chapterN) ?? first ?? null,
    [book.chapters, chapterN, first],
  );

  const [pack, setPack] = useState<Pack | null>(null);
  const [reload, setReload] = useState(0);
  const [figAt, setFigAt] = useState<number | null>(null);

  const ready = pack !== null && chapter !== null && pack.chapter === chapter.n;
  const bodies = ready ? pack.bodies : NO_BODIES;
  const figs = ready ? pack.figs : NO_FIGS;
  const load: "idle" | "loading" = ready ? "idle" : "loading";

  /* ------------------------------------------------------------ position */

  const [index, setIndex] = useState(0);
  const [within, setWithin] = useState(0);
  /** The subchapter the reader explicitly asked for, held against the
   *  scroll-spy until the spy agrees. See the note in spy(). */
  const want = useRef<{ index: number; until: number } | null>(null);
  const activeSection = chapter && chapter.sections.length
    ? chapter.sections[Math.min(index, chapter.sections.length - 1)]?.id ?? null
    : null;

  const progress: NRProgress = useMemo(
    () => (chapter ? computeProgress(book, { chapter, index, sectionId: activeSection, within }) : {
      book: 0, chapter: 0, section: 0, ordinal: 0, chapterOrdinal: 1,
    }),
    [book, chapter, index, activeSection, within],
  );

  /* ------------------------------------------------------------- refs/UI */

  const rootRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLElement | null>(null);
  const offsets = useRef<Offset[]>([]);
  const raf = useRef(0);
  const pending = useRef<string | null>(null);

  const [panel, setPanel] = useState<null | "toc" | "map">(null);
  const [resumed, setResumed] = useState(false);
  const resumeLine = openingLine(book, opening);

  /* --------------------------------------------------------- measurement */

  const measure = useCallback(() => {
    const sheet = sheetRef.current;
    const h = host.current;
    if (!sheet || !h) return;
    const base = isDocHost(h) ? window.scrollY : h.scrollTop;
    const hostTop = isDocHost(h) ? 0 : h.getBoundingClientRect().top;
    const els = Array.from(sheet.querySelectorAll<HTMLElement>("[data-nr-section]"));
    offsets.current = els.map((el, i) => {
      const r = el.getBoundingClientRect();
      return {
        id: el.dataset.nrSection ?? "",
        index: Number(el.dataset.nrIndex ?? i),
        top: r.top - hostTop + base,
        bottom: r.bottom - hostTop + base,
      };
    });
  }, []);

  const spy = useCallback(() => {
    raf.current = 0;
    const h = host.current;
    const list = offsets.current;
    if (!h || list.length === 0) return;
    // The reading line: a little below the sticky header, where the eye sits.
    const headH = headRef.current?.getBoundingClientRect().height ?? 0;
    const line = hostScrollTop(h) + headH + hostHeight(h) * 0.18;

    let lo = 0;
    let hi = list.length - 1;
    let found = 0;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (list[mid].top <= line) { found = mid; lo = mid + 1; } else { hi = mid - 1; }
    }
    const row = list[found];
    const span = Math.max(1, row.bottom - row.top);

    /* INTENT BEATS THE SPY, BRIEFLY.
       goTo lands a target at headH + 12, but the reading line sits at
       headH + 18% of the viewport — roughly 130px lower. So for the frames
       while a smooth scroll is still travelling, the target's top is still
       below the line and the PREVIOUS section keeps winning the binary search.
       That is why clicking 1.2 used to leave 1.1.2 marked in the rail.

       The hold releases the instant the observer agrees, so ordinary reading is
       never overridden. The ceiling exists only so a jump that never lands
       cannot freeze the rail. */
    const w = want.current;
    if (w) {
      if (row.index === w.index || Date.now() > w.until) want.current = null;
      else { setIndex(w.index); return; }
    }

    setIndex(row.index);
    setWithin(Math.min(1, Math.max(0, (line - row.top) / span)));
  }, []);

  const schedule = useCallback(() => {
    if (!raf.current) raf.current = requestAnimationFrame(spy);
  }, [spy]);

  /* --------------------------------------------------------------- mount */

  useEffect(() => {
    host.current = scrollHost(rootRef.current);
    const h = host.current;
    const target: EventTarget = isDocHost(h) ? window : h;
    target.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Deliberately the INPUT events and not `scroll`: a browser restoring a
    // scroll offset is not the reader deciding to move.
    window.addEventListener("wheel", markMoved, { passive: true });
    window.addEventListener("touchmove", markMoved, { passive: true });
    window.addEventListener("keydown", markMoved);
    return () => {
      target.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("wheel", markMoved);
      window.removeEventListener("touchmove", markMoved);
      window.removeEventListener("keydown", markMoved);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [schedule, markMoved]);

  /* The sticky header's real height, published as a custom property. The rail
     docks under it and the scroll spy's reading line starts below it, and both
     have to survive the header wrapping to two rows on a narrow screen — so it
     is measured rather than guessed at in the stylesheet. */
  useEffect(() => {
    const head = headRef.current;
    const root = rootRef.current;
    if (!head || !root) return;
    const ro = new ResizeObserver(() => {
      root.style.setProperty("--nr-headh", `${Math.round(head.getBoundingClientRect().height)}px`);
    });
    ro.observe(head);
    return () => ro.disconnect();
  }, []);

  /* ------------------------------------------------------- chapter bodies */

  /* Prose and page scans for the open chapter, committed as ONE object once
     both have settled. Committing in the callback rather than clearing state up
     front is what keeps the previous chapter on screen until the next one is
     ready, instead of flashing an empty sheet between the two.

     loadChapterBodies is lib/library/book.ts's own function — same cache, same
     abort semantics, same shard path as the production reader. Figures are
     optional data: a chapter without scans is not an error and must never stop
     the prose from rendering. */
  useEffect(() => {
    if (!chapter) return;
    const ctl = new AbortController();
    const at = chapter.n;
    const hasFigs = book.figChapters.includes(at);
    Promise.all([
      loadChapterBodies(book.id, at, ctl.signal).catch(() => null),
      hasFigs
        ? fetch(`/books/${book.id}/fig${at}.json`, { signal: ctl.signal })
            .then((r) => (r.ok ? r.json() : []))
            .catch(() => [])
        : Promise.resolve([]),
    ]).then(([b, f]) => {
      if (ctl.signal.aborted) return;
      setPack({
        chapter: at,
        bodies: b ?? {},
        figs: Array.isArray(f) ? (f as ViewerFigure[]) : [],
        failed: b === null,
      });
    });
    return () => ctl.abort();
  }, [book.id, book.figChapters, chapter, reload]);

  /* -------------------------------------------------- re-measure on change */

  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    let t = 0;
    const run = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => { measure(); schedule(); }, 60);
    };
    run();
    const ro = new ResizeObserver(run);
    ro.observe(sheet);
    return () => { ro.disconnect(); window.clearTimeout(t); };
  }, [measure, schedule, bodies, prefs.size, prefs.lead, prefs.measure, chapter]);

  /* ------------------------------------------------------------ deep link */

  const goTo = useCallback((n2: number, sectionId: string | null, smooth = true) => {
    const target = book.chapters.find((c) => c.n === n2);
    if (!target) return;
    markMoved();
    if (target.n !== chapterN) {
      // The subchapter is remembered rather than chased: its element does not
      // exist until the new chapter's shard has arrived and rendered.
      pending.current = sectionId;
      setChosen(target.n);
      if (!sectionId) {
        const h = host.current;
        const sheet = sheetRef.current;
        if (h && sheet) {
          const hostTop = isDocHost(h) ? 0 : h.getBoundingClientRect().top;
          scrollHostTo(h, sheet.getBoundingClientRect().top - hostTop + hostScrollTop(h) - 8, false);
        }
      }
      return;
    }
    if (!sectionId) {
      const h = host.current;
      const sheet = sheetRef.current;
      if (h && sheet) {
        const hostTop = isDocHost(h) ? 0 : h.getBoundingClientRect().top;
        scrollHostTo(h, sheet.getBoundingClientRect().top - hostTop + hostScrollTop(h) - 8, smooth && !reduced);
      }
      return;
    }
    const el = document.getElementById(`nr-sec-${sectionId}`);
    const h = host.current;
    if (!el || !h) return;
    // State the intent before moving, so the spy cannot mark the section above
    // the target while the smooth scroll is still travelling.
    const wantIdx = target.sections.findIndex((s) => s.id === sectionId);
    if (wantIdx >= 0) want.current = { index: wantIdx, until: Date.now() + 2600 };
    const headH = headRef.current?.getBoundingClientRect().height ?? 0;
    const hostTop = isDocHost(h) ? 0 : h.getBoundingClientRect().top;
    scrollHostTo(h, el.getBoundingClientRect().top - hostTop + hostScrollTop(h) - headH - 12, smooth && !reduced);
  }, [book.chapters, chapterN, reduced, markMoved]);

  // A chapter change that carried a subchapter with it lands once the new
  // chapter's elements exist — never before, or the target is not mounted.
  useEffect(() => {
    if (!pending.current || load === "loading") return;
    const id = pending.current;
    pending.current = null;
    const t = window.setTimeout(() => {
      measure();
      goTo(chapterN, id, false);
      schedule();
    }, 40);
    return () => window.clearTimeout(t);
  }, [load, chapterN, goTo, measure, schedule]);

  /* A URL that names a subchapter lands on it — once, on the first render that
     has the chapter's content. A stored location is NOT auto-scrolled to: it
     opens its chapter and offers the subchapter as a choice, because being
     dropped mid-chapter without being asked is disorienting. */
  const landed = useRef(false);
  useEffect(() => {
    // `url === null` means the router has not committed the address yet. The
    // decision is not "no deep link", it is "not yet knowable" — so the landing
    // is not spent on it.
    if (landed.current || load === "loading" || url === null) return;
    if (opening.source !== "url" || !opening.section) { landed.current = true; return; }
    landed.current = true;
    const t = window.setTimeout(() => { measure(); goTo(chapterN, opening.section, false); schedule(); }, 60);
    return () => window.clearTimeout(t);
  }, [load, url, opening, chapterN, goTo, measure, schedule]);

  /* ------------------------------------------------------------ bookmark */

  /* A BOOKMARK IS NOT A READING POSITION, AND THE READER KEEPS THEM APART.
     The position is written continuously and silently as you read; a bookmark
     is placed deliberately, survives reading past it, and there can be many.
     Both live under NEO's own key (neo:books:v1) and NEITHER touches the
     canonical reader's stores — /library's own chapter bookmarks are read here
     and shown as its evidence, never overwritten.

     The mark names the subchapter in view. A chapter the book gives no
     subchapters is bookmarked at chapter level, because that is the finest
     location the data actually has. */
  const bookmarks: NeoBookmark[] = useMemo(() => evidence?.bookmarks ?? [], [evidence?.bookmarks]);
  const marked = chapter ? isBookmarked(bookmarks, chapter.n, activeSection) : false;
  const mark = useCallback(() => {
    if (!chapter) return;
    markMoved();
    toggleBookmark(book.id, chapter.n, activeSection);
  }, [book.id, chapter, activeSection, markMoved]);

  /* -------------------------------------------------------------- memory */

  // Written through NEO's OWN key only (neo:books:v1, via the existing
  // reading-state module). The canonical reader's stores are never touched, so
  // /library keeps its own idea of where it was — and the shelf and the hub
  // read the same key this writes, so all three agree.
  useEffect(() => {
    if (!chapter || !moved) return;
    const t = window.setTimeout(() => {
      noteHandoff(book.id, chapter.n, activeSection);
    }, 900);
    return () => window.clearTimeout(t);
  }, [book.id, chapter, activeSection, moved]);

  // The URL follows the reading position, so a link can be copied at any time.
  // history.state is preserved: the App Router keeps its own record in there.
  //
  // NOT UNTIL THE ADDRESS HAS BEEN READ. This effect rewrites the very query
  // the opening resolver is still waiting to read; running it first would let
  // the reader overwrite the instruction it was given and then obey its own
  // rewrite. `url === null` means "not read yet", so it waits.
  useEffect(() => {
    if (!chapter || url === null) return;
    const t = window.setTimeout(() => {
      const next = new URL(window.location.href);
      next.searchParams.set("c", String(chapter.n));
      if (activeSection) next.searchParams.set("s", activeSection);
      else next.searchParams.delete("s");
      next.hash = "";
      window.history.replaceState(window.history.state, "", next.toString());
    }, 700);
    return () => window.clearTimeout(t);
  }, [chapter, activeSection, url]);

  /* ------------------------------------------------------------ stepping */

  const prev = chapter ? stepSection(book, chapter.n, index, -1) : null;
  const next = chapter ? stepSection(book, chapter.n, index, 1) : null;
  /* The step's destination, named. `stepSection` already crosses a chapter
     boundary when it has to; this is what lets the CONTROL say so, instead of
     the reader finding out only after the whole page has changed. */
  const prevAt = chapter ? stepView(book, chapter.n, prev) : null;
  const nextAt = chapter ? stepView(book, chapter.n, next) : null;

  /* ------------------------------------------------------------- figures */

  /* WHERE THE SCANS GO. Not a strip above the chapter, which takes every figure
     out of the passage it illustrates: each scan is placed after the subchapter
     whose share of the chapter's page band contains its source page — the same
     rule components/chapter-reader.tsx has used in production since the library
     shipped. Whatever cannot be placed falls to the chapter's tail and is still
     rendered, so no scan is ever lost to a tidier screen. */
  const plan = useMemo(
    () => planFigures(figs, chapter?.sections.length ?? 0),
    [figs, chapter?.sections.length],
  );
  const openFig = useCallback((i: number) => setFigAt(i), []);

  const chapterIdx = chapter ? book.chapters.findIndex((c) => c.n === chapter.n) : -1;
  const prevCh = chapterIdx > 0 ? book.chapters[chapterIdx - 1] : null;
  const nextCh = chapterIdx >= 0 && chapterIdx < book.chapters.length - 1 ? book.chapters[chapterIdx + 1] : null;

  /* --------------------------------------------------------------- empty */

  if (!chapter) {
    return (
      <div className="nr" ref={rootRef} style={{ "--m": book.mod } as React.CSSProperties}>
        <SmartReturn fallback={{ href: book.hubHref, label: "מרכז הספר" }} />
        <p className="nr-none">
          לספר {book.titleHe || book.titleEn} אין פרקים בקובץ הספר, ולכן אין מה לקרוא כאן.
        </p>
      </div>
    );
  }

  const title = book.titleHe || book.titleEn;
  const secTitle = chapter.sections.length
    ? chapter.sections[Math.min(index, chapter.sections.length - 1)]?.title
    : null;

  return (
    <div
      className="nr"
      ref={rootRef}
      data-focus={prefs.focus ? "1" : undefined}
      data-paper={prefs.paper ? "1" : undefined}
      data-lens={prefs.lens && !reduced ? "1" : undefined}
      data-size={prefs.size}
      data-lead={prefs.lead}
      data-measure={prefs.measure}
      data-lang={prefs.lang}
      style={{ "--m": book.mod } as React.CSSProperties}
    >
      {/* ------------------------------------------------------------ head */}
      <div className="nr-head" ref={headRef}>
        <div className="nr-head-row">
          <SmartReturn
            fallback={{ href: book.hubHref, label: "מרכז הספר" }}
            hint="חזרה למרכז הספר"
            className="nr-back"
          />

          <nav className="nr-crumb" aria-label="מיקום בקריאה">
            <Link className="nr-crumb-l" href={book.shelfHref} prefetch={false}>מדף הספרים</Link>
            <ChevronLeft size={12} strokeWidth={2} aria-hidden="true" />
            <Link className="nr-crumb-l" href={book.hubHref} prefetch={false}>{title}</Link>
            <ChevronLeft size={12} strokeWidth={2} aria-hidden="true" />
            <button type="button" className="nr-crumb-b" onClick={() => setPanel("toc")}>
              פרק {chapter.n} · {chapter.title}
            </button>
            {secTitle && (
              <>
                <ChevronLeft size={12} strokeWidth={2} aria-hidden="true" />
                <span className="nr-crumb-now" aria-current="true">{secTitle}</span>
              </>
            )}
          </nav>

          <div className="nr-tools">
            <button
              type="button"
              className="nu-btn2 nr-tool"
              onClick={() => setPanel("toc")}
              aria-haspopup="dialog"
              /* The word is hidden below 1280px, so the name has to be stated:
                 an icon-only control with a `title` alone has no accessible
                 name in several screen readers. */
              aria-label="תוכן העניינים"
            >
              <ListTree size={15} strokeWidth={1.9} aria-hidden="true" />
              <span className="nr-tool-l">תוכן</span>
            </button>
            {/* THE BOOKMARK. One control, both states, and its own place in the
                order: it belongs to the LOCATION, so it sits beside the table of
                contents rather than among the type controls. It is never
                disabled — a chapter without subchapters is bookmarked at
                chapter level, which is the finest location its data has. */}
            <button
              type="button"
              className="nu-filter nr-mark"
              data-on={marked ? "1" : undefined}
              aria-pressed={marked}
              aria-label={marked ? "הסר סימנייה מהמיקום הזה" : "סמן את המיקום הזה בסימנייה"}
              onClick={mark}
              title={
                marked
                  ? `סימנייה מונחת כאן${secTitle ? `: ${secTitle}` : ""}. לחיצה מסירה אותה.`
                  : chapter.sections.length
                    ? "הנח סימנייה על תת-הפרק הנוכחי"
                    : "הנח סימנייה על הפרק: לפרק זה אין תת-פרקים בנתוני הספר"
              }
            >
              {marked
                ? <BookmarkCheck size={14} strokeWidth={1.9} aria-hidden="true" />
                : <Bookmark size={14} strokeWidth={1.9} aria-hidden="true" />}
              <span className="nr-tool-l">{marked ? "מסומן" : "סימנייה"}</span>
              {bookmarks.length > 0 && (
                <span className="nr-mark-n" aria-hidden="true">{n(bookmarks.length)}</span>
              )}
            </button>
            {/* THE LANGUAGE SPREAD. First among the reading controls, because it
                decides what is on the page rather than how it looks. Three real
                states and no hidden fourth: the text that is not chosen stays in
                the document inside a disclosure, so nothing is deleted to make a
                screen tidier. */}
            <span className="nr-langs" role="group" aria-label="שפת הקריאה">
              <Languages size={14} strokeWidth={1.9} aria-hidden="true" />
              {LANGS.map((l) => (
                <button
                  key={l}
                  type="button"
                  className="nu-ghost nr-lang"
                  data-on={prefs.lang === l ? "1" : undefined}
                  aria-pressed={prefs.lang === l}
                  onClick={() => set("lang", l)}
                  title={LANG_NOTE[l]}
                  lang={l === "en" ? "en" : "he"}
                >
                  {LANG_HE[l]}
                </button>
              ))}
            </span>
            <button
              type="button"
              className="nu-filter"
              data-on={prefs.focus ? "1" : undefined}
              aria-pressed={prefs.focus}
              aria-label="מצב מיקוד"
              onClick={() => set("focus", !prefs.focus)}
              title="מצב מיקוד: פחות סביבה, אותו טקסט"
            >
              <Focus size={14} strokeWidth={1.9} aria-hidden="true" />
              <span className="nr-tool-l">מיקוד</span>
            </button>
            <button
              type="button"
              className="nu-filter"
              data-on={prefs.lens && !reduced ? "1" : undefined}
              aria-pressed={prefs.lens && !reduced}
              aria-label="עדשת קריאה"
              disabled={reduced}
              onClick={() => set("lens", !prefs.lens)}
              title={reduced
                ? "עדשת הקריאה מושבתת כי המערכת מבקשת פחות תנועה"
                : "עדשת קריאה: מבודדת חלון קריאה קצר; להגדלה השתמש בגודל הטקסט"}
            >
              <ScanLine size={14} strokeWidth={1.9} aria-hidden="true" />
              <span className="nr-tool-l">עדשה</span>
            </button>
            <span className="nr-steps" role="group" aria-label="גודל טקסט">
              <button
                type="button"
                className="nu-ghost"
                onClick={() => step("size", -1)}
                disabled={!canStep(prefs, "size", -1)}
                aria-label="הקטן טקסט"
                title={`גודל טקסט: ${SIZE_HE[prefs.size]}`}
              >
                <AArrowDown size={16} strokeWidth={1.9} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="nu-ghost"
                onClick={() => step("size", 1)}
                disabled={!canStep(prefs, "size", 1)}
                aria-label="הגדל טקסט"
                title={`גודל טקסט: ${SIZE_HE[prefs.size]}`}
              >
                <AArrowUp size={16} strokeWidth={1.9} aria-hidden="true" />
              </button>
            </span>
            <span className="nr-steps nr-steps--wide" role="group" aria-label="רוחב הטור">
              <button
                type="button"
                className="nu-ghost"
                onClick={() => step("measure", -1)}
                disabled={!canStep(prefs, "measure", -1)}
                aria-label="הצר את הטור"
                title={`רוחב הטור: ${MEASURE_HE[prefs.measure]}`}
              >
                <Minus size={15} strokeWidth={2} aria-hidden="true" />
              </button>
              <AlignJustify size={14} strokeWidth={1.9} aria-hidden="true" />
              <button
                type="button"
                className="nu-ghost"
                onClick={() => step("measure", 1)}
                disabled={!canStep(prefs, "measure", 1)}
                aria-label="הרחב את הטור"
                title={`רוחב הטור: ${MEASURE_HE[prefs.measure]}`}
              >
                <Plus size={15} strokeWidth={2} aria-hidden="true" />
              </button>
            </span>
            <button
              type="button"
              className="nu-filter nr-tool-min"
              data-on={prefs.lead === "air" ? "1" : undefined}
              aria-pressed={prefs.lead === "air"}
              aria-label="רווח שורות מוגדל"
              onClick={() => set("lead", prefs.lead === "air" ? "normal" : "air")}
              title={`רווח שורות: ${LEAD_HE[prefs.lead]}`}
            >
              <AlignJustify size={14} strokeWidth={1.9} aria-hidden="true" />
              <span className="nr-tool-l">רווח</span>
            </button>
            <button
              type="button"
              className="nu-filter nr-tool-min"
              data-on={prefs.paper ? "1" : undefined}
              aria-pressed={prefs.paper}
              aria-label="גוון נייר"
              onClick={() => set("paper", !prefs.paper)}
              title="גוון נייר: חם יותר, רק על משטח הקריאה"
            >
              <Sun size={14} strokeWidth={1.9} aria-hidden="true" />
              <span className="nr-tool-l">נייר</span>
            </button>
            <button
              type="button"
              className="nu-ghost nr-tool-min"
              onClick={reset}
              title="אפס את הגדרות הקריאה"
              aria-label="אפס את הגדרות הקריאה"
            >
              <RotateCcw size={14} strokeWidth={1.9} aria-hidden="true" />
            </button>
          </div>
        </div>

        <ProgressStrip chapter={chapter} progress={progress} />
      </div>

      {/* ---------------------------------------------------------- resume */}
      {resumeLine && !resumed && !moved && (
        <div className="nr-resume" role="status">
          <span className="nr-resume-t">
            הפעם הקודמת הסתיימה כאן: <b>{resumeLine}</b>
          </span>
          <span className="nr-resume-a">
            <button
              type="button"
              className="nu-btn"
              onClick={() => { goTo(opening.chapter ?? chapter.n, opening.section); setResumed(true); }}
            >
              המשך מכאן
            </button>
            <button
              type="button"
              className="nu-btn2"
              onClick={() => { goTo(chapter.n, null); setResumed(true); }}
            >
              התחל את הפרק מחדש
            </button>
          </span>
          <span className="nr-resume-n">
            הפרק כבר פתוח; הכפתור מדלג אל תת-הפרק עצמו. המיקום נשמר ברמת פרק ותת-פרק בלבד: אין כאן שחזור מדויק של
            מיקום גלילה, והקורא לא יבטיח מה שאינו יכול לקיים.
          </span>
        </div>
      )}

      {/* ------------------------------------------------------------ body */}
      {/* The reading column comes FIRST in the DOM and in the grid: it owns the
          `1fr` track and the reader reaches it before the instrumentation. The
          rail follows and takes the fixed track at the inline end. */}
      <div className="nr-body">
        <div className="nr-col">
          {/* Keyed by chapter so the page cue replays on every turn. */}
          <div className="nr-sheet" ref={sheetRef} key={chapter.n}>
            <header className="nr-ch-head">
              <p className="nr-eye">
                <span className="nu-chip is-sap">{book.module}</span>
                <span className="nu-chip">{book.moduleHe}</span>
                <span className="nu-chip">{book.structureHe}</span>
              </p>
              <h1 className="nr-ch-t">
                <span className="nr-ch-n">פרק {n(chapter.n)}</span>
                {chapter.title}
              </h1>
              <p className="nr-ch-m">
                {chapter.sections.length
                  ? `${n(chapter.sections.length)} תת-פרקים`
                  : "אין תת-פרקים בנתוני הספר לפרק זה"}
                {chapter.startPage !== null && ` · מתחיל בעמ׳ ${n(chapter.startPage)}`}
                {` · פרק ${n(progress.chapterOrdinal)} מתוך ${n(book.chapters.length)}`}
              </p>
            </header>

            {/* The strip that used to stand here has become a SENTENCE. The
                scans themselves are now inside the subchapters they belong to,
                which is where an illustration is worth anything; this line only
                says how many there are and offers the whole set at once for a
                reader who wants to flip through them. */}
            {plan.ordered.length > 0 && (
              <p className="nr-figline">
                <Images size={14} strokeWidth={1.9} aria-hidden="true" />
                <span>
                  {n(plan.ordered.length)} איורים סרוקים בפרק, משובצים בגוף הטקסט לפי עמוד המקור שלהם
                  {plan.tail.length > 0 && ` · ${n(plan.tail.length)} מהם בסוף הפרק, בלי שיבוץ`}
                </span>
                <button type="button" className="nu-ghost nr-figline-b" onClick={() => setFigAt(0)}>
                  פתח את כל האיורים
                </button>
              </p>
            )}

            {load === "loading" && (
              <p className="nr-load" aria-live="polite">
                <Loader2 size={15} strokeWidth={2} aria-hidden="true" />
                טוען את גוף הפרק…
              </p>
            )}

            {/* A chapter whose shard could not be read at all, said plainly and
                separated from the real state below it — a chapter that simply
                holds no prose. */}
            {ready && pack.failed && (
              <div className="nr-err" role="alert">
                <p>לא הצלחתי לקרוא את קובץ הפרק מהמאגר. הכותרות למטה הן מבנה הספר עצמו, בלי גוף הטקסט.</p>
                <button type="button" className="nu-btn2" onClick={() => setReload((v) => v + 1)}>
                  נסה שוב
                </button>
              </div>
            )}

            {/* THE CHAPTER'S OWN OPENING.
                The author's passage before the first numbered section. It sits
                where the book puts it — above section 1, below the chapter
                heading — and it is NOT a section: it has no id, it is not in
                the table of contents, and it does not move any section count
                or progress figure.

                English-only, because that is what the source holds. The Hebrew
                side is deliberately not filled with anything. */}
            {chapter.intro?.en ? (
              <div className="nr-intro" role="note" aria-label="פתיח הפרק">
                <p className="nr-intro-l">פתיח הפרק · מהמקור</p>
                <p className="nr-intro-t" dir="ltr" lang="en">{chapter.intro.en}</p>
              </div>
            ) : null}

            {chapter.sections.length === 0 ? (
              <p className="nr-none">
                בנתוני הספר אין תת-פרקים לפרק הזה. זהו מצב אמיתי במאגר, לא תקלה: ולכן לא הומצאו כאן סעיפים.
              </p>
            ) : (
              chapter.sections.map((s, i) => (
                <SectionBlock
                  key={s.id}
                  section={s}
                  body={bodies[s.id]}
                  index={i}
                  count={chapter.sections.length}
                  active={i === index}
                  lang={prefs.lang}
                  figures={plan.bySection.get(i) ?? NO_PLACED}
                  onFigure={openFig}
                />
              ))
            )}

            <FigureTail figures={plan.tail} onOpen={openFig} />

            <nav className="nr-ends" aria-label="מעבר בין פרקים">
              {prevCh ? (
                <button type="button" className="nu-card nr-end" onClick={() => goTo(prevCh.n, null)}>
                  <span className="nr-end-k"><ChevronRight size={14} strokeWidth={2} aria-hidden="true" />הפרק הקודם</span>
                  <span className="nr-end-t">{prevCh.n} · {prevCh.title}</span>
                </button>
              ) : <span className="nr-end nr-end--none">זהו הפרק הראשון בספר.</span>}
              {nextCh ? (
                <button type="button" className="nu-card nr-end nr-end--next" onClick={() => goTo(nextCh.n, null)}>
                  <span className="nr-end-k">הפרק הבא<ChevronLeft size={14} strokeWidth={2} aria-hidden="true" /></span>
                  <span className="nr-end-t">{nextCh.n} · {nextCh.title}</span>
                </button>
              ) : <span className="nr-end nr-end--none">זהו הפרק האחרון בספר.</span>}
            </nav>

            <footer className="nr-foot">
              <p>
                הטקסט, הפרקים ותת-הפרקים נקראים ממאגר הספרים של הפרויקט. הקורא הקנוני של הפרויקט ממשיך לפעול ללא שינוי:
                {" "}
                <Link className="nu-link" href={book.libraryHref} prefetch={false}>{book.libraryHref}</Link>
              </p>
              <p>
                {book.publisher ?? "ללא מוציא לאור במטא-דאטה"}
                {book.pages === null ? " · עמודים לא מתועדים" : ` · ${n(book.pages)} עמ׳`}
                {` · ${n(book.chapters.length)} פרקים · ${n(book.totalSections)} תת-פרקים`}
              </p>
            </footer>
          </div>
        </div>

        <ProgressRail
          book={book}
          chapter={chapter}
          progress={progress}
          read={evidence?.read ?? []}
          bookmarks={bookmarks}
          onChapter={(x) => goTo(x, null)}
          activeSection={activeSection}
          onGo={goTo}
        />
      </div>

      {/* --------------------------------------------------------- section */}
      {/* THE LOGICAL STEP. Not "next page" — the next SUBCHAPTER in the book's
          own order, which crosses into the next chapter when this one runs out.
          The control names its destination and says when it leaves the chapter,
          so the crossing is a decision and not a surprise. At the two ends of
          the book the control is disabled and says why, rather than wrapping
          round to the beginning. */}
      <div className="nr-dock">
        <button
          type="button"
          className="nu-btn2 nr-dock-b"
          onClick={() => prev && goTo(prev.chapter, prev.sectionId)}
          disabled={!prev}
          aria-label={prevAt
            ? `לתת-הפרק הקודם: ${prevAt.title}${prevAt.crosses ? ` (פרק ${prevAt.chapter})` : ""}`
            : "זוהי תחילת הספר"}
          title={prevAt
            ? `${prevAt.crosses ? `פרק ${prevAt.chapter} · ` : ""}${prevAt.title}`
            : "זוהי תחילת הספר"}
        >
          <ChevronRight size={15} strokeWidth={2} aria-hidden="true" />
          <span className="nr-dock-s">
            <span className="nr-dock-k">{prevAt?.crosses ? "הפרק הקודם" : "הקודם"}</span>
            <span className="nr-dock-t">{prevAt ? prevAt.title : "תחילת הספר"}</span>
          </span>
        </button>
        <button type="button" className="nu-ghost nr-dock-c" onClick={() => setPanel("map")}>
          <BookOpen size={14} strokeWidth={1.9} aria-hidden="true" />
          {pct(progress.book)}% מהספר
        </button>
        <button
          type="button"
          className="nu-btn2 nr-dock-b nr-dock-b--next"
          onClick={() => next && goTo(next.chapter, next.sectionId)}
          disabled={!next}
          aria-label={nextAt
            ? `לתת-הפרק הבא: ${nextAt.title}${nextAt.crosses ? ` (פרק ${nextAt.chapter})` : ""}`
            : "זהו סוף הספר"}
          title={nextAt
            ? `${nextAt.crosses ? `פרק ${nextAt.chapter} · ` : ""}${nextAt.title}`
            : "זהו סוף הספר"}
        >
          <span className="nr-dock-s">
            <span className="nr-dock-k">{nextAt?.crosses ? "הפרק הבא" : "הבא"}</span>
            <span className="nr-dock-t">{nextAt ? nextAt.title : "סוף הספר"}</span>
          </span>
          <ChevronLeft size={15} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      {prefs.focus && (
        <button type="button" className="nu-btn nr-unfocus" onClick={() => set("focus", false)}>
          <Focus size={14} strokeWidth={1.9} aria-hidden="true" />
          צא ממצב מיקוד
        </button>
      )}

      {prefs.lens && <ReadingLens reduced={reduced} band={200} />}

      {panel && (
        <ReaderPanel
          book={book}
          chapter={chapter}
          progress={progress}
          activeSection={activeSection}
          read={evidence?.read ?? []}
          bookmarks={bookmarks}
          tab={panel}
          onTab={setPanel}
          onClose={() => setPanel(null)}
          onGo={goTo}
          onUnmark={(c, s) => toggleBookmark(book.id, c, s)}
        />
      )}

      {/* The viewer is handed the PLAN's ordered list, not the raw fetch order:
          every index the page hands back — an inline figure, the tail, the
          "open all" control — is an index into that list. */}
      <FigureViewer
        open={figAt !== null}
        figs={plan.ordered}
        index={figAt ?? 0}
        onIndex={setFigAt}
        onClose={() => setFigAt(null)}
      />
    </div>
  );
}
