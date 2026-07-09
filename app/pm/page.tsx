import { PM_DATA } from "@/data/sapData.pm";
import { ModulePortal } from "@/components/module-portal";

export const metadata = {
  title: "SAP PM — Plant Maintenance",
  description: "פורטל תיעוד ל-SAP PM (אחזקת מפעל): ארכיטקטורה, תהליך, נתוני אב, טבלאות, טרנזקציות, BAPIs, CDS, Fiori, תצורה, אינטגרציה ותקלות. ECC6 → S/4HANA.",
};

export default function PMPage() {
  return <ModulePortal module={PM_DATA} slug="pm" />;
}
