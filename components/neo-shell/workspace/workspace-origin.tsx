"use client";

/* ============================================================================
   PROJECT NEO · the workspace half of SMART RETURN.
   ----------------------------------------------------------------------------
   The workspace sends the reader to an object page from SEVEN places — the
   hero's entry point, the process chain, the working table's name, its relation
   list, its expanded "full object page" button, the S/4HANA callouts, the
   busiest-node list and the recent list. All of them leave the SAME view, and
   only ModuleWorkspace knows what that view currently is (the map tab, the
   selected topic, the query, the scroll offset).

   So the builder is published once, here, and every one of those links calls it
   at CLICK time with the table it is opening. Nothing else is drilled through
   eight component signatures, and no surface has to remember the shape of the
   record.
   ========================================================================== */

import { createContext, useContext } from "react";
import type { OriginArg } from "@/components/neo-shell/nav-context";

/** Build the origin for an object link leaving the workspace. Takes the SAP
 *  table name being opened, which is what the return uses to put the row the
 *  reader left back under the eye. */
export type WsOrigin = (name: string) => OriginArg;

const Ctx = createContext<WsOrigin | null>(null);

export const WorkspaceOriginProvider = Ctx.Provider;

/** The builder for the workspace this link is inside. Every consumer is
 *  rendered by ModuleWorkspace; the fallback exists so that a component lifted
 *  out of it one day degrades to the NEO home rather than throwing. */
export function useWsOrigin(): WsOrigin {
  const fn = useContext(Ctx);
  return fn ?? (() => ({ href: "/neo/", label: "מסך הבית" }));
}
