import { CenterHeader, CardGrid, IndexCard } from "@/components/knowledge";
import { CONCEPTS } from "@/data/concepts";
import { ENHANCEMENTS } from "@/data/enhancements";
import { AUTH_ITEMS } from "@/data/authorizations";
import { ECC_S4_TOPICS } from "@/data/ecc-s4";
import { TRANSACTIONS } from "@/data/transactions";
import { EXITS } from "@/data/exits";
import { PROCESS_GUIDES } from "@/data/process-guides";
import { INCIDENTS } from "@/data/troubleshooting";
import { QA_PACKS } from "@/data/qa-center";

export default function Page() {
  const centers = [
    { href: "/transactions/", he: "מרכז הטרנזקציות", title: "Transaction Center", tag: `${TRANSACTIONS.length} T-Codes`, tagColor: "#0f766e", desc: "קטלוג T-Codes ל-PM/PP/PP-PI — מטרה, מתי/מי, אובייקטים/טבלאות/BAPIs, User Exits, שגיאות, בלוק ECC↔S/4 ו-Fiori. טבלת עזר + חיפוש." },
    { href: "/mrp/", he: "מרכז MRP / MPS", title: "MRP / MPS Center", tag: "Planning", tagColor: "#1d4ed8", desc: "מדריך תכנון מעמיק — MRP Live מול קלאסי, MPS, PIR/תחזית, אסטרטגיות 10/11/20/40/50/70, Net-Change, MRP Areas, Lot-Sizing וגרסת ייצור." },
    { href: "/exits/", he: "מרכז Exits / BAdIs", title: "User Exit / BAdI Center", tag: `${EXITS.length} הרחבות`, tagColor: "#7c3aed", desc: "קטלוג Exits/BAdIs בשמות — IWO10009, PPCO0001, WORKORDER_UPDATE ועוד. נקודת הפעלה, אובייקט, דוגמה, שיטת Debug ו-ECC↔S/4." },
    { href: "/guides/", he: "מדריכי תהליך מעמיקים", title: "Deep Process Guides", tag: `${PROCESS_GUIDES.length} תהליכים`, tagColor: "#0369a1", desc: "תהליכי PM/PP-PI מקצה-לקצה — זרימה, ביצוע שלב-אחר-שלב, טעויות נפוצות, זרימת אבחון, נתיב Debug, Exits/BAdIs, ECC↔S/4 ו-CBC." },
    { href: "/troubleshooting/", he: "מרכז פתרון תקלות", title: "Troubleshooting Center", tag: `${INCIDENTS.length} תקלות`, tagColor: "#dc2626", desc: "קטלוג תקלות — תסמין, קוד שגיאה, גורמי שורש, T-Codes לאבחון, טבלאות, נקודות Debug, Exits/BAdIs ושלבי תיקון." },
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
