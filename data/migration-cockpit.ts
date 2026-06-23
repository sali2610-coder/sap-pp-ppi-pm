// ===== SAP S/4HANA Migration Cockpit — center data =====
// Research-based. Migration object names follow the real SAP S/4HANA Migration
// Cockpit (LTMC / "Migrate Your Data" Fiori app) standard content. Load-sequence
// (dependsOn) reflects real master→transactional dependencies. trust: curated;
// anything uncertain is tagged needs-verification. Nothing invented.

export type Trust = "curated" | "needs-verification";
export type MigCat = "Foundation" | "Master" | "Transactional" | "HR";

/* 1 — Migration approaches (Cockpit Explorer) */
export interface Approach { id: string; he: string; en: string; desc: string; when: string; note?: string; trust: Trust }
export const APPROACHES: Approach[] = [
  { id: "staging", he: "טבלאות Staging (LTMC)", en: "Staging Tables", desc: "נתונים נטענים לטבלאות staging ב-HANA (דרך SQL/ETL/קובץ), עוברים אימות ומופצים לטרגט.", when: "נפח גדול, ETL, אוטומציה, טעינות חוזרות.", note: "הגישה המומלצת ב-S/4 מודרני (Fiori 'Migrate Your Data').", trust: "curated" },
  { id: "file", he: "העלאת קובץ (XML)", en: "File Upload", desc: "מילוי תבניות XML/Spreadsheet סטנדרטיות והעלאה ל-Cockpit.", when: "נפח קטן-בינוני, ללא תשתית ETL.", trust: "curated" },
  { id: "ltmom", he: "Migration Object Modeler (LTMOM)", en: "Migration Object Modeler", desc: "התאמת אובייקטי הגירה: שדות, חוקי מיפוי, מבני מקור, ולידציות מותאמות.", when: "כשצריך להתאים אובייקט סטנדרטי או לבנות אובייקט מותאם.", trust: "curated" },
  { id: "direct", he: "Direct Transfer (RFC)", en: "Direct Transfer from SAP", desc: "העברה ישירה ממערכת SAP מקור (ECC) דרך RFC, ללא קבצים — מבוסס תוכן מובנה.", when: "מקור SAP (ECC) זמין; פחות התאמה.", note: "תלוי גרסת מקור/יעד — אמת תאימות.", trust: "needs-verification" },
  { id: "notes", he: "SAP Notes & תיעוד", en: "SAP Notes", desc: "הערות SAP מרכזיות ל-Migration Cockpit, תוכן אובייקטים וגרסאות.", when: "תכנון, פתרון תקלות, בדיקת תאימות גרסה.", note: "מספרי Note תלויי-גרסה — אמת ב-launchpad.support.sap.com.", trust: "needs-verification" },
];

/* 2/3 — Migration objects library + load sequence */
export interface MigObj {
  id: string; name: string; he: string; cat: MigCat; module: string;
  keys: string;           // key fields
  dependsOn: string[];    // ids that must load first → load sequence
  ecc: string[];          // source ECC tables
  risk: "high" | "medium" | "low";
  note: string; trust: Trust;
}
const M = (o: MigObj): MigObj => o;
export const MIG_OBJECTS: MigObj[] = [
  /* Foundation (load first) */
  M({ id: "bp", name: "Business Partner", he: "שותף עסקי", cat: "Foundation", module: "Cross", keys: "Partner", dependsOn: [], ecc: ["BUT000", "KNA1", "LFA1"], risk: "high", note: "BP הוא הבסיס ללקוח/ספק ב-S/4 (CVI). חובה לטעון ראשון.", trust: "curated" }),
  M({ id: "glaccount", name: "G/L Account", he: "חשבון ראשי", cat: "Foundation", module: "FI", keys: "Chart of accounts + Account", dependsOn: [], ecc: ["SKA1", "SKB1"], risk: "medium", note: "בסיס לרישומים פיננסיים.", trust: "curated" }),
  M({ id: "costcenter", name: "Cost Center", he: "מרכז עלות", cat: "Foundation", module: "CO", keys: "Controlling area + Cost center", dependsOn: [], ecc: ["CSKS", "CSKT"], risk: "medium", note: "נדרש לפני אובייקטים נושאי-עלות.", trust: "curated" }),
  M({ id: "profitcenter", name: "Profit Center", he: "מרכז רווח", cat: "Foundation", module: "CO", keys: "Controlling area + Profit center", dependsOn: [], ecc: ["CEPC", "CEPCT"], risk: "low", note: "", trust: "curated" }),
  M({ id: "material", name: "Material", he: "אב חומר", cat: "Foundation", module: "MM", keys: "Material (MATNR)", dependsOn: [], ecc: ["MARA", "MARC", "MBEW", "MAKT"], risk: "high", note: "MATNR עד 40 תווים ב-S/4; בסיס ל-BOM/Routing/מלאי.", trust: "curated" }),
  M({ id: "workcenter", name: "Work Center / Resource", he: "מרכז עבודה / משאב", cat: "Foundation", module: "PP", keys: "Plant + Work center", dependsOn: ["costcenter"], ecc: ["CRHD", "CRCO"], risk: "medium", note: "נדרש ל-Routing/Recipe; מקושר למרכז עלות.", trust: "curated" }),
  M({ id: "funcloc", name: "Functional Location", he: "מיקום פונקציונלי", cat: "Foundation", module: "PM", keys: "FunctLocation", dependsOn: [], ecc: ["IFLOT", "ILOA"], risk: "medium", note: "בסיס למבנה האחזקה.", trust: "curated" }),
  M({ id: "bank", name: "Bank", he: "בנק", cat: "Foundation", module: "FI", keys: "Country + Bank key", dependsOn: [], ecc: ["BNKA"], risk: "low", note: "", trust: "curated" }),

  /* Master (depend on foundation) */
  M({ id: "customer", name: "Customer", he: "לקוח", cat: "Master", module: "SD", keys: "Business Partner (Customer role)", dependsOn: ["bp"], ecc: ["KNA1", "KNB1", "KNVV"], risk: "high", note: "נטען כתפקיד BP; CVI מסנכרן ל-KNA1.", trust: "curated" }),
  M({ id: "supplier", name: "Supplier (Vendor)", he: "ספק", cat: "Master", module: "MM", keys: "Business Partner (Supplier role)", dependsOn: ["bp"], ecc: ["LFA1", "LFB1", "LFM1"], risk: "high", note: "נטען כתפקיד BP; CVI מסנכרן ל-LFA1.", trust: "curated" }),
  M({ id: "bom", name: "Bill of Material", he: "עץ מוצר (BOM)", cat: "Master", module: "PP", keys: "Material + Plant + BOM usage", dependsOn: ["material"], ecc: ["STKO", "STPO", "MAST"], risk: "medium", note: "דורש חומרי אב + רכיבים קיימים.", trust: "curated" }),
  M({ id: "routing", name: "Routing", he: "רשימת פעולות", cat: "Master", module: "PP", keys: "Group + Group counter", dependsOn: ["material", "workcenter"], ecc: ["PLKO", "PLPO", "MAPL"], risk: "medium", note: "דורש חומר + מרכז עבודה.", trust: "curated" }),
  M({ id: "recipe", name: "Master Recipe", he: "מתכון ייצור", cat: "Master", module: "PP-PI", keys: "Group + Group counter", dependsOn: ["material", "workcenter"], ecc: ["PLKO", "PLPO", "PLMK"], risk: "medium", note: "PP-PI; דורש חומר + משאב.", trust: "curated" }),
  M({ id: "prodversion", name: "Production Version", he: "גרסת ייצור", cat: "Master", module: "PP-PI", keys: "Material + Plant + Version", dependsOn: ["material", "bom", "routing"], ecc: ["MKAL"], risk: "high", note: "חובה ב-S/4 לתכנון/פקודות; דורש BOM+Routing.", trust: "curated" }),
  M({ id: "equipment", name: "Equipment", he: "ציוד", cat: "Master", module: "PM", keys: "Equipment number", dependsOn: ["funcloc", "material"], ecc: ["EQUI", "EQKT", "ILOA"], risk: "medium", note: "מותקן במיקום פונקציונלי.", trust: "curated" }),
  M({ id: "inspplan", name: "Inspection Plan", he: "תוכנית בדיקה (QM)", cat: "Master", module: "QM", keys: "Group + Counter", dependsOn: ["material", "workcenter"], ecc: ["PLKO", "PLMK", "QPMK"], risk: "low", note: "", trust: "needs-verification" }),
  M({ id: "fixedasset", name: "Fixed Asset", he: "נכס קבוע", cat: "Master", module: "FI", keys: "Company code + Asset", dependsOn: ["costcenter"], ecc: ["ANLA", "ANLC"], risk: "medium", note: "כולל יתרות פתיחה לנכסים.", trust: "curated" }),

  /* Transactional / balances (load last) */
  M({ id: "inventory", name: "Inventory Balances", he: "יתרות מלאי", cat: "Transactional", module: "MM", keys: "Material + Plant + Storage/Batch", dependsOn: ["material"], ecc: ["MARD", "MCHB", "MSEG"], risk: "high", note: "יתרות פתיחה; ב-S/4 דרך MATDOC.", trust: "curated" }),
  M({ id: "openpo", name: "Open Purchase Orders", he: "הזמנות רכש פתוחות", cat: "Transactional", module: "MM", keys: "PO + Item", dependsOn: ["material", "supplier"], ecc: ["EKKO", "EKPO"], risk: "high", note: "דורש חומר + ספק.", trust: "curated" }),
  M({ id: "openso", name: "Open Sales Orders", he: "הזמנות מכירה פתוחות", cat: "Transactional", module: "SD", keys: "Sales doc + Item", dependsOn: ["material", "customer"], ecc: ["VBAK", "VBAP"], risk: "high", note: "דורש חומר + לקוח.", trust: "curated" }),
  M({ id: "fiopen", name: "FI Open Items (AR/AP)", he: "פריטים פתוחים (חו\"ז)", cat: "Transactional", module: "FI", keys: "Company code + Document", dependsOn: ["customer", "supplier", "glaccount"], ecc: ["BSID", "BSIK"], risk: "high", note: "יתרות פתוחות; ב-S/4 דרך ACDOCA.", trust: "curated" }),
  M({ id: "maintplan", name: "Maintenance Plan", he: "תוכנית אחזקה", cat: "Transactional", module: "PM", keys: "Maintenance plan", dependsOn: ["equipment", "funcloc"], ecc: ["MPLA", "MPOS"], risk: "low", note: "", trust: "needs-verification" }),

  /* HR */
  M({ id: "employee", name: "Employee (PA/OM)", he: "עובד (PA/OM)", cat: "HR", module: "HR", keys: "Personnel number", dependsOn: ["costcenter"], ecc: ["PA0001", "PA0002", "HRP1000"], risk: "medium", note: "ב-S/4 HCM דרך LTMC/iDoc; בסביבת SuccessFactors נטען ב-EC ומשוכפל (לא דרך LTMC).", trust: "needs-verification" }),
  M({ id: "ecintegration", name: "SuccessFactors EC → S/4", he: "אינטגרציית SuccessFactors", cat: "HR", module: "HR", keys: "Employee (userId)", dependsOn: [], ecc: [], risk: "medium", note: "עובדים מנוהלים ב-Employee Central ומשוכפלים ל-S/4 דרך SAP Integration (לא Migration Cockpit).", trust: "needs-verification" }),
];

/* 6 — Common errors library (real LTMC error patterns) */
export interface MigError { he: string; symptom: string; cause: string; fix: string; trust: Trust }
export const MIG_ERRORS: MigError[] = [
  { he: "ערך לא נמצא בטבלת בדיקה", symptom: "'Entry X does not exist in check table' באימות.", cause: "קונפיגורציה/נתון אב חסר ביעד (סוג חומר, ארגון, קבוצה).", fix: "טען/הגדר את ערך הבדיקה ביעד לפני ההגירה.", trust: "curated" },
  { he: "ערך מיפוי חסר", symptom: "'Mapping value missing' בשלב ה-conversion.", cause: "חוק מיפוי ב-LTMOM לא כיסה ערך מקור.", fix: "השלם את ה-mapping ב-Migration Object Modeler והרץ שוב.", trust: "curated" },
  { he: "תלות לא נטענה (רצף)", symptom: "אובייקט נכשל כי אובייקט-אב לא קיים.", cause: "סדר טעינה שגוי (לדוגמה Customer לפני Business Partner).", fix: "עקוב אחר רצף הטעינה: Foundation → Master → Transactional.", trust: "curated" },
  { he: "שדה חובה ריק", symptom: "'Mandatory field is empty'.", cause: "עמודה חובה בתבנית/staging לא מולאה.", fix: "מלא את השדה במקור או הגדר ברירת מחדל ב-LTMOM.", trust: "curated" },
  { he: "אורך מק\"ט (MATNR 40)", symptom: "חיתוך/אי-התאמה במספר חומר.", cause: "מקור עם 18 תווים מול יעד 40.", fix: "ודא alpha-conversion ושדות ארוכים בתבנית.", trust: "curated" },
  { he: "פורמט תאריך/מספר בתבנית", symptom: "'Invalid date/number format'.", cause: "פורמט שונה מהצפוי בתבנית ה-XML.", fix: "השתמש בפורמט התבנית המדויק (YYYYMMDD / נקודה עשרונית).", trust: "curated" },
  { he: "מפתח כפול ב-staging", symptom: "'Duplicate key' בטעינה.", cause: "רשומות כפולות במקור.", fix: "בצע דה-דופ במקור לפני טעינת ה-staging.", trust: "curated" },
  { he: "המרת מטבע/יחידת מידה", symptom: "כשל בהמרת UoM/Currency.", cause: "יחידה/מטבע לא מוגדרים ביעד.", fix: "הגדר UoM/Currency + שערים ביעד.", trust: "curated" },
];

/* 5 — Data Quality dimensions */
export const QUALITY_DIMS: { he: string; sub: string }[] = [
  { he: "שלמות (Completeness)", sub: "כל השדות החובה מלאים בכל הרשומות." },
  { he: "ייחודיות (Uniqueness)", sub: "אין כפילויות מפתח — דה-דופ לפני טעינה." },
  { he: "תקפות (Validity)", sub: "ערכים קיימים בטבלאות הבדיקה/קונפיגורציה ביעד." },
  { he: "עקביות (Consistency)", sub: "תלויות תקינות — אובייקט-אב קיים לפני צאצא." },
  { he: "התאמה לפורמט (Conformity)", sub: "תאריך/מספר/UoM/מטבע בפורמט הנדרש." },
  { he: "דיוק (Accuracy)", sub: "הנתון משקף את המציאות העסקית (לא נתוני בדיקה)." },
];

/* 4 — Readiness criteria (weighted checklist) */
export const READINESS: { he: string; w: number }[] = [
  { he: "היקף הגירה הוגדר (אילו אובייקטים)", w: 15 },
  { he: "נתוני מקור חולצו ונוקו", w: 15 },
  { he: "מיפוי שדות הושלם (LTMOM)", w: 15 },
  { he: "קונפיגורציה ונתוני אב קיימים ביעד", w: 15 },
  { he: "רצף טעינה (Dependencies) תוכנן", w: 10 },
  { he: "Simulation/Validation עברה ללא שגיאות חוסמות", w: 15 },
  { he: "תוכנית Reconciliation אחרי טעינה", w: 15 },
];

/* 9 — S/4 migration checklist (process) */
export const MIG_CHECKLIST: string[] = [
  "הפעלת תרחיש ה-Migration Cockpit (Fiori 'Migrate Your Data') / LTMC",
  "יצירת פרויקט הגירה ובחירת גישת העברה",
  "בחירת אובייקטי הגירה מהספרייה",
  "התאמת מיפוי ב-Migration Object Modeler (LTMOM)",
  "מילוי/חיבור תבניות או טבלאות Staging",
  "Validation לכל אובייקט (פתרון שגיאות)",
  "Simulation לפי רצף התלויות",
  "טעינה (Migrate) בסדר Foundation→Master→Transactional",
  "Reconciliation — ספירות, יתרות, סכומי בקרה מול המקור",
  "תיעוד + מסירה ל-Cutover",
];

export const MIG_LOAD_LAYERS: { cat: MigCat; he: string; c: string }[] = [
  { cat: "Foundation", he: "1 · בסיס", c: "#2563eb" },
  { cat: "Master", he: "2 · נתוני אב", c: "#7c3aed" },
  { cat: "Transactional", he: "3 · תנועות / יתרות", c: "#d97706" },
  { cat: "HR", he: "HR / SuccessFactors", c: "#0d9488" },
];

export const MIG_META = {
  objects: MIG_OBJECTS.length,
  approaches: APPROACHES.length,
  errors: MIG_ERRORS.length,
  curated: MIG_OBJECTS.filter((o) => o.trust === "curated").length,
};
