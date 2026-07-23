# Runbook · הרשאה חסרה / "You are not authorized" (Security · ECC + S/4HANA)

<div dir="rtl">

**מתי:** משתמש מקבל "no authorization", פעולה חסומה, או תקלת S_RFC/S_TCODE.
**מודולים:** Cross · Security · Basis-touchpoint.

## מדריך מהיר — אבחון
1. **SU53** — הרץ מיד אחרי הכשל אצל המשתמש (או Menu → System → Utilities): מציג את בדיקת ההרשאה **האחרונה שנכשלה** — object + values חסרים.
2. **ST01** (Authorization trace) / **STAUTHTRACE** — trace מלא כשה-SU53 לא חד-משמעי; הפעל, שחזר את הכשל, קרא את האובייקטים הנכשלים.
3. **SU01** — בדוק את המשתמש: roles משויכים, תוקף, נעילה.
4. **PFCG** — בדוק את ה-role: האם האובייקט/הערכים קיימים; status "generated"; profile עדכני.

## עץ החלטה לפי סימפטום
- **חסר authorization object ספציפי (מ-SU53):** הוסף/תקן ערכים ב-role המתאים (PFCG), generate profile, ושייך למשתמש. דוגמאות PM/PP: I_IWERK (plant), I_SWERK, C_AFKO_AWK, S_TCODE.
- **S_TCODE חסר:** ה-tcode לא ב-role → הוסף ל-menu ב-PFCG.
- **S_RFC חסר (בממשקים):** יוזר service חסר הרשאת function group → הוסף S_RFC. ראה `rfc-connection-failure`.
- **org level שגוי (plant/company):** הערך קיים אך לא לערך ה-org הנכון → תקן org levels ב-role.
- **role לא הופעל/פרופיל ישן:** generate + user comparison (PFUD).
- **SU53 ריק/מטעה:** הבדיקה נכשלה במקום אחר (למשל RFC מרוחק) → השתמש ב-STAUTHTRACE.

## צ׳ק-ליסט
- [ ] SU53 הורץ מיד אחרי הכשל וזוהו object + values חסרים
- [ ] במקרה מורכב — STAUTHTRACE הופעל ונקרא
- [ ] נבדק אם החוסר ב-object, ב-org level, או ב-S_TCODE/S_RFC
- [ ] ה-role עודכן, profile חודש (generate), ובוצע user comparison
- [ ] תוקף/נעילת המשתמש נבדקו (SU01)

## מוצא (No Dead End)
מגיע ל: **שורש** (object/org/tcode/rfc) · **תיקון** (PFCG) · **SAP Note** (`sap-notes.ts` — auth×3) · **הבהרה** (מה תמונת ה-SU53? איזה tcode/פעולה? המשתמש חדש או השתנה role?).

**מקורות מקומיים:** `data/authorizations.ts` · `data/security.ts` · `data/troubleshooting*.ts` (auth×9).

</div>
