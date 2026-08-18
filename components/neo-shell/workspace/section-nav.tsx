"use client";

/* ============================================================================
   PROJECT NEO · THE SECTION NAV — one component, five surfaces.
   ----------------------------------------------------------------------------
   THE COMPLAINT IT ANSWERS, verbatim: "לוחצים, יורדים, ואז צריך לגלול למעלה כדי
   לעבור לנושא הבא." The numbered section list existed on every long screen, but
   it scrolled away with the hero, so moving between sections meant a round trip
   to the top of the page. This is the same list, kept on screen.

   WHAT THE BAR HAS TO ANSWER, AND WHERE EACH ANSWER LIVES

     איפה אני          the active chip, and the counter that reads "03 / 08"
     מה פעיל           .nm-sel + data-on="1" — ground, ink, edge and weight at
                       once. Never a hairline underline; see below.
     כמה נשאר          the progress line along the bottom edge of the bar
     מה הבא            a named control at the end of the bar that carries the
                       NEXT section's own label, and turns into "back to the top"
                       once there is nothing after the current section — so it is
                       never a dead control and never a guess
     איך קופצים        every chip is a real <a href="#id">, enhanced into a
                       smooth canvas scroll
     איך חוזרים        the same control, at the end of the page

   WHERE IT LIVES. It is imported by the workspace family (PM · PP-PI) and by
   the object / table / transaction detail family, so it is written ONCE. It
   sits in workspace/ because that folder already owns the two primitives it is
   kin to — workspace-chapter.tsx (the section shape) and workspace-index.tsx
   (the page's table of contents). Nothing in it is workspace-specific: the only
   surface-shaped thing a caller can hand it is `feature`, which marks the one
   section that page most wants read, and every caller may leave it unset.

   HOW IT STICKS
     · `position: sticky` against .nx-canvas — the NEO shell scrolls its CANVAS
       and not the window, so `window.scrollY` is always 0 here and a scroll
       handler on `window` would never fire. The scroller is resolved through
       neoScroller() (nav-context/origin.ts), which is the one place in the
       project that knows which element that is.
     · A sticky element is clamped to its CONTAINING BLOCK. On a grid parent the
       containing block is the item's own grid area — i.e. zero travel — which
       is why every page root that hosts this nav is laid out in block flow with
       sibling margins instead of `display: grid` + `gap`. That is the whole
       reason .no / .nxb / .nxt changed layout mode.
     · It never covers a heading: the measured bar height is published to the
       page root as `--nxs-h`, and each family's stylesheet spends it as
       `scroll-margin-block-start` on its own sections. A native `#anchor` jump
       and the programmatic scroll below therefore land in the same place.

   HOW THE ACTIVE SECTION IS DECIDED — IntersectionObserver, never scroll.
     A READING LINE is drawn across the canvas just under the bar (bar height
     plus 16% of the canvas). The observer's root is shrunk from the bottom so
     its rect is exactly the strip ABOVE that line, and a section is "passed"
     when its top edge has crossed into that strip. The active section is the
     LAST passed one in document order — i.e. the section the reader is inside.

     This shape is chosen because it is event-complete. A section fires exactly
     twice per direction — when its top crosses the line, and when its bottom
     leaves the top of the canvas — and in both cases the flag it should hold is
     already correct, so a section taller than the strip cannot go stale between
     events. The first callback delivers every observed element, so the map is
     fully populated before the reader touches anything.

     The one thing an observer cannot see is the END of the scroll: if the last
     section is short, its top never reaches the line. That case reads the
     scroller's own offset INSIDE the observer callback — which is not a scroll
     listener, it costs nothing, and it makes the last chip light up where the
     reader can see the page has ended.

   HOW PROGRESS IS DRAWN — a scroll-driven animation, never a scroll handler.
     The line under the bar is scaled by `animation-timeline: scroll()`, which
     runs on the compositor and cannot produce a long task. Where that is not
     available the same line falls back to the SECTION count, published as
     --nxs-p, so the reader still gets a truthful "how far in am I" without one
     frame of JavaScript being spent on it. This is the same rule the rest of
     the product is held to: no rAF loop, no scroll listener, ever.

   REDUCED MOTION. A click jumps instead of animating, both for the canvas and
   for the bar's own horizontal reel.
   ========================================================================== */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { neoScroller } from "@/components/neo-shell/nav-context";
import "./section-nav.css";

export interface NeoSection {
  /** The DOM id of the section element. Must exist on the page. */
  id: string;
  /** Short Hebrew label. The chip is one line and never wraps, so this is the
   *  section's kicker, not its full heading. */
  label: string;
  /** The one section this page most wants read. Drawn as a short accent bar on
   *  the chip — a LINE, because a small standalone dot is the shape the form
   *  rule reserves for status. Optional, and no surface has to use it. */
  feature?: boolean;
}

/** Read at the moment of acting rather than at mount: the setting can change
 *  mid-session, and this costs one media query per click. */
function jumps(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function SectionNav({
  sections,
  label = "ניווט בעמוד",
  topLabel = "חזרה לראש העמוד",
}: {
  sections: NeoSection[];
  label?: string;
  /** What the end-of-page control says once there is no next section. */
  topLabel?: string;
}) {
  const nav = useRef<HTMLElement>(null);
  const reel = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");
  const [stuck, setStuck] = useState(false);
  /** Until when the observer must keep its hands off the active chip.
   *
   *  A click is a STATEMENT of where the reader wants to be, and a smooth scroll
   *  crosses every section between here and there on the way. Without this the
   *  chip the reader just pressed lights up, then flickers through four other
   *  chips, then settles on whichever section the animation happened to end
   *  inside — which is exactly wrong when the target is the last section and the
   *  page cannot scroll far enough to bring it to the top. */
  const held = useRef(0);
  /** WHERE THE CLICK WAS AIMED. The hold is released the moment the observer
   *  agrees the reader has arrived, rather than after a fixed wait — a module
   *  page is 16,000px tall and Chrome's smooth scroll from the top to chapter 07
   *  takes about two seconds, so a timer long enough for that jump would be
   *  absurdly long for a hop between neighbours. Measured, not guessed.
   *
   *  The timer stays as the upper bound and nothing else: a reader who grabs the
   *  scrollbar mid-flight never arrives, and the bar has to hand control back. */
  const want = useRef("");

  // The identity of the section list, flattened to a primitive, so the observer
  // is rebuilt when the page's sections actually change and not on every render
  // of a parent that hands over a fresh array literal.
  const key = sections.map((s) => s.id).join("|");
  const order = useMemo(() => key.split("|").filter(Boolean), [key]);

  /* ------------------------------------------------------------ the height

     Written straight to the node. This is a MEASUREMENT, not application state:
     routing it through useState would re-render the whole page on every canvas
     resize, and the only consumer is CSS. */
  useEffect(() => {
    const el = nav.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    const write = () => host.style.setProperty("--nxs-h", `${Math.round(el.offsetHeight)}px`);
    write();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(write);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* ------------------------------------------------------------ stuck or not

     The classic sentinel-free test: with the root inset by 1px at the top, a
     sticky bar that has reached the top of the scroller can no longer be fully
     inside it, so its ratio drops below 1. No extra DOM, no scroll handler. */
  useEffect(() => {
    const el = nav.current;
    const root = neoScroller();
    if (!el || !root || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => setStuck(e.intersectionRatio < 1),
      { root, rootMargin: "-1px 0px 0px 0px", threshold: [1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ------------------------------------------------------- the active section */
  useEffect(() => {
    const root = neoScroller();
    if (!root || !order.length || typeof IntersectionObserver === "undefined") return;

    const els = order
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;

    /** id → "this section's top edge has already crossed the reading line". */
    const passed = new Map<string, boolean>();
    /** The end of the LAST section is on screen, i.e. the page has bottomed out. */
    let ended = false;
    let io: IntersectionObserver | null = null;
    let tail: IntersectionObserver | null = null;

    /** The section the geometry says the reader is inside, right now. */
    const read = () => {
      // The end of the scroll wins. A short last section never reaches the
      // reading line, so on a page that ends in one the geometry would keep the
      // second-to-last chip lit while the reader is plainly looking at the last
      // section. Measured this way round: the bottom edge of the page is the
      // fact, the line is only an approximation of where the eye is.
      if (ended || root.scrollHeight - root.clientHeight - root.scrollTop <= 8) {
        return order[order.length - 1];
      }
      let cur = order[0];
      for (const id of order) if (passed.get(id)) cur = id;
      return cur;
    };

    const pick = () => {
      const cur = read();
      // A click owns the chip until its scroll has ARRIVED. See `want` / `held`.
      if (Date.now() < held.current) {
        if (!want.current || cur !== want.current) return;
        want.current = "";
        held.current = 0;
      }
      setActive(cur);
    };

    const build = () => {
      io?.disconnect();
      tail?.disconnect();
      const h = root.clientHeight;
      const bar = nav.current?.offsetHeight ?? 0;
      // The reading line. Clamped so a very short canvas (a phone in landscape
      // with the keyboard up) can still produce a strip with height in it.
      const line = Math.max(1, Math.min(Math.round(bar + h * 0.16), h - 1));
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            passed.set(e.target.id, e.boundingClientRect.top <= (e.rootBounds?.bottom ?? 0));
          }
          pick();
        },
        { root, rootMargin: `0px 0px -${h - line}px 0px`, threshold: 0 },
      );
      for (const el of els) io.observe(el);

      // "The page has ended", as an observation rather than a scroll handler.
      // The root is shrunk to a 1px line along the BOTTOM edge of the canvas and
      // the last section is watched against it, so the callback fires at exactly
      // the moment that section's own bottom edge rises into view.
      tail = new IntersectionObserver(
        ([e]) => {
          ended = e.boundingClientRect.bottom <= (e.rootBounds?.top ?? 0);
          pick();
        },
        { root, rootMargin: `-${h - 1}px 0px 0px 0px`, threshold: 0 },
      );
      tail.observe(els[els.length - 1]);
    };

    build();

    // The line is a fraction of the canvas and the bar wraps differently at
    // every width, so both have to be re-read when either changes. Coalesced
    // into a frame: a drag-resize otherwise rebuilds the observer per pixel.
    let frame = 0;
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(build);
      });
      ro.observe(root);
      if (nav.current) ro.observe(nav.current);
    }

    return () => {
      cancelAnimationFrame(frame);
      ro?.disconnect();
      io?.disconnect();
      tail?.disconnect();
    };
  }, [order]);

  /* --------------------------------------------------- keep the chip in view */
  useEffect(() => {
    const box = reel.current;
    if (!box || !active) return;
    const chip = box.querySelector<HTMLElement>(`[data-sec="${CSS.escape(active)}"]`);
    if (!chip) return;
    const b = box.getBoundingClientRect();
    const c = chip.getBoundingClientRect();
    if (c.left >= b.left && c.right <= b.right) return;
    // Relative, so it is correct under RTL too — where scrollLeft is negative in
    // every current engine and an absolute target would be a guess.
    box.scrollBy({
      left: c.left - b.left - (b.width - c.width) / 2,
      behavior: jumps() ? "auto" : "smooth",
    });
  }, [active]);

  /* --------------------------------------------------------------- the move

     One movement function for the chips, for the "next" control and for the
     return to the top, so the three can never disagree about where a section
     starts or about how long the chip stays held. */
  const move = useCallback((top: number, id: string) => {
    const root = neoScroller();
    if (!root) return false;
    const jump = jumps();
    // A jump is over by the next frame; a smooth scroll of a long page is not.
    // The ceiling is generous because it is only a ceiling — arriving releases
    // the hold, and on these pages arriving is what usually happens first.
    want.current = jump ? "" : id;
    held.current = Date.now() + (jump ? 120 : 2600);
    setActive(id);
    root.scrollTo({ top: Math.max(0, top), behavior: jump ? "auto" : "smooth" });
    return true;
  }, []);

  const goSection = useCallback(
    (id: string) => {
      const root = neoScroller();
      const el = document.getElementById(id);
      if (!root || !el) return false;
      const bar = nav.current?.offsetHeight ?? 0;
      const top =
        root.scrollTop + el.getBoundingClientRect().top - root.getBoundingClientRect().top - bar - 12;
      return move(top, id);
    },
    [move],
  );

  const goTop = useCallback(() => {
    if (order.length) move(0, order[0]);
  }, [move, order]);

  /* --------------------------------------------------------------- the click */
  const onChip = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      // A modified click is the reader asking for a new tab. Leave it alone.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      // With no scroller and no target the plain <a href="#id"> is still correct,
      // so this is never a dead control — it just stops being enhanced.
      if (goSection(id)) e.preventDefault();
    },
    [goSection],
  );

  if (sections.length < 2) return null;

  const at = Math.max(0, sections.findIndex((s) => s.id === active));
  const next = sections[at + 1] ?? null;
  const two = (n: number) => String(n).padStart(2, "0");

  return (
    <nav
      ref={nav}
      className="nxs"
      aria-label={label}
      data-stuck={stuck ? "1" : undefined}
      style={{ "--nxs-p": (at + 1) / sections.length } as React.CSSProperties}
    >
      {/* WHERE AM I, as a number. Small, monospaced, and never the only signal:
          the lit chip beside it says the same thing in words. */}
      <p className="nxs-at">
        <span className="nxs-sr">מיקום בעמוד: </span>
        <b>{two(at + 1)}</b>
        <span aria-hidden="true">/</span>
        <span>{two(sections.length)}</span>
      </p>

      <div className="nxs-reel" ref={reel}>
        {sections.map((s, i) => (
          <a
            key={s.id}
            className="nxs-i nm-sel"
            data-sec={s.id}
            data-on={s.id === active ? "1" : undefined}
            data-key={s.feature ? "1" : undefined}
            href={`#${s.id}`}
            aria-current={s.id === active ? "true" : undefined}
            onClick={(e) => onChip(e, s.id)}
          >
            <em className="nxs-n" aria-hidden="true">{two(i + 1)}</em>
            <span className="nxs-t">{s.label}</span>
          </a>
        ))}
      </div>

      {/* WHAT COMES NEXT — by name, not as an arrow into nothing. At the end of
          the page the same control is the way back to the top, so the reader
          never has to reach for the scrollbar to start over. */}
      {next ? (
        <button
          type="button"
          className="nxs-next"
          onClick={() => goSection(next.id)}
          aria-label={`לפרק הבא: ${next.label}`}
        >
          <span className="nxs-next-k" aria-hidden="true">הבא</span>
          <span className="nxs-next-t" aria-hidden="true">{next.label}</span>
          <ChevronDown size={15} strokeWidth={2} aria-hidden="true" />
        </button>
      ) : (
        <button type="button" className="nxs-next" onClick={goTop} aria-label={topLabel}>
          <span className="nxs-next-t" aria-hidden="true">{topLabel}</span>
          <ChevronUp size={15} strokeWidth={2} aria-hidden="true" />
        </button>
      )}

      {/* HOW FAR IN. Scrubbed by the canvas itself where the platform can do it
          on the compositor, and by the section count where it cannot. */}
      <span className="nxs-track" aria-hidden="true"><i /></span>
    </nav>
  );
}
