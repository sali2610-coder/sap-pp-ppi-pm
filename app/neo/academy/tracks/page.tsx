// Project NEO · /neo/academy/tracks/ — the learning tracks (the old /learn/).
// A static segment beside app/neo/academy/[courseId]/, which it wins over.
import "@/app/neo/ui.css";
import "@/app/neo/learn.css";
import { TracksIndexView } from "@/components/neo-shell/academy-ref/tracks-view";
import { tracksIndex } from "@/components/neo-shell/academy-ref/tracks-data";

export const metadata = {
  title: "מסלולי למידה · SAP Academy · Project NEO",
  description: "מסלולי הלמידה לפי תחום: PM, PP-PI, איכות ובדיקות וקליטת יועץ חדש, יחידה אחר יחידה.",
  robots: { index: false, follow: false },
};

export default function NeoTracks() {
  return <TracksIndexView d={tracksIndex()} />;
}
