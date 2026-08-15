// Project NEO · the MODULE CHAPTER — the one shape every region below the hero
// is built from.
//
// The client's complaint about the previous pass, verbatim: "Below the hero they
// are too dense. Controls are too small. Rows are too tight. Hierarchy is weak.
// Too many equal-weight elements. The page feels compressed. The user cannot
// clearly understand the next action."
//
// Every one of those is a hierarchy failure, not a spacing failure, so the fix
// is a single dominant unit instead of a wall of equal blocks. A chapter is:
//
//   · a NUMBER      large, module-tinted, so the eye can count the page
//   · a KICKER      icon + one uppercase word-pair, the category
//   · a TITLE       the biggest type below the hero. One line of intent.
//   · a LEDE        one sentence of orientation, never a caption
//   · a LEAD        the one route this chapter wants you to take next, as a
//                   .nu-btn2 / .nu-link from app/neo/ui.css. Optional, and
//                   omitted rather than invented when the chapter has none.
//
// There is exactly one heading level per chapter (h2) and one per sub-block
// (h3). Nothing else in the page is allowed to be bold at heading size, which
// is what makes a chapter readable as a chapter.
//
// COLOUR FORM RULE (app/globals.css, above --mod-pm): MODULE arrives as --m and
// is only ever a tint, a ring, a line, an edge or a section marker — here the
// number's tint, the kicker's rule and the chapter's top edge. STATUS never
// appears in this file. OBJECT hue is the data's own and is set by the caller.

import type { ReactNode } from "react";

export interface ChapterMeta {
  /** Anchor id. The page index jumps to it, so it is also the scroll target. */
  id: string;
  /** 1-based, contiguous, assigned by the page — a chapter with no data is not
   *  rendered at all and does not consume a number. */
  n: number;
  kicker: string;
  title: string;
  /** The count the index prints next to the chapter. Always a real number from
   *  the dataset; the label says what it counts. */
  count: number;
  countLabel: string;
}

export function Chapter({
  meta,
  icon,
  lede,
  lead,
  children,
  wide,
}: {
  meta: ChapterMeta;
  icon: ReactNode;
  lede: ReactNode;
  /** The chapter's next action. One control, not a toolbar. */
  lead?: ReactNode;
  children: ReactNode;
  /** The working table takes the canvas edge-to-edge for its sticky rail. */
  wide?: boolean;
}) {
  return (
    <section
      className={`nw-ch${wide ? " nw-ch--wide" : ""}`}
      id={meta.id}
      aria-labelledby={`${meta.id}-h`}
      data-ch={meta.n}
    >
      <header className="nw-ch-h">
        <span className="nw-ch-n" aria-hidden="true">{String(meta.n).padStart(2, "0")}</span>
        <p className="nw-ch-k">
          <span className="nw-ch-ico" aria-hidden="true">{icon}</span>
          {meta.kicker}
        </p>
        <h2 className="nw-ch-t" id={`${meta.id}-h`}>{meta.title}</h2>
        <p className="nw-ch-s">{lede}</p>
        {lead ? <p className="nw-ch-go">{lead}</p> : null}
      </header>
      <div className="nw-ch-body">{children}</div>
    </section>
  );
}

/** A sub-block inside a chapter. One h3, one rule, then content. Never a card:
 *  a card is reserved for something that is actually selectable. */
export function Sub({
  id,
  icon,
  title,
  note,
  children,
}: {
  id: string;
  icon?: ReactNode;
  title: string;
  note?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="nw-sub" aria-labelledby={id}>
      <h3 className="nw-sub-h" id={id}>
        {icon ? <span className="nw-sub-ico" aria-hidden="true">{icon}</span> : null}
        {title}
      </h3>
      {note ? <p className="nw-sub-s">{note}</p> : null}
      {children}
    </section>
  );
}
