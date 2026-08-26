"use client";

/* ============================================================================
   PROJECT NEO · READER — two facts about the environment.
   ----------------------------------------------------------------------------
   Both are needed by more than one component in this folder, and neither is
   worth a dependency.
   ========================================================================== */

import { useEffect, useState } from "react";

/**
 * The user asked the operating system for less motion.
 *
 * Read live rather than once: macOS and Windows both let this change while a
 * page is open, and a lens that keeps sliding after the setting flipped is
 * exactly the failure the setting exists to prevent.
 *
 * Starts `false` so the server render and the hydrating render agree; the
 * effect corrects it before paint-relevant work happens.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/**
 * The element that actually scrolls.
 *
 * The NEO shell is a 100dvh grid whose canvas (`.nx-canvas`, app/globals.css)
 * carries `overflow: auto` — so the window does NOT scroll on /neo, and a
 * reader that listened to `window` would compute a progress of zero forever.
 * This walks up from the reader root to the nearest ancestor DECLARED as a
 * scroll container, and falls back to the document element for any surface that
 * is not inside the shell.
 *
 * IT ASKS WHAT THE ELEMENT IS, NOT WHAT IT CURRENTLY MEASURES. An earlier
 * version also required `scrollHeight > clientHeight`, i.e. that the container
 * were ALREADY overflowing at the moment the reader mounted. On a client-side
 * navigation into /neo/read/<id>/ it never is: the chapter's prose arrives from
 * /books/<id>/ch<n>.json after mount, so at mount the canvas is exactly as tall
 * as its content, the test failed, and the reader silently bound itself to the
 * document — which does not scroll inside the shell. Every consequence followed
 * from that one line: a `?s=` deep link landed nowhere, the progress rail stayed
 * at 0% and the breadcrumb kept naming the first subchapter of the chapter.
 *
 * An element that declares `overflow-y: auto` and does not happen to overflow is
 * still the scroller; scrolling it is simply a no-op, and reading its scrollTop
 * gives 0, which is the true answer.
 */
export function scrollHost(from: HTMLElement | null): HTMLElement {
  let el: HTMLElement | null = from?.parentElement ?? null;
  while (el && el !== document.body) {
    if (/(auto|scroll|overlay)/.test(getComputedStyle(el).overflowY)) return el;
    el = el.parentElement;
  }
  return document.scrollingElement instanceof HTMLElement
    ? document.scrollingElement
    : document.documentElement;
}
