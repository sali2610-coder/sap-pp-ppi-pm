"use client";

/* The dock's two buttons: display settings and page help. The shell renders them
   in its desktop top bar and in its phone and tablet top bar, in the server HTML,
   and html[data-device] shows one of the two bars. They used to be portalled in
   after hydration, so on every desktop load the search field moved about 200px
   when they arrived (gate 4, minor 12).

   The word for the current theme is drawn by CSS from <html data-theme>
   (app/neo/dock.css), which is written before first paint, so it too is there
   from the first frame. Words stay visible on a phone (gate 5, #14). */

import { CircleHelp, Type } from "lucide-react";
import { setDockPanel, useDockPanel, useThemeWord } from "./dock-state";

export function DockButtons() {
  const panel = useDockPanel();
  const theme = useThemeWord();
  return (
    <div className="nxk">
      {/* ONE display menu (design audit §3, 2026-09-22): appearance, font
          and size live in the same panel. The bar still answers "which mode am
          I in" from across the room: the button carries the resolved theme. */}
      <button
        type="button"
        className="nxk-b nxk-b--display"
        data-dock="type"
        aria-expanded={panel === "type"}
        aria-label={`הגדרות תצוגה: מראה, גופן וגודל טקסט${theme ? ` (כעת ${theme})` : ""}`}
        onClick={() => setDockPanel((p) => (p === "type" ? "none" : "type"))}
      >
        <Type className="ico" size={16} aria-hidden="true" />
        <span>תצוגה</span>
        <em className="nxk-b-state" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="nxk-b nxk-b--ask"
        data-dock="ask"
        aria-expanded={panel === "ask"}
        aria-label="עזרה בעמוד: ההקשר הנוכחי והיכן אפשר לשאול"
        onClick={() => setDockPanel((p) => (p === "ask" ? "none" : "ask"))}
      >
        <CircleHelp className="ico" size={16} aria-hidden="true" />
        {/* THREE NAMES, THREE THINGS (design audit S7-AI-4): "עזרה בעמוד"
            is this panel — the current page's context and the way to the
            two assistants; "עזרה מהספרייה" answers from the books; "שיחה
            כללית" is the open SAP conversation. */}
        <span className="nxk-b-long">עזרה בעמוד</span>
        {/* The phone bar also carries the page title, so the word is short
            there; the accessible name is the same. */}
        <span className="nxk-b-short">עזרה</span>
      </button>
    </div>
  );
}
