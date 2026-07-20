/**
 * SAP Academy — textbook → Lesson-engine migrator (content-preserving).
 * Converts a *-textbook (LearningNode tree) into the canonical block-engine Lesson
 * format WITHOUT shortening, summarising, merging lessons, or dropping any content:
 *   - one Lesson per subchapter (source "lesson"); descendant nodes (source
 *     "sections") are aggregated into the same lesson's blocks with their titles as
 *     sub-headings, so 100% of the prose + every SAP object / T-Code / table / example
 *     is preserved.
 *   - chapter order + lesson order + prev/next follow the source exactly.
 *
 * Run: npx tsx scripts/migrate-academy-module.mts <moduleKey>
 *   moduleKey = pmu | mm | wm | ppds | sop
 */
import { writeFileSync } from "node:fs";
import type { LearningNode, TextbookChapter } from "../data/library/pp-textbook/types";
import { nodeWordCount } from "../data/library/pp-textbook/types";
import { PMU_TEXTBOOK } from "../data/library/pmu-textbook";
import { MM_TEXTBOOK } from "../data/library/mm-textbook";
import { WM_TEXTBOOK } from "../data/library/wm-textbook";
import { PPDS_TEXTBOOK } from "../data/library/ppds-textbook";
import { SOP_TEXTBOOK } from "../data/library/sop-textbook";

interface Cfg { key: string; module: string; moduleId: string; trackHe: string; titleHe: string; titleEn: string; color: string; data: Record<string, TextbookChapter> }
const CFGS: Record<string, Cfg> = {
  pmu: { key: "pmu", module: "PM-User", moduleId: "pm-user", trackHe: "תחזוקת מפעל · מדריך משתמש", titleHe: "תחזוקת מפעל — מדריך משתמש", titleEn: "Plant Maintenance — Business User", color: "#ea580c", data: PMU_TEXTBOOK },
  mm: { key: "mm", module: "MM", moduleId: "mm", trackHe: "רכש ואספקה · MM", titleHe: "רכש ואספקה", titleEn: "Sourcing & Procurement", color: "#d97706", data: MM_TEXTBOOK },
  wm: { key: "wm", module: "WM", moduleId: "wm", trackHe: "ניהול מחסן · EWM", titleHe: "ניהול מחסן (EWM)", titleEn: "Warehouse Management", color: "#7c3aed", data: WM_TEXTBOOK },
  ppds: { key: "ppds", module: "PP-DS", moduleId: "pp-ds", trackHe: "תכנון מתקדם · PP/DS", titleHe: "תכנון מתקדם (PP/DS)", titleEn: "Production Planning & Detailed Scheduling", color: "#0891b2", data: PPDS_TEXTBOOK },
  sop: { key: "sop", module: "SOP", moduleId: "sop", trackHe: "תכנון מכירות ותפעול · IBP", titleHe: "תכנון מכירות ותפעול (IBP)", titleEn: "Sales & Operations Planning", color: "#0d9488", data: SOP_TEXTBOOK },
};

const moduleKey = process.argv[2] || "pmu";
const cfg = CFGS[moduleKey];
if (!cfg) { console.error("unknown module key:", moduleKey); process.exit(1); }

const slugOf = (id: string) => `${cfg.key}-${id.replace(/\./g, "-")}`;
const uniq = (a: string[]) => [...new Set(a.filter((x) => x && x !== "—"))];
const flatten = (n: LearningNode): LearningNode[] => [n, ...(n.children ?? []).flatMap(flatten)];
// prose across the subchapter + descendants; descendants prefixed with their title.
function prose(nodes: LearningNode[], pick: (n: LearningNode) => string | undefined, root: LearningNode): string {
  const parts: string[] = [];
  for (const n of nodes) { const v = (pick(n) || "").trim(); if (!v) continue; parts.push(n === root ? v : `**${n.titleHe}** — ${v}`); }
  return parts.join("\n\n");
}
function proseArr(nodes: LearningNode[], pick: (n: LearningNode) => string[] | undefined, root: LearningNode): string {
  const parts: string[] = [];
  for (const n of nodes) { const v = (pick(n) || []).filter(Boolean); if (!v.length) continue; parts.push((n === root ? "" : `**${n.titleHe}**\n`) + v.map((x) => `• ${x}`).join("\n")); }
  return parts.join("\n\n");
}
const items = (nodes: LearningNode[], pick: (n: LearningNode) => string[] | undefined) => nodes.flatMap((n) => (pick(n) || []).filter(Boolean));

type Block = Record<string, unknown> & { kind: string };
function buildBlocks(root: LearningNode): Block[] {
  const nodes = flatten(root);
  const B: Block[] = [];
  const add = (b: Block | null) => { if (b) B.push(b); };
  const src = { trust: "curated", source: cfg.titleEn };
  const p = (kind: string, md: string) => (md.trim() ? { kind, ...src, md } : null);
  const list = (kind: string, arr: string[]) => (arr.length ? { kind, ...src, items: arr } : null);

  add(p("objective", prose(nodes, (n) => n.execHe, root)));
  add(p("why", prose(nodes, (n) => n.beginnerHe, root)));
  add(p("business-value", prose(nodes, (n) => n.purposeHe, root)));
  const nav = uniq(nodes.flatMap((n) => n.navHe || []));
  add(p("where-used", nav.map((x) => `• ${x}`).join("\n")));
  add(list("key-concepts", items(nodes, (n) => n.takeawaysHe)));
  add(p("cbc-example", prose(nodes, (n) => [n.scenarioHe, n.processExampleHe].filter(Boolean).join("\n\n"), root)));
  const flow = (root.flow || []).map((f) => f.he).filter(Boolean);
  if (flow.length) add({ kind: "flow", ...src, steps: flow });
  const tables = uniq(nodes.flatMap((n) => n.tables || []));
  if (tables.length) add({ kind: "tables", ...src, rows: tables.map((c) => ({ code: c, he: c })) });
  const tcodes = uniq(nodes.flatMap((n) => n.tcodes || []));
  if (tcodes.length) add({ kind: "tcodes", ...src, refs: tcodes.map((c) => ({ code: c })) });
  const fiori = uniq(nodes.flatMap((n) => n.fiori || []));
  if (fiori.length) add({ kind: "fiori", ...src, refs: fiori.map((c) => ({ code: c })) });
  add(p("spro", proseArr(nodes, (n) => n.configHe, root)));
  add(list("common-mistakes", items(nodes, (n) => n.mistakesHe)));
  add(p("troubleshooting", proseArr(nodes, (n) => n.troubleshootHe, root)));
  add(list("best-practices", items(nodes, (n) => n.bestPracticeHe)));
  const tips = nodes.map((n) => { const v = (n.consultantHe || "").trim(); return v ? (n === root ? v : `**${n.titleHe}** — ${v}`) : ""; }).filter(Boolean);
  add(list("tips", tips));
  const md = uniq(nodes.flatMap((n) => n.masterDataHe || []));
  const iv = nodes.flatMap((n) => (n.interviewHe || []).map((q) => `**${q.qHe}**\n${q.aHe}`));
  const notesMd = [md.length ? "**נתוני אב**\n" + md.map((x) => `• ${x}`).join("\n") : "", iv.length ? "**שאלות ראיון**\n" + iv.join("\n\n") : ""].filter(Boolean).join("\n\n");
  // relatedHe cross-links point at legacy /library/<mod>/chapter-NN routes that are
  // not generated as pages (they 404) — keep their LABELS as text inside notes rather
  // than as a `related` block whose RelatedCard requires a live href. No learning
  // content is lost; the concepts themselves are covered in the lesson prose.
  const relatedLabels = uniq(nodes.flatMap((n) => (n.relatedHe || []).map((r) => r.labelHe)));
  const notesFull = [notesMd, relatedLabels.length ? "**נושאים קשורים**\n" + relatedLabels.map((x) => `• ${x}`).join("\n") : ""].filter(Boolean).join("\n\n");
  add(p("notes", notesFull));
  add(p("summary", items(nodes, (n) => n.takeawaysHe).map((t) => `• ${t}`).join("\n")));
  return B;
}

const level = (w: number) => (w < 200 ? "בסיסי" : w < 500 ? "בינוני" : "מורכב");

// flat ordered lessons
interface Out { slug: string; chapterN: number; chapterTitle: string; posInChapter: number; title: string; titleEn: string; minutes: number; level: string; blocks: Block[] }
const flat: Out[] = [];
const chapters = Object.values(cfg.data).sort((a, b) => a.n - b.n);
for (const ch of chapters) {
  ch.subchapters.forEach((sub, i) => {
    const w = nodeWordCount(sub) + (sub.children ?? []).reduce((s, c) => s + nodeWordCount(c), 0);
    flat.push({ slug: slugOf(sub.id), chapterN: ch.n, chapterTitle: ch.titleHe, posInChapter: i + 1, title: sub.titleHe, titleEn: sub.titleEn, minutes: Math.max(4, Math.round(w / 180)), level: level(w), blocks: buildBlocks(sub) });
  });
}

// lessons object
const lessons = flat.map((o, i) => ({
  slug: o.slug, module: cfg.module, track: cfg.trackHe, course: o.chapterTitle, chapter: o.chapterTitle,
  index: o.posInChapter, title: o.title, titleEn: o.titleEn, level: o.level, minutes: o.minutes,
  trust: "curated", source: cfg.titleEn,
  prev: i > 0 ? flat[i - 1].slug : undefined, next: i < flat.length - 1 ? flat[i + 1].slug : undefined,
  blocks: o.blocks,
}));

// PATH
const byChapter = new Map<number, { title: string; lessons: { title: string; slug: string; minutes: number; level: string }[] }>();
for (const o of flat) {
  if (!byChapter.has(o.chapterN)) byChapter.set(o.chapterN, { title: o.chapterTitle, lessons: [] });
  byChapter.get(o.chapterN)!.lessons.push({ title: o.title, slug: o.slug, minutes: o.minutes, level: o.level });
}
const path = { module: cfg.module, title: cfg.titleHe, titleEn: cfg.titleEn, color: cfg.color, currentChapter: 0, chapters: [...byChapter.values()] };

const CONST = cfg.key.toUpperCase();
const out = `// AUTO-GENERATED by scripts/migrate-academy-module.mts from ${CONST}_TEXTBOOK.\n// Content-preserving migration to the Lesson block engine — DO NOT EDIT BY HAND.\n// Regenerate: npx tsx scripts/migrate-academy-module.mts ${cfg.key}\nimport type { Lesson } from "@/lib/academy/lesson-types";\nimport type { LearningPath } from "@/lib/academy/paths";\n\nexport const ${CONST}_GENERATED_LESSONS: Record<string, Lesson> = ${JSON.stringify(Object.fromEntries(lessons.map((l) => [l.slug, l])), null, 1)} as unknown as Record<string, Lesson>;\n\nexport const ${CONST}_PATH: LearningPath = ${JSON.stringify(path, null, 1)};\n`;
writeFileSync(`data/academy/lessons/${cfg.key}-generated.ts`, out);

// coverage
const srcWords = chapters.reduce((s, ch) => s + ch.subchapters.reduce((a, sub) => a + nodeWordCount(sub) + (sub.children ?? []).reduce((x, c) => x + nodeWordCount(c), 0), 0), 0);
const srcTcodes = new Set(chapters.flatMap((ch) => ch.subchapters.flatMap((s) => flatten(s).flatMap((n) => [...(n.tcodes || []), ...(n.tables || []), ...(n.fiori || [])])).filter((x) => x && x !== "—")));
console.log(`[${cfg.key}] chapters=${chapters.length} lessons=${flat.length} blocks=${flat.reduce((s, o) => s + o.blocks.length, 0)}`);
console.log(`[${cfg.key}] source words=${srcWords} · unique SAP objects=${srcTcodes.size} → data/academy/lessons/${cfg.key}-generated.ts`);
