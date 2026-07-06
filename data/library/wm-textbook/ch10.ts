// ===== WM/EWM Digital Textbook — Chapter 10 (gold-standard learning chapter) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Hierarchy preserved exactly: 10.1 / 10.2 (10.2.1 Inbound, 10.2.2 Outbound) / 10.3.
// Transformative Hebrew (beginner + consultant friendly); SAP identifiers verbatim EN.
import type { TextbookChapter } from "./types";

export const CH10: TextbookChapter = {
  n: 10,
  titleHe: "SAP Advanced Track and Trace לתרופות",
  titleEn: "SAP Advanced Track and Trace for Pharmaceuticals",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה ל-SAP Advanced Track and Trace for Pharmaceuticals (ATTP) ולשילובו עם SAP EWM ו-SAP S/4HANA. ATTP הוא פתרון ה-serialization וה-track-and-trace הרגולטורי של SAP לתעשיית-התרופות — הוא מנהל מספרים-סדרתיים ייחודיים ברמת-הפריט (serialization), בונה היררכיות-אריזה (aggregation), מתעד אירועי-שרשרת-אספקה בתקן EPCIS, ומדווח לרשויות (US DSCSA, EU FMD). שלושת תתי-הפרקים — סקירה (10.1), שילוב עם EWM ו-S/4HANA על תהליכי inbound/outbound (10.2), ומסקנות (10.3) — הורחבו כל אחד ליחידת-לימוד עצמאית בת 18 מקטעים: שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת הארגון, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. הערה לארגון: ATTP ממוקד-תרופות, אך אותם עקרונות של serialization, aggregation ו-track-and-trace חלים אנלוגית על מעקב-אצוות במשקאות (beverage batch traceability) — ההסברים מסומנים בהתאם.",
  subchapters: [
    // ============================================================ 10.1
    {
      id: "10.1",
      titleHe: "סקירת SAP Advanced Track and Trace for Pharmaceuticals",
      titleEn: "Overview of SAP Advanced Track and Trace for Pharmaceuticals",
      execHe:
        "SAP Advanced Track and Trace for Pharmaceuticals (ATTP) הוא פלטפורמת ה-serialization וה-track-and-trace של SAP, שנועדה לעמוד ברגולציות-תרופות גלובליות (US DSCSA, EU FMD, ועוד). היא מנפיקה ומנהלת מספרים-סדרתיים ייחודיים לכל יחידת-מכירה (serialization), קושרת אותם להיררכיית-אריזה (aggregation: item→case→pallet), מתעדת כל אירוע פיזי בתקן EPCIS, ומדווחת לרשויות ולשותפי-סחר. ATTP הוא מערכת-העל (system of record) לזהות-הסדרתית; EWM/ERP הם מערכות-הביצוע הפיזיות שמזינות אותה.",
      beginnerHe:
        "דמיין שכל קופסת-תרופה מקבלת 'תעודת-זהות' ייחודית — מספר-סדרתי מודפס כברקוד דו-ממדי (DataMatrix). ATTP הוא ה'מרשם-אוכלוסין' שמנפיק את המספרים, יודע אילו מספרים תקפים, ועוקב היכן כל פריט נמצא לאורך כל המסע מהמפעל ועד בית-המרקחת. כשמכניסים 100 קופסאות לארגז אחד, ATTP זוכר 'הקשר' הזה (aggregation) כך שסריקת-הארגז שווה לסריקת כל 100 הקופסאות. כשארגז יוצא מהמחסן, ATTP מתעד את האירוע ומדווח לרשות-הבריאות.",
      consultantHe:
        "ATTP רץ על Application Platform של SAP (NetWeaver/ABAP, או כ-add-on ל-S/4HANA). רכיבי-הליבה: Object Event Repository (OER) — מאגר ה-EPCIS events; Number Range management ל-serial/SGTIN/SSCC; Trade Item ו-Packaging Hierarchy master data; ו-Regulatory Reporting דרך תבניות (DSCSA EPCIS, EU Hub וכו'). אינטגרציה נעשית דרך IDoc/PI/OData ו-EPCIS-XML messages. EWM/ERP מזינים ל-ATTP אירועי commissioning, packing (aggregation), shipping (decommissioning/shipping event) ו-receiving. המודל-המושגי הוא GS1: GTIN לפריט, SGTIN ל-serialized item, SSCC ל-logistic unit, ואירועי EPCIS מסוג ObjectEvent/AggregationEvent/TransactionEvent.",
      purposeHe:
        "המטרה: עמידה ברגולציה (כל יחידת-תרופה חייבת זהות-ייחודית ניתנת-אימות לאורך-השרשרת), מניעת זיופים (anti-counterfeiting), יכולת recall מדויקת (לאתר בדיוק אילו אצוות/סריאלים הופצו לאן), ושקיפות-שרשרת מקצה-לקצה. עסקית: רישיון-להפעיל בשווקים מוסדרים, צמצום-סיכון רגולטורי, ושיפור-אמון בשרשרת-האספקה.",
      processExampleHe:
        "קו-אריזה במפעל מדפיס DataMatrix ייחודי על כל קופסה (commissioning — ATTP מנפיק את הסריאלים מראש). הקופסאות נארזות בארגז שמקבל SSCC; ATTP רושם AggregationEvent הקושר את סריאלי-הקופסאות ל-SSCC של הארגז. הארגז נכנס למלאי, ובהמשך נשלח ללקוח — ATTP רושם shipping ObjectEvent + TransactionEvent (העברת-בעלות) ומפיק הודעת EPCIS ללקוח ולרשות. הלקוח קולט (receiving), והשרשרת מתועדת מקצה-לקצה.",
      scenarioHe:
        "בארגון: ATTP עצמו ממוקד-תרופות ואינו מוטמע למשקאות; אך העיקרון אנלוגי — מעקב-אצוות של משקאות (beverage batch traceability) מנהל זהות ייחודית ברמת-אצווה/מארז, aggregation של בקבוקים↔ארגז↔משטח, ותיעוד-אירועים לצורך recall ו-track-and-trace. בארגון המנגנון המקביל ל-serialization הוא ניהול-אצוות (Batch management) ב-EWM + תיוג-משטחים ב-SSCC; ATTP יוטמע רק אם הארגון תיכנס לקו-מוצרים מוסדר (למשל תוספי-תזונה תחת רגולציה).",
      navHe: [
        "SPRO ► SAP Advanced Track and Trace for Pharmaceuticals ► General Settings ► Define Number Ranges (SGTIN/SSCC/Serial)",
        "SPRO ► SAP Advanced Track and Trace for Pharmaceuticals ► Master Data ► Trade Item ► Define Trade Item Settings",
        "SPRO ► SAP Advanced Track and Trace for Pharmaceuticals ► Object Event Repository ► EPCIS ► Configure Event Capture",
        "SPRO ► SAP Advanced Track and Trace for Pharmaceuticals ► Regulatory Reporting ► Define Reporting Profiles (DSCSA / EU FMD)",
      ],
      tables: ["/STTPEC/V_TI", "/STTPEC/EVENT", "/STTPEC/SGTIN", "/STTPEC/SSCC", "EDIDC"],
      tcodes: ["/STTPEC/UITRACK", "/STTPEC/MD_TI", "/STTPEC/SETTINGS", "WE19", "SXMB_MONI"],
      fiori: ["F-ATTP-Track", "F-ATTP-Report"],
      configHe: [
        "Number Ranges: הגדר טווחים נפרדים ל-Serial Numbers, ל-SGTIN (GTIN+serial) ול-SSCC (logistic unit) — חובה לפני commissioning.",
        "Trade Item Master: GTIN, רמת-אריזה (each/case/pallet), Regulatory relevance, ושיוך-מדינה/שוק.",
        "Packaging Hierarchy: הגדרת רמות-האריזה ויחסי-הכמות (כמה each בכל case, כמה case בכל pallet) — בסיס ל-aggregation.",
        "EPCIS Event Profiles: אילו אירועים (commissioning/packing/shipping/receiving) נלכדים ואיך הם ממופים לפעולות EWM.",
        "Regulatory Reporting Profiles: תבנית-דיווח לכל רגולציה (DSCSA EPCIS, EU Hub) + נקודות-קצה (endpoints) לרשות/לשותף.",
      ],
      flow: [
        { he: "הנפקת-סריאלים מראש", code: "Number Range", note: "SGTIN/SSCC" },
        { he: "Commissioning (הדפסה בקו)", code: "ObjectEvent", note: "סריאל הופך פעיל" },
        { he: "Aggregation (אריזה)", code: "AggregationEvent", note: "item→case→pallet" },
        { he: "תיעוד ב-OER", code: "/STTPEC/EVENT", note: "EPCIS repository" },
        { he: "Shipping / Decommissioning", code: "ObjectEvent", note: "יציאה מהמלאי" },
        { he: "דיווח רגולטורי", code: "EPCIS-XML", note: "DSCSA / EU FMD" },
      ],
      masterDataHe: [
        "Trade Item = GTIN + רמת-אריזה + רגולציה (אנלוגי ל-Material + Batch ב-EWM).",
        "Packaging Hierarchy = יחסי-הכמות בין רמות-האריזה; בסיס ל-AggregationEvent.",
        "Number Range objects ל-Serial/SGTIN/SSCC — מקור הזהויות-הייחודיות.",
        "Location/Trading Partner master — לזיהוי צד שולח/מקבל באירועי TransactionEvent.",
      ],
      mistakesHe: [
        "הנפקת-סריאלים ללא Number Range נפרד לכל סוג (Serial/SGTIN/SSCC) — התנגשויות ואי-ייחודיות.",
        "הזנת Packaging Hierarchy שגויה (יחסי-כמות לא-תואמים לאריזה הפיזית) — aggregation נכשל.",
        "אי-הגדרת Regulatory relevance ב-Trade Item — מוצר מוסדר נשלח בלי דיווח.",
        "בלבול בין GTIN (סוג-מוצר) ל-SGTIN (מופע-סדרתי) — מודל-נתונים שגוי.",
      ],
      troubleshootHe: [
        "commissioning נכשל ➔ Number Range מוצה/חסר, או Trade Item ללא GTIN תקף.",
        "aggregation לא נסגר ➔ Packaging Hierarchy לא תואם לכמות שנסרקה.",
        "דיווח רגולטורי לא נשלח ➔ Reporting Profile/endpoint שגוי או EPCIS-XML פסול (בדוק SXMB_MONI).",
        "אירוע EPCIS לא נרשם ב-OER ➔ Event Profile לא ממופה לפעולת-ה-EWM המתאימה.",
      ],
      bestPracticeHe: [
        "תכנן את מודל ה-GS1 (GTIN/SGTIN/SSCC) מראש ותאם עם הספקים ושותפי-הסחר.",
        "הנפק טווחי-מספרים בעתודה מספקת ונטר ניצול לפני מיצוי.",
        "בדוק EPCIS-XML מול schema לפני production; הרץ סבב end-to-end עם שותף-בדיקה.",
        "שמור על ATTP כ-system of record יחיד לזהות-סדרתית; אל תכפיל ניהול-סריאלים ב-EWM.",
      ],
      interviewHe: [
        { qHe: "מהו ההבדל בין serialization ל-aggregation?", aHe: "serialization = הנפקת מספר-סדרתי ייחודי לכל יחידת-מכירה (SGTIN); aggregation = קישור-היררכי של הסריאלים לרמת-אריזה גבוהה יותר (case/pallet עם SSCC), כך שסריקת-המארז שמוגז לכל הפריטים שבתוכו." },
        { qHe: "מהו EPCIS ולמה הוא מרכזי ב-ATTP?", aHe: "EPCIS (Electronic Product Code Information Services) הוא תקן GS1 לתיעוד אירועי-שרשרת-אספקה (what/when/where/why). ATTP מתעד כל אירוע פיזי כ-EPCIS event ב-Object Event Repository ומשתמש בו לדיווח רגולטורי ולשיתוף עם שותפים." },
        { qHe: "מהו תפקיד ATTP מול EWM/S4?", aHe: "ATTP הוא מערכת-העל לזהות-הסדרתית ולדיווח-רגולטורי (system of record); EWM/S4 הם מערכות-הביצוע הפיזיות שמזינות את ATTP באירועי commissioning, packing, shipping ו-receiving." },
      ],
      takeawaysHe: [
        "ATTP = פלטפורמת serialization + track-and-trace רגולטורית לתרופות (DSCSA/FMD).",
        "מודל GS1: GTIN לסוג, SGTIN למופע-סדרתי, SSCC ל-logistic unit.",
        "EPCIS events (Object/Aggregation/Transaction) נשמרים ב-OER ומשמשים לדיווח.",
        "ATTP הוא system of record לזהות; EWM/S4 הם שכבת-הביצוע הפיזית.",
      ],
      relatedHe: [
        { labelHe: "EWM · שילוב ATTP עם EWM ו-S/4HANA (10.2)", href: "/library/wm/chapter-10/#sub-10.2" },
        { labelHe: "EWM · תהליך-כניסה (10.2.1)", href: "/library/wm/chapter-10/#sub-10.2.1" },
        { labelHe: "אובייקט · /STTPEC/EVENT", href: "/library/wm/object/STTPEC_EVENT/" },
      ],
    },
    // ============================================================ 10.2
    {
      id: "10.2",
      titleHe: "שימוש ב-ATTP יחד עם SAP EWM ו-SAP S/4HANA",
      titleEn: "Using SAP Advanced Track and Trace for Pharmaceuticals with SAP EWM and SAP S/4HANA",
      execHe:
        "השילוב בין ATTP ל-SAP EWM ו-SAP S/4HANA הופך את ה-serialization מהצהרה-רגולטורית לתהליך-ביצוע פיזי. EWM מבצע את התנועות במחסן (קליטה, אחסון, ליקוט, אריזה, משלוח) ומזין כל אירוע רלוונטי ל-ATTP בזמן-אמת: commissioning בקליטה, aggregation/disaggregation באריזה, ו-shipping ביציאה. S/4HANA מספק את הקשר-העסקי (הזמנות, מסירות, אצוות). התוצאה: כל סריאל שנע במחסן מתועד ב-ATTP בתקן EPCIS, והדיווח-הרגולטורי נגזר אוטומטית מהפעילות הפיזית.",
      beginnerHe:
        "EWM הוא ה'מחסן החכם' שמזיז סחורה פיזית; ATTP הוא ה'יומן-המסע' שזוכר היכן כל פריט-סדרתי. השילוב אומר: בכל פעם ש-EWM עושה פעולה (קולט משטח, אורז ארגז, שולח משלוח) — הוא 'מספר' ל-ATTP מה קרה, וATTP רושם את האירוע. כך אין צורך להזין פעמיים: התנועה הפיזית ב-EWM היא גם רישום ה-track-and-trace. S/4HANA נותן את ה'הקשר' — מאיזו הזמנה, לאיזה לקוח, מאיזו אצווה.",
      consultantHe:
        "ארכיטקטורת-האינטגרציה: EWM (Embedded ב-S/4HANA או Decentralized) מזהה פעולות serialization-relevant דרך packaging specifications ו-warehouse process types, ומפעיל את ה-EWM-ATTP interface. נקודות-המגע: בקליטה — /SCWM/ERP_GOODSMVT + commissioning; באריזה — /SCWM/PACK (HU creation) שמפיק AggregationEvent; במשלוח — /SCWM/TODLV_TO_CONF / Goods Issue שמפיק shipping ObjectEvent + TransactionEvent. ה-Handling Unit (HU) ב-EWM ממופה ל-SSCC ב-ATTP. הקישוריות דרך qRFC/IDoc (Embedded) או EPCIS-XML/PI (Decentralized/3rd-party line). S/4HANA מספק delivery (LIKP/LIPS), batch (MCH1) ו-business partner. קונפיגורציית-מפתח: שיוך warehouse process type ל-serialization profile, ומיפוי EWM HU types ל-ATTP packaging levels.",
      purposeHe:
        "המטרה: לאחד את הביצוע-הפיזי (EWM) עם התיעוד-הרגולטורי (ATTP) ללא הזנה-כפולה וללא פערי-נתונים. כך מובטח שכל יחידה שיצאה מהמחסן דווחה, כל aggregation משקף את האריזה האמיתית, וה-recall יכול להישען על נתוני-תנועה אמיתיים ולא על הצהרות.",
      processExampleHe:
        "משלוח-יוצא ללקוח: S/4HANA יוצר Outbound Delivery; EWM מבצע Warehouse Order, מלקט סריאלים, אורז ל-HU (=SSCC) ומפיק AggregationEvent ב-ATTP; ב-Goods Issue, EWM מפעיל shipping ObjectEvent + TransactionEvent (העברת-בעלות מהמחסן ללקוח); ATTP מפיק EPCIS-XML ושולח ללקוח ולרשות. כל הסריאלים שבמשלוח עברו מ-status 'במלאי' ל-'נשלח' אוטומטית.",
      scenarioHe:
        "בארגון השילוב EWM↔ATTP אינו פעיל (אין רגולציית-תרופות); המקבילה היא EWM Batch management + HU/SSCC על משטחי-משקאות, המתעד aggregation (בקבוק→ארגז→משטח) ותנועות-מלאי לצורך מעקב-אצווה ו-recall. אם הארגון תידרש לרגולציה, אותן נקודות-מגע (/SCWM/PACK ל-aggregation, Goods Issue ל-shipping event) יחוברו ל-ATTP באותו אופן.",
      navHe: [
        "SPRO ► SCM Extended Warehouse Management ► EWM ► Cross-Process Settings ► Serial Numbers ► Define Serial Number Profiles",
        "SPRO ► SCM EWM ► EWM ► Goods Receipt Process ► Configure Serialization in Inbound Process",
        "SPRO ► SCM EWM ► EWM ► Goods Issue Process ► Configure Serialization in Outbound Process",
        "SPRO ► ATTP ► Integration ► EWM Integration ► Map EWM HU Types to Packaging Levels",
      ],
      tables: ["/SCWM/HU", "/SCWM/ORDIM_O", "/STTPEC/EVENT", "/STTPEC/SSCC", "LIKP"],
      tcodes: ["/SCWM/PACK", "/SCWM/MON", "/SCWM/GR", "/STTPEC/UITRACK", "SXMB_MONI"],
      fiori: ["F-EWM-Pack", "F-ATTP-Track"],
      configHe: [
        "Serial Number Profile (EWM): קובע אילו תנועות דורשות serialization ובאילו רמות (GR/putaway/picking/GI).",
        "Warehouse Process Type mapping: שיוך WPT ל-serialization-relevant פעולות והפעלת ה-ATTP interface.",
        "HU↔SSCC mapping: מיפוי EWM Handling Unit types לרמות-אריזה (packaging levels) ב-ATTP.",
        "EPCIS Event mapping: איזה אירוע-EWM (GR/Pack/GI) מפיק איזה EPCIS event (commissioning/aggregation/shipping).",
        "Communication channel: qRFC/IDoc ל-Embedded או EPCIS-XML/PI ל-Decentralized — הגדר endpoints ו-monitoring.",
      ],
      flow: [
        { he: "S/4HANA: הזמנה/מסירה", code: "LIKP/LIPS", note: "הקשר עסקי" },
        { he: "EWM: ביצוע-תנועה", code: "/SCWM/MON", note: "GR/Pick/Pack/GI" },
        { he: "זיהוי serialization-relevant", code: "Serial Profile", note: "WPT mapping" },
        { he: "הפקת EPCIS event", code: "EWM-ATTP IF", note: "commissioning/aggr/ship" },
        { he: "רישום ב-OER", code: "/STTPEC/EVENT" },
        { he: "דיווח רגולטורי", code: "EPCIS-XML", note: "ללקוח/רשות" },
      ],
      masterDataHe: [
        "EWM Handling Unit (HU) ↔ ATTP SSCC — הגשר בין אריזה-פיזית לזהות-סדרתית.",
        "Serial Number Profile (EWM) קובע רלוונטיות-serialization לכל תנועה.",
        "S/4HANA Delivery (LIKP/LIPS) + Batch (MCH1) — הקשר-העסקי לאירועי TransactionEvent.",
        "ATTP Trade Item + Packaging Hierarchy — היעד אליו ממופים נתוני-ה-EWM.",
      ],
      mistakesHe: [
        "אי-שיוך Serial Number Profile ל-Warehouse Process Type — תנועות serialized עוברות בלי לדווח ל-ATTP.",
        "מיפוי HU↔SSCC חסר — aggregation ב-EWM לא נרשם ב-ATTP.",
        "ערוב Embedded vs Decentralized integration patterns — כפילות או אובדן הודעות.",
        "Goods Issue ללא shipping event — סריאל יצא פיזית אך נשאר 'במלאי' ב-ATTP.",
      ],
      troubleshootHe: [
        "אירוע-EWM לא הגיע ל-ATTP ➔ Serial Profile/WPT לא ממופה, או qRFC/PI תקוע (SMQ1/SXMB_MONI).",
        "aggregation לא תואם ➔ HU type לא ממופה ל-packaging level הנכון.",
        "GI לא מפיק shipping event ➔ Goods Issue Process serialization לא מוגדר.",
        "סטטוס-סריאל סוטה בין EWM ל-ATTP ➔ הודעות לא-מסונכרנות; בצע reconciliation מול ה-OER.",
      ],
      bestPracticeHe: [
        "מפה כל warehouse process type ל-EPCIS event מפורש; אל תסמוך על ברירות-מחדל.",
        "השתמש ב-HU כיחידת-ה-aggregation היחידה כדי ש-EWM ו-ATTP יסכימו על SSCC.",
        "נטר את ערוץ-התקשורת (qRFC/PI) באופן יזום ובנה התראות-כשל.",
        "הרץ end-to-end inbound+outbound בסביבת-בדיקה לפני go-live, כולל דיווח-רגולטורי.",
      ],
      interviewHe: [
        { qHe: "כיצד EWM מזהה תנועה כ-serialization-relevant?", aHe: "דרך Serial Number Profile המשויך ל-Warehouse Process Type; הפרופיל קובע אילו תנועות (GR/putaway/picking/GI) דורשות serial capture ומפעיל את ה-EWM-ATTP interface." },
        { qHe: "מהו הקשר בין Handling Unit (EWM) ל-SSCC (ATTP)?", aHe: "ה-HU ב-EWM היא יחידת-האריזה הפיזית; היא ממופה ל-SSCC ב-ATTP, כך שיצירת-HU ב-/SCWM/PACK מפיקה AggregationEvent הקושר את הסריאלים שבתוכה." },
        { qHe: "מה ההבדל בין Embedded ל-Decentralized EWM בהקשר ATTP?", aHe: "Embedded EWM (תוך S/4HANA) מתקשר עם ATTP בעיקר דרך qRFC/IDoc פנימי; Decentralized או קו-3rd-party מתקשר דרך EPCIS-XML/PI. דפוס-האינטגרציה משפיע על ניטור-הודעות וטיפול-בכשלים." },
      ],
      takeawaysHe: [
        "EWM מבצע פיזית; ATTP מתעד רגולטורית — בלי הזנה-כפולה.",
        "Serial Number Profile + WPT mapping הם המתג ל-serialization ב-EWM.",
        "HU↔SSCC הוא הגשר ל-aggregation בין EWM ל-ATTP.",
        "Inbound→commissioning, Pack→aggregation, GI→shipping/TransactionEvent.",
      ],
      relatedHe: [
        { labelHe: "EWM · סקירת ATTP (10.1)", href: "/library/wm/chapter-10/#sub-10.1" },
        { labelHe: "EWM · תהליך-כניסה (10.2.1)", href: "/library/wm/chapter-10/#sub-10.2.1" },
        { labelHe: "EWM · תהליך-יציאה (10.2.2)", href: "/library/wm/chapter-10/#sub-10.2.2" },
      ],
      children: [
        {
          id: "10.2.1",
          titleHe: "תהליך כניסה (Inbound Process)",
          titleEn: "Inbound Process",
          execHe:
            "בתהליך-הכניסה (inbound) EWM קולט סחורה מוסדרת ומזין ל-ATTP את אירועי-ה-serialization הראשוניים. אם הסחורה מיוצרת בבית — קו-האריזה מבצע commissioning (הנפקת-סריאלים פעילים) ו-aggregation לפני הקליטה; אם נקלטת מספק — EWM מבצע verification של הסריאלים הנכנסים מול הודעת-ה-EPCIS שהספק שלח, ורושם receiving event. כך נכנס המלאי-הסדרתי ל-ATTP במצב-תקין הניתן-למעקב.",
          beginnerHe:
            "כשסחורה נכנסת למחסן, צריך 'לקלוט' לא רק את הכמות אלא גם את כל המספרים-הסדרתיים. אם הספק שלח קובץ-EPCIS שאומר 'שלחתי לך את הסריאלים האלה' — EWM סורק ומוודא שמה שהגיע פיזית = מה שהובטח. אם זה מוצר שלנו שיצא מקו-האריזה — אנחנו עצמנו 'מפעילים' את הסריאלים (commissioning) ובונים את היררכיית-האריזה (aggregation) לפני שמאחסנים.",
          consultantHe:
            "זרימת-inbound: (1) Advanced Shipping Notification / EPCIS inbound message מהספק נקלטת ב-ATTP; (2) EWM Inbound Delivery (/SCWM/PRDI) עם serialization profile; (3) בקליטה — /SCWM/GR מפעיל serial capture; הסריאלים מאומתים מול ה-OER (verification אם external, commissioning אם in-house); (4) putaway ל-storage bin שומר על קשר HU↔SSCC. נקודת-המגע ל-ATTP: receiving/commissioning ObjectEvent + ייתכן AggregationEvent. אי-התאמה (סריאל שלא נשלח / כפול / לא-תקף) מפעילה exception handling. ב-S/4HANA ה-Inbound Delivery (VL31N/LIKP) מספק את ההקשר.",
          purposeHe:
            "המטרה: להבטיח שרק מלאי-סדרתי תקין ומאומת נכנס למערכת, לזהות זיופים/טעויות כבר בשער-הכניסה, ולתעד את נקודת-הכניסה של כל סריאל ל-track-and-trace.",
          processExampleHe:
            "ספק שולח 50 ארגזים (כל אחד SSCC עם 100 SGTIN) + הודעת-EPCIS. ATTP קולט את ההודעה. EWM יוצר Inbound Delivery, ובקליטה סורק את ה-SSCC של כל ארגז; ATTP מאמת שהסריאלים תואמים את ההודעה ורושם receiving event. הארגזים מאוחסנים תוך שמירת קשר HU↔SSCC. אם ארגז-אחד מכיל סריאל לא-מדווח — EWM מסמן exception ומונע putaway עד בירור.",
          scenarioHe:
            "בארגון המקביל: קליטת חומרי-גלם/מוצרים מנוהלי-אצווה ל-EWM עם רישום-אצווה ו-HU; ה'verification' הוא בדיקת-תעודת-אצווה (CoA) וקליטת-משטחים ב-SSCC. אין EPCIS-inbound, אך עיקרון בדיקת-התאמה בשער-הכניסה זהה.",
          navHe: [
            "SPRO ► SCM EWM ► EWM ► Goods Receipt Process ► Inbound Delivery ► Serialization Settings",
            "SPRO ► SCM EWM ► EWM ► Cross-Process Settings ► Serial Numbers ► Assign Serial Profile to Inbound WPT",
            "SPRO ► ATTP ► Inbound ► Configure Inbound EPCIS Message Verification",
          ],
          tables: ["/SCWM/PRDI", "/SCWM/HU", "/STTPEC/EVENT", "LIKP", "EDIDC"],
          tcodes: ["/SCWM/PRDI", "/SCWM/GR", "/SCWM/PACK", "/STTPEC/UITRACK", "WE19"],
          fiori: ["F-EWM-GR", "F-ATTP-Verify"],
          configHe: [
            "Inbound Serial Profile: קובע serial capture בקליטה (mandatory/optional) ורמת-האריזה הנסרקת.",
            "EPCIS Inbound Verification (ATTP): מיפוי הודעת-הספק לאימות מול ה-OER; מה לעשות באי-התאמה.",
            "Exception handling: profile לטיפול בסריאל לא-תקף/כפול/חסר בשער-הכניסה.",
            "HU↔SSCC inbound mapping: שמירת קשר-האריזה בקליטה ובאחסון.",
          ],
          flow: [
            { he: "EPCIS / ASN מהספק", code: "ATTP Inbound", note: "אם external" },
            { he: "Inbound Delivery", code: "/SCWM/PRDI" },
            { he: "Goods Receipt + serial capture", code: "/SCWM/GR" },
            { he: "Verification / Commissioning", code: "ObjectEvent", note: "מול OER" },
            { he: "Putaway (שמירת HU↔SSCC)", code: "/SCWM/PACK" },
            { he: "סריאל פעיל ובמלאי", code: "/STTPEC/UITRACK" },
          ],
          masterDataHe: [
            "Inbound Delivery (S/4: LIKP/LIPS) = ההקשר העסקי לקליטה.",
            "Serial Number Profile (inbound) = רלוונטיות-ה-serialization בקליטה.",
            "EPCIS inbound message = מקור-האמת לאימות סריאלים external.",
            "HU/SSCC = יחידת-האריזה הנשמרת מהקליטה ואילך.",
          ],
          mistakesHe: [
            "קליטה ללא serial capture למוצר-מוסדר — מלאי 'עיוור' לא ניתן-למעקב.",
            "התעלמות מ-EPCIS inbound mismatch — קליטת סריאלים מזויפים/שגויים.",
            "אובדן קשר HU↔SSCC ב-putaway — aggregation 'נשבר' באחסון.",
            "commissioning כפול לסריאל שכבר הופעל — שגיאת-ייחודיות ב-OER.",
          ],
          troubleshootHe: [
            "serial capture לא נדרש בקליטה ➔ Inbound Serial Profile לא משויך ל-WPT.",
            "אימות נכשל ➔ הודעת-EPCIS מהספק חסרה/פגומה (בדוק WE19/SXMB_MONI).",
            "putaway חסום ➔ exception על סריאל לא-תקף; טפל ב-exception profile.",
            "aggregation לא נשמר ➔ HU↔SSCC inbound mapping חסר.",
          ],
          bestPracticeHe: [
            "דרוש EPCIS inbound מכל ספק-מוסדר וחסום קליטה ללא-אימות.",
            "סרוק ברמת-ה-SSCC (לא פריט-פריט) למהירות, תוך שמירת ה-aggregation.",
            "הגדר exception handling ברור עם בעלות-תהליך מוגדרת.",
            "בדוק reconciliation תקופתי בין מלאי-EWM למלאי-סריאלים ב-ATTP.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין commissioning ל-verification בקליטה?", aHe: "commissioning = הפעלת-סריאל חדש שאנו מנפיקים (מוצר in-house שיצא מקו-האריזה); verification = אימות סריאלים נכנסים מספק חיצוני מול הודעת-ה-EPCIS שלו ומול ה-OER." },
            { qHe: "מדוע סורקים ברמת-SSCC בקליטה?", aHe: "כי ה-aggregation שנשמר ב-ATTP מאפשר שסריקת-SSCC אחת תאמת/תקלוט את כל הסריאלים שבתוך הארגז — מהיר ואמין יותר מסריקת-פריט-פריט." },
          ],
          takeawaysHe: [
            "Inbound: commissioning למוצר-בית, verification למוצר-ספק.",
            "EPCIS inbound message הוא מקור-האמת לאימות סריאלים external.",
            "שמירת קשר HU↔SSCC ב-putaway מונעת שבירת-aggregation.",
            "exception handling חוסם קליטת מלאי-סדרתי לא-תקין.",
          ],
          relatedHe: [
            { labelHe: "EWM · תהליך-יציאה (10.2.2)", href: "/library/wm/chapter-10/#sub-10.2.2" },
            { labelHe: "אובייקט · /SCWM/HU", href: "/library/wm/object/SCWM_HU/" },
          ],
        },
        {
          id: "10.2.2",
          titleHe: "תהליך יציאה (Outbound Process)",
          titleEn: "Outbound Process",
          execHe:
            "בתהליך-היציאה (outbound) EWM מלקט, אורז ומשלח מלאי-סדרתי, ומזין ל-ATTP את אירועי-ה-shipping. הליקוט מבטיח שהסריאלים שיצאו תואמים את ה-aggregation; האריזה יוצרת/מעדכנת SSCC; ובמשלוח (Goods Issue) מופק shipping ObjectEvent + TransactionEvent (העברת-בעלות). ATTP מפיק הודעת-EPCIS ללקוח ולרשות. כך כל יחידה שיצאה מתועדת ומדווחת אוטומטית.",
          beginnerHe:
            "כשמשלוח יוצא, צריך לדעת בדיוק אילו מספרים-סדרתיים עזבו ולאן. EWM מלקט את הסחורה, אורז אותה (ובונה/מעדכן SSCC לארגזים), וברגע ה'שילוח' מסמן ב-ATTP: 'הסריאלים האלה עברו ללקוח'. ATTP אז שולח 'הודעת-מסע' (EPCIS) ללקוח (כדי שהוא יוכל לקלוט) ולרשות-הבריאות (לציות-רגולטורי).",
          consultantHe:
            "זרימת-outbound: (1) S/4HANA Outbound Delivery (LIKP/LIPS); (2) EWM Warehouse Order/Task ליקוט (/SCWM/TODLV_TO_CONF) עם serial capture; (3) packing (/SCWM/PACK) — יצירת/עדכון HU↔SSCC ומיתאם aggregation; (4) Goods Issue → shipping ObjectEvent (bizStep=shipping, disposition=in_transit) + TransactionEvent (possession/ownership) ב-OER; (5) ATTP מפיק EPCIS-XML ושולח ל-trading partner ולרשות (DSCSA/EU). disaggregation מתבצע אם פותחים case לליקוט-חלקי. ב-decentralized/3rd-party logistics — דרך EPCIS/PI. ה-Goods Issue הוא ה-trigger הקריטי לסטטוס 'shipped'.",
          purposeHe:
            "המטרה: להבטיח שכל יחידה היוצאת מדווחת לרשות וללקוח בתקן EPCIS, שה-aggregation במשלוח משקף את המציאות, ושהעברת-הבעלות מתועדת — בסיס ל-recall, ל-anti-counterfeiting ולקליטה-תקינה אצל הלקוח.",
          processExampleHe:
            "הזמנת-לקוח ל-30 ארגזים. S/4HANA יוצר Outbound Delivery; EWM מלקט (סורק SSCC), אורז על משטח (יוצר SSCC-משטח עם AggregationEvent), ומבצע Goods Issue — ATTP רושם shipping ObjectEvent לכל הסריאלים + TransactionEvent (העברה ללקוח) ומפיק EPCIS-XML. אם ארגז נפתח לליקוט-חלקי (15 קופסאות בלבד) — מתבצע disaggregation וה-15 הנותרות חוזרות למלאי כיחידות-בודדות.",
          scenarioHe:
            "בארגון המקביל: ליקוט/אריזה/Goods Issue של משטחי-משקאות עם HU/SSCC לצורך מעקב-אצווה ו-recall; ה'shipping event' הוא רישום-תנועת-המלאי ותעודת-המשלוח. אין EPCIS-XML לרשות, אך תיעוד aggregation (בקבוק→ארגז→משטח) ביציאה מאפשר track-and-trace אנלוגי.",
          navHe: [
            "SPRO ► SCM EWM ► EWM ► Goods Issue Process ► Outbound Delivery ► Serialization & Packing Settings",
            "SPRO ► SCM EWM ► EWM ► Cross-Process Settings ► Serial Numbers ► Assign Serial Profile to Outbound WPT",
            "SPRO ► ATTP ► Outbound ► Configure Shipping Event & Regulatory Reporting",
          ],
          tables: ["/SCWM/PRDO", "/SCWM/HU", "/SCWM/ORDIM_O", "/STTPEC/EVENT", "LIPS"],
          tcodes: ["/SCWM/PRDO", "/SCWM/TODLV_TO_CONF", "/SCWM/PACK", "/STTPEC/UITRACK", "SXMB_MONI"],
          fiori: ["F-EWM-Pick", "F-ATTP-Report"],
          configHe: [
            "Outbound Serial Profile: serial capture בליקוט וב-Goods Issue ורמת-האריזה הנדרשת.",
            "Packing/Aggregation settings: יצירת/עדכון HU↔SSCC, ו-disaggregation לליקוט-חלקי.",
            "Shipping Event (ATTP): מיפוי Goods Issue ל-shipping ObjectEvent + TransactionEvent.",
            "Regulatory Reporting endpoint: יעד הודעת-ה-EPCIS-XML (trading partner / רשות) לפי שוק.",
          ],
          flow: [
            { he: "S/4HANA: Outbound Delivery", code: "LIKP/LIPS" },
            { he: "ליקוט + serial capture", code: "/SCWM/TODLV_TO_CONF" },
            { he: "Packing (HU↔SSCC)", code: "/SCWM/PACK", note: "aggregation/disaggregation" },
            { he: "Goods Issue", code: "GI", note: "trigger shipping" },
            { he: "Shipping + TransactionEvent", code: "/STTPEC/EVENT", note: "העברת-בעלות" },
            { he: "דיווח EPCIS-XML", code: "EPCIS", note: "ללקוח + רשות" },
          ],
          masterDataHe: [
            "Outbound Delivery (S/4: LIKP/LIPS) + Trading Partner = הקשר ל-TransactionEvent.",
            "Serial Number Profile (outbound) = רלוונטיות-serialization בליקוט/GI.",
            "HU/SSCC = יחידת-ה-aggregation המשולחת; disaggregation בליקוט-חלקי.",
            "Regulatory Reporting Profile + endpoint = יעד הודעת-ה-EPCIS.",
          ],
          mistakesHe: [
            "Goods Issue ללא shipping event — סריאל יצא פיזית אך נשאר 'במלאי' ב-ATTP.",
            "ליקוט-חלקי בלי disaggregation — aggregation שגוי; SSCC 'מכיל' פריטים שכבר אינם בו.",
            "endpoint דיווח שגוי — הודעת-EPCIS לא מגיעה לרשות/ללקוח.",
            "TransactionEvent חסר — אין תיעוד-העברת-בעלות; הלקוח לא יכול לקלוט.",
          ],
          troubleshootHe: [
            "GI לא מפיק shipping event ➔ Outbound Serial Profile/Shipping Event mapping חסר.",
            "הלקוח לא מצליח לקלוט ➔ EPCIS-XML פסול או TransactionEvent חסר (בדוק SXMB_MONI).",
            "aggregation שגוי אחרי ליקוט-חלקי ➔ לא בוצע disaggregation ב-/SCWM/PACK.",
            "דיווח-רגולטורי לא נשלח ➔ endpoint/Reporting Profile שגוי לאותו שוק.",
          ],
          bestPracticeHe: [
            "ודא ש-Goods Issue הוא ה-trigger היחיד ל-shipping; אל תפיק ידנית.",
            "בצע disaggregation אוטומטי בכל פתיחת-case לליקוט-חלקי.",
            "אמת EPCIS-XML מול schema לפני שליחה ובדוק קבלה אצל הלקוח/רשות.",
            "נטר את ה-endpoints והקם התראות על כשל-דיווח רגולטורי.",
          ],
          interviewHe: [
            { qHe: "מהו ה-trigger ל-shipping event ב-ATTP?", aHe: "ה-Goods Issue ב-EWM; ברגע ה-GI נרשם shipping ObjectEvent (bizStep=shipping) + TransactionEvent (העברת-בעלות), וATTP מפיק את הודעת-ה-EPCIS ללקוח ולרשות." },
            { qHe: "מתי נדרש disaggregation בתהליך-היציאה?", aHe: "כשפותחים case/pallet לליקוט-חלקי — חלק מהסריאלים יוצאים וחלק נשארים. disaggregation מעדכן את ה-aggregation כך ש-ATTP ידע שה-SSCC כבר אינו מכיל את הפריטים שיצאו." },
            { qHe: "מה כולל TransactionEvent ולמה הוא חשוב?", aHe: "TransactionEvent מתעד העברת-בעלות/חזקה (מהמחסן ללקוח) וקושר את הסריאלים ל-business transaction (delivery/order). הוא חיוני לציות DSCSA/EU וכדי שהלקוח יוכל לאמת ולקלוט את המשלוח." },
          ],
          takeawaysHe: [
            "Outbound: ליקוט→packing(SSCC)→Goods Issue→shipping+TransactionEvent.",
            "Goods Issue הוא ה-trigger לסטטוס 'shipped' ולדיווח-EPCIS.",
            "disaggregation מחויב בכל ליקוט-חלקי כדי לשמור aggregation תקין.",
            "TransactionEvent מתעד העברת-בעלות — בסיס לציות ולקליטה אצל הלקוח.",
          ],
          relatedHe: [
            { labelHe: "EWM · תהליך-כניסה (10.2.1)", href: "/library/wm/chapter-10/#sub-10.2.1" },
            { labelHe: "EWM · סקירת ATTP (10.1)", href: "/library/wm/chapter-10/#sub-10.1" },
            { labelHe: "אובייקט · /STTPEC/EVENT", href: "/library/wm/object/STTPEC_EVENT/" },
          ],
        },
      ],
    },
    // ============================================================ 10.3
    {
      id: "10.3",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "SAP Advanced Track and Trace for Pharmaceuticals (ATTP) הוא ה-system of record לזהות-סדרתית ולציות-רגולטורי בתעשיית-התרופות; SAP EWM ו-SAP S/4HANA הם שכבת-הביצוע הפיזית שמזינה אותו. השילוב הופך כל תנועה-במחסן לאירוע-EPCIS מתועד: commissioning/verification בכניסה, aggregation באריזה, ו-shipping+TransactionEvent ביציאה — והדיווח-הרגולטורי נגזר אוטומטית מהפעילות הפיזית.",
      beginnerHe:
        "סיכמנו את הסיפור: ATTP נותן 'תעודת-זהות' לכל קופסת-תרופה (serialization), זוכר מה-בתוך-מה (aggregation), ומתעד כל אירוע במסע (EPCIS). EWM הוא הזרוע הפיזית שמזיזה את הסחורה ו'מספרת' ל-ATTP מה קרה בכל שלב — קליטה, אריזה ומשלוח — כך שהציות-הרגולטורי קורה כמעט מעצמו.",
      consultantHe:
        "מבחינה ארכיטקטונית: ATTP (OER + Number Ranges + Trade Item/Packaging + Regulatory Reporting) ניזון מ-EWM דרך Serial Number Profiles, HU↔SSCC mapping ו-EPCIS event mapping, על-גבי ערוץ qRFC/IDoc (Embedded) או EPCIS-XML/PI (Decentralized). נקודות-הביקורת לפני go-live: שלמות Number Ranges, נכונות Packaging Hierarchy, מיפוי כל WPT ל-EPCIS event, וסבב end-to-end inbound+outbound כולל דיווח-רגולטורי ו-reconciliation מול ה-OER.",
      purposeHe:
        "לקבע את התמונה-הכוללת: כיצד serialization, aggregation ו-EPCIS מתחברים לתהליכי-מחסן אמיתיים, ומה נדרש כדי שהמערכת המשולבת תספק ציות, אמינות ומעקב מקצה-לקצה.",
      processExampleHe:
        "מקצה-לקצה: ספק שולח EPCIS→EWM קולט ומאמת (inbound)→המוצר נשמר עם HU↔SSCC→הזמנת-לקוח מובילה לליקוט+packing+Goods Issue (outbound)→ATTP מפיק shipping+TransactionEvent ומדווח לרשות וללקוח. כל סריאל מתועד מהכניסה ועד היציאה ללא הזנה-כפולה.",
      scenarioHe:
        "בארגון: ATTP ממוקד-תרופות ואינו בשימוש; אך אותם עקרונות — זהות-ייחודית, aggregation (בקבוק→ארגז→משטח) ותיעוד-אירועים — מיושמים אנלוגית דרך Batch management + HU/SSCC ב-EWM, ומספקים beverage batch traceability ל-recall ולמעקב.",
      navHe: [
        "SPRO ► SAP Advanced Track and Trace for Pharmaceuticals ► (סקירת כלל-ההגדרות)",
        "SPRO ► SCM EWM ► EWM ► Cross-Process Settings ► Serial Numbers (סקירת-אינטגרציה)",
      ],
      tables: ["/STTPEC/EVENT", "/SCWM/HU", "LIKP", "LIPS"],
      tcodes: ["/STTPEC/UITRACK", "/SCWM/MON", "SXMB_MONI"],
      fiori: ["F-ATTP-Track", "F-EWM-Pack"],
      configHe: [
        "רשימת-תיוג go-live: Number Ranges שלמים, Trade Item/Packaging Hierarchy נכונים, Serial Profiles משויכים לכל WPT.",
        "מיפוי EPCIS event לכל פעולת-EWM (GR/Pack/GI) מאומת מקצה-לקצה.",
        "Regulatory Reporting Profiles + endpoints מוגדרים ונבדקו לכל שוק.",
        "ניטור ערוץ-תקשורת (qRFC/PI) + reconciliation תקופתי מול ה-OER.",
      ],
      flow: [
        { he: "Inbound (verify/commission)", code: "10.2.1" },
        { he: "אחסון (HU↔SSCC)", code: "/SCWM/HU" },
        { he: "Outbound (pick/pack/GI)", code: "10.2.2" },
        { he: "shipping + TransactionEvent", code: "/STTPEC/EVENT" },
        { he: "דיווח רגולטורי", code: "EPCIS-XML" },
      ],
      masterDataHe: [
        "ATTP: Trade Item, Packaging Hierarchy, Number Ranges, OER.",
        "EWM: Serial Number Profile, Handling Unit (↔SSCC).",
        "S/4HANA: Delivery (LIKP/LIPS), Batch, Business Partner.",
      ],
      mistakesHe: [
        "התייחסות ל-ATTP כמודול-EWM ולא כ-system of record נפרד — כפילות ניהול-סריאלים.",
        "דילוג על סבב end-to-end לפני go-live — כשלי-דיווח מתגלים בייצור.",
        "אי-ניטור ערוץ-התקשורת — אובדן-הודעות שקט בין EWM ל-ATTP.",
      ],
      troubleshootHe: [
        "פערים בין מלאי-EWM למלאי-ATTP ➔ הרץ reconciliation מול ה-OER ובדוק תור-הודעות (SMQ1/SXMB_MONI).",
        "דיווח-רגולטורי כושל ➔ endpoint/Reporting Profile שגוי או EPCIS-XML פסול.",
        "אירוע חסר ➔ WPT לא ממופה ל-EPCIS event.",
      ],
      bestPracticeHe: [
        "החזק את ATTP כ-system of record יחיד לזהות-סדרתית.",
        "מפה כל פעולת-EWM ל-EPCIS event מפורש ובדוק מקצה-לקצה לפני go-live.",
        "נטר תקשורת ובצע reconciliation תקופתי מול ה-OER.",
        "תאם GS1 ו-EPCIS עם הספקים, הלקוחות והרשויות מראש.",
      ],
      interviewHe: [
        { qHe: "מהם שלושת המושגים שעליהם נשען ATTP?", aHe: "serialization (זהות-ייחודית ברמת-פריט — SGTIN), aggregation (היררכיית-אריזה — SSCC), ו-EPCIS (תיעוד-אירועי-שרשרת בתקן GS1). EWM מזין את שלושתם דרך תנועות-המחסן." },
        { qHe: "מה התפקיד-היחסי של ATTP מול EWM/S4?", aHe: "ATTP = system of record לזהות ולדיווח-רגולטורי; EWM = ביצוע פיזי שמזין אירועים; S/4HANA = הקשר-עסקי (הזמנות/מסירות/אצוות). יחד הם מספקים ציות ומעקב מקצה-לקצה ללא הזנה-כפולה." },
      ],
      takeawaysHe: [
        "ATTP = system of record ל-serialization, aggregation ו-EPCIS; EWM/S4 = ביצוע פיזי.",
        "Inbound→commissioning/verification, Pack→aggregation, GI→shipping+TransactionEvent.",
        "Serial Profile + HU↔SSCC + EPCIS event mapping הם חוטי-האינטגרציה.",
        "go-live דורש Number Ranges שלמים, מיפוי-אירועים מלא וסבב end-to-end עם reconciliation.",
      ],
      relatedHe: [
        { labelHe: "EWM · סקירת ATTP (10.1)", href: "/library/wm/chapter-10/#sub-10.1" },
        { labelHe: "EWM · שילוב עם EWM ו-S/4HANA (10.2)", href: "/library/wm/chapter-10/#sub-10.2" },
        { labelHe: "EWM · תהליך-יציאה (10.2.2)", href: "/library/wm/chapter-10/#sub-10.2.2" },
      ],
    },
  ],
};
