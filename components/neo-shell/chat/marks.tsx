"use client";

/* ============================================================================
   PROJECT NEO · CHAT — the two identities, drawn.
   ----------------------------------------------------------------------------
   The brief for the library surface was that it must not read as a blank text
   box. It needed a face — but a face in the abstract sense: this product is a
   technical SAP migration cockpit, so a cartoon character would have been the
   wrong answer twice over, once for the audience and once for the brand.

   So there are two marks, and they are deliberately built from different
   geometry so the two surfaces cannot be mistaken for one another even at a
   glance, even at 24px, even in a screenshot with the text cropped out:

     LibrarianMark   an open book at the centre of two orbits. It is the
                     specialist that reads the shelf: the book is the subject,
                     the orbits are the index sweeping over it. Brand red on
                     the book, quiet ink on the orbits.
     NeoMark         a node graph — a hexagonal lattice with every vertex tied
                     to one core. No book anywhere in it. It is the site-wide
                     assistant, so it is drawn as a system, not as a shelf.

   NEITHER MARK CLAIMS ANYTHING. A state is passed in by the surface and every
   state maps to something the engine actually reported (see engine.ts): idle,
   thinking before the first token, writing while tokens arrive, error when the
   request failed. There is no "confident" state and no mood.

   All motion is transform and opacity, defined in app/neo/chat.css inside
   motion-safe guards, and every animation is switched off under reduced motion
   while the mark stays fully legible.
   ========================================================================== */

import type { CSSProperties } from "react";

/** Every state here corresponds to a real phase of a real request. */
export type MarkState = "idle" | "thinking" | "writing" | "error";

interface MarkProps {
  state?: MarkState;
  /** Rendered size in px. The art is a 48-unit square and scales cleanly. */
  size?: number;
  className?: string;
}

function frame(size: number): CSSProperties {
  return { "--nxm-size": `${size}px` } as CSSProperties;
}

/**
 * The library specialist.
 *
 * Geometry, from the outside in: a broken outer orbit, an inner orbit carrying
 * a single travelling node, and an open book. The book is the only part drawn
 * in brand red, so the mark still reads as "books" when it is 24px tall in a
 * message gutter and the orbits have collapsed to hairlines.
 */
export function LibrarianMark({ state = "idle", size = 48, className }: MarkProps) {
  return (
    <span
      className={className ? `nxm ${className}` : "nxm"}
      data-mark="librarian"
      data-state={state}
      style={frame(size)}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 48" fill="none" focusable="false">
        <g className="nxm-orbit nxm-o1">
          <path d="M24 5.5A18.5 18.5 0 0 1 42.5 24" />
          <path d="M24 42.5A18.5 18.5 0 0 1 5.5 24" />
        </g>
        <g className="nxm-orbit nxm-o2">
          <path d="M37 24A13 13 0 0 1 24 37" />
          <path d="M11 24A13 13 0 0 1 24 11" />
          <circle className="nxm-node" cx="24" cy="11" r="2" />
        </g>
        <g className="nxm-book">
          <path d="M24 18.6c-2.7-2-5.8-2.6-9.3-1.9v11.9c3.5-.7 6.6-.1 9.3 1.9" />
          <path d="M24 18.6c2.7-2 5.8-2.6 9.3-1.9v11.9c-3.5-.7-6.6-.1-9.3 1.9" />
          <path className="nxm-spine" d="M24 18.6v11.9" />
        </g>
      </svg>
    </span>
  );
}

/**
 * The general assistant.
 *
 * A lattice, not a library. Six vertices tied to one core: the shape of a
 * system-wide helper rather than of a bookshelf. The core is the only brand
 * red, for the same reason the book is on the other mark.
 */
export function NeoMark({ state = "idle", size = 48, className }: MarkProps) {
  return (
    <span
      className={className ? `nxm ${className}` : "nxm"}
      data-mark="neo"
      data-state={state}
      style={frame(size)}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 48" fill="none" focusable="false">
        <g className="nxm-hex">
          <path d="M24 7.5 38.3 15.75v16.5L24 40.5 9.7 32.25v-16.5Z" />
        </g>
        <g className="nxm-spokes">
          <path className="nxm-s1" d="M24 24 24 7.5" />
          <path className="nxm-s2" d="M24 24 38.3 15.75" />
          <path className="nxm-s3" d="M24 24 38.3 32.25" />
          <path className="nxm-s4" d="M24 24 24 40.5" />
          <path className="nxm-s5" d="M24 24 9.7 32.25" />
          <path className="nxm-s6" d="M24 24 9.7 15.75" />
        </g>
        <g className="nxm-vtx">
          <circle cx="24" cy="7.5" r="1.7" />
          <circle cx="38.3" cy="15.75" r="1.7" />
          <circle cx="38.3" cy="32.25" r="1.7" />
          <circle cx="24" cy="40.5" r="1.7" />
          <circle cx="9.7" cy="32.25" r="1.7" />
          <circle cx="9.7" cy="15.75" r="1.7" />
        </g>
        <circle className="nxm-core" cx="24" cy="24" r="3.4" />
      </svg>
    </span>
  );
}
