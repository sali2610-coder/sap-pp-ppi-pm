#!/usr/bin/env node
// Full topic body of a help.sap.com page, through the two JSON services the portal's
// own topic page loads (the HTML page itself is a JavaScript shell):
//   1. deliverableMetadata -> numeric deliverable id (+ build number)
//   2. pagecontent          -> the topic HTML, printed here as plain text
//
//   node scripts/sap-help-body.mjs "<help.sap.com/docs/PRODUCT/DELIVERABLE/LOIO.html?...&version=2025.001>"
//   node scripts/sap-help-body.mjs "<url>" --html      # raw HTML instead of text
//   node scripts/sap-help-body.mjs "<url>" --out dir/  # also saves dir/<loio>-<version>.txt
//
// A record may quote a body only after this text was read; the auditor re-fetches it.
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const url = args.find((a) => a.startsWith("http"));
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
if (!url) { console.error("usage: sap-help-body.mjs <help.sap.com topic url> [--html] [--out dir]"); process.exit(2); }

const u = new URL(url);
const m = u.pathname.match(/^\/docs\/([^/]+)\/([0-9a-f]{32})\/([0-9a-f]{32})\.html/i);
if (!m) { console.error("not a help.sap.com/docs/<product>/<deliverable>/<loio>.html url"); process.exit(2); }
const [, product, deliverable, loio] = m;
const version = u.searchParams.get("version") || "";
const state = u.searchParams.get("state") || "PRODUCTION";
const lang = u.searchParams.get("locale") || "en-US";

const get = async (x) => { const r = await fetch(x, { headers: { Accept: "application/json" } }); if (!r.ok) throw new Error(`${r.status} ${x}`); return r.json(); };
try {
  const meta = await get(`https://help.sap.com/http.svc/deliverableMetadata?product_url=${product}&topic_url=${loio}.html&version=${version}&loadlandingpageontopicnotfound=true&deliverable_url=${deliverable}&language=${lang}&deliverableInfo=1&toc=1&state=${state}`);
  const d = meta.data && meta.data.deliverable;
  if (!d || !d.id) throw new Error("deliverableMetadata returned no deliverable id");
  const page = await get(`https://help.sap.com/http.svc/pagecontent?deliverableInfo=1&deliverable_id=${d.id}&buildNo=${d.buildNo || ""}&file_path=${loio}.html&state=${state}&language=${lang}`);
  const html = (page.data && (page.data.body || page.data.content)) || "";
  if (!html) throw new Error("pagecontent returned no body");
  const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, " ").trim();
  const head = `# ${product} · ${d.productName || ""} ${d.versionName || version} (version ${d.version || version}, deliverable ${d.id}, build ${d.buildNo || "?"}) · loio ${loio}\n# fetched ${new Date().toISOString().slice(0, 10)} via deliverableMetadata + pagecontent\n`;
  const outDir = flag("--out");
  if (outDir) { mkdirSync(outDir, { recursive: true }); writeFileSync(path.join(outDir, `${loio}-${d.version || version}.txt`), head + text + "\n"); }
  console.log(args.includes("--html") ? html : head + text);
} catch (e) { console.error("sap-help-body:", e.message); process.exit(1); }
