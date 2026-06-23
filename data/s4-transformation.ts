// ===== S/4HANA Transformation Center — curated methodology layer =====
// Data-backed sections (Executive KPIs, Data-Model deltas, Simplification,
// Fiori, Module Impact) are DERIVED at render time from already-verified
// datasets: ECC_S4_TOPICS (data/ecc-s4), S4_IMPACT (data/s4-impact),
// TRANSACTIONS (data/transactions). This file adds only the methodology
// sections (custom-code / integration / testing / cutover / lessons) which are
// process knowledge, not table facts — standard SAP Activate / S/4HANA
// conversion practice. trust: curated. Anything uncertain → "needs-verification".

export type Trust = "curated" | "needs-verification";
export interface Row { he: string; sub?: string; ecc?: string; s4?: string; risk?: "high" | "medium" | "low"; trust?: Trust }

/* 9 — Custom Code Impact (ABAP readiness) */
export const CUSTOM_CODE: Row[] = [
  { he: "SELECT ישיר על MKPF / MSEG / MARD / MCHB", ecc: "קריאה/כתיבה ישירה לטבלאות המלאי.", s4: "הטבלאות הוחלפו ב-MATDOC; קיימות Compatibility Views לקריאה בלבד. כתיבה דרך BAPI/NSDM API.", risk: "high" },
  { he: "SELECT ישיר על BSIS/BSAS/BSIK/BSAK/BSID/BSAD/FAGLFLEXA", ecc: "טבלאות אינדקס/סיכום ל-FI.", s4: "הוחלפו ב-ACDOCA (Universal Journal); קוד קורא דרך Compatibility Views.", risk: "high" },
  { he: "אורך שדה חומר MATNR", ecc: "MATNR 18 תווים.", s4: "MATNR מורחב ל-40 תווים — בדוק MOVE, OFFSET, ALPHA conversion, ממשקים וברקודים.", risk: "high" },
  { he: "BAPI / Function Modules", ecc: "BAPIs לרישום מסמכים, אב נתונים, פקודות.", s4: "רוב ה-BAPIs נשמרים (BAPI_GOODSMVT_CREATE, BAPI_PRODORDCONF_*); חלק עם OData/CDS חלופי. בדוק deprecation.", risk: "medium" },
  { he: "User-Exits / Customer-Exits", ecc: "SMOD/CMOD, screen exits.", s4: "רובם נשמרים; חלק ממסכי ה-GUI שונו → בדוק exits תלויי-מסך.", risk: "medium" },
  { he: "BAdI / Enhancement Spots", ecc: "BAdIs קלאסיים וחדשים.", s4: "נשמרים; שקול BAdIs חדשים שנפתחו ב-S/4 לתהליכים שהשתנו.", risk: "low" },
  { he: "RFC / Remote FMs", ecc: "ממשקי RFC חיצוניים.", s4: "יציבים ברובם; בדוק מבני העברה מול MATNR 40 ושדות שהשתנו.", risk: "medium" },
  { he: "IDoc / ALE", ecc: "סוגי IDoc סטנדרטיים ומורחבים.", s4: "יציבים; בדוק סגמנטים מורחבים ושדות אורך.", risk: "low" },
  { he: "Output Management (NAST / SAPscript / Smartforms)", ecc: "NAST + תנאי פלט קלאסיים.", s4: "S/4 מקדמת BRF+ Output Management ו-Adobe Forms; NAST נתמך חלקית בתהליכים מסוימים.", risk: "medium" },
];
export const CUSTOM_CODE_NOTE = "כלי החובה: SAP Readiness Check, Simplification Item Catalog, ATC עם variant S4HANA_READINESS, ו-Custom Code Migration (SYCM). trust: curated — אמת מול גרסת היעד.";

/* 5 — Integration: recommended ECC vs S/4 */
export const INTEGRATION: { he: string; ecc: string; s4: string; trust?: Trust }[] = [
  { he: "תזמור אינטגרציה (Middleware)", ecc: "SAP PI / PO (dual-stack/single-stack).", s4: "SAP Integration Suite (Cloud Integration / CPI); PO ב-maintenance עד 2027/2030." },
  { he: "ממשקי API סינכרוניים", ecc: "RFC / BAPI / SOAP.", s4: "OData (V2/V4) ו-REST דרך SAP Gateway המוטמע; SOAP עדיין נתמך." },
  { he: "Gateway / OData", ecc: "Gateway hub נפרד (NW Gateway).", s4: "Gateway מוטמע (embedded) ב-S/4; שירותי OData דרך CDS + RAP." },
  { he: "מסרים אסינכרוניים", ecc: "IDoc / ALE / qRFC.", s4: "IDoc נשמר; מומלץ Events (Event Mesh) ו-SOAP/OData לתרחישים חדשים." },
  { he: "אנליטיקה ודיווח", ecc: "BW נפרד + Extractors.", s4: "Embedded Analytics (CDS) + SAP Datasphere + SAC; ODP/CDS extraction.", trust: "curated" },
  { he: "ניהול נתוני אב", ecc: "MDM קלאסי / ידני.", s4: "SAP MDG (Master Data Governance) מוטמע." },
];

/* 10 — Testing Center */
export const TESTING: Row[] = [
  { he: "Unit Test (ABAP)", sub: "ABAP Unit + ATC על קוד מותאם לאחר ההמרה." },
  { he: "Simplification / Readiness", sub: "הרצת SAP Readiness Check + פתרון Simplification Items רלוונטיים." },
  { he: "SIT — System Integration Test", sub: "תהליכים מקצה-לקצה חוצי-מודולים על מערכת מומרת." },
  { he: "Integration Test — ממשקים", sub: "IDoc/OData/CPI מול מערכות לוויין (Zetes/Daymax/בנקים)." },
  { he: "UAT — User Acceptance", sub: "תרחישי משתמש עסקיים אמיתיים + Fiori." },
  { he: "Regression", sub: "השוואת תוצאות ECC מול S/4 (דוחות, רישומים, מלאי, שכר)." },
  { he: "Performance", sub: "ריצות MRP/Backflush/חישוב שכר; pushdown ל-HANA, מדדי תגובה." },
  { he: "Data Migration Validation", sub: "Reconciliation אחרי LTMC — ספירות, יתרות, סכומי בקרה." },
];

/* 11 — Cutover & Go-Live */
export const CUTOVER: { phase: string; c: string; items: string[] }[] = [
  { phase: "לפני Go-Live", c: "#d97706", items: ["הקפאת שינויים (Change Freeze) + Transport Lock", "Dry-run מלא של Cutover Plan + מדידת חלון זמן", "סגירת תקופות, ניקוי תנועות פתוחות (COGI/IDoc 51)", "גיבוי + Fallback Plan", "אימות LTMC load sequence + reconciliation"] },
  { phase: "Go-Live", c: "#dc2626", items: ["העלאת נתוני פתיחה (יתרות מלאי, פתוחים, אב נתונים)", "אקטיבציה: Fiori catalogs, RFC/CPI, Output Management", "Smoke test תהליכי ליבה (Order→Confirm→GI)", "פתיחת מערכת למשתמשים + Command Center"] },
  { phase: "Hypercare", c: "#16a34a", items: ["ניטור צמוד (SM37, ST22, ODQMON, COGI)", "טיפול מהיר בתקלות (War Room)", "מעקב ביצועים + Tuning", "העברה הדרגתית לתמיכה שוטפת (KT)"] },
];

/* 12 — Lessons Learned (common real pitfalls) */
export const LESSONS: { he: string; sub: string; risk: "high" | "medium" | "low" }[] = [
  { he: "קוד Z שקורא ישירות ל-MKPF/MSEG/BSIS", sub: "הסיבה #1 לכשלי המרה — חובה ATC מוקדם ומעבר ל-Compatibility Views / NSDM.", risk: "high" },
  { he: "הרחבת MATNR ל-40 תווים", sub: "שובר ממשקים, ברקודים, MOVE עם offset קבוע. בדוק את כל ה-Zetes/Daymax.", risk: "high" },
  { he: "גרסת ייצור חובה ב-S/4", sub: "ב-PP-PI חובה Production Version תקפה — חוסר עוצר תכנון/פקודות.", risk: "medium" },
  { he: "Output Management NAST → BRF+", sub: "תהליכי פלט מסוימים דורשים הגדרה מחדש ב-BRF+ Output Management.", risk: "medium" },
  { he: "דוחות BW מול Embedded Analytics", sub: "החליטו מוקדם: BW/4HANA, Datasphere או Embedded — להימנע מכפילות.", risk: "medium" },
  { he: "תכנון Fiori ו-Authorizations מוקדם", sub: "מעבר GUI→Fiori דורש Catalogs/Groups + Business Roles; לא להשאיר לסוף.", risk: "low" },
];

/* 1 — Executive narrative (the ECC → S/4 'why' in one breath) */
export const EXEC_NARRATIVE =
  "S/4HANA אינו שדרוג גרסה אלא טרנספורמציה: מסד HANA in-memory מאפשר מודל נתונים פשוט (MATDOC, ACDOCA), חישוב מצרפים בזמן ריצה, דיווח חי (Embedded Analytics), חוויית Fiori, ואינטגרציה ענן (Integration Suite, Datasphere, SAC). הליבה הפונקציונלית נשמרת — אך מודל הנתונים, חוויית המשתמש, הדיווח והפיתוח משתנים מהותית.";
