// Static UI copy: quick actions and starter questions.
//
// These are prompts the interface offers, not model output, so they live apart
// from anything that talks to the API.
import type { QuickAction } from "./types";

/**
 * Answer-level actions.
 *
 * Each maps to a task profile the backend already defines, so the routing layer
 * picks the right model and quality floor instead of us re-wording a prompt for
 * every button. The prompt text is a nudge; `task` is what actually decides.
 */
export interface AnswerAction {
  id: string;
  label: string;
  /** The backend profile that decides model and quality floor. */
  task: string;
  prompt: string;
  primary?: boolean;
  /**
   * Opens the source instead of asking the model. "פתח מקור" is navigation, not
   * generation, and giving it a `task` would have implied otherwise.
   */
  navigates?: boolean;
}

/* The prompts name their subject ("החומר שנבחר"), never "this" or "the topic".
   The request carries no conversation history, so "הסבר את זה" reached the model
   with nothing for "זה" to refer to, and the researched primary for these classes
   (Haiku) refused exactly that, as the benchmark recorded. Same rule the starter
   chips in ./modes already follow. */
export const ANSWER_ACTIONS: AnswerAction[] = [
  { id: "simple",   label: "הסבר פשוט",         task: "STUDENT_SUMMARY",  prompt: "הסבר את החומר שנבחר במילים פשוטות, למי שחדש ב-SAP.", primary: true },
  { id: "expand",   label: "הרחבה מקצועית",      task: "LONGFORM",         prompt: "הרחב את ההסבר לעומק, ברמה של יועץ מנוסה.",   primary: true },
  { id: "example",  label: "דוגמה מעשית",        task: "SAP_QA",           prompt: "תן דוגמה מעשית מהשטח לחומר שנבחר.",            primary: true },
  { id: "ecc",      label: "השוואה ל-S/4HANA",   task: "COMPARE_ECC_S4",   prompt: "השווה בין ECC ל-S/4HANA בחומר שנבחר.",         primary: true },
  { id: "review",   label: "שאלות חזרה",         task: "QUIZ",             prompt: "נסח שאלות חזרה על החומר: הבנה, מונחים, תהליך ותרחיש. הצג קודם את כל השאלות, ואחריהן את התשובות בנפרד." },
  { id: "checklist",label: "רשימת בדיקה",        task: "STUDY_GUIDE",      prompt: "בנה צ׳ק ליסט מעשי ליישום הנושא. כל שורה חייבת להתחיל בתיבת סימון בפורמט \"- [ ] \", פעולה אחת שניתן לאמת בכל שורה." },
  { id: "summary",  label: "סיכום",              task: "CHAPTER_SUMMARY",  prompt: "סכם את החומר שנבחר: רעיון מרכזי, מושגי מפתח, אובייקטי SAP, שלבי התהליך ומסקנה קצרה." },
  { id: "diagram",  label: "תרשים זרימה",        task: "DIAGRAM",          prompt: "תאר את התהליך כתרשים זרימה שלב אחר שלב." },
  { id: "deck",     label: "תרשים להצגה",        task: "PROCESS_FLOW",     prompt: "הצג את הנושא כתרשים זרימה שאפשר להציג מולו: שלבים ברורים, תוויות קצרות, החלטות מסומנות." },
  { id: "onepage",  label: "סיכום עמוד אחד",     task: "ONEPAGE",          prompt: "סכם את החומר שנבחר לעמוד אחד." },
  { id: "source",   label: "פתיחת המקור",         task: "",                 prompt: "", navigates: true },
];


/**
 * The suggested follow-ups under an answer ("שאלות המשך מוצעות").
 *
 * Three of them ask for exactly what an answer action asks for, so they carry
 * that action's id and route the same way as the button. The rest are plain
 * questions and take the free-question path, where the backend's classifier
 * decides. The visible label is never the routing key: it resolves to an
 * action id here, and the request carries that action's task.
 */
export const FOLLOW_UPS: { label: string; action?: string }[] = [
  { label: "הסבר יותר לעומק", action: "expand" },
  { label: "תן דוגמה מעשית", action: "example" },
  { label: "השווה ל-S/4HANA", action: "ecc" },
  { label: "הצג טרנזקציות קשורות" },
  { label: "הצג טבלאות קשורות" },
  { label: "מהן הטעויות הנפוצות?" },
];

/** Offered under a refusal. Plain questions; none of them changes the scope. */
export const REFUSAL_FOLLOW_UPS = [
  "הרחב את החיפוש לפרק כולו",
  "הרחב את החיפוש לספר כולו",
  "נסח את השאלה במילים אחרות",
  "חפש את הנושא בספר אחר",
];

/** The task a suggested follow-up carries, or undefined for a plain question. */
export function followUpTask(label: string): string | undefined {
  const action = FOLLOW_UPS.find((f) => f.label === label)?.action;
  return action ? ANSWER_ACTIONS.find((a) => a.id === action)?.task : undefined;
}

export const QUICK_ACTIONS: QuickAction[] = [
  { id: "summarize", label: "סיכום הפרק", prompt: "סכם את הפרק הנוכחי בנקודות מרכזיות.", icon: "list", needsScope: true },
  { id: "simple", label: "הסבר בפשטות", prompt: "הסבר את הנושא במילים פשוטות, כאילו אני חדש ב-SAP.", icon: "sparkles" },
  { id: "flow", label: "תרשים זרימה", prompt: "תאר את התהליך כתרשים זרימה שלב אחר שלב.", icon: "workflow" },
  { id: "ecc", label: "השוואה ל-ECC", prompt: "מה השתנה בין SAP ECC לבין S/4HANA בנושא הזה?", icon: "git-compare" },
  { id: "checklist", label: "צ׳ק ליסט", prompt: "בנה צ׳ק ליסט מעשי ליישום הנושא הזה.", icon: "check-square" },
  { id: "interview", label: "שאלות ראיון", prompt: "נסח שאלות ראיון מקצועיות על הנושא הזה, עם תשובות.", icon: "help-circle" },
  { id: "deck", label: "מצגת", prompt: "הצג את הנושא כתרשים זרימה שאפשר להציג מולו: שלבים ברורים ותוויות קצרות.", icon: "presentation" },
];

export const SUGGESTED = [
  "מה ההבדל בין הודעת תחזוקה להזמנת תחזוקה?",
  "אילו טבלאות מרכזיות משמשות בתהליך?",
  "מה השתנה ב-S/4HANA לעומת ECC?",
  "מהם שלבי התהליך מקצה לקצה?",
];


/**
 * The actions offered as soon as a scope is chosen, before any question.
 *
 * A subset of ANSWER_ACTIONS in the order the brief asks for, and the same
 * objects — so an action cannot drift between the two places it appears.
 */
export const SCOPE_ACTION_IDS = ["summary", "simple", "diagram", "ecc", "review", "checklist", "source"] as const;

export const SCOPE_ACTIONS: AnswerAction[] = SCOPE_ACTION_IDS
  .map((id) => ANSWER_ACTIONS.find((a) => a.id === id))
  .filter((a): a is AnswerAction => Boolean(a))
  .map((a) => (a.id === "summary" ? { ...a, label: "סכם", primary: true }
             : a.id === "diagram" ? { ...a, primary: true }
             : a.id === "review" || a.id === "checklist" || a.id === "source" ? { ...a, primary: true }
             : a));
