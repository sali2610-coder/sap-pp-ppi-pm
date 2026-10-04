/* ============================================================================
   PROJECT NEO · /neo/knowledge — THE CENTRES BY TASK.
   ----------------------------------------------------------------------------
   SERVER component, rendered inside the knowledge surface as its children.

   Content parity, rollout 2026-10. The legacy /knowledge/ page
   (app/knowledge/page.tsx) was a directory: eight journeys by consultant task,
   each with its intent, and in them the centres, each with a one-line
   description. Those lines were inline literals in the route file; they are
   copied below verbatim, with each legacy address replaced by the NEO page it
   now redirects to (vercel.json). Every destination is a generated NEO page.

   THREE CARDS ARE NOT CARRIED, and the reason is the honesty rule, not size:
     /copilot/   its line says NEO answers from the knowledge base only; the
                 NEO chat it redirects to says its answers are general knowledge.
     /apps/      it redirects to /neo/transactions/, which the "מרכז הטרנזקציות"
                 card already describes; its line promises an ECC↔Fiori
                 comparison mode that NEO does not have.
     /architect/ it redirects to the Architecture Studio, a graph tool; its line
                 describes a coverage dashboard that has no NEO page.
   The tag counts of the cards are not carried either: they were counters.
   ========================================================================== */

import Link from "next/link";
import { enLang } from "../lang";

interface JourneyCenter {
  he: string;
  en: string;
  desc: string;
  /** The NEO page the legacy address redirects to; null for this page. */
  href: string | null;
}

interface Journey {
  slug: string;
  he: string;
  en: string;
  intent: string;
  centers: JourneyCenter[];
}

const JOURNEYS: Journey[] = [
  {
    slug: "find", he: "שאל ומצא", en: "Ask & Find",
    intent: "התחל כאן — שאלה חופשית, חיפוש לפי צורך עסקי, או צלילה לאובייקט בודד.",
    centers: [
      { he: "מאתר פתרונות SAP", en: "SAP Solution Finder", desc: "חיפוש לפי דרישה עסקית (גם בעברית: 'קליטת סחורה', 'ניהול אצווה') — תהליך, ECC, S/4, Fiori, טבלאות, CDS, APIs, BAPIs, Exits, תקלות, מורכבות.", href: "/neo/solutions/" },
      { he: "תבונת אובייקטים", en: "Object Intelligence Center", desc: "תצוגה מאוחדת לכל אובייקט ליבה — טבלאות, T-Codes, BAPIs/FMs, BAdIs/Exits, CDS, תקלות, SAP Notes, Debug ו-הארגון, עם קישורים צולבים בין כולם.", href: "/neo/oic/" },
    ],
  },
  {
    slug: "learn", he: "הבן תהליך", en: "Understand the Process",
    intent: "תהליכי SAP מקצה-לקצה, מושגים, בלופרינטים ותכנון ייצור.",
    centers: [
      { he: "סייר תהליכים E2E", en: "Process Explorer", desc: "מפות תהליך מקצה-לקצה (P2P/O2C/Plan-to-Produce/QM/אחזקה) — כל שלב חושף T-Codes, טבלאות, Fiori, ממשקים, תקלות ובדיקות.", href: "/neo/process-explorer/" },
      { he: "מדריכי תהליך מעמיקים", en: "Deep Process Guides", desc: "תהליכי PM/PP-PI מקצה-לקצה — זרימה, ביצוע שלב-אחר-שלב, טעויות נפוצות, זרימת אבחון, נתיב Debug, Exits/BAdIs, ECC↔S/4 ו-הארגון.", href: "/neo/guides/" },
      { he: "מרכז בלופרינטים", en: "Business Blueprints", desc: "בלופרינטים עסקיים PM/PP-PI — היקף, גורמים, קלט/פלט, תלויות, אינטגרציה, נתוני אב, תרשים E2E.", href: "/neo/centers/blueprints/" },
      { he: "מרכז מושגי SAP", en: "SAP Concepts Center", desc: "אובייקט, טבלה, מבנה, דומיין, FM, BAPI, IDoc, CDS, BAdI, מרכז עבודה, ציוד, פקודות — הסבר עסקי + טכני + ECC/S4.", href: null },
      { he: "מרכז MRP / MPS", en: "MRP / MPS Center", desc: "מדריך תכנון מעמיק — MRP Live מול קלאסי, MPS, PIR/תחזית, אסטרטגיות 10/11/20/40/50/70, Net-Change, MRP Areas, Lot-Sizing וגרסת ייצור.", href: "/neo/domain/pppi-mrp/" },
    ],
  },
  {
    slug: "build", he: "בנה והגדר", en: "Build & Configure",
    intent: "יישום בפועל — קונפיגורציה (SPRO), פיתוח ABAP, הרחבות וממשקים.",
    centers: [
      { he: "מדריכי יישום", en: "Implementation Playbooks", desc: "מטרה עסקית, קונפיגורציה, נתוני אב, בדיקות וסיכוני Go-Live — Batch, QM, אחזקה מונעת, גרסת ייצור.", href: "/neo/centers/playbooks/" },
      { he: "קונפיגורציה (SPRO)", en: "Configuration Center", desc: "נתיב SPRO, טבלאות הגדרה, הגדרות מפתח, טעויות, Impact, Transport, ECC↔S/4 — סוגי הודעה/פקודה, MRP, אסטרטגיות, מתכונים, אצוות.", href: "/neo/centers/config/" },
      { he: "מרכז מפתח ABAP", en: "ABAP Developer Center", desc: "SE80/SE38/SE37/SE24/SE11/SE84/SAT/ST05/ST12/SCI/ATC — מטרה, דוגמאות, שימוש Debug, טבלאות ואובייקטים.", href: "/neo/centers/abap/" },
      { he: "מרכז הרחבות", en: "Enhancement Center", desc: "User Exit, Customer Exit, BAdI (קלאסי/חדש), Implicit/Explicit, BTE — איך, מתי, ודוגמאות PM/PP.", href: "/neo/enhancements/" },
      { he: "מרכז Exits / BAdIs", en: "User Exit / BAdI Center", desc: "קטלוג Exits/BAdIs בשמות — IWO10009, PPCO0001, WORKORDER_UPDATE ועוד. נקודת הפעלה, אובייקט, דוגמה, שיטת Debug ו-ECC↔S/4.", href: "/neo/exits/" },
      { he: "מרכז אינטגרציה", en: "Integration Center", desc: "IDoc/ALE/RFC/tRFC/qRFC, PI/PO, CPI, Integration Suite, OData, APIs, Event Mesh — ארכיטקטורה, דיאגרמות זרימה, ניטור, תקלות ו-Root Cause.", href: "/neo/integration/" },
      { he: "חוקר IDoc", en: "IDoc Explorer", desc: "אנטומיית IDoc (EDIDC/EDID4/EDIDS), זרימת נתונים, מדריך קודי סטטוס (51/64/68…), כלי ניטור (WE02/BD87/WE19) וסוגי הודעה — כלי אבחון.", href: "/neo/idoc/" },
      { he: "מרכז ניהול פרויקט", en: "Project Delivery", desc: "6 שלבי SAP Activate (Discover→Run), Cutover, Test Management, Defect Management, סדנאות Fit-to-Standard ו-Blueprint.", href: "/neo/delivery/" },
    ],
  },
  {
    slug: "fix", he: "פתור תקלה", en: "Troubleshoot & Resolve",
    intent: "מתסמין לפתרון — אבחון, SAP Notes, Debug ובדיקות QA.",
    centers: [
      { he: "מנוע נתיב פתרון", en: "Resolution Path Engine", desc: "נתיב פתרון מובנה לכל תקלה — זיהוי→בידוד→אבחון→תיקון→מניעה, עם קישור לאובייקטים, Notes ו-Debug.", href: "/neo/incidents/" },
      { he: "מרכז פתרון תקלות", en: "Troubleshooting Center", desc: "קטלוג תקלות — תסמין, קוד שגיאה, גורמי שורש, T-Codes לאבחון, טבלאות, נקודות Debug, Exits/BAdIs ושלבי תיקון.", href: "/neo/incidents/" },
      { he: "מרכז SAP Notes", en: "SAP Notes Center", desc: "נתיבי פתרון לפי רכיב SAP (Application Component) + מילות חיפוש מאומתות ל-OSS — תסמין, שורש, ECC↔S/4 וקישור לתקלות.", href: "/neo/sap-notes/" },
      { he: "גרף SAP Notes", en: "SAP Notes Graph", desc: "גרף המקשר Note ↔ תקלה ↔ אובייקט ↔ רכיב SAP + מילות חיפוש OSS.", href: "/neo/notes-graph/" },
      { he: "מרכז Debugging", en: "Debugging Center", desc: "לכל תהליך — Exits/BAdIs, FMs, Breakpoints, נתיב Debug ו-Call Stack.", href: "/neo/centers/debugging/" },
      { he: "מרכז בדיקות QA", en: "QA Testing Center", desc: "תרחישי בדיקה — Positive/Negative/Regression/Integration + ולידציית נתוני אב, מחזור פקודה, אצוות, MRP והתחשבנות.", href: "/neo/qa-testing/" },
    ],
  },
  {
    slug: "migrate", he: "נדוד ל-S/4HANA", en: "Migrate to S/4HANA",
    intent: "מה נשאר, מה השתנה, מה הוסר — והשפעת המעבר ECC↔S/4.",
    centers: [
      { he: "מרכז מיגרציה S/4HANA", en: "Migration Center", desc: "נשאר/משתנה/הוסר, Fiori/CDS/API חדשים, סיכוני מיגרציה ו-QA Validation Checklist לכל נושא.", href: "/neo/centers/migration/" },
      { he: "ECC מול S/4HANA", en: "ECC vs S/4 Engine", desc: "MATDOC, ACDOCA, MRP Live, PP-DS, aATP, Fiori/CDS, אחזקה, הודעות — מה השתנה, מה הוחלף, והשפעת המיגרציה.", href: "/neo/ecc-s4/" },
      { he: "מרכז אבולוציית T-Codes", en: "Transaction Evolution", desc: "טבלת מיגרציה — T-Codes שהוסרו/לא-אסטרטגיים ב-S/4 + חלופה (MB1A/B/C→MIGO, XK01→BP, MD01→MD01N) + Fiori + השפעה.", href: "/neo/evolution/" },
      { he: "מרכז Fiori ו-UX", en: "Fiori & UX Center", desc: "ארכיטקטורת Fiori (FLP/Gateway/OData), סוגי אפליקציות, SEGW/IWFND/IWBEP, UI5 (MVC), RAP (CDS/Behavior/Service Binding), תקלות וזרימת Debug.", href: "/neo/fiori/" },
      { he: "מרכז אפליקציות Fiori", en: "Fiori Apps Center", desc: "ספריית אפליקציות Fiori של S/4HANA — חיפוש לפי App Name, App ID, Business Role, Catalog, OData, CDS, טרנזקציית GUI ומידע הגירה ECC↔S/4.", href: "/neo/fiori-apps/" },
      { he: "חוקר תצוגות CDS", en: "CDS Explorer", desc: "מודל הנתונים הווירטואלי של S/4HANA — שרשרת טבלת ECC → Interface (I_) → Consumption (C_) → Fiori, עם הטבלאות שכל תצוגה ממירה.", href: "/neo/cds/" },
      { he: "מנתח השפעה", en: "Impact Analyzer", desc: "מה יושפע אם תשנה טבלה/אובייקט — גרף תלויות מלא + Object Intelligence.", href: "/neo/tables/" },
    ],
  },
  {
    slug: "data", he: "נתונים והפניות", en: "Reference & Data",
    intent: "קטלוגים לחיפוש מהיר — T-Codes, טבלאות, הרשאות ושולחנות עבודה.",
    centers: [
      { he: "מרכז הטרנזקציות", en: "Transaction Center", desc: "קטלוג T-Codes ל-PM/PP/PP-PI — מטרה, מתי/מי, אובייקטים/טבלאות/BAPIs, User Exits, שגיאות, בלוק ECC↔S/4 ו-Fiori. טבלת עזר + חיפוש.", href: "/neo/transactions/" },
      { he: "חוקר טבלאות מתקדם", en: "Advanced Tables Explorer", desc: "כל הטבלאות — תיאור, קשרים, CDS, ECC↔S/4 ומפת קשרים מלאה (שדות/מפתחות/גרף).", href: "/neo/tables/" },
      { he: "מרכז הרשאות ואבטחה", en: "Security & Authorizations", desc: "SU01, PFCG, SU53, STAUTHTRACE, SUIM, אובייקטי הרשאה, פרופילים, תפקידים (single/composite/derived) ומודל Fiori/IAM — ארכיטקטורה, זרימת אבחון ושאלות ראיון.", href: "/neo/security/" },
      { he: "הרשאות לתהליכים", en: "Authorization Center", desc: "לכל תהליך — אובייקטי הרשאה, כשלים נפוצים ונתיב אבחון SU53→PFCG.", href: "/neo/centers/process-auth/" },
      { he: "שולחנות עבודה ליועץ", en: "Consultant Workbenches", desc: "שולחנות עבודה ברמת יועץ בכיר — Debugging, QM, PM מתקדם, PP-PI מתקדם. לכל אחד 12 מקטעים: מושגים, ארכיטקטורה, זרימה, טבלאות, טרנזקציות, FMs, BAdIs, Exits, תקלות, נקודות Debug, ECC↔S/4 ו-הארגון.", href: "/neo/workbench/" },
    ],
  },
  {
    slug: "scenario", he: "הקשר ייצור", en: "Manufacturing Context",
    intent: "אזורי המפעל לדוגמה ותרחישי ייצור אמיתיים, ממופים למודולי SAP.",
    centers: [
      { he: "מודל תחום", en: "Domain Model", desc: "אזורי מפעל (קו ייצור/תרכיז/CIP/אצוות/אריזה/איכות/מחסן) → מודולי SAP (PP/PP-PI/QM/PM/MM) + אובייקטים, תהליכים ותקלות.", href: "/neo/domain-model/" },
      { he: "מרכז תרחישי ייצור", en: "Manufacturing", desc: "תרחישי ייצור אמיתיים — משקה, תרכיז, אצוות, CIP, אריזה, מחזורי פקודה.", href: "/neo/centers/manufacturing/" },
    ],
  },
  {
    slug: "system", he: "ממשל ומערכת", en: "Governance & System",
    intent: "כיסוי ידע, אימות, ארכיטקטורת מחבר וכלי יועץ — שכבת ניהול.",
    centers: [
      { he: "מרכז ALM", en: "Application Lifecycle Management", desc: "Solution Manager, Focused Build ו-Cloud ALM — מחזור חיים E2E, ניהול טרנספורטים (CTS/STMS/Retrofit), שינויים ותקלות, בדיקות וניטור.", href: "/neo/alm/" },
      { he: "לוח אימות מאגר", en: "Verification Dashboard", desc: "סיווג כל ישות Verified/Partially/Needs + קישורים מומצאים, מיפויים חלשים, כפילויות ומיפויי FM/BAdI חשודים.", href: "/neo/verification/" },
      { he: "ביקורת איכות ידע", en: "Knowledge Quality Audit", desc: "סריקה סטטית — כפילויות, הפניות יתומות, קישורים שבורים, לוח איכות.", href: "/neo/quality-audit/" },
      { he: "מחבר SAP (ארכיטקטורה)", en: "Live SAP Connector", desc: "ארכיטקטורה וממשקים למחבר read-only עתידי (TSTC/DD02L/DD03L/SE93/CDS/Fiori). ללא חיבור חי.", href: "/neo/connector/" },
      { he: "מנוע ייבוא SAP", en: "SAP Import Engine", desc: "חבילת חילוץ (TSTC/TSTCT/DD02L/DD03L/TADIR/SE93) + מנוע ייבוא/אימות. ארכיטקטורה בלבד, ללא חיבור.", href: "/neo/import/" },
      { he: "ערכת היועץ", en: "Consultant Toolkit", desc: "תבניות מוכנות — ראיון, סדנה, בלופרינט, QA, Cutover, Hypercare, Go-Live, ניתוח תקלה.", href: "/neo/centers/toolkit/" },
    ],
  },
];

export function KnowledgeJourneys() {
  return (
    <section className="nxl-jr" aria-labelledby="nxl-jr-h">
      <h2 className="nx-h2" id="nxl-jr-h">המרכזים לפי משימה</h2>
      <p className="nxl-jr-lede">מאורגנים לפי מה שאתה צריך לעשות, לא לפי סוג טכני.</p>
      {JOURNEYS.map((j) => (
        <details key={j.slug} className="nxl-jr-g">
          <summary>
            <span className="nxl-jr-gt">
              <b>{j.he}</b>
              <em lang="en" dir="ltr">{j.en}</em>
              <span className="nxl-jr-n">{j.centers.length}</span>
            </span>
            <span className="nxl-jr-intent">{j.intent}</span>
          </summary>
          <ul className="nxl-jr-l">
            {j.centers.map((c) => (
              <li key={c.en}>
                <span className="nxl-jr-t">
                  {c.href
                    ? <Link className="nu-link" href={c.href} prefetch={false}>{c.he}</Link>
                    : <b aria-current="page">{c.he}</b>}
                  <em lang={enLang(c.en)} dir="ltr">{c.en}</em>
                </span>
                <span className="nxl-jr-d">{c.desc}</span>
              </li>
            ))}
          </ul>
        </details>
      ))}
      <p className="nxl-jr-cov">
        <Link className="nu-link" href="/neo/knowledge/coverage/" prefetch={false}>
          דוח כיסוי ידע — סך ישויות, מאומת מול כללי, פערים גלויים וציון איכות לפי תחום
        </Link>
      </p>
    </section>
  );
}
