import { CenterHeader, Crumb } from "@/components/knowledge";
import { LineageExplorer } from "@/components/lineage-explorer";

export const metadata = { title: "שושלת נתונים · Data Lineage · Project NEO" };

export default function Page() {
  return (
    <div dir="rtl">
      <Crumb trail={[{ href: "/knowledge/", label: "מרכז הידע" }, { label: "שושלת נתונים" }]} />
      <CenterHeader
        eyebrow="Phase 7 · Data Lineage"
        title="שושלת נתונים — מקור → אובייקט → צרכן"
        sub="עקוב אחר זרימת הנתונים של כל אובייקט SAP: מהיכן הוא נטען (מקורות), מי מתחזק אותו (T-Codes/ממשקים), ומי צורך אותו במורד הזרם (טבלאות, CDS, Fiori). חיפוש חופשי, וסימון נתיב בלחיצה."
        accent="#0891b2"
      />
      <LineageExplorer initial="EQUI" />
    </div>
  );
}
