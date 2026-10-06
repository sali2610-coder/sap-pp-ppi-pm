import "@/app/neo/ui.css";
import "@/app/neo/learn.css";
import "@/app/neo/learn-extensions.css";
import "@/app/neo/data.css";
import "@/app/neo/academy-experience.css";
import { academyData } from "@/components/neo-shell/learn/academy-data";
import { sourceIndex } from "@/components/neo-shell/learn/source-data";
import { MaterialsLibrary } from "@/components/neo-shell/learn/materials-library";

export const metadata = { title: "כל חומרי האקדמיה · Project NEO", robots: { index: false, follow: false } };

export default function AcademyMaterials() {
  return <MaterialsLibrary courses={academyData().courses.map((c) => ({
    id: c.id, title: c.title, module: c.module, chapters: sourceIndex(c.id),
  }))} />;
}
