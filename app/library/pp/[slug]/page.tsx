// Legacy PP chapter route kept (old deep links resolve) but redirects to the unified reader.
import { PP_CHAPTERS } from "@/data/library/pp-knowledge";
import { LegacyRedirect } from "@/components/academy/legacy-redirect";

const pad = (n: number) => String(n).padStart(2, "0");
export const dynamicParams = false;
export function generateStaticParams() {
  return PP_CHAPTERS.map((c) => ({ slug: `chapter-${pad(c.n)}` }));
}
// noindex: these are decommissioned redirect stubs with ~55 characters of
// visible text, all sharing one title. Leaving them indexable put 116 thin,
// duplicate-title pages in Google's index and in the sitemap. `follow` is
// kept so the link to the live Academy page still passes through.
export const metadata = { title: "עבר ל-SAP Academy", robots: { index: false, follow: true } };

export default function Page() {
  return <LegacyRedirect to="/academy/path/pp-pi/" label="תכנון ייצור ובקרה" />;
}
