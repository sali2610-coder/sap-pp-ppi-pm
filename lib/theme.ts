"use client";

/**
 * Theme preference: light, dark, or follow the OS.
 *
 * The attribute is written to <html> so a single token override themes the whole
 * product. Reading and applying happens outside React (see the inline script in
 * the root layout) because doing it in an effect paints light first and then
 * flashes to dark, which looks broken on every navigation.
 */
export type Theme = "light" | "dark" | "system";

export { THEME_KEY } from "./theme-boot";
import { THEME_KEY } from "./theme-boot";


export function getTheme(): Theme {
  if (typeof window === "undefined") return "system";
  const v = localStorage.getItem(THEME_KEY);
  return v === "light" || v === "dark" || v === "system" ? v : "system";
}

export function applyTheme(t: Theme) {
  const dark = t === "dark" || (t === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
}

export function setTheme(t: Theme) {
  try { localStorage.setItem(THEME_KEY, t); } catch { /* private mode */ }
  applyTheme(t);
}

/** Keeps "system" honest when the OS flips while the tab is open. */
export function watchSystem(onChange: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const h = () => { if (getTheme() === "system") onChange(); };
  mq.addEventListener("change", h);
  return () => mq.removeEventListener("change", h);
}
