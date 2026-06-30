import { CenterHeader } from "@/components/knowledge";
import { KnowledgeExplorer } from "@/components/knowledge-explorer";
import { CONCEPTS } from "@/data/concepts";
import { ENHANCEMENTS } from "@/data/enhancements";
import { ECC_S4_TOPICS } from "@/data/ecc-s4";
import { TRANSACTIONS } from "@/data/transactions";
import { EXITS } from "@/data/exits";
import { PROCESS_GUIDES } from "@/data/process-guides";
import { INCIDENTS } from "@/data/troubleshooting";
import { SAP_NOTES } from "@/data/sap-notes";
import { QA_PACKS } from "@/data/qa-center";
import { BLUEPRINTS } from "@/data/centers/blueprints";
import { CONFIG_TOPICS } from "@/data/centers/config";
import { MIGRATIONS } from "@/data/centers/migration";
import { DEBUGGINGS } from "@/data/centers/debugging";
import { CBC_SCENARIOS } from "@/data/centers/cbc";
import { TOOLKIT } from "@/data/centers/toolkit";
import { PROCESS_AUTH } from "@/data/centers/process-auth";
import { ALL_TABLES } from "@/data/sapData";
import { WORKBENCHES } from "@/data/workbenches";
import { OIC_OBJECTS } from "@/lib/cross-links";
import { SOLUTIONS } from "@/data/solutions";
import { PROCESS_MAPS } from "@/data/processes";
import { PLAYBOOKS } from "@/data/centers/playbooks";
import { CDS_VIEWS } from "@/data/cds-map";

// ── D2 Information Architecture ───────────────────────────────────────────
// Centers reorganized around CONSULTANT TASKS (journeys), not technical type.
// Every href/card is unchanged — pure regrouping + search-first entry.

type Center = { href: string; he: string; title: string; tag?: string; tagColor?: string; desc?: string; group: string };

const GROUPS = [
  { slug: "find",    en: "Ask & Find",            he: "שאל ומצא",        intent: "התחל כאן — שאלה חופשית, חיפוש לפי צורך עסקי, או צלילה לאובייקט בודד.", accent: "#d62027" },
  { slug: "learn",   en: "Understand the Process", he: "הבן תהליך",       intent: "תהליכי SAP מקצה-לקצה, מושגים, בלופרינטים ותכנון ייצור.",            accent: "#4338ca" },
  { slug: "build",   en: "Build & Configure",     he: "בנה והגדר",       intent: "יישום בפועל — קונפיגורציה (SPRO), פיתוח ABAP, הרחבות וממשקים.",      accent: "#0d9488" },
  { slug: "fix",     en: "Troubleshoot & Resolve", he: "פתור תקלה",       intent: "מתסמין לפתרון — אבחון, SAP Notes, Debug ובדיקות QA.",               accent: "#dc2626" },
  { slug: "migrate", en: "Migrate to S/4HANA",    he: "נדוד ל-S/4HANA",  intent: "מה נשאר, מה השתנה, מה הוסר — והשפעת המעבר ECC↔S/4.",                 accent: "#2563eb" },
  { slug: "data",    en: "Reference & Data",      he: "נתונים והפניות",  intent: "קטלוגים לחיפוש מהיר — T-Codes, טבלאות, הרשאות ושולחנות עבודה.",      accent: "#0891b2" },
  { slug: "cbc",     en: "CBC Context",           he: "הקשר CBC",        intent: "אזורי המפעל של CBC ותרחישי ייצור אמיתיים, ממופים למודולי SAP.",      accent: "#be185d" },
  { slug: "system",  en: "Governance & System",   he: "ממשל ומערכת",     intent: "כיסוי ידע, אימות, ארכיטקטורת מחבר וכלי יועץ — שכבת ניהול.",          accent: "#475569" },
] as const;

export default function Page() {
  const centers: Center[] = [
    // ── שאל ומצא · Ask & Find ──
    { group: "find", href: "/copilot/", he: "קופיילוט יועץ", title: "Consultant Copilot", tag: "Q&A", tagColor: "#d62027", desc: "שאל שאלה — NEO עונה ממאגר הידע בלבד (lifecycle, פתרונות, טבלאות, תקלות), לא מזיכרון AI כללי." },
    { group: "find", href: "/solutions/", he: "מאתר פתרונות SAP", title: "SAP Solution Finder", tag: `${SOLUTIONS.length}`, tagColor: "#b45309", desc: "חיפוש לפי דרישה עסקית (גם בעברית: 'קליטת סחורה', 'ניהול אצווה') — תהליך, ECC, S/4, Fiori, טבלאות, CDS, APIs, BAPIs, Exits, תקלות, מורכבות." },
    { group: "find", href: "/oic/", he: "תבונת אובייקטים", title: "Object Intelligence Center", tag: `${OIC_OBJECTS.length}`, tagColor: "#4338ca", desc: "תצוגה מאוחדת לכל אובייקט ליבה — טבלאות, T-Codes, BAPIs/FMs, BAdIs/Exits, CDS, תקלות, SAP Notes, Debug ו-CBC, עם קישורים צולבים בין כולם." },

    // ── הבן תהליך · Understand the Process ──
    { group: "learn", href: "/process-explorer/", he: "סייר תהליכים E2E", title: "Process Explorer", tag: `${PROCESS_MAPS.length}`, tagColor: "#4338ca", desc: "מפות תהליך מקצה-לקצה (P2P/O2C/Plan-to-Produce/QM/אחזקה) — כל שלב חושף T-Codes, טבלאות, Fiori, ממשקים, תקלות ובדיקות." },
    { group: "learn", href: "/guides/", he: "מדריכי תהליך מעמיקים", title: "Deep Process Guides", tag: `${PROCESS_GUIDES.length} תהליכים`, tagColor: "#0369a1", desc: "תהליכי PM/PP-PI מקצה-לקצה — זרימה, ביצוע שלב-אחר-שלב, טעויות נפוצות, זרימת אבחון, נתיב Debug, Exits/BAdIs, ECC↔S/4 ו-CBC." },
    { group: "learn", href: "/blueprints/", he: "מרכז בלופרינטים", title: "Business Blueprints", tag: `${BLUEPRINTS.length}`, tagColor: "#0369a1", desc: "בלופרינטים עסקיים PM/PP-PI — היקף, גורמים, קלט/פלט, תלויות, אינטגרציה, נתוני אב, תרשים E2E." },
    { group: "learn", href: "/concepts/", he: "מרכז מושגי SAP", title: "SAP Concepts Center", tag: `${CONCEPTS.length} מושגים`, tagColor: "#0891b2", desc: "אובייקט, טבלה, מבנה, דומיין, FM, BAPI, IDoc, CDS, BAdI, מרכז עבודה, ציוד, פקודות — הסבר עסקי + טכני + ECC/S4." },
    { group: "learn", href: "/mrp/", he: "מרכז MRP / MPS", title: "MRP / MPS Center", tag: "Planning", tagColor: "#1d4ed8", desc: "מדריך תכנון מעמיק — MRP Live מול קלאסי, MPS, PIR/תחזית, אסטרטגיות 10/11/20/40/50/70, Net-Change, MRP Areas, Lot-Sizing וגרסת ייצור." },

    // ── בנה והגדר · Build & Configure ──
    { group: "build", href: "/playbooks/", he: "מדריכי יישום", title: "Implementation Playbooks", tag: `${PLAYBOOKS.length}`, tagColor: "#7c2d12", desc: "מטרה עסקית, קונפיגורציה, נתוני אב, בדיקות וסיכוני Go-Live — Batch, QM, אחזקה מונעת, גרסת ייצור." },
    { group: "build", href: "/config/", he: "קונפיגורציה (SPRO)", title: "Configuration Center", tag: `${CONFIG_TOPICS.length}`, tagColor: "#0d9488", desc: "נתיב SPRO, טבלאות הגדרה, הגדרות מפתח, טעויות, Impact, Transport, ECC↔S/4 — סוגי הודעה/פקודה, MRP, אסטרטגיות, מתכונים, אצוות." },
    { group: "build", href: "/abap/", he: "מרכז מפתח ABAP", title: "ABAP Developer Center", tag: "Dev", tagColor: "#7c3aed", desc: "SE80/SE38/SE37/SE24/SE11/SE84/SAT/ST05/ST12/SCI/ATC — מטרה, דוגמאות, שימוש Debug, טבלאות ואובייקטים." },
    { group: "build", href: "/enhancements/", he: "מרכז הרחבות", title: "Enhancement Center", tag: `${ENHANCEMENTS.length} טכניקות`, tagColor: "#7c3aed", desc: "User Exit, Customer Exit, BAdI (קלאסי/חדש), Implicit/Explicit, BTE — איך, מתי, ודוגמאות PM/PP." },
    { group: "build", href: "/exits/", he: "מרכז Exits / BAdIs", title: "User Exit / BAdI Center", tag: `${EXITS.length} הרחבות`, tagColor: "#7c3aed", desc: "קטלוג Exits/BAdIs בשמות — IWO10009, PPCO0001, WORKORDER_UPDATE ועוד. נקודת הפעלה, אובייקט, דוגמה, שיטת Debug ו-ECC↔S/4." },
    { group: "build", href: "/integration/", he: "מרכז אינטגרציה", title: "Integration Center", tag: "11 טכנולוגיות", tagColor: "#0891b2", desc: "IDoc/ALE/RFC/tRFC/qRFC, PI/PO, CPI, Integration Suite, OData, APIs, Event Mesh — ארכיטקטורה, דיאגרמות זרימה, ניטור, תקלות ו-Root Cause." },
    { group: "build", href: "/idoc/", he: "חוקר IDoc", title: "IDoc Explorer", tag: "Diagnose", tagColor: "#0e7490", desc: "אנטומיית IDoc (EDIDC/EDID4/EDIDS), זרימת נתונים, מדריך קודי סטטוס (51/64/68…), כלי ניטור (WE02/BD87/WE19) וסוגי הודעה — כלי אבחון." },
    { group: "build", href: "/delivery/", he: "מרכז ניהול פרויקט", title: "Project Delivery", tag: "SAP Activate", tagColor: "#4f46e5", desc: "6 שלבי SAP Activate (Discover→Run), Cutover, Test Management, Defect Management, סדנאות Fit-to-Standard ו-Blueprint." },

    // ── פתור תקלה · Troubleshoot & Resolve ──
    { group: "fix", href: "/resolution/", he: "מנוע נתיב פתרון", title: "Resolution Path Engine", tag: "Detect→Prevent", tagColor: "#0e7490", desc: "נתיב פתרון מובנה לכל תקלה — זיהוי→בידוד→אבחון→תיקון→מניעה, עם קישור לאובייקטים, Notes ו-Debug." },
    { group: "fix", href: "/troubleshooting/", he: "מרכז פתרון תקלות", title: "Troubleshooting Center", tag: `${INCIDENTS.length} תקלות`, tagColor: "#dc2626", desc: "קטלוג תקלות — תסמין, קוד שגיאה, גורמי שורש, T-Codes לאבחון, טבלאות, נקודות Debug, Exits/BAdIs ושלבי תיקון." },
    { group: "fix", href: "/sap-notes/", he: "מרכז SAP Notes", title: "SAP Notes Center", tag: `${SAP_NOTES.length} נושאים`, tagColor: "#b45309", desc: "נתיבי פתרון לפי רכיב SAP (Application Component) + מילות חיפוש מאומתות ל-OSS — תסמין, שורש, ECC↔S/4 וקישור לתקלות. ללא מספרי Note מומצאים." },
    { group: "fix", href: "/notes-graph/", he: "גרף SAP Notes", title: "SAP Notes Graph", tag: "Graph", tagColor: "#b45309", desc: "גרף המקשר Note ↔ תקלה ↔ אובייקט ↔ רכיב SAP + מילות חיפוש OSS. ללא מספרי Note מומצאים." },
    { group: "fix", href: "/debugging/", he: "מרכז Debugging", title: "Debugging Center", tag: `${DEBUGGINGS.length}`, tagColor: "#be185d", desc: "לכל תהליך — Exits/BAdIs, FMs, Breakpoints, נתיב Debug ו-Call Stack." },
    { group: "fix", href: "/qa-testing/", he: "מרכז בדיקות QA", title: "QA Testing Center", tag: `${QA_PACKS.length} חבילות`, tagColor: "#be185d", desc: "תרחישי בדיקה — Positive/Negative/Regression/Integration + ולידציית נתוני אב, מחזור פקודה, אצוות, MRP והתחשבנות." },

    // ── נדוד ל-S/4HANA · Migrate ──
    { group: "migrate", href: "/migration/", he: "מרכז מיגרציה S/4HANA", title: "Migration Center", tag: `${MIGRATIONS.length}`, tagColor: "#2563eb", desc: "נשאר/משתנה/הוסר, Fiori/CDS/API חדשים, סיכוני מיגרציה ו-QA Validation Checklist לכל נושא." },
    { group: "migrate", href: "/ecc-s4/", he: "ECC מול S/4HANA", title: "ECC vs S/4 Engine", tag: `${ECC_S4_TOPICS.length} נושאים`, tagColor: "#2563eb", desc: "MATDOC, ACDOCA, MRP Live, PP-DS, aATP, Fiori/CDS, אחזקה, הודעות — מה השתנה, מה הוחלף, והשפעת המיגרציה." },
    { group: "migrate", href: "/evolution/", he: "מרכז אבולוציית T-Codes", title: "Transaction Evolution", tag: "ECC→S/4", tagColor: "#2563eb", desc: "טבלת מיגרציה — T-Codes שהוסרו/לא-אסטרטגיים ב-S/4 + חלופה (MB1A/B/C→MIGO, XK01→BP, MD01→MD01N) + Fiori + השפעה." },
    { group: "migrate", href: "/fiori/", he: "מרכז Fiori ו-UX", title: "Fiori & UX Center", tag: "UI5 · OData · RAP", tagColor: "#7c3aed", desc: "ארכיטקטורת Fiori (FLP/Gateway/OData), סוגי אפליקציות, SEGW/IWFND/IWBEP, UI5 (MVC), RAP (CDS/Behavior/Service Binding), תקלות וזרימת Debug." },
    { group: "migrate", href: "/fiori-apps/", he: "מרכז אפליקציות Fiori", title: "Fiori Apps Center", tag: "S/4HANA", tagColor: "#16a34a", desc: "ספריית אפליקציות Fiori של S/4HANA — חיפוש לפי App Name, App ID, Business Role, Catalog, OData, CDS, טרנזקציית GUI ומידע הגירה ECC↔S/4." },
    { group: "migrate", href: "/cds/", he: "חוקר תצוגות CDS", title: "CDS Explorer", tag: `${CDS_VIEWS.length}`, tagColor: "#16a34a", desc: "מודל הנתונים הווירטואלי של S/4HANA — שרשרת טבלת ECC → Interface (I_) → Consumption (C_) → Fiori, עם הטבלאות שכל תצוגה ממירה." },
    { group: "migrate", href: "/impact/", he: "מנתח השפעה", title: "Impact Analyzer", tag: "Graph", tagColor: "#9333ea", desc: "מה יושפע אם תשנה טבלה/אובייקט — גרף תלויות מלא + Object Intelligence." },

    // ── נתונים והפניות · Reference & Data ──
    { group: "data", href: "/transactions/", he: "מרכז הטרנזקציות", title: "Transaction Center", tag: `${TRANSACTIONS.length} T-Codes`, tagColor: "#0f766e", desc: "קטלוג T-Codes ל-PM/PP/PP-PI — מטרה, מתי/מי, אובייקטים/טבלאות/BAPIs, User Exits, שגיאות, בלוק ECC↔S/4 ו-Fiori. טבלת עזר + חיפוש." },
    { group: "data", href: "/tables/", he: "חוקר טבלאות מתקדם", title: "Advanced Tables Explorer", tag: `${ALL_TABLES.length}`, tagColor: "#0891b2", desc: "כל הטבלאות — תיאור, קשרים, CDS, ECC↔S/4 ומפת קשרים מלאה (שדות/מפתחות/גרף)." },
    { group: "data", href: "/security/", he: "מרכז הרשאות ואבטחה", title: "Security & Authorizations", tag: "12 תחומים", tagColor: "#dc2626", desc: "SU01, PFCG, SU53, STAUTHTRACE, SUIM, אובייקטי הרשאה, פרופילים, תפקידים (single/composite/derived) ומודל Fiori/IAM — ארכיטקטורה, זרימת אבחון ושאלות ראיון." },
    { group: "data", href: "/authorizations/", he: "הרשאות לתהליכים", title: "Authorization Center", tag: `${PROCESS_AUTH.length}`, tagColor: "#dc2626", desc: "לכל תהליך — אובייקטי הרשאה, כשלים נפוצים ונתיב אבחון SU53→PFCG." },
    { group: "data", href: "/workbench/", he: "שולחנות עבודה ליועץ", title: "Consultant Workbenches", tag: `${WORKBENCHES.length} שולחנות`, tagColor: "#be185d", desc: "שולחנות עבודה ברמת יועץ בכיר — Debugging, QM, PM מתקדם, PP-PI מתקדם. לכל אחד 12 מקטעים: מושגים, ארכיטקטורה, זרימה, טבלאות, טרנזקציות, FMs, BAdIs, Exits, תקלות, נקודות Debug, ECC↔S/4 ו-CBC." },

    // ── הקשר CBC · CBC Context ──
    { group: "cbc", href: "/cbc-model/", he: "מודל תחום CBC", title: "CBC Domain Model", tag: "CBC", tagColor: "#d62027", desc: "אזורי מפעל (קו ייצור/תרכיז/CIP/אצוות/אריזה/איכות/מחסן) → מודולי SAP (PP/PP-PI/QM/PM/MM) + אובייקטים, תהליכים ותקלות." },
    { group: "cbc", href: "/cbc/", he: "מרכז תרחישי CBC", title: "CBC Manufacturing", tag: `${CBC_SCENARIOS.length}`, tagColor: "#d62027", desc: "תרחישי ייצור אמיתיים — משקה, תרכיז, אצוות, CIP, אריזה, מחזורי פקודה." },

    // ── ממשל ומערכת · Governance & System ──
    { group: "system", href: "/alm/", he: "מרכז ALM", title: "Application Lifecycle Management", tag: "SolMan · Cloud ALM", tagColor: "#2563eb", desc: "Solution Manager, Focused Build ו-Cloud ALM — מחזור חיים E2E, ניהול טרנספורטים (CTS/STMS/Retrofit), שינויים ותקלות, בדיקות וניטור." },
    { group: "system", href: "/architect/", he: "לוח ארכיטקט", title: "Architect Dashboard", tag: "KPI", tagColor: "#1e293b", desc: "כיסוי ידע, ECC↔S/4, טרנזקציות, Fiori, תקלות, CBC — עם זיהוי פערים אוטומטי." },
    { group: "system", href: "/verification/", he: "לוח אימות מאגר", title: "Verification Dashboard", tag: "Audit", tagColor: "#0f766e", desc: "סיווג כל ישות Verified/Partially/Needs + קישורים מומצאים, מיפויים חלשים, כפילויות ומיפויי FM/BAdI חשודים." },
    { group: "system", href: "/quality-audit/", he: "ביקורת איכות ידע", title: "Knowledge Quality Audit", tag: "Audit", tagColor: "#0f766e", desc: "סריקה סטטית — כפילויות, הפניות יתומות, קישורים שבורים, לוח איכות." },
    { group: "system", href: "/connector/", he: "מחבר SAP (ארכיטקטורה)", title: "Live SAP Connector", tag: "Prep", tagColor: "#0e7490", desc: "ארכיטקטורה וממשקים למחבר read-only עתידי (TSTC/DD02L/DD03L/SE93/CDS/Fiori). ללא חיבור חי." },
    { group: "system", href: "/import/", he: "מנוע ייבוא SAP", title: "SAP Import Engine", tag: "Arch", tagColor: "#0e7490", desc: "חבילת חילוץ (TSTC/TSTCT/DD02L/DD03L/TADIR/SE93) + מנוע ייבוא/אימות. ארכיטקטורה בלבד, ללא חיבור." },
    { group: "system", href: "/toolkit/", he: "ערכת היועץ", title: "Consultant Toolkit", tag: `${TOOLKIT.length}`, tagColor: "#475569", desc: "תבניות מוכנות — ראיון, סדנה, בלופרינט, QA, Cutover, Hypercare, Go-Live, ניתוח תקלה." },
  ];

  return (
    <div>
      <CenterHeader eyebrow="NEO · שכבת ידע SAP" title="מרכז הידע" sub="שכבת הידע המקצועית של NEO — מאורגנת לפי מה שאתה צריך לעשות, לא לפי סוג טכני. התחל בחיפוש, או בחר מסע." accent="#d62027" />

      <KnowledgeExplorer centers={centers} groups={GROUPS.map((g) => ({ ...g }))} />

      <a href="/knowledge/coverage/" className="lift mt-10 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm" dir="rtl">
        <span className="text-sm font-bold text-slate-700">📊 דוח כיסוי ידע — סך ישויות, מאומת מול כללי, פערים גלויים וציון איכות לפי תחום</span>
        <span className="text-sm font-bold text-brand">פתח →</span>
      </a>
    </div>
  );
}
