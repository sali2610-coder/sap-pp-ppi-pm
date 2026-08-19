"use client";

// THE REAL TABLE OF CONTENTS.
//
// Every row below is a row that exists in data/books/<id>.json. Chapter numbers,
// chapter titles, subchapter ids and subchapter titles are all read through the
// registry at build time (components/neo-shell/books/books-data.ts) and handed
// here as plain data. Nothing is grouped, renamed, merged, split or invented,
// and a chapter with no subchapters says so instead of showing a spinner.
//
// The two things this component is NOT:
//   · it is not a reader — it renders no prose and fetches no chapter shard
//   · it is not a second navigation model — every row is a link into the ONE
//     reading surface NEO owns, /neo/read/<id>/, in the location form that
//     reader's own opening resolver accepts (see ./links.ts)
//
// EVERY ROW IS A DESTINATION. A chapter opens the chapter; a subchapter lands on
// the subchapter itself. Both record where they were opened FROM (<OriginLink>,
// components/neo-shell/nav-context), so the reader's return control names the
// surface the reader actually came from instead of guessing a parent.
//
// Search is over THIS list only, and is labelled as such. The reader has its own
// prose; this list cannot see prose and does not pretend to.

import { useEffect, useMemo, useRef, useState, useId } from "react";
import { Bookmark, BookOpen, ChevronLeft, Search, X } from "lucide-react";
import { OriginLink, type OriginArg } from "@/components/neo-shell/nav-context";
import type { BookCard, SectionRow } from "./books-data";
import type { BookReading } from "./reading-state";
import { bookmarkedChapters, noteHandoff } from "./reading-state";
import { neoChapterHref, neoSectionHref } from "./links";

const nf = new Intl.NumberFormat("he-IL");

/** Accent-free, case-free contains. Hebrew and English titles sit in the same
 *  list, so the match has to work for both without a locale table. */
const hit = (hay: string, needle: string) => hay.toLowerCase().includes(needle);

interface Match {
  n: number;
  title: string;
  total: number;
  rows: SectionRow[];
  /** The chapter heading itself matched, so all of its rows are relevant. */
  whole: boolean;
}

export function BookToc({
  b,
  reading,
  resumeSection,
  variant = "panel",
  restoreOpen,
  origin,
}: {
  b: BookCard;
  reading: BookReading | undefined;
  /** The subchapter the reader was last on, highlighted in place. */
  resumeSection: string | null;
  variant?: "panel" | "hub";
  /** Chapters to reopen after a return, so coming back from the reader finds
   *  the list the way it was left.
   *
   *  It arrives LATE and not as an initial value, on purpose: the packet lives
   *  in sessionStorage and `useSyncExternalStore` renders the server snapshot
   *  (null) first so hydration matches, then re-renders with the real one. A
   *  `useState` initialiser would therefore always see `undefined`. */
  restoreOpen?: number[];
  /** Where this list is being read FROM, built at the moment a row is clicked.
   *  The function form is mandatory here: the open chapters and the canvas
   *  offset are only true at that instant. */
  origin: (live: { open: number[] }) => OriginArg;
}) {
  const [open, setOpen] = useState<number[]>([]);
  const [q, setQ] = useState("");
  const uid = useId();

  /* One shot. The packet is consumed by its owner on the render after a return,
     so `restoreOpen` goes back to undefined immediately — the latch is what
     stops that from closing the chapters again. */
  const restored = useRef(false);
  useEffect(() => {
    if (restored.current || !restoreOpen || restoreOpen.length === 0) return;
    restored.current = true;
    setOpen(restoreOpen.filter((n) => b.chapterRows.some((c) => c.n === n)));
  }, [restoreOpen, b.chapterRows]);

  const query = q.trim().toLowerCase();
  const read = useMemo(() => new Set(reading?.read ?? []), [reading]);
  const marks = useMemo(() => new Set(reading?.marks ?? []), [reading]);
  /* Two independent sources of "bookmarked", kept apart everywhere except here,
     where the question is only "does this row carry one". `marks` is the
     canonical reader's chapter bookmark; `bm` is a subchapter bookmark placed
     in NEO's reader, and the SET of exact locations is what puts the sign on
     the subchapter row rather than only on the chapter. */
  const bmChapters = useMemo(() => bookmarkedChapters(reading?.bookmarks ?? []), [reading]);
  const bmSections = useMemo(
    () => new Set((reading?.bookmarks ?? []).map((m) => m.section).filter((s): s is string => Boolean(s))),
    [reading],
  );

  const matches = useMemo<Match[]>(() => {
    if (!query) {
      return b.chapterRows.map((c) => ({ n: c.n, title: c.title, total: c.sections, rows: c.rows, whole: false }));
    }
    const out: Match[] = [];
    for (const c of b.chapterRows) {
      const whole = hit(c.title, query) || hit(String(c.n), query);
      const rows = whole ? c.rows : c.rows.filter(([id, t]) => hit(t, query) || hit(id, query));
      if (whole || rows.length) out.push({ n: c.n, title: c.title, total: c.sections, rows, whole });
    }
    return out;
  }, [b.chapterRows, query]);

  const found = useMemo(() => matches.reduce((n, m) => n + m.rows.length, 0), [matches]);

  const toggle = (n: number) => setOpen((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));

  return (
    <section className="nb-toc" aria-label="תוכן העניינים של הספר">
      <header className="nb-toc-h">
        <h3 className="nb-h3">
          תוכן העניינים
          <span>
            {b.chapters} פרקים · {nf.format(b.sections)} תת-פרקים, כפי שהם במאגר
          </span>
        </h3>

        <div className="nb-find">
          <Search size={14} strokeWidth={1.75} aria-hidden="true" />
          <input
            id={`${uid}-q`}
            className="nb-find-i"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="חיפוש בתוכן העניינים"
            aria-label="חיפוש בכותרות הפרקים ותתי-הפרקים של הספר הזה"
            autoComplete="off"
          />
          {q && (
            <button type="button" className="nu-ghost nb-find-x" onClick={() => setQ("")} aria-label="ניקוי החיפוש">
              <X size={14} strokeWidth={1.75} aria-hidden="true" />
            </button>
          )}
        </div>
      </header>

      {query && (
        <p className="nb-count" aria-live="polite">
          {found === 0
            ? "אין התאמה בכותרות של הספר הזה. החיפוש כאן הוא על תוכן העניינים בלבד ואינו קורא את גוף הטקסט."
            : `${nf.format(found)} תת-פרקים ב-${matches.length} פרקים`}
        </p>
      )}

      <ol className="nb-toc-l" data-v={variant}>
        {matches.map((m) => {
          const isOpen = Boolean(query) || open.includes(m.n);
          const done = read.has(m.n);
          return (
            <li className="nb-ch" key={m.n} data-open={isOpen ? "1" : undefined}>
              <div className="nb-ch-row">
                <button
                  type="button"
                  className="nb-ch-btn"
                  aria-expanded={isOpen}
                  aria-controls={`${uid}-c${m.n}`}
                  onClick={() => toggle(m.n)}
                  disabled={Boolean(query)}
                >
                  <ChevronLeft className="nb-ch-chev" size={15} strokeWidth={1.75} aria-hidden="true" />
                  <span className="nb-ch-num nb-sap">{String(m.n).padStart(2, "0")}</span>
                  <span className="nb-ch-name">{m.title}</span>
                  <span className="nb-ch-count nb-sap">{nf.format(m.total)}</span>
                </button>

                {(done || marks.has(m.n) || bmChapters.has(m.n)) && (
                  <span className="nu-status nb-ch-state" style={{ "--s": done ? "var(--status-done)" : "var(--status-tested)" } as React.CSSProperties}>
                    {done ? "נקרא" : "סימנייה"}
                  </span>
                )}

                <OriginLink
                  className="nu-ghost nb-ch-open"
                  href={neoChapterHref(b.id, m.n)}
                  origin={() => origin({ open })}
                  onClick={() => noteHandoff(b.id, m.n, null)}
                  aria-label={`פתיחת פרק ${m.n}, ${m.title}, בקורא`}
                >
                  <BookOpen size={14} strokeWidth={1.75} aria-hidden="true" />
                  <span className="nb-ch-open-t">פרק בקורא</span>
                </OriginLink>
              </div>

              {isOpen && (
                <div className="nb-ch-body" id={`${uid}-c${m.n}`}>
                  {m.rows.length === 0 ? (
                    <p className="nb-fine">לפרק הזה אין תת-פרקים במאגר.</p>
                  ) : (
                    <ul className="nb-sec-l">
                      {m.rows.map(([id, title]) => (
                        <li key={id}>
                          <OriginLink
                            className="nb-sec"
                            href={neoSectionHref(b.id, id)}
                            origin={() => origin({ open })}
                            aria-current={resumeSection === id ? "true" : undefined}
                            data-mark={bmSections.has(id) ? "1" : undefined}
                            onClick={() => noteHandoff(b.id, m.n, id)}
                          >
                            <span className="nb-sec-id nb-sap">{id}</span>
                            <span className="nb-sec-t">{title}</span>
                            {bmSections.has(id) && (
                              <span className="nb-sec-bm" title="סימנייה שהונחה בקורא של NEO">
                                <Bookmark size={12} strokeWidth={2.2} aria-hidden="true" />
                                <span className="nb-sr">סימנייה</span>
                              </span>
                            )}
                          </OriginLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {/* The old caveat here belonged to the canonical reader's `?s=` lander,
          which accepts dotted numbers only and therefore could not address
          book7's Fiori app ids. These rows open NEO's reader, whose opening
          resolver matches the id against the book's real sections — so the
          landing is exact for every book and the caveat no longer applies.
          `b.exactNote` still describes /library/ accurately and is still
          printed there, by the hub, beside the canonical reader's own link. */}
      <p className="nb-fine nb-toc-note">
        כל שורה כאן נפתחת בקורא של Project NEO במיקום עצמו: פרק על הפרק, תת-פרק על תת-הפרק.
      </p>
    </section>
  );
}
