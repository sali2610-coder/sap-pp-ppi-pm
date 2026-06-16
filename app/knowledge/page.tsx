import { CenterHeader, CardGrid, IndexCard } from "@/components/knowledge";
import { CONCEPTS } from "@/data/concepts";
import { ENHANCEMENTS } from "@/data/enhancements";
import { AUTH_ITEMS } from "@/data/authorizations";
import { ECC_S4_TOPICS } from "@/data/ecc-s4";
import { TRANSACTIONS } from "@/data/transactions";
import { EXITS } from "@/data/exits";
import { PROCESS_GUIDES } from "@/data/process-guides";
import { INCIDENTS } from "@/data/troubleshooting";
import { SAP_NOTES } from "@/data/sap-notes";
import { QA_PACKS } from "@/data/qa-center";
import { BLUEPRINTS } from "@/data/centers/blueprints";
import { CONFIG_TOPICS } from "@/data/centers/config";
import { FIORI_APPS } from "@/data/centers/fiori";
import { INTEGRATIONS } from "@/data/centers/integration";
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

export default function Page() {
  const centers = [
    { href: "/copilot/", he: "קופיילוט יועץ", title: "Consultant Copilot", tag: "Q&A", tagColor: "#d62027", desc: "שאל שאלה — NEO עונה ממאגר הידע בלבד (lifecycle, פתרונות, טבלאות, תקלות), לא מזיכרון AI כללי." },
    { href: "/solutions/", he: "מאתר פתרונות SAP", title: "SAP Solution Finder", tag: `${SOLUTIONS.length}`, tagColor: "#b45309", desc: "חיפוש לפי דרישה עסקית (גם בעברית: 'קליטת סחורה', 'ניהול אצווה') — תהליך, ECC, S/4, Fiori, טבלאות, CDS, APIs, BAPIs, Exits, תקלות, מורכבות." },
    { href: "/process-explorer/", he: "סייר תהליכים E2E", title: "Process Explorer", tag: `${PROCESS_MAPS.length}`, tagColor: "#4338ca", desc: "מפות תהליך מקצה-לקצה (P2P/O2C/Plan-to-Produce/QM/אחזקה) — כל שלב חושף T-Codes, טבלאות, Fiori, ממשקים, תקלות ובדיקות." },
    { href: "/impact/", he: "מנתח השפעה", title: "Impact Analyzer", tag: "Graph", tagColor: "#9333ea", desc: "מה יושפע אם תשנה טבלה/אובייקט — גרף תלויות מלא + Object Intelligence." },
    { href: "/playbooks/", he: "מדריכי יישום", title: "Implementation Playbooks", tag: `${PLAYBOOKS.length}`, tagColor: "#7c2d12", desc: "מטרה עסקית, קונפיגורציה, נתוני אב, בדיקות וסיכוני Go-Live — Batch, QM, אחזקה מונעת, גרסת ייצור." },
    { href: "/architect/", he: "לוח ארכיטקט", title: "Architect Dashboard", tag: "KPI", tagColor: "#1e293b", desc: "כיסוי ידע, ECC↔S/4, טרנזקציות, Fiori, תקלות, CBC — עם זיהוי פערים אוטומטי." },
    { href: "/connector/", he: "מחבר SAP (ארכיטקטורה)", title: "Live SAP Connector", tag: "Prep", tagColor: "#0e7490", desc: "ארכיטקטורה וממשקים למחבר read-only עתידי (TSTC/DD02L/DD03L/SE93/CDS/Fiori). ללא חיבור חי." },
    { href: "/oic/", he: "תבונת אובייקטים", title: "Object Intelligence Center", tag: `${OIC_OBJECTS.length}`, tagColor: "#4338ca", desc: "תצוגה מאוחדת לכל אובייקט ליבה — טבלאות, T-Codes, BAPIs/FMs, BAdIs/Exits, CDS, תקלות, SAP Notes, Debug ו-CBC, עם קישורים צולבים בין כולם." },
    { href: "/resolution/", he: "מנוע נתיב פתרון", title: "Resolution Path Engine", tag: "Detect→Prevent", tagColor: "#0e7490", desc: "נתיב פתרון מובנה לכל תקלה — זיהוי→בידוד→אבחון→תיקון→מניעה, עם קישור לאובייקטים, Notes ו-Debug." },
    { href: "/notes-graph/", he: "גרף SAP Notes", title: "SAP Notes Graph", tag: "Graph", tagColor: "#b45309", desc: "גרף המקשר Note ↔ תקלה ↔ אובייקט ↔ רכיב SAP + מילות חיפוש OSS. ללא מספרי Note מומצאים." },
    { href: "/workbench/", he: "שולחנות עבודה ליועץ", title: "Consultant Workbenches", tag: `${WORKBENCHES.length} שולחנות`, tagColor: "#be185d", desc: "שולחנות עבודה ברמת יועץ בכיר — Debugging, QM, PM מתקדם, PP-PI מתקדם. לכל אחד 12 מקטעים: מושגים, ארכיטקטורה, זרימה, טבלאות, טרנזקציות, FMs, BAdIs, Exits, תקלות, נקודות Debug, ECC↔S/4 ו-CBC." },
    { href: "/blueprints/", he: "מרכז בלופרינטים", title: "Business Blueprints", tag: `${BLUEPRINTS.length}`, tagColor: "#0369a1", desc: "בלופרינטים עסקיים PM/PP-PI — היקף, גורמים, קלט/פלט, תלויות, אינטגרציה, נתוני אב, תרשים E2E." },
    { href: "/config/", he: "קונפיגורציה (SPRO)", title: "Configuration Center", tag: `${CONFIG_TOPICS.length}`, tagColor: "#0d9488", desc: "נתיב SPRO, טבלאות הגדרה, הגדרות מפתח, טעויות, Impact, Transport, ECC↔S/4 — סוגי הודעה/פקודה, MRP, אסטרטגיות, מתכונים, אצוות." },
    { href: "/tables/", he: "חוקר טבלאות מתקדם", title: "Advanced Tables Explorer", tag: `${ALL_TABLES.length}`, tagColor: "#0891b2", desc: "כל הטבלאות — תיאור, קשרים, CDS, ECC↔S/4 ומפת קשרים מלאה (שדות/מפתחות/גרף)." },
    { href: "/fiori/", he: "מרכז Fiori", title: "Fiori Center", tag: `${FIORI_APPS.length}`, tagColor: "#7c3aed", desc: "מיפוי טרנזקציה → Fiori — App ID, Business Catalog, Role, OData, CDS ו-Launchpad setup." },
    { href: "/integration/", he: "מרכז אינטגרציה", title: "Integration Center", tag: `${INTEGRATIONS.length}`, tagColor: "#0891b2", desc: "IDoc/ALE/RFC/BAPI/OData/CPI — זרימת הודעה, קודי סטטוס, כשלים נפוצים וטרנזקציות ניטור." },
    { href: "/migration/", he: "מרכז מיגרציה S/4HANA", title: "Migration Center", tag: `${MIGRATIONS.length}`, tagColor: "#2563eb", desc: "נשאר/משתנה/הוסר, Fiori/CDS/API חדשים, סיכוני מיגרציה ו-QA Validation Checklist לכל נושא." },
    { href: "/debugging/", he: "מרכז Debugging", title: "Debugging Center", tag: `${DEBUGGINGS.length}`, tagColor: "#be185d", desc: "לכל תהליך — Exits/BAdIs, FMs, Breakpoints, נתיב Debug ו-Call Stack." },
    { href: "/cbc/", he: "מרכז תרחישי CBC", title: "CBC Manufacturing", tag: `${CBC_SCENARIOS.length}`, tagColor: "#d62027", desc: "תרחישי ייצור אמיתיים — משקה, תרכיז, אצוות, CIP, אריזה, מחזורי פקודה." },
    { href: "/authorizations/", he: "הרשאות לתהליכים", title: "Authorization Center", tag: `${PROCESS_AUTH.length}`, tagColor: "#dc2626", desc: "לכל תהליך — אובייקטי הרשאה, כשלים נפוצים ונתיב אבחון SU53→PFCG." },
    { href: "/toolkit/", he: "ערכת היועץ", title: "Consultant Toolkit", tag: `${TOOLKIT.length}`, tagColor: "#475569", desc: "תבניות מוכנות — ראיון, סדנה, בלופרינט, QA, Cutover, Hypercare, Go-Live, ניתוח תקלה." },
    { href: "/transactions/", he: "מרכז הטרנזקציות", title: "Transaction Center", tag: `${TRANSACTIONS.length} T-Codes`, tagColor: "#0f766e", desc: "קטלוג T-Codes ל-PM/PP/PP-PI — מטרה, מתי/מי, אובייקטים/טבלאות/BAPIs, User Exits, שגיאות, בלוק ECC↔S/4 ו-Fiori. טבלת עזר + חיפוש." },
    { href: "/mrp/", he: "מרכז MRP / MPS", title: "MRP / MPS Center", tag: "Planning", tagColor: "#1d4ed8", desc: "מדריך תכנון מעמיק — MRP Live מול קלאסי, MPS, PIR/תחזית, אסטרטגיות 10/11/20/40/50/70, Net-Change, MRP Areas, Lot-Sizing וגרסת ייצור." },
    { href: "/exits/", he: "מרכז Exits / BAdIs", title: "User Exit / BAdI Center", tag: `${EXITS.length} הרחבות`, tagColor: "#7c3aed", desc: "קטלוג Exits/BAdIs בשמות — IWO10009, PPCO0001, WORKORDER_UPDATE ועוד. נקודת הפעלה, אובייקט, דוגמה, שיטת Debug ו-ECC↔S/4." },
    { href: "/guides/", he: "מדריכי תהליך מעמיקים", title: "Deep Process Guides", tag: `${PROCESS_GUIDES.length} תהליכים`, tagColor: "#0369a1", desc: "תהליכי PM/PP-PI מקצה-לקצה — זרימה, ביצוע שלב-אחר-שלב, טעויות נפוצות, זרימת אבחון, נתיב Debug, Exits/BAdIs, ECC↔S/4 ו-CBC." },
    { href: "/troubleshooting/", he: "מרכז פתרון תקלות", title: "Troubleshooting Center", tag: `${INCIDENTS.length} תקלות`, tagColor: "#dc2626", desc: "קטלוג תקלות — תסמין, קוד שגיאה, גורמי שורש, T-Codes לאבחון, טבלאות, נקודות Debug, Exits/BAdIs ושלבי תיקון." },
    { href: "/sap-notes/", he: "מרכז SAP Notes", title: "SAP Notes Center", tag: `${SAP_NOTES.length} נושאים`, tagColor: "#b45309", desc: "נתיבי פתרון לפי רכיב SAP (Application Component) + מילות חיפוש מאומתות ל-OSS — תסמין, שורש, ECC↔S/4 וקישור לתקלות. ללא מספרי Note מומצאים." },
    { href: "/qa-testing/", he: "מרכז בדיקות QA", title: "QA Testing Center", tag: `${QA_PACKS.length} חבילות`, tagColor: "#be185d", desc: "תרחישי בדיקה — Positive/Negative/Regression/Integration + ולידציית נתוני אב, מחזור פקודה, אצוות, MRP והתחשבנות." },
    { href: "/concepts/", he: "מרכז מושגי SAP", title: "SAP Concepts Center", tag: `${CONCEPTS.length} מושגים`, tagColor: "#0891b2", desc: "אובייקט, טבלה, מבנה, דומיין, FM, BAPI, IDoc, CDS, BAdI, מרכז עבודה, ציוד, פקודות — הסבר עסקי + טכני + ECC/S4." },
    { href: "/ecc-s4/", he: "ECC מול S/4HANA", title: "ECC vs S/4 Engine", tag: `${ECC_S4_TOPICS.length} נושאים`, tagColor: "#2563eb", desc: "MATDOC, ACDOCA, MRP Live, PP-DS, aATP, Fiori/CDS, אחזקה, הודעות — מה השתנה, מה הוחלף, והשפעת המיגרציה." },
    { href: "/enhancements/", he: "מרכז הרחבות", title: "Enhancement Center", tag: `${ENHANCEMENTS.length} טכניקות`, tagColor: "#7c3aed", desc: "User Exit, Customer Exit, BAdI (קלאסי/חדש), Implicit/Explicit, BTE — איך, מתי, ודוגמאות PM/PP." },
    { href: "/security/", he: "מרכז הרשאות ואבטחה", title: "Security Center", tag: `${AUTH_ITEMS.length} פריטים`, tagColor: "#dc2626", desc: "SU01, PFCG, SU53, SUIM, SU24, אובייקטי הרשאה, ACTVT, פרופילים, Trace — כולל אבחון כשלים ודוגמאות PM/PP." },
  ];
  return (
    <div>
      <CenterHeader eyebrow="NEO · שכבת ידע SAP" title="מרכז הידע" sub="שכבת הידע המקצועית של NEO — מושגים, השוואת ECC↔S/4, הרחבות והרשאות. ידע אמיתי, מסומן מאומת מול נגזר; פערים מסומנים במפורש." accent="#d62027" />
      <CardGrid>
        {centers.map((c) => <IndexCard key={c.href} {...c} />)}
      </CardGrid>
      <a href="/knowledge/coverage/" className="lift mt-5 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm" dir="rtl">
        <span className="text-sm font-bold text-slate-700">📊 דוח כיסוי ידע — סך ישויות, מאומת מול כללי, פערים גלויים וציון איכות לפי תחום</span>
        <span className="text-sm font-bold text-brand">פתח →</span>
      </a>
    </div>
  );
}
