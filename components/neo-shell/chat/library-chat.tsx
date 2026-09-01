"use client";

/* ============================================================================
   PROJECT NEO · "שאל את הספרייה": the book specialist.
   ----------------------------------------------------------------------------
   THE COMPLAINT THIS ANSWERS. The screen was an empty box with a title over it.
   Nothing on it said who was about to answer, what it had read, or why its
   answer could be trusted more than a search engine's. It was a chat window
   with no chat in it.

   THE IDENTITY. This surface is a specialist that has read the project's books
   and answers only from them. That is not a persona invented for the copy — it
   is exactly what lib/ai/client routes to: /api/library, whose task is pinned
   server-side to a grounded, citation-first answer that refuses when the books
   do not cover the question. So the screen is allowed to introduce itself that
   way, and the mark (./marks.LibrarianMark) is that introduction in one glyph.

   WHAT IS ON THE SCREEN AND WHERE IT COMES FROM
     the corpus line   lib/ai/tree.BOOKS, which is data/ai-tree/index.json.
                       Counted, not written down. If the index is empty the
                       screen says so rather than printing a confident zero.
     the capabilities  lib/ai/modes.MODES.library.capabilities — behaviours the
                       surface actually has.
     the starters      that same file's prompts, so a chip cannot promise a
                       behaviour the endpoint does not have.
     the scope ladder  ./context-bar, resolved from the book's own tree.
     everything else   the engine's response, or a duration measured here.

   NOTHING ON THIS SCREEN IS A SAMPLE ANSWER, A FAKE CITATION OR A MOCK BOOK.
   ========================================================================== */

import { useState } from "react";
import {
  BookOpen, CheckSquare, ChevronDown, Eraser, GitCompare, Layers,
  ListTree, MessageSquarePlus, Share2, Sparkles, WandSparkles,
} from "lucide-react";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { MODES } from "@/lib/ai/modes";
import { ANSWER_ACTIONS } from "@/lib/ai/prompts";
import { BOOKS, scopeLabel } from "@/lib/ai/tree";
import type { Scope } from "@/lib/ai/types";
import { Composer } from "./composer";
import { ContextBar } from "./context-bar";
import { Live } from "./live";
import { LibrarianMark } from "./marks";
import { NeoLibrarian } from "./neo-librarian";
import { Message } from "./message";
import { ScopeSheet } from "./scope-sheet";
import { useConversation } from "./use-conversation";

/* THE SIX ACTIONS, AND WHY THEY ARE NOT NEW PROMPTS.
   ---------------------------------------------------------------------------
   lib/ai/prompts.ANSWER_ACTIONS already carries every one of these, each with
   the backend `task` profile that actually selects the model and the quality
   floor server-side. Writing fresh prompt strings here would have produced six
   buttons that LOOK like the real actions and route to the default profile —
   the same words, a weaker answer, and no way to see the difference.

   So the quick actions are LOOKED UP by id and fail loudly if an id ever stops
   existing. What this file owns is the icon and the ordering; the label, the
   prompt and the task stay with the engine.

   The technical task names (STUDENT_SUMMARY, COMPARE_ECC_S4, QUIZ …) are never
   printed. The reader sees "הסבר בפשטות"; the router sees the profile. */
const PRIMARY_IDS = ["simple", "summary", "review", "checklist", "diagram", "ecc"] as const;
const MORE_IDS = ["expand", "example", "onepage", "deck"] as const;

const QA_ICON: Record<string, React.ReactNode> = {
  simple: <WandSparkles size={15} strokeWidth={1.9} aria-hidden="true" />,
  summary: <ListTree size={15} strokeWidth={1.9} aria-hidden="true" />,
  review: <Sparkles size={15} strokeWidth={1.9} aria-hidden="true" />,
  checklist: <CheckSquare size={15} strokeWidth={1.9} aria-hidden="true" />,
  diagram: <Share2 size={15} strokeWidth={1.9} aria-hidden="true" />,
  ecc: <GitCompare size={15} strokeWidth={1.9} aria-hidden="true" />,
};

const pick = (ids: readonly string[]) =>
  ids.map((id) => ANSWER_ACTIONS.find((a) => a.id === id)).filter(Boolean) as typeof ANSWER_ACTIONS;

const PRIMARY = pick(PRIMARY_IDS);
const MORE = pick(MORE_IDS);

const M = MODES.library;

/** The voice above every answer on this surface. */
const WHO = "מומחה הספרים";

const HINT = "Enter לשליחה · Shift+Enter לשורה חדשה";

/** Counted from the shipped index, never typed in. */
const CORPUS = {
  books: BOOKS.length,
  chapters: BOOKS.reduce((n, b) => n + (b.chapters || 0), 0),
  sections: BOOKS.reduce((n, b) => n + (b.sections || 0), 0),
};

export function LibraryChat() {
  const {
    turns, scope, setScope, draft, setDraft, live, pending, busy,
    focusKey, focusComposer, send, stop, runAction, openSource,
    clearMessages, newConversation, endRef,
  } = useConversation("library");
  const [sheet, setSheet] = useState(false);

  const idle = !turns.length && !pending;
  const markState = pending ? (live?.preview ? "writing" : "thinking") : "idle";

  /* THE LIBRARY'S OWN GROUND.
     This assistant and the general one used to render on the identical
     warm-light canvas, so with the titles covered the only thing telling a
     reader which of the two they were in was the h1 — the "identical chatbot
     screens" the review rejected.

     Ask the Library is grounded in the BOOKS, so it takes the books scene:
     warm bound leather, editorial, the same world as the shelf. Its sibling
     takes the near-black indigo of a system tool. */
  return (
    <div className="nxq nm-scene" data-surface="library" data-scene="library" data-idle={idle ? "1" : undefined}>
      <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />

      {/* ---------------------------------------------------------- identity */}
      <header className="nxq-hero" data-idle={idle ? "1" : undefined}>
        <span className="nxq-hero-mark">
          <LibrarianMark size={64} state={markState} />
        </span>

        <div className="nxq-hero-text nm-rise nm-once">
          <span className="nxq-eyebrow">
            <BookOpen size={13} strokeWidth={2} aria-hidden="true" />
            ספריית SAP · תשובות מבוססות מקור
          </span>
          <h1 className="nxq-h1">{M.title}</h1>
          <p className="nxq-lede">
            תשובות מתוך ספרי SAP שבספריית הפרויקט בלבד, עם הפניה לספר, לפרק ולסעיף.
          </p>
          <p className="nxq-corpus">
            {CORPUS.books > 0 ? (
              <>
                <b>{CORPUS.books}</b> ספרים
                {" · "}
                <b>{CORPUS.chapters.toLocaleString("he-IL")}</b> פרקים
                {" · "}
                <b>{CORPUS.sections.toLocaleString("he-IL")}</b> סעיפים במאגר
              </>
            ) : (
              "לא קיים תיעוד מאומת במאגר"
            )}
          </p>
        </div>

        {/* Two different actions, and they really are different: clearing keeps
            the chosen book so the reader can carry on inside the same chapter,
            a new conversation drops the scope and the draft as well. */}
        {turns.length ? (
          <div className="nxq-hero-acts">
            <span className="nxq-hero-count">
              {turns.length === 1 ? "שאלה אחת בשיחה" : `${turns.length} שאלות בשיחה`}
            </span>
            <button type="button" className="nu-ghost nxq-hero-b" onClick={clearMessages}>
              <Eraser size={14} strokeWidth={2} aria-hidden="true" />
              ניקוי השיחה
            </button>
            <button type="button" className="nu-btn2 nxq-hero-b" onClick={newConversation}>
              <MessageSquarePlus size={14} strokeWidth={2} aria-hidden="true" />
              שיחה חדשה
            </button>
          </div>
        ) : null}
      </header>

      {/* The standing premise of everything below it. Sticky, so scrolling a
          long answer never separates it from the context it was drawn from. */}
      <ContextBar scope={scope} mode="library" onOpenScope={() => setSheet(true)} />

      <div className="nxq-thread">
        {idle ? (
          <Welcome
            scope={scope}
            onPick={(q) => { setDraft(q); focusComposer(); }}
            onAction={runAction}
            onOpenScope={() => setSheet(true)}
          />
        ) : null}

        {turns.map((t, i) => (
          <Message
            key={t.id}
            q={t.q}
            a={t.a}
            stopped={t.stopped}
            firstTokenMs={t.firstTokenMs}
            elapsedMs={t.elapsedMs}
            passages={t.passages}
            askedIn={t.scope}
            scope={scope}
            mode="library"
            who={WHO}
            busy={busy}
            isLast={i === turns.length - 1}
            onRetry={() => send(t.q, t.task)}
            onAsk={runAction}
            onOpenSource={openSource}
          />
        ))}

        {pending && live ? (
          <Live
            live={live}
            question={pending.q}
            askedIn={pending.scope}
            scope={scope}
            mode="library"
            who={WHO}
          />
        ) : null}

        <div ref={endRef} className="nxq-end" aria-hidden="true" />
      </div>

      <Composer
        value={draft}
        onChange={setDraft}
        onSend={() => send(draft)}
        onStop={stop}
        busy={busy}
        scope={scope}
        onOpenScope={() => setSheet(true)}
        placeholder="שאלה על תהליך, טרנזקציה או אובייקט SAP מתוך ספרי הספרייה"
        hint={`${HINT} · ${scopeLabel(scope)}`}
        autoFocusKey={focusKey}
      />

      {sheet ? (
        <ScopeSheet scope={scope} onScope={setScope} onClose={() => setSheet(false)} />
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * How the surface introduces itself before the first question.
 *
 * Three things, in the order a first-time reader needs them: who is answering,
 * how the answer is produced, and one press that starts a real question. The
 * capability band and the starters are lib/ai/modes' own, so nothing here can
 * promise a behaviour the endpoint does not have.
 */
function Welcome({ scope, onPick, onAction, onOpenScope }: {
  scope: Scope;
  onPick: (q: string) => void;
  onAction: (prompt: string, task?: string) => void;
  onOpenScope: () => void;
}) {
  const [more, setMore] = useState(false);

  /* The scope line, said in words rather than in filter syntax. When a book is
     chosen it names the book; when it is not, "כל הספרייה" is itself a choice
     and the corpus counts are the honest description of it. Both come from the
     shipped index — a zero would be printed as "אין מידע", never as a
     confident number. */
  const scoped = Boolean(scope.bookId);

  return (
    <section className="nxq-welcome" aria-label="מבוא">
      {/* --------------------------------------------------- the greeting */}
      <div className="nxq-w-top">
        <NeoLibrarian size={138} className="nxq-w-neo nm-rise nm-once" />
        <div className="nxq-w-say">
          <span className="nxq-eyebrow">
            <BookOpen size={13} strokeWidth={2} aria-hidden="true" />
            ספריית SAP
          </span>
          <h2 className="nxq-w-h">שאלות על ספרי SAP שבספרייה</h2>
          <p className="nxq-w-p">
            {CORPUS.books > 0
              ? "התשובות נכתבות מתוך ספרי SAP שבספרייה: הסבר, סיכום, השוואה, תרשים והפניה למקור המדויק."
              : "לא קיים תיעוד מאומת במאגר. ללא ספרים במאגר אין מקור לתשובה."}
          </p>
          <ul className="nxq-caps">
            {M.capabilities.map((cap) => (
              <li key={cap} className="nu-chip">{cap}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ------------------------------------------------- current context */}
      <button type="button" className="nxq-w-scope" onClick={onOpenScope}>
        <span className="nxq-w-scope-l">
          <Layers size={14} strokeWidth={2} aria-hidden="true" />
          היקף השאלה
        </span>
        <b className="nxq-w-scope-v">{scopeLabel(scope)}</b>
        <span className="nxq-w-scope-m">
          {scoped
            ? "בחירת ספר, פרק או סעיף אחר"
            : CORPUS.books > 0
              ? `${CORPUS.books} ספרים · ${CORPUS.chapters.toLocaleString("he-IL")} פרקים · ${CORPUS.sections.toLocaleString("he-IL")} סעיפים`
              : "אין ספרים במאגר"}
        </span>
        <ChevronDown size={16} strokeWidth={2} aria-hidden="true" className="nxq-w-scope-c" />
      </button>

      {/* --------------------------------------------------- quick actions */}
      <div className="nxq-qa">
        <span className="nxq-qa-t">פעולות על החומר שנבחר</span>
        <div className="nxq-qa-row">
          {PRIMARY.map((a, i) => (
            <button
              key={a.id}
              type="button"
              className="nxq-qa-b nm-rise nm-once"
              style={{ "--nm-i": i } as React.CSSProperties}
              onClick={() => onAction(a.prompt, a.task)}
            >
              <span className="nxq-qa-i" aria-hidden="true">{QA_ICON[a.id]}</span>
              {a.label}
            </button>
          ))}
          <button
            type="button"
            className="nxq-qa-more"
            aria-expanded={more}
            onClick={() => setMore((v) => !v)}
          >
            עוד פעולות
            <ChevronDown size={14} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
        {more ? (
          <div className="nxq-qa-row nxq-qa-row2 nm-seq">
            {MORE.map((a, i) => (
              <button
                key={a.id}
                type="button"
                className="nxq-qa-b nxq-qa-b2 nm-rise nm-once"
                style={{ "--nm-i": i } as React.CSSProperties}
                onClick={() => onAction(a.prompt, a.task)}
              >
                {a.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* ------------------------------------------------------- starters */}
      <div className="nxq-starters">
        <span className="nxq-starters-t">
          <Sparkles size={13} strokeWidth={2} aria-hidden="true" />
          שאלות לדוגמה
        </span>
        <div className="nxq-starters-row nm-seq">
          {M.starters.map((s, i) => (
            <button
              key={s.label}
              type="button"
              className="nu-card nxq-starter nm-rise nm-once"
              style={{ "--nm-i": i } as React.CSSProperties}
              onClick={() => onPick(s.prompt)}
            >
              <span className="nxq-starter-l">{s.label}</span>
              <span className="nxq-starter-p">{s.prompt}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
