import { AcademyHome } from "@/components/academy-home";

export const metadata = { title: "SAP Academy · Project NEO" };

// SAP Academy — premium learning home (P2 redesign). The old dashboard (quality
// reports / book management) moved to /academy/dashboard.
export default function AcademyPage() {
  return <AcademyHome />;
}
