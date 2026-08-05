"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Info, Layers, MessageSquarePlus, Sparkles, X } from "lucide-react";
import { ScopeTree } from "./scope-tree";
import { AnswerCard } from "./answer-card";
import { Composer, QuestionChips } from "./composer";
import { ContextPanel } from "./context-panel";
import { SUGGESTED } from "@/lib/ai/prompts";
import { askApi } from "@/lib/ai/client";
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
export function AiWorkspace() {
  const [scope, setScope] = useState<Scope>({});
  const [draft, setDraft] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const [sheet, setSheet] = useState<null | "scope" | "context">(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Warm the tree for the selected book so citations and the right rail can
  // resolve real chapter titles without a visible gap.
  useEffect(() => { if (scope.bookId) void loadTree(scope.bookId); }, [scope.bookId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns.length, busy]);

  useEffect(() => {
    if (!sheet) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setSheet(null);
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [sheet]);

  const ask = useCallback(async (question: string) => {
    const q = question.trim();
    if (!q || busy) return;
    setDraft("");
    setBusy(true);
    setTurns((t) => [...t, { q, a: null }]);
    setRecent((r) => [q, ...r.filter((x) => x !== q)].slice(0, 8));
    try {
      const a = await askApi(q, scope);
      setTurns((t) => t.map((turn, i) => (i === t.length - 1 ? { ...turn, a } : turn)));
    } finally {
      setBusy(false);
    }
  }, [busy, scope]);

  const last = [...turns].reverse().find((t) => t.a)?.a ?? null;
  const empty = turns.length === 0;

  return (
    <>
    <header className="mb-4">
      <div className="flex items-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-xl bg-brand-soft">
          <Sparkles className="size-4 text-brand" />
        </span>
        <div className="min-w-0">
          <h1 className="text-[19px] font-extrabold leading-tight text-ink-1">שאל את הספרייה</h1>
          <p className="mt-0.5 text-[12px] text-ink-3">
            תשובות מבוססות אך ורק על 11 הספרים שבמאגר, עם הפניה לפרק ולסעיף המדויק
          </p>
        </div>
      </div>
    </header>
    <div className="grid h-[calc(100vh-11rem)] max-h-[52rem] min-h-[34rem] grid-cols-1 overflow-hidden rounded-2xl border border-hairline bg-surface shadow-[0_10px_30px_-24px_rgba(15,23,42,.45)] xl:grid-cols-[268px_1fr_320px]">
      {/* ---------- scope rail ---------- */}
      <aside className="hidden min-h-0 border-e border-hairline bg-surface xl:block">
        <ScopeTree scope={scope} onScope={setScope} />
      </aside>

      {/* ---------- conversation ---------- */}
      <section className="flex min-h-0 min-w-0 flex-col bg-surface-2/30">
        <header className="flex items-center gap-2 border-b border-hairline bg-surface/90 px-3 py-2 backdrop-blur-md">
          <button onClick={() => setSheet("scope")} aria-label="בחר היקף"
            className="flex items-center gap-1.5 rounded-xl border border-hairline px-2 py-1.5 text-[11.5px] font-semibold text-ink-2 transition hover:text-brand xl:hidden">
            <Layers className="size-3.5" /> היקף
          </button>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[12.5px] font-extrabold text-ink-1">שאל את הספרייה</div>
            <div className="truncate text-[10.5px] text-ink-3">{scopeLabel(scope)}</div>
          </div>
          {turns.length > 0 && (
            <button onClick={() => setTurns([])}
              className="flex items-center gap-1 rounded-xl border border-hairline px-2 py-1.5 text-[11px] font-semibold text-ink-2 transition hover:border-brand/40 hover:text-brand">
              <MessageSquarePlus className="size-3.5" /> שיחה חדשה
            </button>
          )}
          <button onClick={() => setSheet("context")} aria-label="מידע נוסף"
            className="flex items-center gap-1.5 rounded-xl border border-hairline px-2 py-1.5 text-[11.5px] font-semibold text-ink-2 transition hover:text-brand xl:hidden">
            <Info className="size-3.5" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
          <div className="mx-auto w-full max-w-[46rem] space-y-4">
            {empty ? (
              <EmptyState onPick={(q) => ask(q)} scope={scope} />
            ) : (
              turns.map((t, i) => (
                <div key={i} className="space-y-2.5">
                  <div className="flex justify-end">
                    <p className="max-w-[85%] rounded-2xl rounded-se-md bg-brand px-3.5 py-2 text-[13px] leading-relaxed text-white">
                      {t.q}
                    </p>
                  </div>
                  {t.a ? (
                    <>
                      <AnswerCard answer={t.a} onRetry={() => ask(t.q)} />
                      {t.a.followUps.length > 0 && !t.a.error && i === turns.length - 1 && !busy && (
                        <QuestionChips
                          items={t.a.followUps}
                          onPick={(q) => ask(q)}
                          title="שאלות המשך"
                          icon={<Sparkles className="size-3" />}
                        />
                      )}
                    </>
                  ) : (
                    <Thinking />
                  )}
                </div>
              ))
            )}
            <div ref={endRef} />
          </div>
        </div>

        <div className="border-t border-hairline bg-surface px-3 py-3">
          <div className="mx-auto w-full max-w-[46rem]">
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

      {/* ---------- context rail ---------- */}
      <aside className="hidden min-h-0 border-s border-hairline bg-surface xl:block">
        <ContextPanel scope={scope} answer={last} onAction={(p) => ask(p)} onScope={setScope} />
      </aside>

      {/* ---------- mobile sheets ---------- */}
      {sheet && (
        <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true">
          <button aria-label="סגור" onClick={() => setSheet(null)}
            className="absolute inset-0 bg-ink-1/40 backdrop-blur-[2px] animate-[fadeIn_.15s_ease-out]" />
          <div className="absolute inset-x-0 bottom-0 flex max-h-[86vh] flex-col rounded-t-3xl border-t border-hairline bg-surface shadow-2xl animate-[sheetUp_.22s_cubic-bezier(.32,.72,0,1)]">
            <div className="flex items-center gap-2 border-b border-hairline px-3 py-2.5">
              <span className="text-[12.5px] font-extrabold text-ink-1">
                {sheet === "scope" ? "היקף התשובה" : "מידע והקשר"}
              </span>
              <button onClick={() => setSheet(null)} aria-label="סגור"
                className="ms-auto flex size-8 items-center justify-center rounded-lg text-ink-3 transition hover:bg-surface-2 hover:text-ink-1">
                <X className="size-4" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden">
              {sheet === "scope"
                ? <ScopeTree scope={scope} onScope={setScope} onNavigate={() => setSheet(null)} />
                : <ContextPanel scope={scope} answer={last} onAction={(p) => { setSheet(null); ask(p); }} onScope={setScope} />}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

function Thinking() {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-hairline bg-surface px-3.5 py-3">
      <Sparkles className="size-3.5 text-brand" />
      <span className="text-[12px] text-ink-3">קורא את המקורות…</span>
      <span className="ms-1 flex gap-1" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-1.5 animate-bounce rounded-full bg-brand/50"
            style={{ animationDelay: `${i * 120}ms`, animationDuration: "900ms" }} />
        ))}
      </span>
    </div>
  );
}

function EmptyState({ onPick, scope }: { onPick: (q: string) => void; scope: Scope }) {
  return (
    <div className="pt-6 text-center">
      <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-brand-soft">
        <Sparkles className="size-5 text-brand" />
      </span>
      <h2 className="mt-3 text-[16px] font-extrabold text-ink-1">שאל כל שאלה על הספרייה</h2>
      <p className="mx-auto mt-1.5 max-w-md text-[12.5px] leading-relaxed text-ink-3">
        התשובות מבוססות אך ורק על 11 הספרים שבמאגר, עם הפניה לפרק ולסעיף המדויק.
        {!scope.bookId && " בחירת ספר או פרק תמקד את התשובה."}
      </p>
      <div className="mt-5 text-start">
        <QuestionChips items={SUGGESTED} onPick={onPick} title="נסה להתחיל מ" icon={<Sparkles className="size-3" />} />
      </div>
    </div>
  );
}
