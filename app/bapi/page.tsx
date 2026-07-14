import { CenterHeader } from "@/components/knowledge";
import { registry } from "@/lib/bapi-registry";
import { FunctionCatalog } from "@/components/function-catalog";

export const metadata = { title: "BAPIs / Function Modules · NEO" };

export default function Page() {
  const objects = registry();
  const bapis = objects.filter((o) => o.objectType === "BAPI").length;
  const fms = objects.filter((o) => o.objectType === "FM").length;
  return (
    <div>
      <CenterHeader
        eyebrow="עיון · BAPI & Function Module Intelligence"
        title="BAPIs / Function Modules"
        sub={`${bapis} BAPIs ו-${fms} Function Modules מרג׳יסטרי קנוני אחד — הפרדה חזותית, סיווג לפי תהליך עסקי, מצב מתחיל/מומחה ופאנל פרטים עם רצף ביצוע ומצב אימות. אובייקטי PM עברו אימות מול תיעוד SAP.`}
        accent="#0f766e"
      />
      <div className="mt-6">
        <FunctionCatalog objects={objects} gateways />
      </div>
    </div>
  );
}
