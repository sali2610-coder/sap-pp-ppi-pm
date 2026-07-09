// M1 — manifest drift gate. Pure Node (no deps). Validates the COMMITTED
// lib/route-manifest.generated.ts against the routes actually generated in out/.
// Catches both drift directions:
//   - manifest has a code with no built page  -> SmartLink would emit a dead link
//   - a page exists the manifest lacks         -> SmartLink would hide a valid link
// Fails (exit 1) on any mismatch. Run AFTER `next build`.
//
// Run: node scripts/check-route-manifest.mjs
import { readdirSync, statSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const MANIFEST = "lib/route-manifest.generated.ts";
if (!existsSync(OUT)) { console.error("check-route-manifest: out/ not found — run `next build` first."); process.exit(2); }

// extract the JSON literal from `export const ROUTE_MANIFEST = {...} as const;`
const raw = readFileSync(MANIFEST, "utf8");
const m = raw.match(/ROUTE_MANIFEST\s*=\s*(\{[\s\S]*\})\s*as const/);
if (!m) { console.error("check-route-manifest: cannot parse manifest literal."); process.exit(2); }
let manifest;
try { manifest = JSON.parse(m[1]); } catch (e) { console.error("check-route-manifest: manifest JSON parse failed:", e.message); process.exit(2); }

// family key in manifest -> { dir in out/, case-fold? }
const FAMILIES = [
  { key: "objects", dir: "object", fold: false },
  { key: "tcodes", dir: "tcode", fold: true },
  { key: "bapiFm", dir: "bapi", fold: false },
  { key: "idocs", dir: "idoc", fold: false },
  { key: "cds", dir: "cds", fold: false },
  { key: "apps", dir: "apps", fold: true },
  { key: "impact", dir: "impact", fold: false },
  { key: "transactions", dir: "transactions", fold: true },
];

// built codes = the immediate subdirectories of out/<dir> that contain index.html
function builtCodes(dir) {
  const base = join(OUT, dir);
  if (!existsSync(base)) return new Set();
  const out = new Set();
  for (const name of readdirSync(base)) {
    const p = join(base, name);
    if (statSync(p).isDirectory() && existsSync(join(p, "index.html"))) {
      out.add(decodeURIComponent(name));
    }
  }
  return out;
}
const fold = (s, on) => (on ? s.toUpperCase() : s);

let problems = 0;
for (const f of FAMILIES) {
  const man = new Set((manifest[f.key] || []).map((c) => fold(c, f.fold)));
  const built = new Set([...builtCodes(f.dir)].map((c) => fold(c, f.fold)));
  const missing = [...man].filter((c) => !built.has(c)); // manifest -> no page (dead-link risk)
  const extra = [...built].filter((c) => !man.has(c));    // page -> not in manifest (lost-nav risk)
  if (missing.length || extra.length) {
    problems++;
    console.error(`DRIFT /${f.dir}/: manifest=${man.size} built=${built.size} | missing(no page)=${missing.length} extra(unlisted page)=${extra.length}`);
    if (missing.length) console.error(`  missing e.g.: ${missing.slice(0, 8).join(", ")}`);
    if (extra.length) console.error(`  extra e.g.:   ${extra.slice(0, 8).join(", ")}`);
  } else {
    console.log(`OK /${f.dir}/: ${man.size} codes match built pages`);
  }
}

if (problems) { console.error(`\ncheck-route-manifest: ${problems} family(ies) drifted. Run \`npm run gen:routes\` and commit.`); process.exit(1); }
console.log("\ncheck-route-manifest: manifest in sync with built routes.");
