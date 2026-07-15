/**
 * SAP Academy — lesson-block engine (P2).
 *
 * Every lesson is a typed data object: an ordered list of blocks. A block renders
 * ONLY when it carries real content — no empty placeholders. Core blocks (objective,
 * why, business value, where-used, key-concepts, summary) are the mandatory spine;
 * technical blocks appear only when relevant. New block kinds can be added here + a
 * renderer in lesson-view without touching lesson data — fully data-driven.
 *
 * Technical blocks reference the platform's EXISTING single sources (BAPI registry,
 * tables, T-codes, Fiori, CDS) — no duplicated data model.
 */

export type BlockKind =
  // ---- core spine (mandatory order) ----
  | "objective"        // 🎯 מה תלמד ב-2 דקות
  | "why"              // 💼 למה זה חשוב בפרויקט אמיתי
  | "business-value"   // 💰 ערך עסקי
  | "where-used"       // 📍 היכן משתמשים
  | "key-concepts"     // 🧩 מושגי מפתח
  // ---- illustrative ----
  | "cbc-example"      // 🏭 דוגמה מ-CBC
  | "flow"             // 🔄 Flow של התהליך
  | "diagram"          // 📊 תרשים
  // ---- technical (render only when relevant) ----
  | "tables"           // 🗂 טבלאות SAP
  | "tcodes"           // 💻 T-Codes
  | "fiori"            // 📱 Fiori Apps
  | "spro"             // ⚙️ SPRO / Configuration
  | "objects"          // 🔗 BAPI / FM / CDS
  | "odata"            // 🌐 OData Services
  | "authorizations"   // 🔐 הרשאות
  | "notes"            // 📄 SAP Notes (only verified)
  // ---- practice & wrap ----
  | "common-mistakes"  // ⚠️ טעויות נפוצות
  | "troubleshooting"  // 🧰 פתרון תקלות
  | "best-practices"   // 🌟 Best Practices
  | "tips"             // 💡 Tips של מיישם בכיר
  | "related"          // 🔗 נושאים קשורים
  | "quiz"             // ❓ שאלות חזרה
  | "summary";         // ✅ סיכום קצר

/** Fixed render order — the "same template every lesson" backbone. */
export const BLOCK_ORDER: BlockKind[] = [
  "objective", "why", "business-value", "where-used", "key-concepts",
  "cbc-example", "flow", "diagram",
  "tables", "tcodes", "fiori", "spro", "objects", "odata", "authorizations", "notes",
  "common-mistakes", "troubleshooting", "best-practices", "tips", "related",
  "quiz", "summary",
];

/** Core blocks — always present in a valid lesson (the mandatory spine). */
export const CORE_BLOCKS: BlockKind[] = ["objective", "why", "business-value", "where-used", "key-concepts", "summary"];

export const BLOCK_META: Record<BlockKind, { emoji: string; he: string; technical?: boolean }> = {
  objective: { emoji: "🎯", he: "מה תלמד ב-2 דקות" },
  why: { emoji: "💼", he: "למה זה חשוב בפרויקט אמיתי" },
  "business-value": { emoji: "💰", he: "ערך עסקי" },
  "where-used": { emoji: "📍", he: "היכן משתמשים" },
  "key-concepts": { emoji: "🧩", he: "מושגי מפתח" },
  "cbc-example": { emoji: "🏭", he: "דוגמה מ-CBC" },
  flow: { emoji: "🔄", he: "Flow של התהליך" },
  diagram: { emoji: "📊", he: "תרשים" },
  tables: { emoji: "🗂", he: "טבלאות SAP רלוונטיות", technical: true },
  tcodes: { emoji: "💻", he: "T-Codes", technical: true },
  fiori: { emoji: "📱", he: "Fiori Apps", technical: true },
  spro: { emoji: "⚙️", he: "SPRO / Configuration", technical: true },
  objects: { emoji: "🔗", he: "BAPI / FM / CDS קשורים", technical: true },
  odata: { emoji: "🌐", he: "OData Services", technical: true },
  authorizations: { emoji: "🔐", he: "הרשאות", technical: true },
  notes: { emoji: "📄", he: "SAP Notes", technical: true },
  "common-mistakes": { emoji: "⚠️", he: "טעויות נפוצות" },
  troubleshooting: { emoji: "🧰", he: "פתרון תקלות" },
  "best-practices": { emoji: "🌟", he: "Best Practices" },
  tips: { emoji: "💡", he: "Tips של מיישם בכיר" },
  related: { emoji: "🔗", he: "נושאים קשורים" },
  quiz: { emoji: "❓", he: "שאלות חזרה" },
  summary: { emoji: "✅", he: "סיכום קצר" },
};

/* ---------- block payloads ---------- */
export type Trust = "verified-docs" | "verified-system" | "curated" | "needs-review";
export interface BlockSource { trust: Trust; source?: string; lastReviewed?: string }

export interface CodeRef { code: string; label?: string; href?: string }        // T-code / Fiori / object / OData
export interface TableRef { code: string; he: string; href?: string }
export interface QuizItem { question: string; options: { text: string; correct?: boolean }[]; explain?: string }

export type LessonBlock = { kind: BlockKind; title?: string } & BlockSource & (
  | { kind: "objective" | "why" | "business-value" | "where-used" | "cbc-example" | "diagram" | "spro" | "troubleshooting" | "notes" | "summary"; md: string; caption?: string }
  | { kind: "key-concepts" | "common-mistakes" | "best-practices" | "tips" | "authorizations"; items: string[] }
  | { kind: "flow"; steps: string[]; activeIndex?: number }
  | { kind: "tables"; rows: TableRef[] }
  | { kind: "tcodes" | "fiori" | "objects" | "odata" | "related"; refs: CodeRef[]; note?: string }
  | { kind: "quiz"; items: QuizItem[] }
);

export interface Lesson {
  slug: string;
  module: string;                 // PM / PP-PI / QM …
  track: string;                  // track title
  course: string;                 // course title
  chapter?: string;
  index?: number;                 // lesson number in the chapter
  title: string;                  // he
  titleEn?: string;
  level: "בסיסי" | "בינוני" | "מורכב";
  minutes: number;                // estimated read time
  trust: Trust;                   // lesson-level verification
  source?: string;
  lastReviewed?: string;
  blocks: LessonBlock[];
  prev?: string;                  // slug
  next?: string;                  // slug
}

/** Visible blocks in canonical order (only those with real content). */
export function orderedBlocks(lesson: Lesson): LessonBlock[] {
  const byKind = new Map<BlockKind, LessonBlock>();
  for (const b of lesson.blocks) byKind.set(b.kind, b);
  return BLOCK_ORDER.map((k) => byKind.get(k)).filter((b): b is LessonBlock => !!b);
}
