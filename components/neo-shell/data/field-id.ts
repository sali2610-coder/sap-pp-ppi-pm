/** The anchor of a field row, #field-AUFNR: the same id on the table page
 *  (tables-detail-view.tsx) and the object page (object/object-fields.tsx), so
 *  a search result for a field can open either page at the field (gate 6,
 *  minor 27). Import-free, so a client component can share it. */
export const fieldId = (tech: string) => `field-${tech.replace(/\s+/g, "_")}`;
