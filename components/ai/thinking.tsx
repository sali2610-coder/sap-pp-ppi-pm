"use client";

import { useEffect, useState } from "react";
import { BookOpen, PenLine, Search, Sparkles } from "lucide-react";

/**
 * What the system shows while it works.
 *
 * The stages are honest about the pipeline that actually runs: retrieval, then
 * grounding against the retrieved sections, then generation. They advance on a
 * timer because the endpoint returns once at the end and exposes no progress —
 * so the labels describe the real phases without claiming live telemetry.
 *
 * A skeleton is used rather than a spinner: it reserves the space the answer
 * will occupy, which removes the 44px-pill-to-800px-answer jump.
 */
const STAGES = [
  { at: 0, icon: Search, label: "מחפש במקורות…" },
  { at: 2200, icon: BookOpen, label: "קורא את הקטעים הרלוונטיים…" },
  { at: 6000, icon: PenLine, label: "מנסח תשובה…" },
] as const;

export function Thinking({ scopeLabel }: { scopeLabel?: string }) {
  const [ms, setMs] = useState(0);

  useEffect(() => {
    const t0 = performance.now();
    const iv = setInterval(() => setMs(performance.now() - t0), 300);
    return () => clearInterval(iv);
  }, []);

  const stage = [...STAGES].reverse().find((s) => ms >= s.at) ?? STAGES[0];
  const Icon = stage.icon;

  return (
    <div className="animate-[fadeIn_.2s_ease-out]" role="status" aria-live="polite">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex size-6 items-center justify-center rounded-lg bg-brand-soft">
          <Icon className="size-3.5 text-brand" />
        </span>
        <span className="text-[0.8125rem] font-semibold text-ink-2">{stage.label}</span>
        <span className="flex gap-1" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-1 rounded-full bg-brand/50 motion-safe:animate-[dot_1.1s_ease-in-out_infinite]"
              style={{ animationDelay: `${i * 140}ms` }} />
          ))}
        </span>
        {scopeLabel && (
          <span className="ms-auto hidden text-[0.6875rem] text-ink-3 sm:block">{scopeLabel}</span>
        )}
      </div>

      {/* Reserves the answer's footprint so nothing jumps when it lands. */}
      <div className="max-w-[74ch] space-y-2.5" aria-hidden>
        {[100, 96, 88, 70].map((w, i) => (
          <div key={i} className="h-3 rounded-full bg-hairline motion-safe:animate-[shimmer_1.6s_ease-in-out_infinite]"
            style={{ width: `${w}%`, animationDelay: `${i * 90}ms` }} />
        ))}
      </div>
    </div>
  );
}
