"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen, Check, ChevronLeft, Copy, ExternalLink, Quote,
  Download, FileText, Link2, Printer, RotateCcw, ScissorsLineDashed, Sparkles,
  ThumbsDown, ThumbsUp, TriangleAlert, WifiOff,
  Workflow, Library,
} from "lucide-react";
import { loadFeedback, setFeedback, type Verdict } from "@/lib/ai/history";
import { copyShareLink, exportMarkdown, exportPdf, exportWord } from "@/lib/ai/export";
import { AnswerBody } from "./answer-body";
import type { AiMode } from "@/lib/ai/modes";

/** Shapes we cannot draw yet, named in Hebrew for the notice below. */
const DIAGRAM_HE: Record<string, string> = {
  timeline: "ציר זמן",
  swimlane: "מסלולי אחריות",
  "sequence diagram": "דיאגרמת רצף",
};
import { useReveal } from "@/lib/ai/use-reveal";
import type { Answer, Citation } from "@/lib/ai/types";

/**
 * One AI turn.
 *
 * Deliberately NOT a card. The previous version nested a bordered card inside a
 * bordered column inside a bordered workspace, which put a citation quote six
 * containers deep and made the page read as an admin console. Here the answer
 * sits directly on the surface with a single brand rail marking it as the
 * system's turn — the content is the object, not the box around it.
 */

const TONE = {
  FULL: { label: "מבוסס מקורות", cls: "bg-emerald-50 text-emerald-700" },
  PARTIAL: { label: "מענה חלקי", cls: "bg-amber-50 text-amber-700" },
  REFUSE: { label: "לא נמצא בסיס", cls: "bg-surface-2 text-ink-3" },
} as const;

/** Module tag per book — mirrors the tree so the label reads the same everywhere. */
const MODULE_OF: Record<string, string> = {
  book1: "PM", book2: "PP", book3: "MM", book4: "PP/DS", book5: "QM", book6: "EWM",
  book7: "Fiori", book8: "PM", book9: "PM", book10: "S&OP", book11: "S/4HANA",
};

const fmtMs = (ms?: number) => (!ms ? null : ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`);

export function AnswerCard({ answer, onRetry, isLatest, mode = "library" }: {
  answer: Answer;
  onRetry?: () => void;
  isLatest?: boolean;
  /** Which surface rendered this. Only the consultant cross-links to the books. */
  mode?: AiMode;
}) {
  const [openCites, setOpenCites] = useState(false);
  const [copied, setCopied] = useState(false);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [shared, setShared] = useState(false);
  const [openExport, setOpenExport] = useState(false);

  // Read in an effect, not during render: this page prerenders at build.
  useEffect(() => { setVerdict(loadFeedback()[answer.id] ?? null); }, [answer.id]);

  function rate(v: Verdict) {
    const next = verdict === v ? null : v;
    setVerdict(next);
    setFeedback(answer.id, next);
  }

  // Only the newest answer animates in. Re-revealing history on every render
  // would be noise, and it would fight the scroll position.
  const { shown, done } = useReveal(answer.text, Boolean(isLatest) && !answer.error);

  async function copy() {
    try {
      await navigator.clipboard.writeText(answer.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard unavailable; label simply does not change */ }
  }

  // ---------------------------------------------------------------- failure
  if (answer.error) {
    return (
      <div role="alert" className="flex items-start gap-2.5 rounded-2xl bg-surface-2/70 px-3.5 py-3">
        <span className="mt-px flex size-7 shrink-0 items-center justify-center rounded-lg bg-surface">
          <WifiOff className="size-3.5 text-ink-3" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[0.8125rem] leading-relaxed text-ink-2">{answer.error}</p>
          {onRetry && (
            <button onClick={onRetry}
              className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-surface px-2.5 py-1.5 text-[0.75rem] font-semibold text-ink-2 ring-1 ring-hairline transition hover:text-brand hover:ring-brand/40">
              <RotateCcw className="size-3" /> נסה שוב
            </button>
          )}
        </div>
      </div>
    );
  }

  const refused = answer.policy === "REFUSE";
  const tone = TONE[answer.policy];
  const first = answer.citations[0];
  const moduleTag = first?.bookId ? MODULE_OF[first.bookId] : null;

  return (
    <div className="border-s-2 border-brand/15 ps-3.5 sm:ps-4">
      {/* ---- provenance strip: where this came from, before what it says ---- */}
      <div className="mb-2.5 flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="flex size-5 items-center justify-center rounded-md bg-brand-soft">
          {refused ? <TriangleAlert className="size-3 text-ink-3" /> : <Sparkles className="size-3 text-brand" />}
        </span>
        {first ? (
          <>
            <span dir="auto" className="max-w-[22ch] truncate text-[0.75rem] font-bold text-ink-1 sm:max-w-[34ch]" title={first.book}>
              {first.book}
            </span>
            <span className="text-[0.6875rem] text-ink-3">פרק {first.chapter}</span>
            {answer.scope.section && <span className="tech text-[0.6875rem] text-ink-3">{answer.scope.section}</span>}
            {moduleTag && <span className="rounded bg-surface-2 px-1.5 py-0.5 text-[0.625rem] font-bold text-ink-3">{moduleTag}</span>}
          </>
        ) : (
          <span className="text-[0.75rem] font-bold text-ink-1">כל הספרייה</span>
        )}
        <span className={`rounded-full px-2 py-0.5 text-[0.6875rem] font-bold ${tone.cls}`}>{tone.label}</span>
        {answer.citations.length > 0 && (
          <span className="text-[0.6875rem] text-ink-3">{answer.citations.length} מקורות</span>
        )}
        {fmtMs(answer.ms) && <span className="text-[0.6875rem] text-ink-3">· {fmtMs(answer.ms)}</span>}

        <span className="ms-auto flex items-center gap-0.5">
          <button onClick={() => rate("up")} aria-label="תשובה מועילה" aria-pressed={verdict === "up"}
            className={`rounded-lg p-1.5 transition hover:bg-surface-2 ${verdict === "up" ? "text-emerald-600" : "text-ink-3 hover:text-ink-1"}`}>
            <ThumbsUp className="size-3.5" />
          </button>
          <button onClick={() => rate("down")} aria-label="תשובה לא מועילה" aria-pressed={verdict === "down"}
            className={`rounded-lg p-1.5 transition hover:bg-surface-2 ${verdict === "down" ? "text-brand" : "text-ink-3 hover:text-ink-1"}`}>
            <ThumbsDown className="size-3.5" />
          </button>
        </span>
        <button onClick={copy} aria-label="העתק תשובה"
          className="flex items-center gap-1 rounded-lg px-1.5 py-1 text-[0.6875rem] text-ink-3 transition hover:bg-surface-2 hover:text-ink-1">
          {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
          <span className="hidden sm:inline">{copied ? "הועתק" : "העתק"}</span>
        </button>
      </div>

      {/* ---------------------------- the answer ---------------------------- */}
      <AnswerBody
          text={shown}
          citations={answer.citations.map((c) => ({ id: c.id, href: c.href, title: c.title }))}
        />
      {!done && (
        <span aria-hidden
          className="ms-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] bg-brand/60 motion-safe:animate-[caret_1s_steps(2)_infinite]" />
      )}

      {/* The user asked for a picture and did not get one. Saying so is the
          whole point: silently returning the same prose reads as a refusal the
          user cannot see, and they cannot tell it apart from a bug. */}
      {done && answer.diagram?.explicit && !answer.diagram.drawn && (
        <p className="mt-3 flex max-w-[74ch] items-start gap-1.5 rounded-xl bg-surface-2 px-2.5 py-2 text-[0.6875rem] leading-relaxed text-ink-3">
          <Workflow className="mt-px size-3 shrink-0" />
          {answer.diagram.unsupported
            ? `תרשים מסוג ${DIAGRAM_HE[answer.diagram.kind] ?? answer.diagram.kind} עדיין לא נתמך לשרטוט, ולכן התשובה מוצגת כטקסט.`
            : "לא צירפתי תרשים, כי המקורות שנמצאו אינם מתארים רצף שלבים שלם. תרשים חלקי היה מטעה."}
        </p>
      )}

      {/* Cross-link. The consultant retrieves from the books even though it is
          not required to cite them, so a citation here means the library really
          does cover this — which is worth saying, since the reader chose the
          surface that does NOT search their books first. */}
      {done && mode === "consult" && answer.citations.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl border border-hairline bg-surface-2/60 px-3 py-2">
          <Library className="size-3.5 shrink-0 text-ink-3" aria-hidden />
          <span className="text-[0.75rem] text-ink-2">
            נמצא תוכן קשור גם בספרייה שלך
          </span>
          <div className="flex flex-wrap gap-1.5">
            {answer.citations.slice(0, 3).map((c) => (
              <Link key={c.id} href={c.href}
                className="rounded-md bg-surface px-1.5 py-0.5 text-[0.6875rem] font-semibold text-brand transition hover:underline">
                {c.title || `${c.book} · ${c.section}`}
              </Link>
            ))}
          </div>
        </div>
      )}

      {answer.truncated && (
        <p className="mt-3 flex max-w-[74ch] items-start gap-1.5 rounded-xl bg-surface-2 px-2.5 py-2 text-[0.6875rem] leading-relaxed text-ink-3">
          <ScissorsLineDashed className="mt-px size-3 shrink-0" />
          התשובה נקטעה. אפשר לצמצם את ההיקף לפרק או לסעיף כדי לקבל תשובה שלמה.
        </p>
      )}

      {/* --------------------------- take it away --------------------------- */}
      {done && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <button
            onClick={async () => { setShared(await copyShareLink(answer)); setTimeout(() => setShared(false), 1800); }}
            className="inline-flex items-center gap-1.5 rounded-2xl bg-surface-2 px-2.5 py-1.5 text-[0.6875rem] font-bold text-ink-2 transition hover:bg-brand-soft hover:text-brand active:scale-95">
            {shared ? <Check className="size-3 text-emerald-600" /> : <Link2 className="size-3" />}
            {shared ? "הקישור הועתק" : "העתק קישור"}
          </button>

          <button onClick={() => setOpenExport((v) => !v)} aria-expanded={openExport}
            className="inline-flex items-center gap-1.5 rounded-2xl bg-surface-2 px-2.5 py-1.5 text-[0.6875rem] font-bold text-ink-2 transition hover:bg-brand-soft hover:text-brand active:scale-95">
            <Download className="size-3" /> ייצוא
          </button>

          {openExport && (
            <>
              <button onClick={() => exportPdf(answer)}
                className="inline-flex items-center gap-1.5 rounded-2xl px-2.5 py-1.5 text-[0.6875rem] font-bold text-ink-3 transition hover:text-brand active:scale-95">
                <Printer className="size-3" /> PDF
              </button>
              <button onClick={() => exportWord(answer)}
                className="inline-flex items-center gap-1.5 rounded-2xl px-2.5 py-1.5 text-[0.6875rem] font-bold text-ink-3 transition hover:text-brand active:scale-95">
                <FileText className="size-3" /> Word
              </button>
              <button onClick={() => exportMarkdown(answer)}
                className="inline-flex items-center gap-1.5 rounded-2xl px-2.5 py-1.5 text-[0.6875rem] font-bold text-ink-3 transition hover:text-brand active:scale-95">
                <FileText className="size-3" /> Markdown
              </button>
            </>
          )}
        </div>
      )}

      {/* ---------------------------- citations ----------------------------- */}
      {answer.citations.length > 0 && done && (
        <div className="mt-3.5 max-w-[74ch] animate-[fadeIn_.25s_ease-out]">
          <button onClick={() => setOpenCites((v) => !v)} aria-expanded={openCites}
            className="flex items-center gap-1.5 rounded-lg py-1 text-[0.75rem] font-semibold text-ink-2 transition hover:text-brand">
            <BookOpen className="size-3.5" />
            {answer.citations.length} מקורות
            <ChevronLeft className={`size-3.5 text-ink-3 transition-transform duration-200 ${openCites ? "-rotate-90" : ""}`} />
          </button>

          {openCites && (
            <ul className="mt-1.5 divide-y divide-hairline overflow-hidden rounded-xl bg-surface-2/50">
              {answer.citations.map((c) => <CitationRow key={c.id} c={c} />)}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

/** Flat row, not a nested card — one hairline separates each source. */
function CitationRow({ c }: { c: Citation }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <div className="flex items-start gap-2.5 px-3 py-2.5">
        <span className="tech mt-px shrink-0 rounded bg-surface px-1.5 py-0.5 text-[0.625rem] font-bold text-brand ring-1 ring-hairline">
          {c.section}
        </span>
        <span className="min-w-0 flex-1">
          <span dir="auto" className="block truncate text-[0.8125rem] font-semibold text-ink-1" title={c.title || undefined}>
            {c.title || `סעיף ${c.section}`}
          </span>
          <span dir="auto" className="mt-0.5 block truncate text-[0.6875rem] text-ink-3">פרק {c.chapter} · {c.book}</span>
        </span>
        {c.quote && (
          <button onClick={() => setOpen((v) => !v)} aria-label={open ? "הסתר ציטוט" : "הצג ציטוט"} aria-expanded={open}
            className="shrink-0 rounded-lg p-1.5 text-ink-3 transition hover:bg-surface hover:text-ink-1">
            <Quote className="size-3.5" />
          </button>
        )}
        <Link href={c.href} aria-label={`פתח בקורא: ${c.title || c.section}`}
          className="shrink-0 rounded-lg p-1.5 text-ink-3 transition hover:bg-surface hover:text-brand">
          <ExternalLink className="size-3.5" />
        </Link>
      </div>
      {open && c.quote && (
        <p dir="auto" className="animate-[fadeIn_.18s_ease-out] px-3 pb-2.5 text-[0.75rem] italic leading-[1.75] text-ink-2">
          “{c.quote}…”
        </p>
      )}
    </li>
  );
}
