"use client";

// A copy control for technical identifiers and templates. The design audit
// (2026-09-14, §4) asked for the technical name on its own LTR line with a way
// to copy it; the same control copies a template's text on the toolkit pages.
// The clipboard call can be refused (insecure context, permissions); then the
// button simply does nothing visible, it never pretends the copy happened.

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyId({ value, label, compact }: { value: string; label?: string; compact?: boolean }) {
  const [done, setDone] = useState(false);
  const what = label || "העתקת המזהה";
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      window.setTimeout(() => setDone(false), 1600);
    } catch {
      /* clipboard unavailable: no fake success */
    }
  };
  return (
    <button
      type="button"
      className="nu-ghost nx-copy"
      data-done={done ? "1" : undefined}
      onClick={copy}
      aria-label={`${what}: ${value.length > 60 ? value.slice(0, 57) + "…" : value}`}
      title={what}
    >
      {done
        ? <Check size={13} strokeWidth={2} aria-hidden="true" />
        : <Copy size={13} strokeWidth={1.75} aria-hidden="true" />}
      {compact ? null : <span>{done ? "הועתק" : what}</span>}
    </button>
  );
}
