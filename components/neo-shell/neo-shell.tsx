/* ============================================================================
   PROJECT NEO · CONCEPT D — the shell's server boundary.
   ----------------------------------------------------------------------------
   This file used to BE the rail. It is now the thin server component that feeds
   it, and the client half lives in components/neo-shell/search/shell-client.tsx.

   WHY THE SPLIT EXISTS
     The command surface needs three result families the rail's own index has no
     answer for — chapter, flow and guide — plus the ownership maps that turn a
     bare identifier into a row with a real relationship. All of that is read
     from the SAP datasets, which must never cross into the browser bundle, so
     it has to be computed above the client boundary. app/neo/layout.tsx is the
     only other place above that boundary and it is frozen for this change, so
     the boundary moved here: `commandIndex()` runs at build time, and the
     client receives a small plain object exactly like `shellData()`.

   The stylesheet is imported here rather than from the client file so it lands
   in the same chunk as the shell itself, after app/globals.css. Every rule in
   it is anchored on .nx-app and additionally scoped, so load order can never
   decide the outcome.
   ========================================================================== */

import "@/app/neo/rail.css";
import { NeoShellClient } from "./search/shell-client";
import { commandIndex } from "./search/command-index";
import type { ShellData } from "./types";

export function NeoShell({ data, children }: { data: ShellData; children: React.ReactNode }) {
  return (
    <NeoShellClient data={data} cmd={commandIndex()}>
      {children}
    </NeoShellClient>
  );
}
