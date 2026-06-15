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
];

export const conceptBySlug = (s: string) => CONCEPTS.find((c) => c.slug === s);
export const listConcepts = () => CONCEPTS.map((c) => ({ slug: c.slug, title: c.title, he: c.he, group: c.group }));
