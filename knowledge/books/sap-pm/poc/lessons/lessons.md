# לקחים — SAP PM

<div dir="rtl">

- בחר Equipment כאשר נדרשים serialization, היסטוריית שימוש או תהליכי refurbishment/subcontracting/calibration; בחר Functional Location כשעיקר הצורך הוא labeling וסיכום עלויות היררכי — ההבחנה הזו קובעת את כל מבנה הנתונים בהמשך.
- תכנן את מספור ה-Functional Location מראש לפי structure indicator, כי מיקום פונקציונלי לא ניתן למחיקה אלא דרך archiving; טעות במבנה תישאר במערכת לאורך זמן.
- הקם 'מגרש גרוטאות' (dummy location/parking) לאובייקטים מיושנים מראש — קל יותר להעביר master data לשם מאשר לנסות למחקו.
- התחל מבנה גס ופרט נקודתית בלבד; ריבוי רמות מביא לגידול אקספוננציאלי במספר האובייקטים ולעומס תחזוקה מיותר.
- בארגון רב-מפעלי הבחן בבירור בין planning plant ל-maintenance plant; כשה-plants בשטחי controlling שונים, העבר עלויות דרך cost center במקום הזמנות רכש/מכירה בין-חברתיות.
- הגדר control key כברירת מחדל ב-work center והשתמש ב-standard value key SAP0 ובנוסחאות SAP004/SAP008 כדי שתזמון וחישוב הקיבולת יעבדו כראוי.
- תכנן קיבולת לפי ניצולת מציאותית של 65%-75%, וזכור שעומס הזמנות לא מתוכננות מוריד אותה ל-30%-50%.
- הפעל business functions בזהירות דרך SFW5 — חלק מהן בלתי-הפיכות; LOG_EAM_CI הוא נקודת התחלה בטוחה כי הוא חסר תלויות.
- Alternative Labeling ו-Reference Functional Location הם כלים חזקים אך 'דביקים': הפעלת labeling חלופי אינה ניתנת לביטול, ושינוי בתבנית reference מתפשט לכל המבנים שנגזרו ממנה.
- השתמש בקבוצות מסך (Set View Profiles + Define Field Selection) כדי לאכוף שדות חובה ולהסתיר שדות לא רלוונטיים, במקום להסתמך על משמעת המשתמשים.
- Object Links/Networks הם בעלי ערך תיעודי בלבד ואינם משתלבים בתהליכים העסקיים — אל תבנה עליהם לוגיקה תפעולית.
- ל-Linear Asset Management דרוש customizing מקדים (view profiles, offset, linear reference patterns דרך IK81/IK82/IK83) לפני שניתן לתאר תשתיות לינאריות בפועל.

</div>

---
מקור (נגזר, לא משוכפל): books/sap-pm-business-guide.pdf pp.1-250 · PoC
