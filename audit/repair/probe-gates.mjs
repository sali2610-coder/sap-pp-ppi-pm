import { txDetailCodes } from "@/components/neo-shell/data/tx-detail";
import { bapiIds } from "@/components/neo-shell/reference/bapi-data";
import { idocNames } from "@/components/neo-shell/reference/idoc-data";
import { cdsNames } from "@/components/neo-shell/reference/cds-data";
import { fioriSlugs } from "@/components/neo-shell/reference/fiori-data";
import { txHref, bapiHref, idocHref, cdsHref, fioriHref } from "@/components/neo-shell/reference/ref-links";
const chk = (label, list, href) => {
  const missing = list.filter((x) => !href(x));
  console.log(`${label.padEnd(9)} route=${String(list.length).padEnd(5)} gate-misses=${missing.length}  ${missing.slice(0,6).join(" ")}`);
};
chk("tcode", txDetailCodes(), txHref);
chk("bapi", bapiIds(), bapiHref);
chk("idoc", idocNames(), idocHref);
chk("cds", cdsNames(), cdsHref);
chk("fiori", fioriSlugs(), fioriHref);
