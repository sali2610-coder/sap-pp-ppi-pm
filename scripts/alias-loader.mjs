/**
 * Node ESM resolver hook that understands this project's TypeScript imports, so
 * build scripts can call application code directly instead of reimplementing it.
 *
 * Two things Node's resolver does not do on its own:
 *   - the `@/…` path alias from tsconfig
 *   - extensionless specifiers (`./sapData`), which TypeScript allows and ESM does not
 *
 * Extension resolution checks the filesystem rather than pattern-matching the
 * specifier, because several data modules are named like `./sapData.pm` — a
 * regex looking for a trailing `.<ext>` treats `.pm` as the extension, skips
 * appending `.ts`, and the import fails.
 *
 * Paired with `--experimental-strip-types`, this lets a plain `node` script
 * import .ts modules with no bundler, no TypeScript runner and no network.
 *
 * Usage: node --experimental-strip-types --loader ./scripts/alias-loader.mjs script.mjs
 */
import { pathToFileURL, fileURLToPath } from "node:url";
import { existsSync, statSync } from "node:fs";

const ROOT = process.cwd();
const CANDIDATES = [".ts", ".tsx", ".mjs", ".js", "/index.ts", "/index.tsx"];

const isFile = (p) => existsSync(p) && statSync(p).isFile();

function withExtension(href) {
  // Only an existing FILE is taken as-is. `data/library.ts` sits next to the
  // `data/library/` directory, so `@/data/library` must fall through to the
  // candidates instead of being handed to Node as a directory import.
  if (isFile(fileURLToPath(href))) return href;
  for (const ext of CANDIDATES) {
    if (isFile(fileURLToPath(href + ext))) return href + ext;
  }
  return href;
}

/** TypeScript's `resolveJsonModule` lets app code write `import x from "./x.json"`;
 *  Node ESM requires `with { type: "json" }`. Supplying the attribute from the
 *  resolver keeps the two in step without touching application code. */
function resolved(href, context, next) {
  const r = next(href, context);
  if (!href.endsWith(".json")) return r;
  const attach = (x) => ({ ...x, importAttributes: { ...(x.importAttributes || {}), type: "json" } });
  return typeof r?.then === "function" ? r.then(attach) : attach(r);
}

export function resolve(specifier, context, next) {
  if (specifier.startsWith("@/")) {
    return resolved(withExtension(pathToFileURL(`${ROOT}/${specifier.slice(2)}`).href), context, next);
  }
  if ((specifier.startsWith("./") || specifier.startsWith("../")) && context.parentURL?.startsWith("file:")) {
    return resolved(withExtension(new URL(specifier, context.parentURL).href), context, next);
  }
  return next(specifier, context);
}
