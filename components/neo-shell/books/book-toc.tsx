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
//   · it is not a second navigation model — every row is a plain <Link> to the
//     existing /library/<id>/ URL, in the deep-link form the reader itself
//     supports (see ./links.ts for which form and why)
//
// Search is over THIS list only, and is labelled as such. The canonical reader
// has its own in-book search over the prose; this one cannot see prose and does
// not pretend to.

import { useMemo, useState, useId } from "react";
import Link from "next/link";
import { BookOpen, ChevronLeft, Search, X } from "lucide-react";
import type { BookCard, SectionRow } from "./books-data";
import type { BookReading } from "./reading-state";
import { noteHandoff } from "./reading-state";
import { chapterHref, sectionHref } from "./links";

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
}: {
  b: BookCard;
  reading: BookReading | undefined;
  /** The subchapter the reader was last on, highlighted in place. */
  resumeSection: string | null;
  variant?: "panel" | "hub";
}) {
  const [open, setOpen] = useState<number[]>([]);
  const [q, setQ] = useState("");
  const uid = useId();

  const query = q.trim().toLowerCase();
  const read = useMemo(() => new Set(reading?.read ?? []), [reading]);
  const marks = useMemo(() => new Set(reading?.marks ?? []), [reading]);

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

                {(done || marks.has(m.n)) && (
                  <span className="nu-status nb-ch-state" style={{ "--s": done ? "var(--status-done)" : "var(--status-tested)" } as React.CSSProperties}>
                    {done ? "נקרא" : "סימנייה"}
                  </span>
                )}

                <Link
                  className="nu-ghost nb-ch-open"
                  href={chapterHref(b.href, m.n)}
                  prefetch={false}
                  onClick={() => noteHandoff(b.id, m.n, null)}
                  aria-label={`פתיחת פרק ${m.n} — ${m.title} — בקורא`}
                >
                  <BookOpen size={14} strokeWidth={1.75} aria-hidden="true" />
                  <span className="nb-ch-open-t">פרק בקורא</span>
                </Link>
              </div>

              {isOpen && (
                <div className="nb-ch-body" id={`${uid}-c${m.n}`}>
                  {m.rows.length === 0 ? (
                    <p className="nb-fine">לפרק הזה אין תת-פרקים במאגר.</p>
                  ) : (
                    <ul className="nb-sec-l">
                      {m.rows.map(([id, title]) => (
                        <li key={id}>
                          <Link
                            className="nb-sec"
                            href={sectionHref(b.href, id)}
                            prefetch={false}
                            aria-current={resumeSection === id ? "true" : undefined}
                            onClick={() => noteHandoff(b.id, m.n, id)}
                          >
                            <span className="nb-sec-id nb-sap">{id}</span>
                            <span className="nb-sec-t">{title}</span>
                          </Link>
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

      {!b.exact && b.exactNote && <p className="nb-warn nb-toc-note">{b.exactNote}</p>}
    </section>
  );
}
