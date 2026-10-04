"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeCopy({ code }: { code: string }) {
  const [state, setState] = useState<"idle" | "done" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  return <span className="nxa-copy-wrap">
    <button type="button" className="nu-ghost nxa-copy" aria-label={`העתקת ${code}`} onClick={async () => {
      if (timer.current) clearTimeout(timer.current);
      try { await navigator.clipboard.writeText(code); setState("done"); }
      catch { setState("error"); }
      timer.current = setTimeout(() => setState("idle"), 2500);
    }}>{state === "done" ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}</button>
    <span className="nxa-copy-status" role="status">{state === "done" ? "הועתק" : state === "error" ? "לא ניתן להעתיק — סמן את הקוד" : ""}</span>
  </span>;
}
