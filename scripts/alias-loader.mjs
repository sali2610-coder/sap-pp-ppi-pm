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
import { existsSync } from "node:fs";

const ROOT = process.cwd();
const CANDIDATES = [".ts", ".tsx", ".mjs", ".js", "/index.ts", "/index.tsx"];

function withExtension(href) {
  if (existsSync(fileURLToPath(href))) return href;
  for (const ext of CANDIDATES) {
    if (existsSync(fileURLToPath(href + ext))) return href + ext;
  }
  return href;
}

export function resolve(specifier, context, next) {
  if (specifier.startsWith("@/")) {
    return next(withExtension(pathToFileURL(`${ROOT}/${specifier.slice(2)}`).href), context);
  }
  if ((specifier.startsWith("./") || specifier.startsWith("../")) && context.parentURL?.startsWith("file:")) {
    return next(withExtension(new URL(specifier, context.parentURL).href), context);
  }
  return next(specifier, context);
}
