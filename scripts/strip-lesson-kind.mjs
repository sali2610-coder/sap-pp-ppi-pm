#!/usr/bin/env node
// Removes every lesson block of one kind from the authored lesson files, by the
// TypeScript AST, so nothing else in a file moves: each block object goes with
// its own comma and leading whitespace.
//   node scripts/strip-lesson-kind.mjs <kind> [--dry]
// Written to take the "cbc-example" blocks (company examples) off the site.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const ts = require("typescript");

const [kind, flag] = process.argv.slice(2);
if (!kind) { console.error("usage: strip-lesson-kind.mjs <kind> [--dry]"); process.exit(1); }
const dir = process.env.LESSONS_DIR || path.join(path.dirname(new URL(import.meta.url).pathname), "..", "data", "academy", "lessons");
let total = 0;
const removed = [];
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".ts")).sort()) {
  const file = path.join(dir, f);
  const text = fs.readFileSync(file, "utf8");
  const sf = ts.createSourceFile(f, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const cuts = [];
  const visit = (node) => {
    if (ts.isArrayLiteralExpression(node)) {
      const els = node.elements;
      els.forEach((el, i) => {
        if (!ts.isObjectLiteralExpression(el)) return;
        const k = el.properties.find((p) => ts.isPropertyAssignment(p) && p.name.text === "kind");
        if (!k || !ts.isStringLiteralLike(k.initializer) || k.initializer.text !== kind) return;
        // the element with its leading trivia, and the comma that follows it
        let start = el.getFullStart();
        let end = el.getEnd();
        const after = text.slice(end).match(/^\s*,/);
        if (after) end += after[0].length;
        else if (i > 0) start = els[i - 1].getEnd(); // last element: take the comma before it
        cuts.push([start, end]);
        // the lesson it belongs to: the nearest enclosing object with a slug
        let up = node.parent, slug = "";
        while (up && !slug) {
          if (ts.isObjectLiteralExpression(up)) {
            const sp = up.properties.find((p) => ts.isPropertyAssignment(p) && p.name.text === "slug");
            if (sp && ts.isStringLiteralLike(sp.initializer)) slug = sp.initializer.text;
          }
          up = up.parent;
        }
        removed.push({ file: f, slug, text: el.getText(sf).slice(0, 160) });
      });
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  if (!cuts.length) continue;
  cuts.sort((a, b) => b[0] - a[0]);
  let out = text;
  for (const [a, b] of cuts) out = out.slice(0, a) + out.slice(b);
  total += cuts.length;
  console.log(`${f}: ${cuts.length}`);
  if (flag !== "--dry") fs.writeFileSync(file, out, "utf8");
}
console.log(`total ${total}${flag === "--dry" ? " (dry run)" : ""}`);
if (process.env.REPORT) fs.writeFileSync(process.env.REPORT, JSON.stringify(removed, null, 1), "utf8");
