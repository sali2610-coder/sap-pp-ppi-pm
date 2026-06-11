// ===== QM Digital Textbook — Chapter 10: Sample Management =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Source hierarchy preserved (ids + order); CBC = Coca-Cola bottling context.
import type { TextbookChapter } from "./types";

export const CH10: TextbookChapter = {
  n: 10,
  titleHe: "ניהול דגימות",
  titleEn: "Sample Management",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לניהול דגימות פיזיות (Sample Management) ב-SAP QM. ניהול דגימות הוא מנגנון מקצה-לקצה המנהל את הדגימה הפיזית מרגע משיכתה — בקבלת-סחורה או בייצור — דרך זיהוי, אריזה, מיקום-אחסון ותיוג, ועד רישום-תוצאות במעבדה. כל תת-פרק וכל תת-סעיף מהמקור הורחב ליחידת-לימוד עצמאית בת 18 מקטעים: שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC של מילוי משקאות, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המוקד: דגימות פיזיות של משקה מוגמר, תרכיז וחומרי-גלם ב-CBC ישראל. מזהי SAP מובאים מילולית: QPV2 (Sample-Drawing Procedure), QPR4/QPR5 (Physical Samples), QA01 (Inspection Lot), QA02/QA03, תוצאות QE51N; טבלאות QPRS (Physical Sample) ו-QALS (Inspection Lot).",
  subchapters: [
    // ============================================================ 10.1
    {
      id: "10.1", titleHe: "הגדרות מפעל לניהול דגימות", titleEn: "Plant Settings",
      execHe:
        "ניהול דגימות מופעל ומכויל ברמת-המפעל. ההגדרות קובעות האם המפעל מנהל דגימות פיזיות, אילו טווחי-מספרים מקצים לדגימות, וכיצד מקושרות הדגימות למגרשי-בדיקה. ללא הפעלה נכונה ברמת-המפעל, נוהל משיכת-הדגימות (Sample-Drawing Procedure) אינו מייצר רשומות-דגימה — והמעבדה נשארת ללא אובייקט פיזי לעבוד עליו.",
      beginnerHe:
        "לפני שאפשר לעבוד עם דגימות, צריך 'להדליק' את המנגנון במפעל ולומר ל-SAP: כן, במפעל הזה מושכים דגימות פיזיות, וכך מספרים אותן. זה כמו להגדיר את כללי-הבית של המעבדה — איזה טווח-מספרים, אילו ברירות-מחדל — לפני שמתחילים לקבל בקבוקי-דגימה.",
      consultantHe:
        "ההפעלה נשענת על Inspection Type שהוגדר עם Physical-Sample Indicator, ועל טווחי-מספרים לדגימות (Number Range לאובייקט QLOS/דגימה). ברמת-המפעל מכוונים את ברירות-המחדל לנוהל משיכת-הדגימות וקישורו ל-Inspection Plan. שים לב: ניהול-דגימות אינו 'מתג מפעל' בודד אלא צירוף של Inspection Type עם דגימה פעילה, Sample-Drawing Procedure תקף, וטווחי-מספרים מוקצים. בהיעדר אחד מהם, QA01 ייצור מגרש-בדיקה בלי דגימות.",
      purposeHe:
        "להבטיח שכל מפעל שמנהל דגימות פיזיות עושה זאת באחידות — מספור עקבי, ברירות-מחדל נכונות, וקישור תקין בין הדגימה למגרש-הבדיקה ולתכנית-הבדיקה.",
      processExampleHe:
        "צוות-ההטמעה מפעיל ניהול-דגימות במפעל 1000: מגדיר Inspection Type עם דגימה, מקצה טווח-מספרים לדגימות, ובודק שב-QA01 על קבלת-סחורה נוצרות רשומות QPRS אוטומטית לצד מגרש-הבדיקה ב-QALS.",
      cbcHe:
        "ב-CBC מפעל-המילוי בישראל מוגדר כמנהל-דגימות: כל קבלת תרכיז וכל אצוות-מילוי של משקה מייצרת דגימות פיזיות. טווח-מספרים נפרד לדגימות-תרכיז ולדגימות-משקה-מוגמר, כדי שניתן יהיה לאתר בקבוק-דגימה במעבדה לפי מספרו.",
      navHe: [
        "Quality Management ► Quality Inspection ► Sample Management ► Define Number Ranges (Physical Samples)",
        "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Maintain Inspection Types",
        "Quality Management ► Basic Settings ► Maintain Settings at Plant Level",
      ],
      tables: ["QPRS", "QALS", "T001W", "TQ07"],
      tcodes: ["QA01", "QCC0", "OQN8"],
      fiori: ["F2347"],
      configHe: [
        "Number Range לדגימות פיזיות: הקצה טווח פנימי לאובייקט-הדגימה כדי שכל QPRS יקבל מספר ייחודי.",
        "Inspection Type עם Physical-Sample active: רק כך QA01 מייצר דגימות לצד מגרש-הבדיקה.",
        "ברירות-מחדל ברמת-מפעל: Sample-Drawing Procedure ברירת-מחדל וקישורו לתכנית-הבדיקה.",
        "הפרדת טווחי-מספרים לפי סוג-דגימה (תרכיז/משקה) לשיפור איתור-מעבדה.",
      ],
      flow: [
        { he: "הפעלת Inspection Type עם דגימה", code: "QCC0" },
        { he: "הקצאת טווח-מספרים לדגימות", note: "QPRS internal range" },
        { he: "קישור Sample-Drawing Procedure", code: "QPV2" },
        { he: "אימות ב-QA01", note: "נוצרים QPRS + QALS" },
      ],
      masterDataHe: [
        "T001W = מפעל · TQ07 = הגדרות-QM ברמת-מפעל.",
        "QPRS = רשומת-הדגימה הפיזית · QALS = כותרת מגרש-הבדיקה.",
      ],
      mistakesHe: [
        "הפעלת Inspection Type בלי לסמן דגימה — מגרש נוצר אך בלי דגימות פיזיות.",
        "שכחת הקצאת טווח-מספרים — שגיאת 'No number range' ביצירת-דגימה.",
        "שימוש בטווח-מספרים אחד לכל הסוגים — קושי באיתור לפי מספר.",
      ],
      troubleshootHe: [
        "QA01 לא יוצר דגימות ➔ Inspection Type ללא Physical-Sample active או Sample-Drawing Procedure לא מקושר.",
        "שגיאת מספור ➔ טווח-מספרים לדגימות לא הוקצה למפעל.",
        "דגימות נוצרות במפעל לא-נכון ➔ ברירת-מחדל ברמת-מפעל שגויה.",
      ],
      bestPracticeHe: [
        "הגדר ניהול-דגימות מוקדם במימוש, לצד הגדרת Inspection Types.",
        "תקנן טווחי-מספרים נפרדים לפי סוג-חומר לאיתור-מעבדה מהיר.",
        "בדוק מקצה-לקצה ב-QA01 לפני העלייה לאוויר — מגרש + דגימות יחד.",
      ],
      interviewHe: [
        { qHe: "מה נדרש כדי שמפעל ינהל דגימות פיזיות?", aHe: "Inspection Type עם Physical-Sample active, Sample-Drawing Procedure תקף, וטווח-מספרים מוקצה לדגימות. ללא צירוף זה, QA01 יוצר מגרש בלי דגימות." },
        { qHe: "מה הקשר בין QPRS ל-QALS?", aHe: "QALS היא כותרת מגרש-הבדיקה; QPRS היא רשומת-הדגימה הפיזית המקושרת אליו. דגימה אחת או יותר משויכת למגרש." },
      ],
      takeawaysHe: [
        "ניהול-דגימות מופעל ברמת-המפעל כצירוף הגדרות, לא כמתג בודד.",
        "Inspection Type + טווח-מספרים + Sample-Drawing Procedure = תנאי-סף.",
        "QPRS (דגימה) ו-QALS (מגרש) הן טבלאות-הליבה.",
      ],
      relatedHe: [
        { labelHe: "QM · נוהל משיכת-דגימות (10.2.1)", href: "/library/qm/chapter-10/#sub-10.2.1" },
        { labelHe: "אובייקט · QPRS", href: "/library/qm/object/QPRS/" },
      ],
    },
    // ============================================================ 10.2
    {
      id: "10.2", titleHe: "נתוני אב", titleEn: "Master Data",
      execHe:
        "נתוני-האב של ניהול-דגימות הם הבסיס שעליו נשען כל תהליך-הדגימה: נוהל משיכת-הדגימות (Sample-Drawing Procedure) המגדיר כמה דגימות למשוך וכיצד, ותכנית-הבדיקה (Inspection Plan) המקשרת מאפייני-בדיקה לדגימות. ללא נתוני-אב נכונים, המערכת אינה יודעת כמה בקבוקים למשוך, איך לאגד אותם, ואילו בדיקות לבצע.",
      beginnerHe:
        "כדי שדגימות יעבדו צריך שני 'מתכונים': אחד שאומר כמה דגימות לקחת ואיך (נוהל משיכת-דגימות), ושני שאומר אילו בדיקות לעשות עליהן (תכנית-בדיקה). שני אלה הם נתוני-האב — מגדירים אותם פעם אחת ומשתמשים בהם שוב ושוב.",
      consultantHe:
        "נתוני-האב כוללים את ה-Sample-Drawing Procedure (QPV2) הנושא Sample-Drawing Item-ים ו-Physical-Sample Types, ואת ה-Inspection Plan (QP01) שאליו מקשרים את הנוהל. הקישור נעשה בכותרת תכנית-הבדיקה דרך שדה Sample-Drawing Procedure. כך, ביצירת מגרש-בדיקה, המערכת קוראת את הנוהל ויודעת כמה דגימות פיזיות ליצור ומאיזה סוג.",
      purposeHe:
        "להפריד את 'כמה ואיך מושכים' (נוהל) מ'מה בודקים' (תכנית), ולאפשר שימוש-חוזר אחיד בין חומרים ומגרשים — תחזוקה יחידה, אכיפה עקבית.",
      processExampleHe:
        "יועץ-QM יוצר נוהל משיכת-דגימות 'BEVERAGE-GR' עם שני Items (דגימת-מעבדה ודגימת-שימור), מקשר אותו לתכנית-הבדיקה של המשקה, וכך כל קבלת-סחורה מייצרת אוטומטית שתי דגימות עם הבדיקות הנכונות.",
      cbcHe:
        "ב-CBC נתוני-האב מוגדרים לכל קבוצת-מוצרים: נוהל-משיכה לתרכיז (דגימה למעבדה + דגימת-שימור), ונוהל-משיכה למשקה-מוגמר (דגימה לקו-המילוי + Pooled Sample לבדיקות-מיקרוביולוגיה).",
      navHe: [
        "Quality Management ► Quality Planning ► Inspection Planning ► Sample ► Edit Sample-Drawing Procedure (QPV2)",
        "Quality Management ► Quality Planning ► Inspection Planning ► Inspection Plan ► Create (QP01)",
      ],
      tables: ["QPV1", "QPV2", "PLKO", "PLMK"],
      tcodes: ["QPV2", "QP01", "QP02", "QDV1"],
      fiori: ["F2348"],
      configHe: [
        "Sample-Drawing Procedure (QPV2): כמות-דגימות, Sample-Drawing Items, Physical-Sample Types.",
        "Inspection Plan (QP01): מאפייני-בדיקה + קישור Sample-Drawing Procedure בכותרת.",
        "Sampling Procedure (QDV1) מול Sample-Drawing Procedure: הראשון קובע גודל-מדגם סטטיסטי לבדיקה, השני קובע משיכה-פיזית.",
      ],
      flow: [
        { he: "יצירת נוהל משיכת-דגימות", code: "QPV2" },
        { he: "הגדרת Sample-Drawing Items + Types", note: "כמה ואילו דגימות" },
        { he: "יצירת תכנית-בדיקה", code: "QP01" },
        { he: "קישור הנוהל לתכנית", note: "שדה בכותרת" },
      ],
      masterDataHe: [
        "QPV1/QPV2 = נוהל משיכת-דגימות וסעיפיו · PLKO = כותרת תכנית-בדיקה · PLMK = מאפייני-בדיקה.",
      ],
      mistakesHe: [
        "בלבול בין Sampling Procedure (QDV1) ל-Sample-Drawing Procedure (QPV2) — שניים שונים.",
        "יצירת נוהל אך אי-קישורו לתכנית-הבדיקה — אין דגימות במגרש.",
        "כפילות-נהלים כמעט-זהים במקום שימוש-חוזר.",
      ],
      troubleshootHe: [
        "מגרש נוצר בלי דגימות ➔ הנוהל לא מקושר בכותרת תכנית-הבדיקה.",
        "כמות-דגימות שגויה ➔ Sample-Drawing Items בנוהל לא תואמים את הצורך.",
      ],
      bestPracticeHe: [
        "הקפד על הבחנה בין משיכה-פיזית (QPV2) לדגימה-סטטיסטית (QDV1).",
        "תכנן ספריית-נהלים לפי קבוצות-מוצרים, ושמור על שימוש-חוזר.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Sampling Procedure ל-Sample-Drawing Procedure?", aHe: "Sampling Procedure (QDV1) קובע גודל-מדגם וכללי-קבלה סטטיסטיים לבדיקה; Sample-Drawing Procedure (QPV2) קובע את המשיכה הפיזית — כמה דגימות פיזיות, מאיזה סוג, וכיצד לאגד אותן." },
        { qHe: "היכן מקשרים נוהל-משיכה לתכנית-בדיקה?", aHe: "בכותרת תכנית-הבדיקה (QP01/QP02), בשדה ה-Sample-Drawing Procedure." },
      ],
      takeawaysHe: [
        "שני נתוני-אב: נוהל-משיכה (כמה/איך) + תכנית-בדיקה (מה בודקים).",
        "הקישור נעשה בכותרת תכנית-הבדיקה.",
        "אל תבלבל QPV2 (פיזי) עם QDV1 (סטטיסטי).",
      ],
      relatedHe: [
        { labelHe: "QM · תכנית-בדיקה (10.2.2)", href: "/library/qm/chapter-10/#sub-10.2.2" },
      ],
      children: [
        {
          id: "10.2.1", titleHe: "נוהל משיכת דגימות", titleEn: "Sample-Drawing Procedure",
          execHe: "נוהל משיכת-הדגימות (Sample-Drawing Procedure) הוא נתון-האב המרכזי של ניהול-דגימות: הוא קובע כמה דגימות פיזיות למשוך, מאיזה סוג (Physical-Sample Type), וכיצד לאגד אותן לדגימות-מאוגמות (Pooled). הוא ה'הוראה' שלפיה SAP מייצר רשומות-דגימה בכל מגרש-בדיקה.",
          beginnerHe: "זהו המתכון שאומר: 'בכל קבלה קח 2 בקבוקים — אחד למעבדה, אחד לשימור'. הנוהל מגדיר את הכמות, הסוג, והאם לערבב כמה משיכות לדגימה אחת.",
          consultantHe: "ב-QPV2 הנוהל מורכב מ-Sample-Drawing Items, כשכל Item נושא Physical-Sample Type (Primary/Pooled/Reserve), כמות, ויחידת-מידה. אפשר להגדיר חישוב-כמות דינמי (Size of physical sample) ולקשר Container ו-Location. הנוהל נקשר לתכנית-הבדיקה ומופעל ביצירת המגרש — אז נוצרות רשומות QPRS לפי ה-Items.",
          purposeHe: "להגדיר באופן מרכזי וחוזר את אופן משיכת-הדגימה הפיזית — כמות, סוג ואגירה — ולאכוף אותו בכל מגרש-בדיקה אוטומטית.",
          processExampleHe: "נוהל 'CONC-GR' מגדיר Item 1 = דגימת-מעבדה 250 מ\"ל (Primary), Item 2 = דגימת-שימור 250 מ\"ל (Reserve). ביצירת מגרש לקבלת-תרכיז, נוצרות שתי QPRS תואמות.",
          cbcHe: "ב-CBC נוהל-המשקה מגדיר דגימה-ראשית לבדיקות פיזיקליות (Brix, CO2) בקו-המילוי, ודגימה מאוגמת (Pooled) המורכבת ממספר נקודות-מילוי לאורך האצווה לבדיקה מיקרוביולוגית.",
          navHe: ["Quality Management ► Quality Planning ► Inspection Planning ► Sample ► Edit Sample-Drawing Procedure (QPV2)"],
          tables: ["QPV1", "QPV2", "QPVT"],
          tcodes: ["QPV2", "QPV3", "QPV4"],
          fiori: ["F2348"],
          configHe: [
            "Sample-Drawing Items: לכל Item — Physical-Sample Type, כמות, יחידה.",
            "Size of physical sample: כמות קבועה או נוסחת-חישוב מתוך כמות-המגרש.",
            "שיוך Container ו-Storage Location לדגימה.",
            "Pooled Sample: אגירת מספר משיכות לדגימה מאוגמת אחת.",
          ],
          flow: [
            { he: "פתיחת נוהל", code: "QPV2" },
            { he: "הוספת Sample-Drawing Item", note: "סוג + כמות" },
            { he: "הגדרת Pooled/Reserve", note: "לפי הצורך" },
            { he: "קישור Container/Location", code: "QPR4" },
          ],
          masterDataHe: ["QPV1/QPV2 = כותרת ו-Items של הנוהל · QPVT = טקסטים."],
          mistakesHe: [
            "הגדרת Item בלי Physical-Sample Type — שגיאה ביצירת-דגימה.",
            "כמות קבועה במקום חישוב דינמי כשהמגרש משתנה בגודלו.",
            "ערבוב דגימה-ראשית עם מאוגמת ללא הבנה — בדיקות מתבצעות על האובייקט הלא-נכון.",
          ],
          troubleshootHe: [
            "לא נוצרות דגימות ➔ נוהל ללא Items או לא מקושר לתכנית.",
            "כמות-דגימה לא-הגיונית ➔ נוסחת Size of physical sample שגויה.",
          ],
          bestPracticeHe: [
            "השתמש בחישוב-כמות דינמי כשגודל-המגרש משתנה.",
            "הפרד בבירור Primary/Pooled/Reserve לפי שימוש-המעבדה.",
          ],
          interviewHe: [
            { qHe: "מה מגדיר Sample-Drawing Procedure?", aHe: "כמה דגימות פיזיות למשוך, מאיזה Physical-Sample Type, באיזו כמות, וכיצד לאגד אותן — דרך Sample-Drawing Items ב-QPV2." },
            { qHe: "מהי דגימה מאוגמת (Pooled)?", aHe: "דגימה אחת המורכבת מאיחוד מספר משיכות-משנה (Primary samples), משמשת לבדיקות שדורשות נפח מאוחד או ייצוג ממוצע." },
          ],
          takeawaysHe: [
            "QPV2 = נתון-האב הקובע משיכה פיזית.",
            "מורכב מ-Sample-Drawing Items עם סוג וכמות.",
            "תומך ב-Primary, Pooled ו-Reserve.",
          ],
          relatedHe: [{ labelHe: "אובייקט · QPV2", href: "/library/qm/object/QPV2/" }],
        },
        {
          id: "10.2.2", titleHe: "תכנית בדיקה", titleEn: "Inspection Plan",
          execHe: "תכנית-הבדיקה (Inspection Plan) מגדירה את מאפייני-הבדיקה (Inspection Characteristics) שיבוצעו על הדגימות, ומקשרת אליהם את נוהל משיכת-הדגימות. היא המקור שממנו מגרש-הבדיקה גוזר את מה שיש לבדוק ועל כמה דגימות.",
          beginnerHe: "אם הנוהל אומר 'כמה בקבוקים', התכנית אומרת 'אילו בדיקות לעשות על כל בקבוק' — Brix, חומציות, CO2 וכו'. שני אלה יחד נותנים תמונה מלאה.",
          consultantHe: "ב-QP01 בונים Operation-ים עם Inspection Characteristics (PLMK), כל מאפיין מקושר ל-Master Inspection Characteristic (QS21) ול-Sampling Procedure (QDV1) לגודל-מדגם. בכותרת התכנית מקשרים את ה-Sample-Drawing Procedure, וכך המגרש שנוצר יודע גם מה לבדוק וגם כמה דגימות פיזיות למשוך.",
          purposeHe: "לקבוע את תוכן-הבדיקה (מאפיינים, ערכי-יעד, גבולות) ולחבר אותו למשיכה-הפיזית, כך שהמעבדה מקבלת אובייקט-דגימה עם רשימת-בדיקות מוכנה.",
          processExampleHe: "תכנית-בדיקה למשקה כוללת מאפיינים: Brix (יעד 10.5±0.2), pH, CO2, מראה. בכותרת מקושר נוהל-המשיכה. כל מגרש מקבל את המאפיינים על הדגימות שנמשכו.",
          cbcHe: "ב-CBC תכנית-בדיקת-המשקה כוללת מאפיינים פיזיקליים-כימיים (Brix, CO2, pH) ומאפיינים מיקרוביולוגיים על הדגימה המאוגמת. נוהל-המשיכה מקושר בכותרת.",
          navHe: ["Quality Management ► Quality Planning ► Inspection Planning ► Inspection Plan ► Create (QP01)"],
          tables: ["PLKO", "PLPO", "PLMK", "QDPS"],
          tcodes: ["QP01", "QP02", "QP03", "QS21"],
          fiori: ["F2349"],
          configHe: [
            "Operations + Inspection Characteristics (PLMK) עם ערכי-יעד וגבולות.",
            "קישור Master Inspection Characteristics (QS21) למאפיינים.",
            "קישור Sampling Procedure (QDV1) לגודל-מדגם לבדיקה.",
            "קישור Sample-Drawing Procedure בכותרת התכנית.",
          ],
          flow: [
            { he: "יצירת תכנית", code: "QP01" },
            { he: "הוספת Operation + מאפיינים", code: "PLMK" },
            { he: "קישור Sampling Procedure", code: "QDV1" },
            { he: "קישור Sample-Drawing Procedure", code: "QPV2", note: "בכותרת" },
          ],
          masterDataHe: ["PLKO = כותרת · PLPO = פעולות · PLMK = מאפיינים · QDPS = שיוך נוהל-משיכה."],
          mistakesHe: [
            "מאפיין ללא Sampling Procedure — אין גודל-מדגם, רישום-תוצאות תקוע.",
            "שכחת קישור Sample-Drawing Procedure בכותרת — מגרש בלי דגימות.",
            "ערכי-יעד/גבולות שגויים — דגימות תקינות נדחות או להפך.",
          ],
          troubleshootHe: [
            "אין מאפיינים במגרש ➔ Operation ללא מאפיינים או תכנית לא תקפה לחומר.",
            "אין דגימות פיזיות ➔ Sample-Drawing Procedure לא מקושר בכותרת.",
          ],
          bestPracticeHe: [
            "השתמש ב-Master Inspection Characteristics לאחידות בין תכניות.",
            "ודא שכל מאפיין הדורש מדגם מקושר ל-Sampling Procedure.",
          ],
          interviewHe: [
            { qHe: "כיצד תכנית-הבדיקה מתחברת לדגימות פיזיות?", aHe: "דרך קישור ה-Sample-Drawing Procedure בכותרת תכנית-הבדיקה; ביצירת המגרש נגזרות הן הבדיקות והן הדגימות הפיזיות." },
            { qHe: "מהו ההבדל בין מאפיין-בדיקה ל-Sampling Procedure בתכנית?", aHe: "המאפיין קובע מה בודקים וערכי-היעד; ה-Sampling Procedure קובע על כמה פריטים/דגימות מבצעים ומהם כללי-הקבלה." },
          ],
          takeawaysHe: [
            "התכנית מגדירה מה בודקים; הנוהל — כמה דגימות.",
            "הקישור ביניהם בכותרת התכנית.",
            "כל מאפיין-דגימה חייב Sampling Procedure.",
          ],
          relatedHe: [{ labelHe: "אובייקט · PLMK", href: "/library/qm/object/PLMK/" }],
        },
        {
          id: "10.2.3", titleHe: "רשימת תיוג לנתוני אב QM", titleEn: "QM Master Data Checklist",
          execHe: "רשימת-תיוג לנתוני-האב מבטיחה שכל המרכיבים הדרושים לניהול-דגימות קיימים ומקושרים: Inspection Type, Master Inspection Characteristics, Sampling Procedure, Sample-Drawing Procedure, Inspection Plan, Physical-Sample Types, Containers ו-Locations. היא מונעת תקלות-הטמעה נפוצות שמקורן ברכיב חסר.",
          beginnerHe: "לפני שמתחילים לעבוד עם דגימות, עוברים על רשימה: הכל מוגדר? הכל מקושר? כמו צ'ק-ליסט לפני טיסה — שלא נגלה באמצע התהליך שחסר משהו.",
          consultantHe: "הרשימה בודקת תלות: Inspection Type מופעל עם דגימה → MIC (QS21) קיימים → QDV1 קיים → QPV2 קיים ומקושר ל-Plan → Physical-Sample Types מוגדרים ב-Customizing → Containers/Locations קיימים. כל חוליה חסרה מתבטאת בכשל ב-QA01 או ברישום-תוצאות. מומלץ לתעד את הרשימה כ-Cutover-checklist.",
          purposeHe: "לאכוף שלמות-נתונים ולקצר זמן-תקלות בהטמעה — לוודא שכל התלויות סגורות לפני העלייה-לאוויר.",
          processExampleHe: "בטרם cutover, צוות-QM עובר על הרשימה לכל קבוצת-מוצרים, מאתר שחסר Physical-Sample Type לדגימת-שימור, ומשלים אותו לפני שהתקלה מגיעה לרצפה.",
          cbcHe: "ב-CBC רשימת-התיוג מורצת לכל משפחת-מוצרים (תרכיז, משקה, חומרי-גלם) לפני העלייה לאוויר של מפעל-המילוי, ומבטיחה שכל נוהל-משיכה מקושר וכל Container/Location קיים.",
          navHe: ["Quality Management ► (מעבר רוחבי על כל ענפי-ה-Customizing וה-Master Data של ניהול-דגימות)"],
          tables: ["TQ07", "QPV2", "PLKO", "QPRS"],
          tcodes: ["QCC0", "QS21", "QDV1", "QPV2", "QP01"],
          fiori: ["F2347", "F2348", "F2349"],
          configHe: [
            "Inspection Type עם דגימה פעילה — קיים ומוקצה לחומר.",
            "Master Inspection Characteristics (QS21) קיימים ומשוחררים.",
            "Sampling Procedure (QDV1) + Sample-Drawing Procedure (QPV2) קיימים.",
            "Physical-Sample Types, Containers, Locations מוגדרים ב-Customizing.",
            "Inspection Plan קיים, תקף ומקשר את נוהל-המשיכה.",
          ],
          flow: [
            { he: "אימות Inspection Type", code: "QCC0" },
            { he: "אימות MIC", code: "QS21" },
            { he: "אימות נהלים", code: "QPV2" },
            { he: "אימות תכנית + קישור", code: "QP01" },
            { he: "הרצת-מבחן ב-QA01", code: "QA01" },
          ],
          masterDataHe: ["כל טבלאות-האב של QM: TQ07, QPV2, PLKO, QPRS — נבדקות לשלמות וקישור."],
          mistakesHe: [
            "דילוג על הרשימה — תקלות מתגלות ברצפה במקום בהטמעה.",
            "בדיקת רכיב בודד בלי לבדוק את שרשרת-התלות כולה.",
            "אי-תיעוד הרשימה — חזרה על אותן טעויות במפעל הבא.",
          ],
          troubleshootHe: [
            "כשל ב-QA01 ➔ עבור על הרשימה מהקצה — איזו חוליה חסרה?",
            "רישום-תוצאות תקוע ➔ MIC או Sampling Procedure חסרים בתכנית.",
          ],
          bestPracticeHe: [
            "נהל את הרשימה כ-Cutover-checklist מתועד וחתום.",
            "הרץ אותה לכל משפחת-מוצרים בנפרד.",
            "אמת תמיד בהרצת-מבחן מקצה-לקצה ב-QA01.",
          ],
          interviewHe: [
            { qHe: "מדוע צריך רשימת-תיוג לנתוני-אב QM?", aHe: "ניהול-דגימות נשען על שרשרת-תלות (Inspection Type → MIC → QDV1 → QPV2 → Plan → Sample Types/Containers/Locations); חוליה חסרה מכשילה את התהליך, והרשימה מאתרת זאת לפני העלייה-לאוויר." },
          ],
          takeawaysHe: [
            "ניהול-דגימות = שרשרת-תלות; חוליה חסרה = תקלה.",
            "הרשימה מאתרת חסרים בהטמעה, לא ברצפה.",
            "תעד והרץ לכל משפחת-מוצרים.",
          ],
        },
      ],
    },
    // ============================================================ 10.3
    {
      id: "10.3", titleHe: "תהליכים עסקיים", titleEn: "Business Processes",
      execHe:
        "התהליכים העסקיים של ניהול-דגימות מתארים את מסע-הדגימה מקצה-לקצה: מקבלת-סחורה כנגד הזמנת-רכש, דרך יצירת מגרש-בדיקה ודגימות פיזיות, שחרור ותיוג, יצירת מגרשים לדגימות, ועד רישום-תוצאות (כולל דגימות מאוגמות) ויצירה-ידנית של דגימה. זהו לב-ליבו של הפרק — התהליך החי שבו נתוני-האב הופכים לפעולה.",
      beginnerHe:
        "כאן רואים את הדגימה 'בחיים': סחורה מגיעה, נמשך בקבוק-דגימה, מדביקים עליו מדבקה, שולחים למעבדה, בודקים ורושמים תוצאה. כל שלב הוא תת-תהליך, ונלמד אותם אחד-אחד.",
      consultantHe:
        "התהליך מתחיל ב-Goods Receipt (MIGO) שמפעיל את ה-Inspection Type ויוצר מגרש (QALS) ודגימות (QPRS) לפי נוהל-המשיכה. הדגימות עוברות Release (QPR4/QPR5) ותיוג, ואז ניתן ליצור עבורן מגרשים נפרדים, לרשום תוצאות (QE51N) — לדגימה בודדת או מאוגמת — וגם ליצור דגימה ידנית (QPR1) ללא מגרש-מקור. כל שלב משאיר עקבות ב-QPRS עם סטטוס.",
      purposeHe:
        "להמיר את הגדרות-האב לזרימת-עבודה תפעולית עקבית, אכיפה אוטומטית של משיכת-דגימות, ושקיפות-מצב מלאה של כל בקבוק-דגימה מהמשיכה ועד התוצאה.",
      processExampleHe:
        "משאית-תרכיז מגיעה → MIGO רושם קבלה → נוצר מגרש + 2 דגימות → QPR4 משחרר ומדפיס מדבקות → המעבדה בודקת → QE51N רושם תוצאות → החלטת-שימוש משחררת את המלאי.",
      cbcHe:
        "ב-CBC: אצוות-מילוי משקה מסתיימת → דגימות נמשכות מקו-המילוי → משוחררות ומתויגות → נשלחות למעבדת-QA → Brix/CO2/מיקרוביולוגיה נרשמים → אישור-שחרור לפני שילוח.",
      navHe: [
        "Logistics ► Materials Management ► Inventory Management ► Goods Movement (MIGO)",
        "Quality Management ► Quality Inspection ► Physical Samples ► Edit (QPR4 / QPR5)",
        "Quality Management ► Quality Inspection ► Worklist ► Results Recording (QE51N)",
      ],
      tables: ["QALS", "QPRS", "QAVE", "MSEG"],
      tcodes: ["MIGO", "QA01", "QPR4", "QPR5", "QE51N", "QA11"],
      fiori: ["F2350", "F2351"],
      configHe: [
        "Inspection Type מקושר לתנועת-מלאי (101) להפעלה אוטומטית של מגרש.",
        "Sample-Drawing Procedure מקושר לתכנית — קובע אילו דגימות נוצרות.",
        "סטטוסים של דגימה (QPRS): Created, Released, In storage, Drawn.",
      ],
      flow: [
        { he: "קבלת-סחורה", code: "MIGO", note: "תנועה 101" },
        { he: "יצירת מגרש + דגימות", code: "QA01" },
        { he: "שחרור + תיוג", code: "QPR4" },
        { he: "מגרש לדגימה", code: "QA01" },
        { he: "רישום-תוצאות", code: "QE51N" },
        { he: "החלטת-שימוש", code: "QA11" },
      ],
      masterDataHe: ["QALS = מגרש · QPRS = דגימה · QAVE = החלטת-שימוש · MSEG = תנועת-מלאי."],
      mistakesHe: [
        "ביצוע GR בלי שה-Inspection Type עם דגימה מוקצה — אין דגימות.",
        "דילוג על Release/תיוג — דגימות-יתומות במעבדה ללא זיהוי.",
        "רישום-תוצאות על המגרש-הראשי במקום על מגרש-הדגימה.",
      ],
      troubleshootHe: [
        "אין דגימות אחרי GR ➔ Inspection Type/נוהל לא מוגדרים לחומר.",
        "אי-אפשר לרשום תוצאות ➔ דגימה לא משוחררת או מגרש-דגימה לא נוצר.",
      ],
      bestPracticeHe: [
        "אכוף Release+תיוג כשלב-חובה לפני שליחה למעבדה.",
        "השתמש ב-Worklist (QE51N) לניהול עומס-המעבדה.",
        "עקוב אחר סטטוס-הדגימה ב-QPR5 לאורך כל התהליך.",
      ],
      interviewHe: [
        { qHe: "מה מפעיל יצירת דגימות בקבלת-סחורה?", aHe: "תנועת-מלאי (101) על חומר עם Inspection Type הכולל דגימה ונוהל-משיכה מקושר; SAP יוצר אוטומטית מגרש (QALS) ודגימות (QPRS)." },
        { qHe: "מהם הסטטוסים העיקריים של דגימה פיזית?", aHe: "Created (נוצרה), Released (שוחררה), In storage/Drawn — נשמרים ב-QPRS ומשקפים את מסע-הדגימה." },
      ],
      takeawaysHe: [
        "התהליך: GR → מגרש+דגימות → שחרור+תיוג → מגרש-דגימה → תוצאות → UD.",
        "QPRS שומרת סטטוס לאורך כל המסע.",
        "Release ותיוג הם שלבי-חובה לזיהוי במעבדה.",
      ],
      relatedHe: [
        { labelHe: "QM · משיכת-דגימות בייצור (10.4)", href: "/library/qm/chapter-10/#sub-10.4" },
      ],
      children: [
        {
          id: "10.3.1", titleHe: "קבלת סחורה כנגד הזמנת רכש", titleEn: "Goods Receipt for Purchase Order",
          execHe: "קבלת-הסחורה (Goods Receipt) כנגד הזמנת-רכש היא נקודת-ההפעלה של ניהול-דגימות בכניסה. תנועת-המלאי 101 על חומר עם Inspection Type הכולל דגימה מפעילה יצירה אוטומטית של מגרש-בדיקה ושל דגימות פיזיות.",
          beginnerHe: "כשמשאית מגיעה ורושמים שקיבלנו את הסחורה, SAP יודע אוטומטית — 'החומר הזה דורש בדיקה ודגימות' — ומיד פותח מגרש-בדיקה ומייצר רשומות-דגימה.",
          consultantHe: "ב-MIGO תנועה 101 כנגד PO; אם החומר נושא Inspection Type עם דגימה ונוהל-משיכה מקושר, נוצרים QALS ו-QPRS. המלאי מנותב ל-Quality Inspection Stock (Q) עד החלטת-שימוש. ה-Movement Type והקישור ל-Inspection Setup באב-החומר הם הטריגרים.",
          purposeHe: "להבטיח שכל חומר-נכנס הדורש בדיקה יעבור דגימה אוטומטית, ושהמלאי יוחזק במלאי-בדיקה עד אישור.",
          processExampleHe: "קבלת 1,000 ק\"ג תרכיז ב-MIGO תנועה 101 → המלאי נכנס ל-Q-stock → נוצר מגרש + 2 דגימות לפי הנוהל → המעבדה מקבלת התראה.",
          cbcHe: "ב-CBC קבלת תרכיז מסְפָּק חו\"ל נרשמת ב-MIGO; המערכת חוסמת את המלאי כ-Q-stock ומייצרת דגימת-מעבדה ודגימת-שימור עד אישור-QA.",
          navHe: ["Logistics ► Materials Management ► Inventory Management ► Goods Movement ► Goods Receipt for Purchase Order (MIGO)"],
          tables: ["MSEG", "MKPF", "QALS", "QPRS"],
          tcodes: ["MIGO", "MB01"],
          fiori: ["F0843", "F2350"],
          configHe: [
            "Inspection Setup באב-החומר עם Inspection Type הכולל דגימה.",
            "Movement Type 101 מקושר ליצירת-מגרש.",
            "ניתוב אוטומטי ל-Quality Inspection Stock (Q).",
          ],
          flow: [
            { he: "רישום GR", code: "MIGO", note: "תנועה 101" },
            { he: "ניתוב ל-Q-stock" },
            { he: "יצירת מגרש + דגימות", code: "QALS/QPRS" },
          ],
          masterDataHe: ["MSEG/MKPF = מסמך-תנועה · QALS = מגרש · QPRS = דגימה."],
          mistakesHe: [
            "חומר ללא Inspection Setup — GR לא מפעיל בדיקה.",
            "תנועה לא-נכונה — מלאי לא נכנס ל-Q-stock.",
          ],
          troubleshootHe: [
            "GR לא יוצר מגרש ➔ Inspection Setup חסר או Inspection Type ללא דגימה.",
            "מלאי לא חסום ➔ ניתוב ל-Q-stock לא מוגדר.",
          ],
          bestPracticeHe: [
            "ודא Inspection Setup לכל חומר-נכנס הדורש בדיקה.",
            "השתמש ב-MIGO ולא בתנועות-עבר ידניות.",
          ],
          interviewHe: [
            { qHe: "מה גורם ל-GR לייצר מגרש ודגימות?", aHe: "תנועת-מלאי 101 על חומר עם Inspection Setup הכולל Inspection Type עם דגימה ונוהל-משיכה מקושר; אז נוצרים QALS ו-QPRS אוטומטית." },
          ],
          takeawaysHe: [
            "GR (101) הוא הטריגר לבדיקה ולדגימות בכניסה.",
            "המלאי נחסם כ-Q-stock עד החלטת-שימוש.",
            "ללא Inspection Setup — אין הפעלה.",
          ],
        },
        {
          id: "10.3.2", titleHe: "מגרש בדיקה לקבלת סחורה", titleEn: "Inspection Lot for Goods Receipt",
          execHe: "מגרש-הבדיקה (Inspection Lot) הוא האובייקט המרכזי שנוצר בקבלת-הסחורה: הוא נושא את כמות-המלאי לבדיקה, את תכנית-הבדיקה, ואת הקישור לדגימות הפיזיות. הוא ה'תיק' שתחתיו מנוהלת כל הבדיקה.",
          beginnerHe: "מגרש-בדיקה הוא כמו תיק-עבודה: 'קיבלנו 1000 ק\"ג, צריך לבדוק אותם'. כל הבדיקות, הדגימות והתוצאות מתויקות תחת מספר-המגרש.",
          consultantHe: "המגרש (QALS) נוצר עם Inspection Lot Origin (למשל 01 = GR for PO), כמות, חומר, מפעל, ותכנית-בדיקה משויכת. אם הנוהל מקושר, נוצרות דגימות (QPRS) הקשורות אליו. סטטוס-המגרש (REL, CRTD, UD) מנהל את מחזור-חייו. QA01/QA02/QA03 לתצוגה ועריכה ידנית.",
          purposeHe: "לרכז תחת אובייקט אחד את כל מרכיבי-הבדיקה — כמות, תכנית, דגימות, תוצאות והחלטת-שימוש — ולנהל את הסטטוס מקצה-לקצה.",
          processExampleHe: "GR מייצר מגרש Origin 01 לכמות 1,000 ק\"ג תרכיז; המגרש נושא את תכנית-הבדיקה ו-2 דגימות, וממתין לרישום-תוצאות.",
          cbcHe: "ב-CBC כל קבלת-תרכיז מייצרת מגרש Origin 01; כל אצוות-מילוי משקה מייצרת מגרש Origin 03/04 (ייצור), שניהם עם דגימות פיזיות.",
          navHe: [
            "Quality Management ► Quality Inspection ► Inspection Lot ► Processing ► Create (QA01)",
            "Quality Management ► Quality Inspection ► Inspection Lot ► Processing ► Display (QA03)",
          ],
          tables: ["QALS", "QAPP", "QAMR", "QPRS"],
          tcodes: ["QA01", "QA02", "QA03"],
          fiori: ["F2350"],
          configHe: [
            "Inspection Lot Origin: קובע מקור-המגרש (01 GR, 03/04 Production).",
            "שיוך אוטומטי של תכנית-בדיקה לפי חומר/מפעל.",
            "קישור דגימות (QPRS) למגרש לפי נוהל-המשיכה.",
          ],
          flow: [
            { he: "יצירת מגרש", code: "QA01", note: "אוטומטי מ-GR" },
            { he: "שיוך תכנית-בדיקה" },
            { he: "יצירת דגימות מקושרות", code: "QPRS" },
            { he: "סטטוס REL" },
          ],
          masterDataHe: ["QALS = כותרת מגרש · QAPP = פרטי-מדגם · QAMR = תוצאות-מאפיין · QPRS = דגימות."],
          mistakesHe: [
            "מגרש בלי תכנית-בדיקה משויכת — אי-אפשר לרשום תוצאות.",
            "ניסיון לרשום תוצאות על מגרש בסטטוס CRTD לא-משוחרר.",
          ],
          troubleshootHe: [
            "אין מאפיינים במגרש ➔ תכנית לא שויכה אוטומטית (חומר/מפעל/תוקף).",
            "מגרש בלי דגימות ➔ נוהל-משיכה לא מקושר לתכנית.",
          ],
          bestPracticeHe: [
            "ודא תוקף תכנית-הבדיקה כדי ששיוך אוטומטי יצליח.",
            "עקוב אחר סטטוס-המגרש ב-QA03 לפני רישום-תוצאות.",
          ],
          interviewHe: [
            { qHe: "מהו Inspection Lot Origin?", aHe: "קוד הקובע את מקור-המגרש — למשל 01 לקבלת-סחורה מ-PO, 03/04 לייצור; הוא משפיע על אופן יצירת-המגרש ושיוך-התכנית." },
            { qHe: "כיצד דגימות מתקשרות למגרש?", aHe: "כשנוהל-המשיכה מקושר לתכנית-הבדיקה, יצירת-המגרש מייצרת רשומות QPRS הקשורות ל-QALS דרך מספר-המגרש." },
          ],
          takeawaysHe: [
            "המגרש (QALS) הוא תיק-הבדיקה המרכזי.",
            "Origin קובע מקור (GR/Production).",
            "תכנית + דגימות נקשרות למגרש אוטומטית.",
          ],
          relatedHe: [{ labelHe: "אובייקט · QALS", href: "/library/qm/object/QALS/" }],
        },
        {
          id: "10.3.3", titleHe: "דגימות פיזיות לקבלת סחורה", titleEn: "Physical Samples for Goods Receipt",
          execHe: "הדגימות הפיזיות שנוצרות בקבלת-הסחורה הן האובייקטים המוחשיים — הבקבוקים או המכלים שנמשכו בפועל. כל דגימה היא רשומת QPRS עם מספר, סוג, כמות, מכל ומיקום, המקושרת למגרש-המקור.",
          beginnerHe: "אלה הבקבוקים האמיתיים שלקחנו מהמשלוח. לכל אחד יש מספר במערכת, סוג (מעבדה/שימור), ומיקום שבו הוא מאוחסן — כדי שנמצא אותו אחר-כך.",
          consultantHe: "ב-QPR4/QPR5 רואים ועורכים את הדגימות שנוצרו מהנוהל. כל QPRS נושאת Physical-Sample Type, כמות, Container, Storage Location וסטטוס. דגימות-Primary, Pooled ו-Reserve מנוהלות יחד תחת המגרש. ניתן לעדכן כמות בפועל, להחליף מכל, או לבטל דגימה.",
          purposeHe: "לתת ייצוג-מערכת מדויק לכל פריט-דגימה פיזי, עם זיהוי, מיקום ומצב — כדי שניתן יהיה לאתר, לתייג, לבדוק ולעקוב.",
          processExampleHe: "GR מייצר 2 דגימות: QPRS מס' 10000001 (מעבדה, 250 מ\"ל, מקרר A) ו-10000002 (שימור, 250 מ\"ל, ארכיון). ב-QPR4 בודקים את פרטיהן.",
          cbcHe: "ב-CBC כל דגימת-תרכיז מקבלת מספר QPRS, מסומנת לסוג (מעבדה/שימור), ומאוחסנת במקרר-המעבדה עם מיקום מתועד לאיתור.",
          navHe: ["Quality Management ► Quality Inspection ► Physical Samples ► Edit ► Sample for Lot (QPR4)"],
          tables: ["QPRS", "QPRP", "QPRST"],
          tcodes: ["QPR4", "QPR5", "QPR6"],
          fiori: ["F2351"],
          configHe: [
            "Physical-Sample Type לכל דגימה (Primary/Pooled/Reserve).",
            "Container ו-Storage Location לכל דגימה.",
            "סטטוס-דגימה: Created → Released → Drawn.",
          ],
          flow: [
            { he: "צפייה בדגימות שנוצרו", code: "QPR4" },
            { he: "עדכון כמות/מכל/מיקום" },
            { he: "מעבר לשחרור", code: "QPR5" },
          ],
          masterDataHe: ["QPRS = רשומת-דגימה · QPRP = פרטי-דגימה · QPRST = טקסט."],
          mistakesHe: [
            "אי-תיעוד Container/Location — דגימה 'אבודה' במעבדה.",
            "עריכת דגימה שכבר נבדקה — פגיעה בעקבות.",
          ],
          troubleshootHe: [
            "דגימה לא נמצאת פיזית ➔ Storage Location לא עודכן ברשומה.",
            "סוג-דגימה שגוי ➔ Physical-Sample Type בנוהל לא תואם.",
          ],
          bestPracticeHe: [
            "תעד Container ו-Location בכל דגימה מיד עם המשיכה.",
            "אל תערוך דגימה לאחר תחילת-בדיקה.",
          ],
          interviewHe: [
            { qHe: "מה מייצגת רשומת QPRS?", aHe: "דגימה פיזית בודדת — בקבוק/מכל ממשי — עם מספר, סוג, כמות, מכל, מיקום וסטטוס, המקושרת למגרש-המקור." },
          ],
          takeawaysHe: [
            "כל דגימה פיזית = רשומת QPRS.",
            "נושאת סוג, מכל, מיקום וסטטוס.",
            "תיעוד-מיקום קריטי לאיתור-מעבדה.",
          ],
          relatedHe: [{ labelHe: "אובייקט · QPRS", href: "/library/qm/object/QPRS/" }],
        },
        {
          id: "10.3.4", titleHe: "שחרור והדפסת מדבקת דגימה פיזית", titleEn: "Release and Print Physical Sample Label",
          execHe: "שחרור-הדגימה (Release) מסמן שהדגימה נמשכה בפועל וזמינה לבדיקה, והדפסת-המדבקה מספקת זיהוי פיזי — ברקוד/מספר — המחבר בין הבקבוק במעבדה לרשומה במערכת. ללא שחרור ותיוג, הדגימה אינה ניתנת לבדיקה ולמעקב.",
          beginnerHe: "אחרי שלקחנו בקבוק, מסמנים במערכת 'שוחרר — נמשך', ומדפיסים עליו מדבקה עם מספר. כך כל מי שמחזיק בבקבוק במעבדה יודע בדיוק לאיזו רשומה הוא שייך.",
          consultantHe: "ב-QPR4/QPR5 מבצעים Release לדגימה — הסטטוס עובר מ-Created ל-Released/Drawn. אז מדפיסים מדבקת-דגימה (Label) דרך Output/Print, לרוב עם ברקוד של מספר-ה-QPRS. ההדפסה נשענת על Condition/Output-type של דגימה. שחרור הוא תנאי-סף ליצירת מגרש-לדגימה ולרישום-תוצאות.",
          purposeHe: "ליצור חיבור חד-ערכי וניתן-לסריקה בין האובייקט הפיזי לרשומה הדיגיטלית, ולסמן זמינות-לבדיקה.",
          processExampleHe: "פקיד-קבלה מבצע Release ל-QPRS 10000001, מדפיס מדבקה עם ברקוד, ומדביק על הבקבוק; המעבדה סורקת את הברקוד וניגשת ישירות לרשומה.",
          cbcHe: "ב-CBC כל בקבוק-דגימה משקה מקבל מדבקה עם ברקוד מספר-הדגימה, מספר-אצווה ותאריך; סריקה במעבדה פותחת את הדגימה לרישום-תוצאות מיידי.",
          navHe: ["Quality Management ► Quality Inspection ► Physical Samples ► Edit ► Release / Print (QPR4 / QPR5)"],
          tables: ["QPRS", "NAST", "QPRSL"],
          tcodes: ["QPR4", "QPR5"],
          fiori: ["F2351"],
          configHe: [
            "Output-type/Condition להדפסת מדבקת-דגימה.",
            "פעולת Release המעבירה סטטוס ל-Released/Drawn.",
            "תוכן-מדבקה: מספר-דגימה, ברקוד, אצווה, תאריך.",
          ],
          flow: [
            { he: "בחירת דגימה", code: "QPR4" },
            { he: "Release", note: "סטטוס → Released" },
            { he: "הדפסת מדבקה", code: "QPR5", note: "ברקוד QPRS" },
            { he: "תיוג פיזי" },
          ],
          masterDataHe: ["QPRS = דגימה · NAST = רשומות-פלט · QPRSL = מדבקה."],
          mistakesHe: [
            "דילוג על Release — אי-אפשר ליצור מגרש-לדגימה.",
            "הדפסה ללא ברקוד — איתור ידני איטי ושגוי.",
          ],
          troubleshootHe: [
            "מדבקה לא מודפסת ➔ Output-type/Condition לא מוגדר.",
            "אי-אפשר ליצור מגרש-דגימה ➔ הדגימה לא שוחררה.",
          ],
          bestPracticeHe: [
            "אכוף Release+הדפסה כשלב-חובה לפני שליחה למעבדה.",
            "כלול ברקוד וזיהוי-אצווה במדבקה לסריקה.",
          ],
          interviewHe: [
            { qHe: "למה משמש שחרור-דגימה?", aHe: "לסמן שהדגימה נמשכה בפועל וזמינה לבדיקה; השחרור הוא תנאי-סף ליצירת מגרש-לדגימה ולרישום-תוצאות." },
            { qHe: "מדוע מדפיסים מדבקה?", aHe: "כדי לחבר חד-ערכית בין הבקבוק הפיזי לרשומת ה-QPRS — בדרך-כלל בברקוד — ולאפשר איתור וסריקה במעבדה." },
          ],
          takeawaysHe: [
            "Release מסמן זמינות ומאפשר את ההמשך.",
            "מדבקה עם ברקוד מחברת פיזי↔דיגיטלי.",
            "שלב-חובה לפני המעבדה.",
          ],
        },
        {
          id: "10.3.5", titleHe: "מגרשי בדיקה לדגימות פיזיות", titleEn: "Inspection Lots for Physical Samples",
          execHe: "לאחר שחרור-הדגימות ניתן ליצור עבורן מגרשי-בדיקה נפרדים — אובייקט-בדיקה ייעודי לכל דגימה (או קבוצת-דגימות), שעליו מבוצעות הבדיקות ונרשמות התוצאות. כך מופרדת הבדיקה הפיזית מהמגרש-הראשי של קבלת-הסחורה.",
          beginnerHe: "כל בקבוק-דגימה משוחרר מקבל 'תיק-בדיקה' משלו, ועליו רושמים את התוצאות. זה מפריד בין 'קיבלנו את המשלוח' לבין 'בדקנו את הבקבוק הזה'.",
          consultantHe: "ניתן ליצור מגרש-לדגימה עם Inspection Lot Origin ייעודי (למשל 15 — physical-sample inspection) מתוך QPR4/QPR5, או אוטומטית לפי הגדרה. המגרש החדש (QALS) מקושר ל-QPRS ולתכנית-הבדיקה, ועליו מתבצע רישום-התוצאות. הפרדה זו מאפשרת מעקב-בדיקה ברמת-דגימה בודדת.",
          purposeHe: "לאפשר רישום-תוצאות ומעקב ברמת-הדגימה הבודדת, בנפרד מהמגרש-הראשי, לשליטה ולעקיבות מדויקות.",
          processExampleHe: "לדגימת-מעבדה משוחררת נוצר מגרש Origin 15; המעבדה רושמת עליו Brix ו-pH, והתוצאה מתויקת לדגימה הספציפית.",
          cbcHe: "ב-CBC כל דגימת-משקה משוחררת מקבלת מגרש-בדיקה נפרד; בדיקות-המעבדה נרשמות עליו, ומחוברות חזרה לאצוות-המילוי דרך הדגימה.",
          navHe: ["Quality Management ► Quality Inspection ► Physical Samples ► Edit ► Inspection Lot for Sample (QPR4)"],
          tables: ["QALS", "QPRS", "QAMR"],
          tcodes: ["QPR4", "QA01", "QA03"],
          fiori: ["F2350"],
          configHe: [
            "Inspection Lot Origin ייעודי לדגימות פיזיות (למשל 15).",
            "קישור אוטומטי בין QPRS למגרש-הדגימה.",
            "שיוך תכנית-הבדיקה למגרש-הדגימה.",
          ],
          flow: [
            { he: "דגימה משוחררת", code: "QPR4" },
            { he: "יצירת מגרש-לדגימה", code: "QA01", note: "Origin 15" },
            { he: "שיוך תכנית-בדיקה" },
            { he: "מוכן לרישום-תוצאות", code: "QE51N" },
          ],
          masterDataHe: ["QALS = מגרש-דגימה · QPRS = הדגימה · QAMR = תוצאות-מאפיין."],
          mistakesHe: [
            "רישום-תוצאות על המגרש-הראשי במקום על מגרש-הדגימה.",
            "יצירת מגרש-דגימה לפני Release — נכשל.",
          ],
          troubleshootHe: [
            "אי-אפשר ליצור מגרש-דגימה ➔ הדגימה לא שוחררה.",
            "אין מאפיינים במגרש-הדגימה ➔ תכנית לא שויכה.",
          ],
          bestPracticeHe: [
            "צור מגרש-דגימה רק לאחר Release.",
            "שמור Origin עקבי לדגימות פיזיות לדיווח אחיד.",
          ],
          interviewHe: [
            { qHe: "מדוע ליצור מגרש נפרד לדגימה פיזית?", aHe: "כדי לבצע ולרשום בדיקות ברמת-הדגימה הבודדת בנפרד מהמגרש-הראשי, מה שמשפר עקיבות ושליטה ברמת-הדגימה." },
          ],
          takeawaysHe: [
            "מגרש-דגימה = תיק-בדיקה לדגימה בודדת.",
            "נוצר רק אחרי Release.",
            "מפריד בדיקה-פיזית מהמגרש-הראשי.",
          ],
        },
        {
          id: "10.3.6", titleHe: "רישום תוצאות לדגימה פיזית", titleEn: "Result Recording for Physical Sample",
          execHe: "רישום-התוצאות (Results Recording) הוא הזנת ערכי-המדידה שהמעבדה קיבלה עבור כל מאפיין-בדיקה על הדגימה. כאן הופכת הדגימה הפיזית לנתוני-איכות: ערכים, הערכת-תקינות (Accept/Reject), ובסיס להחלטת-שימוש.",
          beginnerHe: "המעבדה בדקה את הבקבוק וקיבלה מספרים — Brix 10.4, pH 3.2. רושמים אותם במערכת, וה-SAP אומר אם הם בתוך-הגבולות (תקין) או לא.",
          consultantHe: "ב-QE51N (Worklist) או QE01 רושמים לכל Inspection Characteristic את הערך/התוצאה; המערכת מעריכה מול הגבולות מתכנית-הבדיקה ומחשבת Accept/Reject. התוצאות נשמרות ב-QAMR/QASE. ניתן רישום-בודד או מרובה. סגירת-מאפיינים (Valuation) מאפשרת Usage Decision.",
          purposeHe: "להמיר מדידות-מעבדה לנתוני-איכות מובנים, להעריך תקינות מול ערכי-יעד, ולספק בסיס מתועד להחלטת-שימוש.",
          processExampleHe: "המעבדה מזינה ב-QE51N עבור דגימת-המשקה: Brix 10.4 (תקין), CO2 3.8 (תקין), pH 3.2 (תקין); המגרש מוכן ל-UD.",
          cbcHe: "ב-CBC טכנאי-המעבדה רושם ב-QE51N את תוצאות-המשקה (Brix, CO2, pH, מראה) לכל דגימה; חריגה ב-Brix מסמנת Reject ומפעילה הודעת-איכות (QM Notification).",
          navHe: ["Quality Management ► Quality Inspection ► Worklist ► Results Recording (QE51N)"],
          tables: ["QAMR", "QASE", "QASV", "QPRS"],
          tcodes: ["QE51N", "QE01", "QE02", "QE03"],
          fiori: ["F2352", "F2353"],
          configHe: [
            "מאפייני-בדיקה עם ערכי-יעד, גבולות והערכה (Valuation).",
            "Worklist (QE51N) לסינון לפי מגרש/דגימה/מאפיין.",
            "Valuation אוטומטית מול גבולות מתכנית-הבדיקה.",
          ],
          flow: [
            { he: "פתיחת Worklist", code: "QE51N" },
            { he: "הזנת ערכים למאפיינים" },
            { he: "Valuation (Accept/Reject)" },
            { he: "סגירת-מאפיינים", note: "מוכן ל-UD" },
          ],
          masterDataHe: ["QAMR = תוצאות-מאפיין · QASE/QASV = ערכי-מדגם · QPRS = הדגימה."],
          mistakesHe: [
            "סגירת-מאפיין בלי הזנת-ערך — UD חסום.",
            "רישום על מגרש שגוי — תוצאה מתויקת לדגימה הלא-נכונה.",
          ],
          troubleshootHe: [
            "אי-אפשר לסגור מגרש ל-UD ➔ מאפיינים לא הוערכו/לא נסגרו.",
            "Valuation שגויה ➔ גבולות בתכנית-הבדיקה שגויים.",
          ],
          bestPracticeHe: [
            "השתמש ב-QE51N לניהול עומס-מעבדה לפי Worklist.",
            "ודא Valuation לכל מאפיין לפני UD.",
          ],
          interviewHe: [
            { qHe: "מה קורה ברישום-תוצאות?", aHe: "מזינים ערך לכל Inspection Characteristic, המערכת מעריכה מול הגבולות (Accept/Reject) ושומרת ב-QAMR; לאחר סגירת-המאפיינים אפשר Usage Decision." },
            { qHe: "מהי Valuation?", aHe: "הערכת-התקינות של מאפיין מול ערכי-היעד והגבולות — Accept או Reject — שנעשית אוטומטית או ידנית בעת רישום-התוצאה." },
          ],
          takeawaysHe: [
            "רישום-תוצאות הופך מדידה לנתון-איכות מוערך.",
            "QE51N הוא ה-Worklist המרכזי.",
            "Valuation לכל מאפיין היא תנאי ל-UD.",
          ],
          relatedHe: [{ labelHe: "אובייקט · QAMR", href: "/library/qm/object/QAMR/" }],
        },
        {
          id: "10.3.7", titleHe: "רישום תוצאות לדגימות מאוגמות", titleEn: "Results Recording for Pooled Samples",
          execHe: "דגימה מאוגמת (Pooled Sample) מאחדת מספר דגימות-משנה (Primary) לאובייקט-בדיקה אחד. רישום-התוצאות עליה מבוצע פעם-אחת לכל המאפיינים, ומייצג את הממוצע/הייצוג של כלל המשיכות — חוסך בדיקות-כפל ומספק תמונה מייצגת.",
          beginnerHe: "במקום לבדוק 5 בקבוקים בנפרד, מערבבים אותם לדגימה אחת ובודקים פעם אחת. התוצאה מייצגת את כל החמישה. כך עובדים על 'דגימה מאוגמת'.",
          consultantHe: "ה-Pooled Sample מוגדר ב-Sample-Drawing Procedure (QPV2) כדגימה המאחדת Primary samples. רישום-התוצאות (QE51N) מתבצע על ה-QPRS המאוגם, לא על דגימות-המשנה. ההערכה והתוצאות מתויקות לדגימה-המאוגמת ומשפיעות על UD של המגרש. נפוץ לבדיקות הדורשות נפח גדול או ייצוג-ממוצע (מיקרוביולוגיה).",
          purposeHe: "לצמצם מספר-בדיקות ולספק תוצאה מייצגת לכלל-המשיכות, בעיקר כשהבדיקה דורשת נפח-מאוחד או ממוצע סטטיסטי.",
          processExampleHe: "5 משיכות לאורך אצוות-מילוי מאוחדות ל-Pooled Sample אחד; המעבדה רושמת עליו תוצאה מיקרוביולוגית אחת המייצגת את כל האצווה.",
          cbcHe: "ב-CBC בדיקת-מיקרוביולוגיה של משקה נעשית על Pooled Sample המורכב ממספר נקודות-מילוי לאורך האצווה; תוצאה אחת מייצגת את כל המנה ומשמשת לשחרור.",
          navHe: ["Quality Management ► Quality Inspection ► Worklist ► Results Recording for Pooled Sample (QE51N)"],
          tables: ["QPRS", "QAMR", "QPV2"],
          tcodes: ["QE51N", "QPR4", "QPV2"],
          fiori: ["F2352"],
          configHe: [
            "הגדרת Pooled Sample ב-Sample-Drawing Procedure (QPV2).",
            "קישור דגימות-Primary לדגימה-המאוגמת.",
            "רישום-תוצאות מתבצע על ה-QPRS המאוגם בלבד.",
          ],
          flow: [
            { he: "משיכת דגימות-Primary" },
            { he: "איחוד ל-Pooled", code: "QPV2", note: "לפי הנוהל" },
            { he: "רישום-תוצאה על המאוגם", code: "QE51N" },
            { he: "השפעה על UD" },
          ],
          masterDataHe: ["QPRS = דגימה (Primary/Pooled) · QAMR = תוצאות · QPV2 = הגדרת האיגום."],
          mistakesHe: [
            "רישום על דגימות-Primary במקום על המאוגם — כפל-עבודה ובלבול.",
            "אי-הגדרת האיגום בנוהל — אין דגימה מאוגמת ליצירה.",
          ],
          troubleshootHe: [
            "אין דגימה מאוגמת ➔ Pooled לא הוגדר ב-QPV2.",
            "תוצאות סותרות ➔ נרשמו גם על Primary וגם על Pooled.",
          ],
          bestPracticeHe: [
            "השתמש ב-Pooled לבדיקות הדורשות ייצוג-ממוצע/נפח.",
            "רשום תוצאות על המאוגם בלבד למניעת כפל.",
          ],
          interviewHe: [
            { qHe: "מהי דגימה מאוגמת ומתי משתמשים בה?", aHe: "Pooled Sample מאחד מספר דגימות-Primary לאובייקט-בדיקה אחד; משתמשים בה לבדיקות הדורשות נפח-מאוחד או תוצאה מייצגת-ממוצעת, כמו מיקרוביולוגיה." },
            { qHe: "על איזו דגימה רושמים תוצאות במקרה מאוגם?", aHe: "על ה-QPRS המאוגם בלבד, לא על דגימות-המשנה Primary." },
          ],
          takeawaysHe: [
            "Pooled מאחד Primary לאובייקט-בדיקה אחד.",
            "רישום-תוצאות על המאוגם בלבד.",
            "מתאים לבדיקות-ייצוג/נפח (מיקרוביולוגיה).",
          ],
        },
        {
          id: "10.3.8", titleHe: "יצירה ידנית של דגימה פיזית", titleEn: "Manually Creating a Physical Sample",
          execHe: "ניתן ליצור דגימה פיזית באופן ידני (QPR1) ללא מגרש-מקור — למקרים של דגימת-אד-הוק, דגימת-תלונה, או דגימה שנמשכה מחוץ לתהליך-הסטנדרטי. הדגימה הידנית מקבלת מספר, סוג ומיקום, וניתן בהמשך לקשרה למגרש.",
          beginnerHe: "לפעמים צריך 'לרשום בקבוק' שלא הגיע מהתהליך הרגיל — למשל דגימה שלקחנו בעקבות תלונת-לקוח. יוצרים אותה ידנית, נותנים מספר, ומטפלים בה כמו כל דגימה.",
          consultantHe: "ב-QPR1 יוצרים QPRS ידנית: בוחרים Physical-Sample Type, חומר, כמות, Container ו-Location. הדגימה אינה קשורה אוטומטית למגרש, אך ניתן ליצור עבורה מגרש-בדיקה (Origin 15) ולרשום תוצאות. שימושי ל-ad-hoc, complaints, ו-stability samples.",
          purposeHe: "לאפשר ניהול דגימות שאינן נובעות מתהליך-מלאי סטנדרטי — דגימות-אד-הוק, תלונות, יציבות — באותו מנגנון QPRS.",
          processExampleHe: "בעקבות תלונת-לקוח על משקה, QA יוצר ב-QPR1 דגימה ידנית מהאצווה החשודה, מאחסן אותה, ויוצר מגרש לבדיקה-חוזרת.",
          cbcHe: "ב-CBC דגימות-יציבות (Stability) ודגימות-תלונה נוצרות ידנית ב-QPR1, מתויגות ומאוחסנות, ונבדקות לאורך-זמן או בעקבות אירוע.",
          navHe: ["Quality Management ► Quality Inspection ► Physical Samples ► Create (QPR1)"],
          tables: ["QPRS", "QPRP"],
          tcodes: ["QPR1", "QPR2", "QPR3"],
          fiori: ["F2351"],
          configHe: [
            "בחירת Physical-Sample Type ידנית.",
            "הזנת חומר, כמות, Container, Location.",
            "אפשרות ליצור מגרש-בדיקה לדגימה הידנית (Origin 15).",
          ],
          flow: [
            { he: "יצירת דגימה ידנית", code: "QPR1" },
            { he: "הזנת סוג/חומר/מיקום" },
            { he: "תיוג והדפסה", code: "QPR5" },
            { he: "יצירת מגרש (אופציונלי)", code: "QA01" },
          ],
          masterDataHe: ["QPRS = הדגימה הידנית · QPRP = פרטיה."],
          mistakesHe: [
            "יצירה ידנית בלי Physical-Sample Type מתאים.",
            "אי-תיעוד מקור-הדגימה (תלונה/יציבות) — אובדן הקשר.",
          ],
          troubleshootHe: [
            "אי-אפשר לבדוק דגימה ידנית ➔ לא נוצר עבורה מגרש-בדיקה.",
            "סוג-דגימה לא-זמין ➔ Physical-Sample Type לא מוגדר ב-Customizing.",
          ],
          bestPracticeHe: [
            "תעד את מקור הדגימה הידנית בהערות.",
            "השתמש ביצירה-ידנית ל-ad-hoc/תלונות/יציבות בלבד.",
          ],
          interviewHe: [
            { qHe: "מתי יוצרים דגימה ידנית?", aHe: "כשאין מגרש-מקור — דגימות-אד-הוק, תלונות-לקוח, או דגימות-יציבות; יוצרים QPRS ב-QPR1 ואפשר לקשר לה מגרש-בדיקה בהמשך." },
          ],
          takeawaysHe: [
            "QPR1 יוצר דגימה ללא מגרש-מקור.",
            "מתאים ל-ad-hoc/תלונות/יציבות.",
            "ניתן לקשר מגרש-בדיקה בהמשך.",
          ],
        },
      ],
    },
    // ============================================================ 10.4
    {
      id: "10.4", titleHe: "משיכת דגימה פיזית בהתייחס לייצור", titleEn: "Physical Sample Drawing with Reference: Production",
      execHe:
        "בייצור, דגימות פיזיות נמשכות בהתייחס לפקודת-תהליך (Process Order) — לא בקבלת-סחורה. המנגנון קושר את הדגימה לאצוות-הייצור, מאפשר משיכה בנקודות מוגדרות לאורך הריצה, ומבטיח עקיבות בין הדגימה למנת-הייצור שממנה נלקחה.",
      beginnerHe:
        "בקבלה לוקחים דגימה מהמשלוח; בייצור לוקחים אותה מהקו תוך-כדי-ייצור. ה'התייחסות' היא לפקודת-הייצור — כך יודעים בדיוק מאיזו מנה הדגימה נלקחה.",
      consultantHe:
        "Physical Sample Drawing with Reference מקשר את משיכת-הדגימה ל-Process Order (COR1/COR2) ולמגרש שנוצר עבורה (Origin 04 — production). נוהל-המשיכה מקושר ל-Master Recipe/תכנית, והדגימות נמשכות בנקודות-בקרה (in-process). העקיבות נשמרת דרך מספר-אצווה וקישור QPRS↔QALS↔Order.",
      purposeHe:
        "להבטיח דגימה מבוקרת לאורך הייצור ועקיבות מלאה בין הדגימה, אצוות-הייצור והפקודה — בסיס לשחרור-מנה ולתחקור-איכות.",
      processExampleHe:
        "פקודת-תהליך לייצור 10,000 ליטר משקה; בנקודות-בקרה לאורך הריצה נמשכות דגימות הקשורות לפקודה, נבדקות, ומשמשות לשחרור האצווה.",
      cbcHe:
        "ב-CBC כל פקודת-מילוי מייצרת דגימות in-process בנקודות לאורך האצווה (התחלה/אמצע/סוף); כולן מקושרות לפקודה ולמספר-האצווה לעקיבות ולשחרור-המנה.",
      navHe: [
        "Logistics ► Production – Process ► Process Order ► Create (COR1)",
        "Quality Management ► Quality Inspection ► Physical Samples ► Drawing with Reference",
      ],
      tables: ["QALS", "QPRS", "AUFK", "AFKO"],
      tcodes: ["COR1", "COR2", "QPR4", "QA01"],
      fiori: ["F2354"],
      configHe: [
        "Inspection Type לייצור (Origin 03/04) עם דגימה.",
        "קישור נוהל-משיכה ל-Master Recipe/תכנית-בדיקה.",
        "נקודות-משיכה (in-process) לאורך הפקודה.",
      ],
      flow: [
        { he: "יצירת פקודת-תהליך", code: "COR1" },
        { he: "ייצור + נקודות-בקרה" },
        { he: "משיכת דגימה בהתייחס", code: "QPR4" },
        { he: "בדיקה ושחרור-מנה", code: "QE51N" },
      ],
      masterDataHe: ["AUFK/AFKO = פקודת-תהליך · QALS = מגרש-ייצור · QPRS = דגימה."],
      mistakesHe: [
        "משיכת דגימה ללא התייחסות לפקודה — אובדן-עקיבות.",
        "Inspection Type לייצור ללא דגימה — אין דגימות in-process.",
      ],
      troubleshootHe: [
        "אין דגימות בייצור ➔ Inspection Type (Origin 04) ללא דגימה או נוהל לא מקושר.",
        "אין עקיבות לאצווה ➔ הדגימה לא קושרה לפקודה/אצווה.",
      ],
      bestPracticeHe: [
        "קשר תמיד דגימת-ייצור לפקודה ולמספר-אצווה.",
        "הגדר נקודות-משיכה ברורות לאורך האצווה.",
      ],
      interviewHe: [
        { qHe: "במה שונה משיכת-דגימה בייצור ממשיכה בקבלה?", aHe: "בייצור הדגימה נמשכת בהתייחס לפקודת-תהליך (Origin 04) בנקודות לאורך הריצה, עם עקיבות לאצווה ולפקודה; בקבלה היא נמשכת כנגד GR (Origin 01)." },
      ],
      takeawaysHe: [
        "בייצור הדגימה מתייחסת לפקודת-תהליך (Origin 04).",
        "משיכה בנקודות-בקרה in-process.",
        "עקיבות מלאה דגימה↔אצווה↔פקודה.",
      ],
      relatedHe: [
        { labelHe: "QM · תהליכים עסקיים (10.3)", href: "/library/qm/chapter-10/#sub-10.3" },
      ],
      children: [
        {
          id: "10.4.1", titleHe: "פקודת תהליך", titleEn: "Process Order",
          execHe: "פקודת-התהליך (Process Order) היא אובייקט-הייצור שאליו מתייחסת משיכת-הדגימה. היא נושאת את החומר, הכמות, האצווה ו-Master Recipe; הקישור אליה הוא שמעניק לדגימה את העקיבות לאצוות-הייצור.",
          beginnerHe: "פקודת-תהליך היא 'הוראת-הייצור': מה לייצר, כמה, ובאיזו מנה. הדגימה שנמשכת בייצור 'מצביעה' על הפקודה הזו כדי לדעת מאיפה היא.",
          consultantHe: "ב-COR1 נוצרת הפקודה עם Master Recipe ו-BOM; היא מקבלת מספר-אצווה (Batch). אם החומר נושא Inspection Type לייצור עם דגימה, נוצר מגרש (Origin 03/04) ודגימות. הקישור QPRS↔Order↔Batch הוא ליבת-העקיבות. AFKO/AUFK שומרות את נתוני-הפקודה.",
          purposeHe: "לספק את ההקשר התעשייתי (חומר, כמות, אצווה, מתכון) שאליו נקשרת הדגימה, ולאפשר שחרור-מנה מבוסס-בדיקה.",
          processExampleHe: "פקודת-תהליך לייצור 10,000 ליטר משקה במנה B-2026-001; הפקודה מייצרת מגרש-בדיקה ודגימות הקשורות למנה.",
          cbcHe: "ב-CBC כל ריצת-מילוי = פקודת-תהליך עם מספר-אצווה ייחודי; הדגימות הנמשכות מקושרות לפקודה ולאצווה לצורך שחרור ושליחות.",
          navHe: ["Logistics ► Production – Process ► Process Order ► Create (COR1)"],
          tables: ["AUFK", "AFKO", "AFPO", "QALS"],
          tcodes: ["COR1", "COR2", "COR3"],
          fiori: ["F2354"],
          configHe: [
            "Master Recipe + BOM לפקודה.",
            "Batch (מספר-אצווה) לפקודה.",
            "Inspection Type לייצור (Origin 03/04) עם דגימה.",
          ],
          flow: [
            { he: "יצירת פקודה", code: "COR1" },
            { he: "הקצאת אצווה", note: "Batch" },
            { he: "שחרור-פקודה", code: "COR2" },
            { he: "יצירת מגרש + דגימות", code: "QALS/QPRS" },
          ],
          masterDataHe: ["AUFK = כותרת-פקודה · AFKO/AFPO = ראש/פריט-ייצור · QALS = מגרש."],
          mistakesHe: [
            "פקודה ללא אצווה — אובדן-עקיבות לדגימה.",
            "חומר ללא Inspection Type לייצור — אין דגימות.",
          ],
          troubleshootHe: [
            "אין מגרש לפקודה ➔ Inspection Type לייצור חסר/ללא דגימה.",
            "אין אצווה ➔ ניהול-אצווה לא מופעל לחומר.",
          ],
          bestPracticeHe: [
            "הפעל ניהול-אצווה לכל מוצר-ייצור הנדגם.",
            "ודא Inspection Type לייצור עם דגימה לפני שחרור-פקודה.",
          ],
          interviewHe: [
            { qHe: "מה תפקיד פקודת-התהליך בניהול-דגימות?", aHe: "היא ההקשר שאליו נקשרת הדגימה — חומר, כמות, אצווה ומתכון; הקישור QPRS↔Order↔Batch הוא בסיס-העקיבות ושחרור-המנה." },
          ],
          takeawaysHe: [
            "הפקודה (COR1) היא הקשר-הייצור של הדגימה.",
            "מספר-אצווה הוא ציר-העקיבות.",
            "Inspection Type לייצור עם דגימה = תנאי.",
          ],
        },
        {
          id: "10.4.2", titleHe: "משיכת דגימה פיזית בהתייחס", titleEn: "Physical Sample Drawing with Reference",
          execHe: "משיכת-הדגימה בהתייחס היא הפעולה שבה נמשכת דגימה פיזית הקשורה לפקודת-התהליך — בנקודות-בקרה לאורך הייצור. כל דגימה מקבלת מספר QPRS ומקושרת לפקודה ולאצווה, ובכך נשמרת עקיבות מלאה.",
          beginnerHe: "לוחצים 'משוך דגימה' תוך-כדי-ייצור, וה-SAP יודע אוטומטית לאיזו פקודה ומנה הדגימה שייכת. כך לא צריך לזכור ידנית מאיפה כל בקבוק.",
          consultantHe: "המשיכה (QPR4) מתבצעת בהתייחס למגרש-הייצור (Origin 03/04) שנוצר מהפקודה. נוהל-המשיכה קובע כמה דגימות ובאיזה סוג; כל QPRS נושאת קישור לפקודה, לאצווה ולנקודת-המשיכה. ניתן לשחרר, לתייג ולרשום-תוצאות כרגיל. ה-in-process inspection מאפשר משיכה בשלבים.",
          purposeHe: "לבצע משיכה מבוקרת ועקיבה לאורך הייצור — בקרת-תהליך בזמן-אמת ובסיס מתועד לשחרור-מנה.",
          processExampleHe: "במהלך ריצת-המילוי נמשכות 3 דגימות (התחלה/אמצע/סוף) בהתייחס לפקודה; כל אחת מתויגת, נבדקת, ומשמשת להחלטה על האצווה.",
          cbcHe: "ב-CBC טכנאי-הקו מושך דגימת-משקה בכל נקודת-בקרה דרך QPR4; הדגימות מקושרות לפקודת-המילוי ולאצווה, ובדיקת-Brix/CO2 קובעת המשך/עצירה של הריצה.",
          navHe: ["Quality Management ► Quality Inspection ► Physical Samples ► Drawing with Reference (QPR4)"],
          tables: ["QPRS", "QALS", "AFKO"],
          tcodes: ["QPR4", "QPR5", "QE51N"],
          fiori: ["F2354", "F2351"],
          configHe: [
            "מגרש-ייצור (Origin 03/04) כעוגן למשיכה.",
            "נוהל-משיכה הקובע כמות/סוג לכל נקודה.",
            "קישור QPRS לפקודה, אצווה ונקודת-משיכה.",
          ],
          flow: [
            { he: "מגרש-ייצור קיים", code: "QALS", note: "Origin 04" },
            { he: "משיכה בהתייחס", code: "QPR4" },
            { he: "שחרור + תיוג", code: "QPR5" },
            { he: "רישום-תוצאות", code: "QE51N" },
          ],
          masterDataHe: ["QPRS = דגימה · QALS = מגרש-ייצור · AFKO = פקודה."],
          mistakesHe: [
            "משיכה ללא בחירת מגרש-הייצור הנכון — קישור שגוי.",
            "אי-תיעוד נקודת-המשיכה (התחלה/אמצע/סוף).",
          ],
          troubleshootHe: [
            "דגימה לא מקושרת לפקודה ➔ נמשכה ללא התייחסות למגרש-הייצור.",
            "אין דגימות למשיכה ➔ נוהל לא מקושר לתכנית/מתכון.",
          ],
          bestPracticeHe: [
            "משוך תמיד בהתייחס למגרש-הייצור הנכון.",
            "תעד נקודת-משיכה לכל דגימה לבקרת-תהליך.",
          ],
          interviewHe: [
            { qHe: "מה מבטיחה משיכה 'בהתייחס'?", aHe: "שהדגימה תקושר אוטומטית לפקודת-התהליך, לאצווה ולנקודת-המשיכה — ובכך תישמר עקיבות מלאה לבקרת-תהליך ולשחרור-מנה." },
          ],
          takeawaysHe: [
            "QPR4 מושך דגימה בהתייחס למגרש-הייצור.",
            "כל דגימה נקשרת לפקודה, אצווה ונקודה.",
            "מאפשר in-process inspection.",
          ],
        },
      ],
    },
    // ============================================================ 10.5
    {
      id: "10.5", titleHe: "יסודות קונפיגורציה", titleEn: "Configuration Basics",
      execHe:
        "יסודות-הקונפיגורציה של ניהול-דגימות מוגדרים ב-Customizing (SPRO): שיוך Physical-Sample Type ל-Inspection Type, הגדרת סוגי-דגימה, מכלים (Containers) ומיקומי-אחסון (Locations). הגדרות אלה הן התשתית שעליה נשענים כל נתוני-האב והתהליכים.",
      beginnerHe:
        "לפני שמגדירים נהלים ותכניות, צריך להגדיר את 'אבני-הבניין' במערכת: אילו סוגי-דגימה קיימים, באילו מכלים שמים אותן, ואיפה מאחסנים. זה נעשה ב-Customizing פעם אחת.",
      consultantHe:
        "ב-SPRO תחת Quality Management ► Quality Inspection ► Sample Management מגדירים: שיוך Physical-Sample Type ל-Inspection Type (קובע אילו סוגי-דגימה נוצרים לכל מקור-מגרש), Physical Sample Types (Primary/Pooled/Reserve + מאפיינים), Containers (מכלים), ו-Locations (מיקומי-אחסון). הגדרות אלה נצרכות ב-QPV2 וב-QA01.",
      purposeHe:
        "לבסס תשתית-Customizing אחידה לכל ניהול-הדגימות — סוגים, מכלים ומיקומים מתוקננים — שעליה נבנים הנהלים, התכניות והתהליכים.",
      processExampleHe:
        "יועץ מגדיר ב-SPRO סוגי-דגימה (מעבדה/שימור/מאוגם), מכלים (בקבוק 250 מ\"ל), ומיקומים (מקרר-A, ארכיון), ואז משייך סוגי-דגימה ל-Inspection Types השונים.",
      cbcHe:
        "ב-CBC ה-Customizing כולל סוגי-דגימה למשקה ולתרכיז, מכלי-בקבוק-מעבדה סטנדרטיים, ומיקומי-אחסון (מקרר-מעבדה, ארכיון-שימור) — מתוקננים בין כל מפעלי-המילוי.",
      navHe: [
        "Quality Management ► Quality Inspection ► Sample Management ► Define Physical-Sample Type Assignment to Inspection Type",
        "Quality Management ► Quality Inspection ► Sample Management ► Define Physical-Sample Types",
        "Quality Management ► Quality Inspection ► Sample Management ► Define Physical-Sample Containers",
        "Quality Management ► Quality Inspection ► Sample Management ► Define Physical-Sample Locations",
      ],
      tables: ["TQ77", "TQ78", "TQ79", "QPRS"],
      tcodes: ["SPRO", "QPV2", "QA01"],
      fiori: ["F2347"],
      configHe: [
        "שיוך Physical-Sample Type ל-Inspection Type.",
        "הגדרת Physical-Sample Types (Primary/Pooled/Reserve).",
        "הגדרת Containers (מכלים).",
        "הגדרת Locations (מיקומי-אחסון).",
      ],
      flow: [
        { he: "הגדרת סוגי-דגימה", code: "SPRO" },
        { he: "הגדרת מכלים" },
        { he: "הגדרת מיקומים" },
        { he: "שיוך סוג ל-Inspection Type" },
      ],
      masterDataHe: ["TQ77/TQ78/TQ79 = טבלאות-Customizing לסוגי-דגימה/מכלים/מיקומים · QPRS = צורכת אותן."],
      mistakesHe: [
        "הגדרת נהלים לפני הגדרת סוגי-הדגימה — שגיאות-קישור.",
        "סוגי-דגימה/מכלים לא-מתוקננים בין מפעלים — אי-עקביות.",
      ],
      troubleshootHe: [
        "סוג-דגימה לא-זמין בנוהל ➔ לא הוגדר ב-Customizing או לא שויך ל-Inspection Type.",
        "אי-אפשר לבחור מכל/מיקום ➔ לא הוגדרו ב-SPRO.",
      ],
      bestPracticeHe: [
        "הגדר את ה-Customizing לפני נתוני-האב.",
        "תקנן סוגים, מכלים ומיקומים בין כל המפעלים.",
      ],
      interviewHe: [
        { qHe: "מה כוללים יסודות-הקונפיגורציה של ניהול-דגימות?", aHe: "שיוך Physical-Sample Type ל-Inspection Type, הגדרת סוגי-דגימה, מכלים ומיקומי-אחסון — כל אלה ב-SPRO, ומשמשים בסיס לנהלים ולתהליכים." },
      ],
      takeawaysHe: [
        "ה-Customizing הוא תשתית ניהול-הדגימות.",
        "סוגי-דגימה, מכלים, מיקומים ושיוך — ארבעת האבנים.",
        "מגדירים אותם לפני נתוני-האב.",
      ],
      relatedHe: [
        { labelHe: "QM · נתוני-אב (10.2)", href: "/library/qm/chapter-10/#sub-10.2" },
      ],
      children: [
        {
          id: "10.5.1", titleHe: "שיוך סוג דגימה פיזית ל-Inspection Type", titleEn: "Physical Sample Type Assignment to Inspection Type",
          execHe: "שיוך סוג-הדגימה ל-Inspection Type קובע אילו Physical-Sample Types ייווצרו לכל מקור-מגרש. כך, מגרש מקבלת-סחורה ומגרש מייצור יכולים לייצר סוגי-דגימה שונים, בהתאם לצורך.",
          beginnerHe: "כאן אומרים ל-SAP: 'במגרש מקבלה צור דגימת-מעבדה ושימור; במגרש מייצור צור דגימת in-process'. השיוך מחבר בין סוג-הבדיקה לסוגי-הדגימה.",
          consultantHe: "ב-Customizing משייכים Physical-Sample Type ל-Inspection Type. השיוך נצרך כברירת-מחדל ב-QPV2 וביצירת-המגרש: ה-Inspection Type של המגרש קובע אילו סוגי-דגימה זמינים/נוצרים. שיוך שגוי = סוגי-דגימה לא-נכונים או חסרים.",
          purposeHe: "להתאים את סוגי-הדגימה הנוצרים להקשר-המגרש (קבלה מול ייצור), ולמנוע יצירת סוגים לא-רלוונטיים.",
          processExampleHe: "ל-Inspection Type 01 (GR) משויכים סוגי 'מעבדה' ו'שימור'; ל-Inspection Type 04 (ייצור) משויך 'in-process'. כל מגרש מייצר את הסוגים הנכונים.",
          cbcHe: "ב-CBC ל-Inspection Type של קבלת-תרכיז משויכים מעבדה+שימור; ל-Inspection Type של מילוי-משקה משויכים in-process+מאוגם — כך כל הקשר מקבל את הדגימות הנכונות.",
          navHe: ["Quality Management ► Quality Inspection ► Sample Management ► Define Physical-Sample Type Assignment to Inspection Type"],
          tables: ["TQ77", "TQ07"],
          tcodes: ["SPRO", "QCC0"],
          fiori: ["F2347"],
          configHe: [
            "שיוך כל Physical-Sample Type ל-Inspection Type הרלוונטי.",
            "קביעת ברירת-מחדל לסוגי-הדגימה לכל מקור-מגרש.",
          ],
          flow: [
            { he: "בחירת Inspection Type", code: "QCC0" },
            { he: "שיוך סוגי-דגימה", code: "SPRO" },
            { he: "אימות ב-QPV2/QA01" },
          ],
          masterDataHe: ["TQ77 = שיוך סוג-דגימה↔Inspection Type · TQ07 = הגדרות-QM."],
          mistakesHe: [
            "אי-שיוך סוג ל-Inspection Type — הסוג לא זמין בנוהל.",
            "שיוך סוגי-ייצור ל-Inspection Type של קבלה — דגימות לא-רלוונטיות.",
          ],
          troubleshootHe: [
            "סוג-דגימה חסר במגרש ➔ לא שויך ל-Inspection Type של אותו מקור.",
          ],
          bestPracticeHe: [
            "שייך סוגי-דגימה לפי הקשר-מגרש (קבלה/ייצור).",
            "אמת את השיוך ב-QPV2 לפני העלייה-לאוויר.",
          ],
          interviewHe: [
            { qHe: "מה קובע שיוך סוג-דגימה ל-Inspection Type?", aHe: "אילו Physical-Sample Types זמינים ונוצרים לכל מקור-מגרש; כך מגרש-קבלה ומגרש-ייצור מקבלים סוגי-דגימה שונים בהתאם." },
          ],
          takeawaysHe: [
            "השיוך קובע אילו סוגי-דגימה לכל מקור-מגרש.",
            "מאפשר הבחנה בין קבלה לייצור.",
            "שגיאת-שיוך = דגימות חסרות/לא-נכונות.",
          ],
        },
        {
          id: "10.5.2", titleHe: "הגדרת סוגי דגימה פיזית", titleEn: "Define Physical Sample Types",
          execHe: "סוגי-הדגימה הפיזית (Physical-Sample Types) מסווגים כל דגימה לפי תפקידה: Primary (ראשית), Pooled (מאוגמת), Reserve (שימור). הסוג קובע התנהגות — האם הדגימה נבדקת ישירות, מאחדת אחרות, או נשמרת ללא בדיקה.",
          beginnerHe: "כל דגימה היא 'מסוג' מסוים: ראשית (נבדקת), מאוגמת (מאחדת כמה), או שימור (נשמרת לכל-מקרה). מגדירים את הסוגים פעם אחת ומשתמשים בהם בנהלים.",
          consultantHe: "ב-Customizing מגדירים כל Physical-Sample Type עם הקטגוריה (Primary/Pooled/Reserve) ומאפייניו. הקטגוריה משפיעה על אופן רישום-התוצאות (Pooled נבדק כיחידה) ועל ניהול-המלאי של הדגימה. הסוגים נצרכים ב-QPV2 וב-Inspection Type assignment.",
          purposeHe: "לתת מבנה ומשמעות לכל דגימה — ראשית/מאוגמת/שימור — ולשלוט באופן הבדיקה והשמירה שלה.",
          processExampleHe: "מוגדרים 3 סוגים: 'LAB' (Primary), 'POOL' (Pooled), 'RES' (Reserve); הנוהל בוחר מהם לפי הצורך.",
          cbcHe: "ב-CBC מוגדרים סוגי-דגימה: דגימת-משקה ראשית (LAB), דגימה מאוגמת למיקרוביולוגיה (POOL), ודגימת-שימור לארכיון (RES) לתחקור עתידי.",
          navHe: ["Quality Management ► Quality Inspection ► Sample Management ► Define Physical-Sample Types"],
          tables: ["TQ78", "QPRS"],
          tcodes: ["SPRO", "QPV2"],
          fiori: ["F2347"],
          configHe: [
            "הגדרת קוד-סוג וקטגוריה (Primary/Pooled/Reserve).",
            "מאפיינים: ניהול-מלאי, אופן-בדיקה, ברירות-מחדל.",
          ],
          flow: [
            { he: "הגדרת סוג", code: "SPRO" },
            { he: "קביעת קטגוריה", note: "Primary/Pooled/Reserve" },
            { he: "שימוש בנוהל", code: "QPV2" },
          ],
          masterDataHe: ["TQ78 = הגדרת סוגי-דגימה · QPRS = נושאת את הסוג."],
          mistakesHe: [
            "הגדרת סוג ללא קטגוריה נכונה — התנהגות-בדיקה שגויה.",
            "ריבוי סוגים כמעט-זהים — בלבול בנהלים.",
          ],
          troubleshootHe: [
            "Pooled לא מאחד ➔ קטגוריה לא הוגדרה כ-Pooled.",
            "Reserve נדרש לבדיקה בטעות ➔ קטגוריה שגויה.",
          ],
          bestPracticeHe: [
            "הגדר מעט סוגים ברורים עם קטגוריה נכונה.",
            "תאם שמות-סוגים עם מינוח-המעבדה.",
          ],
          interviewHe: [
            { qHe: "מהם שלושת סוגי-הדגימה העיקריים?", aHe: "Primary (ראשית — נבדקת ישירות), Pooled (מאוגמת — מאחדת כמה ונבדקת כיחידה), ו-Reserve (שימור — נשמרת ללא בדיקה לתחקור עתידי)." },
          ],
          takeawaysHe: [
            "הסוג קובע תפקיד והתנהגות-דגימה.",
            "שלוש קטגוריות: Primary/Pooled/Reserve.",
            "נצרך בנהלים ובשיוך ל-Inspection Type.",
          ],
        },
        {
          id: "10.5.3", titleHe: "הגדרת מכל דגימה פיזית", titleEn: "Define Physical Sample Container",
          execHe: "המכל (Container) מגדיר את הכלי הפיזי שבו מאוחסנת הדגימה — בקבוק, מבחנה, מכל. ההגדרה מאפשרת לתעד ולתקנן את אופן-האחסון, ולקשר מכל לכל דגימה ברשומת ה-QPRS.",
          beginnerHe: "כל דגימה צריכה כלי — בקבוק 250 מ\"ל, מבחנה וכו'. מגדירים את סוגי-הכלים פעם אחת, ואז בוחרים לכל דגימה את הכלי שלה.",
          consultantHe: "ב-Customizing מגדירים Containers עם תיאור וקיבולת. ה-Container נבחר ב-QPV2/QPR4 ונשמר ב-QPRS. תקנון מכלים תומך באחסון ובאיתור עקביים. מכל מתאים נדרש כדי שכמות-הדגימה תהיה הגיונית.",
          purposeHe: "לתקנן ולתעד את כלי-האחסון של הדגימה, ולתמוך באחסון ובאיתור עקביים במעבדה.",
          processExampleHe: "מוגדר Container 'BOT-250' (בקבוק 250 מ\"ל); דגימות-המשקה מאוחסנות בו, וכך הכמות והאחסון אחידים.",
          cbcHe: "ב-CBC מוגדרים מכלי-מעבדה סטנדרטיים: בקבוק-זכוכית 250 מ\"ל למשקה, מכל-תרכיז קטן לדגימת-תרכיז — מתוקננים בין כל המפעלים.",
          navHe: ["Quality Management ► Quality Inspection ► Sample Management ► Define Physical-Sample Containers"],
          tables: ["TQ79", "QPRS"],
          tcodes: ["SPRO", "QPV2"],
          fiori: ["F2347"],
          configHe: [
            "הגדרת קוד-מכל, תיאור וקיבולת.",
            "שיוך מכל לדגימה ב-QPV2/QPR4.",
          ],
          flow: [
            { he: "הגדרת מכל", code: "SPRO" },
            { he: "שיוך לדגימה/נוהל", code: "QPV2" },
            { he: "תיעוד ב-QPRS" },
          ],
          masterDataHe: ["TQ79 = הגדרת מכלים · QPRS = נושאת את המכל."],
          mistakesHe: [
            "אי-הגדרת מכל — אי-אפשר לבחור בנוהל.",
            "מכל לא-תואם לכמות-הדגימה.",
          ],
          troubleshootHe: [
            "אי-אפשר לבחור מכל ➔ לא הוגדר ב-Customizing.",
          ],
          bestPracticeHe: [
            "תקנן מעט מכלים תואמי-כמות.",
            "תעד מכל בכל דגימה לאחסון עקבי.",
          ],
          interviewHe: [
            { qHe: "מה מגדיר Physical-Sample Container?", aHe: "את הכלי הפיזי שבו מאוחסנת הדגימה (בקבוק/מבחנה/מכל) עם קיבולת ותיאור; נבחר בנוהל ונשמר ב-QPRS לאחסון עקבי." },
          ],
          takeawaysHe: [
            "המכל = כלי-האחסון של הדגימה.",
            "מתוקנן ב-Customizing ונשמר ב-QPRS.",
            "תומך באחסון ואיתור עקביים.",
          ],
        },
        {
          id: "10.5.4", titleHe: "הגדרת מיקומי דגימה פיזית", titleEn: "Define Physical Sample Locations",
          execHe: "מיקומי-הדגימה (Locations) מגדירים היכן מאוחסנת כל דגימה פיזית — מקרר, ארכיון, מדף. ההגדרה מאפשרת לתעד מיקום-אחסון לכל QPRS, ובכך לאתר במהירות כל בקבוק-דגימה במעבדה.",
          beginnerHe: "כל דגימה צריכה 'כתובת' — איפה היא שמורה. מגדירים מיקומים (מקרר-A, ארכיון), ואז לכל דגימה רושמים את המיקום כדי למצוא אותה.",
          consultantHe: "ב-Customizing מגדירים Locations עם תיאור. ה-Location נבחר ב-QPV2/QPR4 ונשמר ב-QPRS. תיעוד-מיקום עקבי הוא קריטי לאיתור-מעבדה, במיוחד לדגימות-שימור הנשמרות לאורך-זמן. מיקום שגוי/חסר = דגימה 'אבודה'.",
          purposeHe: "לתעד ולתקנן את מיקום-האחסון של כל דגימה, ולאפשר איתור מהיר ואמין במעבדה ובארכיון.",
          processExampleHe: "מוגדרים מיקומים 'FRIDGE-A' (מקרר) ו'ARCHIVE-1' (ארכיון-שימור); כל דגימה מתויקת למיקומה ונמצאת מיד בעת-צורך.",
          cbcHe: "ב-CBC מוגדרים מיקומי-מעבדה: מקרר לדגימות-בדיקה, ארכיון-שימור לדגימות-Reserve הנשמרות עד תום-חיי-המדף לתחקור.",
          navHe: ["Quality Management ► Quality Inspection ► Sample Management ► Define Physical-Sample Locations"],
          tables: ["TQ79", "QPRS"],
          tcodes: ["SPRO", "QPV2"],
          fiori: ["F2347"],
          configHe: [
            "הגדרת קוד-מיקום ותיאור.",
            "שיוך מיקום לדגימה ב-QPV2/QPR4.",
          ],
          flow: [
            { he: "הגדרת מיקום", code: "SPRO" },
            { he: "שיוך לדגימה", code: "QPR4" },
            { he: "תיעוד ב-QPRS" },
          ],
          masterDataHe: ["TQ79 = הגדרת מיקומים · QPRS = נושאת את המיקום."],
          mistakesHe: [
            "אי-תיעוד מיקום — דגימה 'אבודה' במעבדה.",
            "מיקומים כלליים-מדי — איתור איטי.",
          ],
          troubleshootHe: [
            "דגימה לא נמצאת פיזית ➔ מיקום לא עודכן ב-QPRS.",
            "אי-אפשר לבחור מיקום ➔ לא הוגדר ב-Customizing.",
          ],
          bestPracticeHe: [
            "הגדר מיקומים ספציפיים (מקרר/מדף) לאיתור מהיר.",
            "אכוף תיעוד-מיקום בכל משיכת-דגימה.",
          ],
          interviewHe: [
            { qHe: "מדוע חשוב להגדיר מיקומי-דגימה?", aHe: "כדי לתעד היכן מאוחסנת כל דגימה ולאפשר איתור מהיר — קריטי במיוחד לדגימות-שימור הנשמרות לאורך-זמן; מיקום חסר הופך דגימה ל'אבודה'." },
          ],
          takeawaysHe: [
            "המיקום = 'כתובת' האחסון של הדגימה.",
            "מתוקנן ב-Customizing ונשמר ב-QPRS.",
            "קריטי לאיתור, בעיקר לדגימות-שימור.",
          ],
        },
      ],
    },
    // ============================================================ 10.6
    {
      id: "10.6", titleHe: "סיכום", titleEn: "Summary",
      execHe:
        "ניהול-דגימות מחבר את העולם הפיזי של בקבוקי-הדגימה לעולם הדיגיטלי של בדיקות-איכות. הוא נשען על הגדרות-מפעל, שני נתוני-אב מרכזיים (נוהל-משיכה QPV2 ותכנית-בדיקה), זרימת-תהליך מקצה-לקצה (קבלה/ייצור → משיכה → שחרור+תיוג → מגרש-דגימה → תוצאות → UD), ותשתית-Customizing (סוגים/מכלים/מיקומים). שליטה בשרשרת זו = איכות עקבית ועקיבה מלאה.",
      beginnerHe:
        "סיכמנו את כל מסע-הדגימה: הדלקנו את המנגנון במפעל, הגדרנו כמה דגימות לקחת ומה לבדוק, ראינו איך הדגימה נמשכת בקבלה ובייצור, משוחררת, מתויגת, נבדקת ונרשמת — ולבסוף איך מגדירים את אבני-הבניין ב-Customizing. עכשיו יש תמונה שלמה.",
      consultantHe:
        "המפתח להטמעה מוצלחת: לוודא ששרשרת-התלות סגורה (Inspection Type עם דגימה → QPV2 מקושר לתכנית → Physical-Sample Types/Containers/Locations ב-Customizing → טווחי-מספרים). העקיבות מתבססת על קישור QPRS↔QALS, ובייצור גם ↔Order↔Batch. הבחנה קריטית: QPV2 (משיכה פיזית) מול QDV1 (מדגם סטטיסטי), ו-Pooled מול Primary ברישום-תוצאות.",
      purposeHe:
        "לעגן את התמונה השלמה — מ-Customizing דרך נתוני-אב ועד תהליך-חי — כדי שהלומד יוכל לתכנן, להטמיע ולתחזק ניהול-דגימות ללא הסתמכות על המקור.",
      processExampleHe:
        "מקצה-לקצה: GR/פקודה → מגרש+דגימות → Release+תיוג → מגרש-דגימה → QE51N → UD. כל שלב נשען על הגדרה שנלמדה בפרק, וכולם מתחברים לזרימה אחת.",
      cbcHe:
        "ב-CBC: כל קבלת-תרכיז וכל אצוות-מילוי-משקה עוברת את המסלול המלא — דגימות נמשכות, מתויגות בברקוד, נבדקות במעבדה (Brix/CO2/מיקרוביולוגיה), ומשמשות לשחרור-מנה לפני שילוח, עם עקיבות מלאה לאצווה.",
      navHe: [
        "Quality Management ► Quality Inspection ► Sample Management ► (כל ענפי-ה-Customizing שנסקרו)",
      ],
      tables: ["QPRS", "QALS", "QPV2", "PLKO"],
      tcodes: ["QPV2", "QA01", "QPR4", "QE51N"],
      fiori: ["F2347", "F2350", "F2351", "F2352"],
      configHe: [
        "תשתית: סוגי-דגימה, מכלים, מיקומים, שיוך ל-Inspection Type.",
        "נתוני-אב: נוהל-משיכה (QPV2) + תכנית-בדיקה מקושרת.",
        "תהליך: GR/פקודה → דגימות → שחרור → מגרש-דגימה → תוצאות → UD.",
      ],
      flow: [
        { he: "Customizing", code: "SPRO" },
        { he: "נתוני-אב", code: "QPV2" },
        { he: "תהליך-דגימה", code: "QA01/QPR4" },
        { he: "תוצאות + UD", code: "QE51N" },
      ],
      masterDataHe: ["QPRS, QALS, QPV2, PLKO — ארבעת עמודי-התווך של ניהול-הדגימות."],
      mistakesHe: [
        "אי-סגירת שרשרת-התלות לפני העלייה-לאוויר.",
        "בלבול QPV2/QDV1 ו-Primary/Pooled.",
        "אי-תיעוד מכל/מיקום — דגימות אבודות.",
      ],
      troubleshootHe: [
        "כשל כללי בניהול-דגימות ➔ עבור על רשימת-התיוג (10.2.3) מהקצה.",
        "אובדן-עקיבות ➔ ודא קישור QPRS↔QALS↔Order↔Batch.",
      ],
      bestPracticeHe: [
        "הטמע Customizing → נתוני-אב → תהליך בסדר הזה.",
        "אכוף Release+תיוג ותיעוד-מיקום כשלבי-חובה.",
        "אמת מקצה-לקצה ב-QA01 לפני cutover.",
      ],
      interviewHe: [
        { qHe: "מהי שרשרת ניהול-הדגימות מקצה-לקצה?", aHe: "הגדרות-מפעל → Customizing (סוגים/מכלים/מיקומים/שיוך) → נתוני-אב (QPV2 + תכנית-בדיקה) → תהליך (GR/פקודה → דגימות → שחרור+תיוג → מגרש-דגימה → תוצאות QE51N → UD), עם עקיבות QPRS↔QALS↔Order↔Batch." },
        { qHe: "מהן ההבחנות הקריטיות שלמדנו?", aHe: "QPV2 (משיכה פיזית) מול QDV1 (מדגם סטטיסטי); Primary מול Pooled ברישום-תוצאות; ומקור-מגרש (GR Origin 01 מול Production Origin 04)." },
      ],
      takeawaysHe: [
        "ניהול-דגימות מחבר פיזי↔דיגיטלי לאיכות עקבית.",
        "שרשרת: Customizing → נתוני-אב → תהליך → תוצאות.",
        "עקיבות: QPRS↔QALS↔Order↔Batch.",
        "הבחן QPV2/QDV1 ו-Primary/Pooled.",
      ],
      relatedHe: [
        { labelHe: "QM · הגדרות-מפעל (10.1)", href: "/library/qm/chapter-10/#sub-10.1" },
        { labelHe: "QM · יסודות-קונפיגורציה (10.5)", href: "/library/qm/chapter-10/#sub-10.5" },
      ],
    },
  ],
};
