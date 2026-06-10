// ===== PM Digital Textbook — Chapter 5 (core learning chapter) =====
// Configuring the Work Order Cycle: Notifications, Orders, Confirmations.
// Every node is a complete LearningNode with 18 facets of authored Hebrew —
// transformative prose, SAP identifiers verbatim EN. Source hierarchy from the
// book preserved (5.1.x under 5.1, 5.2.x under 5.2, 5.3.x under 5.3).
import type { TextbookChapter } from "./types";

export const CH5: TextbookChapter = {
  n: 5,
  titleHe: "הגדרת מחזור פקודת-העבודה",
  titleEn: "Configuring the Work Order Cycle",
  introHe:
    "פרק זה הוא יחידת-הליבה של קונפיגורציית האחזקה ב-SAP S/4HANA Asset Management. מחזור פקודת-העבודה נשען על שלושה אובייקטים עסקיים: ההודעה (Notification — תיעוד התקלה והבקשה), הפקודה (Order — תכנון וביצוע העבודה) ואישור-הביצוע (Completion Confirmation — דיווח זמן ונתונים טכניים). כל תת-פרק וכל תת-סעיף מהספר המקורי הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC (מפעל המשקאות קוקה-קולה — פקודות תקלה ואחזקה מתוכננת), ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, השפעה על נתוני-אב, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: לשלוט בקונפיגורציה של מחזור פקודת-העבודה ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 5.1
    {
      id: "5.1", titleHe: "הודעות אחזקה", titleEn: "Notifications",
      execHe:
        "ההודעה (Notification) היא אובייקט-התיעוד הראשוני במחזור האחזקה. במצב תפעולי חריג — תקלה, השבתה, בקשת-עבודה — המבקש פותח הודעה שמתארת את הבעיה הטכנית, את האובייקט הפגוע, את העדיפות ואת התאריך. ההודעה היא נקודת-הכניסה למחזור: ממנה נגזרת לרוב פקודת-העבודה, והיא המאגר-ההיסטורי שעליו נשען ניתוח-האמינות ארוך-הטווח של הציוד.",
      beginnerHe:
        "חשוב על ההודעה כ'כרטיס-תקלה': מישהו ברצפה רואה שמשהו לא תקין, פותח כרטיס, רושם מה קרה, על איזה ציוד ומתי. הכרטיס לא מבצע עבודה — הוא מתעד ומבקש. בהמשך מתכנן-האחזקה הופך אותו לפקודת-עבודה שכן מבצעת. ההודעה מורכבת מכותרת (מי/מה/מתי), מפריטי-הודעה (איפה הנזק, מה הנזק, הסיבה) וממשימות ופעילויות.",
      consultantHe:
        "ההודעה נשמרת בטבלאות VIQMEL (כותרת), QMFE (פריטים/ממצאים), QMUR (סיבות), QMSM (משימות) ו-QMMA (פעילויות). מבחינה ארכיטקטונית ההודעה משותפת ל-PM, QM, CS ו-Claim Management — ולכן Notif. Category 01 מבדילה הודעת-אחזקה מהשאר. הקונפיגורציה הגנרית — Number Ranges, Field Selection, Partner Determination, Object Information Keys, User Status, List Variants — מתוארת בפרק 3 וחלה גם כאן. הדפסת-הודעות אינה מטופלת בנפרד: בדרך-כלל מדפיסים את מסמכי-הפקודה, וההגדרות זהות.",
      purposeHe:
        "לתעד את התקלה-הטכנית הקשורה לאובייקט, לבקש משימה ממחלקת-האחזקה, ולתעד את העבודה שבוצעה — כך שכל אירוע ניתן לניתוח ארוך-טווח (תדירות-תקלות, MTBF, עלויות). ההודעה מפרידה בין 'הבקשה/התיעוד' לבין 'הביצוע', ומאפשרת לתפעול לדווח תקלה בלי להבין את עולם-הפקודות.",
      processExampleHe:
        "מפעיל מזהה רעש חריג במנוע-משאבה. הוא פותח הודעת-תקלה (IW21), בוחר את הציוד, מתעד את הנזק מתוך קטלוג, קובע עדיפות גבוהה ומסמן השבתה. מתכנן-האחזקה רואה את ההודעה ברשימה (IW28), יוצר ממנה פקודת-עבודה (IW34), מתכנן חלקים ופעולות — וכך ההודעה הופכת מבקשה לעבודה מבוצעת ומתועדת בהיסטוריה.",
      cbcHe:
        "ב-CBC כל השבתת קו-מילוי או תקלת-ציוד (מדחס CO2, ממלא, מכסה-מכסים) מדווחת כהודעת-תקלה. מוסכמת-שמות: Mx להודעות-אחזקה. ההשבתה והשפעתה על הייצור נרשמות בהודעה, ומשמשות לחישוב OEE ולתעדוף תחזוקה-מונעת בקווים-הקריטיים.",
      navHe: [
        "SAP Easy Access ► Logistics ► Plant Maintenance ► Maintenance Processing ► Notification ► Create (IW21/IW24)",
        "SPRO ► Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Maintenance and Service Notifications",
        "Maintenance and Service Notifications ► Notification Creation / Notification Processing",
      ],
      tables: ["VIQMEL", "QMEL", "QMFE", "QMUR", "QMSM", "QMMA"],
      tcodes: ["IW21", "IW22", "IW23", "IW24", "IW25", "IW28", "IW29"],
      fiori: ["F1511", "F2179", "F4072"],
      configHe: [
        "מבנה ההודעה: כותרת (תאריך/שעה/מודיע, תיאור, אובייקט-אחזקה — מיקום-פונקציונלי/ציוד/מכלול/מספר-סידורי, נתוני-מיקום, השבתה/זמינות).",
        "פריטי-הודעה: מיקום-הנזק, הנזק עצמו, סיבות-הנזק, טקסט-ארוך — מקובלים מתוך קטלוגים לניתוח.",
        "פעילויות (Activities) ומשימות (Tasks): מה בוצע ומה יש לבצע, עם תאריכים ואחראים.",
        "הקונפיגורציה הגנרית (Number Ranges, Field Selection, Partner Determination, Object Information, User Status, List Variants) משותפת עם פרק 3.",
      ],
      flow: [
        { he: "אירוע חריג ברצפה", note: "תקלה/בקשה" },
        { he: "פתיחת הודעה", code: "IW21" },
        { he: "תיעוד נזק + סיבה מקטלוג", code: "QMFE/QMUR" },
        { he: "עיבוד ושחרור הודעה", code: "IW22" },
        { he: "יצירת פקודה מהודעה", code: "IW34" },
        { he: "סגירה + היסטוריה", note: "ניתוח-אמינות" },
      ],
      masterDataHe: [
        "אובייקט-ייחוס: ציוד (EQUI) או מיקום-פונקציונלי (IFLOT) — מקור הנתונים-הטכניים והעלות.",
        "Catalog Profile של הציוד/המיקום קובע אילו קטלוגים זמינים בהודעה.",
        "VIQMEL מאחדת את כותרת-ההודעה עם פרטי-האובייקט לצורכי דיווח.",
      ],
      mistakesHe: [
        "פתיחת הודעה ללא אובייקט-ייחוס — הנתונים לא נכנסים להיסטוריית-הציוד ולא ניתנים לניתוח.",
        "ערבוב בין הודעה לפקודה — ניסיון 'לבצע' עבודה בהודעה במקום ליצור פקודה.",
        "ריבוי סוגי-הודעה מעבר לנדרש — מקשה על המשתמשים ועל הניתוח.",
        "אי-תיעוד הנזק/הסיבה מקטלוג — מאבד את היכולת לניתוח כמותי.",
      ],
      troubleshootHe: [
        "ההודעה לא מופיעה בהיסטוריית-הציוד ➔ לא הוזן אובייקט-ייחוס או הציוד שגוי.",
        "לא ניתן ליצור פקודה מההודעה ➔ סוג-ההודעה לא מקושר לסוג-פקודה (Assign Notification Types to Order Types).",
        "שדות-נזק חסרים בהודעה ➔ לא שויך סוג-קטלוג Problems לסוג-ההודעה.",
        "ההודעה לא מאפשרת עדיפות ➔ לא שויך סוג-עדיפות (Priority Type) לסוג-ההודעה.",
      ],
      bestPracticeHe: [
        "השתמש ב-1–5 סוגי-הודעה בלבד — 'כמה שצריך, מעט ככל האפשר'.",
        "תאם מוסכמת-שמות עם QM/Service/Claim כי הם חולקים את אובייקט-ההודעה.",
        "אכוף אובייקט-ייחוס כשדה-חובה כדי להבטיח היסטוריה תקינה.",
        "השתמש בקטלוגים לנזק/סיבה כדי שהנתונים יהיו ניתנים-לניתוח, לא טקסט חופשי.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין הודעה לפקודה ב-PM?", aHe: "ההודעה מתעדת ומבקשת (אובייקט-תיעוד, בעיקר מידע על התקלה והאובייקט); הפקודה מתכננת ומבצעת (אובייקט-עיבוד משולב עם רכש, מחסן ובקרת-עלויות). לרוב הפקודה נוצרת מההודעה." },
        { qHe: "מהי Notif. Category ולמה היא חשובה?", aHe: "היא קובעת באיזו אפליקציה משמש סוג-ההודעה. 01 = Maint. Notification ל-Asset Management; 02 QM, 03 Service, 04 Claim, 05 General. ההודעה משותפת בין המודולים." },
        { qHe: "אילו טבלאות מאחסנות הודעת-אחזקה?", aHe: "VIQMEL/QMEL לכותרת, QMFE לפריטים/ממצאים, QMUR לסיבות, QMSM למשימות, QMMA לפעילויות." },
      ],
      takeawaysHe: [
        "ההודעה היא נקודת-הכניסה ואובייקט-התיעוד של מחזור-האחזקה.",
        "סוג-ההודעה הוא רכיב-הבקרה המרכזי (יורחב ב-5.1.1).",
        "קטלוגים הופכים מידע-טכני לנתון ניתן-לניתוח (5.1.2).",
        "ההודעה משותפת ל-PM/QM/CS/Claim — תאם מוסכמות.",
      ],
      relatedHe: [
        { labelHe: "PM · ניהול סטטוסים (פרק 3)", href: "/library/pm/chapter-03/#sub-3.2" },
        { labelHe: "אובייקט · VIQMEL", href: "/library/pm/object/VIQMEL/" },
      ],
      children: [
        {
          id: "5.1.1", titleHe: "סוגי הודעה", titleEn: "Notification Types",
          execHe:
            "סוג-ההודעה (Notification Type) הוא רכיב-הבקרה המרכזי לעיבוד ההודעה. הוא מגדיר את פריסת-המסך, הקצאת-המספר, בקרת-הטקסט-הארוך, את סוג-הפקודה המשויך, את הקטלוגים והעדיפויות, את השותפים, מידע-האובייקט, סטטוס-המשתמש ותאריך-הייחוס בהיסטוריה. כל ארגון מגדיר מעט סוגי-הודעה (1–5) המתאימים לתהליכיו.",
          beginnerHe:
            "סוג-ההודעה הוא 'התבנית' של הכרטיס: כמה לשוניות יש, אילו שדות, אילו קטלוגים ואילו עדיפויות. בוחרים סוג שונה לתקלה לעומת בקשת-עבודה רגילה, כי כל אחד צריך מסך ומידע שונים. שני תווים מזהים כל סוג (למשל M1, M2).",
          consultantHe:
            "ב-Define Notification Types קובעים: מזהה דו-תווי; Notif. Category (01 ל-Asset Management); Notification Origin (01 כללי, 02 דיווח-תקלה, 03 דיווח-פעילות — משמש ב-LIS לסטטיסטיקה); Reference Time (A תחילת-השבתה, B קבלת-ההודעה, C סוף-השבתה, D השלמה — קובע סדר-כרונולוגי); Catalog Profile ברירת-מחדל; Update Group 26 ל-PM ב-LIS; Early No. Assgmt. (מספר מיד בקריאה ולא בשמירה — מומלץ לקו-תמיכה מרכזי); ו-Use in Request Maintenance App (חובה לסמן לפחות אחד כדי לפתוח הודעות מהאפליקציה).",
          purposeHe:
            "לרכז במקום-אחד את כל ההתנהגות של ההודעה — מסך, מספור, קטלוגים, עדיפויות וקישור-לפקודה — כדי שאותו תהליך-עסקי יזכה לחוויית-הזנה אחידה ולנתונים אחידים לניתוח.",
          processExampleHe:
            "ארגון מגדיר M1=דיווח-תקלה (Origin 02, מסך מצומצם לתפעול) ו-M2=בקשת-אחזקה (Origin 01, מסך מורחב למתכנן). הקצאת-מספר מוקדמת מאפשרת לנציג-ההוטליין למסור מיד את מספר-ההודעה למתקשר.",
          cbcHe:
            "ב-CBC: M1 לתקלות-קו דחופות (השבתת-ייצור), M2 לבקשות-אחזקה מתוכננות. שני הסוגים מקושרים לסוגי-פקודה מתאימים (PM01/PM02) דרך Assign Notification Types to Order Types.",
          navHe: [
            "SPRO ► Maintenance and Service Notifications ► Notification Creation ► Notification Types ► Define Notification Types",
            "Notification Types ► Set Screen Templates for the Notification Type",
            "Maintenance and Service Notifications ► Overview of Notification Type ► Screen Areas in Notification Header",
          ],
          tables: ["TQ80", "TQ8T", "QMEL", "VIQMEL"],
          tcodes: ["IW21", "IW24", "IW25", "IW26", "IQS21", "IQS22"],
          fiori: ["F1511", "F2179"],
          configHe: [
            "Define Notification Types: מזהה דו-תווי, Notif. Category 01, Notification Origin, Reference Time (A/B/C/D), Catalog Profile, Update Group 26, Early No. Assgmt., Use in Request Maintenance App.",
            "Set Screen Templates: מספר-לשוניות, כותרת ואייקון לכל לשונית, קבוצות-שדות (תת-מסכים). לשוניות מוגדרות-מראש: 10\\TAB01* הודעה 1, 10\\TAB05 נתוני-תקלה, 10\\TAB10 פריט, 10\\TAB11 משימות, 10\\TAB12 פעילויות. חובה לסמן Tab Active תחת Tabstrip Control.",
            "Screen Areas in Notification Header: Screen Type Hdr = H100; ScrnType Object = O100 (מיקום+ציוד+מכלול, הנפוץ), O140 (ללא אובייקט), O150 (ציוד בלבד).",
            "Define Long Text Control: Log line (שם-מזין+תאריך+שעה — מומלץ), No text change (מניעת שינוי רטרואקטיבי).",
            "Define Transaction Start Values + Define Allowed Changes (דורש LOG_EAM_CI_7) + Assign Notification Types to Order Types.",
          ],
          flow: [
            { he: "הגדר סוג-הודעה", code: "Define Notification Types" },
            { he: "עצב פריסת-מסך", code: "Set Screen Templates" },
            { he: "כותרת + אובייקט-ייחוס", code: "H100/O100" },
            { he: "בקרת טקסט-ארוך", code: "Long Text Control" },
            { he: "קשר לסוג-פקודה", code: "Assign to Order Types" },
          ],
          masterDataHe: [
            "Catalog Profile בסוג-ההודעה משמש כברירת-מחדל אם הציוד/המיקום אינם נושאים פרופיל.",
            "User Status profile (סטטוס-משתמש) משויך לסוג ומשפיע על מעברי-הסטטוס המותרים.",
          ],
          mistakesHe: [
            "הגדרת מסך עם לשונית שאינה מסומנת Tab Active — הלשונית מוגדרת אך לא מוצגת.",
            "אי-שיוך סוג-ההודעה לסוג-פקודה — לא ניתן ליצור פקודה מההודעה.",
            "ריבוי סוגי-הודעה מעבר ל-5 — סרבול ובלבול-משתמש.",
            "שכחת Use in Request Maintenance App — לא ניתן לפתוח הודעות באפליקציה.",
          ],
          troubleshootHe: [
            "הלשונית לא מוצגת בהודעה ➔ Tab Active לא מסומן תחת Tabstrip Control.",
            "לא ניתן לשנות סוג-הודעה ➔ הפעל LOG_EAM_CI_7 והגדר את השינוי ב-Define Allowed Changes; ההודעה חייבת להיות Open.",
            "המסך קופץ ל-SAP Easy Access אחרי הזנה ➔ סמן Proc.initial screen ב-Transaction Start Values.",
            "Header חסר מידע ➔ ScrnType Object שגוי או אין לשונית עם Screen Area 005 (Reference Object).",
          ],
          bestPracticeHe: [
            "1–5 סוגי-הודעה; 1–3 לשוניות לכל סוג.",
            "הפעל Log line ו-No text change לשקיפות ולמניעת מניפולציה בטקסטים.",
            "השתמש ב-Early No. Assgmt. כשיש הוטליין מרכזי.",
            "השתמש ב-Activity Cat. למסך מצומצם בהזנה ומורחב בשינוי.",
          ],
          interviewHe: [
            { qHe: "מה קובע סוג-ההודעה?", aHe: "פריסת-מסך, הקצאת-מספר, בקרת-טקסט-ארוך, סוג-הפקודה המשויך, קטלוגים, עדיפויות, שותפים, מידע-אובייקט, סטטוס-משתמש ותאריך-ייחוס." },
            { qHe: "מהו Reference Time בסוג-הודעה?", aHe: "התאריך שלפיו ההודעה ממוינת כרונולוגית בהיסטוריה: A תחילת-השבתה, B קבלת-ההודעה, C סוף-השבתה, D השלמת-ההודעה." },
            { qHe: "כיצד מקשרים הודעה לפקודה?", aHe: "ב-Assign Notification Types to Order Types קובעים איזה סוג-פקודה יוצע ביצירת-פקודה מכל סוג-הודעה." },
          ],
          takeawaysHe: [
            "סוג-ההודעה = רכיב-הבקרה המרכזי לעיבוד ההודעה.",
            "Notif. Category 01 מגדירה הודעת-אחזקה.",
            "Tab Active חובה כדי שהלשונית תוצג.",
            "מעט סוגים ומעט לשוניות — אחידות ופשטות.",
          ],
          relatedHe: [{ labelHe: "PM · קטלוגים (5.1.2)", href: "/library/pm/chapter-05/#sub-5.1.2" }],
        },
        {
          id: "5.1.2", titleHe: "קטלוגים ופרופילי קטלוג", titleEn: "Catalogs and Catalog Profiles",
          execHe:
            "קטלוגים מאפשרים לפרמל את המידע-הטכני בהודעה — נזק, סיבת-נזק, חלקי-אובייקט, משימות ופעילויות — לקודים מובְנים שניתנים לניתוח כמותי. במקום טקסט-חופשי, המשתמש בוחר קוד מתוך רשימה. פרופיל-קטלוג (Catalog Profile) מקבץ את הקטלוגים הרלוונטיים לסוג-ציוד מסוים ומציע אותם אוטומטית בהודעה.",
          beginnerHe:
            "קטלוג הוא 'תפריט-נפתח' לנזקים ולסיבות. במקום שכל אחד יכתוב 'מנוע נשרף' אחרת, בוחרים קוד אחיד. המבנה תלת-שכבתי: קטלוג ← קבוצות-קוד ← קודים. פרופיל-הקטלוג אומר 'למשאבה הזו רלוונטיים הקטלוגים האלה' — וכך ההודעה מציעה רק את הקודים המתאימים.",
          consultantHe:
            "מבנה: Catalog (סוג) → Code Group → Code. סוגי-קטלוג מקובלים ב-Asset Management: 2 Tasks, 5 Causes, A Activities, B Object Parts, C Damage. קודים שכבר שומשו אינם נמחקים — משביתים אותם (Deactivate) דרך LOG_EAM_QM_CODE_DEACT. כלל-עדיפות לקביעת פרופיל-הקטלוג בהודעה: ציוד ← מיקום-פונקציונלי ← סוג-הודעה. ניתן לשיוך מלא (Catalog C, Cd.Grp FL) או חלקי (Catalog 5, Cd.Grp Pat PM* — כל הקבוצות המתחילות ב-P).",
          purposeHe:
            "להפוך את ההודעה מתיעוד-טקסט למאגר-נתונים ניתן-לניתוח: סטטיסטיקת-תקלות, פארטו של סיבות-נזק, זיהוי ציוד-בעייתי. בלי קטלוגים אין ניתוח-אמינות אמיתי.",
          processExampleHe:
            "טכנאי מתעד תקלת-משאבה: Catalog C (Damage) → Code Group 5400 (Pumps) → Code 1100 (Crack in crankcase); Catalog 5 (Causes) → סיבת-עומס-יתר. כעבור שנה דוח-פארטו מראה ש'סדק במעטה' חוזר ב-12 משאבות — בסיס להחלטת-החלפה.",
          cbcHe:
            "ב-CBC קטלוג-נזקים לציוד-קו (ממלאים, מכסים, מובילים) עם קבוצות-קוד לפי סוג-מכונה. פרופיל-קטלוג P-FILLER לממלאים, P-CO2 למערכת ה-CO2 — מציע אוטומטית את הקודים הרלוונטיים בכל הודעה.",
          navHe: [
            "SPRO ► Maintenance and Service Notifications ► Notification Creation ► Notification Content ► Maintain Catalogs",
            "Notification Content ► Define Catalog Profile",
            "Notification Content ► Change Catalogs and Catalog Profile for Notification Type",
          ],
          tables: ["QPGT", "QPCT", "QPGR", "TQ15", "TQ80"],
          tcodes: ["QS41", "QS42", "OQN6", "S_ALR_87001010_1"],
          fiori: ["F1511"],
          configHe: [
            "Maintain Catalogs (QS41): Define Catalogs (רמה 1 — סוגי-קטלוג 2/5/A/B/C); Edit Catalogs (רמה 2 — קבוצות-קוד, Status 2 Released); רמה 3 — הקודים בפועל. מקסימום ~25 קודים לקבוצה.",
            "Define Catalog Profile (OQN6): קיבוץ קטלוגים וקבוצות-קוד; Catalogs/Code Groups עם שיוך מלא/חלקי; מחלקה ב-Class Type 015; הודעת-שינוי I/W/E.",
            "Change Catalogs and Catalog Profile for Notification Type: שיוך סוגי-קטלוג ל-Problems/Causes/Tasks/Activities/Object Parts לכל סוג-הודעה.",
            "Deactivate codes דרך LOG_EAM_QM_CODE_DEACT; מיון לפי טקסט דרך LOG_EAM_CI_12.",
          ],
          flow: [
            { he: "הגדר סוגי-קטלוג", code: "Define Catalogs", note: "2/5/A/B/C" },
            { he: "הגדר קבוצות-קוד", code: "Edit Catalogs", note: "Status 2 Released" },
            { he: "הגדר קודים", note: "≤25 לקבוצה" },
            { he: "בנה פרופיל-קטלוג", code: "OQN6" },
            { he: "שייך לציוד/מיקום/סוג-הודעה", note: "כלל-עדיפות" },
          ],
          masterDataHe: [
            "שדה Catalog Profile באב-הציוד (EQUI) ובאב-המיקום (IFLOT) קובע את הפרופיל המוצע.",
            "כלל-עדיפות לקביעה: ציוד ← מיקום ← סוג-הודעה; אם אין — בחירה ידנית (Extras ► Settings ► Catalog Profile).",
            "מחלקה (Class Type 015) מאפשרת שדות-מאפיין נוספים בפריטי-ההודעה.",
          ],
          mistakesHe: [
            "השארת קבוצת-קוד ב-Status שאינו 2 Released — היא לא זמינה בהודעה.",
            "מעל 25 קודים לקבוצה — איכות-הנתונים והקבלה נפגעות.",
            "מחיקת קוד-בשימוש — אסור; יש להשבית בלבד.",
            "אי-שיוך סוג-קטלוג Problems לסוג-ההודעה — אין שדות-נזק בכלל.",
          ],
          troubleshootHe: [
            "אין שדות-נזק בהודעה ➔ לא שויך סוג-קטלוג Problems ל-Notification Type.",
            "הקוד אינו מופיע בעזרת-הקלט ➔ הקוד הושבת, או Status של הקבוצה אינו Released.",
            "פרופיל-קטלוג לא נקבע אוטומטית ➔ אין פרופיל בציוד/מיקום/סוג-הודעה לפי כלל-העדיפות.",
            "לא ניתן למחוק קוד-מיושן ➔ הקוד בשימוש; הפעל LOG_EAM_QM_CODE_DEACT והשבת.",
          ],
          bestPracticeHe: [
            "תאם מוסכמות-קטלוג עם QM/CS — הם חולקים את הקטלוגים.",
            "שמור ≤25 קודים לקבוצה לקלות-בחירה.",
            "השתמש בשיוך-חלקי (PM*) לקבוצות-גנריות לצד שיוך-ספציפי לאובייקט.",
            "הזן פרופיל-קטלוג ברמת-הציוד כדי לקבל הצעה מדויקת בכל הודעה.",
          ],
          interviewHe: [
            { qHe: "מהו המבנה התלת-שכבתי של קטלוג?", aHe: "Catalog (סוג) → Code Group (קבוצת-קוד) → Code (קוד). לכל ממצא קיים קוד; הקודים מקובצים לקבוצות לפי מאפיין." },
            { qHe: "מהו כלל-העדיפות לקביעת פרופיל-קטלוג?", aHe: "ציוד ← מיקום-פונקציונלי ← סוג-הודעה. המערכת בודקת בסדר זה; אם בכולם אין — לא מוצע פרופיל (ניתן לבחור ידנית)." },
            { qHe: "מדוע לא מוחקים קוד-בשימוש?", aHe: "כדי לשמר את שלמות-ההיסטוריה והניתוחים; במקום מחיקה משביתים את הקוד (LOG_EAM_QM_CODE_DEACT) כך שלא ניתן עוד להקצותו." },
          ],
          takeawaysHe: [
            "קטלוגים מפרמלים מידע-טכני לקודים ניתנים-לניתוח.",
            "מבנה: קטלוג → קבוצת-קוד → קוד; Status 2 Released כדי להשתמש.",
            "פרופיל-קטלוג: ציוד ← מיקום ← סוג-הודעה.",
            "קוד-בשימוש מושבת, לא נמחק.",
          ],
          relatedHe: [{ labelHe: "PM · ציוד ומיקומים (פרק 4)", href: "/library/pm/chapter-04/" }],
        },
        {
          id: "5.1.3", titleHe: "פונקציות נוספות להודעה", titleEn: "Other Functions",
          execHe:
            "מעבר לסוגים ולקטלוגים, ההודעה נשענת על מספר פונקציות-קונפיגורציה נוספות: עדיפויות (Priorities), ניטור זמני-תגובה (Response Monitoring), תיבת-פעולה (Action Box), מצבי-מערכת (System Conditions) והשפעות-תפעוליות (Operational Effects). יחד הן קובעות כמה דחופה ההודעה, מתי יש להגיב, אילו פעולות-המשך זמינות ומה מצב-הציוד והשפעתו על הייצור.",
          beginnerHe:
            "אלו 'התוספות' של ההודעה. עדיפות אומרת כמה דחוף; ניטור-תגובה קובע 'תוך כמה זמן חייבים להתחיל'; תיבת-הפעולה היא כפתורים שמייצרים משימות-מהירות (שיחת-טלפון, יצירת-פקודה); מצב-המערכת אומר אם הציוד פועל; והשפעה-תפעולית אומרת אם הייצור נעצר.",
          consultantHe:
            "Priorities: Priority Type מכיל את העדיפויות ומשויך לסוג-הודעה; כל עדיפות נושאת Rel.Start ו-Rel.End (חישוב התחלה/סיום נדרשים מרגע ההזנה) ו-Final Due Date. תמיד שייך Priority Type — אם עובדים ללא עדיפויות, הגדר Priority Type ריק כדי למנוע אזהרה. Response Monitoring משלב Response Profile (משימות מקטלוג 2 עם מסגרת-זמן ואחראי) ו-Service Profile (זמני-עיבוד ליום). Action Box מבוסס Function Modules: QM06_FA* מתעד פעילות, QM06_FM* מתעד משימה.",
          purposeHe:
            "להבטיח שההודעה לא רק מתעדת אלא גם מתעדפת ומניעה פעולה: עדיפות וניטור-תגובה הופכים את ההודעה לכלי-SLA, ותיבת-הפעולה מאיצה את הטיפול. מצבי-מערכת והשפעות-תפעוליות מספקים קריטריונים לבחירה ולהערכה.",
          processExampleHe:
            "הודעת-תקלה בעדיפות 1 מקבלת Rel.End של 4 שעות (חישוב מ-Rel.Start). Response Profile יוצר אוטומטית משימה 'הודע למהנדס-המפעל' עם מסגרת-15-דקות, ותיבת-הפעולה מאפשרת בלחיצה-אחת ליצור פקודת-עבודה (QM06_FM_*).",
          cbcHe:
            "ב-CBC השבתת קו-מילוי = השפעה-תפעולית 'Production breakdown' + עדיפות 1; ניטור-התגובה מבטיח שטכנאי-משמרת מטופל תוך 15 דקות. תיבת-הפעולה כוללת 'צור פקודת-תקלה' ו'הודע לראש-משמרת'.",
          navHe: [
            "SPRO ► Maintenance and Service Notifications ► Notification Processing ► Response Time Monitoring ► Define Priorities / Define Response Monitoring",
            "Notification Processing ► Additional Functions ► Define Action Box",
            "Notification Processing ► Condition Indicator ► Define System Conditions / Define Operational Effects",
          ],
          tables: ["T356", "T356A", "TQ80", "T357G"],
          tcodes: ["OIMF", "S_ALR_87000248_2", "S_ALR_87000995_1", "IW21"],
          fiori: ["F1511", "F2179"],
          configHe: [
            "Define Priorities: Priority Type משויך לסוג-הודעה; לכל עדיפות Rel.Start/Rel.End (+ יחידות SDUn./EDUn.), Duration for Final Due Date. הגדר Priority Type ריק אם אין עדיפויות.",
            "Define Response Monitoring: Response Profile (Priority + Task מקטלוג 2 + Time frame + אחראי) ו-Service Profile (זמני-עיבוד לכל יום). פרופיל-תגובה המשויך לפרופיל-שירות גובר.",
            "Define Action Box: Follow-Up Functions עם Function Module (QM06_FA* פעילות, QM06_FM* משימה), Sort Number, Used In, Documentation, Icon, Code Group+Code.",
            "Define System Conditions: סטטוסי-מערכת (פעיל-מלא / מוגבל / מושבת). Define Operational Effects: ללא-השפעה / ייצור-מוגבל / השבתת-ייצור (לאפליקציות Request/Create Maintenance Request).",
          ],
          flow: [
            { he: "הגדר Priority Type", note: "Rel.Start/End" },
            { he: "שייך לסוג-הודעה", note: "תמיד — גם ריק" },
            { he: "הגדר Response+Service Profile", code: "OIMF" },
            { he: "הגדר תיבת-פעולה", code: "Action Box" },
            { he: "מצבי-מערכת + השפעות", note: "קריטריוני-בחירה" },
          ],
          masterDataHe: [
            "Response/Service Profiles משויכים לסוג-ההודעה ב-Response Time Monitoring for Notification Type.",
            "משימות Response נוצרות אוטומטית: Edit ► Tasks ► Determine Automatically.",
          ],
          mistakesHe: [
            "אי-שיוך Priority Type לסוג-הודעה — אזהרה מציקה בכל הזנה.",
            "הגדרת זמני Rel.End לא-ריאליים — SLA שלא ניתן לעמוד בו.",
            "בלבול QM06_FA* (פעילות) עם QM06_FM* (משימה) בתיבת-הפעולה.",
            "ריבוי פונקציות בתיבת-הפעולה — עומס על המשתמש.",
          ],
          troubleshootHe: [
            "אזהרת 'אין סוג-עדיפות' ➔ שייך Priority Type (גם ריק) לסוג-ההודעה.",
            "תאריך-יעד לא מחושב ➔ Rel.Start/Rel.End או יחידות-המידה חסרים בעדיפות.",
            "פעולת תיבת-הפעולה לא מתועדת ➔ Documentation או Code Group+Code חסרים.",
            "ניטור-תגובה לא יוצר משימות ➔ Response Profile חסר Task מקטלוג 2 או לא שויך לסוג.",
          ],
          bestPracticeHe: [
            "סוג-עדיפות אחד מספיק לרוב הסוגים; שייך תמיד (גם ריק).",
            "השתמש ב-Response Monitoring לתהליכי-SLA קריטיים בלבד.",
            "הצב בתיבת-הפעולה רק את פעולות-ההמשך הנפוצות.",
            "תעד את משמעות מצבי-המערכת וההשפעות-התפעוליות לארגון.",
          ],
          interviewHe: [
            { qHe: "מדוע לשייך תמיד Priority Type, גם ריק?", aHe: "כי הזנת-הודעה ללא Priority Type מציגה אזהרה בכל פעם; Priority Type ריק (ללא עדיפויות) עוקף את האזהרה ושומר על תהליך נקי." },
            { qHe: "מה ההבדל בין QM06_FA* ל-QM06_FM* בתיבת-הפעולה?", aHe: "QM06_FA* מתעד פעילות (Activity), QM06_FM* מתעד משימה (Task). הבחירה קובעת אם פעולת-ההמשך נרשמת כפעילות או כמשימה בהודעה." },
            { qHe: "מה מספק ניטור זמני-התגובה?", aHe: "חישוב התחלה/סיום נדרשים לפי העדיפות והפרופילים, ויצירת-משימות אוטומטית עם מסגרת-זמן ואחראי — בסיס ל-SLA." },
          ],
          takeawaysHe: [
            "עדיפויות הופכות את ההודעה לכלי-תעדוף ו-SLA.",
            "תמיד שייך Priority Type — גם ריק — למניעת אזהרה.",
            "תיבת-הפעולה: FA*=פעילות, FM*=משימה.",
            "מצבי-מערכת והשפעות-תפעוליות = קריטריוני-בחירה והערכה.",
          ],
          relatedHe: [{ labelHe: "PM · סוגי הודעה (5.1.1)", href: "/library/pm/chapter-05/#sub-5.1.1" }],
        },
      ],
    },
    // ============================================================ 5.2
    {
      id: "5.2", titleHe: "פקודות אחזקה", titleEn: "Orders",
      execHe:
        "הפקודה (Maintenance Order) היא אובייקט-העיבוד המרכזי של מחזור-האחזקה — הכלי שבו המתכננים והטכנאים מתכננים ומבצעים את העבודה. בשונה מההודעה, היא אובייקט מאוד-משולב עם קשרים לרכש, מחסן ובקרת-עלויות: היא מתזמנת פעולות, שומרת חלקים (Reservations) או יוצרת דרישות-רכש, גוזרת עלויות-מתוכננות, מדפיסה מסמכי-עבודה ולבסוף מתחשבנת אל מרכז-העלות.",
      beginnerHe:
        "אם ההודעה היא 'הכרטיס', הפקודה היא 'תוכנית-העבודה': מה צריך לעשות (פעולות), מי יעשה (מרכז-עבודה), אילו חלקים נדרשים (רשימת-חומרים), מתי (תאריכים), וכמה זה יעלה (עלויות). הפקודה מורכבת מכותרת, רשימת-אובייקטים, פעולות, רשימת-חומרים, PRT, כלל-התחשבנות ונתוני-עלות.",
      consultantHe:
        "מבנה: AUFK (כותרת — נתוני CO/הקצאה), AFKO (נתוני-ראש ייצור/תזמון), AFVC (פעולות), AFVV (ערכי-זמן/כמויות לפעולה), RESB (רכיבי-חומר/שמורות), AFRU (אישורי-ביצוע). הקונפיגורציה מתחלקת לרמת order type הכלל-מפעלית (מספור, התחשבנות, אינטגרציית-הודעה, מסמכי-עבודה, עדיפויות, שותפים) ולרמת order type לכל-מפעל (פריסת-מסך, תזמון, קיבולת, בדיקת-זמינות, תמחיר, OCI). הקונפיגורציה הגנרית של פרק 3 (Number Ranges, Field Selection, Partner, Object Info, User Status, List Variants) חלה גם כאן.",
      purposeHe:
        "לתכנן ולבצע משימת-אחזקה תוך שילוב מלא עם הלוגיסטיקה והכספים: ניהול חלקים, רכש חיצוני, תזמון וקיבולת, תמחיר והתחשבנות. הפקודה היא 'אספן-העלויות' — כל עלות מצטברת אליה ובסוף מתחשבנת אל הגורם-המחייב.",
      processExampleHe:
        "מתכנן יוצר פקודה (IW31), מוסיף פעולות עם מרכז-עבודה וזמני-תקן, שומר חלקים מהמלאי (L) ופותח דרישת-רכש לחלק חיצוני (N). בשחרור (REL) המערכת בודקת זמינות, מדפיסה מסמכי-עבודה ויוצרת כלל-התחשבנות. הטכנאי מבצע, מוציא חלקים (261), מאשר זמן (IW41), ולבסוף הפקודה מוּשלמת-טכנית (TECO) ומתחשבנת.",
      cbcHe:
        "ב-CBC PM01 לפקודות-תקלה דחופות (קו עומד) ו-PM02 לאחזקה מתוכננת (חלון-תחזוקה שבועי). פקודת-תקלה לממלא שומרת חלקי-חילוף, מתזמנת טכנאי-מכונות, ומתחשבנת אל מרכז-העלות של קו-המילוי — בסיס לחישוב עלות-תחזוקה ל-hectoliter.",
      navHe: [
        "SAP Easy Access ► Plant Maintenance ► Maintenance Processing ► Order ► Create (IW31)",
        "SPRO ► Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Maintenance and Service Orders",
        "Maintenance and Service Orders ► Functions and Settings for Order Types",
      ],
      tables: ["AUFK", "AFKO", "AFVC", "AFVV", "RESB", "AFRU"],
      tcodes: ["IW31", "IW32", "IW33", "IW34", "IW38", "IW39", "IW3D"],
      fiori: ["F2782", "F4073", "F3411"],
      configHe: [
        "מבנה הפקודה: כותרת (סוג, תאריכים, מפעל, אובייקט-ייחוס, עדיפות); רשימת-אובייקטים; פעולות (מרכז-עבודה, מפתח-בקרה, זמן-תקן, סוג-פעילות); רשימת-חומרים (L מלאי/Reservation, N לא-מלאי/דרישת-רכש); PRT; כלל-התחשבנות; נתוני-עלות.",
        "שש דרכי-יצירה: אוטומטית מפריט-אחזקה; מהודעה בודדת; קיבוץ הודעות; ישירה ללא הודעה; ישירה עם הודעה; ישירה עם הודעה רטרואקטיבית.",
        "הבחנה בין קונפיגורציה כלל-מפעלית (general) לבין קונפיגורציה לכל-מפעל (plant-specific) — ייחודי לפקודה לעומת ההודעה.",
        "תתי-הסעיפים 5.2.1–5.2.11 מסדרים את כל פונקציות-הקונפיגורציה לפי נושא.",
      ],
      flow: [
        { he: "יצירת פקודה", code: "IW31", note: "6 דרכים" },
        { he: "תכנון פעולות + חומרים", code: "AFVC/RESB" },
        { he: "שחרור", code: "REL", note: "בדיקת-זמינות + הדפסה" },
        { he: "ביצוע + הוצאת-חומר", code: "261" },
        { he: "אישור-ביצוע", code: "IW41" },
        { he: "השלמה-טכנית + התחשבנות", code: "TECO/KO88" },
      ],
      masterDataHe: [
        "אובייקט-ייחוס (EQUI/IFLOT) מספק מרכז-עלות, מיקום ונתונים-טכניים.",
        "מרכז-עבודה (CRHD) מספק קיבולת, תזמון ועלות-עבודה דרך KP26.",
        "אב-החומר מספק מחיר, סוג-רכש ובקרת-מלאי לרכיבי-הפקודה.",
        "רשימת-משימות (Task List) מספקת תבנית-פעולות מועתקת לפקודה.",
      ],
      mistakesHe: [
        "אי-הגדרת order type לכל מפעל-רלוונטי — לא ניתן ליצור/לעבד פקודה.",
        "הזנת order type עם תזמון-פעיל ללא זמני-תקן — תוצאות-תזמון שגויות.",
        "ערבוב קונפיגורציה כלל-מפעלית עם plant-specific — התנהגות לא-עקבית.",
        "הסתמכות על ברירות-מחדל בלי להתאים מסמכי-עבודה ותמחיר לתהליך.",
      ],
      troubleshootHe: [
        "לא ניתן ליצור פקודה ➔ order type לא הוקצה למפעל/לסוג-פעילות.",
        "אין עלויות בפקודה ➔ ראה 5.2.8 (מרכז-עלות/KP26/מפתח-בקרה/נוסחה).",
        "לא ניתן להתחשבן ➔ אין כלל-התחשבנות (ראה 5.2.9, צור בשחרור).",
        "חלקים לא נשמרים ➔ קטגוריית-פריט שגויה או movement type חסר (5.2.4).",
      ],
      bestPracticeHe: [
        "הגדר order type לכל צירוף מפעל × תהליך הנדרש; וודא שלמות.",
        "השתמש בהודעה כמקור-לפקודה כדי לשמר היסטוריה וקישוריות.",
        "הפעל תזמון/קיבולת רק אם יש זמני-תקן אמינים.",
        "הגדר תמחיר והתחשבנות נפרדים ל-PM (לא לשתף עם ייצור/PS).",
      ],
      interviewHe: [
        { qHe: "מהי ההבחנה הייחודית בקונפיגורציית order type?", aHe: "הבחנה בין הגדרות כלל-מפעליות (general — מספור, התחשבנות, אינטגרציית-הודעה) לבין הגדרות לכל-מפעל (plant-specific — מסך, תזמון, קיבולת, זמינות, תמחיר). אצל ההודעה המפעל כמעט לא משחק תפקיד." },
        { qHe: "אילו טבלאות מרכיבות פקודת-אחזקה?", aHe: "AUFK כותרת (נתוני CO), AFKO ראש-תזמון, AFVC פעולות, AFVV ערכי-זמן, RESB רכיבי-חומר, AFRU אישורי-ביצוע." },
        { qHe: "מהן שש דרכי-יצירת הפקודה?", aHe: "אוטומטית מפריט-אחזקה, מהודעה בודדת, קיבוץ הודעות, ישירה ללא הודעה, ישירה עם הודעה, וישירה עם הודעה רטרואקטיבית." },
      ],
      takeawaysHe: [
        "הפקודה = אובייקט-העיבוד המשולב לתכנון וביצוע אחזקה.",
        "מבנה: כותרת/אובייקטים/פעולות/חומרים/PRT/התחשבנות/עלות.",
        "קונפיגורציה מתחלקת ל-general מול plant-specific.",
        "הפקודה היא אספן-העלויות שמתחשבן בסוף-המחזור.",
      ],
      relatedHe: [
        { labelHe: "PP · מרכז עבודה (3.3)", href: "/library/pp/chapter-03/#sub-3.3" },
        { labelHe: "אובייקט · AUFK", href: "/library/pm/object/AUFK/" },
      ],
      children: [
        {
          id: "5.2.1", titleHe: "סוגי פקודה", titleEn: "Order Types",
          execHe:
            "סוג-הפקודה (Order Type) הוא רכיב-הבקרה המרכזי לעיבוד הפקודה. בשונה מסוג-ההודעה — שבו המפעל כמעט לא משחק תפקיד — בפקודה יש להבחין בין קונפיגורציה כלל-מפעלית (החלה על כל המפעלים) לבין קונפיגורציה לכל-מפעל. סוג-הפקודה קובע, בין היתר, את המספור, ההתחשבנות, אינטגרציית-ההודעה, מסמכי-העבודה, העדיפויות, השותפים וסוגי-פעילות-האחזקה המותרים.",
          beginnerHe:
            "סוג-הפקודה הוא 'התבנית' של הפקודה: מה מספרה, איך מתחשבנים, אילו מסמכים מדפיסים, אילו שדות יש. PM01 לתקלה, PM02 לאחזקה מתוכננת. חלק מההגדרות זהות לכל המפעלים, וחלקן משתנות ממפעל למפעל.",
          consultantHe:
            "ברמה הכלל-מפעלית מגדירים (Configure Order Types): Maintenance Activity Types המותרים, Number Range, אופן-התחשבנות, אינטגרציית-הודעה, Budget Profile, Residence Time. ברמת-המפעל מקצים את ה-order type למפעל (Assign Order Types to Maintenance Plants) ומגדירים פרמטרי-עיבוד. סוג-הפקודה נשמר ב-T003O ובהקצאות-הנלוות. Maintenance Activity Type (Inspection/Repair/PM) משמש לסטטיסטיקה ולתעדוף.",
          purposeHe:
            "לרכז את כל ההתנהגות של הפקודה במפתח-בקרה אחד, ולאפשר תהליכים שונים (תקלה מול מונע מול שיפוץ) עם מספור, התחשבנות ומסמכים מותאמים — תוך הפרדה בין מה שאחיד בכל הארגון לבין מה שתלוי-מפעל.",
          processExampleHe:
            "ארגון מגדיר PM01 (תקלה, התחשבנות למרכז-עלות, מסמכי-עבודה דחופים) ו-PM02 (מונעת, מקושרת לתוכניות-אחזקה). כל סוג מוקצה למפעלי-האחזקה הרלוונטיים, ומקבל פרמטרי-תזמון ותמחיר משלו לכל מפעל.",
          cbcHe:
            "ב-CBC PM01 לתקלות-קו, PM02 לאחזקה מתוכננת, PM03 לשיפוץ/refurbishment. כל סוג מוקצה למפעל-המילוי ומפעל-הלוגיסטיקה, עם Maintenance Activity Types נפרדים לדיווח-OEE.",
          navHe: [
            "SPRO ► Maintenance and Service Orders ► Functions and Settings for Order Types ► Configure Order Types",
            "Functions and Settings for Order Types ► Assign Order Types to Maintenance Plants",
            "Functions and Settings for Order Types ► Define Maintenance Activity Types / Assign Maintenance Activity Types to Order Types",
          ],
          tables: ["T003O", "T350", "T352B", "AUFK"],
          tcodes: ["OIOA", "OIOC", "IW31", "OIA1"],
          fiori: ["F2782"],
          configHe: [
            "Configure Order Types (כלל-מפעלי): Number Range, אופן-התחשבנות, אינטגרציית-הודעה, Budget Profile, Residence Time, מסמכי-עבודה, עדיפויות, שותפים, Object Information Key.",
            "Assign Order Types to Maintenance Plants: שיוך כל order type למפעלי-האחזקה שבהם הוא בשימוש.",
            "Maintenance Activity Types: הגדר ושייך לסוגי-פקודה (Inspection/Repair/Preventive) לסטטיסטיקה ולתעדוף.",
            "פרמטרי-העיבוד לכל-מפעל (תזמון, קיבולת, זמינות, תמחיר, OCI) מפוזרים בתתי-הסעיפים 5.2.2–5.2.11.",
          ],
          flow: [
            { he: "הגדר order type", code: "Configure Order Types" },
            { he: "Number Range + התחשבנות", note: "כלל-מפעלי" },
            { he: "שייך למפעלי-אחזקה", code: "Assign to Plants" },
            { he: "שייך Activity Types", note: "סטטיסטיקה" },
            { he: "פרמטרים לכל-מפעל", note: "5.2.2–5.2.11" },
          ],
          masterDataHe: [
            "ה-order type נשמר בכותרת-הפקודה (AUFK-AUART) וקובע את כל ההתנהגות הנלווית.",
            "Maintenance Activity Type נשמר בפקודה ומשמש בדיווחי-PMIS.",
          ],
          mistakesHe: [
            "אי-שיוך order type למפעל — שגיאת 'לא ניתן ליצור פקודה' במפעל זה.",
            "ערבוב הגדרות כלל-מפעליות עם plant-specific.",
            "ריבוי סוגי-פקודה מיותרים — סרבול בתחזוקה.",
            "שכחת שיוך Maintenance Activity Type — חוסר בדיווח-סטטיסטי.",
          ],
          troubleshootHe: [
            "'Order type not allowed in plant' ➔ הקצה את הסוג למפעל ב-Assign Order Types to Maintenance Plants.",
            "מספור שגוי ➔ Number Range של order type לא הוגדר/חופף.",
            "התחשבנות לא עובדת ➔ אינטגרציית-ההתחשבנות/הפרופיל לא הוגדרו ל-order type.",
            "Activity Type חסר בדיווח ➔ לא שויך ל-order type.",
          ],
          bestPracticeHe: [
            "הגדר order type לכל תהליך-אחזקה מובחן (תקלה/מונע/שיפוץ).",
            "הפרד ברורות בין הגדרות-general להגדרות plant-specific.",
            "הגדר תמחיר/התחשבנות נפרדים ל-PM כדי לבדל מ-PP/PS.",
            "וודא שלמות-שיוך: כל order type לכל מפעל-רלוונטי.",
          ],
          interviewHe: [
            { qHe: "מדוע סוג-הפקודה מורכב יותר מסוג-ההודעה?", aHe: "כי בפקודה יש הבחנה בין הגדרות כלל-מפעליות (מספור, התחשבנות, אינטגרציה) לבין הגדרות לכל-מפעל (מסך, תזמון, תמחיר), בעוד אצל ההודעה המפעל כמעט לא רלוונטי." },
            { qHe: "מהו Maintenance Activity Type?", aHe: "סיווג-פעילות (בדיקה/תיקון/מונע) המשויך לסוג-פקודה ומשמש לסטטיסטיקה ולתעדוף ב-PMIS." },
            { qHe: "היכן מקצים order type למפעל?", aHe: "ב-Assign Order Types to Maintenance Plants; ללא הקצאה זו לא ניתן ליצור פקודה מאותו סוג במפעל." },
          ],
          takeawaysHe: [
            "סוג-הפקודה = רכיב-הבקרה המרכזי לפקודה.",
            "הבחנה כלל-מפעלי מול plant-specific היא ייחודית לפקודה.",
            "חובה לשייך order type לכל מפעל-רלוונטי.",
            "Maintenance Activity Type מזין דיווח-סטטיסטי.",
          ],
          relatedHe: [{ labelHe: "PM · יחידות ארגון (פרק 2)", href: "/library/pm/chapter-02/" }],
        },
        {
          id: "5.2.2", titleHe: "בדיקת זמינות", titleEn: "Availability Check",
          execHe:
            "בדיקת-הזמינות (Availability Check) קובעת אם די חומר, PRT והיתרים זמינים לביצוע הפקודה בתאריך-הדרישה. המערכת מבצעת בדיקה-דינמית של ATP (Available-To-Promise) — המלאי-הנוכחי משתנה עד תאריך-הדרישה עקב קבלות והוצאות מתוכננות — וכך נמנע מצב שבו פקודה משוחררת בלי שהחלקים יגיעו בזמן.",
          beginnerHe:
            "לפני שמתחילים עבודה, כדאי לוודא שיש את כל החלקים. בדיקת-הזמינות אומרת 'האם החלק הזה יהיה במחסן ביום שאני צריך אותו?'. היא לא מסתכלת רק על המלאי היום, אלא מחשבת מה יהיה בתאריך-הביצוע אחרי כל הקבלות וההוצאות.",
          consultantHe:
            "Checking Group (MARC-MTVFP) + Checking Rule מגדירים את Scope of Check: אילו תנועות נכללות (הזמנות-רכש, שמורות, מלאי-בטיחות). בדיקת-החומר מבוססת ATP; בדיקת-PRT ובדיקת-היתרים נפרדות. הבדיקה מופעלת ידנית או אוטומטית בשחרור (Define Checking Control). מתב-מצב: ניתן לחסום שחרור אם חסר חומר, או רק להזהיר.",
          purposeHe:
            "למנוע שחרור פקודה שלא ניתן לבצע: ATP מבטיח שהחלקים יהיו זמינים בתאריך-הדרישה, וכך נמנעות עצירות-עבודה והמתנות מיותרות לחלקים.",
          processExampleHe:
            "פקודה דורשת אטם בתאריך +5 ימים. המלאי היום 0, אך יש הזמנת-רכש מגיעה בעוד 3 ימים. בדיקת-ATP מזהה שב-+5 יהיו 10 יח' — הזמינות תקינה והפקודה משוחררת; אילו ההזמנה הייתה מגיעה ב-+7, הבדיקה הייתה חוסמת/מזהירה.",
          cbcHe:
            "ב-CBC חלקי-חילוף קריטיים (אטמים, מנועים) נבדקים אוטומטית בשחרור פקודת-תקלה — אם החלק לא זמין בחלון-התחזוקה, ראש-המשמרת מקבל התראה ומתאם אספקה לפני עצירת-הקו.",
          navHe: [
            "SPRO ► Maintenance and Service Orders ► Functions and Settings for Order Types ► Availability Check ► Define Checking Control",
            "Production ► Sales and Distribution ► Basic Functions ► Availability Check ► Define Checking Groups / Define Scope of Check",
            "Availability Check ► Define Inspection Control / Define Checking Rule",
          ],
          tables: ["MARC", "TMVF", "T441V", "RESB"],
          tcodes: ["OPJJ", "IW31", "IW32", "OPJK"],
          fiori: ["F2782"],
          configHe: [
            "Define Checking Group (MTVFP באב-החומר): קבוצת-בדיקה הקובעת אם וכיצד מבוצעת בדיקה.",
            "Define Scope of Check: אילו תנועות נכללות ב-ATP (הזמנות-רכש, שמורות, מלאי-בטיחות, replenishment lead time).",
            "Define Checking Control (לכל order type/מפעל): מתי לבדוק (ידני/בשחרור), בדיקת-חומר/PRT, ואם החֶסֶר חוסם או מזהיר.",
            "בדיקות נפרדות: חומר (ATP), PRT (Production Resources/Tools), והיתרים (Permits).",
          ],
          flow: [
            { he: "הגדר Checking Group", code: "MTVFP" },
            { he: "הגדר Scope of Check", note: "אילו תנועות" },
            { he: "הגדר Checking Control", note: "מתי + חוסם/מזהיר" },
            { he: "בדיקה בשחרור", code: "ATP" },
            { he: "תוצאה: זמין/חסר", note: "שחרור/חסימה" },
          ],
          masterDataHe: [
            "MARC-MTVFP (Availability Checking Group) באב-החומר מחבר את החומר לבדיקה.",
            "מלאי, הזמנות-רכש ושמורות (RESB) הם הקלט ל-ATP.",
          ],
          mistakesHe: [
            "Scope of Check הכולל יותר-מדי תנועות — זמינות אופטימית-מדי.",
            "אי-הפעלת בדיקה בשחרור — פקודות משוחררות ללא חלקים.",
            "Checking Group ריק באב-החומר — אין בדיקה כלל.",
            "חסימה קשיחה בלי תהליך-חריגה — פקודות-תקלה נתקעות.",
          ],
          troubleshootHe: [
            "הבדיקה לא מתבצעת ➔ MTVFP חסר באב-החומר או Checking Control לא מופעל.",
            "זמינות שגויה ➔ Scope of Check כולל/מחריג תנועות לא-נכונות.",
            "פקודת-תקלה נחסמת ➔ הגדר אזהרה במקום חסימה לסוג-תקלה.",
            "PRT לא נבדק ➔ בדיקת-PRT לא הופעלה ב-Checking Control.",
          ],
          bestPracticeHe: [
            "הגדר Scope of Check שמרני — עדיף חֶסֶר מזוהה מאשר הפתעה ברצפה.",
            "הפעל בדיקה אוטומטית בשחרור.",
            "לפקודות-תקלה — אזהרה (לא חסימה) כדי לא לעכב טיפול דחוף.",
            "תאם Checking Group עם צוות-לוגיסטיקה/MM.",
          ],
          interviewHe: [
            { qHe: "מהי בדיקת-זמינות דינמית?", aHe: "בדיקת-ATP המחשבת את הזמינות בתאריך-הדרישה (לא היום) בהתחשב בכל הקבלות וההוצאות המתוכננות עד אותו תאריך." },
            { qHe: "מה קובע Scope of Check?", aHe: "אילו תנועות-מלאי נכללות בחישוב ה-ATP — הזמנות-רכש, שמורות, מלאי-בטיחות, זמן-אספקה — ובכך את התוצאה." },
            { qHe: "היכן מגדירים אם החֶסֶר חוסם שחרור?", aHe: "ב-Define Checking Control לכל order type/מפעל; ניתן לקבוע חסימה או אזהרה." },
          ],
          takeawaysHe: [
            "בדיקת-זמינות = ATP בתאריך-הדרישה.",
            "Checking Group (MTVFP) + Scope of Check + Checking Control.",
            "ניתן לחסום או להזהיר בשחרור.",
            "בדיקות נפרדות לחומר, PRT והיתרים.",
          ],
          relatedHe: [{ labelHe: "PM · תכנון חומר (5.2.4)", href: "/library/pm/chapter-05/#sub-5.2.4" }],
        },
        {
          id: "5.2.3", titleHe: "קטלוגי חלקים אלקטרוניים", titleEn: "Electronic Parts Catalogs",
          execHe:
            "קטלוגי-חלקים אלקטרוניים (Electronic Parts Catalogs) מחברים, דרך תקן OCI (Open Catalog Interface), קטלוג-ספק חיצוני ל-Asset Management. הטכנאי בוחר חלקי-חילוף בקטלוג-הספק, מוסיף לסל (Add to Shopping Cart), ומבצע Checkout שמעביר את הפריטים בחזרה לפקודת-SAP כרכיבים — ובכך מאיץ ומדייק את רכש חלקי-החילוף.",
          beginnerHe:
            "במקום לחפש מספר-חלק ידנית, נכנסים לאתר-החלקים של הספק מתוך SAP, בוחרים את החלק כמו בקנייה אונליין, ולוחצים 'העבר ל-SAP'. הפרטים (מספר, מחיר, ספק) חוזרים אוטומטית לפקודה.",
          consultantHe:
            "OCI הוא תקן-ה-Punch-Out של SAP: מגדירים את כתובת-הקטלוג, פרמטרי-ההתחברות ומודולי-ההמרה (Conversion Modules) הממפים שדות-קטלוג לשדות-SAP — למשל IOCI_CONVERT_INFO_REC_W (VENDOR/VENDORMAT), IOCI_DESCRIPTION_W (MATERIAL/DESCRIPTION), IOCI_LONGTEXT_W. הקטלוג משויך לסוג-פקודה/מפעל ומופעל כרכיב לא-מלאי (N) בפקודה.",
          purposeHe:
            "לפשט ולדייק את רכש חלקי-החילוף: גישה ישירה לקטלוג-הספק המעודכן, ללא הקלדה ידנית של מספרי-חלק ומחירים, והפחתת שגיאות-הזמנה.",
          processExampleHe:
            "טכנאי מתכנן פקודה, פותח את קטלוג-הספק (OCI), בוחר מסבך ואטם, Add to Cart, Checkout — והפריטים חוזרים כרכיבי-N עם מספרי-ספק ומחירים; דרישת-הרכש נוצרת אוטומטית.",
          cbcHe:
            "ב-CBC קטלוג-OCI של ספק חלקי-מכונות-מילוי מחובר ל-PM03; טכנאים מזמינים חלקים-ייעודיים ישירות מהפקודה בלי לתחזק אלפי מספרי-חלק כאב-חומר.",
          navHe: [
            "SPRO ► Maintenance and Service Orders ► Functions and Settings for Order Types ► Electronic Parts Catalog ► Define Catalogs",
            "Electronic Parts Catalog ► Define Conversion Modules",
            "Electronic Parts Catalog ► Assign Catalog to Order Type / Plant",
          ],
          tables: ["AUFK", "RESB", "EBAN"],
          tcodes: ["IW31", "IW32"],
          fiori: ["F2782"],
          configHe: [
            "Define Catalogs: כתובת-URL של קטלוג-הספק, פרמטרי-OCI ופרטי-התחברות.",
            "Define Conversion Modules: מיפוי שדות-קטלוג↔SAP — IOCI_CONVERT_INFO_REC_W, IOCI_CONVERT_MPM_W, IOCI_CONVERT_OLD_MAT_NO_W, IOCI_DESCRIPTION_W, IOCI_LONGTEXT_W.",
            "Assign Catalog: שיוך הקטלוג ל-order type/מפעל; הפריטים נכנסים כרכיב לא-מלאי (N).",
            "תהליך-המשתמש: בחירה בקטלוג ► Add to Shopping Cart ► Checkout ► חזרה ל-SAP כרכיבים.",
          ],
          flow: [
            { he: "הגדר קטלוג OCI", code: "Define Catalogs" },
            { he: "מודולי-המרה", code: "IOCI_*" },
            { he: "שייך ל-order type/מפעל", note: "Assign" },
            { he: "בחר חלקים בקטלוג", note: "Add to Cart" },
            { he: "Checkout ► רכיב N", code: "EBAN" },
          ],
          masterDataHe: [
            "הרכיבים נכנסים כלא-מלאי (N) — אין צורך באב-חומר מלא לכל חלק.",
            "מספרי-ספק (VENDORMAT) ומחירים מגיעים מהקטלוג דרך מודולי-ההמרה.",
          ],
          mistakesHe: [
            "מודול-המרה שגוי — שדות-קטלוג לא ממופים נכון לפקודה.",
            "אי-שיוך הקטלוג ל-order type — הקטלוג לא זמין בפקודה.",
            "ציפייה לרכיב-מלאי (L) במקום לא-מלאי (N) מקטלוג חיצוני.",
            "פרטי-OCI/URL שגויים — Punch-Out נכשל.",
          ],
          troubleshootHe: [
            "הקטלוג לא נפתח מהפקודה ➔ URL/פרמטרי-OCI שגויים או הקטלוג לא שויך.",
            "הפריטים חוזרים חסרי-מחיר/ספק ➔ מודול-המרה לא ממפה VENDOR/VENDORMAT.",
            "אין דרישת-רכש ➔ הרכיב לא נכנס כ-N או חסרה קטגוריית-פריט ברירת-מחדל (5.2.4).",
          ],
          bestPracticeHe: [
            "השתמש ב-OCI לחלקים ייעודיים/נדירים במקום לתחזק אב-חומר לכל פריט.",
            "וודא מיפוי מלא במודולי-ההמרה (מספר, תיאור, מחיר, ספק).",
            "הגבל קטלוגי-OCI לספקים מאושרים בלבד.",
          ],
          interviewHe: [
            { qHe: "מהו OCI בהקשר קטלוגי-חלקים?", aHe: "Open Catalog Interface — תקן Punch-Out המאפשר לגלוש בקטלוג-ספק חיצוני מתוך SAP ולהחזיר את הפריטים שנבחרו לפקודה/לדרישת-רכש." },
            { qHe: "מה תפקיד מודולי-ההמרה?", aHe: "למפות את שדות-הקטלוג (מספר, תיאור, מחיר, ספק) לשדות-SAP, למשל IOCI_DESCRIPTION_W ל-MATERIAL/DESCRIPTION." },
            { qHe: "כקטגוריית-פריט מה מקבלים החלקים מהקטלוג?", aHe: "לרוב לא-מלאי (N) — נוצרת דרישת-רכש ישירה, ללא צורך באב-חומר מלא." },
          ],
          takeawaysHe: [
            "OCI מחבר קטלוג-ספק חיצוני לפקודה.",
            "תהליך: בחירה ► Add to Cart ► Checkout ► רכיב N.",
            "מודולי-המרה (IOCI_*) ממפים שדות.",
            "פותר רכש חלקים-ייעודיים בלי אב-חומר מלא.",
          ],
          relatedHe: [{ labelHe: "PM · תכנון חומר (5.2.4)", href: "/library/pm/chapter-05/#sub-5.2.4" }],
        },
        {
          id: "5.2.4", titleHe: "תכנון חומר", titleEn: "Material Planning",
          execHe:
            "תכנון-החומר בפקודה קובע כיצד רכיבים נרכשים ונצרכים: קטגוריית-פריט ברירת-מחדל (L מלאי / N לא-מלאי), Movement Types לשמורות, קטגוריית-הקצאה וסוג-מסמך לדרישות-רכש, פרופילי-רכש-חיצוני, רצף-קביעת-כתובת-משלוח, ורלוונטיות-MRP. אלו הגדרות שמחברות את הפקודה ל-MM ולמחסן.",
          beginnerHe:
            "כשמוסיפים חלק לפקודה, צריך להגיד אם הוא מהמלאי (L — שומרים אותו) או נרכש מספק (N — מזמינים). תכנון-החומר מגדיר את ברירות-המחדל האלה לפי מפעל וסוג-חומר, ואת אופן-יצירת דרישות-הרכש.",
          consultantHe:
            "Default Item Categories (לפי מפעל × Material Type): L ל-ERSA (חלקי-חילוף), N ל-NLAG; חובה רשומה-ריקה (ללא Material Type) לחלקים ללא מספר. Movement Types for Reservations: היישום IW01 עם 261/262 להוצאה/ביטול (שיפוץ דורש גם 101/102). Account Assignment Category + Document Type: NB ו-F. Res/PurRq (1 לעולם-לא / 2 מ-שחרור / 3 מיד) קובע מתי דרישת-רכש/שמורה הופכות רלוונטיות-MRP. CollReqstn מקבץ דרישות תחת מספר-אחד.",
          purposeHe:
            "להבטיח שכל רכיב יקבל את התנהגות-הרכש הנכונה אוטומטית, בלי הקלדה ידנית בכל פקודה, ולשלוט מתי הדרישות נכנסות לתכנון (MRP).",
          processExampleHe:
            "טכנאי מוסיף חלק-חילוף (ERSA) — ברירת-המחדל L יוצרת שמורה עם תנועה 261. הוא מוסיף שירות-חיצוני ללא מספר-חומר — הרשומה-הריקה נותנת N, ונוצרת דרישת-רכש (NB/F). אם Res/PurRq=2, הדרישה הופכת רלוונטית-MRP רק בשחרור.",
          cbcHe:
            "ב-CBC חלקי-מלאי (אטמים, מסבכים = ERSA) מקבלים L אוטומטית; שירותי-קבלן וחלקים-מיוחדים מקבלים N. Res/PurRq=2 כדי שדרישות-תקלה לא יוצפו ל-MRP לפני שהפקודה אושרה לביצוע.",
          navHe: [
            "SPRO ► Maintenance and Service Orders ► General Data ► Define Default Values for Component Item Categories",
            "Maintenance and Service Orders ► General Data ► Define Movement Types for Material Reservations",
            "Functions and Settings for Order Types ► Procurement ► Define Account Assignment Category... / Define Collective Purchase Requisition and MRP Relevance",
          ],
          tables: ["RESB", "EBAN", "T156", "T399X"],
          tcodes: ["IW31", "IW32", "OML8", "ME51N"],
          fiori: ["F2782", "F4073"],
          configHe: [
            "Define Default Values for Component Item Categories: L ל-ERSA, N ל-NLAG; הוסף רשומה-ריקה (ללא Material Type) עם N לחלקים ללא מספר.",
            "Define Movement Types for Material Reservations: יישום IW01 עם 261 (הוצאה) ו-262 (ביטול); לשיפוץ גם 101/102.",
            "Define Account Assignment Category and Document Type: NB (דרישת-רכש) ו-F (Order); ברירות-המחדל מספיקות לרוב.",
            "Define Collective Purchase Requisition and MRP Relevance: CollReqstn (קיבוץ דרישות), Res/PurRq (1/2/3 — מתי רלוונטי-MRP), Net Order Price.",
            "Create Default Value Profiles for External Procurement: ערכי-ברירת-מחדל (Cost Element, Purch. Org, Purch. Group, Material Group) לחומר ולשירות בנפרד.",
            "Define Access Sequence for Determining Address Data: רצף קביעת כתובת-משלוח (1 פקודה, 2 מיקום, 3 ציוד, 4/5 שותפים).",
          ],
          flow: [
            { he: "הוסף רכיב לפקודה", code: "IW32" },
            { he: "קטגוריית-פריט ברירת-מחדל", note: "L/N" },
            { he: "L ► שמורה", code: "261/RESB" },
            { he: "N ► דרישת-רכש", code: "NB/EBAN" },
            { he: "רלוונטיות-MRP", note: "Res/PurRq 1/2/3" },
          ],
          masterDataHe: [
            "Material Type (ERSA/NLAG) באב-החומר קובע את קטגוריית-הפריט ברירת-המחדל.",
            "כתובת-המשלוח נגזרת מאובייקטי-אחזקה (מיקום/ציוד/שותפים) לפי רצף-הגישה.",
            "RESB מאחסן את השמורות; EBAN את דרישות-הרכש.",
          ],
          mistakesHe: [
            "אי-הוספת רשומה-ריקה (ללא Material Type) — חלקים-ללא-מספר חסרי קטגוריית-ברירת-מחדל.",
            "Res/PurRq=3 לחלקי-תקלה — הצפת MRP בדרישות לפני אישור-ביצוע.",
            "שינוי Movement Types ללא צורך — משפיע על כל הפקודות (אין הבחנה לפי order type).",
            "הגדרת L לשירות-חיצוני — לא נוצרת דרישת-רכש.",
          ],
          troubleshootHe: [
            "אין דרישת-רכש לחלק חיצוני ➔ קטגוריה L במקום N, או חסרה רשומה-ריקה.",
            "שמורה לא נוצרת ➔ Movement Type 261 לא הוגדר ליישום IW01.",
            "דרישות מציפות MRP מוקדם ➔ Res/PurRq=3; שנה ל-2 (מ-שחרור).",
            "דרישות מפוצלות במקום מקובצות ➔ CollReqstn לא מסומן.",
          ],
          bestPracticeHe: [
            "הגדר תמיד רשומה-ריקה עם N לחלקים ללא מספר-חומר.",
            "השתמש ב-Res/PurRq=2 (מ-שחרור) לאיזון בין נראות לתכנון.",
            "הגדר פרופילי-רכש-חיצוני נפרדים לחומר ולשירות.",
            "אל תשנה Movement Types סטנדרטיים אלא אם הגדרת תנועות-עצמיות.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל L מול N בפקודת-אחזקה?", aHe: "L = רכיב-מלאי → שמורה (Reservation) מול המלאי, הוצאה 261; N = לא-מלאי → דרישת-רכש ישירה (NB/F) לפקודה." },
            { qHe: "מה שולט Res/PurRq?", aHe: "מתי דרישות-רכש ושמורות הופכות רלוונטיות-MRP: 1 לעולם-לא, 2 מ-שחרור, 3 מיד. שמורה תמיד נוצרת — האינדיקטור משפיע רק על רלוונטיות-MRP." },
            { qHe: "למה חשובה הרשומה-הריקה ב-Default Item Categories?", aHe: "היא מספקת קטגוריית-פריט (לרוב N) לחלקים שמוזנים ללא מספר-חומר — אחרת המשתמש חייב להזין ידנית." },
          ],
          takeawaysHe: [
            "תכנון-חומר מחבר את הפקודה ל-MM ולמחסן.",
            "L=מלאי/שמורה/261, N=לא-מלאי/דרישת-רכש/NB-F.",
            "Res/PurRq קובע רלוונטיות-MRP (1/2/3).",
            "הוסף תמיד רשומה-ריקה לחלקים ללא מספר.",
          ],
          relatedHe: [{ labelHe: "PM · בדיקת זמינות (5.2.2)", href: "/library/pm/chapter-05/#sub-5.2.2" }],
        },
        {
          id: "5.2.5", titleHe: "תזמון", titleEn: "Scheduling",
          execHe:
            "התזמון (Scheduling) מחשב את התאריכים-המתוזמנים ברמת-הפעולה וברמת-הכותרת מתוך התאריכים-הבסיסיים ומשכי-הפעולות. הוא מתבצע כתזמון-קדימה (Forward) או אחורה (Backward), ויוצר חוצץ (buffer) בין המוקדם ללאחור. תזמון הגיוני רק כשיש זמני-תקן אמינים.",
          beginnerHe:
            "התזמון אומר 'מתי כל פעולה מתחילה ומסתיימת'. נותנים תאריך-בסיס ומשך לכל פעולה, והמערכת מחשבת את הלוח. אם אין זמני-תקן — אין טעם בתזמון, ומכבים אותו דרך מפתח-בקרה.",
          consultantHe:
            "תנאים: משך בכל פעולה; Control Key עם Scheduling פעיל; נוסחת-משך במרכז-העבודה המצביעה על DAUNO (SAP004). Formula Parameters (SAP_10 ל-DAUNO, SAP_07 ל-ARBEI) ו-Formula Definitions (SAP004/SAP008) מגדירים את החישוב. Scheduling Type (OPJN): Forwards/Backwards/Current/Only capacity requirements/Don't schedule. Set Scheduling Parameters (OPU7) לכל order type/מפעל קובע סוג-תזמון, Adjust Dates, Automatic Scheduling, Scheduling with breaks, Shift Order. Production Scheduler חייב להיות * ב-PM.",
          purposeHe:
            "לקבל לוח-זמנים מציאותי לעבודה: מתי להתחיל, מתי להיערך לחלקים, ומה החוצץ. התזמון מזין גם את חישוב-הקיבולת ואת תמחיר-העבודה.",
          processExampleHe:
            "פקודה עם תאריך-בסיס-התחלה 1.11 ופעולות בנות 4 ו-2 שעות. תזמון-קדימה מחשב מהבסיס את התאריכים-המוקדמים; ההפרש מהתאריכים-המאוחרים נותן חוצץ ברמת-הכותרת. Latest Staging Date כבוי כדי שהחומר ייערך לתאריך-המוקדם.",
          cbcHe:
            "ב-CBC לחלון-תחזוקה שבועי משתמשים בתזמון-קדימה מתאריך-תחילת-החלון; Automatic Scheduling פעיל, Adjust Dates = 'אל תתאם תאריכי-בסיס' כדי לשמר את החלון-המתוכנן.",
          navHe: [
            "SPRO ► Production ► Shop Floor Control ► Operations ► Scheduling ► Define Formula Parameters / Define Formulas / Specify Scheduling Type",
            "SPRO ► Maintenance and Service Orders ► Scheduling ► Set Scheduling Parameters",
            "Maintenance and Service Orders ► General Data ► Activate Default Value for Current Date as Basic Date / Define Default Values for Units for Operation",
          ],
          tables: ["AFKO", "AFVC", "AFVV", "T399A", "TC21"],
          tcodes: ["OP7B", "OPK3", "OPJN", "OPU7", "OIO9"],
          fiori: ["F2782", "F4073"],
          configHe: [
            "Define Formula Parameters (OP7B): SAP_10 ל-DAUNO (משך), SAP_07 ל-ARBEI (עבודה).",
            "Define Formulas (OPK3): SAP004 (משך — Allowed for Scheduling), SAP008 (עבודה — Allowed for Calculation + Work Center for Capacity Reqmts).",
            "Specify Scheduling Type (OPJN): Forwards/Backwards/Current date/Only capacity requirements/Don't schedule.",
            "Set Scheduling Parameters (OPU7, לכל order type/מפעל): Adjust Dates, Scheduling Type, Automatic Scheduling, Automatic log, Scheduling with breaks, Shift Order, Latest Staging Date. Production Scheduler = *.",
          ],
          flow: [
            { he: "הזן משך בפעולות", code: "DAUNO" },
            { he: "Control Key עם Scheduling", note: "פעיל" },
            { he: "נוסחת-משך במרכז-עבודה", code: "SAP004" },
            { he: "סוג-תזמון", code: "OPJN", note: "Forward/Backward" },
            { he: "תזמון אוטומטי בשמירה", code: "OPU7" },
          ],
          masterDataHe: [
            "מרכז-העבודה (CRHD) נושא את נוסחת-המשך (Duration of Internal Processing) המצביעה על DAUNO.",
            "Control Key של הפעולה קובע אם תזמון פעיל.",
            "Scheduling Margin Key מספק חוצצים (floats) לחישוב התאריכים.",
          ],
          mistakesHe: [
            "Adjust Dates שמתאים תאריכי-בסיס — דריסת התאריכים שהוזנו ידנית (אובדן בלתי-הפיך).",
            "הפעלת תזמון ללא זמני-תקן — לוח חסר-משמעות.",
            "נוסחת-מרכז-עבודה לא מצביעה על DAUNO — אין חישוב-משך.",
            "Latest Staging Date מסומן — חומר נערך מאוחר מדי.",
          ],
          troubleshootHe: [
            "התזמון לא מחשב ➔ חסר משך/Control Key ללא Scheduling/נוסחה לא מצביעה על DAUNO.",
            "תאריכי-בסיס נדרסים ➔ Adjust Dates ל-'Do not adjust basic dates'.",
            "פופ-אפ לוג מציק בכל שמירה ➔ כבה Automatic log.",
            "חומר נערך באיחור ➔ בטל Latest Staging Date (השתמש בתאריך-המוקדם).",
          ],
          bestPracticeHe: [
            "Adjust Dates = 'Do not adjust basic dates'.",
            "ב-PM תזמון-קדימה (Forward) הוא התרחיש הרגיל.",
            "הפעל Automatic Scheduling, כבה Automatic log, הפעל Scheduling with breaks ו-Shift Order.",
            "אם אין זמני-תקן — כבה תזמון דרך Control Key.",
          ],
          interviewHe: [
            { qHe: "מתי תזמון הגיוני ב-PM?", aHe: "רק כשיש זמני-תקן אמינים בפעולות. ללא זמני-תקן יש לכבות תזמון דרך Control Key שאצלו Scheduling לא פעיל." },
            { qHe: "על איזה שדה חייבת להצביע נוסחת-המשך?", aHe: "על DAUNO (משך-הפעולה). בסטנדרט זו הנוסחה SAP004, ויש לסמן בה Allowed for Scheduling." },
            { qHe: "למה Adjust Dates צריך להיות 'לא לתאם'?", aHe: "כדי שתאריכי-הבסיס שהוזנו ידנית לא יידרסו על-ידי התאריכים-המתוזמנים — דריסה זו בלתי-הפיכה." },
          ],
          takeawaysHe: [
            "תזמון מחשב תאריכים מבסיס + משכים (Forward/Backward).",
            "תנאים: משך + Control Key + נוסחת-DAUNO (SAP004).",
            "OPU7 מגדיר פרמטרים לכל order type/מפעל.",
            "Production Scheduler = * ב-PM; אל תתאם תאריכי-בסיס.",
          ],
          relatedHe: [{ labelHe: "PM · תכנון קיבולת (5.2.6)", href: "/library/pm/chapter-05/#sub-5.2.6" }],
        },
        {
          id: "5.2.6", titleHe: "תכנון קיבולת", titleEn: "Capacity Planning",
          execHe:
            "תכנון-הקיבולת (Capacity Planning) משווה את הקיבולת-הזמינה (במרכז-העבודה) לדרישת-הקיבולת (מזמני-העבודה בפעולות). הוא מתבצע בשלושה שלבים: תזמון → יצירת-דרישות → איזון-קיבולת. כמו תזמון, הוא הגיוני רק כשיש נפח-פקודות מספיק וזמני-תקן אמינים — תנאים שלעיתים אינם מתקיימים ב-PM.",
          beginnerHe:
            "קיבולת = 'כמה שעות-עבודה יש לי, וכמה אני צריך'. תכנון-הקיבולת משווה את השניים ומראה עומס-יתר/חוסר-עומס, כדי שאפשר יהיה להזיז פקודות. אם אין זמני-תקן או יש הרבה תקלות בלתי-מתוכננות — מכבים אותו.",
          consultantHe:
            "דרישת-הקיבולת נגזרת משדה Work בפעולות דרך נוסחה המצביעה על ARBEI (SAP008). תנאים: נוסחת-ARBEI במרכז-העבודה; Control Key עם Capacity Requirements פעיל; תזמון מבוצע. Capacity Category 002 (Person) הוא העיקרי ב-PM (CapCat. Per). הקיבולת-הזמינה מוגדרת ב-Capacities tab של מרכז-העבודה, או דרך Shift Sequences (OP4A). הערכה: CM01; איזון: CM33/CM34 עם Overall Profiles (OPA6/OPD0).",
          purposeHe:
            "להבטיח שעומס-העבודה תואם את כוח-האדם הזמין: זיהוי צווארי-בקבוק, הזזת-פקודות ואיזון-משאבים — בעיקר לכוח-אדם (Person), שהוא המשאב-הקריטי באחזקה.",
          processExampleHe:
            "צוות-מכונות בקיבולת 40 שע'/שבוע; פקודות-השבוע דורשות 52 שע'. CM01 מראה עומס-יתר 130%. המתכנן ב-CM34 מזיז שתי פקודות-מונע לשבוע הבא ומאזן ל-95%.",
          cbcHe:
            "ב-CBC משתמשים בתכנון-קיבולת בעיקר לאחזקה-מונעת (זמני-תקן ידועים), עם Capacity Category 002 לטכנאים. פקודות-תקלה בלתי-צפויות לרוב מחוץ לחישוב; חלון-התחזוקה השבועי מאוזן ב-CM34.",
          navHe: [
            "SPRO ► Production ► Capacity Requirements Planning ► Master Data ► Capacity Data ► Define Capacity Category",
            "SPRO ► Production ► Capacity Requirements Planning ► Operations ► Available Capacity ► Define Shift Sequences",
            "Capacity Requirements Planning ► Evaluation/Leveling ► Profiles ► Define Overall Profiles",
          ],
          tables: ["KAKO", "CRCA", "CRHD", "AFVV"],
          tcodes: ["OP4A", "OPA6", "OPD0", "CM01", "CM33", "CM34"],
          fiori: ["F2782", "F4006"],
          configHe: [
            "Define Capacity Category: 002 (Person) עם CapCat. Per — הקטגוריה העיקרית ל-PM.",
            "Define Shift Sequences (OP4A): Work break schedules → Shift definitions → Shift sequences לקיבולת-זמינה מורכבת.",
            "Define Overall Profiles in Capacity Evaluation (OPA6) ל-CM01; Define Overall Profile in Capacity Leveling (OPD0) ל-CM33/CM34.",
            "תנאים ליצירת-דרישה: נוסחת-ARBEI (SAP008) במרכז-העבודה, Control Key עם Capacity Requirements, ותזמון מבוצע.",
          ],
          flow: [
            { he: "קיבולת-זמינה במרכז-עבודה", code: "Capacities tab" },
            { he: "דרישה מ-Work בפעולות", code: "ARBEI/SAP008" },
            { he: "תזמון מבוצע", note: "תנאי" },
            { he: "הערכה", code: "CM01" },
            { he: "איזון", code: "CM33/CM34" },
          ],
          masterDataHe: [
            "Capacities tab במרכז-העבודה מגדיר קיבולת-זמינה (תקנית או דרך Shift Models).",
            "מספר-האנשים × Shift Definition קובעים את הקיבולת-הזמינה בפועל.",
            "נוסחת-ARBEI (SAP008) במרכז-העבודה מתרגמת Work לדרישת-קיבולת.",
          ],
          mistakesHe: [
            "הפעלת תכנון-קיבולת ללא זמני-תקן/נפח מספיק — נתונים חסרי-משמעות.",
            "Capacity Category ללא CapCat. Per — לא מתאים לכוח-אדם.",
            "Control Key ללא Capacity Requirements — אין דרישת-קיבולת.",
            "אי-ביצוע תזמון — אין בסיס לדרישה.",
          ],
          troubleshootHe: [
            "אין דרישת-קיבולת ➔ נוסחת-ARBEI חסרה / Control Key ללא Capacity Req / תזמון לא בוצע.",
            "קיבולת-זמינה שגויה ➔ Shift Sequence/מספר-אנשים במרכז-העבודה שגויים.",
            "תכנון-קיבולת חסר-תועלת ➔ אין זמני-תקן או יותר-מדי תקלות בלתי-מתוכננות; שקול לכבות.",
          ],
          bestPracticeHe: [
            "הפעל תכנון-קיבולת רק לאחזקה-מונעת עם זמני-תקן.",
            "השתמש ב-Capacity Category 002 (Person) לכוח-אדם.",
            "השתמש בפרופילים סטנדרטיים (SAPX911/SAPPM_G006) והעתק לפי הצורך.",
            "כבה קיבולת לפקודות-תקלה דרך Control Key.",
          ],
          interviewHe: [
            { qHe: "מהם שלושת שלבי תכנון-הקיבולת?", aHe: "תזמון (קביעת מתי), יצירת-דרישות-קיבולת (מ-Work בפעולות), ואיזון-קיבולת (השוואה והזזת-פקודות)." },
            { qHe: "איזו Capacity Category עיקרית ב-PM?", aHe: "002 (Person) — כוח-האדם הוא המשאב-הקריטי באחזקה; יש לוודא CapCat. Per." },
            { qHe: "מתי לא להפעיל תכנון-קיבולת?", aHe: "כשאין זמני-תקן אמינים או יש נפח-גדול של פקודות בלתי-מתוכננות — אז כדאי לכבות דרך Control Key." },
          ],
          takeawaysHe: [
            "קיבולת = השוואת זמין מול נדרש בשלושה שלבים.",
            "דרישה מ-Work דרך נוסחת-ARBEI (SAP008).",
            "Capacity Category 002 (Person) עיקרי ב-PM.",
            "הערכה CM01, איזון CM33/CM34.",
          ],
          relatedHe: [{ labelHe: "PM · תזמון (5.2.5)", href: "/library/pm/chapter-05/#sub-5.2.5" }],
        },
        {
          id: "5.2.7", titleHe: "הדפסה", titleEn: "Printing",
          execHe:
            "הדפסת-הפקודה (Printing) מפיקה את מסמכי-העבודה (Shop Papers) — כרטיס-בקרת-פעולה, כרטיס-עבודה, כרטיסי-זמן, פתקי-אישור, רשימת-ליקוט-חומר, פתקי-הוצאת-חומר ורשימת-אובייקטים. הארגון שולט בכמה מסמכים, אילו, פריסתם, ולאיזה מדיום (מדפסת/פקס/דוא\"ל/הורדה). בדרך-כלל מדפיסים את הפקודה (לא ההודעה).",
          beginnerHe:
            "כשהפקודה מוכנה, מדפיסים 'ניירת-עבודה' לטכנאי: מה לעשות, אילו חלקים לקחת, ואיפה לרשום את הזמן. אפשר להדפיס למדפסת, לשלוח בדוא\"ל, או לפקס. כל מסמך כזה הוא Shop Paper.",
          consultantHe:
            "Define Shop Papers (OIDF/OIDG): לכל מסמך — Program, ABAP Form, SAPscript Form; Delta print (רק מה שטרם הודפס), Operation stat./Material status (קביעת סטטוס Printed), Time tckt ind./Completion slip (תלוי Control Key), Print Before Release/After Completion (דורש LOG_EAM_CI_7). Define Printer (OIDH/OIDI/OIDJ): בקרת-הדפסה לפי-משתמש ו-Print Diversion. Diversion גובר על בחירת-המשתמש ועל מדפסת-מרכז-העבודה, ברמת H/O/M/W (טבלאות CAUFVD/AFVGD/RESBD).",
          purposeHe:
            "לספק לטכנאי וללוגיסטיקה בדיוק את המסמכים הנדרשים, במדיום הנכון, עם בקרת-הדפסה (Delta, סטטוס-Printed) שמונעת הדפסות-יתר ומבטיחה עדכניות.",
          processExampleHe:
            "בשחרור פקודה מודפסים: כרטיס-בקרת-פעולה למפקח, רשימת-ליקוט למחסן, וכרטיסי-זמן לטכנאי. Delta print מבטיח שבהדפסה-חוזרת רק פעולות-חדשות יודפסו. כרטיס-הזמן מודפס רק לפעולות עם Control Key שבו Print Time Tic. פעיל.",
          cbcHe:
            "ב-CBC כרטיסי-זמן ופתקי-אישור מנותבים (Print Diversion) למדפסת קו-המילוי דרך מרכז-העבודה (IR02); רשימות-ליקוט נשלחות למדפסת-המחסן. חלק מהפקודות נשלחות כ-PDF בדוא\"ל לטאבלט-הטכנאי.",
          navHe: [
            "SPRO ► Maintenance and Service Orders ► Print Control ► Define Shop Papers, Forms, and Output Programs",
            "Print Control ► Define Printer",
            "Functions and Settings for Order Types ► Define Status Control for Shop Papers",
          ],
          tables: ["CAUFVD", "AFVGD", "RESBD", "T390", "T391"],
          tcodes: ["OIDF", "OIDG", "OIDH", "OIDI", "OIDJ"],
          fiori: ["F2782"],
          configHe: [
            "Define Shop Papers (OIDF): Shop paper, Program, ABAP Form, SAPscript Form; Delta print, Operation stat., Material status, Time tckt ind., Completion slip, Print Before Release/After Completion (LOG_EAM_CI_7).",
            "Define Shop Papers for Order Type (OIDG): איזה מסמך לכל order type; masking לסוגים שלא צוינו.",
            "Define Printer (OIDH/OIDI/OIDJ): בקרה לפי-משתמש/מפעל/קבוצת-מתכננים; Print Diversion (גובר על הכל, ברמת H/O/M/W).",
            "Send by Email: SBWP (forwarding), SCOT (INT job), SPAD (מדפסת EMAIL עם PDF1, גישה M); הקצה EMAIL כפלט.",
            "Define Status Control for Shop Papers: מעקב-עדכניות — אם הפקודה השתנתה אחרי הדפסה, חוסם TECO עד הדפסה-חוזרת.",
          ],
          flow: [
            { he: "הגדר Shop Paper + Form", code: "OIDF" },
            { he: "שייך ל-order type", code: "OIDG" },
            { he: "בקרת-מדפסת/Diversion", code: "OIDH" },
            { he: "הדפסה בשחרור", note: "Delta" },
            { he: "סטטוס Printed", note: "מעקב-עדכניות" },
          ],
          masterDataHe: [
            "Control Key של הפעולה קובע אם מודפס כרטיס-זמן/פתק-אישור.",
            "מדפסת-מרכז-העבודה (IR02, Shop Paper Printer) משמשת לניתוב פתקי-זמן/אישור.",
          ],
          mistakesHe: [
            "אי-סימון Operation stat./Material status — סטטוס Printed לעולם לא נקבע, Delta מדפיס הכל.",
            "שכחת LOG_EAM_CI_7 כשרוצים הדפסה לפני-שחרור/אחרי-השלמה.",
            "Print Diversion שגוי — מסמכים למדפסת לא-נכונה (גובר על הכל).",
            "ריבוי Shop Papers — עומס-ניירת מיותר.",
          ],
          troubleshootHe: [
            "Delta מדפיס מסמכים שכבר הודפסו ➔ Operation stat./Material status לא מסומן.",
            "לא ניתן להדפיס לפני-שחרור ➔ הפעל LOG_EAM_CI_7 וסמן Print Before Release Allowed.",
            "המסמך יוצא במדפסת לא-נכונה ➔ Print Diversion פעיל וגובר; בדוק את הניתוב.",
            "כרטיס-זמן לא מודפס ➔ Control Key ללא Print Time Tic.",
          ],
          bestPracticeHe: [
            "סמן Operation stat./Material status כדי ש-Delta יעבוד נכון.",
            "השתמש ב-masking ב-OIDG לברירת-מחדל גורפת.",
            "השתמש בדוא\"ל (PDF) לטכנאים ניידים.",
            "הפעל Status Control למסמכים קריטיים כדי לחייב הדפסה-חוזרת אחרי שינוי.",
          ],
          interviewHe: [
            { qHe: "מהו Delta print וכיצד הוא תלוי בסטטוס?", aHe: "Delta מדפיס רק פעולות/רכיבים שטרם קיבלו סטטוס Printed. הסטטוס נקבע רק אם ב-Shop Paper מסומן Operation stat. (לפעולות) או Material status (לרכיבים)." },
            { qHe: "מה עדיפות Print Diversion?", aHe: "Print Diversion גובר על בקרת-ההדפסה לפי-משתמש ועל מדפסת-מרכז-העבודה; הוא העדיפות הגבוהה ביותר, ברמת כותרת/פעולה/רכיב." },
            { qHe: "כיצד שולחים מסמך בדוא\"ל?", aHe: "מגדירים מדפסת EMAIL (SPAD, device type PDF1, access M), job INT ב-SCOT, ומקצים את EMAIL כפלט בבקרת-ההדפסה." },
          ],
          takeawaysHe: [
            "Shop Papers = מסמכי-העבודה של הפקודה.",
            "Operation stat./Material status מאפשרים Delta print.",
            "Print Diversion גובר על כל בקרת-הדפסה אחרת.",
            "ניתן לשלוח PDF בדוא\"ל במקום להדפיס.",
          ],
          relatedHe: [{ labelHe: "PM · אישורי ביצוע (5.3)", href: "/library/pm/chapter-05/#sub-5.3" }],
        },
        {
          id: "5.2.8", titleHe: "עלויות משוערות ותמחיר", titleEn: "Estimated Costs and Costing",
          execHe:
            "התמחיר (Costing) מחשב אוטומטית עלויות-מתוכננות (ולאחר-מכן בפועל) מתעריפי-העלות ומתכנון-המשאבים. במקביל ניתן להזין עלויות-משוערות (Estimated Costs) ידנית, מתוך ניסיון-המתכנן. העלויות מוצגות לפי Cost Elements (מבט-בקרה) או לפי Value Categories (מבט-אחזקה: משוער/מתוכנן/בפועל), ברמת-פעולה או ברמת-כותרת.",
          beginnerHe:
            "המערכת יודעת כמה עולה כל שעת-עבודה וכל חלק, ולכן מחשבת אוטומטית כמה הפקודה תעלה (מתוכנן) וכמה עלתה (בפועל). בנוסף, המתכנן יכול להזין הערכה-גסה מראש (משוער). Value Categories מקבצות עלויות לקטגוריות-קריאות לאחזקה.",
          consultantHe:
            "Value Categories (OIK1, לכל Controlling Area, Component PM) + Assign Cost Elements to Value Categories (OIK2) + Default Values + Consistency Check (OIVC). חמש קטגוריות-טיפוסיות: עבודה-פנימית, שירותים-חיצוניים, חומר-מלאי, חומר-לא-מלאי, תקורה. החישוב: Costing Sheet (תקורות) + Valuation Variant (OKP8 — תעדוף-מחירים) + Costing Type → Costing Variant (OKP6); הקצאה לכל order type/מפעל (OIOF). Costs at Operation Level דורש LOG_EAM_OLC/_2. חוסר-עלויות = KP26/Control Key/נוסחת-ARBEI/מחיר-חומר.",
          purposeHe:
            "לתת שקיפות-עלות מלאה לפקודה — השוואת משוער/מתוכנן/בפועל — לצורכי תקצוב, בקרה והחלטות (תיקון מול החלפה), ולהזין את ה-PMIS.",
          processExampleHe:
            "מתכנן מזין עלות-משוערת 5,000 ש\"ח. תכנון-המשאבים (4 שע' × תעריף + חלקים) מחשב מתוכנן 4,300. לאחר ביצוע, אישורים ומשיכות מצטברים לבפועל 4,650. מבט-Value-Categories מציג את שלושת המספרים זה-לצד-זה.",
          cbcHe:
            "ב-CBC כל פקודת-תחזוקה צוברת עלות לפי קטגוריות (עבודה, חלקים, קבלן); מבט-Value-Categories מאפשר להשוות עלות-תחזוקה-מתוכננת מול בפועל לכל קו-מילוי ולחשב עלות-תחזוקה ל-hectoliter.",
          navHe: [
            "SPRO ► Maintenance and Service Processing ► Basic Settings ► Settings for Display of Costs ► Maintain Value Categories / Assign Cost Elements to Value Categories",
            "Functions and Settings for Order Types ► Costing Data for Maintenance and Service Orders ► Maintain Costing Sheet / Define Valuation Variants / Maintain Costing Variants",
            "Costing Data ► Assign Costing Parameters and Results Analysis Keys / Costs at Operation Level ► Define Cost Settings",
          ],
          tables: ["PMCO", "AUFK", "COSP", "COEP", "TCK03"],
          tcodes: ["OIK1", "OIK2", "OIVC", "OKP8", "OKP6", "OIOF", "KP26"],
          fiori: ["F2782", "F3411"],
          configHe: [
            "Maintain Value Categories (OIK1): ~5 קטגוריות — עבודה-פנימית, שירותים-חיצוניים, חומר-מלאי, חומר-לא-מלאי, תקורה; Cost/Revenue, יחידות-מידה.",
            "Assign Cost Elements to Value Categories (OIK2): שיוך cost elements/intervals/groups; שינוי-רטרו דורש RIPMCO00 + RIPMS001.",
            "Maintain Costing Sheet: שורות עבודה/חומר + תקורות (Base, Overhead Rate, Credit); Define Valuation Variants (OKP8): מחיר-חומר 7, פעילות 1, חיצוני 1/9.",
            "Maintain Costing Variants (OKP6) + Assign Costing Parameters (OIOF) לכל order type/מפעל; Costs at Operation Level דורש LOG_EAM_OLC/_2.",
          ],
          flow: [
            { he: "הגדר Value Categories", code: "OIK1" },
            { he: "שייך Cost Elements", code: "OIK2" },
            { he: "Costing Sheet + Valuation Variant", code: "OKP8" },
            { he: "Costing Variant + הקצאה", code: "OKP6/OIOF" },
            { he: "תמחיר אוטומטי בפקודה", note: "מתוכנן/בפועל" },
          ],
          masterDataHe: [
            "תעריפי-פעילות (KP26) למרכז-העלות × Activity Type מזינים את עלות-העבודה.",
            "מחירי-חומר (תקן/ממוצע) מאב-החומר מזינים את עלות-החומר.",
            "מרכז-העלות והנוסחה (ARBEI/SAP008) במרכז-העבודה נדרשים לחישוב.",
          ],
          mistakesHe: [
            "שיוך cost element לשתי Value Categories — שגיאת-עקביות (OIVC).",
            "שינוי שיוך-קטגוריות ללא RIPMCO00/RIPMS001 — נתוני-PMCO שגויים.",
            "ציפייה לעלות ללא KP26/נוסחת-ARBEI/מחיר-חומר.",
            "שיתוף תמחיר עם PP/PS במקום תמחיר נפרד ל-PM.",
          ],
          troubleshootHe: [
            "אין עלויות בפקודה ➔ בדוק KP26 (מחיר), Control Key עם Costing, נוסחת-ARBEI, ומחיר-חומר.",
            "חוסר-עקביות בשיוך ➔ הרץ OIVC; cost element שויך כפול או חסר.",
            "עלויות לא מתעדכנות אחרי שינוי-קטגוריות ➔ הרץ RIPMCO00 ו-RIPMS001.",
            "עלות-פעולה לא מנוהלת ➔ Costs at Operation Level לא הופעל (LOG_EAM_OLC).",
          ],
          bestPracticeHe: [
            "הגדר ~5 Value Categories ברורות; הרץ OIVC אחרי כל שינוי.",
            "Valuation Variant: מחיר-חומר 7, פעילות 1, חיצוני 1 (מתוכנן)/9 (בפועל).",
            "השתמש באותם תעריפי-תקורה למתוכנן ולבפועל.",
            "הגדר תמחיר נפרד ל-PM (Costing Type ייעודי, למשל 05).",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין עלות-משוערת לעלות-מתוכננת?", aHe: "משוערת מוזנת ידנית מניסיון-המתכנן ואינה מחושבת; מתוכננת מחושבת אוטומטית מתכנון-המשאבים ומתעריפי-העלות." },
            { qHe: "מה ההבדל בין מבט Cost Elements למבט Value Categories?", aHe: "Cost Elements הוא מבט-בקרה (מתוכנן מול בפועל לכל יסוד-עלות); Value Categories מקבץ יסודות לקטגוריות-אחזקה ומשווה משוער/מתוכנן/בפועל — ברור יותר ל-PM." },
            { qHe: "מה לבדוק כשאין עלויות בפקודה?", aHe: "KP26 (תעריף למרכז-עלות×Activity Type), Control Key עם Costing, Work בפעולות, נוסחת-ARBEI (SAP008), ומחירי-חומר/חיצוני." },
          ],
          takeawaysHe: [
            "תמחיר אוטומטי (מתוכנן/בפועל) + עלות-משוערת ידנית.",
            "Value Categories = מבט-אחזקה (משוער/מתוכנן/בפועל).",
            "Costing Sheet + Valuation Variant → Costing Variant → הקצאה.",
            "חוסר-עלות = KP26/Control Key/נוסחה/מחיר-חומר.",
          ],
          relatedHe: [
            { labelHe: "PM · התחשבנות (5.2.9)", href: "/library/pm/chapter-05/#sub-5.2.9" },
            { labelHe: "PP · מרכז עבודה (3.3)", href: "/library/pp/chapter-03/#sub-3.3" },
          ],
        },
        {
          id: "5.2.9", titleHe: "התחשבנות הפקודה", titleEn: "Order Settlement",
          execHe:
            "ההתחשבנות (Settlement) מעבירה את העלויות שהצטברו על הפקודה אל הגורם-המחייב הסופי — מרכז-עלות, הזמנה, אלמנט-WBS או רשת. היא נשענת על Allocation Structure (המרת cost elements לחיוב), Settlement Profile (מקבלים-מותרים ופרמטרים) המשויך ל-order type, וכלל-התחשבנות (Settlement Rule) הנוצר בשחרור או בהשלמה.",
          beginnerHe:
            "הפקודה צוברת עלויות, אך בסוף מישהו צריך 'לשלם' — בדרך-כלל מרכז-העלות של הציוד. ההתחשבנות מעבירה את העלויות אל הגורם הזה. כלל-ההתחשבנות אומר 'לאן ובאיזה אחוז', והוא נוצר אוטומטית בשחרור.",
          consultantHe:
            "Allocation Structure: Assignments (עבודה/חיצוני/חומר/תקורה) → Source (cost elements) → Settlement Cost Elements (קטגוריה 21 או cost-element-based). שלמות + ייחודיות חובה. Settlement Profile: Actual Costs (full settlement), Valid Receivers (CTR/ORD/WBS/Network), Default Object Type (לרוב CTR מהציוד/מיקום), %-Settlement, Amount Settlement, Max.No.Dist.Rls. Settlement Rule time: 1 חובה-בשחרור, 2 בשחרור-אם-מצליח, ריק חובה-בהשלמה. KO88/KO8G מבצעים.",
          purposeHe:
            "לסגור את מעגל-העלות: להוציא את העלויות מהפקודה (אובייקט-זמני) אל אובייקט-קבוע (מרכז-עלות/השקעה), כך שהדוחות-הכספיים והבקרה משקפים את עלות-התחזוקה האמיתית.",
          processExampleHe:
            "פקודה צברה 4,650 ש\"ח. בשחרור נוצר כלל-התחשבנות אוטומטי אל מרכז-העלות של הציוד (Default Object Type = CTR). בסוף-החודש KO88 מתחשבן: הפקודה מזוכה, מרכז-העלות מחויב לפי Allocation Structure.",
          cbcHe:
            "ב-CBC פקודות-קו מתחשבנות אל מרכז-העלות של קו-המילוי; פקודות-שיפוץ-הון מתחשבנות אל אלמנט-WBS/AuC. Amount Settlement משמש כשעובדים מול קבלן במחיר-קבוע.",
          navHe: [
            "SPRO ► Maintenance and Service Processing ► Basic Settings ► General Order Settlement ► Maintain Allocation Structures / Maintain Settlement Profiles",
            "Functions and Settings for Order Types ► Settlement Rule: Define Time and Creation of Distribution Rule",
            "SAP Easy Access ► Settlement ► Individual/Collective (KO88/KO8G)",
          ],
          tables: ["AUFK", "COBRB", "TKB1A", "T350"],
          tcodes: ["KO88", "KO8G", "OKO6", "OKO7"],
          fiori: ["F3411", "F2782"],
          configHe: [
            "Maintain Allocation Structures: Assignments (עבודה-פנימית/חיצוני/חומר/תקורה/אחר) → Source (cost elements) → Settlement Cost Elements (קטגוריה 21 או cost-element-based). שלמות + ייחודיות.",
            "Maintain Settlement Profiles: full settlement; Valid Receivers (CTR/ORD/WBS/Network); Default Object Type (CTR); %-Settlement + Amount Settlement; Max.No.Dist.Rls.",
            "Settlement Rule time: 1 (חובה-בשחרור), 2 (בשחרור-אם-מצליח), <ריק> (חובה-בהשלמה); וטיפול בהיררכיית-תת-פקודות (1–4).",
            "ביצוע: KO88 (בודד) / KO8G (קבוצתי), לרוב כתהליך סוף-חודש.",
          ],
          flow: [
            { he: "Allocation Structure", note: "המרת cost elements" },
            { he: "Settlement Profile", note: "מקבלים + Default Object" },
            { he: "שייך ל-order type", note: "" },
            { he: "כלל-התחשבנות בשחרור", code: "Settlement Rule" },
            { he: "התחשבנות סוף-חודש", code: "KO88/KO8G" },
          ],
          masterDataHe: [
            "מרכז-העלות של הציוד/המיקום מועתק אוטומטית לכלל-ההתחשבנות (Default Object Type = CTR).",
            "COBRB מאחסן את כללי-ההתחשבנות (Distribution Rules).",
          ],
          mistakesHe: [
            "Allocation Structure לא-שלמה — cost element ללא יעד, ההתחשבנות נכשלת.",
            "cost element כפול ב-Source — הפרת-ייחודיות.",
            "יצירת כלל-התחשבנות רק בהשלמה — אי-אפשר להתחשבן לפני TECO.",
            "אי-הפעלת Amount Settlement — אי-אפשר התחשבנות במחיר-קבוע.",
          ],
          troubleshootHe: [
            "ההתחשבנות נכשלת ➔ Allocation Structure לא-שלמה (cost element חסר) או לא-ייחודית.",
            "אין כלל-התחשבנות אוטומטי ➔ Default Object Type/Valid Receivers לא הוגדרו, או מרכז-העלות חסר בציוד.",
            "לא ניתן להתחשבן לפני TECO ➔ Settlement Rule נוצר בהשלמה; שנה ל-בשחרור (1).",
            "תת-פקודות לא מתחשבנות נכון ➔ הגדרת Distrib. rule sub-order (1–4).",
          ],
          bestPracticeHe: [
            "התחשבן את הפקודות במלואן (full settlement).",
            "אפשר לפחות מרכז-עלות והזמנה כ-Valid Receivers; Default Object Type = CTR.",
            "צור כלל-התחשבנות בשחרור (1) — לא בהשלמה.",
            "הפעל %-Settlement ו-Amount Settlement (פופולרי ב-PM, תואם עקרון מזמין/קבלן).",
          ],
          interviewHe: [
            { qHe: "אילו שלושה רכיבים בונים את ההתחשבנות?", aHe: "Allocation Structure (המרת cost elements לחיוב), Settlement Profile (מקבלים-מותרים ופרמטרים), וכלל-התחשבנות (Settlement Rule) המשויך ל-order type." },
            { qHe: "מהן דרישות-החובה של Allocation Structure?", aHe: "שלמות (כל cost element שמחויב מיוצג) וייחודיות (כל cost element פעם-אחת בלבד, יעד-יחיד)." },
            { qHe: "מתי כדאי ליצור את כלל-ההתחשבנות?", aHe: "בשחרור (1) — אחרת אי-אפשר להתחשבן לפני ההשלמה-הטכנית של הפקודה." },
          ],
          takeawaysHe: [
            "ההתחשבנות מעבירה עלויות מהפקודה אל הגורם-המחייב.",
            "Allocation Structure + Settlement Profile + Settlement Rule.",
            "Default Object Type = מרכז-עלות (מהציוד).",
            "צור כלל בשחרור; בצע ב-KO88/KO8G.",
          ],
          relatedHe: [{ labelHe: "PM · עלויות ותמחיר (5.2.8)", href: "/library/pm/chapter-05/#sub-5.2.8" }],
        },
        {
          id: "5.2.10", titleHe: "ניהול פרויקטים וניהול השקעות", titleEn: "Project Management and Investment Management",
          execHe:
            "ניתן לקשר פקודת-אחזקה לאובייקטי Project System (פרויקט, אלמנט-WBS, רשת) או לאובייקטי Investment Management (תוכנית-השקעה ומיקום-תוכנית) — אך לא לשניהם בו-זמנית. הקישור מאפשר לנהל אחזקה הונית/פרויקטלית (שיפוץ-גדול, השקעה) במסגרת תקציב וביקורת-פרויקט, ולצבור עלויות אל AuC (נכס-בהקמה).",
          beginnerHe:
            "פעמים שהאחזקה היא חלק מפרויקט-גדול (שדרוג-קו) או השקעה (ציוד חדש). אז מקשרים את הפקודה לפרויקט או לתוכנית-השקעה, כך שהעלויות נצברות שם ולא רק על הפקודה. בוחרים פרויקט או השקעה — לא את שניהם.",
          consultantHe:
            "Define Transfer of Project or Investment Program: X להעתקת מספר-פרויקט מהציוד/מיקום לפקודה, 1 להעתקת תוכנית-השקעה. ל-IM: Define Relevant Fields (Fiscal yr, Comp. code, CO area, Plnt, CCtr, FL...) + Assign IM Assignment Key to Order Types. ל-PS: Define Field Values for PM/PS Reference Element + Define Parameters for Subnetworks (OPTP — צירופי order-type×network-type) + ADPMPS לשיוך-אוטומטי ל-WBS. Investment Profiles (OITA): Manage AuC, Inv.meas. ast.class; Indicate Order Types for Investment Measures.",
          purposeHe:
            "לשלב אחזקה הונית בתקצוב ובביקורת של PS/IM: שיפוצים-גדולים ופרויקטי-הון מקבלים תקציב, מעקב-התקדמות ויכולת-הוונה (AuC) — בנפרד מאחזקה-שוטפת.",
          processExampleHe:
            "שדרוג-קו מנוהל כפרויקט-PS; פקודות-האחזקה משויכות אוטומטית (ADPMPS) לאלמנט-WBS דרך PM/PS Reference Element. כל העלויות נצברות ב-WBS, מתוקצבות ומבוקרות כפרויקט.",
          cbcHe:
            "ב-CBC החלפת-קו-מילוי שלם = השקעה: פקודות PM03 מקושרות לתוכנית-השקעה עם Investment Profile, צוברות ל-AuC, ובסיום מהוונות לנכס-קבוע. אחזקה-שוטפת נשארת על מרכז-עלות.",
          navHe: [
            "SPRO ► Functions and Settings for Order Types ► Define Transfer of Project or Investment Program",
            "Functions and Settings for Order Types ► Define Relevant Fields for Assignment of IM Program / Assign IM Assignment Key to Order Types",
            "Functions and Settings for Order Types ► Order Types and Investment Management ► Define Investment Profiles / Indicate Order Types for Investment Measures",
          ],
          tables: ["AUFK", "PRPS", "IMPR", "T350"],
          tcodes: ["OITA", "OPTP", "ADPMPS", "IW31"],
          fiori: ["F2782", "F3411"],
          configHe: [
            "Define Transfer of Project or Investment Program: X (פרויקט מהציוד/מיקום) או 1 (השקעה) — לא שניהם.",
            "IM: Define Relevant Fields for Assignment (Fiscal yr/Comp.code/CO area/Plnt/CCtr/FL...) + Assign IM Assignment Key to Order Types.",
            "PS: Define Field Values for PM/PS Reference Element + Define Parameters for Subnetworks (OPTP); שיוך-אוטומטי ל-WBS דרך ADPMPS.",
            "Investment Profiles (OITA): Manage AuC, AuC per source structure, Inv.meas. ast.class, Settlement (line item/summary); Indicate Order Types for Investment Measures.",
          ],
          flow: [
            { he: "בחר PS או IM ל-order type", note: "לא שניהם" },
            { he: "הגדר שדות/מפתח-שיוך", code: "IM/PS" },
            { he: "קשר פקודה לפרויקט/השקעה", code: "ADPMPS" },
            { he: "צבירת-עלות ל-WBS/AuC", note: "תקציב+ביקורת" },
            { he: "הוונה/התחשבנות", note: "נכס-קבוע" },
          ],
          masterDataHe: [
            "מספר-הפרויקט/תוכנית-ההשקעה באב-הציוד/המיקום מועתק לפקודה לפי ההגדרה.",
            "PM/PS Reference Element ברשימת-המשימות/פריט-האחזקה מקשר לאובייקטי-PS.",
          ],
          mistakesHe: [
            "ניסיון לקשר גם PS וגם IM לאותו order type — אסור.",
            "שכחת Investment Profile ל-order type הוני — אין AuC.",
            "צירוף order-type×network-type לא מוגדר (OPTP) — שיוך-תת-רשת נכשל.",
            "ניהול שיפוץ-הון על מרכז-עלות במקום על השקעה/פרויקט.",
          ],
          troubleshootHe: [
            "הפקודה לא מתקשרת לפרויקט ➔ Define Transfer לא הוגדר X או PM/PS Reference Element חסר.",
            "אין AuC ➔ Investment Profile לא משויך / Manage AuC לא מסומן (OITA).",
            "שיוך-תת-רשת נכשל ➔ צירוף order-type×network-type חסר ב-OPTP.",
            "שיוך-IM אוטומטי לא עובד ➔ Relevant Fields/Assignment Key לא הוגדרו.",
          ],
          bestPracticeHe: [
            "החלט מראש לכל order type: שוטף (מרכז-עלות), פרויקטלי (PS), או הוני (IM).",
            "השתמש ב-PM/PS Reference Element ל-שיוך-אוטומטי עקבי ל-WBS.",
            "הגדר Investment Profile ברור עם asset class ל-AuC.",
            "השתמש ב-summary settlement לביצועים, line-item כשנדרשת נראות-מקור.",
          ],
          interviewHe: [
            { qHe: "האם ניתן לקשר פקודה גם ל-PS וגם ל-IM?", aHe: "לא. לכל order type בוחרים אחד בלבד — Project System או Investment Management — לא שניהם בו-זמנית." },
            { qHe: "מהו תפקיד ה-PM/PS Reference Element?", aHe: "הוא מקשר רשימת-משימות/פריט-אחזקה לאובייקטי-PS (WBS/Network) ומאפשר שיוך-אוטומטי של פקודות דרך ADPMPS." },
            { qHe: "מתי נשתמש ב-Investment Management באחזקה?", aHe: "כשהאחזקה היא השקעה-הונית (החלפת-ציוד/שדרוג); הפקודה צוברת ל-AuC דרך Investment Profile ומהוונת לנכס-קבוע." },
          ],
          takeawaysHe: [
            "פקודה ניתנת-לקישור ל-PS או ל-IM — לא לשניהם.",
            "PS: WBS/Network דרך PM/PS Reference Element + ADPMPS.",
            "IM: Investment Profile + AuC + asset class (OITA).",
            "מבחין אחזקה הונית/פרויקטלית משוטפת.",
          ],
          relatedHe: [{ labelHe: "PM · התחשבנות (5.2.9)", href: "/library/pm/chapter-05/#sub-5.2.9" }],
        },
        {
          id: "5.2.11", titleHe: "פונקציות נוספות לפקודה", titleEn: "Other Functions",
          execHe:
            "תת-סעיף זה מרכז פונקציות-קונפיגורציה משלימות לפקודה: מצבי-הפעלה (Operating Conditions והשפעה על קיבולת-ייצור), מפתחות-בקרת-PRT, בקרת-הודעות-מערכת (Message Control), תאריך-ייחוס להשלמה-טכנית, ופרופילי-ערכי-ברירת-מחדל (General Order Data + Task List Data) המקשרים את הכול ל-order type/מפעל.",
          beginnerHe:
            "אלו 'ההגדרות שנותרו' — חשובות אך לא שייכות לנושא אחר: מה מצב-הציוד בזמן-העבודה, איך מתנהגים כלי-עזר (PRT), אילו הודעות-מערכת מופיעות, ואילו ערכי-ברירת-מחדל ממלאים את הפקודה אוטומטית.",
          consultantHe:
            "Operating Conditions: Reservation by PM גורם לפקודת-אחזקה ליצור עומס-קיבולת על מרכז-העבודה של הייצור (אינטגרציה PM↔PP). PRT Control Keys (לא לבלבל עם Control Keys רגילים) — רק Print רלוונטי ב-PM. Message Control: W/E/S/P/I לכל הודעה (למשל 189 תת-פקודות פתוחות, 707 הזמנת-רכש פתוחה). Reference Time for Technical Completion (current/entry/basic-start/basic-finish). Default Value Profiles (General Order Data: Field key, Calculation Key, Graphics profile) + Default Values for Task List Data and Profile Assignments (ExternProfile/Mat.Profile/MaintProfile/Act-op UoM).",
          purposeHe:
            "להשלים את ה-'דבק' של הפקודה: אינטגרציה עם ייצור, התנהגות-כלים, בקרת-הודעות, וברירות-מחדל שמייעלות הזנה ומבטיחות אחידות לכל order type/מפעל.",
          processExampleHe:
            "פקודת-אחזקה על מכונת-ייצור עם Reservation by PM יוצרת עומס-קיבולת על מרכז-הייצור — התכנון יודע שהמכונה תושבת. Default Value Profile ממלא אוטומטית Field key, Calculation Key ו-Graphics profile בכל פקודה-חדשה מאותו order type.",
          cbcHe:
            "ב-CBC פקודת-תחזוקה על קו-מילוי מסומנת Reservation by PM — מתכנן-הייצור רואה את חלון-התחזוקה כעומס על הקו ולא מתכנן ייצור באותו זמן. Default Values מאיצים הזנת פקודות-מונע חוזרות.",
          navHe: [
            "SPRO ► Maintenance and Service Orders ► General Data ► Create System Conditions or Operating Conditions",
            "Maintenance and Service Orders ► Production Resource/Tool Assignments ► Define PRT Control Keys / Message Control",
            "Functions and Settings for Order Types ► Create Default Value Profiles for General Order Data / Default Values for Task List Data and Profile Assignments",
          ],
          tables: ["AUFK", "AFVC", "T435", "T390"],
          tcodes: ["IW31", "IW32", "OPL8"],
          fiori: ["F2782"],
          configHe: [
            "Create Operating Conditions: Reservation by PM ליצירת עומס-קיבולת על מרכז-העבודה של הייצור (אינטגרציה PM↔PP).",
            "Define PRT Control Keys: Schedule/Calculate/Confirm/Expand/Print — רק Print פעיל ב-PM; אינם Control Keys רגילים.",
            "Message Control: <ריק>/W/E/S/P/I לכל הודעה (189, 242, 707...).",
            "Define Proposed Reference Time for Technical Completion (current/entry/basic-start/basic-finish); Default Value Profiles (Field key, Calculation Key, Graphics) + Default Values for Task List Data (ExternProfile/Mat.Profile/MaintProfile/Act-op UoM).",
          ],
          flow: [
            { he: "מצב-הפעלה + עומס-ייצור", code: "Reservation by PM" },
            { he: "מפתחות-PRT", note: "Print בלבד" },
            { he: "בקרת-הודעות", code: "Message Control" },
            { he: "תאריך-ייחוס להשלמה", note: "PMIS" },
            { he: "ערכי-ברירת-מחדל", code: "Default Profiles" },
          ],
          masterDataHe: [
            "מרכז-עבודה-של-ייצור באובייקט-הייחוס מקבל עומס-קיבולת כש-Reservation by PM פעיל.",
            "Default Value Profiles משויכים לכל order type/מפעל דרך Default Values for Task List Data.",
          ],
          mistakesHe: [
            "בלבול PRT Control Keys עם Control Keys רגילים.",
            "הגדרת הודעת-מערכת כ-E במקום W — חסימת-תהליך מיותרת.",
            "אי-הגדרת Default Profiles — הזנה ידנית חוזרת ומועדת-לטעות.",
            "אי-סימון Reservation by PM כשרוצים השפעה על קיבולת-הייצור.",
          ],
          troubleshootHe: [
            "פקודת-אחזקה לא משפיעה על קיבולת-הייצור ➔ Reservation by PM לא מסומן.",
            "PRT לא מודפס ➔ PRT Control Key ללא Print.",
            "הודעת-מערכת חוסמת לשווא ➔ שנה מ-E ל-W ב-Message Control.",
            "שדות לא מתמלאים אוטומטית ➔ Default Value Profile לא שויך ל-order type/מפעל.",
          ],
          bestPracticeHe: [
            "השתמש ב-Reservation by PM כשתחזוקה משביתה ציוד-ייצור.",
            "כוונן Message Control: חסום (E) רק היכן שקריטי, אחרת הזהר (W).",
            "הגדר Default Value Profiles לכל order type/מפעל לייעול-הזנה.",
            "זכור: ב-PRT Control Keys רק Print רלוונטי.",
          ],
          interviewHe: [
            { qHe: "מה עושה Reservation by PM?", aHe: "גורם לפקודת-אחזקה ליצור עומס-קיבולת על מרכז-העבודה של הייצור, כך שתכנון-הייצור יודע שהציוד יושבת — אינטגרציה PM↔PP." },
            { qHe: "במה שונים PRT Control Keys מ-Control Keys?", aHe: "הם בקרה נפרדת לכלי-עזר (PRT); ב-PM רק האינדיקטור Print פעיל. אין להם קשר ל-Control Keys של פעולות/מרכז-עבודה." },
            { qHe: "מה קובע Reference Time for Technical Completion?", aHe: "איזה תאריך מוצע כתאריך-ההשלמה-הטכנית (נוכחי/הזנה/בסיס-התחלה/בסיס-סיום) — חשוב למיון כרונולוגי ב-PMIS." },
          ],
          takeawaysHe: [
            "Reservation by PM = אינטגרציית עומס PM↔PP.",
            "PRT Control Keys: רק Print רלוונטי.",
            "Message Control מכוון W/E לכל הודעת-מערכת.",
            "Default Value Profiles מייעלים ומאחדים הזנה.",
          ],
          relatedHe: [{ labelHe: "PM · סוגי פקודה (5.2.1)", href: "/library/pm/chapter-05/#sub-5.2.1" }],
        },
      ],
    },
    // ============================================================ 5.3
    {
      id: "5.3", titleHe: "אישורי ביצוע", titleEn: "Completion Confirmations",
      execHe:
        "אישור-הביצוע (Completion Confirmation) סוגר את מחזור-הפקודה: הטכנאי מדווח את הזמן שהושקע, את הכמות שבוצעה ואת הנתונים-הטכניים. האישור מצמיד עלויות-בפועל לפקודה, מעדכן סטטוסים, מאפס שמורות (Final Confirmation) ומזין את ההיסטוריה. הקונפיגורציה זמינה דרך טרנזקציות-האחזקה (IW41 ואילך) ודרך גליון-הזמן החוצה-יישומי (CATS).",
      beginnerHe:
        "אחרי שהטכנאי סיים, הוא 'מדווח' — כמה שעות עבד ומה עשה. הדיווח הזה הופך את העבודה ל'בפועל': העלויות נכנסות, השמורות נסגרות, והפקודה מתקדמת לכיוון סגירה. אפשר לדווח בטרנזקציית-אחזקה (IW41) או בגליון-זמן (CATS).",
      consultantHe:
        "האישור נשמר ב-AFRU (אישורי-ביצוע) ומעדכן את AFVV/AFKO. סוגי-אישור: IW41 (Individual Time), IW42 (Overall — זמן+תנועות+ממצאים), IW44/IW45 (Collective), CATS. Final Confirmation סוגר את הפעולה; Clear Open Reservs. מאפס שמורות-לא-נמשכות. שני מסלולי-קונפיגורציה: Asset Management (Control Parameters, Variance Reasons, Screen Templates) ו-CATS (Data Entry Profiles, Field Selection).",
      purposeHe:
        "להצמיד מציאות לתכנון: זמן-בפועל, עלות-בפועל, נתונים-טכניים (מדידות, ממצאים), וסגירת-משאבים — כך שהפקודה משקפת מה באמת קרה, ולא רק מה תוכנן.",
      processExampleHe:
        "טכנאי סיים תיקון-משאבה. ב-IW41 הוא מדווח 3.5 שע', מסמן Final Confirmation, ומזין קריאת-מונה. AFRU נרשם, עלות-העבודה (3.5 × תעריף) נצברת לפקודה, השמורות-שלא-נמשכו מתאפסות, והפעולה מקבלת סטטוס CNF.",
      cbcHe:
        "ב-CBC טכנאי-משמרת מדווחים זמן-תיקון ב-IW41 ישירות מהרצפה; קבוצות-תחזוקה-מתוכננת מדווחות שבועית ב-CATS. הדיווח מזין עלות-תחזוקה-בפועל לכל קו ומאפס שמורות-חלקים שלא נצרכו.",
      navHe: [
        "SAP Easy Access ► Plant Maintenance ► Maintenance Processing ► Completion Confirmation ► Entry (IW41/IW42/IW44)",
        "SPRO ► Maintenance and Service Processing ► Completion Confirmations",
        "SPRO ► Cross-Application Components ► Time Sheet (CATS)",
      ],
      tables: ["AFRU", "AFVV", "AFKO", "CATSDB"],
      tcodes: ["IW41", "IW42", "IW44", "IW45", "CAT2"],
      fiori: ["F2190", "F4074", "F0742"],
      configHe: [
        "שני מסלולים: טרנזקציות-אחזקה (IW41 ואילך) ו-CATS (גליון-זמן חוצה-יישומי).",
        "האישור מצמיד עלות-בפועל, מעדכן סטטוסים (CNF/PCNF), מאפס שמורות (Clear Open Reservs.) ומזין PMIS.",
        "Final Confirmation סוגר את הפעולה; Partial Confirmation משאיר אותה פתוחה להמשך.",
        "תתי-הסעיפים 5.3.1 (Asset Management) ו-5.3.2 (CATS) מפרטים את הקונפיגורציה.",
      ],
      flow: [
        { he: "ביצוע ברצפה", note: "" },
        { he: "דיווח זמן + טכני", code: "IW41/CATS" },
        { he: "עלות-בפועל לפקודה", code: "AFRU" },
        { he: "Final Confirmation", note: "סגירת-פעולה + שמורות" },
        { he: "השלמה-טכנית", code: "TECO" },
      ],
      masterDataHe: [
        "תעריף-הפעילות (KP26) קובע את עלות-הזמן-המדווח.",
        "AFRU מאחסן כל אישור; AFKO/AFVV מתעדכנים בכמויות ובסטטוס.",
        "נתונים-טכניים (קריאות-מונה, ממצאים) נכנסים להיסטוריית-הציוד.",
      ],
      mistakesHe: [
        "אי-סימון Final Confirmation בסיום — הפעולה נשארת פתוחה ושמורות לא נסגרות.",
        "דיווח-יתר/חֶסֶר זמן ללא בקרת-סטייה (Work Deviation).",
        "אי-הגדרת Control Parameters לכל order type/מפעל — לא ניתן לדווח.",
        "ערבוב מסלולי IW41 ו-CATS ללא תיאום.",
      ],
      troubleshootHe: [
        "לא ניתן לדווח על order type ➔ Control Parameters לא הוגדרו למפעל/לסוג (5.3.1).",
        "שמורות לא נסגרות ➔ Clear Open Reservs. לא מסומן או אין Final Confirmation.",
        "עלות-בפועל לא נצברת ➔ KP26/Control Key/נוסחת-ARBEI חסרים (ראה 5.2.8).",
        "סטיות לא מזוהות ➔ WrkDev./DurtnDev. לא הופעלו.",
      ],
      bestPracticeHe: [
        "הגדר Control Parameters לכל order type/מפעל פעיל.",
        "השתמש ב-IW41 לדיווח-מיידי ברצפה, CATS לדיווח-זמן מרוכז.",
        "הפעל Propose Dates/Activities לזירוז-הדיווח.",
        "הפעל בקרת-סטייה (Work/Duration Deviation) לבקרת-איכות.",
      ],
      interviewHe: [
        { qHe: "מה מבצע אישור-הביצוע?", aHe: "מצמיד עלות-בפועל וזמן-בפועל לפקודה, מעדכן סטטוסים, מאפס שמורות (Final Confirmation) ומזין נתונים-טכניים להיסטוריה." },
        { qHe: "מה ההבדל בין Final ל-Partial Confirmation?", aHe: "Final סוגר את הפעולה ומאפשר איפוס-שמורות; Partial מדווח חלקית ומשאיר את הפעולה פתוחה להמשך-דיווח." },
        { qHe: "מהם שני מסלולי-הדיווח?", aHe: "טרנזקציות-אחזקה (IW41/IW42 — זמן+טכני) ו-CATS (גליון-זמן חוצה-יישומי, נפוץ לדיווח-זמן מרוכז)." },
      ],
      takeawaysHe: [
        "אישור-ביצוע סוגר את מחזור-הפקודה ומצמיד בפועל לתכנון.",
        "נשמר ב-AFRU; מעדכן סטטוס, עלות ושמורות.",
        "שני מסלולים: IW41 ואילך, ו-CATS.",
        "Final Confirmation סוגר פעולה ומאפס שמורות.",
      ],
      relatedHe: [
        { labelHe: "PM · עלויות ותמחיר (5.2.8)", href: "/library/pm/chapter-05/#sub-5.2.8" },
        { labelHe: "אובייקט · AFRU", href: "/library/pm/object/AFRU/" },
      ],
      children: [
        {
          id: "5.3.1", titleHe: "אישורי ביצוע ב-SAP S/4HANA Asset Management", titleEn: "SAP S/4HANA Asset Management Completion Confirmations",
          execHe:
            "מסלול-האחזקה לאישורי-ביצוע נשען על Control Parameters (OIOR) לכל order type/מפעל — תנאי-יסוד לכל דיווח, גם דרך CATS. הם קובעים את הצעת Final Confirmation, איפוס-שמורות, הצעת-תאריכים ועבודה, בקרת-סטיות וטיפול-בשגיאות. בנוסף: Causes for Variances ו-Screen Templates ל-IW42.",
          beginnerHe:
            "כדי בכלל לאפשר דיווח, צריך להגדיר 'פרמטרי-בקרה' לכל סוג-פקודה ומפעל. הם קובעים מה המערכת מציעה אוטומטית (תאריכים, עבודה, סגירה) ומתי להזהיר על סטייה. בלעדיהם — אי-אפשר לדווח.",
          consultantHe:
            "Define Control Parameters (OIOR): Final Confirmation, Clear Open Reservs., Propose Dates, Propose Activities, Calc. performance, WrkDev./DurtnDev. (אחוז-סטייה), Dates in Future, Logs/Error Handling (Termination for Incorrect ActCosts/Goods Movt), All Components (תצוגת-backflushing). Define Causes for Variances (לכל מפעל). Set Screen Templates for Completion Confirmation — פרופילי-מסך ל-IW42 (Times/Services/Goods movements/Notification items/Causes/Meas. readings/Tasks/Activities).",
          purposeHe:
            "לקבוע, לכל צירוף order type×מפעל, כיצד מתנהג הדיווח: מה מוצע, מתי מזהירים, ומה קורה בשגיאה — כדי שהדיווח יהיה מהיר, אחיד ומבוקר.",
          processExampleHe:
            "OIOR ל-PM01: Propose Dates + Propose Activities מסומנים — ב-IW41 מוצעים תאריכי-הפעולה והעבודה כברירת-מחדל; WrkDev. 20% — סטייה גדולה מ-20% מציגה אזהרה. בשגיאת-עלות, Termination for Incorrect ActCosts מונע פוסט.",
          cbcHe:
            "ב-CBC OIOR מוגדר לכל order type×מפעל-מילוי; Propose Dates/Activities מזרזים דיווח-משמרת; בקרת-סטייה תופסת דיווחי-זמן חריגים. Screen Template ל-IW42 כולל Times + Meas. readings לקריאות-מונה.",
          navHe: [
            "SPRO ► Maintenance and Service Processing ► Completion Confirmations ► Define Control Parameters for Completion Confirmations",
            "Completion Confirmations ► Define Causes for Variances",
            "Completion Confirmations ► Set Screen Templates for Completion Confirmation",
          ],
          tables: ["AFRU", "TRUG", "T352B", "AFVV"],
          tcodes: ["OIOR", "IW41", "IW42", "IW44"],
          fiori: ["F2190", "F4074"],
          configHe: [
            "Define Control Parameters (OIOR, לכל order type/מפעל): Final Confirmation, Clear Open Reservs., Propose Dates, Propose Activities, Calc. performance, WrkDev. (%), DurtnDev. (%), Dates in Future, Logs/Error Handling, All Components.",
            "המלצה: סמן Propose Dates ו-Propose Activities (ואולי All Components); השאר היתר ריק.",
            "Define Causes for Variances (לכל מפעל): סיבות-סטייה בין בפועל למתוכנן לניתוח.",
            "Set Screen Templates for Completion Confirmation (IW42): פרופילי-מסך עם אזורי Times/Services/Goods movements/Notification items/Causes/Meas. readings/Tasks/Activities.",
          ],
          flow: [
            { he: "הגדר Control Parameters", code: "OIOR" },
            { he: "Propose Dates/Activities", note: "זירוז-דיווח" },
            { he: "בקרת-סטייה Work/Duration", note: "אזהרה" },
            { he: "סיבות-סטייה", code: "Causes for Variances" },
            { he: "פרופיל-מסך ל-IW42", code: "Screen Templates" },
          ],
          masterDataHe: [
            "Backflushing indicator ברכיב + All Components קובעים מה מוצג בסקירת-המשיכה.",
            "AFRU נושא את הדיווח; סיבות-הסטייה נשמרות לניתוח.",
          ],
          mistakesHe: [
            "אי-הגדרת Control Parameters למפעל/לסוג — לא ניתן לדווח כלל.",
            "סימון-יתר של אינדיקטורים — התנהגות בלתי-צפויה בדיווח.",
            "אי-הפעלת בקרת-סטייה — דיווחים חריגים עוברים בשקט.",
            "Screen Template עמוס מדי ל-IW42 — מסך לא-ברור.",
          ],
          troubleshootHe: [
            "לא ניתן לדווח על order type ➔ אין Control Parameters למפעל/לסוג (OIOR).",
            "תאריכים/עבודה לא מוצעים ➔ Propose Dates/Activities לא מסומנים.",
            "סטיות לא מזוהות ➔ WrkDev./DurtnDev. לא הופעלו או אחוז-סף גבוה מדי.",
            "דיווח עם שגיאת-עלות נשמר בכל-זאת ➔ Termination for Incorrect ActCosts לא מסומן.",
          ],
          bestPracticeHe: [
            "הגדר Control Parameters לכל order type×מפעל פעיל.",
            "סמן Propose Dates/Activities (וכן All Components); השאר היתר ריק.",
            "הפעל בקרת-סטייה לתפיסת דיווחים חריגים.",
            "ספק פרופילי-מסך ל-IW42 לפי סביבת-העבודה ('כמה שצריך, מעט ככל האפשר').",
          ],
          interviewHe: [
            { qHe: "מדוע Control Parameters הם תנאי-יסוד?", aHe: "ללא הגדרתם ל-order type/מפעל לא ניתן לדווח אישורי-ביצוע כלל — גם לא דרך CATS; הם הבסיס לכל מסלולי-הדיווח." },
            { qHe: "מה עושה Clear Open Reservs.?", aHe: "באישור-סופי (Final Confirmation) מוחק שמורות שלא נמשכו, כך שלא נשארות דרישות-מלאי פתוחות מיותרות." },
            { qHe: "אילו אינדיקטורים מומלץ לסמן?", aHe: "Propose Dates ו-Propose Activities (ואולי All Components) לזירוז ולנוחות; השאר את היתר ריק." },
          ],
          takeawaysHe: [
            "Control Parameters (OIOR) = תנאי-יסוד לכל דיווח.",
            "Propose Dates/Activities מזרזים את הדיווח.",
            "בקרת-סטייה (Work/Duration) תופסת חריגים.",
            "Screen Templates מעצבים את IW42.",
          ],
          relatedHe: [{ labelHe: "PM · CATS (5.3.2)", href: "/library/pm/chapter-05/#sub-5.3.2" }],
        },
        {
          id: "5.3.2", titleHe: "דיווחי גליון-זמן חוצה-יישומי (CATS)", titleEn: "Cross-Application Time Sheet Confirmations",
          execHe:
            "CATS (Cross-Application Time Sheet) הוא יישום-מרכזי להזנת זמני-עבודה בפועל, משותף ל-PM, HR ו-PP. תנאי-היסוד הוא Data Entry Profile הקובע שחרור/אישור, מספר-תקופות, ערכי-ברירת-מחדל ורשימות-עבודה. בנוסף נדרשת Field Selection ייעודית המסתירה את כל השדות שאינם רלוונטיים לאחזקה.",
          beginnerHe:
            "CATS הוא 'דוח-שעות' מרכזי: הטכנאי מזין כמה שעות עבד על כל פקודה, בדרך-כלל שבועית. פרופיל-ההזנה קובע איך נראה המסך ומה ברירות-המחדל. מסתירים שדות-מיותרים כדי שהמסך יישאר נקי.",
          consultantHe:
            "Set Up Data Entry Profiles: Profile changeable, With totals line, Release on saving, Period type (2=שבוע/4=חודש), Periods, Enter for several personnel nos, Approval, Cost accounting variant (לרוב master cost center), Default values (Controlling area, Activity type, Att./absence type), Worklist (מומלץ לא). Field Selection (CAC2, Data entry section, influencing value=Profile): השאר רק ARBPL/RAUFNR/AUERU/LSTAR/SUMDAYS/ERUZU/VORNR/WERKS — הסתר השאר. הזמנים זורמים ל-AFRU דרך CAT5/transfer.",
          purposeHe:
            "לאפשר דיווח-זמן מרוכז ויעיל לכוח-אדם המשרת מספר פקודות, עם מסך-הזנה נקי ומותאם-אחזקה, ולהזרים את הזמנים אל פקודות-ה-PM כעלות-בפועל.",
          processExampleHe:
            "טכנאי פותח CATS (CAT2) בסוף-שבוע, מזין שעות מול פקודות-שונות (Receiver Order + Activity), שומר — והזמנים משוחררים (Release on saving). בהעברה (CAT5) הם נרשמים ב-AFRU כעלות-בפועל בכל פקודה.",
          cbcHe:
            "ב-CBC קבוצות-תחזוקה-מתוכננת מדווחות שבועית ב-CATS מול פקודות-מונע מרובות; Field Selection מצומצם (ARBPL/RAUFNR/LSTAR/VORNR) שומר על מסך נקי. ללא Worklist וללא Approval לזרימה מהירה.",
          navHe: [
            "SPRO ► Cross-Application Components ► Time Sheet ► Specific Settings for CATS Classic ► Set Up Data Entry Profiles",
            "Cross-Application Components ► Time Sheet ► Settings for All User Interfaces ► Time Recording ► Choose Fields (CAC2)",
            "SAP Easy Access ► Time Sheet ► CATS Classic ► Record Working Times (CAT2)",
          ],
          tables: ["CATSDB", "CATSCO", "AFRU", "TCATS"],
          tcodes: ["CAC1", "CAC2", "CAT2", "CAT5"],
          fiori: ["F0742", "F1823"],
          configHe: [
            "Set Up Data Entry Profiles (CAC1): Profile changeable, With totals line, Release on saving, Period type (2=שבוע), Periods, Enter for several personnel nos, Approval, Cost accounting variant (master cost center), Default values (Controlling area/Activity type/Att.-absence type), Worklist.",
            "Field Selection (CAC2, Data entry section, influencing value = Data Entry Profile): השאר Work Center (ARBPL), Receiver Order (RAUFNR), Final Confirmation (AUERU), Activity Type (LSTAR), Total (SUMDAYS), Partial confirmation (ERUZU), Activity (VORNR), Plant (WERKS) — הסתר השאר.",
            "העברת-הזמנים לפקודות דרך CAT5; נתונים נשמרים ב-CATSDB ומזרימים ל-AFRU.",
          ],
          flow: [
            { he: "הגדר Data Entry Profile", code: "CAC1" },
            { he: "Field Selection מצומצם", code: "CAC2" },
            { he: "הזנת-שעות שבועית", code: "CAT2" },
            { he: "שחרור בשמירה", note: "Release on saving" },
            { he: "העברה לפקודות", code: "CAT5", note: "AFRU" },
          ],
          masterDataHe: [
            "Activity Type ו-Controlling area כברירות-מחדל בפרופיל מאיצים הזנה.",
            "Receiver Order (RAUFNR) + Activity (VORNR) מקשרים את הזמן לפקודה/פעולה.",
            "CATSDB מאחסן את ההזנות לפני העברה ל-AFRU.",
          ],
          mistakesHe: [
            "אי-הגדרת Data Entry Profile — לא ניתן להשתמש ב-CATS.",
            "Field Selection עמוס — מסך מבלבל עם שדות לא-רלוונטיים.",
            "שימוש ב-Worklist — מקשה על הזנת-זמנים (מומלץ לא).",
            "שכחת העברה (CAT5) — הזמנים לא מגיעים לפקודות.",
          ],
          troubleshootHe: [
            "לא ניתן להזין ב-CATS ➔ Data Entry Profile לא הוגדר.",
            "מסך עמוס בשדות-מיותרים ➔ Field Selection לא צומצם (CAC2).",
            "זמנים לא מגיעים לפקודה ➔ לא בוצעה העברה (CAT5) או Receiver Order/Activity חסרים.",
            "עלות לא נצברת ➔ Activity Type/תעריף (KP26) חסרים.",
          ],
          bestPracticeHe: [
            "אפשר Profile changeable, With totals line ו-Release on saving.",
            "הזן שבועית (Period type 2); אל תזין למספר אנשים בו-זמנית.",
            "ללא Approval וללא Worklist לזרימה מהירה.",
            "צמצם Field Selection לשדות-האחזקה ההכרחיים בלבד.",
          ],
          interviewHe: [
            { qHe: "מהו CATS ולמה הוא חוצה-יישומי?", aHe: "Cross-Application Time Sheet — יישום-מרכזי להזנת זמני-עבודה בפועל, המשותף ל-PM, HR ו-PP, כך שאותו דיווח-זמן משרת מספר מודולים." },
            { qHe: "מהו תנאי-היסוד לשימוש ב-CATS?", aHe: "Data Entry Profile (CAC1) — הוא מגדיר שחרור/אישור, תקופות, ערכי-ברירת-מחדל ורשימות-עבודה; בלעדיו אי-אפשר להזין." },
            { qHe: "אילו שדות נשארים ב-Field Selection ל-PM?", aHe: "Work Center, Receiver Order, Final Confirmation, Activity Type, Total, Partial confirmation, Activity, Plant — כל היתר מוסתר." },
          ],
          takeawaysHe: [
            "CATS = גליון-זמן מרכזי חוצה-יישומי (PM/HR/PP).",
            "Data Entry Profile (CAC1) הוא תנאי-יסוד.",
            "צמצם Field Selection לשדות-אחזקה בלבד.",
            "הזנה שבועית, שחרור-בשמירה, ללא Worklist; העברה ב-CAT5.",
          ],
          relatedHe: [{ labelHe: "PM · אישורי ביצוע ב-AM (5.3.1)", href: "/library/pm/chapter-05/#sub-5.3.1" }],
        },
      ],
    },
  ],
};
