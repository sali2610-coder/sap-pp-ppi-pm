import { CenterHeader } from "@/components/knowledge";
import { IncidentExplorer } from "@/components/incident-explorer";
import { INCIDENTS } from "@/data/troubleshooting";

export default function Page() {
  return (
    <div>
      <CenterHeader eyebrow="מרכז הידע · Troubleshooting Center" title="מרכז פתרון תקלות" sub={`${INCIDENTS.length} תקלות PM/PP/PP-PI — תסמין, קוד שגיאה, גורמי שורש, T-Codes לאבחון, טבלאות לבדיקה, נקודות Debug, Exits/BAdIs ושלבי תיקון. חיפוש + סינון מודול.`} accent="#dc2626" />
      <IncidentExplorer />
    </div>
  );
}
