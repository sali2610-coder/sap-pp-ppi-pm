import Link from "next/link";
import { CenterHeader } from "@/components/knowledge";

// COMPATIBILITY ROUTE (design-audit continuation §18, 2026-09-22).
//
// /exits/Implicit-Enhancement/ used to be a row of data/exits.ts named
// "Implicit Enhancement". An implicit enhancement point is a technique of the
// Enhancement Framework, not a named exit, so on 2026-09-21 the content moved
// to the enhancement technique record `implicit-enhancement` and the row left
// the catalog (SAP-FIXES.md, FIX-6). The old address still resolves here,
// explains the reclassification and hands the reader to the record that
// carries the content today. Not indexed; not a counted manifest family.
export const metadata = {
  title: "Implicit Enhancement · הרשומה סווגה מחדש",
  robots: { index: false, follow: true },
};

const TARGET = "/neo/enhancements/implicit-enhancement/";

export default function Page() {
  return (
    <div dir="rtl" className="mx-auto max-w-3xl px-4 py-8">
      <meta httpEquiv="refresh" content={`8;url=${TARGET}`} />
      <CenterHeader
        accent="#475569"
        eyebrow="Enhancements · reclassified"
        title="Implicit Enhancement"
        sub="הכתובת הישנה של הרשומה. נקודת הרחבה משתמעת היא טכניקה של ה-Enhancement Framework ולא Exit בשם, ולכן הרשומה סווגה מחדש ב-2026-09-21 ותוכנה עבר לרשומת הטכניקה."
      />
      <div className="mt-6 rounded-2xl border border-hairline bg-surface p-5 text-sm leading-7 text-ink-2">
        <p>
          מה השתנה: השורה "Implicit Enhancement" הוסרה מקטלוג ה-Exits כי שמה אינו מזהה של Exit (רווח) והתוכן
          שלה תיאר את המנגנון עצמו (נקודות הרחבה משתמעות בתחילת ובסוף מודולי קוד). התוכן לא נמחק: הוא נמצא היום
          בדף הטכניקה.
        </p>
        <p className="mt-3">
          הדף הזה נשאר כדי שקישורים ישנים לא יישברו. תועבר לרשומה החדשה בעוד כמה שניות, או לחץ על הקישור.
        </p>
        <p className="mt-5">
          <Link href={TARGET} className="inline-flex min-h-11 items-center rounded-xl bg-brand px-4 py-2 font-bold text-white">
            Implicit Enhancement · הרשומה המלאה
          </Link>
        </p>
      </div>
    </div>
  );
}
