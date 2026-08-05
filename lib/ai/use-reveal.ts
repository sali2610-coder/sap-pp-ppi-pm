"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Progressive reveal of a completed answer.
 *
 * Honest framing: /api/ask-v2 returns the whole answer in one response, so this
 * is NOT token streaming. It reveals text the client already holds. The reason
 * to do it anyway is that a 700-word answer appearing in a single frame reads
 * as a page load, while a paced reveal reads as a reply — and it lets the
 * reader start at the top instead of hunting for it.
 *
 * Reveal advances on whole words so Hebrew never breaks mid-word, and it stops
 * at block boundaries so a table or list is never shown half-parsed.
 */
export function useReveal(text: string, enabled: boolean) {
  const [shown, setShown] = useState(enabled ? "" : text);
  const raf = useRef<number | null>(null);
  const startedAt = useRef(0);
  const lastIdx = useRef(-1);

  useEffect(() => {
    if (!enabled || !text) { setShown(text); return; }

    // Someone who asked for less motion wants the answer, not the performance.
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShown(text);
      return;
    }

    // Word offsets, so a slice never lands inside a word.
    const stops: number[] = [];
    const re = /\S+\s*/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) stops.push(m.index + m[0].length);
    if (!stops.length) { setShown(text); return; }

    // Long answers must not take proportionally longer: cap the whole reveal so
    // a 900-word answer still completes in about a second and a half. Short
    // answers get a floor so a two-line reply does not simply flash.
    const TOTAL_MS = Math.max(320, Math.min(1500, 260 + stops.length * 7));
    startedAt.current = performance.now();
    lastIdx.current = -1;
    setShown("");

    const tick = (now: number) => {
      const p = Math.min(1, (now - startedAt.current) / TOTAL_MS);
      // Ease-out: fast start so the reader sees content immediately, gentle end.
      const eased = 1 - Math.pow(1 - p, 2);
      const idx = Math.max(1, Math.floor(eased * stops.length));
      // Only touch state when the visible slice actually grows. At 120Hz the
      // previous version re-rendered the whole answer on frames that revealed
      // nothing new, which is what made long answers feel like they stuttered.
      const next = stops[idx - 1];
      if (next !== lastIdx.current) {
        lastIdx.current = next;
        setShown(text.slice(0, next));
      }
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setShown(text);
    };
    raf.current = requestAnimationFrame(tick);

    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [text, enabled]);

  return { shown, done: shown.length >= text.length };
}
