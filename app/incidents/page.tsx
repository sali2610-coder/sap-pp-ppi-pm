import { CenterHeader } from "@/components/knowledge";
import { IncidentExplorer } from "@/components/incident-explorer";
import { INCIDENTS } from "@/data/troubleshooting";

export const metadata = { title: "Incident Intelligence Center · NEO" };

export default function IncidentsPage() {
  return (
    <div>
      <CenterHeader eyebrow="Incident Intelligence Center" title="מרכז תקלות חכם" sub={`${INCIDENTS.length} תקלות SAP — תסמין · השפעה עסקית · גורם שורש (פונקציונלי+טכני) · טבלאות · T-Codes · Debug + Breakpoints · SAP Notes/OSS · תיקון · מניעה · ECC↔S/4. PM · PP · PP-PI · MM · QM · IDOC · PI/PO · הרשאות.`} accent="#dc2626" />
      <IncidentExplorer />
    </div>
  );
}
