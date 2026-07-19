/**
 * SAP Academy — coverage & integrity report (Truth Layer gate, G6).
 * Read-only. Derives everything from lib/academy/model.ts (canonical) and
 * ALL_LESSONS, and asserts the invariants from the regression matrix:
 *   - every PATH lesson has a real Reader lesson (0 missing routes)
 *   - 0 duplicate slugs, 0 orphans (ALL_LESSONS not in any path)
 *   - reports authored lesson.index vs canonical position (the "3 → 13" bug)
 *   - reports authored prev/next vs canonical path order
 * Run: npx tsx scripts/academy-coverage.mts
 */
import { ACADEMY, allModuleIds, getLesson } from "../lib/academy/model";
import { ALL_LESSONS } from "../data/academy/lessons";

let critical = 0;
const line = (s = "") => console.log(s);

line("SAP Academy — Coverage & Integrity Report\n" + "=".repeat(48));

// per-module coverage
let tLessons = 0, tBlocks = 0, tChapters = 0;
for (const id of allModuleIds()) {
  const m = ACADEMY[id]!;
  const blocks = m.lessons.reduce((s, l) => s + l.requiredBlocks, 0);
  const missing = m.lessons.filter((l) => !l.hasLesson);
  tLessons += m.totalLessons; tBlocks += blocks; tChapters += m.chapters.length;
  line(`\n### ${m.moduleId}  (${m.module} · ${m.title})`);
  line(`chapters=${m.chapters.length} · lessons=${m.totalLessons} · blocks=${blocks} · route=/academy/path/${m.moduleId}`);
  if (missing.length) { critical += missing.length; line(`  ✗ MISSING Reader lesson: ${missing.map((l) => l.slug).join(", ")}`); }
}
line(`\nTOTALS: modules=${allModuleIds().length} · chapters=${tChapters} · lessons=${tLessons} · blocks=${tBlocks}`);

// orphans: ALL_LESSONS slugs not present in any path
const orphans = Object.keys(ALL_LESSONS).filter((slug) => !getLesson(slug));
line(`\nOrphans (in ALL_LESSONS, not in any path): ${orphans.length}${orphans.length ? " → " + orphans.join(", ") : ""}`);
if (orphans.length) critical += orphans.length;

// duplicate slugs across modules
const seen = new Map<string, string>();
const dups: string[] = [];
for (const id of allModuleIds()) for (const l of ACADEMY[id]!.lessons) {
  if (seen.has(l.slug)) dups.push(`${l.slug} (in ${seen.get(l.slug)} & ${id})`); else seen.set(l.slug, id);
}
line(`Duplicate slugs across modules: ${dups.length}${dups.length ? " → " + dups.join(", ") : ""}`);
if (dups.length) critical += dups.length;

// authored index vs canonical position (the numbering bug)
const idxMismatch: string[] = [];
for (const slug of Object.keys(ALL_LESSONS)) {
  const l = getLesson(slug); if (!l) continue;
  const authored = (ALL_LESSONS[slug] as { index?: number }).index;
  if (authored != null && authored !== l.posInChapter) idxMismatch.push(`${slug}: authored index=${authored} vs chapter-position=${l.posInChapter} (ch ${l.chapterIndex})`);
}
line(`\nAuthored index vs canonical chapter-position mismatches: ${idxMismatch.length}`);
for (const s of idxMismatch) line("  ⚠ " + s);
line("  (WARNING only — PR-3 makes the UI display the canonical chapter-position, so authored index is no longer shown.)");

// authored prev/next vs canonical path order
const chainMismatch: string[] = [];
for (const slug of Object.keys(ALL_LESSONS)) {
  const l = getLesson(slug); if (!l) continue;
  const a = ALL_LESSONS[slug] as { prev?: string; next?: string };
  if ((a.next || undefined) !== l.next) chainMismatch.push(`${slug}: authored next=${a.next ?? "—"} vs canonical next=${l.next ?? "—"}`);
  if ((a.prev || undefined) !== l.prev) chainMismatch.push(`${slug}: authored prev=${a.prev ?? "—"} vs canonical prev=${l.prev ?? "—"}`);
}
line(`\nAuthored prev/next vs canonical path order mismatches: ${chainMismatch.length}`);
for (const s of chainMismatch) line("  ⚠ " + s);
line("  (WARNING only — PR-3 derives prev/next from the canonical model.)");

line("\n" + "=".repeat(48));
line(critical === 0
  ? "RESULT: PASS — 0 missing routes · 0 orphans · 0 duplicate slugs."
  : `RESULT: FAIL — ${critical} critical integrity issue(s).`);
process.exit(critical === 0 ? 0 : 1);
