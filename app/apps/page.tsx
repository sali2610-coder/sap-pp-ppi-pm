import { CenterHeader } from "@/components/knowledge";
import { AppsCenter } from "@/components/apps-center";
import { appCodes } from "@/lib/apps-intel";

export const metadata = { title: "SAP Apps & Transactions Center · NEO" };

export default function Page() {
  return (
    <div>
      <CenterHeader
        eyebrow="Flagship · Apps & Transactions"
        title="מרכז אפליקציות וטרנזקציות SAP"
        sub={`חיפוש אחד שמחבר את כל עולם ה-SAP — ${appCodes().length} טרנזקציות עם ECC⇄S/4⇄Fiori, תהליך, טבלאות, CDS, BAPIs, הרשאות, קונפיגורציה, בדיקות ומיגרציה. מבוסס מטא-דאטה מאומת בלבד.`}
        accent="#0f172a"
      />
      <AppsCenter />
    </div>
  );
}
