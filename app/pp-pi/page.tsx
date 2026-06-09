import { PPPI_DATA } from "@/lib/data";
import { ModuleHub } from "@/components/module-hub";

export const metadata = { title: "SAP PP-PI Hub · Project NEO" };

export default function PPPIPage() {
  return <ModuleHub module={PPPI_DATA} />;
}
