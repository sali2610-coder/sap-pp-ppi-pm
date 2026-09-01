"use client";

// BOOK QUICK VIEW — a reading-navigation surface, not a reader.
//
// It answers four questions and then gets out of the way:
//   what is this book        cover, title, module, how it is built
//   how big is it            chapters, subchapters, pages, figures, publisher
//   where was I              reading state and the last location, from the
//                            stores the app already keeps (./reading-state.ts)
//   where do I want to go    the real table of contents, down to the subchapter
//
// The cover is a shared element: the same <BookCover> instance the shelf slab
// renders, flown between the two rects with a measured FLIP on transform alone.
// Under prefers-reduced-motion the flight is not slowed, it is skipped.
//
// Every reading link leaves for NEO's own reader at /neo/read/<id>/ and every
// one of them records that it left from the SHELF, so the reader's return
// control comes back here rather than to a computed parent. This file renders
// no prose, fetches nothing, and wraps no reader.

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpLeft, BookOpen, Bookmark, Layers, LayoutList, PlayCircle, Table2, X } from "lucide-react";
import { OriginLink, type OriginArg } from "@/components/neo-shell/nav-context";
import { neoReadHref } from "./links";
import { SPRING, reducedMotion } from "../flip";
import { BookCover } from "./book-cover";
import { BookToc } from "./book-toc";
import { noteHandoff } from "./reading-state";
import type { BookReading } from "./reading-state";
import { resolveResume, resumeLine, resumeScrollLine } from "./resume";
import type { BookCard } from "./books-data";

const nf = new Intl.NumberFormat("he-IL");
const OPEN_MS = 520;
const CLOSE_MS = 320;

export function BookQuickView({
  b,
  reading,
  triggerRef,
  origin,
  onClose,
}: {
  b: BookCard;
  reading: BookReading | undefined;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  /** The shelf's own "where I was", built by the shelf at the moment of the
   *  click. The panel is a modal ON the shelf and cannot be reopened by a URL,
   *  so the honest origin for everything in it is the shelf itself. */
  origin: (detail?: string) => OriginArg;
  onClose: () => void;
}) {
  const coverRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const leaving = useRef(false);
  /* §3 — the last beat of the opening. The book flies out of the shelf and
     lands square to the reader; THEN its front cover swings back on the
     binding. Splitting the two is the whole point: a cover that hinges while
     the object is still travelling reads as a glitch, one that hinges after it
     has settled reads as a book being opened. */
  const [ajar, setAjar] = useState(false);

  /* The FLIP. The trigger never moves when the panel opens — the panel is a
     fixed overlay — so its rect can be read after mount and is still true.
     Both rects are taken from the COVER box, not from the button (which also
     carries the shelf shadow underneath it): matching the two cover boxes is
     what keeps the scale uniform and the flight free of distortion. */
  useLayoutEffect(() => {
    const el = coverRef.current;
    const trigger = triggerRef.current;
    if (!el || !trigger || reducedMotion()) return;
    const from = (trigger.firstElementChild ?? trigger).getBoundingClientRect();
    const to = el.getBoundingClientRect();
    if (!from.width || !to.width) return;
    const sx = from.width / to.width;
    const sy = from.height / to.height;
    const dx = from.left + from.width / 2 - (to.left + to.width / 2);
    const dy = from.top + from.height / 2 - (to.top + to.height / 2);
    el.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` },
        { transform: "translate3d(0, 0, 0) scale(1, 1)" },
      ],
      { duration: OPEN_MS, easing: SPRING, fill: "none" },
    );
  }, [triggerRef]);

  /* The cover opens once the flight has landed. Under reduced motion the flight
     never ran, so there is nothing to wait for — and the sheet's own media
     query pins `--open` at 0deg anyway, so the state is set but the cover
     stays shut. Nothing here animates a layout property. */
  useEffect(() => {
    const t = window.setTimeout(() => setAjar(true), reducedMotion() ? 0 : OPEN_MS - 140);
    return () => window.clearTimeout(t);
  }, []);

  /* Focus lands on the panel's own close control, so the first Tab is inside
     the dialog rather than back out in the shelf behind it. */
  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  const leave = useCallback(() => {
    if (leaving.current) return;
    leaving.current = true;
    const el = coverRef.current;
    const sheet = sheetRef.current;
    const trigger = triggerRef.current;
    if (!el || !trigger || reducedMotion()) {
      onClose();
      return;
    }
    const from = el.getBoundingClientRect();
    const to = (trigger.firstElementChild ?? trigger).getBoundingClientRect();
    if (!from.width || !to.width) {
      onClose();
      return;
    }
    const sx = to.width / from.width;
    const sy = to.height / from.height;
    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);
    /* The panel holds its opacity for the first half of the flight and only
       then lets go, so the cover is still solid while it is travelling and
       fades exactly as it lands back on the shelf slot it came from. */
    sheet?.animate(
      [{ opacity: 1 }, { opacity: 1, offset: 0.5 }, { opacity: 0 }],
      { duration: CLOSE_MS, easing: "linear", fill: "forwards" },
    );
    const a = el.animate(
      [
        { transform: "translate3d(0, 0, 0) scale(1, 1)" },
        { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` },
      ],
      { duration: CLOSE_MS, easing: SPRING, fill: "forwards" },
    );
    a.onfinish = onClose;
    a.oncancel = onClose;
  }, [onClose, triggerRef]);

  /* Escape closes, and Tab is wrapped inside the panel. A modal that lets Tab
     walk out into the shelf behind the scrim is a modal in name only, and this
     one has to be usable from the keyboard because the tilt affordance is not
     available there. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        leave();
        return;
      }
      if (e.key !== "Tab") return;
      const root = sheetRef.current;
      if (!root) return;
      const items = [...root.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input:not([disabled])")]
        .filter((el) => el.tabIndex !== -1 && el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const at = document.activeElement;
      if (!e.shiftKey && at === last) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && (at === first || !root.contains(at))) { e.preventDefault(); last.focus(); }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [leave]);

  /* The NEO shell scrolls its canvas, not the document, so the lock is applied
     to whichever element is actually the scroller and restored on the way out.
     Nothing is mutated in source; this is a runtime style that always unwinds. */
  useEffect(() => {
    const canvas = sheetRef.current?.closest(".nx-canvas") as HTMLElement | null
      ?? document.querySelector(".nx-canvas") as HTMLElement | null;
    if (!canvas) return;
    const prev = canvas.style.overflow;
    canvas.style.overflow = "hidden";
    return () => { canvas.style.overflow = prev; };
  }, []);

  const t = b.titleHe || b.titleEn;
  /* Component-scoped id, like every other id in this family — a hardcoded
     document id inside a component is one render away from a duplicate. */
  const entryTitleId = useId();
  const r = resolveResume(b, reading);
  const line = resumeLine(r);
  const done = r.read >= b.chapters && b.chapters > 0;

  return (
    <div className="nb-entry" style={{ "--m": b.mod } as React.CSSProperties}>
      {/* Pointer dismissal only. It is deliberately out of the tab order: the
          panel already has a real close button and Escape, and a full-screen
          stop on the way in would be noise. */}
      <button type="button" className="nb-scrim" tabIndex={-1} aria-hidden="true" onClick={leave} />
      <div
        className="nb-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby={entryTitleId}
        ref={sheetRef}
      >
        {/* Outside the scrolling body on purpose: on a phone the panel is a
            92dvh sheet, and a close control that scrolls away is a trap. */}
        <button type="button" className="nb-x" onClick={leave} ref={closeRef} aria-label="סגירת כרטיס הספר">
          <X size={16} strokeWidth={1.75} aria-hidden="true" />
        </button>

        <div className="nb-sheet-side">
          <div className="nb-sheet-cov" ref={coverRef}>
            <BookCover b={b} size="entry" open={ajar} />
          </div>

          <p
            className="nu-status nb-sheet-state"
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
        </div>

        <div className="nb-sheet-body">
          <p className="nb-eye nb-sheet-head">
            <span className="nb-sap">{b.module}</span>
            <i aria-hidden="true" />
            {b.moduleHe}
            {b.kindLabel && <><i aria-hidden="true" />{b.kindLabel}</>}
          </p>

          <h2 className="nb-sheet-t" id={entryTitleId}>{t}</h2>
          {b.titleHe && <p className="nb-sheet-t2 nb-sap">{b.titleEn}</p>}

          <dl className="nb-facts">
            <div><dt>פרקים</dt><dd className="nb-sap">{b.chapters}</dd></div>
            <div><dt>תת-פרקים</dt><dd className="nb-sap">{nf.format(b.sections)}</dd></div>
            <div>
              <dt>עמודים</dt>
              <dd className={b.pages === null ? "nb-none" : "nb-sap"}>
                {b.pages === null ? "לא מתועד" : nf.format(b.pages)}
              </dd>
            </div>
            {b.figures !== null && (
              <div><dt>איורים</dt><dd className="nb-sap">{nf.format(b.figures)}</dd></div>
            )}
            <div><dt>מוציא לאור</dt><dd>{b.publisher ?? "לא מתועד"}</dd></div>
          </dl>
          <p className="nb-sheet-k">{b.structureHe}</p>

          {/* CONTINUE READING. Rendered only when a real location is stored —
              there is no "start from the beginning" disguised as a resume. */}
          {line ? (
            <div className="nb-resume">
              <p className="nb-resume-h">
                <Bookmark size={14} strokeWidth={1.75} aria-hidden="true" />
                המשך מהמיקום האחרון
              </p>
              <p className="nb-resume-l">{line}</p>
              <OriginLink
                className="nu-btn"
                href={r.neoHref}
                origin={() => origin(t)}
                onClick={() => noteHandoff(b.id, r.chapter, r.section)}
              >
                <PlayCircle size={15} strokeWidth={1.75} aria-hidden="true" />
                {r.neoExact ? "המשך קריאה בתת-הפרק" : "המשך קריאה בפרק"}
              </OriginLink>
              <p className="nb-fine">
                {r.section
                  ? "המיקום נשמר ברמת תת-הפרק, והקורא נפתח בו."
                  : "נשמר פרק בלבד; תת-פרק נשמר במהלך הקריאה."}
                {/* §6 — the offset is REPORTED and never resumed from: the
                    locations a reader can be sent to are a chapter and a
                    subchapter, so the landing is at that grain and the sentence
                    says so rather than implying a pixel. */}
                {resumeScrollLine(r) && <> {resumeScrollLine(r)} הפתיחה היא ברמת תת-הפרק.</>}
              </p>
            </div>
          ) : (
            <p className="nb-fine nb-resume-none">
              לספר זה אין מיקום קריאה שמור. המיקום נשמר במהלך הקריאה ויוצג כאן.
            </p>
          )}

          <BookToc
            b={b}
            reading={reading}
            resumeSection={r.section}
            origin={() => origin(t)}
          />

          <section className="nb-link" aria-label="הקישור לתיעוד הטכני">
            <h3 className="nb-h3">התיעוד הטכני ב-Project NEO</h3>
            {b.dict ? (
              <>
                <Link className="nb-dict" href={b.dict.href} prefetch={false}>
                  <Table2 size={15} strokeWidth={1.75} aria-hidden="true" />
                  <span className="nb-dict-t">
                    תיעוד טכני <span className="nb-sap">{b.dict.code}</span> · {b.dict.he}
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
                <span className="nb-dict-n nb-sap">{nf.format(b.near.n)} יישומי Fiori</span>
                <ArrowUpLeft size={14} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            )}
          </section>

          <div className="nb-sheet-cta">
            <OriginLink
              className="nu-btn"
              href={neoReadHref(b.id)}
              origin={() => origin(t)}
              onClick={() => noteHandoff(b.id, null, null)}
            >
              <BookOpen size={15} strokeWidth={1.75} aria-hidden="true" />
              פתיחת הספר בקורא
            </OriginLink>
            <OriginLink className="nu-btn2" href={b.hubHref} origin={() => origin(t)}>
              <LayoutList size={15} strokeWidth={1.75} aria-hidden="true" />
              מרכז הספר
            </OriginLink>
          </div>
          <p className="nb-fine">
            הקריאה נפתחת בקורא של Project NEO בכתובת <span className="nb-sap">{neoReadHref(b.id)}</span>.
            הספר זמין גם בקורא של הספרייה הדיגיטלית:{" "}
            <Link className="nu-link" href={b.href} prefetch={false}>
              <span className="nb-sap">{b.href}</span>
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
