# תחזוקת מפעל (PM) ב-SAP S/4HANA — מדריך למשתמש העסקי

<div dir="rtl">

## תקציר מנהלים
החלק המכוסה בספר מציג את מודול ה-PM (Plant Maintenance) בתוך SAP S/4HANA Asset Management מנקודת מבט של משתמש עסקי, ומלווה את הקורא משינוי הטרמינולוגיה והאסטרטגיות ועד למבני הנתונים בפועל. הפרק הראשון פורש את מחזור החיים של התחזוקה: ארבע משימות היסוד לפי DIN 31051 (בדיקה, תחזוקה מונעת, תיקון ושיפור), ההתפתחות מתחזוקה תגובתית לתחזוקה מונעת, מבוססת-מצב ומבוססת-אמינות, ותקני ISO 55000 לניהול נכסים. במקביל מתוארת ההיסטוריה הטכנולוגית של הרכיב מ-RM-INST ב-R/2 ועד S/4HANA הרץ אך ורק על מסד נתונים HANA, כולל ריבוי שמות המוצר (EAM, ALM, Intelligent Asset Management) וההבחנה בין on-premise ל-Cloud. נדונים Enhancement Packages והפעלת business functions דרך SFW5, בדגש על LOG_EAM_CI חסר התלויות, וכן שלוש ממשקי המשתמש: SAP GUI, SAP Business Client ו-SAP Fiori על קטגוריות האפליקציות שלה. החלק על מבנה ארגוני מבחין בין planning plant ל-maintenance plant ומגדיר work center, planner group ו-plant section, כולל control keys, נוסחאות SAP004/SAP008 ושיעורי ניצולת קיבולת מציאותיים. עיקר הערך המעשי נמצא בפרק על מבני הנתונים הטכניים: ההבחנה היסודית בין Functional Location (מספור חיצוני לפי structure indicator, סיכום עלויות היררכי) ל-Equipment (מספור פנימי, serialization, היסטוריית שימוש, refurbishment/subcontracting/calibration), לצד Object Links, Equipment Hierarchies ו-Linear Asset Management עם dynamic segmentation לתשתיות לינאריות. הספר מסיים את החלק במבנה ה-Material Master ההיררכי ובתפקיד ה-Material Type. לאורך כל הטקסט שזורות המלצות מעשיות כגון יצירת "מגרש גרוטאות" לאובייקטים מיושנים ושימוש בקבוצות מסך לשליטה בשדות חובה.

## ממצאים מרכזיים
- ארבע משימות התחזוקה לפי DIN 31051 (בדיקה, תחזוקה מונעת, תיקון, שיפור) הן מסגרת היסוד שעליה נשען כל מודול ה-PM; הגרסה המעודכנת 2018 מרחיבה את ההגדרות לעומת 1985.
- S/4HANA Asset Management הוא היורש של ERP 6.0 ורץ אך ורק על מסד נתונים HANA; טכנולוגיית ה-in-memory משלבת אחסון מבוסס-עמודות ושורות לביצועים מהירים יותר.
- קיים ריבוי שמות לאותו מוצר (PM, EAM, ALM, Intelligent Asset Management) ללא אחידות במינוח, מה שמחייב זהירות בתקשורת בין צוותים.
- מומלץ להפעיל את business function בשם LOG_EAM_CI דרך SFW5 כי היא חסרת תלויות ופותחת שיפורי תחזוקה מרכזיים.
- ההבחנה המעשית החשובה ביותר: Equipment תומך ב-serialization, היסטוריית שימוש ובתהליכי refurbishment/subcontracting/calibration; Functional Location תומך ב-labeling ובסיכום עלויות היררכי בלבד.
- Functional Location ממוספר חיצונית לפי structure indicator (עד 30/40 תווים) ולא ניתן למחיקה אלא דרך archiving — ומכאן ההמלצה ל'מגרש גרוטאות' לאובייקטים מיושנים.
- הבחנה ארגונית קריטית בין planning plant (מתכנן) ל-maintenance plant (מבצע); כאשר ה-plants בשטחי controlling שונים עדיף cost center על פני הזמנות רכש/מכירה.
- control key ב-work center קובע costing/scheduling/confirmation/external ויש להגדירו כברירת מחדל; הנוסחאות SAP004 (DAUNO) ו-SAP008 (ARBEI) משרתות חישובי זמן ודרישות.
- שיעור ניצולת קיבולת מעשי הוא 65%-75%, אך הזמנות לא מתוכננות מורידות אותו ל-30%-50%.
- Linear Asset Management עם dynamic segmentation מאפשר תיאור תשתיות לינאריות (כבישים, צנרת) באמצעות Starting/End Point, Length ו-Offset, ודורש customizing ייעודי של view profiles ו-linear reference patterns דרך IK81/IK82/IK83.
- שלוש ממשקי משתמש מקבילות: SAP GUI, SAP Business Client (כולל side panels עם MTTR/MTBR) ו-SAP Fiori; אפליקציות Fiori מסווגות ל-real apps (עם/בלי ערך מוסף) ול-pseudo apps.
- עומק מבנה רב מביא לגידול אקספוננציאלי באובייקטים — מומלץ להתחיל גס ולפרט נקודתית בלבד.

## נושאים
- מבנה הספר ומבוא ל-PM ב-S/4HANA: טרמינולוגיה חדשה, מערכת S/4HANA ו-HANA DB, סקירת מהדורה וארגון פרקים (עמ' 1, 7)
- מבני ארגון ב-PM מנקודת מבט תחזוקה: יחידות ארגוניות ומרכזי עבודה (עמ' 7)
- מבנה מערכות טכניות: Functional Locations, Equipment, היררכיות, BOM ו-Classification (עמ' 8, 9)
- מחזור הזמנת עבודה מלא: Notification, Order, תכנון, בקרה, ביצוע וסגירה טכנית/עסקית (עמ' 9, 10)
- תחזוקה מונעת: Task Lists, תוכניות מבוססות זמן/ביצוע, Multiple-Counter ו-Inspection Rounds (עמ' 10, 11)
- תהליכים נוספים: תיקונים מיידיים, Shift Notes, Refurbishment, Subcontracting וכיול ציוד בדיקה (עמ' 11, 12)
- אינטגרציה עם MM, PP, QM, EHS, FI, CO ומערכות SAP/לא-SAP, ובקרת PM ודיווח (עמ' 12, 13)
- ארבע משימות תחזוקה לפי DIN 31051 והשוואת הגרסאות 1985 מול 2018 (עמ' 29, 30, 31, 32)
- תקני ISO 55000/55001/55002 לניהול נכסים והרחבתם מעבר ל-PM בלבד (עמ' 32)
- התפתחות אסטרטגיות תחזוקה: reactive, preventive, time-based מול performance-based, condition-based (SCADA) ו-reliability-centered עם FMEA (עמ' 33, 34, 35)
- היסטוריית רכיב ה-PM ב-SAP מ-RM-INST ב-R/2 ועד S/4HANA Asset Management, וריבוי שמות המוצר (עמ' 35)
- S/4HANA כיורש ל-ERP 6.0 על HANA בלבד; on-premise מול Cloud ומחזורי חדשנות שונים (עמ' 36, 37, 52)
- Enhancement Packages והפעלת business functions דרך SFW5; המלצה ל-LOG_EAM_CI חסר התלויות ורשימת business functions מרכזיות (עמ' 38, 39, 40, 52)
- טכנולוגיית in-memory של HANA: שילוב אחסון מבוסס-עמודות ושורות (עמ' 40, 41)
- שלוש ממשקי משתמש: SAP GUI, SAP Business Client (side panels עם MTTR/MTBR) ו-SAP Fiori, וסיווג אפליקציות Fiori (עמ' 42, 43, 44, 46, 48, 49, 50)
- מבנה ארגוני: planning plant מול maintenance plant, planner group, location ו-plant section; תוך-מפעל מול חוצת-מפעלים ושימוש ב-cost center (עמ' 55, 56, 57, 58, 59)
- work center: איש בודד מול workshop, יצירה ב-IR01, מק"טים קצרים, usage 004/009 ו-standard value key SAP0 (עמ' 59, 60, 61, 62)
- control key ונוסחאות: SAP004 ל-DAUNO ו-SAP008 ל-ARBEI; שיעורי ניצולת קיבולת 65%-75% ו-30%-50% (עמ' 62, 63, 64, 65)
- משאבי מבנה ועומק מבנה: התחלה גסה ופירוט נקודתי למניעת גידול אקספוננציאלי באובייקטים (עמ' 68, 69, 70, 71, 72)
- הבדלים Equipment מול Functional Location: מספור פנימי/חיצוני, serialization, refurbishment/subcontracting/calibration רק לציוד; מספור FL חיצוני לפי structure indicator ומחיקה דרך archiving בלבד (עמ' 73, 74, 75, 76, 77, 78, 79, 81, 99, 100)
- יצירת Functional Location ב-IL01, שיוך ידני על מבנה, והמלצה ל'מגרש גרוטאות' לאובייקטים מיושנים (עמ' 83)
- קבוצות מסך ל-master record דרך Set View Profiles ו-Define Field Selection; שדה Position בן 4 תווים ומספור 0001 (עמ' 84, 85, 86)
- הבחנה בין Work Center (משאב ייצור, CM21) ל-Main Work Center (סדנת תחזוקה) (עמ' 86)
- Reference Functional Location כתבנית ו-Alternative Labeling למספור מקביל (לא ניתן לביטול לאחר הפעלה) (עמ' 88, 89, 90)
- התקנה/פירוק ציוד על Functional Location דרך IE02/IL02 והגדרת Define Installation (עמ' 92, 93)
- אחסון ציוד עם serial number ו-Serial no. profile; תנועות סחורה ב-MIGO/IE4N וסקירת מלאי ב-MMBE (עמ' 94, 95, 96, 97)
- Equipment Hierarchies לקבוצות ציוד מורכבות; עדכון היסטוריה על הציוד שצוין בלבד (עמ' 97, 98, 99)
- Object Links ו-Object Networks בין ציודים/מיקומים; תפקיד מינורי בשל אי-שילוב בתהליכים עסקיים (עמ' 101, 102)
- Linear Asset Management עם dynamic segmentation לתשתיות לינאריות; שדות Starting/End Point, Length, Offset ו-linear reference patterns דרך IK81/IK82/IK83 (עמ' 102, 103, 104, 105, 106, 107, 108)
- Material Master היררכי (client/plant/storage) ו-Material Type הקובע מחלקות, number range, procurement type והנהלת חשבונות (עמ' 109, 110)

</div>

---
מקור (נגזר, לא משוכפל): books/sap-pm-business-guide.pdf pp.1-250 · PoC
