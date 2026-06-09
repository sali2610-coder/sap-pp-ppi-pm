<div dir="rtl">

# מונחון SAP PM

| Object | Type | הסבר (עברית) |
|---|---|---|
| `IL01` | tcode | יצירת Functional Location חדש (מיקום פונקציונלי). |
| `IL02` | tcode | שינוי Functional Location, כולל התקנה/פירוק ציוד. |
| `IL04` | tcode | יצירת רשימת Functional Locations המוניים לפי structure indicator. |
| `IL05` | tcode | הצגת רשימת Functional Locations. |
| `IL07` | tcode | דוח מבני רב-רמתי של Functional Locations. |
| `IE01` | tcode | יצירת רשומת Equipment חדשה (ציוד). |
| `IE02` | tcode | שינוי Equipment, כולל התקנה על מיקום פונקציונלי. |
| `IE03` | tcode | הצגת Equipment. |
| `IE05` | tcode | רשימת/בחירת Equipment. |
| `IE07` | tcode | עיבוד רשימת Equipment המוני. |
| `IE4N` | tcode | ניהול תנועות מלאי וסידור (serialization) של ציוד מתוחזק. |
| `IR01` | tcode | יצירת work center (מרכז עבודה) לתחזוקה. |
| `IH01` | tcode | הצגת מבנה פונקציונלי/ציוד היררכי. |
| `IH03` | tcode | הצגת מבנה Equipment. |
| `IK81` | tcode | יצירת linear reference pattern (תבנית ייחוס לינארית). |
| `IK82` | tcode | שינוי linear reference pattern. |
| `IK83` | tcode | הצגת linear reference pattern. |
| `IN02` | tcode | שינוי point/measuring point (נקודת מדידה). |
| `IN04` | tcode | רשימת נקודות מדידה. |
| `IN07` | tcode | עיבוד נקודות מדידה. |
| `IN15` | tcode | טרנזקציה מקבוצת ניהול נקודות מדידה/מונים. |
| `IN16` | tcode | טרנזקציה מקבוצת ניהול נקודות מדידה/מונים. |
| `IN18` | tcode | טרנזקציה מקבוצת ניהול נקודות מדידה/מונים. |
| `IN19` | tcode | טרנזקציה מקבוצת ניהול נקודות מדידה/מונים. |
| `IK81/IK82/IK83` | tcode-group | שלישיית טרנזקציות ליצירה/שינוי/הצגה של linear reference patterns. |
| `CM21` | tcode | לוח תכנון קיבולת (capacity planning) של work center ייצורי. |
| `MMBE` | tcode | סקירת מלאי (stock overview) לחומר על פני plants ומחסנים. |
| `MIGO` | tcode | רישום תנועות סחורה (קבלה/הוצאה) במלאי. |
| `MM02` | tcode | שינוי רשומת Material Master. |
| `ME51N` | tcode | יצירת דרישת רכש (purchase requisition). |
| `MIRO` | tcode | רישום חשבונית ספק נכנסת. |
| `SFW5` | tcode | מתג Switch Framework להפעלת business functions במערכת. |
| `LSMW` | tcode | כלי מיגרציה להעברת נתוני master בכמות (Legacy System Migration Workbench). |
| `IBIP` | tcode | כלי קליטת נתוני PM המוניים (batch input) לאובייקטים טכניים. |
| `Functional Location Type` | object | מאפיין הקובע את התנהגות וקטגוריית המיקום הפונקציונלי. |
| `Equipment Category` | object | קטגוריית ציוד הקובעת אילו תכונות ומסכים זמינים לרשומת Equipment. |
| `Structure Indicator` | object | תבנית עריכה הקובעת את פורמט המספור החיצוני ההיררכי של מיקומים פונקציונליים. |
| `Serial Number Profile` | object | פרופיל הקובע כללי serialization של חומר/ציוד ותנועותיו. |
| `Construction Type` | object | סוג בנייה המקשר ציוד לחומר ייחוס לצורכי refurbishment ותכנון. |
| `Object Network` | object | רשת קישורים בין אובייקטים טכניים (Object Links) בעלת תפקיד מינורי בתהליכים. |
| `Linear Asset Management` | object | ניהול נכסים לינאריים (כבישים, צנרת) עם dynamic segmentation. |
| `Dynamic Segmentation` | object | מנגנון חלוקת נכס לינארי למקטעים שבהם המאפיינים משתנים לאורך הקו. |
| `Linear Reference Pattern` | object | תבנית לתיאור נקודות ייחוס יחסיות על אובייקט לינארי. |
| `Maintenance Event Builder` | object | כלי לתכנון וקיבוץ עבודות תחזוקה מרובות לאירוע מתואם. |
| `Pool Asset Management` | object | ניהול מאגר נכסים/ציוד משותף לשימוש משתנה. |
| `PRT` | object | Production Resource/Tool — כלי או אמצעי עזר לתחזוקה/ייצור. |
| `RM-INST` | object | רכיב התחזוקה ההיסטורי ב-SAP R/2 (1986), אב-טיפוס ל-PM. |
| `SAP R/2` | object | דור מערכת ה-mainframe המוקדם של SAP. |
| `SAP R/3` | object | דור client-server של SAP שבו הוצג PM המודרני. |
| `SAP ERP 6.0` | object | גרסת ה-ERP שלפני S/4HANA, קודמו של S/4HANA. |
| `SAP S/4HANA` | object | חבילת ה-ERP של SAP הרצה אך ורק על מסד נתונים HANA. |
| `SAP S/4HANA Asset Management` | object | השם הרשמי למודול ניהול הנכסים/התחזוקה ב-S/4HANA. |
| `SAP HANA` | object | מסד נתונים in-memory עם אחסון מבוסס-עמודות ושורות. |
| `SAP EAM (Enterprise Asset Management)` | object | מטריית ניהול נכסים ארגוני הכוללת את PM. |
| `ALM (Asset Lifecycle Management)` | object | ניהול מחזור חיי הנכס — אחד מכינויי מוצר התחזוקה. |
| `SAP Intelligent Asset Management` | object | חבילת ענן לניהול נכסים חכם המשלימה את PM. |
| `Asset Central Foundation` | object | שכבת היסוד הענן המשותפת לפתרונות Intelligent Asset Management. |
| `SAP Asset Intelligence Network` | object | רשת ענן לשיתוף מידע על נכסים בין יצרנים ומפעילים. |
| `SAP Asset Strategy and Performance Management` | object | כלי ענן לאסטרטגיית תחזוקה וניתוח ביצועי נכסים. |
| `SAP Predictive Maintenance and Service` | object | פתרון תחזוקה חזויה מבוססת נתוני חיישנים. |
| `SAP Predictive Engineering Insights` | object | כלי תובנות הנדסיות חזויות לנכסים. |
| `SAP Asset Manager` | object | אפליקציית מובייל לביצוע עבודות תחזוקה בשטח. |
| `SAP Work Manager` | object | אפליקציית מובייל ותיקה לעבודות תחזוקה בשטח. |
| `SAP GUI` | object | לקוח שולחני קלאסי לגישה לטרנזקציות SAP. |
| `SAP GUI 7.50` | object | גרסה של לקוח ה-SAP GUI השולחני. |
| `SAP GUI 7.60` | object | גרסה מאוחרת יותר של לקוח ה-SAP GUI. |
| `SAP Business Client` | object | מעטפת לקוח עם side panels (כולל MTTR/MTBR) לטרנזקציות וקישורי תפקיד. |
| `SAP Fiori` | fiori | חוויית משתמש מבוססת-תפקיד ורספונסיבית מעל S/4HANA. |
| `SAP Fiori launchpad` | object | נקודת הכניסה המרכזית לאריחי אפליקציות Fiori. |
| `SAPUI5` | object | תשתית פיתוח ה-JavaScript/HTML5 שעליה בנויות אפליקציות Fiori. |
| `SAP Web IDE` | object | סביבת פיתוח מבוססת ענן לאפליקציות SAPUI5/Fiori. |
| `SAP Screen Personas` | object | כלי להתאמה אישית ופישוט מסכי SAP GUI. |
| `GuiXT` | object | כלי צד-שלישי להתאמה ויזואלית של מסכי SAP GUI. |
| `Belize theme` | object | ערכת עיצוב של Fiori launchpad. |
| `Signature theme` | object | ערכת עיצוב קלאסית של ממשק SAP. |
| `SAP Cloud Platform` | object | פלטפורמת הענן של SAP (כיום BTP) לפיתוח והרחבות. |
| `SAP 3D Visual Enterprise Viewer` | object | כלי הצגת מודלים תלת-ממדיים של נכסים וציוד. |
| `SAP BW/4HANA` | object | מחסן נתונים של SAP על HANA לדיווח אנליטי. |
| `SAP Business Warehouse` | object | מחסן הנתונים הקלאסי של SAP לדיווח. |
| `SAP Lumira` | object | כלי ויזואליזציית נתונים ואנליטיקה של SAP. |
| `SAP Master Data Governance` | object | פתרון לממשל וניהול איכות נתוני master. |
| `SAP NetWeaver MDM` | object | כלי ניהול נתוני master ותיק על NetWeaver. |
| `SAP SRM` | object | פתרון ניהול קשרי ספקים ורכש. |
| `RE-FX` | object | רכיב ניהול נדל"ן גמיש (Flexible Real Estate) המשתלב עם נכסים לינאריים. |
| `DIN 31051` | standard | תקן גרמני המגדיר ארבע משימות תחזוקה: בדיקה, מונעת, תיקון ושיפור. |
| `EN 13306` | standard | תקן אירופי לטרמינולוגיית תחזוקה. |
| `ISO 55000` | standard | תקן סקירה ועקרונות לניהול נכסים. |
| `ISO 55001` | standard | תקן הדרישות למערכת ניהול נכסים. |
| `ISO 55002` | standard | תקן הנחיות ליישום ISO 55001. |
| `FMEA` | object | ניתוח אופני כשל והשפעותיהם, בסיס לתחזוקה מבוססת-אמינות. |
| `EA-PLM` | object | רכיב/הרחבה לניהול מחזור חיי מוצר ונכס. |
| `LOG_EAM_CI_1` | object | business function משפר תחזוקה (continuous improvement) חסר תלויות, מומלץ להפעלה. |
| `LOG_EAM_CI_2` | object | business function נוסף בסדרת שיפורי ה-EAM. |
| `LOG_EAM_CI_3` | object | business function נוסף בסדרת שיפורי ה-EAM. |
| `LOG_EAM_CI_4` | object | business function נוסף בסדרת שיפורי ה-EAM. |
| `LOG_EAM_CI_5` | object | business function נוסף בסדרת שיפורי ה-EAM. |
| `LOG_EAM_CI_6` | object | business function נוסף בסדרת שיפורי ה-EAM. |
| `LOG_EAM_CI_7` | object | business function נוסף בסדרת שיפורי ה-EAM. |
| `LOG_EAM_CI_8` | object | business function נוסף בסדרת שיפורי ה-EAM. |
| `LOG_EAM_CI_9` | object | business function נוסף בסדרת שיפורי ה-EAM. |
| `LOG_EAM_CI_9_ORD_OPER_COMP` | object | הרחבת CI_9 לרכיבי פעולות בהזמנת תחזוקה. |
| `LOG_EAM_CI_10` | object | business function נוסף בסדרת שיפורי ה-EAM. |
| `LOG_EAM_CI_11` | object | business function נוסף בסדרת שיפורי ה-EAM. |
| `LOG_EAM_CI_12` | object | business function נוסף בסדרת שיפורי ה-EAM. |
| `LOG_EAM_CI_13` | object | business function נוסף בסדרת שיפורי ה-EAM. |
| `LOG_EAM_CC` | object | business function בתחום ה-EAM. |
| `LOG_EAM_OLC` | object | business function ל-Order List/operation account assignment בתחום EAM. |
| `LOG_EAM_OLC_2` | object | הרחבה של business function ה-OLC. |
| `LOG_EAM_POM` | object | business function ל-Plant Maintenance order management. |
| `LOG_EAM_POM_2` | object | הרחבה של business function ה-POM. |
| `LOG_EAM_PAM` | object | business function בתחום ניהול נכסים (Pool/Performance Asset Management). |
| `LOG_EAM_ROTSUB` | object | business function ל-rotable/subcontracting (ציוד מתחלף וקבלנות משנה). |
| `LOG_EAM_ROTSUB_2` | object | הרחבה של business function ה-rotable/subcontracting. |
| `LOG_EAM_LINEAR_1` | object | business function לאפשור Linear Asset Management. |
| `LOG_EAM_LINEAR_2` | object | הרחבה של Linear Asset Management. |
| `LOG_EAM_SIMPLICITY` | object | business function לפישוט תהליכי EAM. |
| `LOG_EAM_SIMPLICITY_2` | object | הרחבה של פישוט תהליכי EAM. |
| `LOG_EAM_SIMP` | object | business function קצר לפישוט תהליכי EAM. |
| `LOG_EAM_SHIFTFACTORS` | object | business function למקדמי משמרת (shift factors) בתחזוקה. |
| `LOG_EAM_PRINT` | object | business function לשיפור הדפסת מסמכי תחזוקה. |
| `LOG_EAM_MPS1` | object | business function לתכנון תחזוקה (maintenance planning). |
| `LOG_EAM_OLC_2` | object | הרחבה של business function ה-OLC. |
| `LOG_EAM_VE_INT` | object | business function לאינטגרציית Visual Enterprise (תלת-ממד). |
| `LOG_EAM_MPOINT_MASS_DEACT` | object | business function להשבתה המונית של נקודות מדידה. |
| `LOG_EAM_QM_CODE_DEACT` | object | business function להשבתת קודי QM בתחזוקה. |
| `/EAMPLM/LOG_EAM_WS` | object | business function לסביבת עבודה (web service/workspace) של EAM-PLM. |
| `LOG_MM_SERNO` | object | business function לטיפול במספרים סידוריים בצד MM. |
| `LOG_PP_SRN_02` | object | business function לסידור (serialization) בצד PP. |
| `LOG_PP_SRN_CONF` | object | business function לסידור בדיווח/אישור PP. |
| `Equipment Category` | object | ראה לעיל — קטגוריית ציוד. |
| `SAP0` | object | standard value key לתחזוקה הקובע אילו ערכי זמן נשמרים בפעולה. |
| `SAP004` | object | נוסחה לחישוב משך In-Process (DAUNO) בתזמון פעולות תחזוקה. |
| `SAP008` | object | נוסחה לחישוב דרישות עבודה (ARBEI) בתכנון קיבולת. |
| `004` | object | קוד usage של work center המתאים לתחזוקה. |
| `009` | object | קוד usage של work center המתאים לתחזוקה. |
| `ARBEI` | object | שדה כמות העבודה (work) המשמש בנוסחת SAP008. |
| `DAUNO` | object | שדה משך נורמלי (normal duration) המשמש בנוסחת SAP004. |
| `PM (Plant Maintenance)` | object | מודול תחזוקת מפעל הקלאסי של SAP, ליבת ניהול הנכסים. |
| `Approve Purchase Orders` | fiori | אפליקציית Fiori לאישור הזמנות רכש. |
| `Create Purchase Requisition` | fiori | אפליקציית Fiori ליצירת דרישת רכש. |
| `Create Supplier Invoice` | fiori | אפליקציית Fiori ליצירת חשבונית ספק. |
| `My Purchasing Document Items` | fiori | אפליקציית Fiori להצגת פריטי מסמכי רכש של המשתמש. |
| `Post Incoming Invoices` | fiori | אפליקציית Fiori לרישום חשבוניות נכנסות. |
| `Release Maintenance Orders` | fiori | אפליקציית Fiori לשחרור הזמנות תחזוקה. |

</div>

---
מקור (נגזר, לא משוכפל): books/sap-pm-business-guide.pdf pp.1-250 · PoC
