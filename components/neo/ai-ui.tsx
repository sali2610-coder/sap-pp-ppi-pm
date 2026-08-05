"use client";

/**
 * AI interaction primitives shared by Ask the Library and AI Chat.
 *
 * Both screens ask a question and render a grounded answer; only the engine and
 * the scope model differ. Everything visual lives here so the two cannot drift.
 */

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUp, Loader2, Sparkles } from "lucide-react";

/* ---------------------------------------------------------------- composer */

const MAX_H = 168;

/**
 * The question field. Enter sends, Shift+Enter breaks a line, the box grows with
 * the text to a ceiling and then scrolls. `slot` carries whatever context the
 * host screen needs to show *inside* the composer — scope, model, sources —
 * because that context changes the answer and belongs where the question is.
 */
export function AIComposer({
  value, onChange, onSend, busy, placeholder = "שאל שאלה…", slot, hint, disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  busy?: boolean;
  placeholder?: string;
  slot?: ReactNode;
  hint?: ReactNode;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_H)}px`;
  }, [value]);

  const canSend = !busy && !disabled && value.trim().length > 0;

  return (
    <div>
      <div className="rounded-3xl border border-hairline bg-surface shadow-[0_12px_34px_-22px_rgba(15,23,42,0.5)] transition focus-within:border-brand/40 focus-within:ring-2 focus-within:ring-brand/15">
        {slot && <div className="flex flex-wrap items-center gap-1.5 border-b border-hairline px-3 py-2">{slot}</div>}
        <div className="flex items-end gap-2 p-2">
          <textarea
            ref={ref}
            rows={1}
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                if (canSend) onSend();
              }
            }}
            placeholder={placeholder}
            aria-label={placeholder}
            className="max-h-[168px] min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2 text-sm leading-relaxed text-ink-1 outline-none placeholder:text-ink-3 disabled:opacity-50"
          />
          <button
            onClick={() => canSend && onSend()}
            disabled={!canSend}
            aria-label="שלח שאלה"
            className={`mb-0.5 grid size-10 shrink-0 place-items-center rounded-2xl transition active:scale-95 ${
              canSend ? "bg-brand text-brand-foreground hover:brightness-110" : "bg-surface-2 text-ink-3"}`}
          >
            {busy ? <Loader2 className="size-4 animate-spin" /> : <ArrowUp className="size-4" />}
          </button>
        </div>
      </div>
      {hint && <p className="mt-1.5 px-1 text-[11px] text-ink-3">{hint}</p>}
    </div>
  );
}

/* ------------------------------------------------------------ conversation */

/**
 * The transcript. A live region so screen readers hear answers arrive, and the
 * only place either screen decides how a turn is spaced.
 */
export function AIConversation({
  children, busy, autoScrollKey,
}: {
  children: ReactNode; busy?: boolean; autoScrollKey?: unknown;
}) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = typeof window !== "undefined"
      && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    endRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "end" });
  }, [autoScrollKey, busy]);

  return (
    <div className="mx-auto w-full max-w-[48rem] space-y-6" aria-live="polite" aria-busy={busy || undefined}>
      {children}
      <div ref={endRef} />
    </div>
  );
}

/** A question, as the user asked it. */
export function UserBubble({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-end motion-safe:animate-[bubbleIn_.22s_cubic-bezier(.32,.72,0,1)]">
      <p className="max-w-[74%] rounded-3xl rounded-se-lg bg-gradient-to-b from-brand to-brand-dark px-4 py-2.5 text-sm leading-[1.6] text-brand-foreground shadow-[0_2px_10px_-3px_rgba(214,32,39,.4)]">
        <span className="sr-only">שאלה: </span>
        {children}
      </p>
    </div>
  );
}

/**
 * An answer. Not a card — a bordered card inside a bordered column inside a
 * bordered panel is what made this read as a console. One brand rail marks the
 * system's turn and the content is the object.
 */
export function AIResponse({ header, children, footer }: {
  header?: ReactNode; children: ReactNode; footer?: ReactNode;
}) {
  return (
    <div className="border-s-2 border-brand/15 ps-3.5 sm:ps-4">
      <span className="sr-only">תשובה: </span>
      {header && <div className="mb-2.5 flex flex-wrap items-center gap-x-2 gap-y-1">{header}</div>}
      {children}
      {footer && <div className="mt-3.5">{footer}</div>}
    </div>
  );
}

/** The staged wait. Labels describe the real pipeline; a skeleton holds the space. */
const STAGES = [
  { at: 0, label: "מחפש במקורות…" },
  { at: 2200, label: "קורא את הקטעים הרלוונטיים…" },
  { at: 6000, label: "מנסח תשובה…" },
] as const;

export function AIThinking({ note }: { note?: string }) {
  const [ms, setMs] = useState(0);
  useEffect(() => {
    const t0 = performance.now();
    const iv = setInterval(() => setMs(performance.now() - t0), 300);
    return () => clearInterval(iv);
  }, []);
  const stage = [...STAGES].reverse().find((s) => ms >= s.at) ?? STAGES[0];

  return (
    <div className="border-s-2 border-brand/15 ps-3.5 sm:ps-4" role="status" aria-live="polite">
      <div className="mb-3 flex items-center gap-2">
        <span className="grid size-5 place-items-center rounded-lg bg-brand-soft">
          <Sparkles className="size-3 text-brand" />
        </span>
        <span className="text-[13px] font-semibold text-ink-2">{stage.label}</span>
        <span className="flex gap-1" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-1 rounded-full bg-brand/50 motion-safe:animate-[dot_1.1s_ease-in-out_infinite]"
              style={{ animationDelay: `${i * 140}ms` }} />
          ))}
        </span>
        {note && <span className="ms-auto hidden text-[11px] text-ink-3 sm:block">{note}</span>}
      </div>
      <div className="max-w-[74ch] space-y-2.5" aria-hidden>
        {[100, 96, 88, 70].map((w, i) => (
          <div key={i} className="h-3 rounded-full bg-surface-2 motion-safe:animate-[aiPulse_1.6s_ease-in-out_infinite]"
            style={{ width: `${w}%`, animationDelay: `${i * 90}ms` }} />
        ))}
      </div>
    </div>
  );
}
