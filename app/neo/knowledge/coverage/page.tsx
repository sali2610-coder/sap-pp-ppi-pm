// Project NEO · /neo/knowledge/coverage/ — the knowledge-base coverage report, at its old address.
// A literal segment beside app/neo/knowledge/[slug]/: the literal route wins.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/tools.css";
import { CoverageView } from "@/components/neo-shell/tools/coverage-view";

export async function generateMetadata() {
  return {
    title: "דוח כיסוי ידע · מרכז הידע · Project NEO",
    description: "כיסוי מאגר הידע לפי תחום: טבלאות, טרנזקציות, BAPI, Function Modules, IDoc, CDS, הרשאות, מושגים והרחבות, עם ציון איכות ושקיפות פערים.",
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <CoverageView />;
}
