// Static UI copy: quick actions and starter questions.
//
// These are prompts the interface offers, not model output, so they live apart
// from anything that talks to the API.
import type { QuickAction } from "./types";

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
