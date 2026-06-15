// SAP Concepts Center — authored educational reference (business + technical +
// ECC + S/4 + examples + related). Hand-written SAP knowledge, not generated.

export interface Concept {
  slug: string;
  title: string;     // EN term
  he: string;        // Hebrew name
  group: "Data" | "Code" | "Enhancement" | "PM/PP";
  biz: string;       // business explanation
  tech: string;      // technical explanation
  ecc: string;
  s4: string;
  examples: string[];
  related: string[]; // entity names / concept slugs
}

export const CONCEPTS: Concept[] = [
  { slug: "object", title: "Object", he: "אובייקט", group: "Data",
    biz: "ישות עסקית במערכת — חומר, ציוד, פקודה. מייצג דבר אמיתי שהארגון מנהל.", tech: "ב-SAP אובייקט נשמר בטבלאות, נגזר ממבני מילון ומנוהל דרך טרנזקציות/APIs.",
    ecc: "מנוהל ב-GUI + טבלאות שקופות.", s4: "אותו מודל; נחשף גם דרך CDS Views ו-Fiori.", examples: ["EQUI (ציוד)", "AFKO (פק\"ע)", "MARA (חומר)"], related: ["table", "data-element", "cds-view"] },
  { slug: "table", title: "Table", he: "טבלה", group: "Data",
    biz: "מבנה הנתונים שמאחסן רשומות עסקיות — שורות ועמודות.", tech: "טבלה שקופה (Transparent) במילון ABAP; שדות נשענים על Data Elements; מפתח ראשי ייחודי; אינדקסים.",
    ecc: "טבלאות שקופות + Pool/Cluster.", s4: "טבלאות שקופות; חלקן הוחלפו ב-CDS/MATDOC; פישוט מבנים (ACDOCA).", examples: ["MARA", "EQUI", "AFKO"], related: ["structure", "data-element", "domain"] },
  { slug: "structure", title: "Structure", he: "מבנה (Structure)", group: "Data",
    biz: "תבנית שדות ללא אחסון — להעברת נתונים בין תוכניות.", tech: "מבנה מילון ללא רשומות; משמש בפרמטרים, work areas, ו-deep structures.", ecc: "נפוץ ב-FMs/BAPIs.", s4: "ללא שינוי מהותי.", examples: ["BAPIRET2", "BAPI_TE_*"], related: ["table", "data-element"] },
  { slug: "domain", title: "Domain", he: "דומיין", group: "Data",
    biz: "מגדיר את הערכים המותרים והטווח הטכני של שדה.", tech: "אובייקט מילון: סוג נתונים, אורך, ערכים קבועים (Fixed Values), בדיקת ערך.", ecc: "ללא שינוי.", s4: "ללא שינוי מהותי.", examples: ["MATNR (אורך 18→40 ב-S/4)", "MEINS"], related: ["data-element", "table"] },
  { slug: "data-element", title: "Data Element", he: "אלמנט נתונים", group: "Data",
    biz: "מגדיר את המשמעות העסקית של שדה — תווית, טקסט עזרה, תיעוד.", tech: "מקשר שדה לדומיין; נושא Labels ו-F1 Help; בסיס לעקביות סמנטית.", ecc: "ללא שינוי.", s4: "ללא שינוי מהותי; הרחבת MATNR משפיעה על data elements תלויים.", examples: ["MATNR", "AUFNR", "EQUNR"], related: ["domain", "table"] },
  { slug: "function-module", title: "Function Module", he: "מודול פונקציה (FM)", group: "Code",
    biz: "יחידת קוד עם ממשק להפעלה חוזרת — לוגיקה עסקית/קריאות.", tech: "ב-Function Group; פרמטרים Import/Export/Changing/Tables/Exceptions; חלקם RFC-enabled.", ecc: "ליבת הלוגיקה הקלאסית.", s4: "קיים; לתרחישים חדשים מועדף OData/RAP על RFC.", examples: ["STATUS_READ", "CS_BOM_EXPL_MAT_RC1", "BAPI_*"], related: ["bapi", "class", "object"] },
  { slug: "bapi", title: "BAPI", he: "BAPI", group: "Code",
    biz: "ממשק תכנותי תקני (Business API) לאובייקט עסקי — יצירה/שינוי/קריאה.", tech: "FM RFC-enabled, רשום ב-BAPI Explorer (BAPI Wizard), מחזיר BAPIRET2; דורש BAPI_TRANSACTION_COMMIT.", ecc: "ממשק האינטגרציה המרכזי.", s4: "קיים; חלופה מודרנית: OData APIs (API_*) + Fiori.", examples: ["BAPI_PROCORD_CREATE", "BAPI_EQUI_CREATE", "BAPI_MATERIAL_SAVEDATA"], related: ["function-module", "idoc", "cds-view"] },
  { slug: "idoc", title: "IDoc", he: "IDoc", group: "Code",
    biz: "מבנה הודעה תקני להעברת נתונים בין מערכות (ALE/EDI).", tech: "Basic Type + סגמנטים + Control/Data/Status records; Partner Profile (WE20), Port; סטטוסים (03/53/51).", ecc: "ALE/EDI סטנדרטי.", s4: "קיים; לתרחישים חדשים מועדפים Events/OData.", examples: ["MATMAS (אב חומר)", "LOIPRO (מתכון/מסלול)", "ORDERS"], related: ["bapi", "function-module"] },
  { slug: "cds-view", title: "CDS View", he: "תצוגת CDS", group: "Data",
    biz: "מודל נתונים וירטואלי — שכבת הקריאה והאנליטיקה של S/4HANA.", tech: "Core Data Services: הגדרה ב-DDL, push-down ל-HANA, annotations (UI/OData/Analytics); בסיס ל-Fiori ו-Embedded Analytics.", ecc: "כמעט לא קיים (Open SQL/Views קלאסיים).", s4: "טכנולוגיית הליבה — מחליפה גישה ישירה לטבלאות בקריאה.", examples: ["I_Product", "I_ProductionOrder", "I_Equipment"], related: ["table", "bapi", "object"] },
  { slug: "class", title: "Class", he: "מחלקה (ABAP OO)", group: "Code",
    biz: "יחידת לוגיקה מונחית-עצמים — מתודות + נתונים מוכמסים.", tech: "ABAP Objects: מתודות/אטריביוטים/events; Local/Global (SE24); בסיס ל-RAP/BOPF.", ecc: "קיים לצד קוד פרוצדורלי.", s4: "מועדף — RAP מבוסס מחלקות וה-Clean Core.", examples: ["CL_GUI_ALV_GRID", "מחלקות BOPF/RAP"], related: ["interface", "function-module"] },
  { slug: "interface", title: "Interface", he: "ממשק (ABAP OO)", group: "Code",
    biz: "חוזה מתודות שמחלקות מממשות — הפרדה בין הגדרה למימוש.", tech: "IF_* ב-ABAP OO; משמש להזרקת תלות, BAdIs, וארכיטקטורה נקייה.", ecc: "קיים.", s4: "מרכזי ב-RAP/Clean Core.", examples: ["IF_BADI_INTERFACE", "IF_OO_ADT_*"], related: ["class", "badi"] },
  { slug: "enhancement", title: "Enhancement", he: "הרחבה (Enhancement)", group: "Enhancement",
    biz: "התאמת SAP סטנדרטי ללא שינוי קוד הליבה — שמירה על שדרוגיות.", tech: "Enhancement Framework: Implicit/Explicit, BAdI, Customer/User Exits.", ecc: "CMOD/SMOD + Enhancement Framework.", s4: "מודגש 'Clean Core' — העדף BAdI/Extension Points על שינוי ליבה.", examples: ["User Exit ב-PM order save", "BAdI ב-process order"], related: ["badi", "user-exit", "customer-exit"] },
  { slug: "user-exit", title: "User Exit", he: "User Exit", group: "Enhancement",
    biz: "נקודת הרחבה ותיקה — קוד לקוח בנקודות מוגדרות של SAP.", tech: "Subroutines (PERFORM) ב-includes (MV45AFZZ וכו'); נדרש Access Key; ישן.", ecc: "נפוץ (פק\"ע, הודעות).", s4: "נתמך אך לא מומלץ — העדף BAdI/Enhancement Spot.", examples: ["EXIT_SAPL*", "MV45AFZZ (SD)"], related: ["customer-exit", "badi", "enhancement"] },
  { slug: "customer-exit", title: "Customer Exit", he: "Customer Exit", group: "Enhancement",
    biz: "הרחבה מנוהלת דרך SMOD/CMOD — פונקציות/מסכים/תפריטים.", tech: "Function Exit (EXIT_*), Screen Exit, Menu Exit; מנוהל ב-CMOD (Project) על SMOD (Enhancement).", ecc: "סטנדרטי.", s4: "נתמך; מועדף BAdI.", examples: ["CMOD project", "EXIT_SAPMV45A_002"], related: ["user-exit", "badi"] },
  { slug: "badi", title: "BAdI", he: "BAdI", group: "Enhancement",
    biz: "נקודת הרחבה מונחית-עצמים — מספר מימושים, מבוססת ממשק.", tech: "SE18 (הגדרה) / SE19 (מימוש); Classic + New (Enhancement Spot); Filter/Multiple-use.", ecc: "Classic BAdI.", s4: "מועדף לכל הרחבה (Clean Core).", examples: ["WORKORDER_UPDATE (PM)", "BAdI ב-process order"], related: ["enhancement", "interface", "user-exit"] },
  { slug: "work-center", title: "Work Center", he: "מרכז עבודה", group: "PM/PP",
    biz: "היכן ומי מבצע עבודה — קיבולת, נוסחאות תזמון, שיוך עלות.", tech: "CRHD (כותרת), CRCA (קיבולת), CRCO (מרכז עלות); משמש במשימות/מתכונים/פקודות.", ecc: "IR01/CR01.", s4: "ללא שינוי מהותי; CDS I_WorkCenter.", examples: ["מרכז עבודה לאחזקה (PM)", "משאב ייצור"], related: ["resource", "object"] },
  { slug: "resource", title: "Resource", he: "משאב (Resource)", group: "PM/PP",
    biz: "מרכז עבודה בייצור תהליכי (PP-PI) — יחידת ייצור/קיבולת.", tech: "וריאנט של Work Center לתעשייה תהליכית (CRHD); משויך למתכון אב.", ecc: "CRC1.", s4: "ללא שינוי מהותי.", examples: ["משאב במתכון אב", "קו מילוי (CBC)"], related: ["work-center", "process-order"] },
  { slug: "equipment", title: "Equipment", he: "ציוד", group: "PM/PP",
    biz: "נכס בודד הניתן למעקב — מותקן, נושא היסטוריה ומדידות.", tech: "EQUI/EQKT/EQUZ; מותקן במיקום פונקציונלי (ILOA); מספר סידורי.", ecc: "IE01-IE03.", s4: "CDS I_Equipment + Fiori 'Manage Technical Objects'.", examples: ["משאבה", "מנוע"], related: ["functional-location", "object"] },
  { slug: "functional-location", title: "Functional Location", he: "מיקום פונקציונלי", group: "PM/PP",
    biz: "היכן מתבצעת אחזקה — מבנה היררכי של המפעל.", tech: "IFLOT/IFLOS/ILOA; מחוון מבנה קובע מזהה היררכי.", ecc: "IL01-IL03.", s4: "CDS I_FunctionalLocation + Fiori.", examples: ["קו ייצור", "תחנה"], related: ["equipment", "object"] },
  { slug: "production-order", title: "Production Order", he: "פקודת ייצור (בדיד)", group: "PM/PP",
    biz: "הוראת ייצור לתעשייה בדידה (Discrete) — כמות, מסלול, רכיבים.", tech: "AUFK/AFKO/AFPO/AFVC; מבוססת Routing; סטטוס CRTD→REL→CNF→TECO.", ecc: "CO01-CO03.", s4: "קיים; CDS I_ProductionOrder/I_ManufacturingOrder + Fiori.", examples: ["הרכבת מוצר"], related: ["process-order", "work-center"] },
  { slug: "process-order", title: "Process Order", he: "פקודת תהליך", group: "PM/PP",
    biz: "הוראת ייצור לתעשייה תהליכית (PP-PI) — מתכון, מרשם בקרה, אצוות.", tech: "AUFK/AFKO/AFPO; מבוססת מתכון אב; מרשם בקרה ל-MES; Batch.", ecc: "COR1-COR3.", s4: "קיים; OData API_PROCESSORDER_2 + Fiori.", examples: ["ייצור משקה (CBC)"], related: ["production-order", "resource", "process-order"] },
  { slug: "lock-object", title: "Lock Object", he: "אובייקט נעילה", group: "Code",
    biz: "מונע עדכון מקביל של אותה רשומה ע\"י שני משתמשים — שלמות נתונים.", tech: "אובייקט מילון (SE11, שם E*) מייצר ENQUEUE_/DEQUEUE_ FMs; נעילה לוגית ב-Enqueue Server.", ecc: "סטנדרטי.", s4: "ללא שינוי מהותי.", examples: ["EQEQUI (נעילת ציוד)", "EAUFK (נעילת פקודה)"], related: ["table", "function-module"] },
  { slug: "number-range", title: "Number Range", he: "טווח מספרים", group: "Data",
    biz: "מגדיר את הטווח והאופן שבו מוקצים מזהים לאובייקטים (פקודה/חומר/הודעה).", tech: "SNRO/SNUM; אינטרוולים + מצב נוכחי (NRIV); הקצאה פנימית/חיצונית.", ecc: "סטנדרטי.", s4: "ללא שינוי; שים לב להרחבת MATNR.", examples: ["טווח לפקודות אחזקה", "טווח לפק\"ע"], related: ["object", "table"] },
  { slug: "message-class", title: "Message Class", he: "מחלקת הודעות", group: "Code",
    biz: "אוסף הודעות המערכת (שגיאה/אזהרה/מידע) המוצגות למשתמש.", tech: "SE91; הודעות ממוספרות + placeholders; MESSAGE ... TYPE.", ecc: "סטנדרטי.", s4: "ללא שינוי.", examples: ["הודעת 'אין גרסת ייצור'", "הודעת חסימת חומר"], related: ["function-module"] },
  { slug: "search-help", title: "Search Help", he: "עזרת חיפוש (F4)", group: "Data",
    biz: "מנגנון ה-F4 לבחירת ערך תקין לשדה.", tech: "Elementary/Collective Search Help (SE11); Selection + Search method; Search Help Exit.", ecc: "סטנדרטי.", s4: "ללא שינוי; ב-Fiori Value Help דרך CDS annotations.", examples: ["F4 לחומר", "F4 למרכז עבודה"], related: ["data-element", "cds-view"] },
  { slug: "append-structure", title: "Append / Include", he: "Append / Include Structure", group: "Enhancement",
    biz: "הוספת שדות לטבלה/מבנה SAP ללא שינוי האובייקט המקורי — שמירת שדרוגיות.", tech: "Append Structure (בסוף טבלה) / .INCLUDE; בסיס להרחבת שדות (CI_ includes).", ecc: "סטנדרטי.", s4: "מודגש Clean Core — להרחיב דרך Append/Extension ולא לשנות סטנדרט.", examples: ["שדה Z בהזמנת אחזקה", "CI_COBL ב-FI"], related: ["table", "structure", "enhancement"] },
  { slug: "transport-request", title: "Transport Request", he: "בקשת העברה (Transport)", group: "Code",
    biz: "אורזת שינויי פיתוח/Customizing להעברה בין סביבות (DEV→QAS→PRD).", tech: "SE09/SE10; Workbench/Customizing request; Tasks; שחרור + יבוא (STMS).", ecc: "סטנדרטי.", s4: "ללא שינוי; ב-Cloud דרך CTS+/gCTS.", examples: ["העברת User Exit", "העברת הגדרת סוג פקודה"], related: ["package", "enhancement"] },
  { slug: "package", title: "Package", he: "חבילה (Package)", group: "Code",
    biz: "מארגנת אובייקטי פיתוח לוגית ושולטת בנראות/תלות ביניהם.", tech: "SE80/SE21; Development Class לשעבר; Package Interfaces; משויכת ל-Transport Layer.", ecc: "סטנדרטי.", s4: "ללא שינוי.", examples: ["חבילת פיתוחי PM", "חבילת ממשקי CBC"], related: ["transport-request", "class"] },
  { slug: "odata-service", title: "OData Service", he: "שירות OData", group: "Code",
    biz: "ממשק REST-י החושף נתונים/פעולות ל-Fiori ולמערכות חיצוניות.", tech: "SEGW/RAP; Entity Sets + CRUD-Q; נרשם ב-/IWFND/MAINT_SERVICE; מבוסס לרוב על CDS.", ecc: "Gateway אופציונלי.", s4: "מרכזי — בסיס Fiori + APIs (API_*).", examples: ["API_PRODUCTION_ORDER_2", "API_BUSINESS_PARTNER"], related: ["cds-view", "bapi"] },
  { slug: "rap", title: "RAP", he: "RAP (ABAP RESTful)", group: "Code",
    biz: "מודל הפיתוח המודרני של S/4 לבניית שירותי OData עסקיים (Clean Core).", tech: "Behavior Definition + Implementation על CDS; Managed/Unmanaged; Draft.", ecc: "לא קיים.", s4: "סטנדרט הפיתוח החדש — מחליף BOPF/פיתוח קלאסי לשירותים.", examples: ["שירות OData מותאם ב-S/4"], related: ["cds-view", "class", "odata-service"] },
  { slug: "classification", title: "Classification", he: "סיווג (Classification)", group: "PM/PP",
    biz: "תיאור אובייקטים (ציוד/חומר/אצווה) במאפיינים לחיפוש ובחירה.", tech: "CL02 (Class), CT04 (Characteristic), Class Type; טבלאות KSSK/AUSP/KLAH.", ecc: "סטנדרטי.", s4: "ללא שינוי; בסיס לקביעת אצווה ולמאפייני ציוד.", examples: ["מאפייני ציוד", "מאפייני אצווה (Batch)"], related: ["equipment", "domain"] },
  { slug: "variant-config", title: "Variant Configuration", he: "תצורת וריאנטים (VC)", group: "PM/PP",
    biz: "מאפשר הזמנת מוצר מתצורה (אפשרויות) במקום מק\"ט קשיח — מוצרים מורכבים.", tech: "Configurable Material + Class(300) + Characteristics + Dependencies; Super BOM/Routing.", ecc: "סטנדרטי (LO-VC).", s4: "קיים; Advanced VC (AVC) ב-S/4.", examples: ["מוצר ניתן-לתצורה בייצור"], related: ["classification", "production-order"] },
  { slug: "smartform", title: "SmartForm / Adobe Form", he: "טפסים (SmartForm/Adobe)", group: "Code",
    biz: "מייצר פלט מודפס/PDF — הזמנת עבודה, תעודה, אישור.", tech: "SMARTFORMS / SFP (Adobe); Form + Interface; קריאה מתוכנית הדפסה.", ecc: "SmartForms/SAPscript.", s4: "Adobe Forms + Output Management (BRF+) מועדפים.", examples: ["הדפסת הזמנת אחזקה", "תעודת אצווה"], related: ["function-module"] },
];

export const conceptBySlug = (s: string) => CONCEPTS.find((c) => c.slug === s);
export const listConcepts = () => CONCEPTS.map((c) => ({ slug: c.slug, title: c.title, he: c.he, group: c.group }));
