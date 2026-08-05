"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUp, Clock, Loader2, SlidersHorizontal, X } from "lucide-react";
import { scopeBreadth, scopeLabel } from "@/lib/ai/tree";
import type { Scope } from "@/lib/ai/types";

const MAX_ROWS_PX = 168;

/**
 * Chat input.
 *
 * Enter sends, Shift+Enter breaks a line, and the field grows with the text up
 * to a ceiling before scrolling. The active scope sits inside the composer
 * rather than in a distant sidebar, because scope changes what the answer will
 * be and belongs where the question is written.
 */
export function Composer({ value, onChange, onSend, busy, scope, onOpenScope, recent, onPickRecent }: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  busy: boolean;
  scope: Scope;
  onOpenScope?: () => void;
  recent: string[];
  onPickRecent: (q: string) => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [showRecent, setShowRecent] = useState(false);
  const breadth = scopeBreadth(scope);

  // Grow to fit content, then scroll. Measured before paint to avoid a flicker.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_ROWS_PX)}px`;
  }, [value]);

  useEffect(() => {
    if (!showRecent) return;
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-recent]")) setShowRecent(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [showRecent]);

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      if (!busy && value.trim()) onSend();
    }
  }

  const canSend = !busy && value.trim().length > 0;

  return (
    <div className="relative">
      {showRecent && recent.length > 0 && (
        <div data-recent
          className="absolute bottom-full mb-2 w-full overflow-hidden rounded-2xl border border-hairline bg-surface shadow-lg">
          <div className="flex items-center gap-1.5 border-b border-hairline px-3 py-2 text-[11px] font-bold text-ink-3">
            <Clock className="size-3" /> שאלות אחרונות
          </div>
          <ul className="max-h-56 overflow-y-auto py-1">
            {recent.map((r, i) => (
              <li key={i}>
                <button
                  onClick={() => { onPickRecent(r); setShowRecent(false); }}
                  className="block w-full truncate px-3 py-1.5 text-start text-[12.5px] text-ink-2 transition hover:bg-surface-2 hover:text-ink-1">
                  {r}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-2xl border border-hairline bg-surface shadow-[0_10px_30px_-24px_rgba(15,23,42,.45)] transition focus-within:border-brand/40">
        <div className="flex flex-wrap items-center gap-1.5 border-b border-hairline px-2.5 py-1.5">
          <button
            onClick={onOpenScope}
            className="flex items-center gap-1.5 rounded-full bg-surface-2 px-2 py-1 text-[11px] font-semibold text-ink-2 transition hover:bg-brand-soft hover:text-brand">
            <SlidersHorizontal className="size-3" />
            {scopeLabel(scope)}
          </button>
          <span className="flex items-center gap-1 text-[10.5px] text-ink-3" title="כמה מהחומר ה-AI קורא">
            <span className="h-1 w-10 overflow-hidden rounded-full bg-hairline">
              <span className="block h-full rounded-full bg-brand/60 transition-all duration-300" style={{ width: `${breadth.pct}%` }} />
            </span>
            {breadth.label}
          </span>
          {recent.length > 0 && (
            <button data-recent onClick={() => setShowRecent((v) => !v)}
              className="ms-auto flex items-center gap-1 rounded-full px-2 py-1 text-[10.5px] text-ink-3 transition hover:bg-surface-2 hover:text-ink-1">
              <Clock className="size-3" /> אחרונות
            </button>
          )}
        </div>

        <div className="flex items-end gap-2 p-2">
          <textarea
            ref={ref}
            rows={1}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKey}
            placeholder="שאל שאלה על הספר…"
            aria-label="שאל שאלה על הספר"
            className="max-h-[168px] min-h-[38px] flex-1 resize-none bg-transparent px-1.5 py-2 text-[13.5px] leading-relaxed text-ink-1 outline-none placeholder:text-ink-3"
          />
          <button
            onClick={() => canSend && onSend()}
            disabled={!canSend}
            aria-label="שלח שאלה"
            className={`mb-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl transition ${
              canSend ? "bg-brand text-white hover:bg-brand-dark" : "bg-surface-2 text-ink-3"}`}>
            {busy ? <Loader2 className="size-4 animate-spin" /> : <ArrowUp className="size-4" />}
          </button>
        </div>
      </div>

      <p className="mt-1.5 px-1 text-[10.5px] text-ink-3">
        Enter לשליחה · Shift+Enter לשורה חדשה · התשובות מבוססות על הספרים בלבד
      </p>
    </div>
  );
}

/** Chips used for both suggested and follow-up questions. */
export function QuestionChips({ items, onPick, title, icon }: {
  items: string[]; onPick: (q: string) => void; title?: string; icon?: React.ReactNode;
}) {
  if (!items.length) return null;
  return (
    <div>
      {title && (
        <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold text-ink-3">
          {icon}{title}
        </div>
      )}
      <div className="flex flex-wrap gap-1.5">
        {items.map((q, i) => (
          <button key={i} onClick={() => onPick(q)}
            className="rounded-full border border-hairline bg-surface px-2.5 py-1.5 text-start text-[11.5px] text-ink-2 transition hover:border-brand/40 hover:bg-brand-soft hover:text-brand">
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

export { X };
