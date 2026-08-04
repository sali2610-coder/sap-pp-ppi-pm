#!/usr/bin/env node
/**
 * CI guard: the sitemap must cover every indexable page in the build.
 *
 * The previous hand-maintained sitemap silently drifted to 3,488 entries while
 * the build produced 4,613 pages — 1,126 pages were invisible to crawlers and
 * nothing failed. This turns that class of drift into a red build.
 *
 * Checks:
 *   1. out/sitemap.xml exists and is well-formed enough to parse <loc> entries.
 *   2. Every built page that is NOT self-declared noindex appears in it.
 *   3. No entry points at a page that does not exist (dead <loc>).
 *   4. Stays inside the sitemaps-protocol limits.
 */
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const SITEMAP = join(OUT, "sitemap.xml");
const MAX_URLS = 50000;
const MAX_BYTES = 50 * 1024 * 1024;

const fail = (msg) => {
  console.error(`check-sitemap: FAIL — ${msg}`);
  process.exit(1);
};

if (!existsSync(SITEMAP)) fail(`${SITEMAP} is missing. Did "next build && node scripts/gen-sitemap.mjs" run?`);

const xml = readFileSync(SITEMAP, "utf8");
const locs = new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname));
if (locs.size === 0) fail("sitemap contains no <loc> entries.");
if (locs.size > MAX_URLS) fail(`${locs.size} URLs exceeds the 50,000 per-file limit.`);
if (statSync(SITEMAP).size > MAX_BYTES) fail("sitemap exceeds the 50 MB limit.");

/** Same escaping the generator applies, so built paths compare like-for-like. */
const toLoc = (p) =>
  p.replace(/[ "<>`{}|\\^]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0"));

function collect(dir = OUT, base = "") {
  const found = [];
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return found;
  }
  if (entries.some((e) => e.isFile() && e.name === "index.html")) {
    found.push({ path: base === "" ? "/" : `${base}/`, file: join(dir, "index.html") });
  }
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    if (e.name === "_next" || e.name === "assets") continue;
    found.push(...collect(join(dir, e.name), `${base}/${e.name}`));
  }
  return found;
}

const pages = collect();
if (pages.length === 0) fail("no built pages found under out/.");

const indexable = pages.filter((p) => !/content="noindex/.test(readFileSync(p.file, "utf8"))).map((p) => toLoc(p.path));
const built = new Set(indexable);

const missing = indexable.filter((p) => !locs.has(p));
const dead = [...locs].filter((p) => !built.has(p));

if (missing.length) {
  console.error(`check-sitemap: ${missing.length} indexable pages are absent from the sitemap. First 10:`);
  for (const p of missing.slice(0, 10)) console.error(`  ${p}`);
  fail("sitemap does not cover the build.");
}
if (dead.length) {
  console.error(`check-sitemap: ${dead.length} sitemap entries point at pages that were not built. First 10:`);
  for (const p of dead.slice(0, 10)) console.error(`  ${p}`);
  fail("sitemap contains dead entries.");
}

console.log(`check-sitemap: OK — ${locs.size} URLs, covers all ${indexable.length} indexable pages, 0 dead entries.`);
