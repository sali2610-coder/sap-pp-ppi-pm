# Runbook · כשל ממשק PI/PO · SOAP · Proxy — Integration (ECC + S/4HANA)

<div dir="rtl">

**מתי:** הודעה לא עוברת דרך SAP PI/PO (Process Integration/Orchestration), proxy inbound/outbound נכשל, SOAP/REST adapter מחזיר שגיאה.
**מודולים:** Cross · Integration · PP-PI (ממשקי MES/lab).

## מדריך מהיר — אבחון
1. **SXMB_MONI** (בצד ABAP) — אתר את ההודעה; קרא את ה-status ואת ה-trace (SOAP fault / mapping error / system error).
2. **PI/PO — Message Monitoring** (NWA / cockpit): בדוק אם ההודעה הגיעה ל-adapter engine ומה ה-audit log.
3. **SRT_MONI / SRT_UTIL** — עבור SOAP web services / proxy runtime בצד ABAP.
4. **SM59** — אם ה-proxy קורא outbound: בדוק את destination ה-XI/HTTP.

## עץ החלטה לפי סימפטום
- **Mapping error:** שדה חובה חסר/פורמט/UOM → תקן mapping ב-ESR או את הנתון במקור; שלח מחדש מ-SXMB_MONI.
- **System error / channel down:** communication channel לא פעיל → הפעל ב-cockpit; בדוק תעודות SSL אם HTTPS.
- **Proxy inbound נכשל ביישום:** הכשל בקוד ה-ABAP proxy (כמו IDoc 51) → קרא ST22; תקן customizing/master data ואז שלח שוב.
- **Authentication (401/403):** user/certificate → בדוק את יוזר ה-service; ראה `authorization-missing`.
- **הודעה "נעלמה":** בדוק EOIO/EO queue (SMQ2) ו-quality of service; ייתכן תקיעה בתור.

## צ׳ק-ליסט
- [ ] ההודעה אותרה ב-SXMB_MONI/PI-monitoring וה-status נקרא
- [ ] נקבע היכן הכשל: mapping · channel · proxy runtime · אימות · queue
- [ ] SSL/certificate נבדק אם התעבורה מוצפנת
- [ ] במקרה proxy inbound — נבדק ST22 ביישום
- [ ] ההודעה עובדה מחדש לאחר התיקון

## מוצא (No Dead End)
מגיע ל: **שורש** (mapping/channel/auth/queue/יישום) · **תיקון** · **SAP Note** (`sap-notes.ts` — component XI/BC-XI) · **הבהרה** (sync/async? SOAP/IDoc/proxy? מה ה-fault המדויק?).

**מקורות מקומיים:** `data/integration.ts` (PI/PO×11, Proxy×2) · `data/troubleshooting*.ts`. **הערה כיסוי:** SOAP/Proxy דקים בקטלוג (×1) — סביר שיידרש Web ל-SAP Note ספציפי.

</div>
