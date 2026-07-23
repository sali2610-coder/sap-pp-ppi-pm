# Runbook · שגיאת תנועת מלאי / חשבונית — MIGO · MIRO · COGI (MM/PP/FI · ECC + S/4HANA)

<div dir="rtl">

**מתי:** MIGO נכשל (קליטה/משיכה), MIRO לא רושם חשבונית, או COGI מלא בתנועות סחורה שנכשלו (backflush).
**מודולים:** MM · PP/PP-PI (backflush) · FI (posting).

## מדריך מהיר — אבחון
1. **MIGO error:** קרא את הודעת השגיאה המדויקת (מספר הודעה M7/xxx). בדוק period פתוח (MMPV/MMRV), זמינות מלאי (MMBE), ו-movement type תקין.
2. **MIRO לא נרשם:** בדוק **חסימת חשבונית** (blocking — MRBR), הפרשי מחיר/כמות מול ה-PO (ME23N → PO history), ותקופת FI פתוחה (OB52).
3. **COGI (backflush errors):** רשומות שנוצרו כשה-backflush אוטומטי נכשל. קרא את סיבת השגיאה בכל שורה: חוסר מלאי, storage location חסר, batch/serial חסר, או period סגור.
4. **COGI mass:** סנן לפי order/material/סיבה; תקן במקור ואז **post** מחדש מתוך COGI.

## עץ החלטה לפי סימפטום
- **MIGO "posting only possible in periods…":** תקופה סגורה → MMPV (פתיחת period MM) / OB52 (FI).
- **MIGO "deficit of stock":** מלאי לא מספיק/לא במקום → בדוק MMBE; תקן storage location או השלמת מלאי.
- **MIRO blocked (payment/quantity/price):** חריגת tolerance → MRBR לשחרור, או תקן PO/GR; בדוק tolerance keys (OMR6).
- **MIRO "balance not zero":** אי-התאמת GR/IR → נתח דרך MR11 (GR/IR clearing).
- **COGI חוסר מלאי חוזר:** תזמון backflush מול אספקת רכיבים; שקול control key/staging. שורש נפוץ: רכיב לא סופק ל-production storage location.
- **COGI storage location/batch חסר:** תחזוקת na master data / batch determination.

## צ׳ק-ליסט
- [ ] הודעת השגיאה המדויקת (מספר M7/F5/…) נקראה ותורגמה
- [ ] תקופת MM (MMRV) ו-FI (OB52) נבדקו כפתוחות
- [ ] זמינות מלאי/מיקום אחסון/batch נבדקו (MMBE)
- [ ] ל-MIRO — חסימות (MRBR) והפרשי מחיר/כמות מול PO נבדקו
- [ ] רשומות COGI תוקנו במקור ונרשמו מחדש
- [ ] נבדקה עקביות GR/IR (MR11) במקרה הצורך

## מוצא (No Dead End)
מגיע ל: **שורש** · **תיקון** (period/מלאי/tolerance/master data) · **SAP Note** (`sap-notes.ts` — MIGO×2, COGI×8; MIRO דל → סביר Web) · **הבהרה** (מה מספר ההודעה המלא? איזה movement type? backflush אוטומטי או ידני?).

**מקורות מקומיים:** `data/troubleshooting*.ts` (MIGO×6, COGI×6) · `data/consultant-notes.ts` (MM/FI). **הערה כיסוי:** **MIRO=0 בקטלוג** — dead-end אפשרי ללא רשת; במצב offline החזר שורש כללי + שאלות הבהרה, לעולם לא "אין מידע" ריק.

</div>
