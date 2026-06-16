// SAP Platform & Infrastructure domain (Phase 8) — hand-authored, accurate
// standard-SAP knowledge. No fabricated counts. ECC↔S/4 notes reflect common
// migration guidance. Bilingual (he primary, en title).

export type InfraKind =
  | "gui" | "fiori" | "gateway" | "odata" | "cds" | "rfc" | "bapi" | "idoc"
  | "pipo" | "cpi" | "hana" | "auth" | "roles" | "workflow" | "enh" | "output"
  | "transport" | "landscape" | "monitor";

export interface InfraLayer {
  id: InfraKind;
  he: string;          // Hebrew name
  en: string;          // English / technical name
  group: string;       // group key
  purpose: string;     // Hebrew, 1–2 sentences
  eccS4: string;       // ECC → S/4HANA note
  tcodes: string[];    // key transactions / tools
  objects: string[];   // related objects / tables / artifacts
  cbc: string;         // CBC-context note
}

export const INFRA_GROUPS: { key: string; he: string; en: string; accent: string }[] = [
  { key: "ux", he: "חוויית משתמש וגישה", en: "User Experience & Access", accent: "#d62027" },
  { key: "int", he: "אינטגרציה וממשקים", en: "Integration & Interfaces", accent: "#0891b2" },
  { key: "platform", he: "פלטפורמה ובסיס נתונים", en: "Platform & Database", accent: "#6d28d9" },
  { key: "security", he: "אבטחה והרשאות", en: "Security & Authorizations", accent: "#b45309" },
  { key: "process", he: "תהליך והרחבות", en: "Process & Extensibility", accent: "#0d9488" },
  { key: "ops", he: "תפעול ומחזור חיים", en: "Operations & Lifecycle", accent: "#475569" },
];

export const INFRA_LAYERS: InfraLayer[] = [
  // ── UX ──
  { id: "gui", he: "SAP GUI", en: "SAP GUI", group: "ux",
    purpose: "ממשק העבודה הקלאסי (Dynpro/SAP GUI for Windows/HTML) לטרנזקציות ECC. בסיס לעבודת מפתחים ומשתמשי-על.",
    eccS4: "נתמך ב-S/4HANA אך SAP מובילה ל-Fiori; חלק מהטרנזקציות סומנו כ-'classic/לא אסטרטגי'.",
    tcodes: ["SE80", "SE38", "SE11", "SU01", "SMEN"], objects: ["Dynpro", "GUI Status", "Transaction codes"],
    cbc: "ב-CBC משמש בעיקר את צוות ה-IT/מפתחים; משתמשי קצה מועברים בהדרגה ל-Fiori Launchpad." },
  { id: "fiori", he: "SAP Fiori", en: "Fiori / Launchpad", group: "ux",
    purpose: "שכבת ה-UX המודרנית של S/4HANA — אפליקציות מבוססות UI5 ב-Launchpad, לפי תפקיד (role-based).",
    eccS4: "ברירת המחדל ב-S/4HANA. אפליקציות Transactional / Analytical / Fact-sheet; מחליפות מסכי GUI רבים.",
    tcodes: ["/UI2/FLP", "/UI2/FLPD_CUST", "STC01"], objects: ["UI5 apps", "Launchpad catalog/group", "Target mapping"],
    cbc: "מפת חלופות Fiori לכל T-Code קריטי מתועדת במילון; הרצה תוך שמירת מודל ההרשאות לפי תפקיד." },

  // ── Integration ──
  { id: "gateway", he: "SAP Gateway", en: "NetWeaver Gateway", group: "int",
    purpose: "שכבת חשיפת שירותי OData (hub/embedded) — מתרגמת אובייקטי ABAP לשירותי REST/OData עבור Fiori וצרכנים חיצוניים.",
    eccS4: "ב-S/4HANA לרוב Embedded Gateway; רישום שירותים דרך /IWFND/MAINT_SERVICE.",
    tcodes: ["/IWFND/MAINT_SERVICE", "/IWBEP/REG_SERVICE", "/IWFND/ERROR_LOG"], objects: ["Service groups", "System alias", "ICF nodes"],
    cbc: "Gateway חושף את שירותי ה-OData ש-Fiori של CBC צורכת; ניטור error log חלק מהתפעול." },
  { id: "odata", he: "שירותי OData", en: "OData Services", group: "int",
    purpose: "פרוטוקול REST סטנדרטי לחשיפת נתונים ופעולות. כל אפליקציית Fiori נשענת על שירות OData (V2/V4).",
    eccS4: "S/4HANA מעדיפה OData V4 + CDS-based services (RAP). שירותים ישנים ב-V2 עדיין נתמכים.",
    tcodes: ["/IWFND/GW_CLIENT", "/IWFND/MAINT_SERVICE", "SEGW"], objects: ["Service Definition", "Entity sets", "$metadata"],
    cbc: "ממשקי Fiori ואינטגרציות חיצוניות (Zetes/Daymax דרך CPI) צורכים OData." },
  { id: "cds", he: "CDS Views", en: "Core Data Services", group: "int",
    purpose: "מודל נתונים סמנטי שרץ ב-DB (HANA) — בסיס לשאילתות, אנליטיקה ושירותי OData ב-S/4HANA (Code Pushdown).",
    eccS4: "טכנולוגיית הליבה של S/4HANA. מחליפה Joins/SELECTים ב-ABAP; חושפת אובייקטים דרך CDS+OData.",
    tcodes: ["SE11", "ADT (Eclipse)", "STMT"], objects: ["I_Product", "I_Equipment", "C_/P_ CDS views"],
    cbc: "מילון הנתונים ממפה לכל טבלת ליבה את ה-CDS המקבילה (I_Equipment ל-EQUI וכו')." },
  { id: "rfc", he: "RFC", en: "Remote Function Call", group: "int",
    purpose: "מנגנון הקריאה המרוחקת בין מערכות SAP/חיצוניות. בסיס ל-BAPIs, IDocs ולחיבורי Gateway/CPI.",
    eccS4: "ללא שינוי מהותי; ב-Clean Core מעודדים APIs (OData/SOAP) על-פני RFC ישיר.",
    tcodes: ["SM59", "STRUST", "SMGW", "SARFC"], objects: ["RFC destinations", "trusted/3rd-party", "tRFC/qRFC queues"],
    cbc: "חיבורי RFC ל-MES ול-Daymax; ניטור SMGW/SARFC חלק מהתפעול." },
  { id: "bapi", he: "BAPI / Function Modules", en: "BAPI / FM", group: "int",
    purpose: "ממשקי API עסקיים יציבים (BAPI_*) ופונקציות (FM) ליצירה/קריאה/עדכון של אובייקטים עסקיים.",
    eccS4: "רוב ה-BAPIs נתמכים; חלק הוחלפו ב-OData/RAP APIs (API_*). בדוק תאימות per-object.",
    tcodes: ["SE37", "BAPI", "SWO1", "SE80"], objects: ["BAPI_MATERIAL_SAVEDATA", "BAPI_EQUI_*", "API_PROCESSORDER_2"],
    cbc: "טעינות המוניות וממשקים נשענים על BAPIs; ממופים לכל אובייקט במילון." },
  { id: "idoc", he: "IDoc", en: "Intermediate Document", group: "int",
    purpose: "פורמט הודעה אסינכרוני להעברת נתונים בין SAP למערכות (EDI/ALE). מבנה Control/Data/Status.",
    eccS4: "ללא שינוי מהותי; עדיין נפוץ לאינטגרציות B2B/legacy לצד APIs מודרניים.",
    tcodes: ["WE02", "WE19", "WE20", "BD87", "WE60"], objects: ["EDIDC", "EDID4", "EDIDS", "MATMAS / LOIPRO"],
    cbc: "ממשקי MATMAS/LOIPRO ל-Zetes/Daymax; טיפול בסטטוס 51/64 חלק מפתרון התקלות." },
  { id: "pipo", he: "PI / PO", en: "Process Integration / Orchestration", group: "int",
    purpose: "פלטפורמת אינטגרציה מקומית (dual-stack/AEX) — Mapping, routing, אדפטרים בין SAP למערכות חיצוניות.",
    eccS4: "SAP מובילה מ-PI/PO ל-Integration Suite (CPI) בענן; PO נכנס לתחזוקה מורחבת.",
    tcodes: ["SXMB_MONI", "NWA", "IB (ESR/ID)"], objects: ["Integration Flows", "Mappings", "Communication channels"],
    cbc: "תרחישי אינטגרציה היברידיים; מעבר הדרגתי ל-CPI." },
  { id: "cpi", he: "CPI / Integration Suite", en: "Cloud Platform Integration", group: "int",
    purpose: "שירות אינטגרציה ענני (BTP) — iFlows, אדפטרים מנוהלים, חיבור S/4 לענן ולצד-שלישי.",
    eccS4: "האסטרטגיה המומלצת לאינטגרציה ב-S/4HANA; מחליף בהדרגה PI/PO.",
    tcodes: ["BTP Cockpit", "Integration Suite", "Cloud Connector"], objects: ["iFlow", "Cloud Connector", "OAuth/keystore"],
    cbc: "ממשקי ענן עתידיים ל-Zetes/Daymax ולשותפים דרך CPI + Cloud Connector." },

  // ── Platform ──
  { id: "hana", he: "SAP HANA", en: "HANA In-Memory DB", group: "platform",
    purpose: "בסיס הנתונים In-Memory עמודי — מנוע ה-S/4HANA. Code pushdown, אנליטיקה בזמן אמת, פישוט מודל הנתונים.",
    eccS4: "חובה ל-S/4HANA. ביטול טבלאות aggregate/index (למשל BSEG→ACDOCA); CDS במקום joins ב-ABAP.",
    tcodes: ["DBACOCKPIT", "HANA Studio/Cockpit", "ST04"], objects: ["ACDOCA (Universal Journal)", "Column store", "Calculation views"],
    cbc: "מעבר ל-HANA מבטל טבלאות סיכום ומחייב בדיקת קוד מותאם (custom code) לתאימות." },

  // ── Security ──
  { id: "auth", he: "הרשאות", en: "Authorizations", group: "security",
    purpose: "מנגנון הבקרה (Authorization objects + checks) הקובע מה משתמש רשאי לבצע. בסיס לתפקידים.",
    eccS4: "מודל דומה; אובייקטי הרשאה חדשים ל-Fiori (Catalogs/Groups) + S_TCODE קלאסי.",
    tcodes: ["SU21", "SU53", "ST01", "SUIM"], objects: ["Authorization objects", "S_TCODE", "Auth fields"],
    cbc: "ניתוח SU53 לתקלות הרשאה; בדיקת אובייקטים בעת מעבר ל-Fiori." },
  { id: "roles", he: "תפקידים (Roles)", en: "Roles & PFCG", group: "security",
    purpose: "אריזת הרשאות לתפקיד עסקי (Single/Composite/Derived) דרך PFCG; הקצאה למשתמשים.",
    eccS4: "תפקידים כוללים גם Fiori catalogs/groups; דרושה התאמת תפקידים (role redesign) למודל S/4.",
    tcodes: ["PFCG", "SU01", "SU10", "SUIM"], objects: ["Single/Composite roles", "Profiles", "Fiori catalogs"],
    cbc: "מטריצת תפקידים לפי מחלקה (ייצור/אחזקה/QA); עדכון בעת הוספת אפליקציות Fiori." },

  // ── Process & Extensibility ──
  { id: "workflow", he: "Workflow", en: "SAP Business Workflow", group: "process",
    purpose: "מנוע תהליכים אוטומטי — אישורים, משימות (SBWP), אירועים. מקשר אובייקטים עסקיים לפעולות משתמש.",
    eccS4: "נתמך; SAP מובילה ל-Flexible Workflow (Fiori 'My Inbox') ול-BTP Workflow לתרחישים חדשים.",
    tcodes: ["SWDD", "SWI1", "SBWP", "SWUS", "PFTC"], objects: ["Workflow templates", "Tasks", "Events (SWETYPV)"],
    cbc: "תהליכי אישור (שחרור פק\"ע, שינוי אב-נתונים) דרך Workflow / My Inbox." },
  { id: "enh", he: "הרחבות (User Exit / BAdI / BTE)", en: "Enhancements", group: "process",
    purpose: "מנגנוני הרחבת תקן SAP ללא שינוי קוד הליבה: User-Exit (CMOD), BAdI (SE18/19), BTE, Enhancement spots.",
    eccS4: "ב-Clean Core מעדיפים BAdI/Enhancement spots ו-extensibility מנוהל; User-Exits ישנים נבדקים.",
    tcodes: ["CMOD", "SMOD", "SE18", "SE19", "SE84"], objects: ["BAdI definitions/impl", "PPCO0001/CONFPP*", "WORKORDER_* BAdIs"],
    cbc: "ולידציות ייצור (CONFPP/PPCO) ממופות במרכז ההרחבות; מועברות ל-BAdI ב-S/4." },
  { id: "output", he: "ניהול פלט", en: "Output Management", group: "process",
    purpose: "הפקת מסמכי פלט (הדפסות, PDF, EDI, מייל) — NAST/Message control הקלאסי, ו-BRF+/OM החדש.",
    eccS4: "S/4HANA מציגה Output Management חדש (BRF+ / Adobe Forms / cloud print) לצד NAST למסמכים מסוימים.",
    tcodes: ["NACE", "MN04", "SFP", "BRF+"], objects: ["NAST", "Condition records", "Adobe/Smart Forms"],
    cbc: "תוויות אצווה ותעודות QA (COA) דרך Output Management; מעבר ל-BRF+/Adobe." },

  // ── Operations ──
  { id: "transport", he: "ניהול תעבורות", en: "Transport Management (TMS)", group: "ops",
    purpose: "ניהול שינויים בין מערכות (CTS/TMS) — בקשות תעבורה (Workbench/Customizing), שחרור והעברה לאורך הנוף.",
    eccS4: "ללא שינוי מהותי; gCTS/Cloud transports בתרחישים מבוססי-ענן.",
    tcodes: ["SE09", "SE10", "STMS", "SCC1"], objects: ["Transport requests", "Tasks", "Transport routes"],
    cbc: "כל שינוי (קוד/קונפיג) עובר DEV→QA→PRD דרך תעבורות מבוקרות." },
  { id: "landscape", he: "נוף מערכות DEV → QA → PRD", en: "System Landscape", group: "ops",
    purpose: "ארכיטקטורת שלוש שכבות: פיתוח (DEV) → בקרת איכות (QA) → ייצור (PRD), עם נתיב תעבורות ובדיקות בכל שלב.",
    eccS4: "זהה במהות; פרויקט המיגרציה מנוהל לאורך הנוף עם Sandbox/Pre-Prod נוספים.",
    tcodes: ["STMS", "SCC4", "SM59", "SE03"], objects: ["DEV / QA / PRD clients", "Transport route", "RFC links"],
    cbc: "נוף CBC: פיתוח ובדיקות לפני שחרור לייצור; cutover מנוהל בתכנית המיגרציה." },
  { id: "monitor", he: "ניטור ותפעול", en: "Monitoring & Operations", group: "ops",
    purpose: "ניטור בריאות המערכת — תהליכים, תורים, dumps, jobs, ביצועים. בסיס לתפעול שוטף (Basis/SRE).",
    eccS4: "מתווסף Solution Manager / Cloud ALM; ניטור CDS/HANA ייעודי.",
    tcodes: ["SM37", "ST22", "SM21", "SMQ1", "SMQ2", "ST03N", "SOST"], objects: ["Background jobs", "ABAP dumps", "qRFC queues", "System log"],
    cbc: "ניטור תורי IDoc/qRFC, dumps ב-ST22 ו-jobs קריטיים; חלק מ-runbook התפעול." },
];
