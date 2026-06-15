import { CenterHeader, CardGrid, IndexCard } from "@/components/knowledge";
import { CONCEPTS } from "@/data/concepts";
import { ENHANCEMENTS } from "@/data/enhancements";
import { AUTH_ITEMS } from "@/data/authorizations";
import { ECC_S4_TOPICS } from "@/data/ecc-s4";

export default function Page() {
  const centers = [
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
