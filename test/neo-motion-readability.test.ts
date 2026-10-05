import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import postcss from "postcss";

test("motion reduction does not turn faint parallax decoration into opaque text", () => {
  const css = postcss.parse(readFileSync(new URL("../app/neo/motion.css", import.meta.url), "utf8"));
  let stoppedParallax = 0;
  css.walkRules((rule) => {
    if (!/\.nm-par(?:-slow)?\b/.test(rule.selector)) return;
    rule.walkDecls((decl) => {
      if (decl.prop === "transform" && decl.value === "none" && decl.important) stoppedParallax++;
      assert.ok(!(decl.prop === "opacity" && decl.value === "1" && decl.important),
        `Decoration opacity must survive: ${rule.selector}`);
    });
  });
  assert.ok(stoppedParallax >= 2, "OS and in-app reduced motion still stop parallax");
});

test("the hero remains readable when its entrance animation is paused at the first frame", () => {
  const css = postcss.parse(readFileSync(new URL("../app/neo/home.css", import.meta.url), "utf8"));
  let checked = 0;
  css.walkAtRules("keyframes", (animation) => {
    if (!["nh-gate-line", "nh-gate-up"].includes(animation.params)) return;
    animation.walkDecls("opacity", (decl) => { assert.equal(decl.value, "1"); checked++; });
  });
  assert.equal(checked, 4);
});

test("reduced motion keeps the book jacket in front of its paper block", () => {
  const css = postcss.parse(readFileSync(new URL("../app/neo/books.css", import.meta.url), "utf8"));
  const transforms = new Map<string, string>();
  css.walkRules((rule) => {
    const media = rule.parent?.type === "atrule" ? rule.parent.params : "";
    if (media === "(forced-colors: active)") return;
    if (rule.selector === ".nb-f-leaf") {
      rule.walkDecls("transform", (decl) => { transforms.set("paper", decl.value); });
    }
    if (media === "(prefers-reduced-motion: reduce)" && rule.selector.endsWith(" .nb-f-front")) {
      rule.walkDecls("transform", (decl) => { transforms.set("system", decl.value); });
    }
    if (rule.selector === '.nx-app[data-motion-reduced="1"] .nb-f-front') {
      rule.walkDecls("transform", (decl) => { transforms.set("site", decl.value); });
    }
  });
  assert.equal(transforms.get("paper"), "translateZ(calc(var(--d) - var(--bdt)))");
  for (const setting of ["system", "site"]) {
    assert.equal(transforms.get(setting), "translateZ(var(--d))",
      `${setting}: moving the jacket to z=0 exposes blank paper instead of the title`);
  }
});
