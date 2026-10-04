// Project NEO · /neo/academy/fiori/ — the academy's SAP Fiori apps index.
// A static segment beside app/neo/academy/[courseId]/, which it wins over.
import "@/app/neo/ui.css";
import "@/app/neo/learn.css";
import { FioriIndexView } from "@/components/neo-shell/academy-ref/fiori-index";

export const metadata = {
  title: "אינדקס אפליקציות Fiori · SAP Academy · Project NEO",
  description: "1,450 אפליקציות SAP Fiori: מזהה, שם, סוג ויחידות הלימוד באקדמיה שמזכירות אותן.",
  robots: { index: false, follow: false },
};

export default function NeoAcademyFiori() {
  return <FioriIndexView />;
}
