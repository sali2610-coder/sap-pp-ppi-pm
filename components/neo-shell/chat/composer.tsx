"use client";

/* ============================================================================
   PROJECT NEO · CHAT — the input.
   ----------------------------------------------------------------------------
   One field, one primary action, and a state that is never ambiguous: while an
   answer is being written the send button BECOMES the stop button rather than
   sitting greyed out beside a second control. Enter sends, Shift+Enter breaks a
   line, and the field grows with the text to a ceiling before it scrolls.

   The scope trigger lives here rather than in a distant panel because scope
   changes what the answer will be, and belongs where the question is written.
   It is shown only on the library surface — the consultant endpoint does not
   read from a chosen book, so a scope control there would be decoration.
   ========================================================================== */

import { useEffect, useLayoutEffect, useRef } from "react";
import { ArrowUp, Layers, Square } from "lucide-react";
import { scopeLabel } from "@/lib/ai/tree";
import type { Scope } from "@/lib/ai/types";

const MAX_H = 176;

export function Composer({
  value, onChange, onSend, onStop, busy, scope, onOpenScope, placeholder, hint, autoFocusKey,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  onStop: () => void;
  busy: boolean;
  scope: Scope;
  /** Undefined hides the trigger entirely — see the note above. */
  onOpenScope?: () => void;
  placeholder: string;
  hint: string;
  /** Changes when a follow-up chip fills the field, to return focus to it. */
  autoFocusKey?: number;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  // Measured before paint so the field never flashes at the wrong height.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_H)}px`;
  }, [value]);

  useEffect(() => {
    if (autoFocusKey) ref.current?.focus();
  }, [autoFocusKey]);

  const canSend = !busy && value.trim().length > 0;

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // isComposing guards the IME: Enter while a candidate is open commits the
    // candidate, it does not send a half-typed question.
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      if (canSend) onSend();
    }
  }

  return (
    <div className="nxq-composer">
      <div className="nxq-box" data-busy={busy ? "1" : "0"}>
        {onOpenScope ? (
          <div className="nxq-box-top">
            <button type="button" className="nu-ghost nxq-scope-b" onClick={onOpenScope}>
              <Layers size={14} strokeWidth={2} aria-hidden="true" />
              <span className="nxq-scope-t">{scopeLabel(scope)}</span>
            </button>
          </div>
        ) : null}

        <div className="nxq-box-row">
          <textarea
            ref={ref}
            rows={1}
            className="nxq-field"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            aria-label={placeholder}
            dir="auto"
          />
          {busy ? (
            <button type="button" className="nu-btn nxq-send" onClick={onStop} aria-label="עצור את התשובה">
              <Square size={15} strokeWidth={2.4} aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              className="nu-btn nxq-send"
              onClick={onSend}
              disabled={!canSend}
              aria-label="שלח שאלה"
            >
              <ArrowUp size={17} strokeWidth={2.4} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <p className="nxq-hint">{hint}</p>
    </div>
  );
}
