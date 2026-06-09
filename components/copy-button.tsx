"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({
  text,
  label = "העתק",
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function doCopy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* noop */
      }
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button
      type="button"
      onClick={doCopy}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-slate-600/60 bg-slate-700/40 px-2 py-1 text-[11px] font-medium text-slate-200 transition-colors hover:bg-slate-600/60",
        className,
      )}
    >
      {copied ? <Check className="size-3.5 text-[#27c93f]" /> : <Copy className="size-3.5" />}
      {copied ? "הועתק" : label}
    </button>
  );
}
