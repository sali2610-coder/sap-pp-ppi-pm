"use client";

/* ============================================================================
   PROJECT NEO · READER — the reading lens.
   ----------------------------------------------------------------------------
   WHAT IT IS
     A band of quiet. Everything above and below a short reading window is
     veiled, so the eye has one place to be. It is for slow reading, for reading
     a dense SAP procedure line by line, and for anyone who loses their place in
     a long Hebrew paragraph.

   WHY IT ISOLATES RATHER THAN MAGNIFIES
     Scaling live text would reflow the paragraph under the reader's eye — the
     line they were on would move, which is the opposite of what a lens is for.
     Magnification is therefore a SEPARATE control (the type-size steps in the
     toolbar, which reflow once and stay put), and the lens does the one thing
     it can do without moving the words: it isolates. The toolbar says so.

   HOW IT IS BUILT
     Two veils, each a full-viewport block, translated so their inner edges meet
     the band. Only `transform` and `opacity` ever change — no width, no height,
     no inset, no filter, no mask, no WebGL — so it costs one composited layer
     and nothing else.

     Pointer present  → the band follows the pointer.
     Touch / no hover → the band parks at the comfortable reading line and the
                        reader scrolls the text through it.

   REDUCED MOTION
     The whole thing is off. Not "off but still veiled": the component renders
     nothing, and app/neo/reader.css hides it again at the stylesheet level, so
     neither a stale preference nor a race can leave a moving band on screen.
   ========================================================================== */

import { useEffect, useRef } from "react";

/** Where the band parks when there is no pointer: a little above centre, which
 *  is where people naturally hold a line of text. */
const REST = 0.42;

export function ReadingLens({ reduced, band }: { reduced: boolean; band: number }) {
  const topRef = useRef<HTMLSpanElement>(null);
  const botRef = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);
  const y = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) return;

    const place = () => {
      raf.current = 0;
      const vh = window.innerHeight;
      const centre = y.current ?? vh * REST;
      const half = band / 2;
      const top = Math.max(0, centre - half);
      const bottom = Math.min(vh, centre + half);
      if (topRef.current) topRef.current.style.transform = `translate3d(0, ${top - vh}px, 0)`;
      if (botRef.current) botRef.current.style.transform = `translate3d(0, ${bottom}px, 0)`;
    };

    const schedule = () => { if (!raf.current) raf.current = requestAnimationFrame(place); };

    const onMove = (e: PointerEvent) => {
      // A coarse pointer is a finger that is scrolling, not a cursor that is
      // reading. Following it would drag the band away under the thumb.
      if (e.pointerType !== "mouse") return;
      y.current = e.clientY;
      schedule();
    };
    const onLeave = () => { y.current = null; schedule(); };

    place();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", schedule);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [reduced, band]);

  if (reduced) return null;

  return (
    <div className="nr-lens" aria-hidden="true">
      <span className="nr-lens-veil nr-lens-top" ref={topRef} />
      <span className="nr-lens-veil nr-lens-bot" ref={botRef} />
    </div>
  );
}
