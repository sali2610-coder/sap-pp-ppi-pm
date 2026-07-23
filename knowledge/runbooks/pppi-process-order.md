# Runbook · Process Order — COR6N · COGI · Control Recipe (PP-PI · ECC + S/4HANA)

<div dir="rtl">

**מתי:** Process Order (PP-PI) לא נוצר/משוחרר, אישור ב-COR6N נכשל, Control Recipe לא נשלח ל-MES, או backflush ל-COGI.
**מודולים:** PP-PI · MM · QM (in-process) · Integration (MES/PI-PO).

## מדריך מהיר — אבחון
1. **COR3** — הצג את ה-Process Order; בדוק status ו-Master Recipe/Resource.
2. **COR6N** (Time/Confirmation): אישור פעולה/פאזה. לכשל — קרא את ההודעה: over/under delivery, status חסום, או goods movement error.
3. **CO53 / CO54** — Control Recipe Monitor: בדוק אם ה-control recipe נוצר ונשלח (destination, status). כשל שליחה → ממשק PI/PO.
4. **COGI** — תנועות backflush שנכשלו (ראה runbook `goods-movement-invoice-error`).

## עץ החלטה לפי סימפטום
- **Order לא נוצר:** Master Recipe (C203) או Production Version חסרים/לא תקפים → בדוק C203, MM02 (MRP4), resource (CRC3).
- **Control Recipe לא נשלח:** control recipe destination לא מוגדר/ממשק down → CO53; בדוק destination (O10C) ואת ממשק ה-PI-PO (runbook `pipo-integration-failure`).
- **COR6N over-delivery / status:** בדוק under/over-delivery tolerance; status של הפאזה (חייב REL).
- **Backflush נכשל (COGI):** רכיב לא ב-production storage location / batch determination → תקן ואז post מ-COGI.
- **In-process QM חוסם:** inspection lot פתוח → נתב ל-QM (QA32) לפני אישור.
- **Batch determination נכשל:** אסטרטגיית batch/classification → בדוק CU50/הגדרות determination.

## צ׳ק-ליסט
- [ ] status ה-Process Order נקרא (COR3)
- [ ] Master Recipe + Resource + Production Version תקפים
- [ ] Control Recipe נוצר ונשלח (CO53/CO54); destination תקין
- [ ] כשלי אישור (COR6N) פוענחו — tolerance/status/goods movement
- [ ] backflush שנכשל נותב ל-COGI ותוקן
- [ ] תלות QM (inspection lot) נבדקה

## מוצא (No Dead End)
מגיע ל: **שורש** · **תיקון** · **SAP Note** (`sap-notes.ts` — component PP-PI-PMA/…) · **הבהרה** (יש MES? control recipe בשימוש? מה ה-status של הפאזה?).

**מקורות מקומיים:** `data/troubleshooting*.ts` (PP-PI×35, COR6N×6) · `data/pppi-process-flow.ts` · `data/sapData.ts` (AFKO/PLPO/control recipe). כיסוי PP-PI חזק.

</div>
