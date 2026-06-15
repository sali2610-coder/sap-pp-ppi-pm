import { CenterHeader } from "@/components/knowledge";
import { ExitExplorer } from "@/components/exit-explorer";
import { EXITS } from "@/data/exits";

export default function Page() {
  const pm = EXITS.filter((e) => e.module === "PM").length;
  const pp = EXITS.filter((e) => e.module === "PP" || e.module === "PP-PI").length;
  const badi = EXITS.filter((e) => e.kind === "BAdI").length;
  return (
    <div>
      <CenterHeader eyebrow="מרכז הידע · User Exit / BAdI Center" title="מרכז הרחבות בשמות" sub={`קטלוג Exits ו-BAdIs אמיתיים — PM ${pm} · PP/PP-PI ${pp} · ${badi} BAdIs. לכל אחד: מטרה, נקודת הפעלה בתהליך, T-Codes/אובייקט, דוגמה, שיטת Debug, ובלוק ECC↔S/4. חיפוש + סינון מודול.`} accent="#7c3aed" />
      <ExitExplorer />
    </div>
  );
}
