/**
 * Where a source opens from Ask-the-Library.
 *
 * Two controls navigate to a source: the card's link and the answer's
 * "פתח מקור" action. Both follow `citation.href`, built in lib/ai/links.ts and
 * attached in lib/ai/client.ts. This pins the two properties the user sees:
 * the link goes to the NEO reader, and it opens in a NEW tab so the
 * conversation stays where it was.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";

const ROOT = new URL("../", import.meta.url);
const read = (p: string) => readFileSync(new URL(p, ROOT), "utf8");
const CHAT = "components/neo-shell/chat/";
/** Every file a source link is built in, attached in or followed from. */
const FILES = ["lib/ai/links.ts", "lib/ai/client.ts",
  ...readdirSync(new URL(CHAT, ROOT)).filter((f) => /\.tsx?$/.test(f)).map((f) => CHAT + f)];

test("no /library/ link remains in Ask-the-Library source navigation", () => {
  for (const f of FILES) {
    const literal = read(f).match(/["'`][^"'`\n]*\/library\/[^"'`\n]*["'`]/);
    assert.equal(literal, null, `${f} still builds a /library/ URL: ${literal?.[0]}`);
  }
});

test("a source card opens in a new tab", () => {
  const card = read(`${CHAT}sources.tsx`).match(/<Link[^>]*href=\{c\.href\}[^>]*>/)?.[0] ?? "";
  assert.match(card, /target="_blank"/);
  assert.match(card, /rel="noopener noreferrer"/);
});

test('"פתח מקור" opens in a new tab, never by navigating this one', () => {
  const src = read(`${CHAT}use-conversation.ts`);
  const at = src.indexOf("const openSource");
  const body = src.slice(at, src.indexOf("}, [", at));
  assert.ok(at > 0, "openSource not found");
  assert.match(body, /window\.open\(href, "_blank", "noopener,noreferrer"\)/);
  assert.doesNotMatch(body, /location\.(href|assign|replace)|router\.(push|replace)/);
});
