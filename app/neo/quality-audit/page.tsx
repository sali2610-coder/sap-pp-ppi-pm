// Project NEO · /neo/quality-audit/ — the knowledge-base quality audit, at its old address.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/tools.css";
import { QualityAuditView } from "@/components/neo-shell/tools/quality-audit-view";

export async function generateMetadata() {
  return {
    title: "ביקורת איכות ידע · Project NEO",
    description: "סריקה סטטית של עקביות המאגר: כפילויות, חפיפת טרנזקציות והפניות יתומות בין תקלות, טבלאות, תהליכים ופתרונות.",
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <QualityAuditView />;
}
