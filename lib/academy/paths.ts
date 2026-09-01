/**
 * SAP Academy — canonical PATH data (pure, React-free).
 * Single source for the intended chapter/lesson ORDER per module. Both the
 * learning-path UI and lib/academy/model.ts + scripts import from here so the
 * ordering has ONE definition. Extracted verbatim from learning-path.tsx (PR-1
 * Truth Layer) — zero content/behaviour change.
 */

export const PILOT_SLUG = "pm-maintenance-order";
export interface PathChapter { title: string; lessons: { title: string; slug?: string; minutes?: number; level?: string }[] }
export interface LearningPath { module: string; title: string; titleEn?: string; color: string; chapters: PathChapter[]; currentChapter: number }
// PM flagship path (real chapter structure; the pilot lesson lives in "ביצוע אחזקה").
export const PM_PATH: LearningPath = {
  module: "PM", title: "תחזוקת מפעל", titleEn: "Plant Maintenance", color: "#f97316", currentChapter: 3,
  chapters: [
    { title: "יסודות PM", lessons: [{ title: "מבנה ארגון האחזקה", slug: "pm-org-structure", minutes: 10, level: "בסיסי" }, { title: "מחזור חיי אחזקה", slug: "pm-maintenance-lifecycle", minutes: 10, level: "בסיסי" }] },
    { title: "נתוני אב", lessons: [{ title: "אב חומר וחלקי חילוף", slug: "pm-material", minutes: 12, level: "בסיסי" }, { title: "עץ מוצר אחזקה (BOM)", slug: "pm-bom", minutes: 12, level: "בסיסי" }, { title: "רשימות פעולות (Task Lists)", slug: "pm-task-list", minutes: 12, level: "בינוני" }, { title: "מרכזי עבודה", slug: "pm-work-center", minutes: 10, level: "בינוני" }, { title: "שותף עסקי (Business Partner)", slug: "pm-business-partner", minutes: 10, level: "בינוני" }] },
    { title: "אובייקטים טכניים", lessons: [{ title: "ציוד (Equipment)", slug: "pm-equipment", minutes: 12, level: "בסיסי" }, { title: "מיקומים פונקציונליים", slug: "pm-functional-location", minutes: 12, level: "בסיסי" }] },
    { title: "הודעות אחזקה", lessons: [{ title: "פתיחת הודעה", slug: "pm-notification-create", minutes: 10, level: "בסיסי" }, { title: "עיבוד הודעה לפקודה", slug: "pm-notification-to-order", minutes: 10, level: "בינוני" }] },
    { title: "ביצוע אחזקה", lessons: [{ title: "פקודת אחזקה — Maintenance Order", slug: PILOT_SLUG, minutes: 14, level: "בינוני" }, { title: "אישור עבודות", slug: "pm-confirmation", minutes: 12, level: "בינוני" }, { title: "סגירת פקודה (TECO)", slug: "pm-teco", minutes: 10, level: "בינוני" }, { title: "היתרים (Permits)", slug: "pm-permits", minutes: 8, level: "בינוני" }, { title: "התחשבנות פקודה (Settlement)", slug: "pm-settlement", minutes: 12, level: "מורכב" }] },
    { title: "אחזקה מונעת", lessons: [{ title: "תכניות אחזקה", slug: "pm-maintenance-plan", minutes: 14, level: "בינוני" }, { title: "תזמון ומונים", slug: "pm-scheduling-counters", minutes: 12, level: "בינוני" }, { title: "אחזקת שבר (Breakdown)", slug: "pm-breakdown", minutes: 10, level: "בינוני" }, { title: "כיול (Calibration · PM-QM)", slug: "pm-calibration", minutes: 12, level: "מורכב" }] },
    { title: "ניתוח ו-KPI", lessons: [{ title: "מדדי אחזקה", slug: "pm-kpi", minutes: 12, level: "מורכב" }, { title: "דוחות Fiori", slug: "pm-fiori-reports", minutes: 10, level: "בינוני" }] },
  ],
};

// PP-PI track — one lesson per source concept (23, no collapse). Full knowledge preserved.
export const PP_PATH: LearningPath = {
  module: "PP-PI", title: "תכנון ייצור", titleEn: "Production Planning (Process)", color: "#6d28d9", currentChapter: 0,
  chapters: [
    { title: "יסודות PP-PI", lessons: [{ title: "מבוא לתעשייה התהליכית", slug: "pp-intro", minutes: 10, level: "בסיסי" }, { title: "מבנה ארגון ייצור", slug: "pp-org-structure", minutes: 10, level: "בסיסי" }] },
    { title: "נתוני אב", lessons: [{ title: "אב חומר בייצור", slug: "pp-material", minutes: 12, level: "בסיסי" }, { title: "עץ מוצר (BOM)", slug: "pp-bom", minutes: 12, level: "בסיסי" }, { title: "מסלול ייצור (Routing)", slug: "pp-routing", minutes: 12, level: "בינוני" }, { title: "מתכון אב (Master Recipe)", slug: "pp-master-recipe", minutes: 12, level: "בינוני" }, { title: "מרכז עבודה", slug: "pp-work-center", minutes: 10, level: "בינוני" }, { title: "משאב (Resource)", slug: "pp-resource", minutes: 10, level: "בינוני" }, { title: "גרסת ייצור", slug: "pp-prod-version", minutes: 10, level: "בינוני" }] },
    { title: "תכנון", lessons: [{ title: "תכנון ביקוש (PIR)", slug: "pp-pir", minutes: 10, level: "בינוני" }, { title: "תכנון ראשי (MPS)", slug: "pp-mps", minutes: 10, level: "בינוני" }, { title: "MRP / MRP Live", slug: "pp-mrp", minutes: 14, level: "בינוני" }, { title: "אסטרטגיות תכנון", slug: "pp-strategies", minutes: 12, level: "מורכב" }, { title: "תכנון קיבולת", slug: "pp-capacity", minutes: 12, level: "מורכב" }] },
    { title: "ביצוע ייצור", lessons: [{ title: "פקודת תהליך", slug: "pp-process-order", minutes: 14, level: "בינוני" }, { title: "מרשם בקרה / PI Sheet", slug: "pp-control-recipe", minutes: 12, level: "מורכב" }, { title: "אישור פקודה", slug: "pp-confirmation", minutes: 12, level: "בינוני" }, { title: "Backflush וצריכת רכיבים", slug: "pp-backflush", minutes: 10, level: "בינוני" }, { title: "ניפוק וקבלת תוצר (GI/GR)", slug: "pp-gi-gr", minutes: 10, level: "בינוני" }] },
    { title: "ניהול אצוות", lessons: [{ title: "ניהול אצוות", slug: "pp-batch", minutes: 12, level: "בינוני" }] },
    { title: "התחשבנות וניתוח", lessons: [{ title: "סגירה טכנית (TECO)", slug: "pp-teco", minutes: 10, level: "בינוני" }, { title: "חישוב סטיות (Variance)", slug: "pp-variance", minutes: 12, level: "מורכב" }, { title: "התחשבנות פקודה", slug: "pp-settlement", minutes: 12, level: "מורכב" }] },
  ],
};

// QM track — one lesson per QM concept (16, no collapse). Full knowledge preserved.
export const QM_PATH: LearningPath = {
  module: "QM", title: "ניהול איכות", titleEn: "Quality Management", color: "#0891b2", currentChapter: 0,
  chapters: [
    { title: "יסודות QM", lessons: [{ title: "מבוא לניהול איכות", slug: "qm-intro", minutes: 10, level: "בסיסי" }, { title: "מבנה ארגון ואב-נתונים QM", slug: "qm-org-structure", minutes: 10, level: "בסיסי" }] },
    { title: "נתוני אב QM", lessons: [{ title: "תצוגת QM באב חומר", slug: "qm-material-view", minutes: 10, level: "בסיסי" }, { title: "מאפייני בדיקה (MIC)", slug: "qm-mic", minutes: 12, level: "בינוני" }, { title: "שיטות בדיקה", slug: "qm-methods", minutes: 8, level: "בינוני" }, { title: "קטלוגים וקודים", slug: "qm-catalogs", minutes: 10, level: "בינוני" }, { title: "תכניות דגימה", slug: "qm-sampling", minutes: 12, level: "מורכב" }, { title: "תכנית בדיקה", slug: "qm-inspection-plan", minutes: 12, level: "בינוני" }] },
    { title: "בדיקת איכות", lessons: [{ title: "לוט בדיקה (Inspection Lot)", slug: "qm-inspection-lot", minutes: 12, level: "בינוני" }, { title: "רישום תוצאות", slug: "qm-results-recording", minutes: 12, level: "בינוני" }, { title: "רישום פגמים", slug: "qm-defects", minutes: 8, level: "בינוני" }, { title: "החלטת שימוש (UD)", slug: "qm-usage-decision", minutes: 10, level: "בינוני" }] },
    { title: "הודעות איכות", lessons: [{ title: "הודעת איכות (Quality Notification)", slug: "qm-notification", minutes: 12, level: "בינוני" }] },
    { title: "QM בתהליכים", lessons: [{ title: "QM ברכש", slug: "qm-procurement", minutes: 12, level: "מורכב" }, { title: "QM בייצור (PP-PI)", slug: "qm-production", minutes: 12, level: "מורכב" }, { title: "תעודות איכות", slug: "qm-certificates", minutes: 10, level: "בינוני" }] },
  ],
};
