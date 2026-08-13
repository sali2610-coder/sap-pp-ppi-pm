"use client";

// The shelf and the entry.
//
// Two surfaces, one element. A cover on the shelf and the cover inside the
// entry panel are the same component at two sizes, and the open transition is a
// real FLIP between the two rects — measured, inverted, played on transform
// alone. That is the "shared element" the brief asks for, and it is honest:
// nothing is cross-faded and no second artwork exists.
//
// What this surface does NOT do: it never renders a chapter, never fetches
// prose, never wraps the reader. The single way into a book is a plain <Link>
// to the existing /library/<id>/ page, untouched.
//
// Motion budget: transform and opacity only, on the cover and the panel. Under
// prefers-reduced-motion the tilt is not merely slowed, it is never armed — the
// pointer listener is not attached at all — and the FLIP is skipped entirely.

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowUpLeft, BookOpen, Layers, Library, Table2, X } from "lucide-react";
import { SPRING, reducedMotion } from "../flip";
import { BookCover } from "./book-cover";
import type { BookCard, BooksData } from "./books-data";

const nf = new Intl.NumberFormat("he-IL");
const OPEN_MS = 520;
const CLOSE_MS = 320;

/* ------------------------------------------------------------------- tilt */

const HOVER_Q = "(hover: hover) and (pointer: fine)";
const MOTION_Q = "(prefers-reduced-motion: reduce)";

function armedSubscribe(cb: () => void): () => void {
  let mqs: MediaQueryList[] = [];
  try { mqs = [window.matchMedia(HOVER_Q), window.matchMedia(MOTION_Q)]; } catch { return () => {}; }
  for (const m of mqs) m.addEventListener("change", cb);
  return () => { for (const m of mqs) m.removeEventListener("change", cb); };
}
function armedSnapshot(): boolean {
  try { return window.matchMedia(HOVER_Q).matches && !window.matchMedia(MOTION_Q).matches; }
  catch { return false; }
}

/** Pointer-driven tilt, written as CSS vars on the card. Armed only where a
 *  real hover-capable fine pointer exists AND motion is allowed — on a phone
 *  there is no hover to lean on, so the card there is a plain tap target with
 *  its own pressed state instead.
 *
 *  Read through useSyncExternalStore rather than set from an effect: the server
 *  snapshot is a hard `false`, so the markup that hydrates carries no tilt, and
 *  a user who turns motion off mid-session disarms it live. */
function useTiltArmed(): boolean {
  return useSyncExternalStore(armedSubscribe, armedSnapshot, () => false);
}

/* ------------------------------------------------------------------ shelf */

export function BookShelf({ data }: { data: BooksData }) {
  const [mod, setMod] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  /* The slab that opened the panel. Held in a ref, never read during render:
     it is the FLIP's source rect and the element focus returns to. */
  const trigger = useRef<HTMLButtonElement | null>(null);
  const armed = useTiltArmed();

  const byId = useMemo(() => new Map(data.books.map((b) => [b.id, b])), [data.books]);
  const groups = useMemo(
    () => (mod ? data.groups.filter((g) => g.module === mod) : data.groups),
    [data.groups, mod],
  );
  const shown = useMemo(
    () => data.books.filter((b) => !mod || b.module === mod).length,
    [data.books, mod],
  );

  const close = useCallback(() => {
    setOpen(null);
    trigger.current?.focus();
  }, []);

  const tilt = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-py * 6.5).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 8.5).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${(px * 90 + 50).toFixed(1)}%`);
    el.style.setProperty("--gy", `${(py * 90 + 50).toFixed(1)}%`);
  };
  const untilt = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.removeProperty("--rx");
    el.style.removeProperty("--ry");
    el.style.removeProperty("--gx");
    el.style.removeProperty("--gy");
  };

  const active = open ? byId.get(open) ?? null : null;

  return (
    <>
      <div className="nb-filter" role="group" aria-label="סינון לפי מודול">
        <button
          type="button"
          className="nb-chip"
          aria-pressed={mod === null}
          onClick={() => setMod(null)}
        >
          כל המודולים
          <em>{data.totals.books}</em>
        </button>
        {data.groups.map((g) => (
          <button
            key={g.module}
            type="button"
            className="nb-chip"
            style={{ "--m": g.mod } as React.CSSProperties}
            data-mod="1"
            aria-pressed={mod === g.module}
            onClick={() => setMod(mod === g.module ? null : g.module)}
          >
            <span className="nb-chip-code">{g.module}</span>
            <span className="nb-chip-he">{g.moduleHe}</span>
            <em>{g.ids.length}</em>
          </button>
        ))}
      </div>

      <p className="nb-count" aria-live="polite">
        {shown === data.totals.books
          ? `כל ${data.totals.books} הספרים`
          : `${shown} מתוך ${data.totals.books} ספרים`}
      </p>

      {groups.map((g) => (
        <section className="nb-band" key={g.module} style={{ "--m": g.mod } as React.CSSProperties} aria-labelledby={`nb-b-${g.module.replace(/\W/g, "")}`}>
          <header className="nb-band-h">
            <span className="nb-band-line" aria-hidden="true" />
            <h2 className="nb-band-t" id={`nb-b-${g.module.replace(/\W/g, "")}`}>
              <span className="nb-sap">{g.module}</span>
              <span>{g.moduleHe}</span>
            </h2>
            <span className="nb-band-n">{g.ids.length === 1 ? "ספר אחד" : `${g.ids.length} ספרים`}</span>
          </header>

          <ul className="nb-grid">
            {g.ids.map((id) => {
              const b = byId.get(id);
              if (!b) return null;
              return (
                <li className="nb-card" key={id} style={{ "--m": b.mod } as React.CSSProperties}>
                  <button
                    type="button"
                    className="nb-slab"
                    data-tilt={armed ? "1" : undefined}
                    data-open={open === id ? "1" : undefined}
                    onPointerMove={armed ? tilt : undefined}
                    onPointerLeave={armed ? untilt : undefined}
                    onClick={(e) => { trigger.current = e.currentTarget; setOpen(id); }}
                    aria-haspopup="dialog"
                    aria-label={`${b.titleHe || b.titleEn} — ${b.chapters} פרקים, ${nf.format(b.sections)} ערכים. פתיחת כרטיס הספר`}
                  >
                    <BookCover b={b} />
                  </button>

                  <div className="nb-card-meta">
                    <h3 className="nb-card-t">{b.titleHe || b.titleEn}</h3>
                    {b.titleHe && <p className="nb-card-t2 nb-sap">{b.titleEn}</p>}
                    <p className="nb-card-n">
                      <span>{b.chapters} פרקים</span>
                      <i aria-hidden="true" />
                      <span>{nf.format(b.sections)} ערכים</span>
                      {b.pages !== null && (
                        <>
                          <i aria-hidden="true" />
                          <span>{nf.format(b.pages)} עמ׳</span>
                        </>
                      )}
                    </p>
                    <p className="nb-card-k">{b.structureHe}</p>
                  </div>

                  <Link className="nb-go" href={b.href} prefetch={false}>
                    <BookOpen size={14} strokeWidth={1.75} aria-hidden="true" />
                    פתח בקורא
                    <ArrowUpLeft size={13} strokeWidth={1.75} aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      {active && <BookEntry b={active} triggerRef={trigger} onClose={close} />}
    </>
  );
}

/* ------------------------------------------------------------------ entry */

function BookEntry({
  b,
  triggerRef,
  onClose,
}: {
  b: BookCard;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  const coverRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const leaving = useRef(false);

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
      const items = [...root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")]
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

  const max = b.heaviest?.sections || 1;
  const t = b.titleHe || b.titleEn;

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
        aria-labelledby="nb-entry-t"
        ref={sheetRef}
      >
        {/* Outside the scrolling body on purpose: on a phone the panel is a
            92dvh sheet, and a close control that scrolls away is a trap. */}
        <button type="button" className="nb-x" onClick={leave} ref={closeRef} aria-label="סגירת כרטיס הספר">
          <X size={16} strokeWidth={1.75} aria-hidden="true" />
        </button>

        <div className="nb-sheet-cov" ref={coverRef}>
          <BookCover b={b} size="entry" />
        </div>

        <div className="nb-sheet-body">
          <p className="nb-eye nb-sheet-head">
            <span className="nb-sap">{b.module}</span>
            <i aria-hidden="true" />
            {b.moduleHe}
            {b.kindLabel && <><i aria-hidden="true" />{b.kindLabel}</>}
          </p>

          <h2 className="nb-sheet-t" id="nb-entry-t">{t}</h2>
          {b.titleHe && <p className="nb-sheet-t2 nb-sap">{b.titleEn}</p>}

          <dl className="nb-facts">
            <div><dt>פרקים</dt><dd className="nb-sap">{b.chapters}</dd></div>
            <div><dt>ערכים</dt><dd className="nb-sap">{nf.format(b.sections)}</dd></div>
            <div>
              <dt>עמודים</dt>
              <dd className={b.pages === null ? "nb-none" : "nb-sap"}>
                {b.pages === null ? "לא מתועד" : nf.format(b.pages)}
              </dd>
            </div>
            <div><dt>מוציא לאור</dt><dd>{b.publisher ?? "לא מתועד"}</dd></div>
          </dl>
          <p className="nb-sheet-k">{b.structureHe}</p>

          <section className="nb-chs" aria-label="מבנה הספר">
            <h3 className="nb-h3">
              מה יש בפנים
              <span>
                {b.heaviest
                  ? <>הפרק הגדול ביותר — {b.heaviest.n} · {nf.format(b.heaviest.sections)} ערכים</>
                  : "אין פרקים במאגר"}
              </span>
            </h3>
            <ol className="nb-chlist">
              {b.chapterRows.map((c) => (
                <li key={c.n} style={{ "--p": c.sections / max } as React.CSSProperties}>
                  <span className="nb-ch-n nb-sap">{String(c.n).padStart(2, "0")}</span>
                  <span className="nb-ch-t">{c.title}</span>
                  <span className="nb-ch-bar" aria-hidden="true"><i /></span>
                  <span className="nb-ch-s nb-sap">{nf.format(c.sections)}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="nb-link" aria-label="החיבור למילון NEO">
            <h3 className="nb-h3">החיבור ל-Project NEO</h3>
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

          <div className="nb-sheet-cta">
            <Link className="nb-btn nb-btn--brand" href={b.href} prefetch={false}>
              <BookOpen size={15} strokeWidth={1.75} aria-hidden="true" />
              פתח את הספר בקורא
            </Link>
            <Link className="nb-btn" href="/neo/library/" prefetch={false}>
              <Library size={15} strokeWidth={1.75} aria-hidden="true" />
              הספרייה הדיגיטלית
            </Link>
          </div>
          <p className="nb-fine">
            הקורא הוא מסך קיים ב-Project NEO בכתובת <span className="nb-sap">{b.href}</span>.
            העמוד הזה הוא הכניסה אליו בלבד ואינו עוטף אותו.
          </p>
        </div>
      </div>
    </div>
  );
}
