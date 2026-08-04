"use client";

/**
 * "שאל את הספרים" — client chat over the 10 SAP books.
 * Calls the SEPARATE production Vercel function (grounded RAG) at runtime via fetch.
 * NEO stays 100% static/offline; only this screen talks to the external API.
 * No API key here — the key lives ONLY server-side in the function's env.
 * Additive — does not touch business code, data, or existing routes.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_BOOKS_API_URL || "https://sap-books-api.vercel.app/api/ask";

const CREDIT_MSG =
  "שירות ה-AI אינו זמין כרגע. ניתן להמשיך להשתמש בשאר מאגר הידע ולנסות שוב מאוחר יותר.";
const GENERIC_ERR = "אירעה שגיאה זמנית. נסה שוב בעוד רגע.";

type Msg = { role: "user" | "ai"; body: string; source?: string };

const SAMPLES = [
  "מה זה PP-DS ומתי משתמשים בו?",
  "איך מגדירים Plant Maintenance ב-S/4HANA?",
  "מה זה inspection lot ב-QM וכיצד מתקבל usage decision?",
  "מה ההבדל בין WM ל-EWM?",
];

// pull the "מקור: ..." line out of the answer so we can render it as a styled chip
function splitSource(text: string): { body: string; source?: string } {
  const lines = text.split("\n");
  let source: string | undefined;
  const kept: string[] = [];
  for (const l of lines) {
    const clean = l.replace(/\*/g, "").trim();
    if (/^מקור\s*[:：]/.test(clean)) source = clean.replace(/^מקור\s*[:：]\s*/, "");
    else if (l.trim() !== "---") kept.push(l);
  }
  return { body: kept.join("\n").trim(), source };
}

// tiny inline bold: **x** -> <strong>
function inline(s: string, key: number): React.ReactNode {
  const parts = s.split(/\*\*(.+?)\*\*/g);
  return <span key={key}>{parts.map((p, i) => (i % 2 ? <strong key={i}>{p}</strong> : p))}</span>;
}

// markdown-lite: headers (#), bullets (-), paragraphs
function RichAnswer({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div>
      {lines.map((raw, i) => {
        const l = raw.trim();
        if (!l) return <div key={i} style={{ height: 6 }} />;
        if (/^#{1,3}\s/.test(l))
          return <div key={i} style={{ fontWeight: 800, fontSize: 15, margin: "8px 0 4px", color: "#0f172a" }}>{inline(l.replace(/^#{1,3}\s/, ""), i)}</div>;
        if (/^[-•]\s/.test(l))
          return <div key={i} style={{ display: "flex", gap: 8, margin: "2px 0" }}><span style={{ color: "#d62027" }}>•</span><span>{inline(l.replace(/^[-•]\s/, ""), i)}</span></div>;
        return <div key={i} style={{ margin: "3px 0" }}>{inline(l, i)}</div>;
      })}
    </div>
  );
}

export default function AskTheBooks() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: 1e9, behavior: "smooth" });
  }, [msgs, busy]);

  async function ask(question: string) {
    const text = question.trim();
    if (!text || busy) return;
    setMsgs((m) => [...m, { role: "user", body: text }]);
    setQ("");
    setBusy(true);
    try {
      const r = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok && data.answer) {
        const { body, source } = splitSource(String(data.answer));
        setMsgs((m) => [...m, { role: "ai", body, source }]);
      } else if (data.error === "AI_UNAVAILABLE") {
        setMsgs((m) => [...m, { role: "ai", body: CREDIT_MSG }]);
      } else {
        // never expose HTTP status / Anthropic / billing / stack detail
        setMsgs((m) => [...m, { role: "ai", body: GENERIC_ERR }]);
      }
    } catch {
      setMsgs((m) => [...m, { role: "ai", body: CREDIT_MSG }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div dir="rtl" style={S.wrap}>
      <div style={S.head}>
        <div>
          <div style={S.eyebrow}>SAP Library AI</div>
          <h1 style={S.h1}>שאל את הספרים</h1>
          <p style={S.sub}>צ&apos;אט מבוסס 10 ספרי SAP · עונה רק מהתוכן שבספרים · מציין מקור</p>
        </div>
        <Link href="/library" style={S.back}>← לספרייה</Link>
      </div>

      <div ref={boxRef} style={S.chat}>
        {msgs.length === 0 && (
          <div style={S.empty}>
            <p style={{ marginBottom: 10, color: "#64748b" }}>שאלות לדוגמה:</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {SAMPLES.map((s) => (
                <button key={s} onClick={() => ask(s)} style={S.sample}>{s}</button>
              ))}
            </div>
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} style={{ ...S.bubbleRow, justifyContent: m.role === "user" ? "flex-start" : "flex-end" }}>
            <div style={{ ...S.bubble, ...(m.role === "user" ? S.user : S.ai) }}>
              {m.role === "user" ? m.body : <RichAnswer text={m.body} />}
              {m.source && (
                <div style={S.sourceChip}>
                  <span style={{ fontSize: 12 }}>📖</span>
                  <span><b>מקור:</b> {m.source}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {busy && (
          <div style={{ ...S.bubbleRow, justifyContent: "flex-end" }}>
            <div style={{ ...S.bubble, ...S.ai, ...S.loading }}>
              <span style={S.dot} /> <span style={{ ...S.dot, animationDelay: "0.2s" }} /> <span style={{ ...S.dot, animationDelay: "0.4s" }} />
              <span style={{ marginInlineStart: 8, color: "#64748b" }}>מחפש בספרים…</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); ask(q); }} style={S.inputRow}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="שאל שאלה על תוכן הספרים…" style={S.input} disabled={busy} />
        <button type="submit" disabled={busy || !q.trim()} style={S.send}>{busy ? "…" : "שלח"}</button>
      </form>
      <p style={S.foot}>מבוסס 100% על הספרים · לא ממציא · Sali Halif — Web Coding</p>

      <style>{`@keyframes hqdot{0%,80%,100%{opacity:.3}40%{opacity:1}}`}</style>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  wrap: { maxWidth: 860, margin: "0 auto", padding: 20, fontFamily: "'Segoe UI', system-ui, sans-serif" },
  head: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 },
  eyebrow: { fontSize: 12, fontWeight: 700, letterSpacing: 0.6, color: "#d62027", textTransform: "uppercase" },
  h1: { fontSize: 26, fontWeight: 800, margin: "4px 0 2px", color: "#0f172a" },
  sub: { fontSize: 14, color: "#64748b", margin: 0 },
  back: { fontSize: 13, color: "#0f172a", textDecoration: "none", border: "1px solid #e2e8f0", padding: "8px 12px", borderRadius: 10 },
  chat: { minHeight: 360, maxHeight: 520, overflowY: "auto", border: "1px solid #e2e8f0", borderRadius: 16, padding: 16, background: "#fafafa", display: "flex", flexDirection: "column", gap: 10 },
  empty: { margin: "auto 0" },
  sample: { fontSize: 13, padding: "8px 12px", borderRadius: 999, border: "1px solid #e2e8f0", background: "#fff", color: "#0f172a", cursor: "pointer" },
  bubbleRow: { display: "flex" },
  bubble: { maxWidth: "86%", padding: "12px 16px", borderRadius: 14, fontSize: 14, lineHeight: 1.7 },
  user: { background: "#0f172a", color: "#fff", borderTopRightRadius: 4, whiteSpace: "pre-wrap" },
  ai: { background: "#fff", color: "#0f172a", border: "1px solid #e2e8f0", borderTopLeftRadius: 4 },
  sourceChip: { marginTop: 10, display: "inline-flex", alignItems: "center", gap: 6, background: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b", padding: "5px 10px", borderRadius: 999, fontSize: 12.5 },
  loading: { display: "flex", alignItems: "center" },
  dot: { display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#d62027", margin: "0 2px", animation: "hqdot 1.2s infinite ease-in-out" },
  inputRow: { display: "flex", gap: 8, marginTop: 12 },
  input: { flex: 1, padding: "12px 14px", borderRadius: 12, border: "1px solid #cbd5e1", fontSize: 15 },
  send: { padding: "12px 22px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#d62027,#a3171c)", color: "#fff", fontWeight: 700, cursor: "pointer", minWidth: 72 },
  foot: { textAlign: "center", fontSize: 12, color: "#94a3b8", marginTop: 14 },
};
