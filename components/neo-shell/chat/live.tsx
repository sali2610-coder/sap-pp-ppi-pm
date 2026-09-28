"use client";

/* ============================================================================
   PROJECT NEO · CHAT — what is on screen while the engine works.
   ----------------------------------------------------------------------------
   Four honest things, and nothing else:

     the phase   derived in engine.ts from events the backend actually sent —
                 `meta`, `delta`, `status`. There is no timer walking a script
                 of invented stages, and no chain of thought: the preview is the
                 answer's own text arriving, not a narration of reasoning.
     the clock   real wall clock since the request left this browser.
     the preview the ungated `delta` text. It is labelled as a draft because
                 that is what it is — lib/ai/stream discards it if the grounding
                 gate rejects the answer, and the final text replaces it.
     the mark    the surface's own identity, in the state matching the phase.

   THINKING AND TYPING ARE DRAWN AS TWO DIFFERENT THINGS, because they are two
   different things. Before the first token there is nothing to read, so the
   surface shows the working state and a placeholder shaped like the answer to
   come. From the first token on it shows the text arriving with a caret. The
   switch is the arrival of a real `delta`, not a timeout.
   ========================================================================== */

import { useEffect, useState } from "react";
import type { AiMode } from "@/lib/ai/modes";
import type { Scope } from "@/lib/ai/types";
import { TurnScope } from "./context-bar";
import { type LiveState, phaseOf, phaseLabel, secs } from "./engine";
import { LibrarianMark, NeoMark } from "./marks";

/** Citation markers are meaningless until the citation list exists; a raw
 *  "[[book1#3#3.2]]" mid-sentence reads as corruption, so it is hidden in the
 *  draft exactly as the shipped surface hides it. */
const stripMarkers = (s: string) => s.replace(/\s*\[\[[^\]]{1,120}\]\]/g, "");

export function Live({ live, question, askedIn, scope, mode, who }: {
  live: LiveState;
  question: string;
  /** Scope frozen at send — the request in flight cannot change scope. */
  askedIn?: Scope;
  scope: Scope;
  mode: AiMode;
  who: string;
}) {
  const [now, setNow] = useState(() => performance.now());

  // A tenth of a second. The elapsed time is one of the few honest things on
  // screen during a 45s wait, and a counter that visibly moves is the
  // difference between "it is working" and "it is stuck". It writes to a single
  // text node, so the cost is a repaint of one line, not a layout of the thread.
  useEffect(() => {
    const iv = window.setInterval(() => setNow(performance.now()), 100);
    return () => window.clearInterval(iv);
  }, []);

  const elapsed = Math.max(0, now - live.startedAt);
  const draft = stripMarkers(live.preview);
  const phase = phaseOf(live);
  const typing = phase === "writing";
  const Mark = mode === "library" ? LibrarianMark : NeoMark;

  return (
    <article className="nxq-turn">
      <div className="nxq-user">
        <p className="nxq-user-bubble">{question}</p>
        {mode === "library" ? <TurnScope scope={askedIn} current={scope} /> : null}
      </div>

      <div className="nxq-assistant">
        <div className="nxq-gutter">
          <Mark size={30} state={typing ? "writing" : "thinking"} className="nxq-avatar" />
        </div>

        <div className="nxq-said">
          <p className="nxq-who">
            <span className="nxq-who-n">{who}</span>
            <span className="nxq-elapsed nxq-elapsed-live">{secs(elapsed)}</span>
          </p>

          <div className="nxq-live" data-phase={phase} role="status" aria-live="polite">
            {/* The three dots are the typing indicator and appear only while
                text is actually arriving. Before that the state is thinking,
                and it is drawn as a pulse on the mark instead — two states,
                two shapes, never the same animation for both. */}
            {typing ? (
              <span className="nxq-live-dots" aria-hidden="true"><span /><span /><span /></span>
            ) : (
              <span className="nxq-live-scan" aria-hidden="true"><span /></span>
            )}
            <span className="nxq-live-label">{phaseLabel(live)}</span>
            {live.passages != null ? (
              <span className="nu-chip nxq-live-chip">{live.passages} קטעים נמצאו</span>
            ) : null}
          </div>

          {draft ? (
            <div className="nxq-draft">
              <p className="nxq-draft-t">
                {draft}
                <span className="nxq-caret-live" aria-hidden="true" />
              </p>
              <span className="nxq-draft-tag">טיוטה: הטקסט הסופי יוצג לאחר בדיקת הביסוס מול המקורות.</span>
            </div>
          ) : (
            // Reserves roughly the space the answer will take, so nothing jumps
            // when it lands. Purely a placeholder — it claims no content.
            <div className="nxq-skel" aria-hidden="true">
              <span style={{ inlineSize: "100%" }} />
              <span style={{ inlineSize: "94%" }} />
              <span style={{ inlineSize: "86%" }} />
              <span style={{ inlineSize: "62%" }} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
