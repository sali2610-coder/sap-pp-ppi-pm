#!/usr/bin/env node
/**
 * Post-build sitemap generator.
 *
 * Why this replaces app/sitemap.ts:
 * `app/sitemap.ts` enumerated dynamic routes from hand-maintained lists. The
 * app has 50 dynamic `[param]` route families; the file listed 11. Measured
 * against a real build:
 *
 *     built index.html pages : 4613
 *     sitemap <loc> entries  : 3488
 *     missing from sitemap   : 1126   (/library 456, /resolution 156,
 *                                      /impact 105, /domain 39, …)
 *
 * Any hand-maintained list drifts the moment a route family is added. Because
 * this project is a static export, the build output IS the authoritative route
 * list — so the sitemap is derived from `out/` after the build instead.
 *
 * Exclusions are derived from the pages themselves, not hardcoded: a page is
 * skipped when its own HTML carries `noindex`. Today that is exactly /404/,
 * /_not-found/ and /offline/, and it stays correct if more are added later.
 *
 * Directory names on disk are mostly already percent-encoded by Next (e.g.
 * `out/tcode/%2FSCWM%2FADGI/`), and those must be used verbatim — running them
 * through encodeURIComponent would double-encode `%2F` into `%252F`.
 *
 * But not all of them are: a BAPI named "Control Recipe" lands on disk as
 * `out/bapi/Control Recipe/`, with a literal space that is not legal in a URL.
 * So only the characters that are unsafe in a URL path are escaped, and `%` is
 * deliberately left alone so existing escapes survive untouched.
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const SITE = "https://sapbysali.app";
const SITEMAP = join(OUT, "sitemap.xml");

// Sitemaps protocol hard limits.
const MAX_URLS = 50000;
const MAX_BYTES = 50 * 1024 * 1024;

/** Walk `out/` and collect every directory that has an index.html. */
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
    // Build artefacts and asset trees hold no indexable HTML.
    if (e.name === "_next" || e.name === "assets") continue;
    found.push(...collect(join(dir, e.name), `${base}/${e.name}`));
  }
  return found;
}

/**
 * Make an on-disk path safe for a sitemap <loc>.
 *
 * `%` is intentionally NOT escaped: Next has already percent-encoded most
 * dynamic segments on disk, and re-encoding would turn %2F into %252F. Only
 * characters that are outright unsafe in a URL path are escaped, plus the XML
 * metacharacters that would otherwise corrupt the document.
 */
const toLoc = (p) =>
  p
    .replace(/[ "<>`{}|\\^]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0"))
    .replace(/&/g, "&amp;");

const pages = collect();
if (pages.length === 0) {
  console.error("gen-sitemap: no pages found under out/ — did the build run?");
  process.exit(1);
}

const indexable = [];
let skipped = 0;
for (const p of pages) {
  const html = readFileSync(p.file, "utf8");
  // Self-declared exclusion. Matches content="noindex" and content="noindex, nofollow".
  if (/content="noindex/.test(html)) {
    skipped++;
    continue;
  }
  indexable.push(p.path);
}
indexable.sort();

if (indexable.length > MAX_URLS) {
  console.error(`gen-sitemap: ${indexable.length} URLs exceeds the 50,000 per-file limit — split into a sitemap index.`);
  process.exit(1);
}

// Priority is a weak hint at best; keep it simple and depth-based so the home
// and section hubs outrank leaf reference pages.
const priority = (path) => {
  if (path === "/") return "1.0";
  const depth = path.split("/").filter(Boolean).length;
  return depth <= 1 ? "0.8" : depth === 2 ? "0.6" : "0.5";
};

const body = indexable
  .map((p) => `<url>\n<loc>${SITE}${toLoc(p)}</loc>\n<changefreq>weekly</changefreq>\n<priority>${priority(p)}</priority>\n</url>`)
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

if (Buffer.byteLength(xml) > MAX_BYTES) {
  console.error("gen-sitemap: sitemap exceeds the 50 MB limit — split into a sitemap index.");
  process.exit(1);
}

writeFileSync(SITEMAP, xml);
const kb = Math.round(statSync(SITEMAP).size / 1024);
console.log(`gen-sitemap: ${indexable.length} URLs (${skipped} noindex pages skipped) → ${SITEMAP} (${kb} KB)`);
