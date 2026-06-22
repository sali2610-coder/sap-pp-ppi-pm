// ===== PM User Digital Textbook — Chapter 1 (gold-standard learning chapter) =====
// Plant Maintenance Business User Guide. Every node is a complete LearningNode
// with 18 facets of authored Hebrew (beginner + consultant friendly), business-user
// perspective. SAP identifiers verbatim EN. CBC = Coca-Cola bottling PM business
// users maintaining fill-line equipment. Hierarchy + ids preserved from the source.
import type { TextbookChapter } from "./types";

export const CH1: TextbookChapter = {
  n: 1,
  titleHe: "מבוא לתחזוקת מפעל (מדריך משתמש)",
  titleEn: "Introduction to Plant Maintenance",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לפתיחת מדריך-המשתמש של Plant Maintenance ב-SAP S/4HANA, מנקודת-מבט של משתמש-עסקי המתחזק ציוד בקו-מילוי. כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט וצמתי-מערכת, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: להבין מהי תחזוקת-מפעל ב-SAP, איך התחום התפתח, ועל אילו פלטפורמות (SAP S/4HANA, SAP HANA, SAP GUI / SAP Business Client / SAP Fiori) המשתמש עובד מדי יום — ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 1.1
    {
      id: "1.1",
      titleHe: "תחזוקת מפעל כיום: רעיונות חדשים זקוקים למרחב חדש",
      titleEn: "Plant Maintenance Today: New Ideas Need New Space",
      execHe:
        "תחזוקת-מפעל (Plant Maintenance) חדלה מלהיות 'מחלקת-תיקונים' והפכה למנוע זמינות-נכסים שמשפיע ישירות על תפוקה, איכות, בטיחות ועלות. רעיונות חדשים — תחזוקה-מונעת, תחזוקה-מבוססת-מצב, חיישנים ו-IoT, ניהול-נכסי-מפעל (EAM) — דורשים פלטפורמה שתומכת בנתונים בזמן-אמת ובחוויית-משתמש פשוטה. SAP S/4HANA הוא ה'מרחב החדש' הזה: בסיס-נתונים מהיר (SAP HANA) ומסכים פשוטים (SAP Fiori) שמאפשרים לטכנאי בשטח לדווח תקלה בכמה הקשות.",
      beginnerHe:
        "תחזוקת-מפעל היא כל מה שעושים כדי שהמכונות בקו-הייצור ימשיכו לעבוד: לתקן כשמשהו מתקלקל, לבצע טיפולים-תקופתיים לפני שמתקלקל, ולתעד הכול. 'מדריך-המשתמש' הזה ילמד אותך, כמשתמש-עסקי, איך לעשות את זה במערכת SAP. הרעיון של הפרק הראשון: העולם השתנה — היום מצפים מהמערכת להיות פשוטה, מהירה ונגישה גם מהטלפון בשטח, ולכן SAP בנתה מחדש את הסביבה (S/4HANA + Fiori).",
      consultantHe:
        "מבחינת מיצוב-פתרון, הרכיב הקלאסי PM (Plant Maintenance) ב-ECC הורחב תחת המטרייה SAP Enterprise Asset Management (EAM) ב-S/4HANA, עם הרחבות כמו Asset Strategy & Performance Management ו-Predictive Asset Insights. ה'מרחב החדש' אינו רק שיווקי: in-memory column store (SAP HANA) מאפשר ניתוח היסטוריית-תקלות בזמן-אמת ללא aggregates נפרדים, ו-SAP Fiori מחליף עשרות מסכי SAP GUI בתפקיד-מבוסס (role-based) אפליקציות. למשתמש-העסקי המשמעות היא פחות שדות, יותר הקשר, וזמן-תגובה קצר יותר.",
      purposeHe:
        "המטרה: להבהיר מדוע ארגון עובר ל-Plant Maintenance מודרני — לא כפרויקט-IT אלא כדי להגדיל זמינות-ציוד, להקטין השבתות-לא-מתוכננות ולשפר תיעוד ובטיחות. עבור המשתמש-העסקי זו הסיבה שהמסכים נראים אחרת ושכדאי ללמוד את הכלים החדשים.",
      processExampleHe:
        "מפעיל מבחין ברעש חריג במסוע. במקום לחכות לתקלה, הוא פותח הודעת-תחזוקה (Maintenance Notification) מהנייד, מצרף תמונה, והמערכת מנתבת אותה למתכנן. המתכנן הופך אותה להזמנת-עבודה (Maintenance Order), משייך חלפים וזמן-טכנאי, והכול מתועד — מהזיהוי ועד הסגירה — באותה פלטפורמה.",
      cbcHe:
        "ב-CBC (מפעל-המילוי של קוקה-קולה): קו-מילוי הוא שרשרת מכונות (שטיפה, מילוי, סגירה, תיוג, אריזה). השבתה של דקה עולה ארגזים. תחזוקת-מפעל מודרנית מאפשרת לטכנאי-הקו לדווח על דליפה בראש-מילוי דרך SAP Fiori תוך שניות, במקום למלא טופס-נייר שיגיע למחשב רק בסוף-המשמרת.",
      navHe: [
        "SAP Fiori Launchpad ► Maintenance Management (group) ► Create Maintenance Request / Find Technical Objects",
        "SAP Menu ► Logistics ► Plant Maintenance ► Maintenance Processing",
        "SAP S/4HANA ► Asset Management (EAM) ► Maintenance Operations",
      ],
      tables: ["VIQMEL", "AUFK", "EQUI", "IFLOT"],
      tcodes: ["IW21", "IW31", "IL01", "IE01"],
      fiori: ["F2913", "F4072", "F2929"],
      configHe: [
        "אין כאן קונפיגורציה ייעודית — זהו מקטע-מסגרת מושגי; ההגדרות בפועל מתחילות בהקמת מבנה-נכסים (Functional Location / Equipment) ובסוגי-הודעות/הזמנות.",
        "בחירת מודל-עבודה: SAP GUI מול SAP Fiori לכל תפקיד — קובעת אילו אפליקציות יופיעו ב-Launchpad של המשתמש-העסקי.",
      ],
      flow: [
        { he: "זיהוי חריגה בשטח", note: "מפעיל / חיישן" },
        { he: "פתיחת הודעת-תחזוקה", code: "IW21", note: "Notification" },
        { he: "תכנון והמרה להזמנת-עבודה", code: "IW31", note: "Order" },
        { he: "ביצוע ודיווח", note: "טכנאי" },
        { he: "סגירה ותיעוד היסטוריה", note: "מקור לניתוח" },
      ],
      mistakesHe: [
        "תפיסת PM כ'תיקונים בלבד' — מפספסים את הערך של תחזוקה-מונעת ושל היסטוריית-הציוד.",
        "המשך עבודה ב-SAP GUI הישן מתוך הרגל, גם כשאפליקציית SAP Fiori פשוטה וזמינה.",
        "אי-דיווח של תקלות קטנות — נוצרת היסטוריה חלקית והניתוח העתידי משובש.",
      ],
      troubleshootHe: [
        "הטכנאי 'לא מוצא איפה לדווח' ➔ ודא שקבוצת-אפליקציות Maintenance מופעלת ב-Fiori Launchpad לתפקידו.",
        "הודעה נפתחה אך לא מטופלת ➔ בדוק ניתוב לפי Planner Group / Work Center.",
      ],
      bestPracticeHe: [
        "דווח כל אירוע — גם קטן; ההיסטוריה היא הנכס.",
        "העדף את אפליקציות SAP Fiori לפעולות-שטח יומיומיות; שמור את SAP GUI למשימות-עומק.",
        "חבר את אנשי-הקו לתהליך — הם מקור-המידע הראשון על מצב הציוד.",
      ],
      interviewHe: [
        { qHe: "מהי תחזוקת-מפעל (Plant Maintenance) במשפט אחד?", aHe: "כלל הפעילויות לשמירה על זמינות ותפקוד של נכסים טכניים — תיקון, תחזוקה-מונעת, ותיעוד — מנוהל ב-SAP כתהליך מקצה-לקצה." },
        { qHe: "מדוע 'רעיונות חדשים זקוקים למרחב חדש'?", aHe: "תחזוקה-מבוססת-מצב, IoT וניתוח בזמן-אמת דורשים בסיס-נתונים מהיר (SAP HANA) וחוויית-משתמש פשוטה (SAP Fiori) — את אלה מספק SAP S/4HANA." },
      ],
      takeawaysHe: [
        "PM היום = מנוע זמינות-נכסים, לא רק תיקונים.",
        "ה'מרחב החדש' הוא SAP S/4HANA: SAP HANA למהירות + SAP Fiori לפשטות.",
        "למשתמש-העסקי: פחות שדות, יותר הקשר, דיווח מהיר מהשטח.",
      ],
      relatedHe: [
        { labelHe: "PMU · מינוח תחזוקה חדש (1.2)", href: "/library/pmu/chapter-01/#sub-1.2" },
        { labelHe: "PMU · SAP S/4HANA (1.5)", href: "/library/pmu/chapter-01/#sub-1.5" },
      ],
    },
    // ============================================================ 1.2
    {
      id: "1.2",
      titleHe: "מינוח חדש בתחזוקת מפעל",
      titleEn: "New Plant Maintenance Terminology",
      execHe:
        "המעבר ל-SAP S/4HANA הביא עמו מונחים מעודכנים. השם הרשמי של התחום הורחב מ-Plant Maintenance (PM) ל-Enterprise Asset Management (EAM); 'הזמנת-עבודה' נקראת Maintenance Order, ו'הודעה' היא Maintenance Notification. למשתמש-העסקי חשוב להכיר את המונחים הן בכינויָם הישן והן בחדש, כי המסמכים, המסכים והדוחות עשויים להשתמש בשניהם במקביל.",
      beginnerHe:
        "כל מקצוע מדבר בשפה משלו. כדי לעבוד עם תחזוקת-מפעל ב-SAP צריך להכיר כמה מילים: 'Functional Location' = מיקום-פונקציונלי (היכן הציוד מותקן, למשל 'קו-מילוי 2'); 'Equipment' = פריט-ציוד ספציפי (למשל 'משאבה P-101'); 'Notification' = הודעה שמשהו לא תקין; 'Order' = הזמנת-עבודה שמרכזת מה לתקן, מי, ובכמה. בלי המילים האלה קשה להבין את המסכים.",
      consultantHe:
        "המינוח הרשמי ב-S/4HANA: התחום = SAP Enterprise Asset Management (EAM), כינוי-העל לפונקציונליות שב-ECC כונתה PM. רכיבי-הליבה — Technical Objects (Functional Location IFLOT, Equipment EQUI), Maintenance Notification (QMEL/VIQMEL), Maintenance Order (AUFK/AFKO), Task List, Maintenance Plan. שים לב: ב-Fiori המונחים 'ידידותיים' (Maintenance Request, Malfunction Report) בעוד ב-SAP GUI נשמרים שמות-העסקה הקלאסיים (IW21/IW31). אי-יישור מונחים בין משתמשים גורם לבלבול בדיווחים.",
      purposeHe:
        "המטרה: ליצור שפה משותפת. כשמתכנן, טכנאי ומנהל משתמשים באותם מונחים — Notification, Order, Functional Location, Equipment — התקשורת מדויקת והדיווחים עקביים.",
      processExampleHe:
        "מנהל מבקש 'דוח-תקלות לרבעון'. בשפה הנכונה זו שאילתה על Maintenance Notifications מסוג Malfunction (M1) הקשורות ל-Equipment מסוים בטווח-תאריכים — ולא 'דוח-Orders'. הבחנה במונח חוסכת דוח שגוי.",
      cbcHe:
        "ב-CBC: 'קו-מילוי 1' הוא Functional Location; 'מכונת-המילוי' בתוכו היא Equipment; דיווח 'יש דליפה' הוא Notification; 'תקן את הדליפה — 2 שעות טכנאי + אטם' הוא Order. אימוץ המינוח האחיד מונע מצב שבו משמרת-בוקר ומשמרת-לילה מתעדות אותו דבר בשמות שונים.",
      navHe: [
        "SAP Easy Access ► Logistics ► Plant Maintenance — תפריט-העל בו מופיעים המונחים הקלאסיים",
        "SAP Fiori Launchpad ► Maintenance Management — כאן מופיעים המונחים הידידותיים (Request / Report Malfunction)",
      ],
      tables: ["EQUI", "IFLOT", "VIQMEL", "AUFK"],
      tcodes: ["IE03", "IL03", "IW23", "IW33"],
      fiori: ["F2929", "F4072"],
      configHe: [
        "אין קונפיגורציה — זהו מילון-מונחים מושגי; ההגדרות שמאחורי המונחים (סוגי-הודעה, סוגי-הזמנה) נלמדות בפרקים הבאים.",
      ],
      mistakesHe: [
        "ערבוב בין Notification ל-Order — הראשון מדווח בעיה, השני מבצע פעולה.",
        "בלבול בין Functional Location (מיקום) ל-Equipment (פריט) — שתי רמות שונות במבנה-הנכסים.",
        "שימוש בכינוי הישן 'PM' בלבד מול אנשי-מערכת שמכירים רק 'EAM' ב-S/4HANA.",
      ],
      troubleshootHe: [
        "דוח 'ריק' למרות פעילות ➔ ייתכן ששאלת על האובייקט הלא-נכון (Order במקום Notification).",
        "שדה 'לא קיים' במסך Fiori לעומת GUI ➔ שמות-שדה ידידותיים שונים מהשם הטכני; חפש לפי ההקשר.",
      ],
      bestPracticeHe: [
        "החזק מילון-מונחים קצר (עברית / English) זמין לכל משתמש חדש.",
        "השתמש בשם המלא בפעם הראשונה: Maintenance Notification (הודעה), ואז קצר.",
        "יישֵר מונחים בין משמרות ובין SAP GUI ל-SAP Fiori.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Functional Location ל-Equipment?", aHe: "Functional Location הוא המיקום/הפונקציה (היכן מותקן, למשל קו-מילוי); Equipment הוא פריט-הציוד הפיזי המותקן בו. Equipment יכול לעבור בין Functional Locations." },
        { qHe: "מהו השם הרשמי של התחום ב-SAP S/4HANA?", aHe: "Enterprise Asset Management (EAM) — מטריית-העל שתחתיה נמצא Plant Maintenance (PM)." },
      ],
      takeawaysHe: [
        "התחום: Plant Maintenance (PM) → Enterprise Asset Management (EAM) ב-S/4HANA.",
        "מונחי-ליבה: Functional Location, Equipment, Notification, Order.",
        "Fiori = מונחים ידידותיים; SAP GUI = שמות-עסקה קלאסיים — דע את שניהם.",
      ],
      relatedHe: [
        { labelHe: "PMU · תחזוקת מפעל כיום (1.1)", href: "/library/pmu/chapter-01/#sub-1.1" },
        { labelHe: "PMU · אסטרטגיות תחזוקה (1.3)", href: "/library/pmu/chapter-01/#sub-1.3" },
      ],
    },
    // ============================================================ 1.3
    {
      id: "1.3",
      titleHe: "אסטרטגיות תחזוקה לאורך זמן",
      titleEn: "Maintenance Strategies over Time",
      execHe:
        "אסטרטגיות-תחזוקה התפתחו בארבעה דורות: (1) תחזוקת-שבר (Breakdown / Reactive) — מתקנים אחרי שמתקלקל; (2) תחזוקה-מונעת (Preventive) — לפי לוח-זמנים/מונה; (3) תחזוקה-מבוססת-מצב (Condition-Based) — לפי מדידות וחיישנים; (4) תחזוקה-חזויה (Predictive) — מודלים שחוזים כשל לפני שקורה. SAP תומך בכולן, וארגון בוגר מערבב אותן לפי קריטיוּת-הנכס.",
      beginnerHe:
        "יש כמה גישות לטיפול במכונות. הפשוטה: לחכות שתתקלקל ואז לתקן (יקר ומפתיע). חכמה יותר: לעשות טיפול כל X זמן או X שעות-עבודה, כמו טיפול לרכב (תחזוקה-מונעת). מתקדמת: למדוד מצב (רעידות, טמפרטורה) ולטפל רק כשצריך. הכי מתקדמת: לתת למחשב לחזות מתי תהיה תקלה. כמשתמש-עסקי תיתקל בעיקר בשתי הראשונות, אך כדאי להכיר את כולן.",
      consultantHe:
        "מיפוי ל-SAP: תחזוקת-שבר = Malfunction Notification → Order תגובתי. תחזוקה-מונעת = Maintenance Plan + Strategy (IP41/IP42) עם Cycles (זמן/מונה) המייצרים Calls אוטומטיים. מבוססת-מצב = Measuring Points/Documents (IK01/IK11) עם Counter-based plans או ערכי-מדידה החורגים מסף. חזויה = אינטגרציה ל-SAP Predictive Asset Insights / APM. הבחירה נשענת על קריטיוּת (ABC), עלות-כשל וזמינות-נדרשת.",
      purposeHe:
        "המטרה: להתאים את עוצמת-התחזוקה לערך-הנכס. לא כל מכונה מצדיקה חיישנים; ולא כל מכונה קריטית מסתפקת בתחזוקת-שבר. האסטרטגיה הנכונה ממזערת את סך עלות-הבעלות.",
      processExampleHe:
        "מדחס קריטי מקבל תחזוקה-מבוססת-מצב: חיישן-רעידות מזין Measuring Document; כשהערך חוצה סף, נוצרת אוטומטית הודעה והזמנת-עבודה — לפני הכשל. מכונה זניחה מקבלת תחזוקת-שבר בלבד.",
      cbcHe:
        "ב-CBC: מכונת-המילוי (קריטית, השבתתה עוצרת קו) מקבלת תחזוקה-מונעת לפי מונה-בקבוקים + ניטור-מצב; מסוע-משני מקבל תחזוקה-מונעת לפי זמן; פח-אשפה מקבל תחזוקת-שבר. השילוב חוסך עלות בלי לסכן את הקו-הקריטי.",
      navHe: [
        "SAP Menu ► Plant Maintenance ► Preventive Maintenance ► Maintenance Planning ► Maintenance Plans ► Create (IP01/IP42)",
        "SAP Menu ► Plant Maintenance ► Management of Technical Objects ► Measuring Points/Counters",
        "SAP Fiori Launchpad ► Maintenance Planning ► Manage Maintenance Plans",
      ],
      tables: ["MPLA", "MPOS", "MMPT", "IMPTT", "IMRG"],
      tcodes: ["IP41", "IP42", "IP10", "IK01", "IK11"],
      fiori: ["F4178", "F2962"],
      configHe: [
        "Maintenance Strategy (IP11): מגדירה Packages (מחזורים) ויחידותיהם — בסיס לתחזוקה-מונעת מבוססת-אסטרטגיה.",
        "Maintenance Plan Category: קובע אם התוכנית מייצרת Notification, Order או שניהם.",
        "Scheduling Parameters: Shift Factors, Tolerance, Cycle — שולטים בדיוק תזמון ה-Calls.",
      ],
      flow: [
        { he: "סיווג קריטיוּת-נכס", note: "ABC" },
        { he: "בחירת אסטרטגיה", note: "שבר / מונע / מצב / חזוי" },
        { he: "הקמת Maintenance Plan", code: "IP42" },
        { he: "תזמון (Scheduling)", code: "IP10", note: "Calls" },
        { he: "ביצוע אוטומטי של Order/Notification", note: "מחזורי" },
      ],
      mistakesHe: [
        "תחזוקה-מונעת אחידה לכל הציוד — בזבוז על נכסים זניחים.",
        "הסתמכות על תחזוקת-שבר לנכס קריטי — השבתות יקרות ומפתיעות.",
        "אי-תזמון (IP10) של ה-Maintenance Plan — התוכנית קיימת אך לא מייצרת Calls.",
      ],
      troubleshootHe: [
        "תחזוקה-מונעת 'לא קופצת' ➔ בדוק שה-Plan תוזמן (IP10) ושמחזור/מונה מאוכלסים.",
        "תחזוקה-מבוססת-מצב לא מפעילה הזמנה ➔ Measuring Point ללא סף או ללא קישור ל-Plan.",
      ],
      bestPracticeHe: [
        "סווג נכסים לפי קריטיוּת לפני שבוחרים אסטרטגיה.",
        "התחל מתחזוקה-מונעת לנכסים קריטיים, והתקדם למבוססת-מצב היכן שמשתלם.",
        "בדוק תקופתית שתוכניות מתוזמנות ומייצרות Calls בפועל.",
      ],
      interviewHe: [
        { qHe: "מהי תחזוקה-מונעת מול מבוססת-מצב?", aHe: "מונעת = לפי לוח-זמנים/מונה קבוע (זמן או יחידות); מבוססת-מצב = לפי מדידה בפועל (רעידה/טמפ') החורגת מסף. השנייה חוסכת טיפולים מיותרים." },
        { qHe: "מהו Maintenance Plan ב-SAP?", aHe: "אובייקט שמתזמן אוטומטית פעולות-תחזוקה (Calls) לפי אסטרטגיה/מחזור, ומייצר Notifications/Orders במועד." },
      ],
      takeawaysHe: [
        "ארבע גישות: שבר → מונעת → מבוססת-מצב → חזויה.",
        "התאם אסטרטגיה לקריטיוּת-הנכס, לא 'אחת לכולם'.",
        "ב-SAP: Maintenance Plan + Strategy + תזמון (IP10) מניעים תחזוקה-מונעת.",
      ],
      relatedHe: [
        { labelHe: "PMU · מינוח חדש (1.2)", href: "/library/pmu/chapter-01/#sub-1.2" },
        { labelHe: "PMU · PM לאורך זמן ב-SAP (1.4)", href: "/library/pmu/chapter-01/#sub-1.4" },
      ],
    },
    // ============================================================ 1.4
    {
      id: "1.4",
      titleHe: "תחזוקת מפעל לאורך זמן ב-SAP",
      titleEn: "Plant Maintenance over Time in SAP",
      execHe:
        "ב-SAP התחום עבר מסע: מ-SAP R/2 ל-SAP R/3 (שם התגבש מודול PM הקלאסי), דרך SAP ECC 6.0 עם Enhancement Packages, ועד SAP S/4HANA שבו PM הורחב ל-EAM על בסיס SAP HANA וחוויית SAP Fiori. כל דור הוסיף יכולות — ממיכון בסיסי של הזמנות-עבודה ועד ניהול-נכסים אסטרטגי וניתוח-בזמן-אמת.",
      beginnerHe:
        "SAP קיימת עשרות שנים, והגרסאות התחלפו. בלי להיכנס להיסטוריה מסובכת, מספיק לדעת: היום הארגון עובד (או עובר) ל-SAP S/4HANA. מי שהכיר את 'המסכים הישנים' (ECC) יראה ש-S/4HANA דומה במהות אבל נראה אחר ומהיר יותר. הפרק מסביר את הרצף כדי שתבין למה דברים נראים כפי שהם.",
      consultantHe:
        "ציר-זמן טכני: R/3 ביסס את ארכיטקטורת ה-PM (Technical Objects, Notifications, Orders, Maintenance Plans). ECC 6.0 + EHP הוסיפו פונקציות בלי שדרוג-ליבה (Switch Framework). S/4HANA הביא Simplification: מבנה-טבלאות מצומצם (למשל ביטול aggregate/index tables הודות ל-HANA), אובייקט Business Partner, ו-Fiori כ-UX מוביל. ל-PM ספציפית — מסמכי Simplification (SI) מתעדים שינויים והמלצות-מעבר. למשתמש-העסקי השינוי מורגש בעיקר ב-UX וב-ביצועים.",
      purposeHe:
        "המטרה: לתת הקשר. כשמשתמש מבין שהמערכת התפתחה ולא 'הומצאה מאפס', קל לו יותר לקבל את השינוי, ולמצוא פעולות מוכרות בלבוש חדש.",
      processExampleHe:
        "ארגון שעבד ב-ECC עם עסקת IW31 ליצירת הזמנת-עבודה, מוצא ב-S/4HANA את אותה יכולת גם דרך אפליקציית SAP Fiori 'Create Maintenance Order' — אותו תהליך-עסקי, ממשק חדש ונתונים זהים בבסיס.",
      cbcHe:
        "ב-CBC: מתכנן-תחזוקה ותיק שהכיר את ECC ימצא ב-S/4HANA את כל מבנה-הנכסים של קווי-המילוי כפי שהיה — אותם Functional Locations ו-Equipment — אך עם דוחות מהירים יותר ומסכי-Fiori לדיווח-שטח.",
      navHe: [
        "SAP Easy Access (SAP GUI) — הסביבה ה'קלאסית' המוכרת מ-ECC",
        "SAP Fiori Launchpad — סביבת-העבודה המודרנית ב-S/4HANA",
        "SPRO ► SAP Reference IMG ► Plant Maintenance and Customer Service — שורש-ההגדרות",
      ],
      tables: ["AUFK", "AFKO", "VIQMEL", "EQUI", "IFLOT"],
      tcodes: ["IW31", "IW21", "IL01", "IE01", "SPRO"],
      fiori: ["F2913", "F2929"],
      configHe: [
        "אין קונפיגורציה ייעודית — מקטע-רקע; ההגדרות בפועל יושבות תחת SPRO ► Plant Maintenance and Customer Service.",
        "במעבר ECC→S/4HANA יש לבדוק מסמכי-Simplification (Simplification List) הרלוונטיים ל-PM/EAM.",
      ],
      mistakesHe: [
        "הנחה ש-S/4HANA הוא 'מערכת אחרת לגמרי' — ברוב התהליכים זו אותה לוגיקה בלבוש חדש.",
        "התעלמות ממסמכי-Simplification בעת מעבר — עלול להוביל להפתעות בהתאמות-קוד.",
      ],
      troubleshootHe: [
        "'איפה העסקה שהכרתי?' ➔ חפש את התהליך באפליקציית Fiori המקבילה; הלוגיקה זהה.",
        "דוח ECC ישן לא רץ ב-S/4HANA ➔ ייתכן שטבלת-aggregate בוטלה; השתמש בדוח/CDS החדש.",
      ],
      bestPracticeHe: [
        "מַפֶּה תהליכים מוכרים (ECC) לאפליקציות Fiori המקבילות לפני המעבר.",
        "סמוך על שכבת-הלוגיקה הזהה; השקע את הלמידה ב-UX ובדוחות החדשים.",
      ],
      interviewHe: [
        { qHe: "מה היחס בין PM ב-ECC ל-EAM ב-S/4HANA?", aHe: "אותו תחום-ליבה; S/4HANA מרחיב את PM ל-EAM, מפשט מבנה-טבלאות (Simplification) הודות ל-SAP HANA, ומחליף את ה-UX ל-SAP Fiori — אך התהליכים העסקיים נשמרים." },
        { qHe: "מהם Enhancement Packages ב-ECC?", aHe: "חבילות-פונקציונליות הניתנות להפעלה סלקטיבית (Switch Framework) ב-ECC 6.0 בלי שדרוג-ליבה — כך נוספו יכולות PM לאורך זמן." },
      ],
      takeawaysHe: [
        "המסע: R/3 → ECC 6.0 (+EHP) → S/4HANA (EAM על SAP HANA + Fiori).",
        "התהליכים העסקיים נשמרים; ה-UX והביצועים השתנו.",
        "בעת מעבר — בדוק את ה-Simplification List ל-PM.",
      ],
      relatedHe: [
        { labelHe: "PMU · אסטרטגיות תחזוקה (1.3)", href: "/library/pmu/chapter-01/#sub-1.3" },
        { labelHe: "PMU · מערכת SAP S/4HANA (1.5)", href: "/library/pmu/chapter-01/#sub-1.5" },
      ],
    },
    // ============================================================ 1.5
    {
      id: "1.5",
      titleHe: "מערכת היישומים SAP S/4HANA",
      titleEn: "SAP S/4HANA Application System",
      execHe:
        "SAP S/4HANA היא חבילת-ה-ERP הדור-הבא של SAP, הבנויה על בסיס-הנתונים SAP HANA (in-memory) ועל חוויית-המשתמש SAP Fiori. עבור Plant Maintenance/EAM היא הפלטפורמה שעליה רצים כל התהליכים — מהקמת-נכסים ועד דיווח-וניתוח. המשתמש-העסקי לא 'מתקין' אותה אך עובד בתוכה מדי יום.",
      beginnerHe:
        "SAP S/4HANA היא 'המערכת הגדולה' שמנהלת את כל הארגון — כספים, רכש, ייצור, ותחזוקת-מפעל. כמשתמש-תחזוקה, אתה נכנס אליה (לרוב דרך הדפדפן ל-SAP Fiori) ומבצע את העבודה: פותח הודעות, מטפל בהזמנות-עבודה, מחפש ציוד. הפרק מציג מהי המערכת ומה מרכיב אותה.",
      consultantHe:
        "S/4HANA = Simplified Business Suite על HANA. מאפיינים: מודל-נתונים מצומצם (Code Pushdown, CDS Views, ביטול redundant aggregates), Universal Journal (ACDOCA) ב-Finance, ארכיטקטורת Fiori (UI5 + OData). פריסה: On-Premise, Private Cloud (RISE), או Public Cloud — לכל אחת השלכות על היקף-ההתאמה. ל-PM/EAM הליבה זהה בכל הפריסות; ההבדל בעיקר במידת ה-extensibility.",
      purposeHe:
        "המטרה: להבין שכל פעולות-התחזוקה אינן 'תוכנה נפרדת' אלא חלק ממערכת-ארגונית אחת — ולכן הזמנת-עבודה משפיעה על מלאי-חלפים (MM), על עלויות (CO) ועל יומן (FI) באותה רשומה.",
      processExampleHe:
        "סגירת הזמנת-עבודה ב-S/4HANA: משיכת-חלף מעדכנת מיד את המלאי (MM), העלות נרשמת על ההזמנה (CO), והרישום הכספי נכנס ל-Universal Journal (FI) — הכול בזמן-אמת, על אותו בסיס-נתונים.",
      cbcHe:
        "ב-CBC: כשטכנאי מחליף ראש-מילוי ומושך אותו מהמחסן, S/4HANA מנכה מלאי-חלפים, מטעין את עלות-החלף על הזמנת-העבודה של קו-המילוי, ומאפשר למנהל לראות מיד את עלות-התחזוקה לקו — בלי דוח-לילה.",
      navHe: [
        "SAP Fiori Launchpad — נקודת-הכניסה המומלצת ב-S/4HANA",
        "SAP Logon (SAP GUI) ► מערכת S/4HANA ► SAP Easy Access",
        "SPRO ► SAP Reference IMG — שורש-ההגדרות של כל המערכת",
      ],
      tables: ["ACDOCA", "AUFK", "EQUI", "IFLOT"],
      tcodes: ["SPRO", "IW31", "IE03"],
      fiori: ["F2913", "F0842"],
      configHe: [
        "מקטע-מסגרת; ההגדרות הספציפיות ל-PM יושבות ב-SPRO ► Plant Maintenance and Customer Service.",
        "בחירת מודל-פריסה (On-Premise / Cloud) קובעת את היקף ה-extensibility וההתאמות.",
      ],
      mistakesHe: [
        "תפיסת PM כמערכת 'מבודדת' — בפועל היא משולבת ב-MM/CO/FI על אותו בסיס.",
        "ניסיון לעבוד 'כמו ב-ECC' בלי לנצל את ה-real-time וה-CDS Views של S/4HANA.",
      ],
      troubleshootHe: [
        "עלות לא מופיעה בדוח-CO ➔ ודא שההזמנה משויכת ל-Cost Center/Settlement Rule נכון.",
        "משיכת-חלף לא עדכנה מלאי ➔ בדוק תנועת-MM (Goods Movement) שנקשרה להזמנה.",
      ],
      bestPracticeHe: [
        "נצל את האינטגרציה — אל תנהל חלפים/עלויות ב'צד'.",
        "העדף Fiori Launchpad כנקודת-כניסה אחידה לכל התפקידים.",
      ],
      interviewHe: [
        { qHe: "על מה בנויה SAP S/4HANA?", aHe: "על בסיס-הנתונים In-Memory בשם SAP HANA, עם חוויית-משתמש SAP Fiori; מודל-הנתונים מפושט (Simplification) לעומת ECC." },
        { qHe: "מדוע PM/EAM אינו 'תוכנה נפרדת'?", aHe: "הוא משולב במערכת-ה-ERP האחת — הזמנת-עבודה נוגעת ב-MM (חלפים), CO (עלות) ו-FI (יומן) באותה עסקה ובזמן-אמת." },
      ],
      takeawaysHe: [
        "S/4HANA = ERP על SAP HANA + SAP Fiori.",
        "PM/EAM משולב ב-MM/CO/FI על בסיס-נתונים אחד.",
        "פעולות-תחזוקה משפיעות מיד על מלאי, עלות ויומן.",
      ],
      relatedHe: [
        { labelHe: "PMU · PM לאורך זמן ב-SAP (1.4)", href: "/library/pmu/chapter-01/#sub-1.4" },
        { labelHe: "PMU · בסיס הנתונים SAP HANA (1.6)", href: "/library/pmu/chapter-01/#sub-1.6" },
      ],
      children: [
        {
          id: "1.5.1",
          titleHe: "סקירת SAP S/4HANA",
          titleEn: "SAP S/4HANA Overview",
          execHe:
            "SAP S/4HANA מאחדת תהליכים עסקיים (Finance, Logistics, Manufacturing, Asset Management) במערכת אחת על SAP HANA. עיקרון-העל: 'Simplification' — פחות טבלאות-עזר, חישוב בזמן-אמת, וחוויית-משתמש מודרנית. למשתמש-תחזוקה זו הסיבה שדוחות רצים מיד וש-מסכי-Fiori תפקידיים.",
          beginnerHe:
            "במשפט: S/4HANA היא הגרסה החדשה של מערכת-ה-ERP של SAP, מהירה יותר ופשוטה יותר לשימוש. תחזוקת-המפעל היא אחד מהתחומים שרצים בתוכה. אין צורך להבין את כל המערכת — רק את החלק הרלוונטי לך.",
          consultantHe:
            "מאפייני-מפתח: Universal Journal (ACDOCA) מאחד FI/CO; ביטול טבלאות-aggregate/index ב-Logistics (חישוב on-the-fly); CDS Views ו-Embedded Analytics; Business Partner כאובייקט-לקוח/ספק מרכזי; Fiori 3 כ-UX. גרסאות-פריסה משפיעות על מחזור-שדרוגים ועל extensibility (In-App מול Side-by-Side ב-BTP).",
          purposeHe:
            "המטרה: לתת תמונת-על — שהמשתמש יבין שהוא חלק ממערכת רחבה, וש'פשטות' אינה שטחיות אלא איחוד וייעול.",
          processExampleHe:
            "דוח עלות-תחזוקה לפי ציוד נשען על Universal Journal ו-CDS View — מתקבל בזמן-אמת בלי הרצת-לילה, ישירות באפליקציית Fiori אנליטית.",
          cbcHe:
            "ב-CBC: מנהל-תחזוקה רואה לוח-מחוונים (Dashboard) חי של זמינות קווי-המילוי ושל עלות-תחזוקה לקו — נתונים שמתעדכנים תוך כדי המשמרת בזכות SAP HANA.",
          navHe: [
            "SAP Fiori Launchpad ► Overview / Analytical pages",
            "SAP S/4HANA ► Asset Management — ה-LoB של תחזוקת-מפעל",
          ],
          tables: ["ACDOCA", "AUFK", "EQUI"],
          tcodes: ["SPRO", "IW33"],
          fiori: ["F0842", "F2913"],
          configHe: [
            "מקטע-סקירה; ההגדרות נלמדות בפרקי-ההמשך. נקודת-המוצא היא תפקיד-המשתמש (Business Role) שקובע את ה-Launchpad.",
          ],
          mistakesHe: [
            "ציפייה ל'מודול נפרד' — S/4HANA היא מערכת מאוחדת.",
            "אי-הקצאת Business Role נכון — המשתמש לא רואה את האפליקציות שלו.",
          ],
          troubleshootHe: [
            "ה-Launchpad ריק ➔ בדוק הקצאת Business Role / Catalog למשתמש.",
            "דוח אנליטי לא נטען ➔ הרשאות ל-CDS View / OData service חסרות.",
          ],
          bestPracticeHe: [
            "התחל מהבנת תפקידך (Role) ומה-אפליקציות שהוקצו לך.",
            "השתמש בעמודי-Overview לקבלת תמונת-מצב לפני צלילה לפרטים.",
          ],
          interviewHe: [
            { qHe: "מהו עיקרון ה-Simplification ב-S/4HANA?", aHe: "צמצום טבלאות-עזר וחישוב בזמן-אמת על SAP HANA, יחד עם איחוד (Universal Journal) ו-UX מודרני — פחות יתירוּת, יותר מהירות." },
          ],
          takeawaysHe: [
            "S/4HANA מאחדת תחומים במערכת אחת על SAP HANA.",
            "Simplification = איחוד + בזמן-אמת + UX מודרני.",
            "PM/EAM הוא LoB אחד בתוך המערכת.",
          ],
        },
        {
          id: "1.5.2",
          titleHe: "Enhancement Packages",
          titleEn: "Enhancement Packages",
          execHe:
            "Enhancement Packages (EHP) הם מנגנון שבו SAP סיפקה פונקציונליות חדשה ל-SAP ECC 6.0 בלי שדרוג-ליבה — הלקוח הפעיל סלקטיבית רק את מה שצריך (Switch Framework). הם רלוונטיים בעיקר להבנת ה'מורשת': ב-S/4HANA המודל השתנה לעדכונים תקופתיים (Feature Pack Stacks / Releases) במקום EHP.",
          beginnerHe:
            "פעם, כדי לקבל יכולת חדשה ב-SAP, לא היה צריך להחליף את כל המערכת — אפשר היה 'להדליק' תוספת (Enhancement Package). זה רלוונטי בעיקר אם הארגון עדיין על ECC. ב-S/4HANA העדכונים מגיעים אחרת, בגרסאות תקופתיות.",
          consultantHe:
            "ב-ECC 6.0 EHP1–EHP8 הוסיפו Business Functions הניתנות להפעלה דרך Switch Framework (SFW5) — הפעלה היא לרוב חד-כיוונית ויש לבחון תלות והשפעה. ב-S/4HANA אין EHP; במקום זאת Releases שנתיים (On-Premise) או עדכונים תכופים (Cloud) עם Feature Pack Stacks. הבנת ההיסטוריה חשובה לזיהוי פונקציות-PM שהופעלו ב-ECC ויש לוודא את מקבילתן ב-S/4HANA.",
          purposeHe:
            "המטרה: להסביר כיצד התווספו יכולות-PM לאורך חיי-ECC, וכיצד מודל-העדכון השתנה ב-S/4HANA — חשוב בעיקר בהקשר מעבר-מערכת.",
          processExampleHe:
            "ארגון על ECC הפעיל Business Function של PM כדי לקבל שיפור בדיווח-זמני-טכנאי. במעבר ל-S/4HANA הצוות בודק שהפונקציה המקבילה קיימת/מופעלת בסטנדרט החדש.",
          cbcHe:
            "ב-CBC: אם בעבר הופעלה תוספת-PM ב-ECC לתמיכה בקריאות-ציוד מסוימות, צוות-המעבר ל-S/4HANA מוודא שהתהליך נתמך מקורית, כדי לא לאבד יכולת בקווי-המילוי.",
          navHe: [
            "SAP GUI (ECC) ► SFW5 — Switch Framework Customizing (הפעלת Business Functions)",
            "S/4HANA ► מסמכי Release Information / What's New — מחליפים את מודל-ה-EHP",
          ],
          tables: ["TPFET", "TPFHT"],
          tcodes: ["SFW5", "SFW1"],
          fiori: [],
          configHe: [
            "ECC: הפעלת Business Function ב-SFW5 — לרוב בלתי-הפיכה; דורשת בדיקת-תלות והשפעה.",
            "S/4HANA: אין EHP; עדכונים דרך Releases / Feature Pack Stacks — מנוהל בתחזוקת-מערכת ולא בהפעלת-מתגים.",
          ],
          mistakesHe: [
            "הנחה ש-EHP קיים ב-S/4HANA — שם המודל שונה (Releases).",
            "הפעלת Business Function ב-ECC בלי בדיקת-השפעה — שינוי חד-כיווני.",
          ],
          troubleshootHe: [
            "פונקציית-PM שהייתה ב-ECC 'נעלמה' ב-S/4HANA ➔ בדוק אם הפכה לסטנדרט או דורשת הפעלה אחרת.",
            "Business Function לא ניתנת לביטול ➔ הפעלה ב-SFW5 לרוב בלתי-הפיכה — תכנן מראש.",
          ],
          bestPracticeHe: [
            "תַעֵד אילו Business Functions הופעלו ב-ECC לפני מעבר.",
            "ב-S/4HANA עקוב אחר What's New לכל Release במקום לחפש EHP.",
          ],
          interviewHe: [
            { qHe: "מהם Enhancement Packages?", aHe: "מנגנון ב-ECC 6.0 להוספת פונקציונליות חדשה בלי שדרוג-ליבה, באמצעות הפעלת Business Functions סלקטיבית (Switch Framework)." },
            { qHe: "האם יש EHP ב-S/4HANA?", aHe: "לא; ב-S/4HANA העדכונים מגיעים כ-Releases (On-Premise) או Feature Pack Stacks תכופים (Cloud) במקום Enhancement Packages." },
          ],
          takeawaysHe: [
            "EHP = הוספת יכולות ל-ECC בלי שדרוג-ליבה (Switch Framework).",
            "הפעלת Business Function ב-SFW5 לרוב חד-כיוונית.",
            "ב-S/4HANA המודל הוא Releases / Feature Packs — אין EHP.",
          ],
        },
      ],
    },
    // ============================================================ 1.6
    {
      id: "1.6",
      titleHe: "בסיס הנתונים SAP HANA",
      titleEn: "SAP HANA Database",
      execHe:
        "SAP HANA הוא בסיס-הנתונים ה-in-memory שעליו רצה SAP S/4HANA. במקום לקרוא נתונים מדיסק, הם יושבים בזיכרון ומאוחסנים לפי-עמודות (columnar) — מה שמאיץ דרמטית שאילתות וניתוחים. עבור תחזוקת-מפעל זו הסיבה שדוחות-היסטוריה, ניתוחי-תקלות ולוחות-מחוונים מתקבלים בזמן-אמת.",
      beginnerHe:
        "כל מערכת שומרת נתונים איפשהו. SAP HANA הוא ה'מחסן' המהיר במיוחד של SAP — הוא מחזיק את הנתונים בזיכרון, ולכן חיפושים ודוחות מהירים מאוד. כמשתמש לא תיגע בו ישירות, אבל תרגיש אותו: דוחות שפעם לקחו דקות, רצים בשניות.",
      consultantHe:
        "מאפיינים: In-Memory column store, דחיסה גבוהה, עיבוד מקבילי, ו-Code Pushdown — הזזת לוגיקה (חישוב/aggregation) לשכבת-ה-DB דרך CDS Views ו-AMDP. כך התייתרו טבלאות-aggregate/index רבות ב-S/4HANA (למשל בלוגיסטיקה). ל-PM זה אומר שדוחות על AUFK/VIQMEL/EQUI ו-Measuring Documents (IMRG) רצים ישירות מול הנתונים התפעוליים בזמן-אמת.",
      purposeHe:
        "המטרה: להסביר מקור-המהירות. כשמשתמש מבין ש-HANA מאפשר ניתוח בזמן-אמת, הוא יכול לסמוך על דוחות-חיים לקבלת-החלטה ולא להמתין להרצות-לילה.",
      processExampleHe:
        "מנהל-תחזוקה שואל 'אילו 5 פריטי-ציוד גרמו לרוב ההשבתות החודש?'. ב-HANA השאילתה רצה ישירות על נתוני-ההודעות בזמן-אמת ומחזירה תשובה מיידית — בסיס להחלטת-תעדוף.",
      cbcHe:
        "ב-CBC: ניתוח MTBF/MTTR (זמן-בין-תקלות / זמן-תיקון) למכונות-המילוי רץ על SAP HANA ומוצג בלוח-מחוונים חי; המנהל מזהה מיד את הקו הבעייתי במשמרת הנוכחית.",
      navHe: [
        "SAP Fiori Launchpad ► Analytical apps (KPIs בזמן-אמת המבוססים על HANA)",
        "S/4HANA ► Embedded Analytics — CDS Views הרצים ישירות מול SAP HANA",
      ],
      tables: ["IMRG", "VIQMEL", "AUFK", "EQUI"],
      tcodes: ["IW28", "IW38", "IK17"],
      fiori: ["F2962", "F0842"],
      configHe: [
        "מקטע-תשתית; אין הגדרת-PM ישירה. ביצועי-הדוחות נשענים על CDS Views ו-Embedded Analytics של S/4HANA.",
      ],
      mistakesHe: [
        "המשך הסתמכות על דוחות-batch ליליים כש-HANA מאפשר זמן-אמת.",
        "בניית aggregates ידניים מיותרים — HANA מחשב on-the-fly.",
      ],
      troubleshootHe: [
        "דוח 'איטי' למרות HANA ➔ ייתכן CDS View לא-אופטימלי או הרשאות מגבילות; בדוק מול צוות-Basis.",
        "נתון לא מעודכן בדוח 'בזמן-אמת' ➔ ודא שמדובר ב-Analytical app מבוסס-CDS ולא בדוח-batch ישן.",
      ],
      bestPracticeHe: [
        "סמוך על דוחות-חיים לקבלת-החלטה תפעולית.",
        "השתמש באפליקציות אנליטיות מובנות במקום ייצוא ל-Excel.",
      ],
      interviewHe: [
        { qHe: "מה מייחד את SAP HANA?", aHe: "בסיס-נתונים In-Memory עם אחסון לפי-עמודות (columnar) ו-Code Pushdown — מאיץ שאילתות וניתוחים בזמן-אמת ומייתר טבלאות-aggregate רבות." },
        { qHe: "כיצד HANA משפיע על תחזוקת-מפעל?", aHe: "דוחות-היסטוריה, ניתוחי-תקלות ו-KPIs (MTBF/MTTR) רצים בזמן-אמת מול הנתונים התפעוליים, בלי הרצות-לילה." },
      ],
      takeawaysHe: [
        "SAP HANA = בסיס-נתונים In-Memory, columnar, של S/4HANA.",
        "Code Pushdown + CDS = חישוב בזמן-אמת, פחות aggregates.",
        "ל-PM: דוחות וניתוחי-תקלות מיידיים.",
      ],
      relatedHe: [
        { labelHe: "PMU · מערכת SAP S/4HANA (1.5)", href: "/library/pmu/chapter-01/#sub-1.5" },
        { labelHe: "PMU · ממשקי משתמש (1.7)", href: "/library/pmu/chapter-01/#sub-1.7" },
      ],
    },
    // ============================================================ 1.7
    {
      id: "1.7",
      titleHe: "ממשקי משתמש",
      titleEn: "User Interfaces",
      execHe:
        "ב-SAP S/4HANA יש שלוש דרכים עיקריות לעבוד מול המערכת: SAP GUI (הקלאסי, עתיר-מסכים), SAP Business Client (מעטפת שמאחדת GUI ו-Web), ו-SAP Fiori (המודרני, מבוסס-תפקיד וריצת-דפדפן). המשתמש-העסקי בתחזוקה ייתקל בכולם, ויעדיף לרוב את SAP Fiori לפעולות-שטח ואת SAP GUI למשימות-עומק.",
      beginnerHe:
        "אותה מערכת, אבל שלושה 'חלונות' להיכנס דרכם. SAP GUI = המסכים הוותיקים, מלאי-שדות, חזקים אך פחות יפים. SAP Fiori = מסכים חדשים, נקיים, רצים בדפדפן וגם בנייד — נוחים לדיווח מהיר. SAP Business Client = תוכנה שמאחדת את שניהם בחלון אחד. לא חייבים לבחור — לרוב משתמשים בכמה לפי המשימה.",
      consultantHe:
        "SAP GUI (for Windows / Java / HTML) — דיאלוג-מבוסס-Dynpro, מלא לכל העסקאות. SAP Business Client (NWBC) — מעטפת-Desktop המארחת Transactions ו-Web Dynpro / Fiori תחת תפריט-PFCG אחיד. SAP Fiori — UI5/OData, Role-Based, Launchpad, responsive; ב-S/4HANA הוא ה-UX המוביל ומחליף תרחישי-GUI רבים. אסטרטגיית-UX לפי תפקיד: Casual users → Fiori; Power/configuration users → GUI; ארגונים בתקופת-מעבר → Business Client.",
      purposeHe:
        "המטרה: שהמשתמש ידע איזה כלי מתאים למשימה — ולא יתקע ב-GUI כשיש אפליקציית-Fiori מהירה, או יחפש ב-Fiori עסקת-קונפיגורציה ששייכת ל-GUI.",
      processExampleHe:
        "טכנאי-שטח מדווח תקלה דרך אפליקציית SAP Fiori מהנייד (שתי הקשות + תמונה). אותו ארגון משתמש ב-SAP GUI כשמתכנן-בכיר עורך Task List מורכבת עם מאות שדות. שני הכלים — אותה מערכת.",
      cbcHe:
        "ב-CBC: מפעילי-הקו מדווחים תקלות ב-SAP Fiori מטאבלט ליד המכונה; מתכנן-התחזוקה במשרד עובד ב-SAP GUI לתחזוקת מבני-נכסים ותוכניות; בתקופת-המעבר חלקם נכנסים דרך SAP Business Client שמאחד את שניהם.",
      navHe: [
        "SAP Logon ► SAP GUI ► SAP Easy Access",
        "SAP Business Client ► תפריט-תפקיד (PFCG roles) ► Transactions / Apps",
        "דפדפן ► SAP Fiori Launchpad ► קבוצות/קטלוגים לפי תפקיד",
      ],
      tables: ["AGR_1251", "USOBT"],
      tcodes: ["SU01", "PFCG", "/UI2/FLP"],
      fiori: ["F2913", "F2929"],
      configHe: [
        "Business Roles / PFCG roles קובעים אילו עסקאות-GUI ואילו אפליקציות-Fiori המשתמש רואה.",
        "Fiori Launchpad Content (Catalogs/Groups/Spaces) — מנוהל מרכזית; קובע את חוויית-המשתמש.",
      ],
      flow: [
        { he: "כניסת-משתמש לפי תפקיד", note: "Business Role" },
        { he: "בחירת ממשק לפי המשימה", note: "GUI / Business Client / Fiori" },
        { he: "ביצוע פעולת-תחזוקה", note: "אותו תהליך-עסקי בבסיס" },
      ],
      mistakesHe: [
        "שימוש ב-SAP GUI לדיווח-שטח יומיומי במקום באפליקציית Fiori מהירה.",
        "ציפייה למצוא כל עסקת-קונפיגורציה ב-Fiori — חלקן נותרו ב-SAP GUI.",
        "הקצאת-תפקידים לקויה — המשתמש 'לא רואה' את הכלי שהוא צריך.",
      ],
      troubleshootHe: [
        "אפליקציית-Fiori לא מופיעה ➔ בדוק Catalog/Group ו-Business Role למשתמש.",
        "עסקת-GUI חסומה ➔ הרשאות PFCG; בדוק עם SU53.",
      ],
      bestPracticeHe: [
        "התאם ממשק למשימה: Fiori לשטח, GUI לעומק, Business Client למעבר.",
        "נהל גישה דרך Roles אחידים, לא ידנית למשתמש.",
      ],
      interviewHe: [
        { qHe: "מהם שלושת ממשקי-המשתמש העיקריים ב-S/4HANA?", aHe: "SAP GUI (קלאסי), SAP Business Client (מעטפת מאחדת), ו-SAP Fiori (מודרני, מבוסס-תפקיד וריצת-דפדפן/נייד)." },
        { qHe: "מתי תעדיף Fiori על GUI?", aHe: "לפעולות-שטח יומיומיות ומהירות (דיווח-תקלה, אישור-עבודה); GUI עדיף למשימות-עומק עתירות-שדות וקונפיגורציה." },
      ],
      takeawaysHe: [
        "שלושה ממשקים, מערכת אחת: SAP GUI / SAP Business Client / SAP Fiori.",
        "Fiori = שטח ומהירות; GUI = עומק; Business Client = מעבר/איחוד.",
        "הגישה נקבעת לפי Business Role.",
      ],
      relatedHe: [
        { labelHe: "PMU · בסיס הנתונים SAP HANA (1.6)", href: "/library/pmu/chapter-01/#sub-1.6" },
        { labelHe: "PMU · סיכום (1.8)", href: "/library/pmu/chapter-01/#sub-1.8" },
      ],
      children: [
        {
          id: "1.7.1",
          titleHe: "SAP GUI",
          titleEn: "SAP GUI",
          execHe:
            "SAP GUI (Graphical User Interface) הוא הממשק הקלאסי של SAP — תוכנת-שולחן (SAP Logon) המציגה את מסכי-העסקאות (Dynpro) המוכרים מ-ECC. הוא נותן גישה מלאה לכל פונקציה ולכל שדה, ולכן מועדף למשימות-עומק ולקונפיגורציה, גם ב-S/4HANA.",
          beginnerHe:
            "SAP GUI הם 'המסכים הירוקים/האפורים' הוותיקים. נכנסים דרך תוכנת SAP Logon, מקלידים קוד-עסקה (כמו IW31) ומגיעים למסך עם הרבה שדות. זה חזק ומלא, אך פחות ידידותי לטלפון. מתכננים ומשתמשים-מנוסים אוהבים אותו כי 'הכול שם'.",
          consultantHe:
            "וריאנטים: SAP GUI for Windows (הנפוץ), for Java, ו-SAP GUI for HTML (Webgui) דרך ITS. מבוסס-Dynpro/SAPGUI protocol (DIAG). ב-S/4HANA נשמר לתאימות ולמשימות שאין להן מקבילת-Fiori (חלק מהקונפיגורציה, עסקאות-עומק). ניהול-גישה דרך PFCG; בדיקת-הרשאות SU53/ST01.",
          purposeHe:
            "המטרה: גישה מלאה ומדויקת לכל עסקה ושדה — חיוני למתכננים, ל-power users ולמטלות-קונפיגורציה.",
          processExampleHe:
            "מתכנן יוצר Task List תחזוקתית מורכבת (IA01) עם עשרות פעולות, מרכזי-עבודה וחלפים — מסך עתיר-שדות שנוח לבצע ב-SAP GUI.",
          cbcHe:
            "ב-CBC: בניית רשימת-משימות-תחזוקה לקו-מילוי שלם, על כל פעולותיה, נעשית ב-SAP GUI במשרד-התכנון — מקום שבו הרוחב והשליטה חשובים יותר מהפשטות.",
          navHe: [
            "SAP Logon ► בחירת מערכת ► SAP Easy Access ► שדה-עסקה (למשל IW31)",
            "SAP GUI for HTML (Webgui) ► גישה דרך דפדפן למסכי-Dynpro",
          ],
          tables: ["TSTC", "AGR_1251"],
          tcodes: ["SU01", "PFCG", "IA01", "SU53"],
          fiori: [],
          configHe: [
            "התקנת SAP GUI for Windows ב-Desktop, או SAP GUI for HTML ללא-התקנה דרך דפדפן.",
            "גישה לעסקאות נשלטת ב-PFCG (Authorization Objects), ללא קשר לממשק.",
          ],
          mistakesHe: [
            "שימוש ב-GUI לכל פעולה — מפספסים את המהירות של Fiori לדיווח-שטח.",
            "התעלמות מ-SU53 בעת חסימת-עסקה — מאבדים אבחון-הרשאה מהיר.",
          ],
          troubleshootHe: [
            "עסקה לא נפתחת ➔ הרשאת-PFCG חסרה; הרץ SU53 מיד לאחר השגיאה.",
            "SAP GUI איטי ➔ בדוק חיבור-רשת/הגדרות; לחלופין נסה Webgui.",
          ],
          bestPracticeHe: [
            "שמור את SAP GUI למשימות-עומק וקונפיגורציה.",
            "השתמש ב-SU53 לאבחון-הרשאות בזמן-אמת.",
          ],
          interviewHe: [
            { qHe: "מהו SAP GUI ומתי משתמשים בו?", aHe: "הממשק הקלאסי מבוסס-Dynpro (דרך SAP Logon) הנותן גישה מלאה לכל עסקה ושדה; מועדף למשימות-עומק וקונפיגורציה, גם ב-S/4HANA." },
          ],
          takeawaysHe: [
            "SAP GUI = הממשק הקלאסי, מלא ועתיר-שדות.",
            "וריאנטים: Windows / Java / HTML (Webgui).",
            "מועדף למתכננים, power users וקונפיגורציה.",
          ],
        },
        {
          id: "1.7.2",
          titleHe: "SAP Business Client",
          titleEn: "SAP Business Client",
          execHe:
            "SAP Business Client (לשעבר NWBC) הוא מעטפת-שולחן (shell) המאחדת תחת חלון אחד גם עסקאות SAP GUI וגם תוכן-Web (Web Dynpro / SAP Fiori), עם תפריט-ניווט מבוסס-תפקיד (PFCG). הוא מגשר בין העולם הקלאסי למודרני, ושימושי במיוחד בתקופות-מעבר.",
          beginnerHe:
            "תאר תוכנה אחת שבתוכה רואים גם את המסכים הישנים וגם את המסכים החדשים, עם תפריט מסודר בצד לפי התפקיד שלך. זה SAP Business Client — 'מטרייה' שמרכזת הכול במקום אחד, כדי שלא תצטרך לדלג בין תוכנות.",
          consultantHe:
            "ארכיטקטורה: Desktop shell המארח DIAG (SAP GUI) ו-Browser-content (Web Dynpro ABAP, Fiori) עם תפריט נגזר-PFCG (Role-Based). מספק חוויית-משתמש אחידה לפני אימוץ-מלא של Fiori Launchpad. ב-S/4HANA רבים מעדיפים את Fiori Launchpad כיעד-הסופי, ו-Business Client משמש כשלב-ביניים או היכן שנחוצה תערובת-תוכן.",
          purposeHe:
            "המטרה: לתת חלון-עבודה אחד למשתמש שצריך גם עסקאות-GUI וגם אפליקציות-Web — בלי לקפוץ בין סביבות.",
          processExampleHe:
            "משתמש פותח את Business Client, ובוחר מהתפריט-בצד גם עסקת-GUI (IW33 להצגת-הזמנה) וגם אפליקציית-Web — הכול בחלון אחד, תחת זהות-התחברות אחת.",
          cbcHe:
            "ב-CBC בתקופת-המעבר ל-S/4HANA: מתכנני-תחזוקה עובדים ב-SAP Business Client כדי לגשת גם למסכי-GUI הוותיקים שהם מכירים וגם לאפליקציות-Fiori החדשות — מעטפת אחת מקלה על האימוץ.",
          navHe: [
            "SAP Business Client (Desktop) ► תפריט-תפקיד (PFCG) ► Transactions / Web apps",
            "הגדרת Connection ל-S/4HANA backend בתוך Business Client",
          ],
          tables: ["AGR_1251", "AGR_HIER"],
          tcodes: ["PFCG", "SU01"],
          fiori: [],
          configHe: [
            "התוכן והתפריט נגזרים מ-PFCG Roles (Navigation Targets) — ניהול-גישה זהה לשאר הממשקים.",
            "הגדרת חיבורים למערכות-Backend בתוך ה-Client.",
          ],
          mistakesHe: [
            "השקעה ב-Business Client כיעד-סופי במקום במעבר ל-Fiori Launchpad.",
            "תפריט-תפקיד לא-מתוחזק ➔ המשתמש לא מוצא את היישומים.",
          ],
          troubleshootHe: [
            "תוכן לא מופיע בתפריט ➔ בדוק Role/Navigation Targets ב-PFCG.",
            "אפליקציית-Web לא נטענת ב-Client ➔ בדוק חיבור/הרשאות ל-backend.",
          ],
          bestPracticeHe: [
            "השתמש ב-Business Client כשלב-מעבר; כוון ל-Fiori Launchpad כיעד.",
            "תחזק תפריטי-תפקיד מסודרים כדי לפשט ניווט.",
          ],
          interviewHe: [
            { qHe: "מהו SAP Business Client?", aHe: "מעטפת-שולחן המאחדת עסקאות SAP GUI ותוכן-Web/Fiori תחת חלון ותפריט-תפקיד אחד (PFCG); שימושי בתקופות-מעבר ל-S/4HANA." },
          ],
          takeawaysHe: [
            "SAP Business Client = מעטפת המאחדת GUI + Web/Fiori.",
            "תפריט מבוסס-תפקיד (PFCG).",
            "מתאים כשלב-מעבר; היעד הוא Fiori Launchpad.",
          ],
        },
        {
          id: "1.7.3",
          titleHe: "SAP Fiori",
          titleEn: "SAP Fiori",
          execHe:
            "SAP Fiori הוא ה-UX המודרני של SAP S/4HANA: אוסף אפליקציות מבוססות-תפקיד (role-based), נקיות ו-responsive, הרצות בדפדפן ובנייד דרך Fiori Launchpad. הוא מתמקד במשימה הספציפית של המשתמש — מעט שדות, הרבה הקשר — ולכן אידיאלי לדיווח-תחזוקה מהיר מהשטח.",
          beginnerHe:
            "SAP Fiori הם המסכים החדשים, היפים והפשוטים. נכנסים אליהם דרך דפדפן (Fiori Launchpad) ורואים 'אריחים' (Tiles) לכל פעולה — 'דווח תקלה', 'הזמנות-העבודה שלי' וכו'. כל אפליקציה עושה דבר אחד בבירור, ועובדת גם מהטלפון או הטאבלט.",
          consultantHe:
            "טכנולוגיה: SAPUI5 (Frontend) + OData/CDS (Backend), Launchpad (Spaces/Pages, Catalogs, Groups), עיצוב לפי Fiori Design Guidelines. סוגי-אפליקציה: Transactional, Analytical (KPIs מ-HANA), ו-Fact Sheets (Search). ל-EAM יש ספריית-אפליקציות עשירה (Create Maintenance Request, Find Technical Objects, Manage Maintenance Plans). גישה נשלטת ב-Business Roles/Catalogs; אבחון דרך /UI2/FLP ו-Fiori App Support.",
          purposeHe:
            "המטרה: לפשט ולמקד — לאפשר למשתמש-העסקי לבצע את משימתו במהירות, מכל מכשיר, בלי לנווט במסכים עתירי-שדות.",
          processExampleHe:
            "מפעיל פותח אריח 'Report Malfunction' ב-Fiori מהטאבלט, בוחר את ה-Equipment, מתאר את התקלה, מצרף תמונה — והודעת-התחזוקה נוצרת ונשלחת למתכנן תוך פחות מדקה.",
          cbcHe:
            "ב-CBC: ליד כל מכונת-מילוי טאבלט עם Fiori Launchpad מותאם-תפקיד; המפעיל מדווח דליפה באריח ייעודי, והמתכנן רואה אותה מיד ב-'My Maintenance Requests' — דיווח-שטח מהיר שמקצר זמן-תגובה.",
          navHe: [
            "דפדפן ► SAP Fiori Launchpad ► Spaces/Pages ► קבוצות לפי תפקיד",
            "SAP Fiori ► Maintenance Management ► Create Maintenance Request / Report Malfunction / Find Technical Objects",
            "ניהול: /UI2/FLPD_CUST (Launchpad Designer) ► Catalogs/Groups",
          ],
          tables: ["VIQMEL", "AUFK", "EQUI", "IFLOT"],
          tcodes: ["/UI2/FLP", "/UI2/FLPD_CUST"],
          fiori: ["F2913", "F2929", "F4072", "F2962"],
          configHe: [
            "תוכן-Launchpad: Catalogs/Groups/Spaces & Pages מוקצים ל-Business Roles.",
            "אפליקציות-PM/EAM זמינות בספריית-Fiori (Fiori Apps Reference Library) לפי Role.",
            "אבחון: Fiori App Support, ובדיקת OData/CDS וההרשאות הנלוות.",
          ],
          flow: [
            { he: "כניסה ל-Fiori Launchpad", note: "דפדפן/נייד" },
            { he: "בחירת אריח-משימה", note: "Report Malfunction" },
            { he: "מילוי מינימלי + צירוף תמונה", note: "Equipment + תיאור" },
            { he: "יצירת Notification בזמן-אמת", code: "VIQMEL" },
          ],
          mistakesHe: [
            "חיפוש עסקת-קונפיגורציה ב-Fiori — חלקה נותרה ב-SAP GUI.",
            "אי-התאמת Launchpad לתפקיד ➔ עומס-אריחים או היעדר-אריחים רלוונטיים.",
          ],
          troubleshootHe: [
            "אריח 'אדום'/שגיאה ➔ בדוק OData service ו-Catalog assignment.",
            "אפליקציה חסרה ב-Launchpad ➔ Business Role/Catalog לא הוקצה; בדוק עם Fiori App Support.",
          ],
          bestPracticeHe: [
            "התאם Launchpad לתפקיד — רק האריחים הדרושים למשתמש.",
            "העדף Fiori לכל פעולת-שטח יומיומית בתחזוקה.",
            "השתמש ב-Fiori Apps Reference Library לזיהוי האפליקציה הנכונה.",
          ],
          interviewHe: [
            { qHe: "מהו SAP Fiori?", aHe: "ה-UX המודרני של S/4HANA — אפליקציות מבוססות-תפקיד, responsive, הרצות בדפדפן/נייד דרך Launchpad, בנויות על SAPUI5 ו-OData/CDS." },
            { qHe: "אילו סוגי אפליקציות-Fiori קיימים?", aHe: "Transactional (ביצוע פעולות), Analytical (KPIs בזמן-אמת מ-HANA), ו-Fact Sheets (חיפוש והצגת אובייקט)." },
          ],
          takeawaysHe: [
            "SAP Fiori = UX מודרני, מבוסס-תפקיד, ריצת-דפדפן/נייד.",
            "טכנולוגיה: SAPUI5 + OData/CDS, מנוהל ב-Launchpad.",
            "אידיאלי לדיווח-תחזוקה מהיר מהשטח.",
          ],
        },
      ],
    },
    // ============================================================ 1.8
    {
      id: "1.8",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה הניח את התשתית המושגית למדריך-המשתמש של Plant Maintenance: מדוע תחזוקה מודרנית דורשת פלטפורמה חדשה, מהו המינוח העדכני (PM → EAM, Notification, Order, Functional Location, Equipment), כיצד התפתחו אסטרטגיות-התחזוקה, ועל אילו רכיבים טכנולוגיים — SAP S/4HANA, SAP HANA, ושלושת ממשקי-המשתמש — נשען המשתמש בעבודתו היומית.",
      beginnerHe:
        "מה למדנו: תחזוקת-מפעל היא הרבה יותר מתיקונים; ל-SAP יש שפה משלה (הודעות, הזמנות, מיקומים, ציוד); יש כמה גישות-תחזוקה; והכול רץ על מערכת מודרנית ומהירה (S/4HANA על HANA) שאליה נכנסים דרך שלושה ממשקים — GUI, Business Client ו-Fiori. עכשיו יש לך בסיס להמשך המדריך.",
      consultantHe:
        "סיכום-מיצוב: PM הורחב ל-EAM ב-S/4HANA; הליבה (Technical Objects, Notifications, Orders, Maintenance Plans) נשמרה, אך התשתית (SAP HANA), חוויית-המשתמש (Fiori), והאנליטיקה (CDS/Embedded) השתנו. אסטרטגיית-UX היא תפקידית: Fiori לשטח, GUI לעומק, Business Client למעבר. הבנת ההקשר ההיסטורי (R/3 → ECC+EHP → S/4HANA) חיונית לזיהוי-פערים בעת מעבר.",
      purposeHe:
        "המטרה: לקבע את מסגרת-הידע לפני הצלילה לתהליכים. משתמש שמבין את ה'למה' ואת ה'איפה' ילמד את ה'איך' של הפרקים הבאים מהר ובביטחון.",
      processExampleHe:
        "משתמש שסיים פרק זה יודע, מול בקשת-מנהל 'דווח תקלה ותכנן תיקון', לזהות שמדובר ב-Notification → Order, לבצע זאת ב-SAP Fiori מהשטח, ולהבין שהעלות תיזקף בזמן-אמת על אותה הזמנה.",
      cbcHe:
        "ב-CBC: עובד-תחזוקה חדש שקרא פרק זה מבין את 'מפת-העולם' — קווי-מילוי כ-Functional Locations, מכונות כ-Equipment, דיווח דרך Fiori, ומערכת אחת מהירה מאחורי הכול — ומוכן ללמוד את התהליכים המעשיים.",
      navHe: [
        "SAP Fiori Launchpad — נקודת-הכניסה היומיומית",
        "SAP Easy Access (SAP GUI) — למשימות-עומק",
        "SPRO ► Plant Maintenance and Customer Service — להמשך הלימוד הקונפיגורטיבי",
      ],
      tables: ["EQUI", "IFLOT", "VIQMEL", "AUFK"],
      tcodes: ["IW21", "IW31", "IE03", "IL03"],
      fiori: ["F2913", "F2929"],
      configHe: [
        "מקטע-סיכום ללא קונפיגורציה; הפרקים הבאים יעסקו בהקמת-נכסים, הודעות, הזמנות, ותחזוקה-מונעת תחת SPRO.",
      ],
      mistakesHe: [
        "מעבר לפרקים-מעשיים בלי הפנמת המינוח — מוביל לבלבול בהמשך.",
        "התעלמות מבחירת-הממשק הנכונה — פוגעת ביעילות היומיומית.",
      ],
      troubleshootHe: [
        "תחושת 'אבדתי במונחים' ➔ חזור ל-1.2 (מינוח) ול-1.7 (ממשקים) כבסיס.",
      ],
      bestPracticeHe: [
        "ודא שליטה במונחי-הליבה ובבחירת-הממשק לפני המעבר לפרקים-המעשיים.",
        "החזק את 'מפת-העולם' של S/4HANA/HANA/Fiori בראש בעת הלימוד.",
      ],
      interviewHe: [
        { qHe: "מהם רכיבי-התשתית שעליהם נשענת תחזוקת-מפעל ב-S/4HANA?", aHe: "מערכת-היישומים SAP S/4HANA, בסיס-הנתונים SAP HANA, ושלושת ממשקי-המשתמש: SAP GUI, SAP Business Client ו-SAP Fiori." },
        { qHe: "מהי תמצית המעבר מ-PM ל-EAM?", aHe: "אותה ליבה תהליכית בלבוש חדש: SAP HANA למהירות, SAP Fiori לפשטות, והרחבה לניהול-נכסים אסטרטגי — בלי לשנות את עקרונות-העבודה." },
      ],
      takeawaysHe: [
        "PM היום = ניהול-זמינות-נכסים (EAM) על פלטפורמה מודרנית.",
        "מינוח-ליבה: Notification, Order, Functional Location, Equipment.",
        "תשתית: SAP S/4HANA + SAP HANA; ממשקים: GUI / Business Client / Fiori.",
        "בחר ממשק לפי המשימה; הבן את ההקשר לפני התהליכים.",
      ],
      relatedHe: [
        { labelHe: "PMU · ממשקי משתמש (1.7)", href: "/library/pmu/chapter-01/#sub-1.7" },
        { labelHe: "PMU · תחזוקת מפעל כיום (1.1)", href: "/library/pmu/chapter-01/#sub-1.1" },
      ],
    },
  ],
};
