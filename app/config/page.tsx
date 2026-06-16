import { CenterHeader } from "@/components/knowledge";
import { CenterIndexGrid } from "@/components/topic-center";
import { CONFIG_TOPICS } from "@/data/centers/config";

export default function Page() {
  return (
    <div>
      <CenterHeader eyebrow="Configuration Center" title="מרכז קונפיגורציה (SPRO)" sub={`הגדרות SPRO ל-PM/PP-PI — נתיב, טבלאות, הגדרות מפתח, טעויות, Impact, Transport, ECC↔S/4 · ${CONFIG_TOPICS.length} פריטים`} accent="#0d9488" />
      <CenterIndexGrid items={CONFIG_TOPICS} base="/config/" />
    </div>
  );
}
