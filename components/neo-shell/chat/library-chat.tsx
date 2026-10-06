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

   THE DESK (2026-10). Everything used to stack in one narrow column: the
   context bar, the composer, a welcome card, the scope strip, a row of pills
   and the starters, on a 56rem measure in a canvas twice that wide. The screen
   is now a reading desk in the catalogs' language:
     the hero          the catalog kit's eyebrow, title, lede and ledger, so
                       this page reads as the same product as the Reference
                       catalogs and the academy.
     the window        one framed conversation: a title bar (who answers, what
                       it is doing now, the session actions), the answer's
                       premise as its toolbar, the thread, and the question
                       field as its bottom bar.
     the side panel    the actions on the chosen material, as a column of keys
                       beside the window (after it on a narrow screen).

   WHAT IS ON THE SCREEN AND WHERE IT COMES FROM
     the corpus line   lib/ai/tree.BOOKS, which is data/ai-tree/index.json.
                       Counted, not written down. If the index is empty the
                       screen says so rather than printing a confident zero.
     the capabilities  lib/ai/modes.MODES.library.capabilities — behaviours the
                       surface actually has.
     the starters      that same file's prompts, so a chip cannot promise a
                       behaviour the endpoint does not have.
     the status        ./engine.phaseLabel, the engine's own word for the phase
                       the backend reported. Nothing here narrates a state.
     the scope ladder  ./context-bar, resolved from the book's own tree.
     everything else   the engine's response, or a duration measured here.

   NOTHING ON THIS SCREEN IS A SAMPLE ANSWER, A FAKE CITATION OR A MOCK BOOK.
   ========================================================================== */

import { useState } from "react";
import {
  BookOpen, Check, ChevronLeft, CircleHelp, Eraser, FileText, GitCompare, Layers,
  Lightbulb, ListChecks, ListTree, MessageSquarePlus, Microscope, Presentation,
  Sparkles, WandSparkles, Workflow,
} from "lucide-react";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { CatalogFoot, CatalogHero, Ledger } from "@/components/neo-shell/data/catalog-kit";
import { MODES } from "@/lib/ai/modes";
import { ANSWER_ACTIONS } from "@/lib/ai/prompts";
import { BOOKS, scopeLabel } from "@/lib/ai/tree";
import type { Scope } from "@/lib/ai/types";
import { Composer } from "./composer";
import { ContextBar } from "./context-bar";
import { phaseLabel } from "./engine";
import { Live } from "./live";
import { MORE_IDS, PRIMARY_IDS } from "./library-actions";
import { LibrarianMark } from "./marks";
import { NeoLibrarian } from "./neo-librarian";
import { Message } from "./message";
import { ScopeSheet } from "./scope-sheet";
import { useConversation } from "./use-conversation";

/* THE TEN ACTIONS, AND WHY THEY ARE NOT NEW PROMPTS.
   ---------------------------------------------------------------------------
   lib/ai/prompts.ANSWER_ACTIONS already carries every one of these, each with
   the backend `task` profile that actually selects the model and the quality
   floor server-side. Writing fresh prompt strings here would have produced
   buttons that LOOK like the real actions and route to the default profile —
   the same words, a weaker answer, and no way to see the difference.

   So the actions are LOOKED UP by id (./library-actions), and
   test/library-actions.test.ts fails if an id ever stops existing. What this
   file owns is the icon; the label, the prompt and the task stay with the
   engine.

   The technical task names (STUDENT_SUMMARY, COMPARE_ECC_S4, QUIZ …) are never
   printed. The reader sees "הסבר פשוט"; the router sees the profile. */

const ICON_PROPS = { size: 17, strokeWidth: 1.9, "aria-hidden": true } as const;
const ACTION_ICON: Record<string, React.ReactNode> = {
  simple: <WandSparkles {...ICON_PROPS} />,
  summary: <ListTree {...ICON_PROPS} />,
  review: <CircleHelp {...ICON_PROPS} />,
  checklist: <ListChecks {...ICON_PROPS} />,
  diagram: <Workflow {...ICON_PROPS} />,
  ecc: <GitCompare {...ICON_PROPS} />,
  expand: <Microscope {...ICON_PROPS} />,
  example: <Lightbulb {...ICON_PROPS} />,
  onepage: <FileText {...ICON_PROPS} />,
  deck: <Presentation {...ICON_PROPS} />,
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
  const openScope = () => setSheet(true);

  const idle = !turns.length && !pending;
  const markState = pending ? (live?.preview ? "writing" : "thinking") : "idle";

  /* ASK THE LIBRARY IS GROUNDED IN THE BOOKS, SO IT HAS ITS OWN GROUND.
     This assistant and the general one used to render on the identical
     canvas, so with the titles covered the only thing telling a reader which
     of the two they were in was the h1. The library keeps its own scene: the
     reading room, with the shelf's burgundy as its accent. Its sibling takes
     the cool ground of a system tool. */
  return (
    <div className="nxq nm-scene" data-surface="library" data-scene="library" data-idle={idle ? "1" : undefined}>
      <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />

      {/* The room: the hero and the desk share one width, so the ledger can
          stand over the side panel's column where the two sit side by side. */}
      <div className="nxq-room">
      {/* ---------------------------------------------------------- identity */}
      <CatalogHero
        icon={<BookOpen size={15} strokeWidth={2} aria-hidden="true" />}
        eyebrow="עזרה מהספרייה · תשובות מהספרים בלבד, עם מקור"
        title={M.title}
        lede="תשובות מתוך ספרי SAP שבספריית הפרויקט בלבד, עם הפניה לספר, לפרק ולסעיף."
      >
        {CORPUS.books > 0 ? (
          <Ledger
            label="המאגר שהתשובות נכתבות ממנו"
            items={[
              { v: CORPUS.books, l: "ספרים" },
              { v: CORPUS.chapters, l: "פרקים" },
              { v: CORPUS.sections, l: "סעיפים במאגר" },
            ]}
          />
        ) : (
          <p className="nxq-corpus">לא קיים תיעוד מאומת במאגר</p>
        )}
      </CatalogHero>

      <div className="nxq-desk">
        {/* ------------------------------------------------------ the window */}
        <section className="nxq-win" aria-label={`השיחה עם ${WHO}`}>
          <header className="nxq-win-h">
            <span className="nxq-win-mark">
              <LibrarianMark size={30} state={markState} />
            </span>
            <span className="nxq-win-who">
              <b>{WHO}</b>
              {/* The engine's own word for the phase it is in, or "ready". A
                  dot and its word, never a colour alone. */}
              <span className="nxq-win-st" data-busy={pending ? "1" : undefined}>
                <i aria-hidden="true" />
                {pending && live ? phaseLabel(live) : "מוכן לשאלה"}
              </span>
            </span>

            {/* Two different actions, and they really are different: clearing
                keeps the chosen book so the reader can carry on inside the same
                chapter, a new conversation drops the scope and the draft. */}
            {turns.length ? (
              <span className="nxq-win-acts">
                <span className="nxq-win-count">
                  {turns.length === 1 ? "שאלה אחת בשיחה" : `${turns.length} שאלות בשיחה`}
                </span>
                <button type="button" className="nu-ghost nxq-win-b" onClick={clearMessages}>
                  <Eraser size={14} strokeWidth={2} aria-hidden="true" />
                  ניקוי השיחה
                </button>
                <button type="button" className="nu-btn2 nxq-win-b" onClick={newConversation}>
                  <MessageSquarePlus size={14} strokeWidth={2} aria-hidden="true" />
                  שיחה חדשה
                </button>
              </span>
            ) : null}
          </header>

          {/* The standing premise of everything below it, as the window's
              toolbar. Sticky, so scrolling a long answer never separates it
              from the context it was drawn from. */}
          <ContextBar scope={scope} mode="library" onOpenScope={openScope} />

          <div className="nxq-thread">
            {idle ? (
              <Welcome onPick={(q) => { setDraft(q); focusComposer(); }} />
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

          {/* The question field is the window's bottom bar, in one place for
              the whole session: it stays in view while an answer scrolls past
              (sticky), and on first load it is already on screen. */}
          <Composer
            value={draft}
            onChange={setDraft}
            onSend={() => send(draft)}
            onStop={stop}
            busy={busy}
            scope={scope}
            onOpenScope={openScope}
            placeholder="שאלה על תהליך, טרנזקציה או אובייקט SAP מתוך ספרי הספרייה"
            hint={`${HINT} · ${scopeLabel(scope)}`}
            autoFocusKey={focusKey}
          />
        </section>

        {/* ------------------------------------------------- the side panel */}
        <aside className="nxq-side" aria-labelledby="nxq-side-t">
          <Actions scope={scope} busy={busy} onAction={runAction} onOpenScope={openScope} />
        </aside>
      </div>
      </div>

      <CatalogFoot>התשובות נכתבות מתוך ספרי SAP שבספריית הפרויקט בלבד, עם הפניה לספר, לפרק ולסעיף.</CatalogFoot>

      {sheet ? (
        <ScopeSheet scope={scope} onScope={setScope} onClose={() => setSheet(false)} />
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * The actions on the chosen material, as keys.
 *
 * Each key sends the engine's own prompt with its own task profile, through the
 * same runAction the follow-ups under an answer use. While an answer is being
 * written a second request is refused by the conversation itself, so the keys
 * say so (aria-disabled, which keeps a pressed key focused for a keyboard
 * reader) instead of pretending to accept a press.
 */
function Actions({ scope, busy, onAction, onOpenScope }: {
  scope: Scope;
  busy: boolean;
  onAction: (prompt: string, task?: string) => void;
  onOpenScope: () => void;
}) {
  const key = (a: (typeof ANSWER_ACTIONS)[number], more?: boolean) => (
    <li key={a.id}>
      <button
        type="button"
        className={more ? "nxq-key nxq-key2" : "nxq-key"}
        aria-disabled={busy || undefined}
        onClick={() => { if (!busy) onAction(a.prompt, a.task); }}
      >
        <span className="nxq-key-i" aria-hidden="true">{ACTION_ICON[a.id]}</span>
        <span className="nxq-key-l">{a.label}</span>
        {more ? null : <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" className="nxq-key-c" />}
      </button>
    </li>
  );

  return (
    <>
      <div className="nxq-side-h">
        <h2 className="nxq-side-t" id="nxq-side-t">פעולות על החומר שנבחר</h2>
        <p className="nxq-side-p">
          כל פעולה שולחת בקשה מוכנה, על ההיקף שבחרת או על נושא השאלה האחרונה בשיחה.
        </p>
        <p className="nxq-side-on">
          <Layers size={14} strokeWidth={2} aria-hidden="true" />
          <span>היקף:</span>
          <b dir="auto">{scopeLabel(scope)}</b>
          <button type="button" className="nu-ghost nxq-side-x" onClick={onOpenScope}>
            {scope.bookId ? "שינוי" : "בחירת ספר"}
          </button>
        </p>
      </div>

      <ul className="nxq-keys">{PRIMARY.map((a) => key(a))}</ul>

      <div className="nxq-side-more">
        <h3 className="nxq-side-sub">עוד פעולות</h3>
        <ul className="nxq-keys nxq-keys2">{MORE.map((a) => key(a, true))}</ul>
      </div>

      {busy ? <p className="nxq-side-busy">הפעולות יחזרו לפעול כשהתשובה הנוכחית תושלם.</p> : null}
    </>
  );
}

/**
 * How the window introduces itself before the first question.
 *
 * Three things, in the order a first-time reader needs them: who is answering,
 * how the answer is produced, and one press that starts a real question. The
 * capability list and the starters are lib/ai/modes' own, so nothing here can
 * promise a behaviour the endpoint does not have.
 */
function Welcome({ onPick }: { onPick: (q: string) => void }) {
  return (
    <section className="nxq-welcome" aria-labelledby="nxq-w-h">
      {/* --------------------------------------------------- the greeting */}
      <div className="nxq-w-top">
        <NeoLibrarian size={96} className="nxq-w-neo nm-rise nm-once" />
        <div className="nxq-w-say">
          <span className="nxq-eyebrow">
            <BookOpen size={13} strokeWidth={2} aria-hidden="true" />
            ספריית SAP
          </span>
          <h2 className="nxq-w-h" id="nxq-w-h">שאלות על ספרי SAP שבספרייה</h2>
          <p className="nxq-w-p">
            {CORPUS.books > 0
              ? "התשובות נכתבות מתוך ספרי SAP שבספרייה: הסבר, סיכום, השוואה, תרשים והפניה למקור המדויק."
              : "לא קיים תיעוד מאומת במאגר. ללא ספרים במאגר אין מקור לתשובה."}
          </p>
          <ul className="nxq-caps">
            {M.capabilities.map((cap) => (
              <li key={cap} className="nxq-cap">
                <Check size={14} strokeWidth={2.4} aria-hidden="true" />
                {cap}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ------------------------------------------------------- starters */}
      <div className="nxq-starters">
        <span className="nxq-starters-t">
          <Sparkles size={13} strokeWidth={2} aria-hidden="true" />
          שאלות לדוגמה
        </span>
        <div className="nxq-starters-row nm-seq">
          {/* A few openers, not a wall (design audit §7). */}
          {M.starters.slice(0, 4).map((s, i) => (
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
