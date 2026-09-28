// Lets a node:test file import application modules (the `@/` alias and
// extensionless imports) through the project's own resolver,
// scripts/alias-loader.mjs, the one the build scripts already use. Import this
// file first, then load application code with a dynamic `await import(...)`.
//
// In-thread hooks also see the CommonJS requires inside node_modules (dagre's
// `require("./lib/graphlib")`); those keep Node's own resolution.
import { registerHooks } from "node:module";
import { resolve } from "../scripts/alias-loader.mjs";

registerHooks({
  resolve: (specifier, context, next) =>
    context.parentURL?.includes("/node_modules/") ? next(specifier, context) : resolve(specifier, context, next),
});
