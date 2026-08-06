#!/usr/bin/env node
/**
 * Post-deploy smoke test against the live site.
 *
 * Why this exists: every other gate in this repo inspects `out/` — the local
 * build output. That is not the same artifact the user receives. A build can be
 * green, `check:sitemap` can pass over 4,495 URLs in `out/`, and the deployed
 * site can still be missing the file, because what reaches production depends
 * on the platform's build command and output collection, not on what is on
 * disk here.
 *
 * That is not hypothetical: /sitemap.xml was generated correctly into `out/`,
 * passed its own CI gate, and returned 404 in production — while robots.txt
 * advertised it. Nothing caught it, because nothing tested the deployment.
 *
 * Usage:  node scripts/check-prod.mjs [origin]
 *         node scripts/check-prod.mjs https://sapbysali.app
 */
const ORIGIN = (process.argv[2] || "https://sapbysali.app").replace(/\/$/, "");

/**
 * Each check asserts a status and, where the body matters, a content assertion.
 * Keep this to things whose absence is silent — a missing page 404s loudly in a
 * crawl, but a missing sitemap or header degrades quietly.
 */
const CHECKS = [
  { path: "/", expect: 200, must: /<h1/i, why: "homepage renders a heading" },
  { path: "/sitemap.xml", expect: 200, must: /<urlset/, why: "robots.txt advertises this file" },
  { path: "/robots.txt", expect: 200, must: /Sitemap:/, why: "crawler entry point" },
  { path: "/manifest.webmanifest", expect: 200, why: "PWA install" },
  { path: "/.well-known/security.txt", expect: 200, why: "vulnerability contact" },
  { path: "/pm/", expect: 200, why: "module route" },
  { path: "/library/", expect: 200, why: "library route" },
  { path: "/transactions/", expect: 200, why: "transaction centre" },
];

/** Security headers that are set in vercel.json and must actually arrive. */
const HEADERS = [
  "content-security-policy",
  "strict-transport-security",
  "x-content-type-options",
  "x-frame-options",
  "referrer-policy",
  "vary",
];

let failed = 0;
const fail = (msg) => {
  failed++;
  console.error(`  FAIL  ${msg}`);
};

for (const c of CHECKS) {
  let res;
  try {
    res = await fetch(ORIGIN + c.path, { redirect: "manual" });
  } catch (e) {
    fail(`${c.path} — request failed: ${e.message}`);
    continue;
  }
  if (res.status !== c.expect) {
    fail(`${c.path} — expected ${c.expect}, got ${res.status}  (${c.why})`);
    continue;
  }
  if (c.must) {
    const body = await res.text();
    if (!c.must.test(body)) {
      fail(`${c.path} — 200 but body does not match ${c.must}  (${c.why})`);
      continue;
    }
  }
  console.log(`  ok    ${c.path}`);
}

// Headers are checked once, on the homepage — they are applied to /(.*).
try {
  const res = await fetch(ORIGIN + "/", { redirect: "manual" });
  for (const h of HEADERS) {
    if (!res.headers.get(h)) fail(`missing response header: ${h}`);
  }
  if (failed === 0) console.log(`  ok    ${HEADERS.length} security headers present`);
} catch (e) {
  fail(`header check failed: ${e.message}`);
}

if (failed) {
  console.error(`\ncheck-prod: ${failed} failure(s) against ${ORIGIN}`);
  process.exit(1);
}
console.log(`\ncheck-prod: all checks passed against ${ORIGIN}`);
