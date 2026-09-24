#!/usr/bin/env node
// astra-reverify · re-verifies the Astra design-audit coverage matrix
// (audit/ux-2026-09/COVERAGE-MATRIX.md, 140 rows) against a SERVED static
// export, so the final report can mark each row VERIFIED from a measurement
// taken on the final build. It re-runs the QA scripts each row's "ראיית After"
// cell names, with the env every script needs, and evaluates the row's
// mechanical pass condition (zeros, counts, px) from their output.
//
//   node scripts/qa/astra-reverify.mjs [--base http://localhost:4196] [--out audit/master-completion/astra-reverify]
//                                      [--only <substring[,…]>] [--eval-only] [--timeout <minutes per script>]
//
// If nothing answers on --base it starts `PORT=<port> python3 scripts/serve-out.py`
// itself and stops it at the end. Writes <out>/summary.json, <out>/summary.md,
// <out>/runs/<run>.{stdout,stderr}.log (+ the script's own OUT json) and
// <out>/shots/** for the scripts that require SHOTS (git-ignored through
// <out>/.gitignore). Never edits a QA script, never writes outside <out>; a
// broken script is recorded (exit code, stderr) and the rows that rest on it
// FAIL with that reason. --only re-runs a subset, --eval-only re-evaluates the
// rows from the last run's logs without opening a browser.
//
// Route lists are never passed through a shell variable: the scripts read them
// from ux-measure.mjs (clip-check, axe-sweep, keyboard-check) or from a JSON
// file (a11y-sample: ROUTES_FROM = this run's own 1363 measurement).
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
process.chdir(ROOT);

/* ----------------------------------------------------------------- args */
const argv = process.argv.slice(2);
const opt = (name, def) => { const i = argv.indexOf(name); return i >= 0 && argv[i + 1] !== undefined ? argv[i + 1] : def; };
const BASE = opt("--base", "http://localhost:4196").replace(/\/+$/, "");
const OUT_DIR = path.resolve(opt("--out", "audit/master-completion/astra-reverify"));
const ONLY = opt("--only", "").split(",").map((s) => s.trim()).filter(Boolean);
const EVAL_ONLY = argv.includes("--eval-only");
const TIMEOUT_MS = Number(opt("--timeout", "15")) * 60_000;
const PORT = Number(new URL(BASE).port || 80);
const RUNS_DIR = path.join(OUT_DIR, "runs"), SHOTS_DIR = path.join(OUT_DIR, "shots");
const MATRIX = "audit/ux-2026-09/COVERAGE-MATRIX.md";
mkdirSync(RUNS_DIR, { recursive: true }); mkdirSync(SHOTS_DIR, { recursive: true });
writeFileSync(path.join(OUT_DIR, ".gitignore"), "shots-*/\nshots/\n");
const rel = (p) => path.relative(ROOT, p);

/* ------------------------------------------------------------ preflight */
if (!existsSync("out/index.html") || !existsSync("out/neo/index.html")) {
  console.error("out/ is missing or empty (no out/index.html + out/neo/index.html). Build first: npm run build");
  process.exit(2);
}
const matrixIds = readFileSync(MATRIX, "utf8").split("\n")
  .filter((l) => l.startsWith("| ") && !l.startsWith("| מזהה") && !l.startsWith("|---"))
  .map((l) => l.split(/(?<!\\)\|/)[1].trim()); // cells may hold escaped \| pipes
const answers = async () => { try { const r = await fetch(BASE + "/neo/", { signal: AbortSignal.timeout(2000) }); return r.ok; } catch { return false; } };
let server = null;
if (!EVAL_ONLY && !(await answers())) {
  server = spawn("python3", ["scripts/serve-out.py"], { env: { ...process.env, PORT: String(PORT) }, stdio: ["ignore", "ignore", "pipe"] });
  let up = false;
  for (let i = 0; i < 40 && !up; i++) { await new Promise((r) => setTimeout(r, 250)); up = await answers(); }
  if (!up) { console.error(`could not start scripts/serve-out.py on :${PORT}`); server.kill(); process.exit(2); }
  console.log(`started scripts/serve-out.py on :${PORT} (pid ${server.pid})`);
}
const stopServer = () => { if (server && server.exitCode === null) server.kill(); };
process.on("SIGINT", () => { stopServer(); process.exit(130); });
process.on("exit", stopServer);

/* ------------------------------------------------------------- the runs */
// Screen matrix (design audit §10 + the master pass): id → env for
// ux-measure.mjs (VW/VH/UA/THEME/MOTION). 1440/1920 are S10-6's own rows.
const LAYOUTS = {
  "1363x936-light-desktop": { VW: 1363, VH: 936 },
  "1363x936-dark-desktop": { VW: 1363, VH: 936, THEME: "dark" },
  "1363x936-light-reduce-desktop": { VW: 1363, VH: 936, MOTION: "reduce" },
  "390x844-light-phone": { VW: 390, VH: 844, UA: "phone" },
  "390x844-dark-phone": { VW: 390, VH: 844, UA: "phone", THEME: "dark" },
  "320x568-light-phone": { VW: 320, VH: 568, UA: "phone" },
  "682x468-zoom200-desktop": { VW: 682, VH: 468 },
  "390x844-light-desktop": { VW: 390, VH: 844 },
  "320x568-light-desktop": { VW: 320, VH: 568 },
  "1440x900-light-desktop": { VW: 1440, VH: 900 },
  "1920x1080-light-desktop": { VW: 1920, VH: 1080 },
};
const UXM_1363 = path.join(RUNS_DIR, "ux-measure.1363x936-light-desktop.json");
const node = (...a) => ["node", ...a];
const RUNS = [];
for (const [id, env] of Object.entries(LAYOUTS)) RUNS.push({ id: `ux-measure.${id}`, cmd: node("scripts/qa/ux-measure.mjs"), env: { ...env, OUT: path.join(RUNS_DIR, `ux-measure.${id}.json`), SHOTS: path.join(SHOTS_DIR, `ux-measure.${id}`) }, outFile: path.join(RUNS_DIR, `ux-measure.${id}.json`) });
for (const [id, env] of Object.entries(LAYOUTS)) {
  // clip-check always runs with reducedMotion and takes no VH: the reduce
  // layout is the light one for it; 1440/1920 are not in the audit's clip list.
  if (env.MOTION || env.VW >= 1440) continue;
  const e = { VW: env.VW, ...(env.UA ? { UA: env.UA } : {}), ...(env.THEME ? { THEME: env.THEME } : {}) };
  RUNS.push({ id: `clip-check.${id}`, cmd: node("scripts/qa/clip-check.mjs"), env: { ...e, OUT: path.join(RUNS_DIR, `clip-check.${id}.json`) }, outFile: path.join(RUNS_DIR, `clip-check.${id}.json`) });
}
for (const [id, env] of [["1363-light", { VW: 1363 }], ["1363-dark", { VW: 1363, THEME: "dark" }], ["390-light", { VW: 390 }], ["390-dark", { VW: 390, THEME: "dark" }]])
  RUNS.push({ id: `axe-sweep.${id}`, cmd: node("scripts/qa/axe-sweep.mjs"), env: { ...env, OUT: path.join(RUNS_DIR, `axe-sweep.${id}.json`) }, outFile: path.join(RUNS_DIR, `axe-sweep.${id}.json`) });
for (const vw of [1363, 390])
  RUNS.push({ id: `keyboard-check.${vw}`, cmd: node("scripts/qa/keyboard-check.mjs"), env: { VW: vw, OUT: path.join(RUNS_DIR, `keyboard-check.${vw}.json`) }, outFile: path.join(RUNS_DIR, `keyboard-check.${vw}.json`) });
for (const theme of ["light", "dark"])
  RUNS.push({ id: `a11y-sample.${theme}`, cmd: node("scripts/qa/a11y-sample.mjs"), env: { ...(theme === "dark" ? { THEME: "dark" } : {}), OUT: path.join(RUNS_DIR, `a11y-sample.${theme}.json`), ROUTES_FROM: () => (existsSync(UXM_1363) ? UXM_1363 : "audit/ux-2026-09/after-measurements.round6.json") }, outFile: path.join(RUNS_DIR, `a11y-sample.${theme}.json`) });
RUNS.push(
  { id: "type-profile", cmd: node("scripts/qa/type-profile.mjs"), env: { OUT: path.join(RUNS_DIR, "type-profile.json") }, outFile: path.join(RUNS_DIR, "type-profile.json") },
  { id: "bidi-scan", cmd: node("scripts/qa/bidi-scan.mjs"), env: { OUT: path.join(RUNS_DIR, "bidi-scan.json") }, outFile: path.join(RUNS_DIR, "bidi-scan.json") },
  { id: "shelf-check", cmd: node("scripts/qa/shelf-check.mjs") },
  { id: "dock-check", cmd: node("scripts/qa/dock-check.mjs") },
  { id: "module-colour-check", cmd: node("scripts/qa/module-colour-check.mjs") },
  { id: "status-consistency", cmd: node("scripts/qa/status-consistency.mjs") },
  { id: "present-check", cmd: node("scripts/qa/present-check.mjs"), env: { SHOTS: path.join(SHOTS_DIR, "present-check") } },
  { id: "open-rows-check", cmd: node("scripts/qa/open-rows-check.mjs"), env: { SHOTS: path.join(SHOTS_DIR, "open-rows-check") } },
  { id: "sticky-depth-check", cmd: node("scripts/qa/sticky-depth-check.mjs") },
  { id: "r3-check", cmd: node("scripts/qa/r3-check.mjs") },
  { id: "r3b-check", cmd: node("scripts/qa/r3b-check.mjs") },
  { id: "r3c-check", cmd: node("scripts/qa/r3c-check.mjs") },
  { id: "r3d-check", cmd: node("scripts/qa/r3d-check.mjs") },
  { id: "round6-misc-check", cmd: node("scripts/qa/round6-misc-check.mjs") },
  { id: "catalog-cards-check", cmd: node("scripts/qa/catalog-cards-check.mjs") },
  { id: "erd-selection-check", cmd: node("scripts/qa/erd-selection-check.mjs") },
  { id: "ai-states-check", cmd: node("scripts/qa/ai-states-check.mjs") },
  { id: "crawl-dead-links", cmd: node("scripts/crawl-dead-links.mjs"), json: false },
  { id: "verify-reader", cmd: node("--experimental-strip-types", "--no-warnings", "scripts/verify-reader.mjs"), json: false },
  { id: "static-fetch", inProcess: true },
);

// Wording / markup assertions the matrix verified with curl or grep; fetched
// from the served export, plus one grep over the JS chunks (client-only text).
const STATIC = [
  { id: "S7-HOME-5", url: "/neo/", exclude: [/1[01] ספרים/] },
  { id: "S7-READ-1", url: "/neo/s4-readiness/", include: ["כיסוי תיעוד למעבר", "אומדן"], exclude: ["מוכנות כוללת"] },
  { id: "S7-AC-2", url: "/neo/academy/", include: ["לא נרשמה התקדמות במכשיר הזה"] },
  { id: "S9-2", url: "/neo/academy/pm/", include: ["עדיין לא התחלת את הקורס"] },
  { id: "S9-4.bapi", url: "/neo/bapi/", exclude: ["לא צוין במאגר"] },
  { id: "S9-4.fiori", url: "/neo/fiori-apps/", exclude: ["לא צוין במאגר"] },
  { id: "S9-4.cds", url: "/neo/cds/", exclude: ["לא צוין במאגר"] },
  { id: "S9-4.bapi-detail", url: "/neo/bapi/BAPI_ALM_CONF_CREATE/", include: ["לא מתועד במאגר"], exclude: ["לא צוין במאגר"] },
  { id: "S9-5", url: "/neo/tables/AFKO/", include: ["אימות ומקורות"], exclude: ["מקור הנתונים"] },
  { id: "S7-TBL-2", url: "/neo/tables/AFKO/", include: ["nxb-cta-note"] },
  { id: "S4-2", url: "/neo/bapi/BAPI_ALM_CONF_CREATE/", include: ["nxt-codeline", "nx-copy"] },
  { id: "S7-CAT-1", url: "/neo/tables/", include: ["nxd-stats--after"] },
  { id: "S7-CERT-1", url: "/neo/certification/", include: ["תרגול ובדיקת ידע", "זו אינה תוכנית הסמכה רשמית של SAP"] },
  { id: "S7-KN-2", url: "/neo/centers/toolkit/qa-template/", include: ["העתק תבנית"] },
  { id: "S8-1", url: "/neo/academy/mm/", exclude: ['href="/academy/lesson/'], include: ['href="/neo/academy/mm/'] },
  { id: "S9-6", chunks: "התחל לקרוא. המיקום יישמר במכשיר הזה" },
];
async function staticFetch() {
  const results = [];
  for (const s of STATIC) {
    if (s.chunks) {
      const dir = "out/_next/static/chunks"; let hit = null;
      const walk = (d) => { for (const n of readdirSync(d, { withFileTypes: true })) { const p = path.join(d, n.name); if (n.isDirectory()) walk(p); else if (!hit && n.name.endsWith(".js") && readFileSync(p, "utf8").includes(s.chunks)) hit = p; } };
      try { walk(dir); } catch (e) { results.push({ id: s.id, ok: false, error: e.message }); continue; }
      results.push({ id: s.id, ok: !!hit, chunk: hit, needle: s.chunks });
      continue;
    }
    let html = "", status = 0;
    try { const r = await fetch(BASE + s.url, { signal: AbortSignal.timeout(15000) }); status = r.status; html = await r.text(); } catch (e) { results.push({ id: s.id, url: s.url, ok: false, error: e.message }); continue; }
    const has = (n) => (n instanceof RegExp ? n.test(html) : html.includes(n));
    const missing = (s.include || []).filter((n) => !has(n)), present = (s.exclude || []).filter((n) => has(n)).map(String);
    const counts = Object.fromEntries([...(s.include || []), ...(s.exclude || [])].filter((n) => typeof n === "string").map((n) => [n, html.split(n).length - 1]));
    results.push({ id: s.id, url: s.url, status, ok: status === 200 && !missing.length && !present.length, missing, present, counts });
  }
  return { base: BASE, checkedAt: new Date().toISOString(), results };
}

/* --------------------------------------------------------------- runner */
const runs = {};
const parseStdoutJson = (text) => {
  const lines = text.split("\n");
  const start = lines.findIndex((l) => l === "{" || l === "[");
  let end = -1; for (let i = lines.length - 1; i >= 0; i--) if (lines[i] === "}" || lines[i] === "]") { end = i; break; }
  if (start < 0 || end <= start) return null;
  try { return JSON.parse(lines.slice(start, end + 1).join("\n")); } catch { return null; }
};
const resolveEnv = (env = {}) => Object.fromEntries(Object.entries(env).map(([k, v]) => [k, String(typeof v === "function" ? v() : v)]));
const loadJson = (r, stdout) => {
  if (r.json === false) return null;
  if (r.outFile) { try { return JSON.parse(readFileSync(r.outFile, "utf8")); } catch { return null; } }
  return parseStdoutJson(stdout);
};
async function execute(r) {
  const env = resolveEnv(r.env);
  if (env.SHOTS) mkdirSync(env.SHOTS, { recursive: true });
  const t0 = Date.now();
  process.stdout.write(`▶ ${r.id.padEnd(40)} `);
  let exit, stdout = "", stderr = "";
  if (r.inProcess) {
    try { const j = await staticFetch(); stdout = JSON.stringify(j, null, 2); exit = j.results.every((x) => x.ok) ? 0 : 1; } catch (e) { stderr = String(e.stack || e); exit = 1; }
  } else {
    const child = spawn(r.cmd[0], r.cmd.slice(1), { cwd: ROOT, env: { ...process.env, NEO_BASE: BASE, ...env }, stdio: ["ignore", "pipe", "pipe"], timeout: TIMEOUT_MS, killSignal: "SIGKILL" });
    child.stdout.on("data", (d) => (stdout += d)); child.stderr.on("data", (d) => (stderr += d));
    exit = await new Promise((res) => child.on("close", (code, sig) => res(code ?? (sig === "SIGKILL" ? 124 : 1))));
  }
  const seconds = Math.round((Date.now() - t0) / 100) / 10;
  writeFileSync(path.join(RUNS_DIR, `${r.id}.stdout.log`), stdout);
  writeFileSync(path.join(RUNS_DIR, `${r.id}.stderr.log`), stderr);
  const json = loadJson(r, stdout);
  runs[r.id] = { id: r.id, script: r.inProcess ? "astra-reverify.mjs (fetch)" : r.cmd.join(" "), env, exit, seconds, outFile: r.outFile ? rel(r.outFile) : rel(path.join(RUNS_DIR, `${r.id}.stdout.log`)), stdout, stderr, json };
  console.log(`exit ${exit}${exit === 124 ? " (timeout)" : ""} · ${seconds}s${json ? "" : r.json === false ? "" : " · NO JSON"}`);
}
const INDEX = path.join(RUNS_DIR, "index.json");
const selected = ONLY.length ? RUNS.filter((r) => ONLY.some((s) => r.id.includes(s))) : RUNS;
const T0 = Date.now();
if (EVAL_ONLY || ONLY.length) {
  // keep what the last run recorded for everything not re-run now
  try { for (const rec of JSON.parse(readFileSync(INDEX, "utf8"))) runs[rec.id] = { ...rec, stdout: existsSync(path.join(RUNS_DIR, `${rec.id}.stdout.log`)) ? readFileSync(path.join(RUNS_DIR, `${rec.id}.stdout.log`), "utf8") : "", stderr: "", json: null }; } catch { /* first run */ }
  for (const rec of Object.values(runs)) { const def = RUNS.find((r) => r.id === rec.id); if (def) rec.json = loadJson(def, rec.stdout); }
}
if (!EVAL_ONLY) for (const r of selected) await execute(r);
writeFileSync(INDEX, JSON.stringify(Object.values(runs).map(({ stdout, stderr, json, ...rec }) => rec), null, 1));
stopServer();

/* ------------------------------------------------------------ evaluators */
const J = (id) => runs[id]?.json ?? null;
const X = (id) => runs[id]?.exit;
const uxm = (layout) => J(`ux-measure.${layout}`)?.results ?? null;
const byId = (res, id) => res?.find((r) => r.id === id) ?? null;
const ovText = (res) => { const bad = res.filter((r) => r.error || r.pageOverflow > 0 || r.canvasOverflow > 0); return { ok: !bad.length, text: `${res.length - bad.length}/${res.length} routes 0 overflow` + (bad.length ? " · " + bad.slice(0, 4).map((r) => `${r.id}${r.error ? " ERR" : ` page+${r.pageOverflow} canvas+${r.canvasOverflow}`}`).join(", ") : "") }; };
const dimText = (res) => { const bad = res.filter((r) => r.error || r.dimVisible > 0); return { ok: !bad.length, text: `${res.length - bad.length}/${res.length} routes 0 dim` + (bad.length ? " · " + bad.slice(0, 4).map((r) => `${r.id} dim=${r.dimVisible} minOp=${r.minVisibleOpacity}`).join(", ") : "") }; };
const errText = (res) => { const bad = res.filter((r) => r.error || r.consoleErrors > 0); return { ok: !bad.length, text: `${bad.length} routes with console errors` + (bad.length ? ` (${bad.slice(0, 4).map((r) => r.id).join(",")})` : "") }; };
const layoutClean = (layout) => { const res = uxm(layout); if (!res) return null; const o = ovText(res), d = dimText(res), e = errText(res); return { ok: o.ok && d.ok && e.ok, text: `${layout}: ${o.text}; ${d.text}; ${e.text}` }; };
const clipText = (layout) => { const res = J(`clip-check.${layout}`)?.results; if (!res) return null; const bad = res.filter((r) => r.clipped > 0 || r.status !== 200); return { ok: !bad.length, text: `clip ${layout}: ${res.length - bad.length}/${res.length} routes 0 clipped` + (bad.length ? " · " + bad.slice(0, 3).map((r) => `${r.url} ${r.clipped}`).join(", ") : "") }; };
const stat = (id) => J("static-fetch")?.results?.find((r) => r.id === id) ?? null;
const statText = (id) => { const s = stat(id); if (!s) return { ok: false, text: `${id}: not fetched` }; return { ok: s.ok, text: s.error ? `${s.url ?? ""} ${s.error}` : s.chunk !== undefined ? (s.ok ? `wording present in ${path.basename(s.chunk)}` : "wording not found in out/_next/static/chunks") : `${s.url} http ${s.status}` + (s.missing?.length ? ` missing ${JSON.stringify(s.missing)}` : "") + (s.present?.length ? ` still present ${JSON.stringify(s.present)}` : "") + (s.ok ? " ok" : "") }; };
const stdoutMatch = (id, re) => (runs[id]?.stdout || "").match(re)?.[0] ?? null;

// Guidance rows: nothing a script can measure.
const NOT_MEASURABLE = {
  INS: "guidance row (הנחיות לקלוד), nothing to measure",
  SCOPE: "scope row, nothing to measure",
  KEEP: "preserve row, nothing to measure",
  PRIO: "priority row mapped to S-rows, nothing to measure",
  SAP: "SAP fact row; verified by curl/screenshot assertions whose strings are not recorded as a script (SAP-FIXES.md)",
};
const NM_ROWS = {
  "S12-R1": "round summary row (commit references)", "S12-R2": "round summary row (commit references)", "S12-R3": "round summary row", "S12-REC": "round summary row",
  "S7-3D-1": "no 3D view in this repo; the Preview is blocked by Vercel Authentication",
  "S7-AI-6": "manual live AI test (paid external service), by design not automated",
  "S7-LIB-1": "preserve row (frozen Library surface)",
  "S7-LIB-3": "conditional UI on a saved reading position; no QA script",
  "S7-AI-3": "limits column / advisory presence not scripted",
  "S7-HOME-3": "one-sentence opener is editorial; no QA script",
  "S7-CAT-4": "shared ref-surface order across 7 catalogs not scripted",
  "S7-CAT-8": "same toolbar order across 7 catalogs not scripted",
  "S7-TBL-3": "source-code UI-string scan (→ S9-1), not a served-export measurement",
  "S9-1": "source-code UI-string scan, not a served-export measurement",
  "S7-ERD-2": "resize → refit was a round-1 ad-hoc interaction run; no script in scripts/qa",
  "APPX-4": "opening-vs-fit state was a round-1 ad-hoc interaction run; no script",
  "S11-1": "round-1 ad-hoc interaction run (tables search); no script in scripts/qa",
  "S11-2": "round-1 ad-hoc interaction run (empty state); no script in scripts/qa",
  "S11-3": "round-1 ad-hoc interaction run (section chip); no script in scripts/qa",
  "S11-4": "round-1 ad-hoc interaction run (object lanes); no script in scripts/qa",
  "S11-5": "round-1 ad-hoc interaction run (key 0 fit); no script in scripts/qa",
  "S8-2": "product/dataset decision (NOT_IN_DATASET), nothing to measure",
  "ACC-6": "product decision (legacy shell kept on purpose); partial by design",
};

// Measured rows: id → scripts (run ids) + test(): [pass, evidence].
const ROWS = {
  "S3-1": { scripts: ["r3d-check", "r3c-check"], test: () => { const d = J("r3d-check"), c = J("r3c-check"); const f = d.focus, e = d.focusAfterEsc; const ok = !f.rail && !f.top && !f.dock && f.exitBtn && e.rail && e.top && c.shellFocusOn.focus === "1" && c.studioFocusOn.focus === "1" && c.shellAfterEsc.focus == null; return [ok, `focus: rail=${f.rail} top=${f.top} dock=${f.dock} exit=${f.exitBtn} → Esc rail=${e.rail} top=${e.top}; r3c erd focus=${c.shellFocusOn.focus} studio=${c.studioFocusOn.focus} reader=${c.readerFocusOn?.focus ?? "n/a"}; errs ${d.consoleErrors}+${c.consoleErrors}`]; } },
  // Acceptance: the empty shelf is one row (≤ 40px; 34px in round 3.1). The
  // "tabs return with the first item" half is outside shelf-check's reach: a
  // direct goto to /neo/tables/AFKO/ records no recent object (only a catalog
  // click fires neo:nx:object, at round 3.1 and at HEAD alike), so that probe
  // is reported, not judged.
  "S3-2": { scripts: ["shelf-check"], test: () => { const s = J("shelf-check"); const ok = !!s.fresh && s.fresh.empty === "1" && s.fresh.h <= 40 && !s.fresh.tabsVisible && s.consoleErrors === 0; return [ok, `fresh shelf: one row h=${s.fresh?.h}px (≤40; 34 in round 3.1) empty=${s.fresh?.empty} tabs=${s.fresh?.tabsVisible}; errs ${s.consoleErrors}; after direct goto AFKO: empty=${s.afterOpeningAFKO?.empty} tabs=${s.afterOpeningAFKO?.tabsVisible} (not judged: direct navigation never records a recent object, only a catalog click does)`]; } },
  "S3-3": { scripts: ["dock-check"], test: () => { const d = J("dock-check"); return [X("dock-check") === 0, `bar controls=${d.bar?.length} theme radio=${d.panel?.theme} faces=${d.panel?.faces} sizes=${d.panel?.sizes}; after 'לילה': theme=${d.after?.theme} state=${d.after?.barState}; errs ${d.consoleErrors}`]; } },
  "S4-1": { scripts: ["type-profile"], test: () => {
    const rows = J("type-profile").rows; const h1 = (u) => rows.find((r) => r.url === u)?.h1px, sm = (u) => rows.find((r) => r.url === u)?.small;
    const detail = ["/neo/tables/AFKO/", "/neo/transactions/IP30/", "/neo/bapi/BAPI_ALM_CONF_CREATE/", "/neo/domain/pm-functional-locations/", "/neo/s4hana/", "/neo/centers/", "/neo/object/MARA/"];
    const shares = { "/neo/tables/": 9, "/neo/transactions/": 22, "/neo/bapi/": 0, "/neo/cds/": 4, "/neo/fiori-apps/": 5, "/neo/academy/": 17 };
    // Work screens = the seven catalogs round 6 moved 44→36 (type-profile.{before,after}.json).
    // /neo/pm/ and /neo/pp-pi/ are module heroes (56.3px before and after round 6), reported only.
    const workUrls = ["/neo/tables/", "/neo/transactions/", "/neo/bapi/", "/neo/idoc/", "/neo/cds/", "/neo/fiori-apps/", "/neo/enhancements/"];
    const gate = Math.abs((h1("/neo/") ?? 0) - 86.6) <= 1, work = workUrls.every((u) => h1(u) != null && h1(u) >= 28 && h1(u) <= 36), det = detail.every((u) => h1(u) != null && h1(u) <= 40), sh = Object.entries(shares).every(([u, max]) => sm(u) != null && sm(u) <= max);
    return [gate && work && det && sh, `h1 gate=${h1("/neo/")}px (86.6) work=${workUrls.map((u) => h1(u)).join("/")}px (28–36; module heroes pm/pp-pi ${h1("/neo/pm/")}/${h1("/neo/pp-pi/")}px as in round 6) detail=${detail.map((u) => h1(u)).join("/")}px (≤40); prose<13px ${Object.entries(shares).map(([u, m]) => `${u.split("/")[2]}=${sm(u)}%(≤${m})`).join(" ")}`]; } },
  "S4-2": { scripts: ["static-fetch", "catalog-cards-check"], test: () => { const s = statText("S4-2"), c = J("catalog-cards-check").cat6?.detail; return [s.ok && !!c?.copy, `BAPI page: ${s.text}; Fiori detail copy button=${c?.copy} code=${c?.code}`]; } },
  "S4-3": { scripts: ["bidi-scan"], test: () => { const rep = J("bidi-scan").report; const errs = rep.filter((r) => r.error), lat = rep.reduce((a, r) => a + (r.candidates || 0), 0), non = rep.reduce((a, r) => a + (r.nonIsolated || 0), 0), hits = rep.reduce((a, r) => a + (r.hits || 0), 0); return [!errs.length && non === 0 && hits === 0, `${rep.length} routes: latin=${lat} nonIsolated=${non} orderSensitive=${hits}${errs.length ? ` errors=${errs.length}` : ""}`]; } },
  "S5-1": { scripts: ["module-colour-check"], test: () => { const t = J("module-colour-check").themes; const l = t.light, d = t.dark; return [X("module-colour-check") === 0 && l.ok && d.ok, `light: ${Object.keys(l.modules).length} module tokens, ${l.inconsistent.length} inconsistent, ${l.collisions.length} collisions; dark: ${Object.keys(d.modules).length}, ${d.inconsistent.length}, ${d.collisions.length}`]; } },
  "S5-2": { scripts: ["status-consistency"], test: () => { const s = J("status-consistency"); const n = s.results.length, same = s.results.filter((r) => r.same).length; return [s.fails === 0 && s.consoleErrors === 0, `${n} records: ${same} same across list/detail/ERD/palette, ${s.fails} contradictions, errs ${s.consoleErrors}`]; } },
  "S5-3": { scripts: ["status-consistency"], test: () => { const s = J("status-consistency"); const g = s.results.filter((r) => r.glyphs).length; return [g === s.results.length && s.fails === 0, `${g}/${s.results.length} records: every canonical pill carries glyph+word`]; } },
  "S6-1": { scripts: ["ux-measure.1363x936-light-desktop"], test: () => { const d = dimText(uxm("1363x936-light-desktop")); return [d.ok, d.text + " (1363 light)"]; } },
  "S6-2": { scripts: ["ux-measure.1363x936-light-desktop", "ux-measure.1440x900-light-desktop"], test: () => { const a = ovText(uxm("1363x936-light-desktop")), b = uxm("1440x900-light-desktop") ? ovText(uxm("1440x900-light-desktop")) : null; const r = (id) => byId(uxm("1363x936-light-desktop"), id); return [a.ok && (!b || b.ok), `1363: ${a.text} (cockpit canvas+${r("cockpit")?.canvasOverflow} domain-floc+${r("domain-floc")?.canvasOverflow} s4-center+${r("s4-center")?.canvasOverflow}); 1440: ${b ? b.text : "not run"}`]; } },
  "S6-3": { scripts: ["present-check"], test: () => { const p = J("present-check"); return [p.erd.ok && p.studio.ok && p.consoleErrors === 0, `ERD present=${p.erd.on.present} focus=${p.erd.on.focus} legend=${p.erd.on.legendItems} zoom=${p.erd.on.zoom} xs ${p.erd.before.xs}→${p.erd.on.xs} Esc→present=${p.erd.after.present}; Studio present=${p.studio.present.present} focus=${p.studio.present.focus} zoom=${p.studio.present.zoom} exit=${p.studio.exit}; errs ${p.consoleErrors}`]; } },
  "S6-4": { scripts: ["open-rows-check"], test: () => { const o = J("open-rows-check"); const parts = []; let ok = true; for (const th of ["light", "dark"]) { const r = o[`erd-phone-${th}`]; const ov = r.steps.every((s) => s.ov && s.ov.page === 0 && s.ov.canvas === 0); const s0 = r.steps[0], s1 = r.steps[1], s3 = r.steps.find((s) => s.at === "selected"); const good = !r.error && r.consoleErrors === 0 && ov && s0.rows > 0 && s0.rowH >= 44 && s0.stageVisible === false && s1?.stageVisible === true; ok &&= good; parts.push(`${th}: list ${s0.rows} rows ${s0.rowH}px stage=${s0.stageVisible} → map ${s1?.zoom ?? "-"} → module ${r.steps[2]?.zoom ?? "-"} → card ${s3?.zoom ?? "-"}, overflow ${ov ? 0 : "!"}, errs ${r.consoleErrors}${r.error ? " ERR " + r.error.slice(0, 60) : ""}`); } return [!!ok, parts.join("; ")]; } },
  "S7-HOME-1": { scripts: ["ux-measure.1363x936-light-desktop"], test: () => { const h = byId(uxm("1363x936-light-desktop"), "home"); return [h && !h.error && h.contentH <= 4000, `/neo/ contentH=${h?.contentH}px (≤4,000)`]; } },
  "S7-HOME-2": { scripts: ["r3d-check"], test: () => { const h = J("r3d-check").home; return [h.every(([, v]) => v), `${h.filter(([, v]) => v).length}/${h.length} home actions present: ${h.map(([t, v]) => `${t}=${v ? 1 : 0}`).join(" ")}`]; } },
  "S7-HOME-4": { scripts: ["present-check"], test: () => { const h = J("present-check").home; return [h.ok, `${h.count} gate metrics, ${h.links} links: ${h.items.map((i) => `${i.n}→${i.href}`).join(" ")}`]; } },
  "S7-HOME-5": { scripts: ["static-fetch"], test: () => { const s = statText("S7-HOME-5"); return [s.ok, `/neo/ has no '1[01] ספרים' count: ${s.text}`]; } },
  "S7-PM-1": { scripts: ["r3b-check"], test: () => { const b = J("r3b-check"); return [b.pm.closed >= 4 && b.pmAnchor === "open" && b.consoleErrors === 0, `/neo/pm/ chapters closed=${b.pm.closed} open=${b.pm.open}, #nw-if anchor → ${b.pmAnchor}, canvasH=${b.pm.canvasH}px (was 16,707); errs ${b.consoleErrors}`]; } },
  "S7-PM-2": { via: "S7-PM-1" }, "S7-PM-3": { via: "S7-PM-1" },
  "S7-PM-4": { scripts: ["r3-check"], test: () => { const r = J("r3-check"); return [r.topicCta.visible > 0 && /\d+ טבלאות/.test(r.topicCta.text || "") && r.afterCtaTableTop != null && r.afterCtaTableTop >= 0 && r.afterCtaTableTop < 936, `topic CTA '${r.topicCta.text}', table top after click=${r.afterCtaTableTop}px (<936)`]; } },
  "S7-PM-5": { scripts: ["sticky-depth-check"], test: () => { const s = J("sticky-depth-check"); const tops = (k) => `${k} rail@[${s[k].noFilter.map((x) => x.rail?.top).join(",")}] filter@[${s[k].withFilter.map((x) => x.rail?.top).join(",")}]`; return [X("sticky-depth-check") === 0 && s.desktop.ok && s.phone.ok, `${tops("desktop")}; ${tops("phone")}; errs ${s.desktop.consoleErrors}+${s.phone.consoleErrors}`]; } },
  "S7-DOM-1": { scripts: ["r3-check"], test: () => { const d = J("r3-check").domains; return [d.before > 0 && d.afterQuery < d.before && !!d.countLine && !!d.emptyText, `domains ${d.before}→${d.afterQuery} for 'ציוד', count line '${d.countLine}', empty state=${!!d.emptyText}`]; } },
  "S7-DOM-2": { scripts: ["open-rows-check"], test: () => { const o = J("open-rows-check"); const w = [390, 1363, 1440, 1920].map((x) => o[`dom-${x}`]); const ok = w.every((m) => m && m.steps === 5 && m.chainId && m.ov.page === 0 && m.ov.canvas === 0 && m.consoleErrors === 0) && w[0].rows === 3 && w.slice(1).every((m) => m.rows === 1); return [ok, `steps ${w.map((m) => m?.steps).join("/")}, rows 390=${w[0]?.rows} 1363=${w[1]?.rows} 1440=${w[2]?.rows} 1920=${w[3]?.rows}, em ${w[1]?.emFont}, chain link=${w[1]?.chainId}, overflow ${w.map((m) => m?.ov.page + m?.ov.canvas).join("/")}`]; } },
  "S7-S4C-1": { scripts: ["r3b-check"], test: () => { const b = J("r3b-check"); return [b.s4.tools && b.s4.actions > 0 && !!b.s4Filtered, `/neo/s4hana/ tools=${b.s4.tools} groups ${b.s4.groups.join(" ")} actions=${b.s4.actions} filter 'השתנה' → '${b.s4Filtered}' canvasH=${b.s4.canvasH}px (was 11,465)`]; } },
  "S7-READ-1": { scripts: ["static-fetch"], test: () => { const s = statText("S7-READ-1"); return [s.ok, s.text]; } },
  "S7-COCK-1": { scripts: ["ux-measure.1363x936-light-desktop"], test: () => { const c = byId(uxm("1363x936-light-desktop"), "cockpit"); return [c && !c.error && c.pageOverflow === 0 && c.canvasOverflow === 0, `cockpit 1363: page+${c?.pageOverflow} canvas+${c?.canvasOverflow} (was +208) canvasW=${c?.canvasW}`]; } },
  "S7-COCK-2": { scripts: ["r3b-check"], test: () => { const b = J("r3b-check"); return [!!b.cockpitAnchor?.detailsOpen && !!b.cockpitAnchor?.isTarget, `#${b.cockpit.closedWaveTarget}: details open=${b.cockpitAnchor?.detailsOpen} :target=${b.cockpitAnchor?.isTarget} top=${b.cockpitAnchor?.top}`]; } },
  "S7-COCK-3": { scripts: ["ux-measure.390x844-light-phone"], test: () => { const c = byId(uxm("390x844-light-phone"), "cockpit"); return [c && !c.error && c.pageOverflow === 0 && c.canvasOverflow === 0 && c.consoleErrors === 0, `cockpit 390 phone: page+${c?.pageOverflow} canvas+${c?.canvasOverflow} errs ${c?.consoleErrors}`]; } },
  "S7-COCK-4": { scripts: ["r3b-check"], test: () => { const b = J("r3b-check"); return [!!b.cockpit.closedWaveTarget && b.cockpit.canvasH <= 8900, `cockpit canvasH=${b.cockpit.canvasH}px (8,104 after round 3.3, ≤8,900; was 12,624), closed wave present=${!!b.cockpit.closedWaveTarget}`]; } },
  "S7-CAT-1": { scripts: ["r3-check", "static-fetch"], test: () => { const r = J("r3-check"), s = statText("S7-CAT-1"); return [(r.tablesEmpty || "").includes("נסה חיפוש אחר") && s.ok, `empty state '${r.tablesEmpty}'; ${s.text}`]; } },
  "S7-CAT-2": { scripts: ["catalog-cards-check"], test: () => { const c = J("catalog-cards-check").cat2; return [c.ok, `${c.rows} tx rows, chips max ${c.maxChips} avg ${c.avgChips}, refs chip=${c.popChip}, ${c.statusPills}/${c.rows} canonical pills`]; } },
  "S7-CAT-3": { scripts: ["catalog-cards-check"], test: () => { const c = J("catalog-cards-check").cat3; return [c.ok, `${c.rows} function rows, ${c.withOp} with operation chip, ${c.withCommit} with COMMIT chip`]; } },
  "S7-CAT-5": { scripts: ["catalog-cards-check"], test: () => { const c = J("catalog-cards-check").cat5; return [c.ok, `${c.list}: chain=${c.detail.chain} from ${c.detail.from} via ${c.detail.via} to ${c.detail.to}, copy ${c.detail.preCopy}/${c.detail.pre} code blocks`]; } },
  "S7-CAT-6": { scripts: ["catalog-cards-check"], test: () => { const c = J("catalog-cards-check").cat6; return [c.ok, `${c.leadRows}/${c.rows} Fiori rows name-first; detail h1='${(c.detail?.h1 || "").slice(0, 30)}' code=${c.detail?.code}`]; } },
  "S7-CAT-7": { scripts: ["catalog-cards-check"], test: () => { const c = J("catalog-cards-check").cat7; return [c.ok, `enhancements table: ${c.rows} rows, ${c.cols} cols, ${c.pills} pills, ${c.links} links, overflow-x ${c.overflowX}`]; } },
  "S7-TBL-1": { scripts: ["catalog-cards-check"], test: () => { const t = J("catalog-cards-check").tbl; return [t.fieldsTop != null && t.screens <= 1.5, `AFKO fields section at ${t.fieldsTop}px = ${t.screens} screens (≤1.5; was 2.3); nav ${t.navOrder.slice(0, 3).join(" · ")}`]; } },
  "S7-TBL-2": { scripts: ["static-fetch"], test: () => { const s = statText("S7-TBL-2"); return [s.ok, `nxb-cta-note on /neo/tables/AFKO/: ${s.text}`]; } },
  "S7-TBL-4": { scripts: ["catalog-cards-check"], test: () => { const t = J("catalog-cards-check").tbl; return [!!t.headerStatus && t.headerStatusTop < t.evidenceTop, `header pill '${t.headerStatus}' at ${t.headerStatusTop}px < evidence block ${t.evidenceTop}px`]; } },
  "S7-ERD-1": { scripts: ["ux-measure.1363x936-light-desktop", "clip-check.1363x936-light-desktop"], test: () => { const e = byId(uxm("1363x936-light-desktop"), "erd"); const c = J("clip-check.1363x936-light-desktop")?.results?.find((r) => r.url === "/neo/erd/"); return [e && !e.error && /^\d+%$/.test(e.zoom || "") && c && c.clipped === 0, `ERD opens at zoom ${e?.zoom} (fit), clipped=${c?.clipped}, overflow page+${e?.pageOverflow} canvas+${e?.canvasOverflow}`]; } },
  "S7-ERD-3": { scripts: ["r3c-check"], test: () => { const o = J("r3c-check").erdOverview; return [o.inspW != null && o.inspW <= 310, `overview inspector ${o.inspW}px (≤310; 19rem), level=${o.level}`]; } },
  "S7-ERD-4": { scripts: ["erd-selection-check"], test: () => { const e = J("erd-selection-check"); const k = ["desktop:AFKO", "desktop:EQUI", "phone:AFKO", "phone:EQUI"]; return [X("erd-selection-check") === 0 && k.every((x) => e[x]?.ok), k.map((x) => `${x} ${e[x]?.selected}/${e[x]?.edges} sel op ${e[x]?.selOpacity}/sw ${e[x]?.selStroke} vs ${e[x]?.otherOpacity}/${e[x]?.otherStroke}`).join("; ")]; } },
  "S7-ERD-5": { scripts: ["round6-misc-check"], test: () => { const e = J("round6-misc-check").erd5; return [e.ok, `#AFKO: ${e.sentences} sentences for ${e.joins} relations`]; } },
  "S7-ERD-6": { scripts: ["r3c-check"], test: () => { const c = J("r3c-check"); return [!!c.erdOverview.modeChip && !!c.erdModule.modeChip, `mode chip '${c.erdOverview.modeChip}' → '${c.erdModule.modeChip}'`]; } },
  "S7-STU-1": { scripts: ["present-check"], test: () => { const s = J("present-check").studio; return [s.ok, `start ${s.start.nodes} nodes / zoom ${s.start.zoom} / label ${s.start.labelOnScreen}px on screen (≥11), layer '${(s.start.layer || "").slice(0, 40)}'; all ${s.all.nodes} nodes @ ${s.all.zoom}`]; } },
  "S7-LIB-2": { scripts: ["round6-misc-check"], test: () => { const l = J("round6-misc-check").lib2; return [l.ok, `first cover top ${l.firstCoverTop}px (< ${l.vh}), coverage bar ${l.dictbarTop}px after it`]; } },
  "S7-LIB-4": { scripts: ["open-rows-check"], test: () => { const o = J("open-rows-check"); const p = o["books-phone"], d = o["books-desktop"]; const ok = [p, d].every((m) => m && m.details && m.open === false && m.openAfter === true && m.notes >= 3 && m.ov.page === 0 && m.ov.canvas === 0 && m.consoleErrors === 0) && p.sumH >= 44; return [ok, `coverage line '${(d?.line || "").slice(0, 40)}…', details closed→open ${p?.open}→${p?.openAfter}, ${p?.notes} notes, summary ${p?.sumH}px phone / ${d?.sumH}px desktop in view (layout ${p?.sumLayoutH}/${d?.sumLayoutH}px), overflow 0`]; } },
  "S7-LIB-5": { scripts: ["round6-misc-check"], test: () => { const l = J("round6-misc-check").lib5; return [l.ok, `basic bar: langs=${l.langs} size=${l.size} focus=${l.focus}, 'עוד' toggle=${l.toggle} closed=${!l.advOpen} → open ${l.after.advControls} advanced controls, aria-expanded=${l.after.expanded}`]; } },
  "S7-LIB-6": { scripts: ["round6-misc-check", "r3c-check"], test: () => { const l = J("round6-misc-check").lib5, c = J("r3c-check"); const rf = c.readerFocusOn; return [l.ok && !!rf && rf.focus === "1" && !rf.rail && !rf.dock, `advanced tools folded (${l.after.advControls} behind 'עוד'); reader focus: focus=${rf?.focus} rail=${rf?.rail} dock=${rf?.dock} top=${rf?.top}`]; } },
  "S7-LIB-7": { scripts: ["verify-reader", "ux-measure.1363x936-light-desktop", "ux-measure.390x844-light-phone"], test: () => { const m = stdoutMatch("verify-reader", /(\d+)\/(\d+) passed/); const a = byId(uxm("1363x936-light-desktop"), "reader"), b = byId(uxm("390x844-light-phone"), "reader"); const ok = X("verify-reader") === 0 && !!m && m.split("/")[0] === m.split("/")[1].split(" ")[0] && a && b && a.pageOverflow + a.canvasOverflow === 0 && b.pageOverflow + b.canvasOverflow === 0; return [ok, `verify-reader ${m ?? `exit ${X("verify-reader")}`}; /neo/read/book2/ overflow 1363=${a?.pageOverflow}+${a?.canvasOverflow} 390=${b?.pageOverflow}+${b?.canvasOverflow}`]; } },
  "S7-AI-1": { scripts: ["round6-misc-check"], test: () => { const r = J("round6-misc-check"); const ks = Object.keys(r).filter((k) => k.startsWith("ai1:")); return [ks.every((k) => r[k].ok), ks.map((k) => `${k.slice(4)} composer ${r[k].composerTop}px/${r[k].vh}`).join(", ")]; } },
  "S7-AI-2": { scripts: ["r3d-check"], test: () => { const d = J("r3d-check"); return [d.chatStarters <= 4 && d.libStarters <= 4, `starters chat=${d.chatStarters} library=${d.libStarters} (≤4)`]; } },
  "S7-AI-4": { scripts: ["round6-misc-check"], test: () => { const a = J("round6-misc-check").ai4; return [a.ok, `chat h1 '${a.chatH1}', dock '${a.dockBtn}', panel '${a.panel?.h2}', library h1 '${a.libH1}'`]; } },
  "S7-AI-5": { scripts: ["ai-states-check"], test: () => { const a = J("ai-states-check"); const n = a.results.length, ok = a.results.filter((r) => r.ok).length; return [a.fails === 0, `${ok}/${n} controlled AI-state scenarios ok (desktop+phone)${a.fails ? " · failed: " + a.results.filter((r) => !r.ok).map((r) => `${r.surface}/${r.kind}/${r.scenario}`).join(",") : ""}`]; } },
  "S7-KN-1": { scripts: ["open-rows-check"], test: () => { const k = J("open-rows-check").knowledge; return [k.slugAsPrimary === 0 && k.duplicatedTitles === 0 && k.consoleErrors === 0, `${k.rows} concept rows, ${k.duplicatedTitles} duplicated titles; /neo/knowledge/table/ refs=${k.refs.length} slug-as-primary=${k.slugAsPrimary}`]; } },
  "S7-KN-2": { scripts: ["static-fetch"], test: () => { const s = statText("S7-KN-2"); return [s.ok, `'העתק תבנית' on /neo/centers/toolkit/: ${s.text}`]; } },
  "S7-KN-3": { scripts: ["r3d-check"], test: () => { const g = J("r3d-check").gates; return [Object.values(g).every(Boolean), `nx-gate-note knowledge=${g.knowledge} centers=${g.centers} domains=${g.domains}`]; } },
  "S7-AC-1": { scripts: ["r3d-check"], test: () => { const a = J("r3d-check").academy; return [a.what && a.start, `'מה תלמד'=${a.what} 'התחלת הלמידה'=${a.start}`]; } },
  "S7-AC-2": { scripts: ["static-fetch"], test: () => { const s = statText("S7-AC-2"); return [s.ok, s.text]; } },
  "S7-AC-3": { scripts: ["r3d-check"], test: () => { const l = J("r3d-check").lesson; return [!!l && l.toc && l.blocks >= 5, `${J("r3d-check").lessonHref}: local TOC=${l?.toc} for ${l?.blocks} blocks`]; } },
  "S7-AC-4": { scripts: ["r3d-check"], test: () => { const l = J("r3d-check").lesson; return [!!l && l.exposure && !l.nikra && /נצפ/.test(l.readWord || ""), `exposure line=${l?.exposure}, read word '${l?.readWord}' on ${l?.viewed}/${l?.blocks} sections after scrolling the lesson (${l?.viewedBeforeScroll} before), 'נקראו' present=${l?.nikra}`]; } },
  "S7-AC-5": { via: "S7-AC-4" },
  "S7-CERT-1": { scripts: ["r3d-check", "static-fetch"], test: () => { const a = J("r3d-check").academy, s = statText("S7-CERT-1"); return [a.cert && s.ok, `academy link 'תרגול ובדיקת ידע'=${a.cert}; ${s.text}`]; } },
  "S7-CERT-2": { scripts: ["open-rows-check"], test: () => { const o = J("open-rows-check"); const p = o["cert-phone"], d = o["cert-desktop"]; const ok = [p, d].every((m) => m && m.pickers === 3 && !!m.ctaHref && m.details === 2 && m.detailsOpen === 0 && m.runner?.phase === "run" && m.runnerNoQuery !== "run" && m.ov.page === 0 && m.ov.canvas === 0 && m.consoleErrors === 0) && p.ctaH >= 44; return [ok, `pickers ${p?.pickers}, CTA ${p?.ctaH}px phone (≥44), details ${p?.details} closed ${p?.details - p?.detailsOpen}, ${p?.ctaHref2} → phase=${p?.runner?.phase} ${p?.runner?.count}, /exam/ direct → ${p?.runnerNoQuery}; overflow 0`]; } },
  "S7-INC-1": { scripts: ["r3d-check"], test: () => { const i = J("r3d-check").incident; return [i.ok, `cogi-stuck offsets sym=${i.sym} < fix=${i.fix} < s4=${i.s4} < scenario=${i.sc}`]; } },
  "S8-1": { scripts: ["crawl-dead-links", "static-fetch"], test: () => { const s = stat("S8-1"); const dead = stdoutMatch("crawl-dead-links", /\d+ dead[^\n]*/) ?? (X("crawl-dead-links") === 0 ? "0 dead" : `exit ${X("crawl-dead-links")}`); return [X("crawl-dead-links") === 0 && !!s?.ok, `crawl: ${dead}; /neo/academy/mm/: ${s?.counts?.['href="/academy/lesson/'] ?? "?"} hrefs to /academy/lesson/, ${s?.counts?.['href="/neo/academy/mm/'] ?? "?"} to /neo/academy/mm/`]; } },
  "S9-2": { scripts: ["static-fetch"], test: () => { const s = statText("S9-2"); return [s.ok, s.text]; } },
  "S9-3": { scripts: ["r3-check"], test: () => { const r = J("r3-check"); const t = (r.tablesEmpty || ""), d = (r.domains.emptyText || ""); return [t.includes("נסה חיפוש אחר או נקה מסננים") && d.includes("נסה חיפוש אחר"), `tables '${t}'; domains '${d}'`]; } },
  "S9-4": { scripts: ["static-fetch"], test: () => { const ks = ["S9-4.bapi", "S9-4.fiori", "S9-4.cds", "S9-4.bapi-detail"].map(statText); return [ks.every((s) => s.ok), ks.map((s) => s.text).join("; ")]; } },
  "S9-5": { scripts: ["static-fetch"], test: () => { const s = statText("S9-5"); return [s.ok, s.text]; } },
  "S9-6": { scripts: ["static-fetch"], test: () => { const s = statText("S9-6"); return [s.ok, s.text]; } },
  "S10-1": { scripts: ["a11y-sample.light", "a11y-sample.dark"], test: () => { const p = ["light", "dark"].map((t) => { const r = J(`a11y-sample.${t}`)?.results; if (!r) return { t, ok: false, text: `${t}: not run` }; const nodes = r.reduce((a, x) => a + x.checked, 0), c = r.reduce((a, x) => a + x.contrastCount, 0); return { t, ok: c === 0, text: `${t}: ${r.length} routes, ${nodes.toLocaleString("en")} text nodes, ${c} contrast failures${c ? " (" + r.filter((x) => x.contrastCount).slice(0, 3).map((x) => `${x.url} ${x.contrastCount}`).join(", ") + ")" : ""}` }; }); return [p.every((x) => x.ok), p.map((x) => x.text).join("; ")]; } },
  "S10-2": { scripts: ["ux-measure.390x844-light-phone"], test: () => { const res = uxm("390x844-light-phone"); const o = ovText(res), e = errText(res); return [o.ok && e.ok, `390×844 iPhone UA: ${o.text}; ${e.text}`]; } },
  "S10-3": { scripts: ["a11y-sample.light"], test: () => { const r = J("a11y-sample.light").results; const n = r.reduce((a, x) => a + x.smallCount, 0); const where = r.filter((x) => x.smallCount).map((x) => `${x.url} ${x.smallCount}${x.small.length ? " (" + x.small.slice(0, 2).map((s) => `${s.tag} ${s.w}×${s.h} '${s.label.slice(0, 14)}'`).join("; ") + ")" : ""}`); return [n <= 5, `targets <24×24: ${n} over ${r.length} routes (≤5 documented exempt: 2 sr-only skip links, 2 legacy privacy links, 1 inline)${where.length ? " · " + where.slice(0, 4).join(", ") : ""}`]; } },
  "S10-4": { scripts: ["keyboard-check.1363", "keyboard-check.390", "a11y-sample.light"], test: () => { const kb = [1363, 390].map((vw) => { const r = J(`keyboard-check.${vw}`)?.results; if (!r) return { ok: false, text: `${vw}: not run` }; const off = r.reduce((a, x) => a + x.offscreen.length, 0), trap = r.filter((x) => x.trapped).length, ring = r.reduce((a, x) => a + x.noRing.length, 0), stops = r.reduce((a, x) => a + x.stops, 0); return { ok: off === 0 && trap === 0, text: `${vw}: ${r.length} routes ${stops} stops, ${off} off-screen, ${trap} traps, ${ring} without visible ring` }; }); const a = J("a11y-sample.light")?.results?.filter((x) => x.url.startsWith("/neo/")) ?? []; const obs = a.reduce((s, x) => s + x.focusObscuredCount, 0); return [kb.every((x) => x.ok) && obs === 0, `${kb.map((x) => x.text).join("; ")}; a11y-sample focus-obscured on /neo/* = ${obs}`]; } },
  "S10-5": { scripts: ["ux-measure.1363x936-light-reduce-desktop", "ux-measure.1363x936-dark-desktop"], test: () => { const a = layoutClean("1363x936-light-reduce-desktop"), b = layoutClean("1363x936-dark-desktop"); return [!!a?.ok && !!b?.ok, `${a?.text ?? "reduce: not run"}; ${b?.text ?? "dark: not run"}`]; } },
  "S10-6": { scripts: ["ux-measure.1920x1080-light-desktop", "ux-measure.1440x900-light-desktop"], test: () => { const a = layoutClean("1920x1080-light-desktop"), b = layoutClean("1440x900-light-desktop"); return [!!a?.ok && !!b?.ok, `${a?.text ?? "1920: not run"}; ${b?.text ?? "1440: not run"}`]; } },
  "ACC-1": { scripts: ["catalog-cards-check"], test: () => { const t = J("catalog-cards-check").tbl; return [t.ok, `AFKO: fields at ${t.screens} screens, header pill ${t.headerStatusTop}px < evidence ${t.evidenceTop}px`]; } },
  "ACC-2": { scripts: ["sticky-depth-check"], test: () => { const s = J("sticky-depth-check"); const pv = (k) => s[k].withFilter.map((x) => (x.pressed ? (x.pressed.onScreen ? "y" : "n") : "-")).join(""); return [X("sticky-depth-check") === 0, `pressed filter visible desktop=[${pv("desktop")}] phone=[${pv("phone")}] ('${s.desktop.filterPressed}')`]; } },
  "ACC-3": { via: "S5-2" },
  "ACC-4": { scripts: ["ux-measure.1363x936-light-desktop", "clip-check.1363x936-light-desktop", "r3c-check", "r3b-check"], test: () => { const e = byId(uxm("1363x936-light-desktop"), "erd"); const c = J("clip-check.1363x936-light-desktop")?.results?.find((r) => r.url === "/neo/erd/"); const w = J("r3c-check").erdOverview.inspW, k = J("r3b-check").cockpitAnchor; return [!!e && c?.clipped === 0 && w <= 310 && !!k?.detailsOpen && !!k?.isTarget, `ERD zoom ${e?.zoom} clipped=${c?.clipped} panel ${w}px; cockpit anchor open=${k?.detailsOpen} target=${k?.isTarget}`]; } },
  "ACC-5": { via: "S6-2" },
  "APPX-1": { via: "S7-COCK-1" },
  "APPX-2": { scripts: ["ux-measure.1363x936-light-desktop"], test: () => { const r = byId(uxm("1363x936-light-desktop"), "readiness"); return [r && !r.error && r.dimVisible === 0 && r.minVisibleOpacity >= 0.98, `readiness: dim=${r?.dimVisible} min opacity ${r?.minVisibleOpacity} (was 0.45)`]; } },
  "APPX-3": { via: "S7-ERD-1" },
};

/* ---------------------------------------------------------- evaluation */
const rows = {};
const firstErr = (id) => (runs[id]?.stderr || runs[id]?.stdout || "").split("\n").map((l) => l.trim()).filter((l) => /error|Error|TimeoutError|not found|ENOENT/.test(l))[0]?.slice(0, 120) || "";
for (const id of matrixIds) {
  const prefix = id.split("-")[0];
  const def = ROWS[id];
  if (NM_ROWS[id]) { rows[id] = { id, scripts: [], result: "NOT_MEASURABLE", evidence: NM_ROWS[id] }; continue; }
  if (!def) { rows[id] = { id, scripts: [], result: "NOT_MEASURABLE", evidence: NOT_MEASURABLE[prefix] || "no QA script named in the ראיית After column" }; continue; }
  if (def.via) continue; // second pass
  const missing = def.scripts.filter((s) => !runs[s]);
  if (missing.length) { rows[id] = { id, scripts: def.scripts, result: "FAIL", evidence: `not run: ${missing.join(", ")}` }; continue; }
  const broken = def.scripts.filter((s) => runs[s].json === null && RUNS.find((r) => r.id === s)?.json !== false);
  if (broken.length) { rows[id] = { id, scripts: def.scripts, result: "FAIL", evidence: broken.map((s) => `${s} exit ${runs[s].exit}${runs[s].exit === 124 ? " (timeout)" : ""}, no JSON output${firstErr(s) ? ": " + firstErr(s) : ""}`).join("; ") }; continue; }
  try { const [pass, evidence] = def.test(); rows[id] = { id, scripts: def.scripts, result: pass ? "PASS" : "FAIL", evidence: String(evidence).replace(/\s+/g, " ").trim() }; }
  catch (e) { rows[id] = { id, scripts: def.scripts, result: "FAIL", evidence: `evaluator error: ${String(e.message).slice(0, 140)}` }; }
}
for (const id of matrixIds) { const def = ROWS[id]; if (def?.via) { const p = rows[def.via]; rows[id] = { id, scripts: p?.scripts ?? [], result: p?.result ?? "FAIL", evidence: `→ ${def.via}: ${p?.evidence ?? "not evaluated"}` }; } }

/* -------------------------------------------------------------- outputs */
const ranAt = new Date().toISOString();
const rowList = matrixIds.map((id) => rows[id]);
const runList = Object.values(runs).map(({ id, script, env, exit, seconds, outFile }) => ({ id, script, env, exit, seconds, outFile }));
const counts = { PASS: 0, FAIL: 0, NOT_MEASURABLE: 0 }; for (const r of rowList) counts[r.result]++;
const totalSeconds = Math.round((Date.now() - T0) / 10) / 100;
writeFileSync(path.join(OUT_DIR, "summary.json"), JSON.stringify({ ranAt, base: BASE, matrix: MATRIX, layouts: LAYOUTS, counts, totalSeconds, rows: rowList, runs: runList }, null, 1));
const esc = (s) => String(s).replace(/\|/g, "\\|");
const md = [
  `# Astra re-verify · ${ranAt}`, "",
  `Base: \`${BASE}\` · matrix: \`${MATRIX}\` (${rowList.length} rows) · PASS ${counts.PASS} · FAIL ${counts.FAIL} · NOT_MEASURABLE ${counts.NOT_MEASURABLE} · ${runList.length} runs · ${totalSeconds}s`, "",
  "| row | scripts | result | evidence |", "|---|---|---|---|",
  ...rowList.map((r) => `| ${r.id} | ${esc(r.scripts.join(", ")) || "—"} | ${r.result} | ${esc(r.evidence)} |`), "",
  "## Runs", "", "| run | script | env | exit | seconds | output |", "|---|---|---|---|---|---|",
  ...runList.map((r) => `| ${r.id} | ${esc(r.script)} | ${esc(Object.entries(r.env).filter(([k]) => !/^(OUT|SHOTS|ROUTES_FROM)$/.test(k)).map(([k, v]) => `${k}=${v}`).join(" ")) || "—"} | ${r.exit} | ${r.seconds} | ${esc(r.outFile || "")} |`), "",
];
writeFileSync(path.join(OUT_DIR, "summary.md"), md.join("\n"));

console.log(`\n${"row".padEnd(11)} ${"result".padEnd(15)} evidence`);
for (const r of rowList) console.log(`${r.id.padEnd(11)} ${r.result.padEnd(15)} ${r.evidence.slice(0, 110)}`);
console.log(`\nPASS ${counts.PASS} · FAIL ${counts.FAIL} · NOT_MEASURABLE ${counts.NOT_MEASURABLE} · runs ${runList.length} (${runList.filter((r) => r.exit !== 0).length} non-zero exit) · ${totalSeconds}s`);
console.log(`→ ${rel(path.join(OUT_DIR, "summary.md"))}, ${rel(path.join(OUT_DIR, "summary.json"))}`);
process.exit(counts.FAIL ? 1 : 0);
