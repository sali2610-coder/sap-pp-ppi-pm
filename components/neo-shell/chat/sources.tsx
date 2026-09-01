"use client";

/* ============================================================================
   PROJECT NEO · CHAT — source cards.
   ----------------------------------------------------------------------------
   Every value on this card comes off the Citation the engine returned. Nothing
   is derived, guessed, prettified into a claim, or filled in when missing: a
   passage with no page range shows no page, a passage with no quote offers no
   evidence toggle, and a section with no title shows its id.

   The numbering is the order of `answer.citations`, which is the same order
   components/ai/answer-body.tsx numbers the inline markers by — so chip [2] in
   the prose and the second card here are the same section.
   ========================================================================== */

import Link from "next/link";
import { useState } from "react";
import { BookOpen, ChevronDown, ExternalLink, Quote } from "lucide-react";
import type { Citation } from "@/lib/ai/types";

/** Only roles the backend actually sends are translated; anything else is
 *  shown as it arrived rather than mapped onto a guess. */
const ROLE_HE: Record<string, string> = {
  direct: "ישיר",
  neighbour: "סמוך",
  neighbor: "סמוך",
  supporting: "תומך",
};

function SourceCard({ c, n }: { c: Citation; n: number }) {
  const [open, setOpen] = useState(false);
  const hasQuote = Boolean(c.quote && c.quote.trim());
  const role = c.role ? ROLE_HE[c.role] ?? c.role : null;

  return (
    <li className="nxq-src">
      <div className="nxq-src-head">
        <span className="nxq-src-n" aria-hidden="true">{n}</span>
        <div className="nxq-src-id">
          <span className="nxq-src-book">{c.book}</span>
          <span className="nxq-src-where">
            פרק {c.chapter}
            {c.chapterTitle ? ` · ${c.chapterTitle}` : ""}
            {" · "}
            <span className="nxq-sap">{c.section}</span>
            {c.sectionTitle ? ` · ${c.sectionTitle}` : ""}
          </span>
        </div>
        {/* Status form, per the rule in globals.css: a state is a dot and a
            word. `cited` is the engine's own flag — whether the answer leaned
            on the passage or it was merely served with the others. */}
        <span
          className="nu-status nxq-src-state"
          style={{ "--s": c.cited === false ? "var(--ink-3)" : "var(--brand)" } as React.CSSProperties}
        >
          {c.cited === false ? "לא צוטט" : "צוטט"}
        </span>
      </div>

      <div className="nxq-src-facts">
        {c.page ? (
          <span className="nu-chip">
            {c.page.from === c.page.to ? `עמוד ${c.page.from}` : `עמודים ${c.page.from}-${c.page.to}`}
            {c.pageEstimated ? " (משוער)" : ""}
          </span>
        ) : null}
        {role ? <span className="nu-chip">אחזור {role}</span> : null}
        {typeof c.confidence === "number" ? (
          <span className="nu-chip" title="ציון האחזור של הקטע כפי שהתקבל מהמנוע">
            ציון אחזור {Math.round(c.confidence * 100)}%
          </span>
        ) : null}
      </div>

      <div className="nxq-src-acts">
        {c.href ? (
          <Link
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="nu-link nxq-src-open"
          >
            <BookOpen size={14} strokeWidth={2} aria-hidden="true" />
            פתיחת הפרק
            <ExternalLink size={12} strokeWidth={2} aria-hidden="true" />
          </Link>
        ) : null}
        {hasQuote ? (
          <button
            type="button"
            className="nu-ghost nxq-src-toggle"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Quote size={14} strokeWidth={2} aria-hidden="true" />
            {open ? "הסתרת הציטוט" : "הצגת הציטוט"}
            <ChevronDown size={14} strokeWidth={2} aria-hidden="true" className="nxq-caret" data-on={open ? "1" : "0"} />
          </button>
        ) : null}
      </div>

      {open && hasQuote ? (
        // The exact sentence the retrieval served, verbatim. It is a quotation
        // from a book, so it is rendered as one and nothing is rewritten.
        <blockquote className="nxq-src-quote">{c.quote}</blockquote>
      ) : null}
    </li>
  );
}

export function Sources({ citations }: { citations: Citation[] }) {
  const [open, setOpen] = useState(false);
  if (!citations.length) return null;

  return (
    <section className="nxq-sources" aria-label="מקורות">
      <button
        type="button"
        className="nu-ghost nxq-sources-top"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <BookOpen size={14} strokeWidth={2} aria-hidden="true" />
        {citations.length === 1 ? "מקור אחד" : `${citations.length} מקורות`}
        <ChevronDown size={14} strokeWidth={2} aria-hidden="true" className="nxq-caret" data-on={open ? "1" : "0"} />
      </button>
      {open ? (
        <ol className="nxq-src-list">
          {citations.map((c, i) => (
            <SourceCard key={`${c.id}-${i}`} c={c} n={i + 1} />
          ))}
        </ol>
      ) : null}
    </section>
  );
}
