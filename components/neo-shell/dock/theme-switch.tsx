"use client";

/* ============================================================================
   PROJECT NEO · APPEARANCE — יום / אוטומטי / לילה
   ----------------------------------------------------------------------------
   WHY A SEGMENTED CONTROL AND NOT A BUTTON THAT OPENS A PANEL

     The requirement is that a reader can LOOK at the interface and know which
     mode is active. A single button that toggles, or a control hidden behind a
     panel, both fail that: you have to open something, or infer the state from
     the page — and Home now has deliberate dark scenes IN LIGHT MODE, so the
     page itself is no longer evidence of the theme. Three segments, one filled,
     answers the question without any interaction.

   WHY "AUTO" IS A REAL THIRD STATE AND NOT A DERIVED ONE

     localStorage holds "light" | "dark" | "system". Auto is not "whatever the
     OS says right now" collapsed into light/dark at write time — it is stored
     as its own value, so the choice survives an OS change. lib/theme-boot's
     pre-paint script already reads exactly these three values; this control is
     the UI for a contract that already existed.

   THE LIVE OS LISTENER IS THE PART THAT IS EASY TO GET WRONG

     Selecting Auto and then changing the system appearance has to repaint NEO
     without a reload. That needs a matchMedia listener that is attached ONLY
     while the mode is "system", and removed otherwise — otherwise a user on an
     explicit Light setting gets yanked to dark when their OS flips at sunset.

   NO RELOAD, NO SCROLL RESET, NO LAYOUT JUMP

     Applying a theme is one attribute write on <html>. Nothing unmounts, so
     scroll position, open panels and navigation state all survive by
     construction rather than by being restored.
   ========================================================================== */

import { useCallback, useEffect, useState } from "react";
import { Moon, Sun, SunMoon } from "lucide-react";
import { THEME_KEY } from "@/lib/theme-boot";

type Mode = "light" | "system" | "dark";

const MODES: { id: Mode; he: string; Icon: typeof Sun; hint: string }[] = [
  { id: "light", he: "יום", Icon: Sun, hint: "מצב יום" },
  { id: "system", he: "אוטומטי", Icon: SunMoon, hint: "לפי הגדרת מערכת ההפעלה" },
  { id: "dark", he: "לילה", Icon: Moon, hint: "מצב לילה" },
];

const prefersDark = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;

/** The one write that changes the whole product. */
function paint(mode: Mode) {
  const dark = mode === "dark" || (mode === "system" && prefersDark());
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
}

export function ThemeSwitch() {
  /* Starts at "system" to match theme-boot's own default. The real stored value
     is read after mount: reading localStorage during render would make the
     server and client disagree and produce a hydration mismatch. */
  const [mode, setMode] = useState<Mode>("system");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let stored: Mode = "system";
    try {
      const v = localStorage.getItem(THEME_KEY);
      if (v === "light" || v === "dark" || v === "system") stored = v;
    } catch { /* private mode: fall back to system */ }
    setMode(stored);
    setReady(true);
  }, []);

  /* Attached only while the mode is "system". An explicit Light choice must not
     be overridden when the OS flips at sunset. */
  useEffect(() => {
    if (mode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => paint("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [mode]);

  const pick = useCallback((next: Mode) => {
    setMode(next);
    try { localStorage.setItem(THEME_KEY, next); } catch { /* ignore */ }
    paint(next);
  }, []);

  /* What the OS is actually saying, so "אוטומטי" can show its RESULT. Auto that
     does not tell you where it landed is only marginally better than no
     control at all. */
  const resolved = ready && mode === "system" ? (prefersDark() ? "לילה" : "יום") : null;

  return (
    <div
      className="nxk-theme"
      role="radiogroup"
      aria-label="מראה: יום, אוטומטי או לילה"
      data-ready={ready ? "1" : "0"}
    >
      {MODES.map(({ id, he, Icon, hint }) => {
        const on = mode === id;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={on}
            className="nxk-theme-b"
            data-on={on ? "1" : "0"}
            title={id === "system" && resolved ? `${hint} · כרגע ${resolved}` : hint}
            onClick={() => pick(id)}
          >
            <Icon className="ico" size={14} strokeWidth={2} aria-hidden="true" />
            <span className="nxk-theme-t">{he}</span>
          </button>
        );
      })}
      {/* The resolved state of Auto, stated rather than left to be inferred. */}
      {resolved ? <span className="nxk-theme-now">{resolved}</span> : null}
    </div>
  );
}
