// Project NEO · /neo/centers/ — the Centers hub.
//
// Replaces eleven legacy routes that all rendered the same two components over
// a different dataset. See components/neo-shell/centers/centers-data.ts for why
// this is one surface rather than eleven migrations.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import { CentersHub } from "@/components/neo-shell/centers/centers-view";

export const metadata = {
  title: "מרכזי ידע · Project NEO",
  description: "מרכזי הידע של הפרויקט: בלופרינטים, הגדרות, תרחישי ייצור, הרשאות, אינטגרציה, מעבר ל-S/4HANA ועוד.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CentersHub />;
}
