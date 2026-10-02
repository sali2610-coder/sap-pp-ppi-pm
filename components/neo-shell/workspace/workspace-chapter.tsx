"use client";

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
//
// MOTION (app/neo/motion.css, level 3 on these two routes — "medium; must stay
// easy to study"). The head is the only part of a chapter that moves, and it
// moves once, on the way in:
//   · the NUMBER drifts against the scroll (.nm-par-slow). At L3 that is 14px
//     over a whole viewport pass and 0 on a touch canvas — a depth cue, not an
//     effect, and it is applied to the one element on the page that carries no
//     information a reader has to track.
//   · the TITLE arrives as language (.nm-kin), which is why it is wrapped in the
//     span/span the primitive requires: the outer span is the mask, the inner
//     one is what rises out of it.
//   · the kicker fades and the lede rises, both scrubbed by their own passage.
// Nothing below the head animates: the reader is studying it.
//
// THE GROUND. A chapter may wear one of ground.css's five scenes through
// meta.scene. The attribute alone re-points the scene tokens; painting is the
// stylesheet's job. This is also what lets the shell's scene observer hand the
// ground back after a section has taken a different one.

import { useEffect, useState, type ReactNode } from "react";

const nf = new Intl.NumberFormat("he-IL");

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
  /** Which of ground.css's five scenes this chapter stands on. There are exactly
   *  five and a chapter may not invent a sixth. */
  scene?: "base" | "deep" | "cream" | "pm" | "pppi";
  /** The one chapter this page most wants read. The running section bar marks
   *  it; nothing else about the chapter changes. */
  feature?: boolean;
  /** A secondary chapter opens on demand (design audit §7, 2026-09-21): the
   *  header stays in the flow as the summary, the body is a closed <details>
   *  until the reader opens it or navigates to the chapter's anchor. Nothing is
   *  removed; the page stops being 17,000px of everything at once. */
  collapsed?: boolean;
  /** What a closed chapter shows before the click: three or more items taken
   *  from its own body (the UX director's "closed chapter becomes a teaser",
   *  2026-10-02). Real data from WsData; nothing is written for it. */
  teaser?: ReactNode;
}

function useHashOpen(id: string, collapsed: boolean | undefined): [boolean, (v: boolean) => void] {
  const [open, setOpen] = useState(!collapsed);
  useEffect(() => {
    if (!collapsed) return;
    const sync = () => { if (window.location.hash === `#${id}`) setOpen(true); };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [collapsed, id]);
  return [open, setOpen];
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
  const [open, setOpen] = useHashOpen(meta.id, meta.collapsed);
  // EVERY PART OF THE HEAD HAS AN EXPLICIT ROW AND COLUMN (workspace.css, "the
  // chapter head, placed"). The number used to be auto-placed beside the
  // kicker; when it stopped spanning the head's rows, the grid put the TITLE
  // into the number's auto-width column and left the sentence a 140px column
  // at 1440. The head carries the chapter's count as its data, beside the
  // title on a wide canvas and under the sentence on a narrow one.
  const header = (
      <header className="nw-ch-h">
        {/* The number is a grid item of its own, on an explicit row and
            column (workspace.css, "the chapter head, placed"); inside the
            kicker it had no place of its own to be given. */}
        <span className="nw-ch-n" aria-hidden="true">{String(meta.n).padStart(2, "0")}</span>
        <p className="nw-ch-k nm-fade">
          <span className="nw-ch-ico" aria-hidden="true">{icon}</span>
          {meta.kicker}
        </p>
        {/* The span/span is the shape .nm-kin requires and not decoration: the
            outer one is the mask the line rises out of. */}
        <h2 className="nw-ch-t nm-kin" id={`${meta.id}-h`}><span><span>{meta.title}</span></span></h2>
        <p className="nw-ch-s nm-rise">{lede}</p>
        {/* Only a collapsed chapter carries its count in the head: its body is
            closed, so the head is where the data is. An open chapter's body
            leads with its own figures, and a second copy above them repeated
            "8 טבלאות משתנות" over the S/4HANA chapter's own 8. */}
        {meta.collapsed ? (
          <p className="nw-ch-stat">
            <b className="nw-sap">{nf.format(meta.count)}</b>
            <span>{meta.countLabel}</span>
          </p>
        ) : null}
        {lead ? <p className="nw-ch-go nm-rise">{lead}</p> : null}
      </header>
  );
  // The closed chapter's control. It used to wrap the whole head: an accessible
  // name of 20 to 40 words, the h2 flattened inside a button (accessibility
  // seats 08 and 14, 2026-10-02). Now the summary is one visible row named by
  // the state word and the chapter's kicker and count, the head stays outside
  // it with its heading, and the teaser shows what is behind the fold.
  const control = meta.collapsed ? (
    <summary className="nw-ch-sum">
      <span className="nw-ch-toggle">{open ? "צמצום הפרק" : "הצגת הפרק"}</span>
      <span className="nw-ch-sum-t">{meta.kicker} · {nf.format(meta.count)} {meta.countLabel}</span>
    </summary>
  ) : null;
  return (
    <section
      className={`nw-ch${wide ? " nw-ch--wide" : ""}`}
      id={meta.id}
      aria-labelledby={`${meta.id}-h`}
      data-ch={meta.n}
      data-scene={meta.scene}
      data-collapsed={meta.collapsed ? (open ? "open" : "closed") : undefined}
    >
      {meta.collapsed ? (
        <>
        {header}
        {meta.teaser && !open ? <div className="nw-ch-teaser">{meta.teaser}</div> : null}
        <details className="nw-ch-d" open={open} onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}>
          {control}
          <div className="nw-ch-body">{children}</div>
        </details>
        </>
      ) : (
        <>
          {header}
          <div className="nw-ch-body">{children}</div>
        </>
      )}
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
