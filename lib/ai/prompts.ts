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
export interface AnswerAction { id: string; label: string; task: string; prompt: string; primary?: boolean }

export const ANSWER_ACTIONS: AnswerAction[] = [
  { id: "simple",   label: "הסבר בפשטות",       task: "STUDENT_SUMMARY",  prompt: "הסבר את זה במילים פשוטות, למי שחדש ב-SAP.", primary: true },
  { id: "expand",   label: "הרחב מקצועית",       task: "LONGFORM",         prompt: "הרחב את ההסבר לעומק, ברמה של יועץ מנוסה.",   primary: true },
  { id: "example",  label: "דוגמה מעשית",        task: "SAP_QA",           prompt: "תן דוגמה מעשית מהשטח לנושא הזה.",            primary: true },
  { id: "ecc",      label: "השווה ל-S/4HANA",    task: "COMPARE_ECC_S4",   prompt: "השווה בין ECC ל-S/4HANA בנושא הזה.",         primary: true },
  { id: "checklist",label: "צור צ׳ק ליסט",       task: "STUDY_GUIDE",      prompt: "בנה צ׳ק ליסט מעשי ליישום הנושא." },
  { id: "summary",  label: "סכם את הפרק",        task: "CHAPTER_SUMMARY",  prompt: "סכם את הפרק הנוכחי." },
  { id: "diagram",  label: "צור תרשים",          task: "DIAGRAM",          prompt: "תאר את התהליך כתרשים זרימה שלב אחר שלב." },
  { id: "deck",     label: "צור 2 שקופיות",      task: "PRESENTATION_2",   prompt: "בנה שתי שקופיות שמסבירות את הנושא." },
  { id: "info",     label: "צור אינפוגרפיקה",    task: "INFOGRAPHIC",      prompt: "תאר אינפוגרפיקה שמסבירה את הנושא." },
  { id: "onepage",  label: "סיכום עמוד אחד",     task: "ONEPAGE",          prompt: "סכם את הנושא לעמוד אחד." },
];


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
