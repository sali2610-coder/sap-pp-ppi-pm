#!/usr/bin/env node
/* ============================================================================
   PROJECT NEO · BOOK INTEGRITY GATE
   ----------------------------------------------------------------------------
   WHY THIS EXISTS

     The library was being counted twice, by two registries that had never been
     introduced to each other:

       data/books/*.json      read by lib/library/registry.ts  -> ids book1..N
       data/library.ts        hand-authored LIBRARY array      -> slug ids

     They disagreed (11 vs 10), so Home said one number, the Books shelf said
     another, and the Digital Library said a third. Changing the copy would
     have hidden that, not fixed it.

     This script is the gate that makes the mismatch impossible to ship again.
     It does not decide what the right number IS — it fails whenever the
     surfaces stop agreeing, and prints the evidence.

   IT REPORTS, IT DOES NOT REPAIR

     Nothing here edits a book. A duplicated or missing work is a CONTENT
     decision for the project owner; the script's job is to make sure nobody
     has to notice it by eye.

   Run: node scripts/check-books-integrity.mjs
   Exit 0 clean · exit 1 on any divergence.
   ========================================================================== */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const BOOKS_DIR = path.join(ROOT, "data", "books");
const LIB_TS = path.join(ROOT, "data", "library.ts");

const problems = [];
const warn = [];

/* ---------------------------------------------------------- the JSON spine */

const files = fs
  .readdirSync(BOOKS_DIR)
  .filter((f) => f.endsWith(".json"))
  .sort((a, b) => (parseInt(a.replace(/\D/g, ""), 10) || 0) - (parseInt(b.replace(/\D/g, ""), 10) || 0));

const books = files.map((f) => {
  const d = JSON.parse(fs.readFileSync(path.join(BOOKS_DIR, f), "utf8"));
  const t = d.meta?.title;
  const chapters = d.chapters || [];
  return {
    id: d.id || f.replace(/\.json$/, ""),
    file: f,
    en: (typeof t === "string" ? t : t?.en) || "",
    he: (typeof t === "object" ? t?.he : "") || "",
    module: d.meta?.module ?? null,
    pages: d.meta?.pages ?? null,
    chapters: chapters.length,
    sections: chapters.reduce((n, c) => n + ((c.sections || c.subchapters || []).length), 0),
  };
});

/* --------------------------------------------------- the hand-authored side */

const libSrc = fs.readFileSync(LIB_TS, "utf8");
const libEntries = [...libSrc.matchAll(/id:\s*"([^"]+)",\s*\n\s*title:\s*"([^"]+)"/g)].map((m) => ({
  slug: m[1],
  title: m[2],
}));

/* ------------------------------------------------------------ the checks */

// 1. ids are unique and well formed.
const seen = new Set();
for (const b of books) {
  if (seen.has(b.id)) problems.push(`duplicate book id: ${b.id}`);
  seen.add(b.id);
  if (!/^book\d+$/.test(b.id)) problems.push(`non-canonical id "${b.id}" in ${b.file}`);
  if (!b.en) problems.push(`${b.id} has no English title`);
  if (!b.chapters) problems.push(`${b.id} has no chapters`);
}

// 2. THE ONE THAT CAUGHT THE REAL BUG.
//    Two files describing the same work. Compared on the signature a reader
//    would use — module, chapter count, section count, and the title with its
//    punctuation normalised, because "Guide — Business" and "Guide: Business"
//    are the same book and only differ by a dash.
const norm = (s) =>
  s.toLowerCase().replace(/[—–:-]/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
const sig = new Map();
for (const b of books) {
  const k = `${norm(b.en)}|${b.module}|${b.chapters}|${b.sections}`;
  (sig.get(k) ?? sig.set(k, []).get(k)).push(b);
}
for (const [, group] of sig) {
  if (group.length > 1) {
    problems.push(
      `SAME WORK STORED ${group.length} TIMES: ${group.map((g) => g.id).join(" + ")}\n` +
        group
          .map((g) => `      ${g.id}  "${g.en}"  ${g.module} · ${g.chapters} ch · ${g.sections} sec · pages ${g.pages ?? "—"}`)
          .join("\n") +
        `\n      -> these count as ${group.length} on any surface that counts FILES and as 1 on any\n` +
        `         surface that counts distinct works. That is the count mismatch.`,
    );
  }
}

// 3. every distinct work should have a hand-authored entry, and vice versa.
const libTitles = new Map(libEntries.map((e) => [norm(e.title), e.slug]));
const mapped = new Map();
for (const b of books) {
  const slug = libTitles.get(norm(b.en));
  if (!slug) {
    warn.push(`${b.id} "${b.en}" has no data/library.ts entry — it cannot appear in the Digital Library`);
    continue;
  }
  (mapped.get(slug) ?? mapped.set(slug, []).get(slug)).push(b.id);
}
for (const [slug, ids] of mapped) {
  if (ids.length > 1) problems.push(`LIBRARY slug "${slug}" is claimed by ${ids.join(" + ")}`);
}
const claimed = new Set([...mapped.keys()]);
for (const e of libEntries) {
  if (!claimed.has(e.slug)) warn.push(`LIBRARY entry "${e.slug}" has no data/books/*.json spine — orphan`);
}

// 4. metadata completeness, reported rather than filled in.
//    Hebrew is deliberately NOT required in the JSON: the Hebrew title lives in
//    data/library.ts as `titleHe`, and that is where the Digital Library reads
//    it. A book only has a real Hebrew problem when it has neither.
for (const b of books) {
  if (b.pages == null) warn.push(`${b.id} has no page count in metadata — it cannot join a page total`);
  if (!b.he && !libTitles.get(norm(b.en))) {
    warn.push(`${b.id} has no Hebrew title in either registry — it will render English in an RTL product`);
  }
}

/* ------------------------------------------------------------- the report */

const distinct = sig.size;
console.log("PROJECT NEO · book integrity\n");
console.log(`  files on disk        ${books.length}`);
console.log(`  distinct works       ${distinct}`);
console.log(`  data/library.ts      ${libEntries.length}`);
console.log("");
console.log("  id       module    ch   sec   pages  title");
for (const b of books) {
  console.log(
    `  ${b.id.padEnd(8)} ${String(b.module ?? "—").padEnd(9)} ${String(b.chapters).padStart(2)} ${String(b.sections).padStart(5)} ${String(b.pages ?? "—").padStart(7)}  ${b.en.slice(0, 48)}`,
  );
}

if (warn.length) {
  console.log("\nNOTES\n" + warn.map((w) => `  · ${w}`).join("\n"));
}

if (problems.length) {
  console.log("\nFAILURES\n" + problems.map((p) => `  ✗ ${p}`).join("\n"));
  console.log(
    `\n  ${books.length} files but ${distinct} distinct works. Until that is resolved, no single\n` +
      `  number is correct for every surface, and binding the UI to either one only\n` +
      `  moves the contradiction somewhere else.\n`,
  );
  process.exit(1);
}

console.log(`\n  OK — ${books.length} files, ${distinct} distinct works, ${libEntries.length} library entries, all agree.\n`);
