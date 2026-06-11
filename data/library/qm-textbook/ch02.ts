// ===== QM Digital Textbook — Chapter 2 (Quality Planning) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Source hierarchy preserved (ids + order); CBC = Coca-Cola bottling QM.
// Transformative Hebrew (no source prose); SAP identifiers verbatim EN.
import type { TextbookChapter } from "./types";

export const CH2: TextbookChapter = {
  n: 2,
  titleHe: "תכנון איכות",
  titleEn: "Quality Planning",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לתכנון-איכות (Quality Planning) ב-SAP QM. תכנון-איכות הוא השלב שבו מגדירים מראש מה נבדוק, איך נבדוק, מתי נבדוק ובאיזה היקף — לפני שמתעוררת בדיקה ראשונה. כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים: שלוש רמות-הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC (מפעל מילוי משקאות Coca-Cola), ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי-קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון-תקלות, שיטות-מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: ללמוד את הנושא ללא הספר המקורי. נתוני-האב המרכזיים: QMAT (Inspection Setup באב-החומר), QPMK/QPMZ (Master Inspection Characteristics), QPAC (Inspection Methods), Q-Info-Record, PLKO/PLPO/PLMK (Inspection Plan), ו-Sampling Procedures.",
  subchapters: [
    // ============================================================ 2.1
    {
      id: "2.1", titleHe: "תצוגת QM באב-החומר", titleEn: "QM View in Material Master",
      execHe:
        "תצוגת ה-QM באב-החומר היא ה'מתג' שמפעיל ניהול-איכות לחומר. בה מגדירים את Inspection Setup — אילו סוגי-בדיקה (Inspection Types) פעילים לחומר, האם נדרש Quality Management בתהליך-הרכש, ומהם פרמטרי-ברירת-המחדל ליצירת מנת-בדיקה (Inspection Lot). ללא תצוגת QM פעילה לא תיווצר אף מנת-בדיקה אוטומטית.",
      beginnerHe:
        "אב-החומר הוא 'כרטיס-הזהות' של כל פריט, מחולק לתצוגות לפי מחלקה. תצוגת ה-Quality Management היא התצוגה של מחלקת-האיכות. כאן מסמנים 'החומר הזה דורש בדיקה', ומפרטים מתי לבדוק — בקבלה מהספק, בייצור, לפני אספקה ללקוח. כל סוג-בדיקה כזה נקרא Inspection Type, ומפעילים אותו בלשונית Inspection Setup.",
      consultantHe:
        "Inspection Setup נשמר בטבלת QMAT (per Material+Plant+Inspection Type). הפעלת תצוגת-QM מחייבת QM-View בנוסף ל-Inspection Setup. שדות-מפתח: QM Control Key (QM in Procurement — חוסם תשלום/קבלה ללא release), Inspection-Type-active, Post to inspection stock, Automatic inspection lot creation, Sample-determination indicators, ו-Certificate type. ב-S/4HANA תצוגת-QM זמינה גם דרך Fiori 'Maintain Material'. שים לב: סימון Inspection Type אינו מספיק — חייב להיות 'active' וסומן 'preferred' לטריגר האוטומטי.",
      purposeHe:
        "להחליט ברמת-החומר מה מנוהל-איכות וכיצד: אילו אירועים (קבלה/ייצור/אספקה) מפעילים בדיקה, האם המלאי נכנס למלאי-מבוקר (Quality Inspection Stock), והאם הרכש כפוף לבקרת-QM. זו נקודת-החיבור בין QM ל-MM ול-PP.",
      processExampleHe:
        "חומר-גלם עם Inspection Type 01 (GR from Purchase Order) פעיל: בכל קבלת-טובין (MIGO) נוצרת אוטומטית מנת-בדיקה, הכמות נכנסת ל-Quality Inspection Stock, ולא ניתן לצרוך אותה עד Usage Decision מאשר.",
      cbcHe:
        "ב-CBC: תרכיז (ROH) — Inspection Type 01 בקבלה + QM in Procurement (חוסם תשלום ללא תעודת-איכות מהספק); משקה מוגמר (FERT) — Inspection Type 04 (בדיקת-ייצור) + 10 (לפני אספקה ללקוח); כל החומרים מנוהלי-אצווה כך שכל Lot מקושר לאצווה.",
      navHe: [
        "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Inspection for Goods Movements ► Define Default Values for Inspection Type (OMRP)",
        "Logistics – General ► Material Master ► Field Selection ► Maintain Field Selection for Data Screens (OMS9)",
        "Quality Management ► Basic Settings ► Maintain Settings at Plant Level",
      ],
      tables: ["QMAT", "MARA", "MARC", "TQ08", "TQ07"],
      tcodes: ["MM01", "MM02", "MM03", "QA08", "MMZ1"],
      fiori: ["F1602A", "F0247"],
      configHe: [
        "Inspection Type defaults (OMRP): לכל Inspection Type — ברירות-מחדל ל-lot creation, sample, stock posting, automatic UD.",
        "QM in Procurement: QM Control Key (per Material) הקובע חסימת-תשלום/קבלה עד release; נדרש גם QM-relevant ב-Purchasing.",
        "Post to Inspection Stock: האם הכמות נכנסת ל-stock category Q (מבוקר).",
        "Inspection-with-task-list / spec: סימון אם הבדיקה דורשת Inspection Plan או Material Specification.",
      ],
      flow: [
        { he: "פתיחת אב-חומר", code: "MM01" },
        { he: "הוספת תצוגת QM", code: "QM View" },
        { he: "הפעלת Inspection Type", code: "QMAT", note: "active + preferred" },
        { he: "QM in Procurement (לחומרי-רכש)", code: "QM Control Key" },
        { he: "אירוע (קבלה/ייצור)", code: "MIGO" },
        { he: "מנת-בדיקה אוטומטית", code: "QA32" },
      ],
      masterDataHe: [
        "QMAT = Inspection Setup per Material+Plant+Inspection Type (active, preferred, sample, stock).",
        "MARC = QM control key, QM-relevant flag ברמת-המפעל.",
        "Inspection Type שכיחים: 01 (GR PO), 04 (Production), 05 (Other GR), 08 (Stock transfer), 09 (Recurring), 10 (Delivery), 89 (Manual).",
      ],
      mistakesHe: [
        "סימון Inspection Type בלי 'active' — אין יצירת-מנה אוטומטית.",
        "שכחת QM in Procurement לחומר-ספק קריטי — קבלה ללא בקרת-איכות.",
        "אי-סימון 'Post to Inspection Stock' — הכמות זמינה לצריכה לפני אישור.",
        "הזנת Inspection Setup ללא Inspection Plan/Spec תואם — מנה נפתחת אך אין מאפיינים לבדיקה.",
      ],
      troubleshootHe: [
        "לא נוצרת מנת-בדיקה בקבלה ➔ בדוק QMAT active + preferred + תצוגת-QM קיימת במפעל.",
        "כמות זמינה לצריכה למרות בדיקה ➔ 'Post to Inspection Stock' לא מסומן.",
        "קבלה חסומה לתשלום ➔ QM in Procurement פעיל — נדרש release/תעודה.",
        "מנה נפתחת בלי מאפיינים ➔ חסר Inspection Plan פעיל או Material Specification.",
      ],
      bestPracticeHe: [
        "הגדר ברירות-מחדל ל-Inspection Type ב-OMRP פעם אחת; אל תזין ידנית לכל חומר.",
        "תקנן מטריצת Material-Type ↔ Inspection-Types (ROH=01, FERT=04+10).",
        "השתמש ב-Mass Maintenance (MM17/QA08) לאכלוס Inspection Setup אחיד.",
        "הקפד שלכל Inspection Type פעיל יהיה מקור-מאפיינים (Plan או Spec).",
      ],
      interviewHe: [
        { qHe: "היכן נשמר ה-Inspection Setup?", aHe: "בטבלת QMAT, ברמת Material+Plant+Inspection Type, יחד עם תצוגת-QM באב-החומר." },
        { qHe: "מה ההבדל בין הפעלת Inspection Type ל-'preferred'?", aHe: "הפעלה (active) מאפשרת בדיקה; 'preferred' קובע איזה Type ייבחר אוטומטית כשמספר Types מתאימים לאותו אירוע." },
        { qHe: "מה עושה QM in Procurement?", aHe: "כופה בקרת-איכות ברכש — דרך QM Control Key חוסם תשלום/קבלה עד release, ויכול לדרוש תעודת-איכות מהספק." },
      ],
      takeawaysHe: [
        "תצוגת-QM = המתג שמפעיל ניהול-איכות לחומר.",
        "Inspection Setup (QMAT) קובע אילו Inspection Types פעילים וכיצד נפתחת המנה.",
        "Inspection Type חייב להיות active ו-preferred לטריגר אוטומטי.",
        "QM in Procurement מחבר את QM לתהליך-הרכש.",
      ],
      relatedHe: [
        { labelHe: "QM · רשומת-מידע איכות (2.8)", href: "/library/qm/chapter-02/#sub-2.8" },
        { labelHe: "QM · תכנית-בדיקה (2.11)", href: "/library/qm/chapter-02/#sub-2.11" },
        { labelHe: "אובייקט · QMAT", href: "/library/qm/object/QMAT/" },
      ],
    },
    // ============================================================ 2.2
    {
      id: "2.2", titleHe: "רשומת-אב", titleEn: "Master Record",
      execHe:
        "רשומות-האב הן הבסיס היציב שעליו נשען כל תהליך-QM: אב-חומר, רשומת-שינוי, שותף-עסקי, אצווה וכלי-ייצור. תכנון-איכות תקין מחייב שכל רשומות-האב הרלוונטיות יהיו פעילות ומקושרות; שגיאה ברשומת-אב מתפשטת לכל מנת-בדיקה ולכל החלטת-שימוש.",
      beginnerHe:
        "לפני שאפשר לבדוק משהו, SAP צריך לדעת על מה מדובר: איזה חומר, מאיזה ספק/לקוח, באיזו אצווה, ובאיזה ציוד נבדוק. כל אחד מהאובייקטים האלה הוא 'רשומת-אב' — מידע קבוע שנשמר פעם אחת ומשמש שוב ושוב. בתת-פרקים הבאים נכיר את רשומות-האב החשובות ל-QM.",
      consultantHe:
        "רשומות-האב ב-QM מתחלקות ל'נתוני-איכות ייעודיים' (MIC, Methods, Sampling, Plans, Catalogs) ול'נתוני-אב לוגיסטיים שה-QM צורך' (Material, BP, Batch, PRT). חלקם מנוהלים בתצוגות-QM של אובייקטים קיימים (תצוגת-QM באב-חומר), וחלקם אובייקטים עצמאיים. ב-S/4HANA הספק/לקוח אוחדו ל-Business Partner — שינוי מהותי מ-ECC שבו היו רשומות-נפרדות LFA1/KNA1.",
      purposeHe:
        "להבטיח מקור-אמת יחיד ועקבי לכל ישות בתהליך-האיכות, כך שכל מנת-בדיקה תוכל להיקשר נכון לחומר, לאצווה, לספק ולציוד-המדידה שלה.",
      processExampleHe:
        "בקבלת תרכיז: המערכת מזהה את אב-החומר (חומר מנוהל-QM), את ה-BP (הספק, שעבורו קיימת Q-Info-Record), יוצרת אצווה חדשה (Batch Master), ופותחת מנת-בדיקה שתבוצע בעזרת PRT (כלי-מדידה מכויל).",
      cbcHe:
        "ב-CBC כל קבלה של תרכיז קושרת ארבע רשומות-אב: אב-החומר (תרכיז), BP (הספק הגלובלי של Coca-Cola), Batch (אצווה למעקב-עד-מדף), ו-PRT (ציוד-מעבדה מכויל ל-Brix/pH).",
      navHe: [
        "Logistics – General ► Business Partner ► Maintain Business Partner (BP)",
        "Logistics – General ► Batch Management ► Define Batch Level and Activate Status Management",
        "Quality Management ► Basic Settings ► Maintain Settings at Plant Level",
      ],
      tables: ["MARA", "MARC", "MCH1", "MCHA", "BUT000", "CRFH"],
      tcodes: ["MM02", "BP", "MSC1N", "QS21"],
      fiori: ["F1602A", "F2086"],
      configHe: [
        "Batch Level (per Material / Plant / Client) — קובע את היקף-ייחודיות מספר-האצווה.",
        "Business Partner roles (FLVN00/FLCU00) — תפקידי-ספק/לקוח על אותו BP.",
        "QM-relevant settings ברמת-המפעל הקובעים אילו רשומות-אב נדרשות.",
      ],
      mistakesHe: [
        "רשומות-אב חלקיות — חומר ללא תצוגת-QM, או ספק ללא Q-Info-Record.",
        "אי-תיאום בין ECC (LFA1/KNA1) ל-S/4 (BP) במהלך-מיגרציה.",
        "אצווה לא-פעילה לחומר שדורש מעקב-אצווה.",
      ],
      troubleshootHe: [
        "מנת-בדיקה לא נקשרת לאצווה ➔ ניהול-אצווה לא פעיל לחומר.",
        "Q-Info לא נמצאת ➔ ה-BP אינו בתפקיד-ספק או חסר במפעל.",
        "PRT לא ניתן לשיוך ➔ הכלי לא הוגדר כ-PRT (CRFH) או לא מכויל.",
      ],
      bestPracticeHe: [
        "הקם תהליך-Onboarding לרשומות-אב המוודא שכל התצוגות מולאו לפני go-live.",
        "סנכרן BP roles בעת-מיגרציה מ-ECC ל-S/4 בקפדנות.",
        "נהל אצוות וכלי-מדידה כחלק בלתי-נפרד מתכנון-האיכות.",
      ],
      interviewHe: [
        { qHe: "אילו רשומות-אב צורך תהליך-QM?", aHe: "אב-חומר (תצוגת-QM), Business Partner (ספק/לקוח), Batch Master, ו-Production Resources/Tools — בנוסף לרשומות-QM הייעודיות (MIC, Methods, Plans)." },
        { qHe: "מה השתנה ברשומת-ספק בין ECC ל-S/4HANA?", aHe: "ב-ECC היו רשומות-נפרדות (LFA1 ספק, KNA1 לקוח); ב-S/4HANA הכל אוחד ל-Business Partner אחד עם תפקידים מרובים." },
      ],
      takeawaysHe: [
        "רשומות-אב = הבסיס היציב של כל תהליך-QM.",
        "ל-QM נתוני-אב ייעודיים + נתוני-אב לוגיסטיים שהוא צורך.",
        "ב-S/4HANA ספק/לקוח אוחדו ל-Business Partner.",
      ],
      relatedHe: [
        { labelHe: "QM · תצוגת QM באב-החומר (2.1)", href: "/library/qm/chapter-02/#sub-2.1" },
        { labelHe: "QM · אצווה (2.2.3)", href: "/library/qm/chapter-02/#sub-2.2.3" },
      ],
      children: [
        {
          id: "2.2.1", titleHe: "שינוי רשומת-אב", titleEn: "Change Master Record",
          execHe: "שינוי רשומת-אב הוא הליך מבוקר של עדכון נתוני-אב קיימים (חומר/ספק/אצווה) תוך שמירת-עקביות מול תהליכי-QM פעילים. שינוי לא-מבוקר עלול לפסול מנות-בדיקה פתוחות או לשבור קישורי-תוכנית.",
          beginnerHe: "לעדכן רשומה קיימת (למשל לשנות Inspection Type פעיל באב-חומר) זה לא כמו ליצור חדשה — צריך לזכור שהשינוי משפיע על תהליכים שכבר רצים. לכן עושים זאת בזהירות, ולעיתים תחת Change Number כדי לתעד מה השתנה ומתי.",
          consultantHe: "שינוי באב-חומר נעשה ב-MM02; שינוי-איכות עשוי להישלט דרך Engineering Change Management (ECM) עם Valid-From. שים לב: שינוי Inspection Setup אינו משפיע רטרואקטיבית על מנות-בדיקה פתוחות, אך משפיע על מנות חדשות. שינוי MIC/Plan מנוהל בנפרד (היסטוריה ב-PLKO/QPMK).",
          purposeHe: "לאפשר תחזוקה שוטפת של נתוני-אב בלי לפגוע בעקביות-הנתונים ובמנות-הבדיקה הפעילות.",
          processExampleHe: "מחליפים ספק-תרכיז: מעדכנים את אב-החומר ו-Q-Info, אך מנות-בדיקה פתוחות לאצוות שכבר התקבלו נשארות ללא-שינוי עד סגירתן.",
          cbcHe: "ב-CBC עדכון-מתכון (שינוי Brix-target) מנוהל דרך Change Number כדי שהמעבדה תדע בדיוק מאיזה תאריך תקף הערך החדש.",
          navHe: ["Logistics – General ► Material Master ► Change ► Immediately (MM02)", "Cross-Application Components ► Engineering Change Management ► Create Change Master (CC01)"],
          tables: ["MARA", "QMAT", "AENR", "CDHDR"],
          tcodes: ["MM02", "CC01", "CC02", "QS22"],
          fiori: ["F1602A"],
          configHe: ["הפעל Change Management היכן שנדרשת היסטוריית-שינויים מבוקרת.", "הגדר Field Selection (OMS9) כדי לחסום שינוי-שדות קריטיים ללא הרשאה."],
          mistakesHe: ["שינוי Inspection Setup וציפייה שישפיע על מנות-פתוחות.", "שינוי ללא Change Number במקום שנדרש תיעוד-רגולטורי."],
          troubleshootHe: ["מנה פתוחה לא משקפת את השינוי ➔ שינוי-Setup חל רק על מנות חדשות.", "לא ניתן לשמור שינוי ➔ Field locked או חסר Change Number."],
          bestPracticeHe: ["תעד שינויי-מתכון/MIC דרך Change Number.", "סקור השפעה על מנות-פתוחות לפני שינוי Inspection Setup."],
          interviewHe: [{ qHe: "האם שינוי Inspection Setup משפיע על מנות-בדיקה פתוחות?", aHe: "לא — השינוי חל רק על מנות חדשות שייווצרו אחריו; מנות פתוחות נשארות לפי ההגדרה בעת-פתיחתן." }],
          takeawaysHe: ["שינוי רשומת-אב = הליך מבוקר עם השפעות-המשך.", "שינויי-Setup אינם רטרואקטיביים.", "Change Number מספק היסטוריה היכן שנדרש."],
        },
        {
          id: "2.2.2", titleHe: "רשומת-אב של שותף-עסקי", titleEn: "Business Partner Master Record",
          execHe: "ה-Business Partner (BP) הוא רשומת-האב המאוחדת לספקים וללקוחות ב-S/4HANA. ב-QM הוא הבסיס ל-Q-Info-Records, להסכמי-איכות ולתעודות-איכות — בלעדיו אין בקרת-איכות ברכש או במכירה.",
          beginnerHe: "ב-S/4HANA כל מי שאנחנו עובדים מולו — ספק או לקוח — הוא 'שותף-עסקי' (BP) אחד, עם 'תפקידים' שונים. עבור QM, ה-BP מחבר את הבדיקות לספק שממנו קנינו ולחומר שהוא סיפק.",
          consultantHe: "BP מנוהל ב-tcode BP, נתונים ב-BUT000 + תפקידים (FLVN00 Vendor, FLCU00 Customer). הקישור ל-QM נעשה דרך Q-Info-Record (per Material+Vendor+Plant) ודרך QM-relevant flag ב-Purchasing Info. ב-ECC זה היה LFA1/LFM1 — ב-S/4 חובה לסנכרן BP↔Vendor/Customer דרך CVI (Customer-Vendor Integration).",
          purposeHe: "לרכז את כל המידע על שותף-עסקי במקום אחד, ולשמש עוגן ל-Q-Info, הסכמי-איכות, וניהול-ספקים מבוסס-איכות (Vendor evaluation by quality).",
          processExampleHe: "ספק-תרכיז מוגדר כ-BP בתפקיד-ספק; נוצרת Q-Info-Record המגדירה שהוא 'released' לחומר זה במפעל זה, וכל קבלה ממנו מקושרת אוטומטית לבדיקה.",
          cbcHe: "ב-CBC הספק הגלובלי של Coca-Cola הוא BP יחיד; Q-Info-Records נפרדות לכל שילוב תרכיז×מפעל, כך שניתן לחסום ספק-חומר ספציפי בלי לפגוע באחרים.",
          navHe: ["Logistics – General ► Business Partner ► Maintain Business Partner (BP)", "Cross-Application Components ► Master Data Synchronization ► Customer/Vendor Integration"],
          tables: ["BUT000", "LFA1", "KNA1", "QINF"],
          tcodes: ["BP", "QI01", "QI02", "QI03"],
          fiori: ["F2086", "F1981"],
          configHe: ["הגדר BP Roles (FLVN00/FLCU00) ומיפוי-Number-Ranges.", "הגדר CVI לסנכרון BP↔LFA1/KNA1.", "סמן QM-relevant ב-Purchasing Info לאכיפת בקרת-QM."],
          mistakesHe: ["BP ללא תפקיד-ספק ➔ אי-אפשר ליצור Q-Info.", "אי-סנכרון CVI במיגרציה ➔ LFA1 ריק והרכש שובר.", "ניהול לקוח כ-BP נפרד מספק כשהם אותה ישות."],
          troubleshootHe: ["Q-Info לא נשמרת ➔ ה-BP אינו בתפקיד-ספק או חסר ב-purchasing org/plant.", "ספק לא מופיע בהזמנת-רכש ➔ סנכרון-CVI כשל."],
          bestPracticeHe: ["נהל ספק ולקוח כ-BP אחד עם תפקידים מרובים היכן שזו אותה ישות.", "ודא סנכרון-CVI מלא לפני go-live.", "קשר תוצאות-QM ל-Vendor Evaluation."],
          interviewHe: [
            { qHe: "מהו תפקיד ה-BP ב-QM?", aHe: "הוא עוגן ל-Q-Info-Records, הסכמי-איכות ותעודות-איכות; מחבר בדיקות לספק/לקוח." },
            { qHe: "כיצד מסונכרן BP ל-Vendor הקלאסי?", aHe: "דרך CVI (Customer-Vendor Integration) הממפה BP ↔ LFA1/KNA1." },
          ],
          takeawaysHe: ["BP = רשומת-אב מאוחדת לספק/לקוח ב-S/4HANA.", "עוגן ל-Q-Info ולהסכמי-איכות.", "CVI מסנכרן BP↔LFA1/KNA1."],
          relatedHe: [{ labelHe: "QM · רשומת-מידע איכות (2.8)", href: "/library/qm/chapter-02/#sub-2.8" }],
        },
        {
          id: "2.2.3", titleHe: "אב-אצווה", titleEn: "Batch Master",
          execHe: "Batch Master מנהל מנה-מזוהה של חומר עם מאפיינים אחידים (תאריך-ייצור, תוקף, ערכי-בדיקה). ב-QM האצווה מקבלת Batch Status (מוגבל/בלתי-מוגבל) שנקבע מתוך Usage Decision — חיבור ישיר בין תוצאות-הבדיקה לזמינות-המלאי.",
          beginnerHe: "אצווה (Batch) היא 'קבוצת-ייצור' של חומר — למשל כל הבקבוקים שמולאו ממיכל-תערובת אחד. לכל אצווה יש מספר ומאפיינים. ה-QM קובע אם האצווה 'תקינה לשימוש' לפי תוצאות-הבדיקה.",
          consultantHe: "טבלאות: MCH1 (Batch), MCHA (Batch per Plant), MCHB (Batch Stock). מאפייני-אצווה מנוהלים דרך Classification (Class type 023). תוצאות-בדיקה יכולות לעדכן מאפייני-אצווה אוטומטית (Results-to-Batch). Usage Decision קובע Batch Status: Unrestricted / Restricted / Blocked. Batch Determination (PP/SD) בוחר אצוות לפי מאפייני-איכות.",
          purposeHe: "לאפשר עקיבות (traceability) מלאה — מהחומר-גלם ועד המוצר-הסופי — ולקשר את סטטוס-זמינות-המלאי לתוצאות-האיכות.",
          processExampleHe: "אצווה של משקה מוגמר נבדקת; תוצאות ה-Brix/pH נכתבות למאפייני-האצווה; Usage Decision A מציב את האצווה ל-Unrestricted ומשחרר אותה לאספקה.",
          cbcHe: "ב-CBC כל אצוות-מילוי נושאת תאריך-ייצור, Best-Before, ו-Brix/pH מהמעבדה כמאפייני-אצווה; אצווה נחסמת אוטומטית אם UD שלילי, ומונעת אספקה ללקוח.",
          navHe: ["Logistics – General ► Batch Management ► Define Batch Level and Activate Status Management", "Logistics – General ► Batch Management ► Batch Valuation ► Update Standard Characteristics"],
          tables: ["MCH1", "MCHA", "MCHB", "AUSP"],
          tcodes: ["MSC1N", "MSC2N", "MSC3N", "QA11"],
          fiori: ["F1981", "F2410"],
          configHe: ["Batch Level (Material/Plant/Client) ו-Status Management — מפעיל Restricted/Unrestricted.", "Class type 023 למאפייני-אצווה; קישור Results-to-Batch בעת UD.", "Batch Determination strategy לבחירת-אצוות לפי איכות."],
          mistakesHe: ["Status Management כבוי ➔ אצוות לא נחסמות אוטומטית מ-UD.", "אי-קישור תוצאות-בדיקה למאפייני-אצווה ➔ אין נראות-איכות באצווה.", "Batch Level שגוי ➔ מספרי-אצווה מתנגשים בין מפעלים."],
          troubleshootHe: ["אצווה לא נחסמת אחרי UD שלילי ➔ Status Management לא פעיל.", "מאפייני-אצווה ריקים ➔ Results-to-Batch לא הוגדר.", "Batch Determination לא מוצא אצווה ➔ מאפיינים לא מולאו או strategy שגוי."],
          bestPracticeHe: ["הפעל Status Management כדי שה-UD ישלוט בזמינות-האצווה.", "קשר MIC קריטיים למאפייני-אצווה לעקיבות.", "תקנן Batch Level ברמת-מפעל לתעשיית-מזון."],
          interviewHe: [
            { qHe: "כיצד קשור Usage Decision ל-Batch Status?", aHe: "ה-UD יכול להציב את האצווה ל-Unrestricted, Restricted או Blocked — וכך לשלוט ישירות בזמינות-המלאי לאספקה/צריכה." },
            { qHe: "מהו Results-to-Batch?", aHe: "מנגנון הכותב ערכי-מדידה ממנת-הבדיקה אל מאפייני-האצווה (Classification), לעקיבות ולבחירת-אצוות." },
          ],
          takeawaysHe: ["אצווה = מנה-מזוהה עם מאפיינים אחידים.", "UD שולט ב-Batch Status וכך בזמינות.", "Results-to-Batch מקשר בדיקה למאפייני-אצווה."],
          relatedHe: [{ labelHe: "QM · החלטת-שימוש (פרק 4)", href: "/library/qm/chapter-04/" }],
        },
        {
          id: "2.2.4", titleHe: "אמצעי-ייצור וכלים (PRT)", titleEn: "Production Resources and Tools",
          execHe: "Production Resources and Tools (PRT) מייצגים ציוד-מדידה וכלים הנדרשים לבדיקה — למשל מד-Brix או pH-meter. ב-QM ה-PRT מקושר לפעולת-הבדיקה ב-Inspection Plan ומבטיח שהבדיקה תבוצע בכלי-מדידה מתאים ומכויל.",
          beginnerHe: "כדי לבדוק איכות צריך מכשירים — מד-סוכר, מד-חומציות, מאזניים. ב-SAP מנהלים אותם כ-PRT (אמצעי-ייצור וכלים) ומקשרים אותם לפעולות-הבדיקה, כך שהבודק יודע באיזה מכשיר להשתמש.",
          consultantHe: "PRT מנוהל ב-CRFH (PRT master), CRVD_A (קישור-מסמך). PRT category: Material, Equipment, Document, או Misc. ב-QM PRT מסוג Equipment מקושר ל-Calibration Inspection (Inspection Type 14) דרך PM — ה-PRT הוא Equipment שדורש כיול-תקופתי. Control Key ב-PRT קובע usage, scheduling ו-confirmation.",
          purposeHe: "להבטיח שבדיקות מבוצעות בציוד-מדידה מתאים, מתועד ומכויל, ולקשר את כיול-הציוד (Calibration) לתהליך-ה-QM.",
          processExampleHe: "פעולת-בדיקת-Brix ב-Inspection Plan מקושרת ל-PRT 'Refractometer-01'; הבודק יודע לאיזה מכשיר ניגש, וה-PM מתזמן כיול-תקופתי דרך Inspection Type 14.",
          cbcHe: "ב-CBC כל מד-Brix ו-pH-meter במעבדה מנוהל כ-PRT/Equipment עם מחזור-כיול; אם המכשיר עבר תאריך-כיול, הבדיקה מסומנת ככלי-לא-מכויל ונחסמת.",
          navHe: ["Production ► Basic Data ► Production Resources/Tools ► General Data", "Quality Management ► Test Equipment Management ► Define Inspection Types for Calibration"],
          tables: ["CRFH", "CRVD_A", "EQUI", "AFFH"],
          tcodes: ["CF01", "CF02", "CF03", "QS21"],
          fiori: ["F4006", "F2336"],
          configHe: ["הגדר PRT Category (Material/Equipment/Document) ו-Control Key.", "קשר PRT מסוג Equipment ל-Calibration Inspection (Inspection Type 14).", "הגדר מחזור-כיול דרך PM Maintenance Plan."],
          mistakesHe: ["שימוש ב-PRT לא-מכויל ➔ תוצאות-בדיקה לא-תקפות.", "PRT לא-מקושר לפעולה ➔ הבודק לא יודע באיזה כלי להשתמש.", "אי-תזמון כיול ➔ ציוד נשחק ללא בקרה."],
          troubleshootHe: ["PRT לא מופיע בפעולה ➔ לא שויך ב-Inspection Plan.", "כיול לא מתוזמן ➔ Inspection Type 14 לא פעיל או חסר Maintenance Plan.", "תוצאות נדחות ➔ הכלי עבר תאריך-כיול."],
          bestPracticeHe: ["נהל ציוד-מדידה כ-PRT/Equipment עם מחזור-כיול אוטומטי.", "קשר כל MIC קריטי ל-PRT מתאים.", "חסום שימוש בציוד שעבר תאריך-כיול."],
          interviewHe: [
            { qHe: "מהו PRT ומה תפקידו ב-QM?", aHe: "Production Resources/Tools — ציוד וכלים; ב-QM הם ציוד-מדידה המקושר לפעולות-הבדיקה ולכיול-תקופתי." },
            { qHe: "כיצד מקושר כיול-ציוד ל-QM?", aHe: "דרך Calibration Inspection (Inspection Type 14) — ה-PRT הוא Equipment שה-PM מתזמן לו בדיקת-כיול תקופתית." },
          ],
          takeawaysHe: ["PRT = ציוד וכלים לבדיקה.", "מקושר לפעולת-בדיקה ב-Inspection Plan.", "Calibration (Type 14) מבטיח כלים מכוילים."],
          relatedHe: [{ labelHe: "QM · ציוד-בדיקה ב-Plan (2.11.4)", href: "/library/qm/chapter-02/#sub-2.11.4" }],
        },
      ],
    },
    // ============================================================ 2.3
    {
      id: "2.3", titleHe: "מתכון-אב או מסלול-ייצור", titleEn: "Master Recipe or Routing",
      execHe:
        "מתכון-אב (Master Recipe, PP-PI) או מסלול-ייצור (Routing, ייצור-בדיד) הם רשימות-המשימות של הייצור — ובהן ניתן לשבץ Inspection Characteristics ישירות בפעולות. כך נולדת בדיקה תוך-תהליכית (In-process inspection) שאינה דורשת Inspection Plan נפרד: הבדיקה משולבת בייצור עצמו.",
      beginnerHe:
        "מתכון/מסלול מתאר 'איך מייצרים' — אילו פעולות, באיזה סדר ובאילו מכונות. ניתן להוסיף בכל פעולה גם 'מה לבדוק' — למשל אחרי הערבוב לבדוק Brix. כך הבדיקה קורית במהלך-הייצור, באותה רשימת-משימות, בלי תכנית-בדיקה נפרדת.",
      consultantHe:
        "מתכון-אב (C201/C202) ומסלול (CA01) חולקים את אותו מבנה-טבלאות כמו Inspection Plan: PLKO (כותרת), PLPO (פעולות), PLMK (מאפייני-בדיקה ברמת-פעולה). שיוך MIC לפעולה ב-PLMK הופך אותה לפעולה-עם-בדיקה. ה-Inspection Lot שנוצר מפק\"ע (Inspection Type 03 ל-PP-PI / 04 לייצור-בדיד) מושך את המאפיינים מהמתכון. Control Key ('QM in process') בפעולה מסמן בדיקה תוך-תהליכית.",
      purposeHe:
        "לשלב בדיקות-איכות במהלך-הייצור עצמו במקום בתכנית-בדיקה נפרדת — חוסך תחזוקה כפולה ומבטיח שהבדיקה מתבצעת בנקודת-התהליך הנכונה.",
      processExampleHe:
        "מתכון-אב למשקה: פעולה 0020 'ערבוב' נושאת MIC ל-Brix ו-pH; בעת המרת ההזמנה-המתוכננת לפק\"ע נוצרת מנת-בדיקה (Type 03) הכוללת את המאפיינים האלה, והבודק מזין תוצאות תוך כדי ייצור.",
      cbcHe:
        "ב-CBC המתכון-אב למשקה משבץ בדיקות תוך-תהליכיות: Brix אחרי-ערבוב, רמת-CO2 אחרי-קרבונציה, נפח-מילוי אחרי-מילוי — הכל בתוך פעולות-המתכון, ללא Inspection Plan נפרד.",
      navHe: [
        "Production Planning for Process Industries ► Master Recipes ► Define Recipe Group / Profile",
        "Production ► Basic Data ► Routing ► Control Data ► Define Control Keys (Inspection-relevant)",
        "Quality Management ► Quality Planning ► Inspection Planning ► General",
      ],
      tables: ["PLKO", "PLPO", "PLMK", "PLAS", "MAPL"],
      tcodes: ["C201", "C202", "C203", "CA01", "CA02"],
      fiori: ["F1421", "F3318"],
      configHe: [
        "Control Key עם 'QM in process' מסמן פעולה כבדיקה תוך-תהליכית.",
        "שיוך MIC לפעולה (PLMK) — אותו מנגנון כמו ב-Inspection Plan.",
        "Inspection Type 03 (PP-PI) / 04 (Discrete) מושך מאפיינים מהמתכון/מסלול.",
      ],
      flow: [
        { he: "מתכון/מסלול", code: "C201/CA01" },
        { he: "פעולה + Control Key QM", code: "PLPO" },
        { he: "שיוך MIC לפעולה", code: "PLMK" },
        { he: "המרת פק\"ע", code: "Inspection Type 03/04" },
        { he: "מנת-בדיקה תוך-תהליכית", code: "QA32" },
      ],
      masterDataHe: [
        "PLKO = כותרת הרשימה (Group/Counter/Usage/Status).",
        "PLPO = פעולות; PLMK = מאפייני-בדיקה ברמת-פעולה.",
        "MAPL = שיוך הרשימה לחומר.",
      ],
      mistakesHe: [
        "תחזוקת בדיקות גם במתכון וגם ב-Inspection Plan נפרד ➔ כפילות וסתירה.",
        "Control Key ללא 'QM in process' ➔ הפעולה לא יוצרת מאפייני-בדיקה.",
        "MIC משויך לפעולה ללא Sampling Procedure ➔ אין היקף-דגימה.",
      ],
      troubleshootHe: [
        "מנת-בדיקה מפק\"ע ללא מאפיינים ➔ MIC לא שויך ב-PLMK של המתכון.",
        "בדיקה תוך-תהליכית לא נוצרת ➔ Control Key ללא QM-relevance.",
        "כפילות-מאפיינים ➔ קיים גם Inspection Plan וגם מתכון לאותו חומר.",
      ],
      bestPracticeHe: [
        "שלב בדיקות תוך-תהליכיות במתכון; שמור Inspection Plan נפרד רק לבדיקות-קבלה/אספקה.",
        "אל תתחזק את אותה בדיקה בשני מקומות.",
        "השתמש ב-Reference Operation Set לבדיקות-חוזרות בין מתכונים.",
      ],
      interviewHe: [
        { qHe: "כיצד משלבים בדיקה בייצור ללא Inspection Plan?", aHe: "משייכים MIC לפעולה במתכון/מסלול (PLMK) ומסמנים Control Key 'QM in process'; הפק\"ע יוצרת מנת-בדיקה מסוג 03/04 עם אותם מאפיינים." },
        { qHe: "מה משותף למתכון-אב ול-Inspection Plan?", aHe: "אותו מבנה-טבלאות — PLKO/PLPO/PLMK — מה שמאפשר שיבוץ-מאפיינים בשניהם." },
      ],
      takeawaysHe: [
        "מתכון/מסלול יכולים לשאת בדיקות תוך-תהליכיות.",
        "אותו מבנה PLKO/PLPO/PLMK כמו Inspection Plan.",
        "Control Key 'QM in process' + Inspection Type 03/04 הם הטריגר.",
      ],
      relatedHe: [
        { labelHe: "QM · תכנית-בדיקה (2.11)", href: "/library/qm/chapter-02/#sub-2.11" },
        { labelHe: "QM · קבוצת-פעולות יחוס (2.4)", href: "/library/qm/chapter-02/#sub-2.4" },
        { labelHe: "אובייקט · PLPO", href: "/library/qm/object/PLPO/" },
      ],
    },
    // ============================================================ 2.4
    {
      id: "2.4", titleHe: "קבוצת-פעולות יחוס", titleEn: "Reference Operation Set",
      execHe:
        "Reference Operation Set הוא תבנית של פעולות (וכן מאפייני-בדיקה) שניתן לשלב שוב ושוב בתכניות-בדיקה ובמסלולים שונים. הוא מקטין כפילות-תחזוקה: מגדירים בלוק-בדיקות פעם אחת ומשתמשים בו בכל תכנית שזקוקה לאותו רצף.",
      beginnerHe:
        "אם אותו רצף-בדיקות חוזר בהרבה מוצרים — למשל 'בדיקת-מיקרוביולוגיה' זהה לכל המשקאות — אפשר להגדיר אותו פעם אחת כ'קבוצת-פעולות-יחוס' ולשבץ אותו בכל תכנית-בדיקה. שינוי במקור-אחד מתעדכן בכל מי שמפנה אליו.",
      consultantHe:
        "Reference Operation Set מנוהל ב-CA11 (task list type S). מבנה: PLKO/PLPO/PLMK עם Usage מתאים. ב-Inspection Plan/Routing מפנים אליו דרך Reference במקום להעתיק פעולות. ב-QM שכיח לבנות Reference Set של MICs סטנדרטיים (מיקרוביולוגיה/אריזה) ולשבצו בתכניות. שינוי ב-Reference מתפשט לכל הצרכנים (date-effective).",
      purposeHe:
        "לתחזק רצפי-בדיקה משותפים במקום-אחד, להפחית שגיאות ולהבטיח עקביות בין מוצרים שחולקים בדיקות זהות.",
      processExampleHe:
        "Reference Operation Set 'MICRO-STD' מכיל 5 בדיקות-מיקרוביולוגיה; כל Inspection Plan של משקה מפנה אליו במקום לשכפל; עדכון-תקן-מיקרוביולוגי נעשה פעם-אחת ומתעדכן בכל המשקאות.",
      cbcHe:
        "ב-CBC קבוצת-יחוס 'BOTTLE-INSPECT' מאגדת בדיקות-אריזה (אטימות-פקק, נפח, תווית) המשותפות לכל קווי-המילוי; כל תכנית-בדיקה מפנה אליה, וכך שינוי-תקן-אריזה מטופל במקום-אחד.",
      navHe: [
        "Production ► Basic Data ► Routing ► Reference Operation Set",
        "Quality Management ► Quality Planning ► Inspection Planning ► General ► Define Task List Usage",
      ],
      tables: ["PLKO", "PLPO", "PLMK", "PLAS"],
      tcodes: ["CA11", "CA12", "CA13", "QP01"],
      fiori: ["F1421"],
      configHe: [
        "Task list type S = Reference Operation Set.",
        "הגדר Usage מתאים כדי לאפשר הפניה מ-Inspection Plan/Routing.",
        "שייך MICs לפעולות ה-Reference Set פעם-אחת.",
      ],
      flow: [
        { he: "יצירת Reference Set", code: "CA11", note: "type S" },
        { he: "הוספת פעולות + MICs", code: "PLPO/PLMK" },
        { he: "הפניה מתכנית-בדיקה", code: "QP01 Reference" },
        { he: "עדכון מרכזי מתפשט", code: "date-effective" },
      ],
      mistakesHe: [
        "העתקת-פעולות במקום הפניה ➔ מאבדים את יתרון-העדכון-המרכזי.",
        "Usage לא-תואם ➔ אי-אפשר להפנות מתכנית-הבדיקה.",
        "שינוי ב-Reference בלי לבדוק את כל הצרכנים ➔ השפעה לא-צפויה.",
      ],
      troubleshootHe: [
        "לא ניתן להפנות ל-Reference Set ➔ Usage שגוי או task list type לא-מתאים.",
        "עדכון לא מתפשט ➔ הפעולות הועתקו במקום הופנו.",
      ],
      bestPracticeHe: [
        "השתמש ב-Reference Set לכל רצף-בדיקות חוזר.",
        "תעד אילו תכניות מפנות לכל Reference לפני שינוי.",
        "שמור על Usage עקבי בין Reference לתכניות-הצרכניות.",
      ],
      interviewHe: [
        { qHe: "מהו Reference Operation Set?", aHe: "תבנית של פעולות ומאפיינים (task list type S) שניתן להפנות אליה ממסלולים/תכניות-בדיקה במקום לשכפל פעולות." },
        { qHe: "מה היתרון על-פני העתקת-פעולות?", aHe: "עדכון מרכזי — שינוי ב-Reference מתפשט אוטומטית לכל הצרכנים, בלי תחזוקה כפולה." },
      ],
      takeawaysHe: [
        "Reference Operation Set = תבנית-פעולות לשימוש-חוזר (type S).",
        "מפנים אליו במקום לשכפל.",
        "עדכון מרכזי מבטיח עקביות בין מוצרים.",
      ],
      relatedHe: [
        { labelHe: "QM · תכנית-בדיקה (2.11)", href: "/library/qm/chapter-02/#sub-2.11" },
        { labelHe: "QM · מתכון-אב/מסלול (2.3)", href: "/library/qm/chapter-02/#sub-2.3" },
      ],
    },
    // ============================================================ 2.5
    {
      id: "2.5", titleHe: "מרכז-עבודה", titleEn: "Work Center",
      execHe:
        "מרכז-העבודה ב-QM מייצג את היחידה המבצעת — מעבדה, תחנת-בדיקה או קו — שאליה משויכות פעולות-הבדיקה. הוא קובע היכן מתבצעת הבדיקה, מי אחראי, וכיצד נרשם זמן-הבדיקה לצורכי-עלות וקיבולת. בלעדיו אין למנת-הבדיקה 'כתובת' ביצועית.",
      beginnerHe:
        "מרכז-עבודה הוא 'המקום שבו מבצעים את הבדיקה' — בדרך-כלל המעבדה או תחנת-QA. כל פעולת-בדיקה בתכנית מצביעה על מרכז-עבודה, כדי שיהיה ברור מי מבצע, היכן, וכמה זמן זה לוקח.",
      consultantHe:
        "מרכז-עבודה (CR01) מסוג Quality category (work center category לבדיקה) נשמר ב-CRHD; שיוך-עלות ב-CRCO. ב-QM הוא לרוב ללא תכנון-קיבולת (בדיקה לא 'תופסת' קו-ייצור), אך נושא Cost Center/Activity Type לרישום-זמן-בדיקה. פעולת-הבדיקה ב-PLPO מצביעה על מרכז-העבודה דרך ARBPL. Control Key קובע אם נדרש confirmation של זמן-בדיקה.",
      purposeHe:
        "לשייך כל פעולת-בדיקה ליחידה-מבצעת מזוהה, לאפשר רישום-זמן ועלות-בדיקה, ולנהל אחריות-ביצועית (מי בודק מה).",
      processExampleHe:
        "פעולת-בדיקת-מעבדה מצביעה על מרכז-העבודה 'LAB-01'; בעת אישור-הבדיקה נרשם זמן-העבודה כנגד Activity Type של המעבדה, ועלות-הבדיקה מצטברת ל-Cost Center המתאים.",
      cbcHe:
        "ב-CBC המעבדה המרכזית = מרכז-עבודה 'QA-LAB'; תחנות-בדיקה בקו-המילוי = מרכזי-עבודה נפרדים; כל פעולת-בדיקה משויכת למרכז הרלוונטי, כך שעלויות-QA מנותחות לפי-תחנה.",
      navHe: [
        "Production ► Basic Data ► Work Center ► General Data ► Define Work Center Category (OP40)",
        "Quality Management ► Quality Planning ► Inspection Planning ► Operation ► Assign Work Center",
      ],
      tables: ["CRHD", "CRCO", "CRTX", "PLPO"],
      tcodes: ["CR01", "CR02", "CR03", "CRQ1"],
      fiori: ["F2336", "F4006"],
      configHe: [
        "Work Center Category (OP40): קטגוריה לבדיקה/מעבדה.",
        "שיוך Cost Center + Activity Type (CRCO) לרישום-זמן-בדיקה.",
        "Control Key הקובע אם נדרש confirmation לפעולת-הבדיקה.",
      ],
      masterDataHe: [
        "CRHD = כותרת מרכז-העבודה (ARBPL).",
        "CRCO = שיוך-עלות (Cost Center + Activity Types).",
        "פעולת-הבדיקה ב-PLPO מצביעה על ARBPL.",
      ],
      mistakesHe: [
        "פעולת-בדיקה ללא מרכז-עבודה ➔ אין כתובת-ביצוע ולא ניתן לאשר.",
        "מרכז-עבודה ללא Cost Center ➔ אין רישום-עלות-בדיקה.",
        "שימוש בקטגוריה לא-מתאימה ➔ דרישת-קיבולת מיותרת על קו-הייצור.",
      ],
      troubleshootHe: [
        "לא ניתן לאשר פעולת-בדיקה ➔ חסר מרכז-עבודה או Control Key ללא confirmation.",
        "עלות-בדיקה לא נרשמת ➔ Cost Center/Activity Type לא שויכו.",
      ],
      bestPracticeHe: [
        "הגדר מרכזי-עבודה ייעודיים ל-QA (מעבדה/תחנות) בקטגוריה מתאימה.",
        "שייך Cost Center לכל מרכז-בדיקה לניתוח-עלויות-איכות.",
        "הימנע מתכנון-קיבולת למרכזי-בדיקה אלא אם נדרש.",
      ],
      interviewHe: [
        { qHe: "מה תפקיד מרכז-העבודה ב-QM?", aHe: "הוא היחידה-המבצעת שאליה משויכת פעולת-הבדיקה — קובע היכן בודקים, מי אחראי, ומאפשר רישום-זמן ועלות-בדיקה." },
        { qHe: "האם מרכז-בדיקה דורש תכנון-קיבולת?", aHe: "לרוב לא — בדיקה אינה תופסת קו-ייצור; אך הוא נושא Cost Center/Activity Type לרישום-עלות." },
      ],
      takeawaysHe: [
        "מרכז-עבודה = הכתובת-המבצעת של פעולת-הבדיקה.",
        "נושא Cost Center/Activity Type לעלות-בדיקה.",
        "פעולה ב-PLPO מצביעה עליו דרך ARBPL.",
      ],
      relatedHe: [
        { labelHe: "QM · תצוגת פעולות ב-Plan (2.11.5)", href: "/library/qm/chapter-02/#sub-2.11.5" },
        { labelHe: "אובייקט · CRHD", href: "/library/qm/object/CRHD/" },
      ],
    },
    // ============================================================ 2.6
    {
      id: "2.6", titleHe: "שיטת-בדיקה", titleEn: "Inspection Method",
      execHe:
        "Inspection Method (QS21) מתעדת כיצד מבצעים בדיקה — נוהל, תקן, הוראת-עבודה — ומשויכת למאפייני-בדיקה (MIC). היא מבטיחה שכל בודק מבצע את אותה בדיקה באותה שיטה מתועדת, ומאפשרת ניהול-מרכזי ועדכון של נהלי-בדיקה.",
      beginnerHe:
        "שיטת-בדיקה היא 'הוראת-ההפעלה' של איך לבדוק — למשל 'מדידת-Brix לפי תקן ISO באמצעות רפרקטומטר'. מגדירים אותה פעם-אחת ב-QS21 ומקשרים למאפיינים שמשתמשים בה, כך שכל בודק עובד לפי אותו נוהל.",
      consultantHe:
        "Inspection Method נשמרת ב-QPAC (per Plant), עם תיאור, גרסה, status (released), וקישור אופציונלי ל-Class/Document (DMS). היא משויכת ל-MIC (QPMK) ומתפשטת משם לתכניות-הבדיקה. ניהול-גרסאות ו-status מאפשר תוקף-עדכון. ב-QS21 ניתן לקשר טקסט-ארוך והפניה לתקן חיצוני.",
      purposeHe:
        "לתקנן ולתעד את 'איך בודקים' במקום-מרכזי, להבטיח חזרתיות, ולאפשר ביקורת/רגולציה (חשוב בתעשיית-מזון ותרופות).",
      processExampleHe:
        "Inspection Method 'BRIX-ISO' מתועדת ב-QS21, משויכת ל-MIC 'Brix'; כל תכנית-בדיקה המשתמשת ב-MIC זה יורשת אוטומטית את השיטה, והבודק רואה את הנוהל המדויק.",
      cbcHe:
        "ב-CBC כל פרמטר-מעבדה (Brix, pH, CO2, מיקרוביולוגיה) מקושר ל-Inspection Method מתועדת התואמת לתקן-Coca-Cola הגלובלי; שינוי-נוהל מתבצע בשיטה במקום-אחד ומתפשט לכל המוצרים.",
      navHe: [
        "Quality Management ► Quality Planning ► Basic Data ► Inspection Method ► Define Inspection Method",
        "Quality Management ► Quality Planning ► Basic Data ► Inspection Method ► Assign to Master Inspection Characteristic",
      ],
      tables: ["QPAC", "QPACT", "QPMK", "TQ27"],
      tcodes: ["QS21", "QS22", "QS23", "QS24", "QS25"],
      fiori: ["F2410"],
      configHe: [
        "Inspection Method (QS21): plant, key, version, status, טקסט-ארוך והפניה לתקן.",
        "שיוך Method ל-MIC (QPMK) — מתפשט לתכניות-הבדיקה.",
        "ניהול-status (released) ו-versions לתוקף-עדכון.",
      ],
      flow: [
        { he: "יצירת שיטה", code: "QS21" },
        { he: "release", code: "status" },
        { he: "שיוך ל-MIC", code: "QPMK" },
        { he: "ירושה לתכנית-בדיקה", code: "QP01" },
      ],
      mistakesHe: [
        "שיטה ב-status לא-released ➔ לא ניתן לשייך ל-MIC.",
        "כתיבת-הנוהל בטקסט-חופשי בכל MIC במקום Inspection Method מרכזית.",
        "אי-ניהול-גרסאות ➔ אי-בהירות איזה נוהל תקף.",
      ],
      troubleshootHe: [
        "לא ניתן לשייך שיטה ל-MIC ➔ השיטה לא-released או במפעל שגוי.",
        "בודק לא רואה נוהל ➔ ה-MIC לא קושר ל-Inspection Method.",
      ],
      bestPracticeHe: [
        "נהל כל נוהל-בדיקה כ-Inspection Method מרכזית עם status ו-version.",
        "קשר שיטות לתקנים חיצוניים דרך DMS.",
        "השתמש בשיטה אחת המשותפת לכל ה-MICs הזהים.",
      ],
      interviewHe: [
        { qHe: "מהי Inspection Method ולמה היא חשובה?", aHe: "תיעוד-מרכזי של 'איך בודקים' (QS21) המשויך ל-MIC; מבטיח חזרתיות, תקינות ויכולת-ביקורת." },
        { qHe: "כיצד שיטה מגיעה לתכנית-הבדיקה?", aHe: "משייכים אותה ל-MIC (QPMK); כל תכנית המשתמשת באותו MIC יורשת את השיטה אוטומטית." },
      ],
      takeawaysHe: [
        "Inspection Method = 'איך בודקים', מתועד מרכזית (QS21).",
        "משויכת ל-MIC ומתפשטת לתכניות.",
        "status + version מבטיחים נוהל-תקף יחיד.",
      ],
      relatedHe: [
        { labelHe: "QM · מאפייני-בדיקת-אב (2.9)", href: "/library/qm/chapter-02/#sub-2.9" },
        { labelHe: "אובייקט · QPAC", href: "/library/qm/object/QPAC/" },
      ],
    },
    // ============================================================ 2.7
    {
      id: "2.7", titleHe: "הסכמי-איכות", titleEn: "Quality Agreements",
      execHe:
        "הסכמי-איכות מעגנים את ציפיות-האיכות בין הארגון לספקיו וללקוחותיו — אילו תקנים, אילו תעודות, ואילו תנאי-אספקה טכניים. ב-QM הם הבסיס המסחרי-משפטי לבקרת-איכות ברכש ובמכירה, ומיושמים תפעולית דרך Q-Info-Records ותעודות-איכות.",
      beginnerHe:
        "הסכם-איכות הוא 'מה הבטחנו זה לזה לגבי איכות' — למול הספק (מה הוא חייב לספק) ומול הלקוח (מה אנחנו מתחייבים לספק). ה-QM מתרגם את ההסכמים האלה לבקרות-מעשיות במערכת.",
      consultantHe:
        "הסכמי-איכות אינם אובייקט-SAP יחיד אלא משפחת-מנגנונים: QM in Procurement + Q-Info-Record (ספק), Quality Certificates (QC) בקבלה ובאספקה, ו-Technical Delivery Terms. ב-S/4 הם מעוגנים ב-BP ובחוזי-רכש/מכירה. ניהול-ספקים מבוסס-איכות (Vendor Evaluation) ניזון מתוצאות-הבדיקה. תעודות מנוהלות ב-Certificate Profile (QC01).",
      purposeHe:
        "להגדיר ולאכוף ציפיות-איכות חוזיות מול שותפים — לצמצם סיכון, להבטיח תעודות, ולבסס אחריות-איכות לאורך שרשרת-האספקה.",
      processExampleHe:
        "הסכם עם ספק-תרכיז דורש תעודת-COA לכל משלוח; QM in Procurement חוסם תשלום עד קבלת-התעודה; אי-עמידה בהסכם מורידה את דירוג-הספק ב-Vendor Evaluation.",
      cbcHe:
        "ב-CBC הסכם-האיכות עם ספק-התרכיז כולל COA חובה ל-Brix/מיקרוביולוגיה; מול רשתות-לקוחות יש Technical Delivery Terms המגדירים נפח-מילוי וטווחי-pH מותרים לכל אצווה מסופקת.",
      navHe: [
        "Quality Management ► QM in Logistics ► QM in Procurement ► Define Control Keys",
        "Quality Management ► Quality Certificates ► Outgoing Certificates ► Define Certificate Profiles",
      ],
      tables: ["QINF", "BUT000", "EKPO", "QCVK"],
      tcodes: ["QI01", "QC01", "ME11", "QS51"],
      fiori: ["F1981", "F2410"],
      configHe: [
        "QM Control Keys ל-QM in Procurement (חסימת-תשלום/קבלה).",
        "Certificate Profile (QC01) — אילו מאפיינים מופיעים בתעודה.",
        "קישור הסכם לחוזה-רכש/מכירה ול-BP.",
      ],
      mistakesHe: [
        "הסכם-איכות בנייר ללא תרגום למנגנון-SAP ➔ לא נאכף.",
        "אי-הגדרת Certificate Profile ➔ לא ניתן להפיק תעודות.",
        "אי-קישור תוצאות ל-Vendor Evaluation ➔ אין השלכה על דירוג-הספק.",
      ],
      troubleshootHe: [
        "תעודה לא מופקת ➔ Certificate Profile חסר או לא-משויך.",
        "תשלום לא נחסם למרות הסכם ➔ QM in Procurement לא פעיל.",
        "דירוג-ספק לא משתנה ➔ תוצאות-QM לא מוזנות ל-Vendor Evaluation.",
      ],
      bestPracticeHe: [
        "תרגם כל הסכם-איכות למנגנון-SAP מעשי (Q-Info/QC/TDT).",
        "חבר תוצאות-QM ל-Vendor Evaluation לאכיפה אוטומטית.",
        "נהל Certificate Profiles סטנדרטיים לפי סוג-מוצר.",
      ],
      interviewHe: [
        { qHe: "כיצד נאכף הסכם-איכות עם ספק ב-SAP?", aHe: "דרך QM in Procurement + Q-Info-Record (release/חסימה), דרישת COA, ותעודות; אי-עמידה משפיעה על Vendor Evaluation." },
        { qHe: "מהו Certificate Profile?", aHe: "הגדרה (QC01) הקובעת אילו מאפיינים ונתונים יופיעו בתעודת-האיכות המופקת." },
      ],
      takeawaysHe: [
        "הסכמי-איכות = ציפיות-איכות חוזיות מול ספק/לקוח.",
        "מיושמים דרך Q-Info, תעודות ו-Technical Delivery Terms.",
        "תוצאות-QM ניזונות ל-Vendor Evaluation.",
      ],
      relatedHe: [
        { labelHe: "QM · רשומת-מידע איכות (2.8)", href: "/library/qm/chapter-02/#sub-2.8" },
      ],
      children: [
        {
          id: "2.7.1", titleHe: "הסכם-QA עם ספקים", titleEn: "QA Agreement with Suppliers",
          execHe: "הסכם-QA עם ספק מגדיר את התחייבויות-האיכות של הספק — תקנים, תעודות (COA), ובקרות-קבלה — ומיושם דרך QM in Procurement ו-Q-Info-Record. הוא מבטיח שרק חומר-עומד-בתקן ייכנס למפעל.",
          beginnerHe: "כשקונים חומר מספק, מסכמים מראש מה הוא חייב לספק מבחינת-איכות: באיזה תקן, עם איזו תעודה, ומה ייבדק בקבלה. ה-SAP אוכף זאת — בלי תעודה/release לא משלמים ולא משחררים את החומר.",
          consultantHe: "המנגנונים: QM Control Key (per Material) שמפעיל QM in Procurement; Q-Info-Record (QI01) ברמת Material+Vendor+Plant הקובעת release/block, source-inspection, ו-certificate requirement. חסימת-תשלום (Blocked for payment) עד UD/release. תוצאות-קבלה מזינות Vendor Evaluation (quality score).",
          purposeHe: "להבטיח איכות-נכנסת, להעביר אחריות-איכות לספק, ולספק בסיס-נתונים להערכת-ספקים.",
          processExampleHe: "ספק-תרכיז ב-Q-Info release; קבלה (Type 01) פותחת מנת-בדיקה; ללא UD חיובי + COA — התשלום חסום והחומר ב-Quality Stock.",
          cbcHe: "ב-CBC הסכם עם ספק-התרכיז מחייב COA ל-Brix/מיקרוביולוגיה לכל אצווה; Q-Info חוסמת קבלה מספק שאינו released, ותוצאות-קבלה מזינות את דירוג-הספק.",
          navHe: ["Quality Management ► QM in Logistics ► QM in Procurement ► Define Control Keys", "Quality Management ► QM in Logistics ► QM in Procurement ► Quality Info Record"],
          tables: ["QINF", "EINA", "EORD", "LFA1"],
          tcodes: ["QI01", "QI02", "ME11", "MIGO"],
          fiori: ["F1981"],
          configHe: ["QM Control Key (per Material) להפעלת QM in Procurement וחסימת-תשלום.", "Q-Info-Record per Material+Vendor+Plant: release status, certificate, source inspection.", "קישור תוצאות-קבלה ל-Vendor Evaluation."],
          mistakesHe: ["Q-Info חסרה ➔ קבלה ללא בקרת-ספק.", "QM Control Key ללא חסימת-תשלום ➔ משלמים לפני אישור.", "אי-דרישת COA לחומר קריטי."],
          troubleshootHe: ["קבלה מספק נחסמת ➔ ה-Vendor אינו released ב-Q-Info.", "תשלום עובר ללא בדיקה ➔ QM Control Key ללא 'block invoice'."],
          bestPracticeHe: ["דרוש COA לחומרים קריטיים.", "נהל release-status ספק-חומר ב-Q-Info.", "חבר תוצאות-קבלה ל-Vendor Evaluation."],
          interviewHe: [{ qHe: "כיצד חוסמים תשלום לספק עד אישור-איכות?", aHe: "QM Control Key המפעיל 'block for payment'; התשלום משוחרר רק לאחר UD חיובי / release ב-Q-Info." }],
          takeawaysHe: ["הסכם-ספק = איכות-נכנסת מובטחת.", "Q-Info שולטת ב-release/block ספק-חומר.", "תוצאות-קבלה מזינות Vendor Evaluation."],
          relatedHe: [{ labelHe: "QM · רשומת-מידע איכות (2.8)", href: "/library/qm/chapter-02/#sub-2.8" }],
        },
        {
          id: "2.7.2", titleHe: "הסכמי-QA עם לקוחות", titleEn: "QA Agreements with Customers",
          execHe: "הסכם-QA עם לקוח מגדיר את התחייבויות-האיכות שלנו כלפיו — אילו מאפיינים מובטחים ואילו תעודות מלוות כל משלוח. הוא מיושם דרך Inspection Type 10 (לפני-אספקה) ו-Outgoing Quality Certificates.",
          beginnerHe: "כשמוכרים ללקוח, מתחייבים על איכות מסוימת — למשל נפח-מילוי וטווחי-Brix. ה-SAP בודק את האצווה לפני-אספקה (Type 10) ומפיק ללקוח תעודה המוכיחה עמידה בהתחייבות.",
          consultantHe: "המנגנונים: Inspection Type 10 (delivery-related) הפותח מנת-בדיקה בעת-אספקה; Outgoing Certificate Profile (QC01) המגדיר אילו מאפיינים מופיעים בתעודה; קישור ל-Sales contract. ניתן לחסום אספקה (delivery block) עד UD חיובי. Certificate נשלח עם Delivery (VL01N) או כ-batch certificate.",
          purposeHe: "להבטיח שרק מוצר-עומד-בהתחייבות יוצא ללקוח, ולספק הוכחת-איכות מתועדת (תעודה) המלווה את המשלוח.",
          processExampleHe: "הזמנת-לקוח לאצוות-משקה; Inspection Type 10 פותח בדיקת-אספקה; UD חיובי מאפשר אספקה, ותעודת-COA מופקת אוטומטית עם ה-Delivery.",
          cbcHe: "ב-CBC רשתות-לקוחות דורשות COA לכל משלוח עם Brix/pH/נפח; Inspection Type 10 חוסם אספקה עד אישור, והתעודה נוצרת אוטומטית מ-Certificate Profile.",
          navHe: ["Quality Management ► Quality Certificates ► Outgoing Certificates ► Define Certificate Profiles", "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Inspection for Deliveries"],
          tables: ["QCVK", "QCVM", "LIKP", "QALS"],
          tcodes: ["QC01", "QC02", "VL01N", "QA32"],
          fiori: ["F2410"],
          configHe: ["Inspection Type 10 (delivery) — מנת-בדיקה בעת-אספקה.", "Outgoing Certificate Profile (QC01) — מאפיינים בתעודה.", "Delivery block עד UD חיובי."],
          mistakesHe: ["אי-הפעלת Type 10 ➔ אין בדיקת-אספקה.", "Certificate Profile לא-מותאם למחויבות-הלקוח.", "אספקה ללא UD ➔ מוצר לא-מאושר יוצא."],
          troubleshootHe: ["תעודה לא מצורפת ל-Delivery ➔ Certificate Profile לא-משויך לחומר/לקוח.", "אספקה לא נחסמת ➔ Type 10 לא פעיל או ללא delivery-block."],
          bestPracticeHe: ["התאם Certificate Profile למחויבות-הלקוח.", "חסום אספקה עד UD חיובי.", "השתמש ב-batch certificate לעקיבות-אצווה."],
          interviewHe: [{ qHe: "כיצד מבטיחים שרק מוצר-מאושר יוצא ללקוח?", aHe: "Inspection Type 10 פותח בדיקת-אספקה עם delivery-block; אספקה משוחררת רק לאחר UD חיובי, ותעודה מצורפת מ-Certificate Profile." }],
          takeawaysHe: ["הסכם-לקוח = איכות-יוצאת מובטחת.", "Type 10 בודק לפני-אספקה.", "Outgoing Certificate מוכיח עמידה."],
          relatedHe: [{ labelHe: "QM · הסכם-ספק (2.7.1)", href: "/library/qm/chapter-02/#sub-2.7.1" }],
        },
        {
          id: "2.7.3", titleHe: "תנאי-אספקה טכניים עם לקוחות", titleEn: "Technical Delivery Terms with Customers",
          execHe: "Technical Delivery Terms (TDT) הם המפרט-הטכני המוסכם עם הלקוח — טווחי-ערכים, תקנים ושיטות-בדיקה שהמוצר חייב לעמוד בהם באספקה. הם הבסיס למאפייני-הבדיקה של Inspection Type 10 ולתוכן-התעודה.",
          beginnerHe: "תנאי-אספקה-טכניים הם 'המפרט' — בדיוק אילו ערכים המוצר חייב לעמוד בהם כשהוא מגיע ללקוח (למשל Brix בין 10.0 ל-10.5). הם מתורגמים למאפייני-בדיקה ולתעודה.",
          consultantHe: "TDT מתורגמים ל-MICs עם spec-limits בתכנית-הבדיקה של Type 10, או ל-Material Specification per customer. ניתן לנהל ספציפיקציה-ללקוח דרך Q-Info (SD) או דרך מאפיינים-תלויי-לקוח. התעודה (QC) משקפת בדיוק את ה-TDT שהוסכם.",
          purposeHe: "לעגן את המפרט-הטכני המדויק שהלקוח דורש, ולוודא שהבדיקה והתעודה תואמות בדיוק את ההתחייבות.",
          processExampleHe: "לקוח דורש Brix 10.0–10.5; ה-TDT מתורגם ל-MIC עם spec-limits אלו ב-Plan של Type 10; אצווה מחוץ-לטווח נכשלת ב-UD ולא מסופקת.",
          cbcHe: "ב-CBC רשת-לקוחות גדולה דורשת TDT ייחודי (נפח 330מ\"ל ±2%, pH 2.4–2.8); הספציפיקציה הזו מנוהלת ללקוח ומיושמת בבדיקת-אספקה ובתעודה.",
          navHe: ["Quality Management ► Quality Planning ► Logistics Master Data ► Material Specification", "Quality Management ► Quality Certificates ► Outgoing Certificates"],
          tables: ["QMAT", "QPMK", "QCVK", "BURT"],
          tcodes: ["QS61", "QC01", "QP01"],
          fiori: ["F2410"],
          configHe: ["תרגם TDT ל-spec-limits ב-MICs של Plan/Spec ל-Type 10.", "נהל ספציפיקציה-תלויית-לקוח היכן שנדרש.", "ודא שה-Certificate משקף את ה-TDT."],
          mistakesHe: ["TDT בנייר ללא תרגום ל-spec-limits ➔ לא נבדק.", "ספציפיקציה כללית במקום תלויית-לקוח ➔ לקוח מקבל מפרט שגוי.", "תעודה שאינה משקפת את ה-TDT."],
          troubleshootHe: ["מוצר עובר אספקה למרות חריגה ➔ ה-TDT לא תורגם ל-spec-limits.", "תעודה לא תואמת מחויבות ➔ Certificate Profile לא-מותאם ל-TDT."],
          bestPracticeHe: ["תרגם כל TDT ל-spec-limits ברורים ב-MIC/Spec.", "נהל מפרט-תלוי-לקוח כשהדרישות שונות.", "ודא יישור בין TDT, בדיקה ותעודה."],
          interviewHe: [{ qHe: "מהם Technical Delivery Terms וכיצד הם מיושמים?", aHe: "המפרט-הטכני המוסכם עם הלקוח (טווחי-ערכים/תקנים); מתורגם ל-spec-limits ב-MICs של Inspection Type 10 / Material Specification, ומשתקף בתעודה." }],
          takeawaysHe: ["TDT = המפרט-הטכני המוסכם עם הלקוח.", "מתורגם ל-spec-limits בבדיקת-אספקה.", "התעודה חייבת לשקף אותו."],
          relatedHe: [{ labelHe: "QM · מפרט-חומר (2.12)", href: "/library/qm/chapter-02/#sub-2.12" }],
        },
      ],
    },
    // ============================================================ 2.8
    {
      id: "2.8", titleHe: "רשומת-מידע איכות", titleEn: "Quality Information Record",
      execHe:
        "Quality Information Record (Q-Info, QI01) קובעת את מצב-האיכות של שילוב Material+Vendor+Plant ברכש: האם הספק released לחומר, אילו תעודות נדרשות, והאם נדרשת Source Inspection. היא נקודת-הבקרה התפעולית המרכזית של QM in Procurement.",
      beginnerHe:
        "ה-Q-Info היא 'אישור-העבודה' של ספק מסוים מול חומר מסוים במפעל מסוים. בה מסמנים אם הספק 'מאושר' לספק את החומר, ומה נדרש (תעודה, בדיקת-מקור). בלי Q-Info release — הקבלה מהספק נחסמת.",
      consultantHe:
        "נשמרת ב-QINF (per Material+Vendor+Plant). שדות: Release status (released until date / blocked), Release quantity, Source inspection, Certificate type, QM-system required. עובדת יחד עם QM Control Key (per Material). חסימה ב-Q-Info מונעת יצירת-PO/קבלה. ב-S/4 ה-Vendor הוא BP בתפקיד-ספק.",
      purposeHe:
        "לנהל ברמת-הפירוט הנכונה (ספק×חומר×מפעל) את אישור-הספק, דרישות-התעודה ובדיקת-המקור — הבסיס לאכיפת איכות-נכנסת.",
      processExampleHe:
        "Q-Info לתרכיז×ספק×מפעל ב-released until 31.12; הזמנת-רכש מותרת; אם ה-release פג — PO חסומה עד חידוש. נדרשת COA → קבלה ללא תעודה נחסמת לתשלום.",
      cbcHe:
        "ב-CBC לכל שילוב תרכיז×ספק-גלובלי×מפעל יש Q-Info נפרדת; ניתן לחסום ספק-חומר ספציפי (לאחר תקלת-איכות) בלי לפגוע בשאר השילובים, וכך לבודד בעיה.",
      navHe: [
        "Quality Management ► QM in Logistics ► QM in Procurement ► Quality Info Record ► Maintain",
        "Quality Management ► QM in Logistics ► QM in Procurement ► Define Control Keys",
      ],
      tables: ["QINF", "EINA", "LFA1", "BUT000"],
      tcodes: ["QI01", "QI02", "QI03", "QI04", "QI05", "QI06", "QI07"],
      fiori: ["F1981"],
      configHe: [
        "Q-Info per Material+Vendor+Plant: release status, release-until, release-qty.",
        "Source Inspection ו-Certificate type נדרשים.",
        "QM Control Key (per Material) — חסימת-תשלום/קבלה.",
      ],
      flow: [
        { he: "יצירת Q-Info", code: "QI01" },
        { he: "release until + qty", code: "QINF" },
        { he: "הזמנת-רכש", code: "ME21N", note: "נחסמת אם blocked" },
        { he: "קבלה", code: "MIGO", note: "Type 01" },
        { he: "תשלום משוחרר אחרי UD", code: "QM Control Key" },
      ],
      masterDataHe: [
        "QINF = Q-Info (Material+Vendor+Plant), release status, certificate, source inspection.",
        "פועלת עם QM Control Key ב-MARC.",
      ],
      mistakesHe: [
        "release-until עבר ➔ הזמנות-רכש נחסמות בלי הסבר ברור.",
        "Q-Info חסרה ➔ אין בקרת-ספק על הקבלה.",
        "חסימה גורפת לספק במקום לשילוב-החומר הספציפי.",
      ],
      troubleshootHe: [
        "PO נחסמת לספק ➔ Q-Info blocked או release-until עבר.",
        "קבלה ללא בדיקת-מקור ➔ Source Inspection לא סומן ב-Q-Info.",
        "תשלום עובר ללא תעודה ➔ Certificate type לא נדרש ב-Q-Info / Control Key.",
      ],
      bestPracticeHe: [
        "נהל release-until עם תזכורות-חידוש.",
        "חסום ברמת ספק×חומר×מפעל, לא ברמת-ספק גורפת.",
        "דרוש Source Inspection/COA לחומרים קריטיים.",
      ],
      interviewHe: [
        { qHe: "מהי Q-Info-Record ובאיזו רמה היא מנוהלת?", aHe: "רשומת-מידע-איכות (QI01) ברמת Material+Vendor+Plant, הקובעת release/block, תעודות ובדיקת-מקור לספק-חומר." },
        { qHe: "מה קורה כש-release-until פג?", aHe: "הזמנות-רכש מהספק לחומר זה נחסמות עד חידוש ה-release — מנגנון לאכיפת-חידוש-אישור." },
      ],
      takeawaysHe: [
        "Q-Info = בקרת-ספק ברמת Material+Vendor+Plant.",
        "קובעת release/block, תעודות ובדיקת-מקור.",
        "עובדת עם QM Control Key לאכיפת QM in Procurement.",
      ],
      relatedHe: [
        { labelHe: "QM · הסכם-ספק (2.7.1)", href: "/library/qm/chapter-02/#sub-2.7.1" },
        { labelHe: "אובייקט · QINF", href: "/library/qm/object/QINF/" },
      ],
    },
    // ============================================================ 2.9
    {
      id: "2.9", titleHe: "מאפייני-בדיקת-אב (MIC)", titleEn: "Master Inspection Characteristics",
      execHe:
        "Master Inspection Characteristic (MIC, QS21-family) הוא לבנת-הבסיס של תכנון-האיכות — הגדרה מרכזית של 'מה בודקים': שם, סוג (כמותי/איכותי), יחידות, גבולות-מפרט, ושיטה. MIC מוגדר פעם-אחת ומשובץ בתכניות-בדיקה רבות, ומבטיח עקביות בכל הבדיקות.",
      beginnerHe:
        "MIC הוא 'מה אנחנו מודדים' — למשל 'Brix', 'pH', 'נפח-מילוי' או 'אטימות-פקק'. מגדירים אותו מרכזית: שם, האם זו מדידה-מספרית או הערכת-עבר/נכשל, ומה הטווח-המותר. אחר-כך משבצים אותו בכל תכנית-בדיקה שצריכה אותו.",
      consultantHe:
        "MIC נשמר ב-QPMK (master) + QPMT (texts) ברמת-Plant, עם version ו-status. שני סוגים: Quantitative (ערך-מדידה + spec limits + UoM) ו-Qualitative (הערכה מול Catalog/code group). Complete-copy מול Reference: MIC מסוג Reference מקושר (לא מועתק) לתכנית, כך שעדכון-מרכזי מתפשט. שדות: control indicators (sampling, lower/upper limit, scrap), Inspection Method, Catalog assignment.",
      purposeHe:
        "לתקנן את 'מה בודקים' במקום-מרכזי, להפחית שגיאות-הגדרה, ולאפשר עדכון-מרכזי המתפשט לכל התכניות — בסיס לעקביות ולניתוח-מגמות.",
      processExampleHe:
        "MIC 'Brix' (כמותי, UoM=°Bx, target 10.2, lower 10.0, upper 10.5) מוגדר ב-QS21; הוא משובץ ב-30 תכניות-בדיקה של משקאות שונים; עדכון-טווח נעשה במקום-אחד ומתעדכן בכולן (אם Reference).",
      cbcHe:
        "ב-CBC ספריית-MICs מרכזית: Brix, pH, CO2-volumes, Net-Content, Cap-torque, Microbiology; כל MIC כמותי נושא spec-limits לפי תקן-Coca-Cola; כל MIC איכותי (למשל 'תקינות-תווית') מקושר ל-Catalog של קודי-ליקוי.",
      navHe: [
        "Quality Management ► Quality Planning ► Basic Data ► Inspection Characteristic ► Master Inspection Characteristics ► Define",
        "Quality Management ► Quality Planning ► Basic Data ► Inspection Characteristic ► Maintain Settings",
      ],
      tables: ["QPMK", "QPMT", "QPMZ", "TQ15"],
      tcodes: ["QS21", "QS22", "QS23", "QS24", "QS25", "QS26"],
      fiori: ["F2410"],
      configHe: [
        "MIC type: Quantitative (ערך+spec+UoM) או Qualitative (Catalog/code).",
        "Control Indicators: sampling, limits, scrap-relevance, recording-required.",
        "version + status (released) — חובה ל-released כדי לשבץ בתכנית.",
      ],
      flow: [
        { he: "יצירת MIC", code: "QS21" },
        { he: "סוג + control indicators", code: "QPMK" },
        { he: "שיוך Method + Catalog", code: "QPAC/QS41" },
        { he: "release", code: "status" },
        { he: "שיבוץ בתכנית", code: "QP01", note: "Reference/Complete" },
      ],
      masterDataHe: [
        "QPMK = MIC master (per Plant, version, status, type).",
        "QPMZ = control-indicator settings; QPMT = texts.",
      ],
      mistakesHe: [
        "MIC לא-released ➔ אי-אפשר לשבצו בתכנית.",
        "Complete-copy במקום Reference ➔ עדכון לא מתפשט.",
        "spec-limits ב-MIC ובתכנית בו-זמנית ➔ סתירה.",
        "MIC כמותי ללא UoM ➔ ערכי-מדידה חסרי-משמעות.",
      ],
      troubleshootHe: [
        "MIC לא מופיע בתכנית ➔ לא-released או במפעל שגוי.",
        "עדכון-MIC לא משפיע על תכניות ➔ שובץ כ-Complete-copy.",
        "תוצאה לא נבדקת מול גבולות ➔ control indicators ללא limits.",
      ],
      bestPracticeHe: [
        "נהל ספריית-MICs מרכזית; שבץ כ-Reference לעדכון-מרכזי.",
        "קשר כל MIC ל-Inspection Method ול-Catalog מתאים.",
        "תקנן control indicators לפי-סוג-בדיקה.",
      ],
      interviewHe: [
        { qHe: "מהו ההבדל בין MIC כמותי לאיכותי?", aHe: "כמותי = ערך-מדידה עם spec-limits ו-UoM (Brix); איכותי = הערכה מול Catalog/code-group (עבר/נכשל, סוג-ליקוי)." },
        { qHe: "מה ההבדל בין שיבוץ Reference ל-Complete-copy בתכנית?", aHe: "Reference מקשר ל-MIC המרכזי — עדכון מתפשט; Complete-copy מעתיק את ההגדרה לתכנית — עצמאי, ללא עדכון-מרכזי." },
      ],
      takeawaysHe: [
        "MIC = 'מה בודקים', מוגדר מרכזית (QPMK).",
        "שני סוגים: כמותי ואיכותי.",
        "Reference מאפשר עדכון-מרכזי; Complete מנתק.",
      ],
      relatedHe: [
        { labelHe: "QM · שיטת-בדיקה (2.6)", href: "/library/qm/chapter-02/#sub-2.6" },
        { labelHe: "QM · תכנית-בדיקה (2.11)", href: "/library/qm/chapter-02/#sub-2.11" },
        { labelHe: "אובייקט · QPMK", href: "/library/qm/object/QPMK/" },
      ],
      children: [
        {
          id: "2.9.1", titleHe: "יצירת מאפייני-בדיקה", titleEn: "Create Inspection Characteristics",
          execHe: "יצירת MIC (QS21) קובעת את סוג-המאפיין (כמותי/איכותי), יחידת-המידה, גבולות-המפרט וערכי-המטרה. זהו השלב המכונן שבו נקבעת המשמעות הסטטיסטית והתפעולית של כל בדיקה.",
          beginnerHe: "כדי ליצור MIC בוחרים: האם זו מדידה-מספרית (כמותי) או הערכה (איכותי), מה היחידה, ומה הטווח-המותר. מזינים שם וטקסט-תיאור, ושומרים — ומכאן ניתן לשבצו בתכניות.",
          consultantHe: "ב-QS21 בוחרים plant, MIC key, ואז סוג. עבור כמותי: target/lower/upper limit, UoM, decimal places. עבור איכותי: code-group/selected-set מ-Catalog. נקבעים גם number-of-decimal-places ו-sampling-relevance. ה-MIC נוצר ב-status בעבודה ומועבר ל-released.",
          purposeHe: "להגדיר במדויק את אופי-המדידה והטווחים — בסיס לרישום-תוצאות, להערכה-אוטומטית (valuation) ולניתוח-סטטיסטי.",
          processExampleHe: "יוצרים MIC 'pH' כמותי: target 2.6, lower 2.4, upper 2.8, UoM=pH, 2 ספרות-אחרי-נקודה; release; מעתה ניתן לשבצו בתכניות-המשקאות.",
          cbcHe: "ב-CBC יצירת MIC 'Net-Content' (330מ\"ל, ±2%) כמותי עם UoM=ml; ו-MIC 'Label-OK' איכותי מול Catalog של ליקויי-תווית.",
          navHe: ["Quality Management ► Quality Planning ► Basic Data ► Inspection Characteristic ► Master Inspection Characteristics ► Create (QS21)"],
          tables: ["QPMK", "QPMT", "QPMZ"],
          tcodes: ["QS21", "QS22", "QS24"],
          fiori: ["F2410"],
          configHe: ["בחר plant + MIC key + type (quantitative/qualitative).", "עבור כמותי: target/lower/upper/UoM/decimals.", "עבור איכותי: code-group/selected-set."],
          mistakesHe: ["בחירת-סוג שגויה (כמותי במקום איכותי) ➔ אי-אפשר לרשום תוצאות נכון.", "שכחת UoM/decimals ➔ ערכים חסרי-משמעות.", "אי-release ➔ MIC לא-שמיש."],
          troubleshootHe: ["לא ניתן לרשום ערך-מספרי ➔ ה-MIC הוגדר איכותי.", "ערך נדחה מטווח שגוי ➔ limits/UoM שגויים."],
          bestPracticeHe: ["קבע סוג, UoM ו-limits בכוונה בעת-היצירה.", "release רק אחרי בדיקת-תקינות.", "תעד את מקור-התקן ל-limits."],
          interviewHe: [{ qHe: "אילו שדות-מפתח נקבעים ביצירת MIC כמותי?", aHe: "target/lower/upper spec-limits, UoM, ומספר-ספרות-עשרוניות — בנוסף ל-control indicators ו-status." }],
          takeawaysHe: ["יצירת MIC קובעת סוג, UoM ו-limits.", "כמותי=מדידה, איכותי=הערכה.", "release נדרש לשימוש."],
        },
        {
          id: "2.9.2", titleHe: "עריכת אינדיקטורי-בקרה", titleEn: "Edit Control Indicators",
          execHe: "Control Indicators קובעים את התנהגות ה-MIC בעת-בדיקה: האם נדרש recording, האם sampling, האם המאפיין scrap-relevant, ערכי-קצה (lower/upper), ו-required vs optional. הם 'התנהגות-הביצוע' של המאפיין.",
          beginnerHe: "אחרי שיצרנו MIC, האינדיקטורים מסבירים ל-SAP איך הוא מתנהג בבדיקה: חובה לרשום? לפי-מדגם? כשל פוסל? יש גבול-תחתון/עליון? אלו 'מתגי-ההתנהגות' של המאפיין.",
          consultantHe: "מנוהלים ב-QPMZ (per MIC). אינדיקטורים מרכזיים: Recording (required/optional/summarized), Sampling, Lower/Upper spec, Scrap, Long-term inspection, Defects recording, SPC, Documentation. ניתן לשנותם בתכנית (per-plan override) אם ה-MIC הוגדר כ'ניתן-לשינוי'. שילוב-האינדיקטורים קובע את מסך-רישום-התוצאות.",
          purposeHe: "לשלוט בדיוק כיצד המאפיין נבדק ונרשם — חובה/אופציה, מדגם, פסילה — בלי לשנות את הגדרת-הבסיס שלו.",
          processExampleHe: "ל-MIC 'Brix' מסמנים: recording=required, sampling=yes, lower+upper active, scrap-relevant; כך כל בדיקה דורשת ערך, לפי-מדגם, וכשל פוסל את האצווה.",
          cbcHe: "ב-CBC ל-MIC קריטי (Microbiology) מסמנים recording=required + documentation + scrap-relevant (כשל=פסילה מלאה); ל-MIC משני (גוון-תווית) מסמנים optional.",
          navHe: ["Quality Management ► Quality Planning ► Basic Data ► Inspection Characteristic ► Edit Control Indicators (QS22/QS24)"],
          tables: ["QPMZ", "QPMK"],
          tcodes: ["QS22", "QS24", "QS25"],
          fiori: ["F2410"],
          configHe: ["סמן: Recording (req/opt/summ), Sampling, Lower/Upper, Scrap, Documentation, SPC, Long-term.", "קבע אם ניתן-לשינוי ברמת-התכנית (override)."],
          mistakesHe: ["recording=optional למאפיין-קריטי ➔ נשמט בלי-משים.", "scrap לא מסומן למאפיין-פוסל ➔ אצווה כושלת עוברת.", "אינדיקטורים סותרים ➔ מסך-רישום שגוי."],
          troubleshootHe: ["תוצאה לא-נדרשת בבדיקה ➔ recording=optional.", "כשל לא פוסל ➔ scrap-relevant לא מסומן.", "אין מדגם ➔ sampling indicator כבוי."],
          bestPracticeHe: ["סמן recording=required + scrap למאפיינים-קריטיים.", "אפשר override רק היכן שמוצדק.", "תקנן סטים-של-אינדיקטורים לפי-קריטיות."],
          interviewHe: [{ qHe: "מה קובעים Control Indicators ב-MIC?", aHe: "את התנהגות-הבדיקה: recording (חובה/אופציה), sampling, גבולות, scrap-relevance, documentation ו-SPC — מבלי לשנות את הגדרת-הבסיס." }],
          takeawaysHe: ["Control Indicators = התנהגות-הביצוע של MIC.", "שולטים ב-recording/sampling/scrap.", "ניתנים ל-override בתכנית."],
        },
        {
          id: "2.9.3", titleHe: "שיוך קטלוג-בדיקה", titleEn: "Assign Inspection Catalog",
          execHe: "שיוך Catalog ל-MIC (QS41/QS51) מספק רשימת-קודים סטנדרטית להערכה — קבוצות-קוד לתכונות, ליקויים, סיבות והחלטות. הוא הופך הערכה-איכותית מ'טקסט-חופשי' ל'בחירה-מקודדת' הניתנת לניתוח.",
          beginnerHe: "במקום שהבודק יכתוב חופשי 'התווית עקומה', הוא בוחר קוד-מתוך-רשימה (Catalog). כך כל הליקויים מקודדים אחיד וניתן לספור ולנתח אותם. משייכים את הרשימה ל-MIC האיכותי.",
          consultantHe: "Catalog Types מרכזיים: 1 (Characteristic attributes), 2 (Reasons/tasks), 3 (Usage decisions), 5 (External numbering), 9 (Defect types). מנוהלים ב-QS41 (Code Groups, QS51 selected-sets). MIC איכותי מקושר ל-Selected Set (code group). ה-Selected Set מספק את ערכי-ההערכה האפשריים (accepted/rejected codes) בעת-רישום.",
          purposeHe: "לתקנן הערכות-איכותיות לקודים-ניתנים-לניתוח, לאפשר Defect Recording אחיד, ולהזין דוחות-איכות ו-Pareto של ליקויים.",
          processExampleHe: "MIC 'Label-OK' מקושר ל-Selected Set מ-Catalog Type 1 הכולל קודים: OK / Crooked / Torn / Wrong-color; הבודק בוחר קוד, וה-UD מתבסס על accepted/rejected.",
          cbcHe: "ב-CBC Catalog של ליקויי-אריזה (Type 9): פקק-לא-אטום, נפח-חסר, תווית-עקומה, בקבוק-פגום; כל ליקוי מקודד, ודוחות-Pareto מזהים את הליקוי-השכיח לשיפור-תהליך.",
          navHe: ["Quality Management ► Quality Planning ► Basic Data ► Catalog ► Edit Catalogs (QS41)", "Quality Management ► Quality Planning ► Basic Data ► Catalog ► Edit Selected Sets (QS51)"],
          tables: ["QPGR", "QPCD", "QPGT", "QPMK"],
          tcodes: ["QS41", "QS42", "QS43", "QS51", "QS61"],
          fiori: ["F2410"],
          configHe: ["הגדר Code Groups + Codes ב-QS41 (per Catalog Type).", "הגדר Selected Sets ב-QS51 עם valuation (accepted/rejected).", "שייך Selected Set ל-MIC האיכותי."],
          mistakesHe: ["הערכה בטקסט-חופשי במקום Catalog ➔ אי-אפשר לנתח.", "Selected Set ללא valuation ➔ UD לא יכול להסתמך עליו.", "Catalog Type שגוי לסוג-ההערכה."],
          troubleshootHe: ["אין קודים-לבחירה בבדיקה ➔ Selected Set לא-משויך ל-MIC.", "UD לא מזהה כשל ➔ קוד ללא valuation 'rejected'.", "דוח-ליקויים ריק ➔ Defect Recording ללא Catalog Type 9."],
          bestPracticeHe: ["השתמש ב-Catalogs לכל הערכה-איכותית.", "הגדר valuation מדויק ב-Selected Sets.", "נצל Defect Catalog (Type 9) לניתוח-Pareto."],
          interviewHe: [
            { qHe: "מהו Catalog Type 9?", aHe: "קטלוג-ליקויים (Defect types) — לקידוד אחיד של סוגי-ליקויים, בסיס ל-Defect Recording ולניתוח-Pareto." },
            { qHe: "מה ההבדל בין Code Group ל-Selected Set?", aHe: "Code Group = אוסף-קודים (QS41); Selected Set = תת-מבחר עם valuation (accepted/rejected) (QS51), המקושר ל-MIC להערכה." },
          ],
          takeawaysHe: ["Catalog = קודים סטנדרטיים להערכה-איכותית.", "Selected Set (QS51) נושא valuation ומקושר ל-MIC.", "Type 9 (ליקויים) מזין ניתוח-Pareto."],
          relatedHe: [{ labelHe: "QM · מאפייני-בדיקת-אב (2.9)", href: "/library/qm/chapter-02/#sub-2.9" }],
        },
      ],
    },
    // ============================================================ 2.10
    {
      id: "2.10", titleHe: "נוהל-דגימה", titleEn: "Sampling Procedure",
      execHe:
        "Sampling Procedure (QDV1) קובע כמה לבדוק וכיצד להעריך מדגם — גודל-מדגם קבוע/אחוזי/לפי-תקן (AQL), כללי-קבלה/דחייה, ושיוך ל-Dynamic Modification. הוא ההבדל בין 'בדיקת-100%' לבין דגימה-סטטיסטית חכמה החוסכת זמן ועלות.",
      beginnerHe:
        "לא תמיד בודקים כל פריט. נוהל-דגימה קובע כמה דוגמאות לקחת מתוך אצווה (למשל 10 בקבוקים מתוך 1000) ומתי לקבל או לדחות את כל האצווה לפי תוצאות-המדגם. כך חוסכים בדיקות בלי לוותר על ביטחון-איכות.",
      consultantHe:
        "Sampling Procedure (QDV1) נשמר ב-QDPS; קובע Sampling Type (100%, fixed, percentage, AQL), Valuation Mode (attributive/variable), ו-Sampling Scheme (לטבלאות-AQL כמו ISO 2859). משויך ל-MIC בתכנית-הבדיקה. עובד עם Dynamic Modification Rule (QDR1) המשנה את חומרת-הבדיקה (skip/reduced/normal/tightened) לפי היסטוריית-איכות (Quality Level).",
      purposeHe:
        "לקבוע היקף-בדיקה מבוסס-סיכון וסטטיסטיקה במקום בדיקת-הכל, ולאזן בין עלות-בדיקה לביטחון-איכות. בסיס לדגימה-דינמית.",
      processExampleHe:
        "Sampling Procedure AQL 1.0 משויך ל-MIC; אצווה של 5,000 → מדגם 80 לפי טבלת-ISO; אם ≤2 פגמים — קבלה, אחרת — דחייה; Dynamic Modification עובר ל-reduced אחרי 5 אצוות-תקינות רצופות.",
      cbcHe:
        "ב-CBC בדיקות-אריזה (נפח/פקק) בדגימה אחוזית-מדגמית לכל פלטה; בדיקות-קריטיות (מיקרוביולוגיה) ב-100% או fixed-sample; Dynamic Modification מקטין דגימה לספקים-יציבים וחוסך בדיקות.",
      navHe: [
        "Quality Management ► Quality Planning ► Basic Data ► Sample ► Sampling Procedure ► Define Sampling Procedure (QDV1)",
        "Quality Management ► Quality Planning ► Basic Data ► Sample ► Sampling Scheme ► Define Sampling Scheme",
        "Quality Management ► Quality Planning ► Basic Data ► Dynamic Modification ► Define Dynamic Modification Rule",
      ],
      tables: ["QDPS", "QDQL", "QDPV", "QDSV"],
      tcodes: ["QDV1", "QDV2", "QDV3", "QDP1", "QDR1", "QDB1"],
      fiori: ["F2410"],
      configHe: [
        "Sampling Type: 100% / fixed / percentage / AQL (sampling-scheme based).",
        "Valuation Mode: attributive (accept/reject) או variable (mean/std).",
        "Dynamic Modification Rule (QDR1) + Quality Level (skip→tightened).",
        "Sampling Scheme (טבלאות AQL כמו ISO 2859) ל-AQL-based.",
      ],
      flow: [
        { he: "הגדרת Sampling Scheme", code: "QDP1", note: "AQL tables" },
        { he: "Sampling Procedure", code: "QDV1" },
        { he: "Dynamic Modification Rule", code: "QDR1" },
        { he: "שיוך ל-MIC בתכנית", code: "QP01" },
        { he: "חישוב גודל-מדגם בפתיחת-מנה", code: "QA32" },
      ],
      masterDataHe: [
        "QDPS = Sampling Procedure (type, valuation mode, scheme).",
        "QDQL = Quality Level (היסטוריית-חומרה לדגימה-דינמית).",
      ],
      mistakesHe: [
        "Sampling Procedure ללא Valuation Mode תואם-MIC ➔ הערכה שגויה.",
        "AQL ללא Sampling Scheme ➔ גודל-מדגם לא מחושב.",
        "Dynamic Modification ללא Quality Level ➔ אין שינוי-חומרה.",
        "בדיקת-100% למאפיין-לא-קריטי ➔ בזבוז משאבי-מעבדה.",
      ],
      troubleshootHe: [
        "גודל-מדגם=0/שגוי ➔ Sampling Type/Scheme לא-תואם.",
        "אצווה לא נדחית למרות פגמים ➔ Valuation Mode/כללי-קבלה שגויים.",
        "חומרה לא משתנה ➔ Dynamic Modification Rule לא-משויך או חסר Quality Level.",
      ],
      bestPracticeHe: [
        "התאם Sampling Type לקריטיות: AQL לאריזה, 100% למיקרוביולוגיה.",
        "השתמש ב-Dynamic Modification לצמצום-בדיקות לספקים-יציבים.",
        "ודא Valuation Mode תואם לסוג-ה-MIC (variable לכמותי).",
      ],
      interviewHe: [
        { qHe: "מה קובע Sampling Procedure?", aHe: "כמה לבדוק (גודל-מדגם: fixed/percentage/AQL/100%) וכיצד להעריך (attributive/variable) — וקישור לכללי-קבלה/דחייה." },
        { qHe: "מהי Dynamic Modification?", aHe: "כלל המשנה את חומרת-הבדיקה (skip/reduced/normal/tightened) אוטומטית לפי היסטוריית-האיכות (Quality Level) — מקטין דגימה לתהליכים יציבים." },
      ],
      takeawaysHe: [
        "Sampling Procedure = כמה בודקים וכיצד מעריכים.",
        "סוגים: 100%/fixed/percentage/AQL.",
        "Dynamic Modification מתאים חומרה להיסטוריה.",
      ],
      relatedHe: [
        { labelHe: "QM · תכנית-בדיקה (2.11)", href: "/library/qm/chapter-02/#sub-2.11" },
        { labelHe: "אובייקט · QDPS", href: "/library/qm/object/QDPS/" },
      ],
    },
    // ============================================================ 2.11
    {
      id: "2.11", titleHe: "תכנית-בדיקה", titleEn: "Inspection Plan",
      execHe:
        "Inspection Plan (QP01) הוא רשימת-המשימות של האיכות — הוא מאגד פעולות-בדיקה, מאפיינים (MICs), נהלי-דגימה וציוד-בדיקה, ומשייך אותם לחומר. הוא 'המתכון-לבדיקה' שממנו כל מנת-בדיקה שואבת מה, איך וכמה לבדוק. בלעדיו אין למנה מאפיינים.",
      beginnerHe:
        "תכנית-בדיקה היא 'רשימת-המשימות של הבדיקה' — בדיוק כמו מסלול-ייצור, אבל לאיכות. היא מורכבת מפעולות, ובכל פעולה אילו MICs לבדוק, באיזה מדגם ובאיזה ציוד. משייכים אותה לחומר, ומכאן כל בדיקה של אותו חומר יודעת מה לעשות.",
      consultantHe:
        "Inspection Plan נשמר באותו מבנה כמו Routing: PLKO (header, task list type Q), PLPO (operations), PLMK (characteristics), PLAS (sequences), MAPL (material assignment). יצירה ב-QP01. בעת פתיחת מנת-בדיקה, המערכת בוחרת תכנית לפי MAPL + Plant + Usage + Status + תוקף, ומעתיקה את הפעולות והמאפיינים למנה (QALS/QAPO/QAMR). Group/Group-Counter מזהים את התכנית.",
      purposeHe:
        "לאגד את כל הגדרות-הבדיקה לחומר במקום-אחד-מובנה, ולספק למנת-הבדיקה את כל המאפיינים, הדגימה והציוד — בסיס לרישום-תוצאות ול-UD.",
      processExampleHe:
        "קבלת תרכיז → המערכת מחפשת Inspection Plan לחומר (MAPL), בוחרת את הפעיל-והתקף, ומעתיקה את פעולותיו ומאפייניו (Brix, pH, Micro) למנת-הבדיקה; הבודק רושם תוצאות מול אותם MICs.",
      cbcHe:
        "ב-CBC לכל חומר-משקה Inspection Plan עם פעולות: 'בדיקת-מעבדה' (Brix/pH/Micro) ו'בדיקת-אריזה' (נפח/פקק/תווית); כל פעולה מצביעה על מרכז-העבודה המתאים ועל הציוד המכויל.",
      navHe: [
        "Quality Management ► Quality Planning ► Inspection Planning ► Inspection Plan ► Create (QP01)",
        "Quality Management ► Quality Planning ► Inspection Planning ► General ► Define Task List Usage / Status",
      ],
      tables: ["PLKO", "PLPO", "PLMK", "PLAS", "MAPL"],
      tcodes: ["QP01", "QP02", "QP03", "QP06", "QP07"],
      fiori: ["F1421", "F3318"],
      configHe: [
        "Task list type Q = Inspection Plan.",
        "Usage + Status (released) — קובעים זמינות לבחירה-אוטומטית.",
        "MAPL = שיוך לחומר; Group/Group-Counter לזיהוי.",
      ],
      flow: [
        { he: "יצירת תכנית", code: "QP01", note: "type Q" },
        { he: "פעולות + מרכז-עבודה", code: "PLPO" },
        { he: "שיבוץ MICs + Sampling", code: "PLMK/QDV1" },
        { he: "שיוך לחומר", code: "MAPL" },
        { he: "release + תוקף", code: "PLKO" },
        { he: "בחירה אוטומטית בפתיחת-מנה", code: "QALS" },
      ],
      masterDataHe: [
        "PLKO=header (type Q, Group, Usage, Status), PLPO=operations, PLMK=characteristics.",
        "MAPL=שיוך-חומר; הבחירה בעת-מנה: Plant+Usage+Status+תוקף.",
      ],
      mistakesHe: [
        "תכנית לא-released ➔ לא נבחרת בפתיחת-מנה.",
        "אי-שיוך MAPL לחומר ➔ מנה ללא תכנית.",
        "ריבוי תכניות-תקפות לאותו חומר ➔ בחירה לא-צפויה.",
        "MIC בפעולה ללא Sampling Procedure ➔ אין גודל-מדגם.",
      ],
      troubleshootHe: [
        "מנה נפתחת ללא מאפיינים ➔ תכנית לא-released / MAPL חסר / מחוץ-לתוקף.",
        "נבחרת תכנית שגויה ➔ ריבוי תכניות-תקפות (Usage/תוקף חופפים).",
        "אין מדגם בפעולה ➔ Sampling Procedure לא-משויך ל-MIC.",
      ],
      bestPracticeHe: [
        "release רק תכנית שנבדקה; נהל תוקף ללא-חפיפה.",
        "השתמש ב-Reference Operation Set לבדיקות-משותפות.",
        "שייך Sampling Procedure לכל MIC לפי-קריטיות.",
      ],
      interviewHe: [
        { qHe: "כיצד נבחרת תכנית-בדיקה בעת פתיחת-מנה?", aHe: "לפי MAPL (שיוך-חומר) + Plant + Usage + Status (released) + תוקף; המערכת מעתיקה את הפעולות והמאפיינים למנה." },
        { qHe: "מה משותף ל-Inspection Plan ול-Routing?", aHe: "אותו מבנה-טבלאות PLKO/PLPO/PLMK/PLAS/MAPL; ה-Inspection Plan הוא task list type Q." },
      ],
      takeawaysHe: [
        "Inspection Plan = 'מתכון-הבדיקה' (task list type Q).",
        "מבנה PLKO/PLPO/PLMK, שיוך-חומר ב-MAPL.",
        "מנת-בדיקה מעתיקה ממנו מאפיינים בעת-פתיחה.",
      ],
      relatedHe: [
        { labelHe: "QM · מאפייני-בדיקת-אב (2.9)", href: "/library/qm/chapter-02/#sub-2.9" },
        { labelHe: "QM · נוהל-דגימה (2.10)", href: "/library/qm/chapter-02/#sub-2.10" },
        { labelHe: "אובייקט · PLKO", href: "/library/qm/object/PLKO/" },
      ],
      children: [
        {
          id: "2.11.1", titleHe: "כותרת רשימת-המשימות", titleEn: "Task List Header",
          execHe: "Task List Header (PLKO) הוא כותרת התכנית — מזהה אותה (Group/Counter), קובע Usage, Status, תוקף ומדדים-כלליים. הוא ה'תעודת-הזהות' של התכנית והבסיס לבחירתה האוטומטית.",
          beginnerHe: "כל תכנית-בדיקה מתחילה בכותרת: מספר-קבוצה, לשם-מה היא (Usage), האם היא פעילה (Status), ומאיזה תאריך. הכותרת היא מה שמזהה את התכנית כשהמערכת מחפשת אותה.",
          consultantHe: "PLKO נושא: Plant, Group, Group-Counter, Usage (5=בדיקת-טובין), Status (4=released for general use), Valid-From, Lot-size range, Planner-group. ה-Status וה-Usage הם הקריטיים לבחירה-אוטומטית. שינוי-כותרת ניתן לניהול דרך Change Number.",
          purposeHe: "לזהות ולסווג את התכנית, ולקבוע את תנאי-הזמינות שלה (Usage/Status/תוקף) לבחירה במנת-בדיקה.",
          processExampleHe: "כותרת-תכנית: Usage 5, Status 4 (released), Valid-From 01.01, lot-size 1–99999; כל מנת-בדיקה בטווח-הכמות שאחרי-התאריך תבחר אותה אוטומטית.",
          cbcHe: "ב-CBC כותרת-התכנית למשקה: Usage 5, Status 4, Planner-group=QA-LAB; lot-size פתוח כך שכל גודל-אצווה משתמש באותה תכנית.",
          navHe: ["Quality Management ► Quality Planning ► Inspection Planning ► Inspection Plan ► Create ► Header (QP01)"],
          tables: ["PLKO", "TCA01", "TCA52"],
          tcodes: ["QP01", "QP02"],
          fiori: ["F1421"],
          configHe: ["הזן Plant, Usage (5), Status (4-released), Valid-From, lot-size range, Planner-group.", "Group/Group-Counter לזיהוי."],
          mistakesHe: ["Status≠released ➔ התכנית לא-נבחרת.", "Usage שגוי ➔ לא תואם ל-Inspection Type.", "Valid-From עתידי ➔ מנות-היום לא מוצאות תכנית."],
          troubleshootHe: ["תכנית לא-נבחרת ➔ Status/Usage/Valid-From בכותרת.", "lot-size מחוץ-לטווח ➔ הכותרת מגבילה גודל-אצווה."],
          bestPracticeHe: ["שמור Status=released רק לתכניות-מאומתות.", "השתמש ב-Usage עקבי מול Inspection Types.", "נהל תוקף ללא-חפיפה."],
          interviewHe: [{ qHe: "אילו שדות בכותרת קובעים בחירה-אוטומטית?", aHe: "Status (released), Usage, Valid-From ו-lot-size range — בנוסף ל-Plant ושיוך-החומר (MAPL)." }],
          takeawaysHe: ["PLKO = כותרת/תעודת-זהות התכנית.", "Status+Usage+תוקף קובעים זמינות.", "בסיס לבחירה-אוטומטית."],
        },
        {
          id: "2.11.2", titleHe: "כותרת תכנית-הבדיקה", titleEn: "Inspection Plan Header",
          execHe: "כותרת תכנית-הבדיקה מרכזת את הנתונים-הספציפיים-לאיכות ברמת-התכנית (מעבר ל-Task List Header הכללי): Inspection-Points, אופן-רישום, ונתוני-בקרה הרלוונטיים רק ל-QM. היא המשלימה-האיכותית של הכותרת.",
          beginnerHe: "בנוסף לכותרת-הכללית, יש לתכנית-בדיקה הגדרות שנוגעות רק לאיכות — למשל האם רושמים תוצאות לפי 'נקודות-בדיקה' (Inspection Points) ואיך מסכמים אותן. אלו יושבות בכותרת-האיכותית.",
          consultantHe: "כאן מוגדרים Inspection-Point-type (time/quantity/free), שמשמש ל-running inspection (PP-PI process orders), ו-partial-lot assignment. נתונים אלו ב-PLKO/PLPO עם שדות-QM ייעודיים. ה-Inspection-Point מחבר את רישום-התוצאות לנקודות-זמן/כמות לאורך-הייצור.",
          purposeHe: "להגדיר את אופן רישום-התוצאות והבקרה הייחודי לאיכות — בעיקר Inspection-Points לתעשיית-תהליך — מעבר לנתונים הלוגיסטיים של הכותרת-הכללית.",
          processExampleHe: "תכנית-בדיקה לתהליך-רציף מגדירה Inspection-Point לפי-זמן (כל שעה); המערכת פותחת נקודת-רישום לכל מרווח, והבודק רושם Brix כל שעה לאורך-המשמרת.",
          cbcHe: "ב-CBC בקו-מילוי-רציף הכותרת מגדירה Inspection-Point לפי-כמות (כל 1,000 בקבוקים) או לפי-זמן (כל 30 דק'), כך שהדגימות נרשמות לאורך-ייצור-האצווה ולא רק בסופה.",
          navHe: ["Quality Management ► Quality Planning ► Inspection Planning ► Inspection Plan ► Header Data ► Inspection Points"],
          tables: ["PLKO", "PLPO", "QAPP"],
          tcodes: ["QP01", "QP02"],
          fiori: ["F1421"],
          configHe: ["הגדר Inspection-Point-type (time/quantity/free).", "קבע partial-lot / quantity-related הקצאה.", "נתוני-בקרה ייעודיים-QM ברמת-התכנית."],
          mistakesHe: ["אי-הגדרת Inspection-Point לתהליך-רציף ➔ רישום רק בסוף-האצווה.", "Inspection-Point-type שגוי ➔ נקודות-רישום לא-נפתחות נכון."],
          troubleshootHe: ["אין נקודות-רישום לאורך-ייצור ➔ Inspection-Point לא-מוגדר.", "תוצאות לא-מסוכמות לאצווה ➔ partial-lot assignment חסר."],
          bestPracticeHe: ["השתמש ב-Inspection-Points לתהליכים-רציפים.", "התאם type (time/quantity) לאופי-הייצור.", "ודא סיכום-תוצאות לרמת-האצווה."],
          interviewHe: [{ qHe: "מהו Inspection-Point ומתי משתמשים בו?", aHe: "מנגנון לרישום-תוצאות לאורך-ייצור (לפי זמן/כמות/חופשי), שכיח בתעשיית-תהליך (PP-PI) — מאפשר דגימה רציפה ולא רק בסוף-האצווה." }],
          takeawaysHe: ["הכותרת-האיכותית מוסיפה נתוני-QM ייעודיים.", "Inspection-Points = רישום לאורך-ייצור.", "type לפי זמן/כמות/חופשי."],
        },
        {
          id: "2.11.3", titleHe: "שיוך-חומר", titleEn: "Material Assignment",
          execHe: "שיוך-החומר (MAPL) קושר את תכנית-הבדיקה לחומר (ולמפעל) — בלעדיו התכנית 'יתומה' ולא תיבחר לאף מנת-בדיקה. ניתן לשייך מספר חומרים לתכנית-אחת ולהפך, וכך לנהל תכניות-משותפות.",
          beginnerHe: "כדי שתכנית-בדיקה 'תדע' לאיזה חומר היא שייכת, מקשרים אותה לחומר (MAPL). אפשר לשייך כמה חומרים לאותה תכנית (אם הבדיקות זהות), או חומר-אחד למספר-תכניות (לפי Usage). בלי שיוך — המנה לא תמצא תכנית.",
          consultantHe: "MAPL מקשר Material+Plant ל-Group/Group-Counter של התכנית. n:m אפשרי. בעת פתיחת-מנה, החיפוש הוא MAPL→PLKO לפי Plant+Usage+Status+תוקף. ניתן גם group-level assignment (תכנית-קבוצתית) לחומרים-דומים, מה שמפחית תחזוקה משמעותית.",
          purposeHe: "לקשר את התכנית לחומרים הרלוונטיים, לאפשר שיתוף-תכניות בין חומרים-דומים, ולהוות את נקודת-הכניסה לבחירת-התכנית במנת-הבדיקה.",
          processExampleHe: "תכנית 'בדיקת-משקה-תקן' משויכת ב-MAPL ל-12 SKUs של אותו משקה בגדלים-שונים; כל מנת-בדיקה לכל אחד מהם בוחרת את אותה תכנית — תחזוקה אחת ל-12 חומרים.",
          cbcHe: "ב-CBC משקה זהה ב-330מ\"ל/500מ\"ל/1.5ל משייך את כולם לתכנית-בדיקה אחת (אריזה משתנה, מעבדה זהה), חוסך תחזוקת-תכניות מרובות.",
          navHe: ["Quality Management ► Quality Planning ► Inspection Planning ► Inspection Plan ► Material-Task List Assignment (QP02)"],
          tables: ["MAPL", "PLKO", "PLMK"],
          tcodes: ["QP01", "QP02", "QP07"],
          fiori: ["F1421"],
          configHe: ["שייך Material+Plant ל-Group/Group-Counter (MAPL).", "אפשר n:m לשיתוף-תכניות.", "ודא Usage תואם לסוג-הבדיקה."],
          mistakesHe: ["תכנית ללא MAPL ➔ לא-נבחרת לאף-מנה.", "שיוך חומר לתכנית עם Usage שגוי ➔ לא-תואם Inspection Type.", "כפל-שיוך לתכניות-חופפות ➔ בחירה-לא-צפויה."],
          troubleshootHe: ["מנה ללא תכנית ➔ MAPL חסר לחומר/מפעל.", "תכנית-שגויה נבחרת ➔ ריבוי-שיוכים חופפים.", "שינוי-תכנית לא חל על חומר ➔ MAPL מצביע על Counter אחר."],
          bestPracticeHe: ["שתף תכנית-אחת בין חומרים-זהים-לבדיקה.", "שמור Usage עקבי בשיוך.", "תעד אילו חומרים משויכים לכל תכנית."],
          interviewHe: [{ qHe: "מה תפקיד MAPL?", aHe: "מקשר תכנית-בדיקה (Group/Counter) לחומר+מפעל; נקודת-הכניסה לבחירת-התכנית בפתיחת-מנה. מאפשר שיוך n:m." }],
          takeawaysHe: ["MAPL = שיוך תכנית↔חומר/מפעל.", "n:m לשיתוף-תכניות.", "בלי MAPL אין בחירת-תכנית."],
        },
        {
          id: "2.11.4", titleHe: "ציוד-בדיקה", titleEn: "Test Equipment",
          execHe: "שיוך ציוד-בדיקה (PRT) לפעולות-התכנית מבטיח שכל בדיקה תבוצע בכלי-מדידה מתאים ומכויל. הציוד מקושר ברמת-הפעולה, ומחבר את התכנית לניהול-כיול (Calibration) ולעקיבות-מדידה.",
          beginnerHe: "בכל פעולת-בדיקה אפשר לציין באיזה ציוד משתמשים — מד-Brix, pH-meter, מאזניים. כך הבודק יודע איזה כלי לקחת, והמערכת יכולה לוודא שהכלי מכויל.",
          consultantHe: "Test Equipment משויך כ-PRT (CRFH) לפעולה (AFFH/PLPO). PRT מסוג Equipment מקושר ל-Calibration Inspection (Type 14). הקישור מאפשר חסימת-שימוש בכלי-לא-מכויל ועקיבות מלאה (איזה כלי מדד איזו תוצאה). Control Key של ה-PRT קובע usage/confirmation.",
          purposeHe: "להבטיח מדידות-תקפות בציוד-מכויל, לקשר את הכיול ל-QM, ולספק עקיבות בין תוצאת-המדידה לכלי-שמדד אותה.",
          processExampleHe: "פעולת 'מדידת-Brix' בתכנית משייכת את PRT 'Refractometer-01'; אם הכלי עבר תאריך-כיול — המערכת מתריעה/חוסמת, והבודק נדרש לכלי-מכויל.",
          cbcHe: "ב-CBC כל פעולת-מעבדה מקושרת ל-PRT המכויל המתאים; דוח-עקיבות מראה איזה רפרקטומטר מדד איזו אצווה, קריטי בביקורת-איכות-מזון.",
          navHe: ["Quality Management ► Quality Planning ► Inspection Planning ► Operation ► Assign Production Resources/Tools", "Production ► Basic Data ► Production Resources/Tools"],
          tables: ["AFFH", "CRFH", "PLPO", "EQUI"],
          tcodes: ["QP02", "CF01", "QS21"],
          fiori: ["F1421", "F4006"],
          configHe: ["שייך PRT לפעולה (AFFH).", "PRT מסוג Equipment ↔ Calibration Inspection (Type 14).", "Control Key של ה-PRT לשימוש/אישור."],
          mistakesHe: ["פעולה ללא PRT ➔ אין עקיבות-ציוד.", "שימוש בכלי-לא-מכויל ➔ תוצאות-לא-תקפות.", "אי-קישור PRT ל-Calibration ➔ אין בקרת-כיול."],
          troubleshootHe: ["PRT לא-זמין לבחירה ➔ לא-מוגדר כ-PRT (CRFH).", "התרעת-כיול ➔ הכלי עבר תאריך-כיול.", "אין עקיבות-מדידה ➔ PRT לא-משויך לפעולה."],
          bestPracticeHe: ["שייך PRT לכל פעולת-מדידה.", "חבר ציוד ל-Calibration (Type 14).", "חסום כלים-לא-מכוילים."],
          interviewHe: [{ qHe: "כיצד מובטח שימוש בכלי-מכויל בלבד?", aHe: "ה-PRT הוא Equipment המקושר ל-Calibration Inspection (Type 14); כלי שעבר תאריך-כיול מתריע/נחסם בעת-השימוש בפעולה." }],
          takeawaysHe: ["Test Equipment = PRT משויך-לפעולה.", "מקושר ל-Calibration (Type 14).", "מבטיח מדידה-תקפה ועקיבות."],
          relatedHe: [{ labelHe: "QM · אמצעי-ייצור וכלים (2.2.4)", href: "/library/qm/chapter-02/#sub-2.2.4" }],
        },
        {
          id: "2.11.5", titleHe: "תצוגת-פעולות", titleEn: "Operations View",
          execHe: "תצוגת-הפעולות (PLPO) מציגה ומנהלת את צעדי-הבדיקה: כל פעולה מצביעה על מרכז-עבודה, נושאת Control Key ותיאור, וקובעת את הסדר-הלוגי של הבדיקה. זהו 'גוף' התכנית שאליו נתלים המאפיינים.",
          beginnerHe: "תצוגת-הפעולות היא רשימת-הצעדים של הבדיקה — למשל 0010 'דגימה', 0020 'בדיקת-מעבדה', 0030 'בדיקת-אריזה'. לכל פעולה מרכז-עבודה ותיאור, ואליה נתלים המאפיינים שצריך לבדוק.",
          consultantHe: "PLPO נושא: Operation number, Work Center (ARBPL), Control Key, תיאור, ו-standard values אופציונליים. הסדר ב-PLAS. ה-MICs (PLMK) משויכים לפעולה. Control Key קובע אם הפעולה דורשת confirmation, היא תוך-תהליכית, או רלוונטית-לעלות. ניתן לשלב Reference Operation Set כפעולה.",
          purposeHe: "לארגן את הבדיקה לצעדים-לוגיים, לשייך כל צעד למרכז-עבודה ולהוות את ה'מסגרת' שאליה משויכים המאפיינים.",
          processExampleHe: "תכנית עם פעולות: 0010 דגימה (מרכז QA-LAB), 0020 בדיקת-מעבדה (QA-LAB), 0030 בדיקת-אריזה (LINE-QA); כל פעולה נושאת את ה-MICs הרלוונטיים לה.",
          cbcHe: "ב-CBC תצוגת-הפעולות מפרידה 'בדיקת-מעבדה' (Brix/pH/Micro במעבדה) מ'בדיקת-קו' (נפח/פקק בקו-המילוי), כל אחת במרכז-העבודה שלה — לניתוח-עלות ואחריות נפרדים.",
          navHe: ["Quality Management ► Quality Planning ► Inspection Planning ► Inspection Plan ► Operation Overview (QP02)"],
          tables: ["PLPO", "PLAS", "PLMK", "CRHD"],
          tcodes: ["QP01", "QP02", "QP03"],
          fiori: ["F1421"],
          configHe: ["הזן Operation number, Work Center, Control Key, תיאור.", "סדר-פעולות ב-PLAS.", "שלב Reference Operation Set היכן שרלוונטי."],
          mistakesHe: ["פעולה ללא מרכז-עבודה ➔ אי-אפשר לאשר.", "Control Key שגוי ➔ confirmation/עלות לא נכונים.", "סדר-פעולות לא-לוגי ➔ בלבול-בודקים."],
          troubleshootHe: ["פעולה לא-ניתנת-לאישור ➔ Control Key ללא confirmation / חסר מרכז-עבודה.", "MIC לא-מופיע ➔ לא-משויך לפעולה (PLMK)."],
          bestPracticeHe: ["ארגן פעולות לפי-תחנת-ביצוע.", "שייך כל פעולה למרכז-עבודה נכון.", "השתמש ב-Reference Set לפעולות-חוזרות."],
          interviewHe: [{ qHe: "מה קובעת פעולה בתכנית-בדיקה?", aHe: "צעד-בדיקה לוגי עם מרכז-עבודה, Control Key ותיאור; אליה משויכים ה-MICs (PLMK), והיא מאפשרת אישור ורישום-זמן." }],
          takeawaysHe: ["PLPO = צעדי-הבדיקה.", "כל פעולה ↔ מרכז-עבודה + Control Key.", "המאפיינים נתלים לפעולות."],
          relatedHe: [{ labelHe: "QM · מרכז-עבודה (2.5)", href: "/library/qm/chapter-02/#sub-2.5" }],
        },
        {
          id: "2.11.6", titleHe: "מאפיינים ארוכי-טווח", titleEn: "Long-Term Characteristics",
          execHe: "Long-Term Characteristic הוא MIC שתוצאותיו נאספות לאורך-זמן וממספר מנות (למשל בדיקה-יומית של אותו פרמטר), ומאפשר ניתוח-מגמות ו-SPC על-פני אצוות מרובות במקום בדיקה חד-פעמית.",
          beginnerHe: "לפעמים רוצים לעקוב אחרי פרמטר לאורך-זמן — למשל ממוצע-ה-Brix השבועי — ולא רק באצווה-בודדת. מאפיין-ארוך-טווח אוסף תוצאות ממנות-רבות ומאפשר לראות מגמה.",
          consultantHe: "מסומן דרך control indicator 'long-term inspection' ב-QPMZ. התוצאות נצברות בין מנות (לא נסגרות עם המנה הבודדת), ומשמשות ל-SPC/Quality-Level לאורך-זמן. שכיח לבדיקות-ניטור-תהליך (recurring inspection, Type 09) ולמעקב-יציבות.",
          purposeHe: "לאפשר ניטור-מגמה ו-SPC על-פני זמן ואצוות מרובות, לזיהוי-סחף-תהליכי לפני שהוא הופך לפגם.",
          processExampleHe: "MIC 'Brix' מסומן long-term; תוצאות מכל אצוות-היום נצברות לגרף-בקרה שבועי; סחף-מגמה כלפי הגבול-העליון מתגלה לפני חריגה-בפועל.",
          cbcHe: "ב-CBC ניטור long-term של pH ו-CO2 לאורך-משמרת/שבוע מזהה סחף בקו-הקרבונציה, ומאפשר כיוונון מונע לפני אצווה-פסולה.",
          navHe: ["Quality Management ► Quality Planning ► Basic Data ► Inspection Characteristic ► Control Indicators ► Long-Term Inspection"],
          tables: ["QPMZ", "QPMK", "QASE"],
          tcodes: ["QS22", "QS24", "QP02"],
          fiori: ["F2410"],
          configHe: ["סמן control indicator 'long-term inspection' ב-QPMZ.", "קשר ל-SPC/Quality-Level לניתוח-מגמה.", "שכיח עם Recurring Inspection (Type 09)."],
          mistakesHe: ["סימון long-term למאפיין חד-פעמי ➔ תוצאות לא-נסגרות.", "אי-סימון למאפיין-ניטור ➔ אין ניתוח-מגמה.", "ערבוב long-term עם short-term באותה מנה ➔ בלבול-סגירה."],
          troubleshootHe: ["מנה לא-נסגרת ➔ מאפיין long-term ממתין לתוצאות-נוספות.", "אין גרף-מגמה ➔ long-term לא-מסומן / SPC לא-מופעל."],
          bestPracticeHe: ["השתמש ב-long-term לניטור-תהליך מתמשך.", "חבר ל-SPC לזיהוי-סחף.", "הפרד בבירור ממאפיינים חד-פעמיים."],
          interviewHe: [{ qHe: "מהו מאפיין ארוך-טווח?", aHe: "MIC שתוצאותיו נצברות על-פני מנות-רבות לאורך-זמן (control indicator long-term), לניתוח-מגמה ו-SPC במקום בדיקה חד-פעמית." }],
          takeawaysHe: ["Long-term = תוצאות נצברות לאורך-זמן.", "מאפשר SPC וניתוח-מגמה.", "שכיח בניטור-תהליך (Type 09)."],
        },
        {
          id: "2.11.7", titleHe: "מאפיינים מחושבים", titleEn: "Calculated Characteristics",
          execHe: "Calculated Characteristic הוא MIC שערכו נגזר מנוסחה על-בסיס מאפיינים-אחרים במנה (למשל יחס/הפרש/ממוצע), במקום מדידה-ישירה. הוא מאפשר חישובים-אוטומטיים ומפחית טעויות-חישוב-ידני.",
          beginnerHe: "לפעמים פרמטר אינו נמדד-ישירות אלא מחושב מאחרים — למשל 'יחס-מתיקות' = Brix חלקי-חומציות. מאפיין-מחושב מגדיר נוסחה, וה-SAP מחשב את הערך אוטומטית מהמדידות שכבר נרשמו.",
          consultantHe: "מסומן כ-'calculated characteristic'; נושא נוסחה המפנה למאפיינים-אחרים באותה פעולה/מנה (לפי מספרי-מאפיין). מחושב אוטומטית בעת-רישום ואינו דורש קלט-ידני. הנוסחה משתמשת באופרטורים אריתמטיים על תוצאות-מאפיינים קודמים; חייב להיות אחרי המאפיינים שהוא מפנה אליהם.",
          purposeHe: "לחשב פרמטרים-נגזרים אוטומטית, להבטיח עקביות-חישוב ולהעריך אותם מול spec-limits כמו כל מאפיין.",
          processExampleHe: "MIC 'Brix/Acid-Ratio' מוגדר מחושב = Brix ÷ Titratable-Acidity; המעבדה רושמת רק Brix וחומציות, והיחס מחושב ומוערך אוטומטית מול הטווח-המותר.",
          cbcHe: "ב-CBC 'יחס-Brix-לחומציות' (אינדיקטור-טעם מרכזי) מחושב אוטומטית מהמדידות; חריגה ביחס מתגלה גם כששני הרכיבים בנפרד בטווח.",
          navHe: ["Quality Management ► Quality Planning ► Basic Data ► Inspection Characteristic ► Calculated Characteristic"],
          tables: ["QPMK", "QPMZ", "PLMK"],
          tcodes: ["QS21", "QS22", "QP02"],
          fiori: ["F2410"],
          configHe: ["סמן 'calculated characteristic' והגדר נוסחה.", "הפנה למספרי-מאפיין קודמים באותה פעולה.", "מקם אחרי המאפיינים-המקוריים."],
          mistakesHe: ["נוסחה המפנה למאפיין שעדיין לא-נרשם ➔ חישוב-כשל.", "מיקום המאפיין-המחושב לפני מקורותיו ➔ ערך ריק.", "ערבוב יחידות-מידה לא-תואמות בנוסחה."],
          troubleshootHe: ["ערך-מחושב ריק ➔ מאפיין-מקור לא-נרשם / מיקום שגוי.", "תוצאה שגויה ➔ נוסחה/יחידות לא-תואמות."],
          bestPracticeHe: ["מקם מאפיינים-מחושבים אחרי מקורותיהם.", "ודא תאימות-יחידות בנוסחה.", "השתמש בהם לאינדיקטורים-נגזרים קריטיים."],
          interviewHe: [{ qHe: "מהו מאפיין-מחושב?", aHe: "MIC שערכו נגזר מנוסחה על מאפיינים-אחרים במנה (לא נמדד-ישירות); מחושב ומוערך אוטומטית, וחייב לבוא אחרי מקורותיו." }],
          takeawaysHe: ["Calculated = ערך מנוסחה על מאפיינים-אחרים.", "מחושב אוטומטית, ללא קלט-ידני.", "חייב לבוא אחרי מקורותיו."],
        },
        {
          id: "2.11.8", titleHe: "מאפיינים מסווגים", titleEn: "Classed Characteristics",
          execHe: "Classed Characteristic הוא MIC כמותי שתוצאותיו מקובצות למחלקות-ערך (classes/bins) — למשל טווחי-משקל — במקום ערך-בודד. הוא מאפשר ניתוח-התפלגות (היסטוגרמה) ובדיקה מהירה לפי-מחלקה.",
          beginnerHe: "במקום לרשום מספר-מדויק, לפעמים מקבצים תוצאות ל'מחלקות' — למשל 'קל/בינוני/כבד'. מאפיין-מסווג מגדיר את המחלקות, והבודק משייך את התוצאה למחלקה. נוח לניתוח-התפלגות.",
          consultantHe: "מסומן כ-classed; מגדיר class-width ו-number-of-classes, או גבולות-מחלקה מפורשים. התוצאות נספרות לכל מחלקה (frequency) ומשמשות להיסטוגרמה ולניתוח-התפלגות-סטטיסטי. שימושי כשהדיוק-המוחלט פחות-חשוב מההתפלגות, או לבדיקות-המוניות-מהירות.",
          purposeHe: "לאפשר ניתוח-התפלגות (היסטוגרמה) ובדיקה מהירה לפי-מחלקה, כשההתפלגות חשובה יותר מהערך-הבודד.",
          processExampleHe: "MIC 'Net-Content' מסווג ל-5 מחלקות-נפח; הבודק משייך כל בקבוק למחלקה; ההיסטוגרמה מראה אם ההתפלגות מוטה לכיוון מילוי-חסר.",
          cbcHe: "ב-CBC בדיקת-נפח-מילוי במחלקות (underfill / target / overfill) על-מדגם-גדול מהקו; ההתפלגות מזהה במהירות בעיית-כיול בראש-מילוי ספציפי.",
          navHe: ["Quality Management ► Quality Planning ► Basic Data ► Inspection Characteristic ► Classed Recording"],
          tables: ["QPMK", "QPMZ", "QASV"],
          tcodes: ["QS21", "QS22", "QP02"],
          fiori: ["F2410"],
          configHe: ["סמן classed-recording; הגדר class-width/number או גבולות-מחלקה.", "קבע ספירת-תדירות לכל מחלקה.", "חבר להיסטוגרמה/ניתוח-התפלגות."],
          mistakesHe: ["מחלקות-רחבות-מדי ➔ אובדן-רזולוציה.", "שימוש ב-classed כשנדרש ערך-מדויק (SPC משתנה).", "גבולות-מחלקה חופפים/חסרים."],
          troubleshootHe: ["היסטוגרמה לא-הגיונית ➔ גבולות-מחלקה שגויים.", "אין ניתוח-התפלגות ➔ classed לא-מסומן.", "אובדן-דיוק ל-SPC ➔ classed במקום variable-recording."],
          bestPracticeHe: ["השתמש ב-classed לניתוח-התפלגות מהיר.", "העדף variable-recording כשנדרש SPC מדויק.", "הגדר מחלקות-רציפות ללא-חפיפה."],
          interviewHe: [{ qHe: "מתי משתמשים במאפיין-מסווג?", aHe: "כשמעוניינים בהתפלגות (היסטוגרמה) ולא בערך-בודד, או לבדיקות-המוניות-מהירות; התוצאות מקובצות למחלקות-ערך." }],
          takeawaysHe: ["Classed = תוצאות במחלקות-ערך.", "מאפשר היסטוגרמה וניתוח-התפלגות.", "פוגע ברזולוציה ל-SPC מדויק."],
        },
        {
          id: "2.11.9", titleHe: "מאפיינים תלויים", titleEn: "Dependent Characteristics",
          execHe: "Dependent Characteristic הוא MIC שהפעלתו או הערכתו מותנית בתוצאת-מאפיין-אחר — בדיקה מסתעפת (conditional inspection). הוא מאפשר תכנית-בדיקה דינמית: לבדוק מאפיין-נוסף רק אם מאפיין-קודם הצביע על-צורך.",
          beginnerHe: "לפעמים בדיקה-אחת תלויה באחרת — למשל 'אם המראה חשוד, אז בצע בדיקת-מעבדה מורחבת'. מאפיין-תלוי מופעל רק כשמאפיין-קודם עומד בתנאי, וכך התכנית מתאימה עצמה לתוצאות.",
          consultantHe: "מיושם דרך required-characteristic / optional + לוגיקת-תלות, או דרך leading-characteristic שקובע אם המאפיינים-התלויים נדרשים. בעת-רישום, תוצאת-המאפיין-המוביל מפעילה/מבטלת את התלויים. שכיח לבדיקות-הסלמה (escalation) — בדיקה-מורחבת רק בעקבות-ממצא.",
          purposeHe: "להפוך את תכנית-הבדיקה לדינמית ומבוססת-תוצאה — לחסוך בדיקות-מיותרות ולהפעיל בדיקות-מעמיקות רק כשנדרש.",
          processExampleHe: "MIC 'בדיקה-ויזואלית' מוביל; אם תוצאתו 'חשוד', מופעל MIC-תלוי 'בדיקת-מעבדה-מורחבת'; אם 'תקין' — המאפיין-התלוי מדולג.",
          cbcHe: "ב-CBC אם 'בדיקת-ריח/מראה' של אצווה חשודה — מופעלת אוטומטית בדיקת-מיקרוביולוגיה-מורחבת תלויה; אצוות-תקינות מדלגות עליה וחוסכות זמן-מעבדה.",
          navHe: ["Quality Management ► Quality Planning ► Basic Data ► Inspection Characteristic ► Dependent / Required Characteristics"],
          tables: ["QPMK", "QPMZ", "PLMK"],
          tcodes: ["QS21", "QS22", "QP02"],
          fiori: ["F2410"],
          configHe: ["הגדר leading-characteristic ומאפיינים-תלויים.", "קבע תנאי-הפעלה (required/optional לפי-תוצאה).", "סדר את המאפיין-המוביל לפני התלויים."],
          mistakesHe: ["מאפיין-תלוי לפני המוביל ➔ לוגיקת-תלות נשברת.", "תלות לא-מוגדרת ➔ בדיקות-מורחבות תמיד או לעולם.", "תנאי-הפעלה שגוי ➔ הסלמה לא-נכונה."],
          troubleshootHe: ["בדיקה-מורחבת תמיד-רצה ➔ תנאי-התלות לא-מוגדר.", "הסלמה לא-מופעלת ➔ leading-characteristic/תנאי שגוי.", "סדר-מאפיינים שגוי ➔ התלוי לפני המוביל."],
          bestPracticeHe: ["השתמש בתלות לבדיקות-הסלמה מבוססות-ממצא.", "סדר תמיד מוביל→תלוי.", "תעד את לוגיקת-ההסתעפות בבירור."],
          interviewHe: [{ qHe: "מהו מאפיין-תלוי?", aHe: "MIC שהפעלתו/הערכתו מותנית בתוצאת-מאפיין-מוביל — בדיקה מסתעפת המאפשרת הפעלת-בדיקה-מורחבת רק בעקבות-ממצא." }],
          takeawaysHe: ["Dependent = בדיקה מותנית-תוצאה.", "מאפשר הסלמה דינמית.", "סדר מוביל→תלוי הכרחי."],
        },
      ],
    },
    // ============================================================ 2.12
    {
      id: "2.12", titleHe: "מפרט-חומר", titleEn: "Material Specification",
      execHe:
        "Material Specification (QS61) היא חלופה ל-Inspection Plan — רשימת-MICs המשויכת ישירות לחומר ללא מבנה-פעולות. היא קלה-לתחזוקה לבדיקות-פשוטות, יכולה לפעול לבד או יחד עם Inspection Plan, ומחברת ישירות מאפייני-בדיקה לחומר ולמאפייני-אצווה.",
      beginnerHe:
        "מפרט-חומר הוא 'גרסה-פשוטה' של תכנית-בדיקה: רשימת-מאפיינים שמשויכת ישר לחומר, בלי פעולות ומרכזי-עבודה. נוח כשהבדיקה פשוטה (רק רשימת-ערכים-לבדוק) ולא צריך את כל המבנה של תכנית-מלאה.",
      consultantHe:
        "Material Specification (QS61) מקשרת MICs ל-Material ישירות (ללא PLKO/PLPO), עם spec-limits לכל MIC. ניתן להשתמש בה לבד (Inspection-with-material-spec ב-Inspection Setup) או בשילוב עם Plan. היא מחוברת היטב ל-Batch Classification — ה-MICs יכולים להזין מאפייני-אצווה ישירות. שכיח לבדיקות-קבלה-פשוטות וניהול-spec ללקוח.",
      purposeHe:
        "לספק מנגנון-בדיקה קל-משקל לחומרים עם בדיקות-פשוטות, ולחבר ישירות מאפייני-בדיקה ל-Batch Classification — ללא תקורת-התחזוקה של תכנית-מלאה.",
      processExampleHe:
        "חומר-גלם פשוט עם 3 בדיקות-קבלה מקבל Material Specification (QS61) במקום Plan; מנת-הבדיקה (Type 01) שואבת את ה-MICs ישירות, והתוצאות מעדכנות את מאפייני-האצווה.",
      cbcHe:
        "ב-CBC חומרי-עזר פשוטים (סוכר, CO2) מנוהלים ב-Material Specification קלה במקום Inspection Plan; ה-spec-limits מזינים ישירות את מאפייני-האצווה לעקיבות, בלי מבנה-פעולות מורכב.",
      navHe: [
        "Quality Management ► Quality Planning ► Logistics Master Data ► Material Specification ► Maintain (QS61)",
        "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Inspection with Material Specification",
      ],
      tables: ["QMAT", "QPMK", "AUSP", "KLAH"],
      tcodes: ["QS61", "QS62", "MM02"],
      fiori: ["F2410"],
      configHe: [
        "שייך MICs ל-Material ישירות (QS61) עם spec-limits.",
        "סמן Inspection-with-material-spec ב-Inspection Setup (QMAT).",
        "חבר ל-Batch Classification (class type 023) למעבר-תוצאות-לאצווה.",
      ],
      flow: [
        { he: "יצירת Material Spec", code: "QS61" },
        { he: "שיוך MICs + limits", code: "QPMK" },
        { he: "סימון ב-Inspection Setup", code: "QMAT" },
        { he: "מנת-בדיקה שואבת ישירות", code: "QA32" },
        { he: "עדכון מאפייני-אצווה", code: "AUSP" },
      ],
      masterDataHe: [
        "Material Specification = MICs↔Material ישירות (ללא task list).",
        "מחוברת ל-Batch Classification (class type 023).",
      ],
      mistakesHe: [
        "שימוש ב-Material Spec לבדיקות-מורכבות הדורשות פעולות/מרכזי-עבודה.",
        "אי-סימון Inspection-with-material-spec ב-Setup ➔ המנה לא-שואבת מ-Spec.",
        "ניהול אותם MICs גם ב-Spec וגם ב-Plan ➔ סתירה.",
      ],
      troubleshootHe: [
        "מנה ללא מאפיינים למרות Spec ➔ Inspection Setup לא-מסומן 'with material spec'.",
        "מאפייני-אצווה לא-מתעדכנים ➔ אין קישור ל-Batch Classification.",
        "סתירת-spec ➔ קיים גם Plan וגם Material Spec לאותו חומר.",
      ],
      bestPracticeHe: [
        "השתמש ב-Material Spec לבדיקות-פשוטות; ב-Plan למורכבות.",
        "חבר תמיד ל-Batch Classification לעקיבות.",
        "בחר Spec או Plan לחומר — לא שניהם לאותו מאפיין.",
      ],
      interviewHe: [
        { qHe: "מתי עדיף Material Specification על-פני Inspection Plan?", aHe: "כשהבדיקה פשוטה (רשימת-MICs ללא פעולות/מרכזי-עבודה) ורוצים תחזוקה קלה וחיבור-ישיר ל-Batch Classification." },
        { qHe: "כיצד מופעלת בדיקה לפי Material Spec?", aHe: "סימון 'Inspection with material specification' ב-Inspection Setup (QMAT); המנה שואבת את ה-MICs ישירות מה-Spec." },
      ],
      takeawaysHe: [
        "Material Spec = רשימת-MICs ישירה לחומר, ללא פעולות.",
        "קלה-לתחזוקה לבדיקות-פשוטות.",
        "מחוברת ישירות ל-Batch Classification.",
      ],
      relatedHe: [
        { labelHe: "QM · תכנית-בדיקה (2.11)", href: "/library/qm/chapter-02/#sub-2.11" },
        { labelHe: "QM · אב-אצווה (2.2.3)", href: "/library/qm/chapter-02/#sub-2.2.3" },
        { labelHe: "אובייקט · QMAT", href: "/library/qm/object/QMAT/" },
      ],
    },
    // ============================================================ 2.13
    {
      id: "2.13", titleHe: "סיכום", titleEn: "Summary",
      execHe:
        "תכנון-איכות הוא התשתית שעליה נשען כל ביצוע-איכות: הוא קובע מראש מה בודקים (MIC), איך בודקים (Inspection Method), כמה בודקים (Sampling Procedure), והיכן-וכיצד הכל מאוגד (Inspection Plan / Material Specification). תכנון-נכון = ביצוע-חלק; תכנון-לקוי = תקלות בכל מנת-בדיקה.",
      beginnerHe:
        "בפרק זה ראינו את כל לבני-הבסיס של תכנון-איכות: הפעלת QM באב-החומר, רשומות-האב, מאפייני-הבדיקה (MIC), שיטות-הבדיקה, נהלי-הדגימה, ותכנית-הבדיקה שמאגדת הכל. כשכל אלה מוגדרים נכון, כל בדיקה במפעל 'יודעת' בדיוק מה לעשות — בלי הפתעות.",
      consultantHe:
        "מבחינה-ארכיטקטונית: QMAT (Inspection Setup) הוא הטריגר; QPMK (MIC) + QPAC (Method) + QDPS (Sampling) הם לבני-הבסיס; PLKO/PLPO/PLMK (Inspection Plan) או Material Specification מאגדים אותם ומשייכים לחומר (MAPL); Catalogs (QS41/QS51) מספקים קודי-הערכה; Q-Info ו-Certificates מחברים לרכש/מכירה. הבנת זרימת-הבחירה (Inspection Type→Plan/Spec→MICs→Sampling) היא מפתח לאבחון-תקלות.",
      purposeHe:
        "לסכם את הפרק לכדי מפת-דרכים מעשית: מהיכן מתחילים (אב-חומר), מה בונים (MIC/Method/Sampling), כיצד מאגדים (Plan/Spec), וכיצד מחברים לרכש/מכירה (Q-Info/Certificates).",
      processExampleHe:
        "מסע-חומר מלא: מפעילים QM באב-החומר (Type 01); בונים MICs + Methods + Sampling; יוצרים Inspection Plan ומשייכים לחומר; מגדירים Q-Info לספק; בקבלה — נפתחת מנה אוטומטית עם כל המאפיינים, מוכנה לרישום-תוצאות ול-UD.",
      cbcHe:
        "ב-CBC תכנון-האיכות השלם למשקה: Inspection Setup ל-FERT (04+10); ספריית-MICs (Brix/pH/CO2/Micro/אריזה) עם Methods ו-Sampling; Inspection Plan עם פעולות-מעבדה וקו; Q-Info ו-COA לספק-התרכיז; הכל מוכן לפני אצוות-המילוי הראשונה.",
      navHe: [
        "Quality Management ► Quality Planning (כל ענפי-המשנה)",
        "Quality Management ► Basic Settings ► Maintain Settings at Plant Level",
      ],
      tables: ["QMAT", "QPMK", "QPMZ", "QPAC", "QDPS", "PLKO", "PLPO", "PLMK", "QINF"],
      tcodes: ["MM02", "QS21", "QS61", "QS51", "QP01", "QDV1", "QI01"],
      fiori: ["F1602A", "F2410", "F1421", "F1981"],
      configHe: [
        "זרימת-תכנון: Inspection Setup (QMAT) → MIC/Method/Sampling → Plan/Spec (MAPL) → Q-Info/Certificates.",
        "Catalogs (QS41/QS51) להערכות-איכותיות; Dynamic Modification לחומרת-דגימה.",
        "בחר Plan (מורכב) או Material Spec (פשוט) לפי-קריטיות-החומר.",
      ],
      mistakesHe: [
        "בניית-MICs ותכניות לפני הפעלת Inspection Setup ➔ אין מנות-בדיקה.",
        "MIC כ-Complete-copy במקום Reference ➔ אובדן עדכון-מרכזי.",
        "תכנית לא-released / חסר MAPL ➔ מנה ללא מאפיינים.",
        "הסכמי-איכות ללא תרגום ל-Q-Info/Certificates ➔ לא נאכפים.",
      ],
      troubleshootHe: [
        "אין מנת-בדיקה ➔ QMAT (Setup) לא-פעיל / Type לא-preferred.",
        "מנה ללא מאפיינים ➔ Plan לא-released / MAPL חסר / מחוץ-לתוקף / חסר Material Spec.",
        "אין גודל-מדגם ➔ Sampling Procedure לא-משויך ל-MIC.",
        "רכש לא-נחסם ➔ QM in Procurement / Q-Info לא-פעילים.",
      ],
      bestPracticeHe: [
        "תכנן בסדר-הנכון: Setup → לבני-בסיס → איגוד → חיבור-לוגיסטי.",
        "נהל ספריות מרכזיות (MIC/Method/Catalog/Sampling) ושבץ כ-Reference.",
        "תקנן Plan-vs-Spec לפי-קריטיות; חבר תמיד ל-Batch Classification.",
        "תרגם כל הסכם-איכות למנגנון-SAP אכיף.",
      ],
      interviewHe: [
        { qHe: "תאר את זרימת תכנון-האיכות מקצה-לקצה.", aHe: "מפעילים Inspection Setup (QMAT) באב-החומר; בונים MIC+Method+Sampling; מאגדים ב-Inspection Plan או Material Specification ומשייכים לחומר (MAPL); מחברים לרכש/מכירה דרך Q-Info ו-Certificates; בקבלה/ייצור/אספקה נפתחת מנה אוטומטית עם כל המאפיינים." },
        { qHe: "מהם שלושת הכשלים-הנפוצים שמונעים פתיחת-מנה תקינה?", aHe: "Inspection Setup לא-פעיל/לא-preferred (QMAT); Inspection Plan לא-released או ללא MAPL; ו-Sampling Procedure לא-משויך — שגורם למנה-ללא-מדגם." },
      ],
      takeawaysHe: [
        "תכנון-איכות = מה/איך/כמה/היכן בודקים, מוגדר מראש.",
        "QMAT טריגר; MIC/Method/Sampling לבני-בסיס; Plan/Spec מאגדים.",
        "Q-Info ו-Certificates מחברים את QM לרכש ולמכירה.",
        "הבנת זרימת-הבחירה היא המפתח לאבחון-תקלות.",
      ],
      relatedHe: [
        { labelHe: "QM · תצוגת QM באב-החומר (2.1)", href: "/library/qm/chapter-02/#sub-2.1" },
        { labelHe: "QM · תכנית-בדיקה (2.11)", href: "/library/qm/chapter-02/#sub-2.11" },
        { labelHe: "QM · ביצוע-בדיקה (פרק 3)", href: "/library/qm/chapter-03/" },
      ],
    },
  ],
};
