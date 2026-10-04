import { PrivacyPolicy } from "@/components/privacy-policy";
import "../ui.css";
import "../data.css";

export const metadata = {
  title: "מדיניות פרטיות · Project NEO",
  robots: { index: false, follow: true },
};

export default function NeoPrivacyPage() {
  return <div className="nxd"><PrivacyPolicy homeHref="/neo/" homeLabel="חזרה למסך הבית" /></div>;
}
