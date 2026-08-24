import { TABLE_ENRICHMENT } from "@/data/table-enrichment";
import { tableNames } from "@/components/neo-shell/erd/model";
console.log(tableNames().filter((n) => !TABLE_ENRICHMENT[n]).join(" "));
