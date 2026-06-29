import { CenterHeader } from "@/components/knowledge";
import { IDocExplorer } from "@/components/idoc-explorer";
import { idocMessageTypes } from "@/lib/idoc-intel";

export const metadata = { title: "IDoc Explorer · NEO" };

export default function Page() {
  const n = idocMessageTypes().length;
  return (
    <div>
      <CenterHeader
        eyebrow="מרכז אינטגרציה · IDoc Explorer"
        title="חוקר ה-IDoc"
        sub={`אנטומיה (EDIDC/EDID4/EDIDS), זרימת נתונים, מדריך קודי סטטוס לאבחון, כלי ניטור ו-${n} סוגי הודעה מהבלוּפרינט. מבוסס ידע SAP מאומת — כלי אבחון, משלים למסלול הלמידה.`}
        accent="#0e7490"
      />
      <IDocExplorer />
    </div>
  );
}
