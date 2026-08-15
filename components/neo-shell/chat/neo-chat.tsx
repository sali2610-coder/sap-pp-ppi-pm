"use client";

/* ============================================================================
   PROJECT NEO · CHAT — the conversation surface.
   ----------------------------------------------------------------------------
   The engine is not rebuilt here and not wrapped in a second opinion. Questions
   go to lib/ai/client.askApiStream through components/neo-shell/chat/engine.ts,
   answers are rendered by components/ai/answer-body.tsx, and citations are the
   ones the backend served. What this file owns is the conversation: turn order,
   the states of a request in flight, stop and retry, and the reachability of
   the input on a phone.

   TRUTHFULNESS RULES THIS FILE ENFORCES
     - A state is drawn only from an event that arrived (see engine.ts).
     - A stopped request produces no answer and no salvaged draft.
     - A failed request shows the engine's own Hebrew message and a retry, never
       a status code and never a fabricated fallback answer.
     - Follow-up buttons issue real requests with real task profiles; the one
       navigating action is hidden unless a citation with a URL exists.
   ========================================================================== */

import { useCallback, useEffect, useRef, useState } from "react";
import { Compass, Library, MessageSquarePlus, ShieldAlert, Sparkles } from "lucide-react";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { CONSULT_DISCLAIMER, MODES, type AiMode } from "@/lib/ai/modes";
import { scopeLabel } from "@/lib/ai/tree";
import type { Answer, Scope } from "@/lib/ai/types";
import { Composer } from "./composer";
import { type LiveState, ask } from "./engine";
import { Live } from "./live";
import { Message } from "./message";
import { ScopeSheet } from "./scope-sheet";
import { clearChat, loadChat, saveChat, type Turn } from "./store";

const HINT = "Enter לשליחה · Shift+Enter לשורה חדשה";

export function NeoChat({ mode }: { mode: AiMode }) {
  const M = MODES[mode];

  const [turns, setTurns] = useState<Turn[]>([]);
  const [scope, setScope] = useState<Scope>({});
  const [draft, setDraft] = useState("");
  const [live, setLive] = useState<LiveState | null>(null);
  const [pending, setPending] = useState<Turn | null>(null);
  const [sheet, setSheet] = useState(false);
  const [focusKey, setFocusKey] = useState(0);
  const [restored, setRestored] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const stick = useRef(true);
  const busy = pending !== null;

  /* ----------------------------------------------------------- persistence */

  // localStorage is read after mount, never during render: this page is
  // prerendered at build time under output:"export", and reading it in a state
  // initialiser would make the first client render disagree with the HTML.
  // The read is deferred to the frame callback so the restore lands in a
  // scheduler callback rather than synchronously inside the effect body —
  // still before paint, so a restored conversation does not flash the empty
  // state on its way in.
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

  const send = useCallback(async (question: string, task?: string) => {
    const q = question.trim();
    if (!q || abortRef.current) return;

    setDraft("");
    stick.current = true;

    const ctl = new AbortController();
    abortRef.current = ctl;

    const id = `q${Date.now()}`;
    const startedAt = performance.now();
    setPending({ id, q, a: null, task });
    setLive({ startedAt, passages: null, preview: "", firstTokenMs: null, stage: null });

    let firstTokenMs: number | null = null;
    let passages: number | null = null;

    const outcome = await ask({
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
    });

    abortRef.current = null;
    setLive(null);
    setPending(null);

    setTurns((prev) => [
      ...prev,
      outcome.kind === "aborted"
        ? { id, q, a: null, stopped: true, task }
        : { id, q, a: outcome.answer, firstTokenMs, passages, task },
    ]);
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
    void send(q, task);
  }, [scope.bookId, send, turns]);

  /** Navigation, not generation: opens a source the answer actually cited. */
  const openSource = useCallback((a: Answer) => {
    const href = a.citations.find((c) => c.href)?.href;
    if (href) window.open(href, "_blank", "noopener,noreferrer");
  }, []);

  const reset = useCallback(() => {
    stop();
    setTurns([]);
    setLive(null);
    setPending(null);
    clearChat(mode);
    setFocusKey((k) => k + 1);
  }, [mode, stop]);

  /* ------------------------------------------------------------------ view */

  const Icon = mode === "consult" ? Compass : Library;

  return (
    <div className="nxq" data-mode={mode}>
      <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />

      <header className="nxq-head">
        <span className="nxq-eyebrow">
          <Icon size={14} strokeWidth={2} aria-hidden="true" />
          {mode === "consult" ? "עוזר SAP" : "ספרייה · תשובות מבוססות מקור"}
        </span>
        <h1 className="nxq-h1">{M.title}</h1>
        <p className="nxq-lede">{M.tagline}</p>
        {mode === "consult" ? (
          <p className="nxq-disclaimer">
            <ShieldAlert size={14} strokeWidth={2} aria-hidden="true" />
            {CONSULT_DISCLAIMER}
          </p>
        ) : null}
        {turns.length ? (
          <div className="nxq-head-acts">
            <button type="button" className="nu-btn2" onClick={reset}>
              <MessageSquarePlus size={14} strokeWidth={2} aria-hidden="true" />
              שיחה חדשה
            </button>
            <span className="nxq-head-count">{turns.length === 1 ? "שאלה אחת" : `${turns.length} שאלות`}</span>
          </div>
        ) : null}
      </header>

      <div className="nxq-thread">
        {!turns.length && !pending ? (
          <Empty
            mode={mode}
            scope={scope}
            onPick={(q) => { setDraft(q); setFocusKey((k) => k + 1); }}
          />
        ) : null}

        {turns.map((t, i) => (
          <Message
            key={t.id}
            q={t.q}
            a={t.a}
            stopped={t.stopped}
            firstTokenMs={t.firstTokenMs}
            passages={t.passages}
            mode={mode}
            busy={busy}
            isLast={i === turns.length - 1}
            onRetry={() => void send(t.q, t.task)}
            onAsk={runAction}
            onOpenSource={openSource}
          />
        ))}

        {pending && live ? <Live live={live} question={pending.q} /> : null}

        <div ref={endRef} className="nxq-end" aria-hidden="true" />
      </div>

      <Composer
        value={draft}
        onChange={setDraft}
        onSend={() => void send(draft)}
        onStop={stop}
        busy={busy}
        scope={scope}
        onOpenScope={mode === "library" ? () => setSheet(true) : undefined}
        placeholder={mode === "consult" ? "שאל את יועץ ה-SAP…" : "שאל שאלה על החומר בספרייה…"}
        hint={mode === "library" ? `${HINT} · ${scopeLabel(scope)}` : HINT}
        autoFocusKey={focusKey}
      />

      {sheet ? (
        <ScopeSheet scope={scope} onScope={setScope} onClose={() => setSheet(false)} />
      ) : null}
    </div>
  );
}

/**
 * The empty state.
 *
 * The promise and the capability list come from lib/ai/modes, which describes
 * what each surface actually does — the library refuses when the books do not
 * cover the question, the consultant answers from general knowledge and says
 * so. The starters are that file's own prompts, so a chip cannot promise a
 * behaviour the surface does not have.
 */
function Empty({ mode, scope, onPick }: {
  mode: AiMode; scope: Scope; onPick: (q: string) => void;
}) {
  const M = MODES[mode];
  const Icon = mode === "consult" ? Compass : Library;
  return (
    <div className="nxq-empty-state">
      <span className="nxq-empty-ico" aria-hidden="true">
        <Icon size={20} strokeWidth={1.9} />
      </span>
      <h2 className="nxq-empty-h">{M.title}</h2>
      <p className="nxq-empty-p">
        {M.promise}
        {mode === "library" && !scope.bookId ? " בחירת ספר או פרק תמקד את התשובה." : ""}
      </p>
      <ul className="nxq-caps">
        {M.capabilities.map((c) => (
          <li key={c} className="nu-chip">{c}</li>
        ))}
      </ul>
      <div className="nxq-starters">
        <span className="nxq-starters-t">
          <Sparkles size={13} strokeWidth={2} aria-hidden="true" />
          אפשר להתחיל מ
        </span>
        <div className="nxq-starters-row">
          {M.starters.map((s) => (
            <button key={s.label} type="button" className="nu-card nxq-starter" onClick={() => onPick(s.prompt)}>
              <span className="nxq-starter-l">{s.label}</span>
              <span className="nxq-starter-p">{s.prompt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
