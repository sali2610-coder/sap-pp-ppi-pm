"use client";

// FLIP primitives for the signature rail.
//
// Width is a layout property, so it is never transitioned. The rail's grid track
// changes ONCE, synchronously, and then every pixel is put back where it was and
// sprung home on transform. That is the whole mechanic.
//
// Two deliberate departures from the prototype:
//
// 1. The Web Animations API replaces inline `style.transition` strings plus a
//    naked `setTimeout(…, 760)` cleanup. The prototype never stored those timers,
//    so a second click at t<760ms left the previous timer alive; when it fired it
//    stripped the transition off an element that was still springing and produced
//    a visible snap. `el.getAnimations().forEach(a => a.cancel())` is genuinely
//    interruptible, needs no cleanup timer, and cannot leak.
//
// 2. There is no scaled `.stage` here, so every `/ scale` and `* scale`
//    conversion the prototype needed was deleted rather than ported. Rects are
//    measured directly.
//
// Measuring LIVE rects on entry is what makes an interrupted flip feel physical:
// a transformed element reports its animated visual box, so the new inversion
// starts from where the pixels actually are, not from where they were supposed
// to end up.

export const SPRING = "cubic-bezier(0.22, 1.2, 0.36, 1)";
export const EASE_OUT_EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";

export const RAIL_MS = 520;
export const GROUP_MS = 460;
export const ENTER_MS = 300;

/** rAF that still runs in a hidden tab, so a backgrounded page never freezes a
 *  sequence half-way and leaves the indicator positioned from stale layout. */
export const raf = (fn: () => void): void => {
  if (typeof document !== "undefined" && document.hidden) { window.setTimeout(fn, 16); return; }
  requestAnimationFrame(fn);
};
export const raf2 = (fn: () => void): void => raf(() => raf(fn));

export function reducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch { return false; }
}

type Axis = "X" | "Y";

/** Invert-and-play one element on a single axis. Cancels anything already
 *  running on it, so a mid-flight change of mind composes instead of snapping. */
export function play(el: HTMLElement, d: number, axis: Axis, delay: number, duration: number) {
  if (reducedMotion() || !Number.isFinite(d) || Math.abs(d) <= 0.5) return;
  el.getAnimations().forEach((a) => a.cancel());
  el.animate(
    [{ transform: `translate${axis}(${d}px)` }, { transform: "translate3d(0,0,0)" }],
    { duration, easing: SPRING, delay, fill: "none" },
  );
}

/** The rail surface plate grows from its own outer edge instead of translating,
 *  so its children are never distorted by the width change. */
export function playScaleX(el: HTMLElement, from: number, to: number, duration = RAIL_MS) {
  if (reducedMotion() || !(from > 0) || !(to > 0) || Math.abs(from - to) <= 0.5) return;
  el.getAnimations().forEach((a) => a.cancel());
  el.animate(
    [{ transform: `scaleX(${from / to})` }, { transform: "scaleX(1)" }],
    { duration, easing: SPRING, fill: "none" },
  );
}

/** Entrance for items a group reveals — layered on top of the FLIP, not instead
 *  of it, so newly visible rows arrive while the survivors are still travelling. */
export function playEnter(el: HTMLElement, delay: number) {
  if (reducedMotion()) return;
  el.animate(
    [{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "translate3d(0,0,0)" }],
    { duration: ENTER_MS, easing: EASE_OUT_EXPO, delay, fill: "none" },
  );
}

/** Cancel everything in flight under a root — used before a hard re-layout. */
export function stopAll(root: HTMLElement | null) {
  if (!root) return;
  root.getAnimations({ subtree: true }).forEach((a) => a.cancel());
}

export type RectMap = Map<HTMLElement, DOMRect>;

export const measure = (els: (HTMLElement | null)[]): RectMap => {
  const m: RectMap = new Map();
  for (const el of els) if (el) m.set(el, el.getBoundingClientRect());
  return m;
};
