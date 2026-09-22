# Capability Inventory · 2026-09-21

| כלי | סוג | תחום | זמין / חסום | רלוונטיות | שלב הפעלה | תוצאה בפועל |
|---|---|---|---|---|---|---|
| `scripts/sap-help-search.mjs` | script | SAP research (help.sap.com search JSON) | זמין (נבדק 2026-09-21, 21 תוצאות) | ראיות Tier-1 לכל תיקון SAP | Round 2 (8 התיקונים), Round 4 | בשימוש בכל batch של ה-workflow |
| `scripts/workflows/enrich-family.js` | Workflow (researcher → auditor → writer) | הרחבת מאגר הידע | זמין | Functions/Transactions/Fiori/Objects/Best Practices | Round 4 | 308 רשומות ב-2026-09-22; batches של 4 |
| `scripts/report-coverage.mjs`, `check:evidence`, `npm test` (207 ב-2026-09-22) | scripts | Gate C/E | זמין | כל commit | כל סבב | ירוק ב-HEAD |
| `scripts/qa/evidence-sweep.mjs` (playwright-core 1.62.1 + Chrome) | browser QA | 18 routes × desktop light/dark × phone | זמין | Gate D/E/F | כל סבב | 54/54 ב-HEAD |
| `scripts/qa/ux-measure.mjs` (קודם `tmp-measure`) | browser measurement | overflow / opacity / height / zoom / console ב-30 מסלולים; VW/VH/THEME/MOTION/UA למטריצת המסכים | זמין | Before/After לכל ממצא, Gate D/F | Round 0 → כל סבב | `before-measurements.json`, `after-measurements.round{1,2,3,3a,3b,5}.json`, `matrix/*.json` (390 phone · 1440 · 1920 · dark · reduced-motion) |
| `scripts/qa/r3-check.mjs`, `r3b-check.mjs`, `r3c-check.mjs`, `r3d-check.mjs`, `shelf-check.mjs` (חדשים) | browser QA | בדיקות אינטראקטיביות לממצאי הסבב (CTA, מסננים, details, מצב מיקוד, סדר סעיפים) | זמין | Gate D/E | Round 3 | כולם exit 0 ב-HEAD של סבב 3 |
| `scripts/qa/section-profile.mjs`, `type-scale.mjs`, `a11y-sample.mjs`, `threed-local.mjs`, `ux-shots.mjs` (חדשים) | browser measurement | פרופיל גובה לפי מקטע; סולם טיפוגרפי נמדד; ניגודיות/גודל מטרה/מיקוד (מדגם, ללא axe); בדיקת עמוד התלת-ממד המקומי; צילומי after | זמין | S4-1, S10-1/3/4, S7-3D-1 | Round 3/5 | `a11y-sample.{light,dark}.json`; אין התקנת axe (ללא אישור להתקנות) |
| `scripts/verify-reader.mjs` (`verify:reader`) | browser QA | קורא הספרים הישן (/library/): desktop/tablet/mobile | זמין | Gate B | אחרי כל שינוי בספרייה/קורא | הופעל בסבב 3: 69/96 (היסטורי; הסקריפט עודכן בסבב 6 ועומד על 108/108); 27 הכישלונות הם סלקטורים שהתיישנו (`nav[aria-label="פרקי הספר"]` — ה-DOM המהודר מציג 'בעמוד זה'; הסקריפט מ-2026-08-11 08:29 קודם לשינויי הקורא באותו יום 13:16/18:35). בדיקה ישירה: 120,411 תווים מצוירים, 0 שגיאות קונסול, 0 גלישה. הקורא הישן לא נגע בסבב זה (משטח קפוא) |
| `scripts/crawl-dead-links.mjs`, `check-route-manifest`, `check-sitemap` | scripts | Gate E | זמין | כל build | כל סבב | 0 dead / in sync ב-HEAD |
| `pandoc` | extraction | קריאת ה-DOCX בעותק זמני | זמין | Round 0 | Round 0 | `scratchpad/audit-docx/audit.md` (597 שורות, 6 טבלאות, 4 תמונות) |
| Playwright CLI skill (`playwright-cli`) | skill | browser automation | זמין (skill מותקן) | מקביל ל-playwright-core הקיים | לא נדרש; playwright-core מכסה | — |
| `browser-use` MCP | MCP | browser | זמין (לא נבדק) | חלופה ל-Playwright | לא נדרש | — |
| `sc4sap` MCP (live ABAP) | MCP | SE37/SE11 live checks | **חסום** — `MCP error -32000: Connection closed` (2026-09-21) | היה מכריע ל-`verification_required` | — | fallback: help.sap.com + PDF; רשומות נשארות `verification_required` |
| Vercel MCP (`list_projects`, `list_deployments`) | MCP | Preview status | **חסום לפרויקט זה** — הטוקן רואה רק `cbc-interactive-case-study` | אימות Preview | — | fallback: Export מקומי byte-identical; Preview URL מתועד, Deployment עצמו לא נבדק |
| Vercel Authentication על ה-Preview | platform | Preview content | **חוסם קריאת תוכן** (200 עם מעטפת SSO) | Gate F | — | Deployment לא נבדק; מסומן במפורש |
| `neo-sap-content-quality-reviewer`, `neo-accessibility-reviewer`, `neo-enterprise-ux-auditor`, `neo-sap-visual-designer`, `neo-search-experience-reviewer`, `neo-architecture-studio-reviewer`, `neo-documentation-guardian` | project skills (`.claude/skills`) | ביקורת תוכן/נגישות/UX | זמינים | ביקורת אחרי סבבים 1–3 | Round 3/5 (review) | טרם הופעלו בסבב זה |
| `enterprise-ux-reviewer`, `enterprise-adaptive-ui-reviewer`, `enterprise-performance-reviewer` | project skills | UX/adaptive/perf | זמינים | Round 3/5 | — | טרם הופעלו |
| `web-design-guidelines`, `design-taste-frontend`, `ui-ux-pro-max`, `high-end-visual-design`, `motion-doctrine` | global skills | design guidance | זמינים | Round 3/5 (ליטוש) בלי לשכתב מידע מקצועי | — | טרם הופעלו |
| `image-to-code` | global skill | mockup → code | זמין | לא רלוונטי (אין mockups חדשים) | — | לא יופעל |
| Explore / Plan / general-purpose agents | agents | חקירה מקבילה | זמינים | עד 3–4 במקביל | לפי צורך | — |
| `sap-ecc-troubleshooter`, `sap-abap-ecc-s4-expert`, `sap-function-finder`, `hq/oracle/sherlock` | global skills | ידע SAP | זמינים | ייעוץ; לא מקור ראיה (Tier-3) | — | לא כמקור ל-verified |
| DESIGN.md / Awesome Design | guidance file | — | **לא קיים בריפו** | — | — | לא נמצא (`DESIGN.md`, `docs/DESIGN.md`) |
| `obsidian-second-brain` MCP, `magic` MCP, higgsfield, Canva, Make, M365, figma | MCP | — | חסומים / דורשים auth | לא רלוונטיים למשימה | — | — |

כללים שהוחלו: אין התקנת Plugin/Skill חדש; אין טענה על כלי שנכשל; כלי עיצוב לא משנים מידע מקצועי; כלי תוכן לא משנים עיצוב מחוץ לסקופ.

## מה הופעל בפועל בהמשך הביקורת (2026-09-22)
| כלי | הופעל | תוצאה |
|---|---|---|
| `neo-sap-content-quality-reviewer` (skill, סקירה בלבד) | כן, על רשומות IP30 / IP30H ואצוות 7-8 של הפונקציות | ‏VERDICT: FAIL, 0 חוסמים, 3 עיקריים, 7 משניים. שלושת העיקריים תוקנו באותו יום (קומיט `91b65c35`), המשניים בקובץ הפונקציות תוקנו אחרי סיום אצווה 9 (קומיט `aaf2a255`) |
| `scripts/workflows/enrich-family.js` | אצוות 7, 8, 9 הושלמו; אצווה 10 נכשלה | אצווה 9: 4 רשומות (2.35M טוקנים, 69 דקות). אצווה 10 (NOTIF_TASK_READ, NOTIF_ACTIVITY_READ, BAPI_MEASUREMENTPOINT_GETLIST, BAPI_OBJCL_CREATE) ארבעת סוכני המחקר שלה נפלו בהפסקת קרדיט שימוש; לא נכתבה אף רשומה, התור נשמר לריצה חוזרת |
| סוכני כתיבה (general-purpose) לקטלוג התהליכים | 5 סוכנים; ארבעה נפלו בהפסקת הקרדיט והופעלו מחדש | חמש המשפחות (PM, ‏PM המשך, ‏PP, ‏PP-PI, חוצה מודולים) מוזגו ונבדקו בוואלידטור: 17 רשומות תהליך ב-report:coverage, 207/207 בדיקות |
| `scripts/qa/*` | ux-measure (‏1363 / 390 / 1440 / 1920 / dark / reduced-motion), a11y-sample (בהיר + כהה), status-consistency, module-colour-check, ai-states-check, books-hash-check | ראו סעיף הבדיקות בדוח המסירה |
| `WebFetch` על api.sap.com | כן, פעמיים (‏API_PRODUCTION_ORDER_2) | הדפים חוזרים כמעטפת JavaScript ריקה; נרשם כחסם חיצוני ב-`verification-required.md` |
| `sc4sap` MCP | ניסיון נוסף ב-2026-09-22 | עדיין `MCP error -32000: Connection closed`; אף בדיקה חיה לא בוצעה ואף טענה חיה לא נכתבה |
| `neo-accessibility-reviewer` | כן (סקירה בלבד, 2026-09-22) | ‏VERDICT: FAIL, 3 חוסמים, 3 עיקריים. שלושת החוסמים תוקנו באותו יום (קומיט a3f74666): הסרת ה-meta refresh בן 8 השניות (WCAG F40 מול 2.2.1), טוקן brand-foreground במקום לבן על אדום בכהה, וכותרת המרכז שמפסיקה לצבוע את ה-eyebrow בגוון המשפחה. גם ההערות העיקריות טופלו: משפט הקרדינליות נאמר פעם אחת לפאנל, ורשימת המסלולים של מדגם הנגישות הורחבה לדפי התאימות ולרשומות התהליך |
| `neo-documentation-guardian` | כן (סקירה בלבד, 2026-09-22) | ‏VERDICT: BLOCK, 4 חוסמים, 11 עיקריים. תוקנו: שורת PPCC1 שטענה שאין רשומה (יש), היסט עמודות שהשמיט תשעה שמות משפחה ב-PROGRESS, שורה 7 שסתרה את עצמה, שלוש שורות בנות 15 תאים ב-COVERAGE-MATRIX שהסתירו את עמודת המגבלה, וספירות שהתיישנו |
| `neo-enterprise-ux-auditor` | כן, כשער אחרון (סקירה בלבד, 2026-09-22) | ‏VERDICT: BLOCK, חוסם אחד ו-4 עיקריים: גלישה ב-12 מתוך 17 רשומות שיטות העבודה ב-390, IP30H חסר בפלטת החיפוש, אינדקס חיפוש הטרנזקציות מפגר ברשומה אחת, ניגודיות תוויות ההשפעה בבית, וסורק הניגודיות שדילג על 22% מהצמתים. כולם תוקנו (קומיטים 968f88cf, bfcbf503) |
| `neo-architecture-studio-reviewer`, `neo-search-experience-reviewer`, `neo-sap-visual-designer` | לא הופעלו בהמשך הזה | ממצאי החיפוש (IP30H בפלטה) והסטודיו נבדקו דרך שער ה-UX; הפעלה ייעודית נשארת פתוחה |
