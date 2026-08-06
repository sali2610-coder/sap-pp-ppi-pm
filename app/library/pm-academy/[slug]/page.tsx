// Legacy chapter route kept (old deep links resolve) but redirects to the unified reader.
import { PM_TEXTBOOK } from "@/data/library/pm-textbook";
import { LegacyRedirect } from "@/components/academy/legacy-redirect";

export const dynamicParams = false;
const pad = (n: number) => String(n).padStart(2, "0");
export function generateStaticParams() {
  return Object.keys(PM_TEXTBOOK).map(Number).sort((a, b) => a - b).map((n) => ({ slug: `chapter-${pad(n)}` }));
}
// noindex: these are decommissioned redirect stubs with ~55 characters of
// visible text, all sharing one title. Leaving them indexable put 116 thin,
// duplicate-title pages in Google's index and in the sitemap. `follow` is
// kept so the link to the live Academy page still passes through.
export const metadata = { title: "עבר ל-SAP Academy", robots: { index: false, follow: true } };

export default function Page() {
  return <LegacyRedirect to="/academy/path/pm/" label="תחזוקת מפעל" />;
}
