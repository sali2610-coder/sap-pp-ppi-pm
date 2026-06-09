// Extract real subchapter headings (N.N / N.N.N) per chapter from Book 2 text —
// copyright-safe (titles/structure only). Output: data/library/pp-toc.json
// { [ch]: [{ id, title }] }

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BOOK = JSON.parse(fs.readFileSync(path.join(ROOT, "public", "assets", "library", "book2", "text.json"), "utf8"));

function subchapters(n, text) {
  const re = new RegExp(`(?:^|\\n|\\s)(${n}\\.\\d{1,2}(?:\\.\\d{1,2})?)\\s+([A-Z][^\\n.]{4,70})`, "g");
  const all = [];
  let m;
  while ((m = re.exec(text))) {
    const id = m[1];
    let title = m[2].trim().replace(/\s{2,}/g, " ");
    // cut trailing fragments / page numbers
    title = title.replace(/\s+\d{1,4}$/, "").trim();
    all.push({ id, title });
  }
  const firstById = new Map();
  for (const s of all) if (!firstById.has(s.id) && s.title.length > 4) firstById.set(s.id, s);
  return [...firstById.values()]
    .filter((s) => /^[A-Za-z]/.test(s.title) && !/^\d/.test(s.title))
    .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))
    .slice(0, 30);
}

const out = {};
for (const ch of BOOK.chapters) {
  out[ch.n] = subchapters(ch.n, ch.text);
  console.log(`ch${ch.n}: ${out[ch.n].length} subchapters`);
}
fs.writeFileSync(path.join(ROOT, "data", "library", "pp-toc.json"), JSON.stringify(out, null, 2));
console.log("\n✓ data/library/pp-toc.json");
