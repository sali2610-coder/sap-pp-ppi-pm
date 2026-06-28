"use client";

import Link from "next/link";
import { Check, Play, Circle, ArrowLeft } from "lucide-react";

export interface TimelineStep {
  label: string;
  code?: string;       // tcode/object code shown as a mono chip
  href?: string;       // navigable target (only set when the page exists)
  state: "done" | "current" | "todo";
}

// Business Process Timeline + Learning Path — one vertical, clickable flow with
// the current step highlighted and ✔ / ▶ / ○ progress markers. Reused by the
// Transaction and Object workspaces. Pure presentation.
export function ProcessTimeline({ steps, accent, dense }: { steps: TimelineStep[]; accent: string; dense?: boolean }) {
  if (!steps.length) return null;
  return (
    <ol className="relative" dir="rtl">
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        const Icon = s.state === "done" ? Check : s.state === "current" ? Play : Circle;
        const mColor = s.state === "current" ? accent : s.state === "done" ? "#16a34a" : "#cbd5e1";
        const inner = (
          <div className={`flex min-w-0 flex-1 items-center gap-2 rounded-xl border px-3 ${dense ? "py-1.5" : "py-2"} transition ${s.state === "current" ? "font-extrabold" : ""}`}
            style={s.state === "current" ? { borderColor: accent, background: accent + "0d", color: accent } : { borderColor: "#e2e8f0", background: "#fff" }}>
            <span className="min-w-0 flex-1 truncate text-[13px] text-slate-700" style={s.state === "current" ? { color: accent } : undefined}>{s.label}</span>
            {s.code && <span className="tech rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold" style={{ background: mColor + "1a", color: mColor }} dir="ltr">{s.code}</span>}
            {s.href && <ArrowLeft className="size-3.5 shrink-0 text-slate-300" />}
          </div>
        );
        return (
          <li key={i} className="flex items-stretch gap-3">
            {/* marker rail */}
            <div className="flex flex-col items-center">
              <span className="grid size-7 shrink-0 place-items-center rounded-full text-white shadow-sm" style={{ background: mColor }}><Icon className={`size-3.5 ${s.state === "todo" ? "opacity-60" : ""}`} /></span>
              {!last && <span className="w-0.5 flex-1" style={{ background: `linear-gradient(${mColor}, #e2e8f0)`, minHeight: dense ? 8 : 12 }} />}
            </div>
            {/* step */}
            <div className={`min-w-0 flex-1 ${last ? "" : dense ? "pb-2" : "pb-3"}`}>
              {s.href ? <Link href={s.href} className="block transition hover:-translate-y-px">{inner}</Link> : inner}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
