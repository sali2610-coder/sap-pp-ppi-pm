/* ============================================================================
   PROJECT NEO · IS THIS FIELD A KEY?
   ----------------------------------------------------------------------------
   THE KEY COLUMN HAS FOUR VALUES, NOT THREE.

     The blueprints write `PK`, `FK`, `-` … and `PK/FK`, which 83 fields carry.
     That fourth value is not a hedge. In SAP it is the normal shape of a text
     or dependent table: EQKT.EQUNR is the primary key of EQKT *and* a foreign
     key into EQUI; MAST.MATNR is both; IFLOS.TPLNR is both.

     Comparing that column with `=== "PK"` silently drops the field from BOTH
     lists it belongs to. components/neo-shell/data/tables-data already used
     `includes`, so the tables directory counted those 83 fields as keys while
     the object page did not — the same field was a key on one screen and not on
     the other.

   WHY THIS IS ITS OWN FILE AND NOT A HELPER IN erd/model.

     object-fields.tsx is a CLIENT component. erd/model.ts imports dagre and
     evaluates the entire PM + PP-PI dataset at module scope, so importing the
     predicate from there would pull the whole SAP knowledge base into the
     browser bundle. This module has no imports at all, which is what makes it
     safe for both sides of the boundary to share.
   ========================================================================== */

/** true when the blueprint marks the field as a primary key — including the
 *  compound `PK/FK`. */
export const isPkKey = (f: { key: string }) => /\bPK\b/i.test(f.key || "");

/** true when the blueprint marks the field as a foreign key — including the
 *  compound `PK/FK`. */
export const isFkKey = (f: { key: string }) => /\bFK\b/i.test(f.key || "");
