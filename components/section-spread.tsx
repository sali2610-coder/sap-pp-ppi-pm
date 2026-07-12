"use client";

/**
 * Shared bilingual section renderer for every reference book (book1-7,9-11).
 * Two reading modes, driven by ReaderViewContext:
 *  - "hebrew"    → single flowing Hebrew column (comfort-first long reading);
 *                  the English source stays in the DOM (search-safe) behind an
 *                  on-demand "הצג מקור" disclosure.
 *  - "bilingual" → EN ‖ spine ‖ HE study spread.
 * Carries the [data-section] anchors that power the reader's scroll-spy rail
 * + exact resume.
 */
import { useState } from "react";
import { Languages } from "lucide-react";
import { useReaderView } from "@/lib/reader-view";

export interface Section { id: string; title: string; en: string; he: string }

export function SectionSpread({ s }: { s: Section }) {
  const view = useReaderView();
  const [src, setSrc] = useState(false);
  const pending = (
    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
      <span className="size-1.5 rounded-full bg-status-in-analysis" />
      תרגום בהכנה — בקש &quot;תרגם פרק {s.id.split(".")[0]}&quot;.
    </p>
  );

  if (view === "hebrew") {
    return (
      <section id={`sec-${s.id}`} data-section={s.id} data-section-title={s.title} className="reader-section border-t border-border/40 py-7 first:border-t-0 first:pt-1">
        <div className="mx-auto w-full max-w-[64ch]">
          <div className="mb-3 flex items-center gap-2">
            <span className="tech rounded-md bg-brand/10 px-2 py-0.5 text-xs font-bold text-brand">{s.id}</span>
            <h3 className="text-[1.1rem] font-bold leading-snug tracking-tight text-ink-1">{s.title}</h3>
          </div>
          {s.he ? <p dir="rtl" className="reader-he whitespace-pre-line text-ink-1">{s.he}</p> : pending}
          {/* English source — kept in the DOM (search-safe), revealed on demand */}
          <details className="reader-src group mt-4 rounded-xl border border-border/50 bg-surface/60" open={src} onToggle={(e) => setSrc((e.target as HTMLDetailsElement).open)}>
            <summary className="flex cursor-pointer list-none items-center gap-1.5 px-3 py-2 text-[11px] font-bold text-ink-3 transition hover:text-brand">
              <Languages className="size-3.5" /> {src ? "הסתר מקור" : "הצג מקור באנגלית"}
            </summary>
            <div dir="ltr" className="px-4 pb-3">
              <p className="whitespace-pre-line text-[0.9rem] leading-relaxed text-ink-2">{s.en}</p>
            </div>
          </details>
        </div>
      </section>
    );
  }

  // bilingual study spread
  return (
    <section id={`sec-${s.id}`} data-section={s.id} data-section-title={s.title} className="reader-section border-t border-border/40 py-4 first:border-t-0">
      <div className="mb-2 flex items-center gap-2 px-1">
        <span className="tech rounded-md bg-brand/10 px-2 py-0.5 text-xs font-bold text-brand">{s.id}</span>
        <span className="text-sm font-semibold">{s.title}</span>
      </div>
      <div className="grid gap-0 sm:grid-cols-[1fr_1px_1fr]">
        <div dir="ltr" className="px-4 text-start">
          <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">English (original)</p>
          <p className="mt-1 whitespace-pre-line text-ink-2">{s.en}</p>
        </div>
        <div className="book-spine hidden sm:block" aria-hidden />
        <div dir="rtl" className="px-4 text-start">
          <p className="text-[11px] font-bold uppercase tracking-wide text-brand">עברית · תרגום מקצועי</p>
          {s.he ? <p className="mt-1 whitespace-pre-line text-ink-1">{s.he}</p> : pending}
        </div>
      </div>
    </section>
  );
}
