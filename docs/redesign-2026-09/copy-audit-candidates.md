# ביקורת נוסח עברי · Project NEO · רשימת מועמדים

**תאריך:** 2026-09-28 · **עץ עבודה:** `/Users/salihalif/Desktop/My-Projects/neo-redesign` · סריקה לקריאה בלבד; זה הקובץ היחיד שנכתב.

**היקף:** `components/neo-shell/**` ו-`app/neo/**` (200 קובצי TS/TSX, כ-45,000 שורות); מטא-דאטה: `app/layout.tsx`, `app/neo/layout.tsx`, כל `metadata` ו-`generateMetadata` תחת `app/neo/**`, `app/manifest.ts`, `app/robots.ts`; מהמעטפת הישנה רק נקודות החיבור: `components/Footer.tsx`, הקרדיט בכותרת של `components/app-shell.tsx`, `app/privacy/page.tsx`. הקבצים `public/manifest.webmanifest` ו-`public/robots.txt` אינם קיימים; שניהם נוצרים מ-`app/manifest.ts` ו-`app/robots.ts` (ב-robots אין טקסט). לא הוצע שינוי בקבצים המוגנים: `data/books/**`, `data/library/**`, `data/verification/**`, `data/sapData*.ts`, `data/ai-tree/**`, `*.generated.ts`, `components/book-reader.tsx`, `components/chapter-reader.tsx`, `components/library/**`, `components/neo/**`, `app/library/**`.

**קיצורים:** `cns/` = `components/neo-shell/`. `N` = מספר שנגזר מהנתונים בזמן ריצה. `X` = שם אובייקט דינמי.

**שיטה:**
1. חילוץ כל המחרוזות הגלויות דרך TypeScript Compiler API: StringLiteral, template, JsxText ומאפייני JSX (`aria-label`, `title`, `placeholder`, `alt`, `label`), בלי `className`, `import`, מפתחות אובייקט וטיפוסים. כך הופרדו מקפים בתוך מחרוזות ממקפים בהערות קוד.
2. ביטויים רגולריים שהורצו על המחרוזות שחולצו:
   - מקף ארוך ומקף בינוני: `\x{2014}` ו-`\x{2013}` (ספירה ב-perl ובעץ ה-AST).
   - אנגלית בכותרות: `\b[A-Z]{3,}(\s+[A-Z&]{2,})+\b|TRANSFORMATION|COVERAGE|READINESS|COCKPIT|CENTERS|DOMAINS|RELATIONSHIP|ISRAEL|PLATFORM|KNOWLEDGE|CATALOG` וגם `(Catalog|Dictionary|Platform|Enterprise|Knowledge|Studio|Academy|Explorer|Center|Hub|Cockpit)\b`.
   - ייחוס: `cbc` בלי תלות ברישיות, בכל המאגר חוץ מ-`node_modules`, `out`, `.next`.
   - ניפוח: `מקיף|מהפכ|אולטימטיב|חכם|עוצמתי|בעידן|חדשני|מתקדמ|ייחודי|מושלמ|חוויה|בקלות|בלחיצה|עולמי|פורץ|מרתק|הטוב ביותר|אינטליגנט|פלטפורמ|מיידי|Enterprise`.
   - הסבר־יתר על אופן הבנייה: `נגזר|נספר|מגובה|כפי שה[םן]|כלשונ|הומצ|מומצ|בניחוש|מהדמיון|מהזיכרון|כפי שנרשמ|כפי שנכתב|כפי שתועד|נקרא(ים|ות)? מ|נלקח|מנתוני הפרויקט|אין כאן טענה|במפורש`.
   - ציווי בלשון זכר: `(נסה|נקה|הצג|התחל|שאל|לחץ|בחר|הקלד|תלמד|העתק|חזור|חקור|טען)` כמילה שלמה.
   - חצים בתוך טקסט עברי: `[\x{0590}-\x{05FF}].{0,40}[→←]|[→←].{0,40}[\x{0590}-\x{05FF}]`.
   - אזכור AI: `בינה מלאכותית|Claude|GPT|Anthropic|OpenAI|Gemini|מודל שפה|LLM|נוצר אוטומטית`. לא נמצא אזכור לכך שהאתר נבנה ב-AI (NEO AI הוא שם של תכונת השיחה).
3. קריאה ידנית של כל כותרת, פתיח, מצב ריק ומצב שגיאה בכל תבנית, ושל כל רכיבי המעטפת (סרגל, dock, לשוניות נייד, קרדיט, חלון החיפוש).
4. השוואה ל-`out/` הקיים (נבנה ב-2026-09-28 בשעה 23:15 מאותו עץ; לא הורצה בנייה חדשה): כותרות ו-meta כפי שהם יוצאים בפועל, וזיהוי טקסט שאינו מוצג.

**לא נבדק:** לא נפתח דפדפן; מיקום ויזואלי ואורך שורות לא נמדדו. הקביעה "מוצג" או "לא מוצג" מבוססת על `out/` בלבד.

**סיכום:** 148 שורות.

| קטגוריה | P1 | P2 | P3 | סה״כ |
|---|---|---|---|---|
| 1 · מקף ארוך כמפריד (כולל מקף כסימן לערך ריק) | 6 | 4 | 1 | 11 |
| 2 · כותרות, eyebrow וסלוגנים באנגלית | 9 | 15 | 1 | 25 |
| 3 · ניפוח, הסבר־יתר על אופן הבנייה, שלישיות, חזרות | 7 | 22 | 17 | 46 |
| 4 · תרגום מילולי, ערבוב עברית ואנגלית, RTL, טענות בלי מקור | 20 | 27 | 19 | 66 |
| **סה״כ** | **42** | **68** | **38** | **148** |

SAP=כן: 24 שורות (P1: 6, P2: 15, P3: 3). בעמודת הקטגוריה המספר הראשון הוא הקטגוריה העיקרית, ובסוגריים קטגוריות משניות. שורות שחוזרות בכמה קבצים רוכזו לשורה אחת עם כל המיקומים.

## טבלת מועמדים

| # | קובץ:שורה | טקסט נוכחי | קטגוריה | הצעה | SAP | עדיפות |
|---|---|---|---|---|---|---|
| 1 | cns/search/shell-client.tsx:969 (קרדיט במעטפת הנייד); וגם app/neo/page.tsx:343, app/neo/books/page.tsx:139, cns/workspace/module-workspace.tsx:530, cns/object/object-view.tsx:881, cns/object/object-aux-view.tsx:432, cns/books/book-hub.tsx:360, cns/erd/erd-workspace.tsx:2913, cns/data/tables-detail-view.tsx:870, cns/domain/domain-view.tsx:96 | Project NEO · CBC Israel · פותח על ידי סאלי חליף · Web Coding | 4 (+2) | Project NEO · CBC Israel · פיתוח: סאלי חליף · Web Coding. מוחלף רק "פותח על ידי"; "CBC Israel" נשאר עד אישור בעלות (ראו תגליות 1) | לא | P1 |
| 2 | cns/search/shell-client.tsx:880-883 (תחתית הסרגל, דסקטופ) | Sali Halif · Web Coding | 4 | סאלי חליף · Web Coding, באותו כתיב של הקרדיט בנייד ובעמודים | לא | P1 |
| 3 | components/Footer.tsx:17-19 (מעטפת ישנה, מוצג בעמוד הפרטיות) | Built by Sali Halif · Project NEO • SAP Knowledge Platform · מדיניות פרטיות | 2 | פיתוח: סאלי חליף · Project NEO · מדיניות פרטיות. בלי הסלוגן באנגלית, ומפריד אחד "·" במקום "•" | לא | P1 |
| 4 | components/Footer.tsx:25 (המחרוזת ב-lib/i18n.tsx:84, footer.offline) | 100% Offline · Static Export | 2 (+4) | זמין גם בלי חיבור לרשת. "100%" סותר את "פועלת ברובה" בעמוד הפרטיות | לא | P1 |
| 5 | components/app-shell.tsx:72-74 (כותרת המעטפת הישנה) | Built by Sali Halif (טקסט ו-aria-label) | 2 | פיתוח: סאלי חליף | לא | P1 |
| 6 | cns/nav-data.ts:169 | עיון · Reference | 2 | עיון | לא | P1 |
| 7 | cns/nav-data.ts:175-176 | IDocs / CDS Views (תוויות בסרגל; המונה באותה שורה אומר "תצוגות CDS") | 2 | IDoc / תצוגות CDS | לא | P1 |
| 8 | cns/nav-data.ts:217, 228; cns/nav-context/fallbacks.ts:56, 69; cns/dock/context.ts:77 | SAP Academy / Architecture Studio | 2 | אקדמיית SAP / סטודיו ארכיטקטורה (app/not-found.tsx:33 כבר כותב "סטודיו ארכיטקטורה"). אם אלה שמות מותג קבועים, להשאיר (תגליות 3) | לא | P1 |
| 9 | cns/nav-data.ts:199; cns/nav-context/fallbacks.ts:71; app/neo/ai/page.tsx:23 (title) | שאל את הספרייה | 4 | שאלה לספרייה. ציווי בלשון זכר, בעוד ששאר הניווט כתוב בשמות פעולה | לא | P1 |
| 10 | cns/nav-data.ts:72 (MOD_HE), 146, 283; cns/mod-var.ts:30; אותו ערך גם ב-cns/erd/model.ts:185, cns/learn/mod.ts:55, cns/data/tx-detail.ts:166, cns/books/books-data.ts:48 | PP-PI · תעשיות תהליכיות | 4 | PP-PI · ייצור תהליכי. הנוסח הנוכחי מתאר את הענף ולא את המודול; בכותרות אפשר "תכנון ייצור לתעשיות תהליכיות" | כן | P1 |
| 11 | cns/nav-data.ts:163 מול app/neo/s4-readiness/page.tsx:15 ו-cns/s4/s4-view.tsx:338 | בסרגל "מוכנות ל-S/4HANA", בכותרת העמוד "כיסוי תיעוד למעבר ל-S/4HANA" | 4 | כיסוי תיעוד ל-S/4HANA, בסרגל ובעמוד. העמוד עצמו מציין שהציון אינו מחליף SAP Readiness Check (s4-view.tsx:357) | כן | P1 |
| 12 | cns/nav-data.ts:174; cns/search/build.ts:27; app/neo/bapi/page.tsx:22; app/neo/bapi/[name]/page.tsx:23 | "אובייקטי פונקציה" (מונה בסרגל ו-title), "מודול פונקציה" (סוג תוצאה בחיפוש), "BAPIs ומודולי פונקציה" (title) | 4 | מונח אחד: "BAPI ו-FM" בתוויות קצרות, "BAPI ומודולי פונקציה" בכותרות, בלי הריבוי האנגלי "BAPIs" | כן | P1 |
| 13 | cns/search/shell-client.tsx:838 (title); cns/preview.tsx:69 | "—" עם "אין ספירה מגובה בנתוני הפרויקט" | 4 | אין מספר בנתוני הפרויקט. "מגובה" הוא תרגום מילולי של backed | לא | P1 |
| 14 | cns/search/shell-client.tsx:856-857 | עדיין לא נפתח אובייקט · הצגת המדף | 4 | עדיין לא נפתחו אובייקטים · הצגת האחרונים והמוצמדים. "המדף" לא מוכר למשתמש חדש | לא | P1 |
| 15 | cns/search/shell-client.tsx:717, 939 מול app/neo/page.tsx:327 | ⌘K (מוצג גם במחשבי Windows), ובעמוד הבית "Ctrl+K" | 4 | Ctrl K ב-Windows ו-⌘K ב-Mac. הקוד כבר מקבל את שניהם (shell-client.tsx:602) | לא | P1 |
| 16 | cns/search/shell-client.tsx:754-755; cns/search/command-surface.tsx:336, 344 | "… מתוך N יעדי ניווט" | 4 | "… מתוך N פריטי ניווט" | לא | P1 |
| 17 | cns/search/command-surface.tsx:340, 344 | "· הקלדה מצמצמת את הרשימה" / "· הקלדה מסננת את הרשימה" | 3 | ניסוח אחד וקצר: "אפשר להקליד כדי לסנן" | לא | P1 |
| 18 | cns/search/command-surface.tsx:380 | התוצאות נקראות מנתוני הפרויקט: טבלאות, שדות, טרנזקציות, אובייקטי פונקציה, ספרים ותהליכים. | 3 (+4) | החיפוש כולל טבלאות, שדות, טרנזקציות, BAPI ו-FM, ספרים ותהליכים. | לא | P1 |
| 19 | cns/search/command-surface.tsx:424 | תוכן האינדקס: בחירת משפחה מציגה את כל הרשומות שלה | 4 | מה יש באינדקס: בחירת סוג מציגה את כל הרשומות שלו | לא | P1 |
| 20 | cns/search/command-surface.tsx:443 | N רשומות, כולן מנתוני הפרויקט. | 3 | N רשומות באינדקס. | לא | P1 |
| 21 | cns/search/command-surface.tsx:448-450 | לא נמצאו תוצאות עבור «q» במודול X. החיפוש עובר על כל האינדקס, N רשומות מנתוני הפרויקט. | 3 | לא נמצאו תוצאות עבור «q» במודול X. החיפוש כולל את כל N הרשומות באינדקס. | לא | P1 |
| 22 | cns/search/command-index.ts:271 (מוצג בתחתית החיפוש, command-surface.tsx:513) | אובייקט: אין רשומת «אובייקט» נפרדת בנתוני הפרויקט: האובייקט הוא טבלת SAP עצמה, ולכן תוצאה מסוג «טבלה» נפתחת בעמוד האובייקט המלא. | 3 | אובייקט: אין סוג נפרד. תוצאה מסוג «טבלה» נפתחת בעמוד האובייקט. | לא | P1 |
| 23 | cns/search/command-surface.tsx:506 | Home End · קצוות | 4 | Home/End · ראשון ואחרון | לא | P1 |
| 24 | cns/search/command-surface.tsx:131; cns/data/tables-surface.tsx:210 (aria-label) | טעינת ההקשר של X למדף ההקשר / … למדף הניווט | 4 | הצגת X במדף ההקשר. שם אחד לאותו מדף, בלי "הקשר" פעמיים | לא | P1 |
| 25 | cns/dock/neo-dock.tsx:123 (aria-label) | עזרה בעמוד הזה: ההקשר הנוכחי ושתי סביבות השאלות | 4 | עזרה בעמוד: ההקשר הנוכחי והיכן אפשר לשאול | לא | P1 |
| 26 | cns/dock/neo-dock.tsx:152 | הבחירה נשמרת במכשיר הזה וחלה על כל מסכי NEO. הגופנים מותקנים במערכת ההפעלה, ולכן נטענים מיידית וללא חיבור לרשת. | 3 | הבחירה נשמרת במכשיר הזה וחלה על כל מסכי NEO. (בלי ההסבר הטכני על הגופנים) | לא | P1 |
| 27 | cns/dock/neo-dock.tsx:233 | חלונית זו מציגה את ההקשר הנוכחי בלבד ואינה עונה על שאלות. שאלות נענות באחת משתי הסביבות שלמטה. | 3 (+4) | כאן מוצג ההקשר של העמוד. לשאלות יש שתי אפשרויות: | לא | P1 |
| 28 | cns/dock/neo-dock.tsx:241 | שאל את הספרייה · תשובות מתוך 11 הספרים, עם מקורות | 4 | שאלה לספרייה · תשובות מספרי הספרייה, עם מקורות. "11" כתוב ביד; לגזור מהנתונים או להשמיט | לא | P1 |
| 29 | cns/mobile-nav.tsx:79 | "—" כמונה ריק בגיליון הניווט בנייד, בלי title | 1 | אותו הסבר נגיש כמו בדסקטופ ("אין מספר בנתוני הפרויקט"), או להסתיר את המונה | לא | P1 |
| 30 | app/layout.tsx:14-15 (DESC, בשימוש בשורות 23, 39, 46) | Interactive SAP PP, PP-PI and PM knowledge platform including architecture explorer, table explorer, business processes, SAP learning resources and enterprise documentation. | 2 | פלטפורמת ידע ל-SAP PP, PP-PI ו-PM: סייר ארכיטקטורה, חוקר טבלאות, תהליכים עסקיים ומקורות למידה. זהו ה-og:description וה-twitter:description של כל עמודי NEO (נבדק ב-out/neo/index.html וב-out/neo/tables/index.html) | לא | P1 |
| 31 | app/layout.tsx:41 (alt של og.png) | SAP by Sali — Project NEO · Interactive SAP Knowledge Platform | 1 (+2) | SAP by Sali · Project NEO · פלטפורמת ידע ל-SAP | לא | P1 |
| 32 | app/layout.tsx:92, 108 (JSON-LD) | Project NEO — SAP Knowledge Platform / Project NEO — SAP by Sali | 1 | Project NEO · SAP Knowledge Platform / Project NEO · SAP by Sali | לא | P1 |
| 33 | app/layout.tsx:19-21, 38; app/neo/layout.tsx:23; app/privacy/page.tsx:6 | כותרות בפועל (out/): "SAP by Sali \| Project NEO · מפת הידע ל-SAP S/4HANA" ב-/neo/; "טבלאות SAP · Project NEO" בעמודים הפנימיים, בלי קידומת; "SAP by Sali \| מדיניות פרטיות · SAP by Sali" בפרטיות; og:title "SAP by Sali \| Project NEO" בכל עמוד | 4 (+3) | תבנית אחת לכל האתר, למשל "<שם העמוד> · Project NEO". ב-title של הפרטיות "מדיניות פרטיות" בלבד, כי התבנית מוסיפה את המותג | לא | P1 |
| 34 | app/privacy/page.tsx:7 (description) | מדיניות הפרטיות של SAP by Sali · Project NEO — אפליקציה שאינה אוספת מידע אישי, ללא חשבונות, ללא עוקבים, ופועלת מקומית במכשיר. | 1 (+4) | מדיניות הפרטיות של SAP by Sali · Project NEO: האפליקציה אינה אוספת מידע אישי, אין בה חשבונות משתמש או כלי מעקב, והנתונים נשמרים במכשיר. | לא | P1 |
| 35 | app/manifest.ts:13 | Interactive SAP PP, PP-PI and PM knowledge platform — architecture explorer, table explorer, business processes, learning resources and enterprise documentation. | 1 (+2) | פלטפורמת ידע ל-SAP PP, PP-PI ו-PM: סייר ארכיטקטורה, חוקר טבלאות, תהליכים עסקיים ומקורות למידה. | לא | P1 |
| 36 | app/manifest.ts:36-39 (shortcuts) | "SAP Academy" ו-"Academy", "Architecture Studio" ו-"Studio", short_name "Knowledge" ו-"Tables" לשמות עבריים, והתיאור "כל טבלאות ה-SAP בהיקף" | 2 (+4) | שמות וקיצורים בעברית לפי החלטת המותג (שורה 8); "טבלאות SAP של הפרויקט" במקום "בהיקף" | לא | P1 |
| 37 | app/manifest.ts:42 | מסך הבית — קוקפיט NEO | 1 | מסך הבית · קוקפיט NEO | לא | P1 |
| 38 | app/neo/idoc/page.tsx:19; app/neo/cds/page.tsx:14; app/neo/studio/page.tsx:12-13; app/neo/academy/page.tsx:16 | "IDocs · Project NEO", "CDS Views · Project NEO", "Architecture Studio · Project NEO", "SAP Academy · Project NEO"; ובתיאור הסטודיו "BAPIs, IDocs, CDS Views" | 2 | "קטלוג IDoc", "תצוגות CDS", "סטודיו ארכיטקטורה", "אקדמיית SAP"; ובתיאור "BAPI, IDoc, תצוגות CDS" | לא | P1 |
| 39 | app/neo/s4-readiness/page.tsx:16 | ציון מוכנות לכל מודול ו-N נושאי שינוי ECC → S/4HANA, עם סטטוס, Fiori, CDS והשפעת המעבר. | 4 | ציון כיסוי תיעוד לכל מודול ו-N נושאי שינוי במעבר מ-ECC ל-S/4HANA: סטטוס, Fiori, CDS והשפעת המעבר. | כן | P1 |
| 40 | app/neo/fiori-apps/page.tsx:14 | …והטרנזקציות ב-SAP GUI שכל יישום מחליף. | 4 | …והטרנזקציות ב-SAP GUI הקשורות לכל יישום. הפתיח בעמוד (fiori-data.ts:138) אומר "מובילה או קשורה", לא "מחליף" | כן | P1 |
| 41 | app/neo/erd/page.tsx:16 | …קרדינליות וניסוחי JOIN כפי שנרשמו בתיעוד. | 4 (+3) | …קרדינליות ותנאי JOIN מתיעוד הפרויקט. | כן | P1 |
| 42 | app/neo/knowledge/[slug]/page.tsx:27; app/neo/best-practices/[slug]/page.tsx:28; app/neo/incidents/[slug]/page.tsx:26 | description שנחתך ב-slice(0, 180), לעתים באמצע מילה ובלי סימן השמטה | 4 | חיתוך בגבול מילה והוספת "…" | לא | P1 |
| 43 | app/privacy/page.tsx:32 | SAP by Sali · Project NEO — עודכן {UPDATED} | 1 | SAP by Sali · Project NEO · עודכן ב-{UPDATED} | לא | P2 |
| 44 | app/privacy/page.tsx:37 | …האפליקציה תוכננה מהיסוד לפרטיות מלאה: היא אינה אוספת, אינה שומרת בשרת ואינה משתפת מידע אישי כלשהו. | 3 | …האפליקציה אינה אוספת מידע אישי, אינה שומרת אותו בשרת ואינה משתפת אותו. | לא | P2 |
| 45 | app/privacy/page.tsx:42 | אף לא אחד מהמידע האישי שלך. | 4 | שום מידע אישי. | לא | P2 |
| 46 | app/privacy/page.tsx:46 | …ב-localStorage של הדפדפן/המכשיר — למשל: התקדמות בלימוד, סימניות, ומצב תצוגה. | 1 | …ב-localStorage של הדפדפן, למשל התקדמות בלימוד, סימניות ומצב תצוגה. | לא | P2 |
| 47 | app/privacy/page.tsx:49 | עוקבים, אנליטיקה ופרסום | 4 | כלי מעקב, אנליטיקה ופרסום. "עוקבים" פירושו followers | לא | P2 |
| 48 | app/privacy/page.tsx:58 | …לצורך גישה מהירה ואופליין… | 4 | …לגישה מהירה, גם בלי חיבור לרשת… | לא | P2 |
| 49 | app/privacy/page.tsx:66 | …עם מדיניות אבטחת תוכן (CSP) הדוקה, HSTS, והגבלת הרשאות מלאה. | 4 | …עם מדיניות אבטחת תוכן (CSP), HSTS והגבלת הרשאות דפדפן. הטענה נתמכת ב-vercel.json:24-31, אבל "מלאה" מגזים: fullscreen=(self) מותר | לא | P2 |
| 50 | app/neo/page.tsx:146-150 | SAP Enterprise Knowledge Platform · CBC Israel | 2 | PM · PP-PI · S/4HANA. בלי סלוגן באנגלית; "CBC Israel" ממתין לאישור בעלות | לא | P2 |
| 51 | app/neo/page.tsx:157-159 | פלטפורמת ידע מקצועית למודולי PM ו-PP-PI: … זמינה במלואה גם ללא חיבור לרשת. | 3 (+4) | תיעוד מקצועי למודולי PM ו-PP-PI: אובייקטים עסקיים, טבלאות, טרנזקציות, קשרי נתונים והמעבר מ-ECC ל-S/4HANA. זמין גם בלי חיבור לרשת. "במלואה" סותר את עמוד הפרטיות ("ברובה") | לא | P2 |
| 52 | app/neo/page.tsx:187 | המשך ללמוד | 4 | המשך הלמידה | לא | P2 |
| 53 | app/neo/page.tsx:272-274 | לכל טבלה מוצמדת הערת ה-S/4HANA מתיעוד הפרויקט, כולל טבלה או טרנזקציה חלופית במקום שבו התיעוד מציין אחת. טבלה ללא סיווג בתיעוד נשארת ללא תווית. | 3 | לכל טבלה מוצגת הערת S/4HANA מתיעוד הפרויקט, וכשצוינה חלופה, גם הטבלה או הטרנזקציה החלופית. טבלה שלא סווגה מוצגת בלי תווית. | כן | P2 |
| 54 | app/neo/page.tsx:298 | הסיווג המלא עם החלופות המתועדות: בקוקפיט המעבר. | 4 | הסיווג המלא והחלופות המתועדות נמצאים בקוקפיט המעבר. | לא | P2 |
| 55 | app/neo/page.tsx:327 | חיפוש גלובלי בכל עמודי הפלטפורמה: Ctrl+K | 4 | Ctrl+K פותח חיפוש מכל עמוד | לא | P2 |
| 56 | app/neo/page.tsx:225, 229; cns/s4/s4-view.tsx:342, 367, 381, 399 | "מוכנות למעבר", "מוכנות לפי מודול", "ציון מוכנות N אחוז", "ציון המוכנות אינו זמין" | 4 | "כיסוי תיעוד למעבר", "כיסוי תיעוד לפי מודול", "ציון כיסוי N אחוז", כמו כותרת העמוד (שורה 11) | כן | P2 |
| 57 | cns/workspace/workspace-header.tsx:64-66 | CBC ISRAEL · PROJECT NEO · סביבת עבודה · מודול | 2 | סביבת עבודה · מודול. "CBC Israel" ממתין לאישור | לא | P2 |
| 58 | cns/workspace/workspace-data.ts:707-708 | ציוד, מיקומים פונקציונליים, הודעות תחזוקה והזמנות תחזוקה, כפי שהם מתועדים בתיעוד הטכני של הפרויקט. כל מספר בעמוד נגזר מהתיעוד. (ובמבנה זהה ל-PP-PI) | 3 | ציוד, מיקומים פונקציונליים, הודעות תחזוקה והזמנות תחזוקה, לפי התיעוד הטכני של הפרויקט. ובאותו מבנה ל-PP-PI; רשימת האובייקטים לא משתנה | כן | P2 |
| 59 | cns/workspace/workspace-header.tsx:36; cns/workspace/module-workspace.tsx:389; cns/workspace/workspace-map.tsx:221; cns/workspace/workspace-s4.tsx:108, 215 | טבלאות ייחודיות | 4 | טבלאות שונות. "ייחודי" פירושו מיוחד; כאן הכוונה לספירה בלי כפילויות, והמספר לא משתנה | לא | P2 |
| 60 | cns/workspace/workspace-header.tsx:47; cns/workspace/workspace-iface.tsx:57-58 | "N אובייקטים אחרי נרמול" / "…המצטמצמות ל-N אובייקטים לאחר נרמול השמות" | 3 | "N אובייקטים שונים" / "…שהן N אובייקטים שונים" | לא | P2 |
| 61 | cns/workspace/module-workspace.tsx:389-390 | …שם הטבלה פותח את עמוד האובייקט המלא; החץ בסוף השורה פותח את פירוט הרשומה כאן, באותו עמוד. | 3 | …לחיצה על שם טבלה פותחת את עמוד האובייקט, והחץ פותח פירוט בשורה. | לא | P2 |
| 62 | cns/workspace/module-workspace.tsx:288-304 | כותרות הפרקים: kicker "מפת המודול" וכותרת "מפת המודול: נושאים, תהליך עסקי ומחלקות אובייקט"; "קונפיגורציה, קוד מותאם וכלי יישום"; "ספרים, קורסים ופעילות אחרונה"; "ממשקים, תצוגות CDS ויישומי Fiori של המודול" | 3 | כותרות קצרות, בלי שלישיות ובלי לחזור על ה-kicker: "נושאים ותהליך", "קונפיגורציה וקוד מותאם", "ספרים וקורסים", "ממשקים, CDS ו-Fiori" | לא | P2 |
| 63 | cns/workspace/workspace-build.tsx:36, 40, 44 | "…כפי שנכתבו בגיליון." / "…כפי שנרשמו בגיליון." (שלוש פעמים) | 3 | להשמיט את הסיומת; המשפט "הגיליונות מוצגים כלשונם" בשורה 71 כבר אומר זאת | כן | P2 |
| 64 | cns/workspace/workspace-context.tsx:70 | תיעוד המודול אינו מציין קרדינליות לאף אחד מ-N הקשרים. הקשר נרשם ללא קרדינליות, וכך הוא מוצג. | 3 | תיעוד המודול אינו מציין קרדינליות לאף אחד מ-N הקשרים. | לא | P2 |
| 65 | cns/workspace/workspace-table.tsx:77-79 | לא נמצאו תוצאות התואמות לסינון שנבחר. התיעוד כולל N רשומות. הסינון מצמצם את הרשימה בלבד. | 3 | לא נמצאו רשומות שתואמות לסינון. התיעוד כולל N רשומות. | לא | P2 |
| 66 | cns/workspace/workspace-s4.tsx:108-109 | N מתוך N הטבלאות הייחודיות של המודול, מסומנות כמשתנות מהותית במעבר ל-S/4HANA. כל אחת מהן מוצגת כאן במלואה, עם מקור ההכרעה. | 4 (+3) | N מתוך N טבלאות המודול מסומנות כמשתנות מהותית במעבר ל-S/4HANA. לכל אחת מוצג מקור ההכרעה. (פסיק מיותר בין הנושא לנשוא) | כן | P2 |
| 67 | cns/data/tables-surface.tsx:372 | תיעוד טכני · Data Dictionary | 2 | תיעוד טכני | לא | P2 |
| 68 | cns/data/tables-surface.tsx:379-384 | N טבלאות SAP מתיעוד המקור של PM ו-PP-PI, עם N שדות מתועדים, N קשרי ER ו-N טרנזקציות. לכל אחת מ-N הטבלאות עמוד פרטים משלה: שדות ומפתחות, קשרים ו-JOIN, טרנזקציות, תצוגות CDS והמעבר ל-S/4HANA. | 3 | N טבלאות SAP מתיעוד PM ו-PP-PI: N שדות, N קשרי ER ו-N טרנזקציות. לכל טבלה עמוד פרטים עם שדות, קשרים, טרנזקציות, CDS והמעבר ל-S/4HANA. | לא | P2 |
| 69 | cns/data/tables-surface.tsx:516; cns/reference/ref-surface.tsx:454; cns/s4/s4-catalog.tsx:100; cns/domain/domain-hub-list.tsx:137 | לא נמצאו X מתאימים. נסה חיפוש אחר או נקה מסננים. | 4 | לא נמצאו X מתאימים. אפשר לשנות את החיפוש או לנקות את המסננים. | לא | P2 |
| 70 | cns/data/transactions-surface.tsx:379 | קטלוג טרנזקציות · Transaction Catalog | 2 | קטלוג טרנזקציות | לא | P2 |
| 71 | cns/data/transactions-surface.tsx:384-388 | N טרנזקציות SAP מאומתות מ-N מודולים בקטלוג אחד, מתוכן N מתועדות לעומק. כל שורה נפתחת לעמוד הטרנזקציה המלא. | 4 (+3) | N טרנזקציות SAP מ-N מודולים בקטלוג אחד; N מהן מתועדות לעומק. כל שורה נפתחת לעמוד הטרנזקציה. "מאומתות" לכל הקטלוג דורש בירור (תגליות 6) | לא | P2 |
| 72 | cns/data/transactions-surface.tsx:561-562 | הקטלוג מאחד ארבעה מקורות מאומתים לרשימה אחת, ללא כפילויות. קוד ללא כותרת אנגלית במקור מוצג בלעדיה. | 4 | הקטלוג מאחד את מקורות הפרויקט לרשימה אחת, בלי כפילויות. "ארבעה" כתוב ביד; לגזור את המספר מהקוד או להשמיט | לא | P2 |
| 73 | cns/data/tables-detail-view.tsx:57; cns/object/object-view.tsx:42; cns/workspace/workspace-s4.tsx:57 | "מבוסס על ידע Simplification List המתוחזק בפרויקט" / "מבוסס על Simplification List המתוחזק בפרויקט" | 4 | "מבוסס על ה-Simplification List של הפרויקט", באותו נוסח בשלושת המקומות, בלי "ידע" ו"מתוחזק" | כן | P2 |
| 74 | cns/data/tables-detail-view.tsx:154; cns/data/tx-detail-view.tsx:135; cns/reference/ref-detail-view.tsx:195; cns/reference/ref-surface.tsx:317; cns/best-practices/bp-view.tsx:296; cns/object/object-return.tsx:23 | לא נשמר מסלול הגעה בביקור הזה | 4 | אין עמוד קודם בביקור הזה (או להסתיר את ההערה) | לא | P2 |
| 75 | cns/data/tables-detail-view.tsx:306 | עמוד הטבלה (כאן): השדות, המפתחות, הקשרים ומעמד ה-S/4HANA של הטבלה מתוך הבלופרינט. עמוד האובייקט: אותה טבלה בהקשר הרחב שלה: תהליכים, טרנזקציות, פונקציות, תקלות וספרים. | 3 | כאן: שדות, מפתחות, קשרים ומעמד S/4HANA לפי הבלופרינט. בעמוד האובייקט: אותה טבלה בהקשר של תהליכים, טרנזקציות, פונקציות, תקלות וספרים. | לא | P2 |
| 76 | 54 מופעים ב-22 קבצים; הריכוז הגבוה: cns/data/tables-detail-view.tsx (13), cns/erd/erd-sheet.tsx (8), cns/reference/bapi-data.ts (4), cns/erd/erd-workspace.tsx (3), cns/learn/knowledge-surface.tsx (3), cns/reference/idoc-data.ts (3) | לא קיים תיעוד מאומת במאגר | 3 | אין תיעוד מאומת. הצהרת הפער נשארת, בנוסח קצר ואחיד בכל האתר | לא | P2 |
| 77 | cns/data/tx-detail-view.tsx:408-409; cns/reference/bapi-data.ts:585-586; cns/reference/fiori-data.ts:167-168, 324-325; cns/reference/cds-data.ts:327-328; cns/reference/idoc-data.ts:155, 368-369; cns/data/tables-detail-view.tsx:865 | "כל שדה בעמוד זה נלקח מ… שדה שאינו מתועד אינו מוצג, או מסומן במפורש … מספר SAP Note מוצג רק כאשר הוא קיים ברשומה עצמה." | 3 | שורת מקור אחת וקצרה: "מקור: <שם המקור>. שדה שלא תועד מסומן בעמוד." בלי המשפט על מספרי SAP Note | לא | P2 |
| 78 | cns/data/tables-detail-view.tsx:267, 394, 445; cns/object/object-view.tsx:106, 352, 401; cns/object/object-aux-view.tsx:255; cns/object/object-orbit.tsx:610; cns/erd/erd-inspector.tsx:463; cns/erd/erd-workspace.tsx:2250 | ניסוחי JOIN / ניסוח JOIN | 4 | תנאי JOIN | כן | P2 |
| 79 | cns/reference/bapi-data.ts:265; cns/reference/cds-data.ts:141; cns/reference/enh-data.ts:139; cns/reference/fiori-data.ts:133; cns/reference/idoc-data.ts:127 | "קטלוג BAPI ו-FM · Function Catalog", "קטלוג CDS Views · CDS Catalog", "קטלוג הרחבות · Enhancement Catalog", "קטלוג יישומי Fiori · Fiori Catalog", "קטלוג IDoc · IDoc Catalog" | 2 | "קטלוג BAPI ו-FM", "קטלוג תצוגות CDS", "קטלוג הרחבות", "קטלוג יישומי Fiori", "קטלוג IDoc" | לא | P2 |
| 80 | cns/reference/cds-data.ts:142; cns/reference/idoc-data.ts:128; cns/reference/bapi-data.ts:266 (כותרות H1) | CDS Views / IDocs / BAPIs ומודולי פונקציה | 2 | תצוגות CDS / הודעות IDoc / BAPI ומודולי פונקציה | לא | P2 |
| 81 | cns/reference/bapi-data.ts:269-272 | …לצדם N מושגים תהליכיים שהבלופרינט מונה בעמודת הפונקציות; הם מסומנים ככאלה ואינם נספרים כפונקציות. | 3 | …בנוסף מוצגים N מושגים תהליכיים מעמודת הפונקציות בבלופרינט, שאינם נספרים כפונקציות. | לא | P2 |
| 82 | cns/reference/bapi-data.ts:352 | מושג תהליכי שהבלופרינט מונה בעמודת הפונקציות של הטבלאות — לא מודול פונקציה ולא BAPI. אין לו מזהה fm: והוא אינו נספר בקטלוג הפונקציות; התוכן נשמר כמידע תהליכי. | 1 (+3) | מושג תהליכי מעמודת הפונקציות בבלופרינט. אינו מודול פונקציה ואינו BAPI, ולכן אינו נספר בקטלוג הפונקציות. (בלי המזהה הפנימי "fm:") | כן | P2 |
| 83 | cns/reference/cds-data.ts:146 | לכל תצוגה מוצגים טבלאות ה-ECC שהיא מכסה, … | 4 | לכל תצוגה מוצגות טבלאות ה-ECC שהיא מכסה, … (התאמת מין) | לא | P2 |
| 84 | cns/reference/cds-data.ts:294 | צד ריק בשרשרת = לא קיימת בתיעוד רשומה בצד זה; לא הושלם בניחוש. | 3 | צד ריק בשרשרת: אין לו רשומה בתיעוד. | לא | P2 |
| 85 | cns/reference/enh-data.ts:143-145 | …ו-N הרחבות בשם מקטלוג PM ו-PP-PI משויכות לטכניקות בעלות אותו שם מנגנון. | 4 | …ו-N הרחבות ספציפיות מקטלוג PM ו-PP-PI, משויכות לטכניקה לפי המנגנון שלהן. | כן | P2 |
| 86 | cns/reference/fiori-data.ts:137-139 | N יישומי SAP Fiori המתועדים בפרויקט: מזהה יישום, תפקיד עסקי, קטלוג, שירות OData, תצוגת CDS והטרנזקציות ב-SAP GUI הקשורות לכל יישום (מובילה או קשורה, כפי שספריית ה-Fiori מציינת). זהו הצד של S/4HANA מול מסכי ה-ECC שבתיעוד הטכני. | 3 | N יישומי SAP Fiori מתועדים: מזהה, תפקיד עסקי, קטלוג, שירות OData, תצוגת CDS וטרנזקציות SAP GUI קשורות. אלה המסכים של S/4HANA מול מסכי ה-ECC שבתיעוד. | כן | P2 |
| 87 | cns/s4/s4-view.tsx:141 | מרכז S/4HANA · TRANSFORMATION | 2 | מרכז S/4HANA | לא | P2 |
| 88 | cns/s4/s4-view.tsx:336 | כיסוי תיעוד למעבר · READINESS COVERAGE | 2 | כיסוי תיעוד למעבר | לא | P2 |
| 89 | cns/s4/s4-view.tsx:462 | קוקפיט המעבר · MIGRATION COCKPIT | 2 | קוקפיט המעבר | לא | P2 |
| 90 | cns/s4/s4-view.tsx:467-468 | …הפניות ל-N טבלאות מקור נבדלות ב-ECC. | 4 | …הפניות ל-N טבלאות מקור שונות ב-ECC. | כן | P2 |
| 91 | app/neo/page.tsx:111-113; cns/s4/s4-catalog.tsx:19-22; cns/evidence/status-pill.tsx:35-41; cns/studio/studio-view.tsx:55; cns/erd/erd-workspace.tsx:193-195; cns/domain/domain-data.ts:113-116 | שש קבוצות תוויות למעמד S/4HANA: "מותאם/הוחלף/הוסר"; "בוטל/הוחלף/השתנה/נשאר"; "חדש ב-S/4HANA/נשמר/משתנה/מוחלף/הוסר"; "ללא החלפה מתועדת/הוחלפה/הוסרה"; "משתנה/מוחלפת/הוסרה/חדשה"; "ללא שינוי/משתנה ב-S/4HANA/מוחלף/הוסר או אינו אסטרטגי" | 4 | מילון אחד לכל האתר (למשל: נשמר · משתנה · מוחלף · הוסר · חדש ב-S/4HANA), והמיפוי מכל מקור ייקבע בסקירת התוכן (תגליות 12) | כן | P2 |
| 92 | cns/learn/academy-surface.tsx:154; cns/learn/course-view.tsx:99; cns/learn/lesson-view.tsx:356 | SAP Academy (כותרת H1 ו-eyebrow) | 2 | אקדמיית SAP, לפי החלטת המותג (שורה 8) | לא | P2 |
| 93 | cns/learn/academy-surface.tsx:161 | מה תלמד: מודלי הנתונים של PM ו-PP-PI, הטרנזקציות והתהליכים העסקיים, והמעבר מ-ECC ל-S/4HANA — קורס אחר קורס, שיעור אחר שיעור. צפייה בשיעור נרשמת כחשיפה; הבנה נבדקת ב[תרגול ובדיקת ידע] | 1 (+3, 4) | מה לומדים כאן: מודלי הנתונים של PM ו-PP-PI, טרנזקציות ותהליכים עסקיים, והמעבר מ-ECC ל-S/4HANA. צפייה בשיעור נרשמת כהתקדמות, ואת ההבנה בודקים ב[תרגול ובדיקת ידע]. | לא | P2 |
| 94 | cns/learn/academy-surface.tsx:78, 223, 295; cns/learn/lesson-view.tsx:367; app/neo/academy/page.tsx:17 | אורך מוצהר | 4 | משך לפי הקורס | לא | P2 |
| 95 | cns/learn/academy-surface.tsx:299; cns/learn/course-view.tsx:241, 247, 250-253; cns/learn/lesson-view.tsx:402, 451; cns/learn/cert-surface.tsx:300-301; cns/learn/concept-view.tsx:183; cns/learn/incident-view.tsx:336; cns/learn/incidents-surface.tsx:381; cns/learn/knowledge-surface.tsx:433; cns/best-practices/bp-view.tsx:176, 180, 462 | נתיבי קוד ומפתחות אחסון בגוף העמוד: neo:academy:v2, lib/academy/model.ts, data/academy/lessons, lib/cert/generate.ts, neo:cert, data/concepts.ts, data/troubleshooting.ts, data/centers/*, lib/evidence, data/best-practices, /neo/academy/ | 3 | שם המקור במילים, בלי נתיב: "מקור: קטלוג התקלות של הפרויקט", "ההתקדמות נשמרת במכשיר בלבד." | לא | P2 |
| 96 | cns/learn/knowledge-surface.tsx:282; cns/centers/centers-view.tsx:57; cns/domain/domain-view.tsx:66 | "שלושה שערים, שלושה תפקידים: מרכז הידע מסביר מה זה…; מרכזי הידע מסבירים איך עושים…; התחומים העסקיים מראים איפה זה קורה…", ובגרסאות "כאן: איך עושים." ו-"כאן: איפה זה קורה בתהליך." | 3 | משפט הפניה פשוט, בלי סיסמה: "הסברי מושגים נמצאים במרכז הידע, שלבי ביצוע ורשימות בדיקה במרכזי העבודה, והמיקום בתהליך בתחומים העסקיים." | לא | P2 |
| 97 | cns/learn/knowledge-surface.tsx:276-279 | N רשומות בשני גופי ידע: N מושגי SAP, לכל אחד הסבר עסקי, הסבר טכני והשוואה בין ECC ל-S/4HANA, ולצידם N נושאי עבודה ב-N מרכזים (N מקטעי תוכן). | 4 | N רשומות: N מושגי SAP (הסבר עסקי, הסבר טכני והשוואת ECC ל-S/4HANA) ו-N נושאי עבודה ב-N מרכזים. | לא | P2 |
| 98 | cns/best-practices/bp-view.tsx:136 | …(מטרה, טריגר, … וקישורים צולבים); שדה שהמאגר אינו מתעד מוצג כפער ולא מושלם מהדמיון. | 3 | …; שדה שלא תועד מוצג כפער. | לא | P2 |
| 99 | cns/best-practices/bp-view.tsx:138 | הקטלוג מורחב בהדרגה לפי משפחות, וכל שיטה תצורף למקורות SAP רשמיים בשלב האיסוף. | 3 | להשמיט (תוכנית עבודה פנימית), או: "מקורות SAP רשמיים יתווספו בהמשך." | לא | P2 |
| 100 | cns/best-practices/bp-view.tsx:265 | טרם אותרה ואומתה הפניה רשמית של SAP לתהליך זה; היא תתווסף בשלב האיסוף ולא מושלמת מהזיכרון. | 3 (+4) | טרם נמצאה הפניה רשמית של SAP לתהליך זה. | לא | P2 |
| 101 | cns/centers/centers-view.tsx:48 | מרכזי ידע · CENTERS | 2 | מרכזי עבודה (ראו שורה 102) | לא | P2 |
| 102 | app/neo/centers/page.tsx:11; cns/centers/centers-view.tsx:50, מול cns/learn/knowledge-surface.tsx:230, 317 | "מרכזי ידע" ו-"מרכזי הידע של הפרויקט" מול "מרכזי עבודה" לאותו גוף תוכן, לצד "מרכז הידע" | 4 | שם אחד: "מרכזי עבודה", כדי להבדיל מ"מרכז הידע" | לא | P2 |
| 103 | cns/domain/domain-view.tsx:56 | תחומים עסקיים · BUSINESS DOMAINS | 2 | תחומים עסקיים | לא | P2 |
| 104 | cns/erd/erd-workspace.tsx:1778 | ENTITY RELATIONSHIP | 2 | להשמיט, או "תרשים ישויות וקשרים" | לא | P2 |
| 105 | cns/erd/erd-inspector.tsx:278, 297; cns/erd/erd-sheet.tsx:239, 254 | קשר המסומן CARDINALITY_NOT_VERIFIED נרשם במילון הפרויקט עם הורה, ילד ושדות ה-JOIN…; PK/FK או Association לא אומתו מול מקור SAP רשמי. הקו מצויר מקווקו כתלות מתועדת ולא כיחס מחייב. | 4 (+3) | קשר בלי קרדינליות מאומתת: רשום בתיעוד הפרויקט (אב, בן ושדות JOIN כשיש), אבל PK/FK או Association לא אומתו מול מקור SAP רשמי. הקו המקווקו מסמן תלות מתועדת, לא יחס מחייב. בלי קוד המערכת באנגלית, ו"אב/בן" כמו בשאר האתר | כן | P2 |
| 106 | cns/erd/erd-workspace.tsx:2994 | תג הקרדינליות על הקו מוצג כלשונו מהמאגר: 1:1 · 1:N · N:1 · N:N. … | 4 | לעטוף את הערכים בבידוד LTR (bdi או dir="ltr"). בפסקה RTL הצירוף "1:N" מוצג חזותית כ-"N:1" | כן | P2 |
| 107 | app/neo/books/page.tsx:45 | CBC ISRAEL · PROJECT NEO · מדף הספרים | 2 | מדף הספרים. "CBC Israel" ממתין לאישור | לא | P2 |
| 108 | cns/studio/studio-view.tsx:296 | Architecture Studio (H1) | 2 | סטודיו ארכיטקטורה, לפי החלטת המותג (שורה 8) | לא | P2 |
| 109 | cns/chat/general-chat.tsx:199 | …לשאלות על ספרי הספרייה משמש המסך שאל את הספרייה. | 4 | …לשאלות על ספרי הספרייה יש מסך נפרד: «שאלה לספרייה». | לא | P2 |
| 110 | cns/books/books-data.ts:46-55; cns/learn/mod.ts:52-62; cns/data/tx-detail.ts:164-179 | שמות שונים לאותו מודול: MM "רכש ואספקה" / "ניהול חומרים" / "חומרים"; EWM "ניהול מחסן" / "ניהול מחסן מורחב"; PP/DS "תכנון מתקדם" / "תכנון ותזמון מפורט"; QM "ניהול איכות" / "איכות"; BASIS "בסיס" | 4 | מילון שמות מודולים אחד, למשל MM ניהול חומרים, EWM ניהול מחסן מורחב, PP/DS תכנון ותזמון מפורט, Basis בלי תרגום | כן | P2 |
| 111 | "כלשונ…" 19 מופעים ב-8 קבצים, "כפי שנרשמ/שנכתב/שתועד…" 24 מופעים; למשל cns/object/object-view.tsx:279, 516, 592, 603, 640; cns/data/tables-detail-view.tsx:398, 407, 498, 547, 585, 601; cns/workspace/workspace-s4.tsx:175, 201, 205; cns/workspace/workspace-ops.tsx:85; cns/domain/domain-view.tsx:200, 295, 317, 361 | "…כלשונן." / "…כפי שנרשמה." / "…כפי שתועדו במאגר." | 3 | לומר פעם אחת בעמוד ("הערות המקור מובאות כלשונן") ולהסיר מכותרות ומפתיחי פרקים | לא | P3 |
| 112 | cns/data/tables-detail-view.tsx:333, 397, 697, 772; cns/object/object-view.tsx:356; cns/reader/neo-reader.tsx:1014; cns/learn/concept-view.tsx:183; cns/learn/knowledge-surface.tsx:434; cns/learn/cert-surface.tsx:301 | "…נקרא/נקראים/נקראת מ…" (תרגום של read from) | 4 | "לפי…" או "מתוך…", למשל "כיוון הקשר לפי התיעוד" | לא | P3 |
| 113 | cns/data/tables-detail-view.tsx:667; cns/object/object-view.tsx:689; cns/workspace/workspace-iface.tsx:120; cns/workspace/workspace-s4.tsx:244; cns/reference/enh-data.ts:275; cns/reference/fiori-data.ts:36 | "מיפוי מתוחזק", "רשומה מתוחזקת ידנית", "Simplification List המתוחזק בפרויקט" | 4 | "מיפוי של הפרויקט", "רשומה שנערכה ידנית", "ה-Simplification List של הפרויקט" | לא | P3 |
| 114 | cns/workspace/module-workspace.tsx:390; cns/workspace/workspace-context.tsx:81; cns/workspace/workspace-map.tsx:188; cns/workspace/workspace-table.tsx:326; cns/erd/erd-workspace.tsx:2953; cns/shelf.tsx:121, 128; cns/search/command-surface.tsx:156 | "עמוד האובייקט המלא" / "ההקשר המלא" | 3 | "עמוד האובייקט" / "ההקשר". "המלא" לא מוסיף מידע | לא | P3 |
| 115 | cns/workspace/workspace-s4.tsx:244 | …הרשימה כוללת רק מזהים שקיימים בתיעוד הפרויקט. | 3 | להשמיט את המשפט | כן | P3 |
| 116 | cns/workspace/workspace-map.tsx:220 | מחלקת האובייקט נגזרת משם הטבלה, באותו סיווג המשמש גם את ה-ERD ואת מסך הבית. | 3 | מחלקת האובייקט נקבעת לפי שם הטבלה. | לא | P3 |
| 117 | cns/workspace/workspace-map.tsx:139 | הצג N טבלאות של הנושא | 4 | הצגת N טבלאות הנושא | לא | P3 |
| 118 | cns/data/transactions-surface.tsx:357 | רשימת הנפוצות נגזרת מספירת ההפניות בתוך המאגר. | 3 | הנפוצות: לפי מספר ההפניות במאגר. | לא | P3 |
| 119 | cns/data/tables-surface.tsx:547 מול cns/data/tables-detail-view.tsx:865 | שדה שאינו מתועד מוצג כ"לא צוין" / כ"לא קיים תיעוד מאומת במאגר" | 4 | נוסח ריק אחד לכל האתר (שורה 76) | לא | P3 |
| 120 | cns/data/tables-surface.tsx:86 | צומת קשרים (6+) | 4 | צומת קשרים (6 ומעלה). בפסקה RTL "6+" עלול להיראות "+6" | לא | P3 |
| 121 | cns/data/tx-detail-view.tsx:215 | רשומת הטרנזקציה העוקבת מצהירה על X כטרנזקציה שהוחלפה. הקשר מוצהר במאגר. | 4 | לפי המאגר, הטרנזקציה העוקבת מחליפה את X. | כן | P3 |
| 122 | cns/reference/bapi-data.ts:302-303 | …ומשכבות ההעשרה המאומתות של הפרויקט… | 4 | …ומהרשומות המורחבות של הפרויקט… | לא | P3 |
| 123 | cns/evidence/evidence-block.tsx:31 | פריט פישוט (Simplification Item) | 4 | Simplification Item | כן | P3 |
| 124 | cns/reference/ref-surface.tsx:193 | משתנה ב-S/4HANA תחילה | 4 | המשתנים ב-S/4HANA קודם | לא | P3 |
| 125 | cns/s4/s4-view.tsx:114; cns/centers/centers-view.tsx:209; cns/domain/domain-view.tsx:407; cns/learn/lesson-view.tsx:452 | התוכן מוצג כפי שנכתב בתיעוד הפרויקט. | 3 | להשמיט, או "מקור: תיעוד הפרויקט." | לא | P3 |
| 126 | cns/s4/s4-catalog.tsx:15; cns/s4/s4-view.tsx:39, מול cns/workspace/workspace-s4.tsx:97; cns/erd/erd-types.ts:215 | "סיכון נמוך" מול "יציב" לאותה רמה | 4 | מונח אחד | לא | P3 |
| 127 | cns/learn/cert-surface.tsx:92, 194-195, 211-215 | "אינה הסמכה רשמית של SAP" ונוסחים דומים, ארבע פעמים באותו עמוד | 3 | פעם אחת בראש העמוד | לא | P3 |
| 128 | cns/learn/knowledge-surface.tsx:423-429 | "החלוקה נגזרת מניסוח המושג: מושג ששורת ה-S/4HANA שלו נפתחת במילים «ללא שינוי» נספר תחת…" | 3 | «ללא שינוי מתועד»: לא נמצא תיעוד לשינוי. נדרש אימות לפני שמסיקים שאין שינוי. | לא | P3 |
| 129 | cns/learn/lesson-view.tsx:457-461 | הגרסה הקודמת של השיעור, במעטפת ובתפריט הישנים: פתיחה במסך הלמידה הקודם. ההתקדמות משותפת לשני המסכים. | 3 | השיעור זמין גם במסך הלמידה הקודם, וההתקדמות משותפת. | לא | P3 |
| 130 | cns/learn/concept-view.tsx:151-152; cns/best-practices/bp-view.tsx:410 | "דוגמה שמזוהה כטבלת SAP או כטרנזקציה בקטלוג נפתחת לעמוד שלה. דוגמה אחרת (…) מוצגת כערך ללא קישור." | 3 | להשמיט; הקישור עצמו מראה מה אפשר לפתוח | לא | P3 |
| 131 | cns/best-practices/bp-data.ts:71 | רשומת שיטת העבודה אינה נושאת תביעת מעמד S/4HANA עצמאית; קביעת המעמד ממתינה לאימות מול תיעוד SAP רשמי בשלב האיסוף. | 4 | לשיטה זו אין מעמד S/4HANA משלה; המעמד ייקבע אחרי אימות מול תיעוד SAP רשמי. | לא | P3 |
| 132 | cns/centers/centers-data.ts:79 | נתיבי אבחון: מהסימפטום, דרך הראיות, אל הסיבה. | 3 | נתיבי אבחון מהסימפטום ועד הסיבה. | לא | P3 |
| 133 | cns/centers/centers-view.tsx:149 | העתק תבנית | 4 | העתקת התבנית | לא | P3 |
| 134 | cns/erd/erd-workspace.tsx:2999 | כל מודול, טבלה, קשר, קרדינליות והצהרת S/4HANA בתרשים נקראים כלשונם מהמאגר. היכן שאין תיעוד, הדבר מצוין במפורש. | 3 | מקור: מאגר הפרויקט. חוסר בתיעוד מסומן בתרשים. | לא | P3 |
| 135 | cns/erd/erd-workspace.tsx:2384 | …המפה המלאה של N המודולים זמינה לפי בקשה. | 4 | …ואפשר גם להציג את המפה המלאה של N המודולים. | לא | P3 |
| 136 | cns/object/object-view.tsx:834 | …אינדקס הספרייה אינו ממפה טבלאות לפרקים, ולכן אין כאן טענה שספר מסוים מכסה את X | 3 | …אינדקס הספרייה אינו ממפה טבלאות לפרקים. | לא | P3 |
| 137 | cns/object/object-lanes.tsx:342 | רדיוס השפעה (Blast radius): | 4 | היקף השפעה: | לא | P3 |
| 138 | cns/object/object-fields.tsx:165 מול cns/data/tables-detail-view.tsx:353 | "טיפוס" מול "סוג" לאותה עמודה | 4 | "סוג נתונים" בשני המקומות | לא | P3 |
| 139 | app/neo/books/page.tsx:114 מול 123-124; cns/books/book-hub.tsx:191-192 | "מטא-נתונים" מול "מטא-דאטה" | 4 | מטא-נתונים | לא | P3 |
| 140 | cns/books/quick-view.tsx:298 | התחל לקרוא. המיקום יישמר במכשיר הזה. | 4 | המיקום יישמר במכשיר הזה מהרגע שמתחילים לקרוא. | לא | P3 |
| 141 | cns/books/quick-view.tsx:354 | הקריאה נפתחת בקורא של Project NEO בכתובת /neo/read/… | 3 | הקריאה נפתחת בקורא של Project NEO. (בלי הכתובת) | לא | P3 |
| 142 | cns/books/books-data.ts:293, 377 | "…מזהי יישומי Fiori ולא מספרי סעיף, ולכן קורא הספרייה הדיגיטלית פותח את הפרק ולא את הערך עצמו." / "…אותו מדריך משתמש עסקי בשני מבני נתונים שונים, ולכן מוצגים כשני ספרים נפרדים." | 3 | "בספר זה הקורא נפתח בפרק ולא בערך." / "זהו אותו מדריך משתמש עסקי בשני מבנים, ולכן הוא מוצג פעמיים." | לא | P3 |
| 143 | cns/chat/library-chat.tsx:86 | מומחה הספרים | 3 | עוזר הספרייה | לא | P3 |
| 144 | cns/chat/general-chat.tsx:112 | NEO AI · לא מוגבל לספרייה · רמת ביסוס בכל תשובה | 4 | NEO AI · שאלות SAP כלליות · כל תשובה מציינת על מה היא מבוססת | לא | P3 |
| 145 | app/neo/page.tsx:65; cns/workspace/workspace-header.tsx:57; cns/data/tx-detail-view.tsx:235; cns/erd/erd-sheet.tsx:187; cns/workspace/workspace-iface.tsx:143; cns/reference/ref-detail-view.tsx:48 | "CDS Views" כתווית בין תוויות עבריות, וגם "קטלוג CDS Views המלא" | 2 | תצוגות CDS | לא | P3 |
| 146 | U+2013 ב-35 מקומות (למשל cns/workspace/workspace-table.tsx:155-197, cns/object/object-fields.tsx:99-184); U+2014 ב-5 מקומות גלויים (cns/search/shell-client.tsx:838, cns/preview.tsx:69, cns/table-list.tsx:28, cns/studio/studio-view.tsx:357, cns/mobile-nav.tsx:79) | "–" וגם "—" לאותו ערך ריק | 1 | סימן אחד לערך ריק, עם טקסט נגיש ("אין נתון") | לא | P3 |
| 147 | cns/workspace/workspace-s4.tsx:233; cns/data/transactions-surface.tsx:291, 359; cns/data/tables-surface.tsx:294, 547; cns/data/tx-detail-view.tsx:409, מול «» ב-cns/reference/ref-surface.tsx:255 וב-cns/search/command-surface.tsx:448 | מירכאות ישרות "…" לצד «…» | 4 | סגנון מירכאות אחד («» או ״״) | לא | P3 |
| 148 | cns/learn/incidents-surface.tsx:377-378 | תווית ההשפעה נלקחת מהרשומה כפי שתועדה. רשומות ללא תג מסומנות «ללא תג השפעה». | 3 | להשמיט את המשפט הראשון | לא | P3 |

## מופעים חוזרים שרוכזו בשורה אחת

הספירה היא על מחרוזות גלויות בלבד (לא הערות), ב-`cns/**` ו-`app/neo/**`.

| ביטוי | מופעים | קבצים | טיפול |
|---|---|---|---|
| "לא קיים תיעוד מאומת במאגר" | 54 | 22 | שורה 76 |
| "מאומת" (כל הצורות) | 102 | 37 | תגליות 6 |
| "ממודל…" (בעיקר "קשרים ממודלים") | 20 | 12 | בלי שורה; מונח תקין אך כבד, אפשר "קשרים מתועדים" |
| "כלשונ…" | 19 | 8 | שורה 111 |
| "כפי שנרשמ…" | 13 | 9 | שורה 111 |
| "מחלקת/מחלקות אובייקט" | 12 | 9 | תגליות 11 |
| "ניסוח/ניסוחי JOIN" | 11 | 7 | שורות 41, 78 |
| "Project NEO · CBC Israel" | 10 | 10 | שורה 1, תגליות 1 |
| "מתוחזק…" | 9 | 6 | שורה 113 |
| "כפי שנכתב…" | 7 | 7 | שורה 111 |
| "ייחודיות" | 6 | 5 | שורה 59 |
| "לא נשמר מסלול הגעה" | 6 | 6 | שורה 74 |
| "עמוד האובייקט המלא" | 6 | 6 | שורה 114 |
| "אורך מוצהר" | 5 | 3 | שורה 94 |
| "כפי שתועד…" | 4 | 2 | שורה 111 |
| "ההקשר המלא" | 4 | 3 | שורה 114 |
| "נסה חיפוש אחר או נקה מסננים" | 4 | 4 | שורה 69 |
| "מגובה" | 3 | 3 | שורה 13 |

## מלאי מקפים ארוכים

### components/neo-shell/** ו-app/neo/** (TS/TSX)

- 1,135 מקפים ארוכים (U+2014) ב-187 קבצים: 1,119 בהערות קוד ו-16 בתוך מחרוזות.
- מתוך ה-16: שניים משמשים כמפריד משפט בטקסט גלוי (cns/learn/academy-surface.tsx:161, cns/reference/bapi-data.ts:352; שורות 93 ו-82). חמישה הם סימן לערך ריק שמוצג למשתמש (cns/search/shell-client.tsx:838, cns/preview.tsx:69, cns/table-list.tsx:28, cns/studio/studio-view.tsx:357, cns/mobile-nav.tsx:79). תשעה הם ערכי השוואה בקוד ואינם מוצגים (cns/reference/enh-data.ts:75, 76, 225, 226, 269, 270; cns/erd/erd-catalog.ts:469; cns/learn/incidents-data.ts:104; cns/object/object-data.ts:241).
- מקף בינוני (U+2013): 40 מופעים, 35 מהם במחרוזות, וכולם סימן לערך ריק. אין שימוש בו כמפריד משפט.
- `app/neo/*.css`: 540 מקפים ארוכים, כולם בהערות (אין `content:` עם טקסט).
- קבצים נוספים בהיקף: app/layout.tsx 7 (3 במחרוזות: 41, 92, 108); app/manifest.ts 3 (2 במחרוזות: 13, 42); app/privacy/page.tsx 4 (3 במחרוזות: 7, 32, 46); components/Footer.tsx 1 (בהערה); components/app-shell.tsx 6 (בהערות); app/robots.ts 0.

קבצים עם 5 מופעים ומעלה:

| קובץ | סה״כ | בתוך מחרוזות |
|---|---|---|
| cns/erd/erd-workspace.tsx | 59 | 0 |
| cns/reader/neo-reader.tsx | 36 | 0 |
| cns/workspace/workspace-data.ts | 27 | 0 |
| cns/books/reading-state.ts | 20 | 0 |
| cns/search/shell-client.tsx | 20 | 1 |
| cns/workspace/module-workspace.tsx | 20 | 0 |
| cns/workspace/section-nav.tsx | 19 | 0 |
| cns/books/book-shelf.tsx | 18 | 0 |
| cns/search/build.ts | 18 | 0 |
| cns/studio/studio-view.tsx | 17 | 1 |
| cns/books/book-hub.tsx | 16 | 0 |
| cns/chat/neo-librarian.tsx | 16 | 0 |
| cns/data/transactions-surface.tsx | 15 | 0 |
| cns/erd/model.ts | 15 | 0 |
| cns/object/object-data.ts | 15 | 1 |
| cns/data/tables-detail.ts | 14 | 0 |
| cns/data/tables-surface.tsx | 14 | 0 |
| cns/erd/erd-catalog.ts | 14 | 1 |
| cns/learn/knowledge-data.ts | 14 | 0 |
| cns/nav-data.ts | 14 | 0 |
| cns/object/object-view.tsx | 14 | 0 |
| cns/reference/types.ts | 14 | 0 |
| cns/home/home-data.ts | 13 | 0 |
| cns/search/types.ts | 13 | 0 |
| cns/books/books-data.ts | 12 | 0 |
| cns/learn/lesson-view.tsx | 12 | 0 |
| cns/erd/graph.ts | 11 | 0 |
| cns/learn/knowledge-surface.tsx | 11 | 0 |
| cns/reference/enh-data.ts | 11 | 6 |
| cns/data/tx-detail.ts | 10 | 0 |
| cns/object/object-lanes.tsx | 10 | 0 |
| cns/reference/ref-detail-view.tsx | 10 | 0 |
| cns/learn/lesson-data.ts | 9 | 0 |
| cns/object/object-names.ts | 9 | 0 |
| cns/reader/section-body.tsx | 9 | 0 |
| cns/reference/ref-surface.tsx | 9 | 0 |
| cns/search/command-surface.tsx | 9 | 0 |
| cns/types.ts | 9 | 0 |
| cns/books/cover-title.ts | 8 | 0 |
| cns/books/quick-view.tsx | 8 | 0 |
| cns/data/tables-detail-view.tsx | 8 | 0 |
| cns/data/types.ts | 8 | 0 |
| cns/nav-context/fallbacks.ts | 8 | 0 |
| cns/nav-context/index.ts | 8 | 0 |
| cns/nav-context/origin.ts | 8 | 0 |
| cns/object/object-aux.ts | 8 | 0 |
| cns/store.ts | 8 | 0 |
| cns/books/book-cover.tsx | 7 | 0 |
| cns/data/tx-detail-view.tsx | 7 | 0 |
| cns/erd/erd-types.ts | 7 | 0 |
| cns/learn/academy-surface.tsx | 7 | 1 |
| cns/learn/cert-data.ts | 7 | 0 |
| cns/learn/cert-surface.tsx | 7 | 0 |
| cns/learn/incidents-data.ts | 7 | 1 |
| cns/search/command-index.ts | 7 | 0 |
| cns/workspace/workspace-s4.tsx | 7 | 0 |
| app/neo/books/page.tsx | 6 | 0 |
| app/neo/page.tsx | 6 | 0 |
| cns/books/resume.ts | 6 | 0 |
| cns/chat/context-bar.tsx | 6 | 0 |
| cns/chat/library-chat.tsx | 6 | 0 |
| cns/chat/live.tsx | 6 | 0 |
| cns/learn/course-view.tsx | 6 | 0 |
| cns/mod-var.ts | 6 | 0 |
| cns/reader/reader-data.ts | 6 | 0 |
| cns/reference/bapi-data.ts | 6 | 1 |
| app/neo/[hub]/page.tsx | 5 | 0 |
| app/neo/object/[name]/page.tsx | 5 | 0 |
| cns/centers/centers-data.ts | 5 | 0 |
| cns/chat/engine.ts | 5 | 0 |
| cns/chat/scope-context.ts | 5 | 0 |
| cns/chat/store.ts | 5 | 0 |
| cns/data/tables-data.ts | 5 | 0 |
| cns/learn/academy-data.ts | 5 | 0 |
| cns/learn/cert-exam.tsx | 5 | 0 |
| cns/learn/concept-view.tsx | 5 | 0 |
| cns/learn/lesson-neo-links.ts | 5 | 0 |
| cns/motion/level.ts | 5 | 0 |
| cns/nav-context/types.ts | 5 | 0 |
| cns/object/object-aux-view.tsx | 5 | 0 |
| cns/reader/prefs.ts | 5 | 0 |
| cns/reference/ref-links.ts | 5 | 0 |
| cns/s4/s4-data.ts | 5 | 0 |
| cns/workspace/workspace-chapter.tsx | 5 | 0 |
| cns/workspace/workspace-map.tsx | 5 | 0 |

קבצים עם 1 עד 4 מופעים (כולם בהערות, אלא אם צוין אחרת):

- 4 בכל קובץ (23 קבצים): app/neo/academy/[courseId]/[slug]/page.tsx, app/neo/tables/[name]/page.tsx, cns/books/book-toc.tsx, cns/books/links.ts, cns/chat/scope-sheet.tsx, cns/dock/neo-dock.tsx, cns/dock/theme-switch.tsx, cns/domain/domain-data.ts, cns/erd/erd-inspector.tsx, cns/erd/erd-sheet.tsx, cns/home/home-net.tsx, cns/home/home-zones.tsx, cns/learn/incidents-surface.tsx, cns/learn/mod.ts, cns/object/object-fields.tsx, cns/object/object-orbit.tsx, cns/preview.tsx (1 במחרוזת), cns/reader/lens.tsx, cns/reader/progress.ts, cns/reader/reader-panel.tsx, cns/reference/idoc-data.ts, cns/workspace/workspace-index.tsx, cns/workspace/workspace-table.tsx
- 3 בכל קובץ (26 קבצים): app/neo/academy/page.tsx, app/neo/certification/page.tsx, app/neo/idoc/page.tsx, app/neo/knowledge/page.tsx, app/neo/migration-cockpit/page.tsx, app/neo/studio/page.tsx, cns/chat/composer.tsx, cns/chat/marks.tsx, cns/chat/message.tsx, cns/chat/sources.tsx, cns/domain/domain-view.tsx, cns/erd/key-role.ts, cns/evidence/status-pill.tsx, cns/home/home-scene.tsx, cns/learn/incident-view.tsx, cns/learn/lesson-links.ts, cns/nav-context/smart-return.tsx, cns/neo-shell.tsx, cns/object/object-depth.tsx, cns/reader/env.ts, cns/reader/figures.ts, cns/reader/progress-rail.tsx, cns/reference/cds-data.ts, cns/table-list.tsx (1 במחרוזת), cns/workspace/workspace-iface.tsx, cns/workspace/workspace-ops.tsx
- 2 בכל קובץ (26 קבצים): app/neo/ai/page.tsx, app/neo/bapi/[name]/page.tsx, app/neo/bapi/page.tsx, app/neo/best-practices/page.tsx, app/neo/certification/exam/page.tsx, app/neo/domain-model/page.tsx, app/neo/incidents/page.tsx, app/neo/knowledge/[slug]/page.tsx, app/neo/read/[bookId]/page.tsx, app/neo/s4-readiness/page.tsx, app/neo/transactions/[code]/page.tsx, cns/best-practices/bp-data.ts, cns/best-practices/bp-view.tsx, cns/chat/general-chat.tsx, cns/chat/use-conversation.ts, cns/dock/context.ts, cns/dock/typography.ts, cns/flip.ts, cns/mobile-nav.tsx (1 במחרוזת), cns/object/object-return.tsx, cns/reader/types.ts, cns/reference/fiori-data.ts, cns/shelf.tsx, cns/workspace/workspace-build.tsx, cns/workspace/workspace-learn.tsx, cns/workspace/workspace-recent.tsx
- 1 בכל קובץ (27 קבצים): app/neo/academy/[courseId]/page.tsx, app/neo/best-practices/[slug]/page.tsx, app/neo/books/[bookId]/page.tsx, app/neo/cds/[view]/page.tsx, app/neo/cds/page.tsx, app/neo/centers/page.tsx, app/neo/chat/page.tsx, app/neo/domain/[slug]/page.tsx, app/neo/enhancements/[slug]/page.tsx, app/neo/enhancements/page.tsx, app/neo/erd/page.tsx, app/neo/fiori-apps/[slug]/page.tsx, app/neo/fiori-apps/page.tsx, app/neo/idoc/[name]/page.tsx, app/neo/incidents/[slug]/page.tsx, app/neo/layout.tsx, app/neo/s4hana/page.tsx, app/neo/tables/page.tsx, cns/centers/centers-view.tsx, cns/evidence/evidence-block.tsx, cns/home/home-shelf.tsx, cns/reference/canon.ts, cns/reference/idoc-reference-block.tsx, cns/s4/s4-view.tsx, cns/workspace/workspace-context.tsx, cns/workspace/workspace-header.tsx, cns/workspace/workspace-origin.tsx

### data/*.ts ו-lib/*.ts שמזינים עמודים (מלאי בלבד, בלי הצעות)

הקבצים זוהו במעבר על גרף הייבוא הסטטי מ-`app/neo/**` ומ-`cns/**`: 290 קובצי data ו-lib נגישים, 258 מהם עם מקף ארוך, 36,084 מופעים, 35,533 בתוך מחרוזות. כמעט כל המופעים הם תוכן SAP או ספרים; כל שינוי בהם עובר בודק תוכן, והקבצים המוגנים לא נוגעים בהם בכלל. לא נמצא ייבוא סטטי של `data/books/**`.

| קבוצה | קבצים | סה״כ | בתוך מחרוזות | מעמד |
|---|---|---|---|---|
| data/academy/lessons/*-generated.ts ו-data/academy/lesson-blocks.generated.ts | 9 | 16,937 | 16,927 | נוצר; לא לעריכה ידנית |
| data/library/** | 120 | 13,017 | 12,864 | מוגן |
| data/library-content-he.ts, data/library-content.json | 2 | 99 | 99 | שכבת התרגום; מוגנת לפי PLAN.md |
| data/verification/** | 10 | 280 | 253 | מוגן |
| data/sapData*.ts | 3 | 9 | 5 | נוצר ומוגן |
| שאר data/** (תוכן SAP שנכתב ביד) | 54 | 5,491 | 5,358 | תוכן SAP; דורש בודק תוכן |
| lib/** | 60 | 251 | 27 | כמעט הכול בהערות |
| **סה״כ** | **258** | **36,084** | **35,533** | |

30 הקבצים המובילים מתוך "שאר data/**":

| # | קובץ | סה״כ | בתוך מחרוזות |
|---|---|---|---|
| 1 | data/tx-intel.ts (בלוק הרשומות נוצר; עריכה בהרצה חוזרת לפי הכותרת בקובץ) | 3041 | 3034 |
| 2 | data/table-enrichment.ts | 716 | 705 |
| 3 | data/function-intel.ts | 186 | 180 |
| 4 | data/domain-detail.ts | 159 | 159 |
| 5 | data/cds-enrichment.ts | 135 | 129 |
| 6 | data/knowledge/object-intel.ts | 110 | 109 |
| 7 | data/troubleshooting-ext2.ts | 97 | 96 |
| 8 | data/troubleshooting-ext.ts | 80 | 79 |
| 9 | data/knowledge/hr-objects.ts | 75 | 72 |
| 10 | data/troubleshooting.ts | 65 | 64 |
| 11 | data/troubleshooting-ext3.ts | 58 | 57 |
| 12 | data/transactions.ts | 56 | 42 |
| 13 | data/hr-module.ts | 49 | 43 |
| 14 | data/integration.ts | 49 | 47 |
| 15 | data/bapi-enrichment.sweep.ts | 45 | 39 |
| 16 | data/verified-objects.ts | 43 | 39 |
| 17 | data/domains.ts | 41 | 40 |
| 18 | data/bw-module.ts | 38 | 36 |
| 19 | data/bapi-enrichment.pm.ts | 32 | 29 |
| 20 | data/concepts.ts | 31 | 30 |
| 21 | data/bapi-enrichment.pppi.ts | 30 | 27 |
| 22 | data/knowledge/bw-objects.ts | 29 | 28 |
| 23 | data/fiori/apps.ts | 27 | 24 |
| 24 | data/troubleshooting-ext4.ts | 26 | 25 |
| 25 | data/enhancements.ts | 25 | 24 |
| 26 | data/knowledge/pm-objects-ext.ts | 23 | 21 |
| 27 | data/knowledge/pppi-objects-ext.ts | 22 | 21 |
| 28 | data/library.ts (הרשומה שהספרייה הקפואה ב-/library/ קוראת) | 22 | 20 |
| 29 | data/s4-transformation.ts | 18 | 10 |
| 30 | data/s4-objects.ts | 16 | 15 |

lib, עשרת המובילים (סה״כ / בתוך מחרוזות): lib/academy/store.ts 16/0, lib/cert/generate.ts 13/6, lib/ai/diagram-intent.ts 11/0, lib/idoc-intel.ts 11/8, lib/ai/timeline.ts 10/4, lib/bapi-registry.ts 9/0, lib/contrast.ts 9/0, lib/academy/model.ts 8/0, lib/module-portal.ts 8/2, lib/studio-graph.ts 8/0.

## תגליות לבירור

1. **ייחוס CBC Israel. לא הוכרע כאן; נדרש אישור בעלות.** כל המופעים בממשק:
   - קרדיט (10), בנוסח `Project NEO · CBC Israel · פותח על ידי סאלי חליף · Web Coding`: cns/search/shell-client.tsx:969; app/neo/page.tsx:343; app/neo/books/page.tsx:139; cns/workspace/module-workspace.tsx:530; cns/object/object-view.tsx:881; cns/object/object-aux-view.tsx:432; cns/books/book-hub.tsx:360; cns/erd/erd-workspace.tsx:2913; cns/data/tables-detail-view.tsx:870; cns/domain/domain-view.tsx:96.
   - eyebrow (3): app/neo/page.tsx:147-149 `SAP Enterprise Knowledge Platform · CBC Israel`; app/neo/books/page.tsx:45 `CBC ISRAEL · PROJECT NEO`; cns/workspace/workspace-header.tsx:64 `CBC ISRAEL · PROJECT NEO`.
   - תוויות תוכן (3): cns/learn/lesson-view.tsx:67 `דוגמה מ-CBC`; cns/reference/fiori-data.ts:161 `דוגמת יישום ב-CBC`; cns/reference/fiori-data.ts:262 `יישום ב-CBC`.
   - בממשק NEO אין תגית בצורה "CBC ISRAEL" ואחריה מקף ארוך; כל התגיות משתמשות ב-"·". הצורה עם מקף ארוך קיימת רק מחוץ לממשק: CLAUDE.md:3, exports/README.md:41, exports/build/universe-poster.html:32 ו-95, exports/sap-table-inventory.json:3, exports/sap-infrastructure-data.json:3, docs/HANDOVER.md:3, docs/RELEASE_NOTES.md:4, ובקובצי ה-HTML הישנים source/index_pm_standalone.html:5, 80, 101 ו-source/index_pppi_standalone.html:5, 80, 101.
   - CBC מופיע גם בתוכן הנתונים (למשל data/fiori/apps.ts, data/academy/lessons/*, data/verification/*, data/best-practices/catalog-2026-09.ts), ובמקומות אחרים התוכן כבר מנוסח בניטרליות כ"הארגון" (למשל data/troubleshooting-ext2.ts, data/concepts.ts, cns/chat/general-chat.tsx:59). כדאי לקבוע מדיניות אחת לפני שכתוב הקרדיט.
   - הסלוגן באנגלית מופיע גם בגרסה "SAP Knowledge Platform": components/Footer.tsx:19, app/layout.tsx:41 ו-92, lib/i18n.tsx:81-82 (המפתח footer.credit אינו בשימוש).
2. **כתיב שם המפתח.** "Sali Halif" בסרגל בדסקטופ ובכותרת וב-Footer הישנים, "סאלי חליף" בנייד ובעמודים. CLAUDE.md מחייב קרדיט בכל עמוד ("Lead dev: Sali Halif (Web Coding)"). צריך צורה אחת. בעמודי S/4HANA רכיב בשם Credit (cns/s4/s4-view.tsx:111-116) מציג רק "התוכן מוצג כפי שנכתב בתיעוד הפרויקט." בלי שם; הקרדיט עדיין מופיע בסרגל בדסקטופ ובשורת המעטפת בנייד (rail.css:865 אינו מסתיר אותה בעמודים אלה), כך שאין חוסר, אבל שם הרכיב מטעה.
3. **שמות מותג באנגלית:** SAP Academy, Architecture Studio, NEO AI, SAP by Sali. האם אלה שמות קבועים? app/not-found.tsx:33 כבר כותב "סטודיו ארכיטקטורה". ההחלטה משפיעה על שורות 8, 36, 38, 92, 108.
4. **מטא-דאטה באנגלית:** ה-description הראשי, og:description, twitter:description, ה-alt של og.png, ה-JSON-LD והמניפסט כתובים באנגלית, ו-og:title ו-og:description זהים בכל עמודי NEO (אין override תחת app/neo; נבדק ב-out/neo/index.html וב-out/neo/tables/index.html). אם האנגלית מכוונת ל-SEO או ל-Google Play, להשאיר ולתקן רק את המקפים; אם לא, לתרגם. og לפי עמוד דורש שינוי קוד ב-metadata.
5. **טענת העבודה בלי רשת סותרת את עצמה:** בבית "זמינה במלואה גם ללא חיבור לרשת" (app/neo/page.tsx:159), בפרטיות "פועלת ברובה גם ללא חיבור לרשת" (app/privacy/page.tsx:58), וב-Footer "100% Offline". צריך נוסח אחד שנמדד בפועל.
6. **המילה "מאומת":** 102 מופעים ב-37 קבצים. למשל "N טרנזקציות SAP מאומתות" (cns/data/transactions-surface.tsx:384), "ארבעה מקורות מאומתים" (שם, 561), "התיעוד המאומת של הפרויקט" (app/neo/certification/page.tsx:21, app/neo/certification/exam/page.tsx:17). צריך הגדרה אחת: מאומת מול מה ובידי מי. לבודק התוכן.
7. **מספרים שנכתבו ביד:** cns/dock/neo-dock.tsx:241 ("11 הספרים"), cns/data/transactions-surface.tsx:561 ("ארבעה מקורות"), app/neo/incidents/page.tsx:18 (רשימת המודולים "PM, PP, PP-PI ו-QM"). CLAUDE.md דורש שכל מספר ייגזר מהנתונים.
8. **טקסט שאינו מוצג (לפי out/):** ה-ledes ב-cns/nav-data.ts:487-650 שייכים למסגרת `app/neo/[hub]`. כל ה-hubs חוץ מ-pm ו-pp-pi מוצללים על ידי routes סטטיים, ו-pm ו-pp-pi מציגים את ModuleWorkspace עם ה-lede מ-workspace-data.ts. אף אחד מה-ledes האלה לא נמצא ב-out/neo. גם השדה field ב-app/neo/page.tsx:84-87 (למשל "S/4HANA תחילה") והמפתח footer.credit ב-lib/i18n.tsx:80-83 אינם מוצגים. לא כדאי להשקיע בהם שכתוב; מחיקה היא משימת קוד.
9. **סתירה בשמירת מיקום הגלילה:** cns/books/resume.ts:86 (בכרטיס הספר) "נשמר גם מיקום הגלילה…", ומנגד cns/reader/neo-reader.tsx:890 "המיקום נשמר ברמת פרק ותת-פרק, לא ברמת מיקום הגלילה." הראשון מתייחס לקורא הספרייה הישן והשני לקורא NEO, והמשתמש לא יודע זאת. לנסח כך שיהיה ברור לאיזה קורא כל משפט מתייחס.
10. **מצבי שגיאה וטעינה שמוצגים גם ב-NEO:** אין app/neo/error.tsx, not-found.tsx או loading.tsx, ולכן מוצגים אלה של השורש (מחוץ להיקף שהוגדר). app/error.tsx:35 "אפשר לנסות שוב — הנתונים נטענים מקומית. אם זה חוזר, חזור לקוקפיט." (מקף ארוך וציווי) ו-app/error.tsx:37 "נסה שוב"; app/not-found.tsx:30 "…חזור לקוקפיט או חקור את נוף ה-SAP." ("נוף ה-SAP" תרגום של landscape, וציווי); app/loading.tsx:23 "טוען את נוף ה-SAP…"; app/global-error.tsx:20-22 "טען מחדש כדי להמשיך." ו-"נסה שוב". הצעות: "אפשר לנסות שוב. אם הבעיה חוזרת, אפשר לחזור לדף הבית."; "העמוד לא נמצא. ייתכן שהקישור השתנה."; "טעינה…". להחליט אם להכניס להיקף.
11. **"מחלקת אובייקט":** 12 מופעים (למשל cns/data/tables-surface.tsx:72 ו-467, cns/data/tables-detail-view.tsx:198, cns/object/object-view.tsx:172). הסיווג בא מ-zoneOf ב-lib/studio-graph (אזורים פונקציונליים), וב-SAP "מחלקה" היא מונח של מערכת הסיווג (Class). בסטודיו אותו מושג נקרא "אזורים" (cns/studio/studio-view.tsx:398). לבודק התוכן: ייתכן ש"אזור פונקציונלי" מדויק יותר.
12. **מילון מעמד S/4HANA (שורה 91) ושם המודול PP-PI (שורה 10):** החלטת תוכן. לפי ההערה ב-app/neo/page.tsx:108-109 התוויות בעמוד הבית הן S4_HE מ-lib/s4-class כלשונן, כלומר ייתכן שכבר יש מקור קנוני שאפשר לאמץ בכל המקומות.
13. **"SAP PRESS" באיור הספרן:** cns/chat/neo-librarian.tsx:201 כותב את שם ההוצאה על גב ספר באיור. לאשר שהשימוש בשם ההוצאה כקישוט מותר.
14. **קיצורי המניפסט מובילים למסלולים הישנים** (/academy/, /studio/, /knowledge/, /tables/) ולא ל-/neo/. זו החלטת מוצר ולא נוסח; מצוין כי שמות הקיצורים משתנים בשורה 36.
15. **תבנית הכותרת:** המחרוזת "Project NEO" ב-app/neo/layout.tsx:23 מאפסת את התבנית "SAP by Sali \| %s" בעמודים הפנימיים (נראה ב-out/), ולכן רק /neo/ נושא את הקידומת. פורמט אחיד (שורה 33) דורש שינוי קוד קטן ב-metadata.
16. **24 שורות SAP=כן** דורשות בודק תוכן (neo-sap-content-quality-reviewer) לפני כל שינוי.
