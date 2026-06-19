import type { TextbookChapter } from "./types";

export const CH7: TextbookChapter = {
  n: 7,
  titleHe: "מוניטור התראות (Alert Monitor)",
  titleEn: "The Alert Monitor",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה על ה-Alert Monitor של PP/DS — הכלי המרכזי לניהול-לפי-חריגות (Management by Exception) בתכנון מתקדם. כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים: שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון-תקלות, שיטות-מומלצות, שאלות-ראיון ומסקנות-מפתח. הרעיון המרכזי: במקום שמתכנן יסרוק ידנית אלפי הזמנות, ה-Alert Monitor (/SAPAPO/AMON1) מציף אוטומטית רק את החריגות — מחסור (shortage), פיגור (backlog), עומס-יתר על משאב (resource overload), חריגת-תאריך — ומנתב את המתכנן ישירות לפעולה. המטרה: לשלוט בנושא ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 7.1
    {
      id: "7.1",
      titleHe: "פרופילי התראות (Alert Profiles)",
      titleEn: "Alert Profiles",
      execHe:
        "פרופיל-התראות (alert profile) הוא ההגדרה שקובעת אילו התראות יוצגו למתכנן, באילו ערכי-סף, ובאיזו חומרה. הוא לב ה-Alert Monitor: בלי פרופיל מוגדר היטב המתכנן יוצף ברעש או יחמיץ חריגות קריטיות. הפרופיל הוא שהופך את מוניטור-ההתראות מרשימה גנרית לכלי-עבודה ממוקד לתפקיד ולאחריות של כל מתכנן.",
      beginnerHe:
        "דמיין מערכת-אזעקה לבית עם רגישות מתכווננת: אתה מחליט על מה היא תצפצף (פריצה? עשן? דלת פתוחה?) וכמה חזק. פרופיל-התראות עושה בדיוק זאת לתכנון — אתה בוחר אילו בעיות מעניינות אותך (מחסור, פיגור, עומס) ומאיזה גודל הן \"שוות התראה\". כך כל מתכנן רואה רק את ה\"אזעקות\" הרלוונטיות אליו, ולא את של כל המפעל.",
      consultantHe:
        "ב-PP/DS קיימים שני סוגי פרופילים: alert profile (פרופיל-התראות בודד, מוגדר ב-/SAPAPO/AMON1 או ב-Customizing) ו-overall profile (פרופיל-על המאגד מספר alert profiles מתחומים שונים — PP/DS, SNP, ATP, TP/VS). הפרופיל מגדיר Alert Types (למשל Date alerts, Quantity/shortage alerts, Resource overload), ערכי-סף, חומרה (Information/Warning/Error) ואובייקטים מנוטרים. הוא נשמר ברמת-משתמש או כפרופיל-משותף בלקוח, ומאוחסן בטבלאות /SAPAPO/AMOPROF ונלווֹות. שים לב: ההתראות עצמן יכולות להיות database alerts (נשמרות ב-DB, נוצרות ברקע) או dynamic alerts (מחושבות בזמן-אמת בעת פתיחת המוניטור).",
      purposeHe:
        "המטרה: לאפשר ניהול-לפי-חריגות. במקום סקירה ידנית של כל ההזמנות, המתכנן מגדיר פעם אחת אילו חריגות חשובות לו, וה-Alert Monitor מסנן עבורו את כל ה\"רעש\". כך מצטמצם זמן-התגובה לבעיות-תכנון אמיתיות ומשתפר ניצול-המשאבים.",
      processExampleHe:
        "מתכנן אחראי על קבוצת-מוצרים מגדיר alert profile: התראת-מחסור כש-Available Quantity שלילי, התראת-פיגור כש-Order End אחרי Requirement Date, והתראת עומס-משאב כשניצול > 100%. הוא משייך אותו ל-overall profile האישי שלו. בכל בוקר הוא פותח את /SAPAPO/AMON1, רואה 12 התראות במקום 4,000 הזמנות, ופותר אותן לפי חומרה.",
      cbcHe:
        "ב-CBC (מפעל-בקבוק קוקה-קולה) מתכנן קווי-המילוי מגדיר alert profile המתמקד בשלוש חריגות: מחסור-תרכיז (shortage) לפני ריצת-מילוי, פיגור (backlog) של פק\"ע משקה מאחורי תאריך-המשלוח לרשת-קמעונאות, ועומס-יתר (resource overload) על קו-המילוי בעונת-השיא (קיץ). רק שלוש קבוצות-התראה אלו מוצגות לו — לא התראות-איכות או תחזוקה.",
      navHe: [
        "Advanced Planning and Optimization ► Supply Chain Monitoring ► Alert Monitor ► Maintain Alert Profiles",
        "Easy Access ► Advanced Planning and Optimization ► Supply Chain Monitoring ► Current Settings ► Alert Monitor (/SAPAPO/AMON1)",
        "SPRO ► Advanced Planning and Optimization ► Supply Chain Monitoring ► Alert Monitor ► Settings for Alert Determination",
      ],
      tables: ["/SAPAPO/AMOPROF", "/SAPAPO/ALERTDB", "/SAPAPO/AMOOBJ", "/SAPAPO/AMOTYPE"],
      tcodes: ["/SAPAPO/AMON1", "/SAPAPO/AMON_SETTING", "/SAPAPO/AMON_REORG"],
      fiori: ["F0287", "F2660"],
      configHe: [
        "Alert Profile: הגדר שם-פרופיל, בחר Application (PP/DS), ושייך Alert Types רלוונטיים (Date / Quantity / Resource).",
        "ערכי-סף (Thresholds): לכל Alert Type הגדר Lower/Upper limit וחומרה (Information / Warning / Error).",
        "Selection: הגדר אילו אובייקטים מנוטרים — מוצרים, משאבים, מיקומים, model/planning version.",
        "Alert Storage: בחר database alerts (רקע) או dynamic alerts (זמן-אמת) לכל סוג.",
      ],
      flow: [
        { he: "בחר Application", code: "PP/DS", note: "הקשר-התכנון" },
        { he: "הוסף Alert Types", code: "Date/Qty/Resource" },
        { he: "קבע ערכי-סף + חומרה", code: "Threshold" },
        { he: "הגדר אובייקטים מנוטרים", code: "Selection" },
        { he: "שמור פרופיל", code: "/SAPAPO/AMOPROF" },
        { he: "שייך ל-overall profile", code: "7.1.3" },
      ],
      masterDataHe: [
        "פרופיל נשמר ברמת-משתמש או כ-shared profile בלקוח (/SAPAPO/AMOPROF).",
        "האובייקטים המנוטרים נשענים על Model/Planning Version פעילים (000 = active).",
      ],
      mistakesHe: [
        "ערכי-סף רחבים מדי ➔ הצפת-התראות (\"רעש\") והמתכנן מתעלם מהכול.",
        "ערכי-סף צרים מדי ➔ החמצת חריגות אמיתיות.",
        "הגדרת database alerts בלי תזמון job ברקע ➔ המוניטור ריק.",
        "שכחת שיוך הפרופיל ל-overall profile ➔ הפרופיל קיים אך לא נטען.",
      ],
      troubleshootHe: [
        "המוניטור ריק לחלוטין ➔ בדוק שהפרופיל משויך ל-overall profile וש-job-הרקע רץ (לגבי DB alerts).",
        "יותר מדי התראות ➔ הצר ערכי-סף או צמצם את היקף האובייקטים ב-Selection.",
        "התראה לא מופיעה למרות בעיה ➔ Alert Type לא נכלל בפרופיל או חומרה מתחת לסף.",
        "התראות לא מתעדכנות ➔ dynamic מול database — בדוק מתי נוצרו ה-DB alerts לאחרונה.",
      ],
      bestPracticeHe: [
        "בנה פרופיל-לכל-תפקיד (role-based) ולא פרופיל-ענק אחד.",
        "התחל מסף שמרני, ואז הרחב/הצר לפי משוב מהמתכננים.",
        "השתמש ב-database alerts לחריגות-מסה (רקע) וב-dynamic ל-drill-down אינטראקטיבי.",
        "תעד את משמעות כל Alert Type וסף לארגון — כדי שהמתכנן יבין למה הוא רואה התראה.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין alert profile ל-overall profile?", aHe: "alert profile מגדיר התראות לתחום בודד (Alert Types + thresholds); overall profile מאגד מספר alert profiles מתחומים שונים (PP/DS, SNP, ATP) לחבילה אחת שנטענת ב-Alert Monitor." },
        { qHe: "מה ההבדל בין database alerts ל-dynamic alerts?", aHe: "database alerts נוצרות ונשמרות ב-DB ע\"י job-רקע ונקראות מהר; dynamic alerts מחושבות בזמן-אמת בעת פתיחת המוניטור — עדכניות יותר אך כבדות." },
        { qHe: "מדוע ניהול-לפי-חריגות חשוב בתכנון?", aHe: "במערכת עם אלפי הזמנות אי-אפשר לסרוק הכול ידנית; הפרופיל מציף רק את החריגות, מקצר זמן-תגובה וממקד את המתכנן בבעיות אמיתיות." },
      ],
      takeawaysHe: [
        "alert profile = אילו התראות, באילו ספים, באיזו חומרה.",
        "overall profile מאגד כמה alert profiles לחבילה שנטענת במוניטור.",
        "database alerts (רקע) מול dynamic alerts (זמן-אמת).",
        "פרופיל טוב = ניהול-לפי-חריגות; פרופיל גרוע = רעש או החמצה.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · יצירת overall profile (7.1.3)", href: "/library/ppds/chapter-07/#sub-7.1.3" },
        { labelHe: "PP/DS · ניטור התראות (7.2)", href: "/library/ppds/chapter-07/#sub-7.2" },
        { labelHe: "אובייקט · /SAPAPO/AMOPROF", href: "/library/ppds/object/AMOPROF/" },
      ],
      children: [
        {
          id: "7.1.1",
          titleHe: "הפעלה וגישה למוניטור ההתראות",
          titleEn: "Activate and Access the Alert Monitor",
          execHe:
            "לפני שימוש יש להפעיל את ה-Alert Monitor: לוודא שדטרמינציית-ההתראות (alert determination) פעילה עבור Application = PP/DS, ולגשת לכלי דרך /SAPAPO/AMON1. ללא הפעלה תקינה — אין התראות, גם אם קיימות בעיות-תכנון.",
          beginnerHe:
            "זה השלב של \"להדליק את מערכת-האזעקה ולמצוא את לוח-הבקרה\". קודם מוודאים שהמערכת בכלל מחשבת התראות ל-PP/DS, ואז פותחים את המסך הנכון (/SAPAPO/AMON1) שבו רואים אותן. בלי ה\"הדלקה\" הזו הלוח יישאר ריק.",
          consultantHe:
            "ההפעלה כוללת: (1) ב-SPRO תחת Supply Chain Monitoring ► Alert Monitor ► Settings for Alert Determination — להפעיל את ה-Application Object Types הרלוונטיים ל-PP/DS; (2) לוודא Planning Version פעילה (000); (3) גישה דרך הטרנזקציה /SAPAPO/AMON1 (Easy Access או Current Settings). אפשר גם להגדיר את ה-monitor כ-default screen למתכנן. ה-determination יכול לרוץ on-the-fly (dynamic) או דרך job (DB alerts) עם הדוח /SAPAPO/AMON_REORG לתחזוקה.",
          purposeHe:
            "להבטיח שהתשתית לחישוב-התראות פעילה ושהמתכנן יכול לגשת לכלי בערוץ קבוע — תנאי-סף לכל ניטור.",
          processExampleHe:
            "יועץ-מימוש מפעיל ב-SPRO את Alert Determination ל-PP/DS, בודק שגרסת-התכנון 000 קיימת, ונכנס ל-/SAPAPO/AMON1. המסך נפתח עם overall profile ברירת-מחדל; המתכנן יכול כעת לבחור פרופיל ולהריץ.",
          cbcHe:
            "ב-CBC במהלך ה-go-live היועץ מפעיל alert determination ל-PP/DS, מצמיד את /SAPAPO/AMON1 כמסך-פתיחה למתכנני-המילוי, ומוודא שגרסת-התכנון של מפעל-הבקבוק פעילה — אחרת התראות-המחסור לא יחושבו.",
          navHe: [
            "SPRO ► Advanced Planning and Optimization ► Supply Chain Monitoring ► Alert Monitor ► Settings for Alert Determination ► Activate Alert Types",
            "Easy Access ► APO ► Supply Chain Monitoring ► Current Settings ► Alert Monitor (/SAPAPO/AMON1)",
          ],
          tables: ["/SAPAPO/AMOTYPE", "/SAPAPO/AMOPROF", "TVARVC"],
          tcodes: ["/SAPAPO/AMON1", "/SAPAPO/AMON_SETTING", "SPRO"],
          fiori: ["F0287"],
          configHe: [
            "הפעל Application Object Types ל-PP/DS ב-Settings for Alert Determination.",
            "ודא Planning Version 000 (active) קיימת ופעילה.",
            "הגדר /SAPAPO/AMON1 כ-default screen למתכנן (אופציונלי, דרך user role).",
          ],
          mistakesHe: [
            "כניסה ל-/SAPAPO/AMON1 בלי הפעלת alert determination ➔ מסך ריק.",
            "עבודה מול גרסת-תכנון לא-פעילה ➔ אין התראות.",
          ],
          troubleshootHe: [
            "המסך ריק מיד אחרי כניסה ➔ alert determination לא הופעל ל-PP/DS, או גרסת-תכנון שגויה.",
            "שגיאת-הרשאה ב-/SAPAPO/AMON1 ➔ חסר object הרשאה ל-Alert Monitor למשתמש.",
          ],
          bestPracticeHe: [
            "הפעל רק את ה-Alert Types הנדרשים — פחות חישוב, פחות רעש.",
            "צמד את המוניטור כמסך-פתיחה למתכננים כדי לעודד שימוש יומיומי.",
          ],
          interviewHe: [
            { qHe: "מהי הטרנזקציה לגישה ל-Alert Monitor?", aHe: "/SAPAPO/AMON1 — דרך Easy Access או Current Settings." },
            { qHe: "מה צריך להפעיל לפני שיופיעו התראות?", aHe: "alert determination ל-Application PP/DS ב-SPRO, וגרסת-תכנון פעילה." },
          ],
          takeawaysHe: [
            "הפעל alert determination ל-PP/DS לפני השימוש.",
            "הגישה היא דרך /SAPAPO/AMON1.",
            "גרסת-תכנון פעילה היא תנאי-סף.",
          ],
          relatedHe: [{ labelHe: "PP/DS · יצירת פרופיל (7.1.2)", href: "/library/ppds/chapter-07/#sub-7.1.2" }],
        },
        {
          id: "7.1.2",
          titleHe: "יצירת פרופיל התראות",
          titleEn: "Create Alert Profile",
          execHe:
            "יצירת alert profile היא המעשה שמגדיר אילו התראות יראה המתכנן. בוחרים Alert Types, מגדירים ערכי-סף וחומרה, ומגדירים את היקף-האובייקטים. זהו הצעד שהופך את הכלי מגנרי לרלוונטי לתפקיד מסוים.",
          beginnerHe:
            "כאן \"מכווננים את האזעקה\": בוחרים על אילו בעיות לצפצף (מחסור, פיגור, עומס) ומאיזה גודל. נותנים לפרופיל שם, מסמנים את סוגי-ההתראות הרצויים, וקובעים ספים. בסיום נשמר פרופיל אישי שאפשר לטעון שוב ושוב.",
          consultantHe:
            "ב-/SAPAPO/AMON1 → Settings, או ב-Customizing, יוצרים alert profile: שם, Application = PP/DS, ובוחרים Alert Types מקטלוג (למשל \"Shortage\", \"Backlog/Delay\", \"Resource Overload\", \"Finite scheduling violated\"). לכל סוג מגדירים threshold וחומרה. ב-Selection מגדירים מוצרים/משאבים/מיקומים ו-planning version. אפשר לסמן Alert Type כ-DB alert (נוצר ב-job) או dynamic. הפרופיל נשמר ב-/SAPAPO/AMOPROF ומשויך אחר-כך ל-overall profile.",
          purposeHe:
            "להתאים את היקף-ההתראות בדיוק לאחריות המתכנן — לא יותר ולא פחות — וכך לאפשר ניהול-לפי-חריגות יעיל.",
          processExampleHe:
            "מתכנן יוצר פרופיל \"FILLING_PLANNER\": מסמן Shortage (סף: כמות-זמינה שלילית, חומרה Error), Backlog (סף: יום-אחד פיגור, Warning), Resource Overload (סף: 100%, Warning). שומר ומשייך ל-overall profile האישי.",
          cbcHe:
            "ב-CBC נוצר פרופיל \"BEV_LINE\": Shortage על תרכיז ו-CO2, Backlog על פק\"ע-משקה מול תאריך-משלוח, Resource Overload על קו-המילוי. ספים מותאמים לעונת-השיא: בקיץ סף-העומס יורד ל-95% כדי להתריע מוקדם.",
          navHe: [
            "/SAPAPO/AMON1 ► Settings ► Maintain Alert Profile ► Create",
            "SPRO ► APO ► Supply Chain Monitoring ► Alert Monitor ► Define Alert Profiles",
          ],
          tables: ["/SAPAPO/AMOPROF", "/SAPAPO/AMOTYPE", "/SAPAPO/AMOOBJ"],
          tcodes: ["/SAPAPO/AMON1", "/SAPAPO/AMON_SETTING"],
          fiori: ["F0287"],
          configHe: [
            "תן שם-פרופיל ובחר Application = PP/DS.",
            "סמן Alert Types: Shortage / Backlog / Resource Overload / Date alerts.",
            "לכל סוג: Threshold (Lower/Upper) + Severity (Info/Warning/Error).",
            "Selection: מוצרים, משאבים, מיקומים, planning version; סמן DB או dynamic.",
          ],
          flow: [
            { he: "Create profile + name", code: "Settings" },
            { he: "בחר Alert Types", code: "Catalog" },
            { he: "קבע ספים + חומרה", code: "Threshold" },
            { he: "הגדר Selection", code: "Objects" },
            { he: "שמור", code: "/SAPAPO/AMOPROF" },
          ],
          mistakesHe: [
            "בחירת כל ה-Alert Types \"ליתר ביטחון\" ➔ הצפה.",
            "אי-הגדרת Selection ➔ הפרופיל סורק את כל המוצרים, איטי ורועש.",
          ],
          troubleshootHe: [
            "פרופיל לא נשמר ➔ Application או Alert Type לא נבחר.",
            "פרופיל מציג התראות לא-רלוונטיות ➔ Selection רחב מדי.",
          ],
          bestPracticeHe: [
            "תן שמות-פרופיל מדברים (לפי תפקיד/אזור).",
            "הגדר Selection מצומצם ככל האפשר לביצועים ולמיקוד.",
          ],
          interviewHe: [
            { qHe: "אילו רכיבים מגדירים ביצירת alert profile?", aHe: "Application, Alert Types, thresholds + severity, ו-Selection (אובייקטים + planning version)." },
            { qHe: "כיצד מחליטים על ערך-סף?", aHe: "מאזנים בין הצפה (סף נמוך) להחמצה (סף גבוה); מתחילים שמרני ומכווננים לפי משוב." },
          ],
          takeawaysHe: [
            "הפרופיל מתאים התראות לתפקיד.",
            "ספים + חומרה קובעים מה \"שווה התראה\".",
            "Selection ממוקד = ביצועים ומיקוד.",
          ],
          relatedHe: [{ labelHe: "PP/DS · פרופילי התראות (7.1)", href: "/library/ppds/chapter-07/#sub-7.1" }],
        },
        {
          id: "7.1.3",
          titleHe: "יצירת פרופיל-על (Overall Profile)",
          titleEn: "Create Overall Profile",
          execHe:
            "overall profile הוא פרופיל-העל המאגד מספר alert profiles מתחומים שונים לחבילה אחת שנטענת ב-Alert Monitor. הוא מאפשר למתכנן לראות במסך אחד התראות PP/DS לצד התראות SNP/ATP — תמונה אינטגרטיבית של שרשרת-האספקה.",
          beginnerHe:
            "אם ה-alert profile הוא \"חיישן בודד\", ה-overall profile הוא \"לוח-הבקרה\" שמאסף כמה חיישנים יחד. במקום לפתוח כל פרופיל בנפרד, מגדירים פרופיל-על אחד שמושך את כולם, ואותו טוענים במוניטור.",
          consultantHe:
            "ב-/SAPAPO/AMON1 יוצרים overall profile ומשייכים אליו alert profiles (PP/DS, SNP, ATP, TP/VS). הוא נשמר ברמת-משתמש (user-specific) או כ-shared. הוא קובע גם הגדרות-תצוגה כלליות. ב-Alert Monitor המתכנן בוחר overall profile, והכלי מריץ את כל ה-alert profiles המאוגדים. ניתן להגדיר overall profile ברירת-מחדל למשתמש דרך הגדרות-המשתמש.",
          purposeHe:
            "לתת למתכנן מבט-על אחד מאוחד על כל סוגי-החריגות הרלוונטיים אליו, ולחסוך החלפה ידנית בין פרופילים.",
          processExampleHe:
            "מתכנן יוצר overall profile \"PLANNER_DAILY\" ומשייך אליו את alert profile של PP/DS (Shortage/Backlog/Overload) וגם alert profile של ATP. בבוקר הוא טוען פרופיל-על אחד ורואה את כל התמונה.",
          cbcHe:
            "ב-CBC מתכנן-המילוי מגדיר overall profile \"CBC_DAILY\" המאגד את alert profile של PP/DS (מחסור-תרכיז, פיגור-משקה, עומס-קו) יחד עם פרופיל-ATP לזמינות-משלוח לרשתות — מבט אחד מהמחסן ועד הקו.",
          navHe: [
            "/SAPAPO/AMON1 ► Settings ► Maintain Overall Profile ► Create",
            "SPRO ► APO ► Supply Chain Monitoring ► Alert Monitor ► Define Overall Alert Profile",
          ],
          tables: ["/SAPAPO/AMOPROF", "/SAPAPO/AMOOVPROF", "/SAPAPO/AMOOBJ"],
          tcodes: ["/SAPAPO/AMON1", "/SAPAPO/AMON_SETTING"],
          fiori: ["F0287"],
          configHe: [
            "צור overall profile עם שם ושייך אליו alert profiles קיימים.",
            "קבע אם הפרופיל user-specific או shared.",
            "הגדר תצוגה כללית (קיבוץ, מיון, עמודות) לכל הפרופיל.",
            "הגדר כ-default overall profile למשתמש (אופציונלי).",
          ],
          flow: [
            { he: "Create overall profile", code: "Settings" },
            { he: "שייך alert profiles", code: "PP/DS+ATP" },
            { he: "קבע תצוגה כללית", code: "Display" },
            { he: "שמור + ברירת-מחדל", code: "/SAPAPO/AMOOVPROF" },
            { he: "טען במוניטור", code: "/SAPAPO/AMON1" },
          ],
          mistakesHe: [
            "יצירת alert profile בלי לשייכו ל-overall profile ➔ הוא לא נטען לעולם.",
            "ערבוב יותר מדי פרופילים בפרופיל-על אחד ➔ מסך עמוס.",
          ],
          troubleshootHe: [
            "alert profile לא מופיע במוניטור ➔ לא משויך ל-overall profile הנטען.",
            "המתכנן רואה התראות של אחר ➔ נטען overall profile shared במקום אישי.",
          ],
          bestPracticeHe: [
            "צור overall profile לכל תפקיד/משמרת.",
            "השאר פרופיל-על רזה — אגד רק תחומים רלוונטיים למתכנן.",
          ],
          interviewHe: [
            { qHe: "מה מאגד overall profile?", aHe: "מספר alert profiles מתחומים שונים (PP/DS, SNP, ATP) לחבילה אחת שנטענת במוניטור." },
            { qHe: "למה צריך overall profile אם יש alert profile?", aHe: "alert profile לבדו לא נטען ישירות; ה-overall profile הוא הקונטיינר שהמוניטור מריץ, ומאפשר מבט-על מאוחד." },
          ],
          takeawaysHe: [
            "overall profile = קונטיינר שמאגד alert profiles.",
            "ה-Alert Monitor טוען overall profile, לא פרופיל בודד.",
            "מאפשר מבט-על מאוחד על כל סוגי-החריגות.",
          ],
          relatedHe: [
            { labelHe: "PP/DS · יצירת פרופיל התראות (7.1.2)", href: "/library/ppds/chapter-07/#sub-7.1.2" },
            { labelHe: "PP/DS · ניטור מהמוניטור (7.2.1)", href: "/library/ppds/chapter-07/#sub-7.2.1" },
          ],
        },
        {
          id: "7.1.4",
          titleHe: "העברת פרופילים (Transport)",
          titleEn: "Transport Profiles",
          execHe:
            "פרופילי-התראות שהוגדרו בסביבת-פיתוח/בדיקה צריכים לעבור לסביבת-הייצור באופן מבוקר דרך Transport. ההעברה מבטיחה שהפרופילים הסטנדרטיים (shared) זהים בכל הסביבות ולא נוצרים ידנית מחדש בכל מערכת.",
          beginnerHe:
            "כשמגדירים משהו ב-SAP במערכת-הבדיקה, צריך \"לשלוח\" אותו למערכת-האמת — זה ה-Transport. כך הפרופיל שבנינו פעם אחת יופיע זהה גם בייצור, בלי להגדיר מחדש ובלי טעויות-העתקה.",
          consultantHe:
            "פרופילים user-specific לא עוברים ב-Transport (הם נתוני-משתמש); רק shared/standard profiles נשמרים ב-Customizing ועוברים בבקשת-Transport. בכלי ה-Alert Monitor קיימת פונקציית Transport (או דרך ה-Customizing ב-SPRO) שאוספת את הגדרת-הפרופיל ל-request. יש לוודא תלות בין מודל/גרסת-תכנון (שאינם בהכרח עוברים יחד) — ולעיתים יש להתאים את ה-Selection לאובייקטים הקיימים בסביבת-היעד.",
          purposeHe:
            "להבטיח עקביות-הגדרות בין סביבות, להימנע מהזנה-ידנית חוזרת ולשמר ממשל-שינויים (change management).",
          processExampleHe:
            "היועץ מגדיר shared overall profile בפיתוח, מפעיל Transport, ומשחרר את ה-request. ב-QA וב-Production הפרופיל מופיע זהה; המתכננים רק בוחרים אותו.",
          cbcHe:
            "ב-CBC ה-shared profile \"BEV_LINE\" נבנה ב-DEV, נבדק ב-QA דרך Transport, ועובר ל-PRD לפני ה-go-live. כל מתכנני-המילוי בכל המפעלים מקבלים פרופיל זהה ללא הזנה ידנית.",
          navHe: [
            "SPRO ► APO ► Supply Chain Monitoring ► Alert Monitor ► Define Alert Profiles ► Transport",
            "/SAPAPO/AMON1 ► Settings ► (Profile) ► Transport",
          ],
          tables: ["/SAPAPO/AMOPROF", "/SAPAPO/AMOOVPROF", "E070", "E071"],
          tcodes: ["/SAPAPO/AMON1", "SE10", "SE09"],
          fiori: ["F0287"],
          configHe: [
            "ודא שהפרופיל מוגדר כ-shared (לא user-specific) כדי שיהיה ניתן-להעברה.",
            "הפעל פונקציית Transport ושייך ל-Customizing request.",
            "ודא קיום אובייקטי-ה-Selection (מוצרים/משאבים/גרסה) בסביבת-היעד.",
            "שחרר ופרוס את ה-request דרך STMS לפי נתיב-ההעברה.",
          ],
          mistakesHe: [
            "ניסיון להעביר פרופיל user-specific ➔ לא נתפס ב-Transport.",
            "העברת פרופיל בלי שהאובייקטים (מוצר/משאב/גרסה) קיימים ביעד ➔ Selection ריק.",
          ],
          troubleshootHe: [
            "הפרופיל לא הגיע ליעד ➔ נשמר user-specific או ה-request לא שוחרר/נפרס.",
            "הפרופיל הגיע אך ריק ➔ אובייקטי-ה-Selection חסרים בסביבת-היעד.",
          ],
          bestPracticeHe: [
            "החזק פרופילים-סטנדרטיים כ-shared ותחת Transport; השאר רק התאמות אישיות user-specific.",
            "בדוק כל פרופיל ב-QA לפני פריסה ל-PRD.",
          ],
          interviewHe: [
            { qHe: "אילו פרופילים ניתן להעביר ב-Transport?", aHe: "רק shared/standard profiles; פרופילים user-specific הם נתוני-משתמש ואינם עוברים." },
            { qHe: "מה יש לוודא לפני העברת פרופיל לסביבת-ייצור?", aHe: "שהאובייקטים שב-Selection (מוצרים/משאבים/גרסת-תכנון) קיימים גם בסביבת-היעד, אחרת ה-Selection יישאר ריק." },
          ],
          takeawaysHe: [
            "רק shared profiles עוברים ב-Transport.",
            "Transport מבטיח עקביות בין סביבות וממשל-שינויים.",
            "ודא קיום אובייקטי-Selection ביעד.",
          ],
          relatedHe: [{ labelHe: "PP/DS · יצירת overall profile (7.1.3)", href: "/library/ppds/chapter-07/#sub-7.1.3" }],
        },
      ],
    },
    // ============================================================ 7.2
    {
      id: "7.2",
      titleHe: "ניטור התראות (Alert Monitoring)",
      titleEn: "Alert Monitoring",
      execHe:
        "ניטור-התראות הוא השימוש היומיומי בכלי: צריכת ההתראות וטיפול בהן. ההתראות נצרכות בשלוש דרכים — מתוך ה-Alert Monitor המרכזי, כ-DB alerts הנוצרות ברקע, ובהקשר מתוך יישומי-PP/DS עצמם (כמו ה-Product View או ה-DS Board). היכולת לעבור מהתראה ישירות לאובייקט ולפעולה היא מה שהופך את הכלי לאפקטיבי.",
      beginnerHe:
        "עד כה כיוונּו את האזעקה; כעת מקשיבים לה ומגיבים. יש שלוש דרכים \"לשמוע\": לפתוח את לוח-ההתראות המרכזי, לקבל התראות שחושבו בלילה ברקע, או לראות נורות-אזהרה בתוך מסכי-העבודה הרגילים. בכל מקרה, לחיצה על התראה לוקחת אותך ישר לבעיה כדי לתקן.",
      consultantHe:
        "ניטור מתבצע על database alerts (נקראות מהר, נוצרות ב-job) ו/או dynamic alerts (מחושבות בפתיחה). ב-/SAPAPO/AMON1 רואים את ה-overall profile עם קיבוץ לפי חומרה/סוג/אובייקט, ויש navigation ישיר ל-Product View (/SAPAPO/RRP3), ל-DS Planning Board (/SAPAPO/CDPS0) או ל-Detailed Scheduling. בנוסף, יישומי-PP/DS מציגים alert icons מובְנים (context alerts). חשוב לתחזק את ה-DB alerts (reorg) כדי שלא יציגו מצב מיושן.",
      purposeHe:
        "להפוך התראה לפעולה במהירות: לזהות חריגה, לקפוץ לאובייקט הרלוונטי, ולתקן (לתזמן-מחדש, להזיז, לפצל, לשנות-מקור) — מינימום זמן בין גילוי לתיקון.",
      processExampleHe:
        "מתכנן פותח /SAPAPO/AMON1, רואה 8 התראות-מחסור באדום. הוא לוחץ על אחת, נופל ישירות ל-Product View של אותו מוצר, מזהה הזמנה-מתוכננת מאוחרת, מקדים אותה, וההתראה נעלמת ברענון.",
      cbcHe:
        "ב-CBC המתכנן רואה התראת resource overload על קו-מילוי-2 בשיא-הקיץ; הוא קופץ ל-DS Board, מעביר חלק מהפק\"ע לקו-3 שפנוי, והעומס יורד מתחת לסף — ההתראה נסגרת.",
      navHe: [
        "Easy Access ► APO ► Supply Chain Monitoring ► Current Settings ► Alert Monitor (/SAPAPO/AMON1)",
        "SPRO ► APO ► Supply Chain Monitoring ► Alert Monitor ► Settings for Background Alert Determination",
      ],
      tables: ["/SAPAPO/ALERTDB", "/SAPAPO/AMOPROF", "/SAPAPO/AMOOBJ"],
      tcodes: ["/SAPAPO/AMON1", "/SAPAPO/RRP3", "/SAPAPO/CDPS0", "/SAPAPO/BACKGROUND_SCHED"],
      fiori: ["F0287", "F2660"],
      configHe: [
        "הגדר אילו Alert Types נוצרים ברקע (DB) ואילו דינמית.",
        "הגדר navigation targets מהתראה (Product View / DS Board).",
        "תזמן job-רקע לחישוב DB alerts ו-job ל-reorg.",
      ],
      flow: [
        { he: "פתח Alert Monitor", code: "/SAPAPO/AMON1" },
        { he: "סקור לפי חומרה", code: "Severity" },
        { he: "לחץ על התראה", code: "Navigate" },
        { he: "תקן באובייקט", code: "RRP3/CDPS0" },
        { he: "רענן — ההתראה נסגרת", code: "Refresh" },
      ],
      masterDataHe: [
        "DB alerts נשמרות ב-/SAPAPO/ALERTDB ומתוחזקות ב-reorg.",
        "ה-navigation נשען על מוצר/משאב/גרסה תקפים.",
      ],
      mistakesHe: [
        "התבססות על DB alerts בלי job-חישוב פעיל ➔ נתונים מיושנים.",
        "אי-תחזוקת ALERTDB (reorg) ➔ התראות \"רפאים\" שכבר נפתרו.",
        "התעלמות מ-context alerts ביישומי-PP/DS.",
      ],
      troubleshootHe: [
        "התראה נשארת אחרי תיקון ➔ DB alert לא רוענן; הרץ חישוב/reorg או עבור ל-dynamic.",
        "אין navigation מהתראה לאובייקט ➔ target לא הוגדר או הרשאה חסרה.",
        "התראות סותרות בין מסכים ➔ DB מול dynamic מציגים זמנים שונים.",
      ],
      bestPracticeHe: [
        "שלב DB alerts (סקירת-בוקר) עם dynamic (drill-down תוך-יומי).",
        "תזמן reorg קבוע ל-ALERTDB.",
        "אמן מתכננים לעבוד מהתראה-לאובייקט-לתיקון, לא לסרוק ידנית.",
      ],
      interviewHe: [
        { qHe: "אילו שלוש דרכים לצרוך התראות?", aHe: "מתוך ה-Alert Monitor המרכזי, כ-DB alerts מהרקע, ובהקשר מתוך יישומי-PP/DS (context alerts)." },
        { qHe: "למה התראה נשארת אחרי שתיקנת את הבעיה?", aHe: "כי היא DB alert שלא רוענן; צריך חישוב/reorg של ALERTDB או מעבר ל-dynamic alerts." },
      ],
      takeawaysHe: [
        "ניטור = צריכת התראות וטיפול מהיר.",
        "DB alerts (רקע) + dynamic + context alerts ביישומים.",
        "הכוח הוא ב-navigation מהתראה ישר לאובייקט ולתיקון.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · פרופילי התראות (7.1)", href: "/library/ppds/chapter-07/#sub-7.1" },
        { labelHe: "PP/DS · התראות ברקע (7.2.2)", href: "/library/ppds/chapter-07/#sub-7.2.2" },
      ],
      children: [
        {
          id: "7.2.1",
          titleHe: "ניטור התראות מתוך מוניטור ההתראות",
          titleEn: "Monitor Alerts from the Alert Monitor",
          execHe:
            "הדרך המרכזית לניטור: פתיחת /SAPAPO/AMON1 עם overall profile, סקירת ההתראות לפי חומרה/סוג, ו-drill-down ישיר לאובייקט הבעייתי. זהו \"לוח-המחוונים\" היומי של המתכנן.",
          beginnerHe:
            "פותחים את לוח-ההתראות המרכזי, רואים רשימה ממוינת לפי חומרה (אדום=Error, צהוב=Warning), ולוחצים על שורה כדי לקפוץ למקום הבעיה. כל הבעיות במקום אחד, מסודרות.",
          consultantHe:
            "ב-/SAPAPO/AMON1 בוחרים overall profile; הכלי מציג עץ-התראות עם קיבוץ (לפי product/resource/severity) וסינון. כל שורה נושאת hot-link ל-Product View (/SAPAPO/RRP3), DS Board (/SAPAPO/CDPS0) או Detailed Scheduling. אפשר לעבור בין dynamic ל-DB display. שינוי באובייקט ורענון מעדכן את הרשימה.",
          purposeHe:
            "לתת למתכנן נקודת-כניסה אחת ומסודרת לכל החריגות, עם מעבר מהיר לפעולה.",
          processExampleHe:
            "מתכנן טוען overall profile, ממיין לפי חומרה, פותח קבוצת Shortage, לוחץ על מוצר, נופל ל-RRP3, מקדים הזמנה, חוזר ומרענן — השורה נעלמה.",
          cbcHe:
            "ב-CBC מתכנן-המילוי פותח /SAPAPO/AMON1 בבוקר עם פרופיל \"CBC_DAILY\", רואה מחסור-תרכיז כ-Error, קופץ ל-RRP3 ומקדים אספקת-תרכיז לפני ריצת-המילוי.",
          navHe: [
            "Easy Access ► APO ► Supply Chain Monitoring ► Current Settings ► Alert Monitor (/SAPAPO/AMON1)",
          ],
          tables: ["/SAPAPO/ALERTDB", "/SAPAPO/AMOPROF"],
          tcodes: ["/SAPAPO/AMON1", "/SAPAPO/RRP3", "/SAPAPO/CDPS0"],
          fiori: ["F0287"],
          configHe: [
            "בחר overall profile בפתיחת המוניטור.",
            "קבע קיבוץ/מיון/סינון (severity, product, resource).",
            "ודא navigation targets פעילים (RRP3 / CDPS0).",
          ],
          flow: [
            { he: "טען overall profile", code: "/SAPAPO/AMON1" },
            { he: "מיין/סנן לפי חומרה", code: "Group" },
            { he: "drill-down להתראה", code: "Hot-link" },
            { he: "תקן ב-RRP3/CDPS0", code: "Action" },
            { he: "רענן", code: "Refresh" },
          ],
          mistakesHe: [
            "התעלמות מסדר-החומרה ➔ טיפול בצהוב לפני אדום.",
            "סינון רחב מדי ➔ עומס ויזואלי.",
          ],
          troubleshootHe: [
            "drill-down לא עובד ➔ navigation target לא מוגדר או הרשאה חסרה.",
            "רשימה לא מתעדכנת אחרי תיקון ➔ מצב DB; הרץ רענון/חישוב.",
          ],
          bestPracticeHe: [
            "עבוד מלמעלה-למטה לפי חומרה (Error → Warning).",
            "השתמש בקיבוץ לפי מוצר/משאב לטיפול אצווה.",
          ],
          interviewHe: [
            { qHe: "מהי נקודת-הכניסה המרכזית לניטור התראות?", aHe: "הטרנזקציה /SAPAPO/AMON1 עם overall profile." },
            { qHe: "לאן אפשר לעשות drill-down מהתראה?", aHe: "ל-Product View (/SAPAPO/RRP3), ל-DS Board (/SAPAPO/CDPS0) או ל-Detailed Scheduling." },
          ],
          takeawaysHe: [
            "המוניטור המרכזי = לוח-המחוונים היומי.",
            "מיון לפי חומרה + drill-down לאובייקט.",
            "תקן, רענן, ההתראה נסגרת.",
          ],
          relatedHe: [{ labelHe: "PP/DS · ניטור התראות (7.2)", href: "/library/ppds/chapter-07/#sub-7.2" }],
        },
        {
          id: "7.2.2",
          titleHe: "יצירת התראות ברקע",
          titleEn: "Generate Alerts in the Background",
          execHe:
            "database alerts נוצרות ע\"י job-רקע שמריץ alert determination על-פני היקף נרחב, ושומר את התוצאות ב-/SAPAPO/ALERTDB. כך, בעת פתיחת המוניטור, ההתראות נקראות מהר ללא חישוב כבד בזמן-אמת — מתאים לסקירות-מסה ולנפחים גדולים.",
          beginnerHe:
            "במקום שהמחשב יחשב את כל ההתראות ברגע שאתה פותח את המסך (איטי), הוא מחשב אותן בלילה ושומר אותן מוכנות. בבוקר הרשימה נטענת מיד. זה ה-\"background\" — עבודה מראש ברקע.",
          consultantHe:
            "מגדירים ב-SPRO Settings for Background Alert Determination ומתזמנים job (לרוב הדוח /SAPAPO/BACKGROUND_SCHED או job ייעודי ל-alert determination) עם variant של היקף/פרופיל. התוצאות נשמרות ב-ALERTDB. נדרש reorg תקופתי (/SAPAPO/AMON_REORG) לניקוי התראות-ישנות. יתרון: ביצועים בנפחים גדולים; חיסרון: עדכניות תלוית-תדירות-ה-job (לכן משלבים dynamic ל-real-time).",
          purposeHe:
            "לאפשר ניטור-מסה מהיר בנפחים גדולים, ולהכין סקירת-בוקר מוכנה למתכננים בלי המתנה לחישוב.",
          processExampleHe:
            "job-לילי מריץ alert determination על כל המוצרים ושומר 1,200 התראות ב-ALERTDB. בבוקר 30 מתכננים פותחים את המוניטור — כל אחד רואה רק את שלו, מיד, ללא חישוב חוזר.",
          cbcHe:
            "ב-CBC job-לילי מחשב התראות-מחסור ופיגור על כל קווי-המילוי וכל המפעלים; בבוקר מתכננֵי-המשמרת רואים סקירה מוכנה. reorg-שבועי מנקה התראות-ישנות מ-ALERTDB.",
          navHe: [
            "SPRO ► APO ► Supply Chain Monitoring ► Alert Monitor ► Settings for Background Alert Determination",
            "Easy Access ► APO ► Supply Chain Monitoring ► Reporting ► Alert Monitor Reorganization",
          ],
          tables: ["/SAPAPO/ALERTDB", "TBTCO", "/SAPAPO/AMOPROF"],
          tcodes: ["/SAPAPO/BACKGROUND_SCHED", "/SAPAPO/AMON_REORG", "SM37", "SM36"],
          fiori: ["F2660"],
          configHe: [
            "סמן אילו Alert Types נוצרים ברקע (DB) ב-Settings for Background Alert Determination.",
            "צור variant עם היקף (מוצרים/משאבים/גרסה) ושייך לפרופיל.",
            "תזמן job תקופתי (SM36) לחישוב ה-DB alerts.",
            "תזמן reorg (/SAPAPO/AMON_REORG) לניקוי התראות-ישנות.",
          ],
          flow: [
            { he: "סמן Alert Types ל-DB", code: "Settings" },
            { he: "צור variant + היקף", code: "Variant" },
            { he: "תזמן job", code: "SM36" },
            { he: "התראות נשמרות", code: "/SAPAPO/ALERTDB" },
            { he: "reorg תקופתי", code: "/SAPAPO/AMON_REORG" },
          ],
          masterDataHe: [
            "התראות נשמרות ב-/SAPAPO/ALERTDB; ה-job ב-TBTCO.",
            "ה-variant מצביע על היקף-אובייקטים וגרסת-תכנון.",
          ],
          mistakesHe: [
            "תזמון job בלי reorg ➔ ALERTDB מתנפח והתראות-ישנות נשארות.",
            "תדירות-job נמוכה ➔ התראות מיושנות מול המצב בפועל.",
            "variant רחב מדי ➔ job ארוך ועומס-DB.",
          ],
          troubleshootHe: [
            "המוניטור ריק למרות job ➔ ה-variant/פרופיל לא תואם לאובייקטים, או ה-job נכשל (SM37).",
            "התראות שכבר נפתרו עדיין מוצגות ➔ חסר reorg; הרץ /SAPAPO/AMON_REORG.",
            "ALERTDB גדל מאוד ➔ reorg לא רץ או חלון-שמירה ארוך מדי.",
          ],
          bestPracticeHe: [
            "תזמן את ה-job בתדירות המתאימה לקצב-התכנון (לילי/כל-שעה).",
            "תזמן reorg קבוע מיד אחרי גל-ה-job.",
            "פצל variants לפי אזור/מתכנן לביצועים.",
          ],
          interviewHe: [
            { qHe: "מהי המטרה של יצירת התראות ברקע?", aHe: "לחשב מראש database alerts ולשמור ב-ALERTDB כך שהמוניטור נטען מהר בנפחים גדולים, ללא חישוב בזמן-אמת." },
            { qHe: "מדוע חשוב reorg ל-ALERTDB?", aHe: "כדי לנקות התראות-ישנות/שנפתרו, למנוע התנפחות-טבלה ולמנוע הצגת מצב מיושן." },
          ],
          takeawaysHe: [
            "DB alerts נוצרות ב-job-רקע ונשמרות ב-ALERTDB.",
            "יתרון: ביצועים בנפחים גדולים; חיסרון: עדכניות תלוית-job.",
            "חובה לתזמן reorg לצד ה-job.",
          ],
          relatedHe: [
            { labelHe: "PP/DS · ניטור התראות (7.2)", href: "/library/ppds/chapter-07/#sub-7.2" },
            { labelHe: "אובייקט · /SAPAPO/ALERTDB", href: "/library/ppds/object/ALERTDB/" },
          ],
        },
        {
          id: "7.2.3",
          titleHe: "ניטור התראות מתוך יישומי PP/DS",
          titleEn: "Monitor Alerts from PP/DS Applications",
          execHe:
            "התראות אינן מוגבלות למוניטור המרכזי; הן מוטמעות בתוך יישומי-PP/DS עצמם — Product View, DS Planning Board, Detailed Scheduling — כ-context alerts. כך המתכנן רואה את החריגה במקום-העבודה הטבעי שלו ומגיב מיד, בלי לעבור מסך.",
          beginnerHe:
            "במקום ללכת ללוח-ההתראות, האזהרות מופיעות ישר במסך שבו אתה כבר עובד — כמו נורה-אדומה על שורה בעייתית. אתה מתכנן, רואה את ההתראה בהקשר, ומתקן בו-במקום.",
          consultantHe:
            "יישומים כמו /SAPAPO/RRP3 (Product View), /SAPAPO/CDPS0 (DS Board) ו-Detailed Scheduling מציגים alert icons/columns לפי ה-alert profile המשויך. ההתראות מחושבות dynamic בהקשר האובייקט המוצג. לחיצה מציגה פירוט; שינוי-תכנון (reschedule, deallocate) מעדכן את ההתראה מיד. זהו closed-loop: תכנון ↔ התראה באותו מסך.",
          purposeHe:
            "לקצר עוד יותר את הלולאה גילוי→תיקון, ע\"י הצגת ההתראה בהקשר התכנון עצמו במקום במסך נפרד.",
          processExampleHe:
            "מתכנן עובד ב-DS Board, גורר פק\"ע לקו אחר; מיד מופיעה התראת resource overload על הקו-החדש. הוא מבטל את ההזזה או מפצל — closed loop באותו מסך.",
          cbcHe:
            "ב-CBC מתכנן-המילוי ב-DS Board של קו-2 רואה context alert של עומס-יתר תוך-כדי גרירת פק\"ע-משקה; הוא מעביר חלק לקו-3 וההתראה במסך נעלמת מיד.",
          navHe: [
            "Easy Access ► APO ► Production Planning ► Interactive Production Planning ► Product View (/SAPAPO/RRP3)",
            "Easy Access ► APO ► Production Planning ► Detailed Scheduling Planning Board (/SAPAPO/CDPS0)",
          ],
          tables: ["/SAPAPO/ALERTDB", "/SAPAPO/AMOPROF"],
          tcodes: ["/SAPAPO/RRP3", "/SAPAPO/CDPS0", "/SAPAPO/RRP4", "/SAPAPO/AMON1"],
          fiori: ["F0287"],
          configHe: [
            "שייך alert profile ליישום (Product View / DS Board) דרך הגדרות-היישום.",
            "הפעל alert icons/columns בתצוגת היישום.",
            "ודא חישוב dynamic של ההתראות בהקשר.",
          ],
          flow: [
            { he: "עבוד ביישום-PP/DS", code: "RRP3/CDPS0" },
            { he: "context alert מופיע", code: "Icon" },
            { he: "פתח פירוט", code: "Detail" },
            { he: "תקן בו-במקום", code: "Reschedule" },
            { he: "ההתראה מתעדכנת מיד", code: "Dynamic" },
          ],
          mistakesHe: [
            "אי-שיוך alert profile ליישום ➔ אין context alerts.",
            "התעלמות מ-context alert תוך-כדי תכנון ➔ יצירת בעיה חדשה (overload).",
          ],
          troubleshootHe: [
            "אין alert icons ביישום ➔ alert profile לא משויך או התצוגה לא הופעלה.",
            "context alert לא מתעדכן ➔ מצב dynamic תקול; רענן את היישום.",
          ],
          bestPracticeHe: [
            "שייך את אותו alert profile למוניטור וליישומים — עקביות.",
            "עבוד closed-loop: כל הזזת-תכנון בדוק את ה-context alert מיד.",
          ],
          interviewHe: [
            { qHe: "אילו יישומי-PP/DS מציגים context alerts?", aHe: "Product View (/SAPAPO/RRP3), DS Planning Board (/SAPAPO/CDPS0) ו-Detailed Scheduling — לפי ה-alert profile המשויך." },
            { qHe: "מה היתרון של ניטור מתוך היישום מול המוניטור המרכזי?", aHe: "ההתראה מופיעה בהקשר-העבודה ומחושבת dynamic, כך שהמתכנן רואה השפעת-שינוי מיד ומקצר את הלולאה גילוי→תיקון." },
          ],
          takeawaysHe: [
            "context alerts מוטמעות ביישומי-PP/DS עצמם.",
            "מחושבות dynamic בהקשר האובייקט המוצג.",
            "closed-loop: תכנון ותיקון באותו מסך.",
          ],
          relatedHe: [
            { labelHe: "PP/DS · ניטור מהמוניטור (7.2.1)", href: "/library/ppds/chapter-07/#sub-7.2.1" },
            { labelHe: "PP/DS · התראות ברקע (7.2.2)", href: "/library/ppds/chapter-07/#sub-7.2.2" },
          ],
        },
      ],
    },
    // ============================================================ 7.3
    {
      id: "7.3",
      titleHe: "סיכום (Summary)",
      titleEn: "Summary",
      execHe:
        "ה-Alert Monitor (/SAPAPO/AMON1) הוא מנוע ניהול-לפי-חריגות של PP/DS: מגדירים alert profiles (אילו התראות, ספים, חומרה), מאגדים אותם ב-overall profile, מעבירים אותם בין סביבות ב-Transport, ואז צורכים אותן — מהמוניטור המרכזי, מ-DB alerts ברקע, ומ-context alerts בתוך היישומים. התוצאה: המתכנן מטפל בחריגות בלבד, במהירות, במקום לסרוק אלפי הזמנות.",
      beginnerHe:
        "סיכום הפרק במשפט: בנינו אזעקה חכמה לתכנון. כיווננו אותה (פרופילים + ספים), חיברנו את כל החיישנים ללוח אחד (overall profile), העברנו אותה לכל הסביבות (Transport), ולמדנו להקשיב לה בשלוש דרכים — לוח מרכזי, חישוב-לילי ברקע, ונורות בתוך מסכי-העבודה — ולתקן מיד.",
      consultantHe:
        "נקודות-המפתח ליישום: (1) הבחנה database alerts (job-רקע + reorg, נפח) מול dynamic (זמן-אמת, עדכני); (2) ארכיטקטורת-הפרופילים alert→overall; (3) רק shared profiles עוברים ב-Transport; (4) navigation מהתראה ל-RRP3/CDPS0; (5) context alerts ביישומים סוגרים את הלולאה תכנון↔התראה. תחזוקה: תזמון job-חישוב + reorg ל-ALERTDB, ובקרת ספים מול משוב-מתכננים כדי לאזן רעש מול החמצה.",
      purposeHe:
        "לקבע את התמונה האינטגרטיבית: כיצד הגדרה (7.1) הופכת לניטור (7.2), וכיצד שלוש דרכי-הצריכה משלימות זו את זו לכלי-עבודה יומי אפקטיבי.",
      processExampleHe:
        "מחזור-חיים שלם: יועץ מגדיר alert profile + overall profile ב-DEV, מעביר ב-Transport ל-PRD, מתזמן job-לילי + reorg; בבוקר המתכנן פותח /SAPAPO/AMON1, מטפל בחריגות drill-down, וממשיך לתקן context alerts תוך-כדי עבודה ב-DS Board.",
      cbcHe:
        "ב-CBC: פרופיל \"BEV_LINE\" (מחסור-תרכיז, פיגור-משקה, עומס-קו) → overall \"CBC_DAILY\" → Transport לכל המפעלים → job-לילי + reorg-שבועי. מתכנני-המשמרת מנהלים את עונת-השיא לפי חריגות בלבד, מהמחסן ועד קו-המילוי.",
      navHe: [
        "Easy Access ► APO ► Supply Chain Monitoring ► Current Settings ► Alert Monitor (/SAPAPO/AMON1)",
        "SPRO ► APO ► Supply Chain Monitoring ► Alert Monitor (כל ענפי-ה-Customizing של הפרק)",
      ],
      tables: ["/SAPAPO/AMOPROF", "/SAPAPO/AMOOVPROF", "/SAPAPO/ALERTDB", "/SAPAPO/AMOTYPE"],
      tcodes: ["/SAPAPO/AMON1", "/SAPAPO/AMON_REORG", "/SAPAPO/RRP3", "/SAPAPO/CDPS0"],
      fiori: ["F0287", "F2660"],
      configHe: [
        "ארכיטקטורה: alert profile → overall profile → Alert Monitor.",
        "DB alerts: job-חישוב + reorg; dynamic: זמן-אמת.",
        "Transport ל-shared profiles בלבד; user-specific נשארים מקומיים.",
        "navigation + context alerts לסגירת הלולאה גילוי→תיקון.",
      ],
      mistakesHe: [
        "פרופיל ללא overall profile ➔ לא נטען.",
        "DB alerts ללא reorg ➔ נתונים מיושנים והתנפחות.",
        "ספים לא-מאוזנים ➔ רעש או החמצה.",
      ],
      troubleshootHe: [
        "מוניטור ריק ➔ alert determination/פרופיל/job — בדוק לפי הסדר.",
        "התראה נשארת אחרי תיקון ➔ DB לא רוענן; reorg או dynamic.",
        "פרופיל לא הגיע ל-PRD ➔ user-specific במקום shared, או request לא נפרס.",
      ],
      bestPracticeHe: [
        "פרופילים role-based + ספים מכוילים למשוב.",
        "שלב DB (סקירת-בוקר) עם dynamic ו-context (תוך-יומי).",
        "תזמן job + reorg, ונהל פרופילים תחת Transport.",
      ],
      interviewHe: [
        { qHe: "תאר את מחזור-החיים המלא של Alert Monitor ב-PP/DS.", aHe: "הגדרת alert profile (ספים+חומרה) → איגוד ב-overall profile → Transport ל-shared → תזמון job + reorg → ניטור מהמוניטור/DB/context alerts → drill-down ל-RRP3/CDPS0 ותיקון." },
        { qHe: "מהו העיקרון המנחה של כל הכלי?", aHe: "ניהול-לפי-חריגות — להציף רק את החריגות (מחסור/פיגור/עומס) ולנתב את המתכנן ישירות לפעולה, במקום סריקה ידנית." },
      ],
      takeawaysHe: [
        "ארכיטקטורה: alert profile → overall profile → /SAPAPO/AMON1.",
        "שלוש דרכי-צריכה: מוניטור מרכזי, DB-רקע, context ביישומים.",
        "DB (נפח+reorg) מול dynamic (עדכניות); Transport ל-shared בלבד.",
        "העיקרון: ניהול-לפי-חריגות — מהתראה ישר לתיקון.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · פרופילי התראות (7.1)", href: "/library/ppds/chapter-07/#sub-7.1" },
        { labelHe: "PP/DS · ניטור התראות (7.2)", href: "/library/ppds/chapter-07/#sub-7.2" },
        { labelHe: "PP · MRP ותכנון דרישות", href: "/library/pp/chapter-04/" },
      ],
    },
  ],
};
