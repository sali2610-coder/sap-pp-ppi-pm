/**
 * IndexNow submitter — notifies Bing, Yandex, Seznam, Naver (+ all IndexNow engines)
 * that URLs changed, for near-instant (re)indexing. Run AFTER a production deploy:
 *   node scripts/indexnow-submit.mjs
 * Reads out/sitemap.xml for the URL list. Key hosted at /<key>.txt (verified by engines).
 */
import { readFileSync } from "node:fs";

const HOST = "sapbysali.app";
const KEY = "4d1476dfcbbc95bf02d0f8bf849c63fe";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

function urlsFromSitemap() {
  const xml = readFileSync("out/sitemap.xml", "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const urls = urlsFromSitemap();
const batches = [];
for (let i = 0; i < urls.length; i += 10000) batches.push(urls.slice(i, i + 10000));
console.log(`IndexNow: ${urls.length} URLs in ${batches.length} batch(es) → api.indexnow.org`);

for (const [i, urlList] of batches.entries()) {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });
  console.log(`  batch ${i + 1}: HTTP ${res.status} ${res.statusText}`);
}
console.log("done. (200/202 = accepted; 403 = key file not reachable yet)");
