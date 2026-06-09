import { PM_DATA } from "@/lib/data";
import { ModuleHub } from "@/components/module-hub";

export const metadata = { title: "SAP PM Hub · Project NEO" };

export default function PMPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">SAP PM Hub</h1>
        <p className="text-sm text-muted-foreground">אחזקת מפעל · Plant Maintenance</p>
      </div>
      <ModuleHub module={PM_DATA} />
    </div>
  );
}
