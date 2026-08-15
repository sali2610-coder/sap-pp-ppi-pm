// Project NEO · the MODULE INDEX — "everything this module has, on one screen".
//
// The client's hard requirement for the module pages, verbatim: "EVERY important
// PM / PP-PI section must exist INSIDE the module workspace. Scrolling through
// PM should expose the complete module." The rail no longer carries the old
// sub-item tree and must not get it back, so the completeness has to live here.
//
// This band is that promise, stated once and made clickable: one tile per
// chapter of the page, each carrying the chapter's REAL count from the same
// server-built object the chapter renders from. A tile is a .nu-card — a whole
// selectable region — and it resolves to an in-page anchor that exists, because
// the list is built from the very same ChapterMeta array the page maps over.
// There is no second, hand-kept table of contents that can drift.
//
// It is also the answer to "the user cannot clearly understand the next action":
// the first thing under the hero is a menu of what this module contains.

import type { ChapterMeta } from "./workspace-chapter";

const nf = new Intl.NumberFormat("he-IL");

export function WorkspaceIndex({ chapters }: { chapters: ChapterMeta[] }) {
  return (
    <nav className="nw-idx" aria-label="פרקי המודול">
      <p className="nw-idx-h">
        <span className="nw-idx-k">מה יש בעמוד הזה</span>
        <span className="nw-idx-s">
          {nf.format(chapters.length)} פרקים. כל אחד מהם נבנה מהמילון של המודול — ומה שהמילון אינו מחזיק,
          לא מופיע כאן.
        </span>
      </p>
      <ol className="nw-idx-l">
        {chapters.map((c) => (
          <li key={c.id}>
            <a className="nu-card nw-idx-i" href={`#${c.id}`}>
              <span className="nw-idx-n nw-sap" aria-hidden="true">{String(c.n).padStart(2, "0")}</span>
              <span className="nw-idx-t">{c.title}</span>
              <span className="nw-idx-c">
                <b className="nw-sap">{nf.format(c.count)}</b>
                <em>{c.countLabel}</em>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
