// ===== PP/DS Digital Textbook — Chapter 6 (Detailed Scheduling) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Source hierarchy preserved exactly (ids + order); x.y.z nested under x.y.
// Transformative Hebrew (beginner + consultant friendly); SAP objects verbatim EN.
// CBC = Coca-Cola bottling finite detailed scheduling of fill lines with
// sequence-dependent flavor changeovers.
import type { TextbookChapter } from "./types";

export const CH6: TextbookChapter = {
  n: 6,
  titleHe: "תזמון מפורט (Detailed Scheduling)",
  titleEn: "Detailed Scheduling",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לתזמון-המפורט (Detailed Scheduling) ב-PP/DS של SAP S/4HANA. בעוד שתכנון-הייצור (פרק 5) קובע 'כמה' ו'מתי בערך' לייצר, התזמון-המפורט קובע את הסדר המדויק והעיתוי-לדקה של כל פעולה על כל משאב סופי (Finite), תוך כיבוד קיבולת, תלות-רצף ומגבלות. כל תת-פרק וכל תת-סעיף מהספר המקורי הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך מקצה-לקצה, דוגמת CBC (תזמון קווי-מילוי עם החלפות-טעם תלויות-רצף), ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, השפעת נתוני-אב, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: ללמוד מתי להשתמש ב-PP/DS לתזמון, לבנות אסטרטגיית-תזמון (DS strategy profile), להפעיל את ה-Detailed Scheduling Heuristics, להפעיל תזמון מ-Detailed Scheduling Planning Board / Advanced Scheduling Board / Resource Planning Table, ולהריץ את ה-Detailed Scheduling Optimizer — ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 6.1
    {
      id: "6.1",
      titleHe: "מתי להשתמש ב-PP/DS לתזמון",
      titleEn: "Determining When PP/DS Should Be Used for Scheduling",
      execHe:
        "ההחלטה הראשונה היא האם הארגון בכלל זקוק לתזמון-מפורט (Detailed Scheduling) ב-PP/DS. תזמון-מפורט מתאים כשהקיבולת היא צוואר-בקבוק אמיתי, כשרצף-הייצור משפיע על העלות (החלפות תלויות-רצף, Setup matrix), וכשנדרשת תוצאה ניתנת-לביצוע (Feasible) ברמת-הדקה על משאבים סופיים. אם המגבלה היא חומרים ולא קיבולת — MRP רגיל מספיק.",
      beginnerHe:
        "MRP אומר לך 'תייצר 10,000 בקבוקים עד יום חמישי'. תזמון-מפורט אומר 'תייצר אותם על קו 2, מ-08:00 עד 14:30, מיד אחרי הקולה ולפני הספרייט, כי החלפת-הטעם הזו קצרה יותר'. השאלה היא האם רמת-הפירוט הזו שווה את המאמץ. אם יש לך מכונה אחת עמוסה שכל שעה עליה יקרה — כן. אם פשוט קונים חומרים בזמן — כנראה לא.",
      consultantHe:
        "PP/DS Detailed Scheduling נדרש כאשר: (1) המשאב מתוכנן Finite (Finite Scheduling דרך Resource → 'Finite Scheduling' ב-/SAPAPO/RES01), (2) קיים תלות-רצף דרך Setup Matrix/Setup Groups, (3) נדרש Pegging דינמי לבדיקת-היתכנות, או (4) קיים אופק-PP/DS (PP/DS horizon) שבתוכו רוצים תזמון סופי. השווה מול MRP Live (ב-S/4HANA הליבה) — MRP מתכנן infinite ברירת-מחדל. שקול עלות-תחזוקה: Resources, Setup Matrices, DS strategy profiles ו-Optimization profiles דורשים תחזוקה. בלי צוואר-בקבוק קיבולתי או רצף-משמעותי, התזמון-המפורט הוא over-engineering.",
      purposeHe:
        "למקד את ההשקעה: להפעיל תזמון-מפורט רק היכן שהוא מייצר ערך — צמצום זמני-Setup, ניצול-משאב גבוה יותר, ועמידה בתאריכי-לקוח ברמת-ביצוע אמיתית — ולא להעמיס מורכבות על תהליכים שבהם החומר, ולא הקיבולת, הוא האילוץ.",
      processExampleHe:
        "מפעל עם משאב-מפתח עמוס מגדיר את המשאב כ-Finite, מסמן את החומרים הרלוונטיים ב-PP/DS דרך Advanced Planning, ומגדיר אופק-PP/DS של 4 שבועות. בתוך האופק, MRP Live מעביר את התכנון ל-PP/DS שמתזמן סופית; מחוץ לאופק נשאר תכנון infinite. כך משאב צוואר-הבקבוק מקבל תזמון-לדקה והשאר נשאר פשוט.",
      cbcHe:
        "ב-CBC קווי-המילוי הם צוואר-בקבוק קלאסי: כל מעבר מטעם לטעם (קולה→ספרייט→דיאט) דורש שטיפת-CIP בזמן ועלות שונים לפי הזוג. לכן קווי-המילוי מוגדרים Finite ומתוזמנים ב-PP/DS Detailed Scheduling, בעוד מחסני-התרכיז והאריזה (מוגבלי-חומר, לא מוגבלי-קיבולת) נשארים בתכנון MRP רגיל.",
      navHe: [
        "SAP APO ► Advanced Planning and Optimization ► Supply Chain Planning ► PP/DS ► Global Settings ► Maintain Global Parameters and Defaults",
        "Production ► Production Planning ► PP/DS ► Resource ► Define Resource as Finite (/SAPAPO/RES01)",
        "Master Data ► Product ► Set PP/DS Horizon and Advanced Planning indicator (/SAPAPO/MAT1)",
      ],
      tables: ["/SAPAPO/RESOURCE", "/SAPAPO/MATKEY", "/SAPAPO/ORDKEY", "MARC"],
      tcodes: ["/SAPAPO/RES01", "/SAPAPO/MAT1", "/SAPAPO/CDPS0", "MD01N"],
      fiori: ["F2336", "F4006"],
      configHe: [
        "סמן Resource כ-Finite Scheduling (/SAPAPO/RES01) — רק משאב סופי מקבל תזמון-מפורט אמיתי.",
        "הגדר PP/DS Horizon לחומר (MRP4 / /SAPAPO/MAT1) — האופק שבתוכו פעיל תזמון-מפורט.",
        "סמן Advanced Planning לחומרי-PP/DS כדי שייכנסו לאזור-העבודה של התזמון.",
        "החלט מדיניות: Finite מההתחלה, או תכנון infinite ואז Detailed Scheduling להסרת-עומסים (Backlog).",
      ],
      flow: [
        { he: "האם יש צוואר-בקבוק קיבולתי?", note: "לא ➔ MRP מספיק" },
        { he: "האם הרצף משפיע (Setup Matrix)?", code: "Setup Groups" },
        { he: "סמן משאב Finite", code: "/SAPAPO/RES01" },
        { he: "הגדר PP/DS Horizon + Advanced Planning", code: "/SAPAPO/MAT1" },
        { he: "תכנון ב-PP/DS + תזמון מפורט", code: "/SAPAPO/CDPS0" },
      ],
      masterDataHe: [
        "Resource: Finite Scheduling flag, Bucket/Time-continuous capacity, Setup Matrix assignment.",
        "Product (PP/DS view): PP/DS Horizon, Advanced Planning, Strategy Profile, Heuristic default.",
      ],
      mistakesHe: [
        "הפעלת תזמון-מפורט גורפת על משאבים שאינם צוואר-בקבוק — מורכבות ללא ערך.",
        "הגדרת משאב Finite אך השארתו ללא Setup Matrix — מאבדים את עיקר היתרון (רצף).",
        "PP/DS Horizon קצר מדי — חלק מהפעולות נשאר בתכנון infinite ולא מתוזמן סופית.",
        "בלבול בין MRP Live (infinite ברירת-מחדל) לבין תזמון-מפורט Finite ב-PP/DS.",
      ],
      troubleshootHe: [
        "פעולות לא מקבלות תזמון-לדקה ➔ המשאב אינו Finite או החומר מחוץ ל-PP/DS Horizon.",
        "החלפות-טעם לא משפיעות על הרצף ➔ חסר Setup Matrix/Setup Group על המשאב.",
        "החומר לא מופיע ב-Detailed Scheduling Planning Board ➔ Advanced Planning לא מסומן.",
        "תזמון 'נדבק' ל-infinite ➔ אסטרטגיה ב-DS strategy profile עם Infinite Scheduling.",
      ],
      bestPracticeHe: [
        "הפעל תזמון-מפורט ממוקד — רק על משאבי צוואר-בקבוק שבהם הרצף/הקיבולת קריטיים.",
        "התחל פשוט: Finite + Heuristic, והוסף Optimizer רק כשהרצף מורכב באמת.",
        "תאם PP/DS Horizon לאופק-ההחלטה האמיתי של רצפת-הייצור.",
        "תעד את הקריטריון 'מתי PP/DS' כדי שכל חומר חדש יסווג נכון.",
      ],
      interviewHe: [
        { qHe: "מתי תזמון-מפורט ב-PP/DS מוצדק?", aHe: "כשהקיבולת היא צוואר-בקבוק, כשהרצף משפיע על העלות (Setup Matrix תלוי-רצף), או כשנדרשת תוצאה ניתנת-לביצוע ברמת-הדקה על משאב Finite. אם האילוץ הוא חומר ולא קיבולת — MRP מספיק." },
        { qHe: "מה ההבדל בין MRP Live לבין Detailed Scheduling?", aHe: "MRP Live מתכנן ברירת-מחדל infinite (מתעלם מקיבולת), קובע כמויות ותאריכים. Detailed Scheduling מתזמן סופית (Finite) על המשאב, קובע סדר ועיתוי-לדקה תוך כיבוד קיבולת ורצף." },
        { qHe: "מהו PP/DS Horizon ומדוע הוא חשוב לתזמון?", aHe: "האופק שבתוכו פעיל התכנון/תזמון של PP/DS; פעולות בתוכו מתוזמנות סופית, מחוצה לו נשארות בתכנון infinite. אם הוא קצר מדי, חלק מהעבודה לא מקבל תזמון-מפורט." },
      ],
      takeawaysHe: [
        "תזמון-מפורט קובע סדר ועיתוי-לדקה על משאב Finite — לא 'כמה', אלא 'מתי בדיוק ובאיזה סדר'.",
        "הפעל אותו היכן שהקיבולת/הרצף קריטיים; אחרת MRP מספיק.",
        "תנאי-סף: משאב Finite + Advanced Planning + PP/DS Horizon מתאים.",
        "ב-CBC קווי-המילוי (החלפות-טעם תלויות-רצף) הם המקרה הקלאסי.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · תכנון ייצור (פרק 5)", href: "/library/ppds/chapter-05/" },
        { labelHe: "PP/DS · אסטרטגיית תזמון (6.2)", href: "/library/ppds/chapter-06/#sub-6.2" },
      ],
    },
    // ============================================================ 6.2
    {
      id: "6.2",
      titleHe: "יצירת אסטרטגיית תזמון מפורט",
      titleEn: "Creating a Detailed Scheduling Strategy",
      execHe:
        "אסטרטגיית-התזמון (DS strategy profile) היא הכלל המרכזי שקובע כיצד המערכת ממקמת פעולות על משאב: לאיזה כיוון לתזמן (קדימה/אחורה), כיצד להתמודד עם התנגשויות, האם לדחוף פעולות קיימות, ואיך לטפל בתלויות. כל פעולת-תזמון — ידנית מהלוח, אוטומטית מ-Heuristic, או מ-Optimizer — נשענת על האסטרטגיה הפעילה. אסטרטגיה שגויה = תזמון לא-צפוי גם כשכל השאר תקין.",
      beginnerHe:
        "כשאתה גורר פעולה על לוח-התזמון, המערכת צריכה לדעת מה לעשות אם יש שם כבר משהו: לדחוף את הקיים? למצוא חור פנוי? לתזמן אחורה מתאריך-היעד? כל הכללים האלה ארוזים ב'פרופיל-אסטרטגיה' (DS strategy profile). אתה בוחר פרופיל פעם אחת, וכל פעולה תתנהג לפיו.",
      consultantHe:
        "ה-DS strategy profile (תחזוקה ב-/SAPAPO/CDPSC1) מורכב משלושה אזורים: (1) General Strategy Parameters — Scheduling mode (Find slot / Insert+desired date / Squeeze in), Planning direction, Finite/Infinite, Non-working times; (2) Strategy Parameters for Dependent Objects — האם והיכן לתזמן-מחדש פעולות תלויות ב-Pegging (קדם/עוקב); (3) שיוך-Strategy. הפרופיל מקושר למשתמש/לתפקיד ב-Overall profile ולכל Heuristic/Optimizer יש אסטרטגיה משלהם. שים לב: Insert operation (Squeeze in) דוחף פעולות קיימות ועלול לגרור 'אפקט-דומינו'.",
      purposeHe:
        "לתת התנהגות-תזמון אחידה, צפויה ומבוקרת לכל מי שמתזמן — מתכנן ידני, Heuristic ו-Optimizer — כך שהתוצאה תהיה עקבית וניתנת-לשחזור, ולא תלויה ב'איך כל אחד גורר'.",
      processExampleHe:
        "מתכנן בוחר אסטרטגיה 'Find slot' עם תזמון-אחורה: בעת מיקום פעולה, המערכת מחפשת את החלון הפנוי האחרון לפני תאריך-היעד מבלי לדחוף פעולות קיימות. אם הוא מחליף ל'Insert operation', אותה גרירה תדחוף את כל הפעולות הבאות קדימה כדי לפנות מקום.",
      cbcHe:
        "ב-CBC המתכנן הראשי משתמש באסטרטגיה 'Find slot, backward, Finite' כדי לסדר אצוות-מילוי לפני תאריכי-המשלוח מבלי לשבש פעולות שכבר אושרו; לתרחישי-חירום (הזמנה דחופה) הוא עובר זמנית ל-'Insert operation' כדי לדחוס אצווה ולדחוף את היתר.",
      navHe: [
        "Production ► Production Planning ► PP/DS ► Detailed Scheduling ► Strategy ► Maintain Strategy Profile (/SAPAPO/CDPSC1)",
        "SAP APO ► Supply Chain Planning ► PP/DS ► Detailed Scheduling ► Maintain Overall Profile",
        "Detailed Scheduling Planning Board ► Settings ► Strategy",
      ],
      tables: ["/SAPAPO/CDPSPARA", "/SAPAPO/ATPCAT", "/SAPAPO/ORDKEY"],
      tcodes: ["/SAPAPO/CDPSC1", "/SAPAPO/CDPS0", "/SAPAPO/CDPSB0"],
      fiori: ["F2336"],
      configHe: [
        "תחזק DS strategy profile ב-/SAPAPO/CDPSC1: בחר Scheduling mode, Planning direction ו-Finite/Infinite.",
        "שייך את הפרופיל ל-Overall profile (לוח-התזמון) ולמשתמש/תפקיד.",
        "הגדר טיפול ב-Non-working times וב-Dependent objects (Pegging).",
        "ודא שכל Heuristic/Optimizer מצביע על אסטרטגיה עקבית.",
      ],
      flow: [
        { he: "בחר Scheduling mode", code: "Find slot / Insert" },
        { he: "בחר כיוון-תכנון", code: "Forward / Backward" },
        { he: "Finite / Infinite", note: "סופי על המשאב?" },
        { he: "טיפול בתלויות (Pegging)", code: "Dependent objects" },
        { he: "שייך ללוח/למשתמש", code: "Overall profile" },
      ],
      masterDataHe: [
        "DS strategy profile מקושר ל-Overall profile של ה-Detailed Scheduling Planning Board.",
        "ניתן לשייך אסטרטגיות שונות ל-Heuristic, ל-Optimizer ולתזמון-ידני.",
      ],
      mistakesHe: [
        "שימוש ב-'Insert operation' כברירת-מחדל ➔ אפקט-דומינו וזחילת-תאריכים.",
        "אסטרטגיית-תזמון לא עקבית בין Heuristic לבין הלוח-הידני ➔ תוצאות סותרות.",
        "השארת Infinite בפרופיל בעוד המשאב Finite ➔ עומסים שלא מטופלים.",
        "התעלמות מ-Non-working times ➔ פעולות מתוזמנות במשמרת-לילה סגורה.",
      ],
      troubleshootHe: [
        "פעולה מתוזמנת בכיוון הלא-נכון ➔ Planning direction בפרופיל.",
        "גרירה דוחפת את כל היומן ➔ Scheduling mode = Insert operation.",
        "נוצרים עומסי-יתר על המשאב ➔ הפרופיל ב-Infinite במקום Finite.",
        "פעולה נופלת על יום-סגור ➔ הגדרת Non-working times באסטרטגיה.",
      ],
      bestPracticeHe: [
        "הגדר אסטרטגיית-ברירת-מחדל אחת ברורה לכל המתכננים והפעל חריגות ביודעין.",
        "שמור על עקביות בין אסטרטגיית-הלוח, ה-Heuristics וה-Optimizer.",
        "העדף 'Find slot' לעבודה שוטפת; שמור 'Insert' לחירום.",
        "תעד את משמעות כל פרופיל-אסטרטגיה לארגון.",
      ],
      interviewHe: [
        { qHe: "מהו DS strategy profile?", aHe: "פרופיל-אסטרטגיה המגדיר כיצד פעולות ממוקמות על המשאב — Scheduling mode (Find slot/Insert), כיוון (Forward/Backward), Finite/Infinite, וטיפול בתלויות. כל פעולת-תזמון נשענת עליו." },
        { qHe: "מה ההבדל בין 'Find slot' ל-'Insert operation'?", aHe: "'Find slot' ממקמת בפעולה בחלון פנוי בלי לדחוף קיימות; 'Insert operation' דוחס את הפעולה ודוחפת את הקיימות קדימה — עלול לגרור אפקט-דומינו." },
        { qHe: "מדוע חשוב שכל Heuristic/Optimizer יחלוק אסטרטגיה עקבית?", aHe: "אחרת אותו תרחיש יניב תוצאות שונות לפי מי שתיזמן — מתכנן ידני מול Heuristic מול Optimizer — ופוגע בעקביות ובאמינות התכנון." },
      ],
      takeawaysHe: [
        "DS strategy profile = הכלל המרכזי לכל מיקום-פעולה.",
        "שלושה אזורים: General params, Dependent objects, ושיוך.",
        "'Find slot' לעבודה שוטפת, 'Insert' לחירום בלבד.",
        "עקביות בין לוח, Heuristic ו-Optimizer היא קריטית.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · Heuristics לתזמון (6.3)", href: "/library/ppds/chapter-06/#sub-6.3" },
        { labelHe: "PP/DS · Detailed Scheduling Optimizer (6.5)", href: "/library/ppds/chapter-06/#sub-6.5" },
      ],
      children: [
        {
          id: "6.2.1",
          titleHe: "פרופילי אסטרטגיה",
          titleEn: "Strategy Profiles",
          execHe:
            "פרופיל-האסטרטגיה (Strategy Profile) הוא העטיפה הניתנת-לשיוך שמרכזת את כל פרמטרי-התזמון לישות אחת בעלת-שם. אותו פרופיל ניתן לשייך למתכנן, ללוח-תזמון, ל-Heuristic ול-Optimizer — וכך לאכוף התנהגות-תזמון אחידה בכל הערוצים.",
          beginnerHe:
            "במקום להגדיר את כללי-התזמון מחדש בכל מקום, אורזים אותם ב'פרופיל' עם שם, ומשתמשים בו שוב ושוב. כמו 'תבנית-הגדרות' לתזמון.",
          consultantHe:
            "מתוחזק ב-/SAPAPO/CDPSC1. כל פרופיל נושא את ה-General parameters וה-Dependent-object parameters. הפרופיל משויך דרך ה-Overall profile ללוח-התזמון, ובנפרד לכל Heuristic (בהגדרת ה-Heuristic) ול-Optimization profile. אסטרטגיה זמנית ניתן להחליף ad-hoc בלוח דרך Settings → Strategy מבלי לשנות את ההגדרה הקבועה.",
          purposeHe:
            "לאפשר ניהול ריכוזי וניתן-לשימוש-חוזר של התנהגות-התזמון, ולמנוע פיזור-הגדרות שמוביל לחוסר-עקביות.",
          processExampleHe:
            "אדמין יוצר פרופיל 'CBC_FILL_STD' (Find slot, backward, Finite) ומשייך אותו ללוח של מתכנני-המילוי וגם ל-Heuristic של תזמון-הרצף. כל המתכננים מקבלים אוטומטית אותה התנהגות.",
          cbcHe:
            "ב-CBC מוגדרים שני פרופילים: 'CBC_FILL_STD' לעבודה שוטפת ו-'CBC_RUSH' (Insert operation) לתרחישי הזמנה-דחופה; המתכנן בוחר ביניהם לפי המצב.",
          navHe: [
            "Production ► PP/DS ► Detailed Scheduling ► Strategy ► Maintain Strategy Profile (/SAPAPO/CDPSC1)",
            "Detailed Scheduling Planning Board ► Settings ► Strategy",
          ],
          tables: ["/SAPAPO/CDPSPARA"],
          tcodes: ["/SAPAPO/CDPSC1", "/SAPAPO/CDPS0"],
          fiori: ["F2336"],
          configHe: [
            "צור פרופיל-אסטרטגיה בעל-שם ב-/SAPAPO/CDPSC1.",
            "שייך אותו ל-Overall profile (לוח), ל-Heuristic ול-Optimization profile.",
            "הגדר אפשרות להחלפת-אסטרטגיה זמנית בלוח (ad-hoc).",
          ],
          mistakesHe: [
            "ריבוי פרופילים כמעט-זהים ➔ בלבול ותחזוקה כפולה.",
            "שינוי הפרופיל הקבוע במקום החלפה זמנית בלוח ➔ השפעה לא-מכוונת על כולם.",
          ],
          troubleshootHe: [
            "התנהגות-תזמון לא-צפויה ➔ ודא איזה פרופיל פעיל בלוח/Heuristic.",
            "שינוי לא 'תפס' ➔ הפרופיל לא שויך ל-Overall profile הנכון.",
          ],
          bestPracticeHe: [
            "מספר מצומצם של פרופילים בעלי-שם משמעותי (Std/Rush).",
            "השתמש בהחלפה זמנית בלוח לחריגים במקום לשכפל פרופילים.",
          ],
          interviewHe: [
            { qHe: "מהו Strategy Profile ולמה הוא משויך?", aHe: "עטיפה בעלת-שם של פרמטרי-התזמון; משויכת ללוח (Overall profile), ל-Heuristic ול-Optimization profile כדי לאכוף התנהגות אחידה." },
            { qHe: "כיצד משנים אסטרטגיה לתרחיש חד-פעמי?", aHe: "דרך Settings → Strategy בלוח-התזמון — החלפה זמנית בלי לשנות את ההגדרה הקבועה." },
          ],
          takeawaysHe: [
            "Strategy Profile = עטיפה ניתנת-לשימוש-חוזר של פרמטרי-התזמון.",
            "משויך ללוח, Heuristic ו-Optimizer יחד.",
            "החלפה זמנית בלוח לחריגים.",
          ],
          relatedHe: [{ labelHe: "PP/DS · פרמטרי אסטרטגיה כלליים (6.2.2)", href: "/library/ppds/chapter-06/#sub-6.2.2" }],
        },
        {
          id: "6.2.2",
          titleHe: "פרמטרי אסטרטגיה כלליים",
          titleEn: "General Strategy Parameters",
          execHe:
            "הפרמטרים-הכלליים הם לב-האסטרטגיה: Scheduling mode (כיצד למקם פעולה ביחס לקיימות), Planning direction (קדימה/אחורה), Finite/Infinite, וטיפול ב-Non-working times. הם קובעים את ההתנהגות הבסיסית של כל פעולת-תזמון על המשאב.",
          beginnerHe:
            "אלה ההגדרות הגדולות: לאיזה כיוון לתזמן (מהיום קדימה, או מתאריך-היעד אחורה), האם לכבד קיבולת (Finite), ומה לעשות אם אין מקום — לדחוף, או לחפש חור. רוב ההתנהגות שאתה מרגיש בלוח מגיעה מכאן.",
          consultantHe:
            "Scheduling mode עיקריים: 'Find slot' (חיפוש חלון פנוי, לא דוחף), 'Insert operation / Squeeze in' (דחיסה ודחיפת-קיימות), 'Append' (בסוף התור), 'Desired date' (תזמן לתאריך-המבוקש גם אם נוצר עומס). Planning direction = Forward (מתאריך-התחלה) או Backward (מתאריך-סיום). Finite scheduling מכבד קיבולת; Infinite מתעלם. נוסף: Non-working times (לדלג/לא), Time-continuous capacity, ו-Reverse temporal scheduling. השילוב הנפוץ והבטוח הוא Find slot + Backward + Finite.",
          purposeHe:
            "לקבוע את התנהגות-הליבה של התזמון — כיוון, כיבוד-קיבולת ואופן-המיקום — בצורה מפורשת ומבוקרת.",
          processExampleHe:
            "מתכנן ב-Find slot + Backward + Finite גורר פעולה: המערכת מחפשת אחורה מתאריך-היעד את החלון-הפנוי האחרון על המשאב מבלי לחרוג מהקיבולת ומבלי לדחוף פעולות שכנות.",
          cbcHe:
            "ב-CBC ברירת-המחדל היא Find slot + Backward + Finite — אצוות-המילוי 'נצמדות' לתאריך-המשלוח מבלי לשבור את הקיבולת של הקו; Non-working times מוגדר 'דלג' כדי לא לתזמן במשמרת-לילה סגורה.",
          navHe: [
            "Production ► PP/DS ► Detailed Scheduling ► Strategy ► Maintain Strategy Profile ► General Parameters (/SAPAPO/CDPSC1)",
          ],
          tables: ["/SAPAPO/CDPSPARA"],
          tcodes: ["/SAPAPO/CDPSC1"],
          fiori: ["F2336"],
          configHe: [
            "בחר Scheduling mode: Find slot / Insert operation / Append / Desired date.",
            "בחר Planning direction: Forward / Backward.",
            "סמן Finite scheduling לכיבוד-קיבולת; הגדר טיפול ב-Non-working times.",
            "הפעל Time-continuous capacity במקום Bucket היכן שנדרש דיוק-לדקה.",
          ],
          flow: [
            { he: "Scheduling mode", code: "Find slot / Insert" },
            { he: "Planning direction", code: "Backward / Forward" },
            { he: "Finite scheduling", note: "כיבוד קיבולת" },
            { he: "Non-working times", code: "דלג / אל-תדלג" },
          ],
          mistakesHe: [
            "Forward כשהדרישה היא תאריך-סיום ➔ סיום מוקדם/מאוחר לא-רצוי.",
            "Infinite בטעות ➔ עומסי-יתר שלא מנוהלים.",
            "Insert כברירת-מחדל ➔ זחילת-תאריכים מתמשכת.",
          ],
          troubleshootHe: [
            "פעולה מסתיימת אחרי תאריך-היעד ➔ כיוון Forward במקום Backward.",
            "עומס-יתר מופיע ➔ Finite לא מסומן.",
            "פעולות במשמרת-סגורה ➔ Non-working times לא מוגדר 'דלג'.",
          ],
          bestPracticeHe: [
            "השתמש ב-Find slot + Backward + Finite כברירת-מחדל בטוחה.",
            "הפעל Time-continuous capacity היכן שדרוש תזמון-לדקה.",
            "שמור Forward לתרחישי 'התחל מוקדם ככל האפשר'.",
          ],
          interviewHe: [
            { qHe: "מהם הפרמטרים-הכלליים החשובים באסטרטגיה?", aHe: "Scheduling mode (Find slot/Insert/Append/Desired date), Planning direction (Forward/Backward), Finite/Infinite, וטיפול ב-Non-working times." },
            { qHe: "מהו השילוב הבטוח לעבודה שוטפת?", aHe: "Find slot + Backward + Finite — מצמיד פעולות לתאריך-היעד, מכבד קיבולת, ולא דוחף פעולות קיימות." },
          ],
          takeawaysHe: [
            "Scheduling mode + Direction + Finite = התנהגות-הליבה.",
            "Find slot + Backward + Finite = ברירת-מחדל בטוחה.",
            "Non-working times מונע תזמון במשמרות-סגורות.",
          ],
        },
        {
          id: "6.2.3",
          titleHe: "פרמטרי אסטרטגיה לאובייקטים תלויים",
          titleEn: "Strategy Parameters for Dependent Objects",
          execHe:
            "כאשר מתזמנים פעולה, ה-Pegging מקשר אותה לפעולות קדם (אספקה) ועוקבות (דרישה). הפרמטרים-לאובייקטים-תלויים קובעים האם והיכן לתזמן-מחדש את הפעולות התלויות בעקבות השינוי — כדי לשמור על שרשרת-ייצור עקבית ולא 'לשבור' את ה-Pegging.",
          beginnerHe:
            "פעולה אחת לא חיה לבד — לפניה צריך להכין חומר, ואחריה משהו ממתין לה. אם תזיז פעולה, מה קורה לשכנותיה? הפרמטרים האלה אומרים אם לגרור גם אותן יחד, או להשאיר אותן במקום (ואז ה-Pegging עלול 'להישבר').",
          consultantHe:
            "מבוסס על Pegging דינמי. ההגדרות קובעות: האם לתזמן-מחדש פעולות-קדם (Predecessors) ו/או עוקבות (Successors), עד איזה עומק (Propagation), והאם לכבד אילוצי-זמן ביניהן (Minimum/Maximum intervals). 'Schedule dependent objects' מבטיח שגרירת פעולה תגרור גם את האספקה/הדרישה הקשורות. ללא זה — נוצרות התנגשויות-לוגיות (דרישה לפני אספקה) שה-Multilevel Scheduling Heuristic אמור לפתור.",
          purposeHe:
            "לשמור על עקביות-הרצף לאורך שרשרת-ה-Pegging בעת תזמון, כדי שהתוצאה תישאר ניתנת-לביצוע (Feasible) ולא רק 'נראית טוב' על משאב בודד.",
          processExampleHe:
            "מתכנן דוחה פעולת-מילוי בשעתיים. עם 'Schedule dependent objects' פעיל, פעולת-הערבוב שמזינה אותה (Predecessor) נדחית בהתאם, ופעולת-האריזה שאחריה (Successor) זזה גם — כל השרשרת נשארת עקבית.",
          cbcHe:
            "ב-CBC דחיית-מילוי גוררת אוטומטית את הכנת-התרכיז (קדם) ואת האריזה (עוקב), כך שאצוות-המשקה נשארת רציפה ולא נוצרת אריזה לפני שהמשקה מוכן.",
          navHe: [
            "Production ► PP/DS ► Detailed Scheduling ► Strategy ► Maintain Strategy Profile ► Dependent Objects (/SAPAPO/CDPSC1)",
          ],
          tables: ["/SAPAPO/CDPSPARA", "/SAPAPO/PEGID"],
          tcodes: ["/SAPAPO/CDPSC1", "/SAPAPO/PEG1"],
          fiori: ["F2336"],
          configHe: [
            "הפעל Schedule dependent objects לתזמון-מחדש של פעולות תלויות.",
            "קבע כיוון: Predecessors ו/או Successors.",
            "הגדר עומק-Propagation וכיבוד Minimum/Maximum intervals.",
          ],
          mistakesHe: [
            "כיבוי תזמון-תלויות ➔ דרישה מתוזמנת לפני אספקה (Pegging שבור).",
            "Propagation עמוק מדי ➔ גרירת חצי-המפעל בעקבות שינוי קטן.",
            "התעלמות מ-Min/Max intervals ➔ פערי-זמן לא-ריאליים בין פעולות.",
          ],
          troubleshootHe: [
            "אספקה אחרי דרישה ➔ Schedule dependent objects כבוי.",
            "שינוי קטן 'מזיז הכל' ➔ עומק-Propagation גבוה מדי.",
            "פערי-זמן לא-הגיוניים בין פעולות ➔ אילוצי-Interval לא מוגדרים.",
          ],
          bestPracticeHe: [
            "הפעל תזמון-תלויות לשמירת-Pegging, אך הגבל את עומק-ה-Propagation.",
            "כבד Min/Max intervals כדי לשמור על מרווחי-זמן ריאליים.",
            "השתמש ב-Multilevel Scheduling Heuristic ליישוב התנגשויות רב-שלביות.",
          ],
          interviewHe: [
            { qHe: "מה מטרת הפרמטרים לאובייקטים-תלויים?", aHe: "לקבוע האם והיכן לתזמן-מחדש פעולות קדם/עוקבות הקשורות ב-Pegging בעקבות שינוי, כדי לשמור שרשרת-ייצור עקבית וניתנת-לביצוע." },
            { qHe: "מה קורה אם מכבים תזמון-תלויות?", aHe: "פעולות תלויות נשארות במקומן, וה-Pegging עלול 'להישבר' — למשל דרישה מתוזמנת לפני האספקה שלה. נדרש Multilevel Scheduling Heuristic ליישוב." },
          ],
          takeawaysHe: [
            "Pegging מקשר פעולות לקדם/עוקבות.",
            "תזמון-תלויות שומר את השרשרת עקבית בעת שינוי.",
            "הגבל Propagation וכבד Min/Max intervals.",
          ],
          relatedHe: [{ labelHe: "PP/DS · Multilevel Scheduling Framework (6.3.5)", href: "/library/ppds/chapter-06/#sub-6.3.5" }],
        },
      ],
    },
    // ============================================================ 6.3
    {
      id: "6.3",
      titleHe: "מינוף Heuristics לתזמון מפורט",
      titleEn: "Leveraging Detailed Scheduling Heuristics",
      execHe:
        "Heuristic הוא אלגוריתם-תזמון ממוקד וניתן-להרצה הפותר בעיה אחת ('סדר רצף', 'הסר עומס', 'מזער זמן-ריצה') במהירות וביעילות. בניגוד ל-Optimizer (שמחפש פתרון אופטימלי לפי פונקציות-מטרה), ה-Heuristic מיישם כלל פשוט ומהיר. זהו הכלי היומיומי של המתכנן לסידור הרצף על המשאב.",
      beginnerHe:
        "Heuristic הוא 'כפתור חכם': לחיצה אחת מסדרת את הפעולות לפי כלל מסוים — למשל 'סדר הכל לפי תאריך-יעד' או 'דחוף החוצה את כל מה שכבר באיחור'. זה לא מחפש את הפתרון המושלם, אלא מיישם כלל טוב ומהיר.",
      consultantHe:
        "Heuristics מתוחזקים ב-/SAPAPO/CDPSC0 ומורצים מהלוח (/SAPAPO/CDPS0) או ב-Production Planning Run. כל Heuristic נושא פרופיל-פרמטרים ואסטרטגיה. משפחות-המפתח של Detailed Scheduling: Schedule Sequence, Remove Backlog, Schedule Operations, Minimize Runtime, Multilevel Scheduling Framework, Multiresource Scheduling, ו-Demand-Driven scheduling. מריצים על Planning object (משאב/פעולות נבחרות). Heuristics ניתנים לשרשור ב-Heuristic profile ('Sequence of Heuristics'), למשל: סדר-רצף ➔ הסר-Backlog ➔ מזער-זמן-ריצה.",
      purposeHe:
        "לתת למתכנן כלים מהירים, צפויים וניתנים-לשרשור לסידור הרצף וטיפול-בעומסים — ללא צורך בהרצת-Optimizer כבדה לכל פעולה יומיומית.",
      processExampleHe:
        "מתכנן בוחר את כל הפעולות על המשאב ב-Detailed Scheduling Planning Board ומריץ 'Schedule Sequence' למיון לפי תאריך-יעד; אז מריץ 'Remove Backlog' לדחיפת פעולות-איחור קדימה; ולבסוף 'Minimize Runtime' לצמצום-Setup.",
      cbcHe:
        "ב-CBC המתכנן מריץ שרשרת-Heuristics על קו-המילוי: סידור-רצף לפי תאריך-משלוח, ואז 'Minimize Runtime' שמקבץ טעמים-דומים יחד כדי לצמצם שטיפות-CIP בין החלפות-טעם.",
      navHe: [
        "Production ► PP/DS ► Detailed Scheduling ► Heuristics ► Maintain Heuristics (/SAPAPO/CDPSC0)",
        "Detailed Scheduling Planning Board ► Functions ► Heuristics (/SAPAPO/CDPS0)",
        "SAP APO ► PP/DS ► Production Planning Run (/SAPAPO/CDPSB0)",
      ],
      tables: ["/SAPAPO/HEUR", "/SAPAPO/CDPSPARA", "/SAPAPO/ORDKEY"],
      tcodes: ["/SAPAPO/CDPSC0", "/SAPAPO/CDPS0", "/SAPAPO/CDPSB0"],
      fiori: ["F2336", "F4006"],
      configHe: [
        "תחזק Heuristics ופרופילי-פרמטרים ב-/SAPAPO/CDPSC0.",
        "שייך אסטרטגיה (DS strategy profile) לכל Heuristic.",
        "בנה Heuristic profile (Sequence of Heuristics) לשרשור.",
        "שייך Heuristic ברירת-מחדל לחומר/למשאב או ל-Production Planning Run.",
      ],
      flow: [
        { he: "בחר Planning object", code: "משאב/פעולות" },
        { he: "בחר Heuristic", code: "/SAPAPO/CDPSC0" },
        { he: "הרץ מהלוח", code: "/SAPAPO/CDPS0" },
        { he: "שרשר Heuristics", code: "Heuristic profile" },
        { he: "בדוק תוצאה / Alerts", code: "Alert Monitor" },
      ],
      masterDataHe: [
        "כל Heuristic נושא Parameter profile + DS strategy profile.",
        "ניתן לשייך Heuristic ברירת-מחדל ברמת-חומר (PP/DS view) או משאב.",
      ],
      mistakesHe: [
        "הרצת Optimizer לכל משימה יומיומית במקום Heuristic מהיר.",
        "שרשור-Heuristics בסדר שגוי ➔ תוצאה גרועה מהקלט.",
        "Heuristic ללא אסטרטגיה תואמת ➔ התנהגות לא-צפויה.",
        "הרצה על קבוצת-אובייקטים שגויה ➔ פעולות לא-רצויות מושפעות.",
      ],
      troubleshootHe: [
        "ה-Heuristic 'לא עשה כלום' ➔ קבוצת-Planning object ריקה או פילטר שגוי.",
        "תוצאה לא-צפויה ➔ אסטרטגיה לא תואמת ל-Heuristic.",
        "עומסים נשארו ➔ לא הורץ Remove Backlog/Schedule Sequence אחרי השינוי.",
      ],
      bestPracticeHe: [
        "העדף Heuristics לעבודה שוטפת; שמור Optimizer לבעיות-רצף מורכבות.",
        "בנה Heuristic profile סדור (רצף ➔ Backlog ➔ Runtime).",
        "ודא שכל Heuristic חולק אסטרטגיה עקבית עם הלוח.",
        "בדוק תוצאות מול Alert Monitor אחרי כל הרצה.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Heuristic ל-Optimizer ב-Detailed Scheduling?", aHe: "Heuristic מיישם כלל פשוט ומהיר לבעיה אחת (סדר/Backlog/Runtime) ומריץ במהירות; Optimizer מחפש פתרון אופטימלי לפי פונקציות-מטרה משוקללות — חזק יותר אך כבד יותר." },
        { qHe: "כיצד משרשרים Heuristics?", aHe: "דרך Heuristic profile (Sequence of Heuristics) — למשל Schedule Sequence ➔ Remove Backlog ➔ Minimize Runtime — שמורץ כיחידה אחת." },
        { qHe: "מהיכן מריצים Heuristic?", aHe: "מה-Detailed Scheduling Planning Board (/SAPAPO/CDPS0) על Planning object נבחר, או ברקע כחלק מ-Production Planning Run (/SAPAPO/CDPSB0)." },
      ],
      takeawaysHe: [
        "Heuristic = אלגוריתם מהיר וממוקד לבעיה אחת.",
        "משפחות: Sequence, Backlog, Operations, Runtime, Multilevel, Multiresource, Demand-Driven.",
        "ניתן לשרשר ב-Heuristic profile.",
        "הכלי היומיומי; Optimizer למורכבות גבוהה.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · Detailed Scheduling Optimizer (6.5)", href: "/library/ppds/chapter-06/#sub-6.5" },
        { labelHe: "PP/DS · לוח-תזמון (6.4.1)", href: "/library/ppds/chapter-06/#sub-6.4.1" },
      ],
      children: [
        {
          id: "6.3.1",
          titleHe: "תזמון רצף",
          titleEn: "Schedule Sequence",
          execHe:
            "Heuristic ה-Schedule Sequence מתזמן מחדש קבוצת-פעולות לפי סדר-מטרה — בדרך-כלל תאריך-יעד או סדר נתון — וממקם אותן ברצף על המשאב. זהו ה-Heuristic הבסיסי ליצירת רצף הגיוני ורציף.",
          beginnerHe:
            "'סדר לי את כל הפעולות לפי תאריך-היעד, אחת אחרי השנייה'. זה מה שהוא עושה — לוקח ערב-רב של פעולות ומסדר אותן בשורה הגיונית על המשאב.",
          consultantHe:
            "ה-Heuristic (לרוב SAP_PP_002 ודומיו) ממיין את הפעולות הנבחרות לפי קריטריון-מיון (Earliest date, Sequence number) ומתזמן אותן ברצף לפי ה-DS strategy profile (Find slot/Insert, Forward/Backward). הוא אינו ממזער-Setup בהכרח — לשם כך משלבים עם Minimize Runtime. שימושי כצעד-ראשון בשרשרת-Heuristics.",
          purposeHe:
            "ליצור רצף-ייצור הגיוני וניתן-לביצוע על המשאב לפי סדר-עדיפויות ברור (לרוב תאריך-יעד).",
          processExampleHe:
            "מתכנן בוחר 20 פעולות לא-מסודרות, מריץ Schedule Sequence לפי תאריך-יעד, והמערכת מסדרת אותן ברצף רציף על הקו, הקרוב-ביותר-לתאריך ראשון.",
          cbcHe:
            "ב-CBC Schedule Sequence מסדר את אצוות-המילוי של היום לפי תאריכי-המשלוח — בסיס שעליו ירוץ אחר-כך Minimize Runtime לקיבוץ-טעמים.",
          navHe: ["Production ► PP/DS ► Detailed Scheduling ► Heuristics ► Schedule Sequence (/SAPAPO/CDPSC0)"],
          tables: ["/SAPAPO/HEUR", "/SAPAPO/ORDKEY"],
          tcodes: ["/SAPAPO/CDPSC0", "/SAPAPO/CDPS0"],
          fiori: ["F2336"],
          configHe: [
            "בחר קריטריון-מיון (Earliest date / Sequence) בפרופיל ה-Heuristic.",
            "שייך DS strategy profile (כיוון + Scheduling mode).",
            "הגדר כצעד-ראשון ב-Heuristic profile.",
          ],
          mistakesHe: [
            "ציפייה שה-Heuristic ימזער-Setup ➔ הוא ממיין בלבד; שלב Minimize Runtime.",
            "מיון לפי קריטריון לא-נכון ➔ רצף לא-עומד-בתאריכים.",
          ],
          troubleshootHe: [
            "הרצף לא לפי תאריך ➔ קריטריון-מיון שגוי בפרופיל.",
            "נוצרו עומסים ➔ הרץ Remove Backlog אחריו.",
          ],
          bestPracticeHe: [
            "הרץ כצעד-ראשון, ואז Remove Backlog ו-Minimize Runtime.",
            "מיין לפי תאריך-יעד כברירת-מחדל.",
          ],
          interviewHe: [
            { qHe: "מה עושה Schedule Sequence?", aHe: "ממיין קבוצת-פעולות לפי קריטריון (לרוב תאריך-יעד) ומתזמן אותן ברצף על המשאב לפי האסטרטגיה. אינו ממזער-Setup בעצמו." },
          ],
          takeawaysHe: [
            "Schedule Sequence = יצירת רצף לפי סדר-מטרה.",
            "צעד-ראשון בשרשרת-Heuristics.",
            "אינו ממזער-Setup — לשם כך Minimize Runtime.",
          ],
        },
        {
          id: "6.3.2",
          titleHe: "הסרת איחורים (Backlog)",
          titleEn: "Remove Backlog",
          execHe:
            "Backlog הוא פעולות שתאריך-התחלתן/סיומן כבר בעבר (איחור). ה-Heuristic 'Remove Backlog' מאתר אותן ומתזמן אותן מחדש קדימה אל אופק-הזמן הזמין, כדי לנקות את הלוח מפעולות לא-ריאליות 'בעבר'.",
          beginnerHe:
            "לפעמים פעולות 'תקועות בעבר' — אמורות היו לקרות אתמול אבל לא קרו. ה-Heuristic הזה לוקח את כל מה שבאיחור ודוחף אותו קדימה לזמן שבו אפשר באמת לבצע אותו.",
          consultantHe:
            "ה-Heuristic מזהה פעולות עם תאריך לפני 'now' (או לפני אופק-התזמון) ומתזמן אותן מחדש Forward מנקודת-הזמן הנוכחית, לפי ה-DS strategy profile. ב-Finite scheduling הוא מחפש את החלונות הפנויים הקרובים-ביותר. לרוב מורץ אחרי Schedule Sequence וכחלק קבוע מ-Production Planning Run בוקר. שים לב: הסרת-Backlog עלולה לדחוף תאריכי-סיום ולחשוף עיכובי-לקוח שיש לטפל בהם.",
          purposeHe:
            "להפוך את הלוח לריאלי — שאף פעולה לא תהיה מתוזמנת 'בעבר' — ולחשוף את האיחורים האמיתיים כדי שאפשר יהיה לטפל בהם.",
          processExampleHe:
            "בבוקר המתכנן מריץ Remove Backlog: כל פעולות-האיחור (שלא בוצעו אתמול) נדחפות קדימה לחלונות-הפנויים הקרובים, והלוח מציג תמונה מבוצעת-יכולה.",
          cbcHe:
            "ב-CBC אחרי תקלת-קו לילית, אצוות-המילוי שלא בוצעו נשארות 'בעבר'; הרצת Remove Backlog בבוקר דוחפת אותן לחלונות הפנויים של היום וחושפת אילו משלוחים בסיכון-איחור.",
          navHe: ["Production ► PP/DS ► Detailed Scheduling ► Heuristics ► Remove Backlog (/SAPAPO/CDPSC0)"],
          tables: ["/SAPAPO/HEUR", "/SAPAPO/ORDKEY"],
          tcodes: ["/SAPAPO/CDPSC0", "/SAPAPO/CDPS0", "/SAPAPO/CDPSB0"],
          fiori: ["F2336"],
          configHe: [
            "הגדר נקודת-ייחוס (now / אופק-תזמון) לזיהוי-Backlog.",
            "שייך אסטרטגיה Forward להסרת-איחורים קדימה.",
            "שלב כצעד קבוע ב-Production Planning Run הבוקר.",
          ],
          mistakesHe: [
            "אי-הרצת Remove Backlog ➔ הלוח מציג פעולות לא-ריאליות בעבר.",
            "הרצה ב-Backward ➔ הפעולות נשארות בעבר.",
          ],
          troubleshootHe: [
            "פעולות נשארו בעבר ➔ אסטרטגיה Backward במקום Forward.",
            "תאריכי-לקוח 'קפצו' ➔ זו תוצאה תקינה החושפת איחורים אמיתיים לטיפול.",
          ],
          bestPracticeHe: [
            "הרץ Remove Backlog כצעד יומי קבוע (בוקר).",
            "שלב עם Alert Monitor לזיהוי משלוחים-בסיכון.",
          ],
          interviewHe: [
            { qHe: "מהו Backlog ומה עושה ה-Heuristic?", aHe: "Backlog = פעולות שתאריכן בעבר (איחור). ה-Heuristic מתזמן אותן מחדש קדימה לזמן-זמין, כדי שהלוח יהיה ריאלי ויחשוף איחורים אמיתיים." },
          ],
          takeawaysHe: [
            "Remove Backlog = דחיפת פעולות-עבר קדימה.",
            "הופך את הלוח לריאלי וחושף איחורים.",
            "צעד יומי קבוע, באסטרטגיה Forward.",
          ],
        },
        {
          id: "6.3.3",
          titleHe: "תזמון פעולות",
          titleEn: "Schedule Operations",
          execHe:
            "Heuristic ה-Schedule Operations מתזמן פעולות בודדות או נבחרות לפי האסטרטגיה הפעילה, מבלי לבצע מיון-רצף כולל. זהו כלי ממוקד למיקום פעולות ספציפיות (חדשות או שזזו) על המשאב.",
          beginnerHe:
            "כשיש לך כמה פעולות חדשות שצריך 'להכניס ללוח' מבלי לטרוף את כל הסדר — ה-Heuristic הזה ממקם אותן לפי הכללים, פעולה-פעולה.",
          consultantHe:
            "בניגוד ל-Schedule Sequence (שממיין קבוצה), Schedule Operations מתזמן את הפעולות הנבחרות 'as is' לפי ה-DS strategy profile — Find slot/Insert, Forward/Backward, Finite. שימושי לאחר יצירת-פק\"ע חדשה, לאחר Deallocate, או למיקום-מחדש של פעולות בודדות. אינו מבטיח רצף-מיטבי — רק מיקום-תקין לפי האסטרטגיה.",
          purposeHe:
            "למקם פעולות נבחרות בלוח בהתאם לאסטרטגיה, ללא שינוי-סדר גורף — בקרה עדינה על המשאב.",
          processExampleHe:
            "נוצרה פק\"ע חדשה שפעולותיה 'לא-מתוזמנות' (Deallocated). המתכנן בוחר אותן ומריץ Schedule Operations; הן ממוקמות בחלונות-פנויים לפי Find slot + Backward מבלי לשבש את שאר הלוח.",
          cbcHe:
            "ב-CBC כשמוסיפים אצוות-מילוי חירום לאמצע-היום, Schedule Operations ממקם רק אותן בחלונות-הפנויים מבלי למיין-מחדש את כל רצף-הטעמים שכבר אושר.",
          navHe: ["Production ► PP/DS ► Detailed Scheduling ► Heuristics ► Schedule Operations (/SAPAPO/CDPSC0)"],
          tables: ["/SAPAPO/HEUR", "/SAPAPO/ORDKEY"],
          tcodes: ["/SAPAPO/CDPSC0", "/SAPAPO/CDPS0"],
          fiori: ["F2336"],
          configHe: [
            "שייך DS strategy profile (Find slot/Insert, כיוון, Finite).",
            "השתמש לבחירת-פעולות נבחרת בלבד.",
            "הרץ אחרי יצירת-פק\"ע או Deallocate.",
          ],
          mistakesHe: [
            "שימוש בו לסידור-רצף כולל ➔ הוא ממקם, לא ממיין; השתמש ב-Schedule Sequence.",
            "Insert mode ➔ דחיפת פעולות קיימות שלא בכוונה.",
          ],
          troubleshootHe: [
            "פעולה לא מוקמה ➔ אין חלון-פנוי באסטרטגיית Find slot; שקול Insert/Append.",
            "הלוח 'נדחף' ➔ Scheduling mode = Insert.",
          ],
          bestPracticeHe: [
            "השתמש למיקום ממוקד; ל-רצף-כולל הרץ Schedule Sequence.",
            "העדף Find slot כדי לא לשבש פעולות שאושרו.",
          ],
          interviewHe: [
            { qHe: "מתי Schedule Operations עדיף על Schedule Sequence?", aHe: "כשרוצים למקם פעולות בודדות/נבחרות (חדשות או Deallocated) לפי האסטרטגיה מבלי למיין-מחדש את כל הקבוצה." },
          ],
          takeawaysHe: [
            "Schedule Operations = מיקום ממוקד של פעולות נבחרות.",
            "אינו ממיין-רצף — רק ממקם לפי אסטרטגיה.",
            "מתאים אחרי יצירת-פק\"ע או Deallocate.",
          ],
        },
        {
          id: "6.3.4",
          titleHe: "מזעור זמן ריצה",
          titleEn: "Minimize Runtime",
          execHe:
            "Heuristic ה-Minimize Runtime מסדר מחדש את רצף-הפעולות על המשאב כדי לצמצם את זמן-הריצה הכולל — בעיקר דרך הקטנת זמני-Setup תלויי-רצף (Setup Matrix). זהו הכלי המרכזי לחיסכון בהחלפות-יקרות.",
          beginnerHe:
            "כל החלפה בין מוצרים עולה זמן (ניקוי, כיוונון). ה-Heuristic הזה מסדר את העבודה כך שמוצרים-דומים ירוצו ברצף ויהיו פחות החלפות — ובכך מקצר את הזמן הכולל.",
          consultantHe:
            "ה-Heuristic נשען על Setup Matrix (Setup Groups/Keys) המגדיר זמן/עלות-Setup לכל מעבר בין מוצרים. הוא מבצע רצף-מקומי שממזער את סך-זמני-ה-Setup בתוך אופק נתון — לרוב heuristic מסוג 'greedy/local'. בניגוד ל-Optimizer הוא לא מבטיח מינימום-גלובלי, אך מהיר מאוד. דורש Setup Matrix תחזוקה (/SAPAPO/CDPSC4 / Setup matrix maintenance). שילוב טיפוסי: Schedule Sequence ➔ Minimize Runtime.",
          purposeHe:
            "לצמצם זמן-Setup ולהגדיל את ניצול-המשאב, על-ידי קיבוץ מוצרים-דומים ומזעור-החלפות יקרות.",
          processExampleHe:
            "על משאב עם 8 אצוות בסדר אקראי, Minimize Runtime מקבץ מוצרים-דומים יחד; סך-זמני-ה-Setup יורד מ-4 שעות ל-1.5, והקיבולת-הפנויה גדלה.",
          cbcHe:
            "ב-CBC זהו ה-Heuristic הקריטי: ה-Setup Matrix מגדיר ששטיפת-CIP בין קולה-רגיל לקולה-זירו קצרה, אך בין קולה לספרייט ארוכה (טעם/צבע). Minimize Runtime מקבץ טעמים-מאותה-משפחה כדי לחסוך שטיפות, ומסדר את הרצף 'בהיר→כהה' לצמצום-ניקוי.",
          navHe: [
            "Production ► PP/DS ► Detailed Scheduling ► Heuristics ► Minimize Runtime (/SAPAPO/CDPSC0)",
            "Production ► PP/DS ► Detailed Scheduling ► Setup ► Maintain Setup Matrix (/SAPAPO/CDPSC4)",
          ],
          tables: ["/SAPAPO/HEUR", "/SAPAPO/SETMATRIX", "/SAPAPO/ORDKEY"],
          tcodes: ["/SAPAPO/CDPSC0", "/SAPAPO/CDPSC4", "/SAPAPO/CDPS0"],
          fiori: ["F2336"],
          configHe: [
            "תחזק Setup Matrix (Setup Groups/Keys) לזמני/עלויות מעבר תלויי-רצף.",
            "שייך את ה-Setup Matrix למשאב.",
            "הרץ Minimize Runtime לאחר Schedule Sequence.",
          ],
          flow: [
            { he: "Setup Matrix מוגדר?", code: "/SAPAPO/CDPSC4" },
            { he: "Schedule Sequence", note: "רצף בסיסי" },
            { he: "Minimize Runtime", code: "קיבוץ-טעמים" },
            { he: "סך-Setup יורד", note: "ניצול עולה" },
          ],
          mistakesHe: [
            "הרצה ללא Setup Matrix ➔ אין מה למזער; ההשפעה אפסית.",
            "Setup Matrix לא-מתוחזק/חלקי ➔ קיבוץ שגוי.",
            "ציפייה למינימום-גלובלי ➔ זהו Heuristic מקומי; ל-מיטבי השתמש ב-Optimizer.",
          ],
          troubleshootHe: [
            "הרצף לא השתפר ➔ Setup Matrix חסר או לא-משויך למשאב.",
            "קיבוץ לא-הגיוני ➔ ערכי-Setup Matrix שגויים.",
          ],
          bestPracticeHe: [
            "תחזק Setup Matrix מדויק — הוא מנוע ה-Heuristic.",
            "שרשר אחרי Schedule Sequence.",
            "למורכבות-רצף גבוהה עבור ל-Detailed Scheduling Optimizer.",
          ],
          interviewHe: [
            { qHe: "על מה נשען Minimize Runtime?", aHe: "על Setup Matrix (Setup Groups/Keys) המגדיר זמן/עלות-Setup לכל מעבר; ה-Heuristic מסדר רצף שממזער את סך-זמני-ה-Setup." },
            { qHe: "במה הוא נבדל מ-Optimizer?", aHe: "הוא Heuristic מקומי ומהיר שאינו מבטיח מינימום-גלובלי; ה-Optimizer מחפש פתרון אופטימלי לפי פונקציות-מטרה משוקללות — חזק יותר אך כבד יותר." },
          ],
          takeawaysHe: [
            "Minimize Runtime = צמצום-Setup תלוי-רצף.",
            "נשען על Setup Matrix מתוחזק.",
            "ב-CBC: קיבוץ-טעמים לחיסכון בשטיפות-CIP.",
          ],
          relatedHe: [{ labelHe: "PP/DS · Detailed Scheduling Optimizer (6.5)", href: "/library/ppds/chapter-06/#sub-6.5" }],
        },
        {
          id: "6.3.5",
          titleHe: "Heuristics של מסגרת תזמון רב-שלבי",
          titleEn: "Multilevel Scheduling Framework Heuristics",
          execHe:
            "תזמון רב-שלבי (Multilevel) מתזמן שרשרת-ייצור שלמה לאורך רמות-ה-BOM/Pegging בבת-אחת — לא משאב בודד, אלא כל הקדמים והעוקבים יחד. ה-Framework מספק Heuristics שמכבדים את התלויות בין הרמות כדי ליצור תזמון-עקבי מקצה-לקצה.",
          beginnerHe:
            "מוצר מורכב נבנה בשלבים: ערבוב ➔ מילוי ➔ אריזה. תזמון רב-שלבי מסדר את כל השלבים יחד, כך שכל שלב מתחיל רק אחרי שהקודם מסתיים — ולא מתזמן כל שלב בנפרד וגורם להתנגשויות.",
          consultantHe:
            "ה-Multilevel Scheduling Framework מריץ Heuristics (כגון SAP_MLO_*, Bottom-up / Top-down) שעוברים על שרשרת-ה-Pegging לפי סדר-רמות. ניתן לתזמן Bottom-up (מהרכיבים למוצר) או Top-down (מהמוצר לרכיבים), עם כיבוד Min/Max intervals בין הרמות. שימושי כשפעולת-תזמון ברמה אחת חייבת לגרור עקביות בכל השרשרת. משתלב עם פרמטרי-האובייקטים-התלויים (6.2.3).",
          purposeHe:
            "ליצור תזמון ניתן-לביצוע מקצה-לקצה על-פני רמות-ייצור מרובות, כך שכל הרמות עקביות זו עם זו (אספקה לפני דרישה).",
          processExampleHe:
            "מוצר תלת-שלבי: Heuristic רב-שלבי Bottom-up מתזמן קודם את הערבוב, ואז ממקם את המילוי אחריו, ואת האריזה אחרי המילוי — בכיבוד מרווחי-הזמן בין השלבים.",
          cbcHe:
            "ב-CBC משקה = הכנת-תרכיז ➔ ערבוב ➔ מילוי ➔ אריזה; Heuristic רב-שלבי מסדר את כל ארבעת השלבים בעקביות כך שאף שלב לא מתחיל לפני שקודמו מוכן.",
          navHe: [
            "Production ► PP/DS ► Detailed Scheduling ► Heuristics ► Multilevel Scheduling Framework (/SAPAPO/CDPSC0)",
          ],
          tables: ["/SAPAPO/HEUR", "/SAPAPO/PEGID", "/SAPAPO/ORDKEY"],
          tcodes: ["/SAPAPO/CDPSC0", "/SAPAPO/CDPS0"],
          fiori: ["F2336"],
          configHe: [
            "בחר Heuristic רב-שלבי (Bottom-up / Top-down).",
            "הגדר כיבוד Min/Max intervals בין רמות (Dependent objects).",
            "ודא Pegging תקין לפני ההרצה.",
          ],
          flow: [
            { he: "זהה שרשרת-Pegging", code: "רמות-BOM" },
            { he: "בחר כיוון", code: "Bottom-up / Top-down" },
            { he: "תזמן כל הרמות יחד", note: "כיבוד intervals" },
            { he: "תוצאה עקבית מקצה-לקצה", note: "אספקה<דרישה" },
          ],
          mistakesHe: [
            "תזמון משאב-בודד במקום רב-שלבי ➔ התנגשויות בין-רמות.",
            "Pegging שבור לפני ההרצה ➔ תוצאה לא-עקבית.",
            "התעלמות מ-Min/Max intervals ➔ מרווחים לא-ריאליים.",
          ],
          troubleshootHe: [
            "דרישה לפני אספקה בין רמות ➔ הרץ Multilevel במקום תזמון-בודד.",
            "השרשרת לא 'זזה יחד' ➔ פרמטרי-Dependent objects לא מאפשרים Propagation.",
          ],
          bestPracticeHe: [
            "השתמש ב-Multilevel לשרשראות-Pegging עמוקות.",
            "בחר Bottom-up/Top-down לפי המגבלה (אספקה מול דרישה).",
            "ודא Pegging תקין ו-intervals מוגדרים לפני ההרצה.",
          ],
          interviewHe: [
            { qHe: "מה מבדיל תזמון רב-שלבי מתזמון משאב-בודד?", aHe: "רב-שלבי מתזמן את כל רמות-ה-BOM/Pegging יחד בעקביות (אספקה לפני דרישה), בעוד תזמון-בודד מטפל במשאב אחד ועלול ליצור התנגשויות בין-רמות." },
            { qHe: "מתי Bottom-up מול Top-down?", aHe: "Bottom-up מהרכיבים למוצר (כשהאספקה מגבילה); Top-down מהמוצר לרכיבים (כשתאריך-המוצר מגביל)." },
          ],
          takeawaysHe: [
            "Multilevel = תזמון שרשרת שלמה לאורך רמות-Pegging.",
            "Bottom-up / Top-down לפי המגבלה.",
            "יוצר עקביות מקצה-לקצה.",
          ],
          relatedHe: [{ labelHe: "PP/DS · פרמטרים לאובייקטים תלויים (6.2.3)", href: "/library/ppds/chapter-06/#sub-6.2.3" }],
        },
        {
          id: "6.3.6",
          titleHe: "Heuristic לתזמון רב-משאבי",
          titleEn: "Multiresource Scheduling Heuristic",
          execHe:
            "ה-Multiresource Scheduling Heuristic מתזמן פעולות על-פני קבוצת-משאבים מקבילים (Alternative resources) בו-זמנית, ומאזן עומס ביניהם — במקום לתזמן כל משאב בנפרד. שימושי כשקיימות מספר מכונות שיכולות לבצע את אותה עבודה.",
          beginnerHe:
            "כשיש כמה קווים שיכולים לעשות את אותה עבודה, צריך להחליט מה ילך לאיזה קו כדי שאף אחד לא יהיה עמוס מדי. ה-Heuristic הזה מחלק את העבודה בין הקווים בצורה מאוזנת.",
          consultantHe:
            "ה-Heuristic עובד על קבוצת-משאבים (Resource group / Alternative resources, מוגדרים דרך Mode/PPM/PDS) ומקצה פעולות למשאב המתאים תוך איזון-עומס ובחירת-Mode. הוא בוחר בין Modes חלופיים (מכונות שונות) לפי זמינות וקיבולת. משתלב עם Setup Matrix per resource. בניגוד ל-Optimizer, האיזון הוא heuristic מהיר ולא אופטימלי-גלובלי.",
          purposeHe:
            "לאזן עומס בין משאבים-מקבילים ולנצל קיבולת-עודפת, במקום להעמיס משאב אחד בעוד אחר פנוי.",
          processExampleHe:
            "שלוש מכונות זהות; ה-Multiresource Heuristic מחלק 30 פעולות ביניהן באיזון, ובוחר לכל פעולה את המכונה הפנויה-ביותר התואמת ל-Mode.",
          cbcHe:
            "ב-CBC שני קווי-מילוי זהים (Line 1, Line 2); ה-Heuristic מאזן ביניהם את אצוות-היום, ומנתב טעם מסוים לקו שעליו ה-Setup הנדרש קצר יותר.",
          navHe: [
            "Production ► PP/DS ► Detailed Scheduling ► Heuristics ► Multiresource Scheduling (/SAPAPO/CDPSC0)",
          ],
          tables: ["/SAPAPO/HEUR", "/SAPAPO/RESOURCE", "/SAPAPO/ORDKEY"],
          tcodes: ["/SAPAPO/CDPSC0", "/SAPAPO/CDPS0", "/SAPAPO/RES01"],
          fiori: ["F2336", "F4006"],
          configHe: [
            "הגדר קבוצת-משאבים / Alternative resources ו-Modes (PPM/PDS).",
            "שייך Setup Matrix לכל משאב.",
            "בחר קריטריון-איזון (Load balancing) ב-Heuristic.",
          ],
          mistakesHe: [
            "תזמון משאב-בודד כשיש חלופות ➔ עומס לא-מאוזן.",
            "Modes חלופיים לא מוגדרים ➔ ה-Heuristic לא יכול לנתב.",
          ],
          troubleshootHe: [
            "משאב אחד עמוס והשני ריק ➔ Alternative Modes/Resources לא מוגדרים.",
            "פעולה לא נותבה ➔ אין Mode תואם על המשאב החלופי.",
          ],
          bestPracticeHe: [
            "הגדר Modes חלופיים נכון כדי לאפשר ניתוב.",
            "שלב עם Setup Matrix per resource לבחירת-Setup קצר.",
            "למורכבות-איזון גבוהה שקול Multiresource ב-Optimizer.",
          ],
          interviewHe: [
            { qHe: "מה עושה Multiresource Scheduling Heuristic?", aHe: "מתזמן פעולות על-פני קבוצת-משאבים-מקבילים, מאזן עומס ובוחר Mode/משאב מתאים — במקום לתזמן כל משאב בנפרד." },
            { qHe: "מה תנאי-הסף לניתוב בין משאבים?", aHe: "קיום Modes/Alternative resources (PPM/PDS) המגדירים שהמשאבים יכולים לבצע את אותה פעולה." },
          ],
          takeawaysHe: [
            "Multiresource = איזון-עומס בין משאבים-מקבילים.",
            "דורש Modes/Alternative resources.",
            "מנצל קיבולת-עודפת במקום להעמיס אחד.",
          ],
        },
        {
          id: "6.3.7",
          titleHe: "תזמון מונחה-ביקוש",
          titleEn: "Demand-Driven Scheduling",
          execHe:
            "תזמון מונחה-ביקוש (Demand-Driven) מתזמן פעולות לפי הביקוש-בפועל ועדיפותו, ולא רק לפי תאריכים-מתוכננים — תוך מתן-קדימות לדרישות-לקוח דחופות/חשובות. הוא משלב את עקרונות DDMRP/Demand-Driven לתוך התזמון-המפורט.",
          beginnerHe:
            "במקום לתזמן לפי תוכנית-קבועה, התזמון 'מקשיב' לביקוש האמיתי — מה הלקוחות באמת רוצים עכשיו — ונותן עדיפות לדרישות הדחופות והחשובות.",
          consultantHe:
            "ה-Heuristic מתזמן לפי Priority של הדרישות (Pegging priority, Demand priority) ולפי אזורי-חיץ (Buffers) במודל Demand-Driven. הוא מקדים פעולות שמזינות דרישות-עדיפות-גבוהה ודוחה דרישות-עדיפות-נמוכה בעת מחסור-קיבולת. משתלב עם PP/DS Pegging ועם מודל DDMRP (אם מוטמע). שימושי בסביבת Make-to-order/ביקוש-תנודתי.",
          purposeHe:
            "להבטיח שהמשאב-הסופי ישרת קודם את הביקוש-החשוב-ביותר, ולמקסם שירות-לקוח כשהקיבולת מוגבלת.",
          processExampleHe:
            "בעת מחסור-קיבולת, ה-Heuristic מתזמן קודם את אצוות המזינות הזמנות-לקוח בעדיפות-גבוהה, ודוחה מילוי-מלאי בעדיפות-נמוכה ליום הבא.",
          cbcHe:
            "ב-CBC לפני חג עם ביקוש-שיא, תזמון מונחה-ביקוש נותן עדיפות לאצוות המזינות הזמנות-קמעונאות-גדולות על-פני מילוי-מלאי-בטחון, כדי להבטיח אספקה ללקוחות-המפתח.",
          navHe: [
            "Production ► PP/DS ► Detailed Scheduling ► Heuristics ► Demand-Driven Scheduling (/SAPAPO/CDPSC0)",
          ],
          tables: ["/SAPAPO/HEUR", "/SAPAPO/PEGID", "/SAPAPO/ORDKEY"],
          tcodes: ["/SAPAPO/CDPSC0", "/SAPAPO/CDPS0"],
          fiori: ["F2336"],
          configHe: [
            "הגדר Demand/Pegging priorities לדרישות.",
            "הגדר אזורי-חיץ (Buffers) במודל Demand-Driven (אם מוטמע).",
            "שייך את ה-Heuristic למשאבי צוואר-בקבוק.",
          ],
          mistakesHe: [
            "Priorities לא-מוגדרות ➔ ה-Heuristic מתזמן כמו רגיל.",
            "התעלמות ממחסור-קיבולת ➔ דרישות-חשובות לא מקבלות קדימות.",
          ],
          troubleshootHe: [
            "דרישות-דחופות לא קודמו ➔ Pegging/Demand priority לא מוגדרת.",
            "ביקוש-תנודתי לא מטופל ➔ אזורי-חיץ לא מוגדרים.",
          ],
          bestPracticeHe: [
            "הגדר Priorities ברורות לדרישות-לקוח.",
            "השתמש בסביבת Make-to-order/ביקוש-תנודתי.",
            "שלב עם מודל Demand-Driven ו-Buffers.",
          ],
          interviewHe: [
            { qHe: "מה ייחודי בתזמון מונחה-ביקוש?", aHe: "הוא מתזמן לפי עדיפות-הביקוש-בפועל (Demand/Pegging priority) ואזורי-חיץ ולא רק לפי תאריכים, ונותן קדימות לדרישות-חשובות בעת מחסור-קיבולת." },
            { qHe: "מתי הוא מתאים?", aHe: "בסביבות Make-to-order/ביקוש-תנודתי שבהן שירות-לקוח לדרישות-עדיפות-גבוהה הוא הקריטריון העיקרי." },
          ],
          takeawaysHe: [
            "Demand-Driven = תזמון לפי עדיפות-ביקוש בפועל.",
            "קדימות לדרישות-חשובות בעת מחסור.",
            "משתלב עם DDMRP/Buffers.",
          ],
          relatedHe: [{ labelHe: "PP/DS · תכנון ייצור (פרק 5)", href: "/library/ppds/chapter-05/" }],
        },
      ],
    },
    // ============================================================ 6.4
    {
      id: "6.4",
      titleHe: "הפעלת תזמון PP/DS",
      titleEn: "Triggering PP/DS Scheduling",
      execHe:
        "תזמון-PP/DS מופעל ממספר כלים אינטראקטיביים, שכל אחד מתאים לפרסונה ולמשימה: Detailed Scheduling Planning Board (לוח-Gantt קלאסי למתכנן), Advanced Scheduling Board (חוויית-Fiori מודרנית), Monitor Capacity Utilization (אפליקציית-ניטור ניצול), ו-Resource Planning Table (תצוגה טבלאית/Bucket). הבחירה משפיעה על מהירות-העבודה ועל החוויה.",
      beginnerHe:
        "כדי לתזמן בפועל, פותחים 'מסך-תזמון'. יש כמה כאלה: לוח-Gantt קלאסי שבו גוררים פעולות, לוח-Fiori מודרני, אפליקציה שמראה כמה כל קו עמוס, וטבלה לסידור-מהיר. כולם מפעילים את אותו מנוע-תזמון מאחורי-הקלעים.",
      consultantHe:
        "כל הכלים פועלים מעל אותו מנוע (DS strategy profile + Heuristics + Optimizer). ההבדל הוא ה-UI ואופן-העבודה: ה-Detailed Scheduling Planning Board (/SAPAPO/CDPS0) הוא ה-Gantt הקלאסי (SAP GUI) עם שליטה-מלאה; ה-Advanced Scheduling Board הוא אפליקציית-Fiori מודרנית; Monitor Capacity Utilization (Fiori) מתמקד בניטור-עומסים ו-drill-in; Resource Planning Table הוא תצוגת-Bucket/טבלה לאיזון-מהיר. כולם נשענים על Overall profile ועל הגדרות-התזמון שהוגדרו ב-6.2–6.3.",
      purposeHe:
        "להתאים את כלי-התזמון לפרסונה ולמשימה — מתכנן-מומחה בלוח מפורט, מנהל-תפעול בניטור-עומסים — תוך שמירה על מנוע-תזמון ולוגיקה אחידים.",
      processExampleHe:
        "מתכנן פותח את Detailed Scheduling Planning Board, מסנן את משאבי-המפתח, מריץ Heuristics, גורר התאמות-ידניות, ושומר. מנהל-התפעול פותח את Monitor Capacity Utilization לראות אילו קווים בעומס-יתר.",
      cbcHe:
        "ב-CBC המתכנן-הראשי עובד יומית ב-Detailed Scheduling Planning Board לסידור-רצף-הטעמים; מנהל-המשמרת משתמש ב-Monitor Capacity Utilization לראות עומס-קווים בזמן-אמת, וה-Resource Planning Table משמש לאיזון-מהיר בין שני הקווים.",
      navHe: [
        "SAP APO ► PP/DS ► Detailed Scheduling ► Detailed Scheduling Planning Board (/SAPAPO/CDPS0)",
        "Fiori Launchpad ► Manufacturing ► Advanced Scheduling Board",
        "Fiori Launchpad ► Manufacturing ► Monitor Capacity Utilization / Resource Planning Table",
      ],
      tables: ["/SAPAPO/RESOURCE", "/SAPAPO/ORDKEY", "/SAPAPO/CDPSPARA"],
      tcodes: ["/SAPAPO/CDPS0", "/SAPAPO/CDPSB0", "/SAPAPO/CDPSB2"],
      fiori: ["F2336", "F4006", "F2334"],
      configHe: [
        "הגדר Overall profile ללוח (Work area, Strategy, Time profile).",
        "הקצה Fiori apps (Advanced Scheduling Board / Monitor Capacity Utilization) לפי תפקיד.",
        "הגדר Resource selection / Planning board profile לכל פרסונה.",
      ],
      flow: [
        { he: "בחר כלי לפי פרסונה", code: "Board / App / Table" },
        { he: "סנן משאבים/אופק", code: "Overall profile" },
        { he: "הרץ Heuristic/Optimizer", code: "/SAPAPO/CDPS0" },
        { he: "התאמות-ידניות (גרירה)", note: "Gantt" },
        { he: "שמור תזמון", note: "Save planning" },
      ],
      masterDataHe: [
        "Overall profile + Work area קובעים אילו משאבים/הזמנות נטענים ללוח.",
        "Time profile קובע את אופק-התצוגה.",
      ],
      mistakesHe: [
        "שימוש בכלי לא-מתאים לפרסונה ➔ עבודה איטית ותסכול.",
        "אי-שמירת התזמון ➔ ההתאמות-הידניות אובדות.",
        "Work area רחב מדי ➔ הלוח כבד ואיטי.",
      ],
      troubleshootHe: [
        "הלוח ריק ➔ Work area/Resource selection שגויים.",
        "שינויים לא נשמרו ל-S/4 ➔ לא בוצע Save / כשל-CIF.",
        "ביצועים איטיים ➔ אופק/Work area רחבים מדי.",
      ],
      bestPracticeHe: [
        "התאם כלי לפרסונה: Board למתכנן, Monitor למנהל.",
        "צמצם Work area לאופק-ההחלטה הרלוונטי.",
        "שמור תכופות אחרי התאמות-ידניות.",
      ],
      interviewHe: [
        { qHe: "מהם הכלים העיקריים להפעלת תזמון-PP/DS?", aHe: "Detailed Scheduling Planning Board (Gantt קלאסי), Advanced Scheduling Board (Fiori), Monitor Capacity Utilization App ו-Resource Planning Table — כולם מעל אותו מנוע-תזמון." },
        { qHe: "כיצד בוחרים בין הכלים?", aHe: "לפי פרסונה ומשימה: מתכנן-מומחה בלוח-המפורט, מנהל-תפעול בניטור-עומסים, ואיזון-מהיר בטבלה — אך הלוגיקה (אסטרטגיה/Heuristics) זהה." },
      ],
      takeawaysHe: [
        "כל הכלים מעל מנוע-תזמון אחד.",
        "Board=מתכנן, Advanced Board=Fiori, Monitor=ניטור, Table=איזון-מהיר.",
        "התאם כלי לפרסונה ושמור התאמות.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · אסטרטגיית תזמון (6.2)", href: "/library/ppds/chapter-06/#sub-6.2" },
        { labelHe: "PP/DS · Heuristics (6.3)", href: "/library/ppds/chapter-06/#sub-6.3" },
      ],
      children: [
        {
          id: "6.4.1",
          titleHe: "לוח תכנון לתזמון מפורט",
          titleEn: "Detailed Scheduling Planning Board",
          execHe:
            "ה-Detailed Scheduling Planning Board הוא לוח-ה-Gantt הקלאסי של PP/DS (SAP GUI) — תצוגת-ציר-זמן של משאבים ופעולות שבה המתכנן גורר, מתזמן-מחדש, מריץ Heuristics/Optimizer ובודק עומסים. זהו כלי-העבודה המרכזי והמלא-ביותר של המתכנן-המומחה.",
          beginnerHe:
            "דמיין לוח עם שורה לכל מכונה וציר-זמן לרוחב; כל פעולה היא 'מלבן' שאפשר לגרור. זה הלוח שבו המתכנן רואה את כל התמונה ומסדר אותה ביד ובכפתורים.",
          consultantHe:
            "מורץ ב-/SAPAPO/CDPS0 דרך Overall profile (Work area + Time profile + Strategy + Heuristic profiles). מציג Resource charts, Product/Order charts ו-Alerts. מאפשר Dispatch/Deallocate, גרירה, הרצת-Heuristic נבחר, קריאה ל-Optimizer, ושמירה (Save planning → CIF ל-S/4). תומך ב-Pegging visualization וב-Fixing פעולות. ה-Work area קובע אילו משאבים/הזמנות נטענים — צמצומו קריטי לביצועים.",
          purposeHe:
            "לתת למתכנן שליטה-מלאה ויזואלית על הרצף והעומסים על המשאבים, עם גישה לכל כלי-התזמון ממקום אחד.",
          processExampleHe:
            "המתכנן פותח את הלוח עם Work area של משאבי-המפתח, רואה עומס-יתר (פס-אדום), מריץ Remove Backlog ואז Minimize Runtime, גורר אצווה-דחופה קדימה, מקבע (Fix) אותה, ושומר.",
          cbcHe:
            "ב-CBC המתכנן פותח את הלוח לשני קווי-המילוי, רואה את רצף-הטעמים של היום, מריץ Minimize Runtime לקיבוץ-טעמים, וגורר ידנית אצווה דחופה תוך קיבועה כדי שה-Optimizer לא יזיז אותה.",
          navHe: ["SAP APO ► PP/DS ► Detailed Scheduling ► Detailed Scheduling Planning Board (/SAPAPO/CDPS0)"],
          tables: ["/SAPAPO/RESOURCE", "/SAPAPO/ORDKEY", "/SAPAPO/CDPSPARA"],
          tcodes: ["/SAPAPO/CDPS0", "/SAPAPO/CDPSC2"],
          fiori: ["F2336"],
          configHe: [
            "הגדר Overall profile: Work area, Time profile, Strategy, Heuristic/Optimization profiles.",
            "הגדר Resource selection לצמצום-הלוח.",
            "הפעל Alert integration להצגת-חריגות.",
          ],
          flow: [
            { he: "פתח לוח (Overall profile)", code: "/SAPAPO/CDPS0" },
            { he: "סנן Work area", code: "משאבי-מפתח" },
            { he: "הרץ Heuristic/Optimizer", note: "מהתפריט" },
            { he: "גרור + Fix ידני", code: "Dispatch/Fix" },
            { he: "שמור", code: "Save → CIF" },
          ],
          mistakesHe: [
            "Work area רחב ➔ הלוח כבד ואיטי.",
            "אי-קיבוע (Fix) אצווה-ידנית ➔ Optimizer/Heuristic מזיז אותה.",
            "שכחת Save ➔ ההתאמות לא עוברות ל-S/4.",
          ],
          troubleshootHe: [
            "הלוח ריק/חלקי ➔ Work area/Resource selection שגויים.",
            "התאמה-ידנית נעלמה ➔ הרצת-Heuristic דרסה (חסר Fix).",
            "שינוי לא ב-S/4 ➔ Save לא בוצע / כשל-CIF.",
          ],
          bestPracticeHe: [
            "צמצם Work area למשאבים הרלוונטיים.",
            "קבע (Fix) פעולות-ידניות חשובות.",
            "שמור תכופות; בדוק Alerts אחרי כל הרצה.",
          ],
          interviewHe: [
            { qHe: "מהו Detailed Scheduling Planning Board?", aHe: "לוח-Gantt קלאסי (/SAPAPO/CDPS0) לתזמון-מפורט — תצוגת משאבים/פעולות בציר-זמן, גרירה, הרצת-Heuristics/Optimizer, Pegging ו-Alerts, עם שמירה ל-S/4 דרך CIF." },
            { qHe: "מדוע חשוב לקבע (Fix) פעולה?", aHe: "כדי שהרצות-Heuristic/Optimizer הבאות לא יזיזו אותה — שומר החלטה-ידנית חשובה." },
          ],
          takeawaysHe: [
            "הלוח הקלאסי = כלי-העבודה המלא של המתכנן.",
            "Overall profile + Work area קובעים מה נטען.",
            "Fix שומר התאמות-ידניות; Save מעביר ל-S/4.",
          ],
        },
        {
          id: "6.4.2",
          titleHe: "לוח תזמון מתקדם",
          titleEn: "Advanced Scheduling Board",
          execHe:
            "ה-Advanced Scheduling Board הוא הגרסה המודרנית (SAP Fiori / SAPUI5) של לוח-התזמון — חוויית-Gantt עכשווית, מהירה ונגישה-בדפדפן, עם אותן יכולות-ליבה (גרירה, Heuristics, עומסים) בעיצוב-משתמש משופר. הוא היורש-ה-UX של הלוח-הקלאסי.",
          beginnerHe:
            "אותו רעיון של לוח-Gantt, אבל בדפדפן ובעיצוב מודרני, נוח-יותר לעבודה ולמכשירים שונים. מי שמכיר את הלוח-הקלאסי ימצא כאן את אותן פעולות בלבוש חדש.",
          consultantHe:
            "ה-Advanced Scheduling Board הוא אפליקציית-Fiori המבוססת על אותו מנוע-PP/DS (DS strategy profile, Heuristics, Optimizer). מספק drag-and-drop, סינון-מתקדם, תצוגות-עומס ו-Alerts בדפדפן, ומיועד להחליף בהדרגה את ה-SAP GUI Planning Board. נדרשת תצורת-Fiori (Catalog/Role) והקצאת-משאבים. מתאים לסביבות-S/4HANA מודרניות ולמשתמשים שמעדיפים UX עדכני.",
          purposeHe:
            "לספק חוויית-תזמון מודרנית ונגישה-בדפדפן עם יכולות-הלוח-המלאות, ולהפחית את התלות ב-SAP GUI.",
          processExampleHe:
            "מתכנן פותח את ה-Advanced Scheduling Board ב-Fiori Launchpad, מסנן משאב, גורר פעולות בציר-הזמן, מריץ Heuristic מהתפריט, ובודק את העומס בתצוגה-המודרנית — הכל בדפדפן.",
          cbcHe:
            "ב-CBC צוות-תכנון חדש מאומן על ה-Advanced Scheduling Board במקום ה-SAP GUI הקלאסי — אותו רצף-טעמים, אותן Heuristics, בחוויית-Fiori שנוחה יותר על מסכי-המפעל.",
          navHe: ["Fiori Launchpad ► Manufacturing ► Advanced Scheduling Board"],
          tables: ["/SAPAPO/RESOURCE", "/SAPAPO/ORDKEY"],
          tcodes: ["/SAPAPO/CDPS0"],
          fiori: ["F2336", "F4006"],
          configHe: [
            "הקצה את אפליקציית ה-Advanced Scheduling Board ל-Business Role/Catalog.",
            "הגדר Planning board profile / Resource selection לאפליקציה.",
            "ודא תצורת-Fiori Launchpad ו-OData services.",
          ],
          mistakesHe: [
            "ציפייה ל-100% Feature parity מיידי עם ה-GUI ➔ בדוק כיסוי-פונקציות לגרסה.",
            "הקצאת-Role חסרה ➔ האפליקציה לא מופיעה ב-Launchpad.",
          ],
          troubleshootHe: [
            "האפליקציה לא נטענת ➔ Catalog/Role או OData לא מוגדרים.",
            "פונקציה חסרה מול ה-GUI ➔ תלוי-גרסת-S/4; השלם בלוח-הקלאסי.",
          ],
          bestPracticeHe: [
            "אמן משתמשים-חדשים ישירות על ה-Advanced Scheduling Board.",
            "בדוק כיסוי-פונקציות מול הצורך לפני מעבר-מלא.",
            "שמור על אסטרטגיה/Heuristics אחידים עם הלוח-הקלאסי.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין Advanced Scheduling Board ללוח-הקלאסי?", aHe: "ה-Advanced Scheduling Board הוא אפליקציית-Fiori מודרנית (דפדפן) מעל אותו מנוע-PP/DS; הלוח-הקלאסי הוא SAP GUI. הלוגיקה זהה, ה-UX שונה." },
            { qHe: "מה תנאי-הסף להפעלתו?", aHe: "תצורת-Fiori (Catalog/Role), הקצאת-משאבים/Planning board profile ושירותי-OData פעילים." },
          ],
          takeawaysHe: [
            "Advanced Scheduling Board = לוח-Fiori מודרני.",
            "אותו מנוע-PP/DS, UX עדכני בדפדפן.",
            "דורש תצורת-Fiori והקצאת-Role.",
          ],
        },
        {
          id: "6.4.3",
          titleHe: "אפליקציית ניטור ניצול קיבולת",
          titleEn: "Monitor Capacity Utilization App",
          execHe:
            "אפליקציית Monitor Capacity Utilization (Fiori) מספקת תצוגת-ניצול-קיבולת ברמת-משאב ותקופה — היכן עומס-יתר, היכן קיבולת-פנויה — עם drill-in להזמנות. היא כלי-הניטור של מנהל-התפעול לזיהוי צווארי-בקבוק לפני שהם הופכים לעיכוב.",
          beginnerHe:
            "אפליקציה שמראה בצבעים כמה כל קו עמוס: אדום=עמוס-מדי, ירוק=פנוי. מנהל מסתכל עליה כדי לדעת איפה הבעיה, בלי להיכנס לכל הפרטים.",
          consultantHe:
            "אפליקציית-Fiori המציגה Capacity utilization% per resource/period (Bucket), עם chart ו-drill-down להזמנות/פעולות התורמות-לעומס. נשענת על נתוני-ה-PP/DS resources. אינה כלי-תזמון-ידני מלא — היא לניטור-וזיהוי; פעולת-התיקון נעשית ב-Planning Board / Resource Planning Table. שימושית ל-S&OP-קצר ולתגובה-מהירה לעומסים.",
          purposeHe:
            "לזהות במהירות צווארי-בקבוק וקיבולת-פנויה ברמת-מנהל, ולנתב את מאמץ-התזמון למקום-הנכון.",
          processExampleHe:
            "מנהל-תפעול פותח את האפליקציה בבוקר, רואה קו-2 ב-130% ביום-חמישי, עושה drill-in לראות אילו הזמנות גורמות לעומס, ומפנה את המתכנן לאזן.",
          cbcHe:
            "ב-CBC מנהל-המשמרת בודק ב-Monitor Capacity Utilization שקו-המילוי המרכזי לא חורג מ-100% לפני חג; כשהוא רואה עומס-יתר, הוא מבקש מהמתכנן להעביר אצוות לקו-המשני.",
          navHe: ["Fiori Launchpad ► Manufacturing ► Monitor Capacity Utilization"],
          tables: ["/SAPAPO/RESOURCE", "/SAPAPO/ORDKEY"],
          tcodes: ["/SAPAPO/CDPS0"],
          fiori: ["F2334", "F4006"],
          configHe: [
            "הקצה את אפליקציית Monitor Capacity Utilization ל-Business Role.",
            "הגדר Resource selection ו-Bucket/period לתצוגה.",
            "הגדר ספי-עומס (thresholds) לצביעה.",
          ],
          mistakesHe: [
            "שימוש בה כ-כלי-תזמון ➔ היא לניטור; תקן ב-Planning Board.",
            "Bucket/period לא-מתאים ➔ תמונת-עומס מטעה.",
          ],
          troubleshootHe: [
            "ניצול לא-מדויק ➔ Bucket/period או Resource selection שגויים.",
            "אין נתונים ➔ משאב לא ב-PP/DS או CIF לא-מסונכרן.",
          ],
          bestPracticeHe: [
            "השתמש לניטור-יומי וזיהוי-צווארי-בקבוק.",
            "הגדר ספי-עומס משמעותיים לצביעה.",
            "חבר drill-in לפעולת-תיקון ב-Planning Board / Table.",
          ],
          interviewHe: [
            { qHe: "מה תפקיד Monitor Capacity Utilization App?", aHe: "ניטור ניצול-קיבולת per משאב/תקופה עם drill-in לעומסים — כלי-זיהוי למנהל; התיקון נעשה בכלי-תזמון אחר." },
            { qHe: "במה היא נבדלת מ-Planning Board?", aHe: "היא לניטור-וזיהוי בלבד; ה-Planning Board / Resource Planning Table הם לתזמון-ולתיקון בפועל." },
          ],
          takeawaysHe: [
            "Monitor Capacity Utilization = ניטור-עומסים למנהל.",
            "מזהה צווארי-בקבוק וקיבולת-פנויה.",
            "כלי-זיהוי; התיקון בכלי-תזמון אחר.",
          ],
        },
        {
          id: "6.4.4",
          titleHe: "טבלת תכנון משאבים",
          titleEn: "Resource Planning Table",
          execHe:
            "ה-Resource Planning Table היא תצוגה טבלאית/Bucket של עומס-משאבים, המאפשרת איזון-קיבולת מהיר — הזזת-כמויות בין תקופות/משאבים ברמת-Bucket ללא גרירת-פעולות בודדות. כלי מהיר לאיזון-עומסים ברמת-תכנון-גס.",
          beginnerHe:
            "טבלה עם משאבים בשורות ותקופות בעמודות, שמראה כמה עומס יש בכל תא. אפשר 'להזיז עומס' מתא עמוס לתא פנוי בלי לטפל בכל פעולה בנפרד — איזון מהיר.",
          consultantHe:
            "תצוגת-Bucket (period/resource) המאפשרת capacity leveling מהיר — העברת-עומס בין תקופות/משאבים-חלופיים ברמה-גסה, להבדיל מהתזמון-לדקה של ה-Planning Board. מתאימה לאיזון-טווח-בינוני ולתכנון-גס לפני הירידה-לפרטים. שינויים מתורגמים לתזמון-מפורט בהמשך. משלימה את ה-Planning Board (גס מול מדויק).",
          purposeHe:
            "לאזן עומס-משאבים במהירות ברמת-Bucket — לפני או לצד התזמון-המפורט-לדקה — ולפשט החלטות-קיבולת-גסות.",
          processExampleHe:
            "מתכנן רואה בטבלה עומס-יתר על קו-1 בשבוע-הבא; הוא מעביר חלק מהעומס לקו-2 (משאב-חלופי) ישירות בטבלה, ואז יורד ל-Planning Board לתזמון-המדויק.",
          cbcHe:
            "ב-CBC ה-Resource Planning Table משמש לאיזון-שבועי בין שני קווי-המילוי: כשקו-אחד עמוס, מעבירים כמות-ייצור לקו-השני ברמת-Bucket, והרצף-המדויק נקבע אחר-כך בלוח.",
          navHe: ["Fiori Launchpad ► Manufacturing ► Resource Planning Table"],
          tables: ["/SAPAPO/RESOURCE", "/SAPAPO/ORDKEY"],
          tcodes: ["/SAPAPO/CDPSB2", "/SAPAPO/CDPS0"],
          fiori: ["F4006", "F2334"],
          configHe: [
            "הגדר Bucket/period ו-Resource selection לטבלה.",
            "הגדר משאבים-חלופיים לאיזון בין-משאבים.",
            "חבר את הטבלה ל-Planning Board לירידה-לפרטים.",
          ],
          mistakesHe: [
            "ציפייה לתזמון-לדקה מהטבלה ➔ היא ברמת-Bucket; רד ל-Planning Board.",
            "Bucket גס מדי ➔ איזון לא-מדויק.",
          ],
          troubleshootHe: [
            "עומס לא 'זז' ➔ אין משאב-חלופי מוגדר.",
            "פערים מול הלוח ➔ שינוי-Bucket טרם תורגם לתזמון-מפורט.",
          ],
          bestPracticeHe: [
            "השתמש לאיזון-גס בטווח-בינוני, ואז Planning Board לפרטים.",
            "הגדר משאבים-חלופיים לאיזון יעיל.",
            "תרגם שינויי-Bucket לתזמון-מפורט בהקדם.",
          ],
          interviewHe: [
            { qHe: "למה משמשת Resource Planning Table?", aHe: "לאיזון-קיבולת מהיר ברמת-Bucket (period/resource) — העברת-עומס בין תקופות/משאבים-חלופיים, להבדיל מהתזמון-לדקה של ה-Planning Board." },
            { qHe: "כיצד היא משלימה את ה-Planning Board?", aHe: "הטבלה לאיזון-גס וטווח-בינוני; ה-Planning Board לתזמון-מדויק-לדקה. עובדים גס ואז מדויק." },
          ],
          takeawaysHe: [
            "Resource Planning Table = איזון-עומס ברמת-Bucket.",
            "מהיר וגס; משלים את ה-Planning Board המדויק.",
            "דורש משאבים-חלופיים לאיזון בין-משאבים.",
          ],
        },
      ],
    },
    // ============================================================ 6.5
    {
      id: "6.5",
      titleHe: "אופטימייזר תזמון מפורט",
      titleEn: "Detailed Scheduling Optimizer",
      execHe:
        "ה-Detailed Scheduling Optimizer הוא מנוע-אופטימיזציה מתמטי (מבוסס PP/DS optimizer) המחפש את הרצף-המיטבי על המשאבים לפי פונקציות-מטרה משוקללות — מזעור-Setup, איחורים, זמני-ריצה ועוד. בניגוד ל-Heuristic (כלל-מהיר), הוא 'חושב' על כל המרחב ומחזיר פתרון קרוב-לאופטימלי. הכלי החזק-ביותר לבעיות-רצף מורכבות.",
      beginnerHe:
        "ה-Optimizer הוא 'המוח-הגדול': במקום כלל-פשוט, הוא בוחן המון אפשרויות-סידור ומחזיר את הטובה-ביותר לפי המטרות שהגדרת (למשל הכי-פחות-החלפות והכי-פחות-איחורים). הוא איטי-יותר, אבל חכם-יותר.",
      consultantHe:
        "ה-Optimizer (מנוע נפרד, מורץ מהלוח /SAPAPO/CDPS0 או ברקע) פותר בעיית-תזמון רב-מטרתית לפי Objective functions משוקללות ב-Optimization profile. תומך ב-Setup matrix, Multiresource, ואילוצי-זמן. נשען על Cost-based optimization (לכל הפרה/Setup/איחור מוקצית-עלות). דורש מודל-נתונים נקי (Setup matrix, Modes, priorities) ו-runtime-budget (זמן-ריצה מוגבל). מחזיר פתרון קרוב-לאופטימלי בתוך הזמן-שהוקצב. משולב עם Fixing (פעולות מקובעות לא-זזות) ועם Optimization-Run monitoring.",
      purposeHe:
        "להשיג את הרצף הטוב-ביותר-אפשרי לבעיות מורכבות (רצף תלוי-Setup, ריבוי-משאבים, איחורים) שבהן Heuristic לא מספיק — תוך איזון בין מטרות-מתחרות.",
      processExampleHe:
        "על משאב עם 40 פעולות, רצף-Setup מורכב ותאריכי-יעד צפופים, המתכנן מריץ את ה-Optimizer עם פרופיל שמשקלל מזעור-Setup (משקל-גבוה) ומזעור-איחורים (משקל-בינוני); תוך 5 דקות מוחזר רצף שמצמצם Setup ב-40% עם מינימום-איחורים.",
      cbcHe:
        "ב-CBC ה-Optimizer פותר את 'בעיית-רצף-הטעמים' השבועית: עשרות אצוות, Setup Matrix תלוי-זוג-טעמים, ושני קווים — הוא מחזיר רצף שממזער שטיפות-CIP (עלות-Setup) תוך עמידה במרב תאריכי-המשלוח.",
      navHe: [
        "SAP APO ► PP/DS ► Detailed Scheduling ► Optimization ► Maintain Optimization Profile (/SAPAPO/CDPSC5)",
        "Detailed Scheduling Planning Board ► Functions ► Optimize (/SAPAPO/CDPS0)",
        "SAP APO ► PP/DS ► Detailed Scheduling ► Optimization ► Monitor Optimization Runs",
      ],
      tables: ["/SAPAPO/OPTPROF", "/SAPAPO/SETMATRIX", "/SAPAPO/ORDKEY"],
      tcodes: ["/SAPAPO/CDPSC5", "/SAPAPO/CDPS0", "/SAPAPO/OPT_LOG"],
      fiori: ["F2336"],
      configHe: [
        "תחזק Optimization profile (/SAPAPO/CDPSC5): Objective functions ומשקלים.",
        "הגדר runtime-budget (זמן-ריצה מרבי) ו-Optimization horizon.",
        "ודא Setup matrix, Modes ו-priorities נקיים.",
        "הגדר Fixing לפעולות שאסור-להזיז.",
      ],
      flow: [
        { he: "מודל-נתונים נקי", code: "Setup/Modes/Priorities" },
        { he: "Optimization profile + משקלים", code: "/SAPAPO/CDPSC5" },
        { he: "Fixing פעולות-קבועות", note: "לא-זזות" },
        { he: "הרץ Optimizer", code: "/SAPAPO/CDPS0" },
        { he: "Monitor + קבל/דחה", code: "/SAPAPO/OPT_LOG" },
      ],
      masterDataHe: [
        "Setup Matrix (עלות/זמן-מעבר), Modes/Alternative resources, Demand/Pegging priorities.",
        "Optimization profile מקושר ללוח/Run; runtime-budget קובע איכות-מול-זמן.",
      ],
      mistakesHe: [
        "הרצת Optimizer ללא Setup matrix נקי ➔ 'אופטימום' חסר-משמעות.",
        "משקלים סותרים/קיצוניים ➔ פתרון מעוות.",
        "runtime-budget קצר מדי ➔ פתרון רחוק-מאופטימום.",
        "אי-Fixing פעולות-אושרו ➔ ה-Optimizer מזיז החלטות-ידניות.",
      ],
      troubleshootHe: [
        "תוצאה לא-הגיונית ➔ משקלי Objective functions או Setup matrix שגויים.",
        "ה-Optimizer 'לא שיפר' ➔ runtime-budget קצר או יותר-מדי Fixing.",
        "ריצה נכשלה ➔ בדוק Optimization log (/SAPAPO/OPT_LOG) ושלמות-המודל.",
      ],
      bestPracticeHe: [
        "נקה את מודל-הנתונים (Setup/Modes/priorities) לפני הרצה.",
        "התחל ממשקלים-מאוזנים וכוונן בהדרגה.",
        "הקצה runtime-budget ריאלי; קבע (Fix) החלטות-ידניות.",
        "נטר ריצות (log) והשווה לפני קבלה.",
      ],
      interviewHe: [
        { qHe: "מתי משתמשים ב-Detailed Scheduling Optimizer ולא ב-Heuristic?", aHe: "בבעיות-רצף מורכבות (Setup תלוי-רצף, ריבוי-משאבים, איחורים, מטרות-מתחרות) שבהן כלל-Heuristic פשוט לא מספיק; ה-Optimizer מחפש פתרון קרוב-לאופטימלי לפי Objective functions משוקללות." },
        { qHe: "על מה נשען ה-Optimizer?", aHe: "Cost-based optimization — לכל Setup/איחור/הפרת-אילוץ מוקצית-עלות, וה-Optimizer ממזער את סך-העלות לפי משקלי-המטרות ב-Optimization profile, בתוך runtime-budget." },
        { qHe: "מהו תנאי-סף לתוצאה-טובה מה-Optimizer?", aHe: "מודל-נתונים נקי — Setup matrix מדויק, Modes/Alternative resources ו-priorities — ו-runtime-budget מספק; קלט גרוע = 'אופטימום' חסר-משמעות." },
      ],
      takeawaysHe: [
        "Optimizer = פתרון קרוב-לאופטימלי לבעיות-רצף מורכבות.",
        "Cost-based, רב-מטרתי, לפי Optimization profile.",
        "דורש מודל-נתונים נקי ו-runtime-budget.",
        "ב-CBC: מזעור שטיפות-CIP תלויות-זוג-טעמים.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · Heuristics (6.3)", href: "/library/ppds/chapter-06/#sub-6.3" },
        { labelHe: "PP/DS · מזעור זמן-ריצה (6.3.4)", href: "/library/ppds/chapter-06/#sub-6.3.4" },
      ],
      children: [
        {
          id: "6.5.1",
          titleHe: "פונקציות מטרה",
          titleEn: "Objective Functions",
          execHe:
            "Objective functions הן המטרות שה-Optimizer ממזער/ממקסם — מזעור-Setup, מזעור-איחורים (Lateness/Delay), מזעור-זמן-ריצה, מזעור-מלאי, מקסום-ניצול. כל מטרה מקבלת משקל, והשילוב-המשוקלל מגדיר 'מהו תזמון-טוב' עבור הארגון.",
          beginnerHe:
            "אתה אומר ל-Optimizer מה חשוב לך: הכי-פחות-החלפות? הכי-פחות-איחורים? אתה נותן 'ניקוד' (משקל) לכל מטרה, והוא מוצא את הסידור עם הניקוד-הכולל-הטוב-ביותר.",
          consultantHe:
            "ב-Optimization profile מוגדרות פונקציות-מטרה עם משקלים/עלויות: Setup time/cost, Delay costs (per lateness), Max lead time, Storage/inventory costs, Mode costs ו-Total runtime. ה-Optimizer ממזער את סך-העלות-המשוקללת. משקלים-יחסיים הם הכלי לאיזון-מטרות-מתחרות (למשל Setup מול Delay). חשוב לכייל משקלים מול עלויות-עסקיות אמיתיות, אחרת ה'אופטימום' לא תואם-מציאות.",
          purposeHe:
            "לתרגם את עדיפויות-העסק (מה יקר יותר — החלפה או איחור?) לשפה-מתמטית שה-Optimizer יכול לאזן ולמזער.",
          processExampleHe:
            "ארגון שעלות-איחור-ללקוח גבוהה מעלות-Setup נותן משקל-גבוה ל-Delay costs ומשקל-נמוך ל-Setup; ה-Optimizer יעדיף עמידה-בתאריכים גם במחיר החלפות-נוספות.",
          cbcHe:
            "ב-CBC עלות שטיפת-CIP (Setup) גבוהה, ולכן Setup-cost מקבל משקל-גבוה; אך לפני חג, המשקל של Delay מוגבר זמנית כדי להבטיח עמידה-בתאריכי-קמעונאות גם במחיר שטיפות-נוספות.",
          navHe: ["SAP APO ► PP/DS ► Detailed Scheduling ► Optimization ► Optimization Profile ► Objective Functions (/SAPAPO/CDPSC5)"],
          tables: ["/SAPAPO/OPTPROF"],
          tcodes: ["/SAPAPO/CDPSC5"],
          fiori: ["F2336"],
          configHe: [
            "הפעל פונקציות-מטרה רלוונטיות: Setup, Delay, Max lead time, Storage, Mode, Runtime.",
            "הקצה משקל/עלות לכל מטרה.",
            "כייל משקלים מול עלויות-עסקיות אמיתיות.",
          ],
          mistakesHe: [
            "משקלים שרירותיים ➔ 'אופטימום' לא-תואם-עסק.",
            "מטרה-יחידה דומיננטית ➔ הזנחת-מטרות-אחרות (כל-Setup, המון-איחורים).",
            "אי-עדכון-משקלים לעונה/מצב ➔ עדיפויות לא-מעודכנות.",
          ],
          troubleshootHe: [
            "הרבה איחורים ➔ משקל-Delay נמוך מדי.",
            "הרבה-החלפות ➔ משקל-Setup נמוך מדי.",
            "תוצאה קיצונית ➔ מטרה-בודדת דומיננטית; אזן משקלים.",
          ],
          bestPracticeHe: [
            "כייל משקלים מול עלויות-אמת ובדוק תוצאות.",
            "אזן בין מטרות-מתחרות; הימנע מדומיננטיות-יחידה.",
            "עדכן משקלים לפי עונה/מצב (חג מול שגרה).",
          ],
          interviewHe: [
            { qHe: "מהן Objective functions ב-Optimizer?", aHe: "המטרות המשוקללות שה-Optimizer ממזער — Setup, Delay/Lateness, Runtime, Storage, Mode — שמגדירות יחד 'מהו תזמון-טוב' לארגון." },
            { qHe: "כיצד מאזנים מטרות-מתחרות?", aHe: "דרך משקלים-יחסיים (Setup מול Delay וכו'), מכוילים מול עלויות-עסקיות אמיתיות; שינוי-משקל משנה את אופי-הפתרון." },
          ],
          takeawaysHe: [
            "Objective functions = מטרות-התזמון המשוקללות.",
            "משקלים מאזנים מטרות-מתחרות.",
            "כייל מול עלויות-אמת ועדכן לפי מצב.",
          ],
        },
        {
          id: "6.5.2",
          titleHe: "פרופיל אופטימיזציה",
          titleEn: "Optimization Profile",
          execHe:
            "ה-Optimization profile הוא המכל שמרכז את כל הגדרות-ה-Optimizer: פונקציות-המטרה ומשקליהן, runtime-budget, אופק-אופטימיזציה, אסטרטגיה, ואילוצים. הוא הישות הניתנת-לשיוך שמופעלת בכל הרצת-Optimizer — קבוע ועקבי.",
          beginnerHe:
            "כל ההגדרות של ה-Optimizer ארוזות ב'פרופיל' אחד עם שם: מה המטרות, כמה-זמן-לרוץ, ואיזה אופק. בוחרים פרופיל ומריצים — לא מגדירים הכל-מחדש בכל פעם.",
          consultantHe:
            "מתוחזק ב-/SAPAPO/CDPSC5. כולל: Objective functions + weights, Maximum runtime (budget), Optimization horizon, Resource/Operation selection, DS strategy reference, ואופציות (Setup optimization on/off, Multiresource on/off, Fixing-behavior). משויך ל-Planning Board / Production Planning Run. ניתן לתחזק כמה פרופילים (שגרה מול חג, מזער-Setup מול עמידה-בתאריכים) ולבחור לפי-מצב.",
          purposeHe:
            "לארוז את כל תצורת-ה-Optimizer לישות אחת ניתנת-לשימוש-חוזר, כדי שהרצות יהיו עקביות, ניתנות-לשחזור וקלות-להחלפה.",
          processExampleHe:
            "אדמין מגדיר פרופיל 'OPT_STD' (Setup-משקל-גבוה, runtime 5דק') ופרופיל 'OPT_HOLIDAY' (Delay-משקל-גבוה, runtime 10דק'); המתכנן בוחר פרופיל לפי-העונה ומריץ.",
          cbcHe:
            "ב-CBC שני פרופילים: 'OPT_STD' (מזעור-שטיפות-CIP) לשגרה, ו-'OPT_PEAK' (עמידה-בתאריכים) לעונת-שיא; המתכנן מחליף ביניהם לפי לוח-השנה.",
          navHe: ["SAP APO ► PP/DS ► Detailed Scheduling ► Optimization ► Maintain Optimization Profile (/SAPAPO/CDPSC5)"],
          tables: ["/SAPAPO/OPTPROF"],
          tcodes: ["/SAPAPO/CDPSC5", "/SAPAPO/CDPS0"],
          fiori: ["F2336"],
          configHe: [
            "צור Optimization profile בעל-שם ב-/SAPAPO/CDPSC5.",
            "הגדר Objective functions+weights, Maximum runtime ו-Optimization horizon.",
            "הגדר אופציות: Setup optimization, Multiresource, Fixing-behavior.",
            "שייך ל-Planning Board / Production Planning Run.",
          ],
          mistakesHe: [
            "פרופיל-יחיד לכל מצב ➔ לא מתאים לשגרה ולחג גם יחד.",
            "Maximum runtime לא-ריאלי (קצר/ארוך מדי) ➔ פתרון-גרוע או בזבוז-זמן.",
            "Optimization horizon רחב מדי ➔ ריצה כבדה.",
          ],
          troubleshootHe: [
            "תוצאות לא-עקביות בין הרצות ➔ פרופיל לא-קבוע / נבחר פרופיל שונה.",
            "ריצה ארוכה מדי ➔ horizon/runtime גדולים מדי.",
            "מטרות לא-נכונות ➔ נבחר פרופיל לא-מתאים למצב.",
          ],
          bestPracticeHe: [
            "תחזק מספר-מצומצם של פרופילים בעלי-שם משמעותי (Std/Peak).",
            "התאם runtime ו-horizon לגודל-הבעיה.",
            "תעד מתי משתמשים בכל פרופיל.",
          ],
          interviewHe: [
            { qHe: "מה מכיל Optimization profile?", aHe: "Objective functions+weights, Maximum runtime, Optimization horizon, Resource/Operation selection, אסטרטגיה ואופציות (Setup/Multiresource/Fixing) — כל תצורת-ה-Optimizer בישות אחת." },
            { qHe: "מדוע להחזיק כמה פרופילים?", aHe: "כדי להחליף עדיפויות לפי-מצב — למשל מזעור-Setup בשגרה מול עמידה-בתאריכים בעונת-שיא — בלי להגדיר-מחדש בכל פעם." },
          ],
          takeawaysHe: [
            "Optimization profile = מכל כל הגדרות-ה-Optimizer.",
            "כולל מטרות+משקלים, runtime ו-horizon.",
            "החזק פרופילים לפי-מצב (Std/Peak).",
          ],
        },
        {
          id: "6.5.3",
          titleHe: "הרצה וניטור של אופטימיזציית תזמון מפורט",
          titleEn: "Execute and Monitor Detailed Scheduling Optimizer Runs",
          execHe:
            "לאחר הגדרת-הפרופיל, מריצים את ה-Optimizer (מהלוח או ברקע) ומנטרים את התוצאה: זמן-ריצה, ערכי-Objective functions, הפרות-אילוצים והשוואה-לפני/אחרי. הניטור הוא שלב-קריטי — מקבלים פתרון רק לאחר בדיקה שהוא משפר באמת.",
          beginnerHe:
            "מפעילים את ה-Optimizer ומחכים שיסיים. אחר-כך בודקים: האם זה באמת יצא טוב-יותר? כמה-החלפות? כמה-איחורים? רק אם השתפר — שומרים; אחרת מכווננים ומריצים-שוב.",
          consultantHe:
            "ההרצה מ-/SAPAPO/CDPS0 (אינטראקטיבי) או כ-background job (Production Planning Run). הניטור דרך Optimization log (/SAPAPO/OPT_LOG): runtime בפועל, ערכי-מטרה לפני/אחרי, אזהרות/שגיאות, פעולות שלא-תוזמנו (Non-scheduled), והפרות-אילוצים. שגיאות-נפוצות בלוג: model inconsistency, infeasible constraints, timeout. מקבלים את הפתרון רק לאחר אימות-שיפור; אפשר Undo. מומלץ לשמור Optimization-runs להשוואה ולתחקור.",
          purposeHe:
            "להבטיח שכל הרצת-Optimizer אכן משפרת לפי-המטרות, לאתר בעיות-מודל/אילוצים, ולקבל החלטה-מבוססת-נתונים אם לקבל את התוצאה.",
          processExampleHe:
            "המתכנן מריץ Optimizer, פותח את ה-Optimization log, רואה Setup ירד מ-6 ל-3.5 שעות ו-2 איחורים-בלבד, מאמת שאין פעולות Non-scheduled, ומקבל את הפתרון; אחרת — מכוונן משקלים ומריץ-שוב.",
          cbcHe:
            "ב-CBC המתכנן מריץ את ה-Optimizer לרצף-השבוע, בודק בלוג שמספר שטיפות-ה-CIP ירד ושכל אצוות-החג תוזמנו (אין Non-scheduled), ורק אז מקבל ושומר את הרצף.",
          navHe: [
            "Detailed Scheduling Planning Board ► Functions ► Optimize (/SAPAPO/CDPS0)",
            "SAP APO ► PP/DS ► Detailed Scheduling ► Optimization ► Monitor Optimization Runs (/SAPAPO/OPT_LOG)",
            "SAP APO ► PP/DS ► Production Planning Run (background) (/SAPAPO/CDPSB0)",
          ],
          tables: ["/SAPAPO/OPTPROF", "/SAPAPO/OPT_LOG", "/SAPAPO/ORDKEY"],
          tcodes: ["/SAPAPO/CDPS0", "/SAPAPO/OPT_LOG", "/SAPAPO/CDPSB0"],
          fiori: ["F2336"],
          configHe: [
            "הרץ Optimizer אינטראקטיבית (לוח) או ברקע (Production Planning Run).",
            "פתח Optimization log לניטור runtime, ערכי-מטרה, אזהרות והפרות.",
            "בדוק פעולות Non-scheduled לפני קבלה; השתמש ב-Undo במידת-הצורך.",
            "שמור Optimization-runs להשוואה ותחקור.",
          ],
          flow: [
            { he: "הרץ Optimizer", code: "/SAPAPO/CDPS0 / Run" },
            { he: "פתח Optimization log", code: "/SAPAPO/OPT_LOG" },
            { he: "בדוק מטרות לפני/אחרי + Non-scheduled", note: "שיפור?" },
            { he: "קבל / Undo / כוונן-והרץ-שוב", note: "החלטה" },
            { he: "שמור תזמון", code: "Save → CIF" },
          ],
          mistakesHe: [
            "קבלת-פתרון ללא בדיקת-הלוג ➔ פתרון עם פעולות Non-scheduled או הפרות.",
            "התעלמות מ-timeout בלוג ➔ פתרון רחוק-מאופטימום.",
            "אי-שמירת runs ➔ אין השוואה/תחקור.",
          ],
          troubleshootHe: [
            "פעולות לא-תוזמנו (Non-scheduled) ➔ אילוצים-נוקשים/חוסר-קיבולת; הרפה-אילוץ או הוסף-Mode.",
            "infeasible/inconsistency בלוג ➔ נקה מודל (Setup/Modes/priorities).",
            "timeout ➔ הגדל runtime-budget או צמצם-horizon.",
          ],
          bestPracticeHe: [
            "תמיד בדוק את ה-Optimization log לפני קבלה.",
            "ודא אפס (או מינימום) פעולות Non-scheduled.",
            "שמור והשווה runs; השתמש ב-Undo בחופשיות.",
            "הרץ ברקע לבעיות-גדולות, אינטראקטיבי לכוונון.",
          ],
          interviewHe: [
            { qHe: "כיצד מנטרים הרצת-Optimizer?", aHe: "דרך ה-Optimization log (/SAPAPO/OPT_LOG): runtime, ערכי-Objective functions לפני/אחרי, אזהרות/שגיאות, ופעולות Non-scheduled — ומקבלים רק לאחר אימות-שיפור." },
            { qHe: "מה עושים אם פעולות לא-תוזמנו (Non-scheduled)?", aHe: "בודקים אילוצים/קיבולת — מרפים אילוץ-נוקשה, מוסיפים Mode/משאב-חלופי, או מגדילים runtime/horizon, ומריצים-שוב." },
            { qHe: "אינטראקטיבי מול רקע — מתי כל אחד?", aHe: "אינטראקטיבי (לוח) לכוונון ובדיקה; רקע (Production Planning Run) לבעיות-גדולות ולהרצות-מתוזמנות קבועות." },
          ],
          takeawaysHe: [
            "ניטור = שלב-קריטי לפני קבלת-פתרון.",
            "Optimization log: runtime, מטרות, Non-scheduled, הפרות.",
            "קבל רק לאחר אימות-שיפור; Undo זמין.",
            "רקע לבעיות-גדולות, אינטראקטיבי לכוונון.",
          ],
          relatedHe: [{ labelHe: "PP/DS · פרופיל אופטימיזציה (6.5.2)", href: "/library/ppds/chapter-06/#sub-6.5.2" }],
        },
      ],
    },
    // ============================================================ 6.6
    {
      id: "6.6",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה הקיף את התזמון-המפורט (Detailed Scheduling) ב-PP/DS מקצה-לקצה: מתי הוא מוצדק, כיצד בונים DS strategy profile, את עולם ה-Heuristics, כלי-ההפעלה האינטראקטיביים, וה-Detailed Scheduling Optimizer. המסר המרכזי: תזמון-מפורט הופך תוכנית-תכנון (כמה/מתי-בערך) לרצף-ביצוע-מדויק (סדר/עיתוי-לדקה) על משאבים-סופיים, והכלי הנכון (Heuristic מהיר מול Optimizer חזק) נבחר לפי מורכבות-הרצף.",
      beginnerHe:
        "סיכום במשפט: למדנו לקחת 'תייצר 10,000 בקבוקים עד חמישי' ולהפוך אותו ל'קו-2, 08:00–14:30, אחרי הקולה ולפני הספרייט'. עשינו זאת עם אסטרטגיה (איך-לתזמן), Heuristics (כפתורים-חכמים), לוחות-תזמון (איפה-עובדים), ו-Optimizer (המוח-הגדול).",
      consultantHe:
        "סקירת-העל: (1) הפעל תזמון-מפורט רק על משאבי-Finite שבהם הקיבולת/הרצף קריטיים; (2) ה-DS strategy profile (/SAPAPO/CDPSC1) הוא הכלל-המרכזי — General params + Dependent objects; (3) Heuristics (/SAPAPO/CDPSC0) הם הכלי-היומיומי, ניתנים-לשרשור, נשענים על Setup Matrix; (4) ההפעלה דרך Detailed Scheduling Planning Board / Advanced Scheduling Board / Monitor Capacity Utilization / Resource Planning Table — אותו מנוע, פרסונות-שונות; (5) ה-Detailed Scheduling Optimizer (/SAPAPO/CDPSC5) לבעיות-מורכבות, Cost-based, רב-מטרתי, עם ניטור-Log חובה. כל אלה משתלבים עם תכנון-הייצור (פרק 5) ועם נתוני-האב של PP/DS.",
      purposeHe:
        "לקבע תמונה-שלמה ומעשית: לדעת מתי-להשתמש, איזה-כלי-לבחור, וכיצד-להגדיר את התזמון-המפורט כך שהתוצאה תהיה ניתנת-לביצוע, יעילה ועקבית.",
      processExampleHe:
        "תהליך-יומי טיפוסי: בוקר — Remove Backlog ב-Production Planning Run; מתכנן — Schedule Sequence + Minimize Runtime בלוח; עומס-יתר — איזון ב-Resource Planning Table; רצף-מורכב/שבועי — Detailed Scheduling Optimizer עם ניטור-Log; קיבוע-החלטות-ידניות + Save → CIF ל-S/4.",
      cbcHe:
        "ב-CBC המחזור-המלא: ניטור-עומסי-קווים (Monitor Capacity Utilization) ➔ סידור-רצף-טעמים ומזעור-שטיפות-CIP (Heuristics/Optimizer) ➔ איזון בין שני הקווים (Resource Planning Table) ➔ קיבוע אצוות-חירום ושמירה — וכך משקאות-CBC מיוצרים בסדר-מיטבי, עם פחות-החלפות ועמידה-בתאריכי-משלוח.",
      navHe: [
        "SAP APO ► PP/DS ► Detailed Scheduling ► Strategy / Heuristics / Optimization (/SAPAPO/CDPSC1, /SAPAPO/CDPSC0, /SAPAPO/CDPSC5)",
        "Detailed Scheduling Planning Board (/SAPAPO/CDPS0) ► Heuristics / Optimize / Save",
      ],
      tables: ["/SAPAPO/CDPSPARA", "/SAPAPO/HEUR", "/SAPAPO/OPTPROF", "/SAPAPO/SETMATRIX"],
      tcodes: ["/SAPAPO/CDPS0", "/SAPAPO/CDPSC1", "/SAPAPO/CDPSC0", "/SAPAPO/CDPSC5"],
      fiori: ["F2336", "F4006", "F2334"],
      configHe: [
        "ודא: משאבי-Finite + Setup Matrix + DS strategy profile + Heuristic/Optimization profiles מוגדרים ועקביים.",
        "בנה תהליך-עבודה: Backlog ➔ Sequence ➔ Runtime, ו-Optimizer לרצף-מורכב.",
        "התאם כלי-הפעלה לפרסונה ושמור עקביות-אסטרטגיה בכל הכלים.",
      ],
      flow: [
        { he: "מתי PP/DS? (Finite/רצף)", code: "6.1" },
        { he: "DS strategy profile", code: "6.2" },
        { he: "Heuristics", code: "6.3" },
        { he: "כלי-הפעלה (Boards/Apps)", code: "6.4" },
        { he: "Optimizer + ניטור", code: "6.5" },
      ],
      mistakesHe: [
        "הפעלת תזמון-מפורט היכן שאין צוואר-בקבוק — מורכבות ללא ערך.",
        "אי-עקביות-אסטרטגיה בין לוח, Heuristics ו-Optimizer.",
        "הרצת-Optimizer על מודל-נתונים לא-נקי.",
        "קבלת-פתרון ללא ניטור-Log ובדיקת Non-scheduled.",
      ],
      troubleshootHe: [
        "תזמון לא-צפוי ➔ בדוק DS strategy profile הפעיל בכל הכלים.",
        "החלפות-יקרות נשארו ➔ Setup Matrix חסר / לא-הורץ Minimize Runtime/Optimizer.",
        "פעולות-איחור 'בעבר' ➔ לא-הורץ Remove Backlog.",
        "Optimizer לא-משפר ➔ מודל לא-נקי / runtime קצר / יותר-מדי Fixing.",
      ],
      bestPracticeHe: [
        "מקד תזמון-מפורט במשאבי צוואר-בקבוק בלבד.",
        "שמור על מנוע-תזמון ואסטרטגיה אחידים בכל הכלים.",
        "התחל Heuristics, הוסף Optimizer רק למורכבות אמיתית.",
        "נטר תמיד (Alerts/Log) לפני קבלת-תוצאה ושמירה.",
      ],
      interviewHe: [
        { qHe: "תאר את זרימת-העבודה של תזמון-מפורט ב-PP/DS.", aHe: "החלט מתי-להשתמש (Finite/רצף) ➔ הגדר DS strategy profile ➔ הרץ Heuristics (Backlog/Sequence/Runtime) מלוח-התזמון ➔ אזן עומסים בכלי-ההפעלה ➔ הרץ Optimizer לרצף-מורכב עם ניטור-Log ➔ קבע-ושמור (CIF ל-S/4)." },
        { qHe: "מתי Heuristic ומתי Optimizer?", aHe: "Heuristic לעבודה-יומיומית מהירה (כלל-יחיד); Optimizer לבעיות-רצף מורכבות ורב-מטרתיות שבהן Heuristic לא מספיק — חזק יותר אך כבד יותר ודורש מודל-נקי." },
        { qHe: "מהו עקרון-העל של תזמון-מפורט?", aHe: "להפוך תוכנית (כמה/מתי-בערך) לרצף-ביצוע-מדויק (סדר/עיתוי-לדקה) על משאבים-סופיים, תוך כיבוד קיבולת ורצף, בעקביות בין כל הכלים." },
      ],
      takeawaysHe: [
        "תזמון-מפורט = תוכנית ➔ רצף-ביצוע-מדויק על משאב-Finite.",
        "DS strategy profile הכלל-המרכזי; Heuristics היומיומי; Optimizer למורכבות.",
        "אותו מנוע מאחורי כל כלי-הפעלה — שמור עקביות.",
        "נטר תמיד (Alerts/Log) לפני קבלה ושמירה.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · תכנון ייצור (פרק 5)", href: "/library/ppds/chapter-05/" },
        { labelHe: "PP/DS · מתי להשתמש בתזמון (6.1)", href: "/library/ppds/chapter-06/#sub-6.1" },
        { labelHe: "PP/DS · Detailed Scheduling Optimizer (6.5)", href: "/library/ppds/chapter-06/#sub-6.5" },
      ],
    },
  ],
};
