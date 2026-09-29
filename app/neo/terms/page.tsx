// Project NEO · /neo/terms/ — rendered from components/neo-shell/legal/legal-content.ts.
import "@/app/neo/legal.css";
import { LegalView } from "@/components/neo-shell/legal/legal-view";
import { TERMS } from "@/components/neo-shell/legal/legal-content";

export const metadata = {
  title: "תנאי שימוש · Project NEO",
  description: "מה האתר מציע, מה אינו מבטיח, ומה חשוב לדעת לפני שמסתמכים על תוכן או על תשובת AI.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <LegalView doc={TERMS} />;
}
