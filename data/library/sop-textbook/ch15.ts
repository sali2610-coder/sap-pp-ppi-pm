// ===== S&OP with SAP IBP Digital Textbook — Chapter 15 =====
// Roles and Security. Every node is a complete LearningNode with 18 facets of
// authored Hebrew (beginner + consultant friendly). SAP identifiers verbatim EN.
// הארגון = Example Product bottling IBP roles/security context.
import type { TextbookChapter } from "./types";

export const CH15: TextbookChapter = {
  n: 15,
  titleHe: "תפקידים ואבטחה",
  titleEn: "Roles and Security",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לתפקידים ולאבטחה ב-SAP IBP (Integrated Business Planning) בענן. אבטחה ב-IBP אינה רק 'מי נכנס למערכת' — היא קובעת אילו נתוני-תכנון כל משתמש רואה, מה מותר לו לשנות, ובאילו שלבים של תהליך-התכנון הוא מעורב. הפרק עוקב אחר מודל-האבטחה המלא: ניהול משתמשים ב-SAP Cloud Identity, יצירת קבוצות-משתמשים (user groups), הקצאת business roles הבנויים מ-business catalogs, ובקרת-הנתונים העדינה דרך permission filters עם read/write criteria — כולל permission filters בשלב-התהליך (process stage). כל תת-פרק מורחב ל-18 מקטעים: שלוש רמות-הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך, דוגמת הארגון, ניווט באפליקציות-הניהול של IBP, טבלאות/אובייקטים, פרטי-קונפיגורציה, תרשים-זרימה, טעויות נפוצות, פתרון-תקלות, שיטות-מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: לשלוט במודל-האבטחה של IBP מקצה-לקצה.",
  subchapters: [
    // ============================================================ 15.1
    {
      id: "15.1",
      titleHe: "ניהול אבטחה (Security Management)",
      titleEn: "Security Management",
      execHe:
        "ניהול-האבטחה ב-IBP הוא שכבת-הבקרה המגדירה מי רשאי לעשות מה, ועל אילו נתונים. בשונה ממערכות ECC המסורתיות, אבטחה ב-IBP בענן בנויה על שלושה רכיבים משולבים: זהויות (SAP Cloud Identity), הרשאות תפקודיות (business roles המורכבים מ-business catalogs), ובקרת-נתונים (permission filters). הבנת המודל הזה היא תנאי-סף לכל מימוש IBP מאובטח ותואם-רגולציה.",
      beginnerHe:
        "דמיין בניין-משרדים. כדי לעבוד בו צריך שלושה דברים: כרטיס-כניסה לבניין (זהות), רשימת-החדרים שמותר לך להיכנס אליהם (התפקיד), והיתר לגעת רק בתיקים מסוימים בתוך כל חדר (סינון-הנתונים). ב-IBP בדיוק כך: הזהות פותחת את המערכת, ה-business role פותח אפליקציות ופעולות, וה-permission filter מצמצם את הנתונים שתראה ותשנה.",
      consultantHe:
        "מודל-האבטחה של IBP הוא שכבתי ומורכב משלוש שכבות עצמאיות שמצטלבות: (1) Authentication — מנוהל ב-SAP Cloud Identity Services (Identity Authentication / IAS), כולל SSO ו-MFA. (2) Authorization תפקודית — business role אוסף business catalogs, שכל אחד מהם מעניק גישה לקבוצת-אפליקציות ופעולות (display/maintain). (3) Data-level security — permission filters עם read/write criteria מצמצמים שורות-נתונים לפי ערכי-מאפיינים (Master Data attributes). חשוב: שלוש השכבות הן AND — משתמש חייב לעבור את כולן. שינויי-הרשאות נכנסים לתוקף בכניסה הבאה (re-login) ולעיתים דורשים רענון-cache.",
      purposeHe:
        "המטרה: להבטיח שכל מתכנן רואה ומשנה רק את חלקו בתכנית — בלי לחשוף נתונים רגישים (מחירים, תחזיות-מתחרים, אזורים שאינם באחריותו), תוך עמידה בהפרדת-תפקידים (Segregation of Duties) ובדרישות-ביקורת.",
      processExampleHe:
        "ארגון גלובלי מקים IBP: צוות-האבטחה מגדיר תחילה את הזהויות ב-Cloud Identity, יוצר business roles לכל פרסונה (Demand Planner, Supply Planner, Viewer), מרכיב כל role מ-business catalogs מתאימים, ולבסוף מצרף permission filters שמגבילים כל מתכנן לאזורו ולמוצריו. בדיקת-קבלה: כל פרסונה נכנסת ומוודאת שהיא רואה בדיוק את מה שתוכנן — לא פחות ולא יותר.",
      scenarioHe:
        "בארגון (מבקבק Example Product): מתכנן-הביקוש של אזור הצפון רואה רק את ה-SKUs והמפעלים של הצפון; מתכנן-האספקה הארצי רואה את כל המפעלים אך יכול לשנות רק תכניות-ייצור; מנהל-המכירות מקבל role של Viewer בלבד — רואה תחזיות אך לא משנה. כל זה נאכף בשלוש השכבות יחד.",
      navHe: [
        "SAP IBP Web UI ► Side Navigation ► Administration ► Manage Users",
        "SAP IBP Web UI ► Administration ► Roles and Permissions ► Manage Business Roles",
        "SAP Cloud Identity Services ► Identity Authentication ► User Management",
      ],
      tables: ["IBP User Master", "Business Role", "Business Catalog", "Permission Filter"],
      tcodes: ["Manage Users", "Manage Business Roles", "Manage Permission Filters"],
      fiori: ["Manage Users", "Manage Business Roles", "Manage Permission Filters", "Manage User Groups"],
      configHe: [
        "Authentication: מוגדר ב-SAP Cloud Identity Services (IAS) — SSO/SAML, MFA, מדיניות-סיסמה.",
        "Authorization: business role = אוסף business catalogs; כל catalog מעניק אפליקציות + פעולות.",
        "Data security: permission filters עם read/write criteria מוצמדים ל-role או למשתמש.",
        "כלל-זהב: שלוש השכבות הן AND — חוסר באחת חוסם גישה.",
      ],
      flow: [
        { he: "הגדרת זהות", code: "Cloud Identity", note: "Authentication / SSO" },
        { he: "יצירת business role", code: "Manage Business Roles" },
        { he: "הרכבה מ-business catalogs", note: "אפליקציות + פעולות" },
        { he: "הצמדת permission filters", note: "read/write criteria" },
        { he: "הקצאה למשתמש/קבוצה", code: "Manage Users" },
        { he: "בדיקת-קבלה לכל פרסונה", note: "רואה בדיוק את המתוכנן" },
      ],
      masterDataHe: [
        "Master Data attributes (Product, Location, Customer, Region) הם הבסיס ל-permission filter criteria.",
        "User Master ב-IBP מקושר לזהות ב-Cloud Identity דרך כתובת-דוא\"ל / User ID.",
      ],
      mistakesHe: [
        "התמקדות בהרשאות-אפליקציה (business role) בלבד תוך התעלמות מ-permission filters — המשתמש רואה את כל הנתונים.",
        "מתן role רחב 'כדי לחסוך זמן', ואז ניסיון לצמצם בדיעבד — קשה לתחזק וחושף בקרת-ביקורת.",
        "הנחה שינוי-הרשאה נכנס מיד — בפועל דורש re-login ולעיתים רענון-cache.",
      ],
      troubleshootHe: [
        "משתמש רואה נתונים שאסור לו ➔ חסר permission filter, או ה-filter לא הוצמד ל-role/למשתמש.",
        "משתמש לא נכנס כלל ➔ בעיית Authentication ב-Cloud Identity (זהות לא-פעילה / SSO).",
        "משתמש לא רואה אפליקציה ➔ business catalog חסר ב-business role.",
      ],
      bestPracticeHe: [
        "תכנן את שלוש השכבות יחד מהיום הראשון — אל תדחה את ה-permission filters.",
        "אמץ עקרון-המינימום (least privilege): התחל מצומצם, הרחב לפי צורך מוכח.",
        "תעד מטריצת-פרסונות (persona × catalogs × filters) ושמור אותה כמקור-אמת.",
      ],
      interviewHe: [
        { qHe: "מהן שלוש שכבות-האבטחה ב-IBP?", aHe: "Authentication (SAP Cloud Identity), Authorization תפקודית (business role המורכב מ-business catalogs), ו-Data-level security (permission filters עם read/write criteria). שלושתן פועלות כ-AND." },
        { qHe: "מדוע business role לבדו אינו מספיק לאבטחה?", aHe: "business role פותח אפליקציות ופעולות, אך אינו מצמצם אילו שורות-נתונים נראות. ללא permission filter המשתמש יראה את כל הנתונים שהאפליקציה מציגה." },
      ],
      takeawaysHe: [
        "אבטחת IBP = שלוש שכבות: זהות, תפקיד תפקודי, סינון-נתונים.",
        "השכבות פועלות כ-AND — חוסר באחת חוסם.",
        "permission filters הם מה שהופך אבטחה ל'מי רואה אילו נתונים', לא רק 'מי נכנס'.",
      ],
      relatedHe: [
        { labelHe: "IBP · ניהול משתמשים (15.2)", href: "/library/sop/chapter-15/#sub-15.2" },
        { labelHe: "IBP · permission filters (15.4)", href: "/library/sop/chapter-15/#sub-15.4" },
      ],
    },
    // ============================================================ 15.2
    {
      id: "15.2",
      titleHe: "ניהול משתמשים (User Management)",
      titleEn: "User Management",
      execHe:
        "ניהול-המשתמשים ב-IBP מקשר בין זהות-המשתמש (ב-SAP Cloud Identity) לבין ההרשאות שלו במערכת. כאן מוקצים business roles ו-user groups, ונקבע מי המשתמש, מאיזה ארגון, ומה היקף-פעילותו. ניהול-משתמשים מסודר הוא הבסיס לתפעול-שוטף, לקליטת-עובדים (onboarding) ולביקורת.",
      beginnerHe:
        "כל אדם שעובד ב-IBP הוא 'משתמש'. ניהול-המשתמשים הוא המקום שבו פותחים לו חשבון, מחברים אותו לזהות שלו, ומחליטים מה התפקיד שלו (business role) ולאיזו קבוצה הוא שייך. זה כמו מחלקת-משאבי-אנוש של המערכת: מי נכנס, ומה מותר לו.",
      consultantHe:
        "ב-IBP המשתמש מנוהל בשני מקומות שמשתלבים: הזהות (אימות, סיסמה, SSO) ב-SAP Cloud Identity Services, וההרשאות ב-IBP עצמו דרך אפליקציית Manage Users. כל משתמש מקבל business role אחד או יותר, ויכול להשתייך ל-user groups. שיטה מומלצת: הקצאת-הרשאות דרך user groups ולא ישירות למשתמש — כך onboarding הופך להוספה לקבוצה בלבד. סנכרון משתמשים ניתן לבצע ידנית, בייבוא-CSV, או דרך SCIM/provisioning מ-Cloud Identity.",
      purposeHe:
        "המטרה: לנהל את מחזור-החיים של המשתמש — פתיחה, שינוי-תפקיד, השעיה ומחיקה — בצורה עקבית, מתועדת ובת-ביקורת, תוך הקצאת-הרשאות אחידה ומדרגית.",
      processExampleHe:
        "מתכנן חדש מצטרף: צוות-ה-IT פותח לו זהות ב-Cloud Identity, יוצר משתמש מקביל ב-IBP, ומשייך אותו ל-user group 'Demand Planners – North'. הקבוצה כבר נושאת את ה-business role ואת ה-permission filters המתאימים — כך המתכנן מקבל את כל ההרשאות הנכונות מהרגע הראשון, בלי הגדרה פרטנית.",
      scenarioHe:
        "בארגון: עובד-תכנון חדש באזור הצפון מתווסף ל-user group 'הארגון-North-Demand'. הקבוצה מעניקה role של Demand Planner + permission filter שמגביל ל-Region=North. עובד שעובר לאספקה ארצית — מוסר מהקבוצה הישנה ומתווסף ל-'הארגון-National-Supply'; ההרשאות מתחלפות אוטומטית.",
      navHe: [
        "SAP IBP Web UI ► Administration ► Manage Users",
        "SAP IBP Web UI ► Administration ► Manage Users ► Assign Business Roles",
        "SAP Cloud Identity Services ► Identity Authentication ► User Management",
      ],
      tables: ["IBP User Master", "User-Role Assignment", "User Group Assignment"],
      tcodes: ["Manage Users", "Import Users (CSV)"],
      fiori: ["Manage Users", "Manage User Groups"],
      configHe: [
        "פתיחת-משתמש: ידנית (Manage Users), ייבוא-CSV, או provisioning דרך Cloud Identity (SCIM).",
        "הקצאת business role למשתמש — אחד או יותר.",
        "שיוך ל-user groups לצורך הקצאת-הרשאות מדרגית.",
        "ניהול-סטטוס: Active / Inactive — השעיה ללא מחיקה לצורכי-ביקורת.",
      ],
      flow: [
        { he: "יצירת זהות", code: "Cloud Identity" },
        { he: "יצירת משתמש ב-IBP", code: "Manage Users" },
        { he: "שיוך ל-user group", note: "הקצאה מדרגית" },
        { he: "ירושת role + filters מהקבוצה" },
        { he: "כניסה ראשונה ובדיקה" },
      ],
      masterDataHe: [
        "User ID / Email — מקשר את משתמש-IBP לזהות ב-Cloud Identity.",
        "User group membership — נושא את ה-roles וה-filters בפועל.",
      ],
      mistakesHe: [
        "הקצאת roles ישירות לכל משתמש במקום דרך user groups — מתפוצץ בתחזוקה.",
        "מחיקת משתמש שעזב במקום השעיה — אובדן עקבות-ביקורת.",
        "חוסר-התאמה בין User ID ב-IBP לבין הזהות ב-Cloud Identity — כניסה נכשלת.",
      ],
      troubleshootHe: [
        "משתמש חדש לא נכנס ➔ הזהות לא נוצרה/לא-פעילה ב-Cloud Identity, או אי-התאמת User ID.",
        "משתמש נכנס אך ללא הרשאות ➔ לא שויך ל-user group או ל-business role.",
        "הרשאות לא התעדכנו אחרי העברה בין צוותים ➔ לא הוסר מ-user group הישנה.",
      ],
      bestPracticeHe: [
        "הקצה הרשאות דרך user groups, לא ישירות למשתמש.",
        "השתמש ב-provisioning אוטומטי מ-Cloud Identity במקום הזנה-ידנית בקנה-מידה.",
        "השעה (Inactive) במקום למחוק עובדים שעזבו, לשמירת היסטוריה.",
      ],
      interviewHe: [
        { qHe: "היכן מנוהלת הזהות (אימות) של משתמש IBP?", aHe: "ב-SAP Cloud Identity Services (Identity Authentication / IAS) — שם נמצאים הסיסמה, ה-SSO וה-MFA. ההרשאות עצמן מנוהלות ב-IBP דרך Manage Users." },
        { qHe: "מדוע עדיף להקצות הרשאות דרך user groups?", aHe: "כך onboarding/offboarding הופך להוספה/הסרה מקבוצה בלבד, ההרשאות אחידות בין חברי-הצוות, והתחזוקה מתבצעת במקום אחד במקום פר-משתמש." },
      ],
      takeawaysHe: [
        "המשתמש חי בשני מקומות: זהות ב-Cloud Identity, הרשאות ב-IBP.",
        "הקצאה דרך user groups מנצחת הקצאה ישירה.",
        "השעיה במקום מחיקה — לטובת ביקורת.",
      ],
      relatedHe: [
        { labelHe: "IBP · business roles (15.3)", href: "/library/sop/chapter-15/#sub-15.3" },
      ],
      children: [
        {
          id: "15.2.1",
          titleHe: "יצירת משתמשים (Creating Users)",
          titleEn: "Creating Users",
          execHe:
            "יצירת-משתמש היא הצעד הראשון בהענקת-גישה: פתיחת רשומת-משתמש ב-IBP, קישורה לזהות ב-Cloud Identity, והקצאת business role ראשוני. ניתן לבצע פרטנית, בייבוא-המוני, או באמצעות provisioning אוטומטי.",
          beginnerHe:
            "ליצור משתמש = לפתוח חשבון לאדם חדש. ממלאים שם, דוא\"ל, ומחליטים מה התפקיד שלו. אחרי השמירה הוא מקבל הזמנה להגדיר סיסמה ויכול להיכנס.",
          consultantHe:
            "באפליקציית Manage Users מזינים User ID, שם, ודוא\"ל התואם לזהות ב-Cloud Identity. בעת היצירה מקצים business role/ים ו/או משייכים ל-user groups. לקליטה-המונית משתמשים ב-Import (CSV) עם עמודות מוגדרות, או ב-SCIM provisioning שמסנכרן אוטומטית את המשתמשים מ-Cloud Identity. ה-User ID חייב להיות ייחודי ותואם בין שתי המערכות.",
          purposeHe:
            "המטרה: להעניק לעובד-חדש גישה תקינה ומאובטחת במהירות ובאחידות, עם תפקיד נכון מהרגע הראשון.",
          processExampleHe:
            "ה-IT מקבל בקשת-onboarding: פותח משתמש ב-Manage Users, מזין דוא\"ל ארגוני, משייך ל-user group של הצוות, ושומר. המשתמש מקבל מייל להגדרת-סיסמה ונכנס עם ההרשאות הנכונות.",
          scenarioHe:
            "בארגון קליטת 20 מתכננים חדשים נעשית בייבוא-CSV: כל שורה כוללת דוא\"ל, שם ו-user group ('הארגון-North-Demand'). כך כולם מקבלים את אותו role ואת אותו permission filter בלחיצה אחת.",
          navHe: [
            "SAP IBP Web UI ► Administration ► Manage Users ► Create",
            "SAP IBP Web UI ► Administration ► Manage Users ► Import",
          ],
          tables: ["IBP User Master", "User-Role Assignment"],
          tcodes: ["Manage Users", "Import Users (CSV)"],
          fiori: ["Manage Users"],
          configHe: [
            "Create: User ID (ייחודי), Name, Email (תואם Cloud Identity), Business Role / User Group.",
            "Import: קובץ-CSV עם עמודות-חובה; אימות-שגיאות לפני קליטה.",
            "Provisioning: SCIM מ-Cloud Identity ליצירה-אוטומטית.",
          ],
          flow: [
            { he: "הזנת פרטי-משתמש", code: "Manage Users" },
            { he: "קישור לזהות", note: "Email = Cloud Identity" },
            { he: "הקצאת role / קבוצה" },
            { he: "שמירה ומשלוח-הזמנה" },
            { he: "כניסה ראשונה" },
          ],
          mistakesHe: [
            "דוא\"ל לא-תואם בין IBP ל-Cloud Identity — המשתמש לא מצליח להתחבר.",
            "יצירת-משתמש ללא שיוך ל-role/group — חשבון 'ריק' ללא גישה.",
            "ייבוא-CSV עם עמודות חסרות/שגויות — קליטה נכשלת בשקט.",
          ],
          troubleshootHe: [
            "המשתמש לא קיבל הזמנה ➔ דוא\"ל שגוי או הזהות לא נוצרה ב-Cloud Identity.",
            "ייבוא נכשל ➔ פורמט-CSV/עמודות שגויים; בדוק את דוח-השגיאות.",
            "User ID כפול ➔ כבר קיים; בחר מזהה ייחודי.",
          ],
          bestPracticeHe: [
            "השתמש בכתובת-הדוא\"ל הארגונית כ-User ID לאחידות מול Cloud Identity.",
            "צור משתמשים תמיד עם שיוך לקבוצה — לעולם לא 'חשבון ריק'.",
            "אמת קובץ-ייבוא על קבוצה קטנה לפני קליטה-המונית.",
          ],
          interviewHe: [
            { qHe: "מהן הדרכים ליצור משתמשים ב-IBP?", aHe: "פרטנית ב-Manage Users, בייבוא-CSV, או באמצעות SCIM provisioning אוטומטי מ-SAP Cloud Identity." },
            { qHe: "מה חייב להתאים בין IBP ל-Cloud Identity?", aHe: "ה-User ID / כתובת-הדוא\"ל — אי-התאמה מונעת אימות וכניסה." },
          ],
          takeawaysHe: [
            "יצירת-משתמש מקשרת זהות (Cloud Identity) להרשאות (IBP).",
            "שלוש דרכים: פרטנית, ייבוא-CSV, provisioning.",
            "תמיד צור עם שיוך לקבוצה/role.",
          ],
        },
        {
          id: "15.2.2",
          titleHe: "קבוצות משתמשים (User Groups)",
          titleEn: "User Groups",
          execHe:
            "user groups הן מנגנון להקצאת-הרשאות מדרגית: במקום לשייך business roles ו-permission filters לכל משתמש בנפרד, משייכים אותם פעם אחת לקבוצה, וכל חבר-קבוצה יורש אותם. זהו עמוד-השדרה של תחזוקת-אבטחה בת-קיימא בקנה-מידה.",
          beginnerHe:
            "קבוצת-משתמשים היא 'רשימת-תפוצה של הרשאות'. מגדירים פעם אחת מה הקבוצה מקבלת (תפקיד + סינון-נתונים), ואז כל מי שמכניסים לקבוצה מקבל את זה אוטומטית. רוצים להוסיף עובד? פשוט מצרפים אותו לקבוצה הנכונה.",
          consultantHe:
            "user group מקבץ משתמשים ומאפשר הקצאת business roles ו-permission filters ברמת-הקבוצה. החברות בקבוצה היא מקור-ההרשאה בפועל. מומלץ למדל קבוצות לפי פרסונה+תחום (Demand-North, Supply-National, Executive-Viewer). משתמש יכול להשתייך לכמה קבוצות, וההרשאות מצטברות (union). העברה בין צוותים = החלפת-חברות בלבד. זה מצמצם דרסטית את שטח-התחזוקה ומפשט ביקורת.",
          purposeHe:
            "המטרה: לנהל הרשאות במקום אחד לכל פרסונה, להפוך onboarding/offboarding לפעולה של דקה, ולהבטיח אחידות מלאה בין חברי אותו צוות.",
          processExampleHe:
            "ארגון מגדיר 6 user groups לפי פרסונות. כל הרשאה — role ו-permission filter — מוצמדת לקבוצה. ב-30 העברות-עובדים בשנה, צוות-האבטחה רק מחליף חברות-קבוצה; אף הרשאה פרטנית לא נוגעת.",
          scenarioHe:
            "בארגון קיימות קבוצות: 'הארגון-North-Demand', 'הארגון-South-Demand', 'הארגון-National-Supply', 'הארגון-Exec-Viewer'. כל קבוצת-ביקוש-אזורית נושאת role של Demand Planner + permission filter לפי Region; קבוצת-ה-Viewer נושאת read criteria בלבד על כל האזורים.",
          navHe: [
            "SAP IBP Web UI ► Administration ► Manage User Groups",
            "SAP IBP Web UI ► Administration ► Manage User Groups ► Assign Roles & Filters",
          ],
          tables: ["User Group", "User Group Assignment", "Group-Role Mapping"],
          tcodes: ["Manage User Groups"],
          fiori: ["Manage User Groups", "Manage Users"],
          configHe: [
            "צור user group לכל פרסונה+תחום.",
            "הצמד לקבוצה business role/ים ו-permission filters.",
            "שייך משתמשים לקבוצה; ההרשאות נורשות.",
            "חברות מרובת-קבוצות = הרשאות מצטברות (union).",
          ],
          flow: [
            { he: "מידול קבוצות לפי פרסונה", code: "Manage User Groups" },
            { he: "הצמדת role + permission filter לקבוצה" },
            { he: "שיוך משתמשים" },
            { he: "ירושת הרשאות אוטומטית" },
          ],
          mistakesHe: [
            "יצירת קבוצות רבות מדי בגרנולריות מיותרת — קושי-ניהול.",
            "הקצאת חלק מההרשאות לקבוצה וחלק ישירות למשתמש — בלבול ומקור-אמת כפול.",
            "שכחת-הסרה מקבוצה ישנה בהעברה — הרשאות-יתר מצטברות.",
          ],
          troubleshootHe: [
            "חבר-קבוצה לא מקבל הרשאה צפויה ➔ ה-role/filter לא הוצמד לקבוצה.",
            "משתמש רואה יותר מהמצופה ➔ חבר בכמה קבוצות; ההרשאות מצטברות.",
            "הרשאה לא ירדה אחרי העברה ➔ לא הוסר מהקבוצה הישנה.",
          ],
          bestPracticeHe: [
            "מדל קבוצות לפי פרסונה+תחום, לא לפי אדם.",
            "רכז את כל ההרשאות בקבוצות — אפס הקצאות ישירות.",
            "סקור תקופתית חברות-קבוצות לזיהוי הרשאות-יתר.",
          ],
          interviewHe: [
            { qHe: "מה היתרון של user groups על-פני הקצאה ישירה?", aHe: "ניהול במקום אחד לכל פרסונה, אחידות בין חברי-צוות, ו-onboarding/offboarding מהיר — הוספה/הסרה מקבוצה במקום עריכת כל משתמש." },
            { qHe: "מה קורה כשמשתמש חבר בכמה user groups?", aHe: "ההרשאות מצטברות (union) — הוא מקבל את כל ה-roles וה-permission filters של כל הקבוצות שאליהן הוא שייך." },
          ],
          takeawaysHe: [
            "user group = מנגנון הקצאה מדרגית של roles ו-filters.",
            "חברות מרובת-קבוצות = הרשאות מצטברות.",
            "מדל לפי פרסונה; אפס הקצאות ישירות.",
          ],
          relatedHe: [
            { labelHe: "IBP · permission filters (15.4)", href: "/library/sop/chapter-15/#sub-15.4" },
          ],
        },
      ],
    },
    // ============================================================ 15.3
    {
      id: "15.3",
      titleHe: "ניהול business roles (Business Roles Management)",
      titleEn: "Business Roles Management",
      execHe:
        "business role הוא ליבת-ההרשאה התפקודית ב-IBP: הוא קובע אילו אפליקציות המשתמש רואה ואילו פעולות (display/maintain) מותרות לו. ה-role נבנה מ-business catalogs, וכל catalog מאגד קבוצת-יכולות הקשורה לתהליך-עסקי. ניהול נכון של roles הוא ההבדל בין מודל-אבטחה נקי לבין כאוס-הרשאות.",
      beginnerHe:
        "business role הוא 'התיק שאתה ממלא' במערכת — Demand Planner, Supply Planner, Viewer. כל role הוא צרור של 'יכולות' (business catalogs). בחירת ה-catalogs קובעת אילו מסכים ופעולות תקבל. במקום לבחור הרשאות אחת-אחת, בוחרים catalogs מוכנים.",
      consultantHe:
        "business role = אוסף של business catalogs. כל business catalog הוא יחידת-הרשאה אטומית המעניקה גישה לקבוצת-אפליקציות (planning views, dashboards, Excel add-in functions, jobs) ולפעולות עליהן. SAP מספקת catalogs סטנדרטיים (לדוגמה לתכנון-ביקוש, תכנון-אספקה, ניהול-מערכת); אפשר גם לבנות business roles מותאמים מצירופי-catalogs. ה-role עצמו אינו מצמצם נתונים — לכך נדרשים permission filters שמוצמדים לצדו. שינויי-role נכנסים לתוקף ב-re-login.",
      purposeHe:
        "המטרה: להעניק גישה תפקודית מדויקת לפי פרסונה — לא יותר אפליקציות ולא פחות — תוך שימוש-חוזר ב-business catalogs כדי לשמור על אחידות ועל הפרדת-תפקידים.",
      processExampleHe:
        "מימוש: צוות-האבטחה מגדיר role 'Demand Planner' ומרכיב אותו מ-catalogs של Demand Planning + Analytics (display) + Excel Planning. role 'Viewer' מורכב מ-catalogs של Analytics ב-display בלבד. כל role נבדק מול הפרסונה לוודא שהאפליקציות והפעולות מתאימות בדיוק.",
      scenarioHe:
        "בארגון: role 'הארגון Demand Planner' = catalogs לתכנון-ביקוש + ניתוחים (Excel + Web); role 'הארגון Supply Planner' = catalogs לתכנון-אספקה + מודל-הזמנה; role 'הארגון Sales Viewer' = catalog ניתוחים ב-display בלבד — מנהלי-מכירות רואים תחזיות אך לא נוגעים בהן.",
      navHe: [
        "SAP IBP Web UI ► Administration ► Manage Business Roles",
        "SAP IBP Web UI ► Administration ► Manage Business Roles ► Assign Business Catalogs",
        "SAP IBP Web UI ► Administration ► Manage Business Roles ► Assign Permission Filters",
      ],
      tables: ["Business Role", "Business Catalog", "Role-Catalog Mapping"],
      tcodes: ["Manage Business Roles", "Manage Business Catalogs"],
      fiori: ["Manage Business Roles", "Manage Business Catalogs", "Manage Permission Filters"],
      configHe: [
        "צור business role; תן לו שם-פרסונה ברור.",
        "הוסף business catalogs (סטנדרטיים של SAP או מותאמים) לפי האפליקציות הנדרשות.",
        "קבע פעולות לכל catalog — display מול maintain.",
        "הצמד permission filters ל-role לבקרת-נתונים (read/write).",
      ],
      flow: [
        { he: "יצירת business role", code: "Manage Business Roles" },
        { he: "בחירת business catalogs", note: "אפליקציות + פעולות" },
        { he: "קביעת display/maintain" },
        { he: "הצמדת permission filters" },
        { he: "הקצאה ל-user group/משתמש" },
      ],
      masterDataHe: [
        "business catalog = יחידת-ההרשאה האטומית; ה-role הוא אוסף שלהן.",
        "permission filter מוצמד ל-role ומשלים את בקרת-הנתונים.",
      ],
      mistakesHe: [
        "ערבוב catalogs רבים מדי ב-role אחד — פוגע בהפרדת-תפקידים.",
        "מתן maintain במקום display ל-Viewers — חשיפת-עריכה לא-רצויה.",
        "הנחה ש-role לבדו מאבטח נתונים — בלי permission filter הוא חושף הכל.",
      ],
      troubleshootHe: [
        "המשתמש לא רואה אפליקציה צפויה ➔ ה-business catalog המתאים חסר ב-role.",
        "המשתמש יכול לערוך כשאמור רק לצפות ➔ catalog ב-maintain במקום display.",
        "המשתמש רואה את כל הנתונים ➔ לא הוצמד permission filter ל-role.",
      ],
      bestPracticeHe: [
        "בנה roles צרים לפי פרסונה תוך שימוש-חוזר ב-catalogs סטנדרטיים.",
        "הפרד display מ-maintain בבירור לפי תפקיד.",
        "תעד את מטריצת role × catalogs × filters לביקורת.",
      ],
      interviewHe: [
        { qHe: "ממה מורכב business role ב-IBP?", aHe: "מ-business catalogs — כל catalog מעניק גישה לקבוצת-אפליקציות ופעולות (display/maintain). ה-role הוא האוסף שמוקצה למשתמש או לקבוצה." },
        { qHe: "האם business role מאבטח נתונים?", aHe: "לא. ה-role שולט באפליקציות ובפעולות בלבד. בקרת-הנתונים (אילו שורות נראות/ניתנות-לשינוי) נעשית ב-permission filters שמוצמדים ל-role." },
      ],
      takeawaysHe: [
        "business role = אוסף business catalogs = הרשאה תפקודית.",
        "catalog קובע אפליקציות + פעולות (display/maintain).",
        "ה-role אינו מאבטח נתונים — לכך נדרש permission filter.",
      ],
      relatedHe: [
        { labelHe: "IBP · permission filters (15.4)", href: "/library/sop/chapter-15/#sub-15.4" },
        { labelHe: "IBP · ניהול משתמשים (15.2)", href: "/library/sop/chapter-15/#sub-15.2" },
      ],
    },
    // ============================================================ 15.4
    {
      id: "15.4",
      titleHe: "מסנני הרשאות (Permission Filters)",
      titleEn: "Permission Filters",
      execHe:
        "permission filter הוא מנגנון בקרת-הנתונים של IBP: הוא מצמצם אילו שורות-נתונים משתמש רואה (read criteria) ואילו מותר לו לשנות (write criteria), לפי ערכי-מאפיינים של Master Data (Product, Location, Customer, Region). זהו הרכיב שהופך אבטחה מ'מי נכנס לאפליקציה' ל'מי רואה ומשנה אילו נתונים'.",
      beginnerHe:
        "permission filter הוא 'מסננת על הנתונים'. גם אם שני מתכננים פותחים את אותה אפליקציה, המסננת קובעת שכל אחד יראה רק את האזור או המוצרים שלו. בנוסף היא קובעת מה מותר לו רק לקרוא, ומה מותר גם לשנות.",
      consultantHe:
        "permission filter מוגדר על-בסיס Master Data attributes ומכיל שני סוגי-קריטריונים: read criteria (אילו רשומות נראות) ו-write criteria (אילו ניתנות-לשינוי). write הוא בהכרח תת-קבוצה של read — אי-אפשר לשנות מה שלא רואים. ה-filter מוצמד ל-business role או דרך user group, ומסונן ברמת key figure data לפי Planning Area. ניתן להגדיר criteria על מספר attributes יחד (AND בין-attributes, IN/range בתוך attribute). השפעה: אכיפה אוטומטית בכל planning view, dashboard, Excel add-in ו-job.",
      purposeHe:
        "המטרה: לאכוף ש'כל מתכנן רואה רק את שלו' — להגן על נתונים רגישים, לאפשר הפרדת-אזורים/מוצרים, ולתת הרשאת-שינוי מצומצמת בתוך טווח-הקריאה.",
      processExampleHe:
        "מתכנן-ביקוש אזורי מקבל permission filter עם read criteria: Region=North וכן write criteria: Region=North AND ProductFamily=Beverages. כך הוא רואה את כל נתוני-הצפון, אך משנה תחזיות רק למשפחת-המשקאות — לא לחטיפים שמנוהלים בידי מתכנן אחר.",
      scenarioHe:
        "בארגון: מתכנן-הצפון — read: Region=North, write: Region=North. מתכנן-האספקה הארצי — read: כל ה-Regions, write: רק key figures של אספקה. מנהל-מכירות — read: כל ה-Regions, ללא write כלל (Viewer). כל זה דרך permission filters שמוצמדים ל-user groups.",
      navHe: [
        "SAP IBP Web UI ► Administration ► Manage Permission Filters",
        "SAP IBP Web UI ► Administration ► Manage Permission Filters ► Read Criteria",
        "SAP IBP Web UI ► Administration ► Manage Permission Filters ► Write Criteria",
      ],
      tables: ["Permission Filter", "Master Data Attribute", "Planning Area", "Key Figure"],
      tcodes: ["Manage Permission Filters", "Assign Permission Filters"],
      fiori: ["Manage Permission Filters", "Manage Business Roles"],
      configHe: [
        "הגדר permission filter על Planning Area ועל Master Data attributes.",
        "read criteria: ערכי-מאפיינים שקובעים אילו רשומות נראות.",
        "write criteria: תת-קבוצה של read — אילו ניתנות-לשינוי.",
        "הצמד את ה-filter ל-business role / user group.",
      ],
      flow: [
        { he: "בחירת Planning Area + attributes", code: "Manage Permission Filters" },
        { he: "הגדרת read criteria", note: "מה נראה" },
        { he: "הגדרת write criteria", note: "מה ניתן-לשינוי (⊆ read)" },
        { he: "הצמדה ל-role/group" },
        { he: "אכיפה בכל view/Excel/job" },
      ],
      masterDataHe: [
        "criteria מבוססים על Master Data attributes (Product, Location, Customer, Region, ProductFamily).",
        "write ⊆ read תמיד — אי-אפשר לשנות מה שאינו נראה.",
      ],
      mistakesHe: [
        "הגדרת write רחב יותר מ-read — חוסר-עקביות; write נחתך ל-read בפועל.",
        "סינון על attribute שגוי או לא-מאוכלס ב-Master Data — המתכנן לא רואה דבר.",
        "שכחת-הצמדה של ה-filter ל-role — אין בקרת-נתונים בכלל.",
      ],
      troubleshootHe: [
        "המתכנן לא רואה נתונים כלל ➔ read criteria צר/שגוי, או attribute לא-מאוכלס.",
        "המתכנן רואה הכל ➔ ה-filter לא הוצמד ל-role/group.",
        "המתכנן רואה אך לא יכול לשנות באזורו ➔ write criteria חסר/צר מדי.",
      ],
      bestPracticeHe: [
        "תכנן read ו-write יחד; ודא write ⊆ read.",
        "סנן על attributes יציבים ומאוכלסים במלואם ב-Master Data.",
        "הצמד filters דרך user groups לאחידות וניהול-מרכזי.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין read ל-write criteria?", aHe: "read קובע אילו רשומות-נתונים המשתמש רואה; write קובע אילו מתוכן מותר לו לשנות. write הוא תמיד תת-קבוצה של read." },
        { qHe: "על מה מבוססים permission filter criteria?", aHe: "על Master Data attributes (כגון Product, Location, Region) בתוך Planning Area — מסננים שורות-נתונים לפי ערכי-המאפיינים." },
      ],
      takeawaysHe: [
        "permission filter = בקרת-הנתונים של IBP.",
        "read = מה נראה; write = מה ניתן-לשינוי; write ⊆ read.",
        "מבוסס Master Data attributes; נאכף בכל view/Excel/job.",
      ],
      relatedHe: [
        { labelHe: "IBP · business roles (15.3)", href: "/library/sop/chapter-15/#sub-15.3" },
      ],
      children: [
        {
          id: "15.4.1",
          titleHe: "קריטריוני קריאה (Read Criteria)",
          titleEn: "Read Criteria",
          execHe:
            "read criteria קובעים אילו שורות-נתונים המשתמש רואה בכל planning view, dashboard ו-Excel add-in. הם מגדירים את 'חלון-הראייה' של המתכנן לפי ערכי-מאפיינים — לבד מהם המשתמש לא יראה דבר רלוונטי.",
          beginnerHe:
            "read criteria הם הרשימה של 'מה מותר לך לראות'. למשל Region=North פירושו שתראה רק נתוני-הצפון. כל מה שמחוץ לרשימה — נסתר ממך.",
          consultantHe:
            "read criteria מוגדרים על Master Data attributes בתוך permission filter. אפשר לציין ערך בודד, רשימה (IN), או טווח. שילוב של כמה attributes פועל כ-AND (Region=North AND ProductType=Finished). read הוא הבסיס — write לעולם לא יחרוג ממנו. read criteria ריקים = ללא-גישה לנתונים (לא 'גישה-להכל').",
          purposeHe:
            "המטרה: להגדיר במדויק את היקף-הנתונים הגלוי לכל פרסונה, להגן על מידע רגיש ולמקד את המתכנן באחריותו.",
          processExampleHe:
            "מתכנן-הצפון מקבל read: Region=North. בפתיחת planning view הוא רואה רק SKUs ומיקומי-הצפון; נתוני-הדרום אינם מופיעים כלל, גם לא באגרגציה.",
          scenarioHe:
            "בארגון: read של מתכנן-הצפון = Region=North; read של אנליסט-הביקוש הארצי = כל ה-Regions; read של מנהל-מותג = ProductBrand=Example Product בכל האזורים.",
          navHe: [
            "SAP IBP Web UI ► Administration ► Manage Permission Filters ► Read Criteria",
          ],
          tables: ["Permission Filter", "Master Data Attribute"],
          tcodes: ["Manage Permission Filters"],
          fiori: ["Manage Permission Filters"],
          configHe: [
            "בחר attribute (Region/Product/Location) וקבע ערכים: single / IN-list / range.",
            "שלב כמה attributes — הצירוף פועל כ-AND.",
            "read ריק = ללא-גישה; הקפד למלא.",
          ],
          flow: [
            { he: "בחירת attribute", code: "Read Criteria" },
            { he: "קביעת ערכים (IN/range)" },
            { he: "צירוף attributes (AND)" },
            { he: "אכיפה ב-views/Excel" },
          ],
          mistakesHe: [
            "השארת read ריק בכוונה לתת 'גישה-להכל' — בפועל חוסם הכל.",
            "סינון על attribute לא-מאוכלס — רשומות 'נופלות' מהתצוגה.",
            "ערכים שגויים/מיושנים שלא תואמים ל-Master Data העדכני.",
          ],
          troubleshootHe: [
            "המשתמש לא רואה כלום ➔ read ריק או attribute שגוי/לא-מאוכלס.",
            "חסרים נתונים חלקיים ➔ ערך באוסף ה-read חסר (IN-list לא שלם).",
          ],
          bestPracticeHe: [
            "מלא read במפורש — לעולם אל תסתמך על ריק כ'הכל'.",
            "סנן על attributes יציבים ומאוכלסים.",
            "סקור התאמה ל-Master Data לאחר עדכוני-מבנה.",
          ],
          interviewHe: [
            { qHe: "מה קורה כש-read criteria ריקים?", aHe: "המשתמש אינו מקבל גישה לנתונים — read ריק פירושו ללא-גישה, לא גישה-להכל." },
            { qHe: "כיצד משלבים כמה attributes ב-read?", aHe: "הצירוף פועל כ-AND — כל התנאים חייבים להתקיים (למשל Region=North AND ProductType=Finished)." },
          ],
          takeawaysHe: [
            "read criteria = חלון-הראייה של המתכנן.",
            "צירוף attributes = AND; ריק = ללא-גישה.",
            "write לעולם לא יחרוג מ-read.",
          ],
        },
        {
          id: "15.4.2",
          titleHe: "קריטריוני כתיבה (Write Criteria)",
          titleEn: "Write Criteria",
          execHe:
            "write criteria קובעים אילו שורות-נתונים מתוך אלו שהמשתמש רואה מותר לו גם לשנות. הם תמיד תת-קבוצה של read criteria — מימוש עקרון 'רואה רחב, משנה צר' — ומאפשרים הרשאת-עריכה ממוקדת תוך שמירה על שאר הנתונים לקריאה-בלבד.",
          beginnerHe:
            "write criteria הם הרשימה של 'מה מותר לך לשנות'. ייתכן שתראה נתונים של כמה אזורים (read), אבל מותר לך לערוך רק את שלך (write). מה שלא ברשימת ה-write — מוצג לך אך נעול לעריכה.",
          consultantHe:
            "write criteria מוגדרים על אותם Master Data attributes ומגבילים את הרשאת-השינוי על key figures. write ⊆ read תמיד; אם write רחב מ-read, החיתוך ל-read גובר בפועל. write ריק = read-only (Viewer). שילוב attributes פועל כ-AND. הרשאת-write נאכפת ברמת key figure editable בכל view/Excel — תאים מחוץ ל-write מוצגים אך לא-ניתנים-לעריכה.",
          purposeHe:
            "המטרה: לאפשר שיתוף-נתונים רחב לצורכי-נראות, תוך הגבלת-השינוי לאחריות-המתכנן בלבד — איזון בין שקיפות לבקרה.",
          processExampleHe:
            "אנליסט-ביקוש ארצי: read = כל ה-Regions (נראות מלאה לתיאום), write = Region=North בלבד (האזור באחריותו). הוא רואה את כל המדינה אך עורך רק את הצפון; שאר התאים נעולים.",
          scenarioHe:
            "בארגון: מתכנן-אספקה — read: כל המפעלים, write: רק key figures של תכנית-ייצור (לא תחזית-ביקוש). מנהל-מכירות (Viewer) — write ריק לחלוטין: רואה הכל, משנה כלום.",
          navHe: [
            "SAP IBP Web UI ► Administration ► Manage Permission Filters ► Write Criteria",
          ],
          tables: ["Permission Filter", "Master Data Attribute", "Key Figure"],
          tcodes: ["Manage Permission Filters"],
          fiori: ["Manage Permission Filters"],
          configHe: [
            "הגדר write על אותם attributes, כתת-קבוצה של read.",
            "write ריק = read-only (Viewer).",
            "צירוף attributes פועל כ-AND.",
            "אכיפה ברמת key figure editable בכל view/Excel.",
          ],
          flow: [
            { he: "הגדרת read תחילה", code: "Read Criteria" },
            { he: "צמצום ל-write (⊆ read)", code: "Write Criteria" },
            { he: "תאים מחוץ ל-write — נעולים" },
            { he: "אכיפה ב-Excel/Web" },
          ],
          mistakesHe: [
            "write רחב מ-read — חוסר-עקביות; בפועל נחתך ל-read.",
            "מתן write לא-מכוון ל-Viewers במקום read-only.",
            "שכחת write לאזור-האחריות — המתכנן רואה אך לא יכול לשנות.",
          ],
          troubleshootHe: [
            "המשתמש לא יכול לשנות באזורו ➔ write חסר/צר מדי.",
            "Viewer מצליח לערוך ➔ write לא רוקן (אמור להיות read-only).",
            "write 'לא תופס' באזור מסוים ➔ הוא מחוץ ל-read (write ⊆ read).",
          ],
          bestPracticeHe: [
            "הגדר write כתת-קבוצה מפורשת של read.",
            "ל-Viewers — השאר write ריק (read-only).",
            "יישם 'רואה רחב, משנה צר' לתיאום בין-אזורי בטוח.",
          ],
          interviewHe: [
            { qHe: "מה היחס בין write ל-read criteria?", aHe: "write הוא תמיד תת-קבוצה של read — אי-אפשר לשנות מה שלא נראה. אם write הוגדר רחב מ-read, הוא נחתך ל-read בפועל." },
            { qHe: "כיצד מגדירים משתמש Viewer ב-IBP?", aHe: "באמצעות permission filter עם read criteria בלבד ו-write ריק — המשתמש רואה נתונים אך אינו יכול לשנותם." },
          ],
          takeawaysHe: [
            "write criteria = מה מותר לשנות, ⊆ read.",
            "write ריק = read-only (Viewer).",
            "מימוש 'רואה רחב, משנה צר'.",
          ],
        },
        {
          id: "15.4.3",
          titleHe: "מסנני הרשאות בשלב התהליך (Permission Filters in the Process Stage)",
          titleEn: "Permission Filters in the Process Stage",
          execHe:
            "permission filters יכולים להיות תלויי-שלב בתהליך-התכנון (process stage) ב-IBP: אותו משתמש מקבל הרשאות-נתונים שונות לפי השלב הפעיל בתהליך ה-S&OP. כך נאכפת מעורבות נכונה בכל שלב — מי משנה מה, ומתי — בתוך ה-process management של IBP.",
          beginnerHe:
            "תהליך ה-S&OP מורכב משלבים: איסוף-ביקוש, סקירת-אספקה, ישיבת-תיאום, אישור-הנהלה. permission filter בשלב-התהליך אומר: 'בשלב הביקוש מתכנן-הביקוש יכול לערוך; בשלב האספקה הוא רק רואה'. ההרשאה נעה עם התהליך.",
          consultantHe:
            "ב-IBP Process Management כל תהליך מחולק ל-process steps/stages עם בעלים, מועדים ומשימות. ניתן לקשור הרשאות-נתונים לשלב כך שהרשאת-write על key figures נפתחת רק בשלב הרלוונטי לאותה פרסונה ונסגרת בשלבים אחרים. המנגנון מבטיח data governance זמני — לדוגמה 'הקפאת' תחזית-הביקוש לאחר שלב-האיסוף, כך ששינויים מאוחרים נחסמים. זה משלב את permission filters (15.4) עם ה-process/collaboration layer.",
          purposeHe:
            "המטרה: לאכוף משמעת-תהליך — לוודא שכל פרסונה תורמת רק בשלב שלה, למנוע שינויים מחוץ-לחלון, ולשמור על שלמות-המספרים לאורך מחזור ה-S&OP.",
          processExampleHe:
            "מחזור S&OP חודשי: בשלב 1 (Demand Review) מתכנן-הביקוש עם write על key figure של תחזית; בשלב 2 (Supply Review) ה-write שלו נסגר (read-only) ומתכנן-האספקה מקבל write על תכנית-הייצור; בשלב 4 (Exec Approval) כל ה-write ננעל פרט למאשר.",
          scenarioHe:
            "בארגון: בשלב 'Demand Consensus' מתכנני-האזורים עורכים תחזיות; משננעל השלב, ב-'Supply Review' רק צוות-האספקה הארצי עורך תכניות-ייצור, והאזורים עוברים ל-read-only — כך התחזית 'מוקפאת' ומספר-אחד-אמין מוזן לאספקה.",
          navHe: [
            "SAP IBP Web UI ► Process Management ► Manage Processes",
            "SAP IBP Web UI ► Process Management ► Process Steps ► Assign Permissions",
            "SAP IBP Web UI ► Administration ► Manage Permission Filters",
          ],
          tables: ["Process Definition", "Process Step", "Permission Filter", "Key Figure"],
          tcodes: ["Manage Processes", "Manage Permission Filters"],
          fiori: ["Manage Processes", "Manage Permission Filters"],
          configHe: [
            "הגדר תהליך ב-Process Management עם stages/steps ובעלים.",
            "קשר הרשאות-נתונים (write על key figures) לשלב הרלוונטי.",
            "בשלבים אחרים — צמצם ל-read-only ('הקפאה').",
            "תאם בין ה-process steps לבין ה-permission filters של הפרסונות.",
          ],
          flow: [
            { he: "הגדרת process stages", code: "Manage Processes" },
            { he: "שיוך בעלים לכל שלב" },
            { he: "פתיחת write לשלב הרלוונטי" },
            { he: "נעילה (read-only) בשלבים אחרים" },
            { he: "מעבר-שלב = החלפת-הרשאות" },
          ],
          masterDataHe: [
            "Process Definition + Process Steps נושאים את לוגיקת-העיתוי.",
            "ההרשאה הזמנית נאכפת על key figures רלוונטיים לכל שלב.",
          ],
          mistakesHe: [
            "אי-נעילת write לאחר השלב — שינויים מאוחרים פוגעים בשלמות-התכנית.",
            "חוסר-תיאום בין process steps ל-permission filters — פרסונה 'תקועה' ללא הרשאה בשלב שלה.",
            "הגדרת-שלבים מורכבת מדי — קשה לתפעול ולמעקב.",
          ],
          troubleshootHe: [
            "פרסונה לא יכולה לערוך בשלב שלה ➔ ההרשאה לא נקשרה לשלב הנכון.",
            "שינויים נכנסים אחרי 'הקפאה' ➔ write לא ננעל במעבר-שלב.",
            "מעבר-שלב לא משנה הרשאות ➔ ה-process step לא מקושר ל-permission filters.",
          ],
          bestPracticeHe: [
            "סנכרן במדויק את ה-process stages עם הרשאות-ה-write של כל פרסונה.",
            "נעל ('הקפא') נתונים בסיום כל שלב לשמירת מספר-אחד-אמין.",
            "שמור מבנה-תהליך פשוט וברור לתפעול חוזר חודשי.",
          ],
          interviewHe: [
            { qHe: "מהם permission filters בשלב-התהליך?", aHe: "מנגנון שמתאם בין הרשאות-הנתונים (בעיקר write) לבין השלב הפעיל ב-IBP Process Management — כך הרשאת-עריכה נפתחת רק בשלב הרלוונטי לפרסונה ונסגרת בשאר." },
            { qHe: "מדוע 'מקפיאים' נתונים בין שלבים?", aHe: "כדי לשמור על שלמות-התכנית ומספר-אחד-אמין: לאחר שלב-הביקוש התחזית ננעלת לקריאה-בלבד, כך שלב-האספקה עובד על בסיס יציב ללא שינויים מאוחרים." },
          ],
          takeawaysHe: [
            "הרשאות יכולות להיות תלויות-שלב ב-Process Management.",
            "write נפתח בשלב הרלוונטי ונסגר ('הקפאה') בשאר.",
            "מאחד permission filters עם ה-process/collaboration layer.",
          ],
          relatedHe: [
            { labelHe: "IBP · קריטריוני כתיבה (15.4.2)", href: "/library/sop/chapter-15/#sub-15.4.2" },
          ],
        },
      ],
    },
    // ============================================================ 15.5
    {
      id: "15.5",
      titleHe: "ניהול תשתית (Infrastructure Management)",
      titleEn: "Infrastructure Management",
      execHe:
        "ניהול-התשתית ב-IBP מתייחס לרכיבי-הענן התומכים באבטחה ובתפעול: SAP Cloud Identity Services לאימות, תצורת SSO/SAML, ניהול-tenants (Production/Test), חיבוריות מאובטחת (Cloud Connector / SAP Cloud Integration), ומסגרת-הביקורת והניטור. בענן, חלק מהתשתית מנוהל בידי SAP וחלק באחריות-הלקוח (Shared Responsibility).",
      beginnerHe:
        "התשתית היא 'הקומה התחתונה' שעליה רצה כל המערכת — איך מתחברים בבטחה, איך מחברים את IBP למערכות אחרות, ואיך שומרים שהכל מאובטח ומנוטר. ב-IBP בענן, SAP מתחזקת את השרתים, ואתם מגדירים את הזהויות, החיבורים והמדיניות.",
      consultantHe:
        "רכיבי-מפתח: (1) SAP Cloud Identity Services — IAS לאימות (SAML/SSO/MFA) ו-IPS ל-provisioning. (2) Tenants — הפרדה בין Production ל-Test, עם ניהול-טרנספורטים בין-tenant. (3) Integration — SAP Cloud Integration (CPI) ו/או Cloud Connector לחיבור מאובטח ל-ECC/S4 ולמקורות-נתונים, כולל SDI/SAP Data Services לטעינת Master/Transaction data. (4) Audit & Monitoring — application logs, read-access logging, ו-audit trails. מודל Shared Responsibility: SAP אחראית לפלטפורמה ולזמינות; הלקוח אחראי לזהויות, להרשאות (roles/filters) ולתצורת-החיבורים.",
      purposeHe:
        "המטרה: להבטיח שהפלטפורמה מאובטחת, מחוברת-נכון למערכות-המקור, מופרדת בין סביבות, ומנוטרת — כך שמודל-האבטחה הלוגי (roles/filters) נשען על תשתית יציבה ובת-ביקורת.",
      processExampleHe:
        "מימוש: צוות-הבסיס מגדיר SSO מול ה-IdP הארגוני ב-Cloud Identity, מקים tenant נפרד ל-Test, מגדיר CPI/Cloud Connector לטעינת Master Data מ-S/4HANA, ומפעיל audit logging. רק לאחר שהתשתית מוכנה מקצים את ה-roles וה-permission filters.",
      scenarioHe:
        "בארגון הגלובלי: SSO מול Azure AD דרך Cloud Identity; tenant-Production ל-IBP החי ו-tenant-Test לבדיקות; CPI טוען SKUs, מפעלים ולקוחות מ-S/4HANA מדי לילה; audit logs מתעדים מי ניגש לנתוני-תחזית רגישים.",
      navHe: [
        "SAP Cloud Identity Services ► Identity Authentication ► Applications & SSO",
        "SAP IBP ► Communication Management / Integration (SDI · CPI · Cloud Connector)",
        "SAP IBP ► Administration ► Application Logs / Audit",
      ],
      tables: ["Cloud Identity Tenant", "Communication Arrangement", "Integration Flow", "Audit Log"],
      tcodes: ["Identity Authentication Admin", "Cloud Integration (CPI)", "Application Logs"],
      fiori: ["Application Logs", "Data Integration Jobs"],
      configHe: [
        "Authentication: SSO/SAML ו-MFA ב-SAP Cloud Identity Services (IAS); provisioning ב-IPS.",
        "Tenants: הפרדת Production/Test וניהול-טרנספורטים בין-tenant.",
        "Integration: SAP Cloud Integration (CPI) / Cloud Connector / SDI לטעינת נתונים.",
        "Audit & Monitoring: application logs, read-access logging, audit trails.",
      ],
      flow: [
        { he: "הגדרת SSO/MFA", code: "Cloud Identity" },
        { he: "הקמת tenants (Prod/Test)" },
        { he: "תצורת Integration", code: "CPI / Cloud Connector" },
        { he: "טעינת Master/Transaction data", code: "SDI" },
        { he: "הפעלת audit & monitoring" },
      ],
      masterDataHe: [
        "Integration flows טוענים Master Data (Product/Location/Customer) — בסיס ל-permission filters.",
        "איכות-הטעינה משפיעה ישירות על דיוק בקרת-הנתונים.",
      ],
      mistakesHe: [
        "בלבול בין סביבות Production ל-Test — שינויי-תצורה במקום הלא-נכון.",
        "התעלמות מ-audit/read-access logging — חוסר-עקבות לביקורת.",
        "הזנחת איכות-טעינת Master Data — permission filters מסננים על נתונים שגויים.",
      ],
      troubleshootHe: [
        "כניסה נכשלת לכל המשתמשים ➔ תקלת SSO/SAML ב-Cloud Identity.",
        "נתונים לא מתעדכנים ➔ כשל ב-CPI/Cloud Connector או ב-SDI job.",
        "permission filter מסנן שגוי ➔ Master Data לא-מעודכן מהאינטגרציה.",
      ],
      bestPracticeHe: [
        "הפרד Production מ-Test, ובדוק שינויים תחילה ב-Test.",
        "הבן את מודל ה-Shared Responsibility — דע מה באחריותך מול SAP.",
        "הפעל audit ו-read-access logging לנתונים רגישים מהיום הראשון.",
      ],
      interviewHe: [
        { qHe: "מהו מודל ה-Shared Responsibility ב-IBP בענן?", aHe: "SAP אחראית לפלטפורמה, לזמינות ולתחזוקת-התשתית; הלקוח אחראי לזהויות, להרשאות (business roles ו-permission filters) ולתצורת-החיבורים והנתונים." },
        { qHe: "אילו רכיבים מחברים IBP למערכות-המקור?", aHe: "SAP Cloud Integration (CPI), Cloud Connector ו-SDI/SAP Data Services — לטעינת Master Data ו-Transaction data מ-ECC/S4 ומקורות נוספים, בצורה מאובטחת." },
      ],
      takeawaysHe: [
        "התשתית נושאת אימות, סביבות, אינטגרציה וניטור.",
        "Cloud Identity = שכבת-האימות; CPI/SDI = שכבת-הנתונים.",
        "Shared Responsibility: SAP לפלטפורמה, הלקוח לזהויות/הרשאות/חיבורים.",
      ],
      relatedHe: [
        { labelHe: "IBP · ניהול אבטחה (15.1)", href: "/library/sop/chapter-15/#sub-15.1" },
      ],
    },
    // ============================================================ 15.6
    {
      id: "15.6",
      titleHe: "סיכום (Summary)",
      titleEn: "Summary",
      execHe:
        "פרק זה בנה את מודל-האבטחה המלא של SAP IBP: זהות ב-SAP Cloud Identity, ניהול-משתמשים ו-user groups, business roles הבנויים מ-business catalogs, ובקרת-נתונים דרך permission filters עם read/write criteria — כולל הרשאות תלויות-שלב ב-process stage, על תשתית-ענן מאובטחת. יחד, הרכיבים מבטיחים שכל מתכנן רואה ומשנה בדיוק את חלקו.",
      beginnerHe:
        "סיכום בפשטות: כדי לעבוד ב-IBP צריך זהות (להיכנס), business role (אילו מסכים), ו-permission filter (אילו נתונים). user groups מקלות על הניהול, ו-process stage קובע מתי מותר לערוך. כל אלה רצים על תשתית-ענן שמנוהלת חלקה בידי SAP.",
      consultantHe:
        "המודל השכבתי: Authentication (Cloud Identity) → Authorization (business role = business catalogs) → Data security (permission filter, read ⊇ write) → Temporal governance (permission filters ב-process stage) → Infrastructure (tenants, CPI/SDI, audit). העקרונות: least privilege, הקצאה דרך user groups, write ⊆ read, ו'הקפאת'-נתונים בין שלבים. כל אלה יחד מספקים אבטחה תפקודית, נתונית וזמנית — בת-ביקורת ותואמת-רגולציה.",
      purposeHe:
        "המטרה של הפרק: להקנות שליטה מקצה-לקצה במודל-האבטחה של IBP — מתכנון-פרסונות ועד אכיפה תפעולית — כך שמימוש יהיה מאובטח, אחיד ובר-תחזוקה.",
      processExampleHe:
        "מימוש-לדוגמה מלא: הגדרת זהויות ו-SSO → יצירת user groups לפי פרסונה → בניית business roles מ-catalogs → הצמדת permission filters (read/write) → קישור הרשאות ל-process stages → טעינת Master Data דרך CPI → בדיקת-קבלה לכל פרסונה ובכל שלב.",
      scenarioHe:
        "בארגון: מתכנן-צפון (role Demand Planner, filter Region=North, עורך בשלב-הביקוש), מתכנן-אספקה ארצי (read כל-הארץ, write תכנית-ייצור בשלב-האספקה), מנהל-מכירות (Viewer, read בלבד) — כולם מנוהלים דרך user groups, על tenant-Production עם נתונים מ-S/4HANA. דוגמה חיה לכל מה שנלמד.",
      navHe: [
        "SAP IBP Web UI ► Administration ► Manage Users / User Groups / Business Roles / Permission Filters",
        "SAP IBP Web UI ► Process Management ► Manage Processes",
        "SAP Cloud Identity Services ► Identity Authentication",
      ],
      tables: ["Business Role", "Business Catalog", "Permission Filter", "User Group", "Process Step"],
      tcodes: ["Manage Users", "Manage Business Roles", "Manage Permission Filters", "Manage Processes"],
      fiori: ["Manage Users", "Manage User Groups", "Manage Business Roles", "Manage Permission Filters", "Manage Processes"],
      configHe: [
        "סדר-מימוש מומלץ: זהויות → user groups → business roles → permission filters → process stages → תשתית/אינטגרציה.",
        "עקרונות: least privilege, הקצאה דרך קבוצות, write ⊆ read.",
        "תיעוד: מטריצת persona × catalogs × filters × stages כמקור-אמת.",
      ],
      flow: [
        { he: "זהות + SSO", code: "Cloud Identity" },
        { he: "user groups לפי פרסונה" },
        { he: "business roles מ-catalogs" },
        { he: "permission filters (read/write)" },
        { he: "הרשאות תלויות-שלב", code: "Process" },
        { he: "תשתית + audit", code: "CPI/SDI" },
      ],
      mistakesHe: [
        "טיפול ב-roles בלי permission filters — חשיפת-נתונים.",
        "הקצאות ישירות במקום דרך user groups — תחזוקה בלתי-אפשרית.",
        "אי-נעילת נתונים בין שלבים — פגיעה בשלמות-התכנית.",
      ],
      troubleshootHe: [
        "בעיית-אבטחה לא-מובנת ➔ בדוק את שלוש השכבות בנפרד: זהות, role, filter.",
        "התנהגות-הרשאה משתנה בין שלבים ➔ permission filters תלויי-process-stage.",
        "פער בין Test ל-Production ➔ הבדלי-tenant/טרנספורט בתשתית.",
      ],
      bestPracticeHe: [
        "תכנן את כל השכבות יחד מהיום הראשון.",
        "אמץ least privilege, user groups, ו-write ⊆ read כעקרונות-קבועים.",
        "שמור מטריצת-פרסונות מתועדת וסקור אותה תקופתית.",
      ],
      interviewHe: [
        { qHe: "סכם את מודל-האבטחה של IBP בשלוש שכבות.", aHe: "Authentication ב-SAP Cloud Identity, Authorization תפקודית דרך business roles הבנויים מ-business catalogs, ו-Data security דרך permission filters עם read/write criteria — בתוספת governance זמני ב-process stages." },
        { qHe: "מהו סדר-המימוש המומלץ לאבטחת IBP?", aHe: "תחילה זהויות ו-SSO, אחר-כך user groups, business roles מ-catalogs, permission filters, קישור ל-process stages, ולבסוף תשתית ואינטגרציה — עם בדיקת-קבלה לכל פרסונה ושלב." },
      ],
      takeawaysHe: [
        "אבטחת IBP = זהות + role תפקודי + סינון-נתונים + governance זמני, על תשתית-ענן.",
        "עקרונות: least privilege, user groups, write ⊆ read, הקפאה בין-שלבים.",
        "מימוש מאובטח דורש תכנון-שכבות משולב ובדיקת-קבלה פר-פרסונה.",
      ],
      relatedHe: [
        { labelHe: "IBP · ניהול אבטחה (15.1)", href: "/library/sop/chapter-15/#sub-15.1" },
        { labelHe: "IBP · permission filters בשלב-התהליך (15.4.3)", href: "/library/sop/chapter-15/#sub-15.4.3" },
      ],
    },
  ],
};
