import { PPPI_DATA } from "@/data/sapData.pppi";
import { ModulePortal } from "@/components/module-portal";

export const metadata = {
  title: "SAP PP-PI — Process Industries",
  description: "פורטל תיעוד ל-SAP PP-PI (ייצור תהליכי): ארכיטקטורה, תהליך, נתוני אב, טבלאות, טרנזקציות, BAPIs, CDS, Fiori, תצורה, אינטגרציה ותקלות. ECC6 → S/4HANA.",
};

export default function PPPIPage() {
  return <ModulePortal module={PPPI_DATA} slug="pp-pi" />;
}
