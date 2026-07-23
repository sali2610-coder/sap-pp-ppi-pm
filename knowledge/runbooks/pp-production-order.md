# Runbook · Production Order — יצירה/שחרור/אישור/COHV (PP · ECC + S/4HANA)

<div dir="rtl">

**מתי:** Production Order (discrete PP) לא נוצר/משוחרר/מאושר, שגיאת availability check, או צורך בעיבוד המוני (COHV).
**מודולים:** PP · MM (רכיבים) · CO (עלויות).

## מדריך מהיר — אבחון
1. **CO03** — הצג את ה-Order; בדוק status (CRTD/REL/TECO/CLSD) ב-status bar (לחיצה על ה-status → הסבר).
2. **COHV** (Mass Processing): סנן orders לפי plant/material/status; הרץ פעולות מרוכזות (release, TECO, print, schedule). לכשל מרוכז — קרא את ה-log לכל order.
3. **CO02 → Functions → Availability Check** — בדוק חוסר רכיבים/קיבולת.
4. **CO24** (Missing Parts) — רשימת רכיבים חסרים החוסמים שחרור.

## עץ החלטה לפי סימפטום
- **Order לא נוצר מ-planned order / CO01:** BOM או Routing חסרים/לא תקפים לתאריך → בדוק CS03 (BOM) ו-CA03 (routing); בדוק production version (MM02 → MRP4 / C223).
- **שחרור נכשל — missing parts:** availability check נכשל → CO24; השלם מלאי או שנה scope of check (OPJK); שקול שחרור עם חוסר לפי מדיניות.
- **שחרור נכשל — no cost estimate / costing:** בעיית CO → בדוק costing variant ו-cost center; ראה שורש CO.
- **אישור (CO11N/CO15) נכשל:** backflush נכשל → רשומות ל-COGI (ראה runbook `goods-movement-invoice-error`); או שגיאת confirmation (over-delivery, status).
- **COHV — חלק מה-orders נכשלו:** קרא log פר-order; לרוב אותם שורשים (missing parts / status / lock).
- **TECO לא עובר:** confirmations/רכש פתוחים → סגור/בטל תלויות.

## צ׳ק-ליסט
- [ ] status ה-Order נקרא ופוענח (CO03)
- [ ] BOM + Routing + Production Version נבדקו כתקפים לתאריך
- [ ] Availability check / missing parts נבדקו (CO24)
- [ ] כשל costing/CO נבדק אם השחרור חסום מסיבה כספית
- [ ] כשלי אישור נותבו ל-COGI לפי הצורך
- [ ] בעיבוד COHV — ה-log לכל order נקרא בנפרד

## מוצא (No Dead End)
מגיע ל: **שורש** · **תיקון** · **SAP Note** · **הבהרה** (איזה order type? מה ה-status? discrete או repetitive?).

**מקורות מקומיים:** `data/troubleshooting*.ts` (process/production order) · `data/sapData.ts` (AFKO/AFPO/AFVC/RESB) · `data/consultant-notes.ts` (PP). **הערה כיסוי:** **COHV=0 בקטלוג** — הרנבוק הזה מכסה את הפער; לתקלה ספציפית ללא התאמה — הבהרה/Web, לא dead-end.

</div>
