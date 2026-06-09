// Merge extracted English sections + authored Hebrew into data/library/book1-full.json.
// Includes ONLY chapters that already have a he/ch{N}.json translation file, so
// the dual-language matrix grows chapter-by-chapter without placeholders.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIR = path.join(ROOT, "data", "library", "book1");

const manifest = JSON.parse(fs.readFileSync(path.join(DIR, "manifest.json"), "utf8"));
const out = { book: manifest.book, pages: manifest.pages, chapters: [] };

for (const ch of manifest.chapters) {
  const hePath = path.join(DIR, "he", `ch${ch.n}.json`);
  if (!fs.existsSync(hePath)) continue; // not translated yet → skip (no placeholder)
  const he = JSON.parse(fs.readFileSync(hePath, "utf8"));
  const secFile = JSON.parse(fs.readFileSync(path.join(DIR, `ch${ch.n}.sections.json`), "utf8"));
  const sections = secFile.sections.map((s) => ({
    id: s.id,
    title: s.title,
    en: s.text.replace(/\s+/g, " ").trim(),
    he: he[s.id] ?? "",
  }));
  out.chapters.push({ n: ch.n, title: ch.title, pages: ch.pages, sections });
}

fs.writeFileSync(path.join(ROOT, "data", "library", "book1-full.json"), JSON.stringify(out, null, 2));
const secs = out.chapters.reduce((s, c) => s + c.sections.length, 0);
const translated = out.chapters.reduce((s, c) => s + c.sections.filter((x) => x.he).length, 0);
console.log(`✓ book1-full.json — ${out.chapters.length} translated chapters, ${secs} sections (${translated} with Hebrew)`);
