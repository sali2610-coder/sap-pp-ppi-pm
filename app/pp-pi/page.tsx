import { PPPI_DATA } from "@/lib/data";
import { ModuleHub } from "@/components/module-hub";

export const metadata = { title: "SAP PP-PI Hub · Project NEO" };

export default function PPPIPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">SAP PP-PI Hub</h1>
        <p className="text-sm text-muted-foreground">תכנון ייצור תהליכי · Process Industries</p>
      </div>
      <ModuleHub module={PPPI_DATA} />
    </div>
  );
}
