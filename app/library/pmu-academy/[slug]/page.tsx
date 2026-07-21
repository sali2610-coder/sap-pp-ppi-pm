// Legacy chapter route kept (old deep links resolve) but redirects to the unified reader.
import { PMU_TEXTBOOK } from "@/data/library/pmu-textbook";
import { LegacyRedirect } from "@/components/academy/legacy-redirect";

export const dynamicParams = false;
const pad = (n: number) => String(n).padStart(2, "0");
export function generateStaticParams() {
  return Object.keys(PMU_TEXTBOOK).map(Number).sort((a, b) => a - b).map((n) => ({ slug: `chapter-${pad(n)}` }));
}
export const metadata = { title: "עבר ל-SAP Academy" };

export default function Page() {
  return <LegacyRedirect to="/academy/path/pm-user/" label="תחזוקת מפעל — משתמש" />;
}
