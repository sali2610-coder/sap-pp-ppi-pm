# Runbook · מ-Notification ל-Maintenance Order: זרימת תחזוקה תיקונית מקצה לקצה ב-S/4HANA PM

<div dir="rtl">

## מדריך מהיר
1. שלב 1 — תיעוד תקלה: צור Notification (הודעת תחזוקה) המתארת את התקלה, ושייך אותה ל-Functional Location או ל-Equipment הרלוונטי (מאתרים/בודקים ב-IL03/IE03).
2. שלב 2 — אימות האובייקט הטכני: ודא שהציוד מותקן על המיקום הנכון; במידת הצורך בצע התקנה/פירוק דרך IE02 (או IL02) לפי הגדרת Define Installation.
3. שלב 3 — יצירת Order: צור Maintenance Order מתוך ה-Notification, בחר order type מתאים ושייך את ה-Main Work Center (סדנת התחזוקה) האחראי.
4. שלב 4 — תכנון פעולות: הזן operations עם control key מתאים; המערכת מחשבת משך ודרישות עבודה דרך הנוסחאות SAP004 (DAUNO) ו-SAP008 (ARBEI).
5. שלב 5 — תכנון חומרים: הוסף components; לחומרים שאינם במלאי צור דרישת רכש דרך ME51N (או אפליקציית Fiori 'Create Purchase Requisition').
6. שלב 6 — שחרור: שחרר את ה-Order (אפליקציית Fiori 'Release Maintenance Orders'); בדוק זמינות חומרים וקיבולת ב-CM21 לפי הצורך.
7. שלב 7 — אספקה ורכש חיצוני: אשר הזמנת רכש ('Approve Purchase Orders'), קלוט סחורה ב-MIGO, ובצע משיכת חומרים מהמלאי (בדיקת מלאי ב-MMBE).
8. שלב 8 — ביצוע ואישור: בצע את העבודה בשטח (למשל דרך SAP Asset Manager), דווח שעות וצריכת חומרים ב-confirmation.
9. שלב 9 — חשבונית ספק: לעבודות חיצוניות, רשום חשבונית ב-MIRO (או Fiori 'Post Incoming Invoices' / 'Create Supplier Invoice').
10. שלב 10 — סגירה: בצע סגירה טכנית (TECO) ואז סגירה עסקית (business completion) לאחר זקיפת כל העלויות; ההיסטוריה נשמרת על האובייקט הטכני שצוין.

## צ׳ק-ליסט
- [ ] ה-Notification משויך לאובייקט טכני נכון (Functional Location או Equipment)
- [ ] הציוד מותקן על המיקום הנכון לפני פתיחת ה-Order
- [ ] נבחר order type ו-Main Work Center מתאימים
- [ ] ל-operations הוזן control key תקין (costing/scheduling/confirmation/external)
- [ ] דרישות הרכש לחומרים חסרים נוצרו ושוחררו (ME51N)
- [ ] ה-Order שוחרר ונבדקה זמינות קיבולת/חומרים
- [ ] קבלת הסחורה נרשמה ב-MIGO ומשיכות החומר תועדו
- [ ] שעות העבודה וצריכת החומרים אושרו ב-confirmation
- [ ] חשבונית הספק נרשמה ב-MIRO לעבודות חיצוניות
- [ ] בוצעו סגירה טכנית (TECO) וסגירה עסקית, וכל העלויות נזקפו

</div>

---
מקור (נגזר, לא משוכפל): books/sap-pm-business-guide.pdf pp.1-250 · PoC
