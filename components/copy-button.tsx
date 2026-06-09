"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CopyButton({ text, label = "העתק" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          // clipboard blocked — fall back to a temporary textarea
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
      }}
    >
      {copied ? <Check className="text-status-done" /> : <Copy />}
      {copied ? "הועתק" : label}
    </Button>
  );
}
