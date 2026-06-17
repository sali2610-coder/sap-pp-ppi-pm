import { CenterHeader } from "@/components/knowledge";
import { SolutionFinder } from "@/components/solution-finder";
import { SOLUTIONS } from "@/data/solutions";

export default function Page() {
  return (
    <div>
      <CenterHeader eyebrow="Phase 6 · SAP Solution Finder" title="מאתר הפתרונות" sub={`${SOLUTIONS.length} פתרונות SAP סטנדרטיים — חיפוש לפי דרישה עסקית (לא רק T-Code). לכל פתרון: תהליך, T-Code ECC, חלופת S/4, Fiori, טבלאות, CDS, APIs, BAPIs, Exits, תקלות ומורכבות יישום.`} accent="#b45309" />
      <SolutionFinder />
    </div>
  );
}
