"use client";

/* ============================================================================
   PROJECT NEO · CHAT — what is on screen while the engine works.
   ----------------------------------------------------------------------------
   Three honest things, and nothing else:

     the phase   derived in engine.ts from events the backend actually sent —
                 `meta`, `delta`, `status`. There is no timer walking a script
                 of invented stages, and no chain of thought: the preview is the
                 answer's own text arriving, not a narration of reasoning.
     the clock   real wall clock since the request left this browser.
     the preview the ungated `delta` text. It is labelled as a draft because
                 that is what it is — lib/ai/stream discards it if the grounding
                 gate rejects the answer, and the final text replaces it.
   ========================================================================== */

import { useEffect, useState } from "react";
import type { AiMode } from "@/lib/ai/modes";
import type { Scope } from "@/lib/ai/types";
import { TurnScope } from "./context-bar";
import { type LiveState, phaseLabel, secs } from "./engine";

/** Citation markers are meaningless until the citation list exists; a raw
 *  "[[book1#3#3.2]]" mid-sentence reads as corruption, so it is hidden in the
 *  draft exactly as the shipped surface hides it. */
const stripMarkers = (s: string) => s.replace(/\s*\[\[[^\]]{1,120}\]\]/g, "");

export function Live({ live, question, askedIn, scope, mode }: {
  live: LiveState;
  question: string;
  /** Scope frozen at send — the request in flight cannot change scope. */
  askedIn?: Scope;
  scope: Scope;
  mode: AiMode;
}) {
  const [now, setNow] = useState(() => performance.now());

  // One second, not 100ms: this is a readable elapsed time, not a stopwatch,
  // and a coarse tick keeps the surface calm while a 45s answer is written.
  useEffect(() => {
    const iv = window.setInterval(() => setNow(performance.now()), 1000);
    return () => window.clearInterval(iv);
  }, []);

  const elapsed = Math.max(0, now - live.startedAt);
  const draft = stripMarkers(live.preview);

  return (
    <article className="nxq-turn">
      <div className="nxq-user">
        <p className="nxq-user-bubble">{question}</p>
        {mode === "library" ? <TurnScope scope={askedIn} current={scope} /> : null}
      </div>

      <div className="nxq-assistant">
        <div className="nxq-live" role="status" aria-live="polite">
          <span className="nxq-live-dots" aria-hidden="true">
            <span /><span /><span />
          </span>
          <span className="nxq-live-label">{phaseLabel(live)}</span>
          {live.passages != null ? (
            <span className="nu-chip nxq-live-chip">{live.passages} קטעים נמצאו</span>
          ) : null}
          <span className="nxq-live-time">{secs(elapsed)}</span>
        </div>

        {draft ? (
          <div className="nxq-draft">
            <p className="nxq-draft-t">
              {draft}
              <span className="nxq-caret-live" aria-hidden="true" />
            </p>
            <span className="nxq-draft-tag">טיוטה — הטקסט הסופי מוחלף אחרי בדיקת הביסוס</span>
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
    </article>
  );
}
