/* ============================================================================
   PROJECT NEO · /neo/certification — BUILD-TIME data.
   ----------------------------------------------------------------------------
   Runs on the SERVER. It counts what the project's assessment engine actually
   produces and hands the client one plain object.

   WHAT THIS PROJECT HAS, AND WHAT IT DOES NOT
     HAS   lib/cert/generate.ts — a question generator that builds a bank from
           the VERIFIED dataset: table purposes, primary keys, foreign keys and
           ER joins, parent/child data flow, the S/4HANA impact map, and the
           incident catalogue. Every correct answer and every explanation is
           grounded in a record the project already holds; distractors are real
           sibling tables and fields from the same module.
     HAS   lib/cert/store.ts — a local record of the reader's own attempts:
           attempts, best score, rolling mastery, the daily streak. It is the
           reader's, it lives on the device, and it is never synthesised.
     DOES NOT HAVE — and therefore does not show — an official SAP certification
           syllabus. There is no C_TS4xx exam code in this project, no official
           topic weighting, no official question count, no official pass mark
           and no exam booking. The surface says that plainly instead of
           inventing a curriculum that would look convincing and be false.

   THE PASS MARK shown is the project's OWN rule, read off lib/cert/store.ts
   (`passed: score >= 80`). It is labelled as the project's rule on screen and
   is never presented as SAP's.

   DETERMINISM. buildBank() shuffles the ORDER of a question's choices, not the
   set of questions, so every count here is stable. Only counts are rendered —
   no question text is server-rendered, so there is nothing to mismatch on
   hydration.
   ========================================================================== */

import { QTYPE_HE, LEVEL_HE, buildBank, type CertModule, type Level, type QType } from "@/lib/cert/generate";

export interface BankType { id: QType; he: string; n: number }
export interface BankLevel { level: Level; he: string; /** cumulative — a level includes every easier type */ n: number }

export interface CertBank {
  id: CertModule;
  he: string;
  /** What the bank is built out of, in one line the reader can check. */
  from: string;
  total: number;
  /** Distinct dictionary tables the questions are anchored to. */
  tables: number;
  types: BankType[];
  levels: BankLevel[];
}

export interface CertData {
  banks: CertBank[];
  totals: { questions: number; banks: number; types: number; levels: number; tables: number };
  /** The project's own pass rule, not SAP's. */
  passPct: number;
  /** Where a reader can actually sit the assessment today. */
  examHref: string;
}

const MODULES: { id: CertModule; he: string; from: string }[] = [
  { id: "PM", he: "תחזוקת מפעל", from: "כל טבלאות ה-PM בקטלוג הטבלאות של הפרויקט" },
  { id: "PP-PI", he: "תעשיות תהליכיות", from: "כל טבלאות ה-PP-PI בקטלוג הטבלאות של הפרויקט" },
  { id: "PP", he: "תכנון ייצור", from: "תת-קבוצה של טבלאות הליבה של PP מתוך טבלאות ה-PP-PI" },
];

const LEVELS: Level[] = [1, 2, 3, 4];

let cached: CertData | null = null;

export function certData(): CertData {
  if (cached) return cached;

  const allTables = new Set<string>();
  const allTypes = new Set<QType>();

  const banks: CertBank[] = MODULES.map(({ id, he, from }) => {
    const bank = buildBank(id);
    const byType = new Map<QType, number>();
    const tables = new Set<string>();
    for (const q of bank) {
      byType.set(q.type, (byType.get(q.type) ?? 0) + 1);
      tables.add(q.table);
      allTables.add(q.table);
      allTypes.add(q.type);
    }
    return {
      id,
      he,
      from,
      total: bank.length,
      tables: tables.size,
      types: [...byType.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([t, n]) => ({ id: t, he: QTYPE_HE[t], n })),
      // A level is cumulative in the exam picker: it unlocks its own question
      // types and every easier one. The count here is derived the same way, so
      // it matches what an exam at that level can actually draw from.
      levels: LEVELS.map((l) => ({
        level: l,
        he: LEVEL_HE[l],
        n: bank.filter((q) => q.level <= l).length,
      })),
    };
  });

  cached = {
    banks,
    totals: {
      questions: banks.reduce((a, b) => a + b.total, 0),
      banks: banks.length,
      types: allTypes.size,
      levels: LEVELS.length,
      tables: allTables.size,
    },
    passPct: 80,
    /* The runner now lives INSIDE NEO. This used to hand the reader to the
     legacy assessment centre, which was the only reason to leave the shell. */
    examHref: "/neo/certification/exam/",
  };
  return cached;
}
