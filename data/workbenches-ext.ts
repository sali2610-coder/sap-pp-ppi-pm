import type { Workbench } from "./workbenches";

// QM / PM-Advanced / PP-PI-Advanced workbenches — drafted by sc4sap consultant
// agents (sap-qm-consultant, sap-pm-consultant, sap-pp-consultant), curated.
// incidents[] wired to verified slugs in data/troubleshooting(-ext).ts.

const QM: Workbench = {
  slug: "qm",
  module: "QM",
  he: "מרכז QM — שולחן עבודה",
  title: "Quality Management Workbench",
  accent: "#0d9488",
  intro: "שולחן עבודה ליועץ QM ב־ECC6 EHP7 עם דגשי S/4HANA. מכסה את מחזור החיים של inspection lot (יצירה → רישום תוצאות → usage decision → פקודת מלאי), MIC ו־inspection plan, נהלי דגימה, quality notifications, quality info record ברכש, ותעודות איכות (CoA). בהקשר CBC: בקרת קבלה לקונצנטרט וחומרי גלם, בקרה תוך־תהליכית בקו המילוי, שחרור אצוות לייצור ולחלוקה.",
  concepts: [
    { term: "Inspection Lot", he: "מנת בדיקה", desc: "ישות מרכזית בטבלת QALS המייצגת אירוע בדיקה בודד — נוצרת אוטומטית מ־GR (סוג 01), מפקודת ייצור (03/04), ממסירה (10) או ידנית ב־QA01. כל פעולות הבדיקה, התוצאות וה־usage decision תלויות בה." },
    { term: "Master Inspection Characteristic (MIC)", he: "מאפיין בדיקה ראשי", desc: "מוגדר ב־QS21/QS22, מאוחסן ב־QPMK. מאפיין כמותי (עם גבולות מפרט) או איכותי (עם selected set מקטלוג). משויך ל־inspection plan ב־QP01 ומשמש לרישום תוצאות." },
    { term: "Inspection Plan", he: "תכנית בדיקה", desc: "task list מסוג Q המוגדר ב־QP01, שומר ב־PLKO (header) ו־PLPO (פעולות). מקשר MICs לפעולות, מגדיר נהלי דגימה ושימוש בעבודה. שיוך לחומר/צמח דרך MAPL." },
    { term: "Sampling Procedure", he: "נוהל דגימה", desc: "מוגדר ב־QDV1, קובע איך נקבעת כמות הדגימה (קבועה, אחוזית, לפי AQL/תוכנית דגימה). יכול להיות מקושר ל־dynamic modification rule להחמרה/הקלה לפי היסטוריית איכות." },
    { term: "Usage Decision (UD)", he: "החלטת שימוש", desc: "החלטה סופית על ה־lot (קבלה/דחייה/קבלה בתנאי) הנרשמת ב־QAVE עם קוד מקטלוג 3. ה־UD מפעילה stock posting אוטומטי ל־unrestricted/blocked/scrap דרך MM-IM וקובעת batch status." },
    { term: "Quality Notification", he: "הודעת איכות", desc: "מתועדת ב־QMEL עם פריטים QMFE וסיבות. סוגים: Q1 (תלונת לקוח), Q2 (תלונת ספק), Q3 (פנימית). מטופלת ב־QM01/QM02, מתחברת ל־workflow ופעולות מתקנות." },
    { term: "Quality Info Record (QIR) ברכש", he: "רשומת מידע איכות ברכש", desc: "מוגדרת ב־QI01, שומרת ב־QINF. מקשרת ספק־חומר־צמח וקובעת אם ניתן להזמין/לקבל, כולל release status ושיוך לתעודת איכות נדרשת." }
  ],
  architecture: [
    "שכבת master data: QPMK (MIC), PLKO/PLPO/MAPL (inspection plan), QDV1 (sampling), QPCD/QPGR (קטלוגים), QINF (QIR ברכש).",
    "שכבת תפעול: QALS (lot header) → QASE (פעולות) → QAMV (מאפיינים בפועל) → QAMR/QASR (תוצאות יחיד/סיכום) → QAVE (usage decision).",
    "אינטגרציה MM-IM: יצירת lot מ־MIGO/MB01 לתנועה 101, ה־UD מבצעת 321/322/333 אוטומטית; מלאי ב־QM inspection stock עד החלטה.",
    "אינטגרציה PP/PP-PI: סוג בדיקה 03 על פקודת ייצור (AFKO/AFPO) או process order; In-process results recording דרך QE51N לפעולות ייצור.",
    "אינטגרציה SD: סוג בדיקה 10 על delivery, תעודת איכות (Certificate of Analysis) מופקת ב־QC21/QC22 לפי certificate profile (QC01)."
  ],
  processFlow: [
    { step: "1. הפעלת בדיקה לחומר", detail: "ב־MM02 view ׳Quality Management׳ מוגדר QM control key ו־inspection type פעיל (01/03/04/10). ללא הגדרה זו לא ייווצר lot." },
    { step: "2. יצירת inspection lot", detail: "GR ב־MIGO יוצר אוטומטית lot ב־QALS עם סוג בדיקה ומקור הפעולה (MB record); ניתן גם ידנית ב־QA01. סטטוס REL/CRTD מוצב לפי קיום תכנית." },
    { step: "3. שיוך תכנית ודגימה", detail: "QA02 מבצע task list assignment (MAPL) וחישוב sample size לפי QDV1; פעולות נפתחות ב־QASE עם רשימת MICs לרישום." },
    { step: "4. רישום תוצאות", detail: "ב־QE51N/QE01 מוזנים measured values ב־QAMV/QAMR; valuation אוטומטית מול מפרט (accept/reject לכל מאפיין). פגמים נרשמים ב־QF11." },
    { step: "5. Usage Decision", detail: "QA11/QA32 — בחירת UD code מקטלוג 3, נרשם ב־QAVE; המערכת מפעילה stock posting (321 ל־unrestricted, 322 ל־blocked, 333 ל־scrap) ומעדכנת batch status." },
    { step: "6. סגירה ודיווח", detail: "lot עובר ל־status UD/SPCO/STUP; quality score מחושב ומועבר לעדכון QIR ול־vendor evaluation (ME6H). תעודת CoA נשלחת ללקוח דרך QC22/output." }
  ],
  tables: [
    { name: "QALS", desc: "Inspection lot header — שורה לכל lot עם סוג בדיקה, חומר/אצווה/צמח, מקור (MB), סטטוס מצטבר ושדות quantities." },
    { name: "QAVE", desc: "Usage decision — UD code, תאריך, מבצע, quality score ופירוט stock postings שנגזרו." },
    { name: "QASE", desc: "Inspection operations — פעולות הבדיקה הפתוחות ב־lot, מקושרות ל־PLPO של ה־task list." },
    { name: "QAMV", desc: "Characteristic specifications per lot — מפרט המאפיין כפי שהועתק ל־lot (גבולות, יחידה, נוהל דגימה בפועל)." },
    { name: "QAMR / QASR", desc: "Single results / summarized results — ערכים נמדדים בפועל לכל דגימה ולסיכום ה־MIC." },
    { name: "QPMK", desc: "Master inspection characteristic — הגדרת MIC ראשי (QS21), כולל סוג כמותי/איכותי, גבולות וקטלוגים." },
    { name: "PLKO / PLPO / MAPL", desc: "Inspection plan header / operations / material-to-task-list — שמורים יחד עם routings ב־infrastructure של task lists." },
    { name: "QDV1 / QDPA", desc: "Sampling procedure / Sampling plan — נהלי דגימה ושיוך לתוכניות AQL." },
    { name: "QMEL / QMFE", desc: "Quality notification header / items — תלונות איכות (Q1/Q2/Q3) ופירוט פגמים וסיבות." }
  ],
  transactions: [
    "QA01", "QA02", "QA03", "QA11", "QA32", "QA08",
    "QE51N", "QE01", "QE02", "QE03",
    "QS21", "QS22", "QS23", "QS41",
    "QP01", "QP02", "QP03",
    "QM01", "QM02", "QM03",
    "QC01", "QC02", "QC21", "QC22",
    "QI01", "QI02", "QI03",
    "QGA1", "QGA2", "MCXA"
  ],
  functionModules: [
    { name: "BAPI_INSPLOT_GETDETAIL", tag: "READ-ONLY", desc: "שליפת header ופרטי inspection lot מ־QALS — מתאים לדוחות ולמסכי תצוגה ללא סיכון עדכון." },
    { name: "BAPI_INSPOPER_RECORDRESULTS", tag: "verify SE37", desc: "רישום תוצאות ל־MIC בפעולה — לוודא שם מדויק ב־SE37 לפני שימוש; כותב ל־QAMR/QAMV ויכול לסגור פעולה." },
    { name: "BAPI_INSPLOT_SETUSAGEDECISION", tag: "UPDATE-RISKY", desc: "ביצוע UD תוכניתית — מפעיל stock posting דרך MM-IM ב־update task ומשנה סטטוס מלאי; חובה COMMIT WORK והבנת השלכות על batch." },
    { name: "QAPP_CUST_IAC", tag: "verify SE37", desc: "קריאה/עזר לקבלת customizing של inspection types — לאמת קיום מדויק לפי release לפני הסתמכות." }
  ],
  badis: [
    { name: "QPL1_SUBSCREEN_AND_TAB", tag: "verify SE18", desc: "הוספת subscreen/tab למסכי inspection lot (QA01/QA02/QA03) להצגת שדות לקוח — לאמת קיום מדויק ב־SE18 לפני ייעוץ." },
    { name: "QEEM_BADI_RESB_OUT", tag: "verify SE18", desc: "השפעה על results recording — לאמת ב־SE18; שימוש להזרקת ולידציות לפני שמירת ערכים." },
    { name: "QQMA_SUBSCREEN_ADD", tag: "verify SE18", desc: "הרחבת מסכי quality notification (QM01/QM02) ב־subscreens — לאמת קיום ב־SE18." },
    { name: "QSS0_SAMPLE_CALC", tag: "verify SE18", desc: "התאמת חישוב sample size בנוהל דגימה — לאמת ב־SE18 לפני התחייבות, נדרש בעיקר במקרים סטטיסטיים מיוחדים." }
  ],
  userExits: [
    { name: "QAAT0001", tag: "verify SE37", desc: "Customer-specific fields ב־inspection lot — להרחבת QALS בלקוחות ותיקים; לאמת קיום ב־CMOD/SMOD לפני שימוש." },
    { name: "QEVA0001", tag: "verify SE37", desc: "Usage decision — לוגיקה נוספת בעת ביצוע UD (למשל ערכי ברירת מחדל לפי batch). לאמת ב־SMOD." },
    { name: "QQMA0014", tag: "verify SE37", desc: "Quality notification — בדיקות לפני שמירה / השלמת שדות. לאמת ב־SMOD שהמספור והשם תואמים את ה־release." },
    { name: "QPL10003", tag: "verify SE37", desc: "Inspection lot creation — manipulation בעת יצירת lot (default sampling, status). לאמת ב־SMOD." }
  ],
  incidents: ["qm-insp-lot-not-created-on-gr", "qm-results-recording-rejected-sampling", "qm-usage-decision-blocked-open-results", "qm-inprocess-results-missing", "qm-procurement-blocks-gr-or-invoice", "char-batch-classification-missing"],
  debugEntry: [
    "Tier 1 — read-only: QA03 לבדיקת lot, QA32 worklist, SE16N על QALS/QAVE/QAMR לאיתור הערכים בפועל; לא דורש שינוי מערכת.",
    "Tier 1 — מוניטור הודעות: SLG1 (object QM) ו־SM13 לאיתור update tasks תקועים של UD שלא בוצעו עד הסוף.",
    "Tier 2 — trace: ST05 (SQL trace) על תרחיש QE51N/QA11 כדי לאתר reads/writes; ST22 ל־short dumps; SM21 לבעיות system-wide.",
    "Tier 2 — תצורה: SPRO → Quality Management → Inspection Lot Creation ו־Inspection Types לוודא שהגדרת ה־inspection type ב־MM matches את הציפייה.",
    "Tier 3 — breakpoints: רק לאחר מיצוי השלבים מעל, להציב break-point ב־BAPI_INSPLOT_SETUSAGEDECISION ובפונקציות update; זהירות כי UD מבצע update-task ל־MM-IM ויכול להשאיר מלאי תקוע.",
    "Tier 3 — בידוד אצווה: לפני debug על production, להעתיק lot ל־QA01 בסביבת בדיקה ולוודא שמלאי ה־blocked לא יישאר ב־production."
  ],
  eccS4: [
    { ecc: "ב־ECC6 EHP7 רישום תוצאות מתבצע ב־SAP GUI דרך QE51N עם מסכי dynpro קלאסיים; UD ב־QA11 dialog-only.", s4: "ב־S/4HANA נוספו Fiori apps כגון ׳Record Inspection Results׳ ו־׳My Inspection Lots׳ לעבודה מהשטח/מובייל; ה־GUI הקלאסי נשמר במקביל. לאמת קוד app מדויק לפי release." },
    { ecc: "ECC משתמש ב־MM-IM קלאסי (MKPF/MSEG) ל־stock postings מתוך UD לתנועות 321/322/333.", s4: "ב־S/4HANA ה־postings נכתבים ל־Material Ledger document MATDOC ול־ACDOCA במקביל; הלוגיקה של UD זהה אך טבלאות הצפייה שונות — להפנות שאילתות מ־MSEG ל־MATDOC." },
    { ecc: "Batch determination ו־ATP ב־ECC נסמכים על אצוות עם status שמושפע מ־UD דרך MCH1/MCHA.", s4: "ב־S/4HANA aATP (advanced ATP) שוקל batch restrictions; שילוב QM-Batch נשמר, אך לאמת התנהגות backorder processing מול batch status שעודכן על ידי UD." },
    { ecc: "QM משתמש ב־classification (CLMS) להעברת תוצאות לאצווה דרך characteristics.", s4: "ההתנהגות נשמרת ב־S/4; ה־simplification של QM יחסית מתון — אין הסרת פונקציונליות מרכזית ידועה, אך לאמת SAP Note ספציפי לפני התחייבות על delta נוסף." }
  ],
  cbc: [
    "בקרת קבלה לקונצנטרט וחומרי גלם (סוכר, CO2, תוויות): inspection type 01 על GR מספק; MIC קריטי כולל Brix, pH, microbiological count; UD שמשחרר ל־unrestricted מאפשר שימוש בקו המילוי, blocked מחזיק עד ל־retest.",
    "בקרה תוך־תהליכית בקו המילוי: סוג בדיקה 03 על process order PP-PI; QE51N לתחנת איכות עם MICs של נפח מילוי, fill height, CO2 volumes, seal integrity — תוצאות נכשלות מפעילות quality notification Q3 פנימית.",
    "שחרור אצוות וחתימה רגולטורית: UD ב־QA11 על האצווה הסופית מעדכן batch status ל־released, מאפשר picking ב־SD לחלוקה; Certificate of Analysis מ־QC22 נשלח ללקוחות מוסדיים (רשתות, HoReCa) כחלק מ־output determination."
  ]
};

const PM: Workbench = {
  slug: "pm-advanced",
  module: "PM",
  he: "מרכז PM מתקדם — שולחן עבודה",
  title: "Plant Maintenance Advanced Workbench",
  accent: "#f97316",
  intro: "שולחן עבודה מתקדם ליועץ PM: היררכיית מיקומים טכניים וציוד עם פלחי זמן ב־EQUZ, זרימה מלאה הודעה→הזמנה→דיווח→סילוק→TECO, תכנון מתחזוקה מונעת (IP10/IP30), נקודות מדידה ומוני קריאה, ניהול סטטוסים מערכת ומשתמש (JEST/objnr) ושילוב מלא ל־MM/CO. דגש על אבחון Read-Only לפני שינוי, ועל הבדלי ECC6 EHP7 מול S/4HANA EAM/Fiori.",
  concepts: [
    { term: "Functional Location", he: "מיקום טכני", desc: "מבנה היררכי המייצג את אתר המפעל (שורש→קו ייצור→מכונה). מאוחסן ב־IFLOT עם תיאורים ב־IFLOTX, וכולל מבנה תווית (TPLKZ) המגדיר רמות. משמש כעוגן יציב לציוד מתחלף." },
    { term: "Equipment & Install/Dismantle", he: "ציוד והתקנה/פירוק", desc: "אובייקט פיזי (EQUI) המותקן במיקום טכני. כל מעבר מקום או שינוי שדה היררכי יוצר רשומת EQUZ חדשה עם DATBI/DATAB — פלחי זמן המאפשרים שחזור היסטוריה." },
    { term: "Notification → Order → Confirmation", he: "הודעה ← הזמנה ← דיווח", desc: "QMEL (הודעה) מתעדת תקלה/בקשה; ממנה נפתחת הזמנת תחזוקה (AUFK+AFIH) עם פעולות (AFVC) ורכיבים (RESB); IW41 מבצעת דיווח שעות וצריכה; TECO סוגרת טכנית; סילוק העלויות עובר למרכז עלות/נכס." },
    { term: "Maintenance Plan & Strategy", he: "תכנית תחזוקה ואסטרטגיה", desc: "MPLA = ראש תכנית; MPOS = פריט (קישור לאובייקט+TaskList); תכנית מחזור יחיד (Single Cycle) מול אסטרטגיה (Strategy Plan) עם MMPT/חבילות. IP10 מתזמן, IP30 מבצע ניטור Deadline ברקע ומשחרר קריאות (Calls)." },
    { term: "Measuring Point & Document", he: "נקודת מדידה ומסמך מדידה", desc: "IMPTT/IMRG: נקודת מדידה (Counter/Measure) על אובייקט טכני; מסמכי מדידה (IK11) מזינים תכניות מבוססות ביצועים (Performance-Based), ומפעילים קריאת תחזוקה בהגעה ליעד." },
    { term: "Status Management", he: "ניהול סטטוסים", desc: "כל אובייקט PM נושא objnr; JEST מחזיק סטטוסי מערכת (CRTD/REL/TECO/CLSD) וסטטוסים אישיים (לפי טבלת User Status פרופיל). שאילתת JEST + TJ02T קריטית לאבחון מדוע פעולה חסומה." }
  ],
  architecture: [
    "שכבת אובייקטים טכניים: IFLOT (FuncLoc) ↔ EQUI/EQUZ (Equipment עם פלחי זמן) ↔ ILOA (נתוני מיקום משותפים: מרכז עלות, מפעל תכנון, ABCKZ).",
    "שכבת תחזוקה שוטפת: QMEL (הודעה) → AUFK+AFIH (הזמנת PM) → AFVC/AFVV (פעולות וזמנים) → RESB (רכיבים) → AFRU (דיווחים).",
    "שכבת תכנון מונע: MPLA (תכנית) → MPOS (פריט) → MMPT (חבילות מחזור) → MHIS (היסטוריית קריאות) ↔ PLKO/PLPO (רשימת משימות).",
    "שכבת מדידה ומבנה: IMPTT/IMRG (נקודות ומסמכי מדידה), OBJK (רשימת אובייקטים בהזמנה/הודעה), IHPA (שותפים).",
    "אינטגרציה: CO (סילוק להזמנה→מרכז עלות AUFK/COEP), MM (RESB→הזמנת רכש/יציאת מלאי), HR (CRHD מרכזי עבודה), FI (נכסים קבועים ANLA דרך EQUI-ANLNR)."
  ],
  processFlow: [
    { step: "1. תקלה בשטח", detail: "טכנאי או אופרטור פותח הודעה (IW21) מסוג M2 (תקלה); בוחר ציוד/FuncLoc, קודי תקלה (Catalog) מ־QPCT/QPGT, ומקצה לקבוצת מתכננים." },
    { step: "2. תכנון העבודה", detail: "מתכנן פותח הזמנת תחזוקה (IW31 או המרה ישירה IW22→IW31) מסוג PM01/PM02, משייך TaskList (PLKO), פעולות (AFVC), רכיבים (RESB) ו־PRT." },
    { step: "3. שחרור והדפסה", detail: "סטטוס REL ב־JEST, בדיקת זמינות חומרים (Availability Check), הקצאת אישור עבודה (Permit) במידת הצורך, הדפסת Shop Papers (IW3D)." },
    { step: "4. ביצוע ודיווח", detail: "טכנאי מדווח שעות וצריכה ב־IW41 או IW42; AFRU נוצר; RESB מתממש ליציאת מלאי 261; ניתן להזין מסמכי מדידה (IK11) שמעדכנים תכניות מבוססות ביצועים." },
    { step: "5. סגירה טכנית (TECO)", detail: "סטטוס TECO ב־JEST חוסם דיווחי שעות נוספים, סוגר יתרות פתוחות של RESB, ומעביר את ההזמנה לסילוק." },
    { step: "6. סילוק וסגירה עסקית", detail: "KO88/CJ88 מבצעים Settlement → COEP/COSS לפי כלל סילוק (Settlement Rule) למרכז עלות/נכס; סטטוס CLSD נועל את ההזמנה; חישוב KPIs ב־PMIS (MCI*)." }
  ],
  tables: [
    { name: "EQUI", desc: "Equipment master — נתוני שורש (EQUNR, EQTYP, ANLNR, MATNR, SERNR, BEGRU)." },
    { name: "EQUZ", desc: "Equipment time-segment — פלח זמן (DATBI/DATAB) עם המיקום הטכני הנוכחי (TPLNR), מרכז עבודה ומחלקת אחריות; היסטוריית התקנה/פירוק." },
    { name: "EQKT", desc: "Equipment short texts — תיאורים תלויי שפה ל־EQUI (KTX)." },
    { name: "IFLOT", desc: "Functional Location master — מפתח TPLNR, מבנה תווית TPLKZ, קטגוריה FLTYP, אב TPLMA (היררכיה)." },
    { name: "IFLOTX", desc: "Functional Location short texts — PLTXT/PLTXU בשפות שונות." },
    { name: "ILOA", desc: "Location/Account assignment — נתוני מיקום וחשבונאות משותפים (KOSTL, SWERK, INGRP, ABCKZ); מקושרת מ־EQUI/IFLOT/AUFK דרך ILOAN." },
    { name: "AFIH", desc: "PM Order header extension — מרחיב את AUFK בשדות EQUNR, TPLNR, QMNUM, ILART (סוג פעילות), PRIOK; ההצטלבות הקלאסית לפילוח דוחות תחזוקה." },
    { name: "AUFK", desc: "Order master — ראש הזמנה כללי (AUFNR, AUTYP=30 ל־PM, AUART, WERKS, OBJNR לסטטוסים)." },
    { name: "QMEL", desc: "Notification header — QMNUM, QMART, EQUNR/TPLNR, QMDAT, FECOD/URCOD; חוצה PM/QM (VIQMEL = view)." },
    { name: "QMFE / QMUR", desc: "Notification items / causes — קודי תקלה (FECOD) וסיבות (URCOD) ברמת פריט הודעה; משמשים לניתוח Pareto." },
    { name: "OBJK", desc: "Object list — אובייקטים נוספים (ציוד/SERNR/MATNR) המקושרים להזמנה או הודעה (RIWO00)." },
    { name: "IHPA", desc: "Partners — מקושרת ל־ILOAN/OBJNR; מחזיקה שותפים (מבקש, אחראי טכני, ספק)." },
    { name: "MPLA / MPOS / MMPT", desc: "Maintenance plan / item / cycle — תכנית, פריט (קישור TaskList ואובייקט), חבילות מחזור (כל 30/90/180 יום)." },
    { name: "MHIS", desc: "Maintenance plan call history — תיעוד כל קריאה שיצרה IP30, מועדי תכנון מול ביצוע; קריטית לאיזון מחזורים." },
    { name: "JEST / TJ02T", desc: "Object status — JEST(OBJNR, STAT, INACT) מחזיק סטטוסים פעילים; TJ02T = טקסטים. בלי קריאה ל־JEST אי אפשר להסביר מדוע IW32 חסם פעולה." }
  ],
  transactions: [
    "IE01", "IE02", "IE03",
    "IL01", "IL02", "IL03",
    "IH01", "IH06", "IH08",
    "IW21", "IW22", "IW23", "IW28", "IW29",
    "IW31", "IW32", "IW33", "IW38", "IW39",
    "IW41", "IW42", "IW3D", "IW8W",
    "IP01", "IP02", "IP03", "IP10", "IP30",
    "IK01", "IK11", "IB01",
    "KO88", "MCI3"
  ],
  functionModules: [
    { name: "BAPI_EQUI_GETDETAIL", tag: "READ-ONLY", desc: "מחזיר נתוני ציוד מלאים (EQUI, EQUZ נוכחי, IFLOT דרך ILOA). נקודת כניסה בטוחה לאבחון לפני שינוי." },
    { name: "BAPI_ALM_NOTIF_GET_DETAIL", tag: "READ-ONLY", desc: "שולף ראש הודעה (QMEL), פריטים (QMFE), פעילויות (QMSM) ושותפים — שימושי לבדיקה מדוע הודעה לא הומרה להזמנה." },
    { name: "BAPI_ALM_ORDER_GET_DETAIL", tag: "READ-ONLY", desc: "מחזיר הזמנה: AUFK+AFIH, פעולות, רכיבים, סטטוסים, רשימת אובייקטים. השווה תוצאה ל־IW33 לפני קריאה ל־MAINTAIN." },
    { name: "BAPI_ALM_ORDER_MAINTAIN", tag: "UPDATE-RISKY", desc: "ה־BAPI הראשי לעדכון הזמנת PM (כותרת/פעולות/רכיבים/שותפים/סטטוסי משתמש). דורש BAPI_TRANSACTION_COMMIT, ויש לטפל בטבלת RETURN לפני commit; פעלו בשרשרת METHOD נכונה (CREATE→ADD→SAVE)." }
  ],
  badis: [
    { name: "IEQM0001", tag: "verify SE18", desc: "BAdI לבדיקת/הרחבת נתוני ציוד ב־IE01/IE02 — לאמת שם מדויק בלקוח לפני שימוש; לעיתים פתרון העדפה ל־CMOD מקביל." },
    { name: "NOTIF_EVENT_SAVE", tag: "verify SE18", desc: "BAdI לאירוע שמירת הודעת תחזוקה — מאפשר בקרות/השלמת שדות לפני COMMIT; בדקו filter לפי QMART." },
    { name: "WORKORDER_UPDATE", tag: "verify SE18", desc: "BAdI לאירועי הזמנת תחזוקה (BEFORE_UPDATE / AT_SAVE / IN_UPDATE) — שימושי לחישוב שדות Z או חסימת שמירה; שימו לב לעבודה במצב Update Task." },
    { name: "EXTENSION_US_TASKLIST", tag: "verify SE18", desc: "BAdI להרחבת רשימות משימות (PLKO/PLPO) במסכי IA01/IA05 — לאמת שם וקיום ב־EHP7." }
  ],
  userExits: [
    { name: "IWO10009", desc: "User exit Order: בדיקות לפני שמירת הזמנת PM (PBO/PAI על שדות כותרת); קלאסי לכפיית מילוי שדות Z." },
    { name: "IWO10016", desc: "User exit Order: השפעה על הקצאת מספר/קביעת ערכי ברירת מחדל בעת יצירת הזמנה (IW31)." },
    { name: "IWO10018", desc: "User exit Order: בדיקות בעת שחרור (REL) — חסימה אם תנאים עסקיים לא מתקיימים." },
    { name: "QQMA0001", tag: "verify SE37", desc: "User exit Notification: PBO/PAI על מסכי IW21/IW22 — לאימות שם פרויקט CMOD בלקוח." },
    { name: "QQMA0014", tag: "verify SE37", desc: "User exit Notification: השפעה על שמירה ועדכון של ראש הודעה; לוודא קיום ב־EHP7 לפני התחייבות בפרויקט." }
  ],
  incidents: ["equipment-not-in-order", "funcloc-status-block", "equipment-install-history-wrong", "maint-plan-no-call-horizon", "measuring-counter-cannot-decrease", "teco-blocked"],
  debugEntry: [
    "שלב 0 — Read-Only: IW33 על מספר ההזמנה, IE03 על הציוד, IW53 על ההודעה. רשמו AUFNR/EQUNR/QMNUM ו־OBJNR לשימוש בהמשך.",
    "שלב 1 — Status check: SE16 על JEST עם OBJNR (INACT ריק) + TJ02T לפענוח. אם רואים סטטוס TECO/LKD/CLSD — זה ההסבר לרוב החסימות.",
    "שלב 2 — Time-segment check: SE16 על EQUZ לפי EQUNR ובדיקת DATBI=99991231 לפלח הנוכחי; אי־התאמה למיקום הצפוי = תקלת התקנה/פירוק.",
    "שלב 3 — ST05 Trace על IW32/IW41: זהו את ה־UPDATE על AFVV/AFRU/RESB ואת קריאות ה־BAPI; כך מאתרים Exit/BAdI לקוחי שעוצרים שמירה.",
    "שלב 4 — Breakpoints מבוקרים: SE37 על BAPI_ALM_ORDER_MAINTAIN ועל פונקציות עדכון IWO1*; IW41 פועלת ב־Update Task — להפעיל ׳Update Debugging׳ ב־/h.",
    "שלב 5 — Settlement & FI/CO: SE16 על COEP/COBK עם AUFNR, ו־AUFK-OBJNR לחיפוש מקור; אם הסילוק נכשל — KO88 בסימולציה לבדיקת כלל סילוק ב־COBRA/COBRB."
  ],
  eccS4: [
    { ecc: "טרנזקציות GUI קלאסיות (IW31/IW32/IW33, IL01, IE01) הן ממשק העבודה היומיומי של המתכנן והטכנאי.", s4: "S/4HANA EAM מציע אפליקציות Fiori: ׳Manage Maintenance Orders׳, ׳My Maintenance Overview׳, ׳Find Maintenance Notification׳ — ה־GUI נשמר אך אינו הממשק המומלץ; דורש Embedded Analytics CDS." },
    { ecc: "מבנה הטבלאות הליבתי (EQUI/EQUZ/IFLOT/AFIH/QMEL) יציב ולא עבר Simplification מהותי.", s4: "הליבה נשארת זהה ב־S/4 (PM=EAM core stable); השינוי המרכזי הוא בשכבת ה־UX והאנליטיקה (CDS Views כגון I_MaintenanceOrder) ולא בסכימה." },
    { ecc: "סילוק הזמנת PM ל־CO מבוסס Settlement Rule ב־COBRA/COBRB עם הרצת KO88 ורישומי COEP מקבילים ל־BSEG.", s4: "Universal Journal (ACDOCA) מאחד CO+FI; הסילוק עדיין רץ אך הרישום מתרכז ב־ACDOCA; טבלאות COEP/COSS נשמרות כתאימות — verify behavior של דוחות Z שמסתמכים עליהן." },
    { ecc: "אפליקציות מובייל מבוססות SAP Work Manager / Syclo עם מתאם middleware.", s4: "Fiori-based Asset Manager ו־׳My Maintenance Tasks׳ מתחברים ישירות ל־OData; ארכיטקטורת מובייל חדשה — verify לפי גרסת S/4 ספציפית." }
  ],
  cbc: [
    "מבנה היררכי לקו מילוי: FuncLoc CBC-IL-ASH-LINE1 → רכיבי ציוד Filler / Capper / Labeller / Conveyor / Palletiser כל אחד EQUI נפרד עם EQUZ פעיל — מאפשר ניתוח MTBF/MTTR לפי תחנה.",
    "תכנית תחזוקה מונעת לקו מילוי: MPLA אסטרטגיה עם חבילות 7/30/180 יום (ניקוי, החלפת אטמים, כיול ראשי מילוי), IP30 רץ לילי ומשחרר הזמנות PM02 אוטומטית עם TaskList מאושר.",
    "תרחיש שבר על Labeller באמצע משמרת: אופרטור פותח QMEL מסוג M1 דרך מסך מקוצר, מתכנן ממיר ל־IW31 PM01, מוקצה לטכנאי תורן, דיווח IW41 כולל צריכת חלקי חילוף (RESB→261), TECO וסילוק יומי למרכז עלות של קו 1."
  ]
};

const PPPI: Workbench = {
  slug: "pp-pi-advanced",
  module: "PP-PI",
  he: "מרכז PP-PI מתקדם — שולחן עבודה",
  title: "PP-PI Advanced Workbench",
  accent: "#6d28d9",
  intro: "שולחן עבודה מתקדם ל־PP-PI (ייצור תהליכי): מתכון אב (Master Recipe), גרסת ייצור, הזמנת תהליך, ניהול תהליך עם Control Recipe ו־PI Sheet, דיווחי שלבים, Backflush, קביעת אצוות, מוצרי לוואי, יישוב והעברה ל־FI/CO. ECC6 EHP7+ עם דגשי דלתות ל־S/4HANA.",
  concepts: [
    { term: "Master Recipe", he: "מתכון אב", desc: "תוכנית עבודה לתהליך — PLKO ככותרת ו־PLPO כפעולות/שלבים (Phases). מקושר למשאב (CRHD), כולל קשרים בין שלבים (PLAB) ויחסי כמות (PLMZ). משמש להזמנת תהליך כתחליף ל־Routing הדיסקרטי." },
    { term: "Production Version", he: "גרסת ייצור", desc: "רשומה ב־MKAL המקשרת חומר ↔ מתכון אב ↔ BOM (STKO/STPO). חובה ב־PP-PI כדי שתבחר הזמנת התהליך את שילוב המתכון/BOM הנכון. נשלטת מטרנזקציה C223 או חוצץ Material Master." },
    { term: "Process Order", he: "הזמנת תהליך", desc: "מקבילה של ייצור תהליכי לאזור הדיסקרטי — AFKO (כותרת), AFPO (פריט מוצר), AFVC/AFVV (פעולות/שלבים), RESB (רכיבים). שלביה: יצירה (COR1), שחרור, הורדת Control Recipe, ביצוע ודיווח, TECO ויישוב." },
    { term: "Control Recipe & PI Sheet", he: "מתכון בקרה וגיליון PI", desc: "ב־Release נוצר Control Recipe (CO53) הזורם ל־PI Sheet (CO60). מכיל הוראות עבודה ופרמטרים, מקבל ערכי תהליך מהרצפה, יוצר הודעות תהליך (Process Messages) ומדווח שלבים, צריכות וגדלי אצווה חזרה ל־AFRU." },
    { term: "Batch Determination & Class 023", he: "קביעת אצווה וסיווג", desc: "אצוות (MCH1/MCHA) מסווגות במחלקת סיווג 023 (Batch). ערכי מאפיינים נשמרים ב־AUSP, הקצאת מחלקות ב־KSSK. הזמנת התהליך קובעת אצוות לרכיבים לפי אסטרטגיית חיפוש ומסבירה Shelf Life/Potency." },
    { term: "Backflush & AFFW", he: "צריכה אוטומטית וטבלת כשלים", desc: "דיווח שלב מבצע צריכת רכיבים אוטומטית (Backflush) דרך MM-IM. תנועות שנכשלו (חוסר מלאי, אצווה לא קיימת) נכנסות ל־AFFW ומטופלות ב־COGI / MF47, ללא שבירה של דיווח השלב עצמו." }
  ],
  architecture: [
    "שכבת אב־נתונים: Material Master (תצוגות MRP ו־Work Scheduling), Master Recipe (PLKO/PLPO/PLFL), משאבים (CRHD/CRCO), BOM (MAST/STKO/STPO), Production Version (MKAL), מחלקות סיווג אצווה 023.",
    "שכבת תכנון: ביקוש (PIR), MRP (MD01/MD02) → דרישות תכנון (PLAF) → המרה להזמנת תהליך (COR7/MD04). מקושר ל־aATP/ATP ול־Capacity Planning של המשאב.",
    "שכבת ביצוע: AFKO/AFPO/AFVC/AFVV/RESB → Control Recipe (CO53) → PI Sheet (CO60) → Process Messages (CO54) → AFRU + תנועות חומר MSEG/MKPF.",
    "שכבת אינטגרציה: MM-IM (תנועות 261/101/531 למוצרי לוואי), QM (Inspection Lot על אצווה), WM/EWM (Staging/Putaway), FI/CO (יישוב CO88 → AUFK → סוג זיכוי).",
    "שכבת ניטור ותיקון: COOIS (מאגר הזמנות תהליך), CO53/CO54, COGI/MF47, SLG1 (לוגים יישומיים), SM13 (Update Task) ככלי תיקון ל־Backflush שנכשל."
  ],
  processFlow: [
    { step: "1. תכנון ביקוש ו־MRP", detail: "MD61 (PIR) → MD01/MD02 יוצר הצעות תכנון (PLAF). MD04 לסקירה. לפי גרסת ייצור (MKAL) נבחר שילוב מתכון/BOM." },
    { step: "2. המרת תכנון להזמנת תהליך", detail: "COR7 / MD04 ממיר PLAF ל־Process Order. נוצרים AFKO + AFPO + AFVC/AFVV + RESB. בדיקת זמינות חומרים וקיבולת משאב." },
    { step: "3. שחרור והורדת Control Recipe", detail: "COR2 → Release. יוצר Control Recipe (סטטוס CRCR), מועבר ל־PI Sheet ב־CO53. הדפסת מסמכי ייצור, הזמנות מלאי ל־Staging." },
    { step: "4. ביצוע ב־PI Sheet ודיווח שלבים", detail: "CO60 — המפעיל מבצע פעולות, מזין ערכי תהליך, מאשר שלבים. נוצרות Process Messages → CO54 → COR6N/CORK מעדכן AFRU + תנועות 261 ו־101 דרך Backflush." },
    { step: "5. טיפול בתנועות שנכשלו", detail: "תנועות שנכשלו ב־MM-IM נופלות ל־AFFW ומוצגות ב־COGI / MF47 — תיקון אצווה / מלאי / WBS ו־Repost. דיווח הכמות עצמו (AFRU) נשאר תקף." },
    { step: "6. סגירה, יישוב והעברה ל־FI/CO", detail: "TECO ב־COR2, חישוב שונויות (KKS2/KKS1), יישוב CO88 → AUFK → קולקטור עלויות / חשבון. סגירה סטטיסטית CLSD לאחר ניקוי AFFW ו־COGI." }
  ],
  tables: [
    { name: "PLKO", desc: "כותרת רשימת פעולות / מתכון אב (Group + Group Counter). נושאת סטטוס, סוג task list ובקרות אימות." },
    { name: "PLPO", desc: "פעולות / שלבים (Phases) של מתכון אב. כוללת זמני setup/processing/teardown, סטנדרטים ושיוך משאב CRHD." },
    { name: "MKAL", desc: "גרסת ייצור — מקשרת חומר ↔ מתכון אב (PLKO) ↔ BOM (STKO). נבחרת אוטומטית על ידי MRP / יצירת הזמנת תהליך." },
    { name: "AFKO", desc: "כותרת הזמנת תהליך / ייצור — מספר הזמנה, תאריכי בסיס, סוג הזמנה, סטטוס מערכת/משתמש (JEST/JSTO)." },
    { name: "AFPO", desc: "פריט הזמנה — חומר מוצר, כמות הזמנה, פריט מלאי, מקושר WBS/מוצר לפי הזמנה." },
    { name: "AFVC / AFVV", desc: "פעולות הזמנה (AFVC) וערכי תזמון/כמויות (AFVV). מכיל את השלבים שיתפסו דיווח ב־AFRU." },
    { name: "RESB", desc: "הזמנות לרכיבים — הקלט של ה־BOM כפי שהוקצה להזמנה, כולל אצוות, מקור צריכה ותנועות 261 צפויות." },
    { name: "AFRU", desc: "דיווחי שלבים/פעולות — כמות טובה, פסולת, פעילויות, זמן. הבסיס לעדכון עלות וייצור." },
    { name: "AFFW", desc: "טבלת Failed Goods Movements — תנועות Backflush שנכשלו במהלך דיווח, מקור הצפייה של COGI/MF47." },
    { name: "MCH1 / MCHA / AUSP / KSSK", desc: "אצוות (MCH1 ברמת חומר, MCHA ברמת חומר+מפעל) ונתוני סיווג: AUSP לערכי מאפיינים, KSSK להקצאת מחלקה 023." }
  ],
  transactions: [
    "C201", "C202", "C203",
    "CRC1", "CRC2",
    "CS01", "CS02", "CS03",
    "C223",
    "COR1", "COR2", "COR3", "COR7",
    "COR6N", "CORK",
    "CO53", "CO54", "CO60",
    "COGI", "MF47",
    "MD01", "MD02", "MD04",
    "MB31", "MIGO",
    "COOIS", "KKS2", "CO88"
  ],
  functionModules: [
    { name: "BAPI_PROCORD_GET_DETAIL", tag: "READ-ONLY", desc: "שליפת פרטי הזמנת תהליך (כותרת, פעולות, רכיבים) ב־RFC. בטוח ללוגיקת קריאה ולמסכים חיצוניים." },
    { name: "BAPI_PROCORDCONF_GET_DETAIL", tag: "READ-ONLY", desc: "שליפת דיווחי הזמנת תהליך — מעטפת בטוחה לבדיקת AFRU והודעות תהליך לפני יצירת דיווח חדש." },
    { name: "BAPI_PROCORD_CREATE", tag: "UPDATE-RISKY", desc: "יצירת הזמנת תהליך תכנותית. דורש BAPI_TRANSACTION_COMMIT ובדיקת RETURN; טעות יוצרת הזמנות יתומות עם RESB/AFVC חלקיים." },
    { name: "BAPI_PROCORDCONF_CREATE_TT", tag: "UPDATE-RISKY", desc: "יצירת אישור (Time Ticket) להזמנת תהליך — מעדכן AFRU, מפעיל Backflush ויוצר תנועות חומר. כשל יזרים שורות ל־AFFW; להפעיל רק לאחר Test Mode ובדיקת AFFW נקייה." }
  ],
  badis: [
    { name: "WORKORDER_UPDATE", tag: "verify SE18", desc: "BAdI מרכזי לעדכון הזמנת ייצור/תהליך (יצירה, שחרור, שמירה). שימוש להוספת בדיקות עסקיות לפני שמירת AFKO/AFPO." },
    { name: "WORKORDER_GOODSMVT", tag: "verify SE18", desc: "BAdI ליירוט תנועות חומר מתוך דיווח הזמנת תהליך (Backflush, GR). מאפשר השפעה על מפתחי תנועה ותעודות." },
    { name: "CONFPI_UPDATE_01", tag: "verify SE18", desc: "BAdI הקשור לעיבוד דיווחי PP-PI — וולידציות בעת CO53/CO60/CORK. לאמת קיום בלקוח לפני שימוש." },
    { name: "CO_PROD_VERSIONS", tag: "verify SE18", desc: "BAdI לבחירת גרסת ייצור (MKAL) בזמן יצירת הזמנה — לקסטמיזציה של אלגוריתם בחירת מתכון/BOM." }
  ],
  userExits: [
    { name: "PPCO0007", desc: "Exit לבדיקה בעת שמירת הזמנת ייצור/תהליך — וולידציות עסקיות כלליות (תאריכים, סוג הזמנה, שדה ZZ)." },
    { name: "PPCO0008", desc: "Exit לערכי ברירת מחדל בהזמנה — נכון להזרים שדות ZZ או לעדכן Profile בעת COR1." },
    { name: "CONFPP05 / CONFPI03", tag: "verify SE37", desc: "Exit לבדיקת אישור הזמנה לפני שמירה — וולידציות על AFRU וכמויות. CONFPI03 הוא המקבילה ל־PI; לאמת קיום בריליז." },
    { name: "PPCO0021", tag: "verify SE37", desc: "Exit בעת יצירת רכיבי הזמנה / חישוב מחדש של RESB — לעיין לפני שינוי לוגיקת BOM Explosion." }
  ],
  incidents: ["ru505-backflush-stock", "cogi-stuck", "phase-confirm-sequence", "control-recipe-not-sent-co60", "process-message-not-processed-co54", "no-production-version", "batch-determination-fail"],
  debugEntry: [
    "שלב 1 — קריאה בלבד: COR3 לסקירת ההזמנה, COOIS לחתך רחב, MD04 למצב MRP. בדיקת JEST/JSTO לסטטוס מערכת ומשתמש לפני כל הנחה.",
    "שלב 2 — טבלאות יסוד: AFKO/AFPO ככותרת, AFVC/AFVV לשלבים, RESB לרכיבים, AFRU לדיווחים, AFFW לתנועות שנכשלו. השוואה בין כמות מתוכננת לדיווח לפני פתיחת דיבאגר.",
    "שלב 3 — מוניטורי תהליך: CO53 לסטטוס Control Recipe, CO54 ל־Process Messages, CO60 ל־PI Sheet, COGI/MF47 לטיפול ב־AFFW. SLG1 ללוג יישומי של תהליך/Backflush.",
    "שלב 4 — בדיקת עדכון רקע: SM13 לבדיקת Update Task כושל (Backflush ו־MM-IM נכתבים ב־V1/V2). תנועות Backflush נכשלות עוברות ל־AFFW ולא מפילות את AFRU.",
    "שלב 5 — Trace ממוקד: ST05 (SQL/RFC/Enqueue) במהלך COR6N או CO11N לזיהוי קוראים אמיתיים ולא רק כותרות. ST22/ST12 לקריסות.",
    "שלב 6 — Breakpoints רק בסוף: בפונקציות אישור (BAPI_PROCORDCONF_CREATE_TT) או BAdI WORKORDER_GOODSMVT, אחרי שאומת ש־COGI/SM13 נקיים. לעולם לא לשבור לפני בדיקת AFFW + SM13."
  ],
  eccS4: [
    { ecc: "MKPF + MSEG כטבלאות מסמכי החומר; כל Backflush מ־PP-PI כותב MSEG בו־זמנית עם AFRU.", s4: "MATDOC כ־Single Source of Truth; MKPF/MSEG הופכים ל־Compatibility Views. שאילתות ישירות צריכות לעבור ל־MATDOC או ל־CDS." },
    { ecc: "MRP קלאסי (MD01/MD02) רץ ברקע ויוצר PLAF; בדיקות זמינות ATP על MARC/MARD.", s4: "MRP Live (MD01N) רץ ב־HANA בזיכרון; aATP מחליף ATP קלאסי עם Backorder Processing ו־Product Allocation מתקדם." },
    { ecc: "PP-DS הוא רכיב SCM נפרד (APO) עם CIF להעברת אב־נתונים והזמנות.", s4: "PP-DS משולב ב־S/4 (Embedded PP-DS) על אותו מסד נתונים — אין CIF פנימי, אופטימייזר ב־HANA." },
    { ecc: "מוצרי לוואי וקו־פרודקטים מנוהלים דרך AFPO + הגדרות יישוב קלאסיות; טבלאות COEP/COSS/COSP נפרדות.", s4: "Universal Journal ACDOCA מאחד עלויות; מוצרי לוואי משתקפים ב־ACDOCA ויישוב הזמנת תהליך עובד מול Margin Analysis (verify לפי SP)." }
  ],
  cbc: [
    "ליבת CBC: ייצור משקאות — מתכון אב לרכזת/סירופ עם שלבי Mixing/Blending/Carbonation, גרסת ייצור (MKAL) פר מפעל מתאמת מתכון ו־BOM (סוכר, מים, CO2, רכז) ובוחרת אצוות לפי 023 (Brix, pH, Shelf Life).",
    "קווי מילוי: דיווח שלב מילוי מבצע Backflush אוטומטי של רכז וסוכר (תנועה 261) ו־GR למשקה המוגמר (101) באצווה מנוהלת; כל כשל בתנועה (חוסר אצוות רכז, מלאי 0) נופל ל־AFFW ומטופל ב־COGI לפני TECO.",
    "מעברי מוצר ו־CIP: בין מתכונים שונים בקו אותו מתבצע CIP (ניקוי) — מנוהל כפעולה במתכון או כהזמנת תחזוקה PM; חשוב לוודא יישוב נכון ל־CO ושמירת מסלול האצווה (Batch Where-Used MB56) לדרישות איכות ומשיכה מהשוק."
  ]
};

export const WORKBENCHES_EXT: Workbench[] = [QM, PM, PPPI];
