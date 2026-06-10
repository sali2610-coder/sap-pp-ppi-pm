// ===== PP Academy — quality verification report data =====
// Generated from a 15-chapter audit (read-only reviewer per chapter + deterministic
// link/facet checks). Confidence = closeness to the Ch3 benchmark publication bar (~88).
// Honest record: SAP identifiers were authored from domain knowledge, not scraped from
// the client system — flagged items need spot-checks against the live S/4 tenant.

export type Severity = "high" | "med" | "low";
export interface QAFinding { node?: string; value?: string; problem: string; severity: Severity }
export interface ChapterQA {
  n: number;
  titleHe: string;
  titleEn: string;
  confidence: number;          // 0-100, vs Ch3 ≈ 88
  hierarchyMatch: "high" | "medium" | "low";
  reviewed: boolean;           // had a qualitative reviewer (all true)
  summary: string;             // Hebrew verdict
  sapObjectIssues: QAFinding[];
  crossLinkIssues: QAFinding[];
  hierarchyIssues: string[];
  terminologyIssues: string[];
  cbcIssues: string[];
  missingContent: string[];
}

// re-validation after the systemic-fix pass (object cross-links render-guarded,
// wrong object mappings corrected, broken route fixed). New confidence per chapter:
export const PP_REVALIDATED: Record<number, number> = {
  1: 90, 2: 88, 3: 93, 4: 92, 5: 92, 6: 91, 7: 87, 8: 92,
  9: 92, 10: 95, 11: 91, 12: 91, 13: 89, 14: 86, 15: 93,
};

export const PP_QUALITY_META = {
  benchmark: 88,
  publishBar: 90,
  generatedHe: "10 ביוני 2026",
  revalidatedHe: "10 ביוני 2026 — לאחר תיקון",
  crossLinksResolved: true,
  scopeHe:
    "ביקורת איכות לכל 15 פרקי ספר ה-PP: מבקר ייעודי לכל פרק (קריאה-בלבד) + בדיקות דטרמיניסטיות (קישורים שבורים, מקטעים ריקים, היררכיה מול מקור).",
  resolvedHe: [
    "קישורי-אובייקט שבורים → תוקנו ברמת-הרינדור: קישור-אובייקט נוצר רק אם עמוד-האובייקט קיים במאגר; אחרת מוצג כ-chip רגיל (ללא קישור). 0 שגיאות-404 בכל הספר ובספרים הבאים.",
    "מסלול שבור: /library/pp-pi/ → /pp-pi/ (פרק 10).",
    "מיפויי-אובייקט שגויים תוקנו: OSPT→OSP2 (פרקים 5,8), CL6BN→CL6N (פרק 10), PMRP_*→PPH_PMRP_* (פרק 15), WB01→OX10 (פרק 2), PROW→PGMI (פרק 11), T457D→PPH_DD_BUFFER + OMDD→SPRO (פרק 14).",
    "אומת מחדש דטרמיניסטית: 0 קישורים שבורים, 0 עוגנים שבורים, 0 מקטעי-חובה ריקים.",
  ],
  remainingHe: [
    "מזהי-Fiori כ-placeholder (F2336/F1422/F2832): כעת מוצגים כ-chips רגילים (לא קישורים שבורים), אך עדיין דורשים אימות פר-צומת מול SAP Fiori Apps Reference Library מול ה-tenant. לא הומצאו מזהים חדשים.",
    "פרק 14 (DDMRP): מזהי-Fiori של DD דורשים אימות מול הספרייה הרשמית; הטבלאות/SPRO תוקנו.",
    "פרק 7: דקויות tcode במחזור-PI Sheet (CO55 maintain מול CO60 find) — לאימות.",
    "פרק 2: שלושה מערכי fiori ריקים (מוצגים '—') בצמתי org-structure שאין להם אפליקציית-Fiori — תקין.",
  ],
  systemicHe: [
    "קישורי-אובייקט שבורים: חלק מקישורי 'נושאים קשורים' מצביעים לעמודי-אובייקט שאינם במאגר ה-340 → 404. קיים גם בפרק 3 (AUFK/OS20/STZU). תיקון: להוסיף את הקודים למאגר או להפוך קישור-אובייקט לעמיד (ללא-קישור אם חסר).",
    "מזהי Fiori כ-placeholder: F2336 / F1422 / F2832 חוזרים עשרות פעמים על מקטעי-קונפיגורציה שאין להם אפליקציית-Fiori אמיתית. תיקון: להסיר Fiori ממקטעי-SPRO טהורים או למפות ל-ID נכון.",
    "אובייקטי-SAP שגויים בודדים שדורשים אימות מול ה-tenant: OSPT↔OSP2 (פרק 5), Class Type 023↔022 + CL6BN↔CL6N (פרק 10), WB01/OPPQ (פרק 2), PMRP_*↔PPH_PMRP_* (פרק 15), T457D/OMDD ב-DDMRP (פרק 14), PROW (פרק 11), D1/D2 כ-MRP types (פרק 13).",
    "מסלול שבור: פרק 10 מקשר ל-/library/pp-pi/ שאינו קיים — הנתיב הנכון /pp-pi/.",
    "מקטעים ריקים: שלושה מערכי fiori ריקים בפרק 2 (2.1.1, 2.2.1, 2.2.2).",
  ],
};

export const PP_QUALITY: ChapterQA[] = [
  {
    n: 1, titleHe: "מבוא לתכנון ייצור ב-SAP S/4HANA", titleEn: "Introduction to Production Planning",
    confidence: 86, hierarchyMatch: "high", reviewed: true,
    summary: "היררכיה תואמת ל-TOC במדויק והטרמינולוגיה/CBC מצוינות; החולשה היחידה — כמה מזהי Fiori לא-מאומתים (F2101 מסומן כ-Manage Production Orders במקום F2336; F3469/F3556/F2332) וערבוב קל של C223 כ-Rate Routing.",
    sapObjectIssues: [
      { node: "1.1", value: "F2101", problem: "מסומן 'Manage Production Orders' — הבנצ'מרק משתמש ב-F2336; F2101 כנראה מיפוי שגוי.", severity: "med" },
      { node: "1.1.2/1.2/1.3", value: "F3469/F3556/F2332/F2735", problem: "מזהי Fiori לא-מאומתים, ללא תימוכין בבנצ'מרק.", severity: "low" },
      { node: "1.3", value: "C223", problem: "מצוין כיצירת Rate Routing; C223 = Production Version, יצירת rate routing היא CA21.", severity: "low" },
    ],
    crossLinkIssues: [], hierarchyIssues: [], terminologyIssues: [], cbcIssues: [],
    missingContent: ["מקטעי-Fiori הם החוליה החלשה מול ch3 (הרבה IDs לא-מאומתים)."],
  },
  {
    n: 2, titleHe: "מבנה ארגוני ב-SAP S/4HANA", titleEn: "Organizational Structure",
    confidence: 82, hierarchyMatch: "high", reviewed: true,
    summary: "מבנה נאמן לעמוד-השדרה של ה-TOC (קיפול הכפילויות 2.3–2.11 מוצדק כמו בפרק 3) ופדגוגיה חזקה. פגמים: קישור-אובייקט שבור 2.1.4→MARD + דפוס שיטתי של אריחי-טבלה/tcode מקושרים לעמודים שלא קיימים; tcodes שגויים (WB01 ללוח-שנה במקום OX10, OMS2, OPPQ); שלושה מערכי fiori ריקים.",
    sapObjectIssues: [
      { node: "2.1.3", value: "WB01", problem: "אינו tcode לשיוך לוח-שנה/מפעל; השיוך הוא OX10.", severity: "high" },
      { node: "2.1.3", value: "OMS2", problem: "תחזוקת Material Type — לא רלוונטי במקטע הגדרת-מפעל.", severity: "med" },
      { node: "2.1.5", value: "OPPQ", problem: "MRP Controllers מוגדרים ב-OMD0/IMG; OPPQ הוא תחזוקת-MRP כללית למפעל.", severity: "med" },
    ],
    crossLinkIssues: [
      { node: "2.1.4", value: "MARD", problem: "עמוד-אובייקט אינו במאגר → 404.", severity: "high" },
      { problem: "דפוס שיטתי: רוב אריחי הטבלאות/tcodes (T000/T001/T024D/KAKO/THOL…) מקשרים לעמודי-אובייקט שלא קיימים.", severity: "med" },
    ],
    hierarchyIssues: ["TOC '2' כולל כפילויות מקולקלות 2.3–2.11 שקופלו ל-2.1/2.2 (מתועד, מוצדק)."],
    terminologyIssues: ["Production Scheduler מול Production Supervisor (FEVOR) מעורבבים מעט."],
    cbcIssues: ["שמות מפעלי-CBC (אשקלון/באר-טוביה) סבירים אך לא-מאומתים מול רשימת-המפעלים בפועל."],
    missingContent: ["מערכי fiori ריקים ב-2.1.1, 2.2.1, 2.2.2; הצמתים הללו דקים מהשכנים."],
  },
  {
    n: 3, titleHe: "הגדרת ייצור בדיד (Discrete)", titleEn: "Discrete Manufacturing Configuration",
    confidence: 88, hierarchyMatch: "high", reviewed: true,
    summary: "פרק-הייחוס. תיקון תוויות-ההורה מ-TOC מקולקל מוצדק ויוצר עמוד-שדרה קוהרנטי. פגמים שאותרו גם בו: שלושה קישורי-אובייקט מתים (AUFK/OS20/STZU) ו-F2336 חוזר 17× על מקטעי-קונפיגורציה. אלה הפגמים השיטתיים שיש לתקן בכל הספר.",
    sapObjectIssues: [
      { node: "3.5/3.6", value: "F2336", problem: "חוזר 17× כ-Fiori על מקטעי-SPRO (Order Type/OPL8/Scheduling/Checking) שאין להם אפליקציה.", severity: "med" },
      { node: "3.5", value: "T399X", problem: "טבלת Order Type הקנונית היא T003O; T399X שייכת ל-OPL8.", severity: "low" },
    ],
    crossLinkIssues: [
      { node: "3.5", value: "AUFK", problem: "קישור-אובייקט מת (לא במאגר) → 404.", severity: "high" },
      { node: "3.2.1", value: "OS20", problem: "קישור-אובייקט מת → 404.", severity: "high" },
      { node: "3.2.4", value: "STZU", problem: "קישור-אובייקט מת → 404.", severity: "high" },
    ],
    hierarchyIssues: ["3.10 Production Version הוא תוספת מעבר ל-TOC (שמסתיים ב-3.9.2) — מוצדק לשלמות אך חורג מהמקור."],
    terminologyIssues: [], cbcIssues: [],
    missingContent: ["קישור לא-אחיד: כמה תתי-צמתים ללא relatedHe."],
  },
  {
    n: 4, titleHe: "הגדרת ייצור תהליכי (PP-PI)", titleEn: "Process Manufacturing Configuration",
    confidence: 88, hierarchyMatch: "high", reviewed: true,
    summary: "פרק PP-PI נאמן ל-TOC עם אובייקטים נכונים (Master Recipe C201/C202, Resource CRC1, Order Category 40, CO9A/CO53/CO54/CO60) ו-CBC סביר. פגמים: קישור 4.4→AUFK שבור; F2336 חוזר ~22× כ-placeholder; relabel מוצדק של 4.2→Resource; טבלאות message לא-ודאיות (CABTS/CABTD).",
    sapObjectIssues: [
      { node: "רבים", value: "F2336", problem: "מופיע על ~22 צמתים בנושאים לא-קשורים — placeholder.", severity: "med" },
      { node: "4.1.1", value: "C2C", problem: "Master Recipe Profile מתוחזק ב-SPRO; C2C כ-tcode עצמאי לא-מתועד היטב.", severity: "low" },
      { node: "4.5.x", value: "CABTS/CABTD/TCABD", problem: "טבלאות process-message — חלקן legacy/לא-ודאיות, לאמת.", severity: "low" },
    ],
    crossLinkIssues: [{ node: "4.4", value: "AUFK", problem: "עמוד-אובייקט לא במאגר → 404.", severity: "high" }],
    hierarchyIssues: ["4.2 שונה מ-'Task List Assignment with Material Type' ל-'Resource' (מוצדק ע\"י הילדים, חורג מהתווית המילולית)."],
    terminologyIssues: [], cbcIssues: ["מוטיב CBC (Brix/קו-מילוי) חוזר זהה בכל הצמתים — מונוטוני."],
    missingContent: ["PLAS/RESB נעדרות למרות רלוונטיות; XSteps דקים יחסית לתקן S/4."],
  },
  {
    n: 5, titleHe: "הגדרת ייצור חוזר (REM)", titleEn: "Repetitive Manufacturing Configuration",
    confidence: 86, hierarchyMatch: "high", reviewed: true,
    summary: "מבנה מצוין — כולל 18 הילדים של 5.1 (כל אחד facet אמיתי, לא מרופד) ותיקון מתועד של 5.3. פגמים: ה-tcode לפרופיל REM ניתן כ-OSPT בכל מקום במקום OSP2; שלושה קישורי AFFW מתים; מיפויים מוטעים (MF45 כ-backflush, CUVTAB ב-batch determination).",
    sapObjectIssues: [
      { node: "כל הצמתים", value: "OSPT", problem: "פרופיל-REM מוגדר כ-OSPT; ה-tcode הסטנדרטי הוא OSP2 (גם pp-knowledge מציין OSP2).", severity: "high" },
      { node: "5.1.6", value: "MF45", problem: "מצוין כ-backflush; MF45 הוא מסמך/הערכה. Backflush קולקטיבי = MF42N.", severity: "med" },
      { node: "5.1.10", value: "CUVTAB", problem: "טבלת variant config — לא רלוונטית ל-Batch Determination.", severity: "med" },
    ],
    crossLinkIssues: [
      { node: "5.7", value: "AFFW", problem: "קישור-אובייקט מת → 404.", severity: "high" },
      { node: "5.1.7", value: "AFFW", problem: "קישור-אובייקט מת → 404.", severity: "high" },
      { node: "5.1.15", value: "AFFW", problem: "קישור-אובייקט מת → 404.", severity: "high" },
    ],
    hierarchyIssues: ["5.3 שונה מ-'Automatic GR' ל-'Planning Table' (מוצדק, מתועד)."],
    terminologyIssues: [], cbcIssues: [],
    missingContent: ["KKF6N/T437 מוזכרים אך ללא עמוד-אובייקט; אין קישור לפרק 8 (ביצוע REM)."],
  },
  {
    n: 6, titleHe: "תכנון ייצור — ייצור בדיד", titleEn: "Production Planning for Discrete Mfg",
    confidence: 88, hierarchyMatch: "medium", reviewed: true,
    summary: "פרק חזק עם אובייקטים נכונים (CO01/CO11N/CO15, AUFK/AFKO/AFPO/RESB/AFRU, OPL8/OPKP/OPU3). Hierarchy=medium כי תוויות-ההורה ב-TOC מקולקלות (שמות BOM/Material-Master על ילדי-ביצוע) — ה-relabel מוצדק, אך 6.5/6.8/6.9 הם תוספות מעבר למקור. שני קישורים שבורים (JEST/COEP) ו-tcode מפוקפק CON2.",
    sapObjectIssues: [
      { node: "6.8", value: "CON2", problem: "אינו tcode סטנדרטי ל-settlement/variance; כנראה התכוונו KKS1/KKS2.", severity: "low" },
    ],
    crossLinkIssues: [
      { node: "6.4", value: "JEST", problem: "עמוד-אובייקט לא במאגר → 404.", severity: "med" },
      { node: "6.8", value: "COEP", problem: "עמוד-אובייקט לא במאגר → 404.", severity: "med" },
    ],
    hierarchyIssues: [
      "תוויות TOC '6' מקולקלות; ה-relabel למחזור-החיים הבדיד מוצדק (הילדים תואמים).",
      "6.5 (Printing) / 6.8 (Settlement/TECO) / 6.9 (Order Info System) הם תוספות מעבר ל-TOC (שמסתיים ב-6.7.4).",
    ],
    terminologyIssues: [], cbcIssues: [],
    missingContent: ["KKAX (WIP) רק ב-flow ולא ב-tcodes; קטגוריות-סטייה לא ממוספרות; תנועת 531 (תוצר-לוואי) חסרה."],
  },
  {
    n: 7, titleHe: "תכנון ייצור — ייצור תהליכי", titleEn: "Production Planning for Process Mfg",
    confidence: 83, hierarchyMatch: "high", reviewed: true,
    summary: "מבנה תואם ל-TOC '7' ומונחי PP-PI מדויקים (Order Category 40, Master Recipe Type 2, Phase, Control Recipe→PI Sheet→Process Messages, XSteps). החולשה המרכזית: דיוק tcodes במחזור-חיי PI Sheet — CO55 (maintain) מול CO60 (find) מבולבלים/הפוכים ב-7.6.4/7.6.5; MB31 מול MIGO; F2336 כ-catch-all.",
    sapObjectIssues: [
      { node: "7.6.4", value: "CO60", problem: "CO60='Find PI Sheet'; תחזוקה היא CO55. התוויות מבלבלות בין השניים.", severity: "med" },
      { node: "7.6.5", value: "CO55", problem: "'Completing PI Sheets' משייך CO55 — פיצול maintain/complete בין 7.6.4/7.6.5 הפוך/מטושטש.", severity: "med" },
      { node: "7.6.6", value: "MB31", problem: "GR מוצג כ-MB31 (ECC); ב-S/4 הסטנדרט MIGO.", severity: "low" },
      { node: "רבים", value: "F2336", problem: "חוזר על כמעט כל צומת כ-catch-all.", severity: "med" },
    ],
    crossLinkIssues: [],
    hierarchyIssues: ["7.7 הורחב ל-'…CT04 and XSteps' מול תווית-המקור '…CT04' — הרחבת-מחבר."],
    terminologyIssues: [], cbcIssues: [],
    missingContent: ["COR3 (display process order) נעדר; reprocessing tcode מעוגן חלש; עורך-XStep בתוך C201/C202 מעוגן דק."],
  },
  {
    n: 8, titleHe: "תכנון ייצור — ייצור חוזר", titleEn: "Production Planning for Repetitive Mfg",
    confidence: 88, hierarchyMatch: "high", reviewed: true,
    summary: "פרק REM שלם התואם ל-TOC '8' אחד-לאחד עם אובייקטים נכונים (MF50, MFBF, MF42N, MF47/COGI, CA21, MKAL). שני קישורים שבורים (KAKO/AFFW); F1422/F2245 כ-placeholders; MF45 לא-מוסבר; שלוש סטיות תווית-מול-תוכן שירשו מה-TOC (8.2/8.4/8.7).",
    sapObjectIssues: [
      { node: "כל הצמתים", value: "F1422", problem: "חוזר כ-Fiori גנרי גם על COGI/MF47/MDVP שאין להם אפליקציה.", severity: "med" },
      { node: "8.2.4", value: "F2245", problem: "מצוין כ-Rate Routing Fiori; כיסוי Fiori ל-CA21 דליל — כנראה שגוי.", severity: "med" },
      { node: "8.7.7", value: "MF45", problem: "ב-tcodes ללא הסבר; postprocessing הוא MF47/COGI.", severity: "low" },
    ],
    crossLinkIssues: [
      { node: "8.6", value: "KAKO", problem: "עמוד-אובייקט לא במאגר → 404.", severity: "high" },
      { node: "8.7.7", value: "AFFW", problem: "עמוד-אובייקט לא במאגר → 404.", severity: "high" },
    ],
    hierarchyIssues: ["8.7 titleEn 'Work Center Capacity Header' סותר את הילדים (Backflush); 8.2/8.4 drift תווית-מול-תוכן מהמקור."],
    terminologyIssues: ["'הזמנת Run-Schedule … order type REM' רופף — ב-S/4 REM משתמש ב-planned orders רגילים (PLAF) עם דגל-REM."],
    cbcIssues: [],
    missingContent: ["מחזור-חיי Product Cost Collector דק; Reporting-Point backflush ו-ביטול-Backflush חסרים."],
  },
  {
    n: 9, titleHe: "קנבן (Kanban)", titleEn: "Kanban",
    confidence: 88, hierarchyMatch: "high", reviewed: true,
    summary: "כל 23 צמתי TOC '9' נוכחים ומקוננים נכון, תוכן Kanban תקין (PKMC/PKHD/PKPS, PK13N/PK12N, שלוש אסטרטגיות-חידוש, חישוב). שני re-scope מכוונים של הורים (9.6/9.7). פגם עיקרי: קישור מת 9.6→PKER; חשד ל-anchor תלוי 3.10; הכללות-יתר קלות של PK01/PK11/PK31.",
    sapObjectIssues: [
      { node: "9.1", value: "PK01", problem: "מוחל גנרית כ-control-cycle; PKMC הוא ה-tcode המרכזי.", severity: "low" },
      { node: "9.7", value: "PK31", problem: "מתוח ככיסוי הערכה/ניתוח/התראות שאינו בבעלותו המלאה.", severity: "low" },
    ],
    crossLinkIssues: [{ node: "9.6", value: "PKER", problem: "עמוד-אובייקט לא במאגר → 404.", severity: "high" }],
    hierarchyIssues: [
      "9.6 שונה מ-'Control Types for In-House Production' ל-'…ואסטרטגיות חידוש' (re-scope מכוון, חורג מהתווית).",
      "9.7 הורה ממותג מחדש; 9.7.1 תוכן=חישוב מול תווית-מקור 'Control Cycle and Kanban Evaluation'.",
    ],
    terminologyIssues: [], cbcIssues: [],
    missingContent: ["Event-driven Kanban (PK23/PK24) מוזכר רק ברמז; חוסר צומת ייעודי."],
  },
  {
    n: 10, titleHe: "ניהול אצוות (Batch Management)", titleEn: "Batch Management",
    confidence: 93, hierarchyMatch: "high", reviewed: true,
    summary: "פרק קרוב-לבנצ'מרק: היררכיה תואמת TOC '10' במדויק עם relabel מתועד של תוויות מקולקלות. אובייקטים נכונים (MSC1N/2N/3N, OMCT, CL01/CL02 + class type 022, BMBC, FEFO/VFDAT). פגמים: 7 קישורי-אובייקט מתים + מסלול /library/pp-pi/ שבור; שגיאת Class Type 023 (צ\"ל 022); tcode לא-קיים CL6BN (צ\"ל CL6N).",
    sapObjectIssues: [
      { node: "10.3/intro", value: "Class Type 023", problem: "023 הוא class type של Variants (LO-VC), לא Batch. סוג-האצווה היחיד הוא 022. עובדה שגויה חוזרת.", severity: "high" },
      { node: "10.5", value: "CL6BN", problem: "אינו tcode תקף; רשימת batch where-used היא CL6N; cockpit הוא BMBC.", severity: "med" },
      { node: "10.5.x", value: "V/C1-V/C6", problem: "tcodes של SD pricing מוחלים על batch determination; הקונפיגורציה דרך CU70/IMG.", severity: "low" },
    ],
    crossLinkIssues: [
      { node: "10.3/10.7", value: "KSSK", problem: "עמוד-אובייקט לא במאגר → 404.", severity: "high" },
      { node: "10.5/10.5.8", value: "KONP", problem: "עמוד-אובייקט לא במאגר → 404.", severity: "high" },
      { node: "10.6/10.6.2", value: "CHVW", problem: "עמוד-אובייקט לא במאגר → 404.", severity: "high" },
      { node: "10.2.1", value: "OMCT", problem: "עמוד-אובייקט לא במאגר → 404.", severity: "high" },
      { node: "10.5.6", value: "/library/pp-pi/", problem: "מסלול לא קיים; הנכון /pp-pi/.", severity: "high" },
    ],
    hierarchyIssues: ["תוויות-עלה מקולקלות (10.4-10.7) שונו לנושאים קוהרנטיים (מתועד)."],
    terminologyIssues: [], cbcIssues: [],
    missingContent: ["Batch valuation / split valuation מוזכר רק בחטף."],
  },
  {
    n: 11, titleHe: "תכנון מכירות ותפעול (S&OP)", titleEn: "Sales and Operations Planning",
    confidence: 88, hierarchyMatch: "high", reviewed: true,
    summary: "פרק קרוב-לבנצ'מרק: היררכיה ממופה 1:1 ל-TOC '11', מונחים מצוינים (SOP standard/flexible, info structure S076, RCCP, PIR) ו-CBC עונתי קוהרנטי. פגמים: טבלאות מפוקפקות/מומצאות (PROW לפקטורים-יחסיים; T024D/T024W); אי-דיוקי-tcode (MC9A ל-RCCP, MC67 לאירועים); אין קישורי-object; RCCP דק.",
    sapObjectIssues: [
      { node: "11.1/11.1.5", value: "PROW", problem: "אינה טבלה סטנדרטית לפקטורים-יחסיים ב-SOP (היחסים ב-PGMI). כנראה מומצאת.", severity: "med" },
      { node: "11.5", value: "MC9A", problem: "RCCP למוצר-קבוצה הוא MC35; MC9A לכל-היותר תחזוקת-פרופיל.", severity: "low" },
      { node: "11.4.3/11.4.6", value: "T024D/T024W", problem: "T024D=MRP controller; T024W לא-סטנדרטית — תיוג שגוי תחת Forecast/Weighting.", severity: "low" },
    ],
    crossLinkIssues: [],
    hierarchyIssues: ["11.3 תווית-מקור קטועה ('…Consiste') שוחזרה ל-Consistent Planning."],
    terminologyIssues: ["'Delta Planning' מוצג כשיטה שוות-מעמד ל-Level-by-Level/Consistent — מעט מוגזם."],
    cbcIssues: [],
    missingContent: ["אין קישורי /object/* (מול הבנצ'מרק); RCCP ללא צומת-ייעודי; הערת S/4-IBP דקה."],
  },
  {
    n: 12, titleHe: "ניהול ביקושים (Demand Management)", titleEn: "Demand Management",
    confidence: 88, hierarchyMatch: "medium", reviewed: true,
    summary: "תוכן עשיר עם אובייקטים נכונים (MD61/62, PBED/PBIM, אסטרטגיות 10/11/20/40/50/52/63/81/82, VSF/KSV/LSF). Hierarchy=medium: לאחר re-nest מתועד כמה מזהי-צמתים לא תואמים את הוריהם (12.8.1 תחת 12.1; 12.7.x תחת 12.6). שני קישורים שבורים (T459K/T459C); F2832 על ~20 צמתים; טבלאות חלשות (TMVF/T458A).",
    sapObjectIssues: [
      { node: "כל הצמתים", value: "F2832", problem: "חוזר על ~20 צמתי-קונפיגורציה/אסטרטגיה כ-placeholder.", severity: "med" },
      { node: "12.1.3", value: "TMVF", problem: "אינה טבלת availability-check סטנדרטית (TMVFP/T441V).", severity: "low" },
      { node: "12.1.2", value: "T458A", problem: "קביעת req-type היא T459W/T459X — T458A מפוקפקת.", severity: "low" },
    ],
    crossLinkIssues: [
      { node: "12.2", value: "T459K", problem: "עמוד-אובייקט לא במאגר → 404.", severity: "high" },
      { node: "12.3", value: "T459C", problem: "עמוד-אובייקט לא במאגר → 404.", severity: "high" },
    ],
    hierarchyIssues: [
      "מזהי-צמתים לא עוקבים אחר ההורה לאחר re-nest (12.8.1↗12.1; 12.7.x↗12.6; ch12-12.6=TOC-12.7).",
      "TOC '12.4 Strategy 40: MTS' הוסר (קופל ל-12.2.1) — קורא לפי TOC לא ימצא 12.4.",
    ],
    terminologyIssues: ["אסטרטגיה 52 קשורה הדוקות מדי ל-planning-material (60/63)."],
    cbcIssues: ["אסטרטגיה 11 (gross) ל-CBC make-to-stock מאולצת; 81/82 (promo assembly) ספקולטיבי."],
    missingContent: ["אין צומת ייעודי לאסטרטגיה 40."],
  },
  {
    n: 13, titleHe: "תכנון דרישות חומר (MRP)", titleEn: "Material Requirements Planning",
    confidence: 86, hierarchyMatch: "high", reviewed: true,
    summary: "פרק MRP קרוב-לבנצ'מרק: היררכיה משקפת נאמנה TOC מבולגן (כותרות-כפולות, קינון scrap/safety-stock מגושם) עם re-title קוהרנטי; tcodes ושדות-אב מדויקים (OMI4/OMIA, MD01N/02/04/05, DISMM/DISLS/MINBE/EISBE). פגמים: D1/D2 כ-MRP types לא-סטנדרטיים; שני קישורים שבורים (MVER/T449L); F1422 חוזר 24×; MRP Live דק.",
    sapObjectIssues: [
      { node: "13.2.6", value: "D1/D2", problem: "מוצגים כ-time-phased MRP types; המפתחות הסטנדרטיים R1/R2. לא-סטנדרטי.", severity: "med" },
      { node: "רבים", value: "F1422", problem: "חוזר 24× כ-Fiori גנרי על lot-sizing/scrap/safety-stock/ABC.", severity: "med" },
      { node: "13.2.6", value: "R1/R2", problem: "מסומנים forecast/reorder — פישוט-יתר מול הגדרות SAP.", severity: "low" },
    ],
    crossLinkIssues: [
      { node: "13.3", value: "MVER", problem: "עמוד-אובייקט לא במאגר → 404.", severity: "high" },
      { node: "13.5", value: "T449L", problem: "עמוד-אובייקט לא במאגר → 404.", severity: "high" },
    ],
    hierarchyIssues: ["כותרות TOC כפולות (13.5/13.7/13.9) קיבלו כותרות-משנה ברורות; קינון scrap/safety-stock מהמקור נשמר אך מגושם."],
    terminologyIssues: [], cbcIssues: [],
    missingContent: ["MRP Live פנימי דק; MDKP/MDTB לא-מוסברות; הבחנת MD04↔MD05 מופיעה רק בראיון."],
  },
  {
    n: 14, titleHe: "חידוש מונחה-ביקוש (DDMRP)", titleEn: "Demand-Driven Replenishment",
    confidence: 80, hierarchyMatch: "medium", reviewed: true,
    summary: "פרק שלם עם טרמינולוגיית DDMRP מדויקת (decoupling, ADU, DLT, אזורי red/yellow/green, Net Flow/NFE) ומתמטיקת-buffer נכונה. החולשה המרכזית — שכבת ה-Fiori/Customizing: מיפויי app-ID שגויים/הפוכים (F2102 מסומן Replenishment Planning; F3223/F2228/F2229/F2230 לא תואמים אפליקציות DDMRP מתועדות — הנכונות F2392/F2424/F3147/F2393), ו-T457D/OMDD נראים מומצאים (קונפיגורציית DD היא IMG/Fiori). Hierarchy=medium (re-nest של TOC שטוח).",
    sapObjectIssues: [
      { node: "14.x", value: "F2102", problem: "F2102='Mass Maintenance of Products (DD)' אך מסומן 'Replenishment Planning' — מיפוי הפוך/שגוי על צמתים רבים.", severity: "high" },
      { node: "14.x", value: "F3223", problem: "ממופה ל-Replenishment Execution; אינו תואם את אפליקציית DDMRP (הנכונה F2424).", severity: "high" },
      { node: "14.x", value: "F2228/F2229/F2230", problem: "Buffer Positioning/Manage/Mass — IDs לא-מתועדים; הנכונים ~F3147/F2393.", severity: "high" },
      { node: "14.x", value: "OMDD", problem: "מוצג כ-tcode SPRO ל-Buffer Profiles; קונפיגורציית DD היא IMG/Fiori — כנראה מומצא.", severity: "high" },
      { node: "14.x", value: "T457D", problem: "מוצגת כטבלת Buffer Profile; נתוני DD יושבים ב-PPH_DD_* — כנראה מומצאת.", severity: "high" },
    ],
    crossLinkIssues: [
      { node: "14.x", value: "anchors ch13/ch03", problem: "קישורים מניחים קיום עוגני #sub — לאמת שהיעדים נפתרים.", severity: "low" },
    ],
    hierarchyIssues: ["TOC שטוח 14.1–14.18 קונן מחדש (14.10↗14.9, 14.12/13↗14.11, 14.15-18↗14.14) — מוצהר ככוונה אך חורג מסדר-המקור."],
    terminologyIssues: [], cbcIssues: [],
    missingContent: ["מומלץ לאמת את כל מזהי ה-Fiori של DD מול SAP Fiori Apps Reference Library."],
  },
  {
    n: 15, titleHe: "תכנון חומרים ומשאבים חיזויי (pMRP)", titleEn: "Predictive Material & Resource Planning",
    confidence: 88, hierarchyMatch: "high", reviewed: true,
    summary: "כל 25 צמתי TOC '15' נוכחים, מקובצים מחדש קוהרנטית (Scheduling/Processing/Releasing), tcodes מבוססי-app נכון (רוב '—'). שתי האפליקציות המרכזיות (Schedule/Process pMRP Simulation) מדויקות. פגם-דיוק עיקרי: שמות-הטבלאות PMRP_* אינם אמיתיים (צ\"ל PPH_PMRP_*), באופן שיטתי; 'Manage pMRP Simulations' לא-מאומת.",
    sapObjectIssues: [
      { node: "כל הצמתים", value: "PMRP_*", problem: "טבלאות pMRP אמיתיות במרחב-שמות PPH_PMRP_* (PPH_PMRP_SIM/OBJ/CAP); השמות הקצרים מומצאים — שגיאה שיטתית.", severity: "med" },
      { node: "15.1/15.7", value: "Manage pMRP Simulations", problem: "האפליקציות המאומתות הן Schedule/Process; 'Manage' לא-מאומתת.", severity: "low" },
    ],
    crossLinkIssues: [
      { node: "15.7/15.24", value: "#sub-3.3", problem: "מקשר קיבולת ל-3.3 ('Allowed Material Types in BOM Header') — אי-התאמת-נושא קלה.", severity: "low" },
    ],
    hierarchyIssues: ["TOC שטוח 15.1–15.25 קובץ לעצי Scheduling/Processing/Releasing (מתועד, כל 25 נוכחים)."],
    terminologyIssues: [], cbcIssues: [],
    missingContent: ["הבחנת top-down/flexible-constraint (15.25) דקה."],
  },
];
