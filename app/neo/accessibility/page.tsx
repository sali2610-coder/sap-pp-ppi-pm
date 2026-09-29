// Project NEO · /neo/accessibility/ — rendered from components/neo-shell/legal/legal-content.ts.
import "@/app/neo/legal.css";
import { LegalView } from "@/components/neo-shell/legal/legal-view";
import { ACCESSIBILITY } from "@/components/neo-shell/legal/legal-content";

export const metadata = {
  title: "הצהרת נגישות · Project NEO",
  description: "מה נבדק באתר, איך, ומה עדיין לא. רק בדיקות שבוצעו בפועל.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <LegalView doc={ACCESSIBILITY} />;
}
