"use client";
// THE single AI surface for SAP Project NEO.
// Used on every page. There is no second chat system.
//
//   <AskAI />                                  global (app-shell)
//   <AskAI variant="inline" />                 embedded in a page
//   <AskAI scope={{bookId,chapter,section}} />  book reader
//
// Talks only to our own API. No provider, model or routing detail reaches the
// browser. Context is derived from the route — the user never states it.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Sparkles, X, Send, ExternalLink } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAiContext, type AiContext } from "@/lib/ai-context";
import { useBookScope, scopeLabel, type ScopeMode } from "@/lib/use-book-scope";
import { findLinks } from "@/lib/ai-links";
import { knownRoutes } from "@/lib/ai-known-routes";

const API = process.env.NEXT_PUBLIC_BOOKS_API_URL || "https://sap-books-api.vercel.app/api/ask";
const CREDIT_MSG = "שירות ה-AI אינו זמין כרגע. ניתן להמשיך להשתמש בשאר מאגר הידע ולנסות שוב מאוחר יותר.";
const GENERIC_ERR = "אירעה שגיאה זמנית. נסה שוב בעוד רגע.";

export type Scope = { bookId?: string; chapter?: number; section?: string };
type Msg = { role: "user" | "ai"; text: string; sources?: string[] };

/** Quick actions offered per context — all map to existing task profiles. */
function actionsFor(c: AiContext): { label: string; task: string; q: string }[] {
  if (c.bookId) return [
    { label: "סכם את הפרק", task: "CHAPTER_SUMMARY", q: "סכם את הפרק הנוכחי באופן שיטתי." },
    { label: "הסבר בפשטות", task: "CONCEPT", q: "הסבר את הנושא בפשטות למי שחדש ב-SAP." },
    { label: "ECC מול S/4", task: "COMPARE_ECC_S4", q: "מה ההבדל בין ECC ל-S/4HANA בנושא הזה?" },
    { label: "נקודות מפתח", task: "BULLET_SUMMARY", q: "תן 10 נקודות מפתח." },
  ];
  if (c.subject) return [
    { label: "מה זה?", task: "SAP_QA", q: `הסבר מה זה ${c.subject.id} ומתי משתמשים בו.` },
    { label: "אובייקטים קשורים", task: "SAP_QA", q: `אילו טבלאות, טרנזקציות ואובייקטים קשורים ל-${c.subject.id}?` },
    { label: "דוגמה מעשית", task: "CONCEPT", q: `תן דוגמה מעשית לשימוש ב-${c.subject.id}.` },
    { label: "אבחון תקלות", task: "TROUBLESHOOT", q: `מה בודקים כאשר יש בעיה עם ${c.subject.id}?` },
  ];
  return [
    { label: "הסבר", task: "HEBREW_EXPLAIN", q: "הסבר את הנושא של העמוד הזה." },
    { label: "סכם", task: "EXEC_SUMMARY", q: "תן תקציר מנהלים על הנושא." },
    { label: "תוכן קשור", task: "SAP_QA", q: "מה התוכן הקשור לנושא הזה?" },
  ];
}

/** Renders markdown-lite and linkifies SAP identifiers to existing NEO routes. */
function Answer({ text }: { text: string }) {
  // Route index is memoised inside knownRoutes(); this only reads it.
  const known = useMemo(() => knownRoutes(), []);
  const links = useMemo(() => findLinks(text, known.all, known.href), [text, known]);
  const map = new Map(links.map((l) => [l.text, l]));
  const render = (line: string, key: number) => {
    if (!links.length) return <span key={key}>{line}</span>;
    const re = new RegExp(`(${links.map((l) => l.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
    return (
      <span key={key}>
        {line.split(re).map((part, i) => {
          const hit = map.get(part);
          if (!hit) return part;
          return hit.external ? (
            <a key={i} href={hit.href} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-0.5 font-semibold text-brand hover:underline">
              {part}<ExternalLink className="size-3" />
            </a>
          ) : (
            <Link key={i} href={hit.href} className="font-semibold text-brand hover:underline">{part}</Link>
          );
        })}
      </span>
    );
  };
  return (
    <div className="space-y-1 text-sm leading-relaxed">
      {text.split("\n").map((raw, i) => {
        const l = raw.trim();
        if (!l) return <div key={i} className="h-1.5" />;
        if (/^#{1,3}\s/.test(l)) return <div key={i} className="mt-2 font-bold text-ink-1">{render(l.replace(/^#{1,3}\s/, ""), i)}</div>;
        if (/^[-*•]\s/.test(l)) return <div key={i} className="flex gap-2"><span className="text-brand">•</span>{render(l.replace(/^[-*•]\s/, ""), i)}</div>;
        return <div key={i}>{render(l, i)}</div>;
      })}
    </div>
  );
}

const SCOPE_MODES: { id: ScopeMode; label: string }[] = [
  { id: "section", label: "סעיף נוכחי" },
  { id: "chapter", label: "פרק נוכחי" },
  { id: "book", label: "הספר כולו" },
  { id: "library", label: "כל הספרייה" },
  { id: "free", label: "שאלה חופשית" },
];

export function AskAI({ variant = "floating", scope, bookId, className = "" }:
  { variant?: "floating" | "inline"; scope?: Scope; bookId?: string; className?: string }) {
  // Book scope is tracked read-only from the reader's own DOM anchors.
  const book = useBookScope(bookId || "", "chapter");
  const effectiveScope: Scope = bookId
    ? { bookId: book.scope.mode === "library" ? undefined : bookId,
        chapter: book.scope.chapter, section: book.scope.section }
    : (scope ?? {});
  const pathname = usePathname();
  const ctx = useAiContext(effectiveScope);
  const [open, setOpen] = useState(variant === "inline");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const askRef = useRef<((q: string, task?: string) => void) | null>(null);
  const actions = actionsFor(ctx);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, busy]);
  // Handoff from the command palette's AI tier: open and ask immediately.
  useEffect(() => {
    if (variant !== "floating") return;
    const onAsk = (e: Event) => {
      const question = String((e as CustomEvent).detail || "").trim();
      if (!question) return;
      setOpen(true);
      askRef.current?.(question);
    };
    window.addEventListener("neo:ask-ai", onAsk);
    return () => window.removeEventListener("neo:ask-ai", onAsk);
  }, [variant]);

  // ⌘K is the command palette; ⌘J opens AI so the two never collide.
  useEffect(() => {
    if (variant !== "floating") return;
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [variant]);

  const ask = useCallback(async (question: string, task?: string) => {
    const text = question.trim();
    if (!text || busy) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setQ(""); setBusy(true);
    try {
      // Context now travels as a structured, explicitly non-citable field.
      // The old preamble-in-the-question trick let page context read as part of
      // the user's words, which the backend could not tell apart from a claim.
      const pageContext = {
        module: ctx.module ?? null,
        subject: ctx.subject?.kind ?? null,
        identifier: ctx.subject?.id ?? null,
        title: ctx.label ?? null,
      };
      const r = await fetch(API, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: text,
          task: task || ctx.task,
          bookId: ctx.bookId, chapter: ctx.chapter, section: ctx.section,
          scope: book?.scope.mode ?? undefined,
          context: pageContext,
        }),
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok && data.answer) {
        const src = String(data.answer).match(/^SOURCES:\s*(.+)$/mi);
        setMsgs((m) => [...m, { role: "ai",
          text: String(data.answer).replace(/^SOURCES:.*$/mi, "").trim(),
          sources: src ? src[1].split(",").map((s: string) => s.trim()) : undefined }]);
      } else {
        setMsgs((m) => [...m, { role: "ai", text: data.error === "AI_UNAVAILABLE" ? CREDIT_MSG : GENERIC_ERR }]);
      }
    } catch { setMsgs((m) => [...m, { role: "ai", text: CREDIT_MSG }]); }
    finally { setBusy(false); }
  }, [busy, ctx]);
  useEffect(() => { askRef.current = ask; }, [ask]);

  const panel = (
    <div className={`flex flex-col ${variant === "floating" ? "h-[70vh]" : "h-[26rem]"}`}>
      <div className="flex items-center gap-2 border-b border-hairline px-3 py-2">
        <Sparkles className="size-4 text-brand" />
        <span className="text-sm font-bold text-ink-1">שאל את NEO</span>
        <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10.5px] font-semibold text-ink-3">{ctx.label}</span>
        {variant === "floating" && (
          <button onClick={() => setOpen(false)} aria-label="סגור" className="ms-auto text-ink-3 hover:text-ink-1">
            <X className="size-4" />
          </button>
        )}
      </div>
      {bookId && (
        <div className="flex flex-wrap items-center gap-1 border-b border-hairline bg-surface-2/40 px-3 py-2">
          <span className="me-1 text-[10.5px] font-bold text-ink-3">היקף:</span>
          {SCOPE_MODES.map((m) => (
            <button key={m.id} onClick={() => book.setMode(m.id)}
              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold transition ${
                book.mode === m.id ? "bg-brand text-white" : "border border-hairline bg-surface text-ink-3 hover:text-ink-1"}`}>
              {m.label}
            </button>
          ))}
          <span className="ms-auto text-[10.5px] text-ink-3">{scopeLabel(book.scope)}</span>
        </div>
      )}
      <div className="flex-1 space-y-3 overflow-y-auto p-3">
        {msgs.length === 0 && (
          <div className="space-y-2">
            <p className="text-xs text-ink-3">שאלות מהירות בהקשר הנוכחי:</p>
            <div className="flex flex-wrap gap-1.5">
              {actions.map((a) => (
                <button key={a.label} onClick={() => ask(a.q, a.task)}
                  className="rounded-full border border-hairline bg-surface px-2.5 py-1 text-xs font-semibold text-ink-2 transition hover:border-brand/40 hover:text-brand">
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-start" : "flex justify-end"}>
            <div className={`max-w-[88%] rounded-2xl px-3 py-2 ${m.role === "user"
              ? "bg-ink-1 text-white" : "border border-hairline bg-surface"}`}>
              {m.role === "user" ? <span className="text-sm">{m.text}</span> : <Answer text={m.text} />}
              {m.sources?.length ? (
                <div className="mt-2 flex flex-wrap gap-1">
                  {m.sources.map((s) => (
                    <span key={s} className="rounded-full bg-brand-soft px-2 py-0.5 text-[10.5px] font-semibold text-brand">📖 {s}</span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
        {busy && <div className="flex justify-end"><div className="rounded-2xl border border-hairline bg-surface px-3 py-2 text-xs text-ink-3">מחפש בידע של NEO…</div></div>}
        <div ref={endRef} />
      </div>
      <form onSubmit={(e) => { e.preventDefault(); ask(q); }} className="flex gap-2 border-t border-hairline p-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} disabled={busy}
          placeholder="שאל שאלה על מה שאתה רואה…"
          className="flex-1 rounded-xl border border-input bg-card px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/25 disabled:opacity-50" />
        <button type="submit" disabled={busy || !q.trim()} aria-label="שלח"
          className="grid size-9 place-items-center rounded-xl bg-brand text-white transition active:scale-95 disabled:opacity-50">
          <Send className="size-4 rtl:rotate-180" />
        </button>
      </form>
    </div>
  );

  if (variant === "inline") {
    return <div className={`overflow-hidden rounded-2xl border border-hairline bg-surface ${className}`}>{panel}</div>;
  }
  // A floating "ask AI" button on top of the Ask page announces that the product
  // has more than one AI surface. It does not belong on the dedicated ones.
  if (variant === "floating" && /^\/(ai|chat|copilot)(\/|$)/.test(pathname || "")) return null;

  return (
    <>
      {!open && (
        <button onClick={() => setOpen(true)} aria-label="שאל את NEO"
          className="fixed bottom-6 end-6 z-40 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-extrabold text-white shadow-[0_14px_34px_-12px_rgba(214,32,39,.6)] transition hover:bg-brand-dark">
          <Sparkles className="size-4" /> שאל את NEO
          <kbd className="hidden rounded bg-white/20 px-1 text-[10px] sm:inline">⌘J</kbd>
        </button>
      )}
      {open && (
        <div className={`fixed bottom-6 end-6 z-40 w-[min(30rem,calc(100vw-3rem))] overflow-hidden rounded-2xl border border-hairline bg-surface shadow-2xl ${className}`}>
          {panel}
        </div>
      )}
    </>
  );
}
export default AskAI;
