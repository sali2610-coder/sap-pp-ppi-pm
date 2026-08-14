"use client";

// THE SHELF.
//
// One continuous editorial run, not nine detached blocks. Each module is a
// SHELF: an identity column (code, Hebrew name, how many books, how much is in
// them) beside the books themselves, separated from the next shelf by a single
// hairline. A module with one book is therefore one shelf-height tall and the
// next module starts immediately underneath it — which is the whole point, and
// what the previous "band per module" layout could not do, because a full-width
// heading over a one-item grid always leaves a module-sized hole beside it.
//
// Module colour appears as an edge, a low tint and a lit corner. Never as a
// filled rectangle, and never as a small dot — the dot form belongs to
// --status-*, which is used here only for reading state.
//
// A cover that has been opened before carries a bookmark. It is a real link to
// a real stored location (see ./reading-state.ts for where that location comes
// from) and it is never rendered on a guess: no evidence, no bookmark.
//
// What this surface still does NOT do: it never renders a chapter, never
// fetches prose, never wraps the reader. The way into a book is a plain <Link>
// to the existing /library/<id>/ page, untouched.

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Bookmark, PlayCircle } from "lucide-react";
import { BookCover } from "./book-cover";
import { BookQuickView } from "./quick-view";
import { noteHandoff, useReading } from "./reading-state";
import { resolveResume, resumeLine } from "./resume";
import type { BooksData } from "./books-data";

const nf = new Intl.NumberFormat("he-IL");

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

/** Pointer-driven turn, written as CSS vars on the card. Armed only where a
 *  real hover-capable fine pointer exists AND motion is allowed — on a phone
 *  there is no hover to lean on, so the card there is a plain tap target with
 *  its own pressed state, an always-visible "פתח בקורא" control and, when there
 *  is one, a bookmark line printed under the cover rather than on hover.
 *
 *  Read through useSyncExternalStore rather than set from an effect: the server
 *  snapshot is a hard `false`, so the markup that hydrates carries no turn, and
 *  a user who turns motion off mid-session disarms it live. */
function useTiltArmed(): boolean {
  return useSyncExternalStore(armedSubscribe, armedSnapshot, () => false);
}

/* ---------------------------------------------------------- §8 · returning */

const SCROLL_KEY = "neo:books:scroll";

/** Where the shelf was when you left it.
 *
 *  §8's requirement is that coming back from a book must not dump you at the
 *  top of the shelf. The NEO shell scrolls `.nx-canvas`, not the document, so
 *  neither the browser's own scroll restoration nor the router's touches it —
 *  the position has to be kept by hand.
 *
 *  sessionStorage, not localStorage: a scroll offset is true for this visit
 *  only. It is stored per session and dropped when the tab closes, and it is
 *  never mixed into `neo:books:v1`, which is the reading pointer and outlives
 *  the session on purpose. */
function useShelfScroll() {
  useEffect(() => {
    const canvas = document.querySelector<HTMLElement>(".nx-canvas");
    if (!canvas) return;

    /* The live position, tracked in a ref rather than written to storage on
       every scroll event. That is not an optimisation — it is the fix for the
       bug this originally shipped with: the router resets the canvas to 0 as
       part of the client-side navigation, and it does so BEFORE this effect's
       cleanup runs. Saving from the DOM on the way out therefore recorded 0
       every single time and the shelf always came back at the top. */
    let lastY = 0;
    let raf = 0;

    const onScroll = () => { lastY = canvas.scrollTop; };
    /* THE MOMENT OF INTENT. A pointerdown or an Enter is the last instant at
       which the position is still the user's own, so that is when it is
       committed. Captured on the way down so a link's own handler cannot
       navigate first. A deliberate scroll back to the top therefore records a
       real 0 and the shelf honestly reopens at the top. */
    const commit = () => {
      try { sessionStorage.setItem(SCROLL_KEY, String(lastY)); }
      catch { /* private mode, quota, disabled storage — it simply forgets */ }
    };

    try {
      const y = Number(sessionStorage.getItem(SCROLL_KEY));
      /* Two frames: the shelf is eleven covers and a table of contents, so the
         first frame after mount is not yet tall enough to scroll to. */
      if (Number.isFinite(y) && y > 0) {
        raf = requestAnimationFrame(() => {
          raf = requestAnimationFrame(() => {
            canvas.scrollTop = y;
            lastY = canvas.scrollTop;
          });
        });
      }
    } catch { /* storage disabled — the shelf simply opens at the top */ }

    canvas.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerdown", commit, true);
    document.addEventListener("keydown", commit, true);
    window.addEventListener("pagehide", commit);
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerdown", commit, true);
      document.removeEventListener("keydown", commit, true);
      window.removeEventListener("pagehide", commit);
    };
  }, []);
}

/* ------------------------------------------------------------------ shelf */

export function BookShelf({ data }: { data: BooksData }) {
  const [mod, setMod] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  /* Two refs, because the two jobs are not the same job. `trigger` is the FLIP's
     source rect and is ONLY ever a cover slab — the panel's cover flies from a
     cover, or it does not fly at all. `returnTo` is where focus goes when the
     panel closes, which must work for any control that opened it. */
  const trigger = useRef<HTMLButtonElement | null>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const armed = useTiltArmed();
  useShelfScroll();

  const ids = useMemo(() => data.books.map((b) => b.id), [data.books]);
  const reading = useReading(ids);

  const byId = useMemo(() => new Map(data.books.map((b) => [b.id, b])), [data.books]);
  const groups = useMemo(
    () => (mod ? data.groups.filter((g) => g.module === mod) : data.groups),
    [data.groups, mod],
  );
  const shown = useMemo(
    () => data.books.filter((b) => !mod || b.module === mod).length,
    [data.books, mod],
  );

  /* The book the surface is "on". The reader's own live pointer wins; NEO's
     handoff note is the fallback, which is what keeps the book selected after a
     return from the reader in a session where continuity was never written. */
  const selectedId = reading.currentBook ?? reading.lastBook;
  const selected = selectedId ? byId.get(selectedId) ?? null : null;
  const selectedResume = selected ? resolveResume(selected, reading.map[selected.id]) : null;
  const selectedLine = selectedResume ? resumeLine(selectedResume) : null;

  const close = useCallback(() => {
    setOpen(null);
    returnTo.current?.focus();
  }, []);

  /* The pointer's own contribution to the object's attitude, ON TOP of the
     resting turn the sheet already applies — the book does not snap to the
     pointer, it leans with it. Small angles on purpose: the cover is already
     swinging from 15° to 4° as it comes out of the shelf, and a few more
     degrees of follow is the difference between a solid object and a card that
     swings. --gx/--gy move the raking highlight so the light stays put in the
     room while the book turns under it. */
  const tilt = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-py * 3.2).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 5).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${(px * 80 + 50).toFixed(1)}%`);
    el.style.setProperty("--gy", `${(py * 80 + 50).toFixed(1)}%`);
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
      {/* CONTINUE READING, at the head of the shelf. Present only when a stored
          location resolves against the book data that is actually on disk. */}
      {selected && selectedResume && selectedLine && (
        <section className="nb-cont" style={{ "--m": selected.mod } as React.CSSProperties} aria-label="המשך קריאה">
          <p className="nb-cont-e">
            <Bookmark size={14} strokeWidth={1.75} aria-hidden="true" />
            המשך מהמקום האחרון
          </p>
          <p className="nb-cont-t">{selected.titleHe || selected.titleEn}</p>
          <p className="nb-cont-l">{selectedLine}</p>
          <div className="nb-cont-a">
            <Link
              className="nu-btn"
              href={selectedResume.href}
              prefetch={false}
              onClick={() => noteHandoff(selected.id, selectedResume.chapter, selectedResume.section)}
            >
              <PlayCircle size={15} strokeWidth={1.75} aria-hidden="true" />
              {selectedResume.exact ? "חזרה לתת-הפרק" : "חזרה לפרק"}
            </Link>
            <button
              type="button"
              className="nu-btn2"
              onClick={(e) => { trigger.current = null; returnTo.current = e.currentTarget; setOpen(selected.id); }}
            >
              כרטיס הספר
            </button>
            <Link className="nu-link" href={selected.hubHref} prefetch={false}>
              מרכז הספר
              <ArrowLeft className="nu-arw" size={14} strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
        </section>
      )}

      <div className="nb-filter" role="group" aria-label="סינון לפי מודול">
        <button
          type="button"
          className="nu-filter"
          aria-pressed={mod === null}
          onClick={() => setMod(null)}
        >
          כל המודולים
          <em className="nb-f-n">{data.totals.books}</em>
        </button>
        {data.groups.map((g) => (
          <button
            key={g.module}
            type="button"
            className="nu-filter"
            style={{ "--m": g.mod } as React.CSSProperties}
            aria-pressed={mod === g.module}
            onClick={() => setMod(mod === g.module ? null : g.module)}
          >
            <span className="nb-sap">{g.module}</span>
            <span className="nb-f-he">{g.moduleHe}</span>
            <em className="nb-f-n">{g.ids.length}</em>
          </button>
        ))}
      </div>

      <p className="nb-count" aria-live="polite">
        {shown === data.totals.books
          ? `כל ${data.totals.books} הספרים`
          : `${shown} מתוך ${data.totals.books} ספרים`}
      </p>

      <div className="nb-shelves">
        {groups.map((g) => {
          const key = g.module.replace(/\W/g, "");
          return (
            <section
              className="nb-shelf"
              key={g.module}
              style={{ "--m": g.mod } as React.CSSProperties}
              aria-labelledby={`nb-s-${key}`}
            >
              <span className="nb-shelf-edge" aria-hidden="true" />

              <header className="nb-shelf-h">
                <h2 className="nb-shelf-t" id={`nb-s-${key}`}>
                  <span className="nb-sap nb-shelf-code">{g.module}</span>
                  <span className="nb-shelf-he">{g.moduleHe}</span>
                </h2>
                <p className="nb-shelf-n">
                  {g.ids.length === 1 ? "ספר אחד" : `${g.ids.length} ספרים`}
                </p>
                <p className="nb-shelf-n nb-shelf-n2">
                  {g.chapters} פרקים
                  <i aria-hidden="true" />
                  {nf.format(g.sections)} תת-פרקים
                </p>
              </header>

              <ul className="nb-grid">
                {g.ids.map((id) => {
                  const b = byId.get(id);
                  if (!b) return null;
                  const r = resolveResume(b, reading.map[id]);
                  const line = resumeLine(r);
                  return (
                    <li
                      className="nb-card"
                      key={id}
                      style={{ "--m": b.mod } as React.CSSProperties}
                      data-sel={selectedId === id ? "1" : undefined}
                    >
                      <div className="nb-slot">
                        <button
                          type="button"
                          className="nb-slab"
                          data-tilt={armed ? "1" : undefined}
                          data-open={open === id ? "1" : undefined}
                          onPointerMove={armed ? tilt : undefined}
                          onPointerLeave={armed ? untilt : undefined}
                          onClick={(e) => { trigger.current = e.currentTarget; returnTo.current = e.currentTarget; setOpen(id); }}
                          aria-haspopup="dialog"
                          aria-label={`${b.titleHe || b.titleEn} — ${b.chapters} פרקים, ${nf.format(b.sections)} תת-פרקים. פתיחת כרטיס הספר`}
                        >
                          <BookCover b={b} />
                        </button>

                        {/* THE BOOKMARK. A separate control, deliberately a
                            sibling of the slab and not a child of it: a link
                            inside a button is invalid and unreachable by
                            keyboard. Hover or focus opens its label; on touch
                            the same sentence is printed under the cover. */}
                        {line && (
                          <Link
                            className="nb-mark"
                            href={r.href}
                            prefetch={false}
                            onClick={() => noteHandoff(b.id, r.chapter, r.section)}
                            aria-label={`המשך קריאה ב${b.titleHe || b.titleEn} — ${line}`}
                          >
                            <Bookmark size={14} strokeWidth={2} aria-hidden="true" />
                            <span className="nb-mark-t">{line}</span>
                          </Link>
                        )}

                        {/* §2 — the contextual line. Two facts that are real
                            and are NOT already printed under the cover: how the
                            book is built, and its shelf plate. aria-hidden
                            because both are decoration for a pointer; the same
                            facts reach a screen reader through the slab's own
                            label and the card meta below. */}
                        <p className="nb-peek" aria-hidden="true">
                          <b>{b.kindLabel ?? b.structureHe}</b>
                          <i>{b.id}</i>
                        </p>
                      </div>

                      <div className="nb-card-meta">
                        <h3 className="nb-card-t">{b.titleHe || b.titleEn}</h3>
                        {b.titleHe && <p className="nb-card-t2 nb-sap">{b.titleEn}</p>}
                        <p className="nb-card-n">
                          <span>{b.chapters} פרקים</span>
                          <i aria-hidden="true" />
                          <span>{nf.format(b.sections)} תת-פרקים</span>
                          {b.pages !== null && (
                            <>
                              <i aria-hidden="true" />
                              <span>{nf.format(b.pages)} עמ׳</span>
                            </>
                          )}
                        </p>
                        {line ? (
                          <p className="nb-card-res">
                            <Bookmark size={12} strokeWidth={2} aria-hidden="true" />
                            {line}
                          </p>
                        ) : (
                          <p className="nb-card-k">{b.structureHe}</p>
                        )}
                      </div>

                      <Link
                        className="nu-btn2 nb-go"
                        href={b.href}
                        prefetch={false}
                        onClick={() => noteHandoff(b.id, r.chapter, r.section)}
                      >
                        <BookOpen size={14} strokeWidth={1.75} aria-hidden="true" />
                        פתח בקורא
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      {active && (
        <BookQuickView
          b={active}
          reading={reading.map[active.id]}
          triggerRef={trigger}
          onClose={close}
        />
      )}
    </>
  );
}
