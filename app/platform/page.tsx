import { CenterHeader, Crumb } from "@/components/knowledge";
import { InfrastructureExplorer } from "@/components/infrastructure-explorer";
import { INFRA_LAYERS } from "@/data/infrastructure";

export const metadata = { title: "תשתית ופלטפורמת SAP · Project NEO" };

export default function Page() {
  return (
    <div dir="rtl">
      <Crumb trail={[{ href: "/knowledge/", label: "מרכז הידע" }, { label: "תשתית ופלטפורמת SAP" }]} />
      <CenterHeader
        eyebrow="Phase 8 · SAP Platform & Infrastructure"
        title="תשתית ופלטפורמת SAP"
        sub={`${INFRA_LAYERS.length} שכבות תשתית טכניות — מ-SAP GUI ו-Fiori, דרך Gateway/OData/CDS, RFC/BAPI/IDoc, PI-PO/CPI, HANA, הרשאות ותפקידים, Workflow והרחבות, ניהול פלט ותעבורות, ועד נוף DEV→QA→PRD וניטור תפעולי. לכל שכבה: מטרה, ECC↔S/4, כלים ואובייקטים.`}
        accent="#1e293b"
      />
      <InfrastructureExplorer />
    </div>
  );
}
