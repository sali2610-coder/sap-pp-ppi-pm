// KIND-level Object Intelligence templates. These are TRUE general statements
// about each class of SAP object (table / T-Code / BAPI / FM / IDoc / CDS /
// authorization object) — NOT fabricated per-entity facts. The profile builder
// (lib/object-profile.ts) merges these with curated per-entity specifics and
// graph-derived relations, marking each dimension verified vs general.

export type ProfileKind = "table" | "tcode" | "bapi" | "fm" | "idoc" | "cds" | "auth";

export interface KindTemplate {
  kindHe: string;
  what: string;
  why: string;
  who: string;
  when: string;
  lifecycle: string;
  troubleshooting: string[];
  interview: string[];
  eccS4: string;
  pmFrame: string;  // PM example framing (entity name injected by builder)
  ppFrame: string;  // PP/PP-PI example framing
}

export const KIND_INTEL: Record<ProfileKind, KindTemplate> = {
  table: {
    kindHe: "טבלה",
    what: "טבלה שקופה (Transparent Table) במילון ABAP — מאחסנת רשומות עסקיות בשורות ועמודות, עם מפתח ראשי ואינדקסים.",
    why: "קיימת כדי לשמר את נתוני הליבה של התהליך העסקי באופן עקבי ובר-שאילתה, ולשמש בסיס לדוחות, ממשקים ו-CDS.",
    who: "מפתחי ABAP, יועצים פונקציונליים, צוות Basis/מיגרציה ואנליסטים — לקריאה (SE16N/CDS) ולפיתוח.",
    when: "בכל שאילתת נתונים, פיתוח דוח/ממשק, אבחון תקלה, וניתוח מיגרציה (היקף נתונים והתאמת מבנה).",
    lifecycle: "הוגדרה במילון (SE11) → הופעלה → רשומות נוצרות/משתנות/נמחקות דרך האפליקציה → ארכוב (SARA) → במיגרציה: בדיקת Simplification והתאמת מבנה.",
    troubleshooting: ["שדה לא נמצא → אמת שם טכני ב-SE11", "אין הרשאת קריאה → S_TABU_DIS / S_TABU_NAM", "ביצועים איטיים → בדוק אינדקס משני (SE11) ו-ST05", "ב-S/4 גישה ישירה חסומה/שונתה → השתמש ב-CDS / Compatibility View"],
    interview: ["מה ההבדל בין Transparent ל-Pool/Cluster Table?", "כיצד בודקים מפתח ראשי ואינדקסים של טבלה?", "מה קרה ל-MKPF/MSEG ול-BSEG ב-S/4HANA?", "מתי עדיף לקרוא דרך CDS במקום SELECT ישיר?"],
    eccS4: "רוב הטבלאות נשמרות; חלקן הוחלפו במודל מאוחד (MATDOC/ACDOCA) או נחשפות כ-Compatibility Views. יש לבדוק Simplification Item רלוונטי.",
    pmFrame: "באחזקה (PM) — הטבלה נקראת/מתעדכנת בתהליכי ציוד, מיקום פונקציונלי, הזמנות והודעות אחזקה",
    ppFrame: "בייצור תהליכי (PP-PI) — הטבלה משתתפת בתהליכי מתכון, פקודת תהליך, אצוות ותנועות מלאי",
  },
  tcode: {
    kindHe: "טרנזקציה (T-Code)",
    what: "קוד טרנזקציה — נקודת כניסה ב-SAP GUI לתוכנית/מסך שמריצים פעולה עסקית (יצירה/שינוי/הצגה).",
    why: "קיימת כדי לתת למשתמש קצה גישה מהירה ומבוקרת לתהליך, עם הרשאה ותפריט ייעודיים.",
    who: "משתמשי קצה (טכנאים/מתכננים), יועצים ומפתחים — להרצת התהליך העסקי ובדיקות UAT.",
    when: "בביצוע פעולה עסקית יומיומית ובבדיקות קבלה; באבחון משווים מול אפליקציית Fiori מקבילה.",
    lifecycle: "הוגדרה ב-SE93 (קישור לתוכנית/מסך) → מוקצית לתפקיד (PFCG/SU24) → מורצת ע\"י המשתמש → ב-S/4 לעיתים מוחלפת באפליקציית Fiori.",
    troubleshooting: ["'אין הרשאה' → SU53/STAUTHTRACE ואז הוספה ב-PFCG", "לא קיימת ב-S/4 → חפש Fiori/תוכנית חלופית", "שדה אפור/מסך נעול → סטטוס או Customizing", "ביצועים → SAT / ST05"],
    interview: ["כיצד מאתרים את התוכנית שמאחורי T-Code?", "מה ההבדל בין Dialog ל-Report transaction?", "איך מוצאים את אפליקציית ה-Fiori המקבילה?", "כיצד מקצים T-Code לתפקיד נכון דרך PFCG/SU24?"],
    eccS4: "חלק מה-T-Codes נשמרו, חלק הוחלפו ב-Fiori apps / תוכניות חדשות. ב-S/4 ה-UX המומלץ הוא Fiori Launchpad (ה-GUI עדיין זמין).",
    pmFrame: "באחזקה (PM) — מריצים את הטרנזקציה בתהליך אחזקה",
    ppFrame: "בייצור (PP-PI) — מריצים את הטרנזקציה בתהליך ייצור",
  },
  bapi: {
    kindHe: "BAPI",
    what: "ממשק תכנותי תקני (Business API) לאובייקט עסקי — יצירה/שינוי/קריאה דרך FM שמסוג RFC-enabled, רשום ב-BAPI Explorer.",
    why: "קיים כדי לאפשר אינטגרציה יציבה ומתועדת מול האובייקט העסקי בלי תלות במסכים, עם חוזה פרמטרים קבוע.",
    who: "מפתחי אינטגרציה/ABAP, צוות ממשקים ו-QA — לקריאה/כתיבה תכנותית ולבדיקות אוטומטיות.",
    when: "בטעינות נתונים, ממשקים בין-מערכתיים, אוטומציה ובדיקות יצירה/שינוי.",
    lifecycle: "מוגדר כ-FM RFC-enabled ורשום ב-BAPI Explorer → נקרא עם פרמטרים → בדיקת BAPIRET2 → BAPI_TRANSACTION_COMMIT / ROLLBACK.",
    troubleshooting: ["שגיאה ב-RETURN (TYPE='E') → קרא MESSAGE", "השינוי לא נשמר → חסר BAPI_TRANSACTION_COMMIT", "נעילה → האובייקט נעול ע\"י משתמש/תהליך אחר", "הרשאה חסרה לאובייקט העסקי"],
    interview: ["מה ההבדל בין BAPI ל-Function Module רגיל?", "למה נדרש BAPI_TRANSACTION_COMMIT?", "כיצד מטפלים בשגיאות דרך BAPIRET2?", "מתי מעדיפים OData / RAP על BAPI ב-S/4HANA?"],
    eccS4: "BAPIs נתמכים ב-S/4HANA; לתרחישים חדשים SAP ממליצה OData APIs (API_*) / RAP. כדאי לבדוק אם קיים API מודרני מקביל.",
    pmFrame: "באחזקה (PM) — ה-BAPI משמש ביצירה/עדכון תכנותי של אובייקט אחזקה",
    ppFrame: "בייצור תהליכי (PP-PI) — ה-BAPI משמש ביצירה/דיווח תכנותי של אובייקט ייצור",
  },
  fm: {
    kindHe: "Function Module",
    what: "מודול פונקציה — יחידת קוד עם ממשק (Import/Export/Changing/Tables/Exceptions) להפעלה חוזרת; חלקם RFC-enabled.",
    why: "קיים לשימוש חוזר בלוגיקה/קריאות נתונים בצורה מודולרית, עם חוזה פרמטרים ברור.",
    who: "מפתחי ABAP ויועצים טכניים — לפיתוח דוחות, ממשקים, הרחבות וקריאות נתונים.",
    when: "בפיתוח דוחות/ממשקים, בקריאות שירות פנימיות וב-RFC חיצוני.",
    lifecycle: "מוגדר ב-SE37 בתוך Function Group → נקרא (CALL FUNCTION) → חלקו נחשף כ-RFC.",
    troubleshooting: ["EXCEPTION לא מטופל → בדוק SY-SUBRC לאחר הקריאה", "RFC נכשל → חיבור (SM59)/הרשאה", "תוצאה ריקה → אמת פרמטרי קלט ותנאים", "ב-S/4 לוגיקה שונתה → אמת מול הגרסה"],
    interview: ["מה ההבדל בין FM ל-Method של מחלקה?", "מה זה Function Group ולמה הוא חשוב?", "כיצד עובד FM שמסוג RFC?", "מתי FM הוחלף ב-Clean Core ע\"י Class/BAdI?"],
    eccS4: "FMs רבים נתמכים; חלק מהלוגיקה שונתה (MRP/ATP/מסמכי חומר). לפיתוח חדש העדף ABAP OO / RAP.",
    pmFrame: "באחזקה (PM) — ה-FM נקרא בלוגיקת אחזקה (סטטוס, מדידה, קריאת אובייקט)",
    ppFrame: "בייצור (PP-PI) — ה-FM נקרא בלוגיקת ייצור (BOM, קיבולת, מתכון)",
  },
  idoc: {
    kindHe: "IDoc",
    what: "מבנה הודעה תקני (Intermediate Document) להעברת נתונים בין מערכות ב-ALE/EDI — Control/Data/Status records וסגמנטים.",
    why: "קיים לתקשורת אסינכרונית, אמינה ובת-מעקב של אב-נתונים ותנועות בין SAP למערכות חיצוניות.",
    who: "צוות אינטגרציה/EDI, Basis ויועצים לוגיסטיים — להעברת נתונים וניטור ממשקים.",
    when: "בתקשורת ALE/EDI, אינטגרציות אב-נתונים/תנועות ובניטור שוטף של ממשקים.",
    lifecycle: "Basic Type + סגמנטים מוגדרים → Partner Profile (WE20) + Port → IDoc נוצר/נשלח → סטטוס (03/53 הצלחה, 51 שגיאה) → ניטור WE02 / BD87.",
    troubleshooting: ["סטטוס 51 → Partner Profile/מיפוי/שדה חובה חסר", "IDoc תקוע → עיבוד מחדש ב-BD87", "סגמנט חסר → Extension/Basic Type", "אין יעד → Distribution Model (BD64)"],
    interview: ["מהו מבנה ה-IDoc (Control/Data/Status)?", "מה ההבדל בין ALE ל-EDI?", "כיצד מאבחנים IDoc בסטטוס 51?", "מה תפקיד Partner Profile ו-Port?"],
    eccS4: "IDocs נתמכים ב-S/4HANA; לתרחישים חדשים מועדפים Events/OData/SOAP. שים לב לאורך MATNR (40) במיפויים.",
    pmFrame: "באחזקה (PM) — ה-IDoc מעביר נתוני אובייקט/הודעה למערכת חיצונית",
    ppFrame: "בייצור תהליכי (PP-PI) — ה-IDoc מעביר אב-חומר/מתכון/אצווה (למשל Zetes/Daymax)",
  },
  cds: {
    kindHe: "CDS View",
    what: "מודל נתונים וירטואלי (Core Data Services) — שכבת הקריאה והאנליטיקה של S/4HANA, מוגדר ב-DDL עם push-down ל-HANA.",
    why: "קיים כדי להחליף גישה ישירה לטבלאות בקריאה, לחשוף נתונים ל-Fiori/OData ולאפשר Embedded Analytics.",
    who: "מפתחי S/4/Fiori, אנליסטים ויועצים — מודל קריאה, OData ודיווח.",
    when: "בבניית אפליקציות Fiori/OData, Embedded Analytics ודיווח על S/4HANA.",
    lifecycle: "מוגדר ב-DDL (ADT) → הופעל → push-down ל-HANA → נחשף כ-OData / Analytical Query.",
    troubleshooting: ["View לא קיים בגרסה → אמת release ושם נכון", "ביצועים → annotations/associations נכונים", "הרשאה → DCL (Access Control)", "מיפוי שגוי לטבלת ECC → אמת את ה-association"],
    interview: ["מה ההבדל בין CDS View ל-DB View קלאסי?", "מהו Released CDS (I_*) ולמה חשוב?", "כיצד CDS מאפשר Embedded Analytics?", "איך CDS מחליף SELECT ישיר ב-S/4?"],
    eccS4: "CDS הוא טכנולוגיית הליבה של S/4HANA לקריאה — כמעט לא קיים ב-ECC. מחליף גישה ישירה לטבלאות במודל הקריאה.",
    pmFrame: "באחזקה (PM) — ה-CDS חושף נתוני אובייקט טכני/הזמנה ל-Fiori ולאנליטיקה",
    ppFrame: "בייצור (PP-PI) — ה-CDS חושף נתוני מוצר/פקודה/BOM ל-Fiori ולאנליטיקה",
  },
  auth: {
    kindHe: "אובייקט הרשאה",
    what: "יחידת בדיקת ההרשאה הבסיסית — מקבץ שדות הרשאה (עד 10) שנבדקים יחד ב-AUTHORITY-CHECK.",
    why: "קיים כדי לאכוף הפרדת תפקידים ובקרת גישה ברמת הפעולה והאובייקט העסקי.",
    who: "צוות אבטחה/Basis, יועצי הרשאות ומבקרים — בניית תפקידים ואבחון כשלים.",
    when: "בבניית תפקידים (PFCG), אבחון 'אין הרשאה' (SU53) וביקורת (SUIM).",
    lifecycle: "מוגדר (SU21) → נבדק בקוד (AUTHORITY-CHECK) → ערכים מוקצים בתפקיד (PFCG/SU24) → פרופיל מיוצר → User Comparison.",
    troubleshooting: ["'אין הרשאה' → SU53/STAUTHTRACE → הוספה ב-PFCG", "ACTVT שגוי (03 במקום 02)", "Org level חסר (מפעל/אתר)", "User Comparison לא בוצע"],
    interview: ["מהו Authorization Object והקשר ל-AUTHORITY-CHECK?", "מה תפקיד SU24 בבניית תפקיד?", "כיצד מאבחנים כשל הרשאה?", "מה ההבדל בין Role ל-Profile?"],
    eccS4: "מודל ההרשאות זהה במהותו; מתווספים אובייקטים ו-Business Catalogs עבור Fiori/OData.",
    pmFrame: "באחזקה (PM) — האובייקט שולט בגישה לפעולות אחזקה (הזמנות/הודעות לפי מפעל)",
    ppFrame: "בייצור (PP-PI) — האובייקט שולט בגישה לפעולות ייצור (פקודות/שחרור לפי סוג)",
  },
};
