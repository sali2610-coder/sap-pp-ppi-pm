"use client";

// Project NEO · BOOKS / LEARNING and RECENT ACTIVITY — the last chapter.
//
// What changed in this pass: a book is a ROUTE now. lib/book-identity already
// maps a shelf entry onto the spine on disk, and app/neo/books/[bookId] already
// generates a page per spine, so workspace-data.ts resolves the pair and the
// row links to the book's own hub. A shelf entry with no spine keeps no link
// rather than getting a plausible one — the shelf route below still leads
// somewhere real for it.
//
// The claim itself has not been widened: the library index is a MODULE-level
// index, there is no table-to-chapter map in the project, and the chapter says
// so instead of implying a book covers a specific table.

import Link from "next/link";
import { ArrowLeft, BookOpen, GraduationCap, Library } from "lucide-react";
import type { WsData } from "./workspace-data";
import { Chapter, Sub, type ChapterMeta } from "./workspace-chapter";
import { WorkspaceRecent } from "./workspace-recent";

const nf = new Intl.NumberFormat("he-IL");

export function WorkspaceLearn({ d, meta }: { d: WsData; meta: ChapterMeta }) {
  const moduleNames = new Set(d.rows.map((r) => r.n));
  const pages = d.books.reduce((a, b) => a + b.pages, 0);

  return (
    <Chapter
      meta={meta}
      icon={<Library size={17} strokeWidth={1.75} />}
      lede={
        <>
          <b className="nw-sap">{nf.format(d.books.length)}</b> ספרים ו-
          <b className="nw-sap">{nf.format(d.courses.length)}</b> ספרי לימוד שהספרייה משייכת למודול הזה
          {pages ? <>, יחד {nf.format(pages)} עמודים</> : null}. השיוך הוא ברמת המודול — לפרויקט אין
          מיפוי של טבלה לפרק, ולכן לא נטען שספר מסוים מכסה טבלה מסוימת.
        </>
      }
      lead={
        <Link className="nu-btn2" href="/neo/library/" prefetch={false}>
          <Library size={15} strokeWidth={1.75} aria-hidden="true" />
          הספרייה הדיגיטלית
        </Link>
      }
    >
      <div className="nw-cols">
        <Sub id="nw-bk-h" icon={<BookOpen size={13} strokeWidth={1.75} />} title="ספרים במודול">
          {d.books.length ? (
            <ul className="nw-rank nw-rank--tight">
              {d.books.map((b) =>
                b.href ? (
                  <li key={b.id}>
                    <Link className="nu-card nw-bookrow" href={b.href} prefetch={false}>
                      <b>{b.he}</b>
                      <span className="nw-sap">{b.title}</span>
                      <em>
                        {b.publisher} · {nf.format(b.chapters)} פרקים · {nf.format(b.pages)} עמודים
                      </em>
                      <ArrowLeft className="nu-arw nw-steparw" size={13} strokeWidth={2} aria-hidden="true" />
                    </Link>
                  </li>
                ) : (
                  // No spine on disk for this shelf entry, so no page was
                  // generated for it and it stays a record, not a link.
                  <li key={b.id}>
                    <span className="nw-bookrow nw-bookrow--flat">
                      <b>{b.he}</b>
                      <span className="nw-sap">{b.title}</span>
                      <em>
                        {b.publisher} · {nf.format(b.chapters)} פרקים · {nf.format(b.pages)} עמודים
                      </em>
                    </span>
                  </li>
                ),
              )}
            </ul>
          ) : (
            <p className="nw-fine">אין ספר בספרייה המשויך למודול הזה.</p>
          )}

          {d.courses.length ? (
            <>
              <h3 className="nw-sub-h nw-sub-h--2" id="nw-cs-h">
                <span className="nw-sub-ico" aria-hidden="true">
                  <GraduationCap size={13} strokeWidth={1.75} />
                </span>
                ספרי לימוד באקדמיה
              </h3>
              <ul className="nw-rank nw-rank--tight" aria-labelledby="nw-cs-h">
                {d.courses.map((c) => (
                  <li key={c.id}>
                    <Link className="nu-card nw-courserow" href={c.href} prefetch={false}>
                      <b>{c.he}</b>
                      <em className="nw-sap">
                        {c.module} · {nf.format(c.chapters)} פרקים
                      </em>
                      <ArrowLeft className="nu-arw nw-steparw" size={13} strokeWidth={2} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </Sub>

        <WorkspaceRecent names={moduleNames} rows={d.rows} />
      </div>
    </Chapter>
  );
}
