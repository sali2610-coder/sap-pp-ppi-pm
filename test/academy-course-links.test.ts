import test from "node:test";
import assert from "node:assert/strict";
import "./app-modules.mjs";

// Project NEO is the only site: a textbook link opens its NEO course, and the
// map behind it names a real course for every textbook in the registry.
const { TEXTBOOK_COURSE, textbookCourseHref } = await import("../components/neo-shell/learn/lesson-links.ts");
const { BOOKS } = await import("../data/library/academy-index.ts");
const { ACADEMY } = await import("../lib/academy/model.ts");

test("every digital-library textbook maps to a NEO academy course", () => {
  for (const b of BOOKS) {
    const course = TEXTBOOK_COURSE[b.id];
    assert.ok(course, `no course for textbook ${b.id}`);
    assert.ok(ACADEMY[course], `course ${course} (textbook ${b.id}) is not in the academy`);
    assert.equal(textbookCourseHref(b.id), `/neo/academy/${course}/`);
  }
});

test("a textbook's generated lessons live in the course it maps to", () => {
  // the generated lesson slugs carry the textbook id (pmu-1-1 -> pm-user)
  for (const [id, course] of Object.entries(TEXTBOOK_COURSE)) {
    const slugs = ACADEMY[course].lessons.map((l: { slug: string }) => l.slug);
    if (slugs.some((s: string) => /^[a-z]+-\d+-\d+$/.test(s))) assert.ok(slugs.every((s: string) => s.startsWith(`${id}-`)), `${course} holds lessons of another textbook`);
  }
});

const { neoHrefOf } = await import("../components/neo-shell/learn/lesson-neo-links.ts");

test("a lesson's cross-links stay inside NEO or lose their link", () => {
  assert.equal(neoHrefOf("/academy/lesson/pm-equipment/"), "/neo/academy/pm/pm-equipment/");
  assert.equal(neoHrefOf("/academy/lesson/pmu-1-1/"), "/neo/academy/pm-user/pmu-1-1/");
  assert.equal(neoHrefOf("/academy/path/qm/"), "/neo/academy/qm/");
  assert.equal(neoHrefOf("/academy/"), "/neo/academy/");
  assert.equal(neoHrefOf("/library/book1/#ch-3"), "/neo/read/book1/#ch-3");
  assert.equal(neoHrefOf("/library/book8/?s=3.1#sec-3.1"), "/neo/read/book8/?s=3.1#sec-3.1");
  assert.equal(neoHrefOf("/library/pm-academy/chapter-02/"), "/neo/academy/pm/");
  assert.equal(neoHrefOf("/library/"), "/neo/books/");
  // a pre-NEO family with no NEO twin is shown as a chip, never linked out
  assert.equal(neoHrefOf("/sap-notes/backflush-cogi-affw/"), null);
  assert.equal(neoHrefOf("/academy/lesson/no-such-lesson/"), null);
  // NEO and external addresses pass through
  assert.equal(neoHrefOf("/neo/tables/AFKO/"), "/neo/tables/AFKO/");
  assert.equal(neoHrefOf("https://help.sap.com/"), "https://help.sap.com/");
});
