/* Content-parity check for the book7 duplicate-section repair.
   Compares the migrated shards against the ORIGINAL validated source
   (data/library/book7-full.json), section by section. */
import { readFileSync } from "node:fs";
import path from "node:path";
const R = process.cwd();
const LIB = path.join(R, "data", "library");
const full = JSON.parse(readFileSync(path.join(LIB, "book7-full.json"), "utf8"));

const shard = (n) => JSON.parse(readFileSync(path.join(R, "public", "books", "book7", `ch${n}.json`), "utf8"));
const before = (n) => JSON.parse(readFileSync(path.join("/tmp/pbooks.before", "book7", `ch${n}.json`), "utf8"));

const secsOf = (sh) => {
  // shard shape: { sections: [{id, body}] } or a map — normalise
  const list = Array.isArray(sh) ? sh : sh.sections ?? Object.values(sh).find(Array.isArray) ?? [];
  const m = new Map();
  for (const s of list) if (s?.id) m.set(String(s.id), JSON.stringify(s.body ?? s));
  return m;
};

const dupIds = new Map();
for (const c of full.chapters ?? []) for (const s of c.sections ?? []) {
  if (!s?.id) continue;
  const k = String(s.id);
  dupIds.set(k, (dupIds.get(k) ?? 0) + 1);
}
const dups = [...dupIds].filter(([, n]) => n > 1).map(([k]) => k);

let sourceSecs = 0, present = 0, missing = [], emptyBody = [];
for (const c of full.chapters ?? []) {
  const n = Number(c.n);
  let sh;
  try { sh = secsOf(shard(n)); } catch { sh = new Map(); }
  for (const s of c.sections ?? []) {
    if (!s?.id) continue;
    sourceSecs++;
    const got = sh.get(String(s.id));
    if (got === undefined) { missing.push(`ch${n}:${s.id}`); continue; }
    present++;
    if (!got || got === "null" || got === '""') emptyBody.push(`ch${n}:${s.id}`);
  }
}

/* THE ACTUAL REGRESSION TEST: for every id that appears in two chapters, the
   two chapters must now serve DIFFERENT bodies. Before the fix they served the
   same one, which is precisely how the earlier occurrence became unreachable. */
const pairs = [];
for (const id of dups) {
  const chs = (full.chapters ?? []).filter((c) => (c.sections ?? []).some((s) => String(s?.id) === id)).map((c) => Number(c.n));
  const now = chs.map((n) => { try { return secsOf(shard(n)).get(id); } catch { return undefined; } });
  const was = chs.map((n) => { try { return secsOf(before(n)).get(id); } catch { return undefined; } });
  pairs.push({
    id, chapters: chs,
    identicalBefore: new Set(was.filter(Boolean)).size === 1 && was.every(Boolean),
    distinctNow: new Set(now.filter(Boolean)).size === now.length && now.every(Boolean),
  });
}

console.log(JSON.stringify({
  sourceSections: sourceSecs,
  presentInShards: present,
  missing: missing.length, missingList: missing.slice(0, 10),
  emptyBody: emptyBody.length,
  duplicateIds: dups.length,
  wereIdenticalBefore: pairs.filter((p) => p.identicalBefore).length,
  areDistinctNow: pairs.filter((p) => p.distinctNow).length,
  stillIdentical: pairs.filter((p) => !p.distinctNow).map((p) => p.id),
}, null, 1));
