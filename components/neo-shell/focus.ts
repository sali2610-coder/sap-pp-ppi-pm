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
