"use client";

import { useSyncExternalStore } from "react";

export type MotionPreference = "system" | "reduce" | "full";
const KEY = "neo:motion:v1";
const EVENT = "neo:motion-change";
const QUERY = "(prefers-reduced-motion: reduce)";
let choice: MotionPreference = "system";
let loaded = false;
let media: MediaQueryList | null = null;
const systemMedia = () => media ??= window.matchMedia(QUERY);

function read(): MotionPreference {
  try {
    const saved = localStorage.getItem(KEY);
    return saved === "reduce" || saved === "full" ? saved : "system";
  }
  catch { return "system"; }
}

function snapshot(): MotionPreference {
  if (!loaded && typeof window !== "undefined") { choice = read(); loaded = true; }
  return choice;
}

/** One subscription covers the site choice, another tab and a live OS change. */
export function subscribeMotion(onChange: () => void): () => void {
  const media = systemMedia();
  const storage = (e: StorageEvent) => {
    if (e.key !== KEY && e.key !== null) return;
    choice = read(); loaded = true; onChange();
  };
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", storage);
  media.addEventListener("change", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", storage);
    media.removeEventListener("change", onChange);
  };
}

export function setMotionPreference(next: MotionPreference): void {
  choice = next; loaded = true;
  try { localStorage.setItem(KEY, next); } catch { /* keep the choice for this visit */ }
  window.dispatchEvent(new Event(EVENT));
}

export function motionIsReduced(): boolean {
  if (typeof window === "undefined") return false;
  const preference = snapshot();
  if (preference !== "system") return preference === "reduce";
  return systemMedia().matches;
}

export function useMotionPreference(): MotionPreference {
  return useSyncExternalStore(subscribeMotion, snapshot, () => "system");
}

export function useMotionReduced(): boolean {
  return useSyncExternalStore(subscribeMotion, motionIsReduced, () => false);
}
