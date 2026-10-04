// Project NEO · /neo/onboarding/ — the new consultant's journey, at its old address.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/tools.css";
import { OnboardingView } from "@/components/neo-shell/tools/onboarding-view";

export async function generateMetadata() {
  return {
    title: "קליטת יועץ חדש · Project NEO",
    description: "המסע של יועץ SAP חדש בשבעה שלבים: היכרות, בחירת התמחות, מודל הנתונים, התהליך העסקי, המנטור, מבחן הסמכה ותג יועץ.",
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <OnboardingView />;
}
