"use client";

/**
 * Taking an answer out of the app.
 *
 * Everything here is client-side and offline. The site is a static export with
 * no server to render a PDF, and pulling in a PDF library would cost hundreds of
 * kilobytes on a route most people never export from. So: Markdown and HTML are
 * produced directly, .doc uses the HTML container Word has opened for twenty
 * years, and PDF goes through the browser's own print pipeline — which also
 * gives the user the page setup and preview they already know.
 */
import type { Answer } from "./types";

const stamp = () => new Date().toLocaleString("he-IL", { dateStyle: "short", timeStyle: "short" });

/** Sources are appended as a real reference list, not dropped on export. */
function sourceLines(a: Answer): string {
  if (!a.citations.length) return "";
  const rows = a.citations.map((c) => `- ${c.section} · ${c.title ?? ""} — ${c.book}, פרק ${c.chapter}`);
  return `\n\n## מקורות\n${rows.join("\n")}`;
}

export function toMarkdown(a: Answer): string {
  return `# ${a.question}\n\n${a.text}${sourceLines(a)}\n\n---\nנוצר ב-SAP by Sali · Project NEO · ${stamp()}\n`;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

/** Minimal, self-contained document. RTL is set on <html>, not guessed. */
function toHtmlDoc(a: Answer): string {
  const body = escapeHtml(a.text)
    .split("\n\n")
    .map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`)
    .join("\n");
  const sources = a.citations.length
    ? `<h2>מקורות</h2><ul>${a.citations
        .map((c) => `<li><b>${escapeHtml(c.section)}</b> · ${escapeHtml(c.title ?? "")} — ${escapeHtml(c.book)}, פרק ${c.chapter}</li>`)
        .join("")}</ul>`
    : "";
  return `<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<title>${escapeHtml(a.question)}</title>
<style>
 body{font-family:"Segoe UI",system-ui,sans-serif;line-height:1.85;color:#1a1d21;max-width:74ch;margin:2.5rem auto;padding:0 1.5rem}
 h1{font-size:1.4rem;margin-bottom:.25rem}
 h2{font-size:1.05rem;margin-top:2rem;border-top:1px solid #e5e7eb;padding-top:1rem}
 .meta{color:#6b7280;font-size:.8rem;margin-bottom:2rem}
 li{margin:.3rem 0}
 code,.tech{font-family:ui-monospace,monospace;direction:ltr;unicode-bidi:isolate}
 @media print{body{margin:0}}
</style></head><body>
<h1>${escapeHtml(a.question)}</h1>
<div class="meta">SAP by Sali · Project NEO · ${stamp()}</div>
${body}
${sources}
</body></html>`;
}

function download(name: string, mime: string, content: string) {
  const url = URL.createObjectURL(new Blob([content], { type: `${mime};charset=utf-8` }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  // Revoke on the next tick; revoking synchronously can cancel the download.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const slug = (s: string) => s.trim().slice(0, 48).replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "") || "answer";

export const exportMarkdown = (a: Answer) => download(`${slug(a.question)}.md`, "text/markdown", toMarkdown(a));

/** Word opens an HTML payload with a .doc extension; no library needed. */
export const exportWord = (a: Answer) => download(`${slug(a.question)}.doc`, "application/msword", toHtmlDoc(a));

/**
 * PDF via the browser's print dialog. A hidden iframe keeps the app's own
 * styling and scroll position out of the printed page.
 */
export function exportPdf(a: Answer) {
  const frame = document.createElement("iframe");
  frame.style.cssText = "position:fixed;inset:0;width:0;height:0;border:0;opacity:0";
  document.body.appendChild(frame);
  const doc = frame.contentDocument;
  if (!doc) { document.body.removeChild(frame); return; }
  doc.open();
  doc.write(toHtmlDoc(a));
  doc.close();
  frame.onload = () => {
    frame.contentWindow?.focus();
    frame.contentWindow?.print();
    setTimeout(() => frame.remove(), 1000);
  };
}

/** Copies the answer as Markdown. Returns false so the caller can tell the user. */
export async function copyMarkdown(a: Answer): Promise<boolean> {
  try { await navigator.clipboard.writeText(toMarkdown(a)); return true; }
  catch { return false; }
}

/**
 * A shareable link. Scope travels in the query so the recipient lands on the
 * same book, chapter and section; the question is included so they can re-ask.
 * The answer itself is not encoded — it would blow past URL limits and would go
 * stale the moment the corpus changes.
 */
export function shareUrl(a: Answer): string {
  const p = new URLSearchParams();
  if (a.scope.bookId) p.set("book", a.scope.bookId);
  if (a.scope.chapter != null) p.set("ch", String(a.scope.chapter));
  if (a.scope.section) p.set("sec", a.scope.section);
  p.set("q", a.question);
  return `${location.origin}/ai/?${p.toString()}`;
}

export async function copyShareLink(a: Answer): Promise<boolean> {
  try { await navigator.clipboard.writeText(shareUrl(a)); return true; }
  catch { return false; }
}
