"use client";

// THE BOOK HUB — a control surface for ONE book.
//
// The rule this file is written against: every control here maps to something
// the project can already do. Nothing is listed because it would be nice.
//
//   continue reading      → a stored location, resolved against this book's own
//                           chapters (./resume.ts). Absent when nothing is stored.
//   table of contents     → the real chapters and subchapters (./book-toc.tsx)
//   chapter selection     → /neo/read/<id>/?c=<n>, opened on that chapter
//   subchapter selection  → /neo/read/<id>/?s=<id>, landed on that subchapter
//   search inside book    → over the TABLE OF CONTENTS, and labelled as such.
//                           The prose lives in per-chapter shards the reader
//                           fetches; this surface has none of it and says so.
//   open the reader       → /neo/read/<id>/, NEO's own reading surface
//   canonical reader      → /library/<id>/, unchanged, named as itself
//
// THE HUB IS BOTH A DESTINATION AND A SENDER.
//   As a destination it renders <SmartReturn/>, so arriving from the shelf
//   returns to the shelf with the shelf's own filter and scroll.
//   As a sender every control that leaves for the reader is an <OriginLink/>
//   carrying this hub's identity and viewport, so the reader's return control
//   comes back to THIS book rather than to a computed parent.
//
// Things deliberately absent because the project does not have them here:
// no notes, no highlights, no export, no per-subchapter progress, no rating, no
// "time left", no author (the metadata has a publisher and no author field).

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowUpLeft, BookOpen, Bookmark, ChevronRight, Layers, PlayCircle, Table2 } from "lucide-react";
import {
  OriginLink, SmartReturn, restoreScroll, scrollOffset, useReturnState,
  type OriginArg,
} from "@/components/neo-shell/nav-context";
import { BookCover } from "./book-cover";
import { BookToc } from "./book-toc";
import { noteHandoff, useReading } from "./reading-state";
import { resolveResume, resumeLine, resumeScrollLine } from "./resume";
import { neoReadHref } from "./links";
import type { BookHubData } from "./books-data";

const nf = new Intl.NumberFormat("he-IL");

/** What the hub hands the reader so the reader can hand it back.
 *
 *  A `type` and not an `interface`, because the store's OriginState is an index
 *  signature and only a type alias gets the implicit one that satisfies it. The
 *  open chapters travel as STRINGS for the same reason: OriginStateValue admits
 *  `string[]` and not `number[]`, and the constraint is the store's, not this
 *  surface's, so the surface converts rather than widening the contract. */
type HubReturn = { id: string; y: number; open: string[] };

/** The surface name the reader addresses its return packet to. One name for the
 *  whole family; `id` inside the packet says WHICH book it was, so a packet left
 *  by book3 cannot rebuild book7's table of contents. */
const HUB_SURFACE = "neo:book";

export function BookHub({ d }: { d: BookHubData }) {
  const b = d.book;
  const ids = useMemo(() => [b.id], [b.id]);
  const reading = useReading(ids);
  const r = resolveResume(b, reading.map[b.id]);
  const line = resumeLine(r);
  const done = b.chapters > 0 && r.read >= b.chapters;
  const title = b.titleHe || b.titleEn;

  /* THE WAY BACK IN. Non-null exactly once, on the render after a return from
     the reader — and only when the packet was left by THIS book's hub. */
  const back = useReturnState<HubReturn>(HUB_SURFACE);
  const mine = back && back.id === b.id ? back : null;

  /* TWO FRAMES, NOT ONE. `restoreScroll` waits a frame of its own; this waits
     the frame before it, because the App Router resets the canvas to 0 as PART
     of the client-side navigation and does so after the first one. It is the
     same two-frame wait the shelf's own scroll memory is written against — see
     the long note in useShelfScroll (./book-shelf.tsx), which is where that was
     first diagnosed. The hub also grows after its first paint (the table of
     contents reopens the chapters the reader left open), so the second frame is
     earning its keep twice over. */
  useEffect(() => {
    if (!mine || typeof mine.y !== "number" || mine.y <= 0) return;
    let cancel = () => {};
    const id = requestAnimationFrame(() => { cancel = restoreScroll(mine.y); });
    return () => { cancelAnimationFrame(id); cancel(); };
  }, [mine]);

  /* WHERE THE READER IS BEING OPENED FROM. Built at the click and not at render:
     the canvas offset and the open chapters are only true at that instant. */
  const leaving = (open: number[] = []): OriginArg => ({
    to: neoReadHref(b.id),
    href: b.hubHref,
    label: "ספר",
    detail: title,
    surface: HUB_SURFACE,
    state: { id: b.id, y: scrollOffset(), open: open.map(String) } satisfies HubReturn,
  });

  /** The chapters to reopen, back as numbers and filtered to this book. */
  const reopen = useMemo(
    () => (mine ? mine.open.map(Number).filter((n) => Number.isFinite(n)) : undefined),
    [mine],
  );

  return (
    <div className="nb nb-hub" style={{ "--m": b.mod } as React.CSSProperties}>
      <nav className="nb-crumb" aria-label="מיקום">
        <SmartReturn fallback={{ href: "/neo/books/", label: "מדף הספרים" }} className="nb-crumb-back" />
        <span className="nu-chip is-sap">{b.module}</span>
        <span className="nu-chip">{b.moduleHe}</span>
      </nav>

      <header className="nb-hub-top">
        <div className="nb-hub-cov">
          {/* §4 — the hub IS the book, opened. The cover is hinged back on its
              binding and the column beside it is the endpaper, which is why the
              identity below sits on paper rather than on a card. */}
          <BookCover b={b} size="entry" open />
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

          {/* §4 — WHAT IS INDEXED, AND FROM WHERE. Two separate facts that are
              easy to conflate: how long the printed book is, and how much of it
              Project NEO actually holds. The second is the one that decides
              what the table of contents below can do, so it is stated. */}
          <p className="nb-fine nb-hub-src">
            {b.pages === null
              ? `אין ספירת עמודים במטא-דאטה של הספר הזה, ולכן אינה מוצגת. במאגר מתועדים ${b.chapters} פרקים ו-${nf.format(b.sections)} תת-פרקים.`
              : `${nf.format(b.pages)} עמודים לפי המטא-דאטה של הספר; במאגר מתועדים ${b.chapters} פרקים ו-${nf.format(b.sections)} תת-פרקים.`}
            {" "}
            המקור הוא מרשם הספרים של Project NEO, אותו מרשם שהקורא עצמו קורא ממנו.
          </p>

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

          {/* §7 — THE TWO WAYS IN, named as two ways in. Both open the SAME
              surface — /neo/read/<id>/ — and differ only in where they land.
              A · המשך קריאה — the stored location, and only when one resolves.
              B · פתיחת הספר — the reader from the top of the book.
              The canonical reader at /library/<id>/ is neither removed nor
              reimplemented; it is named as itself, below. */}
          <div className="nb-modes" aria-label="דרכי הכניסה לספר">
            {line && (
              <div className="nb-mode">
                <p className="nb-mode-k">א · המשך קריאה</p>
                <OriginLink
                  className="nu-btn"
                  href={r.neoHref}
                  origin={() => leaving()}
                  onClick={() => noteHandoff(b.id, r.chapter, r.section)}
                >
                  <PlayCircle size={15} strokeWidth={1.75} aria-hidden="true" />
                  {r.neoExact ? "המשך מתת-הפרק האחרון" : "המשך מהפרק האחרון"}
                </OriginLink>
                <p className="nb-hub-res">
                  <Bookmark size={13} strokeWidth={2} aria-hidden="true" />
                  {line}
                </p>
                {resumeScrollLine(r) && <p className="nb-fine">{resumeScrollLine(r)}</p>}
              </div>
            )}
            <div className="nb-mode">
              <p className="nb-mode-k">{line ? "ב · פתיחת הספר" : "פתיחת הספר"}</p>
              <OriginLink
                className={line ? "nu-btn2" : "nu-btn"}
                href={neoReadHref(b.id)}
                origin={() => leaving()}
                onClick={() => noteHandoff(b.id, null, null)}
              >
                <BookOpen size={15} strokeWidth={1.75} aria-hidden="true" />
                פתח בקורא של NEO
              </OriginLink>
              <p className="nb-fine">
                משטח הקריאה של Project NEO: תוכן העניינים, מפת ההתקדמות, מצב מיקוד, גודל הטקסט ורוחב הטור.
                {b.chapters > 0
                  ? ` הפתיחה היא בפרק ${b.chapterRows[0]?.n ?? 1}, אלא אם נשמר מיקום קודם.`
                  : " לספר הזה אין פרקים במאגר, והקורא יאמר זאת במפורש."}
              </p>
            </div>
          </div>

          {!line && (
            <p className="nb-fine">
              אין מיקום קריאה שמור לספר הזה. המיקום נשמר ברגע שקוראים בו בפועל.
            </p>
          )}

          {/* THE CANONICAL READER, named as itself and not as a second "open".
              It is a different surface with its own tools, it is unchanged by
              this stage, and its own deep-link limitation belongs to it — which
              is why b.exactNote is printed HERE and not over the table of
              contents, whose rows no longer go there. */}
          <p className="nb-fine nb-hub-alt">
            <Link className="nu-link" href={b.href} prefetch={false}>
              <ChevronRight className="nu-arw" size={13} strokeWidth={1.75} aria-hidden="true" />
              הקורא הקנוני של הפרויקט
            </Link>
            {" "}
            <span className="nb-sap">{b.href}</span> — ממשיך לפעול ללא שינוי.
            {!b.exact && b.exactNote ? ` ${b.exactNote}` : ""}
          </p>
        </div>
      </header>

      <BookToc
        b={b}
        reading={reading.map[b.id]}
        resumeSection={r.section}
        variant="hub"
        restoreOpen={reopen}
        origin={({ open }) => leaving(open)}
      />

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
              // A sibling hub is a hub too, so it renders the same return
              // control — and this is what gives it something true to say.
              <OriginLink
                className="nu-card nb-sib"
                key={s.id}
                href={s.hubHref}
                origin={() => ({ href: b.hubHref, label: "ספר", detail: title })}
              >
                <span className="nb-sib-id nb-sap">{s.id}</span>
                <span className="nb-sib-t">{s.title}</span>
              </OriginLink>
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
