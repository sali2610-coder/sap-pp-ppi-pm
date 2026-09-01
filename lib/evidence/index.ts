/* Project NEO · evidence foundation — one import surface.
   The first five modules are PURE (loadable by node --test with no loader);
   resolve.ts is app-side and pulls the overlays and the ref-links gates. Tests
   import the pure modules directly by `.ts` path, never through this index. */
export * from "./types";
export * from "./canonical";
export * from "./s4-status";
export * from "./depth";
export * from "./validate";
export * from "./resolve";
