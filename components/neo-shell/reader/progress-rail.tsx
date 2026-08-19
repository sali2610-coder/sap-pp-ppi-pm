"use client";

/* ============================================================================
   PROJECT NEO · READER — the progress rail.
   ----------------------------------------------------------------------------
   The client's own words: the user must always know BOOK → CHAPTER → SECTION →
   CURRENT POSITION. So the rail carries all three at once and never hides one
   to make room for another.

   WHAT IT DRAWS, AND WHAT EACH MARK MEANS
     the track      the whole book, top to bottom, scaled by SUBCHAPTER COUNT.
                    A chapter with 40 subchapters is four times the height of a
                    chapter with 10, because that is four times the book.
     the fill       how far the reader has come, by subchapter ordinal.
     the ticks      real chapter boundaries. Each is a button: it goes to that
                    chapter. There are no invented divisions between them.
     a read mark    a chapter the CANONICAL reader recorded as read
                    (neo:reader:<id>). Read-only evidence, never written here.
     a bookmark     a chapter holding at least one subchapter bookmark placed in
                    THIS reader (neo:books:v1). It rides the tick instead of
                    adding a second row of marks: it is a fact ABOUT a chapter,
                    and the tick already is the chapter.
     the head       the exact position, as a line across the track.

   Below the track, two compact meters give the two smaller scales their own
   number, because "62% of the book" does not answer "how far into this chapter
   am I". Nothing is animated except transform and opacity.
   ========================================================================== */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Bookmark, BookOpen, Check, ChevronDown, Layers, Rows3 } from "lucide-react";
import { bookmarkedChapters, type NeoBookmark } from "@/components/neo-shell/books/reading-state";
import type { NRBook, NRChapter } from "./types";
import { chapterAt, chapterSpan, n, pct, type NRProgress } from "./progress";

interface RailProps {
  book: NRBook;
  chapter: NRChapter;
  progress: NRProgress;
  /** Chapter numbers the canonical reader marked as read. Evidence, not ours. */
  read: number[];
  /** Subchapter bookmarks placed in this reader. */
  bookmarks: NeoBookmark[];
  onChapter: (n: number) => void;
  /** The subchapter in view, so the tree can mark it. */
  activeSection: string | null;
  /** Navigation to a real row of this book. */
  onGo: (chapter: number, sectionId: string | null) => void;
}

/* ---------------------------------------------------------- the rail tree */

/**
 * CHAPTERS AND SUBCHAPTERS, IN THE RAIL ITSELF.
 *
 * The panel behind "תוכן" already holds the whole table of contents, but a
 * navigator you have to open is a navigator you stop using. This is the same
 * real structure, permanently beside the text: every chapter of the book, every
 * subchapter of the chapter you have expanded, the row you are reading marked,
 * and a live fill on the chapter you are in.
 *
 * TWO CONTROLS PER CHAPTER, ON PURPOSE. The title goes to the chapter; the
 * chevron only folds it. One control that did both would mean you could not look
 * ahead at a chapter's contents without leaving the page you are on.
 *
 * NOTHING HERE IS INVENTED. The rows are data/books/<id>.json's own chapters and
 * sections; the read ticks are the canonical reader's record; the bookmark marks
 * are this reader's. A chapter with no subchapters says so instead of showing an
 * empty list.
 */
function RailTree({
  book,
  chapter,
  progress,
  read,
  marked,
  activeSection,
  onGo,
}: {
  book: NRBook;
  chapter: NRChapter;
  progress: NRProgress;
  read: number[];
  marked: Set<number>;
  activeSection: string | null;
  onGo: (chapter: number, sectionId: string | null) => void;
}) {
  /* Folded state, per chapter. Seeded empty and read through a fallback rather
     than pre-filled: the chapter you are IN is open unless you folded it
     yourself, so arriving at a new chapter never needs an effect to open it. */
  const [folded, setFolded] = useState<Record<number, boolean>>({});
  const [peeked, setPeeked] = useState<Record<number, boolean>>({});
  const isOpen = useCallback(
    (c: NRChapter) => (c.n === chapter.n ? !folded[c.n] : Boolean(peeked[c.n])),
    [chapter.n, folded, peeked],
  );

  /* The row being read, brought into the rail's own scroll box. `nearest` so a
     row already in view does not jump, and `block` only — the rail is a column
     and a horizontal correction here would fight the page. */
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const box = listRef.current;
    if (!box) return;
    const el = box.querySelector<HTMLElement>('[data-now="1"]');
    if (!el) return;
    const b = box.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    if (r.top >= b.top && r.bottom <= b.bottom) return;
    box.scrollTop += r.top - b.top - b.height / 2 + r.height / 2;
  }, [chapter.n, activeSection]);

  return (
    <div className="nr-rtoc" ref={listRef}>
      <ol className="nr-rtoc-l">
        {book.chapters.map((c) => {
          const here = c.n === chapter.n;
          const open = isOpen(c);
          const done = read.includes(c.n);
          return (
            <li key={c.n} className="nr-rtoc-ch" data-on={here ? "1" : undefined}>
              <div className="nr-rtoc-hd">
                <button
                  type="button"
                  className="nr-rtoc-fold"
                  aria-expanded={open}
                  aria-label={`${open ? "קפל" : "פרוש"} את תת-הפרקים של פרק ${c.n}`}
                  onClick={() =>
                    here
                      ? setFolded((s) => ({ ...s, [c.n]: !s[c.n] }))
                      : setPeeked((s) => ({ ...s, [c.n]: !s[c.n] }))
                  }
                  disabled={c.sections.length === 0}
                  title={c.sections.length === 0 ? "לפרק זה אין תת-פרקים בנתוני הספר" : undefined}
                >
                  <ChevronDown size={13} strokeWidth={2.2} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="nr-rtoc-t"
                  data-now={here && !activeSection ? "1" : undefined}
                  aria-current={here ? "true" : undefined}
                  onClick={() => onGo(c.n, null)}
                  title={`פרק ${c.n} · ${c.title}`}
                >
                  <span className="nr-rtoc-n">{c.n}</span>
                  <span className="nr-rtoc-tt">{c.title}</span>
                  {marked.has(c.n) && (
                    <Bookmark className="nr-rtoc-i" size={11} strokeWidth={2.4} aria-hidden="true" />
                  )}
                  {done && (
                    <Check className="nr-rtoc-i nr-rtoc-i--read" size={11} strokeWidth={2.6} aria-hidden="true" />
                  )}
                </button>
              </div>
              {/* The live fill, on the chapter that is open. Every other chapter
                  gets no bar at all rather than a guessed one: the reader knows
                  how far it is through the chapter it is IN, and knows which
                  chapters the canonical reader recorded as read. It does not know
                  how much of chapter 7 you happened to see last March. */}
              {here && (
                <span className="nr-rtoc-bar" aria-hidden="true">
                  <i style={{ "--v": progress.chapter } as React.CSSProperties} />
                </span>
              )}
              {open && (
                c.sections.length ? (
                  <ol className="nr-rtoc-s">
                    {c.sections.map((s) => {
                      const now = here && s.id === activeSection;
                      return (
                        <li key={s.id}>
                          <button
                            type="button"
                            className="nr-rtoc-sec"
                            data-now={now ? "1" : undefined}
                            aria-current={now ? "true" : undefined}
                            onClick={() => onGo(c.n, s.id)}
                            title={`${s.id} · ${s.title}`}
                          >
                            <span className="nr-rtoc-sid">{s.id}</span>
                            <span className="nr-rtoc-st">{s.title}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                ) : (
                  <p className="nr-rtoc-none">אין תת-פרקים בנתוני הספר לפרק הזה.</p>
                )
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------ desktop rail */

export function ProgressRail({
  book,
  chapter,
  progress,
  read,
  bookmarks,
  onChapter,
  activeSection,
  onGo,
}: RailProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<{ y: number; ch: NRChapter } | null>(null);
  const marked = useMemo(() => bookmarkedChapters(bookmarks), [bookmarks]);

  const chapterAtRatio = useCallback(
    (r: number): NRChapter => {
      const target = r * book.totalSections;
      for (const c of book.chapters) {
        if (target < c.before + c.sections.length) return c;
      }
      return book.chapters[book.chapters.length - 1];
    },
    [book],
  );

  const ratioOf = useCallback((clientY: number): number => {
    const el = trackRef.current;
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientY - r.top) / Math.max(1, r.height)));
  }, []);

  return (
    <aside className="nr-rail" aria-label="התקדמות בקריאה">
      <div className="nr-rail-head">
        <span className="nr-rail-pct" aria-hidden="true">{pct(progress.book)}<i>%</i></span>
        <span className="nr-rail-cap">מהספר</span>
      </div>

      <div
        className="nr-track"
        ref={trackRef}
        role="group"
        aria-label={`מסלול הספר: ${book.chapters.length} פרקים`}
        onPointerMove={(e) => {
          if (book.totalSections === 0) return;
          const r = ratioOf(e.clientY);
          setHover({ y: r, ch: chapterAtRatio(r) });
        }}
        onPointerLeave={() => setHover(null)}
        onClick={(e) => {
          if (book.totalSections === 0) return;
          onChapter(chapterAtRatio(ratioOf(e.clientY)).n);
        }}
      >
        <span className="nr-track-bed" aria-hidden="true" />

        {/* The chapter currently open, as a band — so the reader can see how
            much of the book this one chapter actually is. */}
        <span
          className="nr-track-band"
          aria-hidden="true"
          style={{
            "--at": chapterAt(book, chapter),
            "--span": chapterSpan(book, chapter),
          } as React.CSSProperties}
        />

        <span
          className="nr-track-fill"
          aria-hidden="true"
          style={{ "--v": progress.book } as React.CSSProperties}
        />

        {book.chapters.map((c) => {
          const on = c.n === chapter.n;
          const bm = marked.has(c.n);
          return (
            <button
              type="button"
              key={c.n}
              className="nr-tick"
              data-on={on ? "1" : undefined}
              data-read={read.includes(c.n) ? "1" : undefined}
              data-mark={bm ? "1" : undefined}
              style={{ "--at": chapterAt(book, c) } as React.CSSProperties}
              aria-current={on ? "true" : undefined}
              onClick={(e) => { e.stopPropagation(); onChapter(c.n); }}
              title={`פרק ${c.n} · ${c.title}${bm ? " · סימנייה" : ""}`}
            >
              <span className="nr-sr">
                {`פרק ${c.n} · ${c.title}${bm ? " · מכיל סימנייה" : ""}`}
              </span>
            </button>
          );
        })}

        <span
          className="nr-now"
          aria-hidden="true"
          style={{ "--v": progress.book } as React.CSSProperties}
        />

        {hover && (
          <span className="nr-tip" style={{ "--at": hover.y } as React.CSSProperties}>
            <b>פרק {hover.ch.n}</b>
            <i>{hover.ch.title}</i>
          </span>
        )}
      </div>

      <RailTree
        book={book}
        chapter={chapter}
        progress={progress}
        read={read}
        marked={marked}
        activeSection={activeSection}
        onGo={onGo}
      />

      <div className="nr-meters">
        <Meter
          icon={<Layers size={13} strokeWidth={1.9} aria-hidden="true" />}
          label="בפרק"
          value={progress.chapter}
          note={chapter.sections.length ? `${n(Math.min(progress.ordinal - chapter.before, chapter.sections.length))}/${n(chapter.sections.length)}` : "—"}
        />
        <Meter
          icon={<Rows3 size={13} strokeWidth={1.9} aria-hidden="true" />}
          label="בתת-פרק"
          value={progress.section}
          note={`${pct(progress.section)}%`}
        />
        <Meter
          icon={<BookOpen size={13} strokeWidth={1.9} aria-hidden="true" />}
          label="בספר"
          value={progress.book}
          note={book.totalSections ? `${n(progress.ordinal)}/${n(book.totalSections)}` : "—"}
        />
      </div>

      {/* Only when there are any. An empty count is not a state worth a row. */}
      {bookmarks.length > 0 && (
        <p className="nr-rail-bm">
          <Bookmark size={12} strokeWidth={2} aria-hidden="true" />
          {n(bookmarks.length)}
          <span className="nr-sr"> סימניות בספר הזה</span>
        </p>
      )}
    </aside>
  );
}

function Meter({ icon, label, value, note }: { icon: React.ReactNode; label: string; value: number; note: string }) {
  return (
    <div className="nr-meter">
      <span className="nr-meter-t">{icon}{label}</span>
      <span
        className="nr-meter-bar"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct(value)}
      >
        <i style={{ "--v": value } as React.CSSProperties} />
      </span>
      <span className="nr-meter-n">{note}</span>
    </div>
  );
}

/* ------------------------------------------------------------ mobile strip */

/**
 * The same three scales, in the height a phone can spare. It stays in the
 * sticky header rather than becoming a floating bar, so it can never sit on top
 * of the shell's own bottom navigation.
 */
export function ProgressStrip({ chapter, progress }: Pick<RailProps, "chapter" | "progress">) {
  const inChapter = chapter.sections.length
    ? `${n(Math.min(progress.ordinal - chapter.before, chapter.sections.length))}/${n(chapter.sections.length)}`
    : "—";
  return (
    <div className="nr-strip" aria-label="התקדמות בקריאה">
      <span className="nr-strip-seg" title="התקדמות בספר">
        <b>ספר</b>
        <span className="nr-strip-bar" role="progressbar" aria-label="התקדמות בספר" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct(progress.book)}>
          <i style={{ "--v": progress.book } as React.CSSProperties} />
        </span>
        <em>{pct(progress.book)}%</em>
      </span>
      <span className="nr-strip-seg" title="התקדמות בפרק">
        <b>פרק</b>
        <span className="nr-strip-bar" role="progressbar" aria-label="התקדמות בפרק" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct(progress.chapter)}>
          <i style={{ "--v": progress.chapter } as React.CSSProperties} />
        </span>
        <em>{inChapter}</em>
      </span>
      <span className="nr-strip-seg" title="התקדמות בתת-פרק">
        <b>תת-פרק</b>
        <span className="nr-strip-bar" role="progressbar" aria-label="התקדמות בתת-פרק" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct(progress.section)}>
          <i style={{ "--v": progress.section } as React.CSSProperties} />
        </span>
        <em>{pct(progress.section)}%</em>
      </span>
    </div>
  );
}
