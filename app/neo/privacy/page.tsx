// Project NEO · /neo/privacy/ — rendered from components/neo-shell/legal/legal-content.ts.
import "@/app/neo/legal.css";
import { LegalView } from "@/components/neo-shell/legal/legal-view";
import { PRIVACY } from "@/components/neo-shell/legal/legal-content";

export const metadata = {
  title: "מדיניות פרטיות · Project NEO",
  description: "מה נשמר במכשיר, מה יוצא ממנו ולאן, ב-SAP by Sali · Project NEO.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <LegalView doc={PRIVACY} />;
}
