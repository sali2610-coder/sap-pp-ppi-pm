// BW / BI / Analytics curated knowledge (Layer A) — role/why/whenUsed/
// importance/s4 per object. DERIVED facts (tcodes/CDS) come from
// data/bw-module.ts at the call site. CURATED text = standard SAP BW /
// BW/4HANA / Embedded Analytics knowledge. trust: curated. Keyed by name.

import type { ObjectKnowledge } from "@/lib/knowledge";

const K = (role: string, why: string, whenUsed: string, importance: ObjectKnowledge["importance"], s4?: string): ObjectKnowledge =>
  ({ role, why, whenUsed, importance, s4, trust: "curated" });

export const BW_KNOWLEDGE: Record<string, ObjectKnowledge> = {
  /* ── Extraction / DataSource (ODP) ── */
  ROOSOURCE: K(
    "מטא-דאטה של DataSource (Extractor)",
    "מגדירה DataSources לחילוץ (extractor) מהמערכת המקור — שדות, delta ו-ODP context; בסיס ה-ETL.",
    "בהקמת/תחזוקת חילוץ נתונים (RSO2/RSA5/RSA6); מזינה את שכבת ה-staging.",
    "supporting",
    "ב-BW/4HANA וב-S/4 Embedded החילוץ עובר ל-ODP / CDS-based extraction.",
  ),
  ROOSFIELD: K(
    "שדות DataSource",
    "מגדירה את השדות של כל DataSource — selection, hide, delta-relevant.",
    "בתחזוקת DataSource; קובעת אילו שדות זמינים לטעינה ולמיפוי.",
    "advanced",
    "ב-ODP/CDS extraction השדות נגזרים מ-CDS view annotations.",
  ),
  RSDS: K(
    "DataSource (BW side)",
    "אובייקט ה-DataSource בצד BW — מבנה replication, segments ו-PSA.",
    "בעת replicate/activate DataSource ב-BW; מגדיר את כניסת הנתונים.",
    "supporting",
    "ב-BW/4HANA נשמר; מקור מודרני = ODP-CDS / SLT.",
  ),
  /* ── InfoObjects ── */
  RSDIOBJ: K(
    "InfoObject — הגדרה",
    "ה-InfoObject (characteristic/key figure) — אבן הבניין הסמנטית של מודל BW (מאסטר דאטה, מימדים, מדדים).",
    "בעיצוב המודל; כל InfoProvider מורכב מ-InfoObjects.",
    "supporting",
    "ב-BW/4HANA נשמר; ב-S/4 Embedded/Datasphere הסמנטיקה עוברת ל-CDS.",
  ),
  RSDIOBJT: K(
    "InfoObject — טקסטים",
    "תיאורי טקסט (descriptions) ל-InfoObjects לפי שפה.",
    "בתחזוקת מאסטר-דאטה; מספק תוויות לדוחות וכלי BI.",
    "advanced",
    "מקביל ל-text annotations ב-CDS בעולם המודרני.",
  ),
  /* ── InfoProviders ── */
  RSDCUBE: K(
    "InfoCube — הגדרה (קלאסי)",
    "InfoCube — מבנה רב-ממדי (star schema) לאחסון נתונים מצרפיים לדיווח.",
    "במודל BW קלאסי לאחסון עובדות; נטען מ-DTP ונצרך ב-BEx.",
    "supporting",
    "מיושן ב-BW/4HANA — מוחלף ב-ADSO (advanced DSO).",
  ),
  RSDODSO: K(
    "DSO — הגדרה (קלאסי)",
    "DataStore Object — אחסון ברמת רשומה עם delta/overwrite; שכבת ה-staging/EDW הקלאסית.",
    "בשכבת harmonization/EDW; מאחד נתונים לפני אגרגציה.",
    "supporting",
    "מוחלף ב-ADSO ב-BW/4HANA (סוג DataStore אחיד).",
  ),
  ADSO: K(
    "Advanced DSO (ADSO)",
    "אובייקט האחסון האחיד של BW/4HANA — מחליף InfoCube + DSO + PSA במבנה גמיש אחד.",
    "במודל BW/4HANA כשכבת אחסון מרכזית (inbound/standard/cube-like).",
    "core",
    "זהו הסטנדרט ב-BW/4HANA; CompositeProvider משלב ADSOs לצריכה.",
  ),
  /* ── Transformation / Load ── */
  RSTRAN: K(
    "Transformation",
    "כללי המיפוי/טרנספורמציה בין מקור ליעד (field mapping, routines, rules) — לב ה-ETL ב-BW.",
    "בין שכבות הטעינה; מומש ע\"י DTP בזמן ריצה.",
    "supporting",
    "נשמר ב-BW/4HANA; ב-Datasphere הטרנספורמציה מבוססת graphical/SQL views.",
  ),
  RSBKDTP: K(
    "DTP — Data Transfer Process",
    "מנגנון העברת הנתונים בפועל בין אובייקטים (full/delta), כולל error handling.",
    "בכל טעינה; מריץ את ה-Transformation ומנהל delta.",
    "supporting",
    "נשמר ב-BW/4HANA; חלק מ-Process Chains.",
  ),
  /* ── Process Chains ── */
  RSPCCHAIN: K(
    "Process Chain — הגדרה",
    "תזמור תהליכי טעינה/ניהול כשרשרת (load, activate, index, cleanup) עם תלויות.",
    "באוטומציית טעינות לילה/EDW; מנוטר ב-RSPC.",
    "supporting",
    "נשמר ב-BW/4HANA; ב-Datasphere/SAC נעשה דרך Task Chains / scheduling.",
  ),
  RSPCLOGCHAIN: K(
    "Process Chain — לוג ריצה",
    "לוג ההרצות של Process Chains — סטטוס, זמנים וכשלים לכל run.",
    "בניטור וטיפול בכשלי טעינה (RSPC monitor).",
    "advanced",
    "מקביל לניטור Task Chain ב-Datasphere.",
  ),
  /* ── BEx / Query / Reporting ── */
  RSRREPDIR: K(
    "ספריית דוחות/Queries (BEx)",
    "מדריך ה-Queries וה-reports — מטא-דאטה של אובייקטי הדיווח.",
    "בתחזוקת דוחות BEx; מקשר Query לרכיביו.",
    "advanced",
    "ב-BW/4HANA Queries נבנים ב-BW Modeling Tools; צריכה ב-SAC/AfO.",
  ),
  RSZCOMPDIR: K(
    "מדריך רכיבי Query (Components)",
    "רכיבי ה-Query השמורים (queries, query views, calculated/restricted key figures).",
    "בעיצוב וניהול Queries; מקור לרכיבים לשימוש חוזר.",
    "advanced",
    "נשמר ב-BW/4HANA; מודרניזציה דרך CDS analytical queries.",
  ),
  RSZELTDIR: K(
    "מדריך אלמנטים של Query",
    "אלמנטי ה-Query (elements) — selections, structures, formulas.",
    "במידול Query מפורט; מתאר את אבני הבניין של הדוח.",
    "advanced",
    "מקביל ל-elements ב-CDS analytical query annotations.",
  ),
  RSZELTXREF: K(
    "הפניות צולבות בין אלמנטי Query",
    "Cross-reference בין אלמנטי Query — תלויות לשימוש חוזר ולניתוח השפעה.",
    "בניתוח where-used של אלמנטים בדוחות.",
    "advanced",
    "מודרני: ניתוח תלות ב-BW Modeling Tools / CDS dependency analysis.",
  ),
  RSECVAL: K(
    "ערכי Analysis Authorizations",
    "ערכי הרשאות הניתוח (analysis authorizations) — מגביל גישה לנתונים לפי characteristic value.",
    "באבטחת BW; קובע אילו נתונים משתמש רשאי לראות בדוח.",
    "supporting",
    "ב-BW/4HANA נשמר (RSECADMIN); ב-S/4 Embedded/SAC ההגבלה דרך CDS/DCL ו-roles.",
  ),
  /* ── ODP / modern providers / analytics objects ── */
  ODP_Queue: K(
    "ODP — תור הפקה (Operational Delta Queue)",
    "תשתית ה-ODP מנהלת delta queues להפקה יעילה מהמקור (extractors/CDS/SLT) לצרכנים (BW, Datasphere).",
    "בכל תרחיש delta מודרני; מחליף את ה-delta queue הקלאסי (RSA7).",
    "supporting",
    "הסטנדרט המודרני; CDS-based extraction ו-SLT עוברים דרך ODP.",
  ),
  CDS_AnalyticalView: K(
    "CDS Analytical View (VDM)",
    "CDS view עם analytics annotations (@Analytics.dataCategory: CUBE/DIMENSION) — מודל אנליטי על נתוני S/4 בזמן אמת.",
    "ב-S/4 Embedded Analytics; נצרך ע\"י Fiori analytical apps, SAC ו-Query.",
    "core",
    "מחליף InfoCube/Query קלאסי ל-real-time analytics על S/4 ללא העתקה ל-BW.",
  ),
  SID_Table: K(
    "טבלת SID (Surrogate ID)",
    "ממפה ערכי characteristic ל-SID מספרי — מאיץ joins ואחסון במודל BW.",
    "פנימי למודל BW; נוצר אוטומטית לכל characteristic.",
    "advanced",
    "ב-BW/4HANA נשמר; ב-HANA-native/CDS אין צורך ב-SID.",
  ),
  CompositeProvider: K(
    "CompositeProvider (HCPR)",
    "אובייקט צריכה ב-BW/4HANA שמשלב (union/join) ADSOs, Open ODS Views ו-InfoObjects לדיווח.",
    "כשכבת הצריכה מעל ADSOs; הבסיס ל-Queries ב-BW/4HANA.",
    "supporting",
    "מחליף MultiProvider/InfoSet הקלאסיים.",
  ),
  OpenODSView: K(
    "Open ODS View",
    "וירטואליזציה של מקור (טבלה/DataSource/CDS) ב-BW/4HANA ללא persistence — data virtualization.",
    "כשרוצים לדווח על מקור ישירות בלי לטעון; field-based modeling.",
    "advanced",
    "מודרני; מקדם גישת virtual/LSA++ ב-BW/4HANA.",
  ),
  BEx_Query: K(
    "BEx Query",
    "אובייקט ה-Query הקלאסי — selections, restricted/calculated key figures, variables; הגדרת הדוח.",
    "בעיצוב דיווח BW; נצרך ב-Analysis for Office, BEx וכלי BI.",
    "supporting",
    "ב-BW/4HANA נבנה ב-BW Modeling Tools; מודרניזציה דרך CDS analytical queries.",
  ),
  SAC_Story: K(
    "SAP Analytics Cloud — Story",
    "סיפור/דשבורד אנליטי ב-SAC המחבר ל-live/imported models (BW, S/4, Datasphere).",
    "בשכבת הוויזואליזציה/תכנון העסקי; קצה הצריכה המודרני.",
    "advanced",
    "החזית האנליטית המודרנית; מחליף BEx Web / Design Studio.",
  ),
  AnalysisForOffice: K(
    "Analysis for Office (AfO)",
    "תוסף Excel לניתוח אינטראקטיבי מול BW/BW4/HANA queries — pivot ו-drill.",
    "באנליזת ad-hoc וב-reporting משרדי על Queries.",
    "advanced",
    "נתמך גם מול BW/4HANA ו-S/4; משלים את SAC.",
  ),
};
