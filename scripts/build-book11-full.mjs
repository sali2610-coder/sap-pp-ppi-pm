// Merge extracted English sections + authored Hebrew into data/library/book11-full.json.
// Mirrors scripts/build-book10-full.mjs.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIR = path.join(ROOT, "data", "library", "book11");

const manifest = JSON.parse(fs.readFileSync(path.join(DIR, "manifest.json"), "utf8"));
const out = { book: manifest.book, pages: manifest.pages, chapters: [] };

for (const ch of manifest.chapters) {
  const hePath = path.join(DIR, "he", `ch${ch.n}.json`);
  const he = fs.existsSync(hePath) ? JSON.parse(fs.readFileSync(hePath, "utf8")) : {};
  const secFile = JSON.parse(fs.readFileSync(path.join(DIR, `ch${ch.n}.sections.json`), "utf8"));
  const sections = secFile.sections.map((s) => ({
    id: s.id,
    title: s.title,
    en: s.text.replace(/\s+/g, " ").trim(),
    he: he[s.id] ?? "",
  }));
  out.chapters.push({ n: ch.n, title: ch.title, pages: ch.pages, translated: Object.keys(he).length > 0, sections });
}

fs.writeFileSync(path.join(ROOT, "data", "library", "book11-full.json"), JSON.stringify(out, null, 2));

const index = out.chapters.flatMap((c) =>
  c.sections.map((s) => ({ ch: c.n, id: s.id, title: s.title, snippet: s.en.slice(0, 260), he: Boolean(s.he) })),
);
fs.writeFileSync(path.join(ROOT, "data", "library", "book11-index.json"), JSON.stringify(index, null, 2));

const translated = out.chapters.filter((c) => c.translated).length;
const heCount = out.chapters.reduce((s, c) => s + c.sections.filter((x) => x.he).length, 0);
const total = out.chapters.reduce((s, c) => s + c.sections.length, 0);
console.log(`✓ book11-full.json — ${out.chapters.length} chapters, ${total} sections (${heCount} with Hebrew), ${translated} chapters translated`);
