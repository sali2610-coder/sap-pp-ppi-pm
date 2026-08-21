"use client";

/* ============================================================================
   PROJECT NEO · THE LIBRARY ASSISTANT, DRAWN
   ----------------------------------------------------------------------------
   WHY A CHARACTER AND NOT ANOTHER ICON

     The surface already had a mark — LibrarianMark, an open book inside two
     orbits. It is a good mark and it stays: it is the right thing at 24px in a
     message gutter, where a face would collapse into mud.

     But a mark is not a greeting. Opening the screen, nothing said "someone is
     here with the books"; it said "this is a panel about books". The brief asked
     for the difference, and the difference is a figure — something with a front,
     holding something, facing you.

   THE FOUR THINGS IT IS NOT

     Not a cartoon. No round eyes, no smile curve, no bounce. The eyes are two
     level strokes, which reads as attention rather than as cuteness.
     Not a chrome robot. No panel lines, no antenna, no bolts.
     Not neon sci-fi. The palette is the library's: burgundy, parchment, teal.
     Not a toy. It has the proportions of an editorial bust — head to shoulder
     roughly 1:2 — not the big-head-small-body proportion of a mascot.

   WHAT IT ACTUALLY IS

     A reader, seen from the front, holding an open book toward you. Dimension
     comes from two soft gradients and one occlusion (the book overlaps the
     shoulders), not from bevels or drop shadows. The "NEO" is on the book's
     band, which is where a publisher's name goes on a real technical book — so
     the identity is carried by the object it is holding, exactly as SAP PRESS
     is carried on the covers this library is built from.

   COLOUR COMES FROM THE SCENE, NOT FROM THIS FILE

     Every fill is a var() with a fallback. Dropped into [data-scene="library"]
     it wears burgundy/teal/parchment; dropped anywhere else it takes that
     scene's accent. Nothing here hard-codes a hex that could fight a theme.

   MOTION

     Idle: the figure breathes, and one page edge lifts a few degrees. Thinking:
     the pages riffle and the book's glow rises. Writing: a single line travels
     across the page, which is the only literal thing in the drawing. All of it
     is transform/opacity only, all of it inside motion-safe guards in chat.css,
     and under reduced motion the art is static and completely legible.
   ========================================================================== */

import type { CSSProperties } from "react";
import type { MarkState } from "./marks";

interface Props {
  state?: MarkState;
  /** Rendered size in px. The art is a 120-unit square and scales cleanly. */
  size?: number;
  className?: string;
}

/**
 * NEO, the library assistant.
 *
 * Used large in the welcome composition and nowhere else at this size — per the
 * brief, once the conversation starts the identity shrinks back to
 * `LibrarianMark` beside each answer rather than repeating a big illustration.
 */
export function NeoLibrarian({ state = "idle", size = 132, className }: Props) {
  const id = "nql";
  return (
    <span
      className={className ? `nql ${className}` : "nql"}
      data-state={state}
      style={{ "--nql-size": `${size}px` } as CSSProperties}
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 120" width={size} height={size} fill="none" focusable="false">
        <defs>
          {/* Dimension #1: the body turns away from the light at its edges. */}
          <linearGradient id={`${id}-body`} x1="0.2" y1="0" x2="0.85" y2="1">
            <stop offset="0" stopColor="var(--nql-accent, #7a1533)" stopOpacity="1" />
            <stop offset="1" stopColor="var(--nql-accent, #7a1533)" stopOpacity="0.72" />
          </linearGradient>
          {/* Dimension #2: paper is brightest at the gutter and falls off. */}
          <linearGradient id={`${id}-page`} x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0" stopColor="var(--nql-paper, #fffdf9)" />
            <stop offset="1" stopColor="var(--nql-paper-2, #efe6d6)" />
          </linearGradient>
          <radialGradient id={`${id}-halo`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="var(--nql-cool, #0f766e)" stopOpacity="0.30" />
            <stop offset="1" stopColor="var(--nql-cool, #0f766e)" stopOpacity="0" />
          </radialGradient>
          {/* The book occludes the arms. Cutting the shape is cheaper and
              crisper than stacking a matching-coloured patch over them. */}
          <clipPath id={`${id}-above`}>
            <rect x="0" y="0" width="120" height="88" />
          </clipPath>
        </defs>

        {/* THE PLINTH, AND WHY IT IS NOT DECORATION.
            The book's pages are paper-white. Sitting on a paper-white card they
            were invisible — measured: only the burgundy body and the dark band
            rendered, so the figure read as a red blob with a label. The plinth
            is a tone BETWEEN the card and the room, which gives the white pages
            an edge to exist against without introducing a new colour. */}
        <rect className="nql-plinth" x="4" y="6" width="112" height="108" rx="30"
          fill="var(--nql-plinth, #f1e8d8)" />

        {/* The reading light. Grows when thinking — that IS the thinking state. */}
        <circle className="nql-halo" cx="60" cy="62" r="46" fill={`url(#${id}-halo)`} />

        <g className="nql-body">
          {/* Shoulders. Broad and high enough to actually READ as a body — the
              first cut clipped them to a sliver, so the figure looked like a
              head floating over a book rather than a person holding one. */}
          <g clipPath={`url(#${id}-above)`}>
            {/* Neck first, behind everything. Without it the head hovered 21
                units above the shoulders and the figure came apart. It is
                narrow, short, and DARKER than the face — a neck is in the
                head's shadow, and the first cut drew it the same tone and the
                same width as the jaw, which read as a slab rather than a neck. */}
            <g>
              <rect x="54.5" y="46" width="11" height="20" rx="3" fill="var(--nql-accent, #7a1533)" />
              <rect x="54.5" y="46" width="11" height="20" rx="3"
                fill="var(--nql-visor, #12100e)" opacity="0.17" />
            </g>
            {/* SHOULDERS WITH A NECKLINE, NOT A DOME.
                A single arc peaking at centre reads as a hill with a head on
                it, and it left ~23 units of bare neck showing between chin and
                shoulder — which looked like a beard. This is the real
                silhouette: shoulders slope up from the outer edge to a FLAT
                neckline at y=63, so only a few units of neck are ever visible,
                which is how a bust is actually proportioned. */}
            <path d="M10 114C10 90 26 68 48 63L72 63C94 68 110 90 110 114Z"
              fill={`url(#${id}-body)`} />
            {/* A collar. One line, and the shoulders stop reading as a dome. */}
            <path d="M50 64q10 9 20 0"
              stroke="var(--nql-paper, #fffdf9)" strokeOpacity="0.30"
              strokeWidth="1.6" fill="none" strokeLinecap="round" />
          </g>

          {/* Head. A rounded square, not a circle: considered rather than a
              smiley, and it echoes the book's corners. The visor is INSET
              rather than edge-to-edge — a full-width slot is the single detail
              that made the first version read as a helmet. */}
          <g className="nql-head">
            <rect x="42" y="12" width="36" height="42" rx="15" fill={`url(#${id}-body)`} />

            {/* READING GLASSES, NOT A VISOR.
                The first two passes put a dark inset band across the eyes. It
                was legible and it was wrong: a horizontal slot with two glowing
                bars behind it is the exact vocabulary of the "generic chrome
                robot" the brief rules out. Spectacles carry the same job —
                they mark where attention is — and land on scholar instead of
                machine, which is what a library assistant should be. */}
            <g className="nql-specs">
              <rect x="45.5" y="28.5" width="12" height="10.5" rx="4.6"
                fill="var(--nql-cool, #0f766e)" fillOpacity="0.20"
                stroke="var(--nql-visor, #12100e)" strokeOpacity="0.85" strokeWidth="1.7" />
              <rect x="62.5" y="28.5" width="12" height="10.5" rx="4.6"
                fill="var(--nql-cool, #0f766e)" fillOpacity="0.20"
                stroke="var(--nql-visor, #12100e)" strokeOpacity="0.85" strokeWidth="1.7" />
              <path d="M57.5 32.6q2.5-1.6 5 0"
                stroke="var(--nql-visor, #12100e)" strokeOpacity="0.85" strokeWidth="1.7" fill="none" />
              <path d="M45.5 32.2h-3M74.5 32.2h3"
                stroke="var(--nql-visor, #12100e)" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" />
              {/* The eyes themselves, behind the glass. Small and level: this is
                  attention, not cuteness — no highlight dot, no lash, no curve. */}
              <circle className="nql-eye" cx="51.5" cy="34" r="1.9" fill="var(--nql-visor, #12100e)" />
              <circle className="nql-eye" cx="68.5" cy="34" r="1.9" fill="var(--nql-visor, #12100e)" />
            </g>
          </g>

          {/* The open book, held out toward the reader. */}
          <g className="nql-book">
            <path className="nql-leaf nql-leaf-l"
              d="M22 84c10-4 22-4 36 2v26c-14-6-26-6-36-2z" fill={`url(#${id}-page)`}
              stroke="var(--nql-ink, #22201d)" strokeOpacity="0.16" strokeWidth="1.1" />
            <path className="nql-leaf nql-leaf-r"
              d="M98 84c-10-4-22-4-36 2v26c14-6 26-6 36-2z" fill={`url(#${id}-page)`}
              stroke="var(--nql-ink, #22201d)" strokeOpacity="0.16" strokeWidth="1.1" />
            <path d="M58 86h4v26h-4z" fill="var(--nql-accent, #7a1533)" opacity="0.55" />
            <path d="M22 84c10-4 22-4 36 2 14-6 26-6 36-2"
              stroke="var(--nql-ink, #22201d)" strokeOpacity="0.20" strokeWidth="1.4" fill="none" />

            {/* THE LEFT PAGE IS A TITLE PAGE.
                This is where the identity moved to, and it is the whole reason
                the drawing works: the figure is not BRANDED with NEO, it is
                holding a book that is CALLED NEO — with the publisher line
                under the rule, exactly where SAP PRESS sits on the real covers
                this library was built from. Identity by object, not by badge. */}
            <text x="39" y="99" textAnchor="middle"
              fontSize="10" fontWeight="700" letterSpacing="1.5"
              fill="var(--nql-ink, #22201d)" fillOpacity="0.86"
              fontFamily="'Segoe UI', system-ui, sans-serif"
            >NEO</text>
            <path d="M28 103h22" stroke="var(--nql-accent, #7a1533)" strokeOpacity="0.5" strokeWidth="1.2" />
            <text x="39" y="109" textAnchor="middle"
              fontSize="4.2" fontWeight="600" letterSpacing="0.7"
              fill="var(--nql-ink, #22201d)" fillOpacity="0.5"
              fontFamily="'Segoe UI', system-ui, sans-serif"
            >SAP PRESS</text>

            {/* Right page: body text, and the one line that travels while an
                answer is genuinely streaming. */}
            <g stroke="var(--nql-ink, #22201d)" strokeOpacity="0.24" strokeWidth="1.6" strokeLinecap="round">
              <path d="M70 94h20" /><path d="M70 100h17" />
            </g>
            <path className="nql-write" d="M70 106h14"
              stroke="var(--nql-hot, #d62027)" strokeWidth="1.8" strokeLinecap="round" />

            {/* Hands. Small, but they are what turns "a book is here" into
                "someone is holding a book", which is what the brief asked for. */}
            <rect x="17.5" y="92" width="7.5" height="15" rx="3.7" fill="var(--nql-accent, #7a1533)" />
            <rect x="95" y="92" width="7.5" height="15" rx="3.7" fill="var(--nql-accent, #7a1533)" />
          </g>
        </g>
      </svg>
    </span>
  );
}
