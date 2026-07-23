# Runbook · כשל חיבור RFC (SM59 / tRFC / qRFC) — Integration · ECC + S/4HANA

<div dir="rtl">

**מתי:** קריאת RFC נכשלת, timeout, "connection refused", tRFC/qRFC תקוע, או IDoc בסטטוס 02.
**מודולים:** Cross · Integration · Basis-touchpoint.

## מדריך מהיר — אבחון
1. **SM59** — אתר את ה-RFC destination; לחץ **Connection Test** ו-**Authorization Test**. קרא את קוד/טקסט השגיאה.
2. **SM58** — tRFC: transactions תקועות; קרא את הסיבה (LUW), נסה Execute LUW ידני.
3. **SMQ1 (outbound) / SMQ2 (inbound)** — qRFC queues תקועות; בדוק status (SYSFAIL/CPICERR/RETRY) ושחרר.
4. **ST22 / SM21** — dump או שגיאת מערכת בצד היעד בזמן הקריאה.

## עץ החלטה לפי סימפטום
- **Connection Test נכשל (network):** host/gateway/port שגוי או חסום → תקן ב-SM59 (Technical Settings), אמת עם צוות רשת/Basis.
- **Authorization Test נכשל:** משתמש ה-RFC נעול/חסר הרשאה/סיסמה פגה → בדוק SU01 ליוזר ה-service; הרשאת S_RFC. ראה runbook `authorization-missing`.
- **SYSFAIL / CPIC-ERR ב-queue:** תקלת יישום או resource בצד היעד → קרא ST22 ביעד; לרוב dump ספציפי.
- **Timeout:** עומס/נעילה בצד היעד → בדוק SM50/SM66 ביעד; שקול gw/reg_info.
- **"user is locked" / "password logon no longer possible":** יוזר service מסוג Communication/System הפך ל-Dialog → החזר סוג יוזר נכון ב-SU01.

## צ׳ק-ליסט
- [ ] Connection + Authorization Test הורצו ב-SM59 והתוצאה נקראה
- [ ] נבדק אם הכשל ברשת, בהרשאה, או ביישום היעד
- [ ] tRFC/qRFC (SM58/SMQ1/SMQ2) נבדקו ל-LUW תקועים
- [ ] יוזר ה-service נבדק (סוג, נעילה, הרשאת S_RFC)
- [ ] ST22/SM21 ביעד נבדקו ל-dump מקביל

## מוצא (No Dead End)
כל תקלת RFC מגיעה ל: **שורש** (רשת/הרשאה/יישום/queue) · **תיקון** (SM59 config / SU01 / שחרור queue) · **SAP Note** (`sap-notes.ts` RFC×6 keywords) · **הבהרה** (איזה destination? קריאה sync/async? מה קוד השגיאה ב-SM59?).

**מקורות מקומיים:** `data/integration.ts` (RFC×68) · `data/troubleshooting*.ts` (RFC×19) · `data/authorizations.ts` (S_RFC).

</div>
