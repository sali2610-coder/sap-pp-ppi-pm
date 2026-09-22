// Master-completion queue. The universe of each catalog is the one
// scripts/report-coverage.mjs counts (run it with --ids first); "authored" means
// an overlay record in data/verification/*.ts or a best-practice record. Every
// count in audit/master-completion/ is derived here, never copied from a report.
//   IDS_OUT=scratchpad/coverage-ids.json npm run report:coverage -- --ids
//   node scripts/qa/gen-master-queue.mjs
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
const rows = JSON.parse(readFileSync(process.env.IDS_IN || "scratchpad/coverage-ids.json", "utf8"));
const src = readdirSync("data/verification").filter((f) => f.endsWith(".ts")).map((f) => readFileSync(`data/verification/${f}`, "utf8")).join("\n");
const authored = new Set([...src.matchAll(/^\s{4}id:\s*"([^"]+)"/gm)].map((m) => m[1]));
const families = {};
for (const [cat, list] of Object.entries(rows)) {
  const f = { universe: list.length, authored: 0, missing: 0, depth: {}, level: {}, status: {}, missingIds: [], shallowAuthored: [] };
  for (const r of list) {
    f.depth["L" + r.depth] = (f.depth["L" + r.depth] || 0) + 1;
    f.level[r.level] = (f.level[r.level] || 0) + 1;
    f.status[r.status] = (f.status[r.status] || 0) + 1;
    const isAuthored = authored.has(r.id) || cat === "best-practices";
    if (isAuthored) { f.authored++; if (r.depth < 5) f.shallowAuthored.push({ id: r.id, depth: r.depth, level: r.level }); }
    else { f.missing++; f.missingIds.push(r.id); }
  }
  families[cat] = f;
}
const outsideUniverse = [...authored].filter((id) => !Object.values(rows).some((l) => l.some((r) => r.id === id)));
const out = { generatedAt: new Date().toISOString(), source: "report-coverage --ids + data/verification/*.ts", families, authoredOutsideUniverse: outsideUniverse };
writeFileSync("audit/master-completion/QUEUE.json", JSON.stringify(out, null, 2));
for (const [c, f] of Object.entries(families)) {
  console.log(`${c.padEnd(15)} universe=${String(f.universe).padStart(5)} authored=${String(f.authored).padStart(4)} missing=${String(f.missing).padStart(5)} L5=${String(f.depth.L5 || 0).padStart(4)} verif.req=${String(f.level.verification_required || 0).padStart(5)} conflict=${f.level.conflicting_sources || 0}`);
}
console.log("authored records outside any counted universe:", outsideUniverse.join(", ") || "none");
