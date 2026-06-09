"use client";

// Per-chapter process-flow diagrams (CSS/glass, bilingual, RTL-aware). No
// external lib. Steps carry an SAP code where relevant.

import { ArrowLeft, GitBranch } from "lucide-react";
import { useI18n } from "@/lib/i18n";

type Step = { he: string; en: string; code?: string };

const FLOWS: Record<number, { he: string; en: string; steps: Step[] }> = {
  3: {
    he: "מחזור ייצור בדיד", en: "Discrete production cycle",
    steps: [
      { he: "נתוני אב", en: "Master data", code: "CS01/CA01/CR01" },
      { he: "הזמנה מתוכננת", en: "Planned order", code: "MD04" },
      { he: "פק\"ע", en: "Production order", code: "CO01" },
      { he: "שחרור", en: "Release", code: "CO02" },
      { he: "דיווח", en: "Confirm", code: "CO11N" },
      { he: "קבלת תוצר", en: "Goods receipt", code: "MB31" },
      { he: "סגירה", en: "Settle/TECO" },
    ],
  },
  4: {
    he: "מחזור ייצור תהליכי (PP-PI)", en: "Process order cycle",
    steps: [
      { he: "מתכון ראשי", en: "Master recipe", code: "C201" },
      { he: "פק\"ע תהליכי", en: "Process order", code: "COR1" },
      { he: "מתכון בקרה", en: "Control recipe", code: "CO53" },
      { he: "PI Sheet", en: "PI Sheet", code: "CO55" },
      { he: "הודעות תהליך", en: "Process messages", code: "CO54" },
      { he: "דיווח/סגירה", en: "Confirm", code: "CORK" },
    ],
  },
  5: {
    he: "ייצור חוזר (REM)", en: "Repetitive flow",
    steps: [
      { he: "פרופיל REM", en: "REM profile", code: "OSPT" },
      { he: "לוח-ריצה", en: "Run schedule", code: "MF50" },
      { he: "Backflush", en: "Backflush", code: "MFBF" },
      { he: "נקודות דיווח", en: "Reporting points" },
      { he: "קבלת תוצר", en: "Goods receipt" },
    ],
  },
  6: {
    he: "תכנון וביצוע — בדיד", en: "Discrete plan-to-produce",
    steps: [
      { he: "ביקוש", en: "Demand", code: "MD61" },
      { he: "MRP", en: "MRP", code: "MD01N" },
      { he: "פק\"ע", en: "Order", code: "CO01" },
      { he: "שחרור+זמינות", en: "Release", code: "CO02" },
      { he: "דיווח", en: "Confirm", code: "CO11N" },
      { he: "סגירה", en: "TECO/Settle" },
    ],
  },
  7: {
    he: "תכנון וביצוע — תהליכי", en: "Process plan-to-produce",
    steps: [
      { he: "ביקוש", en: "Demand" },
      { he: "פק\"ע תהליכי", en: "Process order", code: "COR1" },
      { he: "מתכון בקרה", en: "Control recipe", code: "CO53" },
      { he: "PI Sheet", en: "PI Sheet" },
      { he: "דיווח", en: "Confirm", code: "CORK" },
      { he: "אצווה/QM", en: "Batch/QM" },
    ],
  },
  9: {
    he: "מעגל Kanban (Pull)", en: "Kanban control cycle",
    steps: [
      { he: "צריכה", en: "Consumption" },
      { he: "מיכל ריק", en: "Empty bin" },
      { he: "חידוש", en: "Replenish", code: "PK13N" },
      { he: "מיכל מלא", en: "Full bin" },
      { he: "זמין", en: "Available" },
    ],
  },
  10: {
    he: "ניהול אצוות", en: "Batch lifecycle",
    steps: [
      { he: "יצירת אצווה", en: "Create batch", code: "MSC1N" },
      { he: "סיווג", en: "Classify", code: "CT04/CL02" },
      { he: "קביעת אצווה", en: "Determination", code: "COB1" },
      { he: "שימוש", en: "Usage" },
      { he: "עקיבות", en: "Where-used", code: "MB56" },
    ],
  },
  11: {
    he: "S&OP", en: "S&OP",
    steps: [
      { he: "תחזית", en: "Forecast" },
      { he: "תכנון גמיש", en: "Flexible planning", code: "MC81" },
      { he: "גרסאות", en: "Versions", code: "MC87" },
      { he: "העברה לביקושים", en: "Transfer", code: "MC74" },
    ],
  },
  12: {
    he: "ניהול ביקושים", en: "Demand management",
    steps: [
      { he: "תחזית", en: "Forecast" },
      { he: "PIR", en: "PIR", code: "MD61" },
      { he: "אסטרטגיה", en: "Strategy (MTS/MTO)" },
      { he: "קיזוז", en: "Consumption" },
      { he: "MRP", en: "MRP" },
    ],
  },
  13: {
    he: "תהליך MRP", en: "MRP run",
    steps: [
      { he: "ביקוש", en: "Demand" },
      { he: "MRP Live", en: "MRP Live", code: "MD01N" },
      { he: "הזמנות מתוכננות", en: "Planned orders" },
      { he: "רשימת מלאי", en: "Stock/req list", code: "MD04" },
      { he: "המרה", en: "Convert", code: "CO40/ME21N" },
    ],
  },
  14: {
    he: "DDMRP", en: "DDMRP",
    steps: [
      { he: "סיווג", en: "Classify" },
      { he: "מיקום באפר", en: "Buffer position" },
      { he: "גודל באפר", en: "Buffer size" },
      { he: "תכנון", en: "Planning" },
      { he: "ביצוע", en: "Execution" },
    ],
  },
  15: {
    he: "pMRP — סימולציה", en: "pMRP simulation",
    steps: [
      { he: "תרחיש", en: "Scenario" },
      { he: "בדיקת קיבולת", en: "Capacity check" },
      { he: "התאמה", en: "Adjust" },
      { he: "פרסום", en: "Release" },
    ],
  },
};

export function PPFlow({ n }: { n: number }) {
  const { lang } = useI18n();
  const flow = FLOWS[n];
  if (!flow) return null;
  return (
    <section dir="rtl" className="glass rounded-2xl p-5">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-brand">
        <GitBranch className="size-4" />
        {lang === "he" ? "תרשים זרימת תהליך" : "Process flow"} · {lang === "he" ? flow.he : flow.en}
      </h2>
      <div className="flex flex-wrap items-stretch gap-2">
        {flow.steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="glass flex min-w-[6.5rem] flex-col rounded-xl px-3 py-2 text-center">
              <span className="text-xs font-bold">{lang === "he" ? s.he : s.en}</span>
              {s.code && <span className="tech mt-0.5 text-[10px] text-brand">{s.code}</span>}
            </div>
            {i < flow.steps.length - 1 && <ArrowLeft className="size-4 shrink-0 text-brand ltr:rotate-180" aria-hidden />}
          </div>
        ))}
      </div>
    </section>
  );
}
