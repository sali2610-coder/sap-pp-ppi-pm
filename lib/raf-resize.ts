/**
 * rAF-coalesced resize subscription.
 *
 * The shell had five independent `resize` listeners that each measured layout
 * (offsetWidth / getBoundingClientRect) synchronously. Browsers fire resize many
 * times per drag, so every one of those measurements forced a style+layout
 * recalculation mid-stream — classic layout thrashing, and the cost grows with
 * the painted area, which is exactly why it showed up on a wall display.
 *
 * This coalesces every subscriber into a single listener that runs at most once
 * per animation frame, so measurement happens after the browser has settled.
 */
type Cb = () => void;

const subs = new Set<Cb>();
let frame = 0;
let attached = false;

function flush() {
  frame = 0;
  for (const cb of subs) {
    try { cb(); } catch { /* a failing subscriber must not stop the others */ }
  }
}

function onResize() {
  if (frame) return;              // already scheduled for this frame
  frame = requestAnimationFrame(flush);
}

/** Subscribe to coalesced resize. Returns an unsubscribe function. */
export function onWindowResize(cb: Cb): () => void {
  if (typeof window === "undefined") return () => {};
  subs.add(cb);
  if (!attached) {
    window.addEventListener("resize", onResize, { passive: true });
    attached = true;
  }
  return () => {
    subs.delete(cb);
    if (subs.size === 0 && attached) {
      window.removeEventListener("resize", onResize);
      attached = false;
      if (frame) { cancelAnimationFrame(frame); frame = 0; }
    }
  };
}
