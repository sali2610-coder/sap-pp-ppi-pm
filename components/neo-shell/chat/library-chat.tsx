"use client";

/* ============================================================================
   PROJECT NEO · "שאל את הספרייה" — the book specialist.
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
import { BookOpen, Eraser, Layers, MessageSquarePlus, Search, Sparkles } from "lucide-react";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { MODES } from "@/lib/ai/modes";
import { BOOKS, scopeLabel } from "@/lib/ai/tree";
import type { Scope } from "@/lib/ai/types";
import { Composer } from "./composer";
import { ContextBar } from "./context-bar";
import { Live } from "./live";
import { LibrarianMark } from "./marks";
import { Message } from "./message";
import { ScopeSheet } from "./scope-sheet";
import { useConversation } from "./use-conversation";

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

  return (
    <div className="nxq" data-surface="library">
      <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />

      {/* ---------------------------------------------------------- identity */}
      <header className="nxq-hero">
        <span className="nxq-hero-mark">
          <LibrarianMark size={64} state={markState} />
        </span>

        <div className="nxq-hero-text">
          <span className="nxq-eyebrow">
            <BookOpen size={13} strokeWidth={2} aria-hidden="true" />
            ספרייה · תשובות מבוססות מקור
          </span>
          <h1 className="nxq-h1">{M.title}</h1>
          <p className="nxq-lede">
            מומחה SAP שקרא את ספרי הפרויקט ועונה רק מתוכם, עם הפניה לספר, לפרק ולסעיף.
          </p>
          <p className="nxq-corpus">
            {CORPUS.books > 0 ? (
              <>
                <b>{CORPUS.books}</b> ספרים
                {" · "}
                <b>{CORPUS.chapters.toLocaleString("he-IL")}</b> פרקים
                {" · "}
                <b>{CORPUS.sections.toLocaleString("he-IL")}</b> סעיפים באינדקס
              </>
            ) : (
              "לא קיים מידע מאומת בפרויקט"
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
        placeholder="שאל שאלה על החומר בספרייה…"
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
function Welcome({ scope, onPick, onOpenScope }: {
  scope: Scope;
  onPick: (q: string) => void;
  onOpenScope: () => void;
}) {
  return (
    <section className="nxq-welcome" aria-label="על המשטח הזה">
      <div className="nxq-welcome-top">
        <LibrarianMark size={76} className="nxq-welcome-mark" />
        <div className="nxq-welcome-say">
          <h2 className="nxq-welcome-h">{WHO}</h2>
          <p className="nxq-welcome-p">
            {CORPUS.books > 0
              ? `אני עונה אך ורק מתוך ${CORPUS.books} הספרים שבפרויקט. לכל טענה מצורפת הפניה לספר, לפרק ולסעיף. אם החומר שנבחר לא מכסה את השאלה, אומַר זאת במקום לנחש.`
              : "לא קיים מידע מאומת בפרויקט. עד שהאינדקס ייטען אין ממה לענות."}
          </p>
          <ul className="nxq-caps">
            {M.capabilities.map((cap) => (
              <li key={cap} className="nu-chip">{cap}</li>
            ))}
          </ul>
        </div>
      </div>

      <ol className="nxq-steps">
        <Step
          n={1}
          icon={<Layers size={15} strokeWidth={2} aria-hidden="true" />}
          t="בוחרים היקף"
          d="כל הספרייה, ספר, פרק או סעיף. ההיקף קובע ממה מותר לקרוא."
        />
        <Step
          n={2}
          icon={<Search size={15} strokeWidth={2} aria-hidden="true" />}
          t="שואלים בעברית"
          d="שאלה חופשית. אפשר לבקש הסבר, השוואה, דוגמה או תרשים."
        />
        <Step
          n={3}
          icon={<BookOpen size={15} strokeWidth={2} aria-hidden="true" />}
          t="מקבלים תשובה עם מקור"
          d="לצד התשובה מוצגים הקטעים ששימשו אותה, ועמוד כשהוא קיים ברשומה."
        />
      </ol>

      {/* The scope call to action states the current premise and offers the one
          control that changes it. It is shown in both states because "כל
          הספרייה" is itself a choice, not an absence of one. */}
      <div className="nxq-scope-cta">
        <span className="nxq-scope-cta-l">ההיקף הנוכחי</span>
        <b className="nxq-scope-cta-v">{scopeLabel(scope)}</b>
        <button type="button" className="nu-btn2 nxq-scope-cta-b" onClick={onOpenScope}>
          <Layers size={14} strokeWidth={2} aria-hidden="true" />
          {scope.bookId ? "שנה היקף" : "בחר ספר, פרק או סעיף"}
        </button>
      </div>

      <div className="nxq-starters">
        <span className="nxq-starters-t">
          <Sparkles size={13} strokeWidth={2} aria-hidden="true" />
          אפשר להתחיל מ
        </span>
        <div className="nxq-starters-row">
          {M.starters.map((s) => (
            <button key={s.label} type="button" className="nu-card nxq-starter" onClick={() => onPick(s.prompt)}>
              <span className="nxq-starter-l">{s.label}</span>
              <span className="nxq-starter-p">{s.prompt}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Step({ n, icon, t, d }: { n: number; icon: React.ReactNode; t: string; d: string }) {
  return (
    <li className="nxq-step">
      <span className="nxq-step-n" aria-hidden="true">{n}</span>
      <span className="nxq-step-i" aria-hidden="true">{icon}</span>
      <b className="nxq-step-t">{t}</b>
      <span className="nxq-step-d">{d}</span>
    </li>
  );
}
