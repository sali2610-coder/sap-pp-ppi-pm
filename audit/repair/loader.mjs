/* Audit-only loader: project alias resolution + Node 26 JSON import attributes.
   Kept under audit/ so it never enters the app or the build. */
import { pathToFileURL, fileURLToPath } from "node:url";
import { existsSync, statSync } from "node:fs";

const ROOT = process.cwd();
const CANDIDATES = [".ts", ".tsx", ".mjs", ".js", "/index.ts", "/index.tsx", "/index.js", "/index.json"];

function withExtension(href) {
  const p = fileURLToPath(href);
  // A bare directory must resolve to its index, not to itself: Node refuses a
  // directory import outright, and the app relies on TypeScript resolution.
  if (existsSync(p) && !statSync(p).isDirectory()) return href;
  for (const ext of CANDIDATES) if (existsSync(fileURLToPath(href + ext))) return href + ext;
  return href;
}

/* Node >=22 refuses a JSON import with no `type: "json"` attribute. The app's
   own imports omit it (Next/webpack does not require it), so the attribute is
   injected on the RESOLVE RESULT — the only place Node reads it from. */
async function withJson(url, context, next) {
  const r = await next(url, context);
  return r.url?.endsWith(".json")
    ? { ...r, format: "json", importAttributes: { ...r.importAttributes, type: "json" } }
    : r;
}

export async function resolve(specifier, context, next) {
  if (specifier.startsWith("@/")) {
    return withJson(withExtension(pathToFileURL(`${ROOT}/${specifier.slice(2)}`).href), context, next);
  }
  if ((specifier.startsWith("./") || specifier.startsWith("../")) && context.parentURL?.startsWith("file:")) {
    return withJson(withExtension(new URL(specifier, context.parentURL).href), context, next);
  }
  return withJson(specifier, context, next);
}
