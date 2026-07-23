# Runbook · ביצועים — transaction/job איטי, timeout, dump (Performance · ECC + S/4HANA)

<div dir="rtl">

**מתי:** transaction איטית, דוח/job שרץ שעות, TIME_OUT dump, נעילות, או תלונת "המערכת תקועה".
**מודולים:** Cross · Basis-touchpoint · כל מודול יישומי.

## מדריך מהיר — אבחון
1. **ST22** — TIME_OUT / dump אחר? קרא את מקום הכשל (program/include/שורה).
2. **SM50 / SM66** — מה רץ עכשיו; work process תקוע ב-Sequential Read / commit / RFC?
3. **ST03N** — response time פירוק (DB / CPU / wait / roll); זיהוי transaction/דוח בעייתי.
4. **SM12 (locks) / SM21 (syslog)** — נעילות ארוכות או שגיאות מערכת.
5. **ST05 (SQL trace)** — ל-SQL איטי: הפעל, שחזר, נתח את השאילתה היקרה (full scan? חסר index?).

## עץ החלטה לפי סימפטום
- **TIME_OUT ב-dialog:** פעולה כבדה ב-online → העבר לרקע (background job), או צמצם סלקציה.
- **SQL איטי (ST05 full table scan):** חסר index / סלקציה לא סלקטיבית → בדוק index (SE11), שפר סלקציה; ב-S/4 שקול CDS/HANA-optimized.
- **נעילה ארוכה (SM12):** תהליך אחזק lock → זהה את היוזר/job; serialization בתהליך → תזמון מחדש.
- **Job רץ שעות:** נתונים גדולים / וריאנט לא סלקטיבי / חסר archiving → צמצם scope, פרק לחבילות, שקול parallel.
- **צריכת זיכרון/roll:** תוכנית קוראת internal table ענקית → בעיית קוד; ראה `sap-rootcause` לניתוב ABAP.
- **כללי S/4:** אובייקט שהוחלף/simplification עלול לשנות ביצועים → בדוק vs data/s4-*.

## צ׳ק-ליסט
- [ ] ST22 נבדק ל-TIME_OUT/dump ומקום הכשל אותר
- [ ] SM50/SM66 בדקו מה תקוע ובאיזה שלב (DB/RFC/commit)
- [ ] ST03N שימש לפירוק response time (DB מול CPU מול wait)
- [ ] נעילות (SM12) ו-syslog (SM21) נבדקו
- [ ] ל-SQL איטי — ST05 הופעל ונותח (index/סלקציה)
- [ ] הופרד בין בעיית customizing/נתונים לבין בעיית קוד (ABAP)

## מוצא (No Dead End)
מגיע ל: **שורש** (SQL/lock/job/קוד/config) · **תיקון** או **המלצת אופטימיזציה** · **SAP Note** (חפש component + "performance") · **ניתוב ABAP** (`sap-rootcause`) · **הבהרה** (transaction ספציפית או כללי? מתי התחיל? אחרי שינוי/מיגרציה?).

**מקורות מקומיים:** `data/troubleshooting*.ts` (perf×3) · `data/consultant-notes.ts` (techNotes). כיסוי דק — סביר שיידרש Web/SAP Note לתקלת ביצועים ספציפית.

</div>
