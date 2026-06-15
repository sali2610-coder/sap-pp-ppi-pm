"use client";

// AUDIO REMOVED — NEO is a professional SAP knowledge platform, not a game.
// All cues are now no-ops. The Web Audio path was also the root cause of the
// PM → Control Center → Areas freeze: the synchronous AudioContext.resume()
// inside the click handler stalled navigation (notably in Safari), which the
// user experienced as "screen + sound stuck". Removing audio fixes that bug.
// The API is kept intact so the ~18 call sites need no changes.

export function playPing() {}
export function playClick() {}
export function playTick() {}
export function isMuted() {
  return true;
}
export function setMuted(_v: boolean) {}
