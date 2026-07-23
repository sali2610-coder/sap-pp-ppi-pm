# Runbook · PM Notification & Maintenance Order — תקלות זרימה (PM · ECC + S/4HANA)

<div dir="rtl">

**מתי:** Notification (IW21/IW28) או Maintenance Order (IW31/IW32) לא נוצר/משוחרר/מאושר/נסגר, או שגיאת status.
**מודולים:** PM · MM (חלפים) · CO (עלויות).
**קשור:** לזרימה העסקית המלאה מקצה-לקצה ראה `knowledge/books/sap-pm/poc/runbooks/notification-to-order.md`. הרנבוק הזה הוא **פתרון-תקלות** באותה זרימה.

## מדריך מהיר — אבחון
1. **IW23** (Notification) / **IW33** (Order) — הצג ובדוק את ה-status (OSNO/NOPR/REL/TECO); לחץ status → הסבר system/user status.
2. **IW28 / IW38** — רשימות עבודה: אתר לפי מצב, plant, planner group.
3. **IE03 / IL03** — אמת שהאובייקט הטכני (Equipment / Functional Location) קיים ומותקן נכון.
4. **CN/Status Profile** — אם status חוסם פעולה: בדוק user status profile (BS22/OIBS).

## עץ החלטה לפי סימפטום
- **Notification לא נוצר:** notification type / catalog profile חסרים → בדוק customizing (OIM*), ושיוך לאובייקט טכני.
- **Order לא משוחרר:** permit חסר, availability check, או costing → בדוק permits (IW32 → Permits), CO24 לחלפים, ו-cost center/settlement rule.
- **Settlement rule missing:** לא ניתן לסגור/לזקוף → הזן settlement rule (IW32 → Settlement Rule).
- **Confirmation נכשל (IW41/IW42):** over-confirmation או status → בדוק זמן/סטטוס.
- **TECO לא עובר:** רכש/confirmations פתוחים → סגור תלויות; בדוק business completion אחרי זקיפת עלויות.
- **status חוסם (user status):** ראה status profile — ייתכן חוסם במכוון (למשל WAPP ממתין לאישור).

## צ׳ק-ליסט
- [ ] status ה-Notification/Order נקרא ופוענח (system + user status)
- [ ] האובייקט הטכני קיים ומותקן נכון (IE03/IL03)
- [ ] permits / availability / settlement rule נבדקו לפני שחרור/סגירה
- [ ] כשלי confirmation פוענחו (זמן/סטטוס)
- [ ] תלויות רכש/confirmation נסגרו לפני TECO

## מוצא (No Dead End)
מגיע ל: **שורש** · **תיקון** · **Runbook זרימה** (notification-to-order) · **Lessons** (`lessons.md` — PM עשיר) · **הבהרה** (איזה order type? מה ה-status החוסם?).

**מקורות מקומיים:** `data/troubleshooting*.ts` (PM×37) · `knowledge/books/sap-pm/**` · `data/sapData.ts` (QMEL/AUFK/AFIH/EQUI/IFLOT). כיסוי PM חזק + Lessons + Runbook זרימה = המסלול המלא ביותר במערכת.

</div>
