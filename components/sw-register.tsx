"use client";

import { useEffect } from "react";

// Registers the offline service worker (public/sw.js) after the page is idle, so
// it never competes with first paint. When a new SW is installed, it activates on
// the next navigation (skipWaiting in the SW) — no forced reload, no nag. Guarded
// to https/localhost + browsers that support SW; a no-op everywhere else.
export function SWRegister() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
    const register = () => {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
        /* offline shell is best-effort; never break the app on SW failure */
      });
    };
    if (document.readyState === "complete") register();
    else {
      window.addEventListener("load", register, { once: true });
      return () => window.removeEventListener("load", register);
    }
  }, []);
  return null;
}
