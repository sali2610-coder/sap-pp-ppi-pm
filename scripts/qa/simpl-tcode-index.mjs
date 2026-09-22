// Which transaction codes each official SAP S/4HANA Simplification Item NAMES.
// Reads the local text extracts of the two official lists and the transaction
// universe the coverage report counts. A mention is a research lead with an
// official citation, not a verdict: an item can name a code to point away from
// it or to point towards it. The verdict for each code stays the job of a
// record that reads the item.
//   node scripts/qa/simpl-tcode-index.mjs
import { readFileSync, writeFileSync } from "node:fs";
const LISTS = [
  { key: "2025", file: "scratchpad/official/SIMPL_OP2025.pdf.txt", title: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36)", release: "2025 FPS01", url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf", md5: "c1ccf8ebcd92d51fdc80e4b4873f3b73" },
  { key: "2023", file: "scratchpad/official/SIMPL_OP2023.pdf.txt", title: "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 (document version 1.35)", release: "2023 FPS03", url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf", md5: "909c6e9087b009e809c116d3c6cf2eec" },
];
const ids = JSON.parse(readFileSync("scratchpad/coverage-ids.json", "utf8"));
const codes = ids.transactions.map((r) => r.id.slice(3));
const HEAD = /^(\d+(?:\.\d+)+)\.?\s+(\S.{3,})$/;
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
const out = { generatedAt: new Date().toISOString(), lists: LISTS.map(({ file, ...l }) => l), codes: {} };
for (const L of LISTS) {
  const lines = readFileSync(L.file, "utf8").split("\n");
  // item spans: a numbered heading without TOC dot leaders opens an item
  const items = [];
  lines.forEach((ln, i) => {
    const m = ln.match(HEAD);
    if (m && !/\.{4,}/.test(ln) && !/\s\d+\s*$/.test(m[2])) items.push({ n: m[1], title: m[2].trim(), start: i });
  });
  items.forEach((it, k) => { it.end = k + 1 < items.length ? items[k + 1].start : lines.length; });
  const itemAt = (i) => { let lo = 0, hi = items.length - 1, r = null; while (lo <= hi) { const mid = (lo + hi) >> 1; if (items[mid].start <= i) { r = items[mid]; lo = mid + 1; } else hi = mid - 1; } return r; };
  for (const c of codes) {
    // whole-token match; codes of two characters are too ambiguous to trust
    if (c.length < 3) continue;
    const re = new RegExp(`(^|[^A-Za-z0-9_/])${esc(c)}([^A-Za-z0-9_]|$)`);
    const hits = new Map();
    lines.forEach((ln, i) => {
      if (/\.{4,}/.test(ln)) return; // table of contents
      if (!re.test(ln)) return;
      const it = itemAt(i);
      if (!it) return;
      const key = it.n;
      if (!hits.has(key)) hits.set(key, { item: it.n, title: it.title, lines: [] });
      if (hits.get(key).lines.length < 3) hits.get(key).lines.push(i + 1);
    });
    if (hits.size) (out.codes[c] ||= {})[L.key] = [...hits.values()];
  }
  console.log(`${L.key}: ${items.length} item headings parsed`);
}
const named = Object.keys(out.codes);
const both = named.filter((c) => out.codes[c]["2025"] && out.codes[c]["2023"]);
out.summary = { universe: codes.length, skippedTwoCharacter: codes.filter((c) => c.length < 3).length, namedInAnyList: named.length, namedInBoth: both.length, notNamed: codes.length - named.length - codes.filter((c) => c.length < 3).length };
writeFileSync("audit/master-completion/simpl-tcode-index.json", JSON.stringify(out, null, 1));
console.log(JSON.stringify(out.summary));
