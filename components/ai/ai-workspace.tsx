"use client";

import { useCallback, useEffect, useState } from "react";
import { Clock, Info, Layers, MessageSquarePlus, Pencil, Sparkles, Star, Trash2, X , Compass, Library, ShieldAlert} from "lucide-react";
import { ScopeTree } from "./scope-tree";
import { ScopePicker } from "./scope-picker";
import { WorkspaceRail } from "./workspace-rail";
import { AnswerCard } from "./answer-card";
import { Composer } from "./composer";
import { PageHeader, Reveal, PromptSuggestions, AIActionBar } from "@/components/neo";
import { MODES, CONSULT_DISCLAIMER, type AiMode } from "@/lib/ai/modes";
import { useDialog } from "@/lib/use-dialog";
import {
  type Thread, loadThreads, saveThread, deleteThread, renameThread, toggleFavorite,
  loadScope, saveScope, loadActiveId, saveActiveId, titleFrom,
} from "@/lib/ai/history";
import { AIConversation, AIThinking, UserBubble } from "@/components/neo/ai-ui";
import { ANSWER_ACTIONS, SUGGESTED } from "@/lib/ai/prompts";
import { askApiStream } from "@/lib/ai/client";
import { loadTree, scopeLabel } from "@/lib/ai/tree";
import type { Answer, Scope } from "@/lib/ai/types";

type Turn = { q: string; a: Answer | null };

/**
 * The AI workspace.
 *
 * Desktop is three columns: scope, conversation, context. Below xl the rails
 * become sheets, because a 260px tree beside a chat on a tablet leaves neither
 * usable. Layout is driven by CSS breakpoints rather than JS measurement so
 * there is no first-paint jump.
 *
 * Answers currently come from a mock that mirrors the /api/ask-v2 contract.
 */
export function AiWorkspace({ mode = "library" }: { mode?: AiMode }) {
  const M = MODES[mode];
  const [scope, setScope] = useState<Scope>({});
  const [threads, setThreads] = useState<Thread[]>([]);
  const [threadId, setThreadId] = useState<string>("");
  const [showHistory, setShowHistory] = useState(false);
  const [draft, setDraft] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  // Ungated text for the in-flight answer. Never persisted, never exported.
  const [preview, setPreview] = useState("");
  /**
   * The action that produced the answer being generated. "בנה מצגת" must open
   * the presentation, not merely return a diagram and leave the user to find
   * the toolbar — an action that stops one step short of its own name is the
   * placeholder this audit was meant to remove.
   */
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [autoPresentFor, setAutoPresentFor] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const [sheet, setSheet] = useState<null | "scope" | "context">(null);

  // Warm the tree for the selected book so citations and the right rail can
  // resolve real chapter titles without a visible gap.
  useEffect(() => { if (scope.bookId) void loadTree(scope.bookId); }, [scope.bookId]);

  // A shared link carries the scope it was asked in, and the question. Honour it
  // before falling back to whatever was last saved, so opening someone else's
  // link lands where they were rather than where you were.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search);
    const book = p.get("book");
    const q = p.get("q");
    if (!book && !q) return;
    if (book) {
      const ch = p.get("ch");
      setScope({
        bookId: book,
        chapter: ch != null ? Number(ch) : undefined,
        section: p.get("sec") || undefined,
      });
    }
    if (q) setDraft(q);
    // Drop the params so a refresh does not re-apply them over later work.
    window.history.replaceState({}, "", "/ai/");
  }, []);

  // Restore on mount. localStorage is read in an effect, never during render,
  // because this page prerenders at build under output:"export".
  useEffect(() => {
    setThreads(loadThreads(mode));
    const saved = loadScope(mode);
    if (saved.bookId) setScope(saved);
    const active = loadActiveId(mode);
    if (active) {
      const t = loadThreads(mode).find((x) => x.id === active);
      if (t) { setThreadId(t.id); setTurns(t.turns); }
    }
  }, []);

  useEffect(() => { saveScope(mode, scope); }, [scope]);


  // Escape, focus trap, focus restore and scroll lock all live in one place.
  const sheetRef = useDialog<HTMLDivElement>(Boolean(sheet), () => setSheet(null));

  const ask = useCallback(async (question: string, task?: string, actionId?: string) => {
    const q = question.trim();
    if (!q || busy) return;
    setDraft("");
    setBusy(true);
    setTurns((t) => [...t, { q, a: null }]);
    setRecent((r) => [q, ...r.filter((x) => x !== q)].slice(0, 8));
    try {
      // Streamed. `preview` is ungated text shown while the answer is written;
      // the Answer that lands in state comes from the validated `done` payload,
      // so text the gates reject never survives on screen.
      setPendingAction(actionId ?? null);
      setPreview("");
      const a = await askApiStream(
        q, scope, task ?? M.task,
        { onDelta: (t) => setPreview((p) => p + t) },
        undefined,
        mode,
      );
      // Only when the action was "build a presentation" AND a diagram actually
      // arrived. A prose answer opens nothing rather than an empty stage.
      if (pendingAction === "deck" && /```\s*(flowchart|graph|mermaid|timeline|swimlane|bpmn|sequence|gantt)/i.test(a.text)) {
        setAutoPresentFor(a.id);
      }
      setTurns((t) => {
        const next = t.map((turn, i) => (i === t.length - 1 ? { ...turn, a } : turn));
        const id = threadId || `t${Date.now()}`;
        if (!threadId) { setThreadId(id); saveActiveId(mode, id); }
        const existing = loadThreads(mode).find((x) => x.id === id);
        saveThread(mode, {
          id,
          title: existing?.title || titleFrom(next[0]?.q || q),
          createdAt: existing?.createdAt ?? Date.now(),
          updatedAt: Date.now(),
          favorite: existing?.favorite,
          turns: next,
        });
        setThreads(loadThreads(mode));
        return next;
      });
    } finally {
      setPreview("");
      setBusy(false);
    }
  }, [busy, scope, threadId, mode, M.task, pendingAction]);

  const last = [...turns].reverse().find((t) => t.a)?.a ?? null;
  const empty = turns.length === 0;

  return (
    <>
    <a href="#ai-composer"
      className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:rounded-xl focus:bg-surface focus:px-3 focus:py-2 focus:text-sm focus:font-bold focus:text-brand focus:shadow-lg">
      דלג להקלדת שאלה
    </a>
    <Reveal>
      <PageHeader
        as="h1"
        icon={mode === "consult" ? <Compass className="size-5" /> : <Library className="size-5" />}
        eyebrow={mode === "consult" ? "SAP Expert · יועץ" : "Grounded Answers · ספרייה"}
        title={M.title}
        tint={M.accent}
      />
      <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-ink-3">{M.tagline}</p>
      {mode === "consult" && (
        // Stated on the surface itself, not buried in a tooltip. The difference
        // between "I know this" and "I checked this" is the reason the two
        // modes exist at all.
        <p className="mt-1.5 flex max-w-2xl items-start gap-1.5 text-[11.5px] leading-relaxed text-ink-3">
          <ShieldAlert className="mt-px size-3 shrink-0" aria-hidden />
          {CONSULT_DISCLAIMER}
        </p>
      )}
    </Reveal>
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[18rem_1fr] 2xl:grid-cols-[20rem_1fr]">
      {/* ---------- workspace rail ----------
          Scope picker and the request description share ONE column. They were
          split across the far left and far right, and the right column only
          appeared at 2xl — so on a 1440px laptop, which is most of them, the
          workspace was simply not on screen. */}
      <aside aria-label="סביבת העבודה"
        className="hidden min-h-0 lg:block">
        <div className="sticky top-24 max-h-[calc(100dvh-8rem)] overflow-y-auto rounded-3xl border border-hairline bg-surface shadow-[0_12px_34px_-22px_rgba(15,23,42,0.5)]">
          {/* The stepped picker is the library's entry point: two visible modes
              (whole library / one book) and a few clicks to a section. Consult
              keeps the tree it already had — this phase must not change it. */}
          {mode === "library"
            ? <ScopePicker scope={scope} onScope={setScope} />
            : <ScopeTree scope={scope} onScope={setScope} />}
          <WorkspaceRail scope={scope} answer={last} busy={busy} onScope={setScope} />
        </div>
      </aside>

      {/* ---------- conversation ---------- */}
      <section aria-label="שיחה" className="flex min-w-0 flex-col gap-6">
        <header className="flex items-center gap-2 rounded-3xl border border-hairline bg-surface px-3 py-2 shadow-[0_12px_34px_-22px_rgba(15,23,42,0.5)]">
          <button onClick={() => setSheet("scope")} aria-label="בחר היקף"
            className="flex items-center gap-1.5 rounded-xl border border-hairline px-2 py-1.5 text-[11.5px] font-semibold text-ink-2 transition hover:text-brand lg:hidden">
            <Layers className="size-3.5" /> סביבת עבודה
          </button>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[12.5px] font-extrabold text-ink-1">שאל את הספרייה</div>
            <div className="truncate text-[10.5px] text-ink-3">{scopeLabel(scope)}</div>
          </div>
          {threads.length > 0 && (
            <button onClick={() => setShowHistory((v) => !v)} aria-expanded={showHistory}
              className="flex items-center gap-1 rounded-xl border border-hairline px-2 py-1.5 text-[11px] font-semibold text-ink-2 transition hover:border-brand/40 hover:text-brand">
              <Clock className="size-3.5" /> שיחות ({threads.length})
            </button>
          )}
          {turns.length > 0 && (
            <button onClick={() => { setTurns([]); setThreadId(""); saveActiveId(mode, ""); }}
              className="flex items-center gap-1 rounded-xl border border-hairline px-2 py-1.5 text-[11px] font-semibold text-ink-2 transition hover:border-brand/40 hover:text-brand">
              <MessageSquarePlus className="size-3.5" /> שיחה חדשה
            </button>
          )}
        </header>

        {showHistory && (
          <ThreadList
            threads={threads}
            activeId={threadId}
            onOpen={(t) => { setTurns(t.turns); setThreadId(t.id); saveActiveId(mode, t.id); setShowHistory(false); }}
            onRename={(id, title) => { renameThread(mode, id, title); setThreads(loadThreads(mode)); }}
            onFavorite={(id) => { toggleFavorite(mode, id); setThreads(loadThreads(mode)); }}
            onDelete={(id) => {
              deleteThread(mode, id);
              setThreads(loadThreads(mode));
              if (id === threadId) { setTurns([]); setThreadId(""); }
            }}
          />
        )}

        <div>
          <AIConversation busy={busy} autoScrollKey={turns.length}>
            {empty ? (
              <EmptyState onPick={(q) => ask(q)} scope={scope} mode={mode} />
            ) : (
              turns.map((t, i) => (
                <div key={i} className="space-y-2.5">
                  <UserBubble>{t.q}</UserBubble>
                  {t.a ? (
                    <>
                      <><span className="sr-only">תשובה: </span><AnswerCard mode={mode} autoPresent={autoPresentFor === t.a.id} answer={t.a} onRetry={() => ask(t.q)} isLatest={i === turns.length - 1} /></>
                      {!t.a.error && i === turns.length - 1 && !busy && (
                        <AnswerActionsBar onPick={(a) => ask(a.prompt, a.task, a.id)} />
                      )}
                      {t.a.followUps.length > 0 && !t.a.error && i === turns.length - 1 && !busy && (
                        <PromptSuggestions
                          items={t.a.followUps}
                          onPick={(q) => ask(q)}
                          title="שאלות המשך"
                          icon={<Sparkles className="size-3" />}
                        />
                      )}
                    </>
                  ) : preview ? (
                    // Live preview. Rendered as plain text, NOT through
                    // AnswerBody: half a table or an unclosed diagram fence
                    // would be parsed as broken markup, and the parser that
                    // once hung the page did so on exactly that input.
                    <div className="border-s-2 border-brand/15 ps-3.5 sm:ps-4" aria-live="polite">
                      <p className="max-w-[74ch] whitespace-pre-wrap text-[0.9375rem] leading-[1.85] text-ink-2">
                        {/* Markers are stripped from the preview: they are only
                            meaningful once the citation list exists, and a raw
                            "[[book1#3#3.2]]" mid-sentence reads as corruption. */}
                        {preview.replace(/\s*\[\[[^\]]{1,120}\]\]/g, "")}
                        <span aria-hidden className="ms-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] bg-brand/60 motion-safe:animate-[caret_1s_steps(2)_infinite]" />
                      </p>
                    </div>
                  ) : (
                    <AIThinking note={scopeLabel(scope)} />
                  )}
                </div>
              ))
            )}
            </AIConversation>
        </div>

        <div id="ai-composer" className="sticky bottom-4">
          <div className="mx-auto w-full max-w-[48rem]">
            <Composer
              value={draft}
              onChange={setDraft}
              onSend={() => ask(draft)}
              busy={busy}
              scope={scope}
              onOpenScope={() => setSheet("scope")}
              recent={recent}
              onPickRecent={(q) => setDraft(q)}
            />
          </div>
        </div>
      </section>

      {/* ---------- mobile sheets ---------- */}
      {sheet && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-labelledby="ai-sheet-title">
          <div aria-hidden onClick={() => setSheet(null)}
            className="absolute inset-0 bg-ink-1/40 backdrop-blur-[2px] animate-[fadeIn_.15s_ease-out]" />
          <div ref={sheetRef} tabIndex={-1} className="absolute inset-x-0 bottom-0 flex max-h-[86vh] flex-col rounded-t-3xl border-t border-hairline bg-surface shadow-2xl outline-none animate-[sheetUp_.22s_cubic-bezier(.32,.72,0,1)]">
            <div className="flex items-center gap-2 border-b border-hairline px-3 py-2.5">
              <span id="ai-sheet-title" className="text-[12.5px] font-extrabold text-ink-1">
                {sheet === "scope" ? "היקף התשובה" : "מידע והקשר"}
              </span>
              <button onClick={() => setSheet(null)} aria-label="סגור"
                className="ms-auto flex size-8 items-center justify-center rounded-lg text-ink-3 transition hover:bg-surface-2 hover:text-ink-1">
                <X className="size-4" />
              </button>
            </div>
            {/* The same column the desktop layout shows, so the sheet is not a
                reduced version of the workspace — it is the workspace. There is
                only one trigger now, so splitting these across two sheet modes
                would leave the rail unreachable on a phone. */}
            <div className="min-h-0 flex-1 overflow-y-auto">
              {mode === "library"
                ? <ScopePicker scope={scope} onScope={setScope} onDone={() => setSheet(null)} />
                : <ScopeTree scope={scope} onScope={setScope} onNavigate={() => setSheet(null)} />}
              <WorkspaceRail scope={scope} answer={last} busy={busy} onScope={setScope} />
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}


/**
 * Answer-level actions. Four primaries stay visible; the rest sit behind
 * "עוד פעולות" so the answer is followed by a decision, not a control panel.
 */
/** Recent conversations: open, rename, favourite, delete. */
function ThreadList({ threads, activeId, onOpen, onRename, onFavorite, onDelete }: {
  threads: Thread[]; activeId: string;
  onOpen: (t: Thread) => void;
  onRename: (id: string, title: string) => void;
  onFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState("");

  return (
    <div className="rounded-3xl border border-hairline bg-surface p-4 shadow-[0_12px_34px_-22px_rgba(15,23,42,0.5)] sm:p-5">
      <div className="mb-2.5 flex items-center gap-2.5">
        <span aria-hidden className="h-4 w-1 rounded-full bg-brand" />
        <h3 className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-ink-2">שיחות אחרונות</h3>
        <span aria-hidden className="h-px flex-1 bg-hairline" />
      </div>
      <ul className="divide-y divide-hairline">
        {threads.map((t) => (
          <li key={t.id} className="flex items-center gap-2 py-2">
            {editing === t.id ? (
              <input
                autoFocus
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                onBlur={() => { onRename(t.id, draftTitle); setEditing(null); }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") { onRename(t.id, draftTitle); setEditing(null); }
                  if (e.key === "Escape") setEditing(null);
                }}
                aria-label="שם השיחה"
                className="min-w-0 flex-1 rounded-lg border border-hairline bg-surface px-2 py-1 text-[12.5px] text-ink-1 outline-none focus:border-brand/40"
              />
            ) : (
              <button onClick={() => onOpen(t)}
                aria-current={t.id === activeId ? "true" : undefined}
                className={`min-w-0 flex-1 truncate rounded-lg px-2 py-1 text-start text-[12.5px] transition hover:bg-surface-2 ${
                  t.id === activeId ? "font-bold text-brand" : "text-ink-2"}`}>
                {t.title}
                <span className="ms-2 text-[10.5px] font-normal text-ink-3">{t.turns.length} תשובות</span>
              </button>
            )}
            <button onClick={() => onFavorite(t.id)} aria-label={t.favorite ? "הסר ממועדפים" : "הוסף למועדפים"}
              aria-pressed={Boolean(t.favorite)}
              className="rounded-lg p-1.5 text-ink-3 transition hover:bg-surface-2 hover:text-brand">
              <Star className={`size-3.5 ${t.favorite ? "fill-brand text-brand" : ""}`} />
            </button>
            <button onClick={() => { setEditing(t.id); setDraftTitle(t.title); }} aria-label="שנה שם"
              className="rounded-lg p-1.5 text-ink-3 transition hover:bg-surface-2 hover:text-ink-1">
              <Pencil className="size-3.5" />
            </button>
            <button onClick={() => onDelete(t.id)} aria-label="מחק שיחה"
              className="rounded-lg p-1.5 text-ink-3 transition hover:bg-surface-2 hover:text-brand">
              <Trash2 className="size-3.5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AnswerActionsBar({ onPick }: { onPick: (a: typeof ANSWER_ACTIONS[number]) => void }) {
  const [all, setAll] = useState(false);
  return (
    <AIActionBar
      actions={ANSWER_ACTIONS}
      primaryIds={ANSWER_ACTIONS.filter((a) => a.primary).map((a) => a.id)}
      onPick={onPick}
      expanded={all}
      onToggle={() => setAll((v) => !v)}
    />
  );
}

function EmptyState({ onPick, scope, mode }: { onPick: (q: string) => void; scope: Scope; mode: AiMode }) {
  const M = MODES[mode];
  return (
    <div className="pt-6 text-center">
      <span className="mx-auto flex size-12 items-center justify-center rounded-2xl"
        style={{ background: `${M.accent}14` }}>
        {mode === "consult"
          ? <Compass className="size-5" style={{ color: M.accent }} />
          : <Library className="size-5" style={{ color: M.accent }} />}
      </span>
      <h2 className="mt-3 text-[16px] font-extrabold text-ink-1">{M.title}</h2>
      {/* The promise IS the difference between the two surfaces, so it is the
          first thing on an empty page rather than a generic greeting. */}
      <p className="mx-auto mt-1.5 max-w-md text-[12.5px] leading-relaxed text-ink-3">
        {M.promise}
        {mode === "library" && !scope.bookId && " בחירת ספר או פרק תמקד את התשובה."}
      </p>

      <ul className="mx-auto mt-4 flex max-w-lg flex-wrap items-center justify-center gap-1.5">
        {M.capabilities.map((c) => (
          <li key={c} className="rounded-lg px-2 py-1 text-[11px] font-semibold"
            style={{ background: `${M.accent}12`, color: M.accent }}>
            {c}
          </li>
        ))}
      </ul>

      <div className="mt-5 text-start">
        <PromptSuggestions items={M.starters.map((x) => x.prompt)} onPick={onPick} title="נסה להתחיל מ" icon={<Sparkles className="size-3" />} />
      </div>
    </div>
  );
}
