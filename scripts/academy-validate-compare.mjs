/**
 * SAP Academy — before/after comparison + report.
 * Reads docs/academy/validation/<pr>/{before,after}.manifest.json, compares each
 * surface (content hash + status/overflow/errors), and writes report.md.
 * `--expected a,b` lists surface ids allowed to change (this PR's intended scope).
 * Any surface NOT in --expected whose render changed → flagged as UNEXPECTED (stop).
 *
 * Usage: node scripts/academy-validate-compare.mjs --pr <name> --expected pm-academy,home
 */
import { readFileSync, writeFileSync } from "node:fs";

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const pr = arg("pr", "pr");
const expected = new Set((arg("expected", "") || "").split(",").map((s) => s.trim()).filter(Boolean));

const dir = `docs/academy/validation/${pr}`;
const before = JSON.parse(readFileSync(`${dir}/before.manifest.json`, "utf8"));
const after = JSON.parse(readFileSync(`${dir}/after.manifest.json`, "utf8"));
const key = (r) => `${r.surface}-${r.vp}`;
const bMap = new Map(before.rows.map((r) => [key(r), r]));

const lines = [];
lines.push(`# Validation report — ${pr}\n`);
lines.push(`Before: ${before.rows.length} shots · After: ${after.rows.length} shots. Reduced-motion, seeded localStorage, deterministic capture.\n`);
lines.push(`Intended-change scope (--expected): ${expected.size ? [...expected].join(", ") : "(none — additive PR, all surfaces must be identical)"}\n`);
lines.push(`Change detection = DOM text signature (authoritative). Pixel hash shown as advisory only (flaky under animation).\n`);
lines.push(`| surface | vp | status b→a | overflow b→a | errors b→a | content | pixel | verdict |`);
lines.push(`|---|---|---|---|---|---|---|---|`);

let unexpected = 0, regress = 0;
for (const a of after.rows) {
  const b = bMap.get(key(a)) || {};
  const changed = (b.textHash ?? "b") !== (a.textHash ?? "a"); // authoritative: DOM text
  const pixelChanged = b.hash !== a.hash;
  const inScope = expected.has(a.surface);
  const statusOk = (a.status === 200 || a.status === 304);
  const ovOk = a.overflow <= 0;
  const errOk = (a.errors?.length || 0) === 0;
  let verdict = "✅ identical";
  if (changed && inScope) verdict = "◐ changed (intended)";
  else if (changed && !inScope) { verdict = "⛔ UNEXPECTED CHANGE"; unexpected++; }
  if (!statusOk || !ovOk || !errOk) { verdict += " · ⚠ metric"; regress++; }
  lines.push(`| ${a.surface} | ${a.vp} | ${b.status ?? "—"}→${a.status} | ${b.overflow ?? "—"}→${a.overflow} | ${(b.errors?.length ?? "—")}→${a.errors?.length ?? 0} | ${changed ? "CHANGED" : "same"} | ${pixelChanged ? "diff" : "same"} | ${verdict} |`);
}

lines.push(`\n**Unexpected changes (out of scope): ${unexpected}** · **Metric regressions: ${regress}**`);
lines.push(unexpected === 0 && regress === 0
  ? `\n✅ PASS — no unrelated feature changed; all metrics green.`
  : `\n⛔ STOP — ${unexpected} unexpected change(s), ${regress} metric regression(s). Do NOT continue.`);

const report = lines.join("\n");
writeFileSync(`${dir}/report.md`, report + "\n");
console.log(report);
process.exit(unexpected === 0 && regress === 0 ? 0 : 1);
