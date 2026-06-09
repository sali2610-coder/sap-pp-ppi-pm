// ===== PP Knowledge Module (Phase P1) =====
// Transformative Hebrew knowledge derived from "Production Planning with SAP
// S/4HANA". COPYRIGHT-SAFE: no verbatim prose / no chapter reproduction — only
// summaries, glossaries, runbooks, patterns, config & troubleshooting notes.
// SAP technical identifiers (T-Codes/tables/programs/CDS/Fiori/BAPIs/IDocs) are
// preserved verbatim in English. T-Codes are grounded from the source via
// scripts/extract-pp-objects.mjs; other objects authored from PP domain knowledge.

import OBJ from "./pp-objects.json";

export interface SapObjects {
  tcodes: string[];
  tables: string[];
  programs: string[];
  cds: string[];
  fiori: string[];
  bapis: string[];
  idocs: string[];
}
export interface CrossLink {
  module: "PP" | "PP-PI" | "PM";
  labelHe: string;
  href: string;
}
export interface PPChapter {
  n: number;
  en: string;
  he: string;
  pages: [number, number];
  summaryHe: string;
  objects: SapObjects;
  configHe?: string[];
  runbookHe?: string[];
  lessonsHe?: string[];
  patternsHe?: string[];
  troubleshootHe?: string[];
  cbcHe?: string;
  related?: CrossLink[];
}

const O = OBJ as Record<string, Partial<SapObjects>>;
// merge book-grounded tcodes with authored objects
function obj(n: number, extra: Partial<SapObjects>): SapObjects {
  const g = O[String(n)] ?? {};
  return {
    tcodes: [...new Set([...(g.tcodes ?? []), ...(extra.tcodes ?? [])])],
    tables: extra.tables ?? [],
    programs: [...new Set([...(g.programs ?? []), ...(extra.programs ?? [])])],
    cds: extra.cds ?? [],
    fiori: extra.fiori ?? [],
    bapis: extra.bapis ?? [],
    idocs: extra.idocs ?? [],
  };
}

const PM = (topic: string, q: string): CrossLink => ({ module: "PM", labelHe: topic, href: `/pm/?q=${encodeURIComponent(q)}` });
const PPI = (topic: string, q: string): CrossLink => ({ module: "PP-PI", labelHe: topic, href: `/pp-pi/?q=${encodeURIComponent(q)}` });
const PPx = (topic: string, ch: number): CrossLink => ({ module: "PP", labelHe: topic, href: `/library/pp/#ch${ch}` });

export const PP_CHAPTERS: PPChapter[] = [
  {
    n: 1, en: "Introduction to Production Planning in SAP S/4HANA", he: "מבוא לתכנון ייצור ב-SAP S/4HANA", pages: [37, 58],
    summaryHe:
      "פרק הפתיחה ממקם את מודול ה-PP בתוך לוגיסטיקת S/4HANA: שלושת סוגי הייצור — בדיד (Discrete), תהליכי (Process / PP-PI) וחוזר (Repetitive / REM) — וההחלטה איזה סוג מתאים לכל תרחיש. מוצג מחזור התכנון מקצה-לקצה: ביקוש ➔ MRP ➔ הזמנות מתוכננות ➔ פק\"ע ➔ דיווח ביצוע ➔ עלות. הפרק מדגיש את חידושי S/4HANA: MRP Live, מודל הנתונים החדש ו-Fiori.",
    objects: obj(1, { tables: ["MARC", "MARA", "T399D"], fiori: ["F0247", "F1422"] }),
    lessonsHe: [
      "בחירת סוג הייצור (Discrete/Process/REM) היא החלטה אסטרטגית מוקדמת — היא קובעת את כל ההגדרות שאחריה.",
      "S/4HANA מעביר את ה-MRP ל-MRP Live (HANA) — שינוי ביצועים מהותי מול ECC.",
    ],
    cbcHe: "ב-CBC ייצור המשקאות הוא תהליכי מובהק — הליבה היא PP-PI; פרק זה מסביר מדוע ולא PP בדיד.",
    related: [PPI("הגדרת ייצור תהליכי ב-PP-PI", "מתכון ייצור"), PPx("הגדרת ייצור תהליכי", 4)],
  },
  {
    n: 2, en: "Organizational Structure in SAP S/4HANA", he: "מבנה ארגוני ב-SAP S/4HANA", pages: [59, 74],
    summaryHe:
      "מבני הארגון הרלוונטיים לייצור: Company Code, Plant (המפעל — היחידה המרכזית), Storage Location, ו-MRP Areas. מוסבר כיצד המפעל קושר בין ה-Logistics ל-FI/CO וכיצד אזורי MRP (MRP Areas) מאפשרים תכנון ברזולוציה דקה מהמפעל (למשל לפי אתר אחסון או ספק משנה).",
    objects: obj(2, { tcodes: ["OX10", "OX09", "OMrp"], tables: ["T001W", "T001L", "MARC"], fiori: ["F1990"] }),
    configHe: [
      "הגדרת Plant ושיוכו ל-Company Code היא תנאי לכל תכנון ייצור.",
      "הפעלת MRP Areas (ברמת מפעל) מאפשרת תכנון נפרד לאתר אחסון / ספק משנה / לקוח.",
    ],
    lessonsHe: ["מבנה ארגוני שגוי = בעיות עלות ותכנון לאורך כל הפרויקט; יש לתאם עם FI/CO ו-MM מראש."],
    related: [PM("מבנה ארגוני (מפעל אחזקה)", "מפעל"), PPI("יחידות ארגוניות PP-PI", "מפעל")],
  },
  {
    n: 3, en: "Discrete Manufacturing Configuration", he: "הגדרת ייצור בדיד (Discrete)", pages: [75, 128],
    summaryHe:
      "צעדי ה-Customizing לייצור בדיד: הגדרת סוגי פק\"ע (Order Types) וטווחי מספרים, פרופיל תזמון, פריסת מסך לדיווח, מפתחות בקרה (Control Keys), אסטרטגיות תכנון (Planning Strategies), וקביעת ה-Production Scheduling Profile. נתוני האב: עץ מוצר (BOM), Routing (PLPO), מרכזי עבודה (Work Centers) וגרסת ייצור (Production Version).",
    objects: obj(3, {
      tcodes: ["OPJH", "OPL8", "CO01", "CO02", "CO03", "CA01", "CA02", "CS01", "CR01"],
      tables: ["PLKO", "PLPO", "MAPL", "MKAL", "STKO", "STPO", "CRHD", "AFKO", "AFPO"],
      fiori: ["F2336", "F1842"],
    }),
    configHe: [
      "Order Type (OPJH) — טווח מספרים, פרופיל תזמון, פרופיל קונפירמציה ופרופיל זמינות.",
      "Production Scheduling Profile (OPKP) — אוטומציות בשחרור/דיווח/סגירה.",
      "Control Key (PLPO) קובע אם פעולה מתוזמנת/מתומחרת/מאושרת/בעיבוד חיצוני.",
    ],
    runbookHe: [
      "צור Work Center (CR01) ➔ Routing (CA01) ➔ BOM (CS01) ➔ Production Version (C223/MM02).",
      "הגדר Order Type (OPJH) ושייך טווח מספרים (CO82) לפני יצירת פק\"ע ראשונה.",
    ],
    lessonsHe: ["גרסת ייצור (Production Version) הפכה לחובה ב-S/4HANA — יש לוודא קיומה לכל חומר מיוצר."],
    related: [PPI("הגדרת ייצור תהליכי (מקבילה)", "מתכון ראשי"), PPx("תכנון ייצור בדיד", 6), PM("מפתחות בקרה במרכז עבודה", "מרכזי עבודה")],
  },
  {
    n: 4, en: "Process Manufacturing Configuration", he: "הגדרת ייצור תהליכי (PP-PI)", pages: [129, 170],
    summaryHe:
      "ההגדרה הייחודית לייצור תהליכי: פרופיל המתכון הראשי (Master Recipe Profile), ניהול התהליך (Process Management) — הודעות תהליך (Process Messages), מתכוני בקרה (Control Recipes), גיליונות PI (PI Sheets) והוראות תהליך (Process Instructions / XSteps). מתכון ראשי (PLKO) מסוג Task List 2, שיוך מתכון-חומר (MAPL), ופרמטרים תלויי סוג-הזמנה.",
    objects: obj(4, {
      tcodes: ["C201", "C202", "C203", "COR1", "COR2", "COR3", "O25C", "OPN1", "O09C"],
      tables: ["PLKO", "PLPO", "MAPL", "MKAL", "AFKO", "AFPO", "RESB"],
      idocs: ["LOIPRO"],
      fiori: ["F2810", "F3364"],
    }),
    configHe: [
      "Master Recipe Profile (OPN1) — אפשרויות Process Instructions / XSTEPS / XSTEPS OPTIONAL.",
      "סוג רשימת משימות 2 משמש למתכון ראשי; שיוך לחומר דרך MAPL.",
      "Process Management: Control Recipe Destinations, Process Message Categories, PI Sheets.",
    ],
    cbcHe: "זהו הפרק המרכזי ל-CBC: ייצור משקאות (תרכיז, סוכר, CO2) הוא תהליכי — המתכון הראשי וה-Control Recipe הם לב התהליך, וה-IDoc LOIPRO/PI Sheets מזינים את ממשקי Zetes/Daymax.",
    related: [PPI("מתכון ייצור ופעולות", "מתכון ראשי"), PPI("פק\"ע ומתכון בקרה", "מתכון בקרה"), PPx("תכנון ייצור תהליכי", 7)],
  },
  {
    n: 5, en: "Repetitive Manufacturing Configuration", he: "הגדרת ייצור חוזר (REM)", pages: [171, 192],
    summaryHe:
      "ייצור רזה (Lean) עם מינימום רשומות: יצירת פרופיל REM (דרך האשף OSPT), בחירת שיטת ייצור MTS/MTO, נקודות דיווח (Reporting Points), תנועות סחורה אוטומטיות (Backflush) ושילוב Kanban. מתאים למוצרים בעלי שיעור חזרה גבוה ויציבות גבוהה.",
    objects: obj(5, { tcodes: ["OSP2", "OSPT", "MF50", "MFBF", "MF42N"], tables: ["MKAL", "MARC", "AFRU"], fiori: ["F2336"] }),
    configHe: [
      "REM Profile (OSPT) — בקרת Backflush, תנועות סחורה אוטומטיות, וקביעת אצווה.",
      "Reporting Points מקבילים ל-Milestone ב-Routing — Backflush בכל נקודה.",
    ],
    lessonsHe: ["REM אינו מנהל תהליכים מורכבים — להשתמש בו רק לזרימה רציפה ויציבה (פחות רלוונטי ל-CBC הליבתי)."],
    related: [PPx("תכנון ייצור חוזר", 8), PPx("Kanban", 9)],
  },
  {
    n: 6, en: "Production Planning for Discrete Manufacturing", he: "תכנון ייצור — ייצור בדיד", pages: [193, 276],
    summaryHe:
      "תהליך התכנון והביצוע בייצור בדיד: יצירת פק\"ע (CO01), שחרור (CO02), בדיקת זמינות חומר וקיבולת, הדפסת מסמכי ייצור, הוצאת חומרים (Goods Issue), דיווח ביצוע (Confirmation CO11N/CO15) וקבלת תוצר (Goods Receipt), ועד סגירה טכנית (TECO) והתחשבנות.",
    objects: obj(6, {
      tcodes: ["CO01", "CO02", "CO03", "CO11N", "CO15", "CO13", "CO05N", "CO04N", "COOIS", "MB1A", "MB31", "MD04"],
      tables: ["AFKO", "AFPO", "AFVC", "AFRU", "RESB", "MSEG"],
      bapis: ["BAPI_PRODORD_CREATE", "BAPI_PRODORDCONF_CREATE_TT"],
      fiori: ["F2336", "F3272", "F0289"],
    }),
    runbookHe: [
      "CO01 צור פק\"ע ➔ CO02 שחרר ➔ הדפס/הוצא חומרים ➔ CO11N דווח פעולה ➔ MB31 קבל תוצר ➔ CO02 TECO.",
      "מעקב: COOIS (Order Information System), CO05N עיבוד המוני, MD04 רשימת מלאי/דרישות.",
    ],
    troubleshootHe: [
      "פק\"ע לא משוחררת בשל חוסר חומר ➔ בדוק Availability Check (OPJK) ו-MD04.",
      "אישור (Confirmation) נכשל בשל פק\"ע פתוחה עם דרישות רכש ➔ Customer Exit/בדיקת סטטוס.",
    ],
    related: [PPI("פק\"ע תהליכי (COR1)", "פק\"ע"), PM("פקודות עבודה (IW31)", "פקודות עבודה"), PPx("הגדרת ייצור בדיד", 3)],
  },
  {
    n: 7, en: "Production Planning for Process Manufacturing", he: "תכנון ייצור — ייצור תהליכי", pages: [277, 336],
    summaryHe:
      "התכנון והביצוע בייצור תהליכי: פק\"ע תהליכי (Process Order — COR1/COR2), מתכון בקרה (Control Recipe) המועבר ל-PI Sheet, דיווח באמצעות הודעות תהליך (Process Messages), ניהול אצוות ושילוב QM. דגש על ניהול התהליך (Process Management) הייחודי ל-PP-PI.",
    objects: obj(7, {
      tcodes: ["COR1", "COR2", "COR3", "CORK", "CO53", "CO54", "C2A1", "COID", "COR6N"],
      tables: ["AFKO", "AFPO", "RESB", "MKAL", "PLKO"],
      idocs: ["LOIPRO"],
      fiori: ["F2810", "F3364"],
    }),
    runbookHe: [
      "COR1 צור פק\"ע תהליכי ➔ שחרר ➔ Control Recipe (CO53) ➔ PI Sheet (CO55) ➔ הודעות תהליך (CO54) ➔ CORK דיווח/סגירה.",
    ],
    cbcHe: "ה-PI Sheet והודעות התהליך הם נקודת האינטגרציה ל-Zetes/Daymax ב-CBC; LOIPRO מפיץ את הפק\"ע למערכות הביצוע.",
    related: [PPI("מתכון בקרה ופק\"ע", "מתכון בקרה"), PPx("הגדרת ייצור תהליכי", 4), PM("אינטגרציית QM", "QM")],
  },
  {
    n: 8, en: "Production Planning for Repetitive Manufacturing", he: "תכנון ייצור — ייצור חוזר", pages: [337, 396],
    summaryHe:
      "תכנון וביצוע ב-REM: לוח-ריצה (Run Schedule), כמות לוח-ריצה (Planned Orders), Backflush (MFBF), נקודות דיווח, ועיבוד עלויות תקופתי. דגש על פשטות והזנת נתונים מינימלית מול ייצור בדיד.",
    objects: obj(8, { tcodes: ["MF50", "MFBF", "MF42N", "MF41", "MF47", "MD04"], tables: ["AFRU", "MKAL", "MARC", "RESB"] }),
    troubleshootHe: [
      "שגיאות Backflush (חוסר רכיב/עלות) מצטברות ב-MF47 (Reprocessing) ו-COGI — יש לנקות שוטף.",
    ],
    lessonsHe: ["MF47/COGI הם תור שגיאות ה-Backflush — ניטור יומי מונע פערי מלאי."],
    related: [PPx("הגדרת ייצור חוזר", 5), PPx("Kanban", 9)],
  },
  {
    n: 9, en: "Kanban", he: "קנבן (Kanban)", pages: [397, 456],
    summaryHe:
      "חידוש מבוסס-משיכה (Pull) באמצעות מעגלי בקרה (Control Cycles): כרטיסי Kanban פיזיים/אלקטרוניים מאותתים על צריכה וחידוש אוטומטי. שיטות חידוש: ייצור (Run Schedule/פק\"ע), רכש, או העברת מלאי. לוח ה-Kanban (PK13N) לניטור סטטוס מיכלים.",
    objects: obj(9, { tcodes: ["PK01", "PK05", "PK13N", "PK11", "PKBC"], tables: ["PKHD", "PKPS"], fiori: ["F2401"] }),
    configHe: ["Control Cycle (PK01) מגדיר מעגל בקרה: חומר, מקור אספקה, מספר כרטיסים וכמות למיכל."],
    related: [PPx("ייצור חוזר", 8), PPx("תכנון דרישות חומר", 13)],
  },
  {
    n: 10, en: "Batch Management", he: "ניהול אצוות (Batch Management)", pages: [457, 544],
    summaryHe:
      "ניהול אצוות מקצה-לקצה: הפעלת ניהול אצוות לחומר, רמת אצווה (ברמת מפעל/חומר/Client), מאפייני אצווה (Batch Classification דרך מערכת הסיווג), קביעת אצווה אוטומטית (Batch Determination) בייצור/מכירות/מלאי, ועקיבות (Batch Where-Used / Genealogy).",
    objects: obj(10, {
      tcodes: ["MSC1N", "MSC2N", "MSC3N", "MSC4N", "CT04", "CL02", "CL6P", "MCHA", "COB1", "MB56"],
      tables: ["MCHA", "MCH1", "MCHB", "INOB", "AUSP", "KLAH"],
      fiori: ["F1576", "F2392"],
    }),
    configHe: [
      "הפעל ניהול אצוות (Material Master, תצוגת Plant/Storage) וקבע Batch Level (OMCT).",
      "Batch Classification: Class Type 022/023, מאפיינים (CT04), מחלקה (CL02).",
      "Batch Determination: אסטרטגיית חיפוש (COB1) — Condition Technique.",
    ],
    cbcHe: "באוכל ומשקאות ניהול האצוות חיוני לעקיבות (Traceability), תוקף (Shelf Life) ו-Recall — קריטי ל-CBC ולרגולציה.",
    troubleshootHe: ["קביעת אצווה לא מחזירה תוצאות ➔ בדוק Sort Rule, Selection Class ותנאי הזמינות (ATP)."],
    related: [PM("ניהול אצוות באחזקה", "אצוות"), PPI("ניהול אצוות PP-PI", "אצווה")],
  },
  {
    n: 11, en: "Sales and Operations Planning", he: "תכנון מכירות ותפעול (S&OP)", pages: [545, 616],
    summaryHe:
      "S&OP מאזן בין תחזית הביקוש ליכולת התפעול: תכנון גמיש (Flexible Planning) מול תכנון סטנדרטי, גרסאות תכנון, העברה ל-Demand Management (Transfer to Demand Management), ושימוש ב-SOP/LIS. בסיס לתכנון טקטי-אסטרטגי לפני ה-MRP התפעולי.",
    objects: obj(11, { tcodes: ["MC81", "MC82", "MC87", "MC88", "MC74", "MC75", "MD61"], tables: ["PBED", "PBIM", "PROP"], fiori: ["F0045"] }),
    runbookHe: ["MC81/MC82 צור/שנה תוכנית ➔ MC87 גרסאות ➔ MC74/MC75 העבר ל-Demand Management (PBED)."],
    lessonsHe: ["S&OP ב-ECC/LIS מועבר במידה רבה ל-SAP IBP ב-S/4HANA — שקול IBP לתכנון מתקדם."],
    related: [PPx("ניהול ביקושים", 12), PPI("PP מול PP-PI (תכנון)", "תכנון")],
  },
  {
    n: 12, en: "Demand Management", he: "ניהול ביקושים (Demand Management)", pages: [617, 670],
    summaryHe:
      "ניהול הביקושים מגשר בין התחזית לתכנון התפעולי: דרישות עצמאיות מתוכננות (PIR — Planned Independent Requirements, MD61), אסטרטגיות תכנון (Make-to-Stock/Make-to-Order), קיזוז עם הזמנות לקוח (Consumption Mode), ואופקי תכנון.",
    objects: obj(12, { tcodes: ["MD61", "MD62", "MD63", "MD79", "MD73"], tables: ["PBED", "PBIM"], fiori: ["F1611", "F2101"] }),
    configHe: ["אסטרטגיית תכנון (Strategy Group, MRP3) קובעת MTS/MTO ואת אופן קיזוז ה-PIR מול הזמנות."],
    lessonsHe: ["מצב קיזוז (Consumption Mode/Periods) שגוי גורם לכפל דרישות — לכייל לפי אופק התכנון."],
    related: [PPx("S&OP", 11), PPx("תכנון דרישות חומר", 13)],
  },
  {
    n: 13, en: "Material Requirements Planning", he: "תכנון דרישות חומר (MRP)", pages: [671, 768],
    summaryHe:
      "ליבת התכנון התפעולי: MRP Live (MD01N) ב-S/4HANA מול MRP קלאסי, פרמטרי MRP בנתוני האב (MRP Type, Lot Size, Procurement Type), הרצת תכנון, פענוח תוצאות ב-MD04 (Stock/Requirements List) וב-MD05, וטיפול בחריגות (Exception Messages).",
    objects: obj(13, {
      tcodes: ["MD01", "MD01N", "MD02", "MD03", "MD04", "MD05", "MD06", "MD07", "OPPQ", "OPPR", "MD11"],
      tables: ["MDKP", "MDTB", "PLAF", "MARC", "MDMA"],
      cds: ["C_MRPMaterials", "I_MRPMaterial"],
      fiori: ["F0247", "F2101", "F1422", "F0251"],
    }),
    configHe: [
      "MRP Live (MD01N) רץ על HANA — אין צורך בהרצת רקע קלאסית; מתעדף חומרים שהשתנו.",
      "פרמטרי MRP בנתוני אב: MRP Type (PD/VB), Lot Size, Reorder Point, Safety Stock, Procurement Type.",
    ],
    runbookHe: ["MD01N הרץ MRP Live ➔ MD04 נתח דרישות/היצע ➔ טפל ב-Exception Messages ➔ המר הזמנות מתוכננות (MD04/CO40)."],
    troubleshootHe: [
      "הזמנות מתוכננות שגויות ➔ בדוק MRP Type, Lot Size ו-Scope of Planning.",
      "הודעות חריגה (Exception Group 6/7) מצביעות על איחור/הקדמה — תזמן מחדש.",
    ],
    cbcHe: "ב-CBC ה-MRP מתכנן חומרי גלם ואריזה לפי תחזית; MRP Live מקצר זמני ריצה משמעותית.",
    related: [PPx("ניהול ביקושים", 12), PPx("חידוש מונחה-ביקוש", 14), PM("MRP לחלקי חילוף", "MRP")],
  },
  {
    n: 14, en: "Demand-Driven Replenishment (DDMRP)", he: "חידוש מונחה-ביקוש (DDMRP)", pages: [769, 836],
    summaryHe:
      "חידוש מונחה-ביקוש לפי מתודולוגיית DDMRP: מיקום באפרים אסטרטגיים (Buffer Positioning), חישוב רמות באפר (אדום/צהוב/ירוק), והרצת חידוש מבוססת-צריכה בפועל. כולל אפליקציות Fiori ייעודיות לתכנון וביצוע ב-S/4HANA.",
    objects: obj(14, { tcodes: ["MD04"], tables: ["MARC", "MDMA"], cds: ["C_DDLeadTimeClassification"], fiori: ["F2392", "F2768", "F3261", "F2769"] }),
    configHe: ["שלבי DDMRP: Classification ➔ Buffer Positioning ➔ Buffer Sizing ➔ Planning ➔ Execution (אפליקציות Fiori)."],
    lessonsHe: ["DDMRP מתאים לחומרים בעלי שונות ביקוש גבוהה; משלים (לא מחליף) את ה-MRP הקלאסי."],
    related: [PPx("תכנון דרישות חומר", 13), PPx("תכנון חיזויי", 15)],
  },
  {
    n: 15, en: "Predictive Material and Resource Planning (pMRP)", he: "תכנון חומרים ומשאבים חיזויי (pMRP)", pages: [837, 1087],
    summaryHe:
      "pMRP — כלי חדש ב-S/4HANA לסימולציית תכנון: יצירת תרחישי סימולציה מתוך אזורי תכנון, בדיקת עומסי קיבולת (Capacity Overload) על מרכזי עבודה/משאבים, התאמת ביקוש/קיבולת, ופרסום (Release) התרחיש לתכנון התפעולי. בנוי על מושגי תכנון לטווח ארוך (LTP).",
    objects: obj(15, { tcodes: ["MD04"], cds: ["C_PMRPSimulation"], fiori: ["F3261", "F4090", "F4147", "F4148"] }),
    runbookHe: ["צור Planning Scenario (Fiori) ➔ בחר אזור תכנון ➔ נתח עומסי קיבולת ➔ התאם ➔ Release לתכנון."],
    lessonsHe: ["pMRP הוא שכבת סימולציה חיזויית מעל ה-MRP — לתכנון תרחישים לפני התחייבות תפעולית."],
    related: [PPx("חידוש מונחה-ביקוש", 14), PPI("תכנון מול PP-PI", "תכנון")],
  },
];

export const PP_EXEC_HE = `מודול ה-PP (Production Planning) ב-SAP S/4HANA מכסה את מחזור התכנון והייצור המלא — משלושת סוגי הייצור (בדיד, תהליכי/PP-PI, חוזר/REM), דרך נתוני אב (BOM, Routing/מתכון ראשי, מרכזי עבודה, גרסת ייצור), תכנון (S&OP, ניהול ביקושים, MRP Live, DDMRP, pMRP), ביצוע (פק\"ע/Process Order, Backflush, Kanban) ועד ניהול אצוות ועלות. ב-S/4HANA הליבה היא MRP Live על HANA, מודל נתונים פשוט יותר וממשק Fiori. עבור CBC — הענף התהליכי (PP-PI) הוא המרכזי: המתכון הראשי, מתכון הבקרה וה-PI Sheets מזינים את ממשקי הביצוע (Zetes/Daymax), וניהול האצוות קריטי לעקיבות ולרגולציה.`;

export const PP_GLOSSARY: { term: string; he: string }[] = [
  { term: "MRP Live (MD01N)", he: "הרצת תכנון דרישות חומר על מנוע HANA — מהירה, מתעדפת חומרים שהשתנו." },
  { term: "PLKO / PLPO", he: "כותרת ופעולות של רשימת משימות / מתכון ראשי (Routing / Master Recipe)." },
  { term: "MAPL", he: "שיוך רשימת משימות/מתכון לחומר (Material-Task List Assignment)." },
  { term: "MKAL", he: "גרסת ייצור (Production Version) — חובה ב-S/4HANA." },
  { term: "AFKO / AFPO / AFRU", he: "כותרת פק\"ע / פריט פק\"ע / רשומות דיווח ביצוע (Confirmation)." },
  { term: "Control Recipe / PI Sheet", he: "מתכון בקרה וגיליון הוראות תהליך בייצור תהליכי (PP-PI)." },
  { term: "LOIPRO", he: "IDoc להפצת פק\"ע ייצור למערכות ביצוע (Zetes/Daymax ב-CBC)." },
  { term: "Backflush (MFBF)", he: "ניכוי רכיבים אוטומטי בעת דיווח תוצר (ייצור חוזר)." },
  { term: "Kanban Control Cycle (PK01)", he: "מעגל בקרה לחידוש מונחה-משיכה." },
  { term: "DDMRP", he: "Demand-Driven MRP — תכנון מבוסס באפרים וצריכה בפועל." },
  { term: "pMRP", he: "Predictive MRP — סימולציית קיבולת/ביקוש לפני תכנון תפעולי." },
  { term: "Batch Determination (COB1)", he: "קביעת אצווה אוטומטית באמצעות Condition Technique." },
];

export const PP_STATS = {
  book: "Production Planning with SAP S/4HANA",
  pages: 1087,
  chapters: PP_CHAPTERS.length,
  tcodes: [...new Set(PP_CHAPTERS.flatMap((c) => c.objects.tcodes))].length,
  glossary: PP_GLOSSARY.length,
  crossLinks: PP_CHAPTERS.reduce((s, c) => s + (c.related?.length ?? 0), 0),
};
