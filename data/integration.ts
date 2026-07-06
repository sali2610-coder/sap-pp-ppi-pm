// SAP Integration Center — Phase 6.
// Enterprise integration technologies ECC→S/4HANA: classic (IDoc/ALE/RFC/
// tRFC/qRFC), middleware (PI/PO, CPI, Integration Suite) and modern (OData,
// APIs, Event Mesh). Standard SAP knowledge — tcodes, tables, monitors and
// SAP Note refs are search keywords + component (NOT fabricated numbers).
// Incident slugs link to existing /troubleshooting entries. trust: curated.

export interface IntgLink { label: string; href: string }
export interface IntgIncident { slug: string; label: string }
export interface IntgModule {
  id: string;
  he: string;        // Hebrew name
  en: string;        // English / acronym expansion
  abbr: string;      // short badge
  cat: "classic" | "middleware" | "modern" | "event";
  color: string;
  tagline: string;
  architecture: string;
  flow: string[];          // ordered nodes for the visual data-flow diagram
  monitoring: { t: string; what: string }[];
  transactions: string[];
  troubleshooting: string[];
  rootCauses: string[];
  debug: string[];
  notes: string[];         // SAP Note search keywords + component
  incidents: IntgIncident[];
  scenario: string;
  links: IntgLink[];
}

export const CAT_META: Record<IntgModule["cat"], { he: string; c: string }> = {
  classic: { he: "קלאסי (On-Prem)", c: "#0891b2" },
  middleware: { he: "Middleware", c: "#7c3aed" },
  modern: { he: "מודרני (REST/OData)", c: "#2563eb" },
  event: { he: "Event-Driven", c: "#d97706" },
};

const MIG: IntgLink = { label: "Migration Cockpit", href: "/migration-cockpit/" };
const S4: IntgLink = { label: "S/4HANA", href: "/s4hana/" };
const INC: IntgLink = { label: "מרכז תקלות", href: "/incidents/" };

export const MODULES: IntgModule[] = [
  {
    id: "idoc", he: "IDoc", en: "Intermediate Document", abbr: "IDoc", cat: "classic", color: "#0e7490",
    tagline: "מבנה נתונים סטנדרטי להעברת מסמכים עסקיים בין מערכות (EDI/ALE).",
    architecture: "IDoc = מעטפת (Control EDIDC) + מקטעי נתונים (Data EDID4) + היסטוריית סטטוס (Status EDIDS). מוגדר ע\"י Basic Type + Extension, מנותב ע\"י Partner Profile (WE20) + Port (WE21). יוצא: יישום→IDoc→Port→מערכת יעד. נכנס: Port→IDoc→Process Code→FM יישום.",
    flow: ["יישום (PO/DELVRY/MATMAS)", "Message Type", "IDoc (EDIDC/EDID4)", "Partner Profile WE20", "Port WE21", "מערכת יעד / EDI"],
    monitoring: [
      { t: "WE02 / WE05", what: "רשימת IDocs + סטטוס + תוכן מקטעים" },
      { t: "BD87", what: "Status Monitor — עיבוד מחדש של IDocs תקועים" },
      { t: "WE19", what: "Test Tool — שכפול ועיבוד מבוקר" },
      { t: "WLF_IDOC", what: "ניטור/עיבוד מחדש מודרני" },
    ],
    transactions: ["WE02", "WE05", "WE09", "WE19", "WE20", "WE21", "WE30", "WE31", "WE60", "BD87", "BD64", "SARA"],
    troubleshooting: ["IDoc תקוע בסטטוס 51 (שגיאת יישום)", "סטטוס 64 — ממתין לעיבוד (queue/scheduler)", "סטטוס 68 — סומן 'לא יטופל'", "סטטוס 30/03 — לא נשלח (אין output/port)", "Partner Profile חסר → 56/29"],
    rootCauses: ["נתוני אב חסרים/שגויים ביעד (51)", "Process Code/FM שגוי", "Partner Profile/Port לא מוגדר (WE20/WE21)", "RBDAPP01 לא מתוזמן (64)", "סגירה ידנית/ריצת ניקוי (68)"],
    debug: ["WE02 → היסטוריית סטטוס (EDIDS) — מי/מה שינה", "WE19 לשחזור עיבוד עם breakpoint ב-FM היישום", "Breakpoint: IDOC_INPUT_* / IDOC_OUTPUT_*", "RBDAPP01 (inbound) / RSEOUT00 (outbound)"],
    notes: ["IDoc status 51 application error reprocess · BC-MID-ALE", "IDoc status 64 RBDAPP01 scheduling · BC-MID-ALE", "IDoc status 68 set manually · BC-MID-ALE"],
    incidents: [
      { slug: "idoc-51", label: "IDoc 51 — שגיאת יישום" },
      { slug: "idoc-64-eoio-queue", label: "IDoc 64 — תור EOIO" },
      { slug: "idoc-68-no-further-processing", label: "IDoc 68 — No Further Processing" },
    ],
    scenario: "בארגון: IDoc אב-חומר (MATMAS) ל-Daymax נכשל ב-51 — שדה יחידת-מידה לא קיים ביעד; תוקן ה-mapping ועובד מחדש ב-BD87.",
    links: [{ label: "MM — אב חומר", href: "/sap-infrastructure/" }, { label: "SD — משלוחים", href: "/sap-infrastructure/" }, MIG, INC],
  },
  {
    id: "ale", he: "ALE", en: "Application Link Enabling", abbr: "ALE", cat: "classic", color: "#0891b2",
    tagline: "שכבת ההפצה שמנתבת IDocs בין מערכות לוגיות לפי Distribution Model.",
    architecture: "ALE = Logical Systems (BD54) + Distribution Model (BD64) שמגדיר אילו Message Types זורמים מאיזו מערכת לאיזו, עם Filters. מבוסס IDoc כפורמט. תרחישים: הפצת נתוני אב (MATMAS/CREMAS/DEBMAS), תנועות, ו-master data harmonization.",
    flow: ["מערכת מקור (Logical System)", "Distribution Model BD64", "Message Type + Filter", "IDoc", "מערכת יעד (Logical System)"],
    monitoring: [
      { t: "BD87", what: "עיבוד מחדש של IDocs נכנסים תקועים" },
      { t: "SALE", what: "קונפיג ALE מרכזי" },
      { t: "BDM2 / BDM5", what: "ניטור עקביות + audit של IDocs מופצים" },
    ],
    transactions: ["BD64", "BD54", "SALE", "BD87", "BD61", "BD50", "BD51", "BD52", "BDM2", "BDM5", "SCC4"],
    troubleshooting: ["Distribution Model לא הופץ (BD64 → Distribute)", "Logical System לא מוגדר ל-client (SCC4)", "Message Type לא פעיל (BD50)", "Filter חוסם רשומות", "Change Pointers לא נוצרים (BD61/BD50)"],
    rootCauses: ["מודל הפצה לא מסונכרן בין מערכות", "RBDMIDOC לא מתוזמן (change pointers)", "Logical System name שגוי", "הרשאת B_ALE_* חסרה"],
    debug: ["BD64 → בדיקת עקביות המודל", "BDM2 לאיתור IDoc אב↔בן", "BD21 / RBDMIDOC להפקת change pointers", "Breakpoint: MASTERIDOC_CREATE_*"],
    notes: ["ALE distribution model not active BD64 · BC-MID-ALE", "change pointers RBDMIDOC not generated · BC-MID-ALE"],
    incidents: [{ slug: "idoc-68-no-further-processing", label: "IDoc 68 (ריצת ניקוי ALE)" }],
    scenario: "בארגון: הפצת אב-ספק (CREMAS) בין מערכות נעצרה — Distribution Model עודכן אך לא הופץ; בוצע BD64→Distribute וזרימה התחדשה.",
    links: [{ label: "MM — אב ספק", href: "/sap-infrastructure/" }, MIG, INC],
  },
  {
    id: "rfc", he: "RFC", en: "Remote Function Call", abbr: "RFC", cat: "classic", color: "#0369a1",
    tagline: "פרוטוקול קריאת פונקציות מרחוק — הבסיס לכל אינטגרציה קלאסית של SAP.",
    architecture: "RFC מאפשר קריאת Function Module במערכת מרוחקת. Destinations מוגדרים ב-SM59 (סוג 3=ABAP, T=TCP/IP, H=HTTP). אבטחה: S_RFC + SNC/SSL (STRUST). sRFC = סינכרוני (ממתין לתשובה). הבסיס ל-BAPI, ALE, ול-connectors חיצוניים (JCo/NCo).",
    flow: ["מערכת קוראת", "SM59 Destination", "Gateway (SMGW)", "RFC Function Module", "מערכת יעד"],
    monitoring: [
      { t: "SM59", what: "Connection Test + Authorization Test ליעד" },
      { t: "SMGW", what: "Gateway Monitor — חיבורים פעילים" },
      { t: "ST22 / SM21", what: "Dumps + system log לכשלי RFC" },
    ],
    transactions: ["SM59", "SMGW", "SM21", "ST22", "SU53", "STRUST", "RZ12", "SARFC"],
    troubleshooting: ["Connection refused / timed out", "Logon failed (user נעול/סיסמה)", "אין הרשאת S_RFC", "SNC/SSL mismatch", "Gateway security (reg_info/sec_info) חוסם"],
    rootCauses: ["Host/Gateway/Instance שגויים ב-SM59", "RFC user נעול/פג/חסר S_RFC", "Firewall/פורט חסום", "תעודת STRUST פגה"],
    debug: ["SM59 → Connection + Authorization Test", "SU53 ל-RFC user; SM21 ל-system log", "SMGW לחיבורים תקועים", "External: בדוק JCo/NCo trace"],
    notes: ["RFC destination connection test failed SM59 · BC-MID-RFC", "S_RFC authorization missing · BC-SEC-AUT", "gateway security reg_info sec_info · BC-CST-GW"],
    incidents: [{ slug: "rfc-connection-sm59-failed", label: "חיבור RFC נכשל (SM59)" }],
    scenario: "בארגון: ממשק לבנק נכשל — RFC user ננעל אחרי שינוי סיסמה מדיניותי; שוחרר ב-SU01 ו-SM59 Connection Test עבר.",
    links: [{ label: "FI — ממשק בנק", href: "/sap-infrastructure/" }, { label: "הרשאות SU53", href: "/troubleshooting/su53-missing-authorization-deep/" }, S4, INC],
  },
  {
    id: "trfc", he: "tRFC", en: "Transactional RFC", abbr: "tRFC", cat: "classic", color: "#155e75",
    tagline: "RFC אסינכרוני מובטח 'פעם אחת בלבד' — בלי הבטחת סדר.",
    architecture: "tRFC עוטף קריאות RFC ב-LUW עם TID ייחודי, מבטיח exactly-once. נשמר ב-ARFCSSTATE/ARFCSDATA. אם היעד לא זמין — נשמר ומועבר שוב ע\"י scheduler (RSARFCEX). משמש ALE/IDoc outbound. אין הבטחת סדר → לסדר משתמשים ב-qRFC.",
    flow: ["יישום (CALL FUNCTION ... IN BACKGROUND TASK)", "LUW + TID", "ARFCSSTATE / ARFCSDATA", "SM58 / Scheduler RSARFCEX", "מערכת יעד"],
    monitoring: [
      { t: "SM58", what: "tRFC Monitor — LUWs תקועים + שגיאות + Execute" },
      { t: "SARFC", what: "ניהול משאבי RFC" },
    ],
    transactions: ["SM58", "SARFC", "SMGW", "SM59", "SE38 (RSARFCEX)"],
    troubleshooting: ["LUW תקוע ב-SM58 (Transaction recorded/executing)", "יעד לא זמין → צבירת LUWs", "כפילויות אם מאלצים ביצוע ידני שגוי", "scheduler לא רץ"],
    rootCauses: ["מערכת יעד down / SM59 שגוי", "RSARFCEX לא מתוזמן", "נעילת טבלה ביעד", "RFC user ביעד חסר הרשאה"],
    debug: ["SM58 → Status text של ה-LUW", "SM58 → Execute LUW (זהירות: once-only)", "בדוק יעד ב-SM59 לפני ביצוע מחדש", "ST22 ביעד אם ה-FM נכשל"],
    notes: ["tRFC LUW stuck SM58 reprocess · BC-MID-RFC", "RSARFCEX scheduling tRFC · BC-MID-RFC"],
    incidents: [],
    scenario: "בארגון: IDocs outbound נצברו — מערכת היעד הייתה ב-downtime; LUWs המתינו ב-SM58 ועובדו אוטומטית עם חזרת היעד.",
    links: [{ label: "ALE/IDoc", href: "/integration/#ale" }, INC],
  },
  {
    id: "qrfc", he: "qRFC", en: "Queued RFC", abbr: "qRFC", cat: "classic", color: "#0d9488",
    tagline: "tRFC + תורים → הבטחת סדר (EOIO) או צובר (EOI).",
    architecture: "qRFC מוסיף תורים מעל tRFC: Outbound (TRFCQOUT, ניטור SMQ1) ו-Inbound (TRFCQIN, ניטור SMQ2). EOIO = Exactly Once In Order (סדר נשמר תוך תור). QIN/QOUT Scheduler מעבד. הבסיס ל-CIF (APO), PI proxies, ו-SLT.",
    flow: ["יישום (qRFC API)", "תור Outbound SMQ1", "TRFCQOUT", "QOUT Scheduler", "תור Inbound SMQ2 (ביעד)", "עיבוד EOIO"],
    monitoring: [
      { t: "SMQ1", what: "Outbound Queue Monitor (TRFCQOUT)" },
      { t: "SMQ2", what: "Inbound Queue Monitor (TRFCQIN)" },
      { t: "SMQR / SMQS", what: "QIN / QOUT Scheduler registration" },
    ],
    transactions: ["SMQ1", "SMQ2", "SMQR", "SMQS", "SMQE", "SM58"],
    troubleshooting: ["תור תקוע (SYSFAIL/CPICERR) חוסם את כל היושבים אחריו", "Scheduler לא רשום (SMQR/SMQS)", "תור נעול (STOP)", "סדר נשבר אם מוחקים entry באמצע"],
    rootCauses: ["LUW ראשון בתור נכשל → חוסם EOIO", "QIN/QOUT scheduler לא פעיל", "יעד לא זמין", "שגיאת יישום ביעד (תקוע SYSFAIL)"],
    debug: ["SMQ2 → לחץ על התור → סיבת השגיאה", "תקן את ה-LUW החוסם → Activate התור", "SMQR/SMQS לוודא scheduler רשום", "ST22 ביעד לשגיאת ה-FM"],
    notes: ["qRFC inbound queue SYSFAIL stuck SMQ2 · BC-MID-RFC", "qRFC scheduler registration SMQR SMQS · BC-MID-RFC"],
    incidents: [{ slug: "idoc-64-eoio-queue", label: "IDoc 64 — תור EOIO תקוע" }],
    scenario: "בארגון: תור inbound של אישורי ייצור נתקע ב-SMQ2 (SYSFAIL) — רשומה ראשונה נכשלה וחסמה את כל היתר; תוקן הנתון ותור הופעל מחדש.",
    links: [{ label: "PP-PI — אישורי ייצור", href: "/pp-pi/" }, { label: "tRFC", href: "/integration/#trfc" }, INC],
  },
  {
    id: "pipo", he: "PI / PO", en: "Process Integration / Orchestration", abbr: "PI/PO", cat: "middleware", color: "#7c3aed",
    tagline: "Middleware on-prem קלאסי לתיווך, mapping וניתוב הודעות.",
    architecture: "PI/PO = ESR (Enterprise Services Repository: data types, mappings, interfaces) + Integration Directory (configuration: channels, receiver determination) + Integration Engine + Adapter Engine (AEX single-stack מודרני, dual-stack ישן). תומך IDoc/SOAP/File/JDBC/REST adapters. במצב maintenance — היעד הוא Integration Suite.",
    flow: ["מערכת שולחת", "Sender Adapter (Channel)", "Integration Engine (Pipeline)", "Mapping (ESR)", "Receiver Determination", "Receiver Adapter", "מערכת יעד"],
    monitoring: [
      { t: "SXMB_MONI", what: "Message Monitoring + trace ב-Integration Engine" },
      { t: "RWB", what: "Runtime Workbench — Channel + Message Monitoring (Adapter Engine)" },
      { t: "SMQ2", what: "תורים ב-Integration Engine" },
    ],
    transactions: ["SXMB_MONI", "SXI_MONITOR", "SMQ2", "SXMB_ADM", "IDX1", "IDX2", "SLDCHECK"],
    troubleshooting: ["Message ב-System Error", "Channel ב-Error (RWB)", "Mapping exception", "תור Integration Engine תקוע", "IDoc metadata חסר (IDX2)"],
    rootCauses: ["Communication Channel לא פעיל/קונפיג שגוי", "Adapter Engine queue תקוע", "Endpoint/credentials של היעד נכשלו", "Mapping/value mapping שגוי", "SLD לא מסונכרן"],
    debug: ["SXMB_MONI → סטטוס + payload + trace level", "RWB → Channel Monitoring", "SMQ2 ל-queue ב-Integration Engine", "IDX2 לרענון IDoc metadata"],
    notes: ["PI PO message system error channel · BC-XI-IBC", "Adapter Engine queue stuck · BC-XI-IS", "IDX2 idoc metadata refresh · BC-XI-CON-IDO"],
    incidents: [{ slug: "pi-po-channel-error-not-sent", label: "ערוץ PI/PO תקוע" }],
    scenario: "בארגון: הודעת מכירות ל-Daymax נתקעה ב-PO — ה-Communication Channel היה ב-Error אחרי שינוי endpoint; הופעל מחדש ונשלח.",
    links: [{ label: "SD — מכירות", href: "/sap-infrastructure/" }, { label: "CPI (יורש)", href: "/integration/#cpi" }, INC],
  },
  {
    id: "cpi", he: "CPI", en: "Cloud Integration", abbr: "CPI", cat: "middleware", color: "#6d28d9",
    tagline: "Cloud Integration ב-Integration Suite — היורש הענני של PI/PO.",
    architecture: "CPI (Cloud Integration) = iFlows (Integration Flows) שרצים על Cloud Integration runtime ב-BTP. שלבי iFlow: Sender → Mapping (Message/Groovy/XSLT) → Routing → Receiver. חיבור למערכות on-prem דרך Cloud Connector. Security Material (credentials, certificates) מנוהל בנפרד. ניטור דרך Web UI (Message Monitoring / MPL).",
    flow: ["מערכת שולחת", "Sender Adapter (iFlow)", "Cloud Connector (אם on-prem)", "Mapping / Groovy", "Routing", "Receiver Adapter", "מערכת יעד"],
    monitoring: [
      { t: "Message Monitoring", what: "סטטוס iFlow + MPL (Message Processing Log)" },
      { t: "Cloud Connector", what: "ניטור connectivity ל-on-prem" },
      { t: "Inspect / Trace", what: "trace level=Trace לבדיקת שלב mapping" },
    ],
    transactions: ["CPI Web UI — Monitor", "Cloud Connector Admin", "BTP Cockpit"],
    troubleshooting: ["iFlow ב-Failed", "Security material פג", "Cloud Connector down", "Mapping/Groovy exception", "Payload לא תקין / timeout"],
    rootCauses: ["שגיאת Mapping/Groovy", "Credential/certificate פג", "Cloud Connector / connectivity נכשל", "Endpoint יעד לא זמין"],
    debug: ["Message Monitoring → Failed → MPL/trace", "בדוק Security Material + Cloud Connector", "trace level=Trace, אתר את שלב ה-mapping", "Resend אחרי תיקון + deploy מחדש"],
    notes: ["CPI iFlow failed message monitoring · LOD-HCI-PI", "Cloud Connector connectivity · BC-MID-SCC", "CPI security material credential expired · LOD-HCI-PI"],
    incidents: [{ slug: "cpi-iflow-failed", label: "iFlow ב-CPI נכשל" }],
    scenario: "בארגון: iFlow ששולח אישורי ייצור ל-MES נכשל — Security Material פג; חודש ובוצע Resend.",
    links: [{ label: "PP-PI — MES", href: "/pp-pi/" }, { label: "Integration Suite", href: "/integration/#suite" }, S4, INC],
  },
  {
    id: "suite", he: "Integration Suite", en: "SAP Integration Suite (BTP)", abbr: "Suite", cat: "middleware", color: "#5b21b6",
    tagline: "חבילת האינטגרציה העננית — מטריית CPI + API Mgmt + Event Mesh ועוד.",
    architecture: "Integration Suite ב-BTP מאחדת: Cloud Integration (CPI/iFlows), API Management (פרסום+ניהול APIs), Event Mesh (eventing), Open Connectors (קונקטורים ל-SaaS), Integration Advisor + Trading Partner Management (B2B/EDI), ו-Migration Tooling מ-PI/PO. זו שכבת האינטגרציה האסטרטגית ל-S/4HANA Cloud והיברידי.",
    flow: ["מקורות (S/4, SaaS, B2B)", "Integration Suite (Capabilities)", "Cloud Integration / API Mgmt / Event Mesh", "Cloud Connector / Connectivity", "יעדים"],
    monitoring: [
      { t: "Integration Suite Monitor", what: "Message Monitoring חוצה-capability" },
      { t: "API Management Analytics", what: "ניטור תעבורת API + policies" },
      { t: "Alerting", what: "התראות על iFlows/APIs כושלים" },
    ],
    transactions: ["Integration Suite Web UI", "BTP Cockpit", "Cloud Connector Admin"],
    troubleshooting: ["Capability לא מופעלת ב-subaccount", "Entitlements/quota חסרים", "מעבר (migration) מ-PI/PO לא שלם", "Connectivity ל-on-prem"],
    rootCauses: ["Entitlement/service plan חסר ב-BTP", "תפקידי IAM/role collections חסרים", "Cloud Connector לא מחובר", "iFlow שלא הומר נכון מ-PI"],
    debug: ["BTP Cockpit → Entitlements + Subscriptions", "בדוק role collections למשתמש", "Migration Assessment מ-PI/PO", "Cloud Connector — Subaccount status"],
    notes: ["Integration Suite capability activation BTP · LOD-HCI", "PI PO migration to Integration Suite assessment · LOD-HCI-PI"],
    incidents: [],
    scenario: "בארגון: בהערכת מעבר מ-PI/PO ל-Integration Suite מופו ה-iFlows ל-Cloud Integration וה-B2B ל-Trading Partner Management.",
    links: [{ label: "CPI", href: "/integration/#cpi" }, { label: "Event Mesh", href: "/integration/#eventmesh" }, S4],
  },
  {
    id: "odata", he: "OData", en: "Open Data Protocol", abbr: "OData", cat: "modern", color: "#2563eb",
    tagline: "פרוטוקול REST הסטנדרטי של SAP — הבסיס ל-Fiori ולשירותים חיצוניים.",
    architecture: "OData חושף ישויות (Entity Sets) דרך REST/JSON. ב-S/4 הבנייה היא דרך RAP (RESTful ABAP / Service Definition+Binding) או SEGW הקלאסי (Gateway Service Builder). Gateway Hub (/IWFND) מנתב; backend (/IWBEP) מספק. $metadata מתאר את ה-service. Fiori, mobile ושירותים חיצוניים צורכים.",
    flow: ["Client (Fiori/חיצוני)", "Gateway /IWFND", "Service (RAP / SEGW)", "Backend /IWBEP", "CDS / טבלאות S/4"],
    monitoring: [
      { t: "/IWFND/ERROR_LOG", what: "שגיאות runtime של OData ב-Hub" },
      { t: "/IWFND/MAINT_SERVICE", what: "רישום + Activate + מטא-דאטה של services" },
      { t: "/IWBEP/ERROR_LOG", what: "שגיאות בצד ה-backend provider" },
    ],
    transactions: ["/IWFND/MAINT_SERVICE", "/IWFND/ERROR_LOG", "/IWFND/CACHE_CLEANUP", "/IWBEP/ERROR_LOG", "SEGW", "/IWFND/GW_CLIENT"],
    troubleshooting: ["Service לא רשום/לא פעיל (404)", "$metadata לא נטען (cache)", "401/403 — הרשאה/authentication", "500 — exception ב-data provider", "ביצועים: $expand/$filter כבד"],
    rootCauses: ["Service לא Activated ב-MAINT_SERVICE", "Metadata cache לא רוענן", "S_SERVICE / catalog assignment חסר", "באג ב-DPC (data provider class) / CDS", "אין $top → שליפת מסה"],
    debug: ["/IWFND/ERROR_LOG עם timestamp הבקשה", "/IWFND/GW_CLIENT להרצת הבקשה ידנית", "Cache cleanup לאחר שינוי metadata", "ST05 / SQL trace ל-CDS איטי"],
    notes: ["OData service error log /IWFND/ERROR_LOG · OPU-GW", "gateway service not active MAINT_SERVICE · OPU-GW-BE", "OData metadata cache cleanup · OPU-GW"],
    incidents: [],
    scenario: "בארגון: אפליקציית Fiori להזמנות עבודה (PM) החזירה 404 — ה-OData service לא הופעל ב-/IWFND/MAINT_SERVICE; הורשם, הופעל ו-cache רוענן.",
    links: [{ label: "PM — Fiori הזמנות", href: "/pm/" }, { label: "CDS Views", href: "/s4hana/" }, S4],
  },
  {
    id: "api", he: "APIs", en: "API Management & Business Hub", abbr: "API", cat: "modern", color: "#1d4ed8",
    tagline: "פרסום, אבטחה וניהול APIs (REST/SOAP/OData) + קטלוג SAP.",
    architecture: "API Management (ב-Integration Suite) עוטף APIs ב-Proxies עם Policies (rate limiting, OAuth, key validation, quota, ניתוב). SAP Business Accelerator Hub (לשעבר API Business Hub) הוא הקטלוג הציבורי של APIs/iFlows. BAPIs קלאסיים נחשפים כ-SOAP/OData ל-modernization. תומך Developer Portal + Analytics.",
    flow: ["צרכן (App/Partner)", "API Proxy + Policies", "OAuth / Key validation", "Backend (S/4 OData / BAPI / חיצוני)", "Analytics"],
    monitoring: [
      { t: "API Analytics", what: "תעבורה, latency, שגיאות, quota" },
      { t: "API Monitoring", what: "סטטוס proxies + alert policies" },
    ],
    transactions: ["API Management Portal", "Business Accelerator Hub", "Developer Portal", "BTP Cockpit"],
    troubleshooting: ["401/403 — OAuth/API key לא תקין", "429 — חריגת rate limit/quota", "Proxy deploy נכשל", "Backend target לא זמין", "CORS"],
    rootCauses: ["Policy שגוי (key/quota/OAuth)", "Credentials/client לא רשום", "Target endpoint שגוי", "Product/plan לא משויך לצרכן"],
    debug: ["API Monitoring → trace הבקשה דרך ה-policies", "בדוק OAuth token + scopes", "בדוק quota/spike-arrest policy", "Debug session ב-API proxy"],
    notes: ["API Management policy OAuth quota · BC-NEO-INT / LOD-HCI-API", "API proxy deployment failed · LOD-HCI-API"],
    incidents: [],
    scenario: "בארגון: API חיצוני לשותף לוגיסטי קיבל 429 — spike-arrest policy חסם; הותאם ה-quota והוגדר retry בצד הצרכן.",
    links: [{ label: "OData", href: "/integration/#odata" }, { label: "Integration Suite", href: "/integration/#suite" }, S4],
  },
  {
    id: "eventmesh", he: "Event Mesh", en: "SAP Event Mesh / Eventing", abbr: "Event", cat: "event", color: "#d97706",
    tagline: "אינטגרציה מבוססת אירועים (pub/sub) — מערכות מגיבות לאירועים עסקיים.",
    architecture: "SAP Event Mesh (ו-Advanced Event Mesh) מספק pub/sub a-synchronous: producers שולחים אירועים ל-Queues/Topics, consumers נרשמים. תומך AMQP/MQTT/Webhook/REST. S/4HANA פולט Business Events (Enterprise Eventing) דרך Event Bindings (למשל BusinessPartner/SalesOrder Created/Changed). מפריד מערכות (loose coupling).",
    flow: ["S/4 Business Event (Enterprise Eventing)", "Event Binding", "Event Mesh (Topic/Queue)", "Subscription", "Consumer (App/iFlow)"],
    monitoring: [
      { t: "Event Mesh Dashboard", what: "Queues, message count, consumers" },
      { t: "SAP Event Monitor (S/4)", what: "אירועים שנפלטו + binding status" },
      { t: "BTP Cockpit", what: "service instance + queue subscriptions" },
    ],
    transactions: ["Event Mesh Web UI", "SWETYPV / SWEL (event trace קלאסי)", "BTP Cockpit"],
    troubleshooting: ["אירוע לא נפלט (binding לא פעיל)", "Queue מתמלאת (consumer לא קורא)", "Subscription לא מקבל (topic mismatch)", "Dead message queue (DMQ) מצטברת"],
    rootCauses: ["Event Binding לא מופעל ב-S/4", "Consumer down / לא נרשם ל-queue", "Topic/namespace pattern שגוי", "Quota/queue size חרגה"],
    debug: ["S/4 Event Monitor → האם האירוע נפלט", "Event Mesh Dashboard → queue depth + DMQ", "בדוק topic subscription pattern", "SWEL/SWELS ל-trace אירועים קלאסי (workflow)"],
    notes: ["SAP Event Mesh queue subscription topic · BC-CP-EM / LOD-EM", "S/4HANA enterprise eventing business event binding · BC-ESI-ESF"],
    incidents: [],
    scenario: "בארגון: אירוע 'הזמנת עבודה שוחררה' (PM) נועד להפעיל התראה ל-MES — Event Binding לא הופעל; הופעל ו-consumer קיבל את האירועים.",
    links: [{ label: "PM — הזמנות עבודה", href: "/pm/" }, { label: "Integration Suite", href: "/integration/#suite" }, S4],
  },
];

export const INTG_META = {
  he: "מרכז אינטגרציה SAP",
  sub: "כל טכנולוגיות האינטגרציה — IDoc/ALE/RFC/tRFC/qRFC, PI/PO, CPI, Integration Suite, OData, APIs, Event Mesh. ארכיטקטורה, זרימת נתונים, ניטור, תקלות ו-Root Cause. מבוסס ידע SAP סטנדרטי. trust: curated.",
  count: MODULES.length,
};

// cross-module: which functional areas each integration tech commonly touches
export const INTG_USAGE: { tech: string; areas: string[] }[] = [
  { tech: "IDoc / ALE", areas: ["MM", "SD", "FI", "PP", "Migration"] },
  { tech: "RFC / tRFC / qRFC", areas: ["PP-PI", "PM", "PP", "ALE/IDoc", "CIF"] },
  { tech: "PI/PO → CPI", areas: ["SD", "MM", "PP-PI", "B2B/EDI"] },
  { tech: "OData / API", areas: ["PM", "PP", "Fiori", "Mobile"] },
  { tech: "Event Mesh", areas: ["PM", "PP-PI", "Cross-system"] },
];
