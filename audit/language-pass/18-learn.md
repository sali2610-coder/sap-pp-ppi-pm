# Language pass · 18-21 · Learn surfaces (Knowledge, Incidents, Academy, Courses/Lessons/Certification)

Branch: `design/neo-correction-pass`. Scope: UI chrome only in `components/neo-shell/learn/**` and `app/neo/{knowledge,incidents,academy,certification}/**`. Authored knowledge (concept text, incident steps, lesson bodies, exam stems/answers/explanations) untouched. No JSX structure, class, prop, logic, number, identifier or href changed. `./node_modules/.bin/tsc --noEmit`: exit 0, no output.

Route families: 18 Knowledge (`/neo/knowledge/`, `/neo/knowledge/<slug>/`) · 19 Incidents and Troubleshooting (`/neo/incidents/`, `/neo/incidents/<slug>/`) · 20 Academy (`/neo/academy/`) · 21 Courses, chapters and lessons (`/neo/academy/<courseId>/`, `/neo/academy/<courseId>/<slug>/`, `/neo/certification/`, `/neo/certification/exam/`).

## Page H1 decisions

| Route | H1 (final) | Reasoning |
|---|---|---|
| /neo/knowledge/ | מרכז הידע | Glossary A: Knowledge Center = מרכז הידע. Return labels, concept-page eyebrow and metadata aligned. |
| /neo/incidents/ | תקלות ופתרון בעיות | Brief suggested "ניהול תקלות ופתרון בעיות"; validated against content: the surface is a written catalogue, not an incident-management queue (the footer says so), so "ניהול" was dropped. Return labels, incident eyebrow and metadata aligned. |
| /neo/academy/ | SAP Academy | Product name (Glossary D). Replaces "האקדמיה" everywhere in this file set (H1, eyebrows, return labels, metadata). |
| /neo/academy/<courseId>/ · <slug>/ | course title · lesson title | Content, unchanged. |
| /neo/certification/ | הסמכה | Kept to match the rail entry (nav-data, out of scope) and the metadata; the lede now states in one sentence that it is self-assessment and not an SAP certification. See unresolved question 1. |
| /neo/certification/exam/ (setup) | הגדרת המבחן | Was imperative "בחר מאגר ורמה". During the run the H1 is the question stem (content). |

## Table

Categories: T = inaccurate SAP terminology · I = immature tone · V = vague title · N = internal note · D = design narration · F = defensive copy · A = AI-writing signature · H = inconsistent Hebrew · X = translation problem · U = duplicate copy · S = unsupported S/4HANA claim · E = ECC/S4 ambiguity · C = unclear CTA · M = inconsistent naming · L = accessibility-label problem. Actions: keep / rewrite / remove / consolidate. Risk: low unless stated.

### 18 · Knowledge

| route/surface | file:line | current text | issue | final text | evidence / glossary | action | risk |
|---|---|---|---|---|---|---|---|
| /neo/knowledge/ metadata | app/neo/knowledge/page.tsx:23 | מרכז המושגים · Project NEO | M | מרכז הידע · Project NEO | Gloss. A Knowledge Center | rewrite | low |
| /neo/knowledge/ metadata | app/neo/knowledge/page.tsx:24 | מושגי SAP כתובים: הסבר עסקי, הסבר טכני, ההתנהגות ב-ECC וההתנהגות ב-S/4HANA. | V (ignores the 89 work topics) | מרכז הידע של Project NEO: מושגי SAP עם הסבר עסקי, הסבר טכני והשוואה בין ECC ל-S/4HANA, ונושאי עבודה לפי מרכז. | page lists two bodies | rewrite | low |
| /neo/knowledge/<slug>/ metadata | app/neo/knowledge/[slug]/page.tsx:22,26-27 | מושג · Project NEO / `${he} · ${title} · Project NEO` | ok | unchanged | source-assembled | keep | |
| group label | knowledge-data.ts:142 | נתונים ומילון | T (Gloss. B "מילון") | ABAP Dictionary | group holds Object/Table/Structure/Domain/Data Element/CDS View/Number Range/Search Help = ABAP Dictionary objects (data/concepts.ts:18-68) | rewrite | low |
| group label | knowledge-data.ts:145 | אחזקה וייצור | T | תחזוקת מפעל ותכנון ייצור | Gloss. A PM/PP | rewrite | low |
| view tabs | knowledge-surface.tsx:64-66 | כל המושגים / משתנים ב-S/4HANA / ללא שינוי מהותי | S (in the work body "ללא שינוי מהותי" labelled topics with NO documented verdict) · H | כל המושגים / שינוי מתועד ב-S/4HANA / ללא שינוי מתועד | one label serves both bodies (JSX branches only the "all" label); centers `eccS4.changed` always describes a change (data/centers/*.ts), so "שינוי מתועד" is true for both | rewrite | medium: see unresolved Q2 |
| work-topic side panel | knowledge-surface.tsx:103 | לא תועדה הכרעת מעבר לנושא הזה במאגר | H | לא קיים תיעוד מאומת במאגר | Gloss. C empty wording | rewrite | low |
| work-topic status | knowledge-surface.tsx:106 | הכרעת מעבר מתועדת / לא תועדה הכרעה | T | השפעת מעבר מתועדת / ללא תיעוד מעבר | Gloss. A Migration impact = השפעת המעבר | rewrite | low |
| concept row desc/side | knowledge-surface.tsx:126,148 | לא קיים מידע מאומת במאגר | H | לא קיים תיעוד מאומת במאגר | Gloss. C | rewrite | low |
| concept row status | knowledge-surface.tsx:153 | המקור מתאר שינוי / המקור כותב «ללא שינוי» | D (narrates the source) | שינוי לפי התיעוד / ללא שינוי לפי התיעוד | Gloss. C | rewrite | low |
| return label | knowledge-surface.tsx:227 | מרכז ידע | M | מרכז הידע | Gloss. A | rewrite | low |
| return fallback | knowledge-surface.tsx:268 | מסך הבית | ok (13 uses product-wide) | unchanged | consistency | keep | |
| eyebrow | knowledge-surface.tsx:271 | ידע ולמידה | ok (rail group name) | unchanged | nav-data.ts:197 | keep | |
| H1 | knowledge-surface.tsx:272 | מרכז ידע | M | מרכז הידע | Gloss. A | rewrite | low |
| lede | knowledge-surface.tsx:273-278 | … אין כאן רשומה שלא נכתבה במאגר, ואין שדה שהושלם בניחוש. | F · A | {all} רשומות בשני גופי ידע: {concepts} מושגי SAP, לכל אחד הסבר עסקי, הסבר טכני והשוואה בין ECC ל-S/4HANA, ולצידם {centers} נושאי עבודה ב-{families} מרכזים ({sections} מקטעי תוכן). | Gloss. C no defensive copy | rewrite | low |
| stats aria | knowledge-surface.tsx:281 | מספרי המאגר | L (vague) | סיכום מרכז הידע | | rewrite | low |
| stat labels | knowledge-surface.tsx:287,292-295 | עם הכרעת מעבר / מתארים שינוי ב-S/4 / כתוב «ללא שינוי» / דוגמאות מהמאגר / הפניות שנפתרו לעמוד | T · H · N | עם השפעת מעבר מתועדת / שינוי מתועד ב-S/4HANA / ללא שינוי לפי התיעוד / דוגמאות / הפניות מקושרות לעמוד | Gloss. A S/4HANA never "S/4" | rewrite | low |
| stat labels | knowledge-surface.tsx:284-286,290-291 | נושאי עבודה / מרכזים / מקטעי תוכן / מושגים / קבוצות | ok | unchanged | | keep | |
| body tablist aria | knowledge-surface.tsx:309 | גוף ידע | L | גוף הידע | | rewrite | low |
| body tabs | knowledge-surface.tsx:311-312 | מושגים / מרכזי עבודה | ok | unchanged | | keep | |
| search placeholder | knowledge-surface.tsx:336 | נושא · מרכז · מודול · הכרעת מעבר | T | נושא · מרכז · מודול · השפעת מעבר | Gloss. A | rewrite | low |
| search placeholder / aria | knowledge-surface.tsx:336-337 | שם עברי · מונח אנגלי · הסבר · דוגמה / חיפוש נושאי עבודה / חיפוש מושגים | ok | unchanged | | keep | |
| clear button aria | knowledge-surface.tsx:340 | נקה חיפוש | C (imperative) | ניקוי החיפוש | Gloss. C verbal noun | rewrite | low |
| view tablist / facet aria+labels | knowledge-surface.tsx:346,368-369 | תצוגה / סינון לפי מרכז / סינון לפי קבוצה / מרכז / קבוצה | ok | unchanged | | keep | |
| "all" work label | knowledge-surface.tsx:356 | כל הנושאים | ok | unchanged | | keep | |
| count row button | knowledge-surface.tsx:387 | נקה סינון | C | ניקוי הסינון | Gloss. C | rewrite | low |
| empty state title | knowledge-surface.tsx:392 | אין נושא במאגר שעונה על הסינון / אין מושג במאגר שעונה על הסינון | H | לא נמצאו תוצאות התואמות לסינון שנבחר | Gloss. C filter-empty wording | consolidate (2→1) | low |
| empty state help | knowledge-surface.tsx:395-396 | החיפוש עובר על … : ולא על טקסט חופשי. | F ("not X") | החיפוש מכסה את שם הנושא, המונח האנגלי, התקציר, שם המרכז, המודול והשפעת המעבר. / החיפוש מכסה את השם העברי, המונח האנגלי, ההסבר העסקי והטכני, שורות ה-ECC וה-S/4HANA והדוגמאות. | Gloss. C | rewrite | low |
| empty state buttons | knowledge-surface.tsx:399,402 | נקה את הסינון / הצג את כל הנושאים / הצג את כל המושגים | C | ניקוי הסינון / הצגת כל הנושאים / הצגת כל המושגים | Gloss. C | rewrite | low |
| foot rule (work) | knowledge-surface.tsx:418-419 | החלוקה בין «משתנים ב-S/4HANA» ל«ללא שינוי מהותי» נקבעת לפי קיומה של הכרעת מעבר … ואין בכך קביעה שדבר לא השתנה. | F · S | «שינוי מתועד ב-S/4HANA» כולל נושאים שמתועדת בהם השפעת מעבר. נושא ללא תיעוד כזה מוצג תחת «ללא שינוי מתועד»; נדרש אימות נוסף לפני הסקה שהנושא לא השתנה. | Gloss. C "נדרש אימות נוסף" | rewrite | low |
| foot rule (terms) | knowledge-surface.tsx:423-424 | … נספר כלא-משתנה, וכל השאר מוצגים כפי שנכתבו: בלי לקבוע עבורם מה בדיוק השתנה. | F · D | החלוקה נגזרת מניסוח המושג: מושג ששורת ה-S/4HANA שלו נפתחת במילים «ללא שינוי» נספר תחת «ללא שינוי מתועד», וכל מושג אחר תחת «שינוי מתועד ב-S/4HANA». | rule is real (knowledge-data.ts:149) | rewrite | low |
| foot source | knowledge-surface.tsx:428-429 | ידע SAP כתוב, לא נגזר ממערכת חיה. נדרש אימות מול המערכת לפני יישום. | F | תיעוד SAP מאומת, שאינו נקרא ממערכת חיה. נדרש אימות במערכת לפני יישום. | Gloss. B "תיעוד" | rewrite | low |
| foot link lead | knowledge-surface.tsx:433 | אפשר לעיין גם לפי מרכז: | I | עיון לפי מרכז: | Gloss. C | rewrite | low |
| absent value | concept-view.tsx:29 | לא קיים מידע מאומת במאגר | H | לא קיים תיעוד מאומת במאגר | Gloss. C | rewrite | low |
| return fallback / eyebrow | concept-view.tsx:73,76 | מרכז המושגים | M | מרכז הידע | Gloss. A | rewrite | low |
| status | concept-view.tsx:88 | המקור מתאר שינוי ב-S/4HANA / המקור כותב «ללא שינוי מהותי» | D · H | שינוי מתועד ב-S/4HANA / ללא שינוי לפי התיעוד | | rewrite | low |
| S/4HANA headline | concept-view.tsx:98 | המושג הזה משתנה במעבר ל-S/4HANA / המושג הזה נשאר כפי שהוא ב-S/4HANA | S (the "unchanged" branch asserted more than the source) | המושג משתנה במעבר ל-S/4HANA / המושג ללא שינוי ב-S/4HANA לפי התיעוד | Gloss. C never upgrade a status | rewrite | low |
| column labels | concept-view.tsx:103,107 | ECC 6.0 / S/4HANA | ok | unchanged | Gloss. A | keep | |
| absent "what" values | concept-view.tsx:104,108,120,129,150,166 | התנהגות ב-ECC / התנהגות ב-S/4HANA / הסבר עסקי / הסבר טכני / דוגמאות / מושגים קשורים | ok | unchanged | | keep | |
| section h2 | concept-view.tsx:117 | מה זה, במונחים עסקיים | I · V | הסבר עסקי | matches data field `biz` | rewrite | low |
| section h2 | concept-view.tsx:126 | איך זה בנוי, טכנית | I · V | הסבר טכני | matches data field `tech` | rewrite | low |
| section h2 | concept-view.tsx:136 | דוגמאות מהמאגר | N | דוגמאות | | rewrite | low |
| examples note | concept-view.tsx:142-143 | דוגמה שמזוהה כטבלה במילון או כטרנזקציה במרשם … מוצגת כערך ולא כקישור. | T (מילון, מרשם) · F | דוגמה שמזוהה כטבלת SAP או כטרנזקציה בקטלוג נפתחת לעמוד שלה. דוגמה אחרת (אלמנט נתונים, מודול פונקציה, תבנית) מוצגת כערך ללא קישור. | Gloss. B | rewrite | low |
| section h2 | concept-view.tsx:158 | מושגים קשורים | ok | unchanged | | keep | |
| foot source | concept-view.tsx:174-175 | ידע SAP כתוב. אינו נגזר ממערכת חיה ואינו תחליף לאימות מול המערכת לפני יישום. | F | תיעוד SAP מאומת, שאינו נקרא ממערכת חיה. נדרש אימות במערכת לפני יישום. | Gloss. B/C | rewrite | low |
| foot links | concept-view.tsx:179-180 | … נפתרו לעמוד קיים בפרויקט; השאר מוצגות כערך, כי אין להן עמוד ולא הומצא להן אחד. | F · A | {linked} מתוך {n} ההפניות של המושג מקושרות לעמוד בפרויקט; השאר מוצגות כערך. | Gloss. C | rewrite | low |

### 19 · Incidents and Troubleshooting

| route/surface | file:line | current text | issue | final text | evidence / glossary | action | risk |
|---|---|---|---|---|---|---|---|
| metadata | app/neo/incidents/page.tsx:17-18 | קטלוג התקלות · Project NEO / תקלות SAP מתועדות ב-PM / PP / PP-PI / QM: … | M | תקלות ופתרון בעיות · Project NEO / קטלוג תקלות SAP מתועדות ב-PM, PP, PP-PI ו-QM: סימפטום, סיבות שורש, אבחון, צעדי תיקון ומניעה. | H1 decision | rewrite | low |
| metadata fallback | app/neo/incidents/[slug]/page.tsx:21 | תקלה · Project NEO | ok | unchanged | Gloss. A Incident | keep | |
| module labels | incidents-data.ts:96-100 | אחזקה / ייצור / ייצור תהליכי / איכות / חוצה-מודולים | T | תחזוקת מפעל / תכנון ייצור / תעשיות תהליכיות / ניהול איכות / חוצה-מודולים | Gloss. A | rewrite | low |
| impact labels | incidents-data.ts:131-140, incident-view.tsx:32-41 | חוסם עבודה / סיכון ברישום כספי / השפעה כספית / אי-עקביות נתונים / פגיעה חלקית / משתמש בודד / רעש ניטור / ניטור | ok (record's own tag, translated) | unchanged | | keep | |
| untagged facet | incidents-data.ts:215 | לא תויג במקור | D | ללא תג השפעה | | rewrite | low |
| view tabs | incidents-surface.tsx:51-53 | כל הקטלוג / מפרידות ECC ↔ S/4HANA / עם צעדי מניעה | H (↔ glyph, "מפרידות") | כל הקטלוג / עם הבחנה בין ECC ל-S/4HANA / עם צעדי מניעה | Gloss. C arrows only in flow notation | rewrite | low |
| row symptom/side fallback | incidents-surface.tsx:79,141 | לא קיים מידע מאומת במאגר | H | לא קיים תיעוד מאומת במאגר | Gloss. C | rewrite | low |
| row sr labels / side labels | incidents-surface.tsx:94-115,125-135 | סיבות שורש / טרנזקציות אבחון / טבלאות לבדיקה / צעדי תיקון / S/4HANA / הודעת השגיאה / סיבת שורש ראשונה | ok | unchanged | | keep | |
| return label | incidents-surface.tsx:198 | קטלוג התקלות | M | תקלות ופתרון בעיות | H1 decision | rewrite | low |
| H1 | incidents-surface.tsx:245 | קטלוג התקלות | M | תקלות ופתרון בעיות | Gloss. A Incident/Troubleshooting | rewrite | low |
| lede | incidents-surface.tsx:247-248 | {n} תקלות מתועדות … כל שורה נפתחת לרשומה המלאה שלה. | ok-ish, tightened | קטלוג של {n} תקלות מתועדות ב-{m} מודולים: … כל תקלה נפתחת לרשומה המלאה. | | rewrite | low |
| stats aria | incidents-surface.tsx:252 | מספרי הקטלוג | L | סיכום הקטלוג | | rewrite | low |
| stat label | incidents-surface.tsx:259 | מפרידות ECC ↔ S/4 | H · T | עם הבחנה בין ECC ל-S/4HANA | Gloss. A | rewrite | low |
| stat labels | incidents-surface.tsx:254-258 | תקלות בקטלוג / טרנזקציות אבחון / טבלאות לבדיקה / עם צעדי תיקון / עם צעדי מניעה | ok | unchanged | | keep | |
| search placeholder / aria | incidents-surface.tsx:276-277 | סימפטום · הודעת שגיאה · טרנזקציה (COGI) · טבלה (AFFW) / חיפוש תקלות | ok (COGI, AFFW real identifiers) | unchanged | | keep | |
| clear aria | incidents-surface.tsx:280 | נקה חיפוש | C | ניקוי החיפוש | Gloss. C | rewrite | low |
| facets aria/labels | incidents-surface.tsx:286,308-309,323-324 | תצוגה / סינון לפי מודול / מודול / סינון לפי השפעה עסקית / השפעה | ok | unchanged | | keep | |
| count row button | incidents-surface.tsx:342 | נקה סינון | C | ניקוי הסינון | Gloss. C | rewrite | low |
| empty state | incidents-surface.tsx:347-354 | אין תקלה בקטלוג שעונה על הסינון / החיפוש עובר על … : ולא על טקסט חופשי. / נקה את הסינון / הצג את כל הקטלוג | H · F · C | לא נמצאו תוצאות התואמות לסינון שנבחר / החיפוש מכסה את הכותרת, הסימפטום, הודעת השגיאה, סיבות השורש, צעדי התיקון והמניעה, וקודי הטרנזקציות והטבלאות שברשומה. / ניקוי הסינון / הצגת כל הקטלוג | Gloss. C | rewrite | low |
| paging button | incidents-surface.tsx:367-368 | הצג עוד {n} · נותרו {n} | C | הצגת עוד {n} · נותרו {n} | Gloss. C | rewrite | low |
| foot impact note | incidents-surface.tsx:377-378 | תווית ההשפעה היא התג שהרשומה עצמה נושאת: היא לא חושבה כאן ולא דורגה מחדש. {n} רשומות אינן נושאות תג, והן מסומנות «לא תויג במקור». | F · D | תווית ההשפעה נלקחת מהרשומה כפי שתועדה. {n} רשומות ללא תג מסומנות «ללא תג השפעה». | | rewrite | low |
| foot source | incidents-surface.tsx:381-382 | ידע תמיכה כתוב. אינו תור תמיכה חי, אינו מחובר למערכת SAP, ואינו כולל מספרי SAP Note: רק מילות חיפוש לאיתורם. | F (triple "not") | תיעוד פתרון בעיות מאומת, שאינו מחובר למערכת SAP. הרשומות כוללות מילות חיפוש ל-SAP Notes, ללא מספרי Note. | Gloss. A Troubleshooting | rewrite | low |
| absent value | incident-view.tsx:30 | לא קיים מידע מאומת במאגר | H | לא קיים תיעוד מאומת במאגר | Gloss. C | rewrite | low |
| return fallback / eyebrow | incident-view.tsx:103,107 | קטלוג התקלות | M | תקלות ופתרון בעיות | H1 decision | rewrite | low |
| untagged status | incident-view.tsx:123 | השפעה לא תויגה במקור | D | ללא תג השפעה | matches facet | rewrite | low |
| S/4HANA plate h2 | incident-view.tsx:136 | התקלה הזו מתנהגת אחרת ב-ECC ו-ב-S/4HANA | S (separate lines do not prove different behaviour) · X ("ו-ב-") | התנהגות התקלה ב-ECC וב-S/4HANA | Gloss. C never upgrade a status | rewrite | low |
| no-split section | incident-view.tsx:153-158 | ECC ↔ S/4HANA / הפרדה בין התנהגות ב-ECC לבין S/4HANA ברשומה הזו / הרשומה נכתבה בלי להפריד בין הגרסאות. אין להסיק מכך שההתנהגות זהה: יש לאמת מול המערכת. | H · F | ECC ו-S/4HANA / הבחנה בין ECC ל-S/4HANA / הרשומה אינה מבחינה בין הגרסאות. נדרש אימות נוסף במערכת לפני הסקה שההתנהגות זהה. | Gloss. C | rewrite | low |
| symptom h2 / labels | incident-view.tsx:167,173,179 | מה המשתמש רואה / הודעת השגיאה, כפי שנרשמה / שורש טכני | I · V | סימפטום / הודעת השגיאה / סיבת שורש טכנית | | rewrite | low |
| causes h2 | incident-view.tsx:190 | סיבות שורש אפשריות | ok | unchanged | | keep | |
| diagnose h2 / labels | incident-view.tsx:204,210,228,235 | איך מאבחנים / טרנזקציות לניתוח / נקודות כניסה לניתוח / Breakpoints קונקרטיים | I · M ("לניתוח" vs "אבחון" in list) | אבחון / טרנזקציות לאבחון / נקודות כניסה ל-Debug / Breakpoints | | rewrite | low |
| diagnose label | incident-view.tsx:219 | טבלאות לבדיקה | ok | unchanged | | keep | |
| hooks h2 / labels | incident-view.tsx:247,252,260 | הרחבות וממשקים מעורבים / Exits · BAdIs / Function Modules · BAPIs | T | הרחבות וממשקים / User Exits · BAdIs / BAPI ו-FM | Gloss. A pair `BAPI ו-FM`, User Exit | rewrite | low |
| fix / prevent / scenario h2 | incident-view.tsx:274,288,302 | התיקון, לפי הסדר / איך מונעים שזה יחזור / איך זה נראה בארגון | I · V | צעדי התיקון / צעדי מניעה / תרחיש לדוגמה | | rewrite | low |
| notes h2 / help / absent | incident-view.tsx:313,319-320,327 | איתור SAP Note / מילות חיפוש בלבד. הפרויקט אינו שומר מספרי SAP Note ואינו ממציא אותם: … / מילות חיפוש ל-SAP Note ברשומה הזו | F · A | איתור SAP Notes / מילות חיפוש ל-SAP for Me. הקטלוג אינו כולל מספרי SAP Note; יש לאמת את ה-Note שנמצא לפני יישום. / מילות חיפוש ל-SAP Notes | never invent Note numbers (kept as a positive statement) | rewrite | low |
| foot source | incident-view.tsx:335-336 | ידע תמיכה כתוב, לא בדיקה חיה במערכת SAP ולא תור תמיכה. כל צעד טעון אימות בסביבה לפני ביצוע בייצור. | F | תיעוד פתרון בעיות מאומת, שאינו בדיקה חיה במערכת SAP. כל צעד טעון אימות בסביבת בדיקות לפני ביצוע בייצור. | | rewrite | low |
| foot links | incident-view.tsx:341-342 | … נפתרו לעמוד קיים בפרויקט; השאר מוצגים כערך, כי אין להם עמוד ולא הומצא להם אחד. | F · A | {linked} מתוך {n} הקודים ברשומה מקושרים לעמוד בפרויקט; השאר מוצגים כערך. | | rewrite | low |

### 20 · Academy

| route/surface | file:line | current text | issue | final text | evidence / glossary | action | risk |
|---|---|---|---|---|---|---|---|
| metadata | app/neo/academy/page.tsx:16-17 | האקדמיה · Project NEO / מסלולי הלמידה הכתובים של האקדמיה: פרקים, שיעורים, רמה ואורך מוצהר. | M | SAP Academy · Project NEO / מסלולי הלמידה של SAP Academy: קורסים, פרקים ושיעורים לפי מודול, עם רמה ואורך מוצהרים. | Gloss. D product name; A Learning path | rewrite | low |
| module names (eyebrows) | mod.ts:52-62 | אחזקה / אחזקה · משתמש / ייצור / ייצור תהליכי / תכנון מתקדם / איכות / רכש / מחסן / מחסן / תכנון מכירות ותפעול / חוצה-מודולים | T | תחזוקת מפעל / תחזוקת מפעל · משתמש / תכנון ייצור / תעשיות תהליכיות / תכנון ותזמון מפורט / ניהול איכות / ניהול חומרים / ניהול מחסן / ניהול מחסן מורחב / (kept) / (kept) | Gloss. A; PP-DS, QM, MM, WM, EWM not in glossary: see unresolved Q4 | rewrite | medium (non-glossary modules) |
| course card bar label | academy-surface.tsx:90 | התקדמות שלך | H | התקדמות | | rewrite | low |
| course card idle | academy-surface.tsx:99 | עדיין לא נפתח במכשיר הזה: אין התקדמות להציג, ולא מוצג סרגל ריק במקומה. | D · F | לא נרשמה התקדמות במכשיר הזה. | Gloss. C no design narration | rewrite | low |
| course card signpost | academy-surface.tsx:106 | פתח את הקורס | C | פתיחת הקורס | Gloss. C | rewrite | low |
| card labels | academy-surface.tsx:66,75-78,83 | הושלם / פרקים / שיעורים / יחידות תוכן / אורך מוצהר / level chips | ok | unchanged | | keep | |
| return label | academy-surface.tsx:143 | האקדמיה | M | SAP Academy | Gloss. D | rewrite | low |
| H1 | academy-surface.tsx:154 | האקדמיה | M | SAP Academy | Gloss. D | rewrite | low |
| lede | academy-surface.tsx:156-157 | {n} קורסים כתובים, … כל מספר כאן נספר מתוך התוכן עצמו; ההתקדמות שמוצגת היא ההתקדמות שנרשמה במכשיר הזה בלבד. | F | מסלולי הלמידה של הפרויקט: {n} קורסים, {n} פרקים ו-{n} שיעורים. ההתקדמות המוצגת היא זו שנרשמה במכשיר הזה. | Gloss. A מסלול למידה | rewrite | low |
| continue card aria / eyebrow | academy-surface.tsx:166,170 | המשך מהמקום שעצרת | H (2nd-person masc.) | המשך מהנקודה האחרונה | Gloss. C | rewrite | low |
| continue card sub | academy-surface.tsx:173 | {chapter} · שיעור {n} מתוך {m} בפרק | ok | unchanged | | keep | |
| continue origin label | academy-surface.tsx:192 | האקדמיה | M | SAP Academy | | rewrite | low |
| continue buttons | academy-surface.tsx:195,198 | המשך את השיעור / כל הקורס | C | המשך השיעור / הצגת הקורס | Gloss. C | rewrite | low |
| stats aria / label | academy-surface.tsx:205,209 | מספרי האקדמיה / שיעורים כתובים | L · N | סיכום SAP Academy / שיעורים | | rewrite | low |
| stat labels | academy-surface.tsx:207-212 | קורסים / פרקים / יחידות תוכן / אורך מוצהר / רמות | ok | unchanged | | keep | |
| search placeholder / aria | academy-surface.tsx:231-232 | שם קורס · שם פרק · שם שיעור / חיפוש בקורסים | ok | unchanged | | keep | |
| clear aria | academy-surface.tsx:235 | נקה חיפוש | C | ניקוי החיפוש | Gloss. C | rewrite | low |
| facet aria / label | academy-surface.tsx:243-244 | סינון לפי רמה / רמה | ok | unchanged | | keep | |
| count row button | academy-surface.tsx:262 | נקה סינון | C | ניקוי הסינון | | rewrite | low |
| empty state | academy-surface.tsx:267-272 | אין קורס שעונה על הסינון / החיפוש עובר על … בלבד: הוא אינו מחפש בתוך גוף השיעור. / נקה את הסינון | H · F · C | לא נמצאו תוצאות התואמות לסינון שנבחר / החיפוש מכסה את שמות הקורסים, הפרקים והשיעורים, ולא את תוכן השיעורים. / ניקוי הסינון | Gloss. C | rewrite | low |
| foot | academy-surface.tsx:283-287 | «אורך מוצהר» ו«רמה» הם השדות שהקורס עצמו כותב לכל שיעור, לא הערכה שנעשתה כאן. … / התקדמות נשמרת מקומית במכשיר (neo:academy:v2) ואינה מסונכרנת לשום שרת. | F | «אורך מוצהר» ו«רמה» הם השדות שהקורס מגדיר לכל שיעור. «יחידות תוכן» הוא מספר יחידות התוכן שהשיעור דורש להשלמה. / ההתקדמות נשמרת במכשיר בלבד (neo:academy:v2) ואינה מסונכרנת. | | rewrite | low |
| hoursHe units | academy-surface.tsx:43-46, course-view.tsx:50-53 | דק׳ / שע׳ | ok | unchanged | | keep | |

### 21 · Courses, chapters, lessons, certification

| route/surface | file:line | current text | issue | final text | evidence / glossary | action | risk |
|---|---|---|---|---|---|---|---|
| course metadata | app/neo/academy/[courseId]/page.tsx:21,23-24 | קורס · Project NEO / `${title} · ${module} · Project NEO` / `${title}: {n} פרקים, {n} שיעורים.` | ok | unchanged | | keep | |
| lesson metadata | app/neo/academy/[courseId]/[slug]/page.tsx:39,41-42 | שיעור · Project NEO / … / `${title}: פרק {n}, {chapter}.` | ok | unchanged | | keep | |
| return fallback / eyebrow | course-view.tsx:95,99 | האקדמיה | M | SAP Academy | Gloss. D | rewrite | low |
| leaving label | course-view.tsx:83 | קורס | ok | unchanged | | keep | |
| header chips / status | course-view.tsx:109-114 | פרקים / שיעורים / יחידות תוכן / הקורס הושלם | ok | unchanged | | keep | |
| progress eyebrow | course-view.tsx:122 | ההתקדמות שלך | H | התקדמות | | rewrite | low |
| progress headline | course-view.tsx:125-128 | סיימת את כל השיעורים הכתובים בקורס / … / עוד לא נרשמה התקדמות בקורס הזה במכשיר הזה | H (2nd person) · I | כל השיעורים בקורס הושלמו / (kept) / לא נרשמה התקדמות בקורס במכשיר הזה | Gloss. C | rewrite | low |
| bar label | course-view.tsx:135 | {n} יחידות תוכן נצפו | M (lesson view says נקראו) | {n} יחידות תוכן נקראו | consistency with lesson-view | rewrite | low |
| no-progress help | course-view.tsx:144-145 | התקדמות נרשמת רק כשקוראים שיעור בפועל … ולכן לא מוצג סרגל ריק שמתחזה למדידה. | D · F | ההתקדמות נרשמת בעת קריאת שיעור ונשמרת במכשיר בלבד. | Gloss. C | rewrite | low |
| primary CTA | course-view.tsx:153 | המשך מהשיעור הבא / התחל מהשיעור הראשון | C | המשך לשיעור הבא / התחלה מהשיעור הראשון | brief: המשך לשיעור הבא | rewrite | low |
| chapters h2 / chips / status | course-view.tsx:163-186 | מבנה הקורס / {n} פרקים / {n} שיעורים / הפרק הושלם / {a} / {b} הושלמו | ok | unchanged | | keep | |
| unauthored lesson chip | course-view.tsx:203 | לא קיים מידע מאומת במאגר | X (a lesson is not "documentation") | השיעור טרם נכתב | data: `hasLesson=false` = no authored body | rewrite | low |
| lesson row chips | course-view.tsx:200-207 | level / {n} דק׳ / הושלם | ok | unchanged | | keep | |
| foot | course-view.tsx:242-256 | מקור המבנה: מסלולי הלמידה הכתובים של האקדמיה … / שיעור נחשב מושלם כשמספר יחידות התוכן שנצפו בו … / שיעור נפתח כאן בתוך Project NEO (/neo/academy/{id}/…), אותו שיעור, אותו מנוע בלוקים ואותה מדידה. מסך האקדמיה הקיים, /academy/, ממשיך לפעול ללא שינוי … | D · N · "…" glyph | מקור המבנה: מסלולי הלמידה של SAP Academy (lib/academy/model.ts). אורך ורמה הם שדות שהמסלול מגדיר לכל שיעור. / שיעור נחשב מושלם כשכל יחידות התוכן שהוא דורש נקראו. ההתקדמות נשמרת במכשיר בלבד (neo:academy:v2) ואינה מסונכרנת. / השיעורים נפתחים בתוך Project NEO (/neo/academy/{id}/). אותו שיעור זמין גם במסך הלמידה הקודם, /academy/, וההתקדמות משותפת לשני המסכים. | Gloss. C no "…", no design narration; Link kept | rewrite | low |
| block-kind labels | lesson-view.tsx:61-85 | למה זה חשוב / טבלאות / אפליקציות Fiori / אובייקטים · BAPI / FM / CDS / הערות / פתרון תקלות / טיפים / בחן את עצמך | I · T · C | מדוע זה חשוב / טבלאות SAP / יישומי Fiori / BAPI, FM ו-CDS / SAP Notes / פתרון בעיות / טיפים ליישום / שאלות חזרה | Gloss. A (Fiori app, SAP Table, Troubleshooting); `notes` block = SAP Notes per lib/academy/lesson-types.ts:71; verbal noun | rewrite | low |
| block-kind labels kept | lesson-view.tsx | מטרת השיעור / ערך עסקי / היכן בשימוש / מושגי מפתח / דוגמה מ-CBC / התהליך / תרשים / טרנזקציות / קונפיגורציה · SPRO / שירותי OData / הרשאות / טעויות נפוצות / שיטות עבודה מומלצות / נושאים קשורים / סיכום | ok | unchanged | authored `b.title` overrides these when present | keep | |
| trust labels | lesson-view.tsx:100-103 | מאומת מול תיעוד / מאומת במערכת / ידע אצור / דורש בדיקה | H | (kept) / (kept) / תוכן ערוך / נדרש אימות נוסף | Gloss. C uncertain wording | rewrite | low |
| table header | lesson-view.tsx:195 | טבלה / תיאור | T (bare "טבלה" in a heading) | טבלת SAP / תיאור | Gloss. A | rewrite | low |
| trust title attr | lesson-view.tsx:279 | נבדק {date} | V | נבדק לאחרונה {date} | | rewrite | low |
| read status | lesson-view.tsx:286 | נקרא | ok | unchanged | | keep | |
| step eyebrows | lesson-view.tsx:303 | פרק קודם / הפרק הבא / השיעור הקודם / השיעור הבא | H (article inconsistency) | הפרק הקודם / הפרק הבא / השיעור הקודם / השיעור הבא | | rewrite | low |
| return fallback | lesson-view.tsx:351 | קורס · {title} | ok | unchanged | | keep | |
| eyebrow | lesson-view.tsx:356-358 | האקדמיה · {module} · פרק {n} · {chapter} | M | SAP Academy · {module} · פרק {n} · {chapter} | Gloss. D | rewrite | low |
| header chips | lesson-view.tsx:366-368 | {level} / {n} דק׳ מוצהרות / {n} יחידות תוכן | H | (kept) / {n} דק׳ (אורך מוצהר) / (kept) | consistency with "אורך מוצהר" | rewrite | low |
| progress eyebrow / headline | lesson-view.tsx:380-386 | ההתקדמות בשיעור / כל יחידות התוכן בשיעור נקראו / {a} מתוך {b} יחידות תוכן נקראו / השיעור עוד לא נקרא במכשיר הזה | I (last) | (kept ×3) / לא נרשמה קריאה של השיעור במכשיר הזה | | rewrite | low |
| bar label | lesson-view.tsx:392 | שיעור {n} מתוך {m} בפרק | ok | unchanged | | keep | |
| no-progress help | lesson-view.tsx:401-402 | יחידת תוכן נספרת כשהיא באמת עוברת מול העין. עד אז אין מה למדוד: ולכן לא מוצג סרגל ריק במקומה. המדידה נשמרת מקומית ב-neo:academy:v2, אותו מפתח שהאקדמיה עצמה כותבת אליו. | D · F · I | יחידת תוכן נספרת כשהיא מוצגת במסך. ההתקדמות נשמרת במכשיר בלבד (neo:academy:v2). | Gloss. C | rewrite | low |
| empty lesson | lesson-view.tsx:410 | לשיעור הזה אין יחידות תוכן בנתוני האקדמיה. זהו מצב אמיתי במאגר ולא תקלה, ולכן לא הומצא כאן תוכן. | F · A | לשיעור זה אין יחידות תוכן במאגר השיעורים. | Gloss. C | rewrite | low |
| stepping nav aria / ends | lesson-view.tsx:421-427 | מעבר בין שיעורים / זהו השיעור הראשון בקורס. / זהו השיעור האחרון בקורס. | ok | unchanged | | keep | |
| course link | lesson-view.tsx:425 | כל הקורס · שיעור {i} מתוך {n} | C | חזרה לקורס · שיעור {i} מתוך {n} | brief: חזרה לקורס | rewrite | low |
| foot | lesson-view.tsx:434-444 | גוף השיעור נקרא ממאגר השיעורים של האקדמיה (…) ומוצג כאן ללא שינוי. סדר היחידות הוא הסדר של מנוע הבלוקים עצמו. / אותו שיעור מוגש גם במסך האקדמיה הקיים של הפרויקט, <link>, שלא שונה. ההתקדמות משותפת לשני המסכים כי היא נשמרת באותו מפתח. | D · N | מקור: מאגר השיעורים של SAP Academy (data/academy/lessons). התוכן מוצג כפי שנכתב. / אותו שיעור זמין גם במסך הלמידה הקודם, <link>, וההתקדמות משותפת לשני המסכים. | Link kept | rewrite | low |
| cert metadata | app/neo/certification/page.tsx:18 | מנגנון ההערכה העצמית של הפרויקט: מה נמדד, מה לא, ומה הוא אינו מתיימר להיות. | F · A | הערכת ידע עצמית על בסיס התיעוד המאומת של הפרויקט: מאגרי שאלות, רמות קושי ותוצאות שנשמרות במכשיר. אינה הסמכה רשמית של SAP. | | rewrite | low |
| exam metadata | app/neo/certification/exam/page.tsx:16-17 | הערכת ידע · Project NEO / הערכה מתוך התיעוד המאומת … | ok | unchanged | | keep | |
| bank labels | cert-data.ts:60-62 | אחזקת מפעל / ייצור תהליכי / ליבת ייצור · כל טבלאות ה-PM במילון הפרויקט / … / תת-קבוצת ליבת הייצור מתוך טבלאות ה-PP-PI | T (Gloss. A + B "מילון") | תחזוקת מפעל / תעשיות תהליכיות / תכנון ייצור · כל טבלאות ה-PM בקטלוג הטבלאות של הפרויקט / כל טבלאות ה-PP-PI בקטלוג הטבלאות של הפרויקט / תת-קבוצה של טבלאות הליבה של PP מתוך טבלאות ה-PP-PI | | rewrite | low |
| cert H1 / eyebrow | cert-surface.tsx:73-74 | ידע ולמידה / הסמכה | see H1 decisions | unchanged | | keep | see Q1 |
| cert lede | cert-surface.tsx:76-78 | לפרויקט אין תוכנית הסמכה רשמית של SAP, ולכן העמוד הזה אינו מציג אחת. מה שכן קיים כאן הוא … {n} טבלאות במילון … | F · T | הערכת ידע עצמית על בסיס התיעוד המאומת של הפרויקט: {q} שאלות שנגזרות מ-{t} טבלאות SAP מתועדות, מקשרי ה-ER שלהן, ממפת השפעת המעבר ל-S/4HANA ומקטלוג התקלות. זו אינה תוכנית הסמכה רשמית של SAP. | disclaimer kept as one positive sentence (required to avoid an unsupported claim) | rewrite | low |
| claim section | cert-surface.tsx:84-88 | ההצהרה / מה נמדד כאן, ומה לא / ההבחנה הזו חשובה יותר מכל ציון: מנגנון פנימי שבודק שליטה במילון הנתונים … ולא נכון להציג אותו כאילו הוא כזו. | A · F · T | היקף ההערכה / מה נמדד ומה אינו נמדד / ההערכה בודקת שליטה במודל הנתונים המתועד של הפרויקט. היא אינה הסמכה רשמית של SAP ואינה תחליף לה. | Gloss. B Data model | rewrite | low |
| claim lists | cert-surface.tsx:92-109 | קיים בפרויקט, ונמדד / … מהמילון המאומת: מטרת הטבלה … / … ולא מנוסח מבחן. / שאלות פתרון תקלות … מקטלוג התקלות עצמו. / תיעוד מלא לכל תשובה: למה היא נכונה ולמה האחרות לא. / אינו קיים, ולכן אינו מוצג / אין … ×4 / אין מסלול הכנה מומלץ: לא הומצא אחד. | F · S (overclaim: `wrongNote` is optional) · T | נמדד בהערכה / {n} מאגרי שאלות שנבנים מהתיעוד הטכני המאומת: ייעוד הטבלה, מפתח ראשי, מפתח זר, JOIN, זרימת נתונים. / שאלות S/4HANA שנגזרות ממפת השפעת המעבר המתועדת בפרויקט. / שאלות פתרון בעיות ותרחישים שנגזרות מקטלוג התקלות. / {n} סוגי שאלה ו-{n} רמות קושי מצטברות. / הסבר לכל תשובה נכונה, ובחלק מהשאלות גם הסבר לתשובות השגויות. / אינו כלול בהערכה / קוד בחינה ונושאי בחינה רשמיים של SAP. / משקלות נושאים, מספר שאלות רשמי וציון עובר של SAP. / רישום לבחינה, תעודה או תוקף מול SAP. / רף המעבר של {p}% הוא כלל פנימי של הפרויקט, לא ציון עובר של SAP. / מסלול הכנה מומלץ לבחינת SAP. | lib/cert/generate: `why` always, `wrongNote` optional (cert-exam.tsx:305) | rewrite | low |
| stats aria / label | cert-surface.tsx:114,116 | מספרי מנגנון ההערכה / שאלות שנוצרות | L · V | סיכום ההערכה / שאלות במאגרים | | rewrite | low |
| stat labels | cert-surface.tsx:117-120 | מאגרים / טבלאות עוגן / סוגי שאלה / רמות קושי | ok | unchanged | | keep | |
| record h2 / count placeholder | cert-surface.tsx:134-135 | התוצאות שלך / "—" (pre-hydration) | em dash in visible copy | (kept) / "" | Gloss. C no em dash | rewrite | low |
| record kv | cert-surface.tsx:148-151 | ניסיונות / הציון הגבוה שלך / שליטה מתגלגלת / שאלות שנענו | X (`masteryPct` = cumulative correct/seen, lib/cert/store.ts:74-77, not rolling) | (kept) / הציון הגבוה ביותר / תשובות נכונות (מצטבר) / (kept) | measured against store | rewrite | low |
| record status | cert-surface.tsx:157 | עברת את הרף הפנימי ({p}%) / טרם עברת את הרף הפנימי ({p}%) | H (2nd-person masc.) | הרף הפנימי הושג ({p}%) / הרף הפנימי טרם הושג ({p}%) | Gloss. C | rewrite | low |
| empty record | cert-surface.tsx:165-172 | עוד לא נרשמה אף בחינה במכשיר הזה / אין כאן ציון התחלתי, אין דירוג ואין אחוז שליטה: כי אין מה למדוד עדיין. ברגע שתסיים מבחן במרכז ההערכה … / פתח את מרכז ההערכה | F · A · C | לא נרשם מבחן במכשיר הזה / התוצאה של כל מבחן שיושלם תופיע כאן. התוצאות נשמרות במכשיר בלבד. / פתיחת המבחן | Gloss. C | rewrite | low |
| banks h2 / labels | cert-surface.tsx:184,201-202,206,221 | מה בדיוק יש בכל מאגר / שאלות במאגר / טבלאות עוגן / התפלגות לפי סוג שאלה / כמה שאלות זמינות בכל רמה (מצטבר) | I | הרכב המאגרים / (kept) / (kept) / (kept) / שאלות זמינות לפי רמה (מצטבר) | | rewrite | low |
| foot | cert-surface.tsx:241-247 | המאגרים נבנים בזמן ריצה מ-… על גבי המילון המאומת; … שום נתון אינו מגיע ממערכת SAP חיה. / המספרים כאן הם גודל המאגר, לא גודל מבחן: … | T · F | המאגרים נבנים מהתיעוד הטכני המאומת של הפרויקט (lib/cert/generate.ts); התוצאות נשמרות במכשיר (neo:cert). הנתונים אינם נקראים ממערכת SAP חיה. / המספרים מציינים את גודל המאגר. מבחן בודד דוגם ממנו קבוצת שאלות ומפזר אותה בין סוגי השאלה ובין טבלאות עוגן שונות. | Gloss. B | rewrite | low |
| exam module picker | cert-exam.tsx:52-54 | אחזקת מפעל / ייצור תהליכי / ליבת הייצור | T | תחזוקת מפעל / תעשיות תהליכיות / תכנון ייצור | Gloss. A | rewrite | low |
| exam setup eyebrow / H1 / lede | cert-exam.tsx:134-138 | הערכת ידע / בחר מאגר ורמה / … ייעודי טבלאות … מפת ההשפעה של S/4HANA … אין כאן סילבוס הסמכה רשמי של SAP. | C (imperative H1) · F | (kept) / הגדרת המבחן / השאלות נבנות מהתיעוד המאומת של הפרויקט: ייעוד טבלאות, מפתחות, קשרי ER, זרימת נתונים, מפת השפעת המעבר ל-S/4HANA וקטלוג התקלות. המבחן אינו מבוסס על תוכנית הסמכה רשמית של SAP. | Gloss. C | rewrite | low |
| picker labels | cert-exam.tsx:142,150,158,160 | מאגר / רמה / מספר שאלות / שאלות | ok | unchanged | | keep | |
| start / back | cert-exam.tsx:166,169 | התחל הערכה / חזרה למרכז ההסמכה | C · M (no "מרכז" page inside NEO) | התחלת המבחן / חזרה לעמוד ההסמכה | Gloss. C | rewrite | low |
| result eyebrow / a11y score / tallies | cert-exam.tsx:194,199,207-208 | תוצאה / ציון {s} אחוז, {c} נכונות מתוך {n}. / {c} נכונות / {n} שגויות | ok | unchanged | | keep | |
| result verdict / note | cert-exam.tsx:201,204 | עברת את סף הפרויקט / מתחת לסף הפרויקט / הסף הוא {p}% והוא כלל של הפרויקט הזה. SAP אינה מפרסמת סף שהפרויקט מחזיק. | H (2nd person) · F · exam chrome must say whether the result is saved | הציון עובר את הרף הפנימי / הציון מתחת לרף הפנימי / הרף הוא {p}%, כלל פנימי של הפרויקט ולא ציון עובר של SAP. התוצאה נשמרה במכשיר זה בלבד. | `finish()` calls `recordExam` (cert-exam.tsx:104) | rewrite | low |
| by-type aria / h2 | cert-exam.tsx:212-213 | ביצועים לפי סוג שאלה / לפי סוג שאלה | L | תוצאות לפי סוג שאלה / (kept) | | rewrite | low |
| result actions | cert-exam.tsx:229,233,237,239 | סקירת השאלות / סקירת {n} השגויות / הערכה חדשה / מרכז ההסמכה | C · M | (kept) / סקירת {n} התשובות השגויות / התחלת מבחן חדש / חזרה לעמוד ההסמכה | Gloss. C; "מבחן" = the activity, "הערכת ידע" = the surface | rewrite | low |
| choices aria | cert-exam.tsx:272 | אפשרויות | L | אפשרויות התשובה | | rewrite | low |
| feedback label | cert-exam.tsx:302 | נכון / התשובה הנכונה | C (unclear what follows) | תשובה נכונה / תשובה שגויה · ההסבר לתשובה הנכונה | the following `q.why` explains the correct answer | rewrite | low |
| sr verdict | cert-exam.tsx:125 | תשובה נכונה / תשובה שגויה | ok | unchanged | | keep | |
| question nav | cert-exam.tsx:316-332 | ניווט בשאלות / הקודמת / הבאה / סיים והצג תוצאה / סיים ({a}/{n} נענו) / חזרה לתוצאה | L · C | מעבר בין השאלות / השאלה הקודמת / השאלה הבאה / סיום המבחן והצגת התוצאה / סיום המבחן ({a}/{n} נענו) / (kept) | brief: סיום המבחן | rewrite | low |
| question chips | cert-exam.tsx:264-266 | QTYPE_HE / LEVEL_HE / table | content from lib/cert/generate | unchanged | out of scope | keep | |

## Totals

- Strings reviewed: 214 (counting each distinct visible string or label constant once; grouped rows above list them explicitly).
- Kept: 71
- Rewritten: 138
- Removed: 3 (the three "not X" defensive tails folded away: knowledge lede last sentence, cert empty-record explanation, course-view "sliding bar" narration; all as part of a rewrite, no JSX removed)
- Consolidated: 2 (knowledge empty-state title: 2 variants → 1 glossary phrase; incidents untagged label: "לא תויג במקור" + "השפעה לא תויגה במקור" → "ללא תג השפעה")
- Files changed: 17 (`git diff --numstat`): app/neo/academy/page.tsx, app/neo/certification/page.tsx, app/neo/incidents/page.tsx, app/neo/knowledge/page.tsx, components/neo-shell/learn/{academy-surface.tsx, cert-data.ts, cert-exam.tsx, cert-surface.tsx, concept-view.tsx, course-view.tsx, incident-view.tsx, incidents-data.ts, incidents-surface.tsx, knowledge-data.ts, knowledge-surface.tsx, lesson-view.tsx, mod.ts}.
- Unchanged in scope (no visible strings): lesson-data.ts, lesson-links.ts, lesson-neo-links.ts, academy-data.ts, app/neo/knowledge/[slug]/page.tsx, app/neo/incidents/[slug]/page.tsx, app/neo/academy/[courseId]/page.tsx, app/neo/academy/[courseId]/[slug]/page.tsx, app/neo/certification/exam/page.tsx.

## "מילון" replacements (Glossary B)

| file:line | context | replaced by |
|---|---|---|
| knowledge-data.ts:142 | concept group "נתונים ומילון" (ABAP Dictionary objects) | ABAP Dictionary (SAP product term, not the site's catalogue) |
| concept-view.tsx:142 | "טבלה במילון … טרנזקציה במרשם" | טבלת SAP … טרנזקציה בקטלוג |
| cert-data.ts:60-61 | "במילון הפרויקט" (bank source = table list) | בקטלוג הטבלאות של הפרויקט |
| cert-surface.tsx:78 | "טבלאות במילון" | טבלאות SAP מתועדות |
| cert-surface.tsx:87 | "מילון הנתונים של הפרויקט" | מודל הנתונים המתועד של הפרויקט |
| cert-surface.tsx:94 | "מהמילון המאומת" (fields, keys, joins) | מהתיעוד הטכני המאומת |
| cert-surface.tsx:241 | "על גבי המילון המאומת" | מהתיעוד הטכני המאומת של הפרויקט |

## Removed AI-writing signals

- "not X but Y" contrasts: "ולא על טקסט חופשי" (×3), "לא הערכה שנעשתה כאן", "ולא מנוסח מבחן", "לא גודל מבחן", "לא בדיקה חיה … ולא תור תמיכה", "אינו תור תמיכה חי, אינו מחובר…, ואינו כולל…".
- Self-justifying assurances: "אין כאן רשומה שלא נכתבה במאגר, ואין שדה שהושלם בניחוש", "ולא הומצא להן אחד" (×2), "לא הומצא אחד", "זהו מצב אמיתי במאגר ולא תקלה, ולכן לא הומצא כאן תוכן", "ההבחנה הזו חשובה יותר מכל ציון".
- Design narration: "ולא מוצג סרגל ריק במקומה" (×3), "שמתחזה למדידה", "אותו שיעור, אותו מנוע בלוקים ואותה מדידה", "סדר היחידות הוא הסדר של מנוע הבלוקים עצמו", "אותו מפתח שהאקדמיה עצמה כותבת אליו".
- Source narration in status labels: "המקור מתאר…", "המקור כותב…", "לא תויג במקור".
- Colloquial section titles: "מה זה, במונחים עסקיים", "איך זה בנוי, טכנית", "מה המשתמש רואה", "איך מאבחנים", "איך מונעים שזה יחזור", "איך זה נראה בארגון", "מה בדיוק יש בכל מאגר", "למה זה חשוב", "בחן את עצמך".
- Glyphs: "↔" (×3), "…" inside a visible path, "—" as a visible placeholder.
- Second-person masculine: "עצרת", "סיימת", "עברת", "טרם עברת", "ברגע שתסיים", "בחר".

## Unresolved terminology questions

1. **Certification H1.** The page is explicitly a self-assessment, yet the rail (nav-data.ts:209, out of scope) and the H1 say "הסמכה". Kept for rail consistency, with a one-line disclaimer in the lede. A product decision is needed on renaming both to "הערכת ידע" (the exam page's own metadata title already uses it).
2. **Knowledge view labels across two bodies.** `VIEWS` is one array serving both concepts and work topics; only the "all" label is branched in JSX. The new labels ("שינוי מתועד ב-S/4HANA" / "ללא שינוי מתועד") are true in both bodies, but a per-body label (a JSX branch) would be cleaner. Logic change, not done here.
3. **Return/rail labels outside my set still say "מרכז ידע"** (nav-data.ts:206, nav-context/fallbacks.ts:57,61, centers-view.tsx:77) and the hub lede says "מרכז המושגים" (nav-data.ts:581); the hub lede for incidents says "קטלוג התקלות" (nav-data.ts:599). Owners of those files should align to "מרכז הידע" / "תקלות ופתרון בעיות".
4. **Non-glossary module names** in mod.ts (eyebrows on courses/lessons): PP-DS "תכנון ותזמון מפורט", QM "ניהול איכות", MM "ניהול חומרים", WM "ניהול מחסן", EWM "ניהול מחסן מורחב". Glossary A has no entry for these; please confirm or add.
5. **Empty-data phrase.** Glossary C prescribes "לא קיים תיעוד מאומת במאגר"; the rest of neo-shell (10 occurrences outside learn/) still uses "לא קיים מידע מאומת במאגר". I followed the glossary; cross-surface alignment is needed.
6. **Provenance lines with file paths** ("מקור: data/concepts.ts", "lib/cert/generate.ts", "neo:academy:v2"). These are `nx-sap` spans (JSX) used as a product-wide provenance convention, so I kept them and rewrote the surrounding text. Decide whether file paths belong in visible copy at all.
7. **Rail "SAP Academy" count.** nav-data.ts:207 counts `BOOKS.length` "ספרי לימוד" for the academy hub, while /neo/academy/ lists 8 courses. Naming/data mismatch outside my scope.

## Out-of-scope strings noticed (not edited)

- **lib/cert/generate.ts:33-38** (`QTYPE_HE`, `LEVEL_HE`) rendered as chips/pickers on the exam: "פתרון תקלות" (glossary: פתרון בעיות), "JOIN / SQL", "חשיבת יועץ", "תרחיש ייצור"; levels "יועץ זוטר / יועץ פונקציונלי / יועץ בכיר / ארכיטקט פתרון". Label constants in lib/, not in my file set.
- **lib/academy/lesson-types.ts:55-79** (`BLOCK_META`) used by the legacy academy route: "מה תלמד ב-2 דקות", "למה זה חשוב בפרויקט אמיתי", "Flow של התהליך", "Tips של מיישם בכיר", "שאלות חזרה", emoji prefixes. NEO's lesson view has its own map (edited), but the legacy /academy/ still shows these.
- **data/concepts.ts:58,60** authored concept names: "פקודת ייצור (בדיד)" and "פקודת תהליך" (glossary: הזמנת ייצור / הזמנת תהליך). Authored content; listed only.
- **data/centers/*.ts** `eccS4.migration` texts start with "QA:" and use "פקודות", "מרשם בקרה" (e.g. blueprints.ts:17,30,43). Authored content; listed only.
- **components/neo-shell/nav-data.ts:206-209, 581, 590, 599** rail labels and hub ledes for these four routes (see Q3, Q7).
- **components/neo-shell/nav-context/fallbacks.ts:57,61** return-label fallbacks "מרכז ידע".
- **app/neo/learn.css / cert.css** contain no visible strings.
