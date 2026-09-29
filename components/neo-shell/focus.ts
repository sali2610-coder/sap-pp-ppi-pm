"use client";

// Page-scoped focus mode (design audit §3, 2026-09-21): a page asks for the
// canvas alone and the shell hides its rail, top bar and dock while `on` is
// true. Implemented as one attribute on the shell root, removed on exit and on
// unmount, never persisted: leaving the page always restores the shell. The
// page owns the exit control; Escape also exits.

import { useEffect } from "react";

export function useShellFocus(on: boolean, onExit?: () => void) {
  useEffect(() => {
    const app = document.querySelector<HTMLElement>(".nx-app");
    if (!app) return;
    if (!on) { app.removeAttribute("data-focus"); return; }
    app.setAttribute("data-focus", "1");
    const key = (e: KeyboardEvent) => { if (e.key === "Escape" && onExit) onExit(); };
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("keydown", key);
      app.removeAttribute("data-focus");
    };
  }, [on, onExit]);
}

/** Arrow keys for a tablist or a radiogroup (WAI-ARIA APG; gate 8, m3). Put it
 *  on the container's onKeyDown and give only the selected item tabIndex 0:
 *  the group is one Tab stop, and the arrows, Home and End move and select.
 *  In a right-to-left group the left arrow goes forward. */
export function rovingKeys(e: React.KeyboardEvent<HTMLElement>) {
  const items = [...e.currentTarget.querySelectorAll<HTMLElement>('[role="tab"], [role="radio"]')]
    .filter((el) => !(el as HTMLButtonElement).disabled && el.offsetParent !== null);
  const i = items.indexOf(document.activeElement as HTMLElement);
  if (i < 0) return;
  const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
  const n = items.length;
  const j = e.key === (rtl ? "ArrowLeft" : "ArrowRight") || e.key === "ArrowDown" ? (i + 1) % n
    : e.key === (rtl ? "ArrowRight" : "ArrowLeft") || e.key === "ArrowUp" ? (i - 1 + n) % n
    : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
  if (j < 0) return;
  e.preventDefault();
  items[j].focus();
  items[j].click();
}
