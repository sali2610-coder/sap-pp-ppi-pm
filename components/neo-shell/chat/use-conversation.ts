"use client";

/* ============================================================================
   PROJECT NEO · CHAT — the conversation machine, shared by both surfaces.
   ----------------------------------------------------------------------------
   The two chats are now separate screens with separate identities, separate
   chrome and separate copy. What they are NOT allowed to have is two versions
   of turn ordering, two versions of "what happens when you press Stop", or two
   drifting definitions of what a persisted conversation contains. That is what
   this hook holds — behaviour, never appearance.

   THE ENGINE IS NOT TOUCHED HERE. Every question goes through
   ./engine.ask → lib/ai/client.askApiStream, which is the shipped path. This
   file adds no retrieval, no re-ranking, no answer post-processing.

   TRUTHFULNESS RULES IT ENFORCES
     - A state is drawn only from an event that arrived (see ./engine).
     - A stopped request produces no answer and no salvaged draft.
     - A failed request keeps the engine's own Hebrew message and offers retry.
       Nothing is substituted for a missing answer.
     - Retry re-sends the original question with the original task profile, so
       it reproduces the request rather than issuing a new, different one.
   ========================================================================== */

import { useCallback, useEffect, useRef, useState } from "react";
import type { AiMode } from "@/lib/ai/modes";
import type { Answer, Scope } from "@/lib/ai/types";
import { type LiveState, ask } from "./engine";
import { clearChat, loadChat, saveChat, type Turn } from "./store";

export interface Conversation {
  turns: Turn[];
  scope: Scope;
  setScope: (s: Scope) => void;
  draft: string;
  setDraft: (v: string) => void;
  /** Non-null exactly while a request is in flight. */
  live: LiveState | null;
  /** The question in flight, with the scope it was frozen at. */
  pending: Turn | null;
  busy: boolean;
  /** Bumped whenever focus should return to the composer. */
  focusKey: number;
  focusComposer: () => void;
  send: (question: string, task?: string) => void;
  stop: () => void;
  /** A follow-up chip. Supplies the subject from the thread when scope cannot. */
  runAction: (prompt: string, task?: string) => void;
  /** Navigation only: opens a source the answer actually cited. */
  openSource: (a: Answer) => void;
  /** Removes the messages. Scope and draft survive. */
  clearMessages: () => void;
  /** A genuine fresh start: messages, draft and scope all go. */
  newConversation: () => void;
  endRef: React.RefObject<HTMLDivElement | null>;
}

export function useConversation(mode: AiMode): Conversation {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [scope, setScope] = useState<Scope>({});
  const [draft, setDraft] = useState("");
  const [live, setLive] = useState<LiveState | null>(null);
  const [pending, setPending] = useState<Turn | null>(null);
  const [focusKey, setFocusKey] = useState(0);
  const [restored, setRestored] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const stick = useRef(true);
  const busy = pending !== null;

  /* ----------------------------------------------------------- persistence */

  // localStorage is read after mount, never during render: these pages are
  // prerendered at build time under output:"export", and reading it in a state
  // initialiser would make the first client render disagree with the HTML.
  // The read is deferred to the frame callback so the restore lands in a
  // scheduler callback rather than synchronously inside the effect body, still
  // before paint, so a restored conversation does not flash the empty state on
  // its way in.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const saved = loadChat(mode);
      setTurns(saved.turns);
      setScope(saved.scope);
      setRestored(true);
    });
    return () => cancelAnimationFrame(raf);
  }, [mode]);

  useEffect(() => {
    if (!restored) return;
    saveChat(mode, { turns, scope });
  }, [restored, mode, turns, scope]);

  /* -------------------------------------------------------------- scrolling */

  // Follow the conversation, but stop following the moment the reader scrolls
  // up to re-read something. An answer takes 20-60s to write; hijacking the
  // viewport for all of it would make the earlier turns unreadable.
  useEffect(() => {
    const el = endRef.current?.closest<HTMLElement>(".nx-canvas");
    const target: HTMLElement | Window = el ?? window;
    const onScroll = () => {
      const node = el ?? document.documentElement;
      const gap = node.scrollHeight - node.scrollTop - node.clientHeight;
      stick.current = gap < 160;
    };
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, []);

  const toEnd = useCallback((smooth: boolean) => {
    if (!stick.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    endRef.current?.scrollIntoView({ behavior: smooth && !reduce ? "smooth" : "auto", block: "end" });
  }, []);

  useEffect(() => { toEnd(true); }, [turns.length, toEnd]);
  useEffect(() => { if (live?.preview) toEnd(false); }, [live?.preview, toEnd]);

  /* ------------------------------------------------------------------- ask */

  const send = useCallback((question: string, task?: string) => {
    const q = question.trim();
    if (!q || abortRef.current) return;

    setDraft("");
    stick.current = true;

    const ctl = new AbortController();
    abortRef.current = ctl;

    const id = `q${Date.now()}`;
    const startedAt = performance.now();
    // Frozen at send. The reader may open the sheet and change scope while the
    // answer is being written; this turn was still asked in the old one.
    const asked: Scope = { ...scope };
    setPending({ id, q, a: null, task, scope: asked });
    setLive({ startedAt, passages: null, preview: "", firstTokenMs: null, stage: null });

    let firstTokenMs: number | null = null;
    let passages: number | null = null;

    void ask({
      question: q,
      scope,
      task,
      surface: mode,
      signal: ctl.signal,
      events: {
        onMeta: (n) => {
          passages = n;
          setLive((s) => (s ? { ...s, passages: n } : s));
        },
        onDelta: (t) => {
          if (firstTokenMs == null) firstTokenMs = performance.now() - startedAt;
          setLive((s) => (s ? { ...s, preview: s.preview + t, firstTokenMs: s.firstTokenMs ?? firstTokenMs } : s));
        },
        onStatus: (stage) => setLive((s) => (s ? { ...s, stage } : s)),
      },
    }).then((outcome) => {
      // Real wall clock across the whole request, measured here rather than
      // taken from the answer: a failed request carries no `ms` of its own, and
      // "how long did I wait before it failed" is exactly what a reader wants.
      const elapsedMs = performance.now() - startedAt;
      abortRef.current = null;
      setLive(null);
      setPending(null);
      setTurns((prev) => [
        ...prev,
        outcome.kind === "aborted"
          ? { id, q, a: null, stopped: true, task, scope: asked, elapsedMs }
          : { id, q, a: outcome.answer, firstTokenMs, passages, task, scope: asked, elapsedMs },
      ]);
    });
  }, [mode, scope]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
  }, []);

  /**
   * A follow-up action's prompt names no subject on its own ("הרחב את ההסבר
   * לעומק"), so with no book selected retrieval has nothing to match. The scope
   * supplies the subject when there is one; otherwise the conversation does.
   */
  const runAction = useCallback((prompt: string, task?: string) => {
    const topic = turns.length ? turns[turns.length - 1].q : "";
    const q = topic && !scope.bookId ? `${prompt}\n\nהנושא: ${topic}` : prompt;
    send(q, task);
  }, [scope.bookId, send, turns]);

  const openSource = useCallback((a: Answer) => {
    const href = a.citations.find((c) => c.href)?.href;
    if (href) window.open(href, "_blank", "noopener,noreferrer");
  }, []);

  const focusComposer = useCallback(() => setFocusKey((k) => k + 1), []);

  /* The two reset actions are genuinely different, which is why there are two.
     Clearing empties the thread and leaves the premise alone, so the reader can
     keep working inside the same chapter. A new conversation also drops the
     scope and the draft, which is the only action on the surface that returns
     it to the state it was in on first load. */
  const clearMessages = useCallback(() => {
    stop();
    setTurns([]);
    setLive(null);
    setPending(null);
    saveChat(mode, { turns: [], scope });
    setFocusKey((k) => k + 1);
  }, [mode, scope, stop]);

  const newConversation = useCallback(() => {
    stop();
    setTurns([]);
    setLive(null);
    setPending(null);
    setScope({});
    setDraft("");
    clearChat(mode);
    setFocusKey((k) => k + 1);
  }, [mode, stop]);

  return {
    turns, scope, setScope, draft, setDraft, live, pending, busy,
    focusKey, focusComposer, send, stop, runAction, openSource,
    clearMessages, newConversation, endRef,
  };
}
