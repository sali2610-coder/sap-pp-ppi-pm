/**
 * The two surfaces must not share memory.
 *
 * They did: one set of localStorage keys served both, so opening AI Chat
 * restored the Library's conversation and a reload brought back whichever
 * thread was written last. This asserts the separation at the store level,
 * which is where it was actually broken.
 */
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";

// Minimal localStorage so the store can be exercised without a DOM.
const mem = new Map<string, string>();
(globalThis as any).window = {
  localStorage: {
    getItem: (k: string) => (mem.has(k) ? mem.get(k)! : null),
    setItem: (k: string, v: string) => void mem.set(k, v),
    removeItem: (k: string) => void mem.delete(k),
  },
};
(globalThis as any).localStorage = (globalThis as any).window.localStorage;

const {
  saveThread, loadThreads, deleteThread, saveScope, loadScope,
  saveActiveId, loadActiveId, toggleFavorite,
} = await import("../lib/ai/history.ts");

const mkThread = (id: string, q: string) => ({
  id, title: q, createdAt: 1, updatedAt: 1,
  turns: [{ q, a: null }],
});

beforeEach(() => mem.clear());

test("a thread saved on one surface is invisible on the other", () => {
  saveThread("library", mkThread("t1", "שאלה לספרייה"));
  assert.equal(loadThreads("library").length, 1);
  assert.equal(loadThreads("consult").length, 0, "consult must not see library threads");

  saveThread("consult", mkThread("t2", "שאלת ייעוץ"));
  assert.equal(loadThreads("library").length, 1, "library must not gain the consult thread");
  assert.equal(loadThreads("consult").length, 1);
});

test("the two stores use different keys", () => {
  saveThread("library", mkThread("t1", "a"));
  saveThread("consult", mkThread("t2", "b"));
  const keys = [...mem.keys()];
  assert.equal(new Set(keys).size, keys.length);
  assert.ok(keys.some((k) => k.includes("lib")), keys.join(","));
  assert.ok(keys.some((k) => k.includes("con")), keys.join(","));
});

test("scope is per surface — narrowing one does not narrow the other", () => {
  saveScope("library", { bookId: "book5", chapter: 3 });
  assert.deepEqual(loadScope("library"), { bookId: "book5", chapter: 3 });
  assert.deepEqual(loadScope("consult"), {}, "consult scope must stay empty");
});

test("the active thread is per surface", () => {
  saveActiveId("library", "t1");
  saveActiveId("consult", "t2");
  assert.equal(loadActiveId("library"), "t1");
  assert.equal(loadActiveId("consult"), "t2");
});

test("deleting on one surface leaves the other intact", () => {
  saveThread("library", mkThread("same-id", "לספרייה"));
  saveThread("consult", mkThread("same-id", "לייעוץ"));
  deleteThread("library", "same-id");
  assert.equal(loadThreads("library").length, 0);
  assert.equal(loadThreads("consult").length, 1, "an id collision must not delete across surfaces");
  assert.equal(loadThreads("consult")[0].title, "לייעוץ");
});

test("favouriting on one surface does not touch the other", () => {
  saveThread("library", mkThread("x", "a"));
  saveThread("consult", mkThread("x", "b"));
  toggleFavorite("library", "x");
  assert.equal(loadThreads("library")[0].favorite, true);
  assert.notEqual(loadThreads("consult")[0].favorite, true);
});

test("a reload restores only the surface's own history", () => {
  saveThread("library", mkThread("l1", "ספרייה"));
  saveThread("consult", mkThread("c1", "ייעוץ"));
  // Simulate a fresh page: same storage, fresh reads.
  assert.deepEqual(loadThreads("library").map((t) => t.id), ["l1"]);
  assert.deepEqual(loadThreads("consult").map((t) => t.id), ["c1"]);
});
