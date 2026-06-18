// ===== EWM Digital Textbook — Chapter 3 (gold-standard learning chapter) =====
// Quality Management Integration with SAP EWM via the QIE (Quality Inspection
// Engine). Every node is a complete LearningNode with 18 facets of authored
// Hebrew (beginner + consultant friendly). Source hierarchy preserved exactly.
// SAP identifiers verbatim EN; CBC = Coca-Cola bottling EWM inbound inspection.
import type { TextbookChapter } from "./types";

export const CH3: TextbookChapter = {
  n: 3,
  titleHe: "שילוב עם ניהול איכות (QM)",
  titleEn: "Quality Management Integration",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לשילוב ניהול-האיכות (Quality Management) עם SAP EWM. בניגוד ל-QM הקלאסי שעבד מול MM-IM, ב-EWM מנוע ייעודי בשם QIE (Quality Inspection Engine) מנהל את הבדיקות בתוך המחסן. כל תת-פרק הורחב ליחידה עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך מקצה-לקצה, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך (inbound→inspection→Usage Decision), טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: ללמוד את שילוב ה-QM ב-EWM ללא הספר המקורי, החל מבדיקת חומרי-גלם נכנסים, דרך בדיקות-מלאי תקופתיות ועד בדיקות החזרות-לקוח.",
  subchapters: [
    // ============================================================ 3.1
    {
      id: "3.1",
      titleHe: "סקירה כללית של ניהול איכות ב-SAP EWM",
      titleEn: "Overview of Quality Management in SAP EWM",
      execHe:
        "ניהול-האיכות ב-EWM מאפשר לעצור חומרים, להפנותם לבדיקה ולחסום אותם מפעולות-מחסן עד קבלת החלטת-שימוש (Usage Decision). בלב המנגנון עומד ה-QIE (Quality Inspection Engine) — מנוע משותף שמנהל את מסמכי-הבדיקה (Inspection Documents) בנפרד מ-QM הקלאסי. ללא שילוב QM תקין, סחורה שלא נבדקה עלולה להגיע ל-Putaway ולמלאי-חופשי, על כל סיכון-האיכות והרגולציה שבכך.",
      beginnerHe:
        "דמיין שכל משאית שמגיעה למחסן חייבת לעבור 'ביקורת איכות' לפני שמותר להכניס את הסחורה למדף. ה-QM ב-EWM הוא בדיוק זה: כשמגיעה אספקה, המערכת יכולה לפתוח 'מסמך בדיקה', לחסום את הכמות, ולחכות שאיש-איכות יבדוק דגימה ויחליט — 'מאושר' או 'נדחה'. רק אחרי ההחלטה הסחורה משוחררת או מוחזרת לספק. המנוע שמנהל את כל זה נקרא QIE.",
      consultantHe:
        "ב-EWM ה-QM אינו QM-IM הקלאסי. ה-QIE (Quality Inspection Engine) הוא שכבת-מנוע משותפת (משמשת גם CRM ו-SRM) המנהלת Inspection Documents לפי Inspection Object Type (IOT). שני ה-IOT המרכזיים: IOT 4 — בדיקה בהקשר Inbound Delivery (HU/Product/Batch), ו-IOT 5 — בדיקת מלאי במחסן (Warehouse-Internal). הקישור בין QIE ל-QM-הקלאסי נעשה דרך Inspection Rule (/SCWM/QRSETUP) שממפה IOT, Inspection Type ו-Q-stock; כשנדרשת בדיקה מבוססת-Inspection-Plan/Results, ה-QIE מייצר Inspection Lot ב-QM הקלאסי (QALS). הבדיקה ב-EWM מנהלת stock type Q (Quality stock) ב-Available Stock, וה-Usage Decision (/SCWM/QDISPLAY → UD) מעביר את הכמות ל-Unrestricted, Blocked או Returns. ראה את עומק ה-QM הקלאסי ב-/library/qm-academy/chapter-8/.",
      purposeHe:
        "המטרה: למנוע ממלאי-לא-בדוק להיכנס לזמינות, להבטיח עמידה ברגולציה ובמפרטי-איכות, ולנתב סחורה פגומה לחסימה/החזרה — הכול בתוך תהליכי-המחסן של EWM ובלי לשבור את אינטגרציית-המלאי מול S/4 (ERP).",
      processExampleHe:
        "אספקה נכנסת (Inbound Delivery) מגיעה ל-EWM. בעת ה-GR נבדק Inspection Rule: אם קיים כלל פעיל, ה-QIE פותח Inspection Document (IOT 4) וקובע stock type = Q. ה-Putaway מנתב את ה-HU לאזור-בדיקה/QA. איש-איכות שולף דגימה, מזין תוצאות (אם יש Inspection Plan — דרך QM הקלאסי), ומבצע Usage Decision: 'Accept' מעביר ל-Unrestricted ומאפשר Putaway ל-storage; 'Reject' מעביר ל-Blocked או יוצר Return Delivery לספק.",
      cbcHe:
        "ב-CBC (מילוי Coca-Cola) כל מכלית-תרכיז וכל מטען חומרי-אריזה נכנסים תחת Inspection Rule ל-IOT 4: בקבלה נפתח Inspection Document, הכמות יושבת ב-Q-stock באזור-QA, מעבדת-האיכות בודקת Brix/pH/מיקרוביולוגיה, ורק UD='Accept' משחרר את התרכיז לקו-המילוי. תרכיז שנכשל נחסם ומנותב להחזרה.",
      navHe: [
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Cross-Process Settings ► Quality Management ► Basics ► General Settings",
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Cross-Process Settings ► Quality Management ► Activate Quality Inspection per Warehouse/Document/Item Type",
        "Quality Management ► Quality Inspection Engine ► Basic Settings (QIE)",
      ],
      tables: ["/SCWM/ORDIM_O", "QALS", "/SCDL/DB_PROCH_O", "QIRRESULT", "QISR_LOG"],
      tcodes: ["/SCWM/QINSP", "/SCWM/QRSETUP", "/SCWM/QDISPLAY", "/SCWM/IM_DUMP", "QA32"],
      fiori: ["F2026", "F4072"],
      configHe: [
        "Activate QM per Warehouse: הפעלת ניהול-איכות לכל Warehouse Number — בלעדיה ה-QIE לא נכנס לתהליך.",
        "Inspection Object Type (IOT): בחירת ה-IOT הרלוונטיים (4 = Inbound Delivery, 5 = Warehouse-Internal Stock).",
        "Inspection Rule (/SCWM/QRSETUP): מיפוי IOT ↔ Inspection Type ↔ Q-stock ↔ Inspection-Plan-usage; תנאי-ההפעלה של הבדיקה.",
        "Number Ranges ל-Inspection Documents ב-QIE; קישור ל-QM-הקלאסי דרך Inspection Type (01/05/08/09).",
      ],
      flow: [
        { he: "אספקה נכנסת מגיעה", code: "Inbound Delivery", note: "ND/Goods Receipt" },
        { he: "בדיקת Inspection Rule", code: "/SCWM/QRSETUP", note: "האם נדרשת בדיקה?" },
        { he: "פתיחת מסמך-בדיקה", code: "QIE / IOT 4", note: "stock type = Q" },
        { he: "ניתוב לאזור-QA", code: "Putaway", note: "Q-stock" },
        { he: "החלטת-שימוש", code: "Usage Decision", note: "Accept/Reject" },
        { he: "שחרור / חסימה / החזרה", code: "/SCWM/QDISPLAY" },
      ],
      masterDataHe: [
        "אב-החומר: QM view + Inspection Setup (Inspection Type 01/05/0130…) קובע אילו בדיקות פעילות לחומר/מפעל.",
        "Inspection Plan (QM הקלאסי, QP01) + Master Inspection Characteristics (QS21) למקרי Results-Recording.",
        "Inspection Rule (/SCWM/QRSETUP) ברמת Warehouse — נתון-אב של ה-QIE עצמו.",
      ],
      mistakesHe: [
        "אי-הפעלת QM ל-Warehouse — אף Inspection Document לא נוצר, סחורה נכנסת ללא בדיקה.",
        "בלבול בין QM-IM הקלאסי ל-QIE — ניסיון לנהל בדיקות-EWM ב-QA32 בלבד.",
        "Inspection Rule חסר/לא-פעיל — GR מתבצע אך הכמות עוברת ישר ל-Unrestricted.",
        "Inspection Type שגוי באב-החומר — נפתחת בדיקה מסוג לא-נכון או לא נפתחת כלל.",
      ],
      troubleshootHe: [
        "לא נוצר Inspection Document ב-GR ➔ בדוק הפעלת-QM ל-Warehouse + Inspection Rule פעיל + Inspection Setup באב-החומר.",
        "סחורה ב-Q-stock אך אין UD אפשרי ➔ Inspection Document לא הושלם או חסר Inspection Type מקושר ל-QM הקלאסי.",
        "כמות לא משתחררת אחרי Accept ➔ בעיית עדכון QIE↔EWM stock; הרץ /SCWM/IM_DUMP לבדיקת חוסר-עקביות.",
        "UD בוצע אך המלאי לא עבר ל-Unrestricted ➔ Follow-up action / posting change לא הושלם.",
      ],
      bestPracticeHe: [
        "הפעל QM ל-Warehouse בשלב מוקדם והגדר Inspection Rules לכל IOT הנדרש.",
        "הפרד בבירור בין IOT 4 (קבלה) ל-IOT 5 (מלאי) — אל תערבב כללים.",
        "תאם Inspection Types בין QIE ל-QM-הקלאסי כדי שתוצאות ו-UD יזרמו נכון.",
        "השתמש ב-Q-stock ובאזור-QA ייעודי כדי למנוע ערבוב מלאי-בדוק עם לא-בדוק.",
      ],
      interviewHe: [
        { qHe: "מהו QIE וכיצד הוא שונה מ-QM-IM הקלאסי?", aHe: "QIE = Quality Inspection Engine — מנוע משותף המנהל Inspection Documents ב-EWM (וגם ב-CRM/SRM) דרך Inspection Object Types, בנפרד מ-QM-IM שעבד מול MM-IM. ב-EWM ה-QIE הוא נקודת-הכניסה; הוא יכול לייצר Inspection Lot ב-QM הקלאסי כשנדרשות תוצאות/Inspection Plan." },
        { qHe: "מה ההבדל בין IOT 4 ל-IOT 5?", aHe: "IOT 4 = בדיקה בהקשר Inbound Delivery (קבלה — HU/Product/Batch); IOT 5 = בדיקת מלאי פנים-מחסנית (Warehouse-Internal Stock Inspection)." },
        { qHe: "מהו תפקיד ה-Inspection Rule?", aHe: "כלי-הקונפיגורציה (/SCWM/QRSETUP) הקובע מתי וכיצד QIE פותח בדיקה — מיפוי IOT, Inspection Type, Q-stock ושימוש ב-Inspection Plan." },
      ],
      takeawaysHe: [
        "ב-EWM ה-QM מנוהל ע\"י QIE, לא ע\"י QM-IM הקלאסי.",
        "IOT 4 = קבלה, IOT 5 = מלאי-מחסן — שני סוגי-הבדיקה המרכזיים.",
        "Inspection Rule (/SCWM/QRSETUP) הוא מתג-ההפעלה של כל בדיקה.",
        "סחורה לא-בדוקה יושבת ב-Q-stock עד Usage Decision.",
      ],
      relatedHe: [
        { labelHe: "QM Academy · בדיקות-איכות (Chapter 8)", href: "/library/qm-academy/chapter-8/" },
        { labelHe: "EWM · קבלת סחורה (Inbound)", href: "/library/wm/chapter-02/" },
        { labelHe: "אובייקט · QALS", href: "/library/qm/object/QALS/" },
      ],
    },
    // ============================================================ 3.2
    {
      id: "3.2",
      titleHe: "בדיקת מוצר/אצווה לאספקות נכנסות",
      titleEn: "Inspection Product/Batch for Inbound Deliveries",
      execHe:
        "בדיקת מוצר/אצווה לאספקות נכנסות (IOT 4) היא תרחיש-הליבה של QM ב-EWM: כשסחורה מגיעה, נפתח מסמך-בדיקה ברמת Product או Batch, הכמות נחסמת ב-Q-stock, ואיש-איכות מקבל החלטת-שימוש לפני שהסחורה נכנסת למלאי-זמין. זהו השער שמונע כניסת חומרים פגומים לשרשרת.",
      beginnerHe:
        "כשהמשאית פורקת, המערכת בודקת לכל פריט: 'האם צריך לבדוק אותו?'. אם כן — נפתחת בדיקה, והסחורה ממתינה. הבדיקה יכולה להיות 'ברמת מוצר' (כל הכמות יחד) או 'ברמת אצווה' (כל Batch בנפרד, חשוב למזון/תרופות). רק אחרי שהבודק מאשר, הפריט הופך לזמין.",
      consultantHe:
        "ב-IOT 4 ה-QIE נקשר ל-Inbound Delivery item; ה-Inspection Document נוצר ב-GR או ב-receipt-notification לפי ה-Inspection Rule. רמת-הבדיקה (Product vs Batch) נקבעת מ-Batch-management של החומר ומה-Inspection Type. אם נדרש Results Recording, ה-QIE מייצר Inspection Lot ב-QM הקלאסי (QALS, origin 17/01). ה-Q-stock מנוהל ב-/SCWM stock separation; ה-Usage Decision מפעיל Follow-up actions (Posting Change ל-Unrestricted/Blocked, או Return). הבחנה חשובה: בדיקה-עם-Inspection-Rule (מבוססת מפרט) מול בדיקה ללא-כלל (החלטה ידנית בלבד).",
      purposeHe:
        "לוודא שכל אספקה נכנסת עומדת במפרט לפני שחרור למלאי-זמין; לנהל בדיקה ברזולוציה הנכונה (מוצר או אצווה); ולתעד תוצאות ל-Audit ולרגולציה.",
      processExampleHe:
        "אצוות חומר-גלם מנוהל-Batch מגיעה. ב-GR ה-QIE פותח Inspection Document ברמת-Batch, הכמות → Q-stock. בודק שולף דגימה לכל אצווה, רושם תוצאות מול Inspection Plan, וה-UD לכל אצווה מעביר ל-Unrestricted או חוסם בנפרד — כך אצווה אחת יכולה לעבור ואחרת להיכשל.",
      cbcHe:
        "ב-CBC חומרי-אריזה (פקקים, תוויות) נבדקים ברמת-Product, ואילו תרכיז וסירופ — מנוהלי-Batch — נבדקים ברמת-Batch כי כל אצווה נושאת תאריך-תפוגה ופרופיל-Brix נפרד. UD לכל אצווה משחרר רק את מה שעבר את מעבדת-CBC.",
      navHe: [
        "Extended Warehouse Management ► Cross-Process Settings ► Quality Management ► Inspection Object Types ► Inspection Object Type 4 (Inbound Delivery)",
        "Extended Warehouse Management ► Cross-Process Settings ► Quality Management ► Define Inspection Rules (/SCWM/QRSETUP)",
        "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Inspection for Goods Movements",
      ],
      tables: ["/SCDL/DB_PROCH_O", "QALS", "QAVE", "/SCWM/AQUA", "MCH1"],
      tcodes: ["/SCWM/QINSP", "/SCWM/QRSETUP", "/SCWM/QDISPLAY", "QA32", "QA11"],
      fiori: ["F2026", "F1989"],
      configHe: [
        "Activate IOT 4 ל-Warehouse + הקצאת Inspection-Document number range.",
        "Inspection Rule (/SCWM/QRSETUP): IOT 4, Inspection Type, רמת-בדיקה (Product/Batch), Q-stock, Plan-usage.",
        "מיפוי Inspection Type ל-QM הקלאסי (01 = GR מרכש, 0130 = מ-Production) ל-Results Recording.",
        "Follow-up actions ל-UD: Posting Change → Unrestricted/Blocked, או Return Delivery.",
      ],
      flow: [
        { he: "GR מ-Inbound Delivery", code: "IOT 4" },
        { he: "פתיחת Inspection Document", code: "QIE", note: "Product/Batch level" },
        { he: "כמות → Q-stock", code: "/SCWM/AQUA" },
        { he: "דגימה + תוצאות", code: "QA32", note: "אם יש Inspection Plan" },
        { he: "Usage Decision", code: "/SCWM/QDISPLAY" },
        { he: "Posting Change", code: "Unrestricted/Blocked/Return" },
      ],
      masterDataHe: [
        "Inspection Setup באב-החומר (QM view): Inspection Type 01/0130 פעיל, Inspection control.",
        "Batch master (MCH1) לבדיקות ברמת-אצווה; Inspection Plan (QP01) + MIC (QS21) ל-Results.",
        "Inspection Rule ל-IOT 4 ברמת Warehouse.",
      ],
      mistakesHe: [
        "רמת-בדיקה שגויה (Product במקום Batch) — אי-אפשר לאשר/לדחות אצווה בנפרד.",
        "Inspection Type 01 לא פעיל באב-החומר — לא נפתחת בדיקה ב-GR מרכש.",
        "שכחת Follow-up action ל-UD — UD בוצע אך הכמות נשארת ב-Q-stock.",
        "ערבוב מקור-אספקה (רכש מול ייצור) תחת אותו Inspection Rule.",
      ],
      troubleshootHe: [
        "אין Inspection Document ב-GR ➔ Inspection Type לא פעיל באב-החומר או Inspection Rule לא תואם את ה-IOT/מקור.",
        "UD אפשרי אך אין Posting Change ➔ Follow-up action חסר בקונפיגורציה.",
        "בדיקה נפתחה ברמת-Product למרות Batch-managed ➔ הגדרת-כלל שגויה / Batch determination כבוי.",
        "Inspection Lot לא נוצר ב-QM הקלאסי ➔ חוסר מיפוי Inspection Type בין QIE ל-QM.",
      ],
      bestPracticeHe: [
        "בחר רמת-בדיקה לפי ניהול-Batch של החומר — Batch למזון/תרופות.",
        "הגדר Follow-up actions מלאות לכל תוצאת-UD (Accept/Reject/Partial).",
        "השתמש ב-Inspection Plan + MIC לבדיקות מבוססות-מפרט, לא רק החלטה ידנית.",
        "הפרד כללי IOT 4 לפי מקור-אספקה (External Procurement מול Production).",
      ],
      interviewHe: [
        { qHe: "מתי בדיקה נפתחת ברמת-Batch לעומת רמת-Product?", aHe: "רמת-Batch כשהחומר מנוהל-אצווה וה-Inspection Rule/Type מורה כך — מאפשר UD נפרד לכל אצווה; אחרת רמת-Product לכל הכמות יחד." },
        { qHe: "כיצד QIE מתחבר ל-QM הקלאסי בבדיקת-קבלה?", aHe: "כשנדרש Results Recording, ה-QIE מייצר Inspection Lot (QALS) עם Inspection Type ממופה (01 מרכש), והתוצאות/UD מנוהלים מול Inspection Plan ב-QM הקלאסי." },
        { qHe: "מה קורה למלאי בין ה-GR ל-UD?", aHe: "הוא יושב ב-Q-stock (Quality stock), חסום לזמינות, לרוב באזור-QA ייעודי, עד שה-Usage Decision מבצע Posting Change." },
      ],
      takeawaysHe: [
        "IOT 4 = בדיקת מוצר/אצווה לאספקות נכנסות.",
        "רמת-הבדיקה (Product/Batch) נגזרת מניהול-Batch ומה-Inspection Rule.",
        "QIE מייצר Inspection Lot ב-QM הקלאסי כשנדרשות תוצאות.",
        "UD מפעיל Follow-up action שמעביר את ה-Q-stock ליעדו.",
      ],
      relatedHe: [
        { labelHe: "QM Academy · בדיקות-איכות (Chapter 8)", href: "/library/qm-academy/chapter-8/" },
        { labelHe: "EWM · בדיקות-מלאי (3.3)", href: "/library/wm/chapter-03/#sub-3.3" },
        { labelHe: "אובייקט · QALS", href: "/library/qm/object/QALS/" },
      ],
      children: [
        {
          id: "3.2.1",
          titleHe: "בדיקה לאחר קבלת סחורה מרכש חיצוני (עם Inspection Rule)",
          titleEn: "Inspection after Goods Receipt from External Procurement (With Inspection Rule)",
          execHe:
            "התרחיש הנפוץ ביותר: סחורה מגיעה מספק חיצוני (PO → Inbound Delivery), וב-GR מופעל Inspection Rule שפותח בדיקת IOT 4 עם Inspection Type 01. הכמות נחסמת ב-Q-stock עד החלטת-שימוש — שער-האיכות הראשון מול ספקים.",
          beginnerHe:
            "קנינו חומר מספק; כשהוא מגיע, מערכת-האיכות אומרת 'רגע, צריך לבדוק שהספק שלח טוב'. נפתחת בדיקה, הסחורה ממתינה, בודקים, ומחליטים — לאשר ולהכניס למלאי, או לדחות ולהחזיר לספק.",
          consultantHe:
            "ה-Inspection Rule ל-IOT 4 בודק את התנאי (Inspection Type 01 = GR from Purchasing פעיל באב-החומר). ב-GR מ-Inbound Delivery ה-QIE פותח Inspection Document ומייצר Inspection Lot (QALS, origin 01) ב-QM הקלאסי כשיש Inspection Plan. הכמות → Q-stock. ה-UD מפעיל Posting Change ל-Unrestricted, או Return-to-vendor דרך Return Delivery. תוצאות-הבדיקה מזינות גם את הערכת-הספקים (Vendor Evaluation).",
          purposeHe:
            "להבטיח שחומרים נרכשים עומדים במפרט לפני תשלום וכניסה לזמינות, ולהזין נתוני-איכות להערכת-ספקים ולתביעות-איכות.",
          processExampleHe:
            "PO לחומר-גלם → Inbound Delivery → GR ב-EWM. Inspection Rule פעיל ⇒ Inspection Document (IOT 4, Type 01), Q-stock. בודק רושם תוצאות ב-QA32 מול Inspection Plan; UD='Accept' ⇒ Posting Change ל-Unrestricted ו-Putaway; UD='Reject' ⇒ Return Delivery לספק.",
          cbcHe:
            "ב-CBC תרכיז מספק-חוץ מגיע תחת Inspection Rule זה: מעבדת-CBC בודקת מול מפרט-Coca-Cola, ורק UD='Accept' משחרר את התרכיז לקו. כישלון יוצר Return-to-vendor ותביעת-איכות.",
          navHe: [
            "Extended Warehouse Management ► Cross-Process Settings ► Quality Management ► Define Inspection Rules (/SCWM/QRSETUP) ► IOT 4",
            "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Inspection at Goods Receipt ► Inspection Type 01",
            "Materials Management ► Inventory Management ► Goods Receipt (settings feeding EWM ND)",
          ],
          tables: ["QALS", "QAVE", "/SCDL/DB_PROCH_O", "EKPO", "MSEG"],
          tcodes: ["/SCWM/QRSETUP", "/SCWM/QDISPLAY", "QA32", "QA11", "/SCWM/PRDI"],
          fiori: ["F2026", "F1989"],
          configHe: [
            "Inspection Rule (/SCWM/QRSETUP): IOT 4, Inspection Type 01, source = External Procurement, Q-stock = yes.",
            "Inspection Setup באב-החומר: Type 01 פעיל, Inspection control (auto lot, post to insp. stock).",
            "Follow-up: UD Accept → Posting Change Unrestricted; UD Reject → Return Delivery (/SCWM/PRDI).",
          ],
          flow: [
            { he: "PO → Inbound Delivery", code: "GR" },
            { he: "Inspection Rule פעיל?", code: "/SCWM/QRSETUP", note: "Type 01" },
            { he: "Inspection Document + Lot", code: "QALS origin 01" },
            { he: "Q-stock", code: "/SCWM/AQUA" },
            { he: "Results + UD", code: "QA32 / QDISPLAY" },
            { he: "Unrestricted או Return", code: "Posting Change" },
          ],
          masterDataHe: [
            "Inspection Type 01 פעיל ב-QM view של אב-החומר.",
            "Inspection Plan (QP01) ל-Results מבוססי-מפרט; Inspection Rule ל-IOT 4.",
          ],
          mistakesHe: [
            "Type 01 לא פעיל באב-החומר — אין בדיקה ב-GR מרכש.",
            "מקור לא-נכון ב-Inspection Rule — הכלל לא מופעל לקבלה מרכש.",
            "אי-הגדרת Return Delivery כ-Follow-up ל-Reject — סחורה פגומה תקועה ב-Blocked.",
          ],
          troubleshootHe: [
            "אין Lot ב-GR מרכש ➔ Type 01 לא פעיל / Inspection Rule לא תואם source חיצוני.",
            "Reject לא יוצר החזרה ➔ Follow-up Return Delivery חסר.",
            "תוצאות לא מוזנות ל-Vendor Evaluation ➔ קישור QM↔Vendor Evaluation לא מוגדר.",
          ],
          bestPracticeHe: [
            "הפרד Inspection Rule לרכש-חיצוני (Type 01) מבדיקת-ייצור.",
            "חבר תוצאות ל-Vendor Evaluation לניהול-ספקים מבוסס-נתונים.",
            "הגדר Return Delivery אוטומטי ל-UD שלילי.",
          ],
          interviewHe: [
            { qHe: "מהו Inspection Type 01?", aHe: "Inspection at goods receipt from purchasing — מפעיל בדיקה אוטומטית בקבלת-סחורה מספק חיצוני." },
            { qHe: "מה קורה ב-UD='Reject' בקבלה מרכש?", aHe: "Follow-up action מנתב ל-Blocked או יוצר Return Delivery לספק, ותוצאות-הכישלון מזינות הערכת-ספק/תביעת-איכות." },
          ],
          takeawaysHe: [
            "בדיקת-רכש = IOT 4 + Inspection Type 01 דרך Inspection Rule.",
            "Q-stock עד UD; Accept→Unrestricted, Reject→Return.",
            "תוצאות מזינות הערכת-ספקים.",
          ],
          relatedHe: [
            { labelHe: "QM Academy · Chapter 8", href: "/library/qm-academy/chapter-8/" },
          ],
        },
        {
          id: "3.2.2",
          titleHe: "דגימה מוקדמת בייצור או בדיקה לאחר קבלת סחורה מייצור",
          titleEn: "Pre-Sampling in Production or Inspection after Goods Receipt from Production",
          execHe:
            "כשהמחסן מקבל תוצרת מהייצור, אפשר לבדוק אותה בשני אופנים: דגימה-מוקדמת (Pre-Sampling) עוד בזמן הייצור — לפני שה-GR למחסן מתבצע — או בדיקה רגילה לאחר GR מ-Production (Inspection Type 04/0130). שתי הגישות מבטיחות שמוצרים מיוצרים עומדים במפרט לפני כניסה למלאי.",
          beginnerHe:
            "המוצרים שאנחנו בעצמנו מייצרים גם צריכים בדיקת-איכות. אפשר לבדוק 'תוך-כדי' הייצור (Pre-Sampling — לוקחים דגימה כבר על הקו), או לבדוק 'אחרי' שהמוצר נכנס למחסן. כך תופסים בעיה מוקדם ולא משחררים מוצר פגום ללקוח.",
          consultantHe:
            "Pre-Sampling: ה-Inspection Document/Lot נוצר ומדגמים כבר במהלך ה-Production Order, כך שה-Results מוכנים בעת ה-GR; שימושי לקיצור-זמן-שחרור. לחלופין Inspection Type 04 (GR from production) או 0130 פותח בדיקה ב-GR למחסן. ב-EWM ה-IOT 4 חל גם על Inbound Delivery מ-Production; ה-QIE מקשר ל-Inspection Lot (QALS origin 04). UD מעביר את ה-Q-stock ל-Unrestricted/Blocked. ההבחנה: Pre-Sampling מבוצע מול ה-Production Order לפני ה-Putaway; בדיקה-לאחר-GR מבוצעת על המלאי שכבר התקבל.",
          purposeHe:
            "לקצר את זמן-השחרור של תוצרת-עצמית (Pre-Sampling) או לאמת מוצר-מיוצר מול מפרט לפני שחרור (GR-inspection), ולמנוע שחרור פגומים ללקוח.",
          processExampleHe:
            "Pre-Sampling: בזמן ה-Production Order נלקחת דגימה ונרשמות תוצאות; כשהמוצר מגיע ב-GR למחסן ה-UD כבר זמין ⇒ שחרור מיידי ל-Unrestricted. חלופה: GR ללא Pre-Sampling ⇒ Inspection Type 04 פותח בדיקה, Q-stock, ואז UD.",
          cbcHe:
            "ב-CBC משקה מוגמר מקו-המילוי נבדק ב-Pre-Sampling: דגימות Brix/CO2/חזותי נלקחות על הקו, וכשהמשטחים נכנסים ל-GR ל-EWM ה-UD כבר מאושר — שחרור מהיר להפצה; כישלון חוסם את המשטח ב-Blocked.",
          navHe: [
            "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Inspection at GR from Production (Type 04)",
            "Quality Management ► Quality Inspection ► Sample Management ► Pre-Sampling in Production",
            "Extended Warehouse Management ► Cross-Process Settings ► Quality Management ► Inspection Rules (/SCWM/QRSETUP) ► IOT 4 (Production source)",
          ],
          tables: ["QALS", "QASE", "AFKO", "AFPO", "/SCDL/DB_PROCH_O"],
          tcodes: ["/SCWM/QRSETUP", "/SCWM/QDISPLAY", "QA32", "QGA2", "CO11N"],
          fiori: ["F2026", "F3404"],
          configHe: [
            "Inspection Type 04/0130 פעיל באב-החומר ל-GR from production.",
            "Pre-Sampling: הפעלת Sample-Management ב-Inspection Plan + Sampling Procedure (QDP1).",
            "Inspection Rule ל-IOT 4 עם source = Production; Follow-up Posting Change.",
          ],
          flow: [
            { he: "Production Order רץ", code: "CO11N" },
            { he: "Pre-Sampling (אופציונלי)", code: "QGA2", note: "דגימה על הקו" },
            { he: "GR למחסן (Inbound)", code: "IOT 4 / Type 04" },
            { he: "Q-stock", code: "/SCWM/AQUA" },
            { he: "Usage Decision", code: "/SCWM/QDISPLAY" },
            { he: "Unrestricted / Blocked", code: "Posting Change" },
          ],
          masterDataHe: [
            "Inspection Type 04/0130 ב-QM view; Inspection Plan עם Sampling Procedure ל-Pre-Sampling.",
            "Production Version/Routing מקשר את נקודות-הדגימה לקו.",
          ],
          mistakesHe: [
            "Pre-Sampling מוגדר אך אין Sampling Procedure — דגימה לא נרשמת.",
            "Type 04 לא פעיל — מוצר-מיוצר נכנס ללא בדיקה.",
            "כפל-בדיקה: גם Pre-Sampling וגם GR-inspection לאותו אובדן-זמן/דגימה.",
          ],
          troubleshootHe: [
            "אין בדיקה ב-GR מייצור ➔ Type 04/0130 לא פעיל או Inspection Rule לא תואם source=Production.",
            "Pre-Sampling לא יוצר Results ➔ Sampling Procedure / Sample-Management כבוי ב-Plan.",
            "שחרור איטי למרות Pre-Sampling ➔ Lot לא נסגר לפני GR; בדוק תזמון-רישום-תוצאות.",
          ],
          bestPracticeHe: [
            "השתמש ב-Pre-Sampling לקיצור-זמן-שחרור במוצרים רגישים-זמן (משקאות טריים).",
            "בחר גישה אחת — Pre-Sampling או GR-inspection — כדי למנוע כפל.",
            "תאם נקודות-דגימה עם ה-Routing של הייצור.",
          ],
          interviewHe: [
            { qHe: "מה היתרון של Pre-Sampling?", aHe: "התוצאות נאספות כבר בזמן הייצור, כך שה-Usage Decision זמין כמעט מיד עם ה-GR למחסן — שחרור מהיר של תוצרת רגישת-זמן." },
            { qHe: "איזה Inspection Type משמש בקבלה מייצור?", aHe: "Inspection Type 04 (GR from production) — או 0130 בתצורות S/4 — מפעיל בדיקה אוטומטית בקבלת תוצרת-עצמית למחסן." },
          ],
          takeawaysHe: [
            "Pre-Sampling = דגימה תוך-כדי-ייצור לשחרור מהיר.",
            "GR-inspection מייצור = Inspection Type 04/0130 דרך IOT 4.",
            "שתי הגישות עוצרות פגומים לפני כניסה לזמינות.",
          ],
          relatedHe: [
            { labelHe: "QM Academy · Chapter 8", href: "/library/qm-academy/chapter-8/" },
          ],
        },
      ],
    },
    // ============================================================ 3.3
    {
      id: "3.3",
      titleHe: "בדיקות מלאי במחסן",
      titleEn: "Warehouse Stock Inspections",
      execHe:
        "בדיקות-מלאי במחסן (IOT 5) הן בדיקות-איכות על מלאי שכבר נמצא במחסן — לא בקבלה. הן כוללות בדיקות-מלאי יזומות, בדיקות-תקופתיות חוזרות (Recurring), ובדיקות החזרות-לקוח. המנגנון מאפשר לחסום מלאי קיים, לדגום ולהחליט-שימוש מחדש בלי קליטה חדשה.",
      beginnerHe:
        "לפעמים צריך לבדוק סחורה שכבר שוכבת במחסן — למשל לבדוק שוב חומר שתאריך-התפוגה שלו מתקרב, או לבדוק החזרה מלקוח. ה-IOT 5 מאפשר לפתוח בדיקה על מלאי-קיים, לחסום אותו זמנית, לבדוק, ולהחליט מה לעשות איתו — בלי שזו תהיה קבלה חדשה.",
      consultantHe:
        "IOT 5 (Warehouse-Internal Inspection) פותח Inspection Document על Stock קיים (HU/Product/Batch) במחסן. שלא כמו IOT 4, אין Inbound Delivery — הטריגר הוא ידני, מבוסס-כלל, או תקופתי. ה-QIE חוסם/מעביר את הכמות ל-Q-stock, ומאפשר Results ו-UD. תרחישים: Stock Inspection (יזומה/מבוססת-כלל), Recurring Inspection (לפי Inspection Interval באב-החומר/Batch), ו-Customer Return דרך Advanced Returns Management (ARM). ה-UD מנתב ל-Unrestricted, Blocked, Scrapping או Return.",
      purposeHe:
        "לאפשר בקרת-איכות מתמשכת על מלאי-קיים — תפוגה, בדיקות-תקופתיות רגולטוריות, וטיפול בהחזרות — בלי לתלות זאת רק בנקודת-הקבלה.",
      processExampleHe:
        "חומר מנוהל-Batch מתקרב ל-Recurring Inspection Date. ה-QIE פותח אוטומטית Inspection Document (IOT 5), חוסם את האצווה ל-Q-stock, בודק מזין תוצאות, וה-UD מאריך תוקף (חזרה ל-Unrestricted) או מנתב ל-Scrapping.",
      cbcHe:
        "ב-CBC תרכיז מאוחסן מעל זמן-סף עובר Recurring Inspection (IOT 5): המעבדה בודקת שוב Brix ומיקרוביולוגיה; UD='Accept' מאריך את האצווה לזמינות, אחרת Scrapping. החזרות מלקוחות-הפצה נבדקות תחת ARM.",
      navHe: [
        "Extended Warehouse Management ► Cross-Process Settings ► Quality Management ► Inspection Object Types ► IOT 5 (Warehouse-Internal)",
        "Extended Warehouse Management ► Cross-Process Settings ► Quality Management ► Define Inspection Rules (/SCWM/QRSETUP)",
        "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Recurring Inspection / Stock Inspection",
      ],
      tables: ["QALS", "/SCWM/AQUA", "MCH1", "MCHA", "/SCDL/DB_PROCH_O"],
      tcodes: ["/SCWM/QINSP", "/SCWM/QRSETUP", "/SCWM/QDISPLAY", "QA32", "QA07"],
      fiori: ["F2026", "F4072"],
      configHe: [
        "Activate IOT 5 ל-Warehouse + number range ל-Inspection Documents.",
        "Inspection Rules ל-IOT 5: stock-inspection, recurring, customer-return — כלל לכל תרחיש.",
        "Inspection Interval באב-החומר/Batch ל-Recurring; Sampling Procedure ל-Results.",
        "Follow-up actions: Unrestricted / Blocked / Scrapping / Return.",
      ],
      flow: [
        { he: "מלאי קיים במחסן", code: "Q/Unrestricted" },
        { he: "טריגר (ידני/כלל/תקופתי)", code: "IOT 5" },
        { he: "Inspection Document + Q-stock", code: "QIE" },
        { he: "דגימה + תוצאות", code: "QA32" },
        { he: "Usage Decision", code: "/SCWM/QDISPLAY" },
        { he: "Unrestricted/Blocked/Scrap/Return", code: "Posting Change" },
      ],
      masterDataHe: [
        "Inspection Interval + Next Inspection Date ב-Batch master (MCHA) ל-Recurring.",
        "Inspection Setup באב-החומר (Inspection Type 09 לבדיקות-מלאי/Recurring).",
        "Inspection Rules ל-IOT 5 ברמת Warehouse.",
      ],
      mistakesHe: [
        "בלבול IOT 5 עם IOT 4 — ניסיון לבדוק מלאי-קיים דרך כלל-קבלה.",
        "Inspection Interval לא מתוחזק ב-Batch — Recurring לא מופעל.",
        "אי-הגדרת Scrapping כ-Follow-up — מלאי-תפוג תקוע ב-Blocked.",
      ],
      troubleshootHe: [
        "Recurring לא נפתח ➔ Next Inspection Date / Interval חסר ב-Batch, או QA07 לא רץ.",
        "לא ניתן לחסום מלאי-קיים ➔ Inspection Rule ל-IOT 5 חסר/לא-פעיל.",
        "UD לא משחרר/גורט ➔ Follow-up action חסר לתרחיש.",
      ],
      bestPracticeHe: [
        "תזמן את QA07 לבדיקות-תקופתיות אוטומטיות.",
        "הגדר Inspection Rule נפרד לכל תרחיש IOT 5 (stock/recurring/return).",
        "ודא Follow-up Scrapping למלאי-תפוג כדי לא להשאירו תקוע.",
      ],
      interviewHe: [
        { qHe: "במה IOT 5 שונה מ-IOT 4?", aHe: "IOT 5 פועל על מלאי שכבר במחסן (ללא Inbound Delivery), בטריגר ידני/מבוסס-כלל/תקופתי; IOT 4 פועל בקבלה מאספקה נכנסת." },
        { qHe: "אילו תרחישי IOT 5 קיימים?", aHe: "בדיקות-מלאי יזומות (Stock Inspections), בדיקות-תקופתיות חוזרות (Recurring), ובדיקות החזרות-לקוח דרך ARM." },
      ],
      takeawaysHe: [
        "IOT 5 = בדיקת מלאי-קיים במחסן.",
        "שלושה תרחישים: Stock, Recurring, Customer-Return.",
        "Recurring מבוסס Inspection Interval ב-Batch (QA07).",
        "UD מנתב ל-Unrestricted/Blocked/Scrap/Return.",
      ],
      relatedHe: [
        { labelHe: "QM Academy · Chapter 8", href: "/library/qm-academy/chapter-8/" },
        { labelHe: "EWM · בדיקות-קבלה (3.2)", href: "/library/wm/chapter-03/#sub-3.2" },
      ],
      children: [
        {
          id: "3.3.1",
          titleHe: "בדיקות מלאי (עם Inspection Rules)",
          titleEn: "Stock Inspections (With Inspection Rules)",
          execHe:
            "בדיקות-מלאי יזומות (IOT 5) מאפשרות לבדוק מלאי-קיים על-פי Inspection Rule — למשל בעקבות תלונה, חשד-איכות, או בקרה-מדגמית. ה-QIE פותח Inspection Document על ה-Stock הקיים, חוסם ל-Q-stock, ומאפשר UD.",
          beginnerHe:
            "נניח שהתעורר חשד שמשהו לא בסדר עם מלאי מסוים. אפשר לפתוח עליו בדיקה גם אם הוא כבר שוכב במחסן זמן רב. המערכת חוסמת אותו זמנית, בודקים, ומחליטים — להחזיר לזמין או לחסום.",
          consultantHe:
            "Stock Inspection ב-IOT 5 מופעלת לפי Inspection Rule (stock-inspection scenario). הטריגר יכול להיות ידני (/SCWM/QINSP) או מבוסס-אירוע. ה-QIE יוצר Inspection Document על ה-stock element (HU/Product/Batch), מעביר ל-Q-stock, ומקשר ל-Inspection Lot (QALS) אם יש Plan. UD מחזיר ל-Unrestricted או מנתב ל-Blocked/Scrapping. שלא כמו Recurring — אין תזמון-אוטומטי-תקופתי, אלא הפעלה ייעודית.",
          purposeHe:
            "לאפשר בדיקת-איכות נקודתית על מלאי-קיים בעת חשד/תלונה/בקרה, בלי תלות בקבלה או בלוח-זמנים תקופתי.",
          processExampleHe:
            "התקבלה תלונה על אצווה. איש-איכות פותח Stock Inspection (IOT 5) על האצווה דרך /SCWM/QINSP; האצווה → Q-stock; בודק רושם תוצאות; UD='Accept' מחזיר ל-Unrestricted או 'Reject' חוסם/גורט.",
          cbcHe:
            "ב-CBC חשד-זיהום באצוות-תרכיז מסוימת מפעיל Stock Inspection ידנית: המעבדה בודקת מיקרוביולוגיה, וה-UD מחליט אם להחזיר לזמינות או לגרוט את האצווה.",
          navHe: [
            "Extended Warehouse Management ► Cross-Process Settings ► Quality Management ► Inspection Rules (/SCWM/QRSETUP) ► IOT 5 ► Stock Inspection",
            "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Manual Inspection (Type 09)",
          ],
          tables: ["QALS", "/SCWM/AQUA", "MCH1", "/SCDL/DB_PROCH_O"],
          tcodes: ["/SCWM/QINSP", "/SCWM/QRSETUP", "/SCWM/QDISPLAY", "QA32"],
          fiori: ["F2026", "F4072"],
          configHe: [
            "Inspection Rule ל-IOT 5, scenario = stock inspection; Q-stock = yes.",
            "Inspection Type 09 (manual/stock) פעיל באב-החומר; Sampling/Plan אופציונלי.",
            "Follow-up: UD → Unrestricted / Blocked / Scrapping.",
          ],
          flow: [
            { he: "טריגר ידני/אירוע", code: "/SCWM/QINSP" },
            { he: "Inspection Document (IOT 5)", code: "QIE" },
            { he: "מלאי → Q-stock", code: "/SCWM/AQUA" },
            { he: "תוצאות + UD", code: "QA32 / QDISPLAY" },
            { he: "Unrestricted / Blocked / Scrap", code: "Posting Change" },
          ],
          masterDataHe: [
            "Inspection Type 09 ב-QM view; Inspection Rule ל-IOT 5 (stock scenario).",
          ],
          mistakesHe: [
            "Inspection Rule ל-stock-scenario חסר — אי-אפשר לפתוח בדיקה ידנית על מלאי.",
            "אי-חסימה ל-Q-stock — מלאי-חשוד נשאר זמין למשיכה בזמן הבדיקה.",
          ],
          troubleshootHe: [
            "לא ניתן לפתוח Stock Inspection ➔ Inspection Rule ל-IOT 5 חסר/לא-פעיל.",
            "מלאי נמשך בזמן בדיקה ➔ הבדיקה לא העבירה ל-Q-stock; בדוק Follow-up/stock-type.",
          ],
          bestPracticeHe: [
            "תעד טריגר-עסקי לכל Stock Inspection (תלונה/חשד).",
            "ודא העברה ל-Q-stock כדי לחסום משיכה במהלך הבדיקה.",
          ],
          interviewHe: [
            { qHe: "מתי משתמשים ב-Stock Inspection?", aHe: "כשצריך לבדוק מלאי-קיים נקודתית — חשד-איכות, תלונה או בקרה-מדגמית — בלי קבלה חדשה ובלי לוח-זמנים תקופתי." },
          ],
          takeawaysHe: [
            "Stock Inspection = בדיקה יזומה על מלאי-קיים (IOT 5).",
            "טריגר ידני/אירוע, לא תקופתי.",
            "המלאי עובר ל-Q-stock עד UD.",
          ],
          relatedHe: [{ labelHe: "QM Academy · Chapter 8", href: "/library/qm-academy/chapter-8/" }],
        },
        {
          id: "3.3.2",
          titleHe: "בדיקות תקופתיות חוזרות (עם Inspection Rules)",
          titleEn: "Recurring Inspections (With Inspection Rules)",
          execHe:
            "בדיקות-תקופתיות חוזרות (Recurring) בודקות אוטומטית מלאי-קיים במרווחי-זמן קבועים — לפי Inspection Interval ב-Batch/אב-החומר. כשמגיע Next Inspection Date, ה-QIE פותח בדיקת IOT 5, חוסם ל-Q-stock, וה-UD מאריך תוקף או גורט. קריטי למלאי עם זמן-מדף.",
          beginnerHe:
            "חומרים מסוימים צריכים בדיקה כל כמה חודשים כל עוד הם במלאי — כמו 'בדיקת-רענון'. המערכת זוכרת מתי הבדיקה הבאה אמורה לקרות, ואז פותחת בדיקה אוטומטית. אם החומר עדיין תקין — מאריכים את תוקפו; אם לא — גורטים.",
          consultantHe:
            "Recurring Inspection מבוססת Inspection Interval (באב-החומר QM view) ו-Next Inspection Date ב-Batch master (MCHA). תוכנית-רקע (QA07 / Deadline Monitoring) מזהה אצוות שהגיע מועדן ומפעילה את ה-QIE ליצירת Inspection Document (IOT 5, Inspection Type 09). UD='Accept' מעדכן Next Inspection Date קדימה (מאריך תוקף) ומחזיר ל-Unrestricted; כישלון מנתב ל-Scrapping/Blocked. שונה מ-Stock Inspection בכך שהיא מתוזמנת-אוטומטית ומחזורית.",
          purposeHe:
            "להבטיח שמלאי ארוך-טווח נשאר במפרט לאורך-זמן — דרישה רגולטורית במזון/תרופות/כימיה — ולמנוע שחרור חומר שפג-תוקפו.",
          processExampleHe:
            "QA07 רץ לילית, מזהה אצוות שהגיע Next Inspection Date. לכל אחת נפתח Inspection Document (IOT 5); האצווה → Q-stock; בדיקה ⇒ UD. 'Accept' דוחף את Next Inspection Date קדימה ומחזיר ל-Unrestricted; 'Reject' → Scrapping.",
          cbcHe:
            "ב-CBC תרכיז המאוחסן מעבר ל-X חודשים מקבל Recurring Inspection: QA07 פותח בדיקה, המעבדה בודקת Brix/מיקרוביולוגיה, ו-UD מאריך את תוקף-האצווה לזמינות או גורט אם נפסל.",
          navHe: [
            "Extended Warehouse Management ► Cross-Process Settings ► Quality Management ► Inspection Rules (/SCWM/QRSETUP) ► IOT 5 ► Recurring Inspection",
            "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Recurring Inspection ► Deadline Monitoring (QA07)",
            "Logistics – General ► Batch Management ► (Next Inspection Date settings)",
          ],
          tables: ["QALS", "MCHA", "MCH1", "/SCWM/AQUA"],
          tcodes: ["QA07", "/SCWM/QRSETUP", "/SCWM/QDISPLAY", "QA32", "MSC2N"],
          fiori: ["F2026", "F4072"],
          configHe: [
            "Inspection Interval + Inspection Type 09 ב-QM view של אב-החומר.",
            "Next Inspection Date מתוחזק ב-Batch master (MSC2N / MCHA).",
            "Inspection Rule ל-IOT 5 scenario = recurring; QA07 מתוזמן ברקע.",
            "Follow-up: Accept → push Next Date + Unrestricted; Reject → Scrapping.",
          ],
          flow: [
            { he: "QA07 deadline monitoring", code: "QA07", note: "מתוזמן ברקע" },
            { he: "אצווה הגיעה ל-Next Date", code: "MCHA" },
            { he: "Inspection Document (IOT 5)", code: "QIE / Type 09" },
            { he: "Q-stock + בדיקה", code: "QA32" },
            { he: "UD", code: "/SCWM/QDISPLAY" },
            { he: "Push Next Date / Scrap", code: "Follow-up" },
          ],
          masterDataHe: [
            "Inspection Interval (אב-החומר) + Next Inspection Date (Batch, MCHA).",
            "Inspection Type 09 ל-Recurring; Inspection Plan/Sampling ל-Results.",
          ],
          mistakesHe: [
            "Inspection Interval לא מתוחזק — Recurring לעולם לא מופעל.",
            "QA07 לא מתוזמן — מועדי-בדיקה עוברים בלי טריגר.",
            "UD='Accept' לא דוחף Next Date — האצווה תיבדק שוב מיד.",
          ],
          troubleshootHe: [
            "Recurring לא נפתח ➔ Interval/Next Date חסר ב-Batch, או QA07 לא רץ.",
            "אצווה נבדקת שוב ושוב ➔ Follow-up לא מעדכן Next Inspection Date.",
            "מלאי-תפוג לא נגרט ➔ Follow-up Scrapping חסר ל-UD שלילי.",
          ],
          bestPracticeHe: [
            "תזמן QA07 קבוע (לילי) ל-Deadline Monitoring.",
            "ודא ש-Accept דוחף את Next Inspection Date קדימה לפי ה-Interval.",
            "הגדר Scrapping אוטומטי לכישלון Recurring.",
          ],
          interviewHe: [
            { qHe: "מה מפעיל Recurring Inspection?", aHe: "תוכנית Deadline Monitoring (QA07) שמזהה אצוות שהגיע Next Inspection Date שלהן (לפי Inspection Interval), ופותחת Inspection Document IOT 5 אוטומטית." },
            { qHe: "מה קורה ל-Next Inspection Date אחרי UD='Accept'?", aHe: "הוא נדחף קדימה לפי ה-Inspection Interval, כך שהאצווה נשארת זמינה עד מועד-הבדיקה הבא." },
          ],
          takeawaysHe: [
            "Recurring = בדיקה תקופתית אוטומטית של מלאי-קיים.",
            "מבוססת Inspection Interval + Next Inspection Date (QA07).",
            "Accept דוחף את Next Date; Reject גורט.",
          ],
          relatedHe: [{ labelHe: "QM Academy · Chapter 8", href: "/library/qm-academy/chapter-8/" }],
        },
        {
          id: "3.3.3",
          titleHe: "בדיקות החזרות לקוח באמצעות Advanced Returns Management",
          titleEn: "Customer Return Inspections Using Advanced Returns Management",
          execHe:
            "החזרות-לקוח חייבות בדיקה לפני החלטה אם להחזירן למלאי, לגרוט, או להחזיר לספק. Advanced Returns Management (ARM) ב-S/4 משתלב עם EWM/QIE: ב-Returns Inbound Delivery נפתחת בדיקת IOT (4/5), והחלטת-השימוש מזינה את ה-Returns logistical follow-up.",
          beginnerHe:
            "כשלקוח מחזיר מוצר, אסור פשוט להחזיר אותו למדף — צריך לבדוק את מצבו. ARM הוא התהליך המסודר של SAP לטיפול בהחזרות: המוצר נכנס כ'החזרה', נבדק, ולפי הבדיקה מחליטים — להחזיר למלאי-זמין, לגרוט, לתקן, או להחזיר לספק.",
          consultantHe:
            "ARM ב-S/4 מנהל Returns Order → Returns Inbound Delivery → EWM receipt. ה-QIE פותח Inspection Document (לרוב IOT 4 על ה-Returns delivery, או IOT 5 על המלאי שהתקבל) עם Inspection Type ייעודי להחזרות. ה-Usage Decision/Inspection result מוזן ל-Logistical Follow-up Code של ARM, שקובע את ה-Returns Refund Code ואת היעד: return to stock (Unrestricted), scrapping, transfer to specified stock, או return to supplier. ה-Q-stock וה-Blocked משמשים בין הקבלה ל-decision.",
          purposeHe:
            "להבטיח שמוצר מוחזר נבדק לפני שובו לזמינות, לקשר את תוצאת-הבדיקה להחלטה-לוגיסטית ולזיכוי-כספי, ולמנוע השבת מוצר-פגום למכירה.",
          processExampleHe:
            "לקוח מחזיר מוצר ⇒ Returns Order (ARM) ⇒ Returns Inbound Delivery ⇒ קבלה ב-EWM. ה-QIE פותח Inspection Document; המוצר → Q-stock/Blocked. בדיקה ⇒ Logistical Follow-up: 'good' → Unrestricted; 'damaged' → Scrapping; 'supplier fault' → Return to supplier — וה-Refund Code נקבע בהתאם.",
          cbcHe:
            "ב-CBC משטח-משקאות שחזר ממרכז-הפצה נכנס דרך ARM: בדיקה חזותית של שלמות-אריזה ותוקף; UD='good' מחזיר לזמינות, 'expired/damaged' מנתב ל-Scrapping, והזיכוי ללקוח נקבע מ-Refund Code.",
          navHe: [
            "Sales and Distribution ► Returns Management ► Advanced Returns Management ► Define Logistical Follow-up & Refund Codes",
            "Extended Warehouse Management ► Cross-Process Settings ► Quality Management ► Inspection Rules (/SCWM/QRSETUP) ► Returns scenario",
            "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Customer Returns Inspection",
          ],
          tables: ["QALS", "/SCDL/DB_PROCH_O", "VBAK", "LIPS", "/SCWM/AQUA"],
          tcodes: ["/SCWM/QRSETUP", "/SCWM/QDISPLAY", "QA32", "/SCWM/PRDI", "VA01"],
          fiori: ["F2026", "F0749", "F1989"],
          configHe: [
            "ARM: Logistical Follow-up Codes + Refund Codes (SD Returns Management).",
            "Inspection Rule ל-תרחיש Returns (IOT 4/5) עם Inspection Type ייעודי.",
            "מיפוי Inspection result/UD → Logistical Follow-up → יעד-מלאי (Unrestricted/Scrap/Return).",
          ],
          flow: [
            { he: "Returns Order (ARM)", code: "VA01" },
            { he: "Returns Inbound Delivery", code: "ARM" },
            { he: "קבלה ב-EWM + Inspection", code: "QIE / IOT 4-5" },
            { he: "Q-stock / Blocked", code: "/SCWM/AQUA" },
            { he: "Inspection result + UD", code: "QA32 / QDISPLAY" },
            { he: "Logistical Follow-up + Refund", code: "ARM" },
          ],
          masterDataHe: [
            "Inspection Type ייעודי להחזרות ב-QM view; Inspection Rule ל-Returns scenario.",
            "ARM customizing: Follow-up Codes ו-Refund Codes.",
          ],
          mistakesHe: [
            "החזרה נכנסת ישר ל-Unrestricted ללא בדיקה — מוצר-פגום חוזר למכירה.",
            "תוצאת-בדיקה לא ממופה ל-Logistical Follow-up — זיכוי/יעד שגויים.",
            "Inspection Rule להחזרות חסר — אין בדיקה על ה-Returns delivery.",
          ],
          troubleshootHe: [
            "אין בדיקה על החזרה ➔ Inspection Rule ל-Returns scenario חסר/לא-פעיל.",
            "החלטה-לוגיסטית לא נגזרת מהבדיקה ➔ מיפוי UD→Follow-up Code חסר.",
            "Refund שגוי ➔ Refund Code לא מקושר ל-Follow-up Code ב-ARM.",
          ],
          bestPracticeHe: [
            "תמיד נתב החזרות ל-Q-stock/Blocked עד תום הבדיקה.",
            "מַפֵּה כל תוצאת-בדיקה ל-Logistical Follow-up ול-Refund Code מתאים.",
            "הפרד תרחיש-Returns מ-Inspection Rules של קבלה רגילה.",
          ],
          interviewHe: [
            { qHe: "מהו ARM וכיצד הוא נקשר ל-QM ב-EWM?", aHe: "Advanced Returns Management מנהל החזרות מקצה-לקצה ב-S/4; בקבלת ה-Returns delivery ב-EWM, ה-QIE פותח Inspection Document, ותוצאת-הבדיקה/UD מזינה את ה-Logistical Follow-up Code שקובע יעד-מלאי וזיכוי." },
            { qHe: "אילו יעדים אפשריים אחרי בדיקת-החזרה?", aHe: "Return to stock (Unrestricted), Scrapping, Transfer to specified/blocked stock, או Return to supplier — נגזר מ-Logistical Follow-up Code." },
          ],
          takeawaysHe: [
            "החזרות-לקוח נבדקות לפני שיבה לזמינות.",
            "ARM ↔ EWM/QIE: תוצאת-בדיקה → Logistical Follow-up → יעד + Refund.",
            "Q-stock/Blocked מחזיק את ההחזרה עד ההחלטה.",
          ],
          relatedHe: [
            { labelHe: "QM Academy · Chapter 8", href: "/library/qm-academy/chapter-8/" },
            { labelHe: "EWM · יציאת סחורה (Outbound)", href: "/library/wm/chapter-04/" },
          ],
        },
      ],
    },
    // ============================================================ 3.4
    {
      id: "3.4",
      titleHe: "הערות SAP חשובות לניהול איכות ב-SAP EWM",
      titleEn: "Important SAP Notes for Quality Management in SAP EWM",
      execHe:
        "שילוב QM-EWM נשען על תיקונים והגדרות-מומלצות שמתועדים ב-SAP Notes. הכרת ה-Notes הרלוונטיות לחיבור QIE↔EWM↔QM-הקלאסי, ל-Inspection Rules ול-Returns/ARM היא חלק חיוני ממימוש תקין ומפתרון-תקלות — לעיתים התנהגות שנראית כתקלת-קונפיגורציה היא בעצם תיקון חסר.",
      beginnerHe:
        "SAP Notes הן 'מסמכי-תיקון רשמיים' של SAP — תיקוני-תוכנה והנחיות. לפני שמאשימים את הקונפיגורציה בתקלה, כדאי לבדוק אם יש Note שמתקן בדיוק את ההתנהגות הזו. ב-QM-EWM יש Notes מרכזיות שכדאי להכיר ולהחיל.",
      consultantHe:
        "ה-Notes הרלוונטיות מתחלקות לקטגוריות: (1) QIE↔EWM integration ועדכון-stock (תיקוני חוסר-עקביות Q-stock); (2) Inspection Rule setup ו-/SCWM/QRSETUP; (3) חיבור ל-QM-הקלאסי (Inspection Lot creation, origins 17/01/04); (4) Recurring/Deadline (QA07) ב-EWM-managed stock; (5) Advanced Returns Management ↔ EWM inspection. מומלץ להתבסס על ה-Master/Collective Notes ועל ה-SAP Help 'Quality Management in EWM', ולחפש ב-launchpad לפי Application Component (SCM-EWM-QM / QM-QIE). תמיד לאמת Note מול ה-Support Package/Release לפני החלה.",
      purposeHe:
        "להבטיח שהמימוש מבוסס על קוד מתוקן ועל המלצות-SAP עדכניות, ולקצר אבחון-תקלות ע\"י זיהוי בעיות מוכרות שכבר תוקנו ב-Note.",
      processExampleHe:
        "תקלה: UD בוצע אך ה-Q-stock לא משוחרר. במקום שעות-דיבוג, חיפוש ב-SAP launchpad לפי SCM-EWM-QM מעלה Note עם תיקון-עקביות; החלת ה-Note + הרצת תוכנית-תיקון פותרת.",
      cbcHe:
        "ב-CBC לפני Go-Live של QM-EWM מבוצעת סקירת-Notes ל-component SCM-EWM-QM ו-QM-QIE, החלת ה-Collective Notes הרלוונטיות ל-Support Package, ותיעודן ב-runbook של הפרויקט.",
      navHe: [
        "SAP for Me / Support Launchpad ► Knowledge Base ► Search by Application Component (SCM-EWM-QM, QM-QIE)",
        "SAP Help Portal ► SAP S/4HANA ► Extended Warehouse Management ► Quality Management",
        "SNOTE (Note Assistant) — implement & verify against Support Package",
      ],
      tables: ["CWBNTHEAD", "CWBNTCUST"],
      tcodes: ["SNOTE", "/SCWM/QRSETUP", "/SCWM/IM_DUMP"],
      fiori: [],
      configHe: [
        "סווג Notes לפי Application Component: SCM-EWM-QM (אינטגרציה) ו-QM-QIE (מנוע).",
        "אמת כל Note מול Release/Support Package לפני SNOTE.",
        "תעד Notes שהוחלו ב-runbook המימוש (מספר Note + תיאור + תאריך).",
      ],
      mistakesHe: [
        "אבחון תקלת-קוד כתקלת-קונפיגורציה — בזבוז זמן על Note חסר.",
        "החלת Note ללא בדיקת-תאימות ל-Support Package — שבירת-קוד.",
        "אי-תיעוד Notes שהוחלו — קושי בשדרוג עתידי.",
      ],
      troubleshootHe: [
        "התנהגות-QM חריגה ללא סיבת-config ➔ חפש Note ב-SCM-EWM-QM / QM-QIE.",
        "חוסר-עקביות Q-stock אחרי UD ➔ בדוק Notes לעדכון-stock + הרץ /SCWM/IM_DUMP.",
        "Inspection Lot לא נוצר כצפוי ➔ ייתכן Note לחיבור QIE↔QM הקלאסי.",
      ],
      bestPracticeHe: [
        "בצע סקירת-Notes כחלק מתכנון-המימוש ולפני כל Go-Live.",
        "החל Collective/Master Notes לפני תיקונים-נקודתיים.",
        "תעד כל Note ב-runbook לטובת שדרוגים ותחזוקה.",
      ],
      interviewHe: [
        { qHe: "מהו Application Component לחיפוש Notes של QM ב-EWM?", aHe: "SCM-EWM-QM לאינטגרציית-EWM ו-QM-QIE למנוע-הבדיקה; אלה נקודות-המוצא לחיפוש ב-Support Launchpad." },
        { qHe: "מתי תחשוד שתקלת-QM היא Note חסר ולא קונפיגורציה?", aHe: "כשהקונפיגורציה תקינה אך ההתנהגות חריגה/לא-עקבית (למשל Q-stock לא משוחרר אחרי UD); אז חיפוש-Note לרכיב הרלוונטי לרוב מאתר תיקון מוכר." },
      ],
      takeawaysHe: [
        "SAP Notes הם חלק ממימוש-QM-EWM, לא רק כיבוי-שריפות.",
        "רכיבי-חיפוש מרכזיים: SCM-EWM-QM ו-QM-QIE.",
        "אמת תאימות ל-Support Package ותעד כל Note שהוחל.",
      ],
      relatedHe: [
        { labelHe: "QM Academy · Chapter 8", href: "/library/qm-academy/chapter-8/" },
      ],
    },
    // ============================================================ 3.5
    {
      id: "3.5",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה הציג את שילוב ניהול-האיכות ב-SAP EWM דרך ה-QIE: מבדיקת מוצר/אצווה לאספקות נכנסות (IOT 4 — מרכש חיצוני ומייצור, כולל Pre-Sampling), דרך בדיקות-מלאי במחסן (IOT 5 — יזומות, תקופתיות-חוזרות והחזרות-לקוח ב-ARM), ועד ה-SAP Notes הקריטיות. הציר המרכזי: Inspection Rule פותח בדיקה, מלאי יושב ב-Q-stock, וה-Usage Decision מנתב ל-Unrestricted/Blocked/Scrap/Return.",
      beginnerHe:
        "סיכום במשפט: ב-EWM מנוע בשם QIE עוצר סחורה לבדיקת-איכות — בין אם בקבלה (IOT 4) או על מלאי-קיים (IOT 5) — חוסם אותה זמנית (Q-stock), ומחכה להחלטת-בודק (Usage Decision) שמשחררת, חוסמת, גורטת או מחזירה. ה-Inspection Rule הוא המתג שמחליט מתי לעצור.",
      consultantHe:
        "מבחינה ארכיטקטונית: QIE הוא שכבת-המנוע, IOT 4/5 הם ההקשרים, Inspection Rule (/SCWM/QRSETUP) הוא הקונפיגורציה המפעילה, Q-stock הוא מצב-הביניים, וה-Usage Decision + Follow-up actions הם נקודת-ההכרעה. חיבור ל-QM-הקלאסי (Inspection Lot/Plan/MIC) מספק Results-Recording; ARM מחבר את עולם-ההחזרות. שליטה בארבעת אלה — מנוע, הקשר, כלל, הכרעה — היא מהות מימוש-QM-EWM. העמקה ב-QM הקלאסי: /library/qm-academy/chapter-8/.",
      purposeHe:
        "לקבע את התמונה-הכוללת ולחבר את תת-הפרקים לתהליך אחד מקצה-לקצה: inbound/stock → inspection → Usage Decision → תנועת-מלאי.",
      processExampleHe:
        "מסע-חיים של פריט: מגיע בקבלה ⇒ Inspection Rule (IOT 4) ⇒ Q-stock ⇒ UD='Accept' ⇒ Unrestricted ⇒ Putaway. חודשים אחר-כך ⇒ Recurring (IOT 5) ⇒ Q-stock ⇒ UD ⇒ הארכה/Scrap. אם נמכר וחוזר ⇒ ARM ⇒ Inspection ⇒ Follow-up.",
      cbcHe:
        "ב-CBC הציר חוזר על עצמו: תרכיז נכנס ונבדק (IOT 4), מאוחסן ונבדק-מחדש תקופתית (IOT 5 Recurring), ומשטחי-משקה שחוזרים מהפצה נבדקים ב-ARM — כל שלב עם Q-stock ו-UD משלו.",
      navHe: [
        "Extended Warehouse Management ► Cross-Process Settings ► Quality Management (כל ההגדרות מרוכזות כאן)",
        "Quality Management ► Quality Inspection Engine (QIE) — הגדרות-מנוע",
      ],
      tables: ["QALS", "/SCWM/AQUA", "/SCDL/DB_PROCH_O", "MCHA"],
      tcodes: ["/SCWM/QRSETUP", "/SCWM/QINSP", "/SCWM/QDISPLAY", "QA32", "QA07"],
      fiori: ["F2026", "F4072"],
      configHe: [
        "ארבע אבני-היסוד: הפעלת-QM ל-Warehouse, IOT 4/5, Inspection Rules, ו-Follow-up actions.",
        "חיבור ל-QM-הקלאסי (Inspection Types/Plan/MIC) ל-Results; ARM להחזרות.",
        "Deadline Monitoring (QA07) ל-Recurring; סקירת-Notes לפני Go-Live.",
      ],
      flow: [
        { he: "קבלה / מלאי-קיים", code: "IOT 4 / IOT 5" },
        { he: "Inspection Rule", code: "/SCWM/QRSETUP" },
        { he: "Q-stock", code: "/SCWM/AQUA" },
        { he: "Usage Decision", code: "/SCWM/QDISPLAY" },
        { he: "תנועת-מלאי", code: "Unrestricted/Blocked/Scrap/Return" },
      ],
      mistakesHe: [
        "ראייה מקוטעת של תת-התרחישים במקום ציר-אחד (inspection → UD → stock).",
        "התעלמות מ-IOT 5 — חשיבה שבדיקות הן רק בקבלה.",
        "דילוג על סקירת-Notes לפני Go-Live.",
      ],
      troubleshootHe: [
        "בעיה בכל שלב ➔ אבחן לפי הציר: מנוע (QIE) → הקשר (IOT) → כלל (Rule) → הכרעה (UD/Follow-up).",
        "התנהגות חריגה ללא סיבת-config ➔ חזור לסקירת-Notes (3.4).",
      ],
      bestPracticeHe: [
        "חשוב בארבעה רבדים: מנוע, הקשר, כלל, הכרעה.",
        "מַפֵּה כל IOT ותרחיש ל-Inspection Rule ו-Follow-up מפורשים.",
        "שלב סקירת-Notes ו-Deadline Monitoring בתוכנית-המימוש.",
      ],
      interviewHe: [
        { qHe: "סכם את זרימת-QM ב-EWM במשפט אחד.", aHe: "Inspection Rule פותח Inspection Document (IOT 4 בקבלה / IOT 5 על מלאי), המלאי יושב ב-Q-stock, וה-Usage Decision + Follow-up מנתב ל-Unrestricted/Blocked/Scrap/Return." },
        { qHe: "מהם ארבעת מרכיבי-הליבה של מימוש QM-EWM?", aHe: "מנוע (QIE), הקשר (Inspection Object Type 4/5), כלל (Inspection Rule), והכרעה (Usage Decision + Follow-up actions) — בתוספת חיבור ל-QM הקלאסי ול-ARM." },
      ],
      takeawaysHe: [
        "QM ב-EWM = QIE + IOT 4/5 + Inspection Rule + Usage Decision.",
        "Q-stock הוא מצב-הביניים בכל תרחיש.",
        "IOT 4 בקבלה, IOT 5 על מלאי (יזום/תקופתי/החזרות-ARM).",
        "SAP Notes ו-Deadline Monitoring הם חלק ממימוש תקין.",
      ],
      relatedHe: [
        { labelHe: "QM Academy · בדיקות-איכות (Chapter 8)", href: "/library/qm-academy/chapter-8/" },
        { labelHe: "EWM · קבלת סחורה (Inbound)", href: "/library/wm/chapter-02/" },
      ],
    },
  ],
};
