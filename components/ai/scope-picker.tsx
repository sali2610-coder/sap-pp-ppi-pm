"use client";

/**
 * Choosing what the library may read.
 *
 * There are two ways people arrive: knowing exactly which subchapter they want,
 * or knowing a concept and not which of eleven books discusses it. Those are
 * different jobs, so they are two visible modes rather than one control that
 * happens to also work when left empty.
 *
 * The engine underneath is the same — an empty scope already searches every
 * indexed book — so this adds no second retrieval path. It makes an existing
 * capability findable, which is the actual gap.
 *
 * Deliberately NOT a tree. The full tree still exists for people who want to
 * browse 4,314 sections; as a first contact it asks the user to navigate a
 * structure they came here precisely because they do not know.
 *
 * The hierarchy is read, never assumed. Two books have no third level at all
 * (book7 is 1,689 flat Fiori codes, book11 is 77 flat sections), so the section
 * step renders what a chapter actually contains and says so when it contains
 * nothing.
 */

import { useEffect, useMemo, useState } from "react";
import { BookOpen, Check, ChevronLeft, Layers, Library, Search, X } from "lucide-react";
import { BOOKS, bookById, loadTree } from "@/lib/ai/tree";
import type { BookTree, Scope, TreeSection } from "@/lib/ai/types";
import { accentVars, identityOf } from "@/lib/book-identity";

type Step = "book" | "chapter" | "section";

const norm = (s: string) => s.toLowerCase().trim();

/** Flattens one chapter's sections, keeping depth so children stay indented. */
function flatten(nodes: TreeSection[] | undefined, depth = 0): Array<{ s: TreeSection; depth: number }> {
  const out: Array<{ s: TreeSection; depth: number }> = [];
  for (const s of nodes ?? []) {
    out.push({ s, depth });
    // One level of nesting is shown. Deeper than that and the picker becomes
    // the tree it exists to replace.
    if (depth === 0 && s.children?.length) out.push(...flatten(s.children, 1));
  }
  return out;
}

export function ScopePicker({ scope, onScope, onDone }: {
  scope: Scope;
  onScope: (s: Scope) => void;
  /** Called once a scope is settled, so a mobile sheet can close itself. */
  onDone?: () => void;
}) {
  const [step, setStep] = useState<Step>(scope.bookId ? "chapter" : "book");
  const [tree, setTree] = useState<BookTree | null>(null);
  const [q, setQ] = useState("");
  // Explicit state, NOT derived from scope.bookId. Choosing "one book" and then
  // choosing WHICH book are two moments; deriving the mode collapsed them, so
  // the focused tab rendered the whole-library panel until a book was picked.
  const [focused, setFocused] = useState(Boolean(scope.bookId));

  // A scope arriving from outside (a shared link, a restored thread) decides the
  // mode; a scope cleared from outside returns to whole-library.
  useEffect(() => { if (scope.bookId) setFocused(true); }, [scope.bookId]);

  const whole = !focused;

  useEffect(() => {
    if (!scope.bookId) { setTree(null); return; }
    let alive = true;
    void loadTree(scope.bookId).then((t) => { if (alive) setTree(t); });
    return () => { alive = false; };
  }, [scope.bookId]);

  useEffect(() => { setQ(""); }, [step]);

  const chapter = useMemo(
    () => tree?.chapters.find((c) => c.n === scope.chapter) ?? null,
    [tree, scope.chapter],
  );

  const sections = useMemo(() => {
    const list = flatten(chapter?.nodes ?? chapter?.sections);
    if (!q.trim()) return list;
    const n = norm(q);
    return list.filter(({ s }) => norm(s.t).includes(n) || s.id.includes(n));
  }, [chapter, q]);

  const books = useMemo(() => {
    if (!q.trim()) return BOOKS;
    const n = norm(q);
    return BOOKS.filter((b) => norm(b.title).includes(n) || norm(b.module).includes(n));
  }, [q]);

  const chapters = useMemo(() => {
    const list = tree?.chapters ?? [];
    if (!q.trim()) return list;
    const n = norm(q);
    return list.filter((c) => norm(c.t).includes(n) || String(c.n) === q.trim());
  }, [tree, q]);

  const pickWhole = () => { setFocused(false); onScope({}); setStep("book"); onDone?.(); };

  const row = "flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-start transition hover:bg-surface-2";

  /* ------------------------------------------------------------- mode */
  const modes = (
    <div className="flex gap-1.5 rounded-xl bg-surface-2 p-1" role="tablist" aria-label="אופן החיפוש">
      <button
        role="tab" aria-selected={whole} onClick={pickWhole}
        className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-[11.5px] font-bold transition ${
          whole ? "bg-surface text-brand shadow-sm" : "text-ink-3 hover:text-ink-1"}`}
      >
        <Library className="size-3.5" /> כל הספרייה
      </button>
      <button
        role="tab" aria-selected={!whole}
        onClick={() => { setFocused(true); setStep(scope.bookId ? "chapter" : "book"); }}
        className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-[11.5px] font-bold transition ${
          !whole ? "bg-surface text-brand shadow-sm" : "text-ink-3 hover:text-ink-1"}`}
      >
        <BookOpen className="size-3.5" /> ספר ממוקד
      </button>
    </div>
  );

  /* -------------------------------------------------------- breadcrumb */
  const book = bookById(scope.bookId);
  const crumb = book && (
    <div className="flex flex-wrap items-center gap-1 text-[11px]">
      <button onClick={() => setStep("book")} className="rounded-md px-1.5 py-0.5 font-bold text-brand hover:bg-brand-soft">
        {book.title}
      </button>
      {scope.chapter != null && (
        <>
          <ChevronLeft className="size-3 shrink-0 text-ink-3" aria-hidden />
          <button onClick={() => setStep("chapter")} className="rounded-md px-1.5 py-0.5 text-ink-2 hover:bg-surface-2">
            {chapter?.t || `פרק ${scope.chapter}`}
          </button>
        </>
      )}
      {scope.section && (
        <>
          <ChevronLeft className="size-3 shrink-0 text-ink-3" aria-hidden />
          <span className="tech rounded-md bg-surface-2 px-1.5 py-0.5 font-semibold text-ink-1">{scope.section}</span>
        </>
      )}
      <button
        onClick={pickWhole}
        aria-label="נקה בחירה וחזור לכל הספרייה"
        className="ms-auto rounded-md p-1 text-ink-3 transition hover:bg-surface-2 hover:text-brand"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );

  const search = (placeholder: string) => (
    <label className="flex items-center gap-2 rounded-xl border border-hairline bg-surface px-2.5 py-1.5">
      <Search className="size-3.5 shrink-0 text-ink-3" aria-hidden />
      <input
        value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-[12.5px] text-ink-1 outline-none placeholder:text-ink-3"
      />
      {q && <button onClick={() => setQ("")} aria-label="נקה חיפוש" className="text-ink-3 hover:text-ink-1"><X className="size-3.5" /></button>}
    </label>
  );

  return (
    <div className="space-y-2.5">
      {modes}

      {whole ? (
        <div className="rounded-xl border border-hairline bg-surface-2/40 p-3">
          <p className="text-[12.5px] font-semibold text-ink-1">מחפש בכל הספרייה</p>
          <p className="mt-0.5 text-[11.5px] leading-relaxed text-ink-3">
            {BOOKS.length} ספרים · {BOOKS.reduce((n, b) => n + b.sections, 0).toLocaleString("he-IL")} סעיפים.
            אין צורך לדעת מראש באיזה ספר נמצא המידע.
          </p>
        </div>
      ) : (
        <>
          {crumb}

          {step === "book" && (
            <>
              {search("חפש ספר או מודול…")}
              <ul className="max-h-[22rem] space-y-1 overflow-auto">
                {books.map((b) => {
                  const id = identityOf(b.id);
                  const active = scope.bookId === b.id;
                  return (
                    <li key={b.id}>
                      <button
                        style={accentVars(id)}
                        onClick={() => { onScope({ bookId: b.id }); setStep("chapter"); }}
                        className={`${row} ${active ? "bg-brand-soft" : ""}`}
                      >
                        <span className="h-8 w-1 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[12.5px] font-semibold text-ink-1">{b.title}</span>
                          <span className="block text-[11px] text-ink-3">
                            {b.module} · {b.chapters} פרקים · {b.sections.toLocaleString("he-IL")} סעיפים
                          </span>
                        </span>
                        {active && <Check className="size-3.5 shrink-0 text-brand" aria-hidden />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          )}

          {step === "chapter" && (
            <>
              {search("חפש פרק…")}
              {!tree && <p className="px-1 py-3 text-[12px] text-ink-3">טוען פרקים…</p>}
              <ul className="max-h-[22rem] space-y-1 overflow-auto">
                {/* Whole-book is a legitimate scope, so it is offered explicitly
                    rather than left as "pick nothing and hope". */}
                {tree && (
                  <li>
                    <button
                      onClick={() => { onScope({ bookId: scope.bookId }); onDone?.(); }}
                      className={`${row} ${scope.chapter == null ? "bg-brand-soft" : ""}`}
                    >
                      <Layers className="size-3.5 shrink-0 text-ink-3" aria-hidden />
                      <span className="flex-1 text-[12.5px] font-semibold text-ink-1">הספר כולו</span>
                      {scope.chapter == null && <Check className="size-3.5 text-brand" aria-hidden />}
                    </button>
                  </li>
                )}
                {chapters.map((c) => (
                  <li key={c.n}>
                    <button
                      onClick={() => { onScope({ bookId: scope.bookId, chapter: c.n }); setStep("section"); }}
                      className={`${row} ${scope.chapter === c.n ? "bg-brand-soft" : ""}`}
                    >
                      <span className="tech w-6 shrink-0 text-[11px] font-bold text-ink-3">{c.n}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[12.5px] font-semibold text-ink-1">{c.t}</span>
                        <span className="block text-[11px] text-ink-3">{c.sections.length} סעיפים</span>
                      </span>
                      {scope.chapter === c.n && <Check className="size-3.5 shrink-0 text-brand" aria-hidden />}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {step === "section" && (
            <>
              {search("חפש סעיף…")}
              <ul className="max-h-[22rem] space-y-1 overflow-auto">
                <li>
                  <button
                    onClick={() => { onScope({ bookId: scope.bookId, chapter: scope.chapter }); onDone?.(); }}
                    className={`${row} ${!scope.section ? "bg-brand-soft" : ""}`}
                  >
                    <Layers className="size-3.5 shrink-0 text-ink-3" aria-hidden />
                    <span className="flex-1 text-[12.5px] font-semibold text-ink-1">הפרק כולו</span>
                    {!scope.section && <Check className="size-3.5 text-brand" aria-hidden />}
                  </button>
                </li>
                {sections.map(({ s, depth }) => (
                  <li key={s.id}>
                    <button
                      onClick={() => { onScope({ bookId: scope.bookId, chapter: scope.chapter, section: s.id }); onDone?.(); }}
                      className={`${row} ${scope.section === s.id ? "bg-brand-soft" : ""}`}
                      style={{ paddingInlineStart: `${0.625 + depth * 0.9}rem` }}
                    >
                      <span className="tech shrink-0 text-[11px] font-semibold text-ink-3">{s.id}</span>
                      <span className="min-w-0 flex-1 truncate text-[12.5px] text-ink-1">{s.t}</span>
                      {scope.section === s.id && <Check className="size-3.5 shrink-0 text-brand" aria-hidden />}
                    </button>
                  </li>
                ))}
                {/* Never invent a level that the book does not have. */}
                {!sections.length && !q && (
                  <li className="px-2.5 py-3 text-[11.5px] leading-relaxed text-ink-3">
                    הפרק הזה אינו מחולק לסעיפים. השאלה תיענה על הפרק כולו.
                  </li>
                )}
                {!sections.length && q && (
                  <li className="px-2.5 py-3 text-[11.5px] text-ink-3">אין סעיף שתואם ״{q}״.</li>
                )}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}
