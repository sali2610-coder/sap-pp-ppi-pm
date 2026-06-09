"use client";

// CDN-free auditory cues via the Web Audio API — synthesized tones, no asset
// files. Subtle + non-intrusive. Respects a mute pref + reduced-motion.

let ctx: AudioContext | null = null;
let muted = false;

if (typeof window !== "undefined") {
  muted = localStorage.getItem("neo:muted") === "1";
}

function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

function tone(freq: number, durMs: number, type: OscillatorType = "sine", gain = 0.04) {
  if (muted) return;
  const a = ac();
  if (!a) return;
  if (a.state === "suspended") a.resume().catch(() => {});
  const osc = a.createOscillator();
  const g = a.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const now = a.currentTime;
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(gain, now + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, now + durMs / 1000);
  osc.connect(g).connect(a.destination);
  osc.start(now);
  osc.stop(now + durMs / 1000);
}

/** Soft high 'ping' — search open / result select. */
export function playPing() {
  tone(880, 120, "sine", 0.05);
  setTimeout(() => tone(1320, 90, "sine", 0.035), 40);
}

/** Soft muted 'click' — main button / navigation. */
export function playClick() {
  tone(420, 60, "triangle", 0.045);
}

/** Gentle 'tick' — selection move. */
export function playTick() {
  tone(620, 35, "sine", 0.025);
}

export function isMuted() {
  return muted;
}
export function setMuted(v: boolean) {
  muted = v;
  if (typeof window !== "undefined") localStorage.setItem("neo:muted", v ? "1" : "0");
}
