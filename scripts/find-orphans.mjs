/**
 * Dead-file finder — import-graph reachability from real entry points, with a
 * second independent grep confirmation per candidate (no false positives).
 * Read-only. Run: node scripts/find-orphans.mjs
 */
import { readdirSync, statSync, readFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";

const EXTS = [".ts", ".tsx"];
const all = [];
const walk = (d) => {
  for (const e of readdirSync(d)) {
    const p = `${d}/${e}`;
    const s = statSync(p);
    if (s.isDirectory()) { if (!/\/node_modules$|\/\.next$|\/out$/.test(p)) walk(p); }
    else if (EXTS.some((x) => p.endsWith(x)) && !p.endsWith(".d.ts")) all.push(p);
  }
};
["app", "components", "lib", "data", "scripts"].forEach((r) => existsSync(r) && walk(r));

const resolve = (fromFile, spec) => {
  let base;
  if (spec.startsWith("@/")) base = spec.slice(2);
  else if (spec.startsWith(".")) { const dir = fromFile.split("/").slice(0, -1).join("/"); base = new URL(spec, "file:///" + dir + "/").pathname.slice(1); }
  else return null;
  const c = [];
  for (const x of EXTS) c.push(base + x);
  for (const x of EXTS) c.push(base + "/index" + x);
  return c.find((y) => existsSync(y)) || null;
};

const RE = /(?:from\s+|import\s*\(\s*|import\s+)['"]([^'"]+)['"]/g;
const outbound = new Map(all.map((f) => [f, new Set()]));
for (const f of all) {
  const src = readFileSync(f, "utf8");
  let m;
  RE.lastIndex = 0;
  while ((m = RE.exec(src))) { const r = resolve(f, m[1]); if (r && r !== f) outbound.get(f).add(r); }
}

// Entry points: every file physically under app/ (Next route tree) + scripts/ (tooling).
const isEntry = (f) => f.startsWith("app/") || f.startsWith("scripts/");
const reachable = new Set();
const stack = all.filter(isEntry);
while (stack.length) { const f = stack.pop(); if (reachable.has(f)) continue; reachable.add(f); for (const o of outbound.get(f) || []) stack.push(o); }

const candidates = all.filter((f) => !isEntry(f) && !reachable.has(f)).sort();

// Independent confirmation: grep the whole repo for the module basename as an import
// specifier; a candidate is only a true orphan if every importer is itself a candidate.
const candSet = new Set(candidates);
const confirmedOrphans = [];
const suspicious = [];
for (const f of candidates) {
  const noExt = f.replace(/\.(ts|tsx)$/, "");
  const spec = "@/" + noExt.replace(/\/index$/, "");
  let importers = [];
  try {
    const out = execSync(`grep -rlF ${JSON.stringify(spec)} app components lib data scripts 2>/dev/null || true`, { encoding: "utf8" });
    importers = out.split("\n").filter((l) => l && l !== f);
  } catch {}
  const liveImporters = importers.filter((i) => !candSet.has(i));
  if (liveImporters.length === 0) confirmedOrphans.push(f);
  else suspicious.push({ f, liveImporters });
}

console.log(`scanned ${all.length} files · ${reachable.size} reachable · ${candidates.length} unreachable`);
console.log(`\n=== CONFIRMED ORPHANS (unreachable AND no live importer) : ${confirmedOrphans.length} ===`);
confirmedOrphans.forEach((f) => console.log("  " + f));
if (suspicious.length) {
  console.log(`\n=== NOT orphans (grep found a live importer — graph missed edge) : ${suspicious.length} ===`);
  suspicious.forEach((s) => console.log(`  ${s.f}  <=  ${s.liveImporters.join(", ")}`));
}
