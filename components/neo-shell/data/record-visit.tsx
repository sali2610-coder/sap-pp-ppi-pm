"use client";

import { useEffect } from "react";
import { pushRecentObject } from "../store";

/** Opening a table's page records the table as recent, whichever way the reader
 *  arrived: the catalogue, a related-table link, the home's map or a typed URL.
 *  Only a search result, the context button and the module environments used
 *  to, so the home's "continue" offered a fraction of what was opened (gate 5,
 *  finding 9). The store is the rail shelf's own (store.ts). Renders nothing. */
export function RecordVisit({ name }: { name: string }) {
  useEffect(() => { pushRecentObject(name); }, [name]);
  return null;
}
