// Project NEO · /neo/exits/ — the named exits and BAdIs, by module.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/records.css";
import { RecordIndex } from "@/components/neo-shell/records/kit";
import { exitsIndex } from "@/components/neo-shell/records/exits";

export const metadata = {
  title: "מרכז הרחבות בשמות · Project NEO",
  description: "קטלוג Exits ו-BAdIs בשמות ל-PM, PP ו-PP-PI: מטרה, נקודת הפעלה, אובייקט, דוגמה, Debug ו-ECC מול S/4HANA.",
  robots: { index: false, follow: false },
};

export default function Page() {
  const x = exitsIndex();
  return <RecordIndex head={x.head} groups={x.groups} />;
}
