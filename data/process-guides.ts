// Deep Process Guides — end-to-end PM / PP-PI process walkthroughs with
// step-by-step SAP execution, common mistakes, troubleshooting flow, debugging
// path, exits/BAdIs, ECC↔S/4 and CBC examples. Hand-written from SAP knowledge.

import type { EccS4 } from "@/components/ecc-s4-block";

export interface GuideStep { action: string; tcode?: string; tables?: string[]; mistake?: string }
export interface ProcessGuide {
  slug: string;
  module: "PM" | "PP" | "PP-PI";
  title: string;
  he: string;
  summary: string;
  flow: string[];
  steps: GuideStep[];
  tables: string[];
  tcodes: string[];
  mistakes: string[];
  troubleshootFlow: string[];
  debugPath: string[];
  exits: string[];
  fiori: string[];
  cbc: string;
  eccS4: EccS4;
}

export const PROCESS_GUIDES: ProcessGuide[] = [
  {
    slug: "pm-corrective", module: "PM", title: "Corrective Maintenance (Breakdown→Settlement)", he: "אחזקת שבר — מקצה לקצה",
    summary: "התהליך המלא של אחזקה מתקנת: מהודעת תקלה דרך פקודה, ביצוע, אישור, סגירה טכנית והתחשבנות. כולל זמני השבתה ומדדי אמינות.",
    flow: ["תקלה", "הודעה", "פקודה", "תכנון+שחרור", "ביצוע+אישור", "TECO", "התחשבנות", "ניתוח"],
    steps: [
      { action: "פתח הודעת תקלה M2 עם אובייקט ייחוס + Malfunction Start + קוד פגם", tcode: "IW21", tables: ["QMEL", "QMIH", "QMFE"], mistake: "שכחת Malfunction Start → אין זמן השבתה" },
      { action: "המר הודעה לפקודת אחזקה (סוג PM01), הוסף פעולות ורכיבים", tcode: "IW31", tables: ["AUFK", "AFIH", "AFVC", "RESB"], mistake: "מרכז עבודה לא תקף → תזמון נכשל" },
      { action: "שחרר פקודה (REL) — מפעיל בדיקת זמינות והיתרים", tcode: "IW32", tables: ["AUFK", "JEST"], mistake: "היתר פתוח חוסם שחרור" },
      { action: "בצע עבודה ואשר שעות + צריכת חומרים (Malfunction End)", tcode: "IW41", tables: ["AFRU", "MSEG"], mistake: "תקופת רישום סגורה → אישור נכשל" },
      { action: "סגור טכנית (TECO) — סוגר רזרבציות פתוחות", tcode: "IW32", tables: ["AUFK", "JEST"], mistake: "אישורים פתוחים מונעים TECO" },
      { action: "התחשבן פקודה למרכז עלות (אחרי TECO)", tcode: "KO88", tables: ["COBRB", "COEP"], mistake: "כלל התחשבנות חסר" },
    ],
    tables: ["QMEL", "QMIH", "AUFK", "AFIH", "AFVC", "AFRU", "RESB", "COBRB"],
    tcodes: ["IW21", "IW31", "IW32", "IW41", "KO88", "MCI7"],
    mistakes: ["Malfunction Start/End חסרים → מדדי MTTR/MTBF שגויים", "שחרור ללא בדיקת זמינות רכיב", "אישור בתקופה סגורה", "התחשבנות ללא כלל"],
    troubleshootFlow: ["לא ניתן לשחרר? → בדוק היתרים (IW32 Permits) + בדיקת זמינות", "אישור נכשל? → בדוק סטטוס REL + תקופת רישום (OB52/MMRV)", "עלות תקועה? → בדוק כלל התחשבנות + תקופת CO"],
    debugPath: ["SU53 להרשאה", "ST22 ל-dump", "breakpoint ב-BAdI WORKORDER_UPDATE (שמירה)", "EXIT_SAPLCOIH_009 (IWO10009) לבדיקות שחרור"],
    exits: ["IWO10009", "CONFPM01", "WORKORDER_UPDATE", "QQMA0001"],
    fiori: ["Create Maintenance Request", "Manage Maintenance Orders", "Confirm Jobs"],
    cbc: "ב-CBC: ממלאת נעצרת → טכנאי פותח M2 (Malfunction Start), רכז ממיר ל-PM01 עם החלפת ראש מילוי (רכיב מלאי) + כיול (שירות→PR). אישור שעות + Malfunction End, TECO, התחשבנות למרכז עלות הקו. MCI7 מראה MTBF.",
    eccS4: { unchanged: "מחזור הודעה→פקודה→אישור→התחשבנות זהה.", changed: "UX ל-Fiori; עלויות ל-ACDOCA; מדדי אמינות ב-Embedded Analytics.", fiori: "Manage Maintenance Orders / Confirm Jobs", simplification: "Universal Journal (עלויות).", migration: "QA: מחזור מלא + התחשבנות ל-ACDOCA + מדדי MTTR/MTBF." } },
  {
    slug: "pm-preventive", module: "PM", title: "Preventive Maintenance (Plan→Call→Order)", he: "אחזקה מונעת — מקצה לקצה",
    summary: "תכנון וביצוע אחזקה מונעת: אסטרטגיה, תכנית, פריט+רשימת פעולות, תזמון, ניטור מועדים אוטומטי, ויצירת פקודות במועד.",
    flow: ["אסטרטגיה", "תכנית", "פריט+רשימה", "תזמון", "ניטור (IP30)", "פקודה אוטומטית", "ביצוע"],
    steps: [
      { action: "הגדר אסטרטגיית אחזקה + חבילות מחזור (אם מבוסס-אסטרטגיה)", tcode: "IP11", tables: ["T351", "T351P"], mistake: "חבילות חופפות/חסרות" },
      { action: "צור תכנית אחזקה + פריט (אובייקט + רשימת פעולות)", tcode: "IP01", tables: ["MPLA", "MPOS"], mistake: "רשימת פעולות לא תקפה לתאריך" },
      { action: "תזמן את התכנית (Start) — חישוב מועדי קריאה", tcode: "IP10", tables: ["MHIS", "MHIO"], mistake: "ללא נקודת התחלה → אין תזמון" },
      { action: "הרץ ניטור מועדים (Job יומי) — יוצר פקודות באופק הקריאה", tcode: "IP30", tables: ["MHIS", "AUFK"], mistake: "Job לא מתוזמן → פקודות לא נוצרות" },
      { action: "בצע ואשר את הפקודה שנוצרה", tcode: "IW41", tables: ["AFRU"], mistake: "אישור לא סוגר את הקריאה" },
    ],
    tables: ["MPLA", "MPOS", "MHIS", "MHIO", "PLKO", "PLPO", "AUFK"],
    tcodes: ["IP11", "IP01", "IP10", "IP30", "IW41"],
    mistakes: ["מחזורים/אסטרטגיה לא מוגדרים", "ללא נקודת התחלה לתזמון", "אופק קריאה קצר מדי → פקודות מאוחרות", "IP30 לא רץ כ-Job"],
    troubleshootFlow: ["אין פקודות? → ודא תזמון (IP10) + הרץ IP30 ידנית", "מועד שגוי? → בדוק היסטוריית תזמון (MHIS) ושער הערכה (מבוסס-ביצועים)", "כפילות? → בדוק MHIS לקריאות כפולות"],
    debugPath: ["IP10 → 'Scheduling overview' לחישוב", "EXIT של IPRM0001 לתזמון", "ST22 ל-dump ב-IP30"],
    exits: ["IPRM0001", "IWO10009"],
    fiori: ["Manage Maintenance Plans", "Schedule Maintenance Plans"],
    cbc: "ב-CBC: תכנית רבעונית ל'מערכת מים מטוהרים' + תכנית מבוססת-שעות למשאבות. IP30 הלילי יוצר פקודות מונעות לפני המועד; קריאות מונה (IK11) מתזמנות את התכניות מבוססות-הביצועים.",
    eccS4: { unchanged: "מודל תכנון/תזמון זהה.", changed: "לוח תזמון גרפי ב-Fiori; ניטור משופר.", fiori: "Schedule Maintenance Plans / Scheduling Board", migration: "QA: תזמון + IP30 → פקודות במועד." } },
  {
    slug: "pppi-mts-process-order", module: "PP-PI", title: "Make-to-Stock Process Order (MRP→GR→Settle)", he: "ייצור-למלאי תהליכי — מקצה לקצה",
    summary: "התהליך המלא של ייצור תהליכי למלאי: תחזית→MRP→המרה לפקודת תהליך→שחרור+מרשם בקרה→אישור+Backflush→GR לאצווה→התחשבנות.",
    flow: ["PIR/תחזית", "MRP", "הזמנה מתוכננת", "פקודת תהליך", "שחרור+מרשם בקרה", "אישור+Backflush", "GR לאצווה", "התחשבנות"],
    steps: [
      { action: "הזן תחזית (PIR) גרסה 00", tcode: "MD61", tables: ["PBIM", "PBED"], mistake: "גרסה לא פעילה → MRP מתעלם" },
      { action: "הרץ MRP Live — יוצר הזמנות מתוכננות + דרישות רכש", tcode: "MD01N", tables: ["MDKP", "PLAF"], mistake: "אין גרסת ייצור → לא ניתן להמיר לפקודה" },
      { action: "המר הזמנה מתוכננת לפקודת תהליך", tcode: "COR1", tables: ["AUFK", "AFKO", "AFPO"], mistake: "חומר חסום/הרשאה C_AFKO_ATY" },
      { action: "שחרר פקודה — בדיקת זמינות (aATP) + יצירת מרשם בקרה", tcode: "COR2", tables: ["AFKO", "JEST"], mistake: "מרשם בקרה לא נוצר — יעד לא מוגדר" },
      { action: "דווח אישור — Backflush רכיבים + GR תוצר לאצווה", tcode: "COR6N", tables: ["AFRU", "RESB", "MATDOC", "MCH1"], mistake: "Backflush נכשל → COGI" },
      { action: "התחשבן פקודה (WIP/סטיות)", tcode: "CO88", tables: ["COBRB", "CKMLPP"], mistake: "ללא עלות תקן → אין סטיות" },
    ],
    tables: ["PBIM", "MDKP", "PLAF", "AUFK", "AFKO", "AFPO", "AFRU", "RESB", "MATDOC", "MCH1", "COBRB"],
    tcodes: ["MD61", "MD01N", "COR1", "COR2", "COR6N", "COGI", "CO88"],
    mistakes: ["PIR בגרסה לא-פעילה", "אין גרסת ייצור תקפה (S/4 חובה)", "מרשם בקרה לא מוגדר ליעד", "Backflush ללא מלאי → COGI", "עלות תקן לא משוחררת"],
    troubleshootFlow: ["אין הזמנות מתוכננות? → MD04 + Planning File", "פקודה לא נוצרת? → גרסת ייצור (C223)", "Backflush תקוע? → COGI (חוסר מלאי/אצווה)", "סטיות חסרות? → עלות תקן (CK11N) + Target Cost Version"],
    debugPath: ["MD04 לאלמנטי תכנון", "COGI/AFFW לתנועות כושלות", "PPCO0001 (EXIT) לבדיקות פקודה", "CONFPP01 לבדיקות אישור"],
    exits: ["PPCO0001", "CONFPP01", "CONFPP05", "WORKORDER_CONFIRM"],
    fiori: ["Monitor Material Coverage", "Manage Process Orders", "Confirm Process Order"],
    cbc: "ב-CBC: תחזית 200K בקבוקים → MD61 → MRP Live מפצץ תרכיז/בקבוקים/מכסים. COR1 לפקודת תהליך 50K, שחרור שולח מרשם בקרה לקו, אישור עושה Backflush של תרכיז + GR לאצווה עם תפוגה, התחשבנות בסוף חודש.",
    eccS4: { unchanged: "מחזור הייצור התהליכי זהה.", changed: "MRP Live; aATP; OData/Fiori; עלויות ל-ACDOCA+ML.", fiori: "Manage Process Orders / Confirm Process Order", simplification: "MRP Live + Material Ledger + MATDOC.", migration: "QA: מחזור מלא MRP→פקודה→אישור→GR→התחשבנות." } },
  {
    slug: "pppi-batch-traceability", module: "PP-PI", title: "Batch Production & Traceability", he: "ייצור ומעקב אצוות — מקצה לקצה",
    summary: "ניהול אצווה לאורך הייצור: יצירת אצווה ב-GR עם מאפיינים ותוקף, קביעת אצווה אוטומטית בצריכה ובמכירה (FEFO), ומעקב מלא (Traceability) קדימה ואחורה.",
    flow: ["הגדרת ניהול אצוות", "GR יוצר אצווה", "סיווג+תוקף", "קביעת אצווה בצריכה", "מכירה (FEFO)", "מעקב Where-Used"],
    steps: [
      { action: "הפעל ניהול אצוות בחומר + מחלקת אצווה (023)", tcode: "MM02", tables: ["MARC", "MARA"], mistake: "מחלקת אצווה/מאפיינים לא הוקצו" },
      { action: "GR מפקודה יוצר אצווה אוטומטית עם תאריך ייצור/תפוגה", tcode: "COR6N", tables: ["MCH1", "MCHA", "MATDOC"], mistake: "פרופיל מספור אצווה חסר → אצווה לא נוצרת" },
      { action: "סווג את האצווה (מאפיינים: SLED, יצרן, איכות)", tcode: "MSC2N", tables: ["AUSP", "INOB"], mistake: "מאפיין חובה ריק → חסימה" },
      { action: "קביעת אצווה אוטומטית בצריכה/מכירה (FEFO)", tcode: "CL30N", tables: ["KSSK", "AUSP"], mistake: "אסטרטגיית קביעה/מיון שגויים" },
      { action: "מעקב Where-Used לאצווה (קדימה/אחורה)", tcode: "MB56", tables: ["CHVW", "MATDOC"], mistake: "Batch Where-Used לא פעיל (CHVW)" },
    ],
    tables: ["MCH1", "MCHA", "MCHB", "AUSP", "KSSK", "CHVW", "MATDOC"],
    tcodes: ["MM02", "COR6N", "MSC2N", "MSC3N", "CL30N", "MB56", "BMBC"],
    mistakes: ["ניהול אצוות לא מופעל בחומר", "פרופיל מספור אצווה חסר", "מאפיין חובה ריק", "Batch Where-Used (CHVW) לא מופעל"],
    troubleshootFlow: ["אצווה לא נוצרה? → ניהול אצוות + פרופיל מספור", "קביעה נכשלה? → אסטרטגיה+מיון (CU70) + מאפיינים", "מעקב חסר? → הפעל CHVW (Batch Where-Used)"],
    debugPath: ["BMBC (Batch Information Cockpit)", "SAPLV01Z (EXIT) לקביעת אצווה", "breakpoint ב-BAdI VB_BD_BATCH_DETERMINATION"],
    exits: ["SAPLV01Z", "BATCH_MASTER", "WORKORDER_GOODSMVT"],
    fiori: ["Manage Batches", "Batch Information Cockpit"],
    cbc: "ב-CBC: כל מנת משקה מקבלת אצווה עם תאריך ייצור+תפוגה. במכירה, קביעת FEFO בוחרת אצווה קרובה לתפוגה. אם אצווה נפסלת ב-QM → נחסמת אוטומטית ולא נבחרת. Recall? MB56 מאתר כל הלקוחות שקיבלו אצווה.",
    eccS4: { unchanged: "מודל אצווה + סיווג + קביעה זהה.", changed: "UX ל-Fiori; BIC משופר.", fiori: "Manage Batches / Batch Information Cockpit", cds: "I_Batch", migration: "QA: יצירה+סיווג+קביעה (FEFO)+Where-Used." } },
  {
    slug: "pp-mrp-to-order", module: "PP", title: "Discrete: MRP → Production Order", he: "ייצור בדיד — MRP עד פקודה",
    summary: "מ-MRP לייצור בדיד: ביקוש→MRP→הזמנה מתוכננת→פקודת ייצור→שחרור→אישור (CO11N)→GR→התחשבנות.",
    flow: ["ביקוש", "MRP", "הזמנה מתוכננת", "פקודת ייצור", "שחרור", "אישור (CO11N)", "GR", "התחשבנות"],
    steps: [
      { action: "הרץ MRP — הזמנות מתוכננות לפי BOM+מסלול", tcode: "MD01N", tables: ["MDKP", "PLAF"], mistake: "אין גרסת ייצור" },
      { action: "המר לפקודת ייצור", tcode: "CO01", tables: ["AUFK", "AFKO", "AFPO"], mistake: "הרשאת C_AFKO_AWK" },
      { action: "שחרר + בדיקת זמינות רכיבים", tcode: "CO02", tables: ["AFKO", "RESB"], mistake: "חוסר רכיב חוסם שחרור" },
      { action: "אשר פעולה (Time Ticket) + Backflush", tcode: "CO11N", tables: ["AFRU", "MATDOC"], mistake: "תנועות → COGI" },
      { action: "התחשבן", tcode: "KO88", tables: ["COBRB"], mistake: "כלל חסר" },
    ],
    tables: ["MDKP", "PLAF", "AUFK", "AFKO", "AFPO", "AFRU", "RESB", "MATDOC"],
    tcodes: ["MD01N", "CO01", "CO02", "CO11N", "CO15", "KO88"],
    mistakes: ["אין גרסת ייצור", "חוסר רכיב בשחרור", "אישור בתקופה סגורה", "GR אוטומטי לא הוגדר (Control Key)"],
    troubleshootFlow: ["פקודה לא נוצרת? → גרסת ייצור/BOM", "שחרור נכשל? → בדיקת זמינות (CO24)", "Backflush תקוע? → COGI"],
    debugPath: ["MD04", "COGI", "PPCO0001 (EXIT)", "CONFPP01"],
    exits: ["PPCO0001", "CONFPP01", "WORKORDER_UPDATE"],
    fiori: ["Monitor Material Coverage", "Manage Production Orders", "Confirm Production Operation"],
    cbc: "ב-CBC (אריזה משנית): MRP מתכנן מארזי קרטון → פקודת ייצור בדיד להרכבת מארז 24 → אישור CO11N עם Backflush של בקבוקים+קרטון → GR מארזים מוגמרים.",
    eccS4: { unchanged: "מחזור ייצור בדיד זהה.", changed: "MRP Live; UX Fiori; עלויות ל-ACDOCA.", fiori: "Manage Production Orders", simplification: "MRP Live + MATDOC.", migration: "QA: מחזור MRP→פקודה→אישור→GR→התחשבנות." } },
  {
    slug: "pm-calibration-process", module: "PM", title: "Calibration (PM-QM integrated)", he: "כיול משולב PM-QM — מקצה לקצה",
    summary: "תהליך כיול מלא: תכנית אחזקה לכיול→פקודה עם מפתח בקרה Inspection→מנת בדיקה→רישום תוצאות→החלטת שימוש→עדכון סטטוס מכשיר.",
    flow: ["תכנית כיול", "פקודה (PM03)", "מנת בדיקה", "רישום תוצאות", "החלטת שימוש", "סטטוס מכשיר"],
    steps: [
      { action: "צור תכנית אחזקה לכיול + רשימת פעולות עם מאפייני בדיקה QM", tcode: "IP01", tables: ["MPLA", "PLMK"], mistake: "אין מאפייני בדיקה (PLMK)" },
      { action: "פקודה נוצרת עם מפתח בקרה PM03 → מנת בדיקה", tcode: "IP30", tables: ["AUFK", "QALS"], mistake: "מפתח בקרה ללא סימון Inspection" },
      { action: "רשום תוצאות מדידה מול תקן", tcode: "QE11", tables: ["QAMR", "QASR"], mistake: "תוצאות חלקיות → UD תקוע" },
      { action: "קבל החלטת שימוש (תקין/לא תקין)", tcode: "QA11", tables: ["QAVE"], mistake: "UD לא ננעל" },
      { action: "סטטוס מכשיר מתעדכן; לא תקין → חסימה", tcode: "IE02", tables: ["EQUI", "JEST"], mistake: "מכשיר לא תקין נשאר בשימוש" },
    ],
    tables: ["MPLA", "PLMK", "AUFK", "QALS", "QAMR", "QAVE", "EQUI"],
    tcodes: ["IP01", "IP30", "QE11", "QA11", "IE02", "QGA2"],
    mistakes: ["מפתח בקרה ללא Inspection", "מאפייני בדיקה חסרים", "תוצאות לא מלאות", "מכשיר לא תקין לא נחסם"],
    troubleshootFlow: ["מנת בדיקה לא נוצרה? → מפתח בקרה Inspection ברשימה", "אין מאפיינים? → PLMK בפעולה", "UD תקוע? → השלם תוצאות (QE11)"],
    debugPath: ["QGA2 (Calibration overview)", "QEEM0001 (EXIT רישום תוצאות)", "ST22 ל-dump"],
    exits: ["QEEM0001", "CONFPM01"],
    fiori: ["Record Inspection Results", "Manage Inspection Lots"],
    cbc: "ב-CBC: כיול חיישני טמפ' בפסטור — תכנית רבעונית יוצרת פקודת PM03 → מנת בדיקה. חריגה מהתקן → UD 'לא תקין' → חסימת החיישן עד תיקון; היסטוריית כיול נשמרת לציוד.",
    eccS4: { unchanged: "אינטגרציית PM-QM זהה.", changed: "UX ל-Fiori לרישום תוצאות.", fiori: "Record Inspection Results", migration: "QA: פקודה→מנת בדיקה→UD→סטטוס מכשיר." } },
];

export const guideBySlug = (s: string) => PROCESS_GUIDES.find((g) => g.slug === s);
