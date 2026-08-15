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
 * This walks up from the reader root to the nearest ancestor that genuinely
 * scrolls, and falls back to the document element for any surface that is not
 * inside the shell.
 */
export function scrollHost(from: HTMLElement | null): HTMLElement {
  let el: HTMLElement | null = from?.parentElement ?? null;
  while (el && el !== document.body) {
    const s = getComputedStyle(el);
    if (/(auto|scroll|overlay)/.test(s.overflowY) && el.scrollHeight > el.clientHeight + 1) return el;
    el = el.parentElement;
  }
  return document.scrollingElement instanceof HTMLElement
    ? document.scrollingElement
    : document.documentElement;
}
