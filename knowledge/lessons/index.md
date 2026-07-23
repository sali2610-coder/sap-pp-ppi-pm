# Lessons Learned — Index & Method (SAP AI Consultant)

<div dir="rtl">

מערכת הלקחים מאפשרת ל-Consultant: (1) לזהות תקלה היסטורית דומה, (2) לעשות שימוש חוזר בתיקון שהצליח, (3) להזהיר מפני פתרון שנכשל, (4) להמליץ best practice, (5) לשפר את ההיסק בעתיד.

## מקורות לקחים
| קובץ | מודול | תוכן |
|---|---|---|
| `../books/sap-pm/poc/lessons/lessons.md` | PM | לקחי master data, מבנה, business functions (מקור מקורי) |
| `pp-pi.md` | PP-PI | לקחי process order, control recipe, backflush, batch |
| `integration.md` | Integration | לקחי IDoc/RFC/PI-PO |

## שיטת שימוש (Similar-Incident Detection)
בכל Incident, לפני מסקנה:
1. **חלץ חתימה:** module + object/tcode + סימפטום (למשל `PP-PI / COR6N / over-delivery`).
2. **חפש דמיון:** עבור על קובצי הלקחים + `data/troubleshooting*.ts` (slug/symptom) והתאם חתימה.
3. **אם נמצא לקח מוצלח:** הצע קודם את התיקון שעבד — "בתקלה דומה בעבר X פתר".
4. **אם נמצא פתרון שנכשל:** הזהר — "אל תנסה Y, הוכח כלא-אפקטיבי / הרסני כאן".
5. **אם אין דמיון:** המשך לחקירה רגילה; בסיום הצע לשמור לקח חדש.

## פורמט לקח (לשמירה על אישור בלבד)
```
- [MODULE / OBJECT / SYMPTOM] תיאור השורש → התיקון שעבד. (הימנע מ: פתרון שנכשל). best practice.
```

## כלל שמירה (Never Auto-Save)
לא לשמור אוטומטית. בסיום תקלה שנפתרה — לשאול "האם לשמור Lesson Learned?" ולהוסיף (append) לקובץ המודול המתאים בלבד. אין ליצור מאגר זיכרון מקביל.

</div>
