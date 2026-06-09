"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BookOpen, Bot, Send, Sparkles, User, Library, AlertTriangle, KeyRound } from "lucide-react";
import { streamGemini, geminiKey, saveGeminiKey, clearGeminiKey, keySource, MODELS, getModel, setModel, type ModelId, type ChatTurn } from "@/lib/gemini";
import { loadBook2, buildContext, type BookText } from "@/components/book-context";
import { useI18n } from "@/lib/i18n";
import { playPing, playTick } from "@/lib/sound";

interface Msg extends ChatTurn {
  id: number;
  pending?: boolean;
}

const SUGGESTIONS = [
  "מהי גרסת ייצור (Production Version) ומדוע היא חובה ב-S/4HANA?",
  "הסבר את הגדרת ה-Master Recipe והקשר ל-BOM ולמשאבים.",
  "אילו T-Codes משמשים לניהול אצוות (Batch Management)?",
  "כיצד מוגדר MRP Live ומה ההבדל מ-Classic MRP?",
];

function TypingDots() {
  return (
    <span className="inline-flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-brand"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </span>
  );
}

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
  const endRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  useEffect(() => {
    setHasKey(Boolean(geminiKey()));
    setSrc(keySource());
    setModelState(getModel());
    loadBook2().then(setBook).catch(() => setErr("load"));
  }, []);

  function pickModel(id: ModelId) {
    setModel(id);
    setModelState(id);
    setErr((e) => (e === "quota" ? null : e)); // changing engine clears the quota card
    playTick();
  }
  function changeScope(v: "all" | number) {
    setScope(v);
    setErr((e) => (e === "quota" ? null : e)); // changing context scope clears the quota card
  }

  function applyKey() {
    const k = keyInput.trim();
    if (!k) return;
    saveGeminiKey(k);
    setKeyInput("");
    setHasKey(true);
    setSrc(keySource());
    setErr(null);
    playPing();
  }
  function forgetKey() {
    clearGeminiKey();
    setHasKey(Boolean(geminiKey()));
    setSrc(keySource());
  }
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  async function send(q: string) {
    const question = q.trim();
    if (!question || busy || !book) return;
    setErr(null);
    playPing();
    const uid = ++idRef.current;
    const bid = ++idRef.current;
    setMsgs((m) => [...m, { id: uid, role: "user", text: question }, { id: bid, role: "model", text: "", pending: true }]);
    setInput("");
    setBusy(true);
    try {
      const history: ChatTurn[] = msgs.map((m) => ({ role: m.role, text: m.text }));
      const context = buildContext(book, scope);
      let first = true;
      let acc = "";
      for await (const chunk of streamGemini(question, context, history)) {
        acc += chunk;
        if (first) {
          playTick();
          first = false;
        }
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

  return (
    <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
      {/* Sidebar — notebook sources */}
      <aside className="glass h-fit rounded-2xl p-4">
        <p className="mb-3 flex items-center gap-2 text-sm font-bold">
          <Library className="size-4 text-brand" />
          {lang === "he" ? "מקור פעיל (Notebook)" : "Active source"}
        </p>
        <div className="space-y-2">
          <div className="rounded-xl border border-brand/40 bg-brand-soft/60 p-3">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-brand">
              <BookOpen className="size-4" />
              {lang === "he" ? "ספר 2 · תכנון ייצור" : "Book 2 · Production Planning"}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">PP / PP-PI · 1087 pages · {book ? book.chapters.length : "…"} ch</p>
          </div>
          {[
            lang === "he" ? "ספר 1 · אחזקת מפעל (PM)" : "Book 1 · Plant Maintenance",
            lang === "he" ? "ספר 5 · ניהול איכות (QM)" : "Book 5 · Quality Management",
          ].map((b) => (
            <div key={b} className="rounded-xl border border-border bg-card/50 p-3 text-xs text-muted-foreground">
              {b}
              <span className="ms-1 rounded bg-muted px-1 text-[10px]">{lang === "he" ? "בקרוב" : "soon"}</span>
            </div>
          ))}
        </div>

        {book && (
          <div className="mt-4">
            <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">
              {lang === "he" ? "היקף הקשר" : "Context scope"}
            </label>
            <select
              value={scope}
              onChange={(e) => changeScope(e.target.value === "all" ? "all" : Number(e.target.value))}
              className="w-full rounded-lg border border-input bg-card px-2 py-1.5 text-xs"
            >
              <option value="all">{lang === "he" ? "כל הספר (2M context)" : "Whole book (2M context)"}</option>
              {book.chapters.map((c) => (
                <option key={c.n} value={c.n}>
                  {c.n}. {c.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Model selector */}
        <div className="mt-4">
          <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">
            {lang === "he" ? "מנוע (Model)" : "Engine (model)"}
          </label>
          <div className="flex gap-1 rounded-xl bg-muted/50 p-1">
            {MODELS.map((m) => (
              <button
                key={m.id}
                onClick={() => pickModel(m.id)}
                className={`flex-1 rounded-lg px-2 py-1.5 text-[11px] font-semibold transition-colors ${
                  model === m.id ? "bg-gradient-to-br from-brand to-brand-dark text-brand-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* API key — frosted glass fallback (localStorage) */}
        <div className="mt-4 rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-md">
          <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold">
            <KeyRound className="size-3.5 text-brand" />
            {lang === "he" ? "מפתח Gemini API" : "Gemini API key"}
            {hasKey && (
              <span className="ms-auto rounded bg-status-done/15 px-1.5 text-[10px] font-semibold text-status-done">
                {src === "env" ? "ENV" : lang === "he" ? "מקומי" : "local"} ✓
              </span>
            )}
          </p>
          {hasKey ? (
            <button onClick={forgetKey} className="text-[10px] text-muted-foreground underline hover:text-foreground">
              {lang === "he" ? "החלף / מחק מפתח שמור" : "Replace / clear saved key"}
            </button>
          ) : (
            <>
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applyKey()}
                placeholder="AQ.Ab8…"
                dir="ltr"
                className="tech w-full rounded-lg border border-input bg-card/80 px-2 py-1.5 text-xs outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
              />
              <button
                onClick={applyKey}
                disabled={!keyInput.trim()}
                className="mt-2 w-full rounded-lg bg-gradient-to-br from-brand to-brand-dark py-1.5 text-xs font-semibold text-brand-foreground shadow-sm transition-all active:scale-95 disabled:opacity-50"
              >
                {lang === "he" ? "שמור והפעל" : "Save & enable"}
              </button>
              <p className="mt-1.5 text-[10px] leading-relaxed text-muted-foreground">
                {lang === "he"
                  ? "נשמר ב-localStorage בדפדפן זה בלבד. עדיף להגדיר NEXT_PUBLIC_GEMINI_API_KEY ב-.env.local ולהריץ מחדש את dev."
                  : "Saved to this browser's localStorage only. Preferably set NEXT_PUBLIC_GEMINI_API_KEY in .env.local and restart dev."}
              </p>
            </>
          )}
        </div>

        <p className="mt-3 text-[10px] leading-relaxed text-muted-foreground">
          {lang === "he"
            ? `מנוע: Google ${model}. תכונה מקוונת (דורשת אינטרנט). שאר הפורטל נשאר Offline.`
            : `Engine: Google ${model}. Online-only feature; the rest of the portal stays offline.`}
        </p>
      </aside>

      {/* Chat window */}
      <section className="glass flex h-[72vh] flex-col overflow-hidden rounded-2xl">
        <div className="flex items-center gap-2 border-b border-border/60 bg-gradient-to-l from-brand-dark/5 to-transparent px-4 py-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-brand-foreground shadow-lg shadow-brand/30">
            <Sparkles className="size-5" />
          </span>
          <div>
            <p className="text-sm font-bold">NEO Chat · NotebookLM</p>
            <p className="text-[11px] text-muted-foreground">
              {lang === "he" ? "שאל בעברית על תכנון הייצור — תשובות עם מקורות" : "Ask about Production Planning — answers with citations"}
            </p>
          </div>
        </div>

        {/* messages */}
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {!hasKey && (
            <div className="flex items-start gap-2 rounded-xl border border-status-in-analysis/30 bg-status-in-analysis/10 p-3 text-xs">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-status-in-analysis" />
              <div dir="rtl">
                <b>מפתח API חסר.</b> הוסף <code className="tech">NEXT_PUBLIC_GEMINI_API_KEY</code> לקובץ <code className="tech">.env.local</code> והפעל מחדש. (המפתח נחשף בצד-לקוח — השתמש במפתח חינמי מוגבל-דומיין.)
              </div>
            </div>
          )}

          {msgs.length === 0 && (
            <div className="mx-auto max-w-md py-8 text-center">
              <Bot className="mx-auto size-10 text-brand" />
              <p className="mt-2 text-sm text-muted-foreground">
                {lang === "he" ? "שאל שאלה טכנית על ספר 2 (תכנון ייצור)." : "Ask a technical question about Book 2."}
              </p>
              <div className="mt-4 grid gap-2 text-start">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    disabled={busy || !book || !hasKey}
                    dir="rtl"
                    className="rounded-xl border border-border bg-card/60 px-3 py-2 text-xs transition-colors hover:border-brand hover:bg-brand-soft/40 disabled:opacity-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence initial={false}>
            {msgs.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${
                    m.role === "user" ? "bg-muted text-foreground" : "bg-gradient-to-br from-brand to-brand-dark text-brand-foreground"
                  }`}
                >
                  {m.role === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
                </span>
                <div
                  dir="rtl"
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.role === "user" ? "bg-brand text-brand-foreground" : "glass"
                  }`}
                >
                  {m.pending ? (
                    <TypingDots />
                  ) : m.role === "model" ? (
                    <div className="prose-chat space-y-2 leading-relaxed">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.text}</ReactMarkdown>
                    </div>
                  ) : (
                    m.text
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {err === "quota" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              dir="rtl"
              className="glow rounded-2xl border border-status-in-analysis/40 bg-status-in-analysis/10 p-4 text-sm"
              style={{ "--glow": "var(--status-in-analysis)" } as React.CSSProperties}
            >
              <p className="flex items-center gap-2 font-bold text-status-in-analysis">
                <AlertTriangle className="size-4" />
                מכסת ה-API נחרגה (429)
              </p>
              <p className="mt-1.5 leading-relaxed">
                הקשר הספר גדול מדי עבור המפתח החינמי. אנא שנה את היקף ההקשר ב-Sidebar לפרק ספציפי.
              </p>
              <p className="mt-1.5 text-xs text-muted-foreground">
                טיפ: עבור ל-<b>2.0 Flash</b> ב-Sidebar (מכסה חינמית גבוהה בהרבה) כדי לשאול על מקטעים גדולים יותר.
              </p>
            </motion.div>
          )}
          {err && err !== "key" && err !== "quota" && err !== "load" && (
            <p className="rounded-lg bg-brand-soft p-2 text-center text-xs text-brand-dark" dir="rtl">
              שגיאה: {err}
            </p>
          )}
          <div ref={endRef} />
        </div>

        {/* input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-border/60 p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={lang === "he" ? "שאל שאלה על תכנון הייצור…" : "Ask about Production Planning…"}
            dir="rtl"
            disabled={busy || !hasKey}
            className="flex-1 rounded-xl border border-input bg-card px-4 py-2.5 text-sm shadow-sm outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/30 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={busy || !input.trim() || !hasKey}
            className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-brand-foreground shadow-lg shadow-brand/30 transition-all hover:shadow-brand/50 active:scale-95 disabled:opacity-50"
          >
            <Send className="size-4 rtl:rotate-180" />
          </button>
        </form>
      </section>
    </div>
  );
}
