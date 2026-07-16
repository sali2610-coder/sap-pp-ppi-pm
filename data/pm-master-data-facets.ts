// PM master-data facets — the "what/why/when/owner/dependencies/mistakes/CBC"
// answers the P3 spec demands per master-data object. Produced by the mandatory
// capability pipeline (sap-document-intelligence → knowledge-builder →
// sap-pm-consultant verify → sap-function-finder validate) and cross-checked
// against SAP Help Portal + SAP Community. Sources are cited per object.
//
// This is NEW hand-authored knowledge (owner/when-created/common-mistakes were
// not modeled anywhere before) — it does not duplicate the generated dataset and
// is not derived from it. Two pm-consultant corrections are applied inline:
//   • Order — PM01/PM02/PM03 are customer-defined; SAP-delivered default noted.
//   • Business Partner — T357G is the Permits table, NOT partner determination
//     (that is OIOM · TPAR/TPAKO/TPAER); T357G removed from BP.

export interface MasterDataFacet {
  code: string;        // lead table (anchor)
  he: string;          // Hebrew object name
  en: string;          // English object name
  guide?: string;      // deep /domain guide slug when one exists
  whatIs: string;
  why: string;
  whenCreated: string;
  owner: string;
  dependencies: string;
  commonMistakes: string[];
  cbcExample: string;
  tables: string[];
  tcodes: string[];
  fiori?: string[];
  bapis?: string[];
  source: string;
}

export const PM_MASTER_DATA_FACETS: MasterDataFacet[] = [
  {
    code: "EQUI", he: "ציוד", en: "Equipment", guide: "pm-equipment",
    whatIs: "נכס בודד הניתן למעקב — מכלול נייד יחיד (מכונה, משאבה, מנוע, ציוד בדיקה, אובייקט צי). נושא היסטוריית אחזקה, נקודות מדידה ומספר סידורי, ומותקן במיקום פונקציונלי או בציוד-אב.",
    why: "ניהול נכסים ברמת הפריט הבודד: מעקב היסטוריית התקנה (EQUZ), פתיחת הודעות/פקודות/תכניות, איסוף נתונים טכניים, אימות עלויות וכיול. קטגוריית הציוד היא לב ה-Customizing — קובעת הקצאת מספרים, פריסה, פרופיל סטטוס ויכולת התקנה.",
    whenCreated: "IE01 — בעת התקנת אובייקט פיזי הדורש היסטוריית שימוש, אחסון פריט, ניהול נתונים פרטניים או כיול. טריגר: קבלת נכס חדש, שיפוץ, או פירוק והחלפת ציוד.",
    owner: "מהנדס/רכז אחזקה (Master-Data team). Customizing קטגוריית הציוד — היועץ הפונקציונלי של PM.",
    dependencies: "מיקום פונקציונלי (התקנה + ירושת ILOA), מספר סידורי (פרופיל OIS2) וחומר, מרכז עלות (דרך ILOA), נקודות מדידה (IMPTT/IMRG), קטגוריית ציוד.",
    commonMistakes: [
      "סוג ציוד / פרופיל מספר סידורי לא מוגדר מראש → כפילויות סידוריות או חוסר יכולת אחסון",
      "התקנה במיקום לא תקף / תאריך התקנה קודם ליצירת הציוד → פלח זמן EQUZ שבור",
      "פלחי זמן EQUZ לא רציפים → היסטוריית שימוש/עלויות חסרה בניתוח",
      "קטגוריית ציוד שגויה (M מכונה מול S ציוד לקוח מול P PRT) → שדות היסטוריה לא מתעדכנים",
    ],
    cbcExample: "'משאבת CIP #3' מוקמת כציוד עם מספר סידורי, מותקנת במיקום 'תחנת שטיפה'. נקודת מונה שעות-פעולה מזינה תכנית אחזקה מבוססת-ביצועים; בהחלפה — פירוק (IE4N) של הישן, ו-EQUZ שומר את שרשרת ההתקנות וההיסטוריה.",
    tables: ["EQUI", "EQKT", "EQUZ", "OBJK", "ILOA"],
    tcodes: ["IE01", "IE02", "IE03", "IE4N", "OIS2"],
    fiori: ["Manage Technical Objects"],
    bapis: ["BAPI_EQUI_CREATE", "BAPI_EQUI_CHANGE", "BAPI_EQUI_GETDETAIL"],
    source: "ספר PM ch.004 §4.3 · SAP Help (EQUZ/ILOA) · TCodeSearch · אומת ע\"י sap-pm-consultant",
  },
  {
    code: "IFLOT", he: "מיקום פונקציונלי", en: "Functional Location", guide: "pm-functional-locations",
    whatIs: "מייצג היכן מתבצעת אחזקה — יחידה פונקציונלית נייחת, לרוב רב-שלבית (מתקן תהליך, קו ייצור, מבנה, צנרת). מבנה אנכי היררכי קבוע של המפעל.",
    why: "מבנה קבוע לנכסים לשיוך ציוד, פתיחת הודעות/פקודות, איסוף נתונים טכניים, ואימות עלויות לפי אתר. פונקציית ה-Customizing החשובה ביותר — מחוון המבנה (Structure Indicator) הקובע אורך מזהה, מספר רמות ותווים לרמה.",
    whenCreated: "IL01 — בעת ניהול מבנה נכסים היררכי, חובת תיעוד, איסוף נתונים טכניים או אימות עלויות. טריגר: הקמת מפעל/קו חדש או מיפוי מבנה קיים.",
    owner: "צוות אב-נתונים / רכז אחזקה. מחוון המבנה, קטגוריית המיקום ותיוג חלופי — היועץ הפונקציונלי של PM.",
    dependencies: "מחוון מבנה (OIPK) + Edit Mask, קטגוריית מיקום, ILOA (מרכז עלות/מפעל אחזקה — יורש לציוד המותקן), ציוד (מותקן/מפורק), סיווג. תיוג חלופי מפעיל IFLOS/IFLOT.",
    commonMistakes: [
      "מחוון המבנה / Edit Mask לא תוכנן מראש → מזהים היררכיים לא עקביים ובלתי הפיכים",
      "ערבוב מבנה מבוסס-מיקום ומבוסס-ציוד ללא מדיניות אחידה",
      "מרכז עלות שגוי ב-ILOA → חיוב פקודות למרכז עלות לא נכון (כולל לציוד המותקן שיורש ILOA)",
      "הפעלת תיוג חלופי בדיעבד ללא הרצת RI_IFLOT2IFLOS → רשומות IFLOS חסרות",
    ],
    cbcExample: "מפעל משקאות: מבנה 'קו מילוי 1 → ממלאת → מכסה' כמיקומים בהיררכיה 3-רמות. ציוד מותקן בתחנות; כל פקודת אחזקה מחויבת למרכז העלות של הקו דרך ILOA — מאפשר גלגול עלויות אחזקה לפי אתר.",
    tables: ["IFLOT", "IFLOS", "ILOA"],
    tcodes: ["IL01", "IL02", "IL03", "OIPK", "IH01"],
    fiori: ["Manage Technical Objects"],
    bapis: ["BAPI_FUNCLOC_CREATE", "BAPI_FUNCLOC_CHANGE", "BAPI_FUNCLOC_GETDETAIL"],
    source: "ספר PM ch.004 §4.1–4.2 · SAP Help (OIPK/RI_IFLOT2IFLOS) · אומת ע\"י sap-pm-consultant",
  },
  {
    code: "CRHD", he: "מרכז עבודה", en: "Work Center", guide: "pm-work-centers",
    whatIs: "מגדיר היכן ועל ידי מי מתבצעת עבודת אחזקה — קיבולת, נוסחאות תזמון ועלות, ושיוך מרכז עלות + סוג פעילות. משמש בפעולות של רשימות פעולות ופקודות.",
    why: "מודל ה'מי + כמה' לאחזקה — קיבולת זמינה (טכנאים/שעות), נוסחאות לחישוב משכי פעולות ועלויות, וקישור למרכז עלות לחיוב שעות בפועל. קטגוריה 0005 מיועדת לאחזקה.",
    whenCreated: "IR01 — בעת הקמת ארגון האחזקה: הגדרת צוותים/סדנאות והקיבולת שלהם. טריגר: הגדרה ראשונית של תשתית PM או שינוי מבנה ארגוני.",
    owner: "מנהל אחזקה / צוות אב-נתונים; שיוך מרכז העלות בתיאום עם בקרת עלויות (CO).",
    dependencies: "מרכז עלות + סוג פעילות (CRCO → CO), קיבולת (KAKO), נוסחאות תזמון/עלות. נצרך על ידי רשימות פעולות ופקודות.",
    commonMistakes: [
      "מרכז עלות / סוג פעילות לא מוגדר ב-CRCO → אישור שעות (IW41) לא מחייב עלות נכונה",
      "קטגוריה שגויה (לא 0005) → מרכז העבודה לא זמין באובייקטי אחזקה",
      "קיבולת זמינה לא מוגדרת → ניתוח עומס (CM01) שגוי / אין תזמון סופי",
      "נוסחת עלות/תזמון חסרה → משכי פעולות ועלויות מחושבות שגוי",
    ],
    cbcExample: "מרכז עבודה 'צוות אחזקת מכונאות' עם קיבולת 3 טכנאים. כל אישור שעות ב-IW41 מחייב את מרכז העלות של מחלקת האחזקה דרך CRCO, ומאפשר ניתוח עומס הצוות לפני שיבוץ.",
    tables: ["CRHD", "CRCA", "CRCO", "CRTX", "KAKO"],
    tcodes: ["IR01", "IR02", "IR03", "CM01"],
    bapis: ["BAPI_WORKCENTER_CREATE", "BAPI_WORKCENTER_GETLIST"],
    source: "ספר PM ch.002 (Org Structures) · SAP KBA 3030584 (Category 0005) · אומת ע\"י sap-pm-consultant",
  },
  {
    code: "PLKO", he: "רשימת פעולות", en: "Task List", guide: "pm-task-lists",
    whatIs: "תבנית סטנדרטית של פעולות אחזקה — מרכזי עבודה, זמנים, חומרים והוראות — לשימוש חוזר בפקודות ובתכניות. שלושה סוגים: כללית (A), לציוד (E), למיקום פונקציונלי (T).",
    why: "אחידות ותקינות של תהליכי אחזקה חוזרים בכל המפעל, מניעת הזנה ידנית חוזרת, וקישור פעולות מתוקננות לאסטרטגיות (חבילות זמן/ביצועים) ולתכניות אחזקה (דרך MPOS).",
    whenCreated: "IA01 (כללית) / IA11 (לציוד) — בעת תכנון אחזקה מונעת או תקינון עבודות חוזרות. טריגר: הגדרת אסטרטגיית אחזקה מונעת.",
    owner: "מתכנן אחזקה / מהנדס אמינות.",
    dependencies: "מרכזי עבודה (בפעולות PLPO), חומרים/BOM (הקצאה דרך PLMZ), אסטרטגיות אחזקה, תכניות אחזקה (MPOS מפנה לרשימה). מבני PLKO/PLPO משותפים ל-PM ול-PP.",
    commonMistakes: [
      "רשימה ללא תוקף (validity) חופף לתאריך השימוש → לא נבחרת בפקודה/תכנית",
      "מפתח בקרה (Control Key) שגוי לפעולה → תזמון/עלות/אישור שגויים",
      "רכיב לא מוקצה כראוי ב-PLMZ → חלף לא נצרך בפקודה",
      "בחירת סוג רשימה שגוי (A/E/T) → שימוש חוזר לא אפשרי",
    ],
    cbcExample: "רשימת פעולות כללית 'שטיפת CIP שבועית' עם 5 פעולות (ניקוי, בדיקת אטמים, כיול חיישנים) המשויכת לכל תכניות האחזקה של קווי המילוי — אחידות תהליך ותכנון חומרים עקבי.",
    tables: ["PLKO", "PLPO", "PLAS", "PLMZ", "PLFH"],
    tcodes: ["IA01", "IA05", "IA06", "IA11"],
    source: "ספר PM ch.006 (Preventive Maintenance) · testingbrain (PM TL tables) · אומת ע\"י sap-pm-consultant",
  },
  {
    code: "MAST", he: "עץ מוצר (BOM)", en: "Bill of Materials",
    whatIs: "רשימה מובנית של כל הרכיבים השייכים למוצר/מכלול. באחזקה: BOM ציוד, BOM מיקום פונקציונלי, ו-BOM חומר (לסוג בנייה). שימוש BOM 4 מיועד ל-Plant Maintenance.",
    why: "באחזקה משמש לתיאור מבנה האובייקט הטכני (איתור מיקום נזק) ולהקצאת חלקי חילוף לפקודות. קטגוריות פריט: L (מלאי → רזרבציה), N (לא-מלאי → דרישת רכש), I (אלמנט מבנה PM), T (טקסט).",
    whenCreated: "CS01 (חומר) / IB01 (ציוד) / IB11 (מיקום) — בעת הקמת אובייקט הדורש רשימת חלפים או מבנה מפורט.",
    owner: "מהנדס אחזקה / צוות אב-נתונים הנדסי. Customizing (שימושים, קטגוריות פריט) — היועץ הפונקציונלי.",
    dependencies: "אב חומר (רכיבים), ציוד/מיקום (BOM ציוד/מיקום), שימוש BOM (=4), קטגוריות פריט. נצרך בפקודת אחזקה ובתכנון חלפים.",
    commonMistakes: [
      "BOM לא משויך לשימוש 4 (Plant Maintenance) או לאובייקט הנכון → לא נבחר בפקודה",
      "קטגוריית פריט שגויה (L במקום N) → רזרבציה במקום דרישת רכש לחלף חיצוני, או להפך",
      "חלופה (Alternative) שגויה נבחרת → רכיבים לא נכונים בפקודה",
      "פריט ללא תוקף / כמות בסיס שגויה → רכיב לא נצרך",
    ],
    cbcExample: "'משאבת CIP #3' נושאת BOM ציוד עם אטמים, מיסבים וראש משאבה כפריטי מלאי (L → רזרבציה) ושירות כיול חיצוני כפריט לא-מלאי (N → דרישת רכש). בפתיחת פקודה החלפים נשלפים אוטומטית.",
    tables: ["MAST", "STKO", "STPO", "STAS"],
    tcodes: ["CS01", "CS03", "IB01", "IB11", "IH04"],
    bapis: ["CSAP_MAT_BOM_CREATE", "CSAP_EQP_BOM_CREATE", "CSAP_FLC_BOM_CREATE"],
    source: "ספר PM ch.004 §4.9 · SAP Help (BOM item categories/Usage 4) · אומת ע\"י sap-pm-consultant",
  },
  {
    code: "MARA", he: "אב חומר", en: "Material", guide: "pm-spare-parts",
    whatIs: "מכיל מידע על חומרים שהחברה מתכננת/רוכשת/מייצרת/מאחסנת/מוכרת, ומשלב נתונים ממחלקות. באחזקה משמש לחלקי חילוף (מלאי/לא-מלאי), סוגי בנייה ומשאבי תפעול. רשומה אחת מייצגת פריטים דומים רבים.",
    why: "אב-הנתונים המרכזי לחלפים ולחומרי אחזקה. סוג החומר הוא רכיב הבקרה — מגדיר תצוגות, הקצאת מספרים, עדכון כמות/ערך, בקרת מחיר וסוג רכש. סוגים רלוונטיים: ERSA (חלפים), Non-stock, משאבי תפעול.",
    whenCreated: "MM01 — בעת הכנסת חלף/חומר אחזקה חדש לניהול. טריגר: פריט מלאי חדש, חלף חדש לציוד, או חומר צריכה.",
    owner: "צוות אב-נתונים לוגיסטי (MM); תצוגות רכש/MRP — רכש ותכנון; תצוגת חשבונאות — פיננסים.",
    dependencies: "סוג חומר (בקרה), מפעל (MARC — תצוגות MRP/אחסון), הערכה (MBEW), BOM (רכיב), רזרבציה/דרישת רכש בפקודות, מספר סידורי.",
    commonMistakes: [
      "חומר לא מורחב לתצוגת מפעל/MRP → MRP לא מתכנן ולא ניתן לרזרב בפקודת אחזקה",
      "סוג חומר שגוי → תצוגות/הערכה חסרים או בקרת מחיר לא נכונה",
      "הרשאת רכש לא מוגדרת נכון לחומרי אחזקה (לרוב רכש חיצוני)",
      "בקרת מחיר (V/S) לא תואמת את התהליך → סטיות עלות לא מחושבות נכון",
    ],
    cbcExample: "אטם ראש-מילוי מוקם כחומר ERSA (חלף מלאי, מחיר ממוצע נע), מורחב למפעל עם תצוגות MRP ואחסון; שירות כיול חיצוני מוקם כ-Non-stock עם נתוני רכש בלבד. שניהם רכיבי BOM ורזרבציות/דרישות רכש בפקודות.",
    tables: ["MARA", "MARC", "MBEW", "MAKT"],
    tcodes: ["MM01", "MM02", "MM03"],
    bapis: ["BAPI_MATERIAL_SAVEDATA", "BAPI_MATERIAL_GET_DETAIL"],
    source: "ספר PM ch.004 §4.7 (Materials & Assemblies) · SAP Community (ERSA) · אומת ע\"י sap-pm-consultant",
  },
  {
    code: "MPLA", he: "תכנית אחזקה", en: "Maintenance Plan", guide: "pm-maintenance-planning",
    whatIs: "מנהלת מתי לבצע פעילות אחזקה — מבוססת-זמן או מבוססת-ביצועים (מונה). ה-Scheduling יוצר קריאות (Calls) המומרות אוטומטית לפקודות/הודעות.",
    why: "אחזקה מונעת/מתוזמנת אוטומטית — מפחית תקלות ומאריך חיי נכס. משלב רשימת פעולות (דרך MPOS), אסטרטגיה, ואופק קריאה (Call Horizon) הקובע מתי לפני המועד נוצרת הפקודה. IP30 = job אצווה יומי.",
    whenCreated: "IP01 (חד-פריט) / IP42 (אסטרטגיה) — לאחר שקיימות רשימת פעולות ואסטרטגיה. טריגר: החלטה על משטר אחזקה מונעת.",
    owner: "מתכנן אחזקה / מהנדס אמינות.",
    dependencies: "רשימת פעולות (Task List דרך MPOS), אסטרטגיית אחזקה (חבילות — IP11), ציוד/מיקום (אובייקט התכנית), נקודות מדידה/מונים (לתכנית מבוססת-ביצועים), אופק קריאה.",
    commonMistakes: [
      "אופק קריאה / פרמטרי תזמון לא מוגדרים → אין יצירת פקודות",
      "Planning lead time מתעלם מ-Scheduling → פקודות נוצרות מאוחר מדי",
      "תכנית מבוססת-ביצועים ללא נקודת מונה תקינה / שער הערכה שגוי → לא מתזמנת",
      "IP30 לא מתוזמן כ-batch job לילי → קריאות לא נוצרות אוטומטית",
    ],
    cbcExample: "תכנית מונעת רבעונית ל'מערכת מים מטוהרים' (מבוססת-זמן) לצד תכנית מבוססת-שעות-פעולה למשאבות CIP. ה-job הלילי IP30 מייצר פקודות אוטומטית לפני המועד לפי אופק הקריאה — עבודה מתוכננת מראש עם חלפים.",
    tables: ["MPLA", "MPOS", "MHIO", "MHIS"],
    tcodes: ["IP01", "IP10", "IP30", "IP42", "IP11"],
    source: "ספר PM ch.006 · SAP Community (Call horizon) · אומת ע\"י sap-pm-consultant",
  },
  {
    code: "IMPTT", he: "נקודת מדידה ומונה", en: "Measuring Point / Counter", guide: "pm-measuring-points",
    whatIs: "נקודת מדידה מתעדת מצב ברגע נתון (טמפרטורה, לחץ); מונה מצטבר לאורך זמן (שעות-פעולה, ק\"מ). קריאות נרשמות כמסמכי מדידה (Measurement Documents).",
    why: "מזין אחזקה מבוססת-מצב ותכניות מבוססות-ביצועים, מאפשר מעקב מגמות וזיהוי הידרדרות, וגבולות אזהרה מפעילים הודעות אוטומטיות. קריאת מונה יכולה להפעיל תכנית בהגעה לסף (למשל כל 2000 שעות).",
    whenCreated: "IK01 — על ציוד/מיקום הדורש ניטור מצב או תכנית מבוססת-ביצועים. טריגר: אחזקה חזויה/מבוססת-מצב או רישום קריאות תקופתיות.",
    owner: "מהנדס אחזקה / רכז אמינות; רישום קריאות ע\"י מפעילים או אוטומטית מ-IoT/RFC.",
    dependencies: "ציוד או מיקום (אובייקט הנקודה), characteristic (CT04) + גבולות, תכנית מבוססת-ביצועים, אינטגרציית IoT/RFC לקריאות אוטומטיות ב-S/4.",
    commonMistakes: [
      "קריאה מחוץ לגבולות / נקודה לא קיימת → קריאה נדחית",
      "תכנית מבוססת-ביצועים לא מתזמנת → שער הערכה (annual estimate) לא מוגדר",
      "קריאות לא רציפות / סדר תאריכים שגוי → חישוב צריכה ומגמה שגוי",
      "characteristic ללא יחידת מדידה תקינה → ערכים לא ניתנים להשוואה",
    ],
    cbcExample: "נקודת מונה 'שעות-פעולה' על משאבת CIP. כל 2000 שעות התכנית המבוססת-ביצועים יוצרת פקודה. חיישן IoT מזין קריאות אוטומטית דרך RFC — מעבר מאחזקה קלנדרית לאחזקה חזויה מבוססת-שימוש בפועל.",
    tables: ["IMPTT", "IMRG", "EQUI", "IFLOT"],
    tcodes: ["IK01", "IK11", "IK21", "IK17"],
    bapis: ["BAPI_MEASUREPOINT_CREATE", "BAPI_MEASUREMENT_CREATE"],
    source: "domain-detail (pm-measuring-points) · SAP Help (CT04 chain) · אומת ע\"י sap-pm-consultant",
  },
  {
    code: "QMEL", he: "הודעת אחזקה", en: "Notification", guide: "pm-notifications",
    whatIs: "מתעדת בקשה או תקלה. סוגים: M1 (תקלה), M2 (בקשה/דרישה), M3 (פעילות). מקטלגת נזק, גורם ופעולות דרך קודי קטלוג, ויכולה להיות מומרת לפקודת עבודה.",
    why: "ערוץ תיעוד ובקשה מהשטח, מזין ניתוח תקלות (Pareto) דרך קודי קטלוג (QPCD/QPGR), ומגשר בין דיווח בעיה לביצוע. הודעה מתעדת בלבד; הפקודה מבצעת ונושאת עלות.",
    whenCreated: "IW21 — בעת זיהוי תקלה, בקשת עבודה או תיעוד פעילות. טריגר: מפעיל/טכנאי מזהה תקלה או צורך בשירות.",
    owner: "מפעיל/טכנאי שטח פותח; רכז אחזקה מעשיר בקודים ומאשר המרה לפקודה.",
    dependencies: "אובייקט טכני (ציוד/מיקום), קטלוגי נזק/גורם (Catalog Profile — QPCD/QPGR), סוג הודעה (קובע זרימה + המרה אוטומטית), משימות (QMSM). קטלוגים משותפים עם QM.",
    commonMistakes: [
      "סגירת הודעה עם משימות פתוחות (QMSM) → תיעוד לא שלם",
      "סוג הודעה שגוי (M1/M2/M3) → זרימה והמרה לפקודה לא נכונות",
      "קוד נזק/גורם לא מקוטלג (QMFE/QPGR ריק) → ניתוח תקלות חסר",
      "פריט הודעה ללא קוד → אין בסיס לניתוח Pareto של תקלות חוזרות",
    ],
    cbcExample: "מפעיל פותח הודעת תקלה M1 על 'ממלאת #2 — דליפה'. הרכז מוסיף קוד פגם (דליפה) + סיבה (אטם בלוי), וממיר לפקודה דחופה. ניתוח מצטבר חושף שאטמים הם גורם התקלה החוזר — בסיס להחלטת אחזקה מונעת.",
    tables: ["QMEL", "QMFE", "QMUR", "QMMA", "QMSM"],
    tcodes: ["IW21", "IW22", "IW23", "IW28", "IW29"],
    fiori: ["Manage Notifications"],
    bapis: ["BAPI_ALM_NOTIF_CREATE", "BAPI_ALM_NOTIF_DATA_MODIFY", "BAPI_ALM_NOTIF_CLOSE"],
    source: "domain-detail (pm-notifications) · SAP Community (PM notif tables/TQ80) · אומת ע\"י sap-pm-consultant",
  },
  {
    code: "AUFK", he: "פקודת אחזקה", en: "Order", guide: "pm-maintenance-orders",
    whatIs: "מבצעת ונושאת עלות של עבודת אחזקה — פעולות, משאבים, חומרים, אישורים והתחשבנות. הפקודה היא נושאת העלות (Cost Object). סטטוסים: CRTD → REL → CNF → TECO → CLSD. סוגי פקודה מותאמי-לקוח (ברירת מחדל SAP: PM01 מתוכנן/מונע, PM02 תקלה/שבר, PM03 שיפוץ/השקעה).",
    why: "מרכז את הביצוע התפעולי-כספי: תכנון פעולות וחומרים, בדיקת זמינות, שחרור, אישור שעות וצריכה, וגלגול עלויות למרכז עלות/נכס דרך התחשבנות (COBRB → CO). ב-S/4 הרישום ישיר ב-Universal Journal (ACDOCA).",
    whenCreated: "IW31 — ידנית, מהמרת הודעה, או אוטומטית מתכנית אחזקה (IP30). טריגר: תקלה, אחזקה מתוכננת, או קריאת תכנית מונעת.",
    owner: "מתכנן/רכז אחזקה יוצר ומתכנן; טכנאים מאשרים ביצוע; בקרת עלויות מבצעת התחשבנות.",
    dependencies: "אובייקט טכני (יורש ILOA/מרכז עלות), הודעה (מקור אופציונלי), רשימת פעולות (תבנית), מרכזי עבודה (קיבולת/עלות), חומרים/BOM (RESB → MM), כלל התחשבנות (COBRB → CO), אישור (AFRU).",
    commonMistakes: [
      "כלל התחשבנות (COBRB) חסר → KO88/CO88 נכשל",
      "סטטוס משתמש חוסם שחרור/TECO",
      "רכיב מלאי ללא מלאי (RESB) → פקודה לא משתחררת / Backflush נכשל (COGI)",
      "אישור בתאריך בתקופה סגורה → דחייה או תנועת מלאי תקועה",
    ],
    cbcExample: "פקודת PM לאחזקת 'מערכת CIP' — פעולות ניקוי + החלפת משאבה, רכיב מלאי (אטם → רזרבציה+GI) ורכיב לא-מלאי (שירות קבלן → דרישת רכש). לאחר אישור שעות ב-IW41 — TECO והתחשבנות למרכז העלות של הייצור.",
    tables: ["AUFK", "AFIH", "AFKO", "AFVC", "AFRU", "RESB"],
    tcodes: ["IW31", "IW32", "IW33", "IW41", "IW38"],
    fiori: ["Manage Maintenance Orders", "Find Maintenance Orders"],
    bapis: ["BAPI_ALM_ORDER_MAINTAIN", "BAPI_ALM_ORDER_GET_DETAIL", "BAPI_ALM_CONF_CREATE"],
    source: "domain-detail (pm-maintenance-orders) · 2bmsoftware/SAP Community (order types) · אומת ע\"י sap-pm-consultant (PM01/PM02 = מותאמי-לקוח)",
  },
  {
    code: "BUT000", he: "שותף עסקי", en: "Business Partner",
    whatIs: "רשומת האב האחודה ב-S/4HANA לאנשים/ארגונים בתהליכי אחזקה — לקוחות, ספקים, יצרנים, קבלנים ואנשי קשר. באחזקה משמש כ'פונקציית שותף' על ציוד/מיקום/הודעה/פקודה. מחליף את KNA1/LFA1 הנפרדים.",
    why: "מודל ה-Business Partner הוא ה-single source of truth שמאחד לקוח וספק. באחזקה מאפשר לשייך אחריות ותפקידים לאובייקטים טכניים ולתעד ספקים/יצרנים/קבלנים בהודעות ובפקודות (קבלנות משנה, אחריות/Warranty).",
    whenCreated: "BP — בעת הקמת ספק/לקוח/קבלן חדש או הגדרת אחראי ארגוני. טריגר: הצטרפות ספק חלפים/קבלן אחזקה, או שיוך אחריות לנכס.",
    owner: "צוות אב-נתונים מרכזי (MDG/Finance-MM לספקים); שיוך פונקציות שותף לאובייקטי אחזקה ע\"י רכז האחזקה.",
    dependencies: "נוהל קביעת שותפים (Partner Determination Procedure — משויך דרך OIOM; טבלאות TPAR/TPAKO/TPAER) לפי קטגוריית ציוד/מיקום/סוג הודעה/פקודה; שיוך בפועל דרך IHPA; לספקים — אינטגרציה עם רכש (CVI). קשור לאחריות (Warranty).",
    commonMistakes: [
      "נוהל קביעת שותפים לא משויך (OIOM) לקטגוריה/סוג → פונקציות שותף חסרות באובייקט",
      "פונקציית שותף חובה לא מולאה → חסימה ביצירת הודעה/פקודה",
      "בלבול בין תפקידי BP (Vendor / Customer / Contact) → נתונים בתצוגה שגויה",
      "הסתמכות על KNA1/LFA1 בקוד Z במקום על BUT000 → נשבר ב-S/4 בגלל מודל ה-BP האחוד",
    ],
    cbcExample: "קבלן כיול חיצוני מוקם כ-Business Partner בתפקיד ספק, משויך כפונקציית שותף 'קבלן' על ציוד המדידה. כשפקודה כוללת רכיב לא-מלאי (שירות כיול) נוצרת דרישת רכש → הזמנת רכש לאותו BP; יצרן המשאבה מתועד לצורך תביעת אחריות.",
    tables: ["BUT000", "IHPA", "TPAR"],
    tcodes: ["BP", "OIOM", "IE02", "IW22"],
    bapis: ["BAPI_BUPA_CREATE_FROM_DATA", "BAPI_BUPA_CENTRAL_CHANGE"],
    source: "ספר PM ch.003 (Warranties) · מודל BP סטנדרטי S/4 (BUT000↔KNA1/LFA1) · תיקון sap-pm-consultant: T357G = Permits (הוסר); קביעת שותפים = OIOM/TPAR",
  },
];

export const pmMasterDataFacet = (code: string): MasterDataFacet | undefined =>
  PM_MASTER_DATA_FACETS.find((f) => f.code.toUpperCase() === (code || "").toUpperCase());
