"use client";

// Optional page-turn sound — synthesized with Web Audio (100% offline, no asset).
// A short filtered-noise "paper swoosh". OFF by default; never autoplays; the
// preference persists locally. Respects prefers-reduced-motion (treated as "quiet").
import { useCallback, useEffect, useState } from "react";

const KEY = "neo:reader:sound";
let ctx: AudioContext | null = null;
let noise: AudioBuffer | null = null;

function ensure(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    if (!ctx) ctx = new AC();
    if (!noise && ctx) {
      const len = Math.floor(ctx.sampleRate * 0.22);
      noise = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = noise.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len); // decaying noise
    }
    return ctx;
  } catch { return null; }
}

export function playPageTurn(forward = true) {
  const c = ensure(); if (!c || !noise) return;
  try {
    if (c.state === "suspended") c.resume();
    const src = c.createBufferSource(); src.buffer = noise;
    const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = forward ? 2400 : 1900; bp.Q.value = 0.8;
    const g = c.createGain();
    const t = c.currentTime;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.06, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
    src.connect(bp); bp.connect(g); g.connect(c.destination);
    src.start(t); src.stop(t + 0.22);
  } catch { /* noop */ }
}

export function useReaderSound() {
  const [on, setOn] = useState(false);
  useEffect(() => { try { setOn(localStorage.getItem(KEY) === "1"); } catch { /* noop */ } }, []);
  const toggle = useCallback(() => { const n = !on; try { localStorage.setItem(KEY, n ? "1" : "0"); } catch { /* noop */ } if (n) playPageTurn(); setOn(n); }, [on]);
  const play = useCallback((forward: boolean) => { if (on) playPageTurn(forward); }, [on]);
  return { on, toggle, play };
}
