"use client";

// THE BOOK HUB — a control surface for ONE book.
//
// The rule this file is written against: every control here maps to something
// the project can already do. Nothing is listed because it would be nice.
//
//   continue reading      → a stored location, resolved against this book's own
//                           chapters (./resume.ts). Absent when nothing is stored.
//   table of contents     → the real chapters and subchapters (./book-toc.tsx)
//   chapter selection     → /library/<id>/#ch-<n>, which chapter-reader expands
//   subchapter selection  → /library/<id>/?s=<id>, which book-reader lands on
//   search inside book    → over the TABLE OF CONTENTS, and labelled as such.
//                           The prose lives in per-chapter shards the reader
//                           fetches; this surface has none of it and says so.
//   open canonical reader → /library/<id>/, unchanged
//
// Things deliberately absent because the project does not have them here:
// no notes, no highlights, no export, no per-subchapter progress, no rating, no
// "time left", no author (the metadata has a publisher and no author field).

import { useMemo } from "react";
import Link from "next/link";
import { ArrowUpLeft, BookOpen, Bookmark, ChevronRight, Layers, PlayCircle, Table2 } from "lucide-react";
import { BookCover } from "./book-cover";
import { BookToc } from "./book-toc";
import { noteHandoff, useReading } from "./reading-state";
import { resolveResume, resumeLine } from "./resume";
import type { BookHubData } from "./books-data";

const nf = new Intl.NumberFormat("he-IL");

export function BookHub({ d }: { d: BookHubData }) {
  const b = d.book;
  const ids = useMemo(() => [b.id], [b.id]);
  const reading = useReading(ids);
  const r = resolveResume(b, reading.map[b.id]);
  const line = resumeLine(r);
  const done = b.chapters > 0 && r.read >= b.chapters;

  return (
    <div className="nb nb-hub" style={{ "--m": b.mod } as React.CSSProperties}>
      <nav className="nb-crumb" aria-label="מיקום">
        <Link className="nu-link" href="/neo/books/" prefetch={false}>
          <ChevronRight className="nu-arw" size={14} strokeWidth={1.75} aria-hidden="true" />
          מדף הספרים
        </Link>
        <span className="nu-chip is-sap">{b.module}</span>
        <span className="nu-chip">{b.moduleHe}</span>
      </nav>

      <header className="nb-hub-top">
        <div className="nb-hub-cov">
          <BookCover b={b} size="entry" />
        </div>

        <div className="nb-hub-id">
          <p className="nb-eye">
            <span className="nb-sap">{b.module}</span>
            <i aria-hidden="true" />
            {b.moduleHe}
            {b.kindLabel && <><i aria-hidden="true" />{b.kindLabel}</>}
          </p>
          <h1 className="nb-hub-t">{b.titleHe || b.titleEn}</h1>
          {b.titleHe && <p className="nb-sheet-t2 nb-sap">{b.titleEn}</p>}
          <p className="nb-sheet-k">{b.structureHe}</p>

          <div className="nb-hub-chips">
            <span className="nu-chip is-sap">{b.chapters} פרקים</span>
            <span className="nu-chip is-sap">{nf.format(b.sections)} תת-פרקים</span>
            <span className="nu-chip is-sap">
              {b.pages === null ? "עמודים לא מתועדים" : `${nf.format(b.pages)} עמ׳`}
            </span>
            {b.figures !== null && <span className="nu-chip is-sap">{nf.format(b.figures)} איורים</span>}
            <span className="nu-chip">{b.publisher ?? "ללא מוציא לאור במטא-דאטה"}</span>
          </div>

          <p
            className="nu-status"
            style={{
              "--s": r.fresh
                ? "var(--status-not-started)"
                : done
                  ? "var(--status-done)"
                  : "var(--status-in-conversion)",
            } as React.CSSProperties}
          >
            {r.fresh
              ? "לא נפתח עדיין"
              : done
                ? `כל ${b.chapters} הפרקים סומנו כנקראו`
                : r.read > 0
                  ? `${r.read} מתוך ${b.chapters} פרקים סומנו כנקראו`
                  : "נפתח, ללא פרקים מסומנים"}
          </p>
          {!r.fresh && b.chapters > 0 && (
            <span className="nb-prog" aria-hidden="true" style={{ "--p": r.progress } as React.CSSProperties}>
              <i />
            </span>
          )}

          <div className="nb-hub-cta">
            {line && (
              <Link
                className="nu-btn"
                href={r.href}
                prefetch={false}
                onClick={() => noteHandoff(b.id, r.chapter, r.section)}
              >
                <PlayCircle size={15} strokeWidth={1.75} aria-hidden="true" />
                {r.exact ? "המשך מתת-הפרק האחרון" : "המשך מהפרק האחרון"}
              </Link>
            )}
            <Link
              className={line ? "nu-btn2" : "nu-btn"}
              href={b.href}
              prefetch={false}
              onClick={() => noteHandoff(b.id, null, null)}
            >
              <BookOpen size={15} strokeWidth={1.75} aria-hidden="true" />
              פתח בקורא
            </Link>
          </div>

          {line ? (
            <p className="nb-hub-res">
              <Bookmark size={13} strokeWidth={2} aria-hidden="true" />
              {line}
            </p>
          ) : (
            <p className="nb-fine">
              אין מיקום קריאה שמור לספר הזה. המיקום נשמר על ידי הקורא עצמו ברגע שקוראים בו.
            </p>
          )}
        </div>
      </header>

      <BookToc b={b} reading={reading.map[b.id]} resumeSection={r.section} variant="hub" />

      <section className="nb-link" aria-label="החיבור למילון NEO">
        <h2 className="nb-h3">החיבור ל-Project NEO</h2>
        {b.dict ? (
          <>
            <Link className="nb-dict" href={b.dict.href} prefetch={false}>
              <Table2 size={15} strokeWidth={1.75} aria-hidden="true" />
              <span className="nb-dict-t">
                מילון <span className="nb-sap">{b.dict.code}</span> · {b.dict.he}
              </span>
              <span className="nb-dict-n nb-sap">
                {nf.format(b.dict.tables)} טבלאות · {nf.format(b.dict.fields)} שדות
              </span>
              <ArrowUpLeft size={14} strokeWidth={1.75} aria-hidden="true" />
            </Link>
            {b.dict.caveat && <p className="nb-warn">{b.dict.caveat}</p>}
          </>
        ) : (
          <p className="nb-warn" data-empty="1">{b.dictNote}</p>
        )}
        {b.near && (
          <Link className="nb-dict" href={b.near.href} prefetch={false}>
            <Layers size={15} strokeWidth={1.75} aria-hidden="true" />
            <span className="nb-dict-t">{b.near.label}</span>
            <span className="nb-dict-n nb-sap">{nf.format(b.near.n)} אפליקציות מלאות</span>
            <ArrowUpLeft size={14} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        )}
      </section>

      {d.shelf.length > 0 && (
        <section className="nb-link" aria-label="ספרים נוספים במדף">
          <h2 className="nb-h3">
            על אותו מדף
            <span>
              <span className="nb-sap">{d.module.code}</span> · {d.module.he}
            </span>
          </h2>
          <div className="nb-hub-sib">
            {d.shelf.map((s) => (
              <Link className="nu-card nb-sib" key={s.id} href={s.hubHref} prefetch={false}>
                <span className="nb-sib-id nb-sap">{s.id}</span>
                <span className="nb-sib-t">{s.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer className="nb-foot">
        <Link className="nu-btn2" href="/neo/books/" prefetch={false}>
          <ChevronRight size={15} strokeWidth={1.75} aria-hidden="true" />
          חזרה למדף
        </Link>
        <p className="nb-credit">Project NEO · CBC Israel — פותח על ידי סאלי חליף · Web Coding</p>
      </footer>
    </div>
  );
}
