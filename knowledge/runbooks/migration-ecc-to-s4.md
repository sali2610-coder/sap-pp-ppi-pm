# Runbook · מיגרציה ECC→S/4HANA — פער התנהגות "עבד ב-ECC נכשל ב-S/4" (Migration)

<div dir="rtl">

**מתי:** אובייקט/תהליך שעבד ב-ECC נכשל או משתנה ב-S/4HANA; שאלת simplification; הכנה/בדיקה של conversion.
**מודולים:** Cross · כל מודול · Basis-touchpoint (SUM/DMO).

## מדריך מהיר — אבחון
1. **זהה את האובייקט המדויק** (tcode/טבלה/BAPI/report) ואת ההבדל בהתנהגות.
2. **Simplification Item** — בדוק אם האובייקט מופיע ב-Simplification List של S/4 (transaction/טבלה שהוחלפה, למשל MATNR extension, טבלאות MM-IM aggregate → MATDOC).
3. **SAP Readiness Check / SUM notes** — בדוק אם ה-conversion סימן אזהרה על האובייקט.
4. **קטלוג מקומי:** הצלב מול `data/ecc-s4.ts`, `data/s4-transformation.ts`, `data/s4-impact.ts`, ו-`data/sapData.ts` (S/4 notes + alt table/tcode per object).

## עץ החלטה לפי סימפטום
- **tcode "obsolete"/הוסר:** הוחלף באפליקציית Fiori/tcode חלופי → מצא את החלופה ב-`data/sapData.ts` (alt tcode) או `data/fiori.ts`.
- **טבלה ריקה/שונה (compatibility view):** טבלאות aggregate הוחלפו ב-CDS/MATDOC → קרא דרך ה-view החדש; אל תסתמך על טבלה ישנה בקוד Z.
- **קוד Z נכשל אחרי conversion:** גישה לשדה/טבלה שהשתנה → התאם לפי simplification; ראה `sap-rootcause` לניתוב ABAP.
- **Output/NAST → BRF+ / output management חדש:** שינוי טכנולוגיית פלט.
- **Credit management / Business Partner (CVI):** לקוח/ספק הפכו ל-Business Partner חובה → בדוק CVI ו-BP.
- **התנהגות שונה בלי שגיאה:** simplification בלוגיקה עסקית → תעד ובדוק מול SAP Note.

## צ׳ק-ליסט
- [ ] האובייקט המדויק וההבדל ההתנהגותי תועדו (ECC מול S/4)
- [ ] נבדק אם האובייקט ב-Simplification List
- [ ] `data/ecc-s4.ts` / `s4-transformation` / `sapData.ts` (S/4 notes + alt) הוצלבו
- [ ] קוד Z שנשבר נותב לניתוח simplification/ABAP
- [ ] נבדק אם נדרש SAP Note / SUM note ספציפי

## מוצא (No Dead End)
מגיע ל: **שורש** (simplification/replacement/Z-code) · **חלופה מומלצת** (alt tcode/Fiori/view) · **SAP Note / Simplification Item** · **הבהרה** (איזה אובייקט? מה ההתנהגות ב-ECC מול S/4? אחרי conversion או greenfield?).

**מקורות מקומיים:** `data/ecc-s4.ts` · `data/s4-architecture.ts` · `data/s4-impact.ts` · `data/s4-transformation.ts` · `data/migration-cockpit.ts` · `data/sapData.ts` (S/4 notes/alt per table). כיסוי ארכיטקטורה/מיגרציה חזק.

</div>
