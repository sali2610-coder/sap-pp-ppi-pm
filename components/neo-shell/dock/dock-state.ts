"use client";

/* The one piece of state the dock's buttons and its panels share: which panel is
   open. The buttons live in the shell's top bars (server-rendered, so the bar
   does not shift when the client arrives: gate 4, minor 12) and the panels live
   in components/neo-shell/dock/neo-dock.tsx, which a route change never
   remounts. A module store read through useSyncExternalStore joins the two
   without a provider around the whole tree. */

import { useSyncExternalStore } from "react";

export type DockPanel = "none" | "type" | "ask";

let panel: DockPanel = "none";
const subs = new Set<() => void>();

export function setDockPanel(next: DockPanel | ((cur: DockPanel) => DockPanel)): void {
  const v = typeof next === "function" ? next(panel) : next;
  if (v === panel) return;
  panel = v;
  subs.forEach((f) => f());
}

const subscribe = (f: () => void) => {
  subs.add(f);
  return () => { subs.delete(f); };
};

export const useDockPanel = (): DockPanel =>
  useSyncExternalStore(subscribe, () => panel, () => "none");

/* The resolved theme, read from <html data-theme>, which lib/theme-boot writes
   before first paint. The word on the button is drawn by CSS from the same
   attribute (app/neo/dock.css), so it is right on the first paint; this value
   only feeds the accessible name, which may arrive after hydration. */
const watchTheme = (f: () => void) => {
  const mo = new MutationObserver(f);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};
const readTheme = () => {
  const t = document.documentElement.getAttribute("data-theme");
  return t === "dark" ? "לילה" : t === "light" ? "יום" : "";
};

export const useThemeWord = (): string => useSyncExternalStore(watchTheme, readTheme, () => "");
