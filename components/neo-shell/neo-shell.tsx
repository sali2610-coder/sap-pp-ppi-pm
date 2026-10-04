/* Shared shell: styles stay server imported; the client consumes a generated
 * presentation index instead of serializing it into every route. See
 * scripts/gen-neo-shell.mjs. No canonical datasets enter the client bundle. */

import "@/app/neo/rail.css";
import { NeoShellClient } from "./search/shell-client";

export function NeoShell({ children }: { children: React.ReactNode }) {
  return (
    <NeoShellClient>
      {children}
    </NeoShellClient>
  );
}
