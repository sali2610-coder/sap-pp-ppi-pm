// Extract real figures (SAP screenshots/diagrams) from Book #1 via poppler's
// pdfimages. Filters out icons/rules by min size, names by page, copies to
// public/assets/library/book1/figures/, and writes a per-chapter manifest.
//
// Run: node scripts/extract-book1-figures.mjs

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PDF = path.join(ROOT, "docs", "Configuring Plant Maintenance in SAP S4HANA __ Copy 8c2w-6zg4-uifn-jht9.pdf");
const OUT = path.join(ROOT, "public", "assets", "library", "book1", "figures");
const MANIFEST = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "library", "book1", "manifest.json"), "utf8"));

const MIN_W = 220;
const MIN_H = 120; // drop icons, rules, logos

fs.mkdirSync(OUT, { recursive: true });

// parse `pdfimages -list` rows -> [{page,num,w,h}]
function listImages(from, to) {
  const txt = execFileSync("pdfimages", ["-list", "-f", String(from), "-l", String(to), PDF], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return txt
    .split("\n")
    .slice(2)
    .map((l) => l.trim().split(/\s+/))
    .filter((c) => c.length > 6 && /^\d+$/.test(c[0]))
    .map((c) => ({ page: +c[0], num: +c[1], type: c[2], w: +c[3], h: +c[4] }));
}

const figuresByChapter = {};
let total = 0;

for (const ch of MANIFEST.chapters) {
  const [from, to] = ch.pages;
  const rows = listImages(from, to);
  const keep = rows.filter((r) => r.w >= MIN_W && r.h >= MIN_H && r.type === "image");
  if (!keep.length) {
    figuresByChapter[ch.n] = [];
    continue;
  }
  // extract all images for the range to a temp dir, then map by num
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `b1fig-${ch.n}-`));
  execFileSync("pdfimages", ["-png", "-f", String(from), "-l", String(to), PDF, path.join(tmp, "img")], {
    maxBuffer: 64 * 1024 * 1024,
  });
  const files = fs.readdirSync(tmp).filter((f) => f.endsWith(".png")).sort();
  // pdfimages writes img-000.png in num order (0..N)
  const figs = [];
  for (const r of keep) {
    const fname = files.find((f) => Number(f.match(/-(\d+)\.png$/)?.[1]) === r.num);
    if (!fname) continue;
    const dest = `ch${ch.n}-p${String(r.page).padStart(3, "0")}-${r.num}.png`;
    fs.copyFileSync(path.join(tmp, fname), path.join(OUT, dest));
    figs.push({ page: r.page, file: `/assets/library/book1/figures/${dest}`, w: r.w, h: r.h });
    total++;
  }
  fs.rmSync(tmp, { recursive: true, force: true });
  figuresByChapter[ch.n] = figs;
  console.log(`✓ ch${ch.n} (pp${from}-${to}): ${figs.length} figures`);
}

fs.writeFileSync(
  path.join(ROOT, "data", "library", "book1-figures.json"),
  JSON.stringify(figuresByChapter, null, 2),
);
const sz = execFileSync("du", ["-sh", OUT], { encoding: "utf8" }).split("\t")[0];
console.log(`\n✓ ${total} figures → public/assets/library/book1/figures/ (${sz})`);
