"use client";

/* ============================================================================
   PROJECT NEO · CHAT — conversation persistence.
   ----------------------------------------------------------------------------
   Its own keyspace, deliberately. lib/ai/history.ts already namespaces the two
   shipped surfaces (`neo:ai:lib` / `neo:ai:con`) and writing into those keys
   from here would put NEO's conversation inside theirs — the exact bug their
   header comment describes, reintroduced from the other side. This surface owns
   `neo:shell:chat:*` and nothing else reads or writes it.

   Stored: the question, the answer the engine returned, and the scope it was
   asked in. Nothing that was not typed by the reader or rendered to them.
   ========================================================================== */

import type { AiMode } from "@/lib/ai/modes";
import type { Answer, Scope } from "@/lib/ai/types";

export interface Turn {
  id: string;
  q: string;
  /** The validated Answer. null while in flight, and for a stopped turn. */
  a: Answer | null;
  /** Set when the reader pressed Stop. There is no answer and none is faked. */
  stopped?: boolean;
  /** Real wall clock from send to the first token, when one arrived. */
  firstTokenMs?: number | null;
  /**
   * Real wall clock across the whole request, measured in the browser.
   *
   * Not the same number as `Answer.ms`, which the stream reports on its `done`
   * event and therefore only exists for a request that finished. This one is
   * recorded for every outcome — answered, failed or stopped — because "how
   * long did I wait" is a fair question to ask of a failure too.
   */
  elapsedMs?: number | null;
  /** Passages the backend reported serving, from the `meta` event. */
  passages?: number | null;
  /** The task profile used, so Retry reproduces the same request. */
  task?: string;
  /**
   * The scope this turn was ACTUALLY sent with.
   *
   * Not a copy of the current selection: scope can change between questions,
   * and an answer stays the answer to the scope it was asked in. Storing it per
   * turn is what lets the thread attribute each answer to its own premise
   * instead of to whatever is selected now.
   */
  scope?: Scope;
}

interface Persisted {
  turns: Turn[];
  scope: Scope;
}

const KEY = (m: AiMode) => `neo:shell:chat:${m}`;
const MAX_TURNS = 40;

export function loadChat(mode: AiMode): Persisted {
  if (typeof window === "undefined") return { turns: [], scope: {} };
  try {
    const raw = window.localStorage.getItem(KEY(mode));
    if (!raw) return { turns: [], scope: {} };
    const p = JSON.parse(raw) as Partial<Persisted>;
    return {
      turns: Array.isArray(p.turns) ? p.turns.slice(-MAX_TURNS) : [],
      scope: p.scope && typeof p.scope === "object" ? p.scope : {},
    };
  } catch {
    return { turns: [], scope: {} };
  }
}

export function saveChat(mode: AiMode, data: Persisted) {
  if (typeof window === "undefined") return;
  try {
    // An in-flight turn has no answer yet; persisting it would restore a
    // question that looks like it is still being answered after a reload.
    const turns = data.turns.filter((t) => t.a || t.stopped).slice(-MAX_TURNS);
    window.localStorage.setItem(KEY(mode), JSON.stringify({ turns, scope: data.scope }));
  } catch {
    /* quota or private mode — persistence is a convenience, never a requirement */
  }
}

export function clearChat(mode: AiMode) {
  if (typeof window === "undefined") return;
  try { window.localStorage.removeItem(KEY(mode)); } catch { /* see above */ }
}
