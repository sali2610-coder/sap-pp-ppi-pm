// SAP Security & Authorizations Center — Phase 7.
// Users, roles, profiles, authorization objects, diagnostics (SU53/STAUTHTRACE/
// SUIM) and the Fiori/IAM model (catalogs, spaces/pages, business roles).
// Standard SAP security knowledge — tcodes, tables, auth objects and SAP Note
// refs are search keywords + component (NOT fabricated numbers). Incident slugs
// link to existing /troubleshooting entries. trust: curated.

export interface SecLink { label: string; href: string }
export interface SecIncident { slug: string; label: string }
export interface SecArea {
  id: string;
  he: string;
  en: string;
  cat: "admin" | "diag" | "object" | "roletype" | "fiori";
  color: string;
  what: string;
  when: string;
  tcodes: string[];
  tables: string[];
  troubleshooting: string[];
  debug: string[];
  ecc: string;
  s4: string;
  fiori: string;
  tips: string[];
  notes: string[];          // SAP Note search keywords + component
  incidents: SecIncident[];
  cbc: string;
  links: SecLink[];
}

export const SEC_CAT: Record<SecArea["cat"], { he: string; c: string }> = {
  admin: { he: "ניהול משתמשים ותפקידים", c: "#0d9488" },
  diag: { he: "אבחון הרשאות", c: "#dc2626" },
  object: { he: "אובייקטים ופרופילים", c: "#7c3aed" },
  roletype: { he: "סוגי תפקידים", c: "#2563eb" },
  fiori: { he: "מודל Fiori / IAM", c: "#d97706" },
};

const S4: SecLink = { label: "S/4HANA", href: "/s4hana/" };
const INTG: SecLink = { label: "אינטגרציה", href: "/integration/" };
const INC: SecLink = { label: "מרכז תקלות", href: "/incidents/" };

export const AREAS: SecArea[] = [
  {
    id: "su01", he: "SU01 — תחזוקת משתמש", en: "User Maintenance", cat: "admin", color: "#0f766e",
    what: "ניהול User Master Record — נתוני logon, סוג משתמש (Dialog/System/Service/Communication/Reference), קיבוצי תפקידים/פרופילים, נעילה, תוקף, נתוני ברירת מחדל.",
    when: "יצירה/שינוי/נעילה/איפוס סיסמה של משתמש; שיוך תפקידים; טיפול בנעילות וב-license type.",
    tcodes: ["SU01", "SU10 (מסה)", "SU3 (own data)", "SU01D (תצוגה)", "SUGR (קבוצות)"],
    tables: ["USR02 (logon/lock)", "USR04 (auth)", "USR21/ADRP", "AGR_USERS (תפקיד↔משתמש)", "USRBF2"],
    troubleshooting: ["משתמש נעול (USR02 — UFLAG): שגוי-סיסמה / מנהל / לא פעיל", "תפקיד שויך אך לא הוחל (חסר User Comparison)", "תוקף תפקיד פג", "סוג משתמש שגוי (Dialog מול System לממשק)"],
    debug: ["SU01 → Logon Data → סטטוס נעילה + Valid", "AGR_USERS לאימות שיוך + תוקף", "SUIM → משתמשים לפי תפקיד/פרופיל"],
    ecc: "User master קלאסי ב-GUI; קיבוץ תפקידי PFCG.", s4: "זהה במהותו; ב-S/4 מתווסף שיוך Business Roles (IAM) מעבר לתפקידי PFCG.",
    fiori: "ניהול משתמשים גם דרך אפליקציית Fiori 'Maintain Business Users' / Identity & Access Management.",
    tips: ["Service/System users לממשקים — לא Dialog (מונע נעילות סיסמה)", "תמיד User Comparison אחרי שיוך תפקיד", "SU10 לשינויי מסה"],
    notes: ["user locked USR02 UFLAG unlock SU01 · BC-SEC-USR", "user comparison required after role assignment · BC-SEC-USR-ADM"],
    incidents: [],
    cbc: "ב-CBC: משתמש ממשק (RFC) הוגדר כ-Dialog וננעל אחרי כשלי-סיסמה; הוסב ל-System user וננעלה נעילת המדיניות.",
    links: [{ label: "RFC users", href: "/integration/#rfc" }, S4, INC],
  },
  {
    id: "pfcg", he: "PFCG — תחזוקת תפקידים", en: "Role Maintenance (Profile Generator)", cat: "admin", color: "#0d9488",
    what: "כלי בניית התפקידים: תפריט (טרנזקציות/Fiori) → נתוני הרשאה (אובייקטים+ערכים) → יצירת Profile → שיוך משתמשים → User Comparison. הלב של אבטחת SAP.",
    when: "בניית/תחזוקת תפקיד; הוספת אובייקט הרשאה/ערך; יצירת פרופיל; השוואת משתמשים; ניהול Org Levels.",
    tcodes: ["PFCG", "SU24 (proposals)", "SU22", "PFCGMASSVAL", "SUPC (mass comparison)"],
    tables: ["AGR_DEFINE", "AGR_1251 (auth values)", "AGR_1252 (org levels)", "AGR_AGRS (composite)", "AGR_HIER (menu)"],
    troubleshooting: ["סטטוס אדום ב-Authorizations (ערכים חסרים)", "פרופיל לא נוצר/לא עדכני", "User Comparison אדום (תפקיד לא הוחל)", "Org Level לא מולא → חסר מפעל/חברה", "אובייקט maintained ידנית במקום SU24"],
    debug: ["PFCG → Authorizations → צבע סטטוס + Expert mode", "SU24 ליישור proposals לטרנזקציה", "AGR_1251 לאיתור אובייקט/ערך בתפקיד", "SUPC ליצירת פרופילים חסרים במסה"],
    ecc: "Profile Generator קלאסי; תפריט מבוסס טרנזקציות.", s4: "אותו כלי; התפריט כולל Fiori Tiles/Target Mappings + Catalogs; org levels זהים.",
    fiori: "תפקיד PFCG הוא הבסיס גם ל-Fiori — מכיל Catalogs/Groups (קלאסי) או Business Catalogs (חדש) + הרשאת S_SERVICE ל-OData.",
    tips: ["תמיד תחזק דרך SU24 → צבעי סטטוס ירוקים", "אל תערוך אובייקט ל-'Changed' ידני אם אפשר proposal", "Derived roles ל-org levels — לא לשכפל ידנית", "SUPC/SUPCX לאחר טרנספורט"],
    notes: ["PFCG authorization status red maintain values · BC-SEC-AUT-PFC", "generated profile not updated SUPC · BC-SEC-AUT-PFC", "SU24 maintain authorization defaults · BC-SEC-AUT-PFC"],
    incidents: [{ slug: "su53-missing-authorization-deep", label: "חסר הרשאה — PFCG/SU53" }],
    cbc: "ב-CBC: תפקיד טכנאי PM קיבל אדום ב-Authorizations — שדה I_SWERK (מפעל) ריק; מולא ב-Org Levels, נוצר פרופיל ובוצע User Comparison.",
    links: [{ label: "PM — הרשאות מפעל", href: "/pm/" }, { label: "מודל Fiori", href: "/security/#fiori" }, S4],
  },
  {
    id: "su53", he: "SU53 — בדיקת הרשאה אחרונה", en: "Failed Authorization Check", cat: "diag", color: "#dc2626",
    what: "מציג את בדיקת ההרשאה האחרונה שנכשלה עבור משתמש — האובייקט והערכים שחסרו. כלי אבחון מהיר 'אחרי המעשה'.",
    when: "משתמש מקבל 'אין הרשאה' — מריצים SU53 מיד אחרי הכשל (או צופים במשתמש אחר).",
    tcodes: ["SU53", "/nSU53 מתוך המסך הכושל"],
    tables: ["(נתוני זמן-ריצה — לא טבלה קבועה)"],
    troubleshooting: ["SU53 ריק (לא נשמרה בדיקה / רוענן)", "מראה רק את הכשל האחרון — לא תרחיש רב-שלבי", "כשל ב-RFC/batch לא נתפס נכון"],
    debug: ["הרץ SU53 מיד אחרי הכשל", "Authorization Values → האובייקט+הערך החסר", "לתרחיש מורכב/RFC → עבור ל-STAUTHTRACE"],
    ecc: "SU53 קלאסי ב-GUI.", s4: "זהה ב-GUI; באפליקציות Fiori SU53 פחות שימושי → מעדיפים STAUTHTRACE.",
    fiori: "ב-Fiori כשל הרשאה לרוב מצריך STAUTHTRACE (קריאת OData חוצה-שלבים) במקום SU53.",
    tips: ["SU53 = נקודת פתיחה מהירה; לא סוף פסוק", "אפשר לצפות ב-SU53 של משתמש אחר (אדמין)", "תרחיש רב-שלבי → STAUTHTRACE"],
    notes: ["SU53 last authorization check empty · BC-SEC-AUT", "SU53 display other user authorization · BC-SEC-AUT"],
    incidents: [{ slug: "su53-missing-authorization-deep", label: "אבחון SU53 / STAUTHTRACE" }],
    cbc: "ב-CBC: טכנאי נחסם ב-IW31 — SU53 הצביע על I_SWERK חסר; נוסף בתפקיד הנגזר ובוצע User Comparison.",
    links: [{ label: "STAUTHTRACE", href: "/security/#stauthtrace" }, { label: "PM — IW31", href: "/pm/" }, INC],
  },
  {
    id: "stauthtrace", he: "STAUTHTRACE — מעקב הרשאות", en: "Authorization Trace", cat: "diag", color: "#b91c1c",
    what: "מעקב הרשאות ברמת המערכת — מתעד את כל בדיקות AUTHORITY-CHECK בזמן אמת, כולל תרחישים רב-שלביים, RFC ו-batch. החליף את ST01 לצורכי הרשאות.",
    when: "כשל הרשאה מורכב; SU53 לא מספיק; קריאות RFC/OData/batch; הבנת כל האובייקטים הנדרשים לתהליך.",
    tcodes: ["STAUTHTRACE", "STUSERTRACE", "ST01 (legacy)"],
    tables: ["(trace buffer — לא קבוע)"],
    troubleshooting: ["Trace לא הופעל/לא מסונן למשתמש", "ריבוי רשומות → קשה לסנן", "Trace לא רץ ב-app server אחר (בסביבה מבוזרת)"],
    debug: ["הפעל Trace למשתמש/מסונן → שחזר את הכשל → Evaluate", "סנן ל-RC=4/RC=12 (failed)", "השווה לאובייקטים שב-PFCG/SU24"],
    ecc: "STAUTHTRACE זמין; ST01 הישן עדיין קיים.", s4: "STAUTHTRACE הוא הכלי המומלץ — קריטי ל-Fiori (קריאות OData חוצות שלבים).",
    fiori: "חיוני ל-Fiori: בקשת OData עוברת Gateway→backend, וכשל הרשאה צץ בשלב שלא נראה ב-SU53.",
    tips: ["סנן לפי משתמש לפני שחזור", "STUSERTRACE לאיסוף לאורך זמן", "תמיד הרץ בסביבת בדיקה תחת אותו תרחיש משתמש"],
    notes: ["STAUTHTRACE system trace authorization filter · BC-SEC-AUT", "Fiori OData authorization trace · BC-SEC-AUT"],
    incidents: [{ slug: "su53-missing-authorization-deep", label: "STAUTHTRACE — תרחיש רב-שלבי" }],
    cbc: "ב-CBC: אפליקציית Fiori להזמנות עבודה החזירה 'no auth' — STAUTHTRACE חשף הרשאת S_SERVICE חסרה לשירות ה-OData; נוספה לתפקיד.",
    links: [{ label: "OData / S_SERVICE", href: "/integration/#odata" }, { label: "SU53", href: "/security/#su53" }, S4],
  },
  {
    id: "suim", he: "SUIM — מערכת מידע משתמשים", en: "User Information System", cat: "diag", color: "#ea580c",
    what: "מערכת דוחות לאבטחה: משתמשים לפי תפקיד/פרופיל/אובייקט, תפקידים לפי טרנזקציה, where-used של אובייקט הרשאה, שינויי תפקיד/משתמש, משתמשים עם הרשאות קריטיות.",
    when: "ביקורת (audit), 'מי יכול להריץ X', 'אילו תפקידים מכילים אובייקט Y', איתור SAP_ALL, ניתוח SoD בסיסי.",
    tcodes: ["SUIM", "S_BCE_* (דוחות)", "RSUSR002 / RSUSR008_009_NEW"],
    tables: ["AGR_1251", "AGR_USERS", "USOBT_C / USOBX_C", "USR02"],
    troubleshooting: ["דוח על נתוני profile לא-עדכניים (לא הוחל User Comparison)", "ביצועים בדוחות רחבים", "תוצאה כוללת תפקידים שפג תוקפם"],
    debug: ["RSUSR002 — משתמשים לפי קריטריוני הרשאה מורכבים", "RSUSR070 — תפקידים לפי אובייקט/ערך", "Cross-system: SUIM לוקאלי בכל מערכת"],
    ecc: "SUIM קלאסי.", s4: "זהה; חשוב גם לניתוח Business Roles/Catalogs.",
    fiori: "דוחות SUIM עדיין רלוונטיים; בנוסף אפליקציות IAM ב-Fiori לניתוח business roles.",
    tips: ["RSUSR002 הוא ה-go-to לביקורת", "אתר SAP_ALL/SAP_NEW בפרודקשן", "שלב עם STAUTHTRACE לתמונה מלאה"],
    notes: ["SUIM RSUSR002 users by authorization · BC-SEC-AUT", "find users with SAP_ALL profile · BC-SEC-AUT"],
    incidents: [],
    cbc: "ב-CBC: ביקורת דרשה 'מי מורשה לשחרר הזמנות רכש' — RSUSR070 לפי M_BEST_BSA הניב את רשימת התפקידים והמשתמשים.",
    links: [{ label: "MM — שחרור רכש", href: "/sap-infrastructure/" }, { label: "Migration — תפקידים", href: "/migration-cockpit/" }, INC],
  },
  {
    id: "authobjects", he: "אובייקטי הרשאה", en: "Authorization Objects", cat: "object", color: "#7c3aed",
    what: "אובייקט הרשאה = עד 10 שדות שנבדקים יחד ב-AUTHORITY-CHECK. דוגמאות: S_TCODE (קוד טרנזקציה), S_RFC (קבוצת FM), S_SERVICE (OData/web), I_SWERK (מפעל PM), M_BEST_BSA (רכש). מחולקים ל-classes (SU21).",
    when: "הבנת מה נבדק; הוספת אובייקט לתפקיד; פתרון כשל הרשאה; כתיבת AUTHORITY-CHECK ב-Z.",
    tcodes: ["SU21 (objects)", "SU20 (fields)", "SU24 (proposals)", "AUTH (ב-PFCG)"],
    tables: ["TOBJ (objects)", "TACT/TACTZ (ACTVT)", "USOBT_C / USOBX_C (defaults)", "AGR_1251"],
    troubleshooting: ["ACTVT שגוי (03 תצוגה במקום 02 שינוי)", "Org field לא מולא", "אובייקט לא מוצע (SU24) → maintained ידנית", "Z-code עם AUTHORITY-CHECK חסר"],
    debug: ["STAUTHTRACE → איזה אובייקט+שדה נכשל", "SU24 → proposals לטרנזקציה", "SE93 → איזה אובייקט מקושר לטרנזקציה", "TACT ל-ACTVT חוקיים"],
    ecc: "אובייקטים קלאסיים; S_TCODE מגן על הרצת טרנזקציה.", s4: "מתווספים S_SERVICE (OData), אובייקטי Fiori; חלק מהטרנזקציות הוחלפו באפליקציות.",
    fiori: "S_SERVICE שולט בגישה ל-OData service; בנוסף אובייקטי קטלוג/קבוצה. עדיין נבדקים אובייקטי היישום (למשל I_SWERK).",
    tips: ["למד ACTVT: 01 צור / 02 שנה / 03 הצג / 06 מחק", "S_TCODE לבד לא מספיק — צריך גם אובייקטי היישום", "Z-tcode חדש → תחזק SU24"],
    notes: ["authorization object ACTVT TACT values · BC-SEC-AUT", "S_SERVICE OData authorization · BC-SEC-AUT"],
    incidents: [{ slug: "su53-missing-authorization-deep", label: "אובייקט/ACTVT חסר" }],
    cbc: "ב-CBC: משתמש יכל להציג אך לא לשנות הזמנת ייצור — ACTVT=03 בלבד באובייקט; נוסף 02 ונפתר.",
    links: [{ label: "S_RFC", href: "/security/#authobjects" }, { label: "אינטגרציה — S_RFC", href: "/integration/#rfc" }, INC],
  },
  {
    id: "profiles", he: "פרופילים", en: "Profiles (incl. SAP_ALL)", cat: "object", color: "#6d28d9",
    what: "Profile = אוסף הרשאות שנוצר אוטומטית ע\"י PFCG מנתוני התפקיד (Generated Profile). פרופילים מורכבים: SAP_ALL (הכל), SAP_NEW (אובייקטים חדשים אחרי שדרוג). הרשאה בפועל = הפרופילים שמשויכים למשתמש.",
    when: "הבנת מה משתמש מקבל בפועל; שדרוג (SAP_NEW); הימנעות מ-SAP_ALL בפרודקשן; פתרון 'הפרופיל לא עדכני'.",
    tcodes: ["SU02 (manual profiles — legacy)", "PFCG (generated)", "SU56 (user buffer)"],
    tables: ["USR04 / UST04", "USR10 / UST10S", "AGR_1016 (תפקיד↔profile)"],
    troubleshooting: ["Generated profile לא עדכני (לא בוצע compare)", "User buffer ישן (SU56)", "SAP_ALL בפרודקשן — סיכון אבטחה", "SAP_NEW לא תוחזק אחרי שדרוג"],
    debug: ["SU56 → User Buffer בפועל", "PFCG → Generate + User Comparison", "RSUSR002 לאיתור SAP_ALL"],
    ecc: "פרופילים ידניים (SU02) עדיין אפשריים אך נדיר; generated מ-PFCG הוא הסטנדרט.", s4: "זהה; דגש על מזעור SAP_ALL והעדפת business roles.",
    fiori: "פרופיל מכיל גם את הרשאות ה-OData/קטלוג שנוצרו מתפריט ה-Fiori בתפקיד.",
    tips: ["לעולם לא SAP_ALL בפרודקשן (אלא חירום מתועד)", "תחזק SAP_NEW כחלק מ-upgrade", "SU56 לבדיקת מה באמת בתוקף"],
    notes: ["SAP_ALL production risk emergency user · BC-SEC-AUT", "SAP_NEW maintenance after upgrade · BC-SEC-AUT", "user buffer SU56 refresh · BC-SEC-USR"],
    incidents: [],
    cbc: "ב-CBC: לאחר שדרוג, משתמשים קיבלו שגיאות הרשאה חדשות — SAP_NEW לא תוחזק; בוצע יישור ובדיקת SU24 לאובייקטים החדשים.",
    links: [{ label: "Migration / Upgrade", href: "/migration-cockpit/" }, S4, INC],
  },
  {
    id: "single", he: "Single Role", en: "Single Role", cat: "roletype", color: "#1d4ed8",
    what: "תפקיד יחיד — היחידה הבסיסית: מכיל תפריט (טרנזקציות/Fiori) + נתוני הרשאה + פרופיל. רוב התחזוקה מתבצעת ברמת ה-Single Role.",
    when: "בניית בלוק הרשאות פונקציונלי (למשל 'מתכנן ייצור', 'טכנאי תחזוקה'); הוא ה-building block ל-composite/derived.",
    tcodes: ["PFCG"],
    tables: ["AGR_DEFINE", "AGR_1251", "AGR_HIER"],
    troubleshooting: ["תפקיד 'שמן' מדי (יותר מדי טרנזקציות)", "ערבוב org levels בתוך single (עדיף derived)", "אדום ב-authorizations"],
    debug: ["PFCG → Menu + Authorizations", "SU24 ליישור", "פיצול לפי תהליך עסקי"],
    ecc: "Single role קלאסי.", s4: "זהה; כולל Fiori tiles/catalogs.",
    fiori: "Single role יכול לשאת Business Catalogs ו-Spaces ישירות.",
    tips: ["עיצוב לפי תפקיד עסקי, לא לפי אדם", "שמור single roles 'נקיים' לפי תהליך", "org-level variance → derived"],
    notes: ["single role design best practice PFCG · BC-SEC-AUT-PFC"],
    incidents: [],
    cbc: "ב-CBC: נבנה single role 'מתכנן PP-PI' עם טרנזקציות COR1/COR2/MD04 ואובייקטי הרשאה תואמים — שוכפל ל-derived לפי מפעל.",
    links: [{ label: "PP-PI", href: "/pp-pi/" }, { label: "Derived Roles", href: "/security/#derived" }, { label: "Role Design", href: "/security/#roledesign" }],
  },
  {
    id: "composite", he: "Composite Role", en: "Composite Role", cat: "roletype", color: "#2563eb",
    what: "תפקיד מורכב — אוסף (container) של Single Roles. אין לו נתוני הרשאה משלו; הוא רק מקבץ. משויך למשתמש במקום עשרות single roles.",
    when: "כשמשתמש זקוק לכמה בלוקים פונקציונליים (למשל 'מנהל משמרת' = ייצור + איכות + דוחות); פישוט הקצאת תפקידים.",
    tcodes: ["PFCG (Composite)"],
    tables: ["AGR_AGRS (composite↔single)", "AGR_USERS"],
    troubleshooting: ["שינוי הרשאה לא 'נכנס' — צריך לשנות את ה-single, לא ה-composite", "User Comparison של composite", "single חסר בתוך composite"],
    debug: ["PFCG → Roles tab (אילו singles)", "User Comparison ברמת composite", "תקן ב-single המתאים"],
    ecc: "Composite קלאסי.", s4: "זהה; שים לב שהמודל החדש מעדיף business roles.",
    fiori: "Composite יכול לקבץ single roles הנושאים catalogs; אך ב-S/4 Business Role הוא המנגנון המודרני.",
    tips: ["אל תתחזק הרשאות ב-composite (אין לו)", "Composite להקצאה, Single לתחזוקה", "User Comparison חובה גם ב-composite"],
    notes: ["composite role no authorization data maintain single · BC-SEC-AUT-PFC"],
    incidents: [],
    cbc: "ב-CBC: 'מנהל משמרת' הוגדר כ-composite מ-3 singles (ייצור/איכות/דוחות); שינוי הרשאה בוצע ב-single הייצור והוחל מחדש.",
    links: [{ label: "Single Role", href: "/security/#single" }, { label: "Business Roles", href: "/security/#fiori" }],
  },
  {
    id: "derived", he: "Derived Role", en: "Derived Role", cat: "roletype", color: "#0ea5e9",
    what: "תפקיד נגזר — יורש תפריט ונתוני הרשאה מ-Parent (imparting) role, ונבדל ממנו אך ורק ב-Organizational Levels (מפעל/חברה/אזור). מנגנון להרחבה לפי ארגון בלי שכפול.",
    when: "אותו תפקיד פונקציונלי על פני מספר מפעלים/חברות — למשל 'טכנאי PM' למפעל 1000 מול 2000.",
    tcodes: ["PFCG (Derive from role)", "PFCGMASSVAL"],
    tables: ["AGR_DEFINE (parent ref)", "AGR_1252 (org levels)"],
    troubleshooting: ["שינוי בהורה לא הופץ ל-derived (חסר Generate/adjust)", "Org level שונה לא מולא ב-derived", "ניתוק הקשר parent בטעות"],
    debug: ["PFCG → 'Adjust derived roles' אחרי שינוי הורה", "AGR_1252 לאימות org levels", "PFCGMASSVAL לעדכון מסה"],
    ecc: "Derived roles קלאסי.", s4: "זהה; קריטי בנופי רב-מפעלי.",
    fiori: "המבנה הנגזר חל גם כשהתפריט כולל Fiori — רק ה-org levels משתנים.",
    tips: ["שנה הרשאות בהורה בלבד → adjust derived", "derived = רק org levels שונים", "PFCGMASSVAL לעדכון רוחבי"],
    notes: ["derived role adjust from parent org levels · BC-SEC-AUT-PFC", "PFCGMASSVAL mass org level · BC-SEC-AUT-PFC"],
    incidents: [{ slug: "su53-missing-authorization-deep", label: "Org level חסר ב-derived" }],
    cbc: "ב-CBC: תפקיד טכנאי PM נגזר ל-3 מפעלים; הרשאה חדשה נוספה בהורה ו-'Adjust derived roles' הפיץ לכל הנגזרים.",
    links: [{ label: "PM — מפעלים", href: "/pm/" }, { label: "Single Role", href: "/security/#single" }, { label: "Role Design", href: "/security/#roledesign" }],
  },
  {
    id: "catalogs", he: "Fiori Catalogs & Groups", en: "Catalogs / Groups (classic launchpad)", cat: "fiori", color: "#d97706",
    what: "במודל ה-Fiori הקלאסי: Business Catalog = אוסף Tiles + Target Mappings (איזה אפליקציות מותרות); Group = ארגון ויזואלי של tiles בלאנצ'פד. משויכים לתפקיד PFCG יחד עם הרשאת S_SERVICE.",
    when: "מתן גישה לאפליקציות Fiori (לפני מודל spaces/pages); הגדרת מה רואה המשתמש בלאנצ'פד.",
    tcodes: ["PFCG (Fiori tab)", "/UI2/FLPD_CUST", "/UI2/FLPCM_CUST", "/IWFND/MAINT_SERVICE"],
    tables: ["/UI2/* (designer)", "AGR_1251 (S_SERVICE)"],
    troubleshooting: ["Tile מוגדר אך לא מופיע (חסר target mapping/role)", "אפליקציה נפתחת אך 'no auth' (חסר S_SERVICE/אובייקט יישום)", "קטלוג לא משויך לתפקיד"],
    debug: ["בדוק catalog↔role↔S_SERVICE", "STAUTHTRACE לכשל OData", "/IWFND/MAINT_SERVICE לרישום השירות"],
    ecc: "לא רלוונטי (Fiori = S/4 / Gateway).", s4: "המודל הקלאסי; נדחק לטובת Spaces & Pages אך עדיין נתמך.",
    fiori: "זהו הליבה — Catalog (authorization) מול Group (visual). Business Role מקשר אותם.",
    tips: ["Catalog = הרשאה, Group = תצוגה — אל תבלבל", "תמיד S_SERVICE + אובייקט יישום", "מעבר ל-Spaces/Pages במודל החדש"],
    notes: ["Fiori catalog tile not visible target mapping · CA-FLP-FE-COR", "Fiori app no authorization S_SERVICE · BC-SEC-AUT"],
    incidents: [],
    cbc: "ב-CBC: tile 'Manage Maintenance Orders' לא הופיע — הקטלוג לא שויך לתפקיד; שויך, נוסף S_SERVICE ובוצע compare.",
    links: [{ label: "OData", href: "/integration/#odata" }, { label: "Spaces & Pages", href: "/security/#spaces" }, S4],
  },
  {
    id: "spaces", he: "Spaces & Pages + Business Roles", en: "Spaces / Pages / Business Roles", cat: "fiori", color: "#f59e0b",
    what: "המודל המודרני של S/4 Launchpad: Space = אזור ניווט למשתמש, Page = פריסת sections+tiles בתוך space. Business Role (IAM) מקבץ Business Catalogs + Spaces ומשויך למשתמש — היורש של ה-Groups הקלאסיים.",
    when: "ב-S/4HANA (במיוחד Cloud / fresh) — מודל הלאנצ'פד והרשאות המודרני; ארגון חוויית משתמש לפי תפקיד עסקי.",
    tcodes: ["Manage Launchpad Spaces (Fiori)", "Maintain Business Roles (IAM)", "PFCG (עדיין לבסיס)"],
    tables: ["/UI2/* + IAM repositories"],
    troubleshooting: ["Space לא מוצג (לא משויך ל-business role / לא פעיל)", "Page ריקה (catalogs חסרים)", "כפילות בין Groups ל-Spaces בזמן מעבר"],
    debug: ["בדוק Business Role → Catalogs + Spaces", "ודא Space פעיל ומשויך", "STAUTHTRACE לכשלי הרשאה"],
    ecc: "לא רלוונטי.", s4: "Spaces & Pages הוא ברירת המחדל ב-S/4 1909+; Business Roles ב-S/4 Cloud הם המודל המרכזי.",
    fiori: "Business Catalog (הרשאה) → Business Role (קיבוץ) → Space/Page (תצוגה) → משתמש. ב-Cloud מנוהל דרך IAM apps.",
    tips: ["Spaces/Pages מחליפים Groups — תכנן מעבר", "Business Role ≈ הרשאה+תצוגה מאוחדים", "Cloud = IAM apps; On-prem = PFCG+spaces"],
    notes: ["S/4HANA spaces pages launchpad assignment · CA-FLP-FE-COR", "business role catalog space assignment IAM · BC-SEC-AUT"],
    incidents: [],
    cbc: "ב-CBC (S/4 הערכה): נבנה Space 'תחזוקה' עם Page לטכנאים; Business Role קישר את ה-Business Catalogs של PM וה-Space, ושויך למשתמשים.",
    links: [{ label: "PM — תחזוקה", href: "/pm/" }, { label: "Catalogs (קלאסי)", href: "/security/#catalogs" }, { label: "Delivery — S/4", href: "/delivery/" }],
  },
];

// 1. Security architecture overview — layered model
export const SEC_ARCH: { layer: string; he: string; items: string[]; c: string }[] = [
  { layer: "Authentication", he: "אימות", items: ["Logon (סיסמה/SSO)", "SNC / SSL (STRUST)", "סוגי משתמש (Dialog/System/Service)"], c: "#0ea5e9" },
  { layer: "User Master", he: "רשומת משתמש", items: ["SU01 / SU10", "USR02 / USR04", "license / valid / lock"], c: "#0d9488" },
  { layer: "Roles", he: "תפקידים", items: ["PFCG", "Single / Composite / Derived", "AGR_* tables"], c: "#2563eb" },
  { layer: "Authorizations", he: "הרשאות", items: ["Generated Profile", "אובייקטי הרשאה (S_TCODE/S_RFC/S_SERVICE)", "שדות + ACTVT + Org Levels"], c: "#7c3aed" },
  { layer: "Runtime Check", he: "בדיקת זמן-ריצה", items: ["AUTHORITY-CHECK", "User Buffer (SU56)", "SU53 / STAUTHTRACE"], c: "#dc2626" },
  { layer: "Fiori / IAM", he: "שכבת Fiori", items: ["Catalogs / Groups", "Spaces / Pages", "Business Roles (IAM)"], c: "#d97706" },
];

// 2. Authorization troubleshooting flow — ordered diagnostic steps
export const TROUBLE_FLOW: { step: string; t: string; do: string }[] = [
  { step: "1. שחזר וקבל SU53", t: "SU53", do: "הרץ מיד אחרי הכשל — קבל אובייקט+ערך חסר" },
  { step: "2. תרחיש מורכב? Trace", t: "STAUTHTRACE", do: "סנן למשתמש, שחזר, סנן ל-RC=4/12" },
  { step: "3. מי/מה דורש?", t: "SU24 / SE93", do: "אילו אובייקטים מוצעים לטרנזקציה" },
  { step: "4. תקן בתפקיד", t: "PFCG", do: "הוסף אובייקט/ערך/Org level; Generate" },
  { step: "5. החל", t: "User Comparison", do: "PFCG compare + SU56 buffer refresh" },
  { step: "6. אמת", t: "SUIM / חזרה", do: "RSUSR002 + שחזור התרחיש מחדש" },
];

// 3. Role design workspace — principles
export const ROLE_DESIGN: { he: string; sub: string }[] = [
  { he: "עיצוב לפי תפקיד עסקי", sub: "Role = job function ('מתכנן ייצור'), לא אדם ספציפי" },
  { he: "Single = building block", sub: "תפקיד נקי לפי תהליך; תחזוקת הרשאות כאן" },
  { he: "Composite = קיבוץ", sub: "אוסף singles להקצאה; אין לו הרשאות משלו" },
  { he: "Derived = org variance", sub: "אותו פונקציונלי, רק מפעל/חברה שונים — בלי שכפול" },
  { he: "SU24-driven", sub: "תחזק proposals → צבעי סטטוס ירוקים ב-PFCG" },
  { he: "Naming convention", sub: "Z<area>_<process>_<level> עקבי וניתן לחיפוש" },
  { he: "מינימום הרשאות", sub: "Least privilege; אין SAP_ALL בפרודקשן; SoD" },
  { he: "Org Levels", sub: "מפעל/חברה/אזור כ-org fields → derived, לא ערכים קשיחים" },
];

// 4. Fiori authorization model — component chain
export const FIORI_MODEL: { he: string; sub: string; c: string }[] = [
  { he: "OData Service", sub: "השירות מאחורי האפליקציה — מוגן ב-S_SERVICE + /IWFND/MAINT_SERVICE", c: "#2563eb" },
  { he: "Business Catalog", sub: "אוסף אפליקציות + Target Mappings = שכבת ההרשאה", c: "#7c3aed" },
  { he: "Group / Space+Page", sub: "התצוגה בלאנצ'פד — Group (קלאסי) / Spaces & Pages (חדש)", c: "#d97706" },
  { he: "Business Role / PFCG", sub: "מקשר Catalog+Space ומשויך למשתמש (IAM ב-Cloud)", c: "#0d9488" },
  { he: "אובייקטי יישום", sub: "עדיין נבדקים (I_SWERK וכו') — Fiori לא מבטל אותם", c: "#dc2626" },
];

// 5. Common errors center
export const SEC_ERRORS: { err: string; cause: string; fix: string }[] = [
  { err: "You are not authorized to … (object X)", cause: "אובייקט/ערך חסר בתפקיד", fix: "SU53/STAUTHTRACE → הוסף ב-PFCG → compare" },
  { err: "No authorization to start transaction Y", cause: "חסר S_TCODE לערך הטרנזקציה", fix: "הוסף Y ל-S_TCODE + אובייקטי היישום" },
  { err: "No RFC authorization for function group", cause: "S_RFC חסר/שגוי", fix: "הוסף קבוצת FM ל-S_RFC (RFC_TYPE=FUGR)" },
  { err: "Fiori app: 'App could not be started' / 403", cause: "S_SERVICE / catalog / OData לא רשום", fix: "STAUTHTRACE + /IWFND/MAINT_SERVICE + catalog↔role" },
  { err: "תפקיד שויך אך עדיין אין הרשאה", cause: "User Comparison לא בוצע / buffer ישן", fix: "PFCG compare + SU56 refresh" },
  { err: "אחרי שדרוג — שגיאות הרשאה חדשות", cause: "SAP_NEW/SU24 לא תוחזקו", fix: "תחזק SAP_NEW + יישר SU24" },
];

// 6. Interview questions for a new consultant
export const SEC_INTERVIEW: { q: string; a: string }[] = [
  { q: "מה ההבדל בין Single, Composite ו-Derived role?", a: "Single = בלוק בסיסי עם תפריט+הרשאות. Composite = קיבוץ singles ללא הרשאות משלו. Derived = יורש מהורה ונבדל רק ב-Org Levels." },
  { q: "מתי SU53 לא מספיק ומה במקום?", a: "בתרחיש רב-שלבי / RFC / OData(Fiori) — מציג רק את הכשל האחרון. עוברים ל-STAUTHTRACE שמתעד את כל בדיקות AUTHORITY-CHECK." },
  { q: "מה עושה User Comparison ולמה הוא קריטי?", a: "מסנכרן את הפרופיל שנוצר בתפקיד ל-user master / buffer. בלעדיו השיוך לא נכנס לתוקף בפועל." },
  { q: "מהו S_TCODE ולמה הוא לא מספיק לבדו?", a: "מגן על הרצת טרנזקציה. צריך בנוסף את אובייקטי היישום (למשל I_SWERK ב-PM, ACTVT) כדי לבצע בפועל." },
  { q: "כיצד משתנה מודל ההרשאות ב-Fiori מול GUI?", a: "מתווסף S_SERVICE ל-OData, Business Catalogs/Groups או Spaces/Pages, ו-Business Roles (IAM). אובייקטי היישום עדיין נבדקים." },
  { q: "למה SAP_ALL אסור בפרודקשן וכיצד מטפלים בחירום?", a: "מעקף מוחלט של בקרות → סיכון + כשל ביקורת/SoD. חירום → Emergency/Firefighter user מתועד ומבוקר (לוג), לא הקצאה קבועה." },
  { q: "מה תפקיד SU24 בעיצוב תפקידים?", a: "מתחזק proposals (אילו אובייקטים נדרשים לטרנזקציה) → PFCG ממלא אוטומטית (צבעי סטטוס) במקום תחזוקה ידנית שגיאתית." },
  { q: "כיצד תאתר 'מי מורשה לפעולה X' לביקורת?", a: "SUIM → RSUSR002 (לפי קריטריוני הרשאה) / RSUSR070 (לפי אובייקט+ערך), חוצה תפקידים ומשתמשים." },
];

export const SEC_META = {
  he: "מרכז אבטחה והרשאות SAP",
  sub: "משתמשים, תפקידים, פרופילים, אובייקטי הרשאה, אבחון (SU53/STAUTHTRACE/SUIM) ומודל Fiori/IAM. ארכיטקטורה, זרימת אבחון, סדנת עיצוב תפקידים, שגיאות נפוצות ושאלות ראיון. ידע SAP סטנדרטי. trust: curated.",
  count: AREAS.length,
};
