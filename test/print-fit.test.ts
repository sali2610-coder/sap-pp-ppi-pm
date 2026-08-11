import test from "node:test";
import assert from "node:assert/strict";
import { fitToPage, pageBox, printDocument, resolveProfile } from "../lib/ai/print-fit.ts";

test("page boxes match ISO sizes with margins deducted", () => {
  assert.deepEqual(pageBox("portrait"), { w: 186, h: 273, css: "A4 portrait" });
  assert.deepEqual(pageBox("landscape"), { w: 273, h: 186, css: "A4 landscape" });
  assert.deepEqual(pageBox("a3"), { w: 396, h: 273, css: "A3 landscape" });
  assert.deepEqual(pageBox("a3-portrait"), { w: 273, h: 396, css: "A3 portrait" });
});

test("a wide diagram on a portrait page is turned, not shrunk to a band", () => {
  // This is the defect the print test found: a 1500x500 ER model fitted to
  // width only became an unreadable strip across the top of an A4 portrait.
  const page = pageBox("portrait");
  const fit = fitToPage(1500, 500, page);
  assert.equal(fit.rotate, true);
  // Turned, the binding constraint is the page's long side against the
  // diagram's long side.
  assert.ok(fit.scale > 273 / 1500 * 0.99 && fit.scale <= 273 / 1500 * 1.01,
    `expected ~${273 / 1500}, got ${fit.scale}`);
  // Upright it would have been limited by the short side — materially smaller.
  const upright = Math.min(page.w / 1500, page.h / 500);
  assert.ok(fit.scale > upright, "rotation must actually gain size");
  assert.deepEqual(fit.box, { w: 273, h: 186 });
});

test("a tall diagram on a landscape page is turned", () => {
  const fit = fitToPage(600, 1400, pageBox("landscape"));
  assert.equal(fit.rotate, true);
});

test("a diagram already matching the sheet is left upright", () => {
  // Rotating for a marginal gain hands someone a sideways page for nothing.
  assert.equal(fitToPage(1400, 900, pageBox("landscape")).rotate, false);
  assert.equal(fitToPage(900, 1400, pageBox("portrait")).rotate, false);
  // Near-square: neither orientation wins by enough.
  assert.equal(fitToPage(1000, 1000, pageBox("portrait")).rotate, false);
});

test("scale always fits inside the box on both axes", () => {
  for (const p of ["portrait", "landscape", "a3", "a3-portrait"] as const) {
    for (const [dw, dh] of [[1500, 500], [500, 1500], [1000, 1000], [3000, 200], [200, 3000]]) {
      const fit = fitToPage(dw, dh, pageBox(p));
      const outW = dw * fit.scale, outH = dh * fit.scale;
      assert.ok(outW <= fit.box.w + 0.01, `${p} ${dw}x${dh}: width ${outW} > ${fit.box.w}`);
      assert.ok(outH <= fit.box.h + 0.01, `${p} ${dw}x${dh}: height ${outH} > ${fit.box.h}`);
    }
  }
});

test("degenerate sizes do not produce NaN", () => {
  for (const [w, h] of [[0, 0], [0, 100], [100, 0], [NaN, 100], [-5, 10]]) {
    const fit = fitToPage(w, h, pageBox("portrait"));
    assert.ok(Number.isFinite(fit.scale), `NaN scale for ${w}x${h}`);
  }
});

test("the document carries the page rule and no application chrome", () => {
  const doc = printDocument({
    title: "מודל", svg: "<svg width='1500' height='500'></svg>",
    profile: "a3", dw: 1500, dh: 500,
  });
  assert.match(doc, /@page \{ size: A3 landscape; margin: 12mm; \}/);
  assert.match(doc, /dir="rtl"/);
  // Both axes constrained — the old rule set width only.
  assert.match(doc, /max-width:100%; max-height:100%/);
  // Nothing from the app may leak into the sheet.
  assert.ok(!/<button|<nav|<header|figcaption/.test(doc), "app chrome leaked into print");
});

test("the title is escaped rather than interpolated raw", () => {
  const doc = printDocument({
    title: "<script>x</script>", svg: "<svg></svg>",
    profile: "portrait", dw: 100, dh: 100,
  });
  assert.ok(!doc.includes("<script>x</script>"), "title was not escaped");
});

test("A3 follows the diagram's shape; A4 obeys the button", () => {
  // A3 is the poster size: a tall process flow deserves a tall sheet.
  assert.equal(resolveProfile("a3", 1500, 500), "a3");
  assert.equal(resolveProfile("a3", 500, 1500), "a3-portrait");
  // The A4 buttons exist so someone can print on the paper already loaded.
  assert.equal(resolveProfile("portrait", 1500, 500), "portrait");
  assert.equal(resolveProfile("landscape", 500, 1500), "landscape");
  assert.equal(resolveProfile("a3", 0, 0), "a3");
});

test("a tall diagram sent to A3 gets a portrait sheet and prints upright", () => {
  const doc = printDocument({
    title: "flow", svg: "<svg width='600' height='1400'></svg>",
    profile: "a3", dw: 600, dh: 1400,
  });
  assert.match(doc, /size: A3 portrait/);
  // Sheet already matches the shape, so no quarter turn is needed.
  assert.ok(!/rotate\(-90\)/.test(doc), "rotated despite a matching sheet");
});

test("a wide diagram sent to A4 portrait is turned to stay legible", () => {
  const doc = printDocument({
    title: "erd", svg: "<svg width='1500' height='500'></svg>",
    profile: "portrait", dw: 1500, dh: 500,
  });
  assert.match(doc, /size: A4 portrait/);
  // Turned in SVG coordinates, so the element box is swapped too.
  assert.match(doc, /rotate\(-90\)/);
  assert.match(doc, /width="500" height="1500"/);
});
