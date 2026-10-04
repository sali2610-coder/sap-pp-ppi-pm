"use client";

/* ============================================================================
   PROJECT NEO · MOTION PROVIDER
   ----------------------------------------------------------------------------
   WHAT THIS DELIBERATELY DOES NOT DO

     It does not animate anything. Every reveal, parallax, pin and kinetic line
     in this product is a CSS scroll-driven animation running on the compositor,
     which is the entire reason NEO can carry ORYZO's choreography without
     ORYZO's 1,595ms main-thread block. Putting a scroll listener here would
     hand all of that back.

     So this component owns two small jobs, and no frame loop:

       1. Publish the surface's motion LEVEL onto the shell, so the CSS
          amplitudes resolve. One attribute write per route change.
       2. Track which SCENE the reader is in, so the shell padding around a
          scene can match its ground instead of framing it in the wrong colour.

     (A third, the Safari fallback for the scroll reveals, went with the
     reveals in 2026-10; see the note at its old place below.)

   WHY THE OBSERVER ROOT IS .nx-canvas

     The NEO shell is 100dvh with overflow hidden; the element that actually
     scrolls is .nx-canvas. An IntersectionObserver with the default root
     watches the viewport, which for this shell never scrolls, so every element
     would report as permanently intersecting and the fallback would reveal the
     whole page at once. The root has to be the real scroller.

   WHY IT NEVER HIDES CONTENT IT CANNOT REVEAL

     The fallback CSS only hides an element once `[data-nm="on"]` is present on
     the shell, and that attribute is written by this component after mount. If
     the bundle fails, the observer throws, or JS is off entirely, nothing is
     hidden and the page reads normally. Content is never gated on an effect.
   ========================================================================== */

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motionLevel } from "./level";

export function MotionProvider() {
  const path = usePathname() || "/neo";

  /* --- 1. level ---------------------------------------------------------- */
  useEffect(() => {
    const app = document.querySelector<HTMLElement>(".nx-app");
    if (!app) return;
    app.dataset.motion = String(motionLevel(path));
    return () => { delete app.dataset.motion; };
  }, [path]);

  /* --- 2. (removed 2026-10) the reveal fallback --------------------------
     Safari has no scroll-driven animation, so this effect watched the whole
     document with an IntersectionObserver and a MutationObserver to reveal
     .nm-rise elements by hand. The reveals themselves are gone from every
     surface (motion.css), so on Safari the observers only cost main-thread
     time on every DOM change for nothing. */

  /* --- 3. scene tracking -------------------------------------------------- */
  useEffect(() => {
    const app = document.querySelector<HTMLElement>(".nx-app");
    const scroller = app?.querySelector<HTMLElement>(".nx-canvas");
    if (!app || !scroller) return;

    const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    if (scenes.length === 0) return;

    let io: IntersectionObserver | null = null;
    try {
      io = new IntersectionObserver(
        (entries) => {
          // The scene that owns the MIDDLE of the screen is the scene the
          // reader is in. Picking by "most visible" makes the ground flicker
          // between two neighbours at the seam; picking by the centre line is
          // stable because only one element can hold it.
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            const el = e.target as HTMLElement;
            const name = el.dataset.scene || "base";
            if (app.dataset.sceneNow === name) continue;
            app.dataset.sceneNow = name;
            app.style.setProperty(
              "--nm-shell-ground",
              getComputedStyle(el).getPropertyValue("--scene-ground").trim() || "",
            );
          }
        },
        { root: scroller, rootMargin: "-50% 0px -50% 0px", threshold: 0 },
      );
      scenes.forEach((s) => io?.observe(s));
    } catch { /* the ground simply stays at its default */ }

    return () => {
      io?.disconnect();
      delete app.dataset.sceneNow;
      app.style.removeProperty("--nm-shell-ground");
    };
  }, [path]);

  return null;
}
