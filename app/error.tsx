"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

// Route-level error boundary — recovers in-place instead of dead-ending on the
// browser's "This page couldn't load". Catches render/runtime errors AND chunk
// load failures (flaky mobile Safari), offering retry + safe navigation home.
export default function RouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // chunk-load failures after a deploy: a hard reload pulls fresh assets
    if (/ChunkLoadError|Loading chunk|Importing a module script failed|dynamically imported module/i.test(error?.message || "")) {
      try { window.location.reload(); } catch { /* noop */ }
    }
    // eslint-disable-next-line no-console
    console.error("[route error]", error);
  }, [error]);

  return (
    <div dir="rtl" className="grid min-h-[70vh] place-items-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex items-center justify-center gap-2.5">
          <span className="grid size-14 place-items-center rounded-[26%] text-white shadow-lg shadow-brand/30" style={{ background: "radial-gradient(130% 130% at 30% 18%, #e23b41, #d62027 46%, #a3171c)" }}>
            <svg viewBox="0 0 100 100" width="34" height="34" fill="none" aria-hidden>
              <g stroke="#fff" strokeWidth="6" strokeLinecap="round"><line x1="33" y1="37" x2="67" y2="35" /><line x1="33" y1="37" x2="50" y2="68" /><line x1="67" y1="35" x2="50" y2="68" /></g>
              <g fill="#fff"><circle cx="33" cy="37" r="8" /><circle cx="67" cy="35" r="8" /><circle cx="50" cy="68" r="10.5" /></g>
            </svg>
          </span>
          <div className="text-start"><div className="text-[13px] font-extrabold tracking-tight text-ink-1">SAP by Sali</div><div className="text-[11px] font-semibold text-ink-3">Project NEO</div></div>
        </div>
        <div className="mx-auto mt-6 grid size-12 place-items-center rounded-2xl bg-amber-50 text-amber-500"><AlertTriangle className="size-6" /></div>
        <h1 className="mt-3 text-xl font-extrabold text-ink-1">משהו השתבש בטעינת העמוד</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-3">אפשר לנסות שוב — הנתונים נטענים מקומית. אם זה חוזר, חזור לקוקפיט.</p>
        <div className="mt-5 flex justify-center gap-2">
          <button onClick={() => reset()} className="tap inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-extrabold text-white shadow-sm shadow-brand/25 active:scale-95"><RotateCcw className="size-4" />נסה שוב</button>
          <Link href="/" className="tap inline-flex items-center gap-1.5 rounded-xl border-2 border-hairline px-4 py-2.5 text-sm font-bold text-ink-2 hover:border-brand/40 hover:text-brand active:scale-95"><Home className="size-4" />לקוקפיט</Link>
        </div>
      </div>
    </div>
  );
}
