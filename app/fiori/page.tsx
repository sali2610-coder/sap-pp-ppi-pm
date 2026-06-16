import { CenterHeader } from "@/components/knowledge";
import { CenterIndexGrid } from "@/components/topic-center";
import { FIORI_APPS } from "@/data/centers/fiori";

export default function Page() {
  return (
    <div>
      <CenterHeader eyebrow="Fiori Center" title="מרכז Fiori" sub={`מיפוי טרנזקציה קלאסית → אפליקציית Fiori — App ID, Catalog, Role, OData, CDS, Launchpad · ${FIORI_APPS.length} פריטים`} accent="#7c3aed" />
      <CenterIndexGrid items={FIORI_APPS} base="/fiori/" />
    </div>
  );
}
