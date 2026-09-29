"use client";

import Link from "next/link";
import { BookOpen, Table2 } from "lucide-react";
import { useRecent } from "../store";
import { useReading } from "../books/reading-state";
import { neoResumeHref } from "../books/links";

/* "Where you were": the book being read and the tables opened last, read from
   the stores the reader and the shelf already keep (books/reading-state.ts,
   store.ts). Nothing is written here. On a first visit there is nothing true
   to say, so the panel renders nothing at all; the server snapshot of both
   stores is empty, so the exported HTML never carries a private history. */
export function HomeContinue({
  books, tables,
}: {
  books: { id: string; title: string }[];
  tables: Record<string, string>;
}) {
  const reading = useReading(books.map((b) => b.id));
  const recent = useRecent();

  const bookId = reading.currentBook ?? reading.lastBook;
  const book = bookId ? books.find((b) => b.id === bookId) ?? null : null;
  const chapter = bookId ? reading.map[bookId]?.chapter ?? null : null;
  // The saved subchapter too, through the same link builder as the shelf's
  // "המשך קריאה": the chapter alone reopened 3.1 when the reader was at 3.6,
  // 28,000px back (gate 5, finding 4).
  const section = bookId ? reading.map[bookId]?.section ?? null : null;
  const objs = recent.names.filter((n) => n in tables).slice(0, 5);

  if (!book && objs.length === 0) return null;
  return (
    <section className="nh-cont" aria-labelledby="nh-cont-h">
      <h2 className="nh-h2" id="nh-cont-h">להמשיך מאיפה שהפסקת</h2>
      <div className="nh-cont-grid">
        {book ? (
          <Link className="nh-cont-book" prefetch={false} href={neoResumeHref(book.id, chapter, section)}>
            <BookOpen size={18} strokeWidth={1.75} aria-hidden="true" />
            <span>
              <b>{book.title}</b>
              <em>{chapter ? <>פרק {chapter}{section ? <> · <bdi>{section}</bdi></> : null}</> : "חזרה לספר"}</em>
            </span>
          </Link>
        ) : null}
        {objs.length ? (
          <div className="nh-cont-objs">
            <h3 className="nh-h3">טבלאות שנפתחו לאחרונה</h3>
            <ul>
              {objs.map((n) => (
                <li key={n}>
                  <Link prefetch={false} href={`/neo/tables/${n}/`}>
                    <Table2 size={16} strokeWidth={1.75} aria-hidden="true" />
                    <bdi className="nh-sap">{n}</bdi>
                    <span>{tables[n]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
