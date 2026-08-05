"use client";

import Link from "next/link";
import {
  CheckSquare, GitCompare, HelpCircle, Image as ImageIcon, LayoutList,
  Presentation, Sparkles, Workflow, BookOpen, ArrowUpRight,
} from "lucide-react";
import { QUICK_ACTIONS } from "@/lib/ai/prompts";
import { bookById, cachedTree, sectionHref } from "@/lib/ai/tree";
import type { Answer, Scope } from "@/lib/ai/types";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  list: LayoutList, sparkles: Sparkles, workflow: Workflow, "git-compare": GitCompare,
  "check-square": CheckSquare, "help-circle": HelpCircle, presentation: Presentation, image: ImageIcon,
};

/**
 * Right rail: what the AI is currently reading, and what to do next.
 *
 * It reflects the active scope when idle and the latest answer once one exists,
 * so it always describes the thing on screen rather than a stale selection.
 */
export function ContextPanel({ scope, answer, onAction, onScope }: {
  scope: Scope;
  answer: Answer | null;
  onAction: (prompt: string) => void;
  onScope: (s: Scope) => void;
}) {
  const book = bookById(answer?.scope.bookId ?? scope.bookId);
  const tree = book ? cachedTree(book.id) : null;
  const activeChapterNo = answer?.scope.chapter ?? scope.chapter;
  const chapter = tree?.chapters.find((c) => c.n === activeChapterNo) ?? null;
  const related = tree?.chapters.filter((c) => c.n !== activeChapterNo).slice(0, 4) ?? [];

  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto p-3">
      <section className="overflow-hidden rounded-2xl border border-hairline bg-surface">
        {book ? (
          <>
            <div className="flex items-start gap-2.5 bg-gradient-to-bl from-brand to-brand-dark p-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/15 text-[11px] font-extrabold text-white">
                {book.module}
              </span>
              <span className="min-w-0">
                <span dir="auto" className="block text-[12.5px] font-extrabold leading-tight text-white">{book.title}</span>
                <span className="mt-1 block text-[10.5px] text-white/75">{book.chapters} פרקים · {book.sections} סעיפים</span>
              </span>
            </div>
            <div className="space-y-2 p-3">
              {chapter ? (
                <>
                  <div className="text-[10.5px] font-bold text-ink-3">הפרק הנוכחי</div>
                  <div className="text-[12.5px] font-semibold text-ink-1">פרק {chapter.n} · {chapter.t}</div>
                  <div className="text-[11px] text-ink-3">{chapter.sections.length} סעיפים בפרק</div>
                  <Link href={sectionHref(book.id, chapter.n)}
                    className="mt-1 inline-flex items-center gap-1 text-[11.5px] font-semibold text-brand hover:underline">
                    פתח בקורא <ArrowUpRight className="size-3" />
                  </Link>
                </>
              ) : (
                <p className="text-[11.5px] leading-relaxed text-ink-3">
                  נבחר הספר כולו. בחירת פרק או סעיף תמקד את התשובה ותקצר אותה.
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-start gap-2.5 p-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-2">
              <BookOpen className="size-4 text-ink-3" />
            </span>
            <p className="text-[11.5px] leading-relaxed text-ink-2">
              לא נבחר ספר. ה-AI יחפש בכל 11 הספרים — רחב יותר, אך פחות ממוקד.
            </p>
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-hairline bg-surface p-3">
        <div className="mb-2 text-[10.5px] font-bold text-ink-3">פעולות מהירות</div>
        <div className="grid grid-cols-2 gap-1.5">
          {QUICK_ACTIONS.map((a) => {
            const Icon = ICONS[a.icon] ?? Sparkles;
            const disabled = a.needsScope && !scope.bookId;
            return (
              <button
                key={a.id}
                onClick={() => !disabled && onAction(a.prompt)}
                disabled={disabled}
                title={disabled ? "בחר ספר או פרק כדי להשתמש בפעולה זו" : a.prompt}
                className={`flex items-center gap-1.5 rounded-xl border px-2 py-2 text-start text-[11px] font-semibold transition ${
                  disabled
                    ? "cursor-not-allowed border-hairline bg-surface-2/50 text-ink-3/60"
                    : "border-hairline bg-surface text-ink-2 hover:border-brand/40 hover:bg-brand-soft hover:text-brand"}`}>
                <Icon className="size-3.5 shrink-0" />
                <span className="truncate">{a.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {related.length > 0 && (
        <section className="rounded-2xl border border-hairline bg-surface p-3">
          <div className="mb-2 text-[10.5px] font-bold text-ink-3">פרקים קשורים</div>
          <ul className="space-y-0.5">
            {related.map((c) => (
              <li key={c.n}>
                <button
                  onClick={() => onScope({ bookId: book!.id, chapter: c.n })}
                  className="flex w-full items-baseline gap-1.5 rounded-lg px-1.5 py-1.5 text-start transition hover:bg-surface-2">
                  <span className="shrink-0 font-mono text-[10px] text-ink-3">{c.n}</span>
                  <span dir="auto" className="truncate text-[11.5px] text-ink-2">{c.t}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
