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
