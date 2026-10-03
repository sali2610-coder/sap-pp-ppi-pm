"use client";

// A copy control for technical identifiers and templates. The design audit
// (2026-09-14, §4) asked for the technical name on its own LTR line with a way
// to copy it; the same control copies a template's text on the toolkit pages.
// Clipboard success and refusal both get truthful, accessible feedback.

import { useEffect, useRef, useState } from "react";
import { Check, Copy, CircleAlert, LoaderCircle } from "lucide-react";

export function CopyId({ value, label, compact }: { value: string; label?: string; compact?: boolean }) {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const timer = useRef<number | undefined>(undefined);
  const busy = useRef(false);
  const mounted = useRef(true);
  const what = label || "העתקת המזהה";
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; window.clearTimeout(timer.current); };
  }, []);
  const copy = async () => {
    if (busy.current) return;
    busy.current = true;
    window.clearTimeout(timer.current);
    setState("busy");
    try {
      await navigator.clipboard.writeText(value);
      if (mounted.current) setState("done");
    } catch {
      if (mounted.current) setState("error");
    } finally {
      busy.current = false;
      if (mounted.current) timer.current = window.setTimeout(() => setState("idle"), 3000);
    }
  };
  const message = state === "done" ? "הועתק" : state === "error" ? "לא הועתק" : what;
  const detail = state === "error" ? "ההעתקה נחסמה. אפשר לסמן את הטקסט ולהעתיק ידנית." : message;
  return (
    <>
    <button
      type="button"
      className="nu-ghost nx-copy"
      data-done={state === "done" ? "1" : undefined}
      data-copy-state={state}
      onClick={copy}
      disabled={state === "busy"}
      aria-label={`${detail}: ${value.length > 60 ? value.slice(0, 57) + "…" : value}`}
      title={detail}
    >
      {state === "done"
        ? <Check size={13} strokeWidth={2} aria-hidden="true" />
        : state === "error" ? <CircleAlert size={13} strokeWidth={1.75} aria-hidden="true" />
        : state === "busy" ? <LoaderCircle className="nx-copy-spin" size={13} strokeWidth={1.75} aria-hidden="true" />
        : <Copy size={13} strokeWidth={1.75} aria-hidden="true" />}
      {compact ? null : <span className="nx-copy-label">
        <span className="nx-copy-reserve" aria-hidden="true">{what}</span>
        <span>{message}</span>
      </span>}
    </button>
    <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
      {state === "done" ? `${what}: הועתק` : state === "error" ? detail : ""}
    </span>
    </>
  );
}
