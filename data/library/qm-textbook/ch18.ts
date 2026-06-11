import type { TextbookChapter } from "./types";

export const CH18: TextbookChapter = {
  n: 18,
  titleHe: "דיווח ב-SAP S/4HANA",
  titleEn: "Reporting in SAP S/4HANA",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לדיווח ולניתוח-נתונים במודול QM של SAP S/4HANA. הוא מכסה שלוש שכבות-דיווח: דיווח-תפעולי קלאסי (בחירת לוטי-בדיקה, וריאנטים, רשימות-עבודה, הורדה ל-Excel, ניתוח-ABC), ניתוחים-סטנדרטיים של LIS (Logistics Information System) על מבני-המידע S00x, ושכבת ה-SAP Fiori המודרנית (אפליקציות-אנליטיקה מבוססות-CDS ו-Embedded Analytics). כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך, דוגמת CBC (מפעל-מילוי קוקה-קולה), ניווט ו-SPRO/Launchpad, טבלאות/T-Codes/Fiori, פרטי-קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: לשלוט בדיווח QM מקצה-לקצה ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 18.1
    {
      id: "18.1",
      titleHe: "יסודות הדיווח",
      titleEn: "The Basics of Reporting",
      execHe:
        "שכבת הדיווח התפעולי של QM נשענת על מסכי-בחירה גמישים המאחזרים לוטי-בדיקה, תוצאות והחלטות-שימוש לפי קריטריונים. היכולת לבחור, לסנן, לשמור-וריאנט, לרשום-עבודה, להוריד ל-Excel ולהדפיס היא הבסיס היומיומי של בודק-איכות ושל מהנדס-איכות. שליטה כאן חוסכת שעות, מבטיחה עקביות בין משתמשים ומזינה את שכבות-הניתוח שמעליה.",
      beginnerHe:
        "דמיין שאתה רוצה לראות רשימה של כל בדיקות-האיכות שנפתחו השבוע. במקום לחפש אחת-אחת, אתה ממלא 'טופס-בקשה' (מסך-בחירה) — בוחר מפעל, חומר, טווח-תאריכים — ולוחץ 'הרץ'. SAP מחזיר רשימה. אחר-כך אפשר לסנן אותה, לשמור את ההגדרות לפעם הבאה (וריאנט), להוריד ל-Excel ולהדפיס. זה כל מה שלמדנו בתת-פרק זה.",
      consultantHe:
        "ה-T-Code המרכזי הוא QA32 (Change Data for Inspection Lot) ו-QA33 (Display). הם ALV-Reports מבוססי-Logical-Database QLDB. מסך-הבחירה מאוכלס משדות QALS (כותרת לוט-בדיקה). וריאנטים נשמרים ב-VARI/VARID, פריסות-ALV ב-Layout (LTDX). הבחירה ניתנת להרחבה דרך Selection-Profiles. ב-S/4HANA רבים מהמסכים האלה עדיין רלוונטיים, אך SAP מעודדת מעבר לאפליקציות Fiori (Manage Inspection Lots, F2424) המבוססות CDS. הבן את שתי השכבות — לקוחות רבים מריצים שתיהן במקביל.",
      purposeHe:
        "לתת לכל תפקיד-איכות נקודת-כניסה אחת לאחזור-נתונים גמיש: הבודק רואה את העבודה שלו, מהנדס-האיכות רואה מגמות, והמנהל מוריד ל-Excel לדוחות-הנהלה. המטרה היא דיווח עצמאי (Self-Service) ללא תכנות.",
      processExampleHe:
        "מהנדס-איכות פותח QA32, מזין מפעל 1000, טווח-תאריכי-יצירה של השבוע, וסטטוס-לוט 'בדיקה פתוחה'. SAP מחזיר 240 לוטים ב-ALV. הוא מסנן ל-Inspection Type 01 (קבלה), שומר וריאנט 'WEEKLY_GR', מוריד ל-Excel ומעביר ל-QA לסקירת-בוקר.",
      cbcHe:
        "ב-CBC בודק-קו במפעל-המילוי מריץ QA32 כל בוקר עם וריאנט קבוע: מפעל=מפעל-מילוי, Inspection Type=03 (בדיקה תוך-תהליכית), סטטוס='ממתין להחלטה'. הרשימה מזינה את סבב-הבדיקות של אצוות-המשקה לאורך המשמרת.",
      navHe: [
        "SAP Easy Access ► Logistics ► Quality Management ► Quality Inspection ► Inspection Lot ► Worklist ► QA32 (Change Data) / QA33 (Display)",
        "Fiori Launchpad ► Quality Management ► Inspection Processing ► Manage Inspection Lots (F2424)",
      ],
      tables: ["QALS", "QAVE", "QAMR", "QAMB", "VARI"],
      tcodes: ["QA32", "QA33", "QGP1", "QGA3"],
      fiori: ["F2424"],
      configHe: [
        "Selection Profile (SPRO ► QM ► Quality Inspection ► Inspection Lot Creation ► Maintain Selection Profiles): מגדיר אילו סטטוסים נכללים בבחירת-הרשימה.",
        "ALV Layout/Variant: שמירת עמודות, מיון וסינון ברירת-מחדל לכל משתמש או גלובלי (/layout).",
        "User-Default Variant (Goto ► Variants ► Save as Variant): קביעת וריאנט-ברירת-מחדל למשתמש.",
      ],
      flow: [
        { he: "פתיחת מסך-בחירה", code: "QA32" },
        { he: "מילוי קריטריונים", note: "מפעל/חומר/תאריך/סטטוס" },
        { he: "הרצה", code: "F8" },
        { he: "רשימת-ALV", note: "לוטי-בדיקה" },
        { he: "סינון / שמירת-וריאנט", note: "Filter/Variant" },
        { he: "הורדה / הדפסה", note: "Excel / Print" },
      ],
      mistakesHe: [
        "הרצת QA32 ללא קריטריוני-תאריך — שליפת מיליוני-רשומות ותקיעת-המערכת.",
        "ערבוב Selection-Profile עם סינון-ידני — תוצאות לא-עקביות בין משתמשים.",
        "שכחת שמירת-וריאנט — חזרה על אותה הזנה ידנית כל יום.",
      ],
      troubleshootHe: [
        "הרשימה ריקה ➔ בדוק Selection-Profile/סטטוס-לוט וטווח-תאריכים; אולי הלוטים כבר סגורים.",
        "ריצה איטית מאוד ➔ קריטריונים רחבים מדי; הוסף מפעל/תאריך/Inspection-Type לצמצום.",
        "עמודות חסרות ב-ALV ➔ פריסת-Layout שגויה; טען Layout מתאים או הוסף שדות.",
      ],
      bestPracticeHe: [
        "תקנן וריאנטים ארגוניים (גלובליים) לכל תפקיד — אחידות בין משתמשים.",
        "תמיד הגבל בתאריך וב-Inspection-Type לביצועים.",
        "שקול מעבר ל-Manage Inspection Lots (F2424) לחוויית-משתמש מודרנית וביצועי-HANA.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין QA32 ל-QA33?", aHe: "QA32 = Change (אפשר לעדכן לוטים, לרשום-עבודה, לבצע החלטת-שימוש); QA33 = Display (קריאה-בלבד). שניהם משתמשים באותו מסך-בחירה." },
        { qHe: "כיצד מבטיחים שכל הבודקים רואים אותה רשימה?", aHe: "באמצעות וריאנט-בחירה גלובלי + פריסת-ALV (Layout) משותפת, ו/או Selection-Profile אחיד שמוגדר ב-SPRO." },
      ],
      takeawaysHe: [
        "QA32/QA33 הם נקודת-הכניסה לדיווח-לוטים תפעולי.",
        "וריאנטים ופריסות-ALV מבטיחים אחידות ומהירות.",
        "תמיד הגבל בתאריך/Type לביצועים; שקול Fiori F2424 ב-S/4HANA.",
      ],
      relatedHe: [
        { labelHe: "QM · ניתוחים סטנדרטיים (18.2)", href: "/library/qm/chapter-18/#sub-18.2" },
        { labelHe: "QM · אפליקציות Fiori (18.4)", href: "/library/qm/chapter-18/#sub-18.4" },
      ],
      children: [
        {
          id: "18.1.1",
          titleHe: "בחירת לוט-בדיקה",
          titleEn: "Inspection Lot Selection",
          execHe:
            "בחירת לוט-בדיקה היא הפעולה הבסיסית של אחזור לוטים לפי קריטריונים עסקיים — מפעל, חומר, ספק, תאריך, סטטוס וסוג-בדיקה. זוהי השכבה שעליה נבנה כל דיווח-QM תפעולי.",
          beginnerHe:
            "אתה אומר ל-SAP 'הראה לי את כל הבדיקות ש...'. הקריטריונים הם כמו מסננים בחנות מקוונת: מפעל מסוים, חומר מסוים, תאריך מסוים. SAP מחזיר רק את הלוטים שעונים על כולם.",
          consultantHe:
            "המסך נשען על QALS (Inspection Lot Header). שדות-מפתח: WERK (מפעל), MATNR (חומר), ART (Inspection Type), HERKUNFT (Lot Origin), ENSTEHDAT (תאריך-יצירה), ושדות-סטטוס (System/User status). Logical Database QLDB מטפל בקריאה. ניתן להוסיף שדות-בחירה דרך Dynamic Selections (Shift+F4).",
          purposeHe:
            "לאפשר לכל תפקיד לאתר במהירות את קבוצת-הלוטים הרלוונטית לו, בלי לדעת מספרי-לוט מראש.",
          processExampleHe:
            "QA לקבלת-סחורה מזין מפעל 1000, Lot Origin 01 (GR לרכש), טווח-תאריכים השבוע — ומקבל את כל לוטי-הקבלה הפתוחים לטיפול.",
          cbcHe:
            "ב-CBC בוחרים לפי Inspection Type 03 (תוך-תהליכי) + חומר=משקה-מוגמר + מפעל-מילוי, כדי לראות את כל בדיקות-האצווה הפעילות בקו.",
          navHe: [
            "Logistics ► Quality Management ► Quality Inspection ► Inspection Lot ► Worklist ► QA32",
          ],
          tables: ["QALS", "QAVE"],
          tcodes: ["QA32", "QA33"],
          fiori: ["F2424"],
          configHe: [
            "Dynamic Selections (Shift+F4): הרחבת מסך-הבחירה לשדות QALS נוספים.",
            "Selection Profile: קיבוץ סטטוסים לבחירה מהירה (פתוח/בטיפול/סגור).",
          ],
          flow: [
            { he: "הזנת קריטריונים", code: "QA32" },
            { he: "Dynamic Selections", note: "Shift+F4" },
            { he: "הרצה", code: "F8" },
            { he: "רשימת-לוטים", note: "QALS" },
          ],
          mistakesHe: [
            "בחירה לפי חומר בלבד ללא מפעל — שליפה כלל-ארגונית כבדה.",
            "התעלמות מ-Lot Origin — ערבוב לוטי-קבלה עם לוטי-ייצור.",
          ],
          troubleshootHe: [
            "לוט קיים אך לא מופיע ➔ סטטוס מחוץ ל-Selection-Profile או תאריך מחוץ-לטווח.",
            "יותר-מדי תוצאות ➔ הוסף Inspection Type / Lot Origin.",
          ],
          bestPracticeHe: [
            "תמיד שלב מפעל + תאריך + Type כמינימום.",
            "השתמש ב-Lot Origin להפרדת זרמי-בדיקה.",
          ],
          interviewHe: [
            { qHe: "מהו Lot Origin ולמה הוא חשוב בבחירה?", aHe: "Lot Origin (HERKUNFT) מציין את מקור-הבדיקה (01 קבלה לרכש, 03 ייצור, 89 ידני וכו'). הוא מאפשר להפריד זרמי-בדיקה שונים בבחירה." },
          ],
          takeawaysHe: [
            "בחירה נשענת על שדות QALS.",
            "מפעל+תאריך+Type+Origin = בחירה ממוקדת ומהירה.",
          ],
        },
        {
          id: "18.1.2",
          titleHe: "בחירה מרובה",
          titleEn: "Multiple Selection",
          execHe:
            "בחירה-מרובה מאפשרת להזין מספר ערכים בודדים, טווחים, וכן ערכים-לאי-הכללה (exclude) בכל שדה-בחירה — גמישות שמייתרת ריצות-מרובות.",
          beginnerHe:
            "במקום להריץ שלוש פעמים לשלושה חומרים, אתה לוחץ על החץ הקטן ליד השדה (Multiple Selection) ומזין את כל השלושה בבת-אחת. אפשר גם לומר 'הכל חוץ מ...'.",
          consultantHe:
            "הכפתור (Arrow / Multiple Selection) פותח דיאלוג עם ארבע לשוניות: Single values (include/exclude) ו-Ranges (include/exclude). מתורגם ל-SELECT-OPTIONS פנימי (SIGN=I/E, OPTION=EQ/BT). שימושי במיוחד לרשימות-חומרים או ספקים גדולות; ניתן לטעון מ-Clipboard/Excel.",
          purposeHe:
            "לאחזר קבוצה לא-רציפה של ערכים בריצה אחת — חוסך זמן ומבטיח עקביות.",
          processExampleHe:
            "מהנדס בוחר 5 חומרים ספציפיים (Single values) + טווח אצוות, ושולל אצווה אחת בבדיקה-חוזרת (exclude) — הכל בריצה אחת.",
          cbcHe:
            "ב-CBC מזינים את כל מק\"טי-המשקאות של קו-מילוי מסוים כ-Single values בבת-אחת, ושוללים טעמים-עונתיים שאינם בייצור כעת.",
          navHe: [
            "QA32 ► לחיצה על חץ Multiple Selection ליד שדה-בחירה",
          ],
          tables: ["QALS"],
          tcodes: ["QA32"],
          fiori: ["F2424"],
          configHe: [
            "Single Values / Ranges, Include / Exclude — ארבע לשוניות בדיאלוג.",
            "Import from Clipboard: הדבקת רשימת-ערכים מ-Excel.",
          ],
          flow: [
            { he: "לחיצה על חץ Multiple Selection" },
            { he: "הזנת ערכים/טווחים", note: "Include/Exclude" },
            { he: "Copy ➔ חזרה למסך-הבחירה" },
            { he: "הרצה", code: "F8" },
          ],
          mistakesHe: [
            "בלבול בין לשונית Include ל-Exclude — תוצאות הפוכות.",
            "הזנת טווח כשצריך ערכים-בודדים — הכללת ערכי-ביניים לא-רצויים.",
          ],
          troubleshootHe: [
            "תוצאות חסרות ➔ ערכים הוזנו בטעות בלשונית Exclude.",
            "ירוק/אדום על האייקון ➔ סימן שיש ערכים-מרובים פעילים בשדה.",
          ],
          bestPracticeHe: [
            "הדבק רשימות גדולות מ-Excel במקום הקלדה.",
            "בדוק את צבע-אייקון ה-Multiple-Selection לפני הרצה.",
          ],
          interviewHe: [
            { qHe: "כיצד שוללים ערך בבחירה?", aHe: "דרך דיאלוג Multiple Selection, לשונית Exclude (Single values / Ranges) — תורגם ל-SIGN='E' ב-SELECT-OPTIONS." },
          ],
          takeawaysHe: [
            "בחירה-מרובה = ערכים בודדים + טווחים + Include/Exclude.",
            "מייתרת ריצות-מרובות; טעינה מ-Excel אפשרית.",
          ],
        },
        {
          id: "18.1.3",
          titleHe: "תחזוקת בחירה",
          titleEn: "Maintain Selection",
          execHe:
            "תחזוקת-בחירה (Maintain Selection) מאפשרת לשמור, לטעון ולמחוק קבוצות-קריטריונים נפוצות כ'בחירות שמורות', מעבר לוריאנטים הקלאסיים — נוחות לבודק שמשתמש באותו פילטר תכופות.",
          beginnerHe:
            "אם אתה תמיד בוחר אותם מסננים, אתה יכול לשמור אותם בשם ולטעון אותם בלחיצה במקום למלא מחדש. כמו 'מועדפים' לחיפוש.",
          consultantHe:
            "הפונקציה שומרת את ערכי מסך-הבחירה כ-Selection (פר-משתמש/גלובלי). היא משלימה את ה-Variants הקלאסיים אך נגישה מתוך זרימת-העבודה. ב-Fiori המקבילה היא Variant-Management של ה-Smart Filter Bar (My Views).",
          purposeHe:
            "להאיץ עבודה חוזרת ולתקנן קריטריונים בין משתמשים, בלי לנהל וריאנטים ב-SE38.",
          processExampleHe:
            "בודק שומר בחירה 'OPEN_GR_LOTS' ובכל בוקר טוען אותה במקום למלא ארבעה שדות.",
          cbcHe:
            "ב-CBC כל בודק-משמרת שומר בחירה לקו שלו ('LINE3_INPROCESS') ומשתף עם המחליף במשמרת הבאה.",
          navHe: [
            "QA32 ► Goto ► Variants / Maintain Selection",
          ],
          tables: ["VARI", "VARID"],
          tcodes: ["QA32"],
          fiori: ["F2424"],
          configHe: [
            "שמירה כ-User-specific או Global.",
            "Protect / Only display in catalog — בקרת-נראות וריאנטים.",
          ],
          flow: [
            { he: "הזנת קריטריונים", code: "QA32" },
            { he: "שמירת-בחירה", note: "בשם" },
            { he: "טעינה בריצה הבאה" },
          ],
          mistakesHe: [
            "שמירה User-specific כשרצו Global — עמיתים לא רואים.",
            "שמות לא-תיאוריים — בלבול בין בחירות.",
          ],
          troubleshootHe: [
            "בחירה שמורה לא נטענת ➔ נשמרה כ-User-specific למשתמש אחר.",
            "ערכים ישנים ➔ הבחירה מכילה תאריך-קבוע במקום דינמי (ראה Maintain Variant).",
          ],
          bestPracticeHe: [
            "תן שמות-תקן ארגוניים לבחירות גלובליות.",
            "השתמש בתאריכים-דינמיים (Dynamic Date) במקום קבועים.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין בחירה-שמורה לוריאנט?", aHe: "מבחינה טכנית שתיהן נשענות על אותו מנגנון VARI; ההבדל הוא נקודת-הגישה והניהול. בחירה-שמורה נגישה מתוך זרימת-העבודה ונוחה למשתמש-קצה." },
          ],
          takeawaysHe: [
            "תחזוקת-בחירה מאיצה עבודה חוזרת.",
            "שמור גלובלי לשיתוף; השתמש בתאריכים-דינמיים.",
          ],
        },
        {
          id: "18.1.4",
          titleHe: "תחזוקת וריאנט",
          titleEn: "Maintain Variant",
          execHe:
            "וריאנט הוא קבוצת-ערכים שמורה למסך-בחירה, כולל יכולת לתאריכים-דינמיים (Dynamic Date Calculation) ולהסתרת/נעילת שדות. הוא הבסיס לאוטומציה (Jobs) ולעקביות-דיווח.",
          beginnerHe:
            "וריאנט הוא 'תבנית-טופס' שמורה. במקום 'השבוע' קבוע, אפשר לומר 'תמיד 7 ימים אחורה' — וכך הוריאנט עובד נכון כל יום בלי עדכון.",
          consultantHe:
            "נשמר ב-VARI/VARID. תכונות-מפתח: Dynamic Date (D=Today, current month וכו'), Protect field, Hide field, Required field. וריאנט הוא תנאי להרצה ברקע (SM36/SM37) של דוחות-QM. ב-S/4HANA וריאנטים עדיין נדרשים לעבודות-רקע ולתזמון.",
          purposeHe:
            "להבטיח שדוח רץ אותו-דבר כל פעם, גם אוטומטית, עם תאריכים שמתעדכנים מעצמם.",
          processExampleHe:
            "וריאנט 'DAILY_OPEN' עם Dynamic Date 'מהיום פחות-1 עד היום' מתוזמן ב-SM36 לרוץ כל בוקר ולשלוח Spool ל-QA.",
          cbcHe:
            "ב-CBC וריאנט-לילה רץ ברקע ומפיק רשימת לוטים-פתוחים של היממה לכל קווי-המילוי, מוכן לסקירת-בוקר.",
          navHe: [
            "QA32 ► Goto ► Variants ► Save as Variant",
            "SE38/SA38 ► Program ► Variant Maintenance",
          ],
          tables: ["VARI", "VARID", "VARIT"],
          tcodes: ["QA32", "SE38", "SM36"],
          fiori: ["F2424"],
          configHe: [
            "Dynamic Date Calculation: 'Current date', 'Current date +/- N', 'First/Last of month'.",
            "Selection-variable type: D (date), B (user-defined), T (table-driven).",
            "Field attributes: Protected / Invisible / Required.",
          ],
          flow: [
            { he: "הזנת קריטריונים", code: "QA32" },
            { he: "Save as Variant", note: "שם+תיאור" },
            { he: "הגדרת Dynamic Date" },
            { he: "תזמון ברקע", code: "SM36" },
          ],
          mistakesHe: [
            "תאריך-קבוע בוריאנט-רקע — הדוח 'נתקע' בתאריך-עבר.",
            "אי-נעילת שדה-מפעל — משתמש משנה בטעות ומקבל נתונים שגויים.",
          ],
          troubleshootHe: [
            "Job מחזיר נתונים ישנים ➔ תאריך-קבוע במקום Dynamic Date.",
            "וריאנט לא נטען ב-Job ➔ נשמר User-specific; שמור גלובלי.",
          ],
          bestPracticeHe: [
            "השתמש תמיד ב-Dynamic Date לוריאנטי-רקע.",
            "נעל (Protect) שדות-מפתח כמו מפעל ו-Type.",
          ],
          interviewHe: [
            { qHe: "למה צריך Dynamic Date בוריאנט?", aHe: "כדי שדוח-רקע מתוזמן יחשב את הטווח יחסית להיום (למשל '7 ימים אחורה') בכל ריצה, במקום תאריך-קבוע שיתיישן." },
            { qHe: "מה הקשר בין וריאנט לעבודת-רקע?", aHe: "הרצת תוכנית ברקע (SM36) מחייבת וריאנט — אין מסך אינטראקטיבי, כל הקריטריונים חייבים לבוא מהוריאנט." },
          ],
          takeawaysHe: [
            "וריאנט = קריטריונים שמורים + תאריכים-דינמיים.",
            "תנאי להרצה ברקע ולעקביות-דיווח.",
            "נעל שדות-מפתח, השתמש ב-Dynamic Date.",
          ],
          relatedHe: [
            { labelHe: "QM · תחזוקת-בחירה (18.1.3)", href: "/library/qm/chapter-18/#sub-18.1.3" },
          ],
        },
        {
          id: "18.1.5",
          titleHe: "רשימת-עבודה לבחירת לוטי-בדיקה",
          titleEn: "Inspection Lot Selection Worklist",
          execHe:
            "רשימת-העבודה (Worklist) היא תצוגת-ALV האינטראקטיבית שמתקבלת אחרי הבחירה. ממנה מבצעים פעולות-המוניות: רישום-תוצאות, החלטות-שימוש, הדפסה ו-Navigation לפרטים — נקודת-הפעולה היומיומית של הבודק.",
          beginnerHe:
            "אחרי שלחצת 'הרץ', מקבלים רשימה. מהרשימה הזו אפשר לעבוד: ללחוץ פעמיים על שורה כדי להיכנס לבדיקה, לסמן כמה שורות ולבצע פעולה על כולן יחד. זו 'תיבת-הדואר' של הבודק.",
          consultantHe:
            "ה-Worklist הוא ALV Grid עם פונקציות-מסך מובנות: Results Recording (כמו QE51N), Usage Decision (כמו QA11), Print, Lot details (QA03). פעולות-המוניות זמינות על שורות-מסומנות. סטטוס-הלוט מוצג צבעוני (אייקון). ב-Fiori המקבילה היא Worklist ב-Manage Inspection Lots / Quality Engineer Overview (F2787).",
          purposeHe:
            "לרכז את כל פעולות-האיכות במקום אחד, ולאפשר עיבוד-המוני יעיל במקום לוט-אחר-לוט.",
          processExampleHe:
            "בודק מסמן 10 לוטים שעברו בדיקה, ומבצע החלטת-שימוש 'A' (קבלה) על כולם בבת-אחת מתוך ה-Worklist.",
          cbcHe:
            "ב-CBC בסוף-משמרת הבודק מסמן את כל אצוות-המשקה שעברו, ומבצע Usage Decision קבוצתי לשחרור למלאי-מכירה.",
          navHe: [
            "QA32 ► רשימת-ALV (Worklist) ► Functions toolbar",
          ],
          tables: ["QALS", "QAVE", "QAMR"],
          tcodes: ["QA32", "QE51N", "QA11"],
          fiori: ["F2787", "F2424"],
          configHe: [
            "ALV Layout: עמודות, מיון, סכומי-ביניים.",
            "Function authorization: אילו פעולות-המוניות מותרות למשתמש (UD/Results).",
          ],
          flow: [
            { he: "רשימת-Worklist", code: "QA32" },
            { he: "סימון שורות", note: "בודדות/מרובות" },
            { he: "פעולה", note: "Results / UD / Print" },
            { he: "עדכון QALS/QAVE" },
          ],
          mistakesHe: [
            "ביצוע UD המוני בלי לבדוק תוצאות — שחרור שגוי.",
            "עבודה על Worklist ישן (לא רוענן) — סטטוסים לא-מעודכנים.",
          ],
          troubleshootHe: [
            "פעולה אפורה/חסומה ➔ הרשאה חסרה (QM authorization object Q_INSPLOT).",
            "הרשימה לא משתקפת שינוי ➔ רענן (Refresh) — הסטטוס השתנה בינתיים.",
          ],
          bestPracticeHe: [
            "רענן לפני פעולה-המונית.",
            "נצל סכומי-ביניים ב-ALV לקיבוץ לפי חומר/ספק.",
          ],
          interviewHe: [
            { qHe: "מה אפשר לעשות ישירות מ-Worklist של QA32?", aHe: "רישום-תוצאות, החלטת-שימוש (גם המונית), הדפסה, מעבר לפרטי-לוט — הכל בלי לעזוב את הרשימה." },
          ],
          takeawaysHe: [
            "ה-Worklist = תיבת-העבודה של הבודק (ALV).",
            "תומך פעולות-המוניות — UD ו-Results על שורות-מרובות.",
            "Fiori מקביל: Quality Engineer Overview (F2787).",
          ],
        },
        {
          id: "18.1.6",
          titleHe: "הגדרות מסנן",
          titleEn: "Filter Settings",
          execHe:
            "הגדרות-מסנן (Filter) ב-ALV מאפשרות לצמצם את הרשימה שכבר נשלפה, לפי כל עמודה, בלי ריצה-חוזרת — סינון מהיר 'בזיכרון' לעבודה ממוקדת.",
          beginnerHe:
            "כבר יש לך רשימה על המסך. במקום להריץ שוב, אתה לוחץ על אייקון-המסנן ובוחר 'הראה רק ספק X' או 'רק סטטוס פתוח'. הרשימה מצטמצמת מיד.",
          consultantHe:
            "פונקציית Filter של ALV Grid פועלת על הנתונים שכבר ב-Internal Table — מהיר, ללא DB-round-trip. ניתן לסנן לפי מספר-עמודות, להגדיר טווחים, ולשמור כחלק מ-Layout. שונה מ-Selection (DB-level) — Filter הוא Post-selection.",
          purposeHe:
            "לאפשר ניתוח-אינטראקטיבי מהיר של תוצאות שכבר נשלפו, בלי עומס על המסד.",
          processExampleHe:
            "מהנדס שלף 500 לוטים, ואז מסנן ב-ALV ל'Vendor=4711' כדי לבחון רק ספק-בעייתי, ואז מסיר-מסנן ובוחן ספק אחר.",
          cbcHe:
            "ב-CBC הבודק שולף את כל בדיקות-המשמרת, ומסנן ב-ALV לפי 'אצווה דחויה' כדי לטפל קודם בחריגות.",
          navHe: [
            "QA32 ► ALV ► Filter icon (Ctrl+F)",
          ],
          tables: ["QALS"],
          tcodes: ["QA32"],
          fiori: ["F2424"],
          configHe: [
            "Filter ברמת-עמודה: Single value / Range / Pattern.",
            "Save filter בתוך ALV Layout לשימוש-חוזר.",
          ],
          flow: [
            { he: "רשימה שנשלפה", code: "QA32" },
            { he: "Filter icon", note: "Ctrl+F" },
            { he: "בחירת-קריטריון-עמודה" },
            { he: "רשימה מצומצמת" },
          ],
          mistakesHe: [
            "בלבול בין Filter (זיכרון) ל-Selection (מסד) — שכחה שהמסנן לא מביא רשומות חדשות.",
            "השארת מסנן פעיל ושכחה שחלק מהרשומות מוסתרות.",
          ],
          troubleshootHe: [
            "רשומות 'נעלמו' ➔ מסנן-ALV פעיל; נקה Filter (Delete Filter).",
            "מסנן לא חוזר ➔ לא נשמר ב-Layout.",
          ],
          bestPracticeHe: [
            "שמור מסננים נפוצים בתוך Layout.",
            "זכור שמסנן לא מביא רשומות חדשות — רק מצמצם קיימות.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין Filter ל-Selection?", aHe: "Selection רץ מול המסד ומביא רשומות; Filter פועל על הרשומות שכבר בזיכרון-ה-ALV ורק מצמצם תצוגה — מהיר אך לא מביא חדשות." },
          ],
          takeawaysHe: [
            "Filter = סינון post-selection ב-ALV, מהיר וללא DB.",
            "ניתן לשמור ב-Layout; אינו מביא רשומות חדשות.",
          ],
        },
        {
          id: "18.1.7",
          titleHe: "הורדה",
          titleEn: "Download",
          execHe:
            "הורדת רשימת-ALV לקובץ (Excel/Spreadsheet/Text/HTML) מאפשרת ניתוח-חיצוני, שיתוף ודיווח-הנהלה. זו דרך-המלך להוצאת-נתונים מ-QM לעיבוד נוסף.",
          beginnerHe:
            "אחרי שיש לך רשימה, אתה יכול לשמור אותה כקובץ Excel במחשב שלך, ואז לעבוד עליה — גרפים, נוסחאות, שליחה במייל.",
          consultantHe:
            "ALV ► List ► Export ► Local File (או Spreadsheet). פורמטים: XLSX, Text (Tab), HTML, Clipboard. ההורדה מכבדת את ה-Layout (עמודות/מיון/פילטר נראים). שים לב לאבטחת-מידע — נתוני-איכות עשויים להיות רגישים. ב-Fiori יש Export-to-Excel מובנה בכל טבלת-Smart-Table.",
          purposeHe:
            "לאפשר עיבוד וניתוח מחוץ ל-SAP, ולשתף עם בעלי-עניין שאין להם גישה למערכת.",
          processExampleHe:
            "מנהל-QA מוריד את לוטי-החודש ל-Excel, בונה Pivot של אחוז-דחייה לפי ספק, ומציג בישיבת-הנהלה.",
          cbcHe:
            "ב-CBC מורידים את תוצאות-בדיקות-הקו השבועיות ל-Excel לדוח-KPI של מפעל-המילוי (First-Pass-Yield).",
          navHe: [
            "QA32 ► ALV ► List ► Export ► Spreadsheet / Local File",
          ],
          tables: ["QALS"],
          tcodes: ["QA32"],
          fiori: ["F2424"],
          configHe: [
            "פורמט-יצוא: XLSX / Text / HTML / Clipboard.",
            "Export מכבד את ה-Layout הנוכחי (עמודות נראות בלבד).",
          ],
          flow: [
            { he: "רשימת-ALV", code: "QA32" },
            { he: "List ► Export" },
            { he: "בחירת-פורמט", note: "XLSX/Text" },
            { he: "שמירה מקומית" },
          ],
          mistakesHe: [
            "הורדת עמודות-מוסתרות בטעות או החסרת עמודות-נדרשות — תלוי ב-Layout.",
            "שיתוף קובץ עם נתונים-רגישים ללא הרשאה.",
          ],
          troubleshootHe: [
            "Excel נפתח ריק/שבור ➔ בחר XLSX ולא Text כשיש תווים מיוחדים.",
            "עמודות חסרות בקובץ ➔ הוסתרו ב-Layout לפני ההורדה.",
          ],
          bestPracticeHe: [
            "הגדר Layout נכון לפני ההורדה.",
            "שמור על מדיניות-אבטחה לנתוני-איכות מיוצאים.",
          ],
          interviewHe: [
            { qHe: "אילו פורמטים זמינים בהורדת ALV?", aHe: "XLSX (Spreadsheet), Text מופרד-Tab, HTML ו-Clipboard. ההורדה מכבדת את פריסת-ה-Layout הנוכחית." },
          ],
          takeawaysHe: [
            "הורדה = הוצאת-נתונים לעיבוד חיצוני.",
            "מכבדת Layout; שמור על אבטחת-מידע.",
          ],
        },
        {
          id: "18.1.8",
          titleHe: "העתקת נתונים סלקטיביים ל-Excel",
          titleEn: "Copy Selective Data to Excel",
          execHe:
            "מעבר להורדת-הרשימה-המלאה, ניתן לסמן תאים/שורות/עמודות ספציפיים ב-ALV ולהעתיקם ל-Clipboard ישירות ל-Excel — מהיר לקטעי-נתונים נקודתיים.",
          beginnerHe:
            "אם אתה צריך רק כמה שורות או עמודה אחת, אתה מסמן אותן ולוחץ Copy (Ctrl+Y לסימון-בלוק, ואז Ctrl+C), ומדביק ב-Excel. בלי לייצא את כל הרשימה.",
          consultantHe:
            "ALV תומך ב-Cell/Column/Row selection + Copy to Clipboard (Ctrl+Y מפעיל מצב-בחירת-בלוק). שימושי כשרוצים רק תת-קבוצה. שונה מ-Export שמוציא הכל. נשמרת פורמטציית-העמודות הבסיסית.",
          purposeHe:
            "לחלץ במהירות קטע-נתונים מדויק (למשל עמודת-מספרי-לוט) בלי קובץ-מלא.",
          processExampleHe:
            "בודק מסמן את עמודת-מספרי-הלוט של 12 חריגות, מעתיק ל-Excel, ומצרף למייל-אסקלציה לספק.",
          cbcHe:
            "ב-CBC מעתיקים את עמודת-אצוות-המשקה הדחויות מ-Worklist ישירות לטופס-CAPA (פעולה-מתקנת) ב-Excel.",
          navHe: [
            "QA32 ► ALV ► סימון תאים ► Ctrl+Y (Block select) ► Ctrl+C",
          ],
          tables: ["QALS"],
          tcodes: ["QA32"],
          fiori: ["F2424"],
          configHe: [
            "Ctrl+Y: מצב בחירת-בלוק (Multiple-cell selection).",
            "Copy to Clipboard: ללא יצירת-קובץ.",
          ],
          flow: [
            { he: "רשימת-ALV", code: "QA32" },
            { he: "Ctrl+Y בחירת-בלוק" },
            { he: "סימון תאים/עמודות" },
            { he: "Ctrl+C ➔ הדבקה ב-Excel" },
          ],
          mistakesHe: [
            "ניסיון Ctrl+C ללא מצב-בלוק — לא מעתיק תאים-מרובים.",
            "החמצת שורת-כותרת — עמודות בלי שמות ב-Excel.",
          ],
          troubleshootHe: [
            "Copy לא עובד ➔ לא הופעל Ctrl+Y (Block select) קודם.",
            "הדבקה בעמודה-אחת ב-Excel ➔ פורמט-Clipboard; השתמש ב-Export-XLSX לעמודות-מרובות.",
          ],
          bestPracticeHe: [
            "השתמש בהעתקה-סלקטיבית לקטעים קטנים; ב-Export-XLSX לרשימות-מלאות.",
            "כלול כותרות בבחירה אם דרושות.",
          ],
          interviewHe: [
            { qHe: "מתי להעדיף Copy-סלקטיבי על Export?", aHe: "כשצריך רק תת-קבוצה (כמה תאים/עמודה) במהירות לתוך מסמך-קיים, בלי קובץ-מלא. ל-export-מלא ומובנה עדיף Export-XLSX." },
          ],
          takeawaysHe: [
            "Ctrl+Y מפעיל בחירת-בלוק; Ctrl+C מעתיק ל-Clipboard.",
            "מהיר לקטעי-נתונים נקודתיים; Export-XLSX למלא.",
          ],
        },
        {
          id: "18.1.9",
          titleHe: "הדפסה",
          titleEn: "Print",
          execHe:
            "הדפסת רשימת-לוטים ו/או מסמכי-בדיקה (Inspection Instruction, Sample-Drawing, UD-protocol) מספקת תיעוד-קשיח ל-Shop-floor ולביקורת. ההדפסה נשלטת דרך Print-Control של QM.",
          beginnerHe:
            "אתה יכול להדפיס את הרשימה שעל המסך, או להדפיס מסמך-בדיקה רשמי (הוראת-בדיקה) לבודק ברצפה. SAP שולח ל-Spool ואז למדפסת.",
          consultantHe:
            "שתי רמות: (1) הדפסת ה-ALV (List ► Print) — תצוגת-רשימה; (2) הדפסת מסמכי-QM דרך Print-Control (SPRO ► QM ► ... ► Define Printout Control) — Inspection Instruction, Sample-drawing instruction, Inspection-results, UD. נשען על Output-determination ו-SmartForms/SAPscript. ב-S/4HANA חלק עבר ל-Output-Management (BRF+ / Adobe Forms).",
          purposeHe:
            "לספק תיעוד-פיזי לרצפה ולביקורת-איכות (Audit-trail), ולתמוך בתהליכים-ידניים שעדיין דורשים נייר.",
          processExampleHe:
            "עם יצירת-לוט, מודפסת אוטומטית הוראת-בדיקה (Inspection Instruction) שמלווה את הדגימה במעבדה; בסיום מודפס פרוטוקול-UD.",
          cbcHe:
            "ב-CBC מודפסת תווית-דגימה ל-CO2/תרכיז עם פרטי-אצווה ופרמטרי-בדיקה, ומלווה את הדגימה למעבדה.",
          navHe: [
            "QA32 ► List ► Print",
            "SPRO ► QM ► Quality Inspection ► Print Control ► Define Printout Control",
          ],
          tables: ["QALS", "TQ80", "NAST"],
          tcodes: ["QA32", "QGD1"],
          fiori: ["F2424"],
          configHe: [
            "Printout Control: סוגי-מסמך (Instruction/Sample/Results/UD) פר Inspection-Type/מפעל.",
            "Output-determination + Form (SmartForm/Adobe).",
            "Print-version ותזמון (מיידי/ברקע).",
          ],
          flow: [
            { he: "יצירת/בחירת לוט", code: "QA32" },
            { he: "קביעת Print-Control", note: "SPRO" },
            { he: "Output ➔ Spool", code: "SP01" },
            { he: "הדפסה פיזית" },
          ],
          mistakesHe: [
            "Print-Control לא מוגדר ל-Inspection-Type — אין הוראת-בדיקה.",
            "מדפסת-ברירת-מחדל שגויה — מסמכים אובדים ב-Spool.",
          ],
          troubleshootHe: [
            "לא מודפסת הוראת-בדיקה ➔ Printout-Control חסר/לא-פעיל ל-Type.",
            "מסמך תקוע ➔ בדוק SP01 (Spool) ו-Output-status (NAST).",
          ],
          bestPracticeHe: [
            "הגדר Print-Control מוקדם פר Inspection-Type ומפעל.",
            "השתמש ב-Adobe Forms ב-S/4HANA לפורמט מודרני.",
          ],
          interviewHe: [
            { qHe: "אילו מסמכי-QM ניתן להדפיס וכיצד נשלטים?", aHe: "Inspection Instruction, Sample-Drawing, Inspection-Results ו-UD-Protocol — נשלטים דרך Printout-Control ב-SPRO + Output-determination ו-Form (SmartForm/Adobe)." },
          ],
          takeawaysHe: [
            "שתי רמות: הדפסת-ALV והדפסת-מסמכי-QM.",
            "מסמכי-QM נשלטים ב-Printout-Control (SPRO).",
            "S/4HANA: Output-Management + Adobe Forms.",
          ],
        },
        {
          id: "18.1.10",
          titleHe: "ניתוח ABC",
          titleEn: "ABC Analysis",
          execHe:
            "ניתוח-ABC ברמת-הדיווח מסווג אובייקטים (חומרים/ספקים/מאפיינים) לשלוש קטגוריות לפי תרומתם (A=מהותי, B=בינוני, C=שולי) — מיקוד-מאמץ-איכות לפי Pareto: כ-20% מהגורמים אחראים ל-80% מהבעיות.",
          beginnerHe:
            "במקום לתת תשומת-לב שווה לכל דבר, ABC ממיין: A = הדברים הכי חשובים (מעט פריטים, רוב-ההשפעה), C = הרבה פריטים שכמעט לא משנים. כך מתמקדים קודם ב-A.",
          consultantHe:
            "ב-QM ABC מופיע בשתי נקודות: (1) דיווח-תפעולי — מיון רשימה לפי תרומה-מצטברת; (2) LIS Standard-Analysis (ראה 18.2.5) עם פונקציית ABC מובנית על Key-Figure (למשל מספר-דחיות, עלות-אי-איכות). הסיווג נקבע לפי Strategy: לפי-% מהסכום, לפי-% ממספר, או לפי-ערך-קבוע. התוצאה מזינה תעדוף ספקים/חומרים.",
          purposeHe:
            "למקד משאבי-איכות מוגבלים בגורמים בעלי ההשפעה-הגדולה-ביותר על איכות ועלות.",
          processExampleHe:
            "מהנדס מריץ ABC על 'מספר-דחיות לפי ספק'; 3 ספקים (A) אחראים ל-78% מהדחיות — הם מקבלים תוכנית-שיפור ו-Source-inspection.",
          cbcHe:
            "ב-CBC ABC על עלות-אי-איכות מצביע שבקבוקי-PET ופקקים (קטגוריה A) מניבים את רוב-הפסולת — מיקוד-ביקורת-ספק שם.",
          navHe: [
            "QA32 ► ALV ► Sort + Subtotals (ABC ידני)",
            "Logistics ► QM ► Quality Notifications/Inspection ► Info System ► Standard Analyses ► ABC Analysis",
          ],
          tables: ["QALS", "S068", "S099"],
          tcodes: ["QA32", "MCXA"],
          fiori: ["F2332"],
          configHe: [
            "ABC Strategy: % of total / % of number / fixed value.",
            "גבולות A/B/C (Thresholds) פר Key-Figure.",
            "בסיס-ניתוח: Key-Figure (rejections, scrap-cost, lots).",
          ],
          flow: [
            { he: "בחירת Key-Figure", note: "דחיות/עלות" },
            { he: "הגדרת ABC Strategy" },
            { he: "מיון מצטבר (Pareto)" },
            { he: "סיווג A/B/C" },
            { he: "תעדוף-פעולה" },
          ],
          mistakesHe: [
            "ABC על מדד לא-נכון (כמות במקום עלות) — מיקוד מוטעה.",
            "גבולות-סף שרירותיים — חלוקה לא-משמעותית.",
          ],
          troubleshootHe: [
            "כל הפריטים נופלים ל-A/C ➔ Strategy או Thresholds לא-מכוילים.",
            "נתונים חסרים ➔ ה-Info-Structure לא עודכן (ראה 18.2).",
          ],
          bestPracticeHe: [
            "בחר Key-Figure עסקי (עלות-אי-איכות) לתעדוף-אמת.",
            "כייל גבולות לפי הפילוג בפועל, לא לפי 80/15/5 אוטומטי.",
          ],
          interviewHe: [
            { qHe: "מהו עקרון-ה-Pareto בבסיס ABC?", aHe: "מיעוט-הגורמים (כ-20%, קטגוריה A) אחראי לרוב-ההשפעה (כ-80%). ABC מסווג כדי למקד מאמץ שם." },
            { qHe: "על אילו מדדים מריצים ABC ב-QM?", aHe: "מספר-לוטים, מספר/אחוז-דחיות, כמות-פסולת, עלות-אי-איכות — תלוי במטרת-המיקוד." },
          ],
          takeawaysHe: [
            "ABC ממקד מאמץ לפי Pareto (A=מהותי).",
            "זמין ידנית ב-ALV ומובנה ב-LIS (18.2.5).",
            "בחר Key-Figure עסקי וכייל גבולות.",
          ],
          relatedHe: [
            { labelHe: "QM · ניתוח ABC ב-LIS (18.2.5)", href: "/library/qm/chapter-18/#sub-18.2.5" },
          ],
        },
      ],
    },
    // ============================================================ 18.2
    {
      id: "18.2",
      titleHe: "ניתוחים סטנדרטיים",
      titleEn: "Standard Analyses",
      execHe:
        "הניתוחים-הסטנדרטיים של QM נשענים על LIS (Logistics Information System) — שכבת-נתונים מצטברת (Aggregated) של מבני-מידע (Info Structures) S0xx שמתעדכנים אוטומטית מאירועי-בדיקה. הם מספקים תצוגות-על: סקירת-חומר, מדדי-מפתח, מבני-מידע נוספים, ABC ו-Time-Series — בלי לסרוק לוט-אחר-לוט. זו שכבת-הניהול הקלאסית של QM לפני עידן-Fiori.",
      beginnerHe:
        "במקום לספור ידנית כמה בדיקות נכשלו, SAP שומר 'סיכומים מוכנים' (Info Structures). הניתוחים-הסטנדרטיים שולפים את הסיכומים האלה ומציגים אותם בטבלאות וגרפים: כמה לוטים, כמה דחיות, איזה חומר הכי בעייתי. הכל מהיר כי הסיכום כבר חושב מראש.",
      consultantHe:
        "LIS ב-QM כולל מבני-מידע מובְנים: S068 (Material/Vendor inspection), S069/S070 (Material/Vendor characteristics), S099, ו-Quality-Notification structures (S074 וכו'). העדכון נשלט דרך Update-Group + Update-Rules (MC24/MC18). הניתוח הסטנדרטי (MCXA וה-T-Codes הייעודיים MCV*/MCO*) מציע Drill-down לפי Characteristics, Switch-Drilldown, ABC, Classification, Time-Series ו-Cumulative-Curve. ב-S/4HANA LIS עדיין נתמך אך SAP מעדיפה CDS/Embedded-Analytics; טבלאות-ה-S* עלולות לדרוש Statistical-Setup (OLI* / RMC*) לאחר מיגרציה.",
      purposeHe:
        "לספק לניהול-האיכות תצוגות-מגמה ומדדי-על מהירים על בסיס-נתונים מצטבר, לזיהוי בעיות-מערכתיות (ספק חלש, חומר בעייתי) ולא רק טיפול בלוט-בודד.",
      processExampleHe:
        "מנהל-QA פותח ניתוח-סטנדרטי 'Material', בוחר תקופה רבעונית, ורואה לכל חומר: מספר-לוטים, אחוז-דחייה, ערך-איכות (Quality-Score). הוא עושה Drill-down מ-חומר ל-ספק כדי לאתר את שורש-הבעיה.",
      cbcHe:
        "ב-CBC ניתוח-סטנדרטי על תרכיזים מציג Quality-Score לפי ספק-תרכיז לאורך-רבעון; ספק עם score יורד מסומן ל-Source-inspection ולשיחת-שיפור.",
      navHe: [
        "Logistics ► Quality Management ► Quality Inspection ► Info System ► Standard Analyses",
        "Logistics ► Logistics Controlling ► Quality Management Info System (QMIS)",
      ],
      tables: ["S068", "S069", "S070", "S099", "TMC4"],
      tcodes: ["MCXA", "MCV*", "MCVA", "MCVB"],
      fiori: ["F2332", "F2334"],
      configHe: [
        "Info Structure (MC21/MC22) + Update Rules (MC24): הגדרת אילו Key-Figures נצברים ומאיזה אירוע.",
        "Update Group + Statistics-relevance: שליטה בעדכון אוטומטי בעת Results/UD.",
        "Analysis-currency, Period-split (יום/שבוע/חודש/Posting-period).",
      ],
      flow: [
        { he: "אירוע-בדיקה", note: "Results/UD" },
        { he: "עדכון Info Structure", code: "S068" },
        { he: "פתיחת ניתוח-סטנדרטי", code: "MCXA" },
        { he: "בחירת-תקופה + Drill-down" },
        { he: "תצוגה/גרף/ABC/Time-Series" },
      ],
      mistakesHe: [
        "ציפייה לנתונים בלי Statistical-Setup לאחר מיגרציה — מבנה-המידע ריק.",
        "Update-Rules לא מוגדרים — אירועים לא נצברים ב-Info-Structure.",
        "בלבול בין LIS (מצטבר/היסטורי) לדיווח-תפעולי (פרטני/חי).",
      ],
      troubleshootHe: [
        "ניתוח ריק ➔ הרץ Statistical-Setup (RMCQ*/OLIQ) או בדוק Update-Rules.",
        "מספרים לא-תואמים ל-QA32 ➔ LIS מצטבר ואסינכרוני; ייתכן פיגור-עדכון או Setup חלקי.",
        "חסר Key-Figure ➔ לא הוגדר ב-Update-Rules של מבנה-המידע.",
      ],
      bestPracticeHe: [
        "ודא Update-Rules ו-Statistical-Setup מיד לאחר Go-Live/מיגרציה.",
        "השתמש ב-LIS למגמות; בדיווח-תפעולי לפרטים-חיים.",
        "ב-S/4HANA העדף Embedded-Analytics/CDS לחדשים, שמור LIS להיסטוריה.",
      ],
      interviewHe: [
        { qHe: "מהו Info Structure ב-LIS?", aHe: "טבלת-נתונים מצטברת (S0xx) שנצברת אוטומטית מאירועים לוגיסטיים/איכותיים לפי Update-Rules, ומשמשת לניתוחים-סטנדרטיים מהירים." },
        { qHe: "למה ניתוח-LIS עלול להיות ריק אחרי מיגרציה ל-S/4HANA?", aHe: "טבלאות-ה-S* אינן ממולאות רטרואקטיבית; צריך להריץ Statistical-Setup (OLI*/RMC*) ולוודא Update-Rules פעילים, אחרת אין נתונים." },
      ],
      takeawaysHe: [
        "LIS = שכבה מצטברת (S0xx) למגמות ומדדי-על QM.",
        "עדכון דרך Update-Rules; מילוי דרך Statistical-Setup.",
        "ב-S/4HANA נתמך אך נדחק לטובת CDS/Embedded-Analytics.",
      ],
      relatedHe: [
        { labelHe: "QM · יסודות הדיווח (18.1)", href: "/library/qm/chapter-18/#sub-18.1" },
        { labelHe: "QM · אפליקציות Fiori (18.4)", href: "/library/qm/chapter-18/#sub-18.4" },
      ],
      children: [
        {
          id: "18.2.1",
          titleHe: "ניתוחים סטנדרטיים ב-QM",
          titleEn: "Standard Analyses in QM",
          execHe:
            "הניתוחים-הסטנדרטיים ב-QM הם סדרת-דוחות-LIS ייעודיים (QMIS) המכסים לוטים, מאפיינים, החלטות-שימוש והודעות-איכות. כולם חולקים מנוע-Drill-down אחיד עם פונקציות ABC, Classification, Top-N ו-Time-Series.",
          beginnerHe:
            "זו 'תפריט-הדוחות' של QM: דוח לחומרים, דוח לספקים, דוח להודעות. כולם עובדים אותו-דבר — בוחרים תקופה, רואים סיכום, ויכולים 'לצלול' פנימה לפרטים.",
          consultantHe:
            "QMIS (Quality Management Information System) חי תחת Logistics-Controlling. הדוחות נשענים על מבני-S* ומשתפים מנוע-Drilldown אחיד (Standard-Analysis framework): Switch-drilldown, Hierarchy-drilldown, ABC, Classification, Dual-classification, Segmentation, Correlation ו-Time-series. כל אלה זמינים מתפריט-ה-Edit/Goto של הדוח.",
          purposeHe:
            "לתת ערכת-דוחות-על מוכנה לכל מימדי-האיכות, בלי לבנות דוח לכל שאלה.",
          processExampleHe:
            "מנהל בוחר ניתוח 'Quality Notifications', בוחר רבע, ועושה Switch-drilldown מ-סוג-הודעה ל-קוד-פגם ל-ספק כדי לאתר את הפגם-החוזר ומקורו.",
          cbcHe:
            "ב-CBC משתמשים בניתוח-ההודעות לזהות את קוד-הפגם הנפוץ (למשל 'נזילת-פקק') ולקשר לספק-הפקקים דרך Drill-down.",
          navHe: [
            "Logistics ► QM ► Quality Inspection ► Info System ► Standard Analyses ► (Material / Vendor / Characteristics / Notifications)",
          ],
          tables: ["S068", "S069", "S099"],
          tcodes: ["MCXA", "MCVA", "MCXB"],
          fiori: ["F2332"],
          configHe: [
            "Standard-Analysis framework: Drilldown, ABC, Classification, Time-series — זמינים בכל דוח-QMIS.",
            "Selection-version ו-Analysis-currency.",
          ],
          flow: [
            { he: "בחירת דוח-QMIS", note: "Material/Vendor/Notif" },
            { he: "בחירת-תקופה" },
            { he: "תצוגת-בסיס" },
            { he: "Drill-down / ABC / Time-series" },
          ],
          mistakesHe: [
            "הרצת דוח-לא-מתאים למימד הנדרש (חומר במקום ספק).",
            "התעלמות מ-Analysis-currency בדוחות-עלות.",
          ],
          troubleshootHe: [
            "פונקציית-Drilldown אפורה ➔ Characteristic לא קיים במבנה-המידע שנבחר.",
            "אין נתונים ➔ Setup/Update-Rules חסרים.",
          ],
          bestPracticeHe: [
            "למד את מנוע-ה-Drilldown פעם אחת — הוא זהה בכל דוחות-QMIS.",
            "בחר את מבנה-המידע הנכון למימד-השאלה.",
          ],
          interviewHe: [
            { qHe: "מהו QMIS?", aHe: "Quality Management Information System — ערכת ניתוחים-סטנדרטיים של QM תחת Logistics-Controlling, מבוססת מבני-S* עם מנוע-Drilldown אחיד." },
          ],
          takeawaysHe: [
            "QMIS = ערכת-דוחות-LIS של QM.",
            "מנוע-Drilldown אחיד: ABC/Classification/Time-series.",
            "בחר מבנה-מידע לפי מימד-השאלה.",
          ],
        },
        {
          id: "18.2.2",
          titleHe: "סקירת חומר",
          titleEn: "Material Overview",
          execHe:
            "סקירת-החומר היא הניתוח שמרכז את כל מדדי-האיכות לפי חומר: מספר-לוטים, כמות-נבדקת, אחוז-דחייה, Quality-Score וערך-מלאי-מושפע. זו נקודת-המוצא לזיהוי חומרים-בעייתיים.",
          beginnerHe:
            "טבלה שבה כל שורה היא חומר, והעמודות מספרות כמה נבדק, כמה נכשל ומה הציון. כך רואים מיד איזה מוצר עושה הכי הרבה צרות.",
          consultantHe:
            "נשען על S068 (Material-level). Key-Figures: Number of lots, Inspected quantity, Rejected/Accepted, Share-of-rejections, Quality-Score (לפי Q-Score-procedure). מאפשר Drill-down מ-חומר ל-ספק/מפעל/תקופה. ה-Quality-Score מחושב לפי שיטה ב-customizing (Score-procedure 01-06).",
          purposeHe:
            "לזהות אילו חומרים תורמים-הכי-הרבה לבעיות-איכות, ולתעדף פעולות-שיפור ובדיקות.",
          processExampleHe:
            "מהנדס ממיין סקירת-חומר לפי אחוז-דחייה יורד; החומר העליון (חומר-אריזה) מקבל בדיקה-מוגברת ופתיחת-NCR מול הספק.",
          cbcHe:
            "ב-CBC סקירת-חומר מראה ש'תווית-PET' מובילה באחוז-דחייה; נפתחת חקירת-מקור מול ספק-התוויות.",
          navHe: [
            "Logistics ► QM ► Quality Inspection ► Info System ► Standard Analyses ► Material",
          ],
          tables: ["S068", "QALS"],
          tcodes: ["MCXA", "MCVA"],
          fiori: ["F2332"],
          configHe: [
            "Quality-Score procedure (SPRO ► QM ► ... ► Define Quality Scores).",
            "Key-Figures ב-S068: lots, qty, rejections, score.",
          ],
          flow: [
            { he: "פתיחת סקירת-חומר", code: "MCVA" },
            { he: "בחירת-תקופה" },
            { he: "מיון לפי דחייה/Score" },
            { he: "Drill-down לספק/מפעל" },
          ],
          mistakesHe: [
            "התעלמות מנפח-בדיקה — אחוז-דחייה גבוה על מדגם-זעיר מטעה.",
            "השוואת-Score בלי לדעת את ה-Score-procedure שמאחורי.",
          ],
          troubleshootHe: [
            "Quality-Score ריק ➔ Score-procedure לא הוגדר לחומר/Inspection-Type.",
            "חומר חסר ➔ אין לוטים בתקופה או Setup חסר.",
          ],
          bestPracticeHe: [
            "שקלל אחוז-דחייה מול נפח-בדיקה (מובהקות).",
            "תקנן Score-procedure אחיד להשוואה הוגנת.",
          ],
          interviewHe: [
            { qHe: "מהו Quality-Score בסקירת-החומר?", aHe: "מדד-איכות מספרי שמחושב לפי Score-procedure (01-06) ב-customizing, המשקלל החלטות-שימוש/דחיות לציון אחיד להשוואה בין חומרים." },
          ],
          takeawaysHe: [
            "סקירת-חומר = מדדי-איכות פר-חומר (S068).",
            "כולל Quality-Score לפי Score-procedure.",
            "שקלל דחייה מול נפח-בדיקה.",
          ],
        },
        {
          id: "18.2.3",
          titleHe: "מדדי מפתח",
          titleEn: "Key Figures",
          execHe:
            "Key-Figures הם המדדים-המספריים שנצברים במבני-המידע: מספר-לוטים, כמויות, דחיות, ציוני-איכות, זמני-מחזור. הם 'המטבע' של כל ניתוח — בחירתם ופירושם הנכון קובעים את ערך-הדוח.",
          beginnerHe:
            "מדדי-מפתח הם המספרים שאתה מודד: כמה נבדק, כמה נדחה, מה הציון. כל גרף וכל טבלה מורכבים מהמדדים האלה.",
          consultantHe:
            "Key-Figures מוגדרים במבנה-המידע (MC22) ומעודכנים ב-Update-Rules (MC24). ב-QM הבסיסיים: Inspection-lots, Inspected-qty, Accepted/Rejected-qty, Share-of-rejection, Quality-Score, Average-Q-Score. ניתן להגדיר Calculated-Key-Figures ו-Ratios בניתוח. ב-Fiori המקבילים הם CDS-measures.",
          purposeHe:
            "להגדיר במדויק 'מה מודדים' כדי שכל הדוחות יציגו את אותם מדדים באופן עקבי ומשמעותי.",
          processExampleHe:
            "מהנדס מוסיף לניתוח Ratio מחושב 'דחיות/לוטים' ומשווה אותו בין מפעלים כדי לאתר את החלש.",
          cbcHe:
            "ב-CBC מדד-המפתח המוביל הוא First-Pass-Yield (לוטים-מאושרים/סה\"כ-לוטים) פר קו-מילוי, מוצג שבועית.",
          navHe: [
            "ניתוח-סטנדרטי ► Edit ► Choose Key Figures",
            "SPRO ► LIS ► Logistics Data Warehouse ► Data Basis ► Field Catalogs/Info Structures",
          ],
          tables: ["S068", "TMC4", "TMCA"],
          tcodes: ["MC22", "MC24", "MCXA"],
          fiori: ["F2332"],
          configHe: [
            "הגדרת Key-Figures במבנה-המידע (MC22).",
            "Calculated-Key-Figures / Ratios בתוך הניתוח.",
            "Update-Rules הקובעים מאיזה אירוע נצבר כל מדד (MC24).",
          ],
          flow: [
            { he: "הגדרת Key-Figure", code: "MC22" },
            { he: "Update-Rule", code: "MC24" },
            { he: "צבירה מאירוע" },
            { he: "בחירה/חישוב בניתוח", code: "MCXA" },
          ],
          mistakesHe: [
            "השוואת מדדים מוחלטים בלי נירמול (Ratio) — מפעל-גדול תמיד 'גרוע'.",
            "Update-Rule שגוי — המדד נצבר מאירוע לא-נכון.",
          ],
          troubleshootHe: [
            "מדד תמיד אפס ➔ Update-Rule לא ממופה לאירוע (Results/UD).",
            "Ratio שגוי ➔ מונה/מכנה לא-נכונים בהגדרת-החישוב.",
          ],
          bestPracticeHe: [
            "העדף Ratios/אחוזים על מספרים-מוחלטים להשוואה.",
            "תעד לכל Key-Figure את ה-Update-Rule שמאחוריו.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין Key-Figure בסיסי ל-Calculated-Key-Figure?", aHe: "בסיסי נצבר ישירות מאירוע דרך Update-Rule; Calculated מחושב בזמן-הניתוח מנוסחה על מדדים-קיימים (למשל דחיות/לוטים)." },
          ],
          takeawaysHe: [
            "Key-Figures = המדדים שנצברים ומוצגים.",
            "מוגדרים ב-MC22, נצברים ב-MC24.",
            "העדף Ratios לנירמול והשוואה.",
          ],
        },
        {
          id: "18.2.4",
          titleHe: "מבני מידע נוספים",
          titleEn: "Other Info Structures",
          execHe:
            "מעבר ל-S068 קיימים מבני-מידע נוספים המכסים מימדים שונים: מאפייני-חומר/ספק (S069/S070), ערכי-איכות (S099), והודעות-איכות (S07x). בחירת מבנה-המידע הנכון קובעת אילו מימדים וניתוחים זמינים.",
          beginnerHe:
            "יש כמה 'מחסני-סיכומים' שונים — אחד לפי חומר, אחד לפי מאפיין-בדיקה, אחד להודעות. בוחרים את המחסן שמתאים לשאלה שלך.",
          consultantHe:
            "מבני-QM סטנדרטיים: S068 (Material/Vendor lots), S069 (Material characteristics), S070 (Vendor characteristics), S099 (UD/Quality-score level), S074-S079 (Notifications). ניתן ליצור Self-defined-Info-Structures (MC21) עם Field-catalogs (MC18/MC19) למימדים מותאמים, ולחבר Update-Rules. שים-לב להבדל בין Standard ל-Flexible-Analyses (MCSI).",
          purposeHe:
            "לכסות את כל מימדי-האיכות (חומר/ספק/מאפיין/הודעה) ולאפשר מבנים-מותאמים לצרכים-מיוחדים.",
          processExampleHe:
            "כדי לנתח חריגות ברמת-מאפיין (לא רק לוט), מהנדס עובר ל-S069 ובוחן את אחוז-החריגה של מאפיין 'pH' לאורך-זמן.",
          cbcHe:
            "ב-CBC ניתוח ברמת-מאפיין (S069) על 'Brix' (ריכוז-סוכר) מגלה סחיפה בקו-מילוי מסוים, לפני שלוט שלם נדחה.",
          navHe: [
            "Logistics ► QM ► ... ► Info System ► Standard Analyses ► (Characteristics / Notifications)",
            "SPRO ► LIS ► Logistics Data Warehouse ► Data Basis ► Information Structures",
          ],
          tables: ["S069", "S070", "S099", "S074"],
          tcodes: ["MC21", "MC18", "MCSI"],
          fiori: ["F2334"],
          configHe: [
            "Self-defined Info-Structure (MC21) + Field-catalog (MC18/MC19).",
            "Standard vs Flexible Analysis (MCSI) למבנים-מותאמים.",
            "Update-Rules לכל מבנה (MC24).",
          ],
          flow: [
            { he: "בחירת מבנה-מידע", note: "S069/S070/S099" },
            { he: "בחירת-תקופה + מימד" },
            { he: "ניתוח/Drill-down" },
            { he: "(מותאם) MCSI" },
          ],
          mistakesHe: [
            "ניתוח ברמת-לוט (S068) כשהשאלה היא ברמת-מאפיין (S069).",
            "בניית מבנה-מותאם ללא Field-catalog מתאים.",
          ],
          troubleshootHe: [
            "מאפיין חסר בניתוח ➔ נבחר מבנה-לוט במקום מבנה-מאפיין.",
            "מבנה-מותאם ריק ➔ Update-Rules לא חוברו ל-S5xx.",
          ],
          bestPracticeHe: [
            "מפה מראש מימד-שאלה ➔ מבנה-מידע.",
            "השתמש ב-Flexible-Analyses (MCSI) רק לצרכים שהסטנדרט לא מכסה.",
          ],
          interviewHe: [
            { qHe: "מתי משתמשים ב-S069 לעומת S068?", aHe: "S068 לניתוח ברמת-לוט/חומר; S069 לניתוח ברמת-מאפיין-בדיקה (Inspection characteristic) — למשל אחוז-חריגה של pH או Brix." },
          ],
          takeawaysHe: [
            "מבני-מידע מרובים: S068 לוט, S069/S070 מאפיין, S099 UD.",
            "ניתן לבנות מבנים-מותאמים (MC21) + Flexible-Analysis.",
            "בחר מבנה לפי מימד-השאלה.",
          ],
        },
        {
          id: "18.2.5",
          titleHe: "ניתוח ABC",
          titleEn: "ABC Analysis",
          execHe:
            "ניתוח-ABC בתוך ה-LIS הוא פונקציה מובנית במנוע-ה-Standard-Analysis: היא מסווגת אוטומטית את אובייקטי-הניתוח ל-A/B/C לפי Key-Figure נבחר ו-Strategy, ומציגה Pareto-curve מצטבר — חזק יותר מ-ABC-ידני ב-ALV.",
          beginnerHe:
            "אותו רעיון של A/B/C מ-18.1.10, אבל כאן SAP עושה את זה אוטומטית בתוך הדוח: בוחרים מדד (למשל דחיות), והמערכת ממיינת ומסווגת ומציירת עקומת-Pareto.",
          consultantHe:
            "מתוך הניתוח: Edit ► ABC-Analysis. בוחרים Key-Figure ו-Strategy (Total-% / Number-% / Fixed-value), מגדירים גבולות A/B/C, ומקבלים סיווג + Cumulative-curve גרפית. ניתן לשלב עם Classification ו-Top-N. התוצאה ניתנת-לייצוא ולהזנת תהליכי-תעדוף (Source-inspection, QM-procurement-key).",
          purposeHe:
            "לתעדף אובייקטי-איכות (ספקים/חומרים/מאפיינים) לפי תרומתם, ישירות מתוך הדוח, עם הצגה-גרפית.",
          processExampleHe:
            "מהנדס מריץ ABC על Key-Figure 'דחיות' במבנה-ספק; קטגוריה-A (4 ספקים) מקבלת QM-procurement-key מחמיר ובדיקת-מקור.",
          cbcHe:
            "ב-CBC ABC על דחיות-לפי-ספק מסמן את ספקי-הפקקים והבקבוקים כ-A; הם נכנסים לתוכנית-ביקורת-ספק רבעונית.",
          navHe: [
            "ניתוח-סטנדרטי ► Edit ► ABC Analysis",
          ],
          tables: ["S068", "S070"],
          tcodes: ["MCXA", "MCVA"],
          fiori: ["F2332"],
          configHe: [
            "Strategy: Total-% / Number-% / Fixed-value.",
            "גבולות A/B/C + Key-Figure בסיס.",
            "Cumulative-curve graphic + Export.",
          ],
          flow: [
            { he: "ניתוח-בסיס", code: "MCXA" },
            { he: "Edit ► ABC", note: "בחירת-Strategy" },
            { he: "סיווג A/B/C + Pareto" },
            { he: "תעדוף + Source-inspection" },
          ],
          mistakesHe: [
            "Strategy לא-תואם לשאלה (Number-% כשרצוי Value).",
            "התעלמות מהצגת-ה-Cumulative-curve שמסבירה את הסיווג.",
          ],
          troubleshootHe: [
            "סיווג חד-צדדי ➔ גבולות לא-מכוילים לפילוג בפועל.",
            "ABC אפור ➔ Key-Figure לא-מספרי או חסר במבנה.",
          ],
          bestPracticeHe: [
            "התאם Strategy ל-Key-Figure (ערך→Total-%).",
            "השתמש ב-Cumulative-curve להצדקת-גבולות.",
          ],
          interviewHe: [
            { qHe: "במה ABC ב-LIS עדיף על ABC ידני ב-ALV?", aHe: "הוא מובנה במנוע-הניתוח: סיווג אוטומטי לפי Strategy וגבולות, Cumulative-Pareto-curve גרפית, ושילוב עם Classification/Top-N — בלי מיון-ידני." },
          ],
          takeawaysHe: [
            "ABC ב-LIS = פונקציה מובנית עם Strategy + Pareto-curve.",
            "מזין תעדוף ספקים/חומרים ל-Source-inspection.",
            "כייל גבולות לפי הפילוג בפועל.",
          ],
          relatedHe: [
            { labelHe: "QM · ניתוח ABC תפעולי (18.1.10)", href: "/library/qm/chapter-18/#sub-18.1.10" },
          ],
        },
        {
          id: "18.2.6",
          titleHe: "סדרת זמן",
          titleEn: "Time Series",
          execHe:
            "ניתוח-סדרת-זמן (Time-Series) מציג Key-Figure לאורך-תקופות-רצופות (יום/שבוע/חודש/רבעון) לזיהוי-מגמות, עונתיות וסחיפה. זו השכבה שהופכת תמונת-רגע למגמה — בסיס ל-SPC ולשיפור-מתמשך.",
          beginnerHe:
            "במקום מספר-אחד, אתה רואה גרף לאורך-זמן: איך אחוז-הדחייה השתנה חודש-אחר-חודש. כך מזהים אם המצב משתפר, מתדרדר, או 'קופץ' בעונה מסוימת.",
          consultantHe:
            "מתוך הניתוח: Edit ► Comparisons ► Time-Series (או בחירת Period-split בבחירה). מציג Key-Figure לאורך Periods עם אפשרות Previous-year-comparison, Planned/Actual, Forecast (Exponential-smoothing). משלים את ה-Control-Charts (SPC) של QM שמתמקדים במאפיין-בודד. Period-unit נקבע בבחירה (Posting-period/Week/Month).",
          purposeHe:
            "לזהות מגמות וסחיפה לאורך-זמן, להבדיל בין רעש-אקראי לשינוי-מערכתי, ולתמוך בקבלת-החלטות מבוססת-מגמה.",
          processExampleHe:
            "מנהל בוחן Time-Series של אחוז-דחיית-ספק ל-12 חודשים; עלייה-מתמדת מרבעון-3 מזוהה כמגמה ומובילה לביקורת-ספק.",
          cbcHe:
            "ב-CBC Time-Series של First-Pass-Yield שבועי לקו-מילוי מראה ירידה לאורך-הקיץ — נחקרת השפעת-טמפרטורה על תהליך-המילוי.",
          navHe: [
            "ניתוח-סטנדרטי ► Edit ► Comparisons ► Time Series",
          ],
          tables: ["S068", "S099"],
          tcodes: ["MCXA", "MCVA"],
          fiori: ["F2332", "F2334"],
          configHe: [
            "Period-unit: Day / Week / Month / Posting-period.",
            "Comparisons: Previous-year / Plan-Actual / Forecast.",
            "Forecast model (Constant/Trend/Seasonal — exponential-smoothing).",
          ],
          flow: [
            { he: "ניתוח-בסיס + Period-split", code: "MCXA" },
            { he: "Edit ► Time-Series" },
            { he: "בחירת-Comparison/Forecast" },
            { he: "זיהוי-מגמה ➔ פעולה" },
          ],
          mistakesHe: [
            "Period-unit לא-מתאים (חודש כשצריך שבוע) — מסתיר סחיפה.",
            "פירוש רעש-אקראי כמגמה בלי מספיק-נקודות.",
          ],
          troubleshootHe: [
            "סדרה 'שטוחה' מדי ➔ Period-unit גס מדי; הקטן ליום/שבוע.",
            "Forecast לא-סביר ➔ מודל-תחזית שגוי (Trend במקום Seasonal).",
          ],
          bestPracticeHe: [
            "בחר Period-unit לפי קצב-התהליך (שבוע למילוי).",
            "שלב Previous-year-comparison לנטרול-עונתיות.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין Time-Series ב-LIS ל-Control-Chart (SPC)?", aHe: "Time-Series מציג Key-Figure מצטבר לאורך-תקופות (מגמת-על); Control-Chart מציג ערכי-מדידה של מאפיין-בודד מול גבולות-בקרה (SPC). הראשון אסטרטגי, השני תהליכי." },
          ],
          takeawaysHe: [
            "Time-Series = מגמת Key-Figure לאורך-תקופות.",
            "תומך Previous-year, Plan-Actual ו-Forecast.",
            "משלים את Control-Charts (SPC) ברמת-המאפיין.",
          ],
          relatedHe: [
            { labelHe: "QM · ניהול תרשימי-בקרה (18.4.11)", href: "/library/qm/chapter-18/#sub-18.4.11" },
          ],
        },
      ],
    },
    // ============================================================ 18.3
    {
      id: "18.3",
      titleHe: "קוקפיט QM להערכות",
      titleEn: "QM Cockpit for Evaluations",
      execHe:
        "קוקפיט-ה-QM הוא מסך-בקרה מאוחד (Dashboard) המרכז מספר תצוגות-הערכה — לוטים, החלטות, הודעות ומדדים — בחלון-עבודה אחד עם Drill-down. הוא גשר בין הדיווח-הקלאסי לבין חוויית-ה-Dashboard המודרנית, ומשמש את מהנדס-האיכות כמרכז-עבודה יומי.",
      beginnerHe:
        "במקום לפתוח חמישה דוחות נפרדים, הקוקפיט מציג הכל במסך-אחד: רשימת-עבודה, מדדים, גרפים. לוחצים על מספר ו'צוללים' לפרטים. זה 'לוח-המחוונים' של מהנדס-האיכות.",
      consultantHe:
        "הקוקפיט מאגד Worklists, KPI-tiles ו-Analytics בתצוגה-אחת, לרוב מבוסס POWL (Personal-Object-Worklist) ב-NetWeaver-Business-Client או על Overview-Pages ב-Fiori. ב-S/4HANA המקבילה המודרנית היא Overview-Pages כמו Quality-Engineer-Overview (F2787) ו-Quality-Technician-Overview, הבנויות על CDS עם Smart-Business-KPIs. ניתן לפרסן (Personalize) Tiles, פילטרים ו-Cards. אינטגרציה עם Manage-Inspection-Lots ו-Manage-Quality-Tasks.",
      purposeHe:
        "לתת למהנדס/בודק מרכז-עבודה אחד עם נראות-מלאה (עבודה פתוחה + מדדים + מגמות), לקצר זמן-החלטה ולמנוע קפיצה בין עשרות מסכים.",
      processExampleHe:
        "מהנדס פותח את הקוקפיט בבוקר: Tile מראה 18 לוטים-ממתינים, KPI מראה אחוז-דחייה יומי, גרף מראה מגמה-שבועית. הוא לוחץ על ה-Tile, נכנס ל-Worklist, ומטפל בלוטים הדחופים — הכל מנקודה-אחת.",
      cbcHe:
        "ב-CBC קוקפיט-איכות במפעל-המילוי מציג פר-משמרת: אצוות-ממתינות-להחלטה, First-Pass-Yield, וחריגות-פתוחות; מנהל-המשמרת מנהל את כל יום-העבודה ממנו.",
      navHe: [
        "Fiori Launchpad ► Quality Management ► Quality Engineer Overview (F2787) / Quality Technician Overview",
        "NWBC ► Quality Management ► QM Cockpit / POWL",
      ],
      tables: ["QALS", "QAVE", "QMEL"],
      tcodes: ["QGP1", "—"],
      fiori: ["F2787", "F2786", "F2424"],
      configHe: [
        "Overview-Page configuration (Fiori): Cards, KPIs, Filters — דרך Manage-KPIs ו-App-Configuration.",
        "POWL-query definition (NWBC): קריטריונים ועמודות לרשימות-העבודה.",
        "Personalization: סידור-Tiles, פילטרי-ברירת-מחדל, Variants פר-משתמש.",
      ],
      flow: [
        { he: "פתיחת קוקפיט/Overview", code: "F2787" },
        { he: "סקירת KPI-Tiles + גרפים" },
        { he: "לחיצה על Tile ➔ Worklist" },
        { he: "טיפול בלוט/הודעה", note: "Drill-down" },
        { he: "חזרה לקוקפיט" },
      ],
      mistakesHe: [
        "אי-פרסון (Personalize) — הקוקפיט מציג נתונים לא-רלוונטיים לתפקיד.",
        "הסתמכות על KPI-Tiles בלי לבדוק את ה-Drill-down (מספר-על מטעה).",
      ],
      troubleshootHe: [
        "Tile ריק/0 ➔ פילטר-ברירת-מחדל חוסם נתונים, או CDS/KPI לא-מוקצה.",
        "Drill-down נכשל ➔ Navigation-target (target-mapping) לא מוגדר ב-Launchpad.",
      ],
      bestPracticeHe: [
        "פרסן את הקוקפיט לתפקיד (Technician מול Engineer).",
        "תמיד אמת KPI ב-Drill-down לפני-פעולה.",
        "ב-S/4HANA העדף Overview-Pages (F2787) על POWL-ישן.",
      ],
      interviewHe: [
        { qHe: "מהו קוקפיט-QM ובמה הוא שונה מדוח-בודד?", aHe: "מסך-בקרה מאוחד המאגד Worklists, KPIs ו-Analytics עם Drill-down בחלון-אחד — לעומת דוח-בודד שמכסה מימד-יחיד. ב-S/4HANA ממומש כ-Overview-Page מבוסס-CDS." },
        { qHe: "מה החליף את קוקפיט-ה-POWL הישן ב-S/4HANA?", aHe: "Overview-Pages של Fiori (Quality-Engineer/Technician-Overview, F2787) הבנויות על CDS עם Smart-Business-KPIs ו-Cards מפורסנים." },
      ],
      takeawaysHe: [
        "הקוקפיט = מרכז-עבודה מאוחד (Worklists+KPIs+Analytics).",
        "S/4HANA: Overview-Pages מבוססות-CDS (F2787).",
        "פרסן לתפקיד ואמת תמיד ב-Drill-down.",
      ],
      relatedHe: [
        { labelHe: "QM · Quality Engineer Overview (18.4.6)", href: "/library/qm/chapter-18/#sub-18.4.6" },
        { labelHe: "QM · Quality Technician Overview (18.4.5)", href: "/library/qm/chapter-18/#sub-18.4.5" },
      ],
    },
    // ============================================================ 18.4
    {
      id: "18.4",
      titleHe: "אפליקציות SAP Fiori",
      titleEn: "SAP Fiori Applications",
      execHe:
        "שכבת-ה-Fiori היא העתיד של דיווח-QM ב-S/4HANA: עשרות אפליקציות מבוססות-CDS ו-Embedded-Analytics המחליפות את מסכי-ה-GUI הקלאסיים ואת LIS. הן מתחלקות לשלוש משפחות — תפעוליות (Manage/Record/Process), Overview-Pages לתפקיד, ואנליטיות (Analytics) עם Drill-down אינטראקטיבי בזמן-אמת מול HANA. שליטה בהן היא חובה לכל פרויקט-S/4HANA חדש.",
      beginnerHe:
        "Fiori הוא הממשק החדש והנוח של SAP — אפליקציות בדפדפן עם אריחים (Tiles), גרפים אינטראקטיביים וחיפוש-חכם. במקום קודי-עסקה מסובכים, אתה לוחץ על אריח. בפרק זה נסקור את כל אפליקציות-ה-QM החשובות לדיווח ולעבודה יומית.",
      consultantHe:
        "אפליקציות-QM-Fiori בנויות על Virtual-Data-Model (VDM) של CDS-Views (I_InspectionLot, C_InspectionLotAnalytics וכו'). שלושה ארכיטיפים: Transactional (SAPUI5+OData), Analytical (Analytical-List-Page / Overview-Page מול Analytic-CDS+Smart-Business), ו-Fact-Sheets. הן רצות מ-Fiori-Launchpad עם Catalogs/Groups/Roles (PFCG-business-roles). ה-Analytics-apps תומכות Drill-down, Filters, Visual-Filters ו-Export — בזמן-אמת מול HANA בלי Statistical-Setup. רבות חלקן 'app-name'-בלבד ללא T-Code קלאסי (לכן tcodes='—').",
      purposeHe:
        "להעביר את QM לחוויית-משתמש מודרנית, מבוססת-תפקיד, עם אנליטיקה-בזמן-אמת ישירות מול HANA — ולמחוק את הצורך ב-LIS-Setup ובמסכי-GUI מורכבים.",
      processExampleHe:
        "מהנדס פותח Launchpad, רואה את ה-Overview-שלו, לוחץ על Inspection-Lot-Analytics, מסנן ויזואלית לפי מפעל, עושה Drill-down מ-חומר ל-ספק — והכל בזמן-אמת מול HANA, בלי דוח-רקע.",
      cbcHe:
        "ב-CBC כל תפקיד-איכות מקבל Business-Role ב-Launchpad: בודק-הקו רואה Record-Results, מהנדס רואה Analytics, מנהל רואה Supplier-Evaluation — חוויה אחידה בדפדפן ובטאבלט על הקו.",
      navHe: [
        "Fiori Launchpad ► Quality Management (Business Roles: SAP_BR_QUALITY_TECHNICIAN / SAP_BR_QUALITY_ENGINEER)",
        "Fiori Launchpad ► Quality Management ► Analytics / Inspection Processing groups",
      ],
      tables: ["QALS", "QAMR", "QAVE", "QMEL"],
      tcodes: ["—"],
      fiori: ["F2424", "F2787", "F2786", "F2332", "F2334"],
      configHe: [
        "Business-Roles (PFCG SAP_BR_QUALITY_*) + Catalogs/Groups ב-Launchpad-Content-Manager.",
        "CDS-VDM activation + Smart-Business KPIs/Evaluations.",
        "Front-end (Gateway/Embedded) + OData-service activation (/IWFND/MAINT_SERVICE).",
      ],
      flow: [
        { he: "כניסה ל-Launchpad", note: "Business-Role" },
        { he: "בחירת-אפליקציה", note: "Tile" },
        { he: "Smart-Filter / Visual-Filter" },
        { he: "Drill-down בזמן-אמת", note: "HANA/CDS" },
        { he: "פעולה / Export" },
      ],
      mistakesHe: [
        "ציפייה ל-T-Code לכל אפליקציה — רבות הן app-name בלבד.",
        "OData-service לא-מופעל — האריח 'ריק' או שגיאת-Fetch.",
        "Business-Role חסר — אפליקציות לא מופיעות ב-Launchpad.",
      ],
      troubleshootHe: [
        "אריח לא נטען ➔ הפעל OData-service (/IWFND/MAINT_SERVICE) ובדוק Catalog-assignment.",
        "אין נתונים ב-Analytics ➔ CDS-View לא-מופעל או הרשאה-אנליטית חסרה.",
        "אפליקציה חסרה ➔ Business-Role/Catalog לא הוקצה למשתמש.",
      ],
      bestPracticeHe: [
        "הקצה Business-Roles סטנדרטיות (SAP_BR_QUALITY_*) כבסיס, ופרסן מעליהן.",
        "העדף Analytics-Fiori על LIS לפרויקטים-חדשים (זמן-אמת, ללא-Setup).",
        "תכנן Launchpad-Spaces/Pages לפי תפקיד.",
      ],
      interviewHe: [
        { qHe: "מה היתרון של QM-Analytics-Fiori על LIS?", aHe: "Drill-down בזמן-אמת ישירות מול HANA דרך CDS — בלי טבלאות-S* מצטברות ובלי Statistical-Setup, עם חוויית-משתמש מודרנית מבוססת-תפקיד." },
        { qHe: "למה לאפליקציות-Fiori רבות אין T-Code?", aHe: "הן מזוהות ב-Launchpad ב-App-ID (Fiori-ID, למשל F2424) ולא ב-Transaction-code; ההפעלה דרך Catalog/Tile ולא דרך שדה-פקודה קלאסי." },
      ],
      takeawaysHe: [
        "Fiori = שכבת-הדיווח המודרנית של QM (CDS/Embedded-Analytics).",
        "שלושה ארכיטיפים: Transactional / Analytical / Overview.",
        "זמן-אמת מול HANA, מבוסס-תפקיד, ללא LIS-Setup.",
      ],
      relatedHe: [
        { labelHe: "QM · ניתוחים סטנדרטיים LIS (18.2)", href: "/library/qm/chapter-18/#sub-18.2" },
        { labelHe: "QM · קוקפיט QM (18.3)", href: "/library/qm/chapter-18/#sub-18.3" },
      ],
      children: [
        {
          id: "18.4.1",
          titleHe: "אנליטיקת לוטי-בדיקה",
          titleEn: "Inspection Lot Analytics",
          execHe:
            "אפליקציה אנליטית המציגה סקירת-על של לוטי-בדיקה עם KPIs (מספר-לוטים, אחוז-דחייה, lots-overdue) ו-Drill-down אינטראקטיבי לפי מפעל/חומר/ספק/Type — בזמן-אמת מול HANA.",
          beginnerHe:
            "אריח שמראה תמונת-מצב של כל הבדיקות: כמה פתוחות, כמה נדחו, איפה הצוואר-בקבוק. לוחצים וצוללים פנימה לפי כל חתך.",
          consultantHe:
            "Analytical-List-Page (ALP) מעל Analytic-CDS (C_InspectionLotAnalytics / I_InspectionLot). תומך Visual-Filters, Charts (Bar/Donut), Drill-down ו-Export. מחליף ניתוחי-LIS S068. נדרשת הרשאה-אנליטית ו-OData פעיל.",
          purposeHe:
            "לתת תמונת-על מיידית של מצב-הבדיקות ולאתר חתכים-בעייתיים בלי דוח-רקע או Setup.",
          processExampleHe:
            "מהנדס מסנן ויזואלית לחודש-נוכחי, רואה ש-Inspection-Type 01 מוביל בדחיות, וצולל ל-ספק הבעייתי בלחיצה.",
          cbcHe:
            "ב-CBC מנהל-מפעל רואה את אחוז-הדחייה לפי קו-מילוי בזמן-אמת ומזהה קו עם עלייה חריגה במהלך-המשמרת.",
          navHe: ["Fiori Launchpad ► Quality Management ► Analytics ► Inspection Lot Analytics"],
          tables: ["QALS"],
          tcodes: ["—"],
          fiori: ["F2332"],
          configHe: ["Analytic-CDS activation + Smart-Business KPI.", "Visual-Filter + Chart configuration ב-ALP."],
          flow: [
            { he: "פתיחת Analytics", code: "F2332" },
            { he: "Visual-Filter", note: "מפעל/Type" },
            { he: "Chart + KPI" },
            { he: "Drill-down ➔ ספק/חומר" },
          ],
          mistakesHe: ["ערבוב תקופות בלי Date-filter.", "פירוש KPI בלי Drill-down."],
          troubleshootHe: ["אין נתונים ➔ CDS לא-פעיל/הרשאה-אנליטית.", "Chart ריק ➔ פילטר חוסם."],
          bestPracticeHe: ["התחל מ-Visual-Filter ואז Drill-down.", "ייצא ל-Excel לשיתוף."],
          interviewHe: [{ qHe: "על מה בנויה Inspection-Lot-Analytics?", aHe: "על Analytical-List-Page מעל Analytic-CDS (I_InspectionLot) עם Visual-Filters ו-Drill-down בזמן-אמת מול HANA — מחליפה ניתוחי-LIS S068." }],
          takeawaysHe: ["סקירת-על אנליטית של לוטים בזמן-אמת.", "ALP+CDS, Visual-Filters, Drill-down.", "מחליפה LIS S068."],
        },
        {
          id: "18.4.2",
          titleHe: "היסטוריית רמת-איכות",
          titleEn: "Quality Level History",
          execHe:
            "אפליקציה המציגה את התפתחות רמת-האיכות (Quality-Level) של חומר/ספק לאורך-זמן — בסיס ל-Dynamic-Modification (הקלה/החמרה בבדיקה) ולמעקב-מגמה של אמינות-ספק.",
          beginnerHe:
            "מראה את ה'היסטוריה הרפואית' של חומר: האם הוא היה אמין לאורך-זמן. אם כן — בודקים אותו פחות; אם לא — מחמירים.",
          consultantHe:
            "מבוססת על Quality-Level (QDQL) ו-Dynamic-Modification-Rule. מציגה Stage-history (Skip/Tightened/Normal) ומעברים. CDS-based, תומכת Drill-down ל-לוטים שגרמו-למעבר. קשורה ל-Manage-Quality-Levels (18.4.9).",
          purposeHe:
            "לנמק ולתעד את רמת-הבדיקה הנוכחית (Skip-Lot/Reduced/Tightened) ולספק שקיפות למבדק-לקוח/רגולציה.",
          processExampleHe:
            "מהנדס בוחן את היסטוריית רמת-האיכות של חומר; שתי-דחיות-רצופות החזירו אותו מ-Skip ל-Tightened — מתועד ומוצדק.",
          cbcHe:
            "ב-CBC ספק-תרכיז עם רצף-תקין הועבר ל-Skip-Lot; ההיסטוריה מתעדת מתי ולמה, לצורך מבדק-איכות-לקוח.",
          navHe: ["Fiori Launchpad ► Quality Management ► Quality Level History"],
          tables: ["QDQL", "QDPS"],
          tcodes: ["—"],
          fiori: ["F2330"],
          configHe: ["Dynamic-Modification-Rule (SPRO).", "Quality-Level CDS + history-view."],
          flow: [
            { he: "בחירת חומר/ספק" },
            { he: "תצוגת Stage-history", note: "Skip/Normal/Tightened" },
            { he: "Drill-down ללוט-מעבר" },
          ],
          mistakesHe: ["שינוי-ידני של Quality-Level בלי תיעוד-סיבה.", "התעלמות מ-Inspection-Severity הנגזרת."],
          troubleshootHe: ["רמה לא-משתנה ➔ Dynamic-Modification-Rule שגוי או נקודת-מודיפיקציה לא-מתאימה.", "היסטוריה ריקה ➔ Quality-Level לא-קיים לחומר."],
          bestPracticeHe: ["נהל Severity דרך Rule, לא ידנית.", "השתמש בהיסטוריה כראיה במבדקים."],
          interviewHe: [{ qHe: "מה הקשר בין Quality-Level-History ל-Dynamic-Modification?", aHe: "ההיסטוריה מתעדת את מעברי-ה-Stage (Skip/Normal/Tightened) שה-Dynamic-Modification-Rule מחולל לפי תוצאות-בדיקה — שקיפות מלאה להקלה/החמרה." }],
          takeawaysHe: ["מעקב התפתחות רמת-איכות לאורך-זמן.", "בסיס ל-Dynamic-Modification ולמבדקים.", "Drill-down ללוטי-המעבר."],
          relatedHe: [{ labelHe: "QM · Manage Quality Levels (18.4.9)", href: "/library/qm/chapter-18/#sub-18.4.9" }],
        },
        {
          id: "18.4.3",
          titleHe: "רישום תוצאות בדיקה",
          titleEn: "Record Inspection Results",
          execHe:
            "אפליקציה תפעולית לרישום ערכי-מדידה ותוצאות-הערכה למאפייני-בדיקה ישירות מהדפדפן/טאבלט — מחליפת QE51N לבודק-הקו, עם ולידציה מול גבולות-מפרט בזמן-אמת.",
          beginnerHe:
            "כאן הבודק מקליד את תוצאות-המדידה: pH=3.2, נפח=330ml. המערכת מיד אומרת אם זה בתוך-הטווח (ירוק) או חורג (אדום).",
          consultantHe:
            "SAPUI5+OData מעל QAMR/QASR. מציגה את ה-Inspection-Plan/Characteristics, מאפשרת רישום-כמותי/איכותי, Defect-recording, וניווט-לוט-הבא. ולידציה מול QPMK/Spec-limits. גרסה ראשונה של שתי-אפליקציות-תאומות (ראה 18.4.12). מותאמת-מובייל.",
          purposeHe:
            "להעביר את רישום-התוצאות לרצפה/מעבדה בממשק-מגע פשוט, להאיץ ולהפחית-טעויות-תמלול.",
          processExampleHe:
            "בודק-מעבדה פותח את הלוט, מקליד pH ו-Brix; חריגה מסומנת-אדום ומחייבת רישום-פגם לפני המשך.",
          cbcHe:
            "ב-CBC בודק-קו רושם על טאבלט את נפח-המילוי וה-CO2 לכל דגימת-שעה; חריגה מפעילה התראה מיידית לעצירת-הקו.",
          navHe: ["Fiori Launchpad ► Quality Management ► Inspection Processing ► Record Inspection Results"],
          tables: ["QAMR", "QASR", "QPMK"],
          tcodes: ["—"],
          fiori: ["F2757"],
          configHe: ["Inspection-Plan + Characteristics (Spec-limits).", "Mobile-enabled tile + OData service."],
          flow: [
            { he: "בחירת לוט/פעולה" },
            { he: "רישום ערכי-מדידה", note: "כמותי/איכותי" },
            { he: "ולידציה מול מפרט", note: "ירוק/אדום" },
            { he: "Defect-recording (חריגה)" },
            { he: "שמירה ➔ לוט-הבא" },
          ],
          mistakesHe: ["רישום בלי יחידת-מידה נכונה.", "התעלמות מסימון-חריגה-אדום."],
          troubleshootHe: ["ערך נדחה ➔ מחוץ-לגבולות-מפרט (QPMK).", "מאפיין חסר ➔ Inspection-Plan לא-מוקצה."],
          bestPracticeHe: ["השתמש בטאבלט ברצפה לזמן-אמת.", "אכוף Defect-recording על חריגות."],
          interviewHe: [{ qHe: "מה מחליפה Record-Inspection-Results ב-Fiori?", aHe: "את QE51N הקלאסית — רישום-תוצאות מבוסס-מגע/מובייל מעל QAMR עם ולידציה מול גבולות-מפרט (QPMK) בזמן-אמת." }],
          takeawaysHe: ["רישום-תוצאות מובייל מחליף QE51N.", "ולידציה מול מפרט בזמן-אמת.", "אוכף Defect-recording על חריגות."],
          relatedHe: [{ labelHe: "QM · Record Inspection Results (18.4.12)", href: "/library/qm/chapter-18/#sub-18.4.12" }],
        },
        {
          id: "18.4.4",
          titleHe: "היסטוריית תוצאות",
          titleEn: "Results History",
          execHe:
            "אפליקציה המציגה את היסטוריית ערכי-המדידה של מאפיין-בדיקה לאורך-לוטים — בסיס לזיהוי-מגמות, סחיפת-תהליך ו-SPC ברמת-המאפיין הבודד.",
          beginnerHe:
            "גרף של מדידה אחת (למשל pH) לאורך-הרבה-בדיקות. רואים אם הערך 'נודד' לכיוון-גבול לפני שהוא חורג בפועל.",
          consultantHe:
            "CDS מעל QAMR (Results) עם trend-line ו-spec-limits. תומך בחירת-מאפיין, חומר ותקופה. בסיס-ויזואלי ל-Process-Capability ול-Control-Charts (18.4.11). מאפשר Export לניתוח-סטטיסטי.",
          purposeHe:
            "לזהות סחיפת-תהליך מוקדם (לפני-דחייה) ולתמוך בשיפור-מתמשך מבוסס-נתוני-מדידה.",
          processExampleHe:
            "מהנדס בוחן את היסטוריית-ה-Brix; מגמת-עלייה איטית מתקרבת לגבול-עליון — התהליך מכויל לפני-חריגה.",
          cbcHe:
            "ב-CBC היסטוריית-CO2 לאורך-משמרות מגלה ירידה-הדרגתית בקרבונציה — תחזוקת-מערכת-ה-CO2 מתוזמנת מראש.",
          navHe: ["Fiori Launchpad ► Quality Management ► Results History"],
          tables: ["QAMR", "QASE"],
          tcodes: ["—"],
          fiori: ["F2758"],
          configHe: ["Characteristic-selection + Spec-limits display.", "Trend-line + Export."],
          flow: [
            { he: "בחירת מאפיין/חומר" },
            { he: "תצוגת trend לאורך-לוטים" },
            { he: "השוואה מול spec-limits" },
            { he: "זיהוי-סחיפה ➔ פעולה" },
          ],
          mistakesHe: ["ניתוח-מגמה על מעט-מדי נקודות.", "התעלמות מ-spec-limits בגרף."],
          troubleshootHe: ["אין מגמה ➔ מאפיין לא-כמותי או מעט-נתונים.", "ערכים-חסרים ➔ לוטים בלי-רישום-תוצאות."],
          bestPracticeHe: ["נטר מאפיינים-קריטיים לסחיפה.", "פעל מוקדם — לפני-חריגה בפועל."],
          interviewHe: [{ qHe: "כיצד Results-History תומך ב-SPC?", aHe: "הוא מציג ערכי-מדידה של מאפיין-בודד לאורך-לוטים מול גבולות-מפרט, ומאפשר זיהוי-סחיפה מוקדם — הבסיס ל-Control-Charts ו-Process-Capability." }],
          takeawaysHe: ["היסטוריית-מדידה ברמת-המאפיין.", "מזהה סחיפה לפני-חריגה.", "בסיס ל-SPC ו-Control-Charts."],
          relatedHe: [{ labelHe: "QM · Manage Control Charts (18.4.11)", href: "/library/qm/chapter-18/#sub-18.4.11" }],
        },
        {
          id: "18.4.5",
          titleHe: "סקירת טכנאי איכות",
          titleEn: "Quality Technician Overview",
          execHe:
            "Overview-Page המותאמת לבודק/טכנאי-איכות: מרכזת את העבודה-הפתוחה שלו (לוטים-לרישום, משימות, חריגות) ב-Cards עם פעולות-ישירות — מרכז-העבודה היומי של הבודק.",
          beginnerHe:
            "'דף-הבית' של הבודק: רואה את כל מה שצריך לעשות היום — אילו בדיקות לרשום, אילו משימות פתוחות — ולוחץ ישר לפעולה.",
          consultantHe:
            "Overview-Page מבוססת-CDS עם Cards: Open-inspection-lots, Results-to-record, Quality-tasks, Defects. כל Card מנווט לאפליקציה-תפעולית (Record-Results/Process-Tasks). Business-Role SAP_BR_QUALITY_TECHNICIAN. מפורסנת לפי-משתמש.",
          purposeHe:
            "לתת לבודק תמונת-עבודה אחת מבוססת-תפקיד עם ניווט-ישיר לפעולה — בלי לחפש בין מסכים.",
          processExampleHe:
            "בודק נכנס בבוקר, Card מראה 12 בדיקות-לרישום, לוחץ, ונכנס ישר ל-Record-Results לטיפול-ברצף.",
          cbcHe:
            "ב-CBC בודק-משמרת רואה ב-Overview את כל דגימות-הקו שממתינות-לרישום ואת החריגות-הפתוחות של המשמרת.",
          navHe: ["Fiori Launchpad ► Quality Management ► Quality Technician Overview (Role: SAP_BR_QUALITY_TECHNICIAN)"],
          tables: ["QALS", "QAMR", "QMEL"],
          tcodes: ["—"],
          fiori: ["F2786"],
          configHe: ["Overview-Page Cards + Navigation-targets.", "Business-Role SAP_BR_QUALITY_TECHNICIAN.", "Personalization פר-משתמש."],
          flow: [
            { he: "כניסה ל-Overview", code: "F2786" },
            { he: "סקירת Cards", note: "Lots/Tasks/Defects" },
            { he: "לחיצה ➔ אפליקציה-תפעולית" },
            { he: "טיפול וחזרה" },
          ],
          mistakesHe: ["אי-פרסון — Cards לא-רלוונטיים.", "התעלמות מ-Card-החריגות."],
          troubleshootHe: ["Card ריק ➔ פילטר/הרשאה.", "Navigation נכשל ➔ target-mapping חסר."],
          bestPracticeHe: ["פרסן Cards לתפקיד-הבודק.", "התחל-יום מה-Overview."],
          interviewHe: [{ qHe: "במה Technician-Overview שונה מ-Engineer-Overview?", aHe: "הטכנאי ממוקד-ביצוע (לוטים-לרישום, משימות-לביצוע), בעוד המהנדס ממוקד-ניתוח-והחלטה (KPIs, החלטות-שימוש, מגמות) — שתיהן Overview-Pages מבוססות-תפקיד." }],
          takeawaysHe: ["Overview של הבודק — עבודה-פתוחה ב-Cards.", "ניווט-ישיר לפעולה תפעולית.", "Role: SAP_BR_QUALITY_TECHNICIAN."],
          relatedHe: [{ labelHe: "QM · Quality Engineer Overview (18.4.6)", href: "/library/qm/chapter-18/#sub-18.4.6" }],
        },
        {
          id: "18.4.6",
          titleHe: "סקירת מהנדס איכות",
          titleEn: "Quality Engineer Overview",
          execHe:
            "Overview-Page למהנדס-האיכות: משלבת KPIs-אנליטיים (אחוז-דחייה, lots-overdue, ספקים-חלשים) עם Worklists של החלטות-שימוש והודעות — מרכז-ההחלטה והניתוח של המהנדס.",
          beginnerHe:
            "'דף-הבית' של המהנדס: גם מדדים וגרפים (איך האיכות), וגם רשימות-החלטה (מה צריך לאשר). שילוב של ניתוח ופעולה.",
          consultantHe:
            "Overview-Page מבוססת-CDS עם Analytic-Cards (KPI/Chart) + List-Cards (UD-pending, Notifications, Overdue-lots). Business-Role SAP_BR_QUALITY_ENGINEER. ניווט ל-Manage-Usage-Decisions, Inspection-Lot-Analytics ו-Supplier-Evaluation.",
          purposeHe:
            "לתת למהנדס נראות-מלאה (מגמות+עבודה) ולקצר-זמן-החלטה — אנליטיקה ופעולה במסך-אחד.",
          processExampleHe:
            "מהנדס רואה KPI-דחייה-עולה, צולל ל-Analytics לאיתור-הספק, ומשם ל-UD-Worklist לטיפול-בלוטים-התקועים.",
          cbcHe:
            "ב-CBC מהנדס-מפעל רואה את First-Pass-Yield, ספקי-A-הבעייתיים, ואת אצוות-המשקה-הממתינות-להחלטה — הכל בדף-אחד.",
          navHe: ["Fiori Launchpad ► Quality Management ► Quality Engineer Overview (Role: SAP_BR_QUALITY_ENGINEER)"],
          tables: ["QALS", "QAVE", "QMEL"],
          tcodes: ["—"],
          fiori: ["F2787"],
          configHe: ["Analytic + List Cards (KPI/UD/Notifications).", "Business-Role SAP_BR_QUALITY_ENGINEER.", "Smart-Business KPI thresholds."],
          flow: [
            { he: "כניסה ל-Overview", code: "F2787" },
            { he: "KPI-Cards + Charts" },
            { he: "Drill-down / List-Card" },
            { he: "ניווט ל-UD/Analytics/Supplier" },
          ],
          mistakesHe: ["הסתמכות על KPI בלי Drill-down.", "התעלמות מ-Overdue-lots-Card."],
          troubleshootHe: ["KPI=0 ➔ CDS/threshold לא-מוגדר.", "Card-ריק ➔ הרשאה-אנליטית חסרה."],
          bestPracticeHe: ["הגדר KPI-thresholds משמעותיים.", "נווט מ-KPI ל-Worklist ברצף-אחד."],
          interviewHe: [{ qHe: "מה מאפיין את Engineer-Overview?", aHe: "שילוב Analytic-Cards (KPIs/Charts בזמן-אמת) עם List-Cards של עבודה (UD-pending, Notifications) — מרכז ניתוח-והחלטה למהנדס, מבוסס SAP_BR_QUALITY_ENGINEER." }],
          takeawaysHe: ["Overview של המהנדס — אנליטיקה + עבודה.", "KPI-Cards + UD/Notification-Worklists.", "Role: SAP_BR_QUALITY_ENGINEER."],
          relatedHe: [{ labelHe: "QM · קוקפיט QM (18.3)", href: "/library/qm/chapter-18/#sub-18.3" }],
        },
        {
          id: "18.4.7",
          titleHe: "ניהול החלטות שימוש",
          titleEn: "Manage Usage Decisions",
          execHe:
            "אפליקציה תפעולית לקבלת/דחייה של לוטים (Usage-Decision) — בודדת או המונית — עם תצוגת-תוצאות, קודי-UD, ופוסטינג-מלאי נגזר. מחליפת QA11/QA12 בממשק-מודרני.",
          beginnerHe:
            "כאן מחליטים: האצווה עוברת או נדחית. בוחרים קוד-החלטה ('A'=קבלה), והמלאי זז אוטומטית למלאי-חופשי או לחסום.",
          consultantHe:
            "SAPUI5+OData מעל QAVE. תומך Mass-UD על worklist, Catalog-codes (Selected-set), Stock-posting (To-unrestricted/Blocked/Scrap/Sample), ו-Follow-up-actions. מחליפה QA11. ולידציה: לא ניתן UD בלי-רישום-תוצאות-חובה.",
          purposeHe:
            "לסגור את מחזור-הבדיקה בהחלטה-מתועדת ולהניע את פוסטינג-המלאי, ביעילות-המונית.",
          processExampleHe:
            "מהנדס מסמן 15 לוטים-שעברו, בוחר UD-code 'A', והמלאי עובר אוטומטית ל-unrestricted — בפעולה-אחת.",
          cbcHe:
            "ב-CBC החלטת-שימוש על אצוות-משקה משחררת אותן למלאי-מכירה; אצווה-דחויה מנותבת ל-Blocked לבדיקה-חוזרת/השמדה.",
          navHe: ["Fiori Launchpad ► Quality Management ► Inspection Processing ► Manage Usage Decisions"],
          tables: ["QAVE", "QALS"],
          tcodes: ["—"],
          fiori: ["F2731"],
          configHe: ["UD-Catalog (Selected-set) + Code-groups.", "Stock-posting-rules + Follow-up-actions.", "Mass-UD enablement."],
          flow: [
            { he: "בחירת לוטים", note: "בודד/המוני" },
            { he: "בחירת UD-code", note: "A/R" },
            { he: "Stock-posting", note: "Unrestricted/Blocked" },
            { he: "Follow-up-action" },
            { he: "סגירת-לוט" },
          ],
          mistakesHe: ["UD המוני בלי-בדיקת-תוצאות.", "Stock-posting שגוי (Unrestricted במקום Blocked)."],
          troubleshootHe: ["UD חסום ➔ תוצאות-חובה חסרות.", "מלאי לא-זז ➔ Stock-posting-rule/inspection-stock לא-תקין."],
          bestPracticeHe: ["אמת-תוצאות לפני UD-המוני.", "תקנן UD-Catalog ו-Follow-up-actions."],
          interviewHe: [{ qHe: "מה מפעילה החלטת-שימוש מבחינת-מלאי?", aHe: "פוסטינג-מלאי-נגזר: העברה מ-Quality-Inspection-Stock ל-Unrestricted/Blocked/Scrap/Sample לפי קוד-ה-UD ו-Stock-posting-rules, וכן Follow-up-Actions." }],
          takeawaysHe: ["UD סוגר את מחזור-הבדיקה (מחליף QA11).", "תומך Mass-UD ו-Stock-posting אוטומטי.", "דורש תוצאות-חובה לפני-החלטה."],
        },
        {
          id: "18.4.8",
          titleHe: "ניהול לוטי-בדיקה",
          titleEn: "Manage Inspection Lots",
          execHe:
            "אפליקציית-הליבה התפעולית לניהול-לוטים: בחירה, סינון-חכם, תצוגת-סטטוס וניווט לכל-פעולה (Results/UD/Print) — המקבילה המודרנית של QA32, מבוססת-CDS ו-Smart-Filter-Bar.",
          beginnerHe:
            "זו ה-QA32 החדשה: רשימת-לוטים בדפדפן עם חיפוש-חכם וסטטוס-צבעוני. משם נכנסים לרשום-תוצאות או להחליט-החלטה.",
          consultantHe:
            "List-Report-Object-Page מעל I_InspectionLot עם Smart-Filter-Bar, Variant-Management (My-Views), Export, ו-Navigation ל-Object-Page-לוט ולאפליקציות-תפעוליות. מחליפה QA32/QA33. תומכת Multi-select-actions ו-Personalization.",
          purposeHe:
            "לתת את חוויית-ה-Worklist המודרנית — בחירה-וניהול-לוטים בדפדפן עם ביצועי-HANA ו-UX-מתקדם.",
          processExampleHe:
            "בודק מסנן ב-Smart-Filter למפעל+Type+'פתוח', שומר My-View, ונכנס ל-Object-Page של לוט לרישום-תוצאות.",
          cbcHe:
            "ב-CBC הבודק מנהל את כל לוטי-המשמרת מ-Manage-Inspection-Lots על טאבלט, עם My-View לקו-שלו.",
          navHe: ["Fiori Launchpad ► Quality Management ► Inspection Processing ► Manage Inspection Lots"],
          tables: ["QALS", "QAVE"],
          tcodes: ["—"],
          fiori: ["F2424"],
          configHe: ["Smart-Filter-Bar fields + Variant (My-Views).", "Object-Page navigation-targets.", "Multi-select-actions enablement."],
          flow: [
            { he: "פתיחה + Smart-Filter", code: "F2424" },
            { he: "שמירת My-View" },
            { he: "בחירת-לוט ➔ Object-Page" },
            { he: "פעולה", note: "Results/UD/Print" },
          ],
          mistakesHe: ["אי-שימוש ב-My-Views — חזרה על-סינון.", "ערבוב פעולות-המוניות בלי-סימון-נכון."],
          troubleshootHe: ["רשימה ריקה ➔ Smart-Filter חוסם/הרשאה.", "פעולה אפורה ➔ הרשאה/סטטוס-לוט."],
          bestPracticeHe: ["שמור My-Views פר-תפקיד.", "העדף F2424 על QA32 ב-S/4HANA."],
          interviewHe: [{ qHe: "מה מחליפה Manage-Inspection-Lots?", aHe: "את QA32/QA33 — List-Report מעל I_InspectionLot עם Smart-Filter-Bar, My-Views, ניווט-Object-Page ופעולות-המוניות, בביצועי-HANA." }],
          takeawaysHe: ["Manage-Inspection-Lots = QA32 מודרנית (F2424).", "Smart-Filter + My-Views + Object-Page.", "ליבת-העבודה התפעולית ב-Fiori."],
          relatedHe: [{ labelHe: "QM · בחירת לוט-בדיקה (18.1.1)", href: "/library/qm/chapter-18/#sub-18.1.1" }],
        },
        {
          id: "18.4.9",
          titleHe: "ניהול רמות איכות",
          titleEn: "Manage Quality Levels",
          execHe:
            "אפליקציה לתחזוקת Quality-Levels של חומר/ספק — הצגה, יצירה ואיפוס של רמת-הבדיקה (Inspection-Stage: Skip/Reduced/Normal/Tightened) שמניעה את ה-Dynamic-Modification בבדיקה הבאה.",
          beginnerHe:
            "כאן רואים ומנהלים 'כמה לבדוק' כל חומר: אם הוא אמין — Skip (לדלג), אם בעייתי — Tightened (להחמיר). אפשר גם לאפס ידנית.",
          consultantHe:
            "List-Report מעל QDQL/QDPS. מציג Stage נוכחי, ספירת-לוטים-עד-מעבר, ותאריך-תוקף. תומך Reset ו-manual-stage-set. מוזן מ-Dynamic-Modification-Rule (QDP*). מקושר ל-Quality-Level-History (18.4.2). מחליף QDL1/QDL2/QDL3.",
          purposeHe:
            "לשלוט בעוצמת-הבדיקה פר-חומר/ספק לפי ביצועי-עבר — להקל על אמינים ולהחמיר על בעייתיים, באופן-מתועד.",
          processExampleHe:
            "מהנדס מאפס Quality-Level של חומר אחרי-שינוי-ספק כדי להתחיל מ-Normal-stage ולבנות-אמון מחדש.",
          cbcHe:
            "ב-CBC חומר-אריזה מספק-חדש מאופס ל-Normal עד שייצבר רצף-תקין שיעביר ל-Reduced/Skip.",
          navHe: ["Fiori Launchpad ► Quality Management ► Manage Quality Levels"],
          tables: ["QDQL", "QDPS"],
          tcodes: ["—"],
          fiori: ["F2329"],
          configHe: ["Dynamic-Modification-Rule (SPRO).", "Quality-Level CDS + Reset/Set actions.", "Inspection-Stage definitions."],
          flow: [
            { he: "בחירת חומר/ספק", code: "F2329" },
            { he: "תצוגת Stage נוכחי" },
            { he: "Reset / Set-stage" },
            { he: "השפעה על בדיקה-הבאה" },
          ],
          mistakesHe: ["Reset-ידני תכוף — מבטל את לוגיקת-ה-Modification.", "החמרה-ידנית בלי-תיעוד-סיבה."],
          troubleshootHe: ["Stage לא-משתנה ➔ Modification-Rule/נקודת-מודיפיקציה שגויה.", "אין Quality-Level ➔ לא-מוקצה לחומר/Inspection-Type."],
          bestPracticeHe: ["תן ל-Rule לנהל; אפס רק באירוע-מהותי (שינוי-ספק).", "תעד כל-שינוי-ידני."],
          interviewHe: [{ qHe: "מתי לאפס Quality-Level ידנית?", aHe: "באירוע-מהותי כמו שינוי-ספק/תהליך/מפרט — כדי להתחיל מחדש מ-Normal ולבנות-אמון; בשגרה עדיף לתת ל-Dynamic-Modification-Rule לנהל." }],
          takeawaysHe: ["ניהול עוצמת-הבדיקה פר-חומר/ספק (Stage).", "מוזן מ-Dynamic-Modification-Rule.", "מחליף QDL1/2/3; מקושר להיסטוריה."],
          relatedHe: [{ labelHe: "QM · Quality Level History (18.4.2)", href: "/library/qm/chapter-18/#sub-18.4.2" }],
        },
        {
          id: "18.4.10",
          titleHe: "עיבוד לוטי-בדיקה",
          titleEn: "Process Inspection Lots",
          execHe:
            "אפליקציה משולבת המאגדת את זרימת-העיבוד המלאה של לוט — מרישום-תוצאות ועד-החלטת-שימוש — ב-guided-flow אחד, לעבודה-רציפה בלי-מעבר-בין-אפליקציות.",
          beginnerHe:
            "במקום לפתוח אפליקציה-לרישום ואז אפליקציה-להחלטה, כאן עושים הכל-ברצף על אותו-לוט: רושמים תוצאות, ומיד מחליטים.",
          consultantHe:
            "Composite-app מעל QAMR+QAVE עם guided-navigation: Lot ► Operations ► Characteristics ► Results ► Defects ► UD. מותאמת לבודק-שמטפל-בלוט-מקצה-לקצה. משלבת את 18.4.3/18.4.12 ו-18.4.7 בזרימה-אחת.",
          purposeHe:
            "לייעל את העבודה-הרציפה על-לוט-בודד, להפחית-קליקים ולמנוע-לוטים-תקועים-בין-שלבים.",
          processExampleHe:
            "בודק פותח לוט, רושם את כל-המאפיינים, רושם-פגם-אחד, ומבצע UD — הכל ברצף-אחד בלי-לעזוב-את-המסך.",
          cbcHe:
            "ב-CBC בודק-מעבדה מטפל בדגימת-אצווה מקצה-לקצה: רישום-pH/Brix/CO2 ➔ החלטת-שחרור, ברצף-אחד.",
          navHe: ["Fiori Launchpad ► Quality Management ► Inspection Processing ► Process Inspection Lots"],
          tables: ["QALS", "QAMR", "QAVE"],
          tcodes: ["—"],
          fiori: ["F2759"],
          configHe: ["Guided-flow steps configuration.", "Combined Results+UD authorization."],
          flow: [
            { he: "בחירת-לוט", code: "F2759" },
            { he: "רישום-תוצאות" },
            { he: "רישום-פגמים" },
            { he: "החלטת-שימוש" },
            { he: "סגירה" },
          ],
          mistakesHe: ["דילוג-שלב ב-guided-flow.", "UD לפני-השלמת-מאפיינים-חובה."],
          troubleshootHe: ["לא-ניתן-להתקדם ➔ מאפיין-חובה לא-הושלם.", "UD חסום ➔ פגם-פתוח דורש-טיפול."],
          bestPracticeHe: ["השתמש לעבודה-מקצה-לקצה על-לוט.", "אל-תדלג-שלבים."],
          interviewHe: [{ qHe: "מה היתרון של Process-Inspection-Lots על אפליקציות-נפרדות?", aHe: "זרימה-מודרכת אחת מרישום-תוצאות ועד-UD על אותו-לוט — פחות-קליקים, פחות-מעברים, ומניעת-לוטים-תקועים-בין-שלבים." }],
          takeawaysHe: ["זרימת-עיבוד-לוט מקצה-לקצה ב-guided-flow.", "משלבת Results+Defects+UD.", "אידאלית לבודק-מלא-אחריות-לוט."],
        },
        {
          id: "18.4.11",
          titleHe: "ניהול תרשימי בקרה",
          titleEn: "Manage Control Charts",
          execHe:
            "אפליקציית-SPC המציגה ומנהלת תרשימי-בקרה (Control-Charts) למאפייני-בדיקה — ערכי-מדידה מול גבולות-בקרה (UCL/LCL), זיהוי-חריגות-סטטיסטיות ו-Process-Capability (Cp/Cpk).",
          beginnerHe:
            "תרשים-בקרה מראה את המדידות עם 'קווי-אזהרה' (גבולות). אם נקודה יוצאת-מהקווים או יש-מגמה-חשודה — התהליך לא-יציב וצריך-לטפל. זה לב-ה-SPC.",
          consultantHe:
            "מעל QASR/Control-Chart-data. תומך סוגי-תרשים (x-bar/R, x-bar/S, Individual, np/p/c/u), חישוב-UCL/LCL, Run-rules (Western-Electric), ו-Cp/Cpk/Pp/Ppk. מוזן מרישום-תוצאות (QAMR). מחליף את ה-Control-Chart הקלאסי (QGC*). בסיס-החלטה-תהליכי, להבדיל מ-Time-Series-LIS (18.2.6).",
          purposeHe:
            "לנטר יציבות-תהליך סטטיסטית בזמן-אמת, לזהות-סחיפה/חריגה לפני-ייצור-פסול, ולכמת-יכולת-תהליך (Cpk).",
          processExampleHe:
            "מהנדס בוחן x-bar/R-chart של נפח-המילוי; נקודה-מעל-UCL ו-7-נקודות-עולות מפעילים-חקירה לפי-Run-rules, וה-Cpk=1.1 מסמן-יכולת-גבולית.",
          cbcHe:
            "ב-CBC Control-Chart של CO2-בקרבונציה מנוטר בזמן-אמת; חריגה-סטטיסטית עוצרת-קו-מילוי לפני-אצוות-פסולות, ו-Cpk נמדד-שבועית.",
          navHe: ["Fiori Launchpad ► Quality Management ► Manage Control Charts"],
          tables: ["QASR", "QASE", "QDPS"],
          tcodes: ["—"],
          fiori: ["F2760"],
          configHe: ["Control-Chart-Type + Tracking (SPRO ► QM ► SPC).", "UCL/LCL calculation + Run-rules.", "Cp/Cpk evaluation settings."],
          flow: [
            { he: "בחירת מאפיין/Chart", code: "F2760" },
            { he: "תצוגת-נקודות מול UCL/LCL" },
            { he: "Run-rules ➔ זיהוי-חריגה" },
            { he: "Cp/Cpk capability" },
            { he: "פעולה-מתקנת" },
          ],
          mistakesHe: ["פירוש-נקודה-בודדת בלי-Run-rules.", "ערבוב Cp (פוטנציאל) עם Cpk (בפועל)."],
          troubleshootHe: ["אין-Chart ➔ Control-Chart-Type לא-מוקצה למאפיין (SPC-criterion).", "גבולות-לא-מחושבים ➔ מעט-מדי-נקודות/sample-size."],
          bestPracticeHe: ["בחר Chart-Type נכון לסוג-הנתון (משתנה/אטריביוט).", "פעל לפי-Run-rules, לא-נקודה-בודדת."],
          interviewHe: [
            { qHe: "מה ההבדל בין Cp ל-Cpk?", aHe: "Cp מודד פוטנציאל-יכולת (רוחב-מפרט מול-פיזור) בהנחת-מרכוז; Cpk מודד יכולת-בפועל כולל-סטיית-מרכז-התהליך מהמרכז-הרצוי. Cpk≤Cp תמיד." },
            { qHe: "מה ההבדל בין Control-Chart ל-Time-Series-LIS?", aHe: "Control-Chart הוא SPC ברמת-ערכי-מדידה מול-גבולות-בקרה-סטטיסטיים (תהליכי); Time-Series-LIS הוא מגמת-Key-Figure-מצטבר לאורך-תקופות (אסטרטגי)." },
          ],
          takeawaysHe: ["Control-Charts = SPC: מדידות מול UCL/LCL + Run-rules.", "מכמת-יכולת-תהליך (Cp/Cpk).", "תהליכי — להבדיל מ-Time-Series-LIS."],
          relatedHe: [{ labelHe: "QM · סדרת-זמן LIS (18.2.6)", href: "/library/qm/chapter-18/#sub-18.2.6" }],
        },
        {
          id: "18.4.12",
          titleHe: "רישום תוצאות בדיקה",
          titleEn: "Record Inspection Results",
          execHe:
            "הגרסה השנייה/המורחבת של רישום-התוצאות ב-Fiori — ממוקדת-מהנדס עם תצוגת-מאפיינים-מלאה, רישום-מרובה, ניהול-דגימות ואינטגרציה-עם-Defects ו-Control-Charts. משלימה את גרסת-הבודק (18.4.3).",
          beginnerHe:
            "עוד אפליקציה לרישום-תוצאות, מורחבת-יותר: רואים את כל-המאפיינים-יחד, רושמים-הרבה-בבת-אחת, ומנהלים-דגימות. מתאימה-יותר-למהנדס.",
          consultantHe:
            "SAPUI5+OData מעל QAMR/QASR עם תצוגת-Operation/Characteristic-מלאה, Multi-sample, Single/Summarized-result, וקישור ל-Defect-recording ו-Control-Chart. שתי-האפליקציות-התאומות (18.4.3 בודק / 18.4.12 מורחב) חולקות-CDS. ולידציה מול QPMK.",
          purposeHe:
            "לתמוך בתרחישי-רישום-מורכבים (מדגמים-מרובים, מאפיינים-תלויים, SPC) שמעבר-לרישום-הבסיסי-של-הבודק.",
          processExampleHe:
            "מהנדס רושם 5-מדגמים למאפיין-נפח, המערכת מחשבת-ממוצע, מזינה-Control-Chart, ומסמנת-חריגה-אם-מעבר-UCL.",
          cbcHe:
            "ב-CBC רישום-מדגמים-מרובים של-נפח-המילוי לאורך-המשמרת מזין-ישירות-את-Control-Chart-ה-CO2/נפח לניטור-SPC.",
          navHe: ["Fiori Launchpad ► Quality Management ► Inspection Processing ► Record Inspection Results"],
          tables: ["QAMR", "QASR", "QPMK"],
          tcodes: ["—"],
          fiori: ["F4072"],
          configHe: ["Multi-sample + Summarized-result settings.", "Defect + Control-Chart integration.", "Spec-limits (QPMK)."],
          flow: [
            { he: "בחירת לוט/פעולה", code: "F4072" },
            { he: "רישום-מדגמים-מרובים" },
            { he: "חישוב-ממוצע + ולידציה" },
            { he: "Control-Chart + Defects" },
            { he: "שמירה" },
          ],
          mistakesHe: ["בלבול בין Single ל-Summarized-result.", "רישום-מדגמים בלי-sample-size-תואם."],
          troubleshootHe: ["ממוצע-שגוי ➔ sample-size/result-type לא-תואם.", "Control-Chart לא-מתעדכן ➔ SPC-criterion לא-מוקצה."],
          bestPracticeHe: ["השתמש לגרסה-זו לתרחישי-SPC ומדגמים-מרובים.", "אמת sample-size מול-תוכנית-הבדיקה."],
          interviewHe: [{ qHe: "במה גרסת-המהנדס של Record-Results שונה מגרסת-הבודק?", aHe: "היא מורחבת: מדגמים-מרובים, Single/Summarized-results, קישור-ישיר ל-Defect-recording ו-Control-Charts (SPC) — לתרחישי-רישום-מורכבים מעבר-לרישום-הבסיסי." }],
          takeawaysHe: ["גרסת-רישום-מורחבת (תאומה ל-18.4.3).", "מדגמים-מרובים + SPC + Defects.", "ממוקדת-מהנדס ותרחישים-מורכבים."],
          relatedHe: [
            { labelHe: "QM · Record Inspection Results (18.4.3)", href: "/library/qm/chapter-18/#sub-18.4.3" },
            { labelHe: "QM · Manage Control Charts (18.4.11)", href: "/library/qm/chapter-18/#sub-18.4.11" },
          ],
        },
        {
          id: "18.4.13",
          titleHe: "עיבוד משימות איכות",
          titleEn: "Process Quality Tasks",
          execHe:
            "אפליקציה תפעולית לטיפול במשימות-איכות (Quality-Tasks) הנובעות מהודעות/אי-התאמות — ביצוע, עדכון-סטטוס וסגירה — מנקודת-המבט של מבצע-המשימה.",
          beginnerHe:
            "כשמתגלה-בעיית-איכות, נוצרת-משימה ('בדוק-X', 'תקן-Y'). כאן מי-שאחראי-למשימה מבצע-אותה ומסמן-שהושלמה.",
          consultantHe:
            "מעל QMSM (Notification-Tasks). מציג משימות-מוקצות-למשתמש, תאריכי-יעד, וסטטוס (Outstanding/Released/Completed/Successful). מקושר ל-Quality-Notification ו-8D/CAPA. ניווט מ-Technician-Overview. מחליף עיבוד-משימות ב-QM02.",
          purposeHe:
            "להניע-לסגירה את הפעולות-המתקנות/מונעות שנגזרות-מאי-התאמות, עם מעקב-יעד-וסטטוס.",
          processExampleHe:
            "טכנאי מקבל-משימה 'החלף-אטם-במכונה' מהודעת-תקלה, מבצע, ומסמן-Completed-Successful — ההודעה מתקדמת-לסגירה.",
          cbcHe:
            "ב-CBC משימה 'כייל-חיישן-CO2' נוצרת-מחריגת-קרבונציה; הטכנאי מבצע-ומסמן, וה-CAPA-נסגר.",
          navHe: ["Fiori Launchpad ► Quality Management ► Process Quality Tasks"],
          tables: ["QMSM", "QMEL"],
          tcodes: ["—"],
          fiori: ["F2761"],
          configHe: ["Task-codes (Catalog) + Task-status-scheme.", "Notification-integration + deadlines."],
          flow: [
            { he: "בחירת-משימה", code: "F2761" },
            { he: "ביצוע-המשימה" },
            { he: "עדכון-סטטוס", note: "Completed/Successful" },
            { he: "התקדמות-הודעה-לסגירה" },
          ],
          mistakesHe: ["סימון-Completed בלי-Successful.", "התעלמות-מתאריך-יעד."],
          troubleshootHe: ["הודעה לא-נסגרת ➔ משימה-פתוחה נותרה.", "משימה חסרה ➔ לא-מוקצתה-למשתמש."],
          bestPracticeHe: ["סמן Successful רק-בהשלמה-אמיתית.", "נטר-תאריכי-יעד."],
          interviewHe: [{ qHe: "מה הקשר בין Quality-Tasks להודעת-איכות?", aHe: "משימות (QMSM) הן הפעולות-המתקנות/מונעות שמוקצות-בתוך-הודעת-איכות (QMEL); השלמתן-בהצלחה היא תנאי-להתקדמות-ההודעה-לסגירה (8D/CAPA)." }],
          takeawaysHe: ["טיפול-במשימות-איכות מנקודת-המבצע.", "סטטוס Completed/Successful מניע-סגירת-הודעה.", "מקושר ל-CAPA/8D."],
          relatedHe: [{ labelHe: "QM · Manage Quality Tasks (18.4.14)", href: "/library/qm/chapter-18/#sub-18.4.14" }],
        },
        {
          id: "18.4.14",
          titleHe: "ניהול משימות איכות",
          titleEn: "Manage Quality Tasks",
          execHe:
            "אפליקציה ניהולית לסקירת-ובקרת כל-משימות-האיכות-בארגון — מעקב-יעדים, איתור-משימות-באיחור, והקצאה — מנקודת-המבט של מנהל/מהנדס (להבדיל מ-Process שהוא מבצע-יחיד).",
          beginnerHe:
            "כאן המנהל רואה את כל-המשימות-של-כולם: מה-באיחור, מי-עמוס, מה-תקוע. תצוגת-בקרה, לא-תצוגת-ביצוע.",
          consultantHe:
            "List-Report מעל QMSM עם Smart-Filter (אחראי/יעד/סטטוס/Overdue), Mass-reassignment, ו-Analytics-על-עומס. מנהלת את מה-ש-18.4.13 מבצע. ניווט מ-Engineer-Overview. תומכת KPI-משימות-באיחור.",
          purposeHe:
            "לתת-נראות-ובקרה-ניהולית על-תיק-המשימות, למנוע-איחורים ולאזן-עומס בין-מבצעים.",
          processExampleHe:
            "מהנדס מסנן ל-Overdue-tasks, מאתר-3-משימות-באיחור, ומקצה-מחדש לטכנאי-פנוי בפעולה-המונית.",
          cbcHe:
            "ב-CBC מנהל-QA סוקר-שבועית את משימות-ה-CAPA-הפתוחות במפעל, מזהה-צוואר-בקבוק, ומאזן-עומס בין-טכנאים.",
          navHe: ["Fiori Launchpad ► Quality Management ► Manage Quality Tasks"],
          tables: ["QMSM", "QMEL"],
          tcodes: ["—"],
          fiori: ["F2762"],
          configHe: ["Smart-Filter + Overdue-KPI.", "Mass-reassignment authorization."],
          flow: [
            { he: "סקירת כל-המשימות", code: "F2762" },
            { he: "סינון Overdue/אחראי" },
            { he: "Reassign / תיעדוף" },
            { he: "מעקב-סגירה" },
          ],
          mistakesHe: ["ניהול-משימות-יחיד דרך-אפליקציה-זו (היא-לבקרה).", "התעלמות מ-Overdue-KPI."],
          troubleshootHe: ["משימה לא-נראית ➔ Smart-Filter/הרשאה.", "Reassign-נכשל ➔ הרשאת-ניהול חסרה."],
          bestPracticeHe: ["סקור-Overdue-שבועית.", "אזן-עומס דרך-Reassignment."],
          interviewHe: [{ qHe: "מה ההבדל בין Manage ל-Process Quality-Tasks?", aHe: "Process הוא ביצוע-משימה ע\"י-המבצע-היחיד; Manage הוא בקרה-ניהולית על-כל-המשימות — מעקב-יעדים, איתור-איחורים, הקצאה-מחדש ואיזון-עומס." }],
          takeawaysHe: ["בקרה-ניהולית על-כל-משימות-האיכות.", "Overdue-KPI + Mass-reassignment.", "משלימה את Process-Quality-Tasks."],
          relatedHe: [{ labelHe: "QM · Process Quality Tasks (18.4.13)", href: "/library/qm/chapter-18/#sub-18.4.13" }],
        },
        {
          id: "18.4.15",
          titleHe: "הערכת ספק לפי איכות",
          titleEn: "Supplier Evaluation by Quality",
          execHe:
            "אפליקציה אנליטית להערכת-ספקים על-בסיס-מדדי-איכות — אחוז-דחייה, Quality-Score, הודעות-תלונה ו-On-time — המזינה את הערכת-הספק-הכוללת (MM) ואת-החלטות-הרכש.",
          beginnerHe:
            "מראה לכל-ספק 'תעודת-איכות': כמה-נדחה-ממנו, כמה-תלונות, ציון-כולל. כך-מחליטים-עם-מי-להמשיך-לעבוד.",
          consultantHe:
            "Analytical-app מעל QM-Vendor-data (S070/QALS) המשולב עם Supplier-Evaluation (MM ELLI/LFM*). מציג Quality-Score-per-Vendor, Drill-down-לחומר/הודעה, ומגמה. מזין את-ה-Overall-Supplier-Evaluation-criteria. בסיס-להחלטות-Source-List ו-QM-Procurement.",
          purposeHe:
            "לכמת-את-ביצועי-האיכות-של-ספקים אובייקטיבית, להזין-הערכת-ספק-כוללת ולתמוך-בהחלטות-מקור-ורכש.",
          processExampleHe:
            "רוכש בוחן-הערכת-איכות-ספק לפני-חידוש-חוזה; ספק-עם-Score-נמוך-ומגמה-יורדת מסומן-להתראה ול-Source-inspection.",
          cbcHe:
            "ב-CBC הערכת-איכות-ספקי-התרכיז-והאריזה מוזנת-לסקירת-ספקים-רבעונית; ספק-A-חלש-מקבל-תוכנית-שיפור-או-מוחלף.",
          navHe: ["Fiori Launchpad ► Quality Management ► Analytics ► Supplier Evaluation by Quality"],
          tables: ["S070", "QALS", "ELLI"],
          tcodes: ["—"],
          fiori: ["F2335"],
          configHe: ["Quality-Score-procedure + Supplier-Evaluation-criteria (MM).", "Vendor-CDS + Drill-down.", "Score-thresholds (KPI)."],
          flow: [
            { he: "פתיחה", code: "F2335" },
            { he: "Score-per-Vendor + מגמה" },
            { he: "Drill-down לחומר/הודעה" },
            { he: "הזנת-הערכת-ספק-כוללת" },
            { he: "החלטת-מקור/רכש" },
          ],
          mistakesHe: ["הערכה על-נפח-זעיר.", "התעלמות-ממגמה (Score-יורד) לטובת-ערך-נקודתי."],
          troubleshootHe: ["Score-חסר-לספק ➔ Score-procedure/נתוני-S070 חסרים.", "אין-נתונים ➔ CDS/הרשאה."],
          bestPracticeHe: ["שלב-Score עם-מגמה-ונפח.", "קשר-להחלטות-Source-List ו-QM-Procurement-Key."],
          interviewHe: [{ qHe: "כיצד הערכת-איכות-ספק מתחברת ל-MM?", aHe: "ה-Quality-Score-per-Vendor מזין-את קריטריון-האיכות בהערכת-הספק-הכוללת (Supplier-Evaluation ב-MM), המשפיע-על Source-List, מכרזים והחלטות-רכש." }],
          takeawaysHe: ["הערכת-ספק על-בסיס-מדדי-איכות.", "מזינה Supplier-Evaluation (MM) והחלטות-מקור.", "שלב-Score עם-מגמה-ונפח."],
          relatedHe: [{ labelHe: "QM · ניתוח ABC (18.2.5)", href: "/library/qm/chapter-18/#sub-18.2.5" }],
        },
        {
          id: "18.4.16",
          titleHe: "אנליטיקת לוטי-בדיקה",
          titleEn: "Inspection Lot Analytics",
          execHe:
            "אפליקציה אנליטית מורחבת ללוטי-בדיקה — Analytical-List-Page עם KPI-cards, Visual-Filters מרובים ו-Drill-down-רב-מימדי — הרחבה של 18.4.1 עם מימדי-ניתוח-נוספים (זמן-מחזור, overdue, lead-time).",
          beginnerHe:
            "עוד תצוגת-אנליטיקה-ללוטים, רחבה-יותר: לא-רק-כמה-נדחה, אלא-גם-כמה-זמן-לקח, כמה-באיחור, ואיפה-הצוואר-בקבוק.",
          consultantHe:
            "ALP מעל C_InspectionLotAnalytics עם measures-נוספים: Cycle-time, Lead-time, Overdue-count, Open-vs-Completed. Visual-Filter-Bar + Multi-chart. הרחבת-18.4.1; חלקן-נמסרות-כ-variant-של-אותה-אפליקציה. בסיס-לדוחות-תפעול-איכות.",
          purposeHe:
            "להעמיק-את-ניתוח-הלוטים מעבר-לדחיות — לכלול-יעילות-תהליך-הבדיקה (זמנים, איחורים) לזיהוי-צווארי-בקבוק.",
          processExampleHe:
            "מהנדס בוחן-Cycle-time-של-לוטים-לפי-מפעל; מפעל-עם-זמן-מחזור-ארוך-וחריג מזוהה-כצוואר-בקבוק-בתהליך-הבדיקה.",
          cbcHe:
            "ב-CBC ניתוח-זמן-מחזור-בדיקה-לאצווה מגלה-עיכוב-במעבדת-מיקרוביולוגיה; מתוגבר-כוח-אדם-בשעות-שיא.",
          navHe: ["Fiori Launchpad ► Quality Management ► Analytics ► Inspection Lot Analytics"],
          tables: ["QALS"],
          tcodes: ["—"],
          fiori: ["F2333"],
          configHe: ["Analytic-CDS measures (cycle/lead-time/overdue).", "Multi Visual-Filter + Chart."],
          flow: [
            { he: "פתיחה", code: "F2333" },
            { he: "Visual-Filters מרובים" },
            { he: "KPI: זמן-מחזור/overdue" },
            { he: "Drill-down רב-מימדי" },
          ],
          mistakesHe: ["התמקדות-בדחיות-בלבד והזנחת-זמני-תהליך.", "ערבוב-מימדים בלי-פילטר."],
          troubleshootHe: ["measure-חסר ➔ CDS-extension לא-פעיל.", "אין-נתונים ➔ הרשאה-אנליטית."],
          bestPracticeHe: ["נטר-זמן-מחזור-לצד-דחיות.", "השתמש-במימדים-מרובים לאיתור-צוואר-בקבוק."],
          interviewHe: [{ qHe: "מה מוסיפה Inspection-Lot-Analytics-המורחבת על הבסיסית?", aHe: "מימדי-יעילות-תהליך: Cycle-time, Lead-time ו-Overdue-count — מעבר-לדחיות, לזיהוי-צווארי-בקבוק בתהליך-הבדיקה עצמו." }],
          takeawaysHe: ["אנליטיקת-לוטים מורחבת (זמנים+overdue).", "ALP רב-מימדי, הרחבת-18.4.1.", "מזהה-צווארי-בקבוק בתהליך-הבדיקה."],
          relatedHe: [{ labelHe: "QM · Inspection Lot Analytics (18.4.1)", href: "/library/qm/chapter-18/#sub-18.4.1" }],
        },
        {
          id: "18.4.17",
          titleHe: "אנליטיקת לוטי-בדיקה מפורטת",
          titleEn: "Inspection Lot Detailed Analytics",
          execHe:
            "אפליקציה אנליטית ברמת-פירוט-גבוהה ללוט-הבודד — מציגה את כל-המאפיינים, הפעולות, הפגמים וההחלטות-של-לוט-מסוים בתצוגת-Object-Page-אנליטית, לחקירת-שורש-ברמת-הלוט.",
          beginnerHe:
            "אם 18.4.16 מראה-תמונה-כללית, כאן צוללים-ללוט-אחד-ספציפי ורואים-עליו-הכל: כל-מדידה, כל-פגם, כל-החלטה. לחקירה-מעמיקה.",
          consultantHe:
            "Analytical-Object-Page מעל I_InspectionLot+I_InspectionResult. מציג characteristic-level-detail, defect-distribution, ו-operation-breakdown ללוט-יחיד. ניווט-מ-18.4.16 (drill-to-detail). בסיס-ל-Root-Cause-Analysis ול-8D.",
          purposeHe:
            "לאפשר-חקירת-שורש-מעמיקה ברמת-הלוט-הבודד — לראות-בדיוק-מה-נכשל-ולמה.",
          processExampleHe:
            "מהנדס-צולל-מ-Analytics ללוט-דחוי-ספציפי, רואה-שמאפיין-pH-נכשל-ב-3-מתוך-5-מדגמים, ופותח-חקירת-שורש.",
          cbcHe:
            "ב-CBC חקירת-אצווה-דחויה מראה-שחריגת-ה-CO2-מקורה-בפעולה-3 (קרבונטור)-בלבד; התחזוקה-ממוקדת-שם.",
          navHe: ["Fiori Launchpad ► Quality Management ► Analytics ► Inspection Lot Detailed Analytics"],
          tables: ["QALS", "QAMR", "QAVE"],
          tcodes: ["—"],
          fiori: ["F2334"],
          configHe: ["Analytic-Object-Page (characteristic/defect/operation detail).", "Drill-from-overview navigation."],
          flow: [
            { he: "Drill מ-Analytics", code: "F2334" },
            { he: "פירוט-מאפיינים-ופעולות" },
            { he: "התפלגות-פגמים" },
            { he: "חקירת-שורש ➔ 8D" },
          ],
          mistakesHe: ["חקירה ברמת-לוט בלי-הקשר-מגמתי.", "התעלמות-מ-operation-breakdown."],
          troubleshootHe: ["פירוט-חסר ➔ תוצאות לא-נרשמו-ברמת-מאפיין.", "אין-לוט ➔ filter/הרשאה."],
          bestPracticeHe: ["שלב-עם-מגמה (18.4.16) להקשר.", "השתמש-ל-Root-Cause-ו-8D."],
          interviewHe: [{ qHe: "מתי משתמשים ב-Detailed-Analytics לעומת Analytics?", aHe: "Analytics לתמונת-מגמה-רב-לוטית; Detailed-Analytics לחקירת-שורש ברמת-לוט-בודד — characteristic/defect/operation-breakdown, בסיס-ל-8D/Root-Cause." }],
          takeawaysHe: ["אנליטיקה-ברמת-הלוט-הבודד.", "פירוט-מאפיין/פגם/פעולה לחקירת-שורש.", "בסיס-ל-8D ו-Root-Cause-Analysis."],
          relatedHe: [{ labelHe: "QM · Inspection Lot Analytics (18.4.16)", href: "/library/qm/chapter-18/#sub-18.4.16" }],
        },
        {
          id: "18.4.18",
          titleHe: "אנליטיקת מאפיינים",
          titleEn: "Characteristics Analytics",
          execHe:
            "אפליקציה אנליטית ברמת-מאפיין-הבדיקה (לא-לוט) — אחוז-חריגה, התפלגות-ערכים ומגמה-פר-מאפיין לאורך-לוטים — לזיהוי-מאפיינים-בעייתיים-מערכתית.",
          beginnerHe:
            "במקום-לנתח-לפי-בדיקה, מנתחים-לפי-מאפיין: איזו-מדידה (pH? נפח? משקל?) הכי-הרבה-חורגת בכל-הבדיקות. כך-מאתרים-את-החולשה-התהליכית.",
          consultantHe:
            "ALP מעל C_InspCharacteristicAnalytics (I_InspectionResult). measures: share-out-of-spec, mean/std-dev, defect-rate-per-characteristic. מקביל-Fiori ל-LIS-S069. Drill-down-למאפיין➔חומר➔לוט. בסיס-לתעדוף-שיפור-תהליך.",
          purposeHe:
            "לזהות-אילו-מאפיינים-תורמים-הכי-הרבה-לחריגות חוצה-לוטים, ולתעדף-שיפור-תהליך-במקור.",
          processExampleHe:
            "מהנדס-רואה-ש'נפח-המילוי' מוביל-באחוז-חריגה-על-פני-כל-החומרים — מצביע-על-בעיית-קליברציה-מערכתית ולא-חומר-בודד.",
          cbcHe:
            "ב-CBC אנליטיקת-מאפיינים מגלה-ש'Brix'-חורג-בכל-הטעמים בקו-מסוים — בעיית-מערכת-המינון, לא-מתכון-בודד.",
          navHe: ["Fiori Launchpad ► Quality Management ► Analytics ► Characteristics Analytics"],
          tables: ["QAMR", "QASE", "S069"],
          tcodes: ["—"],
          fiori: ["F2337"],
          configHe: ["Characteristic-Analytic-CDS (share-out-of-spec/mean/std).", "Drill-down characteristic➔material➔lot."],
          flow: [
            { he: "פתיחה", code: "F2337" },
            { he: "מאפיינים-לפי-אחוז-חריגה" },
            { he: "התפלגות + mean/std" },
            { he: "Drill-down לחומר/לוט" },
          ],
          mistakesHe: ["ניתוח-לוט במקום-מאפיין לשאלה-תהליכית.", "התעלמות-מ-std-dev (פיזור)."],
          troubleshootHe: ["מאפיין-חסר ➔ לא-כמותי/לא-נרשם.", "אין-נתונים ➔ CDS/הרשאה."],
          bestPracticeHe: ["נתח-ברמת-מאפיין לבעיות-מערכתיות.", "בחן-mean-ו-std יחד."],
          interviewHe: [{ qHe: "מה היתרון בניתוח-ברמת-מאפיין על-פני-לוט?", aHe: "הוא חושף-בעיות-מערכתיות-חוצות-לוטים-וחומרים (מאפיין-שחורג-בכל-מקום=בעיית-תהליך/קליברציה), בעוד ניתוח-לוט מצביע-על-מקרה-בודד." }],
          takeawaysHe: ["אנליטיקה-ברמת-מאפיין-הבדיקה (מקביל-S069).", "share-out-of-spec + mean/std.", "מאתרת-בעיות-תהליך-מערכתיות."],
          relatedHe: [{ labelHe: "QM · מבני-מידע נוספים (18.2.4)", href: "/library/qm/chapter-18/#sub-18.2.4" }],
        },
        {
          id: "18.4.19",
          titleHe: "אנליטיקת מאפיין מפורטת",
          titleEn: "Characteristic Detailed Analytics",
          execHe:
            "אפליקציה אנליטית-מפורטת למאפיין-בודד — התפלגות-מלאה (היסטוגרמה), Process-Capability (Cp/Cpk) וטרנד-מדידות — שילוב-של-ניתוח-תיאורי-וסטטיסטי ברמת-המאפיין.",
          beginnerHe:
            "צוללים-למאפיין-אחד (למשל-נפח) ורואים-עליו-הכל: היסטוגרמה-של-כל-המדידות, כמה-יציב-התהליך (Cpk), ומגמה. לניתוח-מעמיק-של-מדד-אחד.",
          consultantHe:
            "Analytical-Object-Page מעל I_InspectionResult למאפיין-יחיד: histogram, distribution-fit, Cp/Cpk/Pp/Ppk, trend. גשר-בין-Characteristics-Analytics (18.4.18) ל-Control-Charts (18.4.11). בסיס-ל-Process-Capability-Study.",
          purposeHe:
            "לבצע-ניתוח-יכולת-תהליך-מעמיק (Capability-Study) למאפיין-קריטי-בודד, מעבר-לאחוז-חריגה.",
          processExampleHe:
            "מהנדס-בוחן-Capability-של-נפח-המילוי: היסטוגרמה-מוטה-וערך-Cpk=0.9 מצביעים-על-תהליך-לא-מסוגל — נדרש-שיפור-לפני-המשך.",
          cbcHe:
            "ב-CBC Capability-Study-על-נפח-בקבוק-330ml לפני-אישור-קו-חדש; Cpk≥1.33 נדרש-לאישור-ייצור-מסחרי.",
          navHe: ["Fiori Launchpad ► Quality Management ► Analytics ► Characteristic Detailed Analytics"],
          tables: ["QAMR", "QASE"],
          tcodes: ["—"],
          fiori: ["F2338"],
          configHe: ["Histogram + distribution-fit.", "Cp/Cpk/Pp/Ppk evaluation.", "Spec-limits + target."],
          flow: [
            { he: "בחירת-מאפיין", code: "F2338" },
            { he: "היסטוגרמה + התפלגות" },
            { he: "Cp/Cpk capability" },
            { he: "החלטה: מסוגל/לא" },
          ],
          mistakesHe: ["מסקנת-Cpk על-מדגם-קטן/לא-יציב.", "התעלמות-מצורת-ההתפלגות (נורמליות)."],
          troubleshootHe: ["Cpk-לא-מחושב ➔ מעט-נתונים/ספים-חסרים.", "התפלגות-מוזרה ➔ ערבוב-מקורות/קווים."],
          bestPracticeHe: ["ודא-יציבות (Control-Chart) לפני-Capability.", "בדוק-נורמליות לפני-פרשנות-Cpk."],
          interviewHe: [{ qHe: "מדוע-לבדוק-יציבות-לפני-Capability?", aHe: "Cp/Cpk תקפים-רק-לתהליך-יציב (בשליטה-סטטיסטית). תהליך-לא-יציב (Control-Chart-חורג) נותן-Cpk-חסר-משמעות — לכן-יציבות-קודמת-ליכולת." }],
          takeawaysHe: ["ניתוח-מאפיין-בודד: היסטוגרמה+Cp/Cpk+טרנד.", "בסיס-ל-Process-Capability-Study.", "יציבות-קודמת-ליכולת."],
          relatedHe: [
            { labelHe: "QM · Characteristics Analytics (18.4.18)", href: "/library/qm/chapter-18/#sub-18.4.18" },
            { labelHe: "QM · Manage Control Charts (18.4.11)", href: "/library/qm/chapter-18/#sub-18.4.11" },
          ],
        },
        {
          id: "18.4.20",
          titleHe: "לוט-בדיקה",
          titleEn: "Inspection Lot",
          execHe:
            "Object-Page/Fact-Sheet של לוט-בודד — תצוגת-360°-של-הלוט: כותרת, פעולות, מאפיינים, מלאי-בדיקה, החלטה ומסמכים-קשורים — נקודת-הכניסה-המרכזית-לכל-פעולה-על-לוט.",
          beginnerHe:
            "'כרטיס-הלוט': מסך-אחד-שמרכז-את-כל-מה-שקשור-ללוט-מסוים, ומשם-מנווטים-לכל-פעולה (רישום/החלטה/הדפסה).",
          consultantHe:
            "Object-Page מעל I_InspectionLot עם sections: Header, Operations, Characteristics, Inspection-Stock, UD, Related-objects (Material-doc, Notification, Batch). Smart-Links ל-Fact-Sheets. נקודת-ניווט-מרכזית מ-Manage-Inspection-Lots ומ-Analytics.",
          purposeHe:
            "לרכז-את-כל-מידע-הלוט-וניווטיו במקום-אחד — Single-Source-of-Truth-ללוט.",
          processExampleHe:
            "בודק-פותח-Object-Page-של-לוט, רואה-סטטוס-מלא, ומנווט-משם-לרישום-תוצאות ואז-להחלטה — ללא-חיפוש-מחדש.",
          cbcHe:
            "ב-CBC Object-Page-של-לוט-אצווה מקשר-ישירות-לאצווה (Batch), לתעודת-משלוח ולהודעת-איכות-אם-נפתחה.",
          navHe: ["Fiori Launchpad ► Quality Management ► Inspection Lot (Object Page)"],
          tables: ["QALS", "QAMR", "QAVE"],
          tcodes: ["—"],
          fiori: ["F2424"],
          configHe: ["Object-Page sections + Smart-Links.", "Related-object navigation (Batch/Notification/Material-doc)."],
          flow: [
            { he: "פתיחת Object-Page", note: "מ-Manage/Analytics" },
            { he: "סקירת-360°", note: "Header/Ops/Stock/UD" },
            { he: "ניווט-לפעולה", note: "Results/UD/Print" },
            { he: "קישור-לאובייקטים-קשורים" },
          ],
          mistakesHe: ["חיפוש-מידע-לוט באפליקציות-נפרדות במקום-Object-Page.", "התעלמות-מ-Related-objects."],
          troubleshootHe: ["section-ריק ➔ נתון-לא-קיים/הרשאה.", "Smart-Link-שבור ➔ target-mapping."],
          bestPracticeHe: ["השתמש-כ-נקודת-כניסה-מרכזית-ללוט.", "נצל-Smart-Links-לאובייקטים-קשורים."],
          interviewHe: [{ qHe: "מהו תפקיד-ה-Inspection-Lot-Object-Page?", aHe: "תצוגת-360°-מרכזת של-לוט-בודד (Header/Operations/Characteristics/Stock/UD/Related) עם Smart-Links — Single-Source-of-Truth-ונקודת-ניווט-לכל-פעולה." }],
          takeawaysHe: ["Object-Page = כרטיס-360°-של-הלוט.", "נקודת-ניווט-מרכזית-לכל-פעולה.", "Smart-Links-לאובייקטים-קשורים."],
          relatedHe: [{ labelHe: "QM · Manage Inspection Lots (18.4.8)", href: "/library/qm/chapter-18/#sub-18.4.8" }],
        },
        {
          id: "18.4.21",
          titleHe: "פעולת בדיקה",
          titleEn: "Inspection Operation",
          execHe:
            "תצוגת-Object-Page של פעולת-בדיקה (Operation) בתוך-לוט — המאפיינים, מרכז-העבודה, סטטוס-הרישום והתוצאות-של-פעולה-בודדת — לעבודה-וניווט ברמת-הפעולה.",
          beginnerHe:
            "לוט-מורכב-מ'פעולות' (שלבי-בדיקה). כאן-רואים-פעולה-אחת: אילו-מאפיינים-שייכים-לה, היכן-נבדקת ומה-תוצאותיה.",
          consultantHe:
            "Object-Page מעל I_InspectionOperation (PLPO/AFVC-context-ב-QM): characteristics-of-operation, work-center, results-status. רלוונטי-לבדיקות-תוך-תהליכיות-רב-פעולתיות. ניווט-מ-Lot-Object-Page. מקושר-ל-Routing/Inspection-Plan.",
          purposeHe:
            "לתמוך בבדיקות-רב-פעולתיות (תוך-תהליכיות) שבהן-כל-שלב-נבדק-בנפרד — נראות-וניהול ברמת-הפעולה.",
          processExampleHe:
            "בלוט-ייצור-רב-שלבי, הבודק-עובד-פעולה-אחר-פעולה: פעולה-10-מילוי, פעולה-20-סגירה — רושם-תוצאות-לכל-אחת-בנפרד.",
          cbcHe:
            "ב-CBC לוט-תוך-תהליכי מחולק-לפעולות: ערבוב➔קרבונציה➔מילוי➔סגירה; כל-פעולה-נבדקת-ונרשמת-בתחנתה.",
          navHe: ["Fiori Launchpad ► Quality Management ► Inspection Operation (Object Page)"],
          tables: ["QALS", "QAPP", "PLPO"],
          tcodes: ["—"],
          fiori: ["F2424"],
          configHe: ["Operation-level inspection (Inspection-Plan/Routing).", "Work-center assignment + results-status."],
          flow: [
            { he: "פתיחת-פעולה", note: "מ-Lot-Object-Page" },
            { he: "מאפייני-הפעולה + work-center" },
            { he: "רישום-תוצאות-פעולה" },
            { he: "סטטוס ➔ פעולה-הבאה" },
          ],
          mistakesHe: ["רישום-מאפיין-בפעולה-שגויה.", "התעלמות-מ-work-center-של-הפעולה."],
          troubleshootHe: ["פעולה-חסרה ➔ Inspection-Plan/Routing בלי-הפעולה.", "מאפיין-לא-שייך ➔ הקצאה-לפעולה-אחרת."],
          bestPracticeHe: ["השתמש-לבדיקות-רב-פעולתיות.", "ודא-הקצאת-מאפיינים-לפעולה-נכונה ב-Plan."],
          interviewHe: [{ qHe: "מתי רלוונטית תצוגת-פעולת-בדיקה?", aHe: "בבדיקות-רב-פעולתיות (תוך-תהליכיות) שבהן-Inspection-Plan/Routing-מגדיר-מספר-פעולות, וכל-פעולה-נושאת-מאפיינים-ו-work-center-משלה ונרשמת-בנפרד." }],
          takeawaysHe: ["Object-Page ברמת-פעולת-הבדיקה.", "מאפיינים+work-center+תוצאות-פר-פעולה.", "לבדיקות-תוך-תהליכיות-רב-שלביות."],
          relatedHe: [{ labelHe: "QM · לוט-בדיקה (18.4.20)", href: "/library/qm/chapter-18/#sub-18.4.20" }],
        },
        {
          id: "18.4.22",
          titleHe: "ניהול אצוות",
          titleEn: "Manage Batches",
          execHe:
            "אפליקציה לניהול-אצוות (Batches) מנקודת-מבט-איכותית — סטטוס-אצווה (Restricted/Unrestricted), Batch-classification, תוקף (SLED) וקישור-ללוטי-בדיקה — חיונית-בתעשיות-מנוהלות-אצווה.",
          beginnerHe:
            "אצווה-היא-קבוצת-מוצר-מאותו-ייצור. כאן-מנהלים-אותה: האם-משוחררת-למכירה, מה-תכונותיה (מאפייני-אצווה), ומתי-פג-תוקפה.",
          consultantHe:
            "List-Report מעל MCH1/MCHA/MCHB עם Batch-classification (CLBATCH/AUSP), Batch-status (Restricted/Unrestricted), SLED/Shelf-life, ו-derivation. מקושר-להחלטת-שימוש (UD-מעדכן-Batch-status) ול-Inspection-Lot. מחליף MSC1N/MSC2N/MSC3N. קריטי-במזון/פארמה.",
          purposeHe:
            "לנהל-את-מחזור-חיי-האצווה-ושחרורה בהתאם-לתוצאות-איכות, ולהבטיח-מעקב-מלא (Traceability) ותוקף.",
          processExampleHe:
            "אחרי-UD-חיובי, סטטוס-האצווה-עובר-ל-Unrestricted אוטומטית; אצווה-דחויה-נשארת-Restricted ולא-ניתנת-למכירה.",
          cbcHe:
            "ב-CBC כל-אצוות-משקה-מנוהלת-אצווה עם-SLED (תוקף); UD-משחרר-ל-Unrestricted, וה-Batch-classification-נושא-Brix/pH-לטרסביליות.",
          navHe: ["Fiori Launchpad ► Quality Management / Inventory ► Manage Batches"],
          tables: ["MCH1", "MCHA", "MCHB", "AUSP"],
          tcodes: ["—"],
          fiori: ["F1576"],
          configHe: ["Batch-status-management (Restricted/Unrestricted) per-plant.", "Batch-classification (Class-022) + characteristics.", "SLED/Shelf-life + derivation."],
          flow: [
            { he: "בחירת-אצווה", code: "F1576" },
            { he: "סטטוס + classification" },
            { he: "UD ➔ עדכון-סטטוס", note: "Restricted/Unrestricted" },
            { he: "שחרור/חסימה-למכירה" },
          ],
          mistakesHe: ["שחרור-ידני-לאצווה-דחויה (עוקף-UD).", "Batch-classification חסר ➔ אין-טרסביליות."],
          troubleshootHe: ["אצווה-לא-משתחררת ➔ UD-שלילי/Batch-status-Restricted.", "מאפיין-אצווה-חסר ➔ classification-לא-מוקצה."],
          bestPracticeHe: ["תן-ל-UD-לנהל-Batch-status (לא-ידני).", "מלא-Batch-classification לטרסביליות-מלאה."],
          interviewHe: [
            { qHe: "כיצד החלטת-שימוש משפיעה על-סטטוס-אצווה?", aHe: "UD-חיובי-מעביר-את-האצווה ל-Unrestricted (זמינה-למכירה/שימוש); UD-שלילי-משאיר-אותה-Restricted/Blocked — שילוב-בין-QM-ל-Batch-Management." },
            { qHe: "מהי המשמעות של SLED באצווה?", aHe: "Shelf-Life-Expiration-Date — תאריך-פג-תוקף; קריטי-במזון/פארמה ל-FEFO-ולמניעת-שימוש-בפג-תוקף." },
          ],
          takeawaysHe: ["ניהול-אצווה: סטטוס+classification+SLED.", "UD-מעדכן-Batch-status (שחרור/חסימה).", "קריטי-במזון/פארמה לטרסביליות (מחליף MSC*N)."],
          relatedHe: [{ labelHe: "QM · Manage Usage Decisions (18.4.7)", href: "/library/qm/chapter-18/#sub-18.4.7" }],
        },
        {
          id: "18.4.23",
          titleHe: "אנליטיקת אי-התאמות מפורטת",
          titleEn: "Nonconformance Detailed Analytics",
          execHe:
            "אפליקציה אנליטית-מפורטת לאי-התאמות (Nonconformances) והודעות-איכות — התפלגות-קודי-פגם, סיבות-שורש, עלות-אי-איכות ומגמה — לניהול-CAPA ולשיפור-מתמשך מבוסס-נתונים.",
          beginnerHe:
            "כאן-מנתחים-את-הבעיות-עצמן: אילו-פגמים-הכי-נפוצים, מה-גורם-להם, וכמה-הם-עולים. בסיס-לתיקון-שיטתי.",
          consultantHe:
            "ALP/Object-Page מעל I_QualityNotification+Defect-data (QMEL/QMFE/QMUR). measures: defect-code-distribution, cause-analysis, cost-of-poor-quality, by-defect-group/material/vendor. Drill-down-לקוד-פגם➔סיבה➔פעולה. מזין-8D/CAPA. מקביל-Fiori-מתקדם ל-LIS-Notification-structures (S07x).",
          purposeHe:
            "להפוך-נתוני-אי-התאמות-לתובנות-פעולה: לזהות-פגמים-חוזרים-ושורשיהם, לכמת-עלות, ולהניע-CAPA-ממוקד.",
          processExampleHe:
            "מהנדס-מנתח-אי-התאמות-רבעוניות; קוד-פגם 'נזילת-פקק'-מוביל (35%), Drill-לסיבה-'מומנט-סגירה'-וב-CAPA-מכוונים-את-מכונת-הסגירה.",
          cbcHe:
            "ב-CBC ניתוח-אי-התאמות מצביע-ש'רמת-מילוי-נמוכה'-היא-הפגם-היקר-ביותר; CAPA-ממקד-בקליברציית-מד-הזרימה.",
          navHe: ["Fiori Launchpad ► Quality Management ► Analytics ► Nonconformance Detailed Analytics"],
          tables: ["QMEL", "QMFE", "QMUR"],
          tcodes: ["—"],
          fiori: ["F2339"],
          configHe: ["Defect-Catalog (codes/groups) + Cause-codes.", "Cost-of-poor-quality measure.", "Notification-CDS + Drill-down."],
          flow: [
            { he: "פתיחה", code: "F2339" },
            { he: "התפלגות-קודי-פגם (Pareto)" },
            { he: "Drill: פגם➔סיבה" },
            { he: "עלות-אי-איכות" },
            { he: "CAPA/8D ממוקד" },
          ],
          mistakesHe: ["ניתוח-קוד-פגם בלי-Drill-לסיבה.", "התעלמות-מעלות-אי-איכות לטובת-תדירות-בלבד."],
          troubleshootHe: ["פגם-חסר ➔ Defect-Catalog/קידוד-לא-עקבי.", "אין-נתונים ➔ CDS/הרשאה."],
          bestPracticeHe: ["נתח-Pareto-קודי-פגם ➔ Drill-לסיבה ➔ CAPA.", "תעדף-לפי-עלות-אי-איכות, לא-רק-תדירות."],
          interviewHe: [{ qHe: "כיצד Nonconformance-Analytics מניע-שיפור-מתמשך?", aHe: "הוא-מזהה-Pareto-של-קודי-פגם, מאפשר-Drill-לסיבת-שורש, מכמת-עלות-אי-איכות, ומזין-CAPA/8D-ממוקד — סוגר-את-לולאת-ה-PDCA מבוססת-נתונים." }],
          takeawaysHe: ["אנליטיקת-אי-התאמות מפורטת (פגם/סיבה/עלות).", "Pareto-קודי-פגם ➔ Drill-לסיבה ➔ CAPA.", "מקביל-Fiori-מתקדם ל-LIS-S07x; מניע-PDCA."],
          relatedHe: [{ labelHe: "QM · ניתוח ABC (18.1.10)", href: "/library/qm/chapter-18/#sub-18.1.10" }],
        },
      ],
    },
    // ============================================================ 18.5
    {
      id: "18.5",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק-הדיווח-של-QM מציג-שלוש-שכבות-משלימות: דיווח-תפעולי-קלאסי (QA32/QA33, וריאנטים, Worklists, הורדה, ABC), ניתוחים-סטנדרטיים-של-LIS (מבני-S0xx, Key-Figures, Time-Series), ושכבת-Fiori-המודרנית (אפליקציות-CDS תפעוליות, Overview-Pages-לתפקיד ואנליטיקה-בזמן-אמת). ב-S/4HANA הכובד-עובר-ל-Fiori — Embedded-Analytics-מול-HANA ללא-LIS-Setup — אך-הדיווח-הקלאסי-נשאר-רלוונטי-במקביל. שליטה-בשלושתן-מאפשרת-דיווח-איכות-מקצה-לקצה: מהבודק-ברצפה-עד-להערכת-ספק-ולהחלטות-הנהלה.",
      beginnerHe:
        "למדנו-שלוש-דרכים-לקבל-מידע-מ-QM: (1) הדרך-הקלאסית — רשימות-לוטים ב-QA32 עם-וריאנטים-והורדה-ל-Excel; (2) דוחות-LIS — סיכומים-מוכנים-למגמות; (3) Fiori — אפליקציות-מודרניות-בדפדפן-עם-גרפים-אינטראקטיביים. בפרויקט-S/4HANA-חדש-מתמקדים-ב-Fiori, אבל-טוב-להכיר-את-כולן.",
      consultantHe:
        "אסטרטגית-דיווח-QM ב-S/4HANA: העדף-Embedded-Analytics/CDS לדיווח-חדש (זמן-אמת, אין-Statistical-Setup, מבוסס-תפקיד); שמור-LIS להיסטוריה-ולמגמות-ארוכות-טווח-קיימות; השאר-דיווח-תפעולי-קלאסי-לתהליכי-המוניים-ולעבודות-רקע (וריאנטים). ודא-Business-Roles (SAP_BR_QUALITY_*), הפעלת-OData-ו-CDS, ו-Statistical-Setup-במיגרציה. אינטגרציה: UD↔Batch-status, QM-Score↔Supplier-Evaluation(MM), Defects↔CAPA/8D, Results↔Control-Charts(SPC).",
      purposeHe:
        "לספק-מפת-דרכים-לבחירת-כלי-הדיווח-הנכון-לכל-שאלה ולכל-תפקיד, ולהבטיח-מימוש-תקין-של-שלוש-השכבות.",
      processExampleHe:
        "תרחיש-מלא: בודק-רושם-תוצאות (Fiori-Record) ➔ מהנדס-מחליט-UD (Manage-UD) ➔ אצווה-משוחררת (Manage-Batches) ➔ מהנדס-מנתח-מגמה (Inspection-Lot-Analytics) ➔ מנהל-מעריך-ספק (Supplier-Evaluation) ➔ אי-התאמה-חוזרת-מניעה-CAPA (Nonconformance-Analytics).",
      cbcHe:
        "ב-CBC מחזור-איכות-מלא: בדיקת-אצווה-בקו ➔ שחרור-למלאי ➔ ניתוח-First-Pass-Yield-שבועי ➔ הערכת-ספקי-תרכיז/אריזה-רבעונית ➔ CAPA-לפגמים-חוזרים — כולו-על-Fiori-בזמן-אמת.",
      navHe: [
        "Fiori Launchpad ► Quality Management (תפעולי + Analytics + Overview)",
        "Logistics ► QM ► Info System (LIS/QMIS)",
        "Logistics ► QM ► Quality Inspection ► Inspection Lot ► Worklist (QA32/QA33)",
      ],
      tables: ["QALS", "QAMR", "QAVE", "QMEL", "S068"],
      tcodes: ["QA32", "QA33", "MCXA", "—"],
      fiori: ["F2424", "F2787", "F2332", "F2731", "F2339"],
      configHe: [
        "שכבה-תפעולית: Selection-Profiles, וריאנטים-גלובליים, Print-Control.",
        "שכבת-LIS: Info-Structures + Update-Rules + Statistical-Setup.",
        "שכבת-Fiori: Business-Roles + CDS/OData-activation + Smart-Business-KPIs.",
      ],
      flow: [
        { he: "רישום-תוצאות", note: "Fiori/QE51N" },
        { he: "החלטת-שימוש", note: "UD" },
        { he: "שחרור-אצווה", note: "Batch" },
        { he: "ניתוח-מגמה", note: "Analytics/LIS" },
        { he: "הערכת-ספק + CAPA" },
      ],
      mistakesHe: [
        "בחירת-כלי-לא-מתאים-לשאלה (LIS-למגמה, תפעולי-לפרטים-חיים, Fiori-לזמן-אמת).",
        "הזנחת-Statistical-Setup ➔ LIS-ריק לאחר-מיגרציה.",
        "אי-הקצאת-Business-Roles ➔ אפליקציות-Fiori-חסרות.",
      ],
      troubleshootHe: [
        "דיווח-ריק ➔ אבחן-שכבה: Setup(LIS)/הרשאה(Fiori)/Selection-Profile(תפעולי).",
        "אי-עקביות-בין-שכבות ➔ LIS-מצטבר-ואסינכרוני מול-תפעולי/Fiori-בזמן-אמת.",
        "אנליטיקה-איטית ➔ CDS-לא-ממוטב/חוסר-פילטר.",
      ],
      bestPracticeHe: [
        "מפה-שאלה ➔ שכבה ➔ כלי לפני-הריצה.",
        "ב-S/4HANA: Fiori-Analytics-ראשון, LIS-להיסטוריה, תפעולי-לרקע-ולהמוני.",
        "ודא-אינטגרציות (UD↔Batch, Score↔MM, Defects↔CAPA) פעילות.",
      ],
      interviewHe: [
        { qHe: "כיצד-בוחרים-בין-LIS, דיווח-תפעולי-ו-Fiori-Analytics?", aHe: "תפעולי (QA32) לפרטים-חיים-ולפעולה; LIS (MCXA) למגמות-ארוכות-קיימות; Fiori-Analytics לניתוח-בזמן-אמת-מבוסס-תפקיד. ב-S/4HANA-חדש Fiori-Analytics-מועדף — זמן-אמת ללא-Setup." },
        { qHe: "מהן-האינטגרציות-המרכזיות-של-דיווח-QM?", aHe: "UD↔Batch-status (שחרור), Quality-Score↔Supplier-Evaluation(MM), Defects↔CAPA/8D, Results↔Control-Charts(SPC) — דיווח-QM-אינו-מבודד אלא-מזין-ומוזן-משאר-המודולים." },
      ],
      takeawaysHe: [
        "שלוש-שכבות: תפעולי-קלאסי, LIS, ו-Fiori-Analytics — משלימות.",
        "ב-S/4HANA הכובד-ל-Fiori/Embedded-Analytics (זמן-אמת, ללא-Setup).",
        "מפה-שאלה ➔ שכבה ➔ כלי; ודא-Roles, CDS-ו-Setup.",
        "דיווח-QM-משולב: UD↔Batch, Score↔MM, Defects↔CAPA, Results↔SPC.",
      ],
      relatedHe: [
        { labelHe: "QM · יסודות הדיווח (18.1)", href: "/library/qm/chapter-18/#sub-18.1" },
        { labelHe: "QM · ניתוחים סטנדרטיים (18.2)", href: "/library/qm/chapter-18/#sub-18.2" },
        { labelHe: "QM · אפליקציות Fiori (18.4)", href: "/library/qm/chapter-18/#sub-18.4" },
      ],
    },
  ],
};
