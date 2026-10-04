// Project NEO · /neo/sap-infrastructure/ — the SAP infrastructure centre, at its old address.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/tools.css";
import { InfraView } from "@/components/neo-shell/tools/infra-view";

export async function generateMetadata() {
  return {
    title: "תשתיות SAP · Project NEO",
    description: "מפת התשתית של SAP: ליבת האובייקטים המשותפים, המודולים והזרימות שלהם, תהליכים חוצי-מודולים ומסמכים, תהליכי למידה ל-PM ו-PP-PI ושדות הליבה.",
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <InfraView />;
}
