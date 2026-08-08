"use client";

/**
 * The AI workspace rail.
 *
 * Replaces the legacy chat sidebar, which was three stacked cards ending in a
 * field that asked the user to paste a Gemini API key into the browser. The key
 * is gone entirely — answers are generated server-side and the browser never
 * holds a credential — so what is left is a description of the CURRENT REQUEST:
 * what will be searched, by which model, with how much room.
 *
 * Every value shown here is read from real state. Nothing is decorative, and
 * nothing claims a capability the product does not have: attachments and the
 * provider choice are shown as unavailable rather than as empty affordances,
 * because a control that looks live and does nothing is worse than an absence.
 */

import { useState } from "react";
import {
  BookOpen, ChevronDown, Cpu, Gauge, Layers, Lock, MessageSquare,
  Paperclip, Server, SlidersHorizontal, Sparkles,
} from "lucide-react";
import type { Answer, Scope } from "@/lib/ai/types";
import { bookById } from "@/lib/ai/tree";
import { BOOK_IDENTITY } from "@/lib/book-identity";

/* ------------------------------------------------------------------ atoms */

/** One labelled group. The rail's only structural unit, so spacing stays even. */
function Group({ icon: Icon, title, children, action }: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="border-b border-hairline px-4 py-3.5 last:border-0">
      <header className="mb-2 flex items-center gap-1.5">
        <Icon className="size-3.5 text-ink-3" aria-hidden />
        <h3 className="text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-ink-3">{title}</h3>
        {action && <span className="ms-auto">{action}</span>}
      </header>
      {children}
    </section>
  );
}

/** A key/value line. Values are `.tech` so Latin identifiers stay LTR in RTL. */
function Row({ label, value, tone = "default" }: {
  label: string; value: React.ReactNode; tone?: "default" | "muted";
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-[3px]">
      <span className="shrink-0 text-[0.75rem] text-ink-3">{label}</span>
      <span className={`tech truncate text-[0.75rem] ${tone === "muted" ? "text-ink-3" : "font-semibold text-ink-1"}`}>
        {value}
      </span>
    </div>
  );
}

function Pill({ children, tone = "slate" }: { children: React.ReactNode; tone?: "slate" | "brand" | "muted" }) {
  const cls = tone === "brand" ? "bg-brand/10 text-brand"
    : tone === "muted" ? "bg-surface-2 text-ink-3"
    : "bg-surface-2 text-ink-2";
  return <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[0.6875rem] font-semibold ${cls}`}>{children}</span>;
}

/* ---------------------------------------------------------------- helpers */

/** What the current scope will actually search, in the user's words. */
function scopeSummary(scope: Scope): { label: string; detail: string } {
  if (scope.section) return { label: "סעיף", detail: scope.section };
  if (scope.chapter != null) return { label: "פרק", detail: `פרק ${scope.chapter}` };
  if (scope.bookId) return { label: "ספר", detail: "הספר כולו" };
  return { label: "הספרייה", detail: "כל הספרים" };
}

/* ------------------------------------------------------------------ rail */

export function WorkspaceRail({ scope, answer, busy, onScope }: {
  scope: Scope;
  answer: Answer | null;
  busy?: boolean;
  onScope?: (s: Scope) => void;
}) {
  const [advanced, setAdvanced] = useState(false);
  const book = scope.bookId ? bookById(scope.bookId) : null;
  const identity = scope.bookId ? BOOK_IDENTITY[scope.bookId] : null;
  const sum = scopeSummary(scope);

  // Only ever the passages the last answer actually cited — never a guess at
  // what "might" be used, which would misdescribe the next request too.
  const cited = answer?.citations ?? [];

  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto">
      {/* ------------------------------------------- active knowledge sources */}
      <Group icon={Layers} title="מקורות ידע פעילים"
        action={<Pill tone={scope.bookId ? "brand" : "slate"}>{sum.label}</Pill>}>
        <Row label="היקף החיפוש" value={sum.detail} />
        <Row label="ספרים בספרייה" value={String(Object.keys(BOOK_IDENTITY).length)} tone="muted" />
        {busy && <p className="mt-1.5 text-[0.6875rem] text-ink-3">מחפש במקורות…</p>}
      </Group>

      {/* ---------------------------------------------------- selected books */}
      <Group icon={BookOpen} title="ספרים נבחרים">
        {book ? (
          <div className="flex items-center gap-2">
            <span className="size-2 shrink-0 rounded-full" style={{ background: identity?.accent }} aria-hidden />
            <span className="truncate text-[0.75rem] font-semibold text-ink-1">{book.title}</span>
            {identity && <Pill tone="muted">{identity.module}</Pill>}
          </div>
        ) : (
          <p className="text-[0.75rem] text-ink-3">
            כל הספרים. בחירת ספר מצמצמת את החיפוש ומדייקת את ההפניות.
          </p>
        )}
        {scope.bookId && onScope && (
          <button onClick={() => onScope({})}
            className="mt-2 text-[0.6875rem] font-semibold text-brand transition hover:underline">
            נקה בחירה
          </button>
        )}
      </Group>

      {/* --------------------------------------------------- model / provider */}
      <Group icon={Cpu} title="מודל">
        <Row label="בשימוש בתשובה האחרונה" value={answer?.model ?? "—"} tone={answer?.model ? "default" : "muted"} />
        <p className="mt-1.5 text-[0.6875rem] leading-relaxed text-ink-3">
          המודל נבחר אוטומטית לפי סוג השאלה. אין צורך לבחור.
        </p>
      </Group>

      <Group icon={Server} title="ספק AI"
        action={<Pill tone="muted"><Lock className="me-1 size-2.5" />שרת</Pill>}>
        <p className="text-[0.6875rem] leading-relaxed text-ink-3">
          התשובות נוצרות בצד השרת. הדפדפן אינו מחזיק מפתחות גישה ואינו פונה לספק ישירות.
        </p>
      </Group>

      {/* ------------------------------------------- conversation + context */}
      <Group icon={MessageSquare} title="הגדרות שיחה">
        <Row label="הפניות בתשובה האחרונה" value={cited.length ? String(cited.length) : "—"}
          tone={cited.length ? "default" : "muted"} />
        <Row label="רמת ודאות" value={
          answer ? (answer.policy === "FULL" ? "מבוססת" : answer.policy === "PARTIAL" ? "חלקית" : "ללא בסיס") : "—"
        } tone={answer ? "default" : "muted"} />
      </Group>

      <Group icon={Gauge} title="חלון הקשר">
        <Row label="קטעים שנשלפו" value={answer ? String(cited.length || "—") : "—"} tone="muted" />
        <p className="mt-1.5 text-[0.6875rem] leading-relaxed text-ink-3">
          שאלה ממוקדת מחזירה פחות קטעים ותשובה מהירה יותר.
        </p>
      </Group>

      {/* ---------------------------------------------------- attachments */}
      <Group icon={Paperclip} title="קבצים מצורפים">
        <p className="text-[0.6875rem] leading-relaxed text-ink-3">
          לא נתמך. התשובות מבוססות על ספריית הידע בלבד, כדי שכל טענה תהיה ניתנת להפניה.
        </p>
      </Group>

      {/* ------------------------------------------------------- advanced */}
      <section className="px-4 py-3.5">
        <button
          onClick={() => setAdvanced((v) => !v)}
          aria-expanded={advanced}
          className="flex w-full items-center gap-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-ink-3 transition hover:text-ink-2"
        >
          <SlidersHorizontal className="size-3.5" aria-hidden />
          אפשרויות מתקדמות
          <ChevronDown className={`ms-auto size-3.5 transition-transform ${advanced ? "rotate-180" : ""}`} aria-hidden />
        </button>
        {advanced && (
          <div className="mt-2.5 space-y-2.5">
            <div>
              <Row label="שפת התשובה" value="עברית" tone="muted" />
              <Row label="ביסוס על מקורות" value="נאכף" tone="muted" />
              <Row label="הזרמת תשובה" value="פעילה" tone="muted" />
            </div>
            <p className="text-[0.6875rem] leading-relaxed text-ink-3">
              <Sparkles className="me-1 inline size-3" aria-hidden />
              תשובה שלא עברה אימות מקורות מוחלפת בהודעה, ולא מוצגת כתשובה מבוססת.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
