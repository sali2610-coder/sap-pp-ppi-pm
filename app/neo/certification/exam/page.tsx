// Project NEO · /neo/certification/exam — the assessment runner.
//
// The engine (lib/cert/generate + lib/cert/store) already existed and is used
// as-is. What did not exist was a NEO runner: /neo/certification/ counted the
// banks honestly and then handed the reader to the LEGACY centre to actually
// sit an assessment. This keeps that inside NEO.
//
// No question text is server-rendered — the bank is drawn client-side on start,
// so there is nothing for hydration to disagree about.
import "@/app/neo/ui.css";
import "@/app/neo/learn.css";
import "@/app/neo/cert.css";
import { CertExam } from "@/components/neo-shell/learn/cert-exam";

export const metadata = {
  title: "הערכת ידע · Project NEO",
  description: "הערכה מתוך התיעוד המאומת של הפרויקט: טבלאות, מפתחות, קשרי ER, זרימת נתונים ו-S/4HANA.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CertExam />;
}
