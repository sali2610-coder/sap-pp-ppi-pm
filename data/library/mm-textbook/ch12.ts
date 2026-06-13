// ===== MM Digital Textbook — Chapter 12 (Invoice and Payables Management) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Source hierarchy preserved (ids + order); x.y.z nested under x.y.
// Transformative Hebrew (no source prose); SAP identifiers verbatim EN.
import type { TextbookChapter } from "./types";

export const CH12: TextbookChapter = {
  n: 12,
  titleHe: "ניהול חשבוניות וזכאים",
  titleEn: "Invoice and Payables Management",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לניהול-חשבוניות-ספק וזכאים (Invoice and Payables Management) ב-SAP S/4HANA במסגרת Sourcing & Procurement. כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC (מפעל-מילוי משקאות של קוקה-קולה), ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך להתאמה-תלת-כיוונית (3-Way Match) ולתשלום (F110), טעויות נפוצות, פתרון-תקלות, שיטות-מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: לשלוט באימות-חשבוניות (MIRO/MIR7/MIR4/MIR6), שחרור-חסימות (MRBR), חשבונות-זכאים (BSIK/BSAK), תשלום (F110), אנליטיקה ודוחות, וקונפיגורציה — ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 12.1
    {
      id: "12.1",
      titleHe: "מהו ניהול חשבוניות וזכאים?",
      titleEn: "What Are Invoice and Payables Management?",
      execHe:
        "ניהול-חשבוניות-וזכאים הוא השלב המסכם של תהליך הרכש-לתשלום (Procure-to-Pay): קליטת חשבונית-הספק, אימותה מול ההזמנה והקבלה, רישום ההתחייבות הכספית (Payables) ולבסוף תשלום לספק. כאן הלוגיסטיקה (MM) פוגשת את הכספים (FI): רישום-חשבונית מוצלח יוצר מסמך-FI שמזכה את חשבון-הספק ומחייב את חשבון-המלאי או ההוצאה. שגיאה כאן מובילה לתשלומי-יתר, חסמי-תשלום מיותרים או דוח-זכאים שגוי במאזן.",
      beginnerHe:
        "דמיין שהזמנת סחורה, קיבלת אותה למחסן, ואז מגיע 'החשבון' מהספק. ניהול-חשבוניות-וזכאים הוא כל מה שקורה מרגע שהחשבון נכנס: SAP בודק שהחשבון תואם למה שהזמנת ולמה שקיבלת (התאמה-תלת-כיוונית), רושם שאתה חייב כסף לספק (זה ה'זכאי'), ובסוף משלם. 'Payables' = הכסף שאתה חייב לספקים; זו התחייבות שמופיעה במאזן.",
      consultantHe:
        "התהליך נשען על שתי טבלאות-ליבה ב-MM: RBKP (כותרת מסמך-חשבונית) ו-RSEG (שורות-החשבונית מול שורות-ההזמנה/קבלה). ברישום נוצר מסמך-FI מקביל שמופיע כ-Open Item בחשבון-הספק: BSIK (פריטים פתוחים) ולאחר תשלום BSAK (פריטים מסולקים). אימות-החשבונית (Logistics Invoice Verification, LIV) מבוצע ב-MIRO ומבצע 3-Way Match בין PO (EKKO/EKPO), GR (MATDOC) וחשבונית. סטיות מחוץ-לטולרנס יוצרות חסימת-תשלום (Payment Block 'R') המשוחררת ב-MRBR. ב-S/4HANA אובייקט-החשבונית מנוהל גם דרך Object Page (Fiori 'Manage Supplier Invoices') לצד הקלאסי MIRO.",
      purposeHe:
        "המטרה: להבטיח שמשלמים לספק רק עבור מה שהוזמן ונתקבל, במחיר הנכון — בקרה פיננסית מהותית מפני הונאה וטעויות; ולנהל את התחייבויות-הזכאים (timing, cash discount, due date) כך שתזרים-המזומנים מתוכנן והנחות-מזומן מנוצלות.",
      processExampleHe:
        "ספק שולח חשבונית על 1,000 ארגזים. הרכש מקליד אותה ב-MIRO תוך הפניה ל-PO. SAP מושך אוטומטית את הכמות והמחיר מה-PO ומאמת מול ה-GR: אם הכל תואם — החשבונית נרשמת מאוזנת ומיד משוחררת לתשלום; אם המחיר חורג מהטולרנס — נוצרת חסימת-תשלום עד שמורשה משחרר ב-MRBR. בהמשך F110 סורק חשבונות-זכאים פתוחים (BSIK), בוחר את אלה שהגיע מועדם, ומפיק תשלום — והפריט עובר ל-BSAK.",
      cbcHe:
        "ב-CBC מפעל-המילוי מקבל אלפי חשבוניות חודשיות: תרכיז מ-The Coca-Cola Company, סוכר, CO2, בקבוקים, תוויות ושירותי-לוגיסטיקה. כל חשבונית עוברת 3-Way Match מול ה-PO וה-GR; חשבוניות-תרכיז בעלות-גבוהה נתונות לטולרנס מחמיר וחסימות-תשלום נפוצות יותר. תשלומי-הספקים מרוכזים בריצת-F110 שבועית, עם ניצול הנחות-מזומן (Cash Discount) לשיפור הון-חוזר.",
      navHe: [
        "Materials Management ► Logistics Invoice Verification ► Incoming Invoice ► Activate Direct Posting to G/L Accounts and Material Accounts",
        "Materials Management ► Logistics Invoice Verification ► Define Attributes of System Messages",
        "Financial Accounting ► Accounts Receivable and Accounts Payable ► Business Transactions ► Outgoing Payments",
      ],
      tables: ["RBKP", "RSEG", "BSIK", "BSAK", "EKBE"],
      tcodes: ["MIRO", "MIR4", "MIR6", "MRBR", "F110", "FB60"],
      fiori: ["F0859", "F1060A", "F2179"],
      configHe: [
        "Logistics Invoice Verification (LIV) הוא נתיב-החשבוניות מבוסס-הזמנה ב-MM; FI Invoice (FB60) הוא נתיב חשבונית ללא-PO.",
        "טולרנסים (OMR6) קובעים מתי סטייה חוסמת תשלום או רק מתריעה.",
        "Payment Block keys (FI) קובעים אילו פריטים חסומים-לתשלום עד שחרור.",
        "תיאום חשבונות-מעבר GR/IR (Goods Receipt/Invoice Receipt clearing) מבטיח שכל GR נסגר מול חשבונית.",
      ],
      flow: [
        { he: "הזמנת-רכש", code: "PO", note: "EKKO/EKPO" },
        { he: "קבלת-סחורה", code: "GR", note: "MATDOC, GR/IR זוכה" },
        { he: "קליטת-חשבונית", code: "MIRO", note: "3-Way Match" },
        { he: "רישום → מסמך-FI", code: "RBKP/RSEG", note: "זכאי פתוח BSIK" },
        { he: "תשלום", code: "F110", note: "פריט → BSAK" },
      ],
      masterDataHe: [
        "Supplier (Business Partner) — נתוני-תשלום: Payment Terms, Payment Method, Bank Details.",
        "GR/IR Clearing Account — חשבון-מעבר בין קבלת-סחורה לקבלת-חשבונית.",
        "Tolerance Keys — סף-סטייה למחיר/כמות לפני חסימה.",
      ],
      mistakesHe: [
        "רישום חשבונית ללא הפניה ל-PO כשקיים PO — מאבד את ה-3-Way Match ואת בקרת-המחיר.",
        "התעלמות מחסימות-תשלום שנערמות ב-MRBR — מעכב ספקים ומסכן הנחות-מזומן.",
        "אי-סגירת GR/IR — יתרות-מעבר מצטברות ומעוותות את המאזן.",
      ],
      troubleshootHe: [
        "תשלום לא מבוצע לספק ➔ בדוק Payment Block בפריט (BSIK) ושחרר ב-MRBR או FBL1N.",
        "חשבונית לא מתאזנת ב-MIRO ➔ סטיית-מחיר/כמות מול PO/GR — בדוק EKBE והיסטוריית-ההזמנה.",
        "זכאי 'נעלם' מהדוח ➔ הפריט עבר מ-BSIK ל-BSAK (סולק) — בדוק מסמך-התשלום.",
      ],
      bestPracticeHe: [
        "אכוף נתיב-LIV (MIRO) לכל רכש מבוסס-PO; הגבל FB60 ללא-PO בלבד.",
        "נהל מחזור-שחרור-חסימות יומי ב-MRBR למניעת עיכובי-תשלום.",
        "סקור יתרות GR/IR חודשית (MR11) ונקה הפרשים ישנים.",
      ],
      interviewHe: [
        { qHe: "מהו ההבדל בין LIV (MIRO) ל-FI Invoice (FB60)?", aHe: "LIV הוא אימות-חשבונית מבוסס-PO ב-MM עם 3-Way Match; FB60 הוא רישום-חשבונית ישיר ב-FI ללא הזמנה, לרוב להוצאות-כלליות." },
        { qHe: "מהו 'Payable' במאזן?", aHe: "התחייבות לספק — הסכום שחייבים לשלם, מנוהל כ-Open Item בחשבון-הספק (BSIK) עד התשלום." },
      ],
      takeawaysHe: [
        "ניהול-חשבוניות-וזכאים סוגר את מעגל ה-Procure-to-Pay: חשבונית → זכאי → תשלום.",
        "טבלאות-ליבה: RBKP/RSEG (חשבונית), BSIK/BSAK (זכאי פתוח/מסולק).",
        "3-Way Match (PO+GR+חשבונית) הוא בקרת-המחיר המרכזית; MRBR משחרר חסמים; F110 משלם.",
      ],
      relatedHe: [
        { labelHe: "MM · קבלת-סחורה (פרק 7)", href: "/library/mm/chapter-07/" },
        { labelHe: "אובייקט · RBKP", href: "/library/mm/object/RBKP/" },
        { labelHe: "אובייקט · BSIK", href: "/library/mm/object/BSIK/" },
      ],
    },
    // ============================================================ 12.2
    {
      id: "12.2",
      titleHe: "עיבוד חשבוניות",
      titleEn: "Invoice Processing",
      execHe:
        "עיבוד-חשבוניות (Invoice Processing) הוא הליבה התפעולית של הפרק: קליטה, אימות ורישום של חשבונית-הספק. כאן מבוצע ה-3-Way Match, מחושבים מסים והנחות, ומופקים מסמך-החשבונית ומסמך-ה-FI. עיבוד יעיל = תזרים-תשלומים חלק; עיבוד שגוי = חסימות, ביקורות ותשלומי-יתר.",
      beginnerHe:
        "זה החלק שבו 'מקלידים את החשבון' למערכת. אתה אומר ל-SAP על איזו הזמנה מדובר, הוא ממלא לך אוטומטית את הכמות והמחיר, אתה בודק שהסכום-הכולל תואם לחשבונית הנייר, ולוחץ 'רישום'. מאותו רגע SAP יודע שאתה חייב כסף לספק.",
      consultantHe:
        "עיבוד-החשבונית ב-MIRO מתבצע ברמת-הכותרת (תאריך, סכום-ברוטו, מטבע, תנאי-תשלום) וברמת-השורות (התאמה מול PO/GR). המערכת מציעה כמויות לפי היסטוריית-ה-PO (EKBE) ומחשבת מס לפי Tax Code. בעת רישום נוצרים RBKP/RSEG ומסמך-FI שמסולק מול GR/IR. הסטטוס יכול להיות Posted, Held (MIR7), Parked, או In Verification. סטיות מפעילות Tolerance Keys ויכולות לחסום תשלום.",
      purposeHe:
        "לתרגם מסמך-נייר/אלקטרוני של ספק לרישום-חשבונאי מבוקר ומאוזן, תוך אימות אוטומטי מול ההזמנה והקבלה — מבלי להזין ידנית כל סכום ולחשוף את הארגון לטעויות.",
      processExampleHe:
        "פקיד-AP פותח MIRO, מקיש PO, SAP טוען את השורות עם כמות-שנותרה-לחיוב ומחיר-PO. הוא מזין את סכום-החשבונית בכותרת; השדה 'Balance' חייב להגיע ל-0 כדי לרשום. אם תואם — רישום מיידי; אם לא — שמירה כ-Parked עד בירור מול הספק.",
      cbcHe:
        "ב-CBC צוות-AP מעבד מאות חשבוניות-יומיות. חשבוניות-תרכיז (סכום גבוה, ספק-בודד) עוברות אימות קפדני; חשבוניות-אריזה (ריבוי-ספקים) מעובדות בצובר. חשבוניות שאינן מתאזנות נשמרות כ-Parked ומועברות לבירור-רכש.",
      navHe: [
        "Materials Management ► Logistics Invoice Verification ► Incoming Invoice ► Maintain Default Values for Tax Codes",
        "Materials Management ► Logistics Invoice Verification ► Incoming Invoice ► Number Assignment ► Maintain Number Assignments for Logistics Documents",
        "Materials Management ► Logistics Invoice Verification ► Incoming Invoice ► Set Check for Duplicate Invoices",
      ],
      tables: ["RBKP", "RSEG", "EKBE", "BSIK"],
      tcodes: ["MIRO", "MIR7", "MIR4", "MIR6", "MRBR"],
      fiori: ["F0859", "F1060A", "F0712"],
      configHe: [
        "Duplicate Invoice Check — מונע רישום כפול של אותה חשבונית (ספק+סכום+תאריך+מספר-ייחוס).",
        "Default Tax Codes — קוד-מס ברירת-מחדל לפי קבוצת-חברה/ספק.",
        "Number Ranges — טווחי-מספרים נפרדים למסמך-חשבונית ולמסמך-FI.",
        "Tolerance Keys (OMR6) — PP מחיר, DQ/BD כמות, AP/AN סכומים זעירים.",
      ],
      flow: [
        { he: "פתיחת MIRO + הפניה ל-PO", code: "MIRO" },
        { he: "טעינת שורות מ-PO/GR", code: "EKBE" },
        { he: "Balance = 0?", note: "אחרת Park/Hold" },
        { he: "רישום", code: "RBKP/RSEG", note: "מסמך-FI" },
        { he: "סטייה?", code: "OMR6", note: "חסימת-תשלום R" },
      ],
      masterDataHe: [
        "PO History (EKBE) — מקור הכמות-לחיוב ומחיר-ההתייחסות.",
        "Tax Codes — שולטים בחישוב-המס בעת הרישום.",
      ],
      mistakesHe: [
        "כיבוי Duplicate Invoice Check — מאפשר תשלום כפול לאותה חשבונית.",
        "רישום ללא שדה-Reference — מנטרל את בדיקת-הכפילות.",
        "השארת חשבוניות ב-Parked ללא מעקב — זכאים שלא נרשמו במאזן.",
      ],
      troubleshootHe: [
        "MIRO לא מאפשר רישום ➔ Balance≠0; בדוק סטיית-מחיר/כמות/מס מול PO.",
        "חשבונית כפולה נחסמה ➔ Duplicate Check זיהה ספק+סכום+ייחוס זהים — אַמת מול הקיים.",
        "מס שגוי ➔ Tax Code שגוי או חסר ברמת-השורה.",
      ],
      bestPracticeHe: [
        "השאר Duplicate Check פעיל תמיד ואכוף מילוי שדה-Reference.",
        "סקור דוח חשבוניות-Parked (MIR6) יומית.",
        "תקנן Tax Codes מצומצמים לצמצום-טעויות.",
      ],
      interviewHe: [
        { qHe: "מהן האפשרויות לשמירת חשבונית שאינה מאוזנת?", aHe: "Hold (MIR7) — שמירה זמנית ללא בדיקות; Park — שמירה עם בדיקות חלקיות ללא רישום-FI; שתיהן ניתנות לעריכה והשלמה מאוחרת." },
        { qHe: "כיצד מונעים תשלום כפול?", aHe: "Duplicate Invoice Check — משווה ספק, סכום, מטבע, תאריך-חשבונית ומספר-ייחוס, וחוסם רישום זהה." },
      ],
      takeawaysHe: [
        "עיבוד-חשבונית = קליטה+אימות+רישום, יוצר RBKP/RSEG ומסמך-FI.",
        "Balance חייב להיות 0 כדי לרשום; אחרת Hold/Park.",
        "Duplicate Check ו-Tolerance Keys הם בקרות-הליבה.",
      ],
      relatedHe: [
        { labelHe: "אובייקט · RSEG", href: "/library/mm/object/RSEG/" },
        { labelHe: "MM · הזמנת-רכש (פרק 5)", href: "/library/mm/chapter-05/" },
      ],
      children: [
        {
          id: "12.2.1",
          titleHe: "מסמכי חשבונית-ספק",
          titleEn: "Supplier Invoice Documents",
          execHe:
            "מסמך-חשבונית-הספק הוא הרשומה המתעדת את דרישת-התשלום של הספק במערכת. הוא מורכב מכותרת (RBKP) ושורות (RSEG), ומקושר למסמך-FI שיוצר את הזכאי. סוג-המסמך ומבנהו קובעים את אופן-העיבוד והדיווח.",
          beginnerHe:
            "כשמקלידים חשבונית, SAP יוצר 'מסמך' פנימי שמספרו ייחודי. המסמך הזה זוכר הכל: מי הספק, על מה החשבונית, כמה כסף, ולאיזו הזמנה היא קשורה. ממנו נגזר מסמך נוסף בכספים שרושם את החוב.",
          consultantHe:
            "מסמך-החשבונית ב-LIV נושא מספר נפרד ממסמך-ה-FI (שני טווחי-מספרים). RBKP מכילה כותרת: BELNR, GJAHR, BUKRS, LIFNR, RMWWR (ברוטו), WAERS, ZTERM. RSEG מכילה שורות מול EBELN/EBELP. ב-S/4HANA המסמך נגיש דרך MIR4 (הצגה) ו-Object Page ב-Fiori, ומקושר ל-Journal Entry (ACDOCA) שהחליף את BSEG/BSIK המסורתיים בתצוגה-מאוחדת.",
          purposeHe:
            "לשמר תיעוד מלא ובר-מעקב של כל חשבונית — לצורכי ביקורת, התאמה מול ה-PO/GR, ומעקב אחר סטטוס-התשלום.",
          processExampleHe:
            "לאחר רישום ב-MIRO, המערכת מציגה 'Document no. 51XXXXXXXX created'. הצגתו ב-MIR4 חושפת את הכותרת והשורות, את מסמך-ה-FI המקושר, ואת היסטוריית-ההזמנה (PO History).",
          cbcHe:
            "ב-CBC כל חשבונית-תרכיז מקבלת מסמך עם הפניה ל-PO ולמספר-משלוח של The Coca-Cola Company, לצורכי תחקור-ביקורת מלא.",
          navHe: [
            "Materials Management ► Logistics Invoice Verification ► Incoming Invoice ► Number Assignment ► Maintain Number Assignments for Logistics Documents",
            "Materials Management ► Logistics Invoice Verification ► Incoming Invoice ► Number Assignment ► Maintain Number Assignments for Accounting Documents",
          ],
          tables: ["RBKP", "RSEG", "BKPF", "ACDOCA"],
          tcodes: ["MIR4", "MIRO", "FB03"],
          fiori: ["F0859", "F1060A"],
          configHe: [
            "Number Range למסמך-לוגיסטי (RBKP) נפרד מ-Number Range למסמך-FI (BKPF).",
            "Document Type ב-FI (RE כברירת-מחדל לחשבונית-ספק) קובע את טווח-המספרים החשבונאי.",
          ],
          mistakesHe: [
            "בלבול בין מספר-המסמך-הלוגיסטי למספר-מסמך-ה-FI בבירור-תשלום.",
            "אי-תיעוד מספר-ייחוס-הספק — מקשה התאמת-חשבוניות עתידית.",
          ],
          troubleshootHe: [
            "לא מוצאים את מסמך-ה-FI ➔ הצג ב-MIR4 את 'Follow-On Documents' לקישור.",
            "מסמך לא נמצא ➔ נבדק טווח-מספרים/שנת-כספים שגויים.",
          ],
          bestPracticeHe: [
            "תעד תמיד את מספר-ייחוס-הספק (Reference) ברישום.",
            "השתמש ב-Follow-On Documents לניווט בין מסמך-לוגיסטי ל-FI.",
          ],
          interviewHe: [
            { qHe: "כמה מסמכים נוצרים ברישום חשבונית-LIV?", aHe: "שניים: מסמך-לוגיסטי (RBKP/RSEG) ומסמך-FI (BKPF/ACDOCA), עם טווחי-מספרים נפרדים, מקושרים כ-Follow-On." },
          ],
          takeawaysHe: [
            "מסמך-החשבונית = כותרת RBKP + שורות RSEG, מקושר למסמך-FI.",
            "שני טווחי-מספרים נפרדים; ניווט דרך Follow-On Documents.",
          ],
          relatedHe: [{ labelHe: "אובייקט · RBKP", href: "/library/mm/object/RBKP/" }],
        },
        {
          id: "12.2.2",
          titleHe: "תוצאות עיבוד החשבונית",
          titleEn: "Results of Invoice Processing",
          execHe:
            "רישום-חשבונית מצליח מפיק מספר תוצאות חשבונאיות בו-זמנית: זיכוי חשבון-הספק (יצירת הזכאי), חיוב חשבון-ההוצאה/המלאי, סגירת חשבון-מעבר GR/IR, וחישוב-מס. ההבנה של 'מה נוצר' היא תנאי לתחקור-תקלות ולהתאמות.",
          beginnerHe:
            "כשרושמים חשבונית, קורים כמה דברים יחד: SAP רושם שאתה חייב כסף לספק (זיכוי), שהסחורה כבר שלך (חיוב), 'סוגר' את החשבון-הזמני שנפתח בקבלת-הסחורה, ומוסיף את המע\"מ. הכל בפקודת-יומן אחת.",
          consultantHe:
            "פקודת-היומן הטיפוסית: Dr GR/IR Clearing (סגירת ההפרשה מ-GR), Cr Vendor (זכאי, BSIK), Dr/Cr Tax, ובסטייה — Dr/Cr Price Difference (PRD) או עדכון-מלאי אם Price Control=V וקיים מלאי. אם החשבונית גדולה מ-GR, GR/IR נשאר חלקית-פתוח. כל אלה נראים ב-ACDOCA/BSEG ובתצוגת ה-PO History (EKBE עם קטגוריה Q לחשבונית).",
          purposeHe:
            "להשלים את החצי-הכספי של הקבלה-הלוגיסטית: ההפרשה שנוצרה ב-GR מתחלפת בהתחייבות-אמיתית לספק, וההפרשי-מחיר מנותבים נכון.",
          processExampleHe:
            "GR קודם זיכה GR/IR ב-1,000. החשבונית על 1,020 רושמת: Dr GR/IR 1,000, Dr Price Difference 20, Cr Vendor 1,020 (+מס). GR/IR נסגר במלואו; ההפרש-20 נרשם כ-PRD כי החומר ב-Standard Price.",
          cbcHe:
            "ב-CBC חומרי-גלם בניהול-Standard-Price: הפרשי-מחיר-חשבונית נרשמים ל-PRD ומנותחים חודשית מול תקציב-עלויות-החומר של מפעל-המילוי.",
          navHe: [
            "Materials Management ► Valuation and Account Assignment ► Account Determination ► Account Determination Without Wizard ► Configure Automatic Postings (OBYC)",
          ],
          tables: ["ACDOCA", "BSEG", "EKBE", "BSIK"],
          tcodes: ["MIRO", "FB03", "OBYC", "MR11"],
          fiori: ["F0859", "F2179"],
          configHe: [
            "OBYC — קביעת-חשבונות אוטומטית: GR/IR (WRX), Price Difference (PRD), Tax, Stock (BSX).",
            "Price Control (S/V) באב-החומר קובע אם הפרש-מחיר נרשם ל-PRD או לעדכון-מלאי.",
          ],
          masterDataHe: [
            "GR/IR Clearing Account (WRX) — מסולק בין GR לחשבונית.",
            "Price Difference Account (PRD) — קולט סטיות תחת Standard Price.",
          ],
          mistakesHe: [
            "הגדרת OBYC שגויה ל-PRD/WRX — פקודות-יומן שגויות בכל חשבונית.",
            "אי-הבנה שהפרש-מחיר תחת Price Control V מעדכן מלאי ולא PRD.",
          ],
          troubleshootHe: [
            "GR/IR לא נסגר ➔ כמות-חשבונית≠כמות-GR; השלם GR או חשבונית, או נקה ב-MR11.",
            "הפרש לא צפוי ב-PRD ➔ סטיית-מחיר תחת Standard Price; בדוק מחיר-PO מול תקן.",
          ],
          bestPracticeHe: [
            "סקור יתרות GR/IR ו-PRD חודשית כחלק מסגירת-החודש.",
            "אמת קביעת-OBYC בבדיקות-קבלה לפני Go-Live.",
          ],
          interviewHe: [
            { qHe: "מהי פקודת-היומן ברישום חשבונית-LIV?", aHe: "Dr GR/IR Clearing, Cr Vendor; בסטייה תחת Standard Price נוסף Dr/Cr Price Difference (PRD); ובנפרד רישום-מס." },
          ],
          takeawaysHe: [
            "רישום-חשבונית סוגר GR/IR ויוצר זכאי (Cr Vendor).",
            "סטיות-מחיר נרשמות ל-PRD (Standard) או למלאי (Moving Average).",
            "OBYC שולט בכל קביעת-החשבונות האוטומטית.",
          ],
          relatedHe: [{ labelHe: "MM · קבלת-סחורה (פרק 7)", href: "/library/mm/chapter-07/" }],
        },
        {
          id: "12.2.3",
          titleHe: "סוגי אימות חשבוניות-ספק",
          titleEn: "Types of Supplier Invoice Verification",
          execHe:
            "קיימים מספר סוגי-אימות: אימות מבוסס-PO (3-Way Match), אימות מבוסס-GR (GR-Based IV), אימות מבוסס-שירות (Service Entry), ורישום-ישיר ל-G/L או לחשבון-חומר ללא-PO. בחירת-הסוג קובעת את היקף-האוטומציה ואת רמת-הבקרה.",
          beginnerHe:
            "יש כמה דרכים לבדוק חשבונית. הנפוצה: השוואה מול ההזמנה ומול הקבלה (3-Way). לפעמים בודקים רק מול הקבלה (GR-Based). ולפעמים — להוצאות כלליות בלי הזמנה — פשוט רושמים ישירות לחשבון-הנהלת-חשבונות.",
          consultantHe:
            "PO-Based IV מתאם חשבונית מול PO (וכל ה-GRs יחד). GR-Based IV (דגל EKPO-WEBRE) מחייב התאמה לכל GR בנפרד — אידיאלי כשמגיעות חשבוניות חלקיות. 2-Way Match מדלג על GR (לרוב לשירותים/Blanket PO). Direct Posting (FB60 או MIRO ל-G/L tab) מאפשר חיוב חשבון-הנהלת-חשבונות ישירות. ה-3-Way Match (PO+GR+חשבונית) הוא ברירת-המחדל המבוקרת ביותר.",
          purposeHe:
            "להתאים את רמת-הבקרה לסוג-הרכש: סחורה פיזית דורשת 3-Way; שירות מתמשך עשוי להסתפק ב-2-Way; הוצאה-כללית נרשמת ישירות.",
          processExampleHe:
            "סחורה: 3-Way Match אוטומטי. שירותי-ייעוץ: 2-Way (PO+חשבונית) כי אין GR פיזי. חשמל-משרד: רישום-ישיר ב-FB60 ללא PO.",
          cbcHe:
            "ב-CBC: חומרי-גלם ואריזה = GR-Based 3-Way Match (חשבוניות חלקיות נפוצות); שירותי-תחזוקה = 2-Way; הוצאות-מטה = רישום-ישיר FB60.",
          navHe: [
            "Materials Management ► Logistics Invoice Verification ► Incoming Invoice ► Activate Direct Posting to G/L Accounts and Material Accounts",
            "Materials Management ► Purchasing ► Purchase Order ► Set Up Goods-Receipt-Based Invoice Verification",
          ],
          tables: ["EKPO", "RBKP", "RSEG", "ESSR"],
          tcodes: ["MIRO", "FB60", "ML81N", "ME21N"],
          fiori: ["F0859", "F1643"],
          configHe: [
            "GR-Based IV — דגל ברמת-PO (EKPO-WEBRE) או ברירת-מחדל באב-ספק (LFM1).",
            "Direct Posting to G/L / Material — הפעלה ב-LIV כדי לאפשר טאב G/L/Material ב-MIRO.",
            "Service-Based IV — מבוססת על Service Entry Sheet (ESSR) שאושר.",
          ],
          mistakesHe: [
            "כיבוי GR-Based IV כשמגיעות חשבוניות חלקיות — קושי בהתאמה.",
            "שימוש ברישום-ישיר לרכש מבוסס-PO — עוקף את ה-3-Way Match.",
          ],
          troubleshootHe: [
            "MIRO לא מציע שורות ➔ GR טרם נרשם ו-GR-Based IV פעיל; רשום GR קודם.",
            "אי-אפשר לרשום ל-G/L ➔ Direct Posting לא הופעל ב-LIV.",
          ],
          bestPracticeHe: [
            "הפעל GR-Based IV לחומרים עם משלוחים/חשבוניות חלקיים.",
            "שמור 3-Way Match כברירת-מחדל לכל רכש-סחורה.",
          ],
          interviewHe: [
            { qHe: "מהו ההבדל בין PO-Based ל-GR-Based Invoice Verification?", aHe: "PO-Based מתאם מול ה-PO וכל ה-GRs במצטבר; GR-Based מחייב התאמה לכל קבלת-סחורה בנפרד — חיוני לחשבוניות חלקיות." },
            { qHe: "מהו 2-Way Match?", aHe: "התאמה בין PO לחשבונית ללא GR — לשירותים/Blanket PO שאין בהם קבלת-סחורה פיזית." },
          ],
          takeawaysHe: [
            "3-Way Match (PO+GR+חשבונית) = הבקרה החזקה ביותר, ברירת-המחדל לסחורה.",
            "GR-Based IV מחייב התאמה לכל GR — לחשבוניות חלקיות.",
            "Direct Posting (FB60) להוצאות ללא-PO.",
          ],
          relatedHe: [{ labelHe: "MM · שירותים (Service Entry)", href: "/library/mm/object/ESSR/" }],
        },
        {
          id: "12.2.4",
          titleHe: "הזנת מסמכי חשבונית",
          titleEn: "Entry of Invoice Documents",
          execHe:
            "הזנת-החשבונית היא פעולת-הקלט ב-MIRO: בחירת בסיס-ההתייחסות (PO/GR/Service), הזנת כותרת ובדיקת שורות עד איזון. זהו הצעד הידני המהותי, ובו מרבית-הטעויות והבקרות.",
          beginnerHe:
            "כאן מקלידים בפועל: פותחים MIRO, אומרים על איזו הזמנה מדובר, ממלאים סכום ותאריך, מוודאים שה-Balance אפס, ולוחצים Post. אם משהו לא תואם — שומרים כטיוטה (Park) עד שמתבררים.",
          consultantHe:
            "ב-MIRO בוחרים Reference category (Purchase Order/Scheduling Agreement/Delivery Note/Bill of Lading/Service Entry). הכותרת: Invoice Date, Posting Date, Amount, Currency, Tax, Payment Terms. השורות נטענות מ-EKBE. שדה Balance מציג הפרש כותרת מול שורות וחייב 0 לרישום. אפשרויות: Post, Hold (MIR7, ללא בדיקות), Park (עם בדיקות, ללא FI), Save as Completed. תיקון אחרי-רישום: ביטול ב-MR8M.",
          purposeHe:
            "לאפשר קליטה גמישה ומבוקרת של חשבוניות מסוגים שונים, עם טעינה-אוטומטית של נתוני-ההזמנה לצמצום-הקלדה וטעויות.",
          processExampleHe:
            "פקיד מזין PO, בוחר 'Delivery Note' כהתייחסות, SAP מסנן ל-GR הספציפי. הוא מזין סכום-ברוטו 5,000, Balance=0, Post. המערכת מחזירה מספר-מסמך.",
          cbcHe:
            "ב-CBC הזנת חשבונית-תרכיז מתבצעת עם הפניה ל-Delivery Note כדי להבטיח התאמה למשלוח הספציפי מ-The Coca-Cola Company.",
          navHe: [
            "Materials Management ► Logistics Invoice Verification ► Incoming Invoice ► Maintain Default Values for Tax Codes",
            "Materials Management ► Logistics Invoice Verification ► Incoming Invoice ► Define Tax Jurisdiction",
          ],
          tables: ["RBKP", "RSEG", "EKBE"],
          tcodes: ["MIRO", "MIR7", "MR8M"],
          fiori: ["F0859", "F1060A"],
          configHe: [
            "Reference categories הזמינות ב-MIRO נשלטות ברמת-הלקוח.",
            "Layout variants לשורות-החשבונית מאפשרים תצוגת-עמודות מותאמת.",
            "Default Posting Date / Tax — ברירות-מחדל לזירוז-ההזנה.",
          ],
          flow: [
            { he: "פתיחת MIRO", code: "MIRO" },
            { he: "בחירת Reference (PO/GR/Service)", code: "EKBE" },
            { he: "כותרת: סכום, תאריך, מס", note: "Header" },
            { he: "Balance = 0?", note: "Park/Hold אם לא" },
            { he: "Post → מסמך", code: "RBKP/RSEG" },
          ],
          mistakesHe: [
            "בחירת Reference שגויה — טוען שורות לא-רלוונטיות.",
            "Posting Date בתקופה-נעולה — הרישום נכשל.",
            "התעלמות מ-Balance≠0 ושמירה כ-Held שנשכחת.",
          ],
          troubleshootHe: [
            "לא ניתן לרשום ➔ תקופת-רישום נעולה (MMPV/OB52) או Balance≠0.",
            "שורות לא נטענות ➔ Reference שגוי או אין GR ב-GR-Based IV.",
          ],
          bestPracticeHe: [
            "בחר את ה-Reference המדויק ביותר (Delivery Note) לדיוק-התאמה.",
            "השתמש ב-Park לחשבוניות-בבירור במקום Hold כדי שיופיעו בדוחות.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין Hold ל-Park ב-MIRO?", aHe: "Hold (MIR7) שומר ללא בדיקות וללא רישום; Park מבצע בדיקות חלקיות, מאפשר Workflow-אישור, אך עדיין ללא מסמך-FI עד רישום." },
          ],
          takeawaysHe: [
            "MIRO = נקודת-ההזנה; בחירת Reference + איזון Balance הם הליבה.",
            "Post / Hold / Park / Save-as-Completed הן אפשרויות-השמירה.",
            "ביטול-חשבונית ב-MR8M.",
          ],
          relatedHe: [{ labelHe: "אובייקט · EKBE", href: "/library/mm/object/EKBE/" }],
        },
        {
          id: "12.2.5",
          titleHe: "עיבוד החשבונית",
          titleEn: "Invoice Processing",
          execHe:
            "לאחר ההזנה, המערכת מבצעת את עיבוד-הליבה: 3-Way Match אוטומטי, בדיקת-טולרנסים, חישוב-מס והנחה, וקביעת סטטוס-תשלום. כאן מוכרעת השאלה אם החשבונית משוחררת מיד או נחסמת.",
          beginnerHe:
            "אחרי שהקלדת, SAP עושה את ה'בדיקה החכמה' לבד: משווה מחיר וכמות בין ההזמנה, הקבלה והחשבונית. אם הכל בטווח-המותר — החשבונית משוחררת לתשלום. אם יש פער גדול מדי — היא נחסמת עד שמישהו מאשר.",
          consultantHe:
            "ה-3-Way Match בודק: כמות-חשבונית מול כמות-GR שטרם-חויבה, ומחיר-חשבונית מול מחיר-PO. סטיות נמדדות מול Tolerance Keys (OMR6): PP (מחיר), DQ/BD (כמות), KW (Cond.). חריגה מסף-עליון מציבה Payment Block 'R' (חסום-עד-שחרור). חסימה ידנית אפשרית גם דרך Manual Block. הסטטוס נראה ב-RBKP-RBSTAT. השחרור מבוצע ב-MRBR.",
          purposeHe:
            "להעביר את ההחלטה 'לשלם או לחסום' מבן-אדם לכללים-מוגדרים-מראש — בקרה אובייקטיבית, מהירה וברת-ביקורת על כל חשבונית.",
          processExampleHe:
            "חשבונית במחיר 1.05/יח' מול PO ב-1.00 וטולרנס 3% — הסטייה 5% חורגת; נוצרת Payment Block 'R'. מנהל-רכש בוחן ב-MRBR, מאשר את עליית-המחיר, ומשחרר — החשבונית עוברת לזכאי-לתשלום.",
          cbcHe:
            "ב-CBC עליות-מחיר-סוכר עונתיות יוצרות חסימות-תשלום תכופות; צוות-הרכש סוקר אותן ב-MRBR ומשחרר לאחר אימות מול חוזה-הספק.",
          navHe: [
            "Materials Management ► Logistics Invoice Verification ► Invoice Block ► Set Tolerance Limits",
            "Materials Management ► Logistics Invoice Verification ► Invoice Block ► Determine Payment Block",
            "Materials Management ► Logistics Invoice Verification ► Invoice Block ► Item Amount Check",
          ],
          tables: ["RBKP", "RSEG", "RBTAB", "BSIK"],
          tcodes: ["MIRO", "MRBR", "OMR6"],
          fiori: ["F0859", "F2179"],
          configHe: [
            "Tolerance Limits (OMR6): PP מחיר, DQ כמות-יתר, BD חריגת-תאריך, AP/AN סכום-זעיר, ST תאריך-משלוח.",
            "Determine Payment Block — אילו סוגי-סטייה מציבים Block 'R'.",
            "Stochastic / Manual Block — חסימה אקראית/ידנית לביקורת.",
          ],
          flow: [
            { he: "3-Way Match", note: "PO + GR + חשבונית" },
            { he: "בדיקת-טולרנס", code: "OMR6" },
            { he: "בתוך-טולרנס?", note: "שחרור מיידי" },
            { he: "חריגה → Block R", code: "RBKP" },
            { he: "שחרור ידני", code: "MRBR" },
          ],
          mistakesHe: [
            "טולרנסים רחבים מדי — חשבוניות-יתר עוברות ללא חסימה.",
            "טולרנסים צרים מדי — חסימות-יתר מעכבות תשלומים.",
            "אי-מעקב אחר חסימות שנערמות ב-MRBR.",
          ],
          troubleshootHe: [
            "חשבונית נחסמה ללא-סיבה ברורה ➔ בדוק ב-MRBR את סוג-החסימה (Q כמות/P מחיר/בלוק-ידני).",
            "חשבונית עברה למרות-סטייה ➔ טולרנס רחב מדי או אין Block מוגדר לסוג-הסטייה.",
          ],
          bestPracticeHe: [
            "כייל טולרנסים לפי ערך-חשבונית וקריטיות-חומר.",
            "הרץ MRBR יומית עם הפרדת-תפקידים בין רושם למשחרר.",
          ],
          interviewHe: [
            { qHe: "מהו 3-Way Match?", aHe: "השוואה אוטומטית בין שלושה מקורות: הזמנת-הרכש (מחיר/כמות), קבלת-הסחורה (כמות), והחשבונית — לאישור-תשלום רק במסגרת-הטולרנס." },
            { qHe: "מהי חסימת-תשלום 'R'?", aHe: "Payment Block שמערכת מציבה אוטומטית בסטייה מחוץ-לטולרנס; חוסם תשלום עד שחרור ידני ב-MRBR." },
          ],
          takeawaysHe: [
            "העיבוד מבצע 3-Way Match ובדיקת-טולרנס אוטומטית.",
            "סטייה מחוץ-לטולרנס → Payment Block 'R'.",
            "MRBR משחרר חסימות; OMR6 מגדיר טולרנסים.",
          ],
          relatedHe: [
            { labelHe: "MM · שחרור-חסימות (12.5.2)", href: "/library/mm/chapter-12/#sub-12.5.2" },
            { labelHe: "אובייקט · MRBR", href: "/library/mm/object/MRBR/" },
          ],
        },
        {
          id: "12.2.6",
          titleHe: "דיווח בעיבוד חשבוניות",
          titleEn: "Reporting in Invoice Processing",
          execHe:
            "דיווח בעיבוד-חשבוניות מספק נראות תפעולית: אילו חשבוניות נחסמו, אילו Parked, מהי תפוקת-העיבוד ומהם פערי-ה-GR/IR. דוחות אלה מניעים את ניהול-הזרימה היומי של מחלקת-AP.",
          beginnerHe:
            "כדי לנהל את העבודה צריך לראות 'מה תקוע'. הדוחות מראים כמה חשבוניות מחכות, כמה חסומות, וכמה כבר שולמו — כך הצוות יודע על מה לעבוד היום.",
          consultantHe:
            "כלי-הדיווח: MIR5 (Display List of Invoice Documents), MIR6 (Invoice Overview/selection), MRBR (Blocked Invoices), MR11 (GR/IR Balances). ב-S/4HANA אפליקציות-Fiori אנליטיות מציגות KPI: Blocked Invoice value, Parked count, Invoice cycle time. הנתונים נשענים על RBKP/RSEG וטבלאות-FI.",
          purposeHe:
            "לתת למנהל-AP ולמבקר תמונת-מצב בזמן-אמת על צוואר-הבקבוק בעיבוד, ולמנוע חשבוניות 'אבודות' שלא נרשמו או לא שולמו.",
          processExampleHe:
            "מנהל-AP מריץ MIR6 בבוקר, מסנן לחשבוניות-חסומות מעל 10,000, ומקצה אותן לשחרור-עדיפות ב-MRBR לפני מועד-ניצול-ההנחה.",
          cbcHe:
            "ב-CBC דוח-יומי מציג חשבוניות-תרכיז חסומות לפי גיל; חשבוניות מעל-סף-ערך מקבלות טיפול-עדיפות לשמירה על יחסי-ספק עם The Coca-Cola Company.",
          navHe: [
            "Logistics ► Materials Management ► Logistics Invoice Verification ► Further Processing ► Display List of Invoice Documents (MIR5)",
          ],
          tables: ["RBKP", "RSEG", "BSIK", "EKBE"],
          tcodes: ["MIR5", "MIR6", "MRBR", "MR11"],
          fiori: ["F1060A", "F2179", "F0712"],
          configHe: [
            "Selection variants ב-MIR5/MIR6 לשמירת-שאילתות חוזרות (חסום/Parked/לפי-ספק).",
            "MR11 לניתוח יתרות-GR/IR והכנה לסגירה.",
          ],
          mistakesHe: [
            "הסתמכות על MIRO בלבד ללא דוחות — חשבוניות-Parked נשכחות.",
            "אי-ניטור MR11 — יתרות-GR/IR ישנות מצטברות.",
          ],
          troubleshootHe: [
            "חשבונית 'נעלמה' ➔ חפש ב-MIR5/MIR6 לפי ספק/תאריך/סטטוס (Parked/Held).",
            "יתרת-GR/IR לא-מוסברת ➔ נתח ב-MR11 לפי PO.",
          ],
          bestPracticeHe: [
            "הגדר וריאנט-יומי קבוע לדוחות חסום/Parked.",
            "שלב Fiori KPI-tiles ל-cycle-time וערך-חסום במעקב-יומי.",
          ],
          interviewHe: [
            { qHe: "באיזה דוח בוחנים חשבוניות-Parked?", aHe: "MIR6/MIR5 עם סינון לפי סטטוס — מציג Parked/Held שטרם נרשמו, למניעת זכאים חסרים." },
          ],
          takeawaysHe: [
            "MIR5/MIR6 לרשימות-חשבוניות; MRBR לחסומות; MR11 ל-GR/IR.",
            "דיווח מונע חשבוניות 'אבודות' ומנהל את צוואר-הבקבוק.",
            "Fiori KPI מוסיף נראות-cycle-time בזמן-אמת.",
          ],
          relatedHe: [{ labelHe: "MM · אנליטיקה (12.4)", href: "/library/mm/chapter-12/#sub-12.4" }],
        },
        {
          id: "12.2.7",
          titleHe: "עמודי-אובייקט",
          titleEn: "Object Pages",
          execHe:
            "Object Page ב-S/4HANA Fiori הוא מסך-אובייקט מאוחד המציג חשבונית-ספק בודדת על כל פרטיה: כותרת, שורות, מסמכי-FI מקושרים, סטטוס-תשלום וקבצים-מצורפים — חלופה מודרנית ל-MIR4 הקלאסי.",
          beginnerHe:
            "במקום מסך-טבלאי ישן, Fiori נותן 'דף-אובייקט' יפה לכל חשבונית: בראש פרטי-הספק והסכום, ולמטה כל השורות, הקישורים והסטטוס — הכל במקום אחד, נוח לעיון.",
          consultantHe:
            "Object Pages מבוססים על CDS Views ו-OData ומציגים את אובייקט-החשבונית (RBKP/RSEG + ACDOCA) בתבנית-Fiori-Elements. הם כוללים Navigation ל-PO, ל-GR, למסמך-FI ולסטטוס-התשלום, וכן Side-by-side facets. אפליקציות כמו 'Manage Supplier Invoices' ו-'Supplier Invoices List' מובילות ל-Object Page של חשבונית.",
          purposeHe:
            "לספק חוויית-משתמש אחידה, מקושרת וניתנת-לניווט לכל אובייקט-עסקי, ולהחליף את ריבוי-המסכים הטרנזקציוניים בתצוגה-אחת-עשירה.",
          processExampleHe:
            "משתמש לוחץ על חשבונית ברשימת-Fiori; נפתח Object Page עם פרטי-החשבונית, שורות-ההתאמה, וקישור-ישיר למסמך-ה-PO ולמסמך-התשלום — ללא מעבר בין טרנזקציות.",
          cbcHe:
            "ב-CBC צוות-AP עובר ל-Object Pages לבירור-מהיר של חשבונית-ספק תוך ניווט ל-PO ול-GR בלחיצה — מקצר זמן-בירור מול ספקים.",
          navHe: [
            "SAP Fiori Launchpad ► Sourcing and Procurement ► Invoice Processing ► Manage Supplier Invoices",
          ],
          tables: ["RBKP", "RSEG", "ACDOCA"],
          tcodes: ["MIR4"],
          fiori: ["F0859", "F1060A", "F2179"],
          configHe: [
            "Object Pages מופעלים דרך הקצאת-Business-Catalog ו-Tiles ב-Fiori Launchpad.",
            "CDS-Views ו-OData services חייבים להיות פעילים (SICF/maintain service).",
          ],
          mistakesHe: [
            "הנחה שכל פונקציית-MIRO זמינה ב-Object Page — חלק מהפעולות עדיין טרנזקציוניות.",
            "אי-הקצאת ה-Business Catalog — ה-Tile לא מופיע למשתמש.",
          ],
          troubleshootHe: [
            "Object Page לא נטען ➔ OData service לא-פעיל או חוסר-הרשאה ל-Catalog.",
            "ניווט ל-PO נכשל ➔ הרשאת-תצוגת-PO חסרה למשתמש.",
          ],
          bestPracticeHe: [
            "הנחה משתמשי-AP ל-Object Pages לבירורים; שמור MIRO לקליטה-מסיבית.",
            "ודא הקצאת-קטלוגים נכונה בתפקידי-Fiori.",
          ],
          interviewHe: [
            { qHe: "מהו Object Page ב-Fiori?", aHe: "מסך-אובייקט מאוחד מבוסס-CDS המציג ישות-עסקית בודדת (כגון חשבונית-ספק) על כל פרטיה וקישוריה, חלופה ל-MIR4." },
          ],
          takeawaysHe: [
            "Object Page = תצוגת-Fiori עשירה ומקושרת לחשבונית בודדת.",
            "מבוסס CDS/OData; מנווט ל-PO/GR/FI/תשלום.",
            "משלים את MIRO הטרנזקציוני.",
          ],
          relatedHe: [{ labelHe: "אובייקט · RBKP", href: "/library/mm/object/RBKP/" }],
        },
      ],
    },
    // ============================================================ 12.3
    {
      id: "12.3",
      titleHe: "חשבונות זכאים",
      titleEn: "Accounts Payable",
      execHe:
        "חשבונות-זכאים (Accounts Payable, AP) הוא תת-ספר ה-FI המנהל את החובות-לספקים: מרגע רישום-החשבונית (פתיחת Open Item) ועד התשלום (סילוק). הוא הגשר בין ה-MM (חשבונית) לבין הכספים והתזרים, ומספק את התשתית לתשלום ולניהול-יתרות-הספק.",
      beginnerHe:
        "אחרי שרושמים חשבונית, החוב לספק 'יושב' בתת-מערכת שנקראת חשבונות-זכאים. שם רואים כמה חייבים לכל ספק, מתי צריך לשלם, ומשם מבצעים את התשלום. כשמשלמים — החוב נסגר.",
      consultantHe:
        "AP מנוהל ברמת חשבון-ספק (Business Partner עם תפקיד-FLVN01). Open Items יושבים ב-BSIK ועוברים ל-BSAK בסילוק. תהליכי-הליבה: תשלום (אוטומטי F110 / ידני F-53), קיזוז (Clearing F-44), והתאמת-יתרות (FBL1N/FK10N). ב-S/4HANA הנתונים מאוחדים ב-ACDOCA, אך תצוגות-Open/Cleared נשמרות. Payment Terms (ZTERM) קובעים מועד-תשלום והנחת-מזומן.",
      purposeHe:
        "לנהל את ההתחייבויות-לספקים בצורה מבוקרת: לשלם בזמן הנכון (לא מוקדם מדי, לא באיחור), לנצל הנחות-מזומן, ולתחזק יתרות-ספק נכונות לדוחות-הכספיים.",
      processExampleHe:
        "חשבונית נרשמה → Open Item ב-BSIK עם Due Date לפי ZTERM (למשל נטו-30, 2% הנחה תוך-10). F110 בוחר את הפריט ביום-ה-9, משלם עם 2% הנחה, ומעביר ל-BSAK.",
      cbcHe:
        "ב-CBC חשבונות-הזכאים מנהלים מאות-ספקים: תרכיז, סוכר, אריזה, לוגיסטיקה. צוות-ה-AP מתזמן תשלומים לניצול-מרבי של הנחות-מזומן תוך שמירה על תזרים-מזומנים יציב למפעל-המילוי.",
      navHe: [
        "Financial Accounting ► Accounts Receivable and Accounts Payable ► Vendor Accounts ► Master Data ► Preparations for Creating Vendor Master Data",
        "Financial Accounting ► Accounts Receivable and Accounts Payable ► Business Transactions ► Outgoing Payments ► Automatic Outgoing Payments",
      ],
      tables: ["BSIK", "BSAK", "LFB1", "LFA1", "ACDOCA"],
      tcodes: ["FK10N", "FBL1N", "F110", "F-53", "F-44"],
      fiori: ["F0711", "F1060A", "F2179"],
      configHe: [
        "Payment Terms (ZTERM, OBB8) — מועד-תשלום והנחות-מזומן.",
        "Reconciliation Account — חשבון-מאזן המקשר תת-ספר-ספק ל-G/L.",
        "Payment Methods + House Banks — תשתית-התשלום.",
      ],
      mistakesHe: [
        "Reconciliation Account שגוי באב-הספק — יתרות-ספק לא מסונכרנות עם ה-G/L.",
        "Payment Terms שגויים — תשלום מוקדם/מאוחר ואובדן-הנחה.",
      ],
      troubleshootHe: [
        "יתרת-ספק לא-תואמת ל-G/L ➔ Reconciliation Account שגוי או רישום-ידני ל-G/L.",
        "פריט לא-משולם ➔ Payment Block או Payment Method חסר באב-הספק.",
      ],
      bestPracticeHe: [
        "אכוף Payment Terms עקביים ברמת-אב-הספק ו-PO.",
        "התאם יתרות-ספק (FK10N) מול ה-G/L מדי-חודש.",
      ],
      interviewHe: [
        { qHe: "היכן יושב חוב-ספק לפני ואחרי תשלום?", aHe: "לפני: Open Item ב-BSIK; אחרי: Cleared Item ב-BSAK. שניהם משתקפים ב-ACDOCA ב-S/4HANA." },
        { qHe: "מהו Reconciliation Account?", aHe: "חשבון-מאזן ב-G/L המקבל אוטומטית כל רישום בתת-ספר-הספק, ושומר על סנכרון בין AP ל-General Ledger." },
      ],
      takeawaysHe: [
        "AP מנהל את חיי-החוב-לספק: Open Item (BSIK) → תשלום → Cleared (BSAK).",
        "Payment Terms קובעים מועד והנחה; Reconciliation Account מסנכרן ל-G/L.",
        "F110 (אוטומטי) ו-F-53 (ידני) הם מנגנוני-התשלום.",
      ],
      relatedHe: [
        { labelHe: "אובייקט · BSAK", href: "/library/mm/object/BSAK/" },
        { labelHe: "MM · אנליטיקת-זכאים (12.4)", href: "/library/mm/chapter-12/#sub-12.4" },
      ],
      children: [
        {
          id: "12.3.1",
          titleHe: "עיבוד תשלומי-ספק",
          titleEn: "Supplier Payment Processing",
          execHe:
            "עיבוד-תשלומי-ספק הוא ביצוע התשלום בפועל — אוטומטי דרך תוכנית-התשלומים (F110) או ידני (F-53). זהו צעד-המזומן הסוגר את מעגל-הזכאים: בחירת פריטים-פתוחים, יצירת אמצעי-תשלום וסילוק ה-Open Item.",
          beginnerHe:
            "כאן באמת משלמים. בדרך-כלל לא משלמים חשבונית-חשבונית ידנית, אלא מריצים תוכנית (F110) שאוספת את כל מה שצריך לשלם היום, מייצרת העברות-בנקאיות, וסוגרת את החובות. אפשר גם תשלום-בודד ידני.",
          consultantHe:
            "F110 (Automatic Payment Program) פועל בשלבים: Parameters (חברה/ספק/שיטה/תאריך) → Proposal (הצעה לבדיקה/עריכה) → Payment Run (סילוק BSIK→BSAK + יצירת מסמכי-תשלום) → Print/Payment Medium (DME/Checks). הבחירה לפי Due Date, Payment Block, Payment Method ו-House Bank. F-53 לתשלום-ידני-בודד. הנחת-מזומן מחושבת אם משלמים בתוך-תקופת-ההנחה.",
          purposeHe:
            "לאוטמט תשלומי-המוני בצורה מבוקרת, לבחור נכון מה לשלם ומתי, לנצל הנחות, ולהבטיח שלא משלמים פריטים-חסומים.",
          processExampleHe:
            "ביום-תשלום-שבועי F110 רץ: Parameters לחברה+שיטת-העברה, Proposal מציג 320 פריטים, מנהל-AP מוציא 5 פריטים-במחלוקת, מריץ Payment — נוצרים מסמכי-תשלום, BSIK→BSAK, וקובץ-DME לבנק.",
          cbcHe:
            "ב-CBC ריצת-F110 שבועית משלמת מאות-ספקים בהעברה-בנקאית; פריטים-חסומים (MRBR שטרם-שוחרר) נדחים אוטומטית, ותרכיז משולם בעדיפות לניצול-הנחת-מזומן.",
          navHe: [
            "Financial Accounting ► Accounts Receivable and Accounts Payable ► Business Transactions ► Outgoing Payments ► Automatic Outgoing Payments ► Payment Method/Bank Selection for Payment Program",
          ],
          tables: ["BSIK", "BSAK", "REGUH", "REGUP", "PAYR"],
          tcodes: ["F110", "F-53", "F-58", "FBZP"],
          fiori: ["F0770", "F1602", "F2179"],
          configHe: [
            "FBZP — Payment Program config: Company codes, Paying companies, Payment methods, Bank determination, House Banks.",
            "Payment Method per country/company קובע מסמך-תשלום (העברה/צ'ק/DME).",
            "Ranking Order + Available Amounts ל-House Banks קובעים מאיזה בנק לשלם.",
          ],
          flow: [
            { he: "Parameters", code: "F110", note: "חברה/ספק/שיטה/תאריך" },
            { he: "Proposal", note: "בדיקה + עריכה" },
            { he: "Payment Run", code: "REGUH/REGUP", note: "סילוק BSIK→BSAK" },
            { he: "Payment Medium", code: "DME/PAYR", note: "קובץ-בנק/צ'ק" },
          ],
          masterDataHe: [
            "Payment Method + Bank Details באב-הספק (LFB1/LFBK).",
            "House Bank + Account ID (FI12) — מקור-התשלום.",
          ],
          mistakesHe: [
            "הרצת Payment ללא בדיקת-Proposal — תשלומים שגויים יוצאים לבנק.",
            "House Bank ללא יתרה-מוגדרת — Proposal נכשל.",
            "Payment Method חסר באב-הספק — הפריט לא נבחר.",
          ],
          troubleshootHe: [
            "ספק לא-משולם ב-F110 ➔ Payment Block, Payment Method חסר, או Due Date עתידי.",
            "Proposal ריק ➔ פרמטרי-בחירה צרים מדי או אין פריטים-בשלים.",
            "קובץ-DME לא-נוצר ➔ Payment Medium Workbench/Variant לא-מוגדר.",
          ],
          bestPracticeHe: [
            "בדוק תמיד Proposal לפני Payment Run; הפרד-תפקידים בין מכין למאשר.",
            "תזמן ריצות-F110 קבועות מיושרות למועדי-הנחת-מזומן.",
          ],
          interviewHe: [
            { qHe: "מהם שלבי תוכנית-התשלומים F110?", aHe: "Parameters → Proposal → Payment Run → Payment Medium. ה-Proposal ניתן לעריכה לפני ביצוע-התשלום בפועל." },
            { qHe: "כיצד F110 בוחר אילו פריטים לשלם?", aHe: "לפי Due Date, Payment Method, היעדר Payment Block, ו-Bank Determination — מתוך Open Items ב-BSIK." },
          ],
          takeawaysHe: [
            "F110 = תשלום-אוטומטי בשלבים: Parameters→Proposal→Run→Medium.",
            "תשלום מסלק BSIK→BSAK ומייצר מסמך-תשלום וקובץ-בנק.",
            "FBZP מגדיר את כל תשתית-התשלום; F-53 לתשלום-ידני.",
          ],
          relatedHe: [
            { labelHe: "MM · ניתוח-תשלומים (12.4.10)", href: "/library/mm/chapter-12/#sub-12.4.10" },
            { labelHe: "אובייקט · BSAK", href: "/library/mm/object/BSAK/" },
          ],
        },
        {
          id: "12.3.2",
          titleHe: "ניהול חשבון-ספק",
          titleEn: "Supplier Account Management",
          execHe:
            "ניהול-חשבון-ספק מתחזק את נתוני-האב והיתרות של הספק: פרטי-תשלום, בנק, תנאי-תשלום, וניתוח Open/Cleared Items. נתוני-אב נכונים הם תנאי לתשלום תקין ולדוחות-זכאים אמינים.",
          beginnerHe:
            "לכל ספק יש 'תיק' במערכת: שמו, חשבון-הבנק שלו, מתי משלמים לו, וכמה חייבים לו כרגע. ניהול-חשבון-ספק הוא תחזוקת התיק הזה ובדיקת-היתרות שלו.",
          consultantHe:
            "באב-הספק (Business Partner, תפקיד FLVN01) מוחזקים: LFA1 (כללי), LFB1 (חברה: Recon Account, ZTERM, Payment Block, Dunning), LFM1 (רכש), LFBK (בנק). FK10N/FBL1N מציגים יתרות ופריטים. ב-S/4HANA אב-הספק מאוחד ל-Business Partner (BP), והגישה הישנה (XK01/MK01) הוחלפה ב-BP. ניהול כולל גם חסימות (Posting/Payment Block) ו-Dunning.",
          purposeHe:
            "להבטיח שכל ספק משולם לחשבון-הנכון, בתנאים-הנכונים, ושיתרתו משקפת-נאמנה את החוב — בסיס לתשלום, לתזרים ולביקורת.",
          processExampleHe:
            "ספק מעדכן חשבון-בנק; AP מעדכן LFBK ב-BP, מאשר דרך תהליך-בקרת-שינויי-בנק, ומריץ FBL1N לאימות שכל הפריטים-הפתוחים יופנו לחשבון-החדש בריצת-F110 הבאה.",
          cbcHe:
            "ב-CBC ניהול-אב-ספק ל-The Coca-Cola Company כולל בקרה מחמירה על שינויי-בנק (סיכון-הונאה) ותנאי-תשלום מוסכמים-חוזית לתרכיז.",
          navHe: [
            "Financial Accounting ► Accounts Receivable and Accounts Payable ► Vendor Accounts ► Master Data ► Preparations for Creating Vendor Master Data ► Define Account Groups with Screen Layout",
            "Cross-Application Components ► SAP Business Partner ► Business Partner ► Basic Settings",
          ],
          tables: ["LFA1", "LFB1", "LFM1", "LFBK", "BSIK"],
          tcodes: ["BP", "FK10N", "FBL1N", "FK08"],
          fiori: ["F0711", "F1058", "F1602"],
          configHe: [
            "BP Roles + Account Groups — מבנה-מסך וטווחי-מספרים לספק.",
            "Field Status לאב-ספק — שדות-חובה (Recon Account, ZTERM, Bank).",
            "Bank-Change Control / Sensitive Fields — אישור-כפול לשינויי-בנק.",
          ],
          masterDataHe: [
            "LFB1-AKONT = Reconciliation Account · LFB1-ZTERM = Payment Terms.",
            "LFBK = Bank Details · LFB1-ZAHLS = Payment Block · LFB1-MABER = Dunning Area.",
          ],
          mistakesHe: [
            "שינוי-בנק ללא בקרת-אישור-כפול — חשיפה-להונאה.",
            "Sensitive-Fields לא-מוגדרים — שינויים-קריטיים עוברים ללא אישור.",
          ],
          troubleshootHe: [
            "תשלום הופנה לחשבון-שגוי ➔ LFBK עודכן ללא בקרה; בדוק לוג-שינויים (FK04).",
            "ספק חסום-לתשלום ➔ LFB1-ZAHLS (Payment Block) מאוכלס.",
          ],
          bestPracticeHe: [
            "הגדר Sensitive Fields (בנק/Recon) לאישור-כפול.",
            "בצע סקירה-תקופתית של אבות-ספק כפולים/לא-פעילים.",
          ],
          interviewHe: [
            { qHe: "כיצד מתוחזק אב-ספק ב-S/4HANA?", aHe: "דרך Business Partner (BP) עם תפקיד FLVN01; XK01/MK01 הישנים הוחלפו. הנתונים נשמרים ב-LFA1/LFB1/LFM1/LFBK." },
            { qHe: "מהם Sensitive Fields באב-ספק?", aHe: "שדות-קריטיים (בעיקר בנק ו-Recon Account) שכל שינוי בהם דורש אישור-כפול וחוסם תשלום עד אישור — בקרת-הונאה." },
          ],
          takeawaysHe: [
            "אב-ספק = BP (FLVN01); נתונים ב-LFA1/LFB1/LFM1/LFBK.",
            "Recon Account, ZTERM, Bank, Payment Block הם שדות-המפתח.",
            "בקרת Sensitive Fields על שינויי-בנק מונעת הונאה.",
          ],
          relatedHe: [{ labelHe: "אובייקט · LFB1", href: "/library/mm/object/LFB1/" }],
        },
      ],
    },
    // ============================================================ 12.4
    {
      id: "12.4",
      titleHe: "אנליטיקה ודיווח של חשבוניות וזכאים",
      titleEn: "Invoice and Payables Management Analytics and Reporting",
      execHe:
        "אנליטיקת-החשבוניות-והזכאים הופכת את נתוני-ה-AP לתובנות-ניהוליות: מצב-זכאים, פיגורים, תחזית-תשלומים, ניצול-הנחות ויעילות-תשלום. ב-S/4HANA היא מסופקת בזמן-אמת דרך CDS ו-Fiori, ללא צורך ב-Data Warehouse.",
      beginnerHe:
        "אחרי שיש המון חשבוניות ותשלומים, ההנהלה רוצה לראות תמונה: כמה אנחנו חייבים, למי, מתי צריך לשלם, והאם אנחנו מנצלים הנחות. כל אלה הם 'דוחות-אנליטיקה' — לוחות-מחוונים שמסכמים את הנתונים.",
      consultantHe:
        "האנליטיקה נשענת על CDS Views מעל ACDOCA/BSIK/BSAK, מוצגת ב-Fiori Analytical Apps ו-Overview Pages עם Drill-Down ל-Open Items. KPI-ים מרכזיים: Overdue/Future Payables, Cash Discount Forecast/Utilization, DPO (Days Payable Outstanding). הנתונים בזמן-אמת (Insight-to-Action) — לחיצה על KPI מנווטת ישירות ל-F110 או ל-Open Item.",
      purposeHe:
        "לתת ל-CFO ולמנהל-AP בקרה על הון-חוזר ותזרים: לדעת מתי משלמים, להימנע מפיגורים, למקסם-הנחות ולמדוד יעילות-תשלום — בזמן-אמת ובלי דוחות-לילה.",
      processExampleHe:
        "מנהל-AP פותח 'Accounts Payable Overview', רואה Overdue עולה, מנתח Aging, מזהה ספק-בעייתי, ומנווט ל-Open Items שלו לתיקון — הכל מלוח-מחוונים אחד.",
      cbcHe:
        "ב-CBC ה-CFO עוקב אחר DPO וניצול-הנחות-מזומן רבעוני; עלייה ב-DPO מול ספקי-אריזה משקפת אסטרטגיית-הון-חוזר מכוונת של מפעל-המילוי.",
      navHe: [
        "SAP Fiori Launchpad ► Sourcing and Procurement ► Invoice and Payables Management ► Analytics",
      ],
      tables: ["BSIK", "BSAK", "ACDOCA", "RBKP"],
      tcodes: ["FBL1N", "FK10N", "S_ALR_87012078"],
      fiori: ["F2179", "F2906", "F0711"],
      configHe: [
        "CDS-Views ל-AP analytics חייבים להיות פעילים ומחוברים ל-Fiori catalogs.",
        "KPI tiles ו-Overview Pages מוקצים בתפקידי-Fiori של מנהל-AP/CFO.",
      ],
      mistakesHe: [
        "הסתמכות על דוחות-ABAP ישנים במקום Fiori real-time.",
        "אי-הקצאת קטלוגים אנליטיים — ה-KPI לא נראים.",
      ],
      troubleshootHe: [
        "KPI מציג נתון-שגוי ➔ CDS-View / Recon-Account mapping שגוי.",
        "Drill-down נכשל ➔ הרשאת-Open-Items חסרה למשתמש.",
      ],
      bestPracticeHe: [
        "השתמש ב-Overview Page כנקודת-מבט-יומית למנהל-AP.",
        "חבר KPI ל-Insight-to-Action (ניווט ל-F110/Open Items).",
      ],
      interviewHe: [
        { qHe: "מהו יתרון האנליטיקה ב-S/4HANA לעומת ECC?", aHe: "ניתוח בזמן-אמת מעל ACDOCA דרך CDS/Fiori, ללא העתקת-נתונים ל-BW, עם Insight-to-Action ישיר לתיקון." },
      ],
      takeawaysHe: [
        "אנליטיקת-AP בזמן-אמת מעל ACDOCA דרך CDS/Fiori.",
        "KPI מרכזיים: Aging, Overdue, Future, Cash Discount, DPO.",
        "Insight-to-Action מנווט מ-KPI ישירות לפעולה.",
      ],
      relatedHe: [{ labelHe: "MM · חשבונות-זכאים (12.3)", href: "/library/mm/chapter-12/#sub-12.3" }],
      children: [
        {
          id: "12.4.1",
          titleHe: "סקירת חשבונות-זכאים",
          titleEn: "Accounts Payable Overview",
          execHe:
            "Accounts Payable Overview הוא Overview Page המרכז את כל KPI-ה-AP בעמוד-אחד: יתרת-זכאים, פיגורים, תחזית, ניצול-הנחות ו-DPO — נקודת-המבט-היומית של מנהל-ה-AP.",
          beginnerHe:
            "זה 'מסך-הבית' של מנהל-הזכאים: כרטיסיות קטנות שכל אחת מראה מספר חשוב — כמה חייבים, כמה באיחור, כמה לשלם השבוע. לחיצה על כרטיסייה פותחת את הפרטים.",
          consultantHe:
            "Overview Page (Fiori Elements) מציג Cards מבוססי-CDS עם KPI ו-Mini-charts, וכל Card מנווט ל-Analytical List Page או ל-Open Items. הוא מאחד את 12.4.2–12.4.11 לתצוגה-אחת. נשען על ACDOCA/BSIK בזמן-אמת.",
          purposeHe:
            "לרכז את כל מדדי-הזכאים במבט-אחד ולאפשר drill-down מהיר — חוסך פתיחת-דוחות נפרדים ומאיץ-החלטה.",
          processExampleHe:
            "מנהל-AP פותח את ה-Overview בבוקר, מזהה כרטיס-Overdue אדום, לוחץ, ומנותב לרשימת-הפיגורים לטיפול-מיידי.",
          cbcHe:
            "ב-CBC מנהל-AP במפעל-המילוי משתמש ב-Overview כ-dashboard-יומי לאיזון תשלומים מול תזרים.",
          navHe: ["SAP Fiori Launchpad ► Accounts Payable Overview"],
          tables: ["BSIK", "BSAK", "ACDOCA"],
          tcodes: ["FK10N", "FBL1N"],
          fiori: ["F2179", "F2906"],
          configHe: ["הקצאת Overview Page Catalog לתפקיד מנהל-AP; הפעלת CDS-Cards."],
          mistakesHe: ["שימוש בדוחות-בודדים במקום ב-Overview המאוחד."],
          troubleshootHe: ["Card ריק ➔ CDS-View לא-פעיל או חוסר-הרשאה."],
          bestPracticeHe: ["הפוך את ה-Overview לנקודת-הכניסה-היומית של AP."],
          interviewHe: [{ qHe: "מהו Overview Page?", aHe: "עמוד-Fiori המרכז KPI-Cards מבוססי-CDS עם drill-down, נקודת-מבט-אחת לתחום." }],
          takeawaysHe: ["Overview Page = dashboard מאוחד ל-AP.", "Cards עם drill-down ל-Open Items בזמן-אמת."],
          relatedHe: [{ labelHe: "MM · אנליטיקה (12.4)", href: "/library/mm/chapter-12/#sub-12.4" }],
        },
        {
          id: "12.4.2",
          titleHe: "ניתוח-גיול",
          titleEn: "Aging Analysis",
          execHe:
            "ניתוח-גיול (Aging) מקבץ את חובות-הספק לפי טווחי-גיל (למשל 0–30, 31–60, 61–90, 90+ יום) — מראה כמה מהזכאים 'מזדקנים' וחושף בעיות-תשלום או חסימות-כרוניות.",
          beginnerHe:
            "מחלקים את החובות לפי 'בני-כמה הם': מה שחדש, מה שבן-חודש, ומה שבן-חודשיים-ומעלה. ככל שחוב 'מזדקן' יותר — סימן שמשהו תקוע.",
          consultantHe:
            "Aging מבוסס על Net Due Date מול תאריך-המפתח, מקובץ ל-buckets. נשען על BSIK (Open Items) ו-CDS analytics. בכלי-ה-Fiori ניתן drill-down ל-Open Items בכל bucket, ולסנן לפי ספק/קבוצה. גיל-גבוה מצביע על חסימות-MRBR לא-משוחררות, מחלוקות, או בעיות-master-data.",
          purposeHe:
            "לזהות זכאים-מזדקנים הדורשים-טיפול: חסימות-תקועות, מחלוקות-ספק, או ספקים שנשכחו — לפני שהופכים לבעיית-יחסים או לסיכון-מאזני.",
          processExampleHe:
            "ניתוח-גיול מראה 200,000 בטווח-90+; drill-down חושף חמש חשבוניות-תרכיז חסומות ב-MRBR מזה-חודשיים — מועברות לשחרור-דחוף.",
          cbcHe:
            "ב-CBC bucket-90+ עם ספק-תרכיז מסכן יחסי-מפתח; הוא מנוטר שבועית ומטופל מיידית.",
          navHe: ["SAP Fiori Launchpad ► Aging Analysis (Payables)"],
          tables: ["BSIK", "ACDOCA"],
          tcodes: ["FBL1N", "S_ALR_87012078"],
          fiori: ["F2179"],
          configHe: ["הגדרת Aging buckets (טווחי-ימים) ב-CDS/Fiori parameters."],
          mistakesHe: ["טווחי-buckets לא-מתאימים לעסק — מסתירים פיגורים."],
          troubleshootHe: ["bucket-גבוה לא-מוסבר ➔ drill-down לחסימות-MRBR/מחלוקות."],
          bestPracticeHe: ["סקור bucket-90+ שבועית; חבר ל-MRBR לשחרור-חסימות."],
          interviewHe: [{ qHe: "מה חושף ניתוח-גיול ב-AP?", aHe: "חובות-ספק מזדקנים לפי buckets; גיל-גבוה מאותת על חסימות-תקועות, מחלוקות או בעיות-master-data." }],
          takeawaysHe: ["Aging מקבץ זכאים לפי-גיל.", "גיל-גבוה = חסימות/מחלוקות לטיפול.", "drill-down ל-Open Items בכל bucket."],
          relatedHe: [{ labelHe: "MM · פיגורי-זכאים (12.4.3)", href: "/library/mm/chapter-12/#sub-12.4.3" }],
        },
        {
          id: "12.4.3",
          titleHe: "זכאים בפיגור",
          titleEn: "Overdue Payables",
          execHe:
            "Overdue Payables מציג חובות שעבר מועד-תשלומם וטרם-שולמו — מדד-בקרה לחשיפת תשלומים-שנשכחו, חסימות-מתמשכות ובעיות-תהליך, ולשמירה על יחסי-ספק.",
          beginnerHe:
            "אלה החובות ש'כבר היו צריכים לשלם אבל לא שילמנו'. אם זה קורה, סימן שמשהו נתקע — חסימה, חוסר-מזומן, או טעות.",
          consultantHe:
            "מבוסס על Open Items ב-BSIK עם Net Due Date < תאריך-המפתח. ה-KPI מציג סכום וכמות-פיגורים, drill-down לספק/פריט. סיבות-נפוצות: Payment Block 'R' שלא-שוחרר, Payment Method חסר, או פריט שלא-נכלל ב-F110.",
          purposeHe:
            "לאתר ולתקן תשלומים-שלא-בוצעו-בזמן — מניעת קנסות-איחור, פגיעה-באשראי-ספק ושיבוש-אספקה.",
          processExampleHe:
            "KPI-Overdue קופץ; drill-down מגלה 30 פריטים עם Payment Block; הם משוחררים ב-MRBR ונכללים בריצת-F110 הבאה.",
          cbcHe:
            "ב-CBC פיגור לספק-CO2 קריטי לייצור; ניטור-Overdue יומי מונע עצירת-קו עקב מחלוקת-תשלום.",
          navHe: ["SAP Fiori Launchpad ► Overdue Payables"],
          tables: ["BSIK", "ACDOCA"],
          tcodes: ["FBL1N", "F110"],
          fiori: ["F2179"],
          configHe: ["KPI-Overdue מבוסס Net Due Date; threshold-התראה ניתן-להגדרה."],
          mistakesHe: ["התעלמות מ-Overdue עד שהספק-מתלונן."],
          troubleshootHe: ["פריט בפיגור ➔ בדוק Payment Block, Payment Method ו-Due Date."],
          bestPracticeHe: ["נטר Overdue יומית וחבר ל-MRBR ול-F110."],
          interviewHe: [{ qHe: "מה גורם לזכאי-בפיגור?", aHe: "Payment Block לא-משוחרר, Payment Method חסר באב-הספק, או אי-הכללה בריצת-F110." }],
          takeawaysHe: ["Overdue = חובות שעברו מועד וטרם-שולמו.", "סיבה-נפוצה: Payment Block/Method.", "נטר יומית; תקן דרך MRBR/F110."],
          relatedHe: [{ labelHe: "MM · שחרור-חסימות (12.5.2)", href: "/library/mm/chapter-12/#sub-12.5.2" }],
        },
        {
          id: "12.4.4",
          titleHe: "זכאים עתידיים",
          titleEn: "Future Payables",
          execHe:
            "Future Payables מציג חובות שמועד-תשלומם בעתיד, מקובצים לפי תקופות — בסיס-תזרים: כמה כסף יידרש בכל שבוע/חודש הקרובים לתשלום-ספקים.",
          beginnerHe:
            "ההפך מפיגור: 'כמה נצטרך לשלם בשבועות/חודשים הבאים'. עוזר לתכנן שיהיה מספיק כסף בבנק בכל מועד.",
          consultantHe:
            "מבוסס Open Items ב-BSIK עם Net Due Date עתידי, מקובץ ל-time-buckets. משמש לתחזית-תזרים-יוצא (Cash Outflow). drill-down לפי ספק/תקופה. משולב לרוב עם Cash Management ו-Liquidity Forecast.",
          purposeHe:
            "לתכנן תזרים-מזומנים-יוצא: לוודא נזילות מספקת בכל מועד-תשלום, ולתזמן-תשלומים מול הכנסות.",
          processExampleHe:
            "תזרים-עתידי מראה 1.2M לתשלום בשבוע-הבא; הכספים מוודאים יתרת-בנק מספקת ומתאמים מועד-F110.",
          cbcHe:
            "ב-CBC תחזית-זכאים-עתידיים מיושרת מול עונתיות-מכירות-המשקאות לשמירת-נזילות בשיא-הקיץ.",
          navHe: ["SAP Fiori Launchpad ► Future Payables"],
          tables: ["BSIK", "ACDOCA"],
          tcodes: ["FBL1N", "FF7B"],
          fiori: ["F2179"],
          configHe: ["time-buckets עתידיים ב-CDS; אינטגרציה עם Cash Management אופציונלית."],
          mistakesHe: ["התעלמות מתחזית-עתידית — הפתעות-נזילות."],
          troubleshootHe: ["תחזית לא-תואמת ➔ Net Due Date / ZTERM שגויים בפריטים."],
          bestPracticeHe: ["שלב Future Payables בתכנון-תזרים-שבועי."],
          interviewHe: [{ qHe: "למה משמש Future Payables?", aHe: "לתחזית-תזרים-יוצא — כמה יידרש לתשלום-ספקים בכל תקופה עתידית, לתכנון-נזילות." }],
          takeawaysHe: ["Future Payables = חובות-עתידיים לפי תקופה.", "בסיס לתחזית-תזרים-יוצא ולתכנון-נזילות."],
          relatedHe: [{ labelHe: "MM · תחזית-הנחת-מזומן (12.4.5)", href: "/library/mm/chapter-12/#sub-12.4.5" }],
        },
        {
          id: "12.4.5",
          titleHe: "תחזית הנחת-מזומן",
          titleEn: "Cash Discount Forecast",
          execHe:
            "Cash Discount Forecast מציג כמה הנחת-מזומן ניתן עוד להשיג אם משלמים בתוך-תקופות-ההנחה — כלי לתעדוף-תשלומים שממקסם חיסכון.",
          beginnerHe:
            "ספקים רבים נותנים הנחה אם משלמים מהר ('2% אם תוך-10 ימים'). הדוח מראה כמה כסף אפשר עוד לחסוך אם משלמים בזמן — כדי לא לפספס הנחות.",
          consultantHe:
            "מבוסס על Payment Terms (ZTERM) ב-Open Items: מחשב Cash Discount עדיין-זמין לפי Discount Days מול תאריך-המפתח. מקובץ לפי תקופת-תפוגת-ההנחה. מאפשר לתעדף ב-F110 פריטים שעומדים-לפקוע. KPI משלים את Cash Discount Utilization (12.4.6).",
          purposeHe:
            "למקסם-חיסכון-פיננסי: לזהות הנחות שעומדות-לפקוע ולתעדף-תשלומן לפני המועד.",
          processExampleHe:
            "התחזית מראה 8,000 הנחה-זמינה שתפקע ב-3 ימים; הכספים מקדימים ריצת-F110 לפריטים אלה.",
          cbcHe:
            "ב-CBC הנחות-מזומן-תרכיז משמעותיות; התחזית מתעדפת תשלומי-תרכיז לניצול-מרבי.",
          navHe: ["SAP Fiori Launchpad ► Cash Discount Forecast"],
          tables: ["BSIK", "ACDOCA"],
          tcodes: ["FBL1N", "F110"],
          fiori: ["F2179"],
          configHe: ["מבוסס ZTERM (Discount %, Discount Days) — תחזוקה ב-OBB8."],
          mistakesHe: ["אי-מעקב אחר הנחות-פוקעות — אובדן-חיסכון."],
          troubleshootHe: ["הנחה לא-מחושבת ➔ ZTERM ללא Discount Days/% תקינים."],
          bestPracticeHe: ["תזמן F110 לניצול-מרבי של הנחות-פוקעות."],
          interviewHe: [{ qHe: "מה מציג Cash Discount Forecast?", aHe: "הנחות-מזומן עדיין-זמינות לפי תקופת-תפוגתן, לתעדוף-תשלומים שממקסם-חיסכון." }],
          takeawaysHe: ["מציג הנחות-מזומן זמינות-לפי-תפוגה.", "מתעדף תשלומים-פוקעים ב-F110.", "מבוסס ZTERM."],
          relatedHe: [{ labelHe: "MM · ניצול-הנחת-מזומן (12.4.6)", href: "/library/mm/chapter-12/#sub-12.4.6" }],
        },
        {
          id: "12.4.6",
          titleHe: "ניצול הנחת-מזומן",
          titleEn: "Cash Discount Utilization",
          execHe:
            "Cash Discount Utilization מודד בדיעבד כמה מההנחות-הזמינות נוצלו בפועל מול כמה הופסדו — מדד-יעילות לתהליך-התשלום ולעבודת-מחלקת-ה-AP.",
          beginnerHe:
            "אחרי ששילמנו, הדוח בודק: מההנחות שיכולנו לקבל — כמה באמת קיבלנו וכמה איבדנו כי שילמנו מאוחר. אחוז-גבוה = מחלקה-יעילה.",
          consultantHe:
            "מחשב יחס Discount Taken מול Discount Lost מתוך Cleared Items (BSAK) שבהם הייתה הנחה-זמינה. KPI = % ניצול. הנחה-שאבדה (Lost) מנותחת לפי-סיבה: חסימה, פיגור-עיבוד, או החלטת-תזרים. משמש לשיפור-תהליך מתמשך.",
          purposeHe:
            "למדוד ולשפר את יעילות-ניצול-ההנחות — כל הנחה-שאבדה היא חיסכון-שהוחמץ; המדד מזהה היכן התהליך-מאבד-כסף.",
          processExampleHe:
            "ניצול-רבעוני 82%; ניתוח-Lost חושף שרוב-האובדן מחסימות-MRBR-מאוחרות — מובילה לשיפור-מחזור-השחרור.",
          cbcHe:
            "ב-CBC ה-CFO קובע יעד-ניצול 95%; אובדן-הנחה מתועד וסיבותיו מטופלות ברבעון.",
          navHe: ["SAP Fiori Launchpad ► Cash Discount Utilization"],
          tables: ["BSAK", "ACDOCA"],
          tcodes: ["FBL1N", "S_ALR_87012103"],
          fiori: ["F2179"],
          configHe: ["מבוסס Cleared Items עם הנחה-זמינה; KPI = Taken/(Taken+Lost)."],
          mistakesHe: ["אי-ניתוח-סיבות-לאובדן — הבעיה חוזרת."],
          troubleshootHe: ["ניצול-נמוך ➔ נתח Lost לפי חסימה/פיגור/החלטת-תזרים."],
          bestPracticeHe: ["קבע יעד-ניצול ונתח אובדן-הנחה רבעונית."],
          interviewHe: [{ qHe: "מה מודד Cash Discount Utilization?", aHe: "אחוז-ההנחות-שנוצלו מול שאבדו, מדד-יעילות לתהליך-התשלום; אובדן מנותח לפי-סיבה." }],
          takeawaysHe: ["מודד % ניצול-הנחות בדיעבד.", "אובדן-הנחה מנותח לפי-סיבה.", "מדד-יעילות מתמשך ל-AP."],
          relatedHe: [{ labelHe: "MM · תחזית-הנחת-מזומן (12.4.5)", href: "/library/mm/chapter-12/#sub-12.4.5" }],
        },
        {
          id: "12.4.7",
          titleHe: "ימי-זכאים בפירעון (DPO)",
          titleEn: "Days Payable Outstanding",
          execHe:
            "Days Payable Outstanding (DPO) מודד כמה-ימים בממוצע לוקח לארגון לשלם-לספקים. DPO-גבוה משפר-הון-חוזר אך עלול-לפגוע ביחסי-ספק; הוא מדד-ליבה לניהול-מזומן.",
          beginnerHe:
            "DPO = 'כמה ימים בממוצע אנחנו לוקחים עד שמשלמים לספק'. ככל שיותר-ימים, הכסף נשאר אצלנו יותר-זמן — טוב לתזרים, אבל ספקים לא-אוהבים-איחור.",
          consultantHe:
            "DPO = (Accounts Payable / COGS) × ימים-בתקופה. הגרסה-הישירה (12.4.7) מחושבת מיתרת-זכאים-ממוצעת מול-רכש/COGS. נשען על ACDOCA. הוא מאזן בין שימור-מזומן לבין יחסי-ספק וניצול-הנחות; DPO-גבוה-מדי על-חשבון-הנחות עלול-להזיק.",
          purposeHe:
            "למדוד ולנהל את משך-מחזור-התשלום כמנוף הון-חוזר, תוך-איזון מול יחסי-ספק והנחות-מזומן.",
          processExampleHe:
            "DPO עלה מ-35 ל-45 יום ברבעון; ה-CFO מאשר שזו אסטרטגיית-הון-חוזר מכוונת, בתנאי-שלא-נפגעות הנחות-מזומן.",
          cbcHe:
            "ב-CBC מפעל-המילוי מנהל DPO ~40 יום לספקי-אריזה, מאוזן מול הנחות-תרכיז שעדיף-לנצל-מהר.",
          navHe: ["SAP Fiori Launchpad ► Days Payable Outstanding"],
          tables: ["BSIK", "BSAK", "ACDOCA"],
          tcodes: ["FK10N", "S_ALR_87012078"],
          fiori: ["F2179", "F2906"],
          configHe: ["מבוסס יתרת-AP מול COGS/רכש; פרמטר ימים-בתקופה ב-CDS."],
          mistakesHe: ["מקסום-DPO על-חשבון-הנחות-מזומן — חיסכון-מדומה."],
          troubleshootHe: ["DPO-מעוות ➔ COGS/יתרת-AP לא-מייצגים תקופה."],
          bestPracticeHe: ["נטר DPO מול ניצול-הנחות לאיזון-הון-חוזר."],
          interviewHe: [{ qHe: "מהו DPO וכיצד מחושב?", aHe: "Days Payable Outstanding = (AP/COGS)×ימים; ממוצע-ימים-עד-תשלום-ספק. גבוה משפר-הון-חוזר אך עלול-לפגוע ביחסי-ספק/הנחות." }],
          takeawaysHe: ["DPO = ממוצע-ימים-עד-תשלום-ספק.", "מנוף הון-חוזר; מאוזן מול יחסי-ספק/הנחות."],
          relatedHe: [{ labelHe: "MM · DPO שיטה-עקיפה (12.4.8)", href: "/library/mm/chapter-12/#sub-12.4.8" }],
        },
        {
          id: "12.4.8",
          titleHe: "ימי-זכאים בפירעון — שיטה עקיפה",
          titleEn: "Days Payable Outstanding—Indirect Method",
          execHe:
            "DPO בשיטה-העקיפה מחשב את אותו מדד מתוך נתוני-דוחות-כספיים-מצרפיים (יתרת-זכאים ו-COGS שנתיים) במקום מחישוב-פריט-פרטני — נוח להשוואה-חיצונית ול-Benchmark.",
          beginnerHe:
            "אותו רעיון כמו DPO, אבל מחשבים אותו מהמספרים-הגדולים בדוח-הכספי (סך-הזכאים וסך-עלות-המכר) ולא מכל-חשבונית בנפרד. כך קל-להשוות-למתחרים.",
          consultantHe:
            "Indirect DPO = (Average Accounts Payable / COGS) × 365. משתמש ביתרות-מצרפיות מ-ACDOCA/Financial-Statement במקום ב-Open-Item-level. פחות-מדויק-תפעולית אך תקני-להשוואה-חיצונית ול-industry-benchmark. נפוץ בדיווח-ל-CFO ולמשקיעים.",
          purposeHe:
            "לספק מדד-DPO סטנדרטי וברת-השוואה-חיצונית, מבוסס-דוחות-כספיים, ל-benchmark מול-תעשייה ולדיווח-להנהלה.",
          processExampleHe:
            "ה-CFO מציג DPO-עקיף שנתי של 42 יום מול ממוצע-תעשייה 38 — אות לניהול-הון-חוזר-אגרסיבי-יחסית.",
          cbcHe:
            "ב-CBC DPO-עקיף מדווח-לקבוצת-הבקבוק העולמית להשוואה בין-מפעלית.",
          navHe: ["SAP Fiori Launchpad ► Days Payable Outstanding (Indirect)"],
          tables: ["ACDOCA", "BSIK", "BSAK"],
          tcodes: ["FK10N", "S_ALR_87012078"],
          fiori: ["F2179"],
          configHe: ["מבוסס יתרות-מצרפיות (Average AP, COGS) × 365."],
          mistakesHe: ["בלבול בין השיטה-הישירה לעקיפה בהשוואות."],
          troubleshootHe: ["פער ישיר-מול-עקיף ➔ הבדל-בסיס-נתונים (פריט מול-מצרפי)."],
          bestPracticeHe: ["השתמש בעקיפה ל-benchmark-חיצוני, ובישירה לניהול-תפעולי."],
          interviewHe: [{ qHe: "מה ההבדל בין DPO ישיר לעקיף?", aHe: "ישיר מחושב מ-Open-Items פרטניים (תפעולי-מדויק); עקיף מיתרות-מצרפיות בדוח-כספי × 365 (ברת-השוואה-חיצונית)." }],
          takeawaysHe: ["DPO-עקיף = (AP-ממוצע/COGS)×365 ממצרפי.", "ברת-השוואה-חיצונית ול-benchmark.", "משלים את הישיר."],
          relatedHe: [{ labelHe: "MM · DPO (12.4.7)", href: "/library/mm/chapter-12/#sub-12.4.7" }],
        },
        {
          id: "12.4.9",
          titleHe: "ניתוח עיבוד-חשבוניות",
          titleEn: "Invoice Processing Analysis",
          execHe:
            "ניתוח-עיבוד-חשבוניות מודד את יעילות-תהליך-ה-LIV: cycle-time, שיעור-חסימות, שיעור-Parked, ותפוקה-לפקיד — מדדי-תפעול לשיפור-מחלקת-ה-AP.",
          beginnerHe:
            "כאן בודקים 'כמה-טוב עובדת המחלקה': כמה-זמן לוקח לטפל בחשבונית, כמה נחסמות, וכמה תקועות. כך מזהים איפה-לשפר.",
          consultantHe:
            "מבוסס RBKP/RSEG + סטטוסים: מודד Invoice Cycle Time (קליטה→רישום→תשלום), Block Rate, Parked Rate ו-Throughput. drill-down לפי-סיבת-חסימה ולפי-פקיד. משמש Process Mining ושיפור-מתמשך.",
          purposeHe:
            "לשפר את יעילות-עיבוד-החשבוניות: לקצר-cycle-time, להפחית-חסימות-מיותרות ולאזן-עומס בין-פקידים.",
          processExampleHe:
            "הניתוח מראה Block-Rate 18% רובו מסטיות-מחיר-קטנות; הרחבת-טולרנס-AP מפחיתה-חסימות-מיותרות ומקצרת-cycle.",
          cbcHe:
            "ב-CBC ניתוח-עיבוד מזהה צוואר-בקבוק בחשבוניות-אריזה רב-ספקיות; מובילה לאוטומציה ב-OpenText.",
          navHe: ["SAP Fiori Launchpad ► Invoice Processing Analysis"],
          tables: ["RBKP", "RSEG", "BSIK"],
          tcodes: ["MIR5", "MIR6", "MRBR"],
          fiori: ["F1060A", "F2179"],
          configHe: ["KPI מבוסס סטטוסי-RBKP וחותמות-זמן; drill-down לפי-סיבה/פקיד."],
          mistakesHe: ["מדידת-תפוקה ללא-איכות — מעודד-רישום-שגוי-מהיר."],
          troubleshootHe: ["Block-Rate גבוה ➔ נתח לפי-סיבה; ייתכן טולרנס-צר-מדי."],
          bestPracticeHe: ["נטר cycle-time ו-block-rate; שלב Process-Mining."],
          interviewHe: [{ qHe: "אילו KPI כולל ניתוח-עיבוד-חשבוניות?", aHe: "Cycle-Time, Block-Rate, Parked-Rate ו-Throughput-לפקיד — מדדי-יעילות-תהליך לשיפור-AP." }],
          takeawaysHe: ["מודד יעילות-LIV: cycle-time, block/parked-rate.", "drill-down לפי-סיבה/פקיד.", "בסיס לשיפור-מתמשך."],
          relatedHe: [{ labelHe: "MM · OpenText (12.6)", href: "/library/mm/chapter-12/#sub-12.6" }],
        },
        {
          id: "12.4.10",
          titleHe: "ניתוח תשלומי-ספק (תשלומים ידניים ואוטומטיים)",
          titleEn: "Supplier Payment Analysis (Manual and Automatic Payments)",
          execHe:
            "ניתוח זה משווה תשלומים-אוטומטיים (F110) מול ידניים (F-53): נפח, שיעור-ידני וסיבותיו. שיעור-ידני-גבוה מאותת על תהליך-לא-מספיק-אוטומטי ועל סיכון-בקרה.",
          beginnerHe:
            "בודקים כמה-תשלומים נעשו 'בלחיצת-כפתור' (אוטומטי) וכמה 'ביד' (ידני). הרבה-ידני = פחות-יעיל ויותר-מסוכן לטעויות.",
          consultantHe:
            "מבוסס מסמכי-תשלום (PAYR/REGUH) ואופן-יצירתם. מודד Automatic-vs-Manual ratio, ערך-ממוצע ו-סיבות-ידני (תשלום-דחוף, ספק-חד-פעמי, מחלוקת). שיעור-ידני-גבוה = הזדמנות-אוטומציה וסיכון-הפרדת-תפקידים.",
          purposeHe:
            "להגדיל-אוטומציה ולהקטין-תשלומים-ידניים — שיפור-יעילות, בקרה והפרדת-תפקידים.",
          processExampleHe:
            "הניתוח מראה 25% תשלומים-ידניים, רובם 'דחופים'; הסדרת-תזמון-F110-תכוף-יותר מפחיתה-ידני ל-8%.",
          cbcHe:
            "ב-CBC תשלומים-ידניים מוגבלים-למקרי-חירום-ייצור (CO2); השאר דרך F110 לבקרה-מרבית.",
          navHe: ["SAP Fiori Launchpad ► Supplier Payment Analysis"],
          tables: ["PAYR", "REGUH", "BSAK"],
          tcodes: ["F110", "F-53", "FBL1N"],
          fiori: ["F2179", "F0770"],
          configHe: ["מבוסס מסמכי-תשלום ו-flag-אוטומטי/ידני; drill-down לפי-סיבה."],
          mistakesHe: ["שיעור-ידני-גבוה ללא-בקרת-הפרדת-תפקידים."],
          troubleshootHe: ["יותר-מדי-ידני ➔ נתח-סיבות; הסדר-תזמון-F110."],
          bestPracticeHe: ["מקסם-אוטומציה; הגבל-ידני-למקרי-חירום-מתועדים."],
          interviewHe: [{ qHe: "מדוע למדוד יחס תשלום-אוטומטי-מול-ידני?", aHe: "ידני-גבוה = פחות-יעיל ויותר-סיכון-בקרה/הפרדת-תפקידים; המדד מזהה-הזדמנות-אוטומציה." }],
          takeawaysHe: ["משווה תשלום-אוטומטי (F110) מול-ידני (F-53).", "ידני-גבוה = סיכון-בקרה והזדמנות-אוטומציה."],
          relatedHe: [{ labelHe: "MM · עיבוד-תשלומים (12.3.1)", href: "/library/mm/chapter-12/#sub-12.3.1" }],
        },
        {
          id: "12.4.11",
          titleHe: "ניתוח תשלומי-ספק (תשלומים פתוחים)",
          titleEn: "Supplier Payment Analysis (Open Payments)",
          execHe:
            "ניתוח תשלומים-פתוחים מתמקד בפריטים-שטרם-שולמו: סכום-פתוח לפי-ספק, גיל ומועד — בסיס לתעדוף-ריצת-F110 הבאה ולניהול-תזרים-יוצא.",
          beginnerHe:
            "מתמקד ב'מה עוד-לא-שילמנו': לכל-ספק כמה פתוח, מתי הגיע-מועד, וכמה-דחוף. עוזר להחליט מה-לשלם-בריצה-הבאה.",
          consultantHe:
            "מבוסס Open Items ב-BSIK: סכום-פתוח, Net Due Date, Payment Block-status. מקובץ לפי-ספק/תקופה ומשמש לבניית-Proposal ל-F110 ולתחזית-תזרים-קצרת-טווח. מבדיל פתוח-בר-תשלום מפתוח-חסום.",
          purposeHe:
            "לתעדף את ריצת-התשלום-הבאה: לזהות מה-בשל-ומותר-לתשלום מול מה-חסום, ולתכנן-תזרים-יוצא-מיידי.",
          processExampleHe:
            "לפני F110 מנהל-AP סוקר תשלומים-פתוחים, מזהה פריטים-בשלים-לא-חסומים בסך-800K, ומכליל-אותם בפרמטרי-הריצה.",
          cbcHe:
            "ב-CBC סקירת-פתוחים-שבועית מזינה-ישירות את Proposal-F110 לתשלום-ספקי-המפעל.",
          navHe: ["SAP Fiori Launchpad ► Supplier Payment Analysis (Open)"],
          tables: ["BSIK", "ACDOCA"],
          tcodes: ["FBL1N", "F110"],
          fiori: ["F2179"],
          configHe: ["מבוסס Open Items עם Due Date ו-Block-status; drill-down לפי-ספק."],
          mistakesHe: ["הכללת-פריטים-חסומים בתכנון-תשלום."],
          troubleshootHe: ["פריט-פתוח לא-נכלל ➔ Payment Block או Due Date-עתידי."],
          bestPracticeHe: ["סקור פתוחים לפני כל F110; הפרד-בר-תשלום-מחסום."],
          interviewHe: [{ qHe: "כיצד ניתוח-תשלומים-פתוחים תומך ב-F110?", aHe: "מזהה פריטים-בשלים-ולא-חסומים לתעדוף-Proposal ולתחזית-תזרים-יוצא-מיידי." }],
          takeawaysHe: ["מתמקד בפריטים-פתוחים שטרם-שולמו.", "מזין-תעדוף-ל-F110 ותחזית-תזרים-קצר.", "מבדיל בר-תשלום-מחסום."],
          relatedHe: [{ labelHe: "MM · עיבוד-תשלומים (12.3.1)", href: "/library/mm/chapter-12/#sub-12.3.1" }],
        },
      ],
    },
    // ============================================================ 12.5
    {
      id: "12.5",
      titleHe: "קונפיגורציה של ניהול חשבוניות וזכאים",
      titleEn: "Configuring Invoice and Payables Management",
      execHe:
        "קונפיגורציית-התחום מגדירה את חוקי-המשחק: קליטת-חשבוניות (LIV), טולרנסים, חסימות-תשלום, קביעת-חשבונות, ותשתית-תשלום. הגדרה נכונה ב-SPRO היא ההבדל בין תהליך-אוטומטי-ומבוקר לבין כאוס-של-חסימות-ידניות.",
      beginnerHe:
        "לפני שאפשר לעבוד, מגדירים למערכת את החוקים: מתי לחסום-חשבונית, כמה-סטייה מותרת, לאיזה-חשבון-לרשום, ואיך-לשלם. כל ההגדרות האלה נעשות ב-SPRO על-ידי היועץ.",
      consultantHe:
        "הקונפיגורציה מתפרסת על MM-LIV (טולרנסים OMR6, Duplicate Check, Direct Posting, Tax) ו-FI-AP (Payment Program FBZP, Payment Terms OBB8, Account Determination OBYC, Document Types). ההגדרות מקיפות גם חסימות-תשלום (סוגי-Block, שחרור-MRBR) ו-Workflow-אישור. כל אלה ב-SPRO תחת Materials Management ► Logistics Invoice Verification ו-Financial Accounting ► Accounts Payable.",
      purposeHe:
        "להתאים את ההתנהגות-האוטומטית של המערכת למדיניות-הארגון: רמת-בקרה, סיבולת-לסטיות, מבנה-חשבונות ושיטות-תשלום.",
      processExampleHe:
        "יועץ מגדיר OMR6 (טולרנס-מחיר 5%), Determine-Payment-Block (סטיית-מחיר→Block-R), ו-FBZP (שיטת-העברה+House-Bank) — וכך מעצב את כל זרימת-החשבונית-לתשלום.",
      cbcHe:
        "ב-CBC הקונפיגורציה מבדילה טולרנס-מחמיר-לתרכיז מטולרנס-רגיל-לאריזה, ומגדירה House-Banks-מרובים לתשלומי-מפעל-המילוי.",
      navHe: [
        "Materials Management ► Logistics Invoice Verification ► Incoming Invoice",
        "Materials Management ► Logistics Invoice Verification ► Invoice Block",
        "Financial Accounting ► Accounts Receivable and Accounts Payable ► Business Transactions ► Outgoing Payments",
      ],
      tables: ["T169", "T169G", "T169P", "TBSL"],
      tcodes: ["OMR6", "FBZP", "OBB8", "OBYC"],
      fiori: ["F1602"],
      configHe: [
        "LIV: Duplicate Check, Tax defaults, Direct Posting, Number Ranges.",
        "Invoice Block: Tolerance Limits (OMR6), Determine Payment Block, Stochastic/Manual Block.",
        "AP: Payment Program (FBZP), Payment Terms (OBB8), Account Determination (OBYC).",
      ],
      mistakesHe: [
        "הגדרת-טולרנסים ללא-תיאום-מדיניות — חסימות-יתר או-חוסר.",
        "OBYC/FBZP שגויים — רישום-שגוי-או-כשל-תשלום-לכל-החשבוניות.",
      ],
      troubleshootHe: [
        "חסימות-לא-צפויות ➔ בדוק Determine-Payment-Block וטולרנסים (OMR6).",
        "כשל-F110 ➔ בדוק FBZP (Payment-Method/House-Bank).",
      ],
      bestPracticeHe: [
        "תעד כל-הגדרת-טולרנס ו-Block מול-מדיניות-עסקית.",
        "בדוק-קונפיגורציה בסביבת-בדיקות עם תרחישי-קצה לפני-Go-Live.",
      ],
      interviewHe: [
        { qHe: "היכן מגדירים טולרנסים-לאימות-חשבונית?", aHe: "ב-OMR6 (SPRO ► LIV ► Invoice Block ► Set Tolerance Limits) — מפתחות כמו PP מחיר, DQ/BD כמות, AP/AN סכום-זעיר." },
      ],
      takeawaysHe: [
        "הקונפיגורציה מתפרסת על MM-LIV ו-FI-AP.",
        "OMR6 (טולרנס), FBZP (תשלום), OBYC (חשבונות), OBB8 (תנאים).",
        "הגדרה-נכונה = אוטומציה-מבוקרת; שגויה = כאוס-חסימות.",
      ],
      relatedHe: [{ labelHe: "MM · עיבוד-החשבונית (12.2.5)", href: "/library/mm/chapter-12/#sub-12.2.5" }],
      children: [
        {
          id: "12.5.1",
          titleHe: "אלמנטי-קונפיגורציה לניהול חשבוניות-נכנסות",
          titleEn: "Configuration Elements for Managing Incoming Invoices",
          execHe:
            "אלמנטי-הקונפיגורציה לחשבוניות-נכנסות מגדירים את קליטת-ה-LIV: בדיקת-כפילות, ברירות-מס, רישום-ישיר, טווחי-מספרים ו-Reference-categories — תשתית-הקליטה ב-MIRO.",
          beginnerHe:
            "אלה ההגדרות שקובעות איך-נראית-ועובדת-הקלדת-החשבונית: מה-חובה-למלא, איזה-מס-מוצע-אוטומטית, ואיך-מונעים-כפילות. כל-זה מוגדר-מראש ב-SPRO.",
          consultantHe:
            "כולל: Duplicate Invoice Check (ספק+סכום+תאריך+ייחוס), Default Tax Codes, Direct Posting to G/L/Material activation, Number Assignment (לוגיסטי+FI), Maximum-cash-discount, ו-Tax-Jurisdiction. מוגדר תחת SPRO ► MM ► LIV ► Incoming Invoice. שולט בהתנהגות-MIRO ובבקרות-הקליטה.",
          purposeHe:
            "להגדיר קליטת-חשבונית מבוקרת-ויעילה: למנוע-כפילות, להקטין-הקלדה (ברירות-מחדל), ולאפשר-נתיבי-רישום-נכונים.",
          processExampleHe:
            "יועץ מפעיל Duplicate-Check, מגדיר Tax-Code-ברירת-מחדל V1, ומפעיל Direct-Posting-to-G/L — וכך MIRO מציע-מס-אוטומטי, חוסם-כפילות ומאפשר-רישום-הוצאה-ישיר.",
          cbcHe:
            "ב-CBC Duplicate-Check מחמיר-במיוחד לחשבוניות-תרכיז בעלות-גבוהה; Tax-Codes מותאמים-למע\"מ-ישראלי.",
          navHe: [
            "Materials Management ► Logistics Invoice Verification ► Incoming Invoice ► Set Check for Duplicate Invoices",
            "Materials Management ► Logistics Invoice Verification ► Incoming Invoice ► Maintain Default Values for Tax Codes",
            "Materials Management ► Logistics Invoice Verification ► Incoming Invoice ► Activate Direct Posting to G/L Accounts and Material Accounts",
          ],
          tables: ["T169P", "T169", "RBKP"],
          tcodes: ["OMRDC", "MIRO", "OMR6"],
          fiori: ["F0859"],
          configHe: [
            "Duplicate Invoice Check — שדות-השוואה (ספק/סכום/מטבע/תאריך/ייחוס).",
            "Default Tax Codes + Tax Jurisdiction — ברירות-מס-בקליטה.",
            "Activate Direct Posting — מאפשר טאב G/L/Material ב-MIRO.",
            "Number Assignment — טווחי-מספרים-לוגיסטי+FI.",
          ],
          mistakesHe: [
            "כיבוי-Duplicate-Check — תשלום-כפול.",
            "Tax-Code-ברירת-מחדל-שגוי — מס-שגוי-בכל-חשבונית.",
          ],
          troubleshootHe: [
            "כפילות-לא-נחסמת ➔ Duplicate-Check-כבוי או-שדות-השוואה-חלקיים.",
            "אי-אפשר-רישום-ל-G/L ➔ Direct-Posting-לא-הופעל.",
          ],
          bestPracticeHe: [
            "השאר-Duplicate-Check-פעיל; אכוף-שדה-Reference.",
            "תקנן-Tax-Codes-מצומצמים.",
          ],
          interviewHe: [
            { qHe: "אילו שדות בודק Duplicate Invoice Check?", aHe: "ספק, סכום-ברוטו, מטבע, תאריך-חשבונית ומספר-ייחוס — שילובם-הזהה חוסם-רישום-כפול." },
          ],
          takeawaysHe: [
            "אלמנטי-קליטה: Duplicate-Check, Tax-defaults, Direct-Posting, Number-Ranges.",
            "מוגדר ב-SPRO ► LIV ► Incoming Invoice.",
            "שולט בהתנהגות-MIRO ובבקרות-הקליטה.",
          ],
          relatedHe: [{ labelHe: "MM · עיבוד-חשבוניות (12.2)", href: "/library/mm/chapter-12/#sub-12.2" }],
        },
        {
          id: "12.5.2",
          titleHe: "אלמנטי-קונפיגורציה לניהול חסימות-חשבונית",
          titleEn: "Configuration Elements for Managing Invoice Blocks",
          execHe:
            "אלמנטי-הקונפיגורציה לחסימות מגדירים מתי-חשבונית-נחסמת-לתשלום ואיך-משוחררת: טולרנסים (OMR6), קביעת-Payment-Block, חסימה-סטוכסטית/ידנית, וזרימת-שחרור (MRBR). זהו לב-בקרת-המחיר.",
          beginnerHe:
            "כאן קובעים את-חוקי-החסימה: כמה-סטייה-במחיר-או-בכמות מותרת לפני-שחוסמים-תשלום, ומי-משחרר. אם-הסטייה-גדולה-מהמותר — החשבונית-נחסמת-עד-אישור.",
          consultantHe:
            "כולל: Tolerance-Limits (OMR6 — PP מחיר, DQ כמות-יתר, BD תאריך, PS Price-Estimate, ST תאריך-משלוח), Determine-Payment-Block (אילו-סטיות→Block-R), Stochastic-Block (חסימה-אקראית-לביקורת), ו-Item-Amount-Check. השחרור ב-MRBR (אוטומטי/ידני). חריגה-מעל-Upper-Tolerance מציבה-Block; מתחת-ל-Lower עשויה-לעבור.",
          purposeHe:
            "לאזן-בין-בקרה-ליעילות: לחסום-רק-סטיות-מהותיות, לאפשר-זעירות-לעבור, ולספק-מסלול-שחרור-מבוקר.",
          processExampleHe:
            "טולרנס-מחיר 3%; חשבונית-בסטייה-5%→Block-R; מנהל-בוחן-ב-MRBR, מאשר ומשחרר; חשבונית-בסטייה-1%→עוברת-ללא-חסימה.",
          cbcHe:
            "ב-CBC טולרנס-תרכיז מחמיר (1%) מול-אריזה (5%); חסימות-תרכיז משוחררות רק-לאחר-אימות-מול-חוזה-The-Coca-Cola-Company.",
          navHe: [
            "Materials Management ► Logistics Invoice Verification ► Invoice Block ► Set Tolerance Limits",
            "Materials Management ► Logistics Invoice Verification ► Invoice Block ► Determine Payment Block",
            "Materials Management ► Logistics Invoice Verification ► Invoice Block ► Activate Stochastic Block",
          ],
          tables: ["T169G", "T169P", "RBKP", "BSIK"],
          tcodes: ["OMR6", "MRBR", "OMRH"],
          fiori: ["F2179"],
          configHe: [
            "Tolerance Keys (OMR6): PP, DQ, BD, PS, ST, AP/AN — סף-עליון/תחתון לכל-מפתח.",
            "Determine Payment Block — מיפוי-סטייה→Block-R.",
            "Stochastic Block (OMRH) — חסימה-אקראית-לפי-סכום/הסתברות.",
            "Manual Block + Item Amount Check.",
          ],
          flow: [
            { he: "סטיית-מחיר/כמות", code: "OMR6", note: "מול-טולרנס" },
            { he: "חריגה?", note: "מעל-Upper" },
            { he: "Block R", code: "RBKP", note: "פריט-חסום-BSIK" },
            { he: "שחרור", code: "MRBR", note: "אוטומטי/ידני" },
            { he: "בר-תשלום", code: "F110" },
          ],
          mistakesHe: [
            "טולרנס-רחב-מדי — סטיות-מהותיות-עוברות.",
            "אי-הגדרת-Determine-Block — סטיות-לא-חוסמות-כלל.",
            "חסימה-סטוכסטית-אגרסיבית — חסימות-מיותרות.",
          ],
          troubleshootHe: [
            "חשבונית-עברה-למרות-סטייה ➔ טולרנס-רחב או-אין-Determine-Block.",
            "חשבונית-נחסמה-ללא-סטייה ➔ Stochastic או-Manual-Block.",
            "MRBR-לא-משחרר ➔ עדיין-מחוץ-לטולרנס או-חוסר-הרשאה.",
          ],
          bestPracticeHe: [
            "כייל-טולרנסים-לפי-ערך-וקריטיות-חומר.",
            "הפרד-תפקיד-רושם-ממשחרר-MRBR.",
            "השתמש-בחסימה-סטוכסטית-מתונה-לדגימת-ביקורת.",
          ],
          interviewHe: [
            { qHe: "מהם מפתחות-הטולרנס המרכזיים ב-OMR6?", aHe: "PP (סטיית-מחיר), DQ (כמות-יתר), BD (חריגת-תאריך-משלוח/ערך), PS (אומדן-מחיר), ST (תאריך-משלוח), AP/AN (סכום-זעיר)." },
            { qHe: "מהי חסימה-סטוכסטית?", aHe: "חסימת-תשלום-אקראית (לפי-סכום/הסתברות) שמטרתה-דגימת-חשבוניות-לביקורת-ידנית, גם-כשאין-סטייה." },
          ],
          takeawaysHe: [
            "חסימות-מוגדרות דרך OMR6 + Determine-Payment-Block.",
            "סוגים: טולרנס, סטוכסטי, ידני; שחרור ב-MRBR.",
            "מאזן-בקרה-מול-יעילות; הפרד-תפקיד-רושם-ממשחרר.",
          ],
          relatedHe: [
            { labelHe: "MM · עיבוד-החשבונית (12.2.5)", href: "/library/mm/chapter-12/#sub-12.2.5" },
            { labelHe: "אובייקט · MRBR", href: "/library/mm/object/MRBR/" },
          ],
        },
      ],
    },
    // ============================================================ 12.6
    {
      id: "12.6",
      titleHe: "אינטגרציה עם SAP Invoice Management by OpenText",
      titleEn: "Integrating with SAP Invoice Management by OpenText",
      execHe:
        "SAP Invoice Management by OpenText (VIM) הוא פתרון-לאוטומציית-חשבוניות: סריקה-OCR, חילוץ-נתונים-אוטומטי, Workflow-אישור והתאמה-ל-PO — מצמצם-הקלדה-ידנית וזמן-עיבוד באופן-דרמטי.",
      beginnerHe:
        "במקום-להקליד-כל-חשבונית-ביד, OpenText 'קורא' אותה-אוטומטית (כמו-סורק-חכם), ממלא-את-הפרטים, ושולח-לאישור-הנכון. SAP מקבל-את-החשבונית-מוכנה-כמעט-לרישום.",
      consultantHe:
        "VIM יושב-לפני-LIV: קולט-חשבונית (אימייל/EDI/סריקה), מבצע-OCR, מחלץ-שדות, מתאים-מול-PO, ומנתב-ל-Workflow-אישור-לפי-חוקים. בסיום-נוצר-MIRO/FB60-אוטומטי. כולל-Exception-Handling-לחשבוניות-בעייתיות. אינטגרציה-דרך-Inbound-channels ו-BAPI/IDoc (INVOIC). מקצר-cycle-time ומפחית-טעויות-הקלדה.",
      purposeHe:
        "לאוטמט-קצה-לקצה-את-קליטת-החשבוניות: מהפחתת-הקלדה-ידנית, דרך-ניתוב-אישורים-חכם, ועד-טיפול-בחריגות — חיסכון-בזמן-ובטעויות.",
      processExampleHe:
        "חשבונית-נכנסת-באימייל→OCR-מחלץ-נתונים→VIM-מתאים-ל-PO→ניתוב-לאישור-מנהל-רכש→רישום-אוטומטי-ב-MIRO. חשבונית-ללא-PO-מנותבת-ל-Exception-Workflow.",
      cbcHe:
        "ב-CBC VIM מטפל-באלפי-חשבוניות-אריזה-רב-ספקיות; OCR-וניתוב-אוטומטי מפחיתים-עומס-צוות-ה-AP-ומקצרים-cycle-time.",
      navHe: [
        "SAP Fiori Launchpad ► Invoice Processing (OpenText VIM inbound)",
        "Tools ► Business Documents ► OpenText Vendor Invoice Management",
      ],
      tables: ["RBKP", "RSEG", "EKBE"],
      tcodes: ["MIRO", "MIR6"],
      fiori: ["F0859", "F1060A"],
      configHe: [
        "Inbound channels (Email/EDI/Scan) + OCR-engine.",
        "Document-types ו-Process-types ב-VIM; חוקי-ניתוב-Workflow.",
        "Exception-handling rules לחשבוניות-לא-תואמות.",
      ],
      mistakesHe: [
        "OCR-לא-מכויל — חילוץ-שגוי-מצריך-תיקון-ידני-מרובה.",
        "חוקי-ניתוב-לא-מוגדרים — חשבוניות-תקועות-ב-Exception.",
      ],
      troubleshootHe: [
        "חשבונית-לא-נרשמת-אוטומטית ➔ אי-התאמה-ל-PO או-OCR-שגוי → Exception-Workflow.",
        "ניתוב-אישור-נכשל ➔ חוק-Workflow או-תפקיד-מאשר-חסר.",
      ],
      bestPracticeHe: [
        "כייל-OCR-ונטר-שיעור-חילוץ-מוצלח.",
        "הגדר-חוקי-Exception-ברורים-עם-בעלי-תהליך.",
      ],
      interviewHe: [
        { qHe: "מה תפקיד OpenText VIM מול LIV?", aHe: "VIM יושב-לפני-LIV: OCR, חילוץ, התאמה-ל-PO ו-Workflow-אישור, ובסיום-יוצר-MIRO/FB60-אוטומטי — אוטומציה-קצה-לקצה-לקליטה." },
      ],
      takeawaysHe: [
        "OpenText VIM = אוטומציית-קליטת-חשבוניות (OCR+Workflow) לפני-LIV.",
        "מתאים-ל-PO, מנתב-אישורים, מטפל-בחריגות, יוצר-MIRO-אוטומטי.",
        "מקצר-cycle-time ומפחית-טעויות-הקלדה.",
      ],
      relatedHe: [{ labelHe: "MM · ניתוח-עיבוד (12.4.9)", href: "/library/mm/chapter-12/#sub-12.4.9" }],
    },
    // ============================================================ 12.7
    {
      id: "12.7",
      titleHe: "SAP Ariba Central Invoice Management ל-SAP S/4HANA Cloud",
      titleEn: "SAP Ariba Central Invoice Management for SAP S/4HANA Cloud",
      execHe:
        "SAP Ariba Central Invoice Management הוא שירות-ענן המרכז-קליטה-וניהול-חשבוניות-ספק על-פני-מערכות-מרובות — נקודת-כניסה-אחת-לחשבוניות עם-שקיפות-ושיתוף-ספק דרך-רשת-Ariba.",
      beginnerHe:
        "פתרון-ענן-של-Ariba שמרכז-את-כל-חשבוניות-הספק-במקום-אחד, גם-אם-יש-כמה-מערכות. הספקים-שולחים-דרך-רשת-Ariba, והחשבוניות-מנוהלות-מרכזית-בשקיפות.",
      consultantHe:
        "Central Invoice Management (CIM) הוא שירות-ב-SAP-BTP המתממשק-ל-S/4HANA-Cloud (ולמערכות-נוספות) דרך-Ariba-Network. ספקים-מעלים/שולחים-חשבוניות (PDF/cXML), CIM-מאמת-בסיסית, מנתב-ומרכז, וה-S/4HANA מבצע-LIV. מספק-Single-Inbox-לחשבוניות, שקיפות-סטטוס-לספק, ותהליך-אחיד-רב-מערכתי. מתאים-לארגונים-עם-נוף-מערכות-מבוזר.",
      purposeHe:
        "לרכז-ולתקנן-קליטת-חשבוניות-על-פני-מערכות-מרובות, לשפר-שקיפות-מול-ספקים, ולהפחית-עיבוד-ידני דרך-רשת-Ariba.",
      processExampleHe:
        "ספק-מעלה-חשבונית-ל-Ariba-Network→CIM-מרכז-ומאמת→מנתב-ל-S/4HANA-Cloud-הרלוונטי→LIV-מבצע-3-Way-Match. הספק-רואה-סטטוס-בזמן-אמת-ברשת.",
      cbcHe:
        "ב-CBC ארגון-בקבוק-רב-מדינתי ירכז-חשבוניות-ספקים-גלובליים (תרכיז, אריזה) דרך-CIM ל-Inbox-אחד, עם-שקיפות-מלאה-ל-The-Coca-Cola-Company.",
      navHe: [
        "SAP Business Technology Platform ► Ariba Central Invoice Management",
        "SAP Fiori Launchpad ► Central Invoice Management",
      ],
      tables: ["RBKP", "RSEG"],
      tcodes: ["MIRO"],
      fiori: ["F0859", "F1060A"],
      configHe: [
        "חיבור-BTP ל-Ariba-Network ול-S/4HANA-Cloud (Integration-content).",
        "Routing-rules-מרכזיים בין-מערכות-קצה.",
        "Supplier-onboarding ל-Ariba-Network.",
      ],
      mistakesHe: [
        "אי-Onboarding-ספקים-לרשת — חשבוניות-לא-זורמות.",
        "חוקי-ניתוב-שגויים — חשבונית-מגיעה-למערכת-לא-נכונה.",
      ],
      troubleshootHe: [
        "חשבונית-לא-מגיעה-ל-S/4HANA ➔ Routing-rule או-חיבור-BTP-תקול.",
        "ספק-לא-רואה-סטטוס ➔ Onboarding-לא-הושלם.",
      ],
      bestPracticeHe: [
        "ודא-Onboarding-ספקים-מלא-לפני-Go-Live.",
        "תקנן-חוקי-ניתוב-מרכזיים-לכל-מערכת-קצה.",
      ],
      interviewHe: [
        { qHe: "מה מייחד Ariba Central Invoice Management?", aHe: "שירות-ענן-ב-BTP המרכז-קליטת-חשבוניות-על-פני-מערכות-מרובות דרך-Ariba-Network, עם-Single-Inbox-ושקיפות-סטטוס-לספק." },
      ],
      takeawaysHe: [
        "CIM = ריכוז-חשבוניות-רב-מערכתי-בענן דרך-Ariba-Network.",
        "Single-Inbox, שקיפות-לספק, LIV-ב-S/4HANA-Cloud.",
        "מתאים-לנוף-מערכות-מבוזר-ולספקים-גלובליים.",
      ],
      relatedHe: [{ labelHe: "MM · OpenText (12.6)", href: "/library/mm/chapter-12/#sub-12.6" }],
      children: [
        {
          id: "12.7.1",
          titleHe: "העלאת חשבוניות-ספק",
          titleEn: "Upload Supplier Invoices",
          execHe:
            "העלאת-חשבוניות-ספק ב-CIM היא נקודת-הכניסה: ספקים-מעלים-חשבוניות (PDF/cXML) ל-Ariba-Network, או-הן-נקלטות-אוטומטית — מתחיל-את-זרימת-העיבוד-המרכזית.",
          beginnerHe:
            "כאן-הספק 'מכניס' את-החשבונית-למערכת — מעלה-קובץ-או-שולח-דיגיטלית דרך-רשת-Ariba. משם-החשבונית-ממשיכה-לעיבוד-אוטומטי.",
          consultantHe:
            "תמיכה-בערוצים: Supplier-Portal-upload (PDF), cXML-electronic, ו-PO-Flip (יצירת-חשבונית-מ-PO-קיים). הנתונים-מחולצים ומנורמלים-ל-format-אחיד. אימות-בסיסי (שדות-חובה, ספק-מוכר) לפני-ניתוב. מהווה-את-שלב-ה-Inbound של-CIM.",
          purposeHe:
            "לאפשר-לספקים-להגיש-חשבוניות-בערוץ-דיגיטלי-אחיד, ולהבטיח-קליטה-מנורמלת-לפני-עיבוד-מרכזי.",
          processExampleHe:
            "ספק-מבצע-PO-Flip-ב-Ariba: בוחר-PO-קיים, המערכת-ממלאת-אוטומטית-שורות-וכמויות, הוא-מאשר-ושולח — חשבונית-מדויקת-נכנסת-ללא-הקלדה-ידנית.",
          cbcHe:
            "ב-CBC ספקי-אריזה-משתמשים-ב-PO-Flip להעלאת-חשבוניות-מדויקות, מצמצם-סטיות-ו-3-Way-Match-נכשל.",
          navHe: ["SAP Fiori Launchpad ► Central Invoice Management ► Upload Invoices"],
          tables: ["RBKP", "RSEG"],
          tcodes: ["MIRO"],
          fiori: ["F0859"],
          configHe: [
            "ערוצי-העלאה: Portal-upload, cXML, PO-Flip.",
            "Validation-rules-בסיסיים (שדות-חובה, ספק-מוכר).",
          ],
          mistakesHe: [
            "חשבונית-ידנית-במקום-PO-Flip — סטיות-מיותרות.",
            "פורמט-cXML-שגוי — דחיית-קליטה.",
          ],
          troubleshootHe: [
            "העלאה-נדחתה ➔ שדה-חובה-חסר או-ספק-לא-מוכר-ברשת.",
            "PO-Flip-לא-זמין ➔ PO-לא-סונכרן-ל-Ariba.",
          ],
          bestPracticeHe: [
            "עודד-PO-Flip-להפחתת-סטיות.",
            "ולידציה-בכניסה-לחסכון-בעיבוד-מאוחר.",
          ],
          interviewHe: [
            { qHe: "מהו PO-Flip?", aHe: "יצירת-חשבונית-מ-PO-קיים-ב-Ariba: הספק-ממיר-הזמנה-לחשבונית עם-נתונים-מועתקים-אוטומטית, מצמצם-טעויות-וסטיות." },
          ],
          takeawaysHe: [
            "העלאה דרך Portal/cXML/PO-Flip.",
            "PO-Flip-מצמצם-סטיות-ו-3-Way-Match-נכשל.",
            "ולידציה-בסיסית-לפני-ניתוב.",
          ],
          relatedHe: [{ labelHe: "MM · ניהול-מרכזי (12.7.2)", href: "/library/mm/chapter-12/#sub-12.7.2" }],
        },
        {
          id: "12.7.2",
          titleHe: "ניהול חשבוניות-ספק באופן מרכזי",
          titleEn: "Manage Supplier Invoices Centrally",
          execHe:
            "ניהול-מרכזי ב-CIM מספק-Single-Inbox לכל-חשבוניות-הספק-על-פני-מערכות: צפייה, ניתוב, מעקב-סטטוס-ופתרון-חריגות — נקודת-שליטה-אחת-לתהליך-רב-מערכתי.",
          beginnerHe:
            "כל-החשבוניות-מכל-המערכות-מופיעות-במקום-אחד. הצוות-רואה-מה-נכנס, לאן-זה-הולך, ומה-תקוע — ומנהל-הכל-ממסך-מרכזי-אחד.",
          consultantHe:
            "Central-Inbox מציג-חשבוניות-מכל-מערכות-הקצה עם-סטטוס-מאוחד (Received/Routed/Posted/Exception). מאפשר-ניתוב-ידני, פתרון-חריגות, ומעקב-end-to-end. הספק-רואה-סטטוס-ברשת-Ariba. ה-LIV-בפועל-מתבצע-ב-S/4HANA-קצה, אך-הניהול-והנראות-מרכזיים.",
          purposeHe:
            "לתת-נקודת-שליטה-ונראות-אחת-לכל-זרימת-החשבוניות-הרב-מערכתית, ולקצר-זמן-פתרון-חריגות.",
          processExampleHe:
            "מנהל-AP-מרכזי-רואה-ב-Inbox-חשבונית-ב-Exception (אי-התאמה-ל-PO), פותר-מרכזית-ומנתב-מחדש-ל-S/4HANA-הנכון לרישום.",
          cbcHe:
            "ב-CBC צוות-AP-גלובלי-מנהל-חשבוניות-של-מספר-מפעלי-בקבוק מ-Inbox-אחד, עם-שקיפות-מלאה-לסטטוס.",
          navHe: ["SAP Fiori Launchpad ► Central Invoice Management ► Manage Invoices"],
          tables: ["RBKP", "RSEG"],
          tcodes: ["MIRO", "MIR6"],
          fiori: ["F1060A", "F0859"],
          configHe: [
            "Central-Inbox-views ו-status-mapping בין-מערכות.",
            "Exception-resolution-roles ו-routing-back.",
          ],
          mistakesHe: [
            "חריגות-לא-מטופלות-ב-Inbox — חשבוניות-תקועות.",
            "status-mapping-שגוי — נראות-מטעה.",
          ],
          troubleshootHe: [
            "חשבונית-תקועה-ב-Exception ➔ פתור-מרכזית-ונתב-מחדש.",
            "סטטוס-לא-מתעדכן ➔ status-mapping/חיבור-קצה-תקול.",
          ],
          bestPracticeHe: [
            "נטר-Central-Inbox-יומית-לחריגות.",
            "הגדר-בעלות-ברורה-לפתרון-Exception.",
          ],
          interviewHe: [
            { qHe: "מה היתרון של ניהול-חשבוניות-מרכזי?", aHe: "Single-Inbox-ונראות-מאוחדת-על-פני-מערכות-מרובות, פתרון-חריגות-מרכזי ושקיפות-סטטוס-לספק — בעוד-ה-LIV-מתבצע-במערכות-הקצה." },
          ],
          takeawaysHe: [
            "ניהול-מרכזי = Single-Inbox-רב-מערכתי עם-סטטוס-מאוחד.",
            "ניתוב, פתרון-חריגות-ומעקב-end-to-end מרכזית.",
            "LIV-בפועל-במערכות-הקצה; השליטה-מרכזית.",
          ],
          relatedHe: [{ labelHe: "MM · העלאת-חשבוניות (12.7.1)", href: "/library/mm/chapter-12/#sub-12.7.1" }],
        },
      ],
    },
    // ============================================================ 12.8
    {
      id: "12.8",
      titleHe: "Taulia: ניהול הון-חוזר",
      titleEn: "Taulia: Working Capital Management",
      execHe:
        "Taulia (חברת-SAP) הוא פלטפורמת-ניהול-הון-חוזר: Dynamic-Discounting, Supply-Chain-Finance ו-Virtual-Cards — מאפשרת-לקונה-לנצל-מזומן-עודף-להנחות, ולספק-גישה-למימון-מוקדם.",
      beginnerHe:
        "Taulia עוזר-לנהל-מזומן-חכם: אם-יש-לקונה-כסף-פנוי, הוא-יכול-לשלם-לספק-מוקדם-תמורת-הנחה (Dynamic-Discounting); ואם-לספק-חסר-מזומן, הוא-יכול-לקבל-תשלום-מוקדם-ממַממן. כולם-מרוויחים.",
      consultantHe:
        "Taulia-מתממשק-ל-S/4HANA-AP ומציע: Dynamic-Discounting (הנחה-משתנה-לפי-מוקדמות-התשלום), Supply-Chain-Finance/Reverse-Factoring (מַממן-צד-שלישי-משלם-לספק-מוקדם, הקונה-משלם-בתאריך-המקורי), ו-Virtual-Cards. נשען-על-Open-Items (BSIK) ועל-תזרים-עודף. מאזן-בין-DPO-לבין-הנחות-וקשרי-ספק. שונה-מ-Cash-Discount-קבוע: ההנחה-דינמית-לפי-יום-התשלום.",
      purposeHe:
        "למקסם-תשואה-על-מזומן-עודף (הנחות-דינמיות) ולחזק-את-יציבות-שרשרת-האספקה (מימון-ספקים), תוך-איזון-הון-חוזר.",
      processExampleHe:
        "לקונה-יש-מזומן-עודף; דרך-Taulia-הוא-מציע-לספק-תשלום-מוקדם-תמורת-הנחה-דינמית (2.5%-אם-25-יום-מוקדם). הספק-מקבל-מזומן-מהר, הקונה-משיג-תשואה-עדיפה-על-הפיקדון.",
      cbcHe:
        "ב-CBC מפעל-המילוי-מציע-Dynamic-Discounting-לספקי-אריזה-קטנים-הזקוקים-למזומן, מחזק-יציבות-אספקה-ומשפר-תשואה-על-מזומן-עודף-עונתי.",
      navHe: [
        "SAP Business Technology Platform ► Taulia Working Capital Management",
        "SAP Fiori Launchpad ► Accounts Payable ► Early Payment / Discounting",
      ],
      tables: ["BSIK", "BSAK", "ACDOCA"],
      tcodes: ["F110", "FBL1N"],
      fiori: ["F2179", "F0770"],
      configHe: [
        "חיבור-Taulia ל-S/4HANA-AP (Open-Items-feed).",
        "Dynamic-Discounting-rules ו-Supply-Chain-Finance-programs.",
        "Funder/Bank-onboarding ל-Reverse-Factoring.",
      ],
      mistakesHe: [
        "Dynamic-Discounting ללא-בחינת-תשואה-מול-עלות-הון.",
        "אי-תיאום-עם-DPO/תזרים — מתח-נזילות.",
      ],
      troubleshootHe: [
        "הנחה-דינמית-לא-מוצעת ➔ Open-Item-לא-זרם-ל-Taulia או-חוץ-לתקופה.",
        "מימוש-מוקדם-נכשל ➔ Funder-onboarding/program-לא-פעיל.",
      ],
      bestPracticeHe: [
        "השווה-תשואת-Dynamic-Discount-מול-עלות-הון-אלטרנטיבית.",
        "אזן-Early-Payment-מול-DPO-ויעדי-תזרים.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Cash Discount קבוע ל-Dynamic Discounting של Taulia?", aHe: "Cash-Discount-קבוע = שיעור-אחד-בתקופה-קבועה (2%/10); Dynamic-Discounting = הנחה-משתנה-יחסית-למוקדמות-התשלום-בפועל — ככל-שמשלמים-מוקדם-יותר, ההנחה-גדולה-יותר." },
        { qHe: "מהו Supply-Chain-Finance?", aHe: "מַממן-צד-שלישי-משלם-לספק-מוקדם; הקונה-מחזיר-למַממן-בתאריך-הפירעון-המקורי — הספק-מקבל-מזומן-מהר, הקונה-שומר-DPO." },
      ],
      takeawaysHe: [
        "Taulia = ניהול-הון-חוזר: Dynamic-Discounting + Supply-Chain-Finance + Virtual-Cards.",
        "ממקסם-תשואת-מזומן-עודף ומחזק-יציבות-שרשרת-אספקה.",
        "הנחה-דינמית-לפי-יום-תשלום, להבדיל-מ-Cash-Discount-קבוע.",
      ],
      relatedHe: [
        { labelHe: "MM · ניצול-הנחת-מזומן (12.4.6)", href: "/library/mm/chapter-12/#sub-12.4.6" },
        { labelHe: "MM · DPO (12.4.7)", href: "/library/mm/chapter-12/#sub-12.4.7" },
      ],
    },
    // ============================================================ 12.9
    {
      id: "12.9",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק-זה-כיסה-את-ניהול-החשבוניות-והזכאים-קצה-לקצה: מאימות-חשבונית-LIV (MIRO/3-Way-Match), דרך-חסימות-ושחרור (MRBR), חשבונות-זכאים-ותשלום (BSIK/BSAK/F110), אנליטיקה (Aging/DPO/הנחות), קונפיגורציה (OMR6/FBZP/OBYC), ועד-פתרונות-אוטומציה-ומימון (OpenText, Ariba-CIM, Taulia).",
      beginnerHe:
        "סיכמנו-את-כל-המסע: איך-קולטים-ובודקים-חשבונית, מתי-חוסמים-ואיך-משחררים, איך-מנהלים-את-החוב-לספק-ומשלמים, איך-מנתחים-ומדווחים, איך-מגדירים-את-החוקים, ואיזה-כלים-מודרניים-מאיצים-את-הכל.",
      consultantHe:
        "המיומנויות-לרכישה: שליטה-ב-LIV (MIRO/MIR7/MIR4/MIR6) ו-3-Way-Match; טיפול-בחסימות (MRBR, טולרנסים-OMR6); ניהול-זכאים-ותשלום (BSIK/BSAK, F110, FBZP); אנליטיקת-AP (Aging/Overdue/DPO/Cash-Discount); קונפיגורציה (Duplicate-Check, OBYC, OBB8); ואינטגרציות (OpenText-VIM, Ariba-CIM, Taulia). יחד-הם-מכסים-את-סגירת-מעגל-ה-Procure-to-Pay.",
      purposeHe:
        "לאחד-את-כל-רכיבי-הפרק-לתמונה-אחת-קוהרנטית ולוודא-שהלומד-יכול-לבצע-ולתחקר-את-תהליך-החשבוניות-והזכאים-עצמאית.",
      processExampleHe:
        "מסע-מלא: PO→GR→MIRO (3-Way-Match)→חסימה-אפשרית→MRBR→זכאי-BSIK→F110→BSAK→אנליטיקה (DPO/הנחות) — כל-השלבים-שנלמדו-בפרק-במחזור-אחד.",
      cbcHe:
        "ב-CBC הלומד-מסוגל-כעת-לנהל-את-מחזור-חשבוניות-הספק-של-מפעל-המילוי: מתרכיז-ועד-אריזה, אימות-תשלום-ואופטימיזציית-הון-חוזר.",
      navHe: ["SAP Fiori Launchpad ► Sourcing and Procurement ► Invoice and Payables Management"],
      tables: ["RBKP", "RSEG", "BSIK", "BSAK"],
      tcodes: ["MIRO", "MRBR", "F110"],
      fiori: ["F0859", "F2179"],
      configHe: [
        "ליבת-הקונפיגורציה: OMR6 (טולרנס), FBZP (תשלום), OBYC (חשבונות), OBB8 (תנאים), Duplicate-Check.",
      ],
      mistakesHe: [
        "לימוד-טרנזקציות-בלי-הבנת-זרימת-ה-Procure-to-Pay השלמה.",
        "התעלמות-מהחיבור MM↔FI (חשבונית↔מסמך-FI↔זכאי).",
      ],
      troubleshootHe: [
        "בעיית-תשלום ➔ עקוב-לאחור: BSIK→Payment-Block→MRBR→MIRO→3-Way-Match.",
        "פער-מאזני ➔ בדוק-GR/IR (MR11) ו-Reconciliation-Account.",
      ],
      bestPracticeHe: [
        "חשוב-במונחי-מעגל-מלא: חשבונית→זכאי→תשלום→אנליטיקה.",
        "אכוף-בקרות (3-Way, Duplicate-Check, הפרדת-תפקידים) לאורך-כל-התהליך.",
      ],
      interviewHe: [
        { qHe: "סכם את מעגל ניהול-החשבוניות-והזכאים.", aHe: "PO→GR→אימות-חשבונית (MIRO/3-Way-Match)→חסימה/שחרור (MRBR)→זכאי-פתוח (BSIK)→תשלום (F110)→מסולק (BSAK)→אנליטיקה (Aging/DPO/הנחות), עם-קונפיגורציה (OMR6/FBZP/OBYC) ואינטגרציות (OpenText/Ariba/Taulia)." },
      ],
      takeawaysHe: [
        "ניהול-חשבוניות-וזכאים-סוגר-את-מעגל-ה-Procure-to-Pay.",
        "ליבה: LIV+3-Way-Match, MRBR, BSIK/BSAK, F110, אנליטיקת-AP.",
        "קונפיגורציה (OMR6/FBZP/OBYC) ואוטומציה (OpenText/Ariba/Taulia) משלימות.",
      ],
      relatedHe: [
        { labelHe: "MM · ניהול-מלאי (פרק 7)", href: "/library/mm/chapter-07/" },
        { labelHe: "MM · הזמנת-רכש (פרק 5)", href: "/library/mm/chapter-05/" },
      ],
    },
  ],
};
