/* ============================================================================
   PROJECT NEO · /neo/onboarding/ — the new consultant's seven-step journey.
   ----------------------------------------------------------------------------
   Port of components/onboarding-journey.tsx. Every step's number, title,
   description, time and action is written here on the server, verbatim; the
   reader's own progress comes from the client leaves in onboarding-progress.
   The step destinations are the NEO pages that do each job: the learning
   tracks (the legacy /learn/, now /neo/academy/tracks/) for the track, the ERD
   for the interactive data model, the guided process tours (the legacy
   /story/, now /neo/story/) for the process, NEO AI for the mentor, and the
   certification practice for the exam. The legacy confetti is not carried
   (decorative motion).
   ========================================================================== */

import { AchievementMark, JourneySummary, StepControl, type JStage } from "./onboarding-progress";
import { Onward, ToolPage } from "./kit";

/* Verbatim from components/onboarding-journey.tsx (STAGES), hrefs mapped. */
const STAGES: JStage[] = [
  { id: "welcome", n: 1, title: "ברוך הבא ל-NEO", action: "התחל את המסע", mins: 5 },
  { id: "track", n: 2, title: "בחירת התמחות", action: "בחר מסלול", href: "/neo/academy/tracks/", mins: 10 },
  { id: "model", n: 3, title: "היכרות עם מודל הנתונים", action: "פתח מודל נתונים", href: "/neo/erd/", mins: 20 },
  { id: "process", n: 4, title: "הבנת התהליך העסקי", action: "פתח סיור מודרך", href: "/neo/story/", mins: 25 },
  { id: "mentor", n: 5, title: "עבודה עם המנטור", action: "שאל את המנטור", href: "/neo/chat/", mins: 10 },
  { id: "exam", n: 6, title: "מבחן הסמכה", action: "גש למבחן", href: "/neo/certification/", mins: 30 },
  { id: "badge", n: 7, title: "קבלת תג יועץ", action: "קבל תג", final: true, mins: 2 },
];
const DESC: Record<string, string> = {
  welcome: "סיור מהיר: מודל נתונים, אקדמיה, מנטור, תקלות והסמכה — הכל במקום אחד.",
  track: "PM (תחזוקת מפעל) או PP-PI (ייצור תהליכי) — בחר את מסלול הליבה שלך.",
  model: "טבלאות, מפתחות, קשרים והשפעת S/4 — בגרף אינטראקטיבי.",
  process: "סיור מודרך בתהליך אחזקה/ייצור מקצה לקצה, בהקשר ייצור.",
  mentor: "שאל על כל אובייקט, תסמין או תהליך — תשובות מבוססות מאגר בלבד.",
  exam: "מבחן ידע טכני אקראי — 20 שאלות, ציון מעבר 80.",
  badge: "סיימת את המסע — קבל את תג היועץ המוסמך של NEO.",
};

const ACH = [
  { id: "login", he: "כניסה ראשונה" },
  { id: "model", he: "מודל נתונים ראשון" },
  { id: "process", he: "ניתוח תהליך ראשון" },
  { id: "mentor", he: "שאלת מנטור ראשונה" },
  { id: "quiz", he: "מבחן ראשון" },
  { id: "cert", he: "יועץ מוסמך" },
];

export function OnboardingView() {
  const stages = STAGES;
  return (
    <ToolPage
      surface="onboarding"
      back={{ href: "/neo/academy/", label: "SAP Academy" }}
      eye="קליטת יועץ חדש"
      eyeEn="Consultant Onboarding"
      title="המסע שלך להיות יועץ SAP"
      lede={
        <>
          <p className="ntl-lede-p">
            מסלול: <span dir="ltr">PP-PI · PM</span>. ההתקדמות נשמרת בדפדפן שלך בלבד.
          </p>
          <JourneySummary stages={stages} achN={ACH.length} />
        </>
      }
    >
      <section className="ntl-sec" aria-labelledby="steps-h">
        <h2 id="steps-h" className="nx-h2 ntl-h2">שלבי המסע</h2>
        <ol className="ntl-journey-steps">
          {STAGES.map((s, i) => (
            <li key={s.id} className="nct-sec ntl-step">
              <p className="ntl-step-k">שלב {s.n}</p>
              <h3 className="ntl-step-h">{s.title}</h3>
              <p className="nct-p">{DESC[s.id]}</p>
              <p className="ntl-prog-t">~{s.mins} דק&apos;</p>
              <StepControl stages={stages} i={i} />
            </li>
          ))}
        </ol>
      </section>

      <section className="nct-sec ntl-sec" aria-labelledby="ach-h">
        <h2 id="ach-h" className="nct-sec-h"><i aria-hidden="true" />הישגים</h2>
        <ul className="ntl-ach">
          {ACH.map((a) => (
            <li key={a.id}>
              <span>{a.he}</span>
              <AchievementMark stages={stages} id={a.id} />
            </li>
          ))}
        </ul>
      </section>

      <Onward items={[
        { href: "/neo/academy/", label: "SAP Academy" },
        { href: "/neo/certification/", label: "תרגול ובדיקת ידע" },
        { href: "/neo/knowledge/", label: "מרכז הידע" },
      ]} />
    </ToolPage>
  );
}
