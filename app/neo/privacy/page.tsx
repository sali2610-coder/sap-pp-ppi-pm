// Project NEO · /neo/privacy/ — rendered from components/neo-shell/legal/legal-content.ts.
import "@/app/neo/legal.css";
import { LegalView } from "@/components/neo-shell/legal/legal-view";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { PRIVACY } from "@/components/neo-shell/legal/legal-content";

export const metadata = {
  title: "מדיניות פרטיות · Project NEO",
  description: "מה נשמר במכשיר, מה יוצא ממנו ולאן, ב-SAP by Sali · Project NEO.",
  robots: { index: false, follow: false },
};

// The way back, as on every NEO page (gate 5, finding 10); the route's parent
// is resolved by nav-context/fallbacks.ts. Not inside LegalView, which the
// legacy /privacy/ also renders outside the NEO shell.
export default function Page() {
  return (
    <>
      <SmartReturn />
      <LegalView doc={PRIVACY} />
    </>
  );
}
