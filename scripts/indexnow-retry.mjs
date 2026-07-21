/**
 * IndexNow retry runner — ONE attempt per invocation, appends a timestamped log.
 * Exit 0 on HTTP 200/202 (success → stop looping); exit 1 otherwise (retry).
 * Loop usage (every 30 min, give up after 24h): a scheduler re-runs this; on exit 1
 * reschedule +30m, on exit 0 stop, and after 24h of exit-1 write a failure report.
 *   node scripts/indexnow-retry.mjs
 */
import { appendFileSync } from "node:fs";

const HOST = "sapbysali.app";
const KEY = "4d1476dfcbbc95bf02d0f8bf849c63fe";
const LOG = "docs/seo/indexnow-log.txt";
const ts = new Date().toISOString();

try {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
  });
  const body = (await res.text()).replace(/\s+/g, " ").slice(0, 100);
  const line = `[${ts}] HTTP ${res.status} · urls=${urlList.length} · ${body}\n`;
  appendFileSync(LOG, line);
  console.log(line.trim());
  process.exit(res.status === 200 || res.status === 202 ? 0 : 1);
} catch (e) {
  appendFileSync(LOG, `[${ts}] ERROR ${String(e).slice(0, 100)}\n`);
  console.error("ERROR", e);
  process.exit(1);
}
