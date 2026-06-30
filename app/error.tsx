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
    <div dir="rtl" className="grid min-h-[60vh] place-items-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-amber-50 text-amber-500"><AlertTriangle className="size-8" /></div>
        <h1 className="mt-4 text-xl font-extrabold text-slate-900">משהו השתבש בטעינת העמוד</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">אפשר לנסות שוב — הנתונים נטענים מקומית. אם זה חוזר, חזור לעמוד הבית.</p>
        <div className="mt-5 flex justify-center gap-2">
          <button onClick={() => reset()} className="tap inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-extrabold text-white shadow-sm active:scale-95"><RotateCcw className="size-4" />נסה שוב</button>
          <Link href="/" className="tap inline-flex items-center gap-1.5 rounded-xl border-2 border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 active:scale-95"><Home className="size-4" />לדף הבית</Link>
        </div>
      </div>
    </div>
  );
}
