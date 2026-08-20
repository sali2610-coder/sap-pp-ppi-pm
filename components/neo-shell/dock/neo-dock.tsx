"use client";

/* ============================================================================
   PROJECT NEO · THE DOCK (§22 + §23)
   ----------------------------------------------------------------------------
   Two small controls at the bottom of every NEO page: גופן and שאל את NEO.
   "לא גדולים. לא מסתירים תוכן.": so they sit in the corner, at chip size, and
   the page reserves room for them rather than having them float over the last
   line of text.

   שאל את NEO opens a SIDE PANEL on a desktop and a BOTTOM SHEET on a phone, as
   specified. Both are the same component in two positions; only the CSS differs,
   because two implementations would drift.

   WHAT THIS IS NOT, AND SAYS SO ON SCREEN
     The assistant here is a SHELL. §22 asks for the architecture, not a second
     AI, and inventing a backend it does not have would be the exact failure the
     brief spends a section warning about. So it states plainly that it cannot
     answer yet, shows the context it WOULD send, and hands over to the two real
     surfaces — /neo/ai/ for the books, /neo/chat/ for general SAP.
   ========================================================================== */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Type, Sparkles, X, BookOpen, MessageSquare, Check } from "lucide-react";
import {
  contextFromPath, contextLine, NEO_CTX_EVENT,
  type NeoContext, type NeoContextPatch,
} from "./context";
import {
  FACES, SIZES, applyType, clearType, readType, writeType,
  type NeoFace, type NeoSize, type NeoTypePref,
} from "./typography";

type Panel = "none" | "type" | "ask";

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

  return (
    <>
      <div className="nxk" data-open={open ? "1" : "0"}>
        <button
          type="button"
          className="nxk-b"
          aria-expanded={panel === "type"}
          aria-label="בחירת גופן וגודל טקסט"
          onClick={() => setPanel((p) => (p === "type" ? "none" : "type"))}
        >
          <Type className="ico" size={15} aria-hidden="true" />
          <span>גופן</span>
        </button>
        <button
          type="button"
          className="nxk-b nxk-b--ask"
          aria-expanded={panel === "ask"}
          aria-label="שאל את NEO על העמוד הזה"
          onClick={() => setPanel((p) => (p === "ask" ? "none" : "ask"))}
        >
          <Sparkles className="ico" size={15} aria-hidden="true" />
          <span>שאל את NEO</span>
        </button>
      </div>

      {open && <button type="button" className="nxk-scrim" aria-label="סגור" onClick={() => setPanel("none")} />}

      {panel === "type" && (
        <section className="nxk-p nxk-p--type" role="dialog" aria-modal="false" aria-label="גופן וגודל טקסט">
          <header className="nxk-p-h">
            <h2>גופן וגודל</h2>
            <button ref={closer} type="button" className="nu-ghost nxk-x" aria-label="סגור" onClick={() => setPanel("none")}>
              <X className="ico" size={16} aria-hidden="true" />
            </button>
          </header>

          <p className="nxk-note">
            הבחירה נשמרת במכשיר הזה וחלה על כל מסכי NEO. הגופנים מותקנים במערכת ההפעלה,
            ולכן נטענים מיידית וללא חיבור לרשת.
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
            חזרה לברירת המחדל של NEO
          </button>
        </section>
      )}

      {/* The assistant panel wears NEO'S OWN GROUND — the same near-black indigo
          as /neo/chat/. It was a plain light sheet, which read as a generic form
          rather than as the site assistant: opening it should feel like NEO
          arriving, and should be recognisably the same thing the full chat
          surface is. The font panel deliberately takes NO scene — that one is a
          settings sheet and belongs to the page it adjusts, not to NEO. */}
      {panel === "ask" && (
        <section
          /* data-scene alone, NOT .nm-scene: that helper sets position:relative
             to paint its own ground, which overrode this panel's position:fixed
             and threw it to the wrong edge of the screen. The attribute still
             supplies every scene token; dock.css does the painting. */
          className="nxk-p nxk-p--ask"
          data-scene="ai"
          role="dialog"
          aria-modal="false"
          aria-label="שאל את NEO"
        >
          <header className="nxk-p-h">
            <h2>שאל את NEO</h2>
            <button ref={closer} type="button" className="nu-ghost nxk-x" aria-label="סגור" onClick={() => setPanel("none")}>
              <X className="ico" size={16} aria-hidden="true" />
            </button>
          </header>

          <div className="nxk-ctx">
            <span className="nx-eyebrow">ההקשר הנוכחי</span>
            <p className="nxk-ctx-l">{contextLine(ctx)}</p>
            <p className="nxk-ctx-p nx-sap" dir="ltr">{ctx.path}</p>
          </div>

          <p className="nxk-note">
            העוזר הכללי של NEO עדיין לא מחובר למנוע מענה. כדי לא להציג תשובה שאין מאחוריה
            מקור מאומת, הוא אינו עונה כאן. שתי הסביבות שכן עונות פתוחות למטה, ושתיהן יקבלו
            את ההקשר שמוצג למעלה.
          </p>

          <div className="nxk-go">
            <Link className="nu-btn nxk-go-a" href="/neo/ai/" prefetch={false} onClick={() => setPanel("none")}>
              <BookOpen className="ico" size={16} aria-hidden="true" />
              שאל את הספרייה
              <em>תשובות מתוך 11 הספרים, עם מקורות</em>
            </Link>
            <Link className="nu-btn2 nxk-go-a" href="/neo/chat/" prefetch={false} onClick={() => setPanel("none")}>
              <MessageSquare className="ico" size={16} aria-hidden="true" />
              צ׳אט NEO כללי
              <em>שאלות SAP כלליות, ללא מקורות מהפרויקט</em>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
