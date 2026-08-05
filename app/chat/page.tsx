"use client";

/**
 * AI Chat — the general SAP assistant.
 *
 * Not book-scoped: /ai/ answers from the library with citations; this answers
 * broadly from a loaded book context via Gemini. Same visual language, same
 * components, different engine — two modes of one product, not two apps.
 *
 * Engine logic (streaming, key handling, model switching, scope) is unchanged;
 * only the presentation was rebuilt onto the shared kit.
 */

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  BookOpen, Bot, KeyRound, Library, MessageSquare, Sparkles, TriangleAlert,
} from "lucide-react";
import {
  streamGemini, geminiKey, saveGeminiKey, clearGeminiKey, keySource,
  MODELS, getModel, setModel, type ModelId, type ChatTurn,
} from "@/lib/gemini";
import { loadBook2, buildContext, type BookText } from "@/components/book-context";
import { useI18n } from "@/lib/i18n";
import { playPing, playTick } from "@/lib/sound";
import {
  PageHeader, Panel, ShelfDivider, Reveal, EmptyState, ErrorState, PromptSuggestions,
} from "@/components/neo";
import {
  AIComposer, AIConversation, AIResponse, AIThinking, UserBubble,
} from "@/components/neo/ai-ui";
import { moduleColor } from "@/components/book-cover";

interface Msg extends ChatTurn { id: number; pending?: boolean }

const SUGGESTIONS = [
  "מהי גרסת ייצור (Production Version) ומדוע היא חובה ב-S/4HANA?",
  "הסבר את הגדרת ה-Master Recipe והקשר ל-BOM ולמשאבים.",
  "אילו T-Codes משמשים לניהול אצוות (Batch Management)?",
  "כיצד מוגדר MRP Live ומה ההבדל מ-Classic MRP?",
];

export default function ChatPage() {
  const { lang } = useI18n();
  const [book, setBook] = useState<BookText | null>(null);
  const [scope, setScope] = useState<"all" | number>("all");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState(false);
  const [src, setSrc] = useState<"env" | "local" | null>(null);
  const [keyInput, setKeyInput] = useState("");
  const [model, setModelState] = useState<ModelId>("gemini-2.5-pro");
  const idRef = useRef(0);

  useEffect(() => {
    setHasKey(Boolean(geminiKey()));
    setSrc(keySource());
    setModelState(getModel());
    loadBook2().then(setBook).catch(() => setErr("load"));
  }, []);

  function pickModel(id: ModelId) {
    setModel(id); setModelState(id);
    setErr((e) => (e === "quota" ? null : e));
    playTick();
  }
  function changeScope(v: "all" | number) {
    setScope(v);
    setErr((e) => (e === "quota" ? null : e));
  }
  function applyKey() {
    const k = keyInput.trim();
    if (!k) return;
    saveGeminiKey(k); setKeyInput(""); setHasKey(true); setSrc(keySource()); setErr(null); playPing();
  }
  function forgetKey() {
    clearGeminiKey(); setHasKey(Boolean(geminiKey())); setSrc(keySource());
  }

  async function send(q: string) {
    const question = q.trim();
    if (!question || busy || !book) return;
    setErr(null); playPing();
    const uid = ++idRef.current;
    const bid = ++idRef.current;
    setMsgs((m) => [...m, { id: uid, role: "user", text: question }, { id: bid, role: "model", text: "", pending: true }]);
    setInput(""); setBusy(true);
    try {
      const history: ChatTurn[] = msgs.map((m) => ({ role: m.role, text: m.text }));
      const context = buildContext(book, scope);
      let first = true;
      let acc = "";
      for await (const chunk of streamGemini(question, context, history)) {
        acc += chunk;
        if (first) { playTick(); first = false; }
        setMsgs((m) => m.map((x) => (x.id === bid ? { ...x, text: acc, pending: false } : x)));
      }
      if (!acc) throw new Error("Gemini returned an empty response (context too large or blocked).");
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setMsgs((m) => m.filter((x) => x.id !== bid));
      const isQuota = /\b429\b|quota|RESOURCE_EXHAUSTED|rate.?limit/i.test(msg);
      setErr(msg === "MISSING_KEY" ? "key" : isQuota ? "quota" : msg);
    } finally {
      setBusy(false);
    }
  }

  const he = lang === "he";
  const ppColor = moduleColor("PP");
  const modelLabel = MODELS.find((x) => x.id === model)?.label ?? model;

  return (
    <div className="space-y-9">
      <Reveal>
        <PageHeader
          as="h1"
          icon={<MessageSquare className="size-5" />}
          eyebrow="General SAP Assistant · עוזר SAP"
          title={he ? "צ'אט AI" : "AI Chat"}
        />
        <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-ink-3">
          {he
            ? "שאל כל שאלה על SAP — תהליכים, טרנזקציות, טבלאות, ארכיטקטורה ופתרון תקלות. לשאלות עם ציטוט מדויק מתוך הספרים, השתמש ב״שאל את הספרייה״."
            : "Ask anything about SAP — processes, transactions, tables, architecture and troubleshooting."}
        </p>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* ------------------------------ conversation ------------------------------ */}
        <Reveal>
          <div className="space-y-6">
            {msgs.length === 0 ? (
              <Panel padding="none" className="overflow-hidden">
                <EmptyState
                  icon={<Sparkles className="size-8" />}
                  title={he ? "שאל כל שאלה על SAP" : "Ask anything about SAP"}
                  hint={he
                    ? "העוזר עונה על סמך ההקשר הנטען. אפשר להתחיל מאחת השאלות למטה."
                    : "The assistant answers from the loaded context."}
                />
                <div className="border-t border-hairline p-4 sm:p-5">
                  <PromptSuggestions
                    items={SUGGESTIONS}
                    onPick={(q) => send(q)}
                    title={he ? "נסה להתחיל מ" : "Try starting with"}
                    icon={<Sparkles className="size-3" />}
                  />
                </div>
              </Panel>
            ) : (
              <AIConversation busy={busy} autoScrollKey={msgs.length}>
                {msgs.map((m) =>
                  m.role === "user" ? (
                    <UserBubble key={m.id}>{m.text}</UserBubble>
                  ) : m.pending && !m.text ? (
                    <AIThinking key={m.id} note={book ? `${book.chapters.length} ${he ? "פרקים בהקשר" : "chapters"}` : undefined} />
                  ) : (
                    <AIResponse
                      key={m.id}
                      header={
                        <>
                          <span className="grid size-5 place-items-center rounded-md bg-brand-soft">
                            <Bot className="size-3 text-brand" />
                          </span>
                          <span className="text-xs font-bold text-ink-1">{he ? "עוזר SAP" : "SAP Assistant"}</span>
                          <span className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] font-bold text-ink-3">{modelLabel}</span>
                        </>
                      }
                    >
                      <div className="prose-chat max-w-[74ch] text-[15px] leading-[1.85] text-ink-2">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.text}</ReactMarkdown>
                      </div>
                    </AIResponse>
                  ),
                )}
              </AIConversation>
            )}

            {err === "key" && (
              <ErrorState
                icon={<KeyRound className="size-3.5" />}
                message={he ? "נדרש מפתח Gemini כדי להשתמש בצ'אט. אפשר להוסיף אותו בלוח שבצד." : "A Gemini key is required. Add it in the side panel."}
              />
            )}
            {err === "quota" && (
              <ErrorState
                icon={<TriangleAlert className="size-3.5" />}
                message={he ? "המכסה של המנוע הנוכחי נוצלה. אפשר להחליף מנוע או לצמצם את היקף ההקשר." : "This engine's quota is used up. Switch engine or narrow the scope."}
                onRetry={() => setErr(null)}
              />
            )}
            {err && err !== "key" && err !== "quota" && (
              <ErrorState
                icon={<TriangleAlert className="size-3.5" />}
                message={he ? "אירעה שגיאה זמנית. נסה שוב בעוד רגע." : "A temporary error occurred. Try again shortly."}
                onRetry={() => setErr(null)}
              />
            )}

            <div className="sticky bottom-4">
              <AIComposer
                value={input}
                onChange={setInput}
                onSend={() => send(input)}
                busy={busy}
                disabled={!book}
                placeholder={he ? "שאל כל שאלה על SAP…" : "Ask anything about SAP…"}
                hint={he ? "Enter לשליחה · Shift+Enter לשורה חדשה" : "Enter to send · Shift+Enter for a new line"}
                slot={
                  <>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-2 py-1 text-[11px] font-semibold text-ink-2">
                      <BookOpen className="size-3" />
                      {scope === "all" ? (he ? "כל הספר" : "Whole book") : `${he ? "פרק" : "Ch"} ${scope}`}
                    </span>
                    <span className="text-[11px] text-ink-3">{modelLabel}</span>
                  </>
                }
              />
            </div>
          </div>
        </Reveal>

        {/* -------------------------------- context -------------------------------- */}
        <Reveal delay={0.05}>
          <aside aria-label={he ? "הקשר ומקורות" : "Context and sources"} className="space-y-6 lg:sticky lg:top-24">
            <Panel>
              <ShelfDivider label={he ? "מקור פעיל" : "Active source"} />
              <div className="mt-3 rounded-2xl border p-3" style={{ borderColor: `${ppColor}44`, background: `${ppColor}0d` }}>
                <p className="flex items-center gap-1.5 text-[12.5px] font-bold" style={{ color: ppColor }}>
                  <Library className="size-3.5" />
                  {he ? "תכנון ייצור · PP" : "Production Planning · PP"}
                </p>
                <p className="mt-0.5 text-[10.5px] font-semibold text-ink-3">
                  1087 {he ? "עמ׳" : "pages"} · {book ? book.chapters.length : "…"} {he ? "פרקים" : "chapters"}
                </p>
              </div>

              {book && (
                <div className="mt-4">
                  <label htmlFor="chat-scope" className="mb-1.5 block text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-3">
                    {he ? "היקף הקשר" : "Context scope"}
                  </label>
                  <select
                    id="chat-scope"
                    value={scope}
                    onChange={(e) => changeScope(e.target.value === "all" ? "all" : Number(e.target.value))}
                    className="w-full rounded-2xl border border-hairline bg-surface px-3 py-2.5 text-xs font-semibold text-ink-1 outline-none transition focus:border-brand/40 focus:ring-2 focus:ring-brand/15"
                  >
                    <option value="all">{he ? "כל הספר" : "Whole book"}</option>
                    {book.chapters.map((c) => (
                      <option key={c.n} value={c.n}>{c.n}. {c.title}</option>
                    ))}
                  </select>
                </div>
              )}
            </Panel>

            <Panel>
              <ShelfDivider label={he ? "מנוע" : "Engine"} />
              <div className="mt-3 flex flex-col gap-1.5">
                {MODELS.map((mm) => (
                  <button
                    key={mm.id}
                    onClick={() => pickModel(mm.id)}
                    aria-pressed={model === mm.id}
                    className={`rounded-2xl px-3 py-2.5 text-start text-xs font-bold transition active:scale-95 ${
                      model === mm.id
                        ? "bg-brand-soft text-brand ring-1 ring-brand/20"
                        : "bg-surface-2 text-ink-2 hover:text-ink-1"}`}
                  >
                    {mm.label}
                  </button>
                ))}
              </div>
            </Panel>

            <Panel>
              <ShelfDivider label={he ? "מפתח גישה" : "Access key"} />
              <div className="mt-3">
                {hasKey ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                      <KeyRound className="size-3" />
                      {src === "env" ? (he ? "מוגדר בשרת" : "Server") : (he ? "מוגדר בדפדפן" : "Browser")}
                    </span>
                    {src === "local" && (
                      <button onClick={forgetKey}
                        className="rounded-2xl px-2.5 py-1.5 text-[11px] font-bold text-ink-3 transition hover:text-brand active:scale-95">
                        {he ? "הסר" : "Remove"}
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-[11px] leading-relaxed text-ink-3">
                      {he ? "המפתח נשמר בדפדפן שלך בלבד." : "The key is stored in your browser only."}
                    </p>
                    <input
                      type="password"
                      value={keyInput}
                      onChange={(e) => setKeyInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && applyKey()}
                      placeholder={he ? "מפתח Gemini" : "Gemini key"}
                      aria-label={he ? "מפתח Gemini" : "Gemini key"}
                      className="w-full rounded-2xl border border-hairline bg-surface px-3 py-2.5 text-xs text-ink-1 outline-none transition focus:border-brand/40 focus:ring-2 focus:ring-brand/15"
                    />
                    <button onClick={applyKey}
                      className="w-full rounded-2xl bg-brand px-3 py-2.5 text-xs font-extrabold text-brand-foreground transition hover:brightness-110 active:scale-95">
                      {he ? "שמור" : "Save"}
                    </button>
                  </div>
                )}
              </div>
            </Panel>
          </aside>
        </Reveal>
      </div>
    </div>
  );
}
