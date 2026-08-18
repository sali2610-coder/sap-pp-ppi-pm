"use client";

// Project NEO · Home — the scene shell.
//
// WHAT THIS COMPONENT IS NOT ANY MORE
//
//   The previous Home shipped a 105-dot field driven from a passive scroll
//   listener and two rAF loops. It was measured against the same references the
//   motion engine was measured against, and it lost for the same reason ORYZO
//   loses: work on the main thread during scroll. Everything that scrubs,
//   parallaxes or pins on Home is now a CSS scroll-driven animation declared in
//   app/neo/motion.css and running on the compositor.
//
//   So this file owns exactly two things, and neither of them is animation:
//
//     1. The chapter index. Which section holds the middle of the screen is a
//        question only an observer can answer, and an IntersectionObserver
//        answers it without touching the scroll path. One attribute write per
//        section crossing, never per frame.
//     2. The wrapper element every selector in app/neo/home.css is anchored on.
//
//   There is no scroll listener here, no requestAnimationFrame, no wheel or
//   touch handler, and no element position is ever written from JS. The scroll
//   progress rail is `animation-timeline: scroll()`; the parallax layers are
//   `animation-timeline: view()`; the pinned map is `position: sticky`.
//
// WHY THE OBSERVER ROOT IS .nx-canvas
//
//   The NEO shell is 100dvh with overflow hidden and the element that actually
//   scrolls is .nx-canvas. window.scrollY on this product is always 0, so an
//   observer watching the viewport would report every section as permanently
//   intersecting and the index would never move.

import { useEffect, useRef } from "react";

export interface SceneSection {
  id: string;
  /** Chapter name in the index. */
  label: string;
  /** What the ground is doing in this chapter — the index states the scene. */
  field: string;
}

export function HomeScene({
  sections, children,
}: { sections: SceneSection[]; children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const scroller = el.closest<HTMLElement>(".nx-canvas");
    const secs = [...el.querySelectorAll<HTMLElement>("[data-hsec]")];
    const links = [...el.querySelectorAll<HTMLAnchorElement>("[data-nh-jump]")];
    if (secs.length === 0 || !("IntersectionObserver" in window)) return;

    let io: IntersectionObserver | null = null;
    try {
      io = new IntersectionObserver(
        (entries) => {
          // The section that owns the MIDDLE of the screen is the section the
          // reader is in. Picking by "most visible" makes the index flicker at
          // every seam; only one element can hold the centre line.
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            const i = secs.indexOf(e.target as HTMLElement);
            if (i < 0) continue;
            el.dataset.sec = String(i);
            for (let k = 0; k < links.length; k += 1) {
              links[k].setAttribute("aria-current", k === i ? "true" : "false");
            }
          }
        },
        { root: scroller ?? null, rootMargin: "-50% 0px -50% 0px", threshold: 0 },
      );
      for (const s of secs) io.observe(s);
    } catch {
      // No observer means the index simply stays on its first entry. Nothing on
      // this page is hidden behind it, so failing open costs a highlight and
      // nothing else.
    }

    return () => io?.disconnect();
  }, [sections]);

  return (
    <div className="nh" ref={root} data-sec="0">
      {/* Scroll progress. `scroll()` resolves against the nearest scrollport,
          which on this shell is .nx-canvas — the same element the observer above
          uses as its root. Zero JS, zero main-thread cost. */}
      <div className="nh-prog" aria-hidden="true"><i /></div>

      {/* The index is declared BEFORE the sections on purpose: a sticky element
          sticks from its own place in the flow, and after them it would only
          ever appear at the very end of the page. */}
      <nav className="nh-index" aria-label="פרקי העמוד">
        <div>
          {sections.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              data-nh-jump={i}
              aria-current={i === 0 ? "true" : "false"}
            >
              <span className="nh-index-n nh-sap">{String(i + 1).padStart(2, "0")}</span>
              <span className="nh-index-l">{s.label}</span>
              <span className="nh-index-f">{s.field}</span>
            </a>
          ))}
        </div>
      </nav>

      {children}
    </div>
  );
}
