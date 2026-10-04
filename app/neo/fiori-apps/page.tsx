// Project NEO · /neo/fiori-apps/ — the Fiori application directory.
//
// A REAL route that coexists with app/neo/[hub]/page.tsx the same way
// /neo/tables/ and /neo/transactions/ do. nav-data.ts is untouched.
import "@/app/neo/ui.css";
import "@/app/neo/data.css";
import "@/app/neo/reference.css";
import { RefSurface } from "@/components/neo-shell/reference/ref-surface";
import { RefMore } from "@/components/neo-shell/reference/ref-more";
import { fioriDir, fioriIndex } from "@/components/neo-shell/reference/fiori-data";

const nf = new Intl.NumberFormat("he-IL");

export const metadata = {
  title: "יישומי SAP Fiori · Project NEO",
  description:
    "יישומי SAP Fiori המתועדים בפרויקט: מזהה יישום, תפקיד עסקי, קטלוג, שירות OData, תצוגת CDS והטרנזקציות ב-SAP GUI הקשורות לכל יישום.",
  robots: { index: false, follow: false },
};

// The documented apps lead; under them, closed, the full 1,450-app index the
// legacy catalogue carried (id, title, type), with its source named.
export default function NeoFioriDirectory() {
  const index = fioriIndex();
  return (
    <RefSurface dir={fioriDir()}>
      <RefMore
        title={`אינדקס מלא — ${nf.format(index.length)} אפליקציות`}
        lede="(מטא-דאטה: Fiori ID · שם · סוג. השם המלא נלקח מספר 7, SAP Fiori Apps Quick Reference של SAP PRESS, מקור משני שאינו ספריית ה-Fiori הרשמית)"
      >
        <ul className="nxr-index">
          {index.map((a) => (
            <li key={a.id}>
              <span className="nx-sap" dir="ltr">{a.id}</span>
              <span className="nxr-index-n" dir="ltr" lang="en">{a.name}</span>
              <span className="nxr-index-t" lang="en">{a.type}</span>
            </li>
          ))}
        </ul>
      </RefMore>
    </RefSurface>
  );
}
