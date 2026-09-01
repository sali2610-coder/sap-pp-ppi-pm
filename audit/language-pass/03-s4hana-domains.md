# Language pass · 03 S/4HANA + Business Domains + Centers + Studio

Routes: `/neo/s4hana/`, `/neo/s4-readiness/`, `/neo/migration-cockpit/`, `/neo/domain-model/`, `/neo/domain/[slug]/`, `/neo/centers/`, `/neo/centers/[family]/`, `/neo/centers/[family]/[slug]/`, `/neo/studio/`.
Files edited: `components/neo-shell/s4/s4-view.tsx`, `components/neo-shell/domain/domain-data.ts`, `components/neo-shell/domain/domain-view.tsx`, `components/neo-shell/centers/centers-data.ts`, `components/neo-shell/centers/centers-view.tsx`, `components/neo-shell/studio/studio-view.tsx`, `app/neo/{studio,s4hana,s4-readiness,migration-cockpit,domain-model}/page.tsx`, `app/neo/centers/[family]/page.tsx`, `app/neo/centers/[family]/[slug]/page.tsx`.
Files reviewed, no visible string to change: `components/neo-shell/s4/s4-data.ts` (derived data + comments only), `app/neo/centers/page.tsx`, `app/neo/domain/[slug]/page.tsx`.
Line numbers below are the pre-edit line numbers of each file. Code comments were left untouched everywhere.
Gates run: `./node_modules/.bin/tsc --noEmit` exit 0. No build, no tests, no git, no browser (browser verification is a separate gate).

## Edits

| route/surface | file:line | current text | issue category | final text | evidence/glossary ref | action | risk |
|---|---|---|---|---|---|---|---|
| S/4 (all 3) · trust badge | s4-view.tsx:44 | ידע מתוחזק / דורש אימות מול SAP | inconsistent Hebrew, defensive copy | תיעוד מאומת / נדרש אימות נוסף | GLOSSARY §C empty/uncertain wording; data `trust: curated \| needs-verification` | rewrite | low |
| S/4 (all 3) · closing credit line | s4-view.tsx:113 | התוכן מוצג כפי שנכתב במאגר הפרויקט. לא נוסחו כאן עובדות SAP חדשות. | defensive copy | התוכן מוצג כפי שנכתב בתיעוד הפרויקט. | §C no defensive explanations; §B blueprint source = תיעוד הפרויקט | consolidate (same line in domain-view:443, centers-view:189) | low |
| S/4 center · section nav | s4-view.tsx:136 | נוף המערכות | translation problem | ארכיטקטורת המערכת | §A (System landscape has no approved form; architecture is the data's own term: `data/s4-architecture`) | rewrite | low |
| S/4 center · H1 | s4-view.tsx:149 | מה בדיוק משתנה במעבר | vague title, immature tone | השינויים במעבר מ-ECC ל-S/4HANA | §A S/4HANA transition; brief rule 4 (H1 names the subject) | rewrite | low |
| S/4 center · hero lede | s4-view.tsx:152-154 | …שהפרויקט תיעד אחד-אחד: מה היה ב-ECC, מה קיים ב-S/4HANA, למה זה השתנה, ומה זה עושה לקוד. לצדם N רכיבי נוף מערכות… | immature tone, design narration | N אובייקטים מתועדים: המצב ב-ECC, המצב ב-S/4HANA, סיבת השינוי וההשפעה על הקוד המותאם. בנוסף: N רכיבי ארכיטקטורה, … | §C | rewrite | low |
| S/4 center · hero note | s4-view.tsx:167-168 | מסומנים כידע מתוחזק; היתר מסומנים כדורשים אימות מול גרסת היעד… N מהם נושאים גם דף אובייקט מלא | inconsistent Hebrew | מסומנים כתיעוד מאומת; ליתר נדרש אימות נוסף בהתאם לגרסת המערכת… N מהם מקושרים לדף אובייקט מלא | §C uncertain wording | rewrite | low |
| S/4 center · §1 title + lede | s4-view.tsx:182-183 | אובייקט אחרי אובייקט / …הצבע הוא הצבע של המאגר עצמו. | vague title, design narration | קטלוג האובייקטים / מסודר לפי חומרת השינוי: תחילה מה שבוטל, בסוף מה שנשאר. | §C no design narration | rewrite | low |
| S/4 center · object card labels | s4-view.tsx:214, 218, 225, 242 | למה: / מאחד אליו / מה זה עושה לקוד / מה לבדוק אצלנו | immature tone, inaccurate label ("מאחד אליו" renders `replaces[]`) | סיבת השינוי: / מחליף את / השפעה על קוד ABAP / נקודות לבדיקה בפרויקט | data field `replaces`; §A Replacement | rewrite | low |
| S/4 center · §2 eyebrow/title/lede | s4-view.tsx:265-267 | נוף מערכות / מה מחליף מה בשכבות / …מה שנשאר ומה שנעלם. | vague title, immature tone | ארכיטקטורה / רכיבי הארכיטקטורה לפי שכבה / N רכיבים, ECC מול S/4HANA, ולכל אחד מה שנשאר ומה שהוסר. | §C | rewrite | low |
| S/4 center · arch card label | s4-view.tsx:290 | נעלם | immature tone | הוסר | §A verdict vocabulary (label of the `gone` field, not a verdict change) | rewrite | low |
| S/4 center · §3 title | s4-view.tsx:303 | מה קורה לקוד המותאם | vague title | השפעה על הקוד המותאם | brief rule 4 | rewrite | low |
| S/4 center · row labels | s4-view.tsx:311, 332; readiness 467 | S/4 · מסומן S/4 | inconsistent naming | S/4HANA · מסומן S/4HANA | §A approved forms only | rewrite | low |
| S/4 center · monitors h3 | s4-view.tsx:315 | כלי הבדיקה | vague title (list is SM37/ST22/ODQMON/…/ATC) | כלי בדיקה וניטור | data `monitorLinks` | rewrite | low |
| S/4 center · §4 title | s4-view.tsx:324 | איך המערכת מדברת החוצה | immature tone | שכבות האינטגרציה | §C | rewrite | low |
| S/4 center · §5 lede | s4-view.tsx:344 | …Reconciliation אחרי ההגירה. | inaccurate terminology | …Reconciliation לאחר המעבר. | §A avoid הגירה | rewrite | low |
| S/4 center · §7 title/lede | s4-view.tsx:376-377 | הלקחים שכבר שילמנו עליהם / N מלכודות שחוזרות בפרויקטי המרה. | immature tone | לקחים מפרויקטי מעבר / N לקחים חוזרים בפרויקטי מעבר ל-S/4HANA. | §A S/4HANA transition | rewrite | low |
| Readiness · area chips | s4-view.tsx:404 | מודל נתונים / ייצור / אחזקה | inaccurate SAP terminology | מודל הנתונים / תכנון ייצור (PP) / תחזוקת מפעל (PM) | §A Data Model, PP, PM | rewrite | low |
| Readiness · section nav | s4-view.tsx:409 | מה משתנה, נושא אחרי נושא | vague title | נושאי השינוי | brief rule 4 | rewrite | low |
| Readiness · eyebrow + H1 | s4-view.tsx:415-417 | מוכנות למעבר · READINESS / איפה כל מודול עומד | vague title, naming | מוכנות ל-S/4HANA · READINESS / מוכנות ל-S/4HANA לפי מודול | §A S/4HANA readiness | rewrite | low (see nav note below) |
| Readiness · hero lede (data present) | s4-view.tsx:420 | …מחושב מ-N טבלאות הפרויקט: כמה מהן כבר עם Fiori… נושאי שינוי ECC→S/4HANA… והשפעת מיגרציה. | translation problem, naming | …מחושב מ-N טבלאות SAP מתועדות: כיסוי Fiori, כיסוי CDS, שיעור הטבלאות המסומנות כמוחלפות ואומדן עבודת הקוד המותאם. בנוסף N נושאי שינוי ECC → S/4HANA, כל אחד עם סטטוס והשפעת מעבר. | §A Migration impact = השפעת המעבר; §B tables | rewrite | low |
| Readiness · hero lede (data absent) | s4-view.tsx:421 | מערך הטבלאות של הפרויקט לא נטען בזמן הבנייה, ולכן אין כאן ציון… למטה. | internal note | ציון המוכנות אינו זמין, מכיוון שקטלוג טבלאות SAP לא נטען. N נושאי השינוי מוצגים במלואם. | §C errors: what happened, what is still available | rewrite | low |
| Readiness · stat label | s4-view.tsx:428 | טבלאות שנספרו | design narration | טבלאות SAP | §A | rewrite | low |
| Readiness · hero note | s4-view.tsx:436 | הציון נגזר מהמאגר עצמו… הוא מודד כיסוי תיעוד, לא בשלות מערכת חיה, ואינו מחליף SAP Readiness Check. | "not X but Y" contrast, naming | הציון נגזר מהתיעוד: Fiori, CDS, סטטוס S/4HANA ומספר הקשרים לכל טבלה. הוא מודד כיסוי תיעוד בלבד ואינו מחליף SAP Readiness Check. | §C; the Readiness Check disclaimer is kept because it is an accuracy statement | rewrite | low |
| Readiness · §1 lede | s4-view.tsx:447 | מסודר מהמוכן ביותר לפחות מוכן. | awkward Hebrew | מסודר לפי ציון, מהגבוה לנמוך. | §C | rewrite | low |
| Readiness · no-score state | s4-view.tsx:478-479 | הקובץ public/sap-infrastructure/dataset.json לא נקרא בזמן הבנייה… לא הוצג במקומו מספר משוער. | internal note, implementation error as copy, defensive | ציון המוכנות אינו זמין: קטלוג טבלאות SAP לא נטען. | §C errors | rewrite | low |
| Readiness · §2 title | s4-view.tsx:488 | מה משתנה, נושא אחרי נושא | vague title | נושאי השינוי במעבר ל-S/4HANA | brief rule 4 | rewrite | low |
| Readiness · topic impact label | s4-view.tsx:506 | השפעת מיגרציה: | inaccurate terminology | השפעת המעבר: | §A Migration impact | rewrite | low |
| Cockpit · section nav | s4-view.tsx:531-532 | אובייקטי ההגירה / גישות העברה | inaccurate terminology, vague | אובייקטי המעבר / גישות העברת נתונים | §A avoid הגירה; data `APPROACHES` are data-transfer approaches (staging, file, LTMOM, RFC) | rewrite | low |
| Cockpit · eyebrow + H1 | s4-view.tsx:542-544 | קוקפיט מיגרציה · MIGRATION COCKPIT / מה עובר, ובאיזה סדר | inconsistent naming, vague title | קוקפיט המעבר · MIGRATION COCKPIT / אובייקטי המעבר ורצף הטעינה | §A Migration Cockpit = קוקפיט המעבר | rewrite | low |
| Cockpit · hero lede | s4-view.tsx:547-549 | N אובייקטי הגירה של ה-Migration Cockpit… טבלאות ECC נבדלות. רצף הטעינה למטה אינו כתוב ביד. הוא מחושב מהתלויות עצמן, ולכן אינו יכול לסתור אותן. | terminology, design narration, defensive | N אובייקטי מעבר ב-Migration Cockpit, עם N הפניות ל-N טבלאות מקור נבדלות ב-ECC. רצף הטעינה מחושב מהתלויות בין האובייקטים. | §C | rewrite | low |
| Cockpit · hero note | s4-view.tsx:562-563 | …כידע מתוחזק ו-N כדורשים אימות מול גרסת המקור והיעד… נושאות דף מלא | inconsistent Hebrew | …כתיעוד מאומת ו-N כנדרש אימות נוסף בהתאם לגרסת המערכת… מקושרות לדף טבלה מלא | §C | rewrite | low |
| Cockpit · §1 lede | s4-view.tsx:576 | …אובייקט לא יכול להופיע לפני מה שהוא צריך. | immature tone | כל גל מכיל אובייקטים שכל התלויות שלהם נטענו בגלים הקודמים. | §C | rewrite | low |
| Cockpit · §2 eyebrow/title | s4-view.tsx:603-604 | ספרייה / אובייקטי ההגירה | inconsistent naming (ספרייה = SAP Books) | קטלוג / אובייקטי המעבר | §A SAP Books; §B catalog | rewrite | low |
| Cockpit · object without ECC source | s4-view.tsx:627 | האובייקט הזה אינו נטען מטבלת ECC. ראו את ההערה למטה. | imperative plural, dangling reference (note is optional) | לאובייקט זה לא מתועדת טבלת מקור ב-ECC. | §C; data `ecc: []` | rewrite | low |
| Cockpit · dependency labels | s4-view.tsx:631, 640 | חייב להיטען אחרי / פותח את הדרך ל | immature tone | נטען לאחר / תנאי מקדים ל | data `dependsOn` / `unlocks` | rewrite | low |
| Cockpit · §3 title | s4-view.tsx:656 | גישות העברה | vague | גישות העברת נתונים | as nav | rewrite | low |
| Cockpit · §4 title/lede | s4-view.tsx:680-681 | מה נשבר בטעינה / N דפוסי שגיאה אמיתיים של LTMC: הסימפטום, הסיבה והתיקון. | immature tone, hype ("אמיתיים") | שגיאות טעינה נפוצות / N דפוסי שגיאה ב-LTMC: סימפטום, סיבה ותיקון. | §C no hype; LTMC is named in `MIG_ERRORS` (5 rows) | rewrite | low |
| Cockpit · §5 title/lede | s4-view.tsx:700-701 | ממדי איכות / N ממדים שנבדקים לפני שנטענים. | vague | ממדי איכות הנתונים / N ממדים לבדיקה לפני הטעינה. | §C | rewrite | low |
| Cockpit · §6 lede | s4-view.tsx:716 | …המשקל הוא של המאגר, לא הערכה שלנו. | "not X but Y", defensive | …כפי שנקבעו בתיעוד הפרויקט. | §C | rewrite | low |
| Domains · module labels | domain-data.ts:104; domain-view.tsx:31 | אחזקת מפעל · PM / ייצור תהליכי · PP-PI ; אחזקה · PM / ייצור · PP-PI | inaccurate SAP terminology, duplicate copy (two different wordings) | תחזוקת מפעל · PM / תעשיות תהליכיות · PP-PI (both files) | §A PM, PP-PI | consolidate + rewrite | low |
| Domains · verdict row labels | domain-data.ts:113-120 | ללא שינוי — נשאר זהה / אפליקציית Fiori / השפעת מיגרציה ובדיקות | em dash, terminology | ללא שינוי / יישום Fiori / השפעת המעבר ובדיקות | §C no em dash; §A Fiori app, Migration impact. Verdict words (ללא שינוי / מוחלף / הוסר) unchanged. | rewrite (3 of 8) | low |
| Domains hub · card CTA | domain-view.tsx:74 | פתח את התחום | unclear CTA (imperative) | פתיחת התחום | §C verbal-noun | rewrite | low |
| Domains hub · H1 | domain-view.tsx:93 | איך העבודה באמת מתנהלת | vague title, AI signature ("באמת") | התחומים העסקיים של PM ו-PP-PI | brief rule 4 | rewrite | low |
| Domains hub · lede | domain-view.tsx:95-98 | כל תחום הוא יחידת עבודה שלמה… N מהם נושאים גם רשומה עמוקה… דוגמה מהמפעל | inconsistent naming (רשומה עמוקה vs badge רשומה מלאה) | לכל תחום: … N מהם כוללים גם רשומה מלאה… תרחיש מהמפעל | badge text `רשומה מלאה` (line 60/222) | consolidate + rewrite | low |
| Domains hub · stat | domain-view.tsx:104 | טבלאות מוזכרות | design narration | טבלאות SAP | §A | rewrite | low |
| Domains hub · coverage gap | domain-view.tsx:120-121 | …נושאים כרגע רשומת בסיס בלבד… ולא הושלמו כאן בתוכן שלא נכתב במאגר. | defensive copy | …כוללים רשומת בסיס בלבד, והם מסומנים כך בכרטיס ובעמוד. לרשומה המלאה שלהם לא קיים תיעוד מאומת במאגר. | §C data-absent wording | rewrite | low |
| Domain detail · section nav | domain-view.tsx:192, 199 | מה זה ולמה / מהמפעל | vague | הגדרה ומטרה / תרחיש מהמפעל | brief rule 4 | rewrite | low |
| Domain detail · thin-record notice | domain-view.tsx:229-231 | לתחום הזה המאגר מחזיק את רשומת הבסיס… הרשומה העמוקה… לא נכתבה עבורו, והיא לא הושלמה כאן. | defensive copy, naming | לתחום זה קיימת במאגר רשומת בסיס… לרשומה המלאה (…) לא קיים תיעוד מאומת במאגר. | §C | rewrite | low |
| Domain detail · flow lede | domain-view.tsx:243 | כפי שהם כתובים במאגר | style | כפי שתועדו במאגר | §C | rewrite | low |
| Domain detail · purpose title + h3 | domain-view.tsx:271, 276 | מה זה, ולמה זה קיים / נתוני אב שהתחום נשען עליהם | vague title | הגדרה ומטרה / נתוני אב נדרשים | brief rule 4 | rewrite | low |
| Domain detail · data eyebrow + lede | domain-view.tsx:292-294 | מאחורי הקלעים / …נושאות דף בפרויקט. השאר מוצגות כערך, לא כקישור מת. | design narration, "not X" | נתונים / …מקושרות לדף בפרויקט. | §C | rewrite | low |
| Domain detail · Fiori h3 | domain-view.tsx:302 | אפליקציות Fiori | terminology | יישומי Fiori | §A | rewrite | low |
| Domain detail · FM h3 | domain-view.tsx:318 | מהרשומה העמוקה | naming | מודולי פונקציה מהרשומה המלאה | §A Function Module | rewrite | low |
| Domain detail · enhancements lede | domain-view.tsx:331 | …הסוגריים הם ההסבר שנכתב שם, לא תוספת שלנו. | defensive, "not X" | User Exits ו-BAdIs כפי שתועדו במאגר. | §C | rewrite | low |
| Domain detail · titles | domain-view.tsx:342, 363, 386 | מה חשוב לזכור / מה נשבר, ומה עושים / איך זה נראה במפעל | immature tone | נקודות למידה / תקלות ופתרונות / תרחיש מהמפעל | match nav labels | rewrite | low |
| Domain detail · S/4 section | domain-view.tsx:396-397 | ECC ← S/4HANA / ההכרעה כפי שנכתבה במאגר… | arrow heading (also resolves LTR in bidi, so it reads S/4HANA to ECC) | המעבר ל-S/4HANA / הכרעת המעבר כפי שתועדה במאגר, שורה לכל היבט. | §C arrows; nav label already `המעבר ל-S/4HANA` | consolidate + rewrite | low |
| Domain detail · no verdict | domain-view.tsx:410 | למאגר אין הכרעת מעבר מתועדת לתחום הזה. הריק מכוון, ואינו אומר שאין שינוי ב-S/4HANA. | defensive copy | לתחום זה לא קיימת הכרעת מעבר מתועדת במאגר. נדרש אימות נוסף בהתאם לגרסת המערכת. | §C uncertain wording (meaning kept: absence is not "no change") | rewrite | low |
| Domain detail · post-migration h3 | domain-view.tsx:415 | מה לבדוק אחרי ההמרה | terminology | נקודות לבדיקה לאחר המעבר | §A | rewrite | low |
| Centers · family ledes | centers-data.ts:67, 69, 75, 77, 79 | …ומחזורי פקודה / …SU53 ל-PFCG / אפליקציות Fiori… לא לפי קטלוג / …שיועץ טכני נדרש להם בשטח / …דרך הראיה… | terminology (פקודה), prefix form, "not X", tone | …ומחזורי הזמנת תהליך / …מ-SU53 עד PFCG / יישומי Fiori לפי התהליך העסקי שהם משרתים / כלי פיתוח וניתוח ABAP לעבודת היועץ הטכני / נתיבי אבחון: מהסימפטום, דרך הראיות, אל הסיבה | §A Process Order, Fiori app; §C | rewrite | low |
| Centers · family name | centers-data.ts:74 | Fiori בתהליך | translation problem | יישומי Fiori לפי תהליך | §A | rewrite | low |
| Centers hub · lede | centers-view.tsx:36-38 | ו־N מקטעי / צ׳ק ליסט / הכרעת מעבר ל־S/4HANA מאומתת | maqaf ×2, slang, unsupported claim ("מאומתת") | ו-N / רשימת בדיקה / הכרעת מעבר מתועדת ל-S/4HANA | §C prefix; matches family view wording (מתועדת) | rewrite | low |
| Centers hub · card CTA | centers-view.tsx:59 | פתח את המרכז | unclear CTA | פתיחת המרכז | §C | rewrite | low |
| Center item · verdict block | centers-view.tsx:171, 174, 179, 181 | ECC ← S/4HANA (×2) / המעבר: / …הריק כאן מכוון, ואינו אומר שאין שינוי. | arrow heading, vague label, defensive | המעבר ל-S/4HANA (×2) / השפעת המעבר: / לנושא זה לא קיימת הכרעת מעבר מתועדת במאגר. נדרש אימות נוסף בהתאם לגרסת המערכת. | §C | consolidate + rewrite | low |
| Studio · S/4 legend + context | studio-view.tsx:53 | ללא שינוי / מוחלפת / הוסרה | unsupported S/4HANA claim: `kept` in `lib/studio-graph.ts:39` is the default bucket (no alt table and no removal wording), not a verified "unchanged" | ללא החלפה מתועדת / הוחלפה / הוסרה | §C never upgrade uncertain status | rewrite | medium (label is now strictly weaker and always true; flagged for browser check of legend width) |
| Studio · search | studio-view.tsx:250, 253 | חפש טבלה… / נקה חיפוש | imperative | חיפוש טבלה, טרנזקציה או אובייקט / ניקוי החיפוש | §C | rewrite | low |
| Studio · toolbar titles | studio-view.tsx:273-283 | התאם למסך / אפס / צא ממסך מלא / התרחק / התקרב / מרכז את הנבחר | imperative (accessibility-label problem) | התאמה למסך / איפוס / יציאה ממסך מלא / הקטנה / הגדלה / מיקוד באובייקט הנבחר | §C | rewrite | low |
| Studio · empty state | studio-view.tsx:390 | אין אובייקטים בתצוגה הזאת עם המסננים שנבחרו. | inconsistent empty wording | לא נמצאו תוצאות התואמות לסינון שנבחר. | §C filter-empty wording | rewrite | low |
| Studio · context panel | studio-view.tsx:399, 410, 424 | סגור / לא תועדה הכרעת מעבר לאובייקט הזה. / אין קשרים בתצוגה הזאת. | imperative, style | סגירה / לאובייקט זה לא קיימת הכרעת מעבר מתועדת. / אין קשרים בתצוגה זו. | §C | rewrite | low |
| Studio · metadata | studio/page.tsx:13 | חקירה ויזואלית… CDS ו-Fiori | translation problem, terminology | תצוגה גרפית של ארכיטקטורת SAP: … CDS Views ויישומי Fiori… | §A | rewrite | low |
| S/4 center · metadata | s4hana/page.tsx:17 | N אובייקטים שהשתנו במעבר… מה היה, מה קיים, מה זה עושה לקוד המותאם, ומה לבדוק. | copy-vs-data (4 status groups include `stays`, so "שהשתנו" over-claims), tone | N אובייקטים מתועדים במעבר מ-ECC ל-S/4HANA: המצב ב-ECC, המצב ב-S/4HANA, ההשפעה על הקוד המותאם ונקודות לבדיקה. | data `S4STATUS_META.stays` | rewrite | low |
| Readiness · metadata | s4-readiness/page.tsx:15-16 | מוכנות למעבר · Project NEO / …ECC→S/4HANA… והשפעת מיגרציה. | naming | מוכנות ל-S/4HANA · Project NEO / …ECC → S/4HANA… והשפעת המעבר. | §A | rewrite | low |
| Cockpit · metadata | migration-cockpit/page.tsx:15-16 | קוקפיט מיגרציה · Project NEO / N אובייקטי הגירה, N טבלאות ECC… | naming | קוקפיט המעבר · Project NEO / N אובייקטי מעבר, N טבלאות מקור ב-ECC… | §A | rewrite | low |
| Domains · metadata | domain-model/page.tsx:18 | …זרימה עסקית, טבלאות, טרנזקציות… | naming | …טבלאות SAP… | §A | rewrite | low |
| Centers · metadata fallbacks | centers/[family]/page.tsx:16; centers/[family]/[slug]/page.tsx:16 | מרכז ידע / נושא | inconsistent naming (all other titles end with · Project NEO) | מרכז ידע · Project NEO / נושא · מרכזי ידע · Project NEO | consistency; unreachable with `dynamicParams=false` | rewrite | none |
| Kept as written (reviewed against glossary) | all files | risk labels; the four `S4STATUS_META` group names (בוטל/הוחלף/השתנה/נשאר); hero eyebrows with English tag; stat labels; ECC / S/4HANA dl labels; Cutover / Go-Live / ABAP / LTMC / Simplification / Fiori · CDS identifiers; section eyebrows not listed above; `גל N`; `מפתח`; `סימפטום / סיבה / תיקון`; `מתי`; domain badges `רשומה מלאה / רשומת בסיס`; `Positive · Negative · Integration · Regression`; `תחומים נוספים ב-PM`; centers family names (10 of 11) and 5 ledes; Studio H1 `Architecture Studio`, group labels, `מסך מלא`, `קשרים ·`; footer credit; metadata titles for studio, s4hana, domain-model, centers, domain/[slug] | - | unchanged | - | keep | - |

## Totals

Reviewed 320 visible strings (JSX text, aria-*, title=, placeholder=, label constants, metadata) · kept 195 · rewritten 125 · removed 11 · consolidated 6 groups.

- "Removed" counts sentences dropped inside a rewritten string; no JSX node, prop or element was removed. The 11: the "לא נוסחו כאן עובדות SAP חדשות" sentence (×3), "הצבע הוא הצבע של המאגר עצמו", "רצף הטעינה למטה אינו כתוב ביד… אינו יכול לסתור אותן", "לא הוצג במקומו מספר משוער", "המשקל הוא של המאגר, לא הערכה שלנו", "השאר מוצגות כערך, לא כקישור מת", "הסוגריים הם ההסבר שנכתב שם, לא תוספת שלנו", "הריק מכוון, ואינו אומר שאין שינוי" (×2), "לא לפי קטלוג".
- Consolidated groups: (1) closing credit line, 3 files → one sentence; (2) module labels in domain-data + domain-view → one wording; (3) "רשומה עמוקה" → "רשומה מלאה" to match the badge, 3 places; (4) S/4 verdict section heading, 3 places → `המעבר ל-S/4HANA` (equals the domain nav label); (5) "no verdict documented" state, 3 places → same pattern + `נדרש אימות נוסף בהתאם לגרסת המערכת`; (6) trust wording in two hero notes aligned with the `TRUST_HE` badge.

"מילון" replacements: 0 (no occurrence in this file set). "מרשם": 0.

AI / immature signals removed: "מה בדיוק משתנה", "איך העבודה באמת מתנהלת", "אובייקט אחרי אובייקט", "נושא אחרי נושא", "מה זה עושה לקוד", "מה לבדוק אצלנו", "איך המערכת מדברת החוצה", "הלקחים שכבר שילמנו עליהם", "מה עובר, ובאיזה סדר", "מה נשבר", "פותח את הדרך ל", "דפוסי שגיאה אמיתיים", "מאחורי הקלעים", "איך זה נראה במפעל", "מה זה, ולמה זה קיים", "מה חשוב לזכור", "הריק מכוון"; one em dash (domain-data.ts:113); two maqafs (centers-view.tsx:36, 38); every "not X but Y" contrast listed under removed.

## Copy-vs-data conflicts found (data not changed)

1. `data/s4-objects.ts` `S4STATUS_META` uses `בוטל / הוחלף / השתנה / נשאר`; the glossary verdict set is `ללא שינוי / מותאם / הוחלף / הוסר`. The view's `ORDER` list (s4-view.tsx:127-132) mirrors the data words and was left as is, since these are the dataset's own vocabulary. Stat labels `הוחלפו / בוטלו` follow the same words.
2. `data/ecc-s4.ts` `STATUS_HE` renders `שונה` and `הוסר/לא מומלץ` (with an unspaced slash); rendered verbatim on the readiness topics, untouched.
3. `lib/studio-graph.ts:39` classifies a table as `kept` whenever it has no `s4AltTable` and its note has no removal wording. The old label `ללא שינוי` asserted more than the rule proves; relabelled `ללא החלפה מתועדת` (view label only).
4. `s4hana/page.tsx` description said "N אובייקטים שהשתנו" while the dataset includes `stays` objects; description reworded to "מתועדים".
5. `data/centers/manufacturing.ts` uses "פקודת תהליך" throughout its content (12 occurrences); the glossary form is "הזמנת תהליך". Only the family lede (UI label) was aligned; the item content is data and stays.
6. `components/ecc-s4-block.tsx:17-24` (out of scope) still labels the same eight `EccS4` fields as `ללא שינוי (נשאר זהה)`, `משתנה ב-S/4`, `אפליקציית Fiori חדשה`, `השפעת מיגרציה + QA`. The NEO domain view now says `ללא שינוי`, `משתנה ב-S/4HANA`, `יישום Fiori`, `השפעת המעבר ובדיקות`. The comment in domain-data.ts (line 108-111) says the two renderings should use the same words; the legacy block should be aligned by whoever owns it.

## Out-of-scope strings (path + string)

- `components/neo-shell/nav-data.ts:157` and `components/neo-shell/nav-context/fallbacks.ts:49`: rail/fallback label `קוקפיט מיגרציה` and countLabel `אובייקטי מיגרציה` (glossary: קוקפיט המעבר). Also `nav-data.ts:156` / `fallbacks.ts:48`: `מוכנות למעבר` (this pass titled the page `מוכנות ל-S/4HANA`; the rail should follow or the page title should be reverted, see unresolved 1). Owned by 01-global-shell.
- `components/ecc-s4-block.tsx:17-24`: legacy verdict labels listed in conflict 6.
- `lib/s4-readiness.ts:63, 76`: effort strings use en dashes (`6–12 שבועות`, `3–6 שבועות`) and band names are English (`Cloud Ready`, `S/4 Ready`, `Hybrid`, `ECC Only`); rendered verbatim on the readiness page. `lib/**` is out of bounds.
- `lib/studio-graph.ts:194, 199`: mode labels `ECC ↔ S/4` and `Fiori Apps`; zone label `לוגיסטיקה / פיננסי`. Rendered in the Studio sidebar; out of bounds.
- `data/migration-cockpit.ts:13-17` (`APPROACHES`) and `data/ecc-s4.ts`, `data/s4-transformation.ts`: content strings contain em dashes and "הגירה" (e.g. "התאמת אובייקטי הגירה"); data, untouched.
- `data/domains.ts`, `data/domain-detail.ts`, `data/centers/*.ts`: all card/section content (`he`, `summary`, `sub`, `eyebrow`, section titles) is data and was not touched.
- `app/neo/domain.css:243`: `content: "←"` decorative connector on the detailed-process chain (CSS, not copy).

## Unresolved terminology questions

1. Readiness page title: the glossary gives `מוכנות ל-S/4HANA`; the rail (out of scope) says `מוכנות למעבר`. This pass applied the glossary form to the page eyebrow, H1 and metadata; the rail owner should confirm which wins so page and rail agree.
2. `בלופרינטים` (centers-data.ts:62 and the centers metadata) is a transliteration with no glossary entry; the toolkit lede and the items' own content also use "בלופרינט". Kept for consistency with data; a decision on `מסמכי אפיון (Blueprints)` is needed at glossary level.
3. `Architecture Studio` shows `ECC ↔ S/4` as a mode label from `lib/studio-graph.ts`; the glossary prefers `S/4HANA`. Not editable here.
4. "מאגר" is used across this file set for the project repository ("במאגר", "תיעוד מאומת במאגר"); the glossary's own wording uses it, so it was kept, but "תיעוד הפרויקט" was preferred in the closing line. Confirm whether "מאגר" should be standardised out.
5. The S/4 center groups objects under `בוטל` (data word) where the glossary verdict is `הוסר`. Left as data vocabulary; confirm the S/4 objects catalog is meant to keep its own status words.
