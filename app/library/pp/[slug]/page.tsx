// Legacy PP chapter route kept (old deep links resolve) but redirects to the unified reader.
import { PP_CHAPTERS } from "@/data/library/pp-knowledge";
import { LegacyRedirect } from "@/components/academy/legacy-redirect";

const pad = (n: number) => String(n).padStart(2, "0");
export const dynamicParams = false;
export function generateStaticParams() {
  return PP_CHAPTERS.map((c) => ({ slug: `chapter-${pad(c.n)}` }));
}
export const metadata = { title: "עבר ל-SAP Academy" };

export default function Page() {
  return <LegacyRedirect to="/academy/path/pp-pi/" label="תכנון ייצור ובקרה" />;
}
