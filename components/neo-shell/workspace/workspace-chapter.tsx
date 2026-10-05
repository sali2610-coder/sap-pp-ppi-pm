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
import { ChevronDown } from "lucide-react";

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
}

function useHashOpen(id: string, collapsed: boolean | undefined): [boolean, (v: boolean) => void] {
  const [open, setOpen] = useState(!collapsed);
  useEffect(() => {
    if (!collapsed) return;
    const sync = () => { if (window.location.hash === `#${id}`) setOpen(true); };
    // The running section bar scrolls with JS and never touches the hash, so a
    // jump from it would land on a closed card. Any link to this chapter opens
    // it, caught on the way down before the bar's own handler runs.
    const jump = (e: MouseEvent) => {
      const a = e.target instanceof Element ? e.target.closest("a[href]") : null;
      if (a && a.getAttribute("href") === `#${id}`) setOpen(true);
    };
    sync();
    window.addEventListener("hashchange", sync);
    document.addEventListener("click", jump, true);
    return () => {
      window.removeEventListener("hashchange", sync);
      document.removeEventListener("click", jump, true);
    };
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
  // THE COMPACT HEAD (2026-10). A numbered badge instead of a display numeral,
  // the title at section size, and the chapter's own count at the far edge: the
  // same information in a third of the height, so the page reads as a set of
  // rooms you can see into rather than a scroll of banners.
  const header = (
      <header className="nw-ch-h">
        <span className="nw-ch-n" aria-hidden="true">
          {icon}
          <b className="nw-sap">{String(meta.n).padStart(2, "0")}</b>
        </span>
        <div className="nw-ch-head">
          <div className="nw-ch-tl">
            <h2 className="nw-ch-t" id={`${meta.id}-h`}>{meta.title}</h2>
            <span className="nw-ch-c">
              <b className="nw-sap">{nf.format(meta.count)}</b>{" "}
              <em>{meta.countLabel}</em>
            </span>
          </div>
          <p className="nw-ch-s">{lede}</p>
          {/* A collapsed chapter's header is a <summary>, i.e. a button: its lead is
              rendered after the <details> instead, so no link sits inside a button. */}
          {lead && !meta.collapsed ? <p className="nw-ch-go">{lead}</p> : null}
        </div>
        {meta.collapsed ? (
          <span className="nw-ch-toggle" aria-hidden="true">
            {open ? "צמצום" : "הצגה"}
            <ChevronDown size={15} strokeWidth={2} />
          </span>
        ) : null}
      </header>
  );
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
        <details className="nw-ch-d" open={open} onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}>
          <summary className="nw-ch-sum">{header}</summary>
          <div className="nw-ch-body">{children}</div>
        </details>
        {/* The chapter's route, under its card and aligned with its title. */}
        {lead ? <p className="nw-ch-go nw-ch-go--out">{lead}</p> : null}
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
