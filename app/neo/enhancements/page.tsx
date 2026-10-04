// Project NEO · /neo/enhancements/ — the enhancement-technique directory.
//
// A REAL route that coexists with app/neo/[hub]/page.tsx the same way
// /neo/tables/ and /neo/transactions/ do. nav-data.ts is untouched.
import "@/app/neo/ui.css";
import "@/app/neo/data.css";
import "@/app/neo/reference.css";
import Link from "next/link";
import { RefSurface } from "@/components/neo-shell/reference/ref-surface";
import { enhDir } from "@/components/neo-shell/reference/enh-data";

export const metadata = {
  title: "טכניקות הרחבה · Project NEO",
  description:
    "טכניקות ההרחבה של SAP ב-Project NEO: מעמד כל טכניקה ב-ECC וב-S/4HANA, וההרחבות בשם מקטלוג הפרויקט המשויכות אליה.",
  robots: { index: false, follow: false },
};

// Under the techniques, one quiet onward row to the named exits and BAdIs
// (app/neo/exits/, a static route): the techniques' concrete instances.
export default function NeoEnhancementsDirectory() {
  return (
    <RefSurface dir={enhDir()}>
      <nav className="nxr-also" aria-labelledby="enh-also-h">
        <h2 className="nxr-also-h" id="enh-also-h">ראו גם</h2>
        <ul>
          <li><Link href="/neo/exits/" prefetch={false} className="nu-link">מרכז הרחבות בשמות: Exits ו-BAdIs ל-PM, PP ו-PP-PI</Link></li>
        </ul>
      </nav>
    </RefSurface>
  );
}
