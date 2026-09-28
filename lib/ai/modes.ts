/**
 * The two AI surfaces, defined once.
 *
 * They were the same component rendered at two paths, which is why they felt
 * identical — they were. The difference is not styling, it is what each is
 * allowed to answer from:
 *
 *   library  — answers ONLY from the curated books, and refuses when they do
 *              not cover the question. Citation-first.
 *   consult  — may answer from general SAP knowledge, and says so. Still never
 *              invents an identifier, and has no live access to SAP Help,
 *              SAP Notes or the SAP Community.
 *
 * Keeping identity here rather than in each page means a surface cannot drift
 * into looking like the other one, and the routing task cannot be set to
 * something the surface is not allowed to use.
 */

export type AiMode = "library" | "consult";

export interface ModeDef {
  id: AiMode;
  /** Route this surface lives at. */
  href: string;
  title: string;
  /** One line, shown under the title. */
  tagline: string;
  /** The empty-state promise. Must describe what it actually does. */
  promise: string;
  /** Backend routing task. `undefined` lets intent detection choose. */
  task?: string;
  /** Accent used for the header tile and active states. */
  accent: string;
  /** Starter prompts that match what this surface is good at. */
  starters: { label: string; prompt: string }[];
  /** Capability chips, describing real behaviour only. */
  capabilities: string[];
}

export const MODES: Record<AiMode, ModeDef> = {
  library: {
    id: "library",
    href: "/library/ask/",
    title: "שאל את הספרייה",
    tagline: "תשובות מספרי הספרייה בלבד, עם הפניה מדויקת למקור",
    promise: "התשובות נשענות על ספרי ה-SAP שבספרייה בלבד, עם הפניה למקור. כשאין מקור מאומת בספרים, המערכת מציינת זאת במקום לנחש.",
    // Left undefined so diagram intent detection can still pick a visual
    // profile; all of those are grounded, so the promise holds either way.
    task: undefined,
    accent: "#0e7490",
    // Scope-NEUTRAL wording, deliberately. These said "הפרק הזה" / "הסעיף הזה",
    // which is a claim about what the user selected. Ask for a chapter while
    // scoped to subsection 1.2.1 and retrieval correctly serves only 1.2.1,
    // the question goes unanswered, and the grounding gate refuses — so a
    // chip labelled "סכם" returned "לא מצאתי במקורות שנבחרו מידע מספיק" on a
    // section that plainly has text. The scope is already sent with every
    // request; the wording must not contradict it.
    starters: [
      { label: "מחזור חיים של הזמנת תחזוקה", prompt: "מה מחזור החיים של הזמנת תחזוקה?" },
      { label: "הסבר במילים פשוטות", prompt: "הסבר את החומר שנבחר במילים פשוטות" },
      { label: "השווה ECC ל-S/4HANA", prompt: "מה ההבדלים בין ECC ל-S/4HANA לפי הספרים?" },
      { label: "מה החומר מלמד", prompt: "סכם את עיקרי החומר שנבחר" },
    ],
    capabilities: [
      "פתיחת הפרק במקור",
      "פתיחת הספר",
      "הפניה לעמוד ולסעיף",
      "רמת ביסוס לכל תשובה",
      // "מצב לימוד" was listed here and removed. This band describes what the
      // EMPTY STATE offers, and Learning Mode is not reachable from it: its only
      // entry point is the "לימוד" button on a rendered flowchart, which exists
      // only once an answer comes back containing one. Listing it promised the
      // screen could do something it cannot.
    ],
  },

  consult: {
    id: "consult",
    href: "/chat/",
    title: "יועץ SAP",
    tagline: "ארכיטקטורה, יישום, אבחון תקלות ופיתוח",
    promise: "ייעוץ SAP כללי: ארכיטקטורה, יישום, אינטגרציה, ABAP, Fiori, BTP, אבחון תקלות ושיטות עבודה. כשנושא דורש אימות מול המערכת או מקור רשמי, המערכת מציינת זאת.",
    task: "SAP_CONSULT",
    accent: "#7c3aed",
    starters: [
      { label: "אבחון תקלה", prompt: "יש לי תקלה ב-SAP. אילו ראיות צריך כדי לאבחן אותה?" },
      { label: "הסבר ארכיטקטורה", prompt: "הסבר את הארכיטקטורה של אינטגרציה בין SAP למערכת חיצונית" },
      { label: "ECC מול S/4HANA", prompt: "מה השיקולים במעבר מ-ECC ל-S/4HANA?" },
      { label: "שרטט תהליך", prompt: "צייר תרשים זרימה של תהליך רכש מקצה לקצה" },
    ],
    capabilities: [
      "יצירת תרשימים",
      "השוואת ECC ל-S/4HANA",
      "הסבר ארכיטקטורה",
      "אבחון תקלות",
      "שיקולי תכן וחלופות",
      "ABAP · Fiori · BTP",
    ],
  },
};

/** The surface a path belongs to. Defaults to the library, the stricter one. */
export function modeForPath(pathname: string): AiMode {
  return pathname.startsWith("/chat") ? "consult" : "library";
}

/**
 * What the consultant may NOT claim. Rendered as a standing note on that
 * surface, because the difference between "I know this" and "I checked this"
 * is the whole reason the two modes exist.
 */
export const CONSULT_DISCLAIMER =
  "אין גישה חיה ל-SAP Help, ל-SAP Notes או ל-SAP Community. התשובות מבוססות על ידע כללי ויש לאמת מזהים ומספרי Note מול מקור רשמי.";
