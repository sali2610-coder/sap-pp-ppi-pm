// Project NEO · /neo/terms/ — rendered from components/neo-shell/legal/legal-content.ts.
// ui.css is imported per route (see app/neo/tables/page.tsx); without it the
// footer links, the return link and the contents list lost their touch size
// and their control styles on this page (gate 8, M8).
import "@/app/neo/ui.css";
import "@/app/neo/legal.css";
import { LegalView } from "@/components/neo-shell/legal/legal-view";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { TERMS } from "@/components/neo-shell/legal/legal-content";

export const metadata = {
  title: "תנאי שימוש · Project NEO",
  description: "מה האתר מציע, מה אינו מבטיח, ומה חשוב לדעת לפני שמסתמכים על תוכן או על תשובת AI.",
  robots: { index: false, follow: false },
};

// The way back, as on every NEO page (gate 5, finding 10); the route's parent
// is resolved by nav-context/fallbacks.ts. Not inside LegalView, which the
// legacy /privacy/ also renders outside the NEO shell.
export default function Page() {
  return (
    <>
      <SmartReturn />
      <LegalView doc={TERMS} />
    </>
  );
}
