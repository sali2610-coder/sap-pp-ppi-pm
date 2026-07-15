import { AcademyDashboard } from "@/components/academy-dashboard";

export const metadata = { title: "SAP Academy · Project NEO" };

// Legacy alias — Academy is now the top-level /academy product (P1 IA split).
// Kept so existing deep links to /library/academy keep resolving.
export default function LibraryAcademyAlias() {
  return <AcademyDashboard />;
}
