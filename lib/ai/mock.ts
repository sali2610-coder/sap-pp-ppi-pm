// Mock answer engine for the UI phase.
//
// Deliberately shaped exactly like /api/ask-v2's response so Phase 2 replaces
// the source without touching a component. It also mocks the states that are
// easy to forget and ugly when they appear in production: a refusal, a partial
// answer, a slow response, and an error.
import type { Answer, Citation, QuickAction, Scope } from "./types";
import { bookById, cachedTree, sectionHref } from "./tree";

export const QUICK_ACTIONS: QuickAction[] = [
  { id: "summarize", label: "סכם את הפרק", prompt: "סכם את הפרק הנוכחי בנקודות מרכזיות.", icon: "list", needsScope: true },
  { id: "simple", label: "הסבר בפשטות", prompt: "הסבר את הנושא במילים פשוטות, כאילו אני חדש ב-SAP.", icon: "sparkles" },
  { id: "flow", label: "תרשים זרימה", prompt: "תאר את התהליך כתרשים זרימה שלב אחר שלב.", icon: "workflow" },
  { id: "ecc", label: "השוואה ל-ECC", prompt: "מה השתנה בין SAP ECC לבין S/4HANA בנושא הזה?", icon: "git-compare" },
  { id: "checklist", label: "צ׳ק ליסט", prompt: "בנה צ׳ק ליסט מעשי ליישום הנושא הזה.", icon: "check-square" },
  { id: "interview", label: "שאלות ראיון", prompt: "נסח שאלות ראיון מקצועיות על הנושא הזה, עם תשובות.", icon: "help-circle" },
  { id: "deck", label: "מצגת", prompt: "בנה שלד למצגת קצרה על הנושא הזה.", icon: "presentation" },
  { id: "infographic", label: "אינפוגרפיקה", prompt: "תאר אינפוגרפיקה שמסבירה את הנושא הזה.", icon: "image" },
];

export const SUGGESTED = [
  "מה ההבדל בין הודעת תחזוקה להזמנת תחזוקה?",
  "אילו טבלאות מרכזיות משמשות בתהליך?",
  "מה השתנה ב-S/4HANA לעומת ECC?",
  "מהם שלבי התהליך מקצה לקצה?",
];

const FOLLOW_UPS = [
  "אילו טרנזקציות רלוונטיות לתהליך הזה?",
  "מה הטבלאות שמאחורי הנתונים האלה?",
  "איך זה משתנה ב-S/4HANA?",
  "מהן הטעויות הנפוצות ביישום?",
  "איך בודקים שהתהליך הוגדר נכון?",
  "מה הקשר לתהליכי הרכש?",
];

const pick = <T,>(arr: T[], n: number, seed: number) => {
  const out: T[] = [];
  for (let i = 0; i < n && i < arr.length; i++) out.push(arr[(seed + i * 3) % arr.length]);
  return out;
};

/** Builds citations from the real tree, so mock answers cite real sections. */
function mockCitations(scope: Scope, seed: number): Citation[] {
  const b = bookById(scope.bookId) ?? bookById("book1");
  if (!b) return [];
  const tree = cachedTree(b.id);
  const chapters = tree?.chapters ?? [];
  const chapter = scope.chapter != null
    ? chapters.find((c) => c.n === scope.chapter) ?? chapters[0]
    : chapters[seed % Math.max(chapters.length, 1)];
  const secs = (chapter?.sections ?? []).slice(0, 12);
  const chosen = pick(secs, Math.min(4, secs.length), seed);
  return chosen.map((s) => ({
    id: `${b.id}#${chapter?.n ?? 1}#${s.id}`,
    book: b.title,
    bookId: b.id,
    chapter: chapter?.n ?? 1,
    section: s.id,
    title: s.t,
    quote: s.en ? s.en.slice(0, 140) : undefined,
    href: sectionHref(b.id, chapter?.n ?? 1, s.id),
  }));
}

const BODY = `הזמנת תחזוקה היא האובייקט התפעולי שבאמצעותו מתכננים, מבצעים ומתמחרים עבודת אחזקה. היא נוצרת ישירות או מתוך הודעת תחזוקה, ומרכזת את הפעולות, כוח האדם, החומרים והעלויות.

**מה ההזמנה מרכזת**
- פעולות (Operations) ומרכזי עבודה
- רכיבים וחומרים הנדרשים לביצוע
- עלויות מתוכננות מול עלויות בפועל
- אובייקט הייחוס הטכני: ציוד או מיקום פונקציונלי

**סדר העבודה המקובל**
1. פתיחת הודעה המתעדת את התקלה או הצורך
2. יצירת הזמנה מתוך ההודעה
3. תכנון פעולות, חומרים ומועדים
4. שחרור ההזמנה לביצוע
5. דיווח ביצוע וסגירה טכנית`;

const REFUSAL = `לא מצאתי במקורות שנבחרו מידע מספיק כדי לענות בביטחון.

הקטעים בפרק שנבחר עוסקים במתודולוגיית פרויקט ולא בהגדרת התהליך עצמו. אפשר להרחיב את ההיקף לספר כולו, או לבחור פרק אחר.`;

let counter = 0;

/** Simulates the backend, including the unhappy paths. */
export async function mockAsk(question: string, scope: Scope): Promise<Answer> {
  const seed = ++counter;
  const delay = 700 + (seed % 4) * 260;
  await new Promise((r) => setTimeout(r, delay));

  // Every 5th answer refuses, so the refusal state is designed, not discovered.
  const refuses = seed % 5 === 0;
  const partial = !refuses && seed % 3 === 0;
  const citations = refuses ? [] : mockCitations(scope, seed);

  return {
    id: `a${seed}`,
    question,
    text: refuses ? REFUSAL : partial ? `${BODY}\n\n## מה לא נמצא בקטעים\nפרטי ההגדרה ברמת ה-Customizing אינם מכוסים בקטעים שנבחרו.` : BODY,
    policy: refuses ? "REFUSE" : partial ? "PARTIAL" : "FULL",
    confidence: refuses ? 0.2 : partial ? 0.68 : 0.93,
    citations,
    followUps: refuses ? pick(FOLLOW_UPS, 3, seed) : pick(FOLLOW_UPS, 5, seed),
    scope,
    model: "mock",
    ms: delay,
  };
}
