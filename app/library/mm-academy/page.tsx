// Legacy accordion reader → unified /academy reader (decommissioned PR-10).
import { LegacyRedirect } from "@/components/academy/legacy-redirect";

export const metadata = { title: "עבר ל-SAP Academy" };

export default function Page() {
  return <LegacyRedirect to="/academy/path/mm/" label="רכש ואספקה" />;
}
