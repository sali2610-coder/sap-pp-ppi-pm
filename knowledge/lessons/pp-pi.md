# לקחים — PP / PP-PI

<div dir="rtl">

לקחים מבוססי ניסיון SAP סטנדרטי (curated). כל לקח: `[מודול / אובייקט / סימפטום] שורש → תיקון שעבד (הימנע מ: X). best practice`.

- [PP-PI / Control Recipe / לא נשלח ל-MES] כשה-control recipe לא מגיע ל-MES, השורש כמעט תמיד destination לא מוגדר או ממשק PI-PO down — בדוק CO53 לפני שמאשימים את ה-order עצמו. (הימנע מ: יצירת ה-order מחדש — לא פותר את הממשק). best practice: הגדר control recipe destination ובדוק אותו כחלק מ-go-live.
- [PP-PI / COR6N / over-delivery בעת אישור] tolerance לא מוגדר או כמות שגויה — הגדר under/over-delivery tolerance ב-material/order מראש. (הימנע מ: ביטול ה-order). 
- [PP-PI / COGI / חוסר רכיב חוזר] backflush נכשל כי הרכיב לא סופק ל-production storage location — תזמן staging לפני האישור. (הימנע מ: post ידני חוזר ב-COGI בלי לתקן את ה-staging — הבעיה תחזור).
- [PP / Production Order / שחרור נכשל] missing parts הוא הגורם השכיח — בדוק CO24 לפני שינוי scope of check. הרחבת scope כדי "לעקוף" מסתירה בעיית אספקה אמיתית.
- [PP-PI / Batch determination / נכשל בעת release] אסטרטגיית batch/classification לא הושלמה — השלם CU50/determination ב-customizing לפני production. (הימנע מ: הזנת batch ידנית כפתרון קבע).
- [PP / Production Version / order לא נוצר] גרסת ייצור לא תקפה לתאריך — תחזק production version (C223/MM02 MRP4) עם תוקף נכון; טעות תוקף חוזרת בכל MRP run.
- best practice כללי: ב-PP-PI כל תקלת אישור/backflush מתחילה בבדיקת **status הפאזה** ו-**זמינות הרכיב** — שני אלה מסבירים את רוב המקרים לפני חפירה עמוקה.

</div>

---
