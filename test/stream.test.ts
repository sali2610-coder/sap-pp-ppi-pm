/**
 * SSE reader. The load-bearing property: `delta` text is an UNGATED preview and
 * must never be returned as the answer. A stream that ends without `done` has
 * produced nothing the quality gates approved.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { streamAnswer, StreamError } from "../lib/ai/stream.ts";

const sse = (events: [string, unknown][]) =>
  events.map(([e, d]) => `event: ${e}\ndata: ${JSON.stringify(d)}\n\n`).join("");

/** Serves `text` in fixed-size BYTE chunks, so multi-byte Hebrew is split. */
function mockFetch(text: string, size: number, ok = true, json?: unknown) {
  const bytes = new TextEncoder().encode(text);
  let i = 0;
  (globalThis as unknown as { fetch: unknown }).fetch = async () => ({
    ok, status: ok ? 200 : 503,
    json: async () => json,
    body: ok ? { getReader: () => ({ read: async () => (i >= bytes.length
      ? { done: true, value: undefined }
      : { done: false, value: bytes.slice(i, (i += size) ) }) }) } : null,
  });
}

const FULL = sse([
  ["meta", { books: 4 }],
  ["delta", { text: "מחזור " }],
  ["delta", { text: "החיים של " }],
  ["delta", { text: "הזמנת תחזוקה" }],
  ["status", { stage: "validating" }],
  ["done", { answer: "מחזור החיים מתחיל בהודעה.", sources: [{ id: "book1#1#1.1" }], policy: "FULL", ms: 900 }],
]);

test("reassembles Hebrew split across 3-byte network chunks", async () => {
  mockFetch(FULL, 3);
  let preview = "", books = 0, stage = "";
  const r = await streamAnswer("/x", {}, {
    onMeta: (m) => { books = m.books; },
    onDelta: (t) => { preview += t; },
    onStatus: (s) => { stage = s; },
  });
  assert.equal(books, 4);
  assert.equal(preview, "מחזור החיים של הזמנת תחזוקה");
  assert.equal(stage, "validating");
  assert.equal(r.answer, "מחזור החיים מתחיל בהודעה.");
  assert.notEqual(r.answer, preview, "done must be authoritative, not the preview");
  assert.equal(r.sources.length, 1);
});

test("works when the whole body arrives in one chunk", async () => {
  mockFetch(FULL, 10_000);
  const r = await streamAnswer("/x", {});
  assert.ok(r.answer.length > 0);
});

test("surfaces `replaced` when the gates discarded the preview", async () => {
  mockFetch(sse([["delta", { text: "טקסט לא מאומת" }],
                 ["done", { answer: "לא מצאתי", sources: [], replaced: true }]]), 7);
  let preview = "";
  const r = await streamAnswer("/x", {}, { onDelta: (t) => { preview += t; } });
  assert.equal(r.replaced, true);
  assert.equal(preview, "טקסט לא מאומת");
  assert.equal(r.answer, "לא מצאתי");
});

test("a stream ending without `done` throws — never ships ungated text", async () => {
  mockFetch(sse([["delta", { text: "פריוויו לא מאומת" }]]), 5);
  await assert.rejects(() => streamAnswer("/x", {}), (e: unknown) =>
    e instanceof StreamError && e.code === "AI_INCOMPLETE");
});

test("maps an error event to a stable code", async () => {
  mockFetch(sse([["delta", { text: "x" }], ["error", { error: "AI_UNAVAILABLE" }]]), 5);
  await assert.rejects(() => streamAnswer("/x", {}), (e: unknown) =>
    e instanceof StreamError && e.code === "AI_UNAVAILABLE");
});

test("maps an HTTP failure before the stream starts", async () => {
  mockFetch("", 5, false, { error: "AI_UNAVAILABLE" });
  await assert.rejects(() => streamAnswer("/x", {}), (e: unknown) =>
    e instanceof StreamError && e.code === "AI_UNAVAILABLE");
});
