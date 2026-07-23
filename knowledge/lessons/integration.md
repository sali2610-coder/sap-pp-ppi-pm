# לקחים — Integration (IDoc · RFC · PI/PO)

<div dir="rtl">

לקחים מבוססי ניסיון SAP סטנדרטי (curated). פורמט: `[מודול / אובייקט / סימפטום] שורש → תיקון שעבד (הימנע מ: X). best practice`.

- [Integration / IDoc / status 64 תקוע] כמעט תמיד partner profile ב-"trigger by background program" — הרץ RBDAPP01 או שנה ל-Immediately. (הימנע מ: עיבוד חוזר ידני חוזר ונשנה בלי לתקן את ה-profile — יחזור בכל הודעה).
- [Integration / IDoc / status 51 חוזר על אותו material] נתוני אב חסרים ביעד — סנכרן master data **לפני** עיבוד חוזר. (הימנע מ: BD87 שוב ושוב — ייכשל שוב עד שהאב קיים).
- [Integration / RFC / "user is locked"] יוזר service הפך בטעות ל-Dialog ונעל את עצמו בכניסות — החזר סוג יוזר ל-Communication/System ב-SU01. (הימנע מ: פתיחת הנעילה בלבד — תיחסם שוב).
- [Integration / RFC / SYSFAIL ב-queue] השורש הוא dump ביישום היעד, לא ברשת — קרא ST22 ביעד לפני שמאשימים את החיבור.
- [Integration / PI-PO / הודעה "נעלמה"] לרוב תקועה ב-EO/EOIO queue (SMQ2) ולא אבדה — בדוק את התור לפני הכרזה על אובדן.
- [Integration / IDoc / כשל אחרי conversion ל-S/4] מבנה/segment השתנה או process code שונה — הצלב מול simplification לפני שמתקנים mapping.
- best practice כללי: באינטגרציה תמיד הפרד קודם **שכבה** — רשת (SM59) מול תור (SM58/SMQ) מול יישום (ST22/WE02 status). אבחון שגוי של השכבה הוא הבזבוז הגדול ביותר.

</div>

---
