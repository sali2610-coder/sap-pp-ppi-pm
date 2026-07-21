/**
 * CSP / security-header live verification.
 * Serves out/ applying the EXACT headers from vercel.json, then drives representative
 * routes in a real browser and fails on any CSP violation, console error, or blocked
 * request. Proves the headers don't break routing/search/academy/studio/assets.
 */
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import pptr from "puppeteer-core";

const ROOT = "out";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const cfg = JSON.parse(readFileSync("vercel.json", "utf8"));
const secHeaders = cfg.headers.find((h) => h.source === "/(.*)").headers;

const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".ico": "image/x-icon", ".woff2": "font/woff2", ".txt": "text/plain; charset=utf-8", ".pdf": "application/pdf" };

const server = createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  let fp = join(ROOT, p);
  if (existsSync(fp) && statSync(fp).isDirectory()) fp = join(fp, "index.html");
  if (!existsSync(fp) && existsSync(fp + ".html")) fp = fp + ".html";
  if (!existsSync(fp)) { fp = join(ROOT, "404.html"); if (!existsSync(fp)) { res.writeHead(404); return res.end("nf"); } }
  for (const h of secHeaders) res.setHeader(h.key, h.value);            // apply real security headers
  res.setHeader("Content-Type", MIME[extname(fp)] || "application/octet-stream");
  res.writeHead(200);
  res.end(readFileSync(fp));
});
await new Promise((r) => server.listen(8908, r));

const ROUTES = [
  ["home", "/"],
  ["academy home", "/academy/"],
  ["academy path", "/academy/path/pm/"],
  ["academy lesson (offline)", "/academy/lesson/pm-org-structure/"],
  ["architecture studio", "/studio/"],
  ["sap-infrastructure (pdf/svg)", "/sap-infrastructure/"],
  ["transactions + search", "/transactions/"],
  ["library", "/library/"],
  ["dashboard widget", "/academy/dashboard/"],
];

const b = await pptr.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
const results = [];
for (const [name, url] of ROUTES) {
  const p = await b.newPage();
  const csp = [], errs = [], blocked = [];
  p.on("console", (m) => { const t = m.text(); if (/content security policy|refused to (load|execute|apply|connect)/i.test(t)) csp.push(t.slice(0, 140)); else if (m.type() === "error") errs.push(t.slice(0, 140)); });
  p.on("pageerror", (e) => errs.push(String(e).slice(0, 140)));
  p.on("requestfailed", (r) => { const f = r.failure()?.errorText || ""; if (/csp|blocked/i.test(f)) blocked.push(r.url().slice(0, 80)); });
  await p.evaluateOnNewDocument(() => localStorage.setItem("neo:onboarded", "1"));
  await p.goto("http://localhost:8908" + url, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 700));
  // functional probe: page rendered real content
  const textLen = await p.evaluate(() => document.body.innerText.length);
  // search probe on the transactions page: open command palette
  let searchOk = true;
  if (url === "/transactions/") { await p.keyboard.down("Meta"); await p.keyboard.press("KeyK"); await p.keyboard.up("Meta"); await new Promise((r) => setTimeout(r, 400)); searchOk = await p.evaluate(() => !!document.querySelector('[role="dialog"], [cmdk-root], input[type="search"], input[placeholder]')); }
  await p.close();
  results.push({ name, csp: csp.length, errs: errs.length, blocked: blocked.length, textLen, searchOk, cspMsgs: csp.slice(0, 2), errMsgs: errs.slice(0, 2) });
}
await b.close();
server.close();

let fail = 0;
for (const r of results) {
  const ok = r.csp === 0 && r.errs === 0 && r.blocked === 0 && r.textLen > 200 && r.searchOk;
  if (!ok) fail++;
  console.log(`${ok ? "✅" : "❌"} ${r.name} — csp:${r.csp} err:${r.errs} blocked:${r.blocked} text:${r.textLen} search:${r.searchOk}`);
  if (r.cspMsgs.length) console.log("    CSP:", r.cspMsgs.join(" | "));
  if (r.errMsgs.length) console.log("    ERR:", r.errMsgs.join(" | "));
}
console.log(`\n${results.length - fail}/${results.length} routes clean under enforced CSP.`);
process.exit(fail ? 1 : 0);
