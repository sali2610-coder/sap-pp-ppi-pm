// Build guard: the diagnostics page must ship with EVERY production build.
// It is the only tool that can be run inside the corporate environment when the
// application itself will not load, so it must never silently disappear from a
// deploy. Runs after `next build` (static export) against out/.
import { existsSync, statSync, readFileSync } from "node:fs";

const PATH = "out/diag.html";
const MIN_BYTES = 4000;                 // a stub or an accidental truncation must fail
const MUST_CONTAIN = [
  "Enterprise Startup Diagnostics",     // the page identity
  "Delivery path",                      // section 1 — proxy / isolation detection
  "largest-contentful-paint",           // paint metrics
  "dynamic import()",                   // capability probe
];

if (!existsSync(PATH)) {
  console.error(`check-diag: ${PATH} is MISSING from the build.`);
  console.error("check-diag: it must live in public/diag.html so the static export copies it.");
  process.exit(1);
}
const size = statSync(PATH).size;
if (size < MIN_BYTES) {
  console.error(`check-diag: ${PATH} is only ${size} bytes — expected at least ${MIN_BYTES}.`);
  process.exit(1);
}
const html = readFileSync(PATH, "utf8");
const missing = MUST_CONTAIN.filter((s) => !html.includes(s));
if (missing.length) {
  console.error(`check-diag: ${PATH} is missing expected sections: ${missing.join(", ")}`);
  process.exit(1);
}
console.log(`check-diag: OK — ${PATH} present (${Math.round(size / 1024)} KB, all sections intact).`);
// Served URL reminder: the project uses trailingSlash, so this file is reachable
// at /diag/ — NOT at /diag.html, which returns the application 404 page.
console.log("check-diag: served at https://sapbysali.app/diag/  (trailingSlash: /diag.html will 404)");
