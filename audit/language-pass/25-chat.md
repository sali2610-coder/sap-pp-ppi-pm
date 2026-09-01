# Language pass · 25 · Ask the Library + 26 · NEO general chat

Branch: `design/neo-correction-pass` · Scope: route families 25 (`/neo/ai/`, שאל את הספרייה) and 26 (`/neo/chat/`, צ׳אט NEO) · Glossary: `audit/language-pass/GLOSSARY.md`
Files in scope: `app/neo/ai/page.tsx`, `app/neo/chat/page.tsx`, `components/neo-shell/chat/{library-chat, general-chat, composer, context-bar, scope-sheet, sources, message, marks, live, neo-librarian}.tsx`, and user-facing message strings only in `components/neo-shell/chat/{engine, store, use-conversation, scope-context}.ts`.
Method: every string literal, JSX text, `aria-label`, `title=`, `placeholder=`, metadata title/description and status/error/empty constant was inventoried. Code comments, the request body, endpoints, task profiles, prompts sent to the model (`ANSWER_ACTIONS.prompt`, `MODES.*.starters[].prompt`, the `הנושא:` suffix in `use-conversation.runAction`), parsing and citation logic were not touched. Edits are strings only: no JSX structure, class, prop, logic, import, href, number, identifier or `...` spread changed. `./node_modules/.bin/tsc --noEmit` passes after the edits (exit 0). No build, no commit.

Line numbers are post-edit.

## 1. Changed strings

| route/surface | file:line | current text | issue category | final text | evidence/glossary ref | action | risk |
|---|---|---|---|---|---|---|---|
| 25 metadata description | app/neo/ai/page.tsx:24 | `שיחה עם הספרייה הדיגיטלית של NEO. תשובות מבוססות על הספרים בלבד, עם הפניה לפרק ולסעיף.` | inconsistent naming ("הספרייה הדיגיטלית") + scope not stated | `שאלות על ספרי SAP שבספריית Project NEO. התשובות מבוססות על הספרים בלבד, עם הפניה לספר, לפרק ולסעיף.` | A: SAP Books = ספריית SAP; product name Project NEO kept | rewrite | low |
| 26 metadata title | app/neo/chat/page.tsx:22 | `צ'אט NEO · Project NEO` (ASCII apostrophe) | inconsistent with h1 (`צ׳אט NEO`, geresh) and rail label (nav-data.ts:220) | `צ׳אט NEO · Project NEO` | consolidation with general-chat.tsx:100 and pass 01 rail label | consolidate | low |
| 26 metadata description | app/neo/chat/page.tsx:23 | `עוזר SAP כללי בשיחה: ארכיטקטורה, יישום, אינטגרציה ואבחון, עם אמירה מפורשת מה דורש אימות מול המערכת.` | vague ("אבחון", "המערכת") + grounding not stated | `עוזר SAP כללי: ארכיטקטורה, יישום, אינטגרציה ואבחון תקלות. כל תשובה מציינת את רמת הביסוס שלה ומה דורש אימות מול מערכת SAP.` | A: Troubleshooting / Incident; C: errors and grounding stated plainly; matches `message.Grounding` behaviour | rewrite | low |
| 25 hero eyebrow | components/neo-shell/chat/library-chat.tsx:130 | `ספרייה · תשובות מבוססות מקור` | inconsistent naming | `ספריית SAP · תשובות מבוססות מקור` | A: SAP Books = ספריית SAP | rewrite | low |
| 25 hero subtitle (under h1 `שאל את הספרייה`) | library-chat.tsx:134 | `מומחה SAP שקרא את ספרי הפרויקט ועונה רק מתוכם, עם הפניה לספר, לפרק ולסעיף.` | AI persona narration ("מומחה שקרא") | `תשובות מתוך ספרי SAP שבספריית הפרויקט בלבד, עם הפניה לספר, לפרק ולסעיף.` | task rule: subtitle states scope + grounding; C: no design narration | rewrite | low |
| 25 corpus line | library-chat.tsx:143 | `סעיפים באינדקס` | implementation term ("אינדקס") | `סעיפים במאגר` | C: empty/data wording uses "במאגר" | rewrite | low |
| 25 corpus line, empty index | library-chat.tsx:146 | `לא קיים מידע מאומת בפרויקט` | non-standard empty wording | `לא קיים תיעוד מאומת במאגר` | C: `לא קיים תיעוד מאומת במאגר` | rewrite | low |
| 25 composer placeholder + aria-label (same prop) | library-chat.tsx:228 | `שאל שאלה על החומר בספרייה…` | imperative 2nd-person + `…` | `שאלה על תהליך, טרנזקציה או אובייקט SAP מתוך ספרי הספרייה` | task rule: specific professional placeholder; C: no `…`; A: Transaction = טרנזקציה | rewrite | low |
| 25 welcome section aria-label | library-chat.tsx:266 | `פתיחה` | vague landmark name | `מבוא` | consolidation with general-chat.tsx:181 | consolidate | low |
| 25 welcome eyebrow | library-chat.tsx:273 | `ספריית SAP המקצועית` | hype adjective | `ספריית SAP` | C: no superlatives | rewrite | low |
| 25 welcome h2 | library-chat.tsx:275 | `שאל את NEO על הספרייה` | imperative 2nd-person + second product-like name next to the h1 | `שאלות על ספרי SAP שבספרייה` | C: verbal-noun form; page keeps one H1 (`שאל את הספרייה`) | rewrite | low |
| 25 welcome intro | library-chat.tsx:278 | `אני קורא את ספרי ה-SAP שבספרייה ויכול להסביר, לסכם, להשוות, לבנות תרשים ולכוון אותך למקור.` | first-person AI persona + 2nd-person masculine ("אותך") + `ספרי ה-SAP` | `התשובות נכתבות מתוך ספרי SAP שבספרייה: הסבר, סיכום, השוואה, תרשים והפניה למקור המדויק.` | C: no persona narration, no 2nd-person masc.; every listed capability exists in `MODES.library.capabilities` / `ANSWER_ACTIONS` | rewrite | low |
| 25 welcome intro, empty index | library-chat.tsx:279 | `לא קיים מידע מאומת בפרויקט. עד שהאינדקס ייטען אין ממה לענות.` | non-standard empty wording + implementation term | `לא קיים תיעוד מאומת במאגר. ללא ספרים במאגר אין מקור לתשובה.` | C: empty wording | rewrite | low |
| 25 scope button label | library-chat.tsx:293 | `שואל מתוך` | dangling participle fragment | `היקף השאלה` | C: verbal-noun labels | rewrite | low |
| 25 scope button meta (scoped) | library-chat.tsx:298 | `לחיצה תחליף ספר, פרק או סעיף` | UI narration | `בחירת ספר, פרק או סעיף אחר` | C: action labels verbal-noun (בחירת) | rewrite | low |
| 25 scope button meta (empty index) | library-chat.tsx:301 | `האינדקס ריק` | implementation term | `אין ספרים במאגר` | C | rewrite | low |
| 25 quick-actions title | library-chat.tsx:308 | `מה לעשות עם החומר` | conversational fragment | `פעולות על החומר שנבחר` | C | rewrite | low |
| 25 starters title | library-chat.tsx:353 | `אפשר להתחיל מ` | dangling preposition fragment | `שאלות לדוגמה` | C; consolidation with general-chat.tsx:222 | consolidate | low |
| 26 limits panel item | components/neo-shell/chat/general-chat.tsx:59 | `אין חיבור למערכת SAP שלך ואין הרצה של דבר בתוכה` | 2nd-person masculine + colloquial ("של דבר") | `אין חיבור למערכת SAP של הארגון ואין הרצת פעולות בה` | C; fact unchanged (verified in header note: no SAP connection exists) | rewrite | low |
| 26 header eyebrow | general-chat.tsx:98 | `עוזר כללי · אינו משטח הספרייה` | "not X" contrast / defensive | `עוזר SAP כללי · רמת ביסוס בכל תשובה` | C: no "not X but Y"; claim matches `message.Grounding` | rewrite | low |
| 26 composer placeholder + aria-label | general-chat.tsx:168 | `שאל את עוזר NEO על SAP…` | imperative + `…` | `שאלה על טבלה, טרנזקציה או תהליך ב-SAP` | task rule placeholder; C: ASCII hyphen `ב-SAP` | rewrite | low |
| 26 intro section aria-label | general-chat.tsx:181 | `על המשטח הזה` | design jargon ("משטח") | `מבוא` | consolidation | consolidate | low |
| 26 intro paragraph | general-chat.tsx:187-189 | `שיחה כללית על SAP. המשטח הזה אינו מוגבל לספרי הפרויקט ואינו מבטיח ציטוט מהם: כשמצורפים מקורות הם מוצגים תחת התשובה, וכשאין, התשובה מסומנת כידע כללי. לשאלה על החומר שבספרים יש מסך נפרד, «שאל את הספרייה».` | design narration ("המשטח הזה"), double negation, « » quotes | `שיחה כללית על SAP: ארכיטקטורה, יישום, אינטגרציה ואבחון תקלות. התשובות מבוססות על ידע כללי. כאשר נמצאו מקורות בספרייה הם מוצגים מתחת לתשובה, ואחרת התשובה מסומנת כידע כללי. לשאלות על ספרי הספרייה משמש המסך שאל את הספרייה.` | C; product name kept; behaviour matches `message.Grounding` (citations shown when returned, `ידע כללי` otherwise) | rewrite | low |
| 26 capabilities column heading | general-chat.tsx:196 | `מה יש כאן היום` | conversational fragment | `יכולות זמינות` | C | rewrite | low |
| 26 limits column heading | general-chat.tsx:207 | `מה אין כאן` | conversational fragment | `מגבלות` | C | rewrite | low |
| 26 starters title | general-chat.tsx:222 | `אפשר להתחיל מ` | dangling preposition | `שאלות לדוגמה` | consolidation | consolidate | low |
| 25/26 composer stop button aria-label | components/neo-shell/chat/composer.tsx:90 | `עצור את התשובה` | imperative | `עצירת התשובה` | C: verbal-noun | rewrite | low |
| 25/26 composer send button aria-label | composer.tsx:99 | `שלח שאלה` | imperative | `שליחת שאלה` | C: task list (שליחת שאלה) | rewrite | low |
| 26 context bar line | components/neo-shell/chat/context-bar.tsx:56 | `לא נבחרים כאן ספר, פרק או סעיף. רמת הביסוס מצוינת בכל תשובה בנפרד.` | awkward passive | `במסך זה אין בחירת ספר, פרק או סעיף. רמת הביסוס מצוינת בכל תשובה.` | C | rewrite | low |
| 25 context bar label | context-bar.tsx:71 | `התשובה תיענה מתוך` | ungrammatical ("the answer will be answered") | `מקור התשובה` | C | rewrite | low |
| 25 context bar button | context-bar.tsx:118 | `בחר ספר או פרק` / `שנה היקף` | imperative | `בחירת ספר או פרק` / `שינוי היקף` | C: task list (בחירת ספר) | rewrite | low |
| 25 scope sheet close aria-label | components/neo-shell/chat/scope-sheet.tsx:75 | `סגור` | imperative | `סגירה` | C | rewrite | low |
| 25/26 source card state | components/neo-shell/chat/sources.tsx:56 | `הוגש` (for `cited === false`) | unclear term | `לא צוטט` | meaning per engine flag: served with the others, not leaned on; pairs with `צוטט` | rewrite | low |
| 25/26 source card page range | sources.tsx:63 | `עמודים ${from}–${to}` (en dash) | en dash in visible copy | `עמודים ${from}-${to}` | C: ranges keep a hyphen | rewrite | low |
| 25/26 retrieval-score chip title | sources.tsx:69 | `ציון האחזור של הקטע, כפי שהמנוע החזיר` | awkward phrasing | `ציון האחזור של הקטע כפי שהתקבל מהמנוע` | C | rewrite | low |
| 25/26 source card link | sources.tsx:84 | `פתח את הפרק` | imperative | `פתיחת הפרק` | C | rewrite | low |
| 25/26 quote toggle | sources.tsx:96 | `הסתר ציטוט` / `הצג ציטוט` | imperative | `הסתרת הציטוט` / `הצגת הציטוט` | C: task list (הצגת מקורות) | rewrite | low |
| 25/26 stopped-turn note | components/neo-shell/chat/message.tsx:107 | `עצרת את התשובה. לא התקבלה תשובה מלאה ולא נשמר טקסט חלקי.` | 2nd-person masculine; next step missing | `התשובה נעצרה. לא התקבלה תשובה ולא נשמר טקסט חלקי; שאר השיחה נשמרה. אפשר לשלוח את השאלה שוב.` | C: what happened / data affected / next step; behaviour verified in use-conversation (stopped turn keeps thread) | rewrite | low |
| 25/26 stopped-turn retry button | message.tsx:112 | `שאל שוב` | imperative | `שליחת השאלה שוב` | C; consolidation with message.tsx:200 | consolidate | low |
| 25/26 failure detail | message.tsx:131 | `השלב שהושלם: אחזור הקטעים ({passages} קטעים). הכשל אירע בשלב כתיבת התשובה.` | data-affected statement missing | `אחזור הקטעים הושלם ({passages} קטעים); הכשל אירע בשלב כתיבת התשובה. שאר השיחה לא נפגעה.` | C: errors say whether data was affected | rewrite | low |
| 25/26 failure retry button | message.tsx:139 | `נסה שוב` | imperative | `ניסיון חוזר` | C: task list (ניסיון חוזר) | rewrite | low |
| 25/26 refusal with empty text (`policy === "REFUSE" && !a.text`, no error) | message.tsx:152 | `המנוע לא החזיר תשובה עבור השאלה הזו. אפשר לנסח מחדש או להרחיב את ההיקף.` | reads as an engine error; the state is "no verified source" | `לא נמצא מקור מאומת בספרייה לשאלה זו, ולכן לא נכתבה תשובה. שאר השיחה נשמרה. אפשר לנסח את השאלה מחדש או לשאול על נושא ממוקד יותר.` | task rule: REFUSE + empty citations = "no verified source in the library", not an error; C: empty wording | rewrite | medium: string is shared by both surfaces, so it does not mention scope change (see §5) |
| 25/26 diagram-missing note | message.tsx:171 | `ביקשת תרשים, והתשובה חזרה בלי תרשים שניתן לצייר.` | 2nd-person masculine; next step missing | `התבקש תרשים, אך התשובה התקבלה ללא תרשים שניתן להציג. אפשר לבקש שוב בניסוח ממוקד יותר.` | C | rewrite | low |
| 25/26 answer follow-up retry | message.tsx:200 | `שאל שוב` | imperative | `שליחת השאלה שוב` | consolidation | consolidate | low |
| 25/26 grounding status for REFUSE | message.tsx:272 | `לא נמצאה תשובה במקורות` | mislabels the refusal | `לא נמצא מקור מאומת` | task rule: honest no-source semantics; C: `נדרש אימות נוסף` family | rewrite | low |
| 25/26 timing meta | message.tsx:306 | `מילה ראשונה {secs}` | literal token-metric jargon | `תחילת התשובה {secs}` | C; measurement unchanged | rewrite | low |
| 25/26 live draft tag | components/neo-shell/chat/live.tsx:103 | `טיוטה. הטקסט הסופי מוחלף אחרי בדיקת הביסוס.` | fragment | `טיוטה: הטקסט הסופי יוצג לאחר בדיקת הביסוס מול המקורות.` | C; behaviour per lib/ai/stream (draft discarded on gate reject) | rewrite | low |
| 25/26 live phase labels | components/neo-shell/chat/engine.ts:82-86 | `שולח את השאלה…` / `מכין תשובה…` / `כותב תשובה…` / `מאמת את התשובה מול המקורות…` / `מסיים…` | 3rd-person AI narration | `שליחת השאלה…` / `הכנת התשובה…` / `כתיבת התשובה…` / `אימות התשובה מול המקורות…` / `סיום…` | C: verbal-noun; `…` kept (genuine loading state) | rewrite | low |

## 2. Totals

| Reviewed | Kept | Rewritten | Removed | Consolidated |
|---|---|---|---|---|
| 122 | 68 | 47 | 0 | 7 (3 groups: `שאלות לדוגמה` x2, `מבוא` x2, `שליחת השאלה שוב` x2, plus `צ׳אט NEO` title aligned with h1/rail) |

Rewritten + consolidated = 54 strings changed across 11 files:
`app/neo/ai/page.tsx`, `app/neo/chat/page.tsx`, `components/neo-shell/chat/library-chat.tsx`, `general-chat.tsx`, `composer.tsx`, `context-bar.tsx`, `scope-sheet.tsx`, `sources.tsx`, `message.tsx`, `live.tsx`, `engine.ts`.
Untouched (inventoried, nothing user-facing to change): `marks.tsx`, `neo-librarian.tsx`, `store.ts`, `use-conversation.ts`, `scope-context.ts`.

Kept as-is (selection): `Enter לשליחה · Shift+Enter לשורה חדשה`; `מסך הבית` (SmartReturn fallback, shared wording); `שאלה אחת בשיחה` / `N שאלות בשיחה`; `ניקוי השיחה`; `שיחה חדשה`; `עוד פעולות`; `עוזר NEO` / `מומחה הספרים` (speaker names); the three other limits-panel lines in general-chat (each verifiable against the code); `ידע כללי על SAP`; `כל הספרייה`; `לא נבחרו ספר, פרק או סעיף.`; `נשאל בהיקף:`; scope-sheet rows (`כל הפרקים`, `כל הספרים`, `היקף התשובה`, `הפרק כולו`, `הספר כולו`, `טוען את הפרקים…`, `לפרק הזה אין סעיפים במאגר. אפשר לבחור את הפרק כולו.`, `רשימת הפרקים לא נטענה. אפשר לבחור את הספר כולו.`); source card facts (`ישיר/סמוך/תומך`, `עמוד N`, `(משוער)`, `אחזור`, `ציון אחזור`, `מקור אחד` / `N מקורות`); `התשובה לא התקבלה`; `התשובה נקטעה בגלל מגבלת אורך של המנוע. אפשר לבקש המשך או לצמצם את השאלה.`; `מבוסס על המקורות` / `מבוסס חלקית על המקורות`; `ידע כללי · ללא ציטוט ממקור` / `ללא ציטוט ממקור`; `שאלות המשך מוצעות`; `N קטעים נקראו` / `N קטעים נמצאו`; `שנ׳`; scope kinds `ספר` / `פרק` / `סעיף`.

## 3. "מילון" replacements

None. The word `מילון` does not occur in any file of this scope. `מרשם` does not occur either.

## 4. Removed AI-writing signals

- `…` at the end of both composer placeholders (library-chat.tsx:228, general-chat.tsx:168). Loading-state ellipses in engine.ts and scope-sheet.tsx are kept per glossary C.
- En dash in the page range `עמודים 12–15` (sources.tsx:63) replaced with a hyphen.
- First-person AI persona ("אני קורא את ספרי ה-SAP… ולכוון אותך") and "expert who read the books" narration replaced by statements of what the surface does.
- Third-person narration in the live phase labels (`שולח…`, `מכין…`, `כותב…`, `מאמת…`, `מסיים…`) replaced by verbal nouns.
- "Not X" contrast in the general-chat eyebrow (`אינו משטח הספרייה`) and the double negation in its intro paragraph (`אינו מוגבל… ואינו מבטיח…`) removed.
- Design jargon in visible copy (`משטח`, `אינדקס`) removed.
- « » typographic quotes around the product name in the general-chat intro removed.
- Second-person masculine singular (`שלך`, `אותך`, `עצרת`, `ביקשת`, `שאל`, `נסה`, `בחר`, `שנה`, `שלח`, `עצור`, `סגור`, `פתח`, `הצג`, `הסתר`) replaced with impersonal or verbal-noun forms.
- Sparkle icons (`<Sparkles>`, `<WandSparkles>`) next to the starters titles, the "review" quick action and the follow-ups title are lucide components, not text; they are JSX and out of a copy-only pass. Flagged for the design pass.

## 5. Unresolved terminology questions

1. **`NEO AI` vs `צ׳אט NEO`.** The task names route family 26 "NEO AI / General Chat" and lists `NEO AI` as a product name to keep, but the string `NEO AI` appears nowhere in this scope. The h1 (`צ׳אט NEO`), the metadata title, and the rail label consolidated by pass 01 (`nav-data.ts:220`) all say `צ׳אט NEO`. I kept `צ׳אט NEO` so the h1, tab title and rail agree. If the product decision is `NEO AI`, three strings change together: general-chat.tsx:100, app/neo/chat/page.tsx:22, nav-data.ts:220 (the last is outside this scope).
2. **Speaker names.** `מומחה הספרים` (library) and `עוזר NEO` (general) are kept. Both are neutral, but `מומחה` is a mild persona claim; an alternative is `שאל את הספרייה` as the speaker label. Product decision.
3. **Refusal copy is shared by both surfaces.** message.tsx:152 is one string rendered on both `/neo/ai/` and `/neo/chat/`. On the library surface the natural next step is "choose another book or widen to the whole library", which the context bar button (`שינוי היקף`) already offers, but the string itself stays scope-neutral because selecting text by `mode` would be a JSX logic change. If a per-surface variant is wanted, it needs a one-line ternary on the existing `mode` prop.
4. **`מומחה הספרים` vs `ספריית SAP` register.** The hero eyebrow now says `ספריית SAP`; the welcome eyebrow says the same. If the shelf page (`/neo/books/`) settles on a different label after its own pass, align the two eyebrows with it.

## 6. Out-of-scope strings rendered on these surfaces (not edited)

| Rendered where | Source (out of scope) | Text | Note |
|---|---|---|---|
| 25 h1 | lib/ai/modes.ts:44 `MODES.library.title` | `שאל את הספרייה` | product name, correct |
| 26 subtitle under h1 | lib/ai/modes.ts:81 `MODES.consult.tagline` | `ארכיטקטורה, יישום, אבחון תקלות ופיתוח` | acceptable; grounding is stated by the standing note below it |
| 26 standing note | lib/ai/modes.ts:112 `CONSULT_DISCLAIMER` | `אין גישה חיה ל-SAP Help, ל-SAP Notes או ל-SAP Community. התשובות מבוססות על ידע כללי ויש לאמת מזהים ומספרי Note מול מקור רשמי.` | correct and glossary-compliant |
| 25 capability chips | lib/ai/modes.ts:64-68 | `פתיחת הפרק במקור`, `פתיחת הספר`, `הפניה לעמוד ולסעיף`, `רמת ביסוס לכל תשובה` | verbal-noun, compliant |
| 26 capability list | lib/ai/modes.ts:91-97 | `יצירת תרשימים`, `השוואת ECC ל-S/4HANA`, `הסבר ארכיטקטורה`, `אבחון תקלות`, `שיקולי תכן וחלופות`, `ABAP · Fiori · BTP` | compliant |
| 25/26 starter cards (label + the prompt text itself is shown on the card) | lib/ai/modes.ts:58-62, 85-89 | e.g. `השווה ECC ל-S/4HANA` / `שרטט תהליך` (imperative labels); prompts such as `צייר תרשים זרימה של תהליך רכש מקצה לקצה` | labels are imperative (glossary C would prefer `השוואת ECC ל-S/4HANA`, `שרטוט תהליך`); prompts are sent to the model and must not be edited |
| 25 quick actions + 25/26 follow-up actions | lib/ai/prompts.ts:29-39 `ANSWER_ACTIONS[].label` | `הסבר בפשטות`, `הרחב מקצועית`, `דוגמה מעשית`, `השווה ל-S/4HANA`, `שאלות חזרה`, `צור צ׳ק ליסט`, `סכם`, `צור תרשים`, `בנה מצגת`, `סיכום עמוד אחד`, `פתח מקור` | imperative labels; glossary C form would be `הסבר פשוט`, `הרחבה מקצועית`, `השוואה ל-S/4HANA`, `יצירת צ׳ק ליסט`, `סיכום`, `יצירת תרשים`, `בניית מצגת`, `פתיחת מקור`. Label and prompt live in the same object; a lib pass should change `label` only |
| 25 scope label (composer, welcome, hint) | lib/ai/tree.ts:42-48 `scopeLabel` | `כל הספרייה`, `{module} · הספר כולו`, `{module} · פרק N`, `{module} · פרק N · id` | `module` is the book's own field from data/ai-tree; compliant |
| 25 breadth chip | lib/ai/tree.ts:52-55 `scopeBreadth` | `רחב` / `ספר שלם` / `בינוני` / `ממוקד` | acceptable |
| 25/26 error body (`a.error`) | lib/ai/client.ts:39-45 `MSG` | `שירות ה-AI אינו זמין כרגע. אפשר להמשיך להשתמש בספרייה ולנסות שוב בעוד מספר דקות.` / `התשובה לוקחת יותר מדי זמן. נסה לצמצם את ההיקף לפרק או לסעיף מסוים, או לנסות שוב.` / `אין חיבור לרשת. התשובות דורשות חיבור פעיל.` / `אירעה שגיאה זמנית. נסה שוב בעוד רגע.` / `לא התקבלה תשובה. נסה לנסח את השאלה מחדש.` | `timeout`, `generic`, `empty` use imperative 2nd-person (`נסה`); `offline` correctly states that the assistants need a network connection while the rest of the platform is offline, which is the fact the task asks to keep. Recommend a lib pass: `אפשר לצמצם…` / `אפשר לנסות שוב…` / `אפשר לנסח…` |
| 25/26 answer body, inline citation chips, callouts | components/ai/answer-body.tsx | model output + chip labels | shared reader component, not in scope |
| 25 welcome illustration | neo-librarian.tsx:195, 201 | SVG text `NEO`, `SAP PRESS` | decorative, `aria-hidden`; not copy |
| 25/26 SmartReturn button label | components/neo-shell/nav-context | `מסך הבית` passed as fallback from this scope; the actual visible label may come from the nav-context module | fallback string kept to match other surfaces |
