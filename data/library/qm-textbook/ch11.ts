// ===== QM Digital Textbook — Chapter 11 (Quality Certificates) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew —
// beginner + consultant friendly, enough to study the topic without the book.
// CBC = Coca-Cola bottling certificates to retailers / from suppliers.
// SAP identifiers verbatim EN (QC01/QC02/QC51, QC20 profile, VL01N; QALS/QCVK).
import type { TextbookChapter } from "./types";

export const CH11: TextbookChapter = {
  n: 11,
  titleHe: "תעודות איכות",
  titleEn: "Quality Certificates",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לתעודות-איכות (Quality Certificates) ב-SAP QM, על שני צדדיו: תעודות נכנסות מספקים (Incoming) ותעודות יוצאות ללקוחות (Outgoing). כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. ב-CBC: תעודות-איכות שנשלחות לקמעונאים על משלוחי משקאות, ותעודות שמתקבלות מספקי תרכיז/סוכר/CO2. המטרה: ללמוד את הנושא ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 11.1
    {
      id: "11.1",
      titleHe: "תעודות איכות נכנסות (Incoming Quality Certificates)",
      titleEn: "Incoming Quality Certificates",
      execHe:
        "תעודות-איכות נכנסות הן מסמכי-איכות שספק שולח יחד עם משלוח חומר, ומאשרים שהחומר עומד במפרט מוסכם. ב-QM המערכת עוקבת אחר קבלת התעודות, חוסמת קבלת-טובין או שחרור-תשלום כאשר תעודה חסרה, ומנהלת רשימת-מעקב (Worklist) של תעודות חסרות. כך הארגון מבטיח שלא ייכנס חומר קריטי ללא הוכחת-איכות מהספק.",
      beginnerHe:
        "דמיין שאתה קונה תרכיז למשקה. הספק שולח יחד עם המשלוח \"תעודת-לידה\" של החומר — מסמך שמפרט תוצאות-בדיקה (סוכר, חומציות, מיקרוביולוגיה) ומאשר שהכל תקין. SAP יודע לדרוש את התעודה הזו, לסמן אם היא הגיעה, ולחסום את התהליך אם היא חסרה. זהו \"מנגנון-הדרישה\" של תעודות מספקים.",
      consultantHe:
        "הליבה היא Certificate Receipt Control הנשלטת דרך Control Key (QM-Control Key, שדה QSSYS באב-החומר תצוגת QM) ופונקציות עיבוד-תעודות. רמת-המעקב (Certificate type) מקושרת ל-Info Record / רמת-מפעל. הסטטוס נשמר במסמכי-רכש ונבדק ב-GR; דרישת-תעודה לא-מסופקת יוצרת רשומה לרשימת-המעקב QC51. הקפד על תיאום בין QM in Procurement (QM-Control Key) לבין Certificate processing — שני מנגנונים נפרדים שצריך להפעיל יחד.",
      purposeHe:
        "המטרה: למנוע כניסת חומר-גלם קריטי ללא אישור-איכות מהספק, להעביר חלק מאחריות-הבדיקה לשרשרת-האספקה, ולספק תיעוד-ביקורת (Audit trail) לרגולציה. בכך מצמצמים בדיקות-קבלה כפולות ומקצרים זמני-שחרור.",
      processExampleHe:
        "ספק שולח תרכיז; הזמנת-הרכש דורשת תעודת-איכות מסוג \"תוצאות-בדיקה\". בקבלת-הטובין המערכת בודקת אם התעודה הגיעה: אם כן — קבלה ושחרור; אם לא — הרשומה נכנסת ל-Worklist (QC51) והתשלום/השימוש עשוי להיחסם עד הגעת התעודה.",
      cbcHe:
        "ב-CBC: ספקי תרכיז, סוכר ו-CO2 מחויבים לצרף תעודת-איכות לכל אצווה. ללא תעודה, האצווה ננעלת ב-Worklist ואינה משוחררת לקווי-המילוי. זה קריטי לרגולציית-מזון — כל רכיב שנכנס למשקה חייב הוכחת-איכות מתועדת.",
      navHe: [
        "Quality Management ► QM in Logistics ► QM in Procurement ► Define Control Keys (QM-Control Keys)",
        "Quality Management ► Quality Certificates ► Certificate Receipt for Goods Receipt and Stock Transfer ► Define Control Functions for Certificate Processing",
      ],
      tables: ["QALS", "QMAT", "QINF", "EKPO"],
      tcodes: ["QC51", "QC55", "ME21N", "MIGO"],
      fiori: ["F2225"],
      configHe: [
        "QM-Control Key (QSSYS): מפעיל QM ברכש וקובע אם נדרשת תעודת-איכות, חסימת-תשלום (Blocked stock) ובקרת-קבלה.",
        "Certificate Receipt Control: רמת-המעקב — לפי חומר, ספק, או Info Record.",
        "Certificate Type: סוג התעודה הנדרשת (תוצאות-בדיקה / התאמה / ניתוח).",
      ],
      flow: [
        { he: "הזמנת-רכש דורשת תעודה", code: "ME21N", note: "QM-Control Key פעיל" },
        { he: "ספק שולח חומר + תעודה", note: "Certificate of Analysis" },
        { he: "קבלת-טובין בודקת תעודה", code: "MIGO", note: "Certificate Receipt" },
        { he: "תעודה חסרה ➔ Worklist", code: "QC51" },
        { he: "תעודה הגיעה ➔ שחרור", note: "Confirm receipt" },
      ],
      masterDataHe: [
        "QSSYS (תצוגת QM באב-החומר) = QM-Control Key המפעיל בקרת-רכש ותעודות.",
        "QINF = Info Record לאיכות (חומר↔ספק) הנושא הגדרות תעודה ובקרה.",
      ],
      mistakesHe: [
        "הפעלת QM ברכש בלי להגדיר Certificate processing — אין דרישה בפועל לתעודה.",
        "אי-קישור Certificate type לחומר/ספק הנכון — תעודות חסרות לא נתפסות.",
        "התעלמות מ-Worklist (QC51) — חומר נחסם נשכח ומעכב ייצור.",
      ],
      troubleshootHe: [
        "תעודה לא נדרשת בקבלה ➔ QM-Control Key לא פעיל או Certificate processing כבוי.",
        "חומר נחסם ללא סיבה ברורה ➔ בדוק QC51 לתעודה חסרה.",
        "תעודה הגיעה אך הסטטוס לא התעדכן ➔ אישור-קבלה (Confirm) לא בוצע.",
      ],
      bestPracticeHe: [
        "הפעל QM-Control Key ו-Certificate processing יחד — שניהם נדרשים.",
        "סקור את QC51 באופן יומיומי כחלק משגרת-הרכש.",
        "תעד לכל חומר קריטי איזה Certificate type נדרש מהספק.",
      ],
      interviewHe: [
        { qHe: "מהי תעודת-איכות נכנסת?", aHe: "מסמך-איכות שהספק שולח עם החומר ומאשר עמידה במפרט; SAP עוקב אחר קבלתה ויכול לחסום קבלה/תשלום בהיעדרה." },
        { qHe: "כיצד מפעילים דרישת-תעודה ברכש?", aHe: "דרך QM-Control Key (QSSYS) בתצוגת QM של אב-החומר, יחד עם הגדרות Certificate processing." },
        { qHe: "מה תפקיד ה-Worklist QC51?", aHe: "מרכזת את התעודות החסרות/הצפויות לקבלה — נקודת-המעקב היומיומית של הרכש." },
      ],
      takeawaysHe: [
        "תעודה נכנסת = הוכחת-איכות מהספק לכל אצווה.",
        "QM-Control Key + Certificate processing מפעילים את הדרישה.",
        "תעודה חסרה ➔ חסימה + רשומה ב-QC51.",
      ],
      relatedHe: [
        { labelHe: "QM · תעודות יוצאות (11.2)", href: "/library/qm/chapter-11/#sub-11.2" },
        { labelHe: "אובייקט · QALS", href: "/library/qm/object/QALS/" },
      ],
      children: [
        {
          id: "11.1.1",
          titleHe: "הגדרת מפתח-הבקרה (Control Key)",
          titleEn: "Configuring the Control Key",
          execHe:
            "ה-QM-Control Key הוא המתג המרכזי שקובע אם וכיצד QM פועל ברכש לחומר נתון: האם נדרשת תעודת-איכות, האם המלאי נכנס לסטטוס חסום, והאם נדרש שחרור-איכות לפני תשלום. בלעדיו, אין דרישת-תעודה אוטומטית.",
          beginnerHe:
            "ה-Control Key הוא \"מתג-ההפעלה\" של בקרת-האיכות ברכש. הוא אומר ל-SAP: \"לחומר הזה — דרוש תעודה מהספק, ואל תשחרר עד שהיא מגיעה\". כל חומר מקבל Control Key בתצוגת ה-QM שלו.",
          consultantHe:
            "ה-Control Key (QSSYS) הוא סדרת-תיבות-סימון: QM in Procurement active, Certificate required, Block invoice, Tech. delivery terms ועוד. הוא מאוחסן באב-החומר (תצוגת QM) או ב-QINF. בקבלת-טובין המערכת קוראת אותו וקובעת התנהגות. הקפד להבחין בין הפעלת-QM-ברכש לבין דרישת-תעודה — שתי תיבות נפרדות באותו מפתח.",
          purposeHe:
            "לתת שליטה ברמת-החומר על מידת-הבקרה: חומר קריטי מקבל מפתח מחמיר (תעודה + חסימה), חומר זניח מקבל מפתח מקל או ללא QM כלל.",
          processExampleHe:
            "חומר \"תרכיז\" מקבל Control Key הדורש תעודה וחוסם חשבונית עד שחרור. בקבלת-טובין המערכת חוסמת את התשלום ומסמנת דרישת-תעודה; השחרור ניתן רק לאחר אישור-קבלת-התעודה.",
          cbcHe:
            "ב-CBC לתרכיז ולסוכר מוקצה Control Key מחמיר (תעודה + Block invoice); לחומרי-אריזה משניים מוקצה מפתח מקל. כך הבקרה מתמקדת ברכיבים שנכנסים פיזית למשקה.",
          navHe: [
            "Quality Management ► QM in Logistics ► QM in Procurement ► Define Control Keys",
          ],
          tables: ["TQ07", "QMAT", "QINF"],
          tcodes: ["OQB7", "MM02"],
          fiori: ["F2225"],
          configHe: [
            "הגדר Control Key וסמן: QM in Procurement, Certificate required, Block invoice, Tech. delivery terms.",
            "הקצה את ה-Control Key בתצוגת ה-QM של אב-החומר (QSSYS) או ב-QINF.",
          ],
          mistakesHe: [
            "סימון \"Certificate required\" בלי \"QM in Procurement\" — הדרישה לא מופעלת.",
            "הקצאת מפתח מחמיר לכל חומר — חוסם תהליכים מיותר.",
          ],
          troubleshootHe: [
            "תעודה לא נדרשת ➔ Control Key ללא \"Certificate required\" או לא מוקצה לחומר.",
            "תשלום לא נחסם ➔ תיבת \"Block invoice\" לא מסומנת במפתח.",
          ],
          bestPracticeHe: [
            "הגדר מעט Control Keys סטנדרטיים (מחמיר/מקל) — פחות שונות, פחות שגיאות.",
            "תעד לכל מפתח את כוונת-הבקרה שלו.",
          ],
          interviewHe: [
            { qHe: "מה קובע ה-QM-Control Key?", aHe: "אם QM פעיל ברכש לחומר, אם נדרשת תעודה, ואם נחסמים מלאי/חשבונית עד שחרור-איכות." },
            { qHe: "היכן מאוחסן ה-Control Key?", aHe: "בתצוגת ה-QM של אב-החומר (QSSYS) ו/או ב-Quality Info Record (QINF)." },
          ],
          takeawaysHe: [
            "Control Key = מתג-ההפעלה של QM ברכש.",
            "סדרת תיבות: QM פעיל, תעודה נדרשת, חסימת-חשבונית.",
            "מוקצה ברמת-חומר/ספק.",
          ],
          relatedHe: [{ labelHe: "אובייקט · QINF", href: "/library/qm/object/QINF/" }],
        },
        {
          id: "11.1.2",
          titleHe: "הגדרת פונקציות-בקרה לעיבוד תעודות",
          titleEn: "Define Control Functions for Certificate Processing",
          execHe:
            "פונקציות-הבקרה לעיבוד-תעודות קובעות מתי המערכת בודקת קבלת-תעודה, כיצד היא מגיבה לתעודה חסרה (אזהרה / חסימה), ואיך נשמר סטטוס-התעודה במסמכי-הרכש והקבלה. זהו \"מנוע-הכללים\" של תהליך התעודות הנכנסות.",
          beginnerHe:
            "אחרי שהפעלנו את המתג (Control Key), צריך להגדיר את ה\"כללים\": מתי לבדוק תעודה, ומה לעשות אם היא חסרה — להזהיר בלבד או לחסום. כאן קובעים את עוצמת-התגובה של המערכת.",
          consultantHe:
            "ההגדרה מקשרת Certificate type לרמת-קבלה (GR / Stock transfer) ולתגובה (Warning / Error / Block). היא קובעת אם תעודה חסרה תיצור רשומה ב-Worklist בלבד או תחסום פיזית את הקבלה. נשלטת פר Plant ו-Certificate category, ומשפיעה ישירות על QC51.",
          purposeHe:
            "להבדיל בין חומרים שבהם תעודה חסרה היא אזהרה (לוגיסטיקה גמישה) לבין חומרים קריטיים שבהם היא חסימה מוחלטת — איזון בין בקרה לבין רציפות-תפעולית.",
          processExampleHe:
            "פונקציית-בקרה מוגדרת \"Error\" לחומרי-מזון: קבלת-טובין ללא תעודה נחסמת. לחומרי-אריזה מוגדרת \"Warning\": הקבלה עוברת אך נרשמת התראה ב-Worklist.",
          cbcHe:
            "ב-CBC לתרכיז/סוכר/CO2 מוגדרת תגובת-חסימה (Error) — אין קבלה ללא תעודה; לחומרי-אריזה משניים מוגדרת אזהרה בלבד, כדי לא לעצור את קו-המילוי.",
          navHe: [
            "Quality Management ► Quality Certificates ► Certificate Receipt for Goods Receipt and Stock Transfer ► Define Control Functions for Certificate Processing",
          ],
          tables: ["TQ07C", "QALS", "QINF"],
          tcodes: ["OQ23", "QC51"],
          fiori: ["F2225"],
          configHe: [
            "הגדר פר Plant / Certificate category את התגובה לתעודה חסרה: ללא בדיקה / אזהרה / שגיאה (חסימה).",
            "קבע אם הבדיקה חלה על GR ועל Stock transfer.",
          ],
          mistakesHe: [
            "הגדרת \"Error\" גורף — חוסם קבלות גם לחומרים שאינם קריטיים.",
            "הגדרת \"Warning\" לחומר-מזון קריטי — מאפשר כניסה ללא תעודה.",
          ],
          troubleshootHe: [
            "קבלה לא נחסמת בהיעדר תעודה ➔ התגובה הוגדרה \"Warning\" במקום \"Error\".",
            "כל קבלה נחסמת מיותר ➔ התגובה מחמירה מדי או חלה על קטגוריות לא-נכונות.",
          ],
          bestPracticeHe: [
            "התאם את עוצמת-התגובה לקריטיות-החומר — חסימה לקריטי, אזהרה לזניח.",
            "בדוק את ההגדרה פר Plant, לא רק ברמה גלובלית.",
          ],
          interviewHe: [
            { qHe: "מה קובעות פונקציות-הבקרה לעיבוד-תעודות?", aHe: "מתי נבדקת קבלת-תעודה ומה התגובה לתעודה חסרה — אזהרה או חסימה — פר Plant וקטגוריה." },
            { qHe: "מה ההבדל בין Warning ל-Error בהקשר זה?", aHe: "Warning מאפשר את הקבלה ורושם התראה; Error חוסם את הקבלה עד הגעת התעודה." },
          ],
          takeawaysHe: [
            "פונקציות-בקרה = מנוע-הכללים לתעודות נכנסות.",
            "תגובה: ללא / אזהרה / חסימה.",
            "נשלט פר Plant וקטגוריית-תעודה.",
          ],
        },
        {
          id: "11.1.3",
          titleHe: "נתוני-אב לתעודות נכנסות",
          titleEn: "Master Data for Incoming Certificates",
          execHe:
            "נתוני-האב לתעודות נכנסות מגדירים לכל שילוב חומר↔ספק איזו תעודה נדרשת, באיזו רמה (אצווה/משלוח), ומהי בקרת-הקבלה. הם נשמרים בעיקר ב-Quality Info Record (QINF) ובתצוגת ה-QM של אב-החומר.",
          beginnerHe:
            "כדי שהמערכת תדע \"מהספק הזה, לחומר הזה — דרוש סוג-תעודה כזה\", צריך לרשום זאת מראש. הרישום הזה הוא נתוני-האב: רשומה אחת לכל זוג ספק-חומר, עם הגדרת-התעודה שלה.",
          consultantHe:
            "ה-QINF (Quality Info Record ברכש) נושא: שחרור-ספק (Release status), Control Key, Certificate type נדרש, ורמת-קבלה. הוא נוצר ב-QI01/QI02. בנוסף, אב-החומר תצוגת QM נושא את ה-Control Key הבסיסי. ב-GR המערכת מצליבה QINF + אב-חומר כדי לקבוע את דרישת-התעודה הסופית.",
          purposeHe:
            "לאפשר דרישת-תעודה מדויקת ודיפרנציאלית — ספק מהימן עשוי לדרוש פחות, ספק חדש יותר — בלי לקודד את הכללים בכל הזמנה ידנית.",
          processExampleHe:
            "נוצר QINF לספק-התרכיז: Control Key מחמיר, Certificate type \"Analysis\", שחרור-ספק פעיל. כל הזמנה לספק זה יורשת אוטומטית את הדרישה לתעודת-ניתוח.",
          cbcHe:
            "ב-CBC לכל ספק-תרכיז מאושר נוצר QINF הדורש תעודת-ניתוח לכל אצווה; ספק שאינו משוחרר ב-QINF כלל אינו מאושר לרכש — בקרת-איכות בשורש.",
          navHe: [
            "Logistics ► Quality Management ► Quality Inspection ► Quality Info Record ► Maintain (QI01)",
            "Quality Management ► QM in Logistics ► QM in Procurement ► Quality Info Record settings",
          ],
          tables: ["QINF", "QMAT", "LFA1"],
          tcodes: ["QI01", "QI02", "QI03", "MM02"],
          fiori: ["F2225"],
          configHe: [
            "צור QINF (QI01) לכל זוג חומר↔ספק: Release status, Control Key, Certificate type נדרש.",
            "ודא שתצוגת ה-QM של אב-החומר נושאת Control Key תואם.",
          ],
          mistakesHe: [
            "אי-יצירת QINF — דרישת-התעודה נופלת לברירת-מחדל של אב-החומר בלבד.",
            "שחרור-ספק (Release) שגוי ב-QINF — חוסם רכש מספק מאושר.",
          ],
          troubleshootHe: [
            "ספק מאושר נחסם ברכש ➔ Release status ב-QINF לא פעיל.",
            "תעודה לא נדרשת לספק מסוים ➔ QINF חסר או Certificate type ריק.",
          ],
          bestPracticeHe: [
            "נהל QINF לכל זוג ספק-חומר קריטי — לא להסתמך רק על אב-החומר.",
            "סנכרן את ה-Control Key בין QINF לאב-החומר.",
          ],
          interviewHe: [
            { qHe: "מהו Quality Info Record (QINF)?", aHe: "רשומת-אב לכל זוג חומר↔ספק הקובעת שחרור-ספק, Control Key ו-Certificate type נדרש ברכש." },
            { qHe: "כיצד QINF משפיע על דרישת-תעודה?", aHe: "ב-GR המערכת קוראת את QINF (יחד עם אב-החומר) כדי לקבוע אם וכיצד נדרשת תעודה מהספק." },
          ],
          takeawaysHe: [
            "QINF = רשומת-אב ספק↔חומר ברכש.",
            "נושא Release, Control Key ו-Certificate type.",
            "מאפשר דרישת-תעודה דיפרנציאלית פר ספק.",
          ],
          relatedHe: [{ labelHe: "אובייקט · QINF", href: "/library/qm/object/QINF/" }],
        },
        {
          id: "11.1.4",
          titleHe: "יצירת הזמנת-רכש",
          titleEn: "Create a Purchase Order",
          execHe:
            "הזמנת-הרכש היא נקודת-ההתחלה של תהליך התעודה הנכנסת. כשהחומר נושא QM-Control Key פעיל, ההזמנה (ME21N) יורשת אוטומטית את דרישת-התעודה ואת בקרת-הקבלה, כך שתהליך-האיכות מובנה בהזמנה מרגע יצירתה.",
          beginnerHe:
            "כשמזמינים חומר שדורש תעודה, אין צורך \"לזכור\" לדרוש אותה — ההזמנה כבר יודעת, כי החומר מוגדר כך באב-החומר/QINF. בעת הקבלה, המערכת תזכיר שצריך תעודה.",
          consultantHe:
            "ב-ME21N, לבנד-ההזמנה מצורף QM data (QM-Control Key מאב-החומר/QINF). השדה EKPO ובנתוני-ה-QM קובעים אם נדרשת תעודה. שחרור-ספק לא-פעיל ב-QINF עלול לחסום את ההזמנה. נתוני-ה-QM זמינים בלשונית-ה-QM של הבנד.",
          purposeHe:
            "להטמיע את דרישת-האיכות כבר ברכש — כך שהבקרה אינה תלויה בזיכרון-המשתמש אלא מובנית בזרימת-המסמך.",
          processExampleHe:
            "רוכש יוצר ME21N לתרכיז; ההזמנה יורשת Control Key מחמיר ומסמנת דרישת-תעודת-ניתוח. בלשונית-ה-QM נראה הסטטוס; בקבלה תיבדק הגעת-התעודה.",
          cbcHe:
            "ב-CBC הזמנת-רכש לתרכיז נוצרת מול ספק מאושר ב-QINF; ההזמנה כוללת אוטומטית דרישת-תעודה ובקרת-קבלה, כך שאצווה ללא תעודה תיחסם בהמשך.",
          navHe: [
            "Logistics ► Materials Management ► Purchasing ► Purchase Order ► Create (ME21N)",
          ],
          tables: ["EKKO", "EKPO", "QINF"],
          tcodes: ["ME21N", "ME22N", "ME23N"],
          fiori: ["F0842A"],
          configHe: [
            "ודא שלחומר יש QM-Control Key פעיל באב-החומר/QINF — ההזמנה יורשת ממנו.",
            "בדוק את לשונית-ה-QM בבנד-ההזמנה לאישור דרישת-התעודה.",
          ],
          mistakesHe: [
            "יצירת הזמנה לחומר ללא Control Key — אין דרישת-תעודה למרות קריטיות.",
            "התעלמות מחסימת-ספק ב-QINF — ההזמנה נדחית ללא הסבר ברור.",
          ],
          troubleshootHe: [
            "אין דרישת-תעודה בהזמנה ➔ Control Key לא פעיל באב-החומר/QINF.",
            "הזמנה נחסמת לספק ➔ Release status ב-QINF לא פעיל.",
          ],
          bestPracticeHe: [
            "בדוק את לשונית-ה-QM בעת יצירת הזמנה לחומר קריטי.",
            "ודא שחרור-ספק ב-QINF לפני יצירת ההזמנה.",
          ],
          interviewHe: [
            { qHe: "כיצד הזמנת-רכש יורשת דרישת-תעודה?", aHe: "מה-QM-Control Key של אב-החומר/QINF — נתוני-ה-QM מוטמעים בבנד-ההזמנה ב-ME21N." },
            { qHe: "מה עלול לחסום הזמנה לספק?", aHe: "Release status לא-פעיל ב-Quality Info Record (QINF) של זוג ספק↔חומר." },
          ],
          takeawaysHe: [
            "ההזמנה היא נקודת-ההתחלה של תהליך-התעודה.",
            "דרישת-התעודה נירשת אוטומטית מ-Control Key.",
            "שחרור-ספק ב-QINF הוא תנאי לרכש.",
          ],
        },
        {
          id: "11.1.5",
          titleHe: "קבלת-טובין כנגד ההזמנה",
          titleEn: "Goods Receipt against the PO",
          execHe:
            "קבלת-הטובין (MIGO) היא הרגע שבו המערכת בודקת אם תעודת-האיכות הגיעה. בהתאם לפונקציות-הבקרה, היא מאשרת קבלה, מציבה את המלאי ב-Quality/Blocked stock, או יוצרת רשומה ל-Worklist אם תעודה חסרה.",
          beginnerHe:
            "כשהמשלוח מגיע למחסן ומקבלים אותו ב-SAP, המערכת שואלת: \"הגיעה התעודה?\". אם כן — החומר עובר הלאה; אם לא — הוא נכנס למלאי-חסום/בדיקה ונרשם ברשימת-המעקב עד שתגיע התעודה.",
          consultantHe:
            "ב-MIGO, אם QM פעיל, נוצרת Inspection Lot (QALS) ומלאי נכנס ל-Quality Inspection stock. בקרת-התעודה נבדקת מול הפונקציות מ-11.1.2: תעודה חסרה ➔ רשומה ב-QC51 ו/או חסימה. שחרור-אצווה לשימוש מצריך Usage Decision (QA11) ואישור-קבלת-התעודה.",
          purposeHe:
            "לוודא שחומר אינו עובר לשימוש-חופשי לפני שאיכותו אומתה — דרך תעודת-ספק ו/או בדיקת-קבלה — וליצור תיעוד-ביקורת מלא.",
          processExampleHe:
            "GR לתרכיז: נוצר Inspection Lot, המלאי ב-Quality stock. התעודה לא צורפה ➔ רשומה ב-QC51, חשבונית חסומה. עם הגעת-התעודה ואישורה — Usage Decision משחרר ל-Unrestricted.",
          cbcHe:
            "ב-CBC קבלת תרכיז יוצרת Inspection Lot; האצווה ב-Quality stock עד שתעודת-הניתוח של הספק מאושרת. רק אז הקו רשאי למשוך את האצווה למילוי.",
          navHe: [
            "Logistics ► Materials Management ► Inventory Management ► Goods Movement ► Goods Receipt (MIGO)",
          ],
          tables: ["QALS", "MSEG", "MKPF", "EKBE"],
          tcodes: ["MIGO", "MB01", "QA11", "QC51"],
          fiori: ["F0843", "F2225"],
          configHe: [
            "ודא ש-QM פעיל יוצר Inspection Lot ומציב מלאי ב-Quality Inspection stock.",
            "בקרת-תעודה נשענת על פונקציות-הבקרה (11.1.2) — תגובה לתעודה חסרה.",
          ],
          mistakesHe: [
            "שחרור-אצווה (Usage Decision) ללא אימות-תעודה — מנטרל את הבקרה.",
            "התעלמות מ-Inspection Lot שנוצר — אצווה נתקעת ב-Quality stock.",
          ],
          troubleshootHe: [
            "מלאי תקוע ב-Quality stock ➔ חסרה Usage Decision (QA11) ו/או תעודה.",
            "חשבונית חסומה ➔ תעודה חסרה + \"Block invoice\" פעיל ב-Control Key.",
          ],
          bestPracticeHe: [
            "סרוק את QC51 מיד אחרי גל-קבלות לאיתור תעודות חסרות.",
            "אל תשחרר Usage Decision לפני אישור-קבלת-התעודה.",
          ],
          interviewHe: [
            { qHe: "מה קורה ב-GR כשחסרה תעודה?", aHe: "בהתאם לפונקציות-הבקרה: רשומה ב-Worklist (QC51), מלאי ב-Quality/Blocked stock, ו/או חסימת-חשבונית." },
            { qHe: "כיצד משחררים אצווה לשימוש אחרי GR?", aHe: "באמצעות Usage Decision (QA11) על ה-Inspection Lot, לאחר אימות התעודה/הבדיקה." },
          ],
          takeawaysHe: [
            "GR הוא רגע-בדיקת-התעודה.",
            "QM פעיל ➔ Inspection Lot + Quality stock.",
            "שחרור לשימוש דרך Usage Decision.",
          ],
          relatedHe: [{ labelHe: "אובייקט · QALS", href: "/library/qm/object/QALS/" }],
        },
        {
          id: "11.1.6",
          titleHe: "תעודת-בדיקה נכנסת",
          titleEn: "Incoming Inspection Certificate",
          execHe:
            "תעודת-הבדיקה הנכנסת היא המסמך עצמו שהספק שולח, ובו תוצאות-הבדיקה לאצווה. ב-QM ניתן לתעד את קבלתה, להזין את תוצאותיה כ-Inspection results, ולקשרה ל-Inspection Lot ולאצווה — ובכך לאשר את החומר.",
          beginnerHe:
            "זוהי \"התעודה האמיתית\" שהגיעה מהספק. אפשר רק לסמן שהגיעה, או — לחומר קריטי — להקליד את הערכים שכתובים בה לתוך המערכת, כך שיישמרו לצד האצווה לבדיקה עתידית.",
          consultantHe:
            "התעודה מקושרת ל-Inspection Lot (QALS) ולאצווה (Batch). ערכי-התעודה יכולים להיכנס כ-Results recording מול Inspection Characteristics, או כאישור-קבלה בלבד. הסטטוס מתועד ומפעיל את שחרור ה-Usage Decision. שילוב עם Batch classification מאפשר העברת-ערכי-איכות לאצווה.",
          purposeHe:
            "לתעד ולאמת את תוכן התעודה — לא רק את קבלתה — כדי לאפשר החלטת-שימוש מבוססת-נתונים ושמירת-היסטוריה ברמת-האצווה.",
          processExampleHe:
            "תעודת-ניתוח לתרכיז מגיעה עם ערכי Brix וחומציות; היועץ מזין אותם כ-Results מול ה-Inspection Lot; אם בתחום-המפרט — Usage Decision = Accept והאצווה משוחררת.",
          cbcHe:
            "ב-CBC ערכי תעודת-הניתוח של התרכיז (Brix, חומציות, מיקרוביולוגיה) מוזנים מול ה-Inspection Lot ונשמרים על האצווה — כך שכל משקה ניתן לתחקור עד תעודת-הספק.",
          navHe: [
            "Logistics ► Quality Management ► Quality Inspection ► Results Recording (QE51N)",
            "Logistics ► Quality Management ► Quality Inspection ► Inspection Lot ► Usage Decision (QA11)",
          ],
          tables: ["QALS", "QAMR", "QAVE", "MCH1"],
          tcodes: ["QE51N", "QA11", "QC51"],
          fiori: ["F2225", "F2218"],
          configHe: [
            "הגדר Inspection Characteristics התואמות לערכי-התעודה לרישום-תוצאות.",
            "קשר Results ל-Usage Decision ולסיווג-אצווה (Batch classification) במידת-הצורך.",
          ],
          mistakesHe: [
            "אישור-קבלת-תעודה בלי לבדוק את תוכנה — מנטרל את ערך-האיכות.",
            "אי-קישור ערכי-תעודה לאצווה — אובדן-תחקור עתידי.",
          ],
          troubleshootHe: [
            "לא ניתן להזין ערכי-תעודה ➔ אין Inspection Characteristics מתאימות ב-Lot.",
            "אצווה לא משתחררת אחרי הזנת-תוצאות ➔ Usage Decision (QA11) לא בוצעה.",
          ],
          bestPracticeHe: [
            "לחומר קריטי — הזן ערכי-תעודה כ-Results, לא רק \"הגיע\".",
            "קשר את הערכים לסיווג-האצווה לתחקור Forward/Backward.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין אישור-קבלת-תעודה לבין רישום-תוצאותיה?", aHe: "אישור-קבלה רק מסמן שהתעודה הגיעה; רישום-תוצאות מזין את ערכי-התעודה כ-Inspection results ושומר אותם על האצווה." },
            { qHe: "כיצד תעודה נכנסת מקושרת לאצווה?", aHe: "דרך ה-Inspection Lot (QALS) ו-Batch classification — הערכים נשמרים על האצווה לתחקור." },
          ],
          takeawaysHe: [
            "התעודה הנכנסת היא המסמך + תוצאותיו.",
            "ניתן לתעד קבלה או להזין ערכים כ-Results.",
            "קישור לאצווה מאפשר תחקור-איכות.",
          ],
        },
        {
          id: "11.1.7",
          titleHe: "רשימת-מעקב תעודות נכנסות",
          titleEn: "Incoming Certificate Worklist",
          execHe:
            "רשימת-המעקב (QC51) מרכזת את כל התעודות הצפויות/החסרות לקבלות-הטובין הפתוחות. היא הכלי התפעולי היומיומי שבו צוות-האיכות והרכש מזהים אילו אצוות חסרות תעודה ופועלים לשחררן.",
          beginnerHe:
            "זוהי \"רשימת-המטלות\" של התעודות הנכנסות. כל שורה היא אצווה שמחכה לתעודה. הצוות עובר על הרשימה, מאתר תעודות שהגיעו, מאשר אותן, והאצוות משוחררות.",
          consultantHe:
            "QC51 (Certificate Receipt Worklist) שולפת מ-QALS ומ-EKBE את הקבלות עם דרישת-תעודה שטרם סופקה. ממנה ניתן לאשר-קבלה, להזין תוצאות, או לתעד בעיה. QC55 מציגה תצוגה מרוכזת. הרשימה היא נגזרת ישירה של פונקציות-הבקרה (11.1.2).",
          purposeHe:
            "לתת נראות תפעולית ריכוזית לתעודות חסרות — כדי שאצווה חסומה לא \"תיעלם\" ולא תעכב ייצור או תשלום.",
          processExampleHe:
            "מנהל-האיכות פותח QC51 בבוקר, רואה שלוש אצוות-תרכיז ללא תעודה, מתקשר לספק, מקבל את התעודות, מאשר ב-QC51 ומשחרר את האצוות לקו-המילוי.",
          cbcHe:
            "ב-CBC QC51 נסרקת מדי בוקר; כל אצוות תרכיז/סוכר ללא תעודה מסומנות ומטופלות מול הספק לפני תחילת-המשמרת, כדי שקווי-המילוי לא ייעצרו.",
          navHe: [
            "Logistics ► Quality Management ► Quality Certificates ► Certificate Receipt ► Worklist (QC51)",
            "Logistics ► Quality Management ► Quality Certificates ► Certificate Receipt ► Monitor (QC55)",
          ],
          tables: ["QALS", "EKBE", "QINF"],
          tcodes: ["QC51", "QC55"],
          fiori: ["F2225"],
          configHe: [
            "QC51 נגזרת מפונקציות-הבקרה (11.1.2); ודא שהן מסומנות ליצירת רשומות-מעקב.",
            "השתמש ב-QC55 לתצוגת-ניטור מרוכזת על-פני מפעלים/ספקים.",
          ],
          flow: [
            { he: "קבלה ללא תעודה", code: "MIGO", note: "תגובת Warning/Error" },
            { he: "רשומה נכנסת ל-Worklist", code: "QC51" },
            { he: "צוות מאתר/מקבל תעודה", note: "מול הספק" },
            { he: "אישור-קבלה ב-Worklist", code: "QC51" },
            { he: "אצווה משוחררת", code: "QA11" },
          ],
          mistakesHe: [
            "אי-סקירת QC51 — אצוות חסומות נשכחות ומעכבות ייצור.",
            "אישור-קבלה ב-QC51 בלי לבדוק את התעודה בפועל.",
          ],
          troubleshootHe: [
            "אצווה לא מופיעה ב-QC51 ➔ פונקציות-הבקרה לא יוצרות רשומת-מעקב לקטגוריה.",
            "אצווה נשארת ב-QC51 אחרי אישור ➔ Usage Decision (QA11) לא בוצעה.",
          ],
          bestPracticeHe: [
            "הפוך את סקירת-QC51 לשגרה יומית של האיכות/רכש.",
            "השתמש ב-QC55 לניטור-מגמות (ספקים בעייתיים).",
          ],
          interviewHe: [
            { qHe: "מה מציגה QC51?", aHe: "את כל הקבלות עם דרישת-תעודה שטרם סופקה — רשימת-המעקב התפעולית של התעודות הנכנסות." },
            { qHe: "מה ההבדל בין QC51 ל-QC55?", aHe: "QC51 היא Worklist לטיפול; QC55 היא תצוגת-ניטור מרוכזת על-פני מפעלים וספקים." },
          ],
          takeawaysHe: [
            "QC51 = רשימת-המעקב של תעודות חסרות.",
            "הכלי התפעולי היומיומי לשחרור אצוות.",
            "QC55 לניטור מרוכז.",
          ],
          relatedHe: [{ labelHe: "אובייקט · QALS", href: "/library/qm/object/QALS/" }],
        },
      ],
    },
    // ============================================================ 11.2
    {
      id: "11.2",
      titleHe: "תעודות איכות יוצאות (Outgoing Quality Certificates)",
      titleEn: "Outgoing Quality Certificates",
      execHe:
        "תעודות-איכות יוצאות הן מסמכי-איכות שהארגון מפיק ושולח ללקוחותיו יחד עם משלוח, ובהם הוכחה שהמוצר עומד במפרט. ב-QM מנגנון ה-Certificate Profile (QC20) מגדיר אילו ערכים מופיעים בתעודה ומאיפה הם נשאבים — Inspection results, אצווה, או נתוני-אב — והתעודה מופקת אוטומטית במשלוח (VL01N).",
      beginnerHe:
        "כשמוכרים משקה לקמעונאי, שולחים איתו \"תעודת-איכות\" שמראה שהמוצר תקין. SAP יודע להרכיב את התעודה הזו אוטומטית: הוא לוקח את תוצאות-הבדיקה של האצווה, מסדר אותן בתבנית, ומדפיס/שולח אותן עם המשלוח.",
      consultantHe:
        "הליבה היא Certificate Profile (QC20/QC21) — תבנית הקובעת אילו Characteristics מופיעות, מקור-הנתונים (Inspection results / Batch / Material spec) ולוגיקת-הבחירה (Origin). הפרופיל מוקצה דרך Certificate assignment ל-Material/Customer. במשלוח (VL01N) ה-Output type מפיק את התעודה. נתוני-המקור נשענים על QALS/QAMR ועל סיווג-האצווה.",
      purposeHe:
        "לספק ללקוח הוכחת-איכות אוטומטית ועקבית, לעמוד בדרישות-רגולציה/חוזה, ולחסוך הפקה ידנית של תעודות — כל זאת תוך שאיבת-נתונים מהמקור האמין (תוצאות-הבדיקה והאצווה).",
      processExampleHe:
        "במשלוח משקה ללקוח, ה-Output במשלוח מפעיל את ה-Certificate Profile של המוצר; הפרופיל שואב את ערכי-הבדיקה של האצווה (Brix, חומציות), מרכיב תעודה ומדפיס/שולח אותה עם תעודת-המשלוח.",
      cbcHe:
        "ב-CBC כל משלוח-משקאות לקמעונאי גדול מלווה בתעודת-איכות אוטומטית, השואבת את ערכי-הבדיקה של אצוות-המילוי. כך הקמעונאי מקבל הוכחת-עמידה-במפרט לכל אצווה ללא עבודה ידנית של CBC.",
      navHe: [
        "Quality Management ► Quality Certificates ► Certificates in Sales and Distribution ► Define Certificate Profile (QC20)",
        "Quality Management ► Quality Certificates ► Certificates in Sales and Distribution ► Assign Certificate Profiles",
        "Quality Management ► Quality Certificates ► Output Determination ► Maintain Output Types",
      ],
      tables: ["QCVK", "QCVM", "QALS", "MCH1"],
      tcodes: ["QC20", "QC21", "QC22", "VL01N"],
      fiori: ["F2225", "F0867A"],
      configHe: [
        "Certificate Profile (QC20): תבנית התעודה — אילו Characteristics, מקור-הנתונים (Origin), וטקסטים.",
        "Certificate Assignment: שיוך הפרופיל ל-Material / Customer / Customer-Material.",
        "Output Determination: Output type לתעודה במשלוח (VL01N) — מדיה (הדפסה/PDF/EDI).",
      ],
      flow: [
        { he: "הגדרת Certificate Profile", code: "QC20", note: "Characteristics + Origin" },
        { he: "שיוך פרופיל למוצר/לקוח", note: "Certificate assignment" },
        { he: "יצירת משלוח", code: "VL01N", note: "Output מופעל" },
        { he: "שאיבת ערכים מאצווה/Lot", code: "QALS", note: "Inspection results" },
        { he: "הפקת-תעודה ושליחה", note: "הדפסה / PDF / EDI" },
      ],
      masterDataHe: [
        "QCVK = כותרת Certificate Profile · QCVM = פריטי-הפרופיל (Characteristics).",
        "QALS/QAMR = מקור ערכי-הבדיקה · MCH1 = אצווה (Batch) ל-Origin מסוג Batch.",
      ],
      mistakesHe: [
        "פרופיל שואב Origin שגוי — הערכים בתעודה ריקים או לא-עדכניים.",
        "אי-שיוך הפרופיל ל-Material/Customer — תעודה לא מופקת במשלוח.",
        "Output type לא מוגדר — אין הפעלה אוטומטית בתעודת-המשלוח.",
      ],
      troubleshootHe: [
        "תעודה לא מופקת במשלוח ➔ פרופיל לא משויך או Output type חסר.",
        "ערכים ריקים בתעודה ➔ Origin שגוי או אין Inspection results לאצווה.",
        "תעודה שגויה ללקוח ➔ Certificate assignment מצביע על פרופיל לא-נכון.",
      ],
      bestPracticeHe: [
        "בנה מעט Certificate Profiles סטנדרטיים לפי משפחות-מוצר.",
        "בדוק Origin מול נתוני-אצווה אמיתיים לפני Go-Live.",
        "אזן בין שיוך גלובלי (Material) לבין דרישות-לקוח ספציפיות.",
      ],
      interviewHe: [
        { qHe: "מהו Certificate Profile?", aHe: "תבנית (QC20) הקובעת אילו Characteristics מופיעות בתעודה ומאיזה מקור (Origin: Inspection results / Batch / Material spec) נשאבים ערכיהן." },
        { qHe: "כיצד תעודה יוצאת מופקת אוטומטית?", aHe: "ה-Output Determination במשלוח (VL01N) מפעיל את ה-Certificate Profile המשויך למוצר/לקוח, השואב נתונים מה-Lot/אצווה." },
        { qHe: "מהו Origin בפרופיל?", aHe: "מקור-הנתונים לכל Characteristic — מאיפה לשאוב את הערך: תוצאות-בדיקה, אצווה, או מפרט-חומר." },
      ],
      takeawaysHe: [
        "תעודה יוצאת = הוכחת-איכות ללקוח, מופקת אוטומטית.",
        "Certificate Profile (QC20) מגדיר תוכן ומקור.",
        "Output במשלוח (VL01N) מפיק את התעודה.",
      ],
      relatedHe: [
        { labelHe: "QM · תעודות נכנסות (11.1)", href: "/library/qm/chapter-11/#sub-11.1" },
        { labelHe: "אובייקט · QCVK", href: "/library/qm/object/QCVK/" },
      ],
      children: [
        {
          id: "11.2.1",
          titleHe: "הגדרת מפתחות לעיבוד תעודות",
          titleEn: "Define Keys for Certificate Processing",
          execHe:
            "מפתחות עיבוד-התעודות מגדירים את אבני-הבניין של תעודה יוצאת: Certificate type (סוג-תעודה), Origin (מקור-נתונים) ו-Data Origin keys. הם קובעים אילו סוגי-תעודות קיימים ומאיפה נשאב כל ערך, ומשמשים בסיס לבניית ה-Certificate Profile.",
          beginnerHe:
            "לפני שבונים תבנית-תעודה, צריך \"מילון\" של אבני-בניין: אילו סוגי-תעודות יש (תעודת-ניתוח, תעודת-התאמה), ומאיפה אפשר לקחת ערכים (מהבדיקה? מהאצווה?). מפתחות אלה הם המילון הזה.",
          consultantHe:
            "מגדירים Certificate types ו-Data Origins: Origin 1 = Inspection results לאצווה, Origin 2 = ערכי-בדיקה ללא אצווה, Origin 3 = Master inspection characteristic / Material spec, ועוד. ה-Origin נבחר לכל Characteristic ב-QC20. כן מגדירים Certificate format/layout keys ושיוך ל-Output.",
          purposeHe:
            "לקבע את אוצר-המונחים והמקורות מראש — כך שבניית-פרופיל היא הרכבה מאבני-בניין מוגדרות, אחידה ונשלטת, ולא הגדרה אד-הוק לכל תעודה.",
          processExampleHe:
            "מוגדר Certificate type \"Analysis\" ו-Data Origin \"Inspection results per batch\". בבניית הפרופיל, כל Characteristic מקבלת את ה-Origin הזה כדי לשאוב מ-Lot האצווה.",
          cbcHe:
            "ב-CBC מוגדרים סוג-תעודה \"Certificate of Analysis\" ו-Origin \"תוצאות-בדיקה לפי אצווה\" — כל תעודות-המשקאות לקמעונאים נבנות מאבני-הבניין האחידות הללו.",
          navHe: [
            "Quality Management ► Quality Certificates ► Certificates in Sales and Distribution ► Define Certificate Types",
            "Quality Management ► Quality Certificates ► Certificates in Sales and Distribution ► Define Data Origin",
          ],
          tables: ["TQ08", "QCVK"],
          tcodes: ["OQ16", "QC20"],
          fiori: ["F2225"],
          configHe: [
            "הגדר Certificate types (Analysis / Conformance) הזמינים לפרופילים.",
            "הגדר Data Origins (Inspection results / Batch / Material spec) הניתנים לבחירה לכל Characteristic.",
          ],
          mistakesHe: [
            "הגדרת Origins רבים ומבלבלים — מקשה על בוני-הפרופיל.",
            "סוג-תעודה ללא Origin תואם — לא ניתן לשאוב ערכים בפועל.",
          ],
          troubleshootHe: [
            "לא ניתן לבחור Origin בפרופיל ➔ ה-Data Origin לא הוגדר.",
            "סוג-תעודה חסר בבחירה ➔ Certificate type לא מוגדר.",
          ],
          bestPracticeHe: [
            "הגדר מעט Origins ברורים — בעיקר \"Inspection results per batch\".",
            "תעד את משמעות כל Certificate type לארגון.",
          ],
          interviewHe: [
            { qHe: "מהו Data Origin בעיבוד-תעודות?", aHe: "מפתח הקובע מאיפה Characteristic שואבת את ערכה — תוצאות-בדיקה, אצווה, או מפרט-חומר." },
            { qHe: "מדוע מגדירים מפתחות לפני הפרופיל?", aHe: "כדי שבניית-הפרופיל תהיה הרכבה מאבני-בניין אחידות (סוגי-תעודה ומקורות) במקום הגדרה אד-הוק." },
          ],
          takeawaysHe: [
            "מפתחות = אבני-הבניין של תעודה יוצאת.",
            "Certificate types + Data Origins.",
            "ה-Origin קובע מאיפה נשאב כל ערך.",
          ],
        },
        {
          id: "11.2.2",
          titleHe: "נתוני-אב לתעודות יוצאות",
          titleEn: "Master Data for Outgoing Certificates",
          execHe:
            "נתוני-האב לתעודות יוצאות הם ה-Certificate Profile (QCVK/QCVM) ושיוכו (Certificate assignment) ל-Material / Customer. הם קובעים בפועל איזו תעודה תופק לכל צירוף מוצר-לקוח, ומהם תוכנה ומקורותיה.",
          beginnerHe:
            "כדי שהמערכת תדע \"למוצר הזה, ללקוח הזה — הפק תעודה כזו\", צריך לשמור פרופיל-תעודה ולשייך אותו. הפרופיל הוא התבנית; השיוך מחבר אותה למוצר/לקוח הנכון.",
          consultantHe:
            "ה-Certificate Profile נוצר ב-QC20, כותרתו ב-QCVK ופריטיו ב-QCVM. השיוך נעשה ברמות-עדיפות: Customer-Material → Material → Customer → גלובלי. בעת קביעת-התעודה, המערכת בוחרת את הפרופיל הספציפי ביותר. תחזוקה דרך QC21/QC22.",
          purposeHe:
            "לאפשר הפקת-תעודה דיפרנציאלית ומדויקת — לקוח אחד עשוי לדרוש פורמט שונה — בלי לקודד את הכללים בכל משלוח.",
          processExampleHe:
            "נוצר Profile \"COA-Beverage\" ומשויך ברמת-Material לכל המשקאות; לקוח-מפתח מקבל שיוך Customer-Material עם פורמט מורחב. במשלוח המערכת בוחרת את הפרופיל הנכון לפי העדיפות.",
          cbcHe:
            "ב-CBC פרופיל ברירת-מחדל משויך לכל המשקאות ברמת-Material; רשת-קמעונאות גדולה מקבלת פרופיל ייעודי ברמת-Customer-Material עם שדות נוספים שהיא דורשת בחוזה.",
          navHe: [
            "Quality Management ► Quality Certificates ► Certificates in Sales and Distribution ► Define Certificate Profile (QC20)",
            "Quality Management ► Quality Certificates ► Certificates in Sales and Distribution ► Assign Certificate Profiles to Material/Customer",
          ],
          tables: ["QCVK", "QCVM", "QCVD"],
          tcodes: ["QC20", "QC21", "QC22"],
          fiori: ["F2225"],
          configHe: [
            "צור Certificate Profile (QC20): Characteristics, Origin, טקסטים ופורמט.",
            "שייך את הפרופיל ברמות: Customer-Material / Material / Customer / גלובלי — לפי סדר-עדיפות.",
          ],
          mistakesHe: [
            "פרופיל ללא שיוך — תעודה לא נבחרת במשלוח.",
            "שיוך גלובלי בלבד — לא ניתן לתת פורמט-לקוח ייעודי.",
          ],
          troubleshootHe: [
            "פרופיל לא נבחר במשלוח ➔ חסר Certificate assignment ברמה כלשהי.",
            "פרופיל שגוי נבחר ➔ שיוך ספציפי יותר (Customer-Material) גובר על הצפוי.",
          ],
          bestPracticeHe: [
            "התחל מפרופיל-Material גלובלי, והוסף שיוכי-לקוח רק בצורך.",
            "נהל גרסאות-פרופיל לפי משפחות-מוצר.",
          ],
          interviewHe: [
            { qHe: "מהו Certificate assignment?", aHe: "השיוך של Certificate Profile ל-Material/Customer ברמות-עדיפות, הקובע איזה פרופיל יופק לכל צירוף מוצר-לקוח." },
            { qHe: "מה סדר-העדיפות בבחירת-פרופיל?", aHe: "מהספציפי לכללי: Customer-Material → Material → Customer → גלובלי." },
          ],
          takeawaysHe: [
            "נתוני-אב = Profile (QCVK/QCVM) + שיוך.",
            "השיוך נבחר לפי סדר-עדיפות.",
            "מאפשר תעודה דיפרנציאלית פר לקוח.",
          ],
          relatedHe: [{ labelHe: "אובייקט · QCVK", href: "/library/qm/object/QCVK/" }],
        },
        {
          id: "11.2.3",
          titleHe: "תהליכים עסקיים",
          titleEn: "Business Processes",
          execHe:
            "התהליך העסקי של תעודה יוצאת קושר את QM ל-SD: יצירת-משלוח (VL01N) מפעילה Output Determination שמפיקה את התעודה לפי הפרופיל, שואבת ערכים מה-Inspection Lot/אצווה, ושולחת אותה ללקוח. זהו השרשור המלא מהמשלוח ועד התעודה בידי-הלקוח.",
          beginnerHe:
            "כל מה שלמדנו מתחבר כאן לזרימה אחת: יוצרים משלוח, המערכת מזהה שצריך תעודה, מרכיבה אותה מהנתונים, ומדפיסה/שולחת אותה ללקוח יחד עם הסחורה. זהו \"הסרט המלא\" של התעודה היוצאת.",
          consultantHe:
            "השרשור: SD Delivery (VL01N) → Output Determination (Condition technique) → Certificate Profile → שאיבת-נתונים (QALS/QAMR/Batch) → רינדור (Smart Form / Adobe Form) → מדיה (הדפסה/PDF/EDI). ניתן להפיק גם ידנית (QC42) או באצווה. סטטוס-ה-Output מנוטר ב-VL71. תלות קריטית: קיום Inspection results לאצווה במשלוח.",
          purposeHe:
            "להבטיח שכל משלוח-רלוונטי מלווה בתעודה תקפה ועדכנית, אוטומטית, כחלק מתהליך-המכירה — ללא תלות בפעולה-ידנית ובלי לעכב את המשלוח.",
          processExampleHe:
            "פיקינג ו-PGI למשלוח-משקאות; ה-Output מפיק תעודת-COA השואבת את ערכי-הבדיקה של אצוות-המשלוח; התעודה מודפסת/נשלחת ב-EDI ללקוח יחד עם תעודת-המשלוח.",
          cbcHe:
            "ב-CBC משלוח לקמעונאי גדול עובר PGI; התעודה מופקת אוטומטית מערכי-אצוות-המילוי ונשלחת ב-EDI ל-Portal של הרשת — הקמעונאי מקבל הוכחת-איכות לכל אצווה ברגע השילוח.",
          navHe: [
            "Logistics ► Sales and Distribution ► Shipping ► Outbound Delivery ► Create (VL01N)",
            "Logistics ► Quality Management ► Quality Certificates ► Certificate Creation for Delivery (QC42)",
            "Quality Management ► Quality Certificates ► Output Determination ► Maintain Output Types / Condition Records",
          ],
          tables: ["LIKP", "LIPS", "QCVK", "NAST"],
          tcodes: ["VL01N", "VL02N", "QC42", "VL71"],
          fiori: ["F0867A", "F2225"],
          configHe: [
            "Output Determination (Condition technique): Output type לתעודה, סדר-גישה ורשומות-תנאי.",
            "Form רינדור (Smart Form / Adobe Form) לתעודה; מדיה: הדפסה / PDF / EDI.",
            "אפשרות הפקה ידנית (QC42) או באצווה למשלוחים פתוחים.",
          ],
          flow: [
            { he: "יצירת משלוח", code: "VL01N", note: "Outbound Delivery" },
            { he: "פיקינג + PGI", code: "VL02N", note: "Goods Issue" },
            { he: "Output Determination", code: "NAST", note: "Certificate Output type" },
            { he: "שאיבת ערכי-אצווה", code: "QALS", note: "Inspection results" },
            { he: "הפקה ושליחה", code: "QC42", note: "הדפסה / PDF / EDI" },
          ],
          masterDataHe: [
            "LIKP/LIPS = כותרת/פריטי-משלוח · NAST = רשומות-Output · QCVK = פרופיל-התעודה.",
          ],
          mistakesHe: [
            "אין Inspection results לאצווה במשלוח — התעודה ריקה למרות שהופקה.",
            "Output type לא מוצמד לסוג-המשלוח — תעודה לא מופעלת אוטומטית.",
            "הסתמכות על הפקה-ידנית בלבד (QC42) — תעודות נשכחות.",
          ],
          troubleshootHe: [
            "תעודה לא הופקה במשלוח ➔ רשומת-Output חסרה או Condition לא מתקיים.",
            "תעודה הופקה ריקה ➔ אין Inspection results / Origin שגוי בפרופיל.",
            "תעודה לא נשלחה ➔ מדיית-ה-Output (EDI/הדפסה) לא תקינה — בדוק VL71.",
          ],
          bestPracticeHe: [
            "אוטומט את ה-Output לסוגי-המשלוח הרלוונטיים — אל תסמוך על QC42 ידני.",
            "ודא קיום Inspection results לאצווה לפני PGI.",
            "נטר את סטטוס-ה-Output ב-VL71 למשלוחים שנכשלו.",
          ],
          interviewHe: [
            { qHe: "כיצד מופקת תעודה יוצאת בתהליך-המשלוח?", aHe: "VL01N מפעיל Output Determination שבוחר את ה-Certificate Profile, שואב ערכים מה-Lot/אצווה ומרנדר את התעודה למדיית-השליחה." },
            { qHe: "מהי התלות הקריטית להפקת-תעודה תקינה?", aHe: "קיום Inspection results לאצוות-המשלוח; בלעדיהם התעודה תופק ריקה." },
            { qHe: "כיצד מפיקים תעודה ידנית או באצווה?", aHe: "דרך QC42 למשלוח ספציפי, או בריצת-אצווה למשלוחים-פתוחים; ניטור ב-VL71." },
          ],
          takeawaysHe: [
            "התהליך מחבר SD (VL01N) ל-QM (פרופיל + Lot).",
            "Output Determination מפיק אוטומטית.",
            "תלות קריטית: Inspection results לאצווה.",
          ],
          relatedHe: [{ labelHe: "QM · נתוני-אב לתעודות יוצאות (11.2.2)", href: "/library/qm/chapter-11/#sub-11.2.2" }],
        },
      ],
    },
    // ============================================================ 11.3
    {
      id: "11.3",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה כיסה את שני צדי תעודות-האיכות ב-QM: תעודות נכנסות מספקים — שמופעלות דרך QM-Control Key ופונקציות-בקרה, נבדקות ב-GR, ומנוהלות ברשימת-מעקב (QC51); ותעודות יוצאות ללקוחות — שמוגדרות דרך Certificate Profile (QC20), שואבות ערכים מ-Inspection results/אצווה, ומופקות אוטומטית במשלוח (VL01N). יחד הן יוצרות שרשרת-איכות מתועדת מהספק ועד הלקוח.",
      beginnerHe:
        "תעודות-איכות עובדות בשני כיוונים: מקבלים תעודה מהספק (כדי לוודא שהחומר תקין לפני שמשתמשים בו), ושולחים תעודה ללקוח (כדי להוכיח שהמוצר תקין). SAP יודע לדרוש, לבדוק, לנהל ולהפיק את שתיהן אוטומטית.",
      consultantHe:
        "הצד הנכנס נשען על QSSYS (Control Key), QINF, פונקציות Certificate processing, QALS ו-QC51. הצד היוצא נשען על QCVK/QCVM (Certificate Profile QC20), Data Origin, Certificate assignment ו-Output Determination במשלוח. נקודות-הכשל הנפוצות: הפעלת-חצי (Control Key בלי processing) בנכנס, והיעדר Inspection results או שיוך-פרופיל ביוצא.",
      purposeHe:
        "לקבע תהליך-איכות מקצה-לקצה: מניעת כניסת-חומר ללא הוכחה, ומתן-הוכחה ללקוח — שניהם מתועדים, אוטומטיים וברי-תחקור.",
      processExampleHe:
        "מחזור מלא ב-CBC: ספק שולח תרכיז עם תעודת-ניתוח ➔ נבדקת ב-GR, אצווה משוחררת ➔ המשקה מיוצר ונבדק ➔ במשלוח לקמעונאי מופקת תעודת-COA אוטומטית מערכי-האצווה.",
      cbcHe:
        "ב-CBC תעודות-האיכות סוגרות מעגל: אותם ערכי-איכות שנדרשו מהספק (Brix, חומציות) נבדקים שוב במשקה המוגמר ומופקים בתעודה ללקוח — תחקור רציף מחומר-הגלם ועד המדף.",
      navHe: [
        "Quality Management ► Quality Certificates (כלל-הצומת ל-SPRO)",
        "Quality Management ► QM in Logistics ► QM in Procurement (צד נכנס)",
        "Quality Management ► Quality Certificates ► Certificates in Sales and Distribution (צד יוצא)",
      ],
      tables: ["QALS", "QCVK", "QCVM", "QINF"],
      tcodes: ["QC51", "QC55", "QC20", "VL01N"],
      fiori: ["F2225"],
      configHe: [
        "נכנס: QM-Control Key + Certificate processing functions + QINF.",
        "יוצא: Certificate Profile (QC20) + Data Origin + Assignment + Output type.",
        "שניהם נשענים על Inspection Lots (QALS) כמקור-הנתונים.",
      ],
      mistakesHe: [
        "נכנס: Control Key בלי processing — אין דרישת-תעודה בפועל.",
        "יוצא: פרופיל ללא Inspection results — תעודה ריקה.",
        "התעלמות מ-QC51 — אצוות חסומות נשכחות.",
      ],
      troubleshootHe: [
        "תעודה נכנסת לא נדרשת ➔ הפעלת-חצי של QM ברכש.",
        "תעודה יוצאת לא הופקה ➔ פרופיל לא משויך או Output חסר.",
        "תעודה יוצאת ריקה ➔ Origin שגוי או חוסר Inspection results.",
      ],
      bestPracticeHe: [
        "הפעל מנגנונים בזוגות: Control Key+processing; Profile+Assignment+Output.",
        "סרוק QC51 יומית; נטר Output ב-VL71.",
        "הסתמך על Inspection results אמינים כמקור-יחיד לשני הצדדים.",
      ],
      interviewHe: [
        { qHe: "מהו ההבדל המהותי בין תעודה נכנסת ליוצאת?", aHe: "נכנסת = הוכחה שמתקבלת מהספק ונבדקת לפני שימוש; יוצאת = הוכחה שמופקת ונשלחת ללקוח כראיה לעמידה-במפרט." },
        { qHe: "מהן שתי נקודות-הכשל הנפוצות?", aHe: "בנכנס — הפעלת Control Key בלי Certificate processing; ביוצא — היעדר Inspection results או חוסר שיוך-פרופיל." },
        { qHe: "מהו המקור המשותף לשני הצדדים?", aHe: "ה-Inspection Lot (QALS) ותוצאות-הבדיקה — הם מאמתים בנכנס ומזינים את התעודה ביוצא." },
      ],
      takeawaysHe: [
        "תעודות-איכות = שרשרת מקצה-לקצה: ספק ➔ ארגון ➔ לקוח.",
        "נכנס: Control Key + processing + QC51.",
        "יוצא: Certificate Profile (QC20) + Output במשלוח.",
        "Inspection results (QALS) הם המקור המשותף לשניהם.",
      ],
      relatedHe: [
        { labelHe: "QM · תעודות נכנסות (11.1)", href: "/library/qm/chapter-11/#sub-11.1" },
        { labelHe: "QM · תעודות יוצאות (11.2)", href: "/library/qm/chapter-11/#sub-11.2" },
      ],
    },
  ],
};
