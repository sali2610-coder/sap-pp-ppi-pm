#!/usr/bin/env node
// Official-source lookup for the S/4HANA enrichment phase.
//
// Queries the SAP Help Portal search service (the same service the portal's
// own search box calls) and prints normalised citation records: title,
// deliverable (guide), product, release label + versionId, loio, absolute URL,
// publication date and the cleaned snippet. Every `sap_official_verified`
// claim in data/verification/** must cite a record obtained this way (or an
// equally official api.sap.com / fioriappslibrary URL), with the versionId
// stored as the claim's `release` and today's date as `accessedAt`.
//
//   node scripts/sap-help-search.mjs "IW31 maintenance order" [--product SAP_S4HANA_ON-PREMISE]
//        [--size 10] [--from 0] [--json] [--version 2025.001]
//
// Products worth knowing: SAP_S4HANA_ON-PREMISE (default), SAP_S4HANA_CLOUD,
// SAP_ERP (ECC), SAP_S4HANA_PRIVATE_CLOUD? (not a Help product id — Private
// Edition documentation is the On-Premise deliverable set).
//
// Read-only network call; nothing is written. Body text of a topic page is not
// retrievable without a browser, so a claim is cited to the topic (title +
// deliverable + release), and its wording must be supported by the snippet or
// by a Tier-2 source. Never paraphrase beyond what the snippet states.

const args = process.argv.slice(2);
const q = args.filter((a) => !a.startsWith("--") && !isValueOf(args, a)).join(" ").trim();
function opt(name, dflt) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : dflt;
}
function isValueOf(list, a) {
  const i = list.indexOf(a);
  return i > 0 && list[i - 1].startsWith("--") && !["--json"].includes(list[i - 1]);
}
if (!q) {
  console.error('usage: node scripts/sap-help-search.mjs "<query>" [--product ID] [--size N] [--from N] [--version V] [--json]');
  process.exit(2);
}
const product = opt("product", "SAP_S4HANA_ON-PREMISE");
const size = Number(opt("size", "10"));
const from = Number(opt("from", "0"));
const version = opt("version", "");
const asJson = args.includes("--json");

const params = new URLSearchParams({
  area: "content", q, language: "en-US", state: "PRODUCTION", transtype: "standard",
  product, format: "json", from: String(from), size: String(size),
});
if (version) params.set("version", version);
const url = `https://help.sap.com/http.svc/elasticsearch?${params.toString()}`;

const res = await fetch(url, { headers: { accept: "application/json" } });
if (!res.ok) { console.error(`HTTP ${res.status} from help.sap.com`); process.exit(1); }
const body = await res.json();
const results = body?.data?.results || [];
const clean = (s) => String(s || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const records = results.map((r) => ({
  title: r.title,
  deliverable: r.deliverableTitle,
  product: r.product,
  productId: r.productId,
  version: r.version,
  versionId: r.versionId,
  loio: r.loio,
  url: `https://help.sap.com${r.url}`,
  date: r.date,
  documentType: r.documentType,
  snippet: clean(r.snippet).slice(0, 400),
}));

if (asJson) {
  console.log(JSON.stringify({ query: q, product, total: results.length, accessedAt: new Date().toISOString().slice(0, 10), records }, null, 2));
} else {
  console.log(`# help.sap.com · "${q}" · ${product} · ${records.length} results · accessed ${new Date().toISOString().slice(0, 10)}`);
  for (const r of records) {
    console.log(`- ${r.title} | ${r.deliverable} | ${r.product} ${r.version} (${r.versionId}) | ${r.date}`);
    console.log(`  ${r.url}`);
    if (r.snippet) console.log(`  ${r.snippet.slice(0, 200)}`);
  }
}
