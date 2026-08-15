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
     the head       the exact position, as a line across the track.

   Below the track, two compact meters give the two smaller scales their own
   number, because "62% of the book" does not answer "how far into this chapter
   am I". Nothing is animated except transform and opacity.
   ========================================================================== */

import { useCallback, useRef, useState } from "react";
import { BookOpen, Layers, Rows3 } from "lucide-react";
import type { NRBook, NRChapter } from "./types";
import { chapterAt, chapterSpan, n, pct, type NRProgress } from "./progress";

interface RailProps {
  book: NRBook;
  chapter: NRChapter;
  progress: NRProgress;
  /** Chapter numbers the canonical reader marked as read. Evidence, not ours. */
  read: number[];
  onChapter: (n: number) => void;
}

/* ------------------------------------------------------------ desktop rail */

export function ProgressRail({ book, chapter, progress, read, onChapter }: RailProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<{ y: number; ch: NRChapter } | null>(null);

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
        aria-label={`מסלול הספר — ${book.chapters.length} פרקים`}
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
          return (
            <button
              type="button"
              key={c.n}
              className="nr-tick"
              data-on={on ? "1" : undefined}
              data-read={read.includes(c.n) ? "1" : undefined}
              style={{ "--at": chapterAt(book, c) } as React.CSSProperties}
              aria-current={on ? "true" : undefined}
              onClick={(e) => { e.stopPropagation(); onChapter(c.n); }}
              title={`פרק ${c.n} · ${c.title}`}
            >
              <span className="nr-sr">{`פרק ${c.n} · ${c.title}`}</span>
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
export function ProgressStrip({ chapter, progress }: Omit<RailProps, "onChapter" | "read" | "book">) {
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
