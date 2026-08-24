// Project NEO · /neo/domain-model/ — the business-domain hub.
//
// This path existed before as a Stage-1 placeholder that `app/neo/[hub]`
// generated and nothing linked to — the only orphan route in the product. The
// rail's own item has always COUNTED the 39 domains here while pointing at
// /neo/erd/, so a reader who clicked "39 תחומים" landed on a table graph and
// never reached one of them. The count and the destination agree now, and the
// ER model keeps its own entry under Reference.
import "@/app/neo/ui.css";
import "@/app/neo/domain.css";
import { DomainsHub } from "@/components/neo-shell/domain/domain-view";
import { domainTotals } from "@/components/neo-shell/domain/domain-data";

export function generateMetadata() {
  const t = domainTotals();
  return {
    title: "תחומים עסקיים · Project NEO",
    description: `${t.domains} תחומים פונקציונליים של PM ו-PP-PI: זרימה עסקית, טבלאות, טרנזקציות, נקודות למידה, תקלות והכרעת מעבר ל-S/4HANA.`,
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <DomainsHub />;
}
