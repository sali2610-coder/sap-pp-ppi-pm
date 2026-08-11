"use client";

/**
 * The Library Platform reader. One component tree for every book.
 *
 * Two data-driven branches and no others:
 *   meta.structure  → how chapters are presented (narrative vs catalogue)
 *   body.format     → how a section's content is presented (prose vs academy)
 *
 * Adding a twelfth book means adding a row of data. Adding a new *shape* of
 * book means adding one branch — not touching the eleven that already work.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { BookOpen, ChevronLeft, Hash, Images, Layers, Loader2 } from "lucide-react";
import type { Book, BookSection, SectionBody, AcademyBody } from "@/lib/library/book";
import { FACET_ORDER, chapterTitle, loadChapterBodies } from "@/lib/library/book";
import { accentVars, identityOf } from "@/lib/book-identity";
import { useI18n } from "@/lib/i18n";
import { FigureViewer, type ViewerFigure } from "@/components/figure-viewer";
import { chapterExtra } from "@/components/library/chapter-extras";
import { findQuote, splitOnQuote } from "@/lib/library/highlight";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { EmptyState, ErrorState, NeoChip } from "@/components/neo";

/* ------------------------------------------------------------------ prose */

/**
 * Source prose is lightly marked up (**bold**, blank-line paragraphs). Rendered
 * as structured text rather than dangerouslySetInnerHTML — the content is
 * trusted, but the reader should not be the one place in the app where that
 * assumption is load-bearing.
 */
/**
 * The supporting sentence, marked inside its surrounding text.
 *
 * Shared by prose paragraphs and by list items so the two cannot drift: the
 * list branch previously had no highlighting at all, which is exactly the kind
 * of gap a duplicated snippet leaves behind.
 */
function Marked({ before, hit, after }: { before: string; hit: string; after: string }) {
  return (
    <>
      {before}
      <mark className="rounded-sm bg-amber-200/70 px-0.5 text-ink-1 ring-1 ring-amber-400/40 dark:bg-amber-400/25">
        {hit}
      </mark>
      {after}
    </>
  );
}

/**
 * Which language of a section to show when an answer cited it.
 *
 * Retrieval serves the ENGLISH body as the only quotable text for the ten prose
 * books — the Hebrew in the corpus is a comprehension aid carrying machine
 * translation artefacts, and the prompt forbids quoting it. The reader renders
 * Hebrew. So a verified English sentence was being searched inside Hebrew prose
 * and never found: the citation opened the right section and highlighted
 * nothing.
 *
 * Aligning the two by paragraph index was measured and rejected — Hebrew and
 * English paragraph counts match in 0% of sections for 8 of the 10 books, so it
 * would confidently mark the wrong paragraph.
 *
 * Instead the section is shown in the language that actually contains the cited
 * sentence. That is the text the answer rested on, so it is the honest thing to
 * put in front of someone who clicked "open the source" — and it only applies
 * to the one section that was cited, while a deep link is active.
 */
function citedText(body: { he?: string; en?: string }, preferred: string, highlight?: string | null): string {
  if (!highlight) return preferred;
  if (findQuote(preferred, highlight)) return preferred;
  for (const alt of [body.en, body.he]) {
    if (alt && alt !== preferred && findQuote(alt, highlight)) return alt;
  }
  return preferred;
}

function Prose({ text, highlight }: { text: string; highlight?: string | null }) {
  const paras = useMemo(
    () => text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean),
    [text],
  );

  // Only the paragraph that actually contains the sentence is marked. Splitting
  // per paragraph rather than over the whole body keeps the offsets valid after
  // the text has been broken up for rendering.
  const marked = useMemo(
    () => paras.map((p) => splitOnQuote(p, highlight)),
    [paras, highlight],
  );
  return (
    <div className="max-w-[74ch] space-y-3">
      {paras.map((p, i) => {
        const hit = marked[i];
        if (hit) {
          return (
            <p key={i} data-quote-hit className="text-[0.9375rem] leading-[1.85] text-ink-2">
              <Marked {...hit} />
            </p>
          );
        }
        return (
        <p key={i} className="text-[0.9375rem] leading-[1.85] text-ink-2">
          {p.split(/(\*\*[^*]+\*\*)/g).map((chunk, j) =>
            chunk.startsWith("**") && chunk.endsWith("**")
              ? <strong key={j} className="font-semibold text-ink-1">{chunk.slice(2, -2)}</strong>
              : <span key={j}>{chunk}</span>,
          )}
        </p>
        );
      })}
    </div>
  );
}

/* --------------------------------------------------------------- academy */

const isList = (v: unknown): v is unknown[] => Array.isArray(v);

function RefChips({ label, value }: { label: string; value: unknown }) {
  const items = isList(value) ? value : value ? [value] : [];
  if (!items.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-[0.6875rem] text-ink-3">{label}</span>
      {items.slice(0, 24).map((x, i) => (
        <NeoChip key={i}>
          <span className="tech">{typeof x === "string" ? x : JSON.stringify(x)}</span>
        </NeoChip>
      ))}
    </div>
  );
}

/**
 * book8's sixteen facets. Rendered in FACET_ORDER, never in object order — a
 * JSON reshuffle must not be able to change the reading order of a lesson.
 */
function Academy({ body, highlight }: { body: AcademyBody; highlight?: string | null }) {
  const facets = body.facets ?? {};
  const present = FACET_ORDER.filter((f) => {
    const v = facets[f.key];
    return Array.isArray(v) ? v.length > 0 : Boolean(v?.trim());
  });
  const refs = body.refs ?? {};
  const hasRefs = Object.values(refs).some((v) => (isList(v) ? v.length : v != null && v !== ""));

  return (
    <div className="space-y-5">
      {present.map((f) => {
        const v = facets[f.key];
        return (
          <section key={f.key}>
            <h4 className="mb-1.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-ink-1">
              <span className="h-3 w-[3px] rounded-full bg-[var(--accent)]" aria-hidden />
              {f.he}
            </h4>
            {Array.isArray(v) ? (
              // Steps, mistakes and interview questions are lists in the source.
              // Rendering them as one paragraph would lose the item boundaries.
              <ul className="max-w-[74ch] space-y-1.5">
                {v.map((item, i) => {
                  // Lists are indexed and served exactly like prose, so a model
                  // quotes from them — but this branch used to render the raw
                  // item, so nine facets of book8 (about 43% of the book) could
                  // never show where an answer came from.
                  const hit = typeof item === "string" ? splitOnQuote(item, highlight) : null;
                  return (
                    <li key={i} className="flex gap-2" {...(hit ? { "data-quote-hit": "" } : {})}>
                      <span className="mt-[0.62em] size-[4px] shrink-0 rounded-full bg-[var(--accent)]/70" aria-hidden />
                      <span className="text-[0.9375rem] leading-[1.75] text-ink-2">
                        {hit ? <Marked {...hit} /> : (item as React.ReactNode)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <Prose text={v} highlight={highlight} />
            )}
          </section>
        );
      })}

      {hasRefs && (
        <section className="space-y-2 rounded-xl bg-surface-2 p-3">
          <RefChips label="טבלאות" value={refs.tables} />
          <RefChips label="טרנזקציות" value={refs.tcodes} />
          <RefChips label="אפליקציות Fiori" value={refs.fiori} />
        </section>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- section */

function SectionView({ section, body, pick, highlight }: {
  section: BookSection;
  body?: SectionBody;
  pick: (he?: string, en?: string) => string;
  /** Verified sentence to mark, when this is the section an answer cited. */
  highlight?: string | null;
}) {
  return (
    <article className="scroll-mt-24 border-b border-hairline py-5 last:border-0" id={`s-${section.id}`}>
      <header className="mb-3 flex items-baseline gap-2">
        <span className="tech shrink-0 text-[0.6875rem] font-semibold text-[var(--accent)]">{section.id}</span>
        <h3 className="text-[0.9375rem] font-semibold leading-snug text-ink-1">{pick(section.title.he, section.title.en)}</h3>
        {section.page != null && (
          <span className="ms-auto shrink-0 text-[0.6875rem] text-ink-3">עמ׳ {section.page}</span>
        )}
      </header>

      {!body ? (
        // Headings without content is a real state for some chapters, not a bug.
        <p className="text-[0.8125rem] text-ink-3">אין תוכן מורחב לסעיף זה.</p>
      ) : body.format === "academy" ? (
        <Academy body={body} highlight={highlight} />
      ) : pick(body.he, body.en) ? (
        <Prose text={citedText(body, pick(body.he, body.en), highlight)} highlight={highlight} />
      ) : body.snippet ? (
        <p className="max-w-[74ch] text-[0.875rem] leading-relaxed text-ink-3">{body.snippet}</p>
      ) : (
        <p className="text-[0.8125rem] text-ink-3">אין תוכן מורחב לסעיף זה.</p>
      )}
    </article>
  );
}

/* ------------------------------------------------------------------ view */

export function BookView({ book }: { book: Book }) {
  const identity = identityOf(book.id);
  const [active, setActive] = useState(book.chapters[0]?.n ?? 1);
  const [bodies, setBodies] = useState<Record<string, SectionBody>>({});
  const [figs, setFigs] = useState<ViewerFigure[]>([]);
  const [figAt, setFigAt] = useState<number | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const { pick } = useI18n();

  /**
   * Deep link from a citation or a diagram node: ?s=<section>&q=<sentence>.
   * The quote travels in the URL so the link is shareable and survives a reload
   * — the reader has no other way to learn which sentence an answer used.
   *
   * Read in an effect, not a memo. This page is prerendered, and a memo that
   * touches window during the hydrating render either mismatches the server
   * output or returns nothing — which is exactly what it did: the params were
   * in the URL and the highlight never appeared.
   */
  const [deepLink, setDeepLink] = useState<{ section: string | null; quote: string | null }>(
    { section: null, quote: null },
  );
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setDeepLink({ section: p.get("s"), quote: p.get("q") });
  }, []);

  const chapter = useMemo(
    () => book.chapters.find((c) => c.n === active) ?? book.chapters[0],
    [book.chapters, active],
  );

  const load = useCallback((n: number) => {
    const ctl = new AbortController();
    setState("loading");
    setFigs([]);
    // Figures are optional. A book without them must not surface an error, and
    // a failed figure fetch must not stop the prose from rendering.
    fetch(`/books/${book.id}/fig${n}.json`, { signal: ctl.signal })
      .then((r) => (r.ok ? r.json() : []))
      .then((f) => setFigs(Array.isArray(f) ? f : []))
      .catch(() => { /* no figures for this chapter */ });
    loadChapterBodies(book.id, n, ctl.signal)
      .then((b) => { setBodies(b); setState("idle"); })
      .catch(() => setState("error"));
    return () => ctl.abort();
  }, [book.id]);

  useEffect(() => load(active), [active, load]);

  // A deep link names a section, which lives in a chapter that may not be the
  // one showing. Open that chapter first, then scroll — in that order, or the
  // target is not mounted yet.
  useEffect(() => {
    if (!deepLink.section) return;
    const owner = book.chapters.find((c) => c.sections.some((s) => s.id === deepLink.section));
    if (owner && owner.n !== active) setActive(owner.n);
  }, [deepLink.section, book.chapters, active]);

  useEffect(() => {
    if (!deepLink.section || state === "loading") return;
    // Prefer the highlighted sentence; fall back to the section heading, so a
    // link still lands somewhere useful when the quote could not be located.
    const t = window.setTimeout(() => {
      const mark = document.querySelector("[data-quote-hit]");
      const target = mark ?? document.getElementById(`s-${deepLink.section}`);
      target?.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 120);
    return () => window.clearTimeout(t);
  }, [deepLink.section, deepLink.quote, state, bodies]);

  if (!chapter) {
    return <EmptyState icon={<BookOpen className="size-5" />} title="הספר ריק" hint="לא נמצאו פרקים בקובץ הספר." />;
  }

  const catalogue = book.meta.structure === "catalogue";

  return (
    <div style={accentVars(identity)} className="grid gap-6 lg:grid-cols-[15rem_1fr]">
      {/* ---------------------------------------------------------- nav */}
      <nav aria-label="פרקי הספר"
        className="lg:sticky lg:top-20 lg:max-h-[calc(100dvh-6rem)] lg:overflow-y-auto">
        <ul className="space-y-0.5">
          {book.chapters.map((c) => {
            const on = c.n === active;
            return (
              <li key={c.n}>
                <button
                  onClick={() => setActive(c.n)}
                  aria-current={on ? "true" : undefined}
                  className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-start text-[0.8125rem] transition
                    ${on ? "bg-[var(--accent-soft)] font-semibold text-[var(--accent)]" : "text-ink-2 hover:bg-surface-2"}`}
                >
                  <span className="tech w-5 shrink-0 text-[0.6875rem] opacity-70">{c.n}</span>
                  <span className="line-clamp-2 leading-snug">{pick(c.title.he, c.title.en) || chapterTitle(c)}</span>
                  <span className="ms-auto shrink-0 text-[0.625rem] text-ink-3">{c.sections.length}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ------------------------------------------------------- content */}
      <div>
        <header className="mb-4 border-b border-hairline pb-3">
          <div className="mb-1 flex flex-wrap items-center gap-2 text-[0.6875rem] text-ink-3">
            <span className="inline-flex items-center gap-1">
              {catalogue ? <Layers className="size-3" /> : <BookOpen className="size-3" />}
              {catalogue ? "קטלוג" : "פרק"} {chapter.n}
            </span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1"><Hash className="size-3" />{chapter.sections.length} סעיפים</span>
            {chapter.startPage != null && <><span aria-hidden>·</span><span>מתחיל בעמ׳ {chapter.startPage}</span></>}
          </div>
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-lg font-semibold leading-tight text-ink-1">{chapterTitle(chapter)}</h2>
            {/* Carries the chapter across as context, so the consultant starts
                from what is on screen instead of asking the reader to restate
                it. Goes to the consultant surface deliberately: the reader is
                already inside the book, so the useful next step is the wider
                discussion, not another search of the same text. */}
            <Link
              href={`/chat/?q=${encodeURIComponent(`בהקשר של ${chapterTitle(chapter)} (${book.meta.title.he?.trim() || book.meta.title.en}), `)}`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-hairline px-2.5 py-1.5 text-[0.75rem] font-semibold text-ink-2 transition hover:border-brand/40 hover:text-brand"
            >
              <MessageSquare className="size-3.5" aria-hidden />
              דון בנושא עם AI
            </Link>
          </div>
        </header>

        {state === "loading" && (
          <div className="flex items-center gap-2 py-2 text-[0.75rem] text-ink-3" aria-live="polite">
            <Loader2 className="size-3.5 animate-spin" />
            טוען את תוכן הפרק…
          </div>
        )}

        {/* A bespoke diagram, when this chapter has one. Comes from the extras
            registry, so the reader stays ignorant of which book it is. */}
        {(() => {
          const extra = chapterExtra(book.id, chapter.n);
          return extra ? <div className="mb-5">{extra}</div> : null;
        })()}

        {/* Page scans for this chapter. Optional data, so absent is not an error. */}
        {figs.length > 0 && (
          <section className="mb-5" aria-label="איורים בפרק">
            <h3 className="mb-2 flex items-center gap-1.5 text-[0.75rem] font-semibold text-ink-2">
              <Images className="size-3.5" />
              {figs.length} איורים בפרק
            </h3>
            <ul className="flex gap-2 overflow-x-auto pb-1">
              {figs.map((f, i) => (
                <li key={f.file} className="shrink-0">
                  <button
                    onClick={() => setFigAt(i)}
                    aria-label={`הגדל איור מעמוד ${f.page}`}
                    className="block overflow-hidden rounded-lg border border-hairline transition hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                  >
                    <Image src={f.file} alt="" width={128} height={90}
                      className="h-[5.5rem] w-auto max-w-[10rem] bg-surface-2 object-contain" unoptimized />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {state === "error" ? (
          <ErrorState message="לא הצלחתי לטעון את תוכן הפרק." onRetry={() => load(active)} />
        ) : (
          <div>
            {chapter.sections.map((s) => (
              <SectionView key={s.id} section={s} body={bodies[s.id]} pick={pick}
                highlight={s.id === deepLink.section ? deepLink.quote : null} />
            ))}
          </div>
        )}

        {/* ------------------------------------------------------ paging */}
        <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4">
          <button
            disabled={chapter.n <= book.chapters[0].n}
            onClick={() => setActive((n) => Math.max(book.chapters[0].n, n - 1))}
            className="rounded-lg px-2.5 py-1.5 text-[0.8125rem] text-ink-2 transition hover:bg-surface-2 disabled:opacity-40"
          >
            הפרק הקודם
          </button>
          <button
            disabled={chapter.n >= book.chapters[book.chapters.length - 1].n}
            onClick={() => setActive((n) => Math.min(book.chapters[book.chapters.length - 1].n, n + 1))}
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[0.8125rem] text-ink-2 transition hover:bg-surface-2 disabled:opacity-40"
          >
            הפרק הבא <ChevronLeft className="size-3.5" />
          </button>
        </div>
      </div>

      <FigureViewer
        open={figAt !== null}
        figs={figs}
        index={figAt ?? 0}
        onIndex={setFigAt}
        onClose={() => setFigAt(null)}
      />
    </div>
  );
}
