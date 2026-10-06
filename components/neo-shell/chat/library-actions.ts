// Project NEO · the action keys of "שאל את הספרייה", by id.
//
// The label, the prompt and the backend task of each key stay with
// lib/ai/prompts.ANSWER_ACTIONS; this file owns only which of them the side
// panel offers and in what order. test/library-actions.test.ts holds every id
// to ANSWER_ACTIONS, so a renamed action fails a test instead of a key
// silently disappearing from the panel.
export const PRIMARY_IDS = ["simple", "summary", "review", "checklist", "diagram", "ecc"] as const;
export const MORE_IDS = ["expand", "example", "onepage", "deck"] as const;
