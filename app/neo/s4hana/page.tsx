// Project NEO · /neo/s4hana/ — the S/4HANA transformation centre.
//
// data/s4-objects (29), data/s4-architecture (8) and data/s4-transformation
// (custom code / integration / testing / cutover / lessons) had no NEO surface
// at all before this route. On a platform whose entire premise is the ECC→S/4
// migration, that was the single most consequential gap the pre-production
// audit found.
import "@/app/neo/ui.css";
import "@/app/neo/s4.css";
import { S4HanaCenter } from "@/components/neo-shell/s4/s4-view";
import { s4ObjectTotals } from "@/components/neo-shell/s4/s4-data";

export function generateMetadata() {
  const t = s4ObjectTotals();
  return {
    title: "מרכז S/4HANA · Project NEO",
    description: `${t.total} אובייקטים שהשתנו במעבר מ-ECC ל-S/4HANA: מה היה, מה קיים, מה זה עושה לקוד המותאם, ומה לבדוק.`,
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <S4HanaCenter />;
}
