"use client";

// Project NEO · BOOKS / LEARNING and RECENT ACTIVITY — the last block.
//
// Two lists that used to be two of the three cards in the header's context
// column. They belong at the END of the workspace, not beside the title: they
// are what you reach for after you have read the module, not before.
//
// Routes: an academy course carries its own chapter-route base from the
// registry, so the link is the registry's, not a reconstruction. The SAP PRESS
// shelf has no per-book route inside /neo, so the whole shelf leads to the
// library hub — one honest link instead of eleven that all land in the same
// place.

import Link from "next/link";
import { ArrowLeft, BookOpen, GraduationCap } from "lucide-react";
import type { WsData } from "./workspace-data";
import { WorkspaceRecent } from "./workspace-recent";

const nf = new Intl.NumberFormat("he-IL");

export function WorkspaceLearn({ d }: { d: WsData }) {
  const moduleNames = new Set(d.rows.map((r) => r.n));

  return (
    <section className="nw-block nw-block--split" aria-labelledby="nw-lrn-h">
      <div className="nw-block-h">
        <p className="nw-block-k">
          <BookOpen size={14} strokeWidth={1.75} aria-hidden="true" />
          ידע ופעילות
        </p>
        <h2 className="nw-block-t" id="nw-lrn-h">מה ללמוד הלאה, ואיפה הייתם</h2>
        <p className="nw-block-s">
          הספרים והקורסים שהספרייה משייכת למודול הזה, ולצידם האובייקטים שנפתחו כאן לאחרונה.
        </p>
      </div>

      <div className="nw-cols">
        <section className="nw-sub" aria-labelledby="nw-bk-h">
          <h3 className="nw-sub-h" id="nw-bk-h">
            <BookOpen size={13} strokeWidth={1.75} aria-hidden="true" />
            ספרים במודול
          </h3>
          {d.books.length ? (
            <ul className="nw-books">
              {d.books.map((b) => (
                <li key={b.id}>
                  <b>{b.he}</b>
                  <span className="nw-sap">{b.title}</span>
                  <em>
                    {b.publisher} · {nf.format(b.chapters)} פרקים · {nf.format(b.pages)} עמודים
                  </em>
                </li>
              ))}
            </ul>
          ) : (
            <p className="nw-fine">אין ספר בספרייה המשויך למודול הזה.</p>
          )}
          <Link className="nu-link" href="/neo/library/" prefetch={false}>
            הספרייה הדיגיטלית
            <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
          </Link>

          {d.courses.length ? (
            <>
              <h3 className="nw-sub-h nw-sub-h--2" id="nw-cs-h">
                <GraduationCap size={13} strokeWidth={1.75} aria-hidden="true" />
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
        </section>

        <WorkspaceRecent names={moduleNames} rows={d.rows} />
      </div>
    </section>
  );
}
