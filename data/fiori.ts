// SAP Fiori & UX Center — Phase 9.
// Fiori architecture (FLP / Frontend Server / Gateway / OData / catalogs /
// spaces), app types, the OData layer (SEGW/IWFND/IWBEP), UI5 (MVC), RAP
// (CDS/Behavior/Service Bindings), common incidents, a debugging flow and the
// ECC→S/4 UX evolution. Standard SAP knowledge — tcodes and SAP Note refs are
// search keywords + component (NOT fabricated numbers). trust: curated.

export interface FioriLink { label: string; href: string }

const SEC: FioriLink = { label: "אבטחה (S_SERVICE)", href: "/security/#fiori" };
const INTG: FioriLink = { label: "OData / אינטגרציה", href: "/integration/#odata" };
const S4: FioriLink = { label: "S/4HANA", href: "/s4hana/" };
const CDS: FioriLink = { label: "CDS Views", href: "/s4hana/" };
const ALM: FioriLink = { label: "ALM", href: "/alm/" };

// 1. Fiori architecture layers
export const FIORI_ARCH: { he: string; en: string; desc: string; c: string }[] = [
  { he: "Fiori Launchpad", en: "FLP", desc: "מעטפת ה-UI: tiles, spaces & pages, theming (Horizon), ניווט. נקודת הכניסה למשתמש.", c: "#2563eb" },
  { he: "Frontend Server", en: "Front-End Server (FES)", desc: "Gateway hub + ספריות UI5 + שירותי /UI2. פריסה embedded (בתוך S/4) או hub (נפרד).", c: "#0891b2" },
  { he: "Gateway", en: "SAP Gateway", desc: "חשיפת OData: /IWFND (hub, ניתוב) + /IWBEP (backend provider). מתרגם בקשות REST ל-ABAP.", c: "#7c3aed" },
  { he: "Backend", en: "Backend (S/4 / ECC)", desc: "לוגיקה עסקית, CDS Views, RAP. כאן יושבים הנתונים וה-business logic.", c: "#0d9488" },
  { he: "OData Service", en: "OData", desc: "פרוטוקול ה-REST/JSON שמחבר UI ל-backend; entity sets, $metadata, CRUD.", c: "#d97706" },
  { he: "Catalogs / Spaces", en: "Content & Authorization", desc: "Business Catalogs (הרשאה) + Groups/Spaces&Pages (תצוגה), משויכים דרך Business Roles.", c: "#dc2626" },
];

// 2. App types
export const APP_TYPES: { he: string; en: string; desc: string; tech: string[]; c: string }[] = [
  { he: "Transactional", en: "Transactional", desc: "יצירה/שינוי של אובייקטים עסקיים (הזמנה, הודעה) — OData CRUD, לרוב עם Draft handling.", tech: ["OData CRUD", "Draft", "Smart Controls / FE"], c: "#2563eb" },
  { he: "Analytical", en: "Analytical", desc: "תצוגת KPI ומגמות — Smart Business, CDS analytical (cube/query), Virtual Data Model.", tech: ["CDS Analytical", "Smart Business KPI", "VDM"], c: "#16a34a" },
  { he: "Fact Sheet", en: "Fact Sheet", desc: "תצוגת 360° של אובייקט עם ניווט הקשרי; מבוסס Enterprise Search models.", tech: ["Search models", "Contextual nav", "OData read"], c: "#7c3aed" },
];

// 3. OData center
export const ODATA_PARTS: { he: string; en: string; desc: string }[] = [
  { he: "SEGW", en: "Service Builder", desc: "בניית OData קלאסית: data model, entity types/sets, associations → יצירת DPC/MPC classes. נדחק לטובת RAP." },
  { he: "Gateway Hub", en: "/IWFND", desc: "רישום והפעלת שירות (MAINT_SERVICE), ניתוב, System Alias ל-backend, error log, cache." },
  { he: "Backend Provider", en: "/IWBEP", desc: "מימוש ה-data provider בצד ה-backend; error log נפרד; חיבור ל-CDS/RAP או DPC ידני." },
  { he: "Service Registration", en: "Activate & Maintain", desc: "/IWFND/MAINT_SERVICE — הוספת שירות, שיוך System Alias, הפעלה (Activate)." },
  { he: "Metadata", en: "$metadata", desc: "מסמך ה-XML שמתאר entity types/sets/properties/associations; נשמר ב-cache." },
  { he: "Entity Sets", en: "Entity Sets / Types", desc: "אוסף הישויות שהשירות חושף (למשל WorkOrderSet), עם navigation properties ו-keys." },
];
export const ODATA_TCODES = ["SEGW", "/IWFND/MAINT_SERVICE", "/IWFND/ERROR_LOG", "/IWFND/CACHE_CLEANUP", "/IWFND/GW_CLIENT", "/IWBEP/ERROR_LOG", "/IWFND/V4_ADMIN"];
export const ODATA_VERSIONS = "OData v2 = הקלאסי (SEGW, Smart Templates ישנים). OData v4 = המודרני (RAP, Fiori Elements V4) — ביצועים, draft ו-annotations משופרים.";

// 4. UI5 center
export const UI5_PARTS: { he: string; en: string; desc: string }[] = [
  { he: "MVC", en: "Model-View-Controller", desc: "הפרדה: Model (נתונים/OData), View (UI), Controller (לוגיקה). הבסיס הארכיטקטוני של UI5." },
  { he: "Component", en: "Component.js + manifest.json", desc: "יחידת האפליקציה; manifest.json (App Descriptor) מגדיר models, routing, data sources, dependencies." },
  { he: "Views", en: "Views (XML/JS)", desc: "הגדרת ה-UI — לרוב XML Views; מכילות controls (sap.m / sap.ui.comp)." },
  { he: "Controllers", en: "Controllers", desc: "לוגיקת ה-View: event handlers, data binding, ניווט, קריאות OData." },
  { he: "Routing", en: "Router & Targets", desc: "ניהול ניווט בין views לפי hash/URL — routes, patterns, targets ב-manifest." },
  { he: "Fragments", en: "Fragments", desc: "חתיכות UI לשימוש חוזר (דיאלוגים, טבלאות) ללא controller משלהן — מוטמעות בכמה views." },
];
export const UI5_NOTE = "Fiori Elements = יצירת אפליקציות מבוססת template + CDS annotations (פחות קוד). Freestyle UI5 = פיתוח ידני מלא ב-MVC. ברירת מחדל מודרנית: Fiori Elements V4 על RAP.";

// 5. RAP overview
export const RAP_PARTS: { he: string; en: string; desc: string }[] = [
  { he: "CDS Views", en: "Core Data Services", desc: "מודל הנתונים: interface views (basic) → consumption/projection views עם UI annotations. בסיס ה-VDM." },
  { he: "Behavior Definition", en: "Behavior Definition (BDEF)", desc: "מגדיר התנהגות: CRUD, actions, validations, determinations, locking, draft. managed מול unmanaged." },
  { he: "Behavior Implementation", en: "Behavior Pool (ABAP)", desc: "מחלקות ABAP שמממשות את ה-BDEF (validations/determinations/actions)." },
  { he: "Service Definition", en: "Service Definition", desc: "מגדיר אילו entities מהמודל נחשפים החוצה (expose)." },
  { he: "Service Binding", en: "Service Binding", desc: "קושר את ה-Service Definition לפרוטוקול: OData V2/V4 (UI) או Web API; כאן מפעילים (Activate/Publish)." },
];
export const RAP_NOTE = "RAP (ABAP RESTful Application Programming) הוא המודל המודרני ב-S/4 — מחליף SEGW: CDS + Behavior Definition + Service Binding → OData V4 לצריכת Fiori Elements. תומך managed (SAP מנהל persistence) ו-unmanaged.";

// 6. Common Fiori incidents
export const FIORI_INCIDENTS: { he: string; symptom: string; cause: string; fix: string; tcodes: string[]; slug?: string }[] = [
  { he: "App not found / 404", symptom: "לחיצה על tile → 'App could not be started' / 404.", cause: "OData service לא רשום/לא פעיל, או target mapping/intent חסר.", fix: "/IWFND/MAINT_SERVICE → רשום+Activate; ודא target mapping בקטלוג.", tcodes: ["/IWFND/MAINT_SERVICE", "/UI2/FLPD_CUST"] },
  { he: "Catalog / tile missing", symptom: "האפליקציה קיימת אך ה-tile לא מופיע למשתמש.", cause: "קטלוג/קבוצה לא משויך לתפקיד, או Space/Page לא מוקצים.", fix: "שייך Business Catalog לתפקיד (PFCG/Business Role) + Group/Space.", tcodes: ["PFCG", "/UI2/FLPD_CUST"], slug: undefined },
  { he: "Authorization issue", symptom: "האפליקציה נפתחת אך 'no authorization' / 403.", cause: "חסר S_SERVICE ל-OData, או אובייקט הרשאת היישום (I_SWERK וכו').", fix: "STAUTHTRACE → הוסף את האובייקט ב-PFCG → User Comparison.", tcodes: ["STAUTHTRACE", "SU53", "PFCG"], slug: "su53-missing-authorization-deep" },
  { he: "OData failure / 500", symptom: "שגיאת runtime בקריאת OData (טעינת רשימה/שמירה נכשלת).", cause: "exception ב-data provider / CDS / RAP behavior; פרמטר חסר.", fix: "/IWFND/ERROR_LOG (timestamp) → /IWBEP/ERROR_LOG בצד ה-backend.", tcodes: ["/IWFND/ERROR_LOG", "/IWBEP/ERROR_LOG", "/IWFND/GW_CLIENT"] },
  { he: "Metadata cache", symptom: "שינוי בשירות לא משתקף; $metadata ישן; שדות חסרים.", cause: "Metadata/model cache לא רוענן אחרי שינוי.", fix: "/IWFND/CACHE_CLEANUP + רענון model; בדוק ב-GW_CLIENT.", tcodes: ["/IWFND/CACHE_CLEANUP", "/IWFND/GW_CLIENT"] },
  { he: "Gateway errors", symptom: "שירות לא נגיש; System Alias שגוי; RFC ל-backend נכשל.", cause: "System Alias/RFC destination שגוי בין hub ל-backend.", fix: "בדוק System Alias ב-MAINT_SERVICE + RFC (SM59) ל-backend.", tcodes: ["/IWFND/MAINT_SERVICE", "SM59", "SPRO"] },
];

// 7. Debugging flow
export const FIORI_DEBUG: { step: string; t: string; do: string }[] = [
  { step: "1. רשת בדפדפן", t: "F12 / Network", do: "מצא את קריאת ה-OData הכושלת + status (404/403/500)" },
  { step: "2. לוג Gateway", t: "/IWFND/ERROR_LOG", do: "אתר את השגיאה לפי timestamp + הודעת ה-backend" },
  { step: "3. הרשאה?", t: "STAUTHTRACE", do: "אם 403 — איזה S_SERVICE/אובייקט חסר" },
  { step: "4. צד Backend", t: "/IWBEP/ERROR_LOG", do: "exception ב-DPC/CDS/RAP behavior" },
  { step: "5. Metadata", t: "/IWFND/CACHE_CLEANUP", do: "אם stale — נקה cache ורענן model" },
  { step: "6. שחזר", t: "/IWFND/GW_CLIENT", do: "הרץ את הבקשה ידנית לאימות התיקון" },
];

// 8. ECC vs S/4 Fiori evolution
export const FIORI_EVOLUTION: { topic: string; ecc: string; s4: string }[] = [
  { topic: "ממשק משתמש", ecc: "SAP GUI (דיאלוג קלאסי, dynpro)", s4: "Fiori Launchpad כברירת מחדל; GUI עדיין נתמך לחלק" },
  { topic: "פיתוח OData", ecc: "SEGW (Service Builder) + DPC/MPC ידני", s4: "RAP: CDS + Behavior Definition + Service Binding (V4)" },
  { topic: "סוג אפליקציה", ecc: "freestyle UI5 / Web Dynpro", s4: "Fiori Elements (template + annotations) על RAP" },
  { topic: "תצוגת לאנצ'פד", ecc: "Groups (קלאסי)", s4: "Spaces & Pages + Business Roles (IAM)" },
  { topic: "Frontend Server", ecc: "Hub נפרד מול Business Suite", s4: "לרוב embedded FES בתוך S/4" },
  { topic: "Theming", ecc: "Belize / Blue Crystal", s4: "Horizon (ברירת מחדל מודרנית) / Quartz" },
];

// 9. Interview questions
export const FIORI_INTERVIEW: { q: string; a: string }[] = [
  { q: "תאר את ארכיטקטורת Fiori מקצה לקצה.", a: "Launchpad (UI shell) → Frontend Server (Gateway+UI5, embedded/hub) → Gateway (/IWFND hub + /IWBEP backend) → Backend (CDS/RAP/logic). OData מחבר UI ל-backend; Catalogs+Spaces שולטים בתוכן והרשאה." },
  { q: "מה ההבדל בין שלושת סוגי אפליקציות Fiori?", a: "Transactional = CRUD על אובייקט (לרוב Draft). Analytical = KPI/מגמות מ-CDS analytical+Smart Business. Fact Sheet = תצוגת 360° עם ניווט הקשרי מבוססת search." },
  { q: "מה החליף את SEGW ב-S/4 ולמה?", a: "RAP — CDS + Behavior Definition + Service Binding מייצרים OData V4 לצריכת Fiori Elements, עם פחות קוד, draft מובנה, ו-VDM. SEGW עדיין קיים אך legacy." },
  { q: "כיצד תאבחן 'App could not be started'?", a: "F12/Network לסטטוס → אם 404: /IWFND/MAINT_SERVICE (רישום+Activate) ו-target mapping. אם 403: STAUTHTRACE (S_SERVICE). אם 500: /IWFND/ERROR_LOG → /IWBEP." },
  { q: "מהו manifest.json ומה תפקידו?", a: "App Descriptor של אפליקציית UI5 — מגדיר data sources/models, routing+targets, dependencies, i18n ו-Fiori metadata. נקודת התצורה המרכזית של ה-Component." },
  { q: "מה ההבדל בין Fiori Elements ל-freestyle UI5?", a: "Fiori Elements = template מבוסס CDS annotations, מעט קוד, אחיד. Freestyle = פיתוח MVC ידני מלא, גמיש לתרחישים מותאמים. ברירת מחדל מודרנית: FE V4 על RAP." },
  { q: "OData v2 מול v4 — מתי כל אחד?", a: "v2 = קלאסי (SEGW, Smart Templates ישנים). v4 = מודרני (RAP, Fiori Elements V4) עם ביצועים, draft ו-annotations טובים יותר. פרויקטים חדשים → v4." },
  { q: "מהם Fragments ב-UI5 ולמה הם שימושיים?", a: "חתיכות UI הצהרתיות לשימוש חוזר (דיאלוג, טבלה) בלי controller משלהן — נטענות לתוך כמה views, מפחיתות כפילות ומשפרות תחזוקה." },
];

export const CROSS_LINKS: FioriLink[] = [SEC, INTG, S4, CDS, ALM, { label: "מסירה (Delivery)", href: "/delivery/" }];

export const FIORI_META = {
  he: "מרכז Fiori ו-UX",
  sub: "ארכיטקטורת Fiori, סוגי אפליקציות, שכבת OData (SEGW/IWFND/IWBEP), UI5 (MVC), RAP (CDS/Behavior/Service Binding), תקלות נפוצות, זרימת Debug ואבולוציית ECC→S/4. ידע SAP סטנדרטי. trust: curated.",
};
