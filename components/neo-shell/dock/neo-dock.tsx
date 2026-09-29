"use client";

/* ============================================================================
   PROJECT NEO · THE DOCK (§22 + §23)
   ----------------------------------------------------------------------------
   Two controls on every NEO page: display settings and page help.

   2026 system: they live in the TOP BAR, not in a floating corner. Floating,
   they covered the phone's tab bar and the last line of content; in the bar they
   sit with the other page tools, in reading order. The buttons are portalled
   into a slot the shell renders (#nx-dock-slot on a desktop, #nx-dock-mslot on
   a phone or tablet), so they are in the header's DOM and its tab order, while
   the state and the panels stay here, where a route change never remounts them.

   Page help opens a popover under the bar on a desktop and a BOTTOM SHEET on a
   phone. Both are the same component in two positions; only the CSS differs.

   WHAT THIS IS NOT, AND SAYS SO ON SCREEN
     The assistant here is a SHELL. §22 asks for the architecture, not a second
     AI, and inventing a backend it does not have would be the exact failure the
     brief spends a section warning about. So it states plainly that it cannot
     answer yet, shows the context it WOULD send, and hands over to the two real
     surfaces — /neo/ai/ for the books, /neo/chat/ for general SAP.
   ========================================================================== */

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Type, CircleHelp, X, BookOpen, MessageSquare, Check } from "lucide-react";
import { ThemeSwitch } from "./theme-switch";
import {
  contextFromPath, contextLine, NEO_CTX_EVENT,
  type NeoContext, type NeoContextPatch,
} from "./context";
import {
  FACES, SIZES, applyType, clearType, readType, writeType,
  type NeoFace, type NeoSize, type NeoTypePref,
} from "./typography";

type Panel = "none" | "type" | "ask";

const noSubscribe = () => () => {};
const dockSlot = () =>
  document.getElementById(document.documentElement.dataset.device === "desktop" ? "nx-dock-slot" : "nx-dock-mslot");
const noSlot = () => null;

export function NeoDock() {
  const path = usePathname() || "/";
  const [panel, setPanel] = useState<Panel>("none");
  const [pref, setPref] = useState<NeoTypePref | null>(null);
  const [patch, setPatch] = useState<NeoContextPatch | null>(null);
  const closer = useRef<HTMLButtonElement | null>(null);

  // Read on mount, never during render: the value lives in localStorage, and
  // reading it while rendering would make the server and client disagree.
  useEffect(() => {
    const p = readType();
    setPref(p);
    applyType(p);
    // Leaving /neo unmounts the shell, and the size lives on <html>. Without
    // this the reader's NEO choice would follow them into the production
    // routes that share the document.
    return () => clearType();
  }, []);

  // A route change invalidates whatever the previous surface published.
  useEffect(() => { setPatch(null); }, [path]);

  useEffect(() => {
    const onCtx = (e: Event) => setPatch((e as CustomEvent<NeoContextPatch>).detail ?? null);
    window.addEventListener(NEO_CTX_EVENT, onCtx);
    return () => window.removeEventListener(NEO_CTX_EVENT, onCtx);
  }, []);

  useEffect(() => {
    if (panel === "none") return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setPanel("none"); };
    window.addEventListener("keydown", onKey);
    closer.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [panel]);

  const ctx: NeoContext = useMemo(() => {
    const base = contextFromPath(path);
    return patch ? { ...base, ...patch, subject: patch.subject ?? base.subject } : base;
  }, [path, patch]);

  const set = useCallback((next: Partial<NeoTypePref>) => {
    setPref((cur) => {
      const merged = { ...(cur ?? { face: "system" as NeoFace, size: "md" as NeoSize }), ...next };
      writeType(merged);
      return merged;
    });
  }, []);

  const open = panel !== "none";

  // The slot the shell renders for this device. data-device is written before
  // first paint and never changes, so there is nothing to subscribe to; the
  // server snapshot (null) keeps hydration identical to the server HTML, and
  // the client value arrives in the render right after it.
  const slot = useSyncExternalStore(noSubscribe, dockSlot, noSlot);

  // The resolved theme, read from the document so the bar can name it without
  // owning the switch's state. Hebrew words only; nothing shown before hydration.
  const [themeNow, setThemeNow] = useState<string>("");
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setThemeNow(root.getAttribute("data-theme") === "dark" ? "לילה" : root.getAttribute("data-theme") === "light" ? "יום" : "");
    read();
    const mo = new MutationObserver(read);
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);

  return (
    <>
      {slot ? createPortal(
      <div className="nxk">
        {/* ONE display menu (design audit §3, 2026-09-22): appearance, font
            and size live in the same panel. The bar still answers "which mode am
            I in" from across the room: the button carries the resolved theme. */}
        <button
          type="button"
          className="nxk-b nxk-b--display"
          aria-expanded={panel === "type"}
          aria-label={`הגדרות תצוגה: מראה, גופן וגודל טקסט${themeNow ? ` (כעת ${themeNow})` : ""}`}
          onClick={() => setPanel((p) => (p === "type" ? "none" : "type"))}
        >
          <Type className="ico" size={16} aria-hidden="true" />
          <span>תצוגה</span>
          {themeNow ? <em className="nxk-b-state">{themeNow}</em> : null}
        </button>
        <button
          type="button"
          className="nxk-b nxk-b--ask"
          aria-expanded={panel === "ask"}
          aria-label="עזרה בעמוד: ההקשר הנוכחי והיכן אפשר לשאול"
          onClick={() => setPanel((p) => (p === "ask" ? "none" : "ask"))}
        >
          <CircleHelp className="ico" size={16} aria-hidden="true" />
          {/* THREE NAMES, THREE THINGS (design audit S7-AI-4): "עזרה בעמוד"
              is this panel — the current page's context and the way to the
              two assistants; "עזרה מהספרייה" answers from the books; "שיחה
              כללית" is the open SAP conversation. */}
          <span>עזרה בעמוד</span>
        </button>
      </div>, slot) : null}

      {open && <button type="button" className="nxk-scrim" aria-label="סגירת החלונית" onClick={() => setPanel("none")} />}

      {panel === "type" && (
        <section className="nxk-p nxk-p--type" role="dialog" aria-modal="false" aria-label="הגדרות תצוגה: מראה, גופן וגודל טקסט">
          <header className="nxk-p-h">
            <h2>תצוגה: מראה, גופן וגודל טקסט</h2>
            <button ref={closer} type="button" className="nu-ghost nxk-x" aria-label="סגירת חלונית התצוגה" onClick={() => setPanel("none")}>
              <X className="ico" size={16} aria-hidden="true" />
            </button>
          </header>

          <fieldset className="nxk-set nxk-set--theme">
            <legend>מראה</legend>
            <ThemeSwitch />
          </fieldset>

          <p className="nxk-note">
            הבחירה נשמרת במכשיר הזה וחלה על כל מסכי NEO.
          </p>

          <fieldset className="nxk-set">
            <legend className="nx-eyebrow">גופן</legend>
            <div className="nxk-grid">
              {FACES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className="nu-card nxk-face"
                  data-on={pref?.face === f.id ? "1" : "0"}
                  aria-pressed={pref?.face === f.id}
                  onClick={() => set({ face: f.id })}
                >
                  <span className="nxk-face-s" style={{ fontFamily: f.stack }}>אבגד Aa</span>
                  <span className="nxk-face-n">{f.he}</span>
                  <span className="nxk-face-d">{f.note}</span>
                  {pref?.face === f.id && <Check className="ico nxk-face-v" size={14} aria-hidden="true" />}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="nxk-set">
            <legend className="nx-eyebrow">גודל טקסט</legend>
            <div className="nxk-sizes">
              {SIZES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className="nu-filter"
                  data-on={pref?.size === s.id ? "1" : "0"}
                  aria-pressed={pref?.size === s.id}
                  onClick={() => set({ size: s.id })}
                >
                  {s.he}
                </button>
              ))}
            </div>
          </fieldset>

          <button type="button" className="nu-btn2 nxk-reset" onClick={() => set({ face: "system", size: "md" })}>
            איפוס לברירת המחדל של NEO
          </button>
        </section>
      )}

      {/* The help panel is an ordinary panel: the 2026 system takes the scenes
          away, and the panel's job is the page's context and two ways to ask. */}
      {panel === "ask" && (
        <section
          className="nxk-p nxk-p--ask"
          role="dialog"
          aria-modal="false"
          aria-label="עזרה בעמוד הזה"
        >
          <header className="nxk-p-h">
            <h2>עזרה בעמוד הזה</h2>
            <button ref={closer} type="button" className="nu-ghost nxk-x" aria-label="סגירת חלונית העזרה" onClick={() => setPanel("none")}>
              <X className="ico" size={16} aria-hidden="true" />
            </button>
          </header>

          <div className="nxk-ctx">
            <span className="nx-eyebrow">ההקשר הנוכחי</span>
            <p className="nxk-ctx-l">{contextLine(ctx)}</p>
            <p className="nxk-ctx-p nx-sap" dir="ltr">{ctx.path}</p>
          </div>

          <p className="nxk-note">
            כאן מוצג ההקשר של העמוד. לשאלות יש שתי אפשרויות:
          </p>

          <div className="nxk-go">
            <Link className="nu-btn nxk-go-a" href="/neo/ai/" prefetch={false} onClick={() => setPanel("none")}>
              <BookOpen className="ico" size={16} aria-hidden="true" />
              עזרה מהספרייה
              <em>שאל את הספרייה · תשובות מספרי הספרייה, עם מקורות</em>
            </Link>
            <Link className="nu-btn2 nxk-go-a" href="/neo/chat/" prefetch={false} onClick={() => setPanel("none")}>
              <MessageSquare className="ico" size={16} aria-hidden="true" />
              שיחה כללית
              <em>NEO AI · שאלות SAP כלליות, ללא מקורות מהפרויקט</em>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
