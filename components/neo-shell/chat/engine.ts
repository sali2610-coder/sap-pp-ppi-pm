"use client";

/* ============================================================================
   PROJECT NEO · CHAT — the adapter over the existing answer engine.
   ----------------------------------------------------------------------------
   THIS FILE ADDS NO INTELLIGENCE. It calls lib/ai/client.askApiStream, which is
   the same function the shipped AI surfaces call, against the same endpoints,
   with the same task profiles. Retrieval, grounding, citations, the Hebrew gate
   and the refusal policy all stay exactly where they are.

   Two small things this seam exists for:

   1. `onMeta`. lib/ai/stream already emits a `meta` event the moment retrieval
      finishes, carrying how many passages were served — but askApiStream types
      its handler bag as `{ onDelta, onStatus }`, so no caller has ever asked for
      it. It is forwarded verbatim to streamAnswer at runtime, so passing a value
      typed as StreamHandlers (not a fresh object literal, which would trip the
      excess-property check) subscribes to it without touching their file. That
      one event is the difference between a truthful "retrieving" state and a
      guessed one.

   2. Abort. askApiStream converts an AbortError into an Answer whose error text
      reads "the answer is taking too long" — correct for its own 120s timeout,
      wrong for a user who pressed Stop. So the outcome is reported as `aborted`
      and the returned Answer is discarded, rather than showing the reader a
      timeout they did not experience.

   Every state this module reports is an event the backend actually sent. There
   is no simulated progress and no invented stage.
   ========================================================================== */

import { askApiStream } from "@/lib/ai/client";
import type { StreamHandlers } from "@/lib/ai/stream";
import type { AiMode } from "@/lib/ai/modes";
import type { Answer, Scope } from "@/lib/ai/types";

/** What the surface knows about a request in flight. Each field has a source. */
export interface LiveState {
  /** performance.now() at the moment the request left. Real wall clock. */
  startedAt: number;
  /** Passages served, from the backend `meta` event. null = not reported yet. */
  passages: number | null;
  /** Ungated preview text, from `delta`. Never persisted, never exported. */
  preview: string;
  /** ms from send to the first `delta`. Measured, not estimated. */
  firstTokenMs: number | null;
  /** The backend `status` stage, verbatim. null until one arrives. */
  stage: string | null;
}

/**
 * The phases the surface can honestly draw.
 *
 * `sending` covers the window in which the backend has told us nothing at all.
 * It is not called "retrieving": retrieval is what the server is doing, but we
 * only learn that it happened when `meta` lands, and naming a phase we cannot
 * observe is exactly the kind of theatre this brief rules out.
 *
 * Deliberately absent: `queued`. Nothing in the protocol reports a queue, and
 * this surface does not maintain one — a second question cannot be sent while
 * one is in flight, so there is never anything queued to show.
 */
export type Phase = "sending" | "retrieved" | "writing" | "finishing";

export function phaseOf(live: LiveState): Phase {
  if (live.stage) return "finishing";
  if (live.preview) return "writing";
  if (live.passages != null) return "retrieved";
  return "sending";
}

/**
 * Hebrew for the phase.
 *
 * `finishing` is the only one that reads a backend string. The endpoint emits
 * `validating` today (verified against the live stream); anything else falls
 * back to a neutral word rather than being printed raw or invented into a
 * story about what the model is thinking.
 */
export function phaseLabel(live: LiveState): string {
  switch (phaseOf(live)) {
    case "sending": return "שולח את השאלה…";
    case "retrieved": return "מכין תשובה…";
    case "writing": return "כותב תשובה…";
    case "finishing":
      return live.stage === "validating" ? "מאמת את התשובה מול המקורות…" : "מסיים…";
  }
}

export type AskOutcome =
  | { kind: "answer"; answer: Answer }
  /** The reader pressed Stop. No answer exists and none is invented. */
  | { kind: "aborted" };

export interface AskEvents {
  onMeta?: (passages: number) => void;
  onDelta?: (text: string) => void;
  onStatus?: (stage: string) => void;
}

/**
 * One question, one answer, through the existing engine.
 *
 * `surface` decides the endpoint and therefore the task the server pins:
 * "library" answers only from the books, "consult" is the general SAP surface.
 * Both are the backend's own contract, unchanged.
 */
export async function ask(args: {
  question: string;
  scope: Scope;
  /** A task profile from lib/ai/prompts, or undefined to let intent decide. */
  task?: string;
  surface: AiMode;
  events?: AskEvents;
  signal: AbortSignal;
}): Promise<AskOutcome> {
  const { question, scope, task, surface, events, signal } = args;

  // Typed as StreamHandlers on purpose — see the note at the top of the file.
  const handlers: StreamHandlers = {
    onMeta: (m) => events?.onMeta?.(m.books),
    onDelta: (t) => events?.onDelta?.(t),
    onStatus: (s) => events?.onStatus?.(s),
  };

  const answer = await askApiStream(question, scope, task, handlers, signal, surface);

  // A stop is a stop. askApiStream cannot tell the two aborts apart, so the
  // caller who owns the controller does.
  if (signal.aborted) return { kind: "aborted" };
  return { kind: "answer", answer };
}

/** Seconds, one decimal under ten. Used for real measurements only. */
export function secs(ms: number): string {
  const s = ms / 1000;
  return s < 10 ? `${s.toFixed(1)} שנ׳` : `${Math.round(s)} שנ׳`;
}
