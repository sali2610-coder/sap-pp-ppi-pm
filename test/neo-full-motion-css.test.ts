import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import postcss from "postcss";

const base = new URL("../", import.meta.url);
function cssFiles(dir: string): string[] {
  return readdirSync(new URL(dir, base), { withFileTypes: true }).flatMap((entry) => {
    const path = `${dir}/${entry.name}`;
    return entry.isDirectory() ? cssFiles(path) : path.endsWith(".css") ? [path] : [];
  });
}

test("full motion opts out of every NEO OS reduction without altering other media conditions", () => {
  let guarded = 0;
  for (const file of ["app/globals.css", ...cssFiles("app/neo"), ...cssFiles("components/neo-shell")]) {
    const root = postcss.parse(readFileSync(new URL(file, base), "utf8"));
    root.walkAtRules("media", (media) => {
      if (!/prefers-reduced-motion:\s*reduce\b/.test(media.params)) return;
      media.walkRules((rule) => {
        for (const selector of rule.selectors) {
          assert.ok(selector.startsWith(':where(html:not([data-neo-motion="full"])) '), `${file}: ${selector} still disables explicitly requested animation`);
          guarded++;
        }
      });
    });
  }
  assert.ok(guarded > 150);
  const lanes = postcss.parse(readFileSync(new URL("app/neo/object-lanes.css", base), "utf8"));
  let coarseStillApplies = false;
  lanes.walkAtRules("media", (media) => {
    if (media.params === "(pointer: coarse)") media.walkRules((r) => { if (r.selector === ".nol-plane") coarseStillApplies = true; });
  });
  assert.ok(coarseStillApplies, "touch layout protection is independent of motion preference");
});

test("animations gated by no-preference have identical explicit-full equivalents", () => {
  let checked = 0;
  for (const file of cssFiles("app/neo")) {
    const root = postcss.parse(readFileSync(new URL(file, base), "utf8"));
    root.walkAtRules("media", (media) => {
      if (!media.params.includes("prefers-reduced-motion: no-preference")) return;
      const full = media.next();
      assert.ok(full?.type === "atrule" && full.name === "media");
      assert.equal(full.params, media.params.replace("(prefers-reduced-motion: no-preference)", "(min-width: 0px)"));
      const original: string[] = [], restored: string[] = [];
      media.walkDecls((d) => { original.push(d.toString()); });
      full.walkDecls((d) => { restored.push(d.toString()); });
      assert.deepEqual(restored, original, `${file}: animation design must remain unchanged`);
      full.walkRules((rule) => { for (const s of rule.selectors) assert.ok(s.startsWith(':where(html[data-neo-motion="full"]) ')); });
      checked++;
    });
  }
  assert.ok(checked > 10);
});
