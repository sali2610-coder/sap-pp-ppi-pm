"use client";

import { useEffect, useState } from "react";

/**
 * Mounts its children only once the app is actually being used.
 *
 * WHY
 * The shell mounted every overlay (command palette + search index, object peek,
 * find highlighter, onboarding, page help, UX settings) on every page. They are
 * `dynamic()` imports, so they do not block first paint — but React renders them
 * immediately, which means their chunks are fetched right after hydration on
 * every single visit. Measured on the homepage: ~3.9 MB of JavaScript downloaded
 * after first contentful paint for overlays the user had not opened.
 *
 * In a security-scanned corporate environment (remote browser isolation, VDI
 * proxies) every one of those files is inspected before it can execute, so bytes
 * that are merely "not blocking paint" are still expensive.
 *
 * BEHAVIOUR
 * Children mount on the first real interaction — pointer, key, touch, wheel or
 * scroll. Nothing is lost: a user cannot open any of these overlays without
 * interacting first.
 *
 * An idle-based fallback was tried first and deliberately removed. On a fast
 * connection requestIdleCallback fires within ~1s of load, so the chunks were
 * fetched anyway and the measured startup cost did not move at all. Waiting for
 * genuine intent is the only version that actually keeps them off startup — which
 * is the entire point in a bandwidth- and scanning-constrained environment.
 */
/** Boot marker — surfaced by /diag.html so a slow stage can be named, not guessed. */
export function mark(name: string) {
  try { performance.mark(`neo:${name}`); } catch { /* marks are diagnostics only */ }
}

export function DeferMount({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    mark("shell-hydrated");
    if (ready) return;
    const fire = () => { mark("first-interaction"); setReady(true); };
    const events: (keyof WindowEventMap)[] = ["pointerdown", "keydown", "touchstart", "wheel", "scroll"];
    events.forEach((e) => window.addEventListener(e, fire, { once: true, passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, fire));
  }, [ready]);

  if (ready) mark("overlays-mounted");
  return ready ? <>{children}</> : null;
}
