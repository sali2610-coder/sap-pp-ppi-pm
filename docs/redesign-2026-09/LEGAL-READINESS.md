# מוכנות משפטית · Project NEO (sapbysali.app)

מיפוי עובדות לקראת כתיבת שלושה דפים: מדיניות פרטיות, תנאי שימוש, הצהרת נגישות.

- נכתב: 2026-09-29. הבדיקות מול האתר החי נעשו ב-2026-09-28 סביב 20:20 UTC (לפי כותרת `Date` של השרת).
- עץ עבודה: `/Users/salihalif/Desktop/My-Projects/neo-redesign`, ענף `design/neo-experience-redesign`, HEAD `243e2349`. הענף נחתך מ-`6ba22207`, שהוא ה-SHA שהייצור מגיש (`docs/redesign-2026-09/PLAN.md:3`). הקומיט היחיד מעליו מוסיף מסמכים וגופני OFL ואינו נוגע בקוד שקשור לפרטיות.
- אופן העבודה: קריאה בלבד. לא שונה אף קובץ מלבד המסמך הזה, לא הורץ build, ולא נשלחה אף קריאה לשירות ה-AI.
- כל הנתיבים יחסיים לשורש עץ העבודה. `path:N` הוא מספר שורה.

תוויות מקור:

| תווית | משמעות |
|---|---|
| [קוד] | נבדק בקוד המקור בעץ העבודה |
| [חי] | נבדק מול https://sapbysali.app עם curl |
| [git] | היסטוריית הגרסאות |
| [ראיה] | קובץ תוצאות של בדיקה שהפרויקט הריץ |
| [הסקה] | מסקנה מהראיות, לא נבדקה ישירות |
| [ידע כללי] | ידע טכני כללי, לא נגזר מהמאגר |

---

## A. עובדות

### A1. עוגיות

- אין בקוד `document.cookie`, `Set-Cookie`, `cookies()` או `next/headers`, ואין ספריית אימות (next-auth, Clerk, Supabase, Firebase). חיפוש ב-`app`, `components`, `lib`, `public` החזיר 0 [קוד].
- אין middleware ואין route handlers. האתר הוא ייצוא סטטי (`next.config.ts:6`, `output: "export"`). קובצי ה-route היחידים הם נתיבי מטא-דאטה שנוצרים בבנייה: favicon, icon, apple-icon, robots, manifest [קוד].
- אף תגובה לא הכילה `Set-Cookie` ב-8 כתובות: `/`, `/neo/`, `/neo/ai/`, `/privacy/`, `/sw.js`, `/books/book1/ch1.json`, `/manifest.webmanifest`, `/diag.html` [חי].
- חריג שכדאי לדעת עליו: בקובץ ה-JS של הייצור `/_next/static/chunks/3v6_gxbo-aycj.js`, שנטען בכל 7 הדפים שנבדקו, יש קטע של Vercel Toolbar. הוא קורא את `document.cookie`, מחפש `__vercel_toolbar=1`, ורק אם העוגייה קיימת טוען סקריפט מ-`https://vercel.live/_next-live/feedback/feedback.js`. הוא אינו כותב עוגייה [חי]. הקטע לא קיים בקוד המקור, לא ב-`node_modules/next` ולא בבנייה המקומית `out/`, כלומר Vercel מזריק אותו בזמן הבנייה [הסקה]. ה-CSP מתיר סקריפטים רק מ-`'self'` (`vercel.json:25`), ולכן טעינה מ-vercel.live הייתה נחסמת [הסקה].
- קריאות ה-AI נשלחות בלי אפשרות `credentials` (`lib/ai/stream.ts:67-72`, `lib/ai/client.ts:184-197`, `components/ask-ai.tsx:158-167`). בברירת המחדל של fetch, בקשה לדומיין אחר אינה שולחת עוגיות ואינה שומרת עוגיות שהשרת מחזיר [ידע כללי].

### A2. אחסון בדפדפן

- IndexedDB: אין שימוש [קוד].
- localStorage: 59 מפתחות קבועים שנכתבים בקוד הנוכחי, ועוד חמש משפחות מפתחות עם מזהה (כמו `neo:reader:<bookId>`), כולם בקידומת `neo:`. sessionStorage: שני מפתחות. Cache Storage: שני מטמונים של ה-Service Worker (ראו A3) [קוד].
- אף מפתח אינו נשלח מהמכשיר: לא נמצא קוד שקורא מפתח ושולח אותו ברשת [קוד]. חריג עקיף: שאלות שנשמרות בהיסטוריית השיחה כבר נשלחו לשירות ה-AI ברגע השאלה (A5), ו"שליחת השאלה שוב" שולחת אותן שוב.
- אין פעולה אחת שמוחקת את כל הנתונים המקומיים. חיפוש `localStorage.clear` ומחרוזות כמו "מחיקת כל הנתונים" החזיר 0 [קוד]. יש מחיקה לפי תכונה: "שיחה חדשה" ב-NEO (`components/neo-shell/chat/use-conversation.ts:245`), ניקוי חיפושים אחרונים (`components/command-palette.tsx:87`), מחיקת שיחה בסביבת ה-AI הישנה (`components/ai/ai-workspace.tsx:266`), איפוס קריאה של ספר בקורא הישן (`lib/reader-store.ts:24-28`), איפוס באקדמיה הישנה של שיעור, פרק, מסלול או הכל ("אפס את כל SAP Academy", `components/academy-home.tsx:259`, `lib/academy/store.ts:286-331`). כל אלה מוחקים רק את התחום שלהם. מעבר לזה נשאר ניקוי נתוני האתר בדפדפן.
- "NEO" בטבלה = נתיבי `/neo/*`. "ישן" = נתיבים מחוץ ל-`/neo/`, שעדיין מוגשים (למשל `/tables/`, `/library/`, `/chat/`).

| קבוצה | מפתח | מה נשמר | ראיה (הגדרה, כתיבה) | משטח |
|---|---|---|---|---|
| תצוגה | `neo:theme` | בהיר, כהה או לפי המערכת | `lib/theme-boot.ts:9`, `components/neo-shell/dock/theme-switch.tsx:87`, `lib/theme.ts:29` | NEO וישן |
| תצוגה | `neo:type:v1` | גופן וגודל טקסט | `components/neo-shell/dock/typography.ts:57,106` | NEO |
| תצוגה | `neo:read-ui:v1` | העדפות הקורא של NEO | `components/neo-shell/reader/prefs.ts:75,142` | NEO |
| תצוגה | `neo:nx:mode`, `neo:nx:open` | מצב הרייל וקבוצות פתוחות | `components/neo-shell/store.ts:28-29,137-138` | NEO |
| תצוגה | `neo:erd:v3` | מצב התצוגה האחרון של ה-ERD | `components/neo-shell/erd/erd-workspace.tsx:73,1229` | NEO |
| תצוגה | `neo:lang` | שפת ממשק | `lib/i18n.tsx:123,141` | ישן |
| תצוגה | `neo:font-scale` | גודל גופן | `components/ux-settings.tsx:15,34` | ישן |
| תצוגה | `neo:reader:theme`, `:size`, `:measure`, `:mode`, `:focus`, `:helpseen` | העדפות הקורא הישן | `components/book-reader.tsx:359-361,369,386,407` | ישן |
| תצוגה | `neo:reader:sound`, `neo:reader:view` | צליל דפדוף, תצוגת קורא | `lib/reader-sound.ts:8,47`, `lib/continuity-store.ts:53,70` | ישן |
| תצוגה | `neo:sidebar:collapsed`, `neo:nav:open` | מצב סרגל הצד | `components/knowledge-sidebar.tsx:93,188` | ישן |
| תצוגה | `neo:inspector:open`, `neo:inspector:w` | חלונית פרטים ורוחבה | `lib/workspace.ts:32,42`, `components/workspace-inspector.tsx:19,70` | ישן |
| תצוגה | `neo:graph:state`, `neo:graph:layouts` | מצב גרף ופריסות | `lib/prefs.ts:74,84,90,103` | ישן |
| תצוגה | `neo:studio:v2`, `neo:studio:coach:v2` | מצב Architecture Studio, הדרכה שנסגרה | `components/architecture-studio.tsx:24-25,113,428` | ישן |
| תצוגה | `neo:tree-open`, `neo:coach:peek` | ענפים פתוחים, הדרכה שנסגרה | `components/ai/scope-tree.tsx:23,37`, `components/peek-coach.tsx:15,34` | ישן |
| תצוגה | `neo:role`, `neo:onboarded` | תפקיד שנבחר, סיום היכרות | `lib/role.ts:6-7,15,24` | ישן |
| היסטוריה | `neo:obj:recent` | 8 שמות אובייקטי SAP אחרונים | `components/neo-shell/store.ts:26,100`, `components/object-workspace.tsx:159` | NEO וישן |
| היסטוריה | `neo:nx:seen` | חותמת זמן פתיחה לכל אובייקט ברשימה | `components/neo-shell/store.ts:27,101` | NEO |
| היסטוריה | `neo:tx:favorites`, `neo:tx:recent` | טרנזקציות מועדפות ואחרונות | `lib/tx-prefs.ts:9-10,30` | NEO וישן |
| היסטוריה | `neo:obj:fav` | אובייקטים מועדפים | `lib/prefs.ts:9,44` | NEO וישן |
| היסטוריה | `neo:academy:recent` | שיעורים שנצפו לאחרונה | `lib/academy/recent.ts:9,23,39` | NEO וישן |
| היסטוריה | `neo:search:recent` | 6 החיפושים האחרונים, הטקסט שהוקלד | `components/command-palette.tsx:56,85` | ישן |
| היסטוריה | `neo:lib:recent`, `neo:lib:visited` | ספרים שנפתחו, ביקור ראשון | `app/library/page.tsx:31,91` | ישן |
| היסטוריה | `neo:bapi:fav`, `:pin`, `:learned` | מועדפים, הצמדות, "למדתי" | `components/function-catalog.tsx:83-85,89` | ישן |
| היסטוריה | `neo:home:recent`, `neo:mentor:recent` | נקראים בלבד, אין להם כותב בקוד הנוכחי | `components/command-center.tsx:19`, `components/onboarding-journey.tsx:39` | ישן |
| התקדמות | `neo:books:v1` | ספר אחרון, מיקום קריאה וסימניות לכל ספר | `components/neo-shell/books/reading-state.ts:104,294,325,349` | NEO |
| התקדמות | `neo:continuity:v1`, `neo:reader:<bookId>` | המשך קריאה, פרקים שנקראו, סימניות | `lib/continuity-store.ts:19,45`, `lib/reader-store.ts:11,18` | ישן (NEO קורא אותם, `reading-state.ts:154,162`) |
| התקדמות | `neo:academy:v2` | התקדמות באקדמיה (הגרסה הקודמת `neo:academy:progress`, `neo:academy:activity` מומרת ונמחקת) | `lib/academy/store.ts:24-26,56,75,330` | NEO וישן |
| התקדמות | `neo:cert` | ציוני מבחנים, ניסיונות, עבר או נכשל, רצף יומי, זמני מבחן | `lib/cert/store.ts:10-16,33` | NEO וישן |
| התקדמות | `neo:course:<id>`, `neo:learn:progress`, `neo:learn:streak`, `neo:onboard:journey`, `neo:learned` | התקדמות בקורסים, רצף ימים, שלבי היכרות, תרגולי AI שהושלמו | `components/learn/course-kit.tsx:23,26`, `lib/learn-store.ts:9,31,70,81`, `lib/onboard-store.ts:9,28`, `lib/ai/learning.ts:239,263` | ישן |
| התקדמות | `neo:status` | סטטוס מיגרציה לכל טבלה | `lib/status-store.ts:9,67` | ישן |
| טקסט חופשי | `neo:obj:notes:<name>` | הערות שהמשתמש כותב לאובייקט | `components/object-workspace.tsx:156,520` | ישן |
| טקסט חופשי | `neo:reader:notes:<bookId>` | הערות לספר | `components/book-reader.tsx:384,848` | ישן |
| טקסט חופשי | `neo:process:notes:<stepId>` | הערות יועץ לשלב בתהליך | `components/process-workspace.tsx:149,153` | ישן |
| טקסט חופשי | `neo:bapi:notes` | הערות פרטיות ל-BAPI | `components/function-catalog.tsx:86,92` | ישן |
| שיחות AI | `neo:shell:chat:library`, `neo:shell:chat:consult` | השאלות, התשובות המאומתות כולל ציטוטים מהספרים, וההיקף. עד 40 שאלות | `components/neo-shell/chat/store.ts:57-58,81` | NEO |
| שיחות AI | `neo:ai:lib:threads`, `:scope`, `:active`, ואותם מפתחות תחת `neo:ai:con` | עד 20 שיחות, 40 שאלות בכל אחת | `lib/ai/history.ts:32-41,64` | ישן |
| שיחות AI | `neo:ai:feedback` | אגודל למעלה או למטה לכל תשובה. אין לזה נקודת קצה | `lib/ai/history.ts:119-132` | ישן |
| sessionStorage | `neo:nav:ctx` | מאיפה הגעת, לחזרה חכמה | `components/neo-shell/nav-context/origin.ts:30,145` | NEO |
| sessionStorage | `neo:books:scroll` | מיקום גלילה במדף הספרים | `components/neo-shell/books/book-shelf.tsx:84,118` | NEO |
| מחיקה | `neo:gemini-key`, `neo:gemini-model` | לא נכתבים עוד. נמחקים בכל טעינת דף | `lib/purge-legacy.ts:20-30`, נקרא ב-`components/app-shell.tsx:96`, ו-AppShell עוטף כל נתיב (`app/layout.tsx:182`) | הכל |
| בדיקה | `neo:diag` | נכתב ונמחק מיד, בדיקת זמינות אחסון | `public/diag.html:246` | `/diag.html` |

### A3. Service Worker

- הקובץ `public/sw.js` זהה לקובץ שמוגש ב-`/sw.js` (השוואה ללא הבדלים) [חי]. הרישום נעשה אחרי טעינת הדף ב-`components/sw-register.tsx:13` (scope `/`), והרכיב מורכב ב-`app/layout.tsx:183` [קוד].
- שני מטמונים: `neo-v1-precache` ו-`neo-v1-runtime` (`public/sw.js:16-18`). מראש נשמרים `/`, `/offline/`, ה-manifest ושלושה אייקונים (`public/sw.js:21-28`).
- מטפל רק בבקשות GET (`public/sw.js:55`) ורק באותו מקור (`public/sw.js:58`). בקשות ה-POST לשירות ה-AI אינן עוברות דרכו ואינן נשמרות [קוד].
- דפים: רשת קודם, עותק נשמר במטמון, ובניתוק מוגש העותק או דף `/offline/` (`public/sw.js:61-72`). כלומר כל דף HTML שנפתח נשמר במכשיר [קוד].
- `/_next/static/`: מטמון קודם (`public/sw.js:77-88`). תמונות, גופנים, JSON ו-manifest: מוגשים מהמטמון ומתעדכנים ברקע (`public/sw.js:31-32,92-104`), כולל קובצי פרקים ואיורים של ספרים שנקראו [קוד].
- מטמונים ישנים נמחקים בהפעלה (`public/sw.js:40-46`).
- המטמון מכיל תגובות שרת לבקשות GET של תוכן ציבורי, לא קלט של המשתמש [הסקה מהקוד].
- דף הניתוק עצמו אומר שרק עמודים שכבר ביקרת בהם זמינים ללא רשת (`app/offline/page.tsx:25`).

### A4. אנליטיקה וטלמטריה

- `@vercel/analytics` מופיע ב-`package.json:42` ולא מיובא בשום מקום. גם `@google/generative-ai` (`package.json:35`) לא מיובא. חיפוש בכל קובצי המקור מחוץ ל-`node_modules`, `out` ו-`.next` החזיר 0 [קוד].
- אין בקוד Google Analytics, gtag, Tag Manager, פיקסלים, Sentry, Datadog, Hotjar, Clarity, Plausible, PostHog, `sendBeacon` או `reportWebVitals` [קוד].
- ב-HTML של 7 דפים חיים (`/neo/`, `/neo/ai/`, `/neo/chat/`, `/neo/books/`, `/privacy/`, `/chat/`, `/library/ask/`) ובכל 30 קובצי ה-JS שהם טוענים: אין `_vercel/insights`, `speed-insights` או `sendBeacon`. ה-HTML של `/neo/` מפנה רק לקבצים מאותו מקור [חי].
- הכתובות `/_vercel/insights/script.js` ו-`/_vercel/speed-insights/script.js` מחזירות 200 בדומיין החי, וכתובת מומצאת `/_vercel/doesnotexist/script.js` מחזירה 404. כלומר Web Analytics ו-Speed Insights כנראה מופעלים בהגדרות פרויקט ה-Vercel, אבל אף דף לא טוען את הסקריפטים [חי, הסקה].
- סימוני ביצועים ו-`window.__neoTimeline` הם מקומיים: מודפסים לקונסול ומועתקים ללוח לפי בקשה, לא נשלחים (`app/layout.tsx:139-177`) [קוד].
- דפי שגיאה כותבים לקונסול בלבד (`app/error.tsx:18`) [קוד].
- `/diag.html` מציג במכשיר עצמו User-Agent, מספר ליבות, זיכרון וחיבור, טוען את עצמו שוב מאותו מקור ומעתיק דוח ללוח לפי לחיצה (`public/diag.html:246-252,261,381`). מסומן noindex (`public/diag.html:6`) [קוד].
- תגי אימות למנועי חיפוש תלויים במשתני סביבה (`app/layout.tsx:9-10,53-56`). ב-`/neo/` החי אין תג כזה [חי].
- היסטוריה [git]: `<Analytics />` של Vercel ורכיב טעינה של GA4 (פעיל רק אם `NEXT_PUBLIC_GA_ID` הוגדר) היו ב-`app/layout.tsx` מ-`ec73c3d1` (2026-07-04) עד `d787cf7e` (2026-07-21, "remove external trackers").

### A5. בקשות רשת יוצאות מהדפדפן

- ה-CSP מתיר חיבורים רק לאותו מקור ול-`https://sap-books-api.vercel.app` (`vercel.json:25`). הכותרת החיה זהה. `img-src 'self' data:`, `font-src 'self'`, `frame-src 'none'` [קוד, חי].

ארבעה משטחים שולחים שאלות לשירות ה-AI:

| משטח | נתיב | יעד | מה נשלח | ראיה |
|---|---|---|---|---|
| NEO · שאל את הספרייה | `/neo/ai/` | POST `https://sap-books-api.vercel.app/api/library-stream` | `question`, `bookId`, `chapter`, `section`, `scope` (מחרוזת מצב), `task`, ולפעמים `diagramKind` | `components/neo-shell/chat/engine.ts:126`, `lib/ai/client.ts:17-29,280-292`, `lib/ai/stream.ts:67-72` |
| NEO · שיחה כללית על SAP | `/neo/chat/` | POST `.../api/consult-stream` | אותם שדות, ההיקף ריק במשטח הזה | `components/neo-shell/chat/general-chat.tsx:64-73`, אותו מסלול קוד |
| ווידג'ט "שאל את NEO" (ישן) | כפתור צף בכל דף מחוץ ל-`/neo/`, וגרסה מוטמעת בדפי פירוט ישנים | POST `.../api/ask-v2` | `question`, `task`, `bookId`, `chapter`, `section`, `scope`, וגם `context`: מודול, סוג נושא, מזהה וכותרת הדף | `components/ask-ai.tsx:25,152-166`, `components/app-shell.tsx:133`, למשל `app/tcode/[code]/layout.tsx:15` |
| סביבת AI ישנה | `/library/ask/`, `/chat/` | POST `.../api/library-stream` או `.../api/consult-stream` | כמו NEO | `components/ai/ai-workspace.tsx:121-126`, `app/library/ask/page.tsx:24`, `app/chat/page.tsx:27` |

- כותרות הבקשה: רק `content-type` (`lib/ai/stream.ts:69`, `lib/ai/client.ts:186`, `components/ask-ai.tsx:159`). אין Authorization, אין מזהה משתמש או הפעלה, ואין שאלות קודמות מהשיחה [קוד].
- מה שהשירות עושה עם השאלה נמצא מחוץ למאגר הזה. הקוד אומר שהתשובה לוקחת 15 עד 80 שניות "depending on which provider serves" (`lib/ai/client.ts:34-35`), כלומר מאחורי השירות יש ספק AI אחד או יותר [הסקה]. `docs/neo-master-matrix.md:50` מציין שכל קריאה צורכת טוקנים בתשלום אצל ספק. שמות הספקים, שמירת המידע ואזורי העיבוד אינם במאגר (ראו C).
- הכתובת מופיעה בקובץ JS חי (`/_next/static/chunks/19uao5b-9ovld.js`) [חי].
- כל בקשת HTTP חושפת לשרת שמקבל אותה כתובת IP, User-Agent, זמן והכתובת המבוקשת: ל-Vercel עבור האתר, ולפריסת sap-books-api עבור שאלות AI [ידע כללי]. בבקשה למקור אחר נשלח ב-Referer רק המקור, לפי `Referrer-Policy: strict-origin-when-cross-origin` (`vercel.json:30`) [ידע כללי].
- מפתח API בדפדפן: אין כיום. משתני `NEXT_PUBLIC_` היחידים בקוד הם `NEXT_PUBLIC_BOOKS_API_URL`, `NEXT_PUBLIC_GSC_VERIFICATION`, `NEXT_PUBLIC_BING_VERIFICATION` [קוד]. סריקה של 30 קובצי JS חיים לא מצאה תבנית מפתח של Google (`AIza`), OpenAI (`sk-`) או Anthropic (`sk-ant-`) [חי].
- היסטוריה [git]: מ-`666805f5` (2026-06-09) עד `2f4447d8` (2026-08-08) דף הצ'אט הישן השתמש ב-`lib/gemini.ts`. הקובץ לקח מפתח Gemini מ-`NEXT_PUBLIC_GEMINI_API_KEY` שבחבילה או ממפתח שהמשתמש הדביק ונשמר ב-`neo:gemini-key`, ופנה ל-Gemini ישירות מהדפדפן. `2f4447d8` הסיר את זה והוסיף את המחיקה ב-`lib/purge-legacy.ts:1-35`.
- מה הממשק אומר למשתמש:
  - `/neo/chat/`: רשימת מגבלות קבועה, ובה "נשלחת השאלה בלבד. נתוני הפרויקט אינם מצורפים לשיחה" (`components/neo-shell/chat/general-chat.tsx:57-62`, מוצגת ב-`:221`), וגם ההערה על היעדר גישה חיה ל-SAP Help ול-SAP Notes (`lib/ai/modes.ts:112-113`, מוצגת ב-`general-chat.tsx:136-139`). נבדק גם בדף החי [קוד, חי]. לא נאמר לאן השאלה נשלחת, מי מעבד אותה או לכמה זמן היא נשמרת.
  - `/neo/ai/`: נאמר שהתשובות מתוך הספרים בלבד ועם מקור (`components/neo-shell/chat/library-chat.tsx:145,149,288`). אין שום אמירה על שליחת השאלה לשירות חיצוני [קוד, חי].
  - סביבת ה-AI הישנה: "התשובות נוצרות בצד השרת. הדפדפן אינו מחזיק מפתחות גישה ואינו פונה לספק ישירות." (`components/ai/workspace-rail.tsx:138`), ומוצג שם המודל שהשירות החזיר (`components/ai/workspace-rail.tsx:129`).
  - הווידג'ט הישן: אין אמירה על שליחה (`components/ask-ai.tsx:190-256`).
  - אף משטח לא מקשר לדף הפרטיות ולא מבקש להימנע מהקלדת מידע אישי או חסוי (חיפוש החזיר 0) [קוד].
- קישור שיתוף, רק בסביבה הישנה: "העתקת קישור" מכניסה את השאלה לכתובת (`q=`) של `/ai/` (`lib/ai/export.ts:110-117`, הכפתור ב-`components/ai/answer-card.tsx:207`). פתיחת קישור כזה שולחת את השאלה בתוך הכתובת ל-Vercel [הסקה]. ב-NEO אין קישורי שיתוף [קוד].
- שאר הבקשות הן לאותו מקור: קובצי פרקים (`lib/library/book.ts:131`, `components/neo-shell/reader/neo-reader.tsx:429`), אינדקס חיפוש (`components/tx-search.tsx:35,45`), מאגר נתונים (`app/sap-infrastructure/page.tsx:19,57`), קובצי brain (`app/brain/page.tsx:34-36`) [קוד].
- קישורים יוצאים לאתרי SAP נפתחים רק בלחיצה: me.sap.com, help.sap.com, community.sap.com, api.sap.com, learning.sap.com (`lib/ai-links.ts:16-21`, `components/bapi-object-page.tsx:194`) [קוד].

### A6. טפסים, הרשמה, חשבונות, העלאת קבצים, איסוף דוא"ל

- אין הרשמה, התחברות או חשבונות [קוד].
- ה-`<form>` היחיד הוא שדה השאלה של הווידג'ט הישן (`components/ask-ai.tsx:247`). ב-NEO השאלה נשלחת מרכיב Composer בלי form [קוד].
- אין `input type="file"`, `FileReader`, שדות email, tel או password [קוד].
- ה-`mailto:` היחיד באתר נמצא בדף הפרטיות (`app/privacy/page.tsx:74`) [קוד].
- הורדות נוצרות במכשיר בלבד: ייצוא תשובה ל-Markdown, Word או הדפסה ל-PDF (`lib/ai/export.ts:61-96`), ותרשים ל-SVG (`components/ai/diagram-frame.tsx:88-96`). העתקה ללוח רק בלחיצה [קוד].
- אין שימוש ב-API של מיקום, מצלמה, מיקרופון או התראות. `Permissions-Policy` חוסם אותם (`vercel.json:31`), ו-CSP כולל `form-action 'self'` (`vercel.json:25`) [קוד].

### A7. אחסון האתר ויומנים

- ייצוא סטטי (`next.config.ts:6`), בלי כותרת X-Powered-By (`next.config.ts:10`). ב-`vercel.json`: פקודת בנייה (`vercel.json:4`), הפניה מ-www לדומיין הראשי (`vercel.json:7-12`), הפניה זמנית מ-`/` ל-`/neo/` (`vercel.json:13-17`, בפועל 307), כותרות אבטחה לכל הנתיבים (`vercel.json:20-39`) וכותרות מטמון (`vercel.json:40-47`) [קוד, חי].
- התגובות החיות נושאות `server: Vercel`, `x-vercel-cache` ו-`x-vercel-id` [חי].
- אין פונקציות שרת או middleware במאגר הזה. שירות ה-AI הוא פריסה נפרדת בכתובת vercel.app ואינו חלק מהמאגר [קוד].
- יומני הגישה של Vercel (IP, User-Agent, כתובת, זמן) נשמרים אצל Vercel. תקופת השמירה אינה גלויה במאגר: REQUIRES_OWNER_INPUT.
- `public/.well-known/security.txt:1-4`: איש קשר בדוא"ל, תוקף עד 2027-01-01 [קוד, חי].
- אפליקציית Android (TWA) מוגדרת אבל לא נבנתה: `android/twa-manifest.json:2-4`, `android/README.md:8` ("Nothing here is built yet"), וטביעת האצבע ב-`public/.well-known/assetlinks.json:8` היא עדיין placeholder [קוד]. ההערה בדף הפרטיות מזכירה את דרישת Google Play (`app/privacy/page.tsx:22`).

### A8. דף הפרטיות הקיים

- `app/privacy/page.tsx`, 82 שורות. תאריך העדכון בדף: "23 ביולי 2026" (`app/privacy/page.tsx:11`). לקובץ יש קומיט אחד בלבד, `405b3ad8` מ-2026-07-23 [git]. הדף החי זהה בתאריך ובכתובת הדוא"ל [חי].
- הדף נכתב לפני פיצ'רי ה-AI הנוכחיים: ה-CSP התיר את sap-books-api מ-`7c2b16f9` (2026-07-28), ולקוח ה-AI חובר ב-`80cf285c` ו-`569ad146` (2026-08-05) [git].
- הדף במפת האתר (`public/sitemap.xml:11189`) ומסומן index, follow [חי]. הכותרת החיה היא "SAP by Sali | מדיניות פרטיות · SAP by Sali", כי תבנית הכותרת (`app/layout.tsx:21`) מוסיפה את שם המותג פעם שנייה (`app/privacy/page.tsx:6`) [חי].
- הדף מוצג במעטפת הישנה, והקישור "חזרה לקוקפיט" מוביל ל-`/`, שמפנה ל-`/neo/` (`app/privacy/page.tsx:78`, `vercel.json:14-17`).

בדיקת הטענות:

| # | טענה (בקיצור) | שורה | מצב | ראיה |
|---|---|---|---|---|
| 1 | "אפליקציה שאינה אוספת מידע אישי ... ופועלת מקומית במכשיר" (תיאור מטא) | `:7` | לא עקבי | שאלות AI נשלחות לשרת חיצוני (A5) |
| 2 | "אינה אוספת, אינה שומרת בשרת ואינה משתפת מידע אישי כלשהו" | `:37-38` | לא עקבי חלקית, ולא ניתן לאמת | האתר עצמו לא שומר. שירות ה-AI מקבל טקסט חופשי שעשוי לכלול מידע אישי, ומה נשמר שם לא ידוע (C) |
| 3 | אין הרשמה, חשבונות, שם, דוא"ל או טלפון | `:42` | עקבי | A6 |
| 4 | אין בקשת הרשאות רגישות | `:42` | עקבי | A6, `vercel.json:31` |
| 5 | localStorage שומר התקדמות, סימניות ומצב תצוגה, נשאר במכשיר ולא נשלח | `:46` | עקבי אבל חסר | נשמרים גם הערות חופשיות, חיפושים, שיחות AI, ציוני מבחנים, וגם sessionStorage ו-Cache Storage (A2, A3) |
| 6 | אפשר למחוק "דרך הגדרות האפליקציה" | `:46` | לא עקבי חלקית | אין מחיקה כוללת, יש רק מחיקה לפי תכונה (A2) |
| 7 | אין GA, פיקסלים, עוגיות פרסום, SDK של צד שלישי, כלי מעקב או פרסומות | `:50` | עקבי בפועל | A4. הסתייגויות: חבילת `@vercel/analytics` רשומה ולא בשימוש, נקודות הקצה של Vercel Analytics פעילות ברמת הפרויקט אבל לא נטענות, וקטע ה-Toolbar קורא עוגייה (A1) |
| 8 | "לא נאסף מידע אישי, אין מה לשתף" עם צד שלישי | `:54` | לא עקבי | השאלה נשלחת ל-sap-books-api ומשם לספק AI (A5, [הסקה]). Vercel מקבל נתוני בקשה [ידע כללי] |
| 9 | עובד ברובו גם ללא רשת, והמטמון אינו כולל מידע אישי | `:58` | עקבי | A3 |
| 10 | ילדים: קהל מקצועי, "אינה אוספת מידע ... ממשתמש כלשהו" | `:62` | החלק הראשון לא ניתן לאמת, השני לא עקבי | אין הגבלת גיל. A5 |
| 11 | HTTPS בלבד, CSP הדוקה, HSTS, הגבלת הרשאות | `:66` | עקבי | `vercel.json:24-31`, כותרות חיות |
| 12 | "אין נקודות קצה חיצוניות שאליהן נשלח מידע" | `:66` | לא עקבי | `vercel.json:25` מתיר את sap-books-api, A5 |
| 13 | בעדכון המדיניות יעודכן התאריך | `:70` | לא עקבי בפועל | הדף לא עודכן מאז 2026-07-23 למרות הוספת ה-AI |
| 14 | "המשך השימוש מהווה הסכמה" | `:70` | לא ניתן לאמת | שאלה משפטית (C) |
| 15 | פנייה בנושא פרטיות: sali2610@gmail.com | `:74` | קיים | אותה כתובת ב-`public/.well-known/security.txt:1`. האם זו כתובת הפנייה הרשמית: C |
| 16 | הערת קוד: 100% offline, no accounts, no analytics, no trackers | `:22-24` | לא עקבי בחלק של offline | ה-AI דורש רשת (`lib/ai/client.ts:42`) |

תנאי שימוש והצהרת נגישות:

- אין דף ואין טקסט. חיפוש של תקנון, תנאי שימוש, הצהרת נגישות, רכז נגישות, terms of use, terms of service, accessibility statement ו-disclaimer ב-`app`, `components`, `lib` ובמפת האתר החזיר 0 [קוד]. `/terms/` ו-`/accessibility/` מחזירים 404 [חי].
- המילה נגישות מופיעה רק כתווית של בקר גודל גופן בממשק הישן, "הגדרות נגישות" (`components/ux-settings.tsx:87`) [קוד].

### A9. כותרות תחתונות ונקודות כניסה

- הפוטר הישן `components/Footer.tsx:7-30`: "Built by Sali Halif · Project NEO • SAP Knowledge Platform", קישור "מדיניות פרטיות" ל-`/privacy/` (`components/Footer.tsx:21`), והשורה "100% Offline · Static Export" (`components/Footer.tsx:25`, הטקסט ב-`lib/i18n.tsx:84`). הוא מוצג רק במעטפת הישנה (`components/app-shell.tsx:118`). בנתיבי `/neo/*` ה-AppShell חוזר בלי כותרת ובלי פוטר (`components/app-shell.tsx:91,103`) [קוד].
- `/` מפנה ל-`/neo/` (`vercel.json:14-17`), כך שמבקר רגיל מתחיל ב-NEO [קוד, חי].
- ב-NEO אין קישור ל-`/privacy/`: 0 ב-`components/neo-shell` וב-`app/neo`, ו-0 ב-HTML החי של `/neo/`, `/neo/ai/`, `/neo/chat/` [קוד, חי].
- הקרדיט ב-NEO:
  - ראש הרייל בדסקטופ: "SAP by Sali" ומתחת "Project NEO" (`components/neo-shell/search/shell-client.tsx:693-698`).
  - תחתית הרייל בדסקטופ: אווטאר "SH", "Sali Halif", "Web Coding" וכפתור מצב (`components/neo-shell/search/shell-client.tsx:878-895`). לרייל יש מצבים `hidden` ו-`peek` (`components/neo-shell/types.ts:10`), ובהם התחתית אינה גלויה עד שפותחים את הרייל.
  - מובייל: `.nx-mcredit` עם "Project NEO · CBC Israel · פותח על ידי סאלי חליף · Web Coding" (`components/neo-shell/search/shell-client.tsx:968-970`), מעל סרגל הלשוניות בית, ניווט, חיפוש (`components/neo-shell/mobile-nav.tsx:18-44`). השורה מוסתרת בטלפון ובטאבלט כשבדף יש שורת קרדיט משלו (`app/neo/rail.css:865-868`).
  - שורות קרדיט באותו טקסט בתחתית משטחים: בית `app/neo/page.tsx:342-344`, מדף הספרים `app/neo/books/page.tsx:139`, רכזת ספר `components/neo-shell/books/book-hub.tsx:360`, סביבת מודול `components/neo-shell/workspace/module-workspace.tsx:530`, פירוט טבלה `components/neo-shell/data/tables-detail-view.tsx:868-871`, אובייקט `components/neo-shell/object/object-view.tsx:881` ו-`components/neo-shell/object/object-aux-view.tsx:430-433`, מודל תחומים `components/neo-shell/domain/domain-view.tsx:96`, ERD `components/neo-shell/erd/erd-workspace.tsx:2913`.
  - ממצא צדדי: `components/neo-shell/domain/domain-view.tsx:405-408` משתמש במחלקה `.ndm-credit` עבור השורה "התוכן מוצג כפי שנכתב בתיעוד הפרויקט.", ולכן בנתיבי `/neo/domain/<slug>/` בטלפון שורת הקרדיט הניידת מוסתרת למרות שאין בדף קרדיט אמיתי [הסקה מה-CSS]. `components/neo-shell/s4/s4-view.tsx:111-116` (`.ns4-credit`) לא ברשימה, ושם הקרדיט הנייד נשאר.
  - ה-Dock: קבוע בפינה התחתונה בכל נתיב NEO ובכל מכשיר (`app/neo/layout.tsx:39`, `app/neo/dock.css:22-31`), עם "הגדרות תצוגה" ו"עזרה בעמוד הזה" (`components/neo-shell/dock/neo-dock.tsx:104-127,217-248`).
- איפה קישורים משפטיים יצטרכו לשבת כדי שכל דף ב-NEO יגיע אליהם [הסקה]: בדסקטופ, תחתית הרייל לא מכסה את מצבי hidden ו-peek. בנייד, `.nx-mcredit` מוסתר ב-8 משטחים לפחות, ולכן קישור רק שם לא יספיק ויהיה צורך גם בשורות הקרדיט של המשטחים או במקום משותף. חלונית העזרה של ה-Dock היא המשטח המשותף היחיד שקיים בכל נתיבי NEO ובכל המכשירים.

### A10. זהות ואמון

- מטא-דאטה (`app/layout.tsx:17-57`): כותרת ברירת מחדל "SAP by Sali | Project NEO" ותבנית "SAP by Sali | %s" (`:19-22`), תיאור באנגלית (`:14-15`), `applicationName` "SAP by Sali" (`:24`), `authors` ו-`creator` "Sali Halif" (`:25-26`), `publisher` "SAP by Sali" (`:27`), locale `he_IL` (`:40`). אין שדה `generator`, וב-HTML החי אין meta generator [קוד, חי].
- JSON-LD (`app/layout.tsx:70-120`): WebSite "SAP by Sali", Organization "SAP by Sali", Person "Sali Halif" עם jobTitle "SAP Architecture & Development", ו-WebApplication במחיר 0 USD (`:116`).
- Manifest (`app/manifest.ts:11-13,36`): שם "SAP by Sali · Project NEO", קיצור "SAP by Sali", וקיצור דרך בשם "SAP Academy".
- אייקונים: `app/icon.svg` הוא ריבוע אדום מעוגל עם גרף לבן של שלוש נקודות, בלי טקסט. `app/apple-icon.png` ו-`public/icon-512.png` נבדקו ויזואלית: אותו סמל, בלי טקסט. `app/favicon.ico` לא נבדק ויזואלית [קוד].
- תמונת OG (`public/og.png`, נבדקה ויזואלית): "SAP BY SALI", "Project NEO", הכותרת "Interactive SAP Knowledge Platform" כשהמילה SAP באדום, "Architecture Explorer · Table Explorer · Business Processes · PP · PP-PI · PM · Learning & Enterprise Documentation", תגית "PP · PP-PI · PM · S/4HANA", ו-"Created by Sali Halif".
- אין הודעת סימני מסחר ואין הבהרה שהאתר אינו קשור ל-SAP SE. חיפוש של SAP SE, trademark, סימן מסחרי, not affiliated, unofficial, לא רשמי, ® ו-™ החזיר 0 [קוד].
- הבהרות קיימות שההערכה אינה הסמכה רשמית של SAP: `app/neo/certification/page.tsx:21`, `components/neo-shell/learn/cert-surface.tsx:92,194`, `components/neo-shell/learn/cert-exam.tsx:155` [קוד].
- פריטים שעלולים לרמוז על קשר רשמי ל-SAP: המותג והדומיין sapbysali.app, חבילת ה-Android `app.sapbysali.twa` (`android/twa-manifest.json:2`), השורה "SAP Enterprise Knowledge Platform · CBC Israel" בראש דף הבית (`app/neo/page.tsx:146-150`), הכותרת בתמונת ה-OG, והשם "SAP Academy" (`app/manifest.ts:36`) [קוד]. ההערכה המשפטית אינה חלק מהמיפוי.
- CBC Israel מופיע בראש דף הבית (`app/neo/page.tsx:149`), בכותרות "CBC ISRAEL · PROJECT NEO" (`app/neo/books/page.tsx:45`, `components/neo-shell/workspace/workspace-header.tsx:64`), בכל שורות הקרדיט (A9), ובתוכן: "דוגמה מ-CBC" בשיעורים (`components/neo-shell/learn/lesson-view.tsx:67`) ו"דוגמת CBC" בדפי Fiori (`components/fiori/app-page.tsx:107`) [קוד].
- אזכור כלי AI ששימשו לבניית האתר: לא ב-meta ולא בממשק NEO. חריג: הדף `/brain/` (במפת האתר `public/sitemap.xml:5939`, index, follow, מחזיר 200) והקבצים הציבוריים `/sap-ai-brain/manifest.json`, `capability-registry.json`, `brain.json` מציגים רשימה של תיקיות `.claude/skills` ו-`.claude/commands` של הפרויקט, כולל שם קובץ `gemini_watermark_remover.py` (`public/sap-ai-brain/manifest.json:330`) [קוד, חי]. בהודעות הקומיט יש שורות "Co-Authored-By: Claude", והן אינן מוגשות באתר [git].

### A11. פיצ'רי ה-AI: מה הממשק מבטיח

- "שאל את הספרייה": "תשובות מספרי הספרייה בלבד, עם הפניה מדויקת למקור" ו"כשאין מקור מאומת בספרים, המערכת מציינת זאת במקום לנחש" (`lib/ai/modes.ts:45-46`). יכולות: פתיחת הפרק במקור, פתיחת הספר, הפניה לעמוד ולסעיף, רמת ביסוס לכל תשובה (`lib/ai/modes.ts:64-68`). בדף: "עזרה מהספרייה · תשובות מהספרים בלבד, עם מקור" (`components/neo-shell/chat/library-chat.tsx:145`). תיאור המטא: "התשובות מבוססות על הספרים בלבד, עם הפניה לספר, לפרק ולסעיף" (`app/neo/ai/page.tsx:24`).
- "שיחה כללית על SAP": ייעוץ כללי, ו"כשנושא דורש אימות מול המערכת או מקור רשמי, המערכת מציינת זאת" (`lib/ai/modes.ts:82`). ההערה הקבועה: אין גישה חיה ל-SAP Help, ל-SAP Notes או ל-SAP Community, ויש לאמת מזהים ומספרי Note מול מקור רשמי (`lib/ai/modes.ts:112-113`). תיאור המטא: "כל תשובה מציינת את רמת הביסוס שלה ומה דורש אימות מול מערכת SAP" (`app/neo/chat/page.tsx:23`).
- תוויות על כל תשובה: "מבוסס על המקורות", "מבוסס חלקית על המקורות", "לא נמצא מקור מאומת", "ללא ציטוט ממקור", ובשיחה הכללית "ידע כללי · ללא ציטוט ממקור" (`components/neo-shell/chat/message.tsx:273-298`). בזמן הכתיבה: "טיוטה: הטקסט הסופי יוצג לאחר בדיקת הביסוס מול המקורות." (`components/neo-shell/chat/live.tsx:103`). ליד כל מקור מוצג "ציון אחזור" כפי שהתקבל מהשירות (`components/neo-shell/chat/sources.tsx:68-71`).
- ה-Dock: "שאל את הספרייה · תשובות מתוך 11 הספרים, עם מקורות" ו-"NEO AI · שאלות SAP כלליות, ללא מקורות מהפרויקט" (`components/neo-shell/dock/neo-dock.tsx:241,246`).
- הסביבה הישנה: "ביסוס על מקורות: נאכף" ו"תשובה שלא עברה אימות מקורות מוחלפת בהודעה" (`components/ai/workspace-rail.tsx:180-185`).
- פרט במנגנון: כשהשירות לא מחזיר תווית מדיניות, הלקוח מתייחס לתשובה כ-FULL, אלא אם היא מתחילה ב"לא מצאתי" או "לא נמצא" (`lib/ai/client.ts:212-216,295-298`). תווית "מבוסס על המקורות" (`components/neo-shell/chat/message.tsx:283-292`) יכולה לכן לנבוע מההנחה הזו יחד עם קיום ציטוטים [קוד].
- אין אמירה כללית שתשובות AI עלולות להיות שגויות, ואין אמירה שאין זה ייעוץ מקצועי, ב-`/neo/ai/` ובווידג'ט הישן. ב-`/neo/chat/` יש רק את הקריאה לאמת מזהים (`lib/ai/modes.ts:113`) [קוד].
- ה-AI דורש רשת: "אין חיבור לרשת. התשובות דורשות חיבור פעיל" (`lib/ai/client.ts:42`). מולו, דף הבית של NEO כותב שהפלטפורמה "זמינה במלואה גם ללא חיבור לרשת" (`app/neo/page.tsx:159`, גם בדף החי), והפוטר הישן כותב "100% Offline" (`lib/i18n.tsx:84`) [קוד, חי].

### A12. תוכן צד שלישי וקניין רוחני (נדרש לתנאי השימוש)

- בספרייה 11 ספרים (`data/books/book1.json` עד `book11.json`). `meta.publisher` הוא "SAP PRESS" בספרים 1 עד 10 ו-"ZaranTech" בספר 11 [קוד].
- 212 קובצי JSON של ספרים מוגשים בציבור תחת `/books/` (135 קובצי פרקים ו-77 אינדקסים של איורים). הם נוצרים בשלב ה-prebuild (`package.json:19`) ואינם ב-git (`.gitignore:67`). רשומות הפרקים מכילות `en`, הטקסט באנגלית, ו-`he` [קוד]. `/books/book1/ch1.json` מחזיר 200, 143,175 בתים [חי].
- 3,855 איורי PNG של ספרים 1 עד 6 תחת `public/assets/library/book*/figures/` (521, 861, 495, 486, 835, 657). דוגמה חיה מחזירה 200, כמגה-בייט [קוד, חי]. הקורא של NEO מציג אותם כ"איורים סרוקים" לפי עמוד המקור (`components/neo-shell/reader/neo-reader.tsx:931`).
- החלטה פתוחה שכתובה במאגר: לאשר שמותר לעבד ולשמור תוכן של ספרים מוגבלים בזכויות יוצרים ("confirm allowed to process & store derived Hebrew text", `docs/SAP_LIBRARY_ARCHITECTURE.md:224`). לא נמצא תיעוד רישיון או הרשאה. חיפוש של copyright ו"זכויות" ב-`docs`, `data/library`, `app`, `components`, `lib` מצא רק את השורה הזו, הערת "COPYRIGHT-SAFE" במודול אחר (`data/library/pp-knowledge.ts:3`), וקובצי הרישיון של הגופנים [קוד].
- אין באתר הודעת זכויות יוצרים ("©" או "כל הזכויות שמורות"): חיפוש החזיר 0 [קוד].
- ענף העיצוב מוסיף חמש משפחות גופנים ברישיון OFL, כל אחת עם `OFL.txt` תחת `app/fonts/*/` (קומיט `243e2349`) [git]. הייצור משתמש כיום בגופני מערכת (`docs/redesign-2026-09/BASELINE.md`, fonts 0).

### A13. בדיקות נגישות שבוצעו בפועל (בסיס להצהרה)

- הכלים: `scripts/qa/axe-sweep.mjs` (axe-core 4.12.0, תגיות wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa, `scripts/qa/axe-sweep.mjs:22`), `scripts/qa/keyboard-check.mjs` (40 עצירות Tab בכל נתיב), `scripts/qa/a11y-sample.mjs` (בדיקה פנימית של ניגודיות, גודל מטרות ומיקוד מוסתר) [קוד].
- הנתיבים: 32 נתיבי NEO מתוך `scripts/qa/ux-measure.mjs`, ובהם `/neo/ai/` ו-`/neo/chat/` במצב ריק (הסקריפט רק טוען את הדף). נתיבים מחוץ ל-NEO, כולל `/privacy/`, לא נבדקו ב-axe ובמקלדת. הבדיקה הפנימית הוסיפה שני נתיבים ישנים של `/exits/*`, ובסך הכל 37 [קוד].
- ריצה על הייצור, 2026-09-28 בין 19:21 ל-19:59 UTC, https://sapbysali.app ב-`6ba22207`. הראיות מחוץ למאגר: `/Users/salihalif/Desktop/My-Projects/neo-redesign-evidence/before/astra-prod-summary.md` ו-`astra-prod-runs/`, ומוזכרות ב-`docs/redesign-2026-09/BASELINE.md` [ראיה]:
  - axe ברוחב 1363, בהיר וכהה: נתיב אחד עם הפרה, `/neo/read/book2/`, target-size (serious) בשלושה רכיבים. ברוחב 390, בהיר וכהה: 0.
  - מקלדת ברוחב 1363 וברוחב 390: 32 נתיבים, 1,280 עצירות בכל ריצה, 0 מלכודות, 0 מיקוד מחוץ למסך, 0 מיקוד בלי שינוי נראה.
  - בדיקה פנימית: 37 נתיבים, 15,924 צמתי טקסט, 0 כשלי ניגודיות בבהיר ובכהה. 5 מטרות קטנות מ-24 פיקסלים, מתוארות כחריגים מתועדים.
- ריצה מקומית של אותו עץ ב-2026-09-28 בשעה 16:43 UTC (`audit/master-completion/astra-reverify/summary.md:1-3,173-180`): ספירה חוזרת של קובצי ה-JSON נותנת אותה תוצאה ב-axe ובמקלדת [ראיה].
- הערכת הפרויקט עצמו: הרכיבים ב-`/neo/read/book2/` הם סימוני פרקים שנכנסים לחריג "equivalent" של WCAG 2.5.8 (`audit/master-completion/TAB-SWEEP.md:145-153`). זו הערכה פנימית, לא ביקורת חיצונית.
- גבולות הבדיקה:
  - כל הבדיקות רצו ב-Chrome ללא ממשק על macOS. ריצות "390" משתמשות ב-User-Agent של דסקטופ, ולכן מציגות את מעטפת הדסקטופ ברוחב צר ולא את מעטפת הטלפון (`scripts/qa/axe-sweep.mjs:14`, `scripts/qa/keyboard-check.mjs:14`). האפשרות `UA=phone` שבשורת השימוש (`scripts/qa/keyboard-check.mjs:5`) אינה ממומשת. הטבלה ב-TAB-SWEEP מסמנת את זה "(desktop UA)" (`audit/master-completion/TAB-SWEEP.md:147-149`).
  - ריצות עם User-Agent של iPhone ו-iPad קיימות רק לבדיקת גלישה של פריסה (ux-measure, אמולציה ב-Chrome).
  - לא נבדק עם קורא מסך (`audit/master-completion/TAB-SWEEP.md:202-203`).
  - לא נבדק על מכשיר פיזי ולא ב-Safari (`audit/master-completion/TAB-SWEEP.md:204`, `audit/master-completion/BLOCKERS.md:18`).
  - זום 200% נבדק באמולציה של רוחב CSS, לא בזום דפדפן (`audit/master-completion/TAB-SWEEP.md:186-189`).
  - הבדיקה הפנימית מפספסת טקסט דהוי דרך opacity וטקסט קטן בתגיות, ולכן axe הוא השער (`audit/master-completion/TAB-SWEEP.md:170-173`).
  - מצבי תשובה של ה-AI לא נסרקו, ותשובות AI חיות לא נבדקו כלל (`audit/ux-2026-09/AI-LIVE-TEST.md:3`).
  - הפרויקט כותב במפורש: "No full WCAG conformance is claimed." (`audit/master-completion/TAB-SWEEP.md:208`).
- התאמות שקיימות בקוד: `lang="he" dir="rtl"` (`app/layout.tsx:134`), קישור דילוג ב-NEO (`components/neo-shell/search/shell-client.tsx:679`) ובמעטפת הישנה (`components/app-shell.tsx:106`), הגדרות תצוגה של מראה, גופן וגודל טקסט שנשמרות במכשיר (`components/neo-shell/dock/neo-dock.tsx:138-196`), כיבוד העדפת תנועה מופחתת (`app/globals.css:173`, `app/neo/motion.css:344`), ומטרות מגע מוגדלות ב-Dock למצביע גס (`app/neo/dock.css:57,135`) [קוד].

---

## B. פערים בדף הפרטיות הקיים

1. **הדף אומר שאין שליחת מידע, וזה לא נכון מאז אוגוסט 2026.** הטענות "אין נקודות קצה חיצוניות" (`app/privacy/page.tsx:66`) ו"אין מה לשתף" (`app/privacy/page.tsx:54`) סותרות את שליחת השאלות ל-sap-books-api (A5). זה הפער החמור ביותר.
2. **אין סעיף AI.** חסר: אילו שדות נשלחים, לאן, מי הספק, כמה זמן נשמר, האם משמש לאימון, והמלצה לא להקליד מידע אישי או חסוי. אין הודעה במקום האיסוף עצמו: `/neo/ai/` והווידג'ט הישן לא אומרים שהשאלה יוצאת מהמכשיר (A5).
3. **אין זהות של מפעיל האתר.** יש רק כתובת דוא"ל (`app/privacy/page.tsx:74`), בלי שם אדם או ישות.
4. **אין אזכור לאחסון ב-Vercel וליומני שרת** (IP, User-Agent, כתובת, זמן) ולתקופת השמירה שלהם (A7).
5. **תיאור האחסון המקומי חלקי.** חסרים הערות חופשיות, חיפושים שהוקלדו, היסטוריית שיחות AI עם השאלות, ציוני מבחנים, sessionStorage ו-Cache Storage (A2, A3).
6. **הבטחת מחיקה שאין לה כיסוי.** "אפשר למחוק דרך הגדרות האפליקציה" (`app/privacy/page.tsx:46`), אבל אין פעולת מחיקה כוללת (A2).
7. **אין סעיף עוגיות מפורש.** הדף מזכיר רק "עוגיות פרסום". העובדה שהאתר אינו יוצר עוגיות כלל (A1) אינה כתובה.
8. **אין שמירת מידע, זכויות משתמש, העברה לחו"ל וגורמים מעבדים** (Vercel, שירות ה-AI, ספקי ה-AI).
9. **התאריך ישן.** "23 ביולי 2026" (`app/privacy/page.tsx:11`), קומיט יחיד, למרות שה-AI נוסף אחריו. הדף עצמו מתחייב לעדכן את התאריך בכל שינוי (`app/privacy/page.tsx:70`).
10. **סעיף הילדים** טוען שלא נאסף מידע מאף משתמש (`app/privacy/page.tsx:62`), וזה לא עקבי עם A5. אין מדיניות גיל.
11. **הדף אינו מקושר מ-NEO.** מבקר מתחיל ב-`/neo/` (`vercel.json:14-17`), והקישור היחיד קיים בפוטר הישן (A9).
12. **טענות "offline" סותרות במקומות אחרים:** "100% Offline" בפוטר (`lib/i18n.tsx:84`), "זמינה במלואה גם ללא חיבור לרשת" בבית של NEO (`app/neo/page.tsx:159`), מול דף הניתוק (`app/offline/page.tsx:25`) והודעת ה-AI (`lib/ai/client.ts:42`). מדיניות חדשה שתתאר את המצב בדיוק תסתור את הטקסטים האלה אם הם יישארו.
13. **קישור שיתוף בסביבה הישנה** שם את השאלה בכתובת (`lib/ai/export.ts:110-117`), והדף לא מזכיר את זה.
14. **מסמך פנימי מיושן:** `docs/security/HEADERS.md` אומר "No external origins are allowlisted", וזה לא נכון מאז `7c2b16f9`. לא מוצג למשתמשים, אבל הוא המקור שממנו נכתב הדף.
15. **כותרת כפולה:** "SAP by Sali | מדיניות פרטיות · SAP by Sali" (A8). קוסמטי.
16. **Android:** ההערה בקוד מזכירה את Google Play (`app/privacy/page.tsx:22`). אם האפליקציה תפורסם, טופס Data safety צריך להתאים לדף.

---

## C. REQUIRES_OWNER_INPUT

אף אחד מהפרטים האלה אינו נגזר מהמאגר. אין למלא אותם בהשערה.

1. **זהות המפעיל:** שם האדם או הישות המשפטית שמפעילה את sapbysali.app, מספר עוסק או חברה אם יש, וכתובת למכתבים אם נדרשת.
2. **הקשר ל-CBC Israel:** האם CBC היא הבעלים, לקוח או מעסיק; האם יש אישור להציג את השם באתר ציבורי (A10); האם "דוגמאות CBC" בשיעורים ובדפי Fiori אושרו לפרסום.
3. **ערוצי פנייה בנושא פרטיות:** האם sali2610@gmail.com (`app/privacy/page.tsx:74`, `public/.well-known/security.txt:1`) היא הכתובת הרשמית, או כתובת אחרת. טלפון אם רוצים.
4. **ערוצי פנייה בנושא נגישות:** כתובת דוא"ל, טלפון, ושם רכז או רכזת נגישות אם יש. כרגע אין שום ערוץ נגישות.
5. **דין חל וסמכות שיפוט** לתנאי השימוש.
6. **המסגרות המשפטיות שחלות** (למשל חוק הגנת הפרטיות, תקנות הנגישות, GDPR אם יש משתמשים מהאיחוד). לא נקבע כאן. הרמזים היחידים במאגר הם עברית, `he_IL` (`app/layout.tsx:40`) ו-`C=IL` בדוגמת מפתח החתימה (`android/README.md`).
7. **שירות ה-AI:** אילו ספקי AI מעבדים את השאלות, באילו אזורים, כמה זמן השאלות והתשובות נשמרות אצל הספקים ואצל sap-books-api, האם הן משמשות לאימון, והאם sap-books-api מתעד את גוף הבקשה ביומנים.
8. **Vercel:** תקופת שמירת היומנים בפרויקט האתר ובפרויקט sap-books-api, ואזורי הפונקציות של sap-books-api.
9. **Web Analytics ו-Speed Insights:** נקודות הקצה עונות 200 (A4). האם להשבית אותן בהגדרות הפרויקט, או לאשר שהן נשארות לא בשימוש.
10. **נתונים היסטוריים:** בין 2026-07-04 ל-2026-07-21 רץ באתר `<Analytics />` של Vercel, ואולי GA4 אם `NEXT_PUBLIC_GA_ID` הוגדר (A4). האם נשארו נתונים בחשבונות האלה, ומה עושים איתם.
11. **תאריכי תחולה** לכל אחד משלושת הדפים, ומדיניות גרסאות.
12. **זכויות בתוכן הספרים:** רישיון או הרשאה לפרסום הטקסט באנגלית, העיבוד לעברית ו-3,855 האיורים של ספרי SAP PRESS ו-ZaranTech (A12), ונוסח הייחוס. זו ההחלטה הפתוחה ב-`docs/SAP_LIBRARY_ARCHITECTURE.md:224`.
13. **שימוש בשם SAP:** האם המותג והדומיין נשארים, ונוסח הודעת סימני מסחר ואי-קשר ל-SAP SE, מאושר על ידי יועץ.
14. **בעלות על הקוד והעיצוב** של האתר, לסעיף הקניין הרוחני.
15. **גיל מינימלי וקהל יעד** לסעיף הקטינים.
16. **האם השירות חינמי** לאורך זמן (ה-JSON-LD אומר 0, `app/layout.tsx:116`), וסעיפי הגבלת אחריות ואחריות מוגבלת, בנוסח של יועץ.
17. **שימוש מותר ואסור:** למשל איסור הורדה אוטומטית של תוכן. החלטה של הבעלים.
18. **טיפול בבקשות משתמשים:** זמן תגובה ואופן אימות זהות.
19. **נגישות:** תקן היעד (ת"י 5568, WCAG 2.1 AA או 2.2 AA), האם חלה חובה חוקית, לוח זמנים לתיקון מגבלות ידועות, וערוץ חלופי לקבלת מידע.
20. **האם תוכן נוצר בעזרת AI:** תרגומי הספרים, הערות היועץ והשיעורים. המאגר לא מתעד איך נוצר הטקסט בעברית. והאם תנאי השימוש צריכים לומר זאת.
21. **אפליקציית Android:** האם תפורסם ב-Google Play. אם כן, המדיניות צריכה לכסות אותה.
22. **גרסה באנגלית** לדפים המשפטיים: כן או לא.
23. **החלטת מוצר:** האם `/brain/` ו-`/sap-ai-brain/*.json` נשארים ציבוריים ובמפת האתר. הם חושפים רשימת כלי פיתוח פנימיים (A10).

---

## D. מבנה מוצע לשלושת הדפים

כל סעיף מסומן במה שמותר לכתוב היום על סמך A, ובמה שממתין לבעלים. ניסוחים משפטיים, כמו הגבלת אחריות והסכמה, דורשים יועץ ואינם מוצעים כאן.

### D1. מדיניות פרטיות (`/privacy/`, מעודכנת)

| # | כותרת | מה מותר לכתוב היום | ממתין |
|---|---|---|---|
| 1 | מי אנחנו | שם האתר, sapbysali.app, Project NEO | שם המפעיל, פרטי קשר: REQUIRES_OWNER_INPUT |
| 2 | בקצרה | אין חשבונות, אין עוגיות, אין אנליטיקה או פרסום, רוב הנתונים נשמרים במכשיר, שאלות AI נשלחות לשרת | |
| 3 | מה נשמר במכשיר שלך | הקבוצות מ-A2: העדפות תצוגה, היסטוריה ומועדפים, התקדמות וציוני מבחנים, הערות שכתבת, שיחות AI. גם sessionStorage ומטמון הדפים (A3). לא נשלח לשרת | |
| 4 | איך מוחקים | הפעולות לפי תכונה מ-A2, ו"ניקוי נתוני האתר" בדפדפן. אין כרגע מחיקה כוללת באפליקציה | אם תיבנה מחיקה כוללת, לעדכן |
| 5 | מה יוצא מהמכשיר: גלישה רגילה | כל בקשה מגיעה ל-Vercel, שמארח את האתר, עם כתובת IP, סוג דפדפן, הכתובת המבוקשת וזמן | תקופת השמירה: REQUIRES_OWNER_INPUT |
| 6 | מה יוצא מהמכשיר: עוזרי ה-AI | השדות המדויקים מ-A5 לכל משטח, כולל הקשר הדף בווידג'ט הישן. היעד sap-books-api.vercel.app. לא נשלחים מזהה משתמש, עוגיות או שאלות קודמות. המלצה לא להקליד מידע אישי או חסוי | שמות ספקי ה-AI, שמירה, אימון, אזורים: REQUIRES_OWNER_INPUT |
| 7 | קישורי שיתוף | בסביבה הישנה השאלה נכנסת לכתובת הקישור | אם הסביבה הישנה תוסר, למחוק את הסעיף |
| 8 | עוגיות | האתר אינו יוצר עוגיות. בקשות ה-AI לא שולחות עוגיות | |
| 9 | אנליטיקה ומעקב | אין כלי אנליטיקה, פיקסלים או פרסום. מדיניות האבטחה מגבילה חיבורים לאתר עצמו ולשירות ה-AI בלבד | אישור מצב Vercel Analytics: REQUIRES_OWNER_INPUT |
| 10 | עבודה ללא רשת | Service Worker שומר דפים שביקרת בהם ונכסים ציבוריים. לא שומר שאלות. ה-AI דורש רשת | |
| 11 | גורמים שמעבדים מידע | Vercel (אחסון) ושירות ה-AI | ספקי ה-AI והסכמי העיבוד: REQUIRES_OWNER_INPUT |
| 12 | העברה מחוץ לישראל | | REQUIRES_OWNER_INPUT |
| 13 | שמירת מידע | במכשיר: עד שתמחק. תקרות קיימות: 40 שאלות בשיחת NEO (`components/neo-shell/chat/store.ts:58`), 20 שיחות בסביבה הישנה (`lib/ai/history.ts:40`) | יומני שרת ושירות ה-AI: REQUIRES_OWNER_INPUT |
| 14 | הזכויות שלך | נתוני המכשיר בשליטתך המלאה | אופן פנייה, זמן תגובה, הדין החל: REQUIRES_OWNER_INPUT |
| 15 | אבטחה | HTTPS, HSTS, CSP, חסימת הרשאות מכשיר, מניעת הטמעה במסגרת (`vercel.json:24-31`) | |
| 16 | קטינים | | גיל מינימלי: REQUIRES_OWNER_INPUT |
| 17 | אפליקציית Android | | רק אם תפורסם: REQUIRES_OWNER_INPUT |
| 18 | שינויים במדיניות | תאריך עדכון בראש הדף | תאריך תחולה: REQUIRES_OWNER_INPUT |
| 19 | יצירת קשר | | REQUIRES_OWNER_INPUT |

### D2. תנאי שימוש (`/terms/`, חדש)

| # | כותרת | מה מותר לכתוב היום | ממתין |
|---|---|---|---|
| 1 | הגדרות ומפעיל האתר | | זהות המפעיל: REQUIRES_OWNER_INPUT |
| 2 | מהות השירות | פלטפורמת ידע ולמידה על SAP, בדגש על PM ו-PP-PI, ללא הרשמה | האם חינמי לאורך זמן: REQUIRES_OWNER_INPUT |
| 3 | אי-קשר ל-SAP SE וסימני מסחר | כיום אין הבהרה כזו באתר (A10) | נוסח ואישור יועץ: REQUIRES_OWNER_INPUT |
| 4 | אופי התוכן ומגבלותיו | התוכן נגזר מתיעוד הפרויקט, ופער מוצג כ"לא קיים תיעוד מאומת במאגר". אינו מחליף תיעוד רשמי של SAP או SAP Notes. ההערכה העצמית אינה הסמכה רשמית של SAP (A10) | |
| 5 | עוזרי ה-AI | שני המצבים ומגבלותיהם כפי שמוצגים היום (A11): הספרייה עונה מהספרים בלבד, השיחה הכללית עונה מידע כללי בלי גישה חיה ל-SAP Help או SAP Notes. יש לאמת מזהים ומספרי Note מול מקור רשמי | נוסח אחריות על שגיאות AI: REQUIRES_OWNER_INPUT (יועץ) |
| 6 | קניין רוחני | הספרים מיוחסים למוציאים לאור לפי `meta.publisher` (A12). גופני OFL, אם ענף העיצוב ימוזג | רישיון לתוכן הספרים, בעלות על הקוד והעיצוב, הודעת זכויות יוצרים: REQUIRES_OWNER_INPUT |
| 7 | שימוש מותר ואסור | | REQUIRES_OWNER_INPUT |
| 8 | תוכן שהמשתמש יוצר | הערות נשמרות רק במכשיר ואינן מתפרסמות. שאלות AI נשלחות לשרת (הפניה למדיניות הפרטיות) | |
| 9 | זמינות | אתר סטטי. ללא רשת זמינים רק דפים שכבר נפתחו, וה-AI דורש רשת | התחייבות זמינות, אם בכלל: REQUIRES_OWNER_INPUT |
| 10 | קישורים לאתרים חיצוניים | קישורים ל-me.sap.com, help.sap.com, community.sap.com, api.sap.com, learning.sap.com, שיש להם תנאים משלהם | |
| 11 | הגבלת אחריות | | REQUIRES_OWNER_INPUT (יועץ) |
| 12 | דין חל וסמכות שיפוט | | REQUIRES_OWNER_INPUT |
| 13 | שינויים בתנאים | | תאריך תחולה: REQUIRES_OWNER_INPUT |
| 14 | יצירת קשר | | REQUIRES_OWNER_INPUT |

### D3. הצהרת נגישות (`/accessibility/`, חדש)

מה אפשר לומר ביושר היום, לפי A13:

| # | כותרת | מה מותר לכתוב היום | ממתין |
|---|---|---|---|
| 1 | מחויבות | | תקן היעד והאם חלה חובה חוקית: REQUIRES_OWNER_INPUT |
| 2 | מצב ההתאמה | לא נטענת התאמה מלאה לתקן. זה תואם את מה שהפרויקט עצמו כותב (`audit/master-completion/TAB-SWEEP.md:208`) | |
| 3 | מה נבדק ומתי | ב-28 בספטמבר 2026 נבדקו 32 מסכי NEO באתר החי בבדיקה אוטומטית: axe-core 4.12.0 מול כללי WCAG 2.0, 2.1 ו-2.2 ברמות A ו-AA, ברוחב 1363 וברוחב 390, בערכת צבעים בהירה וכהה. נמצא ממצא אחד: מטרות לחיצה קטנות בסימוני הפרקים בקורא הספרים (`/neo/read/book2/`). בדיקת מקלדת: 40 עצירות Tab בכל מסך, בלי מלכודות מיקוד, בלי מיקוד מחוץ למסך ובלי מיקוד בלתי נראה. בדיקת ניגודיות פנימית ב-37 מסכים לא מצאה כשלים | |
| 4 | מה לא נבדק | אין בדיקה עם קורא מסך. אין בדיקה על מכשיר נייד פיזי ואין בדיקה ב-Safari. הבדיקות האוטומטיות רצו בדפדפן Chrome במחשב, כך שתצוגת הטלפון לא נסרקה ב-axe ובמקלדת. דפים מחוץ ל-NEO, כולל דפי המדיניות, לא נסרקו ב-axe. תשובות של עוזרי ה-AI לא נסרקו. זום 200% נבדק באמולציה בלבד. לא בוצעה ביקורת ידנית של מומחה נגישות | |
| 5 | התאמות קיימות | שפה וכיוון מוגדרים (עברית, מימין לשמאל), קישור "מעבר לתוכן הראשי", הגדרות תצוגה של מראה בהיר או כהה, גופן וגודל טקסט, כיבוד העדפת "הפחתת תנועה" של מערכת ההפעלה, ניווט מלא במקלדת במסכים שנבדקו | |
| 6 | מגבלות ידועות | סימוני הפרקים בקורא הספרים קטנים מ-24 פיקסלים. הפרויקט מעריך שהם נכללים בחריג של WCAG 2.5.8 כי תוכן העניינים מציע אותם יעדים בשורות גדולות, וזו הערכה פנימית (`audit/master-completion/TAB-SWEEP.md:145-153`). ב-Architecture Studio ברוחב 320 חלק מהצמתים מחוץ לשטח עד שגוררים את הקנבס (`audit/master-completion/TAB-SWEEP.md:205-206`) | לוח זמנים לתיקון: REQUIRES_OWNER_INPUT |
| 7 | פנייה בנושא נגישות | | רכז או רכזת, דוא"ל, טלפון, זמן תגובה: REQUIRES_OWNER_INPUT |
| 8 | תאריכים | תאריך הבדיקות: 28 בספטמבר 2026 | תאריך ההצהרה: REQUIRES_OWNER_INPUT |

הערה לסעיף 3: הבדיקות רצו על `6ba22207`. אם הדפים המשפטיים יפורסמו אחרי מיזוג ענף העיצוב, צריך להריץ את אותם שלושה סקריפטים על הגרסה החדשה ולעדכן את המספרים לפני הפרסום.

### D4. מיקום הקישורים

לפי A9, קישור בתחתית הרייל או ב-`.nx-mcredit` בלבד לא יגיע לכל מסך. שתי אפשרויות שמכסות הכל: שורת קישורים בחלונית העזרה של ה-Dock, שקיימת בכל נתיבי NEO ובכל המכשירים, או רכיב קרדיט משותף שיחליף את 10 שורות הקרדיט המשוכפלות. הבחירה היא החלטת עיצוב של שלב 5 בתוכנית (`docs/redesign-2026-09/PLAN.md`, "legal+error+empty"). הפוטר הישן (`components/Footer.tsx:21`) יצטרך שני קישורים נוספים.
