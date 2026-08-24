import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
const R = process.cwd();
const readAll = (dir) => {
  const acc = {};
  const walk = (d) => { for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p); else if (e.name.endsWith(".json")) acc[path.relative(dir, p)] = readFileSync(p, "utf8");
  }};
  walk(dir); return acc;
};
const before = readAll("/tmp/books.before");
const after = readAll(path.join(R, "data", "books"));
const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
let changed = [], onlyAfter = [], onlyBefore = [];
for (const k of keys) {
  if (!(k in before)) { onlyAfter.push(k); continue; }
  if (!(k in after)) { onlyBefore.push(k); continue; }
  if (before[k] !== after[k]) changed.push(k);
}
console.log("files: before", Object.keys(before).length, "after", Object.keys(after).length);
console.log("only-after:", onlyAfter.length, onlyAfter.slice(0,5));
console.log("only-before:", onlyBefore.length, onlyBefore.slice(0,5));
console.log("changed:", changed.length, changed.slice(0, 12));
// character accounting on the changed files
const he = (s) => (s.match(/[֐-׿]/g) || []).length;
const la = (s) => (s.match(/[A-Za-z]/g) || []).length;
let bH=0,bL=0,aH=0,aL=0;
for (const k of changed) { bH+=he(before[k]); bL+=la(before[k]); aH+=he(after[k]); aL+=la(after[k]); }
for (const k of onlyAfter) { aH+=he(after[k]); aL+=la(after[k]); }
for (const k of onlyBefore) { bH+=he(before[k]); bL+=la(before[k]); }
console.log(`Hebrew chars  before=${bH}  after=${aH}  delta=${aH-bH}`);
console.log(`Latin  chars  before=${bL}  after=${aL}  delta=${aL-bL}`);
// whole-corpus totals, as a safety net
const tot = (o) => Object.values(o).reduce((a,s)=>[a[0]+he(s),a[1]+la(s)],[0,0]);
const tb = tot(before), ta = tot(after);
console.log(`CORPUS Hebrew before=${tb[0]} after=${ta[0]} delta=${ta[0]-tb[0]}`);
console.log(`CORPUS Latin  before=${tb[1]} after=${ta[1]} delta=${ta[1]-tb[1]}`);
