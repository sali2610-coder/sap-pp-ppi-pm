// Validates vercel.json before a deploy can reject it.
//
// Why this exists: a commit added a `"//buildCommand"` key to vercel.json as a
// way of writing a comment. JSON has no comments, and Vercel's schema declares
// `additionalProperties: false`, so the whole config was invalid and two preview
// deploys errored before the build ever started. Nothing in the repo caught it —
// the file is valid JSON, tsc never reads it, and the failure only appeared in
// the Vercel dashboard.
//
// Checks the top-level keys against Vercel's published schema, falling back to a
// vendored list when the network is unavailable so CI and offline machines still
// get the check. Exits non-zero on an invalid key.
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const FILE = path.join(ROOT, "vercel.json");
const SCHEMA_URL = "https://openapi.vercel.sh/vercel.json";

// Refreshed from the schema on 2026-08-06. Only a fallback: the live schema wins
// when it can be reached, so a newly added Vercel property is not rejected here.
const VENDORED = new Set([
  "$schema", "alias", "buildCommand", "cleanUrls", "crons", "devCommand",
  "framework", "functions", "git", "headers", "ignoreCommand", "images",
  "installCommand", "outputDirectory", "public", "redirects", "regions",
  "rewrites", "trailingSlash", "version",
]);

if (!existsSync(FILE)) {
  console.log("vercel.json absent — nothing to validate");
  process.exit(0);
}

let config;
try {
  config = JSON.parse(readFileSync(FILE, "utf8"));
} catch (e) {
  console.error(`vercel.json is not valid JSON: ${e.message}`);
  process.exit(1);
}

let allowed = VENDORED;
let source = "vendored list (offline)";
try {
  const res = await fetch(SCHEMA_URL, { signal: AbortSignal.timeout(8000) });
  if (res.ok) {
    const schema = await res.json();
    const props = Object.keys(schema.properties ?? {});
    // Only trust a response that actually looks like the schema. A captive
    // portal returning 200 with HTML must not silently widen the allowlist.
    if (props.length > 10 && schema.additionalProperties === false) {
      allowed = new Set(props);
      source = `live schema (${props.length} properties)`;
    }
  }
} catch {
  // Offline or slow. The vendored list still catches the mistake this guards.
}

const invalid = Object.keys(config).filter((k) => !allowed.has(k));

console.log(`\nVERCEL CONFIG CHECK  —  ${source}`);
console.log(`  keys: ${Object.keys(config).join(", ")}`);

if (invalid.length) {
  console.error(`\n  INVALID: ${invalid.join(", ")}`);
  console.error("  Vercel's schema sets additionalProperties:false, so an unknown");
  console.error("  key makes the whole config invalid and the deploy fails before");
  console.error("  the build starts. JSON has no comments — put the explanation in");
  console.error("  the commit message or a doc, not in a \"//\" key.\n");
  process.exit(1);
}

console.log("  all keys valid\n");
