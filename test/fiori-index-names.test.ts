import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

/* The thin Fiori index keeps only the tail of each app title, so different apps
   shared a display name ("Agreements" was three of them). /fiori-apps now shows
   the full title Book 7 carries under the same id, without editing either file,
   both of which are protected content. */

const INDEX = JSON.parse(readFileSync("data/library/fiori-apps.json", "utf8")) as { id: string; name: string }[];
const BOOK7 = JSON.parse(readFileSync("data/books/book7.json", "utf8"));
const full = new Map<string, string>();
for (const c of BOOK7.chapters) for (const s of c.sections ?? []) {
  const t = typeof s.title === "string" ? s.title : s.title?.en;
  if (t) full.set(String(s.id), t.trim());
}

test("every thin-index id has a full title in Book 7", () => {
  const missing = INDEX.filter((a) => !full.has(a.id)).map((a) => a.id);
  assert.deepEqual(missing, []);
});

test("the full titles tell apart the apps the index merged under one name", () => {
  const shared = (names: string[]) => {
    const c = new Map<string, number>(); for (const n of names) c.set(n, (c.get(n) ?? 0) + 1);
    return [...c.values()].filter((v) => v > 1).length;
  };
  const before = shared(INDEX.map((a) => a.name));
  const after = shared(INDEX.map((a) => full.get(a.id) ?? a.name));
  assert.equal(before, 61);
  assert.ok(after < before, `still ${after} shared names`);
  console.log(`shared display names: ${before} -> ${after}`);
});
