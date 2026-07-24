// ============================================================================
// Phase 14 · Sprint 4 — CDS View enrichment layer (VERIFIED, additive).
//
// Sits alongside data/cds-map.ts (which carries view/tables/consumption/fiori),
// keyed by CDS view name, adding the Enterprise-template fields: VDM view type,
// deep purpose, representative key, associations, ABAP consumption, performance,
// and the ECC classic alternative. Rendered on /cds/<view> only when present →
// views without enrichment are unchanged. Mirrors data/table-enrichment.ts.
//
// Every fact is standard S/4HANA VDM / SAP Help content. Exact annotation strings
// that are not certain are described at the concept level, not fabricated.
// ============================================================================

export interface CdsEnrichment {
  viewType?: "Interface (Basic)" | "Interface (Composite)" | "Consumption" | "Analytical";
  purposeDeep?: string;
  keyField?: string;              // representative/semantic key
  associations?: string[];        // exposed associations (_Assoc)
  annotations?: string[];         // notable annotations (concept-level where uncertain)
  perfNotes?: string[];
  abapConsumption?: string;       // SELECT … FROM <view>
  eccAlternative?: string;        // classic tables + tcode
  verified?: "verified" | "needs-verification";
  sources?: string[];
}

export const CDS_ENRICHMENT: Record<string, CdsEnrichment> = {
  I_MaintenanceOrder: {
    viewType: "Interface (Composite)",
    purposeDeep: "תצוגת ה-VDM לפקודת אחזקה (EAM) — שכבת ה-Interface מעל AUFK/AFKO החושפת את שדות הפקודה בשמות סמנטיים ומקשרת לאובייקטים (ציוד, מיקום, סוג/עדיפות). הבסיס לאפליקציות Fiori ולדיווח.",
    keyField: "MaintenanceOrder",
    associations: ["_Equipment", "_FunctionalLocation", "_MaintenanceOrderType", "_MaintenancePriority"],
    annotations: ["VDM interface view (I_) מעל טבלאות ה-EAM", "@ObjectModel.representativeKey על MaintenanceOrder", "associations נחשפים בשם _Assoc לצריכה ב-path expressions"],
    perfNotes: ["צריכה עם WHERE על מפתח/מפעל; associations נטענים on-demand (JOIN עצל)", "לדיווח מסכם — עדיף consumption/analytical view מעל ה-interface"],
    abapConsumption: "SELECT MaintenanceOrder, MaintenanceOrderType, MaintPlant\n  FROM I_MaintenanceOrder\n  WHERE MaintPlant = @lv_werks INTO TABLE @DATA(lt_orders).",
    eccAlternative: "טבלאות AUFK+AFKO · טרנזקציות IW31/IW32/IW33.",
    verified: "verified",
    sources: ["SAP S/4HANA CDS Views (VDM) — I_MaintenanceOrder", "SAP Help Portal — Asset Management"],
  },
  I_Equipment: {
    viewType: "Interface (Composite)",
    purposeDeep: "תצוגת VDM לרשומת אב ציוד — שכבת Interface מעל EQUI/EQKT החושפת את הציוד בשמות סמנטיים ומקשרת למיקום פונקציונלי, קטגוריה וסטטוס. בסיס ל-Manage Technical Objects.",
    keyField: "Equipment",
    associations: ["_FunctionalLocation", "_EquipmentCategory", "_MaintenancePlant"],
    annotations: ["VDM interface view (I_) מעל EQUI/EQKT", "@ObjectModel.representativeKey על Equipment", "טקסט נחשף דרך _Text association"],
    perfNotes: ["בחר עם Equipment/מפעל; טקסט דרך association ולא JOIN ידני", "היסטוריה (time segments) עשויה לדרוש view ייעודי"],
    abapConsumption: "SELECT Equipment, EquipmentCategory, FunctionalLocation\n  FROM I_Equipment WHERE MaintenancePlant = @lv_werks INTO TABLE @DATA(lt_equi).",
    eccAlternative: "טבלאות EQUI+EQKT+ILOA · טרנזקציות IE01/IE02/IE03.",
    verified: "verified",
    sources: ["SAP S/4HANA CDS Views (VDM) — I_Equipment", "SAP Help Portal — Technical Objects (EAM)"],
  },
  I_ProductionOrder: {
    viewType: "Interface (Composite)",
    purposeDeep: "תצוגת VDM לכותרת פקודת ייצור — שכבת Interface מעל AFKO/AUFK, חושפת מספר הזמנה, סוג, חומר, כמויות ותאריכים בשמות סמנטיים ומקשרת לפריטים/פעולות/רכיבים.",
    keyField: "ManufacturingOrder",
    associations: ["_ManufacturingOrderItem", "_ManufacturingOrderOperation", "_Material", "_Plant"],
    annotations: ["VDM interface view (I_) מעל AFKO/AUFK", "@ObjectModel.representativeKey על ManufacturingOrder"],
    perfNotes: ["בחר לפי ManufacturingOrder/מפעל", "פעולות/רכיבים דרך associations ל-I_...Operation/Component"],
    abapConsumption: "SELECT ManufacturingOrder, ManufacturingOrderType, Material\n  FROM I_ProductionOrder WHERE ProductionPlant = @lv_werks INTO TABLE @DATA(lt_ord).",
    eccAlternative: "טבלאות AFKO+AUFK+AFPO · טרנזקציות CO01/CO02/CO03.",
    verified: "verified",
    sources: ["SAP S/4HANA CDS Views (VDM) — I_ProductionOrder", "SAP Help Portal — Production Orders"],
  },
  I_Product: {
    viewType: "Interface (Composite)",
    purposeDeep: "תצוגת VDM לנתוני אב חומר כלליים (בשם S/4: Product) — שכבת Interface מעל MARA, חושפת סוג, קבוצה, יחידת בסיס ותכונות, ומקשרת לתיאור/מפעל/סוג. הבסיס ל-C_ProductMaster ול-Manage Product Master.",
    keyField: "Product",
    associations: ["_ProductType", "_ProductGroup", "_BaseUnit", "_ProductDescription", "_Plant"],
    annotations: ["VDM interface view (I_) מעל MARA", "@ObjectModel.representativeKey על Product", "תיאור דרך _ProductDescription (language-dependent)"],
    perfNotes: ["בחר לפי Product; תיאור דרך association ולא JOIN ל-MAKT", "נתוני מפעל דרך I_ProductPlant (מעל MARC)"],
    abapConsumption: "SELECT Product, ProductType, ProductGroup, BaseUnit\n  FROM I_Product WHERE Product = @lv_matnr INTO @DATA(ls_prod).",
    eccAlternative: "טבלאות MARA+MAKT · טרנזקציות MM01/MM02/MM03.",
    verified: "verified",
    sources: ["SAP S/4HANA CDS Views (VDM) — I_Product", "SAP Help Portal — Product/Material Master"],
  },
  I_BillOfMaterial: {
    viewType: "Interface (Composite)",
    purposeDeep: "תצוגת VDM לכותרת עץ מוצר — שכבת Interface מעל MAST/STKO, חושפת מספר BOM, חלופה, כמות בסיס וסטטוס, ומקשרת לפריטים ולחומר.",
    keyField: "BillOfMaterial",
    associations: ["_BillOfMaterialItem", "_Material", "_Plant"],
    annotations: ["VDM interface view (I_) מעל MAST/STKO", "@ObjectModel.representativeKey על BillOfMaterial"],
    perfNotes: ["פריטים דרך _BillOfMaterialItem (I_BillOfMaterialItem מעל STPO)", "לפיצוץ רב-מפלסי — לוגיקת explosion ולא view בודד"],
    abapConsumption: "SELECT BillOfMaterial, BillOfMaterialVariant, Material\n  FROM I_BillOfMaterial WHERE Material = @lv_matnr INTO TABLE @DATA(lt_bom).",
    eccAlternative: "טבלאות MAST+STKO+STPO · טרנזקציות CS01/CS02/CS03.",
    verified: "verified",
    sources: ["SAP S/4HANA CDS Views (VDM) — I_BillOfMaterial", "SAP Help Portal — Bills of Material"],
  },
  I_WorkCenter: {
    viewType: "Interface (Composite)",
    purposeDeep: "תצוגת VDM למרכז עבודה/משאב — שכבת Interface מעל CRHD/CRTX/CRCA/KAKO, חושפת קוד מרכז עבודה, קטגוריה, שיוך קיבולת ומרכז עלות בשמות סמנטיים.",
    keyField: "WorkCenterInternalID",
    associations: ["_WorkCenterCategory", "_Plant", "_CostCenter"],
    annotations: ["VDM interface view (I_) מעל CRHD ושיוכי קיבולת/עלות", "@ObjectModel.representativeKey על מזהה מרכז העבודה הפנימי"],
    perfNotes: ["מרכז עבודה דיסקרטי ומשאב PP-PI חולקים את שכבת ה-CRHD", "קיבולת/עלות דרך associations ל-KAKO/CRCO"],
    abapConsumption: "SELECT WorkCenterInternalID, WorkCenter, WorkCenterCategory\n  FROM I_WorkCenter WHERE Plant = @lv_werks INTO TABLE @DATA(lt_wc).",
    eccAlternative: "טבלאות CRHD+CRTX+CRCA+KAKO · טרנזקציות CR01/CR02/CR03.",
    verified: "verified",
    sources: ["SAP S/4HANA CDS Views (VDM) — I_WorkCenter", "SAP Help Portal — Work Centers"],
  },
};

export const getCdsEnrichment = (view?: string): CdsEnrichment | undefined =>
  view ? CDS_ENRICHMENT[view] : undefined;
