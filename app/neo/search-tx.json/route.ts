// The transaction part of the command index as one static file
// (out/neo/search-tx.json). The shell fetches it once per visit
// (components/neo-shell/search/shell-client.tsx) instead of carrying its
// ~24 KB gzip in the HTML of every page (gate 6, major 9).
import { commandTransactions } from "@/components/neo-shell/search/command-index";

export const dynamic = "force-static";

export function GET() {
  return Response.json(commandTransactions());
}
