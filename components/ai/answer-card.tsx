"use client";

import { useState } from "react";
import Link from "next/link";
import { BookText, ChevronLeft, Copy, Check, Quote, Sparkles, TriangleAlert, WifiOff, Scissors } from "lucide-react";
import type { Answer, Citation } from "@/lib/ai/types";

/** Confidence is shown as a plain word plus a bar; a bare percentage reads as false precision. */
function confidenceTone(policy: Answer["policy"]) {
  if (policy === "REFUSE") return { label: "לא נמצא בסיס", cls: "text-ink-3", bar: "bg-ink-3/40" };
  if (policy === "PARTIAL") return { label: "מענה חלקי", cls: "text-amber-700", bar: "bg-amber-500" };
  return { label: "מבוסס מקורות", cls: "text-emerald-700", bar: "bg-emerald-500" };
}

/** Minimal markdown: headings, bullets, numbers, bold. The corpus emits nothing else. */
function Rich({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-2">
      {lines.map((raw, i) => {
        const line = raw.trimEnd();
        if (!line.trim()) return <div key={i} className="h-1" />;
        if (line.startsWith("## ")) {
          return <h3 key={i} className="pt-1 text-[13.5px] font-extrabold text-ink-1">{line.slice(3)}</h3>;
        }
        const bold = (s: string) =>
          s.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
            p.startsWith("**") && p.endsWith("**")
              ? <strong key={j} className="font-bold text-ink-1">{p.slice(2, -2)}</strong>
              : <span key={j}>{p}</span>);
        if (/^[-•]\s/.test(line)) {
          return (
            <div key={i} className="flex gap-2 ps-1">
              <span className="mt-[7px] size-1 shrink-0 rounded-full bg-brand" />
              <span className="text-[13px] leading-relaxed text-ink-2">{bold(line.replace(/^[-•]\s/, ""))}</span>
            </div>
          );
        }
        const num = line.match(/^(\d+)\.\s(.*)$/);
        if (num) {
          return (
            <div key={i} className="flex gap-2 ps-1">
              <span className="mt-px flex size-4 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[10px] font-bold text-brand">{num[1]}</span>
              <span className="text-[13px] leading-relaxed text-ink-2">{bold(num[2])}</span>
            </div>
          );
        }
        return <p key={i} className="text-[13px] leading-relaxed text-ink-2">{bold(line)}</p>;
      })}
    </div>
  );
}

export function AnswerCard({ answer, onRetry }: { answer: Answer; onRetry?: () => void }) {
  const [openCites, setOpenCites] = useState(false);
  const [copied, setCopied] = useState(false);
  const tone = confidenceTone(answer.policy);
  const refused = answer.policy === "REFUSE";

  // A failed request is not an answer. Show what the reader can do about it, and
  // never the status code, provider or upstream message behind it.
  if (answer.error) {
    return (
      <article className="overflow-hidden rounded-2xl border border-hairline bg-surface">
        <div className="flex items-start gap-2.5 p-3.5">
          <span className="mt-px flex size-7 shrink-0 items-center justify-center rounded-lg bg-surface-2">
            <WifiOff className="size-3.5 text-ink-3" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[12.5px] leading-relaxed text-ink-2">{answer.error}</p>
            {onRetry && (
              <button onClick={onRetry}
                className="mt-2 rounded-lg border border-hairline px-2.5 py-1 text-[11.5px] font-semibold text-ink-2 transition hover:border-brand/40 hover:text-brand">
                נסה שוב
              </button>
            )}
          </div>
        </div>
      </article>
    );
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(answer.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* clipboard blocked; the button simply does nothing visible */ }
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-hairline bg-surface shadow-[0_10px_30px_-24px_rgba(15,23,42,.45)]">
      <header className="flex items-center gap-2 border-b border-hairline bg-surface-2/50 px-3.5 py-2.5">
        <span className={`flex size-6 items-center justify-center rounded-lg ${refused ? "bg-ink-3/10" : "bg-brand-soft"}`}>
          {refused ? <TriangleAlert className="size-3.5 text-ink-3" /> : <Sparkles className="size-3.5 text-brand" />}
        </span>
        <span className={`text-[11.5px] font-bold ${tone.cls}`}>{tone.label}</span>
        <span className="h-1 w-16 overflow-hidden rounded-full bg-hairline" aria-hidden>
          <span className={`block h-full rounded-full ${tone.bar} transition-all duration-500`} style={{ width: `${Math.round(answer.confidence * 100)}%` }} />
        </span>
        <button onClick={copy} aria-label="העתק תשובה"
          className="ms-auto flex items-center gap-1 rounded-lg px-1.5 py-1 text-[11px] text-ink-3 transition hover:bg-surface-2 hover:text-ink-1">
          {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
          {copied ? "הועתק" : "העתק"}
        </button>
      </header>

      <div className="px-3.5 py-3">
        <Rich text={answer.text} />
        {answer.truncated && (
          <p className="mt-3 flex items-start gap-1.5 rounded-xl bg-surface-2 px-2.5 py-2 text-[11px] leading-relaxed text-ink-3">
            <Scissors className="mt-px size-3 shrink-0" />
            התשובה נקטעה באמצע. אפשר לצמצם את ההיקף לפרק או לסעיף כדי לקבל תשובה שלמה.
          </p>
        )}
      </div>

      {answer.citations.length > 0 && (
        <div className="border-t border-hairline">
          <button
            onClick={() => setOpenCites((v) => !v)}
            aria-expanded={openCites}
            className="flex w-full items-center gap-2 px-3.5 py-2.5 text-start transition hover:bg-surface-2/60">
            <BookText className="size-3.5 text-ink-3" />
            <span className="text-[11.5px] font-bold text-ink-1">{answer.citations.length} מקורות</span>
            <span className="truncate text-[11px] text-ink-3">
              {answer.citations[0].book}
            </span>
            <ChevronLeft className={`ms-auto size-3.5 shrink-0 text-ink-3 transition-transform duration-200 ${openCites ? "-rotate-90" : ""}`} />
          </button>

          {openCites && (
            <ul className="space-y-1.5 px-3.5 pb-3">
              {answer.citations.map((c) => <CitationRow key={c.id} c={c} />)}
            </ul>
          )}
        </div>
      )}
    </article>
  );
}

function CitationRow({ c }: { c: Citation }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="rounded-xl border border-hairline bg-surface-2/40">
      <div className="flex items-start gap-2 p-2.5">
        <span className="mt-px rounded-md bg-surface px-1.5 py-0.5 font-mono text-[10px] font-bold text-brand ring-1 ring-hairline">
          {c.section}
        </span>
        <span className="min-w-0 flex-1">
          <span dir="auto" className="block truncate text-[12px] font-semibold text-ink-1">{c.title || `סעיף ${c.section}`}</span>
          <span dir="auto" className="mt-0.5 block truncate text-[10.5px] text-ink-3">{c.book} · פרק {c.chapter}</span>
        </span>
        <Link href={c.href}
          className="shrink-0 rounded-lg border border-hairline bg-surface px-2 py-1 text-[10.5px] font-semibold text-ink-2 transition hover:border-brand/40 hover:text-brand">
          פתח
        </Link>
      </div>
      {c.quote && (
        <>
          <button onClick={() => setOpen((v) => !v)}
            className="flex w-full items-center gap-1.5 border-t border-hairline px-2.5 py-1.5 text-[10.5px] text-ink-3 transition hover:text-ink-1">
            <Quote className="size-3" />
            {open ? "הסתר ציטוט" : "הצג ציטוט"}
          </button>
          {open && (
            <p dir="auto" className="border-t border-hairline px-2.5 py-2 text-[11.5px] italic leading-relaxed text-ink-2">
              “{c.quote}…”
            </p>
          )}
        </>
      )}
    </li>
  );
}
