#!/usr/bin/env node
/**
 * Writes public/tx-search-index.json — the cross-entity search index for
 * /transactions/, so the page can stop shipping it inside its own HTML.
 *
 * WHY
 *
 * app/transactions/page.tsx called buildSearchIndex() on the server and handed
 * the result to <TxSearch index={index}>, a client component. Anything passed
 * across that boundary is serialized into the RSC payload, so all 2,167 entries
 * were inlined into the document — 639 KB of the page's 1,574 KB, in <script>
 * tags. Measured on production: 181 KB transferred (every other route is 17–19
 * KB) and LCP 6.0 s, while TTFB was a healthy 0.29 s. The cost was document size
 * and parse, not the server.
 *
 * The panel that uses this index lives inside a collapsed <details>. The index
 * was being paid for on every visit by every visitor, including the ones who
 * never opened it.
 *
 * As a static JSON file it is fetched only when someone actually focuses the
 * search box, and it is cacheable on its own instead of being re-downloaded
 * inside the HTML on every navigation.
 *
 * CORRECTNESS
 *
 * This calls the application's own buildSearchIndex(). It does not reimplement
 * the ranking, the term construction or the de-duplication between the
 * transaction catalog, TRANSACTIONS, the directory and the T-Code catalog — so
 * search results are the same set, in the same order, as before.
 *
 * The output is generated during prebuild and gitignored: it is derived data,
 * so there is nothing to keep in sync and no drift guard to maintain.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const OUT = "public/tx-search-index.json";

const { buildSearchIndex } = await import("../lib/tcode-search.ts");
const index = buildSearchIndex();

if (!Array.isArray(index) || index.length === 0) {
  console.error("gen-tx-search-index: buildSearchIndex() returned nothing — refusing to write an empty index.");
  process.exit(1);
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(index));

const byKind = index.reduce((acc, h) => ((acc[h.kind] = (acc[h.kind] || 0) + 1), acc), {});
const kb = (JSON.stringify(index).length / 1024).toFixed(0);
console.log(`gen-tx-search-index: ${index.length} entries (${kb} KB) → ${OUT}`);
console.log(`  ${Object.entries(byKind).map(([k, n]) => `${k}:${n}`).join("  ")}`);
