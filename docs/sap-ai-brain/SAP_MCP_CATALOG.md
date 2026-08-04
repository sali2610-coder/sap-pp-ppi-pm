# קטלוג שרתי MCP במערכת ה‑SAP AI

> **מקור האמת:** נתוני חיבור מתוך snapshot מאומת ‏`/tmp/sap-brain-facts.md` (‏`claude mcp list`, בתאריך 2026‑07‑23), בתוספת קריאה ישירה (קריאה‑בלבד) של קבצי התוסף תחת `~/.claude/plugins/cache/`.
> **הבהרה חשובה על מונחים:** המסמך מפריד בבירור בין ארבעה מצבים שאסור לבלבל ביניהם —
> **מותקן** (הקוד קיים על הדיסק) · **פעיל** (מוגדר ב‑MCP ומופיע ברשימה) · **מחובר** (Connected — עונה לקריאות tools) · **דורש‑אימות** (Needs authentication) · **נכשל** (Failed to connect).
> ערך שלא אומת נכתב במפורש **"לא אומת"**. אין המצאה של רכיב, גרסה, SAP Note או מספר.

---

## 1. תמונת מצב כללית (מתוך `claude mcp list`)

בסך הכול נצפו **14 שרתי MCP** ב‑snapshot. חלוקה לפי סטטוס מדויק כפי שהופיע:

| סטטוס (מילה‑במילה מה‑snapshot) | מספר | שרתים |
|---|---|---|
| ✔ Connected (מחובר) | 8 | Google Drive, Gmail, Google Calendar, figma, sap-fiori-tools:fiori-tools, sapui5:ui5-tooling, magic, mobbin, browser-use |
| ! Needs authentication (דורש‑אימות) | 3 | Microsoft 365, Make, vercel |
| ✘ Failed to connect (נכשל) | 1 | **sc4sap:sap** — הגשר ל‑SAP האמיתי |
| ⏸ Pending approval (ממתין לאישור) | 1 | pptxgenjs |

> הערה: browser-use מופיע ברשימת המחוברים, כך שסך "Connected" בפועל הוא 9. הספירה למעלה משקפת בדיוק את השורות ב‑snapshot.

**נקודת המפתח:** שרת ה‑MCP היחיד שמדבר עם מערכת SAP אמיתית (‏ECC6 / S/4HANA On‑Premise דרך ADT) הוא **`plugin:sc4sap:sap`**, והוא כרגע **נכשל / מנותק (Failed to connect)**. כל שאר שרתי ה‑SAP ברשימה (Fiori Tools, UI5 Tooling) הם כלי פיתוח מקומיים ואינם מתחברים למערכת SAP חיה — ראו פירוט להלן.

---

## 2. קטלוג מלא — שרת אחר שרת

לכל שרת: שם · מקור · גרסה · פקודת הרצה · סטטוס (מילה‑במילה) · תפקיד/כלים · קריאה‑בלבד או כתיבה · אישורים/סודות · סיכונים · שימוש‑ברשת.

### 2.1 claude.ai Microsoft 365
- **מקור:** מובנה ב‑claude.ai (Remote HTTP).
- **גרסה:** לא אומת.
- **פקודה/כתובת:** `https://microsoft365.mcp.claude.com/mcp`
- **סטטוס:** `! Needs authentication` (דורש‑אימות).
- **כלים:** Outlook/Teams/OneDrive/SharePoint (לא אומת בפירוט — השרת לא מחובר).
- **קריאה/כתיבה:** מעורב (קריאה + כתיבה) — לא אומת בפועל כי לא מחובר.
- **אישורים:** OAuth של Microsoft 365 — טרם בוצע.
- **סיכונים:** גישה לתיבת דואר וקבצים ארגוניים לאחר אימות. עד לאימות — אינו פעיל.
- **שימוש‑ברשת:** כן (שרת מרוחק).

### 2.2 claude.ai Make
- **מקור:** מובנה ב‑claude.ai (Remote HTTP).
- **גרסה:** לא אומת.
- **פקודה/כתובת:** `https://mcp.make.com`
- **סטטוס:** `! Needs authentication` (דורש‑אימות).
- **כלים:** הרצת תרחישי אוטומציה של Make — לא אומת (לא מחובר).
- **קריאה/כתיבה:** כתיבה (מפעיל אוטומציות) — לא אומת בפועל.
- **אישורים:** OAuth/API token של Make — טרם בוצע.
- **סיכונים:** הפעלת אוטומציות חיצוניות. אינו פעיל עד לאימות.
- **שימוש‑ברשת:** כן.

### 2.3 claude.ai Google Drive
- **מקור:** מובנה ב‑claude.ai (Remote HTTP).
- **גרסה:** לא אומת.
- **פקודה/כתובת:** `https://drivemcp.googleapis.com/mcp/v1`
- **סטטוס:** `✔ Connected` (מחובר).
- **כלים:** חיפוש/קריאת/יצירת קבצים ב‑Google Drive (נגזר מכלי ה‑Drive הזמינים בסביבה).
- **קריאה/כתיבה:** קריאה + כתיבה (יצירת/העלאת קבצים).
- **אישורים:** OAuth של Google — בוצע.
- **סיכונים:** גישה למסמכים אישיים בענן. לא רלוונטי ל‑SAP ישירות.
- **שימוש‑ברשת:** כן.

### 2.4 claude.ai Gmail
- **מקור:** מובנה ב‑claude.ai (Remote HTTP).
- **גרסה:** לא אומת.
- **פקודה/כתובת:** `https://gmailmcp.googleapis.com/mcp/v1`
- **סטטוס:** `✔ Connected` (מחובר).
- **כלים:** חיפוש/קריאה/יצירת טיוטות/תיוג הודעות ותכתובות.
- **קריאה/כתיבה:** קריאה + כתיבה (טיוטות, תוויות).
- **אישורים:** OAuth של Google — בוצע.
- **סיכונים:** גישה לדואר אישי. לא רלוונטי ל‑SAP.
- **שימוש‑ברשת:** כן.

### 2.5 claude.ai Google Calendar
- **מקור:** מובנה ב‑claude.ai (Remote HTTP).
- **גרסה:** לא אומת.
- **פקודה/כתובת:** `https://calendarmcp.googleapis.com/mcp/v1`
- **סטטוס:** `✔ Connected` (מחובר).
- **כלים:** קריאה/יצירה/עדכון של אירועים ולוחות שנה.
- **קריאה/כתיבה:** קריאה + כתיבה.
- **אישורים:** OAuth של Google — בוצע.
- **סיכונים:** גישה ליומן אישי. לא רלוונטי ל‑SAP.
- **שימוש‑ברשת:** כן.

### 2.6 plugin:figma:figma
- **מקור:** תוסף `figma@claude-plugins-official` (v2.2.81).
- **גרסה (שרת):** נקודת קצה HTTP רשמית של Figma — גרסת השרת עצמה לא אומת.
- **פקודה/כתובת:** `https://mcp.figma.com/mcp` (HTTP).
- **סטטוס:** `✔ Connected` (מחובר).
- **כלים:** design‑to‑code, code‑to‑design, Code Connect, FigJam, ייצוא נכסים.
- **קריאה/כתיבה:** קריאה + כתיבה (יוצר/מעדכן קבצי Figma).
- **אישורים:** OAuth של Figma.
- **סיכונים:** נמוך; כלי עיצוב. לא רלוונטי ל‑SAP ליבה.
- **שימוש‑ברשת:** כן.

### 2.7 plugin:vercel:vercel
- **מקור:** תוסף `vercel@claude-plugins-official` (v0.44.0).
- **גרסה (שרת):** לא אומת.
- **פקודה/כתובת:** `https://mcp.vercel.com` (HTTP).
- **סטטוס:** `! Needs authentication` (דורש‑אימות).
- **כלים:** ניהול פרויקטים/פריסות/משתני‑סביבה ב‑Vercel — לא אומת (לא מחובר).
- **קריאה/כתיבה:** קריאה + כתיבה (deploy, env) — לא אומת בפועל.
- **אישורים:** OAuth/Token של Vercel — טרם בוצע.
- **סיכונים:** פריסה לפרודקשן web. אינו פעיל עד לאימות.
- **שימוש‑ברשת:** כן.

### 2.8 plugin:sc4sap:sap ⭐ (הגשר ל‑SAP האמיתי)
- **מקור:** תוסף `sc4sap@sc4sap` (v0.6.14); ‏marketplace `sc4sap` = `git https://github.com/babamba2/superclaude-for-sap.git`.
- **גרסה:** תוסף v0.6.14.
- **פקודה:** `node /Users/salihalif/.claude/plugins/cache/sc4sap/sc4sap/0.6.14/bridge/mcp-server.cjs`
- **סטטוס:** **`✘ Failed to connect` (נכשל / מנותק).** מאומת גם ב‑healthcheck: `❌ DISCONNECTED (fallback: pasted evidence)`.
- **קריאה/כתיבה:** מיועד לקריאה **וגם** כתיבה מול SAP (ADT), אך כפוף לשומרי‑הרשאה (ראו §3 ומסמך ה‑Hooks). כרגע לא רלוונטי — לא מחובר.
- **אישורים:** מאוחסנים ב‑OS keychain (macOS Keychain דרך `@napi-rs/keyring`) — **הערכים לעולם אינם מוצגים** ואינם נשמרים ב‑`.sc4sap/` שב‑git.
- **סיכונים:** הרם ביותר מבין כל השרתים — זהו הצינור היחיד למערכת SAP חיה. מוגן ברב‑שכבתי (ראו §3).
- **שימוש‑ברשת:** כן — RFC/HTTP(S) אל שרת ה‑ADT של ה‑SAP. כרגע אינו פעיל.

פירוט מלא בסעיף 3 (זהו לב המסמך).

### 2.9 plugin:sap-fiori-tools:fiori-tools
- **מקור:** תוסף `sap-fiori-tools@sap-skills` (v2.2.0).
- **גרסה (חבילת השרת):** `@sap-ux/fiori-mcp-server@1.4.0`.
- **פקודה:** `npx --yes @sap-ux/fiori-mcp-server@1.4.0 fiori-mcp`
- **סטטוס:** `✔ Connected` (מחובר).
- **כלים:** יצירה/עריכה של אפליקציות Fiori (OData / CAP), רשימת אפליקציות ומערכות, הורדת metadata של OData, חיפוש תיעוד. **שים לב:** אלה כלי **פיתוח מקומיים** — הם אינם מתחברים למערכת SAP חיה של הלקוח; "list_sap_systems" מתייחס להגדרות פיתוח מקומיות/BTP‑destinations ולא ל‑ECC6/S4 של CBC.
- **קריאה/כתיבה:** קריאה + כתיבה של קבצי פרויקט מקומיים בלבד.
- **אישורים:** ללא סוד ל‑SAP הליבה; פועל על קבצי פרויקט.
- **סיכונים:** נמוך; כותב קבצי קוד מקומיים.
- **שימוש‑ברשת:** כן — `npx` מוריד חבילה מ‑npm; אין חיבור ל‑SAP חי.

### 2.10 plugin:sapui5:ui5-tooling
- **מקור:** תוסף `sapui5@sap-skills` (v2.2.0).
- **גרסה (חבילת השרת):** `@ui5/mcp-server@0.2.11`.
- **פקודה:** `npx -y @ui5/mcp-server@0.2.11`
- **סטטוס:** `✔ Connected` (מחובר).
- **כלים:** יצירת אפליקציית UI5, מדריכי best‑practice, API reference, אימות manifest, הרצת UI5 linter, מידע גרסאות. שוב — כלי **פיתוח מקומי**, ללא חיבור ל‑SAP חי.
- **קריאה/כתיבה:** קריאה + כתיבה של קבצי פרויקט מקומיים.
- **אישורים:** ללא.
- **סיכונים:** נמוך.
- **שימוש‑ברשת:** כן — `npx` מ‑npm; אין חיבור ל‑SAP חי.

### 2.11 magic
- **מקור:** `@21st-dev/magic` (חוץ‑תוסף, מוגדר ברמת המשתמש/סביבה).
- **גרסה:** `latest` (לא ננעל — לא אומת גרסה מדויקת).
- **פקודה:** `npx -y @21st-dev/magic@latest`
- **סטטוס:** `✔ Connected` (מחובר).
- **כלים:** בניית/חידוד רכיבי UI, חיפוש לוגו.
- **קריאה/כתיבה:** קריאה + כתיבה (יוצר קוד רכיבים).
- **אישורים:** לא אומת (ייתכן API key ל‑21st.dev).
- **סיכונים:** נמוך; לא רלוונטי ל‑SAP.
- **שימוש‑ברשת:** כן.

### 2.12 mobbin
- **מקור:** חוץ‑תוסף (Remote HTTP).
- **גרסה:** לא אומת.
- **פקודה/כתובת:** `https://api.mobbin.com/mcp` (HTTP).
- **סטטוס:** `✔ Connected` (מחובר).
- **כלים:** חיפוש מסכים/זרימות/מקטעי UX לעיצוב.
- **קריאה/כתיבה:** קריאה בלבד (חיפוש רפרנסים).
- **אישורים:** לא אומת.
- **סיכונים:** נמוך; לא רלוונטי ל‑SAP.
- **שימוש‑ברשת:** כן.

### 2.13 browser-use
- **מקור:** חוץ‑תוסף (CLI מקומי דרך `uvx`).
- **גרסה:** לא אומת (מותקן מ‑`browser-use[cli]`).
- **פקודה:** `uvx --from browser-use[cli] browser-use --mcp`
- **סטטוס:** `✔ Connected` (מחובר).
- **כלים:** אוטומציית דפדפן — ניווט, לחיצה, מילוי טפסים, צילום מסך, קריאת רשת/קונסול.
- **קריאה/כתיבה:** קריאה + כתיבה (מבצע פעולות בדפדפן).
- **אישורים:** ללא (מפעיל דפדפן מקומי).
- **סיכונים:** בינוני — יכול לבצע פעולות בכל אתר שנפתח, כולל SAP Fiori/GUI ב‑web אם ינוּוט לשם ידנית. לא מחובר ל‑ADT.
- **שימוש‑ברשת:** כן.

### 2.14 pptxgenjs
- **מקור:** שרת מקומי בתוך הפרויקט: `.agents/mcp/pptxgenjs-mcp-server/dist/index.js`.
- **גרסה:** לא אומת.
- **פקודה:** `node /Users/salihalif/Desktop/My-Projects/sap/.agents/mcp/pptxgenjs-mcp-server/dist/index.js`
- **סטטוס:** `⏸ Pending approval` (ממתין לאישור — `run 'claude' to approve`).
- **כלים:** יצירת מצגות PowerPoint (שקופיות, טבלאות, גרפים, תמונות).
- **קריאה/כתיבה:** כתיבה (יוצר קובצי `.pptx` מקומיים).
- **אישורים:** ללא.
- **סיכונים:** נמוך; כותב קבצים מקומיים בלבד. אינו פעיל עד לאישור.
- **שימוש‑ברשת:** לא (שרת `node` מקומי).

---

## 3. תת‑פרק עומק: `sc4sap:sap` — הגשר ל‑SAP האמיתי

### 3.1 מה זה, ולמה חשוב
`sc4sap:sap` הוא שרת ה‑MCP **היחיד** במערכת שנועד לדבר עם מערכת SAP חיה (‏ECC6 / S/4HANA On‑Premise) דרך פרוטוקול **ADT** (ABAP Development Tools). הקובץ `bridge/mcp-server.cjs` הוא **מפעיל דק (thin launcher)** בלבד — הוא אינו מכיל את לוגיקת ה‑ADT עצמה, אלא מאציל אותה לשרת ספק שמותקן בנפרד: `vendor/abap-mcp-adt` (מבוסס פרויקט `abap-mcp-adt-powerup`).

### 3.2 מדוע הוא נכשל כרגע (Failed / DISCONNECTED)
מאומת בשתי דרכים:
1. ‏`claude mcp list` → `✘ Failed to connect`.
2. ‏healthcheck → `❌ DISCONNECTED (fallback: pasted evidence)`.

בבדיקת קוד המקור (קריאה‑בלבד) עולה שהמפעיל מבצע רצף preflight, ובמצב הנוכחי **תיקיית `vendor/` אינה קיימת כלל** תחת התוסף ב‑cache. כלומר ה‑launcher של הספק (`vendor/abap-mcp-adt/dist/server/launcher.js`) חסר. במצב זה ה‑bridge מדפיס הנחיות תיקון (`node scripts/build-mcp-server.mjs` או `/sc4sap:setup mcp` או `SC4SAP_MCP_AUTOBUILD=1`) ויוצא בשגיאה (‏exit 1) — וזו הסיבה הישירה ל‑Failed. בנוסף, גם אם ה‑launcher היה קיים, ה‑bridge דורש קובץ סביבה (`.sc4sap/sap.env` או פרופיל פעיל) עם פרטי חיבור ל‑SAP; ללא חיבור מוגדר הוא נכשל בכוונה כדי לא להציג "מחובר" מזויף. **חשוב:** אסור לסמן שרת זה כמחובר — הוא מנותק.

### 3.3 מה עובד גם בלי החיבור (מצב fallback — "pasted evidence")
כאשר הגשר מנותק, המערכת ממשיכה לתפקד במלואה במצב **ידע + ניתוח על ראיות מודבקות**:
- כל הידע והסקילים של SAP (Sherlock / Oracle / Memory / HQ, חבילות המומחים, ‏sap-ecc-troubleshooter וכו') פועלים על סמך פלטים ש**המשתמש מדביק** (ST22, WE02, SM58, SU53, SMQ2, טבלאות וכו').
- ניתוח שורש‑תקלה, המלצות, טרנזקטציות, טבלאות ו‑FM — הכול זמין ללא חיבור חי.
- כלי הפיתוח המקומיים (Fiori Tools, UI5 Tooling) פועלים ללא תלות בגשר.
במילים אחרות: **היעדר החיבור אינו חוסם את רוב העבודה** — הוא רק מונע שליפה חיה ישירה מתוך ה‑SAP.

### 3.4 מה נפתח לאחר חיבור מוצלח
לאחר `/sc4sap:setup` והרמת ה‑vendor, השרת חושף (לפי תיעוד התוסף) שרת ADT עשיר (התיעוד מציין 150+ כלים). משפחות הכלים המאומתות מקוד השומרים ומ‑CLAUDE.md:
- **קריאת אובייקטים / DDIC:** `GetClass`, `GetProgram`, `GetTable`, `GetStructure`, `GetView`, `GetDataElement`, `GetDomain`, `GetFunction` וכו' (קריאת סכימה תמיד מותרת).
- **ניתוח:** `GetAbapAST`, `GetAbapSemanticAnalysis`, `GetWhereUsed`.
- **Runtime:** `RunUnitTest`, `GetUnitTestResult`, `RuntimeAnalyzeDump`, `RuntimeRunProgramWithProfiling`, `RuntimeRunClassWithProfiling`.
- **מערכת (מגודר):** `GetTableContents`, `GetSqlQuery` — שליפת שורות נתונים גדורה מול blocklist.
- **CRUD (כתיבה):** `CreateClass` / `UpdateClass` / `DeleteClass` (וכל סוגי האובייקטים).
- **Transport:** `CreateTransport`, `GetTransport`, `ListTransports`.

### 3.5 מדרג DEV / QA / PRD — שומרי הבטיחות
פרופילים מרובים לכל חברה (למשל `KR-DEV`, `KR-QA`, `KR-PRD`), עם מיתוג חם דרך `/sc4sap:sap-option`. פרופילי **QA ו‑PRD מוגנים אוטומטית** בהגנה דו‑שכבתית:
- **שכבה 1 — hook `PreToolUse` (`tier-readonly-guard`)** ברמת ה‑client.
- **שכבה 2 — שומר בתוך שרת ה‑MCP עצמו** (‏`readonlyGuard`), כך ש**עקיפת ה‑hook אינה עוקפת את האכיפה**.

מטריצת החסימה (Strict):
- **PRD:** חסום `Create_`, `Update_`, `Delete_`, `RunUnitTest`, `RuntimeRunProgramWithProfiling`, `RuntimeRunClassWithProfiling`.
- **QA:** חסום `Create_`, `Update_`, `Delete_`, ‏`RuntimeRun*WithProfiling` (‏`RunUnitTest` מותר).
- **DEV:** לא נחסם דבר.

### 3.6 עמדת קריאה‑בלבד וגידור נתונים
- שליפת שורות (`GetTableContents` / `GetSqlQuery`) עוברת דרך hook `block-forbidden-tables` מול `exceptions/table_exception.md`, לפי פרופיל blocklist (`minimal` / `standard` / `strict` = ברירת מחדל / `custom`).
- טבלאות PII/סודות → **deny**; "Protected Business Data" → **ask** (דורש אישור מפורש). ברירת המחדל: חסום עד אישור.
- קריאת סכימה/DDIC תמיד מותרת. חלופות בטוחות: תצוגות CDS משוחררות, נתוני בדיקה אנונימיים, ‏COUNT/SUM.

### 3.7 אישורים נדרשים (OS keychain — לעולם לא מוצגים)
- הסיסמאות נשמרות ב‑**OS keychain** דרך `@napi-rs/keyring` (‏macOS Keychain / Windows Credential Manager / libsecret) — כך ש‑`.sc4sap/` **אינו** מדליף סודות ל‑git.
- לחיבור דרוש קובץ `sap.env` לפרופיל (מארח, מספר מערכת/instance, לקוח (client), משתמש, ‏`SAP_TIER`) — **ערכי סוד לעולם אינם מוצגים** במסמך זה או בפלט.
- מצב נוכחי: לא קיים חיבור מוגדר פעיל שאומת → זו סיבה נוספת ל‑Failed.

### 3.8 אובייקטי‑Z ש‑`/sc4sap:setup` **עשוי** ליצור בצד השרת
בעת הקמה מלאה מול מערכת SAP, ה‑setup **עשוי** ליצור אובייקטי ABAP בצד השרת לתמיכה בפעולות ADT (מסך, GUI Status, Text Elements ו‑ALV). מאומת מ‑`abap/`:
- **קבוצת פונקציות `ZMCP_ADT_UTILS`** — DEV‑only, ב‑`$TMP`; נדרשת ל‑Screen / GUI Status / Text Element.
- **ממשק `ZIF_S4SAP_CM`** — ממשק בסיס ל‑Connection Manager / ALV‑OOP.
- **מחלקות `ZCL_S4SAP_CM_*`** — למשל `ZCL_S4SAP_CM_ALV`, `ZCL_S4SAP_CM_OALV`, `ZCL_S4SAP_CM_ALV_EVENT`, `ZCL_S4SAP_CM_TREE_EVENT`, `ZCL_S4SAP_CM_OTREE` (מטפלי ALV‑OOP).

> אלה אובייקטים ש**עשויים** להיווצר רק בהקמה מול DEV; במצב הנוכחי (מנותק) שום אובייקט לא נוצר.

---

## 4. סיכום מדרג רלוונטיות ל‑SAP

| שרת | רלוונטיות ל‑SAP חי | סטטוס | הערה |
|---|---|---|---|
| `sc4sap:sap` | **הצינור היחיד ל‑SAP אמיתי** | **נכשל/מנותק** | דורש `vendor/` + פרופיל חיבור |
| `sap-fiori-tools:fiori-tools` | פיתוח Fiori מקומי בלבד | מחובר | לא מתחבר ל‑ECC/S4 חי |
| `sapui5:ui5-tooling` | פיתוח UI5 מקומי בלבד | מחובר | לא מתחבר ל‑ECC/S4 חי |
| שאר השרתים | לא רלוונטי ל‑SAP ליבה | משתנה | פרודוקטיביות/עיצוב/דואר |

**מסקנה תפעולית:** נכון ל‑snapshot, אין חיבור חי ל‑SAP. כל עבודת ה‑SAP מתבצעת במצב "ראיות מודבקות" (fallback), וזה תקין ומכוסה. חיבור הגשר הוא צעד רשות (‏`/sc4sap:setup`), ולא נדרש לרוב המשימות.

---

*מקורות: `/tmp/sap-brain-facts.md` (snapshot מאומת) · קריאה‑בלבד של `~/.claude/plugins/cache/sc4sap/sc4sap/0.6.14/{bridge/mcp-server.cjs,.mcp.json,CLAUDE.md,README.md,abap/,scripts/hooks/}`. ערכים שסומנו "לא אומת" לא נמצא להם מקור ודאי. אין הצגת סודות/סיסמאות/טוקנים.*
