/**
 * Contract tests for the Library reading experience.
 *
 * WHY THESE EXIST
 *
 * The bespoke reader was lost once already. Retiring the eleven hand-maintained
 * book pages moved every book onto one data-driven route — correct for the URLs
 * and the data — but it left components/book-reader.tsx orphaned: still in the
 * tree, still compiling, rendered by nothing. What shipped in its place was a
 * heading, a metadata strip and a chapter list.
 *
 * Nothing failed. The build was green, the routes emitted, the dead-link crawl
 * passed, and every section still resolved to content. The loss was invisible to
 * every gate the project had, which is precisely why it needs its own.
 *
 * These tests assert the reading experience is WIRED, not merely present. A
 * component that exists but is imported by nobody is what caused the regression,
 * so "does the file exist" is deliberately not the assertion.
 */
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const read = (p: string) => readFileSync(path.join(ROOT, p), "utf8");

const ROUTE = "app/library/[bookId]/page.tsx";
const EXPERIENCE = "components/library/reading-experience.tsx";
const READER = "components/book-reader.tsx";
const VIEW = "components/library/book-view.tsx";

describe("Library reader — the shell is wired, not orphaned", () => {
  test("the book route renders the reading experience", () => {
    const src = read(ROUTE);
    assert.match(src, /<ReadingExperience\b/, "the book route must render <ReadingExperience>");
    assert.match(src, /from "@\/components\/library\/reading-experience"/);
  });

  test("the reading experience renders BookReader wrapping BookView", () => {
    const src = read(EXPERIENCE);
    assert.match(src, /<BookReader\b/, "BookReader is the reading shell and must be rendered");
    assert.match(src, /<BookView\b/, "BookView renders the body inside the shell");
    assert.match(src, /from "@\/components\/book-reader"/);
  });

  test("BookReader is the single owner of the active chapter", () => {
    const src = read(EXPERIENCE);
    assert.match(src, /onActiveChange=\{/, "BookView must be controlled by the shell");
    assert.match(src, /active=\{/, "the active chapter must be passed down");
  });

  test("BookView does not keep a competing chapter picker when controlled", () => {
    const src = read(VIEW);
    assert.match(src, /const controlled = onActiveChange != null/);
    assert.match(src, /\{!controlled && \(/, "its own chapter list must be suppressed when controlled");
  });
});

describe("Library reader — the premium controls survive", () => {
  // Each control is asserted by the Hebrew string a reader actually sees, so a
  // rename that removes the feature fails here rather than passing on a class
  // name that happens to survive.
  const CONTROLS: [string, string][] = [
    ["Start Reading", "התחל לקרוא"],
    ["Table of Contents", "עיין בתוכן"],
    ["Focus Mode", "מצב מיקוד"],
    ["Reading View", "תצוגת קריאה"],
    ["Search", "חיפוש"],
    ["Progress", "התקדמות"],
  ];

  for (const [label, needle] of CONTROLS) {
    test(`${label} is present in the reader`, () => {
      assert.ok(read(READER).includes(needle), `${label} ("${needle}") disappeared from the reader`);
    });
  }
});

describe("Library reader — scroll-spy and progress can bind", () => {
  test("the reader queries the anchors the body emits", () => {
    const reader = read(READER);
    assert.match(reader, /\[data-chapter\]/, "the progress rail binds to [data-chapter]");
    assert.match(reader, /\[data-section\]/, "scroll-spy binds to [data-section]");
  });

  test("the body emits those anchors", () => {
    const view = read(VIEW);
    assert.match(view, /data-chapter=\{/, "chapters must carry data-chapter or progress is inert");
    assert.match(view, /data-section=\{/, "sections must carry data-section or scroll-spy is inert");
    assert.match(view, /data-section-title=\{/, "the section index needs data-section-title");
  });

  test("figures and diagrams are still reachable", () => {
    assert.ok(existsSync(path.join(ROOT, "components/figure-viewer.tsx")));
    assert.match(read(VIEW), /<FigureViewer\b/, "the figure viewer must stay wired to the body");
  });
});

describe("Library data — every book survives the migration intact", () => {
  const SOURCE = "data/library";
  const MIGRATED = "data/books";
  const ids = Array.from({ length: 11 }, (_, i) => `book${i + 1}`);

  test("all eleven books are migrated", () => {
    const present = readdirSync(path.join(ROOT, MIGRATED)).filter((f) => f.endsWith(".json"));
    assert.equal(present.length, 11, `expected 11 migrated books, found ${present.length}`);
  });

  for (const id of ids) {
    test(`${id}: chapter and section counts match the source`, () => {
      const source = JSON.parse(read(`${SOURCE}/${id}-full.json`));
      const migrated = JSON.parse(read(`${MIGRATED}/${id}.json`));

      const srcChapters = (source.chapters ?? []).length;
      const migChapters = (migrated.chapters ?? []).length;
      assert.equal(
        migChapters, srcChapters,
        `${id}: source declares ${srcChapters} chapters, migration produced ${migChapters}. ` +
        "A chapter with zero sections is an editorial state, not a reason to drop it.",
      );

      const srcSections = (source.chapters ?? []).reduce((n: number, c: { sections?: unknown[] }) => n + (c.sections?.length ?? 0), 0);
      const migSections = (migrated.chapters ?? []).reduce((n: number, c: { sections?: unknown[] }) => n + (c.sections?.length ?? 0), 0);
      assert.equal(migSections, srcSections, `${id}: section count drifted (${srcSections} → ${migSections})`);
    });
  }

  test("book7 keeps all twelve chapters", () => {
    // Regression guard for the exact loss found: ch12 "Additional Resources" has
    // no sections, was built only from the section index, and silently vanished.
    // The bespoke page showed it, so it must keep showing.
    const book7 = JSON.parse(read(`${MIGRATED}/book7.json`));
    assert.equal(book7.chapters.length, 12, "book7 lost a chapter again");
    assert.ok(book7.chapters.some((c: { n: number }) => c.n === 12), "book7 chapter 12 is missing");
  });

  test("book metadata is not silently dropped", () => {
    for (const id of ids) {
      const m = JSON.parse(read(`${MIGRATED}/${id}.json`));
      assert.ok(m.meta?.title?.en || m.meta?.title?.he, `${id}: title missing`);
      assert.ok(m.meta?.module, `${id}: module missing`);
      assert.ok(m.id === id, `${id}: id mismatch`);
    }
  });
});
