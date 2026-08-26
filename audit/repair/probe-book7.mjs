import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
const LIB = path.join(process.cwd(), "data", "library");
const out = {};
for (let i = 1; i <= 11; i++) {
  const id = `book${i}`;
  const f = path.join(LIB, `${id}-full.json`);
  if (!existsSync(f)) continue;
  const full = JSON.parse(readFileSync(f, "utf8"));
  const seen = new Map();          // id -> [{ch, len, he, en}]
  for (const c of full.chapters ?? []) {
    for (const s of c.sections ?? []) {
      if (!s?.id) continue;
      const sid = String(s.id);
      const j = JSON.stringify(s);
      if (!seen.has(sid)) seen.set(sid, []);
      seen.get(sid).push({ ch: Number(c.n), bytes: j.length, he: (JSON.stringify(s).match(/[֐-׿]/g) || []).length, en: (JSON.stringify(s).match(/[A-Za-z]/g) || []).length });
    }
  }
  const dups = [...seen.entries()].filter(([, v]) => v.length > 1);
  if (!dups.length) { out[id] = { dupIds: 0 }; continue; }
  // The migration keeps only the LAST occurrence per id. Everything before it is lost.
  let lostHe = 0, lostEn = 0, lostBytes = 0, lostCount = 0;
  for (const [, v] of dups) {
    for (const occ of v.slice(0, -1)) { lostHe += occ.he; lostEn += occ.en; lostBytes += occ.bytes; lostCount++; }
  }
  out[id] = {
    dupIds: dups.length, lostOccurrences: lostCount,
    lostHebrewChars: lostHe, lostLatinChars: lostEn, lostBytes,
    sample: dups.slice(0, 8).map(([k, v]) => `${k}(ch ${v.map((x) => x.ch).join(",")})`),
  };
}
console.log(JSON.stringify(out, null, 1));
