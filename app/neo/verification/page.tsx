// Project NEO · /neo/verification/ — the repository verification dashboard, at its old address.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/tools.css";
import { VerificationView } from "@/components/neo-shell/tools/verification-view";

export async function generateMetadata() {
  return {
    title: "לוח אימות מאגר · Project NEO",
    description: "סיווג ישויות המאגר ל-Verified, Partially ו-Needs Verification לפי סוג, וממצאי בדיקה סטטית: קישורים יתומים, מיפויים חלשים וכפילויות.",
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <VerificationView />;
}
