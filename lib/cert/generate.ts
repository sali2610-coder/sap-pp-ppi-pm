// NEO Certification — question generator. Builds typed questions from the
// VERIFIED dataset (tables, PK/FK, ER joins, S/4 impact, incidents + CBC). Every
// correct answer and explanation is grounded in real data — nothing generic or
// invented. Distractors are real sibling tables/fields so the test is meaningful.

import { ALL_TABLES } from "@/lib/data";
import { knowledgeFor } from "@/lib/knowledge";
import { INCIDENTS } from "@/data/troubleshooting";
import { S4_IMPACT } from "@/data/s4-impact";
import type { SAPTable } from "@/lib/types";

export type CertModule = "PM" | "PP-PI" | "PP";
export type QType = "table-id" | "pk" | "fk" | "meaning" | "flow" | "join" | "trouble" | "s4" | "thinking" | "cbc";
export type Level = 1 | 2 | 3 | 4;

export interface Question {
  id: string;
  module: CertModule;
  type: QType;
  level: Level;
  stem: string;
  code?: string;          // optional SQL / scenario block
  choices: string[];
  answer: number;         // index of correct choice
  why: string;            // why correct
  wrongNote?: string;     // why the others are wrong (general)
  context?: string;       // business context
  related?: string[];     // related tables
  tcodes?: string[];      // related transactions
  table: string;          // anchor table (mastery / review)
}

export const QTYPE_HE: Record<QType, string> = {
  "table-id": "זיהוי טבלה", pk: "מפתח ראשי", fk: "מפתח זר", meaning: "משמעות עסקית",
  flow: "זרימת נתונים", join: "JOIN / SQL", trouble: "פתרון תקלות", s4: "S/4HANA",
  thinking: "חשיבת יועץ", cbc: "תרחיש CBC",
};
export const LEVEL_HE: Record<Level, string> = { 1: "יועץ זוטר", 2: "יועץ פונקציונלי", 3: "יועץ בכיר", 4: "ארכיטקט פתרון" };
// which question types unlock at each level (cumulative)
const LEVEL_TYPES: Record<Level, QType[]> = {
  1: ["meaning", "table-id", "pk"],
  2: ["meaning", "table-id", "pk", "fk", "flow"],
  3: ["meaning", "table-id", "pk", "fk", "flow", "join", "trouble", "s4"],
  4: ["meaning", "table-id", "pk", "fk", "flow", "join", "trouble", "s4", "thinking", "cbc"],
};

const PP_CORE = new Set(["MARA", "MAKT", "MARC", "MARM", "MBEW", "MAST", "STKO", "STPO", "STAS", "STZU", "PLKO", "PLPO", "PLAS", "PLFL", "PLMZ", "CRHD", "CRTX", "CRCO", "CRCA", "MKAL", "AFKO", "AFPO", "AFVC", "AUFK", "AFFL", "AFFH", "RESB", "PLMK", "MDMA"]);

const tablesFor = (m: CertModule): SAPTable[] => {
  if (m === "PM") return ALL_TABLES.filter((t) => t.module === "PM");
  if (m === "PP-PI") return ALL_TABLES.filter((t) => t.module === "PP-PI");
  return ALL_TABLES.filter((t) => t.module === "PP-PI" && PP_CORE.has(t.tableName)); // PP = production core (CBC: PP = PP-PI)
};

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const uniq = <T,>(a: T[]) => [...new Set(a)];
const pickN = <T,>(pool: T[], n: number, exclude: Set<T> = new Set()) => shuffle(pool.filter((x) => !exclude.has(x))).slice(0, n);
const purpose = (t: SAPTable) => t.descriptionHe || knowledgeFor(t.tableName)?.role || t.descriptionEn;
const txOf = (t: SAPTable) => (t.tcodes || "").split(/[^A-Za-z0-9_/]+/).map((s) => s.trim()).filter((s) => s.length >= 2 && /^[A-Z]/i.test(s)).slice(0, 6);

/** assemble a 4-choice MCQ from a correct value + distractor pool; returns choices + answer index */
function mc(correct: string, distractors: string[]): { choices: string[]; answer: number } | null {
  const ds = uniq(distractors.filter((d) => d && d !== correct)).slice(0, 3);
  if (ds.length < 3) return null;
  const choices = shuffle([correct, ...ds]);
  return { choices, answer: choices.indexOf(correct) };
}

export function buildBank(module: CertModule): Question[] {
  const tables = tablesFor(module);
  const names = tables.map((t) => t.tableName);
  const purposes = uniq(tables.map(purpose).filter(Boolean));
  const out: Question[] = [];
  const push = (q: Omit<Question, "id" | "module">) => out.push({ ...q, id: `${module}-${out.length}`, module });

  for (const t of tables) {
    const T = t.tableName;
    const rel = txOf(t);
    const k = knowledgeFor(T);

    // 1) business meaning — purpose of table
    if (purpose(t)) {
      const m = mc(purpose(t), pickN(purposes, 3, new Set([purpose(t)])));
      if (m) push({ type: "meaning", level: 1, table: T, stem: `מהי המטרה העסקית של הטבלה ${T}?`, ...m,
        why: `${T} = ${purpose(t)}.${k?.why ? " " + k.why : ""}`, wrongNote: "שאר האפשרויות הן מטרות של טבלאות אחרות באותו מודול.", context: t.guideHe || k?.whenUsed, related: t.relations.map((r) => r.table).slice(0, 4), tcodes: rel });
    }
    // 2) table identification — which table holds this purpose
    if (purpose(t)) {
      const m = mc(T, pickN(names, 3, new Set([T])));
      if (m) push({ type: "table-id", level: 1, table: T, stem: `איזו טבלה מכילה: "${purpose(t)}"?`, ...m,
        why: `${T} — ${purpose(t)}.`, wrongNote: "הטבלאות האחרות מאחסנות נתונים שונים.", context: t.guideHe, related: t.relations.map((r) => r.table).slice(0, 4), tcodes: rel });
    }
    // 3) primary key
    const pks = t.fields.filter((f) => f.key === "PK").map((f) => f.tech);
    if (pks.length) {
      const allFields = uniq(tables.flatMap((x) => x.fields.map((f) => f.tech)));
      const m = mc(pks[0], pickN(allFields, 6, new Set(pks)));
      if (m) push({ type: "pk", level: 1, table: T, stem: `מהו שדה המפתח הראשי (PK) של ${T}?`, ...m,
        why: `המפתח הראשי של ${T} הוא ${pks.join(" + ")}.`, wrongNote: "השדות האחרים אינם חלק מהמפתח הראשי של טבלה זו.", context: purpose(t), related: t.relations.map((r) => r.table).slice(0, 4) });
    }
    // 4) foreign key / join field + 5) join SQL
    for (const r of t.relations) {
      const jf = r.fkField || r.pkField;
      if (jf) {
        const fieldPool = uniq(t.fields.map((f) => f.tech).concat(["MATNR", "WERKS", "AUFNR", "PLNNR", "CHARG", "AUFPL"]));
        const m = mc(jf, pickN(fieldPool, 6, new Set([jf])));
        if (m) push({ type: "fk", level: 2, table: T, stem: `${T} מתחברת ל-${r.table} באמצעות איזה שדה?`, ...m,
          why: `הקשר ${T}↔${r.table} מתבצע דרך ${jf}${r.card ? ` (${r.card})` : ""}. ${r.desc || ""}`.trim(), wrongNote: "השדות האחרים אינם שדה הקישור בין שתי טבלאות אלו.", context: r.join, related: [r.table] });
      }
      if (r.join && /select|join|=/i.test(r.join)) {
        const others = pickN(names, 3, new Set([r.table, T]));
        const m = mc(r.table, others);
        if (m) push({ type: "join", level: 3, table: T, code: r.join, stem: `בהינתן ה-JOIN הבא מ-${T} — לאיזו טבלה הוא מתחבר?`, ...m,
          why: `ה-JOIN מקשר את ${T} אל ${r.table}${jf ? ` דרך ${jf}` : ""}.`, wrongNote: "ה-JOIN המוצג אינו תואם את מבנה המפתח של הטבלאות האחרות.", context: r.desc, related: [r.table] });
      }
    }
    // 6) data flow — parent/child sequence
    const children = t.relations.filter((r) => r.role === "parent").map((r) => r.table);
    const parents = t.relations.filter((r) => r.role === "child").map((r) => r.table);
    if (children.length) {
      const m = mc(children[0], pickN(names, 3, new Set([children[0], T])));
      if (m) push({ type: "flow", level: 2, table: T, stem: `בזרימת הנתונים, איזו טבלה תלויה ב-${T} (צאצא ישיר)?`, ...m,
        why: `${children[0]} היא צאצא של ${T} — היא מצביעה אליה דרך מפתח זר.`, wrongNote: "הטבלאות האחרות אינן צאצא ישיר של טבלה זו.", context: purpose(t), related: children.slice(0, 4) });
    }
    if (parents.length) {
      const m = mc(parents[0], pickN(names, 3, new Set([parents[0], T])));
      if (m) push({ type: "flow", level: 2, table: T, stem: `על איזו טבלת אב נשענת ${T} (קודמת לה בזרימה)?`, ...m,
        why: `${T} היא צאצא של ${parents[0]} — הרשומה ב-${parents[0]} חייבת להתקיים תחילה.`, wrongNote: "הטבלאות האחרות אינן טבלת האב הישירה.", context: purpose(t), related: parents.slice(0, 4) });
    }
    // 8) S/4HANA impact
    const s4 = S4_IMPACT[T];
    if (s4) {
      const others = uniq(Object.values(S4_IMPACT).map((x) => x.changed)).filter((c) => c !== s4.changed);
      const m = mc(s4.changed, pickN(others, 3));
      if (m) push({ type: "s4", level: 3, table: T, stem: `מה נכון לגבי ${T} במעבר ל-S/4HANA?`, ...m,
        why: `${s4.changed}${s4.why ? " — " + s4.why : ""}`, wrongNote: "ההיגדים האחרים מתארים שינויי S/4 של טבלאות אחרות.", context: s4.note, related: t.relations.map((r) => r.table).slice(0, 3) });
    }
  }

  // 7) troubleshooting + 10) CBC — from real incidents touching this module's tables
  const nameSet = new Set(names);
  for (const i of INCIDENTS) {
    const hit = i.tables.find((tn) => nameSet.has(tn));
    if (!hit) continue;
    const m = mc(hit, pickN(names, 3, new Set([hit])));
    if (m) push({ type: "trouble", level: 3, table: hit, stem: `${i.symptom} איזו טבלה לבדוק תחילה?`, ...m,
      why: `התקלה "${i.he}" נחקרת דרך ${i.tables.join(", ")}. הטבלה המרכזית: ${hit}.`, wrongNote: "הטבלאות האחרות אינן הנקודה הראשונה לבדיקה בתקלה זו.", context: i.rootCauses?.slice(0, 2).join(" · "), related: i.tables.filter((x) => x !== hit).slice(0, 4), tcodes: i.analyzeTcodes?.slice(0, 5) });
    if (i.cbc) {
      const m2 = mc(hit, pickN(names, 3, new Set([hit])));
      if (m2) push({ type: "cbc", level: 4, table: hit, stem: `תרחיש CBC: ${i.cbc} על איזו טבלה מתמקד הפתרון?`, ...m2,
        why: `במקרה זה (${i.he}) הטבלה ${hit} היא במוקד. ${i.fix?.[0] || ""}`.trim(), wrongNote: "הטבלאות האחרות אינן מוקד התרחיש הזה.", context: i.rootCauses?.slice(0, 2).join(" · "), related: i.tables.filter((x) => x !== hit).slice(0, 4), tcodes: i.analyzeTcodes?.slice(0, 5) });
    }
  }

  // 9) consultant-thinking — scenario → which table to investigate first (derived from relations)
  const scen: { need: string; pick: string }[] = [
    { need: "שיוך רשימת פעולות (Routing) לחומר", pick: "MAPL" },
    { need: "שיוך עץ מוצר (BOM) לחומר", pick: "MAST" },
    { need: "נתוני חומר ברמת מפעל ספציפי", pick: "MARC" },
    { need: "הערכת שווי ועלות תקן לחומר", pick: "MBEW" },
    { need: "כותרת ונתוני ליבה של פקודת ייצור", pick: "AFKO" },
    { need: "פעולות הביצוע של פקודה", pick: "AFVC" },
    { need: "גרסת ייצור תקפה לחומר", pick: "MKAL" },
    { need: "מרכז עבודה / משאב וקיבולת", pick: "CRHD" },
    { need: "כותרת פקודת אחזקה ב-PM", pick: "AFIH" },
    { need: "סטטוס מערכת/משתמש של אובייקט", pick: "JEST" },
    { need: "שריון חלפים/רכיבים לפקודה", pick: "RESB" },
    { need: "אישור ביצוע (זמן/כמות) בפקודה", pick: "AFRU" },
  ];
  for (const s of scen) {
    if (!nameSet.has(s.pick)) continue;
    const m = mc(s.pick, pickN(names, 3, new Set([s.pick])));
    const tt = tables.find((x) => x.tableName === s.pick)!;
    if (m) push({ type: "thinking", level: 4, table: s.pick, stem: `העסק מבקש: ${s.need}. באיזו טבלה תחקור תחילה?`, ...m,
      why: `${s.pick} — ${purpose(tt)}.`, wrongNote: "הטבלאות האחרות אינן נקודת המוצא הנכונה לדרישה זו.", context: tt.guideHe, related: tt.relations.map((r) => r.table).slice(0, 4), tcodes: txOf(tt) });
  }

  return out;
}

/** sample a random exam: n questions, only types allowed at the chosen level, spread across types */
export function pickExam(module: CertModule, level: Level, n = 20): Question[] {
  const allowed = new Set(LEVEL_TYPES[level]);
  const bank = buildBank(module).filter((q) => allowed.has(q.type));
  // spread: round-robin across types so no exam is one-note, then top up
  const byType: Record<string, Question[]> = {};
  for (const q of shuffle(bank)) (byType[q.type] ||= []).push(q);
  const types = shuffle(Object.keys(byType));
  const picked: Question[] = []; const seenTables = new Set<string>();
  let added = true;
  while (picked.length < n && added) {
    added = false;
    for (const ty of types) {
      const pool = byType[ty]; if (!pool?.length) continue;
      // prefer a fresh anchor table for variety
      let idx = pool.findIndex((q) => !seenTables.has(q.table));
      if (idx < 0) idx = 0;
      const [q] = pool.splice(idx, 1);
      picked.push(q); seenTables.add(q.table); added = true;
      if (picked.length >= n) break;
    }
  }
  return shuffle(picked).slice(0, n);
}

export const bankSize = (m: CertModule) => buildBank(m).length;
