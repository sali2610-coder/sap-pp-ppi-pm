// Legacy accordion reader → unified /academy reader (decommissioned PR-10).
import { LegacyRedirect } from "@/components/academy/legacy-redirect";

// noindex: these are decommissioned redirect stubs with ~55 characters of
// visible text, all sharing one title. Leaving them indexable put 116 thin,
// duplicate-title pages in Google's index and in the sitemap. `follow` is
// kept so the link to the live Academy page still passes through.
export const metadata = { title: "עבר ל-SAP Academy", robots: { index: false, follow: true } };

export default function Page() {
  return <LegacyRedirect to="/academy/path/pm/" label="תחזוקת מפעל" />;
}
