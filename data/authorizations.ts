// Security Center — authored reference on SAP authorization concepts & tooling.
// Hand-written, with troubleshooting + PM/PP examples. Not generated.

export interface AuthItem {
  slug: string;
  title: string;     // EN / T-Code
  he: string;
  kind: "Tcode" | "Concept";
  purpose: string;
  detail: string;
  failures: string[];      // common failures
  troubleshoot: string[];  // steps
  pmExample: string;
  ppExample: string;
  ecc: string;
  s4: string;
}

export const AUTH_ITEMS: AuthItem[] = [
  { slug: "su01", title: "SU01", he: "ניהול משתמשים", kind: "Tcode",
    purpose: "יצירה/שינוי/נעילה של חשבונות משתמש והקצאת תפקידים/פרופילים.",
    detail: "מנהל נתוני משתמש: סוג משתמש, תוקף, ברירת מחדל, הקצאת Roles (לשונית Roles) ו-Profiles.",
    failures: ["משתמש נעול לאחר ניסיונות שגויים", "תוקף סיסמה פג", "חסר תפקיד → אין הרשאה"],
    troubleshoot: ["בדוק נעילה/תוקף ב-SU01", "ודא Roles מוקצים ופעילים", "בדוק User Comparison (PFCG)"],
    pmExample: "הקצאת תפקיד טכנאי אחזקה למשתמש.", ppExample: "הקצאת תפקיד מתכנן ייצור.",
    ecc: "סטנדרטי.", s4: "זהה; חלופת Fiori 'Maintain Users' / IAM." },
  { slug: "pfcg", title: "PFCG", he: "מחולל התפקידים (Roles)", kind: "Tcode",
    purpose: "בניית תפקידים: תפריט, אובייקטי הרשאה, פרופיל, הקצאת משתמשים.",
    detail: "Single/Composite/Derived roles; לשונית Authorizations מייצרת פרופיל; דורש User Comparison לעדכון.",
    failures: ["פרופיל לא נוצר/לא עדכני (אדום/צהוב)", "User Comparison לא בוצע", "Org levels לא מולאו"],
    troubleshoot: ["ירוק בלשונית Authorizations + Generate", "בצע User Comparison", "מלא Org Levels (מפעל/אתר)"],
    pmExample: "תפקיד לטיפול בהזמנות אחזקה לפי מפעל (Org level).", ppExample: "תפקיד נגזר (Derived) לכל אתר ייצור.",
    ecc: "סטנדרטי.", s4: "זהה; תפקידי Business Catalog ל-Fiori מתווספים." },
  { slug: "su53", title: "SU53", he: "ניתוח כשל הרשאה", kind: "Tcode",
    purpose: "מציג את בדיקת ההרשאה האחרונה שנכשלה עבור המשתמש.",
    detail: "צילום מצב של אובייקט ההרשאה החסר וערכיו — הכלי הראשון לאבחון 'אין הרשאה'.",
    failures: ["מציג בדיקה ישנה (לא הכשל הנוכחי)", "ריק אם לא בוצעה בדיקה"],
    troubleshoot: ["בקש מהמשתמש להריץ מיד אחרי הכשל", "זהה את אובייקט ההרשאה + הערכים החסרים", "הוסף ב-PFCG"],
    pmExample: "טכנאי מקבל 'אין הרשאה' ב-IW31 → SU53 מצביע על I_AUART/מפעל חסר.", ppExample: "מתכנן חסום ב-CO01 → SU53 מצביע על C_AFKO_AWK.",
    ecc: "סטנדרטי.", s4: "זהה; לצד Trace ב-ST01/STAUTHTRACE." },
  { slug: "suim", title: "SUIM", he: "מערכת המידע למשתמשים", kind: "Tcode",
    purpose: "דוחות מי-למה: אילו משתמשים עם תפקיד/אובייקט/ערך, השוואות, היסטוריית שינויים.",
    detail: "מערך דוחות לביקורת הרשאות — לפי משתמש, תפקיד, פרופיל, אובייקט הרשאה, ערכים.",
    failures: ["תוצאות חלקיות בלי קריטריון מדויק", "בלבול בין role assignment לבין effective auth"],
    troubleshoot: ["דווח לפי אובייקט הרשאה + ערך", "השווה שני משתמשים", "בדוק תפקידים שפג תוקפם"],
    pmExample: "מי מורשה לסגור הזמנות אחזקה במפעל מסוים.", ppExample: "מי מורשה לשחרר פקודות ייצור.",
    ecc: "סטנדרטי.", s4: "זהה." },
  { slug: "auth-object", title: "Authorization Object", he: "אובייקט הרשאה", kind: "Concept",
    purpose: "יחידת הבדיקה הבסיסית — מקבץ עד 10 שדות הרשאה שנבדקים יחד (AUTHORITY-CHECK).",
    detail: "מאוחסן ב-class (אובייקט הרשאה); נבדק בקוד דרך AUTHORITY-CHECK; ערכים מוגדרים בתפקיד.",
    failures: ["שדה (כמו ACTVT/מפעל) חסר ערך", "בדיקה בקוד מול ערך שלא הוקצה"],
    troubleshoot: ["זהה את האובייקט ב-SU53/Trace", "הקצה ערכים ב-PFCG", "ודא ACTVT (01/02/03) נכון"],
    pmExample: "I_AUART (סוג הזמנה), I_SWERK (מפעל אחזקה).", ppExample: "C_AFKO_AWK (סוג פקודת ייצור).",
    ecc: "סטנדרטי.", s4: "זהה; מתווספים אובייקטים ל-Fiori/OData." },
  { slug: "actvt", title: "Activity (ACTVT)", he: "פעילות (ACTVT)", kind: "Concept",
    purpose: "שדה ההרשאה שמגדיר איזו פעולה מותרת — הצגה/שינוי/יצירה/מחיקה.",
    detail: "ערכים נפוצים: 01 יצירה, 02 שינוי, 03 הצגה, 06 מחיקה. רכיב כמעט בכל אובייקט הרשאה.",
    failures: ["נתנו 03 (הצגה) כשצריך 02 (שינוי)", "חסר 01 ליצירה"],
    troubleshoot: ["התאם ACTVT לפעולה הנדרשת", "בדוק ב-SU24 אילו ACTVT נדרשים לטרנזקציה"],
    pmExample: "טכנאי עם 03 בלבד לא יכול לפתוח הזמנה (צריך 01).", ppExample: "מתכנן עם 02 לשינוי פקודות.",
    ecc: "סטנדרטי.", s4: "זהה." },
  { slug: "su24", title: "SU24", he: "ערכי ברירת מחדל לטרנזקציה", kind: "Tcode",
    purpose: "מתחזק את הקשר טרנזקציה ↔ אובייקטי הרשאה (proposals ל-PFCG).",
    detail: "קובע אילו אובייקטים נמשכים אוטומטית לתפקיד כשמוסיפים T-Code לתפריט; בסיס לבניית תפקידים נקייה.",
    failures: ["אובייקט חסר ב-proposal → לא נכנס לתפקיד", "Check indicator שגוי"],
    troubleshoot: ["עדכן proposal ל-T-Code", "ודא Check/Maintain ב-SU24", "בנה מחדש תפקיד מתפריט"],
    pmExample: "ודא ש-IW31 מציע I_AUART/I_SWERK.", ppExample: "ודא ש-CO01 מציע C_AFKO_AWK.",
    ecc: "סטנדרטי.", s4: "זהה." },
  { slug: "profile", title: "Profile", he: "פרופיל הרשאה", kind: "Concept",
    purpose: "אוסף מקובץ של הרשאות שנוצר אוטומטית מתפקיד ומוקצה למשתמש בפועל.",
    detail: "PFCG מייצר פרופיל (שם מתחיל ב-T-...) מהתפקיד; הפרופיל הוא מה שנבדק בזמן ריצה.",
    failures: ["פרופיל לא נוצר/לא עדכני", "פרופיל לא הוקצה (User Comparison חסר)"],
    troubleshoot: ["Generate פרופיל ב-PFCG", "User Comparison", "בדוק הקצאה ב-SU01 לשונית Profiles"],
    pmExample: "פרופיל תפקיד טכנאי מוקצה אוטומטית.", ppExample: "פרופיל מתכנן ייצור.",
    ecc: "Profile Generator.", s4: "זהה." },
  { slug: "stauthtrace", title: "STAUTHTRACE / ST01", he: "מעקב הרשאות", kind: "Tcode",
    purpose: "מעקב חי אחר כל בדיקות ההרשאה — מדויק יותר מ-SU53 לתרחישים מורכבים.",
    detail: "STAUTHTRACE (חדש) / ST01 (authorization trace) מתעדים כל AUTHORITY-CHECK עם תוצאה (RC).",
    failures: ["SU53 לא מספיק לתהליך רב-שלבי", "כשל הרשאה לא ברור במסך אחד"],
    troubleshoot: ["הפעל trace למשתמש", "שחזר את התרחיש", "נתח RC≠0 → הוסף ב-PFCG"],
    pmExample: "אבחון כשל בתהליך אישור הזמנת אחזקה רב-שלבי.", ppExample: "אבחון כשל בעיבוד MRP→פקודה.",
    ecc: "ST01.", s4: "STAUTHTRACE מועדף." },
];

export const authBySlug = (s: string) => AUTH_ITEMS.find((a) => a.slug === s);
