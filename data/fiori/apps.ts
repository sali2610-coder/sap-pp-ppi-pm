import type { FioriApp } from "@/lib/fiori/types";

// Full app pages built on the existing curated Fiori set (real App IDs/roles/
// catalogs/OData/CDS). Trust = "curated" (from project data + standard SAP Fiori
// knowledge) with the SAP Fiori Apps Library as the verification path. No fabricated
// SAP Notes. Pilot = PM + core PP/PP-PI apps.
const LV = "2026-07-15";
const LV2 = "2026-07-25";
const SRC = "SAP Fiori Apps Library (curated)";

export const FIORI_APPS: FioriApp[] = [
  {
    id: "F2731", slug: "manage-maintenance-orders", name: "Manage Maintenance Orders", he: "ניהול פקודות אחזקה", module: "PM", type: "Transactional",
    trust: "curated", source: SRC, lastReviewed: LV,
    purpose: "ניהול מחזור החיים של פקודת אחזקה — יצירה, תכנון פעולות ורכיבים, שחרור, מעקב ואישור — בחוויית Fiori אחת.",
    problem: "מתכנני אחזקה זקוקים לתמונה אחת של הפקודה ללא ניווט בין מסכי SAP GUI (IW31/32/38). האפליקציה מרכזת פעולות, רכיבים, עלויות וסטטוס במקום אחד.",
    process: "הודעה → פקודה → שחרור → דיווח → TECO",
    explain: { beginner: "מסך אחד לתכנון וניהול עבודת אחזקה במקום כמה טרנזקציות.", consultant: "מבוסס OData על אובייקט ALM Order; תומך Adaptation Project ו-KUT.", technical: "SAPUI5 List Report/Object Page מעל API_MAINTENANCEORDER; Backend = ALM Order." },
    role: "SAP_BR_MAINTENANCE_PLANNER", catalog: "SAP_EAM_BC_MAINT_PLANNER", authObjects: ["I_AUART", "I_TCODE"],
    odata: "API_MAINTENANCEORDER", cds: "C_MaintOrderListReport", guiTx: ["IW31", "IW32", "IW38"],
    relatedTables: ["AUFK", "AFIH", "AFVC", "RESB"], relatedObjects: ["BAPI_ALM_ORDER_MAINTAIN"],
    spro: "Plant Maintenance → Maintenance and Service Orders → Functions and Settings for Order Types",
    ecc: "ECC: IW31/IW32 (SAP GUI, ללא Fiori).", s4OnPrem: "yes", cloud: "yes", releaseInfo: "S/4HANA (On-Prem + Public Cloud)",
    commonErrors: ["האפליקציה לא מופיעה ב-Launchpad → Business Role/Catalog לא הוקצו (בדוק /UI2/FLPD_CUST).", "OData 403 → הרשאת I_AUART חסרה לסוג הפקודה."],
    troubleshooting: "בדוק הקצאת Business Role ב-PFCG/Business Role Maintenance, ואת ה-Catalog ב-Launchpad Content Manager. שגיאות OData נבדקות ב-/IWFND/ERROR_LOG.",
    cbc: "ב-CBC, מתכנן פותח את F2731, מתכנן פקודת PM01 עם פעולות ורכיבים, ומשחרר — הכל מדפדפן.",
    similar: ["confirm-jobs", "manage-technical-objects"],
  },
  {
    // F1511 · 2026-09-24: name, type, role, catalog, OData and GUI transactions copied from the
    // SAP Fiori Apps Reference Library (scripts/fal-app.mjs F1511, S32OP = S/4HANA 2025 FPS01,
    // Published; same role, catalogs, OData and GUI transactions on S27OP = 2023). The Hebrew
    // name and the slug are kept; the curated name 'Create Maintenance Request' belongs to
    // F1511A. The verification record fiori:F1511 carries the evidence.
    id: "F1511", slug: "create-maintenance-request", name: "Request Maintenance", he: "פתיחת בקשת אחזקה", module: "PM", type: "Transactional",
    trust: "verified-docs", source: "SAP Fiori Apps Reference Library F1511 (scripts/fal-app.mjs, OData channel, S32OP = S/4HANA 2025 FPS01, isPublished=Published); same role, catalogs, OData and GUI transactions on S27OP = S/4HANA 2023", lastReviewed: "2026-09-24",
    purpose: "פתיחת הודעת/בקשת אחזקה מהשטח על-ידי מפעיל או טכנאי, כולל אובייקט ייחוס ותיאור התקלה.",
    problem: "מפעילים בשטח צריכים לדווח תקלה מהר וממובייל, ללא הכרת IW21. אפליקציית self-service פשוטה מפחיתה חיכוך.",
    process: "בקשה/הודעה → פקודה",
    explain: { beginner: "טופס פשוט לדווח תקלה מהטלפון.", consultant: "יוצר הודעת PM (סוג M1/M2) דרך OData; מתאים ל-self-service.", technical: "SAPUI5 (SAP Fiori) מעל שירות ה-OData EAM_NTF_CREATE, לפי ספריית ה-Fiori (S32OP); ראו רשומת האימות fiori:F1511." },
    role: "SAP_BR_EMPLOYEE_MAINTENANCE", catalog: "SAP_EAM_BC_MREQ",
    odata: "EAM_NTF_CREATE", cds: "C_MaintNotificationListReport", guiTx: ["IW21", "IW22", "IW23", "IW26", "IW27", "IW28"],
    relatedTables: ["QMEL", "QMIH"], relatedObjects: ["BAPI_ALM_NOTIF_CREATE"],
    ecc: "ECC: IW21.", s4OnPrem: "yes", cloud: "yes",
    commonErrors: ["סוג הודעה לא זמין למשתמש → בדוק הקצאת Catalog + סוגי הודעה מותרים."],
    cbc: "מפעיל בקו המילוי מדווח תקלת מסוע מהטאבלט; ההודעה מומרת לפקודה על-ידי המתכנן.",
    similar: ["manage-maintenance-orders", "confirm-jobs"],
  },
  {
    id: "F2730", slug: "confirm-jobs", name: "Confirm Jobs", he: "אישור עבודות אחזקה", module: "PM", type: "Transactional",
    trust: "curated", source: SRC, lastReviewed: LV,
    purpose: "אישור עבודות אחזקה — דיווח שעות, סטטוס ופעולות שבוצעו, כולל תמיכה מובייל לשטח.",
    problem: "טכנאים מדווחים ביצוע בשטח; IW41/42 אינם מותאמים למובייל. Fiori מאפשר אישור מהיר מכל מכשיר.",
    explain: { beginner: "מדווחים כמה שעות עבדת ומה בוצע.", consultant: "אישור זמן/פעולה דרך OData; משפיע על עלויות הפקודה.", technical: "SAPUI5 מעל API_MAINTENANCEORDERCONF." },
    role: "SAP_BR_MAINTENANCE_TECHNICIAN", catalog: "SAP_EAM_BC_MAINT_WORKER",
    odata: "API_MAINTENANCEORDERCONF", guiTx: ["IW41", "IW42"], relatedTables: ["AFRU"],
    ecc: "ECC: IW41/IW42.", s4OnPrem: "yes", cloud: "yes",
    commonErrors: ["אישור נכשל → פקודה לא משוחררת או תקופת רישום סגורה."],
    similar: ["manage-maintenance-orders", "create-maintenance-request"],
  },
  {
    id: "F2730A", slug: "manage-technical-objects", name: "Manage Technical Objects", he: "ניהול אובייקטים טכניים", module: "PM", type: "Transactional",
    trust: "curated", source: SRC, lastReviewed: LV,
    purpose: "ניהול ציוד ומיקומים פונקציונליים — יצירה, שינוי, מבנה היררכי והתקנה/פירוק.",
    problem: "אובייקטים טכניים מנוהלים בכמה טרנזקציות (IE01/IL01/IH08). Fiori מאחד list+detail עם מבנה.",
    explain: { beginner: "מנהלים את המכונות והמיקומים במפעל.", consultant: "מבוסס API_EQUIPMENT / API_FUNCTIONALLOCATION; כולל היררכיה.", technical: "List Report + Object Page מעל I_Equipment / I_FunctionalLocation." },
    role: "SAP_BR_MAINTENANCE_PLANNER", catalog: "SAP_EAM_BC_TECH_OBJ",
    odata: "API_EQUIPMENT / API_FUNCTIONALLOCATION", cds: "I_Equipment / I_FunctionalLocation", guiTx: ["IE01", "IL01", "IH08"],
    relatedTables: ["EQUI", "IFLOT", "ILOA"], relatedObjects: ["BAPI_EQUI_CREATE"],
    ecc: "ECC: IE01/IL01/IH08.", s4OnPrem: "yes", cloud: "yes",
    similar: ["manage-maintenance-orders"],
  },
  {
    // F4072 · corrected 2026-09-22 (design-audit continuation §11 / research-queue-fiori.md):
    // the official record is Screen Maintenance Requests (Maintenance Management 2025.001,
    // loio 5ae0d3b492dc4df3a0eb1b8cad02cda3; Fiori Apps Reference Library appId=F4072;
    // What's New 2021 "App New"). The scheduling content this row used to carry belongs to
    // apps that had no record at the time (F2774 Mass Schedule Maintenance Plans, F5325
    // Manage Maintenance Plans, both added later that day) and was NOT moved here.
    // role/catalog/odata/guiTx filled 2026-09-24 from scripts/fal-app.mjs F4072 (S32OP =
    // S/4HANA 2025 FPS01, Published; same role, catalog, OData and GUI transactions on
    // S27OP = S/4HANA 2023); the verification record fiori:F4072 carries the full evidence
    // including RIN notes and scope items.
    id: "F4072", slug: "screen-maintenance-requests", name: "Screen Maintenance Requests", he: "סינון וקבלת בקשות תחזוקה", module: "PM", type: "Transactional",
    trust: "verified-docs", source: "SAP Help Portal · Maintenance Management 2025.001 (Screen Maintenance Requests) · SAP Fiori Apps Reference Library F4072 (S32OP/S27OP, scripts/fal-app.mjs)", lastReviewed: "2026-09-24",
    purpose: "סינון וקבלה של בקשות אחזקה (Maintenance Requests): לפי התיעוד הרשמי, 'With this app, you can screen and accept maintenance requests'.",
    problem: "",
    explain: { beginner: "מסך שבו בוחנים בקשות אחזקה שנפתחו (למשל ב-Create Maintenance Request) ומקבלים אותן להמשך טיפול.", consultant: "לפי Maintenance Management 2025 FPS01 היישום מסנן ומקבל בקשות אחזקה; ב-SAP S/4HANA Cloud Public Edition 2608 הוא מסומן 'Old Version' לצד Manage Maintenance Notifications (F5777), עדות לענן הציבורי בלבד.", technical: "תפקיד SAP_BR_MAINT_SUPERVISOR (R0198), קטלוג עסקי SAP_EAM_BC_MREQ_DSP, קטלוג טכני SAP_TC_EAM_COMMON, שירות OData UI_MAINTWORKREQUESTOVW_V2 (S4CORE 109); ראו רשומת האימות fiori:F4072." },
    role: "SAP_BR_MAINT_SUPERVISOR", catalog: "SAP_EAM_BC_MREQ_DSP",
    odata: "UI_MAINTWORKREQUESTOVW_V2", guiTx: ["IW21", "IW22", "IW23", "IW28", "IW29"], relatedTables: [],
    ecc: "", s4OnPrem: "yes", cloud: "yes",
    similar: [],
  },
  {
    // F2774 · added 2026-09-22 (master completion §12). Sources: Maintenance Management
    // 2025.001 (loio 12f60922946c4ec49807c81ad93d5ba4, "App ID: F2774"), What's New 1709
    // (loio ef815ff35f454fb389d17bbae8ac7250), What's New S/4HANA 100 (loio
    // 6f39ce28d1e14e57adaf45dcf1beed30). Type, role, catalogs, OData and GUI transactions
    // come from the SAP Fiori Apps Reference Library's public OData service
    // (scripts/fal-app.mjs F2774, S32OP = S/4HANA 2025 FPS01, Published; same values on
    // S27OP = S/4HANA 2023), read 2026-09-24. Until then the type was derived from the
    // documented function and role, catalog and OData were empty, because the library page
    // loads as a JS shell. IP30 is the library's leading transaction and IP30H a related one.
    id: "F2774", slug: "mass-schedule-maintenance-plans", name: "Mass Schedule Maintenance Plans", he: "תזמון המוני של תכניות תחזוקה", module: "PM", type: "Transactional",
    trust: "verified-docs", source: "SAP Fiori Apps Reference Library F2774 (S32OP/S27OP, scripts/fal-app.mjs) · SAP Help Portal · Maintenance Management 2025.001 · What's New in SAP S/4HANA 1709", lastReviewed: "2026-09-24",
    purpose: "תזמון המוני של תכניות תחזוקה: לפי התיעוד הרשמי, 'With this app, you can schedule all maintenance plans that are due within a specific time frame'.",
    problem: "",
    explain: { beginner: "מסך שבו מתכנן התחזוקה מתזמן בבת אחת את כל תכניות התחזוקה שמועדן חל בחלון זמן מסוים.", consultant: "לפי What's New in SAP S/4HANA (גרסה 100) היישום מיועד למתכנן התחזוקה ('As a maintenance planner, you can use this app to schedule all maintenance plans that are due within a specific time frame'), וזמין מ-S/4HANA 1709. לפי ספריית יישומי ה-Fiori (S32OP), IP30 היא טרנזקציית ה-GUI המובילה של היישום ו-IP30H טרנזקציה קשורה; תיעוד התזמון של 2025 FPS01 מתאר את IP30H באותו שם ('Mass schedule maintenance plans (transaction IP30H)'), ואין בכך קביעה שהיישום עוטף את הלוגיקה של IP30H.", technical: "תפקיד SAP_BR_MAINTENANCE_PLANNER (R0088), קטלוגים עסקיים SAP_EAM_BC_MPLAN ו-SAP_EAM_BC_SHMP_MNG, קטלוג טכני SAP_TC_EAM_COMMON ושירות OData APJ_JOB_MANAGEMENT_SRV (טכנולוגיית UI: SAP Fiori: Generic Job Scheduling Framework), לפי scripts/fal-app.mjs על S32OP ו-S27OP; ראו רשומת האימות fiori:F2774." },
    role: "SAP_BR_MAINTENANCE_PLANNER", catalog: "SAP_EAM_BC_MPLAN, SAP_EAM_BC_SHMP_MNG",
    odata: "APJ_JOB_MANAGEMENT_SRV", guiTx: ["IP30", "IP30H"], relatedTables: [],
    ecc: "", s4OnPrem: "yes", cloud: "unknown",
    releaseInfo: "SAP S/4HANA 1709 (What's New 1709)",
    similar: [],
  },
  {
    // F5325 · added 2026-09-22 (master completion §12). Sources: What's New 2022 (loio
    // 9fe2ab1a1d5f4f1482ebebdfb9a875d2, deprecation of the Manage Maintenance Plan and Item
    // List app with F5325 and F5356 as successors), What's New 2023 FPS01 (loio
    // 0e83f36ad7914324976ddc9db47621fc, its deletion), What's New 2025 FPS01 (loio
    // a0c0e9f184f24910b2985d6a7cccb43a, scope items 4HI and BJ2, "App ID: F5325"), Data
    // Migration "PM - Maintenance plan" 2025.001 (loio b97c17855d78480ead0cebb32c4a346f).
    // Until 2026-09-24 the type was derived from the documented function and role, catalog
    // and OData were empty. Type, role, catalogs, OData and GUI transactions now come from the
    // SAP Fiori Apps Reference Library's public OData service (scripts/fal-app.mjs F5325,
    // S32OP = S/4HANA 2025 FPS01, Published; S27OP = S/4HANA 2023 prints the lead role, same
    // catalogs and GUI transactions, and one OData service, UI_MAINTENANCE_PLAN), read
    // 2026-09-24. App documentation page loio f0e9632b0e654fbeae597bad6abb823c read via
    // scripts/sap-help-body.mjs.
    id: "F5325", slug: "manage-maintenance-plans", name: "Manage Maintenance Plans", he: "ניהול תכניות תחזוקה", module: "PM", type: "Transactional",
    trust: "verified-docs", source: "SAP Fiori Apps Reference Library F5325 (S32OP/S27OP, scripts/fal-app.mjs) · SAP Help Portal · Manage Maintenance Plans, Maintenance Management 2025.001 · What's New in SAP S/4HANA 2022, 2023, 2023 FPS01, 2025 FPS01 · Data Migration 2025.001 (PM - Maintenance plan)", lastReviewed: "2026-09-24",
    purpose: "ניהול תכניות תחזוקה: היישום שמחליף מ-S/4HANA 2022 את Manage Maintenance Plan and Item List, יחד עם Manage Maintenance Items (F5356).",
    problem: "",
    explain: { beginner: "מסך לעיבוד ולהצגה של תכניות תחזוקה, שהחליף את רשימת התכניות והפריטים הישנה.", consultant: "לפי What's New 2022 היישום Manage Maintenance Plan and Item List הוצא משימוש וזמינים במקומו Manage Maintenance Plans (F5325) ו-Manage Maintenance Items (F5356); ב-2023 FPS01 היישום הישן נמחק. What's New 2025 FPS01 משייך את F5325 לפריטי ההיקף 4HI (Proactive Maintenance) ו-BJ2 (Preventive Maintenance). תיעוד ההגירה של אובייקט 'PM - Maintenance plan' מונה אותו לצד Display Maintenance Plan (IP16) ו-(IP03). ספריית יישומי ה-Fiori (S32OP) מונה את IP01 כטרנזקציית ה-GUI המובילה, את IP02, IP03, IP04, IP05, IP06 ו-IP16 כטרנזקציות קשורות, ואת F3622, F5009 ו-W0026 כקודמים.", technical: "רכיב PM-PRM-MP (Maintenance Plans) לפי What's New 2023; אובייקט ההרשאה I_MPTYP (Maintenance Plan Category) זמין ביישום מ-2023. לפי ספריית יישומי ה-Fiori (scripts/fal-app.mjs, S32OP): רכיב יישום PM-FIO-PRM-MP, תפקיד מוביל SAP_BR_MAINTENANCE_PLANNER (R0088) ותפקיד נוסף SAP_BR_MD_SPECIALIST_EAM (R0097-180), קטלוגים עסקיים SAP_EAM_BC_MPLAN ו-SAP_EAM_BC_MP_MNG, קטלוג טכני SAP_TC_EAM_COMMON, שירותי OData /SSB/SMART_BUSINESS_RUNTIME_SRV, C_MAINTPLANACTVSYSTSTATUSQ_CDS ו-UI_MAINTENANCE_PLAN (S4COREOP 109); ב-S27OP (2023) מודפס שירות יחיד, UI_MAINTENANCE_PLAN (S4COREOP 108). ראו רשומת האימות fiori:F5325." },
    role: "SAP_BR_MAINTENANCE_PLANNER, SAP_BR_MD_SPECIALIST_EAM", catalog: "SAP_EAM_BC_MPLAN, SAP_EAM_BC_MP_MNG",
    authObjects: ["I_MPTYP"],
    odata: "/SSB/SMART_BUSINESS_RUNTIME_SRV, C_MAINTPLANACTVSYSTSTATUSQ_CDS, UI_MAINTENANCE_PLAN",
    guiTx: ["IP01", "IP02", "IP03", "IP04", "IP05", "IP06", "IP16"], relatedTables: [],
    ecc: "", s4OnPrem: "yes", cloud: "unknown",
    releaseInfo: "SAP S/4HANA 2022 (What's New 2022, successor of Manage Maintenance Plan and Item List)",
    similar: [],
  },
  {
    // F2336 · 2026-09-24: role, catalog, OData and GUI transactions copied from the SAP Fiori
    // Apps Reference Library (scripts/fal-app.mjs F2336, S32OP = S/4HANA 2025 FPS01, Published;
    // same role, catalog, primary OData service and GUI transactions on S27OP = 2023). odata is
    // the library's PrimaryODataServiceName; the other services it prints are listed in the
    // verification record fiori:F2336. Name and type are unchanged (the library prints the
    // same). cds, relatedTables, purpose, problem, explain, ecc and similar keep their curated
    // values and were not read from the library; data/centers/fiori.ts#manage-production-orders
    // still carries the curated role, catalog, OData and GUI transactions.
    id: "F2336", slug: "manage-production-orders", name: "Manage Production Orders", he: "ניהול הזמנות ייצור", module: "PP", type: "Transactional",
    trust: "verified-docs", source: "SAP Fiori Apps Reference Library F2336 (scripts/fal-app.mjs, OData channel, S32OP = S/4HANA 2025 FPS01, isPublished=Published); same role, catalogs, primary OData service and GUI transactions on S27OP = S/4HANA 2023", lastReviewed: "2026-09-24",
    purpose: "ניהול פקודות ייצור בדיד — יצירה, שחרור, מעקב וסגירה.",
    problem: "CO01/CO02/COOIS מפוזרים. Fiori מרכז את ניהול פקודות הייצור.",
    explain: { beginner: "מנהלים את הזמנות הייצור.", consultant: "שירות ה-OData של היישום לפי ספריית ה-Fiori (S32OP): PP_MPE_ORDER_MANAGE.", technical: "List Report/Object Page מעל I_ProductionOrder." },
    role: "SAP_BR_PRODN_SUPERVISOR_DISC", catalog: "SAP_SCM_BC_PRODN_ORD_MNTR",
    odata: "PP_MPE_ORDER_MANAGE", cds: "I_ProductionOrder", guiTx: ["CO02", "CO05", "CO05N", "CO09", "CO0R5", "CO20", "CO21", "CO22", "CO23", "CO26", "COHV", "COOIS"],
    relatedTables: ["AUFK", "AFKO", "AFPO"], ecc: "ECC: CO01/CO02.", s4OnPrem: "yes", cloud: "yes",
    similar: ["manage-process-orders", "post-goods-movement"],
  },
  {
    id: "F3577", slug: "manage-process-orders", name: "Manage Process Orders", he: "ניהול הזמנות תהליך", module: "PP-PI", type: "Transactional",
    trust: "curated", source: SRC, lastReviewed: LV,
    purpose: "ניהול פקודות תהליך (Process Orders) בייצור תהליכי, כולל שילוב PP-DS ו-aATP.",
    problem: "COR1/COR2/COID מפוזרים; Fiori מרכז ניהול פקודות תהליך.",
    explain: { beginner: "מנהלים הזמנות ייצור תהליכי.", consultant: "מבוסס API_PROCESS_ORDER_2_SRV; שילוב מתכונים ו-Control Recipes.", technical: "מעל I_ManufacturingOrder." },
    role: "SAP_BR_PRODN_OPERATOR_PROC", catalog: "SAP_PP_BC_PROCESS_ORDER",
    odata: "API_PROCESS_ORDER_2_SRV", cds: "I_ManufacturingOrder", guiTx: ["COR1", "COR2", "COID"],
    relatedTables: ["AFKO", "AFPO", "AFVC"], relatedObjects: ["BAPI_PROCORD_CREATE"],
    ecc: "ECC: COR1/COR2.", s4OnPrem: "yes", cloud: "yes",
    similar: ["confirm-process-order", "manage-batches"],
  },
  {
    id: "F3364", slug: "confirm-process-order", name: "Confirm Process Order", he: "אישור הזמנת תהליך", module: "PP-PI", type: "Transactional",
    trust: "curated", source: SRC, lastReviewed: LV,
    purpose: "אישור שלבי פקודת תהליך כולל Backflush וקבלת תוצר (GR) מה-Launchpad.",
    problem: "COR6N אינו מותאם מובייל. Fiori מאפשר אישור מהיר בשטח.",
    explain: { beginner: "מדווחים שהשלב בייצור בוצע.", consultant: "מבוסס API_PROC_ORDER_CONFIRMATION_2_SRV; מטפל ב-Backflush ו-GR.", technical: "מעל אישורי פקודת תהליך (AFRU)." },
    role: "SAP_BR_PRODN_OPERATOR_PROC", catalog: "SAP_PP_BC_PROCESS_ORDER",
    odata: "API_PROC_ORDER_CONFIRMATION_2_SRV", guiTx: ["COR6N"], relatedTables: ["AFRU", "RESB"], relatedObjects: ["BAPI_PROCORDCONF_CREATE_TT"],
    ecc: "ECC: COR6N.", s4OnPrem: "yes", cloud: "yes",
    commonErrors: ["תנועות תקועות ב-COGI לאחר Backflush → חוסר מלאי רכיב."],
    similar: ["manage-process-orders", "manage-batches"],
  },
  {
    id: "F1576", slug: "manage-batches", name: "Manage Batches", he: "ניהול אצוות", module: "PP-PI", type: "Transactional",
    trust: "curated", source: SRC, lastReviewed: LV,
    purpose: "ניהול אצוות (Batches) — יצירה, מאפיינים, וסטטוס, כולל Batch Information Cockpit.",
    problem: "MSC1N/2N/3N מפוזרים; Fiori מרכז ניהול אצוות.",
    explain: { beginner: "מנהלים אצוות של חומרים.", consultant: "מבוסס API_BATCH; שילוב סיווג (Classification).", technical: "מעל I_Batch." },
    role: "SAP_BR_WAREHOUSE_CLERK", catalog: "SAP_LO_BC_BATCH",
    odata: "API_BATCH", cds: "I_Batch", guiTx: ["MSC1N", "MSC2N", "MSC3N"], relatedTables: ["MCH1", "MCHA"],
    ecc: "ECC: MSC1N/2N/3N.", s4OnPrem: "yes", cloud: "yes",
    similar: ["confirm-process-order", "post-goods-movement"],
  },
  {
    id: "F0843", slug: "post-goods-movement", name: "Post Goods Movement", he: "רישום תנועת סחורה", module: "PP", type: "Transactional",
    trust: "curated", source: SRC, lastReviewed: LV,
    purpose: "רישום תנועות סחורה (קבלה, ניפוק, העברה) — מחליף MIGO; התנועות נרשמות ל-MATDOC.",
    problem: "MIGO מורכב; Fiori נותן חוויה ממוקדת לסוגי תנועה נפוצים.",
    explain: { beginner: "מקבלים או מנפקים חומר מהמלאי.", consultant: "מבוסס API_MATERIAL_DOCUMENT_SRV; MATDOC ב-S/4.", technical: "מעל I_MaterialDocumentItem." },
    role: "SAP_BR_WAREHOUSE_CLERK", catalog: "SAP_MM_BC_GOODS_MVT",
    odata: "API_MATERIAL_DOCUMENT_SRV", cds: "I_MaterialDocumentItem", guiTx: ["MIGO", "MB31"], relatedTables: ["MATDOC"], relatedObjects: ["BAPI_GOODSMVT_CREATE"],
    ecc: "ECC: MIGO/MB31 (MSEG).", s4OnPrem: "yes", cloud: "yes",
    similar: ["manage-production-orders", "confirm-process-order"],
  },

  // ── Sprint Fiori-1 — 5 verified apps (F-IDs confirmed via SAP Fiori Apps Library) ──
  {
    // F4604 · 2026-09-24: catalog and OData copied from the SAP Fiori Apps Reference Library
    // (scripts/fal-app.mjs F4604, S32OP = S/4HANA 2025 FPS01, Published; same role, catalogs, primary
    // OData service and GUI transactions on S27OP = 2023); the role was already the library's. odata is
    // the library's PrimaryODataServiceName (the other three services are in fiori:F4604). guiTx is
    // empty because the library prints '-' for leading and related GUI transactions; IW28/IW38 stay in
    // problem, ecc and the record's xrefs. Name, type and the other fields keep their curated values
    // (explain.consultant still names API_MaintenanceOrder).
    id: "F4604", slug: "manage-maintenance-notifications-orders", name: "Manage Maintenance Notifications and Orders", he: "ניהול הודעות ופקודות אחזקה", module: "PM", type: "Transactional",
    trust: "verified-docs", source: "SAP Fiori Apps Reference Library F4604 (scripts/fal-app.mjs, OData channel, S32OP = S/4HANA 2025 FPS01, isPublished=Published); same role, catalogs, primary OData service and empty GUI transactions on S27OP = S/4HANA 2023", lastReviewed: "2026-09-24",
    purpose: "ניהול משולב של הודעות ופקודות אחזקה המעובדות בשלבים (phase-based) — צפייה בהודעות שנבדקו ואושרו, סינון לפי סוג אובייקט ביצוע, עדיפות, תת-שלב, הקצאת חשבון ומקבלי עלות.",
    problem: "מתכנן אחזקה צריך מבט אחד על הודעות + פקודות לאורך שלבי העיבוד, במקום לפצל בין IW28 (הודעות) ל-IW38 (פקודות). האפליקציה מאחדת את שני העולמות בזרימת phase-based.",
    process: "הודעה → סינון/אישור → פקודה → שלבים → ביצוע",
    explain: { beginner: "רשימה אחת שמנהלת גם תקלות שדווחו וגם את עבודת התיקון.", consultant: "phase-based processing מעל אובייקט ALM; מבוסס OData (API_MaintenanceOrder).", technical: "SAPUI5 List Report/Object Page; Backend = ALM Order + Notification. CDS: בקרוב (טרם אומת)." },
    role: "SAP_BR_MAINTENANCE_PLANNER", catalog: "SAP_EAM_BC_MNTWRK_MNG",
    odata: "UI_MAINTWRKREQ_ORD_MANAGE", guiTx: [], relatedTables: ["QMEL", "AUFK", "AFIH"], relatedObjects: ["BAPI_ALM_ORDER_MAINTAIN"],
    ecc: "ECC: IW28/IW38 (SAP GUI נפרדים, ללא זרימת phase-based).", s4OnPrem: "yes", cloud: "yes", releaseInfo: "S/4HANA (On-Prem + Public Cloud)",
    commonErrors: ["האפליקציה לא מציגה הודעות → בדוק שסוג ההודעה משתייך ל-phase-based processing ושה-Business Role/Catalog הוקצו.", "OData 403 → הרשאה חסרה לסוג הפקודה/הודעה."],
    troubleshooting: "בדוק הקצאת Business Role, את ה-Catalog ב-Launchpad Content Manager, ואת /IWFND/ERROR_LOG לשגיאות OData.",
    similar: ["manage-maintenance-orders", "create-maintenance-request", "confirm-jobs"],
  },
  {
    // F0251 · 2026-09-24: role (the library's leading role) and OData copied from the SAP Fiori Apps
    // Reference Library (scripts/fal-app.mjs F0251, S32OP = S/4HANA 2025 FPS01, Published; same on
    // S27OP = 2023); catalog unchanged. guiTx MD04/MD07 stays curated: the library prints '-' for
    // leading and related GUI transactions. The secondary roles and the retail catalog the library
    // also prints are listed in the verification record fiori:F0251.
    id: "F0251", slug: "manage-material-coverage", name: "Manage Material Coverage", he: "ניהול כיסוי חומרים", module: "PP", type: "Transactional",
    trust: "verified-docs", source: "SAP Fiori Apps Reference Library, F0251 @ S32OP (S/4HANA 2025 FPS01), fetched via scripts/fal-app.mjs", lastReviewed: "2026-09-24",
    purpose: "טיפול במחסורים של חומר בודד ב-MRP Cockpit — הצגת מקטעי דרישות נטו וסגמנטים ייחודיים (לקוח/פרויקט/רכש ישיר), ופעולות תיקון על הפריטים שנבחרו ב-Monitor Material Coverage.",
    problem: "מתכנן MRP צריך לפתור חוסרים ברמת החומר הבודד מהר, עם המלצות פעולה, במקום ניתוח ידני ב-MD04. חלק ממשפחת MRP Cockpit.",
    process: "MRP Run → Monitor (F0247) → Manage (F0251) → פעולת תיקון",
    explain: { beginner: "מסך שמראה מתי יחסר חומר ומה לעשות כדי לכסות.", consultant: "חלק מ-MRP Cockpit; catalog SAP_SCM_BC_MRPCOCKPIT; gateway project PP_MRP_COCKPIT.", technical: "SAPUI5 מעל gateway project PP_MRP_COCKPIT; קורא מתוצאות ה-MRP (MDKP/MDTB). CDS: בקרוב (טרם אומת)." },
    role: "SAP_BR_PRODN_PLNR", catalog: "SAP_SCM_BC_MRPCOCKPIT",
    odata: "PP_MRP_COCKPIT_SRV", guiTx: ["MD04", "MD07"], relatedTables: ["MDKP", "MDTB"],
    ecc: "ECC: MD04 (רשימת מלאי/דרישות) / MD07 (מבט קולקטיבי).", s4OnPrem: "yes", cloud: "yes", releaseInfo: "S/4HANA (On-Prem + Public Cloud)",
    commonErrors: ["לא ניתן להזין MRP Controller/Plant/MRP Area → בעיה ידועה בגרסאות Fiori מוקדמות; בדוק SAP Notes לגרסת ה-FES.", "אין נתונים → הפעל תחילה Monitor Material Coverage (F0247) והגדר סינון."],
    similar: ["monitor-material-coverage-net-segments", "manage-production-orders"],
  },
  {
    // F0247A · 2026-09-24: roles, OData and GUI transactions copied from the SAP Fiori Apps Reference
    // Library (scripts/fal-app.mjs F0247A, S32OP = S/4HANA 2025 FPS01, Published: roles
    // SAP_BR_MATL_PLNR_EXT_PROC R0100-21 and SAP_BR_PRODN_PLNR R0114, OData 0001 on S4CORE 109,
    // leading MB53). The name is not changed: the library's catalog calls the app 'Monitor Material
    // Coverage (Version 2)' while help.sap.com calls it 'Monitor Material Coverage - Net Segments'; that
    // conflict is a product decision (fiori:F0247A, conflicting_sources).
    id: "F0247A", slug: "monitor-material-coverage-net-segments", name: "Monitor Material Coverage - Net Segments", he: "ניטור כיסוי חומרים — מקטעי נטו", module: "PP", type: "Transactional",
    trust: "verified-docs", source: "SAP Fiori Apps Library (Apps('F0247A')/S32OP + S27OP, scripts/fal-app.mjs) + SAP Help Portal app documentation page (loio 5d0feac5e1c447f2a2bab0976215f3b2)", lastReviewed: "2026-09-24",
    purpose: "ניטור מצב המחסור של חומרים לאורך מקטעי הדרישות נטו — נקודת הכניסה של MRP Cockpit לזיהוי חוסרים לפני צלילה ל-Manage Material Coverage.",
    problem: "מתכנן MRP צריך תמונת-על של כל החומרים הבעייתיים ב-MRP Area שלו, עם עמודות וסינונים לזיהוי מהיר, במקום סריקת MD07 ידנית.",
    process: "MRP Run → Monitor (F0247) → drill ל-Manage (F0251)",
    explain: { beginner: "רשימה של כל החומרים שעומדים להיגמר.", consultant: "משפחת MRP Cockpit; catalog SAP_SCM_BC_MRPCOCKPIT; מזין את F0251.", technical: "SAPUI5 מעל MRP Cockpit gateway; קורא תוצאות MRP. CDS: בקרוב (טרם אומת)." },
    role: "SAP_BR_MATL_PLNR_EXT_PROC, SAP_BR_PRODN_PLNR", catalog: "SAP_SCM_BC_MRPCOCKPIT",
    odata: "PP_MRP_AOR_SRV, PP_MRP_MATERIAL_COVERAGE_POVER_SRV_, PP_MRP_MATERIAL_COVERAGE_SRV", guiTx: ["MB53", "MD04", "MD06", "MD07", "MS06", "MS07"], relatedTables: ["MDKP", "MDTB"],
    ecc: "ECC: MD07 (מבט קולקטיבי) / MD04.", s4OnPrem: "yes", cloud: "yes", releaseInfo: "S/4HANA (On-Prem + Public Cloud)",
    commonErrors: ["רשימה ריקה → בדוק הרשאות ל-MRP Area/Plant והפעלת MRP Run עדכני."],
    similar: ["manage-material-coverage", "manage-production-orders"],
  },
  {
    // F3951 · 2026-09-24: role and catalog match the SAP Fiori Apps Reference Library and the OData
    // services were copied from it (scripts/fal-app.mjs F3951, S32OP and S27OP, Published). guiTx
    // CM21/CM25 stays curated: the library prints '-' for leading and related GUI transactions (open
    // decision, see fiori:F3951).
    id: "F3951", slug: "capacity-scheduling-board", name: "Capacity Scheduling Board", he: "לוח תזמון קיבולת", module: "PP", type: "Transactional",
    trust: "verified-docs", source: "SAP Fiori Apps Reference Library F3951 (scripts/fal-app.mjs, xsodata channel, S32OP = S/4HANA 2025 FPS01, isPublished=Published; PP_MNTR_WRKCTR_SRV 0001, PP_MRP_AOR_SRV 0001); same role, catalog and OData on S27OP = S/4HANA 2023; library prints no leading/related GUI transaction code for F3951 on either release; curated guiTx CM21/CM25 kept, conflict unresolved", lastReviewed: "2026-09-24",
    purpose: "תזמון קיבולת גרפי (Gantt) — מתזמן הייצור צופה במרכזי עבודה עם לוחות זמנים על גרף לפי מוצר, סטטוס תזמון, מפעל ו-MRP Area, ומבצע Dispatch/Deallocate ותזמון-מחדש של פעולות.",
    problem: "תזמון גס ב-CM21/CM25 קשה לתפעול ויזואלי. הלוח נותן מבט Gantt אינטראקטיבי עם תזמון סופי (finite) ואיזון עומסים.",
    process: "פקודה משוחררת → Dispatch ללוח → תזמון-מחדש → ביצוע",
    explain: { beginner: "לוח גרפי שמסדר איזו עבודה רצה על איזו מכונה ומתי.", consultant: "role SAP_BR_PRODN_PLNR מ-catalog SAP_SCM_BC_CFS; דורש SAP liveCache; רק פקודות עם 'Relevant to Finite Scheduling' במרכז העבודה מוצגות.", technical: "אפליקציית Gantt מבוססת liveCache. OData/CDS: בקרוב (טרם אומת)." },
    role: "SAP_BR_PRODN_PLNR", catalog: "SAP_SCM_BC_CFS",
    odata: "PP_MNTR_WRKCTR_SRV, PP_MRP_AOR_SRV", guiTx: ["CM21", "CM25"], relatedTables: ["AFKO", "AFVC", "CRHD"],
    ecc: "ECC: CM21/CM25 (Capacity Leveling, ללא Gantt אינטראקטיבי).", s4OnPrem: "yes", cloud: "yes", releaseInfo: "S/4HANA (דורש liveCache)",
    commonErrors: ["פקודות לא מופיעות בלוח → סמן 'Relevant to Finite Scheduling' במרכז העבודה.", "הלוח ריק/שגיאה → ודא ש-SAP liveCache מותקן ופעיל."],
    similar: ["production-scheduling-board", "manage-production-orders"],
  },
  {
    // F2176 · 2026-09-24: catalog, OData and GUI transactions copied from the SAP Fiori Apps Reference
    // Library (scripts/fal-app.mjs F2176, S32OP = S/4HANA 2025 FPS01, Published; same on S27OP = 2023):
    // leading /SAPAPO/CDPS0 and related /SAPAPO/CDPS1-3 and /SAPAPO/RPT replace the curated CM21/CO03.
    // Role and name unchanged (the library prints the same).
    id: "F2176", slug: "production-scheduling-board", name: "Production Scheduling Board", he: "לוח תזמון ייצור", module: "PP", type: "Transactional",
    trust: "verified-docs", source: "SAP Fiori Apps Library (F2176, S32OP = S/4HANA 2025 FPS01; PPDS_RES_SCHEDULE 0001): https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2176')/S32OP", lastReviewed: "2026-09-24",
    purpose: "אופטימיזציה ותכנון מפורט של לוח המשאבים ותאריכי/שעות הפקודות תוך התחשבות בזמינות משאבים ורכיבים — לוח תזמון ייצור מתקדם (PP/DS).",
    problem: "תזמון מפורט הדורש התחשבות בו-זמנית במשאב וברכיבים אינו נוח ב-GUI. הלוח נותן תכנון אינטראקטיבי עם בדיקות זמינות.",
    process: "פקודה מתוכננת → תזמון על משאב → בדיקת זמינות רכיבים → קיבוע",
    explain: { beginner: "לוח מתקדם שמסדר ייצור לפי זמינות מכונות וחומרים.", consultant: "יכולת PP/DS (Manufacturing for planning and scheduling); מתזמן ייצור.", technical: "לוח מבוסס PP/DS מעל liveCache. OData/CDS: בקרוב (טרם אומת)." },
    role: "SAP_BR_PRODN_PLNR", catalog: "SAP_SCM_BC_CAPA_PLAN",
    odata: "PPDS_RES_SCHEDULE", guiTx: ["/SAPAPO/CDPS0", "/SAPAPO/CDPS1", "/SAPAPO/CDPS2", "/SAPAPO/CDPS3", "/SAPAPO/RPT"], relatedTables: ["AFKO", "AFVC", "CRHD"],
    ecc: "ECC/APO: לוח תזמון מפורט (DS Board) — ב-S/4 חלק מ-PP/DS.", s4OnPrem: "yes", cloud: "yes", releaseInfo: "S/4HANA Manufacturing for planning and scheduling (PP/DS)",
    commonErrors: ["הלוח לא נטען → ודא הפעלת PP/DS ו-liveCache.", "פעולות חסרות → בדוק שהמשאב רלוונטי לתזמון סופי."],
    similar: ["capacity-scheduling-board", "manage-process-orders"],
  },

  // ── Sprint Fiori-2 — 3 verified apps (F-IDs + roles confirmed via Fiori Apps Library / Help Portal) ──
  {
    // F3289 · 2026-09-24: OData and GUI transaction copied from the SAP Fiori Apps Reference Library
    // (scripts/fal-app.mjs F3289, S32OP and S27OP, Published): leading CM01 with an empty related
    // list, so CM07 left guiTx (it stays in ecc and in the record's xrefs). Role and catalog match the
    // library. type stays Transactional: FioriType takes one value and the library prints
    // 'Transactional, Analytical'.
    id: "F3289", slug: "manage-work-center-capacity", name: "Manage Work Center Capacity", he: "ניהול קיבולת מרכז עבודה", module: "PP", type: "Transactional",
    trust: "verified-docs", source: "SAP Fiori Apps Reference Library F3289 (scripts/fal-app.mjs, OData channel, S32OP = S/4HANA 2025 FPS01, isPublished=Published); same role, catalog, OData services and leading GUI transaction on S27OP = S/4HANA 2023; library ApplicationType prints 'Transactional, Analytical', stored as Transactional because FioriType has one value", lastReviewed: "2026-09-24",
    purpose: "אפליקציית worklist לניהול עומס הקיבולת על מרכזי עבודה וזיהוי מצבי עומס-יתר — המתכנן רואה מרכזי עבודה לפי סינון, עם מצבים קריטיים מודגשים וגרף ניצולת בעמודת Utilization.",
    problem: "הערכת קיבולת ב-CM01/CM07 טקסטואלית וקשה לתפעול. האפליקציה נותנת worklist ויזואלי עם התרעה על עומס-יתר לאורך אופק ההערכה, לניצול טוב יותר של הקיבולות הזמינות.",
    process: "פקודות משוחררות → עומס על מרכז עבודה → זיהוי עומס-יתר → איזון",
    explain: { beginner: "מסך שמראה אילו מכונות עמוסות מדי ומתי.", consultant: "role SAP_BR_PRODN_PLNR מ-catalog SAP_SCM_BC_CFS; עובד רק למרכזי עבודה של PP (לא PM). זמין מ-S/4HANA Cloud 2002.", technical: "worklist מבוסס Fiori מעל נתוני קיבולת. OData/CDS: בקרוב (טרם אומת)." },
    role: "SAP_BR_PRODN_PLNR", catalog: "SAP_SCM_BC_CFS",
    odata: "PP_CFS_CAPEVAL_SRV / PP_MRP_AOR_SRV", guiTx: ["CM01"], relatedTables: ["CRHD", "KAKO"],
    ecc: "ECC: CM01/CM07 (הערכת קיבולת, ללא גרף ניצולת אינטראקטיבי).", s4OnPrem: "yes", cloud: "yes", releaseInfo: "S/4HANA (On-Prem + Public Cloud 2002+)",
    commonErrors: ["מרכז עבודה לא מופיע → האפליקציה תומכת רק במרכזי עבודה של PP, לא PM.", "אין נתוני עומס → ודא שקיימות פקודות/דרישות קיבולת רלוונטיות."],
    similar: ["capacity-scheduling-board", "production-scheduling-board"],
  },
  {
    id: "F5104A", slug: "perform-maintenance-jobs", name: "Perform Maintenance Jobs", he: "ביצוע עבודות אחזקה", module: "PM", type: "Transactional",
    trust: "curated", source: "SAP Fiori Apps Library + SAP Community (verified F-ID + role)", lastReviewed: LV2,
    purpose: "פתרון One-Stop-Shop לטכנאי אחזקה לביצוע רוב הפעילויות היומיומיות — צפייה וניהול פעולות, רישום זמן, ניהול רכיבים, רישום מדידות ולכידת נתוני תקלה — במסך אחד.",
    problem: "טכנאי אחזקה נדרש לכמה טרנזקציות (IW41 לאישור, IK11 למדידות) לביצוע Job Card אחד. האפליקציה מאחדת זיהוי עבודות פתוחות, שיוך-עצמי, אישור מהיר ורישום ביצוע במקום אחד, גם ממובייל.",
    process: "פקודה משוחררת → זיהוי/שיוך עבודה → ביצוע → אישור זמן/צריכה/תקלה",
    explain: { beginner: "אפליקציה אחת שבה הטכנאי רואה מה לתקן ומדווח על הביצוע.", consultant: "role SAP_BR_MAINTENANCE_TECHNICIAN; מאחד אישורים, זמן, רכיבים, מדידות ותקלות. נמסר ב-S/4HANA 2021 / Cloud 2105.", technical: "SAPUI5 One-Stop-Shop מעל אובייקט ALM Order + Confirmation. catalog: SAP_EAM_BC_MAINT_WORKER (סביר). OData/CDS: בקרוב (טרם אומת)." },
    role: "SAP_BR_MAINTENANCE_TECHNICIAN", catalog: "SAP_EAM_BC_MAINT_WORKER",
    guiTx: ["IW41"], relatedTables: ["AUFK", "AFIH", "AFVC", "AFRU"], relatedObjects: ["BAPI_ALM_ORDER_MAINTAIN"],
    ecc: "ECC: IW41 (אישור פקודת אחזקה) + טרנזקציות נפרדות למדידות/רכיבים.", s4OnPrem: "yes", cloud: "yes", releaseInfo: "S/4HANA 2021 / Cloud 2105+",
    commonErrors: ["אין עבודות ברשימה → בדוק הקצאת role SAP_BR_MAINTENANCE_TECHNICIAN ופקודות משוחררות שהוקצו לטכנאי.", "לא ניתן לאשר → ודא סטטוס פקודה מתאים והרשאות אישור."],
    similar: ["confirm-jobs", "create-maintenance-request", "manage-maintenance-orders"],
  },
  {
    id: "F1339", slug: "schedule-mrp-runs", name: "Schedule MRP Runs", he: "תזמון ריצות MRP", module: "PP", type: "Transactional",
    trust: "curated", source: "SAP Fiori Apps Library + SAP Help Portal (verified F-ID + role + job catalog)", lastReviewed: LV2,
    purpose: "יצירה ותזמון של Job להרצת MRP — המתכנן מתזמן ריצת MRP מ-Fiori וסוקר את סטטוס הביצוע, מעל מסגרת ה-Application Jobs הגנרית.",
    problem: "הרצת MRP ב-GUI (MD01N) דורשת גישה למערכת האחורית ותזמון batch ידני. האפליקציה נותנת תזמון ומעקב סטטוס בממשק Fiori אחיד.",
    process: "הגדרת Job → תזמון ריצת MRP → מעקב סטטוס → תוצאות ב-Monitor",
    explain: { beginner: "מתזמנים מתי המערכת תחשב מה צריך לייצר/לרכוש.", consultant: "role SAP_BR_MRP_CONTROLLER; מבוסס Application Jobs (job catalog SAP_SCM_MRP); דורש הרשאת MD01N בבקאנד.", technical: "Application Job framework; Job Catalog Entry SAP_SCM_MRP. Backend = MRP Live (MD01N). OData/CDS: בקרוב (טרם אומת)." },
    role: "SAP_BR_MRP_CONTROLLER", catalog: "SAP_SCM_MRP (Job Catalog)",
    guiTx: ["MD01N"], relatedTables: ["MDKP", "MDTB"],
    ecc: "ECC: MD01/MD01N (הרצת MRP; ללא מסגרת Application Jobs של Fiori).", s4OnPrem: "yes", cloud: "yes", releaseInfo: "S/4HANA (On-Prem + Public Cloud)",
    commonErrors: ["ה-Job נכשל/לא מתוזמן → ודא שה-Job Catalog Entry SAP_SCM_MRP הוגדר וש-SAPJ 'Scoping relevant' מסומן.", "אין הרשאה → המשתמש צריך הרשאת MD01N בבקאנד והרשאת תזמון batch."],
    similar: ["monitor-material-coverage-net-segments", "manage-material-coverage"],
  },
];

// ── Sprint Fiori-3 — 2 verified PM apps (F-IDs + roles confirmed) ──
FIORI_APPS.push(
  {
    id: "F2023", slug: "report-and-repair-malfunction", name: "Report and Repair Malfunction", he: "דיווח ותיקון תקלה", module: "PM", type: "Transactional",
    trust: "curated", source: "SAP Fiori Apps Library + SAP Community (verified F-ID + role)", lastReviewed: LV2,
    purpose: "טיפול בתקלות עבור טכנאי אחזקה בתהליך תקלת חירום (Emergency Breakdown) — דיווח תקלה, ניהול דוחות תקלה, ורשימת עבודות תיקון שהוקצו לי/לצוות, בשלוש אריחים (tiles).",
    problem: "בתקלת חירום הטכנאי צריך לדווח ולתקן מהר, בלי מסלול IW21→IW31 המלא. האפליקציה מקצרת: דיווח תקלה, מעקב, ושיוך עבודות תיקון — כולל סורק ברקוד לחלקי חילוף במובייל.",
    process: "תקלה → דיווח (Report Malfunction) → הקצאת עבודה → תיקון → סגירה",
    explain: { beginner: "אפליקציה לדווח על תקלה ולנהל את התיקון מהר.", consultant: "role SAP_BR_MAINTENANCE_TECHNICIAN; תהליך Emergency Breakdown; שלושה אריחים (Report / Manage Reports / My Job List). נמסר מ-S/4HANA Cloud 1708/1709.", technical: "SAPUI5 מעל הודעת/פקודת ALM. OData/CDS: בקרוב (טרם אומת)." },
    role: "SAP_BR_MAINTENANCE_TECHNICIAN", catalog: "SAP_EAM_BC_MAINT_WORKER",
    guiTx: ["IW21", "IW26"], relatedTables: ["QMEL", "AUFK", "AFIH"], relatedObjects: ["BAPI_ALM_NOTIF_CREATE"],
    ecc: "ECC: IW21/IW26 (יצירת הודעת תקלה) + IW31 לפקודה — מסלול נפרד, ללא תהליך breakdown מקוצר.", s4OnPrem: "yes", cloud: "yes", releaseInfo: "S/4HANA Cloud 1708/1709+",
    commonErrors: ["האריחים לא מופיעים → בדוק הקצאת role SAP_BR_MAINTENANCE_TECHNICIAN וסוגי הודעה מותרים.", "סריקת ברקוד לא זמינה → זמינה רק במכשיר נייד."],
    similar: ["create-maintenance-request", "perform-maintenance-jobs", "confirm-jobs"],
  },
  {
    id: "F2828", slug: "maintenance-planning-overview", name: "Maintenance Planning Overview", he: "סקירת תכנון אחזקה", module: "PM", type: "Analytical",
    trust: "curated", source: "SAP Fiori Apps Library + SAP Community (verified F-ID + role + catalog)", lastReviewed: LV2,
    purpose: "דשבורד One-Stop-Shop אנליטי למתכנן אחזקה — מאחד נתונים קריטיים בכרטיסים (cards) אינטראקטיביים המציגים KPIs ותצוגות נתונים בזמן אמת, מעל Overview Page (OVP).",
    problem: "מתכנן אחזקה צריך תמונת-על פרואקטיבית של עומס, פקודות פתוחות והתראות במקום ניווט בין IW38/IP10. הדשבורד מרכז את התמונה בכרטיסים.",
    process: "תכנון → סקירת KPIs (OVP) → drill לפקודות/תוכניות → פעולה",
    explain: { beginner: "מסך סיכום שמראה למתכנן מה דחוף וכמה עבודה פתוחה.", consultant: "role SAP_BR_MAINTENANCE_PLANNER; catalog SAP_EAM_BC_ORD_MC (ייתכן שאינו כלול ב-role כברירת מחדל — תלוי scope items). floorplan = Overview Page (OVP).", technical: "SAP Fiori Overview Page עם analytical cards. תלוי scope items (BH1/BH2/BJ2 מול Phase Model). OData/CDS: בקרוב (טרם אומת)." },
    role: "SAP_BR_MAINTENANCE_PLANNER", catalog: "SAP_EAM_BC_ORD_MC",
    guiTx: ["IP10", "IP30", "IW38"], relatedTables: ["MPLA", "MHIS", "AUFK"],
    ecc: "ECC: IP10/IP30 (תזמון/רשימת תוכניות) + IW38 — ללא דשבורד OVP מרוכז.", s4OnPrem: "yes", cloud: "yes", releaseInfo: "S/4HANA (OVP · תלוי scope items)",
    commonErrors: ["האפליקציה לא מופיעה → catalog SAP_EAM_BC_ORD_MC אולי לא כלול ב-role; או scope items חדשים (Phase Model) ללא BH1/BH2/BJ2.", "כרטיסים ריקים → ודא נתוני תכנון אחזקה קיימים (תוכניות/פקודות)."],
    similar: ["manage-maintenance-orders", "manage-maintenance-notifications-orders"],
  },
);

// ── 2026-09-23 · official App IDs the verification evidence already names ──
// (audit/s4-enrichment/research-queue-fiori.md, "conflicts" and "Cross-cutting"). Written like
// F2774 / F5325 were on 2026-09-22 (both since enriched from scripts/fal-app.mjs on 2026-09-24):
// trust "verified-docs", only fields a help.sap.com search snippet supports, everything else
// empty. Where the official title is already a curated slug (F2731, F2730,
// F3577, F1576, F1511, F0251) the new slug carries the id. Type is derived from the
// documented function, not read from the Apps Library (its pages load as JS shells);
// "Transactional" is also the schema bucket for the two Web Dynpro apps W0028 / W0029.
// F5777 is not added: only SAP S/4HANA Cloud Public Edition records name it.
FIORI_APPS.push(
  {
    // F5241 · Maintenance Management 2025.001 (loio 55828a51fe634affb76fe4283f71c1d9, "App ID:
    // F5241"), What's New 2023 FPS03 (loio dd84263e832b4c3b83d35d4be9653f39, Type New,
    // PM-FIO-WOC-MO), What's New 2025 FPS01 (loio ec6bf626bf8246439f2795f31e7f07c3).
    id: "F5241", slug: "manage-maintenance-orders-f5241", name: "Manage Maintenance Orders", he: "ניהול פקודות אחזקה", module: "PM", type: "Transactional",
    trust: "verified-docs", source: "SAP Help Portal · Maintenance Management 2025.001 (Manage Maintenance Orders) · What's New in SAP S/4HANA 2023 FPS03, 2025 FPS01", lastReviewed: "2026-09-23",
    purpose: "ניהול פקודות אחזקה ברשימה מקיפה ועיבוד של פקודה בודדת: לפי התיעוד הרשמי, 'This app offers both a comprehensive list view of maintenance orders and the possibility to process individual maintenance orders.'",
    problem: "",
    explain: { beginner: "מסך אחד שבו מתכנן האחזקה מאתר פקודות אחזקה ברשימה, יוצר פקודות חדשות ומעבד כל פקודה לגופה.", consultant: "לפי What's New 2023 FPS03 היישום נוסף כחדש (Type New) עם פריטי ההיקף 4HH, 4HI, BH1 ו-BJ2, רכיב היישום PM-FIO-WOC-MO וזמינות SAP S/4HANA ו-SAP S/4HANA Cloud Private Edition. עמוד היישום לגרסת 2025 FPS01 מציין גם ניהול של שיוך הפקודות שנבחרו לאירוע אחזקה (maintenance event) או ל-revision. הכותרת זהה לזו של הרשומה המתוחזקת F2731, שאינה מופיעה באף מקור רשמי; ראו רשומת האימות fiori:F2731.", technical: "תפקיד עסקי, קטלוג ושירות OData לא נקראו מספריית ה-Fiori (העמוד נטען כ-app shell) ולכן אינם מוצגים; ראו רשומת האימות fiori:F5241." },
    role: "", catalog: "",
    guiTx: [], relatedTables: [],
    ecc: "", s4OnPrem: "yes", cloud: "unknown",
    releaseInfo: "SAP S/4HANA 2023 FPS03 (What's New 2023 FPS03, Type New)",
    similar: [],
  },
  {
    // F2072 · Maintenance Management 2025.001 (app topic loio 4dd5a057b76f9f2de10000000a44147b;
    // "Find Technical Object app (F2072)" in loio 1563a9bd3b1c4844ad5dd1a3a7d6a156), Data
    // Migration PM - Equipment 2025.001 (loio 08c1d29f1acc4d459ecc198dc18ee6ce), What's New 2023
    // (loios 5e0bcb6d686840e0b6bd02f1628c00bb, 1fae728c81b34dbb8294e903cec45e6e).
    id: "F2072", slug: "find-technical-object", name: "Find Technical Object", he: "איתור אובייקט טכני", module: "PM", type: "Transactional",
    trust: "verified-docs", source: "SAP Help Portal · Maintenance Management 2025.001 (Find Technical Object) · Data Migration 2025.001 (PM - Equipment) · What's New in SAP S/4HANA 2023", lastReviewed: "2026-09-23",
    purpose: "איתור והצגה של אובייקטים טכניים: לפי התיעוד הרשמי, 'With this app, you can list the technical objects in your system.'",
    problem: "",
    explain: { beginner: "רשימה של הציוד והמיקומים הפונקציונליים במערכת, עם סינון לפי סוג, מיקום, יצרן וסטטוס, ופתיחה של אובייקט בודד.", consultant: "לפי What's New 2023 ניתן להתקין ציוד על ציוד או לפרק אותו דרך האפשרויות של Manage Structure ביישום (רכיב PM-EQM), ו-F2072 נקוב כיישום היורש של אפליקציות Display Master Data Information Center (W0011 ו-W0012) שנמחקו ב-2023. תיעוד ההגירה של אובייקט PM - Equipment לגרסת 2025 FPS01 מונה אותו לצד Create Equipment (IE01), Change Equipment (IE02) ו-Display Equipment (IE03).", technical: "תפקיד עסקי, קטלוג ושירות OData לא נקראו מספריית ה-Fiori (העמוד נטען כ-app shell) ולכן אינם מוצגים; ראו רשומת האימות fiori:F2072." },
    role: "", catalog: "",
    guiTx: [], relatedTables: [],
    ecc: "", s4OnPrem: "yes", cloud: "unknown",
    releaseInfo: "",
    similar: [],
  },
  {
    // W0029 · What's New 2025 FPS01 (loio 41a47f86d1d449318dee191474b5f64e, "Web Dynpro app -
    // Process Technical Object (W0029)"), Maintenance Management 2025.001 topic Process Technical
    // Object (loio 60021e57f2f40a75e10000000a4450e5, business catalog SAP_EAM_BC_TO; that topic's
    // snippet carries the title, not the id).
    id: "W0029", slug: "process-technical-object", name: "Process Technical Object", he: "עיבוד אובייקט טכני", module: "PM", type: "Transactional",
    trust: "verified-docs", source: "SAP Help Portal · What's New in SAP S/4HANA 2025 FPS01 (BAdI: Functional Location Management) · Maintenance Management 2025.001 (Process Technical Object)", lastReviewed: "2026-09-23",
    purpose: "יצירה ושינוי של אובייקטים טכניים באפליקציית Web Dynpro: לפי התיעוד הרשמי, 'Web Dynpro app - Process Technical Object (W0029) to create or change technical objects'.",
    problem: "",
    explain: { beginner: "המסך שבו מתכנן האחזקה יוצר ומשנה ציוד ומיקומים פונקציונליים.", consultant: "נושא Process Technical Object ב-Maintenance Management לגרסת 2025 FPS01 מתאר שלוש אפליקציות, Create Technical Object, Change Technical Object ו-Display Technical Object, ומציין את הקטלוג העסקי EAM - Technical Object (SAP_EAM_BC_TO). רשומת What's New 2025 FPS01 בנושא BAdI: Functional Location Management מונה את W0029 ברשימה אחת עם IL02 (Change Functional Location) ועם API_FUNCTIONALLOCATION.", technical: "אפליקציית Web Dynpro לפי What's New 2025 FPS01. תפקיד עסקי ושירות OData לא נקראו; ראו רשומת האימות fiori:W0029." },
    role: "", catalog: "SAP_EAM_BC_TO",
    guiTx: [], relatedTables: [],
    ecc: "", s4OnPrem: "yes", cloud: "unknown",
    releaseInfo: "",
    similar: [],
  },
  {
    // W0028 · Data Migration 2025.001, PM - Equipment (loio 2f60604160f141be904d23b23e69c3a6) and
    // PM - Functional location (loio 7c5578ab53e0457f905145bc535839cf), "Display Technical Object
    // (app ID W0028)"; Maintenance Management 2025.001 topic Display Technical Object (loio
    // f11f4d57001c0922e10000000a44147b, business catalog SAP_EAM_BC_TO_MW; title only).
    id: "W0028", slug: "display-technical-object", name: "Display Technical Object", he: "הצגת אובייקט טכני", module: "PM", type: "Transactional",
    trust: "verified-docs", source: "SAP Help Portal · Data Migration 2025.001 (PM - Equipment, PM - Functional location) · Maintenance Management 2025.001 (Display Technical Object)", lastReviewed: "2026-09-23",
    purpose: "הצגת אובייקטים טכניים לטכנאי האחזקה: לפי התיעוד הרשמי, 'As a maintenance technician, you can use this app to view technical objects that have been created to efficiently manage and evaluate technical assets and maintenance objects'.",
    problem: "",
    explain: { beginner: "מסך קריאה שבו טכנאי האחזקה רואה את הנתונים של ציוד או של מיקום פונקציונלי.", consultant: "תיעוד ההגירה של PM - Equipment ו-PM - Functional location לגרסת 2025 FPS01 נוקב ב-Display Technical Object (app ID W0028) ומציין: 'The Display Technical Object app shows only the data relevant for the logon language.' נושא היישום ב-Maintenance Management מציין את הקטלוג EAM - Technical Object MW (SAP_EAM_BC_TO_MW), ומשתמש בתפקיד Maintenance Planner ניגש ממנו גם ל-Create Technical Object ול-Change Technical Object.", technical: "תפקיד עסקי ושירות OData לא נקראו מהספרייה; ראו רשומת האימות fiori:W0028." },
    role: "", catalog: "SAP_EAM_BC_TO_MW",
    guiTx: [], relatedTables: [],
    ecc: "", s4OnPrem: "yes", cloud: "unknown",
    releaseInfo: "",
    similar: [],
  },
  {
    // F8669 · Maintenance Management 2025.001 (loio 15df8bf64aef43f9bd8680bb0d711f3e, "App ID:
    // F8669"), What's New 2025 FPS01 (loio 6b9a013a2f4649708c2b9c7238271c85, Type New, PM-EQM-RS).
    id: "F8669", slug: "manage-technical-object-structures", name: "Manage Technical Object Structures", he: "ניהול מבני אובייקטים טכניים", module: "PM", type: "Transactional",
    trust: "verified-docs", source: "SAP Help Portal · Maintenance Management 2025.001 (Manage Technical Object Structures) · What's New in SAP S/4HANA 2025 FPS01", lastReviewed: "2026-09-23",
    purpose: "יצירה וניהול של מבני אובייקטים טכניים בטיוטה: לפי התיעוד הרשמי, 'With this app, you can create and manage draft technical object structures.'",
    problem: "",
    explain: { beginner: "מסך שבו בונים מבנה היררכי של אובייקטים טכניים כטיוטה, ולאחר שכל האובייקטים בטיוטה נוצרו מפיקים ממנה את המבנה עצמו.", consultant: "לפי What's New 2025 FPS01 היישום חדש (Type New) ברכיב PM-EQM-RS ומאפשר 'view and manage hierarchical structures'. עמוד היישום מציין שכאשר האובייקטים במבנה הטיוטה נוצרו ניתן להפיק מבנה אובייקטים טכניים, ושיומני האפליקציה (application logs) מראים אם תהליך היצירה הצליח או נכשל.", technical: "תפקיד עסקי, קטלוג ושירות OData לא נקראו מספריית ה-Fiori; ראו רשומת האימות fiori:F8669." },
    role: "", catalog: "",
    guiTx: [], relatedTables: [],
    ecc: "", s4OnPrem: "yes", cloud: "unknown",
    releaseInfo: "SAP S/4HANA 2025 FPS01 (What's New 2025 FPS01, Type New)",
    similar: [],
  },
  {
    // F4587 · Feature Comparison for Process Orders 2025.001 (loio 0af42d30f5654313ac5d7a0ff9f36094),
    // What's New 2021 FPS01 (loio 77ff56ba8e584f4cb537b660e7810fd7), Retail 2025.001 (loio
    // 21d0d1f8e18e41ebbc93d2a8a4c51d97), app topic 2025.001 (loio a84b0308f73c43f29154fbb7e54e15d3,
    // title only), What's New 2020 (loio dc987ea755344b219964916762803a47, App New, title only).
    id: "F4587", slug: "manage-process-orders-f4587", name: "Manage Process Orders", he: "ניהול הזמנות תהליך", module: "PP-PI", type: "Transactional",
    trust: "verified-docs", source: "SAP Help Portal · Production Planning and Control 2025.001 (Manage Process Orders, Feature Comparison for Process Orders) · What's New in SAP S/4HANA 2020, 2021 FPS01", lastReviewed: "2026-09-23",
    purpose: "ניהול ההתקדמות של הזמנות תהליך (Process Orders): לפי התיעוד הרשמי, 'With this app, you can manage the progress of process orders.'",
    problem: "",
    explain: { beginner: "מסך שבו רואים את מצב הזמנות התהליך ומטפלים בהן לאורך כל חייהן, מהיצירה ועד ההשלמה.", consultant: "לפי נושא היישום לגרסת 2025 FPS01 ניתן לנהל את מחזור החיים של הזמנת התהליך מיצירה ועד השלמה, ולנווט ל-Manage Process Order Operations לפרטי הפעולות. טבלת ההשוואה של 2025 FPS01 מציבה אותו לצד COOISPI ו-COHVPI. What's New 2020 רושם את Manage Process Orders כיישום חדש (App New, פריט היקף BJ8, רכיב PP-FIO-PI). הרשומה המתוחזקת F3577 נושאת את אותה כותרת בלי מקור רשמי; ראו רשומת האימות fiori:F3577.", technical: "תפקיד עסקי, קטלוג ושירות OData לא נקראו מספריית ה-Fiori; ראו רשומת האימות fiori:F4587." },
    role: "", catalog: "",
    guiTx: [], relatedTables: [],
    ecc: "", s4OnPrem: "yes", cloud: "unknown",
    releaseInfo: "SAP S/4HANA 2020 (What's New 2020, App New)",
    similar: [],
  },
  {
    // F5323 · Feature Comparison for Process Orders 2025.001 (loio 0af42d30f5654313ac5d7a0ff9f36094,
    // "F4587/ F5323", the only On-Premise record found that names the id), app topic 2025.001
    // (loio 48d4f057b6a44fb59d3c3d85500a9f42), What's New 2021 (loio 579f4687ec304f5eb19e2b1fefa09d84,
    // Type New, title only).
    id: "F5323", slug: "manage-process-order-operations", name: "Manage Process Order Operations", he: "ניהול פעולות של הזמנות תהליך", module: "PP-PI", type: "Transactional",
    trust: "verified-docs", source: "SAP Help Portal · Production Planning and Control 2025.001 (Feature Comparison for Process Orders, Manage Process Order Operations) · What's New in SAP S/4HANA 2021", lastReviewed: "2026-09-23",
    purpose: "מעקב אחר התקדמות הזמנות תהליך ברמת הפעולה: לפי התיעוד הרשמי, 'With this app, you can monitor the progress of process orders at the detailed operations level.'",
    problem: "",
    explain: { beginner: "מסך שבו רואים את כל הפעולות של הזמנת תהליך ואת ההתקדמות של כל אחת מהן.", consultant: "What's New 2021 רושם את היישום כחדש (Type New) עם פריט ההיקף BJ8 ורכיב PP-FIO-PI. טבלת ההשוואה של 2025 FPS01 מציגה את Manage Process Orders / Manage Process Order Operations עם המזהים F4587/ F5323; זו הרשומה הרשמית היחידה שנמצאה הנוקבת במזהה F5323, והצימוד נקרא לפי סדר הערכים.", technical: "תפקיד עסקי, קטלוג ושירות OData לא נקראו מספריית ה-Fiori; ראו רשומת האימות fiori:F5323." },
    role: "", catalog: "",
    guiTx: [], relatedTables: [],
    ecc: "", s4OnPrem: "yes", cloud: "unknown",
    releaseInfo: "SAP S/4HANA 2021 (What's New 2021, Type New)",
    similar: [],
  },
  {
    // F2462 · Batch Management (LO-BM) 2025.001 (loios 34b021588aee0a02e10000000a44147b,
    // 006de05317e74e5399d82fb88f21810d), PLM 2025.001 (loio ed8ef9ad029a421d829e5d393873d741, data
    // source LO_BM_BATCH_SRV), Data Migration 2025.001 (loio 3504f738294541709a8c2dff2dbb5b30).
    id: "F2462", slug: "manage-batches-f2462", name: "Manage Batches", he: "ניהול אצוות", module: "PP-PI", type: "Transactional",
    trust: "verified-docs", source: "SAP Help Portal · Batch Management (LO-BM) 2025.001 (Manage Batches, App Implementation: Manage Batches) · Product Lifecycle Management (PLM) 2025.001 · Data Migration 2025.001", lastReviewed: "2026-09-23",
    purpose: "הצגה, עריכה ויצירה של אצוות: לפי התיעוד הרשמי, 'With this app you can display and edit existing and create new batches.'",
    problem: "",
    explain: { beginner: "מסך אחד שבו מחפשים אצוות, רואים את הפרטים שלהן ויוצרים אצוות חדשות.", consultant: "לפי Batch Management (LO-BM) לגרסת 2025 FPS01 ניתן לחפש אצוות המנוהלות במפעלים מסוימים ולראות נתונים הקשורים לאצווה, כגון המפעלים שבהם היא מנוהלת, סיווגי אצווה ומנות הבדיקה (inspection lots) שלה. לפי עמוד ה-App Implementation יש להפעיל ב-back-end את מחבר החיפוש (search connector) המתאים לרמת האצווה, למשל BATCH_PLANT_H לרמת מפעל. תיעוד ההגירה מונה אותו לצד Display Batch (MSC3N). הרשומה המתוחזקת F1576 נושאת את אותה כותרת בלי מקור רשמי; ראו רשומת האימות fiori:F1576.", technical: "טבלת Business Contexts and Fiori Applications בתיעוד ה-PLM מציגה את LO_BM_BATCH_SRV כמקור הנתונים (Data Source to be Extended) של Manage Batches (F2462) להרחבה בשדות מאפיין. תפקיד עסקי וקטלוג לא נקראו מהספרייה; ראו רשומת האימות fiori:F2462." },
    role: "", catalog: "",
    odata: "LO_BM_BATCH_SRV",
    guiTx: [], relatedTables: [],
    ecc: "", s4OnPrem: "yes", cloud: "unknown",
    releaseInfo: "",
    similar: [],
  },
  {
    // F1511A · Maintenance Management 2025.001 (app topic loio 78732361f0b94fe1b1711632af4362b3;
    // Feature Comparison loio 5d2fbff31efc440b8200fbad95a68dfe), What's New 2025 FPS01 (loio
    // 77a5d29949fd4a7494731ff6b4152e6f), What's New 2021 (loios 7a645d9e5e7841af8a6309e117e3bedf,
    // 155d60bad23c421ca95ba64c68ce96fa: "new apps", title only).
    id: "F1511A", slug: "create-maintenance-request-f1511a", name: "Create Maintenance Request", he: "יצירת בקשת אחזקה", module: "PM", type: "Transactional",
    trust: "verified-docs", source: "SAP Help Portal · Maintenance Management 2025.001 (Create Maintenance Request, Feature Comparison - Request Maintenance and Create Maintenance Request) · What's New in SAP S/4HANA 2021, 2025 FPS01", lastReviewed: "2026-09-23",
    purpose: "יצירת בקשות אחזקה: לפי התיעוד הרשמי, 'Create Maintenance Request With this app, you can create maintenance requests.'",
    problem: "",
    explain: { beginner: "טופס שבו מבקשים עבודת אחזקה; הטיוטות נשמרות וניתן לצפות בהן דרך הכפתור My Drafts.", consultant: "What's New 2021 מונה את Create Maintenance Request בין 'new apps designed for this end-to-end process' של מודל השלבים (Phase Model) בתהליך האחזקה, לצד My Maintenance Requests ו-Screen Maintenance Requests (F4072). עמוד ההשוואה של 2025 FPS01 משווה אותו ל-Request Maintenance (F1511), שהוא יישום נפרד. הרשומה המתוחזקת F1511 נושאת את הכותרת Create Maintenance Request בלי מקור רשמי; ראו רשומת האימות fiori:F1511.", technical: "תפקיד עסקי, קטלוג ושירות OData לא נקראו מספריית ה-Fiori; ראו רשומת האימות fiori:F1511A." },
    role: "", catalog: "",
    guiTx: [], relatedTables: [],
    ecc: "", s4OnPrem: "yes", cloud: "unknown",
    releaseInfo: "SAP S/4HANA 2021 (What's New 2021)",
    similar: [],
  },
  {
    // F0251A · PP-MRP 2025.001 (loio beea5a0c485340769ad37d33537ad962, "App ID: F0251A"; Feature
    // Comparison loio 0fc6b5b8da9d4138a73a65a46ee01038), What's New 2023 (loio
    // c106b41442594c6797aad29381a6b521, App New, J44, PP-FIO-MRP).
    id: "F0251A", slug: "manage-material-coverage-f0251a", name: "Manage Material Coverage", he: "ניהול כיסוי חומרים", module: "PP", type: "Transactional",
    trust: "verified-docs", source: "SAP Help Portal · Material Requirements Planning (PP-MRP) 2025.001 (Manage Material Coverage (F0251A), Feature Comparison for Managing Material Coverage) · What's New in SAP S/4HANA 2023", lastReviewed: "2026-09-23",
    purpose: "הצגה וניתוח של בעיות כיסוי בחומרים שנבחרו: לפי התיעוד הרשמי, 'With this app, you can display and analyze coverage issues that exist for selected materials.'",
    problem: "",
    explain: { beginner: "מסך שבו מתכנן ה-MRP רואה אילו חומרים שנבחרו סובלים מבעיות כיסוי ומנתח אותן.", consultant: "לפי What's New 2023 היישום חדש (App New, פריט היקף J44, רכיב PP-FIO-MRP) והוא היורש של Manage Material Coverage (F0251), עם ממשק מבוסס Fiori elements. תיעוד PP-MRP לגרסת 2025 FPS01 מציין שהיישום עדיין אינו מכסה את כל ההיבטים של F0251, וטבלת ההשוואה שם מציבה אותו לצד Monitor Stock / Requirements List (MD04) ו-F0251.", technical: "תפקיד עסקי, קטלוג ושירות OData לא נקראו מספריית ה-Fiori; ראו רשומת האימות fiori:F0251A." },
    role: "", catalog: "",
    guiTx: [], relatedTables: [],
    ecc: "", s4OnPrem: "yes", cloud: "unknown",
    releaseInfo: "SAP S/4HANA 2023 (What's New 2023, App New)",
    similar: [],
  },
  {
    // F5460 · What's New 2023 FPS02 (loio 0931e75179fb4fb38e66fc45218b0ba1) and 2025 FPS01 (loio
    // 65074cb6e3be4f958e16d5c14d83e2a8), "App ID: F5460", SCM-APO-PPS-DS; What's New 2022 (loio
    // 10b3ef999b2245618091a7c467384129, App New, title only); PP/DS 2025.001 Chart Selector (loio
    // dd540abcec6c474692097a58e8ab5abb). Module PP = the area of the PP/DS deliverable, as F2176.
    id: "F5460", slug: "advanced-scheduling-board", name: "Advanced Scheduling Board", he: "לוח תזמון מתקדם", module: "PP", type: "Transactional",
    trust: "verified-docs", source: "SAP Help Portal · What's New in SAP S/4HANA 2022, 2023 FPS02, 2025 FPS01 (Advanced Scheduling Board) · Production Planning and Detailed Scheduling (PP/DS) 2025.001", lastReviewed: "2026-09-23",
    purpose: "תכנון ותזמון מפורט של תכנית ייצור ישימה: לפי What's New 2022, 'Advanced Scheduling Board is a new application which supports Production Planner in creation and Detailed Scheduling of a feasible production plan.'",
    problem: "",
    explain: { beginner: "לוח גרפי שבו מתכנן הייצור בונה ומתזמן תכנית ייצור שאפשר לבצע בפועל.", consultant: "לפי תיעוד PP/DS לגרסת 2025 FPS01 הלוח כולל ארבעה תרשימי Gantt ושני תרשימים רציפים בזמן, בהם Resource Chart, Product Chart, Order Chart, Operations Chart ו-Product Stock Visualization. What's New 2023 FPS02 ו-2025 FPS01 נוקבים ב-App ID F5460 וברכיב SCM-APO-PPS-DS, וב-2025 FPS01 היישום מקבל הרחבות.", technical: "תפקיד עסקי, קטלוג ושירות OData לא נקראו מספריית ה-Fiori; ראו רשומת האימות fiori:F5460." },
    role: "", catalog: "",
    guiTx: [], relatedTables: [],
    ecc: "", s4OnPrem: "yes", cloud: "unknown",
    releaseInfo: "SAP S/4HANA 2022 (What's New 2022, App New)",
    similar: [],
  },
  {
    // W0020 · the official id of Confirm Jobs: deprecated in What's New 2022 (loio
    // af315b2ddb3e488eb3999f4ae144f0ed), deleted in What's New 2023 (loio
    // 22fd7c9f368f454fad5b3acfa5a26b6d) with Perform Maintenance Jobs (F5104A) and Report and
    // Repair Malfunction (F2023) as successors. s4OnPrem "no": not on the launchpad from 2023 on.
    id: "W0020", slug: "confirm-jobs-w0020", name: "Confirm Jobs", he: "אישור עבודות", module: "PM", type: "Transactional",
    trust: "verified-docs", source: "SAP Help Portal · What's New in SAP S/4HANA 2022 (Deprecation of Confirm Jobs) · What's New in SAP S/4HANA 2023 (Deletion of Confirm Jobs App)", lastReviewed: "2026-09-23",
    purpose: "אישור עבודות (Confirm Jobs) בתחזוקת מפעל, יישום שנמחק: לפי What's New 2023, 'The Confirm Jobs app (W0020) has been deleted and is no longer available on the SAP Fiori launchpad.'",
    problem: "",
    explain: { beginner: "אפליקציה לאישור עבודות שנמחקה מה-SAP Fiori launchpad; במקומה משתמשים ב-Perform Maintenance Jobs או ב-Report and Repair Malfunction.", consultant: "What's New 2022 מסווג את W0020 כ-App Deprecated (פריטי ההיקף BH1 ו-BJ2, רכיב PM) ומפנה ל-Perform Maintenance Jobs (F5104A); What's New 2023 מסווג אותה כ-App Deleted ומונה את Perform Maintenance Jobs (F5104A) ואת Report and Repair Malfunction (F2023) כיישומים יורשים. הרשומה המתוחזקת F2730 נושאת את הכותרת Confirm Jobs בלי מקור רשמי; ראו רשומת האימות fiori:F2730.", technical: "תפקיד עסקי, קטלוג ושירות OData לא נקראו; ראו רשומת האימות fiori:W0020." },
    role: "", catalog: "",
    guiTx: [], relatedTables: [],
    ecc: "", s4OnPrem: "no", cloud: "unknown",
    releaseInfo: "",
    similar: [],
  },
);

export const FIORI_BY_SLUG: Record<string, FioriApp> = Object.fromEntries(FIORI_APPS.map((a) => [a.slug, a]));
