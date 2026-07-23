# Runbook · IDoc תקוע/נכשל — אבחון לפי Status (Integration · ECC + S/4HANA)

<div dir="rtl">

**מתי:** IDoc אינו מגיע ליעד, נתקע, או נכשל — נכנס (inbound) או יוצא (outbound). כולל statuses 02/04/05/26/29/30/51/64/68.
**מודולים:** Cross · Integration · PP-PI · PM · MM.

## מדריך מהיר — אבחון
1. **WE02 / WE05** — אתר את ה-IDoc לפי מספר/תאריך/שותף; קרא את ה-**Status** ואת טקסט השגיאה בסטטוס האחרון.
2. **WE47** — פענח את משמעות ה-status code אם אינו מוכר.
3. **BD87** — נסה עיבוד מחדש של IDocs תקועים (בעיקר 51/64/66); בחר את ה-IDoc והרץ Process.
4. **SM58** (tRFC) / **SMQ1/SMQ2** (qRFC queues) — בדוק אם ה-IDoc תקוע בשכבת ה-RFC/queue ולא ביישום.

## עץ החלטה לפי Status
- **64 — Ready to be passed to application (inbound):** ה-IDoc תקין אך לא עובד עדיין. סיבה נפוצה: partner profile מוגדר ל-**"Trigger by background program"** ולא "Immediately". **פתרון:** הרץ **RBDAPP01** (או BD87), או שנה ל-Immediately ב-WE20. אם עדיין תקוע — בדוק נעילת אובייקט/serialization.
- **51 — Application document not posted (inbound error):** כשל בשכבת היישום. קרא את הודעת השגיאה המדויקת → מיפוי לשורש:
  - נתוני אב חסרים (material/customer/vendor לא קיים ביעד) → צור/סנכרן master data.
  - שגיאת המרה/יחידת מידה/שדה חובה → בדוק mapping ו-conversion (T-Code BD64/WE20 config).
  - הרשאה/customizing חסר → ראה runbook `authorization-missing`.
  - תקן ב-WE19 (test tool: שכפל, ערוך, שלח מחדש) ואז BD87.
- **02 — Error passing data to port (outbound):** בעיית RFC/port. → runbook `rfc-connection-failure`; בדוק WE21 (port) ו-SM59.
- **29/26 — Error in ALE/EDI interface / syntax:** בעיית syntax או partner profile. בדוק WE20 (partner), WE60 (documentation), ותקן את המבנה.
- **68 — No further processing:** בוטל ידנית — בדוק אם במכוון; אם לא, שלח מחדש דרך WE19.
- **05/04 — Error during translation/dispatch (outbound):** בעיית subsystem/port חיצוני.

## צ׳ק-ליסט
- [ ] זוהה מספר ה-IDoc וה-status האחרון (WE02/WE05)
- [ ] הודעת השגיאה המדויקת נקראה ותורגמה לשורש
- [ ] נבדק אם הכשל בשכבת RFC/queue (SM58/SMQ1/SMQ2) או ביישום
- [ ] partner profile נבדק ב-WE20 (עיתוי + process code)
- [ ] בוצע עיבוד מחדש (BD87/RBDAPP01) או תיקון+שליחה חוזרת (WE19)
- [ ] אם השורש נתוני-אב/customizing — טופל לפני עיבוד חוזר

## מוצא (No Dead End)
כל IDoc מגיע לאחד מ: **שורש מזוהה** (טבלה למעלה) · **תיקון מומלץ** (BD87/WE19/master data) · **SAP Note** (חפש ב-`sap-notes.ts` לפי application component + keyword; IDoc = 11 נושאים) · **שאלת הבהרה** (איזה message type? inbound/outbound? מה טקסט השגיאה המלא?).

**מקורות מקומיים:** `data/troubleshooting*.ts` (IDoc×19) · `data/integration.ts` (IDoc×34, ALE×22) · `data/sapData.ts` (IDoc types כולל Zetes/Daymax).

</div>
