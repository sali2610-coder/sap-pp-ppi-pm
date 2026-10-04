"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Maximize, Minimize } from "lucide-react";

type ScreenElement = HTMLElement & { webkitRequestFullscreen?: () => Promise<void> | void };
type ScreenDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
};

function currentScreen() {
  return document.fullscreenElement ?? (document as ScreenDocument).webkitFullscreenElement ?? null;
}

/** One control for every NEO route. Browser fullscreen and the window-sized
 * fallback are named separately, and neither changes the saved rail mode. */
export function ScreenControl() {
  const button = useRef<HTMLButtonElement>(null);
  const nativeWas = useRef(false);
  const [expanded, setExpanded] = useState(false);
  const [native, setNative] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");

  const exit = useCallback(async () => {
    const app = button.current?.closest<ScreenElement>(".nx-app");
    if (app && currentScreen() === app) {
      const d = document as ScreenDocument;
      try { await (d.exitFullscreen ?? d.webkitExitFullscreen)?.call(d); }
      catch { setNotice("ליציאה ממסך מלא אפשר להשתמש ב-Escape."); return; }
    }
    setExpanded(false);
    setNotice("");
    button.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const app = button.current?.closest<ScreenElement>(".nx-app");
    if (!app) return;
    const sync = () => {
      const active = currentScreen() === app;
      setNative(active);
      if (nativeWas.current && !active) {
        setExpanded(false);
        setNotice("");
        button.current?.focus({ preventScroll: true });
      }
      nativeWas.current = active;
    };
    document.addEventListener("fullscreenchange", sync);
    document.addEventListener("webkitfullscreenchange", sync);
    return () => {
      document.removeEventListener("fullscreenchange", sync);
      document.removeEventListener("webkitfullscreenchange", sync);
    };
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const app = button.current?.closest<ScreenElement>(".nx-app");
    if (!app) return;
    app.setAttribute("data-expanded-view", "1");
    const key = (event: KeyboardEvent) => {
      // A dialog or search owns its first Escape. Native fullscreen owns its
      // own Escape too; fullscreenchange restores the shell afterwards.
      if (event.key !== "Escape" || event.defaultPrevented || currentScreen()) return;
      if (app.querySelector('[role="dialog"]') || app.dataset.searching === "1" || app.dataset.focus === "1") return;
      void exit();
    };
    window.addEventListener("keydown", key);
    return () => {
      app.removeAttribute("data-expanded-view");
      window.removeEventListener("keydown", key);
    };
  }, [expanded, exit]);

  const toggle = async () => {
    if (busy) return;
    setBusy(true);
    try {
      if (expanded) { await exit(); return; }
      const app = button.current?.closest<ScreenElement>(".nx-app");
      if (!app) return;
      setExpanded(true);
      const request = app.requestFullscreen ?? app.webkitRequestFullscreen;
      if (request) {
        try { await request.call(app); } catch { /* Keep the usable window-sized view. */ }
      }
      const active = currentScreen() === app;
      nativeWas.current = active;
      setNative(active);
      setNotice(active ? "מסך מלא. ליציאה אפשר ללחוץ Escape." : "התצוגה הורחבה בתוך חלון הדפדפן. ליציאה אפשר ללחוץ Escape.");
    } finally { setBusy(false); }
  };

  const label = expanded ? (native ? "יציאה ממסך מלא" : "יציאה מתצוגה מורחבת") : "מסך מלא";
  return (
    <>
      <button ref={button} type="button" className="nxk-b nx-screen-button"
        aria-label={label} aria-pressed={expanded} aria-busy={busy}
        title={expanded ? `${label} · Esc` : "מסך מלא בכל מסכי NEO"} onClick={toggle}>
        {expanded ? <Minimize size={15} aria-hidden="true" /> : <Maximize size={15} aria-hidden="true" />}
        <span>{expanded ? (native ? "יציאה ממסך מלא" : "חזרה לתצוגה רגילה") : "מסך מלא"}</span>
      </button>
      <span className="sr-only" role="status">{notice}</span>
    </>
  );
}
