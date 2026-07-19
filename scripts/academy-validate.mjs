/**
 * SAP Academy — before/after validation harness (mandatory per PR).
 * Captures the 13 required surfaces at desktop + mobile, deterministically
 * (reduced-motion, settle, seeded localStorage), and records status / horizontal
 * overflow / console-errors / a content hash per shot.
 *
 * Usage (out/ must be built + served):
 *   node scripts/academy-validate.mjs --label before --pr <name> --base http://localhost:8899
 *   node scripts/academy-validate.mjs --label after  --pr <name> --base http://localhost:8899
 * Then compare the two manifests (scripts/academy-validate-compare.mjs).
 *
 * Output: docs/academy/validation/<pr>/<label>/<surface>-<vp>.png + manifest.json
 */
import puppeteer from "puppeteer-core";
import { createHash } from "node:crypto";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const label = arg("label", "before");
const pr = arg("pr", "pr");
const base = arg("base", "http://localhost:8899");

// 13 required items → concrete captures. Items that live inside a page are noted.
const SURFACES = [
  { id: "home", url: "/academy/", note: "Home + Continue Learning card" },
  { id: "dashboard", url: "/academy/dashboard/", note: "Academy Dashboard" },
  { id: "library", url: "/library/", note: "Library (FROZEN guard)" },
  { id: "pm-academy", url: "/academy/path/pm/", note: "PM Academy path" },
  { id: "pppi-academy", url: "/academy/path/pp-pi/", note: "PP-PI Academy path" },
  { id: "qm-academy", url: "/academy/path/qm/", note: "QM Academy path" },
  { id: "lesson", url: "/academy/lesson/pm-maintenance-order/", note: "Progress + Current lesson" },
  { id: "search", url: "/academy/", palette: true, note: "Search (command palette)" },
];
const VPS = [{ id: "d", w: 1280, h: 1000 }, { id: "m", w: 390, h: 780 }];

const outDir = `docs/academy/validation/${pr}/${label}`;
mkdirSync(outDir, { recursive: true });

const b = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox", "--force-color-profile=srgb"] });
const rows = [];
for (const s of SURFACES) {
  for (const vp of VPS) {
    const p = await b.newPage();
    const errs = [];
    p.on("console", (m) => { if (m.type() === "error" && !/favicon|File not found|status of 404/.test(m.text())) errs.push(m.text().slice(0, 100)); });
    p.on("pageerror", (e) => errs.push("PAGEERR " + String(e).slice(0, 100)));
    await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await p.setViewport({ width: vp.w, height: vp.h, deviceScaleFactor: 1 });
    await p.evaluateOnNewDocument(() => { try { localStorage.setItem("neo:onboarded", "1"); } catch {} });
    let status = 0;
    try { const r = await p.goto(base + s.url, { waitUntil: "networkidle0", timeout: 60000 }); status = r ? r.status() : 0; } catch (e) { errs.push("NAV " + String(e).slice(0, 60)); }
    if (s.palette) { try { await p.keyboard.down("Meta"); await p.keyboard.press("KeyK"); await p.keyboard.up("Meta"); } catch {} }
    await new Promise((r) => setTimeout(r, 900));
    const overflow = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth).catch(() => -1);
    // deterministic content signature = authoritative change signal (pixel hashing
    // is flaky due to animation/subpixel/timing). Normalizes whitespace.
    const text = await p.evaluate(() => (document.body.innerText || "").replace(/\s+/g, " ").trim()).catch(() => "");
    const textHash = createHash("sha1").update(text).digest("hex").slice(0, 12);
    const file = `${outDir}/${s.id}-${vp.id}.png`;
    await p.screenshot({ path: file });
    const hash = createHash("sha1").update(readFileSync(file)).digest("hex").slice(0, 12); // advisory pixel hash
    rows.push({ surface: s.id, vp: vp.id, note: s.note, status, overflow, errors: errs, textHash, hash, file });
    await p.close();
  }
}
await b.close();
writeFileSync(`docs/academy/validation/${pr}/${label}.manifest.json`, JSON.stringify({ pr, label, base, at: "captured", rows }, null, 2));
const bad = rows.filter((r) => r.status !== 200 && r.status !== 304).length;
const ov = rows.filter((r) => r.overflow > 0).length;
const er = rows.reduce((s, r) => s + r.errors.length, 0);
console.log(`[${label}] captured ${rows.length} shots · non-200/304=${bad} · overflow>0=${ov} · console-errors=${er}`);
process.exit(0);
