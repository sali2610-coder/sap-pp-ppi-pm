import Link from "next/link";
import { CenterHeader } from "@/components/knowledge";

// COMPATIBILITY ROUTE (design-audit continuation §18, 2026-09-22).
//
// /exits/CMOD-SMOD/ used to be a row of data/exits.ts named "CMOD/SMOD". That
// row was not an exit: CMOD and SMOD are the transactions of the CUSTOMER EXIT
// technique, so on 2026-09-21 the content moved to the enhancement technique
// record `customer-exit` and the row left the catalog (SAP-FIXES.md, FIX-6).
// The old address still resolves here, says what happened, and hands the
// reader to the record that carries the content today. The page is not
// indexed and is not part of the route manifest's counted families.
export const metadata = {
  title: "CMOD/SMOD · הרשומה סווגה מחדש",
  robots: { index: false, follow: true },
};

const TARGET = "/neo/enhancements/customer-exit/";

export default function Page() {
  return (
    <div dir="rtl" className="mx-auto max-w-3xl px-4 py-8">
      <CenterHeader
        accent="#475569"
        eyebrow="Enhancements · reclassified"
        title="CMOD / SMOD"
        sub="הכתובת הישנה של הרשומה. CMOD ו-SMOD הן טרנזקציות המימוש של טכניקת ה-Customer Exit, לא Exit בפני עצמן, ולכן הרשומה סווגה מחדש ב-2026-09-21 ותוכנה עבר לרשומת הטכניקה."
      />
      <div className="mt-6 rounded-2xl border border-hairline bg-surface p-5 text-sm leading-7 text-ink-2">
        <p>
          מה השתנה: השורה "CMOD/SMOD" הוסרה מקטלוג ה-Exits כי שמה אינו מזהה של Exit (לוכסן) והתוכן שלה תיאר
          את מנגנון ה-Customer Exit (SMOD להגדרה, CMOD לפרויקט ההרחבה). התוכן לא נמחק: הוא נמצא היום בדף הטכניקה.
        </p>
        <p className="mt-3">
          הדף הזה נשאר כדי שקישורים ישנים לא יישברו. הקישור למטה מוביל לרשומה המלאה.
        </p>
        <p className="mt-5">
          <Link href={TARGET} className="inline-flex min-h-11 items-center rounded-xl bg-brand px-4 py-2 font-bold text-brand-foreground">
            Customer Exit · הרשומה המלאה
          </Link>
        </p>
      </div>
    </div>
  );
}
