import { PM_DATA } from "@/data/sapData.pm";
import { ModuleHub } from "@/components/module-hub";

export const metadata = { title: "SAP PM Hub · Project NEO" };

export default function PMPage() {
  return <ModuleHub module={PM_DATA} />;
}
