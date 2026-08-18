"use client";

/* ============================================================================
   PROJECT NEO · /neo/chat/ — the general assistant. NOT "שאל את הספרייה".
   ----------------------------------------------------------------------------
   These two screens used to be one component rendered twice, which is why
   nobody could tell them apart: they were the same screen with a different
   title. They are now separate surfaces with separate marks, separate chrome,
   separate copy and separate empty states, and they share only the conversation
   machinery in ./use-conversation — because turn ordering and Stop semantics
   must not be fixable on one screen and still broken on the other.

   WHAT THIS SURFACE IS. The general SAP assistant: a conversation that is not
   bounded by the project's books. It is the place a site-wide assistant will
   grow into, and today it is a well-made shell over the one thing that already
   exists behind it — lib/ai/client's /api/consult endpoint.

   WHAT THIS SURFACE MUST NOT DO IS PRETEND. So the screen carries an explicit
   limits panel, and every line on it is checkable against the code rather than
   against a hope:
     - "no live SAP Help / SAP Notes / SAP Community" is lib/ai/modes'
       CONSULT_DISCLAIMER, the project's own standing statement.
     - "this browser sends your question and nothing else" is the request body
       askApiStream builds: question, task, and the scope fields, which on this
       surface are empty. No table, transaction, incident or note from the
       project is attached to the conversation.
     - "sources are shown when they arrive, and the answer is marked as general
       knowledge when they do not" is exactly what ./message.Grounding does.
   There is no claim here that the assistant can navigate the site, open an
   object, run anything, or read your SAP system, because it cannot.
   ========================================================================== */

import { Check, MessageSquarePlus, Minus, ShieldAlert, Sparkles, Terminal } from "lucide-react";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { CONSULT_DISCLAIMER, MODES } from "@/lib/ai/modes";
import { Composer } from "./composer";
import { Live } from "./live";
import { NeoMark } from "./marks";
import { Message } from "./message";
import { useConversation } from "./use-conversation";

const M = MODES.consult;

/** The voice above every answer on this surface. Deliberately not the library's. */
const WHO = "עוזר NEO";

const HINT = "Enter לשליחה · Shift+Enter לשורה חדשה";

/** Behaviours the endpoint has today. Each one is in MODES.consult. */
const DOES: string[] = M.capabilities;

/**
 * Limits, not disclaimers-for-show. Each line is verifiable in the code, see
 * the header note. This band is why the surface may exist before it is a real
 * site-wide assistant.
 */
const DOES_NOT = [
  "אין גישה חיה ל-SAP Help, ל-SAP Notes או ל-SAP Community",
  "אין חיבור למערכת SAP שלך ואין הרצה של דבר בתוכה",
  "נשלחת השאלה בלבד. נתוני הפרויקט אינם מצורפים לשיחה",
  "אין ניווט באתר ואין פתיחת מסכים מתוך השיחה",
];

export function GeneralChat() {
  // No scope picker on this surface, so `scope` is only ever the empty object
  // the hook starts with. It is still passed down, because ./message and ./live
  // take it and comparing an empty scope to an empty scope is what makes the
  // per-turn scope note correctly stay silent here.
  const {
    turns, scope, draft, setDraft, live, pending, busy,
    focusKey, focusComposer, send, stop, runAction, openSource,
    newConversation, endRef,
  } = useConversation("consult");

  const idle = !turns.length && !pending;
  const markState = pending ? (live?.preview ? "writing" : "thinking") : "idle";

  return (
    <div className="nxq nxg" data-surface="general">
      <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />

      {/* A console strip, not the library's hero. The two screens are meant to
          be told apart before a single word is read. */}
      <header className="nxg-head">
        <span className="nxg-head-mark">
          <NeoMark size={44} state={markState} />
        </span>
        <div className="nxg-head-text nm-rise nm-once">
          <span className="nxq-eyebrow">
            <Terminal size={13} strokeWidth={2} aria-hidden="true" />
            עוזר כללי · אינו משטח הספרייה
          </span>
          <h1 className="nxq-h1">צ׳אט NEO</h1>
          <p className="nxq-lede">{M.tagline}</p>
        </div>
        {turns.length ? (
          <div className="nxg-head-acts">
            <span className="nxq-hero-count">
              {turns.length === 1 ? "שאלה אחת בשיחה" : `${turns.length} שאלות בשיחה`}
            </span>
            <button type="button" className="nu-btn2 nxq-hero-b" onClick={newConversation}>
              <MessageSquarePlus size={14} strokeWidth={2} aria-hidden="true" />
              שיחה חדשה
            </button>
          </div>
        ) : null}
      </header>

      {/* The standing note. The library surface states its scope here; this one
          states that it has none, which is the honest counterpart. */}
      <div className="nxg-note">
        <ShieldAlert size={14} strokeWidth={2} aria-hidden="true" />
        <span>{CONSULT_DISCLAIMER}</span>
      </div>

      <div className="nxq-thread">
        {idle ? (
          <Intro onPick={(q) => { setDraft(q); focusComposer(); }} />
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
            scope={scope}
            mode="consult"
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
            scope={scope}
            mode="consult"
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
        placeholder="שאל את עוזר NEO על SAP…"
        hint={HINT}
        autoFocusKey={focusKey}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/** The empty state: what it is, what it is not, and four real starting points. */
function Intro({ onPick }: { onPick: (q: string) => void }) {
  return (
    <section className="nxg-intro" aria-label="על המשטח הזה">
      <div className="nxg-intro-top">
        <NeoMark size={68} className="nxg-intro-mark" />
        <div>
          <h2 className="nxg-intro-h">{WHO}</h2>
          <p className="nxg-intro-p">
            שיחה כללית על SAP. המשטח הזה אינו מוגבל לספרי הפרויקט ואינו מבטיח ציטוט מהם:
            כשמצורפים מקורות הם מוצגים תחת התשובה, וכשאין, התשובה מסומנת כידע כללי.
            לשאלה על החומר שבספרים יש מסך נפרד, «שאל את הספרייה».
          </p>
        </div>
      </div>

      <div className="nxg-cols nm-seq">
        <div className="nxg-col nm-rise nm-once" data-tone="does">
          <h3 className="nxg-col-h">מה יש כאן היום</h3>
          <ul className="nxg-col-list">
            {DOES.map((d) => (
              <li key={d} className="nxg-col-i">
                <Check size={14} strokeWidth={2.4} aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div className="nxg-col nm-rise nm-once" data-tone="not" style={{ "--nm-i": 1 } as React.CSSProperties}>
          <h3 className="nxg-col-h">מה אין כאן</h3>
          <ul className="nxg-col-list">
            {DOES_NOT.map((d) => (
              <li key={d} className="nxg-col-i">
                <Minus size={14} strokeWidth={2.4} aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="nxq-starters">
        <span className="nxq-starters-t">
          <Sparkles size={13} strokeWidth={2} aria-hidden="true" />
          אפשר להתחיל מ
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
