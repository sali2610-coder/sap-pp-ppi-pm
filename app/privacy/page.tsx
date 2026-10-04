import type { Metadata } from "next";
import { PrivacyPolicy } from "@/components/privacy-policy";

export const metadata: Metadata = {
  title: "מדיניות פרטיות · SAP by Sali",
  description: "מדיניות הפרטיות של SAP by Sali · Project NEO — אפליקציה שאינה אוספת מידע אישי, ללא חשבונות, ללא עוקבים, ופועלת מקומית במכשיר.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}
