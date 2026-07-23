import type { Metadata } from "next";
import Link from "next/link";
import { Home, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "מדיניות פרטיות · SAP by Sali",
  description: "מדיניות הפרטיות של SAP by Sali · Project NEO — אפליקציה שאינה אוספת מידע אישי, ללא חשבונות, ללא עוקבים, ופועלת מקומית במכשיר.",
  alternates: { canonical: "/privacy/" },
};

const UPDATED = "23 ביולי 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="text-lg font-extrabold tracking-tight text-ink-1">{title}</h2>
      <div className="mt-1.5 space-y-2 text-[14px] leading-relaxed text-ink-2">{children}</div>
    </section>
  );
}

// Google Play requires a reachable privacy-policy URL. This one is accurate to
// the app: 100% offline, no accounts, no analytics, no trackers — the only data
// is progress/settings kept in the browser's localStorage on the user's device.
export default function PrivacyPage() {
  return (
    <div dir="rtl" className="mx-auto max-w-2xl">
      <div className="flex items-center gap-2.5">
        <span className="grid size-10 place-items-center rounded-2xl bg-brand/10 text-brand"><ShieldCheck className="size-5" /></span>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-ink-1">מדיניות פרטיות</h1>
          <p className="text-[12px] font-semibold text-ink-3">SAP by Sali · Project NEO — עודכן {UPDATED}</p>
        </div>
      </div>

      <p className="mt-5 text-[14px] leading-relaxed text-ink-2">
        SAP by Sali (&quot;האפליקציה&quot;) היא פלטפורמת ידע לימודית ל-SAP. האפליקציה תוכננה מהיסוד לפרטיות מלאה:
        היא אינה אוספת, אינה שומרת בשרת ואינה משתפת מידע אישי כלשהו.
      </p>

      <Section title="איזה מידע אנחנו אוספים">
        <p><b>אף לא אחד מהמידע האישי שלך.</b> אין הרשמה, אין חשבונות, אין שם, אין דוא&quot;ל ואין מספר טלפון. האפליקציה אינה מבקשת הרשאות רגישות (מיקום, מצלמה, מיקרופון, אנשי קשר).</p>
      </Section>

      <Section title="נתונים שנשמרים במכשיר בלבד">
        <p>כדי לזכור את ההתקדמות והעדפות התצוגה שלך, האפליקציה שומרת מידע מקומית ב-<span className="tech" dir="ltr">localStorage</span> של הדפדפן/המכשיר — למשל: התקדמות בלימוד, סימניות, ומצב תצוגה. מידע זה <b>נשאר במכשיר שלך</b>, אינו נשלח לשום שרת, ואפשר למחוק אותו בכל רגע דרך הגדרות האפליקציה או ניקוי נתוני האתר בדפדפן.</p>
      </Section>

      <Section title="עוקבים, אנליטיקה ופרסום">
        <p>אין. האפליקציה אינה משתמשת ב-Google Analytics, בפיקסלים, בעוגיות פרסום, ב-SDK-ים של צד שלישי או בכל כלי מעקב אחר. אין פרסומות.</p>
      </Section>

      <Section title="שיתוף מידע עם צד שלישי">
        <p>מכיוון שלא נאסף מידע אישי, אין מה לשתף, למכור או להעביר לצד שלישי.</p>
      </Section>

      <Section title="עבודה במצב לא-מקוון">
        <p>האפליקציה פועלת ברובה גם ללא חיבור לרשת (Service Worker). התוכן והנכסים נשמרים במטמון המקומי של המכשיר לצורך גישה מהירה ואופליין, ואינם כוללים מידע אישי.</p>
      </Section>

      <Section title="ילדים">
        <p>האפליקציה מיועדת לקהל מקצועי (אנשי SAP) ואינה אוספת מידע מילדים או ממשתמש כלשהו.</p>
      </Section>

      <Section title="אבטחה">
        <p>האפליקציה מוגשת אך ורק דרך <span className="tech" dir="ltr">HTTPS</span>, עם מדיניות אבטחת תוכן (CSP) הדוקה, HSTS, והגבלת הרשאות מלאה. אין נקודות קצה חיצוניות שאליהן נשלח מידע.</p>
      </Section>

      <Section title="שינויים במדיניות">
        <p>אם נעדכן את המדיניות, נעדכן את התאריך בראש העמוד. המשך השימוש מהווה הסכמה לגרסה המעודכנת.</p>
      </Section>

      <Section title="יצירת קשר">
        <p>לשאלות בנושא פרטיות: <a href="mailto:sali2610@gmail.com" className="font-bold text-brand hover:underline" dir="ltr">sali2610@gmail.com</a></p>
      </Section>

      <div className="mt-8">
        <Link href="/" className="tap inline-flex items-center gap-1.5 rounded-xl border-2 border-hairline px-4 py-2.5 text-sm font-bold text-ink-2 hover:border-brand/40 hover:text-brand"><Home className="size-4" />חזרה לקוקפיט</Link>
      </div>
    </div>
  );
}
