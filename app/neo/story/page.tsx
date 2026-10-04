// Project NEO · /neo/story/ — the family index, at its legacy address under /neo/.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/records.css";
import { RecordIndex } from "@/components/neo-shell/records/kit";
import { storiesIndex } from "@/components/neo-shell/records/story";

export const metadata = {
  title: "סיור מודרך בתהליך · Project NEO",
  description: "תהליכי SAP מקצה לקצה, שלב אחרי שלב: מה זה, למה, מתי, מה נוצר במערכת ומה משתנה ב-S/4HANA.",
  robots: { index: false, follow: false },
};

export default function Page() {
  const x = storiesIndex();
  return <RecordIndex head={x.head} groups={x.groups} />;
}
