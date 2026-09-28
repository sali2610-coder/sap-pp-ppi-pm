"use client";

import { useState } from "react";
import { Copy, CopyCheck } from "lucide-react";

/** Copy a SAP identifier; the result is announced near the button, also to screen readers. */
export function CopyCode({ code }: { code: string }) {
  const [state, setState] = useState<"idle" | "ok" | "fail">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setState("ok");
    } catch {
      setState("fail");
    }
    window.setTimeout(() => setState("idle"), 2000);
  }

  return (
    <span className="at-copy">
      <button type="button" className="at-btn at-btn--quiet" onClick={copy} aria-label={`העתקה: ${code}`}>
        {state === "ok" ? <CopyCheck size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
        {state === "ok" ? "הועתק" : "העתקה"}
      </button>
      <span role="status" className="at-sr">
        {state === "ok" ? `הקוד ${code} הועתק` : state === "fail" ? "ההעתקה לא הצליחה בדפדפן הזה" : ""}
      </span>
    </span>
  );
}
